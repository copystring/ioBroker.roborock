const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

class MissingMetroModuleError extends Error {
	constructor(moduleId, reason, loadStack) {
		super(`Metro module ${moduleId} is unavailable: ${reason}. Load stack: ${loadStack.join(" -> ") || "<entry>"}`);
		this.name = "MissingMetroModuleError";
		this.moduleId = moduleId;
		this.loadStack = [...loadStack];
	}
}

class MetroSplitRuntime {
	constructor(options) {
		if (!options?.splitDir) {
			throw new Error("splitDir is required");
		}

		this.splitDir = path.resolve(options.splitDir);
		this.moduleDir = path.join(this.splitDir, "modules");
		this.timeoutMs = options.timeoutMs ?? 1_000;
		this.overrides = new Map(options.overrides ?? []);
		this.cache = new Map();
		this.loadStack = [];
		this.trace = [];

		const manifestPath = path.join(this.splitDir, "modules.json");
		if (!fs.existsSync(manifestPath)) {
			throw new Error(`Metro manifest not found: ${manifestPath}`);
		}

		const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
		this.manifest = new Map(manifest.map((entry) => [Number(entry.moduleId), entry]));
		this.context = vm.createContext(this.#createSandbox(options.globals ?? {}), {
			name: `appplugin:${path.basename(path.dirname(this.splitDir))}`
		});
	}

	#createSandbox(globals) {
		const sandbox = {
			Buffer,
			Promise,
			TextDecoder,
			TextEncoder,
			URL,
			URLSearchParams,
			clearInterval,
			clearTimeout,
			console,
			queueMicrotask,
			setInterval,
			setTimeout,
			...globals
		};
		sandbox.global = sandbox;
		sandbox.self = sandbox;
		return sandbox;
	}

	setOverride(moduleId, exportsValue) {
		this.overrides.set(Number(moduleId), exportsValue);
		this.cache.delete(Number(moduleId));
	}

	require(moduleId) {
		const normalizedId = Number(moduleId);
		if (!Number.isInteger(normalizedId)) {
			throw new TypeError(`Metro module id must be an integer, got ${String(moduleId)}`);
		}

		if (this.overrides.has(normalizedId)) {
			this.trace.push({ type: "override", moduleId: normalizedId });
			return this.overrides.get(normalizedId);
		}

		const cached = this.cache.get(normalizedId);
		if (cached) {
			return cached.exports;
		}

		const entry = this.manifest.get(normalizedId);
		if (!entry) {
			throw new MissingMetroModuleError(normalizedId, "not listed in modules.json", this.loadStack);
		}

		const modulePath = path.join(this.moduleDir, entry.file);
		if (!fs.existsSync(modulePath)) {
			throw new MissingMetroModuleError(normalizedId, `host module file is missing (${entry.file})`, this.loadStack);
		}

		const module = { exports: {} };
		this.cache.set(normalizedId, module);
		this.loadStack.push(normalizedId);

		try {
			const source = fs.readFileSync(modulePath, "utf8");
			const factory = new vm.Script(source, { filename: modulePath }).runInContext(this.context, {
				timeout: this.timeoutMs
			});
			if (typeof factory !== "function") {
				throw new Error(`Metro module ${normalizedId} did not evaluate to a factory function`);
			}

			const metroRequire = (dependencyId) => this.require(dependencyId);
			const importDefault = (dependencyId) => {
				const dependency = this.require(dependencyId);
				return dependency?.__esModule ? dependency.default : dependency;
			};
			const importAll = (dependencyId) => this.require(dependencyId);

			this.context.__metroFactory = factory;
			this.context.__metroArgs = [
				this.context,
				metroRequire,
				importDefault,
				importAll,
				module,
				module.exports,
				entry.deps
			];
			new vm.Script("__metroFactory(...__metroArgs)", { filename: `${modulePath}:invoke` }).runInContext(this.context, {
				timeout: this.timeoutMs
			});
			this.trace.push({ type: "module", moduleId: normalizedId, file: entry.file });
			return module.exports;
		} catch (error) {
			this.cache.delete(normalizedId);
			throw error;
		} finally {
			delete this.context.__metroFactory;
			delete this.context.__metroArgs;
			this.loadStack.pop();
		}
	}
}

module.exports = {
	MetroSplitRuntime,
	MissingMetroModuleError
};
