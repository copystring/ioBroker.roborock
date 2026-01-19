import iobroker from "@iobroker/eslint-config";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import sonarjs from "eslint-plugin-sonarjs";
import unicorn from "eslint-plugin-unicorn";
import globals from "globals";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default [
	// Global ignores
	{
		ignores: [
			"**/*.d.ts",
			"**/build/**",
			"**/admin/**",
			"**/test/**",
			"**/www/**",
			"**/scripts/**",
			"**/.antigravityignore/**",
			"**/.AppPlugins/**",
			"**/.Roborock Q7 Series/**",
			"**/.sniff/**",
			"**/.apk/**",
			"**/coverage/**"
		],
	},
	// 1. Project standard rules
	{
		...iobroker.backend,
		files: ["**/*.js", "**/*.ts"],
	},
	// 2. Logic Guardrails
	{
		files: ["**/*.js", "**/*.ts"],
		ignores: ["**/*.d.ts", "**/build/**", "**/admin/**", "**/test/**", "www/**", "src/www/**", "scripts/**", "**/.antigravityignore/**"],
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
			"linebreak-style": ["error", "unix"],
			"sonarjs/no-collapsible-if": "error",
			"sonarjs/no-extra-arguments": "error",
			"sonarjs/nested-control-flow": "off",
			"sonarjs/expression-complexity": "off",
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
		languageOptions: {
			parser: tsParser,
			ecmaVersion: 2020,
			sourceType: "module",
		},
		plugins: {
			"@typescript-eslint": tsPlugin,
		},
	},
	// 4. Type-Aware Rules
	{
		files: ["src/**/*.ts"],
		// Exclude files not in tsconfig.json to avoid parsing errors
		ignores: ["src/www/**", "**/test/**", "**/*.test.ts"],
		languageOptions: {
			parserOptions: {
				project: "./tsconfig.json",
				tsconfigRootDir: __dirname,
			},
		},
		rules: {
			"@typescript-eslint/no-deprecated": "error",
		},
	},
];
