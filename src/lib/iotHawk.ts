import * as crypto from "node:crypto";
import { unescape as unescapeQuery } from "node:querystring";

export interface IotHawkRequest {
	url: string;
	method: string;
	contentType?: string;
	body?: string | Buffer;
	uid: string;
	session: string;
	secret: string;
	nonce: string;
	timestamp: number;
}

function md5Hex(data: string | Buffer): string {
	return crypto.createHash("md5").update(data).digest("hex");
}

/** Matches the APK's decoded, sorted query/form parameter representation. */
function canonicalParameters(entries: Iterable<[string, string]>): string {
	const values = new Map<string, string[]>();
	for (const [name, value] of entries) {
		const existing = values.get(name);
		if (existing) existing.push(value);
		else values.set(name, [value]);
	}
	return [...values.keys()].sort().map(name => `${name}=${values.get(name)!.join(",")}`).join("&");
}

function decodedPath(url: URL): string {
	return `/${url.pathname.split("/").slice(1).map(unescapeQuery).join("/")}`;
}

/** Build the HTTP IoT Hawk header from the exact request URL and transmitted body. */
export function createIotHawkAuthorization(request: IotHawkRequest): { authorization: string; prestring: string } {
	const url = new URL(request.url, "https://roborock.invalid");
	const pathHash = md5Hex(decodedPath(url));
	const query = canonicalParameters(url.searchParams.entries());
	const queryHash = query ? md5Hex(query) : "";

	let bodyHash = "";
	if (request.method.toUpperCase() === "POST" || request.method.toUpperCase() === "PUT") {
		const contentType = request.contentType?.toLowerCase() ?? "";
		if (contentType.includes("application/json") && request.body !== undefined) {
			bodyHash = md5Hex(request.body);
		} else if (contentType.includes("application/x-www-form-urlencoded") && request.body !== undefined) {
			const form = new URLSearchParams(Buffer.isBuffer(request.body) ? request.body.toString("utf8") : request.body);
			const canonicalForm = canonicalParameters(form.entries());
			bodyHash = canonicalForm ? md5Hex(canonicalForm) : "";
		}
	}

	const prestring = [request.uid, request.session, request.nonce, request.timestamp, pathHash, queryHash, bodyHash].join(":");
	const mac = crypto.createHmac("sha256", request.secret).update(prestring).digest("base64");
	return {
		prestring,
		authorization: `Hawk id="${request.uid}", s="${request.session}", ts="${request.timestamp}", nonce="${request.nonce}", mac="${mac}"`,
	};
}
