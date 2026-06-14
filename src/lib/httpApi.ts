import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import axios from "axios";
import * as crypto from "node:crypto";
import type { Roborock } from "../main";
import { LoginV4Response, ProductV5Response } from "./apiTypes";
import { cryptoEngine } from "./cryptoEngine";

// Constants
const API_V1_GET_URL_BY_EMAIL = "api/v1/getUrlByEmail";
const API_V3_SIGN = "api/v3/key/sign";
const API_V4_LOGIN_CODE = "api/v4/auth/email/login/code";
const API_V4_LOGIN_PASSWORD = "api/v4/auth/email/login/pwd";
const API_V4_EMAIL_CODE = "api/v4/email/code/send";
const API_V5_PRODUCT = "api/v5/product";
export const USER_DATA_AUTH_PROFILE_VERSION = 2;
const AUTH_RATE_LIMIT_STATE = "AuthRateLimit";
const EMAIL_CODE_COOLDOWN_MS = 60 * 60 * 1000;
const EMAIL_CODE_RATE_LIMIT_COOLDOWN_MS = 6 * 60 * 60 * 1000;
const REAL_API_CLOCK_SKEW_RETRY_THRESHOLD_SECONDS = 30;
const REAL_API_CLOCK_SKEW_RETRY_TOLERANCE_SECONDS = 1;
const HOME_DATA_ENDPOINTS = [
	{ label: "V3", path: (homeID: number) => `v3/user/homes/${homeID}` },
	{ label: "Legacy", path: (homeID: number) => `user/homes/${homeID}` },
] as const;

interface RegionConfig {
	apiBaseUrl: string;
	loginCountry: string;
	loginCountryCode: string;
}

const REGION_CONFIG: Record<string, RegionConfig> = {
	eu: {
		apiBaseUrl: "https://euiot.roborock.com",
		loginCountry: "DE",
		loginCountryCode: "49",
	},
	us: {
		apiBaseUrl: "https://usiot.roborock.com",
		loginCountry: "US",
		loginCountryCode: "1",
	},
	cn: {
		apiBaseUrl: "https://cniot.roborock.com",
		loginCountry: "CN",
		loginCountryCode: "86",
	},
	asia: {
		apiBaseUrl: "https://api.roborock.com",
		loginCountry: "SG", // Default to Singapore for general Asia
		loginCountryCode: "65",
	},
};

const REGION_DISCOVERY_BASE_URLS = [
	REGION_CONFIG.eu.apiBaseUrl,
	REGION_CONFIG.us.apiBaseUrl,
	REGION_CONFIG.cn.apiBaseUrl,
	"https://ruiot.roborock.com",
	REGION_CONFIG.asia.apiBaseUrl,
];

// --------------------
// Interfaces & Types
// --------------------

export interface RriotData {
	u: string;
	s: string;
	h: string;
	k: string;
	r: { a: string; m: string };
}

interface UserData {
	token: string;
	rriot: RriotData;
	authProfileVersion?: number;
}

interface AuthRateLimitData {
	emailCodeRequestedAt?: number;
	rateLimitedUntil?: number;
}

interface HomeDetailResponse {
	code?: number;
	msg?: string;
	data?: {
		id?: number;
		rrHomeId?: number;
	};
}

interface IotLoginInfoResponse {
	code?: number;
	msg?: string;
	data?: {
		url?: string;
		country?: string;
		countrycode?: string | number;
	};
}

export interface Device {
	duid: string;
	localKey: string;
	productId: string;
	name?: string;
	featureSet?: number;
	newFeatureSet?: string;
	online: boolean;
	deviceStatus: Record<string, unknown>;
	pv: string;
	sn?: string;
}

interface Product {
	id: string;
	model: string;
	category: string;
	name?: string;
}

interface Room {
	id: number;
	name: string;
}

export interface Scene {
	id: number;
	name: string;
	enabled: boolean;
	param: string; // JSON string
}

export interface SceneResponse {
	result: Scene[];
}

interface HomeData {
	rrHomeId: number;
	products: Product[];
	devices: Device[];
	receivedDevices: Device[];
	rooms: Room[];
}

interface HomeDataResponse {
	success?: boolean;
	result?: {
		id: number;
		products?: Product[];
		devices?: Device[];
		receivedDevices?: Device[];
		rooms?: Room[];
	};
}

/**
 * Helper to calculate MD5 hex string
 */
function md5hex(str: string): string {
	return crypto.createHash("md5").update(str).digest("hex");
}

function normalizeApiPath(path: string): string {
	return path.startsWith("/") ? path : `/${path}`;
}

function sortedValueHash(values: Record<string, unknown>): string {
	const pairs = Object.keys(values)
		.filter((key) => values[key] !== undefined && values[key] !== null)
		.sort()
		.map((key) => `${key}=${values[key]}`);

	return pairs.length > 0 ? md5hex(pairs.join("&")) : "";
}

function collectSearchParams(url: URL): Record<string, string> {
	const params: Record<string, string> = {};
	url.searchParams.forEach((value, key) => {
		params[key] = value;
	});
	return params;
}

export function createHawkAuthentication(
	rriot: RriotData,
	path: string,
	params: Record<string, unknown> = {},
	formData: Record<string, unknown> = {},
	timestamp = Math.floor(Date.now() / 1000),
	nonce = crypto.randomBytes(6).toString("base64url"),
): string {
	const normalizedPath = normalizeApiPath(path);
	const prestr = [
		rriot.u,
		rriot.s,
		nonce,
		String(timestamp),
		md5hex(normalizedPath),
		sortedValueHash(params),
		sortedValueHash(formData),
	].join(":");
	const mac = crypto.createHmac("sha256", rriot.h).update(prestr).digest("base64");

	return `Hawk id="${rriot.u}",s="${rriot.s}",ts="${timestamp}",nonce="${nonce}",mac="${mac}"`;
}

