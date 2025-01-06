class sniffing {
	constructor(adapter) {
		this.adapter = adapter;

	}

	decodeSniffedMessage(data, devices) {
		const dataString = JSON.stringify(data);

		const duidMatch = dataString.match(/\/(\w+)\.\w{3}'/);
		if (duidMatch) {
			const duidSniffed = duidMatch[1];

			const device = devices.find((device) => device.duid === duidSniffed);
			if (device) {
				const localKey = device.localKey;

				const payloadMatch = dataString.match(/'([a-fA-F0-9]+)'/);
				if (payloadMatch) {
					const hexPayload = payloadMatch[1];
					const msg = Buffer.from(hexPayload, "hex");

					const decodedMessage = this.adapter.requests_handler.message_parser._decodeMsg(msg, localKey);
					this.adapter.log.debug(`Decoded sniffing message: ${JSON.stringify(JSON.parse(decodedMessage.payload))}`);
				}
			}
		}
	}
}

module.exports = sniffing;
