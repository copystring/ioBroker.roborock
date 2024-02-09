"use strict";

class deviceFeatures {
	constructor(adapter, features, duid) {
		this.adapter = adapter;
		this.features = features;
		this.duid = duid;
	}

	isWashThenChargeCmdSupported() {
		this.adapter.createStateObjectHelper(`Devices.${this.duid}.commands.app_start_wash`, "Start Mop Washing", "boolean", null, false, "value", true, true,);
	}

	isDustCollectionSettingSupported() {
		this.adapter.createStateObjectHelper(`Devices.${this.duid}.commands.app_start_collect_dust`, "Start dust collection", "boolean", null, false, "value", true, true);
	}

	getFeatureList() {
		return {
			isWashThenChargeCmdSupported: ((this.features / Math.pow(2, 32)) >> 5) & 1,
			isDustCollectionSettingSupported: !!(33554432 & this.features),
		};
	}

	processSupportedFeatures() {
		const featureList = this.getFeatureList();
		Object.keys(featureList).forEach((feature) => {
			if (featureList[feature]) {
				if (typeof this[feature] === "function") {
					this[feature]();
				}
			}
		});
	}
}

module.exports = {
	deviceFeatures,
};
