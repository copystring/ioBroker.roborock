import { describe, expect, it } from "vitest";
import { decodeMowerJsonMessage } from "../../src/lib/mower/mowerJsonMessage";

describe("manufacturer JSON RobotMsg listener", () => {
	it("parses the first DP envelope's result string without inventing a fixed status DP", () => {
		const message = { id: "123", type: "ROBOT_STATUS_UPDATE", hardware: { battery: { percent: 85 } } };
		expect(decodeMowerJsonMessage({ "102": JSON.stringify({ id: 7, result: JSON.stringify(message) }) })).toEqual(message);
	});

	it("does not manufacture a status from an ACK or malformed JSON", () => {
		expect(decodeMowerJsonMessage({ "102": JSON.stringify({ id: 7, result: "ok" }) })).toBeUndefined();
		expect(decodeMowerJsonMessage({ "102": "bad" })).toBeUndefined();
		expect(decodeMowerJsonMessage({ "102": JSON.stringify({ id: 7 }) })).toBeUndefined();
	});
});
