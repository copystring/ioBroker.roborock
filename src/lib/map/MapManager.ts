import type { Roborock } from "../../main";
import { B01MapPipeline } from "./b01/B01MapPipeline";
import type { Q10PayloadClassification } from "./b01/B01MapPayloadClassifier";
import { MapBuilder as MapBuilderB01 } from "./b01/MapBuilder";
import { B01DeviceStatus, B01MapData, Q10RuntimeDebugSummary } from "./b01/types";
import { Q10MapBuilder } from "./q10/Q10MapBuilder";
import { Q10MapCreator } from "./q10/Q10MapCreator";
import { applyQ10PathOnlyToB01, mergeQ10PersistentState } from "./q10/Q10YxMapParser";
import { MapBuilder as MapBuilderV1 } from "./v1/MapBuilder";
import { MapDecryptor as MapDecryptorV1 } from "./v1/MapDecryptor";
import { MapParser as MapParserV1 } from "./v1/MapParser";

export class MapManager {
	private adapter: Roborock;
	public mapParser: MapParserV1;
	public mapCreator: MapBuilderV1;
	private pipelineB01: B01MapPipeline;
	private builderB01: MapBuilderB01;
	private creatorQ10: Q10MapCreator;
	private builderQ10: Q10MapBuilder;
	private q10StateByDevice = new Map<string, B01MapData>();
	private q10OverlaySeedByDevice = new Map<string, B01MapData>();
	private latestB01DeviceStatusByDevice = new Map<string, Partial<B01DeviceStatus>>();

	private static readonly NON_Q10_CLASSIFICATION: Q10PayloadClassification = {
		isQ10Payload: false,
		isLiveMapCandidate: false,
		payloadShape: "map",
		blobType: null,
		mapData: null,
		pathPoints: null
	};

	private static readonly EMPTY_Q10_OVERLAY_COUNTS = {
		virtualWalls: 0,
		forbidAreas: 0,
		mopAreas: 0,
		thresholdAreas: 0,
		eraseAreas: 0,
		carpetAreas: 0
	};

	constructor(adapter: Roborock) {
		this.adapter = adapter;
		this.mapParser = new MapParserV1(adapter);
		this.mapCreator = new MapBuilderV1(adapter);
		this.pipelineB01 = new B01MapPipeline(adapter);
		this.builderB01 = new MapBuilderB01(adapter);
		this.creatorQ10 = new Q10MapCreator(adapter);
		this.builderQ10 = new Q10MapBuilder(adapter);
	}

