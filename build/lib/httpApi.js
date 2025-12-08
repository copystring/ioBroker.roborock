"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.http_api = void 0;
const axios_1 = __importDefault(require("axios"));
const crypto = __importStar(require("crypto"));
const cryptoEngine_1 = require("./cryptoEngine");
// Constants
const API_BASE_URL = "https://euiot.roborock.com";
const API_V3_SIGN = "api/v3/key/sign";
const API_V4_LOGIN_CODE = "api/v4/auth/email/login/code";
const API_V4_LOGIN_PASSWORD = "api/v4/auth/email/login/pwd";
const API_V4_EMAIL_CODE = "api/v4/email/code/send";
const API_V5_PRODUCT = "api/v5/product";
/**
 * Helper to calculate MD5 hex string
 */
function md5hex(str) {
    return crypto.createHash("md5").update(str).digest("hex");
}
class http_api {
    adapter;
    loginApi = null;
    realApi = null;
    userData = null;
    homeData = null;
    homeID = null;
    productInfo = null;
    fwFeaturesCache = new Map();
    constructor(adapter) {
        this.adapter = adapter;
    }
    /**
     * Initializes the Login API and attempts to set up the Real API.
     * @param clientID The client identifier.
     */
    async init(clientID) {
        // Initialize the login API (needed to get access to the real API)
        this.loginApi = axios_1.default.create({
            baseURL: API_BASE_URL,
            headers: {
                header_clientid: crypto.createHash("md5").update(this.adapter.config.username).update(clientID).digest().toString("base64"),
                header_appversion: "4.54.02",
                header_clientlang: "de", // Assuming DE based on dump, or use adapter.config.language/system lang
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
    async loadUserData() {
        try {
            const userDataState = await this.adapter.getStateAsync("UserData");
            if (userDataState && userDataState.val) {
                const data = JSON.parse(userDataState.val);
                if (data && data.token && data.rriot) {
                    this.userData = data;
                    this.adapter.log.info("Restored persisted UserData.");
                }
            }
        }
        catch {
            this.adapter.log.debug(`No previous UserData found or invalid.`);
        }
    }
    /**
     * Logs in (if necessary) and sets up the authenticated "Real API" with Hawk authentication.
     */
    loginCodeResolver = null;
    submitLoginCode(code) {
        if (this.loginCodeResolver) {
            this.loginCodeResolver(code);
            this.loginCodeResolver = null;
        }
    }
    async initializeRealApi() {
        this.adapter.log.debug(`initialize http_api`);
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
                if (!signData)
                    throw new Error("Failed to obtain signature key k");
                const k = signData.k;
                if (usePasswordFlow) {
                    this.adapter.log.info("Starting Password Login Flow...");
                    try {
                        const loginResult = await this.loginByPassword(this.adapter.config.password, k, s);
                        if (loginResult.code === 200) {
                            this.userData = loginResult.data;
                            this.adapter.log.info("Login with password successful.");
                        }
                        else if (loginResult.code === 2031) {
                            this.adapter.log.warn("Password login requires 2FA (Code 2031). Falling back to 2FA flow.");
                            usePasswordFlow = false;
                        }
                        else {
                            throw new Error(`Login with password failed: ${JSON.stringify(loginResult)}`);
                        }
                    }
                    catch (e) {
                        this.adapter.log.error(`Password login error: ${e.message}`);
                        // If explicit 2031 (handled above) or other error, we might decide to fallback or fail.
                        // Current logic: if it was 2031, usePasswordFlow is set to false, so we fall through to 2FA.
                        // If it was another error (e.g. wrong password), we should probably stop?
                        // For safety/flexibility, if we flagged 'false' above, we continue. If we threw, we stop.
                        if (usePasswordFlow)
                            throw e;
                    }
                }
                // If not using password flow (or fell back)
                if (!this.userData && !usePasswordFlow) {
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
                        code = await new Promise((resolve, reject) => {
                            this.loginCodeResolver = resolve;
                            // Timeout after 15 minutes
                            setTimeout(() => {
                                if (this.loginCodeResolver) {
                                    this.loginCodeResolver = null;
                                    reject(new Error("Timeout waiting for 2FA code"));
                                }
                            }, 15 * 60 * 1000); // 15 min
                        });
                    }
                    catch (e) {
                        throw e;
                    }
                    this.adapter.log.info(`Got 2FA code: ${code}`);
                    await this.adapter.unsubscribeStatesAsync(stateId);
                    // 3. Login with Code
                    // Reuse k/s from strictly before if possible? No, 'signRequest' was likely called at start.
                    // However, the signature 's' and 'k' might expire or be one-time?
                    // The dump usage implies sign is called before login.
                    // We already called signRequest above. We should be able to reuse 'k' and 's' IF they are not one-time use or time-bound.
                    // Safest is to re-sign if we think it might have expired, but for now reuse.
                    const loginResult = await this.loginWithCode(code, k, s);
                    if (loginResult.code === 200) {
                        this.userData = loginResult.data; // data IS UserData
                        await this.adapter.setState(stateId, { val: "", ack: true });
                    }
                    else {
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
                        this.adapter.log.info(`Files downloaded: ${this.productInfo.data.productList.length} products found.`);
                        await this.adapter.setState("info.productInfo", { val: JSON.stringify(this.productInfo), ack: true });
                    }
                }
                catch (err) {
                    this.adapter.log.warn(`Failed to get product info V5: ${err}`);
                }
            }
            catch (error) {
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
            const realApi = axios_1.default.create({ baseURL: this.userData.rriot.r.a });
            realApi.interceptors.request.use((config) => {
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
                    const fullUrl = axios_1.default.getUri(config);
                    try {
                        urlPath = new URL(fullUrl).pathname;
                    }
                    catch {
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
        }
        catch (error) {
            this.adapter.log.error(`Error in initializeRealApi: ${error.stack}`);
            await this.adapter.setState("info.connection", { val: false, ack: true });
        }
    }
    async requestEmailCode(username) {
        if (!this.loginApi)
            throw new Error("loginApi is not initialized.");
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
        }
        catch (error) {
            if (error.response && error.response.data) {
                this.adapter.log.error(`Request email code failed with response: ${JSON.stringify(error.response.data)}`);
            }
            throw error; // Re-throw exact error to be caught by caller
        }
    }
    async signRequest(s) {
        if (!this.loginApi)
            return null;
        try {
            // Dump shows POST to sign endpoint without body, params in URL.
            // axios.post(url) works.
            const res = await this.loginApi.post(`${API_V3_SIGN}?s=${s}`);
            return res.data.data;
        }
        catch (e) {
            this.adapter.log.error(`SignRequest failed: ${e.message}`);
            return null;
        }
    }
    async loginWithCode(code, k, s) {
        if (!this.loginApi)
            throw new Error("loginApi not initialized");
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
            minorVersion: "0" // from dump
        });
        try {
            const res = await this.loginApi.post(API_V4_LOGIN_CODE, params.toString(), { headers });
            return res.data;
        }
        catch (e) {
            throw new Error(`Login with code failed: ${e.message}`);
        }
    }
    async loginByPassword(password, k, s) {
        if (!this.loginApi)
            throw new Error("loginApi not initialized");
        const encryptedPassword = cryptoEngine_1.cryptoEngine.encryptPassword(password, k);
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
        }
        catch (e) {
            if (e.response && e.response.data) {
                return e.response.data; // Return the error response payload (with code 2031 etc.) so caller can handle
            }
            throw new Error(`Login with password failed: ${e.message}`);
        }
    }
    async getProductInfoV5() {
        if (!this.loginApi)
            return null;
        try {
            const res = await this.loginApi.get(API_V5_PRODUCT);
            if (res.data && res.data.data) {
                return res.data;
            }
            return null;
        }
        catch (e) {
            this.adapter.log.warn(`getProductInfoV5 failed: ${e.message}`);
            return null;
        }
    }
    async downloadProductImages() {
        if (!this.adapter.config.downloadRoborockImages)
            return;
        if (!this.productInfo?.data?.productList)
            return;
        for (const p of this.productInfo.data.productList) {
            if (p.picurl) {
                try {
                    const safeId = p.model.replace(/\./g, "_");
                    const res = await axios_1.default.get(p.picurl, { responseType: "arraybuffer" });
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
                }
                catch (e) {
                    this.adapter.log.warn(`Failed to download image for ${p.model}: ${e}`);
                }
            }
        }
    }
    /**
     * Retrieves the Home ID from the API.
     */
    async getHomeID() {
        if (!this.loginApi) {
            throw new Error("loginApi is not initialized. Call init() first.");
        }
        try {
            const response = await this.loginApi.get("api/v1/getHomeDetail");
            if (response.data.data) {
                this.adapter.log.debug(`getHomeDetail: ${JSON.stringify(response.data)}`);
                this.homeID = response.data.data.rrHomeId;
                this.adapter.log.debug(`this.homeID: ${this.homeID}`);
            }
            else {
                this.adapter.log.error(`failed to get getHomeDetail: ${response.data.msg}`);
            }
        }
        catch (error) {
            this.adapter.log.error(`Error getting HomeID: ${error.message}`);
        }
    }
    /**
     * Downloads the latest Home Data (Devices, Rooms, Products) and stores it in state.
     */
    async updateHomeData() {
        if (!this.loginApi)
            throw new Error("loginApi is not initialized. Call init() first.");
        if (!this.realApi)
            throw new Error("realApi is not initialized. Call initializeRealApi() first");
        if (this.homeID) {
            this.adapter.log.debug(`Getting HomeData with homeId: ${this.homeID}`);
            try {
                const res = await this.realApi.get(`v2/user/homes/${this.homeID}`);
                this.homeData = res.data.result;
                await this.adapter.setState("HomeData", { val: JSON.stringify(this.homeData), ack: true });
            }
            catch (e) {
                this.adapter.log.error(`Error updating HomeData: ${e?.stack || e}`);
                this.homeData = null;
            }
        }
        else {
            this.adapter.log.error(`No homeId found`);
        }
    }
    /**
     * Returns the RRIOT authentication data.
     */
    get_rriot() {
        if (!this.userData) {
            throw new Error("this.userData is not initialized. Call updateHomeData() first");
        }
        return this.userData.rriot;
    }
    /**
     * Retrieves scenes for the current home.
     */
    async getScenes() {
        if (!this.loginApi)
            throw new Error("loginApi is not initialized.");
        if (!this.realApi)
            throw new Error("realApi is not initialized.");
        return await this.realApi.get(`user/scene/home/${this.homeID}`).then((res) => res.data);
    }
    /**
     * Executes a specific scene.
     */
    async executeScene(sceneID) {
        if (!this.realApi)
            throw new Error("realApi is not initialized.");
        await this.realApi.post(`user/scene/${sceneID.val}/execute`);
    }
    /**
     * Stores firmware feature IDs in the cache for a specific device.
     */
    storeFwFeaturesResult(duid, featureIds) {
        if (Array.isArray(featureIds)) {
            this.fwFeaturesCache.set(duid, featureIds);
            this.adapter.log.debug(`[HTTP_API|${duid}] Stored FW features result: ${JSON.stringify(featureIds)}`);
        }
        else {
            this.adapter.log.warn(`[HTTP_API|${duid}] Invalid data received for storing FW features: ${JSON.stringify(featureIds)}`);
        }
    }
    getFwFeaturesResult(duid) {
        return this.fwFeaturesCache.get(duid);
    }
    /**
     * Retrieves firmware update status for a device.
     */
    async getFirmwareStates(duid) {
        try {
            if (!this.realApi)
                throw new Error("realApi is not initialized.");
            return await this.realApi.get(`ota/firmware/${duid}/updatev2`);
        }
        catch (error) {
            throw new Error(`Error in getFirmwareStates: ${error.message}`);
        }
    }
    /**
     * Returns the list of products from HomeData.
     */
    getProducts() {
        if (!this.homeData) {
            throw new Error("this.homeData is not initialized. Initialize via updateHomeData() first");
        }
        return this.homeData.products;
    }
    /**
     * Returns a combined list of owned and shared devices.
     */
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
    /**
     * Checks if a device is a shared device (not owned by the user).
     */
    isSharedDevice(duid) {
        const sharedDevices = this.getReceivedDevices();
        return sharedDevices.some((device) => device.duid === duid);
    }
    /**
     * Matches rooms from HomeData and optionally assigns fallback names.
     */
    getMatchedRoomIDs(assignFallbackNames = false) {
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
    getMatchedLocalKeys() {
        if (!this.homeData) {
            throw new Error("this.homeData is not initialized. Initialize via updateHomeData() first");
        }
        const devices = this.getDevices();
        return new Map(devices.map((device) => [device.duid, device.localKey]));
    }
    /**
     * Finds the model name for a given device DUID.
     */
    getRobotModel(duid) {
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
        }
        catch (error) {
            this.adapter.log.error(`Error in getRobotModel: ${error.message}`);
            return null;
        }
    }
    /**
     * Finds the product category for a given device DUID.
     */
    getProductCategory(duid) {
        const devices = this.getDevices();
        try {
            const products = this.getProducts();
            const device = devices.find((d) => d.duid == duid);
            if (!device)
                return null;
            const product = products.find((p) => p.id == device.productId);
            return product ? product.category : null;
        }
        catch (error) {
            this.adapter.log.error(`Error in getProductCategory: ${error.message}`);
            return null;
        }
    }
    getFeatureSet(duid) {
        const allDevices = this.getDevices();
        const device = allDevices.find((d) => d.duid === duid);
        return device?.featureSet;
    }
    getNewFeatureSet(duid) {
        const allDevices = this.getDevices();
        const device = allDevices.find((d) => d.duid === duid);
        return device?.newFeatureSet;
    }
}
exports.http_api = http_api;
//# sourceMappingURL=httpApi.js.map