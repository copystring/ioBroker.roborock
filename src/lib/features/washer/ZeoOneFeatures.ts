import { getZeoOneDpMetadata } from "../../zeoOneStateMetadata";
import { parseZeoOnePackedProgram } from "../../zeoOneStatusLabels";
import { FeatureDependencies, RegisterModel } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";
import { FallbackBaseFeatures } from "../fallbackFeatures";
import { buildZeoOneSavedProgram, getZeoOneProgramCatalog } from "./zeoOneProgramCatalog";

// Zeo One AppPlugin output/801.js forceLoad: status DPs selected for a102.
// QueryDP reads them; it does not publish the individual DP keys. Other
// feature-gated DPs and metadata/history DPs are excluded from periodic polling.
const STATUS_DPS = [
	200, 201, 203, 202, 204, 205, 206, 207, 208, 209, 210, 211,
	217, 213, 218, 219, 220, 221, 222, 223, 224, 225, 226, 212, 214, 227,
] as const;

// Original AppPlugin 1346.js, 1363.js and module 1299 in index.android.bundle:
// all five controls use numeric DPs. a102 dosing writes the enable/type pair atomically.
interface WasherSetting {
	dp: string;
	autoDp?: string;
	name: { en: string; de: string };
	max: number;
}
const SETTINGS: Record<string, WasherSetting> = {
	sound: { dp: "223", name: { en: "Signal tones", de: "Signaltöne" }, max: 1 },
	child_lock: { dp: "206", name: { en: "Child lock", de: "Kindersicherung" }, max: 1 },
	cache_washing_preference: { dp: "225", name: { en: "Remember washing preferences", de: "Waschpräferenz speichern" }, max: 1 },
	detergent_level: { dp: "213", autoDp: "211", name: { en: "Detergent dosage", de: "Waschmitteldosierung" }, max: 3 },
	softener_level: { dp: "214", autoDp: "212", name: { en: "Softener dosage", de: "Weichspülerdosierung" }, max: 3 },
};

@RegisterModel("roborock.wm.a102")
export class ZeoOneFeatures extends FallbackBaseFeatures {
	private readonly status = new Map<string, unknown>();
	private readonly writes = new Map<string, (value: unknown) => void>();
	constructor(dependencies: FeatureDependencies, duid: string) {
		super(dependencies, duid, "roborock.wm.a102");
	}

	protected override getDynamicFeatures(): Set<Feature> {
		return new Set();
	}

	public override async setupProtocolFeatures(): Promise<void> {
		await super.setupProtocolFeatures();
		for (const [name, setting] of Object.entries(SETTINGS)) {
			// Numeric settings allow both off (0) and on; boolean commands are buttons.
			const metadata = getZeoOneDpMetadata(setting.dp, this.deps.adapter.language);
			this.addCommand(name, {
				name: typeof metadata.name === "object" ? metadata.name : setting.name, type: "number", min: 0, max: setting.max,
				states: metadata.states ?? { 0: "Aus", 1: "Ein" },
				role: "level",
			});
		}
		this.addCommand("save_program", {
			name: { en: "Save app program (without starting)", de: "App-Programm speichern (ohne Start)" },
			type: "string", role: "json",
		});
	}

	private getLocation(): string | undefined {
		let info = this.status.get("10005");
		if (typeof info === "string") {
			try {
				info = JSON.parse(info);
			} catch {
				return undefined;
			}
		}
		return (info as { oba?: { location?: string } } | undefined)?.oba?.location;
	}

	private settingValue(setting: WasherSetting): number | undefined {
		const value = this.status.get(setting.dp);
		if (setting.autoDp && this.status.get(setting.autoDp) === 0) return 0;
		return typeof value === "number" && Number.isInteger(value) && value >= 0 && value <= setting.max ? value : undefined;
	}

	private async mirrorSetting(name: string, setting: WasherSetting): Promise<void> {
		if (this.writes.has(setting.dp)) return;
		const value = this.settingValue(setting);
		if (value !== undefined) {
			await this.deps.adapter.setStateChanged(`Devices.${this.duid}.commands.${name}`, { val: value, ack: true });
		}
	}

	public override async onDeviceStatus(status: Record<string, unknown>): Promise<void> {
		for (const [dp, value] of Object.entries(status)) this.status.set(dp, value);
		// Capture device echoes before any await can allow a later command to start.
		for (const [dp, value] of Object.entries(status)) this.writes.get(dp)?.(value);
		if ("10005" in status) {
			const path = `Devices.${this.duid}.deviceStatus.program_options`;
			await this.deps.adapter.ensureState(path, { name: { en: "App program options", de: "App-Programmoptionen" }, type: "string", role: "json", write: false });
			await this.deps.adapter.setStateChanged(path, { val: JSON.stringify(getZeoOneProgramCatalog(this.getLocation())), ack: true });
		}
		for (const [name, setting] of Object.entries(SETTINGS)) {
			if (setting.dp in status || (setting.autoDp && setting.autoDp in status)) {
				await this.mirrorSetting(name, setting);
			}
		}
	}

