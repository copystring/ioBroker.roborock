export type LiveAppPluginMapTool = "view" | "rooms" | "zones" | "noGo" | "noMop" | "virtualWall" | "pin";
export type LiveAppPluginThemeMode = "dark" | "light" | "system";
export type LiveAppPluginColorScheme = "dark" | "light";
export type LiveAppPluginSurfaceView = "map" | "full";
export type LiveAppPluginMapFamily = "scmap" | "yx" | "v1" | "tanos" | "tanos-hybrid" | "unknown";
export type LiveAppPluginSemanticActionId =
	| "map.mode.full"
	| "map.mode.rooms"
	| "map.mode.zones"
	| "clean.panel"
	| "dock.panel"
	| "clean.start";

export function hasInteractiveAppPluginMap(
	state: Readonly<{ availableViews: readonly LiveAppPluginSurfaceView[] }>,
): boolean {
	return state.availableViews.includes("map");
}

export interface LiveAppPluginSemanticAction {
	id: LiveAppPluginSemanticActionId;
	label: string;
	enabled: boolean;
	selected: boolean;
	owner: "desktop-host-adapter";
	provenance: "host-heuristic-from-appplugin-tree";
	contract: "host-map-bottom-control-panel-v3";
}

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

export interface LiveAppPluginFramePresentation {
	left: number;
	top: number;
	width: number;
	height: number;
	scale: number;
}

interface LiveAppPluginLocalizationState {
	language: string;
	localeIdentifier: string;
	systemLocaleIdentifier: string;
	isRTL: boolean;
	doLeftAndRightSwapInRTL: boolean;
	availableLanguages: string[];
	languageSwitching: boolean;
}

interface LiveAppPluginHealth extends LiveAppPluginLocalizationState {
	status: "appplugin-session-ready";
	sessionId: string;
	profileId: string;
	mapFamily: LiveAppPluginMapFamily;
	availableProfiles: string[];
	deviceModel: string;
	profileLabel: string;
	revision: number;
	frameRevision: number;
	surface: LiveAppPluginSurfaceDescriptor;
	viewport: LiveAppPluginViewport;
	presentationFocus?: LiveAppPluginViewport;
	bundleKind: string;
	bundleSha256: string;
	bundleProvenance: "unchanged-appplugin-bundle";
	renderProvenance: "host-svg-diagnostic";
	inputProvenance: "host-apk-contract-emulation";
	semanticActionProvenance: "host-heuristic-from-appplugin-tree";
	productFallbackAllowed: false;
	colorScheme: LiveAppPluginColorScheme;
	colorModel: "dark" | "default" | "light";
	systemColorScheme: LiveAppPluginColorScheme;
	cardStyle: number;
	themeSwitching: boolean;
	view: LiveAppPluginSurfaceView;
	availableViews: LiveAppPluginSurfaceView[];
	publishedDpsCount: number;
	pageCloseRequestCount: number;
	semanticActions: LiveAppPluginSemanticAction[];
}

interface PointerResponse extends LiveAppPluginLocalizationState {
	revision: number;
	frameRevision: number;
	frameChanged: boolean;
	surface: LiveAppPluginSurfaceDescriptor;
	viewport: LiveAppPluginViewport;
	targets: number[];
	changedIndices: number[];
	activePointerIds: number[];
	publishedDpsCount: number;
	pageCloseRequestCount: number;
	view: LiveAppPluginSurfaceView;
	semanticActions: LiveAppPluginSemanticAction[];
}

interface ThemeResponse extends LiveAppPluginLocalizationState {
	revision: number;
	frameRevision: number;
	surface: LiveAppPluginSurfaceDescriptor;
	viewport: LiveAppPluginViewport;
	colorScheme: LiveAppPluginColorScheme;
	colorModel: "dark" | "default" | "light";
	systemColorScheme: LiveAppPluginColorScheme;
	cardStyle: number;
	view: LiveAppPluginSurfaceView;
	semanticActions: LiveAppPluginSemanticAction[];
}

interface LocalizationResponse extends LiveAppPluginLocalizationState {
	sessionId: string;
	revision: number;
	frameRevision: number;
	frameChanged: boolean;
	sessionRestarting: boolean;
	surface: LiveAppPluginSurfaceDescriptor;
	viewport: LiveAppPluginViewport;
	view: LiveAppPluginSurfaceView;
	semanticActions: LiveAppPluginSemanticAction[];
}

interface SemanticActionResponse extends PointerResponse {
	action: LiveAppPluginSemanticAction;
}

interface PublishedDpsResponse {
	revision: number;
	publishedDps: unknown[];
	publishedDpsCount: number;
	after: number;
	retainedFrom?: number;
	truncated?: boolean;
}

export interface LiveAppPluginMapSnapshot extends LiveAppPluginLocalizationState {
	sessionId: string;
	profileId: string;
	mapFamily: LiveAppPluginMapFamily;
	availableProfiles: string[];
	deviceModel: string;
	profileLabel: string;
	revision: number;
	frameRevision: number;
	surface: LiveAppPluginSurfaceDescriptor;
	viewport: LiveAppPluginViewport;
	presentationFocus?: LiveAppPluginViewport;
	bundleKind: string;
	bundleSha256: string;
	bundleProvenance: "unchanged-appplugin-bundle";
	renderProvenance: "host-svg-diagnostic";
	inputProvenance: "host-apk-contract-emulation";
	semanticActionProvenance: "host-heuristic-from-appplugin-tree";
	productFallbackAllowed: false;
	colorScheme: LiveAppPluginColorScheme;
	colorModel: "dark" | "default" | "light";
	systemColorScheme: LiveAppPluginColorScheme;
	cardStyle: number;
	themeSwitching: boolean;
	view: LiveAppPluginSurfaceView;
	availableViews: LiveAppPluginSurfaceView[];
	publishedDpsCount: number;
	pageCloseRequestCount: number;
	semanticActions: LiveAppPluginSemanticAction[];
}

export interface LiveAppPluginMapSurfaceOptions {
	viewport: HTMLElement;
	frame: HTMLImageElement;
	onEvent: (label: string, data: unknown) => void;
	onChange: (snapshot: LiveAppPluginMapSnapshot) => void;
	apiBaseUrl?: string;
	initialView?: LiveAppPluginSurfaceView;
}

