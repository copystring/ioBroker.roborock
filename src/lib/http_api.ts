// credits to rovo89
// taken from here https://gist.github.com/rovo89/dff47ed19fca0dfdda77503e66c2b7c7

import { Roborock } from "../main";

import axios from "axios";
import crypto from "crypto";

const API_BASE_URL = "https://euiot.roborock.com";
const API_LOGIN_ENDPOINT = "api/v1/login";

export class http_api {
	adapter: Roborock;
	loginApi: any;
	realApi: any;
	userData: any;
	homeData: any;
	homeID: string | null;

	constructor(adapter) {
		this.adapter = adapter;

		this.loginApi = null;
		this.userData = null;
		this.homeData = null;
		this.homeID = null;
	}

	/**
	 * @param {string} clientID
	 */
	async init(clientID) {
		// Initialize the login API (which is needed to get access to the real API).
		this.loginApi = axios.create({
			baseURL: API_BASE_URL,
			headers: {
				header_clientid: crypto.createHash("md5").update(this.adapter.config.username).update(clientID).digest().toString("base64"),
			},
		});
		// api/v1/getUrlByEmail(email = ...)

		await this.initializeRealApi();
		await this.getHomeID();
	}

	async initializeRealApi() {
		this.adapter.log.debug(`initialize http_api`);

		if (!this.loginApi) {
			throw new Error("loginApi is not initialized. Call init() first.");
		}

		// Try to load existing userdata.
		const storedUserData = await this.adapter.getState("UserData");
		if (storedUserData && storedUserData.val) {
			this.userData = await JSON.parse(storedUserData.val);
		} else {
			try {
				// Log in.
				this.userData = await this.loginApi
					.post(
						API_LOGIN_ENDPOINT,
						new URLSearchParams({ username: this.adapter.config.username, password: this.adapter.config.password, needtwostepauth: "false" }).toString()
					)
					.then((res) => res.data.data);

				// Alternative without password:
				// await loginApi.post('api/v1/sendEmailCode', new url.URLSearchParams({username: username, type: 'auth'}).toString()).then(res => res.data);
				// // ... get code from user ...
				// userdata = await loginApi.post('api/v1/loginWithCode', new url.URLSearchParams({username: username, verifycode: code, verifycodetype: 'AUTH_EMAIL_CODE'}).toString()).then(res => res.data.data);

				if (!this.userData) {
					throw new Error("Login returned empty userdata.");
				}

				await this.adapter.setState("UserData", { val: JSON.stringify(this.userData), ack: true });
			} catch (error) {
				this.adapter.log.error(`Error in getUserData: ${error.message}. This is most likely due to too many reconnects. Emptying UserData & HomeData`);

				await this.adapter.setState("HomeData", { val: null, ack: true });
				await this.adapter.setState("UserData", { val: null, ack: true });

				this.adapter.log.error(error.stack);
			}
		}

		if (!this.userData.token) throw new Error("Failed to retrieve user token. Check login credentials.");
		this.loginApi.defaults.headers.common["Authorization"] = this.userData.token;

		try {
			const rriot = this.get_rriot();

			// Initialize the real API.
			const realApi = axios.create({ baseURL: this.userData.rriot.r.a });
			realApi.interceptors.request.use((config) => {
				const timestamp = Math.floor(Date.now() / 1000);
				const nonce = crypto
					.randomBytes(6)
					.toString("base64")
					.substring(0, 6)
					.replace(/[+/]/g, (m) => (m === "+" ? "X" : "Y"));
				const urlPath = realApi ? new URL(realApi.getUri(config)).pathname : "";
				const prestr = [rriot.u, rriot.s, nonce, timestamp, md5hex(urlPath), "", ""].join(":");
				const mac = crypto.createHmac("sha256", rriot.h).update(prestr).digest("base64");

				config.headers["Authorization"] = `Hawk id="${rriot.u}", s="${rriot.s}", ts="${timestamp}", nonce="${nonce}", mac="${mac}"`;

				return config;
			});
			this.realApi = realApi;

			await this.adapter.setState("info.connection", { val: true, ack: true });
		} catch (error) {
			this.adapter.log.error(`Error in initializeRealApi: ${error.stack}`);
			await this.adapter.setState("info.connection", { val: false, ack: true });
		}
	}

	async getHomeID() {
		if (!this.loginApi) {
			throw new Error("loginApi is not initialized. Call init() first.");
		}

		const response = await this.loginApi.get("api/v1/getHomeDetail");
		if (response.data.data) {
			this.adapter.log.debug(`getHomeDetail: ${JSON.stringify(response.data)}`);
			this.homeID = response.data.data.rrHomeId;
			this.adapter.log.debug(`this.homeID: ${this.homeID}`);
		} else {
			this.adapter.log.error(`failed to get getHomeDetail: ${response.data.msg}`);
		}
	}

