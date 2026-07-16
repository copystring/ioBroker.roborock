import q10OriginalScene from "./apppluginLab/q10-original-scene.json";
import {
	APPPLUGIN_LAB_MODES,
	APPPLUGIN_MAP_LAYERS,
	type AppPluginLabArea,
	type AppPluginLabMode,
	type AppPluginLabPoint,
	type AppPluginLabScene,
	type AppPluginLabSceneMode,
	type AppPluginMapLayerId,
} from "./apppluginLab/contract";

const SVG_NS = "http://www.w3.org/2000/svg";
const APK_RUNTIME_SNAPSHOT = {
	source: "./q7-hermes-original-appplugin-ui.png",
	width: 360,
	height: 800,
	label: "Q7 L5 / SC01 · unverändertes AppPlugin · APK-UI-Host",
} as const;

interface EditableArea {
	id: number;
	type: "zone" | "noGo" | "noMop";
	x: number;
	y: number;
	width: number;
	height: number;
}

interface EditableWall {
	id: number;
	start: AppPluginLabPoint;
	end: AppPluginLabPoint;
}

interface DragState {
	kind: "area" | "resize" | "pan";
	id?: number;
	start: AppPluginLabPoint;
	original?: EditableArea;
	originalTranslate?: { x: number; y: number };
}

function svgElement<K extends keyof SVGElementTagNameMap>(name: K, attributes: Record<string, string | number> = {}): SVGElementTagNameMap[K] {
	const element = document.createElementNS(SVG_NS, name);
	for (const [key, value] of Object.entries(attributes)) element.setAttribute(key, String(value));
	return element;
}

function pathFromPolygons(polygons: AppPluginLabPoint[][]): string {
	return polygons
		.filter(polygon => polygon.length > 1)
		.map(polygon => `M ${polygon.map(point => `${point.x} ${point.y}`).join(" L ")} Z`)
		.join(" ");
}

function areaBounds(area: AppPluginLabArea): EditableArea | null {
	if (!area.points.length) return null;
	const xs = area.points.map(point => point.x);
	const ys = area.points.map(point => point.y);
	const x = Math.min(...xs);
	const y = Math.min(...ys);
	return {
		id: area.id ?? 0,
		type: area.type === "mop" ? "noMop" : "noGo",
		x,
		y,
		width: Math.max(1, Math.max(...xs) - x),
		height: Math.max(1, Math.max(...ys) - y),
	};
}

class AppPluginMapLab {
	private scene = q10OriginalScene as AppPluginLabScene;
	private sceneMode: AppPluginLabSceneMode = "original";
	private mode: AppPluginLabMode = "view";
	private visibleLayers = new Set<AppPluginMapLayerId>(APPPLUGIN_MAP_LAYERS.map(layer => layer.id));
	private selectedRooms = new Set<number>();
	private areas: EditableArea[] = [];
	private walls: EditableWall[] = [];
	private pin: AppPluginLabPoint | null = null;
	private pendingWallStart: AppPluginLabPoint | null = null;
	private selectedAreaId: number | null = null;
	private nextObjectId = 1;
	private drag: DragState | null = null;
	private translate = { x: 0, y: 0 };
	private scale = 1;
	private activePointers = new Map<number, { x: number; y: number }>();
	private pinchDistance = 0;
	private pinchScale = 1;

	private readonly svg = document.querySelector<SVGSVGElement>("#labMap")!;
	private readonly sceneGroup = document.querySelector<SVGGElement>("#labScene")!;
	private readonly modeBar = document.querySelector<HTMLElement>("#modeBar")!;
	private readonly layerList = document.querySelector<HTMLElement>("#layerList")!;
	private readonly eventLog = document.querySelector<HTMLElement>("#eventLog")!;
	private readonly selectionSummary = document.querySelector<HTMLElement>("#selectionSummary")!;
	private readonly sceneSummary = document.querySelector<HTMLElement>("#sceneSummary")!;
	private readonly fixtureInput = document.querySelector<HTMLInputElement>("#fixtureInput")!;

