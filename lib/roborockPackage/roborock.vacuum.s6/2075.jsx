exports.default = function (t) {
  var h = (function (v) {
    module7.default(L, v);

    var h = L,
      w = y(),
      D = function () {
        var t,
          n = module11.default(h);

        if (w) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function L() {
      var t;
      module4.default(this, L);

      (t = D.call(this)).handleOrientationChange = function (n) {
        var o = n.window,
          u = O(o);
        t.setState({
          isLandscape: u,
        });
      };

      var n = O(module12.Dimensions.get('window'));
      t.state = {
        isLandscape: n,
      };
      return t;
    }

    module5.default(L, [
      {
        key: 'componentDidMount',
        value: function () {
          if ('function' == typeof module12.Dimensions.addEventListener) module12.Dimensions.addEventListener('change', this.handleOrientationChange);
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          if ('function' == typeof module12.Dimensions.removeEventListener) module12.Dimensions.removeEventListener('change', this.handleOrientationChange);
        },
      },
      {
        key: 'render',
        value: function () {
          return <t />;
        },
      },
    ]);
    return L;
  })(React.Component);

  return module1034.default(h, t);
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
    var o = h(n);
    if (o && o.has(t)) return o.get(t);
    var u = {},
      f = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var c in t)
      if ('default' !== c && Object.prototype.hasOwnProperty.call(t, c)) {
        var s = f ? Object.getOwnPropertyDescriptor(t, c) : null;
        if (s && (s.get || s.set)) Object.defineProperty(u, c, s);
        else u[c] = t[c];
      }

    u.default = t;
    if (o) o.set(t, u);
    return u;
  })(require('react')),
  module12 = require('./12'),
  module1034 = require('./1034');

function h(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (h = function (t) {
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

var O = function (t) {
  return t.width > t.height;
};

exports.isOrientationLandscape = O;
