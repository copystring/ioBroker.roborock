const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const JSZip = require("jszip");
const {
	HERMES_MAGIC,
	findBundleFiles,
	runBundleMatrix
} = require("./appplugin_bundle_inventory.js");

const MAP_SIGNATURES = Object.freeze({
	yxHomeMapContentView: ["YXHomeMapContentView"],
	yxMapModel: ["YXMapDrawLevel", "YXMap"],
	yxDrawMapImage: ["DrawMapImg"],
	yxRgbaImage: ["makeImageData", "mapHexStr"],
	roomPalette: ["roomColors"],
	skiaNativeModule: ["RNSkiaModule", "SkiaApi"],
	canvasKit: ["CanvasKit"],
	scMapProtobuf: ["SCMap.RobotMap", "MapDataInfo", "mapVersion"],
	tanos: ["Tanos"],
	rrArMapView: ["RRARMapViewManager"],
	rr3dMapView: ["RR3DMapViewManager"],
	mapControlOperation: ["MapCtrlOperation"]
});

const FAMILY_LABELS = Object.freeze({
	"yx-skia": "YX/Skia (Plugin-Renderer)",
	"scmap-skia": "SCMap-Protobuf/Skia",
	"tanos-native-skia": "Tanos Native AR/3D + Skia",
	"tanos-native": "Tanos Native AR/3D",
	"skia-unresolved": "Skia, Vertrag noch ungeklärt",
	"native-map-unresolved": "Native Kartenansicht, Vertrag noch ungeklärt",
	unresolved: "Noch nicht klassifiziert"
});

function sha256(buffer) {
	return crypto.createHash("sha256").update(buffer).digest("hex");
}

function normalizeRelative(root, absolutePath) {
	return path.relative(root, absolutePath).split(path.sep).join("/");
}

function enabledMarkerNames(markers, allowlist = Object.keys(markers)) {
	return allowlist.filter(name => markers[name]);
}

function classifyMapFamily(markers) {
	if (markers.yxHomeMapContentView || (markers.yxMapModel && markers.yxDrawMapImage)) {
		return {
			id: "yx-skia",
			label: FAMILY_LABELS["yx-skia"],
			evidence: enabledMarkerNames(markers, [
				"yxHomeMapContentView",
				"yxMapModel",
				"yxDrawMapImage",
				"yxRgbaImage",
				"roomPalette",
				"skiaNativeModule",
				"canvasKit",
				"mapControlOperation"
			])
		};
	}
	if (markers.scMapProtobuf && markers.skiaNativeModule) {
		return {
			id: "scmap-skia",
			label: FAMILY_LABELS["scmap-skia"],
			evidence: enabledMarkerNames(markers, [
				"scMapProtobuf",
				"roomPalette",
				"skiaNativeModule",
				"canvasKit"
			])
		};
	}
	if (markers.tanos && markers.rrArMapView && markers.rr3dMapView && markers.skiaNativeModule) {
		return {
			id: "tanos-native-skia",
			label: FAMILY_LABELS["tanos-native-skia"],
			evidence: enabledMarkerNames(markers, [
				"tanos",
				"rrArMapView",
				"rr3dMapView",
				"skiaNativeModule",
				"canvasKit"
			])
		};
	}
	if (markers.tanos && markers.rrArMapView && markers.rr3dMapView) {
		return {
			id: "tanos-native",
			label: FAMILY_LABELS["tanos-native"],
			evidence: enabledMarkerNames(markers, ["tanos", "rrArMapView", "rr3dMapView"])
		};
	}
	if (markers.skiaNativeModule) {
		return {
			id: "skia-unresolved",
			label: FAMILY_LABELS["skia-unresolved"],
			evidence: enabledMarkerNames(markers)
		};
	}
	if (markers.rrArMapView || markers.rr3dMapView) {
		return {
			id: "native-map-unresolved",
			label: FAMILY_LABELS["native-map-unresolved"],
			evidence: enabledMarkerNames(markers)
		};
	}
	return {
		id: "unresolved",
		label: FAMILY_LABELS.unresolved,
		evidence: enabledMarkerNames(markers)
	};
}

