
const fs = require("fs");
const path = require("path");

const module519Path = "C:\\iobroker\\iobroker.roborock\\Roborock Q7 Series\\output\\module_519.js";
const module518Path = "C:\\iobroker\\iobroker.roborock\\Roborock Q7 Series\\output\\module_518.js";
const outputDir = "C:\\iobroker\\iobroker.roborock\\docs\\protocols\\Q7";

function extractObject(content, keyName) {
	const mapping = {};
	const assignRegex = new RegExp(`r3\\['${keyName}'\\]\\s*=\\s*([a-z0-9]+);`);
	const assignMatch = content.match(assignRegex);
	if (!assignMatch) return null;

	const varName = assignMatch[1];
	const assignIndex = assignMatch.index;
	const beforeContent = content.substring(0, assignIndex);
	const lastDefMatch = beforeContent.match(new RegExp(`${varName}\\s*=\\s*({[^;]*?});`, "g"));

	if (lastDefMatch && lastDefMatch.length > 0) {
		const lastMatch = lastDefMatch[lastDefMatch.length - 1];
		const innerContentMatch = lastMatch.match(/{([\s\S]*?)}/);
		if (innerContentMatch) {
			const inner = innerContentMatch[1];
			const entryRegex = /'([a-zA-Z0-9_]+)'\s*:\s*(\d+|null|'[a-zA-Z0-9_]+')/g;
			let m;
			while ((m = entryRegex.exec(inner)) !== null) {
				let val = m[2];
				if (val.startsWith("'")) val = val.substring(1, val.length -1);
				mapping[m[1]] = val;
			}
		}
	}
	return mapping;
}


function extractFaultCodes() {
	console.log("Reading module_519.js...");
	const content = fs.readFileSync(module519Path, "utf8");

	// Extract symbolic Mappings (Name -> ID)
	// Find assignment: r3['FAULT_STATUS'] = r6;
	const faultAssign = "r3['FAULT_STATUS'] = r6;";
	const assignIdx = content.indexOf(faultAssign);

	const faults = [];
	const seenIds = new Set();

	if (assignIdx !== -1) {
		// Search backwards for r6 = {
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


	// Also scan for post-block assignments like r6['F_2100'] = 2100;
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

	// Device States
	const deviceStates = [];
	const subtitleMatch = content.match(/r3\['SUBTITLE_STATUS'\]\s*=\s*r6;/);
	if(subtitleMatch) {
		// Search backwards for r6 = { ... }
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


	// Robot Modes
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
	console.log("Reading module_518.js...");
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

		const translationsMap = {}; // Generic translations
		const faultMap = {}; // cKey -> { title, summary }

		const ranges = [];
		const specifics = {}; // key -> { title, summary }

		const allKeyRegex = /'([a-zA-Z0-9_]+)'\s*:\s*(['"])(.*?)\2/g;
		let m;
		while ((m = allKeyRegex.exec(block)) !== null) {
			const fullKey = m[1];
			const text = m[3];

			if (fullKey.startsWith("fault_")) {
				const core = fullKey.replace("fault_title_", "").replace("fault_summery_", "");
				const isTitle = fullKey.startsWith("fault_title_");

				// Check for X_Y pattern
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

		// 1. Apply Ranges (In Order of Appearance, so later ranges overwrite earlier ones)
		for (const r of ranges) {
			for (let c = r.start; c <= r.end; c++) {
				const cKey = String(c);
				if (!faultMap[cKey]) faultMap[cKey] = {};

				if (r.isTitle) faultMap[cKey].title = r.text;
				else faultMap[cKey].summary = r.text;
			}
		}

		// 2. Apply Specifics (Always Override Ranges)
		for (const [cKey, data] of Object.entries(specifics)) {
			if (!faultMap[cKey]) faultMap[cKey] = {};
			if (data.title) faultMap[cKey].title = data.title;
			if (data.summary) faultMap[cKey].summary = data.summary;
		}

		// Store back to main translations object
		translations[lang] = translationsMap;
		for (const [cKey, data] of Object.entries(faultMap)) {
			if (data.title) translations[lang][`fault_title_${cKey}`] = data.title;
			if (data.summary) translations[lang][`fault_summery_${cKey}`] = data.summary;
		}
	}
	return { translations, languages };
}


function main() {
	console.log("Reading module_519.js...");
	// const content519 is read inside extractFaultCodes now, or strictly speaking extractFaultCodes reads it itself.
	// Wait, extractFaultCodes() takes NO arguments in my new definition.

	// 1. Extract Protocol Definitions
	const { faults, deviceStates, robotModes } = extractFaultCodes();

	// 2. Extract Translations
	const { translations, languages } = extractTranslations();

	// 3. Generate Index
	let indexMd = "# Q7 Protocol Values - Index\n\n";
	indexMd += "Select a language to view the complete mapped protocol values and translations.\n\n";
	indexMd += "| Language | File |\n|---|---|\n";

	// 4. Generate Language Files
	for (const lang of languages) {
		const fileName = `Q7_Values_${lang.toUpperCase()}.md`;
		indexMd += `| ${lang} | [Link](./${fileName}) |\n`;

		let md = `# Roborock Q7 Values (${lang.toUpperCase()})\n\n`;

		// Definitions Section (Shared)
		md += "## Protocol Definitions (Constants)\n\n";

		if (deviceStates && deviceStates.length > 0) {
			md += "### Device States (SUBTITLE_STATUS)\n";
			md += "| State | Value |\n|---|---|\n";
			deviceStates.sort((a,b) => a.value - b.value).forEach(item => {
				md += `| ${item.name} | ${item.value} |\n`;
			});
			md += "\n";
		}
		if (robotModes && robotModes.length > 0) {
			md += "### Robot Modes (ROBOT_TYPE)\n";
			md += "| Mode | Value |\n|---|---|\n";
			robotModes.sort((a,b) => a.value - b.value).forEach(item => {
				md += `| ${item.name} | ${item.value} |\n`;
			});
			md += "\n";
		}

		// Fault Codes
		md += "## Fault Codes\n\n";
		md += "| Code | Internal | Title | Summary |\n|---|---|---|---|\n";

		const langData = translations[lang] || {};
		const handledKeys = new Set();

		// faults is array of { code, internal }
		faults.sort((a,b) => a.code - b.code).forEach(item => {
			const code = item.code;
			const internal = item.internal;

			const titleKey = `fault_title_${code}`;
			const summaryKey = `fault_summery_${code}`; // Note: typo 'summery' in original file

			const title = langData[titleKey] || "-";
			const summary = langData[summaryKey] || "-";

			md += `| ${code} | ${internal} | ${title} | ${summary.replace(/\n/g, "<br>")} |\n`;

			handledKeys.add(titleKey);
			handledKeys.add(summaryKey);
		});

		md += "\n";

		// Other Translations
		md += "## All Other Translations\n\n";
		md += "| Key | Value |\n|---|---|\n";
		Object.entries(langData).sort().forEach(([k, v]) => {
			if (!k.startsWith("fault_") && !handledKeys.has(k)) {
				md += `| \`${k}\` | ${v.replace(/\n/g, "<br>")} |\n`;
			}
		});

		fs.writeFileSync(path.join(outputDir, fileName), md);
		console.log(`Generated ${fileName}`);
	}

	fs.writeFileSync(path.join(outputDir, "README.md"), indexMd);
	console.log("Generated Index README.md");
}

main();

