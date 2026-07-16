import {
	moveRectangle,
	normalizeRectangle,
	ORIGINAL_SC_MAP_LIMITS,
	panMapBy,
	resizeRectangle,
	type MapBounds,
	type MapPoint,
	type MapRectangle,
	type MapTransformState,
	type RectangleHandle,
	viewportToMapPoint,
	zoomMapAt,
} from "./original-map-state";

const SVG_NS = "http://www.w3.org/2000/svg";
const CONTRACT_URL = "./q7-original-map-contract.json";

/** This renderer is quarantined evidence, never an AppPlugin product fallback. */
export const SNAPSHOT_MAP_SURFACE_POLICY = Object.freeze({
	purpose: "diagnostic-host-wireframe",
	productFallbackAllowed: false,
	productInteractionOwner: "unchanged-appplugin-session",
} as const);

export type OriginalMapTool = "view" | "rooms" | "zones" | "noGo" | "noMop" | "virtualWall" | "pin";
type AreaType = "zone" | "noGo" | "noMop";

interface OriginalMapLayer {
	tag: number;
	d: string;
	fill: string | null;
	stroke: string | null;
	strokeWidth: number;
}

interface OriginalRoom {
	id: number;
	name: string;
	pathTag: number;
	d: string;
	label: MapPoint;
	colors: {
		labelBackground: string;
		labelBorder: string;
	};
}

interface OriginalMapContract {
	schemaVersion: number;
	provenance: {
		model: string;
		bundleKind: string;
		bundleSha256: string;
		runtimeLog: string;
		directBundleStarted: boolean;
	};
	viewBox: { x: number; y: number; width: number; height: number };
	placement: { x: number; y: number; scale: number };
	limits: typeof ORIGINAL_SC_MAP_LIMITS;
	colors: {
		zoneStroke: string;
		zoneBorder: string;
		zoneFill: string;
		virtualStroke: string;
		virtualFill: string;
		eraseStroke: string;
		eraseFill: string;
	};
	layers: OriginalMapLayer[];
	rooms: OriginalRoom[];
	cleanPath: null | {
		d: string;
		stroke: string;
		strokeWidth: number;
		strokeDasharray: string[];
		localToSource: { x: number; y: number; scale: number };
	};
	assets: { robot: string; dock: string; roomMarker: string };
	objects: {
		robot: MapRectangle;
		dock: MapRectangle & { rotation: number };
	};
}

interface MapArea extends MapRectangle {
	id: number;
	type: AreaType;
}

interface MapWall {
	id: number;
	start: MapPoint;
	end: MapPoint;
}

interface PointerInfo {
	viewport: MapPoint;
	map: MapPoint;
}

type MapInteraction =
	| { kind: "pan"; start: MapPoint; last: MapPoint; moved: boolean; roomId: number | null }
	| { kind: "drawArea"; areaType: AreaType; start: MapPoint; current: MapPoint }
	| { kind: "moveArea"; areaId: number; start: MapPoint; original: MapArea }
	| { kind: "resizeArea"; areaId: number; handle: RectangleHandle; original: MapArea }
	| { kind: "drawWall"; start: MapPoint; current: MapPoint }
	| { kind: "moveWallEndpoint"; wallId: number; endpoint: "start" | "end" }
	| { kind: "pin"; point: MapPoint }
	| { kind: "consumed" };

interface PinchState {
	pointerIds: [number, number];
	startDistance: number;
	startTransform: MapTransformState;
}

export interface OriginalMapSelectionSnapshot {
	roomIds: number[];
	zones: Array<MapArea & { type: "zone" }>;
	restrictions: Array<MapArea & { type: "noGo" | "noMop" }>;
	walls: MapWall[];
	pin: MapPoint | null;
	transform: MapTransformState;
	provenance: OriginalMapContract["provenance"];
}

export interface OriginalMapSurfaceOptions {
	map: SVGSVGElement;
	scene: SVGGElement;
	onEvent: (label: string, data: unknown) => void;
	onChange: (snapshot: OriginalMapSelectionSnapshot) => void;
}

