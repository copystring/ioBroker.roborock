import * as d3 from "d3";
import { localCoordsToRobotCoords, robotCoordsToLocalCoords } from "../common/coordTransformation";
import { drawMapV1 } from "../common/mapDrawing/drawMapV1";
import { IMG_CHARGER, IMG_GO_TO_PIN, IMG_ROBOT_ORIGINAL } from "../common/images";
import type { DrawObstacleInput, DrawRoomLabelInput, DrawVirtualWallInput } from "../common/mapDrawing/types";
import type { B01MapData } from "../lib/map/b01/types";
import { Q10_CANVAS_SCALE, Q10MapGeometry } from "../lib/map/q10/Q10MapGeometry";
import { Connection } from "./conn.js";
import { SVGMapRenderer } from "./SVGMapRenderer";

// Interfaces
// -----------------------------------------------------------------------------

interface MapData {
	IMAGE: {
		position: { left: number; top: number };
		dimensions: { height: number; width: number };
		segments: {
			list: SegmentInfo[];
		};
	};
	ROBOT_POSITION?: PositionBlock;
	CHARGER_LOCATION?: PositionBlock;
	PATH?: PathBlock;
	MOP_PATH?: number[];
	OBSTACLES2?: Array<[number, number, ...any]>;
	CARPET_MAP?: number[];
	model?: string; // e.g. roborock.vacuum.a147, for asset paths
}

type Q10FrontendMapData = B01MapData & { model?: string };
type FrontendMapData = MapData | Q10FrontendMapData;

interface PositionBlock {
	position: [number, number];
	angle: number;
}

interface PathBlock {
	current_angle: number;
	points: [number, number][];
}

interface SegmentInfo {
	id: number;
	name: string;
	center: [number, number]; // Robot coordinates
}

interface Robot {
	duid: string;
	name: string;
}

interface Point {
	x: number;
	y: number;
}

interface Rect {
	id: number; // Unique ID for D3 data binding
	x: number;
	y: number;
	width: number;
	height: number;
}

interface Q10OverlayObstacleData {
	kind: "q10Obstacle";
	type: "obstacle" | "skip" | "threshold" | "easycard" | "cliff";
	x: number;
	y: number;
	obstacleId?: string | number;
}

interface ConnCallbacks {
	onConnChange?: (isConnected: boolean) => void;
	onUpdate?: (id: string, state: any | null | undefined) => void;
	onRefresh?: ((...args: any[]) => any) | null;
	onAuth?: ((...args: any[]) => any) | null;
	onCommand?: (instance: string, command: string, data: any) => any;
	onError?: (err: any) => void;
	onObjectChange?: (id: string, obj: any) => void;
}

interface MapParams {
	scaleFactor: number;
	left: number;
	topMap: number;
	mapMaxY: number;
	imageHeight: number;
	imageWidth: number;
}

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

const VISUAL_BLOCK_SIZE = 3; // Scale factor for visualization
const UI_CONSTANTS = {
	ROBOT_SIZE_BASE: 5,
	CHARGER_SIZE_BASE: 3,
	OBSTACLE_RADIUS_BASE: 3,
	ZONE_STROKE_BASE: 1.5,
	ZONE_HANDLE_RADIUS_BASE: 5,
	PIN_WIDTH_BASE: 29,
	PIN_HEIGHT_BASE: 24,
	PIN_Y_OFFSET_BASE: 5,
	PATH_MOP_WIDTH_BASE: 6.5,
	PATH_MAIN_WIDTH_RATIO_BASE: 0.8,
	PATH_BACKWASH_WIDTH_BASE: 0.5,
};

/** Type → suffix (429.js); asset obstacle_new_p{suffix}.png */
const Q10_ROOM_TAG_BASE = [
	q10PackedArgbToCss(4279123053),
	q10PackedArgbToCss(4283645184),
	q10PackedArgbToCss(4286455337),
	q10PackedArgbToCss(4278537798)
] as const;
const Q10_ROOM_TAG_STROKE = [
	q10PackedArgbToCss(4278528336),
	q10PackedArgbToCss(4281147648),
	q10PackedArgbToCss(4284156949),
	q10PackedArgbToCss(4278202925)
] as const;
const Q10_ROOM_LABEL_LAYOUT = {
	bubbleRadius: 6,
	iconSize: 6,
	gap: 4,
	font: '900 12px "Segoe UI", sans-serif',
	widthPadding: 1
} as const;

function q10RoomTagAssetFileName(roomType: number): string {
	const normalized = Number.isInteger(roomType) && roomType >= 0 && roomType <= 11 ? roomType : 0;
	return `src_resources_map_images_light_maproomtag${normalized}.png`;
}

function q10PackedArgbToCss(color: number): string {
	const a = ((color >>> 24) & 0xff) / 255;
	const r = (color >>> 16) & 0xff;
	const g = (color >>> 8) & 0xff;
	const b = color & 0xff;
	return `rgba(${r}, ${g}, ${b}, ${a})`;
}

let q10RoomLabelMeasureContext: CanvasRenderingContext2D | null = null;

function measureQ10RoomLabelWidth(label: string): number {
	if (!q10RoomLabelMeasureContext) {
		const canvas = document.createElement("canvas");
		q10RoomLabelMeasureContext = canvas.getContext("2d");
	}
	if (!q10RoomLabelMeasureContext) return label.length * 8;
	q10RoomLabelMeasureContext.font = Q10_ROOM_LABEL_LAYOUT.font;
	return q10RoomLabelMeasureContext.measureText(label).width;
}

const OBSTACLE_MAPPING: Record<number, string> = {
	[-99]: "99",
	0: "0",
	1: "1",
	2: "2",
	3: "3",
	4: "3",
	5: "5_cn",
	9: "9",
	10: "10",
	18: "18",
	25: "25",
	26: "26",
	27: "26",
	34: "10",
	42: "18",
	48: "48",
	49: "49",
	50: "49",  // robot type 50 → p49 icon (p50 wrong for this type)
	51: "51",
	54: "54",
	65: "65",
	67: "67",
	69: "69",
	70: "70",
	99: "99",
};

function obstacleAssetFileName(suffix: string): string {
	return `projects_comroborocktanos_resources_obstacle_new_p${suffix}.png`;
}
function obstacleAssetFileNameAlt(suffix: string): string {
	return `projects_comroborocktanos_resources_map_object_top_${suffix}.png`;
}

function isQ10MapData(map: FrontendMapData | undefined): map is Q10FrontendMapData {
	return !!map && typeof map === "object" && "header" in map && !!(map as Q10FrontendMapData).q10CreatorData?.q10Detected;
}

// -----------------------------------------------------------------------------
// Map Application Class
// -----------------------------------------------------------------------------

class MapApplication {
	// State
	private connection: Connection;
	private instanceId: string = "";
	private currentRobotDuid: string | null = null;
	private onStateChange: ((id: string, state: any | null | undefined) => void) | null = null;
	private currentMapSubscriptions: string[] = [];

	// Map Data
	private map: FrontendMapData | undefined;
	private mapImage: MapData["IMAGE"] | undefined;
	private mapMinX: number = 0;
	private mapMinY: number = 0;
	private mapSizeX: number = 0;
	private mapSizeY: number = 0;
	private mapMaxY: number = 0;
	private goToTarget = false;
	private zoomLevel = 0.55;
	private currentMapBase64Clean: string | null = null;
	private q10Status: number | null = null;
	private q10CleaningInfo: Record<string, unknown> | null = null;
	private q10CurrentCleanRoomIds: number[] = [];

	// D3 & SVG State
	private image = new Image();
	private initialTransform: d3.ZoomTransform | undefined;
	private svg: d3.Selection<d3.BaseType, unknown, HTMLElement, any>;
	private svgContainer: d3.Selection<d3.BaseType, unknown, HTMLElement, any>;
	private mainGroup: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
	private mapImageElement: d3.Selection<SVGImageElement, unknown, HTMLElement, any>;

	// Layers
	private carpetGroup: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
	private pathGroup: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
	private mopPathGroup: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
	private backwashPathGroup: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
	private pureCleanPathGroup: d3.Selection<SVGGElement, unknown, HTMLElement, any>;

	// Element Groups
	private chargerGroup: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
	private robotGroup: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
	private roomNameGroup: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
	private zoneGroup: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
	private zonesOverlayGroup: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
	private obstacleGroup: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
	private pinGroup: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
	private zoom: d3.ZoomBehavior<Element, unknown>;

	private wheelZoom = 1;
	private readonly minZoom = 0.1;
	private readonly maxZoom = 10;

	// UI Interaction State
	private popupTimeout: number | null = null;
	private popupX: number = 0;
	private popupY: number = 0;
	private selectedObstacleID: any;
	private model: string | null = null;
	private robotModels: Record<string, string> = {};
	private rects: Rect[] = [];
	private zones: number[][] = [];
	private rectCounter = 0;
	/** Cache: "duid.segmentId" -> room name (from get_room_names for cloud maps). */
	private roomNamesFromStates: Record<string, string> = {};
	private roomNamesRequestedForDuid: string | null = null;

