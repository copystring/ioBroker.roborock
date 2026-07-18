import { createHash } from "node:crypto";
import * as fs from "node:fs";
import * as path from "node:path";
import { describe, expect, it } from "vitest";

import { createOfflineAppPluginEnvelope } from "../../src/www/apppluginLab/desktop-intents";
import {
	calculateAppPluginFramePresentation,
	calculateAppPluginSubviewPlacement,
	createAppPluginDragCommitPointers,
	createAppPluginPinchZoomPointers,
	hasInteractiveAppPluginMap,
	shouldShowAppPluginNativeMapSubview,
} from "../../src/www/apppluginLab/live-appplugin-map-surface";
import { APPPLUGIN_LOCALIZATION_POLICY } from "../../src/www/apppluginLab/translations";

const repositoryRoot = path.resolve(__dirname, "..", "..");
const htmlPath = path.join(repositoryRoot, "www", "appplugin-desktop.html");
const sourcePath = path.join(repositoryRoot, "src", "www", "appplugin-desktop.ts");
const surfacePath = path.join(repositoryRoot, "src", "www", "apppluginLab", "live-appplugin-map-surface.ts");
const probePath = path.join(repositoryRoot, "scripts", "appplugin_hermes_runtime_probe.ts");
const buildScriptPath = path.join(repositoryRoot, "scripts", "build_appplugin_desktop.js");
const runtimeLauncherPath = path.join(repositoryRoot, "scripts", "start_appplugin_desktop_runtime.ts");

