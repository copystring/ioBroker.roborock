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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapCreator = void 0;
const canvas_1 = require("@napi-rs/canvas");
// Use the new simplified room coloring
const roomColoring_1 = require("./roomColoring");
// Import all images from your new file
const Images = __importStar(require("./images"));
// --------------------
// Constants & Config
// --------------------
const OFFSET = 60;
const MAX_BLOCK_NUM = 32;
// Colors for "newmap = true" (Roborock App Style)
const ORG_COLORS = [
    "#C05A41", // 0
    "#4579B5", // 1
    "#017E82", // 2
    "#BD7B00", // 3
    "#434242", // 4 wall
    "#dfdfdf", // 5 deselected floor
];
// Colors for "newmap = false" (Legacy Style)
const LEGACY_COLORS = {
    floor: "#23465e",
    obstacle: "#2b2e30",
    path: "rgba(255,255,255,0.5)",
};
const OBSTACLE_TITLES = {
    0: "Wire",
    1: "Pet waste",
    2: "Footwear",
    3: "Pedestal",
    4: "Pedestal",
    5: "Power strip",
    9: "Scale",
    10: "Fabric",
    18: "Dustpan",
    25: "Dustpan",
    26: "Bar",
    27: "Bar",
};
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
        return (px * this.adapter.config.map_scale) % dimensions.width;
    }
    getY(dimensions, px) {
        return dimensions.height - Math.floor(px / (dimensions.width / this.adapter.config.map_scale)) * this.adapter.config.map_scale - this.adapter.config.map_scale;
    }
    robotXtoPixelX(image, robotCoord) {
        return (robotCoord - image.position.left) * this.adapter.config.map_scale + 1;
    }
    robotYtoPixelY(image, robotCoord) {
        return (image.dimensions.height / this.adapter.config.map_scale + image.position.top - robotCoord) * this.adapter.config.map_scale - 1;
    }
    // --------------------
    // Drawing Helpers
    // --------------------
    rotateCanvas(img, angleInDegrees) {
        const canvas = (0, canvas_1.createCanvas)(img.width, img.height);
        const ctx = canvas.getContext("2d");
        const angleOffset = 90;
        let angleInRadians = ((angleInDegrees - angleOffset) * Math.PI) / 180;
        angleInRadians = ((angleInRadians + Math.PI) % (2 * Math.PI)) - Math.PI;
        ctx.translate(img.width / 2, img.height / 2);
        ctx.rotate(-angleInRadians);
        ctx.translate(-img.width / 2, -img.height / 2);
        ctx.drawImage(img, 0, 0);
        return canvas;
    }
    drawLineBresenham(imageData, x1, y1, x2, y2) {
        const pixels = imageData.data;
        const dx = Math.abs(x2 - x1);
        const dy = Math.abs(y2 - y1);
        const sx = x1 < x2 ? 1 : -1;
        const sy = y1 < y2 ? 1 : -1;
        let err = dx - dy;
        while (true) {
            if (x1 >= 0 && x1 < imageData.width && y1 >= 0 && y1 < imageData.height) {
                const index = (x1 + y1 * imageData.width) * 4;
                pixels[index] = 128; // r
                pixels[index + 1] = 128; // g
                pixels[index + 2] = 128; // b
                pixels[index + 3] = 128; // a (semi-transparent gray)
            }
            if (x1 === x2 && y1 === y2)
                break;
            const e2 = 2 * err;
            if (e2 > -dy) {
                err -= dy;
                x1 += sx;
            }
            if (e2 < dx) {
                err += dx;
                y1 += sy;
            }
        }
    }
    /**
     * Builds the adjacency matrix for room coloring.
     */
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
            if (segA < size) {
                matrix[segA][segA] = 1; // Mark segment as existing
            }
            // Check top neighbor
            if (y > 0) {
                const segB = segMap[i - width];
                if (segB >= 0 && segA !== segB && segA < size && segB < size) {
                    matrix[segA][segB] = 1;
                    matrix[segB][segA] = 1;
                }
            }
            // Check left neighbor
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
    // --------------------
    // Main Map Generation
    // --------------------
    async canvasMap(mapdata, params = {}) {
        const { selectedMap = null, mappedRooms = null, options = {} } = params;
        // --- CRASH GUARD ---
        if (!mapdata || !mapdata.IMAGE || !mapdata.IMAGE.dimensions) {
            this.adapter.log.warn(`[MapCreator] Received invalid or empty map data, cannot generate map.`);
            return [(0, canvas_1.createCanvas)(1, 1).toDataURL(), (0, canvas_1.createCanvas)(1, 1).toDataURL()];
        }
        // 1. Configure Colors & Images
        if (options) {
            if (options.FLOORCOLOR)
                this.colors.floor = options.FLOORCOLOR;
            if (options.WALLCOLOR)
                this.colors.obstacle = options.WALLCOLOR;
            if (options.PATHCOLOR)
                this.colors.path = options.PATHCOLOR;
            this.colors.newmap = options.newmap ?? true;
        }
        let robotImgSource = Images.IMG_ROBOT_ORIGINAL;
        switch (options.ROBOT) {
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
        const [imgRobot, imgCharger, imgGoToPin] = await Promise.all([(0, canvas_1.loadImage)(robotImgSource), (0, canvas_1.loadImage)(Images.IMG_CHARGER), (0, canvas_1.loadImage)(Images.IMG_GO_TO_PIN)]);
        // 2. Setup Dimensions
        mapdata.IMAGE.dimensions.width *= this.adapter.config.map_scale;
        mapdata.IMAGE.dimensions.height *= this.adapter.config.map_scale;
        const canvas = (0, canvas_1.createCanvas)(mapdata.IMAGE.dimensions.width, mapdata.IMAGE.dimensions.height);
        const ctx = canvas.getContext("2d");
        let maxtop = 0, maxleft = 0, minleft = mapdata.IMAGE.dimensions.width, mintop = mapdata.IMAGE.dimensions.height;
        // 3. Draw Base Floor & Walls
        if (mapdata.IMAGE.pixels.floor && mapdata.IMAGE.pixels.floor.length > 0) {
            if (typeof mapdata.IMAGE.pixels.floor[0] === "number") {
                minleft = mapdata.IMAGE.pixels.floor[0] % mapdata.IMAGE.dimensions.width;
                mintop = mapdata.IMAGE.dimensions.height - 1 - Math.floor(mapdata.IMAGE.pixels.floor[0] / mapdata.IMAGE.dimensions.width);
            }
            ["floor", "obstacle"].forEach((key) => {
                if (!mapdata.IMAGE.pixels[key])
                    return;
                ctx.beginPath();
                mapdata.IMAGE.pixels[key].forEach((px) => {
                    const x = this.getX(mapdata.IMAGE.dimensions, px);
                    const y = this.getY(mapdata.IMAGE.dimensions, px);
                    ctx.fillStyle = key === "obstacle" ? (this.colors.newmap ? ORG_COLORS[4] : this.colors.obstacle) : this.colors.newmap ? ORG_COLORS[5] : this.colors.floor;
                    ctx.rect(x, y, this.adapter.config.map_scale, this.adapter.config.map_scale);
                    maxtop = Math.max(maxtop, y);
                    maxleft = Math.max(maxleft, x);
                    minleft = Math.min(minleft, x);
                    mintop = Math.min(mintop, y);
                });
                ctx.fill();
            });
        }
        // 4. Draw Segments (Rooms)
        const segmentsData = {};
        if (mapdata.IMAGE.pixels.segments && this.colors.newmap) {
            // Step 4.1: Collect pixel data for each segment
            mapdata.IMAGE.pixels.segments.forEach((px) => {
                const segnum = px >> 21;
                const pixelIndex = px & 0x1fffff;
                if (segnum >= MAX_BLOCK_NUM)
                    return;
                const x = this.getX(mapdata.IMAGE.dimensions, pixelIndex);
                const y = this.getY(mapdata.IMAGE.dimensions, pixelIndex);
                if (!segmentsData[segnum]) {
                    segmentsData[segnum] = { points: [], minX: x, maxX: x, minY: y, maxY: y };
                }
                const segment = segmentsData[segnum];
                segment.points.push({ x, y });
                segment.minX = Math.min(segment.minX, x);
                segment.maxX = Math.max(segment.maxX, x);
                segment.minY = Math.min(segment.minY, y);
                segment.maxY = Math.max(segment.maxY, y);
            });
            // Step 4.2: Calculate room colors using the (now external) coloring algorithm
            const segmentNums = Object.keys(segmentsData).map(Number);
            const maxId = segmentNums.length ? Math.max(...segmentNums) : 0;
            const matrixSize = MAX_BLOCK_NUM;
            const adjacencyMatrix = this.buildAdjacencyMatrix(mapdata.IMAGE.pixels.segments, mapdata.IMAGE.dimensions.width, mapdata.IMAGE.dimensions.height, maxId);
            const pointsCount = new Array(matrixSize).fill(0);
            for (const segStr of Object.keys(segmentsData)) {
                const seg = Number(segStr);
                if (seg >= 0 && seg < matrixSize) {
                    pointsCount[seg] = segmentsData[seg].points.length;
                }
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
            // Use the new simplified 'assignRoborockRoomColorsToHex'
            const coloring = (0, roomColoring_1.assignRoborockRoomColorsToHex)({ maxBlockNum: matrixSize, neighborInfo, pointsCount }, { oneBased: true } // 'oneBased: true' assumes segment IDs start at 1 (0 is 'no segment')
            );
            // Step 4.3: Draw the segments with the calculated colors
            Object.keys(segmentsData).forEach((segStr) => {
                const segnum = Number(segStr);
                if (segnum < 0 || segnum >= matrixSize)
                    return;
                const isCurrentlyCleaned = mapdata.CURRENTLY_CLEANED_BLOCKS?.includes(segnum);
                let fillColor = coloring.colorHex?.[segnum] || "#CCCCCC";
                if (isCurrentlyCleaned) {
                    fillColor = segnum >= 0 && segnum < ORG_COLORS.length ? ORG_COLORS[segnum] : "#AA0000";
                }
                ctx.fillStyle = fillColor;
                ctx.beginPath();
                segmentsData[segnum].points.forEach((p) => {
                    ctx.rect(p.x, p.y, this.adapter.config.map_scale, this.adapter.config.map_scale);
                });
                ctx.fill();
            });
        }
        else if (mapdata.IMAGE.pixels.segments) {
            // Fallback for 'newmap = false' or if only actively cleaned blocks should be shown
            let segnum, lastcolor;
            ctx.beginPath();
            mapdata.IMAGE.pixels.segments.forEach((px) => {
                segnum = px >> 21;
                if (mapdata.CURRENTLY_CLEANED_BLOCKS?.includes(segnum)) {
                    if (segnum !== lastcolor) {
                        ctx.fill();
                        ctx.beginPath();
                        ctx.fillStyle = segnum >= 0 && segnum < ORG_COLORS.length ? ORG_COLORS[segnum] : "#CCCCCC";
                        lastcolor = segnum;
                    }
                    px = px & 0xfffff;
                    ctx.rect(this.getX(mapdata.IMAGE.dimensions, px), this.getY(mapdata.IMAGE.dimensions, px), this.adapter.config.map_scale, this.adapter.config.map_scale);
                }
            });
            ctx.fill();
        }
        // 5. Draw Carpet
        if (mapdata.CARPET_MAP) {
            // Guard against zero-dimension maps (e.g., new or uninitialized maps)
            if (mapdata.IMAGE.dimensions.width <= 0 || mapdata.IMAGE.dimensions.height <= 0) {
                this.adapter.log.debug("[MapCreator] Skipping carpet drawing, map dimensions are 0.");
            }
            else {
                const offset = 8 * this.adapter.config.map_scale;
                const imageData = ctx.getImageData(0, 0, mapdata.IMAGE.dimensions.width, mapdata.IMAGE.dimensions.height);
                mapdata.CARPET_MAP.forEach((px) => {
                    const x2 = this.getX(mapdata.IMAGE.dimensions, px) - offset;
                    const y1 = this.getY(mapdata.IMAGE.dimensions, px);
                    const x1 = x2 + this.adapter.config.map_scale - 1;
                    const y2 = y1 + this.adapter.config.map_scale - 1;
                    this.drawLineBresenham(imageData, x1, y1, x2, y2);
                });
                ctx.putImageData(imageData, 0, 0);
            }
        }
        // 6. Draw Active Zones
        if (mapdata.CURRENTLY_CLEANED_ZONES?.[0]) {
            mapdata.CURRENTLY_CLEANED_ZONES.forEach((coord) => {
                const x = this.robotXtoPixelX(mapdata.IMAGE, coord[0] / 50);
                const y = this.robotYtoPixelY(mapdata.IMAGE, coord[1] / 50);
                const w = this.robotXtoPixelX(mapdata.IMAGE, coord[2] / 50) - x;
                const h = this.robotYtoPixelY(mapdata.IMAGE, coord[3] / 50) - y;
                ctx.fillStyle = "rgba(46,139,87,0.1)";
                ctx.fillRect(x, y, w, h);
                ctx.strokeStyle = "#2e8b57";
                ctx.lineWidth = 4;
                ctx.strokeRect(x, y, w, h);
            });
        }
        // 7. Draw Paths (Mop & Standard)
        this.drawPaths(ctx, mapdata);
        // 8. Draw Predicted Path
        if (mapdata.GOTO_PREDICTED_PATH?.points?.length) {
            ctx.lineWidth = (3 * this.adapter.config.map_scale) / 2;
            ctx.strokeStyle = "rgba(255, 255, 255, 1)";
            ctx.setLineDash([3 * this.adapter.config.map_scale, 3 * this.adapter.config.map_scale]);
            ctx.lineCap = "round";
            ctx.beginPath();
            let lastX = -1, lastY = -1;
            mapdata.GOTO_PREDICTED_PATH.points.forEach((coord, index) => {
                const x = this.robotXtoPixelX(mapdata.IMAGE, coord[0] / 50);
                const y = this.robotYtoPixelY(mapdata.IMAGE, coord[1] / 50);
                if (index === 0) {
                    ctx.fillStyle = "rgba(255, 255, 255, 1)";
                    ctx.fillRect(x, y, (1 * this.adapter.config.map_scale) / 2, (1 * this.adapter.config.map_scale) / 2);
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
        // 9. Draw Forbidden Zones / Virtual Walls / No Mop Zones
        this.drawRestrictedAreas(ctx, mapdata);
        // 10. Draw Obstacles
        if (mapdata.OBSTACLES2) {
            mapdata.OBSTACLES2.forEach((obstacle) => {
                const type = obstacle[2];
                const title = OBSTACLE_TITLES[type] || "Unknown";
                const confidence = Math.round(obstacle[3] / 100);
                const text = title + (OBSTACLE_TITLES[type] ? `(${confidence}%)` : "");
                const x = this.robotXtoPixelX(mapdata.IMAGE, obstacle[0] / 50);
                const y = this.robotYtoPixelY(mapdata.IMAGE, obstacle[1] / 50);
                ctx.fillStyle = "red";
                ctx.beginPath();
                ctx.arc(x, y, 5, 0, 2 * Math.PI);
                ctx.fill();
                ctx.font = "14px sans-serif";
                const textWidth = ctx.measureText(text).width;
                const textHeight = 14;
                const padding = 5;
                const rectX = x - textWidth / 2 - padding;
                const rectY = y + 5 + padding / 2;
                const rectW = textWidth + 2 * padding;
                const rectH = textHeight + padding;
                ctx.fillStyle = "red";
                this.roundRect(ctx, rectX, rectY, rectW, rectH, 5);
                ctx.fill();
                ctx.fillStyle = "white";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(text, x, y + 5 + padding + textHeight / 2);
            });
        }
        // 11. Draw Robot & Target
        if (mapdata.ROBOT_POSITION) {
            const pos = mapdata.ROBOT_POSITION.position;
            const angle = mapdata.PATH?.current_angle ?? mapdata.ROBOT_POSITION.angle;
            if (pos?.[0] && pos?.[1]) {
                const imgRotated = this.rotateCanvas(imgRobot, angle);
                const x = this.robotXtoPixelX(mapdata.IMAGE, pos[0] / 50) - imgRobot.width / 4;
                const y = this.robotYtoPixelY(mapdata.IMAGE, pos[1] / 50) - imgRobot.height / 4;
                ctx.drawImage(imgRotated, x, y, imgRotated.width / 2, imgRotated.height / 2);
            }
        }
        if (mapdata.GOTO_TARGET?.[0] && mapdata.GOTO_TARGET?.[1]) {
            ctx.drawImage(imgGoToPin, this.robotXtoPixelX(mapdata.IMAGE, mapdata.GOTO_TARGET[0] / 50) - imgGoToPin.width / 2, this.robotYtoPixelY(mapdata.IMAGE, mapdata.GOTO_TARGET[1] / 50) - (imgGoToPin.height + 6), imgGoToPin.width, imgGoToPin.height);
        }
        // 12. Draw Room Names
        // This block only runs if we have segment data AND (critically) mappedRooms was passed
        if (segmentsData && mappedRooms) {
            const roomIDsAll = this.adapter.http_api.getMatchedRoomIDs(false);
            Object.keys(segmentsData).forEach((segnumStr) => {
                const segnum = parseInt(segnumStr);
                if (segnum === 0)
                    return; // Skip non-room area
                const segment = segmentsData[segnum];
                let roomName = "";
                // This check is the key: mappedRooms is the result of get_room_mapping.
                // For history maps, we pass mappedRooms=null, so this block is skipped.
                const mapping = mappedRooms.find(([id]) => parseInt(id) === segnum);
                if (mapping) {
                    const roomID = mapping[1];
                    const roomObj = roomIDsAll.find((r) => String(r.id) === String(roomID));
                    roomName = roomObj?.name || "";
                }
                if (roomName) {
                    const centerX = segment.minX + (segment.maxX - segment.minX) / 2;
                    const centerY = segment.minY + (segment.maxY - segment.minY) / 2;
                    ctx.font = `bold ${this.adapter.config.map_scale * 6}px Arial`;
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
        // 13. Crop & Return
        const cropW = maxleft - minleft + 2 * OFFSET;
        const cropH = maxtop - mintop + 2 * OFFSET;
        if (cropW <= 0 || cropH <= 0 || !isFinite(cropW) || !isFinite(cropH)) {
            this.adapter.log.warn(`[MapCreator] Invalid crop dimensions calculated. Returning full map.`);
            return [canvas.toDataURL(), canvas.toDataURL()];
        }
        const canvasTrimmed = (0, canvas_1.createCanvas)(cropW, cropH);
        const ctxTrimmed = canvasTrimmed.getContext("2d");
        const sx = Math.max(0, minleft - OFFSET);
        const sy = Math.max(0, mintop - OFFSET);
        const maxWidth = canvas.width - sx;
        const maxHeight = canvas.height - sy;
        const finalCropW = Math.min(cropW, maxWidth);
        const finalCropH = Math.min(cropH, maxHeight);
        const trimmedData = ctx.getImageData(sx, sy, finalCropW, finalCropH);
        ctxTrimmed.putImageData(trimmedData, 0, 0);
        return [canvas.toDataURL(), canvasTrimmed.toDataURL()];
    }
    // --------------------
    // Sub-drawing Routines
    // --------------------
    drawPaths(ctx, mapdata) {
        if (!mapdata.PATH?.points || !mapdata.MOP_PATH)
            return;
        const scale = this.adapter.config.map_scale;
        const points = mapdata.PATH.points;
        const mops = mapdata.MOP_PATH;
        const mopOffset = -12;
        // 1. Mop Path (Thick transparent trace)
        ctx.lineWidth = 7 * scale;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = "rgba(255,255,255,0.18)";
        ctx.beginPath();
        let lastIdx = -1;
        let segmentStarted = false;
        for (let i = 0; i < points.length; i++) {
            const mopIdx = i + mopOffset;
            if (mops?.[mopIdx] & 1) {
                const x = this.robotXtoPixelX(mapdata.IMAGE, points[i][0] / 50);
                const y = this.robotYtoPixelY(mapdata.IMAGE, points[i][1] / 50);
                if (!segmentStarted) {
                    ctx.moveTo(x, y);
                    segmentStarted = true;
                }
                else {
                    this.tracePathSegment(ctx, x, y, i, lastIdx, points, mapdata);
                }
                lastIdx = i;
            }
            else {
                segmentStarted = false;
            }
        }
        ctx.stroke();
        // 2. Main Line
        ctx.lineWidth = Math.max(1, scale / 2);
        ctx.strokeStyle = this.colors.path;
        ctx.beginPath();
        ctx.setLineDash([]);
        lastIdx = -1;
        for (let i = 0; i < points.length; i++) {
            const idx = i + mopOffset;
            const isBackwash = idx >= 0 && idx < mops.length && ((mops[idx] >> 3) & 1) === 1;
            if (!isBackwash) {
                const x = this.robotXtoPixelX(mapdata.IMAGE, points[i][0] / 50);
                const y = this.robotYtoPixelY(mapdata.IMAGE, points[i][1] / 50);
                this.tracePathSegment(ctx, x, y, i, lastIdx, points, mapdata);
                lastIdx = i;
            }
            else {
                lastIdx = -1;
            }
        }
        ctx.stroke();
        // 3. Backwash (Dashed)
        ctx.lineWidth = 0.5 * scale;
        ctx.strokeStyle = "rgba(255,255,255,0.2)";
        ctx.setLineDash([4, 8]);
        ctx.beginPath();
        lastIdx = -1;
        for (let i = 0; i < points.length; i++) {
            const idx = i + mopOffset;
            const isBackwash = idx >= 0 && idx < mops.length && ((mops[idx] >> 3) & 1) === 1;
            if (isBackwash) {
                const x = this.robotXtoPixelX(mapdata.IMAGE, points[i][0] / 50);
                const y = this.robotYtoPixelY(mapdata.IMAGE, points[i][1] / 50);
                this.tracePathSegment(ctx, x, y, i, lastIdx, points, mapdata);
                lastIdx = i;
            }
            else {
                lastIdx = -1;
            }
        }
        ctx.stroke();
        ctx.setLineDash([]);
    }
    tracePathSegment(ctx, x, y, currIdx, lastIdx, points, mapdata) {
        const scale = this.adapter.config.map_scale;
        const threshold = 10 * scale;
        if (lastIdx < 0) {
            ctx.moveTo(x, y);
        }
        else {
            const last = points[lastIdx];
            const lx = this.robotXtoPixelX(mapdata.IMAGE, last[0] / 50);
            const ly = this.robotYtoPixelY(mapdata.IMAGE, last[1] / 50);
            if (Math.hypot(x - lx, y - ly) > threshold || currIdx !== lastIdx + 1) {
                ctx.moveTo(x, y);
            }
            else {
                ctx.lineTo(x, y);
            }
        }
    }
    drawRestrictedAreas(ctx, mapdata) {
        const drawRectArea = (zones, fill, stroke) => {
            if (!zones)
                return;
            zones.forEach((zone) => {
                const x1 = this.robotXtoPixelX(mapdata.IMAGE, Math.min(zone[0], zone[2], zone[4], zone[6]) / 50);
                const y1 = this.robotYtoPixelY(mapdata.IMAGE, Math.max(zone[1], zone[3], zone[5], zone[7]) / 50);
                const x2 = this.robotXtoPixelX(mapdata.IMAGE, Math.max(zone[0], zone[2], zone[4], zone[6]) / 50);
                const y2 = this.robotYtoPixelY(mapdata.IMAGE, Math.min(zone[1], zone[3], zone[5], zone[7]) / 50);
                const minX = Math.min(x1, x2);
                const minY = Math.min(y1, y2);
                const maxX = Math.max(x1, x2);
                const maxY = Math.max(y1, y2);
                const w = maxX - minX;
                const h = maxY - minY;
                ctx.fillStyle = fill;
                ctx.fillRect(minX, minY, w, h);
                ctx.strokeStyle = stroke;
                ctx.lineWidth = (1 * this.adapter.config.map_scale) / 2;
                ctx.strokeRect(minX, minY, w, h);
            });
        };
        drawRectArea(mapdata.FORBIDDEN_ZONES, "rgba(255, 0, 0, 0.5)", "rgba(255, 0, 0, 1)");
        drawRectArea(mapdata.NO_MOP_ZONE, "rgba(0, 0, 255, 0.5)", "rgba(0, 0, 255, 1)");
        if (mapdata.VIRTUAL_WALLS) {
            ctx.strokeStyle = "rgba(255, 0, 0, 1)";
            const lineWidth = 1 * this.adapter.config.map_scale;
            ctx.lineWidth = lineWidth;
            ctx.beginPath();
            mapdata.VIRTUAL_WALLS.forEach((wall) => {
                const startX = this.robotXtoPixelX(mapdata.IMAGE, wall[0] / 50);
                const startY = this.robotYtoPixelY(mapdata.IMAGE, wall[1] / 50);
                const endX = this.robotXtoPixelX(mapdata.IMAGE, wall[2] / 50);
                const endY = this.robotYtoPixelY(mapdata.IMAGE, wall[3] / 50);
                let vecX = endX - startX;
                let vecY = endY - startY;
                const len = Math.sqrt(vecX * vecX + vecY * vecY);
                vecX /= len;
                vecY /= len;
                const adjustedStartX = startX + vecX * (lineWidth / 2);
                const adjustedStartY = startY + vecY * (lineWidth / 2);
                const adjustedEndX = endX - vecX * (lineWidth / 2);
                const adjustedEndY = endY - vecY * (lineWidth / 2);
                ctx.moveTo(adjustedStartX, adjustedStartY);
                ctx.lineTo(adjustedEndX, adjustedEndY);
            });
            ctx.stroke();
        }
    }
    roundRect(ctx, x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
    }
}
exports.MapCreator = MapCreator;
//# sourceMappingURL=mapCreator.js.map