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
    var o = y(n);
    if (o && o.has(t)) return o.get(t);
    var u = {},
      f = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var c in t)
      if ('default' !== c && Object.prototype.hasOwnProperty.call(t, c)) {
        var l = f ? Object.getOwnPropertyDescriptor(t, c) : null;
        if (l && (l.get || l.set)) Object.defineProperty(u, c, l);
        else u[c] = t[c];
      }

    u.default = t;
    if (o) o.set(t, u);
    return u;
  })(require('react')),
  module12 = require('./12'),
  module381 = require('./381'),
  module506 = require('./506');

function y(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (y = function (t) {
    return t ? o : n;
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

var module491 = require('./491').strings,
  P = (function (t) {
    module7.default(w, t);

    var module506 = w,
      y = v(),
      P = function () {
        var t,
          n = module11.default(module506);

        if (y) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function w(t) {
      module4.default(this, w);
      return P.call(this, t);
    }

    module5.default(w, [
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.context.theme,
            o = {
              width: 32,
              height: 32,
              overflow: 'hidden',
              resizeMode: 'contain',
              marginRight: 8,
              marginLeft: 8,
            };
          return React.default.createElement(
            module12.View,
            {
              style: o,
            },
            React.default.createElement(module381.PureImageButton, {
              onPress: function () {
                if (t.props.onPress) t.props.onPress();
              },
              enabled: this.props.enabled,
              imageWidth: 32,
              imageHeight: 32,
              image: n.navSettingIcon,
              funcId: 'home_setting_button',
              accessibilityLabel: module491.accessibility_setting,
            }),
            this.props.hasBadge &&
              React.default.createElement(module12.View, {
                style: [
                  {
                    position: 'absolute',
                    width: 8,
                    height: 8,
                    resizeMode: 'contain',
                    borderRadius: 4,
                    backgroundColor: 'red',
                  },
                  globals.isRTL
                    ? {
                        left: 0,
                      }
                    : {
                        right: 0,
                      },
                ],
              })
          );
        },
      },
    ]);
    return w;
  })(React.default.Component);

exports.default = P;
P.contextType = module506.AppConfigContext;
P.defaultProps = {
  enabled: true,
  hasBadge: false,
  onPress: function () {},
};