	public init(): void {
		this.buildModeBar();
		this.buildLayerList();
		this.bindToolbar();
		this.bindStageEvents();
		this.render();
		this.log("Labor gestartet", { source: this.scene.source, model: this.scene.model });
	}

	private buildModeBar(): void {
		this.modeBar.replaceChildren(...APPPLUGIN_LAB_MODES.map(mode => {
			const button = document.createElement("button");
			button.type = "button";
			button.dataset.mode = mode.id;
			button.textContent = mode.label;
			button.addEventListener("click", () => {
				this.mode = mode.id;
				this.pendingWallStart = null;
				this.updateModeButtons();
				this.log("Modus geändert", { mode: this.mode });
			});
			return button;
		}));
		this.updateModeButtons();
	}

	private updateModeButtons(): void {
		for (const button of this.modeBar.querySelectorAll<HTMLButtonElement>("button")) {
			button.classList.toggle("active", button.dataset.mode === this.mode);
			button.disabled = this.sceneMode === "original" && button.dataset.mode !== "view";
		}
		this.svg.dataset.mode = this.mode;
	}

	private buildLayerList(): void {
		this.layerList.replaceChildren(...APPPLUGIN_MAP_LAYERS.map(layer => {
			const row = document.createElement("label");
			row.className = "layer-row";
			row.title = layer.description;
			const checkbox = document.createElement("input");
			checkbox.type = "checkbox";
			checkbox.checked = true;
			checkbox.addEventListener("change", () => {
				if (checkbox.checked) this.visibleLayers.add(layer.id);
				else this.visibleLayers.delete(layer.id);
				this.render();
			});
			const label = document.createElement("span");
			label.className = "layer-label";
			label.textContent = layer.label;
			const badge = document.createElement("span");
			badge.className = `evidence ${layer.evidence}`;
			badge.textContent = layer.evidence === "original-fixture" ? "Fixture" : layer.evidence === "catalog-demo" ? "Demo" : "Offen";
			row.append(checkbox, label, badge);
			return row;
		}));
	}

	private bindToolbar(): void {
		document.querySelectorAll<HTMLButtonElement>("[data-scene-mode]").forEach(button => {
			button.addEventListener("click", () => {
				this.sceneMode = button.dataset.sceneMode as AppPluginLabSceneMode;
				if (this.sceneMode === "original") {
					this.mode = "view";
					this.selectedRooms.clear();
					this.areas = [];
					this.walls = [];
					this.pin = null;
					this.selectedAreaId = null;
				}
				document.querySelectorAll<HTMLButtonElement>("[data-scene-mode]").forEach(candidate => {
					candidate.classList.toggle("active", candidate === button);
				});
				this.render();
				this.log("Szenenmodus geändert", { sceneMode: this.sceneMode });
			});
		});

		document.querySelector<HTMLButtonElement>("#addObject")!.addEventListener("click", () => this.addForCurrentMode());
		document.querySelector<HTMLButtonElement>("#deleteObject")!.addEventListener("click", () => this.deleteSelectedArea());
		document.querySelector<HTMLButtonElement>("#resetView")!.addEventListener("click", () => {
			this.translate = { x: 0, y: 0 };
			this.scale = 1;
			this.applyTransform();
		});
		document.querySelector<HTMLButtonElement>("#clearSelection")!.addEventListener("click", () => {
			this.selectedRooms.clear();
			this.areas = [];
			this.walls = [];
			this.pin = null;
			this.selectedAreaId = null;
			this.render();
			this.log("Auswahl zurückgesetzt");
		});
		document.querySelector<HTMLButtonElement>("#previewCommand")!.addEventListener("click", () => this.previewCommand());
		this.fixtureInput.addEventListener("change", () => this.loadFixtureFile());
	}

