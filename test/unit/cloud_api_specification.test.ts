
import * as crypto from "node:crypto";
import { describe, expect, it } from "vitest";
import { createHawkAuthentication, type RriotData } from "../../src/lib/httpApi";

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
 * * **401 Handling**: HomeData authentication failures clear persisted UserData, re-authenticate once, and retry before startup proceeds.
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
});