function inspectBundleBuffer(buffer) {
	let format = "unknown";
	if (buffer.subarray(0, HERMES_MAGIC.length).equals(HERMES_MAGIC)) {
		format = "hermes";
	} else if (/^\s*(?:var|global|__d\()/u.test(buffer.subarray(0, 256).toString("utf8"))) {
		format = "metro";
	}

	const markers = {};
	for (const [name, candidates] of Object.entries(MAP_SIGNATURES)) {
		markers[name] = candidates.some(candidate => buffer.includes(Buffer.from(candidate, "utf8")));
	}

	return {
		format,
		bytes: buffer.length,
		sha256: sha256(buffer),
		bytecodeVersion: format === "hermes" && buffer.length >= 12 ? buffer.readUInt32LE(8) : undefined,
		markers,
		classification: classifyMapFamily(markers)
	};
}

function findFiles(root, predicate) {
	if (!fs.existsSync(root)) return [];
	const pending = [root];
	const result = [];
	while (pending.length > 0) {
		const current = pending.pop();
		for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
			const entryPath = path.join(current, entry.name);
			if (entry.isDirectory()) pending.push(entryPath);
			if (entry.isFile() && predicate(entryPath, entry)) result.push(entryPath);
		}
	}
	return result.sort((left, right) => left.localeCompare(right));
}

function packageNameFor(root, sourcePath) {
	return normalizeRelative(root, sourcePath).split("/")[0];
}

async function inspectArchive(archivePath, root) {
	try {
		const archive = fs.readFileSync(archivePath);
		const zip = await JSZip.loadAsync(archive);
		const entries = Object.values(zip.files);
		const fileEntries = entries.filter(entry => !entry.dir);
		const uncompressedEntryBytes = fileEntries.map(entry => {
			const bytes = entry?._data?.uncompressedSize;
			return Number.isSafeInteger(bytes) && bytes >= 0 ? bytes : 0;
		});
		const bundleEntries = fileEntries
			.filter(entry => !entry.dir && /(^|\/)index\.android\.bundle$/u.test(entry.name));
		if (bundleEntries.length !== 1) {
			return {
				sourceKind: "archive",
				sourcePath: normalizeRelative(root, archivePath),
				packageName: packageNameFor(root, archivePath),
				status: "failed",
				error: `Expected one index.android.bundle, found ${bundleEntries.length}`
			};
		}
		const bundle = await bundleEntries[0].async("nodebuffer");
		return {
			sourceKind: "archive",
			sourcePath: normalizeRelative(root, archivePath),
			bundleEntry: bundleEntries[0].name,
			packageName: packageNameFor(root, archivePath),
			status: "inspected",
			archiveBytes: archive.length,
			archiveEntries: entries.length,
			archiveFileEntries: fileEntries.length,
			archiveUncompressedBytes: uncompressedEntryBytes.reduce((sum, bytes) => sum + bytes, 0),
			largestArchiveEntryBytes: Math.max(0, ...uncompressedEntryBytes),
			...inspectBundleBuffer(bundle)
		};
	} catch (error) {
		return {
			sourceKind: "archive",
			sourcePath: normalizeRelative(root, archivePath),
			packageName: packageNameFor(root, archivePath),
			status: "failed",
			error: error instanceof Error ? error.message : String(error)
		};
	}
}

function inspectExtractedBundle(bundlePath, root, runtimeByPath) {
	const relativePath = normalizeRelative(root, bundlePath);
	return {
		sourceKind: "extracted",
		sourcePath: relativePath,
		packageName: packageNameFor(root, bundlePath),
		status: "inspected",
		runtimeStatus: runtimeByPath.get(relativePath)?.status ?? "not-run",
		...inspectBundleBuffer(fs.readFileSync(bundlePath))
	};
}

