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
exports.A19Features = void 0;
const v1VacuumFeatures_1 = require("./v1VacuumFeatures");
const baseDeviceFeatures_1 = require("../baseDeviceFeatures");
const features_enum_1 = require("../features.enum");
const PROFILE_A19 = {
    name: "Roborock S4 Max (a19)",
    features: {
        maxSuctionValue: 104
    },
    mappings: {
        fan_power: v1VacuumFeatures_1.BASE_FAN,
        water_box_mode: v1VacuumFeatures_1.BASE_WATER,
        mop_mode: v1VacuumFeatures_1.BASE_MOP
    }
};
const a19Config = {
    staticFeatures: [
        features_enum_1.Feature.ShakeMopStrength
    ]
};
let A19Features = class A19Features extends v1VacuumFeatures_1.V1VacuumFeatures {
    constructor(dependencies, duid) {
        super(dependencies, duid, "roborock.vacuum.a19", a19Config, PROFILE_A19);
    }
};
exports.A19Features = A19Features;
exports.A19Features = A19Features = __decorate([
    (0, baseDeviceFeatures_1.RegisterModel)("roborock.vacuum.a19"),
    __metadata("design:paramtypes", [Object, String])
], A19Features);
//# sourceMappingURL=a19_features.js.map