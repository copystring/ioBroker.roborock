import { resolve } from "node:path";
import ts from "typescript";
import { describe, expect, it } from "vitest";

describe("project compiler configurations", () => {
	it.each(["tsconfig.json", "test/tsconfig.json", "tsconfig.web.json"])("accepts the resolved compiler options for %s", path => {
		const config = ts.getParsedCommandLineOfConfigFile(resolve(path), { noEmit: true }, {
			...ts.sys,
			onUnRecoverableConfigFileDiagnostic: diagnostic => {
				throw new Error(ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
			},
		});
		if (!config) throw new Error(`Unable to load ${path}`);
		const program = ts.createProgram([], config.options);
		const diagnostics = [...config.errors, ...program.getOptionsDiagnostics()];
		expect(diagnostics.map(diagnostic => ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"))).toEqual([]);
	});
});
