/**
 * Shared coordinate helpers for V1 map drawing.
 * Grid index <-> pixel position. Used by both backend and frontend via drawMapV1.
 */
import { VISUAL_BLOCK_SIZE } from "./constants";

export interface GridDimensions {
	width: number;
	height: number;
}

/** Pixel position for a single cell (e.g. floor, obstacle, carpet). */
export function gridIndexToPixel(dimensions: GridDimensions, pixelIndex: number): { x: number; y: number } {
	const gridW = dimensions.width;
	const gridH = dimensions.height;
	const col = (pixelIndex * VISUAL_BLOCK_SIZE) % (gridW * VISUAL_BLOCK_SIZE);
	const row = gridH * VISUAL_BLOCK_SIZE - Math.floor(pixelIndex / gridW) * VISUAL_BLOCK_SIZE - VISUAL_BLOCK_SIZE;
	return { x: col, y: row };
}

/** Carpet/getX/getY style: grid dimensions in *grid* units (unscaled). */
export function getCarpetPixel(dimensions: GridDimensions, pixelIndex: number): { x: number; y: number } {
	const gridW = dimensions.width;
	const gridH = dimensions.height;
	const x = (pixelIndex * VISUAL_BLOCK_SIZE) % (gridW * VISUAL_BLOCK_SIZE);
	const y = gridH * VISUAL_BLOCK_SIZE - Math.floor(pixelIndex / gridW) * VISUAL_BLOCK_SIZE - VISUAL_BLOCK_SIZE;
	return { x, y };
}

/** Backend uses dimensions already scaled (width/height in pixels). This returns pixel (x,y) for a grid index. */
export function getPixelFromScaledDimensions(scaledWidth: number, scaledHeight: number, pixelIndex: number): { x: number; y: number } {
	const gridW = scaledWidth / VISUAL_BLOCK_SIZE;
	const x = (pixelIndex * VISUAL_BLOCK_SIZE) % scaledWidth;
	const y = scaledHeight - Math.floor(pixelIndex / gridW) * VISUAL_BLOCK_SIZE - VISUAL_BLOCK_SIZE;
	return { x, y };
}
