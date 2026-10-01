import { describe, expect, it } from "vitest";
import { buildMowerScheduleRequest, findMowerScheduleOverlap, parseMowerScheduleReadback, parseMowerWeeklyPlan, prepareMowerSchedulePreferences } from "../../src/lib/mower/mowerScheduleContract";

const weekly = {
	id: 41993344,
	type: 2,
	status: 1,
	start: "1767261600",
	end: "1767265200",
	days: [{ type: 1 }, { type: 3 }],
	mode: 2,
	config: { mode: 2, global: { height: 40, mow_times: 1 }, custom: [{ area_id: 7, area_name: "Vorgarten", height: 40 }] },
	fsm_state: 20,
};

describe("source-derived mower schedule contract", () => {
	it("builds list, timezone and all mutation requests with separate RPC ids", () => {
		expect(buildMowerScheduleRequest("list", 100)).toEqual({ id: "100", type: "GET_MOW_SCHEDULE" });
		expect(buildMowerScheduleRequest("timezone", 101)).toEqual({ id: "101", type: "GET_ROBOT_TIME_ZONE" });
		expect(buildMowerScheduleRequest("create", 102, weekly)).toEqual({ id: "102", type: "CREATE_MOWING_PLAN", mowing_plan: weekly });
		expect(buildMowerScheduleRequest("change", 103, { ...weekly, status: 2 })).toEqual({ id: "103", type: "CHANGE_MOWING_PLAN", mowing_plan: { ...weekly, status: 2 } });
		expect(buildMowerScheduleRequest("delete", 104, { id: weekly.id })).toEqual({ id: "104", type: "DELETE_MOWING_PLAN", mowing_plan: { id: weekly.id } });
		expect(buildMowerScheduleRequest("deleteAll", 105)).toEqual({ id: "105", type: "DELETE_MOW_SCHEDULE" });
		expect(() => buildMowerScheduleRequest("invalid" as "change", 106, weekly)).toThrow("Unsupported mower schedule action");
	});

	it("keeps uint64 epoch seconds as strings and validates weekly days and config", () => {
		expect(parseMowerWeeklyPlan(weekly)).toEqual(weekly);
		for (const input of [
			{ ...weekly, start: 1767261600 },
			{ ...weekly, start: "18446744073709551616" },
			{ ...weekly, days: [{ type: 7 }] },
			{ ...weekly, days: [{ type: 1 }, { type: 1 }] },
			{ ...weekly, config: { mode: 2, custom: [{ area_id: "7" }] } },
			{ ...weekly, fsm_state: 66 },
			{ ...weekly, end: weekly.start },
			{ ...weekly, end: String(Number(weekly.start) + 899) },
			{ ...weekly, mode: 1 },
			{ ...weekly, config: { mode: 2, custom: [] } },
			{ ...weekly, fsm_state: 19 },
		]) expect(() => parseMowerWeeklyPlan(input)).toThrow();
	});

	it("accepts only schedule response type 34 with a present container, preserving unknown plan fields", () => {
		expect(parseMowerScheduleReadback({ type: 34, mow_schedule: { plans: [{ ...weekly, future_field: 9 }], time_zone: "Europe/Berlin" } })).toEqual({ plans: [{ ...weekly, future_field: 9 }], time_zone: "Europe/Berlin" });
		expect(parseMowerScheduleReadback({ type: "MOW_SCHEDULE", mow_schedule: {} })).toEqual({ plans: [] });
		expect(parseMowerScheduleReadback({ type: 35, time_zone: "Europe/Berlin" })).toBeUndefined();
		expect(parseMowerScheduleReadback({ type: 34 })).toBeUndefined();
		expect(parseMowerScheduleReadback({ type: 34, mow_schedule: { plans: [{ status: 1 }] } })).toEqual({ plans: [{ id: 0, status: 1 }] });
		expect(parseMowerScheduleReadback({ type: 34, mow_schedule: { plans: [{ id: 0 }, {}] } })).toBeUndefined();
	});

	it("detects weekly overlap across midnight and week boundaries using an explicit time zone", () => {
		const epoch = (iso: string): string => String(Date.parse(iso) / 1000);
		const baseline = { ...weekly, id: 9, days: [{ type: 6 }], start: epoch("2026-01-03T22:00:00Z"), end: epoch("2026-01-04T00:00:00Z") };
		const candidate = { ...weekly, id: 10, days: [{ type: 0 }], start: epoch("2026-01-03T23:30:00Z"), end: epoch("2026-01-04T00:30:00Z") };
		const readback = { plans: [baseline] };
		// The exact wall times are intentionally checked by the explicit Europe/Berlin zone.
		expect(findMowerScheduleOverlap(parseMowerWeeklyPlan(candidate), readback, "Europe/Berlin")).toBe(9);
		expect(findMowerScheduleOverlap(parseMowerWeeklyPlan({ ...candidate, status: 2 }), readback, "Europe/Berlin")).toBeUndefined();
		expect(findMowerScheduleOverlap(parseMowerWeeklyPlan(candidate), { plans: [{ ...baseline, type: "WEEKLY", status: "OPEN", days: [{ type: "SATURDAY" }] }] }, "Europe/Berlin")).toBe(9);
		expect(() => findMowerScheduleOverlap(parseMowerWeeklyPlan(candidate), { plans: [{ ...baseline, status: "MYSTERY" }] }, "Europe/Berlin")).toThrow("Unknown mower schedule enum");
	});

	it("treats a missing protobuf weekday type as Sunday", () => {
		const epoch = (iso: string): string => String(Date.parse(iso) / 1000);
		const sunday = { ...weekly, id: 19, days: [{}], start: epoch("2026-01-04T08:00:00Z"), end: epoch("2026-01-04T09:00:00Z") };
		const candidate = parseMowerWeeklyPlan({ ...weekly, id: 20, days: [{ type: 0 }], start: epoch("2026-01-04T08:30:00Z"), end: epoch("2026-01-04T09:30:00Z") });
		expect(findMowerScheduleOverlap(candidate, { plans: [sunday] }, "Europe/Berlin")).toBe(19);
	});

	it("merges a height override with fresh preferences and reports only changed heights", () => {
		const base = { height: 40, mow_times: 2, effective: "MANICURE", direction_type: "NAV_EFFICIENT", keep_edge: 1, mode: "GLOBAL" };
		const candidate = { ...weekly, mode: 1, fsm_state: 18, config: { mode: 1, global: { height: 50 } } };
		const prepared = prepareMowerSchedulePreferences(candidate, { global: base });
		expect(prepared.plan.config.global).toEqual({ height: 50, mow_times: 2, effective: 3, direction_type: 2, keep_edge: 1, mode: 1 });
		expect(prepared.changedHeights).toEqual([50]);
		expect(() => prepareMowerSchedulePreferences(candidate, {})).toThrow("No mower preference base");
	});

	it("uses existing per-area preferences before fresh defaults and drops deselected areas", () => {
		const candidate = { ...weekly, config: { mode: 2, custom: [{ area_id: 7, height: 50 }] } };
		const existing = { config: { mode: 2, global: { height: 40, mow_times: 1 }, custom: [{ area_id: 7, height: 40, mow_times: 3, area_name: "Vorgarten" }, { area_id: 8, height: 30 }] } };
		const prepared = prepareMowerSchedulePreferences(candidate, { global: { height: 35, mow_times: 1 } }, existing);
		expect(prepared.plan.config.custom).toEqual([{ area_id: 7, height: 50, mow_times: 3, area_name: "Vorgarten" }]);
		expect(prepared.changedHeights).toEqual([50]);
		expect(() => parseMowerWeeklyPlan({ ...weekly, config: { mode: 2, custom: [{ area_id: 7, effective: 9 }] } })).toThrow();
	});

	it("uses protobuf defaults and the existing first custom preference when switching to global", () => {
		const globalCandidate = { ...weekly, mode: 1, fsm_state: 18, config: { mode: 1, global: { height: 50 } } };
		const switched = prepareMowerSchedulePreferences(globalCandidate, { global: { height: 35 } }, { config: { mode: 2, custom: [{ area_id: 7, mow_times: 3, height: 40 }] } });
		expect(switched.plan.config.global).toEqual({ area_id: 7, mow_times: 3, height: 50 });
		expect(switched.changedHeights).toEqual([50]);
		const defaults = prepareMowerSchedulePreferences(globalCandidate, { global: {} });
		expect(defaults.plan.config.global).toEqual({ height: 50 });
		expect(defaults.changedHeights).toEqual([50]);
		const zeroArea = prepareMowerSchedulePreferences({ ...weekly, config: { mode: 2, custom: [{ area_id: 0, height: 50 }] } }, { global: { height: 35 }, custom: [{ mow_times: 2, height: 40 }] });
		expect(zeroArea.plan.config.custom).toEqual([{ mow_times: 2, height: 50, area_id: 0 }]);
	});
});