	/**
     * Processes raw map data and returns a generated map buffer.
     * @param rawData The raw buffer from the robot (Protocol 301).
     * @param version The protocol version string (e.g., "B01" or "1.0").
     * @param model The robot model (used for key derivation/assets).
     * @param serial The robot serial (used for key derivation).
     * @param mappedRooms Optional room mapping for V1.
     * @param currentMapIndex Optional floor index for V1; when set and mappedRooms empty, segment names are enriched from room states.
     */
	public async processMap(rawData: Buffer, version: string, model: string, serial: string, mappedRooms: any[] | null, duid?: string, connectionType: string = "Unknown", deviceStatus?: B01DeviceStatus, currentMapIndex?: number): Promise<{ mapBase64: string, mapBase64Clean?: string, mapData?: any } | null> {
		try {
			if (version === "B01" || version === "Q10") {
				const resolved = this.pipelineB01.resolve(rawData, version, model, serial, duid || "", connectionType);
				if (resolved?.variant === "q10") {
					const effectiveDeviceStatus = duid
						? await this.getDeviceStatusForB01(duid, deviceStatus)
						: deviceStatus;
					const q10Result = await this.processQ10Payload(
						{ classification: resolved.q10, mapData: resolved.mapData },
						duid,
						connectionType,
						effectiveDeviceStatus,
						model || undefined
					);
					if (q10Result) {
						return q10Result;
					}
				}

				if (resolved?.variant === "protobuf") {
					const mapData = resolved.mapData;
					const effectiveDeviceStatus = duid
						? await this.getDeviceStatusForB01(duid, deviceStatus)
						: deviceStatus;
					const expectedGridSize = mapData.header.sizeX * mapData.header.sizeY;
					// Only accept when grid length exactly matches header (real maps); reject wrong decryption, fragments, or non-map packets.
					if (expectedGridSize > 0 && mapData.mapGrid.length !== expectedGridSize) {
						this.adapter.rLog(connectionType as any, duid || "unknown", "Warn", version, 301, `B01 map rejected: grid size inconsistent with header (got ${mapData.mapGrid.length}, expected sizeX*sizeY=${expectedGridSize})`, "warn");
					} else {
						const mapBuf = await this.builderB01.buildMap(mapData, model, duid, effectiveDeviceStatus);
						const mapBase64 = "data:image/png;base64," + mapBuf.toString("base64");
						return {
							mapBase64: mapBase64,
							mapBase64Clean: mapBase64, // Reuse same map for clean view for now
							mapData: mapData
						};
					}
				}
			} else {
				// V1 Handling with MapDecryptor (GZIP)
				const mapBuf = await MapDecryptorV1.decrypt(rawData);
				if (!mapBuf) {
					this.adapter.rLog("MapManager", duid || null, "Error", version, 301, `Failed to unzip V1 map data`, "error");
					return null;
				}

				// V1 parser returns ParsedMapData OR empty object
				const mapData = await this.mapParser.parsedata(mapBuf, mappedRooms, { isHistoryMap: false, duid: duid ?? undefined });

				// For cloud robots mappedRooms may be empty; enrich segment names from room states when possible
				if (mapData && Object.keys(mapData).length > 0 && duid != null && "IMAGE" in mapData) {
					const floor = (currentMapIndex != null && currentMapIndex >= 0) ? currentMapIndex : 0;
					const list = mapData.IMAGE?.segments?.list;
					if (Array.isArray(list) && (!mappedRooms || mappedRooms.length === 0)) {
						for (const seg of list) {
							if (seg.id != null && !seg.name) {
								const obj = await this.adapter.getObjectAsync(`Devices.${duid}.floors.${floor}.${seg.id}`);
								const name = (obj as any)?.common?.name;
								if (name && String(name).trim()) seg.name = String(name).trim();
							}
						}
					}
				}

				if (mapData && Object.keys(mapData).length > 0) {
					// Legacy MapCreator returns [clean, full]
					// We cast builderV1 to any to avoid type issues if CanvasMap isn't explicitly typed in class definition yet
					const [mapBase64Clean, mapBase64] = await this.mapCreator.canvasMap(mapData, { mappedRooms, model, duid: duid ?? undefined });
					return {
						mapBase64: mapBase64,
						mapBase64Clean: mapBase64Clean,
						mapData: mapData
					};
				}
			}
		} catch (e: unknown) {
			this.adapter.rLog("MapManager", duid || null, "Error", version, 301, `Failed to process map (Version: ${version}): ${this.adapter.errorMessage(e)}`, "error");
		}
		return null;
	}

