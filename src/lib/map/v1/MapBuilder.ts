import { createCanvas, Image, loadImage, type Canvas, type CanvasRenderingContext2D } from "@napi-rs/canvas";
import * as fs from "fs";
import * as path from "path";
import { Roborock } from "../../../main";
import * as Images from "../../images";
import { processPaths, type PathPoint, type PathResult } from "../../pathProcessor.js";
import { assignRoborockRoomColorsToHex } from "../../roomColoring";
import { LEGACY_COLORS, ROBOROCK_PALETTE, VISUAL_BLOCK_SIZE } from "../MapHelper"; // Import shared resources

// ... Constants removed (using MapHelper or internal logic) ...

const OFFSET = 60;
const MAX_BLOCK_NUM = 32;
// VISUAL_BLOCK_SIZE imported

const ORG_COLORS = ROBOROCK_PALETTE;

// LEGACY_COLORS imported

interface CanvasMapOptions {
	selectedMap?: any;
	mappedRooms?: any;
	model?: string;
	options?: {
		FLOORCOLOR?: string;
		WALLCOLOR?: string;
		PATHCOLOR?: string;
		newmap?: boolean;
		ROBOT?: string;
	};
}

interface Dimensions {
	width: number;
	height: number;
}

// Define a custom interface to handle missing type definitions in @napi-rs/canvas
interface ExtendedContext2D extends CanvasRenderingContext2D {
	drawImage(image: Image | Canvas, dx: number, dy: number, dw?: number, dh?: number): void;
	canvas: Canvas;
	antialias?: string;
}

// -----------------------------------------------------------------------------
// Map Creator Class
// -----------------------------------------------------------------------------

export class MapBuilder {
	adapter: Roborock;
	colors: { floor: string; obstacle: string; path: string; newmap: boolean };

	constructor(adapter: Roborock) {
		this.adapter = adapter;
		this.colors = {
			floor: LEGACY_COLORS.floor,
			obstacle: LEGACY_COLORS.obstacle,
			path: LEGACY_COLORS.path,
			newmap: true,
		};
	}

	// --------------------
	// Coordinate Helpers
	// --------------------

	private getX(dimensions: Dimensions, px: number): number {
		return (px * VISUAL_BLOCK_SIZE) % dimensions.width;
	}

	private getY(dimensions: Dimensions, px: number): number {
		return dimensions.height - Math.floor(px / (dimensions.width / VISUAL_BLOCK_SIZE)) * VISUAL_BLOCK_SIZE - VISUAL_BLOCK_SIZE;
	}

	private robotXtoCanvasX(image: any, robotCoord: number): number {
		// Calculate base X
		const x = (robotCoord - image.position.left) * VISUAL_BLOCK_SIZE;
		// Add centering offset (+1.5px) to align with pixel center
		return x + VISUAL_BLOCK_SIZE / 2;
	}

	private robotYtoCanvasY(image: any, robotCoord: number): number {
		// Calculate base Y
		const y = (image.dimensions.height / VISUAL_BLOCK_SIZE + image.position.top - robotCoord) * VISUAL_BLOCK_SIZE;
		// Add centering offset (-1.5px) to align with pixel center
		return y - VISUAL_BLOCK_SIZE / 2;
	}

	// --------------------
	// Drawing Helpers
	// --------------------

