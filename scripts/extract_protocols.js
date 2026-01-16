const fs = require('fs');
const path = require('path');

// ==========================================
// CONFIGURATION
// ==========================================
const BASE_DIR = path.join(__dirname, '..');

const SOURCES = {
    "Q7": {
        type: "module_parsing",
        sourceDir: path.join(BASE_DIR, ".Roborock Q7 Series", "output"),
        outputJson: path.join(BASE_DIR, "src/lib/protocols/q7_dataset.json"),
        docDir: path.join(BASE_DIR, "docs/protocols/Q7"),
        // Specifics for Q7 module parsing
        module519: "module_519.js",
        module518: "module_518.js"
    },
    // "S7_MaxV" covers generic V1 error codes extracted from the App output
    "S7_MaxV": {
        type: "app_strings",
        // Using the known absolute path or relative if exists.
        // Based on user context, .AppPlugins is inside the repo root? Or outside?
        // Previous script used absolute: C:\iobroker\iobroker.roborock\.AppPlugins...
        // Let's assume it's in the repo root based on user info.
        sourceDir: path.join(BASE_DIR, ".AppPlugins", "S7 MaxV", "8328da4abbd14f0f99d6c32e17af5a8b", "raw"),
        outputJson: path.join(BASE_DIR, "src/lib/protocols/s7_maxv_dataset.json"),
        docDir: path.join(BASE_DIR, "docs/protocols/S7_MaxV"),
        // Specifics for App strings
        errorMapping: {
            1: "localization_strings_Main_Constants_0",
            2: "localization_strings_Main_Constants_3",
            3: "localization_strings_Main_Constants_6",
            4: "localization_strings_Main_Constants_9",
            5: "localization_strings_Main_Constants_12",
            6: "localization_strings_Main_Constants_15",
            7: "localization_strings_Main_Constants_18",
            8: "localization_strings_Main_Constants_21",
            9: "localization_strings_Main_Constants_24",
            10: "localization_strings_Main_Constants_27",
            11: "localization_strings_Main_Constants_30",
            12: "localization_strings_Main_Constants_33",
            13: "localization_strings_Common_Constants_10",
            14: "localization_strings_Main_Constants_39",
            15: "localization_strings_Main_Constants_42",
            16: "localization_strings_Main_Constants_45",
            17: "localization_strings_Main_Constants_48",
            18: "localization_strings_Main_Constants_51",
            19: "localization_strings_Main_Constants_54",
            21: "rubys_error_21_title",
            22: "rubys_error_22_title",
            23: "rubys_error_23_title",
            24: "error_robot_in_forbidden",
            25: "error_visual_sensor_title",
            26: "localization_strings_Main_Error_Constants_23",
            27: "tanos_s_error_27_title",
            28: "tanos_s_error_28_title",
            29: "tanos_s_error_29_title",
            30: "ImageFPSError",
            32: "collecting_dusk_error32_title",
            33: "collecting_dusk_error33_title",
            34: "collecting_dusk_error34_title",
            35: "collecting_dusk_error35_title",
            36: "error_mopping_roller1_title",
            37: "error_mopping_roller2_title",
            38: "error_clear_waterbox_hoare_title",
            39: "error_dirty_waterbox_hoare_title",
            40: "error_sink_strainer_hoare_title",
            41: "error_clear_waterbox_exception_title",
            42: "error_clean_bruch_exception_title",
            43: "error_main_frame_exception_title",
            44: "error_filter_screen_exception_title",
            45: "error_mopping_roller1_title",
            48: "error_up_water_title",
            49: "error_drain_water_title",
            51: "error_temperature_protection_title",
            52: "error_clean_carousel_unsetuped_title",
            53: "error_clean_carousel_water_full_title",
            54: "error_water_carriage_drop_title",
        }
    }
};

