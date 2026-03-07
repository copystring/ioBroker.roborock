/**
 * Backend V1 map renderer: draws via @napi-rs/canvas. Used only by drawMapV1 (single source).
 */
import type { Canvas, Image } from "@napi-rs/canvas";
import { createCanvas } from "@napi-rs/canvas";
import type {
	DrawCarpetInput,
	DrawObstacleInput,
	DrawPredictedPathInput,
	DrawRect,
	DrawRoomLabelInput,
	DrawVirtualWallInput,
	DrawZoneRectInput,
	IMapRenderer,
} from "../../../common/mapDrawing/types";
import { VISUAL_BLOCK_SIZE } from "../../../common/mapDrawing/constants";

/** Node canvas 2D context (no DOM types). */
export interface NodeCanvasContext2D {
	canvas: Canvas;
	drawImage(image: Canvas | Image, dx: number, dy: number, dw?: number, dh?: number): void;
	getImageData(sx: number, sy: number, sw: number, sh: number): ImageData;
	putImageData(imagedata: ImageData, dx: number, dy: number): void;
	fillStyle: string;
	strokeStyle: string;
	lineWidth: number;
	lineCap: string;
	lineJoin: string;
	globalAlpha: number;
	imageSmoothingEnabled: boolean;
	antialias?: string;
	save(): void;
	restore(): void;
	beginPath(): void;
	moveTo(x: number, y: number): void;
	lineTo(x: number, y: number): void;
	stroke(): void;
	fill(): void;
	fillRect(x: number, y: number, w: number, h: number): void;
	strokeRect(x: number, y: number, w: number, h: number): void;
	arc(x: number, y: number, radius: number, startAngle: number, endAngle: number): void;
	setLineDash(segments: number[]): void;
	translate(x: number, y: number): void;
	rotate(angle: number): void;
	font: string;
	textAlign: string;
	textBaseline: string;
	strokeText(text: string, x: number, y: number): void;
	fillText(text: string, x: number, y: number): void;
}

export interface CanvasMapRendererOptions {
	ctx: NodeCanvasContext2D;
	robotImage: Canvas | Image;
	chargerImage: Canvas | Image;
	goToPinImage: Canvas | Image;
	loadObstacleImage?(suffix: string, model?: string): Promise<Canvas | Image | null>;
	model?: string;
	/** Log warnings (e.g. missing obstacle image). */
	logWarn?(msg: string): void;
}

export class CanvasMapRenderer implements IMapRenderer {
	private ctx: NodeCanvasContext2D;
	private robotImage: Canvas | Image;
	private chargerImage: Canvas | Image;
	private goToPinImage: Canvas | Image;
	private loadObstacleImage?: (suffix: string, model?: string) => Promise<Canvas | Image | null>;
	private model?: string;
	private logWarn?: (msg: string) => void;
	private cleanSnapshotBase64: string | null = null;
	private carpetSprite: Canvas | null = null;

	constructor(options: CanvasMapRendererOptions) {
		this.ctx = options.ctx;
		this.robotImage = options.robotImage;
		this.chargerImage = options.chargerImage;
		this.goToPinImage = options.goToPinImage;
		this.loadObstacleImage = options.loadObstacleImage;
		this.model = options.model;
		this.logWarn = options.logWarn;
	}

	getCleanSnapshot(): string | null {
		if (this.cleanSnapshotBase64 === null) {
			this.cleanSnapshotBase64 = (this.ctx.canvas as Canvas).toDataURL();
		}
		return this.cleanSnapshotBase64;
	}

	private createCarpetSprite(): Canvas {
		if (this.carpetSprite) return this.carpetSprite;
		const spriteCanvas = createCanvas(VISUAL_BLOCK_SIZE, VISUAL_BLOCK_SIZE);
		const ctx = spriteCanvas.getContext("2d") as unknown as NodeCanvasContext2D;
		ctx.imageSmoothingEnabled = false;
		if ("antialias" in ctx) ctx.antialias = "none";
		ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
		const STRIDE = 3;
		for (let dx = 0; dx < VISUAL_BLOCK_SIZE; dx++) {
			for (let dy = 0; dy < VISUAL_BLOCK_SIZE; dy++) {
				if ((dx + dy) % STRIDE === 2) ctx.fillRect(dx, dy, 1, 1);
			}
		}
		this.carpetSprite = spriteCanvas;
		return spriteCanvas;
	}

