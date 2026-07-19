import {
	generateKeyPairSync,
	sign,
	type KeyObject,
} from "node:crypto";
import {
	mkdtemp,
	mkdir,
	readFile,
	rm,
	writeFile,
} from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";

import JSZip from "jszip";
import { afterEach, describe, expect, it } from "vitest";

import {
	ApkMainPluginPackageInstaller,
	ApkRsaPluginPackageSignatureVerifier,
} from "../../src/apppluginHost/apkPluginPackageInstaller";
import { ApkMainPluginInstallationStore } from "../../src/apppluginHost/apkPluginInstallationStore";

const temporaryDirectories: string[] = [];

async function temporaryDirectory(): Promise<string> {
	const directory = await mkdtemp(path.join(os.tmpdir(), "roborock-appplugin-install-"));
	temporaryDirectories.push(directory);
	return directory;
}

async function signedArchive(
	files: Readonly<Record<string, string>>,
	privateKey: KeyObject,
): Promise<Buffer> {
	const archive = new JSZip();
	for (const [name, contents] of Object.entries(files)) {
		archive.file(name, contents);
	}
	const payload = await archive.generateAsync({
		type: "nodebuffer",
		compression: "DEFLATE",
	});
	return Buffer.concat([
		payload,
		sign("sha256", payload, privateKey),
	]);
}

function testKeys(): { privateKey: KeyObject; publicKey: KeyObject } {
	return generateKeyPairSync("rsa", {
		modulusLength: 2048,
	});
}

afterEach(async () => {
	await Promise.all(temporaryDirectories.splice(0).map(directory =>
		rm(directory, { force: true, recursive: true }),
	));
});