// ==========================================
// Q7 LOGIC (Module Parsing)
// ==========================================
function extractQ7(config) {
    const module519Path = path.join(config.sourceDir, config.module519);
    const module518Path = path.join(config.sourceDir, config.module518);

    if (!fs.existsSync(module519Path)) {
        console.warn(`[Q7] Module 519 not found at ${module519Path}. Skipping...`);
        return null;
    }

    console.log(`[Q7] Reading ${module519Path}...`);
    const content = fs.readFileSync(module519Path, "utf8");

    // Extract basic structures (faults, states, modes)
    const faults = [];
    const seenIds = new Set();
    const faultAssign = "r3['FAULT_STATUS'] = r6;";
    const assignIdx = content.indexOf(faultAssign);
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

    // Additional faults
    const extraRegex = /r6\['([a-zA-Z0-9_]+)'\]\s*=\s*(\d+);/g;
    let m2;
    while ((m2 = extraRegex.exec(content)) !== null) {
        if (!seenIds.has(m2[2])) {
            faults.push({ code: m2[2], internal: m2[1] });
            seenIds.add(m2[2]);
        }
    }

    // Device States
    const deviceStates = [];
    const subtitleMatch = content.match(/r3\['SUBTITLE_STATUS'\]\s*=\s*r6;/);
    if (subtitleMatch) {
        const startR6 = content.lastIndexOf("r6 = {", subtitleMatch.index);
        if (startR6 !== -1) {
            const subBlock = content.substring(startR6, subtitleMatch.index);
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
    if (robotTypeMatch) {
        const startR6 = content.lastIndexOf("r6 = {", robotTypeMatch.index);
        if (startR6 !== -1) {
            const subBlock = content.substring(startR6, robotTypeMatch.index);
            const regex = /'([a-zA-Z0-9_]+)'\s*:\s*(\d+)/g;
            let sm;
            while ((sm = regex.exec(subBlock)) !== null) {
                robotModes.push({ name: sm[1], value: sm[2] });
            }
        }
    }

    // Translations
    const translations = {};
    const languages = [];
    if (fs.existsSync(module518Path)) {
        console.log(`[Q7] Reading ${module518Path}...`);
        const content518 = fs.readFileSync(module518Path, "utf8");
        const langRegex = /r1\['([a-zA-Z_-]+)'\]\s*=\s*r0;/g;
        let lm;
        while ((lm = langRegex.exec(content518)) !== null) {
            if (!languages.includes(lm[1])) languages.push(lm[1]);
        }

        for (const lang of languages) {
            translations[lang] = { general: {}, faults: {} };
            const marker = `r1['${lang}'] = r0;`;
            const markerIndex = content518.indexOf(marker);
            if (markerIndex === -1) continue;

            const startMarker = "r0 = {";
            const startIndex = content518.lastIndexOf(startMarker, markerIndex);
            if (startIndex === -1) continue;

            const block = content518.substring(startIndex, markerIndex);
            const decodeTx = (raw, quote) => {
                try {
                    if (quote === "'") {
                         return new Function("return '" + raw + "'")();
                    } else {
                         return JSON.parse('"' + raw + '"');
                    }
                } catch (e) {
                    return raw.replace(/\\n/g, "\n");
                }
            };

            const allKeyRegex = /'([a-zA-Z0-9_]+)'\s*:\s*(['"])(.*?)\2/g;
            let m;
            while ((m = allKeyRegex.exec(block)) !== null) {
                const fullKey = m[1];
                const text = decodeTx(m[3], m[2]);
                if (fullKey.startsWith("fault_")) {
                    const core = fullKey.replace("fault_title_", "").replace("fault_summery_", "");
                    const isTitle = fullKey.startsWith("fault_title_");
                    const parts = core.split("_");
                    let code = parts[0];
                    // Very basic handling, Q7 script had ranges but let's simplify for brevity if possible,
                    // or copy exact logic. Copying exact logic is safer.
                    // RE-USING Q7 LOGIC FOR ACCURACY:
                    if (parts.length === 2 && /^\d+$/.test(parts[0]) && /^\d+$/.test(parts[1])) {
                        const start = parseInt(parts[0]);
                        const end = parseInt(parts[1]);
                        for(let c=start; c<=end; c++) {
                            const cKey = String(c);
                            if(!translations[lang].faults[cKey]) translations[lang].faults[cKey] = {};
                            if(isTitle) translations[lang].faults[cKey].title = text;
                            else translations[lang].faults[cKey].summary = text;
                        }
                    } else {
                        if(!translations[lang].faults[core]) translations[lang].faults[core] = {};
                        if(isTitle) translations[lang].faults[core].title = text;
                        else translations[lang].faults[core].summary = text;
                    }
                } else {
                    translations[lang].general[fullKey] = text;
                }
            }
        }
    }

    // Assemble Dataset
    const dataset = {
        meta: { languages, generated: new Date().toISOString() },
        fault_codes: {},
        device_states: deviceStates,
        robot_modes: robotModes,
        translations: {}, // Required by RoborockLocales interface
        general_translations: {}
    };

    faults.forEach(f => {
        dataset.fault_codes[f.code] = { internal: f.internal };
        languages.forEach(lang => {
            const fData = translations[lang] && translations[lang].faults && translations[lang].faults[f.code];
            if (fData) {
                if (!dataset.fault_codes[f.code][lang]) dataset.fault_codes[f.code][lang] = {};
                if (fData.title) dataset.fault_codes[f.code][lang].title = fData.title;
                if (fData.summary) dataset.fault_codes[f.code][lang].summary = fData.summary;
            }
        });
    });

    languages.forEach(lang => {
        if(translations[lang]) {
            dataset.general_translations[lang] = translations[lang].general;
            // Also populate translations if we have specific ones? For now leave empty to satisfy type.
        }
    });

    return { dataset, languages };
}

// ==========================================
// S7 MAXV LOGIC (App Strings)
// ==========================================
function extractS7(config) {
    if (!fs.existsSync(config.sourceDir)) {
        console.warn(`[S7_MaxV] Directory not found: ${config.sourceDir}. Skipping...`);
        return null;
    }

    const files = fs.readdirSync(config.sourceDir);
    const regex = /projects_comroborocktanos_common_localizationstrings_([a-z]+)_strings\.json/;

    // Structure for S7 Dataset (simpler than Q7, mostly just errors)
    const dataset = {}; // We want it to be compatible/similar structure?
    // The previous error script outputted: { "en": { "1": "Error..." }, ... }
    // Q7 outputs: { meta: ..., fault_codes: { "1": { internal: "...", en: { title: "..." } } } }
    // User asked for "one json ... for each robot".
    // It would be nice if they had the same structure.
    // However, refactoring the S7 usage in the Adapter (VacuumFeatures) to use Q7-like structure is a bigger change.
    // The user just wants a generated JSON. The adapter currently expects the simple format for S7 fallback.
    // I will KEEP the simple format for S7 for now to avoid breaking the adapter,
    // BUT I could also generate a Q7-style dataset if desired.
    // Given the task is "consolidate scripts", I shouldn't break the adapter.
    // So I will produce the SAME JSON structure as before for S7, but named s7_maxv_dataset.json.

    const allTranslations = {};

    files.forEach(file => {
        const match = file.match(regex);
        if (match) {
            const langCode = match[1];
            const content = fs.readFileSync(path.join(config.sourceDir, file), 'utf-8');
            try {
                const json = JSON.parse(content);
                const errors = {};
                let count = 0;
                for (const [code, key] of Object.entries(config.errorMapping)) {
                    if (json[key]) {
                        errors[code] = json[key];
                        count++;
                    }
                }

                if (count > 0) {
                    allTranslations[langCode] = errors;
                }
            } catch (e) {
                console.error(`[S7_MaxV] Error parsing ${file}:`, e);
            }
        }
    });

    return { dataset: allTranslations, languages: Object.keys(allTranslations) };
}

// ==========================================
// DOCUMENTATION GENERATION
// ==========================================
function generateDocs(robotName, data, config) {
    if (!fs.existsSync(config.docDir)) {
        fs.mkdirSync(config.docDir, { recursive: true });
    }

    console.log(`[${robotName}] Generating docs in ${config.docDir}...`);

    if (robotName === "Q7") {
        // Q7 specific docs (complex)
        const languages = data.languages;
        const dataset = data.dataset;

        // README Index
        let indexMd = `# 📚 ${robotName} Protocol Values - Index\n\n`;
        indexMd += `Translation mapping for ${robotName}.\n\n`;
        indexMd += "| Language | Documentation |\n| :--- | :--- |\n";
        languages.forEach(lang => {
            const fileName = `${lang}.md`;
            const label = lang.toUpperCase();
            indexMd += `| **${lang}** | [📖 View ${label}](./${fileName}) |\n`;
        });
        fs.writeFileSync(path.join(config.docDir, "README.md"), indexMd);

        // Language files
        languages.forEach(lang => {
             const fileName = `${lang}.md`;
             let md = `# 🤖 ${robotName} Protocol Values (${lang.toUpperCase()})\n\n`;

             // States
             if (dataset.device_states && dataset.device_states.length > 0) {
                 md += "## Device States\n| Name | Value |\n|---|---:|\n";
                 dataset.device_states.sort((a,b)=>a.value-b.value).forEach(i => md += `| ${i.name} | ${i.value} |\n`);
                 md += "\n";
             }

             // Faults
             md += "## Fault Codes\n| ID | Internal | Title | Summary |\n|---:|---|---|---|\n";
             Object.entries(dataset.fault_codes).sort((a,b)=>parseInt(a[0])-parseInt(b[0])).forEach(([code, d]) => {
                 const t = d[lang]?.title || "-";
                 const s = d[lang]?.summary || "-";
                 md += `| ${code} | \`${d.internal}\` | ${t} | ${s.replace(/\n/g, '<br>')} |\n`;
             });

             fs.writeFileSync(path.join(config.docDir, fileName), md);
        });

    } else {
        // S7 Simple docs
        const errors = data.dataset;
        const languages = data.languages;

        // README Index
        let indexMd = `# 📚 ${robotName} Protocol Values - Index\n\n`;
        indexMd += `Translation mapping for ${robotName}.\n\n`;
        indexMd += "| Language | Documentation |\n| :--- | :--- |\n";
        languages.forEach(lang => {
            const fileName = `${lang}.md`;
            const label = lang.toUpperCase();
            indexMd += `| **${lang}** | [📖 View ${label}](./${fileName}) |\n`;
        });
        fs.writeFileSync(path.join(config.docDir, "README.md"), indexMd);

        languages.forEach(lang => {
            const codes = errors[lang];
            const mdContent = [];
            mdContent.push(`# Error Codes (Language: ${lang})`);
            mdContent.push(``);
            mdContent.push(`| Code | Description |`);
            mdContent.push(`|---:|---|`);

            Object.keys(codes).sort((a, b) => Number(a) - Number(b)).forEach(code => {
                mdContent.push(`| ${code} | ${codes[code]} |`);
            });

            const filename = `${lang}.md`;
            fs.writeFileSync(path.join(config.docDir, filename), mdContent.join('\n'), 'utf-8');
        });
    }
}


// ==========================================
// MAIN
// ==========================================
function main() {
    console.log("Starting Protocol Extraction...");

    for (const [name, config] of Object.entries(SOURCES)) {
        console.log(`\n--- Processing ${name} ---`);
        let result = null;

        try {
            if (config.type === "module_parsing") {
                result = extractQ7(config);
            } else if (config.type === "app_strings") {
                result = extractS7(config);
            }

            if (result && result.dataset) {
                // Write JSON
                console.log(`Writing JSON to ${config.outputJson}`);
                fs.writeFileSync(config.outputJson, JSON.stringify(result.dataset, null, 2), 'utf-8');

                // Generate Docs
                generateDocs(name, result, config);
            } else {
                console.warn(`No data extracted for ${name}.`);
            }
        } catch (error) {
            console.error(`Failed to process ${name}:`, error);
        }
    }
}

main();
