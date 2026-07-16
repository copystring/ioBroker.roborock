#include <hermes/hermes.h>

#include <cstdint>
#include <cstdlib>
#include <deque>
#include <filesystem>
#include <fstream>
#include <iostream>
#include <iterator>
#include <memory>
#include <sstream>
#include <stdexcept>
#include <string>
#include <unordered_map>
#include <utility>
#include <vector>

namespace fs = std::filesystem;
namespace jsi = facebook::jsi;

namespace {

constexpr const char *kProtocolName = "roborock-appplugin-host";
constexpr int kProtocolVersion = 1;

class VectorBuffer final : public jsi::Buffer {
 public:
  explicit VectorBuffer(std::vector<uint8_t> bytes) : bytes_(std::move(bytes)) {}

  size_t size() const override {
    return bytes_.size();
  }

  const uint8_t *data() const override {
    return bytes_.data();
  }

 private:
  std::vector<uint8_t> bytes_;
};

struct Options {
  fs::path bundlePath;
  fs::path bootstrapPath;
  bool ipc{false};
  size_t maxHeapBytes{256ULL * 1024ULL * 1024ULL};
};

std::vector<uint8_t> readBinaryFile(const fs::path &filePath) {
  std::ifstream stream(filePath, std::ios::binary);
  if (!stream) {
    throw std::runtime_error("Unable to open " + filePath.string());
  }
  return std::vector<uint8_t>(
      std::istreambuf_iterator<char>(stream), std::istreambuf_iterator<char>());
}

std::string readTextFile(const fs::path &filePath) {
  std::ifstream stream(filePath, std::ios::binary);
  if (!stream) {
    throw std::runtime_error("Unable to open " + filePath.string());
  }
  std::ostringstream output;
  output << stream.rdbuf();
  return output.str();
}

std::string jsonEscape(const std::string &value) {
  std::ostringstream output;
  for (const unsigned char character : value) {
    switch (character) {
      case '\\':
        output << "\\\\";
        break;
      case '"':
        output << "\\\"";
        break;
      case '\b':
        output << "\\b";
        break;
      case '\f':
        output << "\\f";
        break;
      case '\n':
        output << "\\n";
        break;
      case '\r':
        output << "\\r";
        break;
      case '\t':
        output << "\\t";
        break;
      default:
        if (character < 0x20) {
          constexpr char hex[] = "0123456789abcdef";
          output << "\\u00" << hex[(character >> 4) & 0x0f]
                 << hex[character & 0x0f];
        } else {
          output << character;
        }
    }
  }
  return output.str();
}

Options parseOptions(int argc, char **argv) {
  Options options;
  for (int index = 1; index < argc; ++index) {
    const std::string argument(argv[index]);
    if (argument == "--bundle" && index + 1 < argc) {
      options.bundlePath = fs::path(argv[++index]);
    } else if (argument == "--bootstrap" && index + 1 < argc) {
      options.bootstrapPath = fs::path(argv[++index]);
    } else if (argument == "--ipc") {
      options.ipc = true;
    } else if (argument == "--max-heap-mb" && index + 1 < argc) {
      const auto megabytes = std::stoull(argv[++index]);
      if (megabytes < 32 || megabytes > 4096) {
        throw std::runtime_error(
            "--max-heap-mb must be between 32 and 4096");
      }
      options.maxHeapBytes =
          static_cast<size_t>(megabytes * 1024ULL * 1024ULL);
    } else if (argument == "--help" || argument == "-h") {
      std::cout
          << "Usage: roborock-hermes-appplugin-host --bundle "
             "<index.android.bundle> --bootstrap <bridge_bootstrap.js> "
             "[--ipc] [--max-heap-mb <32..4096>]\n";
      std::exit(EXIT_SUCCESS);
    } else {
      throw std::runtime_error("Unknown or incomplete argument: " + argument);
    }
  }
  if (options.bundlePath.empty() || options.bootstrapPath.empty()) {
    throw std::runtime_error("Both --bundle and --bootstrap are required");
  }
  return options;
}

jsi::Value jsonParse(jsi::Runtime &runtime, const std::string &json) {
  auto jsonObject = runtime.global().getPropertyAsObject(runtime, "JSON");
  auto parse = jsonObject.getPropertyAsFunction(runtime, "parse");
  return parse.callWithThis(
      runtime, jsonObject, jsi::String::createFromUtf8(runtime, json));
}

std::string jsonStringify(jsi::Runtime &runtime, const jsi::Value &value) {
  auto jsonObject = runtime.global().getPropertyAsObject(runtime, "JSON");
  auto stringify = jsonObject.getPropertyAsFunction(runtime, "stringify");
  auto result = stringify.callWithThis(runtime, jsonObject, value);
  if (!result.isString()) {
    throw jsi::JSError(runtime, "JSON.stringify returned no string");
  }
  return result.asString(runtime).utf8(runtime);
}

std::string requiredString(
    jsi::Runtime &runtime,
    const jsi::Object &object,
    const char *name) {
  auto value = object.getProperty(runtime, name);
  if (!value.isString()) {
    throw jsi::JSError(
        runtime, std::string("Host message property is not a string: ") + name);
  }
  return value.asString(runtime).utf8(runtime);
}

double requiredNumber(
    jsi::Runtime &runtime,
    const jsi::Object &object,
    const char *name) {
  auto value = object.getProperty(runtime, name);
  if (!value.isNumber()) {
    throw jsi::JSError(
        runtime, std::string("Host message property is not a number: ") + name);
  }
  return value.asNumber();
}

class IpcBridge final {
 public:
  explicit IpcBridge(bool enabled) : enabled_(enabled) {}

