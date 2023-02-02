"use strict";

const mqtt = require("mqtt");
const crypto = require("crypto");
const Parser = require("binary-parser").Parser;
const CRC32 = require("crc-32");
const zlib = require("zlib");

let seq = 1;
let random = 4711; // Should be initialized with a number 0 - 1999?
let idCounter = 1;

const nonce = crypto.randomBytes(16);

// This value is stored hardcoded in librrcodec.so, encrypted by the value of "com.roborock.iotsdk.appsecret" from AndroidManifest.xml.
const salt = "TXdfu$jyZ#TZHsg4";


const mqttMessageParser = new Parser()
	.endianess("big")
	.string("version", {
		length: 3
	})
	.uint32("seq")
	.uint32("random")
	.uint32("timestamp")
	.uint16("protocol")
	.uint16("payloadLen")
	.buffer("payload", {
		length: "payloadLen"
	})
	.uint32("crc32");

const protocol301Parser = new Parser()
	.endianess("little")
	.string("endpoint", {
		length: 15,
		stripNull: true
	})
	.uint8("unknown1")
	.uint16("id")
	.buffer("unknown2", {
		length: 6
	});

let mqttUser;
let mqttPassword;
let client;
let endpoint;
let rriot;
let devices;
let localKeys;

class roborock_mqtt_connector {
	constructor(adapter) {
		this.adapter = adapter;
	}

	initUser(userdata, homedata) {
		rriot = userdata.rriot;

		devices = homedata.devices.concat(homedata.receivedDevices);
		localKeys = new Map(devices.map(device => [device.duid, device.localKey]));
		endpoint = this.md5bin(rriot.k).subarray(8, 14).toString("base64"); // Could be a random but rather static string. The app generates it on first run.
		mqttUser = this.md5hex(rriot.u + ":" + rriot.k).substring(2, 10);
		mqttPassword = this.md5hex(rriot.s + ":" + rriot.k).substring(16);
		client = mqtt.connect(rriot.r.m, {
			username: mqttUser,
			password: mqttPassword,
			keepalive: 30
		});
	}

	async initMQTT_Subscribe() {
		const timeout = setTimeout( async () => {
			this.adapter.log.error("Connection timed out! Deleting UserData and trying again");
			await this.adapter.deleteStateAsync("UserData");
			this.adapter.restart();
		},5000);

		await client.on("connect",  (result) => {
			if (typeof(result) != "undefined")
			{
				client.subscribe(`rr/m/o/${rriot.u}/${mqttUser}/#`,  (err, granted) => {
					if (err) {
						this.adapter.log.error("Failed to subscribe to Roborock MQTT Server! Error: " + err + ", granted: " + granted);
					}
				});
				clearTimeout(timeout);
			}
		});
	}

	_decodeMsg(msg, localKey) {
		// Do some checks before trying to decode the message.
		if (msg.toString("latin1", 0, 3) !== "1.0") {
			throw new Error("Unknown protocol version");
		}
		const crc32 = CRC32.buf(msg.subarray(0, msg.length - 4)) >>> 0;
		const expectedCrc32 = msg.readUint32BE(msg.length - 4);
		if (crc32 != expectedCrc32) {
			throw new Error(`Wrong CRC32 ${crc32}, expected ${expectedCrc32}`);
		}

		const data = mqttMessageParser.parse(msg);
		delete data.payloadLen;
		const aesKey = this.md5bin(this._encodeTimestamp(data.timestamp) + localKey + salt);
		const decipher = crypto.createDecipheriv("aes-128-ecb", aesKey, null);
		data.payload = Buffer.concat([decipher.update(data.payload), decipher.final()]);
		return data;
	}

	async isArray(what) {
		return Object.prototype.toString.call(what) === "[object Array]";
	}

