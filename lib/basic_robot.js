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