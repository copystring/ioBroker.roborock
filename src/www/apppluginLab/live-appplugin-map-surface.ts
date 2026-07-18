export type LiveAppPluginMapTool = "view" | "rooms" | "zones" | "noGo" | "noMop" | "virtualWall" | "pin";
export type LiveAppPluginThemeMode = "dark" | "light" | "system";
export type LiveAppPluginColorScheme = "dark" | "light";
export type LiveAppPluginSurfaceView = "map" | "full";
export type LiveAppPluginSemanticActionId =
	| "map.mode.full"
	| "map.mode.rooms"
	| "map.mode.zones"
	| "clean.panel"
	| "dock.panel"
	| "clean.start";

export interface LiveAppPluginSemanticAction {
	id: LiveAppPluginSemanticActionId;
	label: string;
	enabled: boolean;
	selected: boolean;
	owner: "unchanged-appplugin-ui";
	contract: "scmap-bottom-control-panel-v2";
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

export interface LiveAppPluginSubviewPlacement {
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
	availableProfiles: string[];
	deviceModel: string;
	profileLabel: string;
	revision: number;
	frameRevision: number;
	surface: LiveAppPluginSurfaceDescriptor;
	viewport: LiveAppPluginViewport;
	bundleKind: string;
	bundleSha256: string;
	productFallbackAllowed: false;
	colorScheme: LiveAppPluginColorScheme;
	colorModel: "dark" | "default" | "light";
	systemColorScheme: LiveAppPluginColorScheme;
	cardStyle: number;
	themeSwitching: boolean;
	view: LiveAppPluginSurfaceView;
	availableViews: LiveAppPluginSurfaceView[];
	publishedDpsCount: number;
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
}

export interface LiveAppPluginMapSnapshot extends LiveAppPluginLocalizationState {
	sessionId: string;
	profileId: string;
	availableProfiles: string[];
	deviceModel: string;
	profileLabel: string;
	revision: number;
	frameRevision: number;
	surface: LiveAppPluginSurfaceDescriptor;
	viewport: LiveAppPluginViewport;
	bundleKind: string;
	bundleSha256: string;
	productFallbackAllowed: false;
	colorScheme: LiveAppPluginColorScheme;
	colorModel: "dark" | "default" | "light";
	systemColorScheme: LiveAppPluginColorScheme;
	cardStyle: number;
	themeSwitching: boolean;
	view: LiveAppPluginSurfaceView;
	availableViews: LiveAppPluginSurfaceView[];
	publishedDpsCount: number;
	semanticActions: LiveAppPluginSemanticAction[];
}

export interface LiveAppPluginMapSurfaceOptions {
	viewport: HTMLElement;
	frame: HTMLImageElement;
	nativeMapLayer: HTMLElement;
	nativeMapFrame: HTMLImageElement;
	onEvent: (label: string, data: unknown) => void;
	onChange: (snapshot: LiveAppPluginMapSnapshot) => void;
	apiBaseUrl?: string;
	initialView?: LiveAppPluginSurfaceView;
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
 * Recreates Android's native child placement when a map subview is composed
 * inside the complete AppPlugin root. Both viewports come from the unchanged
 * AppPlugin session; the host only applies APK layout scaling.
 */
export function calculateAppPluginSubviewPlacement(
	containerWidth: number,
	containerHeight: number,
	parent: Readonly<LiveAppPluginViewport>,
	child: Readonly<LiveAppPluginViewport>,
): Readonly<LiveAppPluginSubviewPlacement> {
	finite(containerWidth, "Container-Breite");
	finite(containerHeight, "Container-Höhe");
	for (const [name, value] of Object.entries(parent)) finite(value, `Eltern-Viewport ${name}`);
	for (const [name, value] of Object.entries(child)) finite(value, `Kind-Viewport ${name}`);
	if (containerWidth <= 0 || containerHeight <= 0 || parent.width <= 0 || parent.height <= 0) {
		throw new Error("Container und Eltern-Viewport müssen positiv sein");
	}
	if (
		child.width <= 0
		|| child.height <= 0
		|| child.x < parent.x
		|| child.y < parent.y
		|| child.x + child.width > parent.x + parent.width
		|| child.y + child.height > parent.y + parent.height
	) {
		throw new Error("Kind-Viewport muss vollständig im Eltern-Viewport liegen");
	}
	const scale = Math.min(containerWidth / parent.width, containerHeight / parent.height);
	return {
		left: (containerWidth - parent.width * scale) / 2 + (child.x - parent.x) * scale,
		top: (containerHeight - parent.height * scale) / 2 + (child.y - parent.y) * scale,
		width: child.width * scale,
		height: child.height * scale,
		scale,
	};
}

/**
 * Android keeps rendering while a native map gesture is in progress and only
 * exposes the resulting state back to React Native. Our host uses the same
 * boundary: the browser presents the drag immediately, then these MOVE events
 * let the unchanged AppPlugin claim its responder and calculate the canonical
 * final map state before UP.
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
	if (Math.hypot(deltaX, deltaY) <= LOCAL_MAP_DRAG_SLOP_DIP) return [];
	return [
		{
			kind: "move",
			pointerId,
			x: startX + deltaX / 2,
			y: startY + deltaY / 2,
		},
		{ kind: "move", pointerId, x: endX, y: endY },
	];
}

/**
 * Produces the same signed two-pointer distance change that the Q7 AppPlugin
 * receives from Android. The first touch must be the right-hand pointer:
 * its original getDistance contract uses touch order, not an unsigned browser
 * wheel delta.
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
	const rightId = 10_001;
	const leftId = 10_002;
	// Das erste MOVE beansprucht den React-Native-Responder. Das zweite MOVE
	// verändert den Zoom im bereits aktiven AppPlugin-PanResponder. Ein einzelnes
	// MOVE wird beim Loslassen verworfen; weitere Zwischenstufen sind unnötig.
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

	public constructor(private readonly options: LiveAppPluginMapSurfaceOptions) {
		this.#apiBaseUrl = (options.apiBaseUrl ?? "").replace(/\/$/u, "");
	}

	public async init(): Promise<void> {
		this.#health = await this.#fetchHealth(this.options.initialView);
		await this.#resolveMapHealth();
		this.#publishedDpsCount = this.#health.publishedDpsCount;
		this.options.viewport.dataset.renderMode = "unchanged-appplugin-session";
		this.options.viewport.dataset.bundleKind = this.#health.bundleKind;
		this.options.viewport.dataset.productFallbackAllowed = String(this.#health.productFallbackAllowed);
		this.options.frame.addEventListener("load", () => {
			this.#syncNativeMapLayerLayout();
			this.#settleLocalMapPresentation(this.options.frame);
		});
		this.options.nativeMapFrame.addEventListener(
			"load",
			() => this.#settleLocalMapPresentation(this.options.nativeMapFrame),
		);
		this.options.frame.addEventListener("error", () => {
			if (this.#localMapCommitFrameRevision === undefined) return;
			this.#resetLocalMapPresentation();
			this.options.onEvent("Autoritativer AppPlugin-Frame konnte nach Map-Drag nicht geladen werden", {
				frameRevision: this.#health.frameRevision,
			});
		});
		this.options.nativeMapFrame.addEventListener("error", () => {
			if (this.#localMapCommitFrameRevision === undefined) return;
			this.#resetLocalMapPresentation();
			this.options.onEvent("Native AppPlugin-Kartenteilfläche konnte nach Drag nicht geladen werden", {
				frameRevision: this.#health.frameRevision,
			});
		});
		window.addEventListener("resize", () => this.#syncNativeMapLayerLayout());
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
			availableProfiles: [...this.#health.availableProfiles],
			deviceModel: this.#health.deviceModel,
			profileLabel: this.#health.profileLabel,
			revision: this.#health.revision,
			frameRevision: this.#health.frameRevision,
			surface: { ...this.#health.surface },
			viewport: { ...this.#health.viewport },
			bundleKind: this.#health.bundleKind,
			bundleSha256: this.#health.bundleSha256,
			productFallbackAllowed: false,
			colorScheme: this.#health.colorScheme,
			colorModel: this.#health.colorModel,
			systemColorScheme: this.#health.systemColorScheme,
			cardStyle: this.#health.cardStyle,
			themeSwitching: this.#health.themeSwitching,
			view: this.#health.view,
			availableViews: [...this.#health.availableViews],
			publishedDpsCount: this.#publishedDpsCount,
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

	public setLanguage(language: string): Promise<void> {
		if (!this.#health.languageSwitching) {
			throw new Error("Die laufende AppPlugin-Sitzung unterstützt den APK-Sprachwechsel noch nicht");
		}
		if (!this.#health.availableLanguages.includes(language)) {
			throw new Error(`Die APK bietet den Sprachcode ${language} nicht an`);
		}
		return this.#enqueue(async () => {
			const response = await fetch(`${this.#apiBaseUrl}/locale?view=${this.#health.view}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ language }),
			});
			const payload = await response.json() as LocalizationResponse | { error: string };
			if (!response.ok || "error" in payload) {
				throw new Error("error" in payload ? payload.error : `Sprach-Bridge antwortet mit HTTP ${response.status}`);
			}
			if (payload.sessionRestarting) {
				this.options.onEvent("APK-Sprachwechsel startet AppPlugin-Sitzung neu", payload);
				this.#health = await this.#waitForRestart(payload.sessionId, language, payload.view);
				await this.#resolveMapHealth();
				this.#publishedDpsCount = this.#health.publishedDpsCount;
				this.#refreshFrame();
			} else {
				this.#health = { ...this.#health, ...payload };
				this.#synchronizeMapHealth();
				if (payload.frameChanged) this.#refreshFrame();
			}
			this.#emitChange();
			this.options.onEvent("APK-Sprachzustand und AppPlugin synchron", {
				language: this.#health.language,
				localeIdentifier: this.#health.localeIdentifier,
				sessionId: this.#health.sessionId,
			});
		});
	}

	public async zoomBy(delta: number): Promise<void> {
		const { width, height } = this.#health.surface;
		const pointers = createAppPluginPinchZoomPointers(width, height, delta);
		if (pointers.length === 0) return;
		await this.#sendPointerSequence(pointers);
		this.options.onEvent("APK-Pinch an AppPlugin gesendet", { delta, revision: this.#health.revision });
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
			const response = await fetch(`${this.#apiBaseUrl}/semantic-action?view=${this.#health.view}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ id }),
			});
			const payload = await response.json() as SemanticActionResponse | { error: string };
			if (!response.ok || "error" in payload) {
				throw new Error(
					"error" in payload ? payload.error : `Semantische AppPlugin-Aktion antwortet mit HTTP ${response.status}`,
				);
			}
			await this.#applyPointerResponse(payload);
			this.options.onEvent("Semantische PC-Aktion durch originale AppPlugin-UI ausgeführt", {
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
		if (this.#health.view === "map") return true;
		if (this.#health.view !== "full" || this.options.nativeMapLayer.hidden) return false;
		const viewport = this.#mapHealth.viewport;
		return point.x >= viewport.x
			&& point.y >= viewport.y
			&& point.x <= viewport.x + viewport.width
			&& point.y <= viewport.y + viewport.height;
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
		this.options.viewport.dataset.inputPresentation = "apk-native-map-drag";
	}

	#localPresentationFrame(): HTMLImageElement {
		return this.#health.view === "full" && !this.options.nativeMapLayer.hidden
			? this.options.nativeMapFrame
			: this.options.frame;
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
		this.options.nativeMapFrame.style.transform = "";
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
			const response = await fetch(`${this.#apiBaseUrl}/wheel?view=${this.#health.view}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					...wheel,
					timeMs: performance.timeOrigin + performance.now(),
				}),
			});
			const payload = await response.json() as PointerResponse | { error: string };
			if (!response.ok || "error" in payload) {
				throw new Error("error" in payload ? payload.error : `Scrollrad-Bridge antwortet mit HTTP ${response.status}`);
			}
			await this.#applyPointerResponse(payload);
		}).finally(() => {
			this.#wheelRequestActive = false;
			this.#scheduleLatestWheel();
		});
	}

	#surfaceScale(): number {
		const rect = this.options.viewport.getBoundingClientRect();
		const { width, height } = this.#health.viewport;
		return Math.min(rect.width / width, rect.height / height);
	}

	#toSurfacePoint(clientX: number, clientY: number): { x: number; y: number } | undefined {
		const rect = this.options.viewport.getBoundingClientRect();
		const { width, height, x, y } = this.#health.viewport;
		const scale = this.#surfaceScale();
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
		const publicStateBefore = this.#interactivePublicState();
		this.#health = {
			...this.#health,
			revision: response.revision,
			frameRevision: response.frameRevision,
			surface: response.surface,
			viewport: response.viewport,
			view: response.view,
			publishedDpsCount: response.publishedDpsCount,
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
	}

	#interactivePublicState(): string {
		return JSON.stringify({
			surface: this.#health.surface,
			viewport: this.#health.viewport,
			view: this.#health.view,
			publishedDpsCount: this.#health.publishedDpsCount,
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
		const response = await fetch(`${this.#apiBaseUrl}${endpoint}`, { cache: "no-store" });
		if (!response.ok) throw new Error(`AppPlugin-Sitzung antwortet mit HTTP ${response.status}`);
		const health = await response.json() as LiveAppPluginHealth;
		if (health.status !== "appplugin-session-ready" || health.productFallbackAllowed !== false) {
			throw new Error("Die Kartenquelle ist keine unveränderte laufende AppPlugin-Sitzung");
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
			semanticActions: (health.semanticActions ?? []).map(action => ({ ...action })),
			availableLanguages: [...health.availableLanguages],
			isRTL: health.isRTL === true,
			doLeftAndRightSwapInRTL: health.doLeftAndRightSwapInRTL !== false,
			languageSwitching: health.languageSwitching === true,
		};
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
		this.#syncNativeMapLayerLayout();
		if (this.#health.view === "full" && this.#mapHealth) {
			this.options.nativeMapFrame.src =
				`${this.#apiBaseUrl}/frame.svg?view=map&revision=${this.#health.frameRevision}`;
		}
	}

	#syncNativeMapLayerLayout(): void {
		const active = this.#health.view === "full" && this.#mapHealth !== undefined;
		this.options.nativeMapLayer.hidden = !active;
		if (!active || !this.#mapHealth) return;
		const rect = this.options.viewport.getBoundingClientRect();
		const placement = calculateAppPluginSubviewPlacement(
			rect.width,
			rect.height,
			this.#health.viewport,
			this.#mapHealth.viewport,
		);
		this.options.nativeMapLayer.style.left = `${placement.left}px`;
		this.options.nativeMapLayer.style.top = `${placement.top}px`;
		this.options.nativeMapLayer.style.width = `${placement.width}px`;
		this.options.nativeMapLayer.style.height = `${placement.height}px`;
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
