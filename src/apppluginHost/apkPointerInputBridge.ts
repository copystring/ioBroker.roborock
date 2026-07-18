import type { ApkUiHitTestRuntime } from "./apkUiHitTestRuntime";
import { type ApkTouchDispatch, ApkTouchEventDispatcher, type ApkTouchPoint } from "./apkTouchEventRuntime";

interface ActivePointer {
	identifier: number;
	targetSurface: number;
	target: number;
	pageX: number;
	pageY: number;
	locationOffsetX: number;
	locationOffsetY: number;
}

export interface ApkNativePointerObserver {
	pointerDown(
		identifier: number,
		pageX: number,
		pageY: number,
		timestamp: number,
		targetTag: number,
	): Promise<void>;
	pointerMove(identifier: number, pageX: number, pageY: number, timestamp: number): Promise<void>;
	pointerUp(identifier: number, pageX: number, pageY: number, timestamp: number): Promise<void>;
	cancel(): void;
}

export interface ApkPointerMove {
	identifier: number;
	pageX: number;
	pageY: number;
}

/**
 * Converts pointer input from the PC shell into the same touch stream that the
 * APK sends to RCTEventEmitter. It does not interpret map gestures or rooms.
 */
export class ApkPointerInputBridge {
	readonly #activePointers: ActivePointer[] = [];

	public constructor(
		private readonly hitTestRuntime: ApkUiHitTestRuntime,
		private readonly dispatcher: ApkTouchEventDispatcher,
		private readonly nativeObserver?: ApkNativePointerObserver,
	) {}

