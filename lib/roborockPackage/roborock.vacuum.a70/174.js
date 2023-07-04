var module22 = require('./22'),
  module50 = require('./50');

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
        module50(t, o, c[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(c));
    else
      o(Object(c)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(c, n));
      });
  }

  return t;
}

var module65 = require('./65'),
  module47 = require('./47'),
  module172 = require('./172'),
  module14 = require('./14'),
  module173 = require('./173'),
  module175 = require('./175'),
  module78 = require('./78'),
  module176 = require('./176'),
  module177 = require('./177'),
  module81 = require('./81'),
  module16 = require('./16');

var w = false;

function T(t) {
  var n = module47.getConstants();
  if (n.ViewManagerNames || n.LazyViewManagersEnabled) t = P(t, module47.getDefaultEventTypes());
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
      return module173;

    case 'CGPoint':
      return module175;

    case 'CGSize':
      return module81;

    case 'UIEdgeInsets':
      return module172;
  }

  return null;
}

function h(t) {
  switch (t) {
    case 'CGColor':
    case 'UIColor':
      return module78;

    case 'CGColorArray':
    case 'UIColorArray':
      return module176;

    case 'CGImage':
    case 'UIImage':
    case 'RCTImageSource':
      return module177;

    case 'Color':
      return module78;

    case 'ColorArray':
      return module176;
  }

  return null;
}

module.exports = function (n) {
  var o = module47.getViewManagerConfig(n);
  module14(null != o && null != o.NativeProps, 'requireNativeComponent: "%s" was not found in the UIManager.', n);

  for (var l = o.baseModuleName, b = o.bubblingEventTypes, v = o.directEventTypes, f = o.NativeProps; l; ) {
    var y = module47.getViewManagerConfig(l);

    if (y) {
      b = s(s({}, y.bubblingEventTypes), b);
      v = s(s({}, y.directEventTypes), v);
      f = s(s({}, y.NativeProps), f);
      l = y.baseModuleName;
    } else {
      module16(false, 'Base module "%s" does not exist', l);
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

  O.style = module65;
  module22(o, {
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
