/**
 * Frontend V1 map renderer: draws into D3 SVG groups. Single source: drawMapV1 drives all layers.
 */
import * as d3 from "d3";
import type {
	DrawCarpetInput,
	DrawObstacleInput,
	DrawPathInput,
	DrawPredictedPathInput,
	DrawRect,
	DrawRoomLabelInput,
	DrawVirtualWallInput,
	DrawZoneRectInput,
	IMapRenderer,
	PathLayer,
} from "../common/mapDrawing/types";
import { VISUAL_BLOCK_SIZE } from "../common/mapDrawing/constants";

const PATH_LAYER_CLASS: Record<PathLayer, string> = {
	mop: "mop-path",
	main: "main-path",
	backwash: "backwash-path",
	pure: "pure-clean-path",
};

function segmentsToPathD(segments: { x: number; y: number }[][]): string {
	const thresholdSq = 10 * VISUAL_BLOCK_SIZE * (10 * VISUAL_BLOCK_SIZE);
	let d = "";
	for (const seg of segments) {
		let lastX = -1,
			lastY = -1;
		for (const p of seg) {
			if (lastX < 0) d += `M${p.x},${p.y}`;
			else {
				const jump = (p.x - lastX) ** 2 + (p.y - lastY) ** 2 > thresholdSq;
				d += jump ? `M${p.x},${p.y}` : `L${p.x},${p.y}`;
			}
			lastX = p.x;
			lastY = p.y;
		}
	}
	return d;
}

function carpetPositionsToPathD(positions: { x: number; y: number }[]): string {
	const stride = 3;
	const pathCoords: string[] = [];
	for (const pos of positions) {
		for (let dx = 0; dx < VISUAL_BLOCK_SIZE; dx++) {
			for (let dy = 0; dy < VISUAL_BLOCK_SIZE; dy++) {
				if ((dx + dy) % stride === 2) pathCoords.push(`M${pos.x + dx} ${pos.y + dy}h1v1h-1z`);
			}
		}
	}
	return pathCoords.join("");
}

export interface SVGMapRendererGroups {
	carpetGroup: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>;
	pathGroup: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>;
	mopPathGroup: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>;
	backwashPathGroup: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>;
	pureCleanPathGroup: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>;
	chargerGroup: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>;
	robotGroup: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>;
	pinGroup: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>;
	obstacleGroup: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>;
	roomNameGroup: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>;
	zonesOverlayGroup?: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>;
}

export interface SVGMapRendererOptions {
	groups: SVGMapRendererGroups;
	/** Base sizes (before zoom) for path stroke. Zoom handler will update by class. */
	pathMainWidth: number;
	pathMopWidth: number;
	pathBackwashWidth: number;
	robotSize: number;
	chargerSize: number;
	pinWidth: number;
	pinHeight: number;
	pinYOffset: number;
	obstacleRadius: number;
	obstacleImageSize: number;
	/** Asset base URL for obstacle icons, e.g. "assets/roborock.vacuum.a147/drawable-mdpi/" */
	obstacleAssetBaseUrl: string;
	obstacleMapping: Record<number, string>;
	obstacleFileName: (suffix: string) => string;
	obstacleFileNameAlt: (suffix: string) => string;
	/** Callback when obstacle is clicked (e.g. show popup). Receives obstacle data bound to element. */
	onObstacleClick?: (event: MouseEvent, obstacleData: unknown) => void;
	/** Image hrefs for robot, charger, go-to pin. */
	robotImageHref: string;
	chargerImageHref: string;
	goToPinImageHref: string;
}

export class SVGMapRenderer implements IMapRenderer {
	private opts: SVGMapRendererOptions;
	private pathGroupByLayer: Record<PathLayer, d3.Selection<SVGGElement, unknown, HTMLElement, unknown>>;

	constructor(options: SVGMapRendererOptions) {
		this.opts = options;
		const g = options.groups;
		this.pathGroupByLayer = {
			mop: g.mopPathGroup,
			main: g.pathGroup,
			backwash: g.backwashPathGroup,
			pure: g.pureCleanPathGroup,
		};
	}

	getCleanSnapshot(): string | null {
		return null;
	}

