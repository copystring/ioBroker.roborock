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
      f = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var l in t)
      if ('default' !== l && Object.prototype.hasOwnProperty.call(t, l)) {
        var c = f ? Object.getOwnPropertyDescriptor(t, l) : null;
        if (c && (c.get || c.set)) Object.defineProperty(u, l, c);
        else u[l] = t[l];
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

require('./491').strings;

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
        var t = this.props.progress ** 1;
        return React.default.createElement(
          module12.View,
          {
            style: [v.wrap, this.props.style],
          },
          React.default.createElement(module12.View, {
            style: [
              v.progressView,
              {
                width: 68 * t,
              },
            ],
          })
        );
      },
    },
  ]);
  return b;
})(React.Component);

exports.default = h;
var v = module12.StyleSheet.create({
  wrap: {
    height: 8,
    width: 68,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  progressView: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 8,
    backgroundColor: '#007AFF',
  },
});
