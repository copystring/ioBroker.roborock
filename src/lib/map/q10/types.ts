export interface Q10DevicePoint {
	x: number;
	y: number;
}

export interface Q10DevicePose extends Q10DevicePoint {
	phi?: number;
}

export interface Q10MapArrPoint {
	x: number;
	y: number;
}

export interface Q10MapPixelPoint {
	x: number;
	y: number;
}

export interface Q10PixelPose extends Q10MapPixelPoint {
	phi?: number;
}

export interface Q10SourceArea {
	id?: number;
	type: "erase" | "virtualWall" | "forbid" | "mop" | "threshold" | "carpet";
	areaType?: number;
	name?: string;
	points: Q10DevicePoint[];
}

export interface Q10SourceObstacle {
	point: Q10DevicePoint;
	type?: "obstacle" | "skip";
}

export interface Q10SourceSuspectedPoint {
	point: Q10DevicePoint;
	type: "threshold" | "easycard" | "cliff";
}

export interface Q10SourcePathPoint extends Q10DevicePoint {
	type?: number;
	update?: number;
}

export interface Q10SourceRoom {
	roomID: number;
	roomName: string;
	roomNameDataStr?: string;
	roomType: number;
	roomMaterial: number;
	cleanOrder: number;
	cleanCount: number;
	funLevel: number;
	waterLevel: number;
	cleanType: number;
	cleanLine: number;
}

export interface Q10SourceData {
	version: number;
	mapId: number;
	mapWidth: number;
	mapHeight: number;
	mapRate: number;
	resolution: number;
	xMin: number;
	yMin: number;
	chargePosition?: Q10DevicePose;
	robotPosition?: Q10DevicePose;
	rooms: Q10SourceRoom[];
	eraseAreas: Q10SourceArea[];
	virtualWalls: Q10SourceArea[];
	forbidAreas: Q10SourceArea[];
	mopAreas: Q10SourceArea[];
	thresholdAreas: Q10SourceArea[];
	carpetAreas: Q10SourceArea[];
	pathPoints: Q10SourcePathPoint[];
	obstacles: Q10SourceObstacle[];
	skipPoints: Q10SourceObstacle[];
	suspectedPoints: Q10SourceSuspectedPoint[];
	dataReadIdx?: number;
	tempRoomColorPlanStr?: string;
	tempClipEraseRoomColorPlanStr?: string;
	mapCeramicTilePath?: Q10MapArrPoint[][];
	mapHorizontalFloorBoardPath?: Q10MapArrPoint[][];
	mapVerticalFloorBoardPath?: Q10MapArrPoint[][];
	carpetGrid?: Buffer;
	hasSelfIdentificationCarpet: boolean;
}

export interface Q10CreatorArea {
	id?: number;
	type: Q10SourceArea["type"];
	areaType?: number;
	name?: string;
	points: Q10MapPixelPoint[];
}

export interface Q10CreatorLine {
	id?: number;
	type: "virtualWall";
	points: [Q10MapPixelPoint, Q10MapPixelPoint];
}

export interface Q10CreatorRoomModel {
	roomID: number;
	gridValue: number;
	roomName: string;
	roomType: number;
	roomMaterial: number;
	cleanOrder: number;
	cleanCount: number;
	funLevel: number;
	waterLevel: number;
	cleanType: number;
	cleanLine: number;
	colorID: number;
	centerPoint: Q10MapPixelPoint;
	transCenterPoint: Q10MapPixelPoint;
	borderArr: Q10MapPixelPoint[][];
	borderEdge: { left: number; top: number; right: number; bottom: number };
	bounds: { left: number; top: number; right: number; bottom: number };
}

export interface Q10CreatorObstacle {
	point: Q10MapPixelPoint;
	type: "obstacle" | "skip";
}

export interface Q10CreatorSuspectedPoint {
	point: Q10MapPixelPoint;
	type: "threshold" | "easycard" | "cliff";
}

export interface Q10CreatorPathPoint extends Q10MapPixelPoint {
	type?: number;
	update?: number;
}

export interface Q10CreatorSelfIdentifiedCarpet {
	id: number;
	carpetID: number;
	left: number;
	top: number;
	right: number;
	bottom: number;
	width: number;
	height: number;
	lt: Q10MapPixelPoint;
	rb: Q10MapPixelPoint;
	mask: Buffer;
}

export interface Q10CreatorRoomTangentInfo {
	roomID1: number;
	roomID2: number;
	tangent: 0 | 1;
}

export interface Q10CreatorData {
	q10Detected: true;
	mapRate: number;
	mapWidth: number;
	mapHeight: number;
	roomModels: Q10CreatorRoomModel[];
	clipEraseRoomModels: Q10CreatorRoomModel[];
	eraseAreas: Q10CreatorArea[];
	virtualWalls: Q10CreatorLine[];
	forbidAreas: Q10CreatorArea[];
	mopAreas: Q10CreatorArea[];
	thresholdAreas: Q10CreatorArea[];
	carpetAreas: Q10CreatorArea[];
	obstaclePixels: Q10CreatorObstacle[];
	skipPixels: Q10CreatorObstacle[];
	suspectedPoints: Q10CreatorSuspectedPoint[];
	pathPixels: Q10CreatorPathPoint[];
	chargerPixel?: Q10PixelPose;
	robotPixel?: Q10PixelPose;
	selfIdentifiedCarpets: Q10CreatorSelfIdentifiedCarpet[];
	roomTangentInfo: Q10CreatorRoomTangentInfo[];
	clipEraseRoomTangentInfo: Q10CreatorRoomTangentInfo[];
	clipEraseMapGrid?: Buffer;
	materialPaths: {
		ceramicTile: Q10MapPixelPoint[][];
		horizontalFloorBoard: Q10MapPixelPoint[][];
		verticalFloorBoard: Q10MapPixelPoint[][];
	};
	roomMaterialRoomIds: {
		ceramicTile: number[];
		horizontalFloorBoard: number[];
		verticalFloorBoard: number[];
		other: number[];
	};
}
