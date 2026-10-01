import { describe, expect, it } from "vitest";
import { buildMowerButton, buildMowerInfoRequest } from "../../src/lib/mower/mowerContract";
import { decodeMowerRobotMessage, encodeMowerRemoteMessage } from "../../src/lib/mower/mowerProtobuf";
import { MowerStatusStore } from "../../src/lib/mower/MowerStatusStore";

describe("source-derived mower protobuf wire fields", () => {
	it("matches RemoteMsg tags 1/2/5 and enum values independently of JSON enum strings", () => {
		// Source encoder: uint64(8).id, int32(16).type, int32(40).app_button.
		expect(encodeMowerRemoteMessage(buildMowerButton("start", 123)).toString("hex")).toBe("087b1006280e");
		expect(encodeMowerRemoteMessage(buildMowerInfoRequest(123)).toString("hex")).toBe("087b1042");
	});

	it("decodes RobotMsg hardware(13), HardwareMsg battery(1), Battery percent(2)", () => {
		const decoded = decodeMowerRobotMessage(Buffer.from("087b10266a040a021055", "hex"));
		expect(decoded).toEqual({ id: "123", type: 38, hardware: { battery: { percent: 85 } } });
		const store = new MowerStatusStore();
		expect(store.acceptRobotMessage(decoded)).toBe(true);
		expect(store.getSnapshot()).toEqual({ messageId: "123", battery: 85 });
	});

	it("skips unknown nested fields and keeps absent fields absent", () => {
		expect(decodeMowerRobotMessage(Buffer.from("087b10266a070a051055980601", "hex"))).toEqual({ id: "123", type: 38, hardware: { battery: { percent: 85 } } });
		expect(decodeMowerRobotMessage(Buffer.from("087b1026", "hex"))).toEqual({ id: "123", type: 38 });
	});

	it("rejects truncated input and invalid or overflowing request ids", () => {
		expect(() => decodeMowerRobotMessage(Buffer.from("087b10266a040a02", "hex"))).toThrow();
		expect(() => encodeMowerRemoteMessage({ id: "18446744073709551616", type: "GET_ROBOT_INFO" })).toThrow("id");
		expect(() => encodeMowerRemoteMessage({ id: "bad", type: "GET_ROBOT_INFO" })).toThrow("id");
	});
});
