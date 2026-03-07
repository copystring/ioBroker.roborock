import * as d3 from "d3";
import { localCoordsToRobotCoords, robotCoordsToLocalCoords } from "../common/coordTransformation";
import { drawMapV1 } from "../common/mapDrawing/drawMapV1";
import { IMG_CHARGER, IMG_GO_TO_PIN, IMG_ROBOT_ORIGINAL } from "../common/images";
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
	private map: MapData | undefined;
	private mapImage: MapData["IMAGE"] | undefined;
	private mapMinX: number = 0;
	private mapMinY: number = 0;
	private mapSizeX: number = 0;
	private mapSizeY: number = 0;
	private mapMaxY: number = 0;
	private goToTarget = false;
	private zoomLevel = 0.55;

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

		const mapBase64StateId = `${this.instanceId}.Devices.${duid}.map.mapBase64Clean`;
		const mapDataStateId = `${this.instanceId}.Devices.${duid}.map.mapData`;

		this.currentMapSubscriptions = [mapBase64StateId, mapDataStateId];

		this.onStateChange = (id: string, state: any | null | undefined) => {
			if (!state || !state.val) {
				if (id === mapBase64StateId) {
					this.mapImageElement.attr("href", null);
				}
				if (id === mapDataStateId) {
					this.map = undefined;
					this.robotGroup.selectAll("*").remove();
				}
				return;
			}

			switch (id) {
				case mapBase64StateId:
					this.pinGroup.select("image.goto-pin").style("display", "none").style("opacity", 0);
					this.drawBackgroundImage(state.val as string);
					break;

				case mapDataStateId:
					try {
						this.map = typeof state.val === "string" ? JSON.parse(state.val) : state.val;
						if (this.map && this.map.IMAGE) {
							this.model = this.map.model ?? this.robotModels[this.currentRobotDuid] ?? null;
							this.mapImage = this.map.IMAGE;
							this.updateMapImageSize();
							this.drawOverlaysFromMap();
						}
					} catch (e) {
						console.error("Failed to parse map data JSON:", state.val, e);
					}
					break;
			}
		};

		this.connection.subscribeState(mapBase64StateId);
		this.connection.subscribeState(mapDataStateId);

		this.connection.getStates([mapBase64StateId, mapDataStateId]).then((states: Record<string, any | null | undefined>) => {
			if (!this.onStateChange) return;

			// Try to resolve model from map if already populated
			if (this.robotModels[duid]) {
				this.model = this.robotModels[duid];
			}

			this.onStateChange(mapBase64StateId, states[mapBase64StateId]);
			this.onStateChange(mapDataStateId, states[mapDataStateId]);
		});
	}
	// -----------------------------------------------------------------------------
	// Drawing Methods (single source: drawMapV1 + SVGMapRenderer)
	// -----------------------------------------------------------------------------

	/** Draws all map overlays via shared drawMapV1. Call when map or mapData changes. */
	private drawOverlaysFromMap(): void {
		if (!this.map || !this.mapImage?.dimensions) return;
		const params = this.getMapParams();
		if (!params) return;

		this.pinGroup.select("image.goto-pin").style("display", "none").style("opacity", "0");

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

		const renderer = new SVGMapRenderer({
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
			robotSize: this.rescaler.robotSize(),
			chargerSize: this.rescaler.chargerSize(),
			pinWidth: this.rescaler.pinWidth(),
			pinHeight: this.rescaler.pinHeight(),
			pinYOffset: this.rescaler.pinYOffset(),
			obstacleRadius: this.rescaler.scale() * UI_CONSTANTS.OBSTACLE_RADIUS_BASE,
			obstacleImageSize: this.rescaler.scale() * UI_CONSTANTS.OBSTACLE_RADIUS_BASE * 1.8,
			obstacleAssetBaseUrl: baseUrl,
			obstacleMapping: OBSTACLE_MAPPING,
			obstacleFileName: obstacleAssetFileName,
			obstacleFileNameAlt: obstacleAssetFileNameAlt,
			onObstacleClick: (event: MouseEvent, obstacleData: unknown) => {
				if (!this.currentRobotDuid) return;
				event.stopPropagation();
				const d = obstacleData as [number, number, number, unknown, unknown, unknown, unknown];
				this.selectedObstacleID = d?.[6];
				const robotPoint = { x: d[0], y: d[1] };
				const worldPoint = robotCoordsToLocalCoords(robotPoint, params);
				this.popupX = worldPoint.x;
				this.popupY = worldPoint.y;
				if (this.popupTimeout) clearTimeout(this.popupTimeout);
				this.connection
					.sendTo(this.instanceId, "get_obstacle_image", {
						obstacleId: this.selectedObstacleID,
						duid: this.currentRobotDuid,
						type: 1,
					})
					.then((response: any) => {
						if (response?.image) {
							let imageData = response.image as string;
							if (typeof imageData === "string" && !imageData.startsWith("data:image/"))
								imageData = "data:image/png;base64," + imageData;
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
			},
			robotImageHref: IMG_ROBOT_ORIGINAL,
			chargerImageHref: IMG_CHARGER,
			goToPinImageHref: IMG_GO_TO_PIN,
		});

		drawMapV1(this.map as any, renderer, {
			scaleFactor: VISUAL_BLOCK_SIZE,
			dimensionsAreScaled: false,
			roomLabels: roomLabels?.length ? roomLabels : undefined,
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
				if (!this.mapImage) return;
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
				if (!this.mapImage) return;
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

		const scaledRobotSize = this.rescaler.robotSize();
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

		const scaledChargerSize = this.rescaler.chargerSize();
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

		this.updatePopupPosition();
	}

	private getMapParams(): MapParams | null {
		if (!this.mapImage || !this.mapImage.dimensions || this.mapMaxY === undefined) {
			return null;
		}
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
