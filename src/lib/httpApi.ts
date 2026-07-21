import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import axios from "axios";
import * as crypto from "node:crypto";
import { Roborock } from "../main";
import type {
	ApkAppPluginCloudBootstrapContext,
	ApkAppPluginHomeDataContext,
} from "../apppluginHost";
import type { ApkAppPluginProductRepositoryContext } from "../apppluginHost/apkAppPluginSessionDescriptor";
import {
	createApkAppPluginCloudBootstrapContext,
	createApkAppPluginHomeDataContext,
} from "../apppluginHost/apkHomeDataContext";
import {
	loadApkProductRoleDefinitions,
	type ApkProductRoleDefinition,
} from "../apppluginHost/apkProductRoleCatalog";
import { LoginV4Response, ProductV5Response } from "./apiTypes";
import { cryptoEngine } from "./cryptoEngine";

// Constants
const API_V3_SIGN = "api/v3/key/sign";
const API_V4_LOGIN_CODE = "api/v4/auth/email/login/code";
const API_V4_LOGIN_PASSWORD = "api/v4/auth/email/login/pwd";
const API_V4_EMAIL_CODE = "api/v4/email/code/send";
const API_V5_PRODUCT = "api/v5/product";
const REAL_API_CLOCK_SKEW_ABORT_THRESHOLD_SECONDS = 60;

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

// --------------------
// Interfaces & Types
// --------------------

interface RriotData {
	u: string;
	s: string;
	h: string;
	k: string;
	r: { a: string; m: string };
}

