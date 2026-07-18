export const APK_GESTURE_HANDLER_STATES = Object.freeze({
	UNDETERMINED: 0,
	FAILED: 1,
	BEGAN: 2,
	CANCELLED: 3,
	ACTIVE: 4,
	END: 5,
});

export const APK_GESTURE_HANDLER_DIRECTIONS = Object.freeze({
	RIGHT: 1,
	LEFT: 2,
	UP: 4,
	DOWN: 8,
});

export interface ApkGestureHandlerSnapshot {
	readonly tag: number;
	readonly handlerName: string;
	readonly config: Readonly<Record<string, unknown>>;
	readonly viewTag?: number;
	readonly actionType?: number;
}

interface MutableGestureHandler {
	tag: number;
	handlerName: string;
	config: Record<string, unknown>;
	viewTag?: number;
	actionType?: number;
}

const APK_GESTURE_HANDLER_NAMES = new Set([
	"FlingGestureHandler",
	"HoverGestureHandler",
	"LongPressGestureHandler",
	"ManualGestureHandler",
	"NativeViewGestureHandler",
	"PanGestureHandler",
	"PinchGestureHandler",
	"RotationGestureHandler",
	"TapGestureHandler",
]);

function integerTag(value: number, name: string): number {
	if (!Number.isInteger(value) || value < 0) {
		throw new Error(`${name} muss eine nichtnegative ganze Zahl sein`);
	}
	return value;
}

function cloneConfig(config: Readonly<Record<string, unknown>>): Record<string, unknown> {
	return structuredClone(config);
}

/**
 * Desktop counterpart of the APK RNGestureHandlerModule bookkeeping.
 *
 * Android performs recognition in its View hierarchy. The desktop host already
 * recognizes pointer input in ApkPointerInputBridge, but the unchanged
 * AppPlugin still requires the APK module's constants and handler lifecycle
 * while mounting editable map overlays.
 */
export class ApkGestureHandlerRuntime {
	readonly #handlers = new Map<number, MutableGestureHandler>();

	public createGestureHandler(
		handlerName: string,
		handlerTag: number,
		config: Readonly<Record<string, unknown>>,
	): void {
		const tag = integerTag(handlerTag, "handlerTag");
		if (!APK_GESTURE_HANDLER_NAMES.has(handlerName)) {
			throw new Error(`Ungültiger APK-Gesture-Handler ${handlerName}`);
		}
		if (this.#handlers.has(tag)) {
			throw new Error(`Gesture-Handler mit Tag ${tag} existiert bereits`);
		}
		this.#handlers.set(tag, {
			tag,
			handlerName,
			config: cloneConfig(config),
		});
	}

	public attachGestureHandler(handlerTag: number, viewTag: number, actionType: number): void {
		const tag = integerTag(handlerTag, "handlerTag");
		const handler = this.#handlers.get(tag);
		if (!handler) throw new Error(`Gesture-Handler mit Tag ${tag} existiert nicht`);
		handler.viewTag = integerTag(viewTag, "viewTag");
		handler.actionType = integerTag(actionType, "actionType");
	}

	public updateGestureHandler(handlerTag: number, config: Readonly<Record<string, unknown>>): void {
		const tag = integerTag(handlerTag, "handlerTag");
		const handler = this.#handlers.get(tag);
		if (!handler) return;
		handler.config = cloneConfig(config);
	}

	public dropGestureHandler(handlerTag: number): void {
		this.#handlers.delete(integerTag(handlerTag, "handlerTag"));
	}

	public flushOperations(): void {
		// The APK method is intentionally empty.
	}

	public handleClearJSResponder(): void {
		// The APK method is intentionally empty.
	}

	public handleSetJSResponder(_viewTag: number, _blockNativeResponder: boolean): void {
		// Android forwards this to the native root helper. Desktop pointer
		// ownership remains in ApkPointerInputBridge.
	}

	public install(): boolean {
		return true;
	}

	public snapshot(): ApkGestureHandlerSnapshot[] {
		return [...this.#handlers.values()]
			.sort((left, right) => left.tag - right.tag)
			.map(handler => structuredClone(handler));
	}
}
