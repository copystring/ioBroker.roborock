import type { ApkAppPluginHostContract, ApkNativeModuleContract } from "./apkContract";
import { resolveEffectiveApkNativeModules } from "./strictNativeModuleRegistry";

export type ApkNativeModuleConstants = Readonly<Record<string, Readonly<Record<string, unknown>>>>;

export interface ApkRemoteModuleDefinition {
	moduleName: string;
	constants: Readonly<Record<string, unknown>> | null;
	methods: string[];
	promiseMethodIndices: number[];
	syncMethodIndices: number[];
	callbackCounts: number[];
}

function uniqueMethods(module: ApkNativeModuleContract): ApkNativeModuleContract["methods"] {
	const seen = new Set<string>();
	return module.methods.filter(method => {
		if (seen.has(method.name)) return false;
		seen.add(method.name);
		return true;
	});
}

export function createApkRemoteModuleDefinitions(
	contract: ApkAppPluginHostContract,
	constants: ApkNativeModuleConstants = {},
): ApkRemoteModuleDefinition[] {
	return resolveEffectiveApkNativeModules(contract).map(module => {
		const methods = uniqueMethods(module);
		return {
			moduleName: module.moduleName,
			constants: constants[module.moduleName] ?? null,
			methods: methods.map(method => method.name),
			promiseMethodIndices: methods.flatMap((method, index) =>
				/(?:^|[,( ])Promise(?:[>, )]|$)/.test(method.parameters) ? [index] : [],
			),
			syncMethodIndices: methods.flatMap((method, index) => method.blockingSynchronous ? [index] : []),
			callbackCounts: methods.map(method => method.parameters.match(/\bCallback\b/g)?.length ?? 0),
		};
	});
}

/**
 * Generates the only JavaScript shim needed before evaluating Hermes bytecode.
 * The source contains APK-derived module/method metadata and delegates every
 * operation to native host hooks. It has no guessed modules, fallback methods,
 * canned responses or ioBroker command knowledge.
 */
