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
    labelPos?: { x: number; y: number };
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
