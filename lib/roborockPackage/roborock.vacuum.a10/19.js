exports.get = o;

exports.getEnforcing = function (n) {
  var u = o(n);
  module13.default(null != u, "TurboModuleRegistry.getEnforcing(...): '" + n + "' could not be found. Verify that a module by this name is registered in the native binary.");
  return u;
};

var module13 = require('./13'),
  module20 = require('./20'),
  l = globals.__turboModuleProxy;

function o(n) {
  if (!globals.RN$Bridgeless) {
    var t = module20[n];
    if (null != t) return t;
  }

  return null != l ? l(n) : null;
}
