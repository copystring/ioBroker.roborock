#!/usr/bin/env node

const fs = require("fs");
const os = require("os");
const path = require("path");
const cp = require("child_process");

const {
    detectBundleKind,
    discoverPluginInstances,
    parseMetroBundleModules,
} = require("./extract_appplugin_translations.js");

const REPO_ROOT = path.join(__dirname, "..");
const DEFAULT_APPPLUGINS_ROOT = path.join(REPO_ROOT, ".AppPlugins");
const PYTHON_SPLITTER = path.join(__dirname, "split_decompiled_metro_bundle.py");
const HERMES_DECOMPILER_PY = path.join(
    process.env.LOCALAPPDATA || "",
    "Programs",
    "Python",
    "Python310",
    "Lib",
    "site-packages",
    "hermes_dec",
    "decompilation",
    "hbc_decompiler.py",
);
let cachedAutoHermesDecompiler = null;
let attemptedHermesAutoInstall = false;

function parseArgs(argv) {
    const options = {
        root: DEFAULT_APPPLUGINS_ROOT,
        plugin: undefined,
        quiet: false,
        force: false,
        noWrite: false,
        hermesDecompilerCmd: undefined,
    };

    for (let index = 0; index < argv.length; index++) {
        const arg = argv[index];
        if (arg === "--root" && argv[index + 1]) {
            options.root = path.resolve(argv[++index]);
        } else if (arg === "--plugin" && argv[index + 1]) {
            options.plugin = argv[++index];
        } else if (arg === "--quiet") {
            options.quiet = true;
        } else if (arg === "--force") {
            options.force = true;
        } else if (arg === "--no-write") {
            options.noWrite = true;
        } else if (arg === "--hermes-decompiler-cmd" && argv[index + 1]) {
            options.hermesDecompilerCmd = argv[++index];
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
    console.log(`Usage: node scripts/prepare_appplugin_bundles.js [options]

Options:
  --root <dir>                  Root directory containing .AppPlugins (default: ${DEFAULT_APPPLUGINS_ROOT})
  --plugin <name>               Only process a matching AppPlugin path or model name
  --quiet                       Reduce console output
  --force                       Recreate normalized output even when it already exists
  --no-write                    Analyze only, do not write split output
  --hermes-decompiler-cmd <cmd> Optional external decompiler command with {input} and {output} placeholders
                                 When omitted, the script auto-detects or installs a Hermes decompiler when needed
  --help                        Show this help text
`);
}

function log(options, message) {
    if (!options.quiet) {
        console.log(message);
    }
}

function safeReadText(filePath) {
    return fs.readFileSync(filePath, "utf8");
}

function fileLooksLikeText(filePath, byteCount = 2048) {
    if (!filePath || !fs.existsSync(filePath)) {
        return false;
    }

    const handle = fs.openSync(filePath, "r");
    try {
        const buffer = Buffer.alloc(byteCount);
        const bytesRead = fs.readSync(handle, buffer, 0, byteCount, 0);
        const slice = buffer.subarray(0, bytesRead);
        const text = slice.toString("utf8");
        const printableChars = [...text].filter((char) => {
            const code = char.charCodeAt(0);
            return code === 9 || code === 10 || code === 13 || (code >= 32 && code <= 126);
        }).length;
        return slice.length > 0 && printableChars / slice.length > 0.75;
    } finally {
        fs.closeSync(handle);
    }
}

function detectJsSurfaceKind(filePath) {
    if (!filePath || !fs.existsSync(filePath)) {
        return { kind: "missing", reason: "JS surface missing" };
    }

    if (!fileLooksLikeText(filePath)) {
        return { kind: "unknown-binary", reason: "JS surface does not look like text" };
    }

    const source = safeReadText(filePath);
    if (
        /r\d+\s*=\s*r0\.__d;\s*$/m.test(source) && /r\d+\s*=\s*function\((.*?)\)\s*\{/m.test(source)
    ) {
        return { kind: "hermes-decompiled-js", reason: "matched decompiled Hermes Metro register pattern" };
    }
    if (/_fun\d+:\s*for\s*\(var _fun\d+_ip/u.test(source) && source.includes("__d(")) {
        return { kind: "hermes-decompiled-js", reason: "matched hbc-decompiler style Hermes output" };
    }
    if (source.includes("__BUNDLE_START_TIME__") || source.includes("__d(")) {
        return { kind: "metro-js", reason: "matched Metro text markers" };
    }
    return { kind: "unknown-text", reason: "text surface did not match a known Metro or Hermes-decompiled form" };
}

function getHermesSurfaceCandidates(instanceDir) {
    const candidates = [
        path.join(instanceDir, "index.android.bundle.js"),
        path.join(instanceDir, "index.android.bundle.decompiled.js"),
        path.join(instanceDir, "index.android.bundle.beautified.js"),
    ];

    return candidates.filter((candidate, index) => fs.existsSync(candidate) && candidates.indexOf(candidate) === index);
}

function findBestHermesSurface(instanceDir) {
    const candidates = getHermesSurfaceCandidates(instanceDir);
    for (const candidate of candidates) {
        const kind = detectJsSurfaceKind(candidate);
        if (kind.kind === "metro-js" || kind.kind === "hermes-decompiled-js") {
            return {
                filePath: candidate,
                ...kind,
            };
        }
    }
    return null;
}

function ensureCleanDirectory(directoryPath) {
    fs.rmSync(directoryPath, { recursive: true, force: true });
    fs.mkdirSync(directoryPath, { recursive: true });
}

function writeMetroSplitModules(modules, outputDir, sourceLabel) {
    ensureCleanDirectory(outputDir);

    const manifest = [];
    const width = Math.max(4, String(Math.max(...modules.keys(), 0)).length);

    for (const moduleEntry of [...modules.values()].sort((left, right) => left.id - right.id)) {
        const fileName = `module_${String(moduleEntry.id).padStart(width, "0")}.js`;
        const filePath = path.join(outputDir, fileName);
        const header = [
            `/* Metro module ${moduleEntry.id}`,
            ` * deps: ${JSON.stringify(moduleEntry.deps)}`,
            ` * source: ${sourceLabel}`,
            " */",
            "",
        ].join("\n");

        fs.writeFileSync(filePath, header + moduleEntry.code.trimStart() + "\n", "utf8");
        manifest.push({
            moduleId: moduleEntry.id,
            deps: moduleEntry.deps,
            file: fileName,
        });
    }

    fs.writeFileSync(path.join(path.dirname(outputDir), "modules.json"), JSON.stringify(manifest, null, 2) + "\n", "utf8");
}

function resolvePythonCommand() {
    const candidates = [
        { command: "python", args: ["--version"] },
        { command: "py", args: ["-3", "--version"] },
    ];

    for (const candidate of candidates) {
        const result = cp.spawnSync(candidate.command, candidate.args, {
            windowsHide: true,
            stdio: "pipe",
        });
        if (result.status === 0) {
            return candidate.command === "py" ? { command: "py", prefixArgs: ["-3"] } : { command: "python", prefixArgs: [] };
        }
    }

    return null;
}

function commandExists(command, args = ["--help"]) {
    const result = cp.spawnSync(command, args, {
        windowsHide: true,
        stdio: "pipe",
        encoding: "utf8",
    });
    return result.status === 0;
}

function discoverAutoHermesDecompiler() {
    if (cachedAutoHermesDecompiler) {
        return cachedAutoHermesDecompiler;
    }

    const executableCandidates = [
        "hbc-decompiler",
        "hbc-decompiler.exe",
        path.join(process.env.LOCALAPPDATA || "", "Programs", "Python", "Python310", "Scripts", "hbc-decompiler.exe"),
    ].filter(Boolean);

    for (const candidate of executableCandidates) {
        if (commandExists(candidate)) {
            cachedAutoHermesDecompiler = {
                type: "executable",
                command: candidate,
            };
            return cachedAutoHermesDecompiler;
        }
    }

    const python = resolvePythonCommand();
    if (python && fs.existsSync(HERMES_DECOMPILER_PY)) {
        cachedAutoHermesDecompiler = {
            type: "python-script",
            command: python.command,
            prefixArgs: python.prefixArgs,
            scriptPath: HERMES_DECOMPILER_PY,
        };
        return cachedAutoHermesDecompiler;
    }

    return null;
}

function installHermesDecompiler() {
    const python = resolvePythonCommand();
    if (!python) {
        return {
            ok: false,
            error: "Python runtime not found to install hermes-dec automatically",
        };
    }

    const result = cp.spawnSync(
        python.command,
        [...python.prefixArgs, "-m", "pip", "install", "--user", "--disable-pip-version-check", "hermes-dec"],
        {
            windowsHide: true,
            stdio: "pipe",
            encoding: "utf8",
        },
    );

    return {
        ok: result.status === 0,
        output: (result.stdout || "").trim(),
        error: (result.stderr || "").trim(),
    };
}

function ensureHermesDecompilerAvailable() {
    const existing = discoverAutoHermesDecompiler();
    if (existing) {
        return {
            ok: true,
            decompiler: existing,
            installed: false,
        };
    }

    if (process.env.ROBOROCK_APPPLUGINS_NO_AUTO_INSTALL === "1") {
        return {
            ok: false,
            error: "No automatic Hermes decompiler was found (auto-install disabled by ROBOROCK_APPPLUGINS_NO_AUTO_INSTALL=1)",
        };
    }

    if (attemptedHermesAutoInstall) {
        return {
            ok: false,
            error: "No automatic Hermes decompiler was found after the automatic installation attempt",
        };
    }

    attemptedHermesAutoInstall = true;
    const installResult = installHermesDecompiler();
    if (!installResult.ok) {
        return {
            ok: false,
            error: `Automatic Hermes decompiler installation failed: ${installResult.error || installResult.output || "unknown error"}`,
        };
    }

    cachedAutoHermesDecompiler = null;
    const installed = discoverAutoHermesDecompiler();
    if (!installed) {
        return {
            ok: false,
            error: "Automatic Hermes decompiler installation completed, but no usable decompiler was discovered afterwards",
        };
    }

    return {
        ok: true,
        decompiler: installed,
        installed: true,
        output: installResult.output,
    };
}

function runHermesSplitter(inputFile, outputDir) {
    const python = resolvePythonCommand();
    if (!python) {
        return {
            ok: false,
            error: "Python runtime not found for split_decompiled_metro_bundle.py",
        };
    }

    ensureCleanDirectory(outputDir);

    const result = cp.spawnSync(
        python.command,
        [...python.prefixArgs, PYTHON_SPLITTER, inputFile, outputDir],
        {
            windowsHide: true,
            stdio: "pipe",
            encoding: "utf8",
        },
    );

    if (result.status !== 0) {
        return {
            ok: false,
            error: (result.stderr || result.stdout || "Python splitter failed").trim(),
        };
    }

    return {
        ok: true,
        output: (result.stdout || "").trim(),
    };
}

function runExternalHermesDecompiler(commandTemplate, inputFile, outputFile) {
    const command = commandTemplate
        .replaceAll("{input}", `"${inputFile}"`)
        .replaceAll("{output}", `"${outputFile}"`);

    const result = cp.spawnSync(command, {
        shell: true,
        windowsHide: true,
        stdio: "pipe",
        encoding: "utf8",
    });

    return {
        ok: result.status === 0,
        output: (result.stdout || "").trim(),
        error: (result.stderr || "").trim(),
    };
}

function runAutoHermesDecompiler(inputFile, outputFile) {
    const ensured = ensureHermesDecompilerAvailable();
    if (!ensured.ok) {
        return {
            ok: false,
            error: ensured.error,
        };
    }
    const decompiler = ensured.decompiler;

    let result;
    if (decompiler.type === "executable") {
        result = cp.spawnSync(decompiler.command, [inputFile, outputFile], {
            windowsHide: true,
            stdio: "pipe",
            encoding: "utf8",
        });
    } else {
        result = cp.spawnSync(
            decompiler.command,
            [...decompiler.prefixArgs, decompiler.scriptPath, inputFile, outputFile],
            {
                windowsHide: true,
                stdio: "pipe",
                encoding: "utf8",
            },
        );
    }

    return {
        ok: result.status === 0,
        output: [ensured.installed ? "Installed hermes-dec automatically." : "", (result.stdout || "").trim()]
            .filter(Boolean)
            .join("\n"),
        error: (result.stderr || "").trim(),
    };
}

function prepareMetroBundle(instance, options, sourceFile) {
    const outputDir = path.join(instance.instanceDir, "metro_bundle_split", "modules");
    if (!options.force && fs.existsSync(outputDir)) {
        return {
            action: "skip-existing-metro-split",
            outputDir,
            issues: [],
        };
    }

    const modules = parseMetroBundleModules(safeReadText(sourceFile), sourceFile);
    if (modules.size === 0) {
        return {
            action: "failed-metro-split",
            outputDir,
            issues: [`No Metro modules were parsed from ${sourceFile}`],
        };
    }

    if (!options.noWrite) {
        writeMetroSplitModules(modules, outputDir, sourceFile);
    }

    return {
        action: "split-metro-bundle",
        outputDir,
        issues: [],
        moduleCount: modules.size,
    };
}

function maybeCreateHermesSurface(instance, options, issues) {
    const tempDir = options.noWrite ? fs.mkdtempSync(path.join(os.tmpdir(), "rr-hermes-decompile-")) : null;
    const outputFile = tempDir ? path.join(tempDir, "index.android.bundle.js") : path.join(instance.instanceDir, "index.android.bundle.js");
    const decompileResult = options.hermesDecompilerCmd
        ? runExternalHermesDecompiler(options.hermesDecompilerCmd, instance.bundlePath, outputFile)
        : runAutoHermesDecompiler(instance.bundlePath, outputFile);
    if (!decompileResult.ok) {
        issues.push(`Hermes decompiler failed: ${decompileResult.error || decompileResult.output || "unknown error"}`);
        return null;
    }
    if (!fs.existsSync(outputFile)) {
        issues.push(`Hermes decompiler finished but did not create ${outputFile}`);
        return null;
    }

    const kind = detectJsSurfaceKind(outputFile);
    if (kind.kind !== "metro-js" && kind.kind !== "hermes-decompiled-js") {
        issues.push(`Generated JS surface ${outputFile} is ${kind.kind} (${kind.reason})`);
        return null;
    }

    return {
        filePath: outputFile,
        tempDir,
        ...kind,
    };
}

function prepareHermesBundle(instance, options) {
    const issues = [];
    if (!options.force && instance.jsModulesDir) {
        return {
            action: "skip-existing-js-modules",
            outputDir: instance.jsModulesDir,
            issues,
        };
    }
    if (!options.force && instance.decompiledDir) {
        return {
            action: "skip-existing-legacy-decompiled",
            outputDir: instance.decompiledDir,
            issues,
        };
    }

    let surface = findBestHermesSurface(instance.instanceDir);
    if (!surface) {
        surface = maybeCreateHermesSurface(instance, options, issues);
    }
    if (!surface) {
        return {
            action: "unsupported-hermes-bytecode",
            outputDir: null,
            issues,
        };
    }
    const tempSplitDir = options.noWrite ? fs.mkdtempSync(path.join(os.tmpdir(), "rr-hermes-split-")) : null;
    const outputDir = tempSplitDir || path.join(instance.instanceDir, "js_modules");
    const splitResult = runHermesSplitter(surface.filePath, outputDir);
    if (!splitResult.ok) {
        if (surface.kind === "metro-js") {
            const metroResult = prepareMetroBundle(instance, options, surface.filePath);
            return {
                ...metroResult,
                issues: [...issues, ...metroResult.issues],
            };
        }
        return {
            action: "failed-hermes-split",
            outputDir,
            issues: [...issues, splitResult.error],
        };
    }

    if (options.noWrite && tempSplitDir) {
        fs.rmSync(tempSplitDir, { recursive: true, force: true });
    }
    if (surface.tempDir) {
        fs.rmSync(surface.tempDir, { recursive: true, force: true });
    }

    return {
        action: "split-hermes-surface",
        outputDir: tempSplitDir ? path.join(instance.instanceDir, "js_modules") : outputDir,
        issues,
        sourceSurface: surface.filePath,
    };
}

function preparePluginInstance(instance, options) {
    const bundleKind = detectBundleKind(instance.bundlePath);
    const baseResult = {
        instanceId: instance.instanceId,
        instanceDir: instance.instanceDir,
        modelName: instance.modelName,
        bundleKind,
        action: "noop",
        outputDir: null,
        issues: [],
    };

    if (!instance.bundlePath) {
        return {
            ...baseResult,
            action: "missing-bundle",
            issues: ["index.android.bundle not found"],
        };
    }

    if (bundleKind.kind === "metro-js") {
        return {
            ...baseResult,
            ...prepareMetroBundle(instance, options, instance.bundlePath),
        };
    }

    if (bundleKind.kind === "hermes-bytecode") {
        return {
            ...baseResult,
            ...prepareHermesBundle(instance, options),
        };
    }

    return {
        ...baseResult,
        action: "unsupported-bundle-kind",
        issues: [`Bundle kind ${bundleKind.kind} is not supported for preparation (${bundleKind.reason})`],
    };
}

function preparePluginInstances(rootDir, options = {}) {
    const instances = discoverPluginInstances(rootDir, options.plugin);
    return instances.map((instance) => preparePluginInstance(instance, options));
}

function main() {
    const options = parseArgs(process.argv.slice(2));
    const results = preparePluginInstances(options.root, options);

    if (results.length === 0) {
        throw new Error(`No AppPlugin instances found under ${options.root}`);
    }

    for (const result of results) {
        const suffix = result.outputDir ? ` -> ${result.outputDir}` : "";
        log(options, `[${result.instanceId}] ${result.bundleKind.kind} -> ${result.action}${suffix}`);
        for (const issue of result.issues) {
            log(options, `  ! ${issue}`);
        }
    }

    const summary = {
        pluginCount: results.length,
        actions: results.reduce((accumulator, result) => {
            accumulator[result.action] = (accumulator[result.action] || 0) + 1;
            return accumulator;
        }, {}),
        pluginsWithIssues: results
            .filter((result) => result.issues.length > 0)
            .map((result) => ({
                instanceId: result.instanceId,
                action: result.action,
                issues: result.issues,
            })),
    };

    console.log(JSON.stringify(summary, null, 2));
}

module.exports = {
    detectJsSurfaceKind,
    discoverAutoHermesDecompiler,
    ensureHermesDecompilerAvailable,
    findBestHermesSurface,
    installHermesDecompiler,
    preparePluginInstance,
    preparePluginInstances,
    runHermesSplitter,
    writeMetroSplitModules,
};

if (require.main === module) {
    try {
        main();
    } catch (error) {
        console.error(error instanceof Error ? error.message : String(error));
        process.exit(1);
    }
}
