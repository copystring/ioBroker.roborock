var module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module385 = require('./385'),
  module1199 = require('./1199');

function v() {
  if ('undefined' == typeof Reflect || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if ('function' == typeof Proxy) return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (t) {
    return false;
  }
}

var module510 = require('./510').strings,
  P = (function (t) {
    module9.default(R, t);

    var n = R,
      module1199 = v(),
      P = function () {
        var t,
          o = module12.default(n);

        if (module1199) {
          var s = module12.default(this).constructor;
          t = Reflect.construct(o, arguments, s);
        } else t = o.apply(this, arguments);

        return module11.default(this, t);
      };

    function R(t) {
      module6.default(this, R);
      return P.call(this, t);
    }

    module7.default(R, [
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
            module13.View,
            {
              style: o,
            },
            React.default.createElement(module385.PureImageButton, {
              onPress: function () {
                if (t.props.onPress) t.props.onPress();
              },
              enabled: this.props.enabled,
              imageWidth: 32,
              imageHeight: 32,
              image: n.navSettingIcon,
              funcId: 'home_setting_button',
              accessibilityLabel: module510.accessibility_setting,
            }),
            this.props.hasBadge &&
              React.default.createElement(module13.View, {
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
    return R;
  })(React.default.Component);

exports.default = P;
P.contextType = module1199.AppConfigContext;
P.defaultProps = {
  enabled: true,
  hasBadge: false,
  onPress: function () {},
};