	// DOM Elements
	private popup!: HTMLElement;
	private popupImage!: HTMLImageElement;
	private triangle!: HTMLElement;
	private largePhoto!: HTMLElement;
	private largePhotoImage!: HTMLImageElement;
	private largePhotoBBox!: HTMLElement;
	private robotSelect!: HTMLSelectElement;
	private deleteButton!: HTMLButtonElement;
	private addButton!: HTMLButtonElement;
	private startButton!: HTMLButtonElement;
	private pauseButton!: HTMLButtonElement;
	private stopButton!: HTMLButtonElement;
	private dockButton!: HTMLButtonElement;
	private goToButton!: HTMLButtonElement;
	private resetZoomButton!: HTMLButtonElement;

	constructor() {
		this.connection = new Connection();
		// Initialize D3 selections with empty selections initially or in init()
		// We will initialize them properly in init() after DOM is ready
		this.svg = d3.select(null) as any;
		this.svgContainer = d3.select(null) as any;
		this.mainGroup = d3.select(null) as any;
		this.mapImageElement = d3.select(null) as any;
		this.carpetGroup = d3.select(null) as any;
		this.pathGroup = d3.select(null) as any;
		this.mopPathGroup = d3.select(null) as any;
		this.backwashPathGroup = d3.select(null) as any;
		this.pureCleanPathGroup = d3.select(null) as any;
		this.chargerGroup = d3.select(null) as any;
		this.robotGroup = d3.select(null) as any;
		this.roomNameGroup = d3.select(null) as any;
		this.zoneGroup = d3.select(null) as any;
		this.zonesOverlayGroup = d3.select(null) as any;
		this.obstacleGroup = d3.select(null) as any;
		this.pinGroup = d3.select(null) as any;
		this.zoom = d3.zoom();
	}

	public async init() {
		this.bindDomElements();
		this.setupD3();
		this.setupConnection();
		this.bindUiEvents();
	}

	private bindDomElements() {
		const getElement = <T extends HTMLElement>(id: string): T => {
			const el = document.getElementById(id);
			if (!el) throw new Error(`Missing DOM element: ${id}`);
			return el as T;
		};

		this.popup = getElement("popup");
		this.popupImage = getElement("popup-image");
		this.triangle = getElement("triangle");
		this.largePhoto = getElement("largePhoto");
		this.largePhotoImage = getElement("largePhoto-image");
		this.largePhotoBBox = getElement("largePhoto-bbox");
		this.robotSelect = getElement("robotSelect");
		this.deleteButton = getElement("deleteButton");
		this.addButton = getElement("addButton");
		this.startButton = getElement("startButton");
		this.pauseButton = getElement("pauseButton");
		this.stopButton = getElement("stopButton");
		this.dockButton = getElement("dockButton");
		this.goToButton = getElement("goToButton");
		this.resetZoomButton = getElement("resetZoomButton");
	}

	private setupD3() {
		this.svgContainer = d3.select("#mapSvgContainer");
		this.svg = d3.select("#mapSvg");
		this.mainGroup = this.svg.append("g").attr("class", "main-group");
		this.mapImageElement = this.mainGroup.append("image").attr("class", "map-image");

		// Add carpet layer (Vector SVG)
		this.carpetGroup = this.mainGroup.append("g").attr("class", "carpet");

		this.mopPathGroup = this.mainGroup
			.append("g")
			.attr("class", "mop-paths")
			.style("opacity", 0.18);
		this.pathGroup = this.mainGroup
			.append("g")
			.attr("class", "paths")
			.style("opacity", 0.5);
		this.backwashPathGroup = this.mainGroup
			.append("g")
			.attr("class", "backwash-paths")
			.style("opacity", 0.2);
		this.pureCleanPathGroup = this.mainGroup
			.append("g")
			.attr("class", "pure-clean-paths");

		this.chargerGroup = this.mainGroup.append("g").attr("class", "charger");
		this.obstacleGroup = this.mainGroup.append("g").attr("class", "obstacles");
		this.zoneGroup = this.mainGroup.append("g").attr("class", "zones");
		this.zonesOverlayGroup = this.mainGroup.append("g").attr("class", "zones-overlay");
		this.robotGroup = this.mainGroup.append("g").attr("class", "robot");
		this.pinGroup = this.mainGroup.append("g").attr("class", "pins");
		this.roomNameGroup = this.mainGroup.append("g").attr("class", "room-names");

		this.pinGroup
			.append("image")
			.attr("class", "goto-pin")
			.attr("href", IMG_GO_TO_PIN)
			.attr("width", 29)
			.attr("height", 24)
			.style("opacity", 0)
			.style("display", "none")
			.style("pointer-events", "none");

		this.zoom = d3
			.zoom()
			.scaleExtent([this.minZoom, this.maxZoom])
			.on("zoom", (event: any) => this.handleZoom(event));

		this.svgContainer.call(this.zoom as any);
	}

	private setupConnection() {
		const instance = this.getQueryParam("instance");
		if (instance === null) {
			document.body.innerHTML = "<h1>Error: No instance specified in URL.</h1>";
			return;
		}
		this.instanceId = `roborock.${instance}`;

		const connCallbacks: ConnCallbacks = {
			onConnChange: async (isConnected: boolean) => {
				if (isConnected) {
					this.fetchRobotList();
				}
			},
			onUpdate: (id, state) => {
				if (this.onStateChange) this.onStateChange(id, state as any);
			},
			onError: (err) => {
				console.error("Connection error:", err);
			},
		};

		const socketUrl = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
		this.connection.init({ name: this.instanceId, connLink: socketUrl }, connCallbacks, true);
	}

	private fetchRobotList() {
		const startKey = `${this.instanceId}.Devices.`;
		const endKey = `${this.instanceId}.Devices.\u9999`;

		this.connection
			.getObjectView("system", "device", { startkey: startKey, endkey: endKey })
			.then((res: { rows: { id: string; value: any }[] }) => {
				const robots: Robot[] = [];
				if (res && res.rows) {
					res.rows.forEach((row) => {
						const idParts = row.id.split(".");
						const duid = idParts[idParts.length - 1];
						const name = row.value && row.value.common && row.value.common.name ? row.value.common.name : duid;
						// Extract model from native object
						const model = row.value?.native?.model || row.value?.native?.deviceInfo?.model || null;

						if (duid) {
							robots.push({ duid: duid, name: name });
							if (model) {
								this.robotModels[duid] = model;
							}
						}
					});
				}

				if (robots.length === 0) {
					const instanceDuid = this.getQueryParam("instance");
					if (instanceDuid) {
						this.robotSelect.innerHTML = "";
						const option = document.createElement("option");
						option.value = instanceDuid;
						option.text = `Roborock (Instance ${instanceDuid})`;
						this.robotSelect.appendChild(option);
						this.currentRobotDuid = instanceDuid;
						this.setupSocketListeners(instanceDuid);
					}
					return;
				}

				this.robotSelect.innerHTML = "";
				robots.forEach((robot: Robot) => {
					const option = document.createElement("option");
					option.value = robot.duid;
					option.text = robot.name;
					this.robotSelect.appendChild(option);
				});

				if (robots.length > 0) {
					const duid = robots[0].duid;
					this.currentRobotDuid = duid;
					this.robotSelect.value = duid;
					this.setupSocketListeners(duid);
				}

				// Fetch HomeData to resolve models reliably
				const homeDataId = `${this.instanceId}.HomeData`;
				this.connection.getStates([homeDataId]).then((states: Record<string, any>) => {
					const state = states[homeDataId];
					if (state && state.val) {
						try {
							const homeData = typeof state.val === "string" ? JSON.parse(state.val) : state.val;
							const productMap: Record<string, string> = {};
							if (homeData.products) {
								homeData.products.forEach((p: any) => {
									if (p.id && p.model) productMap[p.id] = p.model;
								});
							}
							const processDeviceList = (list: any[]) => {
								if (list) {
									list.forEach((d: any) => {
										if (d.duid && d.productId && productMap[d.productId]) {
											this.robotModels[d.duid] = productMap[d.productId];
										}
									});
								}
							};
							processDeviceList(homeData.devices);
							processDeviceList(homeData.receivedDevices);

							// Re-trigger listeners if we have a model now (refresh overlays with correct asset URLs)
							if (this.currentRobotDuid && this.robotModels[this.currentRobotDuid]) {
								this.model = this.robotModels[this.currentRobotDuid];
								if (this.map) this.drawOverlaysFromMap();
							}
						} catch (e) {
							console.error("Failed to parse HomeData:", e);
						}
					}
				});
			})
			.catch((err) => console.error("Error fetching robot list:", err));
	}

