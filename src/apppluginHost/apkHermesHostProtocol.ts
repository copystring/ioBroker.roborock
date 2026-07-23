import type { ApkRemoteModuleDefinition } from "./apkBridgeBootstrap";
import { ApkNativeModuleDispatcher } from "./apkNativeModuleDispatcher";
import type { ApkHermesSkiaRuntime, ApkSkiaHostOperation } from "./apkSkiaHostRuntime";

export type ApkHermesCallType = "async" | "promise" | "sync";
export type ApkHermesBundleKind = "hermes-bytecode" | "javascript-source";

export interface ApkHermesNativeInvocationRejection {
	moduleName: string;
	methodName: string;
	bridge: "turbo" | "batched";
	callType: ApkHermesCallType;
	error: Readonly<{ name: string; message: string }>;
}

export type ApkHermesWireValue =
	| null
	| boolean
	| number
	| string
	| ApkHermesWireValue[]
	| { [key: string]: ApkHermesWireValue };

export interface ApkHermesInvokeMessage {
	protocol: "roborock-appplugin-host";
	version: 1;
	type: "invoke";
	requestId: number;
	moduleName: string;
	methodName: string;
	callType: ApkHermesCallType;
	arguments: ApkHermesWireValue[];
}

export interface ApkHermesSkiaInvokeMessage {
	protocol: "roborock-appplugin-host";
	version: 1;
	type: "skiaInvoke";
	requestId: number;
	operation: ApkSkiaHostOperation;
	targetId: number;
	property: string;
	arguments: ApkHermesWireValue[];
}

export interface ApkHermesFlushQueueMessage {
	protocol: "roborock-appplugin-host";
	version: 1;
	type: "flushQueue";
	queue: ApkHermesWireValue;
}

export interface ApkHermesBundleProbe {
	bridgeConfigured: boolean;
	nativeModuleProxyConfigured: boolean;
	turboModuleProxyConfigured: boolean;
	ipcInvokeConfigured: boolean;
	ipcQueueConfigured: boolean;
	appKeys: string[];
	batchedBridgePresent: boolean;
	registryKind?: string;
	probeError?: string;
}

export interface ApkHermesLifecycleMessage {
	protocol: "roborock-appplugin-host";
	version: 1;
	type: "ready" | "stopped";
}

export interface ApkHermesBundleEvaluatedMessage {
	protocol: "roborock-appplugin-host";
	version: 1;
	type: "bundleEvaluated";
	bundleKind: ApkHermesBundleKind;
	probe: ApkHermesBundleProbe;
}

export interface ApkHermesApplicationStartedMessage {
	protocol: "roborock-appplugin-host";
	version: 1;
	type: "applicationStarted";
	appKey: string;
	rootTag: number;
}

export interface ApkHermesApplicationUnmountedMessage {
	protocol: "roborock-appplugin-host";
	version: 1;
	type: "applicationUnmounted";
	rootTag: number;
}

export interface ApkHermesRuntimeBarrierReachedMessage {
	protocol: "roborock-appplugin-host";
	version: 1;
	type: "runtimeBarrierReached";
	barrierId: number;
}

export interface ApkHermesFatalMessage {
	protocol: "roborock-appplugin-host";
	version: 1;
	type: "fatal";
	error: { name: string; message: string };
}

export type ApkHermesNativeMessage =
	| ApkHermesInvokeMessage
	| ApkHermesSkiaInvokeMessage
	| ApkHermesFlushQueueMessage
	| ApkHermesLifecycleMessage
	| ApkHermesBundleEvaluatedMessage
	| ApkHermesApplicationStartedMessage
	| ApkHermesApplicationUnmountedMessage
	| ApkHermesRuntimeBarrierReachedMessage
	| ApkHermesFatalMessage;

