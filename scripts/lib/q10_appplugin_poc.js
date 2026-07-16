const path = require("node:path");
const { MetroSplitRuntime } = require("./metro_split_runtime.js");

function esModule(defaultExport, additionalExports = {}) {
	return { __esModule: true, default: defaultExport, ...additionalExports };
}

function interopRequireDefault(value) {
	return value?.__esModule ? value : { default: value };
}

function classCallCheck(instance, constructor) {
	if (!(instance instanceof constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function defineProperties(target, properties) {
	for (const property of properties ?? []) {
		const descriptor = {
			configurable: true,
			enumerable: property.enumerable ?? false
		};
		if ("get" in property || "set" in property) {
			descriptor.get = property.get;
			descriptor.set = property.set;
		} else {
			descriptor.value = property.value;
			descriptor.writable = true;
		}
		Object.defineProperty(target, property.key, descriptor);
	}
}

function createClass(constructor, prototypeProperties, staticProperties) {
	defineProperties(constructor.prototype, prototypeProperties);
	defineProperties(constructor, staticProperties);
	return constructor;
}

function asyncToGenerator(generatorFunction) {
	return function wrappedGenerator(...args) {
		const generator = generatorFunction.apply(this, args);
		return new Promise((resolve, reject) => {
			function advance(method, value) {
				let result;
				try {
					result = generator[method](value);
				} catch (error) {
					reject(error);
					return;
				}
				if (result.done) {
					resolve(result.value);
					return;
				}
				Promise.resolve(result.value).then(
					nextValue => advance("next", nextValue),
					error => advance("throw", error)
				);
			}
			advance("next");
		});
	};
}

function defineProperty(target, key, value) {
	if (key in target) {
		Object.defineProperty(target, key, {
			configurable: true,
			enumerable: true,
			value,
			writable: true
		});
	} else {
		target[key] = value;
	}
	return target;
}

function packedRgbaToWebColor(value) {
	const packed = value >>> 0;
	const red = (packed >>> 24) & 0xff;
	const green = (packed >>> 16) & 0xff;
	const blue = (packed >>> 8) & 0xff;
	const alphaByte = packed & 0xff;
	const hex = `#${packed.toString(16).padStart(8, "0")}`;
	return {
		packed,
		hex,
		css: `rgba(${red}, ${green}, ${blue}, ${Number((alphaByte / 255).toFixed(3))})`
	};
}

function createQ10Overrides(capturedDps, hostLog, hostErrors) {
	const emptyModule = esModule({});
	const state = { homeDpList: [] };
	const stateStore = {
		getInstance: () => state
	};
	const bridge = {
		RRDevice: {
			deviceIOT: {
				publishDps: payload => {
					capturedDps.push(structuredClone(payload));
					const result = Promise.resolve(true);
					const originalThen = result.then.bind(result);
					result.then = (onFulfilled, onRejected) =>
						originalThen(value => {
							try {
								return onFulfilled?.(value);
							} catch (error) {
								hostErrors.push(error instanceof Error ? error.stack : String(error));
								throw error;
							}
						}, onRejected);
					return result;
				}
			}
		}
	};

	return new Map([
		[1, interopRequireDefault],
		[2, esModule(classCallCheck)],
		[3, esModule(createClass)],
		[12, esModule(asyncToGenerator)],
		[37, esModule(value => Array.from(value))],
		[172, esModule(defineProperty)],
		[441, bridge],
		[941, emptyModule],
		[945, emptyModule],
		[948, esModule(stateStore)],
		[969, { consoleLog: message => hostLog.push(String(message)) }],
		[977, emptyModule],
		[986, emptyModule]
	]);
}

async function runQ10AppPluginProof(options = {}) {
	const repoRoot = path.resolve(options.repoRoot ?? path.join(__dirname, "..", ".."));
	const splitDir = path.resolve(
		options.splitDir ??
			path.join(repoRoot, ".AppPlugins", "Q10", "019bdf41f583723bb937ccc99bbd7541", "metro_bundle_split")
	);
	const capturedDps = [];
	const hostLog = [];
	const hostErrors = [];
	const runtime = new MetroSplitRuntime({
		splitDir,
		overrides: createQ10Overrides(capturedDps, hostLog, hostErrors),
		timeoutMs: options.timeoutMs ?? 2_000
	});

	const commandModule = runtime.require(940);
	const commandManager = commandModule.default.getInstance();
	commandManager.startClean();
	commandManager.startElectoralClean({
		room_id_list: [16, 17],
		clean_count: 1,
		fan_level: 2,
		water_level: 2
	});
	commandManager.goCharge();
	await Promise.resolve();
	await Promise.resolve();

	const colorModule = runtime.require(952);
	const drawLevels = colorModule.YXMapDrawLevel;
	const colorProvider = colorModule.default;
	const palettes = {
		lightTheme: {
			deep: colorProvider.roomColors(drawLevels.Deep, false).map(packedRgbaToWebColor),
			normal: colorProvider.roomColors(drawLevels.Nomal, false).map(packedRgbaToWebColor),
			light: colorProvider.roomColors(drawLevels.Light, false).map(packedRgbaToWebColor)
		},
		darkTheme: {
			deep: colorProvider.roomColors(drawLevels.Deep, true).map(packedRgbaToWebColor),
			normal: colorProvider.roomColors(drawLevels.Nomal, true).map(packedRgbaToWebColor),
			light: colorProvider.roomColors(drawLevels.Light, true).map(packedRgbaToWebColor)
		}
	};

	return {
		splitDir,
		originalModules: {
			commands: 940,
			roomColors: 952,
			dpConstants: 981
		},
		invokedPluginCommands: ["startClean", "startElectoralClean", "goCharge"],
		capturedDps,
		palettes,
		hostLog,
		hostErrors,
		loadedOriginalModules: runtime.trace.filter(entry => entry.type === "module").map(entry => entry.moduleId)
	};
}

module.exports = {
	createQ10Overrides,
	packedRgbaToWebColor,
	runQ10AppPluginProof
};
