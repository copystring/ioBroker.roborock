import type { Roborock } from "../../main";
import type { Device } from "../httpApi";
import { createMowerCloudTransport } from "./mowerCloudTransport";
import { isSourceSupportedMower, parseMowerRainfallSetting, type MowerCommand } from "./mowerContract";
import { MowerSession } from "./MowerSession";
import { decodeMowerJsonMessage, decodeMowerRpcResult } from "./mowerJsonMessage";
import { decodeMowerPbPush } from "./mowerProtobuf";
import statusEnums from "./statusEnums.json";

interface MowerEntry {
	session: MowerSession;
	poll?: Promise<void>;
}

const COMMAND_NAMES: Record<MowerCommand | "refresh" | "refreshSettings", string> = {
	start: "Start mowing", pause: "Pause mowing", resume: "Resume mowing", stop: "Stop mowing", charge: "Return to charger", refresh: "Refresh mower status",
	refreshSettings: "Refresh mower settings",
};

/** Own device lifecycle and object model. Never inherits vacuum features or dispatches vacuum methods. */
export class MowerRuntime {
	private readonly devices = new Map<string, MowerEntry>();
	private readonly writes = new Map<string, Promise<void>>();
	private readonly initializing = new Map<string, Promise<void>>();
	private readonly transport;
	private stopped = false;

	constructor(private readonly adapter: Roborock) {
		const connected = () => adapter.mqtt_api.isConnected() && !!adapter.mqtt_api.client && adapter.mqtt_api.client.connected !== false;
		this.transport = createMowerCloudTransport({
			getModel: duid => adapter.http_api.getRobotModel(duid),
			getCategory: duid => adapter.http_api.getProductCategory(duid),
			getProtocol: duid => adapter.getDeviceProtocolVersion(duid),
			isConnected: connected,
			isDeviceOnline: duid => adapter.http_api.getDevices().some(device => device.duid === duid && device.online === true),
			buildFrame: (...args) => adapter.requestsHandler.messageParser.buildRoborockMessage(...args),
			publishFrame: (duid, frame) => {
				if (!connected()) throw new Error("Mower MQTT connection unavailable before publish");
				return adapter.mqtt_api.sendMessage(duid, frame);
			},
		});
	}

	public isRegistered(duid: string): boolean {
		const device = this.adapter.http_api.getDevices().find(device => device.duid === duid);
		return !this.stopped && this.devices.has(duid) && !!device && this.supports(device);
	}

	private supports(device: Device): boolean {
		return isSourceSupportedMower(this.adapter.http_api.getRobotModel(device.duid), this.adapter.http_api.getProductCategory(device.duid)) && (device.pv === "L01" || device.pv === "1.0");
	}

	public async syncDevice(device: Device): Promise<void> {
		if (this.stopped || !this.supports(device)) {
			this.remove(device.duid);
			return;
		}
		if (device.online !== true) this.transport.cancelPending("Mower is offline", device.duid);
		if (this.devices.has(device.duid)) return;
		const current = this.initializing.get(device.duid);
		if (current) return current;
		const task = this.initializeDevice(device);
		this.initializing.set(device.duid, task);
		try {
			await task;
		} finally {
			this.initializing.delete(device.duid);
		}
	}