	async initMQTT_Message(rr) {
		this.adapter.log.info("MQTT initialized");

		client.on("message",  (topic, message) => {
			const duid = topic.split("/").slice(-1)[0];
			const data = this._decodeMsg(message, localKeys.get(duid));
			rr.emit("response.raw", duid, data);

			// for (const row in JSON.parse(data.payload).dps["102"])
			// {
			// 	this.adapter.log.debug("Mqtt test: " + topic + ": " + typeof(row));
			// }

			// this.adapter.log.debug("Raw data test: " + JSON.stringify(data.payload));
			// this.adapter.log.debug("Raw data test: " + JSON.stringify(data.payload));
			// this.adapter.log.debug(typeof(data.payload));
			// for (const row in data.payload)
			// {
			// 	this.adapter.log.debug(row + ":" + typeof(row));
			// }

			// this.adapter.log.debug("Protocol: " + data.protocol);
			if (data.protocol == 102) {
				// sometimes JSON.parse(data.payload).dps["102"] is not a JSON. Check for this!
				let dps;
				if (typeof(JSON.parse(data.payload).dps["102"]) != "undefined")
				{
					dps = JSON.parse(JSON.parse(data.payload).dps["102"]);
				}
				else
				{
					dps = JSON.parse(data.payload).dps;
				}
				this.adapter.log.debug("dps debug: " + JSON.stringify(dps));
				if (typeof(dps.result) == "object") {
					// this.adapter.log.debug("dps debug 2: " + dps.result.length);
				}

				// this.adapter.log.debug("dps result debug: " + JSON.stringify(dps.result));
				// this.adapter.log.debug("dps result debug type: " + typeof(dps.result[0]));
				if (typeof(dps.method) != "undefined") {
					rr.emit("response.102", duid, dps.id);
				// } else if (dps.result != "undefined") {
				} else if (!this.isArray(dps.result)) {
					rr.emit("response.102", duid, dps.id, dps.result[0]);
				}
				else if (dps.result) {
					rr.emit("response.102", duid, dps.id, dps.result);
				}
				else {
					rr.emit("foreign.message", duid, dps);
				}
			} else if (data.protocol == 301) {
				const data2 = protocol301Parser.parse(data.payload.subarray(0, 24));
				if (endpoint.startsWith(data2.endpoint)) {
					const iv = Buffer.alloc(16, 0);
					const decipher = crypto.createDecipheriv("aes-128-cbc", nonce, iv);
					let decrypted = Buffer.concat([decipher.update(data.payload.subarray(24)), decipher.final()]);
					decrypted = zlib.gunzipSync(decrypted);
					rr.emit("response.301", duid, data2.id, decrypted);
				}
			}
		});
	}

	_encodeTimestamp(timestamp) {
		const hex = timestamp.toString(16).padStart(8, "0").split("");
		return [5, 6, 3, 7, 1, 2, 0, 4].map(idx => hex[idx]).join("");
	}

	async sendRequest(deviceId, rr, method, params, secure = false) {
		const timestamp = Math.floor(Date.now() / 1000);
		const requestId = idCounter++;
		const inner = {
			id: requestId,
			method: method,
			params: params
		};
		if (secure) {
			inner.security = {
				endpoint: endpoint,
				nonce: nonce.toString("hex").toUpperCase()
			};
		}
		const payload = JSON.stringify({
			t: timestamp,
			dps: {
				"101": JSON.stringify(inner)
			}
		});
		return new Promise((resolve, reject) => {
			rr.on("response.102", (deviceId, id, result) => {
				if (id == requestId) {
					if (secure) {
						if (result != "ok") {
							reject(result);
						}
					} else {
						resolve(result);
					}
				}
			});
			if (secure) {
				rr.on("response.301", (deviceId, id, result) => {
					if (id == requestId) {
						resolve(result);
					}
				});
			}
			this.sendMsgRaw(deviceId, 101, timestamp, payload);
		});
	}

	sendMsgRaw(deviceId, protocol, timestamp, payload) {
		const localKey = localKeys.get(deviceId);
		const aesKey = this.md5bin(this._encodeTimestamp(timestamp) + localKey + salt);
		const cipher = crypto.createCipheriv("aes-128-ecb", aesKey, null);
		const encrypted = Buffer.concat([cipher.update(payload), cipher.final()]);
		const msg = Buffer.alloc(23 + encrypted.length);
		msg.write("1.0");
		msg.writeUint32BE(seq++ & 0xffffffff, 3);
		msg.writeUint32BE(random++ & 0xffffffff, 7);
		msg.writeUint32BE(timestamp, 11);
		msg.writeUint16BE(protocol, 15);
		msg.writeUint16BE(encrypted.length, 17);
		encrypted.copy(msg, 19);
		const crc32 = CRC32.buf(msg.subarray(0, msg.length - 4)) >>> 0;
		msg.writeUint32BE(crc32, msg.length - 4);
		client.publish(`rr/m/i/${rriot.u}/${mqttUser}/${deviceId}`, msg);
	}

	md5hex(str) {
		return crypto.createHash("md5").update(str).digest("hex");
	}

	md5bin(str) {
		return crypto.createHash("md5").update(str).digest();
	}
}

module.exports = {
	roborock_mqtt_connector,
};
