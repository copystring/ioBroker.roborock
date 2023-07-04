var module50 = require('./50'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13');

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

var v = module13.ART.Transform,
  O = module13.ART.Shape,
  R = null;
if ('ios' === module13.Platform.OS)
  module13.UIManager.RRShapeNew ? (R = module13.requireNativeComponent('RRShapeNew', P)) : module13.UIManager.RRShape && (R = module13.requireNativeComponent('RRShape', P));
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
  module9.default(v, t);

  var module50 = v,
    module13 = h(),
    y = function () {
      var t,
        o = module12.default(module50);

      if (module13) {
        var c = module12.default(this).constructor;
        t = Reflect.construct(o, arguments, c);
      } else t = o.apply(this, arguments);

      return module11.default(this, t);
    };

  function v() {
    module6.default(this, v);
    return y.apply(this, arguments);
  }

  module7.default(v, [
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
})({}, module13.ViewPropTypes);

module.exports = {
  RRShape: R ? P : O,
  isRRShape: !!R,
};
