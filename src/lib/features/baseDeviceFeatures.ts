// src/lib/features/base_device_features.ts
import type { Roborock } from "../../main";
import { Feature } from "./features.enum";
import { z } from "zod"; // Import Zod

// --- Types & Interfaces ---

/**
 * Specification for defining a command object's properties.
 */
export type CommandSpec = {
	type: ioBroker.CommonType | "json"; // Internal type can be 'json' for logic
	def?: any;
	states?: Record<string | number, string>;
	min?: number;
	max?: number;
	unit?: string;
	role?: string;
};

/**
 * Type for a function that implements a specific feature.
 * It's called with the correct 'this' context bound.
 */
export type FeatureImplementation = () => Promise<void> | void;

/**
 * Configuration provided by a specific model class.
 */
export interface DeviceModelConfig {
	staticFeatures: Feature[]; // List of features this model always has
}

/**
 * Type for the constructor signature of a device feature class.
 */
export type FeatureClassConstructor = new (_dependencies: FeatureDependencies, _duid: string) => BaseDeviceFeatures;

/**
 * Interface defining the dependencies injected into feature classes.
 */
export interface FeatureDependencies {
	adapter: Roborock;
	config: Roborock["config"]; // Adapter configuration
	http_api: Roborock["http_api"]; // HTTP API helper instance
	ensureState: Roborock["ensureState"]; // Method reference for creating/ensuring states
	ensureFolder: Roborock["ensureFolder"]; // Method reference for ensuring folders
	log: Roborock["log"]; // Adapter log instance
	// Add other dependencies here if needed by feature implementations
}

// --- Registry & Decorator ---

/** Central registry mapping robotModelId strings to feature class constructors. */
const modelRegistry = new Map<string, FeatureClassConstructor>();

/**
 * Class decorator to register a feature class for a specific robot model ID.
 * @param robotModelId The unique model identifier string (e.g., 'roborock.vacuum.a70').
 */
export function RegisterModel(robotModelId: string) {
	return function (constructor: FeatureClassConstructor) {
		if (modelRegistry.has(robotModelId)) {
			// Model already registered, overwriting.
		}
		modelRegistry.set(robotModelId, constructor);
	};
}

// --- Zod Schemas (Base) ---

/**
 * Base Zod schema for validating generic status properties potentially common to all devices.
 */
export const BaseStatusSchema = z
	.object({
		error_code: z.number().int().optional(), // Example: error code might be generic
		// Add other truly generic status fields if applicable
	})
	.passthrough(); // Allow fields not defined in this schema

// --- Generic Base Class ---

/**
 * Abstract base class for handling device features.
 * Provides core logic for initialization, feature application, command object creation,
 * and dependency injection. Must be extended by device-type-specific base classes
 * (e.g., BaseVacuumFeatures).
 */
export abstract class BaseDeviceFeatures {
	protected deps: FeatureDependencies;
	public commands: Record<string, CommandSpec | any>; // Holds the command definitions for this device instance
	protected duid: string;
	protected robotModel: string;
	protected config: DeviceModelConfig; // Static feature configuration from the specific model class
	protected appliedFeatures = new Set<Feature>(); // Tracks features already applied to this instance
	protected runtimeDetectionComplete = false; // Flag: Initial runtime detection ran
	protected commandsCreated = false; // Flag: Command objects created for ioBroker

	// --- Constants (Only absolutely generic ones) ---
	protected static readonly CONSTANTS = {
		// Define constants universally applicable across all potential Roborock device types
		baseCommands: {},
		// Generic error codes (subset)
		errorCodes: {
			0: "No error",
			255: "Internal error",
			"-1": "Unknown Error",
			// Add more if truly generic across all device types
		},
	};

	// --- Metadata Key for Feature Registry ---
	// We use a unique symbol to store the registry on the class prototype
	public static readonly FEATURE_METADATA_KEY = Symbol.for("roborock.featureRegistry");

	/**
	 * Decorator to register a method as a handler for a specific feature.
	 * @param feature The Feature enum key.
	 */
	public static DeviceFeature(feature: Feature) {
		return function (target: any, propertyKey: string) {
			// 'target' is the prototype of the class
			let registry: Map<Feature, string> = target[BaseDeviceFeatures.FEATURE_METADATA_KEY];
			if (!registry) {
				registry = new Map();
				// Store it on the prototype
				target[BaseDeviceFeatures.FEATURE_METADATA_KEY] = registry;
			}
			registry.set(feature, propertyKey);
		};
	}

