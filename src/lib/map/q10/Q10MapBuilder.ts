import * as fs from "fs";
import { createCanvas, Image, loadImage } from "@napi-rs/canvas";
import { robotToPixel } from "../../../common/coordTransformation";
import type { B01DeviceStatus, B01MapData } from "../b01/types";
import { Q10AssetCatalog, resolveQ10PluginAssetPath } from "./Q10AssetCatalog";
import { Q10_CANVAS_SCALE, Q10MapGeometry } from "./Q10MapGeometry";
import type {
	Q10CreatorArea,
	Q10CreatorData,
	Q10CreatorLine,
	Q10CreatorObstacle,
	Q10CreatorPathPoint,
	Q10CreatorSuspectedPoint,
	Q10MapPixelPoint,
	Q10PixelPose
} from "./types";

const Q10_LAYOUT = {
	areaStrokeWidth: 2,
	areaMopDash: 3,
	forbidLineIconSize: 12,
	thresholdRowShiftRatio: 0.63
} as const;
const DARK_MAP_COLORS = {
	wall: 1836349183,
	inWall: 1940580863,
	rooms: [1940580863, 3854457599, 3648937983, 634505215] as const,
	roomTagBase: [4279123053, 4283645184, 4286455337, 4278537798] as const,
	roomTagStroke: [4278528336, 4281147648, 4284156949, 4278202925] as const,
	forbidLine: 4294919482,
	forbidFill: 872367418,
	eraseFill: 872387840,
	eraseBase: 4294939904,
	thresholdBase: 4292136800,
	text: 3426499651
} as const;

interface LoadedQ10Assets {
	device?: Image;
	power?: Image;
	forbidlineIcon?: Image;
	obstacle?: Image;
	tiaoGuoIcon?: Image;
	mapCarpetMaterial?: Image;
	mapThresholdMaterial?: Image;
	roomTags: Map<number, Image>;
	suspectedThreshold?: Image;
	suspectedEasycard?: Image;
	suspectedCliff?: Image;
}

interface Q10RenderMetrics {
	baseIconSize: number;
	roomFontSize: number;
	roomBubbleDiameter: number;
	roomGap: number;
	roomIconSize: number;
	roomBadgeRadius: number;
}

interface Q10PathLayerStyle {
	strokeStyle: string;
	lineWidth: number;
	dash?: number[];
	dashOffset?: number;
}

type Q10OriginalMaterialKind = "ceramicTile" | "horizontalFloorBoard" | "verticalFloorBoard";

interface Q10RenderedMaps {
	full: Buffer;
	clean: Buffer;
}

function packedColorToRgbaBytes(color: number): [number, number, number, number] {
	return [
		(color >>> 24) & 0xff,
		(color >>> 16) & 0xff,
		(color >>> 8) & 0xff,
		color & 0xff
	];
}