	private async processQ10Payload(
		q10Payload: { classification: Q10PayloadClassification; mapData: B01MapData | null },
		duid?: string,
		connectionType: string = "Unknown",
		deviceStatus?: B01DeviceStatus,
		robotModel?: string
	): Promise<{ mapBase64: string, mapBase64Clean?: string, mapData?: any } | null> {
		const cacheKey = this.getQ10CacheKey(duid, connectionType);
		const previous = this.q10StateByDevice.get(cacheKey);
		const { classification } = q10Payload;
		const packetKind: "full" | "path-only" = classification.mapData ? "full" : "path-only";
		const rawMapData = q10Payload.mapData ?? classification.mapData;
		const rawOverlayCounts = rawMapData?.q10RawOverlayCounts ?? this.getQ10OverlayCounts(rawMapData);
		const sourceOverlayCounts = this.getQ10OverlayCounts(rawMapData);
		let overlaySeedSource: "inline" | "runtime-cache" | "persisted-state" | "none" =
			this.hasQ10OverlaySeed(rawMapData) ? "inline" : "none";

		let mapData = rawMapData;
		if (mapData) {
			mapData = mergeQ10PersistentState(mapData, previous);
			if (
				overlaySeedSource === "none" &&
				this.hasQ10OverlaySeed(mapData) &&
				this.isCompatibleQ10OverlaySeed(rawMapData!, previous)
			) {
				overlaySeedSource = "runtime-cache";
			}
			const hydrated = await this.hydrateQ10OverlaySeed(mapData, duid, connectionType);
			mapData = hydrated.mapData;
			if (overlaySeedSource === "none") {
				overlaySeedSource = hydrated.seedSource;
			}
		} else {
			const pathPoints = classification.pathPoints;
			if (!pathPoints?.length || !previous) {
				return null;
			}
			mapData = applyQ10PathOnlyToB01(previous, pathPoints);
			if (overlaySeedSource === "none" && this.hasQ10OverlaySeed(mapData)) {
				overlaySeedSource = "runtime-cache";
			}
		}

		const created = this.creatorQ10.create(mapData, deviceStatus);
		created.q10RuntimeDebug = this.buildQ10RuntimeDebugSummary(
			created,
			packetKind,
			classification,
			rawOverlayCounts,
			sourceOverlayCounts,
			overlaySeedSource
		);
		const resolvedRobotModel = robotModel || (duid ? this.adapter.http_api?.getRobotModel(duid) || undefined : undefined);
		const rendered = await this.builderQ10.buildMaps(created, deviceStatus, resolvedRobotModel);
		const mapBase64 = "data:image/png;base64," + rendered.full.toString("base64");
		const mapBase64Clean = "data:image/png;base64," + rendered.clean.toString("base64");
		this.q10StateByDevice.set(cacheKey, created);
		if (duid) this.rememberQ10OverlaySeed(duid, created, connectionType);

		return {
			mapBase64,
			mapBase64Clean,
			mapData: created
		};
	}

	private buildQ10RuntimeDebugSummary(
		mapData: B01MapData,
		packetKind: "full" | "path-only",
		classification: Q10PayloadClassification = MapManager.NON_Q10_CLASSIFICATION,
		rawOverlayCounts: {
			virtualWalls: number;
			forbidAreas: number;
			mopAreas: number;
			thresholdAreas: number;
			eraseAreas: number;
			carpetAreas: number;
		} = MapManager.EMPTY_Q10_OVERLAY_COUNTS,
		sourceOverlayCounts: {
			virtualWalls: number;
			forbidAreas: number;
			mopAreas: number;
			thresholdAreas: number;
			eraseAreas: number;
			carpetAreas: number;
		} = MapManager.EMPTY_Q10_OVERLAY_COUNTS,
		overlaySeedSource: "inline" | "runtime-cache" | "persisted-state" | "none" = "none"
	): Q10RuntimeDebugSummary {
		const verification = mapData.q10Verification;
		return {
			packetKind,
			payloadShape: classification.payloadShape,
			overlaySeedSource,
			overlaySeedHydrated: overlaySeedSource === "runtime-cache" || overlaySeedSource === "persisted-state",
			rawVirtualWalls: rawOverlayCounts.virtualWalls,
			rawForbidAreas: rawOverlayCounts.forbidAreas,
			rawMopAreas: rawOverlayCounts.mopAreas,
			rawThresholdAreas: rawOverlayCounts.thresholdAreas,
			rawEraseAreas: rawOverlayCounts.eraseAreas,
			rawCarpetAreas: rawOverlayCounts.carpetAreas,
			sourceVirtualWalls: sourceOverlayCounts.virtualWalls,
			sourceForbidAreas: sourceOverlayCounts.forbidAreas,
			sourceMopAreas: sourceOverlayCounts.mopAreas,
			sourceThresholdAreas: sourceOverlayCounts.thresholdAreas,
			sourceEraseAreas: sourceOverlayCounts.eraseAreas,
			sourceCarpetAreas: sourceOverlayCounts.carpetAreas,
			pathPoints: mapData.q10SourceData?.pathPoints.length ?? mapData.q10CreatorData?.pathPixels.length ?? 0,
			historyPoints: mapData.history?.length ?? 0,
			virtualWalls: mapData.q10SourceData?.virtualWalls.length ?? mapData.virtualWalls?.length ?? 0,
			forbidAreas: mapData.q10SourceData?.forbidAreas.length ?? mapData.recmForbitZone?.length ?? 0,
			mopAreas: mapData.q10SourceData?.mopAreas.length ?? 0,
			thresholdAreas: mapData.q10SourceData?.thresholdAreas.length ?? mapData.thresholds?.length ?? 0,
			eraseAreas: mapData.q10SourceData?.eraseAreas.length ?? mapData.eraseAreas?.length ?? 0,
			carpetAreas: mapData.q10SourceData?.carpetAreas.length ?? mapData.carpetInfo?.length ?? 0,
			obstacles: mapData.q10SourceData?.obstacles.length ?? mapData.obstacles?.length ?? 0,
			skipPoints: mapData.q10SourceData?.skipPoints.length ?? mapData.skipCleanPoints?.length ?? 0,
			suspectedPoints: mapData.q10SourceData?.suspectedPoints.length ?? mapData.q10CreatorData?.suspectedPoints.length ?? 0,
			rooms: mapData.q10SourceData?.rooms.length ?? mapData.rooms?.length ?? 0,
			robotPresent: !!(mapData.q10CreatorData?.robotPixel || mapData.robotPos),
			chargerPresent: !!(mapData.q10CreatorData?.chargerPixel || mapData.chargerPos),
			presentVerifiedFeatures: verification?.presentVerifiedFeatures ?? [],
			presentUnverifiedFeatures: verification?.presentUnverifiedFeatures ?? []
		};
	}

