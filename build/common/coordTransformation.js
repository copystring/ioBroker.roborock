"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VISUAL_BLOCK_SIZE = void 0;
exports.robotToPixel = robotToPixel;
exports.pixelToRobot = pixelToRobot;
exports.localCoordsToRobotCoords = localCoordsToRobotCoords;
exports.robotCoordsToLocalCoords = robotCoordsToLocalCoords;
/**
 * Transforms Robot Coordinate (mm) to Visual Pixel Coordinate
 * Matches logic from MapBuilder.ts (Backend)
 */
function robotToPixel(params) {
    const { x, y, minX, minY, sizeY, resolution, scale } = params;
    // Calculate unscaled grid coordinates (with 0.5 centering from MapBuilder)
    // Formula: (wx - minX) / res + 0.5
    const px = (x - minX) / resolution + 0.5;
    // Formula: sizeY - ((wy - minY) / res) - 0.5
    const py = sizeY - ((y - minY) / resolution) - 0.5;
    // Apply visual scale
    return {
        x: px * scale,
        y: py * scale
    };
}
/**
 * Transforms Visual Pixel Coordinate to Robot Coordinate (mm)
 * Inverse of robotToPixel
 */
function pixelToRobot(params) {
    const { x, y, minX, minY, sizeY, resolution, scale } = params;
    const px_unscaled = x / scale;
    const py_unscaled = y / scale;
    // Inverse X: px = (robX - minX) / res + 0.5
    // robX = (px - 0.5) * res + minX
    const robotX = (px_unscaled - 0.5) * resolution + minX;
    // Inverse Y: py = sizeY - ((robY - minY) / res) - 0.5
    // py + 0.5 = sizeY - ((robY - minY) / res)
    // ((robY - minY) / res) = sizeY - (py + 0.5)
    // robY - minY = (sizeY - py - 0.5) * res
    // robY = (sizeY - py - 0.5) * res + minY
    const robotY = (sizeY - py_unscaled - 0.5) * resolution + minY;
    return { x: robotX, y: robotY };
}
// -----------------------------------------------------------------------------
// Frontend Helpers (formerly coords.ts)
// -----------------------------------------------------------------------------
// The true physical scale (50mm/pixel) used by Roborock
const MM_PER_PIXEL = 50;
exports.VISUAL_BLOCK_SIZE = 3;
/**
 * Converts LOCAL "world" pixel coordinates (px, Y-down) back to ROBOT coordinates (mm).
 * Used for Click-Tests, GoTo, and Zones.
 */
function localCoordsToRobotCoords(localPoint, params) {
    if (!params)
        return { x: 0, y: 0 };
    const height = (params.imageHeight || params.mapMaxY || 1024) / params.scaleFactor;
    // params.left/topMap are in Grid Units (Pixels). Shared Lib expects mm.
    // Convert: mm = pixels * 50
    const minX_mm = params.left * MM_PER_PIXEL;
    const minY_mm = params.topMap * MM_PER_PIXEL;
    const result = pixelToRobot({
        x: localPoint.x,
        y: localPoint.y,
        minX: minX_mm,
        minY: minY_mm,
        sizeY: height,
        resolution: MM_PER_PIXEL,
        scale: params.scaleFactor // e.g. 3
    });
    return { x: Math.round(result.x), y: Math.round(result.y) };
}
/**
 * Converts ROBOT coordinates (mm) to LOCAL "world" pixel coordinates (px, Y-down).
 * This is used to DRAW things on the map.
 */
function robotCoordsToLocalCoords(robotPoint, params) {
    if (!params)
        return { x: 0, y: 0 };
    const height = (params.imageHeight || params.mapMaxY || 1024) / exports.VISUAL_BLOCK_SIZE;
    const minX_mm = params.left * MM_PER_PIXEL;
    const minY_mm = params.topMap * MM_PER_PIXEL;
    return robotToPixel({
        x: robotPoint.x,
        y: robotPoint.y,
        minX: minX_mm,
        minY: minY_mm,
        sizeY: height,
        resolution: MM_PER_PIXEL,
        scale: exports.VISUAL_BLOCK_SIZE // params.scaleFactor might be 3, check VISUAL_BLOCK_SIZE
    });
}
//# sourceMappingURL=coordTransformation.js.map