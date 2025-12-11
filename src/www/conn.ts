//
// conn.ts
//
"use strict";

// Declare global variables from <script> tags for TypeScript
declare let io: any; // Besser: npm install @types/socket.io-client
declare let $: any; // Besser: npm install @types/jquery
declare let storage: { get: (key: string) => any; set: (key: string, val: any) => void; empty: () => void };
declare let socketNamespace: string | undefined;
declare let socketUrl: string | undefined;
declare let socketSession: string | undefined;
declare let socketForceWebSockets: boolean | undefined;
declare let app: {
	onConnChange: (isConnected: boolean) => void;
	readLocalFile: (filename: string, callback: (err: any, data: string | null, mimeType?: string) => void) => void;
};

// --- TypeScript-Interfaces ---

interface ConnOptions {
	name?: string;
	connLink?: string;
	socketSession?: string;
	socketForceWebSockets?: boolean;
	mayReconnect?: () => boolean;
}

interface ConnCallbacks {
	onConnChange?: (isConnected: boolean) => void;
	onUpdate?: (id: string, state: any) => void; // ioBroker.State
	onRefresh?: ((...args: any[]) => any) | null;
	onAuth?: ((...args: any[]) => any) | null;
	onCommand?: (instance: string, command: string, data: any) => any;
	onError?: (err: any) => void;
	onObjectChange?: (id: string, obj: any) => void;
}

/**
 * Modern, class-based and Promise-based version of servConn.
 */
export class Connection {
	// Private properties
	private _socket: any = null; // Typ SocketIOClient.Socket
	private _isConnected: boolean = false;
	private _disconnectedSince: number | null = null;
	private _connCallbacks: ConnCallbacks = {};
	private _isAuthDone: boolean = false;
	private _type: string = "socket.io";
	private _reconnectInterval: number = 10000;
	private _reloadInterval: number = 30;
	private _isSecure: boolean = false;
	private _useStorage: boolean = false;
	private _objects: Record<string, any> | null = null;

	// Auth-Promise: Methods that require auth will await this promise.
	private _authPromise: Promise<boolean> | null = null;
	private _resolveAuth: (value: boolean) => void = () => {};
	private _rejectAuth: (reason?: any) => void = () => {};

	// Public properties
	public namespace: string = "vis.0";
	public user: string = "";

	// Internal timers
	private _connectInterval: any = null;
	private _countInterval: any = null;
	private _timer: any = null;
	private _lastTimer: number = 0;

	constructor(options?: { useStorage?: boolean }) {
		if (options?.useStorage) {
			this._useStorage = true;
		}
	}

	/**
	 * Initializes the connection and starts the authentication process.
	 */
	public init(connOptions: ConnOptions, connCallbacks: ConnCallbacks, objectsRequired: boolean) {
		this._connCallbacks = connCallbacks;

		// Create the promise that all API calls will await
		this._authPromise = new Promise((resolve, reject) => {
			this._resolveAuth = resolve;
			this._rejectAuth = reject;
		});

		if (typeof socketNamespace !== "undefined") {
			this.namespace = socketNamespace;
		}
		connOptions = connOptions || {};
		if (!connOptions.name) {
			connOptions.name = this.namespace;
		}

		// --- Logic for determining the connection type (local vs. socket.io) ---
		if (document.URL.split("/local/")[1] || (typeof socketUrl === "undefined" && !connOptions.connLink) || (typeof socketUrl !== "undefined" && socketUrl === "local")) {
			this._type = "local";
		}

		// --- Establish Connection ---
		if (this._type === "local") {
			this._isConnected = true;
			this._isAuthDone = true;
			if (this._connCallbacks.onConnChange) this._connCallbacks.onConnChange(true);
			if (typeof app !== "undefined") app.onConnChange(true);
			this._resolveAuth(true); // Resolve auth promise
			return;
		}

		if (typeof io === "undefined") {
			console.error("socket.io not loaded!");
			return;
		}

		let connLink = connOptions.connLink || window.localStorage.getItem("connLink");
		if (!connLink && typeof socketUrl !== "undefined") connLink = socketUrl;

		connOptions.socketSession = connOptions.socketSession || (typeof socketSession !== "undefined" ? socketSession : "nokey");

		if (connOptions.socketForceWebSockets === undefined && typeof socketForceWebSockets !== "undefined") {
			connOptions.socketForceWebSockets = socketForceWebSockets;
		}

		let url: string;
		if (connLink) {
			url = connLink;
			if (connLink[0] === ":") {
				url = `${location.protocol}//${location.hostname}${connLink}`;
			}
		} else {
			url = `${location.protocol}//${location.host}`;
		}

		this._socket = io.connect(url, {
			query: "key=" + connOptions.socketSession,
			"reconnection limit": 10000,
			"max reconnection attempts": Infinity,
			reconnection: false,
			upgrade: !connOptions.socketForceWebSockets,
			rememberUpgrade: connOptions.socketForceWebSockets,
			transports: connOptions.socketForceWebSockets ? ["websocket"] : undefined,
		});

		// --- Register socket listeners ---
		this._socket.on("connect", () => this._onSocketConnect(connOptions, objectsRequired));
		this._socket.on("reauthenticate", () => this._onSocketReauthenticate());
		this._socket.on("connect_error", () => this._onSocketConnectError(connOptions));
		this._socket.on("disconnect", () => this._onSocketDisconnect(connOptions));
		this._socket.on("reconnect", () => this._onSocketReconnect());
		this._socket.on("objectChange", (id: string, obj: any) => this._onSocketObjectChange(id, obj));
		this._socket.on("stateChange", (id: string, state: any) => this._onSocketStateChange(id, state));
		this._socket.on("permissionError", (err: any) => this._onSocketPermissionError(err));
	}

