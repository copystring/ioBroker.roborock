
import * as crypto from "node:crypto";
import { describe, expect, it, vi } from "vitest";
import { createHawkAuthentication, http_api, type RriotData, USER_DATA_AUTH_PROFILE_VERSION } from "../../src/lib/httpApi";

/**
 * @doc:CloudAPI.md
 * ### Cloud Login Flow
 * The Roborock Cloud API requires a multi-step login authentication to obtain RRIOT credentials.
 *
 * #### 1. Client Initialization
 * * **Headers**: `header_clientid` (MD5 of username + clientID), `header_appversion` ("4.XX.XX").
 * * **Region Discovery**: `/api/v1/getUrlByEmail` resolves the account's actual IoT base URL and country metadata before login.
 * * **Persisted UserData**: cached RRIOT credentials are reused only when their auth profile version matches the current login/signing profile.
 * * **2FA Rate Protection**: email code requests are persistently throttled so adapter restarts cannot request codes repeatedly.
 *
 * #### 2. Authentication (Hawk)
 * Once logged in, all requests must be signed using Hawk Authentication.
 * * **Authorization Header**: `Hawk id="...",s="...",ts="...",nonce="...",mac="..."`
 * * **Clock Skew Handling**: if Roborock rejects a signed Real API request with a server timestamp that differs from the local clock, the adapter retries the same request once with that timestamp offset.
 * * **HomeData Endpoints**: The adapter requests `v3/user/homes/{homeID}` first and can fall back to other `getHomeDetail` identifiers and the legacy `user/homes/{homeID}` endpoint after non-auth failures without starting another login.
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

	it("uses the adjusted Real API timestamp for Hawk authorization", () => {
		const rriot: RriotData = {
			u: "user-id",
			s: "session-salt",
			h: "hawk-secret",
			k: "mqtt-key",
			r: {
				a: "https://api-eu.roborock.com",
				m: "ssl://mqtt-eu-4.roborock.com:8883",
			},
		};
		const adapter = { rLog: vi.fn() };
		const api = new http_api(adapter as any);
		const localTimestamp = 1_700_000_000;
		const dateNow = vi.spyOn(Date, "now").mockReturnValue(localTimestamp * 1000);
		(api as any).realApiClockOffsetSeconds = 508;

		try {
			const authorization = (api as any).createRealApiAuthorization(rriot, "/v3/user/homes/123", {});

			expect(authorization).toContain(`ts="${localTimestamp + 508}"`);
		} finally {
			dateNow.mockRestore();
		}
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

	it("falls back to the legacy HomeData endpoint after a non-auth V3 failure", async () => {
		const adapter = {
			config: {},
			rLog: vi.fn(),
			errorStack: (error: unknown) => error instanceof Error ? error.stack : String(error),
			errorMessage: (error: unknown) => error instanceof Error ? error.message : String(error),
			setState: vi.fn().mockResolvedValue(undefined),
		};
		const api = new http_api(adapter as any);
		const initializeRealApi = vi.fn().mockResolvedValue(undefined);
		const realApi = {
			get: vi.fn()
				.mockResolvedValueOnce({ data: { success: false, result: null } })
				.mockResolvedValueOnce({
					data: {
						success: true,
						result: {
							id: 123,
							products: [],
							devices: [{ duid: "duid-1", online: true, deviceStatus: {} }],
							receivedDevices: [],
							rooms: [],
						},
					},
				}),
		};
		(api as any).initializeRealApi = initializeRealApi;
		(api as any).loginApi = {};
		(api as any).realApi = realApi;
		(api as any).homeID = 123;

		await expect(api.updateHomeData()).resolves.toBeUndefined();

		expect(realApi.get).toHaveBeenNthCalledWith(1, "v3/user/homes/123");
		expect(realApi.get).toHaveBeenNthCalledWith(2, "user/homes/123");
		expect(initializeRealApi).not.toHaveBeenCalled();
		expect(adapter.setState).toHaveBeenCalledWith("HomeData", {
			val: JSON.stringify({
				rrHomeId: 123,
				products: [],
				devices: [{ duid: "duid-1", online: true, deviceStatus: {} }],
				receivedDevices: [],
				rooms: [],
			}),
			ack: true,
		});
	});

	it("tries the alternate getHomeDetail id before legacy HomeData endpoints", async () => {
		const adapter = {
			config: {},
			rLog: vi.fn(),
			errorStack: (error: unknown) => error instanceof Error ? error.stack : String(error),
			errorMessage: (error: unknown) => error instanceof Error ? error.message : String(error),
			setState: vi.fn().mockResolvedValue(undefined),
		};
		const api = new http_api(adapter as any);
		const realApi = {
			get: vi.fn()
				.mockRejectedValueOnce({ response: { status: 404, data: { code: 404, msg: "not_found" } } })
				.mockResolvedValueOnce({
					data: {
						success: true,
						result: {
							id: 456,
							products: [],
							devices: [],
							receivedDevices: [],
							rooms: [],
						},
					},
				}),
		};
		(api as any).loginApi = {};
		(api as any).realApi = realApi;
		(api as any).homeID = 123;
		(api as any).homeDetailID = 456;

		await expect(api.updateHomeData()).resolves.toBeUndefined();

		expect(realApi.get).toHaveBeenNthCalledWith(1, "v3/user/homes/123");
		expect(realApi.get).toHaveBeenNthCalledWith(2, "v3/user/homes/456");
		expect(realApi.get).toHaveBeenCalledTimes(2);
	});

	it("retries HomeData once with the Roborock server timestamp offset after auth 401", async () => {
		const adapter = {
			config: {},
			rLog: vi.fn(),
			errorStack: (error: unknown) => error instanceof Error ? error.stack : String(error),
			errorMessage: (error: unknown) => error instanceof Error ? error.message : String(error),
			setState: vi.fn().mockResolvedValue(undefined),
		};
		const api = new http_api(adapter as any);
		const localTimestamp = 1_700_000_000;
		const serverOffset = 508;
		const dateNow = vi.spyOn(Date, "now").mockReturnValue(localTimestamp * 1000);
		const realApi = {
			get: vi.fn()
				.mockRejectedValueOnce({
					response: {
						status: 401,
						data: {
							code: "auth.err",
							msg: "auth.err.invalid.token",
							timestamp: new Date((localTimestamp + serverOffset) * 1000).toISOString(),
						},
					},
				})
				.mockResolvedValueOnce({
					data: {
						success: true,
						result: {
							id: 123,
							products: [],
							devices: [],
							receivedDevices: [],
							rooms: [],
						},
					},
				}),
		};
		(api as any).loginApi = {};
		(api as any).realApi = realApi;
		(api as any).homeID = 123;

		try {
			await expect(api.updateHomeData()).resolves.toBeUndefined();
		} finally {
			dateNow.mockRestore();
		}

		expect(realApi.get).toHaveBeenNthCalledWith(1, "v3/user/homes/123");
		expect(realApi.get).toHaveBeenNthCalledWith(2, "v3/user/homes/123");
		expect(realApi.get).toHaveBeenCalledTimes(2);
		expect((api as any).realApiClockOffsetSeconds).toBe(serverOffset);
	});

	it("stops HomeData fallbacks after Roborock rejects the signed auth token", async () => {
		const adapter = {
			config: {},
			rLog: vi.fn(),
			errorStack: (error: unknown) => error instanceof Error ? error.stack : String(error),
			errorMessage: (error: unknown) => error instanceof Error ? error.message : String(error),
			setState: vi.fn().mockResolvedValue(undefined),
		};
		const api = new http_api(adapter as any);
		const realApi = {
			get: vi.fn().mockRejectedValue({
				response: {
					status: 401,
					data: {
						code: "auth.err",
						msg: "auth.err.invalid.token",
					},
				},
			}),
		};
		(api as any).loginApi = {};
		(api as any).realApi = realApi;
		(api as any).homeID = 123;
		(api as any).homeDetailID = 456;

		await expect(api.updateHomeData()).rejects.toThrow("Automatic re-authentication is disabled");

		expect(realApi.get).toHaveBeenCalledTimes(1);
		expect(realApi.get).toHaveBeenNthCalledWith(1, "v3/user/homes/123");
	});

	it("clears persisted UserData from an outdated auth profile", async () => {
		const rriot: RriotData = {
			u: "user-id",
			s: "session-salt",
			h: "hawk-secret",
			k: "mqtt-key",
			r: {
				a: "https://api-eu.roborock.com",
				m: "ssl://mqtt-eu-4.roborock.com:8883",
			},
		};
		const adapter = {
			rLog: vi.fn(),
			getStateAsync: vi.fn().mockResolvedValue({
				val: JSON.stringify({ token: "old-token", rriot }),
			}),
			setState: vi.fn().mockResolvedValue(undefined),
		};
		const api = new http_api(adapter as any);

		await api.loadUserData();

		expect(api.userData).toBeNull();
		expect(adapter.setState).toHaveBeenCalledWith("UserData", { val: "", ack: true });
	});

	it("restores persisted UserData only when the auth profile matches", async () => {
		const rriot: RriotData = {
			u: "user-id",
			s: "session-salt",
			h: "hawk-secret",
			k: "mqtt-key",
			r: {
				a: "https://api-eu.roborock.com",
				m: "ssl://mqtt-eu-4.roborock.com:8883",
			},
		};
		const adapter = {
			rLog: vi.fn(),
			getStateAsync: vi.fn().mockResolvedValue({
				val: JSON.stringify({ token: "current-token", rriot, authProfileVersion: USER_DATA_AUTH_PROFILE_VERSION }),
			}),
			setState: vi.fn().mockResolvedValue(undefined),
		};
		const api = new http_api(adapter as any);

		await api.loadUserData();

		expect(api.userData?.token).toBe("current-token");
		expect(adapter.setState).not.toHaveBeenCalledWith("UserData", { val: "", ack: true });
	});

	it("suppresses repeated 2FA email code requests during the cooldown", async () => {
		const loginApi = {
			post: vi.fn().mockResolvedValue({ data: { code: 200 } }),
		};
		const adapter = {
			rLog: vi.fn(),
			ensureState: vi.fn().mockResolvedValue(undefined),
			getStateAsync: vi.fn().mockResolvedValue({
				val: JSON.stringify({ emailCodeRequestedAt: Date.now() }),
			}),
			setState: vi.fn().mockResolvedValue(undefined),
		};
		const api = new http_api(adapter as any);
		(api as any).loginApi = loginApi;

		await expect(api.requestEmailCode("user@example.com")).rejects.toThrow("2FA code request suppressed");

		expect(loginApi.post).not.toHaveBeenCalled();
	});
});
