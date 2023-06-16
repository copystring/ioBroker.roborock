var module13 = require('./13').NativeModules.PlatformConstants;

exports.supportsImprovedSpringAnimation = function () {
  if (module13 && module13.reactNativeVersion) {
    var o = module13.reactNativeVersion,
      t = o.major,
      s = o.minor;
    return s >= 50 || (0 === t && 0 === s);
  }

  return false;
};
