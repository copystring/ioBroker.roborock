import { createCanvas, Image, loadImage } from "@napi-rs/canvas";
import { robotToPixel } from "../../../common/coordTransformation";
import { B01Area, B01DeviceStatus, B01MapData, B01Point } from "./types";

// --- CONSTANTS from original Roborock modules ---
import {
	APP_COLORS,
	CleanModeType,
	JOB_STATUS,
	PALETTE,
	ROOM_TYPE_MAP,
	SC_MAP_COLORS,
	SCCleanType,
	SUBTITLE_STATUS
} from "./constants";

export class MapBuilder {
	private readonly SCALE = 8; // High Res output
	private assets: { robot: Record<string, Image>; charger: Record<string, Image>; rooms: Record<string, Image> } | null = null;
	private assetsLoaded = false;
	private adapter: any; // Optional reference to adapter for logging
	private offsetCache = new Map<any, { x: number; y: number }>();

	constructor(adapter?: any) {
		this.adapter = adapter;
	}

	private async loadAssets(model?: string, duid?: string): Promise<void> {
		if (this.assetsLoaded) return;
		this.assets = { rooms: {}, robot: {}, charger: {} };

		try {
			// assets/<model> in adapter file storage
			const searchPaths: string[] = [];

			if (model && this.adapter) {
				const modelPath = `assets/${model}`;
				try {
					await this.adapter.readDirAsync(this.adapter.name, modelPath);
					searchPaths.push(modelPath);
				} catch { /* dir missing */ }
			}

			const commonModels = ["roborock.vacuum.a147", "roborock.vacuum.sc01", "roborock.vacuum.a70"];
			for (const m of commonModels) {
				if (this.adapter) {
					const p = `assets/${m}`;
					if (!searchPaths.includes(p)) {
						try {
							await this.adapter.readDirAsync(this.adapter.name, p);
							searchPaths.push(p);
						} catch { /* dir missing */ }
					}
				}
			}

			const subdirsToTry = ["drawable-mdpi", "drawable-hdpi", "drawable-xhdpi", "drawable-xxhdpi", "raw"];
			const findAssetInPaths = async (candidates: string[]) => {
				for (const dir of searchPaths) {
					for (const c of candidates) {
						const rootPath = `${dir}/${c}`;
						if (await this.adapter.fileExistsAsync(this.adapter.name, rootPath)) {
							const res = await this.adapter.readFileAsync(this.adapter.name, rootPath);
							const buf = typeof res === "object" && res !== null && "file" in res ? (res as { file: Buffer }).file : Buffer.from(res as ArrayBuffer);
							return await loadImage(buf);
						}
					}
					try {
						const entries = await this.adapter.readDirAsync(this.adapter.name, dir);
						const dirs: string[] = Array.isArray(entries)
							? entries
							: (entries as { dirs?: string[] }).dirs ?? [];
						const subdirs = dirs.filter(d => d.startsWith("drawable-") || d === "raw");
						for (const subdir of subdirs.length > 0 ? subdirs : subdirsToTry) {
							for (const c of candidates) {
								const p = `${dir}/${subdir}/${c}`;
								if (await this.adapter.fileExistsAsync(this.adapter.name, p)) {
									const res = await this.adapter.readFileAsync(this.adapter.name, p);
									const buf = typeof res === "object" && res !== null && "file" in res ? (res as { file: Buffer }).file : Buffer.from(res as ArrayBuffer);
									return await loadImage(buf);
								}
							}
						}
					} catch { /* ignore */ }
				}
				return null;
			};

			// --- 1. Load Robot Assets (theme_dark preference) ---
			// Load B01-specific robot asset
			const b01RobotImg = await findAssetInPaths(["src_sc_components_resource_images_common_robot.png"]);
			if (b01RobotImg) this.assets!.robot["b01_fixed"] = b01RobotImg;

			const robotStates = ["charging", "cleaning", "error", "sleeping", "offline", "waiting"];
			for (const state of robotStates) {
				const candidates = [
					// sc01 style
					`src_sc_components_resource_images_common_robot_${state === "charging" ? "rechage" : (state === "error" ? "fault" : state)}.png`,
					`src_sc_components_resource_images_common_robot_${state === "charging" ? "rechage" : (state === "error" ? "fault" : state)}_dark.png`,
					// a147 style
					`projects_comroborocktanos_theme_dark_resources_robot_icon_${state}.png`,
					`projects_comroborocktanos_resources_robot_icon_${state}.png`,
					`robot_icon_${state}.png`
				];
				const img = await findAssetInPaths(candidates);
				if (img) this.assets!.robot[state] = img;
			}
			// Robot Default
			if (!Object.keys(this.assets!.robot).length) {
				const fallback = await findAssetInPaths([
					"projects_comroborocktanos_theme_dark_resources_robot_icon_cleaning.png",
					"projects_comroborocktanos_resources_robot_icon_cleaning.png"
				]);
				if (fallback) this.assets!.robot["cleaning"] = fallback;
			}

			// --- 2. Load Charger Assets ---
			const chargerCandidates = [
				// Android style asset
				"src_sc_components_resource_images_common_charge_android.png",
				// sc01 style
				"src_sc_components_resource_images_home_home_charge_charging.png",
				"src_sc_components_resource_images_home_home_charge_charging_dark.png",
				"src_sc_components_resource_images_home_home_charge_reccharg.png",
				// a147 style
				"projects_comroborocktanos_resources_charger_special.png",
				"projects_comroborocktanos_resources_charger_bubble_special.png",
				"projects_comroborocktanos_resources_charger_bubble_normal.png",
				"projects_comroborocktanos_theme_dark_resources_ic_home_topazs_charge_light.png"
			];
			const chargerImg = await findAssetInPaths(chargerCandidates);
			if (chargerImg) this.assets!.charger["normal"] = chargerImg;
			else if (this.adapter) this.adapter.rLog("MapManager", duid, "Error", undefined, undefined, "Charger asset NOT found.", "error");

			// --- 3. Load Room Icons (Bubble Tags) ---
			// The user has `roomtag_bubble_X.png`. We load specific IDs (1-32 is a safe range for room types)
			// plus the mapped names from ROOM_TYPE_MAP just in case.
			const roomIdsToLoad = Array.from({ length: 32 }, (_, i) => i + 1); // 1 to 32

			for (const id of roomIdsToLoad) {
				// IMPORTANT: The 'tag' version is the white symbol without the blue bubble background.
				// We prioritize it so our colored background (circle) is visible.
				const candidates = [
					`projects_comroborocktanos_resources_roomtag_bubble_tag_${id}.png`,
					`projects_comroborocktanos_resources_roomtag_bubble_${id}.png`,
					`roomtag_bubble_tag_${id}.png`,
					`roomtag_bubble_${id}.png`
				];
				const img = await findAssetInPaths(candidates);
				if (img) {
						this.assets!.rooms[`bubble_${id}`] = img;
						// B01 IDs are often 2000 + assetID
						this.assets!.rooms[`bubble_${id + 2000}`] = img;
				}
			}

			// Load numbered robot icons from snippet
			const snippetRobotIcons = [85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104];
			for (const id of snippetRobotIcons) {
				const candidates = [
					`projects_comroborocktanos_resources_robot_icon_${id}.png`,
					`robot_icon_${id}.png`
				];
				const img = await findAssetInPaths(candidates);
				if (img) {
						this.assets!.robot[`icon_${id}`] = img;
				}
			}

			// Also try the named ones from ROOM_TYPE_MAP (kitchen, bedroom, etc) IF they exist in some form,
			// though file listing suggests they rely on ID-based bubbles.
			// Also try the named ones from ROOM_TYPE_MAP (kitchen, bedroom, etc) IF they exist in some form
			for (const name of Object.values(ROOM_TYPE_MAP)) {
				if (!name || name === "other") continue;
				const candidates = [
					`src_sc_components_resource_images_maproom_select_${name}.png`,
					`src_sc_components_resource_images_mapedit_map_edit_${name}.png`,
					`src_sc_components_resource_images_maproom_select_${name}_select.png`
				];
				const img = await findAssetInPaths(candidates);
				if (img) this.assets!.rooms[name] = img;
			}
			// Load 'other' fallback
			const otherImg = await findAssetInPaths([
				"src_sc_components_resource_images_maproom_select_other.png",
				"projects_comroborocktanos_resources_roomtag_bubble_tag_1.png"
			]);
			if (otherImg) this.assets!.rooms["other"] = otherImg;

			if (Object.keys(this.assets!.robot).length === 0 && this.adapter) {
				this.adapter.rLog("MapManager", duid, "Error", undefined, undefined, "No Robot assets found.", "error");
			}
		} catch (e: any) {
			if (this.adapter) this.adapter.rLog("MapManager", duid, "Error", undefined, undefined, `Error loading assets: ${e.message}`, "error");
		}
		this.assetsLoaded = true;
	}

