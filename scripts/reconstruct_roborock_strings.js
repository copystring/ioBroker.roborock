const fs = require('fs');
const path = require('path');

// Configuration
const BUNDLE_DECOMPILED_DIR = path.join(__dirname, '../.AppPlugins/S7 MaxV/8328da4abbd14f0f99d6c32e17af5a8b/index.android.bundle.decompiled');
const TARGET_FILE = path.join(__dirname, '../lib/protocols/roborock_strings.json');

/**
 * Robustly decode JS strings including \xHH, \uXXXX, etc.
 */
function decodeString(str) {
    try {
        // We wrap in quotes to make it a string literal, then evaluate
        return new Function('return "' + str + '"')();
    } catch (e) {
        return str;
    }
}

/**
 * Finds the language registry (usually 470.js in this bundle)
 * which maps language codes to internal module files.
 */
function findLanguageRegistry(files) {
    console.log("Searching for language registry file (containing 'exports.allLangs')...");
    for (const file of files) {
        const filePath = path.join(BUNDLE_DECOMPILED_DIR, file);
        const content = fs.readFileSync(filePath, 'utf8');

        if (content.includes('exports.allLangs = {')) {
            console.log(`Found language registry in ${file}.`);

            // 1. Map internal module variables to their file IDs
            // e.g., var module471 = require("./471")
            const varToId = {};
            const requireRegex = /(module\d+)\s*=\s*require\("\.\/(\d+)"\)/g;
            let reqMatch;
            while ((reqMatch = requireRegex.exec(content)) !== null) {
                varToId[reqMatch[1]] = reqMatch[2];
            }

            // 2. Map language codes to file IDs using the 'exports.allLangs' object
            // e.g., en: module471
            const mapping = {};
            const langBlockMatch = /exports\.allLangs\s*=\s*({[\s\S]*?});/.exec(content);
            if (langBlockMatch) {
                const block = langBlockMatch[1];
                const keyValRegex = /"?([a-zA-Z0-9-]+)"?\s*:\s*(module\d+)/g;
                let kvMatch;
                while ((kvMatch = keyValRegex.exec(block)) !== null) {
                    const lang = kvMatch[1];
                    const varName = kvMatch[2];
                    if (varToId[varName]) {
                        mapping[lang] = varToId[varName] + '.js';
                    }
                }
            }

            if (Object.keys(mapping).length > 0) {
                return mapping;
            }
        }
    }
    return null;
}

/**
 * Primary extraction logic.
 */
function extractStrings() {
    if (!fs.existsSync(BUNDLE_DECOMPILED_DIR)) {
        console.error(`Directory not found: ${BUNDLE_DECOMPILED_DIR}`);
        return;
    }

    const translations = {};
    const files = fs.readdirSync(BUNDLE_DECOMPILED_DIR).filter(f => f.endsWith('.js'));
    console.log(`Analyzing ${files.length} files...`);

    // We use the deterministic registry discovered in the bundle code.
    const registryMapping = findLanguageRegistry(files);

    if (!registryMapping) {
        console.error("CRITICAL ERROR: Language mapping registry (exports.allLangs) not found in bundle!");
        process.exit(1);
    }

    console.log("Using official language mapping from bundle registry:");
    console.log(JSON.stringify(registryMapping, null, 2));

    for (let [lang, filename] of Object.entries(registryMapping)) {
        lang = lang.toLowerCase();
        const filePath = path.join(BUNDLE_DECOMPILED_DIR, filename);
        if (!fs.existsSync(filePath)) {
            console.warn(`Warning: Mapped file ${filename} for language '${lang}' does not exist on disk.`);
            continue;
        }

        console.log(`Extracting ${lang} from ${filename}...`);
        const content = fs.readFileSync(filePath, 'utf8');

        // Extract all key-value pairs formatted as: key: "value"
        const extractRegex = /^\s*([a-zA-Z0-9_]+)\s*:\s*\"(.*?)\",?/gm;
        let match;
        const fileTranslations = {};

        while ((match = extractRegex.exec(content)) !== null) {
            const key = match[1];
            const val = decodeString(match[2]);
            fileTranslations[key] = val;
        }

        // Store in global object, merging if multiple files point to same lang
        if (!translations[lang]) translations[lang] = {};
        Object.assign(translations[lang], fileTranslations);
        console.log(`   Done. Extracted ${Object.keys(fileTranslations).length} keys.`);
    }

    // Sort languages keys alphabetically for a clean output
    const sortedTranslations = Object.keys(translations).sort().reduce((acc, key) => {
        acc[key] = translations[key];
        return acc;
    }, {});

    // Ensure output directory exists
    const outDir = path.dirname(TARGET_FILE);
    if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
    }

    // Write final JSON
    fs.writeFileSync(TARGET_FILE, JSON.stringify(sortedTranslations, null, 4));
    console.log(`\nSUCCESS: Generated ${TARGET_FILE}`);
    console.log(`Included languages: ${Object.keys(sortedTranslations).join(', ')}`);
}

extractStrings();
