import type { B01MapData } from "../b01/types";
import type { Q10CreatorArea, Q10MapPixelPoint, Q10PixelPose } from "./types";

export const Q10_CANVAS_SCALE = 8;
const ROOM_TAG_REFERENCE_VIEW_WIDTH = 360;
const ROOM_TAG_REFERENCE_VIEW_HEIGHT = 780;

export interface Q10AreaPlacement {
	centerX: number;
	centerY: number;
	width: number;
	height: number;
	angleRad: number;
	angleDeg: number;
}

export class Q10RenderGeometry {
	public constructor(
		private readonly data: B01MapData,
		private readonly viewScale = 1,
		private readonly canvasScale = Q10_CANVAS_SCALE
	) {}

	public mapPoint(point: Q10MapPixelPoint): Q10MapPixelPoint {
		return {
			x: point.x * this.canvasScale,
			y: point.y * this.canvasScale
		};
	}

	public mapPose(pose: Q10PixelPose | undefined): Q10PixelPose | undefined {
		if (!pose) return undefined;
		return {
			x: pose.x * this.canvasScale,
			y: pose.y * this.canvasScale,
			phi: pose.phi
		};
	}

	public mapLength(length: number): number {
		return length * this.canvasScale;
	}

	public layoutLengthInMap(layoutUnits: number): number {
		return this.layoutLength(layoutUnits) / this.canvasScale;
	}

	public layoutLength(layoutUnits: number): number {
		return (layoutUnits * this.overlayExportScale()) / Math.max(this.viewScale, 0.001);
	}

	public imgRateLength(layoutUnits: number): number {
		return layoutUnits * this.roomTagReferenceKImgRate() * this.overlayExportScale();
	}

	public quarterMeterTileLengthInMap(): number {
		return 0.25 / Math.max(this.data.header.resolution, 0.01);
	}

	public quarterMeterTileLength(): number {
		return this.quarterMeterTileLengthInMap() * this.canvasScale;
	}

	public mapCanvasSize(): { width: number; height: number } {
		return {
			width: Math.max(1, this.data.header.sizeX * this.canvasScale),
			height: Math.max(1, this.data.header.sizeY * this.canvasScale)
		};
	}

	public areaPlacement(area: Q10CreatorArea, outputSpace: "map" | "canvas" = "map"): Q10AreaPlacement {
		const scale = outputSpace === "canvas" ? this.canvasScale : 1;
		const p0 = area.points[0]!;
		const p1 = area.points[1]!;
		const p3 = area.points[3]!;
		const angleRad = Math.atan2(p1.y - p0.y, p1.x - p0.x);
		return {
			centerX: ((area.points[0]!.x + area.points[2]!.x) / 2) * scale,
			centerY: ((area.points[0]!.y + area.points[2]!.y) / 2) * scale,
			width: Math.hypot(p1.x - p0.x, p1.y - p0.y) * scale,
			height: Math.hypot(p3.x - p0.x, p3.y - p0.y) * scale,
			angleRad,
			angleDeg: (angleRad * 180) / Math.PI
		};
	}

	public roomTagReferenceKImgRate(): number {
		const width = Math.max(1, this.data.header.sizeX);
		const height = Math.max(1, this.data.header.sizeY);
		const fitRateX = ROOM_TAG_REFERENCE_VIEW_WIDTH / width;
		const fitRateY = ROOM_TAG_REFERENCE_VIEW_HEIGHT / height;
		return Math.max(1, Math.min(fitRateX, fitRateY));
	}

	public overlayExportScale(): number {
		return this.canvasScale / this.roomTagReferenceKImgRate();
	}

	public roomTagExportScale(): number {
		return this.overlayExportScale();
	}
}