describe("AppPlugin desktop smart-home PoC", () => {
	it("labels the unchanged AppPlugin session and host-rendered SVG with separate provenance", () => {
		const html = fs.readFileSync(htmlPath, "utf8");
		const source = fs.readFileSync(sourcePath, "utf8");
		const surface = fs.readFileSync(surfacePath, "utf8");
		const probe = fs.readFileSync(probePath, "utf8");
		const launcher = fs.readFileSync(runtimeLauncherPath, "utf8");

		expect(source).toContain("new LiveAppPluginMapSurface");
		expect(source).toContain("apiBaseUrl: location.origin");
		expect(source).toContain('fetch(`${location.origin}/profile`');
		expect(source).toContain("waitForRuntimeProfile(profile, previousSnapshot.sessionId)");
		expect(source).not.toContain("runtimePort");
		expect(source).not.toContain("chooseAppPluginRuntimePort");
		expect(surface).toContain("this.#fetchHealth(this.options.initialView)");
		expect(surface).toContain('const endpoint = view === undefined ? "/health" : `/health?view=${view}`');
		expect(surface).toContain("throw await responseError(response");
		expect(html).toContain('id="runtimeProfile"');
		expect(html).toContain('id="runtimeStatus"');
		expect(html).toContain('<option value="q7">Q7 L5 · SC01</option>');
		expect(html).toContain('<option value="q7-m5">Q7 M5 · SC01</option>');
		expect(html).toContain('<option value="q10">Q10 X5+ · B01</option>');
		expect(html).not.toContain("4174");
		expect(html).not.toContain("4175");
		expect(launcher).toContain("const APPPLUGIN_DESKTOP_PORT = 4_173");
		expect(launcher).toContain("width: 1_080");
		expect(launcher).toContain("height: 2_400");
		expect(launcher).toContain("scale: 3");
		expect(launcher).toContain("densityDpi: 480");
		expect(launcher).toContain('"--density-dpi", String(APPPLUGIN_DESKTOP_DISPLAY.densityDpi)');
		expect(launcher).not.toContain('"--width", "360", "--height", "800", "--scale", "1"');
		expect(launcher).not.toContain("--port");
		expect(source).not.toContain("OriginalMapSurface");
		expect(surface).toContain("fetch(`${this.#apiBaseUrl}${endpoint}`");
		expect(surface).toContain("fetch(`${this.#apiBaseUrl}/pointer?view=${this.#health.view}`");
		expect(surface).toContain("fetch(`${this.#apiBaseUrl}/pointer-sequence?view=${this.#health.view}`");
		expect(surface).toContain("/frame.svg?view=${this.#health.view}&revision=");
		expect(surface).toContain('headers.set("X-AppPlugin-Session", this.#sessionToken)');
		expect(surface).toContain("&session=${session}");
		expect(source).toContain('"X-AppPlugin-Session": this.sessionToken');
		expect(probe).toContain("requestHasAppPluginSessionToken(request, url, httpSessionToken)");
		expect(probe).toContain("setAppPluginDesktopSecurityHeaders(response)");
		expect(probe).not.toMatch(/Set-Cookie|requestHasSessionCookie|sessionCookie/u);
		expect(launcher).toContain('"--http-session-token-file", httpSessionTokenFilePath');
		expect(launcher).toContain("randomBytes(32).toString(\"base64url\")");
		expect(surface).toContain("dataset.renderMode = this.#health.renderProvenance");
		expect(surface).toContain('renderProvenance: "host-svg-diagnostic"');
		expect(surface).not.toMatch(/roomIds|roomDisplayColor|RNSVGPath|station.*zIndex/iu);
		expect(probe).toContain("selectApkServedSurfaceRoot");
		expect(probe).toContain("renderApkNativeUiSnapshotToSvg");
		expect(probe).toContain('status: "interactive-server-ready"');
		expect(probe).toContain("session.waitForExit().then(() => undefined)");
		expect(probe).toContain('url.pathname === "/profile"');
		expect(probe).toContain("serveAppPluginDesktopStaticRequest");
		expect(probe).toContain('const availableServedViews = (["map", "full"]');
		expect(probe).toContain("resolveCurrentSurface(view)");
		expect(probe).toContain("availableViews: availableServedViews");
		expect(probe).toContain("assertInteractiveRuntimeHealthy()");
		expect(probe).toContain("AppPluginRuntimeUnavailableError");
		expect(probe).toContain("pageCloseRequestCount");
		expect(surface).toContain("#scheduleRuntimeReconciliation()");
		expect(surface).toContain("for (const delayMs of [50, 200, 500, 750, 1_500])");
		expect(surface).toContain("await this.#adoptRestartedRuntime(health, sessionId)");
		expect(surface).toContain("AppPlugin-Sitzung automatisch wieder verbunden");
		expect(surface).toContain("recoverRuntime && shouldRecoverRuntime(error)");
		expect(surface).toContain("pageCloseRequestCount: this.#health.pageCloseRequestCount");
		expect(surface).toContain("APK-Seite geschlossen; Desktop kehrt zur AppPlugin-Karte zurück");
		expect(probe).toContain("pointerInput.pointerDown");
		expect(probe).toContain("pointerInput.pointerMove");
		expect(probe).toContain("pointerInput.pointerUp");
		const gestureDispatch = probe.slice(
			probe.indexOf("const dispatchInteractivePointers"),
			probe.indexOf("const httpSessionToken"),
		);
		expect(gestureDispatch).not.toContain("await session.waitForRuntimeBoundaryIdle()");
		expect(gestureDispatch).toContain("await stabilizeInteractiveUi()");
		const interactiveStabilization = probe.slice(
			probe.indexOf("const stabilizeInteractiveUi"),
			probe.indexOf("let imminentTimerCycles"),
		);
		expect(interactiveStabilization).toContain("await session.flushRuntimeBoundary()");
		expect(interactiveStabilization).not.toContain("await session.waitForRuntimeBoundaryIdle()");
		expect(probe).toContain("if (interactiveLayoutBoundary)");
		expect(probe).toContain("interactiveLayoutBoundary = true");
		expect(probe).toContain("interactiveLayoutBoundary = false");
		expect(html).toContain("AppPlugin-Karte als Hostdiagnose");
		expect(html).toContain("Bundle unverändert · Host-SVG · kein Kartenfallback");
		expect(html).toContain("eine Originaldarstellung oder Pixelgleichheit ist damit nicht belegt");
		expect(html).toContain('id="desktopMapFrame"');
		expect(html).not.toContain('viewBox="0 0 970 1025"');
		expect(html).not.toContain('id="desktopMapScene"');
	});

	it("snapshots the UI tree before deriving native render capabilities", () => {
		const probe = fs.readFileSync(probePath, "utf8");
		const snapshotDeclaration = probe.indexOf("const shadowRoot = uiManager.snapshot()");
		const svgCapabilityRead = probe.indexOf("const hasNativeSvgView = containsViewName(shadowRoot");

		expect(snapshotDeclaration).toBeGreaterThan(0);
		expect(svgCapabilityRead).toBeGreaterThan(snapshotDeclaration);
	});

	it("keeps the desktop shell usable and disables session actions when a runtime is unavailable", () => {
		const html = fs.readFileSync(htmlPath, "utf8");
		const source = fs.readFileSync(sourcePath, "utf8");
		const navigationBinding = source.indexOf("this.bindNavigation()");
		const sessionInitialization = source.indexOf("await this.mapSurface.init()");

		expect(navigationBinding).toBeGreaterThanOrEqual(0);
		expect(navigationBinding).toBeLessThan(sessionInitialization);
		expect(source).toContain("this.setSessionControlsConnected(false)");
		expect(source).toContain("this.showRuntimeConnectionError(error)");
		expect(source).toContain("Es gibt keinen zweiten Runtime-Port als Ausweichweg");
		expect(source).toContain('this.runtimeStatus.dataset.state = "error"');
		expect(html).toContain('.status-pill[data-state="error"]');
	});

	it("versions the desktop bundle by its content so visible UI tests cannot load stale code", () => {
		const html = fs.readFileSync(htmlPath, "utf8");
		const bundle = fs.readFileSync(path.join(repositoryRoot, "www", "appplugin-desktop.js"));
		const expectedVersion = createHash("sha256").update(bundle).digest("hex").slice(0, 12);

		expect(html).toContain(`src="./appplugin-desktop.js?v=${expectedVersion}"`);
	});

	it("translates desktop pointers and zoom controls through the host's APK touch emulation", () => {
		const html = fs.readFileSync(htmlPath, "utf8");
		const source = fs.readFileSync(sourcePath, "utf8");
		const surface = fs.readFileSync(surfacePath, "utf8");
		const probe = fs.readFileSync(probePath, "utf8");

		for (const id of ["zoomOut", "zoomIn", "zoomValue", "desktopMap", "selectionSummary"]) {
			expect(html).toContain(`id="${id}"`);
		}
		for (const tool of ["view", "rooms", "zones", "noGo", "noMop", "virtualWall", "pin"]) {
			expect(html).toContain(`data-tool="${tool}"`);
		}
		expect(surface).toContain('addEventListener("pointerdown"');
		expect(surface).toContain('addEventListener("pointermove"');
		expect(surface).toContain('addEventListener("pointerup"');
		expect(surface).toContain("Desktop-Pinch über emulierten APK-Touchvertrag gesendet");
		expect(surface).toContain("const movementSteps = Math.max(2");
		expect(surface).toContain("const pointers = createAppPluginPinchZoomPointers(width, height, delta)");
		expect(surface).toContain("await this.#sendPointerSequence(pointers)");
		expect(surface).not.toContain('await this.#sendPointer("down"');
		expect(source).not.toContain("AppPlugin r${snapshot.revision}");
		expect(source).not.toContain("Revision ${snapshot.revision}");
		expect(source).not.toContain("React-Tag ${snapshot.surface.tag}");
		expect(source).not.toContain("revision: snapshot.revision");
		expect(html).toContain('aria-label="Zoom wird vom AppPlugin verwaltet">Zoom</span>');
		expect(surface).toContain('addEventListener("wheel"');
		expect(surface).toContain('this.#health.view !== "full"');
		expect(surface).toContain("fetch(`${this.#apiBaseUrl}/wheel?view=${this.#health.view}`");
		expect(probe).toContain('url.pathname === "/wheel"');
		expect(probe).toContain("uiExecution.scrollViewRuntime().wheel");
		expect(html).toContain('data-tool="zones" disabled');
		expect(sourcePath).toBeTruthy();
	});

	it("builds internally consistent host pinch gestures for zoom controls", () => {
		const zoomIn = createAppPluginPinchZoomPointers(360, 800, 1);
		const zoomOut = createAppPluginPinchZoomPointers(360, 800, -1);
		const endpointDistance = (pointers: typeof zoomIn): Readonly<{ start: number; end: number }> => {
			const [first, second] = pointers;
			const finalPosition = (pointer: typeof first): number =>
				[...pointers].reverse().find(
					candidate => candidate.kind === "move" && candidate.pointerId === pointer.pointerId,
				)?.x ?? pointer.x;
			return {
				start: Math.abs(first.x - second.x),
				end: Math.abs(finalPosition(first) - finalPosition(second)),
			};
		};

		expect(zoomIn.slice(0, 2).map(pointer => pointer.kind)).toEqual(["down", "down"]);
		expect(zoomIn.slice(-2).map(pointer => pointer.kind)).toEqual(["up", "up"]);
		expect(zoomIn.filter(pointer => pointer.kind === "move")).toHaveLength(2);
		expect(new Set(zoomIn.filter(pointer => pointer.kind === "move").map(pointer => pointer.pointerId))).toEqual(
			new Set([zoomIn[0].pointerId]),
		);
		expect(zoomIn[0].x).toBeGreaterThan(zoomIn[1].x);
		expect(endpointDistance(zoomIn).end).toBeGreaterThan(endpointDistance(zoomIn).start);
		expect(endpointDistance(zoomOut).end).toBeLessThan(endpointDistance(zoomOut).start);
	});

	it("only exposes map interactions when the runtime has a dedicated interactive map view", () => {
		expect(hasInteractiveAppPluginMap({ availableViews: ["map", "full"] })).toBe(true);
		expect(hasInteractiveAppPluginMap({ availableViews: ["full"] })).toBe(false);

		const source = fs.readFileSync(sourcePath, "utf8");
		const surface = fs.readFileSync(surfacePath, "utf8");
		expect(source).toContain("const interactiveMapAvailable");
		expect(source).toContain("button.disabled = !interactiveMapAvailable");
		expect(surface).toContain("if (!hasInteractiveAppPluginMap(this.#health))");
	});

	it("presents ordinary map drags locally and commits a bounded host gesture to the AppPlugin", () => {
		const tap = createAppPluginDragCommitPointers(7, 100, 200, 101, 201);
		const drag = createAppPluginDragCommitPointers(7, 100, 200, 160, 230);
		const surface = fs.readFileSync(surfacePath, "utf8");
		const html = fs.readFileSync(htmlPath, "utf8");

		expect(tap).toEqual([]);
		expect(drag).toEqual([
			{ kind: "move", pointerId: 7, x: 120, y: 210 },
			{ kind: "move", pointerId: 7, x: 140, y: 220 },
			{ kind: "move", pointerId: 7, x: 160, y: 230 },
		]);
		expect(surface).toContain("#canPresentLocalMapDrag");
		expect(surface).toContain("this.#localMapCommitPending");
		expect(surface).toContain('action.id === "map.mode.full" && action.selected');
		expect(surface).toContain("#scheduleLocalMapPresentation");
		expect(surface).toContain("this.#localPresentationFrame().style.transform = `translate3d(");
		expect(surface).toContain('this.options.viewport.dataset.inputPresentation = "desktop-optimistic-map-pan"');
		expect(surface).toContain("this.#localMapCommitPending = commitMoves.length > 0");
		expect(surface).toContain("this.#localMapCommitFrameRevision = response.frameRevision");
		expect(surface).toContain('this.options.frame.addEventListener("load"');
		expect(html).toContain("will-change: transform");
		expect(html).toContain("background: var(--map-surface)");
	});

	it("composes the unchanged map subview inside the full host-rendered AppPlugin root", () => {
		const placement = calculateAppPluginSubviewPlacement(
			1_100,
			800,
			{ x: 0, y: 0, width: 360, height: 800 },
			{ x: 44, y: 221, width: 275, height: 287 },
		);
		const source = fs.readFileSync(sourcePath, "utf8");
		const surface = fs.readFileSync(surfacePath, "utf8");
		const html = fs.readFileSync(htmlPath, "utf8");

		expect(placement).toEqual({
			left: 414,
			top: 221,
			width: 275,
			height: 287,
			scale: 1,
		});
		for (const id of ["desktopMapNativeLayer", "desktopMapNativeFrame"]) {
			expect(html).toContain(`id="${id}"`);
			expect(source).toContain(`"${id}"`);
		}
		expect(surface).toContain("await this.#fetchHealth(\"map\")");
		expect(surface).toContain("Vollansicht und Karten-Teilfläche stammen nicht aus derselben AppPlugin-Sitzung");
		expect(surface).toContain('source.searchParams.get("view") !== "map"');
		expect(surface).toContain("this.options.nativeMapFrame.src =");
		expect(surface).toContain("calculateAppPluginSubviewPlacement(");
		expect(surface).toContain('this.#health.view === "full" && !this.options.nativeMapLayer.hidden');
		expect(html).toContain("#desktopMapNativeLayer[hidden]");
		const mapAction = {
			id: "map.mode.rooms" as const,
			label: "Räume",
			enabled: true,
			selected: true,
			owner: "desktop-host-adapter" as const,
			provenance: "host-heuristic-from-appplugin-tree" as const,
			contract: "host-map-bottom-control-panel-v3" as const,
		};
		expect(shouldShowAppPluginNativeMapSubview("full", true, [mapAction])).toBe(true);
		expect(shouldShowAppPluginNativeMapSubview("full", true, [])).toBe(false);
		expect(shouldShowAppPluginNativeMapSubview("map", true, [mapAction])).toBe(false);
		expect(shouldShowAppPluginNativeMapSubview("full", false, [mapAction])).toBe(false);
	});

	it("fits opaque map content for desktop presentation without using it as the native clip viewport", () => {
		const presentation = calculateAppPluginFramePresentation(
			684,
			380,
			{ x: 0, y: 0, width: 360, height: 800 },
			{ x: 44, y: 221, width: 275, height: 287 },
		);

		expect(presentation.scale).toBeCloseTo(380 / 287);
		expect(presentation.width).toBeCloseTo(360 * 380 / 287);
		expect(presentation.height).toBeCloseTo(800 * 380 / 287);
		expect(presentation.left).toBeCloseTo(101.686411);
		expect(presentation.top).toBeCloseTo(-292.61324);
	});

	it("keeps at most one non-pan AppPlugin MOVE in flight and reloads frames only for visual mutations", () => {
		const surface = fs.readFileSync(surfacePath, "utf8");
		const probe = fs.readFileSync(probePath, "utf8");
		const pointerEndpoint = probe.slice(probe.indexOf('url.pathname === "/pointer"'));

		expect(surface).toContain("#pendingPointerMoves");
		expect(surface).toContain("#pointerMoveRequestActive");
		expect(surface).toContain("#scheduleLatestPointerMoves");
		expect(surface).toContain("#takePendingPointerMoves");
		expect(surface).toContain("const pendingMoves = this.#takePendingPointerMoves()");
		expect(surface).toContain("if (this.#pointerMoveRequestActive || this.#pendingPointerMoves.size === 0) return");
		expect(surface).toContain("await this.#requestPointerSequence(moves, false)");
		expect(surface).toContain("this.#scheduleLatestPointerMoves();");
		expect(surface).not.toContain("if (moves.length > 0) void this.#sendPointerSequence(moves)");
		expect(surface).toContain("requestAnimationFrame");
		expect(surface).toContain("frameRevision");
		expect(surface).toContain("if (frameChanged) {");
		expect(surface).toContain("this.#refreshFrame();");
		expect(surface).toContain("if (publicStateBefore !== this.#interactivePublicState()) this.#emitChange()");
		expect(surface).toContain("this.#pointerEventSummary");
		expect(probe).toContain("const resolveCurrentSurface");
		expect(probe).toContain("const frameChanged = uiManager.visualMutationRevision()");
		expect(probe).toContain('response.setHeader("X-AppPlugin-Frame-Revision"');
		expect(pointerEndpoint).toContain("resolveCurrentSurface(view)");
		expect(pointerEndpoint).not.toContain("currentFrame(view)");
	});

	it("returns touches before future timers and pumps delayed AppPlugin UI and native animations", () => {
		const surface = fs.readFileSync(surfacePath, "utf8");
		const probe = fs.readFileSync(probePath, "utf8");
		const pointerEndpoint = probe.slice(probe.indexOf('url.pathname === "/pointer"'));

		expect(probe).toContain("stabilizeInteractiveUi");
		expect(probe).toContain("onTimerJsCompleted");
		expect(probe).toContain("timerUiPump = enqueue");
		expect(probe).toContain("timerUiPumpRequested");
		expect(probe).toContain("nativeAnimatedUiPump = enqueue");
		expect(probe).toContain("nativeAnimatedUiPumpRequested");
		expect(probe).toContain("applyCompletedNativeUiTurn");
		expect(probe).toContain("const nativeWorkPending");
		expect(probe).not.toContain(
			"timerUiPumpRequested = false;\n\t\t\t\tawait session.waitForRuntimeBoundaryIdle()",
		);
		expect(probe).toContain("settleActiveNativeAnimations");
		expect(probe).toContain("lastStabilizedVisualRevision");
		expect(probe).toContain('url.pathname === "/pointer-sequence"');
		expect(probe).toContain("cachedCurrentFrame");
		expect(pointerEndpoint).not.toContain("settleImminentOneShotTimers()");
		expect(surface).toContain("pointers.length === 1");
		expect(surface).toContain("AppPlugin-Pointersequenz");
	});

	it("exposes the AppPlugin root through the host diagnostic renderer and logs bundle-built DPS", () => {
		const html = fs.readFileSync(htmlPath, "utf8");
		const source = fs.readFileSync(sourcePath, "utf8");
		const surface = fs.readFileSync(surfacePath, "utf8");
		const probe = fs.readFileSync(probePath, "utf8");

		expect(html).toContain('data-surface-view="map"');
		expect(html).toContain('data-surface-view="full"');
		expect(html).toContain("Hostdiagnose");
		expect(source).toContain("this.mapSurface.setView");
		expect(surface).toContain("/health?view=${view}");
		expect(surface).toContain("/frame.svg?view=${this.#health.view}");
		expect(surface).toContain("/pointer?view=${this.#health.view}");
		expect(surface).toContain("/published-dps?after=${after}");
		expect(surface).toContain("Vom Bundle gebildeter AppPlugin-Aufruf – nicht an Gerät gesendet");
		expect(probe).toContain("availableViews: availableServedViews");
		expect(probe).toContain("publishedDps.slice(retainedStart - publishedDpsRetainedFrom)");
		expect(probe).toContain("truncated: after < publishedDpsRetainedFrom");
		expect(probe).toContain('fullRootTag: view === "full" ? rootTag : undefined');
		expect(surface).not.toMatch(/service\.arrange_room|service\.split_room|app_segment_clean/iu);
	});

	it("fits the embedded Codex browser height without forcing vertical overflow", () => {
		const html = fs.readFileSync(htmlPath, "utf8");

		expect(html).toContain("height: 100dvh");
		expect(html).toContain("grid-template-rows: minmax(0, 1fr) clamp(150px, 24vh, 220px)");
		expect(html).toContain("@media (max-height: 820px) and (min-width: 881px)");
		expect(html).toContain("#desktopMap { position: absolute");
		expect(html).toContain("#desktopMapFrame { position: absolute; max-width: none; max-height: none; object-fit: fill");
		expect(html).not.toContain(".map-card { min-height: 500px");
	});

	it("keeps log entries readable and contained inside the console pane", () => {
		const html = fs.readFileSync(htmlPath, "utf8");

		expect(html).toContain("grid-template-columns: 72px minmax(0, 1fr)");
		expect(html).toContain("font: 11px/1.4");
		expect(html).toContain("overflow-x: hidden");
		expect(html).toContain("overflow-wrap: anywhere");
		expect(html).toContain("grid-column: 1 / -1");
		expect(html).not.toContain("grid-template-columns: 62px 160px 1fr");
	});

	it("routes light, dark, and system mode through the APK theme events", () => {
		const html = fs.readFileSync(htmlPath, "utf8");
		const source = fs.readFileSync(sourcePath, "utf8");
		const surface = fs.readFileSync(surfacePath, "utf8");
		const probe = fs.readFileSync(probePath, "utf8");

		expect(html).toContain('id="themeMode"');
		for (const mode of ["system", "light", "dark"]) expect(html).toContain(`value="${mode}"`);
		expect(html).toContain(':root[data-theme="dark"]');
		expect(source).toContain("document.documentElement.dataset.theme = snapshot.colorScheme");
		expect(source).toContain("this.mapSurface.setTheme");
		expect(surface).toContain("fetch(`${this.#apiBaseUrl}/theme?view=${this.#health.view}`");
		expect(surface).toContain("await this.#adoptAuthoritativeMutationState(payload.view, previousSessionId)");
		expect(surface).toContain("const health = await this.#fetchHealth(view)");
		expect(surface).toContain("if (health.sessionId !== previousSessionId)");
		expect(surface).not.toContain("this.#health = { ...this.#health, ...payload }");
		expect(probe).toContain('session.emitDeviceEvent("themeDidChange"');
		expect(probe).toContain('session.emitDeviceEvent("appearanceChanged"');
		expect(probe).toContain('url.pathname === "/ui-state"');
		expect(probe).toContain('url.pathname === "/published-dps"');
		expect(html).not.toMatch(/filter\s*:/u);
	});

	it("keeps the desktop shell separate while localization stays AppPlugin-owned", () => {
		const html = fs.readFileSync(htmlPath, "utf8");
		const source = fs.readFileSync(sourcePath, "utf8");
		const surface = fs.readFileSync(surfacePath, "utf8");
		const probe = fs.readFileSync(probePath, "utf8");
		const launcher = fs.readFileSync(runtimeLauncherPath, "utf8");

		for (const page of ["overview", "map", "schedules", "history", "settings"]) {
			expect(html).toContain(`data-navigation="${page}"`);
		}
		expect(source).toContain('this.runtimeStatus.textContent = "Bundle unverändert · Darstellung als Hostdiagnose"');
		expect(html).toContain('id="languageMode"');
		expect(source).toContain("this.syncLanguageControl(snapshot)");
		expect(source).toContain("this.mapSurface.setLanguage(this.languageMode.value)");
		expect(surface).toContain("fetch(`${this.#apiBaseUrl}/locale?view=${this.#health.view}`");
		expect(surface).toContain("this.#waitForRestart(payload.sessionId, language, payload.view)");
		expect(probe).toContain('url.pathname === "/locale"');
		expect(probe).toContain('sessionForLocalization.emitDeviceEvent(eventName, payload)');
		expect(probe).toContain('eventName: "langDidChange"');
		expect(probe).toContain("updateAppPluginDesktopSessionState(options.sessionStatePath!");
		expect(probe).toContain("onStateChange: state => persistSessionState");
		expect(probe).toContain("isRTL: initialIsRTL");
		expect(probe).toContain("const i18nPreferences = i18nManager.snapshot()");
		expect(probe).toContain("allowRTL: i18nPreferences.allowRTL");
		expect(probe).toContain("forceRTL: i18nPreferences.forceRTL");
		expect(probe).toContain("doLeftAndRightSwapInRTL: i18nPreferences.doLeftAndRightSwapInRTL");
		expect(launcher).toContain('"desktop-apk-session-state.json"');
		expect(launcher).toContain("readAppPluginDesktopSessionState(legacyProfileStatePath)");
		expect(launcher).toContain('"--session-state", sessionStatePath');
		expect(launcher).toContain('"--color-model", state.colorModel');
		expect(launcher).toContain('"--allow-rtl", String(state.allowRTL)');
		expect(launcher).toContain("restartRequested: nextState.restartRequested");
		expect(launcher).toContain('decision.action === "restart"');
		expect(html).not.toContain("data-appplugin-key");
		expect(source).not.toContain("translateAppPlugin");
		expect(APPPLUGIN_LOCALIZATION_POLICY).toMatchObject({
			owner: "unchanged-model-appplugin",
			manualCatalogAllowed: false,
			fallbackOwner: "ioBroker-shell-only"
		});
	});

	it("logs semantic shell intents without inventing Roborock commands", () => {
		const envelope = createOfflineAppPluginEnvelope({
			name: "clean.start",
			arguments: { scope: "rooms", selection: { owner: "unchanged-appplugin-session", revision: 2 } }
		});

		expect(envelope).toMatchObject({
			delivery: "offline-preview",
			target: "desktop-appplugin-host-adapter",
			intent: { name: "clean.start" },
			bundleBoundary: { methodAndParametersResolvedBy: "unchanged-appplugin-bundle" },
			sent: false
		});
		expect(JSON.stringify(envelope)).not.toMatch(/app_(?:start|segment|zoned)_clean/);
	});

	it("keeps PC mode and start controls synchronized through semantic AppPlugin UI actions", () => {
		const html = fs.readFileSync(htmlPath, "utf8");
		const source = fs.readFileSync(sourcePath, "utf8");
		const surface = fs.readFileSync(surfacePath, "utf8");
		const probe = fs.readFileSync(probePath, "utf8");
		const resolver = fs.readFileSync(
			path.join(repositoryRoot, "src", "apppluginHost", "apkSemanticUiActions.ts"),
			"utf8",
		);
		const semanticClient = surface.slice(
			surface.indexOf("public semanticAction("),
			surface.indexOf("#bindPointers()"),
		);

		expect(source).toContain("this.syncMapModeFromAppPlugin(snapshot)");
		expect(source).toContain("this.mapSurface.invokeSemanticAction(actionId)");
		expect(source).toContain('this.mapSurface.invokeSemanticAction("clean.start")');
		expect(source).toContain('action.id.startsWith("map.mode.") && action.selected');
		expect(source).toContain('querySelectorAll<HTMLButtonElement>("button[data-tool]")');
		expect(source).toContain('querySelector<HTMLButtonElement>(`button[data-tool="${tool}"]`)');
		expect(source).not.toContain('querySelectorAll<HTMLButtonElement>("[data-tool]")');
		expect(source).not.toContain("this.map.dataset.tool");
		expect(html).not.toMatch(/id="desktopMap"[^>]*data-tool/u);
		expect(source).not.toMatch(/map\.mode\.(?:full|rooms|zones).*(?:\bx\b|\by\b)\s*:/u);
		expect(surface).toContain("/semantic-action?view=${this.#health.view}");
		expect(surface).toContain("body: JSON.stringify({ id })");
		expect(surface).toContain("Host-abgeleitete PC-Aktion am AppPlugin-Baum ausgeführt");
		expect(semanticClient).not.toMatch(/service\.|app_segment_clean|roomIds|reactTag|center/u);
		expect(probe).toContain('url.pathname === "/semantic-action"');
		expect(probe).toContain("findApkSemanticUiAction(resolvedSemanticActions(), requestedAction.id)");
		expect(probe).toContain("publicApkSemanticUiActions([action])[0]");
		expect(resolver).toContain('"host-map-bottom-control-panel-v3"');
		expect(resolver).toContain("Labels, enabled state,");
		expect(resolver).not.toMatch(/Voll|Räume|Zonen|Saugen|Dockingstation/u);
		expect(html).toContain("Direkter AppPlugin-Zustand · bundle-lokalisiert");
		expect(html).toContain('data-intent="clean.start" disabled');
		expect(html).toContain('data-semantic-action="dock.panel" disabled');
		expect(html).toContain("· über AppPlugin");
		expect(source).toContain("button.dataset.semanticAction as LiveAppPluginSemanticActionId");
		expect(source).toContain('candidate.id === button.dataset.semanticAction');
		expect(source).toContain('action.id === "dock.panel"');
	});

	it("does not present offline previews as working PC or device actions", () => {
		const html = fs.readFileSync(htmlPath, "utf8");
		const source = fs.readFileSync(sourcePath, "utf8");

		expect(html).toContain('data-intent="clean.pause" disabled');
		expect(html).toContain('data-intent="clean.locate" disabled');
		expect(html).toContain('data-intent="dock.empty" disabled');
		expect(html).toContain('data-schedule="weekday-morning" disabled');
		expect(html).toContain('data-device-setting="map.furniture" disabled');
		expect(html).toContain('data-history-id="today-0730" disabled');
		expect(html).toContain('id="clearSelection" class="tool-button" type="button" disabled');
		expect(html).toContain("Vorschau · AppPlugin-Vertrag offen");
		expect(source).toContain('[data-intent]:not([data-intent=\\"clean.start\\"])');
		expect(source).toContain("Vorschau: semantischer AppPlugin-Vertrag noch offen");
		expect(source).toContain("Vorschau: AppPlugin-Historienvertrag noch offen");
	});

	it("starts Q7 and Q10 from the real ignored local recordings instead of the synthetic map", () => {
		const html = fs.readFileSync(htmlPath, "utf8");
		const source = fs.readFileSync(sourcePath, "utf8");
		const surface = fs.readFileSync(surfacePath, "utf8");
		const probe = fs.readFileSync(probePath, "utf8");
		const launcher = fs.readFileSync(runtimeLauncherPath, "utf8");
		const packageJson = fs.readFileSync(path.join(repositoryRoot, "package.json"), "utf8");

		expect(launcher).toContain("q7-l5-sc01-live-map.blob");
		expect(launcher).toContain("q10-history-replay.json");
		expect(launcher).toContain("Q10_FIXTURE_DEFAULTS");
		expect(launcher).not.toContain("q7-l5-full-scene-synthetic.blob");
		expect(packageJson).toContain('"poc:appplugin-desktop:runtime"');
		expect(probe).toContain("profileLabel: options.profileLabel");
		expect(probe).toContain("profileId: options.profileId");
		expect(probe).toContain("availableProfiles: options.availableProfiles");
		expect(launcher).toContain('"--static-root", staticRootPath');
		expect(launcher).toContain('"--profile-switch-file", profileSwitchPath');
		expect(launcher).toContain("consumeAppPluginDesktopProfileSwitch(profileSwitchPath)");
		expect(launcher).toContain("decideAppPluginDesktopSupervisorAction");
		expect(probe).toContain("deviceName: options.deviceName");
		expect(launcher).toContain('"--device-name", "Roborock Q7"');
		expect(surface).toContain("profileLabel: this.#health.profileLabel");
		expect(source).toContain("snapshot.profileLabel");
		expect(source).not.toContain("Q7 L5 / SC01 · AppPlugin-Kartenviewport");
		expect(html).not.toContain("Q7 Testgerät");
	});

	it("builds the live desktop client without regenerating the quarantined snapshot contract", () => {
		const buildScript = fs.readFileSync(buildScriptPath, "utf8");
		expect(buildScript).not.toContain("writeContract");
		expect(buildScript).not.toContain("generate_appplugin_desktop_map_contract");
		expect(buildScript).toContain("appplugin-desktop.ts");
		expect(buildScript).toContain("appplugin-desktop.js");
	});
});
