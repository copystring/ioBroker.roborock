import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";

import { afterEach, describe, expect, it, vi } from "vitest";

import { ensureAppPluginDesktopProfile } from "../../scripts/lib/appPluginDesktopClient";
import {
	APPPLUGIN_DESKTOP_PROFILES,
	consumeAppPluginDesktopProfileSwitch,
	parseAppPluginDesktopProfile,
	writeAppPluginDesktopProfileSwitch,
} from "../../scripts/lib/appPluginDesktopProfiles";
import { resolveAppPluginDesktopStaticAsset } from "../../scripts/lib/appPluginDesktopStaticAssets";

describe("gemeinsamer AppPlugin-Desktop-Server", () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("akzeptiert ausschließlich registrierte Profile", () => {
		expect(APPPLUGIN_DESKTOP_PROFILES).toEqual(["q7", "q7-m5", "q10"]);
		expect(parseAppPluginDesktopProfile("q10")).toBe("q10");
		expect(parseAppPluginDesktopProfile("4175")).toBeUndefined();
		expect(parseAppPluginDesktopProfile("../q10")).toBeUndefined();
	});

	it("übergibt einen Profilwechsel genau einmal an den Launcher", () => {
		const root = fs.mkdtempSync(path.join(os.tmpdir(), "appplugin-profile-switch-"));
		const requestPath = path.join(root, "switch.json");

		writeAppPluginDesktopProfileSwitch(requestPath, "q7-m5");

		expect(consumeAppPluginDesktopProfileSwitch(requestPath)).toBe("q7-m5");
		expect(consumeAppPluginDesktopProfileSwitch(requestPath)).toBeUndefined();
		expect(fs.existsSync(requestPath)).toBe(false);
	});

	it("liefert nur die explizit erlaubten Desktop-Dateien aus", () => {
		const root = path.resolve("www");
		expect(resolveAppPluginDesktopStaticAsset(root, "/appplugin-desktop.html")).toEqual({
			filePath: path.join(root, "appplugin-desktop.html"),
			contentType: "text/html; charset=utf-8",
		});
		expect(resolveAppPluginDesktopStaticAsset(root, "/index.html")).toBeUndefined();
		expect(resolveAppPluginDesktopStaticAsset(root, "/../package.json")).toBeUndefined();
	});

	it("wechselt Nachweiswerkzeuge über denselben Server statt über einen Geräteport", async () => {
		const responses = [
			{
				status: "appplugin-session-ready",
				sessionId: "q10-session",
				profileId: "q10",
				availableProfiles: ["q7", "q7-m5", "q10"],
			},
			{ sessionRestarting: true },
			{
				status: "appplugin-session-ready",
				sessionId: "q7-session",
				profileId: "q7",
				availableProfiles: ["q7", "q7-m5", "q10"],
			},
		];
		const fetchMock = vi.spyOn(globalThis, "fetch").mockImplementation(async () => new Response(
			JSON.stringify(responses.shift()),
			{ status: 200, headers: { "Content-Type": "application/json" } },
		));

		await ensureAppPluginDesktopProfile("http://127.0.0.1:4173", "q7", 1_000);

		expect(fetchMock).toHaveBeenCalledTimes(3);
		expect(fetchMock.mock.calls.map(([url]) => String(url))).toEqual([
			"http://127.0.0.1:4173/health",
			"http://127.0.0.1:4173/profile",
			"http://127.0.0.1:4173/health",
		]);
		expect(fetchMock.mock.calls[1][1]).toMatchObject({
			method: "POST",
			body: JSON.stringify({ profile: "q7" }),
		});
	});
});
