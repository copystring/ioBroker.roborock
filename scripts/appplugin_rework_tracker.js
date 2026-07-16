const fs = require("node:fs");
const path = require("node:path");

const ROOT_DIR = path.join(__dirname, "..");
const DEFAULT_SOURCE = path.join(ROOT_DIR, "docs/appplugin-rework-tracker.json");
const DEFAULT_OUTPUT = path.join(ROOT_DIR, "docs/generated/APPPLUGIN_REWORK_STATUS.md");
const GENERATED_MARKER =
	"> **Auto-Generated**: This document is generated from the source code/tests to ensure 1:1 accuracy with the implementation.";

const VALID_STATUSES = new Set(["completed", "in_progress", "pending", "blocked"]);
const VALID_PRIORITIES = new Set(["P0", "P1", "P2", "P3"]);

function assert(condition, message) {
	if (!condition) throw new Error(`Invalid AppPlugin rework tracker: ${message}`);
}

function validateTracker(tracker) {
	assert(tracker && typeof tracker === "object" && !Array.isArray(tracker), "root must be an object");
	assert(tracker.version === 1, "version must be 1");
	assert(typeof tracker.project === "string" && tracker.project.length > 0, "project is required");
	assert(/^\d{4}-\d{2}-\d{2}$/.test(tracker.lastReviewed), "lastReviewed must use YYYY-MM-DD");
	assert(Array.isArray(tracker.phases) && tracker.phases.length > 0, "phases must not be empty");
	assert(Array.isArray(tracker.families) && tracker.families.length > 0, "families must not be empty");
	assert(Array.isArray(tracker.items) && tracker.items.length > 0, "items must not be empty");

	const phaseIds = new Set();
	for (const phase of tracker.phases) {
		assert(typeof phase.id === "string" && phase.id.length > 0, "every phase needs an id");
		assert(!phaseIds.has(phase.id), `duplicate phase id ${phase.id}`);
		phaseIds.add(phase.id);
		assert(typeof phase.title === "string" && phase.title.length > 0, `phase ${phase.id} needs a title`);
		assert(VALID_STATUSES.has(phase.status), `phase ${phase.id} has invalid status ${phase.status}`);
		assert(
			typeof phase.exitCriterion === "string" && phase.exitCriterion.length > 0,
			`phase ${phase.id} needs an exitCriterion`
		);
	}

	assert(phaseIds.has(tracker.currentPhase), `unknown currentPhase ${tracker.currentPhase}`);

	const familyIds = new Set();
	for (const family of tracker.families) {
		assert(typeof family.id === "string" && family.id.length > 0, "every family needs an id");
		assert(!familyIds.has(family.id), `duplicate family id ${family.id}`);
		familyIds.add(family.id);
		assert(typeof family.title === "string" && family.title.length > 0, `family ${family.id} needs a title`);
		assert(VALID_STATUSES.has(family.status), `family ${family.id} has invalid status ${family.status}`);
		assert(
			typeof family.contract === "string" && family.contract.length > 0,
			`family ${family.id} needs a contract`
		);
		assert(typeof family.gate === "string" && family.gate.length > 0, `family ${family.id} needs a gate`);
	}

	const itemIds = new Set();
	for (const item of tracker.items) {
		assert(typeof item.id === "string" && item.id.length > 0, "every item needs an id");
		assert(!itemIds.has(item.id), `duplicate item id ${item.id}`);
		itemIds.add(item.id);
		assert(phaseIds.has(item.phase), `item ${item.id} has unknown phase ${item.phase}`);
		assert(typeof item.area === "string" && item.area.length > 0, `item ${item.id} needs an area`);
		assert(typeof item.title === "string" && item.title.length > 0, `item ${item.id} needs a title`);
		assert(VALID_STATUSES.has(item.status), `item ${item.id} has invalid status ${item.status}`);
		assert(VALID_PRIORITIES.has(item.priority), `item ${item.id} has invalid priority ${item.priority}`);
		assert(Array.isArray(item.dependsOn), `item ${item.id} needs a dependsOn array`);
		assert(Array.isArray(item.evidence), `item ${item.id} needs an evidence array`);
		assert(typeof item.nextAction === "string" && item.nextAction.length > 0, `item ${item.id} needs a nextAction`);
		if (item.family !== undefined)
			assert(familyIds.has(item.family), `item ${item.id} has unknown family ${item.family}`);
		if (item.status === "completed") assert(item.evidence.length > 0, `completed item ${item.id} needs evidence`);
		if (item.status === "blocked")
			assert(
				typeof item.blocker === "string" && item.blocker.length > 0,
				`blocked item ${item.id} needs a blocker`
			);
	}

	for (const item of tracker.items) {
		for (const dependency of item.dependsOn) {
			assert(itemIds.has(dependency), `item ${item.id} depends on unknown item ${dependency}`);
			assert(dependency !== item.id, `item ${item.id} cannot depend on itself`);
		}
	}

	const itemById = new Map(tracker.items.map(item => [item.id, item]));
	const visiting = new Set();
	const visited = new Set();
	function visit(itemId, chain) {
		if (visiting.has(itemId))
			throw new Error(`Invalid AppPlugin rework tracker: dependency cycle ${[...chain, itemId].join(" -> ")}`);
		if (visited.has(itemId)) return;
		visiting.add(itemId);
		for (const dependency of itemById.get(itemId).dependsOn) visit(dependency, [...chain, itemId]);
		visiting.delete(itemId);
		visited.add(itemId);
	}
	for (const item of tracker.items) visit(item.id, []);

	for (const field of ["currentFocus", "nextUp"]) {
		assert(Array.isArray(tracker[field]) && tracker[field].length > 0, `${field} must not be empty`);
		assert(new Set(tracker[field]).size === tracker[field].length, `${field} must not contain duplicates`);
		for (const itemId of tracker[field]) {
			assert(itemIds.has(itemId), `${field} references unknown item ${itemId}`);
			assert(
				!["completed", "blocked"].includes(itemById.get(itemId).status),
				`${field} references non-actionable item ${itemId}`
			);
		}
	}

	return tracker;
}

