import { Roborock } from "../main";
import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from "axios";
import crypto from "crypto";

// Credits to rovo89 for the initial reverse engineering
// https://gist.github.com/rovo89/dff47ed19fca0dfdda77503e66c2b7c7

const API_BASE_URL = "https://euiot.roborock.com";
const API_LOGIN_ENDPOINT = "api/v1/login";

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
	// ... other potential user fields
}

interface Device {
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
	loginApi: AxiosInstance | null;
	realApi: AxiosInstance | null;
	userData: UserData | null;
	homeData: HomeData | null;
	homeID: string | null;

	private fwFeaturesCache = new Map<string, number[]>();

	constructor(adapter: Roborock) {
		this.adapter = adapter;

		this.loginApi = null;
		this.realApi = null;
		this.userData = null;
		this.homeData = null;
		this.homeID = null;
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
			},
		});

		await this.initializeRealApi();
		await this.getHomeID();
	}

	/**
	 * Logs in (if necessary) and sets up the authenticated "Real API" with Hawk authentication.
	 */
	async initializeRealApi(): Promise<void> {
		this.adapter.log.debug(`initialize http_api`);

		if (!this.loginApi) {
			throw new Error("loginApi is not initialized. Call init() first.");
		}

		// 1. Try to load existing userdata from ioBroker state
		const storedUserData = await this.adapter.getStateAsync("UserData");
		if (storedUserData && storedUserData.val && typeof storedUserData.val === "string") {
			try {
				this.userData = JSON.parse(storedUserData.val);
			} catch (e) {
				this.adapter.log.warn("Failed to parse stored UserData, will re-login.");
				this.userData = null;
			}
		}

		// 2. If no valid userdata, perform login
		if (!this.userData) {
			try {
				this.userData = await this.loginApi
					.post(
						API_LOGIN_ENDPOINT,
						new URLSearchParams({
							username: this.adapter.config.username,
							password: this.adapter.config.password,
							needtwostepauth: "false",
						}).toString()
					)
					.then((res) => res.data.data);

				if (!this.userData) {
					throw new Error("Login returned empty userdata.");
				}

				await this.adapter.setState("UserData", { val: JSON.stringify(this.userData), ack: true });
			} catch (error: any) {
				this.adapter.log.error(`Error in getUserData: ${error.message}. This is most likely due to too many reconnects. Emptying UserData & HomeData`);

				await this.adapter.setState("HomeData", { val: null, ack: true });
				await this.adapter.setState("UserData", { val: null, ack: true });

				// Rethrow or handle gracefully? Rethrowing to stop init.
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
