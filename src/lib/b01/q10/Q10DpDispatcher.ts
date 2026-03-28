import type { Roborock } from "../../../main";
import { MapDecryptor as B01MapDecryptor } from "../../map/b01/MapDecryptor";

type Q10FeatureHandler = {
	applyQ10CleanRecordBlob?: (payload: Buffer) => Promise<boolean>;
	applyQ10ConsumablesFromDpResult?: (data: Record<string, unknown>) => Promise<void>;
	applyQ10MapInfoFromDpResult?: (result: Record<string, unknown>) => Promise<void>;
	applyQ10NetworkFromDp81?: (net: Record<string, unknown>) => Promise<void>;
	applyQ10ShadowDpPayload?: (dps: Record<string, unknown>) => Promise<void>;
	applyQ10StatusFromDpResult?: (status: Record<string, unknown>) => Promise<void>;
	applyQ10TimersFromDpResult?: (timers: unknown[]) => Promise<void>;
	hasPendingQ10CleanRecordBlobRequest?: () => boolean;
};

export class Q10DpDispatcher {
	constructor(private readonly adapter: Roborock) {}

	private async getQ10Handler(duid: string): Promise<Q10FeatureHandler | undefined> {
		const b01Variant = await this.adapter.getB01Variant(duid);
		if (b01Variant !== "Q10") return undefined;
		return this.adapter.deviceFeatureHandlers.get(duid) as unknown as Q10FeatureHandler | undefined;
	}

	public async dispatchProtocol102(duid: string, parsed: Record<string, unknown>, dps102: Record<string, unknown>): Promise<void> {
		const handler = await this.getQ10Handler(duid);
		if (!handler) return;

		const dpsRoot = parsed.dps && typeof parsed.dps === "object" && !Array.isArray(parsed.dps)
			? parsed.dps as Record<string, unknown>
			: undefined;
		const dps101 = dpsRoot?.["101"];
		const resultList = Array.isArray(dps102.result) ? dps102.result : [];
		const result0 = resultList[0];
		const isPropPost = dps102.method === "prop.post";
		const hasStatusResult = !!(result0 && typeof result0 === "object" && "state" in (result0 as Record<string, unknown>));
		const hasMapInfoResult = !!(result0 && typeof result0 === "object" && "map_info" in (result0 as Record<string, unknown>));
		const hasConsumableResult = !!(
			result0 &&
			typeof result0 === "object" &&
			(
				"main_brush_work_time" in (result0 as Record<string, unknown>) ||
				"filter_element_work_time" in (result0 as Record<string, unknown>) ||
				"dust_collection_work_times" in (result0 as Record<string, unknown>)
			)
		);
		const hasTimerResult = resultList.length > 0 && resultList.every((entry: unknown) => Array.isArray(entry) && entry.length >= 3);
		const isFlatQ10Shadow = !!(dpsRoot && (dpsRoot["101"] || dpsRoot["121"] || dpsRoot["122"] || dpsRoot["123"] || dpsRoot["124"]));

		const dps101Keys = dps101 && typeof dps101 === "object" && !Array.isArray(dps101)
			? Object.keys(dps101 as Record<string, unknown>).join(",")
			: "";
		const result0Keys = result0 && typeof result0 === "object" && !Array.isArray(result0)
			? Object.keys(result0 as Record<string, unknown>).slice(0, 12).join(",")
			: "";
		this.adapter.rLog(
			"MQTT",
			duid,
			"Debug",
			"102",
			undefined,
			`[Q10DP] status=${hasStatusResult ? 1 : 0} map_info=${hasMapInfoResult ? 1 : 0} consumables=${hasConsumableResult ? 1 : 0} timers=${hasTimerResult ? resultList.length : 0} shadow=${isFlatQ10Shadow ? 1 : 0} dps101=${dps101Keys || "-"} result0=${result0Keys || "-"}`,
			"debug"
		);

		if (hasStatusResult && !isPropPost && typeof handler.applyQ10StatusFromDpResult === "function") {
			await handler.applyQ10StatusFromDpResult(result0 as Record<string, unknown>);
		}
		if (hasMapInfoResult && typeof handler.applyQ10MapInfoFromDpResult === "function") {
			await handler.applyQ10MapInfoFromDpResult(result0 as Record<string, unknown>);
		}
		if (hasConsumableResult && typeof handler.applyQ10ConsumablesFromDpResult === "function") {
			await handler.applyQ10ConsumablesFromDpResult(result0 as Record<string, unknown>);
		}
		if (hasTimerResult && typeof handler.applyQ10TimersFromDpResult === "function") {
			await handler.applyQ10TimersFromDpResult(resultList);
		}
		if (isFlatQ10Shadow && typeof handler.applyQ10ShadowDpPayload === "function") {
			await handler.applyQ10ShadowDpPayload(dpsRoot!);
		}

		const net81 = dps101 && typeof dps101 === "object" && !Array.isArray(dps101)
			? (dps101 as Record<string, unknown>)["81"]
			: undefined;
		if (net81 && typeof net81 === "object" && !Array.isArray(net81) && typeof handler.applyQ10NetworkFromDp81 === "function") {
			await handler.applyQ10NetworkFromDp81(net81 as Record<string, unknown>);
		}
	}

	public async tryHandleCleanRecordBlob(duid: string, payloadBuf: Buffer, protocol: number): Promise<boolean> {
		const q10BlobType = B01MapDecryptor.getQ10BlobType(payloadBuf);
		if (q10BlobType !== 3) return false;

		const handler = await this.getQ10Handler(duid);
		if (!handler || typeof handler.applyQ10CleanRecordBlob !== "function") return false;
		if (typeof handler.hasPendingQ10CleanRecordBlobRequest === "function" && !handler.hasPendingQ10CleanRecordBlobRequest()) {
			return false;
		}

		const handled = await handler.applyQ10CleanRecordBlob(payloadBuf);
		if (handled) {
			this.adapter.rLog("MQTT", duid, "Debug", "B01", protocol, `Q10 clean record blob type ${q10BlobType} handled via record-detail pipeline.`, "debug");
		}
		return handled;
	}
}