  void install(jsi::Runtime &runtime) {
    auto invoke = jsi::Function::createFromHostFunction(
        runtime,
        jsi::PropNameID::forAscii(runtime, "__apkNativeInvoke"),
        4,
        [this](
            jsi::Runtime &hostRuntime,
            const jsi::Value &,
            const jsi::Value *arguments,
            size_t count) {
          return invokeNative(hostRuntime, arguments, count);
        });
    runtime.global().setProperty(
        runtime, "__apkNativeInvoke", std::move(invoke));

    auto skiaInvoke = jsi::Function::createFromHostFunction(
        runtime,
        jsi::PropNameID::forAscii(runtime, "__apkSkiaInvoke"),
        4,
        [this](
            jsi::Runtime &hostRuntime,
            const jsi::Value &,
            const jsi::Value *arguments,
            size_t count) {
          return invokeSkia(hostRuntime, arguments, count);
        });
    runtime.global().setProperty(
        runtime, "__apkSkiaInvoke", std::move(skiaInvoke));

    auto flush = jsi::Function::createFromHostFunction(
        runtime,
        jsi::PropNameID::forAscii(runtime, "__apkNativeFlushQueue"),
        1,
        [this](
            jsi::Runtime &hostRuntime,
            const jsi::Value &,
            const jsi::Value *arguments,
            size_t count) {
          return flushQueue(hostRuntime, arguments, count);
        });
    runtime.global().setProperty(
        runtime, "__apkNativeFlushQueue", std::move(flush));

    auto logging = jsi::Function::createFromHostFunction(
        runtime,
        jsi::PropNameID::forAscii(runtime, "nativeLoggingHook"),
        2,
        [](
            jsi::Runtime &hostRuntime,
            const jsi::Value &,
            const jsi::Value *arguments,
            size_t count) {
          if (count > 0) {
            if (arguments[0].isString()) {
              std::cerr << arguments[0].asString(hostRuntime).utf8(hostRuntime);
            } else {
              std::cerr << jsonStringify(hostRuntime, arguments[0]);
            }
          }
          std::cerr << "\n";
          return jsi::Value::undefined();
        });
    runtime.global().setProperty(
        runtime, "nativeLoggingHook", std::move(logging));
  }

  void emitLifecycle(const std::string &type) const {
    if (!enabled_) {
      return;
    }
    writeLine(
        std::string("{\"protocol\":\"") + kProtocolName +
        "\",\"version\":" + std::to_string(kProtocolVersion) +
        ",\"type\":\"" + jsonEscape(type) + "\"}");
  }

  void emitFatal(const std::string &message) const {
    if (!enabled_) {
      return;
    }
    writeLine(
        std::string("{\"protocol\":\"") + kProtocolName +
        "\",\"version\":" + std::to_string(kProtocolVersion) +
        ",\"type\":\"fatal\",\"error\":{\"name\":\"Error\",\"message\":\"" +
        jsonEscape(message) + "\"}}");
  }

