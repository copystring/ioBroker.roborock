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
    var u = p(n);
    if (u && u.has(t)) return u.get(t);
    var o = {},
      f = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var l in t)
      if ('default' !== l && Object.prototype.hasOwnProperty.call(t, l)) {
        var c = f ? Object.getOwnPropertyDescriptor(t, l) : null;
        if (c && (c.get || c.set)) Object.defineProperty(o, l, c);
        else o[l] = t[l];
      }

    o.default = t;
    if (u) u.set(t, o);
    return o;
  })(require('react')),
  module12 = require('./12');

function p(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    u = new WeakMap();
  return (p = function (t) {
    return t ? u : n;
  })(t);
}

function v() {
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

var module936 = require('./936'),
  h = (function (t) {
    module7.default(b, t);

    var p = b,
      module936 = v(),
      h = function () {
        var t,
          n = module11.default(p);

        if (module936) {
          var u = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, u);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function b(t) {
      var u;
      module4.default(this, b);
      (u = h.call(this, t)).state = {
        visible: false,
      };
      return u;
    }

    module5.default(b, [
      {
        key: 'render',
        value: function () {
          return this.state.visible
            ? React.default.createElement(module12.View, {
                style: w.container,
              })
            : React.default.createElement(module12.View, null);
        },
      },
      {
        key: 'show',
        value: function () {
          this.setState({
            visible: true,
          });
        },
      },
      {
        key: 'dismiss',
        value: function () {
          this.setState({
            visible: false,
          });
        },
      },
    ]);
    return b;
  })(React.default.PureComponent);

exports.default = h;
var w = module12.StyleSheet.create({
  container: {
    width: module12.Dimensions.get('window').width,
    height: 44 + module936.StatusBarHeight + module936.AppBarMarginTop,
    backgroundColor: 'white',
  },
});