export function readAppPluginSessionToken(documentRoot: Document = document): string {
	const token = documentRoot.querySelector<HTMLMetaElement>(
		'meta[name="appplugin-session-token"]',
	)?.content;
	if (!token || !/^[A-Za-z0-9_-]{43,128}$/u.test(token)) {
		throw new Error("Das AppPlugin-Runtime-Sitzungstoken fehlt oder ist ungültig");
	}
	return token;
}

class AppPluginHttpError extends Error {
	public constructor(
		message: string,
		public readonly status: number,
	) {
		super(message);
		this.name = "AppPluginHttpError";
	}
}

async function responseError(response: Response, fallback: string): Promise<AppPluginHttpError> {
	try {
		const payload = await response.json() as { error?: unknown };
		if (typeof payload.error === "string" && payload.error.length > 0) {
			return new AppPluginHttpError(payload.error, response.status);
		}
	} catch {
		// Nicht-JSON-Antworten behalten die statusbasierte Fehlermeldung.
	}
	return new AppPluginHttpError(fallback, response.status);
}

function shouldRecoverRuntime(error: unknown): boolean {
	if (error instanceof AppPluginHttpError) return [408, 425, 429, 502, 503, 504].includes(error.status);
	return error instanceof TypeError
		|| error instanceof DOMException && ["AbortError", "TimeoutError", "NetworkError"].includes(error.name);
}

function finite(value: number, name: string): number {
	if (!Number.isFinite(value)) throw new Error(`${name} muss endlich sein`);
	return value;
}

export interface LiveAppPluginPinchPointer {
	kind: "down" | "move" | "up";
	pointerId: number;
	x: number;
	y: number;
}

interface LocalMapDrag {
	pointerId: number;
	startX: number;
	startY: number;
	x: number;
	y: number;
}

const LOCAL_MAP_DRAG_SLOP_DIP = 2;

/**
 * Fits the AppPlugin's initially visible map content into a desktop canvas
 * without turning those pixels into a clipping boundary. The complete native
 * View remains rendered, so panning is clipped only by the AppPlugin display
 * and the real desktop canvas edge.
 */
export function calculateAppPluginFramePresentation(
	containerWidth: number,
	containerHeight: number,
	viewport: Readonly<LiveAppPluginViewport>,
	focus: Readonly<LiveAppPluginViewport> = viewport,
): Readonly<LiveAppPluginFramePresentation> {
	finite(containerWidth, "Container-Breite");
	finite(containerHeight, "Container-Höhe");
	for (const [name, value] of Object.entries(viewport)) finite(value, `Viewport ${name}`);
	for (const [name, value] of Object.entries(focus)) finite(value, `Darstellungsfokus ${name}`);
	if (containerWidth <= 0 || containerHeight <= 0 || viewport.width <= 0 || viewport.height <= 0) {
		throw new Error("Container und Viewport müssen positiv sein");
	}
	if (
		focus.width <= 0
		|| focus.height <= 0
		|| focus.x < viewport.x
		|| focus.y < viewport.y
		|| focus.x + focus.width > viewport.x + viewport.width
		|| focus.y + focus.height > viewport.y + viewport.height
	) {
		throw new Error("Darstellungsfokus muss vollständig im nativen Viewport liegen");
	}
	const scale = Math.min(containerWidth / focus.width, containerHeight / focus.height);
	return {
		left: (containerWidth - focus.width * scale) / 2 - (focus.x - viewport.x) * scale,
		top: (containerHeight - focus.height * scale) / 2 - (focus.y - viewport.y) * scale,
		width: viewport.width * scale,
		height: viewport.height * scale,
		scale,
	};
}

/**
 * Desktop-only optimistic presentation. The browser moves the diagnostic frame
 * immediately and commits a bounded, distance-dependent MOVE sequence through
 * the host's APK touch emulation before UP.
 */
export function createAppPluginDragCommitPointers(
	pointerId: number,
	startX: number,
	startY: number,
	endX: number,
	endY: number,
): readonly Readonly<LiveAppPluginPinchPointer>[] {
	if (!Number.isSafeInteger(pointerId) || pointerId < 0) {
		throw new Error("Zeigerkennung muss eine nichtnegative ganze Zahl sein");
	}
	finite(startX, "Drag-Start-x");
	finite(startY, "Drag-Start-y");
	finite(endX, "Drag-Ende-x");
	finite(endY, "Drag-Ende-y");
	const deltaX = endX - startX;
	const deltaY = endY - startY;
	const distance = Math.hypot(deltaX, deltaY);
	if (distance <= LOCAL_MAP_DRAG_SLOP_DIP) return [];
	const movementSteps = Math.max(2, Math.min(8, Math.ceil(distance / 24)));
	return Array.from({ length: movementSteps }, (_unused, index) => {
		const progress = (index + 1) / movementSteps;
		return {
			kind: "move",
			pointerId,
			x: startX + deltaX * progress,
			y: startY + deltaY * progress,
		};
	});
}

/**
 * Desktop zoom-button adapter. It creates an ordinary two-pointer gesture for
 * the host's APK touch emulation; geometry and MOVE interpolation are host-owned
 * and are deliberately not labelled as original APK behavior.
 */
export function createAppPluginPinchZoomPointers(
	width: number,
	height: number,
	delta: number,
): readonly Readonly<LiveAppPluginPinchPointer>[] {
	finite(width, "Pinch-Breite");
	finite(height, "Pinch-Höhe");
	finite(delta, "Pinch-Richtung");
	if (width <= 0 || height <= 0) throw new Error("Pinch-Fläche muss positiv sein");
	if (delta === 0) return [];
	const centerX = width / 2;
	const centerY = height / 2;
	const contractedDistance = Math.min(width * 0.28, 100);
	const expandedDistance = Math.min(width * 0.72, contractedDistance * 1.8);
	const startDistance = delta > 0 ? contractedDistance : expandedDistance;
	const endDistance = delta > 0 ? expandedDistance : contractedDistance;
	const leftX = centerX - contractedDistance / 2;
	const startRightX = leftX + startDistance;
	const endRightX = leftX + endDistance;
	const rightId = 1;
	const leftId = 2;
	// Die unveränderte Q7-Karte beansprucht beim ersten MOVE ihren
	// PanResponder; das zweite MOVE erreicht den bereits aktiven Responder.
	// Ein Finger bleibt dabei wie bei einer normalen Android-Pinch-Geste
	// stationär. Diese Folge ist durch die Q7-L5/M5-Live-Goldens belegt.
	const movementSteps = 2;
	const moves = Array.from({ length: movementSteps }, (_, index) => {
		const progress = (index + 1) / movementSteps;
		return {
			kind: "move" as const,
			pointerId: rightId,
			x: startRightX + (endRightX - startRightX) * progress,
			y: centerY,
		};
	});
	return [
		{ kind: "down", pointerId: rightId, x: startRightX, y: centerY },
		{ kind: "down", pointerId: leftId, x: leftX, y: centerY },
		...moves,
		{ kind: "up", pointerId: leftId, x: leftX, y: centerY },
		{ kind: "up", pointerId: rightId, x: endRightX, y: centerY },
	];
}

