import { describe, expect, it, vi } from "vitest";

import { socketHandler } from "../../src/lib/socketHandler";

function message(
	command: string,
	payload: unknown,
): ioBroker.Message {
	return {
		callback: { ack: false, id: 1, message: {}, time: 0 },
		command,
		from: "system.adapter.admin.0",
		message: payload,
	} as ioBroker.Message;
}

function harness(options?: {
	readonly acquisitionError?: Error;
	readonly homeData?: unknown;
	readonly installed?: {
		readonly downloadVersion: number;
		readonly pluginLevel: number;
	};
}) {
	const sendTo = vi.fn();
	const acquireForDevice = vi.fn(async () => {
		if (options?.acquisitionError) {
			throw options.acquisitionError;
		}
		return {
			installation: {
				bundlePath: "must-not-cross-message-boundary",
				installation: {
					downloadVersion: 9,
					pluginLevel: 4,
				},
				model: "roborock.mower.generic",
			},
			metadata: {
				url: "must-not-cross-message-boundary",
			},
		};
	});
	const homeData = options && "homeData" in options
		? options.homeData
		: {
			deviceJsonStrings: [JSON.stringify({
				duid: "mower-1",
				model: "roborock.mower.generic",
				productId: "123",
			})],
			productJsonStrings: [JSON.stringify({
				id: 123,
				model: "roborock.mower.generic",
				productTags: [],
			})],
		};
	const adapter = {
		appPluginPackageRuntime: {
			acquireForDevice,
			getInstalled: vi.fn(() => options?.installed),
		},
		errorMessage: (error: unknown) =>
			error instanceof Error ? error.message : String(error),
		http_api: {
			getAppPluginHomeDataContext: vi.fn(() => homeData),
		},
		rLog: vi.fn(),
		sendTo,
	};
	return {
		acquireForDevice,
		adapter,
		handler: new socketHandler(adapter as never),
		sendTo,
	};
}

describe("AppPlugin package message handling", () => {
	it("returns local package status without starting an acquisition", async () => {
		const { acquireForDevice, handler, sendTo } = harness({
			installed: { downloadVersion: 8, pluginLevel: 3 },
		});

		await handler.handleMessage(message(
			"appplugin_package_status",
			{ duid: "mower-1" },
		));

		expect(acquireForDevice).not.toHaveBeenCalled();
		expect(sendTo).toHaveBeenCalledWith(
			"system.adapter.admin.0",
			"appplugin_package_status",
			{
				downloadVersion: 8,
				duid: "mower-1",
				installed: true,
				model: "roborock.mower.generic",
				pluginLevel: 3,
				runtimeReady: true,
			},
			expect.anything(),
		);
	});

	it("requires explicit confirmation and returns no URL, path or HomeData", async () => {
		const { acquireForDevice, handler, sendTo } = harness();
		await handler.handleMessage(message(
			"appplugin_package_acquire",
			{ duid: "mower-1" },
		));
		expect(acquireForDevice).not.toHaveBeenCalled();
		expect(sendTo.mock.calls.at(-1)?.[2]).toEqual({
			error: "AppPlugin-Paketdownload benötigt confirm=true",
		});

		await handler.handleMessage(message(
			"appplugin_package_acquire",
			{ confirm: true, duid: "mower-1" },
		));
		expect(acquireForDevice).toHaveBeenCalledOnce();
		const response = sendTo.mock.calls.at(-1)?.[2];
		expect(response).toEqual({
			downloadVersion: 9,
			duid: "mower-1",
			installed: true,
			model: "roborock.mower.generic",
			pluginLevel: 4,
			runtimeReady: true,
		});
		expect(JSON.stringify(response)).not.toMatch(/url|path|productTags/u);
	});

	it("fails closed when the runtime or APK HomeData context is unavailable", async () => {
		const unavailableRuntime = harness();
		unavailableRuntime.adapter.appPluginPackageRuntime = undefined;
		await unavailableRuntime.handler.handleMessage(message(
			"appplugin_package_status",
			{ duid: "mower-1" },
		));
		expect(unavailableRuntime.sendTo.mock.calls.at(-1)?.[2]).toEqual({
			error: "Die AppPlugin-Paketlaufzeit ist nicht bereit",
		});

		const unavailableHomeData = harness({ homeData: undefined });
		await unavailableHomeData.handler.handleMessage(message(
			"appplugin_package_status",
			{ duid: "mower-1" },
		));
		expect(unavailableHomeData.sendTo.mock.calls.at(-1)?.[2]).toEqual({
			error: "Der APK-HomeData-Kontext ist nicht verfügbar",
		});
	});

	it("does not expose acquisition URLs or paths through errors or logs", async () => {
		const secret = "https://secret.example.test/token C:\\secret\\plugin.zip";
		const { adapter, handler, sendTo } = harness({
			acquisitionError: new Error(secret),
		});

		await handler.handleMessage(message(
			"appplugin_package_acquire",
			{ confirm: true, duid: "mower-1" },
		));

		expect(sendTo.mock.calls.at(-1)?.[2]).toEqual({
			error: "Das signierte AppPlugin-Paket konnte nicht beschafft oder aktiviert werden",
		});
		expect(JSON.stringify(sendTo.mock.calls)).not.toContain(secret);
		expect(JSON.stringify(adapter.rLog.mock.calls)).not.toContain(secret);
	});
});
