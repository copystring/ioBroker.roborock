import config from "@iobroker/eslint-config";
import { esmConfig } from "@iobroker/eslint-config";
import sonarjs from "eslint-plugin-sonarjs";

const sharedConfig = [...config, ...esmConfig];

const projectIgnores = [
	"**/*.d.ts",
	"**/build/**",
	"**/admin/**",
	"**/test/**",
	"**/www/**",
	"**/scripts/**",
	"**/.antigravityignore/**",
	"**/.AppPlugins/**",
	"**/.tmp/**",
	"**/.Roborock Q7 Series/**",
	"**/.sniff/**",
	"**/.agent/**",
	"**/.apk/**",
	"**/coverage/**"
];

const legacyRuleIgnores = [
	"**/*.d.ts",
	"**/build/**",
	"**/admin/**",
	"**/test/**",
	"www/**",
	"src/www/**",
	"scripts/**",
	"**/.antigravityignore/**",
	"**/.agent/**",
	"**/.tmp/**"
];

const mochaGlobals = {
	after: "readonly",
	afterEach: "readonly",
	before: "readonly",
	beforeEach: "readonly",
	context: "readonly",
	describe: "readonly",
	it: "readonly",
	specify: "readonly"
};

const disabledSharedRules = Object.fromEntries(
	sharedConfig.flatMap(({ rules = {} }) => Object.keys(rules)).map((rule) => [rule, "off"])
);

const legacyRules = {
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
	"no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0, maxBOF: 0 }],
	"eol-last": ["error", "always"],
	"max-statements-per-line": ["error", { max: 1 }],
	"brace-style": ["error", "1tbs", { allowSingleLine: false }],
	"padded-blocks": ["error", "never"],
	"keyword-spacing": ["error", { before: true, after: true }],
	"space-before-blocks": ["error", "always"],
	"object-curly-spacing": ["error", "always"],
	"comma-spacing": ["error", { before: false, after: true }],
	"arrow-spacing": ["error", { before: true, after: true }],
	"sonarjs/no-collapsible-if": "error",
	"sonarjs/no-extra-arguments": "error",
	"sonarjs/nested-control-flow": "off",
	"sonarjs/expression-complexity": "off",
	"sonarjs/no-nested-assignment": "error",
	"unicorn/prevent-abbreviations": "off",
	"unicorn/filename-case": "off",
	"unicorn/no-null": "off",
	"unicorn/prefer-module": "off",
	"unicorn/prefer-node-protocol": "off",
	"unicorn/no-process-exit": "off",
	"unicorn/no-array-for-each": "off"
};

export default [
	{
		ignores: projectIgnores
	},
	...sharedConfig,
	{
		files: ["**/*.js", "**/*.cjs", "**/*.mjs", "**/*.ts"],
		rules: disabledSharedRules
	},
	{
		files: ["**/*.js", "**/*.ts"],
		ignores: legacyRuleIgnores,
		languageOptions: {
			ecmaVersion: 2020,
			sourceType: "module",
			parserOptions: {
				projectService: false
			},
			globals: mochaGlobals
		},
		plugins: {
			sonarjs
		},
		rules: legacyRules
	},
	{
		files: ["src/**/*.ts"],
		ignores: ["src/www/**", "**/test/**", "**/*.test.ts"],
		languageOptions: {
			parserOptions: {
				projectService: true
			}
		},
		rules: {
			"@typescript-eslint/no-deprecated": "error"
		}
	}
];