function svgElement<K extends keyof SVGElementTagNameMap>(
	name: K,
	attributes: Record<string, string | number> = {},
): SVGElementTagNameMap[K] {
	const element = document.createElementNS(SVG_NS, name);
	for (const [key, value] of Object.entries(attributes)) element.setAttribute(key, String(value));
	return element;
}

function distance(left: MapPoint, right: MapPoint): number {
	return Math.hypot(right.x - left.x, right.y - left.y);
}

function midpoint(left: MapPoint, right: MapPoint): MapPoint {
	return { x: (left.x + right.x) / 2, y: (left.y + right.y) / 2 };
}

export class OriginalMapSurface {
	private contract!: OriginalMapContract;
	private bounds!: MapBounds;
	private tool: OriginalMapTool = "rooms";
	private roomSelectionActive = true;
	private transform: MapTransformState = { scale: 1, translateX: 0, translateY: 0 };
	private readonly selectedRooms = new Set<number>();
	private areas: MapArea[] = [];
	private walls: MapWall[] = [];
	private selectedAreaId: number | null = null;
	private pin: MapPoint | null = null;
	private nextObjectId = 1;
	private showRoomNames = true;
	private showPath = true;
	private showFurniture = true;
	private interaction: MapInteraction | null = null;
	private pinch: PinchState | null = null;
	private readonly pointers = new Map<number, PointerInfo>();
	private resizeObserver: ResizeObserver | null = null;

	public constructor(private readonly options: OriginalMapSurfaceOptions) {}

	public async init(): Promise<void> {
		const response = await fetch(CONTRACT_URL);
		if (!response.ok) throw new Error(`Originaler Kartenvertrag konnte nicht geladen werden: HTTP ${response.status}`);
		this.contract = await response.json() as OriginalMapContract;
		if (this.contract.schemaVersion !== 1 || !this.contract.provenance.directBundleStarted) {
			throw new Error("Der Kartenvertrag stammt nicht aus einem erfolgreichen direkten Bundle-Lauf");
		}
		if (this.contract.rooms.length !== 4 || this.contract.layers.length < 8) {
			throw new Error("Der originale Kartenvertrag ist unvollständig");
		}
		this.bounds = { width: this.contract.viewBox.width, height: this.contract.viewBox.height };
		this.options.map.dataset.renderMode = SNAPSHOT_MAP_SURFACE_POLICY.purpose;
		this.options.map.dataset.productFallbackAllowed = String(SNAPSHOT_MAP_SURFACE_POLICY.productFallbackAllowed);
		this.options.map.setAttribute("viewBox", `0 0 ${this.bounds.width} ${this.bounds.height}`);
		this.bindGestures();
		if (typeof ResizeObserver !== "undefined") {
			this.resizeObserver = new ResizeObserver(() => this.render());
			this.resizeObserver.observe(this.options.map);
		}
		this.render();
	}

	public get provenance(): OriginalMapContract["provenance"] {
		return this.contract.provenance;
	}

	public get scale(): number {
		return this.transform.scale;
	}

	public setTool(tool: OriginalMapTool): void {
		this.tool = tool;
		this.selectedAreaId = null;
		this.interaction = null;
		this.render();
	}

	public setRoomSelectionActive(active: boolean): void {
		this.roomSelectionActive = active;
		this.render();
	}

	public setLayerVisibility(layer: "roomNames" | "path" | "furniture", visible: boolean): void {
		if (layer === "roomNames") this.showRoomNames = visible;
		if (layer === "path") this.showPath = visible;
		if (layer === "furniture") this.showFurniture = visible;
		this.render();
	}

	public clearSelection(): void {
		this.selectedRooms.clear();
		this.areas = [];
		this.walls = [];
		this.pin = null;
		this.selectedAreaId = null;
		this.render();
	}