	private getRobotIconAssetKey(status: B01DeviceStatus): string {
		// Check for B01 specific asset
		if (this.assets?.robot?.["b01_fixed"]) {
			return "b01_fixed";
		}

		const { deviceState, deviceWorkMode, deviceCleanMode, isDustCollect, deviceFault } = status;
		const isDarkMode = false; // Default to light mode

		let key = "cleaning"; // Default fallback icon

		// Select robot icon based on current operative state
		if (isDustCollect) {
			return isDarkMode ? "icon_85" : "icon_86";
		}

		if (deviceState === SUBTITLE_STATUS.WAIT_INSTRUCTION || deviceState === SUBTITLE_STATUS.IDEL) {
			return "icon_87";
		}

		if (deviceState === SUBTITLE_STATUS.RECHARGING || deviceState === SUBTITLE_STATUS.CHARGE_FULL || deviceState === SUBTITLE_STATUS.BREAK_CHARGING) {
			return "icon_88";
		}

		// Fault handling
		const isFault = deviceFault && deviceFault > 0; // Simplified
		if (isFault) {
			return isDarkMode ? "icon_89" : "icon_90";
		}

		if (deviceState === SUBTITLE_STATUS.SLEEP) {
			return isDarkMode ? "icon_91" : "icon_92";
		}

		// WorkMode logic
		const isCleaning = [JOB_STATUS.CLEANING, JOB_STATUS.ZONED_CLEANING, JOB_STATUS.SPOT_CLEANING].includes(deviceWorkMode);
		const isPause = deviceWorkMode === JOB_STATUS.PAUSED;
		const isGoCharging = deviceWorkMode === 6; // RETURNING
		const isBuildModel = status.deviceCustomType === CleanModeType.ALL; // Map custom type to icon

		if (isBuildModel && isCleaning) {
			key = "icon_93";
		}

		if (isGoCharging || deviceState === SUBTITLE_STATUS.BREAK_RECHARGING) {
			key = isDarkMode ? "icon_94" : "icon_95";
		}

		// Additional operative state logic (Segment/Point modes)

		if (deviceState === SUBTITLE_STATUS.PAUSE) {
			key = isDarkMode ? "icon_96" : "icon_97";
		}

		if (isCleaning || isPause) {
			if (deviceState === SUBTITLE_STATUS.PAUSE) {
				key = isDarkMode ? "icon_96" : "icon_97";
			} else {
				key = isDarkMode ? "icon_98" : "icon_99";
			}
		}

		if (deviceState === SUBTITLE_STATUS.PAUSE) {
			key = isDarkMode ? "icon_100" : "icon_101";
		}

		if (isCleaning) {
			if (deviceCleanMode === SCCleanType.clean) key = "icon_102";
			if (deviceCleanMode === SCCleanType.both) key = "icon_103";
			if (deviceCleanMode === SCCleanType.mop) key = "icon_104";
		}

		if (this.adapter) this.adapter.rLog("MapManager", undefined, "Debug", undefined, undefined, `Selected Robot Icon: ${key} for state=${deviceState}, work=${deviceWorkMode}, clean=${deviceCleanMode}`, "debug");

		return key;
	}

