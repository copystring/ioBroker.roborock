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
exports.S5eFeatures = void 0;
const baseVacuumFeatures_1 = require("./baseVacuumFeatures");
const baseDeviceFeatures_1 = require("../baseDeviceFeatures");
const features_enum_1 = require("../features.enum");
const PROFILE_S5E = {
    name: "Roborock S5 Max",
    features: {
        maxSuctionValue: 104
    },
    mappings: {
        fan_power: baseVacuumFeatures_1.BASE_FAN,
        water_box_mode: baseVacuumFeatures_1.BASE_WATER,
        mop_mode: baseVacuumFeatures_1.BASE_MOP
    }
};
const s5eConfig = {
    staticFeatures: [
        features_enum_1.Feature.MopForbidden,
        features_enum_1.Feature.ShakeMopStrength,
        features_enum_1.Feature.WaterBox
    ]
};
let S5eFeatures = class S5eFeatures extends baseVacuumFeatures_1.BaseVacuumFeatures {
    constructor(dependencies, duid) {
        super(dependencies, duid, "roborock.vacuum.s5e", s5eConfig, PROFILE_S5E);
    }
};
exports.S5eFeatures = S5eFeatures;
exports.S5eFeatures = S5eFeatures = __decorate([
    (0, baseDeviceFeatures_1.RegisterModel)("roborock.vacuum.s5e"),
    __metadata("design:paramtypes", [Object, String])
], S5eFeatures);
//# sourceMappingURL=s5e_features.js.map