	private bindStageEvents(): void {
		this.svg.addEventListener("wheel", event => {
			event.preventDefault();
			const factor = event.deltaY < 0 ? 1.12 : 0.89;
			this.scale = Math.max(0.55, Math.min(8, this.scale * factor));
			this.applyTransform();
		}, { passive: false });

		this.svg.addEventListener("pointerdown", event => {
			this.capturePointer(event);
			if (this.activePointers.size === 2) {
				const [first, second] = [...this.activePointers.values()];
				this.pinchDistance = Math.hypot(second.x - first.x, second.y - first.y);
				this.pinchScale = this.scale;
				return;
			}
			const target = event.target as Element | null;
			if (!target?.closest(".editable-area")) this.handleBackgroundPointerDown(event);
		});

		this.svg.addEventListener("pointermove", event => {
			if (!this.activePointers.has(event.pointerId)) return;
			this.activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
			if (this.activePointers.size === 2) {
				const [first, second] = [...this.activePointers.values()];
				const distance = Math.hypot(second.x - first.x, second.y - first.y);
				if (this.pinchDistance > 0) this.scale = Math.max(0.55, Math.min(8, this.pinchScale * distance / this.pinchDistance));
				this.applyTransform();
				return;
			}
			this.handleDragMove(event);
		});

		const finishPointer = (event: PointerEvent) => {
			this.activePointers.delete(event.pointerId);
			this.drag = null;
			this.pinchDistance = 0;
		};
		this.svg.addEventListener("pointerup", finishPointer);
		this.svg.addEventListener("pointercancel", finishPointer);
	}

	private capturePointer(event: PointerEvent): void {
		this.activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
		this.svg.setPointerCapture(event.pointerId);
	}

	private handleBackgroundPointerDown(event: PointerEvent): void {
		const point = this.eventToMapPoint(event);
		if (this.mode === "view") {
			this.drag = {
				kind: "pan",
				start: { x: event.clientX, y: event.clientY },
				originalTranslate: { ...this.translate },
			};
			return;
		}
		if (this.mode === "zones" || this.mode === "noGo" || this.mode === "noMop") {
			this.addArea(this.mode === "zones" ? "zone" : this.mode, point);
			return;
		}
		if (this.mode === "virtualWall") {
			if (!this.pendingWallStart) {
				this.pendingWallStart = point;
				this.log("Startpunkt der virtuellen Wand gesetzt", point);
			} else {
				this.walls.push({ id: this.nextObjectId++, start: this.pendingWallStart, end: point });
				this.pendingWallStart = null;
				this.render();
				this.log("Virtuelle Wand erstellt");
			}
			return;
		}
		if (this.mode === "pin") {
			this.pin = point;
			this.render();
			this.log("Zielpunkt gesetzt", point);
		}
	}

	private handleDragMove(event: PointerEvent): void {
		if (!this.drag) return;
		if (this.drag.kind === "pan" && this.drag.originalTranslate) {
			this.translate.x = this.drag.originalTranslate.x + (event.clientX - this.drag.start.x) / this.scale;
			this.translate.y = this.drag.originalTranslate.y + (event.clientY - this.drag.start.y) / this.scale;
			this.applyTransform();
			return;
		}
		const area = this.areas.find(candidate => candidate.id === this.drag?.id);
		if (!area || !this.drag.original) return;
		const current = this.eventToMapPoint(event);
		const dx = current.x - this.drag.start.x;
		const dy = current.y - this.drag.start.y;
		if (this.drag.kind === "area") {
			area.x = this.drag.original.x + dx;
			area.y = this.drag.original.y + dy;
		} else {
			area.width = Math.max(4, this.drag.original.width + dx);
			area.height = Math.max(4, this.drag.original.height + dy);
		}
		this.render();
	}

	private eventToMapPoint(event: PointerEvent): AppPluginLabPoint {
		const point = this.svg.createSVGPoint();
		point.x = event.clientX;
		point.y = event.clientY;
		const matrix = this.sceneGroup.getScreenCTM();
		if (!matrix) return { x: 0, y: 0 };
		const transformed = point.matrixTransform(matrix.inverse());
		return {
			x: Math.max(0, Math.min(this.scene.width, transformed.x)),
			y: Math.max(0, Math.min(this.scene.height, transformed.y)),
		};
	}

