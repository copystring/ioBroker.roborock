// src/lib/pathProcessor.ts
// --------------------
// Helpers
// --------------------
/** Builds SVG path string segment (M/L) */
function buildPathString(x, y, lastX, lastY, pathString, thresholdSq) {
    if (lastX === -1 || pathString === "") {
        pathString += `M${x},${y}`;
    }
    else {
        const isJump = (x - lastX) ** 2 + (y - lastY) ** 2 > thresholdSq;
        pathString += isJump ? `M${x},${y}` : `L${x},${y}`;
    }
    return [pathString, x, y];
}
/** Appends point to segment array (for Canvas) */
function appendPoint(pathSegments, currentPoint, lastPoint) {
    if (!lastPoint || !pathSegments.length || pathSegments[pathSegments.length - 1].length === 0) {
        pathSegments.push([]);
    }
    pathSegments[pathSegments.length - 1].push(currentPoint);
    return currentPoint;
}
// --------------------
// Main Processor
// --------------------
export function processPaths(points, flags, converter, scale, params) {
    // SVG Accumulators
    let mainPathD = "", backwashPathD = "", pureCleanPathD = "", mopPathD = "";
    // Canvas Accumulators
    const mainPath = [[]];
    const backwashPath = [[]];
    const pureCleanPath = [[]];
    const mopPath = [[]];
    // Pen Lift States (SVG)
    let lastX_main = -1, lastY_main = -1;
    let lastX_backwash = -1, lastY_backwash = -1;
    let lastX_pure = -1, lastY_pure = -1;
    let lastX_mop = -1, lastY_mop = -1;
    // Pen Lift States (Canvas)
    let lp_main = null;
    let lp_backwash = null;
    let lp_pure = null;
    let lp_mop = null;
    const thresholdSq = 10 * scale * (10 * scale);
    const len = Math.min(points.length, flags.length);
    for (let i = 0; i < len; i++) {
        const robotPoint = points[i];
        const pt = converter(robotPoint, params); // Scaled Pixel Point
        const x = pt.x;
        const y = pt.y;
        const flag = flags[i];
        // Bit Logic
        const isBackwash = ((flag >> 1) & 1) === 1 || ((flag >> 3) & 1) === 1;
        const isPureClean = ((flag >> 2) & 1) === 1;
        const isMop = (flag & 1) === 1;
        // Reset Pen Lifts for Exclusive Paths
        const prevX_main = lastX_main;
        const prevLP_main = lp_main;
        const prevX_backwash = lastX_backwash;
        const prevLP_backwash = lp_backwash;
        const prevX_pure = lastX_pure;
        const prevLP_pure = lp_pure;
        lastX_main = -1;
        lp_main = null;
        lastX_backwash = -1;
        lp_backwash = null;
        lastX_pure = -1;
        lp_pure = null;
        // --- 1. EXCLUSIVE PATHS ---
        if (isBackwash) {
            [backwashPathD, lastX_backwash, lastY_backwash] = buildPathString(x, y, prevX_backwash, lastY_backwash, backwashPathD, thresholdSq);
            lp_backwash = appendPoint(backwashPath, pt, prevLP_backwash);
        }
        else if (isPureClean) {
            [pureCleanPathD, lastX_pure, lastY_pure] = buildPathString(x, y, prevX_pure, lastY_pure, pureCleanPathD, thresholdSq);
            lp_pure = appendPoint(pureCleanPath, pt, prevLP_pure);
        }
        else {
            [mainPathD, lastX_main, lastY_main] = buildPathString(x, y, prevX_main, lastY_main, mainPathD, thresholdSq);
            lp_main = appendPoint(mainPath, pt, prevLP_main);
        }
        // --- 2. OVERLAY PATH (Bit 0) ---
        if (isMop) {
            [mopPathD, lastX_mop, lastY_mop] = buildPathString(x, y, lastX_mop, lastY_mop, mopPathD, thresholdSq);
            lp_mop = appendPoint(mopPath, pt, lp_mop);
        }
        else {
            lastX_mop = -1;
            lp_mop = null;
        }
    }
    const filterEmpty = (arr) => arr.filter((sub) => sub.length > 0);
    return {
        mainPathD,
        backwashPathD,
        pureCleanPathD,
        mopPathD,
        mainPath: filterEmpty(mainPath),
        backwashPath: filterEmpty(backwashPath),
        pureCleanPath: filterEmpty(pureCleanPath),
        mopPath: filterEmpty(mopPath),
    };
}
//# sourceMappingURL=pathProcessor.js.map