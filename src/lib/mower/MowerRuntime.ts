import type { Roborock } from "../../main";
import type { Device } from "../httpApi";
import { createMowerCloudTransport } from "./mowerCloudTransport";
import { isSourceSupportedMower, parseMowerRainfallSetting, parseMowerNotDisturbSetting } from "./mowerContract";
import type { MowerCommand } from "./mowerContract";
import { MowerSession } from "./MowerSession";
import type { MowerServices } from "./MowerSession";
import { decodeMowerJsonMessage, decodeMowerRpcResult } from "./mowerJsonMessage";
import { decodeMowerPbPush } from "./mowerProtobuf";
import statusEnums from "./statusEnums.json";
import { buildMowerScheduleRequest } from "./mowerScheduleContract";

const SCHEDULE_ACTIONS = { createSchedule: "create", changeSchedule: "change", deleteSchedule: "delete" } as const;

interface MowerEntry {
	session: MowerSession;
	poll?: Promise<void>;
}

const COMMAND_NAMES: Record<MowerCommand | "refresh" | "refreshSettings" | "refreshSchedules" | "refreshTimeZone" | "refreshCuttingHeight" | "deleteAllSchedules" | "refreshMap" | "refreshMapNames", string> = {
	start: "Start mowing", pause: "Pause mowing", resume: "Resume mowing", stop: "Stop mowing", charge: "Return to charger", refresh: "Refresh mower status",
	refreshSettings: "Refresh mower settings",
	refreshSchedules: "Refresh mowing schedules",
	refreshTimeZone: "Refresh device time zone",
	refreshCuttingHeight: "Refresh cutting-height parameters and preferences",
	deleteAllSchedules: "Delete all mowing schedules",
	refreshMap: "Refresh active mower map through native download",
	refreshMapNames: "Refresh mower map names",
};

/** Own device lifecycle and object model. Never inherits vacuum features or dispatches vacuum methods. */
export class MowerRuntime {
	private readonly devices = new Map<string, MowerEntry>();
	private readonly writes = new Map<string, Promise<void>>();
	private readonly initializing = new Map<string, Promise<void>>();
	private readonly transport;
	private stopped = false;