	/**
	 * Creates a pre-rendered sprite for a single carpet tile.
	 * Logic matches renderCarpetTest.js exactly.
	 */
	private createCarpetSprite(): Canvas {
		// Create a tiny canvas just for one tile (3x3)
		const spriteCanvas = createCanvas(VISUAL_BLOCK_SIZE, VISUAL_BLOCK_SIZE);
		const ctx = spriteCanvas.getContext("2d") as unknown as ExtendedContext2D;

		// Disable AA for the sprite generation too
		ctx.imageSmoothingEnabled = false;
		if ("antialias" in ctx) ctx.antialias = "none";

		// Carpet color (semi-transparent dark)
		ctx.fillStyle = "rgba(0, 0, 0, 0.4)";

		const STRIDE = 3;

		// Draw the pattern ONCE here
		for (let dx = 0; dx < VISUAL_BLOCK_SIZE; dx++) {
			for (let dy = 0; dy < VISUAL_BLOCK_SIZE; dy++) {
				const sum = dx + dy;
				// Diagonal pattern logic: x + y = k
				// We use offset 2 to center the diagonal line in a typical 3x3 block
				if (sum % STRIDE === 2) {
					ctx.fillRect(dx, dy, 1, 1);
				}
			}
		}

		return spriteCanvas;
	}

	private buildAdjacencyMatrix(segmentPixels: number[], width: number, height: number, maxIdFromCaller: number): number[][] {
		let maxSegInPixels = 0;
		for (const px of segmentPixels) {
			const segnum = px >>> 21;
			if (segnum > maxSegInPixels) maxSegInPixels = segnum;
		}
		const size = Math.max(maxIdFromCaller + 1, maxSegInPixels + 1, MAX_BLOCK_NUM);

		const matrix: number[][] = Array.from({ length: size }, () => Array(size).fill(0));
		const segMap = new Int16Array(width * height).fill(-1);

		for (const px of segmentPixels) {
			const pixelIndex = px & 0x1fffff;
			const segnum = px >>> 21;
			if (pixelIndex >= 0 && pixelIndex < segMap.length && segnum < size) {
				segMap[pixelIndex] = segnum;
			}
		}

		for (let i = 0; i < segMap.length; i++) {
			const segA = segMap[i];
			if (segA < 0) continue;
			const x = i % width;
			const y = Math.floor(i / width);

			if (segA < size) matrix[segA][segA] = 1;

			if (y > 0) {
				const segB = segMap[i - width];
				if (segB >= 0 && segA !== segB && segA < size && segB < size) {
					matrix[segA][segB] = 1;
					matrix[segB][segA] = 1;
				}
			}
			if (x > 0) {
				const segB = segMap[i - 1];
				if (segB >= 0 && segA !== segB && segA < size && segB < size) {
					matrix[segA][segB] = 1;
					matrix[segB][segA] = 1;
				}
			}
		}
		return matrix;
	}

	private drawPathSegments(
		mainCtx: ExtendedContext2D,
		tempCtx: CanvasRenderingContext2D,
		pathSegments: PathPoint[][],
		color: string,
		width: number,
		opacity: number,
		dashed: boolean = false
	) {
		if (!pathSegments || pathSegments.length === 0) return;

		// No additional offsets required
		const offsetX = 0;
		const offsetY = 0;

		const w = (tempCtx as any).canvas.width;
		const h = (tempCtx as any).canvas.height;

		tempCtx.clearRect(0, 0, w, h);

		tempCtx.strokeStyle = color;
		tempCtx.lineWidth = width;
		tempCtx.lineCap = "round";
		tempCtx.lineJoin = "round";

		if (dashed) {
			tempCtx.setLineDash([VISUAL_BLOCK_SIZE, 2 * VISUAL_BLOCK_SIZE]);
		} else {
			tempCtx.setLineDash([]);
		}

		tempCtx.beginPath();
		pathSegments.forEach((segment) => {
			if (segment.length > 0) {
				tempCtx.moveTo(segment[0].x + offsetX, segment[0].y + offsetY);
				for (let i = 1; i < segment.length; i++) {
					tempCtx.lineTo(segment[i].x + offsetX, segment[i].y + offsetY);
				}
			}
		});
		tempCtx.stroke();

		mainCtx.save();
		mainCtx.globalAlpha = opacity;
		mainCtx.drawImage((tempCtx as any).canvas, 0, 0);
		mainCtx.restore();
	}

	// --------------------
	// Main Map Generation
	// --------------------

