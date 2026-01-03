
const fs = require('fs');
const path = require('path');

const module519Path = 'C:\\iobroker\\iobroker.roborock\\Roborock Q7 Series\\output\\module_519.js';
const module518Path = 'C:\\iobroker\\iobroker.roborock\\Roborock Q7 Series\\output\\module_518.js';
const outputDir = 'C:\\iobroker\\iobroker.roborock\\src\\lib\\protocols';

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Reuse the robust extraction logic from extract_q7_codes.js
function extractFaultCodes(content) {
    // Find assignment: r3['FAULT_STATUS'] = r6;
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
    return faults;
}

function extractDeviceStates(content) {
    const deviceStates = [];
    const subtitleMatch = content.match(/r3\['SUBTITLE_STATUS'\]\s*=\s*r6;/);
    if(subtitleMatch) {
         const endIdx = subtitleMatch.index;
         const startR6 = content.lastIndexOf('r6 = {', endIdx);
         if (startR6 !== -1) {
             const subBlock = content.substring(startR6, endIdx);
              const regex = /'([a-zA-Z0-9_]+)'\s*:\s*(\d+)/g;
              let sm;
              while ((sm = regex.exec(subBlock)) !== null) {
                deviceStates.push({ name: sm[1], value: sm[2] });
              }
         }
    }
    return deviceStates;
}

function extractRobotModes(content) {
    const robotModes = [];
     const robotTypeMatch = content.match(/r3\['ROBOT_TYPE'\]\s*=\s*r6;/);
    if(robotTypeMatch) {
         const endIdx = robotTypeMatch.index;
         const startR6 = content.lastIndexOf('r6 = {', endIdx);
         if (startR6 !== -1) {
             const subBlock = content.substring(startR6, endIdx);
              const regex = /'([a-zA-Z0-9_]+)'\s*:\s*(\d+)/g;
              let sm;
              while ((sm = regex.exec(subBlock)) !== null) {
                robotModes.push({ name: sm[1], value: sm[2] });
              }
         }
    }
    return robotModes;
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

        // 1. Apply Ranges
        for (const r of ranges) {
            for (let c = r.start; c <= r.end; c++) {
                const cKey = String(c);
                if (!faultMap[cKey]) faultMap[cKey] = {};
                if (r.isTitle) faultMap[cKey].title = r.text;
                else faultMap[cKey].summary = r.text;
            }
        }

        // 2. Apply Specifics
        for (const [cKey, data] of Object.entries(specifics)) {
            if (!faultMap[cKey]) faultMap[cKey] = {};
            if (data.title) faultMap[cKey].title = data.title;
            if (data.summary) faultMap[cKey].summary = data.summary;
        }

        translations[lang] = {
            generic: translationsMap,
            faults: faultMap
        };
    }
    return { translations, languages };
}

function generate() {
    const content519 = fs.readFileSync(module519Path, 'utf8');

    const faults = extractFaultCodes(content519);
    const deviceStates = extractDeviceStates(content519);
    const robotModes = extractRobotModes(content519);

    const { translations, languages } = extractTranslations();

    // Construct the final JSON Object
    // Structure:
    // {
    //    "fault_codes": { "500": { "en": "Title", "de": "Titel", ... } },
    //    "device_states": { "1": { "en": "Clean", "de": "Reinigen", ... } },
    //    "robot_modes": ...
    // }

    // Optimize: Group by Code

    const dataset = {
        meta: {
            languages: languages,
            generated: new Date().toISOString()
        },
        fault_codes: {},
        device_states: {},
        robot_modes: {}
    };

    // 1. Fault Codes
    for (const f of faults) {
        const code = f.code;
        dataset.fault_codes[code] = { internal: f.internal };

        for (const lang of languages) {
            const t = translations[lang].faults[code];
            if (t) {
                dataset.fault_codes[code][lang] = {
                    title: t.title,
                    summary: t.summary
                };
            }
        }
    }

    // 2. Device States
    // Note: Translations for device states are usually generic keys or specific named keys?
    // In Q7 modules, many states like 'Cleaning' are just generic keys.
    // However, some might map to keys like `code_X`? No.
    // Let's check how they map.
    // module_519 defines SUBTITLE_STATUS e.g. 'CLEANING': 5
    // module_518 has translations. e.g. 'clean_record_clean_list2': 'Cleaning' ?
    // Or 'state_5'?
    // Wait. My extraction script didn't verify State Translations yet.
    // Let's dump them to JSON as is, but we might need a mapping strategy.
    // For now, I will include the raw value and name.
    // The "Translations" step for States is tricky because correct key is needed.
    // Let's look for keys starting with state_ or similar in translationsMap.

    for (const s of deviceStates) {
        dataset.device_states[s.value] = { internal: s.name };
        // Attempt to find translation by name (lowercase?)
        // e.g. name="CHARGING" -> key "home_change_charging"? "state_charging"?
        // We might not have perfect auto-mapping here without a map.
    }

    for (const m of robotModes) {
         dataset.robot_modes[m.value] = { internal: m.name };
    }

    const outFile = path.join(outputDir, 'q7_dataset.json');
    fs.writeFileSync(outFile, JSON.stringify(dataset, null, 2));
    console.log(`Generated ${outFile} with ${Object.keys(dataset.fault_codes).length} fault codes.`);
}

generate();