	private async initializeDevice(device: Device): Promise<void> {
		const prefix = `Devices.${device.duid}`;
		await this.adapter.ensureFolder(`${prefix}.mowerCommands`);
		await this.adapter.ensureFolder(`${prefix}.mowerStatus`);
		for (const [command, name] of Object.entries(COMMAND_NAMES)) {
			await this.adapter.ensureState(`${prefix}.mowerCommands.${command}`, { name, type: "boolean", role: "button", read: true, write: true, def: false });
		}
		await this.adapter.ensureState(`${prefix}.mowerCommands.setRainfall`, { name: "Set rainfall configuration: JSON enable and delayHours (0, 3, 8)", type: "string", role: "json", read: true, write: true, def: "" });
		await this.adapter.ensureState(`${prefix}.mowerStatus.battery`, { name: "Battery", type: "number", role: "value.battery", min: 0, max: 100, unit: "%", read: true, write: false });
		await this.adapter.ensureState(`${prefix}.mowerStatus.batteryBroadcast`, { name: "Battery from separate battery event", type: "number", role: "value.battery", min: 0, max: 100, unit: "%", read: true, write: false });
		await this.adapter.ensureState(`${prefix}.mowerStatus.messageId`, { name: "Status message ID", type: "string", role: "text", read: true, write: false });
		await this.adapter.ensureState(`${prefix}.mowerStatus.rainEnabled`, { name: "Rainfall delay enabled (device readback)", type: "boolean", role: "indicator", read: true, write: false });
		await this.adapter.ensureState(`${prefix}.mowerStatus.rainDelayHours`, { name: "Rainfall delay (device readback)", type: "number", role: "value", unit: "h", min: 0, read: true, write: false });
		for (const [field, name, unit] of [["mowingProgress", "Mowing progress", "%"], ["navigationProgress", "Navigation task progress", "%"], ["totalArea", "Mowing task area", "m²"], ["mowedArea", "Mowed area (derived)", "m²"], ["expectedDuration", "Expected mowing duration", "s"], ["remainingTime", "Remaining mowing time (derived)", "s"]]) {
			await this.adapter.ensureState(`${prefix}.mowerStatus.${field}`, { name, type: "number", role: "value", unit, min: 0, ...(unit === "%" ? { max: 100 } : {}), read: true, write: false });
		}
		for (const [field, name] of [["detailState", "Mower detail state"], ["workingState", "Mower working state"], ["chargeState", "Charging state"]]) {
			const symbols = field === "detailState" ? statusEnums.RobotDetailStateType : statusEnums.FsmStateType;
			const states = Object.fromEntries(Object.entries(symbols).map(([symbol, value]) => [value, symbol]));
			await this.adapter.ensureState(`${prefix}.mowerStatus.${field}`, { name, type: "number", role: "value", states, read: true, write: false });
		}
		for (const [field, name] of [["fsmErrors", "Mower errors by category"], ["userErrors", "User error codes"], ["schedulerErrors", "Scheduler errors by category"], ["chargeErrors", "Charging errors by category"]]) {
			await this.adapter.ensureState(`${prefix}.mowerStatus.${field}`, { name, type: "string", role: "json", read: true, write: false });
		}
		// Do not revive a stopped or reclassified device after asynchronous object creation.
		const current = this.adapter.http_api.getDevices().find(current => current.duid === device.duid);
		if (this.stopped || !current || !this.supports(current)) return;
		this.devices.set(device.duid, { session: new MowerSession(device.duid, this.adapter.http_api.getRobotModel(device.duid)!, this.adapter.http_api.getProductCategory(device.duid), this.transport) });
	}

	public retainDevices(activeDuids: Set<string>): void {
		for (const duid of this.devices.keys()) if (!activeDuids.has(duid)) this.remove(duid);
	}

	private remove(duid: string): void {
		this.devices.get(duid)?.session.close();
		this.devices.delete(duid);
	}

	public async poll(duid: string): Promise<void> {
		const entry = this.devices.get(duid);
		if (!entry || !this.isRegistered(duid) || !this.adapter.http_api.getDevices().some(device => device.duid === duid && device.online === true)) return;
		if (entry.poll) return;
		entry.poll = entry.session.requestStatus().then(async response => {
			if (this.devices.get(duid) === entry) await this.acceptRobotMessage(duid, decodeMowerRpcResult(response));
		});
		try {
			await entry.poll;
		} finally {
			entry.poll = undefined;
		}
	}

