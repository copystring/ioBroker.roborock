"use strict";

// A single worker owns this channel. IDs identify IPC calls, not device RPCs.
function createClient(channel) {
    let nextId = 1;
    let closed = false;
    const pending = new Map();

    function onMessage(message) {
        if (message?.kind !== "appplugin-response" || !Number.isSafeInteger(message.id)) return;
        const call = pending.get(message.id);
        if (!call) return;
        pending.delete(message.id);
        call.cleanup();
        if (message.ok === true) call.resolve(message.value);
        else call.reject(new Error(typeof message.error === "string" ? message.error : "AppPlugin request failed"));
    }
    function close() {
        if (closed) return;
        closed = true;
        channel.removeListener("message", onMessage);
        channel.removeListener("disconnect", close);
        for (const [id, call] of pending) {
            call.cleanup();
            try { channel.send({ kind: "appplugin-cancel", id }); } catch {}
            call.reject(new Error("AppPlugin channel closed"));
        }
        pending.clear();
    }
    channel.on("message", onMessage);
    channel.on("disconnect", close);

    return {
        request(method, params, signal) {
            if (signal?.aborted) return Promise.reject(signal.reason);
            if (closed) return Promise.reject(new Error("AppPlugin channel closed"));
            const id = nextId++;
            return new Promise((resolve, reject) => {
                const cancel = () => {
                    if (!pending.delete(id)) return;
                    signal?.removeEventListener("abort", cancel);
                    try { channel.send({ kind: "appplugin-cancel", id }); } catch {}
                    reject(signal.reason);
                };
                const cleanup = () => signal?.removeEventListener("abort", cancel);
                pending.set(id, { resolve, reject, cleanup });
                signal?.addEventListener("abort", cancel, { once: true });
                try { channel.send({ kind: "appplugin-request", id, method, params }); }
                catch (error) { pending.delete(id); cleanup(); reject(error); }
            });
        },
        close,
    };
}

function createServer(channel, dispatch) {
    let closed = false;
    const active = new Map();
    async function onMessage(message) {
        if (message?.kind === "appplugin-cancel") {
            active.get(message.id)?.abort();
            return;
        }
        if (closed || message?.kind !== "appplugin-request" || !Number.isSafeInteger(message.id) ||
            typeof message.method !== "string" || !message.method) return;
        if (active.has(message.id)) return;
        const controller = new AbortController();
        active.set(message.id, controller);
        let response;
        try {
            const value = await dispatch({ method: message.method, params: message.params }, controller.signal);
            response = { kind: "appplugin-response", id: message.id, ok: true, value };
        } catch (error) {
            response = { kind: "appplugin-response", id: message.id, ok: false,
                error: error instanceof Error ? error.message : "AppPlugin request failed" };
        }
        active.delete(message.id);
        if (!closed && !controller.signal.aborted) channel.send(response);
    }
    channel.on("message", onMessage);
    return () => {
        closed = true;
        channel.removeListener("message", onMessage);
        for (const controller of active.values()) controller.abort();
        active.clear();
    };
}

module.exports = { createClient, createServer };
