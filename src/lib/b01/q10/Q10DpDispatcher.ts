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
	private readonly lastProtocol102SummaryByDuid = new Map<string, string>();

	constructor(private readonly adapter: Roborock) {}

	private async getQ10Handler(duid: string): Promise<Q10FeatureHandler | undefined> {
		const b01Variant = await this.adapter.getB01Variant(duid);
		if (b01Variant !== "Q10") return undefined;
		return this.adapter.deviceFeatureHandlers.get(duid) as unknown as Q10FeatureHandler | undefined;
	}

	private logSummaryIfChanged(duid: string, summary: string | null): void {
		if (!summary) {
			this.lastProtocol102SummaryByDuid.delete(duid);
			return;
		}

		const previousSummary = this.lastProtocol102SummaryByDuid.get(duid);
		if (previousSummary === summary) return;

		this.lastProtocol102SummaryByDuid.set(duid, summary);
		this.adapter.rLog("MQTT", duid, "Debug", "102", undefined, `[Q10DP] ${summary}`, "debug");
	}

	private summarizeFlatShadow(dpsRoot: Record<string, unknown>): { summary: string | null; hasUnknownKeys: boolean } {
		const commonDps =
			dpsRoot["101"] && typeof dpsRoot["101"] === "object" && !Array.isArray(dpsRoot["101"])
				? dpsRoot["101"] as Record<string, unknown>
				: undefined;
		const summaryParts: string[] = [];

		const recordPayload = commonDps?.["52"];
		if (recordPayload && typeof recordPayload === "object" && !Array.isArray(recordPayload)) {
			const dp52 = recordPayload as Record<string, unknown>;
			const op = String(dp52.op ?? "");
			if (op === "select" && Number(dp52.result ?? 0) === 1) {
				return { summary: null, hasUnknownKeys: false };
			}
			if (op === "list" && Array.isArray(dp52.data)) {
				return { summary: null, hasUnknownKeys: false };
			}
		}

		const mapListPayload = commonDps?.["61"];
		if (mapListPayload && typeof mapListPayload === "object" && !Array.isArray(mapListPayload)) {
			const dp61 = mapListPayload as Record<string, unknown>;
			if (Array.isArray(dp61.data)) {
				summaryParts.push(`maps:${dp61.data.length}`);
			}
		}

		const mapMetaPayload = commonDps?.["64"];
		if (mapMetaPayload && typeof mapMetaPayload === "object" && !Array.isArray(mapMetaPayload)) {
			const dp64 = mapMetaPayload as Record<string, unknown>;
			if (Array.isArray(dp64.data)) {
				summaryParts.push(`map_meta:${dp64.data.length}`);
			}
		}

		const carpetPayload = commonDps?.["65"];
		if (carpetPayload && typeof carpetPayload === "object" && !Array.isArray(carpetPayload)) {
			const dp65 = carpetPayload as Record<string, unknown>;
			if (Array.isArray(dp65.data)) {
				summaryParts.push(`carpets:${dp65.data.length}`);
			}
		}

		const hasPrimaryShadowState =
			dpsRoot["121"] !== undefined ||
			dpsRoot["122"] !== undefined ||
			dpsRoot["123"] !== undefined ||
			dpsRoot["124"] !== undefined;

		if (dpsRoot["121"] !== undefined) summaryParts.push(`status=${dpsRoot["121"]}`);
		if (dpsRoot["122"] !== undefined) summaryParts.push(`battery=${dpsRoot["122"]}`);
		if (dpsRoot["123"] !== undefined) summaryParts.push(`fan=${dpsRoot["123"]}`);
		if (dpsRoot["124"] !== undefined) summaryParts.push(`water=${dpsRoot["124"]}`);

		if (hasPrimaryShadowState) {
			if (commonDps?.["36"] !== undefined) summaryParts.push(`voice_lang=${commonDps["36"]}`);
			if (commonDps?.["108"] !== undefined) summaryParts.push(`voice_ver=${commonDps["108"]}`);
			if (commonDps?.["109"] !== undefined) summaryParts.push(`country=${commonDps["109"]}`);
			if (commonDps?.["81"] && typeof commonDps["81"] === "object" && !Array.isArray(commonDps["81"])) {
				const signal = (commonDps["81"] as Record<string, unknown>).signal;
				if (signal !== undefined) summaryParts.push(`rssi=${signal}`);
			}
		}

		const knownTopLevelKeys = new Set(["101", "121", "122", "123", "124", "125", "126", "127", "136", "137", "138", "139", "141", "142"]);
		const knownCommonKeys = new Set([
			"6", "7", "25", "26", "29", "30", "31", "32", "33", "36", "37", "40", "45", "47", "50", "51", "52", "53",
			"60", "61", "64", "65", "67", "76", "78", "79", "81", "83", "86", "87", "88", "90", "92", "93", "96", "104",
			"105", "106", "108", "109", "207"
		]);
		const unknownTopLevelKeys = Object.keys(dpsRoot).filter((key) => !knownTopLevelKeys.has(key));
		const unknownCommonKeys = commonDps
			? Object.keys(commonDps).filter((key) => !knownCommonKeys.has(key))
			: [];
		const unknownKeys = [...unknownTopLevelKeys, ...unknownCommonKeys.map((key) => `101.${key}`)];
		return {
			summary: unknownKeys.length === 0 && summaryParts.length > 0 ? summaryParts.join(" | ") : null,
			hasUnknownKeys: unknownKeys.length > 0
		};
	}

	public async dispatchProtocol102(duid: string, parsed: Record<string, unknown>, dps102: Record<string, unknown>): Promise<boolean> {
		const handler = await this.getQ10Handler(duid);
		if (!handler) return false;

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

		const result0Keys = result0 && typeof result0 === "object" && !Array.isArray(result0)
			? Object.keys(result0 as Record<string, unknown>).slice(0, 12).join(",")
			: "";
		const summaryParts: string[] = [];
		if (hasStatusResult) summaryParts.push("status");
		if (hasMapInfoResult) summaryParts.push("map_info");
		if (hasConsumableResult) summaryParts.push("consumables");
		if (hasTimerResult) summaryParts.push(`timers:${resultList.length}`);
		if (result0Keys) summaryParts.push(`result0:${result0Keys}`);

		const flatShadowInfo = this.summarizeFlatShadow(dpsRoot ?? {});
		const summary = summaryParts.join(" | ") || flatShadowInfo.summary;
		this.logSummaryIfChanged(duid, summary || null);

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

		return (hasStatusResult || hasMapInfoResult || hasConsumableResult || hasTimerResult || isFlatQ10Shadow || !!net81) && !flatShadowInfo.hasUnknownKeys;
	}

	public async tryHandleCleanRecordBlob(duid: string, payloadBuf: Buffer): Promise<boolean> {
		const q10BlobType = B01MapDecryptor.getQ10BlobType(payloadBuf);
		if (q10BlobType !== 3) return false;

		const handler = await this.getQ10Handler(duid);
		if (!handler || typeof handler.applyQ10CleanRecordBlob !== "function") return false;
		if (typeof handler.hasPendingQ10CleanRecordBlobRequest === "function" && !handler.hasPendingQ10CleanRecordBlobRequest()) {
			return false;
		}

		return handler.applyQ10CleanRecordBlob(payloadBuf);
	}
}
