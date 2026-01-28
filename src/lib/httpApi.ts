import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import axios from "axios";
import * as crypto from "crypto";
import { Roborock } from "../main";
import { LoginV4Response, ProductV5Response } from "./apiTypes";
import { cryptoEngine } from "./cryptoEngine";

// Constants
const API_V3_SIGN = "api/v3/key/sign";
const API_V4_LOGIN_CODE = "api/v4/auth/email/login/code";
const API_V4_LOGIN_PASSWORD = "api/v4/auth/email/login/pwd";
const API_V4_EMAIL_CODE = "api/v4/email/code/send";
const API_V5_PRODUCT = "api/v5/product";

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
		apiBaseUrl: "https://api.roborock.com", // Fallback/General based on bundle analysis
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
}

export interface Device {
	duid: string;
	localKey: string;
	productId: string;
	name?: string;
	featureSet?: number;
	newFeatureSet?: string;
	online: boolean;
	deviceStatus: any;
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

export class http_api {
	adapter: Roborock;
	loginApi: AxiosInstance | null = null;
	realApi: AxiosInstance | null = null;
	userData: UserData | null = null;
	homeData: HomeData | null = null;
	homeID: number | null = null;
	public productInfo: ProductV5Response | null = null;

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
				header_appversion: "4.54.02",
				header_clientlang: "de",  // Assuming DE based on dump, or use adapter.config.language/system lang
				header_phonemodel: "Pixel 9 Pro XL", // Using dump value to mimic real device
				header_phonesystem: "Android",
			},
		});

		// Attempt to restore session
		await this.loadUserData();

		await this.initializeRealApi();

		try {
			await this.getHomeID();
		} catch (e: any) {
			if (e.message && (e.message.includes("invalid token") || e.message.includes("auth_failed"))) {
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
					} catch (e: any) {
						this.adapter.rLog("HTTP", null, "Error", "Cloud", undefined, `Password login error: ${e.message}`, "error");
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
					try {
						code = await new Promise<string>((resolve, reject) => {
							this.loginCodeResolver = resolve;
							// Timeout after 15 minutes
							setTimeout(() => {
								if (this.loginCodeResolver) {
									this.loginCodeResolver = null;
									reject(new Error("Timeout waiting for 2FA code"));
								}
							}, 15 * 60 * 1000); // 15 min
						});
					} catch (e: any) {
						throw e;
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

			} catch (error: any) {
				this.adapter.rLog("HTTP", null, "Error", "Cloud", undefined, `Error in initializeRealApi: ${error.message}`, "error");
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

			// Initialize the real API with Hawk Authentication Interceptor
			const realApi = axios.create({ baseURL: this.userData.rriot.r.a });

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
		} catch (error: any) {
			this.adapter.rLog("HTTP", null, "Error", "Cloud", undefined, `Error in initializeRealApi: ${error.stack}`, "error");
			await this.adapter.setState("info.connection", { val: false, ack: true });
		}
	}

	async requestEmailCode(username: string): Promise<void> {
		if (!this.loginApi) throw new Error("loginApi is not initialized.");

		try {
			// Match user dump: type=login&email=...&platform=
			const params = new URLSearchParams();
			params.append("type", "login");
			params.append("email", username);
			params.append("platform", ""); // empty in dump

			const res = await this.loginApi.post(API_V4_EMAIL_CODE, params.toString());

			if (res.data && res.data.code != 200) {
				throw new Error(`Start 2FA failed: ${res.data.msg} (Code: ${res.data.code})`);
			}
		} catch (error: any) {
			if (error.response && error.response.data) {
				this.adapter.rLog("HTTP", null, "Error", "Cloud", undefined, `Request email code failed with response: ${JSON.stringify(error.response.data)}`, "error");
			}
			throw error; // Re-throw exact error to be caught by caller
		}
	}

	async signRequest(s: string): Promise<{ k: string } | null> {
		if (!this.loginApi) return null;

		try {
			// Dump shows POST to sign endpoint without body, params in URL.
			// axios.post(url) works.
			const res = await this.loginApi.post(`${API_V3_SIGN}?s=${s}`);
			return res.data.data;
		} catch (e: any) {
			this.adapter.rLog("HTTP", null, "Error", "Cloud", undefined, `SignRequest failed: ${e.message}`, "error");
			return null;
		}
	}

	async loginWithCode(code: string, k: string, s: string): Promise<LoginV4Response> {
		if (!this.loginApi) throw new Error("loginApi not initialized");

		// Dump shows x-mercy headers and specific body
		// NO HMAC 'h' in body shown in dump for this request!
		// Headers: x-mercy-k, x-mercy-ks

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
			majorVersion: "14", // from dump
			minorVersion: "0"   // from dump
		});

		try {
			const res = await this.loginApi.post(API_V4_LOGIN_CODE, params.toString(), { headers });
			return res.data;
		} catch (e: any) {
			throw new Error(`Login with code failed: ${e.message}`);
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
		} catch (e: any) {
			if (e.response && e.response.data) {
				const errData = e.response.data;
				this.adapter.rLog("HTTP", null, "<-", "Cloud", undefined, `Login Failed. Code: ${errData.code}, Msg: ${errData.msg}`, "error");
				return errData;
			}
			throw new Error(`Login with password failed: ${e.message}`);
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
		} catch (e: any) {
			this.adapter.rLog("HTTP", null, "Warn", "Cloud", undefined, `getProductInfoV5 failed: ${e.message}`, "warn");
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
		} catch (error: any) {
			this.adapter.rLog("HTTP", null, "Error", "Cloud", undefined, `Error getting HomeID: ${error.message}`, "error");
			throw error;
		}
	}

	/**
	 * Downloads the latest Home Data (Devices, Rooms, Products) and stores it in state.
	 */
	async updateHomeData(): Promise<void> {
		if (!this.loginApi) throw new Error("loginApi is not initialized. Call init() first.");
		if (!this.realApi) throw new Error("realApi is not initialized. Call initializeRealApi() first");

		if (this.homeID) {
			try {
				// Fetch home details from V2 API
				const resV2 = await this.realApi.get(`v2/user/homes/${this.homeID}`);
				this.homeData = resV2.data.result;

				// Fetch home details from V3 API
				try {
					const resV3 = await this.realApi.get(`v3/user/homes/${this.homeID}`);

					if (resV3.data.success && resV3.data.result) {
						const v3Data = resV3.data.result as HomeData;

						// Merge arrays ensuring unique items by key
						const mergeUnique = (priority: any[], secondary: any[], key: string) => {
							const initial = priority || [];
							const additional = secondary || [];
							const map = new Map(initial.map((item) => [item[key], item]));

							for (const item of additional) {
								if (!map.has(item[key])) {
									map.set(item[key], item);
								}
							}
							return Array.from(map.values());
						};

						if (this.homeData) {
							// Pass v3Data first so it takes precedence
							this.homeData.devices = mergeUnique(v3Data.devices, this.homeData.devices, "duid");
							this.homeData.receivedDevices = mergeUnique(v3Data.receivedDevices, this.homeData.receivedDevices, "duid");
							this.homeData.products = mergeUnique(v3Data.products, this.homeData.products, "id");
							this.homeData.rooms = mergeUnique(v3Data.rooms, this.homeData.rooms, "id");
						} else {
							this.homeData = v3Data;
						}
					}
				} catch (e3: any) {
					// V3 might fail on older accounts/regions? Log debug but don't crash main init.
					this.adapter.rLog("HTTP", null, "Warn", "Cloud", undefined, `Failed to fetch V3 HomeData (optional): ${e3.message}`, "warn");
				}

				this.adapter.rLog("HTTP", null, "<-", "Cloud", undefined, `HomeData updated (HomeID: ${this.homeID}, Devices: ${this.homeData?.devices?.length})`, "debug");

				await this.adapter.setState("HomeData", { val: JSON.stringify(this.homeData), ack: true });
			} catch (e: any) {
				this.adapter.rLog("HTTP", null, "Error", "Cloud", undefined, `Error updating HomeData: ${e?.stack || e}`, "error");
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
	async getScenes(): Promise<any> {
		if (!this.loginApi) throw new Error("loginApi is not initialized.");
		if (!this.realApi) throw new Error("realApi is not initialized.");

		return await this.realApi.get(`user/scene/home/${this.homeID}`).then((res) => res.data);
	}

	/**
	 * Executes a specific scene.
	 */
	async executeScene(sceneID: { val: string | number }): Promise<void> {
		if (!this.realApi) throw new Error("realApi is not initialized.");

		await this.realApi.post(`user/scene/${sceneID.val}/execute`);
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
		} catch (error: any) {
			throw new Error(`Error in getFirmwareStates: ${error.message}`);
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
	 */
	getDevices(): Device[] {
		if (!this.homeData) {
			this.adapter.rLog("HTTP", null, "Warn", "Cloud", undefined, "homeData not initialized, returning empty devices list", "warn");
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
		if (!this.homeData) return new Map();

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
		} catch (error: any) {
			this.adapter.rLog("HTTP", duid, "Error", "Cloud", undefined, `Error in getRobotModel: ${error.message}`, "error");
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
		} catch (error: any) {
			this.adapter.rLog("HTTP", duid, "Error", "Cloud", undefined, `Error in getProductCategory: ${error.message}`, "error");
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
