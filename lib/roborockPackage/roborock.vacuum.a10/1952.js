var module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = (function (t, o) {
    if (!o && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var n = b(o);
    if (n && n.has(t)) return n.get(t);
    var u = {},
      l = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var f in t)
      if ('default' !== f && Object.prototype.hasOwnProperty.call(t, f)) {
        var c = l ? Object.getOwnPropertyDescriptor(t, f) : null;
        if (c && (c.get || c.set)) Object.defineProperty(u, f, c);
        else u[f] = t[f];
      }

    u.default = t;
    if (n) n.set(t, u);
    return u;
  })(require('react')),
  module12 = require('./12'),
  PropTypes = require('prop-types');

function b(t) {
  if ('function' != typeof WeakMap) return null;
  var o = new WeakMap(),
    n = new WeakMap();
  return (b = function (t) {
    return t ? n : o;
  })(t);
}

function y() {
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

var h = (function (t) {
  module7.default(C, t);

  var PropTypes = C,
    b = y(),
    h = function () {
      var t,
        o = module11.default(PropTypes);

      if (b) {
        var n = module11.default(this).constructor;
        t = Reflect.construct(o, arguments, n);
      } else t = o.apply(this, arguments);

      return module9.default(this, t);
    };

  function C(t) {
    module4.default(this, C);
    return h.call(this, t);
  }

  module5.default(C, [
    {
      key: 'render',
      value: function () {
        var t = this.props,
          o = t.color,
          n = t.normalColor,
          u = t.fill,
          l = t.x,
          f = t.y,
          p = t.r,
          b = t.inner,
          y = t.outer;
        return React.default.createElement(
          module12.View,
          {
            pointerEvents: 'box-none',
            style: [
              v.outer,
              {
                left: l - p,
                top: f - p,
                width: 2 * p,
                height: 2 * p,
                borderRadius: p,
              },
              {
                borderColor: n,
                backgroundColor: y ? 'rgba(0, 122, 255, 0.2)' : 'transparent',
              },
              u && {
                borderColor: 'rgba(0, 122, 255, 0.2)',
              },
              !y && {
                borderWidth: 0,
              },
            ],
          },
          b &&
            React.default.createElement(module12.View, {
              pointerEvents: 'box-none',
              style: [
                !y && v.inner,
                {
                  width: 0.5 * p,
                  height: 0.5 * p,
                  borderRadius: 0.25 * p,
                },
                u && {
                  backgroundColor: o,
                },
              ],
            })
        );
      },
    },
  ]);
  return C;
})(React.Component);

exports.default = h;
h.propTypes = {
  color: PropTypes.default.string,
  fill: PropTypes.default.bool,
  x: PropTypes.default.number,
  y: PropTypes.default.number,
  r: PropTypes.default.number,
  inner: PropTypes.default.bool,
  outer: PropTypes.default.bool,
};
h.defaultProps = {
  inner: true,
  outer: true,
};
var v = module12.StyleSheet.create({
  outer: {
    position: 'absolute',
    borderColor: '#CFCFCF',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    backgroundColor: '#CFCFCF',
  },
});
module.exports = h;