	private addForCurrentMode(): void {
		const center = { x: this.scene.width / 2, y: this.scene.height / 2 };
		if (this.mode === "zones" || this.mode === "noGo" || this.mode === "noMop") {
			this.addArea(this.mode === "zones" ? "zone" : this.mode, center);
		} else if (this.mode === "virtualWall") {
			this.walls.push({
				id: this.nextObjectId++,
				start: { x: center.x - 15, y: center.y },
				end: { x: center.x + 15, y: center.y },
			});
			this.render();
		} else if (this.mode === "pin") {
			this.pin = center;
			this.render();
		}
	}

	private addArea(type: EditableArea["type"], center: AppPluginLabPoint): void {
		if (type === "zone" && this.areas.filter(area => area.type === "zone").length >= 5) {
			this.log("Originalgrenze erreicht", { maximumZones: 5 });
			return;
		}
		const width = Math.min(28, this.scene.width * 0.24);
		const height = Math.min(24, this.scene.height * 0.12);
		const area: EditableArea = {
			id: this.nextObjectId++,
			type,
			x: Math.max(0, center.x - width / 2),
			y: Math.max(0, center.y - height / 2),
			width,
			height,
		};
		this.areas.push(area);
		this.selectedAreaId = area.id;
		this.render();
		this.log("Fläche erstellt", area);
	}

	private deleteSelectedArea(): void {
		if (this.selectedAreaId == null) return;
		this.areas = this.areas.filter(area => area.id !== this.selectedAreaId);
		this.log("Fläche gelöscht", { id: this.selectedAreaId });
		this.selectedAreaId = null;
		this.render();
	}

	private previewCommand(): void {
		const zones = this.areas.filter(area => area.type === "zone").map(area => [
			Math.round(area.x),
			Math.round(area.y),
			Math.round(area.x + area.width),
			Math.round(area.y + area.height),
			1,
		]);
		const command = zones.length
			? { command: "app_zoned_clean", parameters: zones }
			: this.selectedRooms.size
				? { command: "app_segment_clean", parameters: [...this.selectedRooms] }
				: { command: "app_start", parameters: [] };
		this.log("Befehlsabsicht erfasst – nicht gesendet", command);
	}

	private async loadFixtureFile(): Promise<void> {
		const file = this.fixtureInput.files?.[0];
		if (!file) return;
		try {
			const candidate = JSON.parse(await file.text()) as AppPluginLabScene;
			if (!candidate.width || !candidate.height || !Array.isArray(candidate.rooms)) throw new Error("Ungültiger Szenenvertrag");
			this.scene = candidate;
			this.selectedRooms.clear();
			this.areas = [];
			this.walls = [];
			this.pin = null;
			this.render();
			this.log("Externe Fixture geladen", { id: candidate.id, rooms: candidate.rooms.length });
		} catch (error) {
			this.log("Fixture konnte nicht geladen werden", { error: error instanceof Error ? error.message : String(error) });
		}
	}

	private render(): void {
		this.sceneGroup.replaceChildren();
		this.updateSceneControls();
		this.updateViewport();
		if (this.sceneMode === "original") {
			this.renderOriginalScene();
			this.applyTransform();
			this.updateSummaries();
			return;
		}
		this.renderBaseMap();
		this.renderRoomMaterials();
		this.renderCarpets();
		this.renderRestrictedAreas();
		this.renderThresholds();
		this.renderEditableAreas();
		this.renderAdditionalClean();
		this.renderPath();
		this.renderDock();
		this.renderRobot();
		this.renderObstacles();
		this.renderSkippedAndSuspected();
		this.renderRooms();
		this.renderEraseAreas();
		this.renderRoomSplit();
		this.renderFurniture();
		this.renderPin();
		this.applyTransform();
		this.updateSummaries();
	}

	private updateSceneControls(): void {
		const originalRender = this.sceneMode === "original";
		for (const checkbox of this.layerList.querySelectorAll<HTMLInputElement>('input[type="checkbox"]')) {
			checkbox.disabled = originalRender;
		}
		document.querySelector<HTMLButtonElement>("#addObject")!.disabled = originalRender;
		document.querySelector<HTMLButtonElement>("#previewCommand")!.disabled = originalRender;
		document.querySelector<HTMLButtonElement>("#clearSelection")!.disabled = originalRender;
		this.updateModeButtons();
	}

