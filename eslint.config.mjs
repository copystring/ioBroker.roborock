import globals from "globals";
import iobroker from "@iobroker/eslint-config";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
	{
		// Applies the recommended backend ruleset (Node.js, CommonJS)
		...iobroker.backend,

		files: ["**/*.js", "**/*.ts"],
		ignores: ["**/*.d.ts", "**/build/**", "**/admin/**", "**/test/**", "www/**", "**/.antigravityignore/**"],
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
		},
	},
	{
		// Applies the recommended frontend ruleset (Browser, DOM) for www files
		...iobroker.frontend,

		files: ["src/www/**/*.ts", "src/www/**/*.js"],
		languageOptions: {
			parser: tsParser,
			ecmaVersion: 2020,
			sourceType: "module",
			globals: {
				...globals.browser,
			},
		},
		plugins: {
			"@typescript-eslint": tsPlugin,
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
		},
	},
];
