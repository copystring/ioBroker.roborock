/** Validate status payloads without treating missing data as a successful refresh. */
export function normalizeStatusResponse(response: unknown, stateKey: "state" | "status", properties?: readonly string[]): Record<string, unknown> {
	let value = response;
	for (let depth = 0; depth < 8; depth++) {
		if (value && typeof value === "object" && !Array.isArray(value) && "data" in value && "version" in value) {
			value = (value as { data: unknown }).data;
		} else if (Array.isArray(value) && properties && value.length === properties.length) {
			value = Object.fromEntries(properties.map((key, index) => [key, (value as unknown[])[index]]));
			break;
		} else if (Array.isArray(value) && value.length === 1) {
			value = value[0];
		} else {
			break;
		}
	}
	if (!value || typeof value !== "object" || Array.isArray(value) || Buffer.isBuffer(value)) {
		throw new Error("Invalid device status response");
	}
	const status = value as Record<string, unknown>;
	if (typeof status[stateKey] !== "number" || !Number.isFinite(status[stateKey])) {
		throw new Error(`Invalid device status response: missing numeric ${stateKey}`);
	}
	return status;
}