	private setupSocketListeners(duid: string) {
		if (this.onStateChange && this.currentMapSubscriptions.length > 0) {
			this.currentMapSubscriptions.forEach((id) => {
				this.connection.unsubscribeState(id);
			});
			this.currentMapSubscriptions = [];
		}
		this.roomNamesRequestedForDuid = null;

		this.map = undefined;
		this.mapImage = undefined;
		this.mapImageElement.attr("href", null);
		this.carpetGroup.selectAll("*").remove();
		this.obstacleGroup.selectAll("*").remove();
		this.zonesOverlayGroup.selectAll("*").remove();
		this.pinGroup.select("image.goto-pin").style("display", "none").style("opacity", 0);
		this.robotGroup.selectAll("*").remove();
		this.chargerGroup.selectAll("*").remove();
		this.roomNameGroup.selectAll("*").remove();
		this.pathGroup.selectAll("*").remove();
		this.mopPathGroup.selectAll("*").remove();
		this.backwashPathGroup.selectAll("*").remove();
		this.pureCleanPathGroup.selectAll("*").remove();
		this.rects = [];
		this.drawZones();
		this.deleteButton.disabled = true;
		this.addButton.disabled = false;
		this.currentMapBase64Clean = null;
		this.q10Status = null;
		this.q10CleaningInfo = null;
		this.q10CurrentCleanRoomIds = [];

		const mapBase64CleanStateId = `${this.instanceId}.Devices.${duid}.map.mapBase64Clean`;
		const mapDataStateId = `${this.instanceId}.Devices.${duid}.map.mapData`;
		const q10StatusStateId = `${this.instanceId}.Devices.${duid}.deviceStatus.status`;
		const q10CleaningInfoStateId = `${this.instanceId}.Devices.${duid}.deviceStatus.cleaning_info`;
		const q10CurrentCleanRoomIdsStateId = `${this.instanceId}.Devices.${duid}.deviceStatus.current_clean_room_ids`;

		this.currentMapSubscriptions = [
			mapBase64CleanStateId,
			mapDataStateId,
			q10StatusStateId,
			q10CleaningInfoStateId,
			q10CurrentCleanRoomIdsStateId
		];

		this.onStateChange = (id: string, state: any | null | undefined) => {
			if (!state || state.val === null || state.val === undefined) {
				if (id === mapBase64CleanStateId) {
					this.currentMapBase64Clean = null;
					this.updateBackgroundImageFromStateCache();
				}
				if (id === mapDataStateId) {
					this.map = undefined;
					this.zonesOverlayGroup.selectAll("*").remove();
					this.robotGroup.selectAll("*").remove();
				}
				if (id === q10StatusStateId) this.q10Status = null;
				if (id === q10CleaningInfoStateId) this.q10CleaningInfo = null;
				if (id === q10CurrentCleanRoomIdsStateId) this.q10CurrentCleanRoomIds = [];
				if (
					(id === q10StatusStateId || id === q10CleaningInfoStateId || id === q10CurrentCleanRoomIdsStateId)
					&& isQ10MapData(this.map)
				) {
					this.drawOverlaysFromMap();
				}
				return;
			}

			switch (id) {
				case mapBase64CleanStateId:
					this.currentMapBase64Clean = String(state.val);
					this.updateBackgroundImageFromStateCache();
					break;

				case mapDataStateId:
					try {
						this.map = typeof state.val === "string" ? JSON.parse(state.val) : state.val;
						if (this.map && "IMAGE" in this.map && this.map.IMAGE) {
							this.model = this.map.model ?? this.robotModels[this.currentRobotDuid] ?? null;
							this.mapImage = this.map.IMAGE;
							this.updateMapImageSize();
							this.drawOverlaysFromMap();
						} else if (isQ10MapData(this.map)) {
							this.model = this.map.model ?? this.robotModels[this.currentRobotDuid] ?? null;
							this.mapImage = undefined;
							this.drawOverlaysFromMap();
						}
					} catch (e) {
						console.error("Failed to parse map data JSON:", state.val, e);
					}
					break;

				case q10StatusStateId:
					this.q10Status = Number(state.val);
					if (isQ10MapData(this.map)) this.drawOverlaysFromMap();
					break;

				case q10CleaningInfoStateId:
					this.q10CleaningInfo = this.parseQ10CleaningInfoState(state.val);
					if (isQ10MapData(this.map)) this.drawOverlaysFromMap();
					break;

				case q10CurrentCleanRoomIdsStateId:
					this.q10CurrentCleanRoomIds = this.parseQ10RoomIdsState(state.val);
					if (isQ10MapData(this.map)) this.drawOverlaysFromMap();
					break;
			}
		};

		this.connection.subscribeState(mapBase64CleanStateId);
		this.connection.subscribeState(mapDataStateId);
		this.connection.subscribeState(q10StatusStateId);
		this.connection.subscribeState(q10CleaningInfoStateId);
		this.connection.subscribeState(q10CurrentCleanRoomIdsStateId);

		this.connection.getStates(this.currentMapSubscriptions).then((states: Record<string, any | null | undefined>) => {
			if (!this.onStateChange) return;

			// Try to resolve model from map if already populated
			if (this.robotModels[duid]) {
				this.model = this.robotModels[duid];
			}

			this.onStateChange(mapBase64CleanStateId, states[mapBase64CleanStateId]);
			this.onStateChange(mapDataStateId, states[mapDataStateId]);
			this.onStateChange(q10StatusStateId, states[q10StatusStateId]);
			this.onStateChange(q10CleaningInfoStateId, states[q10CleaningInfoStateId]);
			this.onStateChange(q10CurrentCleanRoomIdsStateId, states[q10CurrentCleanRoomIdsStateId]);
		});
	}
	// -----------------------------------------------------------------------------
	// Drawing Methods (single source: drawMapV1 + SVGMapRenderer)
	// -----------------------------------------------------------------------------

	/** Draws all map overlays via shared drawMapV1. Call when map or mapData changes. */
	private drawOverlaysFromMap(): void {
		if (!this.map) return;

		this.pinGroup.select("image.goto-pin").style("display", "none").style("opacity", "0");

		if (isQ10MapData(this.map)) {
			this.setPathGroupOpacityMode(true);
			this.drawQ10Overlays(this.map);
			this.applyRoomLabelZoomBehavior();
			return;
		}

		this.setPathGroupOpacityMode(false);

		if (!this.mapImage?.dimensions) return;
		const params = this.getMapParams();
		if (!params) return;

		const list = this.map.IMAGE?.segments?.list;
		const duid = this.currentRobotDuid;
		const cacheKey = (id: number) => (duid ? `${duid}.${id}` : "");
		const segmentName = (s: SegmentInfo) => s.name || (duid ? this.roomNamesFromStates[cacheKey(s.id)] : "") || "";

		let roomLabels = list
			?.filter((s: SegmentInfo) => segmentName(s))
			.map((s: SegmentInfo) => ({
				segmentId: s.id,
				x: this.robotToSvg({ x: s.center[0], y: s.center[1] }, params).x,
				y: this.robotToSvg({ x: s.center[0], y: s.center[1] }, params).y,
				text: segmentName(s),
			}));

		// Cloud maps: segment names may be empty; fetch from adapter room states and redraw once
		if (duid && Array.isArray(list)) {
			const missing = list.filter((s: SegmentInfo) => !s.name && !this.roomNamesFromStates[cacheKey(s.id)]);
			if (missing.length > 0 && this.roomNamesRequestedForDuid !== duid) {
				this.roomNamesRequestedForDuid = duid;
				const segmentIds = missing.map((s: SegmentInfo) => s.id);
				this.connection
					.sendTo(this.instanceId, "get_room_names", { duid, floor: 0, segmentIds })
					.then((res: any) => {
						if (res && typeof res === "object" && !res.error) {
							for (const [id, name] of Object.entries(res)) {
								if (name && String(name).trim()) this.roomNamesFromStates[`${duid}.${id}`] = String(name).trim();
							}
							this.drawOverlaysFromMap();
						}
					})
					.catch(() => {});
			}
		}

		const modelFolder =
			this.model ||
			(this.currentRobotDuid && this.robotModels[this.currentRobotDuid]) ||
			(Object.keys(this.robotModels).length ? this.robotModels[Object.keys(this.robotModels)[0]] : null) ||
			"roborock.vacuum.a147";
		const baseUrl = `assets/${modelFolder}/drawable-mdpi/`;
		const renderer = this.createSvgRenderer(baseUrl, params);

		drawMapV1(this.map as any, renderer, {
			scaleFactor: VISUAL_BLOCK_SIZE,
			dimensionsAreScaled: false,
			roomLabels: roomLabels?.length ? roomLabels : undefined,
		});
		this.applyRoomLabelZoomBehavior();
	}

	private createSvgRenderer(baseUrl: string, params: MapParams | null): SVGMapRenderer {
		return this.createSvgRendererWithOptions(baseUrl, params, {});
	}

