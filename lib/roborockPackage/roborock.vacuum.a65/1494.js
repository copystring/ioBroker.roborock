var module22 = require('./22'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  PropTypes = require('prop-types'),
  module1200 = require('./1200'),
  module391 = require('./391');

function C() {
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

var S = (function (t, ...args) {
  module9.default(O, t);

  var PropTypes = O,
    module1200 = C(),
    S = function () {
      var t,
        o = module12.default(PropTypes);

      if (module1200) {
        var n = module12.default(this).constructor;
        t = Reflect.construct(o, arguments, n);
      } else t = o.apply(this, arguments);

      return module11.default(this, t);
    };

  function O() {
    var t;
    module6.default(this, O);
    (t = S.call(this, ...args)).offsetX = new module13.Animated.Value(0);
    t.dimensions = O.calculateDimensions(t.props.size);
    t.loaded = false;

    t.createToggleSwitchStyle = function () {
      return {
        justifyContent: 'center',
        width: t.dimensions.width,
        height: t.dimensions.height,
        borderRadius: 20,
        padding: t.dimensions.padding,
        borderColor: t.props.isOn
          ? t.props.onBorderColor || t.context.theme.toggleSwitch.toggleSwitchBorderOnColor
          : t.props.offBorderColor || t.context.theme.toggleSwitch.toggleSwitchBorderOffColor,
        borderWidth: 1,
        backgroundColor: t.props.isOn ? t.props.onColor || t.context.theme.toggleSwitch.toggleSwitchOnColor : t.props.offColor || t.context.theme.toggleSwitch.toggleSwitchOffColor,
      };
    };

    t.createInsideCircleStyle = function () {
      return {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 7,
        position: 'absolute',
        backgroundColor: t.props.isOn
          ? t.props.onCircleColor || t.context.theme.toggleSwitch.toggleSwitchCircleOnColor
          : t.props.offCircleColor || t.context.theme.toggleSwitch.toggleSwitchCircleOffColor,
        transform: [
          {
            translateX: t.offsetX,
          },
        ],
        width: t.dimensions.circleWidth,
        height: t.dimensions.circleHeight,
        borderRadius: t.dimensions.circleWidth / 2,
      };
    };

    return t;
  }

  module7.default(
    O,
    [
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.props.isOn
              ? globals.isRTL
                ? 0
                : this.dimensions.width - this.dimensions.translateX
              : globals.isRTL
              ? this.dimensions.width - this.dimensions.translateX - 2
              : -2;
          module13.Animated.timing(this.offsetX, {
            toValue: n,
            duration: this.loaded ? 300 : 0,
          }).start();
          this.loaded = true;
          return React.default.createElement(
            module13.View,
            module22.default(
              {
                style: [b.container, this.props.style],
              },
              module391.default.getAccessibilityLabel(this.props.funcId)
            ),
            this.props.label
              ? React.default.createElement(
                  module13.Text,
                  {
                    style: [b.labelStyle, this.props.labelStyle],
                  },
                  this.props.label
                )
              : null,
            React.default.createElement(
              module13.TouchableOpacity,
              {
                style: this.createToggleSwitchStyle(),
                activeOpacity: 0.8,
                onPress: function () {
                  t.props.onToggle(!t.props.isOn);
                },
              },
              React.default.createElement(
                module13.Animated.View,
                {
                  style: this.createInsideCircleStyle(),
                },
                this.props.icon
              )
            )
          );
        },
      },
    ],
    [
      {
        key: 'calculateDimensions',
        value: function (t) {
          switch (t) {
            case 'small':
              return {
                width: 53,
                height: 21,
                padding: 12,
                circleWidth: 15,
                circleHeight: 15,
                translateX: 28,
              };

            case 'large':
              return {
                width: 100,
                height: 24,
                padding: 20,
                circleWidth: 35,
                circleHeight: 35,
                translateX: 41,
              };

            default:
              return {
                width: 53,
                height: 21,
                padding: 12,
                circleWidth: 15,
                circleHeight: 15,
                translateX: 28,
              };
          }
        },
      },
    ]
  );
  return O;
})(React.default.Component);

exports.default = S;
S.contextType = module1200.AppConfigContext;
S.propTypes = {
  isOn: PropTypes.default.bool.isRequired,
  label: PropTypes.default.string,
  size: PropTypes.default.string,
  labelStyle: PropTypes.default.object,
  onToggle: PropTypes.default.func.isRequired,
  icon: PropTypes.default.object,
};
S.defaultProps = {
  isOn: false,
  size: 'medium',
  labelStyle: {},
  icon: null,
};
var b = module13.StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelStyle: {
    marginHorizontal: 10,
  },
});
