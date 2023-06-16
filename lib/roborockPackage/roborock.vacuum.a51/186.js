var module182 = require('./182'),
  module13 = require('./13');

var p = function (n, p) {
  var f = p && p.paperComponentName ? p.paperComponentName : n;
  if (null != p && null != p.paperComponentNameDeprecated)
    if (module13.UIManager.getViewManagerConfig(n)) f = n;
    else {
      if (null == p.paperComponentNameDeprecated || !module13.UIManager.getViewManagerConfig(p.paperComponentNameDeprecated))
        throw new Error('Failed to find native component for either ' + n + ' or ' + (p.paperComponentNameDeprecated || '(unknown)'));
      f = p.paperComponentNameDeprecated;
    }
  return module182.default(f);
};

exports.default = p;
