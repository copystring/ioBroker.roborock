
const fs = require("fs");
const path = require("path");

const baseDir = path.join(__dirname, "..");
const module519Path = path.join(baseDir, "Roborock Q7 Series", "output", "module_519.js");
const module518Path = path.join(baseDir, "Roborock Q7 Series", "output", "module_518.js");
const datasetPath = path.join(baseDir, "src", "lib", "protocols", "q7_dataset.json");
const outputDir = path.join(baseDir, "docs", "protocols", "Q7");

if (!fs.existsSync(outputDir)) {
	fs.mkdirSync(outputDir, { recursive: true });
}

function extractFaultCodes() {
	if (!fs.existsSync(module519Path)) return { faults: [], deviceStates: [], robotModes: [] };
	console.log(`Reading ${module519Path}...`);
	const content = fs.readFileSync(module519Path, "utf8");

	const faultAssign = "r3['FAULT_STATUS'] = r6;";
	const assignIdx = content.indexOf(faultAssign);
	const faults = [];
	const seenIds = new Set();

	if (assignIdx !== -1) {
		const startR6 = content.lastIndexOf("r6 = {", assignIdx);
		if (startR6 !== -1) {
			const endR6 = content.indexOf("};", startR6);
			if (endR6 !== -1 && endR6 < assignIdx) {
				const block = content.substring(startR6, endR6);
				const regex = /'([a-zA-Z0-9_]+)'\s*:\s*(\d+)/g;
				let m;
				while ((m = regex.exec(block)) !== null) {
					const internal = m[1];
					const code = m[2];
					if (!seenIds.has(code)) {
						faults.push({ code, internal });
						seenIds.add(code);
					}
				}
			}
		}
	}

	const extraRegex = /r6\['([a-zA-Z0-9_]+)'\]\s*=\s*(\d+);/g;
	let m2;
	while ((m2 = extraRegex.exec(content)) !== null) {
		const internal = m2[1];
		const code = m2[2];
		if (!seenIds.has(code)) {
			faults.push({ code, internal });
			seenIds.add(code);
		}
	}

	const deviceStates = [];
	const subtitleMatch = content.match(/r3\['SUBTITLE_STATUS'\]\s*=\s*r6;/);
	if(subtitleMatch) {
		const endIdx = subtitleMatch.index;
		const startR6 = content.lastIndexOf("r6 = {", endIdx);
		if (startR6 !== -1) {
			const subBlock = content.substring(startR6, endIdx);
			const regex = /'([a-zA-Z0-9_]+)'\s*:\s*(\d+)/g;
			let sm;
			while ((sm = regex.exec(subBlock)) !== null) {
				deviceStates.push({ name: sm[1], value: sm[2] });
			}
		}
	}

	const robotModes = [];
	const robotTypeMatch = content.match(/r3\['ROBOT_TYPE'\]\s*=\s*r6;/);
	if(robotTypeMatch) {
		const endIdx = robotTypeMatch.index;
		const startR6 = content.lastIndexOf("r6 = {", endIdx);
		if (startR6 !== -1) {
			const subBlock = content.substring(startR6, endIdx);
			const regex = /'([a-zA-Z0-9_]+)'\s*:\s*(\d+)/g;
			let sm;
			while ((sm = regex.exec(subBlock)) !== null) {
				robotModes.push({ name: sm[1], value: sm[2] });
			}
		}
	}

	return { faults, deviceStates, robotModes };
}

