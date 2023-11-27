"use strict";

class basic_washer {
	constructor() {
		this.setup = {

			"networkInfo": {
				"ssid":  {"type": "string", "name": "Connected WiFi", "write": false},
				"ip":    {"type": "string", "name": "IP adress of device", "write": false},
				"mac":   {"type": "string", "name": "MAC adress of device", "write": false},
				"bssid": {"type": "string", "name": "Basic Service Set Identifier", "write": false},
				"rssi":  {"type": "number", "name": "Received Signal Strength Indicator", "write": false}
			},
		};
	}
}

module.exports = basic_washer;