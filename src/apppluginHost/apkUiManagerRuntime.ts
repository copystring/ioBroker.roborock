import type { ApkNativeModuleConstants } from "./apkBridgeBootstrap";
import type {
	ApkAppPluginHostContract,
	ApkBubblingEventContract,
	ApkDirectEventContract,
	ApkViewManagerContract,
} from "./apkContract";

export interface ApkUiManagerNodeSnapshot {
	tag: number;
	viewName: string;
	rootTag: number;
	props: Readonly<Record<string, unknown>>;
	children: readonly ApkUiManagerNodeSnapshot[];
}

export interface ApkUiManagerOperation {
	method: string;
	arguments: readonly unknown[];
}

export interface ApkUiManagerOperationJournal {
	offset: number;
	total: number;
	operations: readonly ApkUiManagerOperation[];
}

export interface ApkNativeMeasuredBox {
	x: number;
	y: number;
	width: number;
	height: number;
}

type ApkUiManagerCallback = (...arguments_: unknown[]) => void;

interface PendingNativeMeasurement {
	kind: "measure" | "measureInWindow";
	tag: number;
	callback: ApkUiManagerCallback;
}

interface MutableNode {
	tag: number;
	viewName: string;
	rootTag: number;
	props: Record<string, unknown>;
	children: number[];
	parentTag?: number;
}

const visualUiManagerOperations = new Set([
	"createView",
	"dispatchViewManagerCommand",
	"manageChildren",
	"removeRootView",
	"removeSubviewsFromContainerWithID",
	"replaceExistingNonRootView",
	"setChildren",
	"updateView",
]);

export class ApkUiLayoutUnavailableError extends Error {
	public constructor(methodName: string) {
		super(`UIManager.${methodName} benötigt die noch nicht nachgebildete APK-Layoutausführung.`);
		this.name = "ApkUiLayoutUnavailableError";
	}
}

const genericBubblingEventTypes = {
	topChange: { phasedRegistrationNames: { bubbled: "onChange", captured: "onChangeCapture" } },
	topSelect: { phasedRegistrationNames: { bubbled: "onSelect", captured: "onSelectCapture" } },
	topTouchStart: { phasedRegistrationNames: { bubbled: "onTouchStart", captured: "onTouchStartCapture" } },
	topTouchMove: { phasedRegistrationNames: { bubbled: "onTouchMove", captured: "onTouchMoveCapture" } },
	topTouchEnd: { phasedRegistrationNames: { bubbled: "onTouchEnd", captured: "onTouchEndCapture" } },
	topTouchCancel: { phasedRegistrationNames: { bubbled: "onTouchCancel", captured: "onTouchCancelCapture" } },
} as const;

const genericDirectEventTypes = {
	topContentSizeChange: { registrationName: "onContentSizeChange" },
	topLayout: { registrationName: "onLayout" },
	topLoadingError: { registrationName: "onLoadingError" },
	topLoadingFinish: { registrationName: "onLoadingFinish" },
	topLoadingStart: { registrationName: "onLoadingStart" },
	topSelectionChange: { registrationName: "onSelectionChange" },
	topMessage: { registrationName: "onMessage" },
	topScrollBeginDrag: { registrationName: "onScrollBeginDrag" },
	topScrollEndDrag: { registrationName: "onScrollEndDrag" },
	topScroll: { registrationName: "onScroll" },
	topMomentumScrollBegin: { registrationName: "onMomentumScrollBegin" },
	topMomentumScrollEnd: { registrationName: "onMomentumScrollEnd" },
} as const;

function bubblingEventType(event: ApkBubblingEventContract): Readonly<Record<string, unknown>> {
	const phasedRegistrationNames: Record<string, unknown> = {
		bubbled: event.bubbled,
		captured: event.captured,
	};
	if (event.skipBubbling) phasedRegistrationNames.skipBubbling = true;
	return { phasedRegistrationNames };
}

function directEventType(event: ApkDirectEventContract): Readonly<Record<string, unknown>> {
	return { registrationName: event.registrationName };
}