	public async canvasMap(mapdata: any, params: CanvasMapOptions = {}): Promise<[string, string, string]> {
		const { mappedRooms = null, options = {} } = params;

		if (!mapdata || !mapdata.IMAGE || !mapdata.IMAGE.dimensions) {
			this.adapter.rLog("MapManager", params.model || null, "Warn", undefined, undefined, "Received invalid or empty map data, cannot generate map.", "warn");
			const errorCanvas = createCanvas(1, 1).toDataURL();
			return [errorCanvas, errorCanvas, errorCanvas];
		}

		this.applyOptions(options);

		const [imgRobot, imgCharger, imgGoToPin] = await this.loadImages(options.ROBOT);

		// Use VISUAL_BLOCK_SIZE for scaling logic
		mapdata.IMAGE.dimensions.width *= VISUAL_BLOCK_SIZE;
		mapdata.IMAGE.dimensions.height *= VISUAL_BLOCK_SIZE;

		const canvas = createCanvas(mapdata.IMAGE.dimensions.width, mapdata.IMAGE.dimensions.height);
		const ctx = canvas.getContext("2d") as unknown as ExtendedContext2D;

		// 1. Draw Floor & Walls
		const bounds = this.drawFloorAndWalls(ctx, mapdata.IMAGE);

		// 2. Draw Segments
		const segmentsData = this.drawSegments(ctx, mapdata.IMAGE, mapdata.CURRENTLY_CLEANED_BLOCKS);

		// --- SAVE CLEAN MAP (WITHOUT CARPET) ---
		const cleanMapUncroppedBase64 = this.getCleanMapBase64(canvas);

		// 3. Draw Carpet
		this.drawCarpet(ctx, mapdata.CARPET_MAP, mapdata.IMAGE);

		// 4. Draw Paths
		this.drawPaths(ctx, mapdata);

		// 5. Draw Active Zones
		this.drawActiveZones(ctx, mapdata.CURRENTLY_CLEANED_ZONES, mapdata.IMAGE);

		// 6. Draw Restricted Areas
		this.drawRestrictedAreas(ctx, mapdata);

		// 7. Draw Predicted Path
		this.drawPredictedPath(ctx, mapdata.GOTO_PREDICTED_PATH, mapdata.IMAGE);

		// 8. Draw Obstacles
		await this.drawObstacles(ctx, mapdata.OBSTACLES2, mapdata.IMAGE, params.model);

		// 9. Draw Robot & Charger & Target
		this.drawRobotChargerTarget(ctx, mapdata, imgRobot, imgCharger, imgGoToPin);

		// 10. Draw Room Names
		this.drawRoomNames(ctx, segmentsData, mappedRooms);

		// --- Get full uncropped map (INCLUDES Carpet) ---
		const fullMapUncroppedBase64 = canvas.toDataURL();

		// 11. Crop & Return
		const croppedMapBase64 = this.cropMap(canvas, ctx, bounds);

		return [cleanMapUncroppedBase64, fullMapUncroppedBase64, croppedMapBase64];
	}

	private applyOptions(options: any) {
		if (options) {
			if (options.FLOORCOLOR) this.colors.floor = options.FLOORCOLOR;
			if (options.WALLCOLOR) this.colors.obstacle = options.WALLCOLOR;
			if (options.PATHCOLOR) this.colors.path = options.PATHCOLOR;
			this.colors.newmap = options.newmap ?? true;
		}
	}

	private async loadImages(robotType?: string) {
		let robotImgSource = Images.IMG_ROBOT_ORIGINAL;
		switch (robotType) {
			case "robot":
				robotImgSource = Images.IMG_ROBOT_DEFAULT;
				break;
			case "robot1":
				robotImgSource = Images.IMG_ROBOT1;
				break;
			case "tank":
				robotImgSource = Images.IMG_TANK;
				break;
			case "spaceship":
				robotImgSource = Images.IMG_SPACESHIP;
				break;
			case "robot2":
				robotImgSource = Images.IMG_ROBOT_2;
				break;
		}
		return Promise.all([loadImage(robotImgSource), loadImage(Images.IMG_CHARGER), loadImage(Images.IMG_GO_TO_PIN)]);
	}

