import { Roborock } from "../main";
import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from "axios";
import * as crypto from "crypto";
import { ProductV5Response, LoginV4Response } from "./apiTypes";

// Constants
const API_BASE_URL = "https://euiot.roborock.com";
const API_V3_SIGN = "api/v3/key/sign";
const API_V4_LOGIN_CODE = "api/v4/auth/email/login/code";
const API_V4_EMAIL_CODE = "api/v4/email/code/send";
const API_V5_PRODUCT = "api/v5/product";

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
	 * Initializes the Login API and attempts to set up the Real API.
	 * @param clientID The client identifier.
	 */
	async init(clientID: string): Promise<void> {
		// Initialize the login API (needed to get access to the real API)
		this.loginApi = axios.create({
			baseURL: API_BASE_URL,
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
		await this.getHomeID();
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
					this.adapter.log.info("Restored persisted UserData.");
				}
			}
		} catch (e) {
			this.adapter.log.debug(`No previous UserData found or invalid.`);
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
		this.adapter.log.debug(`initialize http_api`);

		if (!this.loginApi) {
			throw new Error("loginApi is not initialized. Call init() first.");
		}
		if (!this.userData) {
			try {
				this.adapter.log.info("Starting Direct 2FA Login Flow...");

				// 1. Request Email Code
				await this.requestEmailCode(this.adapter.config.username);

				this.adapter.log.error("********************************************************************************");
				this.adapter.log.error("ATTENTION: 2FA Code required!");
				this.adapter.log.error(`An email has been sent to ${this.adapter.config.username}.`);
				this.adapter.log.error("Please enter the 6-digit code into the state 'roborock.0.loginCode' immediately.");
				this.adapter.log.error("********************************************************************************");

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

				this.adapter.log.info(`Got 2FA code: ${code}`);
				await this.adapter.unsubscribeStatesAsync(stateId);

				// 3. Sign Request (Get K)
				// Use a random 16-char string for 's' (nonce/salt)
				const s = crypto.randomBytes(12).toString("base64").substring(0, 16).replace(/\+/g, "X").replace(/\//g, "Y");
				const signData = await this.signRequest(s);
				if (!signData) throw new Error("Failed to obtain signature key k");

				// 4. Login with Code
				const loginResult = await this.loginWithCode(code, signData.k, s);

				if (loginResult.code === 200) {
					this.userData = loginResult.data!; // data IS UserData
					await this.adapter.setState(stateId, { val: "", ack: true });
				} else {
					throw new Error(`Login with code failed: ${JSON.stringify(loginResult)}`);
				}

				if (!this.userData) {
					throw new Error("Login returned empty userdata.");
				}

				await this.adapter.setState("UserData", { val: JSON.stringify(this.userData), ack: true });

				// Load product definitions (V5 API)
				try {
					this.productInfo = await this.getProductInfoV5();
					if (this.productInfo) {
						this.adapter.log.info(`Files downloaded: ${this.productInfo.data.productList.length} products found.`);
						await this.adapter.setState("info.productInfo", { val: JSON.stringify(this.productInfo), ack: true });
					}
				} catch (err) {
					this.adapter.log.warn(`Failed to get product info V5: ${err}`);
				}

			} catch (error: any) {
				this.adapter.log.error(`Error in initializeRealApi: ${error.message}`);
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
						urlPath = new URL(fullUrl).pathname;
					} catch {
						// Fallback if URL construction fails
						urlPath = config.url;
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
			this.adapter.log.error(`Error in initializeRealApi: ${error.stack}`);
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
				this.adapter.log.error(`Request email code failed with response: ${JSON.stringify(error.response.data)}`);
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
			this.adapter.log.error(`SignRequest failed: ${e.message}`);
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

		const params = new URLSearchParams({
			country: "DE", // Hardcoding for now based on dump - User verified success with these params
			countryCode: "49",
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

	async getProductInfoV5(): Promise<ProductV5Response | null> {
		if (!this.loginApi) return null;

		try {
			const res = await this.loginApi.get(API_V5_PRODUCT);
			if (res.data && res.data.data) {
				return res.data;
			}
			return null;
		} catch (e: any) {
			this.adapter.log.warn(`getProductInfoV5 failed: ${e.message}`);
			return null;
		}
	}

	async downloadProductImages() {
		if (!this.adapter.config.downloadRoborockImages) return;
		if (!this.productInfo?.data?.productList) return;

		for (const p of this.productInfo.data.productList) {
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
						await this.adapter.setStateAsync(stateId, { val: base64, ack: true });
					}
				} catch (e) {
					this.adapter.log.warn(`Failed to download image for ${p.model}: ${e}`);
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
				this.adapter.log.debug(`getHomeDetail: ${JSON.stringify(response.data)}`);
				this.homeID = response.data.data.rrHomeId;
				this.adapter.log.debug(`this.homeID: ${this.homeID}`);
			} else {
				this.adapter.log.error(`failed to get getHomeDetail: ${response.data.msg}`);
			}
		} catch (error: any) {
			this.adapter.log.error(`Error getting HomeID: ${error.message}`);
		}
	}

	/**
	 * Downloads the latest Home Data (Devices, Rooms, Products) and stores it in state.
	 */
	async updateHomeData(): Promise<void> {
		if (!this.loginApi) throw new Error("loginApi is not initialized. Call init() first.");
		if (!this.realApi) throw new Error("realApi is not initialized. Call initializeRealApi() first");

		if (this.homeID) {
			this.adapter.log.debug(`Getting HomeData with homeId: ${this.homeID}`);
			try {
				const res = await this.realApi.get(`v2/user/homes/${this.homeID}`);
				this.homeData = res.data.result;

				await this.adapter.setState("HomeData", { val: JSON.stringify(this.homeData), ack: true });
			} catch (e: any) {
				this.adapter.log.error(`Error updating HomeData: ${e?.stack || e}`);
				this.homeData = null;
			}
		} else {
			this.adapter.log.error(`No homeId found`);
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
			this.adapter.log.debug(`[HTTP_API|${duid}] Stored FW features result: ${JSON.stringify(featureIds)}`);
		} else {
			this.adapter.log.warn(`[HTTP_API|${duid}] Invalid data received for storing FW features: ${JSON.stringify(featureIds)}`);
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
		if (!this.homeData) {
			throw new Error("this.homeData is not initialized. Initialize via updateHomeData() first");
		}
		return this.homeData.products;
	}

	/**
	 * Returns a combined list of owned and shared devices.
	 */
	getDevices(): Device[] {
		if (!this.homeData) {
			this.adapter.log.warn("homeData not initialized, returning empty devices list");
			return [];
		}
		return [...(this.homeData.devices || []), ...(this.homeData.receivedDevices || [])];
	}

	getReceivedDevices(): Device[] {
		if (!this.homeData) {
			throw new Error("this.homeData is not initialized. Initialize via updateHomeData() first");
		}
		return this.homeData.receivedDevices;
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
			this.adapter.log.warn("getMatchedRoomIDs: this.homeData.rooms is missing or invalid.");
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
			this.adapter.log.info(`Matched ${matchedRooms.length} rooms (fallback names included)`);
		}

		return matchedRooms;
	}

	/**
	 * Maps all devices to their local keys.
	 */
	getMatchedLocalKeys(): Map<string, string> {
		if (!this.homeData) {
			throw new Error("this.homeData is not initialized. Initialize via updateHomeData() first");
		}

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
				this.adapter.log.error(`device ${duid} not found in devices`);
				return null;
			}

			const product = products.find((p) => p.id === device.productId);
			return product ? product.model : null;
		} catch (error: any) {
			this.adapter.log.error(`Error in getRobotModel: ${error.message}`);
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
			this.adapter.log.error(`Error in getProductCategory: ${error.message}`);
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
