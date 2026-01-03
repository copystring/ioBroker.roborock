
const fs = require("fs");
const path = require("path");

const module519Path = "C:\\iobroker\\iobroker.roborock\\Roborock Q7 Series\\output\\module_519.js";
const generatedDocPath = "C:\\iobroker\\iobroker.roborock\\docs\\protocols\\Q7\\Q7_Values_EN.md";

function verify() {
	console.log("Verifying documentation completeness...");


	// 1. Get Expected IDs from module_519.js
	const content519 = fs.readFileSync(module519Path, "utf8");

	// Look for assignment r3['FAULT_STATUS'] = r6;
	// Then search backwards/around for r6 = { ... }

	// Simplification: Just find the large object containing F_0, F_407, etc.
	const faultBlockMatch = content519.match(/r6\s*=\s*\{'F_0':\s*0,\s*'F_407':\s*407,[\s\S]*?\};/);

	if (!faultBlockMatch) {
		console.error("Could not find FAULT_STATUS object definition in module_519.js (r6 = {'F_0': 0 ...)");
		return;
	}
	const faultBlock = faultBlockMatch[0];

	const expectedIds = [];
	const idRegex = /'F_(\d+)':\s*(\d+)/g;
	let m;
	while ((m = idRegex.exec(faultBlock)) !== null) {
		expectedIds.push(m[2]);
	}

	// Also check for separate assignments like r6['F_2017'] = 2017;
	// These appear after the main block.
	// We can search the whole file for r6['F_XXXX'] = XXXX
	// But since r6 is reused, we should be careful.
	// Actually the file structure shows they are right after.
	// Let's just grep the whole file for 'F_(\d+)'

	const allIdsRegex = /'F_(\d+)'/g;
	let m2;
	while ((m2 = allIdsRegex.exec(content519)) !== null) {
		if (!expectedIds.includes(m2[1])) {
			expectedIds.push(m2[1]);
		}
	}

	console.log(`Found ${expectedIds.length} expected fault codes in module_519.js`);

	// 2. Get Documented IDs from Markdown
	const docContent = fs.readFileSync(generatedDocPath, "utf8");
	// Table format: | 500 | F_500 | Title | Summary |
	const documentedIds = [];
	const missingTranslations = [];

	// Find the Fault Codes table
	const tableRegex = /\| (\d+) \| F_\1 \| (.*?) \| (.*?) \|/g;
	while ((m = tableRegex.exec(docContent)) !== null) {
		const id = m[1];
		const title = m[2].trim();
		const summary = m[3].trim();

		documentedIds.push(id);

		if (title === "-" || title === "" || summary === "-" || summary === "") {
			// Some might legitimately be empty if source is empty, but let's flag them
			// actually my script puts '-' if undefined.
			if (title === "-" && summary === "-") {
				missingTranslations.push(id);
			}
		}
	}
	console.log(`Found ${documentedIds.length} documented codes in Markdown.`);

	// 3. Compare
	const missingFromDoc = expectedIds.filter(id => !documentedIds.includes(id));

	if (missingFromDoc.length > 0) {
		console.log("CRITICAL: The following codes are defined in module_519 but MISSING from documentation:");
		console.log(missingFromDoc.join(", "));
	} else {
		console.log("SUCCESS: All known codes are present in the documentation table.");
	}

	if (missingTranslations.length > 0) {
		console.log("\nWARNING: The following codes are present but have NO Translation (Title/Summary are '-'):");
		// Filter out 0 (No error) as it might remain empty
		const realMissing = missingTranslations.filter(id => id !== "0");
		if (realMissing.length > 0) console.log(realMissing.join(", "));
		else console.log("None (ignoring code 0)");
	} else {
		console.log("\nSUCCESS: All documented codes have at least some translation.");
	}
}

verify();