export class LiveAppPluginMapSurface {
	readonly #apiBaseUrl: string;
	readonly #sessionToken: string;
	readonly #activePointers = new Set<number>();
	readonly #pendingPointerMoves = new Map<number, { x: number; y: number }>();
	#pendingWheel?: { x: number; y: number; deltaX: number; deltaY: number };
	#requestQueue: Promise<unknown> = Promise.resolve();
	#pointerMoveFrame?: number;
	#pointerMoveRequestActive = false;
	#localMapDrag?: LocalMapDrag;
	#localMapDragFrame?: number;
	#localMapCommitPending = false;
	#localMapCommitFrameRevision?: number;
	#wheelFrame?: number;
	#wheelRequestActive = false;
	#health!: LiveAppPluginHealth;
	#mapHealth?: LiveAppPluginHealth;
	#publishedDpsCount = 0;
	#interactionReconciliationGeneration = 0;

	public constructor(private readonly options: LiveAppPluginMapSurfaceOptions) {
		this.#apiBaseUrl = (options.apiBaseUrl ?? "").replace(/\/$/u, "");
		this.#sessionToken = readAppPluginSessionToken();
	}

	#fetch(resource: string, init: RequestInit = {}, timeoutMs = 10_000): Promise<Response> {
		const headers = new Headers(init.headers);
		headers.set("X-AppPlugin-Session", this.#sessionToken);
		return fetch(resource, {
			...init,
			headers,
			signal: init.signal ?? AbortSignal.timeout(timeoutMs),
		});
	}

	public async init(): Promise<void> {
		this.#health = await this.#fetchHealth(this.options.initialView);
		await this.#resolveMapHealth();
		this.#publishedDpsCount = this.#health.publishedDpsCount;
		this.options.viewport.dataset.renderMode = this.#health.renderProvenance;
		this.options.viewport.dataset.bundleKind = this.#health.bundleKind;
		this.options.viewport.dataset.productFallbackAllowed = String(this.#health.productFallbackAllowed);
		this.options.frame.addEventListener("load", () => {
			this.#syncFramePresentation();
			this.#settleLocalMapPresentation(this.options.frame);
		});
		this.options.frame.addEventListener("error", () => {
			if (this.#localMapCommitFrameRevision === undefined) return;
			this.#resetLocalMapPresentation();
			this.options.onEvent("Autoritativer AppPlugin-Frame konnte nach Map-Drag nicht geladen werden", {
				frameRevision: this.#health.frameRevision,
			});
		});
		window.addEventListener("resize", () => {
			this.#syncFramePresentation();
		});
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
			await this.#resolveMapHealth();
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
			sessionId: this.#health.sessionId,
			profileId: this.#health.profileId,
			mapFamily: this.#health.mapFamily,
			availableProfiles: [...this.#health.availableProfiles],
			deviceModel: this.#health.deviceModel,
			profileLabel: this.#health.profileLabel,
			revision: this.#health.revision,
			frameRevision: this.#health.frameRevision,
			surface: { ...this.#health.surface },
			viewport: { ...this.#health.viewport },
			presentationFocus: this.#health.presentationFocus
				? { ...this.#health.presentationFocus }
				: undefined,
			bundleKind: this.#health.bundleKind,
			bundleSha256: this.#health.bundleSha256,
			bundleProvenance: this.#health.bundleProvenance,
			renderProvenance: this.#health.renderProvenance,
			inputProvenance: this.#health.inputProvenance,
			semanticActionProvenance: this.#health.semanticActionProvenance,
			productFallbackAllowed: false,
			colorScheme: this.#health.colorScheme,
			colorModel: this.#health.colorModel,
			systemColorScheme: this.#health.systemColorScheme,
			cardStyle: this.#health.cardStyle,
			themeSwitching: this.#health.themeSwitching,
			view: this.#health.view,
			availableViews: [...this.#health.availableViews],
			publishedDpsCount: this.#publishedDpsCount,
			pageCloseRequestCount: this.#health.pageCloseRequestCount,
			semanticActions: this.#health.semanticActions.map(action => ({ ...action })),
			language: this.#health.language,
			localeIdentifier: this.#health.localeIdentifier,
			systemLocaleIdentifier: this.#health.systemLocaleIdentifier,
			isRTL: this.#health.isRTL,
			doLeftAndRightSwapInRTL: this.#health.doLeftAndRightSwapInRTL,
			availableLanguages: [...this.#health.availableLanguages],
			languageSwitching: this.#health.languageSwitching,
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
			const previousSessionId = this.#health.sessionId;
			const response = await this.#fetch(`${this.#apiBaseUrl}/theme?view=${this.#health.view}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ mode, systemColorScheme }),
			});
			const payload = await response.json() as ThemeResponse | { error: string };
			if (!response.ok || "error" in payload) {
				throw new AppPluginHttpError(
					"error" in payload ? payload.error : `Theme-Bridge antwortet mit HTTP ${response.status}`,
					response.status,
				);
			}
			await this.#adoptAuthoritativeMutationState(payload.view, previousSessionId);
			this.options.onEvent("APK-Konfigurationswechsel an AppPlugin gesendet", {
				mode,
				sessionId: this.#health.sessionId,
				profileId: this.#health.profileId,
				colorModel: this.#health.colorModel,
				colorScheme: this.#health.colorScheme,
			});
		});
	}

	public setLanguage(language: string): Promise<void> {
		if (!this.#health.languageSwitching) {
			throw new Error("Die laufende AppPlugin-Sitzung unterstützt den APK-Sprachwechsel noch nicht");
		}
		if (!this.#health.availableLanguages.includes(language)) {
			throw new Error(`Die APK bietet den Sprachcode ${language} nicht an`);
		}
		return this.#enqueue(async () => {
			const previousSessionId = this.#health.sessionId;
			const response = await this.#fetch(`${this.#apiBaseUrl}/locale?view=${this.#health.view}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ language }),
			});
			const payload = await response.json() as LocalizationResponse | { error: string };
			if (!response.ok || "error" in payload) {
				throw new AppPluginHttpError(
					"error" in payload ? payload.error : `Sprach-Bridge antwortet mit HTTP ${response.status}`,
					response.status,
				);
			}
			if (payload.sessionRestarting) {
				this.options.onEvent("APK-Sprachwechsel startet AppPlugin-Sitzung neu", payload);
				this.#health = await this.#waitForRestart(payload.sessionId, language, payload.view);
				await this.#resolveMapHealth();
				this.#publishedDpsCount = this.#health.publishedDpsCount;
				this.#refreshFrame();
				this.#emitChange();
			} else {
				await this.#adoptAuthoritativeMutationState(payload.view, previousSessionId);
			}
			this.options.onEvent("APK-Sprachzustand und AppPlugin synchron", {
				language: this.#health.language,
				localeIdentifier: this.#health.localeIdentifier,
				sessionId: this.#health.sessionId,
			});
		});
	}

