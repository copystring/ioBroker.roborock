"use strict";
/**
 * Utility functions for B01 map processing.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.interpolate = interpolate;
exports.hexToRgba = hexToRgba;
/**
 * Interpolates points in a chain to create a dense line of pixels.
 */
function interpolate(points) {
    if (!points || points.length < 2)
        return points;
    const dense = [];
    for (let i = 0; i < points.length; i++) {
        const p1 = points[i];
        dense.push(p1);
        if (i < points.length - 1) {
            const p2 = points[i + 1];
            let cx = p1.chain_point.x;
            let cy = p1.chain_point.y;
            const tx = p2.chain_point.x;
            const ty = p2.chain_point.y;
            while (Math.abs(cx - tx) + Math.abs(cy - ty) > 1) {
                if (cx !== tx)
                    cx += (tx > cx ? 1 : -1);
                else if (cy !== ty)
                    cy += (ty > cy ? 1 : -1);
                dense.push({ chain_point: { x: cx, y: cy } });
            }
        }
    }
    return dense;
}
/**
 * Converts a hex color string to an RGBA string.
 * Supports 9-character hex strings (RRGGBBAA).
 */
function hexToRgba(hex) {
    if (hex.startsWith("#") && hex.length === 9) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        const a = parseInt(hex.slice(7, 9), 16) / 255;
        return `rgba(${r},${g},${b},${a.toFixed(2)})`;
    }
    return hex;
}
//# sourceMappingURL=utils.js.map