function getRealApiSignatureInput(config: InternalAxiosRequestConfig): { path: string; params: Record<string, string> } {
	const fullUrl = axios.getUri(config);
	const url = new URL(fullUrl, config.baseURL || "http://dummy");
	return {
		path: url.pathname,
		params: collectSearchParams(url),
	};
}

function getHttpErrorResponse(error: unknown): { status?: number; data?: unknown; headers?: unknown } | undefined {
	return (error as { response?: { status?: number; data?: unknown; headers?: unknown } })?.response;
}

function getResponseField(data: unknown, field: string): unknown {
	if (!data || typeof data !== "object") return undefined;
	return (data as Record<string, unknown>)[field];
}

function getResponseStringField(data: unknown, field: string): string | undefined {
	const value = getResponseField(data, field);
	return typeof value === "string" ? value : undefined;
}

function getResponseHeader(headers: unknown, name: string): string | undefined {
	if (!headers || typeof headers !== "object") return undefined;

	const headerRecord = headers as Record<string, unknown>;
	const directValue = headerRecord[name] ?? headerRecord[name.toLowerCase()] ?? headerRecord[name.toUpperCase()];
	if (typeof directValue === "string") return directValue;

	const getter = (headers as { get?: (header: string) => unknown }).get;
	if (typeof getter === "function") {
		const value = getter.call(headers, name);
		if (typeof value === "string") return value;
	}

	return undefined;
}

function parseTimestampSeconds(value: unknown): number | null {
	if (typeof value !== "string" && typeof value !== "number") return null;

	if (typeof value === "number") {
		return Number.isFinite(value) ? Math.floor(value > 10_000_000_000 ? value / 1000 : value) : null;
	}

	const parsed = Date.parse(value);
	if (!Number.isFinite(parsed)) return null;

	return Math.floor(parsed / 1000);
}

function getServerTimestampSeconds(error: unknown): number | null {
	const response = getHttpErrorResponse(error);
	if (!response) return null;

	const bodyTimestamp = getResponseField(response.data, "timestamp");
	const bodyTimestampSeconds = parseTimestampSeconds(bodyTimestamp);
	if (bodyTimestampSeconds !== null) return bodyTimestampSeconds;

	return parseTimestampSeconds(getResponseHeader(response.headers, "date"));
}

function isUnauthorizedError(error: unknown): boolean {
	const response = getHttpErrorResponse(error);
	const status = response?.status;
	const code = getResponseField(response?.data, "code");
	const msg = (getResponseStringField(response?.data, "msg") || (error as { message?: string }).message || "").toLowerCase();
	return status === 401 || code === 401 || code === "401" || msg.includes("invalid token") || msg.includes("invalid.token") || msg.includes("auth_failed");
}

function describeHttpError(error: unknown): string {
	const err = error as { message?: string };
	const response = getHttpErrorResponse(error);
	const status = response?.status;
	const data = response?.data;
	const details: string[] = [];

	if (status !== undefined) details.push(`status ${status}`);
	if (data !== undefined) details.push(`response ${JSON.stringify(data).slice(0, 500)}`);
	if (details.length > 0) return details.join(", ");
	return err?.message || String(error);
}

export class http_api {
	adapter: Roborock;
	loginApi: AxiosInstance | null = null;
	realApi: AxiosInstance | null = null;
	userData: UserData | null = null;
	homeData: HomeData | null = null;
	homeID: number | null = null;
	homeDetailID: number | null = null;
	public productInfo: ProductV5Response | null = null;
	private loginRegionConfig: RegionConfig | null = null;
	private realApiClockOffsetSeconds = 0;

	private fwFeaturesCache = new Map<string, number[]>();

	constructor(adapter: Roborock) {
		this.adapter = adapter;
	}

	/**
	 * Initializes the HTTP API and authentication for Roborock Cloud.
	 * @see test/unit/cloud_api_specification.test.ts for the cloud login flow and Hawk signing details.
	 * @param clientID The client identifier.
	 */
	async init(clientID: string): Promise<void> {
		// Initialize the login API (needed to get access to the real API)
		const region = this.adapter.config.region || "eu";
		const fallbackRegionConfig = REGION_CONFIG[region] || REGION_CONFIG["eu"];
		const headerClientId = this.getHeaderClientId(clientID);
		const regionConfig = await this.resolveIotLoginInfo(fallbackRegionConfig, headerClientId);
		this.loginRegionConfig = regionConfig;

		this.adapter.rLog("HTTP", null, "Info", "Cloud", undefined, `Initializing HTTP API with region: ${region} (${regionConfig.apiBaseUrl})`, "info");

		this.loginApi = this.createLoginApi(regionConfig.apiBaseUrl, headerClientId);

		// Attempt to restore session
		await this.loadUserData();

		await this.initializeRealApi();

		try {
			await this.getHomeID();
		} catch (e: unknown) {
			const msg = this.adapter.errorMessage(e);
			if (msg && (msg.includes("invalid token") || msg.includes("auth_failed"))) {
				await this.reauthenticate("Token expired or invalid");
			} else {
				throw e; // Rethrow other errors
			}
		}
	}

	private getHeaderClientId(clientID: string): string {
		return crypto.createHash("md5").update(this.adapter.config.username).update(clientID).digest().toString("base64");
	}

	private createLoginApi(baseURL: string, headerClientId: string): AxiosInstance {
		return axios.create({
			baseURL,
			headers: {
				header_clientid: headerClientId,
				"Content-Type": "application/x-www-form-urlencoded",
				header_appversion: "4.54.02",
				header_clientlang: "en",
				header_phonemodel: "iPhone16,1",
				header_phonesystem: "iOS",
			},
		});
	}

