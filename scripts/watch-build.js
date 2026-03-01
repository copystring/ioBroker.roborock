const { spawn } = require("child_process");
const path = require("path");
const chokidar = require("chokidar");

const SRC_DIR = path.join(__dirname, "..", "src");
const npmCmd = process.platform === "win32" ? "npm.cmd" : "npm";
let timer = null;
let isBuilding = false;

function runCheck(isInitial = false) {
    if (isBuilding) return;
    isBuilding = true;
    const label = isInitial ? "Initial run" : "Change detected";
    console.log(`\n\n📦 ${label}! Running ci:check (lint + typecheck + unit tests)...\n`);

    try {
        const proc = spawn(`${npmCmd} run ci:check`, { stdio: "inherit", shell: true });
        proc.on("close", (code) => {
            isBuilding = false;
            if (code === 0) {
                console.log("\n✅ ci:check passed! Watching for changes...");
            } else {
                console.error(`\n❌ ci:check failed with code ${code}.`);
            }
        });
    } catch (e) {
        console.error("❌ ci:check failed to start:", e);
        isBuilding = false;
    }
}

console.log(`👀 Watching for changes in: ${SRC_DIR}`);
console.log("   On save: ci:check = lint + typecheck + unit tests (after 10s debounce).");
console.log("   For full CI (incl. integration/package): run 'npm run verify' with JS-Controller stopped.\n");

const watcher = chokidar.watch(SRC_DIR, {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true,
    ignoreInitial: true
});

const DEBOUNCE_MS = 10000; // 10s after last save before building (avoids build on every keystroke)

watcher.on("all", (event, filePath) => {
    if (filePath && (filePath.endsWith(".ts") || filePath.endsWith(".json") || filePath.endsWith(".css") || filePath.endsWith(".html"))) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            runCheck(false);
        }, DEBOUNCE_MS);
    }
});

// Run ci:check once on startup, then watcher handles subsequent triggers
runCheck(true);