	private drawFloorAndWalls(ctx: ExtendedContext2D, image: any) {
		let maxtop = 0,
			maxleft = 0,
			minleft = image.dimensions.width,
			mintop = image.dimensions.height;

		if (image.pixels.floor && image.pixels.floor.length > 0) {
			if (typeof image.pixels.floor[0] === "number") {
				minleft = image.pixels.floor[0] % image.dimensions.width;
				mintop = image.dimensions.height - 1 - Math.floor(image.pixels.floor[0] / image.dimensions.width);
			}
			["floor", "obstacle"].forEach((key) => {
				if (!image.pixels[key]) return;
				ctx.beginPath();
				image.pixels[key].forEach((px: any) => {
					const x = this.getX(image.dimensions, px);
					const y = this.getY(image.dimensions, px);
					ctx.fillStyle = key === "obstacle" ? "#6B7174" : this.colors.newmap ? ORG_COLORS[5] : this.colors.floor;
					ctx.rect(x, y, VISUAL_BLOCK_SIZE, VISUAL_BLOCK_SIZE);
					maxtop = Math.max(maxtop, y);
					maxleft = Math.max(maxleft, x);
					minleft = Math.min(minleft, x);
					mintop = Math.min(mintop, y);
				});
				ctx.fill();
			});
		}
		return { minleft, mintop, maxleft, maxtop };
	}

	private drawSegments(ctx: ExtendedContext2D, image: any, currentlyCleanedBlocks: number[]) {
		const segmentsData: Record<number, any> = {};
		if (image.pixels.segments && this.colors.newmap) {
			image.pixels.segments.forEach((px: any) => {
				const segnum = px >> 21;
				const pixelIndex = px & 0x1fffff;
				if (segnum >= MAX_BLOCK_NUM) return;
				const x = this.getX(image.dimensions, pixelIndex);
				const y = this.getY(image.dimensions, pixelIndex);
				if (!segmentsData[segnum]) segmentsData[segnum] = { points: [], minX: x, maxX: x, minY: y, maxY: y };
				const segment = segmentsData[segnum];
				segment.points.push({ x, y });
				segment.minX = Math.min(segment.minX, x);
				segment.maxX = Math.max(segment.maxX, x);
				segment.minY = Math.min(segment.minY, y);
				segment.maxY = Math.max(segment.maxY, y);
			});

			const segmentNums = Object.keys(segmentsData).map(Number);
			const maxId = segmentNums.length ? Math.max(...segmentNums) : 0;
			const matrixSize = MAX_BLOCK_NUM;
			const adjacencyMatrix = this.buildAdjacencyMatrix(image.pixels.segments, image.dimensions.width, image.dimensions.height, maxId);
			const pointsCount = new Array(matrixSize).fill(0);
			for (const segStr of Object.keys(segmentsData)) {
				const seg = Number(segStr);
				if (seg >= 0 && seg < matrixSize) pointsCount[seg] = segmentsData[seg].points.length;
			}
			const neighborInfo = new Array(matrixSize * matrixSize).fill(0);
			for (let i = 0; i < matrixSize; i++) {
				for (let j = 0; j < matrixSize; j++) {
					if (adjacencyMatrix[i]?.[j] === 1) neighborInfo[i * matrixSize + j] = 1;
				}
				if (pointsCount[i] > 0) neighborInfo[i * matrixSize + i] = 1;
			}
			const coloring = assignRoborockRoomColorsToHex({ maxBlockNum: matrixSize, neighborInfo, pointsCount }, { oneBased: true });

			Object.keys(segmentsData).forEach((segStr) => {
				const segnum = Number(segStr);
				if (segnum < 0 || segnum >= matrixSize) return;
				const isCurrentlyCleaned = currentlyCleanedBlocks?.includes(segnum);
				let fillColor = coloring.colorHex?.[segnum] || "#CCCCCC";
				if (isCurrentlyCleaned) fillColor = segnum >= 0 && segnum < ORG_COLORS.length ? ORG_COLORS[segnum] : "#AA0000";
				ctx.fillStyle = fillColor;
				ctx.beginPath();
				segmentsData[segnum].points.forEach((p: any) => {
					ctx.rect(p.x, p.y, VISUAL_BLOCK_SIZE, VISUAL_BLOCK_SIZE);
				});
				ctx.fill();
			});
		} else if (image.pixels.segments) {
			let segnum: number, lastcolor: number | undefined;
			ctx.beginPath();
			image.pixels.segments.forEach((px: any) => {
				segnum = px >> 21;
				if (currentlyCleanedBlocks?.includes(segnum)) {
					if (segnum !== lastcolor) {
						ctx.fill();
						ctx.beginPath();
						ctx.fillStyle = segnum >= 0 && segnum < ORG_COLORS.length ? ORG_COLORS[segnum] : "#CCCCCC";
						lastcolor = segnum;
					}
					px = px & 0xfffff;
					ctx.rect(this.getX(image.dimensions, px), this.getY(image.dimensions, px), VISUAL_BLOCK_SIZE, VISUAL_BLOCK_SIZE);
				}
			});
			ctx.fill();
		}
		return segmentsData;
	}

