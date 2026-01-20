const fs = require('fs');
const path = require('path');

// Configuration
const modulePath = process.env.SOURCE_MODULE || path.join(__dirname, '../.Roborock Q7 Series/output/module_518.js');
const datasetPath = path.join(__dirname, '../lib/protocols/q7_dataset.json');

// Translations automatically loaded from admin/words.js below

console.log(`Starting extraction from ${modulePath}...`);

try {
    const content = fs.readFileSync(modulePath, 'utf8');
    const dataset = JSON.parse(fs.readFileSync(datasetPath, 'utf8'));

    // Regex to find r0 = { ... }; r1['lang'] = r0;
    // Updated regex with backreference to ensure we match the correct variable assignment
    const langRegex = /(r\d+|ot\d+)\s*=\s*({[\s\S]*?});\s*(?:r\d+|ot\d+)\[['"]([a-z-]+)['"]\]\s*=\s*\1;/g;



    let match;
    const allTranslations = {};
    let count = 0;

    while ((match = langRegex.exec(content)) !== null) {
        const objStr = match[2];
        const lang = match[3];

        try {
            // Safer parsing: Convert JS object literal syntax to valid JSON
            const jsonCompatibleStr = objStr
                .replace(/([\{,])\s*([a-zA-Z0-9_]+)\s*:/g, '$1"$2":')
                .replace(/:\s*'([^']*)'/g, ':"$1"')
                .replace(/,\s*([\}\]])/g, '$1');

            let obj;
            try {
                obj = JSON.parse(jsonCompatibleStr);
            } catch (e) {
                // Legacy fallback for complex objects (still safer with the .startsWith("{") check)
                obj = (new Function('"use strict"; return (' + objStr + ')'))();
            }

            if (obj && typeof obj === "object") {
                allTranslations[lang] = obj;
                count++;
                console.log(`Extracted: ${lang}`);
            } else {
                 console.error(`Invalid object extracted for language: ${lang}`);
            }
        } catch (e) {
            console.error(`CRITICAL: Failed to parse language block for ${lang}.`);
            console.error(`Source fragment starting with: ${objStr.substring(0, 200)}...`);
            console.error(`Error: ${e.message}`);
        }
    }

    if (count === 0) {
        console.error('No translations found! Check the regex and file content.');
        process.exit(1);
    }

    console.log(`Successfully extracted ${count} languages.`);

    // 1. Merge Fault Codes
    console.log('Merging fault codes...');
    for (const lang in allTranslations) {
        const dict = allTranslations[lang];
        for (const key in dict) {
            if (key.startsWith('fault_title_') || key.startsWith('fault_summary_') || key.startsWith('fault_summery_')) {
                // Extract code from keys like 'fault_title_500' or 'fault_title_502_518'
                const parts = key.split('_');
                const codes = parts.slice(2)
                    .map(p => p.trim())
                    .filter(p => /^\d+$/.test(p));

                if (codes.length === 0) continue;
                const type = key.includes('title') ? 'title' : 'summary';

                for (const code of codes) {
                    if (!dataset.fault_codes[code]) {
                        dataset.fault_codes[code] = { internal: `F_${code}` };
                    }
                    if (!dataset.fault_codes[code][lang]) {
                        dataset.fault_codes[code][lang] = {};
                    }
                    if (dict[key]) {
                        const entry = dict[key];
                        if (typeof entry === "object" && entry !== null) {
                            // Extract title/summary/msg or fallback to empty string if all missing
                            dataset.fault_codes[code][lang][type] = entry.title || entry.summary || entry.msg || "";
                        } else {
                            dataset.fault_codes[code][lang][type] = entry || "";
                        }
                    }
                }
            }
        }
    }

    // 2. Add General Translations (UI strings, etc.)
    console.log('Adding general translations...');
    if (!dataset.translations) dataset.translations = {};
    for (const lang in allTranslations) {
        if (!dataset.translations[lang]) {
            dataset.translations[lang] = {};
        }
        // Always iterate and merge to ensure we don't accidentally shadow
        for (const [key, value] of Object.entries(allTranslations[lang])) {
            if (!dataset.translations[lang][key]) {
                dataset.translations[lang][key] = value;
            } else if (dataset.translations[lang][key] !== value) {
                console.warn(`[Warn] Skipping duplicate translation for '${key}' in '${lang}' (Existing: "${dataset.translations[lang][key]}", New: "${value}")`);
            }
        }
    }




    // 3. Update meta.languages
    console.log('Updating metadata...');
    const languages = Object.keys(allTranslations);
    dataset.meta.languages = [...new Set([...dataset.meta.languages, ...languages])].sort();
    dataset.meta.generated = new Date().toISOString();

    // 4. Extract Attribute Mappings from module_524.js
    const dir = path.dirname(modulePath);
    const module524Path = path.join(dir, 'module_524.js');

    if (fs.existsSync(module524Path)) {
        console.log(`Extracting attribute mappings from ${module524Path}...`);
        const content524 = fs.readFileSync(module524Path, 'utf8');

        // Manual overrides for attributes where the standard mapping (deviceX) does not match the translation key
        const MANUAL_ATTRIBUTE_MAPPINGS = {
            "cleaning_area": "clean_record_clean_area", // "Reinigungsbereich"
            "cleaning_time": "clean_record_clean_time", // "Reinigungszeit"
            "clean_time": "clean_record_clean_time",
            "real_clean_time": "clean_record_clean_time",
            "total_clean_time": "clean_record_clean_time",
            "last_clean_area": "clean_record_clean_area",
            "pv_charging": "home_charge_charging", // "Ladevorgang..."
            "add_sweep_status": "home_cleaning_add_clean", // "Re-cleaning"
            "current_map_id": "order_clean_map", // "Cleaning Map" / "Reinigungskarte" (Best native match)
            "custom_type": "home_clean_panel_custom", // "Custom" / "Benutzerdefiniert"
            "dust_action": "home_subtitle_device_dusting", // "Emptying..." / "Entleeren ..."
            "map_num": "mapEdit_map_manager", // "Manage Maps" / "Karten verwalten" (Best native match)

            "tank_state": "water_tank", // Mapped to 'water_tank' (requires addition to admin/words.js)
            "cloth_state": "setting_consumable_mop", // "Wischen"
            "time_zone_info": "setting_device_robert_timezone",
            "time_zone": "setting_device_robert_timezone",
            "error_code": "common_abnormal",
            "fault": "common_abnormal",
            "fan_power": "home_clean_panel_select_wind", // "Saugleistung"
            "wind": "home_clean_panel_select_wind", // "Saugleistung"
            "water_box_mode": "home_clean_panel_select_water", // "Wasserfluss"
            "water": "home_clean_panel_select_water", // "Wasserfluss"
            "mop_mode": "home_clean_panel_select_clean_route", // "Reinigungsstrecke"
            "quantity": "battery", // Mapped to 'battery' (standard i18n key in admin/words.js)
            "battery": "battery",

            "recommend": "common_alert",
            "status": "status",
            "state": "status",
            "mode": "order_clean_mode_new", // "Reinigungsmodus"
            "work_mode": "order_clean_mode_new",
            "clean_finish": "clean_record_last_time",
            "clean_type": "clean_record_clean_type",
            "charge_state": "home_navigation_charging", // "Aufladen"
            "completion_type": "clean_record_clean_type",
            "sweep_type": "home_clean_panel_select_clean_route", // "Reinigungsstrecke"
            "clean_path_preference": "home_clean_panel_select_clean_route",
            "multi_floor": "guide_multifloors",
            "build_map": "home_subtitle_device_build_map",
            "dust_collection_status": "home_subtitle_device_dusting",
            "language": "setting_standard_voice",
            "quiet_is_open": "guide_nodisturbmode",
            "repeat_state": "home_clean_panel_select_clean_times",
            "network_info": "device_network_name",
            "firmware_version": "device_firmware_version",
            "serial_number": "device_sn"
        };

        const mappings = {};
        // Fix regex typo (=\\s* -> =\s*) and expand to support dot notation and other assignment styles
        const moduleMappingRegex = /(?:_closure1_slot1|r\d+|ot\d+)(?:\[['"](\w+)['"]\]|\.(\w+))\s*=\s*(?:r\d+\.|_closure\d+_slot\d+\.|ot\d+\.)(\w+);/g;
        let mapMatch;
        let mapCount = 0;

        while ((mapMatch = moduleMappingRegex.exec(content524)) !== null) {
            const label = mapMatch[1] || mapMatch[2]; // handle both bracket and dot notation
            const attr = mapMatch[3];

            if (attr.length > 2 && label && label.startsWith('device')) {
                // Use manual mapping if available, else standard
                mappings[attr] = MANUAL_ATTRIBUTE_MAPPINGS[attr] || label;
                mapCount++;
            }
        }

        // Ensure manual mappings are preserved even if regex missed them
        for (const [key, val] of Object.entries(MANUAL_ATTRIBUTE_MAPPINGS)) {
             if (!mappings[key]) mappings[key] = val;
        }

        dataset.attribute_mappings = mappings;
        console.log(`Extracted ${Object.keys(mappings).length} attribute mappings.`);
    } else {
        console.warn(`module_524.js not found at ${module524Path}, skipping attribute mapping extraction.`);
    }

    // 5. Extract Status Mappings
    // module_519.js defines SUBTITLE_STATUS = { 'IDEL': 1, ... }
    // module_523.js maps SUBTITLE_STATUS.IDEL -> 'home_subtitle_device_wait_clean'
    const module519Path = path.join(dir, 'module_519.js');
    const module523Path = path.join(dir, 'module_523.js');

    if (fs.existsSync(module519Path) && fs.existsSync(module523Path)) {
        console.log(`Extracting status mappings from ${module519Path} and ${module523Path}...`);

        const content519 = fs.readFileSync(module519Path, 'utf8');
        const content523 = fs.readFileSync(module523Path, 'utf8');

        // Extract Status Constants from 519
        // Matches: r6 = {'IDEL': 1, ...}; \n ... r3['SUBTITLE_STATUS'] = r6;
        // Use backreference \1 to match the variable name (e.g. r6)
        // Use [^;]*? to avoid consuming multiple statements if the variable is reused
        const statusConstMatch = /(r\d+)\s*=\s*({[^;]*?});\s*r\d+\['SUBTITLE_STATUS'\]\s*=\s*\1;/.exec(content519);
        let statusConstants = {};
        if (statusConstMatch) {
             const objStr = statusConstMatch[2]; // Group 2 is the object string
             try {
                statusConstants = (new Function('"use strict"; return (' + objStr + ')'))();
             } catch (e) {
                 console.error('Failed to parse status constants:', e);
             }
        }

        // Extract ROBOT_TYPE Constants from 519 (similar pattern)
        const robotTypeMatch = /(r\d+)\s*=\s*({[^;]*?});\s*r\d+\['ROBOT_TYPE'\]\s*=\s*\1;/.exec(content519);
        let robotTypeConstants = {};
        if (robotTypeMatch) {
             const objStr = robotTypeMatch[2];
             try {
                // NOTE: Using Function constructor to parse JS object literal. Trusted local source.
                robotTypeConstants = (new Function('"use strict"; return (' + objStr + ')'))();
                console.log(`Parsed ROBOT_TYPE constants: ${Object.keys(robotTypeConstants).length} entries.`);
             } catch (e) {
                 console.error('Failed to parse ROBOT_TYPE constants:', e);
             }
        }

        // Save constants to dataset for documentation generation
        dataset.constants = {
            SUBTITLE_STATUS: statusConstants,
            ROBOT_TYPE: robotTypeConstants
        };
        // Manual mapping based on known Roborock Q7 constants.
        // The regex approach failed because the code separates the constant access from the string return.
        const MANUAL_STATUS_KEYS = {
            "CLEANNING": "home_subtitle_device_wait_clean",
            "CHARGING": "home_charge_charging",
            "PAUSE": "home_clean_mode_clean_pause",
            "ERROR": "common_abnormal",
            "WORKING_DUSTING": "home_subtitle_device_working_back_dusting",
            "IDEL": "home_subtitle_device_idel",
            "SLEEP": "home_subtitle_device_sleep",
            "WAIT_INSTRUCTION": "home_subtitle_device_wait_instruction",
            "REMOTE_CONTROl": "home_subtitle_device_remote_control",
            "UPGRADING": "home_subtitle_device_upgrading",
            "DUSTING": "home_subtitle_device_dusting",
            "RECHARGING": "home_subtitle_device_recharging",
            "BUILD_MAP": "home_subtitle_device_build_map",
            "CLEAN_REPEAT": "home_subtitle_device_cleaning_repeat",
            "BREAK_CHARGING": "home_subtitle_device_break_charging",
            "BREAK_RECHARGING": "home_subtitle_device_break_recharge",
            "SELF_CHECK": "home_subtitle_device_self_check",
            "RELOCTION": "home_subtitle_device_reloaction",
            "CHARGE_FULL": "home_subtitle_device_charge_full",
            "WORKING_SLEEP": "home_subtitle_device_sleep"
        };

        const statusMap = {};
        let statusCount = 0;

        for (const [key, value] of Object.entries(statusConstants)) {
            const translationKey = MANUAL_STATUS_KEYS[key] || ('home_subtitle_device_' + key.toLowerCase());
            statusMap[value] = translationKey;
            statusCount++;
        }

        dataset.status_map = statusMap;
        console.log(`Extracted ${statusCount} status mappings using automated analysis.`);

        // 5. Generate Documentation and Validate Translations
        generateDocumentation(dataset);



    } else {
        console.warn('module_519.js or module_523.js not found, skipping status extraction.');
    }

    // 6. Save back to q7_dataset.json
    console.log(`Saving updated dataset to ${datasetPath}...`);
    fs.writeFileSync(datasetPath, JSON.stringify(dataset, null, 2));

    console.log('Done!');

} catch (err) {
    console.error('Extraction failed:', err);
    process.exit(1);
}

function generateDocumentation(dataset) {
    const docsDir = path.join(__dirname, '../docs/protocols/Q7');
    if (!fs.existsSync(docsDir)) {
        fs.mkdirSync(docsDir, { recursive: true });
    }

    const languages = Object.keys(dataset.translations || {});
    const masterKeys = new Set(Object.keys(dataset.translations['en'] || {}));
    let totalMissing = 0;

    console.log(`\n--- Documentation Generation & Validation ---`);
    console.log(`Target Directory: ${docsDir}`);

    languages.forEach(lang => {
        const translations = dataset.translations[lang];
        const missingKeys = [];

        // Validation: Check for missing keys against master (en)
        if (lang !== 'en') {
            for (const key of masterKeys) {
                if (!translations[key]) {
                    missingKeys.push(key);
                }
            }
            if (missingKeys.length > 0) {
                totalMissing += missingKeys.length;
                console.warn(`[${lang.toUpperCase()}] Missing ${missingKeys.length} translations: ${missingKeys.slice(0, 5).join(', ')}...`);
            }
        }

        // Generate Markdown Content
        let md = `# 🤖 Roborock Q7 Protocol Values (${lang.toUpperCase()})\n\n`;
        md += `This document contains the complete translation mapping and internal constants for the Q7 series protocol.\n\n---\n\n`;

        // Constants Section
        md += `## ⚙️ Protocol Definitions (Constants)\n\n`;

        if (dataset.constants && dataset.constants.SUBTITLE_STATUS) {
            md += `### 🚦 Device States (\`SUBTITLE_STATUS\`)\n`;
            md += `| State Name | Internal Value |\n| :--- | :--- |\n`;
            for (const [name, val] of Object.entries(dataset.constants.SUBTITLE_STATUS)) {
                md += `| \`${name}\` | \`${val}\` |\n`;
            }
            md += `\n---\n\n`;
        }

        if (dataset.constants && dataset.constants.ROBOT_TYPE) {
            md += `### 🕹️ Robot Modes (\`ROBOT_TYPE\`)\n`;
            md += `| Mode Name | Internal Value |\n| :--- | :--- |\n`;
            for (const [name, val] of Object.entries(dataset.constants.ROBOT_TYPE)) {
                md += `| \`${name}\` | \`${val}\` |\n`;
            }
            md += `\n---\n\n`;
        }

        // Fault Codes Section
        md += `## ⚠️ Fault Codes\n\n`;
        md += `> [!NOTE]\n> Fault codes are reported via the \`fault\` status property. Use the table below to map the numeric ID to a localized message.\n\n`;
        md += `| ID | Internal Key | Title | Detailed Summary |\n| :--- | :--- | :--- | :--- |\n`;

        const sortedFaults = Object.entries(dataset.fault_codes || {}).sort((a, b) => parseInt(a[0]) - parseInt(b[0]));
        for (const [code, faultObj] of sortedFaults) {
            const entry = faultObj[lang];
            const title = (typeof entry === "object" ? entry?.title : entry) || '-';
            const summary = (typeof entry === "object" ? entry?.summary : '-') || '-';
            const internalKey = faultObj.internal || code;
            md += `| **${code}** | \`${internalKey}\` | ${title.replace(/\n/g, '<br>')} | ${summary.replace(/\n/g, '<br>')} |\n`;
        }
        md += `\n---\n\n`;

        // General Translations Section
        md += `## 🌐 General Translations\n\n`;
        md += `| Key | Localized Value |\n| :--- | :--- |\n`;

        const sortedKeys = Object.keys(translations).sort();
        for (const key of sortedKeys) {
             md += `| \`${key}\` | ${translations[key].replace(/\n/g, '<br>')} |\n`;
        }

        const filename = `Q7_Values_${lang.toUpperCase()}.md`;
        fs.writeFileSync(path.join(docsDir, filename), md);
    });

    console.log(`Successfully generated documentation for ${languages.length} languages.`);
    if (totalMissing > 0) {
        console.warn(`\n⚠️  Total missing translations across all languages: ${totalMissing}`);
    } else {
        console.log(`\n✅ All languages are fully translated!`);
    }
}
