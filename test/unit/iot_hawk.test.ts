import { describe, expect, it } from "vitest";
import axios from "axios";
import * as crypto from "node:crypto";
import { http_api } from "../../src/lib/httpApi";
import { createIotHawkAuthorization } from "../../src/lib/iotHawk";

const credentials = {
	uid: "uid",
	session: "session",
	secret: "secret",
	nonce: "nonce",
	timestamp: 1_700_000_000,
};

describe("IoT Hawk signing", () => {
	it("keeps the path-only signature used by existing HomeData requests", () => {
		const result = createIotHawkAuthorization({
			...credentials,
			url: "https://eu.example/v3/user/homes/1",
			method: "GET",
		});
		expect(result.prestring).toBe("uid:session:nonce:1700000000:24c174acc3d9f4e1b6c66edbe68b84db::");
		expect(result.authorization).toBe("Hawk id=\"uid\", s=\"session\", ts=\"1700000000\", nonce=\"nonce\", mac=\"M8i08eRM/38mJmHI+zgVf+OzGY8udi1xvDotOO8kn40=\"");
	});

	it("decodes path segments and sorts query names while joining repeated values", () => {
		const result = createIotHawkAuthorization({
			...credentials,
			url: "https://eu.example/v3/a%20b?z=9&a=1&z=2",
			method: "GET",
		});
		expect(result.prestring).toBe("uid:session:nonce:1700000000:1dfd03145a8049bd10d940fbac58f98c:612272488fc7e6bf395f8ff2712ea33b:");
		expect(result.authorization).toContain('mac="4puDJTbCM8V1pmp1TTnVHAHaTLs4jdVs4f6GwmzS3+c="');
	});

	it("decodes valid path escapes beside a malformed percent escape without treating plus as space", () => {
		const result = createIotHawkAuthorization({ ...credentials, url: "https://eu.example/a%41%+", method: "GET" });
		const pathHash = crypto.createHash("md5").update("/aA%+").digest("hex");
		expect(result.prestring).toBe(`uid:session:nonce:1700000000:${pathHash}::`);
	});

	it("signs the exact JSON body bytes separately from the query", () => {
		const result = createIotHawkAuthorization({
			...credentials,
			url: "https://eu.example/api/mow?z=9&a=1&z=2",
			method: "POST",
			contentType: "application/json; charset=utf-8",
			body: '{"mode":"auto"}',
		});
		expect(result.prestring).toBe("uid:session:nonce:1700000000:ad7c882853b22985af0ce16a31adb213:612272488fc7e6bf395f8ff2712ea33b:57ade0e79962f2dd0715c5675c6f2407");
		expect(result.authorization).toContain('mac="/HAjdBXiCjFD1x5n/UB4CqoHaDd4t37fHazMPEtcvwY="');
	});

	it("canonicalizes form body names and ignores a body on GET", () => {
		const form = "z=9&a=1&z=2";
		const result = createIotHawkAuthorization({
			...credentials,
			url: "https://eu.example/api/mow",
			method: "PUT",
			contentType: "application/x-www-form-urlencoded",
			body: form,
		});
		expect(result.prestring).toBe("uid:session:nonce:1700000000:ad7c882853b22985af0ce16a31adb213::612272488fc7e6bf395f8ff2712ea33b");
		expect(result.authorization).toContain('mac="GFhuskzP6FeSvARGn/aanNltP5/7AOTyrkc+d6576UY="');
		expect(createIotHawkAuthorization({ ...credentials, url: "https://eu.example/api/mow", method: "GET", contentType: "application/json", body: form }).prestring).toBe(
			"uid:session:nonce:1700000000:ad7c882853b22985af0ce16a31adb213::",
		);
	});

	it("sends exactly the JSON bytes used by the live Axios interceptor", async () => {
		const adapter = {
			setState: async () => undefined,
			rLog: () => undefined,
			errorStack: (error: unknown) => String(error),
		};
		const api = new http_api(adapter as any);
		api.loginApi = axios.create();
		api.userData = { token: "token", rriot: { u: "uid", s: "session", h: "secret", k: "key", r: { a: "https://eu.example", m: "" } } };
		await api.initializeRealApi();
		expect(api.realApi).not.toBeNull();

		let transmittedBody: unknown;
		let authorization = "";
		api.realApi!.defaults.adapter = async config => {
			transmittedBody = config.data;
			authorization = String(config.headers.get("Authorization"));
			return { data: {}, status: 200, statusText: "OK", headers: {}, config };
		};
		const body = '  { "mode": "auto" }  ';
		await api.realApi!.post("api/mow?z=9&a=1&z=2", body, { headers: { "Content-Type": "application/json" } });
		expect(transmittedBody).toBe(body);
		const match = authorization.match(/ts="(\d+)", nonce="([^"]+)", mac="([^"]+)"/);
		expect(match).not.toBeNull();
		const md5 = (value: string) => crypto.createHash("md5").update(value).digest("hex");
		const signed = ["uid", "session", match![2], match![1], md5("/api/mow"), md5("a=1&z=9,2"), md5(body)].join(":");
		const expectedMac = crypto.createHmac("sha256", "secret").update(signed).digest("base64");
		expect(match![3]).toBe(expectedMac);
	});
});