	private async resolveIotLoginInfo(fallbackRegionConfig: RegionConfig, headerClientId: string): Promise<RegionConfig> {
		const candidates = [
			fallbackRegionConfig.apiBaseUrl,
			...REGION_DISCOVERY_BASE_URLS,
		].filter((url, index, all) => all.indexOf(url) === index);

		for (const baseURL of candidates) {
			try {
				const discoveryApi = this.createLoginApi(baseURL, headerClientId);
				const response = await discoveryApi.post<IotLoginInfoResponse>(API_V1_GET_URL_BY_EMAIL, undefined, {
					params: {
						email: this.adapter.config.username,
						needtwostepauth: "false",
					},
				});

				if (response.data?.code !== 200 || !response.data.data?.url) {
					this.adapter.rLog("HTTP", null, "Debug", "Cloud", undefined, `Region discovery via ${baseURL} returned ${response.data?.code}: ${response.data?.msg}`, "debug");
					continue;
				}

				const discovered = response.data.data;
				const discoveredUrl = discovered.url;
				if (!discoveredUrl) continue;
				const resolvedConfig = {
					apiBaseUrl: discoveredUrl,
					loginCountry: discovered.country || fallbackRegionConfig.loginCountry,
					loginCountryCode: String(discovered.countrycode || fallbackRegionConfig.loginCountryCode),
				};

				this.adapter.rLog("HTTP", null, "Info", "Cloud", undefined, `Resolved Roborock account region: ${resolvedConfig.apiBaseUrl} (${resolvedConfig.loginCountry}/${resolvedConfig.loginCountryCode})`, "info");
				return resolvedConfig;
			} catch (error: unknown) {
				this.adapter.rLog("HTTP", null, "Debug", "Cloud", undefined, `Region discovery via ${baseURL} failed: ${this.adapter.errorMessage(error)}`, "debug");
			}
		}

		this.adapter.rLog("HTTP", null, "Warn", "Cloud", undefined, `Could not resolve account region from Roborock. Falling back to configured region (${fallbackRegionConfig.apiBaseUrl}).`, "warn");
		return fallbackRegionConfig;
	}

	private async clearPersistedUserData(): Promise<void> {
		this.userData = null;
		this.homeID = null;
		this.homeDetailID = null;
		this.realApi = null;
		if (this.loginApi) delete this.loginApi.defaults.headers.common["Authorization"];
		await this.adapter.setState("UserData", { val: "", ack: true });
	}

	private async reauthenticate(reason: string): Promise<void> {
		this.adapter.rLog("HTTP", null, "Warn", "Cloud", undefined, `${reason}. Clearing session and re-authenticating...`, "warn");
		await this.clearPersistedUserData();
		await this.initializeRealApi();
		await this.getHomeID();
	}

	private markUserDataCurrent(): void {
		if (this.userData) {
			this.userData.authProfileVersion = USER_DATA_AUTH_PROFILE_VERSION;
		}
	}

	/**
	 * Restores UserData from state.
	 */
	async loadUserData(): Promise<void> {
		try {
			const userDataState = await this.adapter.getStateAsync("UserData");
			if (userDataState && userDataState.val) {
				const data = JSON.parse(userDataState.val as string);
				if (data && data.token && data.rriot) {
					if (data.authProfileVersion !== USER_DATA_AUTH_PROFILE_VERSION) {
						const version = data.authProfileVersion ?? "legacy";
						this.adapter.rLog("HTTP", null, "Warn", "Cloud", undefined, `Persisted UserData auth profile ${version} is outdated. Clearing it so fresh RRIOT credentials can be requested.`, "warn");
						await this.clearPersistedUserData();
						return;
					}
					this.userData = data;
					this.adapter.rLog("HTTP", null, "Info", "Cloud", undefined, "Restored persisted UserData.", "info");
				}
			}
		} catch {
			this.adapter.rLog("HTTP", null, "Debug", "Cloud", undefined, "No previous UserData found or invalid.", "debug");
		}
	}

	/**
	 * Logs in (if necessary) and sets up the authenticated "Real API" with Hawk authentication.
	 */
	private loginCodeResolver: ((code: string) => void) | null = null;

	public submitLoginCode(code: string): void {
		if (this.loginCodeResolver) {
			this.loginCodeResolver(code);
			this.loginCodeResolver = null;
		}
	}

	private getRealApiTimestamp(): number {
		return Math.floor(Date.now() / 1000) + this.realApiClockOffsetSeconds;
	}

	private createRealApiAuthorization(rriot: RriotData, path: string, params: Record<string, unknown>): string {
		return createHawkAuthentication(rriot, path, params, {}, this.getRealApiTimestamp());
	}

	private syncRealApiClockOffsetFromError(error: unknown): boolean {
		const serverTimestampSeconds = getServerTimestampSeconds(error);
		if (serverTimestampSeconds === null) return false;

		const detectedOffsetSeconds = serverTimestampSeconds - Math.floor(Date.now() / 1000);
		const nextOffsetSeconds = Math.abs(detectedOffsetSeconds) > REAL_API_CLOCK_SKEW_RETRY_THRESHOLD_SECONDS ? detectedOffsetSeconds : 0;
		if (Math.abs(nextOffsetSeconds - this.realApiClockOffsetSeconds) <= REAL_API_CLOCK_SKEW_RETRY_TOLERANCE_SECONDS) {
			return false;
		}

		this.realApiClockOffsetSeconds = nextOffsetSeconds;
		if (nextOffsetSeconds === 0) {
			this.adapter.rLog("HTTP", null, "Warn", "Cloud", undefined, "Roborock Real API timestamp now matches the local clock. Retrying signed request without timestamp offset.", "warn");
			return true;
		}

		const direction = nextOffsetSeconds > 0 ? "ahead of" : "behind";
		this.adapter.rLog("HTTP", null, "Warn", "Cloud", undefined, `Roborock Real API timestamp is ${Math.abs(nextOffsetSeconds)}s ${direction} the local clock. Retrying signed request with server timestamp offset. Please check host NTP/time sync.`, "warn");
		return true;
	}