export type ApkHermesHostMessage =
	| {
		protocol: "roborock-appplugin-host";
		version: 1;
		type: "invokeResult";
		requestId: number;
		ok: true;
		value: ApkHermesWireValue;
	}
	| {
		protocol: "roborock-appplugin-host";
		version: 1;
		type: "invokeResult";
		requestId: number;
		ok: false;
		error: { name: string; message: string };
	}
	| {
		protocol: "roborock-appplugin-host";
		version: 1;
		type: "invokeCallback";
		target: "turbo" | "batched";
		callbackId: number;
		arguments: ApkHermesWireValue[];
	}
	| {
		protocol: "roborock-appplugin-host";
		version: 1;
		type: "hostError";
		moduleName?: string;
		methodName?: string;
		error: { name: string; message: string };
	}
	| {
		protocol: "roborock-appplugin-host";
		version: 1;
		type: "emitDeviceEvent";
		eventName: string;
		payload: ApkHermesWireValue;
	}
	| {
		protocol: "roborock-appplugin-host";
		version: 1;
		type: "runApplication";
		appKey: string;
		parameters: ApkHermesWireValue;
	}
	| {
		protocol: "roborock-appplugin-host";
		version: 1;
		type: "unmountApplication";
		rootTag: number;
	}
	| {
		protocol: "roborock-appplugin-host";
		version: 1;
		type: "callJsFunction";
		moduleName: string;
		methodName: string;
		arguments: ApkHermesWireValue[];
	}
	| {
		protocol: "roborock-appplugin-host";
		version: 1;
		type: "runtimeBarrier";
		barrierId: number;
	}
	| {
		protocol: "roborock-appplugin-host";
		version: 1;
		type: "shutdown";
	};

export type ApkHermesHostMessageSink = (message: ApkHermesHostMessage) => void | Promise<void>;

function errorShape(error: unknown): { name: string; message: string } {
	return error instanceof Error
		? { name: error.name, message: error.message }
		: { name: "Error", message: String(error) };
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return value !== null && typeof value === "object" && !Array.isArray(value);
}

export function toApkHermesWireValue(value: unknown, seen = new Set<object>()): ApkHermesWireValue {
	if (value === undefined) return { $apkType: "undefined" };
	if (value === null || typeof value === "boolean" || typeof value === "string") return value;
	if (typeof value === "number") {
		if (!Number.isFinite(value)) throw new Error("Hermes-Hostprotokoll unterstützt nur endliche Zahlen");
		return value;
	}
	if (Buffer.isBuffer(value) || value instanceof Uint8Array) {
		return { $apkType: "bytes", base64: Buffer.from(value).toString("base64") };
	}
	if (typeof value !== "object") {
		throw new Error(`Nicht serialisierbarer Hermes-Hostwert: ${typeof value}`);
	}
	if (seen.has(value)) throw new Error("Zyklischer Hermes-Hostwert");
	seen.add(value);
	try {
		if (Array.isArray(value)) return value.map(item => toApkHermesWireValue(item, seen));
		return Object.fromEntries(Object.entries(value).map(([key, item]) => [
			key,
			toApkHermesWireValue(item, seen),
		]));
	} finally {
		seen.delete(value);
	}
}

export function fromApkHermesWireValue(value: ApkHermesWireValue): unknown {
	if (Array.isArray(value)) return value.map(fromApkHermesWireValue);
	if (!isRecord(value)) return value;
	if (value.$apkType === "undefined") return undefined;
	if (value.$apkType === "bytes" && typeof value.base64 === "string") return Buffer.from(value.base64, "base64");
	return Object.fromEntries(Object.entries(value).map(([key, item]) => [
		key,
		fromApkHermesWireValue(item as ApkHermesWireValue),
	]));
}

function assertProtocolEnvelope(value: unknown): asserts value is Record<string, unknown> & {
	protocol: "roborock-appplugin-host";
	version: 1;
	type: string;
} {
	if (!isRecord(value) || value.protocol !== "roborock-appplugin-host" || value.version !== 1 || typeof value.type !== "string") {
		throw new Error("Ungültige Hermes-Hostprotokoll-Nachricht");
	}
}

