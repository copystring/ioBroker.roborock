
import { describe, expect, it, vi } from "vitest";
import { http_api } from "../../src/lib/httpApi";

/**
 * @doc:CloudAPI.md
 * ### Cloud Login Flow
 * The Roborock Cloud API requires a multi-step login authentication to obtain RRIOT credentials.
 *
 * #### 1. Client Initialization
 * * **Headers**: `header_clientid` (MD5 of username + clientID), `header_appversion` ("4.XX.XX").
 * * **Region**: Base URL must match the user's region (`euiot`, `usiot`, `cniot`, `api`).
 *
 * #### 2. Authentication (Hawk)
 * Once logged in, all requests must be signed using Hawk Authentication.
 * * **Authorization Header**: `Hawk id="...", s="...", ts="...", nonce="...", mac="..."`
 * * **Host Clock Check**: if Roborock rejects a signed Real API request and the response timestamp shows that the local host clock is wrong, the adapter refuses to start and asks the user to fix NTP/time synchronization.
 * * **MAC Calculation**:
 *   ```text
 *   PRESTR = [u, s, nonce, timestamp, md5(urlPath), "", ""]
 *   MAC = HMAC-SHA256(Key=h, Data=PRESTR)
 *   ```
 *   (Where `u`, `s`, `h` come from the RRIOT login response).
 */
describe("Roborock Cloud API Specification", () => {
    it("should document the cloud login and authentication flow", () => {
        // This is a documentation-only test block
    });

	it("refuses to start when HomeData 401 reveals host clock skew", async () => {
		const adapter = {
			rLog: vi.fn(),
			errorStack: (error: unknown) => error instanceof Error ? error.stack : String(error),
			setState: vi.fn().mockResolvedValue(undefined),
		};
		const api = new http_api(adapter as any);
		const localTimestamp = 1_700_000_000;
		const serverOffset = 522;
		const dateNow = vi.spyOn(Date, "now").mockReturnValue(localTimestamp * 1000);
		(api as any).loginApi = {};
		(api as any).realApi = {
			get: vi.fn().mockRejectedValue({
				response: {
					status: 401,
					data: {
						code: "auth.err",
						msg: "auth.err.invalid.token",
						timestamp: new Date((localTimestamp + serverOffset) * 1000).toISOString(),
					},
				},
			}),
		};
		(api as any).homeID = 123;

		try {
			await expect(api.updateHomeData()).rejects.toThrow("host clock appears to be wrong");
		} finally {
			dateNow.mockRestore();
		}

		expect(adapter.rLog).toHaveBeenCalledWith("HTTP", null, "Error", "Cloud", undefined, expect.stringContaining("522s ahead of the local clock"), "error");
		expect(adapter.setState).not.toHaveBeenCalledWith("HomeData", expect.anything());
	});

	it("keeps main HomeData error behavior when no clock skew timestamp is available", async () => {
		const adapter = {
			rLog: vi.fn(),
			errorStack: (error: unknown) => error instanceof Error ? error.stack : String(error),
			setState: vi.fn().mockResolvedValue(undefined),
		};
		const api = new http_api(adapter as any);
		(api as any).loginApi = {};
		(api as any).realApi = {
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
		(api as any).homeID = 123;

		await expect(api.updateHomeData()).resolves.toBeUndefined();

		expect(api.homeData).toBeNull();
		expect(adapter.rLog).toHaveBeenCalledWith("HTTP", null, "Error", "Cloud", undefined, expect.stringContaining("Error updating HomeData"), "error");
	});
});
