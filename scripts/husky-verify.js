
const { execSync } = require("child_process");

try {
  console.log("🔍 Running Lint-Staged via Node...");
  // Call lint-staged binary directly via node to allow running without bash
  execSync("node node_modules/lint-staged/bin/lint-staged.js", { stdio: "inherit" });
} catch (e) {
  process.exit(1);
}
