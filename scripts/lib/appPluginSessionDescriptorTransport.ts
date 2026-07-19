import * as fs from "node:fs";

import {
	parseApkAppPluginSessionDescriptor,
	type ApkAppPluginSessionDescriptor,
} from "../../src/apppluginHost";

export const APPPLUGIN_SESSION_DESCRIPTOR_MAX_BYTES = 8 * 1024 * 1024;

function validateMaximumBytes(maximumBytes: number): number {
	if (!Number.isSafeInteger(maximumBytes) || maximumBytes <= 0) {
		throw new Error("Maximale Sitzungsdeskriptorgröße muss eine positive ganze Zahl sein");
	}
	return maximumBytes;
}

export function serializeAppPluginSessionDescriptor(
	descriptor: ApkAppPluginSessionDescriptor,
	maximumBytes = APPPLUGIN_SESSION_DESCRIPTOR_MAX_BYTES,
): Buffer {
	validateMaximumBytes(maximumBytes);
	const payload = Buffer.from(JSON.stringify(descriptor), "utf8");
	if (payload.length === 0 || payload.length > maximumBytes) {
		throw new Error(
			`APK-AppPlugin-Sitzungsdeskriptor muss zwischen 1 und ${maximumBytes} Bytes groß sein`,
		);
	}
	return payload;
}

export function readAppPluginSessionDescriptorFromFd(
	fileDescriptor: number,
	baseDirectory: string,
	maximumBytes = APPPLUGIN_SESSION_DESCRIPTOR_MAX_BYTES,
): ApkAppPluginSessionDescriptor {
	validateMaximumBytes(maximumBytes);
	const chunks: Buffer[] = [];
	let totalBytes = 0;
	for (;;) {
		const chunk = Buffer.allocUnsafe(Math.min(64 * 1024, maximumBytes + 1 - totalBytes));
		const bytesRead = fs.readSync(fileDescriptor, chunk, 0, chunk.length, null);
		if (bytesRead === 0) break;
		totalBytes += bytesRead;
		if (totalBytes > maximumBytes) {
			throw new Error(
				`APK-AppPlugin-Sitzungsdeskriptor überschreitet ${maximumBytes} Bytes`,
			);
		}
		chunks.push(Buffer.from(chunk.subarray(0, bytesRead)));
	}
	if (totalBytes === 0) {
		throw new Error("APK-AppPlugin-Sitzungsdeskriptor auf der Standardeingabe fehlt");
	}
	let value: unknown;
	try {
		value = JSON.parse(Buffer.concat(chunks, totalBytes).toString("utf8")) as unknown;
	} catch {
		throw new Error("APK-AppPlugin-Sitzungsdeskriptor auf der Standardeingabe ist kein gültiges JSON");
	}
	return parseApkAppPluginSessionDescriptor(value, baseDirectory);
}