function summarizePackageFiles(packagePath) {
	const files = findFiles(packagePath, () => true);
	const assetExtensions = new Set([".gif", ".jpg", ".jpeg", ".pag", ".png", ".svg", ".webp"]);
	const categories = {
		map: /map/iu,
		room: /room|segment/iu,
		floor: /floor|material/iu,
		carpet: /carpet/iu,
		obstacle: /obstacle|object/iu,
		boundary: /forbid|virtual.?wall|no.?mop|zone/iu,
		device: /robot|dock|charger/iu
	};
	const mapAssets = Object.fromEntries(Object.keys(categories).map(name => [name, 0]));
	let totalAssets = 0;
	for (const filePath of files) {
		if (!assetExtensions.has(path.extname(filePath).toLowerCase())) continue;
		totalAssets++;
		const normalized = filePath.split(path.sep).join("/");
		for (const [name, pattern] of Object.entries(categories)) {
			if (pattern.test(normalized)) mapAssets[name]++;
		}
	}
	return { totalFiles: files.length, totalAssets, mapAssets };
}

function directInitStatus(sources) {
	const statuses = sources
		.filter(source => source.sourceKind === "extracted")
		.map(source => source.runtimeStatus);
	if (statuses.includes("failed")) return "failed";
	if (statuses.includes("passed")) return "passed";
	if (statuses.includes("device-session-required")) return "device-session-required";
	if (statuses.includes("bridge-host-required")) return "bridge-host-required";
	return "not-run";
}

function groupUniqueBundles(sources) {
	const groups = new Map();
	for (const source of sources.filter(candidate => candidate.status === "inspected")) {
		if (!groups.has(source.sha256)) {
			groups.set(source.sha256, {
				sha256: source.sha256,
				format: source.format,
				bytes: source.bytes,
				bytecodeVersion: source.bytecodeVersion,
				markers: source.markers,
				classification: source.classification,
				sources: []
			});
		}
		groups.get(source.sha256).sources.push(source);
	}

	return [...groups.values()]
		.map(group => ({
			sha256: group.sha256,
			format: group.format,
			bytes: group.bytes,
			bytecodeVersion: group.bytecodeVersion,
			markers: group.markers,
			classification: group.classification,
			packages: [...new Set(group.sources.map(source => source.packageName))].sort(),
			sourcePaths: group.sources.map(source => source.sourcePath).sort(),
			directInitStatus: directInitStatus(group.sources),
			mapBehaviorStatus: "not-tested"
		}))
		.sort((left, right) => left.packages.join(",").localeCompare(right.packages.join(",")));
}

