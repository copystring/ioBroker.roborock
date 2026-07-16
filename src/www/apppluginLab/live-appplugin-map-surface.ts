export type LiveAppPluginMapTool = "view" | "rooms" | "zones" | "noGo" | "noMop" | "virtualWall" | "pin";
export type LiveAppPluginThemeMode = "dark" | "light" | "system";
export type LiveAppPluginColorScheme = "dark" | "light";
export type LiveAppPluginSurfaceView = "map" | "full";

interface LiveAppPluginSurfaceDescriptor {
	tag: number;
	viewName: string;
	width: number;
	height: number;
	area: number;
	responderContractCount: number;
}

interface LiveAppPluginViewport {
	x: number;
	y: number;
	width: number;
	height: number;
}

interface LiveAppPluginHealth {
	status: "appplugin-session-ready";
	deviceModel: string;
	profileLabel: string;
	revision: number;
	frameRevision: number;
	surface: LiveAppPluginSurfaceDescriptor;
	viewport: LiveAppPluginViewport;
	bundleKind: string;
	productFallbackAllowed: false;
	colorScheme: LiveAppPluginColorScheme;
	colorModel: "dark" | "default" | "light";
	cardStyle: number;
	themeSwitching: boolean;
	view: LiveAppPluginSurfaceView;
	availableViews: LiveAppPluginSurfaceView[];
	publishedDpsCount: number;
}

interface PointerResponse {
	revision: number;
	frameRevision: number;
	frameChanged: boolean;
	surface: LiveAppPluginSurfaceDescriptor;
	viewport: LiveAppPluginViewport;
	targets: number[];
	changedIndices: number[];
	activePointerIds: number[];
	publishedDpsCount: number;
	view: LiveAppPluginSurfaceView;
}

interface ThemeResponse {
	revision: number;
	frameRevision: number;
	surface: LiveAppPluginSurfaceDescriptor;
	viewport: LiveAppPluginViewport;
	colorScheme: LiveAppPluginColorScheme;
	colorModel: "dark" | "default" | "light";
	cardStyle: number;
	view: LiveAppPluginSurfaceView;
}

interface PublishedDpsResponse {
	revision: number;
	publishedDps: unknown[];
	publishedDpsCount: number;
	after: number;
}

export interface LiveAppPluginMapSnapshot {
	deviceModel: string;
	profileLabel: string;
	revision: number;
	frameRevision: number;
	surface: LiveAppPluginSurfaceDescriptor;
	viewport: LiveAppPluginViewport;
	bundleKind: string;
	productFallbackAllowed: false;
	colorScheme: LiveAppPluginColorScheme;
	colorModel: "dark" | "default" | "light";
	cardStyle: number;
	themeSwitching: boolean;
	view: LiveAppPluginSurfaceView;
	availableViews: LiveAppPluginSurfaceView[];
	publishedDpsCount: number;
}

export interface LiveAppPluginMapSurfaceOptions {
	viewport: HTMLElement;
	frame: HTMLImageElement;
	onEvent: (label: string, data: unknown) => void;
	onChange: (snapshot: LiveAppPluginMapSnapshot) => void;
	apiBaseUrl?: string;
	initialView?: LiveAppPluginSurfaceView;
}

function finite(value: number, name: string): number {
	if (!Number.isFinite(value)) throw new Error(`${name} muss endlich sein`);
	return value;
}

export class LiveAppPluginMapSurface {
	readonly #apiBaseUrl: string;
	readonly #activePointers = new Set<number>();
	readonly #pendingPointerMoves = new Map<number, { x: number; y: number }>();
	#requestQueue: Promise<unknown> = Promise.resolve();
	#pointerMoveFrame?: number;
	#health!: LiveAppPluginHealth;
	#publishedDpsCount = 0;

	public constructor(private readonly options: LiveAppPluginMapSurfaceOptions) {
		this.#apiBaseUrl = (options.apiBaseUrl ?? "http://127.0.0.1:4174").replace(/\/$/u, "");
	}

