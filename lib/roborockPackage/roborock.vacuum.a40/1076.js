var module12 = require('./12'),
  module1077 = require('./1077');

function u(t) {
  return !t || null !== t.descriptor.options.header;
}

var s = function (t, n, o, s) {
  return {
    inputRange: [n, n + 0.001, o - 0.9, o - 0.2, o, s - 0.001, s],
    outputRange: [0, u(t[n]) ? 0 : 1, u(t[n]) ? 0 : 1, u(t[n]) ? 0.3 : 1, u(t[o]) ? 1 : 0, u(t[s]) ? 0 : 1, 0],
  };
};

function f(t) {
  return !t[t.length - 1].isActive;
}

var p = module12.Dimensions.get('window').width / 2 - 70 - 25;
var c = module12.Dimensions.get('window').width / 2 - 70 + 25;
var l = module12.Dimensions.get('window').width;
var v = {
  forLayout: function (t) {
    var s = t.layout,
      p = t.position,
      c = t.scene,
      l = t.scenes;
    if ('float' !== t.mode) return {};
    var v = f(l),
      R = module1077.default(t);
    if (!R) return {};
    var y = R.first,
      w = R.last,
      h = c.index,
      L = s.initWidth || module12.Dimensions.get('window').width;
    if ((v && !u(l[h]) && !u(l[w])) || (!v && !u(l[y]) && !u(l[h])))
      return {
        transform: [
          {
            translateX: L,
          },
        ],
      };
    var x = module12.I18nManager.isRTL ? -1 : 1;
    return {
      transform: [
        {
          translateX: p.interpolate({
            inputRange: [y, h, w],
            outputRange: [x * (u(l[y]) ? 0 : L), x * (u(l[h]) ? 0 : v ? L : -L), x * (u(l[w]) ? 0 : -L)],
          }),
        },
      ],
    };
  },
  forLeft: function (t) {
    var n = t.position,
      u = t.scene,
      f = t.scenes,
      p = module1077.default(t);
    if (!p)
      return {
        opacity: 0,
      };
    var c = p.first,
      l = p.last,
      v = u.index;
    return {
      opacity: n.interpolate(s(f, c, v, l)),
    };
  },
  forLeftButton: function (t) {
    var n = t.position,
      s = t.scene,
      f = t.scenes,
      p = module1077.default(t);
    if (!p)
      return {
        opacity: 0,
      };
    var c = p.first,
      l = p.last,
      v = s.index,
      R = [c, c + 0.001, c + Math.abs(v - c) / 2, v, l - Math.abs(l - v) / 2, l - 0.001, l],
      y = [0, u(f[c]) ? 0 : 1, u(f[c]) ? 0.1 : 1, u(f[v]) ? 1 : 0, u(f[l]) ? 0.1 : 1, u(f[l]) ? 0 : 1, 0];
    return {
      opacity: n.interpolate({
        inputRange: R,
        outputRange: y,
      }),
    };
  },
  forLeftLabel: function (t) {
    var s = t.position,
      f = t.scene,
      c = t.scenes,
      l = module1077.default(t);
    if (!l)
      return {
        opacity: 0,
      };
    var v = l.first,
      R = l.last,
      y = f.index,
      w = p;
    return {
      opacity: s.interpolate({
        inputRange: [v, v + 0.001, y - 0.35, y, y + 0.5, R - 0.001, R],
        outputRange: [0, u(c[v]) ? 0 : 1, u(c[v]) ? 0 : 1, u(c[y]) ? 1 : 0, u(c[R]) ? 0.5 : 1, u(c[R]) ? 0 : 1, 0],
      }),
      transform: [
        {
          translateX: s.interpolate({
            inputRange: [v, v + 0.001, y, R - 0.001, R],
            outputRange: module12.I18nManager.isRTL ? [1.5 * -w, u(c[v]) ? 1.5 * -w : 0, 0, u(c[R]) ? w : 0, w] : [w, u(c[v]) ? w : 0, 0, u(c[R]) ? 1.5 * -w : 0, 1.5 * -w],
          }),
        },
      ],
    };
  },
  forCenterFromLeft: function (t) {
    var s = t.position,
      f = t.scene,
      p = t.scenes,
      l = module1077.default(t);
    if (!l)
      return {
        opacity: 0,
      };
    var v = l.first,
      R = l.last,
      y = f.index,
      w = c;
    return {
      opacity: s.interpolate({
        inputRange: [v, v + 0.001, y - 0.5, y, y + 0.7, R - 0.001, R],
        outputRange: [0, u(p[v]) ? 0 : 1, u(p[v]) ? 0 : 1, u(p[y]) ? 1 : 0, u(p[R]) ? 0 : 1, u(p[R]) ? 0 : 1, 0],
      }),
      transform: [
        {
          translateX: s.interpolate({
            inputRange: [v, v + 0.001, y, R - 0.001, R],
            outputRange: module12.I18nManager.isRTL ? [-w, u(p[v]) ? -w : 0, 0, u(p[R]) ? w : 0, w] : [w, u(p[v]) ? w : 0, 0, u(p[R]) ? -w : 0, -w],
          }),
        },
      ],
    };
  },
  forCenter: function (t) {
    var n = t.position,
      u = t.scene,
      f = t.scenes,
      p = module1077.default(t);
    if (!p)
      return {
        opacity: 0,
      };
    var c = p.first,
      l = p.last,
      v = u.index;
    return {
      opacity: n.interpolate(s(f, c, v, l)),
    };
  },
  forRight: function (t) {
    var n = t.position,
      u = t.scene,
      f = t.scenes,
      p = module1077.default(t);
    if (!p)
      return {
        opacity: 0,
      };
    var c = p.first,
      l = p.last,
      v = u.index;
    return {
      opacity: n.interpolate(s(f, c, v, l)),
    };
  },
  forBackground: function () {
    return null;
  },
  forBackgroundWithTranslation: function (t) {
    var u = t.position,
      s = t.scene,
      f = module1077.default(t);
    if (!f)
      return {
        opacity: 0,
      };
    var p = f.first,
      c = f.last,
      v = s.index,
      R = [l, 0, -l];
    return {
      transform: [
        {
          translateX: u.interpolate({
            inputRange: [p, v, c],
            outputRange: module12.I18nManager.isRTL ? R.reverse() : R,
          }),
        },
      ],
    };
  },
};
exports.default = v;