	private updateViewport(): void {
		const width = this.sceneMode === "original" ? APK_RUNTIME_SNAPSHOT.width : this.scene.width;
		const height = this.sceneMode === "original" ? APK_RUNTIME_SNAPSHOT.height : this.scene.height;
		this.svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
	}

	private renderOriginalScene(): void {
		this.sceneGroup.append(svgElement("image", {
			href: APK_RUNTIME_SNAPSHOT.source,
			x: 0,
			y: 0,
			width: APK_RUNTIME_SNAPSHOT.width,
			height: APK_RUNTIME_SNAPSHOT.height,
			preserveAspectRatio: "none",
		}));
	}

	private layerVisible(layer: AppPluginMapLayerId): boolean {
		return this.visibleLayers.has(layer);
	}

	private catalogVisible(layer: AppPluginMapLayerId): boolean {
		return this.sceneMode === "catalog" && this.layerVisible(layer);
	}

	private renderBaseMap(): void {
		if (!this.layerVisible("baseMap")) return;
		this.sceneGroup.append(svgElement("image", {
			href: this.scene.rasterDataUrl,
			x: 0,
			y: 0,
			width: this.scene.width,
			height: this.scene.height,
			preserveAspectRatio: "none",
		}));
	}

	private renderRoomMaterials(): void {
		if (!this.layerVisible("roomMaterials")) return;
		for (const [kind, polygons] of Object.entries(this.scene.materialPaths ?? {})) {
			if (!polygons.length) continue;
			const pattern = kind.includes("ceramic") ? "url(#tilePattern)" : "url(#woodPattern)";
			this.sceneGroup.append(svgElement("path", { d: pathFromPolygons(polygons), fill: pattern, opacity: 0.4, class: "room-material" }));
		}
		if (this.catalogVisible("roomMaterials") && !Object.values(this.scene.materialPaths ?? {}).some(paths => paths.length)) {
			this.sceneGroup.append(svgElement("rect", { x: 18, y: 26, width: 24, height: 28, fill: "url(#tilePattern)", opacity: 0.45 }));
		}
	}

	private renderCarpets(): void {
		if (this.layerVisible("autoCarpets")) {
			for (const carpet of this.scene.autoCarpets) {
				this.sceneGroup.append(svgElement("rect", {
					x: carpet.left,
					y: carpet.top,
					width: Math.max(1, carpet.right - carpet.left),
					height: Math.max(1, carpet.bottom - carpet.top),
					class: "carpet auto-carpet",
				}));
			}
		}
		if (this.layerVisible("manualCarpets")) {
			for (const carpet of this.scene.manualCarpets) {
				this.sceneGroup.append(svgElement("path", {
					d: pathFromPolygons([carpet.points]),
					class: "carpet manual-carpet",
				}));
			}
			if (this.catalogVisible("manualCarpets") && !this.scene.manualCarpets.length) {
				this.sceneGroup.append(svgElement("rect", { x: 71, y: 150, width: 24, height: 34, rx: 2, class: "carpet manual-carpet" }));
			}
		}
	}

	private renderRestrictedAreas(): void {
		if (!this.layerVisible("restrictedAreas")) return;
		const sourceAreas = [...this.scene.forbidAreas, ...this.scene.mopAreas].map(areaBounds).filter(Boolean) as EditableArea[];
		for (const area of sourceAreas) this.drawAreaRect(area, false);
		if (this.catalogVisible("restrictedAreas") && sourceAreas.length === 0 && !this.areas.some(area => area.type !== "zone")) {
			this.drawAreaRect({ id: -10, type: "noGo", x: 18, y: 86, width: 24, height: 24 }, false);
			this.drawAreaRect({ id: -11, type: "noMop", x: 78, y: 86, width: 24, height: 24 }, false);
		}
		for (const wall of this.scene.virtualWalls) this.drawWall({ id: wall.id ?? -1, start: wall.points[0], end: wall.points[1] });
		for (const wall of this.walls) this.drawWall(wall);
	}

