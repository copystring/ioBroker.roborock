#!/usr/bin/env node

const cp = require("child_process");
const path = require("path");

const REPO_ROOT = path.join(__dirname, "..");
const PREPARE_SCRIPT = path.join(__dirname, "prepare_appplugin_bundles.js");
const EXTRACT_SCRIPT = path.join(__dirname, "extract_appplugin_translations.js");

function printHelp() {
    console.log(`Usage: node scripts/appplugins.js <command> [options]

Commands:
  convert bundle         Normalize and split AppPlugin bundles under .AppPlugins
  extract translations   Prepare bundles when needed and extract merged translations

Examples:
  npm run appplugins:convert
  npm run appplugins:extract
  npm run appplugins:extract -- --plugin "Saros Z70"

Notes:
  Metro bundles are split automatically.
  Hermes bundles are auto-detected; when the decompiler is missing, the tooling tries to install it automatically.
  Translation extraction merges into lib/protocols/roborock_strings.json by default.
`);
}

function runNodeScript(scriptPath, args) {
    const result = cp.spawnSync(process.execPath, [scriptPath, ...args], {
        cwd: REPO_ROOT,
        stdio: "inherit",
        windowsHide: true,
    });

    if (result.status !== 0) {
        process.exit(result.status || 1);
    }
}

function splitExtractArgs(args) {
    const prepareArgs = [];
    const extractArgs = [];
    const flagsWithValue = new Set(["--root", "--plugin", "--out", "--hermes-decompiler-cmd"]);
    const prepareOnly = new Set(["--force", "--hermes-decompiler-cmd"]);
    const extractOnly = new Set(["--out"]);
    const sharedFlags = new Set(["--quiet", "--no-write"]);
    const sharedWithValue = new Set(["--root", "--plugin"]);

    for (let index = 0; index < args.length; index++) {
        const arg = args[index];
        const next = flagsWithValue.has(arg) ? args[index + 1] : undefined;

        if (sharedFlags.has(arg)) {
            prepareArgs.push(arg);
            extractArgs.push(arg);
        } else if (sharedWithValue.has(arg)) {
            prepareArgs.push(arg);
            extractArgs.push(arg);
            if (next !== undefined) {
                prepareArgs.push(next);
                extractArgs.push(next);
                index++;
            }
        } else if (prepareOnly.has(arg)) {
            prepareArgs.push(arg);
            if (next !== undefined) {
                prepareArgs.push(next);
                index++;
            }
        } else if (extractOnly.has(arg)) {
            extractArgs.push(arg);
            if (next !== undefined) {
                extractArgs.push(next);
                index++;
            }
        } else {
            extractArgs.push(arg);
        }
    }

    return {
        prepareArgs,
        extractArgs,
    };
}

function main() {
    const [command, subject, ...rest] = process.argv.slice(2);

    if (!command || command === "--help" || command === "-h") {
        printHelp();
        return;
    }

    if (command === "convert" && subject === "bundle") {
        runNodeScript(PREPARE_SCRIPT, rest);
        return;
    }

    if (command === "extract" && subject === "translations") {
        const { prepareArgs, extractArgs } = splitExtractArgs(rest);
        runNodeScript(PREPARE_SCRIPT, prepareArgs);
        runNodeScript(EXTRACT_SCRIPT, extractArgs);
        return;
    }

    throw new Error(`Unknown command: ${[command, subject].filter(Boolean).join(" ")}`);
}

try {
    main();
} catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
}
