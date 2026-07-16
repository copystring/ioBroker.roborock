import * as fs from "node:fs";
import * as path from "node:path";
import { describe, expect, it } from "vitest";

import { createOfflineAppPluginEnvelope } from "../../src/www/apppluginLab/desktop-intents";
import { APPPLUGIN_LOCALIZATION_POLICY } from "../../src/www/apppluginLab/translations";

const repositoryRoot = path.resolve(__dirname, "..", "..");
const htmlPath = path.join(repositoryRoot, "www", "appplugin-desktop.html");
const sourcePath = path.join(repositoryRoot, "src", "www", "appplugin-desktop.ts");
const surfacePath = path.join(repositoryRoot, "src", "www", "apppluginLab", "live-appplugin-map-surface.ts");
const probePath = path.join(repositoryRoot, "scripts", "appplugin_hermes_runtime_probe.ts");
const buildScriptPath = path.join(repositoryRoot, "scripts", "build_appplugin_desktop.js");

describe("AppPlugin desktop smart-home PoC", () => {
	it("renders and updates the unchanged AppPlugin session instead of rebuilding a map", () => {
		const html = fs.readFileSync(htmlPath, "utf8");
		const source = fs.readFileSync(sourcePath, "utf8");
		const surface = fs.readFileSync(surfacePath, "utf8");
		const probe = fs.readFileSync(probePath, "utf8");

		expect(source).toContain("new LiveAppPluginMapSurface");
		expect(source).not.toContain("OriginalMapSurface");
		expect(surface).toContain("fetch(`${this.#apiBaseUrl}/health`");
		expect(surface).toContain("fetch(`${this.#apiBaseUrl}/pointer`");
		expect(surface).toContain("/frame.svg?revision=");
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

	it("translates desktop pointers and zoom controls only into APK touch input", () => {
		const html = fs.readFileSync(htmlPath, "utf8");
		const surface = fs.readFileSync(surfacePath, "utf8");

		for (const id of ["zoomOut", "zoomReset", "zoomIn", "zoomValue", "desktopMap", "selectionSummary"]) {
			expect(html).toContain(`id="${id}"`);
		}
		for (const tool of ["view", "rooms", "zones", "noGo", "noMop", "virtualWall", "pin"]) {
			expect(html).toContain(`data-tool="${tool}"`);
		}
		expect(surface).toContain('addEventListener("pointerdown"');
		expect(surface).toContain('addEventListener("pointermove"');
		expect(surface).toContain('addEventListener("pointerup"');
		expect(surface).toContain("APK-Pinch an AppPlugin gesendet");
		expect(surface).not.toContain('addEventListener("wheel"');
		expect(html).toContain('data-tool="zones" disabled');
		expect(sourcePath).toBeTruthy();
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
		expect(surface).toContain("fetch(`${this.#apiBaseUrl}/theme`");
		expect(probe).toContain('session.emitDeviceEvent("themeDidChange"');
		expect(probe).toContain('session.emitDeviceEvent("appearanceChanged"');
		expect(probe).toContain('url.pathname === "/ui-state"');
		expect(probe).toContain('url.pathname === "/published-dps"');
		expect(html).not.toMatch(/filter\s*:/u);
	});

	it("keeps the desktop shell separate while localization stays AppPlugin-owned", () => {
		const html = fs.readFileSync(htmlPath, "utf8");
		const source = fs.readFileSync(sourcePath, "utf8");

		for (const page of ["overview", "map", "schedules", "history", "settings"]) {
			expect(html).toContain(`data-navigation="${page}"`);
		}
		expect(html).toContain("Lokale unveränderte AppPlugin-Sitzung");
		expect(html).toContain("AppPlugin-Sprache: <strong>direkt aus laufendem Bundle</strong>");
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

	it("builds the live desktop client without regenerating the quarantined snapshot contract", () => {
		const buildScript = fs.readFileSync(buildScriptPath, "utf8");
		expect(buildScript).not.toContain("writeContract");
		expect(buildScript).not.toContain("generate_appplugin_desktop_map_contract");
		expect(buildScript).toContain("appplugin-desktop.ts");
		expect(buildScript).toContain("appplugin-desktop.js");
	});
});
