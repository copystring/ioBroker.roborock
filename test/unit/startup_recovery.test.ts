import { EventEmitter } from "node:events";
import axios from "axios";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Roborock } from "../../src/main";
import { mqtt_api } from "../../src/lib/mqttApi";

vi.mock("@iobroker/adapter-core", () => ({
	Adapter: class extends EventEmitter {
		config = { username: "user@example.invalid", updateInterval: 2 };
		setInterval = setInterval;
		clearInterval = clearInterval;
		setTimeout = setTimeout;
		clearTimeout = clearTimeout;
		delay = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));
	}
}));
vi.mock("go2rtc-static", () => ({ default: "" }));

function dnsFailure() {
	return Object.assign(new Error("getaddrinfo EAI_AGAIN example.invalid"), { code: "EAI_AGAIN" });
}

function setup(cachedSession = true) {
	// Keep the real HTTP initialization, ready/unload handlers and device polling loop.
	const getHome = vi.fn(async () => ({ data: { rrHomeId: 1 } }));
	const getHomeData = vi.fn(async () => ({
		success: true, result: { id: 1, devices: [{ duid: "vacuum", pv: "1.0", online: true }] }
	}));
	const session = { token: "test", rriot: { u: "test", s: "test", h: "test", k: "test", r: { a: "https://example.invalid" } } };
	const login = vi.fn(async () => ({ code: 200, data: session }));
	const create = axios.create.bind(axios);
	vi.spyOn(axios, "create").mockImplementation(options => create({
		...options,
		adapter: async config => {
			let data: unknown;
			switch (config.url?.split("?")[0]) {
				case "api/v3/key/sign": data = { data: { k: "0123456789abcdef" } }; break;
				case "api/v4/email/code/send": data = { code: 200 }; break;
				case "api/v4/auth/email/login/code":
				case "api/v4/auth/email/login/pwd": data = await login(); break;
				case "api/v5/product": data = {}; break;
				case "api/v1/getHomeDetail": data = await getHome(); break;
				case "v3/user/homes/1": data = await getHomeData(); break;
				default: throw new Error(`Unexpected HTTP request: ${config.url}`);
			}
			return { data, status: 200, statusText: "OK", headers: {}, config };
		}
	}));

	// Each instance normally installs process-wide error handlers.
	const processOn = vi.spyOn(process, "on").mockReturnValue(process);
	const adapter = new Roborock();
	processOn.mockRestore();
	const connectionWrites: boolean[] = [];
	const remember = async (id: string, value: { val: unknown }) => {
		if (id === "info.connection") connectionWrites.push(value.val as boolean);
	};
	const subscribe = vi.fn(async (_pattern: string) => {});
	Object.assign(adapter, {
		getPluginInstance: () => undefined,
		getStateAsync: async (id: string) => cachedSession && id === "UserData" ? { val: JSON.stringify(session) } : null,
		setState: remember,
		setStateChanged: remember, ensureState: async () => {},
		rLog: vi.fn(), setupBasicObjects: async () => {}, ensureClientID: async () => "test",
		downloadAssetsForAccountModels: async () => {}, processScenes: async () => {},
		resumeSceneQueues: async () => {}, start_go2rtc: async () => {},
		subscribeStatesAsync: subscribe, unsubscribeStatesAsync: async () => {},
		updateDeviceInfo: async () => {}, getDeviceProtocolVersion: async () => "1.0"
	});
	vi.spyOn(adapter.translationManager, "init").mockImplementation(() => {});
	const mqtt = vi.spyOn(mqtt_api.prototype, "init").mockImplementation(async function () { this.connected = true; });
	const udp = vi.spyOn(adapter.local_api, "startUdpDiscovery").mockResolvedValue();
	vi.spyOn(adapter.local_api, "stopUdpDiscovery").mockImplementation(() => {});
	vi.spyOn(adapter.local_api, "isConnected").mockReturnValue(true);
	vi.spyOn(adapter.local_api, "refreshStaleLocalEndpoints").mockResolvedValue();
	vi.spyOn(adapter.local_api, "startTcpKeepaliveInterval").mockImplementation(() => {});
	const updateStatus = vi.fn(async () => {});
	vi.spyOn(adapter.deviceManager, "initializeDevices").mockImplementation(async () => {
		adapter.deviceFeatureHandlers.set("vacuum", { getCommandFolders: () => [], updateStatus } as any);
	});
	const polling = vi.spyOn(adapter.deviceManager, "startPolling");
	return { adapter, connectionWrites, getHome, getHomeData, login, mqtt, udp, polling, updateStatus, subscribe };
}