	private getVisibleOffset(img: any): { x: number; y: number } {
		if (this.offsetCache.has(img)) return this.offsetCache.get(img)!;

		const w = img.naturalWidth;
		const h = img.naturalHeight;
		const cnv = createCanvas(w, h);
		const ctx = cnv.getContext("2d");
		ctx.drawImage(img, 0, 0);
		const data = ctx.getImageData(0, 0, w, h).data;

		let minX = w, maxX = 0, minY = h, maxY = 0;
		let found = false;

		for (let y = 0; y < h; y++) {
			for (let x = 0; x < w; x++) {
				const alpha = data[(y * w + x) * 4 + 3];
				if (alpha > 200) { // Threshold (Ignore Shadows)
					if (x < minX) minX = x;
					if (x > maxX) maxX = x;
					if (y < minY) minY = y;
					if (y > maxY) maxY = y;
					found = true;
				}
			}
		}

		if (!found) {
			this.offsetCache.set(img, { x: 0, y: 0 });
			return { x: 0, y: 0 };
		}

		// Visible Center
		const visibleCX = (minX + maxX) / 2;
		const visibleCY = (minY + maxY) / 2;

		// Geometric Center
		const geoCX = w / 2;
		const geoCY = h / 2;

		// We want Visible Center to be at (0,0) relative to drawn POS.
		// Currently Geometric Center is at (0,0) (due to -w/2 translate).
		// Correction: Shift so Visible Center matches Geometric Center
		// Offset = Geometric - Visible
		const offsetX = geoCX - visibleCX;
		const offsetY = geoCY - visibleCY;

		const result = { x: offsetX, y: offsetY };
		this.offsetCache.set(img, result);

		if (this.adapter) {
			this.adapter.rLog("MapManager", undefined, "Debug", undefined, undefined, `Auto-Trim: Found Bounds [${minX}, ${minY}, ${maxX}, ${maxY}] -> Offset(${offsetX}, ${offsetY}) for ${w}x${h} Image`, "debug");
		}

		return result;
	}

