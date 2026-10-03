import { describe, expect, it, vi } from "vitest";
import JSZip from "jszip";
import { AppPluginManager } from "../../src/lib/AppPluginManager";

const model = "roborock.test.model";
const metaRoot = { type: "meta", common: { name: "Roborock assets", type: "meta.user" }, native: {} };

async function assetZip(): Promise<Buffer> {
	const zip = new JSZip();
	zip.file("drawable-mdpi/a.png", Buffer.from("a"));
	zip.file("drawable-mdpi/b.png", Buffer.from("b"));
	return zip.generateAsync({ type: "nodebuffer" });
}

function fixture(initialRoot: unknown = null) {
	let root = initialRoot;
	const files = new Map<string, Buffer>();
	const adapter = {
		name: "roborock",
		getForeignObjectAsync: vi.fn(async () => root),
		setForeignObjectNotExistsAsync: vi.fn(async (_id: string, object: unknown) => {
			if (!root) root = object;
		}),
		fileExistsAsync: vi.fn(async (_namespace: string, file: string) => files.has(file)),
		readDirAsync: vi.fn(async () => { throw new Error("directory missing"); }),
		readFileAsync: vi.fn(async (_namespace: string, file: string) => ({ file: files.get(file) })),
		mkdirAsync: vi.fn(async () => undefined),
		writeFileAsync: vi.fn(async (_namespace: string, file: string, data: Buffer) => { files.set(file, data); }),
		rLog: vi.fn(),
		errorMessage: (error: unknown) => error instanceof Error ? error.message : String(error),
		http_api: { loginApi: null }
	};
	const manager = new AppPluginManager(adapter as any);
	return { adapter, manager, files };
}

async function download(manager: AppPluginManager, get: ReturnType<typeof vi.fn>): Promise<boolean> {
	return (manager as any).downloadAndExtractAssetZip({ get }, "https://example.invalid/assets.zip", model, "12", null);
}

describe("AppPlugin asset storage", () => {
	it("creates the shared meta root before file operations and writes the version after assets", async () => {
		const { adapter, manager, files } = fixture();
		const get = vi.fn().mockResolvedValue({ data: await assetZip() });
		expect(await download(manager, get)).toBe(true);
		expect(adapter.setForeignObjectNotExistsAsync).toHaveBeenCalledWith("roborock", metaRoot);
		expect(adapter.getForeignObjectAsync).toHaveBeenCalledTimes(2);
		expect(adapter.fileExistsAsync).toHaveBeenCalledWith("roborock", `assets/${model}/version`);
		expect(adapter.mkdirAsync).toHaveBeenCalledWith("roborock", `assets/${model}`);
		expect(files.get(`assets/${model}/drawable-mdpi/a.png`)?.toString()).toBe("a");
		expect(files.get(`assets/${model}/version`)?.toString()).toBe("12");
	});

	it("uses an existing meta root and rejects a conflicting object without writing files", async () => {
		const get = vi.fn().mockResolvedValue({ data: await assetZip() });
		for (const existingRoot of [metaRoot, { type: "meta", common: { type: "meta.folder" } }, { type: "meta" }]) {
			const valid = fixture(existingRoot);
			expect(await download(valid.manager, get)).toBe(true);
			expect(valid.adapter.setForeignObjectNotExistsAsync).not.toHaveBeenCalled();
		}

		const wrong = fixture({ type: "device", common: { name: "Wrong" } });
		const wrongGet = vi.fn();
		expect(await download(wrong.manager, wrongGet)).toBe(false);
		expect(wrong.adapter.setForeignObjectNotExistsAsync).not.toHaveBeenCalled();
		expect(wrong.adapter.fileExistsAsync).not.toHaveBeenCalled();
		expect(wrong.adapter.mkdirAsync).not.toHaveBeenCalled();
		expect(wrongGet).not.toHaveBeenCalled();
		expect(wrong.files.has(`assets/${model}/version`)).toBe(false);
	});

	it("retries failed initialization without marking the version or downloading", async () => {
		const { adapter, manager, files } = fixture();
		adapter.setForeignObjectNotExistsAsync.mockRejectedValueOnce(new Error("object DB unavailable"));
		const get = vi.fn().mockResolvedValue({ data: await assetZip() });
		expect(await download(manager, get)).toBe(false);
		expect(get).not.toHaveBeenCalled();
		expect(files.has(`assets/${model}/version`)).toBe(false);
		expect(await download(manager, get)).toBe(true);
		expect(adapter.setForeignObjectNotExistsAsync).toHaveBeenCalledTimes(2);
	});

	it("does not treat a failed root lookup as a missing root", async () => {
		const { adapter, manager } = fixture();
		adapter.getForeignObjectAsync.mockRejectedValueOnce(new Error("object DB unavailable"));
		const get = vi.fn();
		expect(await download(manager, get)).toBe(false);
		expect(adapter.setForeignObjectNotExistsAsync).not.toHaveBeenCalled();
		expect(adapter.fileExistsAsync).not.toHaveBeenCalled();
		expect(get).not.toHaveBeenCalled();
	});

	it("shares initialization and directory creation across concurrent downloads", async () => {
		const { adapter, manager, files } = fixture();
		let releaseDirectory!: () => void;
		let directoryStarted!: () => void;
		const directoryGate = new Promise<void>(resolve => { releaseDirectory = resolve; });
		const directoryStartedGate = new Promise<void>(resolve => { directoryStarted = resolve; });
		adapter.mkdirAsync.mockImplementation(async (_namespace: string, directory: string) => {
			if (directory === `assets/${model}/drawable-mdpi`) {
				directoryStarted();
				await directoryGate;
			}
		});
		const get = vi.fn().mockResolvedValue({ data: await assetZip() });
		const downloads = Promise.all([download(manager, get), download(manager, get)]);
		await directoryStartedGate;
		expect(adapter.writeFileAsync).not.toHaveBeenCalled();
		releaseDirectory();
		expect(await downloads).toEqual([true, true]);
		expect(adapter.setForeignObjectNotExistsAsync).toHaveBeenCalledTimes(1);
		expect(get).toHaveBeenCalledTimes(1);
		expect(adapter.mkdirAsync).toHaveBeenCalledWith("roborock", `assets/${model}/drawable-mdpi`);
		expect(adapter.mkdirAsync.mock.calls.filter(call => call[1] === `assets/${model}/drawable-mdpi`)).toHaveLength(1);
		expect(files.get(`assets/${model}/version`)?.toString()).toBe("12");
	});

	it("waits for every asset write before reporting failure and leaves the version missing", async () => {
		const { adapter, manager, files } = fixture(metaRoot);
		let releaseWrite!: () => void;
		let writeStarted!: () => void;
		const writeGate = new Promise<void>(resolve => { releaseWrite = resolve; });
		const writeStartedGate = new Promise<void>(resolve => { writeStarted = resolve; });
		adapter.writeFileAsync.mockImplementation(async (_namespace: string, file: string, data: Buffer) => {
			if (file.endsWith("a.png")) throw new Error("file DB unavailable");
			if (file.endsWith("b.png")) {
				writeStarted();
				await writeGate;
			}
			files.set(file, data);
		});
		const get = vi.fn().mockResolvedValue({ data: await assetZip() });
		const result = download(manager, get);
		await writeStartedGate;
		expect(files.has(`assets/${model}/version`)).toBe(false);
		releaseWrite();
		expect(await result).toBe(false);
		expect(files.has(`assets/${model}/version`)).toBe(false);
	});
});
