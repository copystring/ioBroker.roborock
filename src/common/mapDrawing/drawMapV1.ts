/**
 * Single orchestration for V1 map drawing. All layers (floor, segments, carpet, paths, robot, etc.)
 * are computed here and drawn via IMapRenderer. No duplicate logic elsewhere.
 */
import { robotToPixel } from "../coordTransformation";
import { processPaths } from "../pathProcessor";
import type { PathResult } from "../pathProcessor";
import { getPixelFromScaledDimensions } from "./coordHelpers";
import { hexToRgbaString, LEGACY_COLORS, VISUAL_BLOCK_SIZE } from "./constants";
import type {
	DrawMapV1Options,
	DrawObstacleInput,
	DrawRect,
	DrawRoomLabelInput,
	DrawVirtualWallInput,
	DrawZoneRectInput,
	IMapRenderer,
} from "./types";

const MM_PER_PIXEL = 50;

/** Minimal V1 map data shape required for drawing. */
export interface V1MapDataForDrawing {
	IMAGE: {
		position: { left: number; top: number };
		dimensions: { width: number; height: number };
		pixels?: {
			floor?: number[];
			obstacle?: number[];
			segments?: number[];
		};
	};
	CARPET_MAP?: number[];
	PATH?: { points: [number, number][] };
	MOP_PATH?: number[];
	CURRENTLY_CLEANED_ZONES?: number[][];
	FORBIDDEN_ZONES?: number[][];
	NO_MOP_ZONE?: number[][];
	CURTAIN?: number[][];
	MISS_ZONE?: number[][];
	VIRTUAL_WALLS?: number[][];
	GOTO_PREDICTED_PATH?: { points: [number, number][] };
	OBSTACLES2?: Array<[number, number, number, ...unknown[]]>;
	ROBOT_POSITION?: { position: [number, number]; angle?: number };
	CHARGER_LOCATION?: { position: [number, number] };
	GOTO_TARGET?: [number, number];
}

function buildRobotToPixel(
	image: V1MapDataForDrawing["IMAGE"],
	scaleFactor: number,
	dimensionsAreScaled: boolean
): (robotX: number, robotY: number) => { x: number; y: number } {
	const left = image.position.left;
	const top = image.position.top;
	const dims = image.dimensions;
	const sizeY = dimensionsAreScaled ? dims.height / scaleFactor : dims.height;
	return (robotX: number, robotY: number) =>
		robotToPixel({
			x: robotX,
			y: robotY,
			minX: left * MM_PER_PIXEL,
			minY: top * MM_PER_PIXEL,
			sizeY,
			resolution: MM_PER_PIXEL,
			scale: scaleFactor,
		});
}

function getRoomName(segmentId: number, options: DrawMapV1Options): string | undefined {
	const rn = options.roomNames;
	if (!rn) return undefined;
	if (rn instanceof Map) return rn.get(segmentId);
	return (rn as Record<number, string>)[segmentId];
}

export interface DrawMapV1Result {
	/** Bounds of floor pixels (for backend crop). */
	bounds?: { minX: number; minY: number; maxX: number; maxY: number };
}

/**
 * Draws the full V1 map through the given renderer. Single source for all layers.
 * Backend: pass dimensionsAreScaled: true if mapData.IMAGE.dimensions are already in pixel size.
 * Frontend: pass dimensionsAreScaled: false and scaleFactor (grid dimensions).
 */
