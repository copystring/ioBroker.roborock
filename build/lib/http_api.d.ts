import { Roborock } from "../main";
export declare class http_api {
    adapter: Roborock;
    loginApi: any;
    realApi: any;
    userData: any;
    homeData: any;
    homeID: string | null;
    constructor(adapter: any);
    /**
     * @param {string} clientID
     */
    init(clientID: any): Promise<void>;
    initializeRealApi(): Promise<void>;
    getHomeID(): Promise<void>;
    updateHomeData(): Promise<void>;
    get_rriot(): any;
    getScenes(): Promise<any>;
    executeScene(sceneID: any): Promise<void>;
    /**
     * @param {string} duid
     */
    getFirmwareStates(duid: any): Promise<any>;
    getProducts(): any;
    getDevices(): any[];
    getReceivedDevices(): any;
    getMatchedRoomIDs(assignFallbackNames?: boolean): any;
    getMatchedLocalKeys(): Map<any, any>;
    /**
     * @param {string} duid
     * @returns {string|null}
     */
    getRobotModel(duid: any): any;
    /**
     * @param {string} duid
     */
    getProductCategory(duid: any): any;
    /**
     * @param {string} duid
     */
    getFeatureSet(duid: any): any;
    /**
     * @param {string} duid
     */
    getNewFeatureSet(duid: any): any;
}
