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
exports.A87Features = void 0;
const baseVacuumFeatures_1 = require("./baseVacuumFeatures");
const baseDeviceFeatures_1 = require("../baseDeviceFeatures");
const features_enum_1 = require("../features.enum");
const PROFILE_A87 = {
    name: "Roborock Qrevo MaxV (a87)",
    features: {
        maxSuctionValue: 108,
        hasSmartPlan: true
    },
    mappings: {
        fan_power: { ...baseVacuumFeatures_1.BASE_FAN, 108: "Max+" },
        water_box_mode: baseVacuumFeatures_1.BASE_WATER,
        mop_mode: baseVacuumFeatures_1.BASE_MOP
    }
};
const a87Config = {
    staticFeatures: [
        features_enum_1.Feature.Camera,
        features_enum_1.Feature.MopForbidden,
        features_enum_1.Feature.ShakeMopStrength,
        features_enum_1.Feature.WaterBox,
        features_enum_1.Feature.AvoidCarpet,
        features_enum_1.Feature.LiveVideo,
        features_enum_1.Feature.FanMaxPlus,
        features_enum_1.Feature.SmartModeCommand,
        features_enum_1.Feature.InWarmup,
        features_enum_1.Feature.ChargeStatus,
        features_enum_1.Feature.CleanPercent,
        features_enum_1.Feature.RobotStatus,
        features_enum_1.Feature.CommonStatus,
        features_enum_1.Feature.LastCleanTime,
        features_enum_1.Feature.Kct,
        features_enum_1.Feature.MapFlag,
        features_enum_1.Feature.ReplenishMode,
        features_enum_1.Feature.CleanRepeat,
        features_enum_1.Feature.Rdt,
        features_enum_1.Feature.CleanArea,
        features_enum_1.Feature.CleanTime,
        features_enum_1.Feature.SwitchStatus
    ]
};
let A87Features = class A87Features extends baseVacuumFeatures_1.BaseVacuumFeatures {
    constructor(dependencies, duid) {
        super(dependencies, duid, "roborock.vacuum.a87", a87Config, PROFILE_A87);
    }
};
exports.A87Features = A87Features;
exports.A87Features = A87Features = __decorate([
    (0, baseDeviceFeatures_1.RegisterModel)("roborock.vacuum.a87"),
    __metadata("design:paramtypes", [Object, String])
], A87Features);
//# sourceMappingURL=a87_features.js.map