	drawFloor(_rects: DrawRect[]): void {
		// Base image already contains floor; no-op for frontend
	}

	drawSegmentRects(_rects: DrawRect[]): void {
		// Base image already contains segments; no-op for frontend
	}

	drawCarpet(input: DrawCarpetInput): void {
		const g = this.opts.groups.carpetGroup;
		g.selectAll("*").remove();
		if (!input.positions.length) return;
		const pathD = carpetPositionsToPathD(input.positions);
		g.append("path")
			.attr("class", "carpet-path")
			.style("fill", "rgba(0, 0, 0, 0.4)")
			.attr("shape-rendering", "crispEdges")
			.attr("d", pathD);
	}

	drawPath(input: DrawPathInput): void {
		const layer = input.pathLayer ?? "main";
		const group = this.pathGroupByLayer[layer];
		group.selectAll("*").remove();
		const pathD = segmentsToPathD(input.segments);
		if (!pathD) return;
		const strokeWidth =
			layer === "mop"
				? this.opts.pathMopWidth
				: layer === "main"
					? this.opts.pathMainWidth
					: this.opts.pathBackwashWidth;
		group
			.append("path")
			.attr("class", PATH_LAYER_CLASS[layer])
			.attr("d", pathD)
			.style("fill", "none")
			.style("stroke", input.stroke)
			.style("stroke-width", `${strokeWidth}px`)
			.style("stroke-linecap", "round")
			.style("stroke-linejoin", "round")
			.style("stroke-dasharray", input.dashed ? "4, 8" : null);
	}

	drawRobot(input: { x: number; y: number; angle: number }): void {
		const g = this.opts.groups.robotGroup;
		g.selectAll("*").remove();
		const size = this.opts.robotSize;
		const angle = -(input.angle ?? 0) + 90;
		g.append("image")
			.attr("class", "robot")
			.attr("href", this.opts.robotImageHref)
			.attr("width", size)
			.attr("height", size)
			.attr(
				"transform",
				`translate(${input.x}, ${input.y}) rotate(${angle}) translate(${-size / 2}, ${-size / 2})`
			);
	}

	drawCharger(input: { x: number; y: number }): void {
		const g = this.opts.groups.chargerGroup;
		g.selectAll("*").remove();
		const size = this.opts.chargerSize;
		g.append("image")
			.attr("class", "charger")
			.attr("href", this.opts.chargerImageHref)
			.attr("width", size)
			.attr("height", size)
			.attr("x", input.x - size / 2)
			.attr("y", input.y - size / 2);
	}

	drawGoToPin(input: { x: number; y: number }): void {
		const g = this.opts.groups.pinGroup;
		const pinW = this.opts.pinWidth;
		const pinH = this.opts.pinHeight;
		const pinYOffset = this.opts.pinYOffset;
		g.select("image.goto-pin")
			.attr("x", input.x - pinW / 2)
			.attr("y", input.y - (pinH - pinYOffset))
			.attr("width", pinW)
			.attr("height", pinH)
			.attr("data-center-x", String(input.x))
			.attr("data-center-y", String(input.y))
			.style("display", null)
			.style("opacity", "1");
	}

