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
    var o = h(n);
    if (o && o.has(t)) return o.get(t);
    var u = {},
      l = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var c in t)
      if ('default' !== c && Object.prototype.hasOwnProperty.call(t, c)) {
        var f = l ? Object.getOwnPropertyDescriptor(t, c) : null;
        if (f && (f.get || f.set)) Object.defineProperty(u, c, f);
        else u[c] = t[c];
      }

    u.default = t;
    if (o) o.set(t, u);
    return u;
  })(require('react')),
  module12 = require('./12'),
  module506 = require('./506');

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

var R = (function (t) {
  module7.default(v, t);

  var module506 = v,
    h = y(),
    R = function () {
      var t,
        n = module11.default(module506);

      if (h) {
        var o = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function v(t) {
    var o;
    module4.default(this, v);
    (o = R.call(this, t)).state = {};
    return o;
  }

  module5.default(v, [
    {
      key: 'render',
      value: function () {
        this.context.theme;
        var t = this.props.value;
        return React.default.createElement(
          module12.View,
          {
            style: [b.container, this.props.style],
          },
          React.default.createElement(
            module12.View,
            {
              style: [
                b.trackContainer,
                {
                  backgroundColor: this.props.maximumTrackTintColor,
                },
              ],
            },
            React.default.createElement(module12.View, {
              style: [
                b.track,
                {
                  flex: globals.isRTL ? 0 : t,
                  backgroundColor: this.props.minimumTrackTintColor,
                },
              ],
            }),
            React.default.createElement(module12.View, {
              style: [
                globals.isRTL ? b.boderRadiusLeft : b.boderRadiusRight,
                {
                  flex: 1 - t,
                },
              ],
            }),
            React.default.createElement(module12.View, {
              style: [
                b.track,
                {
                  flex: globals.isRTL ? t : 0,
                  backgroundColor: this.props.minimumTrackTintColor,
                },
              ],
            })
          )
        );
      },
    },
  ]);
  return v;
})(React.Component);

exports.default = R;
R.contextType = module506.AppConfigContext;
var b = module12.StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    flexDirection: 'row',
  },
  trackContainer: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    flexDirection: 'row',
  },
  track: {
    height: 4,
    borderRadius: 2,
  },
  boderRadiusLeft: {
    height: 4,
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
  },
  boderRadiusRight: {
    height: 4,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
  },
});
