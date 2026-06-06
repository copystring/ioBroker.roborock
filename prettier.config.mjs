import prettierConfig from "@iobroker/eslint-config/prettier.config.mjs";

export default {
	...prettierConfig,
	useTabs: true,
	singleQuote: false,
	trailingComma: "none"
};