	drawObstacles(items: DrawObstacleInput[]): void {
		const g = this.opts.groups.obstacleGroup;
		g.selectAll(".obstacle-group").remove();
		if (!items.length) return;
		const bgRadius = this.opts.obstacleRadius * 1.1;
		const baseUrl = this.opts.obstacleAssetBaseUrl;
		const obstacleFileName = this.opts.obstacleFileName;
		const obstacleFileNameAlt = this.opts.obstacleFileNameAlt;
		const fallbackUrl = baseUrl + obstacleFileName("18");
		const mapping = this.opts.obstacleMapping;
		const onObstacleClick = this.opts.onObstacleClick;

		const groups = g.selectAll(".obstacle-group").data(items);

		groups.exit().remove();

		const enter = groups
			.enter()
			.append("g")
			.attr("class", "obstacle-group")
			.style("cursor", onObstacleClick ? "pointer" : "default")
			.attr("transform", (d) => `translate(${d.x}, ${d.y})`);

		if (onObstacleClick) {
			enter.on("click", function (event: MouseEvent, d: DrawObstacleInput) {
				event.stopPropagation();
				onObstacleClick(event, d.obstacleData ?? d);
			});
		}

		enter
			.append("circle")
			.attr("class", "obstacle-bg")
			.style("display", (d) => d.hideBackground ? "none" : null)
			.attr("r", bgRadius)
			.attr("fill", "rgba(100, 100, 100, 0.2)")
			.attr("stroke", "white")
			.attr("stroke-width", 0.5);

		enter
			.append("image")
			.attr("class", "obstacle-icon")
			.attr("width", (d) => d.imageSize ?? this.opts.obstacleImageSize)
			.attr("height", (d) => d.imageSize ?? this.opts.obstacleImageSize)
			.attr("x", (d) => -(d.imageSize ?? this.opts.obstacleImageSize) / 2)
			.attr("y", (d) => -(d.imageSize ?? this.opts.obstacleImageSize) / 2)
			.attr("href", (d) => d.imageHref || fallbackUrl)
			.each(function (this: SVGImageElement, d: DrawObstacleInput) {
				if (d.imageHref) return;
				const suffix = typeof d.typeOrSuffix === "number" ? (mapping[d.typeOrSuffix] ?? "18") : d.typeOrSuffix;
				if (suffix === "18") return;
				const primaryUrl = baseUrl + obstacleFileName(suffix);
				const altUrl = baseUrl + obstacleFileNameAlt(suffix);
				const el = this;
				const img = new Image();
				const tryAlt = () => {
					img.onload = () => {
						d3.select(el).attr("href", altUrl);
					};
					img.onerror = () => {};
					img.src = altUrl;
				};
				img.onload = () => {
					d3.select(el).attr("href", primaryUrl);
				};
				img.onerror = tryAlt;
				img.src = primaryUrl;
			});

		enter.merge(groups as d3.Selection<SVGGElement, DrawObstacleInput, SVGGElement, unknown>).attr("transform", (d) => `translate(${d.x}, ${d.y})`);
	}

	drawRoomLabels(labels: DrawRoomLabelInput[]): void {
		const g = this.opts.groups.roomNameGroup;
		g.selectAll("g.room-label").remove();
		if (!labels.length) return;
		const sel = g.selectAll("g.room-label").data(labels);
		sel.exit().remove();
		const enter = sel.enter()
			.append("g")
			.attr("class", "room-label")
			.style("pointer-events", "none");

		enter.append("circle").attr("class", "room-label-bubble");
		enter.append("image").attr("class", "room-label-icon");
		enter.append("text")
			.attr("class", "room-name")
			.style("font-weight", "900")
			.style("font-size", "12px")
			.style("stroke-width", "2.5px")
			.style("paint-order", "stroke")
			.attr("shape-rendering", "geometricPrecision");
		enter.append("circle").attr("class", "room-label-badge");
		enter.append("text")
			.attr("class", "room-label-badge-text")
			.style("font-weight", "900")
			.style("font-size", "9px");

		const merged = enter.merge(sel as d3.Selection<SVGGElement, DrawRoomLabelInput, SVGGElement, unknown>)
			.attr("data-x", (d) => String(d.x))
			.attr("data-y", (d) => String(d.y))
			.attr("transform", (d) => `translate(${d.x}, ${d.y})`);

		merged.each(function (d: DrawRoomLabelInput) {
			const label = d3.select(this);
			const hasBubble = !!d.iconHref || !!d.bubbleFill || !!d.badgeText;
			const bubbleRadius = d.bubbleRadius ?? 6;
			const iconSize = d.iconSize ?? 7;
			const gap = d.gap ?? 5;
			const bubbleCenterX = d.bubbleCenterOffsetX ?? 0;
			const textX = d.textOffsetX ?? (hasBubble ? bubbleRadius + gap : 0);
			const badgeText = d.badgeText?.trim() || "";
			const badgeCenterX = d.badgeCenterOffsetX ?? (hasBubble ? bubbleCenterX - 3 : 0);
			const badgeCenterY = d.badgeCenterOffsetY ?? 12;

			label.select<SVGCircleElement>("circle.room-label-bubble")
				.style("display", hasBubble ? null : "none")
				.attr("cx", bubbleCenterX)
				.attr("cy", 0)
				.attr("r", bubbleRadius)
				.style("fill", d.bubbleFill || "#000")
				.style("stroke", d.bubbleStroke || "#fff")
				.style("stroke-width", "1px");

			label.select<SVGImageElement>("image.room-label-icon")
				.style("display", d.iconHref ? null : "none")
				.attr("href", d.iconHref || null)
				.attr("x", bubbleCenterX - iconSize / 2)
				.attr("y", -iconSize / 2)
				.attr("width", iconSize)
				.attr("height", iconSize);

			label.select<SVGTextElement>("text.room-name")
				.text(d.text)
				.attr("x", textX)
				.attr("y", 0)
				.attr("text-anchor", hasBubble ? "start" : "middle")
				.attr("dominant-baseline", "middle")
				.style("fill", d.textFill || "#000")
				.style("stroke", "white");

			label.select<SVGCircleElement>("circle.room-label-badge")
				.style("display", badgeText ? null : "none")
				.attr("cx", badgeCenterX)
				.attr("cy", badgeCenterY)
				.attr("r", 5)
				.style("fill", "rgba(111,111,116,0.95)");

			label.select<SVGTextElement>("text.room-label-badge-text")
				.style("display", badgeText ? null : "none")
				.text(badgeText)
				.attr("x", badgeCenterX)
				.attr("y", badgeCenterY)
				.attr("text-anchor", "middle")
				.attr("dominant-baseline", "middle")
				.style("fill", "white");
		});
	}