  void emitBundleEvaluated(
      const std::string &probe,
      const std::string &bundleKind) const {
    if (!enabled_) {
      return;
    }
    writeLine(
        std::string("{\"protocol\":\"") + kProtocolName +
        "\",\"version\":" + std::to_string(kProtocolVersion) +
        ",\"type\":\"bundleEvaluated\",\"bundleKind\":\"" +
        jsonEscape(bundleKind) + "\",\"probe\":" + probe + "}");
  }

  bool runCommandLoop(jsi::Runtime &runtime) {
    if (!enabled_) {
      return true;
    }
    while (!stopRequested_) {
      std::string line;
      if (!deferredCommands_.empty()) {
        line = std::move(deferredCommands_.front());
        deferredCommands_.pop_front();
      } else if (!std::getline(std::cin, line)) {
        break;
      }
      if (line.empty()) {
        continue;
      }
      auto message = jsonParse(runtime, line);
      if (!message.isObject()) {
        throw std::runtime_error("Host command must be an object");
      }
      processCommand(runtime, message.asObject(runtime));
      runtime.drainMicrotasks();
    }
    return stopRequested_;
  }

 private:
  static void writeLine(const std::string &line) {
    std::cout << line << std::endl;
  }

  jsi::Value invokeNative(
      jsi::Runtime &runtime,
      const jsi::Value *arguments,
      size_t count) {
    if (!enabled_) {
      throw jsi::JSError(
          runtime,
          "APK native invocation requires the Hermes host --ipc mode");
    }
    if (count != 4 || !arguments[0].isString() ||
        !arguments[1].isString() || !arguments[3].isString()) {
      throw jsi::JSError(runtime, "Invalid __apkNativeInvoke arguments");
    }

    const auto moduleName =
        arguments[0].asString(runtime).utf8(runtime);
    const auto methodName =
        arguments[1].asString(runtime).utf8(runtime);
    const auto callType =
        arguments[3].asString(runtime).utf8(runtime);
    if (callType != "async" && callType != "promise" &&
        callType != "sync") {
      throw jsi::JSError(
          runtime, "Unknown APK native call type: " + callType);
    }
    const uint64_t requestId = nextRequestId_++;
    const auto serializedArguments = jsonStringify(runtime, arguments[2]);

    writeLine(
        std::string("{\"protocol\":\"") + kProtocolName +
        "\",\"version\":" + std::to_string(kProtocolVersion) +
        ",\"type\":\"invoke\",\"requestId\":" +
        std::to_string(requestId) + ",\"moduleName\":\"" +
        jsonEscape(moduleName) + "\",\"methodName\":\"" +
        jsonEscape(methodName) + "\",\"callType\":\"" +
        jsonEscape(callType) + "\",\"arguments\":" +
        serializedArguments + "}");

    if (callType == "sync") {
      return waitForInvokeResult(runtime, requestId);
    }
    pendingRequestTypes_.emplace(requestId, callType);
    if (callType == "promise") {
      return jsi::Value(static_cast<double>(requestId));
    }
    return jsi::Value::undefined();
  }

  jsi::Value invokeSkia(
      jsi::Runtime &runtime,
      const jsi::Value *arguments,
      size_t count) {
    if (!enabled_) {
      throw jsi::JSError(
          runtime,
          "APK Skia invocation requires the Hermes host --ipc mode");
    }
    if (count != 4 || !arguments[0].isString() ||
        !arguments[1].isNumber() || !arguments[2].isString()) {
      throw jsi::JSError(runtime, "Invalid __apkSkiaInvoke arguments");
    }
    const auto operation =
        arguments[0].asString(runtime).utf8(runtime);
    if (operation != "get" && operation != "set" && operation != "apply") {
      throw jsi::JSError(
          runtime, "Unknown APK Skia operation: " + operation);
    }
    const auto targetNumber = arguments[1].asNumber();
    const auto targetId = static_cast<uint64_t>(targetNumber);
    if (targetNumber < 1 || targetNumber != static_cast<double>(targetId)) {
      throw jsi::JSError(runtime, "Invalid APK Skia target handle");
    }
    const auto property =
        arguments[2].asString(runtime).utf8(runtime);
    const uint64_t requestId = nextRequestId_++;
    const auto serializedArguments = jsonStringify(runtime, arguments[3]);

    writeLine(
        std::string("{\"protocol\":\"") + kProtocolName +
        "\",\"version\":" + std::to_string(kProtocolVersion) +
        ",\"type\":\"skiaInvoke\",\"requestId\":" +
        std::to_string(requestId) + ",\"operation\":\"" +
        jsonEscape(operation) + "\",\"targetId\":" +
        std::to_string(targetId) + ",\"property\":\"" +
        jsonEscape(property) + "\",\"arguments\":" +
        serializedArguments + "}");
    return waitForInvokeResult(runtime, requestId);
  }

