var module50 = require('./50'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module385 = require('./385'),
  module1538 = require('./1538'),
  module1121 = require('./1121');

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
    module1121 = w(),
    v = function () {
      var t,
        o = module11.default(module50);

      if (module1121) {
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
          o,
          s = this,
          l = this.props,
          u = l.tip,
          c = l.enabled,
          y = l.submode,
          v = l.items,
          w = l.isRedAddonTip,
          x = l.shouldShowQuestionIcon,
          P = this.context.theme.ModeSettingPanel,
          R = v.length > 4 ? 50 : 56,
          O = (module12.Dimensions.get('window').width - v.length * R - 60) / v.length;
        O = O ** 40;
        var S = this.props.items.map(function (t, n) {
            var o,
              l = c && n == s.state.current;
            return React.default.createElement(module385.PureImageButton, {
              funcId: '' + (s.props.funcId || 'mode_set_view_') + n,
              accessibilityLabel: null != (o = null == t ? undefined : t.name) ? o : '',
              style: [
                C.button,
                {
                  width: R,
                  height: R,
                  borderRadius: R / 2,
                  marginLeft: globals.isRTL ? 0 : 0 == n ? 20 : O,
                  marginRight: globals.isRTL ? (n == v.length - 1 ? 20 : O) : 0,
                },
              ],
              key: n,
              image: t.normal,
              selectedImage: t.selected,
              imageWidth: R,
              imageHeight: R,
              fontSize: 12,
              selectedColor: P.highlightTitleColor,
              textColor: P.buttonTextColor,
              selected: l,
              enabled: c,
              onPress: s.onPressButton.bind(s, n),
            });
          }),
          L = -1 == this.state.current ? '' : (null != (t = null == (n = this.props.items[this.state.current]) ? undefined : n.name) ? t : '') + (y ? ' | ' + y : ''),
          j = !!this.props.addonTip,
          E = null;
        E = c ? (u ? P.warningTextColor : P.highlightTitleColor) : P.disableSubTitleColor;

        var module1539 = x
            ? React.default.createElement(module1538.default, {
                onPress: null == (o = this.props) ? undefined : o.onPressQuestion,
                style: {
                  width: 20,
                  height: 20,
                },
                source: require('./1539'),
                highlightedSource: require('./1539'),
              })
            : React.default.createElement(module12.View, null),
          D = React.default.createElement(
            module12.Text,
            {
              style: [
                C.title,
                {
                  color: c ? P.enableTitleColor : P.disableTitleColor,
                },
              ],
            },
            this.props.title
          ),
          I = React.default.createElement(
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
                    color: E,
                    fontSize: 13,
                    fontWeight: u ? '400' : '500',
                  },
                ],
              },
              this.props.tip || L
            ),
            module1539
          ),
          V = c ? (w ? 'red' : P.tipEnableColor) : P.tipDisableColor,
          _ =
            j &&
            React.default.createElement(
              module12.Text,
              {
                numberOfLines: 1,
                style: {
                  flexShrink: 1,
                  color: V,
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
                backgroundColor: P.modeSetCardBackgroundColor,
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
            globals.isRTL && _,
            globals.isRTL && I,
            globals.isRTL && D,
            !globals.isRTL && D,
            !globals.isRTL && I,
            !globals.isRTL && _
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
            S
          )
        );
      },
    },
    {
      key: 'setMode',
      value: function (t) {
        var n = this.props.items.findIndex(function (n) {
          return n.strength == t;
        });
        this.value = t;
        this.setState({
          current: n,
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
x.contextType = module1121.AppConfigContext;
x.defaultProps = {
  enabled: true,
  isInHomePage: false,
  addonTip: null,
  shouldShowQuestionIcon: false,
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