	private renderThresholds(): void {
		if (!this.layerVisible("thresholds")) return;
		for (const area of this.scene.thresholdAreas) {
			if (area.points.length < 2) continue;
			const [start, end] = area.points;
			this.sceneGroup.append(svgElement("line", { x1: start.x, y1: start.y, x2: end.x, y2: end.y, class: "threshold" }));
		}
		if (this.catalogVisible("thresholds") && !this.scene.thresholdAreas.length) {
			this.sceneGroup.append(svgElement("line", { x1: 48, y1: 120, x2: 69, y2: 120, class: "threshold" }));
		}
	}

	private renderEditableAreas(): void {
		for (const area of this.areas) {
			if (area.type === "zone" && !this.layerVisible("cleanZones")) continue;
			if (area.type !== "zone" && !this.layerVisible("restrictedAreas")) continue;
			this.drawAreaRect(area, true);
		}
		if (this.catalogVisible("cleanZones") && !this.areas.some(area => area.type === "zone")) {
			this.drawAreaRect({ id: -20, type: "zone", x: 44, y: 154, width: 28, height: 24 }, false);
		}
	}

	private drawAreaRect(area: EditableArea, editable: boolean): void {
		const group = svgElement("g", { class: `editable-area ${area.type} ${area.id === this.selectedAreaId ? "selected" : ""}` });
		const rect = svgElement("rect", { x: area.x, y: area.y, width: area.width, height: area.height, rx: 1.5 });
		group.append(rect);
		if (editable) {
			rect.addEventListener("pointerdown", event => {
				event.stopPropagation();
				this.capturePointer(event);
				this.selectedAreaId = area.id;
				this.drag = { kind: "area", id: area.id, start: this.eventToMapPoint(event), original: { ...area } };
				this.render();
			});
			const handle = svgElement("circle", { cx: area.x + area.width, cy: area.y + area.height, r: 2.6, class: "resize-handle" });
			handle.addEventListener("pointerdown", event => {
				event.stopPropagation();
				this.capturePointer(event);
				this.selectedAreaId = area.id;
				this.drag = { kind: "resize", id: area.id, start: this.eventToMapPoint(event), original: { ...area } };
			});
			group.append(handle);
		}
		this.sceneGroup.append(group);
	}

	private drawWall(wall: EditableWall): void {
		this.sceneGroup.append(svgElement("line", {
			x1: wall.start.x,
			y1: wall.start.y,
			x2: wall.end.x,
			y2: wall.end.y,
			class: "virtual-wall",
		}));
	}

	private renderAdditionalClean(): void {
		if (!this.catalogVisible("additionalClean")) return;
		this.sceneGroup.append(svgElement("rect", { x: 86, y: 36, width: 18, height: 18, rx: 2, class: "additional-clean" }));
	}

	private renderPath(): void {
		if (!this.layerVisible("path") || this.scene.path.length < 2) return;
		const buckets = new Map<number, AppPluginLabPoint[]>();
		for (const point of this.scene.path) {
			const type = point.type ?? 0;
			const bucket = buckets.get(type) ?? [];
			bucket.push(point);
			buckets.set(type, bucket);
		}
		for (const [type, points] of buckets) {
			const d = points.map((point, index) => `${index ? "L" : "M"} ${point.x} ${point.y}`).join(" ");
			this.sceneGroup.append(svgElement("path", { d, class: `clean-path path-${type}`, fill: "none" }));
		}
	}

	private renderDock(): void {
		if (!this.layerVisible("dock") || !this.scene.dock) return;
		const { x, y, phi = 0 } = this.scene.dock;
		const group = svgElement("g", { class: "dock", transform: `translate(${x} ${y}) rotate(${phi})` });
		group.append(svgElement("rect", { x: -4, y: -2.5, width: 8, height: 5, rx: 1.5 }));
		group.append(svgElement("path", { d: "M -2 0 L 0 -2 L 2 0", fill: "none" }));
		this.sceneGroup.append(group);
	}

	private renderRobot(): void {
		if (!this.layerVisible("robot") || !this.scene.robot) return;
		const { x, y, phi = 0 } = this.scene.robot;
		const group = svgElement("g", { class: "robot", transform: `translate(${x} ${y}) rotate(${phi})` });
		group.append(svgElement("circle", { r: 5 }));
		group.append(svgElement("path", { d: "M 0 -4 L -1.6 -1 L 1.6 -1 Z" }));
		group.append(svgElement("circle", { cy: 1.2, r: 1.2, class: "lidar" }));
		this.sceneGroup.append(group);
	}

