import { describe, expect, it, vi } from "vitest";

import { ApkIntentRuntime } from "../../src/apppluginHost/apkIntentRuntime";

describe("APK IntentAndroid runtime", () => {
	it("delegates the complete APK surface to a desktop host port", async () => {
		const openUrl = vi.fn();
		const openApplicationSettings = vi.fn();
		const sendIntent = vi.fn();
		const runtime = new ApkIntentRuntime({
			initialUrl: () => "roborock://device/test",
			canOpenUrl: url => url.startsWith("https://"),
			openUrl,
			openApplicationSettings,
			canSendIntent: action => action === "test.action.OPEN",
			sendIntent,
		});

		expect(runtime.getInitialURL()).toBe("roborock://device/test");
		await expect(runtime.canOpenURL("https://example.test")).resolves.toBe(true);
		await expect(runtime.openURL("https://example.test")).resolves.toBe(true);
		await expect(runtime.openSettings()).resolves.toBe(true);
		await runtime.sendIntent("test.action.OPEN", [
			{ key: "room", value: 7 },
			{ key: "enabled", value: true },
		]);

		expect(openUrl).toHaveBeenCalledWith("https://example.test");
		expect(openApplicationSettings).toHaveBeenCalledOnce();
		expect(sendIntent).toHaveBeenCalledWith("test.action.OPEN", [
			{ key: "room", value: 7 },
			{ key: "enabled", value: true },
		]);
	});

	it("rejects the same empty and unsupported host inputs at the central boundary", async () => {
		const runtime = new ApkIntentRuntime({
			initialUrl: () => null,
			canOpenUrl: () => false,
			openUrl: () => undefined,
			openApplicationSettings: () => undefined,
			canSendIntent: () => false,
			sendIntent: () => undefined,
		});
		await expect(runtime.canOpenURL("")).rejects.toThrow(/URL darf nicht leer/u);
		await expect(runtime.sendIntent("missing", null)).rejects.toThrow(/kann nicht gestartet/u);
	});
});
