/**
 * Utility functions for B01 map processing.
 */

/**
 * Interpolates points in a chain to create a dense line of pixels.
 */
export function interpolate(points: { chain_point: { x: number, y: number } }[]): { chain_point: { x: number, y: number } }[] {
	if (!points || points.length < 2) return points;
	const dense: { chain_point: { x: number, y: number } }[] = [];
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
				if (cx !== tx) cx += (tx > cx ? 1 : -1);
				else if (cy !== ty) cy += (ty > cy ? 1 : -1);
				dense.push({ chain_point: { x: cx, y: cy } });
			}
		}
	}
	return dense;
}

export function hexToRgba(hex: string): string {
	if (!hex || !hex.startsWith("#")) return hex;
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);
	const a = hex.length === 9 ? (parseInt(hex.slice(7, 9), 16) / 255).toFixed(2) : "1";
	return `rgba(${r}, ${g}, ${b}, ${a})`;
}
