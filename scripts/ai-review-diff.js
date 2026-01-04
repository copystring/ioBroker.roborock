 
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { execSync } = require("node:child_process");

async function main() {
	const apiKey = process.env.GOOGLE_GENI_AI_KEY;
	if (!apiKey) {
		console.log("⚠️  GOOGLE_GENI_AI_KEY not set. Skipping AI logic review.");
		return;
	}

	try {
		// Get staged changes
		const diff = execSync("git diff --staged").toString();
		if (!diff || diff.trim() === "") {
			console.log("ℹ️ No staged changes to review.");
			return;
		}

		console.log("🤖 AI is reviewing your logic changes...");

		const genAI = new GoogleGenerativeAI(apiKey);
		const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

		const prompt = `
You are a senior software engineer conducting a code review.
Review the following git diff for LOGIC ERRORS, SECURITY VULNERABILITIES, and ARCHITECTURAL FLAWS.
Ignore style and formatting (they are handled by other tools).

### REPORTING REQUIREMENTS:
1. For every issue found, specify the **FILE PATH** and **APPROXIMATE LINE NUMBER(S)**.
2. Be concise but specific.
3. Only report genuine logical flaws, not opinions on style.
4. If everything looks good, just say "LGTM".

DIFF:
${diff}

Provide your findings in a structured format (e.g., Markdown table or list).
`;

		const result = await model.generateContent(prompt);
		const response = await result.response;
		const text = response.text();

		console.log("\n--- AI CODE REVIEW ---");
		console.log(text);
		console.log("----------------------\n");

	} catch (error) {
		console.error("❌ AI Review failed!");
		if (error.response) {
			console.error("Status:", error.response.status);
			console.error("Data:", JSON.stringify(error.response.data, null, 2));
		} else {
			console.error("Message:", error.message);
		}
	}
}

main();