  jsi::Value flushQueue(
      jsi::Runtime &runtime,
      const jsi::Value *arguments,
      size_t count) {
    if (!enabled_) {
      throw jsi::JSError(
          runtime,
          "APK BatchedBridge flush requires the Hermes host --ipc mode");
    }
    if (count != 1) {
      throw jsi::JSError(runtime, "Invalid __apkNativeFlushQueue arguments");
    }
    emitQueue(runtime, arguments[0]);
    return jsi::Value::undefined();
  }

  void emitQueue(jsi::Runtime &runtime, const jsi::Value &queue) const {
    if (queue.isUndefined() || queue.isNull()) {
      return;
    }
    writeLine(
        std::string("{\"protocol\":\"") + kProtocolName +
        "\",\"version\":" + std::to_string(kProtocolVersion) +
        ",\"type\":\"flushQueue\",\"queue\":" +
        jsonStringify(runtime, queue) + "}");
  }

  jsi::Value waitForInvokeResult(
      jsi::Runtime &runtime,
      uint64_t requestId) {
    std::string line;
    while (std::getline(std::cin, line)) {
      if (line.empty()) {
        continue;
      }
      auto parsed = jsonParse(runtime, line);
      if (!parsed.isObject()) {
        throw jsi::JSError(runtime, "Host response must be an object");
      }
      auto object = parsed.asObject(runtime);
      validateEnvelope(runtime, object);
      const auto type = requiredString(runtime, object, "type");
      if (type == "invokeResult" &&
          static_cast<uint64_t>(
              requiredNumber(runtime, object, "requestId")) == requestId) {
        auto ok = object.getProperty(runtime, "ok");
        if (!ok.isBool()) {
          throw jsi::JSError(runtime, "Host invokeResult.ok must be boolean");
        }
        if (ok.getBool()) {
          return unmarshal(
              runtime, object.getProperty(runtime, "value"));
        }
        throw jsi::JSError(
            runtime, invokeErrorMessage(runtime, object));
      }
      deferredCommands_.push_back(std::move(line));
    }
    throw jsi::JSError(
        runtime, "Hermes host input closed while waiting for native response");
  }

  jsi::Value unmarshal(
      jsi::Runtime &runtime,
      jsi::Value value) const {
    auto helperValue =
        runtime.global().getProperty(runtime, "__apkUnmarshalHostValue");
    if (!helperValue.isObject() ||
        !helperValue.asObject(runtime).isFunction(runtime)) {
      return value;
    }
    auto helper = helperValue.asObject(runtime).asFunction(runtime);
    return helper.call(runtime, std::move(value));
  }

  void processCommand(
      jsi::Runtime &runtime,
      jsi::Object message) {
    validateEnvelope(runtime, message);
    const auto type = requiredString(runtime, message, "type");
    if (type == "shutdown") {
      stopRequested_ = true;
      return;
    }
    if (type == "invokeCallback") {
      invokeCallback(runtime, message);
      return;
    }
    if (type == "emitDeviceEvent") {
      emitDeviceEvent(runtime, message);
      return;
    }
    if (type == "callJsFunction") {
      callJsFunction(runtime, message);
      return;
    }
    if (type == "runApplication") {
      runApplication(runtime, message);
      return;
    }
    if (type == "runtimeBarrier") {
      runtimeBarrier(runtime, message);
      return;
    }
    if (type == "hostError") {
      auto error = message.getProperty(runtime, "error");
      std::cerr << "TypeScript host error: "
                << jsonStringify(runtime, error) << "\n";
      return;
    }
    if (type == "invokeResult") {
      processInvokeResult(runtime, message);
      return;
    }
    throw jsi::JSError(
        runtime, "Unknown TypeScript host command: " + type);
  }

