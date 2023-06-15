exports.get = o;

exports.getEnforcing = function (n) {
  var u = o(n);
  module14.default(null != u, "TurboModuleRegistry.getEnforcing(...): '" + n + "' could not be found. Verify that a module by this name is registered in the native binary.");
  return u;
};

var module14 = require('./14'),
  module21 = require('./21'),
  l = globals.__turboModuleProxy;

function o(n) {
  if (!globals.RN$Bridgeless) {
    var t = module21[n];
    if (null != t) return t;
  }

  return null != l ? l(n) : null;
}
