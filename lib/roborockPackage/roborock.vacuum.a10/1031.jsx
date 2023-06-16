exports.default = function (t) {
  var v = module12.Dimensions.get('window'),
    O = v.width,
    b = v.height,
    j = (function (p, ...args) {
      module7.default(P, p);

      var v = P,
        j = y(),
        D = function () {
          var t,
            n = module11.default(v);

          if (j) {
            var o = module11.default(this).constructor;
            t = Reflect.construct(n, arguments, o);
          } else t = n.apply(this, arguments);

          return module9.default(this, t);
        };

      function P() {
        var t;
        module4.default(this, P);
        (t = D.call(this, ...args)).state = {
          dimensions: {
            width: O,
            height: b,
          },
          isLandscape: w({
            width: O,
            height: b,
          }),
        };

        t.handleOrientationChange = function (n) {
          var o = n.window,
            u = w(o);
          t.setState({
            isLandscape: u,
          });
        };

        return t;
      }

      module5.default(P, [
        {
          key: 'componentDidMount',
          value: function () {
            module12.Dimensions.addEventListener('change', this.handleOrientationChange);
          },
        },
        {
          key: 'componentWillUnmount',
          value: function () {
            module12.Dimensions.removeEventListener('change', this.handleOrientationChange);
          },
        },
        {
          key: 'render',
          value: function () {
            return <t />;
          },
        },
      ]);
      return P;
    })(React.Component);

  j.displayName = 'withDimensions(' + t.displayName + ')';
  return module1032.default(j, t);
};

var module21 = require('./21'),
  module4 = require('./4'),
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
    var o = v(n);
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
  module12 = require('./12'),
  module1032 = require('./1032');

function v(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (v = function (t) {
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

var w = function (t) {
  return t.width > t.height;
};

exports.isOrientationLandscape = w;
