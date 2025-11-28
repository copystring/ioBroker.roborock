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
exports.A144Features = void 0;
const baseVacuumFeatures_1 = require("./baseVacuumFeatures");
const baseDeviceFeatures_1 = require("../baseDeviceFeatures");
const features_enum_1 = require("../features.enum");
const PROFILE_A144 = {
    name: "Roborock Saros 10R (a144)",
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
const a144Config = {
    staticFeatures: [
        features_enum_1.Feature.MopForbidden,
        features_enum_1.Feature.WaterBox,
        features_enum_1.Feature.LiveVideo,
        features_enum_1.Feature.Camera,
        features_enum_1.Feature.FanMaxPlus,
        features_enum_1.Feature.SmartModeCommand,
        features_enum_1.Feature.CommonStatus, features_enum_1.Feature.DockStatus, features_enum_1.Feature.RobotStatus,
        features_enum_1.Feature.CleanPercent, features_enum_1.Feature.ChargeStatus, features_enum_1.Feature.InWarmup,
        features_enum_1.Feature.MapFlag, features_enum_1.Feature.TaskId, features_enum_1.Feature.LastCleanTime,
        features_enum_1.Feature.SwitchStatus, features_enum_1.Feature.CleaningInfo, features_enum_1.Feature.AutoEmptyDock,
        features_enum_1.Feature.MopWash, features_enum_1.Feature.MopDry, features_enum_1.Feature.CleanRepeat,
        features_enum_1.Feature.CleanedArea
    ]
};
let A144Features = class A144Features extends baseVacuumFeatures_1.BaseVacuumFeatures {
    constructor(dependencies, duid) {
        super(dependencies, duid, "roborock.vacuum.a144", a144Config, PROFILE_A144);
    }
};
exports.A144Features = A144Features;
exports.A144Features = A144Features = __decorate([
    (0, baseDeviceFeatures_1.RegisterModel)("roborock.vacuum.a144"),
    __metadata("design:paramtypes", [Object, String])
], A144Features);
//# sourceMappingURL=a144_features.js.map