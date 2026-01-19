const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const buildInfoPath = path.join(__dirname, "../src/lib/buildInfo.ts");

let commitHash = "unknown";
let buildDate = new Date().toLocaleString("de-DE", { timeZone: "Europe/Berlin" });

// Use package.json version and its last commit date for deterministic builds that only change on version bumps
const packageJson = require("../package.json");
commitHash = packageJson.version;
try {
	const commitDateStr = execSync("git log -1 --format=%ci package.json", { stdio: "pipe" }).toString().trim();
	buildDate = new Date(commitDateStr).toLocaleString("de-DE", { timeZone: "Europe/Berlin" });
} catch (e) {
	// Fallback to current date if not a git repo or git fails
	console.log("Could not get git info, using current date as build date");
}

const content = `export const buildInfo = {
	buildDate: "${buildDate}",
	commitHash: "${commitHash}",
};
`;

// Only write if changed to preserve file mtime and avoid unnecessary rebuilds/syncs
let currentContent = "";
try {
	currentContent = fs.readFileSync(buildInfoPath, "utf-8");
} catch {
	// File doesn't exist yet
}

if (currentContent !== content) {
	fs.writeFileSync(buildInfoPath, content);
	console.log(`Updated buildInfo.ts with date: ${buildDate} and hash: ${commitHash}`);
} else {
	console.log(`buildInfo.ts is up to date (hash: ${commitHash})`);
}
