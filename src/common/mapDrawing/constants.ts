/** Shared map drawing constants. Single source for V1 map scale and colors. */
export const VISUAL_BLOCK_SIZE = 3;

export const ROBOROCK_PALETTE = [
	"#DFDFDFff", "#50A4FF", "#FF744D", "#008FA8", "#F5AF10", "#E9E9E9ff"
];

export const LEGACY_COLORS = {
	floor: "#23465e",
	obstacle: "#2b2e30",
	path: "#FFFFFF",
};

export function hexToRgba(hex: string, alpha = 255): [number, number, number, number] {
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);
	return [r, g, b, alpha];
}

/** For ctx.fillStyle / SVG fill (0–255 alpha). */
export function hexToRgbaString(hex: string, alpha = 255): string {
	const [r, g, b, a] = hexToRgba(hex, alpha);
	return `rgba(${r},${g},${b},${a / 255})`;
}