export function parseApkHermesNativeMessage(line: string): ApkHermesNativeMessage {
	let value: unknown;
	try {
		value = JSON.parse(line);
	} catch {
		throw new Error(`Hermes-Host schrieb eine ungültige JSONL-Zeile: ${line.slice(0, 256)}`);
	}
	assertProtocolEnvelope(value);
	if (value.type === "invoke") {
		if (!Number.isInteger(value.requestId) || typeof value.moduleName !== "string"
			|| typeof value.methodName !== "string" || !Array.isArray(value.arguments)
			|| !["async", "promise", "sync"].includes(String(value.callType))) {
			throw new Error("Ungültiger Hermes-Native-Invoke");
		}
		return value as unknown as ApkHermesInvokeMessage;
	}
	if (value.type === "skiaInvoke") {
		if (!Number.isSafeInteger(value.requestId) || !Number.isSafeInteger(value.targetId)
			|| Number(value.targetId) < 1 || typeof value.property !== "string"
			|| !Array.isArray(value.arguments) || !["get", "set", "apply"].includes(String(value.operation))) {
			throw new Error("Ungültiger Hermes-Skia-Aufruf");
		}
		return value as unknown as ApkHermesSkiaInvokeMessage;
	}
	if (value.type === "flushQueue") {
		if (!("queue" in value)) throw new Error("Hermes-BatchedBridge-Queue fehlt");
		return value as unknown as ApkHermesFlushQueueMessage;
	}
	if (value.type === "ready" || value.type === "stopped") {
		return value as unknown as ApkHermesLifecycleMessage;
	}
	if (value.type === "bundleEvaluated") {
		if (!["hermes-bytecode", "javascript-source"].includes(String(value.bundleKind))
			|| !isRecord(value.probe) || !Array.isArray(value.probe.appKeys)
			|| !value.probe.appKeys.every(key => typeof key === "string")) {
			throw new Error("Ungültiges Hermes-Bundle-Probeergebnis");
		}
		return value as unknown as ApkHermesBundleEvaluatedMessage;
	}
	if (value.type === "applicationStarted") {
		if (typeof value.appKey !== "string" || !Number.isSafeInteger(value.rootTag) || Number(value.rootTag) < 1) {
			throw new Error("Ungültiger Hermes-Application-Start");
		}
		return value as unknown as ApkHermesApplicationStartedMessage;
	}
	if (value.type === "applicationUnmounted") {
		if (!Number.isSafeInteger(value.rootTag) || Number(value.rootTag) < 1) {
			throw new Error("Ungültiger Hermes-Application-Unmount");
		}
		return value as unknown as ApkHermesApplicationUnmountedMessage;
	}
	if (value.type === "runtimeBarrierReached") {
		if (!Number.isSafeInteger(value.barrierId) || Number(value.barrierId) < 1) {
			throw new Error("Ungültige Hermes-Laufzeitbarriere");
		}
		return value as unknown as ApkHermesRuntimeBarrierReachedMessage;
	}
	if (value.type === "fatal") {
		if (!isRecord(value.error) || typeof value.error.name !== "string" || typeof value.error.message !== "string") {
			throw new Error("Ungültiger fataler Hermes-Hostfehler");
		}
		return value as unknown as ApkHermesFatalMessage;
	}
	throw new Error(`Unbekannte Hermes-Native-Nachricht: ${value.type}`);
}

interface TrackedCallbackGroup {
	callbacks: ReadonlyMap<number, (...arguments_: unknown[]) => void>;
	cancel(): void;
}

export class ApkHermesHostProtocolController {
	readonly #definitions: readonly ApkRemoteModuleDefinition[];
	readonly #pendingNativeCallbackGroups = new Set<number>();
	readonly #pendingNativeCallbackWaiters = new Set<() => void>();
	#nextNativeCallbackGroupId = 1;
	#nativeCallbackActivityRevision = 0;
	#shuttingDown = false;

	public constructor(
		definitions: readonly ApkRemoteModuleDefinition[],
		private readonly dispatcher: ApkNativeModuleDispatcher,
		private readonly sink: ApkHermesHostMessageSink,
		private readonly skiaRuntime?: ApkHermesSkiaRuntime,
		private readonly onInvocationRejection?: (rejection: Readonly<ApkHermesNativeInvocationRejection>) => void,
	) {
		this.#definitions = definitions;
	}