	// --- Private Socket Handlers ---

	private _onSocketConnect(connOptions: ConnOptions, objectsRequired: boolean) {
		if (this._disconnectedSince) {
			const offlineTime = new Date().getTime() - this._disconnectedSince;
			console.log(`was offline for ${offlineTime / 1000}s`);
			if (this._reloadInterval && offlineTime > this._reloadInterval * 1000) {
				window.location.reload();
			}
			this._disconnectedSince = null;
		}

		if (this._connectInterval) {
			clearInterval(this._connectInterval);
			this._connectInterval = null;
		}
		if (this._countInterval) {
			clearInterval(this._countInterval);
			this._countInterval = null;
		}
		const elem = document.getElementById("server-disconnect");
		if (elem) elem.style.display = "none";

		this._socket.emit("name", connOptions.name);
		console.log(new Date().toISOString() + " Connected => authenticate");

		const wait = setTimeout(() => {
			console.error("No answer from server");
			window.location.reload();
		}, 3000);

		this._socket.emit("authenticate", (isOk: boolean, isSecure: boolean) => {
			clearTimeout(wait);
			console.log(new Date().toISOString() + " Authenticated: " + isOk);
			if (isOk) {
				this._onAuth(objectsRequired, isSecure);
			} else {
				console.log("permissionError");
				this._rejectAuth(new Error("Permission Error"));
			}
		});
	}

	private _onAuth(objectsRequired: boolean, isSecure: boolean) {
		// Set auth status before processing commands.
		this._isAuthDone = true;

		this._isSecure = isSecure;

		if (this._isSecure) {
			this._lastTimer = new Date().getTime();
			this._monitor();
		}

		if (objectsRequired) this._socket.emit("subscribeObjects", "*");

		if (this._isConnected === true) {
			// Prevent double-firing on reconnect
			this._resolveAuth(true); // Resolve auth promise regardless
			return;
		}

		this._isConnected = true;
		if (this._connCallbacks.onConnChange) {
			setTimeout(() => {
				this._socket.emit("authEnabled", (_auth: boolean, user: string) => {
					this.user = user;
					this._connCallbacks.onConnChange!(this._isConnected);
					if (typeof app !== "undefined") app.onConnChange(this._isConnected);
				});
			}, 0);
		}

		// Release all pending API calls (awaiting _checkReady)
		this._resolveAuth(true);
	}

	private _onSocketReauthenticate() {
		if (this._connCallbacks.onConnChange) {
			this._connCallbacks.onConnChange(false);
			if (typeof app !== "undefined") app.onConnChange(false);
		}
		console.warn("reauthenticate");
		window.location.reload();
	}

	private _onSocketConnectError(connOptions: ConnOptions) {
		if (typeof $ !== "undefined") {
			$(".splash-screen-text").css("color", "#002951");
		}
		this.reconnect(connOptions);
	}

	private _onSocketDisconnect(connOptions: ConnOptions) {
		this._disconnectedSince = new Date().getTime();
		this._isConnected = false;

		// Create a new, unresolved promise for the next connection
		this._authPromise = new Promise((resolve, reject) => {
			this._resolveAuth = resolve;
			this._rejectAuth = reject;
		});

		if (this._connCallbacks.onConnChange) {
			setTimeout(() => {
				const elem = document.getElementById("server-disconnect");
				if (elem) elem.style.display = "";
				this._connCallbacks.onConnChange!(this._isConnected);
				if (typeof app !== "undefined") app.onConnChange(this._isConnected);
			}, 5000);
		} else {
			const elem = document.getElementById("server-disconnect");
			if (elem) elem.style.display = "";
		}
		this.reconnect(connOptions);
	}

	private _onSocketReconnect() {
		const offlineTime = new Date().getTime() - (this._disconnectedSince || 0);
		console.log(`was offline for ${offlineTime / 1000}s`);
		if (this._reloadInterval && offlineTime > this._reloadInterval * 1000) {
			window.location.reload();
		}
	}