	private createSvgRendererWithOptions(
		baseUrl: string,
		params: MapParams | null,
		options: Partial<{ obstacleRadius: number; obstacleImageSize: number; robotSize: number; chargerSize: number }>
	): SVGMapRenderer {
		return new SVGMapRenderer({
			groups: {
				carpetGroup: this.carpetGroup,
				pathGroup: this.pathGroup,
				mopPathGroup: this.mopPathGroup,
				backwashPathGroup: this.backwashPathGroup,
				pureCleanPathGroup: this.pureCleanPathGroup,
				chargerGroup: this.chargerGroup,
				robotGroup: this.robotGroup,
				pinGroup: this.pinGroup,
				obstacleGroup: this.obstacleGroup,
				roomNameGroup: this.roomNameGroup,
				zonesOverlayGroup: this.zonesOverlayGroup,
			},
			pathMainWidth: this.rescaler.pathMainWidth(),
			pathMopWidth: this.rescaler.pathMopWidth(),
			pathBackwashWidth: this.rescaler.pathBackwashWidth(),
			robotSize: options.robotSize ?? this.rescaler.robotSize(),
			chargerSize: options.chargerSize ?? this.rescaler.chargerSize(),
			pinWidth: this.rescaler.pinWidth(),
			pinHeight: this.rescaler.pinHeight(),
			pinYOffset: this.rescaler.pinYOffset(),
			obstacleRadius: options.obstacleRadius ?? this.rescaler.scale() * UI_CONSTANTS.OBSTACLE_RADIUS_BASE,
			obstacleImageSize: options.obstacleImageSize ?? this.rescaler.scale() * UI_CONSTANTS.OBSTACLE_RADIUS_BASE * 1.8,
			obstacleAssetBaseUrl: baseUrl,
			obstacleMapping: OBSTACLE_MAPPING,
			obstacleFileName: obstacleAssetFileName,
			obstacleFileNameAlt: obstacleAssetFileNameAlt,
			onObstacleClick: (event: MouseEvent, obstacleData: unknown) => {
				this.handleObstacleClick(event, obstacleData, params);
			},
			robotImageHref: IMG_ROBOT_ORIGINAL,
			chargerImageHref: IMG_CHARGER,
			goToPinImageHref: IMG_GO_TO_PIN,
		});
	}

	private handleObstacleClick(event: MouseEvent, obstacleData: unknown, params: MapParams | null): void {
		if (!this.currentRobotDuid) return;
		event.stopPropagation();

		if (Array.isArray(obstacleData)) {
			const d = obstacleData as [number, number, number, unknown, unknown, unknown, unknown];
			if (!params) return;
			this.selectedObstacleID = d?.[6];
			const robotPoint = { x: d[0], y: d[1] };
			const worldPoint = robotCoordsToLocalCoords(robotPoint, params);
			this.popupX = worldPoint.x;
			this.popupY = worldPoint.y;
			this.showObstaclePopup(this.selectedObstacleID, 1);
			return;
		}

		if (!obstacleData || typeof obstacleData !== "object") return;
		const q10Obstacle = obstacleData as Q10OverlayObstacleData;
		if (q10Obstacle.kind !== "q10Obstacle") return;

		this.popupX = q10Obstacle.x;
		this.popupY = q10Obstacle.y;
		if (q10Obstacle.obstacleId == null) return;
		this.selectedObstacleID = q10Obstacle.obstacleId;
		this.showObstaclePopup(this.selectedObstacleID, 1);

	}

	private showObstaclePopup(obstacleId: unknown, type: number): void {
		if (obstacleId == null || !this.currentRobotDuid) return;
		if (this.popupTimeout) clearTimeout(this.popupTimeout);
		this.connection
			.sendTo(this.instanceId, "get_obstacle_image", {
				obstacleId,
				duid: this.currentRobotDuid,
				type,
			})
			.then((response: any) => {
				if (response?.image) {
					let imageData = response.image as string;
					if (typeof imageData === "string" && !imageData.startsWith("data:image/")) {
						imageData = "data:image/png;base64," + imageData;
					}
					this.popupImage.src = imageData;
					this.popup.style.display = "block";
					this.triangle.style.display = "block";
					this.updatePopupPosition();
					this.popupTimeout = window.setTimeout(() => {
						this.popup.style.display = "none";
						this.triangle.style.display = "none";
						this.popupTimeout = null;
					}, 3000);
				}
		})
			.catch((err) => console.error("Error getting obstacle image:", err));
		this.updatePopupPosition();
	}

	private setPathGroupOpacityMode(isQ10: boolean): void {
		if (isQ10) {
			this.mopPathGroup.style("opacity", 1);
			this.pathGroup.style("opacity", 1);
			this.backwashPathGroup.style("opacity", 1);
			this.pureCleanPathGroup.style("opacity", 1);
			return;
		}

		this.mopPathGroup.style("opacity", 0.18);
		this.pathGroup.style("opacity", 0.5);
		this.backwashPathGroup.style("opacity", 0.2);
		this.pureCleanPathGroup.style("opacity", 1);
	}

	private normalizeQ10NativePathType(type: number | undefined): number {
		if (type === 0 || type === 1 || type === 2 || type === 3 || type === 4) return type;
		return 0;
	}

	private historyUpdateToQ10NativePathType(update: number | undefined): number {
		if (update === 6) return 0;
		if (update === 4) return 1;
		if (update === 5) return 2;
		return 0;
	}

	private getQ10PathOverlayPoints(map: Q10FrontendMapData): Array<{ x: number; y: number; type: number }> {
		const creator = map.q10CreatorData;
		if (creator?.pathPixels?.length) {
			return creator.pathPixels.map((point) => ({
				x: point.x,
				y: point.y,
				type: this.normalizeQ10NativePathType(point.type)
			}));
		}

		const resolution = Math.max(map.header.resolution, 0.001);
		const sourcePathPoints = map.q10SourceData?.pathPoints ?? [];
		if (sourcePathPoints.length) {
			return sourcePathPoints.map((point) => ({
				x: point.x / resolution,
				y: point.y / resolution,
				type: this.normalizeQ10NativePathType(point.type)
			}));
		}

		const historyPoints = map.history ?? [];
		return historyPoints.map((point) => ({
			x: (point.x - map.header.minX) / resolution,
			y: (map.header.maxY - point.y) / resolution,
			type: this.historyUpdateToQ10NativePathType(point.update)
		}));
	}

	private packageQ10PathPointsLikeNative(points: Array<{ x: number; y: number; type: number }>): Array<Array<Array<{ x: number; y: number }>>> {
		const paths: Array<Array<Array<{ x: number; y: number }>>> = [[], [], [], [], []];
		let previous: { x: number; y: number; type: number } | null = null;

		for (const point of points) {
			const bucket = paths[point.type] ?? paths[0]!;
			const changedType = previous?.type !== point.type;
			if (changedType) {
				const subPath: Array<{ x: number; y: number }> = [];
				if (previous && previous.type !== -1) {
					subPath.push({ x: previous.x, y: previous.y });
				} else {
					subPath.push({ x: point.x, y: point.y });
				}
				subPath.push({ x: point.x, y: point.y });
				bucket.push(subPath);
			} else if (bucket.length > 0) {
				bucket[bucket.length - 1]!.push({ x: point.x, y: point.y });
			}
			previous = point;
		}

		return paths;
	}

	private q10PathSegmentsToSvgPath(segments: Array<Array<{ x: number; y: number }>>, geometry: Q10MapGeometry): string {
		const drawable = segments.filter((segment) => segment.length >= 2);
		if (!drawable.length) return "";

		return drawable
			.map((segment) => {
				const start = geometry.mapPoint(segment[0]!);
				const commands = [`M${start.x} ${start.y}`];
				for (let index = 1; index < segment.length; index++) {
					const point = geometry.mapPoint(segment[index]!);
					commands.push(`L${point.x} ${point.y}`);
				}
				return commands.join(" ");
			})
			.join(" ");
	}

	private appendQ10SvgPath(
		group: d3.Selection<SVGGElement, unknown, HTMLElement, any>,
		pathData: string,
		className: string,
		stroke: string,
		lineWidth: number,
		dash?: number[],
		dashOffset = 0
	): void {
		if (!pathData) return;

		group
			.append("path")
			.attr("class", className)
			.attr("d", pathData)
			.style("fill", "none")
			.style("stroke", stroke)
			.style("stroke-width", `${lineWidth}px`)
			.style("stroke-linecap", "round")
			.style("stroke-linejoin", "round")
			.style("stroke-dasharray", dash ? dash.join(",") : null)
			.style("stroke-dashoffset", dash ? `${dashOffset}px` : null);
	}

	private drawQ10PathOverlays(map: Q10FrontendMapData, geometry: Q10MapGeometry): void {
		const points = this.getQ10PathOverlayPoints(map);
		if (!points.length) return;

		const paths = this.packageQ10PathPointsLikeNative(points);
		const primaryWidth = geometry.mapCanvasSize().width / 375;
		const glowWidth = geometry.mapLength(0.3 / Math.max(map.header.resolution, 0.001));
		const wideGlowColor = q10PackedArgbToCss(1728053247);
		const solidWhite = q10PackedArgbToCss(4294967295);
		const thinGlowColor = q10PackedArgbToCss(1728053247);
		const dashedColor = q10PackedArgbToCss(2583691263);

		const pathStyles = [
			{
				group: this.pathGroup,
				classPrefix: "q10-main-type0",
				segments: paths[0]!,
				layers: [
					{ stroke: wideGlowColor, width: glowWidth },
					{ stroke: solidWhite, width: primaryWidth }
				]
			},
			{
				group: this.mopPathGroup,
				classPrefix: "q10-main-type1",
				segments: paths[1]!,
				layers: [
					{ stroke: wideGlowColor, width: glowWidth },
					{ stroke: thinGlowColor, width: primaryWidth }
				]
			},
			{
				group: this.backwashPathGroup,
				classPrefix: "q10-main-type2",
				segments: paths[2]!,
				layers: [
					{ stroke: solidWhite, width: primaryWidth }
				]
			},
			{
				group: this.pureCleanPathGroup,
				classPrefix: "q10-main-type3",
				segments: paths[3]!,
				layers: [
					{
						stroke: dashedColor,
						width: primaryWidth,
						dash: [primaryWidth, primaryWidth * 3],
						dashOffset: primaryWidth * 3
					}
				]
			}
		] as const;

		for (const pathStyle of pathStyles) {
			const pathData = this.q10PathSegmentsToSvgPath(pathStyle.segments, geometry);
			if (!pathData) continue;
			for (let index = 0; index < pathStyle.layers.length; index++) {
				const layer = pathStyle.layers[index]!;
				this.appendQ10SvgPath(
					pathStyle.group,
					pathData,
					`${pathStyle.classPrefix}-${index}`,
					layer.stroke,
					layer.width,
					"dash" in layer ? layer.dash : undefined,
					"dashOffset" in layer ? layer.dashOffset : 0
				);
			}
		}
	}

