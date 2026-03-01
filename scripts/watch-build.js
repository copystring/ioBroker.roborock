const { spawn } = require("child_process");
const path = require("path");
const chokidar = require("chokidar");

const SRC_DIR = path.join(__dirname, "..", "src");
let timer = null;
let isBuilding = false;

// Packages required for lint/CI (same as "npm ci" on GitHub). If any is missing, CI fails with
// "Cannot find package ..." – this check surfaces that error before the first build.
const REQUIRED_PACKAGES = [
    "@eslint/js",
    "@eslint/eslintrc",
    "eslint",
    "eslint-config-prettier",
    "eslint-plugin-import",
    "eslint-plugin-jsdoc",
    "eslint-plugin-prettier"
];

function checkCiDeps() {
    const missing = [];
    for (const pkg of REQUIRED_PACKAGES) {
        try {
            require.resolve(pkg);
        } catch {
            missing.push(pkg);
        }
    }
    if (missing.length > 0) {
        console.error("\n❌ Missing dependencies (CI would fail here too):");
        missing.forEach((p) => console.error("   -", p));
        console.error("\n   Run: npm install  (or npm ci)\n");
        process.exit(1);
    }
}

function build() {
    if (isBuilding) return;
    isBuilding = true;
    console.log("\n\n📦 Change detected! Starting full build cycle...");

    try {
        // Run the build command
        const npmCmd = process.platform === "win32" ? "npm.cmd" : "npm";
        // Passing the command as a string with shell: true avoids the DEP0190 security warning.
        // We pass --silent to npm to keep it quiet, and another -- --silent to pass it to generate-docs.js
        const buildProcess = spawn(`${npmCmd} run build --silent -- --silent`, { stdio: "inherit", shell: true });

        buildProcess.on("close", (code) => {
            if (code === 0) {
                process.stdout.write("✨ Build successful! Starting tests... ");

                // We use --reporter=dot and --no-coverage for minimalism.
                // VITE_CJS_IGNORE_WARNING suppresses the CJS deprecation warning from Vite/Rollup
                const testProcess = spawn(`${npmCmd} run test:unit -- --silent --reporter=dot --no-coverage`, {
                    stdio: "inherit",
                    shell: true,
                    env: { ...process.env, VITE_CJS_IGNORE_WARNING: "true" }
                });

                testProcess.on("close", (testCode) => {
                    isBuilding = false;
                    if (testCode === 0) {
                        console.log("\n✅ Tests passed! Watching for changes...");
                    } else {
                        console.error(`\n❌ Tests failed with code ${testCode}.`);
                    }
                });
            } else {
                console.error(`\n❌ Build failed with code ${code}.`);
                isBuilding = false;
            }
        });
    } catch (e) {
        console.error("❌ Build failed to start:", e);
        isBuilding = false;
    }
}

console.log(`👀 Watching for changes in: ${SRC_DIR}`);

checkCiDeps();
build();

// Watch src directory using chokidar for cross-platform support
const watcher = chokidar.watch(SRC_DIR, {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true,
    ignoreInitial: true
});

const DEBOUNCE_MS = 10000; // Wait 10s after last save before building (avoids build on every keystroke/save)

watcher.on("all", (event, path) => {
    if (path && (path.endsWith(".ts") || path.endsWith(".json") || path.endsWith(".css") || path.endsWith(".html"))) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            build();
        }, DEBOUNCE_MS);
    }
});
