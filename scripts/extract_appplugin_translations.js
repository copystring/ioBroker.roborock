#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const REPO_ROOT = path.join(__dirname, "..");
const DEFAULT_APPPLUGINS_ROOT = path.join(REPO_ROOT, ".AppPlugins");
const DEFAULT_OUTPUT_PATH = path.join(REPO_ROOT, "lib", "protocols", "roborock_strings.json");
const HERMES_MAGIC = "c61fbc03c103191f";
const KNOWN_LANGUAGE_CODES = new Set([
    "ar",
    "bg",
    "cs",
    "da",
    "de",
    "en",
    "en-US",
    "es",
    "es-LA",
    "fi",
    "fr",
    "he",
    "hr",
    "hu",
    "id",
    "it",
    "ja",
    "ko",
    "ms",
    "nb",
    "nl",
    "no",
    "pl",
    "pt",
    "pt-BR",
    "ro",
    "ru",
    "sk",
    "sr",
    "sv",
    "th",
    "tr",
    "uk",
    "vi",
    "zh-CN",
    "zh-Hans",
    "zh-Hant",
    "zh-HK",
    "zh-TW",
]);

function parseArgs(argv) {
    const options = {
        root: DEFAULT_APPPLUGINS_ROOT,
        out: DEFAULT_OUTPUT_PATH,
        plugin: undefined,
        noWrite: false,
        quiet: false,
    };

    for (let index = 0; index < argv.length; index++) {
        const arg = argv[index];
        if (arg === "--root" && argv[index + 1]) {
            options.root = path.resolve(argv[++index]);
        } else if (arg === "--out" && argv[index + 1]) {
            options.out = path.resolve(argv[++index]);
        } else if (arg === "--plugin" && argv[index + 1]) {
            options.plugin = argv[++index];
        } else if (arg === "--no-write") {
            options.noWrite = true;
        } else if (arg === "--quiet") {
            options.quiet = true;
        } else if (arg === "--help" || arg === "-h") {
            printHelp();
            process.exit(0);
        } else {
            throw new Error(`Unknown argument: ${arg}`);
        }
    }

    return options;
}

function printHelp() {
    console.log(`Usage: node scripts/extract_appplugin_translations.js [options]

Options:
  --root <dir>      Root directory containing .AppPlugins (default: ${DEFAULT_APPPLUGINS_ROOT})
  --out <path>      Output file or directory. Default merges into ${DEFAULT_OUTPUT_PATH}
  --plugin <name>   Only process a matching AppPlugin path or model name (for example "Saros Z70")
  --no-write        Analyze and print a summary without writing files
  --quiet           Reduce console output
  --help            Show this help text
`);
}

function log(options, message) {
    if (!options.quiet) {
        console.log(message);
    }
}

function isJsonFilePath(targetPath) {
    return path.extname(targetPath).toLowerCase() === ".json";
}

function normalizeLanguageCode(code) {
    if (typeof code !== "string") {
        return null;
    }
    const trimmed = code.trim().replace(/_/g, "-");
    if (!trimmed) {
        return null;
    }
    const normalized = trimmed.toLowerCase();
    if (normalized === "cn") {
        return "zh-CN";
    }
    if (normalized === "tw") {
        return "zh-TW";
    }
    if (normalized === "hk") {
        return "zh-HK";
    }
    if (normalized === "us") {
        return "en";
    }
    if (normalized === "kr") {
        return "ko";
    }
    if (normalized === "my") {
        return "ms";
    }
    if (normalized === "in") {
        return "id";
    }
    if (normalized === "zh-cn") {
        return "zh-CN";
    }
    if (normalized === "zh-tw") {
        return "zh-TW";
    }
    if (normalized === "zh-hk") {
        return "zh-HK";
    }
    if (normalized === "zh-hans") {
        return "zh-Hans";
    }
    if (normalized === "zh-hant") {
        return "zh-Hant";
    }
    if (normalized === "es-la") {
        return "es-LA";
    }
    const canonical = trimmed.length === 2 ? normalized : trimmed.replace(/^[A-Za-z]{2,3}/, (match) => match.toLowerCase());
    return KNOWN_LANGUAGE_CODES.has(canonical) ? canonical : null;
}

function safeReadText(filePath) {
    return fs.readFileSync(filePath, "utf8");
}

function safeReadBytes(filePath, byteCount) {
    const handle = fs.openSync(filePath, "r");
    try {
        const buffer = Buffer.alloc(byteCount);
        const bytesRead = fs.readSync(handle, buffer, 0, byteCount, 0);
        return buffer.subarray(0, bytesRead);
    } finally {
        fs.closeSync(handle);
    }
}

function detectBundleKind(bundlePath) {
    if (!bundlePath || !fs.existsSync(bundlePath)) {
        return { kind: "missing", reason: "bundle missing" };
    }

    const header = safeReadBytes(bundlePath, 1024);
    const headerHex = header.subarray(0, 8).toString("hex");
    if (headerHex === HERMES_MAGIC) {
        return { kind: "hermes-bytecode", reason: "matched Hermes bytecode magic" };
    }

    const headerText = header.toString("utf8");
    if (headerText.includes("__BUNDLE_START_TIME__") || headerText.includes("__d(")) {
        return { kind: "metro-js", reason: "matched Metro bundle text markers" };
    }

    const printableChars = [...headerText].filter((char) => {
        const code = char.charCodeAt(0);
        return code === 9 || code === 10 || code === 13 || (code >= 32 && code <= 126);
    }).length;

    if (header.length > 0 && printableChars / header.length > 0.8) {
        return { kind: "unknown-text", reason: "header looks like text but no Metro marker was found" };
    }

    return { kind: "unknown-binary", reason: "binary header without a known Hermes signature" };
}

function normalizeInstanceId(relativePath) {
    return relativePath.split(path.sep).join("/");
}

function getPathSegments(relativePath) {
    return relativePath.split(path.sep).filter(Boolean);
}

function shouldIncludeInstance(instanceId, modelName, pluginFilter) {
    if (!pluginFilter) {
        return true;
    }

    const normalizedFilter = pluginFilter.trim().toLowerCase();
    if (!normalizedFilter) {
        return true;
    }

    const candidates = [instanceId, modelName].filter(Boolean).map((value) => value.toLowerCase());
    return candidates.some((candidate) => candidate === normalizedFilter || candidate.includes(normalizedFilter));
}

