var module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module1215 = require('./1215'),
  module12 = require('./12'),
  PropTypes = require('prop-types'),
  module387 = require('./387'),
  module383 = require('./383');

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

var module389 = require('./389'),
  w = module389.isMiApp || module389.apiLevel > 10007,
  x = (function (t) {
    module7.default(V, t);

    var PropTypes = V,
      module389 = v(),
      x = function () {
        var t,
          n = module11.default(PropTypes);

        if (module389) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function V(t) {
      var n;
      module4.default(this, V);
      (n = x.call(this, t)).state = {
        enabled: true,
      };
      return n;
    }

    module5.default(V, [
      {
        key: 'getGradientView',
        value: function () {
          return React.default.createElement(
            module1215.default,
            {
              colors: [this.props.gradientColorStart, this.props.gradientColorEnd],
              start: {
                x: 0,
                y: 0,
              },
              end: {
                x: 1,
                y: 0,
              },
              style: [
                E.outerViewStyle,
                this.props.style,
                {
                  borderRadius: this.props.radius,
                  minWidth: this.props.minWidth,
                  minHeight: this.props.minHeight,
                },
              ],
            },
            React.default.createElement(
              module12.View,
              {
                style: E.innerViewStyle,
              },
              React.default.createElement(
                module12.Text,
                {
                  style: [
                    E.textStyle,
                    {
                      fontSize: this.props.fontSize,
                    },
                  ],
                },
                this.props.btnText
              )
            )
          );
        },
      },
      {
        key: 'getNormalView',
        value: function () {
          return React.default.createElement(
            module12.View,
            {
              style: [
                E.innerViewStyle,
                this.props.style,
                {
                  borderRadius: this.props.radius,
                  backgroundColor: this.props.normalColor,
                  minWidth: this.props.minWidth,
                  minHeight: this.props.minHeight,
                },
              ],
            },
            React.default.createElement(
              module12.Text,
              {
                style: [
                  E.textStyle,
                  {
                    fontSize: this.props.fontSize,
                  },
                ],
              },
              this.props.btnText
            )
          );
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            o = w ? this.getGradientView() : this.getNormalView(),
            l = this.props,
            s = l.underlayColor,
            u = l.funcId,
            f = u || 'time_key_' + new Date().getTime();
          return React.default.createElement(
            module12.TouchableOpacity,
            module21.default(
              {
                activeOpacity: this.state.enabled ? 0.6 : 1,
                style: [E.buttonWrapStyle],
              },
              module387.default.getAccessibilityLabel(f),
              {
                onPress: function () {
                  if (t.state.enabled) {
                    if (t.props.onPress) t.props.onPress();
                    if (t.props.eventName) module383.LogEventStat(t.props.eventName);
                  }
                },
                underlayColor: s || 'transparent',
              }
            ),
            o
          );
        },
      },
    ]);
    return V;
  })(React.default.PureComponent);

exports.default = x;
x.defaultProps = {
  radius: 26,
  minWidth: 110,
  minHeight: 40,
  fontSize: 14,
  btnText: ' ',
  gradientColorStart: '#72B4FE',
  gradientColorEnd: '#3777F7',
  normalColor: '#3384ff',
};
x.propTypes = {
  radius: PropTypes.default.number,
  minWidth: PropTypes.default.number,
  minHeight: PropTypes.default.number,
  fontSize: PropTypes.default.number,
  btnText: PropTypes.default.string.isRequired,
  gradientColorStart: PropTypes.default.string,
  gradientColorEnd: PropTypes.default.string,
  normalColor: PropTypes.default.string,
};
var E = module12.StyleSheet.create({
  textStyle: {
    textAlign: 'center',
    color: 'white',
  },
  innerViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerViewStyle: {
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  buttonWrapStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
