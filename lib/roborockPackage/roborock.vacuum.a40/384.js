var module50 = require('./50'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module385 = require('./385'),
  module1323 = require('./1323'),
  module515 = require('./515');

require('./391');

function v(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(t);
    if (n)
      s = s.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, s);
  }

  return o;
}

function T(t) {
  for (var o = 1; o < arguments.length; o++) {
    var s = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      v(Object(s), true).forEach(function (o) {
        module50.default(t, o, s[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      v(Object(s)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(s, n));
      });
  }

  return t;
}

function w() {
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

var x = (function (t) {
  module7.default(x, t);

  var module50 = x,
    module515 = w(),
    v = function () {
      var t,
        o = module11.default(module50);

      if (module515) {
        var s = module11.default(this).constructor;
        t = Reflect.construct(o, arguments, s);
      } else t = o.apply(this, arguments);

      return module9.default(this, t);
    };

  function x(t) {
    var n;
    module4.default(this, x);
    (n = v.call(this, t)).state = {
      current: 1,
      isShowQuestionIcon: false,
    };
    n.value = t.items[1].strength;
    return n;
  }

  module5.default(x, [
    {
      key: 'UNSAFE_componentWillMount',
      value: function () {},
    },
    {
      key: 'render',
      value: function () {
        var t,
          n,
          o = this,
          s = this.props,
          l = s.tip,
          u = s.enabled,
          c = s.submode,
          y = s.items,
          v = this.context.theme.ModeSettingPanel,
          w = y.length > 4 ? 50 : 56,
          x = (module12.Dimensions.get('window').width - y.length * w - 60) / y.length;
        x = x ** 40;
        var P = this.props.items.map(function (t, n) {
            var s,
              l = u && n == o.state.current;
            return React.default.createElement(module385.PureImageButton, {
              funcId: '' + (o.props.funcId || 'mode_set_view_') + n,
              accessibilityLabel: null != (s = null == t ? undefined : t.name) ? s : '',
              style: [
                C.button,
                {
                  width: w,
                  height: w,
                  borderRadius: w / 2,
                  marginLeft: globals.isRTL ? 0 : 0 == n ? 20 : x,
                  marginRight: globals.isRTL ? (n == y.length - 1 ? 20 : x) : 0,
                },
              ],
              key: n,
              image: t.normal,
              selectedImage: t.selected,
              imageWidth: w,
              imageHeight: w,
              fontSize: 12,
              selectedColor: v.highlightTitleColor,
              textColor: v.buttonTextColor,
              selected: l,
              enabled: u,
              onPress: o.onPressButton.bind(o, n),
            });
          }),
          R = -1 == this.state.current ? '' : (null != (t = null == (n = this.props.items[this.state.current]) ? undefined : n.name) ? t : '') + (c ? ' | ' + c : ''),
          O = 0 == this.state.current && this.props.addonTip,
          S = null;
        S = u ? (l ? v.warningTextColor : v.highlightTitleColor) : v.disableSubTitleColor;
        var module1324 = this.state.isShowQuestionIcon
            ? React.default.createElement(module1323.default, {
                onPress: this.props.onPressQuestion,
                style: {
                  width: 20,
                  height: 20,
                },
                source: require('./1324'),
                highlightedSource: require('./1324'),
              })
            : React.default.createElement(module12.View, null),
          j = React.default.createElement(
            module12.Text,
            {
              style: [
                C.title,
                {
                  color: u ? v.enableTitleColor : v.disableTitleColor,
                },
              ],
            },
            this.props.title
          ),
          E = React.default.createElement(
            module12.View,
            {
              style: C.descTextView,
            },
            React.default.createElement(
              module12.Text,
              {
                style: [
                  C.desc,
                  {
                    color: S,
                    fontSize: 13,
                    fontWeight: l ? '400' : '500',
                  },
                ],
              },
              this.props.tip || R
            ),
            module1324
          ),
          k =
            O &&
            React.default.createElement(
              module12.Text,
              {
                numberOfLines: 1,
                style: {
                  flexShrink: 1,
                  color: u ? v.tipEnableColor : v.tipDisableColor,
                },
              },
              ' | ' + this.props.addonTip
            );
        return React.default.createElement(
          module12.View,
          {
            style: [
              C.containter,
              {
                backgroundColor: v.modeSetCardBackgroundColor,
              },
              this.props.style,
            ],
          },
          React.default.createElement(
            module12.View,
            {
              style: T(
                T({}, C.top),
                {},
                {
                  marginHorizontal: 20,
                }
              ),
            },
            globals.isRTL && k,
            globals.isRTL && E,
            globals.isRTL && j,
            !globals.isRTL && j,
            !globals.isRTL && E,
            !globals.isRTL && k
          ),
          React.default.createElement(
            module12.View,
            {
              style: [
                C.bottom,
                {
                  justifyContent: globals.isRTL ? 'flex-end' : 'flex-start',
                  backgroundColor: 'transparent',
                },
              ],
            },
            P
          )
        );
      },
    },
    {
      key: 'setMode',
      value: function (t, n) {
        var o = this.props.items.findIndex(function (n) {
          return n.strength == t;
        });
        this.value = t;
        this.setState({
          current: o,
          isShowQuestionIcon: false,
        });
      },
    },
    {
      key: 'onPressButton',
      value: function (t) {
        if (t != this.state.current) {
          var n = this.props.items[this.state.current] ? this.props.items[this.state.current].strength : -1,
            o = this.props.items[t].strength;
          this.setState({
            current: t,
          });
          this.value = this.props.items[t].strength;
          if (this.props.onPressButton) this.props.onPressButton(n, o);
        }
      },
    },
  ]);
  return x;
})(React.default.PureComponent);

exports.default = x;
x.contextType = module515.AppConfigContext;
x.defaultProps = {
  enabled: true,
  isInHomePage: false,
  addonTip: null,
};
var C = module12.StyleSheet.create({
  containter: {
    paddingVertical: 20,
    borderRadius: 8,
  },
  top: {
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: globals.isRTL ? 'flex-end' : 'flex-start',
  },
  title: {
    fontSize: 15,
    color: 'rgba(0,0,0,0.8)',
    fontWeight: 'bold',
  },
  desc: {
    marginLeft: globals.isRTL ? 0 : 10,
    marginRight: globals.isRTL ? 10 : 0,
    fontWeight: '500',
    textAlign: 'center',
  },
  bottom: {
    backgroundColor: 'rgba(0,0,0,0.03)',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  button: {
    flex: 0,
    backgroundColor: 'transparent',
  },
  descTextView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
