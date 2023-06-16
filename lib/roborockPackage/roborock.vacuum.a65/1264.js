var module13 = require('./13'),
  module1261 = require('./1261');

function u(t) {
  var n = t.navigation,
    o = t.scene,
    u = n.state.index === o.index,
    p = u ? 0 : 1e6;
  return {
    opacity: u ? 1 : 0,
    transform: [
      {
        translateX: p,
      },
      {
        translateY: p,
      },
    ],
  };
}

var p = {
  forHorizontal: function (t) {
    var p = t.layout,
      l = t.position,
      s = t.scene;
    if (!p.isMeasured) return u(t);
    var f = module1261.default(t);
    if (!f)
      return {
        opacity: 0,
      };
    var c = f.first,
      v = f.last,
      R = s.index,
      y = l.interpolate({
        inputRange: [c, c + 0.01, R, v - 0.01, v],
        outputRange: [0, 1, 1, 0.85, 0],
        extrapolate: 'clamp',
      }),
      x = p.initWidth;
    return {
      opacity: y,
      transform: [
        {
          translateX: l.interpolate({
            inputRange: [c, R, v],
            outputRange: module13.I18nManager.isRTL ? [-x, 0, 0.3 * x] : [x, 0, -0.3 * x],
            extrapolate: 'clamp',
          }),
        },
        {
          translateY: 0,
        },
      ],
    };
  },
  forVertical: function (t) {
    var n = t.layout,
      p = t.position,
      l = t.scene;
    if (!n.isMeasured) return u(t);
    var s = module1261.default(t);
    if (!s)
      return {
        opacity: 0,
      };
    var f = s.first,
      c = s.last,
      v = l.index,
      R = p.interpolate({
        inputRange: [f, f + 0.01, v, c - 0.01, c],
        outputRange: [0, 1, 1, 0.85, 0],
        extrapolate: 'clamp',
      }),
      y = n.initHeight;
    return {
      opacity: R,
      transform: [
        {
          translateX: 0,
        },
        {
          translateY: p.interpolate({
            inputRange: [f, v, c],
            outputRange: [y, 0, 0],
            extrapolate: 'clamp',
          }),
        },
      ],
    };
  },
  forFadeFromBottomAndroid: function (t) {
    var n = t.layout,
      p = t.position,
      l = t.scene;
    if (!n.isMeasured) return u(t);
    var s = module1261.default(t);
    if (!s)
      return {
        opacity: 0,
      };
    var f = s.first,
      c = s.last,
      v = [f, l.index, c - 0.01, c];
    return {
      opacity: p.interpolate({
        inputRange: v,
        outputRange: [0, 1, 1, 0],
        extrapolate: 'clamp',
      }),
      transform: [
        {
          translateX: 0,
        },
        {
          translateY: p.interpolate({
            inputRange: v,
            outputRange: [50, 0, 0, 0],
            extrapolate: 'clamp',
          }),
        },
      ],
    };
  },
  forFade: function (t) {
    var n = t.layout,
      p = t.position,
      l = t.scene;
    if (!n.isMeasured) return u(t);
    var s = module1261.default(t);
    if (!s)
      return {
        opacity: 0,
      };
    var f = s.first,
      c = s.last,
      v = l.index;
    return {
      opacity: p.interpolate({
        inputRange: [f, v, c],
        outputRange: [0, 1, 1],
        extrapolate: 'clamp',
      }),
    };
  },
};
exports.default = p;
