import { spawn, type ChildProcessWithoutNullStreams } from "node:child_process";
import { accessSync, constants as fsConstants } from "node:fs";

import type { ApkRemoteModuleDefinition } from "./apkBridgeBootstrap";
import {
	ApkHermesHostProtocolController,
	parseApkHermesNativeMessage,
	toApkHermesWireValue,
	type ApkHermesApplicationStartedMessage,
	type ApkHermesBundleKind,
	type ApkHermesBundleProbe,
	type ApkHermesHostMessage,
	type ApkHermesNativeInvocationRejection,
} from "./apkHermesHostProtocol";
import type { ApkNativeModuleDispatcher } from "./apkNativeModuleDispatcher";
import type { ApkHermesSkiaRuntime } from "./apkSkiaHostRuntime";

export type ApkHermesHostSessionState = "idle" | "starting" | "running" | "stopping" | "stopped" | "failed";

export interface ApkHermesHostSessionOptions {
	hostExecutablePath: string;
	bundlePath: string;
	bootstrapPath: string;
	definitions: readonly ApkRemoteModuleDefinition[];
	dispatcher: ApkNativeModuleDispatcher;
	skiaRuntime?: ApkHermesSkiaRuntime;
	startupTimeoutMs?: number;
	shutdownTimeoutMs?: number;
	maxProtocolLineBytes?: number;
	maxStderrBytes?: number;
	maxHeapMegabytes?: number;
	onInvocationRejection?: (rejection: Readonly<ApkHermesNativeInvocationRejection>) => void;
}

interface Deferred<T> {
	promise: Promise<T>;
	resolve: (value: T) => void;
	reject: (error: Error) => void;
	settled: boolean;
}

function deferred<T>(): Deferred<T> {
	let resolvePromise!: (value: T) => void;
	let rejectPromise!: (error: Error) => void;
	const result: Deferred<T> = {
		promise: new Promise<T>((resolve, reject) => {
			resolvePromise = resolve;
			rejectPromise = reject;
		}),
		resolve: value => {
			if (result.settled) return;
			result.settled = true;
			resolvePromise(value);
		},
		reject: error => {
			if (result.settled) return;
			result.settled = true;
			rejectPromise(error);
		},
		settled: false,
	};
	return result;
}

export class ApkHermesJsonLineDecoder {
	readonly #maxLineBytes: number;
	#pending = Buffer.alloc(0);

	public constructor(maxLineBytes: number) {
		if (!Number.isSafeInteger(maxLineBytes) || maxLineBytes < 1) {
			throw new Error("maxLineBytes muss eine positive ganze Zahl sein");
		}
		this.#maxLineBytes = maxLineBytes;
	}

	public push(chunk: Buffer): string[] {
		const lines: string[] = [];
		let offset = 0;
		for (;;) {
			const newline = chunk.indexOf(0x0a, offset);
			if (newline < 0) break;
			this.#append(chunk.subarray(offset, newline));
			lines.push(this.#takeLine());
			offset = newline + 1;
		}
		this.#append(chunk.subarray(offset));
		return lines;
	}

	public finish(): string[] {
		return this.#pending.length === 0 ? [] : [this.#takeLine()];
	}

	#append(part: Buffer): void {
		if (this.#pending.length + part.length > this.#maxLineBytes) {
			throw new Error(`Hermes-Hostprotokollzeile überschreitet ${this.#maxLineBytes} Bytes`);
		}
		if (part.length === 0) return;
		this.#pending = this.#pending.length === 0 ? Buffer.from(part) : Buffer.concat([this.#pending, part]);
	}

	#takeLine(): string {
		let line = this.#pending;
		this.#pending = Buffer.alloc(0);
		if (line.length > 0 && line[line.length - 1] === 0x0d) line = line.subarray(0, -1);
		return line.toString("utf8");
	}
}

type ResolvedOptions = Required<Pick<
	ApkHermesHostSessionOptions,
	"startupTimeoutMs" | "shutdownTimeoutMs" | "maxProtocolLineBytes" | "maxStderrBytes" | "maxHeapMegabytes"
>> & Omit<
	ApkHermesHostSessionOptions,
	"startupTimeoutMs" | "shutdownTimeoutMs" | "maxProtocolLineBytes" | "maxStderrBytes" | "maxHeapMegabytes"
>;

