import { MOCK_ROBOT_DATA } from "./mockData";

export class MockRobot {
	public duid: string;
	public model: string;
	public state: Record<string, any>;
	public features: number[];
	public consumables: any;
	public cleanSummary: any;
	public cleanRecords: any[];
	public cleanRecordsMap: Map<number, any>;
	public multiMaps: any;
	public roomMapping: any[];
	public timers: any[];

	constructor(duid: string = MOCK_ROBOT_DATA.duid, model: string = MOCK_ROBOT_DATA.model) {
		this.duid = duid;
		this.model = model;
		this.state = JSON.parse(JSON.stringify(MOCK_ROBOT_DATA.properties)); // Deep copy
		this.features = [...MOCK_ROBOT_DATA.firmwareFeatures];
		this.consumables = JSON.parse(JSON.stringify(MOCK_ROBOT_DATA.consumables));
		this.cleanSummary = JSON.parse(JSON.stringify(MOCK_ROBOT_DATA.cleanSummary));
		this.cleanRecords = JSON.parse(JSON.stringify(MOCK_ROBOT_DATA.cleanRecords));
		this.multiMaps = JSON.parse(JSON.stringify(MOCK_ROBOT_DATA.multiMaps));
		this.roomMapping = JSON.parse(JSON.stringify(MOCK_ROBOT_DATA.roomMapping));
		this.timers = JSON.parse(JSON.stringify(MOCK_ROBOT_DATA.timers));

		this.cleanRecordsMap = new Map();
		for (const record of this.cleanRecords) {
			this.cleanRecordsMap.set(record.begin, record);
		}
	}

	public handleRequest(method: string, params: any[] = []): any {
		switch (method) {
			case "get_prop":
				return this.handleGetProp(params);
			case "get_status":
				return [this.state];
			case "get_fw_features":
				return this.features;
			case "get_consumable":
				return [this.consumables];
			case "get_network_info":
				return MOCK_ROBOT_DATA.networkInfo;
			case "get_clean_summary":
				return this.cleanSummary;
			case "get_clean_record":
				return this.handleGetCleanRecord(params[0]);
			case "get_multi_maps_list":
				return [this.multiMaps];
			case "get_room_mapping":
				return this.roomMapping;
			case "get_timer":
				return this.timers;
			case "app_start":
				this.updateState({ state: 5, in_cleaning: 1 }); // 5 = Cleaning
				return ["ok"];
			case "app_stop":
			case "app_pause":
				this.updateState({ state: 10, in_cleaning: 1 }); // 10 = Paused
				return ["ok"];
			case "app_charge":
				this.updateState({ state: 6, in_returning: 1, in_cleaning: 0 }); // 6 = Returning to dock
				return ["ok"];
			case "set_custom_mode":
				this.updateState({ fan_power: params[0] });
				return ["ok"];
			case "reset_consumable":
			{
				const consumable = params[0] as string;
				if (consumable in this.consumables) {
					this.consumables[consumable] = 0;
				}
				return ["ok"];
			}
			default:
				// Return generic success for unknown commands to prevent crashes
				return ["ok"];
		}
	}

	private handleGetProp(keys: string[]): any[] {
		if (keys.length === 1 && keys[0] === "get_status") {
			return [this.state];
		}

		const result: any[] = [];
		for (const key of keys) {
			if (key in this.state) {
				result.push(this.state[key]);
			} else {
				result.push(null);
			}
		}
		return result;
	}

	private handleGetCleanRecord(recordId: number): any[] {
		const record = this.cleanRecordsMap.get(recordId);
		if (record) {
			return [record];
		} else if (this.cleanRecords.length > 0) {
			// Return first available record if specific ID not found (mock behavior)
			return [this.cleanRecords[0]];
		}
		return [];
	}

	public updateState(updates: Record<string, any>): void {
		this.state = { ...this.state, ...updates };
	}

	public setDss(bits: {
        cleanFluid?: number,
        waterFilter?: number,
        dustBag?: number,
        dirtyTank?: number,
        cleanTank?: number,
        updownWater?: number
    }): void {
		const current = this.state.dss || 0;
		let next = current;
		if (bits.cleanFluid !== undefined) next = (next & ~(0b11 << 10)) | (bits.cleanFluid << 10);
		if (bits.waterFilter !== undefined) next = (next & ~(0b11 << 8)) | (bits.waterFilter << 8);
		if (bits.dustBag !== undefined) next = (next & ~(0b11 << 6)) | (bits.dustBag << 6);
		if (bits.dirtyTank !== undefined) next = (next & ~(0b11 << 4)) | (bits.dirtyTank << 4);
		if (bits.cleanTank !== undefined) next = (next & ~(0b11 << 2)) | (bits.cleanTank << 2);
		if (bits.updownWater !== undefined) next = (next & ~(0b11)) | (bits.updownWater);

		this.updateState({ dss: next });
	}
}
