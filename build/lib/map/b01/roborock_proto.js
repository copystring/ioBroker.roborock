"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROBOROCK_PROTO_STR = void 0;
exports.ROBOROCK_PROTO_STR = `syntax = "proto3";

package SCMap;

// Hauptnachricht (Root)
message RobotMap {
    uint32 mapType = 1;
    MapExtInfo mapExtInfo = 2;
    MapHeadInfo mapHead = 3;
    MapDataInfo mapData = 4;
    repeated AllMapInfo mapInfo = 5;
    DeviceHistoryPoseInfo historyPose = 6;
    DevicePoseDataInfo chargeStation = 7;
    DeviceCurrentPoseInfo currentPose = 8;
    repeated DeviceAreaDataInfo virtualWalls = 9;
    repeated DeviceAreaDataInfo areasInfo = 10;
    repeated DeviceNavigationPointDataInfo navigationPoints = 11;
    repeated RoomDataInfo roomDataInfo = 12;
    DeviceRoomMatrix roomMatrix = 13;
    repeated DeviceRoomChainDataInfo roomChain = 14;
    repeated ObjectDataInfo objects = 15;
    repeated FurnitureDataInfo furnitureInfo = 16;
    repeated HouseInfo houseInfos = 17;
    repeated DeviceAreaDataInfo backupAreas = 18;
    repeated DeviceAreaDataInfo sillInfo = 19;
    repeated DeviceCarpetDataInfo carpetInfo = 20;
    repeated DeviceAreaDataInfo recmForbitZone = 21;
    repeated DeviceAreaDataInfo map_hide = 22;
}

message MapHeadInfo {
    uint32 mapHeadId = 1;
    uint32 sizeX = 2;
    uint32 sizeY = 3;
    float minX = 4;
    float minY = 5;
    float maxX = 6;
    float maxY = 7;
    float resolution = 8;
}

message MapDataInfo {
    bytes mapData = 1; // Das Pixel-Grid!
}

message MapExtInfo {
    uint32 taskBeginDate = 1;
    uint32 mapUploadDate = 2;
    uint32 mapValid = 3;
    uint32 radian = 4;
    uint32 force = 5;
    uint32 cleanPath = 6;
    MapBoundaryInfo boudaryInfo = 7;
    uint32 mapVersion = 8;
    uint32 mapValueType = 9;
}

message MapBoundaryInfo {
    string mapMd5 = 1;
    uint32 vMinX = 2;
    uint32 vMaxX = 3;
    uint32 vMinY = 4;
    uint32 vMaxY = 5;
}

message RoomDataInfo {
    uint32 roomId = 1;
    string roomName = 2;
    uint32 roomTypeId = 3;
    uint32 meterialId = 4;
    uint32 cleanState = 5;
    uint32 roomClean = 6;
    uint32 roomCleanIndex = 7;
    DevicePointInfo roomNamePost = 8;
    CleanPerferenceDataInfo cleanPerfer = 9;
    uint32 colorId = 10; // WICHTIG für die Färbung!
    uint32 floor_direction = 11;
    uint32 global_seq = 12;
}

message DevicePoseDataInfo {
    float x = 1;
    float y = 2;
    float phi = 3;
}

message DeviceCurrentPoseInfo {
    uint32 poseId = 1;
    uint32 update = 2;
    float x = 3;
    float y = 4;
    float phi = 5;
}

message DeviceHistoryPoseInfo {
    uint32 poseId = 1;
    repeated DeviceCoverPointDataInfo points = 2;
}

message DeviceCoverPointDataInfo {
    uint32 update = 1;
    float x = 2;
    float y = 3;
}

message DevicePointInfo {
    float x = 1;
    float y = 2;
}

message DeviceAreaDataInfo {
    uint32 status = 1;
    uint32 type = 2;
    uint32 areaIndex = 3;
    repeated DevicePointInfo points = 4;
    string name = 5;
    uint32 area_type = 6;
}

message FurnitureDataInfo {
    uint32 id = 1;
    uint32 typeId = 2;
    repeated DevicePointInfo points = 3;
    string url = 4;
    uint32 status = 5;
    repeated DevicePointInfo react = 6;
    uint32 sizeType = 7;
}

// Hilfsstrukturen
message AllMapInfo {
    uint32 mapHeadId = 1;
    string mapName = 2;
    uint32 force = 3;
}

message CleanPerferenceDataInfo {
    uint32 cleanMode = 1;
    uint32 waterLevel = 2;
    uint32 windPower = 3;
    uint32 twiceClean = 4;
    uint32 carpet = 5;
}

message DeviceRoomMatrix {
    bytes matrix = 1;
}

message DeviceRoomChainDataInfo {
    uint32 roomId = 1;
    repeated DeviceChainPointDataInfo points = 2;
    repeated DeviceDoorChainInfo door_info = 3;
}

message DeviceChainPointDataInfo {
    uint32 x = 1;
    uint32 y = 2;
    uint32 value = 3;
}

message DeviceDoorChainInfo {
    repeated DeviceGridPointDataInfo door_point = 1;
    repeated uint32 area_id = 2;
}

message DeviceGridPointDataInfo {
    uint32 x = 1;
    uint32 y = 2;
}

message ObjectDataInfo {
    uint32 objectId = 1;
    uint32 objectTypeId = 2;
    string objectName = 3;
    uint32 confirm = 4;
    float x = 5;
    float y = 6;
    string url = 7;
}

message DeviceNavigationPointDataInfo {
    uint32 pointId = 1;
    uint32 status = 2;
    uint32 pointType = 3;
    float x = 4;
    float y = 5;
    float phi = 6;
}

message HouseInfo {
    uint32 id = 1;
    string name = 2;
    uint32 curMapCount = 3;
    uint32 maxMapSize = 4;
    repeated AllMapInfo maps = 5;
}

message DeviceCarpetDataInfo {
    uint32 id = 1;
    uint32 status = 2;
    uint32 method = 3;
    repeated DevicePointInfo points = 4;
    string name = 5;
    uint32 adapt = 6;
    uint32 is_global = 7;
    uint32 is_detect = 8;
    uint32 is_cleaned = 9;
}

message CarpetOffsetInfo {
    float phi = 1;
    float dist = 2;
}
`;
//# sourceMappingURL=roborock_proto.js.map