	private drawPathSegments(
		segments: { x: number; y: number }[][],
		stroke: string,
		lineWidth: number,
		opacity: number,
		dashed: boolean
	): void {
		if (!segments?.length) return;
		const tempCanvas = createCanvas(this.ctx.canvas.width, this.ctx.canvas.height);
		const tempCtx = tempCanvas.getContext("2d");
		tempCtx.strokeStyle = stroke;
		tempCtx.lineWidth = lineWidth;
		tempCtx.lineCap = "round";
		tempCtx.lineJoin = "round";
		tempCtx.setLineDash(dashed ? [VISUAL_BLOCK_SIZE, 2 * VISUAL_BLOCK_SIZE] : []);
		tempCtx.beginPath();
		for (const segment of segments) {
			if (segment.length > 0) {
				tempCtx.moveTo(segment[0].x, segment[0].y);
				for (let i = 1; i < segment.length; i++) tempCtx.lineTo(segment[i].x, segment[i].y);
			}
		}
		tempCtx.stroke();
		this.ctx.save();
		this.ctx.globalAlpha = opacity;
		this.ctx.drawImage(tempCanvas as unknown as Canvas, 0, 0);
		this.ctx.restore();
	}

	drawFloor(rects: DrawRect[]): void {
		const width = this.ctx.canvas.width;
		const height = this.ctx.canvas.height;
		const imgData = this.ctx.getImageData(0, 0, width, height);
		const data = imgData.data;
		for (const r of rects) {
			const [fr, fg, fb, fa] = parseRgba(r.fill);
			for (let dy = 0; dy < r.h; dy++) {
				const py = r.y + dy;
				if (py >= height) continue;
				for (let dx = 0; dx < r.w; dx++) {
					const px = r.x + dx;
					if (px >= width) continue;
					const idx = (py * width + px) * 4;
					data[idx] = fr;
					data[idx + 1] = fg;
					data[idx + 2] = fb;
					data[idx + 3] = fa;
				}
			}
		}
		this.ctx.putImageData(imgData, 0, 0);
	}

	drawSegmentRects(rects: DrawRect[]): void {
		const width = this.ctx.canvas.width;
		const height = this.ctx.canvas.height;
		const imgData = this.ctx.getImageData(0, 0, width, height);
		const data = imgData.data;
		for (const r of rects) {
			const [fr, fg, fb, fa] = parseRgba(r.fill);
			for (let dy = 0; dy < r.h; dy++) {
				const py = r.y + dy;
				if (py >= height) continue;
				for (let dx = 0; dx < r.w; dx++) {
					const px = r.x + dx;
					if (px >= width) continue;
					const idx = (py * width + px) * 4;
					data[idx] = fr;
					data[idx + 1] = fg;
					data[idx + 2] = fb;
					data[idx + 3] = fa;
				}
			}
		}
		this.ctx.putImageData(imgData, 0, 0);
	}

	drawCarpet(input: DrawCarpetInput): void {
		if (!input.positions.length) return;
		this.ctx.imageSmoothingEnabled = false;
		if ("antialias" in this.ctx) this.ctx.antialias = "none";
		const sprite = this.createCarpetSprite();
		for (const pos of input.positions) {
			this.ctx.drawImage(sprite, pos.x, pos.y);
		}
	}

	drawPath(input: { segments: { x: number; y: number }[][]; stroke: string; lineWidth: number; opacity?: number; dashed?: boolean }): void {
		this.drawPathSegments(
			input.segments,
			input.stroke,
			input.lineWidth,
			input.opacity ?? 1,
			input.dashed ?? false
		);
	}

	drawRobot(input: { x: number; y: number; angle: number }): void {
		const drawAngle = -input.angle + 90;
		const robotSize = VISUAL_BLOCK_SIZE * 5;
		this.ctx.save();
		this.ctx.translate(input.x, input.y);
		this.ctx.rotate((drawAngle * Math.PI) / 180);
		this.ctx.drawImage(this.robotImage, -robotSize / 2, -robotSize / 2, robotSize, robotSize);
		this.ctx.restore();
	}

	drawCharger(input: { x: number; y: number }): void {
		const w = VISUAL_BLOCK_SIZE * 3;
		const h = VISUAL_BLOCK_SIZE * 3;
		this.ctx.drawImage(this.chargerImage, input.x - w / 2, input.y - h / 2, w, h);
	}

	drawGoToPin(input: { x: number; y: number }): void {
		const pinW = VISUAL_BLOCK_SIZE * 3;
		const pinH = (pinW / 29) * 24;
		this.ctx.drawImage(this.goToPinImage, input.x - pinW / 2, input.y - (pinH + VISUAL_BLOCK_SIZE / 2), pinW, pinH);
	}

