var module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  module1950 = require('./1950'),
  React = (function (t, n) {
    if (!n && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var o = v(n);
    if (o && o.has(t)) return o.get(t);
    var u = {},
      l = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var f in t)
      if ('default' !== f && Object.prototype.hasOwnProperty.call(t, f)) {
        var c = l ? Object.getOwnPropertyDescriptor(t, f) : null;
        if (c && (c.get || c.set)) Object.defineProperty(u, f, c);
        else u[f] = t[f];
      }

    u.default = t;
    if (o) o.set(t, u);
    return u;
  })(require('react')),
  module12 = require('./12'),
  PropTypes = require('prop-types');

function v(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (v = function (t) {
    return t ? o : n;
  })(t);
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

var b = (function (t) {
  module7.default(P, t);

  var PropTypes = P,
    v = h(),
    b = function () {
      var t,
        n = module11.default(PropTypes);

      if (v) {
        var o = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function P(t) {
    var o;
    module4.default(this, P);
    (o = b.call(this, t)).state = o.props;
    return o;
  }

  module5.default(P, [
    {
      key: 'setNativeProps',
      value: function (t) {
        this.setState(t);
      },
    },
    {
      key: 'UNSAFE_componentWillReceiveProps',
      value: function (t) {
        if (t.color !== this.props.color)
          this.setState({
            color: t.color,
          });
      },
    },
    {
      key: 'render',
      value: function () {
        var t = this.state,
          n = t.start,
          o = t.end,
          u = t.color;
        if (module1950.isEquals(n, o)) return null;
        var l = module1950.getTransform(n, o),
          f = l.d,
          y = l.a + 'rad',
          v = l.x,
          h = l.y;

        if (module12.I18nManager.isRTL) {
          y = -1 * l.a + 'rad';
          v *= -1;
        }

        return React.default.createElement(module12.View, {
          ref: 'line',
          style: [
            O.line,
            {
              backgroundColor: u,
              left: n.x,
              top: n.y,
              width: f,
            },
            {
              transform: [
                {
                  translateX: v,
                },
                {
                  translateY: h,
                },
                {
                  rotateZ: y,
                },
              ],
            },
          ],
        });
      },
    },
  ]);
  return P;
})(React.Component);

exports.default = b;
b.propTypes = {
  color: PropTypes.default.string,
  start: PropTypes.default.shape({
    x: PropTypes.default.number,
    y: PropTypes.default.number,
  }),
  end: PropTypes.default.shape({
    x: PropTypes.default.number,
    y: PropTypes.default.number,
  }),
};
b.defaultProps = {
  color: '#8E91A8',
  start: {
    x: 0,
    y: 0,
  },
  end: {
    x: 0,
    y: 0,
  },
};
var O = module12.StyleSheet.create({
  line: {
    position: 'absolute',
    height: 1,
  },
});
module.exports = b;
