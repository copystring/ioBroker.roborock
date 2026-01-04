
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { execSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

/**
 * 👑 AI Supreme Architect - The Modular Guardrail
 * Features: Instruction Separation, Adaptive Dependency Retrieval, System DNA Awareness.
 */
async function main() {
	const apiKey = process.env.GOOGLE_GENI_AI_KEY;
	if (!apiKey) {
		console.log("⚠️  GOOGLE_GENI_AI_KEY not set. Skipping AI logic review.");
		return;
	}

	try {
		// 1. Get staged files and content
		let stagedFiles = execSync("git diff --name-only --staged").toString().trim().split("\n").filter(f => f);
		let diff = execSync("git diff --staged").toString();
		let targetRef = "Staged";

		// Fallback: Check last commit if nothing is staged
		if (!diff || diff.trim() === "") {
			console.log("ℹ️ No staged changes. Checking last commit (HEAD)...");
			stagedFiles = execSync("git diff --name-only HEAD~1 HEAD").toString().trim().split("\n").filter(f => f);
			diff = execSync("git diff HEAD~1 HEAD").toString();
			targetRef = execSync("git rev-parse --short HEAD").toString().trim();
		}

		if (!diff || diff.trim() === "") {
			console.log("ℹ️ No changes found (Staged or HEAD). Exiting.");
			return;
		}

		console.log("🧠 Supreme Architect is initializing Modular Context...");

		// 2. Load Modular Instructions
		const instructionsPath = path.join(__dirname, "ai-review-instructions.md");
		let systemPrompt = "";
		if (fs.existsSync(instructionsPath)) {
			systemPrompt = fs.readFileSync(instructionsPath, "utf-8");
		} else {
			console.log("⚠️  Instructions file missing. Using fallback basic prompt.");
			systemPrompt = "Review the following diff for logic errors and output in Markdown.";
		}

		// 3. System DNA & Staged Content
		const dnaFiles = [
			"package.json",
			"io-package.json",
			"tsconfig.json",
			"tsconfig.web.json",
			"eslint.config.mjs",
			".eslintrc.json",
			".prettierrc",
			".prettierrc.json",
			".editorconfig",
			".lintstagedrc.json"
		];
		let contextMap = new Map();

		for (const file of dnaFiles) {
			const fullPath = path.join(process.cwd(), file);
			if (fs.existsSync(fullPath)) {
				contextMap.set(file, fs.readFileSync(fullPath, "utf-8"));
			}
		}

		for (const file of stagedFiles) {
			const fullPath = path.join(process.cwd(), file);
			// Get file content
			let content = "";
			try {
				if (targetRef === "Staged") {
					if (fs.existsSync(fullPath) && fs.lstatSync(fullPath).isFile()) {
						content = fs.readFileSync(fullPath, "utf8");
					}
				} else {
					// Read from git object if checking HEAD
					content = execSync(`git show HEAD:${file}`).toString();
				}
			} catch (e) {
				content = "(Deleted or New File)";
			}

			if (content && content !== "(Deleted or New File)") {
				contextMap.set(file, content);
			}
		}

		// 4. Adaptive Dependency Retrieval
		const importRegex = /from\s+['"](\.\.?\/[^'"]+)['"]/g;
		let match;
		while ((match = importRegex.exec(diff)) !== null) {
			const relativePath = match[1];
			const extensions = [".ts", ".js", ".d.ts", "/index.ts", "/index.js"];
			for (const ext of extensions) {
				const resolvedPath = path.join(path.dirname(stagedFiles[0] || ""), relativePath + ext);
				const fullResolvedPath = path.join(process.cwd(), resolvedPath);

				if (fs.existsSync(fullResolvedPath) && !contextMap.has(resolvedPath)) {
					contextMap.set(resolvedPath, fs.readFileSync(fullResolvedPath, "utf-8"));
					break;
				}
			}
		}

		let finalContext = "";
		contextMap.forEach((content, name) => {
			finalContext += `\n--- SOURCE: ${name} ---\n${content}\n`;
		});

		console.log(`🚀 Analyzing ${stagedFiles.length} changes with ${contextMap.size} DNA/Dependency assets...`);

		const genAI = new GoogleGenerativeAI(apiKey);
		const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

		const prompt = `
${systemPrompt}

### CURRENT OPERATIONAL CONTEXT:

SYSTEM CONTEXT (DNA & DEPENDENCIES):
${finalContext}

GIT DIFF OF CHANGES:
${diff}
`;

		const result = await model.generateContent(prompt);
		const response = await result.response;
		const text = response.text();

		// Check for rejection keywords (BLOCKING PRE-PUSH)
		if (text.includes("❌")) {
			console.error("\n⛔ BLOCKING PUSH: AI Review rejected the changes.");
			console.error("   Fix the issues or use 'git push --no-verify' to bypass.\n");
			process.exit(1);
		}

		// Terminal Output
		console.log("\n--- MODULAR SUPREME REVIEW ---");
		console.log(text.split('\n').slice(0, 15).join('\n') + (text.split('\n').length > 15 ? "\n..." : ""));
		console.log("------------------------------\n");

		// Persist Report
		const reviewFile = path.join(__dirname, "..", "ai-review.md");
		const commitHash = execSync("git rev-parse --short HEAD").toString().trim();

		const header = `# 👑 Supreme Architect Review (Modular)\n\n**Config**: Loaded from \`ai-review-instructions.md\`\n**Awareness**: System DNA + Adaptive Context\n**Target**: \`${commitHash}\`\n\n---\n\n`;
		const footer = `\n\n---\n*Verified by Gemini 3.0 Frontier - Modular Supreme Mode*`;

		fs.writeFileSync(reviewFile, header + text + footer);
		console.log(`✨ Modular insights saved to: ${reviewFile}`);

	} catch (error) {
		console.error("❌ Modular Review failed!");
		console.error(error.message);
	}
}
main();
