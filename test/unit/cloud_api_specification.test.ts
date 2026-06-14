
import * as crypto from "node:crypto";
import { describe, expect, it, vi } from "vitest";
import { createHawkAuthentication, http_api, type RriotData } from "../../src/lib/httpApi";

/**
 * @doc:CloudAPI.md
 * ### Cloud Login Flow
 * The Roborock Cloud API requires a multi-step login authentication to obtain RRIOT credentials.
 *
 * #### 1. Client Initialization
 * * **Headers**: `header_clientid` (MD5 of username + clientID), `header_appversion` ("4.XX.XX").
 * * **Region Discovery**: `/api/v1/getUrlByEmail` resolves the account's actual IoT base URL and country metadata before login.
 *
 * #### 2. Authentication (Hawk)
 * Once logged in, all requests must be signed using Hawk Authentication.
 * * **Authorization Header**: `Hawk id="...",s="...",ts="...",nonce="...",mac="..."`
 * * **MAC Calculation**:
 *   ```text
 *   PRESTR = [u, s, nonce, timestamp, md5(urlPath), md5(sortedQueryParams), md5(sortedFormData)]
 *   MAC = HMAC-SHA256(Key=h, Data=PRESTR)
 *   ```
 *   (Where `u`, `s`, `h` come from the RRIOT login response).
 * * **401 Handling**: HomeData authentication failures never start an automatic re-authentication flow because code login would trigger another 2FA attempt and can hit Roborock rate limits.
 */
describe("Roborock Cloud API Specification", () => {
    it("should document the cloud login and authentication flow", () => {
        // This is a documentation-only test block
    });

	it("builds Roborock Hawk authorization with the current cloud header format", () => {
		const rriot: RriotData = {
			u: "user-id",
			s: "session-salt",
			h: "hawk-secret",
			k: "mqtt-key",
			r: {
				a: "https://euiot.roborock.com",
				m: "ssl://mqtt-eu-4.roborock.com:8883",
			},
		};
		const timestamp = 1_700_000_000;
		const nonce = "abcdef";
		const path = "/v3/user/homes/123";
		const paramsHash = crypto.createHash("md5").update("a=1&b=2").digest("hex");
		const prestr = [
			rriot.u,
			rriot.s,
			nonce,
			String(timestamp),
			crypto.createHash("md5").update(path).digest("hex"),
			paramsHash,
			"",
		].join(":");
		const mac = crypto.createHmac("sha256", rriot.h).update(prestr).digest("base64");

		expect(createHawkAuthentication(rriot, path, { b: 2, a: 1 }, {}, timestamp, nonce)).toBe(
			`Hawk id="${rriot.u}",s="${rriot.s}",ts="${timestamp}",nonce="${nonce}",mac="${mac}"`,
		);
	});

	it("does not re-authenticate after a HomeData 401", async () => {
		const adapter = {
			config: {},
			rLog: vi.fn(),
			errorStack: (error: unknown) => error instanceof Error ? error.stack : String(error),
			errorMessage: (error: unknown) => error instanceof Error ? error.message : String(error),
			setState: vi.fn().mockResolvedValue(undefined),
		};
		const api = new http_api(adapter as any);
		const initializeRealApi = vi.fn().mockResolvedValue(undefined);
		(api as any).initializeRealApi = initializeRealApi;
		(api as any).loginApi = {};
		(api as any).realApi = {
			get: vi.fn().mockRejectedValue({ response: { status: 401 } }),
		};
		(api as any).homeID = 123;

		await expect(api.updateHomeData()).rejects.toThrow("Automatic re-authentication is disabled");

		expect(initializeRealApi).not.toHaveBeenCalled();
		expect(adapter.setState).not.toHaveBeenCalledWith("UserData", { val: "", ack: true });
	});

	it("keeps existing HomeData after a HomeData 401 without re-authentication", async () => {
		const adapter = {
			config: {},
			rLog: vi.fn(),
			errorStack: (error: unknown) => error instanceof Error ? error.stack : String(error),
			errorMessage: (error: unknown) => error instanceof Error ? error.message : String(error),
			setState: vi.fn().mockResolvedValue(undefined),
		};
		const api = new http_api(adapter as any);
		const initializeRealApi = vi.fn().mockResolvedValue(undefined);
		(api as any).initializeRealApi = initializeRealApi;
		(api as any).loginApi = {};
		(api as any).realApi = {
			get: vi.fn().mockRejectedValue({ response: { status: 401 } }),
		};
		(api as any).homeID = 123;
		(api as any).homeData = {
			rrHomeId: 123,
			products: [],
			devices: [],
			receivedDevices: [],
			rooms: [],
		};

		await expect(api.updateHomeData()).resolves.toBeUndefined();

		expect(initializeRealApi).not.toHaveBeenCalled();
		expect(adapter.setState).not.toHaveBeenCalledWith("UserData", { val: "", ack: true });
	});
});