async function buildMapInventory(rootDir, options = {}) {
	const root = path.resolve(rootDir);
	const packageDirectories = fs.existsSync(root)
		? fs.readdirSync(root, { withFileTypes: true })
			.filter(entry => entry.isDirectory())
			.map(entry => path.join(root, entry.name))
			.sort((left, right) => left.localeCompare(right))
		: [];
	const extractedBundlePaths = findBundleFiles(root);
	const archivePaths = findFiles(root, filePath => path.extname(filePath).toLowerCase() === ".zip");
	const runtimeMatrix = options.runRuntime === false
		? { results: [] }
		: runBundleMatrix(root, { hermesHostExecutable: options.hermesHostExecutable });
	const runtimeByPath = new Map((runtimeMatrix.results ?? []).map(result => [result.relativePath.split(path.sep).join("/"), result]));
	const extractedSources = extractedBundlePaths.map(bundlePath => inspectExtractedBundle(bundlePath, root, runtimeByPath));
	const archiveSources = [];
	if (options.inspectArchives !== false) {
		for (const archivePath of archivePaths) archiveSources.push(await inspectArchive(archivePath, root));
	}
	const sources = [...extractedSources, ...archiveSources]
		.sort((left, right) => left.sourcePath.localeCompare(right.sourcePath));

	for (const source of archiveSources.filter(candidate => candidate.status === "inspected")) {
		source.matchedExtractedPaths = extractedSources
			.filter(candidate => candidate.packageName === source.packageName && candidate.sha256 === source.sha256)
			.map(candidate => candidate.sourcePath)
			.sort();
	}
	const uniqueBundles = groupUniqueBundles(sources);

	const packages = packageDirectories.map(packagePath => {
		const packageName = path.basename(packagePath);
		const packageSources = sources.filter(source => source.packageName === packageName);
		const archiveBundleSources = packageSources.filter(source => source.sourceKind === "archive");
		const extractedBundleSources = packageSources.filter(source => source.sourceKind === "extracted");
		const failedArchives = archiveBundleSources.filter(source => source.status === "failed");
		const unmatchedArchives = archiveBundleSources.filter(source => source.status === "inspected" && source.matchedExtractedPaths.length === 0);
		let coverageStatus = "missing-bundle";
		if (archiveBundleSources.length > 0 && extractedBundleSources.length > 0 && failedArchives.length === 0 && unmatchedArchives.length === 0) {
			coverageStatus = "archive-and-extracted";
		} else if (extractedBundleSources.length > 0 && archiveBundleSources.length === 0) {
			coverageStatus = "extracted-only";
		} else if (archiveBundleSources.length > 0 && extractedBundleSources.length === 0) {
			coverageStatus = "archive-only";
		} else if (archiveBundleSources.length > 0 || extractedBundleSources.length > 0) {
			coverageStatus = "incomplete";
		}
		return {
			name: packageName,
			coverageStatus,
			archives: archiveBundleSources.map(source => source.sourcePath),
			extractedBundles: extractedBundleSources.map(source => source.sourcePath),
			archiveBundleHashesMatched: archiveBundleSources.filter(source => source.matchedExtractedPaths?.length > 0).length,
			...summarizePackageFiles(packagePath)
		};
	});

	const familyCounts = {};
	for (const bundle of uniqueBundles) familyCounts[bundle.classification.id] = (familyCounts[bundle.classification.id] ?? 0) + 1;
	const failedArchiveSources = archiveSources.filter(source => source.status === "failed");
	const unmatchedArchiveSources = archiveSources.filter(source => source.status === "inspected" && source.matchedExtractedPaths.length === 0);
	const inspectedArchiveSources = archiveSources.filter(source => source.status === "inspected");

	return {
		schemaVersion: 2,
		root: path.basename(root),
		summary: {
			topLevelPackages: packages.length,
			archiveFiles: archivePaths.length,
			archiveBundleEntries: archiveSources.filter(source => source.status === "inspected").length,
			extractedBundlePaths: extractedSources.length,
			uniqueBundleHashes: uniqueBundles.length,
			metroBundleHashes: uniqueBundles.filter(bundle => bundle.format === "metro").length,
			hermesBundleHashes: uniqueBundles.filter(bundle => bundle.format === "hermes").length,
			failedArchiveSources: failedArchiveSources.length,
			unmatchedArchiveSources: unmatchedArchiveSources.length,
			unresolvedMapFamilies: uniqueBundles.filter(bundle => bundle.classification.id.endsWith("unresolved") || bundle.classification.id === "unresolved").length,
			largestArchiveBytes: Math.max(0, ...inspectedArchiveSources.map(source => source.archiveBytes)),
			largestArchiveEntryCount: Math.max(0, ...inspectedArchiveSources.map(source => source.archiveEntries)),
			largestArchiveFileCount: Math.max(0, ...inspectedArchiveSources.map(source => source.archiveFileEntries)),
			largestArchiveEntryBytes: Math.max(0, ...inspectedArchiveSources.map(source => source.largestArchiveEntryBytes)),
			largestArchiveUncompressedBytes: Math.max(0, ...inspectedArchiveSources.map(source => source.archiveUncompressedBytes)),
			familyCounts
		},
		packages,
		uniqueBundles,
		sources
	};
}