function collectInstanceArtifacts(instanceDir) {
    const bundlePath = path.join(instanceDir, "index.android.bundle");
    const jsModulesDir = path.join(instanceDir, "js_modules");
    const metroSplitDir = path.join(instanceDir, "metro_bundle_split", "modules");
    const decompiledDir = path.join(instanceDir, "index.android.bundle.decompiled");
    const beautifiedBundlePath = path.join(instanceDir, "index.android.bundle.beautified.js");
    const rawDir = path.join(instanceDir, "raw");

    const artifacts = {
        bundlePath: fs.existsSync(bundlePath) ? bundlePath : null,
        beautifiedBundlePath: fs.existsSync(beautifiedBundlePath) ? beautifiedBundlePath : null,
        jsModulesDir: fs.existsSync(jsModulesDir) ? jsModulesDir : null,
        metroSplitDir: fs.existsSync(metroSplitDir) ? metroSplitDir : null,
        decompiledDir: fs.existsSync(decompiledDir) ? decompiledDir : null,
        rawDir: fs.existsSync(rawDir) ? rawDir : null,
    };

    const hasInterestingFiles = Object.values(artifacts).some(Boolean);
    return {
        ...artifacts,
        hasInterestingFiles,
    };
}

function discoverPluginInstances(rootDir, pluginFilter) {
    if (!fs.existsSync(rootDir)) {
        throw new Error(`AppPlugins root not found: ${rootDir}`);
    }

    const instances = [];
    const stack = [rootDir];

    while (stack.length > 0) {
        const currentDir = stack.pop();
        const relativePath = path.relative(rootDir, currentDir);

        if (relativePath) {
            const artifacts = collectInstanceArtifacts(currentDir);
            if (artifacts.hasInterestingFiles) {
                const pathSegments = getPathSegments(relativePath);
                const modelName = pathSegments[0] || path.basename(currentDir);
                const instanceName = pathSegments.length > 1 ? pathSegments.slice(1).join("/") : path.basename(currentDir);
                const instanceId = normalizeInstanceId(relativePath);

                if (shouldIncludeInstance(instanceId, modelName, pluginFilter)) {
                    instances.push({
                        modelName,
                        instanceName,
                        instanceId,
                        instanceDir: currentDir,
                        bundlePath: artifacts.bundlePath,
                        beautifiedBundlePath: artifacts.beautifiedBundlePath,
                        jsModulesDir: artifacts.jsModulesDir,
                        metroSplitDir: artifacts.metroSplitDir,
                        decompiledDir: artifacts.decompiledDir,
                        rawDir: artifacts.rawDir,
                    });
                }
                continue;
            }
        }

        const childDirs = fs
            .readdirSync(currentDir, { withFileTypes: true })
            .filter((entry) => entry.isDirectory())
            .map((entry) => path.join(currentDir, entry.name))
            .sort((left, right) => right.localeCompare(left));

        for (const childDir of childDirs) {
            const childRelativePath = path.relative(rootDir, childDir);
            if (!childRelativePath) {
                continue;
            }
            stack.push(childDir);
        }
    }

    return instances.sort((left, right) => left.instanceId.localeCompare(right.instanceId));
}

function parseJsonArrayLiteral(text) {
    try {
        return JSON.parse(text);
    } catch {
        return [];
    }
}

function loadJsModulesDirectory(directoryPath) {
    const modules = new Map();
    const entries = fs
        .readdirSync(directoryPath, { withFileTypes: true })
        .filter((entry) => entry.isFile() && /^module_\d+\.js$/u.test(entry.name))
        .map((entry) => entry.name)
        .sort((left, right) => left.localeCompare(right));

    for (const fileName of entries) {
        const fullPath = path.join(directoryPath, fileName);
        const content = safeReadText(fullPath);
        const moduleIdMatch = content.match(/^\/\/ moduleId:\s*(\d+)/m);
        const depsMatch = content.match(/^\/\/ deps:\s*(\[.*\])/m);
        if (!moduleIdMatch) {
            continue;
        }
        const moduleId = Number(moduleIdMatch[1]);
        const deps = depsMatch ? parseJsonArrayLiteral(depsMatch[1]) : [];
        const separatorIndex = content.indexOf("\n\n");
        const code = separatorIndex >= 0 ? content.slice(separatorIndex + 2) : content;
        modules.set(moduleId, {
            id: moduleId,
            deps,
            code,
            source: fullPath,
            format: "js_modules",
        });
    }

    return modules;
}

function loadMetroSplitDirectory(directoryPath) {
    const modules = new Map();
    const entries = fs
        .readdirSync(directoryPath, { withFileTypes: true })
        .filter((entry) => entry.isFile() && /^module_\d+\.js$/u.test(entry.name))
        .map((entry) => entry.name)
        .sort((left, right) => left.localeCompare(right));

    for (const fileName of entries) {
        const fullPath = path.join(directoryPath, fileName);
        const content = safeReadText(fullPath);
        const moduleIdMatch = content.match(/\/\*\s*Metro module\s+(\d+)/);
        const depsMatch = content.match(/\*\s*deps:\s*(\[[^\n]*\])/);
        if (!moduleIdMatch) {
            continue;
        }
        const moduleId = Number(moduleIdMatch[1]);
        const deps = depsMatch ? parseJsonArrayLiteral(depsMatch[1]) : [];
        const headerEnd = content.indexOf("*/");
        const code = headerEnd >= 0 ? content.slice(headerEnd + 2).trimStart() : content;
        modules.set(moduleId, {
            id: moduleId,
            deps,
            code,
            source: fullPath,
            format: "metro_split",
        });
    }

    return modules;
}

function loadLegacyDecompiledDirectory(directoryPath) {
    const modules = new Map();
    const entries = fs
        .readdirSync(directoryPath, { withFileTypes: true })
        .filter((entry) => entry.isFile() && /^\d+\.js$/u.test(entry.name))
        .map((entry) => entry.name)
        .sort((left, right) => left.localeCompare(right, undefined, { numeric: true }));

    for (const fileName of entries) {
        const fullPath = path.join(directoryPath, fileName);
        const moduleId = Number(fileName.replace(/\.js$/u, ""));
        const code = safeReadText(fullPath);
        modules.set(moduleId, {
            id: moduleId,
            deps: [],
            code,
            source: fullPath,
            format: "legacy_decompiled",
        });
    }

    return modules;
}

function findNextIndexOutsideStrings(source, needle, startIndex) {
    let inString = null;
    let inLineComment = false;
    let inBlockComment = false;
    let escaped = false;

    for (let index = startIndex; index < source.length; index++) {
        const char = source[index];
        const next = source[index + 1];

        if (inLineComment) {
            if (char === "\n") {
                inLineComment = false;
            }
            continue;
        }

        if (inBlockComment) {
            if (char === "*" && next === "/") {
                inBlockComment = false;
                index++;
            }
            continue;
        }

        if (inString) {
            if (escaped) {
                escaped = false;
                continue;
            }
            if (char === "\\") {
                escaped = true;
                continue;
            }
            if (char === inString) {
                inString = null;
            }
            continue;
        }

        if (char === "/" && next === "/") {
            inLineComment = true;
            index++;
            continue;
        }
        if (char === "/" && next === "*") {
            inBlockComment = true;
            index++;
            continue;
        }
        if (char === "'" || char === '"' || char === "`") {
            inString = char;
            continue;
        }

        if (source.startsWith(needle, index)) {
            return index;
        }
    }

    return -1;
}