	public async handleCommand(duid: string, command: string, state: ioBroker.State, id: string): Promise<void> {
		const entry = this.devices.get(duid);
		if (!entry || !this.isRegistered(duid) || state.ack) return;
		const rainfall = command === "setRainfall";
		if (!rainfall && (!Object.hasOwn(COMMAND_NAMES, command) || state.val !== true)) return;
		if (rainfall && (typeof state.val !== "string" || state.val === "")) return;
		if (id !== `${this.adapter.namespace}.Devices.${duid}.mowerCommands.${command}`) return;
		const object = await this.adapter.getObjectAsync(id);
		if (object?.type !== "state" || object.common.write !== true || object.common.type !== (rainfall ? "string" : "boolean") || object.common.role !== (rainfall ? "json" : "button")) return;
		if (this.devices.get(duid) !== entry || !this.isRegistered(duid)) return;
		const setting = rainfall ? parseMowerRainfallSetting(JSON.parse(state.val as string)) : undefined;
		// Acknowledge the button event; the separate RobotMsg stream is the source of device state.
		await this.adapter.setState(id, { val: rainfall ? "" : false, ack: true });
		if (setting) {
			await entry.session.setRainfall(setting);
			if (this.devices.get(duid) !== entry || !this.isRegistered(duid)) return;
			const response = await entry.session.requestSettings();
			if (this.devices.get(duid) === entry) await this.acceptRobotMessage(duid, decodeMowerRpcResult(response));
		} else if (command === "refreshSettings") {
			const response = await entry.session.requestSettings();
			if (this.devices.get(duid) === entry) await this.acceptRobotMessage(duid, decodeMowerRpcResult(response));
		} else if (command === "refresh") await this.poll(duid);
		else await entry.session.command(command as MowerCommand);
	}

	public acceptDps(duid: string, dps: Record<string, unknown>): void {
		if (this.isRegistered(duid)) this.transport.acceptDps(duid, dps);
	}

	public async handleFrame(duid: string, frame: { version: string; protocol: number; payload: Buffer }): Promise<void> {
		if (!this.isRegistered(duid) || frame.version !== "1.0") return;
		let message: unknown;
		try {
			if (frame.protocol === 702) {
				message = decodeMowerPbPush(frame.payload);
			} else if (frame.protocol === 102) {
				const payload: unknown = JSON.parse(frame.payload.toString("utf8"));
				if (!payload || typeof payload !== "object" || Array.isArray(payload)) return;
				const dps = (payload as Record<string, unknown>).dps;
				if (!dps || typeof dps !== "object" || Array.isArray(dps)) return;
				this.acceptDps(duid, dps as Record<string, unknown>);
				message = decodeMowerJsonMessage(dps as Record<string, unknown>);
			}
		} catch {
			this.adapter.rLog("MQTT", duid, "Debug", "1.0", frame.protocol, "Invalid mower message payload", "debug");
			return;
		}
		await this.acceptRobotMessage(duid, message);
	}

	public async acceptRobotMessage(duid: string, message: unknown): Promise<void> {
		const entry = this.devices.get(duid);
		if (!entry || !this.isRegistered(duid) || !entry.session.acceptRobotMessage(message)) return;
		const snapshot = entry.session.getStatus()!;
		const previous = this.writes.get(duid) ?? Promise.resolve();
		const write = previous.catch(() => {}).then(async () => {
			for (const [field, value] of Object.entries(snapshot)) {
				if (this.devices.get(duid) !== entry || !this.isRegistered(duid)) return;
				await this.adapter.setStateChanged(`Devices.${duid}.mowerStatus.${field}`, { val: value, ack: true });
			}
		});
		this.writes.set(duid, write);
		try {
			await write;
		} finally {
			if (this.writes.get(duid) === write) this.writes.delete(duid);
		}
	}

	public cancelPending(): void {
		this.transport.cancelPending("Mower MQTT connection reset");
	}

	public stop(): void {
		this.stopped = true;
		for (const entry of this.devices.values()) entry.session.close();
		this.devices.clear();
		this.transport.stop();
	}
}