	private drawQ10Overlays(map: Q10FrontendMapData): void {
		const creator = map.q10CreatorData;
		if (!creator?.q10Detected) return;

		this.carpetGroup.selectAll("*").remove();
		this.pathGroup.selectAll("*").remove();
		this.mopPathGroup.selectAll("*").remove();
		this.backwashPathGroup.selectAll("*").remove();
		this.pureCleanPathGroup.selectAll("*").remove();
		this.chargerGroup.selectAll("*").remove();
		this.robotGroup.selectAll("*").remove();
		this.zonesOverlayGroup.selectAll("*").remove();
		this.obstacleGroup.selectAll("*").remove();
		this.roomNameGroup.selectAll("*").remove();
		this.drawZones();
		const modelFolder =
			this.model ||
			(this.currentRobotDuid && this.robotModels[this.currentRobotDuid]) ||
			"roborock.vacuum.ss09";
		const baseUrl = `assets/${modelFolder}/drawable-mdpi/`;
		const geometry = new Q10MapGeometry(map, 1, this.getQ10CanvasScale(map));
		const renderer = this.createSvgRendererWithOptions(baseUrl, null, {
			obstacleRadius: 0,
			obstacleImageSize: geometry.imgRateLength(6),
			robotSize: geometry.imgRateLength(8),
			chargerSize: geometry.imgRateLength(8)
		});

		this.drawQ10PathOverlays(map, geometry);
		this.drawQ10RoomSelectionMask(creator, geometry);

		const virtualWalls: DrawVirtualWallInput[] = creator.virtualWalls
			.filter((wall) => wall.points.length >= 2)
			.map((wall) => {
				const start = geometry.mapPoint(wall.points[0]!);
				const end = geometry.mapPoint(wall.points[1]!);
				return {
					x1: start.x,
					y1: start.y,
					x2: end.x,
					y2: end.y,
					stroke: "rgba(255, 69, 58, 1)",
					lineWidth: Math.max(2, geometry.layoutLength(2))
				};
			});

		if (virtualWalls.length) {
			renderer.drawRestrictedZones([], virtualWalls);
		}

		if (creator.chargerPixel) {
			const chargerPoint = geometry.mapPoint(creator.chargerPixel);
			renderer.drawCharger({
				x: chargerPoint.x,
				y: chargerPoint.y
			});
		}

		if (creator.robotPixel) {
			const robotPose = geometry.mapPose(creator.robotPixel);
			if (robotPose) {
				renderer.drawRobot({
					x: robotPose.x,
					y: robotPose.y,
					angle: robotPose.phi ?? 0
				});
			}
		}

		const obstacleItems: DrawObstacleInput[] = [];
		for (const entry of creator.obstaclePixels) {
			const point = geometry.mapPoint(entry.point);
			obstacleItems.push({
				x: point.x,
				y: point.y,
				typeOrSuffix: "q10",
				imageHref: `${baseUrl}src_resources_map_images_light_mapobstacle.png`,
				imageSize: geometry.imgRateLength(6),
				hideBackground: true,
				obstacleData: { kind: "q10Obstacle", type: "obstacle", x: point.x, y: point.y } satisfies Q10OverlayObstacleData
			});
		}
		for (const entry of creator.skipPixels) {
			const point = geometry.mapPoint(entry.point);
			obstacleItems.push({
				x: point.x,
				y: point.y,
				typeOrSuffix: "q10-skip",
				imageHref: `${baseUrl}src_resources_map_images_light_map_tiaoguo_icon.png`,
				imageSize: geometry.imgRateLength(6),
				hideBackground: true,
				obstacleData: { kind: "q10Obstacle", type: "skip", x: point.x, y: point.y } satisfies Q10OverlayObstacleData
			});
		}
		for (const entry of creator.suspectedPoints) {
			const point = geometry.mapPoint(entry.point);
			const imageHref =
				entry.type === "threshold"
					? `${baseUrl}src_resources_map_images_light_map_yisi_menkan.png`
					: entry.type === "easycard"
						? `${baseUrl}src_resources_map_images_light_map_yisi_yika.png`
						: `${baseUrl}src_resources_map_images_light_map_yisi_xuanya.png`;
			obstacleItems.push({
				x: point.x,
				y: point.y,
				typeOrSuffix: `q10-${entry.type}`,
				imageHref,
				imageSize: geometry.layoutLength(16),
				hideBackground: true,
				obstacleData: { kind: "q10Obstacle", type: entry.type, x: point.x, y: point.y } satisfies Q10OverlayObstacleData
			});
		}

		const roomLabels: DrawRoomLabelInput[] = creator.roomModels
			.filter((room) => room.roomName && room.roomName.trim())
			.map((room) => {
				const label = room.roomName.trim();
				const point = geometry.mapPoint(room.transCenterPoint);
				const colorIndex = room.colorID >= 0 && room.colorID < Q10_ROOM_TAG_BASE.length ? room.colorID : 0;
				const textWidth = measureQ10RoomLabelWidth(label);
				const bubbleDiameter = Q10_ROOM_LABEL_LAYOUT.bubbleRadius * 2;
				const totalWidth = bubbleDiameter + Q10_ROOM_LABEL_LAYOUT.gap + textWidth + Q10_ROOM_LABEL_LAYOUT.widthPadding;
				const bubbleCenterOffsetX = -totalWidth / 2 + Q10_ROOM_LABEL_LAYOUT.bubbleRadius;
				const textOffsetX = -totalWidth / 2 + bubbleDiameter + Q10_ROOM_LABEL_LAYOUT.gap;
				return {
					segmentId: room.roomID,
					x: point.x,
					y: point.y,
					text: label,
					iconHref: `${baseUrl}${q10RoomTagAssetFileName(room.roomType)}`,
					bubbleFill: Q10_ROOM_TAG_BASE[colorIndex],
					bubbleStroke: Q10_ROOM_TAG_STROKE[colorIndex],
					textFill: Q10_ROOM_TAG_BASE[colorIndex],
					badgeText: room.cleanOrder > 0 ? String(room.cleanOrder) : null,
					bubbleRadius: Q10_ROOM_LABEL_LAYOUT.bubbleRadius,
					iconSize: Q10_ROOM_LABEL_LAYOUT.iconSize,
					gap: Q10_ROOM_LABEL_LAYOUT.gap,
					bubbleCenterOffsetX,
					textOffsetX,
					badgeCenterOffsetX: bubbleCenterOffsetX - 3,
					badgeCenterOffsetY: 12
				};
			});

		renderer.drawObstacles(obstacleItems);
		renderer.drawRoomLabels(roomLabels);
	}

	private updateBackgroundImageFromStateCache(): void {
		const image = this.currentMapBase64Clean;
		if (!image) {
			this.mapImageElement.attr("href", null);
			return;
		}

		this.pinGroup.select("image.goto-pin").style("display", "none").style("opacity", 0);
		this.drawBackgroundImage(image);
	}

	private parseQ10CleaningInfoState(raw: unknown): Record<string, unknown> | null {
		if (!raw) return null;
		if (typeof raw === "string") {
			try {
				const parsed = JSON.parse(raw);
				return parsed && typeof parsed === "object" && !Array.isArray(parsed)
					? parsed as Record<string, unknown>
					: null;
			} catch {
				return null;
			}
		}

		return typeof raw === "object" && !Array.isArray(raw)
			? raw as Record<string, unknown>
			: null;
	}

	private parseQ10RoomIdsState(raw: unknown): number[] {
		if (!raw) return [];

		const normalize = (value: unknown): number[] => {
			if (!Array.isArray(value)) return [];
			return value
				.map((entry) => Number(entry))
				.filter((entry) => Number.isInteger(entry) && entry > 0);
		};

		if (typeof raw === "string") {
			try {
				return normalize(JSON.parse(raw));
			} catch {
				return [];
			}
		}

		return normalize(raw);
	}

	private getQ10SelectedRoomIds(): Set<number> {
		if (this.q10Status !== 18) return new Set<number>();

		if (this.q10CurrentCleanRoomIds.length > 0) {
			return new Set(this.q10CurrentCleanRoomIds);
		}

		const cleanInfo = this.q10CleaningInfo;
		if (!cleanInfo) return new Set<number>();

		const cleanInfoRoomIds = this.parseQ10RoomIdsState(cleanInfo.room_id_list);
		if (cleanInfoRoomIds.length > 0) {
			return new Set(cleanInfoRoomIds);
		}

		const targetSegmentId = Number(cleanInfo.target_segment_id);
		if (Number.isInteger(targetSegmentId) && targetSegmentId > 0) {
			return new Set([targetSegmentId]);
		}

		return new Set<number>();
	}