	public zoomBy(delta: number): void {
		const focus = { x: this.bounds.width / 2, y: this.bounds.height / 2 };
		this.transform = zoomMapAt(this.transform, this.transform.scale + delta, focus, this.bounds);
		this.render();
		this.options.onEvent("Kartenzoom geändert", { ...this.transform, source: "control", offline: true });
	}

	public resetTransform(): void {
		this.transform = { scale: 1, translateX: 0, translateY: 0 };
		this.render();
		this.options.onEvent("Kartenansicht zurückgesetzt", { ...this.transform, offline: true });
	}

	public snapshot(): OriginalMapSelectionSnapshot {
		return {
			roomIds: [...this.selectedRooms],
			zones: this.areas.filter((area): area is MapArea & { type: "zone" } => area.type === "zone").map(area => ({ ...area })),
			restrictions: this.areas.filter((area): area is MapArea & { type: "noGo" | "noMop" } => area.type !== "zone").map(area => ({ ...area })),
			walls: this.walls.map(wall => ({ ...wall, start: { ...wall.start }, end: { ...wall.end } })),
			pin: this.pin ? { ...this.pin } : null,
			transform: { ...this.transform },
			provenance: { ...this.contract.provenance },
		};
	}

	private bindGestures(): void {
		const map = this.options.map;
		map.addEventListener("pointerdown", event => this.handlePointerDown(event));
		map.addEventListener("pointermove", event => this.handlePointerMove(event));
		map.addEventListener("pointerup", event => this.handlePointerUp(event));
		map.addEventListener("pointercancel", event => this.handlePointerCancel(event));
		map.addEventListener("wheel", event => {
			event.preventDefault();
			const focus = this.eventToViewportPoint(event);
			this.transform = zoomMapAt(this.transform, this.transform.scale + (event.deltaY < 0 ? 0.35 : -0.35), focus, this.bounds);
			this.render();
			this.options.onEvent("Kartenzoom geändert", { ...this.transform, source: "wheel", offline: true });
		}, { passive: false });
		map.addEventListener("dblclick", event => {
			event.preventDefault();
			this.resetTransform();
		});
	}

	private handlePointerDown(event: PointerEvent): void {
		if (event.button !== 0 && event.pointerType === "mouse") return;
		event.preventDefault();
		this.options.map.setPointerCapture(event.pointerId);
		const viewport = this.eventToViewportPoint(event);
		const map = viewportToMapPoint(this.transform, viewport);
		this.pointers.set(event.pointerId, { viewport, map });

		if (this.pointers.size === 2) {
			const entries = [...this.pointers.entries()];
			this.interaction = null;
			this.pinch = {
				pointerIds: [entries[0][0], entries[1][0]],
				startDistance: distance(entries[0][1].viewport, entries[1][1].viewport),
				startTransform: { ...this.transform },
			};
			return;
		}

		const target = event.target as SVGElement;
		const deleteTarget = target.closest<SVGElement>("[data-area-delete]");
		if (deleteTarget) {
			const areaId = Number(deleteTarget.dataset.areaDelete);
			this.areas = this.areas.filter(area => area.id !== areaId);
			this.selectedAreaId = null;
			this.interaction = { kind: "consumed" };
			this.render();
			this.options.onEvent("Kartenfläche gelöscht", { areaId, offline: true });
			return;
		}

		const areaTarget = target.closest<SVGElement>("[data-area-id]");
		if (areaTarget) {
			const areaId = Number(areaTarget.dataset.areaId);
			const area = this.areas.find(candidate => candidate.id === areaId);
			if (area) {
				this.selectedAreaId = area.id;
				const handle = areaTarget.dataset.handle as RectangleHandle | undefined;
				this.interaction = handle
					? { kind: "resizeArea", areaId, handle, original: { ...area } }
					: { kind: "moveArea", areaId, start: map, original: { ...area } };
				this.render();
				return;
			}
		}

		const wallTarget = target.closest<SVGElement>("[data-wall-id]");
		if (wallTarget?.dataset.endpoint) {
			this.interaction = {
				kind: "moveWallEndpoint",
				wallId: Number(wallTarget.dataset.wallId),
				endpoint: wallTarget.dataset.endpoint as "start" | "end",
			};
			return;
		}

		if (this.tool === "zones" || this.tool === "noGo" || this.tool === "noMop") {
			const areaType: AreaType = this.tool === "zones" ? "zone" : this.tool;
			const maximum = areaType === "zone" ? this.contract.limits.maxCleanZones : this.contract.limits.maxVirtualAreas;
			if (this.areas.filter(area => area.type === areaType).length >= maximum) {
				this.interaction = { kind: "consumed" };
				this.options.onEvent("Host-Drahtmodell: Kartenlimit erreicht", { areaType, maximum, offline: true });
				return;
			}
			this.selectedAreaId = null;
			this.interaction = { kind: "drawArea", areaType, start: map, current: map };
			return;
		}

		if (this.tool === "virtualWall") {
			if (this.walls.length >= this.contract.limits.maxVirtualWalls) {
				this.interaction = { kind: "consumed" };
				this.options.onEvent("Host-Drahtmodell: Kartenlimit erreicht", {
					type: "virtualWall",
					maximum: this.contract.limits.maxVirtualWalls,
					offline: true,
				});
				return;
			}
			this.interaction = { kind: "drawWall", start: map, current: map };
			return;
		}

		if (this.tool === "pin") {
			this.interaction = { kind: "pin", point: map };
			return;
		}

		const roomTarget = target.closest<SVGElement>("[data-room-id]");
		this.interaction = {
			kind: "pan",
			start: viewport,
			last: viewport,
			moved: false,
			roomId: roomTarget ? Number(roomTarget.dataset.roomId) : null,
		};
	}

