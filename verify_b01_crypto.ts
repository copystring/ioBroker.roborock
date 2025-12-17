import { cryptoEngine } from "./src/lib/cryptoEngine";

async function run() {
	console.log("Verifying B01 Crypto (Real Dump)...");

	// Encrypted response from device (Golden Master)
	const incomingHex = "4230310000404f04226e1468cc3eaa0066008025a69d6ed58f8798486b5a73c1d44b4ec342ee6fc84de839f87608349f7f2edd830caab9cc86082d3ec85652cb6614173c192de18822141a0ad719e928db9ebac872368f99e611f547ad31fad4bcfd640fdfa91ee7b1706f7f3b6da7f786aa5fedf4ccc06c02cc64163e88db43db13ec7592c8ff0f7da348cbdd24787ef9f63d0ca8101c";
	const localKey = "0WczpPyjucptblG7";
	const expectedInnerId = "200000000001";

	// Header parsing (simulated)
	const message = Buffer.from(incomingHex, "hex");
	const version = message.toString("latin1", 0, 3); // "B01"
	const seq = message.readUInt32BE(3);
	const random = message.readUInt32BE(7);
	const payloadLen = message.readUInt16BE(17);
	const payload = message.subarray(19, 19 + payloadLen);

	console.log(`Header: Ver=${version}, Seq=${seq}, Rnd=${random}`);

	try {
		const decrypted = cryptoEngine.decryptB01(payload, localKey, random);
		console.log("Decrypted Payload String:", decrypted.toString());

		const json = JSON.parse(decrypted.toString());
		// console.log("Parsed JSON:", JSON.stringify(json, null, 2));

		const innerStr = json.dps["10001"];
		// B01 Double-JSON check
		const inner = typeof innerStr === "string" ? JSON.parse(innerStr) : innerStr;

		if (inner.msgId === expectedInnerId && inner.data.status === 4) {
			console.log("SUCCESS: B01 Crypto Verified!");
		} else {
			console.error("FAILURE: Decrypted content mismatch.");
		}
	} catch (e) {
		console.error("FAILURE: Decryption crashed:", e);
	}
}

run();
