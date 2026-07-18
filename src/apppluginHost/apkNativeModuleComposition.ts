export type ApkNativeModuleImplementationPart = object;

/**
 * Combines independently tested slices of one APK React-Native module.
 *
 * React Native exposes RRPluginSDK as one module although the host keeps its
 * environment and RPC responsibilities separate. This composer copies and
 * binds callable prototype methods only; it rejects ambiguous implementations
 * instead of silently selecting one.
 */
export function composeApkNativeModuleImplementation(
	...parts: readonly ApkNativeModuleImplementationPart[]
): Record<string, (...arguments_: unknown[]) => unknown> {
	const composed: Record<string, (...arguments_: unknown[]) => unknown> = {};
	for (const part of parts) {
		const seenPrototypes = new Set<object>();
		let prototype: object | null = part;
		while (prototype && prototype !== Object.prototype && !seenPrototypes.has(prototype)) {
			seenPrototypes.add(prototype);
			for (const methodName of Object.getOwnPropertyNames(prototype)) {
				if (methodName === "constructor") continue;
				const descriptor = Object.getOwnPropertyDescriptor(prototype, methodName);
				if (typeof descriptor?.value !== "function") continue;
				if (composed[methodName]) {
					throw new Error(`Native Host-Methode ${methodName} ist in mehreren Implementierungen vorhanden`);
				}
				composed[methodName] = descriptor.value.bind(part) as (...arguments_: unknown[]) => unknown;
			}
			prototype = Object.getPrototypeOf(prototype) as object | null;
		}
	}
	return composed;
}
