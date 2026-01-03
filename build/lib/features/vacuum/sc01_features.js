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
const v1VacuumFeatures_1 = require("./v1VacuumFeatures");
const b01VacuumFeatures_1 = require("./b01VacuumFeatures");
const baseDeviceFeatures_1 = require("../baseDeviceFeatures");
const PROFILE_SC01 = {
    name: "Roborock Q7 L5 (sc01)",
    features: {
        maxSuctionValue: 108
    },
    mappings: {
        fan_power: { ...v1VacuumFeatures_1.BASE_FAN, 108: "Max+" },
        water_box_mode: v1VacuumFeatures_1.BASE_WATER,
        mop_mode: v1VacuumFeatures_1.BASE_MOP
    }
};
const sc01Config = {
    // B01 devices should strict to B01 protocol capabilities only.
    // We clear these to prevent standard Vacuum logic from adding incompatible commands.
    staticFeatures: []
};
let SC01Features = class SC01Features extends b01VacuumFeatures_1.B01VacuumFeatures {
    constructor(dependencies, duid) {
        super(dependencies, duid, "roborock.vacuum.sc01", sc01Config, PROFILE_SC01);
        dependencies.adapter.rLog("System", duid, "Info", "SC01", undefined, `Constructing SC01Features`, "info");
    }
};
exports.SC01Features = SC01Features;
exports.SC01Features = SC01Features = __decorate([
    (0, baseDeviceFeatures_1.RegisterModel)("roborock.vacuum.sc01"),
    __metadata("design:paramtypes", [Object, String])
], SC01Features);
//# sourceMappingURL=sc01_features.js.map