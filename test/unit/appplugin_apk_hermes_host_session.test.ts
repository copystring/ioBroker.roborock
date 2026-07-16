import { describe, expect, it } from "vitest";

import { ApkHermesJsonLineDecoder } from "../../src/apppluginHost/apkHermesHostSession";

describe("APK Hermes host session framing", () => {
	it("preserves UTF-8 and JSONL boundaries across arbitrary chunks", () => {
		const decoder = new ApkHermesJsonLineDecoder(1024);
		const encoded = Buffer.from('{"text":"Küche"}\r\n{"value":2}\n', "utf8");
		const split = encoded.indexOf(Buffer.from("ü")) + 1;

		expect(decoder.push(encoded.subarray(0, split))).toEqual([]);
		expect(decoder.push(encoded.subarray(split))).toEqual([
			'{"text":"Küche"}',
			'{"value":2}',
		]);
		expect(decoder.finish()).toEqual([]);
	});

	it("rejects an oversized protocol line even when it arrives in chunks", () => {
		const decoder = new ApkHermesJsonLineDecoder(5);
		expect(decoder.push(Buffer.from("123"))).toEqual([]);
		expect(() => decoder.push(Buffer.from("456"))).toThrow(/überschreitet 5 Bytes/u);
	});

	it("returns a final non-empty line when the stream closes without LF", () => {
		const decoder = new ApkHermesJsonLineDecoder(32);
		decoder.push(Buffer.from("final"));
		expect(decoder.finish()).toEqual(["final"]);
	});
});
