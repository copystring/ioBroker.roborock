"use strict";

class deviceFeatures {
	constructor(adapter, features, duid) {
		this.adapter = adapter;
		this.features = features;
		this.duid = duid;
	}

	isWashThenChargeCmdSupported() {
		this.adapter.createCommand(this.duid, "app_start_wash", "boolean", false);
	}

	isDustCollectionSettingSupported() {
		this.adapter.createCommand(this.duid, "app_start_collect_dust", "boolean", false);
		this.adapter.createCommand(this.duid, "app_start_collect_dust", "boolean", false);
		this.adapter.createCommand(this.duid, "set_dust_collection_switch_status", "json", '{"status":1}', { '{"status":0}': "Off", '{"status":1}': "On", });
		this.adapter.createCommand(this.duid, "set_dust_collection_mode", "json", '{"mode":0}', { '{"mode":0}': "Smart", '{"mode":1}': "Low", '{"mode":2}': "Medium", '{"mode":4}': "Max" });
	}

	isSupportedDrying() {
		this.adapter.createCommand(
			this.duid,
			"app_set_dryer_status",
			'{"status": 0}',
			{
				'{"status": 0}': "On",
				'{"status": 1}': "Off",
			},
			"string"
		);
	}

	getFeatureList() {
		return {
			isWashThenChargeCmdSupported: ((this.features / Math.pow(2, 32)) >> 5) & 1,
			isDustCollectionSettingSupported: !!(33554432 & this.features),
			isSupportedDrying: ((this.features / Math.pow(2, 32)) >> 15) & 1,
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