	public get pendingNativeCallbackCount(): number {
		return this.#pendingNativeCallbackGroups.size;
	}

	public get nativeCallbackActivityRevision(): number {
		return this.#nativeCallbackActivityRevision;
	}

	public waitForPendingNativeCallbacks(): Promise<void> {
		if (this.#pendingNativeCallbackGroups.size === 0) return Promise.resolve();
		return new Promise(resolve => this.#pendingNativeCallbackWaiters.add(resolve));
	}

	public async handle(message: ApkHermesNativeMessage): Promise<void> {
		if (message.type === "invoke") {
			await this.#handleInvoke(message);
			return;
		}
		if (message.type === "skiaInvoke") {
			await this.#handleSkiaInvoke(message);
			return;
		}
		if (message.type === "flushQueue") await this.#handleFlushQueue(message);
	}

	public async emitDeviceEvent(eventName: string, payload: unknown): Promise<void> {
		await this.sink({
			protocol: "roborock-appplugin-host",
			version: 1,
			type: "emitDeviceEvent",
			eventName,
			payload: toApkHermesWireValue(payload),
		});
	}

	public async callJsFunction(
		moduleName: string,
		methodName: string,
		arguments_: readonly unknown[],
	): Promise<void> {
		if (moduleName.length === 0 || methodName.length === 0) {
			throw new Error("JavaScript-Modul und -Methode dürfen nicht leer sein");
		}
		await this.sink({
			protocol: "roborock-appplugin-host",
			version: 1,
			type: "callJsFunction",
			moduleName,
			methodName,
			arguments: arguments_.map(argument => toApkHermesWireValue(argument)),
		});
	}

	public async shutdown(): Promise<void> {
		if (this.#shuttingDown) return;
		this.#shuttingDown = true;
		if (this.#pendingNativeCallbackGroups.size > 0) {
			this.#pendingNativeCallbackGroups.clear();
			this.#nativeCallbackActivityRevision += 1;
		}
		for (const resolve of this.#pendingNativeCallbackWaiters) resolve();
		this.#pendingNativeCallbackWaiters.clear();
		await this.sink({ protocol: "roborock-appplugin-host", version: 1, type: "shutdown" });
	}

	async #handleInvoke(message: ApkHermesInvokeMessage): Promise<void> {
		const callbackGroup = this.#createTrackedCallbackGroup(
			"turbo",
			this.#collectCallbackIds(message.arguments),
		);
		try {
			this.#assertInvocationContract(message);
			const arguments_ = message.arguments.map(argument =>
				this.#materialize(argument, callbackGroup.callbacks)
			);
			const result = await this.dispatcher.invoke(message.moduleName, message.methodName, arguments_);
			await this.sink({
				protocol: "roborock-appplugin-host",
				version: 1,
				type: "invokeResult",
				requestId: message.requestId,
				ok: true,
				value: toApkHermesWireValue(result),
			});
		} catch (error) {
			callbackGroup.cancel();
			this.onInvocationRejection?.({
				moduleName: message.moduleName,
				methodName: message.methodName,
				bridge: "turbo",
				callType: message.callType,
				error: errorShape(error),
			});
			await this.sink({
				protocol: "roborock-appplugin-host",
				version: 1,
				type: "invokeResult",
				requestId: message.requestId,
				ok: false,
				error: errorShape(error),
			});
		}
	}

	async #handleSkiaInvoke(message: ApkHermesSkiaInvokeMessage): Promise<void> {
		try {
			if (!this.skiaRuntime) throw new Error("APK-Skia-JSI-Laufzeit ist nicht konfiguriert");
			const arguments_ = message.arguments.map(fromApkHermesWireValue);
			const result = await this.skiaRuntime.invoke(
				message.operation,
				message.targetId,
				message.property,
				arguments_,
			);
			await this.sink({
				protocol: "roborock-appplugin-host",
				version: 1,
				type: "invokeResult",
				requestId: message.requestId,
				ok: true,
				value: toApkHermesWireValue(result),
			});
		} catch (error) {
			await this.sink({
				protocol: "roborock-appplugin-host",
				version: 1,
				type: "invokeResult",
				requestId: message.requestId,
				ok: false,
				error: errorShape(error),
			});
		}
	}

	#assertInvocationContract(message: ApkHermesInvokeMessage): void {
		const definition = this.#definitions.find(candidate => candidate.moduleName === message.moduleName);
		const methodId = definition?.methods.indexOf(message.methodName) ?? -1;
		if (!definition || methodId < 0) return;
		const expectedType = this.#definitionCallType(definition, methodId);
		if (message.callType !== expectedType) {
			throw new Error(
				`APK-Aufruftyp für ${message.moduleName}.${message.methodName} ist ${expectedType}, nicht ${message.callType}`,
			);
		}
	}

