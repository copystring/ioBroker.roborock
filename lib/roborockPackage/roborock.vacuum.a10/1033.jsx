var module21 = require('./21'),
  module55 = require('@babel/runtime/helpers/defineEnumerableProperties'),
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
    var l = O(n);
    if (l && l.has(t)) return l.get(t);
    var o = {},
      u = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var f in t)
      if ('default' !== f && Object.prototype.hasOwnProperty.call(t, f)) {
        var c = u ? Object.getOwnPropertyDescriptor(t, f) : null;
        if (c && (c.get || c.set)) Object.defineProperty(o, f, c);
        else o[f] = t[f];
      }

    o.default = t;
    if (l) l.set(t, o);
    return o;
  })(require('react')),
  module12 = require('./12'),
  module970 = require('./970'),
  h = ['isVisible'],
  b = ['isVisible', 'children', 'style'];

function O(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    l = new WeakMap();
  return (O = function (t) {
    return t ? l : n;
  })(t);
}

function w() {
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

var P = (function (t) {
  module7.default(_, t);

  var O = _,
    P = w(),
    V = function () {
      var t,
        n = module11.default(O);

      if (P) {
        var l = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, l);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function _() {
    module4.default(this, _);
    return V.apply(this, arguments);
  }

  module5.default(_, [
    {
      key: 'render',
      value: function () {
        if (module970.screensEnabled()) {
          var t = this.props,
            o = t.isVisible,
            u = module55.default(t, h);
          return <module970.Screen />;
        }

        var f = this.props,
          c = f.isVisible,
          s = f.children,
          O = f.style,
          w = module55.default(f, b);
        return (
          <module12.View>
            <module12.View style={c ? j.attached : j.detached}>{s}</module12.View>
          </module12.View>
        );
      },
    },
  ]);
  return _;
})(React.Component);

exports.default = P;
var j = module12.StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  attached: {
    flex: 1,
  },
  detached: {
    flex: 1,
    top: 3e3,
  },
});
