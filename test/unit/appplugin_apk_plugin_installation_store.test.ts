import { afterEach, describe, expect, it } from "vitest";
import {
	mkdtemp,
	readFile,
	rm,
	writeFile,
} from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";

import {
	ApkMainPluginInstallationStore,
} from "../../src/apppluginHost/apkPluginInstallationStore";
import {
	ApkJsonMainPluginInstallationPersistence,
} from "../../src/apppluginHost/apkPluginInstallationPersistence";

const temporaryDirectories: string[] = [];

afterEach(async () => {
	await Promise.all(temporaryDirectories.splice(0).map(directory =>
		rm(directory, { force: true, recursive: true }),
	));
});

describe("APK AppPlugin installation store", () => {
	it("exposes a version only after the staged package is committed", () => {
		const store = new ApkMainPluginInstallationStore();

		store.stage("roborock.vacuum.sc01", 42, 7);

		expect(store.hasPending("roborock.vacuum.sc01")).toBe(true);
		expect(store.getDownloadVersion("roborock.vacuum.sc01")).toBe(0);
		expect(store.toSessionContext()).toEqual({
			mainPluginDownloadVersions: {},
		});

		expect(store.commit("roborock.vacuum.sc01")).toEqual({
			downloadVersion: 42,
			pluginLevel: 7,
		});
		expect(store.hasPending("roborock.vacuum.sc01")).toBe(false);
		expect(store.getDownloadVersion("roborock.vacuum.sc01")).toBe(42);
		expect(store.toSessionContext()).toEqual({
			mainPluginDownloadVersions: {
				"roborock.vacuum.sc01": 42,
			},
		});
	});

	it("keeps the previous installed version when an update fails", () => {
		const store = new ApkMainPluginInstallationStore({
			"roborock.vacuum.sc01": {
				downloadVersion: 41,
				pluginLevel: 6,
			},
		});

		store.stage("roborock.vacuum.sc01", 42, 7);
		store.abort("roborock.vacuum.sc01");

		expect(store.getInstalled("roborock.vacuum.sc01")).toEqual({
			downloadVersion: 41,
			pluginLevel: 6,
		});
		expect(store.getDownloadVersion("roborock.vacuum.sc01")).toBe(41);
	});

	it("fails closed instead of committing an unstaged or malformed package", () => {
		const store = new ApkMainPluginInstallationStore();

		expect(() => store.commit("roborock.vacuum.sc01")).toThrow(/keine AppPlugin-Installation/u);
		expect(() => store.stage("roborock.vacuum.sc01", -1, 1))
			.toThrow(/nichtnegative ganze Zahl/u);
		expect(() => store.stage("", 1, 1)).toThrow(/darf nicht leer sein/u);
	});

	it("does not expose a commit when durable persistence fails", async () => {
		const store = new ApkMainPluginInstallationStore({
			"roborock.vacuum.sc01": {
				downloadVersion: 41,
				pluginLevel: 6,
			},
		});
		store.stage("roborock.vacuum.sc01", 42, 7);

		await expect(store.commitPersisted("roborock.vacuum.sc01", {
			save: async () => {
				throw new Error("disk full");
			},
		})).rejects.toThrow(/disk full/u);

		expect(store.getInstalled("roborock.vacuum.sc01")).toEqual({
			downloadVersion: 41,
			pluginLevel: 6,
		});
		expect(store.hasPending("roborock.vacuum.sc01")).toBe(true);
	});

	it("serializes concurrent persisted commits without losing another model", async () => {
		const store = new ApkMainPluginInstallationStore();
		store.stage("roborock.vacuum.sc01", 42, 7);
		store.stage("roborock.vacuum.a01", 11, 3);
		const snapshots: unknown[] = [];
		const persistence = {
			save: async (snapshot: unknown) => {
				await Promise.resolve();
				snapshots.push(snapshot);
			},
		};

		await Promise.all([
			store.commitPersisted("roborock.vacuum.sc01", persistence),
			store.commitPersisted("roborock.vacuum.a01", persistence),
		]);

		expect(snapshots).toHaveLength(2);
		expect(snapshots[1]).toEqual({
			"roborock.vacuum.a01": {
				downloadVersion: 11,
				pluginLevel: 3,
			},
			"roborock.vacuum.sc01": {
				downloadVersion: 42,
				pluginLevel: 7,
			},
		});
	});

	it("round-trips only credential-free installation metadata", async () => {
		const root = await mkdtemp(path.join(os.tmpdir(), "apk-install-store-"));
		temporaryDirectories.push(root);
		const filePath = path.join(root, "installations.json");
		const persistence = new ApkJsonMainPluginInstallationPersistence(filePath);
		await persistence.save({
			"roborock.vacuum.sc01": {
				downloadVersion: 42,
				pluginLevel: 7,
			},
		});

		const storedText = await readFile(filePath, "utf8");
		expect(storedText).not.toContain("token");
		expect(await persistence.load()).toEqual({
			"roborock.vacuum.sc01": {
				downloadVersion: 42,
				pluginLevel: 7,
			},
		});
		expect((await persistence.loadStore()).getDownloadVersion(
			"roborock.vacuum.sc01",
		)).toBe(42);

		await persistence.save({
			"roborock.vacuum.sc01": {
				downloadVersion: 43,
				pluginLevel: 8,
			},
		});
		expect(await persistence.load()).toEqual({
			"roborock.vacuum.sc01": {
				downloadVersion: 43,
				pluginLevel: 8,
			},
		});

		await writeFile(filePath, "{\"schemaVersion\":2,\"installations\":{}}", "utf8");
		await expect(persistence.load()).rejects.toThrow(/nicht unterstützt/u);
	});
});
