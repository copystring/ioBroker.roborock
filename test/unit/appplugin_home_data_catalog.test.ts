import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";

import { describe, expect, it } from "vitest";

import {
	matchAppPluginHomeDataRecord,
	parseAppPluginHomeDataCapture,
	readAppPluginHomeDataCatalog,
} from "../../scripts/lib/appPluginHomeDataCatalog";

describe("sanitierter APK-HomeData-Katalog", () => {
	it("verknüpft Produkt und Gerät, ohne Identität, Schlüssel oder Zustände zu übernehmen", () => {
		const capture = [
			"[BODY] not-json",
			`[BODY] ${JSON.stringify({
				data: {
					products: [{
						id: "product-a70",
						name: "S8 Pro Ultra",
						model: "roborock.vacuum.a70",
					}],
					devices: [{
						productId: "product-a70",
						duid: "secret-device-id",
						sn: "secret-serial",
						localKey: "secret-local-key",
						featureSet: "2247395306799103",
						newFeatureSet: "00000048009EFFFE",
						fv: "02.20.30",
						pv: "1.0",
						deviceStatus: { 121: 8 },
					}],
				},
			})}`,
		].join("\n");

		const records = parseAppPluginHomeDataCapture(capture);

		expect(records).toEqual([{
			name: "S8 Pro Ultra",
			model: "roborock.vacuum.a70",
			featureSet: "2247395306799103",
			newFeatureSet: "00000048009EFFFE",
			firmwareVersion: "02.20.30",
			protocolVersion: "1.0",
		}]);
		expect(JSON.stringify(records)).not.toContain("secret");
		expect(JSON.stringify(records)).not.toContain("deviceStatus");
	});

	it("ordnet nur einen eindeutigen exakten Produktnamen zu", () => {
		const records = [
			{ name: "Roborock Saros 10", model: "roborock.vacuum.a147" },
			{ name: "Saros 10R", model: "roborock.vacuum.a148" },
		];
		expect(matchAppPluginHomeDataRecord(["Saros 10"], records)?.model)
			.toBe("roborock.vacuum.a147");
		expect(matchAppPluginHomeDataRecord(["Saros"], records)).toBeUndefined();
		expect(matchAppPluginHomeDataRecord(["Saros 10", "Saros 10R"], records)).toBeUndefined();
	});

	it("erkennt die UTF-16LE-Kodierung originaler Windows-Aufnahmen", () => {
		const root = fs.mkdtempSync(path.join(os.tmpdir(), "appplugin-home-data-"));
		const capturePath = path.join(root, "capture.txt");
		const capture = `[BODY] ${JSON.stringify({
			products: [{ id: "p1", name: "Saros 10", model: "roborock.vacuum.a147" }],
		})}\n`;
		fs.writeFileSync(capturePath, Buffer.concat([
			Buffer.from([0xff, 0xfe]),
			Buffer.from(capture, "utf16le"),
		]));
		try {
			expect(readAppPluginHomeDataCatalog([capturePath])).toEqual([{
				name: "Saros 10",
				model: "roborock.vacuum.a147",
			}]);
		} finally {
			fs.rmSync(root, { recursive: true, force: true });
		}
	});
});
