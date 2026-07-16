type NativeAnimatedCallback = (...arguments_: unknown[]) => void;

interface ValueAnimatedNode {
	type: "value";
	value: number;
	offset: number;
}

interface StyleAnimatedNode {
	type: "style";
	mapping: Readonly<Record<string, number>>;
}

interface PropsAnimatedNode {
	type: "props";
	mapping: Readonly<Record<string, number>>;
	viewTag?: number;
	lastPropNames: Set<string>;
}

interface TransformAnimatedNode {
	type: "transform";
	transforms: readonly (
		| Readonly<{ type: "animated"; property: string; nodeTag: number }>
		| Readonly<{ type: "static"; property: string; value: number }>
	)[];
}

type SupportedAnimatedNode = ValueAnimatedNode | StyleAnimatedNode | PropsAnimatedNode | TransformAnimatedNode;

interface ActiveFrameAnimation {
	id: number;
	nodeTag: number;
	handles: Set<unknown>;
	callback?: NativeAnimatedCallback;
	settled: boolean;
}

interface AnimatedEventBinding {
	viewTag: number;
	eventName: string;
	valueTag: number;
	path: readonly string[];
}

export interface ApkNativeAnimatedRuntimeOptions {
	updateView(tag: number, props: Readonly<Record<string, unknown>>): void;
	restoreDefaultViewProps(tag: number, propNames: readonly string[]): void;
	emitDeviceEvent?(eventName: string, payload: unknown): void;
	onViewUpdate?(): void;
	schedule?(callback: () => void, delayMs: number): unknown;
	cancelScheduled?(handle: unknown): void;
	frameDurationMs?: number;
}

function record(value: unknown, name: string): Record<string, unknown> {
	if (value === null || typeof value !== "object" || Array.isArray(value)) {
		throw new Error(`${name} muss ein Objekt sein`);
	}
	return value as Record<string, unknown>;
}

function finite(value: unknown, name: string): number {
	if (typeof value !== "number" || !Number.isFinite(value)) throw new Error(`${name} muss endlich sein`);
	return value;
}

function integer(value: unknown, name: string): number {
	const result = Math.trunc(finite(value, name));
	if (result < 0) throw new Error(`${name} muss eine nichtnegative ganze Zahl sein`);
	return result;
}

function stringValue(value: unknown, name: string): string {
	if (typeof value !== "string") throw new Error(`${name} muss eine Zeichenfolge sein`);
	return value;
}

function nodeMapping(value: unknown, name: string): Readonly<Record<string, number>> {
	const source = record(value, name);
	return Object.freeze(Object.fromEntries(Object.entries(source).map(([key, nodeTag]) => [
		key,
		integer(nodeTag, `${name}.${key}`),
	])));
}

function normalizedEventName(eventName: string): string {
	return eventName.startsWith("on") ? `top${eventName.slice(2)}` : eventName;
}

/**
 * Reproduces the APK's NativeAnimatedModule graph boundary. The implementation
 * intentionally owns only native React-Native behavior; visual values and
 * animation frame curves continue to come unchanged from the AppPlugin.
 */
export class ApkNativeAnimatedRuntime {
	readonly #nodes = new Map<number, SupportedAnimatedNode>();
	readonly #children = new Map<number, Set<number>>();
	readonly #animations = new Map<number, ActiveFrameAnimation>();
	readonly #eventBindings: AnimatedEventBinding[] = [];
	readonly #listeningValueTags = new Set<number>();
	readonly #schedule: (callback: () => void, delayMs: number) => unknown;
	readonly #cancelScheduled: (handle: unknown) => void;
	readonly #frameDurationMs: number;
	#batching = false;
	#operations: Array<() => void> = [];
	#preOperations: Array<() => void> = [];