function packedArgbToCss(color: number, alphaOverride?: number): string {
	const a = ((color >>> 24) & 0xff) / 255;
	const r = (color >>> 16) & 0xff;
	const g = (color >>> 8) & 0xff;
	const b = color & 0xff;
	const alpha = alphaOverride ?? a;
	return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function getOriginalQ10MaterialMapRate(width: number, height: number): number {
	const maxSide = Math.max(width, height, 1);
	return Math.max(1, Math.floor(2000 / maxSide));
}

function getRenderMetrics(): Q10RenderMetrics {
	const kImgRate = Q10_CANVAS_SCALE;
	return {
		baseIconSize: 8 * kImgRate,
		roomFontSize: 10,
		roomBubbleDiameter: 12,
		roomGap: 4,
		roomIconSize: 6,
		roomBadgeRadius: 6
	};
}

function imageWidth(image?: Image): number {
	return Number(image?.width ?? image?.naturalWidth ?? 0);
}

function imageHeight(image?: Image): number {
	return Number(image?.height ?? image?.naturalHeight ?? 0);
}

function drawCenteredAsset(
	ctx: any,
	image: Image | undefined,
	x: number,
	y: number,
	drawWidth: number,
	rotationDeg = 0
): void {
	if (!image) return;
	const width = imageWidth(image);
	const height = imageHeight(image);
	if (width <= 0 || height <= 0) return;

	const scale = Math.min(drawWidth / width, drawWidth / height);
	const fittedWidth = width * scale;
	const fittedHeight = height * scale;

	ctx.save();
	ctx.translate(x, y);
	if (rotationDeg) ctx.rotate((rotationDeg * Math.PI) / 180);
	ctx.drawImage(image as any, -fittedWidth / 2, -fittedHeight / 2, fittedWidth, fittedHeight);
	ctx.restore();
}

function drawCenteredSpriteWidthScaled(
	ctx: any,
	image: Image | undefined,
	x: number,
	y: number,
	targetWidth: number,
	rotationDeg = 0
): void {
	if (!image) return;
	const width = imageWidth(image);
	const height = imageHeight(image);
	if (width <= 0 || height <= 0) return;

	const scale = targetWidth / width;
	const drawWidth = width * scale;
	const drawHeight = height * scale;

	ctx.save();
	ctx.translate(x, y);
	if (rotationDeg) ctx.rotate((rotationDeg * Math.PI) / 180);
	ctx.drawImage(image as any, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
	ctx.restore();
}

function drawCenteredCoverSquareAsset(
	ctx: any,
	image: Image | undefined,
	x: number,
	y: number,
	size: number,
	rotationDeg = 0
): void {
	if (!image) return;
	const width = imageWidth(image);
	const height = imageHeight(image);
	if (width <= 0 || height <= 0) return;

	const scale = Math.max(size / width, size / height);
	const drawWidth = width * scale;
	const drawHeight = height * scale;

	ctx.save();
	ctx.translate(x, y);
	if (rotationDeg) ctx.rotate((rotationDeg * Math.PI) / 180);
	ctx.beginPath();
	ctx.rect(-size / 2, -size / 2, size, size);
	ctx.clip();
	ctx.drawImage(image as any, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
	ctx.restore();
}

interface ImageOpaqueBounds {
	sx: number;
	sy: number;
	sw: number;
	sh: number;
}

function fillPolygon(ctx: any, points: Q10MapPixelPoint[]): void {
	if (!points.length) return;
	ctx.beginPath();
	ctx.moveTo(points[0].x, points[0].y);
	for (let index = 1; index < points.length; index++) {
		ctx.lineTo(points[index].x, points[index].y);
	}
	ctx.closePath();
}

function isMaterialMaskCellWalkable(mask: Uint8Array, width: number, height: number, x: number, y: number): boolean {
	return x >= 0 && x < width && y >= 0 && y < height && mask[y * width + x] === 1;
}

function buildRoomMaterialMaskGrid(
	baseGrid: Buffer,
	width: number,
	height: number,
	roomIds: number[]
): Uint8Array {
	const roomIdSet = new Set<number>(roomIds);
	const mask = new Uint8Array(width * height);
	for (let index = 0; index < width * height; index++) {
		if (roomIdSet.has(baseGrid[index] ?? 0)) {
			mask[index] = 1;
		}
	}
	return mask;
}

function pairMaterialSegments(points: Q10MapPixelPoint[]): Q10MapPixelPoint[][] {
	const pairs: Q10MapPixelPoint[][] = [];
	const pairCount = Math.floor(points.length / 2);
	for (let index = 0; index < pairCount; index++) {
		pairs.push([
			points[index * 2]!,
			points[index * 2 + 1]!
		]);
	}
	return pairs;
}

function clipHorizontalMaterialPath(
	startX: number,
	endX: number,
	y: number,
	mask: Uint8Array,
	width: number,
	height: number
): Q10MapPixelPoint[][] {
	const subPoints: Q10MapPixelPoint[] = [];
	let last = 0;

	for (let x = startX; x <= endX; x++) {
		const point = { x, y };
		const isValid = isMaterialMaskCellWalkable(mask, width, height, x, y);
		if (!isValid) {
			if (last === 1 || last === 2) {
				subPoints.push(point);
				last = 0;
			}
			continue;
		}

		if (last === 0) {
			subPoints.push(point);
			last = 1;
		} else {
			last = 2;
		}
		if (x === endX) {
			subPoints.push(point);
		}
	}

	return pairMaterialSegments(subPoints);
}

function clipVerticalMaterialPath(
	x: number,
	startY: number,
	endY: number,
	mask: Uint8Array,
	width: number,
	height: number
): Q10MapPixelPoint[][] {
	const subPoints: Q10MapPixelPoint[] = [];
	let last = 0;

	for (let y = startY; y <= endY; y++) {
		const point = { x, y };
		const isValid = isMaterialMaskCellWalkable(mask, width, height, x, y);
		if (!isValid) {
			if (last === 1 || last === 2) {
				subPoints.push(point);
				last = 0;
			}
			continue;
		}

		if (last === 0) {
			subPoints.push(point);
			last = 1;
		} else {
			last = 2;
		}
		if (y === endY) {
			subPoints.push(point);
		}
	}

	return pairMaterialSegments(subPoints);
}

function buildCeramicTileMaterialPaths(
	mask: Uint8Array,
	width: number,
	height: number,
	resolution: number
): Q10MapPixelPoint[][] {
	const wStep = Math.max(1, Math.floor(0.8 / resolution));
	const hStep = Math.max(1, Math.floor(0.8 / resolution));
	const paths: Q10MapPixelPoint[][] = [];

	for (let x = 0; x <= width; x++) {
		if (x % wStep === 0) {
			paths.push(...clipVerticalMaterialPath(x, 0, height, mask, width, height));
		}
	}
	for (let y = 0; y <= height; y++) {
		if (y % hStep === 0) {
			paths.push(...clipHorizontalMaterialPath(0, width, y, mask, width, height));
		}
	}

	return paths;
}

function buildHorizontalFloorBoardMaterialPaths(
	mask: Uint8Array,
	width: number,
	height: number,
	resolution: number
): Q10MapPixelPoint[][] {
	const materialW = 1.2;
	const materialH = 0.3;
	let wStep = Math.max(1, Math.floor(materialW / resolution));
	const hStep = Math.max(1, Math.floor(materialH / resolution));
	const paths: Q10MapPixelPoint[][] = [];

	for (let y = 0; y <= height; y++) {
		if (y % hStep === 0) {
			paths.push(...clipHorizontalMaterialPath(0, width, y, mask, width, height));
		}
	}

	wStep = wStep / 2;
	let columnIndex = 0;
	for (let x = 0; x <= width; x++) {
		if (x % wStep !== 0) continue;
		columnIndex += 1;

		let points: Q10MapPixelPoint[] = [];
		for (let y = 0; y <= height; y++) {
			if (y % hStep !== 0) continue;
			points.push({ x, y });
		}

		if (columnIndex % 2 === 1) {
			if (Math.floor(points.length % 2) === 1) {
				points = points.slice(0, points.length - 1);
			}
		} else {
			if (points.length > 0) {
				points = points.slice(1);
			}
			if (Math.floor(points.length % 2) === 1) {
				points = points.slice(0, points.length - 1);
			}
		}

		for (let index = 0; index < points.length / 2; index++) {
			const start = points[index * 2]!;
			const end = points[index * 2 + 1]!;
			paths.push(...clipVerticalMaterialPath(start.x, start.y, end.y, mask, width, height));
		}
	}

	return paths;
}

function buildVerticalFloorBoardMaterialPaths(
	mask: Uint8Array,
	width: number,
	height: number,
	resolution: number
): Q10MapPixelPoint[][] {
	const materialW = 0.3;
	const materialH = 1.2;
	const wStep = Math.max(1, Math.floor(materialW / resolution));
	let hStep = Math.max(1, Math.floor(materialH / resolution));
	const paths: Q10MapPixelPoint[][] = [];

	for (let x = 0; x <= width; x++) {
		if (x % wStep === 0) {
			paths.push(...clipVerticalMaterialPath(x, 0, height, mask, width, height));
		}
	}

	hStep = hStep / 2;
	let rowIndex = 0;
	for (let y = 0; y <= height; y++) {
		if (y % hStep !== 0) continue;
		rowIndex += 1;

		let points: Q10MapPixelPoint[] = [];
		for (let x = 0; x <= width; x++) {
			if (x % wStep !== 0) continue;
			points.push({ x, y });
		}

		if (rowIndex % 2 === 1) {
			if (Math.floor(points.length % 2) === 1) {
				points = points.slice(0, points.length - 1);
			}
		} else {
			if (points.length > 0) {
				points = points.slice(1);
			}
			if (Math.floor(points.length % 2) === 1) {
				points = points.slice(0, points.length - 1);
			}
		}

		for (let index = 0; index < points.length / 2; index++) {
			const start = points[index * 2]!;
			const end = points[index * 2 + 1]!;
			paths.push(...clipHorizontalMaterialPath(start.x, end.x, start.y, mask, width, height));
		}
	}

	return paths;
}

function measureRoomText(
	ctx: any,
	text: string,
	fontSize: number
): { width: number; ascent: number; descent: number; height: number } {
	const metrics = ctx.measureText(text);
	const fontMetrics = metrics as TextMetrics & {
		fontBoundingBoxAscent?: number;
		fontBoundingBoxDescent?: number;
	};
	const ascent =
		fontMetrics.fontBoundingBoxAscent ||
		metrics.actualBoundingBoxAscent ||
		fontSize * 0.78;
	const descent =
		fontMetrics.fontBoundingBoxDescent ||
		metrics.actualBoundingBoxDescent ||
		fontSize * 0.22;
	return {
		width: metrics.width,
		ascent,
		descent,
		height: ascent + descent
	};
}

export class Q10MapBuilder {
	private assetsLoadedForModel: string | null = null;
	private assets: LoadedQ10Assets = this.createEmptyAssets();
	private opaqueBoundsCache = new WeakMap<Image, ImageOpaqueBounds>();

	constructor(private adapter?: any) {}

	private createEmptyAssets(): LoadedQ10Assets {
		return { roomTags: new Map<number, Image>() };
	}

	private async loadImageIfExists(filePath: string): Promise<Image | undefined> {
		if (!fs.existsSync(filePath)) return undefined;
		try {
			return await loadImage(fs.readFileSync(filePath));
		} catch {
			return undefined;
		}
	}

	private toImageBuffer(fileData: unknown): Buffer | undefined {
		if (!fileData) return undefined;
		if (Buffer.isBuffer(fileData)) return fileData;
		if (typeof fileData === "object" && fileData !== null && "file" in fileData) {
			const file = (fileData as { file: unknown }).file;
			if (Buffer.isBuffer(file)) return file;
			if (file instanceof Uint8Array) return Buffer.from(file);
			if (file instanceof ArrayBuffer) return Buffer.from(file);
			if (typeof file === "string") return Buffer.from(file);
			return undefined;
		}
		if (fileData instanceof Uint8Array) return Buffer.from(fileData);
		if (fileData instanceof ArrayBuffer) return Buffer.from(fileData);
		if (typeof fileData === "string") return Buffer.from(fileData);
		return undefined;
	}

	private async loadImageFromAdapterAssets(relativePath: string, robotModel?: string): Promise<Image | undefined> {
		if (
			!robotModel ||
			!this.adapter?.name ||
			typeof this.adapter.fileExistsAsync !== "function" ||
			typeof this.adapter.readFileAsync !== "function"
		) {
			return undefined;
		}

		const assetPath = `assets/${robotModel}/${relativePath}`;
		const namespaces = this.adapter.name.includes(".")
			? [this.adapter.name, this.adapter.name.split(".")[0]]
			: [this.adapter.name];

		for (const namespace of namespaces) {
			try {
				if (!(await this.adapter.fileExistsAsync(namespace, assetPath))) continue;
				const fileData = await this.adapter.readFileAsync(namespace, assetPath);
				const buffer = this.toImageBuffer(fileData);
				if (!buffer) continue;
				return await loadImage(buffer);
			} catch {
				// try next namespace
			}
		}

		return undefined;
	}

	private async loadImageAsset(relativePath: string, robotModel?: string): Promise<Image | undefined> {
		return (
			(await this.loadImageFromAdapterAssets(relativePath, robotModel)) ||
			(await this.loadImageIfExists(resolveQ10PluginAssetPath(relativePath)))
		);
	}

	private async ensureAssets(robotModel?: string): Promise<void> {
		const modelCacheKey = robotModel ?? "";
		if (this.assetsLoadedForModel === modelCacheKey) return;

		this.assets = this.createEmptyAssets();

		this.assets.device = await this.loadImageAsset(Q10AssetCatalog.device, robotModel);
		this.assets.power = await this.loadImageAsset(Q10AssetCatalog.power, robotModel);
		this.assets.forbidlineIcon = await this.loadImageAsset(Q10AssetCatalog.forbidlineIcon, robotModel);
		this.assets.obstacle = await this.loadImageAsset(Q10AssetCatalog.obstacle, robotModel);
		this.assets.tiaoGuoIcon = await this.loadImageAsset(Q10AssetCatalog.tiaoGuoIcon, robotModel);
		this.assets.mapCarpetMaterial = await this.loadImageAsset(Q10AssetCatalog.mapCarpetMaterial, robotModel);
		this.assets.mapThresholdMaterial = await this.loadImageAsset(Q10AssetCatalog.mapThresholdMaterial, robotModel);
		this.assets.suspectedThreshold = await this.loadImageAsset(Q10AssetCatalog.yisiMenkan, robotModel);
		this.assets.suspectedEasycard = await this.loadImageAsset(Q10AssetCatalog.yisiYika, robotModel);
		this.assets.suspectedCliff = await this.loadImageAsset(Q10AssetCatalog.yisiXuanya, robotModel);

		for (let roomType = 0; roomType < Q10AssetCatalog.roomTags.length; roomType++) {
			const image = await this.loadImageAsset(Q10AssetCatalog.roomTags[roomType], robotModel);
			if (image) this.assets.roomTags.set(roomType, image);
		}

		this.assetsLoadedForModel = modelCacheKey;
	}

	private getOpaqueBounds(image: Image | undefined): ImageOpaqueBounds | undefined {
		if (!image) return undefined;
		const cached = this.opaqueBoundsCache.get(image);
		if (cached) return cached;

		const width = imageWidth(image);
		const height = imageHeight(image);
		if (width <= 0 || height <= 0) return undefined;

		const canvas = createCanvas(width, height);
		const ctx = canvas.getContext("2d");
		ctx.drawImage(image as any, 0, 0, width, height);
		const pixels = ctx.getImageData(0, 0, width, height).data;
		let minX = width;
		let minY = height;
		let maxX = -1;
		let maxY = -1;

		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				const alpha = pixels[(y * width + x) * 4 + 3] ?? 0;
				if (alpha <= 8) continue;
				if (x < minX) minX = x;
				if (y < minY) minY = y;
				if (x > maxX) maxX = x;
				if (y > maxY) maxY = y;
			}
		}

		const bounds = maxX >= minX && maxY >= minY
			? { sx: minX, sy: minY, sw: maxX - minX + 1, sh: maxY - minY + 1 }
			: { sx: 0, sy: 0, sw: width, sh: height };
		this.opaqueBoundsCache.set(image, bounds);
		return bounds;
	}

	private drawCenteredOpaqueAsset(
		ctx: any,
		image: Image | undefined,
		x: number,
		y: number,
		drawWidth: number,
		rotationDeg = 0
	): void {
		if (!image) return;
		const bounds = this.getOpaqueBounds(image);
		if (!bounds || bounds.sw <= 0 || bounds.sh <= 0) {
			drawCenteredAsset(ctx, image, x, y, drawWidth, rotationDeg);
			return;
		}

		const scale = Math.min(drawWidth / bounds.sw, drawWidth / bounds.sh);
		const fittedWidth = bounds.sw * scale;
		const fittedHeight = bounds.sh * scale;

		ctx.save();
		ctx.translate(x, y);
		if (rotationDeg) ctx.rotate((rotationDeg * Math.PI) / 180);
		ctx.drawImage(
			image as any,
			bounds.sx,
			bounds.sy,
			bounds.sw,
			bounds.sh,
			-fittedWidth / 2,
			-fittedHeight / 2,
			fittedWidth,
			fittedHeight
		);
		ctx.restore();
	}

	private drawBaseMap(ctx: any, data: B01MapData, creator: Q10CreatorData): void {
		const width = data.header.sizeX;
		const height = data.header.sizeY;
		const tempCanvas = createCanvas(width, height);
		const tempCtx = tempCanvas.getContext("2d");
		const imageData = tempCtx.createImageData(width, height);
		const buffer = imageData.data;
		const roomColorMap = new Map<number, number>();

		for (const room of creator.roomModels) roomColorMap.set(room.gridValue, room.colorID);

		for (let index = 0; index < data.mapGrid.length; index++) {
			const value = data.mapGrid[index];
			const offset = index * 4;

			if (value === 127) {
				buffer[offset] = 0;
				buffer[offset + 1] = 0;
				buffer[offset + 2] = 0;
				buffer[offset + 3] = 0;
				continue;
			}

			let color: number = DARK_MAP_COLORS.inWall;
			if (value >= 128) color = DARK_MAP_COLORS.wall;
			else if (value > 1) {
				const roomColor = roomColorMap.get(value) ?? (value - 1) % DARK_MAP_COLORS.rooms.length;
				color = DARK_MAP_COLORS.rooms[roomColor] ?? DARK_MAP_COLORS.rooms[0];
			}

			const [r, g, b, a] = packedColorToRgbaBytes(color);
			buffer[offset] = r;
			buffer[offset + 1] = g;
			buffer[offset + 2] = b;
			buffer[offset + 3] = a || 255;
		}

		tempCtx.putImageData(imageData, 0, 0);
		ctx.drawImage(tempCanvas as any, 0, 0);
	}

	private withOutputSpace(ctx: any, draw: (outputCtx: any) => void): void {
		ctx.save();
		ctx.scale(1 / Q10_CANVAS_SCALE, 1 / Q10_CANVAS_SCALE);
		ctx.imageSmoothingEnabled = true;
		draw(ctx);
		ctx.restore();
	}

	private withMapSpace(ctx: any, draw: (mapCtx: any) => void): void {
		ctx.save();
		ctx.scale(Q10_CANVAS_SCALE, Q10_CANVAS_SCALE);
		draw(ctx);
		ctx.restore();
	}

	private isCarpetValue(value: number | undefined): boolean {
		return (((value ?? 0) & 0x3f) !== 0);
	}

	private createSelfIdentifiedCarpetCanvas(mask: Buffer, width: number, height: number): any {
		const canvas = createCanvas(width * 3, height * 3);
		const overlayCtx = canvas.getContext("2d");
		const imageData = overlayCtx.createImageData(width * 3, height * 3);
		const buffer = imageData.data;

		for (let index = 0; index < mask.length; index++) {
			if (!this.isCarpetValue(mask[index])) continue;

			const x = index % width;
			const y = Math.floor(index / width);
			const baseX = x * 3;
			const baseY = y * 3;
			const pixels = [
				[baseX + 2, baseY],
				[baseX + 1, baseY + 1],
				[baseX, baseY + 2]
			] as const;

			for (const [px, py] of pixels) {
				const offset = (py * width * 3 + px) * 4;
				buffer[offset] = 0;
				buffer[offset + 1] = 0;
				buffer[offset + 2] = 0;
				buffer[offset + 3] = 120;
			}
		}

		overlayCtx.putImageData(imageData, 0, 0);
		return canvas;
	}

	private drawSelfIdentifiedCarpetMask(
		ctx: any,
		mask: Buffer,
		left: number,
		top: number,
		width: number,
		height: number
	): void {
		if (!mask.length || width <= 0 || height <= 0) return;
		const carpetCanvas = this.createSelfIdentifiedCarpetCanvas(mask, width, height);
		ctx.drawImage(
			carpetCanvas as any,
			left * Q10_CANVAS_SCALE,
			top * Q10_CANVAS_SCALE,
			width * Q10_CANVAS_SCALE,
			height * Q10_CANVAS_SCALE
		);
	}

	private drawCarpetGrid(ctx: any, data: B01MapData): void {
		const carpetGrid = data.carpetGrid;
		if (!carpetGrid?.length) return;
		this.withOutputSpace(ctx, (outputCtx) => {
			this.drawSelfIdentifiedCarpetMask(
				outputCtx,
				carpetGrid,
				0,
				0,
				data.header.sizeX,
				data.header.sizeY
			);
		});
	}

	private drawSelfIdentifiedCarpets(ctx: any, data: B01MapData, creator: Q10CreatorData): void {
		if (!data.carpetGrid?.length || !creator.selfIdentifiedCarpets.length) return;
		this.withOutputSpace(ctx, (outputCtx) => {
			for (const carpet of creator.selfIdentifiedCarpets) {
				this.drawSelfIdentifiedCarpetMask(
					outputCtx,
					carpet.mask,
					carpet.left,
					carpet.top,
					carpet.width,
					carpet.height
				);
			}
		});
	}

	private buildOriginalMaterialPaths(
		data: B01MapData,
		creator: Q10CreatorData,
		roomIds: number[],
		kind: Q10OriginalMaterialKind
	): Q10MapPixelPoint[][] {
		if (!roomIds.length) return [];

		const width = data.header.sizeX;
		const height = data.header.sizeY;
		const baseGrid =
			creator.clipEraseMapGrid && creator.clipEraseMapGrid.length === width * height
				? creator.clipEraseMapGrid
				: data.mapGrid;
		const mask = buildRoomMaterialMaskGrid(baseGrid, width, height, roomIds);

		if (kind === "ceramicTile") {
			return buildCeramicTileMaterialPaths(mask, width, height, data.header.resolution);
		}
		if (kind === "horizontalFloorBoard") {
			return buildHorizontalFloorBoardMaterialPaths(mask, width, height, data.header.resolution);
		}
		return buildVerticalFloorBoardMaterialPaths(mask, width, height, data.header.resolution);
	}

	private drawRoomMaterials(
		ctx: any,
		_geometry: Q10MapGeometry,
		data: B01MapData,
		creator: Q10CreatorData
	): void {
		const ceramicTilePaths = creator.materialPaths.ceramicTile.length
			? creator.materialPaths.ceramicTile
			: this.buildOriginalMaterialPaths(data, creator, creator.roomMaterialRoomIds.ceramicTile, "ceramicTile");
		const horizontalFloorBoardPaths = creator.materialPaths.horizontalFloorBoard.length
			? creator.materialPaths.horizontalFloorBoard
			: this.buildOriginalMaterialPaths(data, creator, creator.roomMaterialRoomIds.horizontalFloorBoard, "horizontalFloorBoard");
		const verticalFloorBoardPaths = creator.materialPaths.verticalFloorBoard.length
			? creator.materialPaths.verticalFloorBoard
			: this.buildOriginalMaterialPaths(data, creator, creator.roomMaterialRoomIds.verticalFloorBoard, "verticalFloorBoard");

		const materialMapRate = getOriginalQ10MaterialMapRate(data.header.sizeX, data.header.sizeY);

		this.drawMaterialPathGroup(ctx, ceramicTilePaths, materialMapRate);
		this.drawMaterialPathGroup(ctx, horizontalFloorBoardPaths, materialMapRate);
		this.drawMaterialPathGroup(ctx, verticalFloorBoardPaths, materialMapRate);
	}

	private drawMaterialPathGroup(ctx: any, polygons: Q10MapPixelPoint[][], mapRate: number): void {
		if (!polygons.length) return;

		ctx.save();
		ctx.strokeStyle = packedArgbToCss(419430400);
		ctx.lineWidth = 2 / Math.max(mapRate, 1);
		ctx.lineJoin = "round";
		ctx.lineCap = "round";

		for (const polygon of polygons) {
			if (polygon.length < 2) continue;
			ctx.beginPath();
			ctx.moveTo(polygon[0].x, polygon[0].y);
			for (let index = 1; index < polygon.length; index++) {
				ctx.lineTo(polygon[index].x, polygon[index].y);
			}
			ctx.stroke();
		}

		ctx.restore();
	}

	private drawThresholdArea(
		ctx: any,
		geometry: Q10MapGeometry,
		area: Q10CreatorArea
	): void {
		if (area.points.length < 4) return;

		const placement = geometry.areaPlacement(area, "map");
		const { centerX, centerY, width, height, angleRad } = placement;
		if (width <= 0 || height <= 0) return;

		let tileWidth = geometry.quarterMeterTileLengthInMap();
		let tileHeight = tileWidth;
		const image = this.assets.mapThresholdMaterial;
		const sourceWidth = imageWidth(image) || tileWidth;
		const sourceHeight = imageHeight(image) || tileHeight;
		let imageScale = tileWidth / sourceWidth;
		if (imageScale <= 0.02) {
			imageScale = 0.02;
			tileWidth = sourceWidth * imageScale;
			tileHeight = sourceHeight * imageScale;
		} else {
			tileHeight = sourceHeight * imageScale;
		}

		const columns = Math.floor(width / tileWidth) + 2;
		const rows = Math.floor(height / tileHeight) + 2;
		if (columns <= 0 || rows <= 0) return;

		ctx.save();
		fillPolygon(ctx, area.points);
		ctx.clip();
		ctx.translate(centerX, centerY);
		ctx.rotate(angleRad);

		if (!image) {
			ctx.fillStyle = packedArgbToCss(DARK_MAP_COLORS.thresholdBase, 0.82);
			ctx.fillRect(-width / 2, -height / 2, width, height);
			ctx.restore();
			return;
		}

		for (let row = 0; row < rows; row++) {
			const drawY = -height / 2 + row * tileHeight;
			const rowShift =
				(tileWidth * Q10_LAYOUT.thresholdRowShiftRatio * row) % tileWidth;
			for (let column = 0; column < columns; column++) {
				const drawX = -width / 2 + column * tileWidth - rowShift;
				ctx.drawImage(image as any, drawX, drawY, tileWidth, tileHeight);
			}
		}

		ctx.restore();
	}

	private drawAreas(
		ctx: any,
		geometry: Q10MapGeometry,
		areas: Q10CreatorArea[],
		mode: "erase" | "forbid" | "mop" | "threshold"
	): void {
		if (!areas.length) return;
		const strokeWidth = geometry.layoutLengthInMap(Q10_LAYOUT.areaStrokeWidth);
		const dashLength = geometry.layoutLengthInMap(Q10_LAYOUT.areaMopDash);
		const fillColor = packedArgbToCss(
			mode === "erase" ? DARK_MAP_COLORS.eraseFill : DARK_MAP_COLORS.forbidFill
		);
		const strokeColor = packedArgbToCss(
			mode === "erase" ? DARK_MAP_COLORS.eraseBase : DARK_MAP_COLORS.forbidLine
		);
		const dashPattern = mode === "mop" ? [dashLength, dashLength] : [];

		for (const area of areas) {
			if (area.points.length < 3) continue;

			if (mode === "threshold") {
				this.drawThresholdArea(ctx, geometry, area);
				continue;
			}

			ctx.save();
			fillPolygon(ctx, area.points);
			ctx.fillStyle = fillColor;
			ctx.fill();
			ctx.restore();

			ctx.save();
			ctx.strokeStyle = strokeColor;
			ctx.lineWidth = strokeWidth;
			ctx.lineJoin = "round";
			ctx.lineCap = "round";
			ctx.setLineDash(dashPattern);
			fillPolygon(ctx, area.points);
			ctx.stroke();
			ctx.restore();
		}
	}

	private drawAreaMaterialAtlas(
		ctx: any,
		geometry: Q10MapGeometry,
		area: Q10CreatorArea,
		image: Image | undefined,
		rowShiftRatio = 0
	): void {
		if (area.points.length < 4) return;

		const placement = geometry.areaPlacement(area, "canvas");
		const { centerX, centerY, width, height, angleRad } = placement;
		if (width <= 0 || height <= 0) return;

		let tileWidth = Math.max(1, geometry.quarterMeterTileLength());
		let tileHeight = tileWidth;
		const sourceWidth = imageWidth(image) || tileWidth;
		const sourceHeight = imageHeight(image) || tileHeight;
		let imageScale = tileWidth / sourceWidth;
		if (imageScale <= 0.02) {
			imageScale = 0.02;
			tileWidth = sourceWidth * imageScale;
			tileHeight = sourceHeight * imageScale;
		} else {
			tileHeight = sourceHeight * imageScale;
		}

		const columns = Math.floor(width / tileWidth) + 2;
		const rows = Math.floor(height / tileHeight) + 2;
		if (columns <= 0 || rows <= 0) return;

		ctx.save();
		ctx.translate(centerX, centerY);
		ctx.rotate(angleRad);
		ctx.beginPath();
		ctx.rect(-width / 2, -height / 2, width, height);
		ctx.clip();

		if (!image) {
			ctx.fillStyle = "rgba(255, 255, 255, 0.22)";
			ctx.fillRect(-width / 2, -height / 2, width, height);
			ctx.restore();
			return;
		}

		for (let row = 0; row < rows; row++) {
			const drawY = -height / 2 + row * tileHeight;
			const rowShift = rowShiftRatio > 0
				? (tileWidth * rowShiftRatio * row) % tileWidth
				: 0;
			for (let column = 0; column < columns; column++) {
				const drawX = -width / 2 + column * tileWidth - rowShift;
				ctx.drawImage(image as any, drawX, drawY, tileWidth, tileHeight);
			}
		}

		ctx.restore();
	}

	private drawManualCarpetAreas(ctx: any, geometry: Q10MapGeometry, areas: Q10CreatorArea[]): void {
		if (!areas.length) return;
		this.withOutputSpace(ctx, (outputCtx) => {
			for (const area of areas) {
				this.drawAreaMaterialAtlas(outputCtx, geometry, area, this.assets.mapCarpetMaterial);
			}
		});
	}

	private drawForbidEndpoint(
		ctx: any,
		geometry: Q10MapGeometry,
		point: Q10MapPixelPoint,
		rotationDeg: number
	): void {
		const canvasPoint = geometry.mapPoint(point);
		const endpointSize = geometry.layoutLength(Q10_LAYOUT.forbidLineIconSize);
		if (this.assets.forbidlineIcon) {
			drawCenteredAsset(
				ctx,
				this.assets.forbidlineIcon,
				canvasPoint.x,
				canvasPoint.y,
				endpointSize,
				rotationDeg
			);
			return;
		}

		ctx.save();
		ctx.translate(canvasPoint.x, canvasPoint.y);
		ctx.rotate((rotationDeg * Math.PI) / 180);
		ctx.fillStyle = packedArgbToCss(DARK_MAP_COLORS.forbidLine);
		ctx.beginPath();
		ctx.arc(0, 0, endpointSize / 2, 0, Math.PI * 2);
		ctx.fill();
		ctx.fillStyle = "rgba(255,255,255,1)";
		ctx.fillRect(
			-endpointSize * 0.28,
			-endpointSize * 0.08,
			endpointSize * 0.56,
			endpointSize * 0.16
		);
		ctx.restore();
	}

	private drawVirtualWalls(ctx: any, geometry: Q10MapGeometry, walls: Q10CreatorLine[]): void {
		if (!walls.length) return;
		const lineWidth = geometry.layoutLength(Q10_LAYOUT.areaStrokeWidth);
		ctx.save();
		ctx.lineCap = "round";
		ctx.lineJoin = "round";
		ctx.strokeStyle = packedArgbToCss(DARK_MAP_COLORS.forbidLine);
		ctx.lineWidth = lineWidth;

		for (const wall of walls) {
			const start = geometry.mapPoint(wall.points[0]);
			const end = geometry.mapPoint(wall.points[1]);
			ctx.beginPath();
			ctx.moveTo(start.x, start.y);
			ctx.lineTo(end.x, end.y);
			ctx.stroke();
			const rotationDeg = (Math.atan2(end.y - start.y, end.x - start.x) * 180) / Math.PI;
			this.drawForbidEndpoint(ctx, geometry, wall.points[0], rotationDeg);
			this.drawForbidEndpoint(ctx, geometry, wall.points[1], rotationDeg);
		}
		ctx.restore();
	}

	private historyUpdateToPathKind(update: number | undefined): number {
		if (update === 6) return 0;
		if (update === 4) return 1;
		if (update === 5) return 2;
		return 0;
	}

	private normalizeNativePathType(type: number | undefined): number {
		if (type === 0 || type === 1 || type === 2 || type === 3 || type === 4) return type;
		return 0;
	}

	private packagePathPointsLikeNative(points: Array<Q10MapPixelPoint & { type: number }>): Q10MapPixelPoint[][][] {
		const paths: Q10MapPixelPoint[][][] = [[], [], [], [], []];
		let previous: (Q10MapPixelPoint & { type: number }) | null = null;

		for (const point of points) {
			const bucket = paths[point.type] ?? paths[0]!;

			const changedType = previous?.type !== point.type;
			if (changedType) {
				const subPath: Q10MapPixelPoint[] = [];
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

	private hasDrawablePathSegments(segments: Q10MapPixelPoint[][]): boolean {
		return segments.some((segment) => segment.length > 1);
	}

	private createPathCanvas(
		geometry: Q10MapGeometry,
		data: B01MapData,
		points: Array<Q10MapPixelPoint & { type: number }>
	): any | null {
		if (points.length < 2) return null;

		// Draw the path directly at final PNG resolution. The previous
		// implementation rendered on the coarse map grid first and then scaled
		// the bitmap up by the canvas scale, which made the path look visibly soft.
		const { width, height } = geometry.mapCanvasSize();
		const canvas = createCanvas(width, height);
		const pathCtx = canvas.getContext("2d");
		const paths = this.packagePathPointsLikeNative(points);
		const primaryWidth = width / 375;
		const glowWidth = geometry.mapLength(0.3 / Math.max(data.header.resolution, 0.001));

		const drawPath = (
			segments: Q10MapPixelPoint[][],
			strokeStyle: string,
			lineWidth: number,
			dash?: number[],
			dashOffset = 0
		): void => {
			const drawableSegments = segments.filter((segment) => segment.length >= 2);
			if (!drawableSegments.length) return;
			pathCtx.beginPath();
			pathCtx.strokeStyle = strokeStyle;
			pathCtx.lineWidth = lineWidth;
			pathCtx.lineJoin = "round";
			pathCtx.lineCap = "round";
			pathCtx.setLineDash(dash ?? []);
			pathCtx.lineDashOffset = dashOffset;
			for (const segment of drawableSegments) {
				pathCtx.moveTo(segment[0]!.x * Q10_CANVAS_SCALE, segment[0]!.y * Q10_CANVAS_SCALE);
				for (let index = 1; index < segment.length; index++) {
					pathCtx.lineTo(segment[index]!.x * Q10_CANVAS_SCALE, segment[index]!.y * Q10_CANVAS_SCALE);
				}
			}
			pathCtx.stroke();
			pathCtx.setLineDash([]);
			pathCtx.lineDashOffset = 0;
		};

		pathCtx.clearRect(0, 0, width, height);
		pathCtx.imageSmoothingEnabled = true;

		// Path paints use Skia.Color() in the original bundle, which interprets
		// packed integers as AARRGGBB. Base-map raster colors in this file use a
		// different packing, so path colors must be decoded separately.
		const wideGlowColor = packedArgbToCss(1728053247);
		const solidWhite = packedArgbToCss(4294967295);
		const thinGlowColor = packedArgbToCss(1728053247);
		const dashedColor = packedArgbToCss(2583691263);

		const pathStyles: Array<{ segments: Q10MapPixelPoint[][]; layers: Q10PathLayerStyle[] }> = [
			{
				segments: paths[4]!,
				layers: [
					{ strokeStyle: "rgba(255, 255, 255, 0.18)", lineWidth: glowWidth }
				]
			},
			{
				segments: paths[0]!,
				layers: [
					{ strokeStyle: wideGlowColor, lineWidth: glowWidth },
					{ strokeStyle: solidWhite, lineWidth: primaryWidth }
				]
			},
			{
				segments: paths[1]!,
				layers: [
					{ strokeStyle: wideGlowColor, lineWidth: glowWidth },
					{ strokeStyle: thinGlowColor, lineWidth: primaryWidth }
				]
			},
			{
				segments: paths[2]!,
				layers: [
					{ strokeStyle: solidWhite, lineWidth: primaryWidth }
				]
			},
			{
				segments: paths[3]!,
				layers: [
					{
						strokeStyle: dashedColor,
						lineWidth: primaryWidth,
						dash: [primaryWidth, primaryWidth * 3],
						dashOffset: primaryWidth * 3
					}
				]
			}
		] as const;

		for (const pathStyle of pathStyles) {
			if (!this.hasDrawablePathSegments(pathStyle.segments)) continue;
			for (const layer of pathStyle.layers) {
				drawPath(
					pathStyle.segments,
					layer.strokeStyle,
					layer.lineWidth,
					layer.dash,
					layer.dashOffset
				);
			}
		}

		return canvas;
	}

	private drawPath(ctx: any, geometry: Q10MapGeometry, data: B01MapData, creator: Q10CreatorData): void {
		const nativePath = creator.pathPixels ?? [];
		if (!nativePath.length && !data.history?.length) return;

		const toPixel = (point: { x: number; y: number }) =>
			robotToPixel({
				x: point.x,
				y: point.y,
				minX: data.header.minX,
				minY: data.header.minY,
				sizeY: data.header.sizeY,
				resolution: data.header.resolution,
				scale: 1
			});

		const pixelPoints = nativePath.length
			? nativePath.map((point: Q10CreatorPathPoint) => ({
				x: point.x,
				y: point.y,
				// Native Q10 path rendering in the original app is driven by the
				// decoded raw `type` from parserPathData/yx_getPathPointWith.
				// Do not synthesize alternate types from `update` here, otherwise
				// we may draw segments that the original leaves hidden or styles
				// differently.
				type: this.normalizeNativePathType(point.type)
			}))
			: (data.history ?? []).map((point) => {
				const pixel = toPixel(point);
				return {
					x: pixel.x,
					y: pixel.y,
					type: this.historyUpdateToPathKind(point.update)
				};
			});

		const pathCanvas = this.createPathCanvas(geometry, data, pixelPoints);
		if (!pathCanvas) return;

		ctx.save();
		ctx.imageSmoothingEnabled = false;
		ctx.drawImage(pathCanvas as any, 0, 0);
		ctx.restore();
	}

	private drawPose(
		ctx: any,
		geometry: Q10MapGeometry,
		pose: Q10PixelPose | undefined,
		image: Image | undefined,
		drawWidth: number,
		rotationOffset = 0
	): void {
		if (!pose) return;
		const canvasPose = geometry.mapPose(pose);
		if (!canvasPose) return;
		drawCenteredAsset(ctx, image, canvasPose.x, canvasPose.y, geometry.mapLength(drawWidth), (canvasPose.phi ?? 0) + rotationOffset);
	}

	private drawObstacleIcons(
		ctx: any,
		geometry: Q10MapGeometry,
		entries: Q10CreatorObstacle[],
		image: Image | undefined,
		fallbackColor: string
	): void {
		const targetWidth = geometry.imgRateLength(6);
		for (const entry of entries) {
			const point = geometry.mapPoint(entry.point);
			if (image) {
				drawCenteredSpriteWidthScaled(ctx, image, point.x, point.y, targetWidth);
				continue;
			}
			ctx.fillStyle = fallbackColor;
			ctx.beginPath();
			ctx.arc(point.x, point.y, targetWidth * 0.25, 0, Math.PI * 2);
			ctx.fill();
		}
	}

	private drawSuspectedPoints(ctx: any, geometry: Q10MapGeometry, entries: Q10CreatorSuspectedPoint[]): void {
		const targetSize = geometry.layoutLength(16);
		for (const entry of entries) {
			const point = geometry.mapPoint(entry.point);
			const image =
				entry.type === "threshold" ? this.assets.suspectedThreshold :
					entry.type === "easycard" ? this.assets.suspectedEasycard :
						this.assets.suspectedCliff;
			if (image) {
				drawCenteredCoverSquareAsset(ctx, image, point.x, point.y, targetSize);
				continue;
			}
			ctx.fillStyle = "rgba(255, 196, 0, 0.9)";
			ctx.beginPath();
			ctx.arc(point.x, point.y, targetSize * 0.25, 0, Math.PI * 2);
			ctx.fill();
		}
	}

	private drawRoomTags(ctx: any, geometry: Q10MapGeometry, creator: Q10CreatorData): void {
		if (!creator.roomModels.length) return;

		const metrics = getRenderMetrics();
		const referenceKImgRate = geometry.roomTagReferenceKImgRate();
		const exportScale = geometry.roomTagExportScale();
		const logicalFontSize = referenceKImgRate <= 3 ? 10 : 10 + 0.8 * (referenceKImgRate - 3);
		const fontSize = logicalFontSize * exportScale;
		const bubbleSize = metrics.roomBubbleDiameter * exportScale;
		const iconSize = metrics.roomIconSize * exportScale;
		const gap = metrics.roomGap * exportScale;

		ctx.font = `700 ${fontSize}px "Segoe UI", sans-serif`;

		for (const room of creator.roomModels) {
			const label = room.roomName?.trim();
			if (!label) continue;

			const bubbleColor = packedArgbToCss(DARK_MAP_COLORS.roomTagBase[room.colorID] ?? DARK_MAP_COLORS.roomTagBase[0]);
			const borderColor = packedArgbToCss(DARK_MAP_COLORS.roomTagStroke[room.colorID] ?? DARK_MAP_COLORS.roomTagStroke[0]);
			const textColor = bubbleColor;
			const icon = this.assets.roomTags.get(room.roomType) ?? this.assets.roomTags.get(0);
			const textMetrics = measureRoomText(ctx, label, fontSize);
			const paragraphWidth = textMetrics.width + exportScale;
			const paragraphHeight = textMetrics.height + exportScale;
			const totalWidth = bubbleSize + gap + paragraphWidth;
			const center = geometry.mapPoint(room.transCenterPoint);
			const centerX = center.x;
			const centerY = center.y;
			const startX = centerX - totalWidth / 2;
			const bubbleCenterX = startX + bubbleSize / 2;

			ctx.beginPath();
			ctx.arc(bubbleCenterX, centerY, bubbleSize / 2, 0, Math.PI * 2);
			ctx.fillStyle = bubbleColor;
			ctx.fill();
			ctx.strokeStyle = borderColor;
			ctx.lineWidth = Math.max(1, 0.5 * exportScale);
			ctx.stroke();

			if (icon) this.drawCenteredOpaqueAsset(ctx, icon, bubbleCenterX, centerY, iconSize);

			const textX = startX + bubbleSize + gap;
			ctx.textAlign = "left";
			ctx.textBaseline = "top";
			ctx.fillStyle = textColor;
			ctx.fillText(label, textX, centerY - paragraphHeight / 2);

			if (room.cleanOrder > 0) {
				const badgeRadius = metrics.roomBadgeRadius * exportScale;
				const badgeCenterX = startX + badgeRadius + exportScale;
				const badgeCenterY = centerY + paragraphHeight / 2 + 2 * exportScale + badgeRadius;
				ctx.beginPath();
				ctx.arc(badgeCenterX, badgeCenterY, badgeRadius, 0, Math.PI * 2);
				ctx.fillStyle = "rgba(111,111,116,0.95)";
				ctx.fill();
				ctx.fillStyle = "rgba(255,255,255,1)";
				ctx.textAlign = "center";
				ctx.textBaseline = "middle";
				ctx.font = `700 ${(room.cleanOrder < 10 ? 10 : 8) * exportScale}px "Segoe UI", sans-serif`;
				ctx.fillText(String(room.cleanOrder), badgeCenterX, badgeCenterY);
				ctx.font = `700 ${fontSize}px "Segoe UI", sans-serif`;
			}
		}
	}

	private initializeCanvas(ctx: any, width: number, height: number): void {
		ctx.imageSmoothingEnabled = false;
		ctx.fillStyle = "#000000";
		ctx.fillRect(0, 0, width, height);
	}

	private drawBaseLayers(ctx: any, geometry: Q10MapGeometry, data: B01MapData, creator: Q10CreatorData): void {
		this.withMapSpace(ctx, (mapCtx) => {
			this.drawBaseMap(mapCtx, data, creator);
			this.drawRoomMaterials(mapCtx, geometry, data, creator);
		});
	}

	private drawCleanOverlayLayers(ctx: any, geometry: Q10MapGeometry, data: B01MapData, creator: Q10CreatorData): void {
		this.withMapSpace(ctx, (mapCtx) => {
			if (creator.selfIdentifiedCarpets.length) this.drawSelfIdentifiedCarpets(mapCtx, data, creator);
			else this.drawCarpetGrid(mapCtx, data);
			this.drawManualCarpetAreas(mapCtx, geometry, creator.carpetAreas);
			this.drawAreas(mapCtx, geometry, creator.forbidAreas, "forbid");
			this.drawAreas(mapCtx, geometry, creator.mopAreas, "mop");
		});

		ctx.imageSmoothingEnabled = true;
		this.drawVirtualWalls(ctx, geometry, creator.virtualWalls);
		this.withMapSpace(ctx, (mapCtx) => {
			this.drawAreas(mapCtx, geometry, creator.thresholdAreas, "threshold");
		});
		this.drawPath(ctx, geometry, data, creator);
		this.withMapSpace(ctx, (mapCtx) => {
			this.drawAreas(mapCtx, geometry, creator.eraseAreas, "erase");
		});
	}

	private drawInteractiveOverlayLayers(ctx: any, geometry: Q10MapGeometry, creator: Q10CreatorData): void {
		this.drawPose(ctx, geometry, creator.chargerPixel, this.assets.power, 8, -90);
		this.drawPose(ctx, geometry, creator.robotPixel, this.assets.device, 8, 90);
		this.drawObstacleIcons(ctx, geometry, creator.obstaclePixels, this.assets.obstacle, "rgba(255,100,80,0.9)");
		this.drawObstacleIcons(ctx, geometry, creator.skipPixels, this.assets.tiaoGuoIcon, "rgba(255,220,60,0.92)");
		this.drawSuspectedPoints(ctx, geometry, creator.suspectedPoints);
		this.drawRoomTags(ctx, geometry, creator);
	}

	public async buildMaps(data: B01MapData, deviceStatus?: B01DeviceStatus, robotModel?: string): Promise<Q10RenderedMaps> {
		void deviceStatus;
		await this.ensureAssets(robotModel);

		const creator = data.q10CreatorData;
		if (!creator?.q10Detected) {
			throw new Error("Q10 creator data missing for Q10 builder");
		}

		const geometry = new Q10MapGeometry(data, 1);
		const { width, height } = geometry.mapCanvasSize();
		const canvas = createCanvas(width, height);
		const ctx = canvas.getContext("2d");

		this.initializeCanvas(ctx, width, height);
		this.drawBaseLayers(ctx, geometry, data, creator);
		this.drawCleanOverlayLayers(ctx, geometry, data, creator);
		const clean = canvas.toBuffer("image/png");
		this.drawInteractiveOverlayLayers(ctx, geometry, creator);

		return {
			full: canvas.toBuffer("image/png"),
			clean
		};
	}

	public async buildMap(data: B01MapData, deviceStatus?: B01DeviceStatus, robotModel?: string): Promise<Buffer> {
		const rendered = await this.buildMaps(data, deviceStatus, robotModel);
		return rendered.full;
	}
}
