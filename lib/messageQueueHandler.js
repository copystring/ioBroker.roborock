"use strict";

const requestTimeout = 10000; // 10s

class messageQueueHandler {
	constructor(adapter) {
		this.adapter = adapter;
	}

	async sendRequest(duid, method, params, secure = false, photo = false) {
		const remoteConnection = await this.adapter.isRemoteDevice(duid);

		let messageID = this.adapter.getRequestId();
		if (photo) messageID = messageID % 256; // this is a special case. Otherwise photo requests will not have the correct ID in the response.
		const timestamp = Math.floor(Date.now() / 1000);

		let protocol;
		if (remoteConnection || secure || photo || method == "get_network_info") {
			protocol = 101;
		} else {
			protocol = 4;
		}
		const payload = this.adapter.message.buildPayload(protocol, messageID, method, params, secure, photo);
		const roborockMessage = await this.adapter.message.buildRoborockMessage(duid, protocol, timestamp, payload);

		const deviceOnline = await this.adapter.onlineChecker(duid);
		if (roborockMessage) {
			return new Promise((resolve, reject) => {
				if (!deviceOnline) {
					this.adapter.pendingRequests.delete(messageID);
					reject(new Error(`Device ${duid} offline. Not sending request!`));
				} else {
					// setup Timeout
					const timeout = this.adapter.setTimeout(() => {
						this.adapter.pendingRequests.delete(messageID);
						if (remoteConnection) {
							reject(new Error(`Cloud request with id ${messageID} with method ${method} timed out after 10 seconds`));
						} else {
							reject(new Error(`Local request with id ${messageID} with method ${method} timed out after 10 seconds`));
						}
					}, requestTimeout);

					// Store request with resolve and reject functions
					this.adapter.pendingRequests.set(messageID, { resolve, reject, timeout });

					if (remoteConnection || secure || photo || method == "get_network_info") {
						this.adapter.rr_mqtt_connector.sendMessage(duid, roborockMessage);
						this.adapter.log.debug(`Sent payload for ${duid} with ${payload} using cloud connection`);
						//client.publish(`rr/m/i/${rriot.u}/${mqttUser}/${duid}`, roborockMessage, { qos: 1 });
						// this.adapter.log.debug(`Promise for messageID ${messageID} created. ${this.adapter.message._decodeMsg(roborockMessage, duid).payload}`);
					} else {
						const lengthBuffer = Buffer.alloc(4);
						lengthBuffer.writeUInt32BE(roborockMessage.length, 0);

						const fullMessage = Buffer.concat([lengthBuffer, roborockMessage]);
						this.adapter.localConnector.sendMessage(duid, fullMessage);
						// this.adapter.log.debug(`sent fullMessage: ${fullMessage.toString("hex")}`);
						this.adapter.log.debug(`Sent payload for ${duid} with ${payload} using local connection`);
					}
				}
			}).finally(() => {
				this.adapter.log.debug(`Size of message queue: ${this.adapter.pendingRequests.size}`);
			});
		} else {
			this.adapter.catchError("Failed to build buildRoborockMessage!");
		}
	}
}

module.exports = {
	messageQueueHandler,
};