	// --- Feature Registry (Instance Based via Metadata) ---

	/**
	 * Constructor for the base feature handler.
	 * @param dependencies Injected dependencies (adapter, config, APIs, helpers).
	 * @param duid The device unique identifier.
	 * @param robotModel The robot model string.
	 * @param config Configuration containing static features for this model.
	 */
	constructor(dependencies: FeatureDependencies, duid: string, robotModel: string, config: DeviceModelConfig) {
		this.deps = dependencies;
		this.duid = duid;
		this.robotModel = robotModel;
		this.config = config;
		// Start with generic base commands defined in this base class
		this.commands = JSON.parse(JSON.stringify(BaseDeviceFeatures.CONSTANTS.baseCommands));
	}

	// --- Abstract / Overridable Methods ---

	/**
	 * Must be implemented by the concrete device-type base class to detect features
	 * based on device-specific mechanisms (e.g., bitfields, firmware info).
	 * @returns A Set containing the detected `Feature` enum keys (usually the 'is...' keys).
	 */
	protected abstract getDynamicFeatures(): Set<Feature>;

	/**
	 * Processes features related to the detected dock type.
	 * Can be overridden by concrete base or specific model classes if needed.
	 * @param dockType The numeric dock type identifier.
	 */
	public async processDockType(dockType: number): Promise<void> {
		this.deps.log.silly(`[${this.duid}] Base processDockType called for type ${dockType}. No default actions defined.`);
		// Default (base) implementation does nothing. Should be implemented in concrete base (e.g., BaseVacuumFeatures).
	}

	/**
	 * Applies features defined statically in the `DeviceModelConfig`.
	 * Can be overridden by specific model classes to add more complex model-specific logic
	 * that runs *before* runtime detection.
	 * @param _statusData Optional initial status data. Unused in base, but available for overrides.
	 * @param _fwFeatures Optional initial firmware features data. Unused in base, but available for overrides.
	 */

	public async applyModelSpecifics(): Promise<void> {
		const promises = this.config.staticFeatures.map((feature) => this.applyFeature(feature));
		await Promise.all(promises);
	}

	/**
	 * Must be implemented by the concrete device-type base class to perform
	 * runtime feature detection based on validated status data.
	 * @param statusData Validated status data object.
	 * @param fwFeatures Optional firmware features data.
	 * @returns `true` if features/commands were added or modified, `false` otherwise.
	 */
	public abstract detectAndApplyRuntimeFeatures(_statusData: Readonly<Record<string, any>>): Promise<boolean>;

	// --- Core Initialization Logic ---

	/**
	 * Initializes all features for the device instance according to the defined flow:
	 * Model Specifics -> Runtime Detection -> Dock Processing -> Command Object Creation.
	 * @param initialStatus Optional initial status data to use for detection.
	 * @param initialFwFeatures Optional initial firmware features data.
	 */
	public async initialize(): Promise<void> {
		this.deps.log.info(`[FeatureInit|${this.robotModel}|${this.duid}] Starting feature initialization...`);

		// Flow: Base -> Type -> Specific -> Runtime -> Dock

		// 1. Apply Model Specifics (Static Flags + Model Class Overrides/Additions)
		try {
			await this.applyModelSpecifics();
		} catch (e: any) {
			this.deps.log.error(`[FeatureInit|${this.robotModel}|${this.duid}] Error applying model specifics: ${e.message} ${e.stack}`);
		}

		// 2. Runtime Detection (implemented by concrete base like BaseVacuumFeatures)
		// Note: Runtime detection relies on data fetched later in the process.

		// 3. Process Dock Type (implementation from concrete base or model class)
		// Note: Dock type processing is handled after initial status retrieval.

		// 4. Create/Update ioBroker Objects for Commands
		try {
			await this.createCommandObjects();
		} catch (e: any) {
			this.deps.log.error(`[FeatureInit|${this.robotModel}|${this.duid}] Error creating command objects: ${e.message} ${e.stack}`);
		}

		this.deps.log.info(`[FeatureInit|${this.robotModel}|${this.duid}] Initialization complete.`);
	}

