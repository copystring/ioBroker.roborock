const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const buildInfoPath = path.join(__dirname, "../src/lib/buildInfo.ts");

let commitHash = "unknown";
const buildDate = new Date().toLocaleString("de-DE", { timeZone: "Europe/Berlin" });

try {
	commitHash = execSync("git rev-parse --short HEAD").toString().trim();
	const isDirty = execSync("git status --porcelain src/").toString().trim().length > 0;
	if (isDirty) {
		commitHash += " (local changes)";
	}
} catch (e) {
	console.warn("Could not get git commit hash");
}

const content = `export const buildInfo = {
	buildDate: "${buildDate}",
	commitHash: "${commitHash}",
};
`;

fs.writeFileSync(buildInfoPath, content);
console.log(`Updated buildInfo.ts with date: ${buildDate} and hash: ${commitHash}`);