	async initializeRealApi(): Promise<void> {
		this.adapter.rLog("HTTP", null, "Debug", "Cloud", undefined, "Initializing Real API (Hawk Auth)", "debug");

		if (!this.loginApi) {
			throw new Error("loginApi is not initialized. Call init() first.");
		}
		if (!this.userData) {
			try {
				let usePasswordFlow = this.adapter.config.loginMethod === "password" && !!this.adapter.config.password;

				// 1. Sign Request (Get K) - needed for both password and code login (for password encryption or code verification)
				// Use a random 16-char string for 's' (nonce/salt)
				const s = crypto.randomBytes(12).toString("base64").substring(0, 16).replace(/\+/g, "X").replace(/\//g, "Y");
				const signData = await this.signRequest(s);
				if (!signData) throw new Error("Failed to obtain signature key k");
				const k = signData.k;

				if (usePasswordFlow) {
					this.adapter.rLog("HTTP", null, "Info", "Cloud", undefined, "Starting Password Login Flow...", "info");
					try {
						const loginResult = await this.loginByPassword(this.adapter.config.password, k, s);
						if (loginResult.code === 200) {
							this.userData = loginResult.data!;
							this.markUserDataCurrent();
							this.adapter.rLog("HTTP", null, "Info", "Cloud", undefined, "Login with password successful.", "info");
						} else if (loginResult.code === 2031) {
							this.adapter.rLog("HTTP", null, "Warn", "Cloud", undefined, "Password login requires 2FA (Code 2031). Falling back to 2FA flow.", "warn");
							usePasswordFlow = false;
						} else {
							throw new Error(`Login with password failed: ${JSON.stringify(loginResult)}`);
						}
					} catch (e: unknown) {
						this.adapter.rLog("HTTP", null, "Error", "Cloud", undefined, `Password login error: ${this.adapter.errorMessage(e)}`, "error");
						// If explicit 2031 (handled above) or other error, we might decide to fallback or fail.
						// Current logic: if it was 2031, usePasswordFlow is set to false, so we fall through to 2FA.
						// If it was another error (e.g. wrong password), we should probably stop?
						// For safety/flexibility, if we flagged 'false' above, we continue. If we threw, we stop.
						if (usePasswordFlow) throw e;
					}
				}

				// If not using password flow (or fell back)
				if (!this.userData && !usePasswordFlow) {
					this.adapter.rLog("HTTP", null, "Info", "Cloud", undefined, "Starting Direct 2FA Login Flow...", "info");

					// 1. Request Email Code
					await this.requestEmailCode(this.adapter.config.username);

					const warning = [
						"********************************************************************************",
						"ATTENTION: 2FA Code required!",
						`An email has been sent to ${this.adapter.config.username}.`,
						"Please enter the 6-digit code into the state 'roborock.0.loginCode' immediately.",
						"********************************************************************************"
					].join("\n");

					this.adapter.rLog("HTTP", null, "Error", "Cloud", undefined, warning, "error");

					// State at root: roborock.0.loginCode
					const stateId = "loginCode";
					await this.adapter.ensureState(stateId, { name: "2FA Login Code", write: true, type: "string", def: "" });
					await this.adapter.setState(stateId, { val: "", ack: true });

					await this.adapter.subscribeStatesAsync(stateId);

					// 2. Wait for Code
					let code = "";
					let timeout: ioBroker.Timeout | undefined;
					try {
						code = await new Promise<string>((resolve, reject) => {
							this.loginCodeResolver = resolve;
							// Timeout after 15 minutes
							timeout = this.adapter.setTimeout(() => {
								if (this.loginCodeResolver) {
									this.loginCodeResolver = null;
									reject(new Error("Timeout waiting for 2FA code"));
								}
							}, 15 * 60 * 1000); // 15 min
						});
					} catch (e: unknown) {
						throw e;
					} finally {
						if (timeout) this.adapter.clearTimeout(timeout);
					}

					this.adapter.rLog("HTTP", null, "Info", "Cloud", undefined, "2FA code received. Proceeding with login...", "info");
					await this.adapter.unsubscribeStatesAsync(stateId);

					// 3. Login with Code
					// Regenerate signature to avoid expiration
					const newS = crypto.randomBytes(12).toString("base64").substring(0, 16).replace(/\+/g, "X").replace(/\//g, "Y");
					const newSignData = await this.signRequest(newS);

					if (!newSignData) {
						this.adapter.rLog("HTTP", null, "Error", "Cloud", undefined, `Failed to re-obtain signature for 2FA.`, "error");
						throw new Error("Failed to re-obtain signature for 2FA login");
					}

					const loginResult = await this.loginWithCode(code, newSignData.k, newS);

					if (loginResult.code === 200) {
						this.userData = loginResult.data!; // data IS UserData
						this.markUserDataCurrent();
						this.adapter.rLog("HTTP", null, "Info", "Cloud", undefined, `Login with code successful. Stored UserData auth profile ${USER_DATA_AUTH_PROFILE_VERSION}.`, "info");
						await this.adapter.setState(stateId, { val: "", ack: true });
					} else {
						throw new Error(`Login with code failed: ${JSON.stringify(loginResult)}`);
					}
				}

				if (!this.userData) {
					throw new Error("Login returned empty userdata.");
				}

				await this.adapter.setState("UserData", { val: JSON.stringify(this.userData), ack: true });

				// Load product definitions (V5 API)
				try {
					this.productInfo = await this.getProductInfoV5();
					if (this.productInfo) {
						let count = 0;
						if (this.productInfo.data && this.productInfo.data.categoryDetailList) {
							for (const cat of this.productInfo.data.categoryDetailList) {
								if (cat.productList) count += cat.productList.length;
							}
						}
						this.adapter.rLog("HTTP", null, "Info", "Cloud", undefined, `V5 Product Info fetched. ${count} products available.`, "info");
						await this.adapter.setState("info.productInfo", { val: JSON.stringify(this.productInfo), ack: true });
					}
				} catch (err) {
					this.adapter.rLog("HTTP", null, "Warn", "Cloud", undefined, `Failed to get product info V5: ${err}`, "warn");
				}
			} catch (error: unknown) {
				this.adapter.rLog("HTTP", null, "Error", "Cloud", undefined, `Error in initializeRealApi: ${this.adapter.errorMessage(error)}`, "error");
				throw error;
			}
		}

		if (!this.userData?.token) {
			throw new Error("Failed to retrieve user token. Check login credentials.");
		}

		// Set global auth header for loginApi (though mostly unused after this)
		this.loginApi.defaults.headers.common["Authorization"] = this.userData.token;

		try {
			const rriot = this.get_rriot();
			this.adapter.rLog("HTTP", null, "Debug", "Cloud", undefined, `Using Roborock Real API endpoint: ${rriot.r.a} (MQTT: ${rriot.r.m})`, "debug");

			// Initialize the real API with Hawk Authentication Interceptor
			const realApi = axios.create({
				baseURL: this.userData.rriot.r.a,
			});

			realApi.interceptors.request.use((config: InternalAxiosRequestConfig) => {
				const { path, params } = getRealApiSignatureInput(config);
				config.headers["Authorization"] = this.createRealApiAuthorization(rriot, path, params);
				return config;
			});

			this.realApi = realApi;

			await this.adapter.setState("info.connection", { val: true, ack: true });
		} catch (error: unknown) {
			this.adapter.rLog("HTTP", null, "Error", "Cloud", undefined, `Error in initializeRealApi: ${this.adapter.errorStack(error)}`, "error");
			await this.adapter.setState("info.connection", { val: false, ack: true });
		}
	}

	async requestEmailCode(username: string): Promise<void> {
		if (!this.loginApi) throw new Error("loginApi is not initialized.");

		try {
			await this.reserveEmailCodeRequestSlot();

			const params = new URLSearchParams();
			params.append("type", "login");
			params.append("email", username);
			params.append("platform", "");

			const res = await this.loginApi.post(API_V4_EMAIL_CODE, params.toString());

			if (res.data && res.data.code != 200) {
				if (res.data.code === 9002) {
					await this.markEmailCodeRateLimited();
				}
				throw new Error(`Start 2FA failed: ${res.data.msg} (Code: ${res.data.code})`);
			}
		} catch (error: unknown) {
			const err = error as { response?: { data?: { code?: number } } };
			if (err?.response?.data !== undefined) {
				if (err.response.data.code === 9002) {
					await this.markEmailCodeRateLimited();
				}
				this.adapter.rLog("HTTP", null, "Error", "Cloud", undefined, `Request email code failed with response: ${JSON.stringify(err.response.data)}`, "error");
			}
			throw error; // Re-throw exact error to be caught by caller
		}
	}

	private async loadAuthRateLimitData(): Promise<AuthRateLimitData> {
		await this.adapter.ensureState(AUTH_RATE_LIMIT_STATE, { name: "Auth rate limit data", type: "string", write: false, def: "" });
		try {
			const state = await this.adapter.getStateAsync(AUTH_RATE_LIMIT_STATE);
			if (state?.val) {
				const data = JSON.parse(String(state.val)) as AuthRateLimitData;
				return data && typeof data === "object" ? data : {};
			}
		} catch {
			this.adapter.rLog("HTTP", null, "Debug", "Cloud", undefined, "No previous auth rate limit data found or invalid.", "debug");
		}
		return {};
	}

	private async storeAuthRateLimitData(data: AuthRateLimitData): Promise<void> {
		await this.adapter.ensureState(AUTH_RATE_LIMIT_STATE, { name: "Auth rate limit data", type: "string", write: false, def: "" });
		await this.adapter.setState(AUTH_RATE_LIMIT_STATE, { val: JSON.stringify(data), ack: true });
	}

	private async reserveEmailCodeRequestSlot(): Promise<void> {
		const now = Date.now();
		const rateLimit = await this.loadAuthRateLimitData();
		const nextRequestAt = Math.max(
			(rateLimit.emailCodeRequestedAt ?? 0) + EMAIL_CODE_COOLDOWN_MS,
			rateLimit.rateLimitedUntil ?? 0,
		);

		if (nextRequestAt > now) {
			throw new Error(`Roborock 2FA code request suppressed to avoid rate limits. Next automatic attempt is allowed after ${new Date(nextRequestAt).toISOString()}.`);
		}

		await this.storeAuthRateLimitData({
			...rateLimit,
			emailCodeRequestedAt: now,
			rateLimitedUntil: rateLimit.rateLimitedUntil && rateLimit.rateLimitedUntil > now ? rateLimit.rateLimitedUntil : undefined,
		});
	}

	private async markEmailCodeRateLimited(): Promise<void> {
		const rateLimit = await this.loadAuthRateLimitData();
		const rateLimitedUntil = Date.now() + EMAIL_CODE_RATE_LIMIT_COOLDOWN_MS;
		await this.storeAuthRateLimitData({
			...rateLimit,
			rateLimitedUntil,
		});
	}

	async signRequest(s: string): Promise<{ k: string } | null> {
		if (!this.loginApi) return null;

		try {
			const res = await this.loginApi.post(API_V3_SIGN, undefined, { params: { s } });
			return res.data.data;
		} catch (e: unknown) {
			this.adapter.rLog("HTTP", null, "Error", "Cloud", undefined, `SignRequest failed: ${this.adapter.errorMessage(e)}`, "error");
			return null;
		}
	}

	async loginWithCode(code: string, k: string, s: string): Promise<LoginV4Response> {
		if (!this.loginApi) throw new Error("loginApi not initialized");

		const headers = {
			"x-mercy-k": k,
			"x-mercy-ks": s
		};

		const region = this.adapter.config.region || "eu";
		const regionConfig = this.loginRegionConfig || REGION_CONFIG[region] || REGION_CONFIG["eu"];

		const params = new URLSearchParams({
			country: regionConfig.loginCountry,
			countryCode: regionConfig.loginCountryCode,
			email: this.adapter.config.username,
			code: code,
			majorVersion: "14",
			minorVersion: "0"
		});

		try {
			const res = await this.loginApi.post(API_V4_LOGIN_CODE, params.toString(), { headers });
			return res.data;
		} catch (e: unknown) {
			throw new Error(`Login with code failed: ${this.adapter.errorMessage(e)}`);
		}
	}

	async loginByPassword(password: string, k: string, s: string): Promise<LoginV4Response> {
		if (!this.loginApi) throw new Error("loginApi not initialized");

		this.adapter.rLog("HTTP", null, "->", "Cloud", undefined, `Attempting Password Login for user: ${this.adapter.config.username}`, "info");

		const encryptedPassword = cryptoEngine.encryptPassword(password, k);

		const headers = {
			"x-mercy-k": k,
			"x-mercy-ks": s
		};

		const params = new URLSearchParams({
			email: this.adapter.config.username,
			password: encryptedPassword,
			majorVersion: "14",
			minorVersion: "0"
		});

		try {
			const res = await this.loginApi.post(API_V4_LOGIN_PASSWORD, params.toString(), { headers });
			return res.data;
		} catch (e: unknown) {
			const err = e as { response?: { data?: LoginV4Response } };
			if (err?.response?.data) {
				const errData = err.response.data as LoginV4Response;
				this.adapter.rLog("HTTP", null, "<-", "Cloud", undefined, `Login Failed. Code: ${errData.code}, Msg: ${errData.msg}`, "error");
				return errData;
			}
			throw new Error(`Login with password failed: ${this.adapter.errorMessage(e)}`);
		}
	}

	async getProductInfoV5(): Promise<ProductV5Response | null> {
		if (!this.loginApi) return null;

		try {
			const res = await this.loginApi.get(API_V5_PRODUCT);

			if (res.data && res.data.data) {
				this.productInfo = res.data; // Store it
				return res.data;
			}
			return null;
		} catch (e: unknown) {
			this.adapter.rLog("HTTP", null, "Warn", "Cloud", undefined, `getProductInfoV5 failed: ${this.adapter.errorMessage(e)}`, "warn");
			return null;
		}
	}

	async ensureProductInfo(): Promise<void> {
		if (!this.productInfo) {
			this.adapter.rLog("HTTP", null, "Debug", "Cloud", undefined, "ProductInfo not present. Fetching V5 Product Info...", "debug");
			await this.getProductInfoV5();
		}
	}

	async downloadProductImages() {
		if (!this.adapter.config.downloadRoborockImages) return;
		await this.ensureProductInfo();

		if (!this.productInfo?.data?.categoryDetailList) {
			this.adapter.rLog("HTTP", null, "Warn", "Cloud", undefined, "Cannot download images: categoryDetailList missing.", "warn");
			return;
		}

		for (const cat of this.productInfo.data.categoryDetailList) {
			if (!cat.productList) continue;
			for (const p of cat.productList) {
				if (p.picurl) {
					try {
						const safeId = p.model.replace(/\./g, "_");
						const res = await axios.get(p.picurl, { responseType: "arraybuffer" });
						if (res.status === 200) {
							const base64 = Buffer.from(res.data, "binary").toString("base64");
							const stateId = `Products.${safeId}.image`;

							await this.adapter.setObjectNotExistsAsync(stateId, {
								type: "state",
								common: {
									name: p.model + " Image",
									type: "string",
									role: "value",
									read: true,
									write: false
								},
								native: {}
							});
							await this.adapter.setState(stateId, { val: base64, ack: true });
						}
					} catch (e) {
						this.adapter.rLog("HTTP", null, "Warn", "Cloud", undefined, `Failed to download image for ${p.model}: ${e}`, "warn");
					}
				}
			}
		}
	}

	/**
	 * Retrieves the Home ID from the API.
	 */
	async getHomeID(): Promise<void> {
		if (!this.loginApi) {
			throw new Error("loginApi is not initialized. Call init() first.");
		}

		try {
			const response = await this.loginApi.get<HomeDetailResponse>("api/v1/getHomeDetail");
			if (response.data.data) {
				this.adapter.rLog("HTTP", null, "Debug", "Cloud", undefined, `getHomeDetail: ${JSON.stringify(response.data)}`, "debug");
				this.homeDetailID = response.data.data.id ?? null;
				this.homeID = response.data.data.rrHomeId ?? null;
				if (!this.homeID) throw new Error("getHomeDetail returned no rrHomeId");
				this.adapter.rLog("HTTP", null, "Debug", "Cloud", undefined, `Home identifiers: rrHomeId=${this.homeID}, id=${this.homeDetailID ?? "none"}`, "debug");
			} else {
				this.adapter.rLog("HTTP", null, "Error", "Cloud", undefined, `failed to get getHomeDetail: ${response.data.msg}`, "error");

				if (response.data.msg === "invalid token" || response.data.code === 401) {
					throw new Error("invalid token");
				}
			}
		} catch (error: unknown) {
			this.adapter.rLog("HTTP", null, "Error", "Cloud", undefined, `Error getting HomeID: ${this.adapter.errorMessage(error)}`, "error");
			throw error;
		}
	}

	/**
	 * Downloads the latest Home Data (Devices, Rooms, Products) and stores it in state.
	 * Uses the current V3 endpoint first and bounded fallbacks for non-auth endpoint failures.
	 */
	async updateHomeData(): Promise<void> {
		if (!this.loginApi) throw new Error("loginApi is not initialized. Call init() first.");
		if (!this.realApi) throw new Error("realApi is not initialized. Call initializeRealApi() first");

		if (!this.homeID) {
			throw new Error("No homeId found");
		}

		const hadHomeData = this.homeData !== null;
		try {
			await this.fetchAndStoreHomeData();
		} catch (e: unknown) {
			if (isUnauthorizedError(e)) {
				const message = "Roborock HomeData request returned 401 after successful login. Automatic re-authentication is disabled to avoid Roborock 2FA rate limits.";
				if (hadHomeData) {
					this.adapter.rLog("HTTP", null, "Warn", "Cloud", undefined, `${message} Keeping previous HomeData after refresh failure.`, "warn");
					return;
				}
				this.adapter.rLog("HTTP", null, "Error", "Cloud", undefined, message, "error");
				throw new Error(message);
			}

			this.adapter.rLog("HTTP", null, "Error", "Cloud", undefined, `Error updating HomeData: ${this.adapter.errorStack(e)}`, "error");
			if (hadHomeData) {
				this.adapter.rLog("HTTP", null, "Warn", "Cloud", undefined, "Keeping previous HomeData after refresh failure.", "warn");
				return;
			}
			throw e;
		}
	}

	private async fetchAndStoreHomeData(): Promise<void> {
		if (!this.realApi) throw new Error("realApi is not initialized. Call initializeRealApi() first");
		if (!this.homeID) throw new Error("No homeId found");

		let lastError: unknown;
		const attempts = this.getHomeDataAttempts();
		let stopAttempts = false;
		for (const [index, attempt] of attempts.entries()) {
			let retriedWithClockOffset = false;
			while (true) {
				try {
					const res = await this.realApi.get<HomeDataResponse>(attempt.path);

					if (!res.data?.success || !res.data?.result) {
						throw new Error(`${attempt.label} HomeData response missing or not success: ${JSON.stringify(res.data)}`);
					}

					this.storeHomeDataResult(res.data.result, attempt.label);
					await this.adapter.setState("HomeData", { val: JSON.stringify(this.homeData), ack: true });
					return;
				} catch (error: unknown) {
					lastError = error;

					if (!retriedWithClockOffset && isUnauthorizedError(error) && this.syncRealApiClockOffsetFromError(error)) {
						retriedWithClockOffset = true;
						this.adapter.rLog("HTTP", null, "Warn", "Cloud", undefined, `${attempt.label} HomeData request failed (${attempt.path}): ${describeHttpError(error)}. Retrying the same HomeData request once with the adjusted Real API timestamp.`, "warn");
						continue;
					}

					const unauthorized = isUnauthorizedError(error);
					const nextAttempt = attempts[index + 1];
					const canTryNextAttempt = !unauthorized && !!nextAttempt;
					let nextMessage = "";
					if (canTryNextAttempt) {
						nextMessage = ` Trying next HomeData candidate: ${nextAttempt.label}.`;
					} else if (unauthorized && nextAttempt) {
						nextMessage = " Not trying additional HomeData candidates because Roborock rejected the signed auth token.";
					}
					const level = canTryNextAttempt ? "Warn" : "Error";
					const severity = canTryNextAttempt ? "warn" : "error";
					this.adapter.rLog("HTTP", null, level, "Cloud", undefined, `${attempt.label} HomeData request failed (${attempt.path}): ${describeHttpError(error)}.${nextMessage}`, severity);
					stopAttempts = !canTryNextAttempt;
					break;
				}
			}

			if (stopAttempts) break;
		}

		throw lastError ?? new Error("HomeData request failed");
	}

	private getHomeDataAttempts(): Array<{ label: string; path: string }> {
		if (!this.homeID) return [];
		const ids = [
			{ label: "rrHomeId", id: this.homeID },
			{ label: "homeDetailId", id: this.homeDetailID },
		].filter((entry): entry is { label: string; id: number } => typeof entry.id === "number");
		const dedupedIds = ids.filter((entry, index, all) => all.findIndex((candidate) => candidate.id === entry.id) === index);

		return HOME_DATA_ENDPOINTS.flatMap((endpoint) =>
			dedupedIds.map((id) => ({
				label: `${endpoint.label}/${id.label}`,
				path: endpoint.path(id.id),
			})),
		);
	}

	private storeHomeDataResult(result: NonNullable<HomeDataResponse["result"]>, source: string): void {
		this.homeData = {
			rrHomeId: result.id,
			products: result.products || [],
			devices: result.devices || [],
			receivedDevices: result.receivedDevices || [],
			rooms: result.rooms || []
		};
		this.adapter.rLog("HTTP", null, "<-", "Cloud", undefined, `HomeData updated via ${source} endpoint (HomeID: ${this.homeID}, Devices: ${this.homeData.devices?.length}, Received: ${this.homeData.receivedDevices?.length})`, "debug");
	}

	/**
	 * Returns the RRIOT authentication data.
	 */
	get_rriot(): RriotData {
		if (!this.userData) {
			throw new Error("this.userData is not initialized. Call updateHomeData() first");
		}
		return this.userData.rriot;
	}

	/**
	 * Resolves the numeric Product ID for a given model.
	 * Tries V3 HomeData first, then V5 ProductInfo.
	 */
	getProductIdByModel(modelName: string): number | null {
		// 1. Try V5 ProductInfo
		if (this.productInfo && this.productInfo.data && Array.isArray(this.productInfo.data.categoryDetailList)) {
			for (const detail of this.productInfo.data.categoryDetailList) {
				if (detail.productList && Array.isArray(detail.productList)) {
					const productV5 = detail.productList.find((p) => p.model === modelName);
					if (productV5) {
						return Number(productV5.id);
					}
				}
			}
		}

		// Log if we have info but can't find model
		if (this.productInfo) {
			this.adapter.rLog("HTTP", null, "Warn", "Cloud", undefined, `Model ${modelName} not found in V5 ProductInfo.`, "warn");
		}

		return null;
	}

	/**
	 * Retrieves scenes for the current home.
	 */
	async getScenes(): Promise<SceneResponse> {
		if (!this.loginApi) throw new Error("loginApi is not initialized.");
		if (!this.realApi) throw new Error("realApi is not initialized.");

		return await this.realApi.get(`user/scene/home/${this.homeID}`).then((res) => res.data);
	}

	/**
	 * Stores firmware feature IDs in the cache for a specific device.
	 */
	public storeFwFeaturesResult(duid: string, featureIds: number[]): void {
		if (Array.isArray(featureIds)) {
			this.fwFeaturesCache.set(duid, featureIds);
			this.adapter.rLog("HTTP", duid, "Debug", "Cloud", undefined, `Stored FW features result: ${JSON.stringify(featureIds)}`, "debug");
		} else {
			this.adapter.rLog("HTTP", duid, "Warn", "Cloud", undefined, `Invalid data received for storing FW features: ${JSON.stringify(featureIds)}`, "warn");
		}
	}

	public getFwFeaturesResult(duid: string): number[] | undefined {
		return this.fwFeaturesCache.get(duid);
	}

	/**
	 * Retrieves firmware update status for a device.
	 */
	async getFirmwareStates(duid: string): Promise<any> {
		try {
			if (!this.realApi) throw new Error("realApi is not initialized.");

			return await this.realApi.get(`ota/firmware/${duid}/updatev2`);
		} catch (error: unknown) {
			throw new Error(`Error in getFirmwareStates: ${this.adapter.errorMessage(error)}`);
		}
	}

	/**
	 * Returns the list of products from HomeData.
	 */
	getProducts(): Product[] {
		if (!this.homeData) return [];
		return this.homeData.products || [];
	}

	/**
	 * Returns a combined list of owned and shared devices.
	 * Returns an empty array if homeData is not initialized.
	 */
	getDevices(): Device[] {
		if (!this.homeData) {
			return [];
		}
		return [...(this.homeData.devices || []), ...(this.homeData.receivedDevices || [])];
	}

	getReceivedDevices(): Device[] {
		if (!this.homeData) return [];
		return this.homeData.receivedDevices || [];
	}

	/**
	 * Checks if a device is a shared device (not owned by the user).
	 */
	isSharedDevice(duid: string): boolean {
		const sharedDevices = this.getReceivedDevices();
		return sharedDevices.some((device) => device.duid === duid);
	}

	/**
	 * Fetches room list for a shared device (owner's rooms).
	 * GET user/deviceshare/query/{duid}/rooms
	 * @returns Array of { id, name } or [] on error / non-shared
	 */
	async getSharedDeviceRooms(duid: string): Promise<{ id: number; name: string }[]> {
		if (!duid || !this.isSharedDevice(duid)) return [];
		try {
			if (!this.realApi) {
				this.adapter.rLog("HTTP", duid, "Warn", "Cloud", undefined, "getSharedDeviceRooms: realApi not initialized.", "warn");
				return [];
			}
			const res = await this.realApi.get<{ success?: boolean; result?: { id: number; name: string }[] }>(`user/deviceshare/query/${duid}/rooms`);
			const result = res.data?.result;
			if (Array.isArray(result)) return result;
			return [];
		} catch (e: any) {
			this.adapter.rLog("HTTP", duid, "Warn", "Cloud", undefined, `getSharedDeviceRooms failed: ${e?.message || e}`, "warn");
			return [];
		}
	}

	/**
	 * Matches rooms from HomeData and optionally assigns fallback names.
	 */
	getMatchedRoomIDs(assignFallbackNames = false): { id: number; name: string }[] {
		if (!this.homeData || !Array.isArray(this.homeData.rooms)) {
			// Not throwing an error here anymore, just logging warning to prevent crashes if rooms are missing
			this.adapter.rLog("HTTP", null, "Warn", "Cloud", undefined, "getMatchedRoomIDs: this.homeData.rooms is missing or invalid.", "warn");
			return [];
		}

		let unnamedCounter = 1;

		const matchedRooms = this.homeData.rooms.map((room) => {
			let name = room.name?.trim();

			if (!name && assignFallbackNames) {
				name = `Room ${unnamedCounter++}`;
			}

			return {
				id: room.id,
				name: name || "",
			};
		});

		if (assignFallbackNames) {
			this.adapter.rLog("HTTP", null, "Info", "Cloud", undefined, `Matched ${matchedRooms.length} rooms (fallback names included)`, "info");
		}

		return matchedRooms;
	}

	/**
	 * Maps all devices to their local keys.
	 */
	getMatchedLocalKeys(): Map<string, string> {
		const devices = this.getDevices();
		return new Map(devices.map((device) => [device.duid, device.localKey]));
	}

	/**
	 * Finds the model name for a given device DUID.
	 */
	getRobotModel(duid: string): string | null {
		if (!duid) {
			throw new Error("Parameter duid missing in function getRobotModel");
		}

		const devices = this.getDevices();

		try {
			const products = this.getProducts();

			const device = devices.find((d) => d.duid === duid);
			if (!device) {
				this.adapter.rLog("HTTP", duid, "Error", "Cloud", undefined, "Device not found in local homeData", "error");
				return null;
			}

			const product = products.find((p) => p.id === device.productId);
			return product ? product.model : null;
		} catch (error: unknown) {
			this.adapter.rLog("HTTP", duid, "Error", "Cloud", undefined, `Error in getRobotModel: ${this.adapter.errorMessage(error)}`, "error");
			return null;
		}
	}

	/**
	 * Finds the product category for a given device DUID.
	 */
	getProductCategory(duid: string): string | null {
		const devices = this.getDevices();

		try {
			const products = this.getProducts();

			const device = devices.find((d) => d.duid == duid);
			if (!device) return null;

			const product = products.find((p) => p.id == device.productId);
			return product ? product.category : null;
		} catch (error: unknown) {
			this.adapter.rLog("HTTP", duid, "Error", "Cloud", undefined, `Error in getProductCategory: ${this.adapter.errorMessage(error)}`, "error");
			return null;
		}
	}

	public getFeatureSet(duid: string): number | undefined {
		const allDevices = this.getDevices();
		const device = allDevices.find((d) => d.duid === duid);
		return device?.featureSet;
	}

	public getNewFeatureSet(duid: string): string | undefined {
		const allDevices = this.getDevices();
		const device = allDevices.find((d) => d.duid === duid);
		return device?.newFeatureSet;
	}
}
