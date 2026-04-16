const { spawnSync } = require("node:child_process");

function runGit(args, options = {}) {
	const result = spawnSync("git", args, {
		encoding: "utf8",
		stdio: options.stdio ?? ["ignore", "pipe", "pipe"],
	});

	if (options.allowFailure) {
		return result;
	}

	if (result.status !== 0) {
		const stderr = (result.stderr || "").trim();
		throw new Error(stderr || `git ${args.join(" ")} failed with exit code ${result.status}`);
	}

	return result;
}

function uniqueNonEmptyLines(text) {
	return [...new Set(
		text
			.split(/\r?\n/)
			.map((line) => line.trim())
			.filter(Boolean)
	)];
}

try {
	const targetRef = process.argv[2] || "origin/main";
	const base = runGit(["merge-base", "HEAD", targetRef]).stdout.trim();

	if (!base) {
		throw new Error(`Could not determine merge base for HEAD and ${targetRef}`);
	}

	const quietCheck = runGit(
		["merge-tree", "--write-tree", "--quiet", "--merge-base", base, targetRef, "HEAD"],
		{ allowFailure: true }
	);

	if (quietCheck.status === 0) {
		console.log(`Mergeability check passed against ${targetRef}.`);
		process.exit(0);
	}

	const conflictCheck = runGit(
		["merge-tree", "--write-tree", "--name-only", "--merge-base", base, targetRef, "HEAD"],
		{ allowFailure: true }
	);

	const conflictedFiles = uniqueNonEmptyLines(`${conflictCheck.stdout || ""}\n${conflictCheck.stderr || ""}`);
	console.error(`Mergeability check failed against ${targetRef}.`);
	if (conflictedFiles.length > 0) {
		console.error("Conflicted paths:");
		for (const file of conflictedFiles) {
			console.error(`- ${file}`);
		}
	}
	process.exit(1);
} catch (error) {
	console.error(`Mergeability check error: ${error.message}`);
	process.exit(1);
}
