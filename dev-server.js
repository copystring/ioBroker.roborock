// dev-server.js - Unified Development Server
// Runs Builds, Backend Tests, and Frontend Tests in a single window
const { fork, exec } = require("child_process");
const path = require("path");

// ANSI color codes
const colors = {
	reset: "\x1b[0m",
	backend: "\x1b[36m",   // Cyan
	web: "\x1b[33m",       // Yellow
	test: "\x1b[35m",      // Magenta
	vitest: "\x1b[34m",    // Blue
	error: "\x1b[31m",     // Red
	success: "\x1b[32m",   // Green
	info: "\x1b[90m"       // Gray
};

/**
 * @param {string} label
 * @param {string} color
 */
function prefix(label, color) {
	return `${color}[${label}]${colors.reset}`;
}

/**
 * @param {string} name
 * @param {string} modulePath
 * @param {string[]} args
 * @param {string} color
 */
function startProcess(name, modulePath, args, color) {
	console.log(`${prefix(name, color)} Starting...`);

	const proc = fork(modulePath, args, {
		cwd: __dirname,
		silent: true,
		stdio: "pipe"
	});

	proc.stdout.on("data", (data) => {
		const lines = data.toString().split("\n");
		lines.forEach(line => {
			if (line.trim() && !line.includes("npm warn") && !line.includes("Unknown global config")) {
				console.log(`${prefix(name, color)} ${line.trim()}`);
			}
		});
	});

	proc.stderr.on("data", (data) => {
		const lines = data.toString().split("\n");
		lines.forEach(line => {
			if (line.trim() && !line.includes("npm warn") && !line.includes("Unknown global config")) {
				console.error(`${prefix(name, colors.error)} ${line.trim()}`);
			}
		});
	});

	proc.on("close", (code) => {
		if (code !== null && code !== 0) {
			console.error(`${prefix(name, colors.error)} Process exited with code ${code}`);
		}
	});

	return proc;
}

// Start all watch processes
console.clear();
console.log("\n" + "=".repeat(70));
console.log("  🚀 ioBroker.roborock - Unified Development Server");
console.log("=".repeat(70));
console.log(`  ${colors.backend}Builds${colors.reset}   | ${colors.test}Backend Tests${colors.reset}   | ${colors.vitest}Frontend Tests${colors.reset}`);
console.log("=".repeat(70) + "\n");

// Copy pathProcessor first
console.log(prefix("SETUP", colors.web) + " Copying pathProcessor.ts...");
exec("shx cp src/lib/pathProcessor.ts src/www/pathProcessor.ts", (err) => {
	if (err) {
		console.error(prefix("SETUP", colors.error) + " Failed to copy pathProcessor.ts");
	}
});

// Resolve paths to executables
const tscPath = path.join(__dirname, "node_modules", "typescript", "bin", "tsc");
const mochaPath = path.join(__dirname, "node_modules", "mocha", "bin", "mocha");
const vitestPath = path.join(__dirname, "node_modules", "vitest", "vitest.mjs");

// Start all processes using fork
const processes = [
	// 1. Builds (Backend + Web)
	// Use tsconfig.json for backend (includes tests) and tsconfig.web.json for frontend
	startProcess("BUILDS", tscPath, ["-b", "tsconfig.json", "tsconfig.web.json", "--watch"], colors.backend),

	// 2. Backend Tests (Mocha)
	startProcess("TESTS", mochaPath, [
		"--watch",
		"--config", "test/mocharc.custom.json",
		"build/!(www)/**/*.test.js"
	], colors.test),

	// 3. Frontend Tests (Vitest)
	startProcess("VITEST", vitestPath, ["watch", "src/www"], colors.vitest)
];

// Clean up on exit
process.on("SIGINT", () => {
	console.log("\n\n" + "=".repeat(70));
	console.log("  🛑 Stopping all watch processes...");
	console.log("=".repeat(70) + "\n");

	processes.forEach(proc => {
		if (proc && !proc.killed) {
			proc.kill("SIGINT");
		}
	});

	setTimeout(() => process.exit(0), 500);
});

console.log(colors.success + "✓ All watch processes started" + colors.reset);
console.log(colors.info + "  Press Ctrl+C to stop all processes" + colors.reset + "\n");
console.log("─".repeat(70) + "\n");
