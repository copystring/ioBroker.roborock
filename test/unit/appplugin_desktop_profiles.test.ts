import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";

import { afterEach, describe, expect, it, vi } from "vitest";

import {
	createAppPluginDesktopClient,
	ensureAppPluginDesktopProfile,
} from "../../scripts/lib/appPluginDesktopClient";
import {
	APPPLUGIN_DESKTOP_PROFILES,
	consumeAppPluginDesktopProfileSwitch,
	decideAppPluginDesktopSupervisorAction,
	parseAppPluginDesktopFixtureProfile,
	parseAppPluginDesktopProfile,
	writeAppPluginDesktopProfileSwitch,
} from "../../scripts/lib/appPluginDesktopProfiles";
import { resolveAppPluginDesktopStaticAsset } from "../../scripts/lib/appPluginDesktopStaticAssets";

describe("gemeinsamer AppPlugin-Desktop-Server", () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("verwendet das einmal gelesene Sitzungstoken für alle Client-Anfragen", async () => {
		const token = "B".repeat(43);
		const fetchMock = vi.spyOn(globalThis, "fetch")
			.mockResolvedValueOnce(new Response(
				`<meta name="appplugin-session-token" content="${token}">`,
				{ status: 200, headers: { "Content-Type": "text/html" } },
			))
			.mockResolvedValueOnce(new Response(
				JSON.stringify({ revision: 7 }),
				{ status: 200, headers: { "Content-Type": "application/json" } },
			));

		const client = await createAppPluginDesktopClient("http://127.0.0.1:4173/");
		await expect(client.readJson<{ revision: number }>("/state")).resolves.toEqual({ revision: 7 });

		expect(fetchMock).toHaveBeenCalledTimes(2);
		expect(String(fetchMock.mock.calls[1][0])).toBe("http://127.0.0.1:4173/state");
		expect(new Headers(fetchMock.mock.calls[1][1]?.headers).get("x-appplugin-session")).toBe(token);
	});

	it("trennt sichere Katalog-IDs von den drei lokalen Replay-Fixtures", () => {
		expect(APPPLUGIN_DESKTOP_PROFILES).toEqual(["q7", "q7-m5", "q10"]);
		expect(parseAppPluginDesktopProfile("q10")).toBe("q10");
		expect(parseAppPluginDesktopProfile("plugin-c0ffee123456")).toBe("plugin-c0ffee123456");
		expect(parseAppPluginDesktopProfile("4175")).toBeUndefined();
		expect(parseAppPluginDesktopProfile("../q10")).toBeUndefined();
		expect(parseAppPluginDesktopFixtureProfile("q10")).toBe("q10");
		expect(parseAppPluginDesktopFixtureProfile("plugin-c0ffee123456")).toBeUndefined();
	});

	it("übergibt einen Profilwechsel genau einmal an den Launcher", () => {
		const root = fs.mkdtempSync(path.join(os.tmpdir(), "appplugin-profile-switch-"));
		const requestPath = path.join(root, "switch.json");

		writeAppPluginDesktopProfileSwitch(requestPath, "q7-m5");

		expect(consumeAppPluginDesktopProfileSwitch(requestPath)).toBe("q7-m5");
		expect(consumeAppPluginDesktopProfileSwitch(requestPath)).toBeUndefined();
		expect(fs.existsSync(requestPath)).toBe(false);
	});

	it("priorisiert einen expliziten Profilwechsel auch nach einem fatalen Ende der alten Sitzung", () => {
		expect(decideAppPluginDesktopSupervisorAction({
			exitCode: 1,
			nextProfile: "q10",
			restartRequested: false,
			runDurationMs: 60_000,
			consecutiveUnexpectedFailures: 2,
		})).toEqual({ action: "switch", profile: "q10" });
	});

	it("begrenzt unerwartete Sitzungsneustarts und setzt das Budget nach stabiler Laufzeit zurück", () => {
		expect(decideAppPluginDesktopSupervisorAction({
			exitCode: 1,
			restartRequested: false,
			runDurationMs: 500,
			consecutiveUnexpectedFailures: 1,
		})).toEqual({
			action: "restart",
			consecutiveUnexpectedFailures: 2,
			delayMs: 200,
			reason: "unexpected-failure",
		});
		expect(decideAppPluginDesktopSupervisorAction({
			exitCode: 1,
			restartRequested: false,
			runDurationMs: 30_000,
			consecutiveUnexpectedFailures: 3,
		})).toEqual({
			action: "restart",
			consecutiveUnexpectedFailures: 1,
			delayMs: 100,
			reason: "unexpected-failure",
		});
		expect(decideAppPluginDesktopSupervisorAction({
			exitCode: 1,
			restartRequested: false,
			runDurationMs: 500,
			consecutiveUnexpectedFailures: 3,
		})).toEqual({ action: "exit", exitCode: 1 });
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
			`<html><head><meta name="appplugin-session-token" content="${"A".repeat(43)}"></head></html>`,
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
		const fetchMock = vi.spyOn(globalThis, "fetch").mockImplementation(async () => {
			const payload = responses.shift();
			return new Response(
				typeof payload === "string" ? payload : JSON.stringify(payload),
				{ status: 200, headers: { "Content-Type": typeof payload === "string" ? "text/html" : "application/json" } },
			);
		});

		await ensureAppPluginDesktopProfile("http://127.0.0.1:4173", "q7", 1_000);

		expect(fetchMock).toHaveBeenCalledTimes(4);
		expect(fetchMock.mock.calls.map(([url]) => String(url))).toEqual([
			"http://127.0.0.1:4173/appplugin-desktop.html",
			"http://127.0.0.1:4173/health",
			"http://127.0.0.1:4173/profile",
			"http://127.0.0.1:4173/health",
		]);
		const healthHeaders = new Headers(fetchMock.mock.calls[1][1]?.headers);
		expect(healthHeaders.get("x-appplugin-session")).toBe("A".repeat(43));
		expect(fetchMock.mock.calls[2][1]).toMatchObject({
			method: "POST",
			body: JSON.stringify({ profile: "q7" }),
		});
		const profileHeaders = new Headers(fetchMock.mock.calls[2][1]?.headers);
		expect(profileHeaders.get("Content-Type")).toBe("application/json");
		expect(profileHeaders.get("Origin")).toBe("http://127.0.0.1:4173");
		expect(profileHeaders.get("x-appplugin-session")).toBe("A".repeat(43));
	});
});
