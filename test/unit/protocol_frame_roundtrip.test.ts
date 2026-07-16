import { describe, expect, it } from "vitest";
import { messageParser } from "../../src/lib/messageParser";

const duid = "phase0-device";
const localKey = "0123456789abcdef";
const connectNonce = 11;
const ackNonce = 22;

function createParser(): messageParser {
	const adapter = {
		http_api: {
			getMatchedLocalKeys: () => new Map([[duid, localKey]]),
		},
		local_api: {
			localDevices: {
				[duid]: { connectNonce, ackNonce },
			},
		},
		rLog: () => undefined,
		errorMessage: (error: unknown) => error instanceof Error ? error.message : String(error),
	};
	return new messageParser(adapter as never);
}

describe("Roborock protocol frame invariants", () => {
	it.each(["1.0", "A01", "B01", "L01"])("roundtrips %s frames without changing the payload", async version => {
		const parser = createParser();
		const payload = Buffer.from('{"dps":{"101":1}}');
		const frame = await parser.buildRoborockMessage(duid, 4, 1_717_171_717, payload, version, 33);

		expect(frame).not.toBe(false);
		const decoded = parser.decodeMsg(frame as Buffer, duid);
		expect(decoded).toHaveLength(1);
		expect(decoded[0].version).toBe(version);
		expect(decoded[0].seq).toBe(33);
		expect(decoded[0].payload).toStrictEqual(payload);
	});

	it.each([0, 1, 15, 16, 17, 31, 32, 33])("preserves A01 payloads at the %i-byte block boundary", async length => {
		const parser = createParser();
		const payload = Buffer.alloc(length, 0x5a);
		const frame = await parser.buildRoborockMessage(duid, 4, 1_717_171_717, payload, "A01", 33);

		expect(frame).not.toBe(false);
		const decoded = parser.decodeMsg(frame as Buffer, duid);
		expect(decoded).toHaveLength(1);
		expect(decoded[0].payload).toStrictEqual(payload);
	});
});
