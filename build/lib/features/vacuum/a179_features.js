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
exports.A179Features = void 0;
const baseVacuumFeatures_1 = require("./baseVacuumFeatures");
const baseDeviceFeatures_1 = require("../baseDeviceFeatures");
const features_enum_1 = require("../features.enum");
// --- DEVICE PROFILE (a179) ---
const PROFILE_A179 = {
    name: "Roborock Saros Z70 (a179)",
    features: {
        hasSmartPlan: true,
        maxSuctionValue: 110,
        ultraWaterValue: 209
    },
    mappings: {
        fan_power: { ...baseVacuumFeatures_1.BASE_FAN, 110: "Max+" },
        water_box_mode: { ...baseVacuumFeatures_1.BASE_WATER, 209: "Ultra" },
        mop_mode: { ...baseVacuumFeatures_1.BASE_MOP, 306: "Intense/Smart" }
    },
    cleanMotorModePresets: {
        '{"fan_power":110,"mop_mode":306,"water_box_mode":209}': "SmartPlan",
        '{"fan_power":102,"mop_mode":300,"water_box_mode":200}': "Vacuum",
        '{"fan_power":105,"mop_mode":300,"water_box_mode":202}': "Mop",
        '{"fan_power":102,"mop_mode":300,"water_box_mode":202}': "Vac & Mop"
    }
};
// Define static features for the a179 model
const a179Config = {
    staticFeatures: [
        features_enum_1.Feature.MopForbidden,
        features_enum_1.Feature.WaterBox,
        features_enum_1.Feature.AvoidCarpet,
        features_enum_1.Feature.LiveVideo,
        features_enum_1.Feature.Camera,
        // Common Features (Inferred)
        features_enum_1.Feature.CommonStatus,
        features_enum_1.Feature.DockStatus,
        features_enum_1.Feature.RobotStatus,
        features_enum_1.Feature.CleanPercent,
        features_enum_1.Feature.ChargeStatus,
        features_enum_1.Feature.InWarmup,
        features_enum_1.Feature.MapFlag,
        features_enum_1.Feature.TaskId,
        features_enum_1.Feature.LastCleanTime,
        features_enum_1.Feature.SwitchStatus,
        features_enum_1.Feature.CleaningInfo,
        features_enum_1.Feature.AutoEmptyDock,
        features_enum_1.Feature.MopWash,
        features_enum_1.Feature.MopDry,
        features_enum_1.Feature.FanMaxPlus,
        features_enum_1.Feature.SmartModeCommand,
        features_enum_1.Feature.CleanRepeat,
        features_enum_1.Feature.SmartPlan
    ]
};
let A179Features = class A179Features extends baseVacuumFeatures_1.BaseVacuumFeatures {
    constructor(dependencies, duid) {
        super(dependencies, duid, "roborock.vacuum.a179", a179Config, PROFILE_A179);
    }
};
exports.A179Features = A179Features;
exports.A179Features = A179Features = __decorate([
    (0, baseDeviceFeatures_1.RegisterModel)("roborock.vacuum.a179"),
    __metadata("design:paramtypes", [Object, String])
], A179Features);
//# sourceMappingURL=a179_features.js.map