	private _onSocketObjectChange(id: string, obj: any) {
		if (this._useStorage && typeof storage !== "undefined") {
			// ... (storage logic) ...
		}
		if (this._connCallbacks.onObjectChange) {
			this._connCallbacks.onObjectChange(id, obj);
		}
	}

	private _onSocketStateChange(id: string, state: any) {
		if (!id || state === null || typeof state !== "object") return;

		// ... (original stateChange logic for commands) ...

		if (this._connCallbacks.onUpdate) {
			this._connCallbacks.onUpdate(id, state);
		}
	}

	private _onSocketPermissionError(err: any) {
		if (this._connCallbacks.onError) {
			this._connCallbacks.onError(err);
		} else {
			console.log("permissionError", err);
		}
	}

	/**
	 * Checks if the connection is initialized and authenticated.
	 * Awaits the auth promise.
	 */
	private async _checkReady(commandName: string): Promise<boolean> {
		if (this._type === "local") {
			return true; // Always ready in local mode
		}

		if (!this._authPromise) {
			console.error(`Connection not initialized. Call .init() first for ${commandName}`);
			throw new Error("Connection not initialized");
		}

		// Waits until _onAuth() has called _resolveAuth(true).
		await this._authPromise;

		// Additional checks (replaces _checkConnection)
		if (!this._isConnected) {
			console.log(`No connection for ${commandName}`);
			throw new Error("No connection");
		}
		if (this._socket === null) {
			console.log(`socket.io not initialized for ${commandName}`);
			throw new Error("Socket.io not initialized");
		}

		// We check _isAuthDone, which is set in _onAuth.
		if (!this._isAuthDone) {
			console.warn(`Auth not done for ${commandName}. Race condition?`);
			throw new Error("Authentication not complete");
		}

		return true;
	}

	// --- Public API Methods (now with async/await) ---

	public getType = () => this._type;
	public getIsConnected = () => this._isConnected;
	public getIsLoginRequired = () => this._isSecure;
	public getUser = () => this.user;

	public setReloadTimeout = (timeout: number) => {
		this._reloadInterval = parseInt(timeout as any, 10);
	};
	public setReconnectInterval = (interval: number) => {
		this._reconnectInterval = parseInt(interval as any, 10);
	};

	public reconnect(connOptions: ConnOptions) {
		if ((!connOptions.mayReconnect || connOptions.mayReconnect()) && !this._connectInterval) {
			this._connectInterval = setInterval(() => {
				console.log("Trying connect...");
				this._socket.connect();
				// ... (remaining reconnect logic with jQuery) ...
			}, this._reconnectInterval);
			// ...
		}
	}

	public async getVersion(): Promise<string> {
		await this._checkReady("getVersion");
		return new Promise((resolve) => {
			this._socket.emit("getVersion", (_err: any, version: string) => {
				resolve(version);
			});
		});
	}

	/**
	 * Sends a command to an adapter instance.
	 * (Your added function)
	 */
	public async sendTo(adapterInstance: string, command: string, message: any): Promise<any> {
		await this._checkReady("sendTo");
		return new Promise((resolve, reject) => {
			this._socket.emit("sendTo", adapterInstance, command, message, (result: any) => {
				if (result && result.error) {
					reject(new Error(result.error));
				} else {
					resolve(result);
				}
			});
		});
	}

	/**
	 * Queries objects based on a view.
	 * (Your added function)
	 */
	public async getObjectView(design: string, search: string, params: any): Promise<{ rows: any[] }> {
		await this._checkReady("getObjectView");
		return new Promise((resolve, reject) => {
			this._socket.emit("getObjectView", design, search, params, (err: any, res: any) => {
				if (err) {
					reject(err);
				} else {
					resolve(res);
				}
			});
		});
	}

	/**
	 * Reads a single object from the ioBroker database.
	 */
	public async getObject(id: string): Promise<any> {
		await this._checkReady("getObject"); // Wait for auth to complete
		return new Promise((resolve, reject) => {
			this._socket.emit("getObject", id, (err: any, obj: any) => {
				if (err) {
					reject(err);
				} else {
					resolve(obj);
				}
			});
		});
	}

	public async getStates(IDs: string[] | null): Promise<Record<string, any>> {
		if (this._type === "local") return {};

		await this._checkReady("getStates");

		return new Promise((resolve, reject) => {
			this._socket.emit("getStates", IDs, (err: any, data: any) => {
				if (err || !data) {
					reject(err || "Authentication required");
				} else {
					resolve(data);
				}
			});
		});
	}

