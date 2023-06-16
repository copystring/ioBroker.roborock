require('react');

var module50 = require('./50'),
  module13 = require('./13'),
  module1218 = require('./1218'),
  module1291 = require('./1291'),
  module1302 = require('./1302');

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
      u = module1218.TabRouter(o, c),
      p = module1218.createNavigator(module1291.default, u, c);
    return module1218.createNavigationContainer(p);
  },
  module1304 = {
    iOSBottomTabs: {
      tabBarComponent: require('./1304').default,
      tabBarPosition: 'bottom',
      swipeEnabled: false,
      animationEnabled: false,
      initialLayout: undefined,
    },
    AndroidTopTabs: {
      tabBarComponent: module1302.default,
      tabBarPosition: 'top',
      swipeEnabled: true,
      animationEnabled: true,
      initialLayout: undefined,
    },
  };

p.Presets = {
  iOSBottomTabs: module1304.iOSBottomTabs,
  AndroidTopTabs: module1304.AndroidTopTabs,
  Default: 'ios' === module13.Platform.OS ? module1304.iOSBottomTabs : module1304.AndroidTopTabs,
};
var O = p;
exports.default = O;
