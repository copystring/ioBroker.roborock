import { describe, expect, it, vi } from "vitest";

import { IoBrokerAppPluginLifecycleCoordinator } from "../../src/lib/appplugin/IoBrokerAppPluginLifecycleCoordinator";

function deferred() {
	let resolve!: () => void;
	const promise = new Promise<void>(resolvePromise => {
		resolve = resolvePromise;
	});
	return { promise, resolve };
}

describe("ioBroker AppPlugin lifecycle coordinator", () => {
	it("serializes package and runtime generation operations without poisoning later work", async () => {
		const coordinator = new IoBrokerAppPluginLifecycleCoordinator();
		const gate = deferred();
		const order: string[] = [];
		const first = coordinator.run(async () => {
			order.push("package-start");
			await gate.promise;
			order.push("package-end");
		});
		const second = coordinator.run(async () => {
			order.push("session-start");
			throw new Error("session failed");
		});
		const third = coordinator.run(async () => {
			order.push("probe-start");
			return 7;
		});

		await vi.waitFor(() => expect(order).toEqual(["package-start"]));
		gate.resolve();

		await first;
		await expect(second).rejects.toThrow("session failed");
		await expect(third).resolves.toBe(7);
		expect(order).toEqual([
			"package-start",
			"package-end",
			"session-start",
			"probe-start",
		]);
	});

	it("rejects new work during close and waits for the accepted operation", async () => {
		const coordinator = new IoBrokerAppPluginLifecycleCoordinator();
		const gate = deferred();
		const operation = coordinator.run(async () => gate.promise);
		const close = coordinator.close();

		expect(coordinator.state).toBe("closing");
		await expect(coordinator.run(async () => undefined))
			.rejects.toThrow(/bereits beendet/u);
		gate.resolve();
		await operation;
		await close;
		await coordinator.close();

		expect(coordinator.state).toBe("closed");
	});
});
