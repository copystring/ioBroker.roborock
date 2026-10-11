import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		globals: false,
		environment: "node",
		coverage: {
			provider: "v8",
			reporter: ["text", "json", "html"],
			exclude: ["src/**/*.test.ts", "src/lib/mock/**", "src/www/**", "**/*.d.ts"],
			enabled: false,
			include: ["src/**/*.ts"],
			reportsDirectory: "./coverage"
		},
		typecheck: {
			enabled: true,
			checker: "tsc"
		},
		reporters: ["default"],
		silent: false,
		include: ["test/**/*.test.ts", "src/**/*.test.ts"],
		exclude: ["node_modules", "dist", ".idea", ".git", ".cache", "build", "src/www/**"]
	},
});