function splitTopLevelArguments(source, startIndex) {
    const argumentsList = [];
    let argumentStart = startIndex;
    let inString = null;
    let inLineComment = false;
    let inBlockComment = false;
    let escaped = false;
    let parenDepth = 0;
    let braceDepth = 0;
    let bracketDepth = 0;

    for (let index = startIndex; index < source.length; index++) {
        const char = source[index];
        const next = source[index + 1];

        if (inLineComment) {
            if (char === "\n") {
                inLineComment = false;
            }
            continue;
        }

        if (inBlockComment) {
            if (char === "*" && next === "/") {
                inBlockComment = false;
                index++;
            }
            continue;
        }

        if (inString) {
            if (escaped) {
                escaped = false;
                continue;
            }
            if (char === "\\") {
                escaped = true;
                continue;
            }
            if (char === inString) {
                inString = null;
            }
            continue;
        }

        if (char === "/" && next === "/") {
            inLineComment = true;
            index++;
            continue;
        }
        if (char === "/" && next === "*") {
            inBlockComment = true;
            index++;
            continue;
        }
        if (char === "'" || char === '"' || char === "`") {
            inString = char;
            continue;
        }

        if (char === "(") {
            parenDepth++;
            continue;
        }
        if (char === ")") {
            if (parenDepth === 0 && braceDepth === 0 && bracketDepth === 0) {
                argumentsList.push(source.slice(argumentStart, index).trim());
                return { argumentsList, endIndex: index };
            }
            parenDepth--;
            continue;
        }
        if (char === "{") {
            braceDepth++;
            continue;
        }
        if (char === "}") {
            braceDepth--;
            continue;
        }
        if (char === "[") {
            bracketDepth++;
            continue;
        }
        if (char === "]") {
            bracketDepth--;
            continue;
        }

        if (char === "," && parenDepth === 0 && braceDepth === 0 && bracketDepth === 0) {
            argumentsList.push(source.slice(argumentStart, index).trim());
            argumentStart = index + 1;
        }
    }

    return null;
}

function parseMetroBundleModules(bundleText, sourceLabel) {
    const modules = new Map();
    let searchIndex = 0;

    while (searchIndex < bundleText.length) {
        const registerIndex = findNextIndexOutsideStrings(bundleText, "__d(", searchIndex);
        if (registerIndex < 0) {
            break;
        }

        const parsed = splitTopLevelArguments(bundleText, registerIndex + 4);
        if (!parsed || parsed.argumentsList.length < 3) {
            searchIndex = registerIndex + 4;
            continue;
        }

        const [factoryExpression, moduleIdExpression, depsExpression] = parsed.argumentsList;
        const moduleId = Number(moduleIdExpression);
        if (!Number.isInteger(moduleId)) {
            searchIndex = parsed.endIndex + 1;
            continue;
        }

        let deps = [];
        try {
            deps = JSON.parse(depsExpression);
        } catch {
            deps = [];
        }

        modules.set(moduleId, {
            id: moduleId,
            deps,
            code: factoryExpression,
            source: sourceLabel,
            format: "metro_bundle",
        });

        searchIndex = parsed.endIndex + 1;
    }

    return modules;
}

function moduleEntryFromParsedArgs(parsed, sourceLabel) {
    if (!parsed || parsed.argumentsList.length < 3) {
        return null;
    }
    const [factoryExpression, moduleIdExpression, depsExpression] = parsed.argumentsList;
    const moduleId = Number(moduleIdExpression);
    if (!Number.isInteger(moduleId)) {
        return null;
    }
    let deps = [];
    try {
        deps = JSON.parse(depsExpression);
    } catch {
        deps = [];
    }
    return {
        id: moduleId,
        deps,
        code: factoryExpression,
        source: sourceLabel,
        format: "metro_bundle",
    };
}

function parseSingleMetroModuleAt(bundleText, registerIndex, sourceLabel) {
    const parsed = splitTopLevelArguments(bundleText, registerIndex + 4);
    return moduleEntryFromParsedArgs(parsed, sourceLabel);
}

function findMetroModuleByIdInBundle(bundleText, moduleId, sourceLabel) {
    const markerPattern = new RegExp(`,\\s*${moduleId}\\s*,\\s*\\[`, "g");

    for (const match of bundleText.matchAll(markerPattern)) {
        let prefixIndex = match.index - 1;
        while (prefixIndex >= 0 && /\s/u.test(bundleText[prefixIndex])) {
            prefixIndex--;
        }

        // Skip dependency arrays like "[..., 1598, 1599, ...]". Real module
        // registrations end the factory expression immediately before the id.
        const prefixChar = prefixIndex >= 0 ? bundleText[prefixIndex] : "";
        if (prefixChar !== ")" && prefixChar !== "}") {
            continue;
        }

        const registerIndex = bundleText.lastIndexOf("__d(", match.index);
        if (registerIndex < 0) {
            continue;
        }

        const moduleEntry = parseSingleMetroModuleAt(bundleText, registerIndex, sourceLabel);
        if (moduleEntry && moduleEntry.id === moduleId) {
            return moduleEntry;
        }
    }

    return null;
}

function loadModulesForInstance(instance) {
    if (instance.jsModulesDir) {
        return {
            strategy: "js_modules",
            modules: loadJsModulesDirectory(instance.jsModulesDir),
        };
    }

    if (instance.metroSplitDir) {
        return {
            strategy: "metro_bundle_split",
            modules: loadMetroSplitDirectory(instance.metroSplitDir),
        };
    }

    if (instance.decompiledDir) {
        return {
            strategy: "legacy_decompiled",
            modules: loadLegacyDecompiledDirectory(instance.decompiledDir),
        };
    }

    const bundleDetection = detectBundleKind(instance.bundlePath);
    if (bundleDetection.kind === "metro-js" && instance.bundlePath) {
        return {
            strategy: "metro_bundle",
            modules: parseMetroBundleModules(safeReadText(instance.bundlePath), instance.bundlePath),
        };
    }

    if (instance.beautifiedBundlePath) {
        return {
            strategy: "beautified_bundle",
            modules: parseMetroBundleModules(safeReadText(instance.beautifiedBundlePath), instance.beautifiedBundlePath),
        };
    }

    return {
        strategy: "none",
        modules: new Map(),
    };
}