	private getCleanMapBase64(canvas: Canvas) {
		const cleanCanvas = createCanvas(canvas.width, canvas.height);
		const ctx = cleanCanvas.getContext("2d") as unknown as ExtendedContext2D;
		ctx.drawImage(canvas, 0, 0);
		return cleanCanvas.toDataURL();
	}

	private drawCarpet(ctx: ExtendedContext2D, carpetMap: any, image: any) {
		if (carpetMap && image.dimensions.width > 0) {
			ctx.imageSmoothingEnabled = false;
			if ("antialias" in ctx) ctx.antialias = "none";

			const carpetSprite = this.createCarpetSprite();

			carpetMap.forEach((px: any) => {
				const x_pos = this.getX(image.dimensions, px);
				const y_pos = this.getY(image.dimensions, px);
				ctx.drawImage(carpetSprite, x_pos, y_pos);
			});
		}
	}

	private drawPaths(ctx: ExtendedContext2D, mapdata: any) {
		const robotToScaledPixel = (robotCoord: [number, number], img: any): PathPoint => {
			return {
				x: this.robotXtoCanvasX(img, robotCoord[0] / 50),
				y: this.robotYtoCanvasY(img, robotCoord[1] / 50),
			};
		};

		const pathSegments: PathResult = (mapdata.PATH?.points && mapdata.MOP_PATH)
			? processPaths(mapdata.PATH.points, mapdata.MOP_PATH, robotToScaledPixel, VISUAL_BLOCK_SIZE, mapdata.IMAGE)
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

		const tempCanvas = createCanvas(ctx.canvas.width, ctx.canvas.height);
		const tempCtx = tempCanvas.getContext("2d");

		this.drawPathSegments(ctx, tempCtx, pathSegments.mopPath, "rgba(255, 255, 255, 1)", 6.5 * VISUAL_BLOCK_SIZE, 0.18);
		this.drawPathSegments(ctx, tempCtx, pathSegments.mainPath, LEGACY_COLORS.path, lwMain, 1.0);
	}

	private drawActiveZones(ctx: ExtendedContext2D, zones: any, image: any) {
		if (zones?.[0]) {
			zones.forEach((coord: any) => {
				const x = this.robotXtoCanvasX(image, coord[0] / 50);
				const y = this.robotYtoCanvasY(image, coord[1] / 50);
				const w = this.robotXtoCanvasX(image, coord[2] / 50) - x;
				const h = this.robotYtoCanvasY(image, coord[3] / 50) - y;
				ctx.fillStyle = "rgba(46,139,87,0.1)";
				ctx.fillRect(x, y, w, h);
				ctx.strokeStyle = "#2e8b57";
				ctx.lineWidth = 4;
				ctx.strokeRect(x, y, w, h);
			});
		}
	}