	async updateHomeData() {
		if (!this.loginApi) {
			throw new Error("loginApi is not initialized. Call init() first.");
		}
		if (!this.realApi) {
			throw new Error("realApi is not initialized. Call initializeRealApi() first");
		}

		if (this.homeID) {
			this.adapter.log.debug(`Getting HomeData with homeId: ${this.homeID}`);
			this.homeData = await this.realApi
				.get(`v2/user/homes/${this.homeID}`)
				.then((res) => res.data.result)
				.catch((e) => {
					this.adapter.log.error(`Error: ${e?.stack || e}`);
					return null;
				});

			await this.adapter.setState("HomeData", { val: JSON.stringify(this.homeData), ack: true });
		} else {
			this.adapter.log.error(`No homeId found`);
		}
	}

	get_rriot() {
		if (!this.userData) {
			throw new Error("this.userData is not initialized. Call updateHomeData() first");
		}
		return this.userData.rriot;
	}

	async getScenes() {
		if (!this.loginApi) {
			throw new Error("loginApi is not initialized. Call init() first.");
		}
		if (!this.realApi) {
			throw new Error("realApi is not initialized. Call initializeRealApi() first");
		}

		return await this.realApi.get(`user/scene/home/${this.homeID}`).then((res) => res.data);
	}

	async executeScene(sceneID) {
		if (!this.realApi) {
			throw new Error("realApi is not initialized. Call initializeRealApi() first");
		}

		await this.realApi.post(`user/scene/${sceneID.val}/execute`);
	}

	/**
	 * @param {string} duid
	 */
	async getFirmwareStates(duid) {
		try {
			if (!this.realApi) {
				throw new Error("realApi is not initialized. Call initializeRealApi() first");
			}

			return await this.realApi.get(`ota/firmware/${duid}/updatev2`);
		} catch (error) {
			throw new Error(`Error in getFirmwareStates: ${error.message}`);
		}
	}

	getProducts() {
		if (!this.homeData) {
			throw new Error("this.homeData is not initialized. Initialize via updateHomeData() first");
		}

		return this.homeData.products;
	}

	getDevices() {
		if (!this.homeData) {
			this.adapter.log.warn("homeData not initialized, returning empty devices list");
			return [];
		}
		return [...(this.homeData.devices || []), ...(this.homeData.receivedDevices || [])];
	}

	getReceivedDevices() {
		if (!this.homeData) {
			throw new Error("this.homeData is not initialized. Initialize via updateHomeData() first");
		}

		return this.homeData.receivedDevices;
	}

	isSharedDevice(duid) {
		const reactedDevices = this.getReceivedDevices();
		return reactedDevices.some((device) => device.duid === duid);
	}

	getMatchedRoomIDs(assignFallbackNames = false) {
		if (!this.homeData || !Array.isArray(this.homeData.rooms)) {
			throw new Error("this.homeData.rooms is not initialized. Call updateHomeData() first.");
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

		// Optional: only log in fallback mode
		if (assignFallbackNames) {
			this.adapter.log.info(`Matched ${matchedRooms.length} rooms (fallback names included)`);
		}

		return matchedRooms;
	}

	getMatchedLocalKeys() {
		if (!this.homeData) {
			throw new Error("this.homeData is not initialized. Initialize via updateHomeData() first");
		}

		const devices = this.getDevices();
		return new Map(devices.map((device) => [device.duid, device.localKey]));
	}

	/**
	 * @param {string} duid
	 * @returns {string|null}
	 */
	getRobotModel(duid) {
		if (!duid) {
			throw new Error("Parameter duid missing in function getRobotModel");
		}

		const devices = this.getDevices();
		try {
			const products = this.getProducts();

			const device = devices.find((device) => device.duid === duid);
			if (!device) {
				this.adapter.log.error(`device ${duid} not found in devices`);
				return null;
			}

			const product = products.find((product) => product.id === device.productId);
			return product ? product.model : null;
		} catch (error) {
			this.adapter.log.error(`Error in getRobotModel: ${error.message}`);
			return null;
		}
	}

	/**
	 * @param {string} duid
	 */
	getProductCategory(duid) {
		const devices = this.getDevices();
		try {
			const products = this.getProducts();

		const productID = devices.find((device) => device.duid == duid).productId;
		const product = products.find((product) => product.id == productID);

			return product ? product.category : null;
		} catch (error) {
			this.adapter.log.error(`Error in getProductCategory: ${error.message}`);
			return null;
		}
	}

	/**
	 * @param {string} duid
	 */
	getFeatureSet(duid) {
		const devices = this.getDevices();

		return devices.find((device) => device.duid == duid).featureSet;
	}

	/**
	 * @param {string} duid
	 */
	getNewFeatureSet(duid) {
		const devices = this.getDevices();

		return devices.find((device) => device.duid == duid).newFeatureSet;
	}
}

function md5hex(str) {
	return crypto.createHash("md5").update(str).digest("hex");
}
