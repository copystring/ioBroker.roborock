// GENERATED from the APK host contract with explicit conformance-fixture display and locale inputs.
// Do not edit this JavaScript directly.
(function installApkBridge(hostGlobal, definitions) {
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
})(this, [["DeviceEventManager",null,["invokeDefaultBackPressHandler"],[],[]],["DeviceInfo",{"Dimensions":{"windowPhysicalPixels":{"width":1080,"height":2400,"scale":3,"fontScale":1,"densityDpi":480},"screenPhysicalPixels":{"width":1080,"height":2400,"scale":3,"fontScale":1,"densityDpi":480}}},[],[],[]],["DevSettings",null,["addListener","addMenuItem","onFastRefresh","reload","reloadWithReason","removeListeners","setHotLoadingEnabled","setIsDebuggingRemotely","setIsShakeToShowDevMenuEnabled","setProfilingEnabled","toggleElementInspector"],[],[]],["ExceptionsManager",null,["dismissRedbox","reportException","reportFatalException","reportSoftException","updateExceptionMessage"],[],[]],["HeadlessJsTaskSupport",null,["notifyTaskFinished","notifyTaskRetry"],[1],[]],["LogBox",null,["hide","show"],[],[]],["PlatformConstants",null,["getAndroidID"],[],[0]],["SourceCode",null,[],[],[]],["Timing",null,["createTimer","deleteTimer","setSendIdleEvents"],[],[]],["UIManager",null,["clearJSResponder","configureNextLayoutAnimation","createView","dismissPopupMenu","dispatchViewManagerCommand","findSubviewIn","getConstantsForViewManager","getDefaultEventTypes","manageChildren","measure","measureInWindow","measureLayout","measureLayoutRelativeToParent","removeRootView","removeSubviewsFromContainerWithID","replaceExistingNonRootView","sendAccessibilityEvent","setChildren","setJSResponder","setLayoutAnimationEnabledExperimental","showPopupMenu","updateView","viewIsDescendantOf"],[],[6,7]],["AccessibilityInfo",null,["announceForAccessibility","getRecommendedTimeoutMillis","isAccessibilityServiceEnabled","isReduceMotionEnabled","isTouchExplorationEnabled","setAccessibilityFocus"],[],[]],["Appearance",null,["addListener","getColorScheme","removeListeners","setColorScheme"],[],[1]],["AppState",null,["addListener","getCurrentAppState","removeListeners"],[],[]],["BlobModule",null,["addNetworkingHandler","addWebSocketHandler","createFromParts","release","removeWebSocketHandler","sendOverSocket"],[],[]],["Clipboard",null,["getString","setString"],[0],[]],["DevLoadingView",null,["hide","showMessage"],[],[]],["DevToolsSettingsManager",null,["getConsolePatchSettings","getProfilingSettings","setConsolePatchSettings","setProfilingSettings"],[],[0,1]],["DialogManagerAndroid",null,["showAlert"],[],[]],["FileReaderModule",null,["readAsDataURL","readAsText"],[0,1],[]],["FrescoModule",null,[],[],[]],["I18nManager",{"isRTL":false,"doLeftAndRightSwapInRTL":true,"localeIdentifier":"en-US"},["allowRTL","forceRTL","swapLeftAndRightInRTL"],[],[]],["ImageLoader",null,["abortRequest","getSize","getSizeWithHeaders","prefetchImage","queryCache"],[1,2,3,4],[]],["ImageStoreManager",null,["getBase64ForTag"],[],[]],["IntentAndroid",null,["canOpenURL","getInitialURL","openSettings","openURL","sendIntent"],[0,1,2,3,4],[]],["NativeAnimatedModule",null,["addAnimatedEventToView","addListener","connectAnimatedNodes","connectAnimatedNodeToView","createAnimatedNode","disconnectAnimatedNodeFromView","disconnectAnimatedNodes","dropAnimatedNode","extractAnimatedNodeOffset","finishOperationBatch","flattenAnimatedNodeOffset","getValue","queueAndExecuteBatchedOperations","removeAnimatedEventFromView","removeListeners","restoreDefaultValues","setAnimatedNodeOffset","setAnimatedNodeValue","startAnimatingNode","startListeningToAnimatedNodeValue","startOperationBatch","stopAnimation","stopListeningToAnimatedNodeValue","updateAnimatedNodeConfig"],[],[]],["Networking",null,["abortRequest","addListener","clearCookies","removeListeners","sendRequest"],[],[]],["PermissionsAndroid",null,["checkPermission","requestMultiplePermissions","requestPermission","shouldShowRequestPermissionRationale"],[0,1,2,3],[]],["ShareModule",null,["share"],[0],[]],["SoundManager",null,["playTouchSound"],[],[]],["StatusBarManager",null,["setColor","setHidden","setStyle","setTranslucent"],[],[]],["ToastAndroid",null,["show","showWithGravity","showWithGravityAndOffset"],[],[]],["Vibration",null,["cancel","vibrate","vibrateByPattern"],[],[]],["WebSocketModule",null,["addListener","close","connect","ping","removeListeners","send","sendBinary"],[],[]],["RNCNetInfo",null,["addListener","getCurrentState","removeListeners"],[1],[]],["RNCAsyncStorage",null,["clear","getAllKeys","multiGet","multiMerge","multiRemove","multiSet"],[],[]],["RNCSafeAreaContext",{"initialWindowMetrics":{"insets":{"top":0,"right":0,"bottom":0,"left":0},"frame":{"x":0,"y":0,"width":360,"height":800}}},[],[],[]],["RNSModule",null,[],[],[]],["RNGestureHandlerModule",{"State":{"UNDETERMINED":0,"FAILED":1,"BEGAN":2,"CANCELLED":3,"ACTIVE":4,"END":5},"Direction":{"RIGHT":1,"LEFT":2,"UP":4,"DOWN":8}},["attachGestureHandler","createGestureHandler","dropGestureHandler","flushOperations","handleClearJSResponder","handleSetJSResponder","install","updateGestureHandler"],[],[6]],["RNCWebViewModule",null,["isFileUploadSupported","shouldStartLoadWithLockIdentifier"],[0],[]],["RNGLContext",null,["addShader","removeShader"],[],[]],["Orientation",null,["addListener","getAutoRotateState","getDeviceOrientation","getOrientation","lockToLandscape","lockToLandscapeLeft","lockToLandscapeRight","lockToPortrait","lockToPortraitUpsideDown","removeListeners","unlockAllOrientations"],[],[]],["RNSVGRenderableModule",null,["getBBox","getCTM","getPointAtLength","getRawResource","getScreenCTM","getTotalLength","isPointInFill","isPointInStroke"],[3],[0,1,2,4,5,6,7]],["RNSVGSvgViewModule",null,["toDataURL"],[],[]],["ReactLocalization",{"language":"en"},["getLanguage","setLanguage"],[1],[]],["RR3DMapViewManager",null,["addCleanZone","addCleanZoneV2","getCleanZoneParams","getCleanZoneParamsV2","getSelectBlocks","getSelectBlocksV2","setMapViewMode"],[],[]],["RRAppSysModule",null,["addListener","closePlugin","eventCommonV2WithEventIDDict","eventCommonWithEventIDDict","eventRecordView","eventStatusWithParamDic","fileInternalBug","fileInternalBugExtra","getFeaturePluginInfo","getFeatureScope","getR50_imageDes","getR50_imageTranslation","getR50_uploadFileSignUrl","getSystemCameraForPhotoV2","getSystemImages","getSystemMedia","getSystemMediaWithImageType","jumpToNativePage","reload","removeListeners","saveImageBase64","uploadFilesToOss","uploadImageDataToOssV2","uploadImageToOssAtPath","uploadUserChatHistory"],[6,7,8,9,10,11,12,13,14,15,16,20,21,22,23,24],[]],["RRDevicesModule",null,["addListener","callMethod","callMethodFromCloud","callMethodFromLocal","getAllDeviceProductRaw","getConnectedRawProductModels","getDeviceListInfo","getDeviceMainPluginDownloadVersion","publishDps","removeListeners"],[4,5,6,7],[]],["RRHttpModule",null,["addListener","iotDelete","iotGet","iotPost","iotPostJson","mallProductGet","mallProductPost","mallProductPostJson","removeListeners","userGet","userPost","userPostImages","userPostJson"],[1,2,3,4,5,6,7,9,10,11,12],[]],["RROmniDeviceTurboModule",null,["getCreateTime"],[0],[]],["RRPAGImageViewModule",null,["getCurrentFrameWithTag"],[],[]],["RRPluginCamera",null,["getBase64OfFileAt","getQRCodeImageBase64","saveImageBase64"],[0,1,2],[]],["RRPluginDarkMode",null,["addListener","getCardStyle","getColorModel","getColorScheme","removeListeners","setCardStyle","setColorModel","setStyle"],[1,2,3],[]],["RRPluginDevice",null,["addListener","connectDeviceByLANIfNeeded","getDeviceOnlineStatus","loadDps","publishDps","removeListeners"],[2,3],[]],["RRPluginDeviceFirmware",null,["addListener","checkProgress","removeListeners"],[],[]],["RRPluginPermissions",null,["checkPermission","getCurrentWiFi","getDiskReadWritePermission","getDiskSize","getDiskWritePermission","isSystemServiceEnabled","openSystemSettings","requestDiskWritePermission","requestPermission"],[0,1,2,3,4,5,7,8],[]],["RRPluginSDK",{"userId":"conformance-user","apiLevel":10042,"basePath":"file:///conformance-appplugin/","deviceExtra":{},"deviceId":"conformance-device","deviceSN":"","ownerId":"conformance-owner","deviceModel":"conformance.model","systemInfo":{"mobileModel":"ioBroker AppPlugin Conformance Host","sysVersion":"APK contract 4.54.02","sysName":"Android"},"devMode":false,"mobileModel":"ioBroker AppPlugin Conformance Host","deviceName":null,"storageBasePath":"conformance-storage","deviceNameChangedEvent":"deviceNameChange","audioPlayerDidFinishPlayingEvent":"playComplete","activeTime":0,"robotTimeZone":0,"iotType":2,"appVersion":"4.54.02","userScope":"","deviceCategory":"","memory":1024,"clientID":"conformance-client"},["addListener","addNewRoomWithName","addOrSetTimer","addSmartScene","addSmartSceneV2","agreementAndPolicy","agreementAndPolicyV2","autoUploadLog","blueAutoConnect","blueCallMethod","blueCallMethodV2","blueConnect","blueDisconnect","blueGetMap","blueGetMapV2","blueIsConnected","blueRemoteRssi","blueRobotData","blueStartSearch","blueStopSearch","callJsExecutor","callJsExecutorWithArray","callMethod","callMethodFromCloud","callMethodFromLocal","callMethodPb","callMethodPbFromCloud","callMethodPbFromCloudV2","callMethodPbFromLocal","callMethodPbFromLocalV2","callMethodPbV2","callMethodPbWithStrategy","callMethodWithObject","cancelUserAgreement","checkHoliday","clearValues","closeCurrentPage","collectUserInfo","deleteDevice","deleteFile","deleteSmartScene","downloadFile","enableAVCall","eventCommonV2WithEventIDDict","eventCommonWithEventIDDict","eventRecordView","eventStatusWithParamDic","executeSmartScene","fileInternalBug","fileInternalBugExtra","getConfigTestUrlList","getCurrentCountryInfoCallback","getDeviceExtraInfoForKey","getDeviceExtraInfoForKeyArray","getDevicePropertyFromMemCache","getDevScope","getDiskSize","getFirmwareUpdateState","getLastVersionInfo","getMapData","getMapDataByPb","getMapDataByPbV2","getMapDataPbWithStrategy","getMqttConnectStatus","getOperatorsInfo","getPluginAgreements","getPluginAgreementsV2","getPrivacyCode","getProductAgreements","getRobotBlobByPb","getRobotBlobByPbV2","getRobotData","getRoomList","getSceneOrders","getShareDeviceRooms","getSmartSceneList","getSmartScenes","getSsid","getSystemMedia","getSystemTimezoneNameWithCallback","getTimers","getUserAvatar","getUserRole","getValue","getVoicePackageList","gotoMainlandMall","gotoWxMiniProgramMall","isAutoUpdateOn","keepScreenOn","loadInfoCallback","localPingWithCallback","longScreenShot","notifyNativeUpdateSceneDataSource","open3DMapTestPage","openChangeDeviceName","openDeleteDevice","openDeviceSharePage","openDeviceUpgradePage","openPrivacyLicense","openSetDevicePicturePage","openShareListBar","putSmartScene","putSmartSceneTriggers","readFile","readFileList","readFileListAtPath","readFileToBase64","reload","removeDeviceExtraValueForKey","removeListeners","removeRoom","removeTimer","removeValue","saveDeviceExtraValue","saveInfo","setMaxFramerate","setSceneOrders","setSmartSceneParams","setValue","signUserAgreement","startBackgroundJsExecutor","startBlueRssi","startPlay","stopBackground","stopPlay","syncSmartScenes","ungzFile","updateDimension","updateSmartScene","updateTimerStatus","uploadAppAndPluginLog","uploadFilesToOss","uploadSignStatus","writeFileToPath"],[1,3,4,5,6,7,8,11,12,15,16,18,19,33,34,37,38,40,47,48,49,50,52,53,55,56,57,58,64,65,66,67,68,72,73,74,75,76,77,78,82,84,87,91,101,102,105,108,110,113,116,117,119,121,128,130,131,133],[]],["RRRecorder",null,["cancel","delRecord","getRecordData","getRecordPermission","getRecords","goRecordSetting","requestRecordPermission","setMaxCount","start","stop"],[0,2,3,4,6,8,9],[]],["RRVideoViewManager",null,["captureCurrentFrame","enableAVCall","enableMicrophone","enterFullScreen","exitFullScreen","getCurrentSDKStatusInfo","getDiskWritePermission","getRecordPermission","goRecordSetting","requestDiskWritePermission","requestRecordPermission","sendIceInfoToSDK","sendSdpInfoToSDK","sendTurnServerInfoToSDK","setMaxFramerate","startCameraPreview","startRecordVideo","stopCameraPreview","stopRecordVideo"],[6,7,9,10],[]],["RTNNativeDevice",null,["getMapData"],[],[]],["RNSkiaModule",null,["install"],[],[0]],["RRAppSysTurboModule",null,["addListener","debug","error","getAppBuildConfig","getNetworkReachable","info","keepWindowPrivacyMode","log","openCameraScan","removeListeners","warn"],[3,4,6,8],[]],["RRAuthTurboModule",null,["addListener","checkOnepassAvailable","getDefaultRegion","getOnepassOperatorType","getThirdPartyAuthToken","hideOnepassLoginLoading","isGoogleServiceAvailable","isPlatformAppInstalled","loginSuccess","onePass","prefetchOnepass","quitOnepassLoginPage","recaptchaWithGoogleService","removeListeners","supportsPlatformQuickLogin"],[1,2,3,4,5,6,7,8,9,10,11,12,14],[]],["RRFileTurboModule",null,["addListener","downloadFile","removeListeners","uploadLogsByApp"],[1,3],[]],["RRPluginHttpTurboModule",null,["accountGet","accountPost","accountPostJson","getHttpHeaders","getTimestamp","iotDelete","iotGet","iotPost","iotPostJson","iotPut","iotPutJson","mallProductGetV2","mallProductPostJsonV2","updateTimestamp","userDelete","userGet","userPost","userPostImages","userPostJson","userPostJsonV2","userPut","userPutJson"],[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21],[]],["RRPluginStateSyncTurboModule",null,["addListener","afterLogin","clearAppCache","closeFeatureRN","doLogout","getAppCacheSize","getIsTestPermissions","getUseTestEnvironment","hideTabbar","loadFeatureCache","removeListeners","setUseTestEnvironment","showTabbar","triggerLogin"],[1,2,4,5,6,7,9,11,13],[]],["RRProfileTurboModule",null,["addListener","createOtaDevice","deallocOtaDeviceListener","getAppConfig","getLanguage","getNetDataPackageProtect","getNotifiEnable","getPictureBase64FromAlbum","getShowDeveloperView","getUserRole","gotoDeveloperView","gotoInternalTestingReportBugs","gotoMemberAndServiceCenter","gotoWeChatCustomerService","keepWindowPrivacyMode","notifyAppRefreshUserInfo","removeListeners","setLanguage","setNetDataPackageProtect","syncDeviceListData","updateRedDotForProfileTabbar"],[1,2,3,4,5,6,7,8,9,10,11,12,13,14,17,18,19,20],[]],["RRSecretTurboModule",null,["apiCodecBase64","apiDigestBase64"],[0,1],[]],["RTNProfileTurboModule",null,["addListener","getAppConfig","getShowDeveloperView","gotoAlexaAuthPageViewController","gotoDeveloperView","gotoIssueLogReportView","gotoMemberAndServiceCenter","gotoPermissionManagerView","gotoProfileDetailView","gotoSiriCommandViewController","gotoSiriShortCutController","removeListeners"],[1,2,3,4,5,6,7,8,9,10],[]],["MMKVNative",null,["install"],[],[0]],["AirMapModule",null,["coordinateForPoint","getAddressFromCoordinates","getCamera","getMapBoundaries","pointForCoordinate","takeSnapshot"],[0,1,2,3,4,5],[]]]);