export async function drawMapV1(
	mapData: V1MapDataForDrawing,
	renderer: IMapRenderer,
	options: DrawMapV1Options = {}
): Promise<DrawMapV1Result> {
	const scaleFactor = options.scaleFactor ?? VISUAL_BLOCK_SIZE;
	const dimensionsAreScaled = options.dimensionsAreScaled ?? false;
	const image = mapData.IMAGE;
	const dims = image.dimensions;
	const scaledWidth = dimensionsAreScaled ? dims.width : dims.width * scaleFactor;
	const scaledHeight = dimensionsAreScaled ? dims.height : dims.height * scaleFactor;
	const robotToPx = buildRobotToPixel(image, scaleFactor, dimensionsAreScaled);

	const pixel = (px: number) => getPixelFromScaledDimensions(scaledWidth, scaledHeight, px);

	// --- Floor + obstacle rects ---
	const floorRects: DrawRect[] = [];
	let bounds: DrawMapV1Result["bounds"] | undefined;
	const floorColor = hexToRgbaString("#E9E9E9");
	const obstacleColor = hexToRgbaString("#6B7174");
	if (image.pixels?.floor) {
		for (const px of image.pixels.floor) {
			const { x, y } = pixel(px);
			floorRects.push({ x, y, w: VISUAL_BLOCK_SIZE, h: VISUAL_BLOCK_SIZE, fill: floorColor });
			if (!bounds) bounds = { minX: x, minY: y, maxX: x + VISUAL_BLOCK_SIZE, maxY: y + VISUAL_BLOCK_SIZE };
			else {
				bounds.minX = Math.min(bounds.minX, x);
				bounds.minY = Math.min(bounds.minY, y);
				bounds.maxX = Math.max(bounds.maxX, x + VISUAL_BLOCK_SIZE);
				bounds.maxY = Math.max(bounds.maxY, y + VISUAL_BLOCK_SIZE);
			}
		}
	}
	if (image.pixels?.obstacle) {
		for (const px of image.pixels.obstacle) {
			const { x, y } = pixel(px);
			floorRects.push({ x, y, w: VISUAL_BLOCK_SIZE, h: VISUAL_BLOCK_SIZE, fill: obstacleColor });
			if (!bounds) bounds = { minX: x, minY: y, maxX: x + VISUAL_BLOCK_SIZE, maxY: y + VISUAL_BLOCK_SIZE };
			else {
				bounds.minX = Math.min(bounds.minX, x);
				bounds.minY = Math.min(bounds.minY, y);
				bounds.maxX = Math.max(bounds.maxX, x + VISUAL_BLOCK_SIZE);
				bounds.maxY = Math.max(bounds.maxY, y + VISUAL_BLOCK_SIZE);
			}
		}
	}
	renderer.drawFloor(floorRects);

	// --- Segment rects (with optional color from options.getSegmentColor) ---
	const segmentRects: DrawRect[] = [];
	const segmentsData: Record<number, { minX: number; maxX: number; minY: number; maxY: number }> = {};
	if (image.pixels?.segments) {
		for (const px of image.pixels.segments) {
			const segnum = px >>> 21;
			const pixelIndex = px & 0x1fffff;
			const { x, y } = pixel(pixelIndex);
			if (!segmentsData[segnum]) segmentsData[segnum] = { minX: x, maxX: x, minY: y, maxY: y };
			else {
				const s = segmentsData[segnum];
				s.minX = Math.min(s.minX, x);
				s.maxX = Math.max(s.maxX, x);
				s.minY = Math.min(s.minY, y);
				s.maxY = Math.max(s.maxY, y);
			}
			const fill = options.getSegmentColor ? options.getSegmentColor(segnum) : hexToRgbaString("#CCCCCC");
			if (fill) segmentRects.push({ x, y, w: VISUAL_BLOCK_SIZE, h: VISUAL_BLOCK_SIZE, fill });
		}
	}
	renderer.drawSegmentRects(segmentRects);

	// Clean snapshot (backend only): after segments, before carpet
	if (renderer.getCleanSnapshot) renderer.getCleanSnapshot();

	// --- Carpet ---
	const carpetPositions: { x: number; y: number }[] = [];
	if (mapData.CARPET_MAP?.length) {
		for (const px of mapData.CARPET_MAP) {
			carpetPositions.push(pixel(px));
		}
	}
	renderer.drawCarpet({ positions: carpetPositions });

	// --- Paths ---
	let mopPath = mapData.MOP_PATH;
	if (!mopPath?.length && mapData.PATH?.points?.length) mopPath = new Array(mapData.PATH.points.length).fill(0);
	const pathResult: PathResult =
		mapData.PATH?.points && mopPath
			? processPaths(
				mapData.PATH.points,
				mopPath,
				(robotPoint) => robotToPx(robotPoint[0], robotPoint[1]),
				scaleFactor,
				null
			  )
			: {
				mainPath: [[]],
				backwashPath: [[]],
				pureCleanPath: [[]],
				mopPath: [[]],
				mainPathD: "",
				backwashPathD: "",
				pureCleanPathD: "",
				mopPathD: "",
			  };

	const lwMain = Math.max(1, VISUAL_BLOCK_SIZE / 2);
	const lwBackwash = VISUAL_BLOCK_SIZE * 0.5;
	renderer.drawPath({
		segments: pathResult.mopPath,
		stroke: "rgba(255, 255, 255, 1)",
		lineWidth: 6.5 * VISUAL_BLOCK_SIZE,
		opacity: 0.18,
		pathLayer: "mop",
	});
	renderer.drawPath({
		segments: pathResult.mainPath,
		stroke: LEGACY_COLORS.path,
		lineWidth: lwMain,
		pathLayer: "main",
	});
	renderer.drawPath({
		segments: pathResult.backwashPath,
		stroke: "rgba(255, 255, 255, 1)",
		lineWidth: lwBackwash,
		dashed: true,
		pathLayer: "backwash",
	});
	renderer.drawPath({
		segments: pathResult.pureCleanPath,
		stroke: "rgba(255, 255, 255, 1)",
		lineWidth: lwBackwash,
		pathLayer: "pure",
	});

	// --- Active zones ---
	const activeZones: DrawZoneRectInput[] = [];
	if (mapData.CURRENTLY_CLEANED_ZONES?.length) {
		for (const coord of mapData.CURRENTLY_CLEANED_ZONES) {
			const p1 = robotToPx(coord[0], coord[1]);
			const p2 = robotToPx(coord[2], coord[3]);
			const x = Math.min(p1.x, p2.x);
			const y = Math.min(p1.y, p2.y);
			const w = Math.abs(p2.x - p1.x);
			const h = Math.abs(p2.y - p1.y);
			activeZones.push({
				x,
				y,
				w,
				h,
				fill: "rgba(46,139,87,0.1)",
				stroke: "#2e8b57",
			});
		}
	}
	renderer.drawActiveZones(activeZones);

	// --- Restricted zones + virtual walls ---
	const restrictedZones: DrawZoneRectInput[] = [];
	const toRect = (zone: number[]) => {
		const xs = [zone[0], zone[2], zone[4], zone[6]];
		const ys = [zone[1], zone[3], zone[5], zone[7]];
		const p1 = robotToPx(Math.min(...xs), Math.max(...ys));
		const p2 = robotToPx(Math.max(...xs), Math.min(...ys));
		return { x: p1.x, y: p2.y, w: p2.x - p1.x, h: p1.y - p2.y };
	};
	if (mapData.FORBIDDEN_ZONES?.length) {
		for (const z of mapData.FORBIDDEN_ZONES) {
			const r = toRect(z);
			restrictedZones.push({ ...r, fill: "rgba(255, 0, 0, 0.5)", stroke: "rgba(255, 0, 0, 1)" });
		}
	}
	if (mapData.NO_MOP_ZONE?.length) {
		for (const z of mapData.NO_MOP_ZONE) {
			const r = toRect(z);
			restrictedZones.push({ ...r, fill: "rgba(0, 0, 255, 0.5)", stroke: "rgba(0, 0, 255, 1)" });
		}
	}
	if (mapData.CURTAIN?.length) {
		for (const z of mapData.CURTAIN) {
			const r = toRect(z);
			restrictedZones.push({ ...r, fill: "rgba(250, 198, 182, 0.5)", stroke: "#fac6b6" });
		}
	}
	if (mapData.MISS_ZONE?.length) {
		for (const z of mapData.MISS_ZONE) {
			const r = toRect(z);
			restrictedZones.push({ ...r, fill: "rgba(250, 229, 158, 0.5)", stroke: "#fae59e" });
		}
	}
	const virtualWalls: DrawVirtualWallInput[] = [];
	if (mapData.VIRTUAL_WALLS?.length) {
		for (const wall of mapData.VIRTUAL_WALLS) {
			const p1 = robotToPx(wall[0], wall[1]);
			const p2 = robotToPx(wall[2], wall[3]);
			virtualWalls.push({
				x1: p1.x,
				y1: p1.y,
				x2: p2.x,
				y2: p2.y,
				stroke: "rgba(255, 0, 0, 1)",
				lineWidth: 1 * VISUAL_BLOCK_SIZE,
			});
		}
	}
	renderer.drawRestrictedZones(restrictedZones, virtualWalls);

	// --- Predicted path ---
	if (mapData.GOTO_PREDICTED_PATH?.points?.length) {
		const points = mapData.GOTO_PREDICTED_PATH.points.map((c) => robotToPx(c[0], c[1]));
		renderer.drawPredictedPath({
			points,
			stroke: "rgba(255, 255, 255, 1)",
			lineWidth: (3 * VISUAL_BLOCK_SIZE) / 2,
			dashArray: [3 * VISUAL_BLOCK_SIZE, 3 * VISUAL_BLOCK_SIZE],
		});
	} else {
		renderer.drawPredictedPath({ points: [], stroke: "", lineWidth: 0, dashArray: [] });
	}

	// --- Obstacles ---
	const obstacles: DrawObstacleInput[] = [];
	if (mapData.OBSTACLES2?.length) {
		for (const ob of mapData.OBSTACLES2) {
			const p = robotToPx(ob[0], ob[1]);
			obstacles.push({ x: p.x, y: p.y, typeOrSuffix: ob[2], obstacleData: ob });
		}
	}
	const drawObs = renderer.drawObstacles(obstacles);
	if (drawObs && typeof (drawObs as Promise<unknown>).then === "function") await (drawObs as Promise<void>);

	// --- Robot ---
	if (mapData.ROBOT_POSITION?.position) {
		const [rx, ry] = mapData.ROBOT_POSITION.position;
		const p = robotToPx(rx, ry);
		renderer.drawRobot({
			x: p.x,
			y: p.y,
			angle: mapData.ROBOT_POSITION.angle ?? 0,
		});
	}

	// --- Charger ---
	if (mapData.CHARGER_LOCATION?.position) {
		const p = robotToPx(mapData.CHARGER_LOCATION.position[0], mapData.CHARGER_LOCATION.position[1]);
		renderer.drawCharger({ x: p.x, y: p.y });
	}

	// --- Go-to pin ---
	if (mapData.GOTO_TARGET?.[0] != null && mapData.GOTO_TARGET?.[1] != null) {
		const p = robotToPx(mapData.GOTO_TARGET[0], mapData.GOTO_TARGET[1]);
		renderer.drawGoToPin({ x: p.x, y: p.y });
	}

	// --- Room labels ---
	const roomLabels: DrawRoomLabelInput[] =
		(options.roomLabels?.length ?? 0) > 0
			? options.roomLabels!
			: (() => {
				const out: DrawRoomLabelInput[] = [];
				for (const [segnumStr, bounds] of Object.entries(segmentsData)) {
					const segnum = parseInt(segnumStr, 10);
					if (segnum === 0) continue;
					const name = getRoomName(segnum, options);
					if (!name) continue;
					const centerX = bounds.minX + (bounds.maxX - bounds.minX) / 2 + VISUAL_BLOCK_SIZE / 2;
					const centerY = bounds.minY + (bounds.maxY - bounds.minY) / 2 + VISUAL_BLOCK_SIZE / 2;
					out.push({ segmentId: segnum, x: centerX, y: centerY, text: name });
				}
				return out;
			  })();
	renderer.drawRoomLabels(roomLabels);

	return { bounds };
}
