require('react');

var module50 = require('./50'),
  module13 = require('./13'),
  module1217 = require('./1217'),
  module1290 = require('./1290'),
  module1301 = require('./1301');

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
      u = module1217.TabRouter(o, c),
      p = module1217.createNavigator(module1290.default, u, c);
    return module1217.createNavigationContainer(p);
  },
  module1303 = {
    iOSBottomTabs: {
      tabBarComponent: require('./1303').default,
      tabBarPosition: 'bottom',
      swipeEnabled: false,
      animationEnabled: false,
      initialLayout: undefined,
    },
    AndroidTopTabs: {
      tabBarComponent: module1301.default,
      tabBarPosition: 'top',
      swipeEnabled: true,
      animationEnabled: true,
      initialLayout: undefined,
    },
  };

p.Presets = {
  iOSBottomTabs: module1303.iOSBottomTabs,
  AndroidTopTabs: module1303.AndroidTopTabs,
  Default: 'ios' === module13.Platform.OS ? module1303.iOSBottomTabs : module1303.AndroidTopTabs,
};
var O = p;
exports.default = O;
