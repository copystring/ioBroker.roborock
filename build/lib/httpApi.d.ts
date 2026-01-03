import { Roborock } from "../main";
import { type AxiosInstance } from "axios";
import { ProductV5Response, LoginV4Response } from "./apiTypes";
interface RriotData {
    u: string;
    s: string;
    h: string;
    k: string;
    r: {
        a: string;
        m: string;
    };
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
export declare class http_api {
    adapter: Roborock;
    loginApi: AxiosInstance | null;
    realApi: AxiosInstance | null;
    userData: UserData | null;
    homeData: HomeData | null;
    homeID: number | null;
    productInfo: ProductV5Response | null;
    private fwFeaturesCache;
    constructor(adapter: Roborock);
    /**
     * Initializes the Login API and attempts to set up the Real API.
     * @param clientID The client identifier.
     */
    init(clientID: string): Promise<void>;
    /**
     * Restores UserData from state.
     */
    loadUserData(): Promise<void>;
    /**
     * Logs in (if necessary) and sets up the authenticated "Real API" with Hawk authentication.
     */
    private loginCodeResolver;
    submitLoginCode(code: string): void;
    initializeRealApi(): Promise<void>;
    requestEmailCode(username: string): Promise<void>;
    signRequest(s: string): Promise<{
        k: string;
    } | null>;
    loginWithCode(code: string, k: string, s: string): Promise<LoginV4Response>;
    loginByPassword(password: string, k: string, s: string): Promise<LoginV4Response>;
    getProductInfoV5(): Promise<ProductV5Response | null>;
    ensureProductInfo(): Promise<void>;
    downloadProductImages(): Promise<void>;
    /**
     * Retrieves the Home ID from the API.
     */
    getHomeID(): Promise<void>;
    /**
     * Downloads the latest Home Data (Devices, Rooms, Products) and stores it in state.
     */
    updateHomeData(): Promise<void>;
    /**
     * Returns the RRIOT authentication data.
     */
    get_rriot(): RriotData;
    /**
     * Resolves the numeric Product ID for a given model.
     * Tries V3 HomeData first, then V5 ProductInfo.
     */
    getProductIdByModel(modelName: string): number | null;
    /**
     * Retrieves scenes for the current home.
     */
    getScenes(): Promise<any>;
    /**
     * Executes a specific scene.
     */
    executeScene(sceneID: {
        val: string | number;
    }): Promise<void>;
    /**
     * Stores firmware feature IDs in the cache for a specific device.
     */
    storeFwFeaturesResult(duid: string, featureIds: number[]): void;
    getFwFeaturesResult(duid: string): number[] | undefined;
    /**
     * Retrieves firmware update status for a device.
     */
    getFirmwareStates(duid: string): Promise<any>;
    /**
     * Returns the list of products from HomeData.
     */
    getProducts(): Product[];
    /**
     * Returns a combined list of owned and shared devices.
     */
    getDevices(): Device[];
    getReceivedDevices(): Device[];
    /**
     * Checks if a device is a shared device (not owned by the user).
     */
    isSharedDevice(duid: string): boolean;
    /**
     * Matches rooms from HomeData and optionally assigns fallback names.
     */
    getMatchedRoomIDs(assignFallbackNames?: boolean): {
        id: number;
        name: string;
    }[];
    /**
     * Maps all devices to their local keys.
     */
    getMatchedLocalKeys(): Map<string, string>;
    /**
     * Finds the model name for a given device DUID.
     */
    getRobotModel(duid: string): string | null;
    /**
     * Finds the product category for a given device DUID.
     */
    getProductCategory(duid: string): string | null;
    getFeatureSet(duid: string): number | undefined;
    getNewFeatureSet(duid: string): string | undefined;
}
export {};
