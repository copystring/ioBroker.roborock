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
exports.S4Features = void 0;
const v1VacuumFeatures_1 = require("./v1VacuumFeatures");
const baseDeviceFeatures_1 = require("../baseDeviceFeatures");
const PROFILE_S4 = {
    name: "Roborock S4",
    features: {
        maxSuctionValue: 104
    },
    mappings: {
        fan_power: v1VacuumFeatures_1.BASE_FAN,
        water_box_mode: v1VacuumFeatures_1.BASE_WATER,
        mop_mode: v1VacuumFeatures_1.BASE_MOP
    }
};
const s4Config = {
    staticFeatures: [
    // No specific static features listed in old definition
    ]
};
let S4Features = class S4Features extends v1VacuumFeatures_1.V1VacuumFeatures {
    constructor(dependencies, duid) {
        super(dependencies, duid, "roborock.vacuum.s4", s4Config, PROFILE_S4);
    }
};
exports.S4Features = S4Features;
exports.S4Features = S4Features = __decorate([
    (0, baseDeviceFeatures_1.RegisterModel)("roborock.vacuum.s4"),
    __metadata("design:paramtypes", [Object, String])
], S4Features);
//# sourceMappingURL=s4_features.js.map