	/**
	 * Subscribes to a specific state (or pattern) on the server.
	 */
	public async subscribeState(id: string): Promise<void> {
		await this._checkReady("subscribeState"); // Wait for auth to complete
		return new Promise((resolve) => {
			// console.log(`[conn] Subscribing to ${id}`);
			this._socket.emit("subscribe", id, () => {
				resolve();
			});
		});
	}

	/**
	 * Unsubscribes from a specific state (or pattern) on the server.
	 */
	public async unsubscribeState(id: string): Promise<void> {
		await this._checkReady("unsubscribeState"); // Wait for auth to complete
		return new Promise((resolve) => {
			// console.log(`[conn] Unsubscribing from ${id}`);
			this._socket.emit("unsubscribe", id, () => {
				resolve();
			});
		});
	}

	/**
	 * Reads all objects, enums, adapters, channels, and devices.
	 * Flattens the callback hell with async/await.
	 */
	public async getObjects(useCache: boolean = false): Promise<Record<string, any>> {
		if (this._useStorage && useCache) {
			if (typeof storage !== "undefined") {
				const objects = this._objects || storage.get("objects");
				if (objects) return objects;
			} else if (this._objects) {
				return this._objects;
			}
		}

		await this._checkReady("getObjects");

		try {
			// 1. Get main objects
			const [err, data] = await new Promise<[any, Record<string, any>]>((resolve) => {
				this._socket.emit("getObjects", (err: any, data: any) => resolve([err, data]));
			});
			if (err) throw err;

			// 2. Get enums
			const enumsRes = await this.getObjectView("system", "enum", { startkey: "enum.", endkey: "enum.\u9999" });
			const enums: Record<string, any> = {};
			for (const row of enumsRes.rows) {
				data[row.id] = row.value;
				enums[row.id] = row.value;
			}

			// 3. Get adapter instances
			const adaptersRes = await this.getObjectView("system", "instance", { startkey: "system.adapter.", endkey: "system.adapter.\u9999" });
			for (const row of adaptersRes.rows) {
				data[row.id] = row.value;
			}

			// 4. Get channels
			const channelsRes = await this.getObjectView("system", "channel", { startkey: "", endkey: "\u9999" });
			for (const row of channelsRes.rows) {
				data[row.id] = row.value;
			}

			// 5. Get devices
			const devicesRes = await this.getObjectView("system", "device", { startkey: "", endkey: "\u9999" });
			for (const row of devicesRes.rows) {
				data[row.id] = row.value;
			}

			// Save if caching is used
			if (this._useStorage) {
				this._fillChildren(data);
				this._objects = data;
				if (typeof storage !== "undefined") {
					storage.set("objects", data);
					storage.set("enums", enums);
					storage.set("timeSync", new Date().getTime());
				}
			}

			return data;
		} catch (error) {
			console.error("Error in getObjects:", error);
			throw error;
		}
	}

	// ... (Here the remaining methods like readFile, writeFile, getChildren etc.
	// 		convert to async/await using the same pattern) ...

	// Example for readFile:
	public async readFile(filename: string, isRemote: boolean = false): Promise<{ data: any; mimeType?: string }> {
		if (this._type === "local") {
			try {
				const data = storage.get(filename);
				return { data: data ? JSON.parse(data) : null };
			} catch (err) {
				throw err;
			}
		}

		await this._checkReady("readFile");

		if (!isRemote && typeof app !== "undefined") {
			return new Promise((resolve, reject) => {
				app.readLocalFile(filename.replace(/^\/vis\.0\//, ""), (err, data, mimeType) => {
					if (err) reject(err);
					else resolve({ data, mimeType });
				});
			});
		}

		let adapter = this.namespace;
		if (filename[0] === "/") {
			const p = filename.split("/");
			adapter = p[1];
			p.splice(0, 2);
			filename = p.join("/");
		}

		return new Promise((resolve, reject) => {
			this._socket.emit("readFile", adapter, filename, (err: any, data: any, mimeType: string) => {
				if (err) reject(err);
				else resolve({ data, mimeType });
			});
		});
	}

	// --- Private Helper Functions ---

	private _monitor() {
		if (this._timer) return;
		const ts = new Date().getTime();
		if (this._reloadInterval && ts - this._lastTimer > this._reloadInterval * 1000) {
			window.location.reload();
		} else {
			this._lastTimer = ts;
		}
		this._timer = setTimeout(() => {
			this._timer = null;
			this._monitor();
		}, 10000);
	}

	private _fillChildren(objects: Record<string, any>) {
		const items = Object.keys(objects).sort();
		for (let i = 0; i < items.length; i++) {
			const id = items[i];
			if (objects[id].common) {
				let j = i + 1;
				const children: string[] = [];
				const len = id.length + 1;
				const name = id + ".";
				while (j < items.length && items[j].substring(0, len) === name) {
					children.push(items[j++]);
				}
				objects[id].children = children;
			}
		}
	}
}