	constructor(private readonly adapter: Roborock, private readonly services: MowerServices = {}) {
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
		if (device.online !== true) {
			this.transport.cancelPending("Mower is offline", device.duid);
			this.devices.get(device.duid)?.session.cancelReadbacks();
		}
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
			await this.adapter.ensureState(`${prefix}.mowerCommands.${command}`, { name, type: "boolean", role: "button", read: true, write: command !== "refreshMap" || this.services.maps !== undefined, def: false });
		}
		for (const [command, name] of [["mowAreas", "Mow selected areas"], ["mowEdges", "Mow selected area edges"]]) {
			await this.adapter.ensureState(`${prefix}.mowerCommands.${command}`, { name: `${name}: JSON mapName and boundaryIds`, type: "string", role: "json", read: true, write: this.services.maps !== undefined, def: "" });
		}
		await this.adapter.ensureState(`${prefix}.mowerCommands.setRainfall`, { name: "Set rainfall configuration: JSON enable and delayHours (0, 3, 8)", type: "string", role: "json", read: true, write: true, def: "" });
		await this.adapter.ensureState(`${prefix}.mowerCommands.setNotDisturb`, { name: "Set not-disturb: JSON enable, start and end (app clock HH:MM, five-minute steps)", type: "string", role: "json", read: true, write: true, def: "" });
		await this.adapter.ensureState(`${prefix}.mowerCommands.setCuttingHeight`, { name: "Set cutting height via connected Bluetooth", type: "number", role: "level", unit: "mm", read: false, write: this.services.ble !== undefined });
		for (const command of Object.keys(SCHEDULE_ACTIONS)) {
			await this.adapter.ensureState(`${prefix}.mowerCommands.${command}`, { name: command === "deleteSchedule" ? "Delete mowing schedule: JSON id" : `${command === "createSchedule" ? "Create" : "Change"} weekly mowing schedule: complete JSON plan with Unix seconds`, type: "string", role: "json", read: true, write: true, def: "" });
		}
		await this.adapter.ensureState(`${prefix}.mowerStatus.battery`, { name: "Battery", type: "number", role: "value.battery", min: 0, max: 100, unit: "%", read: true, write: false });
		await this.adapter.ensureState(`${prefix}.mowerStatus.batteryBroadcast`, { name: "Battery from separate battery event", type: "number", role: "value.battery", min: 0, max: 100, unit: "%", read: true, write: false });
		await this.adapter.ensureState(`${prefix}.mowerStatus.messageId`, { name: "Status message ID", type: "string", role: "text", read: true, write: false });
		await this.adapter.ensureState(`${prefix}.mowerStatus.rainEnabled`, { name: "Rainfall delay enabled (device readback)", type: "boolean", role: "indicator", read: true, write: false });
		await this.adapter.ensureState(`${prefix}.mowerStatus.rainDelayHours`, { name: "Rainfall delay (device readback)", type: "number", role: "value", unit: "h", min: 0, read: true, write: false });
		await this.adapter.ensureState(`${prefix}.mowerStatus.dndEnabled`, { name: "Not-disturb enabled (device readback)", type: "boolean", role: "indicator", read: true, write: false });
		await this.adapter.ensureState(`${prefix}.mowerStatus.dndWindows`, { name: "Not-disturb intervals (app clock readback)", type: "string", role: "json", read: true, write: false });
		await this.adapter.ensureState(`${prefix}.mowerStatus.schedules`, { name: "Mowing schedules (device readback)", type: "string", role: "json", read: true, write: false });
		await this.adapter.ensureState(`${prefix}.mowerStatus.robotTimeZone`, { name: "Device time zone (unchanged device readback)", type: "string", role: "text", read: true, write: false });
		await this.adapter.ensureState(`${prefix}.mowerStatus.bluetoothAvailable`, { name: "Mower Bluetooth connection available", type: "boolean", role: "indicator.connected", read: true, write: false });
		await this.adapter.setState(`${prefix}.mowerStatus.bluetoothAvailable`, { val: this.services.ble?.isConnected(device.duid) === true, ack: true });
		for (const [field, name] of [["cuttingHeightMin", "Minimum cutting height"], ["cuttingHeightMax", "Maximum cutting height"], ["cuttingHeightStep", "Cutting-height step"], ["cuttingHeight", "Global cutting height (preference readback)"]]) {
			await this.adapter.ensureState(`${prefix}.mowerStatus.${field}`, { name, type: "number", role: "value", unit: "mm", read: true, write: false });
		}
		await this.adapter.ensureState(`${prefix}.mowerStatus.areaCuttingHeights`, { name: "Cutting-height preferences by area (readback)", type: "string", role: "json", read: true, write: false });
		await this.adapter.ensureState(`${prefix}.mowerStatus.mapDownloadAvailable`, { name: "Native mower map download available", type: "boolean", role: "indicator", read: true, write: false });
		await this.adapter.ensureState(`${prefix}.mowerStatus.mapNames`, { name: "Map names (device readback)", type: "string", role: "json", read: true, write: false });
		await this.adapter.setState(`${prefix}.mowerStatus.mapDownloadAvailable`, { val: this.services.maps?.isAvailable(device.duid) === true, ack: true });
		for (const [field, name, role] of [["mapData", "Active mower map data", "json"], ["currentMap", "Active mower map name", "text"], ["mowingAreas", "Mowing areas from active map", "json"]]) {
			await this.adapter.ensureState(`${prefix}.mowerStatus.${field}`, { name, type: "string", role, read: true, write: false });
		}
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
		this.devices.set(device.duid, { session: new MowerSession(device.duid, this.adapter.http_api.getRobotModel(device.duid)!, this.adapter.http_api.getProductCategory(device.duid), this.transport, Date.now, this.services) });
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
		const notDisturb = command === "setNotDisturb";
		const scheduleAction = Object.hasOwn(SCHEDULE_ACTIONS, command) ? SCHEDULE_ACTIONS[command as keyof typeof SCHEDULE_ACTIONS] : undefined;
		const cuttingHeight = command === "setCuttingHeight";
		const areas = command === "mowAreas" || command === "mowEdges";
		const jsonCommand = rainfall || notDisturb || scheduleAction !== undefined || areas;
		if (!jsonCommand && !cuttingHeight && (!Object.hasOwn(COMMAND_NAMES, command) || state.val !== true)) return;
		if (cuttingHeight && typeof state.val !== "number") return;
		if (jsonCommand && (typeof state.val !== "string" || state.val === "")) return;
		if (id !== `${this.adapter.namespace}.Devices.${duid}.mowerCommands.${command}`) return;
		const object = await this.adapter.getObjectAsync(id);
		if (object?.type !== "state" || object.common.write !== true || object.common.type !== (cuttingHeight ? "number" : jsonCommand ? "string" : "boolean") || object.common.role !== (cuttingHeight ? "level" : jsonCommand ? "json" : "button")) return;
		if (this.devices.get(duid) !== entry || !this.isRegistered(duid)) return;
		const setting = rainfall ? parseMowerRainfallSetting(JSON.parse(state.val as string)) : undefined;
		const dnd = notDisturb ? parseMowerNotDisturbSetting(JSON.parse(state.val as string)) : undefined;
		const schedulePlan: unknown = scheduleAction ? JSON.parse(state.val as string) : undefined;
		// Validate the complete plan before acknowledging input or requesting device data.
		if (scheduleAction) buildMowerScheduleRequest(scheduleAction, 1, schedulePlan);
		if (cuttingHeight) entry.session.validateCuttingHeight(state.val);
		const areaInput: unknown = areas ? JSON.parse(state.val as string) : undefined;
		if (areas) entry.session.validateAreaInput(areaInput);
		// Acknowledge the button event; the separate RobotMsg stream is the source of device state.
		await this.adapter.setState(id, { val: cuttingHeight ? null : jsonCommand ? "" : false, ack: true });
		if (areas || command === "refreshMap") {
			try {
				if (areas) await entry.session.mowAreas(areaInput, command === "mowAreas" ? "area" : "edge");
				else await entry.session.refreshMap();
			} finally {
				await this.publishSnapshot(duid, entry);
			}
		} else if (cuttingHeight) {
			await entry.session.setCuttingHeight(state.val);
			await this.publishSnapshot(duid, entry);
		} else if (scheduleAction || command === "deleteAllSchedules") {
			await entry.session.mutateSchedule(scheduleAction ?? "deleteAll", schedulePlan);
			await this.publishSnapshot(duid, entry);
		} else if (setting || dnd) {
			if (setting) await entry.session.setRainfall(setting);
			else await entry.session.setNotDisturb(dnd!);
			if (this.devices.get(duid) !== entry || !this.isRegistered(duid)) return;
			const response = await entry.session.requestSettings();
			if (this.devices.get(duid) === entry) await this.acceptRobotMessage(duid, decodeMowerRpcResult(response));
		} else if (command === "refreshSettings") {
			const response = await entry.session.requestSettings();
			if (this.devices.get(duid) === entry) await this.acceptRobotMessage(duid, decodeMowerRpcResult(response));
		} else if (command === "refreshSchedules" || command === "refreshTimeZone" || command === "refreshCuttingHeight" || command === "refreshMapNames") {
			const response = command === "refreshSchedules" ? await entry.session.requestSchedules() : command === "refreshTimeZone" ? await entry.session.requestTimeZone() : command === "refreshMapNames" ? await entry.session.requestMapNames() : await entry.session.requestHeightParameters();
			if (this.devices.get(duid) !== entry || !this.isRegistered(duid)) return;
			await this.acceptRobotMessage(duid, decodeMowerRpcResult(response));
			if (command === "refreshCuttingHeight") {
				const preferences = await entry.session.requestMowingPreferences();
				if (this.devices.get(duid) === entry) await this.acceptRobotMessage(duid, decodeMowerRpcResult(preferences));
			}
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
		await this.publishSnapshot(duid, entry);
	}

	private async publishSnapshot(duid: string, entry: MowerEntry): Promise<void> {
		if (this.devices.get(duid) !== entry || !this.isRegistered(duid)) return;
		const snapshot = entry.session.getStatus();
		if (!snapshot) return;
		snapshot.bluetoothAvailable = entry.session.isBluetoothAvailable();
		snapshot.mapDownloadAvailable = entry.session.isMapDownloadAvailable();
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
		for (const entry of this.devices.values()) entry.session.cancelReadbacks();
	}

	public stop(): void {
		this.stopped = true;
		for (const entry of this.devices.values()) entry.session.close();
		this.devices.clear();
		this.transport.stop();
	}
}
