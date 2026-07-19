import {
	generateKeyPairSync,
	sign,
} from "node:crypto";
import {
	mkdtemp,
	readFile,
	rm,
	stat,
	writeFile,
} from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";
import JSZip from "jszip";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
	APK_MAIN_PLUGIN_INCOMPATIBLE_ERROR_CODE,
	APK_MAIN_PLUGIN_REQUEST_API_LEVEL,
	APK_MAIN_PLUGIN_TYPE,
	APK_MAIN_PLUGIN_URL_ERROR_CODE,
	ApkAxiosMainPluginVersionTransport,
	ApkMainPluginAcquisitionService,
	ApkMainPluginResolutionError,
	ApkMainPluginVersionResolver,
	ApkPluginArtifactDownloader,
	ApkPluginDownloadLimitError,
} from "../../src/apppluginHost/apkPluginAcquisition";
import {
	ApkJsonMainPluginInstallationPersistence,
} from "../../src/apppluginHost/apkPluginInstallationPersistence";
import {
	ApkMainPluginInstallationStore,
} from "../../src/apppluginHost/apkPluginInstallationStore";
import {
	ApkMainPluginPackageInstaller,
	ApkRsaPluginPackageSignatureVerifier,
} from "../../src/apppluginHost/apkPluginPackageInstaller";

const temporaryDirectories: string[] = [];

async function temporaryDirectory(prefix: string): Promise<string> {
	const directory = await mkdtemp(path.join(os.tmpdir(), prefix));
	temporaryDirectories.push(directory);
	return directory;
}

afterEach(async () => {
	await Promise.all(temporaryDirectories.splice(0).map(directory =>
		rm(directory, { force: true, recursive: true }),
	));
});

function metadataResponse(overrides: Record<string, unknown> = {}): unknown {
	return {
		code: 200,
		data: [{
			apilevel: 10042,
			pluginLevel: 9,
			productid: 123,
			url: "https://cdn.example.test/plugin.zip",
			version: 77,
			...overrides,
		}],
	};
}

