
export class MockAdapter {
	public objects: Record<string, any> = {};
	public states: Record<string, any> = {};
	public log: any;
	public config: any = {};
	public requestsHandler: any;
	public mqtt_api: any;
	public local_api: any;
	public http_api: any;
	// mock support methods
	public instance: number = 0;
	public pendingRequests: Map<number, any> = new Map();
	public nonce: Buffer = Buffer.alloc(16);
	public translations: Record<string, string> = {};
	public logLevel: "debug" | "info" | "warn" | "error" = "warn";

	private logLevels = { debug: 0, info: 1, warn: 2, error: 3 };

	public catchError(error: any, attribute: string): void {
		this.log.error(`[CatchError] ${attribute}: ${error}`);
	}
	public setInterval(callback: (...args: any[]) => void, ms: number, ...args: any[]): any { return setInterval(callback, ms, ...args); }
	public clearInterval(intervalId: any): void { clearInterval(intervalId); }
	public clearTimeout(timeoutId: any): void { clearTimeout(timeoutId); }
	public getDeviceProtocolVersion = async (): Promise<string> => {
		// console.log("[MockAdapter] getDeviceProtocolVersion called");
		return "1.0";
	};

	public rLog(connection: "MQTT" | "TCP" | "UDP" | "HTTP" | "Cloud" | "Local" | "System" | "MapManager" | "Requests" | "Unknown", duid: string | null | undefined, direction: "<-" | "->" | "Info" | "Error" | "Warn" | "Debug", version: string | undefined, protocol: string | number | undefined, message: string, level: "debug" | "info" | "warn" | "error" = "debug"): void {
		if (this.logLevels[level] < this.logLevels[this.logLevel]) return;

		const duidStr = duid ? `[${duid}] ` : "";
		const versionStr = version ? ` (PV: ${version})` : "";
		const protoStr = protocol ? ` (P: ${protocol})` : "";
		const logMsg = `[${connection}] ${duidStr}${direction}${versionStr}${protoStr} ${message}`;

		if (this.log[level]) {
			this.log[level](logMsg);
		} else {
			console.log(`[FALLBACK-${level}] ${logMsg}`);
		}
	}

	private logMessage(level: "debug" | "info" | "warn" | "error", msg: string, logFn: (m: string) => void): void {
		if (this.logLevels[level] >= this.logLevels[this.logLevel]) {
			logFn(`[${level.toUpperCase()}] ${msg}`);
		}
	}

	constructor() {
		this.log = {
			info: (msg: string) => this.logMessage("info", msg, console.log),
			warn: (msg: string) => this.logMessage("warn", msg, console.warn),
			error: (msg: string) => this.logMessage("error", msg, console.error),
			debug: (msg: string) => this.logMessage("debug", msg, console.log),
			silly: () => {}
		};
		this.setState = this.setState.bind(this);
		this.setStateAsync = this.setStateAsync.bind(this);
		this.setStateChanged = this.setStateChanged.bind(this);
		this.http_api = {
			getMatchedRoomIDs: () => [],
			getRobotModel: () => "",
			getFwFeaturesResult: () => ({}),
			storeFwFeaturesResult: () => {}
		};
	}

	public async setObject(id: string, obj: any): Promise<void> {
		this.objects[id] = obj;
	}

	public async setObjectNotExistsAsync(id: string, obj: any): Promise<void> {
		if (!this.objects[id]) {
			this.objects[id] = obj;
		}
	}

	public extendObject = async (id: string, obj: any): Promise<void> => {
		this.objects[id] = { ...this.objects[id], ...obj };
	};


	public async getObjectAsync(id: string): Promise<any> {
		return this.objects[id];
	}



	public setState = (id: string, state: any, ack?: boolean | ((err?: any) => void), callback?: (err?: any) => void): Promise<void> => {
		if (typeof ack === "function") {
			callback = ack;
			ack = undefined;
		}
		// Fire and forget / callback style
		return this.setStateAsync(id, state).then(() => {
			if (callback) callback();
		}).catch((e) => {
			if (callback) callback(e);
			throw e;
		});
	};

	public setStateAsync = async (id: string, state: any): Promise<void> => {
		// Handle { val: ... } object or direct value
		let val = state;
		if (typeof state === "object" && state !== null && "val" in state) {
			val = state.val;
		}

		this.rLog("System", id, "Debug", undefined, undefined, `Setting state to ${val}`, "debug");
		this.states[id] = val;

		// Type Verification
		const obj = this.objects[id];
		if (obj && obj.common && obj.common.type) {
			const expectedType = obj.common.type;
			const actualType = typeof val;

			if (expectedType === "array" || expectedType === "object") {
				if (actualType !== "object" && actualType !== "string") { // Strings are sometimes allowed for JSON
					throw new Error(`Type mismatch for ${id}. Expected ${expectedType}, got ${actualType} (${val})`);
				}
			} else if (expectedType === "mixed") {
				// Any type allowable
			} else if (actualType !== expectedType) {
				// Allow number/string auto-conversion if simple
				if (expectedType === "string" && actualType === "number") return;

				// Optional: Allow null if not strictly forbidden? Usually ioBroker allows null.
				if (val === null || val === undefined) return;

				// Strict check for others
				throw new Error(`Type mismatch for ${id}. Expected ${expectedType}, got ${actualType} (${val})`);
			}
		}
	};

	public setStateChanged = async (id: string, state: any, ack?: boolean | ((err?: any) => void), callback?: (err?: any) => void): Promise<void> => {
		if (typeof ack === "function") {
			callback = ack;
			ack = undefined;
		}

		let val = state;
		if (typeof state === "object" && state !== null && "val" in state) {
			val = state.val;
		}

		if (this.states[id] !== val) {
			await this.setStateAsync(id, state);
		}

		try {
			if (callback) callback();
		} catch (e: any) {
			if (callback) callback(e);
			throw e;
		}
	};

	public async getStatesAsync(pattern: string): Promise<Record<string, ioBroker.State> | null> {
		const result: Record<string, ioBroker.State> = {};
		const regexPattern = new RegExp("^" + pattern.replace(/\./g, "\\.").replace(/\*/g, ".*") + "$");

		for (const id in this.states) {
			if (regexPattern.test(id)) {
				result[id] = { val: this.states[id], ack: true, ts: Date.now(), lc: Date.now(), from: "mock" };
			}
		}

		return Object.keys(result).length > 0 ? result : null;
	}

	public async getStateAsync(id: string): Promise<any> {
		return { val: this.states[id], ack: true };
	}
	public async expectState(id: string, expected: Partial<ioBroker.State>): Promise<void> {
		const state = this.states[id];
		if (state === undefined) {
			throw new Error(`State ${id} not found`);
		}
		if (expected.val !== undefined && state !== expected.val) {
			throw new Error(`State ${id} expected ${expected.val} but got ${state}`);
		}
	}
}
