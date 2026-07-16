import { describe, expect, it, vi } from "vitest";

import { ApkHermesHostProtocolController } from "../../src/apppluginHost/apkHermesHostProtocol";
import type { ApkNativeModuleDispatcher } from "../../src/apppluginHost/apkNativeModuleDispatcher";

describe("APK native-to-JavaScript module protocol", () => {
	it("forwards JSTimers calls without translating their payload", async () => {
		const sink = vi.fn();
		const controller = new ApkHermesHostProtocolController(
			[],
			{} as ApkNativeModuleDispatcher,
			sink,
		);

		await controller.callJsFunction("JSTimers", "callTimers", [[3, 7]]);

		expect(sink).toHaveBeenCalledWith({
			protocol: "roborock-appplugin-host",
			version: 1,
			type: "callJsFunction",
			moduleName: "JSTimers",
			methodName: "callTimers",
			arguments: [[3, 7]],
		});
	});
});