export class ApkHermesHostSession {
	readonly #options: ResolvedOptions;
	readonly #startup = deferred<void>();
	readonly #exit = deferred<{ code: number | null; signal: NodeJS.Signals | null }>();
	readonly #decoder: ApkHermesJsonLineDecoder;
	readonly #mountedApplications = new Map<number, string>();
	readonly #pendingApplicationStarts = new Map<number, Readonly<{
		appKey: string;
		completion: Deferred<ApkHermesApplicationStartedMessage>;
	}>>();
	readonly #pendingApplicationUnmounts = new Map<number, Deferred<void>>();
	#state: ApkHermesHostSessionState = "idle";
	#child?: ChildProcessWithoutNullStreams;
	#controller?: ApkHermesHostProtocolController;
	#processing = Promise.resolve();
	#startupTimer?: NodeJS.Timeout;
	#failure?: Error;
	#stderr = "";
	#probe?: ApkHermesBundleProbe;
	#bundleKind?: ApkHermesBundleKind;
	#sawStopped = false;
	#nextBarrierId = 1;
	#runtimeActivityRevision = 0;
	readonly #runtimeBarriers = new Map<number, Deferred<void>>();

	public constructor(options: ApkHermesHostSessionOptions) {
		this.#options = {
			...options,
			startupTimeoutMs: options.startupTimeoutMs ?? 15_000,
			shutdownTimeoutMs: options.shutdownTimeoutMs ?? 5_000,
			maxProtocolLineBytes: options.maxProtocolLineBytes ?? 64 * 1024 * 1024,
			maxStderrBytes: options.maxStderrBytes ?? 64 * 1024,
			maxHeapMegabytes: options.maxHeapMegabytes ?? 256,
		};
		this.#decoder = new ApkHermesJsonLineDecoder(this.#options.maxProtocolLineBytes);
		if (!Number.isSafeInteger(this.#options.maxHeapMegabytes) || this.#options.maxHeapMegabytes < 32) {
			throw new Error("maxHeapMegabytes muss mindestens 32 MiB betragen");
		}
	}

	public get state(): ApkHermesHostSessionState {
		return this.#state;
	}

	public get stderr(): string {
		return this.#stderr;
	}

	public get probe(): ApkHermesBundleProbe | undefined {
		return this.#probe;
	}

	public get bundleKind(): ApkHermesBundleKind | undefined {
		return this.#bundleKind;
	}

	public waitForExit(): Promise<Readonly<{ code: number | null; signal: NodeJS.Signals | null }>> {
		return this.#exit.promise;
	}

	public async start(): Promise<void> {
		if (this.#state !== "idle") throw new Error(`Hermes-Host kann aus Zustand ${this.#state} nicht starten`);
		accessSync(this.#options.hostExecutablePath, fsConstants.X_OK);
		accessSync(this.#options.bundlePath, fsConstants.R_OK);
		accessSync(this.#options.bootstrapPath, fsConstants.R_OK);
		this.#state = "starting";
		const child = spawn(this.#options.hostExecutablePath, [
			"--bundle", this.#options.bundlePath,
			"--bootstrap", this.#options.bootstrapPath,
			"--ipc",
			"--max-heap-mb", String(this.#options.maxHeapMegabytes),
		], { stdio: ["pipe", "pipe", "pipe"], windowsHide: true, shell: false });
		this.#child = child;
		this.#controller = new ApkHermesHostProtocolController(
			this.#options.definitions,
			this.#options.dispatcher,
			message => this.#write(message),
			this.#options.skiaRuntime,
			this.#options.onInvocationRejection,
		);
		child.stdout.on("data", (chunk: Buffer) => this.#consume(chunk));
		child.stdout.on("end", () => {
			try {
				for (const line of this.#decoder.finish()) this.#enqueue(line);
			} catch (error) {
				this.#fail(error);
			}
		});
		child.stderr.on("data", (chunk: Buffer) => this.#appendStderr(chunk));
		child.on("error", error => this.#fail(error));
		child.on("close", (code, signal) => {
			void this.#processing.finally(() => this.#handleClose(code, signal));
		});
		this.#startupTimer = setTimeout(() => {
			this.#fail(new Error(`Hermes-Appplugin-Host war nach ${this.#options.startupTimeoutMs} ms nicht bereit`));
		}, this.#options.startupTimeoutMs);
		this.#startupTimer.unref();
		await this.#startup.promise;
		if (this.state !== "running") throw this.#failure ?? new Error("Hermes-Appplugin-Host ist nicht mehr aktiv");
	}

	public async runApplication(
		appKey: string,
		parameters: Readonly<Record<string, unknown>>,
	): Promise<void> {
		if (this.#state !== "running") {
			throw new Error("AppRegistry.runApplication benötigt einen laufenden Hermes-Appplugin-Host");
		}
		if (appKey.length === 0) throw new Error("appKey darf nicht leer sein");
		const rootTag = parameters.rootTag;
		if (typeof rootTag !== "number" || !Number.isSafeInteger(rootTag) || rootTag < 1) {
			throw new Error("AppRegistry.rootTag muss eine positive ganze Zahl sein");
		}
		if (
			this.#mountedApplications.has(rootTag)
			|| this.#pendingApplicationStarts.has(rootTag)
			|| this.#pendingApplicationUnmounts.has(rootTag)
		) {
			throw new Error(`AppRegistry.rootTag ${rootTag} ist bereits belegt`);
		}
		const completion = deferred<ApkHermesApplicationStartedMessage>();
		this.#pendingApplicationStarts.set(rootTag, { appKey, completion });
		try {
			await this.#write({
				protocol: "roborock-appplugin-host",
				version: 1,
				type: "runApplication",
				appKey,
				parameters: toApkHermesWireValue(parameters),
			});
		} catch (error) {
			this.#pendingApplicationStarts.delete(rootTag);
			throw error;
		}
		let timeout: NodeJS.Timeout | undefined;
		try {
			const started = await Promise.race([
				completion.promise,
				new Promise<never>((_resolve, reject) => {
					timeout = setTimeout(() => {
						reject(new Error(
							`AppRegistry.runApplication war nach ${this.#options.startupTimeoutMs} ms nicht bestätigt`,
						));
					}, this.#options.startupTimeoutMs);
					timeout.unref();
				}),
			]);
			if (started.appKey !== appKey || started.rootTag !== rootTag) {
				throw new Error("Hermes-Host bestätigte abweichende AppRegistry-Parameter");
			}
		} catch (error) {
			this.#fail(error);
			throw this.#failure ?? new Error("AppRegistry.runApplication ist fehlgeschlagen");
		} finally {
			if (timeout) clearTimeout(timeout);
		}
	}

	public async unmountApplication(rootTag: number): Promise<void> {
		if (this.#state !== "running") {
			throw new Error("AppRegistry.unmountApplicationComponentAtRootTag benötigt einen laufenden Hermes-Appplugin-Host");
		}
		if (!Number.isSafeInteger(rootTag) || rootTag < 1) {
			throw new Error("AppRegistry.rootTag muss eine positive ganze Zahl sein");
		}
		if (this.#pendingApplicationStarts.has(rootTag)) {
			throw new Error(`AppRegistry.rootTag ${rootTag} wird noch gestartet`);
		}
		if (this.#pendingApplicationUnmounts.has(rootTag)) {
			throw new Error(`AppRegistry.rootTag ${rootTag} wird bereits ausgehängt`);
		}
		if (!this.#mountedApplications.has(rootTag)) {
			throw new Error(`AppRegistry.rootTag ${rootTag} ist nicht eingehängt`);
		}
		const completion = deferred<void>();
		this.#pendingApplicationUnmounts.set(rootTag, completion);
		try {
			await this.#write({
				protocol: "roborock-appplugin-host",
				version: 1,
				type: "unmountApplication",
				rootTag,
			});
		} catch (error) {
			this.#pendingApplicationUnmounts.delete(rootTag);
			throw error;
		}
		let timeout: NodeJS.Timeout | undefined;
		try {
			await Promise.race([
				completion.promise,
				new Promise<never>((_resolve, reject) => {
					timeout = setTimeout(() => {
						reject(new Error(
							`AppRegistry.unmountApplicationComponentAtRootTag(${rootTag}) war nach `
							+ `${this.#options.startupTimeoutMs} ms nicht bestätigt`,
						));
					}, this.#options.startupTimeoutMs);
					timeout.unref();
				}),
			]);
		} catch (error) {
			this.#fail(error);
			throw this.#failure ?? new Error("AppRegistry.unmountApplicationComponentAtRootTag ist fehlgeschlagen");
		} finally {
			if (timeout) clearTimeout(timeout);
		}
	}

	public async emitDeviceEvent(eventName: string, payload: unknown): Promise<void> {
		if (this.#state !== "running" || !this.#controller) {
			throw new Error("Geräteereignisse benötigen einen laufenden Hermes-Appplugin-Host");
		}
		await this.#controller.emitDeviceEvent(eventName, payload);
	}

	public async callJsFunction(
		moduleName: string,
		methodName: string,
		arguments_: readonly unknown[],
	): Promise<void> {
		if (this.#state !== "running" || !this.#controller) {
			throw new Error("JavaScript-Modulaufrufe benötigen einen laufenden Hermes-Appplugin-Host");
		}
		await this.#controller.callJsFunction(moduleName, methodName, arguments_);
	}

	/**
	 * Waits until callback and microtask cascades caused by earlier commands have
	 * crossed the native Hermes boundary. Two or more rounds can be necessary:
	 * handling native work before one barrier may itself enqueue a callback that
	 * is ordered immediately before the following barrier.
	 */
	public async waitForRuntimeIdle(maxRounds = 32): Promise<number> {
		if (this.#state !== "running" || !this.#controller) {
			throw new Error("Laufzeitsynchronisierung benötigt einen laufenden Hermes-Appplugin-Host");
		}
		if (!Number.isSafeInteger(maxRounds) || maxRounds < 1) {
			throw new Error("maxRounds muss eine positive ganze Zahl sein");
		}
		const controller = this.#controller;
		for (let round = 1; round <= maxRounds; round += 1) {
			const runtimeRevisionBefore = this.#runtimeActivityRevision;
			const callbackRevisionBefore = controller.nativeCallbackActivityRevision;
			await this.#crossRuntimeBarrier();
			if (controller.pendingNativeCallbackCount > 0) {
				await this.#waitForPendingNativeCallbacks(controller);
				continue;
			}
			if (
				this.#runtimeActivityRevision === runtimeRevisionBefore
				&& controller.nativeCallbackActivityRevision === callbackRevisionBefore
			) {
				return round;
			}
		}
		throw new Error(`Hermes-Appplugin-Laufzeit wurde nach ${maxRounds} Barrieren nicht ruhig`);
	}

	/**
	 * Waits for the Hermes/React bridge itself to become quiet without requiring
	 * deferred native callbacks to have completed. Android's UIManager.measure
	 * deliberately keeps its callback open until the following native layout
	 * pass, so waiting for every callback here would deadlock before that pass.
	 */
	public async waitForRuntimeBoundaryIdle(maxRounds = 32): Promise<number> {
		if (this.#state !== "running" || !this.#controller) {
			throw new Error("Laufzeitsynchronisierung benötigt einen laufenden Hermes-Appplugin-Host");
		}
		if (!Number.isSafeInteger(maxRounds) || maxRounds < 1) {
			throw new Error("maxRounds muss eine positive ganze Zahl sein");
		}
		const controller = this.#controller;
		for (let round = 1; round <= maxRounds; round += 1) {
			const runtimeRevisionBefore = this.#runtimeActivityRevision;
			const callbackRevisionBefore = controller.nativeCallbackActivityRevision;
			await this.#crossRuntimeBarrier();
			if (
				this.#runtimeActivityRevision === runtimeRevisionBefore
				&& controller.nativeCallbackActivityRevision === callbackRevisionBefore
			) {
				return round;
			}
		}
		throw new Error(`Hermes-Appplugin-Bridge wurde nach ${maxRounds} Barrieren nicht ruhig`);
	}

	/**
	 * Crosses exactly one Hermes/native boundary after all previously submitted
	 * commands. Android input delivery needs this single turn before the host can
	 * observe synchronous React work, but it does not wait for unrelated ongoing
	 * animations or future timer activity to make the whole bridge quiet.
	 */
	public async flushRuntimeBoundary(): Promise<void> {
		if (this.#state !== "running" || !this.#controller) {
			throw new Error("Laufzeitsynchronisierung benötigt einen laufenden Hermes-Appplugin-Host");
		}
		await this.#crossRuntimeBarrier();
	}

	async #waitForPendingNativeCallbacks(controller: ApkHermesHostProtocolController): Promise<void> {
		let timeout: NodeJS.Timeout | undefined;
		try {
			await Promise.race([
				controller.waitForPendingNativeCallbacks(),
				new Promise<never>((_resolve, reject) => {
					timeout = setTimeout(() => {
						reject(new Error(
							`${controller.pendingNativeCallbackCount} native APK-Callback-Gruppe(n) `
							+ `wurden nach ${this.#options.startupTimeoutMs} ms nicht aufgelöst`,
						));
					}, this.#options.startupTimeoutMs);
					timeout.unref();
				}),
			]);
		} catch (error) {
			this.#fail(error);
			throw this.#failure ?? new Error("Native APK-Callbacks sind fehlgeschlagen");
		} finally {
			if (timeout) clearTimeout(timeout);
		}
	}

	public async stop(): Promise<void> {
		if (this.#state === "idle" || this.#state === "stopped") return;
		if (this.#state === "failed") {
			await this.#waitForExitOrTerminate();
			throw this.#failure ?? new Error("Hermes-Appplugin-Host ist fehlgeschlagen");
		}
		this.#state = "stopping";
		this.#clearStartupTimer();
		if (!this.#controller) throw new Error("Hermes-Hostcontroller fehlt");
		await this.#controller.shutdown();
		await this.#waitForExitOrTerminate();
		if (this.state === "failed") throw this.#failure;
	}

	#consume(chunk: Buffer): void {
		try {
			for (const line of this.#decoder.push(chunk)) this.#enqueue(line);
		} catch (error) {
			this.#fail(error);
		}
	}

	#enqueue(line: string): void {
		if (line.length === 0) return;
		this.#processing = this.#processing.then(() => this.#handleLine(line)).catch(error => this.#fail(error));
	}

	async #handleLine(line: string): Promise<void> {
		const message = parseApkHermesNativeMessage(line);
		if (message.type === "fatal") {
			this.#fail(new Error(`${message.error.name}: ${message.error.message}`));
			return;
		}
		if (message.type === "ready") return;
		if (message.type === "bundleEvaluated") {
			if (this.#state !== "starting") throw new Error(`bundleEvaluated im Zustand ${this.#state}`);
			this.#probe = message.probe;
			this.#bundleKind = message.bundleKind;
			this.#state = "running";
			this.#clearStartupTimer();
			this.#startup.resolve();
			return;
		}
		if (message.type === "applicationStarted") {
			if (this.#state !== "running" && this.#state !== "stopping") {
				throw new Error(`applicationStarted im Zustand ${this.#state}`);
			}
			const pending = this.#pendingApplicationStarts.get(message.rootTag);
			if (!pending) throw new Error(`applicationStarted für unbekannten Root-Tag ${message.rootTag}`);
			if (pending.appKey !== message.appKey) {
				throw new Error(
					`Hermes-Host bestätigte für Root-Tag ${message.rootTag} App ${message.appKey} statt ${pending.appKey}`,
				);
			}
			this.#pendingApplicationStarts.delete(message.rootTag);
			this.#mountedApplications.set(message.rootTag, message.appKey);
			pending.completion.resolve(message);
			return;
		}
		if (message.type === "applicationUnmounted") {
			if (this.#state !== "running" && this.#state !== "stopping") {
				throw new Error(`applicationUnmounted im Zustand ${this.#state}`);
			}
			const pending = this.#pendingApplicationUnmounts.get(message.rootTag);
			if (!pending) throw new Error(`applicationUnmounted für unbekannten Root-Tag ${message.rootTag}`);
			this.#pendingApplicationUnmounts.delete(message.rootTag);
			this.#mountedApplications.delete(message.rootTag);
			pending.resolve();
			return;
		}
		if (message.type === "runtimeBarrierReached") {
			const barrier = this.#runtimeBarriers.get(message.barrierId);
			if (!barrier) throw new Error(`Unbekannte Hermes-Laufzeitbarriere: ${message.barrierId}`);
			this.#runtimeBarriers.delete(message.barrierId);
			barrier.resolve();
			return;
		}
		if (message.type === "stopped") {
			this.#sawStopped = true;
			return;
		}
		this.#runtimeActivityRevision += 1;
		await this.#controller?.handle(message);
	}

	async #crossRuntimeBarrier(): Promise<void> {
		const barrierId = this.#nextBarrierId++;
		const barrier = deferred<void>();
		this.#runtimeBarriers.set(barrierId, barrier);
		await this.#write({
			protocol: "roborock-appplugin-host",
			version: 1,
			type: "runtimeBarrier",
			barrierId,
		});
		let timeout: NodeJS.Timeout | undefined;
		try {
			await Promise.race([
				barrier.promise,
				new Promise<never>((_resolve, reject) => {
					timeout = setTimeout(() => {
						reject(new Error(
							`Hermes-Laufzeitbarriere ${barrierId} wurde nach ${this.#options.startupTimeoutMs} ms nicht erreicht`,
						));
					}, this.#options.startupTimeoutMs);
					timeout.unref();
				}),
			]);
		} catch (error) {
			this.#fail(error);
			throw this.#failure ?? new Error("Hermes-Laufzeitbarriere ist fehlgeschlagen");
		} finally {
			if (timeout) clearTimeout(timeout);
			this.#runtimeBarriers.delete(barrierId);
		}
	}

	async #write(message: ApkHermesHostMessage): Promise<void> {
		const child = this.#child;
		if (!child || child.stdin.destroyed || !child.stdin.writable) {
			throw new Error("Hermes-Appplugin-Host nimmt keine Nachrichten mehr an");
		}
		let timeout: NodeJS.Timeout | undefined;
		try {
			await Promise.race([
				new Promise<void>((resolve, reject) => {
					child.stdin.write(`${JSON.stringify(message)}\n`, error => error ? reject(error) : resolve());
				}),
				new Promise<never>((_resolve, reject) => {
					timeout = setTimeout(() => {
						reject(new Error(
							`Hermes-Appplugin-Host nahm eine Nachricht nach ${this.#options.startupTimeoutMs} ms nicht an`,
						));
					}, this.#options.startupTimeoutMs);
					timeout.unref();
				}),
			]);
		} catch (error) {
			this.#fail(error);
			throw this.#failure ?? new Error("Schreiben zum Hermes-Appplugin-Host ist fehlgeschlagen");
		} finally {
			if (timeout) clearTimeout(timeout);
		}
	}

	async #waitForExitOrTerminate(): Promise<void> {
		let timeout: NodeJS.Timeout | undefined;
		try {
			await Promise.race([
				this.#exit.promise,
				new Promise<never>((_resolve, reject) => {
					timeout = setTimeout(() => {
						this.#child?.kill();
						reject(new Error(
							`Hermes-Appplugin-Host stoppte nicht innerhalb von ${this.#options.shutdownTimeoutMs} ms`,
						));
					}, this.#options.shutdownTimeoutMs);
					timeout.unref();
				}),
			]);
		} finally {
			if (timeout) clearTimeout(timeout);
		}
	}

	#appendStderr(chunk: Buffer): void {
		this.#stderr += chunk.toString("utf8");
		if (Buffer.byteLength(this.#stderr, "utf8") > this.#options.maxStderrBytes) {
			this.#stderr = this.#stderr.slice(-this.#options.maxStderrBytes);
		}
	}

	#handleClose(code: number | null, signal: NodeJS.Signals | null): void {
		this.#clearStartupTimer();
		if (this.#state === "starting") {
			this.#fail(new Error(`Hermes-Appplugin-Host endete vor bundleEvaluated (Code ${code ?? "null"})`), false);
		} else if (this.#state === "running") {
			this.#fail(new Error(`Hermes-Appplugin-Host endete unerwartet (Code ${code ?? "null"})`), false);
		} else if (this.#state === "stopping") {
			if (code === 0 && this.#sawStopped) {
				this.#mountedApplications.clear();
				this.#state = "stopped";
			} else {
				this.#fail(new Error(
					`Ungültiger Hermes-Hostabschluss: Code ${code ?? "null"}, stopped=${this.#sawStopped}`,
				), false);
			}
		}
		this.#exit.resolve({ code, signal });
	}

	#fail(error: unknown, terminate = true): void {
		const normalized = error instanceof Error ? error : new Error(String(error));
		if (!this.#failure) this.#failure = normalized;
		this.#state = "failed";
		this.#clearStartupTimer();
		this.#startup.reject(this.#failure);
		for (const pending of this.#pendingApplicationStarts.values()) pending.completion.reject(this.#failure);
		this.#pendingApplicationStarts.clear();
		for (const pending of this.#pendingApplicationUnmounts.values()) pending.reject(this.#failure);
		this.#pendingApplicationUnmounts.clear();
		this.#mountedApplications.clear();
		for (const barrier of this.#runtimeBarriers.values()) barrier.reject(this.#failure);
		this.#runtimeBarriers.clear();
		if (terminate && this.#child && !this.#child.killed) this.#child.kill();
	}

	#clearStartupTimer(): void {
		if (!this.#startupTimer) return;
		clearTimeout(this.#startupTimer);
		this.#startupTimer = undefined;
	}
}
