"use strict";

class basic_robot {
	constructor() {
		this.setup = {
			"floor": {},

			"networkInfo": {
				"ssid":  {"type": "string", "name": "Connected WiFi", "write": false},
				"ip":    {"type": "string", "name": "IP adress of device", "write": false},
				"mac":   {"type": "string", "name": "MAC adress of device", "write": false},
				"bssid": {"type": "string", "name": "Basic Service Set Identifier", "write": false},
				"rssi":  {"type": "number", "name": "Received Signal Strength Indicator", "write": false}
			},

			"deviceInfo": {
				"activeTime": {"name": "Cleaning time of last run", "type": "number", "unit": "h", "write": false},
				"attribute": {"name": "Attribute", "type": "object", "write": false},
				"duid": {"name": "Device unique ID", "type": "string", "write": false},
				"extra": {"name": "Extra", "type": "string", "write": false},
				"featureSet": {"name": "Feature set", "type": "string", "write": false},
				"fv": {"name": "Firmware version", "type": "string", "write": false},
				"iconUrl": {"name": "Icon URL", "type": "string", "write": false},
				"lat": {"name": "latitude", "type": "string", "write": false},
				"localKey": {"name": "Local key", "type": "string", "write": false},
				"lon": {"name": "longitude", "type": "string", "write": false},
				"name": {"name": "Robot name", "type": "string", "write": false},
				"newFeatureSet": {"name": "Feature set", "type": "string", "write": false},
				"online": {"name": "Online status", "type": "boolean", "write": false},
				"productId": {"name": "Product ID", "type": "string", "write": false},
				"pv": {"name": "Product version", "type": "string", "write": false},
				"roomId": {"name": "Room ID", "type": "string", "write": false},
				"runtimeEnv": {"name": "Runetime environment", "type": "string", "write": false},
				"share": {"name": "Share", "type": "boolean", "write": false},
				"shareTime": {"name": "Shared time", "type": "number", "unit": "h", "write": false},
				"silentOtaSwitch": {"name": "Perform silent OTA", "type": "boolean", "write": false},
				"sn": {"name": "Serialnumber", "type": "string", "write": false},
				"timeZoneId": {"name": "Robot Time Zone", "type": "string", "write": false},
				"tuyaMigrated": {"name": "Tuya integration", "type": "boolean", "write": false},
				"tuyaUuid": {"name": "Tuya integration UUID", "type": "string", "write": false}
			},

			["firmwareFeatures"]: {
				101:"unknown",
				102:"unknown",
				103:"Clean Time Supported",
				104:"unknown",
				105:"unknown",
				106:"unknown",
				107:"unknown",
				108:"unknown",
				109:"unknown",
				110:"unknown",
				111:"Supports FSEndPoint",
				112:"Supports AutoSplitSegments",
				113:"Supports Delete Map feature",
				114:"Supports OrderSegmentClean",
				115:"Spot Clean",
				116:"Map Segment Supported",
				117:"unknown",
				118:"unknown",
				119:"Supports Led Status Switch",
				120:"Multi Floor Supported",
				121:"unknown",
				122:"Supports FetchTimer Summary",
				123:"Orders Clean Supported",
				124:"Analysis Supported",
				125:"Remote Supported",
				126:"unknown",
				127:"unknown",
				128:"unknown",
				129:"unknown"
			}
		};
	}
}

module.exports = basic_robot;