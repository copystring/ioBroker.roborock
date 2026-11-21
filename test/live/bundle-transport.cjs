"use strict";

// Keep the request ID owned by Hermes; ioBroker uses its own ID on the wire.
async function forwardBundleRequest(sendRequest, deviceId, request) {
    if (typeof sendRequest !== "function" || typeof deviceId !== "string" || !deviceId ||
        !request || !Number.isSafeInteger(request.id) || typeof request.method !== "string" ||
        !request.method || request.params === undefined || (request.params !== null && typeof request.params !== "object")) {
        throw new TypeError("Invalid original bundle request");
    }

    const response = await sendRequest(deviceId, request.method, request.params, { timeout: 15000, retries: 0 });
    if (response && typeof response === "object" && !Array.isArray(response) &&
        Object.hasOwn(response, "error")) {
        throw new Error("Device returned an error");
    }
    const result = response && typeof response === "object" && !Array.isArray(response) &&
        Object.hasOwn(response, "result") ? response.result : response;
    if (Array.isArray(result) && result[0] === "retry") throw new Error("Device requested retry; not retried");
    if (result === undefined) throw new Error("Device response has no result");
    return { id: request.id, result };
}

module.exports = { forwardBundleRequest };
