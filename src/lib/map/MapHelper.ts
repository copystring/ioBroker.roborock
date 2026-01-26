import { loadImage } from "@napi-rs/canvas";
import * as zlib from "zlib";
import * as Images from "../../common/images";

export interface Point {
	x: number;
	y: number;
}

export const VISUAL_BLOCK_SIZE = 3;

// Standard Roborock Palette (Dark Mode style)
export const ROBOROCK_PALETTE = [
	"#DFDFDFff", // 0: Default (background/no color)
	"#50A4FF", // 1: Blue
	"#FF744D", // 2: Orange
	"#008FA8", // 3: Cyan
	"#F5AF10", // 4: Yellow
	"#E9E9E9ff", // 5: Reserve/Fallback
];

// Legacy Colors used in V1 map (can be deprecated if we fully switch to Palette)
export const LEGACY_COLORS = {
	floor: "#23465e",
	obstacle: "#2b2e30",
	path: "#FFFFFF",
};

export const ALGORITHM_COLORS = {
	// Colors for the adjacency algorithm visualization if needed
	// Usually mapped to ROBOROCK_PALETTE indices
};

export async function loadSharedImages(robotType?: string) {
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

export function robotXtoCanvasX(x: number, left: number): number {
	return (x - left) * VISUAL_BLOCK_SIZE + VISUAL_BLOCK_SIZE / 2;
}

export function robotYtoCanvasY(y: number, top: number, height: number): number {
	return (height / VISUAL_BLOCK_SIZE + top - y) * VISUAL_BLOCK_SIZE - VISUAL_BLOCK_SIZE / 2;
}

// Convert room ID to Hex Color using standard palette
export function getRoomColor(colorId: number): string {
	if (colorId > 0 && colorId < ROBOROCK_PALETTE.length) {
		return ROBOROCK_PALETTE[colorId];
	}
	// Wrap around format for IDs larger than palette
	return ROBOROCK_PALETTE[1 + ((colorId - 1) % (ROBOROCK_PALETTE.length - 2))];
	// -2 because index 0 is bg, index 5 is fallback? Algorithm usually uses 4 colors (1-4).
	// Let's stick to 4 main colors.
}

export function hexToRgba(hex: string, alpha = 255): [number, number, number, number] {
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);
	return [r, g, b, alpha];
}

/**
 * Robust decompression that handles multi-layered GZIP/ZLIB and scans for magic headers.
 */
export function decompress(compressed: Buffer): Buffer {
	let current = compressed;

	if (isSignatureMatch(current)) return current;

	let iterations = 0;
	while (iterations < 5) {
		let decompressed: Buffer | null = null;

		// 1. Try GZIP Magic Scan (1F 8B)
		if (current.length > 2) {
			const limit = Math.min(current.length - 1, 64);
			for (let i = 0; i < limit; i++) {
				if (current[i] === 0x1F && current[i + 1] === 0x8B) {
					try {
						decompressed = zlib.gunzipSync(current.subarray(i));
						if (decompressed && decompressed.length > 0) break;
					} catch {}
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
						if (decompressed && decompressed.length > 0) break;
					} catch {
						try {
							decompressed = zlib.inflateRawSync(current.subarray(i));
							if (decompressed && decompressed.length > 0) break;
						} catch {}
					}
				}
			}
		}

		if (decompressed) {
			current = decompressed;
			iterations++;
			if (isSignatureMatch(current)) break;
		} else {
			break;
		}
	}
	return current;
}

export function isSignatureMatch(buf: Buffer): boolean {
	if (buf.length < 2) return false;
	// V1: "rr"
	if (buf[0] === 0x72 && buf[1] === 0x72) return true;
	// B01: "B01"
	if (buf.length > 3 && buf.toString("ascii", 0, 3) === "B01") return true;
	// Protobuf: 0x08, 0x0a, 0x12
	return isLikelyProtobuf(buf);
}

export function isLikelyProtobuf(buf: Buffer): boolean {
	if (buf.length < 1) return false;
	return buf[0] === 0x08 || buf[0] === 0x0a || buf[0] === 0x12;
}
