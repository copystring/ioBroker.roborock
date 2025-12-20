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
exports.SC01Features = void 0;
const baseVacuumFeatures_1 = require("./baseVacuumFeatures");
const baseDeviceFeatures_1 = require("../baseDeviceFeatures");
const features_enum_1 = require("../features.enum");
const PROFILE_SC01 = {
    name: "Roborock Q7 (sc01)",
    features: {
        maxSuctionValue: 108
    },
    mappings: {
        fan_power: { ...baseVacuumFeatures_1.BASE_FAN, 108: "Max+" },
        water_box_mode: baseVacuumFeatures_1.BASE_WATER,
        mop_mode: baseVacuumFeatures_1.BASE_MOP
    }
};
const sc01Config = {
    staticFeatures: [
        features_enum_1.Feature.MopForbidden,
        features_enum_1.Feature.WaterBox,
        features_enum_1.Feature.AvoidCarpet,
        features_enum_1.Feature.FanMaxPlus,
        features_enum_1.Feature.MapFlag,
        features_enum_1.Feature.ChargeStatus,
        features_enum_1.Feature.UpdateStatus,
        features_enum_1.Feature.RobotStatus,
        features_enum_1.Feature.NetworkInfo
    ]
};
let SC01Features = class SC01Features extends baseVacuumFeatures_1.BaseVacuumFeatures {
    constructor(dependencies, duid) {
        super(dependencies, duid, "roborock.vacuum.sc01", sc01Config, PROFILE_SC01);
    }
};
exports.SC01Features = SC01Features;
exports.SC01Features = SC01Features = __decorate([
    (0, baseDeviceFeatures_1.RegisterModel)("roborock.vacuum.sc01"),
    __metadata("design:paramtypes", [Object, String])
], SC01Features);
//# sourceMappingURL=sc01_features.js.map