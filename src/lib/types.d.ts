// src/lib/types.d.ts

// This file extends the default ioBroker types with your specific adapter configuration.
// It allows TypeScript to understand "this.config.username", "this.config.map_scale", etc.

declare global {
	namespace ioBroker {
		interface AdapterConfig {
			// Add all fields from your io-package.json "native" section here
			loginMethod: "email" | "password";
			username: string;
			password: string;
			updateInterval: number;

			enable_map_creation: boolean;
			cameraPin: string;
			hostname_ip?: string;
			forceRuntimeDetectEveryTime?: boolean;

			downloadRoborockImages?: boolean;
			region: "eu" | "us" | "cn" | "asia";
			map_theme?: "dark" | "light";
		}
	}
}

// This is required to make TypeScript treat this file as a module
export { };