	private handlePointerMove(event: PointerEvent): void {
		if (!this.pointers.has(event.pointerId)) return;
		event.preventDefault();
		const viewport = this.eventToViewportPoint(event);
		const map = viewportToMapPoint(this.transform, viewport);
		this.pointers.set(event.pointerId, { viewport, map });

		if (this.pinch && this.pointers.size >= 2) {
			const left = this.pointers.get(this.pinch.pointerIds[0]);
			const right = this.pointers.get(this.pinch.pointerIds[1]);
			if (!left || !right) return;
			const delta = distance(left.viewport, right.viewport) - this.pinch.startDistance;
			const scale = this.pinch.startTransform.scale + delta * this.contract.limits.zoomFactor;
			this.transform = zoomMapAt(this.pinch.startTransform, scale, midpoint(left.viewport, right.viewport), this.bounds);
			this.render();
			return;
		}

		const interaction = this.interaction;
		if (!interaction) return;
		if (interaction.kind === "pan") {
			const delta = { x: viewport.x - interaction.last.x, y: viewport.y - interaction.last.y };
			if (distance(interaction.start, viewport) > 4) interaction.moved = true;
			if (interaction.moved) this.transform = panMapBy(this.transform, delta, this.bounds);
			interaction.last = viewport;
			this.render();
			return;
		}
		if (interaction.kind === "drawArea") {
			interaction.current = map;
			this.render();
			return;
		}
		if (interaction.kind === "moveArea") {
			const area = this.areas.find(candidate => candidate.id === interaction.areaId);
			if (!area) return;
			Object.assign(area, moveRectangle(interaction.original, {
				x: map.x - interaction.start.x,
				y: map.y - interaction.start.y,
			}, this.bounds));
			this.render();
			return;
		}
		if (interaction.kind === "resizeArea") {
			const area = this.areas.find(candidate => candidate.id === interaction.areaId);
			if (!area) return;
			const minimum = area.type === "zone" ? 60 : this.contract.limits.virtualAreaMinSize;
			Object.assign(area, resizeRectangle(interaction.original, interaction.handle, map, this.bounds, minimum));
			this.render();
			return;
		}
		if (interaction.kind === "drawWall") {
			interaction.current = map;
			this.render();
			return;
		}
		if (interaction.kind === "moveWallEndpoint") {
			const wall = this.walls.find(candidate => candidate.id === interaction.wallId);
			if (wall) wall[interaction.endpoint] = map;
			this.render();
			return;
		}
		if (interaction.kind === "pin") {
			interaction.point = map;
			this.render();
		}
	}