  void validateEnvelope(
      jsi::Runtime &runtime,
      const jsi::Object &message) const {
    const auto protocol = requiredString(runtime, message, "protocol");
    const auto version = requiredNumber(runtime, message, "version");
    if (protocol != kProtocolName ||
        version != static_cast<double>(kProtocolVersion)) {
      throw jsi::JSError(
          runtime, "Mismatched Hermes host protocol envelope");
    }
  }

  std::string invokeErrorMessage(
      jsi::Runtime &runtime,
      const jsi::Object &message) const {
    auto errorValue = message.getProperty(runtime, "error");
    if (!errorValue.isObject()) {
      return "APK native invocation failed";
    }
    auto errorObject = errorValue.asObject(runtime);
    auto messageValue = errorObject.getProperty(runtime, "message");
    return messageValue.isString()
        ? messageValue.asString(runtime).utf8(runtime)
        : "APK native invocation failed";
  }

  void processInvokeResult(
      jsi::Runtime &runtime,
      const jsi::Object &message) {
    const auto requestId = static_cast<uint64_t>(
        requiredNumber(runtime, message, "requestId"));
    auto pending = pendingRequestTypes_.find(requestId);
    if (pending == pendingRequestTypes_.end()) {
      throw jsi::JSError(
          runtime, "Unexpected invokeResult without a pending request");
    }
    auto ok = message.getProperty(runtime, "ok");
    if (!ok.isBool()) {
      throw jsi::JSError(runtime, "Host invokeResult.ok must be boolean");
    }
    const auto callType = pending->second;
    pendingRequestTypes_.erase(pending);
    if (callType == "promise") {
      auto settlement =
          runtime.global().getPropertyAsFunction(
              runtime, "__apkSettleHostPromise");
      auto payload = ok.getBool()
          ? message.getProperty(runtime, "value")
          : message.getProperty(runtime, "error");
      settlement.call(
          runtime,
          static_cast<double>(requestId),
          ok.getBool(),
          std::move(payload));
      return;
    }
    if (!ok.getBool()) {
      std::cerr << "Asynchronous APK native invocation failed: "
                << invokeErrorMessage(runtime, message) << "\n";
    }
  }

  void invokeCallback(
      jsi::Runtime &runtime,
      const jsi::Object &message) {
    const auto target = requiredString(runtime, message, "target");
    const auto callbackId =
        requiredNumber(runtime, message, "callbackId");
    auto arguments =
        unmarshal(runtime, message.getProperty(runtime, "arguments"));

    if (target == "turbo") {
      auto callbackInvoker =
          runtime.global().getPropertyAsFunction(
              runtime, "__apkInvokeHostCallback");
      callbackInvoker.call(runtime, callbackId, std::move(arguments));
      return;
    }
    if (target == "batched") {
      auto bridge =
          runtime.global().getPropertyAsObject(runtime, "__fbBatchedBridge");
      auto callbackInvoker =
          bridge.getPropertyAsFunction(
              runtime, "invokeCallbackAndReturnFlushedQueue");
      auto queue = callbackInvoker.callWithThis(
          runtime, bridge, callbackId, std::move(arguments));
      emitQueue(runtime, queue);
      return;
    }
    throw jsi::JSError(
        runtime, "Unknown APK callback target: " + target);
  }

  void runApplication(
      jsi::Runtime &runtime,
      const jsi::Object &message) {
    const auto appKey = requiredString(runtime, message, "appKey");
    auto parametersValue = message.getProperty(runtime, "parameters");
    if (!parametersValue.isObject()) {
      throw jsi::JSError(
          runtime, "APK AppRegistry parameters must be an object");
    }
    const auto rootTag = requiredNumber(
        runtime, parametersValue.asObject(runtime), "rootTag");
    auto parameters = unmarshal(runtime, std::move(parametersValue));
    auto runner = runtime.global().getPropertyAsFunction(
        runtime, "__apkRunApplication");
    auto queue = runner.call(
        runtime,
        jsi::String::createFromUtf8(runtime, appKey),
        std::move(parameters));
    emitQueue(runtime, queue);
    writeLine(
        std::string("{\"protocol\":\"") + kProtocolName +
        "\",\"version\":" + std::to_string(kProtocolVersion) +
        ",\"type\":\"applicationStarted\",\"appKey\":\"" +
        jsonEscape(appKey) + "\",\"rootTag\":" +
        std::to_string(rootTag) + "}");
  }

