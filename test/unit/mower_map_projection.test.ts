import { describe, expect, it } from "vitest";
import { MowerMapStore } from "../../src/lib/mower/MowerMapStore";
import { decodeMowerMapProjection } from "../../src/lib/mower/mowerMapProjection";

describe("RockMow protobuf map projection", () => {
	it("reads source-derived fields from fixed wire bytes and skips unknown geometry", () => {
		// Map.boundaries=10; Boundary.id=1/name=5; Map.name=17; field 3 is unrelated geometry.
		const bytes = Buffer.from("7062520508072a01418a010667617264656e1a0100", "hex");
		expect(decodeMowerMapProjection(bytes)).toEqual({ name: "garden", boundaries: [{ id: 7, name: "A" }] });
	});

	it("preserves protobuf int32 default zero and leaves duplicate rejection to the store", () => {
		const bytes = Buffer.from("706252062a045a65726f520608002a024f4b8a010667617264656e", "hex");
		const map = decodeMowerMapProjection(bytes);
		expect(map.boundaries[0]).toEqual({ id: 0, name: "Zero" });
		const store = new MowerMapStore();
		const revision = store.beginMap("garden");
		expect(store.acceptMap("garden", revision, map)).toBe(false);
		expect(store.getBoundaries()).toEqual([]);
	});

	it("rejects wrong magic, malformed protobuf and excessive bytes", () => {
		expect(() => decodeMowerMapProjection(Buffer.from("PB", "ascii"))).toThrow("magic");
		expect(() => decodeMowerMapProjection(Buffer.from("706252ff", "hex"))).toThrow();
		expect(() => decodeMowerMapProjection(Buffer.from("70620000", "hex"), 3)).toThrow("size limit");
	});
});