	private drawMapAsset(
		ctx: any,
		pos: B01Point,
		phi: number,
		img: any,
		unitWidth: number,
		offsetX: number,
		offsetY: number,
		toPixel: (wx: number, wy: number) => { x: number; y: number }
	) {
		const pt = toPixel(pos.x, pos.y);
		const rx = pt.x;
		const ry = pt.y;

		const scale = unitWidth / img.naturalWidth;
		const w = unitWidth;
		const h = img.naturalHeight * scale;

		// Auto-Center Logic
		const autoOffset = this.getVisibleOffset(img);
		// Scale the offset to map dimensions
		const finalOffsetX = offsetX + (autoOffset.x * scale);
		const finalOffsetY = offsetY + (autoOffset.y * scale);

		ctx.save();
		ctx.translate(rx + finalOffsetX, ry + finalOffsetY);
		ctx.rotate(-(phi * Math.PI) / 180);
		ctx.drawImage(img, -w / 2, -h / 2, w, h);
		ctx.restore();
	}

	public async buildMap(data: B01MapData, robotModel: string, duid?: string, deviceStatus?: B01DeviceStatus): Promise<Buffer> {
		const startMsg = `Starting Build. Model: ${robotModel}, GridLen: ${data.mapGrid?.length}`;
		if (this.adapter) this.adapter.rLog("MapManager", duid, "Debug", "B01", undefined, startMsg, "debug");

		await this.loadAssets(robotModel, duid);

		let { width, height } = { width: data.header.sizeX, height: data.header.sizeY };

		// Fallback dimensions logic
		if (width === 0 || height === 0) {
			const len = data.mapGrid.length;
			if (len > 0) {
				const size = Math.ceil(Math.sqrt(len));
				width = size;
				height = size;
			} else {
				width = 256;
				height = 256;
			}
		}

		const canvas = createCanvas(width * this.SCALE, height * this.SCALE);
		const ctx = canvas.getContext("2d");

		// Disable anti-aliasing for pixel-perfect walls
		ctx.imageSmoothingEnabled = false;
		ctx.scale(this.SCALE, this.SCALE);

		// 1. Fill Background
		ctx.fillStyle = "#000000"; // Black background
		ctx.fillRect(0, 0, width, height);

		// 2. Render Map Pixels (Offscreen Canvas)
		const roomColorMap: Record<number, number> = {};
		if (data.rooms) {
			data.rooms.forEach(r => {
				if (r.colorId !== undefined) roomColorMap[r.roomId] = r.colorId;
			});
		}

		// Create offscreen canvas for correct scaling (putImageData ignores transforms)
		const tempCanvas = createCanvas(width, height);
		const tempCtx = tempCanvas.getContext("2d");
		const imgData = tempCtx.createImageData(width, height);
		const buffer = imgData.data;

		const COLOR_SET = SC_MAP_COLORS.LEVEL_1;

		// Helper to convert hex to [r,g,b,a]
		const hexToBytes = (hex: string): [number, number, number, number] => {
			if (!hex || !hex.startsWith("#")) return [0, 0, 0, 0];
			const r = parseInt(hex.slice(1, 3), 16);
			const g = parseInt(hex.slice(3, 5), 16);
			const b = parseInt(hex.slice(5, 7), 16);
			// Fix alpha logic (hex.length 9 is #RRGGBBAA)
			const a = hex.length === 9 ? parseInt(hex.slice(7, 9), 16) : 255;
			return [r, g, b, a];
		};

		const wallColor = hexToBytes(PALETTE.WALL);
		const floorColor = hexToBytes(PALETTE.FLOOR);
		const unknownColor = hexToBytes(PALETTE.UNKNOWN);
		// Pre-compute room colors
		const roomColors = COLOR_SET.map((c: string) => hexToBytes(c));

		for (let i = 0; i < data.mapGrid.length; i++) {
			const val = data.mapGrid[i];
			if (val === 0) continue; // Skip transparency (default 0)

			const x = i % width;
			const y = Math.floor(i / width);
			const cy = height - 1 - y;
			const idx = (cy * width + x) * 4;

			let color: [number, number, number, number] | undefined;

			if (val >= 128) { // Wall
				color = wallColor;
			} else if (val === 127 || val === 1) { // Floor
				color = floorColor;
			} else { // Room
				const colorIdx = this.getRoomFillColorIndex(val, roomColorMap[val]);
				color = roomColors[colorIdx % roomColors.length] || unknownColor;
			}

			if (color) {
				buffer[idx] = color[0];
				buffer[idx + 1] = color[1];
				buffer[idx + 2] = color[2];
				buffer[idx + 3] = color[3];
			}
		}

		tempCtx.putImageData(imgData, 0, 0);

		// Draw the 1x1 map onto the 8x8 main canvas (scaled)
		ctx.drawImage(tempCanvas, 0, 0);

		const toPixel = (wx: number, wy: number) => {
			return robotToPixel({
				x: wx,
				y: wy,
				minX: data.header.minX,
				minY: data.header.minY,
				sizeY: data.header.sizeY,
				resolution: data.header.resolution,
				scale: 1
			});
		};

		// 3. Zones & Walls
		const drawNoGoZone = (area: B01Area, isForbidden: boolean) => {
			if (!area || !area.points || area.points.length < 4) return;
			const lineWidth = 1.0;
			// 1. Geometry Calculation
			const p = area.points.map(pt => toPixel(pt.x, pt.y));
			const p0 = p[0], p1 = p[1], p2 = p[2], p3 = p[3];
			const getDist = (a: any, b: any) => Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
			const width = getDist(p0, p3);
			const height = getDist(p0, p1);

			// Vertical Shift -1.0
			const PIXEL_SNAP = 0.0625;
			const OFFSET_Y = -1.0 + PIXEL_SNAP;
			const OFFSET_X = 0.00 + PIXEL_SNAP;

			const centerX = (p0.x + p2.x) / 2 + OFFSET_X;
			const centerY = (p0.y + p2.y) / 2 + OFFSET_Y;
			const angle = Math.atan2(p3.y - p0.y, p3.x - p0.x);
			const spineW = width;
			const spineH = height;

			ctx.save();
			ctx.translate(centerX, centerY);
			ctx.rotate(angle);

			ctx.beginPath();
			ctx.rect(-spineW / 2, -spineH / 2, spineW, spineH);

			if (isForbidden) {
				ctx.strokeStyle = "#FF453A"; // Roborock Red
				ctx.fillStyle = "rgba(255, 69, 58, 0.15)";
			} else {
				ctx.strokeStyle = "#007AFF"; // Roborock Blue
				ctx.fillStyle = "rgba(0, 122, 255, 0.15)";
			}

			ctx.lineWidth = lineWidth;
			ctx.lineJoin = "miter";
			ctx.lineCap = "butt";

			ctx.fill();
			ctx.stroke();
			ctx.restore();
		};

		const drawVirtualWall = (points: B01Point[]) => {
			if (!points || points.length < 2) return;
			const lineWidth = 1.0;
			ctx.save();
			ctx.beginPath();
			points.forEach((p, idx) => {
				const pix = toPixel(p.x, p.y);
				pix.y -= 1.0; // Vertical Shift (-1.0)
				if (idx===0) ctx.moveTo(pix.x, pix.y);
				else ctx.lineTo(pix.x, pix.y);
			});
			ctx.strokeStyle = "#FF453A";
			ctx.lineWidth = lineWidth;
			ctx.lineCap = "butt";
			ctx.lineJoin = "miter";
			ctx.stroke();
			ctx.restore();
		};

		// Render Zones
		if (data.areasInfo) data.areasInfo.forEach(area => drawNoGoZone(area, false));
		if (data.virtualWalls) {
			data.virtualWalls.forEach(wall => {
				if (wall.points && wall.points.length >= 4) {
					drawNoGoZone(wall, true);
				} else {
					drawVirtualWall(wall.points);
				}
			});
		}
		if (data.recmForbitZone) data.recmForbitZone.forEach(zone => drawNoGoZone(zone, true));

		// Render Carpets
		if (data.carpetInfo) {
			data.carpetInfo.forEach(carpet => {
				if (carpet.points && carpet.points.length > 0) {
					let sumX = 0, sumY = 0;
					carpet.points.forEach(p => {
						sumX += p.x;
						sumY += p.y;
					});
					const cx = sumX / carpet.points.length;
					const cy = sumY / carpet.points.length;
					const pt = toPixel(cx, cy);
					ctx.fillStyle = APP_COLORS.circleColor;
					ctx.beginPath();
					ctx.arc(pt.x, pt.y, 2, 0, 2 * Math.PI);
					ctx.fill();
				}
			});
		}

		// 4. Trajectory (History) - Segmented Logic
		if (data.history && data.history.length > 0) {
			const points = data.history;
			const segments: { type: string, points: {x: number, y: number}[] }[] = [];
			let currentSegment: { type: string, points: {x: number, y: number}[] } | null = null;

			points.forEach((p, idx) => {
				const pt = toPixel(p.x, p.y);
				const prevP = points[idx - 1];
				let breakSegment = false;
				if (prevP) {
					const dist = Math.sqrt(Math.pow(p.x - prevP.x, 2) + Math.pow(p.y - prevP.y, 2));
					if (dist > 0.5) breakSegment = true; // Jump detection
				}

				const type = (p.update === 5) ? "solidPath" :
							 (p.update === 4) ? "mopPaths" :
							 (p.update === 6) ? "mixPaths" : "dottPath";

				if (!currentSegment || currentSegment.type !== type || breakSegment) {
					currentSegment = { type, points: [] };
					segments.push(currentSegment);
				}
				currentSegment.points.push(pt);
			});

			const drawPathSegment = (seg: any, color: string, width: number, dash: number[] = []) => {
				if (seg.points.length < 2) return;
				ctx.beginPath();
				ctx.strokeStyle = color;
				ctx.lineWidth = width;
				ctx.setLineDash(dash);
				ctx.lineCap = "round";
				ctx.lineJoin = "round";
				ctx.moveTo(seg.points[0].x, seg.points[0].y);
				for (let i = 1; i < seg.points.length; i++) ctx.lineTo(seg.points[i].x, seg.points[i].y);
				ctx.stroke();
			};

			// Pass 1: Background Highlights (Mop/Mix)
			segments.forEach(seg => {
				if (seg.type === "mopPaths" || seg.type === "mixPaths") drawPathSegment(seg, "#FFFFFF66", 3.3);
			});

			// Pass 2: Foregrounds
			segments.forEach(seg => {
				if (seg.type === "solidPath") drawPathSegment(seg, "rgba(255, 255, 255, 1)", 0.75);
				else if (seg.type === "mopPaths") drawPathSegment(seg, "#FFFFFF99", 0.75);
				else if (seg.type === "mixPaths") drawPathSegment(seg, "#FFFFFF", 0.75);
				else if (seg.type === "dottPath") drawPathSegment(seg, "rgba(255, 255, 255, 0.6)", 0.45, [1, 2]);
			});
			ctx.setLineDash([]);
		}

		// 5. Charger Drawing logic from User Script
		if (data.chargerPos) {
			const chargerImg = this.assets?.charger?.["normal"];

			if (chargerImg) {
				const drawW = this.SCALE * (21 / 32) * 1.1;

				this.drawMapAsset(
					ctx,
					data.chargerPos,
					data.chargerPos.phi,
					chargerImg,
					drawW,
					0, // Zero Offset
					0, // Zero Offset
					toPixel
				);
			} else {
				// Fallback
				const { x: fx, y: fy } = toPixel(data.chargerPos.x, data.chargerPos.y);
				ctx.fillStyle = "#4CAF50";
				ctx.strokeStyle = "white";
				ctx.lineWidth = 1;
				ctx.beginPath();
				ctx.arc(fx, fy, 4, 0, 2 * Math.PI);
				ctx.fill();
				ctx.stroke();
				ctx.fillStyle = "white";
				ctx.font = "6px sans-serif";
				ctx.textAlign = "center";
				ctx.fillText("⚡", fx, fy + 2);
			}
		}

		// 6. Robot Drawing logic
		if (data.robotPos) {
			const status = deviceStatus || {
				deviceState: SUBTITLE_STATUS.IDEL,
				deviceWorkMode: JOB_STATUS.IDLE,
				deviceCleanMode: SCCleanType.clean
			};

			// Logic to shift robot position when docked
			if (data.chargerPos) {
				const isChargingState = status.deviceState === 8 || status.deviceState === 6; // Charging or Returning

				if ((Math.abs(data.robotPos.x - data.chargerPos.x) < 0.2 && Math.abs(data.robotPos.y - data.chargerPos.y) < 0.2) || isChargingState) {
					const phi = data.chargerPos.phi || 0;
					const phiRad = (phi * Math.PI) / 180;
					// Shift Robot "Forward" from the charger center
					data.robotPos.x += 0.10 * Math.cos(phiRad);
					data.robotPos.y += 0.10 * Math.sin(phiRad);
				}
			}

			const assetKey = this.getRobotIconAssetKey(status);
			const robotImg = this.assets?.robot?.[assetKey] || this.assets?.robot?.[this.getRobotIconAssetKey(status)] || this.assets?.robot?.["cleaning"];

			if (robotImg) {
				const ROBOT_MAP_SIZE = this.SCALE * 1.1;
				this.drawMapAsset(
					ctx,
					data.robotPos,
					data.robotPos.phi || 0,
					robotImg,
					ROBOT_MAP_SIZE,
					0, // Zero Offset
					0, // Zero Offset
					toPixel
				);

				if (this.adapter && this.adapter.log) {
				}
			} else {
				// Fallback circle
				const { x: fx, y: fy } = toPixel(data.robotPos.x, data.robotPos.y);
				ctx.fillStyle = "#FFFFFF";
				ctx.shadowColor = "#00000040";
				ctx.shadowBlur = 2;
				ctx.beginPath();
				ctx.arc(fx, fy, 4.5, 0, 2 * Math.PI);
				ctx.fill();
				ctx.shadowBlur = 0;
			}
		} else {
			if (this.adapter) this.adapter.rLog("MapManager", duid, "Warn", "B01", undefined, "No Robot Position in Map Data", "warn");
		}

		// 7. Room Labels
		if (data.rooms) {
			const LABEL_SCALE = 0.5;
			const fontSize = 10 * LABEL_SCALE;
			ctx.font = `600 ${fontSize}px sans-serif`;
			ctx.textBaseline = "middle";
			const shadowColor = "#FFFFFFB2";
			const textColor = "#333333ee";
			const iconSize = 12 * LABEL_SCALE;
			const iconMargin = 4 * LABEL_SCALE;

			data.rooms.forEach(r => {
				// Debug Log for Room Data
				if (this.adapter) {
					this.adapter.rLog("MapManager", duid, "Debug", "B01", undefined, `Processing Room: ${r.roomName} (ID: ${r.roomTypeId}), LabelPos: ${JSON.stringify(r.labelPos)}`, "debug");
				}

				if (r.labelPos && r.roomName) {
					// 1. Determine Semantic Type: Priority = ID
					const finalType = ROOM_TYPE_MAP[r.roomTypeId || 0] || "other";

					// 2. Select Icon Asset
					// Priority 1: Asset matching Semantic Type (Name-derived or ID-derived)
					let roomIcon = this.assets?.rooms[finalType] || this.assets?.rooms[`bubble_${finalType}`];

					// Priority 2: Asset matching specific ID (if not found above)
					// Only use ID asset if we don't have a semantic override (or if semantic asset missing)
					if (!roomIcon) {
						roomIcon = this.assets?.rooms[`bubble_${r.roomTypeId}`];
					}

					// Priority 3: Fallback "other"
					if (!roomIcon && finalType === "other") {
						roomIcon = this.assets?.rooms["other"];
					}

					// 3. Select Color (Based STRICTLY on Room Color ID, not Name)
					const colorIdx = this.getRoomLabelColorIndex(r.colorId);
					const BG_COLOR_SET = SC_MAP_COLORS.ROOM_ICON_BG;
					const BORDER_COLOR_SET = SC_MAP_COLORS.ROOM_ICON_BORDER;

					const bgColor = BG_COLOR_SET[colorIdx % BG_COLOR_SET.length] || BG_COLOR_SET[0];
					const borderColor = BORDER_COLOR_SET[colorIdx % BORDER_COLOR_SET.length] || BORDER_COLOR_SET[0];

					if (this.adapter) {
						this.adapter.rLog("MapManager", duid, "Info", "B01", undefined, `Room: ${r.roomName} | ID: ${r.roomTypeId} | ColorId: ${r.colorId} -> BgColor: ${bgColor}`, "info");
					}

					const pt = toPixel(r.labelPos.x, r.labelPos.y);
					const textWidth = ctx.measureText(r.roomName).width;
					const totalWidth = iconSize + iconMargin + textWidth;

					let startX = pt.x - (totalWidth / 2);
					const centerY = pt.y;

					ctx.beginPath();
					ctx.arc(startX + iconSize / 2, centerY, iconSize / 2, 0, Math.PI * 2);
					ctx.fillStyle = bgColor;
					ctx.fill();
					ctx.strokeStyle = borderColor;
					ctx.lineWidth = 0.5 * LABEL_SCALE;
					ctx.stroke();

					if (roomIcon) {
						const imgSize = 10 * LABEL_SCALE; // Traced: 10px inside 12px
						ctx.drawImage(
							roomIcon,
							startX + (iconSize - imgSize) / 2,
							centerY - imgSize / 2,
							imgSize,
							imgSize
						);
					}

					startX += iconSize + iconMargin;
					const offset = 0.33 * LABEL_SCALE;
					ctx.textAlign = "left";
					ctx.fillStyle = shadowColor;
					ctx.fillText(r.roomName, startX - offset, centerY - offset);
					ctx.fillText(r.roomName, startX + offset, centerY + offset);
					ctx.fillStyle = textColor;
					ctx.fillText(r.roomName, startX, centerY);
				} else {
					if (this.adapter && this.adapter.log) {
						this.adapter.log.warn(`[MapBuilderB01] Skipping Room Label for ${r.roomName}: Missing labelPos`);
					}
				}
			});
		}

		ctx.fillStyle = "white";
		ctx.font = "2px sans-serif";
		ctx.textAlign = "center";
		// Explicit TEST string to verify code execution on map
		ctx.fillText("Complete Map (HQ 8x) - TEST MODE", width / 2, height + 4);

		return canvas.toBuffer("image/png");
	}
	private getRoomFillColorIndex(roomId: number, colorId?: number): number {
		if (colorId !== undefined) {
			return colorId > 0 ? colorId - 1 : 0;
		}
		return roomId > 0 ? roomId - 1 : 0;
	}

	private getRoomLabelColorIndex(colorId?: number): number {
		if (colorId !== undefined && colorId > 0) {
			return colorId - 1;
		}
		return 0;
	}
}
