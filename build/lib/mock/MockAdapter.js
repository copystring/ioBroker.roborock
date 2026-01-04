"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockAdapter = void 0;
class MockAdapter {
    objects = {};
    states = {};
    log;
    config = {};
    requestsHandler;
    mqtt_api;
    local_api;
    http_api;
    // mock support methods
    instance = 0;
    pendingRequests = new Map();
    nonce = Buffer.alloc(16);
    translations = {};
    catchError(error, attribute) {
        this.log.error(`[CatchError] ${attribute}: ${error}`);
    }
    setInterval(callback, ms, ...args) { return setInterval(callback, ms, ...args); }
    clearInterval(intervalId) { clearInterval(intervalId); }
    clearTimeout(timeoutId) { clearTimeout(timeoutId); }
    async getDeviceProtocolVersion() { return "1.0"; }
    constructor() {
        this.log = {
            info: (msg) => console.log(`[INFO] ${msg}`),
            warn: (msg) => console.warn(`[WARN] ${msg}`),
            error: (msg) => console.error(`[ERROR] ${msg}`),
            debug: () => { },
            silly: () => { }
        };
    }
    async setObjectAsync(id, obj) {
        this.objects[id] = obj;
    }
    async setObjectNotExistsAsync(id, obj) {
        if (!this.objects[id]) {
            this.objects[id] = obj;
        }
    }
    async extendObjectAsync(id, obj) {
        this.objects[id] = { ...this.objects[id], ...obj };
    }
    async extendObject(id, obj) {
        this.objects[id] = { ...this.objects[id], ...obj };
    }
    async getObjectAsync(id) {
        return this.objects[id];
    }
    async setObject(id, obj) {
        this.objects[id] = obj;
    }
    async setState(id, state) {
        // Handle { val: ... } object or direct value
        let val = state;
        if (typeof state === "object" && state !== null && "val" in state) {
            val = state.val;
        }
        this.states[id] = val;
        // Type Verification
        const obj = this.objects[id];
        if (obj && obj.common && obj.common.type) {
            const expectedType = obj.common.type;
            const actualType = typeof val;
            if (expectedType === "array" || expectedType === "object") {
                if (actualType !== "object" && actualType !== "string") { // Strings are sometimes allowed for JSON
                    throw new Error(`Type mismatch for ${id}. Expected ${expectedType}, got ${actualType} (${val})`);
                }
            }
            else if (expectedType === "mixed") {
                // Any type allowable
            }
            else if (actualType !== expectedType) {
                // Allow number/string auto-conversion if simple
                if (expectedType === "string" && actualType === "number")
                    return;
                // Optional: Allow null if not strictly forbidden? Usually ioBroker allows null.
                if (val === null || val === undefined)
                    return;
                // Strict check for others
                throw new Error(`Type mismatch for ${id}. Expected ${expectedType}, got ${actualType} (${val})`);
            }
        }
    }
    async setStateChanged(id, state) {
        return this.setState(id, state);
    }
    async getStateAsync(id) {
        return { val: this.states[id], ack: true };
    }
}
exports.MockAdapter = MockAdapter;
//# sourceMappingURL=MockAdapter.js.map