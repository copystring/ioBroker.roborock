const { execSync } = require("node:child_process");
try {
	console.log("🔍 Validating package configurations...");
	execSync("npx mocha test/package test/validate_configs --exit", { stdio: "inherit" });
} catch (error) {
	process.exit(1);
}
