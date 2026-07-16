import * as crypto from "node:crypto";
import * as zlib from "node:zlib";

export type ApkRpcBlobVersion = 0 | 1 | 2;

export class ApkRpcBlobCodecError extends Error {
	public constructor(
		public readonly stage: "header" | "key" | "decrypt" | "gzip",
		message: string,
		options?: ErrorOptions,
	) {
		super(message, options);
		this.name = "ApkRpcBlobCodecError";
	}
}

function decodeHexKey(nonce: string): Buffer {
	if (!/^[0-9a-fA-F]{32}$/u.test(nonce)) {
		throw new ApkRpcBlobCodecError("key", "Der APK-RPC-Nonce muss aus genau 32 Hex-Zeichen bestehen.");
	}
	return Buffer.from(nonce, "hex");
}

function gunzip(payload: Buffer): Buffer {
	try {
		return zlib.gunzipSync(payload, { chunkSize: 0x800 });
	} catch (error) {
		throw new ApkRpcBlobCodecError("gzip", "Die APK-RPC-Antwort ist kein gültiger GZIP-Datenstrom.", {
			cause: error,
		});
	}
}

/**
 * Reproduces androidx.appcompat.view.menu.OooOOO0 case 11 from the APK.
 * The first byte is the protocol version inserted by RRRpcManager.
 */
export function decodeApkRpcBlob(encodedResponse: Uint8Array, nonce: string): Buffer {
	const response = Buffer.from(encodedResponse);
	if (response.length < 2) {
		throw new ApkRpcBlobCodecError("header", "Die APK-RPC-Antwort enthält keinen Nutzdatenblock.");
	}
	const version = response[0];
	const payload = response.subarray(1);
	if (version === 2) return Buffer.from(payload);
	if (version === 0) return gunzip(payload);

	let decrypted: Buffer;
	try {
		const decipher = crypto.createDecipheriv("aes-128-cbc", decodeHexKey(nonce), Buffer.alloc(16));
		decrypted = Buffer.concat([decipher.update(payload), decipher.final()]);
	} catch (error) {
		if (error instanceof ApkRpcBlobCodecError) throw error;
		throw new ApkRpcBlobCodecError("decrypt", "Die APK-RPC-Antwort konnte nicht entschlüsselt werden.", {
			cause: error,
		});
	}
	return gunzip(decrypted);
}

export function decodeApkRpcBlobToBase64(encodedResponse: Uint8Array, nonce: string): string {
	return decodeApkRpcBlob(encodedResponse, nonce).toString("base64");
}
