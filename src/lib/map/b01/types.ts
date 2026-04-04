import type { Q10CreatorData, Q10SourceData } from "../q10/types";

export type Q10VerificationFeature =
	| "paths"
	| "virtualWalls"
	| "roomTags"
	| "obstacles"
	| "selfIdentifiedCarpets"
	| "manualCarpetAreas"
	| "forbidAreas"
	| "mopAreas"
	| "thresholdAreas"
	| "eraseAreas"
	| "skipPoints"
	| "suspectedPoints";

export type Q10VerificationState = "verified_with_current_samples" | "ported_unverified";

export interface Q10VerificationItem {
	state: Q10VerificationState;
	observedInCurrentSampleSet: boolean;
	presentInThisMap: boolean;
	countInThisMap: number;
	note: string;
}

export interface Q10VerificationSummary {
	policy: "source-first";
	sampleEvidence: "project_q10_fixtures";
	items: Record<Q10VerificationFeature, Q10VerificationItem>;
	verifiedFeatures: Q10VerificationFeature[];
	unverifiedFeatures: Q10VerificationFeature[];
	presentVerifiedFeatures: Q10VerificationFeature[];
	presentUnverifiedFeatures: Q10VerificationFeature[];
}

export interface Q10OverlayCounts {
	virtualWalls: number;
	forbidAreas: number;
	mopAreas: number;
	thresholdAreas: number;
	eraseAreas: number;
	carpetAreas: number;
}

export interface Q10RuntimeDebugSummary {
	packetKind: "full" | "path-only";
	payloadShape: "map" | "blob";
	overlaySeedSource: "inline" | "runtime-cache" | "persisted-state" | "none";
	overlaySeedHydrated: boolean;
	rawVirtualWalls: number;
	rawForbidAreas: number;
	rawMopAreas: number;
	rawThresholdAreas: number;
	rawEraseAreas: number;
	rawCarpetAreas: number;
	sourceVirtualWalls: number;
	sourceForbidAreas: number;
	sourceMopAreas: number;
	sourceThresholdAreas: number;
	sourceEraseAreas: number;
	sourceCarpetAreas: number;
	pathPoints: number;
	historyPoints: number;
	virtualWalls: number;
	forbidAreas: number;
	mopAreas: number;
	thresholdAreas: number;
	eraseAreas: number;
	carpetAreas: number;
	obstacles: number;
	skipPoints: number;
	suspectedPoints: number;
	rooms: number;
	robotPresent: boolean;
	chargerPresent: boolean;
	presentVerifiedFeatures: Q10VerificationFeature[];
	presentUnverifiedFeatures: Q10VerificationFeature[];
}

export interface B01MapHeader {
    viewId?: number;
    sizeX: number;
    sizeY: number;
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
    resolution: number;
}

export interface B01PathPoint {
    x: number;
    y: number;
    update?: number;
}

export interface B01History {
    points: B01PathPoint[];
}

export interface B01EntityPosition {
    x: number;
    y: number;
    phi: number;
}

export interface B01RoomInfo {
    roomId: number;
    roomName: string;
    roomTypeId?: number;
    colorId?: number;
    gridValue?: number;
    labelPos?: { x: number; y: number };
    cleanOrder?: number;
    cleanCount?: number;
    cleanType?: number;
    funLevel?: number;
    waterLevel?: number;
    material?: number;
    cleanLine?: number;
}

export interface B01RoomChain {
    roomId: number;
    points: { x: number; y: number }[];
    door_info?: { door_point: { x: number; y: number }[]; area_id: number[] }[];
}

export interface B01Point {
    x: number;
    y: number;
}

export interface B01Area {
    status?: number;
    type?: number;
    areaIndex?: number;
    points: B01Point[];
    name?: string;
    area_type?: number;
}

export interface B01Carpet {
    id?: number;
    status?: number;
    method?: number;
    points: B01Point[];
    name?: string;
}

export interface B01MapData {
    sourceFormat?: "protobuf" | "q10-raw";
    header: B01MapHeader;
    mapGrid: Buffer; // sizeX * sizeY
    history?: B01PathPoint[]; // Flattened points from History message
    chargerPos?: B01EntityPosition;
    robotPos?: B01EntityPosition;
    rooms?: B01RoomInfo[];
    roomChain?: B01RoomChain[];
    // New Fields
    virtualWalls?: B01Area[];
    areasInfo?: B01Area[];
    carpetInfo?: B01Carpet[];
    recmForbitZone?: B01Area[];
    eraseAreas?: B01Area[];
    obstacles?: B01Point[];
    obstaclePoints?: B01Point[];
    skipCleanPoints?: B01Point[];
    thresholds?: B01Area[];
    hasCarpetRaster?: boolean;
    carpetGrid?: Buffer;
    q10SourceData?: Q10SourceData;
    q10CreatorData?: Q10CreatorData;
    q10Verification?: Q10VerificationSummary;
    q10RuntimeDebug?: Q10RuntimeDebugSummary;
    q10RawOverlayCounts?: Q10OverlayCounts;
}

export interface B01DeviceStatus {
    deviceState: number;
    deviceWorkMode: number;
    deviceCleanMode?: number;
    deviceChargeState?: number;
    isDustCollect?: boolean;
    deviceFault?: number;
    deviceQuiet?: number;
    devicePvCutCharge?: number;
    deviceBattery?: number;
    deviceCustomType?: number;
}