	public constructor(private readonly options: ApkNativeAnimatedRuntimeOptions) {
		this.#frameDurationMs = options.frameDurationMs ?? 16.666667;
		if (!Number.isFinite(this.#frameDurationMs) || this.#frameDurationMs <= 0) {
			throw new Error("NativeAnimated-Framezeit muss positiv und endlich sein");
		}
		this.#schedule = options.schedule ?? ((callback, delayMs) => {
			const handle = setTimeout(callback, delayMs);
			handle.unref();
			return handle;
		});
		this.#cancelScheduled = options.cancelScheduled ?? (handle => clearTimeout(handle as NodeJS.Timeout));
	}

	public readonly addListener = (_eventName: string): void => undefined;
	public readonly removeListeners = (_count: number): void => undefined;

	public readonly createAnimatedNode = (tagValue: number, configValue: unknown): void => {
		this.#operation(() => {
			const tag = integer(tagValue, "Animated-Node-Tag");
			if (this.#nodes.has(tag)) throw new Error(`Animated Node ${tag} existiert bereits`);
			this.#nodes.set(tag, this.#createNode(configValue));
		});
	};

	public readonly connectAnimatedNodes = (parentValue: number, childValue: number): void => {
		this.#operation(() => {
			const parent = integer(parentValue, "Parent-Node-Tag");
			const child = integer(childValue, "Child-Node-Tag");
			this.#node(parent);
			this.#node(child);
			const children = this.#children.get(parent) ?? new Set<number>();
			children.add(child);
			this.#children.set(parent, children);
			this.#propagateFrom(parent);
		});
	};

	public readonly disconnectAnimatedNodes = (parentValue: number, childValue: number): void => {
		this.#operation(() => {
			const parent = integer(parentValue, "Parent-Node-Tag");
			const child = integer(childValue, "Child-Node-Tag");
			this.#node(parent);
			this.#node(child);
			this.#children.get(parent)?.delete(child);
		});
	};

	public readonly connectAnimatedNodeToView = (nodeValue: number, viewValue: number): void => {
		this.#operation(() => {
			const nodeTag = integer(nodeValue, "Props-Node-Tag");
			const node = this.#propsNode(nodeTag);
			if (node.viewTag !== undefined) throw new Error(`Props-Node ${nodeTag} ist bereits an eine View gebunden`);
			node.viewTag = integer(viewValue, "View-Tag");
			this.#propagateFrom(nodeTag);
		});
	};

	public readonly disconnectAnimatedNodeFromView = (nodeValue: number, viewValue: number): void => {
		this.#operation(() => {
			const nodeTag = integer(nodeValue, "Props-Node-Tag");
			const viewTag = integer(viewValue, "View-Tag");
			const node = this.#propsNode(nodeTag);
			if (node.viewTag !== undefined && node.viewTag !== viewTag) {
				throw new Error(`Props-Node ${nodeTag} ist nicht an View ${viewTag} gebunden`);
			}
			node.viewTag = undefined;
		});
	};

	public readonly restoreDefaultValues = (nodeValue: number): void => {
		this.#preOperation(() => {
			const node = this.#propsNode(integer(nodeValue, "Props-Node-Tag"));
			if (node.viewTag === undefined || node.lastPropNames.size === 0) return;
			this.options.restoreDefaultViewProps(node.viewTag, [...node.lastPropNames]);
			node.lastPropNames.clear();
			this.options.onViewUpdate?.();
		});
	};

	public readonly setAnimatedNodeValue = (nodeValue: number, value: number): void => {
		this.#operation(() => {
			const nodeTag = integer(nodeValue, "Value-Node-Tag");
			this.#stopAnimationsForNode(nodeTag);
			this.#setValue(nodeTag, finite(value, "Animated-Wert"));
		});
	};

	public readonly setAnimatedNodeOffset = (nodeValue: number, offset: number): void => {
		this.#operation(() => {
			const nodeTag = integer(nodeValue, "Value-Node-Tag");
			this.#valueNode(nodeTag).offset = finite(offset, "Animated-Offset");
			this.#propagateFrom(nodeTag);
		});
	};

	public readonly flattenAnimatedNodeOffset = (nodeValue: number): void => {
		this.#operation(() => {
			const nodeTag = integer(nodeValue, "Value-Node-Tag");
			const node = this.#valueNode(nodeTag);
			node.value += node.offset;
			node.offset = 0;
			this.#propagateFrom(nodeTag);
		});
	};

	public readonly extractAnimatedNodeOffset = (nodeValue: number): void => {
		this.#operation(() => {
			const nodeTag = integer(nodeValue, "Value-Node-Tag");
			const node = this.#valueNode(nodeTag);
			node.offset += node.value;
			node.value = 0;
			this.#propagateFrom(nodeTag);
		});
	};

	public readonly getValue = (nodeValue: number, callback: NativeAnimatedCallback): void => {
		const node = this.#valueNode(integer(nodeValue, "Value-Node-Tag"));
		callback(node.value + node.offset);
	};

	public readonly startAnimatingNode = (
		animationValue: number,
		nodeValue: number,
		configValue: unknown,
		callback?: NativeAnimatedCallback | null,
	): void => {
		this.#operation(() => this.#startFrameAnimation(
			integer(animationValue, "Animations-ID"),
			integer(nodeValue, "Value-Node-Tag"),
			configValue,
			callback ?? undefined,
		));
	};

	public readonly stopAnimation = (animationValue: number): void => {
		this.#operation(() => this.#finishAnimation(integer(animationValue, "Animations-ID"), false));
	};

	public readonly dropAnimatedNode = (nodeValue: number): void => {
		this.#operation(() => {
			const nodeTag = integer(nodeValue, "Animated-Node-Tag");
			this.#stopAnimationsForNode(nodeTag);
			this.#nodes.delete(nodeTag);
			this.#children.delete(nodeTag);
			for (const children of this.#children.values()) children.delete(nodeTag);
		});
	};

	public readonly startListeningToAnimatedNodeValue = (nodeValue: number): void => {
		this.#operation(() => {
			const nodeTag = integer(nodeValue, "Value-Node-Tag");
			this.#valueNode(nodeTag);
			this.#listeningValueTags.add(nodeTag);
		});
	};

	public readonly stopListeningToAnimatedNodeValue = (nodeValue: number): void => {
		this.#operation(() => this.#listeningValueTags.delete(integer(nodeValue, "Value-Node-Tag")));
	};

	public readonly addAnimatedEventToView = (viewValue: number, eventValue: string, configValue: unknown): void => {
		this.#operation(() => {
			const config = record(configValue, "Animated-Event-Konfiguration");
			const valueTag = integer(config.animatedValueTag, "animatedValueTag");
			this.#valueNode(valueTag);
			if (!Array.isArray(config.nativeEventPath) || !config.nativeEventPath.every(item => typeof item === "string")) {
				throw new Error("nativeEventPath muss eine Liste von Zeichenfolgen sein");
			}
			this.#eventBindings.push({
				viewTag: integer(viewValue, "View-Tag"),
				eventName: normalizedEventName(stringValue(eventValue, "Eventname")),
				valueTag,
				path: [...config.nativeEventPath] as string[],
			});
		});
	};

	public readonly removeAnimatedEventFromView = (
		viewValue: number,
		eventValue: string,
		nodeValue: number,
	): void => {
		this.#operation(() => {
			const viewTag = integer(viewValue, "View-Tag");
			const eventName = normalizedEventName(stringValue(eventValue, "Eventname"));
			const nodeTag = integer(nodeValue, "Value-Node-Tag");
			const index = this.#eventBindings.findIndex(binding =>
				binding.viewTag === viewTag && binding.eventName === eventName && binding.valueTag === nodeTag,
			);
			if (index >= 0) this.#eventBindings.splice(index, 1);
		});
	};

	public dispatchAnimatedEvent(viewTag: number, eventName: string, payload: unknown): void {
		for (const binding of this.#eventBindings) {
			if (binding.viewTag !== viewTag || binding.eventName !== normalizedEventName(eventName)) continue;
			let value: unknown = payload;
			for (const segment of binding.path) value = record(value, `Eventpfad ${segment}`)[segment];
			this.#setValue(binding.valueTag, finite(value, "Animated-Event-Wert"));
		}
	}

	public readonly updateAnimatedNodeConfig = (nodeValue: number, _configValue: unknown): void => {
		this.#operation(() => this.#node(integer(nodeValue, "Animated-Node-Tag")));
	};

	public readonly startOperationBatch = (): void => {
		this.#batching = true;
	};

	public readonly finishOperationBatch = (): void => {
		this.#batching = false;
		const preOperations = this.#preOperations.splice(0);
		const operations = this.#operations.splice(0);
		for (const operation of preOperations) operation();
		for (const operation of operations) operation();
	};

	public readonly queueAndExecuteBatchedOperations = (_operations: readonly unknown[]): void => {
		throw new Error("Der binäre NativeAnimated-Batchpfad ist noch nicht aus der APK nachgebildet");
	};

	public dispose(): void {
		for (const animationId of [...this.#animations.keys()]) this.#finishAnimation(animationId, false);
	}

	#createNode(configValue: unknown): SupportedAnimatedNode {
		const config = record(configValue, "Animated-Node-Konfiguration");
		const type = stringValue(config.type, "Animated-Node-Typ");
		if (type === "value") {
			return {
				type,
				value: finite(config.value, "value"),
				offset: config.offset === undefined ? 0 : finite(config.offset, "offset"),
			};
		}
		if (type === "style") return { type, mapping: nodeMapping(config.style, "style") };
		if (type === "props") return { type, mapping: nodeMapping(config.props, "props"), lastPropNames: new Set() };
		if (type === "transform") {
			if (!Array.isArray(config.transforms)) throw new Error("transforms muss eine Liste sein");
			return {
				type,
				transforms: config.transforms.map((value, index) => {
					const transform = record(value, `transforms[${index}]`);
					const property = stringValue(transform.property, `transforms[${index}].property`);
					const transformType = stringValue(transform.type, `transforms[${index}].type`);
					return transformType === "animated"
						? { type: "animated" as const, property, nodeTag: integer(transform.nodeTag, `transforms[${index}].nodeTag`) }
						: { type: "static" as const, property, value: finite(transform.value, `transforms[${index}].value`) };
				}),
			};
		}
		throw new Error(`APK-NativeAnimated-Node-Typ ${type} ist noch nicht nachgebildet`);
	}

	#node(tag: number): SupportedAnimatedNode {
		const node = this.#nodes.get(tag);
		if (!node) throw new Error(`Animated Node ${tag} existiert nicht`);
		return node;
	}

	#valueNode(tag: number): ValueAnimatedNode {
		const node = this.#node(tag);
		if (node.type !== "value") throw new Error(`Animated Node ${tag} ist kein Value-Node`);
		return node;
	}

	#propsNode(tag: number): PropsAnimatedNode {
		const node = this.#node(tag);
		if (node.type !== "props") throw new Error(`Animated Node ${tag} ist kein Props-Node`);
		return node;
	}

	#operation(operation: () => void): void {
		if (this.#batching) this.#operations.push(operation);
		else operation();
	}

	#preOperation(operation: () => void): void {
		if (this.#batching) this.#preOperations.push(operation);
		else operation();
	}

	#setValue(nodeTag: number, value: number): void {
		const node = this.#valueNode(nodeTag);
		node.value = value;
		if (this.#listeningValueTags.has(nodeTag)) {
			this.options.emitDeviceEvent?.("onAnimatedValueUpdate", { tag: nodeTag, value: node.value + node.offset });
		}
		this.#propagateFrom(nodeTag);
	}

	#propagateFrom(nodeTag: number): void {
		const reachable = new Set<number>();
		const pending = [nodeTag];
		while (pending.length > 0) {
			const current = pending.pop() as number;
			if (reachable.has(current)) continue;
			reachable.add(current);
			for (const child of this.#children.get(current) ?? []) pending.push(child);
		}
		for (const tag of reachable) {
			const node = this.#nodes.get(tag);
			if (node?.type === "props") this.#applyPropsNode(node);
		}
	}

	#applyPropsNode(node: PropsAnimatedNode): void {
		if (node.viewTag === undefined) return;
		const props: Record<string, unknown> = {};
		for (const [propName, mappedTag] of Object.entries(node.mapping)) {
			const value = this.#evaluateNode(mappedTag, new Set());
			if (value !== null && typeof value === "object" && !Array.isArray(value)) Object.assign(props, value);
			else props[propName] = value;
		}
		node.lastPropNames = new Set(Object.keys(props));
		this.options.updateView(node.viewTag, props);
		this.options.onViewUpdate?.();
	}

	#evaluateNode(tag: number, visiting: Set<number>): unknown {
		if (visiting.has(tag)) throw new Error(`Zyklus im Animated-Node-Graph bei ${tag}`);
		visiting.add(tag);
		const node = this.#node(tag);
		try {
			if (node.type === "value") return node.value + node.offset;
			if (node.type === "style") {
				return Object.fromEntries(Object.entries(node.mapping).map(([name, childTag]) => [
					name,
					this.#evaluateNode(childTag, visiting),
				]));
			}
			if (node.type === "transform") {
				return node.transforms.map(transform => ({
					[transform.property]: transform.type === "animated"
						? this.#evaluateNode(transform.nodeTag, visiting)
						: transform.value,
				}));
			}
			throw new Error(`Props-Node ${tag} darf nicht als Property-Wert verwendet werden`);
		} finally {
			visiting.delete(tag);
		}
	}

	#startFrameAnimation(
		animationId: number,
		nodeTag: number,
		configValue: unknown,
		callback?: NativeAnimatedCallback,
	): void {
		const node = this.#valueNode(nodeTag);
		this.#finishAnimation(animationId, false);
		const config = record(configValue, "Animationskonfiguration");
		if (config.type !== "frames") throw new Error(`Animations-Typ ${String(config.type)} ist noch nicht nachgebildet`);
		if (!Array.isArray(config.frames) || config.frames.length === 0) throw new Error("frames muss eine nichtleere Liste sein");
		const frames = config.frames.map((value, index) => finite(value, `frames[${index}]`));
		const toValue = finite(config.toValue, "toValue");
		const iterations = config.iterations === undefined ? 1 : integer(config.iterations, "iterations");
		if (iterations !== 1) throw new Error(`Frame-Animationen mit ${iterations} Iterationen sind noch nicht nachgebildet`);
		const startValue = node.value;
		const animation: ActiveFrameAnimation = {
			id: animationId,
			nodeTag,
			handles: new Set(),
			callback,
			settled: false,
		};
		this.#animations.set(animationId, animation);
		frames.forEach((progress, index) => {
			const handle = this.#schedule(() => {
				animation.handles.delete(handle);
				if (animation.settled || this.#animations.get(animationId) !== animation) return;
				this.#setValue(nodeTag, index === frames.length - 1
					? toValue
					: startValue + (toValue - startValue) * progress);
				if (index === frames.length - 1) this.#finishAnimation(animationId, true);
			}, (index + 1) * this.#frameDurationMs);
			animation.handles.add(handle);
		});
	}

	#stopAnimationsForNode(nodeTag: number): void {
		for (const animation of [...this.#animations.values()]) {
			if (animation.nodeTag === nodeTag) this.#finishAnimation(animation.id, false);
		}
	}

	#finishAnimation(animationId: number, finished: boolean): void {
		const animation = this.#animations.get(animationId);
		if (!animation || animation.settled) return;
		animation.settled = true;
		this.#animations.delete(animationId);
		for (const handle of animation.handles) this.#cancelScheduled(handle);
		animation.handles.clear();
		const node = this.#nodes.get(animation.nodeTag);
		const value = node?.type === "value" ? node.value : 0;
		animation.callback?.({ finished, value });
	}
}
