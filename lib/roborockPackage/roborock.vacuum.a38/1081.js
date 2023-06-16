var module12 = require('./12').NativeModules.PlatformConstants;

exports.supportsImprovedSpringAnimation = function () {
  if (module12 && module12.reactNativeVersion) {
    var o = module12.reactNativeVersion,
      t = o.major,
      s = o.minor;
    return s >= 50 || (0 === t && 0 === s);
  }

  return false;
};