	private getQ10CacheKey(duid?: string, connectionType: string = "Unknown"): string {
		const scope = connectionType === "B01History" ? "history" : "live";
		return `${duid || "unknown"}:${scope}`;
	}

	private hasQ10OverlaySeed(mapData?: B01MapData | null): boolean {
		const source = mapData?.q10SourceData;
		if (!source) return false;

		return [
			source.virtualWalls,
			source.forbidAreas,
			source.mopAreas,
			source.thresholdAreas,
			source.eraseAreas,
			source.carpetAreas
		].some((areas) => (areas?.length ?? 0) > 0);
	}

	private getQ10OverlayCounts(mapData?: B01MapData | null): {
		virtualWalls: number;
		forbidAreas: number;
		mopAreas: number;
		thresholdAreas: number;
		eraseAreas: number;
		carpetAreas: number;
	} {
		const source = mapData?.q10SourceData;
		if (!source) return { ...MapManager.EMPTY_Q10_OVERLAY_COUNTS };

		return {
			virtualWalls: source.virtualWalls.length,
			forbidAreas: source.forbidAreas.length,
			mopAreas: source.mopAreas.length,
			thresholdAreas: source.thresholdAreas.length,
			eraseAreas: source.eraseAreas.length,
			carpetAreas: source.carpetAreas.length
		};
	}

	private isCompatibleQ10OverlaySeed(current: B01MapData, candidate?: B01MapData | null): candidate is B01MapData {
		if (!candidate?.q10SourceData) return false;
		if (!this.hasQ10OverlaySeed(candidate)) return false;

		const currentMapId = current.q10SourceData?.mapId;
		const candidateMapId = candidate.q10SourceData?.mapId;
		if (
			Number.isFinite(currentMapId) &&
			Number.isFinite(candidateMapId) &&
			currentMapId &&
			candidateMapId &&
			currentMapId !== candidateMapId
		) {
			return false;
		}

		const currentHeader = current.header;
		const candidateHeader = candidate.header;
		if (currentHeader.sizeX !== candidateHeader.sizeX || currentHeader.sizeY !== candidateHeader.sizeY) {
			return false;
		}

		const tolerance = Math.max(currentHeader.resolution, candidateHeader.resolution, 0.05) * 2;
		return (
			Math.abs(currentHeader.minX - candidateHeader.minX) <= tolerance &&
			Math.abs(currentHeader.minY - candidateHeader.minY) <= tolerance &&
			Math.abs(currentHeader.maxX - candidateHeader.maxX) <= tolerance &&
			Math.abs(currentHeader.maxY - candidateHeader.maxY) <= tolerance &&
			Math.abs(currentHeader.resolution - candidateHeader.resolution) <= tolerance
		);
	}

	private rememberQ10OverlaySeed(duid: string, mapData?: B01MapData | null, connectionType: string = "Unknown"): void {
		if (!duid || !this.hasQ10OverlaySeed(mapData)) return;
		this.q10OverlaySeedByDevice.set(this.getQ10CacheKey(duid, connectionType), mapData!);
	}

