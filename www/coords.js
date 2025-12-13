// src/www/coords.ts
// The true physical scale (50mm/pixel) used by Roborock
const MM_PER_PIXEL = 50;
export const VISUAL_BLOCK_SIZE = 3;
export const GRID_CENTER_OFFSET = VISUAL_BLOCK_SIZE / 2;
/**
 * Converts LOCAL "world" pixel coordinates (px, Y-down) back to ROBOT coordinates (mm).
 * Used for Click-Tests, GoTo, and Zones.
 */
export function localCoordsToRobotCoords(localPoint, params) {
    if (!params)
        return { x: 0, y: 0 };
    // X-Axis: (Unscaled Pixel X + Offset X) * 50
    // Inverse of Draw: (Point - Offset) / Scale
    const robotX = Math.round(((localPoint.x - GRID_CENTER_OFFSET) / params.scaleFactor + params.left) * MM_PER_PIXEL);
    // Y-Axis (Inverted Logic): ((H_px + top_px) - (Y_px - Offset) / s) * 50
    // Note: imageHeight is already unscaled, do NOT divide by scaleFactor.
    // Inverse of Draw (Y): (Top + Height - Y_mm/50) * Scale + Offset
    // => Y_mm/50 = Top + Height - (Y_pix - Offset) / Scale
    const robotY = Math.round((params.imageHeight + params.topMap - (localPoint.y - (-GRID_CENTER_OFFSET)) / params.scaleFactor) * MM_PER_PIXEL);
    return { x: robotX, y: robotY };
}
/**
 * Converts ROBOT coordinates (mm) to LOCAL "world" pixel coordinates (px, Y-down).
 * This is used to DRAW things on the map.
 */
export function robotCoordsToLocalCoords(robotPoint, params) {
    if (!params)
        return { x: 0, y: 0 };
    // The map image is generated with 3 pixels per grid unit (VISUAL_BLOCK_SIZE=3).
    // So we must scale the coordinates by 3 to match the image features.
    const correctScale = VISUAL_BLOCK_SIZE;
    // X-Axis: Center in the middle of the grid block (0 -> 1.5)
    const offsetX = GRID_CENTER_OFFSET;
    // Y-Axis: Center in the middle of the grid block (0 -> -1.5 inverted)
    const offsetY = -GRID_CENTER_OFFSET;
    // X-Axis: (mm / 50 - Params) * Scale + Offset
    const worldX = (robotPoint.x / MM_PER_PIXEL - params.left) * correctScale + offsetX;
    // Y-Axis: (Top + Height - Y_mm/50) * Scale + Offset
    const finalY = (params.topMap + params.imageHeight - robotPoint.y / MM_PER_PIXEL) * correctScale + offsetY;
    return { x: worldX, y: finalY };
}
//# sourceMappingURL=coords.js.map