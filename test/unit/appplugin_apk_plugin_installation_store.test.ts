import { describe, expect, it } from "vitest";

import {
	ApkMainPluginInstallationStore,
} from "../../src/apppluginHost/apkPluginInstallationStore";

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
});