	private handlePointerUp(event: PointerEvent): void {
		if (!this.pointers.has(event.pointerId)) return;
		event.preventDefault();
		const viewport = this.eventToViewportPoint(event);
		const map = viewportToMapPoint(this.transform, viewport);
		const wasPinching = this.pinch !== null;
		this.pointers.delete(event.pointerId);
		if (this.options.map.hasPointerCapture(event.pointerId)) this.options.map.releasePointerCapture(event.pointerId);
		if (wasPinching) {
			if (this.pointers.size < 2) {
				this.pinch = null;
				this.options.onEvent("Pinch-Zoom beendet", { ...this.transform, offline: true });
			}
			return;
		}

		const interaction = this.interaction;
		this.interaction = null;
		if (!interaction) return;
		if (interaction.kind === "pan") {
			if (!interaction.moved && interaction.roomId !== null && this.tool === "rooms") this.toggleRoom(interaction.roomId);
			else if (interaction.moved) this.options.onEvent("Karte verschoben", { ...this.transform, offline: true });
			this.render();
			return;
		}
		if (interaction.kind === "drawArea") {
			let rectangle = normalizeRectangle(interaction.start, map, this.bounds);
			const minimum = interaction.areaType === "zone" ? 60 : this.contract.limits.virtualAreaMinSize;
			if (rectangle.width < minimum || rectangle.height < minimum) {
				const size = interaction.areaType === "zone" ? 128 : this.contract.limits.virtualAreaDefaultSize;
				rectangle = moveRectangle({ x: interaction.start.x - size / 2, y: interaction.start.y - size / 2, width: size, height: size }, { x: 0, y: 0 }, this.bounds);
			}
			const area: MapArea = { id: this.nextObjectId++, type: interaction.areaType, ...rectangle };
			this.areas.push(area);
			this.selectedAreaId = area.id;
			this.render();
			this.options.onEvent("Kartenfläche angelegt", { tool: this.tool, created: area, offline: true });
			return;
		}
		if (interaction.kind === "drawWall") {
			let end = map;
			if (distance(interaction.start, end) < this.contract.limits.virtualWallMinWidth) {
				end = { x: Math.min(this.bounds.width, interaction.start.x + this.contract.limits.virtualWallDefaultWidth), y: interaction.start.y };
			}
			const wall = { id: this.nextObjectId++, start: interaction.start, end };
			this.walls.push(wall);
			this.render();
			this.options.onEvent("Unsichtbare Wand angelegt", { created: wall, offline: true });
			return;
		}
		if (interaction.kind === "pin") {
			this.pin = map;
			this.render();
			this.options.onEvent("Zielpunkt gesetzt", { point: map, offline: true });
			return;
		}
		if (interaction.kind === "moveArea" || interaction.kind === "resizeArea") {
			this.render();
			this.options.onEvent("Kartenfläche bearbeitet", {
				operation: interaction.kind,
				area: this.areas.find(area => area.id === interaction.areaId),
				offline: true,
			});
			return;
		}
		if (interaction.kind === "moveWallEndpoint") {
			this.render();
			this.options.onEvent("Unsichtbare Wand bearbeitet", {
				wall: this.walls.find(wall => wall.id === interaction.wallId),
				offline: true,
			});
		}
	}

	private handlePointerCancel(event: PointerEvent): void {
		this.pointers.delete(event.pointerId);
		if (this.options.map.hasPointerCapture(event.pointerId)) this.options.map.releasePointerCapture(event.pointerId);
		if (this.pointers.size < 2) this.pinch = null;
		this.interaction = null;
		this.render();
	}