	/**
	 * Logs a consolidated summary of applied features and created commands.
	 * Should be called explicitly after initialization is complete.
	 */
	public printSummary(): void {
		const featureList = Array.from(this.appliedFeatures).sort().join(", ");
		const commandList = Object.keys(this.commands).sort().join(", ");
		this.deps.log.info(`[FeatureInit|${this.robotModel}|${this.duid}] Summary -> Features: [${featureList}] | Commands: [${commandList}]`);
	}

	// --- Core Helper Methods ---

	/**
	 * Applies a single feature by looking up and executing its implementation from the registry.
	 * Ensures a feature is applied only once per instance.
	 * @param feature The Feature enum key to apply.
	 * @returns `true` if the feature was successfully applied now, `false` otherwise.
	 */
	protected async applyFeature(feature: Feature): Promise<boolean> {
		// Basic validation of the input feature enum value
		if (!feature || !Object.values(Feature).includes(feature)) {
			this.deps.log.warn(`[${this.duid}] Attempted to apply invalid feature value: ${feature}`);
			return false;
		}
		// Check if already applied
		if (this.appliedFeatures.has(feature)) {
			this.deps.log.silly(`[${this.duid}] Feature '${feature}' already applied.`);
			return false;
		}

		// Retrieve the registry from metadata on the instance (prototype chain)
		// We cast 'this' to any to access the symbol-keyed property
		const registry: Map<Feature, string> | undefined = (this as any)[BaseDeviceFeatures.FEATURE_METADATA_KEY];

		if (registry && registry.has(feature)) {
			const methodName = registry.get(feature)!;
			try {
				// Execute the method dynamically
				// @ts-ignore
				await this[methodName].call(this);
				this.appliedFeatures.add(feature); // Mark as applied *after* successful execution
				return true;
			} catch (e: any) {
				this.deps.log.error(`[FeatureApply|${this.robotModel}|${this.duid}] Error applying feature '${feature}': ${e.message} ${e.stack}`);
				return false; // Application failed
			}
		} else {
			if (registry) {
				this.deps.log.silly(`[FeatureApply|${this.robotModel}|${this.duid}] Registry exists but no implementation registered for feature '${feature}'. Keys: ${Array.from(registry.keys()).join(", ")}`);
			} else {
				this.deps.log.silly(`[FeatureApply|${this.robotModel}|${this.duid}] No registry found on instance.`);
			}
			return false; // No implementation found
		}
	}

	/**
	 * Helper to map a dynamically detected feature key (e.g., from bitfield/fw, often starting with 'is...')
	 * to the corresponding primary action Feature key (e.g., 'MopWash') if a mapping exists and is registered.
	 * @param detectedFeature The Feature enum key detected dynamically.
	 * @returns The mapped action Feature enum key, the detected key itself if it's directly actionable, or null.
	 */
	protected mapFeature(detectedFeature: Feature): Feature | null {
		// Retrieve the registry from metadata on the instance (prototype chain)
		const registry: Map<Feature, string> | undefined = (this as any)[BaseDeviceFeatures.FEATURE_METADATA_KEY];

		// Try direct mapping: Check if the value of the 'is...' key (e.g., 'MopWash') exists as an enum key
		const potentialActionName = Feature[detectedFeature as keyof typeof Feature]; // Get string value (e.g., 'MopWash')
		// Find the enum key that corresponds to this string value, EXCLUDING the original detected key itself
		const mappedActionKey = (Object.keys(Feature) as Array<keyof typeof Feature>).find((key) => Feature[key] === potentialActionName && key !== detectedFeature);

		if (mappedActionKey) {
			const actionFeatureEnum = Feature[mappedActionKey]; // Get the actual enum value (like Feature.MopWash)
			// Check if this mapped action feature *has an implementation registered*
			if (registry && registry.has(actionFeatureEnum)) {
				this.deps.log.silly(`[${this.duid}] Mapping dynamic feature '${detectedFeature}' to action '${actionFeatureEnum}'`);
				return actionFeatureEnum;
			} else {
				this.deps.log.silly(`[${this.duid}] Dynamic feature '${detectedFeature}' mapped to '${actionFeatureEnum}', but no action is registered for it.`);
				return null; // Mapped but no action
			}
		}

		// If no mapping, check if the detected feature key itself has a registered action
		if (registry && registry.has(detectedFeature)) {
			this.deps.log.silly(`[${this.duid}] Using dynamic feature '${detectedFeature}' directly as it has a registered action.`);
			return detectedFeature;
		}

		// If neither mapping nor direct action found, it's likely just a flag or unhandled
		this.deps.log.silly(`[${this.duid}] Dynamic feature '${detectedFeature}' detected but has no registered action or mapping.`);
		return null;
	}

