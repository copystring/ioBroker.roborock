"use strict";
const { test } = require("node:test");
const assert = require("node:assert/strict");
const { EventEmitter } = require("node:events");
const { createClient, createServer } = require("./appplugin-ipc.cjs");

function pair() {
    const client = new EventEmitter(), server = new EventEmitter();
    client.send = message => queueMicrotask(() => server.emit("message", structuredClone(message)));
    server.send = message => queueMicrotask(() => client.emit("message", structuredClone(message)));
    return { client, server };
}
test("correlates concurrent original calls even if replies arrive out of order", async () => {
    const p = pair();
    const finish = new Map();
    const stop = createServer(p.server, request => new Promise(resolve => finish.set(request.method, resolve)));
    const c = createClient(p.client);
    const a = c.request("first", [1]), b = c.request("second", [2]);
    await new Promise(setImmediate);
    finish.get("second")({data:["b"]}); finish.get("first")({data:["a"]});
    assert.deepEqual(await b,{data:["b"]});
    assert.deepEqual(await a,{data:["a"]});
    c.close(); stop();
});
test("propagates failure and closes pending calls without sending twice", async () => {
    const p = pair();
    let calls = 0;
    const stop = createServer(p.server, async request => {
        calls++;
        if (request.method === "bad") throw Error("offline");
        return new Promise(() => {});
    });
    const c = createClient(p.client);
    await assert.rejects(c.request("bad", []), /offline/);
    const pending = c.request("slow", []);
    await new Promise(setImmediate);
    c.close();
    await assert.rejects(pending, /closed/);
    assert.equal(calls, 2);
    stop();
});

test("transports concurrent device calls without rewriting parameters", async () => {
    const { AdapterDeviceTransport } = require("./adapter-device-transport.cjs");
    const p = pair(), calls = [];
    const stop = createServer(p.server, async request => {
        calls.push(request);
        return { data: ["ok"], version: "1.0" };
    });
    const client = createClient(p.client);
    const transport = new AdapterDeviceTransport("test-device",
        (_device, method, params) => client.request(method, params));
    const responses = [];
    transport.subscribe({ onDps: response => responses.push(JSON.parse(response["102"])) });
    await transport.sendJson({ id: 99, method: "mode_change", params: { type: 2 } }, "automatic");
    assert.deepEqual(calls, [{ method: "mode_change", params: { type: 2 } }]);
    assert.deepEqual(responses, [{ id: 99, result: ["ok"] }]);
    transport.close(); client.close(); stop();
});

test("propagates cancellation to an in-flight adapter request", async () => {
    const p = pair();
    let seenSignal;
    const stop = createServer(p.server, (_request, signal) => {
        seenSignal = signal;
        return new Promise((_resolve, reject) => signal.addEventListener("abort", () => reject(signal.reason), { once: true }));
    });
    const c = createClient(p.client);
    const abort = new AbortController();
    const pending = c.request("mode_change", [], abort.signal);
    await new Promise(setImmediate);
    abort.abort();
    await assert.rejects(pending);
    await new Promise(setImmediate);
    assert.equal(seenSignal.aborted, true);
    c.close(); stop();
});

test("passes transport cancellation across IPC", async () => {
    const { AdapterDeviceTransport } = require("./adapter-device-transport.cjs");
    const p = pair(); let seenSignal;
    const stop = createServer(p.server, (_request, signal) => {
        seenSignal = signal;
        return new Promise((_resolve, reject) => signal.addEventListener("abort", () => reject(signal.reason), {once: true}));
    });
    const client = createClient(p.client);
    const transport = new AdapterDeviceTransport("test-device", (_device, method, params, options) => client.request(method, params, options.signal));
    const pending = transport.sendJson({id: 100, method: "mode_change", params: []}, "automatic");
    await new Promise(setImmediate);
    transport.close();
    await assert.rejects(pending);
    await new Promise(setImmediate);
    assert.equal(seenSignal.aborted, true);
    client.close(); stop();
});

test('supports independent requests in both directions over one channel', async () => {
 const p=pair();
 const stopHost=createServer(p.server, async request=>'device:'+request.method);
 const stopWorker=createServer(p.client, async request=>'ui:'+request.method);
 const deviceClient=createClient(p.client);
 const uiClient=createClient(p.server);
 const [device,ui]=await Promise.all([deviceClient.request('status',[]),uiClient.request('snapshot',[])]);
 assert.equal(device,'device:status'); assert.equal(ui,'ui:snapshot');
 deviceClient.close();uiClient.close();stopHost();stopWorker();
});