	private assertWritable(method: string, setting: WasherSetting, params: unknown): asserts params is number {
		if (this.protocolVersion !== "A01") throw new Error("Zeo One settings require A01.");
		if (typeof params !== "number" || !Number.isInteger(params) || params < 0 || params > setting.max) {
			throw new Error(`${method} requires an integer from 0 to ${setting.max}.`);
		}
		// Original UI: child lock rejects updates; dosing permits Normal/ShutDown/Complete only.
		if ((method === "child_lock" || setting.autoDp) && this.status.get("203") === 11) {
			throw new Error(`${method} unavailable during firmware update.`);
		}
		if (setting.autoDp) {
			const status = this.status.get("203");
			if (status === undefined) throw new Error("Washer status has not been received yet.");
			const shutDown = this.status.get("202");
			const paused = this.status.get("201");
			if (!shutDown && (paused || (status !== 1 && status !== 10))) {
				throw new Error("Dosage can only be changed while idle, shut down or complete.");
			}
		}
		if (this.writes.has(setting.dp)) throw new Error(`${method} is awaiting a device response.`);
	}

	private async writeDps(method: string, dps: Record<string, number>, expected = dps, packedMask?: number): Promise<void> {
		if (this.protocolVersion !== "A01") throw new Error("Zeo One settings require A01.");
		for (const dp of Object.keys(expected)) {
			if (this.writes.has(dp)) throw new Error(`${method} is awaiting a device response.`);
		}
		let timer: ioBroker.Timeout | undefined;
		const remaining = new Set(Object.keys(expected));
		const confirmation = new Promise<void>((resolve, reject) => {
			for (const dp of remaining) {
				this.writes.set(dp, (raw) => {
					let value = dp === "222" ? parseZeoOnePackedProgram(raw) : raw;
					if (dp === "222" && packedMask !== undefined && typeof value === "number" && Number.isSafeInteger(value)) value &= packedMask;
					if (value !== expected[dp]) {
						reject(new Error(`${method}: device reported ${String(value)} for DP ${dp} instead of ${expected[dp]}.`));
						return;
					}
					remaining.delete(dp);
					if (remaining.size === 0) resolve();
				});
			}
			timer = this.deps.adapter.setTimeout(() => reject(new Error(`${method}: no device DP response within 10 seconds.`)), 10000);
			if (!timer) reject(new Error("Could not create washer response timeout."));
		});
		try {
			await Promise.all([this.deps.adapter.requestsHandler.publishA01Dp(this.duid, dps), confirmation]);
		} finally {
			if (timer) this.deps.adapter.clearTimeout(timer);
			for (const dp of Object.keys(expected)) this.writes.delete(dp);
		}
	}

	private async saveProgram(params: unknown): Promise<void> {
		if (this.status.get("203") !== 1) throw new Error("App programs can only be saved while in standby.");
		const dps = buildZeoOneSavedProgram(params, this.getLocation());
		// Original 799.js customMode packing: confirm the saved configuration itself,
		// rather than acknowledging the broker or the save-trigger DP 221.
		const packed = dps["205"] | (dps["204"] << 8) | ((dps["207"] ?? 0) << 10)
			| ((dps["208"] ?? 0) << 13) | ((dps["209"] ?? 0) << 16) | ((dps["210"] ?? 0) << 19);
		const mask = 0x3ff | ("207" in dps ? 0x1c00 : 0) | ("208" in dps ? 0xe000 : 0)
			| ("209" in dps ? 0x70000 : 0) | ("210" in dps ? 0x380000 : 0);
		await this.writeDps("save_program", dps, { "222": packed }, mask);
		await this.deps.adapter.setStateChanged(`Devices.${this.duid}.commands.save_program`, { val: JSON.stringify(params), ack: true });
	}

	public override async executeDeviceCommand(method: string, params?: unknown): Promise<boolean> {
		if (method === "save_program") {
			await this.saveProgram(params);
			return true;
		}
		if (!Object.prototype.hasOwnProperty.call(SETTINGS, method)) return false;
		const setting = SETTINGS[method];
		try {
			this.assertWritable(method, setting, params);
			const dps = setting.autoDp
				? { [setting.autoDp]: params === 0 ? 0 : 1, [setting.dp]: params }
				: { [setting.dp]: params };
			await this.writeDps(method, dps);
			return true;
		} finally {
			// Restore only the last value received from the device, also on rejected writes.
			await this.mirrorSetting(method, setting);
		}
	}

	public override async detectAndApplyRuntimeFeatures(): Promise<boolean> {
		return false;
	}

	public override async initializeDeviceData(): Promise<void> {
		await this.queryDps([...STATUS_DPS, 10005]);
	}

	public override async updateStatus(): Promise<void> {
		await this.queryDps(STATUS_DPS);
	}

	private async queryDps(dps: readonly number[]): Promise<void> {
		if (this.protocolVersion !== "A01") {
			throw new Error(`Zeo One QueryDP requires A01, got ${this.protocolVersion ?? "unknown"}.`);
		}
		// A01 sendRequest resolves after MQTT publish. The requested DP values arrive
		// asynchronously through processA01; this call cannot confirm device receipt.
		await this.deps.adapter.requestsHandler.sendRequest(this.duid, "10000", JSON.stringify(dps));
	}
}
