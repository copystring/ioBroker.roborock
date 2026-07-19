import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import type { ApkAppPluginSessionDescriptor } from "../../src/apppluginHost";
import {
	readAppPluginSessionDescriptorFromFd,
	serializeAppPluginSessionDescriptor,
} from "../../scripts/lib/appPluginSessionDescriptorTransport";

const temporaryDirectories: string[] = [];

afterEach(() => {
	for (const directory of temporaryDirectories.splice(0)) {
		fs.rmSync(directory, { recursive: true, force: true });
	}
});

function createDescriptor(pluginRoot: string): ApkAppPluginSessionDescriptor {
	return {
		version: 1,
		pluginRoot,
		package: { models: ["roborock.vacuum.test"] },
		device: {
			userId: "user",
			ownerId: "owner",
			deviceId: "device",
			deviceSN: "serial",
			model: "roborock.vacuum.test",
			name: "Testgerät",
			firmwareVersion: "1.0",
			protocolVersion: "1.0",
			deviceProperties: { featuresNew: "sensitive-feature-context" },
			activeTime: 0,
			robotTimeZone: 0,
			iotType: 2,
		},
		host: {
			mobileModel: "ioBroker",
			androidRelease: "APK contract",
			clientId: "client",
			memoryMiB: 512,
			iotOriginDevId: "origin",
		},
	};
}

describe("AppPlugin session descriptor transport", () => {
	it("round-trips a descriptor through a bounded file descriptor without changing it", () => {
		const root = fs.mkdtempSync(path.join(os.tmpdir(), "appplugin-descriptor-transport-"));
		temporaryDirectories.push(root);
		const pluginRoot = path.join(root, "plugin");
		fs.mkdirSync(pluginRoot);
		fs.writeFileSync(path.join(pluginRoot, "index.android.bundle"), "fixture");
		const descriptor = createDescriptor(pluginRoot);
		const transportPath = path.join(root, "transport");
		fs.writeFileSync(transportPath, serializeAppPluginSessionDescriptor(descriptor));
		const fileDescriptor = fs.openSync(transportPath, "r");
		try {
			expect(readAppPluginSessionDescriptorFromFd(fileDescriptor, root)).toEqual(descriptor);
		} finally {
			fs.closeSync(fileDescriptor);
		}
	});

	it("rejects empty, invalid and oversized input without echoing its content", () => {
		const root = fs.mkdtempSync(path.join(os.tmpdir(), "appplugin-descriptor-reject-"));
		temporaryDirectories.push(root);
		for (const [name, payload, maximumBytes, expected] of [
			["empty", "", 32, "fehlt"],
			["invalid", "not-secret-json", 32, "kein gültiges JSON"],
			["large", "private-payload", 4, "überschreitet 4 Bytes"],
		] as const) {
			const transportPath = path.join(root, name);
			fs.writeFileSync(transportPath, payload);
			const fileDescriptor = fs.openSync(transportPath, "r");
			try {
				expect(() => readAppPluginSessionDescriptorFromFd(
					fileDescriptor,
					root,
					maximumBytes,
				)).toThrow(expected);
			} finally {
				fs.closeSync(fileDescriptor);
			}
		}
		expect(() => serializeAppPluginSessionDescriptor(createDescriptor(root), 1))
			.toThrow("zwischen 1 und 1 Bytes");
		expect(() => serializeAppPluginSessionDescriptor(createDescriptor(root), 0))
			.toThrow("positive ganze Zahl");
	});
});
