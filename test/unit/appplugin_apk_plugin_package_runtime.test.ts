import {
	generateKeyPairSync,
	sign,
} from "node:crypto";
import {
	mkdtemp,
	readFile,
	rm,
	stat,
} from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";

import JSZip from "jszip";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
	ApkAppPluginPackageRuntime,
} from "../../src/apppluginHost/apkPluginPackageRuntime";
import {
	ApkRsaPluginPackageSignatureVerifier,
} from "../../src/apppluginHost/apkPluginPackageInstaller";

const temporaryDirectories: string[] = [];

async function temporaryDirectory(): Promise<string> {
	const directory = await mkdtemp(path.join(os.tmpdir(), "apk-package-runtime-"));
	temporaryDirectories.push(directory);
	return directory;
}

afterEach(async () => {
	await Promise.all(temporaryDirectories.splice(0).map(directory =>
		rm(directory, { force: true, recursive: true }),
	));
});

async function signedPackage(): Promise<{
	readonly bytes: Buffer;
	readonly verifier: ApkRsaPluginPackageSignatureVerifier;
}> {
	const archive = new JSZip();
	archive.file("index.android.bundle", "runtime bundle");
	const payload = await archive.generateAsync({
		compression: "DEFLATE",
		type: "nodebuffer",
	});
	const keys = generateKeyPairSync("rsa", { modulusLength: 2048 });
	return {
		bytes: Buffer.concat([
			payload,
			sign("sha256", payload, keys.privateKey),
		]),
		verifier: new ApkRsaPluginPackageSignatureVerifier(keys.publicKey),
	};
}

function metadataResponse(): unknown {
	return {
		code: 200,
		data: [{
			apilevel: 10042,
			pluginLevel: 4,
			productid: 123,
			url: "https://cdn.example.test/123.zip",
			version: 7,
		}],
	};
}

describe("APK AppPlugin package runtime", () => {
	it("stays network-idle until explicit acquisition and restores its instance state", async () => {
		const instanceDataDirectory = await temporaryDirectory();
		const signed = await signedPackage();
		const post = vi.fn(async () => ({ data: metadataResponse() }));
		const artifactFetch = vi.fn(async (_url: string | URL, init?: RequestInit) => {
			expect(new Headers(init?.headers).has("Authorization")).toBe(false);
			return new Response(signed.bytes, { status: 200 });
		});
		const runtime = await ApkAppPluginPackageRuntime.create({
			artifactFetch,
			instanceDataDirectory,
			maxDownloadBytes: signed.bytes.length + 1,
			metadataClient: { post } as never,
			signatureVerifier: signed.verifier,
		});

		expect(post).not.toHaveBeenCalled();
		expect(artifactFetch).not.toHaveBeenCalled();
		expect(runtime.getInstallationContext()).toEqual({
			mainPluginDownloadVersions: {},
		});
		await expect(stat(path.join(instanceDataDirectory, "appplugin-runtime")))
			.rejects.toMatchObject({ code: "ENOENT" });

		const acquired = await runtime.acquire({
			model: "roborock.mower.a01",
			productId: 123,
			requiredPluginLevel: 3,
		});
		expect(await readFile(acquired.installation.bundlePath, "utf8"))
			.toBe("runtime bundle");
		expect(runtime.getInstalled("roborock.mower.a01")).toEqual({
			downloadVersion: 7,
			pluginLevel: 4,
		});
		runtime.shutdown();

		const restored = await ApkAppPluginPackageRuntime.create({
			artifactFetch,
			instanceDataDirectory,
			maxDownloadBytes: signed.bytes.length + 1,
			metadataClient: { post } as never,
			signatureVerifier: signed.verifier,
		});
		expect(restored.getInstallationContext()).toEqual({
			mainPluginDownloadVersions: {
				"roborock.mower.a01": 7,
			},
		});
		restored.shutdown();
	});

	it("aborts an active artifact request and rejects work after shutdown", async () => {
		const instanceDataDirectory = await temporaryDirectory();
		const signed = await signedPackage();
		let markFetchStarted: (() => void) | undefined;
		const fetchStarted = new Promise<void>(resolve => {
			markFetchStarted = resolve;
		});
		const runtime = await ApkAppPluginPackageRuntime.create({
			artifactFetch: async (_url, init) => new Promise((_resolve, reject) => {
				markFetchStarted?.();
				init?.signal?.addEventListener("abort", () => {
					reject(init.signal?.reason);
				}, { once: true });
			}),
			instanceDataDirectory,
			maxDownloadBytes: signed.bytes.length + 1,
			metadataClient: {
				post: async () => ({ data: metadataResponse() }),
			} as never,
			signatureVerifier: signed.verifier,
		});
		const acquisition = runtime.acquire({
			model: "roborock.mower.a01",
			productId: 123,
		});
		await fetchStarted;

		runtime.shutdown();

		await expect(acquisition).rejects.toThrow(/beendet/u);
		await expect(runtime.acquire({
			model: "roborock.mower.a01",
			productId: 123,
		})).rejects.toThrow(/bereits beendet/u);
	});
});
