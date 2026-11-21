"use strict";

const { forwardBundleRequest } = require("./bundle-transport.cjs");

// JSON-RPC only. Binary and explicit-route requests must not be misrepresented.
class AdapterDeviceTransport {
    constructor(deviceId, sendRequest, rpcMessageIds) {
        this.deviceId = deviceId;
        this.rpcMessageIds = rpcMessageIds;
        this.diagnostics = { phase: "ready", sent: 0, received: 0, decoded: 0, errors: 0, methods: [], protocols: {} };
        this.sendRequest = sendRequest;
        this.listeners = new Set();
        this.closed = false;
        this.controller = new AbortController();
    }

    get dpsListenerCount() { return [...this.listeners].filter(listener => listener.onDps).length; }
    get binaryListenerCount() { return [...this.listeners].filter(listener => listener.onBinary).length; }

    subscribe(handlers) {
        if (this.closed) throw Error("Transport closed");
        this.listeners.add(handlers);
        return () => this.listeners.delete(handlers);
    }

    async sendJson(request, route, signal) {
        if (this.closed) throw Error("Transport closed");
        if (route !== "automatic") throw Error("Explicit route is not available through the adapter");
        const combined = signal ? AbortSignal.any([signal, this.controller.signal]) : this.controller.signal;
        this.diagnostics.sent++;
        if (!this.diagnostics.methods.includes(request.method)) this.diagnostics.methods.push(request.method);
        let response;
        try {
            response = await forwardBundleRequest(this.sendRequest, this.deviceId, request, combined);
        } catch (error) {
            this.diagnostics.errors++;
            throw error;
        }
        if (this.closed) throw Error("Transport closed");
        signal?.throwIfAborted();
        this.diagnostics.received++;
        this.diagnostics.decoded++;
        const dps = { "102": JSON.stringify(response) };
        for (const listener of this.listeners) listener.onDps?.(dps);
    }

    async sendProtobuf() {
        throw Error("Protobuf transport is unsupported");
    }

    close() {
        this.closed = true;
        this.controller.abort();
        this.diagnostics.phase = "closed";
        this.listeners.clear();
    }
}

module.exports = { AdapterDeviceTransport };