	public async init(): Promise<void> {
		this.#health = await this.#fetchHealth(this.options.initialView ?? "map");
		this.#publishedDpsCount = this.#health.publishedDpsCount;
		this.options.viewport.dataset.renderMode = "unchanged-appplugin-session";
		this.options.viewport.dataset.bundleKind = this.#health.bundleKind;
		this.options.viewport.dataset.productFallbackAllowed = String(this.#health.productFallbackAllowed);
		this.#refreshFrame();
		this.#bindPointers();
		this.#emitChange();
	}

	public setView(view: LiveAppPluginSurfaceView): Promise<void> {
		if (view === this.#health.view) return Promise.resolve();
		if (!this.#health.availableViews.includes(view)) {
			return Promise.reject(new Error(`Die laufende AppPlugin-Sitzung bietet die Ansicht ${view} nicht an`));
		}
		return this.#enqueue(async () => {
			this.#health = await this.#fetchHealth(view);
			this.#publishedDpsCount = this.#health.publishedDpsCount;
			this.#refreshFrame();
			this.#emitChange();
			this.options.onEvent("AppPlugin-Ansicht gewechselt", {
				view,
				surface: this.#health.surface,
				viewport: this.#health.viewport,
			});
		});
	}

	public snapshot(): LiveAppPluginMapSnapshot {
		return {
			deviceModel: this.#health.deviceModel,
			profileLabel: this.#health.profileLabel,
			revision: this.#health.revision,
			frameRevision: this.#health.frameRevision,
			surface: { ...this.#health.surface },
			viewport: { ...this.#health.viewport },
			bundleKind: this.#health.bundleKind,
			productFallbackAllowed: false,
			colorScheme: this.#health.colorScheme,
			colorModel: this.#health.colorModel,
			cardStyle: this.#health.cardStyle,
			themeSwitching: this.#health.themeSwitching,
			view: this.#health.view,
			availableViews: [...this.#health.availableViews],
			publishedDpsCount: this.#publishedDpsCount,
		};
	}

	public setTheme(mode: LiveAppPluginThemeMode): Promise<void> {
		if (!this.#health.themeSwitching) {
			throw new Error("Die laufende AppPlugin-Sitzung unterstützt den APK-Theme-Wechsel noch nicht");
		}
		const systemColorScheme: LiveAppPluginColorScheme = matchMedia("(prefers-color-scheme: dark)").matches
			? "dark"
			: "light";
		return this.#enqueue(async () => {
			const response = await fetch(`${this.#apiBaseUrl}/theme?view=${this.#health.view}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ mode, systemColorScheme }),
			});
			const payload = await response.json() as ThemeResponse | { error: string };
			if (!response.ok || "error" in payload) {
				throw new Error("error" in payload ? payload.error : `Theme-Bridge antwortet mit HTTP ${response.status}`);
			}
			this.#health = { ...this.#health, ...payload };
			this.#refreshFrame();
			this.#emitChange();
			this.options.onEvent("APK-Konfigurationswechsel an AppPlugin gesendet", { mode, ...payload });
		});
	}

	public async zoomBy(delta: number): Promise<void> {
		if (delta === 0) return;
		const { width, height } = this.#health.surface;
		const centerX = width / 2;
		const centerY = height / 2;
		const startDistance = Math.min(width * 0.28, 100);
		const endDistance = delta > 0
			? Math.min(width * 0.72, startDistance * 1.8)
			: Math.max(24, startDistance * 0.55);
		const rightX = centerX + startDistance / 2;
		const startLeftX = rightX - startDistance;
		const endLeftX = rightX - endDistance;
		const leftId = 10_001;
		const rightId = 10_002;
		// Das erste MOVE beansprucht den React-Native-Responder. Das zweite MOVE
		// verändert den Zoom im bereits aktiven AppPlugin-PanResponder. Ein einzelnes
		// MOVE wird beim Loslassen verworfen; weitere Zwischenstufen sind unnötig.
		const movementSteps = 2;
		const moves = Array.from({ length: movementSteps }, (_, index) => {
			const progress = (index + 1) / movementSteps;
			return {
				kind: "move" as const,
				pointerId: leftId,
				x: startLeftX + (endLeftX - startLeftX) * progress,
				y: centerY,
			};
		});
		await this.#sendPointerSequence([
			{ kind: "down", pointerId: leftId, x: startLeftX, y: centerY },
			{ kind: "down", pointerId: rightId, x: rightX, y: centerY },
			...moves,
			{ kind: "up", pointerId: rightId, x: rightX, y: centerY },
			{ kind: "up", pointerId: leftId, x: endLeftX, y: centerY },
		]);
		this.options.onEvent("APK-Pinch an AppPlugin gesendet", { delta, revision: this.#health.revision });
	}

	#bindPointers(): void {
		this.options.viewport.addEventListener("pointerdown", event => {
			const point = this.#toSurfacePoint(event.clientX, event.clientY);
			if (!point) return;
			event.preventDefault();
			this.options.viewport.setPointerCapture(event.pointerId);
			this.#activePointers.add(event.pointerId);
			void this.#sendPointer("down", event.pointerId, point.x, point.y);
		});
		this.options.viewport.addEventListener("pointermove", event => {
			if (!this.#activePointers.has(event.pointerId)) return;
			const point = this.#toSurfacePoint(event.clientX, event.clientY);
			if (!point) return;
			event.preventDefault();
			this.#queuePointerMove(event.pointerId, point.x, point.y);
		});
		const release = (kind: "up" | "cancel", event: PointerEvent): void => {
			if (!this.#activePointers.delete(event.pointerId)) return;
			const point = this.#toSurfacePoint(event.clientX, event.clientY);
			if (kind === "cancel" || !point) {
				void this.#sendCancel();
				return;
			}
			event.preventDefault();
			const pendingMove = this.#takePendingPointerMove(event.pointerId);
			void this.#sendPointerSequence([
				...(pendingMove ? [{ kind: "move" as const, pointerId: event.pointerId, ...pendingMove }] : []),
				{ kind: "up" as const, pointerId: event.pointerId, x: point.x, y: point.y },
			]);
		};
		this.options.viewport.addEventListener("pointerup", event => release("up", event));
		this.options.viewport.addEventListener("pointercancel", event => release("cancel", event));
	}

	#queuePointerMove(pointerId: number, x: number, y: number): void {
		this.#pendingPointerMoves.set(pointerId, { x, y });
		if (this.#pointerMoveFrame !== undefined) return;
		this.#pointerMoveFrame = requestAnimationFrame(() => {
			this.#pointerMoveFrame = undefined;
			const moves = [...this.#pendingPointerMoves].map(([pendingPointerId, point]) => ({
				kind: "move" as const,
				pointerId: pendingPointerId,
				...point,
			}));
			this.#pendingPointerMoves.clear();
			if (moves.length > 0) void this.#sendPointerSequence(moves);
		});
	}

	#takePendingPointerMove(pointerId: number): { x: number; y: number } | undefined {
		const move = this.#pendingPointerMoves.get(pointerId);
		this.#pendingPointerMoves.delete(pointerId);
		if (this.#pendingPointerMoves.size === 0 && this.#pointerMoveFrame !== undefined) {
			cancelAnimationFrame(this.#pointerMoveFrame);
			this.#pointerMoveFrame = undefined;
		}
		return move;
	}

	#toSurfacePoint(clientX: number, clientY: number): { x: number; y: number } | undefined {
		const rect = this.options.viewport.getBoundingClientRect();
		const { width, height, x, y } = this.#health.viewport;
		const scale = Math.min(rect.width / width, rect.height / height);
		const renderedWidth = width * scale;
		const renderedHeight = height * scale;
		const left = rect.left + (rect.width - renderedWidth) / 2;
		const top = rect.top + (rect.height - renderedHeight) / 2;
		if (clientX < left || clientY < top || clientX > left + renderedWidth || clientY > top + renderedHeight) {
			return undefined;
		}
		return {
			x: x + finite((clientX - left) / scale, "Pointer-x"),
			y: y + finite((clientY - top) / scale, "Pointer-y"),
		};
	}

	#sendPointer(kind: "down" | "move" | "up", pointerId: number, x: number, y: number): Promise<void> {
		return this.#sendPointerSequence([{ kind, pointerId, x, y }]);
	}

	#sendPointerSequence(
		pointers: readonly Readonly<{ kind: "down" | "move" | "up"; pointerId: number; x: number; y: number }>[],
	): Promise<void> {
		return this.#enqueue(async () => {
			if (pointers.length === 1) {
				await this.#requestPointer(pointers[0]);
				return;
			}
			const startedAt = performance.timeOrigin + performance.now();
			const response = await fetch(`${this.#apiBaseUrl}/pointer-sequence?view=${this.#health.view}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					pointers: pointers.map((pointer, index) => ({ ...pointer, timeMs: startedAt + index })),
				}),
			});
			const payload = await response.json() as PointerResponse | { error: string };
			if (!response.ok || "error" in payload) {
				throw new Error("error" in payload ? payload.error : `Pointer-Sequenz antwortet mit HTTP ${response.status}`);
			}
			await this.#applyPointerResponse(payload);
			this.options.onEvent("AppPlugin-Pointersequenz", {
				kinds: pointers.map(pointer => pointer.kind),
				...payload,
			});
		});
	}

	async #requestPointer(
		pointer: Readonly<{ kind: "down" | "move" | "up"; pointerId: number; x: number; y: number }>,
	): Promise<void> {
		const response = await fetch(`${this.#apiBaseUrl}/pointer?view=${this.#health.view}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ ...pointer, timeMs: performance.timeOrigin + performance.now() }),
		});
		const payload = await response.json() as PointerResponse | { error: string };
		if (!response.ok || "error" in payload) {
			throw new Error("error" in payload ? payload.error : `Pointer-Bridge antwortet mit HTTP ${response.status}`);
		}
		await this.#applyPointerResponse(payload);
		this.options.onEvent(`AppPlugin-Pointer ${pointer.kind}`, payload);
	}

	#sendCancel(): Promise<void> {
		this.#activePointers.clear();
		this.#pendingPointerMoves.clear();
		if (this.#pointerMoveFrame !== undefined) cancelAnimationFrame(this.#pointerMoveFrame);
		this.#pointerMoveFrame = undefined;
		return this.#enqueue(async () => {
			const response = await fetch(`${this.#apiBaseUrl}/pointer?view=${this.#health.view}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ kind: "cancel", timeMs: performance.timeOrigin + performance.now() }),
			});
			const payload = await response.json() as PointerResponse | { error: string };
			if (!response.ok || "error" in payload) {
				throw new Error("error" in payload ? payload.error : `Pointer-Abbruch antwortet mit HTTP ${response.status}`);
			}
			await this.#applyPointerResponse(payload);
		});
	}

	async #applyPointerResponse(response: PointerResponse): Promise<void> {
		const frameChanged = response.frameRevision !== this.#health.frameRevision;
		this.#health = {
			...this.#health,
			revision: response.revision,
			frameRevision: response.frameRevision,
			surface: response.surface,
			viewport: response.viewport,
			view: response.view,
			publishedDpsCount: response.publishedDpsCount,
		};
		if (frameChanged) this.#refreshFrame();
		this.#emitChange();
		if (response.publishedDpsCount > this.#publishedDpsCount) await this.#syncPublishedDps(response.publishedDpsCount);
	}

	async #fetchHealth(view: LiveAppPluginSurfaceView): Promise<LiveAppPluginHealth> {
		const response = await fetch(`${this.#apiBaseUrl}/health?view=${view}`, { cache: "no-store" });
		if (!response.ok) throw new Error(`AppPlugin-Sitzung antwortet mit HTTP ${response.status}`);
		const health = await response.json() as LiveAppPluginHealth;
		if (health.status !== "appplugin-session-ready" || health.productFallbackAllowed !== false) {
			throw new Error("Die Kartenquelle ist keine unveränderte laufende AppPlugin-Sitzung");
		}
		return {
			...health,
			colorScheme: health.colorScheme ?? "light",
			colorModel: health.colorModel ?? "default",
			cardStyle: health.cardStyle ?? 0,
			themeSwitching: health.themeSwitching === true,
			view: health.view ?? view,
			availableViews: health.availableViews ?? [health.view ?? view],
			publishedDpsCount: health.publishedDpsCount ?? 0,
		};
	}

	async #syncPublishedDps(expectedCount: number): Promise<void> {
		const after = this.#publishedDpsCount;
		const response = await fetch(`${this.#apiBaseUrl}/published-dps?after=${after}`, { cache: "no-store" });
		if (!response.ok) throw new Error(`AppPlugin-DPS-Protokoll antwortet mit HTTP ${response.status}`);
		const payload = await response.json() as PublishedDpsResponse;
		if (payload.after !== after || payload.publishedDpsCount < expectedCount) {
			throw new Error("AppPlugin-DPS-Protokoll ist nicht konsistent mit der Pointer-Antwort");
		}
		payload.publishedDps.forEach((publication, index) => {
			this.options.onEvent("Originaler AppPlugin-Aufruf – nicht an Gerät gesendet", {
				sequence: after + index + 1,
				source: "RRDevice.deviceIOT.publishDps",
				publication,
			});
		});
		this.#publishedDpsCount = payload.publishedDpsCount;
		this.#health = { ...this.#health, publishedDpsCount: payload.publishedDpsCount };
		this.#emitChange();
	}

	#refreshFrame(): void {
		this.options.frame.src = `${this.#apiBaseUrl}/frame.svg?view=${this.#health.view}&revision=${this.#health.frameRevision}`;
	}

	#emitChange(): void {
		this.options.onChange(this.snapshot());
	}

	#enqueue<T>(operation: () => Promise<T>): Promise<T> {
		const pending = this.#requestQueue.then(operation, operation);
		this.#requestQueue = pending.catch(error => {
			this.options.onEvent("AppPlugin-Sitzungsfehler", {
				message: error instanceof Error ? error.message : String(error),
			});
		});
		return pending;
	}
}
