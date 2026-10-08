type Mode = 1 | 2 | 3;
type Region = "jp" | "tw" | "kr" | "default";
type RawProgram = readonly [
	mode: Mode, program: number, isInApp: boolean,
	temperatureLevels: readonly number[], defaultTemperatureLevel: number | null,
	rinseLevels: readonly number[], defaultRinseLevel: number | null,
	spinLevels: readonly number[], defaultSpinLevel: number | null,
	dryingLevels: readonly number[], defaultDryingLevel: number | null,
];

// Generated from AppPlugin CommonJS charts 1286-1289. The rows are filtered
// by mode type (1/2/3) with CloudProgram (DP 6) excluded, matching
// HomePageModes in output/1283.js. isInApp is metadata, not a filter.
const PROGRAMS: Record<Region, readonly RawProgram[]> = {
	jp: [
		[1, 1, false, [1, 6, 2, 3, 4], 2, [1, 2, 3, 4], 2, [1, 2, 3, 4, 5, 6], 5, [], null],
		[1, 2, false, [1, 6, 2, 3], 1, [1, 2], 1, [1, 2, 3, 4, 5], 4, [], null],
		[1, 3, false, [4, 5], 4, [1, 2, 3, 4, 5], 2, [1, 2, 3, 4, 5, 6, 7], 5, [], null],
		[1, 4, false, [1, 6, 2, 3], 2, [1, 2, 3], 2, [1, 2, 3, 4], 4, [], null],
		[1, 7, false, [1, 6, 2, 3, 4], 3, [1, 2, 3, 4, 5], 2, [1, 2, 3, 4, 5, 6], 5, [], null],
		[1, 8, false, [1, 6, 2, 3], 2, [1, 2, 3], 2, [1, 2, 3, 4, 5], 4, [], null],
		[1, 9, false, [1, 6, 2, 3], 2, [1, 2, 3, 4, 5], 2, [1, 2, 3], 3, [], null],
		[1, 10, false, [], null, [1, 2, 3], 1, [1, 2, 3, 4, 5, 6, 7], 6, [], null],
		[1, 11, false, [], null, [], null, [1, 2, 3, 4, 5, 6, 7], 6, [], null],
		[1, 12, false, [4, 5], 4, [2], 2, [4], 4, [], null],
		[1, 13, true, [3, 4, 5], 3, [3, 4, 5], 3, [1, 2, 3, 4, 5, 6], 5, [], null],
		[1, 14, true, [4, 5], 4, [1, 2, 3, 4, 5], 3, [1, 2, 3, 4, 5, 6], 5, [], null],
		[1, 15, true, [1, 6, 2, 3, 4], 3, [1, 2, 3, 4, 5], 2, [1, 2, 3, 4, 5, 6], 5, [], null],
		[1, 16, true, [1, 6, 2, 3, 4], 6, [1, 2, 3], 2, [1, 2, 3, 4], 4, [], null],
		[1, 17, true, [1, 6, 2], 1, [1, 2, 3, 4], 2, [1, 2, 3, 4, 5, 6], 4, [], null],
		[1, 18, true, [1, 6, 2, 3, 4], 2, [1, 2, 3, 4], 2, [1, 2, 3, 4, 5, 6], 5, [], null],
		[1, 19, true, [1, 6, 2, 3, 4], 2, [1, 2, 3, 4], 2, [1, 2, 3, 4, 5, 6], 5, [], null],
		[1, 20, true, [1, 6, 2, 3, 4], 3, [1, 2, 3, 4], 2, [1, 2, 3, 4, 5, 6], 5, [], null],
		[1, 21, true, [1, 6, 2, 3], 2, [1, 2, 3], 2, [1, 2, 3, 4, 5, 6], 4, [], null],
		[1, 22, true, [1, 6, 2, 3, 4], 3, [1, 2, 3, 4, 5], 2, [1, 2, 3, 4, 5, 6, 7], 5, [], null],
		[1, 23, false, [1, 6, 2, 3, 4, 5], 3, [1, 2, 3, 4, 5], 2, [1, 2, 3, 4, 5, 6, 7], 6, [], null],
		[2, 1, false, [1, 6, 2, 3, 4], 2, [1, 2, 3, 4], 2, [5, 6], 6, [1, 2, 3], 2],
		[2, 2, false, [1, 6, 2, 3], 1, [1, 2], 1, [7], 7, [1, 2, 3], 2],
		[2, 3, false, [4, 5], 4, [1, 2, 3, 4, 5], 2, [6, 7], 7, [1, 2, 3], 2],
		[2, 4, false, [1, 6, 2, 3], 2, [1, 2, 3], 2, [4], 4, [2], 2],
		[2, 7, false, [1, 6, 2, 3, 4], 3, [1, 2, 3, 4, 5], 2, [6, 7], 7, [1, 2, 3], 2],
		[2, 8, false, [1, 6, 2, 3], 2, [1, 2, 3], 2, [4, 5], 5, [2], 2],
		[2, 9, false, [1, 6, 2, 3], 2, [1, 2, 3, 4, 5], 2, [4], 4, [2], 2],
		[2, 10, false, [], null, [1, 2, 3], 1, [6, 7], 7, [1, 2, 3], 2],
		[2, 11, false, [], null, [], null, [6, 7], 7, [1, 2, 3], 2],
		[2, 12, false, [4, 5], 4, [2], 2, [4], 4, [3], 3],
		[2, 13, true, [3, 4, 5], 3, [3, 4, 5], 3, [5, 6], 6, [1, 2, 3], 2],
		[2, 14, true, [4, 5], 4, [1, 2, 3, 4, 5], 3, [6, 7], 7, [1, 2, 3], 2],
		[2, 15, true, [1, 6, 2, 3, 4], 3, [1, 2, 3, 4, 5], 2, [5, 6], 6, [1, 2, 3], 2],
		[2, 16, true, [1, 6, 2, 3, 4], 6, [1, 2, 3], 2, [6], 6, [1, 2, 3], 2],
		[2, 17, true, [1, 6, 2], 1, [1, 2, 3, 4], 2, [5, 6], 6, [1, 2, 3], 2],
		[2, 18, true, [1, 6, 2, 3, 4], 2, [1, 2, 3, 4], 2, [5, 6], 6, [1, 2, 3], 2],
		[2, 19, true, [1, 6, 2, 3, 4], 2, [1, 2, 3, 4], 2, [5, 6], 6, [1, 2, 3], 2],
		[2, 20, true, [1, 6, 2, 3, 4], 3, [1, 2, 3, 4], 2, [5, 6], 6, [1, 2, 3], 2],
		[2, 21, true, [1, 6, 2, 3], 2, [1, 2, 3], 2, [4], 4, [2], 2],
		[2, 22, true, [1, 6, 2, 3, 4], 3, [1, 2, 3, 4, 5], 2, [5, 6, 7], 7, [1, 2, 3], 2],
		[2, 23, true, [1, 6, 2, 3, 4, 5], 3, [1, 2, 3, 4, 5], 2, [6, 7], 7, [1, 2, 3], 2],
		[3, 1, false, [], null, [], null, [1, 5, 6], 6, [1, 2, 3], 2],
		[3, 2, false, [], null, [], null, [1, 5, 6], 6, [1, 2, 3], 2],
		[3, 3, false, [], null, [], null, [1, 6, 7], 6, [1, 2, 3], 2],
		[3, 4, false, [], null, [], null, [4], 4, [2], 2],
		[3, 5, false, [], null, [], null, [], null, [2], 2],
		[3, 7, false, [], null, [], null, [1, 6, 7], 6, [1, 2, 3], 2],
		[3, 8, false, [], null, [], null, [1, 4, 5], 5, [2], 2],
		[3, 9, false, [], null, [], null, [1, 4], 4, [2], 2],
		[3, 12, false, [], null, [], null, [], null, [3], 3],
		[3, 13, true, [], null, [], null, [1, 5, 6], 5, [1, 2, 3], 2],
		[3, 14, true, [], null, [], null, [1, 6, 7], 6, [1, 2, 3], 2],
		[3, 15, true, [], null, [], null, [1, 5, 6], 6, [1, 2, 3], 2],
		[3, 16, true, [], null, [], null, [1, 5, 6], 6, [1, 2, 3], 2],
		[3, 17, true, [], null, [], null, [1, 5, 6], 6, [1, 2, 3], 2],
		[3, 18, true, [], null, [], null, [1, 5, 6], 6, [1, 2, 3], 2],
		[3, 19, true, [], null, [], null, [1, 5, 6], 6, [1, 2, 3], 2],
		[3, 20, true, [], null, [], null, [1, 5, 6], 5, [1, 2, 3], 2],
		[3, 21, true, [], null, [], null, [1, 4], 4, [2], 2],
		[3, 22, true, [], null, [], null, [1, 5, 6, 7], 6, [1, 2, 3], 2],
		[3, 23, true, [], null, [], null, [1, 6, 7], 6, [1, 2, 3], 2],
		[3, 24, true, [], null, [], null, [], null, [2], 2],
		[3, 25, true, [], null, [], null, [], null, [2], 2],
	],
	tw: [
		[1, 1, false, [1, 6, 2, 3, 4], 2, [1, 2, 3, 4], 2, [1, 2, 3, 4, 5, 6], 5, [], null],
		[1, 2, false, [1, 6, 2, 3], 1, [1, 2], 1, [1, 2, 3, 4, 5], 4, [], null],
		[1, 3, false, [4], 4, [1, 2, 3, 4, 5], 2, [1, 2, 3, 4, 5, 6, 7], 5, [], null],
		[1, 4, false, [1, 6, 2, 3], 2, [1, 2, 3], 2, [1, 2, 3, 4], 4, [], null],
		[1, 7, false, [1, 6, 2, 3, 4], 3, [1, 2, 3, 4, 5], 2, [1, 2, 3, 4, 5, 6], 5, [], null],
		[1, 8, false, [1, 6, 2, 3], 2, [1, 2, 3], 2, [1, 2, 3, 4, 5], 4, [], null],
		[1, 9, false, [1, 6, 2, 3], 2, [1, 2, 3, 4, 5], 2, [1, 2, 3], 3, [], null],
		[1, 10, false, [], null, [1, 2, 3], 1, [1, 2, 3, 4, 5, 6, 7], 6, [], null],
		[1, 11, false, [], null, [], null, [1, 2, 3, 4, 5, 6, 7], 6, [], null],
		[1, 12, false, [4], 4, [2], 2, [4], 4, [], null],
		[1, 13, true, [3, 4], 3, [3, 4, 5], 3, [1, 2, 3, 4, 5, 6], 5, [], null],
		[1, 14, true, [4], 4, [1, 2, 3, 4, 5], 3, [1, 2, 3, 4, 5, 6], 5, [], null],
		[1, 15, true, [1, 6, 2, 3, 4], 3, [1, 2, 3, 4, 5], 2, [1, 2, 3, 4, 5, 6], 5, [], null],
		[1, 16, true, [1, 6, 2, 3, 4], 2, [1, 2, 3], 2, [1, 2, 3, 4], 4, [], null],
		[1, 17, true, [1, 6, 2, 3], 1, [1, 2, 3, 4], 2, [1, 2, 3, 4, 5, 6], 4, [], null],
		[1, 18, true, [1, 6, 2, 3, 4], 2, [1, 2, 3, 4], 2, [1, 2, 3, 4, 5, 6], 5, [], null],
		[1, 19, true, [1, 6, 2, 3, 4], 2, [1, 2, 3, 4], 2, [1, 2, 3, 4, 5, 6], 5, [], null],
		[1, 20, true, [1, 6, 2, 3, 4], 3, [1, 2, 3, 4], 2, [1, 2, 3, 4, 5, 6], 5, [], null],
		[1, 21, true, [1, 6, 2, 3, 4], 2, [1, 2, 3], 2, [1, 2, 3, 4, 5, 6], 4, [], null],
		[1, 22, true, [1, 6, 2, 3, 4], 3, [1, 2, 3, 4, 5], 2, [1, 2, 3, 4, 5, 6, 7], 5, [], null],
		[1, 23, false, [1, 6, 2, 3, 4], 3, [1, 2, 3, 4, 5], 2, [1, 2, 3, 4, 5, 6, 7], 6, [], null],
		[2, 1, false, [1, 6, 2, 3, 4], 2, [1, 2, 3, 4], 2, [5, 6], 6, [1, 2, 3], 2],
		[2, 2, false, [1, 6, 2, 3], 1, [1, 2], 1, [7], 7, [1, 2, 3], 2],
		[2, 3, false, [4], 4, [1, 2, 3, 4, 5], 2, [6, 7], 7, [1, 2, 3], 2],
		[2, 4, false, [1, 6, 2, 3], 2, [1, 2, 3], 2, [4], 4, [2], 2],
		[2, 7, false, [1, 6, 2, 3, 4], 3, [1, 2, 3, 4, 5], 2, [6, 7], 7, [1, 2, 3], 2],
		[2, 8, false, [1, 6, 2, 3], 2, [1, 2, 3], 2, [4, 5], 5, [2], 2],
		[2, 9, false, [1, 6, 2, 3], 2, [1, 2, 3, 4, 5], 2, [4], 4, [2], 2],
		[2, 10, false, [], null, [1, 2, 3], 1, [6, 7], 7, [1, 2, 3], 2],
		[2, 11, false, [], null, [], null, [6, 7], 7, [1, 2, 3], 2],
		[2, 12, false, [4], 4, [2], 2, [4], 4, [3], 3],
		[2, 13, true, [3, 4], 3, [3, 4, 5], 3, [5, 6], 6, [1, 2, 3], 2],
		[2, 14, true, [4], 4, [1, 2, 3, 4, 5], 3, [6, 7], 7, [1, 2, 3], 2],
		[2, 15, true, [1, 6, 2, 3, 4], 3, [1, 2, 3, 4, 5], 2, [5, 6], 6, [1, 2, 3], 2],
		[2, 16, true, [1, 6, 2, 3, 4], 2, [1, 2, 3], 2, [6], 6, [1, 2, 3], 2],
		[2, 17, true, [1, 6, 2, 3], 1, [1, 2, 3, 4], 2, [5, 6], 6, [1, 2, 3], 2],
		[2, 18, true, [1, 6, 2, 3, 4], 2, [1, 2, 3, 4], 2, [5, 6], 6, [1, 2, 3], 2],
		[2, 19, true, [1, 6, 2, 3, 4], 2, [1, 2, 3, 4], 2, [5, 6], 6, [1, 2, 3], 2],
		[2, 20, true, [1, 6, 2, 3, 4], 3, [1, 2, 3, 4], 2, [5, 6], 6, [1, 2, 3], 2],
		[2, 21, true, [1, 6, 2, 3, 4], 2, [1, 2, 3], 2, [4], 4, [2], 2],
		[2, 22, true, [1, 6, 2, 3, 4], 3, [1, 2, 3, 4, 5], 2, [5, 6, 7], 7, [1, 2, 3], 2],
		[2, 23, true, [1, 6, 2, 3, 4], 3, [1, 2, 3, 4, 5], 2, [6, 7], 7, [1, 2, 3], 2],
		[3, 1, false, [], null, [], null, [1, 5, 6], 6, [1, 2, 3], 2],
		[3, 2, false, [], null, [], null, [1, 7], 7, [1, 2, 3], 2],
		[3, 3, false, [], null, [], null, [1, 6, 7], 6, [1, 2, 3], 2],
		[3, 4, false, [], null, [], null, [4], 4, [2], 2],
		[3, 5, false, [], null, [], null, [], null, [2], 2],
		[3, 7, false, [], null, [], null, [1, 6, 7], 6, [1, 2, 3], 2],
		[3, 8, false, [], null, [], null, [1, 4, 5], 5, [2], 2],
		[3, 9, false, [], null, [], null, [1, 4], 4, [2], 2],
		[3, 12, false, [], null, [], null, [], null, [3], 3],
		[3, 13, true, [], null, [], null, [1, 5, 6], 6, [1, 2, 3], 2],
		[3, 14, true, [], null, [], null, [1, 6, 7], 6, [1, 2, 3], 2],
		[3, 15, true, [], null, [], null, [1, 5, 6], 6, [1, 2, 3], 2],
		[3, 16, true, [], null, [], null, [1, 5, 6], 6, [1, 2, 3], 2],
		[3, 17, true, [], null, [], null, [1, 5, 6], 6, [1, 2, 3], 2],
		[3, 18, true, [], null, [], null, [1, 5, 6], 6, [1, 2, 3], 2],
		[3, 19, true, [], null, [], null, [1, 5, 6], 6, [1, 2, 3], 2],
		[3, 20, true, [], null, [], null, [1, 5, 6], 6, [1, 2, 3], 2],
		[3, 21, true, [], null, [], null, [1, 4], 4, [2], 2],
		[3, 22, true, [], null, [], null, [1, 5, 6, 7], 6, [1, 2, 3], 2],
		[3, 23, true, [], null, [], null, [1, 6, 7], 6, [1, 2, 3], 2],
		[3, 24, true, [], null, [], null, [], null, [2], 2],
		[3, 25, true, [], null, [], null, [], null, [2], 2],
	],
	kr: [
		[1, 1, false, [1, 6, 2, 3, 4], 3, [1, 2, 3, 4], 2, [1, 2, 3, 4, 5, 6, 7], 7, [], null],
		[1, 2, false, [1, 6, 2, 3], 1, [1, 2], 1, [1, 2, 3, 4, 5], 4, [], null],
		[1, 3, false, [4, 5], 4, [1, 2, 3, 4, 5], 2, [1, 2, 3, 4, 5, 6, 7], 5, [], null],
		[1, 4, false, [1, 6, 2, 3], 2, [1, 2, 3], 2, [1, 2, 3, 4], 4, [], null],
		[1, 7, false, [1, 6, 2, 3, 4], 3, [1, 2, 3, 4, 5], 2, [1, 2, 3, 4, 5, 6], 5, [], null],
		[1, 8, false, [1, 6, 2, 3], 2, [1, 2, 3], 2, [1, 2, 3, 4, 5], 4, [], null],
		[1, 39, false, [1, 6, 2, 3, 4], 2, [1, 2, 3, 4], 2, [1, 2, 3, 4, 5, 6], 5, [], null],
		[1, 10, false, [], null, [1, 2, 3], 1, [1, 2, 3, 4, 5, 6, 7], 6, [], null],
		[1, 11, false, [], null, [], null, [1, 2, 3, 4, 5, 6, 7], 6, [], null],
		[1, 12, false, [4, 5], 4, [2], 2, [4], 4, [], null],
		[1, 13, true, [3, 4, 5], 3, [3, 4, 5], 3, [1, 2, 3, 4, 5, 6], 5, [], null],
		[1, 14, true, [4, 5], 4, [1, 2, 3, 4, 5], 3, [1, 2, 3, 4, 5, 6], 5, [], null],
		[1, 15, true, [1, 6, 2, 3, 4], 3, [1, 2, 3, 4, 5], 2, [1, 2, 3, 4, 5, 6], 5, [], null],
		[1, 16, true, [1, 6, 2, 3, 4], 6, [1, 2, 3], 2, [1, 2, 3, 4], 4, [], null],
		[1, 17, true, [1, 6, 2], 1, [1, 2, 3, 4], 2, [1, 2, 3, 4, 5, 6], 4, [], null],
		[1, 18, true, [1, 6, 2, 3, 4], 2, [1, 2, 3, 4], 2, [1, 2, 3, 4, 5, 6], 5, [], null],
		[1, 19, true, [1, 6, 2, 3, 4], 2, [1, 2, 3, 4], 2, [1, 2, 3, 4, 5, 6], 5, [], null],
		[1, 20, true, [1, 6, 2, 3, 4], 3, [1, 2, 3, 4, 5], 2, [1, 2, 3, 4, 5, 6], 5, [], null],
		[1, 21, true, [1, 6, 2, 3], 2, [1, 2, 3], 2, [1, 2, 3, 4, 5, 6], 4, [], null],
		[1, 22, true, [1, 6, 2, 3, 4], 3, [1, 2, 3, 4, 5], 2, [1, 2, 3, 4, 5, 6, 7], 5, [], null],
		[1, 23, false, [1, 6, 2, 3, 4, 5], 3, [1, 2, 3, 4, 5], 2, [1, 2, 3, 4, 5, 6, 7], 6, [], null],
		[1, 9, false, [1, 6, 2, 3], 2, [1, 2, 3, 4, 5], 2, [1, 2, 3], 3, [], null],
		[2, 1, false, [1, 6, 2, 3, 4], 2, [1, 2, 3, 4], 2, [5, 6], 6, [1, 2, 3], 2],
		[2, 2, false, [1, 6, 2, 3], 1, [1, 2], 1, [7], 7, [1, 2, 3], 2],
		[2, 3, false, [4, 5], 4, [1, 2, 3, 4, 5], 2, [6, 7], 7, [1, 2, 3], 2],
		[2, 4, false, [1, 6, 2, 3], 2, [1, 2, 3], 2, [4], 4, [2], 2],
		[2, 7, false, [1, 6, 2, 3, 4], 3, [1, 2, 3, 4, 5], 2, [6, 7], 7, [1, 2, 3], 2],
		[2, 8, false, [1, 6, 2, 3], 2, [1, 2, 3], 2, [4, 5], 5, [2], 2],
		[2, 39, false, [1, 6, 2, 3, 4], 2, [1, 2, 3, 4], 2, [5, 6], 6, [1, 2, 3], 2],
		[2, 10, false, [], null, [1, 2, 3], 1, [6, 7], 7, [1, 2, 3], 2],
		[2, 11, false, [], null, [], null, [6, 7], 7, [1, 2, 3], 2],
		[2, 12, false, [4, 5], 4, [2], 2, [4], 4, [3], 3],
		[2, 13, true, [3, 4, 5], 3, [3, 4, 5], 3, [5, 6], 6, [1, 2, 3], 2],
		[2, 14, true, [4, 5], 4, [1, 2, 3, 4, 5], 3, [6, 7], 7, [1, 2, 3], 2],
		[2, 15, true, [1, 6, 2, 3, 4], 3, [1, 2, 3, 4, 5], 2, [5, 6], 6, [1, 2, 3], 2],
		[2, 16, true, [1, 6, 2, 3, 4], 6, [1, 2, 3], 2, [6], 6, [1, 2, 3], 2],
		[2, 17, true, [1, 6, 2], 1, [1, 2, 3, 4], 2, [5, 6], 6, [1, 2, 3], 2],
		[2, 18, true, [1, 6, 2, 3, 4], 2, [1, 2, 3, 4], 2, [5, 6], 6, [1, 2, 3], 2],
		[2, 19, true, [1, 6, 2, 3, 4], 2, [1, 2, 3, 4], 2, [5, 6], 6, [1, 2, 3], 2],
		[2, 20, true, [1, 6, 2, 3, 4], 3, [1, 2, 3, 4, 5], 2, [5, 6], 6, [1, 2, 3], 2],
		[2, 21, true, [1, 6, 2, 3], 2, [1, 2, 3], 2, [4], 4, [2], 2],
		[2, 22, true, [1, 6, 2, 3, 4], 3, [1, 2, 3, 4, 5], 2, [5, 6, 7], 7, [1, 2, 3], 2],
		[2, 23, true, [1, 6, 2, 3, 4, 5], 3, [1, 2, 3, 4, 5], 2, [6, 7], 7, [1, 2, 3], 2],
		[2, 9, true, [1, 6, 2, 3], 2, [1, 2, 3, 4, 5], 2, [4], 4, [2], 2],
		[3, 1, false, [], null, [], null, [1, 5, 6], 6, [1, 2, 3], 2],
		[3, 2, false, [], null, [], null, [1, 5, 6], 6, [1, 2, 3], 2],
		[3, 3, false, [], null, [], null, [1, 6, 7], 6, [1, 2, 3], 2],
		[3, 4, false, [], null, [], null, [4], 4, [2], 2],
		[3, 5, false, [], null, [], null, [], null, [2], 2],
		[3, 7, false, [], null, [], null, [1, 6, 7], 6, [1, 2, 3], 2],
		[3, 8, false, [], null, [], null, [1, 4, 5], 5, [2], 2],
		[3, 39, false, [], null, [], null, [1, 5, 6], 6, [1, 2, 3], 2],
		[3, 12, false, [], null, [], null, [], null, [3], 3],
		[3, 13, true, [], null, [], null, [1, 5, 6], 5, [1, 2, 3], 2],
		[3, 14, true, [], null, [], null, [1, 6, 7], 6, [1, 2, 3], 2],
		[3, 15, true, [], null, [], null, [1, 5, 6], 6, [1, 2, 3], 2],
		[3, 16, true, [], null, [], null, [1, 5, 6], 6, [1, 2, 3], 2],
		[3, 17, true, [], null, [], null, [1, 5, 6], 6, [1, 2, 3], 2],
		[3, 18, true, [], null, [], null, [1, 5, 6], 6, [1, 2, 3], 2],
		[3, 19, true, [], null, [], null, [1, 5, 6], 6, [1, 2, 3], 2],
		[3, 20, true, [], null, [], null, [1, 5, 6], 5, [1, 2, 3], 2],
		[3, 21, true, [], null, [], null, [1, 4], 4, [2], 2],
		[3, 22, true, [], null, [], null, [1, 5, 6, 7], 6, [1, 2, 3], 2],
		[3, 23, true, [], null, [], null, [1, 6, 7], 6, [1, 2, 3], 2],
		[3, 24, true, [], null, [], null, [], null, [2], 2],
		[3, 25, true, [], null, [], null, [], null, [2], 2],
		[3, 9, true, [], null, [], null, [1, 4], 4, [2], 2],
	],
	default: [
		[1, 33, false, [4], 4, [2], 2, [7], 7, [], null],
		[1, 23, false, [1, 6, 2, 3, 4, 5], 3, [1, 2, 3, 4, 5], 2, [1, 2, 3, 4, 5, 6, 7], 6, [], null],
		[1, 19, false, [1, 6, 2, 3, 4], 2, [1, 2, 3, 4], 2, [1, 2, 3, 4, 5, 6], 5, [], null],
		[1, 4, false, [1, 6, 2, 3], 2, [1, 2, 3], 2, [1, 2, 3, 4], 4, [], null],
		[1, 34, false, [6], 6, [1, 2, 3, 4, 5], 2, [1, 2, 3, 4, 5, 6], 6, [], null],
		[1, 7, false, [1, 6, 2, 3, 4], 3, [1, 2, 3, 4, 5], 2, [1, 2, 3, 4, 5, 6], 5, [], null],
		[1, 14, false, [4, 5], 4, [1, 2, 3, 4, 5], 3, [1, 2, 3, 4, 5, 6], 5, [], null],
		[1, 2, false, [1, 6, 2, 3], 1, [1, 2], 1, [1, 2, 3, 4, 5], 4, [], null],
		[1, 10, false, [], null, [1, 2, 3], 1, [1, 2, 3, 4, 5, 6, 7], 6, [], null],
		[1, 11, false, [], null, [], null, [1, 2, 3, 4, 5, 6, 7], 6, [], null],
		[1, 12, false, [4, 5], 4, [2], 2, [4], 4, [], null],
		[1, 1, true, [1, 6, 2, 3, 4], 2, [1, 2, 3, 4], 2, [1, 2, 3, 4, 5, 6], 5, [], null],
		[1, 8, true, [1, 6, 2, 3], 2, [1, 2, 3], 2, [1, 2, 3, 4, 5], 4, [], null],
		[1, 9, true, [1, 6, 2, 3], 2, [1, 2, 3, 4, 5], 2, [1, 2, 3], 3, [], null],
		[1, 13, true, [3, 4, 5], 3, [3, 4, 5], 3, [1, 2, 3, 4, 5, 6], 5, [], null],
		[1, 3, true, [4, 5], 4, [1, 2, 3, 4, 5], 2, [1, 2, 3, 4, 5, 6, 7], 5, [], null],
		[1, 15, true, [1, 6, 2, 3, 4], 3, [1, 2, 3, 4, 5], 2, [1, 2, 3, 4, 5, 6], 5, [], null],
		[1, 16, true, [1, 6, 2, 3, 4], 6, [1, 2, 3], 2, [1, 2, 3, 4], 4, [], null],
		[1, 17, true, [1, 6, 2], 1, [1, 2, 3, 4], 2, [1, 2, 3, 4, 5, 6], 4, [], null],
		[1, 18, true, [1, 6, 2, 3, 4], 2, [1, 2, 3, 4], 2, [1, 2, 3, 4, 5, 6], 5, [], null],
		[1, 20, true, [1, 6, 2, 3, 4], 3, [1, 2, 3, 4], 2, [1, 2, 3, 4, 5, 6], 5, [], null],
		[1, 21, true, [1, 6, 2, 3], 2, [1, 2, 3], 2, [1, 2, 3, 4, 5, 6], 4, [], null],
		[1, 22, true, [1, 6, 2, 3, 4], 3, [1, 2, 3, 4, 5], 2, [1, 2, 3, 4, 5, 6, 7], 5, [], null],
		[2, 33, false, [4], 4, [2], 2, [7], 7, [2], 2],
		[2, 23, false, [1, 6, 2, 3, 4, 5], 3, [1, 2, 3, 4, 5], 2, [6, 7], 7, [1, 2, 3], 2],
		[2, 19, false, [1, 6, 2, 3, 4], 2, [1, 2, 3, 4], 2, [5, 6], 6, [1, 2, 3], 2],
		[2, 4, false, [1, 6, 2, 3], 2, [1, 2, 3], 2, [4], 4, [2], 2],
		[2, 34, false, [6], 6, [1, 2, 3, 4, 5], 2, [6, 7], 7, [1, 2, 3], 2],
		[2, 7, false, [1, 6, 2, 3, 4], 3, [1, 2, 3, 4, 5], 2, [6, 7], 7, [1, 2, 3], 2],
		[2, 14, false, [4, 5], 4, [1, 2, 3, 4, 5], 3, [6, 7], 7, [1, 2, 3], 2],
		[2, 2, false, [1, 6, 2, 3], 1, [1, 2], 1, [7], 7, [1, 2, 3], 2],
		[2, 10, false, [], null, [1, 2, 3], 1, [6, 7], 7, [1, 2, 3], 2],
		[2, 11, false, [], null, [], null, [6, 7], 7, [1, 2, 3], 2],
		[2, 12, false, [4, 5], 4, [2], 2, [4], 4, [3], 3],
		[2, 1, true, [1, 6, 2, 3, 4], 2, [1, 2, 3, 4], 2, [5, 6], 6, [1, 2, 3], 2],
		[2, 8, true, [1, 6, 2, 3], 2, [1, 2, 3], 2, [4, 5], 5, [2], 2],
		[2, 9, true, [1, 6, 2, 3], 2, [1, 2, 3, 4, 5], 2, [4], 4, [2], 2],
		[2, 13, true, [3, 4, 5], 3, [3, 4, 5], 3, [5, 6], 6, [1, 2, 3], 2],
		[2, 3, true, [4, 5], 4, [1, 2, 3, 4, 5], 2, [6, 7], 7, [1, 2, 3], 2],
		[2, 15, true, [1, 6, 2, 3, 4], 3, [1, 2, 3, 4, 5], 2, [5, 6], 6, [1, 2, 3], 2],
		[2, 16, true, [1, 6, 2, 3, 4], 6, [1, 2, 3], 2, [6], 6, [1, 2, 3], 2],
		[2, 17, true, [1, 6, 2], 1, [1, 2, 3, 4], 2, [5, 6], 6, [1, 2, 3], 2],
		[2, 18, true, [1, 6, 2, 3, 4], 2, [1, 2, 3, 4], 2, [5, 6], 6, [1, 2, 3], 2],
		[2, 20, true, [1, 6, 2, 3, 4], 3, [1, 2, 3, 4], 2, [5, 6], 6, [1, 2, 3], 2],
		[2, 21, true, [1, 6, 2, 3], 2, [1, 2, 3], 2, [4], 4, [2], 2],
		[2, 22, true, [1, 6, 2, 3, 4], 3, [1, 2, 3, 4, 5], 2, [5, 6, 7], 7, [1, 2, 3], 2],
		[3, 33, false, [], null, [], null, [7], 7, [2], 2],
		[3, 23, false, [], null, [], null, [1, 6, 7], 6, [1, 2, 3], 2],
		[3, 19, false, [], null, [], null, [1, 5, 6], 6, [1, 2, 3], 2],
		[3, 4, false, [], null, [], null, [4], 4, [2], 2],
		[3, 34, false, [], null, [], null, [1, 6, 7], 6, [1, 2, 3], 2],
		[3, 7, false, [], null, [], null, [1, 6, 7], 6, [1, 2, 3], 2],
		[3, 14, false, [], null, [], null, [1, 6, 7], 6, [1, 2, 3], 2],
		[3, 2, false, [], null, [], null, [1, 5, 6], 6, [1, 2, 3], 2],
		[3, 12, false, [], null, [], null, [], null, [3], 3],
		[3, 1, true, [], null, [], null, [1, 5, 6], 6, [1, 2, 3], 2],
		[3, 5, true, [], null, [], null, [], null, [2], 2],
		[3, 8, true, [], null, [], null, [1, 4, 5], 5, [2], 2],
		[3, 9, true, [], null, [], null, [1, 4], 4, [2], 2],
		[3, 13, true, [], null, [], null, [1, 5, 6], 5, [1, 2, 3], 2],
		[3, 3, true, [], null, [], null, [1, 6, 7], 6, [1, 2, 3], 2],
		[3, 15, true, [], null, [], null, [1, 5, 6], 6, [1, 2, 3], 2],
		[3, 16, true, [], null, [], null, [1, 5, 6], 6, [1, 2, 3], 2],
		[3, 17, true, [], null, [], null, [1, 5, 6], 6, [1, 2, 3], 2],
		[3, 18, true, [], null, [], null, [1, 5, 6], 6, [1, 2, 3], 2],
		[3, 20, true, [], null, [], null, [1, 5, 6], 5, [1, 2, 3], 2],
		[3, 21, true, [], null, [], null, [1, 4], 4, [2], 2],
		[3, 22, true, [], null, [], null, [1, 5, 6, 7], 6, [1, 2, 3], 2],
		[3, 24, true, [], null, [], null, [], null, [2], 2],
		[3, 25, true, [], null, [], null, [], null, [2], 2],
	],
};

