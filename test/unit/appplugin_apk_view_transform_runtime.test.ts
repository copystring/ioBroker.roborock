import { describe, expect, it } from "vitest";

import { createApkViewAffineTransform } from "../../src/apppluginHost";

describe("APK view transform runtime", () => {
	it("applies Android's default center pivot to APK rotations", () => {
		const matrix = createApkViewAffineTransform([{ rotate: "-90deg" }], 80, 80);
		expect(matrix).toEqual({ a: 0, b: -1, c: 1, d: 0, tx: 0, ty: 80 });
	});

	it("keeps APK translation values in logical coordinates", () => {
		expect(createApkViewAffineTransform(
			[{ translateX: -24 }, { translateY: -12 }],
			55,
			55,
		)).toEqual({ a: 1, b: 0, c: 0, d: 1, tx: -24, ty: -12 });
	});

	it("preserves TransformHelper multiplication order", () => {
		const matrix = createApkViewAffineTransform(
			[{ translateX: 10 }, { rotate: "90deg" }],
			100,
			100,
		);
		expect(matrix).toEqual({ a: 0, b: 1, c: -1, d: 0, tx: 110, ty: 0 });
	});

	it("supports numeric and percentage transform origins", () => {
		expect(createApkViewAffineTransform([{ rotate: "90deg" }], 100, 80, [0, 0]))
			.toEqual({ a: 0, b: 1, c: -1, d: 0, tx: 0, ty: 0 });
		const percentage = createApkViewAffineTransform(
			[{ rotate: "180deg" }],
			100,
			80,
			["25%", "75%", 0],
		);
		expect(percentage).toMatchObject({ a: -1, b: 0, d: -1, tx: 50, ty: 120 });
		expect(percentage?.c).toBeCloseTo(0, 12);
	});

	it("accepts APK 2D matrices and rejects unimplemented decomposition or projection", () => {
		const matrix = [
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			12, 7, 0, 1,
		];
		expect(createApkViewAffineTransform(matrix, 10, 10))
			.toEqual({ a: 1, b: 0, c: 0, d: 1, tx: 12, ty: 7 });
		expect(() => createApkViewAffineTransform([{ skewX: "20deg" }], 10, 10))
			.toThrow(/Matrixzerlegung/u);
		expect(() => createApkViewAffineTransform([{ perspective: 500 }], 10, 10))
			.toThrow(/3D-Projektion/u);
		expect(() => createApkViewAffineTransform([{ rotateX: "20deg" }], 10, 10))
			.toThrow(/3D-Projektion/u);
	});
});
