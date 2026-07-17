import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { sha256File, type JsonRecord } from "../../scripts/lib/q7FullSceneEvidence";

const fixtureDirectory = path.join(process.cwd(), "test", "fixtures", "appplugin");
const profiles = [
	{
		name: "q7-l5",
		bundleSha256: "9dfd8cc4c3020fe8e2428b3be4ca237b65ba536a4730addcfc29300885361a35",
		pngSha256: {
			none: "af81d2fe8d2302c0074eb403df70dcd8f8d64a86785d07e88a42f59c7e22e9cd",
			one: "3f90a6903ecfa13c1007c740d78389e364a141c9becb66d0da815f6ab621d9e6",
			deselected: "af81d2fe8d2302c0074eb403df70dcd8f8d64a86785d07e88a42f59c7e22e9cd",
			multiple: "dd11cc9e41c4cca38aa9ce98f0749507b02ee306c9806f069f1a2cf35fc3ad18",
		},
	},
	{
		name: "q7-m5",
		bundleSha256: "c4136ce753609838415d14264c39e661792c83949f3e9e86d9c463b9bbd19205",
		pngSha256: {
			none: "8d2bfc29435ca18f5651516c6d845d42e8c90e998fdadb7270699654ea241f19",
			one: "61237e880834547e744eaefc2a4ce66ccc478d0b48574e61986fbc40398e1fc3",
			deselected: "8d2bfc29435ca18f5651516c6d845d42e8c90e998fdadb7270699654ea241f19",
			multiple: "306fe1a58e8fad0e8ff28a3f12711b01f9d53c75e59345431647c879e7008e35",
		},
	},
] as const;

function readGolden(profile: string): JsonRecord {
	return JSON.parse(fs.readFileSync(
		path.join(fixtureDirectory, `${profile}-room-selection-golden.json`),
		"utf8",
	)) as JsonRecord;
}

describe("Q7 L5/M5 AppPlugin room-selection gate", () => {
	it("locks the AppPlugin-owned IDs for none, selection, deselection and multiple selection", () => {
		for (const profile of profiles) {
			const golden = readGolden(profile.name);
			const states = golden.states as JsonRecord;
			expect(golden.version).toBe(1);
			expect(golden.bundleSha256).toBe(profile.bundleSha256);
			expect((states.none as JsonRecord).selection).toEqual({
				roomCount: 4,
				selectedRoomCount: 0,
				selectedRoomIds: [],
				ownedByAppPlugin: true,
			});
			expect((states.one as JsonRecord).selection).toEqual({
				roomCount: 4,
				selectedRoomCount: 1,
				selectedRoomIds: [10],
				ownedByAppPlugin: true,
			});
			expect((states.deselected as JsonRecord).selection).toEqual({
				roomCount: 4,
				selectedRoomCount: 0,
				selectedRoomIds: [],
				ownedByAppPlugin: true,
			});
			expect((states.multiple as JsonRecord).selection).toEqual({
				roomCount: 4,
				selectedRoomCount: 2,
				selectedRoomIds: [10, 11],
				ownedByAppPlugin: true,
			});
			expect(((states.none as JsonRecord).map as JsonRecord).paths)
				.toStrictEqual(((states.deselected as JsonRecord).map as JsonRecord).paths);
			expect(((states.none as JsonRecord).map as JsonRecord).paths)
				.not.toStrictEqual(((states.one as JsonRecord).map as JsonRecord).paths);
			expect(((states.one as JsonRecord).map as JsonRecord).paths)
				.not.toStrictEqual(((states.multiple as JsonRecord).map as JsonRecord).paths);
		}
	});

	it("binds every selected and deselected render to its exact bundle-specific PNG", () => {
		for (const profile of profiles) {
			for (const [state, expectedSha256] of Object.entries(profile.pngSha256)) {
				expect(sha256File(path.join(
					fixtureDirectory,
					`${profile.name}-room-selection-${state}-golden.png`,
				))).toBe(expectedSha256);
			}
			expect(profile.pngSha256.none).toBe(profile.pngSha256.deselected);
			expect(profile.pngSha256.one).not.toBe(profile.pngSha256.none);
			expect(profile.pngSha256.multiple).not.toBe(profile.pngSha256.one);
		}
		expect(profiles[0].pngSha256.one).not.toBe(profiles[1].pngSha256.one);
		expect(profiles[0].pngSha256.multiple).not.toBe(profiles[1].pngSha256.multiple);
	});
});