const DRYING_LEVEL_TO_DP: Readonly<Record<number, number>> = { 1: 2, 2: 1, 3: 3 };
const ALLOWED_INPUT_KEYS = new Set(["mode", "program", "temperatureLevel", "rinse", "spinLevel", "dryingLevel"]);

export interface ZeoOneProgramCapability {
	mode: Mode;
	program: number;
	isInApp: boolean;
	temperatureLevels: readonly number[];
	defaultTemperatureLevel: number | null;
	rinseLevels: readonly number[];
	defaultRinseLevel: number | null;
	spinLevels: readonly number[];
	defaultSpinLevel: number | null;
	dryingLevels: readonly number[];
	defaultDryingLevel: number | null;
}

function capabilities(rows: readonly RawProgram[]): readonly ZeoOneProgramCapability[] {
	return rows.map((row) => ({
		mode: row[0], program: row[1], isInApp: row[2],
		temperatureLevels: row[3], defaultTemperatureLevel: row[4],
		rinseLevels: row[5], defaultRinseLevel: row[6],
		spinLevels: row[7], defaultSpinLevel: row[8],
		dryingLevels: row[9], defaultDryingLevel: row[10],
	}));
}

export const zeoOneProgramCatalog: Readonly<Record<Region, readonly ZeoOneProgramCapability[]>> = {
	jp: capabilities(PROGRAMS.jp), tw: capabilities(PROGRAMS.tw),
	kr: capabilities(PROGRAMS.kr), default: capabilities(PROGRAMS.default),
};

