var module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = (function (t, n) {
    if (!n && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var o = p(n);
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
  module12 = require('./12');

function p(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (p = function (t) {
    return t ? o : n;
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
  module7.default(b, t);

  var p = b,
    h = y(),
    w = function () {
      var t,
        n = module11.default(p);

      if (h) {
        var o = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function b(t) {
    var o;
    module4.default(this, b);
    (o = w.call(this, t)).state = {};
    return o;
  }

  module5.default(b, [
    {
      key: 'UNSAFE_componentWillMount',
      value: function () {},
    },
    {
      key: 'render',
      value: function () {
        var t = this.props,
          n = t.value,
          o = t.style;
        return React.default.createElement(
          module12.View,
          {
            style: [v.containter, o],
          },
          React.default.createElement(
            module12.View,
            {
              style: v.battery,
            },
            React.default.createElement(module12.View, {
              style: [
                v.inner,
                {
                  width: (22 * n) / 100,
                },
              ],
            }),
            React.default.createElement(module12.View, {
              style: v.dot,
            })
          ),
          React.default.createElement(
            module12.Text,
            {
              style: v.percent,
            },
            n,
            '%'
          )
        );
      },
    },
  ]);
  return b;
})(React.Component);

exports.default = h;
h.defaultProps = {
  value: 50,
};
var v = module12.StyleSheet.create({
  containter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  battery: {
    width: 26,
    height: 12,
    padding: 1,
    borderWidth: 1,
    justifyContent: 'center',
    borderColor: 'white',
    borderRadius: 2,
  },
  inner: {
    flex: 1,
    backgroundColor: 'white',
  },
  percent: {
    marginLeft: 10,
    fontSize: 12,
    color: 'white',
  },
  dot: {
    position: 'absolute',
    right: -3,
    width: 3,
    height: 3,
    borderRadius: 1,
    backgroundColor: 'white',
  },
});