  void callJsFunction(
      jsi::Runtime &runtime,
      const jsi::Object &message) {
    const auto moduleName = requiredString(runtime, message, "moduleName");
    const auto methodName = requiredString(runtime, message, "methodName");
    auto argumentsValue = message.getProperty(runtime, "arguments");
    if (!argumentsValue.isObject() ||
        !argumentsValue.asObject(runtime).isArray(runtime)) {
      throw jsi::JSError(
          runtime, "APK JavaScript module arguments must be an array");
    }
    auto arguments = unmarshal(runtime, std::move(argumentsValue));
    auto bridge =
        runtime.global().getPropertyAsObject(runtime, "__fbBatchedBridge");
    auto invoker = bridge.getPropertyAsFunction(
        runtime, "callFunctionReturnFlushedQueue");
    auto queue = invoker.callWithThis(
        runtime,
        bridge,
        jsi::String::createFromUtf8(runtime, moduleName),
        jsi::String::createFromUtf8(runtime, methodName),
        std::move(arguments));
    emitQueue(runtime, queue);
  }

  void emitDeviceEvent(
      jsi::Runtime &runtime,
      const jsi::Object &message) {
    auto eventName = message.getProperty(runtime, "eventName");
    auto payload =
        unmarshal(runtime, message.getProperty(runtime, "payload"));
    auto emitter =
        runtime.global().getPropertyAsFunction(
            runtime, "__apkEmitDeviceEvent");
    auto queue = emitter.call(
        runtime, std::move(eventName), std::move(payload));
    emitQueue(runtime, queue);
  }

  void runtimeBarrier(
      jsi::Runtime &runtime,
      const jsi::Object &message) {
    const auto barrierId = requiredNumber(runtime, message, "barrierId");
    if (barrierId < 1 || barrierId != static_cast<uint64_t>(barrierId)) {
      throw jsi::JSError(runtime, "Invalid Hermes runtime barrier ID");
    }
    runtime.drainMicrotasks();
    writeLine(
        std::string("{\"protocol\":\"") + kProtocolName +
        "\",\"version\":" + std::to_string(kProtocolVersion) +
        ",\"type\":\"runtimeBarrierReached\",\"barrierId\":" +
        std::to_string(static_cast<uint64_t>(barrierId)) + "}");
  }

  bool enabled_{false};
  bool stopRequested_{false};
  uint64_t nextRequestId_{1};
  std::deque<std::string> deferredCommands_;
  std::unordered_map<uint64_t, std::string> pendingRequestTypes_;
};

std::string evaluateString(
    jsi::Runtime &runtime,
    const std::string &source,
    const std::string &url) {
  const auto result = runtime.evaluateJavaScript(
      std::make_shared<jsi::StringBuffer>(source), url);
  if (!result.isString()) {
    throw std::runtime_error(url + " did not return a string");
  }
  return result.asString(runtime).utf8(runtime);
}

const char *probeSource = R"JS(
(function () {
  var result = {
    bridgeConfigured: !!global.__fbBatchedBridgeConfig,
    nativeModuleProxyConfigured: typeof global.nativeModuleProxy === "object",
    turboModuleProxyConfigured: typeof global.__turboModuleProxy === "function",
    ipcInvokeConfigured: typeof global.__apkNativeInvoke === "function",
    ipcQueueConfigured: typeof global.__apkNativeFlushQueue === "function",
    appKeys: [],
    batchedBridgePresent: !!global.__fbBatchedBridge
  };
  try {
    if (global.RN$AppRegistry &&
        typeof global.RN$AppRegistry.getAppKeys === "function") {
      result.appKeys = global.RN$AppRegistry.getAppKeys();
      result.registryKind = "direct";
    } else if (global.__fbBatchedBridge &&
               typeof global.__fbBatchedBridge.getCallableModule === "function") {
      var appRegistry =
          global.__fbBatchedBridge.getCallableModule("AppRegistry");
      result.appKeys =
          appRegistry &&
          typeof appRegistry.getAppKeys === "function"
            ? appRegistry.getAppKeys()
            : [];
      result.registryKind = "batched-bridge-module";
    } else if (global.__fbBatchedBridge &&
               typeof global.__fbBatchedBridge
                   .callFunctionReturnResultAndFlushedQueue === "function") {
      var response =
          global.__fbBatchedBridge.callFunctionReturnResultAndFlushedQueue(
              "AppRegistry", "getAppKeys", []);
      result.appKeys = response && response[0] ? response[0] : [];
      result.registryKind = "batched-bridge";
    }
  } catch (error) {
    result.probeError =
        String(error && error.message ? error.message : error);
  }
  return JSON.stringify(result);
})()
)JS";

}  // namespace

