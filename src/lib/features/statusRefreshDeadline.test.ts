import { afterEach, describe, expect, it, vi } from "vitest";
import { V1VacuumFeatures } from "./vacuum/v1VacuumFeatures";
import { Q7VacuumFeatures } from "./vacuum/b01/Q7VacuumFeatures";

const never = () => new Promise<void>(() => {});

describe("request/response refresh lifetime", () => {
	afterEach(() => {
		vi.clearAllTimers();
		vi.useRealTimers();
	});
	it.each([V1VacuumFeatures, Q7VacuumFeatures])("bounds %s status requests and cancels outstanding work", async Handler => {
		vi.useFakeTimers();
		let requestSignal: AbortSignal | undefined;
		const adapter = {
			setTimeout, clearTimeout, rLog: vi.fn(),
			requestsHandler: { sendRequest: async (_duid: string, _method: string, _params: unknown, options?: { signal?: AbortSignal }) => {
				requestSignal = options?.signal;
				return never();
			} },
		};
		const feature = new Handler({ adapter, config: {}, http_api: {}, ensureState: vi.fn(), ensureFolder: vi.fn() } as never, "robot", "model", { staticFeatures: [] });
		let failure: unknown;
		const pending = feature.refreshStatus().catch(error => {
			failure = error;
		});
		await vi.advanceTimersByTimeAsync(10_000);
		expect(failure).toBeInstanceOf(Error);
		expect(requestSignal?.aborted).toBe(true);
		await pending;
		expect(vi.getTimerCount()).toBe(0);
	});

	it.each([V1VacuumFeatures, Q7VacuumFeatures])("actively aborts %s refresh during blocked state processing", async Handler => {
		vi.useFakeTimers();
		const adapter = {
			setTimeout, clearTimeout, rLog: vi.fn(),
			requestsHandler: { sendRequest: async () => ({ state: 3, status: 3 }) },
		};
		const feature = new Handler({ adapter, config: {}, http_api: {}, ensureState: vi.fn(), ensureFolder: vi.fn() } as never, "robot", "model", { staticFeatures: [] });
		vi.spyOn(feature, "detectAndApplyRuntimeFeatures").mockImplementation(never as never);
		const controller = new AbortController();
		let failure: unknown;
		const pending = feature.refreshStatus(controller.signal).catch(error => {
			failure = error;
		});
		await vi.advanceTimersByTimeAsync(0);
		controller.abort(new Error("stopped"));
		await vi.advanceTimersByTimeAsync(0);
		expect(failure).toMatchObject({ message: "stopped" });
		await pending;
		expect(vi.getTimerCount()).toBe(0);
	});
});
