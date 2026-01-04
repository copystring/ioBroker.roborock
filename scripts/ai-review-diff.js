
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
		// 1. Get staged files (excluding build/ and lockfiles)
		const getStagedFiles = (cmd) => execSync(cmd).toString().trim().split("\n")
			.filter(f => f && !f.startsWith("build/") && !f.includes("package-lock.json"));

		let stagedFiles = getStagedFiles("git diff --name-only --staged");
		let targetRef = "Staged";
		let diffSource = "--staged";
		let commitMsg = "Staged Changes (Not yet committed)";

		// Fallback: Check last commit if nothing is staged
		if (stagedFiles.length === 0) {
			console.log("ℹ️ No staged changes. Checking last commit (HEAD)...");
			stagedFiles = getStagedFiles("git diff --name-only HEAD~1 HEAD");
			targetRef = execSync("git rev-parse --short HEAD").toString().trim();
			diffSource = "HEAD~1 HEAD";
			commitMsg = execSync("git log -1 --pretty=%B").toString().trim();
		}

		if (stagedFiles.length === 0) {
			console.log("ℹ️ No relevant changes found (ignoring build/). Exiting.");
			return;
		}

		// Construct structured diff with file headers
		let structuredDiff = "";
		for (const file of stagedFiles) {
			try {
				const fileDiff = execSync(`git diff ${diffSource} -- "${file}"`, { maxBuffer: 1024 * 1024 * 10 }).toString();
				if (fileDiff.trim()) {
					structuredDiff += `\n\n===================================================================\n`;
					structuredDiff += `VIDEO_GAME_LEVEL_LOADED: ${file}\n`; // Unique token for AI
					structuredDiff += `===================================================================\n`;
					structuredDiff += fileDiff;
				}
			} catch (e) {
				console.warn(`⚠️ Could not read diff for ${file}`);
			}
		}

		console.log("🧠 Supreme Architect is initializing Modular Context...");

		// 2. Load Modular Instructions
		const instructionsPath = path.join(__dirname, "ai-review-instructions.md");
		let systemPrompt = "";
		if (fs.existsSync(instructionsPath)) {
			systemPrompt = fs.readFileSync(instructionsPath, "utf-8");
		} else {
            // Fallback Prompt with improved formatting instructions
			systemPrompt = `
You are the Supreme Architect, a high-level code reviewer.
Review the provided code changes.
**CRITICAL INSTRUCTION**: Group your feedback by filename.
Use the header "## 📂 File: [filename]" for each section.
Ignore any changes in 'build/' folder if they appear.
`;
		}

		// 3. System DNA & Staged Content (Restored Full List)
		const dnaFiles = [
			"package.json",
			"io-package.json",
			"tsconfig.json",
			"tsconfig.web.json",
			"eslint.config.mjs",
			".eslintrc.json",
			".prettierrc",
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

		// 4. Adaptive Dependency Retrieval (Restored)
		// Scans for imports in the changed code and loads those files for context
		const importRegex = /from\s+['"](\.\.?\/[^'"]+)['"]/g;
		let match;
		while ((match = importRegex.exec(structuredDiff)) !== null) {
			const relativePath = match[1];
			const extensions = [".ts", ".js", ".d.ts", "/index.ts", "/index.js"];
			for (const ext of extensions) {
				const resolvedPath = path.join(path.dirname(stagedFiles[0] || ""), relativePath + ext);
				const fullResolvedPath = path.join(process.cwd(), resolvedPath);

				if (fs.existsSync(fullResolvedPath) && !contextMap.has(resolvedPath)) {
					const depContent = fs.readFileSync(fullResolvedPath, "utf-8");
					// Limit dependency content size to avoid token overflow
					if (depContent.length < 20000) {
						contextMap.set(resolvedPath, depContent);
						console.log(`   🔗 Linked dependency: ${resolvedPath}`);
					} else {
						console.log(`   ⚠️ Dependency too large, skipping: ${resolvedPath}`);
					}
					break;
				}
			}
		}

		let finalContext = "";
		contextMap.forEach((content, name) => {
			finalContext += `\n--- SOURCE: ${name} ---\n${content}\n`;
		});

		console.log(`🚀 Analyzing ${stagedFiles.length} files...`);

		const genAI = new GoogleGenerativeAI(apiKey);
		const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

		const prompt = `
${systemPrompt}

### INSTRUCTIONS FOR OUTPUT FORMAT:
1. **Header**: Start with a summary table of files reviewed and their status (Pass/Fail/Warn).
2. **Review Commit**: Check if the code changes match the intent of the commit message.
3. **Per-File details**: For each file, use the header "## 📂 File: [filename]".
4. **Specifics**: Quote the code line numbers.
5. **Style**: Use emojis, bold text, and clear "Why this is better" explanations.
6. **No Build**: Do NOT mention files in 'build/' directory.

### CURRENT OPERATIONAL CONTEXT:

COMMIT MESSAGE:
"${commitMsg}"

SYSTEM CONTEXT (DNA):
${finalContext}

GIT DIFF OF CHANGES (Structured per file):
${structuredDiff}
`;
		const result = await model.generateContent(prompt);
		const response = await result.response;
		const text = response.text();

		// Calculate Costs
		const PRICING = {
			GEMINI_1_5_FLASH: { input: 0.50, output: 1.50 }
		};
		const currentModelPricing = PRICING.GEMINI_1_5_FLASH;

		const usage = response.usageMetadata || { promptTokenCount: 0, candidatesTokenCount: 0 };
		const inputCost = (usage.promptTokenCount / 1000000) * currentModelPricing.input;
		const outputCost = (usage.candidatesTokenCount / 1000000) * currentModelPricing.output;
		const totalCost = inputCost + outputCost;

		// Persist Report
		const reviewFile = path.join(__dirname, "..", "ai-review.md");
		const commitHash = execSync("git rev-parse --short HEAD").toString().trim();

		const header = `# 👑 Supreme Architect Review (Modular)\n\n**Config**: Loaded from \`ai-review-instructions.md\`\n**Awareness**: System DNA + Adaptive Context\n**Target**: \`${commitHash}\`\n\n---\n\n`;
		const statsFooter = `\n\n---\n### 💰 Architect's Bill\n| Type | Tokens | Cost (Est.) |\n| :--- | :--- | :--- |\n| Input | ${usage.promptTokenCount} | $${inputCost.toFixed(6)} |\n| Output | ${usage.candidatesTokenCount} | $${outputCost.toFixed(6)} |\n| **Total** | | **$${totalCost.toFixed(6)}** |\n\n*Verified by Gemini 3.0 Frontier - Modular Supreme Mode*`;

		fs.writeFileSync(reviewFile, header + text + statsFooter);
		console.log(`✨ Modular insights saved to: ${reviewFile}`);

		// Check for rejection keywords (BLOCKING PRE-PUSH)
		// We avoid blocking on "❌" because the AI often uses it in educational examples ("❌ The Scary Code")
		const isRejected = text.includes("Status: ⚠️ Action Required") ||
						   text.includes("Status: ⛔ Rejected") ||
						   text.includes("Verdict: ⛔ Rejected") ||
						   (text.includes("Action Required") && !text.includes("Status: Approved"));

		if (isRejected) {
			console.error("\n⛔ BLOCKING PUSH: AI Review indicates changes are required!");
			console.error("   Check ai-review.md for details.");
			console.error("   Fix the issues or use 'git push --no-verify' to bypass.\n");
			process.exit(1);
		}

	} catch (error) {
		console.error("❌ Modular Review failed!");
		console.error(error.message);
	}
}
main();