describe("APK AppPlugin package installer", () => {
	it("verifies, stages and activates a signed main package before committing its version", async () => {
		const root = await temporaryDirectory();
		const pluginRoot = path.join(root, "plugin_v3");
		const model = "roborock.vacuum.sc01";
		const active = path.join(pluginRoot, model);
		await mkdir(active, { recursive: true });
		await writeFile(path.join(active, "index.android.bundle"), "old");
		const { privateKey, publicKey } = testKeys();
		const archivePath = path.join(root, "plugin.zip");
		await writeFile(archivePath, await signedArchive({
			"index.android.bundle": "new",
			"assets/icon.txt": "asset",
		}, privateKey));
		const store = new ApkMainPluginInstallationStore({
			[model]: {
				downloadVersion: 41,
				pluginLevel: 6,
			},
		});
		const installer = new ApkMainPluginPackageInstaller({
			pluginRoot,
			installationStore: store,
			signatureVerifier: new ApkRsaPluginPackageSignatureVerifier(publicKey),
		});

		const result = await installer.install({
			model,
			archivePath,
			downloadVersion: 42,
			pluginLevel: 7,
		});

		expect(result.installation).toEqual({
			downloadVersion: 42,
			pluginLevel: 7,
		});
		expect(await readFile(result.bundlePath, "utf8")).toBe("new");
		expect(await readFile(path.join(active, "assets/icon.txt"), "utf8")).toBe("asset");
		expect(store.getDownloadVersion(model)).toBe(42);
		await expect(readFile(path.join(pluginRoot, `${model}_tmp`))).rejects.toThrow();
		await expect(readFile(path.join(pluginRoot, `${model}_READY`))).rejects.toThrow();
		await expect(readFile(path.join(pluginRoot, `.rollback-${model}`))).rejects.toThrow();
	});

	it("keeps the active package and installed version when the signature is invalid", async () => {
		const root = await temporaryDirectory();
		const pluginRoot = path.join(root, "plugin_v3");
		const model = "roborock.vacuum.sc01";
		const active = path.join(pluginRoot, model);
		await mkdir(active, { recursive: true });
		await writeFile(path.join(active, "index.android.bundle"), "old");
		const { privateKey, publicKey } = testKeys();
		const archive = await signedArchive({
			"index.android.bundle": "new",
		}, privateKey);
		archive[archive.length - 1] ^= 0xff;
		const archivePath = path.join(root, "plugin.zip");
		await writeFile(archivePath, archive);
		const store = new ApkMainPluginInstallationStore({
			[model]: {
				downloadVersion: 41,
				pluginLevel: 6,
			},
		});
		const installer = new ApkMainPluginPackageInstaller({
			pluginRoot,
			installationStore: store,
			signatureVerifier: new ApkRsaPluginPackageSignatureVerifier(publicKey),
		});

		await expect(installer.install({
			model,
			archivePath,
			downloadVersion: 42,
			pluginLevel: 7,
		})).rejects.toThrow(/RSA-Signatur/u);

		expect(await readFile(path.join(active, "index.android.bundle"), "utf8")).toBe("old");
		expect(store.getDownloadVersion(model)).toBe(41);
		expect(store.hasPending(model)).toBe(false);
	});

	it("rolls the active package back when durable metadata commit fails", async () => {
		const root = await temporaryDirectory();
		const pluginRoot = path.join(root, "plugin_v3");
		const model = "roborock.vacuum.sc01";
		const active = path.join(pluginRoot, model);
		await mkdir(active, { recursive: true });
		await writeFile(path.join(active, "index.android.bundle"), "old");
		const { privateKey, publicKey } = testKeys();
		const archivePath = path.join(root, "plugin.zip");
		await writeFile(archivePath, await signedArchive({
			"index.android.bundle": "new",
		}, privateKey));
		const store = new ApkMainPluginInstallationStore({
			[model]: {
				downloadVersion: 41,
				pluginLevel: 6,
			},
		});
		const installer = new ApkMainPluginPackageInstaller({
			pluginRoot,
			installationStore: store,
			installationPersistence: {
				save: async () => {
					throw new Error("disk full");
				},
			},
			signatureVerifier: new ApkRsaPluginPackageSignatureVerifier(publicKey),
		});

		await expect(installer.install({
			model,
			archivePath,
			downloadVersion: 42,
			pluginLevel: 7,
		})).rejects.toThrow(/disk full/u);

		expect(await readFile(path.join(active, "index.android.bundle"), "utf8")).toBe("old");
		expect(store.getDownloadVersion(model)).toBe(41);
		expect(store.hasPending(model)).toBe(false);
	});

	it("rejects a signed archive without the APK entry bundle", async () => {
		const root = await temporaryDirectory();
		const { privateKey, publicKey } = testKeys();
		const archivePath = path.join(root, "plugin.zip");
		await writeFile(archivePath, await signedArchive({
			"project.json": "{}",
		}, privateKey));
		const store = new ApkMainPluginInstallationStore();
		const installer = new ApkMainPluginPackageInstaller({
			pluginRoot: path.join(root, "plugin_v3"),
			installationStore: store,
			signatureVerifier: new ApkRsaPluginPackageSignatureVerifier(publicKey),
		});

		await expect(installer.install({
			model: "roborock.mower.a01",
			archivePath,
			downloadVersion: 1,
			pluginLevel: 1,
		})).rejects.toThrow(/index\.android\.bundle/u);

		expect(store.getDownloadVersion("roborock.mower.a01")).toBe(0);
		expect(store.hasPending("roborock.mower.a01")).toBe(false);
	});

	it("rejects path traversal even when the archive has a valid signature", async () => {
		const root = await temporaryDirectory();
		const { privateKey, publicKey } = testKeys();
		const archivePath = path.join(root, "plugin.zip");
		await writeFile(archivePath, await signedArchive({
			"index.android.bundle": "bundle",
			"../outside.txt": "escape",
		}, privateKey));
		const store = new ApkMainPluginInstallationStore();
		const installer = new ApkMainPluginPackageInstaller({
			pluginRoot: path.join(root, "plugin_v3"),
			installationStore: store,
			signatureVerifier: new ApkRsaPluginPackageSignatureVerifier(publicKey),
		});

		await expect(installer.install({
			model: "roborock.mower.a01",
			archivePath,
			downloadVersion: 1,
			pluginLevel: 1,
		})).rejects.toThrow(/Archivpfad/u);

		await expect(readFile(path.join(root, "outside.txt"))).rejects.toThrow();
		expect(store.getDownloadVersion("roborock.mower.a01")).toBe(0);
	});

	it("streams extraction through the configured uncompressed-size limit", async () => {
		const root = await temporaryDirectory();
		const pluginRoot = path.join(root, "plugin_v3");
		const model = "roborock.vacuum.sc01";
		const active = path.join(pluginRoot, model);
		await mkdir(active, { recursive: true });
		await writeFile(path.join(active, "index.android.bundle"), "old");
		const { privateKey, publicKey } = testKeys();
		const archivePath = path.join(root, "plugin.zip");
		await writeFile(archivePath, await signedArchive({
			"index.android.bundle": "this bundle is larger than eight bytes",
		}, privateKey));
		const store = new ApkMainPluginInstallationStore({
			[model]: {
				downloadVersion: 41,
				pluginLevel: 6,
			},
		});
		const installer = new ApkMainPluginPackageInstaller({
			pluginRoot,
			installationStore: store,
			signatureVerifier: new ApkRsaPluginPackageSignatureVerifier(publicKey),
			limits: {
				maxEntryBytes: 8,
			},
		});

		await expect(installer.install({
			model,
			archivePath,
			downloadVersion: 42,
			pluginLevel: 7,
		})).rejects.toThrow(/Größenlimit/u);

		expect(await readFile(path.join(active, "index.android.bundle"), "utf8")).toBe("old");
		expect(store.getDownloadVersion(model)).toBe(41);
		expect(store.hasPending(model)).toBe(false);
	});

	it("verifies the detached category-bundle signature used by RnCardPluginFileRepo", async () => {
		const root = await temporaryDirectory();
		const { privateKey, publicKey } = testKeys();
		const bundlePath = path.join(root, "index.android.bundle");
		const payload = Buffer.from("category bundle");
		await writeFile(bundlePath, payload);
		await writeFile(`${bundlePath}.sign`, sign("sha256", payload, privateKey));
		const installer = new ApkMainPluginPackageInstaller({
			pluginRoot: path.join(root, "plugin_v3"),
			installationStore: new ApkMainPluginInstallationStore(),
			signatureVerifier: new ApkRsaPluginPackageSignatureVerifier(publicKey),
		});

		await expect(installer.verifyDetachedBundle(bundlePath)).resolves.toBe(true);

		await writeFile(bundlePath, "modified");
		await expect(installer.verifyDetachedBundle(bundlePath)).resolves.toBe(false);

		await rm(`${bundlePath}.sign`);
		await expect(installer.verifyDetachedBundle(bundlePath)).resolves.toBe(false);
	});
});