	async #handleFlushQueue(message: ApkHermesFlushQueueMessage): Promise<void> {
		const queue = fromApkHermesWireValue(message.queue);
		if (!Array.isArray(queue) || !Array.isArray(queue[0]) || !Array.isArray(queue[1]) || !Array.isArray(queue[2])
			|| queue[0].length !== queue[1].length || queue[0].length !== queue[2].length) {
			await this.#sendHostError(new Error("Ungültige React-Native-BatchedBridge-Queue"));
			return;
		}
		for (let index = 0; index < queue[0].length; index += 1) {
			await this.#dispatchQueuedCall(queue[0][index], queue[1][index], queue[2][index]);
		}
	}

	async #dispatchQueuedCall(moduleIdValue: unknown, methodIdValue: unknown, paramsValue: unknown): Promise<void> {
		const moduleId = Number(moduleIdValue);
		const methodId = Number(methodIdValue);
		const definition = this.#definitions[moduleId];
		const methodName = definition?.methods[methodId];
		if (!definition || typeof methodName !== "string" || !Array.isArray(paramsValue)) {
			await this.#sendHostError(new Error(`Unbekannter APK-Bridge-Aufruf ${moduleId}:${methodId}`));
			return;
		}
		const parameters = [...paramsValue];
		const callType = this.#definitionCallType(definition, methodId);
		const isPromise = callType === "promise";
		if (isPromise) {
			const successCallbackId = Number(parameters.pop());
			const failureCallbackId = Number(parameters.pop());
			try {
				const result = await this.dispatcher.invoke(definition.moduleName, methodName, parameters);
				await this.#sendCallback("batched", successCallbackId, [result]);
			} catch (error) {
				this.onInvocationRejection?.({
					moduleName: definition.moduleName,
					methodName,
					bridge: "batched",
					callType,
					error: errorShape(error),
				});
				await this.#sendCallback("batched", failureCallbackId, [errorShape(error)]);
			}
			return;
		}
		const callbackCount = definition.callbackCounts[methodId] ?? 0;
		const callbackIds = callbackCount === 0
			? []
			: parameters.splice(Math.max(0, parameters.length - callbackCount)).map(Number);
		const callbackGroup = this.#createTrackedCallbackGroup("batched", callbackIds);
		const callbacks = callbackIds.map(callbackId => {
			const callback = callbackGroup.callbacks.get(callbackId);
			if (!callback) throw new Error(`APK-Callback ${callbackId} fehlt`);
			return callback;
		});
		try {
			await this.dispatcher.invoke(definition.moduleName, methodName, [...parameters, ...callbacks]);
		} catch (error) {
			callbackGroup.cancel();
			this.onInvocationRejection?.({
				moduleName: definition.moduleName,
				methodName,
				bridge: "batched",
				callType,
				error: errorShape(error),
			});
			await this.#sendHostError(error, definition.moduleName, methodName);
		}
	}

	#definitionCallType(definition: ApkRemoteModuleDefinition, methodId: number): ApkHermesCallType {
		if (definition.promiseMethodIndices.includes(methodId)) return "promise";
		if (definition.syncMethodIndices.includes(methodId)) return "sync";
		return "async";
	}

	#materialize(
		value: ApkHermesWireValue,
		callbacks: ReadonlyMap<number, (...arguments_: unknown[]) => void>,
	): unknown {
		if (Array.isArray(value)) return value.map(item => this.#materialize(item, callbacks));
		if (isRecord(value) && value.$apkType === "callback" && Number.isInteger(value.id)) {
			const callbackId = Number(value.id);
			const callback = callbacks.get(callbackId);
			if (!callback) throw new Error(`APK-Callback ${callbackId} fehlt`);
			return callback;
		}
		if (isRecord(value)) {
			if (value.$apkType === "bytes" || value.$apkType === "undefined") {
				return fromApkHermesWireValue(value as ApkHermesWireValue);
			}
			return Object.fromEntries(Object.entries(value).map(([key, item]) => [
				key,
				this.#materialize(item as ApkHermesWireValue, callbacks),
			]));
		}
		return value;
	}

	#collectCallbackIds(values: readonly ApkHermesWireValue[]): number[] {
		const callbackIds: number[] = [];
		const visit = (value: ApkHermesWireValue): void => {
			if (Array.isArray(value)) {
				for (const item of value) visit(item);
				return;
			}
			if (!isRecord(value)) return;
			if (value.$apkType === "callback" && Number.isInteger(value.id)) {
				callbackIds.push(Number(value.id));
				return;
			}
			for (const item of Object.values(value)) visit(item as ApkHermesWireValue);
		};
		for (const value of values) visit(value);
		return callbackIds;
	}

	#createTrackedCallbackGroup(
		target: "turbo" | "batched",
		callbackIds: readonly number[],
	): TrackedCallbackGroup {
		const uniqueCallbackIds = [...new Set(callbackIds)];
		if (uniqueCallbackIds.length === 0) {
			return { callbacks: new Map(), cancel: () => undefined };
		}
		for (const callbackId of uniqueCallbackIds) {
			if (!Number.isInteger(callbackId) || callbackId < 0) {
				throw new Error(`Ungültige APK-Callback-ID: ${callbackId}`);
			}
		}
		const groupId = this.#nextNativeCallbackGroupId++;
		this.#pendingNativeCallbackGroups.add(groupId);
		let settled = false;
		const finish = (): void => {
			if (!this.#pendingNativeCallbackGroups.delete(groupId)) return;
			this.#nativeCallbackActivityRevision += 1;
			if (this.#pendingNativeCallbackGroups.size !== 0) return;
			for (const resolve of this.#pendingNativeCallbackWaiters) resolve();
			this.#pendingNativeCallbackWaiters.clear();
		};
		const callbacks = new Map(uniqueCallbackIds.map(callbackId => [
			callbackId,
			(...arguments_: unknown[]): void => {
				if (settled) {
					if (this.#shuttingDown) return;
					void this.#sendHostError(new Error(`APK-Callback-Gruppe ${groupId} wurde mehrfach aufgelöst`));
					return;
				}
				settled = true;
				if (this.#shuttingDown) {
					finish();
					return;
				}
				void this.#sendCallback(target, callbackId, arguments_)
					.catch(error => this.#sendHostError(error).catch(() => undefined))
					.finally(finish);
			},
		] as const));
		return {
			callbacks,
			cancel: () => {
				if (settled) return;
				settled = true;
				finish();
			},
		};
	}

	async #sendCallback(target: "turbo" | "batched", callbackId: number, arguments_: readonly unknown[]): Promise<void> {
		if (this.#shuttingDown) return;
		if (!Number.isInteger(callbackId) || callbackId < 0) {
			await this.#sendHostError(new Error(`Ungültige APK-Callback-ID: ${callbackId}`));
			return;
		}
		await this.sink({
			protocol: "roborock-appplugin-host",
			version: 1,
			type: "invokeCallback",
			target,
			callbackId,
			arguments: arguments_.map(argument => toApkHermesWireValue(argument)),
		});
	}

	async #sendHostError(error: unknown, moduleName?: string, methodName?: string): Promise<void> {
		if (this.#shuttingDown) return;
		await this.sink({
			protocol: "roborock-appplugin-host",
			version: 1,
			type: "hostError",
			moduleName,
			methodName,
			error: errorShape(error),
		});
	}
}
