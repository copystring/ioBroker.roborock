import { cryptoEngine } from "../src/lib/cryptoEngine";
import { expect } from "chai";

describe("cryptoEngine L01", () => {
	const localKey = "byteTheDust";
	const timestamp = 1737731337;
	const seq = 42;
	const random = 1337;
	const connectNonce = 1234;
	const ackNonce = 5678;

	it("should encrypt and decrypt L01 payload correctly", () => {
		const payload = Buffer.from("Hello Roborock L01", "utf-8");

		const encrypted = cryptoEngine.encryptL01(
			payload,
			localKey,
			timestamp,
			seq,
			random,
			connectNonce,
			ackNonce
		);

		expect(encrypted).to.be.instanceOf(Buffer);
		expect(encrypted.length).to.be.greaterThan(payload.length); // GCM appends auth tag

		const decrypted = cryptoEngine.decryptL01(
			encrypted,
			localKey,
			timestamp,
			seq,
			random,
			connectNonce,
			ackNonce
		);

		expect(decrypted.toString("utf-8")).to.equal(payload.toString("utf-8"));
	});

	it("should throw if nonces are missing", () => {
		const payload = Buffer.from("Test Missing Nonces", "utf-8");

		expect(() =>
			cryptoEngine.encryptL01(payload, localKey, timestamp, seq, random, 0 as any, undefined)
		).to.throw("Missing nonces for L01");

		expect(() =>
			cryptoEngine.decryptL01(payload, localKey, timestamp, seq, random, 0 as any, undefined)
		).to.throw("Missing nonces for L01");
	});
});

describe("cryptoEngine L01 - Official Vectors", () => {
	const localKey = "b8Hj5mFk3QzT7rLp";
	const timestamp = 1753606905;
	const sequence = 1;
	const nonce = 304251;
	const connectNonce = 893563;
	const ackNonce = 485592656;

	const plainPayload =
		'{"dps":{"101":"{\\"id\\":1806,\\"method\\":\\"get_prop\\",\\"params\\":[\\"get_status\\"]}"},"t":1753606905}';

	const encryptedPayload = Uint8Array.from([
		253, 96, 200, 218, 202, 28, 202, 230, 127, 96, 119, 71, 123, 250, 157, 55, 24, 154, 56, 215,
		91, 60, 74, 144, 124, 36, 53, 211, 193, 70, 238, 132, 216, 249, 149, 151, 227, 225, 87, 26,
		1, 89, 97, 206, 170, 77, 100, 188, 54, 149, 250, 224, 36, 195, 65, 103, 55, 215, 113, 80,
		52, 29, 226, 156, 173, 47, 149, 191, 175, 83, 35, 88, 241, 43, 191, 248, 159, 20, 15, 239,
		91, 30, 226, 132, 195, 171, 254, 59, 131, 165, 119, 145, 10, 114, 5, 109, 171, 77, 90, 117,
		177, 130, 209, 160, 203, 161, 69, 227, 228, 80, 243, 146, 116, 67,
	]);

	it("should encrypt to the known vector", () => {
		const encrypted = cryptoEngine.encryptL01(
			Buffer.from(plainPayload, "utf-8"),
			localKey,
			timestamp,
			sequence,
			nonce,
			connectNonce,
			ackNonce
		);

		expect(Array.from(encrypted)).to.deep.equal(Array.from(encryptedPayload));
	});

	it("should decrypt the known vector", () => {
		const decrypted = cryptoEngine.decryptL01(
			Buffer.from(encryptedPayload),
			localKey,
			timestamp,
			sequence,
			nonce,
			connectNonce,
			ackNonce
		);

		expect(decrypted.toString("utf-8")).to.equal(plainPayload);
	});
});
