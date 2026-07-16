export type ApkTouchEventName =
	| "topTouchStart"
	| "topTouchMove"
	| "topTouchEnd"
	| "topTouchCancel";

/** Exact touch object shape assembled by the APK before RCTEventEmitter.receiveTouches. */
export interface ApkTouchPoint {
	identifier: number;
	targetSurface: number;
	target: number;
	timestamp: number;
	pageX: number;
	pageY: number;
	locationX: number;
	locationY: number;
}

export type ApkTouchMotionEvent =
	| {
		eventName: "topTouchStart" | "topTouchEnd";
		touches: readonly ApkTouchPoint[];
		changedIdentifier: number;
	}
	| {
		eventName: "topTouchMove" | "topTouchCancel";
		touches: readonly ApkTouchPoint[];
	};

export interface ApkTouchDispatch {
	eventName: ApkTouchEventName;
	touches: readonly Readonly<ApkTouchPoint>[];
	changedIndices: readonly number[];
}

export interface ApkJavaScriptModuleCaller {
	callJsFunction(moduleName: string, methodName: string, arguments_: readonly unknown[]): Promise<void>;
}

const numericCoordinateKeys = ["pageX", "pageY", "locationX", "locationY"] as const;

function cloneTouch(point: ApkTouchPoint): ApkTouchPoint {
	return {
		identifier: point.identifier,
		targetSurface: point.targetSurface,
		target: point.target,
		timestamp: point.timestamp,
		pageX: point.pageX,
		pageY: point.pageY,
		locationX: point.locationX,
		locationY: point.locationY,
	};
}

function immutableDispatch(
	eventName: ApkTouchEventName,
	touches: readonly ApkTouchPoint[],
	changedIndices: readonly number[],
): ApkTouchDispatch {
	return Object.freeze({
		eventName,
		touches: Object.freeze(touches.map(touch => Object.freeze(cloneTouch(touch)))),
		changedIndices: Object.freeze([...changedIndices]),
	});
}

/**
 * Reproduces the state transition performed between Android MotionEvent and
 * React Native's RCTEventEmitter.receiveTouches. It deliberately knows
 * nothing about maps, rooms, zones or gestures; those stay in the AppPlugin.
 */
export class ApkTouchEventRuntime {
	#activeTouches: ApkTouchPoint[] = [];

	public activeTouches(): readonly Readonly<ApkTouchPoint>[] {
		return Object.freeze(this.#activeTouches.map(touch => Object.freeze(cloneTouch(touch))));
	}

	public dispatch(event: ApkTouchMotionEvent): ApkTouchDispatch {
		const touches = event.touches.map(cloneTouch);
		this.#validatePoints(touches);

		let changedIndices: number[];
		switch (event.eventName) {
			case "topTouchStart":
				changedIndices = this.#validateStart(touches, event.changedIdentifier);
				this.#activeTouches = touches;
				break;
			case "topTouchMove":
				this.#validateExistingPointers(touches);
				changedIndices = touches.map((_touch, index) => index);
				this.#activeTouches = touches;
				break;
			case "topTouchEnd": {
				this.#validateExistingPointers(touches);
				const changedIndex = touches.findIndex(touch => touch.identifier === event.changedIdentifier);
				if (changedIndex < 0) {
					throw new Error(`Touch-Ende referenziert unbekannte Kennung ${event.changedIdentifier}`);
				}
				changedIndices = [changedIndex];
				this.#activeTouches = touches.filter(touch => touch.identifier !== event.changedIdentifier);
				break;
			}
			case "topTouchCancel":
				this.#validateExistingPointers(touches);
				changedIndices = touches.map((_touch, index) => index);
				this.#activeTouches = [];
				break;
		}

		return immutableDispatch(event.eventName, touches, changedIndices);
	}

	#validateStart(touches: readonly ApkTouchPoint[], changedIdentifier: number): number[] {
		if (!Number.isSafeInteger(changedIdentifier) || changedIdentifier < 0) {
			throw new Error("Die geänderte Touch-Kennung muss eine nichtnegative ganze Zahl sein");
		}
		if (this.#activeTouches.some(touch => touch.identifier === changedIdentifier)) {
			throw new Error(`Touch-Kennung ${changedIdentifier} ist bereits aktiv`);
		}
		const changedIndex = touches.findIndex(touch => touch.identifier === changedIdentifier);
		if (changedIndex < 0) {
			throw new Error(`Touch-Start referenziert fehlende Kennung ${changedIdentifier}`);
		}
		if (touches.length !== this.#activeTouches.length + 1) {
			throw new Error("Touch-Start muss genau einen neuen Zeiger enthalten");
		}
		const existingTouches = touches.filter(touch => touch.identifier !== changedIdentifier);
		this.#validateExistingPointers(existingTouches);
		const newTouch = touches[changedIndex];
		const firstActive = existingTouches[0];
		if (firstActive && (newTouch.target !== firstActive.target
			|| newTouch.targetSurface !== firstActive.targetSurface)) {
			throw new Error("Alle Zeiger eines Touch-Ereignisses müssen dasselbe React-Ziel besitzen");
		}
		return [changedIndex];
	}