	/**
	 * Creates or updates all command state objects in ioBroker based on the current `this.commands` map.
	 */
	public async createCommandObjects(): Promise<void> {
		const folderPath = `Devices.${this.duid}.commands`;
		// Ensure folder exists *before* creating states in parallel
		try {
			await this.deps.ensureFolder(folderPath);
		} catch (e: any) {
			this.deps.log.error(`[${this.duid}] Failed to ensure commands folder ${folderPath}: ${e.message}`);
			return; // Abort if folder cannot be ensured
		}

		const promises: Promise<void>[] = [];

		for (const [command, commonCommand] of Object.entries(this.commands)) {
			// Use an async IIFE (Immediately Invoked Function Expression) for safe parallel execution within the loop
			promises.push(
				(async (cmd: string, spec: CommandSpec | any) => {
					try {
						const options: Partial<ioBroker.StateCommon> = {
							...(spec as Partial<ioBroker.StateCommon>),
							name: spec.name || this.deps.adapter.translations[cmd] || cmd, // Add name generation/translation
							write: true, // Commands must be writable
						};
						const originalType = spec.type; // Store original type ('json' etc.)

						// Determine Role if not explicitly set in spec
						if (!options.role) {
							if (originalType === "boolean" && !options.states) options.role = "button";
							else if (originalType === "number" && options.states) options.role = "value.list";
							else if (originalType === "number") options.role = "level";
							else if (originalType === "json" && options.states) options.role = "value.list";
							else if (originalType === "json") options.role = "json";
							else options.role = "state";
						}

						// Adjust type for ioBroker
						if (originalType === "json") {
							options.type = "string";
						}

						// Final type validation and default
						const validTypes: ioBroker.CommonType[] = ["string", "number", "boolean", "object", "array", "mixed"];
						if (!options.type || typeof options.type !== "string" || !validTypes.includes(options.type as ioBroker.CommonType)) {
							if (originalType !== "json") {
								// Avoid redundant log if we just set it to string
								this.deps.log.warn(`[${this.duid}] Invalid or missing type '${spec.type}' for command '${cmd}', defaulting to 'string'.`);
							}
							options.type = "string";
						}

						const path = `${folderPath}.${cmd}`;

						// Create or Update Object
						const existingObj = await this.deps.adapter.getObjectAsync(path);
						if (existingObj) {
							// Only extend if common differs significantly (simple stringify might be too sensitive)
							// A more robust check might compare key properties individually. For now, stringify is pragmatic.
							if (JSON.stringify(existingObj.common) !== JSON.stringify(options)) {
								this.deps.log.silly(`[${this.duid}] Extending command object ${path}`);
								await this.deps.adapter.extendObject(path, { common: options as ioBroker.StateCommon });
							} else {
								this.deps.log.silly(`[${this.duid}] Command object ${path} common part is up-to-date.`);
							}
						} else {
							this.deps.log.silly(`[${this.duid}] Ensuring command object ${path}`);
							await this.deps.ensureState(path, options as ioBroker.StateCommon);
						}

						// Reset button states after ensuring object exists/is updated
						if (options.role === "button") {
							const currentState = await this.deps.adapter.getStateAsync(path);
							// Set to false only if not already false or if state doesn't exist yet
							if (!currentState || currentState.val !== false) {
								await this.deps.adapter.setState(path, false, true);
							}
						}
					} catch (e: any) {
						this.deps.log.error(`[${this.duid}] Error processing command object '${command}': ${e.message}`);
						// Optional: Log stack trace for more details: this.deps.log.error(e.stack);
					}
				})(command, commonCommand)
			); // Pass command and spec to IIFE
		} // End for loop

		try {
			await Promise.all(promises); // Wait for all command object operations
			this.commandsCreated = true; // Mark as done for this run
		} catch (e: any) {
			// Errors inside the IIFEs are caught individually, this catches errors from Promise.all itself (rare)
			this.deps.log.error(`[${this.duid}] Critical error during parallel command object creation: ${e.message}`);
		}
	}

	// --- Helper Methods ---

