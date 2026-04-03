import type { Roborock } from "../../../main";
import type { Q10PayloadClassification } from "./B01MapPayloadClassifier";
import { classifyB01MapPayload, B01MapPayloadClassification } from "./B01MapPayloadClassifier";
import { MapDecryptor } from "./MapDecryptor";
import { MapParser } from "./MapParser";
import type { B01MapData } from "./types";

export type ResolvedB01MapPayload =
	| {
		variant: "protobuf";
		payload: Buffer;
		classification: B01MapPayloadClassification;
		mapData: B01MapData;
		q10: null;
	}
	| {
		variant: "q10";
		payload: Buffer;
		classification: B01MapPayloadClassification;
		mapData: B01MapData | null;
		q10: Q10PayloadClassification;
	};

export class B01MapPipeline {
	private readonly parser: MapParser;

	constructor(private readonly adapter: Roborock) {
		this.parser = new MapParser(adapter);
	}

	public resolve(
		rawData: Buffer,
		version: string,
		model: string,
		serial: string,
		duid: string,
		connectionType: string
	): ResolvedB01MapPayload | null {
		for (const candidate of this.collectCandidates(rawData, version, model, serial, duid)) {
			const classification = classifyB01MapPayload(candidate);
			if (!classification.isMapPayload) continue;

			if (classification.variant === "q10" && classification.q10) {
				return {
					variant: "q10",
					payload: candidate,
					classification,
					mapData: classification.q10.mapData,
					q10: classification.q10
				};
			}

			if (classification.variant === "protobuf") {
				return {
					variant: "protobuf",
					payload: candidate,
					classification,
					mapData: this.parser.parseProtobuf(candidate, duid, connectionType),
					q10: null
				};
			}
		}

		return null;
	}

	private collectCandidates(
		rawData: Buffer,
		version: string,
		model: string,
		serial: string,
		duid: string
	): Buffer[] {
		const candidates: Buffer[] = [];
		const pushUnique = (candidate: Buffer | null | undefined): void => {
			if (!candidate || candidate.length === 0) return;
			if (candidates.some((existing) => existing.equals(candidate))) return;
			candidates.push(candidate);
		};

		pushUnique(rawData);
		if (classifyB01MapPayload(rawData).isMapPayload) return candidates;

		if (version !== "B01") return candidates;

		const localKey = this.adapter.http_api?.getMatchedLocalKeys
			? this.adapter.http_api.getMatchedLocalKeys().get(duid)
			: undefined;

		const decrypted = MapDecryptor.decrypt(rawData, serial, model, duid, this.adapter, localKey);
		pushUnique(decrypted);
		if (decrypted && classifyB01MapPayload(decrypted).isMapPayload) return candidates;

		pushUnique(MapDecryptor.decryptLayer1Only(rawData, localKey));

		return candidates;
	}
}