	#validateExistingPointers(touches: readonly ApkTouchPoint[]): void {
		if (touches.length !== this.#activeTouches.length) {
			throw new Error("Touch-Ereignis enthält nicht genau die aktiven Zeiger");
		}
		for (let index = 0; index < touches.length; index += 1) {
			const current = touches[index];
			const active = this.#activeTouches[index];
			if (current.identifier !== active.identifier) {
				throw new Error("Die Reihenfolge aktiver Touch-Kennungen hat sich unerwartet geändert");
			}
			if (current.target !== active.target || current.targetSurface !== active.targetSurface) {
				throw new Error(`React-Ziel von Touch-Kennung ${current.identifier} darf sich nicht ändern`);
			}
			if (current.timestamp < active.timestamp) {
				throw new Error(`Zeitstempel von Touch-Kennung ${current.identifier} ist rückläufig`);
			}
		}
	}

	#validatePoints(touches: readonly ApkTouchPoint[]): void {
		if (touches.length === 0) throw new Error("Ein APK-Touch-Ereignis benötigt mindestens einen Zeiger");
		const identifiers = new Set<number>();
		const timestamp = touches[0].timestamp;
		const target = touches[0].target;
		const targetSurface = touches[0].targetSurface;
		for (const touch of touches) {
			if (!Number.isSafeInteger(touch.identifier) || touch.identifier < 0) {
				throw new Error("Touch-Kennung muss eine nichtnegative ganze Zahl sein");
			}
			if (identifiers.has(touch.identifier)) {
				throw new Error(`Doppelte Touch-Kennung ${touch.identifier}`);
			}
			identifiers.add(touch.identifier);
			if (!Number.isSafeInteger(touch.targetSurface) || touch.targetSurface < 1) {
				throw new Error("targetSurface muss eine positive ganze Zahl sein");
			}
			if (!Number.isSafeInteger(touch.target) || touch.target < 1) {
				throw new Error("target muss eine positive ganze Zahl sein");
			}
			if (!Number.isFinite(touch.timestamp) || touch.timestamp < 0) {
				throw new Error("Touch-Zeitstempel muss eine nichtnegative endliche Zahl sein");
			}
			for (const key of numericCoordinateKeys) {
				if (!Number.isFinite(touch[key])) throw new Error(`${key} muss eine endliche Zahl sein`);
			}
			if (touch.timestamp !== timestamp) {
				throw new Error("Alle Zeiger eines Touch-Ereignisses müssen denselben Zeitstempel besitzen");
			}
			if (touch.target !== target || touch.targetSurface !== targetSurface) {
				throw new Error("Alle Zeiger eines Touch-Ereignisses müssen dasselbe React-Ziel besitzen");
			}
		}
	}
}

/** Sends the APK-shaped event through the unchanged React Native bridge. */
export class ApkTouchEventDispatcher {
	public constructor(
		private readonly runtime: ApkTouchEventRuntime,
		private readonly jsModuleCaller: ApkJavaScriptModuleCaller,
	) {}

	public async dispatch(event: ApkTouchMotionEvent): Promise<ApkTouchDispatch> {
		const output = this.runtime.dispatch(event);
		await this.jsModuleCaller.callJsFunction("RCTEventEmitter", "receiveTouches", [
			output.eventName,
			output.touches,
			output.changedIndices,
		]);
		return output;
	}
}
