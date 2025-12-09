
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
	public catchError(error: any, attribute: string): void {
		this.log.error(`[CatchError] ${attribute}: ${error}`);
	}
	public setInterval(callback: (...args: any[]) => void, ms: number, ...args: any[]): any { return setInterval(callback, ms, ...args); }
	public clearInterval(intervalId: any): void { clearInterval(intervalId); }
	public clearTimeout(timeoutId: any): void { clearTimeout(timeoutId); }
	public async getDeviceProtocolVersion(): Promise<string> { return "1.0"; }

	constructor() {
		this.log = {
			info: (msg: string) => console.log(`[INFO] ${msg}`),
			warn: (msg: string) => console.warn(`[WARN] ${msg}`),
			error: (msg: string) => console.error(`[ERROR] ${msg}`),
			debug: () => {},
			silly: () => {}
		};
	}

	public async setObjectAsync(id: string, obj: any): Promise<void> {
		this.objects[id] = obj;
	}

	public async setObjectNotExistsAsync(id: string, obj: any): Promise<void> {
		if (!this.objects[id]) {
			this.objects[id] = obj;
		}
	}

	public async extendObjectAsync(id: string, obj: any): Promise<void> {
		this.objects[id] = { ...this.objects[id], ...obj };
	}

	public async setStateAsync(id: string, state: any): Promise<void> {
		// Handle { val: ... } object or direct value
		let val = state;
		if (typeof state === "object" && state !== null && "val" in state) {
			val = state.val;
		}

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
	}

	public async setStateChangedAsync(id: string, state: any): Promise<void> {
		return this.setStateAsync(id, state);
	}

	public async getStateAsync(id: string): Promise<any> {
		return { val: this.states[id], ack: true };
	}
}
