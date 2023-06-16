require('react');

var module50 = require('./50'),
  module12 = require('./12'),
  module1139 = require('./1139'),
  module1212 = require('./1212'),
  module1223 = require('./1223');

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
      u = module1139.TabRouter(o, c),
      p = module1139.createNavigator(module1212.default, u, c);
    return module1139.createNavigationContainer(p);
  },
  module1225 = {
    iOSBottomTabs: {
      tabBarComponent: require('./1225').default,
      tabBarPosition: 'bottom',
      swipeEnabled: false,
      animationEnabled: false,
      initialLayout: undefined,
    },
    AndroidTopTabs: {
      tabBarComponent: module1223.default,
      tabBarPosition: 'top',
      swipeEnabled: true,
      animationEnabled: true,
      initialLayout: undefined,
    },
  };

p.Presets = {
  iOSBottomTabs: module1225.iOSBottomTabs,
  AndroidTopTabs: module1225.AndroidTopTabs,
  Default: 'ios' === module12.Platform.OS ? module1225.iOSBottomTabs : module1225.AndroidTopTabs,
};
var O = p;
exports.default = O;
