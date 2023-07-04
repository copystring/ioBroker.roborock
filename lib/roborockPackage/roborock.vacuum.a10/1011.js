require('react');

var module49 = require('./49'),
  module12 = require('./12'),
  module936 = require('./936'),
  module1012 = require('./1012'),
  module1023 = require('./1023');

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
        module49.default(t, n, b[n]);
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
      u = module936.TabRouter(o, c),
      p = module936.createNavigator(module1012.default, u, c);
    return module936.createNavigationContainer(p);
  },
  module1025 = {
    iOSBottomTabs: {
      tabBarComponent: require('./1025').default,
      tabBarPosition: 'bottom',
      swipeEnabled: false,
      animationEnabled: false,
      initialLayout: undefined,
    },
    AndroidTopTabs: {
      tabBarComponent: module1023.default,
      tabBarPosition: 'top',
      swipeEnabled: true,
      animationEnabled: true,
      initialLayout: undefined,
    },
  };

p.Presets = {
  iOSBottomTabs: module1025.iOSBottomTabs,
  AndroidTopTabs: module1025.AndroidTopTabs,
  Default: 'ios' === module12.Platform.OS ? module1025.iOSBottomTabs : module1025.AndroidTopTabs,
};
var O = p;
exports.default = O;
