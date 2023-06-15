var module50 = require('./50'),
  module4 = require('./4'),
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
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (t) {
    return false;
  }
}

var v = module12.ART.Transform,
  O = module12.ART.Shape,
  R = null;
if ('ios' === module12.Platform.OS)
  module12.UIManager.RRShapeNew ? (R = module12.requireNativeComponent('RRShapeNew', P)) : module12.UIManager.RRShape && (R = module12.requireNativeComponent('RRShape', P));
var b = new v();

function k(t) {
  var n = null != t.scaleX ? t.scaleX : null != t.scale ? t.scale : 1,
    o = null != t.scaleY ? t.scaleY : null != t.scale ? t.scale : 1;
  b.transformTo(1, 0, 0, 1, 0, 0)
    .move(t.x || 0, t.y || 0)
    .rotate(t.rotation || 0, t.originX, t.originY)
    .scale(n, o, t.originX, t.originY);
  if (null != t.transform) b.transform(t.transform);
  return [b.xx, b.yx, b.xy, b.yy, b.x, b.y];
}

function j(t) {
  return false === t.visible ? 0 : null == t.opacity ? 1 : +t.opacity;
}

function w(t) {
  switch (t) {
    case 'butt':
      return 0;

    case 'square':
      return 2;

    default:
      return 1;
  }
}

function S(t) {
  switch (t) {
    case 'miter':
      return 0;

    case 'bevel':
      return 2;

    default:
      return 1;
  }
}

var P = (function (t) {
  module7.default(v, t);

  var module50 = v,
    module12 = h(),
    y = function () {
      var t,
        o = module11.default(module50);

      if (module12) {
        var c = module11.default(this).constructor;
        t = Reflect.construct(o, arguments, c);
      } else t = o.apply(this, arguments);

      return module9.default(this, t);
    };

  function v() {
    module4.default(this, v);
    return y.apply(this, arguments);
  }

  module5.default(v, [
    {
      key: 'render',
      value: function () {
        var t,
          n,
          o,
          c = this.props,
          u = (c.d || ((t = c.children) ? ('string' == typeof t ? t : t.length ? t.join('\n') : '') : '')).toJSON();
        return React.default.createElement(R, {
          opacity: j(c),
          stroke: c.stroke,
          strokeCap: w(c.strokeCap),
          strokeDash: c.strokeDash || null,
          strokeJoin: S(c.strokeJoin),
          strokeWidth: ((n = c.strokeWidth), (o = 1), null == n ? o : +n),
          transform: k(c),
          d: u,
          strokeOverlay: c.strokeOverlay || false,
        });
      },
    },
  ]);
  return v;
})(React.default.Component);

P.propTypes = (function (t) {
  for (var o = 1; o < arguments.length; o++) {
    var c = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      y(Object(c), true).forEach(function (o) {
        module50.default(t, o, c[o]);
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
  RRShape: R ? P : O,
  isRRShape: !!R,
};