describe("APK main AppPlugin acquisition", () => {
	it("sends the APK product query through the authenticated metadata client", async () => {
		const post = vi.fn(async () => ({ data: metadataResponse() }));
		const resolver = new ApkMainPluginVersionResolver(
			new ApkAxiosMainPluginVersionTransport({ post } as never),
		);

		await expect(resolver.resolve({
			productId: 123,
			requiredPluginLevel: 8,
		})).resolves.toEqual({
			apiLevel: 10042,
			pluginLevel: 9,
			productId: 123,
			url: "https://cdn.example.test/plugin.zip",
			version: 77,
		});
		expect(post).toHaveBeenCalledWith("api/v1/appplugin", {
			apilevel: APK_MAIN_PLUGIN_REQUEST_API_LEVEL,
			productids: [123],
			type: APK_MAIN_PLUGIN_TYPE,
		});
	});

	it.each([
		[
			{ pluginLevel: 7 },
			8,
			APK_MAIN_PLUGIN_INCOMPATIBLE_ERROR_CODE,
		],
		[
			{ apilevel: 10027 },
			0,
			APK_MAIN_PLUGIN_INCOMPATIBLE_ERROR_CODE,
		],
		[
			{ productid: 124 },
			0,
			APK_MAIN_PLUGIN_INCOMPATIBLE_ERROR_CODE,
		],
		[
			{ url: "file:///tmp/plugin.zip" },
			0,
			APK_MAIN_PLUGIN_URL_ERROR_CODE,
		],
	])("rejects incompatible or unsafe APK metadata %#", async (
		overrides,
		requiredPluginLevel,
		errorCode,
	) => {
		const resolver = new ApkMainPluginVersionResolver({
			queryMainPluginVersion: async () => metadataResponse(overrides),
		});

		const error = await resolver.resolve({
			productId: 123,
			requiredPluginLevel,
		}).catch(caught => caught);

		expect(error).toBeInstanceOf(ApkMainPluginResolutionError);
		expect(error.apkErrorCode).toBe(errorCode);
	});

	it("downloads artifacts without forwarding cloud authorization", async () => {
		const root = await temporaryDirectory("apk-download-");
		const destinationPath = path.join(root, "123.zip");
		const fetchMock = vi.fn(async (_url: string | URL, init?: RequestInit) => {
			const headers = new Headers(init?.headers);
			expect(headers.has("Authorization")).toBe(false);
			expect(headers.has("Cookie")).toBe(false);
			expect(headers.has("Range")).toBe(false);
			return new Response(Uint8Array.from([1, 2, 3, 4]), {
				headers: { "content-length": "4" },
				status: 200,
			});
		});
		const downloader = new ApkPluginArtifactDownloader({
			fetch: fetchMock,
			maxBytes: 16,
			timeoutMs: 1_000,
		});

		await expect(downloader.download({
			destinationPath,
			url: "https://cdn.example.test/123.zip",
		})).resolves.toEqual({
			destinationPath,
			downloadedBytes: 4,
			resumedBytes: 0,
		});
		expect([...await readFile(destinationPath)]).toEqual([1, 2, 3, 4]);
		await expect(stat(`${destinationPath}.temp`)).rejects.toMatchObject({
			code: "ENOENT",
		});
	});

	it("resumes a partial APK download only from a matching HTTP range", async () => {
		const root = await temporaryDirectory("apk-download-resume-");
		const destinationPath = path.join(root, "123.zip");
		await writeFile(`${destinationPath}.temp`, Uint8Array.from([1, 2]));
		const fetchMock = vi.fn(async (_url: string | URL, init?: RequestInit) => {
			expect(new Headers(init?.headers).get("Range")).toBe("bytes=2-");
			return new Response(Uint8Array.from([3, 4]), {
				headers: {
					"content-length": "2",
					"content-range": "bytes 2-3/4",
				},
				status: 206,
			});
		});
		const downloader = new ApkPluginArtifactDownloader({
			fetch: fetchMock,
			maxBytes: 16,
			timeoutMs: 1_000,
		});

		await expect(downloader.download({
			destinationPath,
			url: "https://cdn.example.test/123.zip",
		})).resolves.toMatchObject({
			downloadedBytes: 4,
			resumedBytes: 2,
		});
		expect([...await readFile(destinationPath)]).toEqual([1, 2, 3, 4]);
	});

	it("restarts instead of appending when a server ignores Range", async () => {
		const root = await temporaryDirectory("apk-download-restart-");
		const destinationPath = path.join(root, "123.zip");
		await writeFile(`${destinationPath}.temp`, Uint8Array.from([9, 9]));
		const downloader = new ApkPluginArtifactDownloader({
			fetch: async () => new Response(Uint8Array.from([1, 2, 3]), {
				status: 200,
			}),
			maxBytes: 16,
			timeoutMs: 1_000,
		});

		await expect(downloader.download({
			destinationPath,
			url: "https://cdn.example.test/123.zip",
		})).resolves.toMatchObject({
			downloadedBytes: 3,
			resumedBytes: 0,
		});
		expect([...await readFile(destinationPath)]).toEqual([1, 2, 3]);
	});

	it("restarts once after a stale HTTP range is rejected", async () => {
		const root = await temporaryDirectory("apk-download-416-");
		const destinationPath = path.join(root, "123.zip");
		await writeFile(`${destinationPath}.temp`, Uint8Array.from([9, 9]));
		let calls = 0;
		const downloader = new ApkPluginArtifactDownloader({
			fetch: async (_url, init) => {
				calls++;
				if (calls === 1) {
					expect(new Headers(init?.headers).get("Range")).toBe("bytes=2-");
					return new Response(null, { status: 416 });
				}
				expect(new Headers(init?.headers).has("Range")).toBe(false);
				return new Response(Uint8Array.from([1, 2, 3]), { status: 200 });
			},
			maxBytes: 16,
			timeoutMs: 1_000,
		});

		await expect(downloader.download({
			destinationPath,
			url: "https://cdn.example.test/123.zip",
		})).resolves.toMatchObject({
			downloadedBytes: 3,
			resumedBytes: 0,
		});
		expect(calls).toBe(2);
		expect([...await readFile(destinationPath)]).toEqual([1, 2, 3]);
	});

	it("does not append a contradictory partial response", async () => {
		const root = await temporaryDirectory("apk-download-bad-range-");
		const destinationPath = path.join(root, "123.zip");
		await writeFile(`${destinationPath}.temp`, Uint8Array.from([1, 2]));
		const downloader = new ApkPluginArtifactDownloader({
			fetch: async () => new Response(Uint8Array.from([3, 4]), {
				headers: { "content-range": "bytes 0-1/4" },
				status: 206,
			}),
			maxBytes: 16,
			timeoutMs: 1_000,
		});

		await expect(downloader.download({
			destinationPath,
			url: "https://cdn.example.test/123.zip",
		})).rejects.toThrow(/widersprüchlichen Byte-Bereich/u);
		expect([...await readFile(`${destinationPath}.temp`)]).toEqual([1, 2]);
	});

	it("fails closed and removes oversized partial content", async () => {
		const root = await temporaryDirectory("apk-download-limit-");
		const destinationPath = path.join(root, "123.zip");
		const stream = new ReadableStream<Uint8Array>({
			start(controller) {
				controller.enqueue(Uint8Array.from([1, 2, 3]));
				controller.enqueue(Uint8Array.from([4, 5, 6]));
				controller.close();
			},
		});
		const downloader = new ApkPluginArtifactDownloader({
			fetch: async () => new Response(stream, { status: 200 }),
			maxBytes: 4,
			timeoutMs: 1_000,
		});

		await expect(downloader.download({
			destinationPath,
			url: "https://cdn.example.test/123.zip",
		})).rejects.toBeInstanceOf(ApkPluginDownloadLimitError);
		await expect(stat(`${destinationPath}.temp`)).rejects.toMatchObject({
			code: "ENOENT",
		});
	});

	it("completes the signed package chain and persists only after activation", async () => {
		const root = await temporaryDirectory("apk-acquisition-chain-");
		const archive = new JSZip();
		archive.file("index.android.bundle", "unchanged bundle bytes");
		const payload = await archive.generateAsync({
			compression: "DEFLATE",
			type: "nodebuffer",
		});
		const keys = generateKeyPairSync("rsa", { modulusLength: 2048 });
		const signedPackage = Buffer.concat([
			payload,
			sign("sha256", payload, keys.privateKey),
		]);
		const storeFile = path.join(root, "state", "installations.json");
		const persistence = new ApkJsonMainPluginInstallationPersistence(storeFile);
		const store = new ApkMainPluginInstallationStore();
		const installer = new ApkMainPluginPackageInstaller({
			installationPersistence: persistence,
			installationStore: store,
			pluginRoot: path.join(root, "plugin_v3"),
			signatureVerifier: new ApkRsaPluginPackageSignatureVerifier(keys.publicKey),
		});
		const service = new ApkMainPluginAcquisitionService({
			downloadRoot: path.join(root, "downloads"),
			downloader: new ApkPluginArtifactDownloader({
				fetch: async () => new Response(signedPackage, { status: 200 }),
				maxBytes: signedPackage.length + 1,
				timeoutMs: 1_000,
			}),
			installer,
			resolver: new ApkMainPluginVersionResolver({
				queryMainPluginVersion: async () => metadataResponse(),
			}),
		});

		const result = await service.acquire({
			model: "roborock.mower.a01",
			productId: 123,
			requiredPluginLevel: 8,
		});

		expect(await readFile(result.installation.bundlePath, "utf8"))
			.toBe("unchanged bundle bytes");
		expect(store.getDownloadVersion("roborock.mower.a01")).toBe(77);
		expect(await persistence.load()).toEqual({
			"roborock.mower.a01": {
				downloadVersion: 77,
				pluginLevel: 9,
			},
		});
		await expect(stat(path.join(root, "downloads", "123.zip")))
			.rejects.toMatchObject({ code: "ENOENT" });
	});
});