	/**
	 * Adds or updates a command definition in the instance's `commands` map.
	 * Includes logic to merge `states` to prevent overwriting more specific definitions.
	 * @param name The name (key) of the command.
	 * @param spec The `CommandSpec` definition for the command.
	 */
	protected addCommand(name: string, spec: CommandSpec | any): void {
		if (!name || typeof name !== "string") {
			this.deps.log.error(`[${this.duid}] addCommand: Invalid command name provided: ${name}`);
			return;
		}
		try {
			// Merge states logic: If new spec has fewer states than existing, merge them preserving existing ones.
			if (this.commands[name]?.states && spec.states) {
				const existingStatesJson = JSON.stringify(this.commands[name].states);
				const newStatesJson = JSON.stringify(spec.states);
				if (existingStatesJson !== newStatesJson) {
					this.deps.log.silly(`[${this.duid}] Command '${name}' merge: Merging states.`);
					// Merge: New states overwrite/add to existing ones
					spec.states = { ...this.commands[name].states, ...spec.states };
				} else {
					// If states are identical, ensure the rest of the existing spec isn't lost if the new one is simpler
					spec = { ...this.commands[name], ...spec, states: this.commands[name].states };
				}
			} else if (this.commands[name]?.states && !spec.states) {
				// If existing had states but new one doesn't, keep existing states
				spec.states = this.commands[name].states;
			}
			this.commands[name] = spec;
			this.deps.log.silly(`[${this.duid}] Added/Updated command '${name}'`);
		} catch (e: any) {
			this.deps.log.error(`[${this.duid}] Error in addCommand for '${name}': ${e.message}`);
		}
	}

	/**
	 * Helper to call the injected `ensureState` function with the correct path format.
	 * @param subfolder The subfolder within the device structure (e.g., 'info', 'commands').
	 * @param stateName The name of the state.
	 * @param commonOptions State common options.
	 * @param native Optional native options.
	 */
	protected async ensureState(subfolder: string, stateName: string, commonOptions: Partial<ioBroker.StateCommon>, native: Record<string, any> = {}): Promise<void> {
		const path = `Devices.${this.duid}.${subfolder}.${stateName}`;
		try {
			// Ensure type is valid before calling ensureState
			const validTypes: ioBroker.CommonType[] = ["string", "number", "boolean", "object", "array", "mixed"];
			if (commonOptions.type && !validTypes.includes(commonOptions.type as ioBroker.CommonType)) {
				this.deps.log.warn(`[${this.duid}] Invalid type '${commonOptions.type}' in ensureState for ${path}, defaulting to 'string'.`);
				commonOptions.type = "string";
			}
			await this.deps.ensureState(path, commonOptions as ioBroker.StateCommon, native); // Cast after validation
		} catch (e: any) {
			this.deps.log.error(`[${this.duid}] Error in ensureState for ${path}: ${e.message}`);
		}
	}

	// --- Static Methods ---

	/**
	 * Retrieves the registered feature class constructor for a given model ID.
	 * @param modelId The robot model identifier string.
	 * @returns The constructor if found, otherwise undefined.
	 */
	public static getRegisteredModelClass(modelId: string): FeatureClassConstructor | undefined {
		return modelRegistry.get(modelId);
	}

	/**
	 * Returns an array of all registered model IDs.
	 */
	public static getRegisteredModels(): string[] {
		return Array.from(modelRegistry.keys());
	}

	/**
	 * Public method to check if a specific static feature is defined
	 * in this model's configuration.
	 * @param feature The Feature enum key to check.
	 * @returns `true` if the feature is listed in staticFeatures, `false` otherwise.
	 */
	public hasStaticFeature(feature: Feature): boolean {
		return this.config.staticFeatures.includes(feature);
	}

	// --- Instance Getters for Constants (Abstract Declarations) ---
	// These must be implemented by the concrete device-type base class (e.g., BaseVacuumFeatures)
	// to provide access to type-specific constants.

	public abstract getCommonConsumable(attribute: string | number): Partial<ioBroker.StateCommon> | undefined;
	public abstract isResetableConsumable(consumable: string): boolean;
	public abstract getCommonDeviceStates(attribute: string | number): Partial<ioBroker.StateCommon> | undefined;
	public abstract getCommonCleaningRecords(attribute: string | number): Partial<ioBroker.StateCommon> | undefined;
	public abstract getFirmwareFeatureName(featureID: string | number): string;
	public abstract getCommonCleaningInfo(attribute: string | number): Partial<ioBroker.StateCommon> | undefined;
}