	private renderObstacles(): void {
		if (!this.layerVisible("obstacles")) return;
		for (const [index, obstacle] of this.scene.obstacles.entries()) {
			const marker = svgElement("g", { class: "obstacle", transform: `translate(${obstacle.point.x} ${obstacle.point.y})` });
			marker.append(svgElement("circle", { r: 2.8 }));
			const text = svgElement("text", { x: 0, y: 0.5, "text-anchor": "middle" });
			text.textContent = String(index + 1);
			marker.append(text);
			marker.addEventListener("click", event => {
				event.stopPropagation();
				this.log("Hindernis angeklickt", { index, type: obstacle.type, point: obstacle.point, photo: "Fixture enthält kein Foto" });
			});
			this.sceneGroup.append(marker);
		}
	}

	private renderSkippedAndSuspected(): void {
		if (this.layerVisible("skippedAreas")) {
			for (const skipped of this.scene.skipped) this.drawMarker(skipped.point, "×", "skipped");
			if (this.catalogVisible("skippedAreas") && !this.scene.skipped.length) this.drawMarker({ x: 33, y: 132 }, "×", "skipped");
		}
		if (this.layerVisible("suspectedAreas")) {
			for (const suspected of this.scene.suspected) this.drawMarker(suspected.point, "?", `suspected ${suspected.type}`);
			if (this.catalogVisible("suspectedAreas") && !this.scene.suspected.length) {
				this.drawMarker({ x: 94, y: 132 }, "?", "suspected easycard");
				this.drawMarker({ x: 106, y: 132 }, "!", "suspected cliff");
			}
		}
	}

	private drawMarker(point: AppPluginLabPoint, label: string, className: string): void {
		const group = svgElement("g", { class: className, transform: `translate(${point.x} ${point.y})` });
		group.append(svgElement("circle", { r: 3.2 }));
		const text = svgElement("text", { y: 0.8, "text-anchor": "middle" });
		text.textContent = label;
		group.append(text);
		this.sceneGroup.append(group);
	}

	private renderRooms(): void {
		if (!this.layerVisible("rooms")) return;
		for (const room of this.scene.rooms) {
			const selected = this.selectedRooms.has(room.roomID);
			const path = svgElement("path", {
				d: pathFromPolygons(room.borderArr),
				class: `room-hit ${selected ? "selected" : ""}`,
				"data-room-id": room.roomID,
				"fill-rule": "evenodd",
			});
			path.addEventListener("click", event => {
				if (this.mode !== "rooms") return;
				event.stopPropagation();
				if (selected) this.selectedRooms.delete(room.roomID);
				else this.selectedRooms.add(room.roomID);
				this.render();
				this.log("Raumauswahl geändert", { roomId: room.roomID, selected: !selected, selection: [...this.selectedRooms] });
			});
			this.sceneGroup.append(path);
			const label = svgElement("g", { class: `room-label ${selected ? "selected" : ""}`, transform: `translate(${room.transCenterPoint.x} ${room.transCenterPoint.y})` });
			label.append(svgElement("circle", { r: 4.2 }));
			const text = svgElement("text", { x: 6, y: 0.8 });
			text.textContent = room.roomName || `Raum ${room.roomID}`;
			label.append(text);
			this.sceneGroup.append(label);
		}
	}

	private renderEraseAreas(): void {
		if (!this.layerVisible("eraseAreas")) return;
		for (const area of this.scene.eraseAreas) {
			this.sceneGroup.append(svgElement("path", { d: pathFromPolygons([area.points]), class: "erase-area" }));
		}
		if (this.catalogVisible("eraseAreas") && !this.scene.eraseAreas.length) {
			this.sceneGroup.append(svgElement("rect", { x: 13, y: 194, width: 20, height: 16, class: "erase-area" }));
		}
	}