	public activePointerIds(): readonly number[] {
		return Object.freeze(this.#activePointers.map(pointer => pointer.identifier));
	}

	public async pointerDown(
		identifier: number,
		pageX: number,
		pageY: number,
		timestamp: number
	): Promise<Readonly<ApkTouchDispatch>> {
		this.#validateIdentifier(identifier);
		if (this.#activePointers.some(pointer => pointer.identifier === identifier)) {
			throw new Error(`Zeiger ${identifier} ist bereits aktiv`);
		}
		const anchor = this.#activePointers[0];
		let pointer: ActivePointer;
		if (anchor) {
			pointer = {
				identifier,
				targetSurface: anchor.targetSurface,
				target: anchor.target,
				pageX,
				pageY,
				locationOffsetX: anchor.locationOffsetX,
				locationOffsetY: anchor.locationOffsetY
			};
		} else {
			const hit = this.hitTestRuntime.findTouchTarget(pageX, pageY);
			pointer = {
				identifier,
				targetSurface: hit.targetSurface,
				target: hit.target,
				pageX,
				pageY,
				locationOffsetX: hit.pageX - hit.locationX,
				locationOffsetY: hit.pageY - hit.locationY
			};
		}
		this.#activePointers.push(pointer);
		try {
			await this.nativeObserver?.pointerDown(identifier, pageX, pageY, timestamp, pointer.target);
			return await this.dispatcher.dispatch({
				eventName: "topTouchStart",
				touches: this.#touches(timestamp),
				changedIdentifier: identifier
			});
		} catch (error) {
			this.#activePointers.splice(this.#activePointers.indexOf(pointer), 1);
			throw error;
		}
	}

	public async pointerMove(
		identifier: number,
		pageX: number,
		pageY: number,
		timestamp: number
	): Promise<Readonly<ApkTouchDispatch>> {
		return this.pointerMoves([{ identifier, pageX, pageY }], timestamp);
	}

	/**
	 * Applies every pointer coordinate from one Android ACTION_MOVE before
	 * emitting the single React Native topTouchMove belonging to that frame.
	 */
	public async pointerMoves(
		moves: readonly Readonly<ApkPointerMove>[],
		timestamp: number,
	): Promise<Readonly<ApkTouchDispatch>> {
		if (moves.length === 0) throw new Error("Touch-MOVE benötigt mindestens einen Zeiger");
		this.#validateTimestamp(timestamp);
		const identifiers = new Set<number>();
		const resolved = moves.map(move => {
			if (identifiers.has(move.identifier)) {
				throw new Error(`Touch-MOVE enthält doppelte Zeigerkennung ${move.identifier}`);
			}
			identifiers.add(move.identifier);
			if (!Number.isFinite(move.pageX) || !Number.isFinite(move.pageY)) {
				throw new Error("Touch-MOVE-Koordinaten müssen endliche Zahlen sein");
			}
			return { move, pointer: this.#active(move.identifier) };
		});
		const previousCoordinates = resolved.map(({ pointer }) => ({
			pointer,
			pageX: pointer.pageX,
			pageY: pointer.pageY,
		}));
		for (const { move, pointer } of resolved) {
			pointer.pageX = move.pageX;
			pointer.pageY = move.pageY;
		}
		try {
			for (const { move } of resolved) {
				await this.nativeObserver?.pointerMove(
					move.identifier,
					move.pageX,
					move.pageY,
					timestamp,
				);
			}
			this.#refreshCoordinatesFromCurrentHitTarget();
			return await this.dispatcher.dispatch({
				eventName: "topTouchMove",
				touches: this.#touches(timestamp)
			});
		} catch (error) {
			for (const previous of previousCoordinates) {
				previous.pointer.pageX = previous.pageX;
				previous.pointer.pageY = previous.pageY;
			}
			throw error;
		}
	}

	public async pointerUp(
		identifier: number,
		pageX: number,
		pageY: number,
		timestamp: number
	): Promise<Readonly<ApkTouchDispatch>> {
		const pointer = this.#active(identifier);
		pointer.pageX = pageX;
		pointer.pageY = pageY;
		await this.nativeObserver?.pointerUp(identifier, pageX, pageY, timestamp);
		if (this.#activePointers.length === 1) this.#refreshCoordinatesFromCurrentHitTarget();
		try {
			return await this.dispatcher.dispatch({
				eventName: "topTouchEnd",
				touches: this.#touches(timestamp),
				changedIdentifier: identifier
			});
		} finally {
			this.#activePointers.splice(this.#activePointers.indexOf(pointer), 1);
		}
	}

	public async cancel(timestamp: number): Promise<Readonly<ApkTouchDispatch>> {
		if (this.#activePointers.length === 0) throw new Error("Es gibt keine aktiven Zeiger");
		try {
			this.nativeObserver?.cancel();
			return await this.dispatcher.dispatch({
				eventName: "topTouchCancel",
				touches: this.#touches(timestamp)
			});
		} finally {
			this.#activePointers.splice(0);
		}
	}

	#refreshCoordinatesFromCurrentHitTarget(): void {
		const primary = this.#activePointers[0];
		if (!primary) throw new Error("Touch-Koordinaten benötigen einen aktiven Zeiger");
		const currentHit = this.hitTestRuntime.findTouchTarget(primary.pageX, primary.pageY);
		const locationOffsetX = primary.pageX - currentHit.locationX;
		const locationOffsetY = primary.pageY - currentHit.locationY;
		for (const pointer of this.#activePointers) {
			pointer.locationOffsetX = locationOffsetX;
			pointer.locationOffsetY = locationOffsetY;
		}
	}

	#touches(timestamp: number): readonly ApkTouchPoint[] {
		this.#validateTimestamp(timestamp);
		return this.#activePointers.map(pointer => ({
			identifier: pointer.identifier,
			targetSurface: pointer.targetSurface,
			target: pointer.target,
			timestamp,
			pageX: pointer.pageX,
			pageY: pointer.pageY,
			locationX: pointer.pageX - pointer.locationOffsetX,
			locationY: pointer.pageY - pointer.locationOffsetY
		}));
	}

	#active(identifier: number): ActivePointer {
		this.#validateIdentifier(identifier);
		const pointer = this.#activePointers.find(candidate => candidate.identifier === identifier);
		if (!pointer) throw new Error(`Zeiger ${identifier} ist nicht aktiv`);
		return pointer;
	}

	#validateIdentifier(identifier: number): void {
		if (!Number.isSafeInteger(identifier) || identifier < 0) {
			throw new Error("Zeigerkennung muss eine nichtnegative ganze Zahl sein");
		}
	}

	#validateTimestamp(timestamp: number): void {
		if (!Number.isFinite(timestamp) || timestamp < 0) {
			throw new Error("Touch-Zeitstempel muss eine nichtnegative endliche Zahl sein");
		}
	}
}
