import type { ApkUiAffineTransform } from "./apkUiHitTestRuntime";

interface Point {
	x: number;
	y: number;
}

const identity: Readonly<ApkUiAffineTransform> = Object.freeze({
	a: 1,
	b: 0,
	c: 0,
	d: 1,
	tx: 0,
	ty: 0,
});

function finiteNumber(value: unknown, context: string): number {
	if (typeof value !== "number" || !Number.isFinite(value)) {
		throw new Error(`${context} muss eine endliche Zahl sein`);
	}
	return value;
}

function multiply(
	left: Readonly<ApkUiAffineTransform>,
	right: Readonly<ApkUiAffineTransform>,
): ApkUiAffineTransform {
	return {
		a: left.a * right.a + left.c * right.b,
		b: left.b * right.a + left.d * right.b,
		c: left.a * right.c + left.c * right.d,
		d: left.b * right.c + left.d * right.d,
		tx: left.a * right.tx + left.c * right.ty + left.tx,
		ty: left.b * right.tx + left.d * right.ty + left.ty,
	};
}

function translation(x: number, y: number): ApkUiAffineTransform {
	return { a: 1, b: 0, c: 0, d: 1, tx: x, ty: y };
}

function rotation(radians: number): ApkUiAffineTransform {
	const cosine = Math.cos(radians);
	const sine = Math.sin(radians);
	return { a: cosine, b: sine, c: -sine, d: cosine, tx: 0, ty: 0 };
}

function scale(x: number, y: number): ApkUiAffineTransform {
	return { a: x, b: 0, c: 0, d: y, tx: 0, ty: 0 };
}

function planarHalfTurnProjection(
	radians: number,
	axis: "X" | "Y",
	context: string,
): ApkUiAffineTransform {
	const cosine = Math.cos(radians);
	const sine = Math.sin(radians);
	if (Math.abs(sine) > 1e-12 || Math.abs(Math.abs(cosine) - 1) > 1e-12) {
		throw new Error(`${context} benötigt für diesen Winkel die noch nicht nachgebildete APK-3D-Projektion`);
	}
	// Androids 4x4-Transformation verliert bei ganzzahligen halben Drehungen
	// keine Tiefeninformation: rotateY(180deg) ist exakt scaleX(-1),
	// rotateX(180deg) entsprechend scaleY(-1). Das Q7-AppPlugin nutzt
	// rotateY(180deg) für seine belegte RTL-Spiegelung.
	return axis === "Y" ? scale(cosine, 1) : scale(1, cosine);
}

function angle(value: unknown, context: string): number {
	if (typeof value === "number") return finiteNumber(value, context);
	if (typeof value !== "string") throw new Error(`${context} muss eine Winkelangabe sein`);
	const match = /^([+-]?(?:\d+(?:\.\d+)?|\.\d+))(deg|rad)?$/u.exec(value.trim());
	if (!match) throw new Error(`${context} besitzt keine APK-kompatible Winkelangabe: ${value}`);
	const number = Number(match[1]);
	return match[2] === "deg" ? number * Math.PI / 180 : number;
}

function matrixFromArray(value: unknown, context: string): ApkUiAffineTransform {
	if (!Array.isArray(value) || value.length !== 16) {
		throw new Error(`${context} benötigt die 16 Werte der APK-4x4-Matrix`);
	}
	const matrix = value.map((entry, index) => finiteNumber(entry, `${context}[${index}]`));
	const expected2d = new Map<number, number>([
		[2, 0], [3, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 1], [11, 0], [14, 0], [15, 1],
	]);
	for (const [index, expected] of expected2d) {
		if (matrix[index] !== expected) {
			throw new Error(`${context} enthält eine noch nicht 2D-kompatible APK-Transformation`);
		}
	}
	return {
		a: matrix[0],
		b: matrix[1],
		c: matrix[4],
		d: matrix[5],
		tx: matrix[12],
		ty: matrix[13],
	};
}

