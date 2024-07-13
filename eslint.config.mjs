import globals from "globals";

export default [
	{
		files: ["**/*.js"],
		excludedFiles: ["lib/map/zones.js"],
		ignores: ["**/.eslintrc.js", "admin/words.js"],
		languageOptions: {
			ecmaVersion: 2020,
			sourceType: "module",
		},
		globals: {
			...globals.node,
			...globals.mocha,
		},
		rules: {
			indent: ["error", "tab", { SwitchCase: 1 }],
			"no-console": "off",
			"no-unused-vars": ["error", { ignoreRestSiblings: true, argsIgnorePattern: "^_" }],
			"no-var": "error",
			"no-trailing-spaces": "error",
			"prefer-const": "error",
			quotes: ["error", "double", { avoidEscape: true, allowTemplateLiterals: true }],
			semi: ["error", "always"],
		},
	},
	{
		files: ["lib/map/zones.js"],
		languageOptions: {
			ecmaVersion: 5,
			sourceType: "script",
		},
		globals: {
			...globals.browser,
			...Object.fromEntries(Object.entries(globals.node).map(([key]) => [key, false])),
		},
		rules: {
			// Specific rules for zones.js can be defined here
		},
	},
];