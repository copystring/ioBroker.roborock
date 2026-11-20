import { describe, expect, it } from "vitest";
import { normalizeStatusResponse } from "./statusResponse";

describe("status response validation", () => {
	it.each([null, undefined, [], {}, [null], ["ok"], { state: "3" }, { state: NaN }, Buffer.from("status")])("rejects invalid V1 status %j", input => {
		expect(() => normalizeStatusResponse(input, "state")).toThrow("Invalid");
	});
	it.each([{ state: 3 }, [{ state: 3 }], [[{ state: 3 }]], { data: [{ state: 3 }], version: "1.0" }])("unwraps V1 status %j", input => {
		expect(normalizeStatusResponse(input, "state")).toEqual({ state: 3 });
	});
	it("maps the positional B01 response", () => {
		expect(normalizeStatusResponse([2, 80], "status", ["status", "battery"])).toEqual({ status: 2, battery: 80 });
	});
	it("unwraps a versioned positional B01 response", () => {
		expect(normalizeStatusResponse({ data: [2, 80], version: "B01" }, "status", ["status", "battery"])).toEqual({ status: 2, battery: 80 });
	});
	it("rejects incomplete B01 lists and null status", () => {
		expect(() => normalizeStatusResponse([2], "status", ["status", "battery"])).toThrow();
		expect(() => normalizeStatusResponse({ status: null }, "status")).toThrow();
	});
});
