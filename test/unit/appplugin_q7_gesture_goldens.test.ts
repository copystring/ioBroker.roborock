import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

interface GestureGolden {
	schemaVersion: number;
	source: string;
	deviceModel: string;
	bundleKind: string;
	bundleSha256: string;
	productFallbackAllowed: boolean;
	pointerOwnership: string;
	centerPinch: {
		initialScale: number;
		zoomedScale: number;
		restoredScale: number;
		inverseMatrixDelta: number;
	};
	boundaries: {
		minScale: number;
		maxScale: number;
		minScaleAfterRoundTrip: number;
	};
	focus: {
		originalZoomAnchor: { x: number; y: number };
		mapPointBefore: { x: number; y: number };
		mapPointAfter: { x: number; y: number };
		drift: number;
	};
	drag: {
		requestedDelta: { x: number; y: number };
		observedTranslationDelta: { x: number; y: number };
	};
	cancel: {
		frameChangedBeforeCancel: boolean;
		activePointerIdsAfterCancel: number[];
		followUpGestureAccepted: boolean;
	};
}

const profiles = [
	{
		id: "q7-l5",
		bundleSha256: "9dfd8cc4c3020fe8e2428b3be4ca237b65ba536a4730addcfc29300885361a35",
	},
	{
		id: "q7-m5",
		bundleSha256: "c4136ce753609838415d14264c39e661792c83949f3e9e86d9c463b9bbd19205",
	},
] as const;

function loadGolden(profile: string): GestureGolden {
	const filePath = path.join(process.cwd(), "test", "fixtures", "appplugin", `${profile}-gesture-golden.json`);
	return JSON.parse(fs.readFileSync(filePath, "utf8")) as GestureGolden;
}

describe("Q7 AppPlugin gesture goldens", () => {
	it.each(profiles)("binds $id gesture behavior to its unchanged Hermes bundle", profile => {
		const golden = loadGolden(profile.id);

		expect(golden).toMatchObject({
			schemaVersion: 1,
			source: `unchanged-${profile.id}-appplugin-session`,
			deviceModel: "roborock.vacuum.sc01",
			bundleKind: "hermes-bytecode",
			bundleSha256: profile.bundleSha256,
			productFallbackAllowed: false,
			pointerOwnership: "apk-touch-dispatch-to-unchanged-appplugin",
		});
		expect(golden.centerPinch.zoomedScale).toBeGreaterThan(golden.centerPinch.initialScale);
		expect(golden.centerPinch.restoredScale).toBe(golden.centerPinch.initialScale);
		expect(golden.centerPinch.inverseMatrixDelta).toBe(0);
		expect(golden.boundaries.minScale).toBeLessThan(golden.boundaries.maxScale);
		expect(golden.boundaries.minScaleAfterRoundTrip).toBe(golden.boundaries.minScale);
		expect(golden.focus.originalZoomAnchor.x).toEqual(expect.any(Number));
		expect(golden.focus.originalZoomAnchor.y).toEqual(expect.any(Number));
		expect(golden.focus.mapPointAfter).toEqual(golden.focus.mapPointBefore);
		expect(golden.focus.drift).toBe(0);
		expect(golden.drag.observedTranslationDelta).toEqual(golden.drag.requestedDelta);
		expect(golden.cancel).toMatchObject({
			frameChangedBeforeCancel: true,
			activePointerIdsAfterCancel: [],
			followUpGestureAccepted: true,
		});
	});
});
