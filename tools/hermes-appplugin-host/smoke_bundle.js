(function () {
	if (
		typeof global.__apkNativeInvoke !== "function"
		|| typeof global.__apkNativeFlushQueue !== "function"
		|| !global.__fbBatchedBridgeConfig
	) {
		throw new Error("APK bridge bootstrap is incomplete");
	}
	global.__hermesHostSmokeMarker = "hbc-96";
})();