describe("adapter startup recovery", () => {
	beforeEach(() => vi.useFakeTimers());
	afterEach(() => {
		vi.clearAllTimers();
		vi.useRealTimers();
		vi.restoreAllMocks();
	});

	it("recovers from DNS failure without reporting connected early or duplicating the device poll", async () => {
		const { adapter, getHome, connectionWrites, mqtt, polling, updateStatus } = setup();
		getHome.mockRejectedValueOnce(dnsFailure());
		await adapter.onReady();

		expect(connectionWrites.at(-1)).toBe(false);
		expect(connectionWrites).not.toContain(true);
		expect(polling).not.toHaveBeenCalled();
		await vi.advanceTimersByTimeAsync(29_999);
		expect(getHome).toHaveBeenCalledTimes(1);
		await vi.advanceTimersByTimeAsync(1);
		expect(getHome).toHaveBeenCalledTimes(2);
		expect(connectionWrites.at(-1)).toBe(true);
		expect(polling).toHaveBeenCalledTimes(1);
		expect(mqtt).toHaveBeenCalledTimes(1);

		// Real DeviceManager polls immediately on its first tick, then every 2s.
		await vi.advanceTimersByTimeAsync(3_000);
		expect(updateStatus).toHaveBeenCalledTimes(2);
	});

	it("starts one polling loop on a healthy first attempt", async () => {
		const { adapter, connectionWrites, polling, updateStatus } = setup();
		await adapter.onReady();
		expect(connectionWrites.at(-1)).toBe(true);
		expect(polling).toHaveBeenCalledTimes(1);
		await vi.advanceTimersByTimeAsync(3_000);
		expect(updateStatus).toHaveBeenCalledTimes(2);
	});

	it("backs off across repeated failures and resumes without duplicate subscriptions", async () => {
		const { adapter, getHome, polling, subscribe } = setup();
		getHome.mockRejectedValueOnce(dnsFailure()).mockRejectedValueOnce(dnsFailure());
		await adapter.onReady();
		await adapter.onReady();
		expect(getHome).toHaveBeenCalledTimes(1);
		await vi.advanceTimersByTimeAsync(30_000);
		expect(getHome).toHaveBeenCalledTimes(2);
		await vi.advanceTimersByTimeAsync(59_999);
		expect(getHome).toHaveBeenCalledTimes(2);
		await vi.advanceTimersByTimeAsync(1);
		expect(getHome).toHaveBeenCalledTimes(3);
		await adapter.onReady();
		expect(getHome).toHaveBeenCalledTimes(3);
		expect(polling).toHaveBeenCalledTimes(1);
		const subscribed = subscribe.mock.calls.map(([pattern]) => pattern);
		expect(subscribed).toContain("loginCode");
		expect(new Set(subscribed).size).toBe(subscribed.length);
	});

	it("releases discovery from a failed MQTT startup before attempting discovery again", async () => {
		const { adapter, mqtt, udp, connectionWrites, polling } = setup();
		let discoveryActive = false;
		udp.mockImplementation(async () => {
			if (discoveryActive) throw new Error("Discovery already active");
			discoveryActive = true;
		});
		vi.mocked(adapter.local_api.stopUdpDiscovery).mockImplementation(() => { discoveryActive = false; });
		mqtt.mockRejectedValueOnce(Object.assign(new Error("Connection reset"), { code: "ECONNRESET" }));
		await adapter.onReady();
		expect(discoveryActive).toBe(false);
		expect(connectionWrites).not.toContain(true);
		await vi.advanceTimersByTimeAsync(30_000);
		expect(discoveryActive).toBe(true);
		expect(connectionWrites.at(-1)).toBe(true);
		expect(polling).toHaveBeenCalledTimes(1);
	});

	it("recovers when the authenticated home-data request fails after client setup", async () => {
		const { adapter, getHomeData, connectionWrites, mqtt } = setup();
		getHomeData.mockRejectedValueOnce(dnsFailure());
		await adapter.onReady();
		expect(connectionWrites).not.toContain(true);
		expect(mqtt).not.toHaveBeenCalled();
		await vi.advanceTimersByTimeAsync(30_000);
		expect(getHomeData).toHaveBeenCalledTimes(2);
		expect(connectionWrites.at(-1)).toBe(true);
	});

	it("marks a failed runtime home-data poll offline and restores it on the next success", async () => {
		const { adapter, getHomeData, connectionWrites, polling, updateStatus } = setup();
		await adapter.onReady();
		expect(connectionWrites.at(-1)).toBe(true);
		getHomeData.mockRejectedValueOnce(dnsFailure());
		await vi.advanceTimersByTimeAsync(1_000);
		expect(connectionWrites.at(-1)).toBe(false);
		expect(updateStatus).not.toHaveBeenCalled();
		await vi.advanceTimersByTimeAsync(2_000);
		expect(connectionWrites.at(-1)).toBe(true);
		expect(updateStatus).toHaveBeenCalledTimes(1);
		expect(polling).toHaveBeenCalledTimes(1);
	});

	it("resumes a partial subscription stage without starting completed resources twice", async () => {
		const { adapter, mqtt, udp, subscribe, connectionWrites, polling } = setup();
		const successfulSubscriptions: string[] = [];
		let failNext = true;
		subscribe.mockImplementation(async pattern => {
			if (successfulSubscriptions.length === 1 && failNext) {
				failNext = false;
				throw Object.assign(new Error("Connection reset"), { code: "ECONNRESET" });
			}
			successfulSubscriptions.push(pattern);
		});
		await adapter.onReady();
		expect(connectionWrites).not.toContain(true);
		expect(polling).not.toHaveBeenCalled();
		await vi.advanceTimersByTimeAsync(30_000);
		expect(connectionWrites.at(-1)).toBe(true);
		expect(new Set(successfulSubscriptions).size).toBe(successfulSubscriptions.length);
		expect(successfulSubscriptions).toContain("loginCode");
		expect(udp).toHaveBeenCalledTimes(1);
		expect(mqtt).toHaveBeenCalledTimes(1);
		expect(polling).toHaveBeenCalledTimes(1);
	});

	it.each([
		["DNS", dnsFailure()],
		["service unavailable", Object.assign(new Error("Service unavailable"), { response: { status: 503, data: { msg: "Unavailable" } } })],
	])("retains the cause of a %s failure during password login without a cached session", async (_case, error) => {
		const { adapter, login, polling, connectionWrites } = setup(false);
		Object.assign(adapter.config, { loginMethod: "password", password: "test" });
		login.mockRejectedValueOnce(error);
		await adapter.onReady();
		expect(polling).not.toHaveBeenCalled();
		await vi.advanceTimersByTimeAsync(30_000);
		expect(login).toHaveBeenCalledTimes(2);
		expect(connectionWrites.at(-1)).toBe(true);
	});

	it("retries a transient transport failure on submitting an email login code", async () => {
		const { adapter, login, polling, connectionWrites } = setup(false);
		login.mockRejectedValueOnce(dnsFailure());
		const started = adapter.onReady();
		await vi.advanceTimersByTimeAsync(0);
		adapter.http_api.submitLoginCode("123456");
		await started;
		expect(polling).not.toHaveBeenCalled();
		await vi.advanceTimersByTimeAsync(30_000);
		adapter.http_api.submitLoginCode("234567");
		await vi.advanceTimersByTimeAsync(0);
		expect(login).toHaveBeenCalledTimes(2);
		expect(connectionWrites.at(-1)).toBe(true);
	});

	it("keeps one device poll active while a slow home-data request is outstanding", async () => {
		const { adapter, getHomeData, updateStatus, connectionWrites } = setup();
		await adapter.onReady();
		let fail!: (reason: Error) => void;
		getHomeData.mockImplementationOnce(() => new Promise((_resolve, reject) => { fail = reject; }));
		await vi.advanceTimersByTimeAsync(5_000);
		expect(getHomeData).toHaveBeenCalledTimes(2); // startup, then one pending slow poll
		expect(updateStatus).not.toHaveBeenCalled();
		fail(dnsFailure());
		await vi.advanceTimersByTimeAsync(0);
		expect(connectionWrites.at(-1)).toBe(false);
		await vi.advanceTimersByTimeAsync(2_000);
		expect(connectionWrites.at(-1)).toBe(true);
		expect(updateStatus).toHaveBeenCalledTimes(1);
	});

	it.each([401, 403])("does not repeatedly attempt login on HTTP %i", async status => {
		const { adapter, getHome, polling, connectionWrites } = setup();
		getHome.mockRejectedValue(Object.assign(new Error("Access denied"), { response: { status } }));
		await adapter.onReady();
		await vi.advanceTimersByTimeAsync(10 * 60_000);
		expect(getHome).toHaveBeenCalledTimes(1);
		expect(connectionWrites.at(-1)).toBe(false);
		expect(polling).not.toHaveBeenCalled();
	});

	it("cancels a pending retry on unload", async () => {
		const { adapter, getHome, connectionWrites, mqtt } = setup();
		getHome.mockRejectedValueOnce(dnsFailure());
		await adapter.onReady();
		const stopped = vi.fn();
		await adapter.onUnload(stopped);
		await vi.advanceTimersByTimeAsync(10 * 60_000);
		expect(stopped).toHaveBeenCalledTimes(1);
		expect(getHome).toHaveBeenCalledTimes(1);
		expect(mqtt).not.toHaveBeenCalled();
		expect(connectionWrites.at(-1)).toBe(false);
	});

	it("does not start a second initialization while the first HTTP request is pending", async () => {
		const { adapter, getHome, mqtt, polling } = setup();
		let finish!: () => void;
		getHome.mockImplementationOnce(() => new Promise(resolve => {
			finish = () => resolve({ data: { rrHomeId: 1 } });
		}));
		const first = adapter.onReady();
		await vi.advanceTimersByTimeAsync(0);
		const second = adapter.onReady();
		await vi.advanceTimersByTimeAsync(0);
		expect(getHome).toHaveBeenCalledTimes(1);
		finish();
		await Promise.all([first, second]);
		expect(mqtt).toHaveBeenCalledTimes(1);
		expect(polling).toHaveBeenCalledTimes(1);
	});

	it("keeps a late HTTP result from bringing a stopped adapter online", async () => {
		const { adapter, getHome, mqtt, polling, connectionWrites } = setup();
		let finish!: () => void;
		getHome.mockImplementationOnce(() => new Promise(resolve => {
			finish = () => resolve({ data: { rrHomeId: 1 } });
		}));
		const started = adapter.onReady();
		await vi.advanceTimersByTimeAsync(0);
		const stopped = vi.fn();
		const unloading = adapter.onUnload(stopped);
		finish();
		await Promise.all([started, unloading]);
		expect(stopped).toHaveBeenCalledTimes(1);
		expect(mqtt).not.toHaveBeenCalled();
		expect(polling).not.toHaveBeenCalled();
		expect(connectionWrites.at(-1)).toBe(false);
	});
});
