const { test } = require("node:test");
const assert = require("node:assert/strict");
const { AdapterDeviceTransport } = require("./adapter-device-transport.cjs");

test("delivers the correlated device response through the plugin DPS subscription", async () => {
    const calls = [];
    const transport = new AdapterDeviceTransport("device", async (...args) => {
        calls.push(args);
        return { data: ["ok"], version: "1.0" };
    });
    const received = [];
    transport.subscribe({ onDps: value => received.push(value) });
    await transport.sendJson({ id: 19, method: "change", params: [1] }, "automatic");
    assert.equal(calls.length, 1);
    assert.deepEqual(calls[0].slice(0, 3), ["device", "change", [1]]);
    assert.equal(calls[0][3].timeout, 15000);
    assert.equal(calls[0][3].retries, 0);
    assert.equal(calls[0][3].signal.aborted, false);
    assert.deepEqual(received, [{ "102": JSON.stringify({ id: 19, result: ["ok"] }) }]);
});

test("errors and close do not produce successful device responses", async () => {
    const transport = new AdapterDeviceTransport("device", async () => { throw Error("offline"); });
    const received = [];
    transport.subscribe({ onDps: value => received.push(value) });
    await assert.rejects(transport.sendJson({ id: 2, method: "x", params: [] }, "automatic"), /offline/);
    transport.close();
    await assert.rejects(transport.sendJson({ id: 3, method: "x", params: [] }, "automatic"), /closed/);
    assert.deepEqual(received, []);
});

test("explicit routes are rejected instead of silently changing the requested route", async () => {
    let calls = 0;
    const transport = new AdapterDeviceTransport("device", async () => { calls++; });
    await assert.rejects(transport.sendJson({ id: 2, method: "x", params: [] }, "local"), /route/);
    assert.equal(calls, 0);
});

test("does not publish a late response after cancellation", async () => {
    let finish;
    const transport = new AdapterDeviceTransport("device", () => new Promise(resolve => { finish = resolve; }));
    const received = [];
    transport.subscribe({ onDps: value => received.push(value) });
    const controller = new AbortController();
    const pending = transport.sendJson({ id: 5, method: "x", params: [] }, "automatic", controller.signal);
    controller.abort();
    finish(["ok"]);
    await assert.rejects(pending);
    assert.deepEqual(received, []);
});

test("closing in flight aborts the adapter call and drops its eventual response", async () => {
    let resolve;
    let receivedSignal;
    const transport = new AdapterDeviceTransport("device", (_id, _method, _params, options) => {
        receivedSignal = options.signal;
        return new Promise(done => { resolve = done; });
    });
    const events = [];
    transport.subscribe({ onDps: value => events.push(value) });
    const pending = transport.sendJson({ id: 8, method: "get", params: [] }, "automatic");
    transport.close();
    assert.equal(receivedSignal.aborted, true);
    resolve(["ok"]);
    await assert.rejects(pending);
    assert.deepEqual(events, []);
});

test("reports and fails unsupported binary calls", async () => {
    const transport = new AdapterDeviceTransport("device", async () => ["ok"]);
    await assert.rejects(transport.sendProtobuf({}, "automatic"), /unsupported/i);
});

test("uses the supplied shared message ID allocator and exposes subscriber counts", async () => {
    const allocator = { allocate: () => 3, release: () => {} };
    const transport = new AdapterDeviceTransport("device", async () => ["ok"], allocator);
    assert.equal(transport.rpcMessageIds, allocator);
    const unsubscribe = transport.subscribe({ onDps() {} });
    assert.equal(transport.dpsListenerCount, 1);
    assert.equal(transport.binaryListenerCount, 0);
    unsubscribe();
    assert.equal(transport.dpsListenerCount, 0);
});
