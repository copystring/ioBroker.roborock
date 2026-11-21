"use strict";

// Returns session-scoped choices. The callback and list membership are taken
// from the same committed React snapshot; titles alone never select an action.
function extractModeTabs(snapshot) {
    const { graph, menu, objects, graphRevision } = snapshot;
    if (!graph || graph.truncated !== false || !menu || graphRevision !== menu.revision ||
        !Array.isArray(graph.fibers) || !Array.isArray(graph.bindings) ||
        !Array.isArray(menu.controls) || !Array.isArray(objects?.objects)) {
        throw Error("Missing, truncated or inconsistent original snapshot revision");
    }

    const fibers = new Map(graph.fibers.map(fiber => [fiber.id, fiber]));
    const bindings = new Map(graph.bindings.map(binding => [binding.reference, binding]));
    const tabOwners = graph.fibers.filter(fiber => fiber.events?.some(event => event.event === "onPressTab") &&
        fiber.events.some(event => event.event === "tabWillChange"));
    const groups = [];

    for (const owner of tabOwners) {
        const controls = menu.controls.filter(control => {
            if (control.handlerType !== "onPress" || control.callable !== true || control.disabled ||
                typeof control.title !== "string" || !control.title) return false;
            const binding = bindings.get(control.reference);
            if (!binding?.callable || binding.handlerType !== "onPress" || binding.joinDiagnostics?.joined !== true) return false;
            let node = fibers.get(binding.fiberId);
            const seen = new Set();
            while (node && !seen.has(node.id)) {
                if (node.id === owner.id) return true;
                seen.add(node.id);
                node = fibers.get(node.parentId);
            }
            return false;
        });
        if (controls.length >= 2) groups.push(controls);
    }

    if (groups.length !== 1) throw Error("Original tab group is missing or ambiguous");
    const tabs = groups[0].map(control => {
        if (!/^(0|[1-9][0-9]*)$/.test(control.reactPath)) throw Error("Original tab position is unavailable");
        const matches = objects.objects.filter(object =>
            object.available === true && object.common?.write === true &&
            object.common.name === control.title && object.native?.route === control.route &&
            object.native.source === control.source && object.native.sourcePath === control.reactPath &&
            object.native.handlerType === control.handlerType);
        if (matches.length !== 1) throw Error("Original tab action is missing or ambiguous");
        return { value: Number(control.reactPath), label: control.title, actionId: matches[0]._id };
    }).sort((a, b) => a.value - b.value);

    if (tabs.some((tab, index) => tab.value !== index)) throw Error("Original tab positions are incomplete");
    return tabs;
}

module.exports = { extractModeTabs };