function loadTracker(sourcePath = DEFAULT_SOURCE) {
	return validateTracker(JSON.parse(fs.readFileSync(sourcePath, "utf8")));
}

function escapeCell(value) {
	return String(value).replace(/\|/g, "\\|").replace(/\r?\n/g, "<br>");
}

function renderLink(reference) {
	if (/^(?:https?:\/\/|`)/.test(reference)) return reference;
	const normalized = reference.replace(/\\/g, "/");
	return `[\`${normalized}\`](../../${normalized})`;
}

function renderReferences(references) {
	return references.length > 0 ? references.map(renderLink).join("<br>") : "—";
}

function statusLabel(status) {
	return {
		completed: "✅ abgeschlossen",
		in_progress: "🔄 in Arbeit",
		pending: "⏳ offen",
		blocked: "⛔ blockiert"
	}[status];
}

function renderTracker(tracker) {
	validateTracker(tracker);
	const itemById = new Map(tracker.items.map(item => [item.id, item]));
	const counts = Object.fromEntries(
		[...VALID_STATUSES].map(status => [status, tracker.items.filter(item => item.status === status).length])
	);
	const lines = [
		"# AppPlugin-first Rework: Arbeitsstand",
		"",
		GENERATED_MARKER,
		"",
		`Quelle: [\`docs/appplugin-rework-tracker.json\`](../appplugin-rework-tracker.json) · zuletzt fachlich geprüft: **${tracker.lastReviewed}**`,
		"",
		"> Die Zahlen sind Inventarpositionen, keine Prozentmessung. Neue Erkenntnisse dürfen neue Aufgaben erzeugen; abgeschlossen ist eine Aufgabe nur mit hinterlegtem Beleg.",
		"",
		"## Kurzstatus",
		"",
		`Aktuelle Phase: **${tracker.currentPhase} – ${tracker.phases.find(phase => phase.id === tracker.currentPhase).title}**`,
		"",
		`- ✅ ${counts.completed} abgeschlossen`,
		`- 🔄 ${counts.in_progress} in Arbeit`,
		`- ⏳ ${counts.pending} offen`,
		`- ⛔ ${counts.blocked} blockiert`,
		"",
		"## Aktueller Fokus",
		""
	];

	tracker.currentFocus.forEach(itemId => {
		const item = itemById.get(itemId);
		lines.push(`- **${item.id}** – ${item.title}: ${item.nextAction}`);
	});

	lines.push("", "## Danach", "");
	tracker.nextUp.forEach(itemId => {
		const item = itemById.get(itemId);
		lines.push(`- **${item.id}** – ${item.title}: ${item.nextAction}`);
	});

	lines.push("", "## Phasen", "", "| Phase | Ziel | Status | Exit-Kriterium |", "| --- | --- | --- | --- |");
	tracker.phases.forEach(phase => {
		lines.push(
			`| ${escapeCell(phase.id)} | ${escapeCell(phase.title)} | ${statusLabel(phase.status)} | ${escapeCell(phase.exitCriterion)} |`
		);
	});

	lines.push(
		"",
		"## Karten- und Laufzeitfamilien",
		"",
		"| Familie | Hostvertrag | Status | Nächste Freigabegrenze |",
		"| --- | --- | --- | --- |"
	);
	tracker.families.forEach(family => {
		lines.push(
			`| ${escapeCell(family.title)} | ${escapeCell(family.contract)} | ${statusLabel(family.status)} | ${escapeCell(family.gate)} |`
		);
	});

	const blockers = tracker.items.filter(item => item.status === "blocked");
	lines.push("", "## Blocker", "");
	if (blockers.length === 0) {
		lines.push("Keine expliziten Blocker erfasst.");
	} else {
		blockers.forEach(item => lines.push(`- **${item.id} – ${item.title}:** ${item.blocker}`));
	}

	lines.push("", "## Vollständige Aufgabenmatrix", "");
	for (const phase of tracker.phases) {
		const phaseItems = tracker.items.filter(item => item.phase === phase.id);
		if (phaseItems.length === 0) continue;
		lines.push(`### ${phase.id} – ${phase.title}`, "");
		const areas = [...new Set(phaseItems.map(item => item.area))];
		for (const area of areas) {
			lines.push(
				`#### ${area}`,
				"",
				"| ID | Prio | Status | Aufgabe | Abhängigkeiten | Belege | Nächster Schritt / Blocker |",
				"| --- | --- | --- | --- | --- | --- | --- |"
			);
			phaseItems
				.filter(item => item.area === area)
				.forEach(item => {
					const dependencies =
						item.dependsOn.length > 0 ? item.dependsOn.map(id => `\`${id}\``).join(", ") : "—";
					const action =
						item.status === "blocked"
							? `**Blocker:** ${item.blocker}<br>**Danach:** ${item.nextAction}`
							: item.nextAction;
					lines.push(
						`| \`${escapeCell(item.id)}\` | ${item.priority} | ${statusLabel(item.status)} | ${escapeCell(item.title)} | ${dependencies} | ${renderReferences(item.evidence)} | ${escapeCell(action)} |`
					);
				});
			lines.push("");
		}
	}

	lines.push(
		"## Pflege-Invariante",
		"",
		"Jede Statusänderung erfolgt ausschließlich in `docs/appplugin-rework-tracker.json`. `completed` verlangt mindestens einen reproduzierbaren Beleg, `blocked` einen konkreten Blocker und jede Abhängigkeit eine existierende Task-ID. Die Markdown-Seite wird anschließend neu erzeugt; manuelle Änderungen an dieser Datei werden verworfen.",
		""
	);
	return lines.join("\n");
}

function generateTrackerDocumentation(sourcePath = DEFAULT_SOURCE, outputPath = DEFAULT_OUTPUT) {
	const tracker = loadTracker(sourcePath);
	fs.mkdirSync(path.dirname(outputPath), { recursive: true });
	fs.writeFileSync(outputPath, renderTracker(tracker));
	return { outputPath, tracker };
}

if (require.main === module) {
	const result = generateTrackerDocumentation();
	console.log(`✅ Generated ${path.relative(ROOT_DIR, result.outputPath)} (${result.tracker.items.length} tasks)`);
}

module.exports = {
	DEFAULT_OUTPUT,
	DEFAULT_SOURCE,
	GENERATED_MARKER,
	generateTrackerDocumentation,
	loadTracker,
	renderTracker,
	validateTracker
};