	private async readPersistedQ10MapState(stateId: string): Promise<B01MapData | null> {
		const state = await this.adapter.getStateAsync(stateId);
		if (typeof state?.val !== "string" || !state.val.trim()) return null;

		try {
			const parsed = JSON.parse(state.val);
			if (!parsed || typeof parsed !== "object" || !("header" in parsed) || !("q10SourceData" in parsed)) {
				return null;
			}
			return parsed as B01MapData;
		} catch {
			return null;
		}
	}

	private async findPersistedQ10OverlaySeed(duid: string, current: B01MapData, connectionType: string): Promise<B01MapData | null> {
		const stateIds =
			connectionType === "B01History"
				? [
					`Devices.${duid}.map.mapData`,
					...Array.from({ length: 25 }, (_, index) => `Devices.${duid}.cleaningInfo.records.${index}.map.mapData`)
				]
				: [
					...Array.from({ length: 25 }, (_, index) => `Devices.${duid}.cleaningInfo.records.${index}.map.mapData`),
					`Devices.${duid}.map.mapData`
				];

		let misses = 0;
		for (const stateId of stateIds) {
			const candidate = await this.readPersistedQ10MapState(stateId);
			if (!candidate) {
				misses++;
				if (misses >= 5 && stateId.includes(".cleaningInfo.records.")) break;
				continue;
			}

			misses = 0;
			if (this.isCompatibleQ10OverlaySeed(current, candidate)) {
				return candidate;
			}
		}

		return null;
	}

	private async hydrateQ10OverlaySeed(
		current: B01MapData,
		duid?: string,
		connectionType: string = "Unknown"
	): Promise<{ mapData: B01MapData; seedSource: "runtime-cache" | "persisted-state" | "none" }> {
		if (!duid) return { mapData: current, seedSource: "none" };
		if (this.hasQ10OverlaySeed(current)) {
			this.rememberQ10OverlaySeed(duid, current, connectionType);
			return { mapData: current, seedSource: "none" };
		}

		const runtimeSeed = this.q10OverlaySeedByDevice.get(this.getQ10CacheKey(duid, connectionType));
		if (this.isCompatibleQ10OverlaySeed(current, runtimeSeed)) {
			const merged = mergeQ10PersistentState(current, runtimeSeed);
			this.rememberQ10OverlaySeed(duid, merged, connectionType);
			return { mapData: merged, seedSource: "runtime-cache" };
		}

		if (connectionType !== "B01History") {
			return { mapData: current, seedSource: "none" };
		}

		const persistedSeed = await this.findPersistedQ10OverlaySeed(duid, current, connectionType);
		if (persistedSeed) {
			this.rememberQ10OverlaySeed(duid, persistedSeed, connectionType);
			const merged = mergeQ10PersistentState(current, persistedSeed);
			this.rememberQ10OverlaySeed(duid, merged, connectionType);
			return { mapData: merged, seedSource: "persisted-state" };
		}

		return { mapData: current, seedSource: "none" };
	}

	public updateB01DeviceStatus(duid: string, status: Partial<B01DeviceStatus>): void {
		if (!duid) return;
		const current = this.latestB01DeviceStatusByDevice.get(duid) ?? {};
		this.latestB01DeviceStatusByDevice.set(duid, {
			...current,
			...status
		});
	}

	private async readPersistedB01DeviceStatus(duid: string): Promise<Partial<B01DeviceStatus>> {
		const getVal = async (keys: string[]): Promise<any | undefined> => {
			for (const k of keys) {
				const s = await this.adapter.getStateAsync(`Devices.${duid}.deviceStatus.${k}`);
				if (s && s.val !== undefined && s.val !== null) return s.val;
			}
			return undefined;
		};

		const stateVal = await getVal(["status", "state", "4"]);
		const workModeVal = await getVal(["work_mode", "workMode", "15"]);
		const cleanModeVal = await getVal(["mode", "cleanMode", "17"]);
		const dustCollectVal = await getVal(["dust_action", "dust_collection_status", "105"]);
		const faultVal = await getVal(["fault", "deviceFault", "18"]);

		const persisted: Partial<B01DeviceStatus> = {};
		if (stateVal !== undefined) persisted.deviceState = Number(stateVal);
		if (workModeVal !== undefined) persisted.deviceWorkMode = Number(workModeVal);
		if (cleanModeVal !== undefined) persisted.deviceCleanMode = Number(cleanModeVal);
		if (dustCollectVal !== undefined) {
			persisted.isDustCollect = dustCollectVal === 1 || dustCollectVal === true || dustCollectVal === "1";
		}
		if (faultVal !== undefined) persisted.deviceFault = Number(faultVal);
		return persisted;
	}