	private eventToViewportPoint(event: MouseEvent | PointerEvent | WheelEvent): MapPoint {
		const point = this.options.map.createSVGPoint();
		point.x = event.clientX;
		point.y = event.clientY;
		const matrix = this.options.map.getScreenCTM();
		if (!matrix) return { x: this.bounds.width / 2, y: this.bounds.height / 2 };
		const transformed = point.matrixTransform(matrix.inverse());
		return { x: transformed.x, y: transformed.y };
	}

	/**
	 * Converts the original Android-dp placement scale into the current SVG
	 * viewport. The snapshot stores overlay dimensions in map coordinates, but
	 * the AppPlugin lays those overlays out in screen dp. Letting the browser's
	 * viewBox fit scale them a second time makes dock, robot and labels too large.
	 */
	private originalOverlayScale(): number {
		const rectangle = this.options.map.getBoundingClientRect();
		const fittedScale = Math.min(
			rectangle.width / this.bounds.width,
			rectangle.height / this.bounds.height,
		);
		return Number.isFinite(fittedScale) && fittedScale > 0
			? this.contract.placement.scale / fittedScale
			: this.contract.placement.scale;
	}

	private screenConstantScale(): number {
		const rectangle = this.options.map.getBoundingClientRect();
		const fittedScale = Math.min(
			rectangle.width / this.bounds.width,
			rectangle.height / this.bounds.height,
		);
		return Number.isFinite(fittedScale) && fittedScale > 0
			? 1 / (fittedScale * this.transform.scale)
			: 1 / this.transform.scale;
	}

	private toggleRoom(roomId: number): void {
		if (this.selectedRooms.has(roomId)) this.selectedRooms.delete(roomId);
		else this.selectedRooms.add(roomId);
		this.options.onEvent("Host-Drahtmodell: Raumauswahl geändert", {
			roomId,
			selected: this.selectedRooms.has(roomId),
			roomIds: [...this.selectedRooms],
			offline: true,
		});
	}

	public render(): void {
		if (!this.contract) return;
		this.ensureEditableSelection();
		this.options.map.dataset.tool = this.tool;
		this.options.map.dataset.furnitureVisible = String(this.showFurniture);
		this.options.scene.replaceChildren();
		const viewport = svgElement("g", {
			id: "originalMapViewport",
			transform: `translate(${this.transform.translateX} ${this.transform.translateY}) scale(${this.transform.scale})`,
		});
		const roomByTag = new Map(this.contract.rooms.map(room => [room.pathTag, room]));
		for (const layer of this.contract.layers) {
			const room = roomByTag.get(layer.tag);
			const attributes: Record<string, string | number> = {
				d: layer.d,
				fill: layer.fill ?? "none",
				stroke: layer.stroke ?? "none",
				"stroke-width": layer.strokeWidth,
				"data-original-react-tag": layer.tag,
				"pointer-events": room ? "all" : "none",
			};
			if (room) {
				attributes.class = "room-surface";
				attributes["data-room-id"] = room.id;
				attributes["aria-label"] = room.name;
			}
			viewport.append(svgElement("path", attributes));
		}

		if (this.showPath && this.contract.cleanPath) {
			const path = this.contract.cleanPath;
			viewport.append(svgElement("path", {
				d: path.d,
				fill: "none",
				stroke: path.stroke,
				"stroke-width": path.strokeWidth * path.localToSource.scale,
				"stroke-dasharray": path.strokeDasharray.join(" "),
				"stroke-linecap": "round",
				transform: `translate(${path.localToSource.x} ${path.localToSource.y}) scale(${path.localToSource.scale})`,
				class: "original-clean-path",
			}));
		}

		this.renderAreas(viewport);
		this.renderWalls(viewport);
		this.renderObjects(viewport);
		if (this.showRoomNames) this.renderRoomNames(viewport);
		this.renderDrawingPreview(viewport);
		this.options.scene.append(viewport);
		this.options.onChange(this.snapshot());
	}

