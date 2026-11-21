"use strict";
const { test } = require("node:test");
const assert = require("node:assert/strict");
const { extractModeTabs } = require("./original-mode-tabs.cjs");

function fixture() {
    const graph = {
        truncated: false,
        fibers: [
            { id: 1, parentId: null, events: [{ event: "onPressTab" }, { event: "tabWillChange" }] },
            { id: 2, parentId: 1, events: [] },
            { id: 3, parentId: 1, events: [] },
        ],
        bindings: [
            { reference: "a", fiberId: 2, callable: true, handlerType: "onPress", joinDiagnostics: { joined: true } },
            { reference: "b", fiberId: 3, callable: true, handlerType: "onPress", joinDiagnostics: { joined: true } },
        ],
    };
    const controls = ["First", "Second"].map((title, index) => ({
        reference: ["a", "b"][index], title, route: "Screen", reactPath: String(index),
        source: "original-rendered-control", handlerType: "onPress", callable: true, disabled: false,
    }));
    const objects = controls.map((control, index) => ({
        _id: "original." + index, available: true, common: { name: control.title, write: true },
        native: { route: control.route, source: control.source, sourcePath: control.reactPath, handlerType: "onPress" },
    }));
    return { graph, graphRevision: 5, menu: { revision: 5, controls }, objects: { objects } };
}
test("extracts tab choices from the original tab callback ancestry, not a label table", () => {
    assert.deepEqual(extractModeTabs(fixture()), [
        { value: 0, label: "First", actionId: "original.0" },
        { value: 1, label: "Second", actionId: "original.1" },
    ]);
});
test("refuses stale or ambiguous bindings instead of guessing", () => {
    const stale = fixture(); stale.graphRevision = 4;
    assert.throws(() => extractModeTabs(stale), /revision/i);
    const ambiguous = fixture(); ambiguous.objects.objects.push({ ...ambiguous.objects.objects[0], _id: "other" });
    assert.throws(() => extractModeTabs(ambiguous), /ambiguous/i);
});

test("ignores other app navigation tabs without the original mode change handler", () => {
    const value = fixture();
    value.graph.fibers.push({id: 20, parentId: null, events: [{event: "onPressTab"}]},
        {id: 21, parentId: 20, events: []}, {id: 22, parentId: 20, events: []});
    for (const [i, name] of ["Other A", "Other B"].entries()) {
        const reference = "other" + i;
        value.graph.bindings.push({reference, fiberId: 21 + i, callable: true, handlerType: "onPress", joinDiagnostics: {joined: true}});
        value.menu.controls.push({reference, title: name, route: "Screen", reactPath: String(i), source: "original-rendered-control", handlerType: "onPress", callable: true, disabled: false});
    }
    assert.equal(extractModeTabs(value).length, 2);
});

test("reads the active position and tab count from the original tab component", () => {
    const {extractModeView} = require("./original-mode-tabs.cjs");
    const value = fixture(); value.graph.fibers[0].props = {currentTab: 1, tabCount: 2};
    const view = extractModeView(value);
    assert.equal(view.current, 1);
    assert.equal(view.tabs.length, 2);
    value.graph.fibers[0].props.currentTab = 2;
    assert.throws(() => extractModeView(value), /current/i);
    value.graph.fibers[0].props = {currentTab: 1, tabCount: 3};
    assert.throws(() => extractModeView(value), /count/i);
});
