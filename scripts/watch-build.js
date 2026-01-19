
const { spawn } = require("child_process");
const path = require("path");
const chokidar = require("chokidar");

const SRC_DIR = path.join(__dirname, "..", "src");
let timer = null;
let isBuilding = false;

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

// Initial build
build();

// Watch src directory using chokidar for cross-platform support
const watcher = chokidar.watch(SRC_DIR, {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true,
    ignoreInitial: true
});

watcher.on("all", (event, path) => {
    if (path && (path.endsWith(".ts") || path.endsWith(".json") || path.endsWith(".css") || path.endsWith(".html"))) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            build();
        }, 300); // 300ms debounce
    }
});
