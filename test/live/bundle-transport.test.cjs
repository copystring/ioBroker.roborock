const { test } = require("node:test");
const assert = require("node:assert/strict");
const { forwardBundleRequest } = require("./bundle-transport.cjs");

test("forwards original method and parameters once and returns the response to its originating request", async () => {
    const calls = [];
    const sendRequest = async (...args) => { calls.push(args); return { result: ["ok"] }; };
    const result = await forwardBundleRequest(sendRequest, "device", { id: 42, method: "app_set_clean_sequence_type", params: [1] });
    assert.deepEqual(calls, [["device", "app_set_clean_sequence_type", [1], { timeout: 15000, retries: 0 }]]);
    assert.deepEqual(result, { id: 42, result: ["ok"] });
});

test("propagates errors without retrying or fabricating a success", async () => {
    let count = 0;
    const sendRequest = async () => { count++; throw Error("device timeout"); };
    await assert.rejects(forwardBundleRequest(sendRequest, "device", { id: 8, method: "anything", params: [] }), /device timeout/);
    assert.equal(count, 1);
});

test("rejects malformed requests before reaching the adapter", async () => {
    let count = 0;
    const sendRequest = async () => { count++; };
    for (const request of [null, { id: 1, method: "", params: [] }, { id: 2, method: "a", params: "wrong" }]) {
        await assert.rejects(forwardBundleRequest(sendRequest, "device", request));
    }
    assert.equal(count, 0);
});

test("forwards structured parameters without modification", async () => {
    const params = { setting: 3, enabled: true };
    const result = await forwardBundleRequest(async (_device, _method, received) => {
        assert.deepEqual(received, params);
        return ["ok"];
    }, "other-device", { id: 11, method: "change_setting", params });
    assert.deepEqual(result, { id: 11, result: ["ok"] });
});

test("does not turn a device retry response into success", async () => {
    await assert.rejects(forwardBundleRequest(async () => ["retry"], "device",
        { id: 12, method: "change_setting", params: [] }), /retry/i);
});

test("unwraps the adapter protocol-version envelope before returning to the original request", async () => {
    const response = { data: [{ battery: 42 }], version: "1.0" };
    assert.deepEqual(await forwardBundleRequest(async () => response, "device",
        { id: 13, method: "get_prop", params: ["get_status"] }),
        { id: 13, result: [{ battery: 42 }] });
});

test("rejects an invalid response id without sending", async () => {
    let calls = 0;
    await assert.rejects(forwardBundleRequest(async () => { calls++; }, "device", { id: 0, method: "get_prop", params: [] }));
    assert.equal(calls, 0);
});

test("forwards an object-parameter mode change without rewriting the bundle's choices", async () => {
    const params = { type: 0, fan_power: 105, water_box_mode: 201, mop_mode: 300 };
    const observed = [];
    const result = await forwardBundleRequest(async (...args) => {
        observed.push(args);
        return { data: ["ok"], version: "1.0" };
    }, "device", { id: 51, method: "app_set_clean_sequence_type", params });
    assert.deepEqual(observed[0].slice(0, 3), ["device", "app_set_clean_sequence_type", params]);
    assert.equal(observed[0][3].retries, 0);
    assert.deepEqual(result, { id: 51, result: ["ok"] });
});

test("does not treat a protocol-wrapped device error as a successful result", async () => {
    await assert.rejects(forwardBundleRequest(async () => ({data: {error: {code: -1}}, version: "1.0"}),
        "device", {id: 52, method: "change_setting", params: []}), /device returned an error/i);
});