function extractTranslations() {
	if (!fs.existsSync(module518Path)) return { translations: {}, languages: [] };
	console.log(`Reading ${module518Path}...`);
	const content518 = fs.readFileSync(module518Path, "utf8");
	const translations = {};
	const languages = [];

	const langRegex = /r1\['([a-zA-Z_-]+)'\]\s*=\s*r0;/g;
	let lm;
	while ((lm = langRegex.exec(content518)) !== null) {
		if (!languages.includes(lm[1])) languages.push(lm[1]);
	}
	console.log(`Found languages: ${languages.join(", ")}`);

	for (const lang of languages) {
		translations[lang] = {};
		const marker = `r1['${lang}'] = r0;`;
		const markerIndex = content518.indexOf(marker);
		if (markerIndex === -1) continue;

		const startMarker = "r0 = {";
		const startIndex = content518.lastIndexOf(startMarker, markerIndex);
		if (startIndex === -1) continue;

		const block = content518.substring(startIndex, markerIndex);
		const translationsMap = {};
		const faultMap = {};
		const ranges = [];
		const specifics = {};

		const allKeyRegex = /'([a-zA-Z0-9_]+)'\s*:\s*(['"])(.*?)\2/g;
		let m;
		while ((m = allKeyRegex.exec(block)) !== null) {
			const fullKey = m[1];
			const text = m[3];

			if (fullKey.startsWith("fault_")) {
				const core = fullKey.replace("fault_title_", "").replace("fault_summery_", "");
				const isTitle = fullKey.startsWith("fault_title_");
				const parts = core.split("_");
				if (parts.length === 2 && /^\d+$/.test(parts[0]) && /^\d+$/.test(parts[1])) {
					ranges.push({ start: parseInt(parts[0]), end: parseInt(parts[1]), text, isTitle });
				} else {
					if (!specifics[core]) specifics[core] = {};
					if (isTitle) specifics[core].title = text;
					else specifics[core].summary = text;
				}
			} else {
				translationsMap[fullKey] = text;
			}
		}

		for (const r of ranges) {
			for (let c = r.start; c <= r.end; c++) {
				const cKey = String(c);
				if (!faultMap[cKey]) faultMap[cKey] = {};
				if (r.isTitle) faultMap[cKey].title = r.text;
				else faultMap[cKey].summary = r.text;
			}
		}

		for (const [cKey, data] of Object.entries(specifics)) {
			if (!faultMap[cKey]) faultMap[cKey] = {};
			if (data.title) faultMap[cKey].title = data.title;
			if (data.summary) faultMap[cKey].summary = data.summary;
		}

		// Store both general and faults
		translations[lang] = {
			general: translationsMap,
			faults: faultMap
		};
	}
	return { translations, languages };
}

function main() {
	let faults, deviceStates, robotModes, translations, languages;

	const jsFilesExist = fs.existsSync(module519Path) && fs.existsSync(module518Path);

	if (jsFilesExist) {
		console.log("Found source JS files. Extracting fresh data...");
		const extracted = extractFaultCodes();
		faults = extracted.faults;
		deviceStates = extracted.deviceStates;
		robotModes = extracted.robotModes;

		const trans = extractTranslations();
		translations = trans.translations;
		languages = trans.languages;

		// Save to dataset
		const dataset = {
			meta: { languages, generated: new Date().toISOString() },
			fault_codes: {},
			device_states: deviceStates,
			robot_modes: robotModes,
			general_translations: {}
		};

		faults.forEach(f => {
			dataset.fault_codes[f.code] = { internal: f.internal };
			languages.forEach(lang => {
				const fData = translations[lang].faults[f.code];
				if (fData) {
					if (!dataset.fault_codes[f.code][lang]) dataset.fault_codes[f.code][lang] = {};
					if (fData.title) dataset.fault_codes[f.code][lang].title = fData.title;
					if (fData.summary) dataset.fault_codes[f.code][lang].summary = fData.summary;
				}
			});
		});

		languages.forEach(lang => {
			dataset.general_translations[lang] = translations[lang].general;
		});

		fs.writeFileSync(datasetPath, JSON.stringify(dataset, null, 2));
		console.log(`Updated ${datasetPath}`);
	} else if (fs.existsSync(datasetPath)) {
		console.log("Source JS files not found. Using q7_dataset.json as source...");
		const dataset = JSON.parse(fs.readFileSync(datasetPath, "utf8"));
		languages = dataset.meta.languages;
		deviceStates = dataset.device_states;
		robotModes = dataset.robot_modes;

		faults = Object.entries(dataset.fault_codes).map(([code, data]) => ({
			code,
			internal: data.internal
		}));

		translations = {};
		languages.forEach(lang => {
			translations[lang] = {
				general: dataset.general_translations?.[lang] || {},
				faults: {}
			};
			Object.entries(dataset.fault_codes).forEach(([code, data]) => {
				if (data[lang]) {
					translations[lang].faults[code] = {
						title: data[lang].title,
						summary: data[lang].summary
					};
				}
			});
		});
	} else {
		console.error("Critical Error: Neither source JS files nor dataset found!");
		process.exit(1);
	}

	// Generate MD Files
	let indexMd = "# 📚 Q7 Protocol Values - Index\n\n";
	indexMd += "This index provides a comprehensive mapping of internal protocol values to human-readable translations for the Q7 series.\n\n";
	indexMd += "### 🌍 Select a Language\n\n";
	indexMd += "| Language | Documentation |\n| :--- | :--- |\n";

	for (const lang of languages) {
		const fileName = `Q7_Values_${lang.toUpperCase()}.md`;
		indexMd += `| **${lang}** | [📖 View ${lang.toUpperCase()}](./${fileName}) |\n`;

		let md = `# 🤖 Roborock Q7 Protocol Values (${lang.toUpperCase()})\n\n`;
		md += "This document contains the complete translation mapping and internal constants for the Q7 series protocol.\n\n";
		md += "---\n\n";

		md += "## ⚙️ Protocol Definitions (Constants)\n\n";

		if (deviceStates && deviceStates.length > 0) {
			md += "### 🚦 Device States (`SUBTITLE_STATUS`)\n";
			md += "| State Name | Internal Value |\n| :--- | :--- |\n";
			deviceStates.sort((a,b) => a.value - b.value).forEach(item => {
				md += `| \`${item.name}\` | \`${item.value}\` |\n`;
			});
			md += "\n";
		}

		md += "---\n\n";

		if (robotModes && robotModes.length > 0) {
			md += "### 🕹️ Robot Modes (`ROBOT_TYPE`)\n";
			md += "| Mode Name | Internal Value |\n| :--- | :--- |\n";
			robotModes.sort((a,b) => a.value - b.value).forEach(item => {
				md += `| \`${item.name}\` | \`${item.value}\` |\n`;
			});
			md += "\n";
		}

		md += "---\n\n";

		md += "## ⚠️ Fault Codes\n\n";
		md += "> [!NOTE]\n";
		md += "> Fault codes are reported via the `fault` status property. Use the table below to map the numeric ID to a localized message.\n\n";

		md += "| ID | Internal Key | Title | Detailed Summary |\n| :--- | :--- | :--- | :--- |\n";

		const langData = translations[lang] || { faults: {}, general: {} };
		faults.sort((a,b) => parseInt(a.code) - parseInt(b.code)).forEach(item => {
			const code = item.code;
			const internal = item.internal;
			const fData = langData.faults[code] || {};
			const title = fData.title || "-";
			const summary = fData.summary || "-";

			md += `| **${code}** | \`${internal}\` | ${title} | ${summary.replace(/\n/g, "<br>")} |\n`;
		});

		md += "\n---\n\n";

		md += "## 🌐 General Translations\n\n";
		md += "| Key | Localized Value |\n| :--- | :--- |\n";
		const general = langData.general || {};
		Object.entries(general).sort().forEach(([k, v]) => {
			md += `| \`${k}\` | ${v.replace(/\n/g, "<br>")} |\n`;
		});

		fs.writeFileSync(path.join(outputDir, fileName), md);
		console.log(`Generated ${fileName}`);
	}

	fs.writeFileSync(path.join(outputDir, "README.md"), indexMd);
	console.log("Generated Index README.md");
}

main();
