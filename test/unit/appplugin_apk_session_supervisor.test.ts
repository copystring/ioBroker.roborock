import { describe, expect, it, vi } from "vitest";

import {
	APK_APPPLUGIN_MODEL_RUNTIME_CACHE_LIMIT,
	ApkAppPluginSessionSupervisor,
	type ApkAppPluginManagedModelRuntime,
} from "../../src/apppluginHost/apkAppPluginSessionSupervisor";

function deferred(): {
	readonly promise: Promise<void>;
	resolve(): void;
} {
	let resolve!: () => void;
	return {
		promise: new Promise<void>(done => {
			resolve = done;
		}),
		resolve: () => resolve(),
	};
}

function runtime() {
	return {
		start: vi.fn(async () => undefined),
		stop: vi.fn(async () => undefined),
	} satisfies ApkAppPluginManagedModelRuntime;
}

function request(model: string, deviceId = `${model}.device`, activeTime = 1) {
	return { activeTime, context: { deviceId }, deviceId, model };
}

describe("APK AppPlugin session supervisor", () => {
	it("deduplicates concurrent starts and retains the runtime until leases are released", async () => {
		const created = runtime();
		const factory = vi.fn(async () => created);
		const supervisor = new ApkAppPluginSessionSupervisor(factory);

		const [first, second] = await Promise.all([
			supervisor.open(request("roborock.vacuum.shared", "vacuum-1", 100)),
			supervisor.open(request("roborock.vacuum.shared", "vacuum-1", 100)),
		]);

		expect(factory).toHaveBeenCalledOnce();
		expect(created.start).toHaveBeenCalledOnce();
		expect(first.runtime).toBe(second.runtime);
		expect(supervisor.status()).toEqual([{
			activeTime: 100,
			activeLeases: 2,
			deviceId: "vacuum-1",
			model: "roborock.vacuum.shared",
			state: "running",
		}]);

		await first.release();
		await first.release();
		expect(supervisor.status()[0]?.activeLeases).toBe(1);
		await second.release();
		expect(created.stop).not.toHaveBeenCalled();
		await supervisor.shutdown();
		expect(created.stop).toHaveBeenCalledOnce();
	});

	it("uses the APK's three-model access-ordered cache and evicts only inactive runtimes", async () => {
		const runtimes = new Map<string, ReturnType<typeof runtime>>();
		const supervisor = new ApkAppPluginSessionSupervisor(({ model }) => {
			const created = runtime();
			runtimes.set(model, created);
			return created;
		});
		const first = await supervisor.open(request("model.one"));
		await first.release();
		const second = await supervisor.open(request("model.two"));
		await second.release();
		const third = await supervisor.open(request("model.three"));
		await third.release();

		const touchFirst = await supervisor.open(request("model.one"));
		await touchFirst.release();
		const fourth = await supervisor.open(request("model.four"));
		await fourth.release();

		expect(APK_APPPLUGIN_MODEL_RUNTIME_CACHE_LIMIT).toBe(3);
		expect(runtimes.get("model.two")?.stop).toHaveBeenCalledOnce();
		expect(runtimes.get("model.one")?.stop).not.toHaveBeenCalled();
		expect(supervisor.status().map(status => status.model).sort()).toEqual([
			"model.four",
			"model.one",
			"model.three",
		]);
		await supervisor.shutdown();
	});

	it("allows different models to start independently", async () => {
		const firstStart = deferred();
		const secondStart = deferred();
		const starts: string[] = [];
		const supervisor = new ApkAppPluginSessionSupervisor(({ model }) => ({
			start: async () => {
				starts.push(model);
				await (model === "model.one" ? firstStart.promise : secondStart.promise);
			},
			stop: async () => undefined,
		}));

		const first = supervisor.open(request("model.one"));
		const second = supervisor.open(request("model.two"));
		await vi.waitFor(() => expect(starts).toEqual(["model.one", "model.two"]));
		firstStart.resolve();
		secondStart.resolve();
		const leases = await Promise.all([first, second]);
		await Promise.all(leases.map(lease => lease.release()));
		await supervisor.shutdown();
	});

	it("removes failed starts so a later open can retry cleanly", async () => {
		const failed = runtime();
		failed.start.mockRejectedValueOnce(new Error("start failed"));
		const recovered = runtime();
		const factory = vi.fn()
			.mockResolvedValueOnce(failed)
			.mockResolvedValueOnce(recovered);
		const supervisor = new ApkAppPluginSessionSupervisor(factory);

		await expect(supervisor.open(request("model.retry"))).rejects.toThrow("start failed");
		expect(failed.stop).toHaveBeenCalledOnce();
		const lease = await supervisor.open(request("model.retry"));
		expect(lease.runtime).toBe(recovered);
		await lease.release();
		await supervisor.shutdown();
	});

	it("rejects invalidation with active leases and stops an inactive cached runtime", async () => {
		const created = runtime();
		const supervisor = new ApkAppPluginSessionSupervisor(() => created);
		const lease = await supervisor.open(request("model.invalidate"));

		await expect(supervisor.invalidate("model.invalidate"))
			.rejects.toThrow(/aktive Sitzungen/u);
		expect(created.stop).not.toHaveBeenCalled();

		await lease.release();
		await supervisor.invalidate("model.invalidate");
		expect(created.stop).toHaveBeenCalledOnce();
		expect(supervisor.status()).toEqual([]);
		await supervisor.shutdown();
	});

	it("waits for an in-progress start during shutdown and rejects future opens", async () => {
		const startGate = deferred();
		const created = runtime();
		created.start.mockImplementationOnce(async () => startGate.promise);
		const supervisor = new ApkAppPluginSessionSupervisor(() => created);
		const opening = supervisor.open(request("model.shutdown"));
		await vi.waitFor(() => expect(created.start).toHaveBeenCalledOnce());

		const shutdown = supervisor.shutdown();
		expect(created.stop).not.toHaveBeenCalled();
		startGate.resolve();
		await shutdown;
		await expect(opening).rejects.toThrow(/beendet/u);
		expect(created.stop).toHaveBeenCalledOnce();
		await expect(supervisor.open(request("model.new"))).rejects.toThrow(/bereits beendet/u);
	});

	it("attempts to stop every runtime and aggregates shutdown failures", async () => {
		const runtimes = [runtime(), runtime()];
		runtimes[0].stop.mockRejectedValueOnce(new Error("first stop failed"));
		let index = 0;
		const supervisor = new ApkAppPluginSessionSupervisor(() => runtimes[index++]);
		const first = await supervisor.open(request("model.one"));
		const second = await supervisor.open(request("model.two"));
		await first.release();
		await second.release();

		await expect(supervisor.shutdown()).rejects.toThrow(/Mindestens eine/u);
		expect(runtimes[0].stop).toHaveBeenCalledOnce();
		expect(runtimes[1].stop).toHaveBeenCalledOnce();
	});

	it("rejects unsafe models before constructing a runtime", async () => {
		const factory = vi.fn();
		const supervisor = new ApkAppPluginSessionSupervisor(factory);

		await expect(supervisor.open(request("../outside")))
			.rejects.toThrow(/kein sicherer Verzeichnisname/u);
		expect(factory).not.toHaveBeenCalled();
		await supervisor.shutdown();
	});

	it("rejects incomplete device identities before creating a runtime", async () => {
		const factory = vi.fn();
		const supervisor = new ApkAppPluginSessionSupervisor(factory);

		await expect(supervisor.open(request("model.invalid", "")))
			.rejects.toThrow(/Geräte-ID darf nicht leer sein/u);
		await expect(supervisor.open(request("model.invalid", "device-1", Number.NaN)))
			.rejects.toThrow(/Aktivierungszeit muss eine nichtnegative Zahl sein/u);
		await expect(supervisor.open(request("model.invalid", "device-1", -1)))
			.rejects.toThrow(/Aktivierungszeit muss eine nichtnegative Zahl sein/u);
		expect(factory).not.toHaveBeenCalled();
		await supervisor.shutdown();
	});

	it("recreates an inactive model host when the APK device identity changes", async () => {
		const runtimes = [runtime(), runtime(), runtime()];
		const factory = vi.fn()
			.mockReturnValueOnce(runtimes[0])
			.mockReturnValueOnce(runtimes[1])
			.mockReturnValueOnce(runtimes[2]);
		const supervisor = new ApkAppPluginSessionSupervisor(factory);

		const first = await supervisor.open(request("roborock.vacuum.same", "vacuum-1", 100));
		await first.release();
		const second = await supervisor.open(request("roborock.vacuum.same", "vacuum-2", 100));

		expect(runtimes[0].stop).toHaveBeenCalledOnce();
		expect(second.runtime).toBe(runtimes[1]);
		expect(factory).toHaveBeenNthCalledWith(2, expect.objectContaining({
			activeTime: 100,
			deviceId: "vacuum-2",
			model: "roborock.vacuum.same",
		}));
		await second.release();

		const reactivated = await supervisor.open(request(
			"roborock.vacuum.same",
			"vacuum-2",
			101,
		));
		expect(runtimes[1].stop).toHaveBeenCalledOnce();
		expect(reactivated.runtime).toBe(runtimes[2]);
		await reactivated.release();
		await supervisor.shutdown();
	});

	it("never exposes one starting model host to a concurrent device identity", async () => {
		const created = runtime();
		const startGate = deferred();
		created.start.mockImplementationOnce(async () => startGate.promise);
		const factory = vi.fn(() => created);
		const supervisor = new ApkAppPluginSessionSupervisor(factory);
		const firstOpening = supervisor.open(request("roborock.mower.same", "mower-1", 5));
		await vi.waitFor(() => expect(created.start).toHaveBeenCalledOnce());

		await expect(supervisor.open(request("roborock.mower.same", "mower-2", 5)))
			.rejects.toThrow(/noch für Gerät mower-1 geöffnet/u);
		expect(factory).toHaveBeenCalledOnce();
		expect(created.stop).not.toHaveBeenCalled();

		startGate.resolve();
		const active = await firstOpening;
		await active.release();
		await supervisor.shutdown();
	});
});