	drawActiveZones(zones: DrawZoneRectInput[]): void {
		const overlay = this.opts.groups.zonesOverlayGroup;
		if (!overlay) return;
		overlay.selectAll(".active-zone").remove();
		for (const z of zones) {
			const x = Math.min(z.x, z.x + z.w);
			const y = Math.min(z.y, z.y + z.h);
			const w = Math.abs(z.w);
			const h = Math.abs(z.h);
			overlay
				.append("rect")
				.attr("class", "active-zone")
				.attr("x", x)
				.attr("y", y)
				.attr("width", w)
				.attr("height", h)
				.style("fill", z.fill)
				.style("stroke", z.stroke)
				.style("stroke-width", "4px");
		}
	}

	drawRestrictedZones(zones: DrawZoneRectInput[], virtualWalls: DrawVirtualWallInput[]): void {
		const overlay = this.opts.groups.zonesOverlayGroup;
		if (!overlay) return;
		overlay.selectAll(".restricted-zone").remove();
		overlay.selectAll(".virtual-wall").remove();
		for (const z of zones) {
			const x = Math.min(z.x, z.x + z.w);
			const y = Math.min(z.y, z.y + z.h);
			const w = Math.abs(z.w);
			const h = Math.abs(z.h);
			overlay
				.append("rect")
				.attr("class", "restricted-zone")
				.attr("x", x)
				.attr("y", y)
				.attr("width", w)
				.attr("height", h)
				.style("fill", z.fill)
				.style("stroke", z.stroke)
				.style("stroke-width", `${w ? (1 * VISUAL_BLOCK_SIZE) / 2 : 0}px`);
		}
		for (const w of virtualWalls) {
			overlay
				.append("line")
				.attr("class", "virtual-wall")
				.attr("x1", w.x1)
				.attr("y1", w.y1)
				.attr("x2", w.x2)
				.attr("y2", w.y2)
				.style("stroke", w.stroke)
				.style("stroke-width", `${w.lineWidth}px`);
		}
	}

	drawPredictedPath(input: DrawPredictedPathInput): void {
		const overlay = this.opts.groups.zonesOverlayGroup;
		if (!overlay || !input.points.length) return;
		overlay.selectAll(".predicted-path").remove();
		const pathD = input.points.reduce((acc, p, i) => (i === 0 ? `M${p.x},${p.y}` : `${acc} L${p.x},${p.y}`), "");
		overlay
			.append("path")
			.attr("class", "predicted-path")
			.attr("d", pathD)
			.style("fill", "none")
			.style("stroke", input.stroke)
			.style("stroke-width", `${input.lineWidth}px`)
			.style("stroke-dasharray", input.dashArray.join(","));
	}
}
