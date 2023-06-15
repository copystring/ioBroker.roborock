var n,
  module50 = require('./50'),
  module12 = require('./12'),
  module1080 = require('./1080');

function l(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var c = Object.getOwnPropertySymbols(t);
    if (n)
      c = c.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, c);
  }

  return o;
}

function u(t) {
  for (var n = 1; n < arguments.length; n++) {
    var c = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      l(Object(c), true).forEach(function (n) {
        module50.default(t, n, c[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(c));
    else
      l(Object(c)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(c, n));
      });
  }

  return t;
}

var module1081 = {
    transitionSpec: (n = require('./1081').supportsImprovedSpringAnimation()
      ? {
          timing: module12.Animated.spring,
          stiffness: 1e3,
          damping: 500,
          mass: 3,
        }
      : {
          duration: 500,
          easing: module12.Easing.bezier(0.2833, 0.99, 0.31833, 0.99),
          timing: module12.Animated.timing,
        }),
    screenInterpolator: module1080.default.forHorizontal,
    containerStyle: {
      backgroundColor: '#000',
    },
  },
  p = {
    transitionSpec: n,
    screenInterpolator: module1080.default.forVertical,
    containerStyle: {
      backgroundColor: '#000',
    },
  },
  O = {
    transitionSpec: {
      duration: 350,
      easing: module12.Easing.out(module12.Easing.poly(5)),
      timing: module12.Animated.timing,
    },
    screenInterpolator: module1080.default.forFadeFromBottomAndroid,
  },
  b = {
    transitionSpec: {
      duration: 230,
      easing: module12.Easing.in(module12.Easing.poly(4)),
      timing: module12.Animated.timing,
    },
    screenInterpolator: module1080.default.forFadeFromBottomAndroid,
  };

function y(t, n, o) {
  if ('android' === module12.Platform.OS) return n && t.index < n.index ? b : O;
  else return o ? p : module1081;
}

var S = {
  defaultTransitionConfig: y,
  getTransitionConfig: function (t, n, o, c) {
    var s = y(n, o, c);
    return t ? u(u({}, s), t(n, o, c)) : s;
  },
  SlideFromRightIOS: module1081,
  ModalSlideFromBottomIOS: p,
  FadeInFromBottomAndroid: O,
  FadeOutToBottomAndroid: b,
};
exports.default = S;