	private getQ10CanvasScale(map: Q10FrontendMapData): number {
		const naturalWidth = this.image?.naturalWidth ?? 0;
		const sizeX = map.header?.sizeX ?? 0;
		if (naturalWidth > 0 && sizeX > 0) {
			return naturalWidth / sizeX;
		}
		return Q10_CANVAS_SCALE;
	}

	private q10PolygonToSvgPath(points: Array<{ x: number; y: number }>, geometry: Q10MapGeometry): string {
		if (points.length < 2) return "";
		const start = geometry.mapPoint(points[0]!);
		const segments = [`M${start.x} ${start.y}`];
		for (let index = 1; index < points.length; index++) {
			const point = geometry.mapPoint(points[index]!);
			segments.push(`L${point.x} ${point.y}`);
		}
		segments.push("Z");
		return segments.join(" ");
	}

	private drawQ10RoomSelectionMask(
		creator: NonNullable<Q10FrontendMapData["q10CreatorData"]>,
		geometry: Q10MapGeometry
	): void {
		this.zonesOverlayGroup.selectAll("*").remove();

		const selectedRoomIds = this.getQ10SelectedRoomIds();
		if (!selectedRoomIds.size) return;

		const roomMaskPath = creator.roomModels
			.filter((room) => !selectedRoomIds.has(room.roomID))
			.flatMap((room) => room.borderArr)
			.map((polygon) => this.q10PolygonToSvgPath(polygon, geometry))
			.filter(Boolean)
			.join(" ");

		if (!roomMaskPath) return;

		this.zonesOverlayGroup
			.append("path")
			.attr("class", "q10-room-selection-mask")
			.attr("d", roomMaskPath)
			.attr("fill", "rgba(0, 0, 0, 0.36)")
			.attr("fill-rule", "evenodd");
	}

	private applyRoomLabelZoomBehavior(): void {
		const zoomScale = 1 / Math.max(this.wheelZoom, 0.001);
		this.roomNameGroup.selectAll<SVGGElement, unknown>("g.room-label").each(function () {
			const element = d3.select(this);
			const x = Number(element.attr("data-x") || 0);
			const y = Number(element.attr("data-y") || 0);
			element.attr("transform", `translate(${x}, ${y}) scale(${zoomScale})`);
		});
	}

	private updateMapImageSize() {
		if (!this.image.naturalWidth || !this.image.naturalHeight) return;

		// Use natural size of the image (1:1 scale)
		const displayWidth = this.image.naturalWidth;
		const displayHeight = this.image.naturalHeight;

		this.mapImageElement
			.attr("href", this.image.src)
			.attr("width", displayWidth)
			.attr("height", displayHeight)
			.attr("transform", null)
			.style("image-rendering", "pixelated");
	}

	private drawBackgroundImage(mapBase64: string) {
		if (!mapBase64) {
			this.mapImageElement.attr("href", null);
			return;
		}

		this.image.src = mapBase64;
		this.image.onload = () => {
			const tempCanvas = document.createElement("canvas");
			const tempCtx = tempCanvas.getContext("2d", { willReadFrequently: true });
			if (!tempCtx) return;

			tempCanvas.width = this.image.width;
			tempCanvas.height = this.image.height;
			tempCtx.imageSmoothingEnabled = false;
			tempCtx.drawImage(this.image, 0, 0);

			let mapMaxX = 0;
			this.mapMaxY = 0;
			this.mapMinX = this.image.width;
			this.mapMinY = this.image.height;

			const imageData = tempCtx.getImageData(0, 0, this.image.width, this.image.height);
			const pixels = imageData.data;
			for (let i = 0; i < pixels.length; i += 4) {
				const alpha = pixels[i + 3];
				if (alpha > 50) {
					const x = (i / 4) % this.image.width;
					const y = Math.floor(i / 4 / this.image.width);
					if (x < this.mapMinX) this.mapMinX = x;
					if (x > mapMaxX) mapMaxX = x;
					if (y < this.mapMinY) this.mapMinY = y;
					if (y > this.mapMaxY) this.mapMaxY = y;
				}
			}

			if (this.mapMinX > mapMaxX) {
				this.mapMinX = 0;
				mapMaxX = this.image.width;
				this.mapMinY = 0;
				this.mapMaxY = this.image.height;
			}

			// Calculate content dimensions based on detected pixels
			this.mapSizeX = mapMaxX - this.mapMinX;
			this.mapSizeY = this.mapMaxY - this.mapMinY;

			// Sanity check
			if (this.mapSizeX <= 0) this.mapSizeX = this.image.width;
			if (this.mapSizeY <= 0) this.mapSizeY = this.image.height;

			this.updateMapImageSize();

			this.carpetGroup.attr("transform", null);

			const svgWidth = parseFloat(this.svg.attr("width")) || 800;
			const svgHeight = parseFloat(this.svg.attr("height")) || 600;

			// Zoom-to-fit calculations
			const aspectRatio = svgWidth / svgHeight;
			const contentAspectRatio = this.mapSizeX / this.mapSizeY;

			if (contentAspectRatio > aspectRatio) {
				this.zoomLevel = this.roundTwoDecimals((svgWidth * 0.95) / this.mapSizeX); // 95% fit
			} else {
				this.zoomLevel = this.roundTwoDecimals((svgHeight * 0.95) / this.mapSizeY);
			}

			if (this.zoomLevel < 0.1) this.zoomLevel = 0.1;

			// Center the content within the SVG
			const contentCenterX = this.mapMinX + this.mapSizeX / 2;
			const contentCenterY = this.mapMinY + this.mapSizeY / 2;

			this.initialTransform = d3.zoomIdentity
				.translate(svgWidth / 2, svgHeight / 2)
				.scale(this.zoomLevel)
				.translate(-contentCenterX, -contentCenterY);

			this.svgContainer.call(this.zoom.transform as any, this.initialTransform);

			if (this.map) {
				this.drawOverlaysFromMap();
			}
		};
	}

	private drawZones() {
		const dragHandler = d3
			.drag<SVGGElement, Rect>()
			.on("start", (event: any) => {
				const element = event.sourceEvent.target.closest("g.zone");
				if (element) d3.select(element).raise().style("cursor", "grabbing");
				this.deleteButton.disabled = false;
			})
			.on("drag", (event: any, d: Rect) => {
				if (!this.hasDrawableMapBounds()) return;
				const minBoundX = this.mapMinX,
					minBoundY = this.mapMinY,
					maxBoundX = this.mapMinX + this.mapSizeX,
					maxBoundY = this.mapMinY + this.mapSizeY;
				let newX = Math.max(minBoundX, d.x + event.dx);
				let newY = Math.max(minBoundY, d.y + event.dy);
				if (newX + d.width > maxBoundX) newX = maxBoundX - d.width;
				if (newY + d.height > maxBoundY) newY = maxBoundY - d.height;
				d.x = newX;
				d.y = newY;
				const element = event.sourceEvent.target.closest("g.zone");
				if (element) d3.select(element).attr("transform", `translate(${d.x}, ${d.y})`);
			})
			.on("end", (event: any) => {
				const element = event.sourceEvent.target.closest("g.zone");
				if (element) d3.select(element).style("cursor", "move");
				this.updateRobotZones();
			});

		const resizeHandler = d3
			.drag<SVGCircleElement, Rect>()
			.on("start", (event: any) => {
				event.sourceEvent.stopPropagation();
				const element = event.sourceEvent.target;
				if (element) d3.select(element).raise();
			})
			.on("drag", (event: any, d: Rect) => {
				if (!this.hasDrawableMapBounds()) return;
				const maxBoundX = this.mapMinX + this.mapSizeX,
					maxBoundY = this.mapMinY + this.mapSizeY;
				let newWidth = Math.max(d.width + event.dx, 20);
				let newHeight = Math.max(d.height + event.dy, 20);
				if (d.x + newWidth > maxBoundX) newWidth = maxBoundX - d.x;
				if (d.y + newHeight > maxBoundY) newHeight = maxBoundY - d.y;
				d.width = newWidth;
				d.height = newHeight;
				const element = event.sourceEvent.target;
				if (element) {
					const parentGroup = d3.select(element.parentNode as SVGGElement);
					parentGroup.select("rect").attr("width", d.width).attr("height", d.height);
					parentGroup.select("circle.zone-handle").attr("cx", d.width).attr("cy", d.height);
				}
			})
			.on("end", () => this.updateRobotZones());

		const selection = this.zoneGroup.selectAll("g.zone").data(this.rects, (d: any) => d.id);
		selection.exit().remove();
		const enterGroup = selection.enter().append("g").attr("class", "zone").call(dragHandler as any);
		enterGroup.append("rect").attr("class", "zone-rect").attr("x", 0).attr("y", 0).style("stroke-width", this.rescaler.zoneStrokeWidth());
		enterGroup.append("circle").attr("class", "zone-handle").attr("r", this.rescaler.zoneHandleRadius()).call(resizeHandler as any);
		const mergedSelection = selection.merge(enterGroup as any);
		mergedSelection.attr("transform", (d: Rect) => `translate(${d.x}, ${d.y})`);
		mergedSelection
			.select("rect")
			.attr("width", (d: Rect) => d.width)
			.attr("height", (d: Rect) => d.height)
			.style("stroke-width", this.rescaler.zoneStrokeWidth());
		mergedSelection
			.select("circle.zone-handle")
			.attr("cx", (d: Rect) => d.width)
			.attr("cy", (d: Rect) => d.height)
			.attr("r", this.rescaler.zoneHandleRadius());
	}

