"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapCreator = void 0;
const canvas_1 = require("@napi-rs/canvas");
const roomColoring_1 = require("./roomColoring");
const Images = __importStar(require("./images"));
const pathProcessor_js_1 = require("./pathProcessor.js");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
// -----------------------------------------------------------------------------
// Constants & Interfaces
// -----------------------------------------------------------------------------
const OFFSET = 60;
const MAX_BLOCK_NUM = 32;
const VISUAL_BLOCK_SIZE = 3; // Replaces fixed map_scale with 3
const ORG_COLORS = ["#C05A41", "#4579B5", "#017E82", "#BD7B00", "#434242", "#dfdfdf"];
const LEGACY_COLORS = {
    floor: "#23465e",
    obstacle: "#2b2e30",
    path: "#FFFFFF",
};
// -----------------------------------------------------------------------------
// Map Creator Class
// -----------------------------------------------------------------------------
class MapCreator {
    adapter;
    colors;
    constructor(adapter) {
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
    getX(dimensions, px) {
        return (px * VISUAL_BLOCK_SIZE) % dimensions.width;
    }
    getY(dimensions, px) {
        return dimensions.height - Math.floor(px / (dimensions.width / VISUAL_BLOCK_SIZE)) * VISUAL_BLOCK_SIZE - VISUAL_BLOCK_SIZE;
    }
    robotXtoCanvasX(image, robotCoord) {
        return (robotCoord - image.position.left) * VISUAL_BLOCK_SIZE;
    }
    robotYtoCanvasY(image, robotCoord) {
        return (image.dimensions.height / VISUAL_BLOCK_SIZE + image.position.top - robotCoord) * VISUAL_BLOCK_SIZE;
    }
    // --------------------
    // Drawing Helpers
    // --------------------
    /**
     * Creates a pre-rendered sprite for a single carpet tile.
     * Logic matches renderCarpetTest.js exactly.
     */
    createCarpetSprite() {
        // Create a tiny canvas just for one tile (3x3)
        const spriteCanvas = (0, canvas_1.createCanvas)(VISUAL_BLOCK_SIZE, VISUAL_BLOCK_SIZE);
        const ctx = spriteCanvas.getContext("2d");
        // Disable AA for the sprite generation too
        ctx.imageSmoothingEnabled = false;
        if ("antialias" in ctx)
            ctx.antialias = "none";
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
    buildAdjacencyMatrix(segmentPixels, width, height, maxIdFromCaller) {
        let maxSegInPixels = 0;
        for (const px of segmentPixels) {
            const segnum = px >>> 21;
            if (segnum > maxSegInPixels)
                maxSegInPixels = segnum;
        }
        const size = Math.max(maxIdFromCaller + 1, maxSegInPixels + 1, MAX_BLOCK_NUM);
        const matrix = Array.from({ length: size }, () => Array(size).fill(0));
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
            if (segA < 0)
                continue;
            const x = i % width;
            const y = Math.floor(i / width);
            if (segA < size)
                matrix[segA][segA] = 1;
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
    drawPathSegments(mainCtx, tempCtx, pathSegments, color, width, opacity, dashed = false) {
        if (!pathSegments || pathSegments.length === 0)
            return;
        const offsetX = 4;
        const offsetY = -4;
        const w = tempCtx.canvas.width;
        const h = tempCtx.canvas.height;
        tempCtx.clearRect(0, 0, w, h);
        tempCtx.strokeStyle = color;
        tempCtx.lineWidth = width;
        tempCtx.lineCap = "round";
        tempCtx.lineJoin = "round";
        if (dashed) {
            tempCtx.setLineDash([VISUAL_BLOCK_SIZE, 2 * VISUAL_BLOCK_SIZE]);
        }
        else {
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
        mainCtx.drawImage(tempCtx.canvas, 0, 0);
        mainCtx.restore();
    }
    // --------------------
    // Main Map Generation
    // --------------------
    async canvasMap(mapdata, params = {}) {
        const { mappedRooms = null, options = {} } = params;
        if (!mapdata || !mapdata.IMAGE || !mapdata.IMAGE.dimensions) {
            this.adapter.log.warn(`[MapCreator] Received invalid or empty map data, cannot generate map.`);
            const errorCanvas = (0, canvas_1.createCanvas)(1, 1).toDataURL();
            return [errorCanvas, errorCanvas, errorCanvas];
        }
        this.applyOptions(options);
        const [imgRobot, imgCharger, imgGoToPin] = await this.loadImages(options.ROBOT);
        // Use VISUAL_BLOCK_SIZE for scaling logic
        mapdata.IMAGE.dimensions.width *= VISUAL_BLOCK_SIZE;
        mapdata.IMAGE.dimensions.height *= VISUAL_BLOCK_SIZE;
        const canvas = (0, canvas_1.createCanvas)(mapdata.IMAGE.dimensions.width, mapdata.IMAGE.dimensions.height);
        const ctx = canvas.getContext("2d");
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
        await this.drawObstacles(ctx, mapdata.OBSTACLES2, mapdata.IMAGE);
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
    applyOptions(options) {
        if (options) {
            if (options.FLOORCOLOR)
                this.colors.floor = options.FLOORCOLOR;
            if (options.WALLCOLOR)
                this.colors.obstacle = options.WALLCOLOR;
            if (options.PATHCOLOR)
                this.colors.path = options.PATHCOLOR;
            this.colors.newmap = options.newmap ?? true;
        }
    }
    async loadImages(robotType) {
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
        return Promise.all([(0, canvas_1.loadImage)(robotImgSource), (0, canvas_1.loadImage)(Images.IMG_CHARGER), (0, canvas_1.loadImage)(Images.IMG_GO_TO_PIN)]);
    }
    drawFloorAndWalls(ctx, image) {
        let maxtop = 0, maxleft = 0, minleft = image.dimensions.width, mintop = image.dimensions.height;
        if (image.pixels.floor && image.pixels.floor.length > 0) {
            if (typeof image.pixels.floor[0] === "number") {
                minleft = image.pixels.floor[0] % image.dimensions.width;
                mintop = image.dimensions.height - 1 - Math.floor(image.pixels.floor[0] / image.dimensions.width);
            }
            ["floor", "obstacle"].forEach((key) => {
                if (!image.pixels[key])
                    return;
                ctx.beginPath();
                image.pixels[key].forEach((px) => {
                    const x = this.getX(image.dimensions, px);
                    const y = this.getY(image.dimensions, px);
                    ctx.fillStyle = key === "obstacle" ? (this.colors.newmap ? ORG_COLORS[4] : this.colors.obstacle) : this.colors.newmap ? ORG_COLORS[5] : this.colors.floor;
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
    drawSegments(ctx, image, currentlyCleanedBlocks) {
        const segmentsData = {};
        if (image.pixels.segments && this.colors.newmap) {
            image.pixels.segments.forEach((px) => {
                const segnum = px >> 21;
                const pixelIndex = px & 0x1fffff;
                if (segnum >= MAX_BLOCK_NUM)
                    return;
                const x = this.getX(image.dimensions, pixelIndex);
                const y = this.getY(image.dimensions, pixelIndex);
                if (!segmentsData[segnum])
                    segmentsData[segnum] = { points: [], minX: x, maxX: x, minY: y, maxY: y };
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
                if (seg >= 0 && seg < matrixSize)
                    pointsCount[seg] = segmentsData[seg].points.length;
            }
            const neighborInfo = new Array(matrixSize * matrixSize).fill(0);
            for (let i = 0; i < matrixSize; i++) {
                for (let j = 0; j < matrixSize; j++) {
                    if (adjacencyMatrix[i]?.[j] === 1)
                        neighborInfo[i * matrixSize + j] = 1;
                }
                if (pointsCount[i] > 0)
                    neighborInfo[i * matrixSize + i] = 1;
            }
            const coloring = (0, roomColoring_1.assignRoborockRoomColorsToHex)({ maxBlockNum: matrixSize, neighborInfo, pointsCount }, { oneBased: true });
            Object.keys(segmentsData).forEach((segStr) => {
                const segnum = Number(segStr);
                if (segnum < 0 || segnum >= matrixSize)
                    return;
                const isCurrentlyCleaned = currentlyCleanedBlocks?.includes(segnum);
                let fillColor = coloring.colorHex?.[segnum] || "#CCCCCC";
                if (isCurrentlyCleaned)
                    fillColor = segnum >= 0 && segnum < ORG_COLORS.length ? ORG_COLORS[segnum] : "#AA0000";
                ctx.fillStyle = fillColor;
                ctx.beginPath();
                segmentsData[segnum].points.forEach((p) => {
                    ctx.rect(p.x, p.y, VISUAL_BLOCK_SIZE, VISUAL_BLOCK_SIZE);
                });
                ctx.fill();
            });
        }
        else if (image.pixels.segments) {
            let segnum, lastcolor;
            ctx.beginPath();
            image.pixels.segments.forEach((px) => {
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
    getCleanMapBase64(canvas) {
        const cleanCanvas = (0, canvas_1.createCanvas)(canvas.width, canvas.height);
        const ctx = cleanCanvas.getContext("2d");
        ctx.drawImage(canvas, 0, 0);
        return cleanCanvas.toDataURL();
    }
    drawCarpet(ctx, carpetMap, image) {
        if (carpetMap && image.dimensions.width > 0) {
            ctx.imageSmoothingEnabled = false;
            if ("antialias" in ctx)
                ctx.antialias = "none";
            const carpetSprite = this.createCarpetSprite();
            carpetMap.forEach((px) => {
                const x_pos = this.getX(image.dimensions, px);
                const y_pos = this.getY(image.dimensions, px);
                ctx.drawImage(carpetSprite, x_pos, y_pos);
            });
        }
    }
    drawPaths(ctx, mapdata) {
        const robotToScaledPixel = (robotCoord, img) => {
            return {
                x: this.robotXtoCanvasX(img, robotCoord[0] / 50),
                y: this.robotYtoCanvasY(img, robotCoord[1] / 50),
            };
        };
        const pathSegments = (mapdata.PATH?.points && mapdata.MOP_PATH)
            ? (0, pathProcessor_js_1.processPaths)(mapdata.PATH.points, mapdata.MOP_PATH, robotToScaledPixel, VISUAL_BLOCK_SIZE, mapdata.IMAGE)
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
        const tempCanvas = (0, canvas_1.createCanvas)(ctx.canvas.width, ctx.canvas.height);
        const tempCtx = tempCanvas.getContext("2d");
        this.drawPathSegments(ctx, tempCtx, pathSegments.mainPath, LEGACY_COLORS.path, lwMain, 0.5);
    }
    drawActiveZones(ctx, zones, image) {
        if (zones?.[0]) {
            zones.forEach((coord) => {
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
    drawPredictedPath(ctx, predictedPath, image) {
        if (predictedPath?.points?.length) {
            ctx.lineWidth = (3 * VISUAL_BLOCK_SIZE) / 2;
            ctx.strokeStyle = "rgba(255, 255, 255, 1)";
            ctx.setLineDash([3 * VISUAL_BLOCK_SIZE, 3 * VISUAL_BLOCK_SIZE]);
            ctx.lineCap = "round";
            ctx.beginPath();
            let lastX = -1, lastY = -1;
            predictedPath.points.forEach((coord, index) => {
                const x = this.robotXtoCanvasX(image, coord[0] / 50);
                const y = this.robotYtoCanvasY(image, coord[1] / 50);
                if (index === 0) {
                    ctx.fillStyle = "rgba(255, 255, 255, 1)";
                    ctx.fillRect(x, y, (1 * VISUAL_BLOCK_SIZE) / 2, (1 * VISUAL_BLOCK_SIZE) / 2);
                    ctx.moveTo(x, y);
                }
                else if (x !== lastX || y !== lastY) {
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
    async drawObstacles(ctx, obstacles, image) {
        const OBSTACLE_MAPPING = {
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
            50: "50",
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
                const imagePath = path.join(__dirname, `../../www/images/projects_comroborocktanos_resources_obstacle_new_p${suffix}.png`);
                if (!fs.existsSync(imagePath)) {
                    this.adapter.log.warn(`[MapCreator] Could not find obstacle image for type ${type} (mapped to ${suffix}). Path: ${imagePath}`);
                }
                // Draw background circle (Grey with white border)
                const radius = VISUAL_BLOCK_SIZE * 3.5; // Reduced radius
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, 2 * Math.PI);
                ctx.fillStyle = "rgba(100, 100, 100, 0.2)"; // Grey, more transparent
                ctx.fill();
                ctx.lineWidth = 0.5; // Thinner border
                ctx.strokeStyle = "white";
                ctx.stroke();
                if (fs.existsSync(imagePath)) {
                    try {
                        const obstacleImg = await (0, canvas_1.loadImage)(imagePath);
                        const size = VISUAL_BLOCK_SIZE * 5; // Reduced icon size
                        ctx.drawImage(obstacleImg, x - size / 2, y - size / 2, size, size);
                    }
                    catch (e) {
                        this.adapter.log.error(`[MapCreator] Failed to load image ${imagePath}: ${e}`);
                    }
                }
            }
        }
    }
    drawRobotChargerTarget(ctx, mapdata, imgRobot, imgCharger, imgGoToPin) {
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
            ctx.drawImage(imgGoToPin, this.robotXtoCanvasX(mapdata.IMAGE, mapdata.GOTO_TARGET[0] / 50) - pinW / 2, this.robotYtoCanvasY(mapdata.IMAGE, mapdata.GOTO_TARGET[1] / 50) - (pinH + VISUAL_BLOCK_SIZE / 2), pinW, pinH);
        }
    }
    drawRoomNames(ctx, segmentsData, mappedRooms) {
        if (segmentsData && mappedRooms) {
            const roomIDsAll = this.adapter.http_api.getMatchedRoomIDs(false);
            Object.keys(segmentsData).forEach((segnumStr) => {
                const segnum = parseInt(segnumStr);
                if (segnum === 0)
                    return;
                const mapping = mappedRooms.find(([id]) => parseInt(id) === segnum);
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
    cropMap(canvas, ctx, bounds) {
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
        const canvasTrimmedFull = (0, canvas_1.createCanvas)(finalCropW, finalCropH);
        const ctxTrimmedFull = canvasTrimmedFull.getContext("2d");
        const trimmedDataFull = ctx.getImageData(sx, sy, finalCropW, finalCropH);
        ctxTrimmedFull.putImageData(trimmedDataFull, 0, 0);
        return canvasTrimmedFull.toDataURL();
    }
    drawRestrictedAreas(ctx, mapdata) {
        const drawRectArea = (zones, fill, stroke) => {
            if (!zones)
                return;
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
            mapdata.VIRTUAL_WALLS.forEach((wall) => {
                ctx.moveTo(this.robotXtoCanvasX(mapdata.IMAGE, wall[0] / 50), this.robotYtoCanvasY(mapdata.IMAGE, wall[1] / 50));
                ctx.lineTo(this.robotXtoCanvasX(mapdata.IMAGE, wall[2] / 50), this.robotYtoCanvasY(mapdata.IMAGE, wall[3] / 50));
            });
            ctx.stroke();
        }
    }
}
exports.MapCreator = MapCreator;
//# sourceMappingURL=mapCreator.js.map