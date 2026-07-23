import type { AxiosInstance } from "axios";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import * as path from "node:path";

import { afterEach, describe, expect, it, vi } from "vitest";

import {
	ApkAppPluginAuthenticatedAccountRuntime,
	type ApkAuthenticatedHttpAdapterPorts,
} from "../../src/apppluginHost";
import { http_api } from "../../src/lib/httpApi";

const temporaryDirectories: string[] = [];

afterEach(() => {
	for (const directory of temporaryDirectories.splice(0)) {
		rmSync(directory, { recursive: true, force: true });
	}
});

function pluginRoot(): string {
	const root = mkdtempSync(path.join(tmpdir(), "roborock-authenticated-account-"));
	temporaryDirectories.push(root);
	writeFileSync(path.join(root, "index.android.bundle"), "fixture");
	return root;
}

function homeData() {
	return {
		deviceJsonStrings: [
			JSON.stringify({
				duid: "vacuum-1",
				productId: "opaque-vacuum-product",
				activeTime: 1,
				timeZone: "Europe/Berlin",
				pv: "B01",
				localKey: "device-secret-stays-in-homedata",
			}),
			JSON.stringify({
				duid: "mower-1",
				productId: "opaque-mower-product",
				activeTime: 2,
				timeZone: "UTC",
				pv: "A01",
			}),
		],
		productJsonStrings: [
			JSON.stringify({ id: "opaque-vacuum-product", model: "roborock.vacuum.test" }),
			JSON.stringify({ id: "opaque-mower-product", model: "roborock.mower.test" }),
		],
	};
}

function httpPorts(): ApkAuthenticatedHttpAdapterPorts {
	const call = async () => "{}";
	return {
		iot: {
			delete: call,
			get: call,
			post: call,
			postJson: call,
			put: call,
			putJson: call,
		},
		user: {
			delete: call,
			get: call,
			post: call,
			postJson: call,
			put: call,
			putJson: call,
		},
	};
}

