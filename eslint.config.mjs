import iobroker from "@iobroker/eslint-config";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import sonarjs from "eslint-plugin-sonarjs";
import unicorn from "eslint-plugin-unicorn";
import globals from "globals";

export default [
	// 1. Project standard rules
	{
		...iobroker.backend,
		files: ["**/*.js", "**/*.ts"],
		ignores: ["**/*.d.ts", "**/build/**", "**/admin/**", "**/test/**", "www/**", "scripts/**"],
	},
	// 2. Logic Guardrails
	{
		files: ["**/*.js", "**/*.ts"],
		ignores: ["**/*.d.ts", "**/build/**", "**/admin/**", "**/test/**", "www/**", "scripts/**"],
		languageOptions: {
			parser: tsParser,
			ecmaVersion: 2020,
			sourceType: "module",
			globals: {
				...globals.node,
				...globals.mocha,
			},
		},
		plugins: {
			"@typescript-eslint": tsPlugin,
			sonarjs,
			unicorn,
		},
		rules: {
			indent: ["error", "tab", { SwitchCase: 1 }],
			"no-console": "off",
			"no-unused-vars": "off",
			"@typescript-eslint/no-unused-vars": "error",
			"no-var": "error",
			"no-trailing-spaces": "error",
			"prefer-const": "error",
			quotes: ["error", "double", { avoidEscape: true, allowTemplateLiterals: true }],
			semi: ["error", "always"],
			"sonarjs/no-collapsible-if": "error",
			"sonarjs/no-extra-arguments": "error",
			"sonarjs/nested-control-flow": "warn",
			"sonarjs/expression-complexity": "warn",
			"sonarjs/no-nested-assignment": "error",
			"unicorn/prevent-abbreviations": "off",
			"unicorn/filename-case": "off",
			"unicorn/no-null": "off",
			"unicorn/prefer-module": "off",
			"unicorn/no-process-exit": "off",
			"unicorn/no-array-for-each": "off",
		},
	},
	// 3. Frontend rules
	{
		...iobroker.frontend,
		files: ["src/www/**/*.ts", "src/www/**/*.js"],
	},
];