int main(int argc, char **argv) {
  bool bytecodeAccepted = false;
  bool bootstrapCompleted = false;
  bool ipcMode = false;
  std::unique_ptr<IpcBridge> bridge;
  try {
    const Options options = parseOptions(argc, argv);
    ipcMode = options.ipc;
    auto bundleBytes = readBinaryFile(options.bundlePath);
    bytecodeAccepted =
        facebook::hermes::HermesRuntime::isHermesBytecode(
            bundleBytes.data(), bundleBytes.size());
    const auto gcConfig =
        ::hermes::vm::GCConfig::Builder()
            .withInitHeapSize(
                options.maxHeapBytes < 32ULL * 1024ULL * 1024ULL
                    ? options.maxHeapBytes
                    : 32ULL * 1024ULL * 1024ULL)
            .withMaxHeapSize(options.maxHeapBytes)
            .withShouldReleaseUnused(::hermes::vm::kReleaseUnusedYoungOnFull)
            .build();
    const auto runtimeConfig =
        ::hermes::vm::RuntimeConfig::Builder()
            .withGCConfig(gcConfig)
            .withES6Promise(true)
            .withES6Proxy(true)
            .withMicrotaskQueue(true)
            .withEnableHermesInternal(false)
            .build();
    auto runtime =
        facebook::hermes::makeHermesRuntime(runtimeConfig);
    bridge = std::make_unique<IpcBridge>(options.ipc);
    bridge->install(*runtime);
    bridge->emitLifecycle("ready");

    runtime->evaluateJavaScript(
        std::make_shared<jsi::StringBuffer>(
            readTextFile(options.bootstrapPath)),
        options.bootstrapPath.string());
    bootstrapCompleted = true;

    if (bytecodeAccepted) {
      runtime->evaluateJavaScript(
          std::make_shared<VectorBuffer>(std::move(bundleBytes)),
          options.bundlePath.string());
    } else {
      runtime->evaluateJavaScript(
          std::make_shared<jsi::StringBuffer>(
              std::string(bundleBytes.begin(), bundleBytes.end())),
          options.bundlePath.string());
    }
    runtime->drainMicrotasks();
    const std::string probe =
        evaluateString(*runtime, probeSource, "apk-host-probe.js");

    if (options.ipc) {
      bridge->emitBundleEvaluated(
          probe,
          bytecodeAccepted ? "hermes-bytecode" : "javascript-source");
      const bool stopped = bridge->runCommandLoop(*runtime);
      if (stopped) {
        bridge->emitLifecycle("stopped");
      }
      return stopped ? EXIT_SUCCESS : EXIT_FAILURE;
    }

    std::cout
        << "{\"hostProtocol\":1,\"bytecodeAccepted\":"
        << (bytecodeAccepted ? "true" : "false")
        << ",\"bundleKind\":\""
        << (bytecodeAccepted ? "hermes-bytecode" : "javascript-source")
        << "\",\"bootstrapCompleted\":true,\"evaluationCompleted\":true,"
           "\"probe\":"
        << probe << "}\n";
    return EXIT_SUCCESS;
  } catch (const std::exception &error) {
    if (ipcMode && bridge) {
      bridge->emitFatal(error.what());
    } else {
      std::cout
          << "{\"hostProtocol\":1,\"bytecodeAccepted\":"
          << (bytecodeAccepted ? "true" : "false")
          << ",\"bootstrapCompleted\":"
          << (bootstrapCompleted ? "true" : "false")
          << ",\"evaluationCompleted\":false,\"error\":\""
          << jsonEscape(error.what()) << "\"}\n";
    }
    return EXIT_FAILURE;
  }
}