export function createApkBridgeBootstrap(
	contract: ApkAppPluginHostContract,
	constants: ApkNativeModuleConstants = {},
): string {
	const definitions = createApkRemoteModuleDefinitions(contract, constants).map(definition => [
		definition.moduleName,
		definition.constants,
		definition.methods,
		definition.promiseMethodIndices,
		definition.syncMethodIndices,
	]);
	const serializedDefinitions = JSON.stringify(definitions);
	return `(function installApkBridge(hostGlobal, definitions) {
"use strict";
if (typeof hostGlobal.__apkNativeInvoke !== "function") {
  throw new Error("APK host hook __apkNativeInvoke is missing");
}
var byName = Object.create(null);
var cache = Object.create(null);
var callbackId = 1;
var callbacks = Object.create(null);
var pendingPromises = Object.create(null);
var base64Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
definitions.forEach(function indexDefinition(definition, moduleId) {
  byName[definition[0]] = { definition: definition, moduleId: moduleId };
});
function encodeBase64(bytes) {
  var result = "";
  for (var index = 0; index < bytes.length; index += 3) {
    var first = bytes[index];
    var second = index + 1 < bytes.length ? bytes[index + 1] : 0;
    var third = index + 2 < bytes.length ? bytes[index + 2] : 0;
    var combined = (first << 16) | (second << 8) | third;
    result += base64Alphabet[(combined >>> 18) & 63];
    result += base64Alphabet[(combined >>> 12) & 63];
    result += index + 1 < bytes.length ? base64Alphabet[(combined >>> 6) & 63] : "=";
    result += index + 2 < bytes.length ? base64Alphabet[combined & 63] : "=";
  }
  return result;
}
function decodeBase64(encoded) {
  if (typeof encoded !== "string" || encoded.length % 4 !== 0) {
    throw new Error("Invalid APK host Base64 value");
  }
  var padding = encoded.slice(-2) === "==" ? 2 : encoded.slice(-1) === "=" ? 1 : 0;
  var bytes = new Uint8Array((encoded.length / 4) * 3 - padding);
  var outputIndex = 0;
  for (var index = 0; index < encoded.length; index += 4) {
    var first = base64Alphabet.indexOf(encoded[index]);
    var second = base64Alphabet.indexOf(encoded[index + 1]);
    var third = encoded[index + 2] === "=" ? 0 : base64Alphabet.indexOf(encoded[index + 2]);
    var fourth = encoded[index + 3] === "=" ? 0 : base64Alphabet.indexOf(encoded[index + 3]);
    if (first < 0 || second < 0 || third < 0 || fourth < 0) {
      throw new Error("Invalid APK host Base64 value");
    }
    var combined = (first << 18) | (second << 12) | (third << 6) | fourth;
    if (outputIndex < bytes.length) bytes[outputIndex++] = (combined >>> 16) & 255;
    if (outputIndex < bytes.length) bytes[outputIndex++] = (combined >>> 8) & 255;
    if (outputIndex < bytes.length) bytes[outputIndex++] = combined & 255;
  }
  return bytes;
}
function marshalValue(value, seen) {
  if (typeof value === "undefined") return { $apkType: "undefined" };
  if (value !== null && (typeof value === "object" || typeof value === "function")) {
    var skiaRefId = value.__apkSkiaRefId;
    if (typeof skiaRefId === "number") return { $apkType: "skiaRef", id: skiaRefId };
  }
  if (typeof value === "function") {
    var id = callbackId++;
    callbacks[id] = value;
    return { $apkType: "callback", id: id };
  }
  if (value === null || typeof value !== "object") return value;
  if (typeof ArrayBuffer === "function" && value instanceof ArrayBuffer) {
    return { $apkType: "bytes", base64: encodeBase64(new Uint8Array(value)) };
  }
  if (typeof ArrayBuffer === "function" && ArrayBuffer.isView && ArrayBuffer.isView(value)) {
    return {
      $apkType: "bytes",
      base64: encodeBase64(new Uint8Array(value.buffer, value.byteOffset, value.byteLength))
    };
  }
  if (seen.indexOf(value) >= 0) throw new Error("Cyclic APK native argument");
  seen.push(value);
  var result;
  if (Array.isArray(value)) {
    result = value.map(function marshalArrayItem(item) { return marshalValue(item, seen); });
  } else {
    result = {};
    Object.keys(value).forEach(function marshalObjectProperty(key) {
      result[key] = marshalValue(value[key], seen);
    });
  }
  seen.pop();
  return result;
}
function marshalArguments(args) {
  return args.map(function marshalArgument(value) { return marshalValue(value, []); });
}
function unmarshalValue(value) {
  if (value === null || typeof value !== "object") return value;
  if (value.$apkType === "undefined") return undefined;
  if (value.$apkType === "bytes") return decodeBase64(value.base64);
  if (value.$apkType === "skiaRef") return createSkiaProxy(value.id);
  if (Array.isArray(value)) return value.map(unmarshalValue);
  var result = {};
  Object.keys(value).forEach(function unmarshalObjectProperty(key) {
    result[key] = unmarshalValue(value[key]);
  });
  return result;
}
var skiaProxyCache = Object.create(null);
function createSkiaProxy(id) {
  if (typeof id !== "number" || id < 1) throw new Error("Invalid APK Skia reference");
  if (skiaProxyCache[id]) return skiaProxyCache[id];
  var target = function apkSkiaRemoteFunction() {};
  var proxy = new Proxy(target, {
    get: function getSkiaProperty(_target, property) {
      if (property === "__apkSkiaRefId") return id;
      if (property === "then" || property === "toJSON") return undefined;
      if (typeof Symbol === "function" && property === Symbol.toStringTag) return "ApkSkiaRemote";
      if (typeof Symbol === "function" && property === Symbol.toPrimitive) {
        return function rejectSkiaPrimitiveConversion() {
          throw new Error("APK Skia references cannot be converted to primitives");
        };
      }
      if (typeof property !== "string") return undefined;
      return unmarshalValue(hostGlobal.__apkSkiaInvoke("get", id, property, []));
    },
    set: function setSkiaProperty(_target, property, nextValue) {
      if (typeof property !== "string") return false;
      return hostGlobal.__apkSkiaInvoke("set", id, property, marshalArguments([nextValue])) === true;
    },
    apply: function applySkiaFunction(_target, _thisArg, args) {
      return unmarshalValue(hostGlobal.__apkSkiaInvoke("apply", id, "", marshalArguments(args)));
    }
  });
  skiaProxyCache[id] = proxy;
  return proxy;
}
function installSkiaGlobals() {
  if (typeof hostGlobal.__apkSkiaInvoke !== "function") {
    throw new Error("APK Skia host hook __apkSkiaInvoke is missing");
  }
  if (hostGlobal.SkiaApi == null) hostGlobal.SkiaApi = createSkiaProxy(1);
  if (hostGlobal.SkiaViewApi == null) hostGlobal.SkiaViewApi = createSkiaProxy(2);
}
function invoke(moduleName, methodName, args, callType) {
  return hostGlobal.__apkNativeInvoke(moduleName, methodName, marshalArguments(args), callType);
}
hostGlobal.__apkInvokeHostCallback = function invokeHostCallback(id, args) {
  var callback = callbacks[id];
  if (typeof callback !== "function") throw new Error("Unknown APK callback " + id);
  delete callbacks[id];
  return callback.apply(undefined, unmarshalValue(args || []));
};
hostGlobal.__apkUnmarshalHostValue = unmarshalValue;
hostGlobal.__apkSettleHostPromise = function settleHostPromise(id, ok, payload) {
  var pending = pendingPromises[id];
  if (!pending) throw new Error("Unknown APK Promise " + id);
  delete pendingPromises[id];
  if (ok) {
    pending.resolve(unmarshalValue(payload));
    return;
  }
  var error = new Error(
    payload && typeof payload.message === "string"
      ? payload.message
      : "APK native Promise rejected"
  );
  if (payload && typeof payload.name === "string") error.name = payload.name;
  pending.reject(error);
};
hostGlobal.__apkEmitDeviceEvent = function emitDeviceEvent(eventName, payload) {
  var bridge = hostGlobal.__fbBatchedBridge;
  if (!bridge || typeof bridge.callFunctionReturnFlushedQueue !== "function") {
    throw new Error("React Native BatchedBridge is not ready for APK device events");
  }
  return bridge.callFunctionReturnFlushedQueue(
    "RCTDeviceEventEmitter", "emit", [eventName, unmarshalValue(payload)]
  );
};
hostGlobal.__apkRunApplication = function runApplication(appKey, parameters) {
  if (typeof appKey !== "string" || !parameters || typeof parameters !== "object") {
    throw new Error("Invalid APK AppRegistry.runApplication arguments");
  }
  var bridge = hostGlobal.__fbBatchedBridge;
  if (!bridge || typeof bridge.callFunctionReturnFlushedQueue !== "function") {
    throw new Error("React Native BatchedBridge is not ready for APK AppRegistry.runApplication");
  }
  return bridge.callFunctionReturnFlushedQueue(
    "AppRegistry", "runApplication", [appKey, parameters]
  );
};
function createTurboModule(moduleName) {
  var indexed = byName[moduleName];
  if (!indexed) return undefined;
  var definition = indexed.definition;
  var module = Object.assign(Object.create(null), definition[1] || {});
  module.getConstants = function getConstants() { return definition[1] || {}; };
  definition[2].forEach(function installMethod(methodName, methodId) {
    module[methodName] = function apkNativeMethod() {
      var args = Array.prototype.slice.call(arguments);
      if (definition[3].indexOf(methodId) >= 0) {
        return new Promise(function apkNativePromise(resolve, reject) {
          var requestId = invoke(moduleName, methodName, args, "promise");
          pendingPromises[requestId] = { resolve: resolve, reject: reject };
        });
      }
      var callType = definition[4].indexOf(methodId) >= 0 ? "sync" : "async";
      var result = invoke(moduleName, methodName, args, callType);
      if (moduleName === "RNSkiaModule" && methodName === "install" && result === true) {
        installSkiaGlobals();
      }
      return result;
    };
  });
  return module;
}
function getTurboModule(moduleName) {
  if (!byName[moduleName]) return undefined;
  if (!cache[moduleName]) cache[moduleName] = createTurboModule(moduleName);
  return cache[moduleName];
}
hostGlobal.global = hostGlobal;
hostGlobal.self = hostGlobal;
hostGlobal.navigator = hostGlobal.navigator || { product: "ReactNative" };
hostGlobal.__DEV__ = false;
hostGlobal.__fbBatchedBridgeConfig = { remoteModuleConfig: definitions };
hostGlobal.nativeModuleProxy = new Proxy(Object.create(null), {
  get: function resolveNativeModule(_target, name) {
    return typeof name === "string" ? getTurboModule(name) : undefined;
  }
});
hostGlobal.__turboModuleProxy = getTurboModule;
hostGlobal.nativeRequireModuleConfig = function nativeRequireModuleConfig(name) {
  return byName[name] ? JSON.stringify(byName[name].definition) : null;
};
hostGlobal.nativeFlushQueueImmediate = function nativeFlushQueueImmediate(queue) {
  if (typeof hostGlobal.__apkNativeFlushQueue !== "function") {
    throw new Error("APK host hook __apkNativeFlushQueue is missing");
  }
  return hostGlobal.__apkNativeFlushQueue(queue);
};
hostGlobal.nativeCallSyncHook = function nativeCallSyncHook(moduleId, methodId, args) {
  var definition = definitions[moduleId];
  if (!definition || typeof definition[2][methodId] !== "string") {
    throw new Error("Unknown APK native sync method " + moduleId + ":" + methodId);
  }
  return invoke(definition[0], definition[2][methodId], args || [], "sync");
};
})(${contract.runtime.lifecycleState === "BEFORE_CREATE" ? "this" : "globalThis"}, ${serializedDefinitions});\n`;
}
