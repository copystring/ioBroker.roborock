require('react');

var module50 = require('./50'),
  module12 = require('./12'),
  module1034 = require('./1034'),
  module1107 = require('./1107'),
  module1118 = require('./1118');

function u(t, o) {
  var n = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var b = Object.getOwnPropertySymbols(t);
    if (o)
      b = b.filter(function (o) {
        return Object.getOwnPropertyDescriptor(t, o).enumerable;
      });
    n.push.apply(n, b);
  }

  return n;
}

function l(t) {
  for (var n = 1; n < arguments.length; n++) {
    var b = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      u(Object(b), true).forEach(function (n) {
        module50.default(t, n, b[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(b));
    else
      u(Object(b)).forEach(function (o) {
        Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(b, o));
      });
  }

  return t;
}

var p = function t(o) {
    var n = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : {},
      c = l(l({}, t.Presets.Default), n),
      u = module1034.TabRouter(o, c),
      p = module1034.createNavigator(module1107.default, u, c);
    return module1034.createNavigationContainer(p);
  },
  module1120 = {
    iOSBottomTabs: {
      tabBarComponent: require('./1120').default,
      tabBarPosition: 'bottom',
      swipeEnabled: false,
      animationEnabled: false,
      initialLayout: undefined,
    },
    AndroidTopTabs: {
      tabBarComponent: module1118.default,
      tabBarPosition: 'top',
      swipeEnabled: true,
      animationEnabled: true,
      initialLayout: undefined,
    },
  };

p.Presets = {
  iOSBottomTabs: module1120.iOSBottomTabs,
  AndroidTopTabs: module1120.AndroidTopTabs,
  Default: 'ios' === module12.Platform.OS ? module1120.iOSBottomTabs : module1120.AndroidTopTabs,
};
var O = p;
exports.default = O;
