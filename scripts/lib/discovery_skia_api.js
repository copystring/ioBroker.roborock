
function summarizeArgument(value) {
	if (value === null || value === undefined) return value;
	if (["string", "number", "boolean"].includes(typeof value)) return value;
	if (Array.isArray(value)) return `[array:${value.length}]`;
	if (typeof value === "function") return "[function]";
	return `[${Object.prototype.toString.call(value).slice(8, -1)}]`;
}

function createDiscoverySkiaApi(calls = []) {
	const cache = new Map();

	function createCapability(capability) {
		if (cache.has(capability)) return cache.get(capability);
		const target = function () {};
		const proxy = new Proxy(target, {
			apply(_target, _thisArg, args) {
				calls.push({ capability, args: args.map(summarizeArgument) });
				const result = createCapability(`${capability}()`);
				if (capability.endsWith(".Data.fromURI")) return Promise.resolve(result);
				return result;
			},
			construct(_target, args) {
				calls.push({ capability: `new ${capability}`, args: args.map(summarizeArgument) });
				return createCapability(`new ${capability}()`);
			},
			get(currentTarget, property, receiver) {
				if (property === "then") return undefined;
				if (property === "toJSON") return () => `[skia:${capability}]`;
				if (property === Symbol.toPrimitive) return hint => hint === "string" ? `[skia:${capability}]` : 0;
				if (typeof property === "symbol") return Reflect.get(currentTarget, property, receiver);
				if (Reflect.has(currentTarget, property)) return Reflect.get(currentTarget, property, receiver);
				return createCapability(`${capability}.${property}`);
			},
			set(_target, property, value) {
				calls.push({ capability: `${capability}.${String(property)}=`, args: [summarizeArgument(value)] });
				return true;
			}
		});
		cache.set(capability, proxy);
		return proxy;
	}

	return createCapability("SkiaApi");
}

module.exports = {
	createDiscoverySkiaApi
};
