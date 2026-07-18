import { describe, expect, it } from "vitest";

import {
	APPPLUGIN_DESKTOP_CONTENT_SECURITY_POLICY,
	APPPLUGIN_SESSION_HEADER,
	injectAppPluginSessionToken,
	requestHasAppPluginSessionToken,
	setAppPluginDesktopSecurityHeaders,
} from "../../scripts/lib/appPluginDesktopHttpSession";

const token = "A".repeat(43);

describe("AppPlugin desktop HTTP session", () => {
	it("accepts the secret header and rejects missing, wrong, cookie-only and array values", () => {
		const url = new URL("http://127.0.0.1:4173/health");
		expect(requestHasAppPluginSessionToken({ headers: { [APPPLUGIN_SESSION_HEADER]: token } }, url, token))
			.toBe(true);
		expect(requestHasAppPluginSessionToken({ headers: {} }, url, token)).toBe(false);
		expect(requestHasAppPluginSessionToken({
			headers: { [APPPLUGIN_SESSION_HEADER]: "B".repeat(43) },
		}, url, token)).toBe(false);
		expect(requestHasAppPluginSessionToken({
			headers: { cookie: `rr_appplugin_session=${token}` },
		}, url, token)).toBe(false);
		expect(requestHasAppPluginSessionToken({
			headers: { [APPPLUGIN_SESSION_HEADER]: [token] },
		}, url, token)).toBe(false);
	});

	it("allows a query token only for image loading on the frame endpoint", () => {
		expect(requestHasAppPluginSessionToken(
			{ headers: {} },
			new URL(`http://127.0.0.1:4173/frame.svg?session=${token}`),
			token,
		)).toBe(true);
		expect(requestHasAppPluginSessionToken(
			{ headers: {} },
			new URL(`http://127.0.0.1:4173/health?session=${token}`),
			token,
		)).toBe(false);
	});

	it("injects a validated token into HTML and fails closed on malformed input", () => {
		expect(injectAppPluginSessionToken("<html><head></head><body></body></html>", token)).toBe(
			`<html><head><meta name="appplugin-session-token" content="${token}"></head><body></body></html>`,
		);
		expect(() => injectAppPluginSessionToken("<html></html>", token)).toThrow(/kein <head>/u);
		expect(() => injectAppPluginSessionToken("<head></head>", "short")).toThrow(/ungültig/u);
		expect(() => requestHasAppPluginSessionToken(
			{ headers: {} },
			new URL("http://127.0.0.1:4173/health"),
			"short",
		)).toThrow(/ungültig/u);
	});

	it("sets a restrictive local-only browser security policy", () => {
		const headers = new Map<string, string | number | readonly string[]>();
		setAppPluginDesktopSecurityHeaders({
			setHeader: (name, value) => headers.set(name, value),
		});

		expect(headers.get("Content-Security-Policy")).toBe(APPPLUGIN_DESKTOP_CONTENT_SECURITY_POLICY);
		expect(APPPLUGIN_DESKTOP_CONTENT_SECURITY_POLICY).toContain("connect-src 'self'");
		expect(APPPLUGIN_DESKTOP_CONTENT_SECURITY_POLICY).toContain("frame-ancestors 'none'");
		expect(APPPLUGIN_DESKTOP_CONTENT_SECURITY_POLICY).toContain("script-src 'self'");
		expect(headers.get("Cross-Origin-Resource-Policy")).toBe("same-origin");
		expect(headers.get("Referrer-Policy")).toBe("no-referrer");
		expect(headers.get("X-Content-Type-Options")).toBe("nosniff");
		expect(headers.get("X-Frame-Options")).toBe("DENY");
	});
});
