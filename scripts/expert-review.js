const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const https = require("https");

const API_KEY = process.env.GOOGLE_GENI_AI_KEY;
const MODEL_NAME = "gemini-3-pro-preview";
const BATCH_SIZE = 100;

if (!API_KEY) {
    console.error("❌ GOOGLE_GENI_AI_KEY is not set. Please set it to run the Expert Review.");
    process.exit(1);
}

const REPORT_FILE = "expert-review.md";

console.log("🕵️  Expert Advisor is analyzing your current work...");

// 1. Get Unstaged & Untracked Files
let files = [];
try {
    const modified = execSync('git diff --name-only HEAD').toString().trim().split(/[\r\n]+/);
    const untracked = execSync('git ls-files --others --exclude-standard').toString().trim().split(/[\r\n]+/);
    const allFiles = [...new Set([...modified, ...untracked])];
    files = allFiles.filter(f => f && f.endsWith(".ts") && !f.startsWith("build/") && !f.endsWith(".d.ts"));
} catch (e) {
    console.error("❌ Failed to get git changes:", e.message);
    process.exit(1);
}

if (files.length === 0) {
    console.log("✅ No relevant source files (.ts inside src/) modified.");
    process.exit(0);
}

console.log(`📝 Analyzing ${files.length} modified file(s)...`);

// 2. Prepare Batches
const fileBatches = [];
for (let i = 0; i < files.length; i += BATCH_SIZE) {
    fileBatches.push(files.slice(i, i + BATCH_SIZE));
}

const systemInstruction = `
You are a Senior Principal Architect reviewing "Work In Progress" code.
Your goal is to provide helpful, high-level advice to the developer.
DO NOT act as a linter. DO NOT complain about formatting, exact types, or missing JSDoc.

**CRITICAL RULES:**
1. **KEEP IT BRIEF**: Simple, direct language. Max 1-2 sentences.
2. **USE MARKDOWN LINKS**: The 'Location' field MUST be a clickable link: [path/to/file:Line](path/to/file#L<LineNumber>)
3. **ONLY REPORT ISSUES**: Do NOT say "it looks good". Only report Logic Errors, Architectural Risks, or Optimizations.
4. **LGTM**: If there are NO issues in a file, do NOT mention the file. If there are NO issues in ALL files (in this batch), output "LGTM".

Focus ONLY on:
1. Logic Errors, Architectural Risks, Optimizations.

Output Format (Markdown):
### [File Name]
**Reason**: ...
**Location**: LINK
#### Preview
\`\`\`typescript
...
\`\`\`
#### Suggestion
\`\`\`typescript
...
\`\`\`
`.trim();

async function generateReviewForBatch(batchFiles) {
    let promptData = [];
    for (const file of batchFiles) {
        try {
            let fullContent = "(File was deleted)";
            if (fs.existsSync(file)) fullContent = fs.readFileSync(file, "utf-8");
            let diff = "";
            try { diff = execSync(`git diff HEAD -- "${file}"`).toString(); } catch (e) { diff = "(New/Untracked)"; }

            promptData.push(`\n--- FILE: ${file} ---\nDIFF:\n${diff}\nFULL CONTENT:\n${fullContent}\n------------------------\n`);
        } catch (e) {}
    }

    const payload = {
        contents: [{ parts: [{ text: `Review these files:\n${promptData.join("\n")}` }] }],
        generationConfig: { maxOutputTokens: 65536, temperature: 0.2 },
        systemInstruction: { parts: [{ text: systemInstruction }] }
    };

    const options = {
        hostname: "generativelanguage.googleapis.com",
        path: `/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        timeout: 300000 // 5 minutes
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let data = "";
            res.on("data", (c) => data += c);
            res.on("end", () => {
                try {
                    const response = JSON.parse(data);
                    if (response.candidates &&
                        response.candidates.length > 0 &&
                        response.candidates[0].content &&
                        response.candidates[0].content.parts &&
                        response.candidates[0].content.parts.length > 0) {
                        resolve(response.candidates[0].content.parts[0].text);
                    } else {
                        // Reject specific errors so we can retry
                         const reason = response.candidates && response.candidates[0] ? response.candidates[0].finishReason : "Unknown Error";
                         console.error("❌ Batch API Error Response:", JSON.stringify(response, null, 2));

                         // If it's a content filtering or max token issue, we MUST reject to trigger retry
                         // But if it's "SAFETY", retrying might not help?
                         // Actually, splitting batch might help both MAX_TOKENS and some content issues.
                         reject(new Error(`API Error: ${reason}`));
                    }
                } catch (e) {
                    console.error("❌ Batch Parse Error:", e);
                    resolve(`(Parse Error: ${e.message})`);
                }
            });
        });
        req.on("timeout", () => {
             req.destroy();
             reject(new Error("Request Timeout (5 minutes)"));
        });

        req.on("error", (e) => resolve(`(Request Error: ${e.message})`));
        req.write(JSON.stringify(payload));
        req.end();
    });
}

// 3. Execution Loop
(async () => {
    let fullReport = "# 🕵️ Expert Advisor Report\n\n## 🔍 Findings\n\n";
    let hasIssues = false;

    for (let i = 0; i < fileBatches.length; i++) {
        const batch = fileBatches[i];
        console.log(`   ⏳ Processing Batch ${i+1}/${fileBatches.length} (${batch.length} files)...`);

        try {
            const result = await generateReviewForBatch(batch);
            if (result && !result.includes("LGTM")) {
                fullReport += result + "\n\n";
                hasIssues = true;
            }
        } catch (err) {
            console.error(`   ❌ Batch ${i+1} failed (Batch Size: ${batch.length}). Retrying individually...`);
            // Retry individually
            for (const file of batch) {
                try {
                    console.log(`      ⏳ Retrying ${file}...`);
                    const singleResult = await generateReviewForBatch([file]);
                    if (singleResult && !singleResult.includes("LGTM")) {
                        fullReport += singleResult + "\n\n";
                        hasIssues = true;
                    }
                } catch (singleErr) {
                     console.error(`      ❌ Failed to review ${file}:`, singleErr);
                     fullReport += `### ${file}\n**Error**: Failed to review file. ${singleErr.message || singleErr}\n\n`;
                     hasIssues = true;
                }
            }
        }
    }

    if (!hasIssues) {
        fullReport += "LGTM 🚀\n";
    }

    fullReport += "\n---\n**✅ Analysis Complete.**\n";
    fullReport += `Analyzed ${files.length} files. Files not listed above passed the review (LGTM).`;

    fs.writeFileSync(REPORT_FILE, fullReport);
    console.log(`\n✨ Review generated! Check ${REPORT_FILE}`);
})();
