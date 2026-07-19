export interface ApkNativeInvocationRejection {
	readonly moduleName?: unknown;
	readonly methodName?: unknown;
	readonly error?: unknown;
}

export interface ApkNativeInvocationDiagnostics {
	readonly missingNativeCalls: readonly string[];
	readonly unavailableHostServices: readonly string[];
	readonly expectedDomainRejections: readonly string[];
	readonly unexpectedRejections: readonly string[];
}

function record(value: unknown): Readonly<Record<string, unknown>> | undefined {
	return value !== null && typeof value === "object" && !Array.isArray(value)
		? value as Readonly<Record<string, unknown>>
		: undefined;
}

function nativeCall(rejection: ApkNativeInvocationRejection): string {
	const moduleName = typeof rejection.moduleName === "string" ? rejection.moduleName : "unknown";
	const methodName = typeof rejection.methodName === "string" ? rejection.methodName : "unknown";
	return `${moduleName}.${methodName}`;
}

function isExpectedApkDomainRejection(
	call: string,
	errorName: string,
	errorMessage: string,
): boolean {
	// PluginSDKModule.getFirmwareUpdateState reicht den leeren RRHomeSdk-OTA-Callback
	// nachweislich als Promise-Ablehnung "data is null" an das AppPlugin weiter.
	if (
		call === "RRPluginSDK.getFirmwareUpdateState"
		&& errorName === "Error"
		&& errorMessage === "data is null"
	) return true;

	// PluginSDKModule.readFileListAtPath lehnt einen fehlenden oder nicht als
	// Verzeichnis lesbaren Pfad in der APK ausdrücklich mit genau diesem Text ab.
	// AppPlugins verwenden diese Ablehnung als normalen "noch keine Dateien"-
	// Fallback; andere Datei- oder Hostfehler dürfen dadurch nicht verschwinden.
	return call === "RRPluginSDK.readFileListAtPath"
		&& errorName === "Error"
		&& errorMessage === "filePath not exists or is not a directory";
}

export function classifyApkNativeInvocationRejections(
	rejections: readonly ApkNativeInvocationRejection[],
): ApkNativeInvocationDiagnostics {
	const missingNativeCalls = new Set<string>();
	const unavailableHostServices = new Set<string>();
	const expectedDomainRejections = new Set<string>();
	const unexpectedRejections = new Set<string>();

	for (const rejection of rejections) {
		const call = nativeCall(rejection);
		const error = record(rejection.error);
		const errorName = typeof error?.name === "string" ? error.name : "";
		const errorMessage = typeof error?.message === "string" ? error.message : "";
		if (errorName.startsWith("MissingApk")) {
			missingNativeCalls.add(call);
		} else if (errorName === "ApkHostServiceUnavailableError") {
			unavailableHostServices.add(call);
		} else if (isExpectedApkDomainRejection(call, errorName, errorMessage)) {
			expectedDomainRejections.add(call);
		} else {
			unexpectedRejections.add(call);
		}
	}

	return {
		missingNativeCalls: [...missingNativeCalls].sort(),
		unavailableHostServices: [...unavailableHostServices].sort(),
		expectedDomainRejections: [...expectedDomainRejections].sort(),
		unexpectedRejections: [...unexpectedRejections].sort(),
	};
}
