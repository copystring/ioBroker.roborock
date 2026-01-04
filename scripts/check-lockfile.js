const { execSync } = require("node:child_process");

try {
	console.log("🔍 Checking if package-lock.json is in sync...");
	// Use --dry-run and --package-lock-only to see if anything changes
	const diff = execSync("npm install --package-lock-only --dry-run").toString();

	// If git status shows changes in package-lock.json after a real sync attempt, it's a fail.
	// But simpler: just run npm install and see if git thinks it changed.
	execSync("npm install --package-lock-only");
	const status = execSync("git status --porcelain package-lock.json").toString();

	if (status.includes("package-lock.json")) {
		console.error("❌ package-lock.json is NOT in sync with package.json!");
		console.error("Please run 'npm install' and commit the changes.");
		process.exit(1);
	}
	console.log("✅ package-lock.json is in sync.");
} catch (error) {
	console.error("❌ Lockfile check failed:", error.message);
	process.exit(1);
}