	async drawObstacles(items: DrawObstacleInput[]): Promise<void> {
		if (!items.length) return;
		const suffixMap: Record<number, string> = {
			[-99]: "99",
			0: "0",
			1: "1",
			2: "2",
			3: "3",
			4: "3",
			5: "5_cn",
			9: "9",
			10: "10",
			18: "18",
			25: "25",
			26: "26",
			27: "26",
			34: "10",
			42: "18",
			48: "48",
			49: "49",
			50: "49",
			51: "51",
			54: "54",
			65: "65",
			67: "67",
			69: "69",
			70: "70",
			99: "99",
		};
		const radius = VISUAL_BLOCK_SIZE * 3.5;
		const size = VISUAL_BLOCK_SIZE * 5;
		for (const ob of items) {
			const suffix = typeof ob.typeOrSuffix === "number" ? (suffixMap[ob.typeOrSuffix] ?? "18") : ob.typeOrSuffix;
			this.ctx.beginPath();
			this.ctx.arc(ob.x, ob.y, radius, 0, 2 * Math.PI);
			this.ctx.fillStyle = "rgba(100, 100, 100, 0.2)";
			this.ctx.fill();
			this.ctx.lineWidth = 0.5;
			this.ctx.strokeStyle = "white";
			this.ctx.stroke();
			if (ob.imageHref) {
				// Pre-loaded image passed (e.g. data URL or buffer loaded by caller)
				try {
					const img = await loadImageFromData(ob.imageHref);
					if (img) this.ctx.drawImage(img, ob.x - size / 2, ob.y - size / 2, size, size);
				} catch {
					// ignore
				}
			} else if (this.loadObstacleImage) {
				const img = await this.loadObstacleImage(suffix, this.model);
				if (img) this.ctx.drawImage(img, ob.x - size / 2, ob.y - size / 2, size, size);
				else if (this.logWarn) this.logWarn(`Could not find obstacle image for suffix ${suffix}`);
			}
		}
	}

	drawRoomLabels(labels: DrawRoomLabelInput[]): void {
		if (!labels.length) return;
		this.ctx.font = `bold ${VISUAL_BLOCK_SIZE * 6}px Arial`;
		this.ctx.textAlign = "center";
		this.ctx.textBaseline = "middle";
		this.ctx.lineWidth = 1;
		this.ctx.strokeStyle = "white";
		this.ctx.fillStyle = "black";
		for (const l of labels) {
			this.ctx.strokeText(l.text, l.x, l.y);
			this.ctx.fillText(l.text, l.x, l.y);
		}
	}

	drawActiveZones(zones: DrawZoneRectInput[]): void {
		for (const z of zones) {
			this.ctx.fillStyle = z.fill;
			this.ctx.fillRect(z.x, z.y, z.w, z.h);
			this.ctx.strokeStyle = z.stroke;
			this.ctx.lineWidth = 4;
			this.ctx.strokeRect(z.x, z.y, z.w, z.h);
		}
	}

	drawRestrictedZones(zones: DrawZoneRectInput[], virtualWalls: DrawVirtualWallInput[]): void {
		for (const z of zones) {
			this.ctx.fillStyle = z.fill;
			this.ctx.fillRect(z.x, z.y, z.w, z.h);
			this.ctx.strokeStyle = z.stroke;
			this.ctx.lineWidth = (1 * VISUAL_BLOCK_SIZE) / 2;
			this.ctx.strokeRect(z.x, z.y, z.w, z.h);
		}
		for (const w of virtualWalls) {
			this.ctx.strokeStyle = w.stroke;
			this.ctx.lineWidth = w.lineWidth;
			this.ctx.beginPath();
			this.ctx.moveTo(w.x1, w.y1);
			this.ctx.lineTo(w.x2, w.y2);
			this.ctx.stroke();
		}
	}

	drawPredictedPath(input: DrawPredictedPathInput): void {
		if (!input.points.length) return;
		this.ctx.lineWidth = input.lineWidth;
		this.ctx.strokeStyle = input.stroke;
		this.ctx.setLineDash(input.dashArray);
		this.ctx.lineCap = "round";
		this.ctx.beginPath();
		let lastX = -1,
			lastY = -1;
		input.points.forEach((p, index) => {
			if (index === 0) {
				this.ctx.fillStyle = "rgba(255, 255, 255, 1)";
				this.ctx.fillRect(p.x, p.y, (1 * VISUAL_BLOCK_SIZE) / 2, (1 * VISUAL_BLOCK_SIZE) / 2);
				this.ctx.moveTo(p.x, p.y);
			} else if (p.x !== lastX || p.y !== lastY) {
				this.ctx.lineTo(p.x, p.y);
			}
			lastX = p.x;
			lastY = p.y;
		});
		this.ctx.stroke();
		this.ctx.setLineDash([]);
		this.ctx.lineCap = "butt";
	}
}

function parseRgba(css: string): [number, number, number, number] {
	const m = css.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
	if (m) {
		const a = m[4] != null ? Math.round(parseFloat(m[4]) * 255) : 255;
		return [parseInt(m[1], 10), parseInt(m[2], 10), parseInt(m[3], 10), a];
	}
	return [0, 0, 0, 255];
}

async function loadImageFromData(data: string): Promise<Canvas | Image | null> {
	// data can be base64 data URL or path; @napi-rs/canvas loadImage can accept buffer
	const { loadImage } = await import("@napi-rs/canvas");
	if (data.startsWith("data:")) {
		const base64 = data.replace(/^data:image\/\w+;base64,/, "");
		const buf = Buffer.from(base64, "base64");
		return await loadImage(buf);
	}
	return await loadImage(data);
}
