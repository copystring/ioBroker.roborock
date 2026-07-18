import { timingSafeEqual } from "node:crypto";
import type { IncomingMessage, ServerResponse } from "node:http";

export const APPPLUGIN_SESSION_HEADER = "x-appplugin-session";
export const APPPLUGIN_SESSION_META_NAME = "appplugin-session-token";
export const APPPLUGIN_DESKTOP_CONTENT_SECURITY_POLICY = [
	"default-src 'self'",
	"base-uri 'none'",
	"connect-src 'self'",
	"frame-ancestors 'none'",
	"img-src 'self' data:",
	"object-src 'none'",
	"script-src 'self'",
	"style-src 'self' 'unsafe-inline'",
].join("; ");

export function setAppPluginDesktopSecurityHeaders(
	response: Pick<ServerResponse, "setHeader">,
): void {
	response.setHeader("Content-Security-Policy", APPPLUGIN_DESKTOP_CONTENT_SECURITY_POLICY);
	response.setHeader("Cross-Origin-Resource-Policy", "same-origin");
	response.setHeader("Referrer-Policy", "no-referrer");
	response.setHeader("X-Content-Type-Options", "nosniff");
	response.setHeader("X-Frame-Options", "DENY");
}

export function isValidAppPluginSessionToken(value: unknown): value is string {
	return typeof value === "string" && /^[A-Za-z0-9_-]{43,128}$/u.test(value);
}

export function requestHasAppPluginSessionToken(
	request: Pick<IncomingMessage, "headers">,
	url: URL,
	expectedToken: string,
): boolean {
	if (!isValidAppPluginSessionToken(expectedToken)) {
		throw new Error("Erwartetes AppPlugin-Sitzungstoken ist ungültig");
	}
	const header = request.headers[APPPLUGIN_SESSION_HEADER];
	const candidate = typeof header === "string"
		? header
		: url.pathname === "/frame.svg"
			? url.searchParams.get("session")
			: undefined;
	if (!candidate) return false;
	const actual = Buffer.from(candidate, "utf8");
	const expected = Buffer.from(expectedToken, "utf8");
	return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export function injectAppPluginSessionToken(html: string, sessionToken: string): string {
	if (!isValidAppPluginSessionToken(sessionToken)) {
		throw new Error("AppPlugin-Sitzungstoken ist ungültig");
	}
	if (!html.includes("<head>")) {
		throw new Error("AppPlugin-Desktop-HTML besitzt kein <head>-Element");
	}
	return html.replace(
		"<head>",
		`<head><meta name="${APPPLUGIN_SESSION_META_NAME}" content="${sessionToken}">`,
	);
}
