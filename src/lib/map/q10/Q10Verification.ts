import type {
	B01MapData,
	Q10VerificationFeature,
	Q10VerificationItem,
	Q10VerificationSummary
} from "../b01/types";

const VERIFIED_WITH_CURRENT_SAMPLES: ReadonlySet<Q10VerificationFeature> = new Set([
	"paths",
	"virtualWalls",
	"roomTags",
	"obstacles",
	"selfIdentifiedCarpets"
]);

const FEATURE_ORDER: readonly Q10VerificationFeature[] = [
	"paths",
	"virtualWalls",
	"roomTags",
	"obstacles",
	"selfIdentifiedCarpets",
	"manualCarpetAreas",
	"forbidAreas",
	"mopAreas",
	"thresholdAreas",
	"eraseAreas",
	"skipPoints",
	"suspectedPoints"
];

const VERIFIED_NOTE =
	"Seen in the current project Q10 fixture set and checked against the original behavior.";
const UNVERIFIED_NOTE =
	"Ported source-first from the original code, but not yet seen in the current project Q10 fixture set.";

const FEATURE_COUNT_GETTERS: Record<Q10VerificationFeature, (mapData: B01MapData) => number> = {
	paths: (mapData) => mapData.q10SourceData?.pathPoints.length ?? mapData.q10CreatorData?.pathPixels.length ?? 0,
	virtualWalls: (mapData) => mapData.q10SourceData?.virtualWalls.length ?? mapData.q10CreatorData?.virtualWalls.length ?? 0,
	roomTags: (mapData) => mapData.q10CreatorData?.roomModels.length ?? mapData.rooms?.length ?? 0,
	obstacles: (mapData) => mapData.q10SourceData?.obstacles.length ?? mapData.q10CreatorData?.obstaclePixels.length ?? 0,
	selfIdentifiedCarpets: (mapData) => mapData.q10CreatorData?.selfIdentifiedCarpets.length ?? (mapData.carpetGrid?.length ? 1 : 0),
	manualCarpetAreas: (mapData) => mapData.q10SourceData?.carpetAreas.length ?? mapData.q10CreatorData?.carpetAreas.length ?? 0,
	forbidAreas: (mapData) => mapData.q10SourceData?.forbidAreas.length ?? mapData.q10CreatorData?.forbidAreas.length ?? 0,
	mopAreas: (mapData) => mapData.q10SourceData?.mopAreas.length ?? mapData.q10CreatorData?.mopAreas.length ?? 0,
	thresholdAreas: (mapData) => mapData.q10SourceData?.thresholdAreas.length ?? mapData.q10CreatorData?.thresholdAreas.length ?? 0,
	eraseAreas: (mapData) => mapData.q10SourceData?.eraseAreas.length ?? mapData.q10CreatorData?.eraseAreas.length ?? 0,
	skipPoints: (mapData) => mapData.q10SourceData?.skipPoints.length ?? mapData.q10CreatorData?.skipPixels.length ?? 0,
	suspectedPoints: (mapData) => mapData.q10SourceData?.suspectedPoints.length ?? mapData.q10CreatorData?.suspectedPoints.length ?? 0
};

function getFeatureCount(mapData: B01MapData, feature: Q10VerificationFeature): number {
	return FEATURE_COUNT_GETTERS[feature](mapData);
}

export function buildQ10Verification(mapData: B01MapData): Q10VerificationSummary | undefined {
	if (!mapData.q10SourceData && !mapData.q10CreatorData && mapData.sourceFormat !== "q10-raw") {
		return undefined;
	}

	const items = {} as Record<Q10VerificationFeature, Q10VerificationItem>;
	for (const feature of FEATURE_ORDER) {
		const observedInCurrentSampleSet = VERIFIED_WITH_CURRENT_SAMPLES.has(feature);
		const countInThisMap = getFeatureCount(mapData, feature);
		items[feature] = {
			state: observedInCurrentSampleSet ? "verified_with_current_samples" : "ported_unverified",
			observedInCurrentSampleSet,
			presentInThisMap: countInThisMap > 0,
			countInThisMap,
			note: observedInCurrentSampleSet ? VERIFIED_NOTE : UNVERIFIED_NOTE
		};
	}

	const verifiedFeatures = FEATURE_ORDER.filter((feature) => items[feature].state === "verified_with_current_samples");
	const unverifiedFeatures = FEATURE_ORDER.filter((feature) => items[feature].state === "ported_unverified");
	const presentVerifiedFeatures = verifiedFeatures.filter((feature) => items[feature].presentInThisMap);
	const presentUnverifiedFeatures = unverifiedFeatures.filter((feature) => items[feature].presentInThisMap);

	return {
		policy: "source-first",
		sampleEvidence: "project_q10_fixtures",
		items,
		verifiedFeatures,
		unverifiedFeatures,
		presentVerifiedFeatures,
		presentUnverifiedFeatures
	};
}