interface UserData {
	token: string;
	rriot: RriotData;
	rruid?: string;
	region?: string;
	country?: string;
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

/**
 * Helper to calculate MD5 hex string
 */
function md5hex(str: string): string {
	return crypto.createHash("md5").update(str).digest("hex");
}

function getHttpErrorResponse(error: unknown): { status?: number; data?: unknown; headers?: unknown } | undefined {
	return (error as { response?: { status?: number; data?: unknown; headers?: unknown } })?.response;
}

function getResponseField(data: unknown, field: string): unknown {
	if (!data || typeof data !== "object") return undefined;
	return (data as Record<string, unknown>)[field];
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

function getRealApiClockSkewSeconds(error: unknown): number | null {
	const response = getHttpErrorResponse(error);
	const status = response?.status;
	const code = getResponseField(response?.data, "code");
	if (status !== 401 && code !== 401 && code !== "401") return null;

	const serverTimestampSeconds = getServerTimestampSeconds(error);
	if (serverTimestampSeconds === null) return null;

	const offsetSeconds = serverTimestampSeconds - Math.floor(Date.now() / 1000);
	return Math.abs(offsetSeconds) > REAL_API_CLOCK_SKEW_ABORT_THRESHOLD_SECONDS ? offsetSeconds : null;
}

export class http_api {
	adapter: Roborock;
	loginApi: AxiosInstance | null = null;
	realApi: AxiosInstance | null = null;
	userData: UserData | null = null;
	homeData: HomeData | null = null;
	homeID: number | null = null;
	public productInfo: ProductV5Response | null = null;
	private appPluginProductRoles: readonly ApkProductRoleDefinition[] = [];

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
		const regionConfig = REGION_CONFIG[region] || REGION_CONFIG["eu"];

		this.adapter.rLog("HTTP", null, "Info", "Cloud", undefined, `Initializing HTTP API with region: ${region} (${regionConfig.apiBaseUrl})`, "info");

		this.loginApi = axios.create({
			baseURL: regionConfig.apiBaseUrl,
			headers: {
				header_clientid: crypto.createHash("md5").update(this.adapter.config.username).update(clientID).digest().toString("base64"),
				header_appversion: "4.57.02",
				header_clientlang: "de",
				header_phonemodel: "Pixel 9 Pro XL",
				header_phonesystem: "Android",
			},
		});

		// Attempt to restore session
		await this.loadUserData();

		await this.initializeRealApi();

		try {
			await this.getHomeID();
		} catch (e: unknown) {
			const msg = this.adapter.errorMessage(e);
			if (msg && (msg.includes("invalid token") || msg.includes("auth_failed"))) {
				this.adapter.rLog("HTTP", null, "Warn", "Cloud", undefined, "Token expired or invalid. Clearing session and re-authenticating...", "warn");

				// Clear bad data
				this.userData = null;
				this.homeID = null;
				await this.adapter.setState("UserData", { val: "", ack: true });

				// Re-initialize (will force fresh login because userData is null)
				await this.initializeRealApi();
				await this.getHomeID();
			} else {
				throw e; // Rethrow other errors
			}
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

	private getRealApiClockSkewError(error: unknown): Error | null {
		const offsetSeconds = getRealApiClockSkewSeconds(error);
		if (offsetSeconds === null) return null;

		const direction = offsetSeconds > 0 ? "ahead of" : "behind";
		return new Error(`Roborock Real API rejected the signed request and the server timestamp is ${Math.abs(offsetSeconds)}s ${direction} the local clock. Refusing to start because the ioBroker host clock appears to be wrong. Please fix NTP/time synchronization and restart the adapter.`);
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

		// ProductRepository.refreshProduct() in the APK refreshes this account
		// cache before AppPlugins query RRPluginSDK.getUserRole(). A failure leaves
		// the local cache unchanged and must not make the normal adapter unusable.
		try {
			await this.refreshAppPluginProductRoles();
		} catch (error) {
			this.adapter.rLog(
				"HTTP",
				null,
				"Warn",
				"Cloud",
				undefined,
				`Failed to refresh AppPlugin product roles: ${this.adapter.errorMessage(error)}`,
				"warn",
			);
		}

		try {
			const rriot = this.get_rriot();

			// Initialize the real API with Hawk Authentication Interceptor
			const realApi = axios.create({
				baseURL: this.userData.rriot.r.a,
				headers: {
					"x-iotsdk-version": "1.0.1",
					"x-app-name": "com.roborock.smart",
					"x-app-version-code": "100834",
					"x-app-version-name": "4.57.02",
					"x-uid": this.userData.rriot.u,
					"User-Agent": "UA=RRSDKAndroid/1.0.1",
				},
			});

			realApi.interceptors.request.use((config: InternalAxiosRequestConfig) => {
				const timestamp = Math.floor(Date.now() / 1000);
				const nonce = crypto
					.randomBytes(6)
					.toString("base64")
					.substring(0, 6)
					.replace(/[+/]/g, (m) => (m === "+" ? "X" : "Y"));

				// Calculate signature
				let urlPath = "";
				if (config.url) {
					// Handle relative URLs correctly by creating a dummy base if needed
					// or using the instance's baseURL if config.url is relative
					const fullUrl = axios.getUri(config);
					try {
						// Provide a dummy base to handle relative URLs returned by getUri
						const urlObj = new URL(fullUrl, "http://dummy");
						urlPath = urlObj.pathname + urlObj.search;
					} catch {
						// Fallback if URL construction fails
						urlPath = config.url || "";
					}
				}

				const prestr = [rriot.u, rriot.s, nonce, timestamp, md5hex(urlPath), "", ""].join(":");
				const mac = crypto.createHmac("sha256", rriot.h).update(prestr).digest("base64");

				config.headers["Authorization"] = `Hawk id="${rriot.u}", s="${rriot.s}", ts="${timestamp}", nonce="${nonce}", mac="${mac}"`;

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
			const params = new URLSearchParams();
			params.append("type", "login");
			params.append("email", username);
			params.append("platform", "");

			const res = await this.loginApi.post(API_V4_EMAIL_CODE, params.toString());

			if (res.data && res.data.code != 200) {
				throw new Error(`Start 2FA failed: ${res.data.msg} (Code: ${res.data.code})`);
			}
		} catch (error: unknown) {
			const err = error as { response?: { data?: unknown } };
			if (err?.response?.data !== undefined) {
				this.adapter.rLog("HTTP", null, "Error", "Cloud", undefined, `Request email code failed with response: ${JSON.stringify(err.response.data)}`, "error");
			}
			throw error; // Re-throw exact error to be caught by caller
		}
	}

	async signRequest(s: string): Promise<{ k: string } | null> {
		if (!this.loginApi) return null;

		try {
			const res = await this.loginApi.post(`${API_V3_SIGN}?s=${s}`);
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
			// content-type application/x-www-form-urlencoded is default for axios with URLSearchParams
		};

		const region = this.adapter.config.region || "eu";
		const regionConfig = REGION_CONFIG[region] || REGION_CONFIG["eu"];

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

	/** Refreshes the APK product repository's account-role cache once. */
	async refreshAppPluginProductRoles(): Promise<void> {
		if (!this.loginApi) throw new Error("loginApi is not initialized.");
		this.appPluginProductRoles = await loadApkProductRoleDefinitions(this.loginApi);
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
			const response = await this.loginApi.get("api/v1/getHomeDetail");
			if (response.data.data) {
				this.adapter.rLog("HTTP", null, "Debug", "Cloud", undefined, `getHomeDetail: ${JSON.stringify(response.data)}`, "debug");
				this.homeID = response.data.data.rrHomeId;
				this.adapter.rLog("HTTP", null, "Debug", "Cloud", undefined, `this.homeID: ${this.homeID}`, "debug");
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
	 * Uses GET v3/user/homes/{homeID} only (same as Roborock app).
	 */
	async updateHomeData(): Promise<void> {
		if (!this.loginApi) throw new Error("loginApi is not initialized. Call init() first.");
		if (!this.realApi) throw new Error("realApi is not initialized. Call initializeRealApi() first");

		if (this.homeID) {
			try {
				const res = await this.realApi.get<{ success?: boolean; result?: { id: number; products?: Product[]; devices?: Device[]; receivedDevices?: Device[]; rooms?: Room[] } }>(`v3/user/homes/${this.homeID}`);

				if (res.data?.success && res.data?.result) {
					const result = res.data.result;
					this.homeData = {
						rrHomeId: result.id,
						products: result.products || [],
						devices: result.devices || [],
						receivedDevices: result.receivedDevices || [],
						rooms: result.rooms || []
					};
					this.adapter.rLog("HTTP", null, "<-", "Cloud", undefined, `HomeData updated (HomeID: ${this.homeID}, Devices: ${this.homeData.devices?.length}, Received: ${this.homeData.receivedDevices?.length})`, "debug");
				} else {
					this.homeData = null;
					this.adapter.rLog("HTTP", null, "Warn", "Cloud", undefined, "V3 HomeData response missing or not success.", "warn");
				}

				await this.adapter.setState("HomeData", { val: JSON.stringify(this.homeData), ack: true });
			} catch (e: unknown) {
				const clockSkewError = this.getRealApiClockSkewError(e);
				if (clockSkewError) {
					this.adapter.rLog("HTTP", null, "Error", "Cloud", undefined, clockSkewError.message, "error");
					this.homeData = null;
					throw clockSkewError;
				}

				this.adapter.rLog("HTTP", null, "Error", "Cloud", undefined, `Error updating HomeData: ${this.adapter.errorStack(e)}`, "error");
				this.homeData = null;
			}
		} else {
			this.adapter.rLog("HTTP", null, "Error", "Cloud", undefined, `No homeId found`, "error");
		}
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
	 * Executes a scene via the same cloud scene endpoint used by the official app.
	 */
	async executeScene(sceneId: string | number): Promise<unknown> {
		if (!this.loginApi) throw new Error("loginApi is not initialized.");
		if (!this.realApi) throw new Error("realApi is not initialized.");

		return await this.realApi.post(`user/scene/${sceneId}/execute`).then((res) => res.data);
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
	 * Builds the APK-compatible raw RRDevicesModule context in memory.
	 *
	 * This data may contain device credentials. Callers must not log it or write
	 * it to persistent adapter states, documentation, or repository fixtures.
	 */
	getAppPluginHomeDataContext(): ApkAppPluginHomeDataContext | undefined {
		return createApkAppPluginHomeDataContext(this.homeData, this.productInfo);
	}

	/**
	 * Returns the non-secret ProductLocalSource input for an AppPlugin session.
	 * The returned graph is detached so a bundle cannot mutate the account cache.
	 */
	getAppPluginProductRepositoryContext(): ApkAppPluginProductRepositoryContext {
		return {
			userRoles: structuredClone(this.appPluginProductRoles),
		};
	}

	/**
	 * Returns the complete signed-in APK bootstrap context without persisting or
	 * logging its raw device JSON.
	 */
	getAppPluginCloudBootstrapContext(): ApkAppPluginCloudBootstrapContext | undefined {
		return createApkAppPluginCloudBootstrapContext(
			this.homeData,
			this.productInfo,
			this.userData,
		);
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
