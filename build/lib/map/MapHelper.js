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
exports.ALGORITHM_COLORS = exports.LEGACY_COLORS = exports.ROBOROCK_PALETTE = exports.VISUAL_BLOCK_SIZE = void 0;
exports.loadSharedImages = loadSharedImages;
exports.robotXtoCanvasX = robotXtoCanvasX;
exports.robotYtoCanvasY = robotYtoCanvasY;
exports.getRoomColor = getRoomColor;
exports.hexToRgba = hexToRgba;
exports.decompress = decompress;
exports.isSignatureMatch = isSignatureMatch;
exports.isLikelyProtobuf = isLikelyProtobuf;
const canvas_1 = require("@napi-rs/canvas");
const Images = __importStar(require("../images"));
const zlib = __importStar(require("zlib"));
exports.VISUAL_BLOCK_SIZE = 3;
// Standard Roborock Palette (Dark Mode style)
exports.ROBOROCK_PALETTE = [
    "#DFDFDFff", // 0: Default (background/no color)
    "#50A4FF", // 1: Blue
    "#FF744D", // 2: Orange
    "#008FA8", // 3: Cyan
    "#F5AF10", // 4: Yellow
    "#E9E9E9ff", // 5: Reserve/Fallback
];
// Legacy Colors used in V1 map (can be deprecated if we fully switch to Palette)
exports.LEGACY_COLORS = {
    floor: "#23465e",
    obstacle: "#2b2e30",
    path: "#FFFFFF",
};
exports.ALGORITHM_COLORS = {
// Colors for the adjacency algorithm visualization if needed
// Usually mapped to ROBOROCK_PALETTE indices
};
async function loadSharedImages(robotType) {
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
function robotXtoCanvasX(x, left) {
    return (x - left) * exports.VISUAL_BLOCK_SIZE + exports.VISUAL_BLOCK_SIZE / 2;
}
function robotYtoCanvasY(y, top, height) {
    return (height / exports.VISUAL_BLOCK_SIZE + top - y) * exports.VISUAL_BLOCK_SIZE - exports.VISUAL_BLOCK_SIZE / 2;
}
// Convert room ID to Hex Color using standard palette
function getRoomColor(colorId) {
    if (colorId > 0 && colorId < exports.ROBOROCK_PALETTE.length) {
        return exports.ROBOROCK_PALETTE[colorId];
    }
    // Wrap around format for IDs larger than palette
    return exports.ROBOROCK_PALETTE[1 + ((colorId - 1) % (exports.ROBOROCK_PALETTE.length - 2))];
    // -2 because index 0 is bg, index 5 is fallback? Algorithm usually uses 4 colors (1-4).
    // Let's stick to 4 main colors.
}
function hexToRgba(hex, alpha = 255) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b, alpha];
}
/**
 * Robust decompression that handles multi-layered GZIP/ZLIB and scans for magic headers.
 */
function decompress(compressed) {
    let current = compressed;
    if (isSignatureMatch(current))
        return current;
    let iterations = 0;
    while (iterations < 5) {
        let decompressed = null;
        // 1. Try GZIP Magic Scan (1F 8B)
        if (current.length > 2) {
            const limit = Math.min(current.length - 1, 64);
            for (let i = 0; i < limit; i++) {
                if (current[i] === 0x1F && current[i + 1] === 0x8B) {
                    try {
                        decompressed = zlib.gunzipSync(current.subarray(i));
                        if (decompressed && decompressed.length > 0)
                            break;
                    }
                    catch { }
                }
            }
        }
        // 2. Try ZLIB Magic Scan (78 xx)
        if (!decompressed && current.length > 2) {
            const limit = Math.min(current.length - 1, 64);
            for (let i = 0; i < limit; i++) {
                if (current[i] === 0x78 && (current[i + 1] === 0x9C || current[i + 1] === 0x01 || current[i + 1] === 0xDA)) {
                    try {
                        decompressed = zlib.inflateSync(current.subarray(i));
                        if (decompressed && decompressed.length > 0)
                            break;
                    }
                    catch {
                        try {
                            decompressed = zlib.inflateRawSync(current.subarray(i));
                            if (decompressed && decompressed.length > 0)
                                break;
                        }
                        catch { }
                    }
                }
            }
        }
        if (decompressed) {
            current = decompressed;
            iterations++;
            if (isSignatureMatch(current))
                break;
        }
        else {
            break;
        }
    }
    return current;
}
function isSignatureMatch(buf) {
    if (buf.length < 2)
        return false;
    // V1: "rr"
    if (buf[0] === 0x72 && buf[1] === 0x72)
        return true;
    // B01: "B01"
    if (buf.length > 3 && buf.toString("ascii", 0, 3) === "B01")
        return true;
    // Protobuf: 0x08, 0x0a, 0x12
    return isLikelyProtobuf(buf);
}
function isLikelyProtobuf(buf) {
    if (buf.length < 1)
        return false;
    return buf[0] === 0x08 || buf[0] === 0x0a || buf[0] === 0x12;
}
//# sourceMappingURL=MapHelper.js.map