function selectRegion(location: string | undefined): Region {
	if (location === "jp" || location === "tw" || location === "kr") return location;
	return "default";
}

/** Return the original chart capabilities for the app's selected region. */
export function getZeoOneProgramCatalog(location?: string): readonly ZeoOneProgramCapability[] {
	return zeoOneProgramCatalog[selectRegion(location)];
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}

function optionValue(
	input: Record<string, unknown>,
	key: string,
	supported: readonly number[],
	defaultValue: number | null,
	translate: (value: number) => number = (value) => value,
): number | undefined {
	const value = input[key];
	if (value === undefined) return defaultValue === null ? undefined : translate(defaultValue);
	if (typeof value !== "number" || !Number.isInteger(value) || !supported.includes(value)) {
		throw new Error("Unsupported Zeo One program option: " + key);
	}
	return translate(value);
}

/**
 * Build the original AppPlugin SaveCloudProgram batch for a supported a102
 * program. Omitted options use chart defaults; chart defaults of null are
 * omitted. dryingLevel is a chart level (1..3), translated to the DP value.
 */
export function buildZeoOneSavedProgram(input: unknown, location?: string): Record<string, number> {
	if (!isRecord(input)) throw new Error("Zeo One program input must be an object");
	for (const key of Object.keys(input)) {
		if (!ALLOWED_INPUT_KEYS.has(key)) throw new Error("Unknown Zeo One program field: " + key);
	}

	const mode = input.mode;
	const program = input.program;
	if ((mode !== 1 && mode !== 2 && mode !== 3) || typeof program !== "number" || !Number.isInteger(program)) {
		throw new Error("Invalid Zeo One program mode or number");
	}

	const capability = zeoOneProgramCatalog[selectRegion(location)].find(
		(entry) => entry.mode === mode && entry.program === program,
	);
	if (!capability) throw new Error("Unsupported Zeo One program for mode and region");

	const options = [
		{
			key: "temperatureLevel",
			dp: "207",
			supported: capability.temperatureLevels,
			defaultValue: capability.defaultTemperatureLevel,
		},
		{ key: "rinse", dp: "208", supported: capability.rinseLevels, defaultValue: capability.defaultRinseLevel },
		{ key: "spinLevel", dp: "209", supported: capability.spinLevels, defaultValue: capability.defaultSpinLevel },
		{
			key: "dryingLevel",
			dp: "210",
			supported: capability.dryingLevels,
			defaultValue: capability.defaultDryingLevel,
			translate: (value: number) => DRYING_LEVEL_TO_DP[value],
		},
	];

	const payload: Record<string, number> = { "204": mode, "205": program };
	for (const option of options) {
		const value = optionValue(input, option.key, option.supported, option.defaultValue, option.translate);
		if (value !== undefined) payload[option.dp] = value;
	}
	payload["221"] = 1;
	return payload;
}
