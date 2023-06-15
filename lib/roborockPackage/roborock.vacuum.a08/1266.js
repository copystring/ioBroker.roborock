var module49 = require('./49'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12');

function y(t, n) {
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

function h() {
  if ('undefined' == typeof Reflect || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if ('function' == typeof Proxy) return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (t) {
    return false;
  }
}

var O = module12.ART.Transform,
  v = module12.ART.Shape,
  b = null;
if (module12.UIManager.RRShape && 'ios' === module12.Platform.OS) b = module12.requireNativeComponent('RRShape', S);
var R = new O();

function k(t) {
  var n = null != t.scaleX ? t.scaleX : null != t.scale ? t.scale : 1,
    o = null != t.scaleY ? t.scaleY : null != t.scale ? t.scale : 1;
  R.transformTo(1, 0, 0, 1, 0, 0)
    .move(t.x || 0, t.y || 0)
    .rotate(t.rotation || 0, t.originX, t.originY)
    .scale(n, o, t.originX, t.originY);
  if (null != t.transform) R.transform(t.transform);
  return [R.xx, R.yx, R.xy, R.yy, R.x, R.y];
}

function j(t) {
  return false === t.visible ? 0 : null == t.opacity ? 1 : +t.opacity;
}

function P(t) {
  switch (t) {
    case 'butt':
      return 0;

    case 'square':
      return 2;

    default:
      return 1;
  }
}

function w(t) {
  switch (t) {
    case 'miter':
      return 0;

    case 'bevel':
      return 2;

    default:
      return 1;
  }
}

var S = (function (t) {
  module7.default(O, t);

  var module49 = O,
    module12 = h(),
    y = function () {
      var t,
        o = module11.default(module49);

      if (module12) {
        var c = module11.default(this).constructor;
        t = Reflect.construct(o, arguments, c);
      } else t = o.apply(this, arguments);

      return module9.default(this, t);
    };

  function O() {
    module4.default(this, O);
    return y.apply(this, arguments);
  }

  module5.default(O, [
    {
      key: 'render',
      value: function () {
        var t,
          n,
          o,
          c = this.props,
          u = (c.d || ((t = c.children) ? ('string' == typeof t ? t : t.length ? t.join('\n') : '') : '')).toJSON();
        return React.default.createElement(b, {
          opacity: j(c),
          stroke: c.stroke,
          strokeCap: P(c.strokeCap),
          strokeDash: c.strokeDash || null,
          strokeJoin: w(c.strokeJoin),
          strokeWidth: ((n = c.strokeWidth), (o = 1), null == n ? o : +n),
          transform: k(c),
          d: u,
          strokeOverlay: c.strokeOverlay || false,
        });
      },
    },
  ]);
  return O;
})(React.default.Component);

S.propTypes = (function (t) {
  for (var o = 1; o < arguments.length; o++) {
    var c = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      y(Object(c), true).forEach(function (o) {
        module49.default(t, o, c[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(c));
    else
      y(Object(c)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(c, n));
      });
  }

  return t;
})({}, module12.ViewPropTypes);

module.exports = {
  RRShape: b ? S : v,
  isRRShape: !!b,
};
