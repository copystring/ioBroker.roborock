import { describe, expect, it } from "vitest";

import {
	APK_APPPLUGIN_MODEL_RUNTIME_CACHE_LIMIT,
	APK_HERMES_HOST_DEFAULT_LIMITS,
	APK_HOST_SERVICE_DEFAULT_MAX_PENDING_REQUESTS,
	APK_HOST_SERVICE_DEFAULT_PROTOCOL_LIMITS,
	APK_HOST_SERVICE_DEFAULT_TIMEOUT_MILLISECONDS,
	APK_PLUGIN_DEFAULT_DOWNLOAD_TIMEOUT_MS,
	APK_PLUGIN_DEFAULT_INSTALLER_LIMITS,
	APK_PLUGIN_DEFAULT_MAX_DOWNLOAD_BYTES,
} from "../../src/apppluginHost";
import { IOBROKER_APPPLUGIN_OPERATING_POLICY } from "../../src/lib/appplugin/IoBrokerAppPluginOperatingPolicy";

describe("ioBroker AppPlugin operating policy", () => {
	it("keeps APK-derived cache behavior separate from ioBroker root concurrency", () => {
		expect(IOBROKER_APPPLUGIN_OPERATING_POLICY.concurrency).toEqual({
			maxActiveDeviceRoots: 1,
			maxConcurrentLifecycleOperations: 1,
			maxCachedModelRuntimes: APK_APPPLUGIN_MODEL_RUNTIME_CACHE_LIMIT,
		});
		expect(APK_APPPLUGIN_MODEL_RUNTIME_CACHE_LIMIT).toBe(3);
	});

	it("publishes the exact limits enforced by the package, Hermes and host-service runtimes", () => {
		expect(IOBROKER_APPPLUGIN_OPERATING_POLICY.hermes).toEqual(APK_HERMES_HOST_DEFAULT_LIMITS);
		expect(IOBROKER_APPPLUGIN_OPERATING_POLICY.hostServices).toEqual({
			...APK_HOST_SERVICE_DEFAULT_PROTOCOL_LIMITS,
			maxPendingRequests: APK_HOST_SERVICE_DEFAULT_MAX_PENDING_REQUESTS,
			timeoutMilliseconds: APK_HOST_SERVICE_DEFAULT_TIMEOUT_MILLISECONDS,
		});
		expect(IOBROKER_APPPLUGIN_OPERATING_POLICY.package).toEqual({
			downloadTimeoutMilliseconds: APK_PLUGIN_DEFAULT_DOWNLOAD_TIMEOUT_MS,
			maxDownloadBytes: APK_PLUGIN_DEFAULT_MAX_DOWNLOAD_BYTES,
			...APK_PLUGIN_DEFAULT_INSTALLER_LIMITS,
		});
		expect(Object.isFrozen(IOBROKER_APPPLUGIN_OPERATING_POLICY)).toBe(true);
		expect(Object.isFrozen(IOBROKER_APPPLUGIN_OPERATING_POLICY.package)).toBe(true);
	});
});
