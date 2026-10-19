import { describe, expect, it } from "vitest";
import { buildMowerAreaRequest, buildMowerFullMapRequest, buildMowerMapNamesRequest, MowerMapStore } from "../../src/lib/mower/MowerMapStore";

describe("RockMow map identity and boundary commands", () => {
	it("builds the source-mapped map queries and area/edge requests", () => {
		expect(buildMowerMapNamesRequest(100)).toEqual({ id: "100", type: "GET_MAP_NAMES" });
		expect(buildMowerFullMapRequest("garden", 101)).toEqual({ id: "101", type: "GET_FULL_MAP", modify_map: { name: "garden" } });
		const store = new MowerMapStore();
		const revision = store.beginMap("garden");
		expect(store.acceptMap("garden", revision, { name: "garden", boundaries: [{ id: 7, name: "West" }, { id: 8, name: "East" }] })).toBe(true);
		const selection = store.selectBoundaries("garden", [8, 7]);
		expect(buildMowerAreaRequest(selection, 102, "area")).toEqual({ id: "102", type: "APP_BUTTON", app_button: "MOW_SELECT", modify_map: { boundaries: [{ id: 8, name: "East" }, { id: 7, name: "West" }] } });
		expect(buildMowerAreaRequest(selection, 103, "edge")).toMatchObject({ app_button: "MOW_EDGE" });
	});

	it("invalidates selections immediately when a new map begins or is cleared", () => {
		const store = new MowerMapStore();
		const revision = store.beginMap("old");
		store.acceptMap("old", revision, { name: "old", boundaries: [{ id: 1, name: "Old lawn" }] });
		const old = store.selectBoundaries("old", [1]);
		const next = store.beginMap("new");
		expect(old.signal.aborted).toBe(true);
		expect(store.isCurrent(old)).toBe(false);
		expect(() => buildMowerAreaRequest(old, 104, "area")).toThrow("stale");
		expect(() => store.selectBoundaries("new", [1])).toThrow("unavailable");
		expect(store.acceptMap("old", revision, { name: "old", boundaries: [{ id: 1, name: "Old lawn" }] })).toBe(false);
		expect(store.acceptMap("new", next, { name: "new", boundaries: [{ id: 1, name: "New lawn" }] })).toBe(true);
		expect(store.selectBoundaries("new", [1]).boundaries[0].name).toBe("New lawn");
		store.clear();
		expect(store.getCurrentMap()).toBeNull();
		expect(store.getBoundaries()).toEqual([]);
	});

	it("rejects invalid map data and unknown, duplicate or empty selections without mixing old boundaries", () => {
		const store = new MowerMapStore();
		const revision = store.beginMap("garden");
		expect(store.acceptMap("garden", revision, { name: "other", boundaries: [{ id: 1, name: "Wrong" }] })).toBe(false);
		expect(store.getBoundaries()).toEqual([]);
		expect(store.acceptMap("garden", revision, { name: "garden", boundaries: [{ id: 1, name: "One" }] })).toBe(true);
		const old = store.selectBoundaries("garden", [1]);
		expect(() => store.selectBoundaries("garden", [2])).toThrow("does not belong");
		expect(() => store.selectBoundaries("garden", [1, 1])).toThrow("Invalid");
		expect(() => store.selectBoundaries("garden", [])).toThrow("unavailable");
		expect(store.acceptMap("garden", revision, { name: "garden", boundaries: [{ id: 1, name: "One" }, { id: 1, name: "Duplicate" }] })).toBe(false);
		expect(old.signal.aborted).toBe(true);
		expect(store.getBoundaries()).toEqual([]);
		expect(store.acceptMap("garden", revision, { name: "garden", boundaries: [{ id: 0, name: "Zero" }] })).toBe(true);
		const zero = store.selectBoundaries("garden", [0]);
		expect(store.acceptMap("garden", revision, { name: "garden", boundaries: [{ id: 0, name: "Renamed" }] })).toBe(true);
		expect(zero.signal.aborted).toBe(true);
		expect(store.isCurrent(zero)).toBe(false);
	});
});