	private drawPredictedPath(ctx: ExtendedContext2D, predictedPath: any, image: any) {
		if (predictedPath?.points?.length) {
			ctx.lineWidth = (3 * VISUAL_BLOCK_SIZE) / 2;
			ctx.strokeStyle = "rgba(255, 255, 255, 1)";
			ctx.setLineDash([3 * VISUAL_BLOCK_SIZE, 3 * VISUAL_BLOCK_SIZE]);
			ctx.lineCap = "round";
			ctx.beginPath();
			let lastX = -1,
				lastY = -1;
			predictedPath.points.forEach((coord: any, index: number) => {
				const x = this.robotXtoCanvasX(image, coord[0] / 50);
				const y = this.robotYtoCanvasY(image, coord[1] / 50);
				if (index === 0) {
					ctx.fillStyle = "rgba(255, 255, 255, 1)";
					ctx.fillRect(x, y, (1 * VISUAL_BLOCK_SIZE) / 2, (1 * VISUAL_BLOCK_SIZE) / 2);
					ctx.moveTo(x, y);
				} else if (x !== lastX || y !== lastY) {
					ctx.lineTo(x, y);
				}
				lastX = x;
				lastY = y;
			});
			ctx.stroke();
			ctx.setLineDash([]);
			ctx.lineCap = "butt";
		}
	}

	private async findObstacleImage(suffix: string, model?: string): Promise<string | null> {
		const assetModels = [model, "roborock.vacuum.a147"].filter((m): m is string => !!m);
		const fileName = `projects_comroborocktanos_resources_obstacle_new_p${suffix}.png`;

		for (const m of assetModels) {
			const potentialPaths = [
				// Standard path
				path.join(this.adapter.adapterDir, "www", "assets", m, "drawable-mdpi", fileName),
				// Absolute path fallback (if adapterDir is pointing to build/ but assets are in root)
				path.join(this.adapter.adapterDir, "..", "www", "assets", m, "drawable-mdpi", fileName),
				// User's reported build path
				path.join(this.adapter.adapterDir, "build", "lib", "www", "images", fileName),
				// Fallback to images dir if it exists
				path.join(this.adapter.adapterDir, "www", "images", fileName),
			];

			for (const imagePath of potentialPaths) {
				if (fs.existsSync(imagePath)) {
					return imagePath;
				}
			}
		}
		return null;
	}

	private async drawObstacles(ctx: ExtendedContext2D, obstacles: any, image: any, model?: string) {
		const OBSTACLE_MAPPING: Record<number, string> = {
			"-99": "99",
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
			51: "51",
			54: "54",
			65: "65",
			67: "67",
			69: "69",
			70: "70",
			99: "99",
		};

		if (obstacles) {
			for (const obstacle of obstacles) {
				const type = obstacle[2];
				const x = this.robotXtoCanvasX(image, obstacle[0] / 50) + VISUAL_BLOCK_SIZE / 2;
				const y = this.robotYtoCanvasY(image, obstacle[1] / 50) + VISUAL_BLOCK_SIZE / 2;

				const suffix = OBSTACLE_MAPPING[type] || "18";
				const imagePath = await this.findObstacleImage(suffix, model);

				if (!imagePath) {
					this.adapter.rLog("MapManager", model || null, "Warn", undefined, undefined, `Could not find obstacle image for type ${type} (mapped to ${suffix}) in any search path.`, "warn");
				}

				// Draw background circle (Grey with white border)
				const radius = VISUAL_BLOCK_SIZE * 3.5;
				ctx.beginPath();
				ctx.arc(x, y, radius, 0, 2 * Math.PI);
				ctx.fillStyle = "rgba(100, 100, 100, 0.2)";
				ctx.fill();
				ctx.lineWidth = 0.5;
				ctx.strokeStyle = "white";
				ctx.stroke();

				if (imagePath) {
					try {
						const obstacleImg = await loadImage(imagePath);
						const size = VISUAL_BLOCK_SIZE * 5;
						ctx.drawImage(obstacleImg, x - size / 2, y - size / 2, size, size);
					} catch (e: any) {
						this.adapter.rLog("MapManager", model || null, "Error", undefined, undefined, `Failed to load image ${imagePath}: ${e.message}`, "error");
					}
				}
			}
		}
	}

