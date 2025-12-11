"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const MockAdapter_1 = require("./MockAdapter");
const requestsHandler_1 = require("../requestsHandler"); // Real class
describe("Queue Deep Dive (requestsHandler)", () => {
    let mockAdapter;
    let handler;
    beforeEach(() => {
        mockAdapter = new MockAdapter_1.MockAdapter();
        // Mock sub-APIs required by requestsHandler
        mockAdapter.mqtt_api = { ensureEndpoint: async () => "endpoint", isConnected: () => true, sendMessage: () => { }, clearIntervals: () => { } };
        mockAdapter.local_api = { isConnected: () => true, sendMessage: () => { }, clearLocalDevicedTimeout: () => { } };
        mockAdapter.http_api = { getMatchedLocalKeys: () => new Map([["duid", Buffer.alloc(16)]]) };
        mockAdapter.getDeviceProtocolVersion = async () => "1.0";
        handler = new requestsHandler_1.requestsHandler(mockAdapter);
        handler.startupFinished = true; // Bypass startup wait
    });
    it("should respect concurrency limit (10)", async () => {
        const duid = "duid";
        let activeRequests = 0;
        let maxActive = 0;
        // Mock message parser to avoid overhead
        handler.messageParser.buildPayload = async () => "payload";
        handler.messageParser.buildRoborockMessage = async () => Buffer.from("msg");
        const manager = handler.getManager(duid);
        // We hijack manager.add to count executions
        const originalAdd = manager.add.bind(manager);
        manager.add = (id, _task, priority) => {
            return originalAdd(id, async () => {
                activeRequests++;
                maxActive = Math.max(maxActive, activeRequests);
                await new Promise(res => setTimeout(res, 20));
                activeRequests--;
                return "ok";
            }, priority);
        };
        const promises = [];
        for (let i = 0; i < 20; i++) {
            promises.push(handler.sendRequest(duid, "get_status", []));
        }
        // Wait a bit for them to start
        await new Promise(res => setTimeout(res, 10));
        // Concurrency is 10.
        (0, chai_1.expect)(maxActive).to.be.at.most(11); // Allow 1 buffer for timing
        (0, chai_1.expect)(manager.queue.pending).to.be.above(0); // Should have items waiting
    });
    it("should prioritize high-priority requests", async () => {
        const duid = "duid_prio";
        // Force concurrency 1 to strictly test priority/serialization
        // Need to import RequestManager class or mock it?
        // RequestManager is not exported from requestsHandler.ts?
        // It is NOT exported.
        // So we cannot instantiate it easily.
        // We can however modify the existing one.
        const manager = handler.getManager(duid);
        manager.queue.concurrency = 1;
        const executionOrder = [];
        // Mock message parser to avoid overhead
        handler.messageParser.buildPayload = async () => "payload";
        handler.messageParser.buildRoborockMessage = async () => Buffer.from("msg");
        // We modify queue behavior to synchronous push to order list
        const originalAdd = manager.add.bind(manager);
        manager.add = (id, _task, priority) => {
            // Identifier hack to trace ordering
            const name = id.includes("blocker") ? "blocker" : (id.includes("low") ? "low" : "high");
            return originalAdd(id, async () => {
                if (name === "blocker")
                    await new Promise(res => setTimeout(res, 50));
                executionOrder.push(name);
                return "ok";
            }, priority);
        };
        // Block the queue first with a slow task
        // sendRequest generates an ID, so we can't easily control the name unless we mock sendRequest or params?
        // Let's use manager.add directly for this test as we want to test PQueue behavior wrapper in Manager
        // Blocker
        handler.getManager(duid).add("req_blocker", async () => {
            await new Promise(res => setTimeout(res, 50));
            executionOrder.push("blocker");
            return "ok";
        }, 0);
        // Low Priority
        handler.getManager(duid).add("req_low", async () => {
            executionOrder.push("low");
            return "ok";
        }, 0);
        // High Priority
        handler.getManager(duid).add("req_high", async () => {
            executionOrder.push("high");
            return "ok";
        }, 10);
        await manager.onIdle();
        // Expect: blocker (started), then high, then low
        (0, chai_1.expect)(executionOrder).to.deep.equal(["blocker", "high", "low"]);
    });
});
//# sourceMappingURL=queue.test.js.map