const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const buildInfoPath = path.join(__dirname, "../src/lib/buildInfo.ts");

let commitHash = "unknown";
let buildDate = new Date().toLocaleString("de-DE", { timeZone: "Europe/Berlin" });

try {
	commitHash = execSync("git rev-parse --short HEAD").toString().trim();
	// Use the commit date instead of current time for deterministic builds
	const commitDateStr = execSync("git show -s --format=%ci HEAD").toString().trim();
	buildDate = new Date(commitDateStr).toLocaleString("de-DE", { timeZone: "Europe/Berlin" });

	const isDirty = execSync("git status --porcelain src/").toString().trim().length > 0;
	if (isDirty) {
		commitHash += " (local changes)";
		// If dirty, we technically might want the current date to reflect "work in progress",
		// but to keep it deterministic until committed, sticking to commit date is safer for the "senseless sync" issue.
		// However, if there are local changes, the user MIGHT want to know.
		// Given the user's specific request to avoid "senseless" differences, using the commit date is the strongest guarantee.
		// But let's append a dirty marker to the date if we want, or just leave it.
		// Let's stick to the commit date for the timestamp to ensure stability.
	}
} catch (e) {
	console.warn("Could not get git commit hash", e);
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
