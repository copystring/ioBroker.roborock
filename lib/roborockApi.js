// credits to rovo89
// taken from here https://gist.github.com/rovo89/dff47ed19fca0dfdda77503e66c2b7c7

"use strict";

const axios = require("axios");
const crypto = require("crypto");

const API_BASE_URL = "https://euiot.roborock.com";
const API_LOGIN_ENDPOINT = "api/v1/login";

class roborockApi {
	constructor(adapter) {
		this.adapter = adapter;

		this.loginApi = null;
		this.userData = null;
		this.homeData = null;
	}

	async init() {
		// Fetch clientID from the state
		const clientIDState = await this.adapter.getStateAsync("clientID");
		this.clientID = clientIDState ? clientIDState.val : null;

		if (!this.clientID) {
			throw new Error("clientID is not defined. Ensure it is set in main.js during adapter startup.");
		}

		// Initialize the login API (which is needed to get access to the real API).
		this.loginApi = axios.create({
			baseURL: API_BASE_URL,
			headers: {
				header_clientid: crypto.createHash("md5").update(this.adapter.config.username).update(this.clientID).digest().toString("base64"),
			},
		});
		// api/v1/getUrlByEmail(email = ...)
	}

	async initializeRealApi() {
		this.adapter.log.debug(`initializeRoborockApi`);

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

				await this.adapter.setState("HomeData", { val: null, ack: true});
				await this.adapter.setState("UserData", { val: null, ack: true});

				this.adapter.catchError(error.stack);
			}
		}

		if (!this.userData.token) throw new Error("Failed to retrieve user token. Check login credentials.");
		this.loginApi.defaults.headers.common["Authorization"] = this.userData.token;

		const rriot = this.userData.rriot;

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
	}

	async getHomeID() {
		if (!this.loginApi) {
			throw new Error("loginApi is not initialized. Call init() first.");
		}

		return await this.loginApi.get("api/v1/getHomeDetail").then((res) => res.data.data.rrHomeId);
	}

	async getHomeData() {
		if (!this.loginApi) {
			throw new Error("loginApi is not initialized. Call init() first.");
		}
		if (!this.realApi) {
			throw new Error("realApi is not initialized. Call initializeRealApi() first");
		}

		try {
			const homeId = await this.getHomeID();
			this.adapter.log.debug(`Getting HomeData with homeId: ${homeId}`);
			this.homeData = await this.realApi.get(`user/homes/${homeId}`).then((res) => res.data.result);

			await this.adapter.setState("HomeData", { val: JSON.stringify(this.homeData), ack: true });

			return this.homeData;
		} catch (error) {
			this.adapter.catchError(error.stack);
			return null;
		}
	}

	async get_rriot() {
		return this.userData.rriot;
	}

	async getScenes() {
		if (!this.loginApi) {
			throw new Error("loginApi is not initialized. Call init() first.");
		}
		if (!this.realApi) {
			throw new Error("realApi is not initialized. Call initializeRealApi() first");
		}

		const homeId = await this.getHomeID();
		return await this.realApi.get(`user/scene/home/${homeId}`).then((res) => res.data);
	}

	async executeScene(sceneID) {
		if (!this.realApi) {
			throw new Error("realApi is not initialized. Call initializeRealApi() first");
		}

		await this.realApi.post(`user/scene/${sceneID.val}/execute`);
	}

	async getFirmwareStates(duid) {
		if (!this.realApi) {
			throw new Error("realApi is not initialized. Call initializeRealApi() first");
		}

		return await this.realApi.get(`ota/firmware/${duid}/updatev2`);
	}

	getProducts() {
		if (!this.homeData) {
			throw new Error("this.homeData is not initialized. Initialize via getHomeData() first");
		}

		return this.homeData.products;
	}

	getDevices() {
		if (!this.homeData) {
			throw new Error("this.homeData is not initialized. Initialize via getHomeData() first");
		}

		return this.homeData.devices.concat(this.homeData.receivedDevices);
	}

	getMatchedRoomIDs() {
		if (!this.homeData) {
			throw new Error("this.homeData is not initialized. Initialize via getHomeData() first");
		}

		this.adapter.log.debug(`this.homeData.rooms: ${JSON.stringify(this.homeData.rooms)}`);
		const matchedRooms = this.homeData.rooms.map((room) => {
			return {
				id: room.name,
				name: room.name,
			};
		});
		this.adapter.log.debug(`matchedRooms: ${matchedRooms}`);

		return matchedRooms;
	}

	getMatchedLocalKeys() {
		if (!this.homeData) {
			throw new Error("this.homeData is not initialized. Initialize via getHomeData() first");
		}

		const devices = this.getDevices();
		return new Map(devices.map((device) => [device.duid, device.localKey]));
	}
}

function md5hex(str) {
	return crypto.createHash("md5").update(str).digest("hex");
}

module.exports = {
	roborockApi,
};