function getFunctionParameterNames(code) {
    const match = code.match(/function\s*\(([^)]*)\)/);
    if (!match) {
        return [];
    }
    return match[1]
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean);
}

function extractHermesRegistryMap(moduleEntry) {
    if (!moduleEntry.deps || moduleEntry.deps.length === 0) {
        return new Map();
    }

    const code = moduleEntry.code;
    const params = getFunctionParameterNames(code);
    const depsParam = params.length > 0 ? params[params.length - 1] : null;
    if (!depsParam) {
        return new Map();
    }

    const constants = new Map();
    for (const match of code.matchAll(/(?:var\s+)?([A-Za-z_$][\w$]*)\s*=\s*(-?\d+)\s*;/g)) {
        constants.set(match[1], Number(match[2]));
    }

    const depsAliases = new Set([depsParam]);
    let changed = true;
    while (changed) {
        changed = false;
        for (const match of code.matchAll(/(?:var\s+)?([A-Za-z_$][\w$]*)\s*=\s*([A-Za-z_$][\w$]*)\s*;/g)) {
            if (depsAliases.has(match[2]) && !depsAliases.has(match[1])) {
                depsAliases.add(match[1]);
                changed = true;
            }
        }
    }

    const depVarToIndex = new Map();
    for (const match of code.matchAll(/(?:var\s+)?([A-Za-z_$][\w$]*)\s*=\s*([A-Za-z_$][\w$]*)\[\s*([A-Za-z_$][\w$]*|-?\d+)\s*]\s*;/g)) {
        const depArrayAlias = match[2];
        if (!depsAliases.has(depArrayAlias)) {
            continue;
        }
        const indexToken = match[3];
        const index = /^-?\d+$/u.test(indexToken) ? Number(indexToken) : constants.get(indexToken);
        if (typeof index === "number" && index >= 0 && index < moduleEntry.deps.length) {
            depVarToIndex.set(match[1], index);
        }
    }

    const languageMap = new Map();
    for (const match of code.matchAll(/\[['"]([A-Za-z]{2,3}(?:-[A-Za-z0-9]{2,8})?)['"]]\s*=\s*([A-Za-z_$][\w$]*)\s*;/g)) {
        const language = normalizeLanguageCode(match[1]);
        const depIndex = depVarToIndex.get(match[2]);
        if (!language || typeof depIndex !== "number") {
            continue;
        }
        const moduleId = moduleEntry.deps[depIndex];
        if (Number.isInteger(moduleId)) {
            languageMap.set(language, moduleId);
        }
    }

    return languageMap;
}

function extractGenericRegistryMap(moduleEntry) {
    const languageMap = new Map();
    const code = moduleEntry.code;
    const deps = moduleEntry.deps || [];

    const depPatterns = [
        /['"]([A-Za-z]{2,3}(?:-[A-Za-z0-9]{2,8})?)['"]\s*:\s*[^,\n;]*?d\[(\d+)]/g,
        /(?:^|[,{])\s*([A-Za-z_$][\w$-]*)\s*:\s*[^,\n;]*?d\[(\d+)]/g,
        /\[['"]([A-Za-z]{2,3}(?:-[A-Za-z0-9]{2,8})?)['"]]\s*=\s*[^;\n]*?d\[(\d+)]/g,
        /['"]([A-Za-z]{2,3}(?:-[A-Za-z0-9]{2,8})?)['"]\s*:\s*[^,\n;]*?dependencyMap\[(\d+)]/g,
        /(?:^|[,{])\s*([A-Za-z_$][\w$-]*)\s*:\s*[^,\n;]*?dependencyMap\[(\d+)]/g,
    ];

    for (const pattern of depPatterns) {
        for (const match of code.matchAll(pattern)) {
            const language = normalizeLanguageCode(match[1]);
            const depIndex = Number(match[2]);
            const moduleId = deps[depIndex];
            if (language && Number.isInteger(moduleId)) {
                languageMap.set(language, moduleId);
            }
        }
    }

    const directRequirePatterns = [
        /['"]([A-Za-z]{2,3}(?:-[A-Za-z0-9]{2,8})?)['"]\s*:\s*[^,\n;]*?require\(\s*['"]\.\/(\d+)['"]\s*\)/g,
        /(?:^|[,{])\s*([A-Za-z_$][\w$-]*)\s*:\s*[^,\n;]*?require\(\s*['"]\.\/(\d+)['"]\s*\)/g,
        /\[['"]([A-Za-z]{2,3}(?:-[A-Za-z0-9]{2,8})?)['"]]\s*=\s*[^;\n]*?require\(\s*['"]\.\/(\d+)['"]\s*\)/g,
        /['"]([A-Za-z]{2,3}(?:-[A-Za-z0-9]{2,8})?)['"]\s*:\s*[^,\n;]*?require\(\s*(\d+)\s*\)/g,
        /(?:^|[,{])\s*([A-Za-z_$][\w$-]*)\s*:\s*[^,\n;]*?require\(\s*(\d+)\s*\)/g,
    ];

    for (const pattern of directRequirePatterns) {
        for (const match of code.matchAll(pattern)) {
            const language = normalizeLanguageCode(match[1]);
            const moduleId = Number(match[2]);
            if (language && Number.isInteger(moduleId)) {
                languageMap.set(language, moduleId);
            }
        }
    }

    return languageMap;
}

function extractAllLangsRegistryMap(moduleEntry) {
    if (!moduleEntry.deps || moduleEntry.deps.length === 0) {
        return new Map();
    }

    const aliasToModuleId = new Map();
    for (const match of moduleEntry.code.matchAll(/([A-Za-z_$][\w$]*)\s*=\s*[A-Za-z_$][\w$]*\(\s*d\[(\d+)]\s*\)/g)) {
        const depIndex = Number(match[2]);
        const moduleId = moduleEntry.deps[depIndex];
        if (Number.isInteger(moduleId)) {
            aliasToModuleId.set(match[1], moduleId);
        }
    }

    const markers = [
        "allLangs=",
        "allLangs =",
        "defaultV1SupportedLangs=",
        "defaultV1SupportedLangs =",
        "allWithoutHeLangs=",
        "allWithoutHeLangs =",
        "tanoseV1Langs=",
        "tanoseV1Langs =",
        "topazSVV1SupportedLangs=",
        "topazSVV1SupportedLangs =",
        "cnWithEnV1Langs=",
        "cnWithEnV1Langs =",
    ];

    let registryLiteral = null;
    for (const marker of markers) {
        const markerIndex = moduleEntry.code.indexOf(marker);
        if (markerIndex < 0) {
            continue;
        }
        const objectStart = skipWhitespace(moduleEntry.code, markerIndex + marker.length);
        if (moduleEntry.code[objectStart] !== "{") {
            continue;
        }
        const extracted = extractBalanced(moduleEntry.code, objectStart);
        if (extracted) {
            registryLiteral = extracted.text;
            break;
        }
    }

    if (!registryLiteral) {
        return new Map();
    }

    const languageMap = new Map();
    const pairRegex = /(?:['"]([^'"]+)['"]|([A-Za-z_$][\w$]*))\s*:\s*([A-Za-z_$][\w$]*)/g;
    for (const match of registryLiteral.matchAll(pairRegex)) {
        const language = normalizeLanguageCode(match[1] || match[2]);
        const moduleId = aliasToModuleId.get(match[3]);
        if (language && Number.isInteger(moduleId)) {
            languageMap.set(language, moduleId);
        }
    }

    return languageMap;
}

function buildLanguageRegistry(modules) {
    const candidates = [];
    for (const moduleEntry of modules.values()) {
        const registryMap = new Map();
        for (const [language, moduleId] of extractAllLangsRegistryMap(moduleEntry)) {
            registryMap.set(language, moduleId);
        }
        for (const [language, moduleId] of extractGenericRegistryMap(moduleEntry)) {
            registryMap.set(language, moduleId);
        }
        for (const [language, moduleId] of extractHermesRegistryMap(moduleEntry)) {
            registryMap.set(language, moduleId);
        }
        if (registryMap.size >= 5) {
            candidates.push({
                moduleId: moduleEntry.id,
                mapping: registryMap,
            });
        }
    }

    candidates.sort((left, right) => right.mapping.size - left.mapping.size || left.moduleId - right.moduleId);

    const merged = new Map();
    for (const candidate of candidates) {
        for (const [language, moduleId] of candidate.mapping) {
            if (!merged.has(language)) {
                merged.set(language, moduleId);
            }
        }
    }

    return {
        languageMap: merged,
        candidates,
    };
}

function skipWhitespace(source, startIndex) {
    let index = startIndex;
    while (index < source.length && /\s/u.test(source[index])) {
        index++;
    }
    return index;
}

function extractBalanced(source, startIndex) {
    const openChar = source[startIndex];
    const closeChar = openChar === "{" ? "}" : openChar === "[" ? "]" : openChar === "(" ? ")" : null;
    if (!closeChar) {
        return null;
    }

    let depth = 0;
    let inString = null;
    let inLineComment = false;
    let inBlockComment = false;
    let escaped = false;

    for (let index = startIndex; index < source.length; index++) {
        const char = source[index];
        const next = source[index + 1];

        if (inLineComment) {
            if (char === "\n") {
                inLineComment = false;
            }
            continue;
        }

        if (inBlockComment) {
            if (char === "*" && next === "/") {
                inBlockComment = false;
                index++;
            }
            continue;
        }

        if (inString) {
            if (escaped) {
                escaped = false;
                continue;
            }
            if (char === "\\") {
                escaped = true;
                continue;
            }
            if (char === inString) {
                inString = null;
            }
            continue;
        }

        if (char === "/" && next === "/") {
            inLineComment = true;
            index++;
            continue;
        }
        if (char === "/" && next === "*") {
            inBlockComment = true;
            index++;
            continue;
        }
        if (char === "'" || char === '"' || char === "`") {
            inString = char;
            continue;
        }

        if (char === openChar) {
            depth++;
        } else if (char === closeChar) {
            depth--;
            if (depth === 0) {
                return {
                    text: source.slice(startIndex, index + 1),
                    endIndex: index + 1,
                };
            }
        }
    }

    return null;
}

function extractObjectLiteralByMarker(code, markers) {
    for (const marker of markers) {
        const markerIndex = code.indexOf(marker);
        if (markerIndex < 0) {
            continue;
        }
        const objectStart = skipWhitespace(code, markerIndex + marker.length);
        if (code[objectStart] !== "{") {
            continue;
        }
        const extracted = extractBalanced(code, objectStart);
        if (extracted) {
            return extracted.text;
        }
    }
    return null;
}

function countLikelyTranslationEntries(objectLiteral) {
    return (objectLiteral.match(/(?:['"][A-Za-z0-9_.-]+['"]|[A-Za-z_$][\w$]*)\s*:/g) || []).length;
}

function extractTranslationObjectLiteral(code) {
    for (const match of code.matchAll(/\b[A-Za-z_$][\w$]*\.exports\s*=\s*/g)) {
        const objectStart = skipWhitespace(code, match.index + match[0].length);
        if (code[objectStart] !== "{") {
            continue;
        }
        const extracted = extractBalanced(code, objectStart);
        if (extracted && countLikelyTranslationEntries(extracted.text) >= 10) {
            return extracted.text;
        }
        const fallbackEnd = code.lastIndexOf("}");
        if (fallbackEnd > objectStart) {
            const fallbackLiteral = code.slice(objectStart, fallbackEnd);
            if (countLikelyTranslationEntries(fallbackLiteral) >= 10) {
                return fallbackLiteral;
            }
        }
    }

    const directMarkers = [
        "module.exports =",
        "module.exports=",
        "exports.default =",
        "exports.default=",
        "exports =",
        "exports=",
        "e.default =",
        "e.default=",
        "e.exports =",
        "e.exports=",
        "a4['exports'] =",
        "a4['exports']=",
    ];

    const directLiteral = extractObjectLiteralByMarker(code, directMarkers);
    if (directLiteral && countLikelyTranslationEntries(directLiteral) >= 10) {
        return directLiteral;
    }

    const variableObjectRegex = /(?:var\s+)?([A-Za-z_$][\w$]*)\s*=\s*\{/g;
    for (const match of code.matchAll(variableObjectRegex)) {
        const variableName = match[1];
        const objectStart = code.indexOf("{", match.index);
        const extracted = extractBalanced(code, objectStart);
        if (!extracted || countLikelyTranslationEntries(extracted.text) < 10) {
            continue;
        }

        const tail = code.slice(extracted.endIndex);
        const exportMarkers = [
            `module.exports = ${variableName}`,
            `module.exports=${variableName}`,
            `exports = ${variableName}`,
            `exports=${variableName}`,
            `.exports = ${variableName}`,
            `.exports=${variableName}`,
            `['exports'] = ${variableName}`,
            `['exports']=${variableName}`,
            `["exports"] = ${variableName}`,
            `["exports"]=${variableName}`,
        ];
        if (exportMarkers.some((marker) => tail.includes(marker))) {
            return extracted.text;
        }
    }

    return null;
}

function getLanguagePropertyCandidates(language) {
    const candidates = new Set([language, language.replace(/-/g, "_")]);

    if (language === "zh-CN" || language === "zh-Hans") {
        candidates.add("zh");
        candidates.add("zh_Hans");
    }
    if (language === "zh-HK" || language === "zh-TW" || language === "zh-Hant") {
        candidates.add("zh_Hant");
    }

    return [...candidates];
}

function extractLanguagePropertyObjectLiteral(code, language) {
    for (const candidate of getLanguagePropertyCandidates(language)) {
        const markers = [
            `.${candidate}=`,
            `.${candidate} =`,
            `['${candidate}']=`,
            `['${candidate}'] =`,
            `["${candidate}"]=`,
            `["${candidate}"] =`,
        ];

        for (const marker of markers) {
            let searchIndex = 0;
            while (searchIndex >= 0) {
                const markerIndex = code.indexOf(marker, searchIndex);
                if (markerIndex < 0) {
                    break;
                }

                const objectStart = skipWhitespace(code, markerIndex + marker.length);
                if (code[objectStart] === "{") {
                    const extracted = extractBalanced(code, objectStart);
                    if (extracted && countLikelyTranslationEntries(extracted.text) >= 10) {
                        return extracted.text;
                    }
                }

                searchIndex = markerIndex + marker.length;
            }
        }
    }

    return null;
}

function parseObjectLiteral(objectLiteral) {
    try {
        return vm.runInNewContext(`(${objectLiteral})`, Object.create(null), { timeout: 1000 });
    } catch {
        return null;
    }
}

function getDataEntries(value) {
    if (!value || typeof value !== "object" || Array.isArray(value)) {
        return [];
    }

    try {
        return Object.entries(Object.getOwnPropertyDescriptors(value))
            .filter(([, descriptor]) => Object.prototype.hasOwnProperty.call(descriptor, "value"))
            .map(([key, descriptor]) => [key, descriptor.value]);
    } catch {
        return [];
    }
}

function isTranslationDictionary(value) {
    if (!value || typeof value !== "object" || Array.isArray(value)) {
        return false;
    }
    const entries = getDataEntries(value);
    if (entries.length < 10) {
        return false;
    }
    const stringLikeEntries = entries.filter(([, entryValue]) => typeof entryValue === "string").length;
    return stringLikeEntries / entries.length >= 0.7;
}

function sanitizeTranslationDictionary(dictionary) {
    const sanitized = {};
    for (const [key, value] of getDataEntries(dictionary)) {
        if (typeof value === "string") {
            sanitized[key] = value;
        }
    }
    return sanitized;
}

function extractNestedLanguageDictionaries(value) {
    const nestedTranslations = new Map();

    if (!value || typeof value !== "object" || Array.isArray(value)) {
        return nestedTranslations;
    }

    for (const [key, nestedValue] of getDataEntries(value)) {
        const language = normalizeLanguageCode(key);
        if (!language || !isTranslationDictionary(nestedValue)) {
            continue;
        }
        nestedTranslations.set(language, sanitizeTranslationDictionary(nestedValue));
    }

    return nestedTranslations;
}

function extractTranslationDictionaryForLanguage(value, language) {
    if (isTranslationDictionary(value)) {
        return sanitizeTranslationDictionary(value);
    }

    const nestedTranslations = extractNestedLanguageDictionaries(value);
    return nestedTranslations.get(language) || null;
}

function extractTranslationsFromRawDirectory(rawDir) {
    if (!rawDir || !fs.existsSync(rawDir)) {
        return new Map();
    }

    const results = new Map();
    const stack = [rawDir];
    while (stack.length > 0) {
        const currentDir = stack.pop();
        for (const entry of fs.readdirSync(currentDir, { withFileTypes: true })) {
            const fullPath = path.join(currentDir, entry.name);
            if (entry.isDirectory()) {
                stack.push(fullPath);
                continue;
            }
            if (!entry.isFile() || !entry.name.endsWith(".json")) {
                continue;
            }
            const baseName = entry.name.replace(/\.json$/u, "");
            const language = normalizeLanguageCode(baseName);
            if (!language) {
                continue;
            }
            try {
                const parsed = JSON.parse(safeReadText(fullPath));
                if (isTranslationDictionary(parsed)) {
                    results.set(language, sanitizeTranslationDictionary(parsed));
                }
            } catch {
                // Ignore malformed or unrelated JSON blobs in raw/.
            }
        }
    }
    return results;
}

function extractEmbeddedLanguageDictionaries(modules) {
    const translations = new Map();

    for (const moduleEntry of modules.values()) {
        const code = moduleEntry.code;
        const exportedLiteral = extractTranslationObjectLiteral(code);
        if (exportedLiteral) {
            const parsedExport = parseObjectLiteral(exportedLiteral);
            for (const [language, dictionary] of extractNestedLanguageDictionaries(parsedExport)) {
                if (!translations.has(language)) {
                    translations.set(language, dictionary);
                }
            }
        }

        const variableAssignmentRegex = /(?:var\s+)?([A-Za-z_$][\w$]*)\s*=\s*\{/g;
        for (const match of code.matchAll(variableAssignmentRegex)) {
            const variableName = match[1];
            const objectStart = code.indexOf("{", match.index);
            const extracted = extractBalanced(code, objectStart);
            if (!extracted || countLikelyTranslationEntries(extracted.text) < 10) {
                continue;
            }

            const tail = code.slice(extracted.endIndex, extracted.endIndex + 300);
            const languageAssignmentRegex = new RegExp(
                `\\[['"]([A-Za-z]{2,3}(?:-[A-Za-z0-9]{2,8})?)['"]\\]\\s*=\\s*${variableName}\\b`,
                "g",
            );

            const languages = [...tail.matchAll(languageAssignmentRegex)]
                .map((languageMatch) => normalizeLanguageCode(languageMatch[1]))
                .filter(Boolean);

            if (languages.length === 0) {
                continue;
            }

            const parsed = parseObjectLiteral(extracted.text);
            if (!isTranslationDictionary(parsed)) {
                continue;
            }

            const dictionary = sanitizeTranslationDictionary(parsed);
            for (const language of languages) {
                if (!translations.has(language)) {
                    translations.set(language, dictionary);
                }
            }
        }
    }

    return translations;
}

function extractTranslationsFromBundleText(bundleText, sourceLabel) {
    const translations = new Map();
    const issues = [];
    const searchMarkers = ["allLangs=", "allLangs ="];
    const registryEntries = [];

    for (const marker of searchMarkers) {
        let searchIndex = 0;
        while (searchIndex >= 0) {
            const markerIndex = bundleText.indexOf(marker, searchIndex);
            if (markerIndex < 0) {
                break;
            }
            const registerIndex = bundleText.lastIndexOf("__d(", markerIndex);
            if (registerIndex < 0) {
                break;
            }
            const moduleEntry = parseSingleMetroModuleAt(bundleText, registerIndex, sourceLabel);
            if (moduleEntry) {
                registryEntries.push(moduleEntry);
            }
            searchIndex = markerIndex + marker.length;
        }
    }

    for (const registryEntry of registryEntries) {
        const registryMap = extractAllLangsRegistryMap(registryEntry);
        if (registryMap.size < 5) {
            continue;
        }

        for (const [language, moduleId] of registryMap) {
            if (translations.has(language)) {
                continue;
            }
            const moduleEntry = findMetroModuleByIdInBundle(bundleText, moduleId, sourceLabel);
            if (!moduleEntry) {
                issues.push(`Language ${language} points to missing Metro module ${moduleId}`);
                continue;
            }
            const literal =
                extractTranslationObjectLiteral(moduleEntry.code) ||
                extractLanguagePropertyObjectLiteral(moduleEntry.code, language);
            if (!literal) {
                issues.push(`Language ${language} in module ${moduleId} does not expose a parseable object literal`);
                continue;
            }
            const parsed = parseObjectLiteral(literal);
            const dictionary = extractTranslationDictionaryForLanguage(parsed, language);
            if (!dictionary) {
                issues.push(`Language ${language} in module ${moduleId} did not parse into a flat translation dictionary`);
                continue;
            }
            translations.set(language, dictionary);
        }
    }

    return {
        translations,
        issues,
    };
}

function extractTranslationsFromModules(modules) {
    const registry = buildLanguageRegistry(modules);
    const translations = new Map();
    const issues = [];

    for (const [language, moduleId] of registry.languageMap) {
        const moduleEntry = modules.get(moduleId);
        if (!moduleEntry) {
            issues.push(`Language ${language} points to missing module ${moduleId}`);
            continue;
        }

        const literal =
            extractTranslationObjectLiteral(moduleEntry.code) ||
            extractLanguagePropertyObjectLiteral(moduleEntry.code, language);
        if (!literal) {
            issues.push(`Language ${language} in module ${moduleId} does not expose a parseable object literal`);
            continue;
        }

        const parsed = parseObjectLiteral(literal);
        const dictionary = extractTranslationDictionaryForLanguage(parsed, language);
        if (!dictionary) {
            issues.push(`Language ${language} in module ${moduleId} did not parse into a flat translation dictionary`);
            continue;
        }

        translations.set(language, dictionary);
    }

    for (const [language, dictionary] of extractEmbeddedLanguageDictionaries(modules)) {
        if (!translations.has(language)) {
            translations.set(language, dictionary);
        }
    }

    return {
        translations,
        registry,
        issues,
    };
}

function extractTranslationsFromBundleRegistry(bundleText, sourceLabel, languageRegistry) {
    const translations = new Map();
    const issues = [];

    for (const [language, moduleId] of languageRegistry) {
        const moduleEntry = findMetroModuleByIdInBundle(bundleText, moduleId, sourceLabel);
        if (!moduleEntry) {
            issues.push(`Language ${language} points to missing module ${moduleId}`);
            continue;
        }

        const literal =
            extractTranslationObjectLiteral(moduleEntry.code) ||
            extractLanguagePropertyObjectLiteral(moduleEntry.code, language);
        if (!literal) {
            issues.push(`Language ${language} in module ${moduleId} does not expose a parseable object literal`);
            continue;
        }

        const parsed = parseObjectLiteral(literal);
        const dictionary = extractTranslationDictionaryForLanguage(parsed, language);
        if (!dictionary) {
            issues.push(`Language ${language} in module ${moduleId} did not parse into a flat translation dictionary`);
            continue;
        }

        translations.set(language, dictionary);
    }

    return {
        translations,
        issues,
    };
}

function mergeLanguageCatalogs(pluginResults) {
    const mergedByLanguage = {};
    const meta = {
        generatedAt: new Date().toISOString(),
        languages: {},
        plugins: {},
        conflicts: {},
    };

    for (const pluginResult of pluginResults) {
        meta.plugins[pluginResult.instanceId] = {
            modelName: pluginResult.modelName,
            instanceDir: pluginResult.instanceDir,
            bundleKind: pluginResult.bundleKind.kind,
            bundleReason: pluginResult.bundleKind.reason,
            moduleStrategy: pluginResult.moduleStrategy,
            extractedLanguages: [...pluginResult.translations.keys()].sort(),
            issues: pluginResult.issues,
        };

        for (const [language, dictionary] of pluginResult.translations) {
            if (!mergedByLanguage[language]) {
                mergedByLanguage[language] = {};
            }
            if (!meta.languages[language]) {
                meta.languages[language] = {
                    plugins: [],
                    keyCount: 0,
                };
            }
            meta.languages[language].plugins.push(pluginResult.instanceId);

            for (const [key, value] of Object.entries(dictionary)) {
                const existingValue = mergedByLanguage[language][key];
                if (existingValue === undefined) {
                    mergedByLanguage[language][key] = value;
                    continue;
                }
                if (existingValue === value) {
                    continue;
                }

                if (!meta.conflicts[language]) {
                    meta.conflicts[language] = {};
                }
                if (!meta.conflicts[language][key]) {
                    meta.conflicts[language][key] = [existingValue];
                }
                if (!meta.conflicts[language][key].includes(value)) {
                    meta.conflicts[language][key].push(value);
                }
            }
        }
    }

    for (const [language, dictionary] of Object.entries(mergedByLanguage)) {
        const sortedDictionary = Object.fromEntries(Object.entries(dictionary).sort(([left], [right]) => left.localeCompare(right)));
        mergedByLanguage[language] = sortedDictionary;
        meta.languages[language].plugins.sort((left, right) => left.localeCompare(right));
        meta.languages[language].keyCount = Object.keys(sortedDictionary).length;
    }

    return {
        mergedByLanguage,
        meta,
    };
}

function ensureParentDirectory(filePath) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function loadExistingRuntimeCatalog(outputFile) {
    if (!fs.existsSync(outputFile)) {
        return {};
    }

    const parsed = JSON.parse(safeReadText(outputFile));
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        return {};
    }

    const catalog = {};
    for (const [language, dictionary] of Object.entries(parsed)) {
        if (!dictionary || typeof dictionary !== "object" || Array.isArray(dictionary)) {
            continue;
        }
        catalog[language] = {};
        for (const [key, value] of Object.entries(dictionary)) {
            if (typeof value === "string") {
                catalog[language][key] = value;
            }
        }
    }
    return catalog;
}

function mergeIntoRuntimeCatalog(existingCatalog, appPluginCatalog, meta) {
    const merged = {};

    for (const [language, dictionary] of Object.entries(existingCatalog)) {
        merged[language] = { ...dictionary };
    }

    for (const [language, dictionary] of Object.entries(appPluginCatalog)) {
        if (!merged[language]) {
            merged[language] = {};
        }
        for (const [key, value] of Object.entries(dictionary)) {
            const existingValue = merged[language][key];
            if (existingValue === undefined) {
                merged[language][key] = value;
                continue;
            }
            if (existingValue === value) {
                continue;
            }

            if (!meta.conflicts[language]) {
                meta.conflicts[language] = {};
            }
            if (!meta.conflicts[language][key]) {
                meta.conflicts[language][key] = [existingValue];
            }
            if (!meta.conflicts[language][key].includes(value)) {
                meta.conflicts[language][key].push(value);
            }
        }
    }

    const sortedMerged = {};
    for (const language of Object.keys(merged).sort((left, right) => left.localeCompare(right))) {
        sortedMerged[language] = Object.fromEntries(
            Object.entries(merged[language]).sort(([left], [right]) => left.localeCompare(right)),
        );
    }

    return sortedMerged;
}

function writeMergedCatalog(outputPath, mergedCatalog) {
    if (isJsonFilePath(outputPath)) {
        const existingCatalog = loadExistingRuntimeCatalog(outputPath);
        const runtimeCatalog = mergeIntoRuntimeCatalog(existingCatalog, mergedCatalog.mergedByLanguage, mergedCatalog.meta);

        ensureParentDirectory(outputPath);
        fs.writeFileSync(outputPath, JSON.stringify(runtimeCatalog, null, 4) + "\n", "utf8");
        return;
    }

    fs.mkdirSync(outputPath, { recursive: true });
    for (const [language, dictionary] of Object.entries(mergedCatalog.mergedByLanguage)) {
        const filePath = path.join(outputPath, `${language}.json`);
        fs.writeFileSync(filePath, JSON.stringify(dictionary, null, 2) + "\n", "utf8");
    }
}

function processPluginInstance(instance, options) {
    const bundleKind = detectBundleKind(instance.bundlePath);
    const moduleLoad = loadModulesForInstance(instance);
    const rawTranslations = extractTranslationsFromRawDirectory(instance.rawDir);
    const moduleExtraction = extractTranslationsFromModules(moduleLoad.modules);

    const mergedTranslations = new Map(rawTranslations);
    for (const [language, dictionary] of moduleExtraction.translations) {
        if (!mergedTranslations.has(language)) {
            mergedTranslations.set(language, dictionary);
        }
    }

    const issues = [...moduleExtraction.issues];
    if (bundleKind.kind === "metro-js" && instance.bundlePath && moduleExtraction.registry.languageMap.size > 0) {
        const registryFallback = extractTranslationsFromBundleRegistry(
            safeReadText(instance.bundlePath),
            instance.bundlePath,
            moduleExtraction.registry.languageMap,
        );
        for (const [language, dictionary] of registryFallback.translations) {
            if (!mergedTranslations.has(language)) {
                mergedTranslations.set(language, dictionary);
            }
        }
        for (const issue of registryFallback.issues) {
            if (!issues.includes(issue)) {
                issues.push(issue);
            }
        }
    }

    const resolvedLanguages = new Set(mergedTranslations.keys());
    const filteredIssues = issues.filter((issue) => {
        const match = issue.match(/^Language ([^\s]+)\b/u);
        return !(match && resolvedLanguages.has(match[1]));
    });

    if (mergedTranslations.size === 0) {
        const directBundleSource =
            bundleKind.kind === "metro-js" && instance.bundlePath
                ? instance.bundlePath
                : instance.beautifiedBundlePath;
        if (directBundleSource && fs.existsSync(directBundleSource)) {
            const directBundleExtraction = extractTranslationsFromBundleText(
                safeReadText(directBundleSource),
                directBundleSource,
            );
            for (const [language, dictionary] of directBundleExtraction.translations) {
                if (!mergedTranslations.has(language)) {
                    mergedTranslations.set(language, dictionary);
                }
            }
            filteredIssues.push(...directBundleExtraction.issues);
        }
    }
    if (bundleKind.kind === "hermes-bytecode" && moduleLoad.strategy === "none") {
        filteredIssues.push("Hermes bytecode bundle detected without a normalized JS surface (js_modules / decompiled / split bundle)");
    }
    if (mergedTranslations.size === 0) {
        filteredIssues.push("No usable translation catalog was extracted");
    }

    log(
        options,
        `[${instance.instanceId}] ${bundleKind.kind} via ${moduleLoad.strategy} -> ${mergedTranslations.size} languages`,
    );

    return {
        ...instance,
        bundleKind,
        moduleStrategy: moduleLoad.strategy,
        translations: mergedTranslations,
        issues: filteredIssues,
        registryCandidates: moduleExtraction.registry.candidates.map((candidate) => ({
            moduleId: candidate.moduleId,
            languages: [...candidate.mapping.keys()].sort(),
        })),
    };
}

function main() {
    const options = parseArgs(process.argv.slice(2));
    const instances = discoverPluginInstances(options.root, options.plugin);

    if (instances.length === 0) {
        throw new Error(`No AppPlugin instances found under ${options.root}`);
    }

    log(options, `Discovered ${instances.length} AppPlugin instance(s).`);

    const pluginResults = instances.map((instance) => processPluginInstance(instance, options));
    const mergedCatalog = mergeLanguageCatalogs(pluginResults);

    if (!options.noWrite) {
        writeMergedCatalog(options.out, mergedCatalog);
        log(
            options,
            isJsonFilePath(options.out)
                ? `Merged ${Object.keys(mergedCatalog.mergedByLanguage).length} AppPlugin language catalog(s) into ${options.out}`
                : `Wrote ${Object.keys(mergedCatalog.mergedByLanguage).length} merged language file(s) to ${options.out}`,
        );
    }

    const summary = {
        pluginCount: pluginResults.length,
        languages: Object.fromEntries(
            Object.entries(mergedCatalog.meta.languages)
                .sort(([left], [right]) => left.localeCompare(right))
                .map(([language, info]) => [language, info.keyCount]),
        ),
        pluginsWithIssues: pluginResults
            .filter((result) => result.issues.length > 0)
            .map((result) => ({
                instanceId: result.instanceId,
                issues: result.issues,
            })),
    };

    console.log(JSON.stringify(summary, null, 2));
}

module.exports = {
    buildLanguageRegistry,
    detectBundleKind,
    discoverPluginInstances,
    extractLanguagePropertyObjectLiteral,
    extractTranslationObjectLiteral,
    extractTranslationsFromBundleRegistry,
    extractTranslationsFromModules,
    findMetroModuleByIdInBundle,
    loadModulesForInstance,
    parseObjectLiteral,
    parseMetroBundleModules,
    processPluginInstance,
};

if (require.main === module) {
    try {
        main();
    } catch (error) {
        console.error(error instanceof Error ? error.message : String(error));
        process.exit(1);
    }
}