	private ensureEditableSelection(): void {
		if (this.interaction || this.selectedAreaId !== null) return;
		const areaType: AreaType | null = this.tool === "zones" ? "zone" :
			this.tool === "noGo" || this.tool === "noMop" ? this.tool : null;
		if (!areaType) return;
		for (let index = this.areas.length - 1; index >= 0; index--) {
			if (this.areas[index].type !== areaType) continue;
			this.selectedAreaId = this.areas[index].id;
			return;
		}
	}

	private renderAreas(viewport: SVGGElement): void {
		for (const area of this.areas) {
			const selected = area.id === this.selectedAreaId;
			const isZone = area.type === "zone";
			const stroke = isZone ? this.contract.colors.zoneStroke : area.type === "noMop" ? this.contract.colors.eraseStroke : this.contract.colors.virtualStroke;
			const fill = isZone ? this.contract.colors.zoneFill : area.type === "noMop" ? this.contract.colors.eraseFill : this.contract.colors.virtualFill;
			const group = svgElement("g", { class: `map-area ${area.type} ${selected ? "selected" : ""}` });
			group.append(svgElement("rect", {
				x: area.x,
				y: area.y,
				width: area.width,
				height: area.height,
				fill,
				stroke,
				"stroke-width": 3,
				"vector-effect": "non-scaling-stroke",
				"data-area-id": area.id,
				class: "area-body",
			}));
			if (selected) this.renderAreaHandles(group, area, stroke);
			viewport.append(group);
		}
	}

	private renderAreaHandles(group: SVGGElement, area: MapArea, stroke: string): void {
		const screenScale = this.screenConstantScale();
		const handles: Array<[RectangleHandle, number, number]> = [
			["northWest", area.x, area.y],
			["northEast", area.x + area.width, area.y],
			["southEast", area.x + area.width, area.y + area.height],
			["southWest", area.x, area.y + area.height],
		];
		for (const [handle, x, y] of handles) {
			group.append(svgElement("circle", {
				cx: x,
				cy: y,
				r: 11 * screenScale,
				fill: "white",
				stroke,
				"stroke-width": 3,
				"vector-effect": "non-scaling-stroke",
				"data-area-id": area.id,
				"data-handle": handle,
				class: "area-handle",
			}));
		}
		const deleteGroup = svgElement("g", {
			transform: `translate(${area.x + area.width / 2} ${area.y}) scale(${screenScale})`,
			"data-area-delete": area.id,
			class: "area-delete",
		});
		deleteGroup.append(svgElement("circle", { r: 15, fill: stroke }));
		deleteGroup.append(svgElement("path", { d: "M-5 -5 L5 5 M5 -5 L-5 5", stroke: "white", "stroke-width": 2.5, "stroke-linecap": "round" }));
		group.append(deleteGroup);
	}

	private renderWalls(viewport: SVGGElement): void {
		const screenScale = this.screenConstantScale();
		for (const wall of this.walls) {
			const group = svgElement("g", { class: "map-wall" });
			group.append(svgElement("line", {
				x1: wall.start.x,
				y1: wall.start.y,
				x2: wall.end.x,
				y2: wall.end.y,
				stroke: this.contract.colors.virtualStroke,
				"stroke-width": 4,
				"vector-effect": "non-scaling-stroke",
				"stroke-linecap": "round",
			}));
			for (const endpoint of ["start", "end"] as const) {
				const point = wall[endpoint];
				group.append(svgElement("circle", {
					cx: point.x,
					cy: point.y,
					r: 10 * screenScale,
					fill: "white",
					stroke: this.contract.colors.virtualStroke,
					"stroke-width": 3,
					"vector-effect": "non-scaling-stroke",
					"data-wall-id": wall.id,
					"data-endpoint": endpoint,
					class: "wall-handle",
				}));
			}
			viewport.append(group);
		}
	}

