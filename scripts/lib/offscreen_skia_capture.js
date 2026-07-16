const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const { createCanvas, ImageData } = require("@napi-rs/canvas");
const { createDiscoverySkiaApi } = require("./discovery_skia_api.js");

function copyBytes(value) {
	if (Buffer.isBuffer(value)) return Buffer.from(value);
	if (ArrayBuffer.isView(value)) {
		return Buffer.from(value.buffer, value.byteOffset, value.byteLength);
	}
	if (value instanceof ArrayBuffer) return Buffer.from(value);
	return Buffer.from(Array.from(value ?? []));
}

function normalizeRgba(bytes, width, height, rowBytes) {
	const packedRowBytes = width * 4;
	const sourceRowBytes = Number(rowBytes) || packedRowBytes;
	if (bytes.length < sourceRowBytes * height) {
		throw new Error(`Skia image payload is too short: ${bytes.length} < ${sourceRowBytes * height}`);
	}
	if (sourceRowBytes === packedRowBytes) {
		return Buffer.from(bytes.subarray(0, packedRowBytes * height));
	}
	const packed = Buffer.allocUnsafe(packedRowBytes * height);
	for (let row = 0; row < height; row++) {
		bytes.copy(packed, row * packedRowBytes, row * sourceRowBytes, row * sourceRowBytes + packedRowBytes);
	}
	return packed;
}

function encodeRgbaPng(image, outputPath) {
	const canvas = createCanvas(image.width, image.height);
	const context = canvas.getContext("2d");
	const rgba = new Uint8ClampedArray(
		image.rgba.buffer,
		image.rgba.byteOffset,
		image.rgba.byteLength
	);
	context.putImageData(new ImageData(rgba, image.width, image.height), 0, 0);
	fs.mkdirSync(path.dirname(outputPath), { recursive: true });
	fs.writeFileSync(outputPath, canvas.toBuffer("image/png"));
}

function createOffscreenSkiaCapture(calls = []) {
	const discovery = createDiscoverySkiaApi(calls);
	const capturedImages = [];
	const capturedHashes = new Set();
	const dataApi = Object.create(discovery.Data);
	const imageApi = Object.create(discovery.Image);

	Object.defineProperty(dataApi, "fromBytes", {
		value(value) {
			calls.push({ capability: "SkiaApi.Data.fromBytes", args: [`[bytes:${value?.byteLength ?? value?.length ?? 0}]`] });
			return {
				bytes: copyBytes(value),
				dispose() {
					calls.push({ capability: "SkiaApi.Data.fromBytes().dispose", args: [] });
				}
			};
		}
	});

	Object.defineProperty(imageApi, "MakeImage", {
		value(info, data, rowBytes) {
			const width = Number(info?.width);
			const height = Number(info?.height);
			if (!Number.isInteger(width) || width <= 0 || !Number.isInteger(height) || height <= 0) {
				throw new Error(`Invalid Skia image dimensions: ${String(info?.width)}x${String(info?.height)}`);
			}
			const rgba = normalizeRgba(copyBytes(data?.bytes ?? data), width, height, rowBytes);
			const sha256 = crypto.createHash("sha256").update(rgba).digest("hex");
			calls.push({ capability: "SkiaApi.Image.MakeImage", args: [width, height, Number(rowBytes) || width * 4] });
			if (!capturedHashes.has(sha256)) {
				capturedHashes.add(sha256);
				capturedImages.push({ width, height, rowBytes: Number(rowBytes) || width * 4, rgba, sha256 });
			}
			return {
				width: () => width,
				height: () => height,
				dispose() {
					calls.push({ capability: "SkiaApi.Image.MakeImage().dispose", args: [] });
				}
			};
		}
	});

	const api = new Proxy(discovery, {
		get(target, property, receiver) {
			if (property === "Data") return dataApi;
			if (property === "Image") return imageApi;
			return Reflect.get(target, property, receiver);
		}
	});

	return {
		api,
		get images() {
			return capturedImages.map(({ rgba, ...metadata }) => ({ ...metadata, byteLength: rgba.length }));
		},
		exportFirstPng(outputPath) {
			if (!capturedImages.length) return undefined;
			const absoluteOutputPath = path.resolve(outputPath);
			encodeRgbaPng(capturedImages[0], absoluteOutputPath);
			return {
				outputPath: absoluteOutputPath,
				width: capturedImages[0].width,
				height: capturedImages[0].height,
				sha256: capturedImages[0].sha256,
				pngSha256: crypto.createHash("sha256").update(fs.readFileSync(absoluteOutputPath)).digest("hex")
			};
		}
	};
}

module.exports = {
	createOffscreenSkiaCapture,
	encodeRgbaPng,
	normalizeRgba
};