	private drawRobotChargerTarget(ctx: ExtendedContext2D, mapdata: any, imgRobot: Image, imgCharger: Image, imgGoToPin: Image) {
		if (mapdata.CHARGER_LOCATION) {
			const pos = mapdata.CHARGER_LOCATION.position;
			if (pos?.[0] && pos?.[1]) {
				const x = this.robotXtoCanvasX(mapdata.IMAGE, pos[0] / 50);
				const y = this.robotYtoCanvasY(mapdata.IMAGE, pos[1] / 50);
				const w = VISUAL_BLOCK_SIZE * 3;
				const h = VISUAL_BLOCK_SIZE * 3;
				ctx.drawImage(imgCharger, x - w / 2, y - h / 2, w, h);
			}
		}

		if (mapdata.ROBOT_POSITION) {
			const pos = mapdata.ROBOT_POSITION.position;
			const angle = mapdata.ROBOT_POSITION.angle ?? 0;
			const drawAngle = -angle + 90;

			if (pos?.[0] && pos?.[1]) {
				const x = this.robotXtoCanvasX(mapdata.IMAGE, pos[0] / 50);
				const y = this.robotYtoCanvasY(mapdata.IMAGE, pos[1] / 50);
				const robotSize = VISUAL_BLOCK_SIZE * 5;

				ctx.save();
				ctx.translate(x, y);
				ctx.rotate((drawAngle * Math.PI) / 180);
				ctx.drawImage(imgRobot, -robotSize / 2, -robotSize / 2, robotSize, robotSize);
				ctx.restore();
			}
		}

		if (mapdata.GOTO_TARGET?.[0] && mapdata.GOTO_TARGET?.[1]) {
			const pinW = VISUAL_BLOCK_SIZE * 3;
			const pinH = (pinW / 29) * 24;
			ctx.drawImage(
				imgGoToPin,
				this.robotXtoCanvasX(mapdata.IMAGE, mapdata.GOTO_TARGET[0] / 50) - pinW / 2,
				this.robotYtoCanvasY(mapdata.IMAGE, mapdata.GOTO_TARGET[1] / 50) - (pinH + VISUAL_BLOCK_SIZE / 2),
				pinW,
				pinH
			);
		}
	}

	private drawRoomNames(ctx: ExtendedContext2D, segmentsData: any, mappedRooms: any) {
		if (segmentsData && mappedRooms) {
			const roomIDsAll = this.adapter.http_api.getMatchedRoomIDs(false);
			Object.keys(segmentsData).forEach((segnumStr) => {
				const segnum = parseInt(segnumStr);
				if (segnum === 0) return;
				const mapping = mappedRooms.find(([id]: [string]) => parseInt(id) === segnum);
				let roomName = "";
				if (mapping) {
					const roomID = mapping[1];
					const roomObj = roomIDsAll.find((r) => String(r.id) === String(roomID));
					roomName = roomObj?.name || "";
				}
				if (roomName) {
					const segment = segmentsData[segnum];
					const centerX = segment.minX + (segment.maxX - segment.minX) / 2;
					const centerY = segment.minY + (segment.maxY - segment.minY) / 2;
					ctx.font = `bold ${VISUAL_BLOCK_SIZE * 6}px Arial`;
					ctx.textAlign = "center";
					ctx.textBaseline = "middle";
					ctx.lineWidth = 1;
					ctx.strokeStyle = "white";
					ctx.strokeText(roomName, centerX, centerY);
					ctx.fillStyle = "black";
					ctx.fillText(roomName, centerX, centerY);
				}
			});
		}
	}