function escapeTable(value) {
	return String(value ?? "").replaceAll("|", "\\|").replaceAll("\n", " ");
}

function runtimeLabel(status) {
	return ({
		passed: "Initialisierung bestanden",
		failed: "Fehlgeschlagen",
		"device-session-required": "Echte Gerätesitzung erforderlich",
		"bridge-host-required": "Hermes-Host erforderlich",
		"not-run": "Nicht ausgeführt"
	})[status] ?? status;
}

function coverageLabel(status) {
	return ({
		"archive-and-extracted": "ZIP und Bundle hashgleich",
		"extracted-only": "Nur entpacktes Plugin vorhanden",
		"archive-only": "Nur ZIP vorhanden",
		incomplete: "Unvollständig",
		"missing-bundle": "Kein Bundle gefunden"
	})[status] ?? status;
}

function renderMapInventoryMarkdown(inventory) {
	const lines = [
		"# AppPlugin-Karten-Kompatibilitätsmatrix",
		"",
		"> Automatisch erzeugt durch `node scripts/appplugin_map_matrix.js`. Die Klassifizierung untersucht die originale Bundle-Datei als Ganzes; sie zerlegt oder verändert das Bundle nicht.",
		"",
		"## Abdeckung",
		"",
		`- ${inventory.summary.topLevelPackages} AppPlugin-Verzeichnisse sind inventarisiert.`,
		`- ${inventory.summary.archiveFiles} ZIP-Dateien enthalten ${inventory.summary.archiveBundleEntries} lesbare Bundle-Einträge.`,
		`- ${inventory.summary.extractedBundlePaths} entpackte Bundle-Pfade ergeben ${inventory.summary.uniqueBundleHashes} unterschiedliche Bundle-Hashes.`,
		`- Eindeutige Formate: ${inventory.summary.metroBundleHashes} Metro und ${inventory.summary.hermesBundleHashes} Hermes.`,
		`- Nicht zugeordnete Kartenfamilien: ${inventory.summary.unresolvedMapFamilies}.`,
		`- ZIP-Fehler: ${inventory.summary.failedArchiveSources}; ZIP-Bundles ohne hashgleichen entpackten Gegenpart: ${inventory.summary.unmatchedArchiveSources}.`,
		"",
		"| AppPlugin | Quellenstatus | ZIPs | Bundle-Pfade | Dateien | Kartennahe Assets |",
		"| --- | --- | ---: | ---: | ---: | ---: |"
	];
	for (const plugin of inventory.packages) {
		const mapAssets = Object.values(plugin.mapAssets).reduce((sum, count) => sum + count, 0);
		lines.push(`| ${escapeTable(plugin.name)} | ${escapeTable(coverageLabel(plugin.coverageStatus))} | ${plugin.archives.length} | ${plugin.extractedBundles.length} | ${plugin.totalFiles} | ${mapAssets} |`);
	}

	lines.push(
		"",
		"## Statisch erkannte Kartenfamilien",
		"",
		"Die Familie ist ein belastbarer Kandidat aus Bundle-Signaturen, aber noch kein Beweis für erfolgreiches Kartenrendering. `RRARMapViewManager` im Bundle beweist beispielsweise zunächst nur, dass das Plugin diesen APK-Vertrag kennt.",
		"",
		"| AppPlugin-Zuordnung | Format | Hash | Kartenfamilie | Evidenz | Direktstart | Kartenverhalten |",
		"| --- | --- | --- | --- | --- | --- | --- |"
	);
	for (const bundle of inventory.uniqueBundles) {
		lines.push(`| ${escapeTable(bundle.packages.join(", "))} | ${escapeTable(bundle.format)}${bundle.bytecodeVersion ? ` HBC ${bundle.bytecodeVersion}` : ""} | \`${bundle.sha256.slice(0, 12)}\` | ${escapeTable(bundle.classification.label)} | ${escapeTable(bundle.classification.evidence.join(", "))} | ${escapeTable(runtimeLabel(bundle.directInitStatus))} | **Noch nicht getestet** |`);
	}

	lines.push(
		"",
		"## Aktuelle Kartendatenpfade des Adapters",
		"",
		"| Pfad | Datenformat | Zentrale Implementierung |",
		"| --- | --- | --- |",
		"| V1 | proprietäres Binärformat | `src/lib/map/v1/MapParser.ts` |",
		"| B01 | `SCMap.RobotMap` als Protobuf | `src/lib/map/b01/MapParser.ts` |",
		"| Q10/YX | YX-Rohformat, derzeit in das B01-Modell überführt | `src/lib/map/q10/Q10YxMapParser.ts` |",
		"| B01-Klassifizierung | Protobuf, Q10, Pfad-/Blob-Paket oder unbekannt | `src/lib/map/b01/B01MapPayloadClassifier.ts` |",
		"",
		"Diese Adapterpfade sind der aktuelle Stand, nicht automatisch die Zielarchitektur. Phase 0 muss klären, welche davon durch direkte AppPlugin-Ausführung entfallen können.",
		"",
		"## Verbindliche Verhaltenstest-Matrix je Kartenfamilie",
		"",
		"Jede statisch erkannte Familie muss mindestens folgende Gates mit echten Daten bestehen:",
		"",
		"- Originalbundle direkt und unverändert laden.",
		"- Vollständige Livekarte und Reinigungshistorie verarbeiten.",
		"- Vollkarte sowie inkrementelle Pfad-/Blob-Aktualisierung anwenden.",
		"- Normal-, Hell-, Dunkel-, ausgewählt- und abgewählt-Zustand rendern.",
		"- Raum-ID, Raumgeometrie und Auswahlcallback konsistent halten.",
		"- Roboter, Dock, Fahrweg, Teppiche, Hindernisse, Sperrzonen und virtuelle Wände darstellen.",
		"- Mehrgeschoss-, gespeicherte und gewechselte Karten prüfen, sofern das Plugin sie anbietet.",
		"- Leere, gekürzte, beschädigte und unbekannte Payloads kontrolliert ablehnen.",
		"- Laufzeit, Spitzen-RAM, Timeout, Abbruch und Neustart messen.",
		"- Kein echter Gerätebefehl darf während des Karten-PoC gesendet werden.",
		"",
		"## Offene Gates",
		"",
		"Die statische Klassifizierung ist vollständig für die lokal vorhandenen Pakete. Ein Kartenfamilien-Gate gilt jedoch erst als bestanden, wenn ein originales Bundle mit einer echten Karte den vorgesehenen Hostvertrag durchlaufen und ein überprüfbares Bild samt Interaktionscallback erzeugt hat. Bis dahin bleibt `Kartenverhalten` bewusst auf **Noch nicht getestet**.",
		"",
		"## Vollständige Bundle-Quellen",
		"",
		"| Quelle | Art | Status | Hash |",
		"| --- | --- | --- | --- |"
	);
	for (const source of inventory.sources) {
		const status = source.status === "failed"
			? `Fehler: ${source.error}`
			: source.sourceKind === "archive"
				? `${source.matchedExtractedPaths?.length ?? 0} hashgleiche entpackte Quelle(n)`
				: runtimeLabel(source.runtimeStatus);
		lines.push(`| \`${escapeTable(source.sourcePath)}\` | ${source.sourceKind === "archive" ? "ZIP-Bundle" : "entpacktes Bundle"} | ${escapeTable(status)} | ${source.sha256 ? `\`${source.sha256.slice(0, 12)}\`` : "-"} |`);
	}
	lines.push("");
	return lines.join("\n");
}

module.exports = {
	FAMILY_LABELS,
	MAP_SIGNATURES,
	buildMapInventory,
	classifyMapFamily,
	inspectBundleBuffer,
	renderMapInventoryMarkdown
};
