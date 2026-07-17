import { createHash } from "node:crypto";
import * as fs from "node:fs";
import * as path from "node:path";
import { describe, expect, it } from "vitest";

import { createOfflineAppPluginEnvelope } from "../../src/www/apppluginLab/desktop-intents";
import { createAppPluginPinchZoomPointers } from "../../src/www/apppluginLab/live-appplugin-map-surface";
import { APPPLUGIN_LOCALIZATION_POLICY } from "../../src/www/apppluginLab/translations";

const repositoryRoot = path.resolve(__dirname, "..", "..");
const htmlPath = path.join(repositoryRoot, "www", "appplugin-desktop.html");
const sourcePath = path.join(repositoryRoot, "src", "www", "appplugin-desktop.ts");
const surfacePath = path.join(repositoryRoot, "src", "www", "apppluginLab", "live-appplugin-map-surface.ts");
const probePath = path.join(repositoryRoot, "scripts", "appplugin_hermes_runtime_probe.ts");
const buildScriptPath = path.join(repositoryRoot, "scripts", "build_appplugin_desktop.js");
const runtimeLauncherPath = path.join(repositoryRoot, "scripts", "start_appplugin_desktop_runtime.ts");

describe("AppPlugin desktop smart-home PoC", () => {
	it("renders and updates the unchanged AppPlugin session instead of rebuilding a map", () => {
		const html = fs.readFileSync(htmlPath, "utf8");
		const source = fs.readFileSync(sourcePath, "utf8");
		const surface = fs.readFileSync(surfacePath, "utf8");
		const probe = fs.readFileSync(probePath, "utf8");

		expect(source).toContain("new LiveAppPluginMapSurface");
		expect(source).toContain("function localRuntimePort(): number");
		expect(source).toContain("Isolierter Test · ${runtimePort}");
		expect(source).toContain("apiBaseUrl: `http://127.0.0.1:${runtimePort}`");
		expect(source).toContain('initialView: runtimePort === 4175 ? "full" : "map"');
		expect(surface).toContain('this.#fetchHealth(this.options.initialView ?? "map")');
		expect(source).toContain('url.searchParams.set("runtimePort", this.runtimeProfile.value)');
		expect(html).toContain('id="runtimeProfile"');
		expect(html).toContain('<option value="4174">Q7 · SC01</option>');
		expect(html).toContain('<option value="4175">Q10 · B01</option>');
		expect(source).not.toContain("OriginalMapSurface");
		expect(surface).toContain("fetch(`${this.#apiBaseUrl}/health?view=${view}`");
		expect(surface).toContain("fetch(`${this.#apiBaseUrl}/pointer?view=${this.#health.view}`");
		expect(surface).toContain("fetch(`${this.#apiBaseUrl}/pointer-sequence?view=${this.#health.view}`");
		expect(surface).toContain("/frame.svg?view=${this.#health.view}&revision=");
		expect(surface).toContain('dataset.renderMode = "unchanged-appplugin-session"');
		expect(surface).not.toMatch(/roomIds|roomDisplayColor|RNSVGPath|station.*zIndex/iu);
		expect(probe).toContain("selectApkServedSurfaceRoot");
		expect(probe).toContain("renderApkNativeUiSnapshotToSvg");
		expect(probe).toContain('status: "interactive-server-ready"');
		expect(probe).toContain("pointerInput.pointerDown");
		expect(probe).toContain("pointerInput.pointerMove");
		expect(probe).toContain("pointerInput.pointerUp");
		expect(html).toContain("Unveränderte AppPlugin-Karte");
		expect(html).toContain("Live-AppPlugin · kein Kartenfallback");
		expect(html).toContain('id="desktopMapFrame"');
		expect(html).not.toContain('viewBox="0 0 970 1025"');
		expect(html).not.toContain('id="desktopMapScene"');
	});

	it("versions the desktop bundle by its content so visible UI tests cannot load stale code", () => {
		const html = fs.readFileSync(htmlPath, "utf8");
		const bundle = fs.readFileSync(path.join(repositoryRoot, "www", "appplugin-desktop.js"));
		const expectedVersion = createHash("sha256").update(bundle).digest("hex").slice(0, 12);

		expect(html).toContain(`src="./appplugin-desktop.js?v=${expectedVersion}"`);
	});

	it("translates desktop pointers and zoom controls only into APK touch input", () => {
		const html = fs.readFileSync(htmlPath, "utf8");
		const source = fs.readFileSync(sourcePath, "utf8");
		const surface = fs.readFileSync(surfacePath, "utf8");

		for (const id of ["zoomOut", "zoomIn", "zoomValue", "desktopMap", "selectionSummary"]) {
			expect(html).toContain(`id="${id}"`);
		}
		for (const tool of ["view", "rooms", "zones", "noGo", "noMop", "virtualWall", "pin"]) {
			expect(html).toContain(`data-tool="${tool}"`);
		}
		expect(surface).toContain('addEventListener("pointerdown"');
		expect(surface).toContain('addEventListener("pointermove"');
		expect(surface).toContain('addEventListener("pointerup"');
		expect(surface).toContain("APK-Pinch an AppPlugin gesendet");
		expect(surface).toContain("const movementSteps = 2");
		expect(surface).toContain("const pointers = createAppPluginPinchZoomPointers(width, height, delta)");
		expect(surface).toContain("await this.#sendPointerSequence(pointers)");
		expect(surface).not.toContain('await this.#sendPointer("down"');
		expect(source).not.toContain("AppPlugin r${snapshot.revision}");
		expect(source).not.toContain("Revision ${snapshot.revision}");
		expect(source).not.toContain("React-Tag ${snapshot.surface.tag}");
		expect(source).not.toContain("revision: snapshot.revision");
		expect(html).toContain('aria-label="Zoom wird vom AppPlugin verwaltet">Zoom</span>');
		expect(surface).not.toContain('addEventListener("wheel"');
		expect(html).toContain('data-tool="zones" disabled');
		expect(sourcePath).toBeTruthy();
	});

	it("preserves the AppPlugin's signed touch order so plus enlarges and minus reduces", () => {
		const zoomIn = createAppPluginPinchZoomPointers(360, 800, 1);
		const zoomOut = createAppPluginPinchZoomPointers(360, 800, -1);
		const signedDistance = (
			pointers: typeof zoomIn,
			leftIndex: number,
			rightIndex: number,
		): number => pointers[leftIndex].x - pointers[rightIndex].x;

		expect(zoomIn.map(pointer => pointer.kind)).toEqual(["down", "down", "move", "move", "up", "up"]);
		expect(zoomIn[0].x).toBeGreaterThan(zoomIn[1].x);
		expect(signedDistance(zoomIn, 3, 1)).toBeGreaterThan(signedDistance(zoomIn, 0, 1));
		expect(signedDistance(zoomOut, 3, 1)).toBeLessThan(signedDistance(zoomOut, 0, 1));
		expect(signedDistance(zoomIn, 3, 1) - signedDistance(zoomIn, 0, 1)).toBe(
			-(signedDistance(zoomOut, 3, 1) - signedDistance(zoomOut, 0, 1)),
		);
		expect(zoomOut[0].x).toBe(zoomIn[3].x);
		expect(zoomOut[3].x).toBe(zoomIn[0].x);
		expect(zoomIn[2].pointerId).toBe(zoomIn[0].pointerId);
		expect(zoomIn[3].pointerId).toBe(zoomIn[0].pointerId);
	});

	it("coalesces raw mouse moves and reloads frames only for AppPlugin visual mutations", () => {
		const surface = fs.readFileSync(surfacePath, "utf8");
		const probe = fs.readFileSync(probePath, "utf8");
		const pointerEndpoint = probe.slice(probe.indexOf('url.pathname === "/pointer"'));

		expect(surface).toContain("#pendingPointerMoves");
		expect(surface).toContain("requestAnimationFrame");
		expect(surface).toContain("frameRevision");
		expect(surface).toContain("if (frameChanged) this.#refreshFrame()");
		expect(probe).toContain("const resolveCurrentSurface");
		expect(probe).toContain("const frameChanged = uiManager.visualMutationRevision()");
		expect(probe).toContain('response.setHeader("X-AppPlugin-Frame-Revision"');
		expect(pointerEndpoint).toContain("resolveCurrentSurface(view)");
		expect(pointerEndpoint).not.toContain("currentFrame(view)");
	});

	it("returns touches before future timers and finishes delayed AppPlugin UI in the background", () => {
		const surface = fs.readFileSync(surfacePath, "utf8");
		const probe = fs.readFileSync(probePath, "utf8");
		const pointerEndpoint = probe.slice(probe.indexOf('url.pathname === "/pointer"'));

		expect(probe).toContain("stabilizeInteractiveUi");
		expect(probe).toContain("onTimerJsCompleted");
		expect(probe).toContain("timerUiPump = enqueue");
		expect(probe).toContain("timerUiPumpRequested");
		expect(probe).toContain("lastStabilizedVisualRevision");
		expect(probe).toContain('url.pathname === "/pointer-sequence"');
		expect(probe).toContain("cachedCurrentFrame");
		expect(pointerEndpoint).not.toContain("settleImminentOneShotTimers()");
		expect(surface).toContain("pointers.length === 1");
		expect(surface).toContain("AppPlugin-Pointersequenz");
	});

	it("exposes the full unchanged AppPlugin root as a test view and logs its own DPS", () => {
		const html = fs.readFileSync(htmlPath, "utf8");
		const source = fs.readFileSync(sourcePath, "utf8");
		const surface = fs.readFileSync(surfacePath, "utf8");
		const probe = fs.readFileSync(probePath, "utf8");

		expect(html).toContain('data-surface-view="map"');
		expect(html).toContain('data-surface-view="full"');
		expect(html).toContain("Original testen");
		expect(source).toContain("this.mapSurface.setView");
		expect(surface).toContain("/health?view=${view}");
		expect(surface).toContain("/frame.svg?view=${this.#health.view}");
		expect(surface).toContain("/pointer?view=${this.#health.view}");
		expect(surface).toContain("/published-dps?after=${after}");
		expect(surface).toContain("Originaler AppPlugin-Aufruf – nicht an Gerät gesendet");
		expect(probe).toContain('availableViews: ["map", "full"]');
		expect(probe).toContain('publishedDps: publishedDps.slice(after)');
		expect(probe).toContain('fullRootTag: view === "full" ? rootTag : undefined');
		expect(surface).not.toMatch(/service\.arrange_room|service\.split_room|app_segment_clean/iu);
	});

	it("fits the embedded Codex browser height without forcing vertical overflow", () => {
		const html = fs.readFileSync(htmlPath, "utf8");

		expect(html).toContain("height: 100dvh");
		expect(html).toContain("grid-template-rows: minmax(0, 1fr) clamp(150px, 24vh, 220px)");
		expect(html).toContain("@media (max-height: 820px) and (min-width: 881px)");
		expect(html).toContain("#desktopMap { position: absolute");
		expect(html).toContain("#desktopMapFrame { width: 100%; height: 100%; object-fit: contain");
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
		expect(html).toContain("Lokale unveränderte AppPlugin-Sitzung");
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
		expect(launcher).toContain('"--session-state", sessionStatePath');
		expect(launcher).toContain('"--color-model", state.colorModel');
		expect(launcher).toContain('"--allow-rtl", String(state.allowRTL)');
		expect(launcher).toContain("if (exitCode === 0 && nextState.restartRequested) continue");
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
			target: "original-appplugin-action-handler",
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
		expect(surface).toContain("Semantische PC-Aktion durch originale AppPlugin-UI ausgeführt");
		expect(semanticClient).not.toMatch(/service\.|app_segment_clean|roomIds|reactTag|center/u);
		expect(probe).toContain('url.pathname === "/semantic-action"');
		expect(probe).toContain("findApkSemanticUiAction(resolvedSemanticActions(), requestedAction.id)");
		expect(probe).toContain("publicApkSemanticUiActions([action])[0]");
		expect(resolver).toContain('"scmap-bottom-control-panel-v2"');
		expect(resolver).toContain("Labels, enabled state,");
		expect(resolver).not.toMatch(/Voll|Räume|Zonen|Saugen|Dockingstation/u);
		expect(html).toContain("Direkter AppPlugin-Zustand · bundle-lokalisiert");
		expect(html).toContain('data-intent="clean.start" disabled');
		expect(html).toContain("· über AppPlugin");
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