	private cropMap(canvas: Canvas, ctx: ExtendedContext2D, bounds: { minleft: number; mintop: number; maxleft: number; maxtop: number }) {
		const { minleft, mintop, maxleft, maxtop } = bounds;
		const cropW = maxleft - minleft + 2 * OFFSET;
		const cropH = maxtop - mintop + 2 * OFFSET;

		if (cropW <= 0 || cropH <= 0 || !isFinite(cropW) || !isFinite(cropH)) {
			return canvas.toDataURL();
		}

		const sx = Math.max(0, minleft - OFFSET);
		const sy = Math.max(0, mintop - OFFSET);
		const maxWidth = canvas.width - sx;
		const maxHeight = canvas.height - sy;
		const finalCropW = Math.min(cropW, maxWidth);
		const finalCropH = Math.min(cropH, maxHeight);

		const canvasTrimmedFull = createCanvas(finalCropW, finalCropH);
		const ctxTrimmedFull = canvasTrimmedFull.getContext("2d");
		const trimmedDataFull = ctx.getImageData(sx, sy, finalCropW, finalCropH);
		ctxTrimmedFull.putImageData(trimmedDataFull, 0, 0);

		return canvasTrimmedFull.toDataURL();
	}

	private drawRestrictedAreas(ctx: ExtendedContext2D, mapdata: any) {
		const drawRectArea = (zones: number[][], fill: string, stroke: string) => {
			if (!zones) return;
			zones.forEach((zone) => {
				const x1 = this.robotXtoCanvasX(mapdata.IMAGE, Math.min(zone[0], zone[2], zone[4], zone[6]) / 50);
				const y1 = this.robotYtoCanvasY(mapdata.IMAGE, Math.max(zone[1], zone[3], zone[5], zone[7]) / 50);
				const x2 = this.robotXtoCanvasX(mapdata.IMAGE, Math.max(zone[0], zone[2], zone[4], zone[6]) / 50);
				const y2 = this.robotYtoCanvasY(mapdata.IMAGE, Math.min(zone[1], zone[3], zone[5], zone[7]) / 50);
				const minX = Math.min(x1, x2);
				const minY = Math.min(y1, y2);
				const maxX = Math.max(x1, x2);
				const maxY = Math.max(y1, y2);
				ctx.fillStyle = fill;
				ctx.fillRect(minX, minY, maxX - minX, maxY - minY);
				ctx.strokeStyle = stroke;
				ctx.lineWidth = (1 * VISUAL_BLOCK_SIZE) / 2;
				ctx.strokeRect(minX, minY, maxX - minX, maxY - minY);
			});
		};
		drawRectArea(mapdata.FORBIDDEN_ZONES, "rgba(255, 0, 0, 0.5)", "rgba(255, 0, 0, 1)");
		drawRectArea(mapdata.NO_MOP_ZONE, "rgba(0, 0, 255, 0.5)", "rgba(0, 0, 255, 1)");
		if (mapdata.VIRTUAL_WALLS) {
			ctx.strokeStyle = "rgba(255, 0, 0, 1)";
			ctx.lineWidth = 1 * VISUAL_BLOCK_SIZE;
			ctx.beginPath();
			mapdata.VIRTUAL_WALLS.forEach((wall: any) => {
				ctx.moveTo(this.robotXtoCanvasX(mapdata.IMAGE, wall[0] / 50), this.robotYtoCanvasY(mapdata.IMAGE, wall[1] / 50));
				ctx.lineTo(this.robotXtoCanvasX(mapdata.IMAGE, wall[2] / 50), this.robotYtoCanvasY(mapdata.IMAGE, wall[3] / 50));
			});
			ctx.stroke();
		}
	}
}