	private renderRoomSplit(): void {
		if (!this.catalogVisible("roomSplit")) return;
		this.sceneGroup.append(svgElement("line", { x1: 52, y1: 64, x2: 74, y2: 78, class: "room-split" }));
		this.sceneGroup.append(svgElement("circle", { cx: 52, cy: 64, r: 2.3, class: "split-handle" }));
		this.sceneGroup.append(svgElement("circle", { cx: 74, cy: 78, r: 2.3, class: "split-handle" }));
	}

	private renderFurniture(): void {
		if (!this.catalogVisible("furniture")) return;
		const sofa = svgElement("g", { class: "furniture", transform: "translate(82 195)" });
		sofa.append(svgElement("rect", { x: -8, y: -4, width: 16, height: 8, rx: 2 }));
		sofa.append(svgElement("line", { x1: -5, y1: -4, x2: -5, y2: 4 }));
		sofa.append(svgElement("line", { x1: 5, y1: -4, x2: 5, y2: 4 }));
		this.sceneGroup.append(sofa);
	}

	private renderPin(): void {
		if (!this.layerVisible("goToPin")) return;
		const point = this.pin ?? (this.catalogVisible("goToPin") ? { x: 62, y: 112 } : null);
		if (!point) return;
		const pin = svgElement("g", { class: "go-to-pin", transform: `translate(${point.x} ${point.y})` });
		pin.append(svgElement("path", { d: "M 0 0 C -7 -8 -5 -15 0 -15 C 5 -15 7 -8 0 0 Z" }));
		pin.append(svgElement("circle", { cy: -10, r: 2.4 }));
		this.sceneGroup.append(pin);
	}

	private applyTransform(): void {
		this.sceneGroup.setAttribute("transform", `translate(${this.translate.x} ${this.translate.y}) scale(${this.scale})`);
		document.querySelector<HTMLElement>("#zoomValue")!.textContent = `${Math.round(this.scale * 100)} %`;
	}

	private updateSummaries(): void {
		const actualCounts = {
			rooms: this.scene.rooms.length,
			pathPoints: this.scene.path.length,
			obstacles: this.scene.obstacles.length,
			autoCarpets: this.scene.autoCarpets.length,
			virtualWalls: this.scene.virtualWalls.length,
			robot: Boolean(this.scene.robot),
			dock: Boolean(this.scene.dock),
		};
		const renderWidth = this.sceneMode === "original" ? APK_RUNTIME_SNAPSHOT.width : this.scene.width;
		const renderHeight = this.sceneMode === "original" ? APK_RUNTIME_SNAPSHOT.height : this.scene.height;
		const renderKind = this.sceneMode === "original"
			? APK_RUNTIME_SNAPSHOT.label
			: "eigener Interaktionskatalog";
		this.sceneSummary.textContent = this.sceneMode === "original"
			? `${renderKind} · ${renderWidth} × ${renderHeight} · 4 Räume`
			: `${this.scene.label} · ${renderWidth} × ${renderHeight} · ${renderKind} · ${actualCounts.rooms} Räume`;
		this.selectionSummary.textContent = this.sceneMode === "original"
			? "APK-native AppPlugin-Hierarchie aktiv · Host-Rasterisierung noch ohne Golden-Parität · Interaktion noch nicht angebunden"
			: `${this.selectedRooms.size} Räume · ${this.areas.filter(area => area.type === "zone").length} Zonen · ${this.walls.length} Wände${this.pin ? " · Ziel gesetzt" : ""}`;
		document.querySelector<HTMLButtonElement>("#deleteObject")!.disabled = this.sceneMode === "original" || this.selectedAreaId == null;
	}

	private log(message: string, data?: unknown): void {
		const entry = document.createElement("div");
		entry.className = "log-entry";
		const time = document.createElement("time");
		time.textContent = new Date().toLocaleTimeString("de-DE");
		const body = document.createElement("span");
		body.textContent = data === undefined ? message : `${message} ${JSON.stringify(data)}`;
		entry.append(time, body);
		this.eventLog.prepend(entry);
		while (this.eventLog.children.length > 40) this.eventLog.lastElementChild?.remove();
	}
}

new AppPluginMapLab().init();
