const { spawn } = require("child_process");
const path = require("path");
const chokidar = require("chokidar");

const SRC_DIR = path.join(__dirname, "..", "src");
const npmCmd = process.platform === "win32" ? "npm.cmd" : "npm";
let timer = null;
let isBuilding = false;

// Run a full command string in the shell. Single string avoids DEP0190 and works on Windows (no spawn EINVAL).
function runShell(command, onDone) {
    const child = spawn(command, { stdio: "inherit", shell: true });
    child.on("close", (code) => onDone(code == null ? 1 : code));
}

// Run lint once (includes check-eslint-peer-deps). Then start watch.
function runLintThenStart(onSuccess) {
    runShell("npm run lint", (lintCode) => {
        if (lintCode !== 0) {
            console.error("\n❌ Lint failed. Fix errors and run watch:all again.\n");
            process.exit(1);
        }
        onSuccess();
    });
}

function build() {
    if (isBuilding) return;
    isBuilding = true;
    console.log("\n\n📦 Change detected! Starting full build cycle...");

    try {
        // Run the build command
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

runLintThenStart(() => {
    build();

    // Watch src directory using chokidar for cross-platform support
    const watcher = chokidar.watch(SRC_DIR, {
        ignored: /(^|[\/\\])\../, // ignore dotfiles
        persistent: true,
        ignoreInitial: true
    });

    const DEBOUNCE_MS = 10000; // Wait 10s after last save before building (avoids build on every keystroke/save)

    watcher.on("all", (event, filePath) => {
        if (filePath && (filePath.endsWith(".ts") || filePath.endsWith(".json") || filePath.endsWith(".css") || filePath.endsWith(".html"))) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                build();
            }, DEBOUNCE_MS);
        }
    });
});
