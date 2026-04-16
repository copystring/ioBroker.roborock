import type { B01MapData } from "./types";
import type { Q10SourcePathPoint } from "../q10/types";
import { parseQ10PathOnlyToSourcePoints, parseQ10YxMapToB01 } from "../q10/Q10YxMapParser";

export type B01MapPayloadVariant = "protobuf" | "q10" | "unknown";
export type B01MapPayloadKind = "live" | "history" | "other";
export type Q10PayloadShape = "map" | "blob";

export interface Q10PayloadClassification {
	isQ10Payload: boolean;
	isLiveMapCandidate: boolean;
	payloadShape: Q10PayloadShape;
	blobType: 1 | 2 | 3 | 4 | null;
	mapData: B01MapData | null;
	pathPoints: Q10SourcePathPoint[] | null;
}

export interface B01MapPayloadClassification {
	isMapPayload: boolean;
	variant: B01MapPayloadVariant;
	kind: B01MapPayloadKind;
	isLiveMapCandidate: boolean;
	q10: Q10PayloadClassification | null;
}

const NON_B01_MAP_PAYLOAD: B01MapPayloadClassification = {
	isMapPayload: false,
	variant: "unknown",
	kind: "other",
	isLiveMapCandidate: false,
	q10: null
};

const NON_Q10_PAYLOAD: Q10PayloadClassification = {
	isQ10Payload: false,
	isLiveMapCandidate: false,
	payloadShape: "map",
	blobType: null,
	mapData: null,
	pathPoints: null
};

function getQ10BlobType(payload: Buffer | null | undefined): 1 | 2 | 3 | 4 | null {
	if (!payload || payload.length < 2) return null;
	const blobType = payload[0];
	return blobType === 1 || blobType === 2 || blobType === 3 || blobType === 4 ? blobType : null;
}

function classifyQ10Payload(payload: Buffer | null | undefined): Q10PayloadClassification {
	if (!payload || payload.length < 2) return NON_Q10_PAYLOAD;

	// Parse first: raw Q10 live maps start with header versions 1/2/3, which
	// overlap with historic blob markers. The actual Q10 parser is the truth.
	const blobType = getQ10BlobType(payload);
	const mapData = payload.length >= 14 ? parseQ10YxMapToB01(payload) : null;
	if (mapData) {
		return {
			isQ10Payload: true,
			isLiveMapCandidate: true,
			payloadShape: blobType === 3 || blobType === 4 ? "blob" : "map",
			blobType: blobType === 3 || blobType === 4 ? blobType : null,
			mapData,
			pathPoints: null
		};
	}

	const pathPoints = payload.length >= 14 ? parseQ10PathOnlyToSourcePoints(payload) : null;
	if (pathPoints?.length) {
		return {
			isQ10Payload: true,
			isLiveMapCandidate: true,
			payloadShape: blobType === 3 || blobType === 4 ? "blob" : "map",
			blobType: blobType === 3 || blobType === 4 ? blobType : null,
			mapData: null,
			pathPoints
		};
	}

	if (blobType != null) {
		return {
			isQ10Payload: true,
			isLiveMapCandidate: false,
			payloadShape: "blob",
			blobType,
			mapData: null,
			pathPoints: null
		};
	}

	return NON_Q10_PAYLOAD;
}

export function classifyB01MapPayload(payload: Buffer | null | undefined): B01MapPayloadClassification {
	if (!payload || payload.length < 3) return NON_B01_MAP_PAYLOAD;

	if (payload[0] === 0x08 && payload[2] === 0x12) {
		if (payload[1] === 0x00) {
			return {
				isMapPayload: true,
				variant: "protobuf",
				kind: "live",
				isLiveMapCandidate: true,
				q10: null
			};
		}
		if (payload[1] === 0x15) {
			return {
				isMapPayload: true,
				variant: "protobuf",
				kind: "history",
				isLiveMapCandidate: false,
				q10: null
			};
		}
	}

	const q10 = classifyQ10Payload(payload);
	if (q10.isQ10Payload) {
		const kind: B01MapPayloadKind =
			q10.blobType === 3 ? "history" :
				q10.isLiveMapCandidate ? "live" :
					"other";
		return {
			isMapPayload: true,
			variant: "q10",
			kind,
			isLiveMapCandidate: kind === "live",
			q10
		};
	}

	return NON_B01_MAP_PAYLOAD;
}