	// -----------------------------------------------------------------------------
	// Helper Methods
	// -----------------------------------------------------------------------------

	private updateRobotZones() {
		const params = this.getMapParams();
		if (!params) return;
		const cleanCountInput = document.getElementById("cleanCount") as HTMLInputElement;
		this.zones = [];
		const cleanCount = parseInt(cleanCountInput.value) || 1;
		for (const rect of this.rects) {
			const p1 = { x: rect.x, y: rect.y };
			const p2 = { x: rect.x + rect.width, y: rect.y + rect.height };
			const coords1 = localCoordsToRobotCoords(p1, params);
			const coords2 = localCoordsToRobotCoords(p2, params);
			this.zones.push([
				Math.min(coords1.x, coords2.x),
				Math.min(coords1.y, coords2.y),
				Math.max(coords1.x, coords2.x),
				Math.max(coords1.y, coords2.y),
				cleanCount,
			]);
		}
	}

	private updatePopupPosition() {
		if (this.popup.style.display === "block" && this.popupX !== undefined && this.popupY !== undefined) {
			const transform = d3.zoomTransform(this.svgContainer.node() as Element);
			const svgCoords = this.worldToSvgCoords(this.popupX, this.popupY);
			const screenCoords = transform.apply([svgCoords.x, svgCoords.y]);
			this.popup.style.left = `${screenCoords[0]}px`;
			this.popup.style.top = `${screenCoords[1]}px`;
		}
	}

	private handleZoom(event: any) {
		const transform = event.transform;
		this.mainGroup.attr("transform", transform);
		this.wheelZoom = transform.k;

		this.zoneGroup.selectAll("rect.zone-rect").style("stroke-width", this.rescaler.zoneStrokeWidth());
		this.zoneGroup.selectAll("circle.zone-handle").attr("r", this.rescaler.zoneHandleRadius());

		const q10Geometry = isQ10MapData(this.map)
			? new Q10MapGeometry(this.map, 1, this.getQ10CanvasScale(this.map))
			: null;
		const scaledRobotSize = q10Geometry ? q10Geometry.imgRateLength(8) : this.rescaler.robotSize();
		const params = this.getMapParams();
		this.robotGroup.selectAll("image.robot").attr("width", scaledRobotSize).attr("height", scaledRobotSize);
		if (params && this.map?.ROBOT_POSITION?.position) {
			const pos = this.map.ROBOT_POSITION.position;
			const svgCoords = this.robotToSvg({ x: pos[0], y: pos[1] }, params);
			const angle = -(this.map.ROBOT_POSITION.angle ?? 0) + 90;
			this.robotGroup
				.selectAll("image.robot")
				.attr("transform", `translate(${svgCoords.x}, ${svgCoords.y}) rotate(${angle}) translate(${-scaledRobotSize / 2}, ${-scaledRobotSize / 2})`);
		}

		const scaledChargerSize = q10Geometry ? q10Geometry.imgRateLength(8) : this.rescaler.chargerSize();
		this.chargerGroup.selectAll("image.charger").attr("width", scaledChargerSize).attr("height", scaledChargerSize);
		if (params && this.map?.CHARGER_LOCATION?.position) {
			const pos = this.map.CHARGER_LOCATION.position;
			const c = this.robotToSvg({ x: pos[0], y: pos[1] }, params);
			this.chargerGroup
				.selectAll("image.charger")
				.attr("x", c.x - scaledChargerSize / 2)
				.attr("y", c.y - scaledChargerSize / 2);
		}

		this.pathGroup.selectAll("path.main-path").style("stroke-width", `${this.rescaler.pathMainWidth()}px`);
		this.backwashPathGroup.selectAll("path.backwash-path").style("stroke-width", `${this.rescaler.pathBackwashWidth()}px`);
		this.mopPathGroup.selectAll("path.mop-path").style("stroke-width", `${this.rescaler.pathMopWidth()}px`);
		this.pureCleanPathGroup.selectAll("path.pure-clean-path").style("stroke-width", `${this.rescaler.pathBackwashWidth()}px`);

		const scaledPinWidth = this.rescaler.pinWidth();
		const scaledPinHeight = this.rescaler.pinHeight();
		const scaledPinYOffset = this.rescaler.pinYOffset();
		this.pinGroup
			.selectAll("image.goto-pin")
			.attr("width", scaledPinWidth)
			.attr("height", scaledPinHeight)
			.attr("x", function () {
				const centerX = d3.select(this).attr("data-center-x");
				return (parseFloat(centerX) || 0) - scaledPinWidth / 2;
			})
			.attr("y", function () {
				const centerY = d3.select(this).attr("data-center-y");
				return (parseFloat(centerY) || 0) - (scaledPinHeight - scaledPinYOffset);
			});

		this.applyRoomLabelZoomBehavior();
		this.updatePopupPosition();
	}

	private getMapParams(): MapParams | null {
		if (this.mapImage?.dimensions) {
			// coordTransformation expects imageWidth/imageHeight in display pixels (grid × VISUAL_BLOCK_SIZE)
			// mapData stores grid dimensions (unscaled); carpet uses them as grid, paths/robot/obstacles need display size here
			const imageWidth = this.mapImage.dimensions.width * VISUAL_BLOCK_SIZE;
			const imageHeight = this.mapImage.dimensions.height * VISUAL_BLOCK_SIZE;
			return {
				scaleFactor: VISUAL_BLOCK_SIZE,
				left: this.mapImage.position.left,
				topMap: this.mapImage.position.top,
				mapMaxY: this.mapMaxY,
				imageHeight,
				imageWidth,
			};
		}

		if (this.map && isQ10MapData(this.map)) {
			const { header } = this.map;
			if (
				!Number.isFinite(header.minX) ||
				!Number.isFinite(header.minY) ||
				!Number.isFinite(header.sizeX) ||
				!Number.isFinite(header.sizeY) ||
				!Number.isFinite(header.resolution) ||
				header.resolution <= 0
			) {
				return null;
			}

			return {
				scaleFactor: VISUAL_BLOCK_SIZE,
				left: header.minX / header.resolution,
				topMap: header.minY / header.resolution,
				mapMaxY: this.mapMaxY,
				imageHeight: header.sizeY * VISUAL_BLOCK_SIZE,
				imageWidth: header.sizeX * VISUAL_BLOCK_SIZE,
			};
		}

		return null;
	}

	private hasDrawableMapBounds(): boolean {
		return Number.isFinite(this.mapMinX)
			&& Number.isFinite(this.mapMinY)
			&& Number.isFinite(this.mapSizeX)
			&& Number.isFinite(this.mapSizeY)
			&& this.mapSizeX > 0
			&& this.mapSizeY > 0;
	}

	private screenToWorldCoords(x: number, y: number): Point {
		if (this.mapMinX === undefined || this.mapMinY === undefined) return { x: 0, y: 0 };
		const transform = d3.zoomTransform(this.svgContainer.node() as Element);
		const inverted = transform.invert([x, y]);
		return { x: inverted[0], y: inverted[1] };
	}

	private worldToSvgCoords(x: number, y: number): Point {
		// Since we no longer translate the background image (it sits at 0,0),
		// we should not subtract mapMinX from the coordinates.
		// However, World Coordinates (from coords.ts) are 0-based relative to the Grid.
		// And the Image starts at Grid 0.
		// So WorldX = SvgX.
		return { x: x, y: y };
	}

	private robotToSvg(robotPoint: Point, params: any): Point {
		const worldPoint = robotCoordsToLocalCoords(robotPoint, params);
		return this.worldToSvgCoords(worldPoint.x, worldPoint.y);
	}

	private roundTwoDecimals(number: number): number {
		return Math.round(number * 100) / 100;
	}

	private getQueryParam(param: string): string | null {
		const urlParams = new URLSearchParams(window.location.search);
		return urlParams.get(param);
	}

