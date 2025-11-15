interface ConnOptions {
    name?: string;
    connLink?: string;
    socketSession?: string;
    socketForceWebSockets?: boolean;
    mayReconnect?: () => boolean;
}
interface ConnCallbacks {
    onConnChange?: (isConnected: boolean) => void;
    onUpdate?: (id: string, state: any) => void;
    onRefresh?: ((...args: any[]) => any) | null;
    onAuth?: ((...args: any[]) => any) | null;
    onCommand?: (instance: string, command: string, data: any) => any;
    onError?: (err: any) => void;
    onObjectChange?: (id: string, obj: any) => void;
}
/**
 * Modern, class-based and Promise-based version of servConn.
 */
export declare class Connection {
    private _socket;
    private _isConnected;
    private _disconnectedSince;
    private _connCallbacks;
    private _isAuthDone;
    private _type;
    private _reconnectInterval;
    private _reloadInterval;
    private _isSecure;
    private _defaultMode;
    private _useStorage;
    private _objects;
    private _enums;
    private _authPromise;
    private _resolveAuth;
    private _rejectAuth;
    namespace: string;
    user: string;
    private _connectInterval;
    private _countInterval;
    private _timer;
    private _lastTimer;
    constructor(options?: {
        useStorage?: boolean;
    });
    /**
     * Initializes the connection and starts the authentication process.
     */
    init(connOptions: ConnOptions, connCallbacks: ConnCallbacks, objectsRequired: boolean): void;
    private _onSocketConnect;
    private _onAuth;
    private _onSocketReauthenticate;
    private _onSocketConnectError;
    private _onSocketDisconnect;
    private _onSocketReconnect;
    private _onSocketObjectChange;
    private _onSocketStateChange;
    private _onSocketPermissionError;
    /**
     * Checks if the connection is initialized and authenticated.
     * Awaits the auth promise.
     */
    private _checkReady;
    getType: () => string;
    getIsConnected: () => boolean;
    getIsLoginRequired: () => boolean;
    getUser: () => string;
    setReloadTimeout: (timeout: number) => void;
    setReconnectInterval: (interval: number) => void;
    reconnect(connOptions: ConnOptions): void;
    getVersion(): Promise<string>;
    /**
     * Sends a command to an adapter instance.
     * (Your added function)
     */
    sendTo(adapterInstance: string, command: string, message: any): Promise<any>;
    /**
     * Queries objects based on a view.
     * (Your added function)
     */
    getObjectView(design: string, search: string, params: any): Promise<{
        rows: any[];
    }>;
    /**
     * Reads a single object from the ioBroker database.
     */
    getObject(id: string): Promise<any>;
    getStates(IDs: string[] | null): Promise<Record<string, any>>;
    /**
     * Subscribes to a specific state (or pattern) on the server.
     */
    subscribeState(id: string): Promise<void>;
    /**
     * Unsubscribes from a specific state (or pattern) on the server.
     */
    unsubscribeState(id: string): Promise<void>;
    /**
     * Reads all objects, enums, adapters, channels, and devices.
     * Flattens the callback hell with async/await.
     */
    getObjects(useCache?: boolean): Promise<Record<string, any>>;
    readFile(filename: string, isRemote?: boolean): Promise<{
        data: any;
        mimeType?: string;
    }>;
    private _monitor;
    private _fillChildren;
}
export {};
