const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const commitInfoPath = path.join(__dirname, "../src/lib/commitInfo.ts");

console.log("--- [ioBroker.roborock] Commit Info Script Started ---");

let commitHash = "unknown";
let commitDate = new Date().toLocaleString("de-DE", { timeZone: "Europe/Berlin" });

const packageJson = require("../package.json");
commitHash = packageJson.version;
try {
	// Check if forced update is requested (e.g. by pre-commit hook)
	if (process.argv.includes("--force-current-date")) {
		commitDate = new Date().toLocaleString("de-DE", { timeZone: "Europe/Berlin" });
		console.log("Forced current date (pre-commit mode).");
	} else {
		// Get date of last commit that touched anything EXCEPT this commit info file itself
		// This prevents a loop where building updates the file, which creates a new commit, which updates the file...
		const commitDateStr = execSync('git log -1 --format=%ci . ":(exclude)src/lib/commitInfo.ts"', { stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
		commitDate = new Date(commitDateStr).toLocaleString("de-DE", { timeZone: "Europe/Berlin" });
	}
} catch (e) {
	// If git failed, we assume we are in a production install where the file already exists.
	// We do nothing (return) to preserve the existing file.
	// If the file is missing for some reason, the TypeScript compiler will complain later.
	console.log("   [Info] Install via GitHub URL detected. Using existing info from src/lib/commitInfo.ts");
	console.log("--- [ioBroker.roborock] Commit Info Script Finished (Fallback) ---");
	return;
}

const content = `export const commitInfo = {
	commitDate: "${commitDate}",
	commitHash: "${commitHash}",
};
`;

// Only write if changed to preserve file mtime and avoid unnecessary rebuilds/syncs
let currentContent = "";
try {
	currentContent = fs.readFileSync(commitInfoPath, "utf-8");
} catch {
	// File doesn't exist yet
}

if (currentContent !== content) {
	fs.writeFileSync(commitInfoPath, content);
	console.log(`   [Success] Updated commitInfo.ts with date: ${commitDate} and hash: ${commitHash}`);
} else {
	console.log(`   [Info] commitInfo.ts is up to date (hash: ${commitHash})`);
}
console.log("--- [ioBroker.roborock] Commit Info Script Finished (Success) ---");