	private bindUiEvents() {
		this.robotSelect.addEventListener("change", () => {
			const newDuid = this.robotSelect.value;
			if (newDuid && newDuid !== this.currentRobotDuid) {
				this.currentRobotDuid = newDuid;
				this.setupSocketListeners(newDuid);
			}
		});

		this.deleteButton.addEventListener("click", () => {
			if (this.rects.length > 0) {
				this.rects.pop();
				this.drawZones();
				if (this.rects.length < 5) this.addButton.disabled = false;
				if (this.rects.length < 1) this.deleteButton.disabled = true;
			}
		});

		this.addButton.addEventListener("click", () => {
			if (this.goToTarget) {
				this.goToTarget = false;
				this.svg.style("cursor", "grab");
				this.svgContainer.on("mousemove.gototarget", null);
				this.svgContainer.on("click.gototarget", null);
				this.pinGroup.select("image.goto-pin").style("display", "none").style("opacity", 0);
				this.goToButton.textContent = "GoTo Point";
				return;
			}
			const svgWidth = parseFloat(this.svg.attr("width"));
			const svgHeight = parseFloat(this.svg.attr("height"));
			const centerWorld = this.screenToWorldCoords(svgWidth / 2, svgHeight / 2);
			const params = this.getMapParams();
			if (!params) return;

			this.rects.push({
				id: this.rectCounter++,
				x: centerWorld.x - 25 * params.scaleFactor,
				y: centerWorld.y - 25 * params.scaleFactor,
				width: 50 * params.scaleFactor,
				height: 50 * params.scaleFactor,
			});
			this.drawZones();
			if (this.rects.length > 0) this.deleteButton.disabled = false;
			if (this.rects.length > 4) this.addButton.disabled = true;
			this.updateRobotZones();
		});

		this.startButton.addEventListener("click", () => {
			if (!this.currentRobotDuid) return;
			this.updateRobotZones();
			const command = this.zones.length > 0 ? "app_zoned_clean" : "app_start";
			const parameters = this.zones.length > 0 ? { zones: this.zones, duid: this.currentRobotDuid } : { duid: this.currentRobotDuid };
			this.connection.sendTo(this.instanceId, command, parameters).catch((err) => console.error("Error sending command:", err));
			this.rects = [];
			this.drawZones();
			this.deleteButton.disabled = true;
			this.addButton.disabled = false;
			this.startButton.style.display = "none";
			this.pauseButton.style.display = "inline-block";
		});

		this.pauseButton.addEventListener("click", () => {
			if (!this.currentRobotDuid) return;
			this.connection.sendTo(this.instanceId, "app_pause", { duid: this.currentRobotDuid });
			this.startButton.style.display = "inline-block";
			this.pauseButton.style.display = "none";
		});

		this.stopButton.addEventListener("click", () => {
			if (!this.currentRobotDuid) return;
			this.connection.sendTo(this.instanceId, "app_stop", { duid: this.currentRobotDuid });
			this.startButton.style.display = "inline-block";
			this.pauseButton.style.display = "none";
		});

		this.dockButton.addEventListener("click", () => {
			if (!this.currentRobotDuid) return;
			this.connection.sendTo(this.instanceId, "app_charge", { duid: this.currentRobotDuid });
		});

		this.goToButton.addEventListener("click", () => {
			if (this.goToTarget) {
				this.goToTarget = false;
				this.svg.style("cursor", "grab");
				this.svgContainer.on("mousemove.gototarget", null);
				this.svgContainer.on("click.gototarget", null);
				this.pinGroup.select("image.goto-pin").style("display", "none").style("opacity", 0);
				this.goToButton.textContent = "GoTo Point";
				return;
			}
			this.goToTarget = true;
			this.svg.style("cursor", "none");
			this.goToButton.textContent = "Cancel";
			const transform = d3.zoomTransform(this.svgContainer.node() as Element);
			const svgWidth = parseFloat(this.svg.attr("width"));
			const svgHeight = parseFloat(this.svg.attr("height"));
			const [initialX, initialY] = transform.invert([svgWidth / 2, svgHeight / 2]);
			const scaledPinWidth = this.rescaler.pinWidth();
			const scaledPinHeight = this.rescaler.pinHeight();
			const scaledPinYOffset = this.rescaler.pinYOffset();
			const pin = this.pinGroup.select("image.goto-pin");
			pin
				.style("display", "block")
				.style("opacity", 0.7)
				.attr("data-center-x", initialX)
				.attr("data-center-y", initialY)
				.attr("x", initialX - scaledPinWidth / 2)
				.attr("y", initialY - (scaledPinHeight - scaledPinYOffset));

			this.svgContainer.on("mousemove.gototarget", (event: MouseEvent) => {
				const [mouseX, mouseY] = d3.pointer(event, this.mainGroup.node());
				const scaledW = this.rescaler.pinWidth();
				const scaledH = this.rescaler.pinHeight();
				const scaledOff = this.rescaler.pinYOffset();
				pin
					.attr("data-center-x", mouseX)
					.attr("data-center-y", mouseY)
					.attr("x", mouseX - scaledW / 2)
					.attr("y", mouseY - (scaledH - scaledOff));
			});

			this.svgContainer.on("click.gototarget", (event: MouseEvent) => {
				event.stopImmediatePropagation();
				const params = this.getMapParams();
				if (!this.currentRobotDuid || !params) return;
				const [mouseX, mouseY] = d3.pointer(event, this.mainGroup.node());
				const worldX = mouseX;
				const worldY = mouseY;
				const point = localCoordsToRobotCoords({ x: worldX, y: worldY }, params);
				this.connection.sendTo(this.instanceId, "app_goto_target", { points: [point.x, point.y], duid: this.currentRobotDuid });
				pin.style("opacity", 1.0);
				this.goToTarget = false;
				this.svg.style("cursor", "grab");
				this.svgContainer.on("mousemove.gototarget", null);
				this.svgContainer.on("click.gototarget", null);
				this.goToButton.textContent = "GoTo Point";
			});
		});

		this.resetZoomButton.addEventListener("click", () => {
			if (this.initialTransform) {
				this.svgContainer.transition().duration(750).call(this.zoom.transform as any, this.initialTransform);
			}
		});

		this.popupImage.addEventListener("click", () => {
			this.largePhoto.style.display = "block";
			this.popup.style.display = "none";
			this.triangle.style.display = "none";
			if (this.popupTimeout) clearTimeout(this.popupTimeout);
			this.popupTimeout = null;
			if (!this.currentRobotDuid || !this.selectedObstacleID) return;
			this.largePhotoImage.src = "";
			this.largePhotoBBox.style.display = "none";

			this.connection
				.sendTo(this.instanceId, "get_obstacle_image", { obstacleId: this.selectedObstacleID, duid: this.currentRobotDuid, type: 0 })
				.then((response: any) => {
					if (response && (response as any).image) {
						let imageData = (response as any).image as string;
						if (typeof imageData === "string" && !imageData.startsWith("data:image/")) imageData = "data:image/png;base64," + imageData;
						// Define the onload handler BEFORE setting .src to avoid race conditions
						this.largePhotoImage.onload = () => {
							// Handle Bounding Box scaling if present
							if (response.bbox) {
								const bbox = response.bbox;
								const displayedWidth = this.largePhotoImage.clientWidth;
								const displayedHeight = this.largePhotoImage.clientHeight;

								// Calculate scaling factor
								// Calculate scaling factor, protecting against zero division
								if (bbox.imageWidth > 0 && bbox.imageHeight > 0) {
									const scaleX = displayedWidth / bbox.imageWidth;
									const scaleY = displayedHeight / bbox.imageHeight;

									// Position BBox
									this.largePhotoBBox.style.left = (bbox.x * scaleX) + "px";
									this.largePhotoBBox.style.top = (bbox.y * scaleY) + "px";
									this.largePhotoBBox.style.width = (bbox.w * scaleX) + "px";
									this.largePhotoBBox.style.height = (bbox.h * scaleY) + "px";
									this.largePhotoBBox.style.display = "block";
								}
							}
						};
						this.largePhotoImage.src = imageData.replace(/\s/g, "");
					}
				})
				.catch((err) => console.error("Error getting large obstacle image:", err));
		});

		this.largePhoto.addEventListener("click", () => {
			this.largePhoto.style.display = "none";
		});
	}


	// Rescaler Helper
	private get rescaler() {
		return {
			scale: () => VISUAL_BLOCK_SIZE,
			robotSize: () => VISUAL_BLOCK_SIZE * UI_CONSTANTS.ROBOT_SIZE_BASE,
			chargerSize: () => VISUAL_BLOCK_SIZE * UI_CONSTANTS.CHARGER_SIZE_BASE,
			zoneStrokeWidth: () => UI_CONSTANTS.ZONE_STROKE_BASE / this.wheelZoom,
			zoneHandleRadius: () => UI_CONSTANTS.ZONE_HANDLE_RADIUS_BASE / this.wheelZoom,
			pinWidth: () => UI_CONSTANTS.PIN_WIDTH_BASE / this.wheelZoom,
			pinHeight: () => UI_CONSTANTS.PIN_HEIGHT_BASE / this.wheelZoom,
			pinYOffset: () => UI_CONSTANTS.PIN_Y_OFFSET_BASE / this.wheelZoom,
			pathMopWidth: () => UI_CONSTANTS.PATH_MOP_WIDTH_BASE * VISUAL_BLOCK_SIZE,
			pathMainWidth: () => Math.max(1, VISUAL_BLOCK_SIZE * UI_CONSTANTS.PATH_MAIN_WIDTH_RATIO_BASE),
			pathBackwashWidth: () => UI_CONSTANTS.PATH_BACKWASH_WIDTH_BASE * VISUAL_BLOCK_SIZE,
		};
	}
}

// =================================================================================
// --- Main Entry Point ---
// =================================================================================

window.onload = async () => {
	const app = new MapApplication();
	app.init().catch((err) => console.error("Failed to initialize Map Application:", err));
};