	private renderObjects(viewport: SVGGElement): void {
		const overlayScale = this.originalOverlayScale();
		const robot = this.contract.objects.robot;
		const robotGroup = svgElement("g", {
			transform: `translate(${robot.x + robot.width / 2} ${robot.y + robot.height / 2}) scale(${overlayScale})`,
			class: "map-object robot",
		});
		robotGroup.append(svgElement("image", {
			href: this.contract.assets.robot,
			x: -robot.width / 2,
			y: -robot.height / 2,
			width: robot.width,
			height: robot.height,
			preserveAspectRatio: "xMidYMid meet",
		}));
		viewport.append(robotGroup);

		const dock = this.contract.objects.dock;
		const dockGroup = svgElement("g", {
			transform: `translate(${dock.x + dock.width / 2} ${dock.y + dock.height / 2}) scale(${overlayScale}) rotate(${dock.rotation})`,
			class: "map-object dock",
		});
		dockGroup.append(svgElement("image", {
			href: this.contract.assets.dock,
			x: -dock.width / 2,
			y: -dock.height / 2,
			width: dock.width,
			height: dock.height,
			preserveAspectRatio: "xMidYMid meet",
		}));
		viewport.append(dockGroup);

		if (this.pin) {
			const screenScale = this.screenConstantScale();
			const marker = svgElement("g", {
				transform: `translate(${this.pin.x} ${this.pin.y}) scale(${screenScale})`,
				class: "desktop-pin",
			});
			marker.append(svgElement("path", { d: "M0 0 C-18 -22 -14 -42 0 -42 C14 -42 18 -22 0 0 Z" }));
			marker.append(svgElement("circle", { cy: -28, r: 6 }));
			viewport.append(marker);
		}
	}

	private renderRoomNames(viewport: SVGGElement): void {
		const labelScale = this.originalOverlayScale() / this.transform.scale;
		for (const room of this.contract.rooms) {
			const group = svgElement("g", {
				transform: `translate(${room.label.x - 52} ${room.label.y}) scale(${labelScale})`,
				class: "original-room-label",
			});
			group.append(svgElement("circle", {
				r: 22,
				fill: room.colors.labelBackground,
				stroke: room.colors.labelBorder,
				"stroke-width": 2,
			}));
			group.append(svgElement("image", { href: this.contract.assets.roomMarker, x: -13, y: -13, width: 26, height: 26 }));
			const text = svgElement("text", {
				x: 34,
				y: 11,
				fill: "#333333EE",
				"font-size": 34,
				"font-weight": 600,
				"paint-order": "stroke",
				stroke: "rgba(255,255,255,.72)",
				"stroke-width": 5,
			});
			text.textContent = room.name;
			group.append(text);
			viewport.append(group);
		}
	}

	private renderDrawingPreview(viewport: SVGGElement): void {
		if (this.interaction?.kind === "drawArea") {
			const rectangle = normalizeRectangle(this.interaction.start, this.interaction.current, this.bounds);
			const isZone = this.interaction.areaType === "zone";
			viewport.append(svgElement("rect", {
				x: rectangle.x,
				y: rectangle.y,
				width: rectangle.width,
				height: rectangle.height,
				fill: isZone ? this.contract.colors.zoneFill : this.contract.colors.virtualFill,
				stroke: isZone ? this.contract.colors.zoneStroke : this.contract.colors.virtualStroke,
				"stroke-width": 3,
				"stroke-dasharray": "8 6",
				"vector-effect": "non-scaling-stroke",
				class: "drawing-preview",
			}));
		}
		if (this.interaction?.kind === "drawWall") {
			viewport.append(svgElement("line", {
				x1: this.interaction.start.x,
				y1: this.interaction.start.y,
				x2: this.interaction.current.x,
				y2: this.interaction.current.y,
				stroke: this.contract.colors.virtualStroke,
				"stroke-width": 4,
				"stroke-dasharray": "8 6",
				"vector-effect": "non-scaling-stroke",
				class: "drawing-preview",
			}));
		}
	}
}
