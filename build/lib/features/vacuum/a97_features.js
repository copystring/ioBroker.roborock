"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.A97Features = void 0;
const v1VacuumFeatures_1 = require("./v1VacuumFeatures");
const baseDeviceFeatures_1 = require("../baseDeviceFeatures");
const features_enum_1 = require("../features.enum");
const PROFILE_A97 = {
    name: "Roborock S8 MaxV Ultra (a97)",
    features: {
        maxSuctionValue: 108,
        hasSmartPlan: true
    },
    mappings: {
        fan_power: { ...v1VacuumFeatures_1.BASE_FAN, 108: "Max+" },
        water_box_mode: v1VacuumFeatures_1.BASE_WATER,
        mop_mode: v1VacuumFeatures_1.BASE_MOP
    }
};
const a97Config = {
    staticFeatures: [
        features_enum_1.Feature.CommonStatus,
        features_enum_1.Feature.Dss,
        features_enum_1.Feature.Rss,
        features_enum_1.Feature.Kct,
        features_enum_1.Feature.RobotStatus,
        features_enum_1.Feature.CleanPercent,
        features_enum_1.Feature.ChargeStatus,
        features_enum_1.Feature.InWarmup,
        features_enum_1.Feature.MapFlag,
        features_enum_1.Feature.TaskId,
        features_enum_1.Feature.LastCleanTime,
        features_enum_1.Feature.SwitchStatus,
        features_enum_1.Feature.MonitorStatus,
        features_enum_1.Feature.CleaningInfo,
        features_enum_1.Feature.AutoEmptyDock,
        features_enum_1.Feature.MopWash,
        features_enum_1.Feature.MopDry,
        features_enum_1.Feature.LiveVideo,
        features_enum_1.Feature.VoiceControl,
        features_enum_1.Feature.MopForbidden,
        features_enum_1.Feature.AvoidCarpet,
        features_enum_1.Feature.ShakeMopStrength,
        features_enum_1.Feature.WaterBox,
        features_enum_1.Feature.FanMaxPlus,
        features_enum_1.Feature.SmartModeCommand,
        features_enum_1.Feature.CleanRepeat,
        features_enum_1.Feature.Camera
    ]
};
let A97Features = class A97Features extends v1VacuumFeatures_1.V1VacuumFeatures {
    constructor(dependencies, duid) {
        super(dependencies, duid, "roborock.vacuum.a97", a97Config, PROFILE_A97);
    }
};
exports.A97Features = A97Features;
exports.A97Features = A97Features = __decorate([
    (0, baseDeviceFeatures_1.RegisterModel)("roborock.vacuum.a97"),
    __metadata("design:paramtypes", [Object, String])
], A97Features);
//# sourceMappingURL=a97_features.js.map