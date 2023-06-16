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
      c = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var f in t)
      if ('default' !== f && Object.prototype.hasOwnProperty.call(t, f)) {
        var l = c ? Object.getOwnPropertyDescriptor(t, f) : null;
        if (l && (l.get || l.set)) Object.defineProperty(u, f, l);
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

var w = (function (t) {
  module7.default(V, t);

  var p = V,
    w = y(),
    h = function () {
      var t,
        n = module11.default(p);

      if (w) {
        var o = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function V(t) {
    module4.default(this, V);
    return h.call(this, t);
  }

  module5.default(V, [
    {
      key: 'getViewDatas',
      value: function () {
        return [
          {
            View: 1,
          },
          {
            View: 2,
          },
          {
            View: 3,
          },
          {
            View: 4,
          },
          {
            View: 5,
          },
          {
            View: 6,
          },
          {
            View: 7,
          },
          {
            View: 8,
          },
        ];
      },
    },
    {
      key: 'render',
      value: function () {
        var t = this.props,
          n = t.volume,
          o = t.isCalling,
          u = this.getViewDatas(),
          c = u.map(function (t, c) {
            var f = o ? (c >= u.length - n ? 1 : 0.3) : c + 1 <= n ? 1 : 0.3;
            return React.default.createElement(module12.View, {
              style: [
                v.modeView,
                {
                  opacity: f,
                },
              ],
            });
          });
        return React.default.createElement(
          module12.View,
          {
            style: v.container,
          },
          c
        );
      },
    },
    {
      key: 'componentDidMount',
      value: function () {},
    },
    {
      key: 'componentWillUnmount',
      value: function () {},
    },
  ]);
  return V;
})(React.Component);

exports.default = w;
var v = module12.StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    height: 12,
    width: 45,
  },
  modeView: {
    height: 12,
    width: 3,
    borderRadius: 2,
    backgroundColor: '#FFFFFF',
  },
});
