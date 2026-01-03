import { Point as IPoint } from "../MapHelper";
export declare const CONSTANTS: {
    BLACK: number;
    WHITE: number;
    BOUNDARY: number;
};
export interface Rect {
    x: number;
    y: number;
    width: number;
    height: number;
}
export interface ChainPoint {
    chain_point: Point;
}
export interface DoorInfo {
    door_point: Point[];
    area_id: number[];
}
export interface RoomInfo {
    tid: number;
    center_pose: Point;
    chain_infor: ChainPoint[];
    door_info: DoorInfo[];
}
export interface TMapStruct {
    map: Int8Array | Uint8Array;
    x_min: number;
    x_max: number;
    y_min: number;
    y_max: number;
    resolution: number;
    info: RoomInfo[] | null;
}
export declare class Point implements IPoint {
    x: number;
    y: number;
    constructor(x: number, y: number);
}
export declare function beautify(tMapStruct: TMapStruct): {
    result: Int8Array | Uint8Array;
};
