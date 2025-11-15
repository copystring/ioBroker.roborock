//
// conn.ts
//
"use strict";
/**
 * Moderne, klassenbasierte und Promise-basierte Version von servConn.
 */
export class Connection {
    // Private Eigenschaften
    _socket = null; // Typ SocketIOClient.Socket
    _isConnected = false;
    _disconnectedSince = null;
    _connCallbacks = {};
    _isAuthDone = false;
    _type = "socket.io";
    _reconnectInterval = 10000;
    _reloadInterval = 30;
    _isSecure = false;
    _defaultMode = 0x644;
    _useStorage = false;
    _objects = null;
    _enums = null;
    // Auth-Promise: Methoden, die eine Auth erfordern, warten auf dieses Promise.
    _authPromise = null;
    _resolveAuth = () => { };
    _rejectAuth = () => { };
    // Öffentliche Eigenschaften
    namespace = "vis.0";
    user = "";
    // Interne Timer
    _connectInterval = null;
    _countInterval = null;
    _timer = null;
    _lastTimer = 0;
    constructor(options) {
        if (options?.useStorage) {
            this._useStorage = true;
        }
    }
    /**
     * Initialisiert die Verbindung und startet den Authentifizierungsprozess.
     */
    init(connOptions, connCallbacks, objectsRequired) {
        this._connCallbacks = connCallbacks;
        // Das Promise erstellen, auf das alle API-Aufrufe warten
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
        // --- Logik zur Bestimmung des Verbindungstyps (local vs. socket.io) ---
        if (document.URL.split("/local/")[1] || (typeof socketUrl === "undefined" && !connOptions.connLink) || (typeof socketUrl !== "undefined" && socketUrl === "local")) {
            this._type = "local";
        }
        // --- Verbindung herstellen ---
        if (this._type === "local") {
            this._isConnected = true;
            this._isAuthDone = true;
            if (this._connCallbacks.onConnChange)
                this._connCallbacks.onConnChange(true);
            if (typeof app !== "undefined")
                app.onConnChange(true);
            this._resolveAuth(true); // Auth-Promise auflösen
            return;
        }
        if (typeof io === "undefined") {
            console.error("socket.io not loaded!");
            return;
        }
        let connLink = connOptions.connLink || window.localStorage.getItem("connLink");
        if (!connLink && typeof socketUrl !== "undefined")
            connLink = socketUrl;
        connOptions.socketSession = connOptions.socketSession || (typeof socketSession !== "undefined" ? socketSession : "nokey");
        if (connOptions.socketForceWebSockets === undefined && typeof socketForceWebSockets !== "undefined") {
            connOptions.socketForceWebSockets = socketForceWebSockets;
        }
        let url;
        if (connLink) {
            url = connLink;
            if (connLink[0] === ":") {
                url = `${location.protocol}//${location.hostname}${connLink}`;
            }
        }
        else {
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
        // --- Socket-Listener registrieren ---
        this._socket.on("connect", () => this._onSocketConnect(connOptions, objectsRequired));
        this._socket.on("reauthenticate", () => this._onSocketReauthenticate());
        this._socket.on("connect_error", () => this._onSocketConnectError(connOptions));
        this._socket.on("disconnect", () => this._onSocketDisconnect(connOptions));
        this._socket.on("reconnect", () => this._onSocketReconnect());
        this._socket.on("objectChange", (id, obj) => this._onSocketObjectChange(id, obj));
        this._socket.on("stateChange", (id, state) => this._onSocketStateChange(id, state));
        this._socket.on("permissionError", (err) => this._onSocketPermissionError(err));
    }
    // --- Private Socket-Handler ---
    _onSocketConnect(connOptions, objectsRequired) {
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
        if (elem)
            elem.style.display = "none";
        this._socket.emit("name", connOptions.name);
        console.log(new Date().toISOString() + " Connected => authenticate");
        const wait = setTimeout(() => {
            console.error("No answer from server");
            window.location.reload();
        }, 3000);
        this._socket.emit("authenticate", (isOk, isSecure) => {
            clearTimeout(wait);
            console.log(new Date().toISOString() + " Authenticated: " + isOk);
            if (isOk) {
                this._onAuth(objectsRequired, isSecure);
            }
            else {
                console.log("permissionError");
                this._rejectAuth(new Error("Permission Error"));
            }
        });
    }
    _onAuth(objectsRequired, isSecure) {
        // *** DEIN WICHTIGER FIX ***
        // Setzt den Auth-Status, bevor Befehle verarbeitet werden.
        this._isAuthDone = true;
        this._isSecure = isSecure;
        if (this._isSecure) {
            this._lastTimer = new Date().getTime();
            this._monitor();
        }
        if (objectsRequired)
            this._socket.emit("subscribeObjects", "*");
        if (this._isConnected === true) {
            // Verhindert doppeltes Feuern bei Reconnect
            this._resolveAuth(true); // Auth-Promise trotzdem auflösen
            return;
        }
        this._isConnected = true;
        if (this._connCallbacks.onConnChange) {
            setTimeout(() => {
                this._socket.emit("authEnabled", (auth, user) => {
                    this.user = user;
                    this._connCallbacks.onConnChange(this._isConnected);
                    if (typeof app !== "undefined")
                        app.onConnChange(this._isConnected);
                });
            }, 0);
        }
        // Alle wartenden API-Aufrufe (await _checkReady) freigeben
        this._resolveAuth(true);
    }
    _onSocketReauthenticate() {
        if (this._connCallbacks.onConnChange) {
            this._connCallbacks.onConnChange(false);
            if (typeof app !== "undefined")
                app.onConnChange(false);
        }
        console.warn("reauthenticate");
        window.location.reload();
    }
    _onSocketConnectError(connOptions) {
        if (typeof $ !== "undefined") {
            $(".splash-screen-text").css("color", "#002951");
        }
        this.reconnect(connOptions);
    }
    _onSocketDisconnect(connOptions) {
        this._disconnectedSince = new Date().getTime();
        this._isConnected = false;
        // Erstelle ein neues, ungelöstes Promise für die nächste Verbindung
        this._authPromise = new Promise((resolve, reject) => {
            this._resolveAuth = resolve;
            this._rejectAuth = reject;
        });
        if (this._connCallbacks.onConnChange) {
            setTimeout(() => {
                const elem = document.getElementById("server-disconnect");
                if (elem)
                    elem.style.display = "";
                this._connCallbacks.onConnChange(this._isConnected);
                if (typeof app !== "undefined")
                    app.onConnChange(this._isConnected);
            }, 5000);
        }
        else {
            const elem = document.getElementById("server-disconnect");
            if (elem)
                elem.style.display = "";
        }
        this.reconnect(connOptions);
    }
    _onSocketReconnect() {
        const offlineTime = new Date().getTime() - (this._disconnectedSince || 0);
        console.log(`was offline for ${offlineTime / 1000}s`);
        if (this._reloadInterval && offlineTime > this._reloadInterval * 1000) {
            window.location.reload();
        }
    }
    _onSocketObjectChange(id, obj) {
        if (this._useStorage && typeof storage !== "undefined") {
            // ... (storage logic) ...
        }
        if (this._connCallbacks.onObjectChange) {
            this._connCallbacks.onObjectChange(id, obj);
        }
    }
    _onSocketStateChange(id, state) {
        if (!id || state === null || typeof state !== "object")
            return;
        // ... (original stateChange logic for commands) ...
        if (this._connCallbacks.onUpdate) {
            this._connCallbacks.onUpdate(id, state);
        }
    }
    _onSocketPermissionError(err) {
        if (this._connCallbacks.onError) {
            this._connCallbacks.onError(err);
        }
        else {
            console.log("permissionError", err);
        }
    }
    /**
     * Prüft, ob die Verbindung initialisiert und authentifiziert ist.
     * Wartet auf das Auth-Promise.
     */
    async _checkReady(commandName) {
        if (this._type === "local") {
            return true; // Im lokalen Modus immer bereit
        }
        if (!this._authPromise) {
            console.error(`Connection not initialized. Call .init() first for ${commandName}`);
            throw new Error("Connection not initialized");
        }
        // Wartet, bis _onAuth() _resolveAuth(true) aufgerufen hat.
        await this._authPromise;
        // Zusätzliche Prüfungen (ersetzt _checkConnection)
        if (!this._isConnected) {
            console.log(`No connection for ${commandName}`);
            throw new Error("No connection");
        }
        if (this._socket === null) {
            console.log(`socket.io not initialized for ${commandName}`);
            throw new Error("Socket.io not initialized");
        }
        // *** DEIN WICHTIGER FIX ***
        // Wir prüfen _isAuthDone, das in _onAuth gesetzt wird.
        if (!this._isAuthDone) {
            console.warn(`Auth not done for ${commandName}. Race condition?`);
            throw new Error("Authentication not complete");
        }
        return true;
    }
    // --- Öffentliche API-Methoden (jetzt mit async/await) ---
    getType = () => this._type;
    getIsConnected = () => this._isConnected;
    getIsLoginRequired = () => this._isSecure;
    getUser = () => this.user;
    setReloadTimeout = (timeout) => {
        this._reloadInterval = parseInt(timeout, 10);
    };
    setReconnectInterval = (interval) => {
        this._reconnectInterval = parseInt(interval, 10);
    };
    reconnect(connOptions) {
        if ((!connOptions.mayReconnect || connOptions.mayReconnect()) && !this._connectInterval) {
            this._connectInterval = setInterval(() => {
                console.log("Trying connect...");
                this._socket.connect();
                // ... (restliche reconnect-Logik mit jQuery) ...
            }, this._reconnectInterval);
            // ...
        }
    }
    async getVersion() {
        await this._checkReady("getVersion");
        return new Promise((resolve) => {
            this._socket.emit("getVersion", (err, version) => {
                resolve(version);
            });
        });
    }
    /**
     * Sendet einen Befehl an eine Adapterinstanz.
     * (Deine hinzugefügte Funktion)
     */
    async sendTo(adapterInstance, command, message) {
        await this._checkReady("sendTo");
        return new Promise((resolve, reject) => {
            this._socket.emit("sendTo", adapterInstance, command, message, (result) => {
                if (result && result.error) {
                    reject(new Error(result.error));
                }
                else {
                    resolve(result);
                }
            });
        });
    }
    /**
     * Frägt Objekte basierend auf einer View ab.
     * (Deine hinzugefügte Funktion)
     */
    async getObjectView(design, search, params) {
        await this._checkReady("getObjectView");
        return new Promise((resolve, reject) => {
            this._socket.emit("getObjectView", design, search, params, (err, res) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res);
                }
            });
        });
    }
    /**
     * Liest ein einzelnes Objekt aus der ioBroker-Datenbank.
     */
    async getObject(id) {
        await this._checkReady("getObject"); // Warten, bis Auth abgeschlossen ist
        return new Promise((resolve, reject) => {
            this._socket.emit("getObject", id, (err, obj) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(obj);
                }
            });
        });
    }
    async getStates(IDs) {
        if (this._type === "local")
            return {};
        await this._checkReady("getStates");
        return new Promise((resolve, reject) => {
            this._socket.emit("getStates", IDs, (err, data) => {
                if (err || !data) {
                    reject(err || "Authentication required");
                }
                else {
                    resolve(data);
                }
            });
        });
    }
    /**
     * Abonniert einen bestimmten State (oder ein Muster) beim Server.
     */
    async subscribeState(id) {
        await this._checkReady("subscribeState"); // Warten, bis Auth abgeschlossen ist
        return new Promise((resolve) => {
            // console.log(`[conn] Subscribing to ${id}`);
            this._socket.emit("subscribe", id, () => {
                resolve();
            });
        });
    }
    /**
     * Kündigt das Abonnement für einen bestimmten State (oder ein Muster) beim Server.
     */
    async unsubscribeState(id) {
        await this._checkReady("unsubscribeState"); // Warten, bis Auth abgeschlossen ist
        return new Promise((resolve) => {
            // console.log(`[conn] Unsubscribing from ${id}`);
            this._socket.emit("unsubscribe", id, () => {
                resolve();
            });
        });
    }
    /**
     * Liest alle Objekte, Enums, Adapter, Kanäle und Geräte.
     * Flacht die Callback-Hölle mit async/await ab.
     */
    async getObjects(useCache = false) {
        if (this._useStorage && useCache) {
            if (typeof storage !== "undefined") {
                const objects = this._objects || storage.get("objects");
                if (objects)
                    return objects;
            }
            else if (this._objects) {
                return this._objects;
            }
        }
        await this._checkReady("getObjects");
        try {
            // 1. Hole Hauptobjekte
            const [err, data] = await new Promise((resolve) => {
                this._socket.emit("getObjects", (err, data) => resolve([err, data]));
            });
            if (err)
                throw err;
            // 2. Hole Enums
            const enumsRes = await this.getObjectView("system", "enum", { startkey: "enum.", endkey: "enum.\u9999" });
            const enums = {};
            for (const row of enumsRes.rows) {
                data[row.id] = row.value;
                enums[row.id] = row.value;
            }
            // 3. Hole Adapter-Instanzen
            const adaptersRes = await this.getObjectView("system", "instance", { startkey: "system.adapter.", endkey: "system.adapter.\u9999" });
            for (const row of adaptersRes.rows) {
                data[row.id] = row.value;
            }
            // Default-Modus ermitteln
            if (data[`system.adapter.${this.namespace}`]?.native?.defaultFileMode) {
                this._defaultMode = data[`system.adapter.${this.namespace}`].native.defaultFileMode;
            }
            // 4. Hole Kanäle
            const channelsRes = await this.getObjectView("system", "channel", { startkey: "", endkey: "\u9999" });
            for (const row of channelsRes.rows) {
                data[row.id] = row.value;
            }
            // 5. Hole Geräte
            const devicesRes = await this.getObjectView("system", "device", { startkey: "", endkey: "\u9999" });
            for (const row of devicesRes.rows) {
                data[row.id] = row.value;
            }
            // Speichern, wenn Caching genutzt wird
            if (this._useStorage) {
                this._fillChildren(data);
                this._objects = data;
                this._enums = enums;
                if (typeof storage !== "undefined") {
                    storage.set("objects", data);
                    storage.set("enums", enums);
                    storage.set("timeSync", new Date().getTime());
                }
            }
            return data;
        }
        catch (error) {
            console.error("Error in getObjects:", error);
            throw error;
        }
    }
    // ... (Hier die restlichen Methoden wie readFile, writeFile, getChildren etc.
    //      nach demselben Muster in async/await umwandeln) ...
    // Beispiel für readFile:
    async readFile(filename, isRemote = false) {
        if (this._type === "local") {
            try {
                const data = storage.get(filename);
                return { data: data ? JSON.parse(data) : null };
            }
            catch (err) {
                throw err;
            }
        }
        await this._checkReady("readFile");
        if (!isRemote && typeof app !== "undefined") {
            return new Promise((resolve, reject) => {
                app.readLocalFile(filename.replace(/^\/vis\.0\//, ""), (err, data, mimeType) => {
                    if (err)
                        reject(err);
                    else
                        resolve({ data, mimeType });
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
            this._socket.emit("readFile", adapter, filename, (err, data, mimeType) => {
                if (err)
                    reject(err);
                else
                    resolve({ data, mimeType });
            });
        });
    }
    // --- Private Hilfsfunktionen ---
    _monitor() {
        if (this._timer)
            return;
        const ts = new Date().getTime();
        if (this._reloadInterval && ts - this._lastTimer > this._reloadInterval * 1000) {
            window.location.reload();
        }
        else {
            this._lastTimer = ts;
        }
        this._timer = setTimeout(() => {
            this._timer = null;
            this._monitor();
        }, 10000);
    }
    _fillChildren(objects) {
        const items = Object.keys(objects).sort();
        for (let i = 0; i < items.length; i++) {
            const id = items[i];
            if (objects[id].common) {
                let j = i + 1;
                const children = [];
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
//# sourceMappingURL=conn.js.map