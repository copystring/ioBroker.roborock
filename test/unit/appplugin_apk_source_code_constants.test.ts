import { describe, expect, it } from "vitest";

import { createApkSourceCodeConstants } from "../../src/apppluginHost/apkSourceCodeConstants";

describe("APK SourceCode constants", () => {
	it("exposes the loaded bundle URL exactly like APK SourceCodeModule", () => {
		const scriptUrl = "file:///plugin/index.android.bundle";
		expect(createApkSourceCodeConstants(scriptUrl)).toEqual({
			SourceCode: { scriptURL: scriptUrl },
		});
	});

	it("rejects values that cannot represent a loaded React source", () => {
		expect(() => createApkSourceCodeConstants("")).toThrow(/nicht leer/u);
		expect(() => createApkSourceCodeConstants("index.android.bundle")).toThrow(/absolute URL/u);
		expect(() => createApkSourceCodeConstants("data:text/javascript,0")).toThrow(/Protokoll/u);
	});
});
