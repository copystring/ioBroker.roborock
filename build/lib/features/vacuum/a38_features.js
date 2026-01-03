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
exports.A38Features = void 0;
const v1VacuumFeatures_1 = require("./v1VacuumFeatures");
const baseDeviceFeatures_1 = require("../baseDeviceFeatures");
const features_enum_1 = require("../features.enum");
const PROFILE_A38 = {
    name: "Roborock Q7 Max (a38)",
    features: {
        maxSuctionValue: 108
    },
    mappings: {
        fan_power: { ...v1VacuumFeatures_1.BASE_FAN, 108: "Max+" },
        water_box_mode: v1VacuumFeatures_1.BASE_WATER,
        mop_mode: v1VacuumFeatures_1.BASE_MOP
    }
};
const a38Config = {
    staticFeatures: [
        features_enum_1.Feature.MopForbidden,
        features_enum_1.Feature.ShakeMopStrength,
        features_enum_1.Feature.WaterBox,
        features_enum_1.Feature.AvoidCarpet,
        features_enum_1.Feature.FanMaxPlus,
        features_enum_1.Feature.MapFlag,
        features_enum_1.Feature.ChargeStatus
    ]
};
let A38Features = class A38Features extends v1VacuumFeatures_1.V1VacuumFeatures {
    constructor(dependencies, duid) {
        super(dependencies, duid, "roborock.vacuum.a38", a38Config, PROFILE_A38);
    }
};
exports.A38Features = A38Features;
exports.A38Features = A38Features = __decorate([
    (0, baseDeviceFeatures_1.RegisterModel)("roborock.vacuum.a38"),
    __metadata("design:paramtypes", [Object, String])
], A38Features);
//# sourceMappingURL=a38_features.js.map