	/**
	 * Mutation responses intentionally stay small, but they must never be merged
	 * into a snapshot from an older AppPlugin process. The APK host session is the
	 * authoritative owner of profile, bundle, locale, theme, and native surfaces.
	 */
	async #adoptAuthoritativeMutationState(
		view: LiveAppPluginSurfaceView,
		previousSessionId: string,
	): Promise<void> {
		const health = await this.#fetchHealth(view);
		if (health.sessionId !== previousSessionId) {
			await this.#adoptRestartedRuntime(health, previousSessionId);
			return;
		}
		this.#health = health;
		this.#synchronizeMapHealth();
		this.#refreshFrame();
		this.#emitChange();
	}

	public async zoomBy(delta: number): Promise<void> {
		if (!hasInteractiveAppPluginMap(this.#health)) {
			throw new Error("Die laufende AppPlugin-Sitzung bietet keine belegte interaktive Kartenfläche an");
		}
		const { width, height } = this.#health.surface;
		const pointers = createAppPluginPinchZoomPointers(width, height, delta);
		if (pointers.length === 0) return;
		await this.#sendPointerSequence(pointers);
		this.options.onEvent("Desktop-Pinch über emulierten APK-Touchvertrag gesendet", {
			delta,
			revision: this.#health.revision,
		});
	}

	public semanticAction(id: LiveAppPluginSemanticActionId): Readonly<LiveAppPluginSemanticAction> | undefined {
		const action = this.#health.semanticActions.find(candidate => candidate.id === id);
		return action ? { ...action } : undefined;
	}

	public invokeSemanticAction(id: LiveAppPluginSemanticActionId): Promise<void> {
		const current = this.semanticAction(id);
		if (!current) {
			return Promise.reject(new Error(`Die laufende AppPlugin-Sitzung bietet ${id} nicht semantisch an`));
		}
		if (!current.enabled) {
			return Promise.reject(new Error(`Die laufende AppPlugin-Sitzung hat ${id} deaktiviert`));
		}
		return this.#enqueue(async () => {
			const response = await this.#fetch(`${this.#apiBaseUrl}/semantic-action?view=${this.#health.view}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ id }),
			});
			const payload = await response.json() as SemanticActionResponse | { error: string };
			if (!response.ok || "error" in payload) {
				throw new AppPluginHttpError(
					"error" in payload ? payload.error : `Semantische AppPlugin-Aktion antwortet mit HTTP ${response.status}`,
					response.status,
				);
			}
			await this.#applyPointerResponse(payload);
			this.options.onEvent("Host-abgeleitete PC-Aktion am AppPlugin-Baum ausgeführt", {
				action: payload.action,
				revision: payload.revision,
				frameChanged: payload.frameChanged,
			});
		});
	}

	#bindPointers(): void {
		this.options.viewport.addEventListener("pointerdown", event => {
			const point = this.#toSurfacePoint(event.clientX, event.clientY);
			if (!point) return;
			event.preventDefault();
			this.options.viewport.setPointerCapture(event.pointerId);
			const previousLocalDrag = this.#localMapDrag;
			this.#activePointers.add(event.pointerId);
			if (previousLocalDrag) {
				const commitMoves = createAppPluginDragCommitPointers(
					previousLocalDrag.pointerId,
					previousLocalDrag.startX,
					previousLocalDrag.startY,
					previousLocalDrag.x,
					previousLocalDrag.y,
				);
				this.#localMapDrag = undefined;
				this.#resetLocalMapPresentation();
				void this.#sendPointerSequence([
					...commitMoves,
					{ kind: "down", pointerId: event.pointerId, x: point.x, y: point.y },
				]);
				return;
			}
			if (this.#canPresentLocalMapDrag(point)) {
				this.#localMapDrag = {
					pointerId: event.pointerId,
					startX: point.x,
					startY: point.y,
					x: point.x,
					y: point.y,
				};
			}
			void this.#sendPointer("down", event.pointerId, point.x, point.y);
		});
		this.options.viewport.addEventListener("pointermove", event => {
			if (!this.#activePointers.has(event.pointerId)) return;
			const point = this.#toSurfacePoint(event.clientX, event.clientY);
			if (!point) return;
			event.preventDefault();
			if (
				this.#localMapDrag?.pointerId === event.pointerId
				&& this.#activePointers.size === 1
			) {
				this.#localMapDrag.x = point.x;
				this.#localMapDrag.y = point.y;
				this.#scheduleLocalMapPresentation();
				return;
			}
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
			const localDrag = this.#localMapDrag?.pointerId === event.pointerId
				? this.#localMapDrag
				: undefined;
			if (localDrag) {
				localDrag.x = point.x;
				localDrag.y = point.y;
				this.#flushLocalMapPresentation();
				this.#localMapDrag = undefined;
				const commitMoves = createAppPluginDragCommitPointers(
					event.pointerId,
					localDrag.startX,
					localDrag.startY,
					localDrag.x,
					localDrag.y,
				);
				this.#localMapCommitPending = commitMoves.length > 0;
				if (!this.#localMapCommitPending) this.#resetLocalMapPresentation();
				void this.#sendPointerSequence([
					...commitMoves,
					{ kind: "up" as const, pointerId: event.pointerId, x: point.x, y: point.y },
				]).catch(() => this.#resetLocalMapPresentation());
				return;
			}
			const pendingMoves = this.#takePendingPointerMoves();
			void this.#sendPointerSequence([
				...pendingMoves,
				{ kind: "up" as const, pointerId: event.pointerId, x: point.x, y: point.y },
			]);
		};
		this.options.viewport.addEventListener("pointerup", event => release("up", event));
		this.options.viewport.addEventListener("pointercancel", event => release("cancel", event));
		this.options.viewport.addEventListener("wheel", event => {
			if (this.#health.view !== "full" || this.#activePointers.size > 0) return;
			const point = this.#toSurfacePoint(event.clientX, event.clientY);
			if (!point) return;
			event.preventDefault();
			const scale = this.#surfaceScale();
			const deltaScale = event.deltaMode === WheelEvent.DOM_DELTA_LINE
				? 16
				: event.deltaMode === WheelEvent.DOM_DELTA_PAGE
					? this.#health.viewport.height
					: 1 / scale;
			this.#queueWheel(
				point.x,
				point.y,
				event.deltaX * deltaScale,
				event.deltaY * deltaScale,
			);
		}, { passive: false });
	}

	#canPresentLocalMapDrag(point: Readonly<{ x: number; y: number }>): boolean {
		if (
			this.#localMapCommitPending
			|| !this.#mapHealth
			|| !this.#health.semanticActions.some(action => action.id === "map.mode.full" && action.selected)
		) {
			return false;
		}
		return this.#health.view === "map"
			&& point.x >= this.#health.viewport.x
			&& point.y >= this.#health.viewport.y
			&& point.x <= this.#health.viewport.x + this.#health.viewport.width
			&& point.y <= this.#health.viewport.y + this.#health.viewport.height;
	}

	#scheduleLocalMapPresentation(): void {
		if (this.#localMapDragFrame !== undefined) return;
		this.#localMapDragFrame = requestAnimationFrame(() => {
			this.#localMapDragFrame = undefined;
			this.#applyLocalMapPresentation();
		});
	}

	#flushLocalMapPresentation(): void {
		if (this.#localMapDragFrame !== undefined) cancelAnimationFrame(this.#localMapDragFrame);
		this.#localMapDragFrame = undefined;
		this.#applyLocalMapPresentation();
	}

	#applyLocalMapPresentation(): void {
		const drag = this.#localMapDrag;
		if (!drag) return;
		const scale = this.#surfaceScale();
		const deltaX = (drag.x - drag.startX) * scale;
		const deltaY = (drag.y - drag.startY) * scale;
		this.#localPresentationFrame().style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
		this.options.viewport.dataset.inputPresentation = "desktop-optimistic-map-pan";
	}

	#localPresentationFrame(): HTMLImageElement {
		return this.options.frame;
	}

	#settleLocalMapPresentation(frame: HTMLImageElement): void {
		const expectedRevision = this.#localMapCommitFrameRevision;
		if (expectedRevision === undefined) return;
		const source = new URL(frame.currentSrc || frame.src, window.location.href);
		if (
			source.searchParams.get("view") !== "map"
			|| Number(source.searchParams.get("revision")) !== expectedRevision
		) {
			return;
		}
		this.#resetLocalMapPresentation();
	}

	#resetLocalMapPresentation(): void {
		if (this.#localMapDragFrame !== undefined) cancelAnimationFrame(this.#localMapDragFrame);
		this.#localMapDragFrame = undefined;
		this.#localMapCommitPending = false;
		this.#localMapCommitFrameRevision = undefined;
		this.options.frame.style.transform = "";
		delete this.options.viewport.dataset.inputPresentation;
	}

	#queuePointerMove(pointerId: number, x: number, y: number): void {
		this.#pendingPointerMoves.set(pointerId, { x, y });
		if (this.#pointerMoveFrame !== undefined) return;
		this.#pointerMoveFrame = requestAnimationFrame(() => {
			this.#pointerMoveFrame = undefined;
			this.#scheduleLatestPointerMoves();
		});
	}

	/**
	 * Mirrors Android's frame-bound input delivery: while Hermes processes one
	 * MOVE, browser frames only replace the pending coordinates. They must never
	 * append an unbounded list of stale MOVE requests behind the current frame.
	 */
	#scheduleLatestPointerMoves(): void {
		if (this.#pointerMoveRequestActive || this.#pendingPointerMoves.size === 0) return;
		this.#pointerMoveRequestActive = true;
		void this.#enqueue(async () => {
			const moves = [...this.#pendingPointerMoves].map(([pointerId, point]) => ({
				kind: "move" as const,
				pointerId,
				...point,
			}));
			this.#pendingPointerMoves.clear();
			if (moves.length > 0) await this.#requestPointerSequence(moves, false);
		}).finally(() => {
			this.#pointerMoveRequestActive = false;
			this.#scheduleLatestPointerMoves();
		});
	}

	#takePendingPointerMoves(): readonly Readonly<{
		kind: "move";
		pointerId: number;
		x: number;
		y: number;
	}>[] {
		const moves = [...this.#pendingPointerMoves].map(([pointerId, point]) => ({
			kind: "move" as const,
			pointerId,
			...point,
		}));
		this.#pendingPointerMoves.clear();
		if (this.#pointerMoveFrame !== undefined) {
			cancelAnimationFrame(this.#pointerMoveFrame);
			this.#pointerMoveFrame = undefined;
		}
		return moves;
	}

	#queueWheel(x: number, y: number, deltaX: number, deltaY: number): void {
		const pending = this.#pendingWheel;
		this.#pendingWheel = {
			x,
			y,
			deltaX: (pending?.deltaX ?? 0) + deltaX,
			deltaY: (pending?.deltaY ?? 0) + deltaY,
		};
		if (this.#wheelFrame !== undefined) return;
		this.#wheelFrame = requestAnimationFrame(() => {
			this.#wheelFrame = undefined;
			this.#scheduleLatestWheel();
		});
	}

	#scheduleLatestWheel(): void {
		if (this.#wheelRequestActive || !this.#pendingWheel) return;
		this.#wheelRequestActive = true;
		void this.#enqueue(async () => {
			const wheel = this.#pendingWheel;
			this.#pendingWheel = undefined;
			if (!wheel) return;
			const response = await this.#fetch(`${this.#apiBaseUrl}/wheel?view=${this.#health.view}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					...wheel,
					timeMs: performance.timeOrigin + performance.now(),
				}),
			});
			const payload = await response.json() as PointerResponse | { error: string };
			if (!response.ok || "error" in payload) {
				throw new AppPluginHttpError(
					"error" in payload ? payload.error : `Scrollrad-Bridge antwortet mit HTTP ${response.status}`,
					response.status,
				);
			}
			await this.#applyPointerResponse(payload);
		}).finally(() => {
			this.#wheelRequestActive = false;
			this.#scheduleLatestWheel();
		});
	}

	#surfaceScale(): number {
		return this.#framePresentation().scale;
	}

	#toSurfacePoint(clientX: number, clientY: number): { x: number; y: number } | undefined {
		const rect = this.options.viewport.getBoundingClientRect();
		const viewport = this.#health.viewport;
		const presentation = this.#framePresentation();
		const x = viewport.x + (clientX - rect.left - presentation.left) / presentation.scale;
		const y = viewport.y + (clientY - rect.top - presentation.top) / presentation.scale;
		if (
			x < viewport.x
			|| y < viewport.y
			|| x > viewport.x + viewport.width
			|| y > viewport.y + viewport.height
		) {
			return undefined;
		}
		return { x: finite(x, "Pointer-x"), y: finite(y, "Pointer-y") };
	}

	#sendPointer(kind: "down" | "move" | "up", pointerId: number, x: number, y: number): Promise<void> {
		return this.#sendPointerSequence([{ kind, pointerId, x, y }]);
	}

	#sendPointerSequence(
		pointers: readonly Readonly<{ kind: "down" | "move" | "up"; pointerId: number; x: number; y: number }>[],
	): Promise<void> {
		return this.#enqueue(() => this.#requestPointerSequence(pointers, true));
	}

	async #requestPointerSequence(
		pointers: readonly Readonly<{ kind: "down" | "move" | "up"; pointerId: number; x: number; y: number }>[],
		report: boolean,
	): Promise<void> {
		if (pointers.length === 1) {
			await this.#requestPointer(pointers[0], report);
			return;
		}
		const startedAt = performance.timeOrigin + performance.now();
		const response = await this.#fetch(`${this.#apiBaseUrl}/pointer-sequence?view=${this.#health.view}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				pointers: pointers.map((pointer, index) => ({ ...pointer, timeMs: startedAt + index })),
			}),
		});
		const payload = await response.json() as PointerResponse | { error: string };
		if (!response.ok || "error" in payload) {
			throw new AppPluginHttpError(
				"error" in payload ? payload.error : `Pointer-Sequenz antwortet mit HTTP ${response.status}`,
				response.status,
			);
		}
		await this.#applyPointerResponse(payload);
		if (report) {
			this.options.onEvent("AppPlugin-Pointersequenz", this.#pointerEventSummary(
				pointers.map(pointer => pointer.kind),
				payload,
			));
		}
	}

	async #requestPointer(
		pointer: Readonly<{ kind: "down" | "move" | "up"; pointerId: number; x: number; y: number }>,
		report: boolean,
	): Promise<void> {
		const response = await this.#fetch(`${this.#apiBaseUrl}/pointer?view=${this.#health.view}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ ...pointer, timeMs: performance.timeOrigin + performance.now() }),
		});
		const payload = await response.json() as PointerResponse | { error: string };
		if (!response.ok || "error" in payload) {
			throw new AppPluginHttpError(
				"error" in payload ? payload.error : `Pointer-Bridge antwortet mit HTTP ${response.status}`,
				response.status,
			);
		}
		await this.#applyPointerResponse(payload);
		if (report) {
			this.options.onEvent(
				`AppPlugin-Pointer ${pointer.kind}`,
				this.#pointerEventSummary([pointer.kind], payload),
			);
		}
	}

	#sendCancel(): Promise<void> {
		this.#activePointers.clear();
		this.#pendingPointerMoves.clear();
		this.#localMapDrag = undefined;
		this.#resetLocalMapPresentation();
		if (this.#pointerMoveFrame !== undefined) cancelAnimationFrame(this.#pointerMoveFrame);
		this.#pointerMoveFrame = undefined;
		return this.#enqueue(async () => {
			const response = await this.#fetch(`${this.#apiBaseUrl}/pointer?view=${this.#health.view}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ kind: "cancel", timeMs: performance.timeOrigin + performance.now() }),
			});
			const payload = await response.json() as PointerResponse | { error: string };
			if (!response.ok || "error" in payload) {
				throw new AppPluginHttpError(
					"error" in payload ? payload.error : `Pointer-Abbruch antwortet mit HTTP ${response.status}`,
					response.status,
				);
			}
			await this.#applyPointerResponse(payload);
		});
	}

	async #applyPointerResponse(response: PointerResponse): Promise<void> {
		const frameChanged = response.frameRevision !== this.#health.frameRevision;
		const publicStateBefore = this.#interactivePublicState();
		const pageCloseRequested = response.pageCloseRequestCount > this.#health.pageCloseRequestCount;
		this.#health = {
			...this.#health,
			revision: response.revision,
			frameRevision: response.frameRevision,
			surface: response.surface,
			viewport: response.viewport,
			view: response.view,
			publishedDpsCount: response.publishedDpsCount,
			pageCloseRequestCount: response.pageCloseRequestCount,
			language: response.language,
			localeIdentifier: response.localeIdentifier,
			systemLocaleIdentifier: response.systemLocaleIdentifier,
			isRTL: response.isRTL,
			doLeftAndRightSwapInRTL: response.doLeftAndRightSwapInRTL,
			availableLanguages: response.availableLanguages,
			languageSwitching: response.languageSwitching,
			semanticActions: response.semanticActions.map(action => ({ ...action })),
		};
		this.#synchronizeMapHealth();
		if (pageCloseRequested && this.#health.view === "full" && this.#mapHealth) {
			this.#health = {
				...this.#mapHealth,
				pageCloseRequestCount: response.pageCloseRequestCount,
			};
			this.options.onEvent("APK-Seite geschlossen; Desktop kehrt zur AppPlugin-Karte zurück", {
				pageCloseRequestCount: response.pageCloseRequestCount,
			});
		}
		const completesLocalMapCommit = this.#localMapCommitPending
			&& response.activePointerIds.length === 0;
		if (frameChanged) {
			if (completesLocalMapCommit) this.#localMapCommitFrameRevision = response.frameRevision;
			this.#refreshFrame();
		} else if (completesLocalMapCommit) {
			this.#resetLocalMapPresentation();
		}
		if (publicStateBefore !== this.#interactivePublicState()) this.#emitChange();
		if (response.publishedDpsCount > this.#publishedDpsCount) await this.#syncPublishedDps(response.publishedDpsCount);
		if (response.activePointerIds.length === 0) this.#scheduleRuntimeReconciliation();
	}

	#interactivePublicState(): string {
		return JSON.stringify({
			surface: this.#health.surface,
			viewport: this.#health.viewport,
			view: this.#health.view,
			publishedDpsCount: this.#health.publishedDpsCount,
			pageCloseRequestCount: this.#health.pageCloseRequestCount,
			language: this.#health.language,
			localeIdentifier: this.#health.localeIdentifier,
			systemLocaleIdentifier: this.#health.systemLocaleIdentifier,
			isRTL: this.#health.isRTL,
			doLeftAndRightSwapInRTL: this.#health.doLeftAndRightSwapInRTL,
			availableLanguages: this.#health.availableLanguages,
			languageSwitching: this.#health.languageSwitching,
			semanticActions: this.#health.semanticActions,
		});
	}

	#pointerEventSummary(
		kinds: readonly ("down" | "move" | "up")[],
		response: Readonly<PointerResponse>,
	): Readonly<Record<string, unknown>> {
		return {
			kinds,
			revision: response.revision,
			frameRevision: response.frameRevision,
			frameChanged: response.frameChanged,
			targets: response.targets,
			changedIndices: response.changedIndices,
			activePointerIds: response.activePointerIds,
			publishedDpsCount: response.publishedDpsCount,
		};
	}

	async #fetchHealth(view?: LiveAppPluginSurfaceView): Promise<LiveAppPluginHealth> {
		const endpoint = view === undefined ? "/health" : `/health?view=${view}`;
		const response = await this.#fetch(`${this.#apiBaseUrl}${endpoint}`, { cache: "no-store" }, 3_000);
		if (!response.ok) {
			throw await responseError(response, `AppPlugin-Sitzung antwortet mit HTTP ${response.status}`);
		}
		const health = await response.json() as LiveAppPluginHealth;
		if (health.status !== "appplugin-session-ready" || health.productFallbackAllowed !== false) {
			throw new Error("Die Kartenquelle ist keine laufende AppPlugin-Host-Sitzung");
		}
		if (
			health.bundleProvenance !== "unchanged-appplugin-bundle"
			|| health.renderProvenance !== "host-svg-diagnostic"
			|| health.inputProvenance !== "host-apk-contract-emulation"
			|| health.semanticActionProvenance !== "host-heuristic-from-appplugin-tree"
		) {
			throw new Error("Die AppPlugin-Host-Sitzung meldet einen unbekannten Provenienzvertrag");
		}
		if (!["scmap", "yx", "v1", "tanos", "tanos-hybrid", "unknown"].includes(health.mapFamily)) {
			throw new Error("Die AppPlugin-Host-Sitzung meldet eine unbekannte Kartenfamilie");
		}
		const resolvedView = health.view ?? view ?? "map";
		return {
			...health,
			profileId: health.profileId ?? "unknown",
			availableProfiles: [...(health.availableProfiles ?? [])],
			systemLocaleIdentifier: health.systemLocaleIdentifier ?? health.localeIdentifier,
			colorScheme: health.colorScheme ?? "light",
			colorModel: health.colorModel ?? "default",
			systemColorScheme: health.systemColorScheme ?? health.colorScheme ?? "light",
			cardStyle: health.cardStyle ?? 0,
			themeSwitching: health.themeSwitching === true,
			view: resolvedView,
			availableViews: health.availableViews ?? [resolvedView],
			publishedDpsCount: health.publishedDpsCount ?? 0,
			pageCloseRequestCount: health.pageCloseRequestCount ?? 0,
			semanticActions: (health.semanticActions ?? []).map(action => ({ ...action })),
			availableLanguages: [...health.availableLanguages],
			isRTL: health.isRTL === true,
			doLeftAndRightSwapInRTL: health.doLeftAndRightSwapInRTL !== false,
			languageSwitching: health.languageSwitching === true,
		};
	}

	#scheduleRuntimeReconciliation(): void {
		const generation = ++this.#interactionReconciliationGeneration;
		const sessionId = this.#health.sessionId;
		const view = this.#health.view;
		void this.#runRuntimeReconciliation(generation, sessionId, view);
	}

	async #runRuntimeReconciliation(
		generation: number,
		sessionId: string,
		view: LiveAppPluginSurfaceView,
	): Promise<void> {
		let lastError: unknown;
		for (const delayMs of [50, 200, 500, 750, 1_500]) {
			await new Promise<void>(resolve => setTimeout(resolve, delayMs));
			if (
				generation !== this.#interactionReconciliationGeneration
				|| this.#health.sessionId !== sessionId
				|| this.#health.view !== view
			) {
				return;
			}
			try {
				const health = await this.#fetchHealth(view);
				const adopted = await this.#enqueue(async () => {
					if (
						generation !== this.#interactionReconciliationGeneration
						|| this.#health.sessionId !== sessionId
						|| this.#health.view !== view
					) {
						return false;
					}
					if (health.sessionId !== sessionId) {
						await this.#adoptRestartedRuntime(health, sessionId);
						return true;
					}
					const previousState = this.#interactivePublicState();
					const previousFrameRevision = this.#health.frameRevision;
					const previousPageCloseRequestCount = this.#health.pageCloseRequestCount;
					this.#health = health;
					this.#synchronizeMapHealth();
					if (
						health.pageCloseRequestCount > previousPageCloseRequestCount
						&& health.view === "full"
						&& this.#mapHealth
					) {
						this.#health = {
							...this.#mapHealth,
							pageCloseRequestCount: health.pageCloseRequestCount,
						};
					}
					if (
						previousFrameRevision !== this.#health.frameRevision
						|| previousState !== this.#interactivePublicState()
					) {
						this.#refreshFrame();
						this.#emitChange();
					}
					if (health.publishedDpsCount > this.#publishedDpsCount) {
						await this.#syncPublishedDps(health.publishedDpsCount);
					}
					return false;
				}, false);
				if (adopted) return;
				lastError = undefined;
			} catch (error) {
				lastError = error;
				if (error instanceof AppPluginHttpError && error.status === 401) {
					location.reload();
					return;
				}
			}
		}
		if (lastError !== undefined && generation === this.#interactionReconciliationGeneration) {
			this.options.onEvent("AppPlugin-Sitzung konnte nicht automatisch wieder verbunden werden", {
				message: lastError instanceof Error ? lastError.message : String(lastError),
			});
		}
	}

	async #adoptRestartedRuntime(health: LiveAppPluginHealth, previousSessionId: string): Promise<void> {
		const previousHealth = this.#health;
		const previousMapHealth = this.#mapHealth;
		this.#health = health;
		try {
			await this.#resolveMapHealth();
		} catch (error) {
			this.#health = previousHealth;
			this.#mapHealth = previousMapHealth;
			throw error;
		}
		this.#activePointers.clear();
		this.#pendingPointerMoves.clear();
		this.#pendingWheel = undefined;
		if (this.#pointerMoveFrame !== undefined) cancelAnimationFrame(this.#pointerMoveFrame);
		if (this.#wheelFrame !== undefined) cancelAnimationFrame(this.#wheelFrame);
		this.#pointerMoveFrame = undefined;
		this.#wheelFrame = undefined;
		this.#pointerMoveRequestActive = false;
		this.#wheelRequestActive = false;
		this.#localMapDrag = undefined;
		this.#resetLocalMapPresentation();
		this.#publishedDpsCount = health.publishedDpsCount;
		this.#refreshFrame();
		this.#emitChange();
		this.options.onEvent("AppPlugin-Sitzung automatisch wieder verbunden", {
			previousSessionId,
			sessionId: health.sessionId,
			profileId: health.profileId,
			view: health.view,
		});
	}

	async #resolveMapHealth(): Promise<void> {
		if (!this.#health.availableViews.includes("map")) {
			this.#mapHealth = undefined;
			return;
		}
		this.#mapHealth = this.#health.view === "map"
			? { ...this.#health }
			: await this.#fetchHealth("map");
		if (this.#mapHealth.sessionId !== this.#health.sessionId) {
			throw new Error("Vollansicht und Karten-Teilfläche stammen nicht aus derselben AppPlugin-Sitzung");
		}
	}

	#synchronizeMapHealth(): void {
		const mapHealth = this.#mapHealth;
		if (!mapHealth) return;
		this.#mapHealth = {
			...this.#health,
			view: "map",
			surface: mapHealth.surface,
			viewport: mapHealth.viewport,
		};
	}

	async #waitForRestart(
		previousSessionId: string,
		language: string,
		view: LiveAppPluginSurfaceView,
	): Promise<LiveAppPluginHealth> {
		const deadline = performance.now() + 30_000;
		let lastError: unknown;
		while (performance.now() < deadline) {
			try {
				const health = await this.#fetchHealth(view);
				if (health.sessionId !== previousSessionId && health.language === language) return health;
			} catch (error) {
				lastError = error;
			}
			await new Promise<void>(resolve => setTimeout(resolve, 75));
		}
		throw new Error(
			`AppPlugin-Sitzung wurde nach dem Sprachwechsel nicht neu bereit: ${
				lastError instanceof Error ? lastError.message : "Zeitüberschreitung"
			}`,
		);
	}

	async #syncPublishedDps(expectedCount: number): Promise<void> {
		const after = this.#publishedDpsCount;
		const response = await this.#fetch(
			`${this.#apiBaseUrl}/published-dps?after=${after}`,
			{ cache: "no-store" },
			5_000,
		);
		if (!response.ok) {
			throw await responseError(response, `AppPlugin-DPS-Protokoll antwortet mit HTTP ${response.status}`);
		}
		const payload = await response.json() as PublishedDpsResponse;
		if (payload.after !== after || payload.publishedDpsCount < expectedCount) {
			throw new Error("AppPlugin-DPS-Protokoll ist nicht konsistent mit der Pointer-Antwort");
		}
		const firstSequence = payload.truncated ? (payload.retainedFrom ?? after) : after;
		if (payload.truncated) {
			this.options.onEvent("Ältere AppPlugin-Aufrufe wurden durch das Diagnose-Limit verworfen", {
				requestedAfter: after,
				retainedFrom: payload.retainedFrom,
			});
		}
		payload.publishedDps.forEach((publication, index) => {
			this.options.onEvent("Vom Bundle gebildeter AppPlugin-Aufruf – nicht an Gerät gesendet", {
				sequence: firstSequence + index + 1,
				source: "RRDevice.deviceIOT.publishDps",
				publication,
			});
		});
		this.#publishedDpsCount = payload.publishedDpsCount;
		this.#health = { ...this.#health, publishedDpsCount: payload.publishedDpsCount };
		this.#emitChange();
	}

	#refreshFrame(): void {
		const session = encodeURIComponent(this.#sessionToken);
		this.#syncFramePresentation();
		this.options.frame.src =
			`${this.#apiBaseUrl}/frame.svg?view=${this.#health.view}&revision=${this.#health.frameRevision}&session=${session}`;
	}

	#framePresentation(): Readonly<LiveAppPluginFramePresentation> {
		const rect = this.options.viewport.getBoundingClientRect();
		const focus = this.#health.view === "map"
			? this.#health.presentationFocus ?? this.#health.viewport
			: this.#health.viewport;
		return calculateAppPluginFramePresentation(
			rect.width,
			rect.height,
			this.#health.viewport,
			focus,
		);
	}

	#syncFramePresentation(): void {
		const presentation = this.#framePresentation();
		this.options.frame.style.left = `${presentation.left}px`;
		this.options.frame.style.top = `${presentation.top}px`;
		this.options.frame.style.width = `${presentation.width}px`;
		this.options.frame.style.height = `${presentation.height}px`;
	}

	#emitChange(): void {
		this.options.onChange(this.snapshot());
	}

	#enqueue<T>(operation: () => Promise<T>, recoverRuntime = true): Promise<T> {
		const pending = this.#requestQueue.then(operation, operation);
		this.#requestQueue = pending.catch(error => {
			this.options.onEvent("AppPlugin-Sitzungsfehler", {
				message: error instanceof Error ? error.message : String(error),
			});
			if (error instanceof AppPluginHttpError && error.status === 401) {
				location.reload();
			} else if (recoverRuntime && shouldRecoverRuntime(error)) {
				this.#scheduleRuntimeReconciliation();
			}
		});
		return pending;
	}
}
