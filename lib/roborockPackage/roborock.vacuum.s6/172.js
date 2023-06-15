var module21 = require('./21'),
  module49 = require('./49');

function o(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(t);
    if (n)
      s = s.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, s);
  }

  return o;
}

function s(t) {
  for (var s = 1; s < arguments.length; s++) {
    var c = null != arguments[s] ? arguments[s] : {};
    if (s % 2)
      o(Object(c), true).forEach(function (o) {
        module49(t, o, c[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(c));
    else
      o(Object(c)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(c, n));
      });
  }

  return t;
}

var module64 = require('./64'),
  module46 = require('./46'),
  module170 = require('./170'),
  module13 = require('./13'),
  module171 = require('./171'),
  module173 = require('./173'),
  module77 = require('./77'),
  module174 = require('./174'),
  module175 = require('./175'),
  module80 = require('./80'),
  module15 = require('./15');

var w = false;

function T(t) {
  var n = module46.getConstants();
  if (n.ViewManagerNames || n.LazyViewManagersEnabled) t = P(t, module46.getDefaultEventTypes());
  else {
    t.bubblingEventTypes = P(t.bubblingEventTypes, n.genericBubblingEventTypes);
    t.directEventTypes = P(t.directEventTypes, n.genericDirectEventTypes);
  }
}

function P(t, n) {
  if (!n) return t;
  if (!t) return n;

  for (var o in n)
    if (n.hasOwnProperty(o)) {
      var s = n[o];

      if (t.hasOwnProperty(o)) {
        var c = t[o];
        if ('object' == typeof s && 'object' == typeof c) s = P(c, s);
      }

      t[o] = s;
    }

  return t;
}

function j(t) {
  switch (t) {
    case 'CATransform3D':
      return module171;

    case 'CGPoint':
      return module173;

    case 'CGSize':
      return module80;

    case 'UIEdgeInsets':
      return module170;
  }

  return null;
}

function h(t) {
  switch (t) {
    case 'CGColor':
    case 'UIColor':
      return module77;

    case 'CGColorArray':
    case 'UIColorArray':
      return module174;

    case 'CGImage':
    case 'UIImage':
    case 'RCTImageSource':
      return module175;

    case 'Color':
      return module77;

    case 'ColorArray':
      return module174;
  }

  return null;
}

module.exports = function (n) {
  var o = module46.getViewManagerConfig(n);
  module13(null != o && null != o.NativeProps, 'requireNativeComponent: "%s" was not found in the UIManager.', n);

  for (var l = o.baseModuleName, b = o.bubblingEventTypes, v = o.directEventTypes, f = o.NativeProps; l; ) {
    var y = module46.getViewManagerConfig(l);

    if (y) {
      b = s(s({}, y.bubblingEventTypes), b);
      v = s(s({}, y.directEventTypes), v);
      f = s(s({}, y.NativeProps), f);
      l = y.baseModuleName;
    } else {
      module15(false, 'Base module "%s" does not exist', l);
      l = null;
    }
  }

  var O = {};

  for (var C in f) {
    var P = f[C],
      I = j(P),
      N = h(P);
    O[C] = (null == I && null == N) || {
      diff: I,
      process: N,
    };
  }

  O.style = module64;
  module21(o, {
    uiViewClassName: n,
    validAttributes: O,
    bubblingEventTypes: b,
    directEventTypes: v,
  });

  if (!w) {
    T(o);
    w = true;
  }

  return o;
};