function viewManagerConfig(viewManager: ApkViewManagerContract): Readonly<Record<string, unknown>> {
	if (viewManager.viewConstantsStatus === "unparsed") {
		throw new Error(
			`APK-View-Konstanten von ${viewManager.viewName} sind belegt, aber noch nicht verlustfrei dekodiert.`,
		);
	}
	const config: Record<string, unknown> = {};
	if (viewManager.bubblingEventTypes.length > 0) {
		config.bubblingEventTypes = Object.fromEntries(
			viewManager.bubblingEventTypes.map(event => [event.topLevelName, bubblingEventType(event)]),
		);
	}
	if (viewManager.directEventTypes.length > 0) {
		config.directEventTypes = Object.fromEntries(
			viewManager.directEventTypes.map(event => [event.topLevelName, directEventType(event)]),
		);
	}
	if (viewManager.viewConstants.length > 0) {
		config.Constants = Object.fromEntries(viewManager.viewConstants.map(constant => [constant.name, constant.value]));
	}
	if (viewManager.commands.length > 0) {
		config.Commands = Object.fromEntries(viewManager.commands.map(command => [command.name, command.value]));
	}
	if (viewManager.nativeProps.length > 0) {
		config.NativeProps = Object.fromEntries(viewManager.nativeProps.map(prop => [prop.name, prop.type]));
	}
	return config;
}

export function resolveEffectiveApkViewManagers(
	contract: ApkAppPluginHostContract,
): ApkViewManagerContract[] {
	const ordered = contract.viewManagers
		.filter(viewManager => viewManager.installedByHost)
		.sort((left, right) =>
			Math.min(...left.hostPackageIndices) - Math.min(...right.hostPackageIndices),
		);
	const effective = new Map<string, ApkViewManagerContract>();
	for (const viewManager of ordered) effective.set(viewManager.viewName, viewManager);
	return [...effective.values()];
}

/** Reproduces UIManagerModule.createConstants(ViewManagerResolver) from the APK. */
export function createApkUiManagerConstants(
	contract: ApkAppPluginHostContract,
): ApkNativeModuleConstants {
	return {
		UIManager: {
			ViewManagerNames: resolveEffectiveApkViewManagers(contract).map(viewManager => viewManager.viewName),
			LazyViewManagersEnabled: true,
		},
	};
}

export function createApkDefaultEventTypes(): Readonly<Record<string, unknown>> {
	return {
		bubblingEventTypes: genericBubblingEventTypes,
		directEventTypes: genericDirectEventTypes,
	};
}

/**
 * Host-side representation of the legacy UIManager path used by the APK.
 * It preserves React tags, parent/child ordering and the APK-derived
 * ViewManager configs while layout-dependent calls remain explicit gates.
 */
export class ApkUiManagerRuntime {
	readonly #viewManagers: Map<string, ApkViewManagerContract>;
	readonly #nodes = new Map<number, MutableNode>();
	readonly #operations: ApkUiManagerOperation[] = [];
	readonly #pendingNativeMeasurements: PendingNativeMeasurement[] = [];
	#jsResponder?: { tag: number; blockNativeResponder: boolean };
	#visualMutationRevision = 0;
	#operationOffset = 0;
	#operationCount = 0;
	#treeRevision = 0;
	#snapshotRevision = -1;
	#snapshotCache?: ApkUiManagerNodeSnapshot;