describe("APK AppPlugin authenticated account runtime", () => {
	it("couples one complete login generation to generic device sessions without cloud tokens", () => {
		const ports = httpPorts();
		const runtime = new ApkAppPluginAuthenticatedAccountRuntime({
			cloudBootstrap: {
				userId: "rr-user",
				account: { countryCode: "DE", serverCode: "eu" },
				homeData: homeData(),
				packageProducts: [
					{ id: 7, model: "roborock.vacuum.test" },
					{ id: 8, model: "roborock.mower.test" },
				],
			},
			httpPorts: ports,
			productRepository: {
				userRoles: [{
					role: "owner",
					products: [
						{ prodModel: "roborock.vacuum.test", catCode: "robot.vacuum.cleaner" },
						{ prodModel: "roborock.mower.test", catCode: "robot.lawn.mower" },
					],
				}],
			},
		});

		const descriptor = runtime.createSessionDescriptor({
			pluginRoot: pluginRoot(),
			package: { models: ["generic.main.plugin"], versionCode: 42 },
			targetDuid: "mower-1",
			host: {
				mobileModel: "ioBroker",
				androidRelease: "APK contract",
				clientId: "client-id",
				memoryMiB: 512,
			},
			deviceProperties: {},
		});

		expect(runtime.authenticatedHttpPorts()).toBe(ports);
		expect(runtime.summary()).toEqual({
			countryCode: "DE",
			deviceCount: 2,
			productCount: 2,
			roleCount: 1,
			serverCode: "eu",
			userId: "rr-user",
		});
		expect(descriptor.device.model).toBe("roborock.mower.test");
		expect(runtime.resolveDevicePackage("mower-1")).toEqual({
			model: "roborock.mower.test",
			productId: 8,
		});
		expect(descriptor.account).toEqual({ countryCode: "DE", serverCode: "eu" });
		expect(descriptor.productRepository?.userRoles[0]?.role).toBe("owner");
		expect(JSON.stringify({ descriptor, summary: runtime.summary() }))
			.not.toContain("cloud-access-token");
	});

	it("rejects incomplete login data and devices without their HomeData product", () => {
		expect(() => new ApkAppPluginAuthenticatedAccountRuntime({
			cloudBootstrap: { userId: "rr-user", homeData: homeData() },
			httpPorts: httpPorts(),
			productRepository: { userRoles: [] },
		})).toThrow(/Land oder Serverregion/u);

		const incomplete = new ApkAppPluginAuthenticatedAccountRuntime({
			cloudBootstrap: {
				userId: "rr-user",
				account: { countryCode: "DE", serverCode: "eu" },
					homeData: {
						...homeData(),
						productJsonStrings: [JSON.stringify({
							id: "opaque-vacuum-product",
							model: "roborock.vacuum.test",
						})],
				},
			},
			httpPorts: httpPorts(),
			productRepository: { userRoles: [] },
		});
		expect(() => incomplete.createSessionDescriptor({
			pluginRoot: pluginRoot(),
			package: { models: [], versionCode: 1 },
			targetDuid: "mower-1",
			host: {
				mobileModel: "ioBroker",
				androidRelease: "APK contract",
				clientId: "client-id",
				memoryMiB: 512,
			},
			deviceProperties: {},
		})).toThrow(/kein zugeordnetes Produkt/u);
	});

	it("captures the adapter's live login clients atomically instead of exposing credentials", async () => {
		const userRequest = vi.fn().mockResolvedValue({ data: "user-response" });
		const iotRequest = vi.fn().mockResolvedValue({ data: "iot-response" });
		const api = new http_api({} as never);
		api.loginApi = { request: userRequest } as unknown as AxiosInstance;
		api.realApi = { request: iotRequest } as unknown as AxiosInstance;
		api.userData = {
			token: "cloud-access-token",
			rruid: "rr-user",
			country: "DE",
			region: "eu",
			rriot: {
				u: "hawk-user",
				s: "hawk-salt",
				h: "hawk-secret",
				k: "device-key",
				r: { a: "https://iot.example.test", m: "ssl://mqtt.example.test" },
			},
		};
		api.homeData = {
			rrHomeId: 1,
			products: homeData().productJsonStrings.map(value => JSON.parse(value)),
			devices: homeData().deviceJsonStrings.map(value => JSON.parse(value)),
			receivedDevices: [],
			rooms: [],
		};
		api.productInfo = {
			code: 200,
			data: {
				categoryDetailList: [{
					productList: [
						{ id: 7, model: "roborock.vacuum.test" },
						{ id: 8, model: "roborock.mower.test" },
					],
				}],
			},
		} as never;

		const runtime = api.createAppPluginAuthenticatedAccountRuntime();

		expect(runtime.summary()).toMatchObject({ deviceCount: 2, productCount: 2 });
		await expect(runtime.authenticatedHttpPorts().user.get("api/user", null))
			.resolves.toBe("user-response");
		await expect(runtime.authenticatedHttpPorts().iot.get("api/iot", null))
			.resolves.toBe("iot-response");
		expect(userRequest).toHaveBeenCalledOnce();
		expect(iotRequest).toHaveBeenCalledOnce();
		expect(JSON.stringify(runtime)).toBe("{}");
	});

	it("fails closed before the adapter login generation is complete", () => {
		const api = new http_api({} as never);
		expect(() => api.createAppPluginAuthenticatedAccountRuntime())
			.toThrow(/Cloud-Anmeldung/u);

		api.userData = {
			token: "cloud-access-token",
			rruid: "rr-user",
			country: "DE",
			region: "eu",
			rriot: {
				u: "hawk-user",
				s: "hawk-salt",
				h: "hawk-secret",
				k: "device-key",
				r: { a: "https://iot.example.test", m: "ssl://mqtt.example.test" },
			},
		};
		expect(() => api.createAppPluginAuthenticatedAccountRuntime())
			.toThrow(/V5-Produktdaten/u);
	});

	it("captures the account only after HomeData and releases it during adapter unload", () => {
		const source = readFileSync(path.join(process.cwd(), "src", "main.ts"), "utf8");
		const homeDataUpdated = source.indexOf("await this.http_api.updateHomeData();");
		const accountCreated = source.indexOf(
			"await this.initializeAppPluginAuthenticatedAccountRuntime();",
		);
		const packageRuntimeCreated = source.indexOf("await this.initializeAppPluginPackageRuntime();");

		expect(homeDataUpdated).toBeGreaterThan(-1);
		expect(accountCreated).toBeGreaterThan(homeDataUpdated);
		expect(packageRuntimeCreated).toBeGreaterThan(accountCreated);
		expect(source).toContain("this.appPluginAccountRuntime = undefined;");
	});
});
