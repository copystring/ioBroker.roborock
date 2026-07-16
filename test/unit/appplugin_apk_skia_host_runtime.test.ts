import { describe, expect, it } from "vitest";

import { ApkSkiaHostRuntime } from "../../src/apppluginHost/apkSkiaHostRuntime";

describe("APK Skia JSI host runtime", () => {
	it("preserves factories, object identity, methods, plain values and bytes across handles", async () => {
		class PathLike {
			public points: number[] = [];
			public add(value: number): PathLike {
				this.points.push(value);
				return this;
			}
		}
		const path = new PathLike();
		const runtime = new ApkSkiaHostRuntime({
			Path: { Make: () => path },
			BlendMode: { SrcOver: 3 },
			bytes: () => Uint8Array.from([1, 2, 3]),
		}, {
			setJsiProperty: (_viewId: number, _property: string, _value: unknown) => true,
		});

		const pathFactory = await runtime.invoke("get", 1, "Path", []);
		expect(pathFactory).toMatchObject({ $apkType: "skiaRef" });
		const make = await runtime.invoke("get", (pathFactory as { id: number }).id, "Make", []);
		const firstPath = await runtime.invoke("apply", (make as { id: number }).id, "", []);
		const secondPath = await runtime.invoke("apply", (make as { id: number }).id, "", []);
		expect(secondPath).toEqual(firstPath);

		const add = await runtime.invoke("get", (firstPath as { id: number }).id, "add", []);
		const chained = await runtime.invoke("apply", (add as { id: number }).id, "", [7]);
		expect(chained).toEqual(firstPath);
		expect(path.points).toEqual([7]);

		expect(await runtime.invoke("get", 1, "BlendMode", [])).toEqual({ SrcOver: 3 });
		const bytesFunction = await runtime.invoke("get", 1, "bytes", []);
		expect(await runtime.invoke("apply", (bytesFunction as { id: number }).id, "", [])).toEqual(
			Buffer.from([1, 2, 3]),
		);
	});

	it("fails closed for unknown handles and invalid operations", async () => {
		const runtime = new ApkSkiaHostRuntime({}, {});
		await expect(runtime.invoke("get", 99, "Path", [])).rejects.toThrow("Unbekannte Skia-Handle-ID");
		await expect(runtime.invoke("apply", 1, "", [])).rejects.toThrow("ist nicht aufrufbar");
		await expect(runtime.invoke("set", 1, "x", [])).rejects.toThrow("genau einen Wert");
	});
});