function transformOperation(value: unknown, index: number): ApkUiAffineTransform {
	if (typeof value !== "object" || value === null || Array.isArray(value)) {
		throw new Error(`transform[${index}] muss ein einzelnes Transform-Objekt sein`);
	}
	const entries = Object.entries(value as Record<string, unknown>);
	if (entries.length !== 1) throw new Error(`transform[${index}] benötigt genau eine Transform-Art`);
	const [kind, raw] = entries[0];
	switch (kind) {
		case "matrix": return matrixFromArray(raw, `transform[${index}].matrix`);
		case "rotate":
		case "rotateZ": return rotation(angle(raw, `transform[${index}].${kind}`));
		case "scale": {
			const factor = finiteNumber(raw, `transform[${index}].scale`);
			return scale(factor, factor);
		}
		case "scaleX": return scale(finiteNumber(raw, `transform[${index}].scaleX`), 1);
		case "scaleY": return scale(1, finiteNumber(raw, `transform[${index}].scaleY`));
		case "translateX": return translation(finiteNumber(raw, `transform[${index}].translateX`), 0);
		case "translateY": return translation(0, finiteNumber(raw, `transform[${index}].translateY`));
		case "translate": {
			if (!Array.isArray(raw) || raw.length < 1 || raw.length > 3) {
				throw new Error(`transform[${index}].translate benötigt ein Array mit bis zu drei Werten`);
			}
			const x = finiteNumber(raw[0] ?? 0, `transform[${index}].translate[0]`);
			const y = finiteNumber(raw[1] ?? 0, `transform[${index}].translate[1]`);
			const z = finiteNumber(raw[2] ?? 0, `transform[${index}].translate[2]`);
			if (z !== 0) throw new Error("3D-Translation benötigt die noch nicht nachgebildete APK-Projektion");
			return translation(x, y);
		}
		case "skewX":
		case "skewY":
			throw new Error(`${kind} benötigt die noch nicht vollständig nachgebildete APK-Matrixzerlegung`);
		case "rotateX": return planarHalfTurnProjection(
			angle(raw, `transform[${index}].rotateX`),
			"X",
			`rotateX in transform[${index}]`,
		);
		case "rotateY": return planarHalfTurnProjection(
			angle(raw, `transform[${index}].rotateY`),
			"Y",
			`rotateY in transform[${index}]`,
		);
		case "perspective":
			throw new Error(`${kind} benötigt die noch nicht nachgebildete APK-3D-Projektion`);
		default:
			throw new Error(`Unbekannte APK-Transform-Art: ${kind}`);
	}
}

function originPart(value: unknown, axisLength: number, context: string): number {
	if (typeof value === "number") return finiteNumber(value, context);
	if (typeof value === "string") {
		const match = /^([+-]?(?:\d+(?:\.\d+)?|\.\d+))%$/u.exec(value.trim());
		if (match) return axisLength * Number(match[1]) / 100;
	}
	throw new Error(`${context} muss eine Zahl oder Prozentangabe sein`);
}

function transformOrigin(value: unknown, width: number, height: number): Point {
	if (value === undefined || value === null) return { x: width / 2, y: height / 2 };
	if (!Array.isArray(value) || value.length < 1 || value.length > 3) {
		throw new Error("transformOrigin benötigt ein Array mit bis zu drei Werten");
	}
	const x = originPart(value[0] ?? width / 2, width, "transformOrigin[0]");
	const y = originPart(value[1] ?? height / 2, height, "transformOrigin[1]");
	const z = finiteNumber(value[2] ?? 0, "transformOrigin[2]");
	if (z !== 0) throw new Error("transformOrigin-Z benötigt die noch nicht nachgebildete APK-3D-Projektion");
	return { x, y };
}

function close(value: number, expected: number): boolean {
	return Math.abs(value - expected) <= 1e-12;
}

function normalizeNumber(value: number): number {
	const nearestInteger = Math.round(value);
	if (close(value, nearestInteger)) return nearestInteger;
	return value;
}

function normalize(matrix: ApkUiAffineTransform): ApkUiAffineTransform {
	return Object.fromEntries(Object.entries(matrix).map(([key, value]) => [
		key,
		normalizeNumber(value),
	])) as unknown as ApkUiAffineTransform;
}

function assertAndroid2dRepresentable(matrix: Readonly<ApkUiAffineTransform>): void {
	const columnDotProduct = matrix.a * matrix.c + matrix.b * matrix.d;
	const magnitude = Math.max(
		1,
		Math.hypot(matrix.a, matrix.b) * Math.hypot(matrix.c, matrix.d),
	);
	if (Math.abs(columnDotProduct) > 1e-10 * magnitude) {
		throw new Error(
			"Die Transform-Kombination erzeugt Skew und benötigt die noch nicht vollständig nachgebildete APK-Matrixzerlegung",
		);
	}
}

/**
 * Reproduces the APK's 2D TransformHelper order and Android View pivot. Values
 * stay in React Native's density-independent coordinate space. 3D and matrix
 * combinations whose Android decomposition would discard skew remain gates.
 */
export function createApkViewAffineTransform(
	transform: unknown,
	width: number,
	height: number,
	origin?: unknown,
): Readonly<ApkUiAffineTransform> | undefined {
	finiteNumber(width, "Transformbreite");
	finiteNumber(height, "Transformhöhe");
	if (transform === undefined || transform === null) return undefined;
	let combined: ApkUiAffineTransform = { ...identity };
	if (Array.isArray(transform) && transform.length === 16 && typeof transform[0] === "number") {
		combined = matrixFromArray(transform, "transform");
	} else {
		if (!Array.isArray(transform)) throw new Error("transform muss ein APK-Transform-Array sein");
		for (const [index, operation] of transform.entries()) {
			combined = multiply(combined, transformOperation(operation, index));
		}
	}
	assertAndroid2dRepresentable(combined);
	const pivot = transformOrigin(origin, width, height);
	const aroundPivot = multiply(
		multiply(translation(pivot.x, pivot.y), combined),
		translation(-pivot.x, -pivot.y),
	);
	return Object.freeze(normalize(aroundPivot));
}
