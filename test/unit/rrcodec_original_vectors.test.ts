import { describe, expect, it } from "vitest";
import { cryptoEngine } from "../../src/lib/cryptoEngine";

const payload = Buffer.from("7b22647073223a7b22313031223a317d7d", "hex");
const localKey = "0123456789abcdef";
const timestamp = 1_717_171_717;
const random = 42;

const originalCiphertexts = {
	v1: Buffer.from("RBtlrWO2d70adxdh9AjxqnXIrQqOHOQyBWB19chzHEc=", "base64"),
	a01: Buffer.from("nI5si47A0MjI9r6wZeixTxZfXkENOYx/rzzkTgM9Bv0=", "base64"),
	b01: Buffer.from("7rngjTqKTAVmilDBDP7T5hSG2uttD8LxzB+eA1CKWjs=", "base64"),
	l01: Buffer.from("ktR5hWtGDMVMAwCUuciX1j3RuaqwN8KHB1ShNdZc6Huu", "base64")
};

describe("librrcodec.so original vectors", () => {
	it("matches codec / protocol 1.0 byte-for-byte", () => {
		expect(cryptoEngine.encryptV1(payload, localKey, timestamp)).toStrictEqual(originalCiphertexts.v1);
	});

	it("matches codec2 / protocol A01 byte-for-byte", () => {
		expect(cryptoEngine.encryptA01(payload, localKey, random)).toStrictEqual(originalCiphertexts.a01);
	});

	it("matches codecB1 / protocol B01 byte-for-byte", () => {
		expect(cryptoEngine.encryptB01(payload, localKey, random)).toStrictEqual(originalCiphertexts.b01);
	});

	it("matches codec3 / protocol L01 byte-for-byte", () => {
		const connectNonce = 11;
		const ackNonce = 22;
		const sequence = 33;
		expect(cryptoEngine.encryptL01(payload, localKey, timestamp, sequence, random, connectNonce, ackNonce)).toStrictEqual(
			originalCiphertexts.l01
		);
	});

	it.each([
		["1.0", () => cryptoEngine.decryptV1(originalCiphertexts.v1, localKey, timestamp)],
		["A01", () => cryptoEngine.decryptA01(originalCiphertexts.a01, localKey, random)],
		["B01", () => cryptoEngine.decryptB01(originalCiphertexts.b01, localKey, random)],
		["L01", () => cryptoEngine.decryptL01(originalCiphertexts.l01, localKey, timestamp, 33, random, 11, 22)],
	])("decrypts the original %s vector byte-for-byte", (_protocol, decrypt) => {
		expect(decrypt()).toStrictEqual(payload);
	});
});