	public constructor(
		contract: ApkAppPluginHostContract,
		private readonly rootTag: number,
	) {
		if (!Number.isSafeInteger(rootTag) || rootTag < 1) {
			throw new Error("rootTag muss eine positive ganze Zahl sein");
		}
		const effectiveViewManagers = resolveEffectiveApkViewManagers(contract);
		this.#viewManagers = new Map(effectiveViewManagers.map(viewManager => [
			viewManager.viewName,
			viewManager,
		]));
		if (this.#viewManagers.size !== effectiveViewManagers.length) {
			throw new Error("Die effektiven APK-ViewManager-Namen sind nicht eindeutig");
		}
		this.#nodes.set(rootTag, {
			tag: rootTag,
			viewName: "Root",
			rootTag,
			props: {},
			children: [],
		});
	}

	public readonly getConstantsForViewManager = (viewName: string | null): Readonly<Record<string, unknown>> | null => {
		if (viewName === null) return null;
		const viewManager = this.#viewManagers.get(viewName);
		return viewManager ? viewManagerConfig(viewManager) : null;
	};

	public readonly getDefaultEventTypes = (): Readonly<Record<string, unknown>> =>
		createApkDefaultEventTypes();

	public readonly createView = (
		tag: number,
		viewName: string,
		rootTag: number,
		props: Readonly<Record<string, unknown>> | null,
	): void => {
		this.#assertTag(tag, "tag");
		if (this.#nodes.has(tag)) throw new Error(`React-Tag ${tag} existiert bereits`);
		if (rootTag !== this.rootTag || !this.#nodes.has(rootTag)) {
			throw new Error(`Root-Tag ${rootTag} ist nicht registriert`);
		}
		const viewManager = this.#viewManagers.get(viewName);
		if (!viewManager) throw new Error(`Unbekannter APK-ViewManager: ${viewName}`);
		viewManagerConfig(viewManager);
		this.#nodes.set(tag, {
			tag,
			viewName,
			rootTag,
			props: { ...(props ?? {}) },
			children: [],
		});
		this.#record("createView", [tag, viewName, rootTag, props]);
	};

	public readonly updateView = (
		tag: number,
		viewName: string,
		props: Readonly<Record<string, unknown>>,
	): void => {
		const node = this.#node(tag);
		if (node.viewName !== viewName) {
			throw new Error(`React-Tag ${tag} gehört zu ${node.viewName}, nicht ${viewName}`);
		}
		node.props = { ...node.props, ...props };
		this.#record("updateView", [tag, viewName, props]);
	};

	/** Mirrors UIManager.synchronouslyUpdateViewOnUIThread used by NativeAnimatedModule. */
	public synchronouslyUpdateViewOnUiThread(
		tag: number,
		props: Readonly<Record<string, unknown>>,
	): void {
		const node = this.#node(tag);
		node.props = { ...node.props, ...props };
		this.#record("updateView", [tag, node.viewName, props]);
	}

	/** Applies Android's null-prop reset without leaving synthetic null styles in the snapshot. */
	public restoreDefaultViewProps(tag: number, propNames: readonly string[]): void {
		const node = this.#node(tag);
		const reset: Record<string, null> = {};
		for (const propName of propNames) {
			delete node.props[propName];
			reset[propName] = null;
		}
		this.#record("updateView", [tag, node.viewName, reset]);
	}

	public readonly setChildren = (parentTag: number, childTags: readonly number[]): void => {
		const parent = this.#node(parentTag);
		if (parent.children.length !== 0) throw new Error(`React-Tag ${parentTag} besitzt bereits Kinder`);
		if (new Set(childTags).size !== childTags.length) {
			throw new Error(`UIManager.setChildren für React-Tag ${parentTag} enthält doppelte Kinder`);
		}
		const children = childTags.map(childTag => this.#node(childTag));
		for (const child of children) this.#validateAttach(parent, child);
		for (const child of children) this.#attach(parent, child, parent.children.length);
		this.#record("setChildren", [parentTag, childTags]);
	};

	public readonly manageChildren = (
		parentTag: number,
		moveFrom: readonly number[] | null,
		moveTo: readonly number[] | null,
		addChildTags: readonly number[] | null,
		addAtIndices: readonly number[] | null,
		removeFrom: readonly number[] | null,
	): void => {
		const parent = this.#node(parentTag);
		const moveFromValues = [...(moveFrom ?? [])];
		const moveToValues = [...(moveTo ?? [])];
		const addTags = [...(addChildTags ?? [])];
		const addIndices = [...(addAtIndices ?? [])];
		const removeIndices = [...(removeFrom ?? [])];
		if (moveFromValues.length !== moveToValues.length) {
			throw new Error("UIManager.manageChildren benötigt gleich viele moveFrom- und moveTo-Indizes");
		}
		if (addTags.length !== addIndices.length) {
			throw new Error("UIManager.manageChildren benötigt gleich viele addChildTags und addAtIndices");
		}
		const originalChildren = [...parent.children];
		const validateSourceIndex = (index: number, name: string): void => {
			if (!Number.isSafeInteger(index) || index < 0 || index >= originalChildren.length) {
				throw new Error(`Ungültiger ${name}-Index ${index}`);
			}
		};
		for (const index of moveFromValues) validateSourceIndex(index, "moveFrom");
		for (const index of removeIndices) validateSourceIndex(index, "removeFrom");
		if (new Set(moveFromValues).size !== moveFromValues.length
			|| new Set(removeIndices).size !== removeIndices.length) {
			throw new Error("UIManager.manageChildren enthält doppelte Quellindizes");
		}
		if (moveFromValues.some(index => removeIndices.includes(index))) {
			throw new Error("UIManager.manageChildren darf ein Kind nicht gleichzeitig verschieben und entfernen");
		}
		if (new Set(addTags).size !== addTags.length) {
			throw new Error("UIManager.manageChildren enthält doppelte addChildTags");
		}
		const moved = moveFromValues.map(index => originalChildren[index]);
		const addedNodes = addTags.map(tag => this.#node(tag));
		for (const child of addedNodes) this.#validateAttach(parent, child);
		const detachedIndices = new Set([...moveFromValues, ...removeIndices]);
		const finalChildren = originalChildren.filter((_tag, index) => !detachedIndices.has(index));
		const insertions = [
			...moved.map((tag, index) => ({ tag, index: moveToValues[index] })),
			...addTags.map((tag, index) => ({ tag, index: addIndices[index] })),
		].sort((left, right) => left.index - right.index);
		const finalChildCount = finalChildren.length + insertions.length;
		if (new Set(insertions.map(insertion => insertion.index)).size !== insertions.length) {
			throw new Error("UIManager.manageChildren enthält doppelte Zielindizes");
		}
		for (const insertion of insertions) {
			if (!Number.isSafeInteger(insertion.index) || insertion.index < 0 || insertion.index >= finalChildCount) {
				throw new Error(`Ungültiger Zielindex ${insertion.index}`);
			}
			if (insertion.index > finalChildren.length) {
				throw new Error(`Zielindex ${insertion.index} würde eine Lücke in der Kindliste erzeugen`);
			}
			finalChildren.splice(insertion.index, 0, insertion.tag);
		}
		if (new Set(finalChildren).size !== finalChildren.length) {
			throw new Error("UIManager.manageChildren würde ein Kind mehrfach einfügen");
		}

		for (const index of moveFromValues) this.#node(originalChildren[index]).parentTag = undefined;
		for (const index of removeIndices) {
			const childTag = originalChildren[index];
			this.#node(childTag).parentTag = undefined;
			this.#deleteSubtree(childTag);
		}
		parent.children = finalChildren;
		for (const childTag of finalChildren) this.#node(childTag).parentTag = parent.tag;
		this.#record("manageChildren", [parentTag, moveFrom, moveTo, addChildTags, addAtIndices, removeFrom]);
	};

	public readonly removeRootView = (tag: number): void => {
		if (tag !== this.rootTag) throw new Error(`React-Tag ${tag} ist kein Root-Tag`);
		this.#deleteSubtree(tag);
		this.#record("removeRootView", [tag]);
	};

	public readonly removeSubviewsFromContainerWithID = (tag: number): void => {
		const parent = this.#node(tag);
		for (const childTag of [...parent.children]) this.#deleteSubtree(childTag);
		parent.children = [];
		this.#record("removeSubviewsFromContainerWithID", [tag]);
	};

	public readonly replaceExistingNonRootView = (oldTag: number, newTag: number): void => {
		const oldNode = this.#node(oldTag);
		if (oldTag === this.rootTag || oldNode.parentTag === undefined) {
			throw new Error(`React-Tag ${oldTag} ist keine ersetzbare Nicht-Root-View`);
		}
		const parent = this.#node(oldNode.parentTag);
		const index = parent.children.indexOf(oldTag);
		if (index < 0) throw new Error(`Parent von React-Tag ${oldTag} ist inkonsistent`);
		const newNode = this.#node(newTag);
		this.#validateAttach(parent, newNode);
		parent.children.splice(index, 1);
		oldNode.parentTag = undefined;
		this.#deleteSubtree(oldTag);
		this.#attach(parent, newNode, index);
		this.#record("replaceExistingNonRootView", [oldTag, newTag]);
	};

	public readonly dispatchViewManagerCommand = (
		tag: number,
		command: string | number,
		arguments_: readonly unknown[] | null,
	): void => {
		this.#node(tag);
		this.#record("dispatchViewManagerCommand", [tag, command, arguments_]);
	};

	public readonly setJSResponder = (tag: number, blockNativeResponder: boolean): void => {
		this.#node(tag);
		this.#jsResponder = { tag, blockNativeResponder };
		this.#record("setJSResponder", [tag, blockNativeResponder]);
	};

	public readonly clearJSResponder = (): void => {
		this.#jsResponder = undefined;
		this.#record("clearJSResponder", []);
	};

	public readonly viewIsDescendantOf = (
		tag: number,
		ancestorTag: number,
		callback: (result: boolean) => void,
	): void => {
		let current = this.#node(tag);
		for (;;) {
			if (current.parentTag === undefined) {
				callback(false);
				return;
			}
			if (current.parentTag === ancestorTag) {
				callback(true);
				return;
			}
			current = this.#node(current.parentTag);
		}
	};

	public readonly configureNextLayoutAnimation = (): never => {
		throw new ApkUiLayoutUnavailableError("configureNextLayoutAnimation");
	};

	public readonly findSubviewIn = (): never => {
		throw new ApkUiLayoutUnavailableError("findSubviewIn");
	};

	public readonly measure = (tag: number, callback: ApkUiManagerCallback): void => {
		this.#queueNativeMeasurement("measure", tag, callback);
	};

	public readonly measureInWindow = (tag: number, callback: ApkUiManagerCallback): void => {
		this.#queueNativeMeasurement("measureInWindow", tag, callback);
	};

	public readonly measureLayout = (): never => {
		throw new ApkUiLayoutUnavailableError("measureLayout");
	};

	public readonly measureLayoutRelativeToParent = (): never => {
		throw new ApkUiLayoutUnavailableError("measureLayoutRelativeToParent");
	};

	public readonly dismissPopupMenu = (): void => this.#record("dismissPopupMenu", []);

	public readonly sendAccessibilityEvent = (tag: number, eventType: number): void => {
		this.#node(tag);
		this.#record("sendAccessibilityEvent", [tag, eventType]);
	};

	public readonly setLayoutAnimationEnabledExperimental = (enabled: boolean): void =>
		this.#record("setLayoutAnimationEnabledExperimental", [enabled]);

	public readonly showPopupMenu = (): never => {
		throw new ApkUiLayoutUnavailableError("showPopupMenu");
	};

	public snapshot(): ApkUiManagerNodeSnapshot {
		if (this.#snapshotCache && this.#snapshotRevision === this.#treeRevision) return this.#snapshotCache;
		this.#snapshotCache = this.#snapshot(this.#node(this.rootTag));
		this.#snapshotRevision = this.#treeRevision;
		return this.#snapshotCache;
	}

	public jsResponder(): Readonly<{ tag: number; blockNativeResponder: boolean }> | undefined {
		return this.#jsResponder ? { ...this.#jsResponder } : undefined;
	}

	public operations(): readonly ApkUiManagerOperation[] {
		return this.#operations.map(operation => ({
			method: operation.method,
			arguments: [...operation.arguments],
		}));
	}

	public operationJournal(): Readonly<ApkUiManagerOperationJournal> {
		return Object.freeze({
			offset: this.#operationOffset,
			total: this.#operationCount,
			operations: this.operations(),
		});
	}

	public operationCount(): number {
		return this.#operationCount;
	}

	public visualMutationRevision(): number {
		return this.#visualMutationRevision;
	}

	public pendingNativeMeasurementCount(): number {
		return this.#pendingNativeMeasurements.length;
	}

	public flushNativeMeasurements(
		measure: (tag: number) => Readonly<ApkNativeMeasuredBox> | undefined,
	): number {
		const pending = this.#pendingNativeMeasurements.splice(0);
		for (const request of pending) {
			const box = measure(request.tag);
			if (!box) {
				request.callback();
				continue;
			}
			if (request.kind === "measure") request.callback(0, 0, box.width, box.height, box.x, box.y);
			else request.callback(box.x, box.y, box.width, box.height);
		}
		return pending.length;
	}

	#queueNativeMeasurement(
		kind: PendingNativeMeasurement["kind"],
		tag: number,
		callback: ApkUiManagerCallback,
	): void {
		this.#assertTag(tag, "tag");
		if (typeof callback !== "function") throw new Error(`UIManager.${kind} benötigt einen Callback`);
		this.#pendingNativeMeasurements.push({ kind, tag, callback });
	}

	#record(method: string, arguments_: readonly unknown[]): void {
		this.#operations.push({ method, arguments: arguments_ });
		this.#operationCount += 1;
		this.#treeRevision += 1;
		const maximumRetainedOperations = 4_096;
		if (this.#operations.length > maximumRetainedOperations) {
			const removed = this.#operations.length - maximumRetainedOperations;
			this.#operations.splice(0, removed);
			this.#operationOffset += removed;
		}
		if (visualUiManagerOperations.has(method)) this.#visualMutationRevision += 1;
	}

	#assertTag(tag: number, name: string): void {
		if (!Number.isSafeInteger(tag) || tag < 1) throw new Error(`${name} muss eine positive ganze Zahl sein`);
	}

	#node(tag: number): MutableNode {
		this.#assertTag(tag, "tag");
		const node = this.#nodes.get(tag);
		if (!node) throw new Error(`React-Tag ${tag} existiert nicht`);
		return node;
	}

	#attach(parent: MutableNode, child: MutableNode, index: number): void {
		if (!Number.isSafeInteger(index) || index < 0 || index > parent.children.length) {
			throw new Error(`Ungültiger Kindindex ${index} für React-Tag ${parent.tag}`);
		}
		this.#validateAttach(parent, child);
		child.parentTag = parent.tag;
		parent.children.splice(index, 0, child.tag);
	}

	#validateAttach(parent: MutableNode, child: MutableNode): void {
		if (child.parentTag !== undefined) {
			throw new Error(`React-Tag ${child.tag} gehört bereits zu Parent ${child.parentTag}`);
		}
		if (child.rootTag !== parent.rootTag) {
			throw new Error(`React-Tag ${child.tag} gehört zu einem anderen Root`);
		}
		if (child.tag === parent.tag || this.#subtreeContains(child, parent.tag)) {
			throw new Error(`React-Tag ${child.tag} würde einen Zyklus unter Parent ${parent.tag} erzeugen`);
		}
	}

	#subtreeContains(node: MutableNode, searchedTag: number): boolean {
		if (node.tag === searchedTag) return true;
		return node.children.some(childTag => this.#subtreeContains(this.#node(childTag), searchedTag));
	}

	#deleteSubtree(tag: number): void {
		const node = this.#node(tag);
		for (const childTag of [...node.children]) this.#deleteSubtree(childTag);
		this.#nodes.delete(tag);
	}

	#snapshot(node: MutableNode): ApkUiManagerNodeSnapshot {
		return Object.freeze({
			tag: node.tag,
			viewName: node.viewName,
			rootTag: node.rootTag,
			props: Object.freeze({ ...node.props }),
			children: Object.freeze(node.children.map(childTag => this.#snapshot(this.#node(childTag)))),
		});
	}
}
