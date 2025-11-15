import globals from "globals";
import iobroker from "@iobroker/eslint-config";

export default [
	{
		// Applies the recommended backend ruleset (Node.js, CommonJS)
		...iobroker.backend,

		// Applies the recommended frontend ruleset (Browser, ESM)
		// This configuration is applied ONLY to files inside 'src/www'
		...iobroker.frontend,

		files: ["**/*.js"],
		ignores: ["**/.eslintrc.js", "admin/words.js", "build/**", "www/**", "lib/", "test.rrmap.gz"],
		languageOptions: {
			ecmaVersion: 2020,
			sourceType: "module",
			globals: {
				...globals.node,
				...globals.mocha,
			},
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
];