	private pickB01StatusValue<T>(...values: Array<T | null | undefined>): T | undefined {
		for (const value of values) {
			if (value !== undefined && value !== null) return value;
		}
		return undefined;
	}

	private async getDeviceStatusForB01(duid: string, preferred?: Partial<B01DeviceStatus>): Promise<B01DeviceStatus> {
		const persisted = await this.readPersistedB01DeviceStatus(duid);
		const cached = this.latestB01DeviceStatusByDevice.get(duid);

		return {
			deviceState: this.pickB01StatusValue(preferred?.deviceState, cached?.deviceState, persisted.deviceState, 0) ?? 0,
			deviceWorkMode: this.pickB01StatusValue(preferred?.deviceWorkMode, cached?.deviceWorkMode, persisted.deviceWorkMode, 0) ?? 0,
			deviceCleanMode: this.pickB01StatusValue(preferred?.deviceCleanMode, cached?.deviceCleanMode, persisted.deviceCleanMode, 0),
			deviceChargeState: this.pickB01StatusValue(preferred?.deviceChargeState, cached?.deviceChargeState, persisted.deviceChargeState),
			isDustCollect: this.pickB01StatusValue(preferred?.isDustCollect, cached?.isDustCollect, persisted.isDustCollect, false) ?? false,
			deviceFault: this.pickB01StatusValue(preferred?.deviceFault, cached?.deviceFault, persisted.deviceFault, 0),
			deviceQuiet: this.pickB01StatusValue(preferred?.deviceQuiet, cached?.deviceQuiet, persisted.deviceQuiet),
			devicePvCutCharge: this.pickB01StatusValue(preferred?.devicePvCutCharge, cached?.devicePvCutCharge, persisted.devicePvCutCharge),
			deviceBattery: this.pickB01StatusValue(preferred?.deviceBattery, cached?.deviceBattery, persisted.deviceBattery),
			deviceCustomType: this.pickB01StatusValue(preferred?.deviceCustomType, cached?.deviceCustomType, persisted.deviceCustomType)
		};
	}

	/**
	 * Saves the generated map results to ioBroker states.
	 * @param duid Device Unique ID
	 * @param res The processed map result object
	 */
	public async saveGeneratedMap(duid: string, res: { mapBase64: string, mapBase64Clean?: string, mapData?: any }): Promise<void> {
		if (!res) return;

		try {
			await this.adapter.ensureFolder(`Devices.${duid}.map`);
			const tasks: Promise<any>[] = [];

			if (res.mapBase64) {
				tasks.push(
					this.adapter.ensureState(`Devices.${duid}.map.mapBase64`, { name: "Map Image", type: "string", role: "text.png" })
						.then(() => this.adapter.setStateChangedAsync(`Devices.${duid}.map.mapBase64`, { val: res.mapBase64, ack: true }))
				);
			}
			if (res.mapBase64Clean) {
				tasks.push(
					this.adapter.ensureState(`Devices.${duid}.map.mapBase64Clean`, { name: "Map Image (Clean)", type: "string", role: "text.png" })
						.then(() => this.adapter.setStateChangedAsync(`Devices.${duid}.map.mapBase64Clean`, { val: res.mapBase64Clean, ack: true }))
				);
			}
			if (res.mapData) {
				tasks.push(
					this.adapter.ensureState(`Devices.${duid}.map.mapData`, { name: "Map Data", type: "string", role: "json" })
						.then(() => this.adapter.setStateChangedAsync(`Devices.${duid}.map.mapData`, { val: JSON.stringify(res.mapData), ack: true }))
				);
			}

			await Promise.all(tasks);
		} catch (e: unknown) {
			this.adapter.rLog("MapManager", duid, "Error", "Map", undefined, `Failed to save map states: ${this.adapter.errorMessage(e)}`, "error");
		}
	}
}
