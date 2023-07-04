require('./1622');

var module50 = require('./50'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module385 = require('./385'),
  module1200 = require('./1200');

require('./391');

function y(t, n) {
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

function v(t) {
  for (var o = 1; o < arguments.length; o++) {
    var s = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      y(Object(s), true).forEach(function (o) {
        module50.default(t, o, s[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      y(Object(s)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(s, n));
      });
  }

  return t;
}

function T() {
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

var w = (function (t) {
  module9.default(w, t);

  var module50 = w,
    module1200 = T(),
    y = function () {
      var t,
        o = module12.default(module50);

      if (module1200) {
        var s = module12.default(this).constructor;
        t = Reflect.construct(o, arguments, s);
      } else t = o.apply(this, arguments);

      return module11.default(this, t);
    };

  function w(t) {
    var n, s;
    module6.default(this, w);
    s = y.call(this, t);
    var l = (null == (n = t.items) ? undefined : n.length) > 1 ? 1 : 0;
    s.state = {
      current: l,
    };
    s.value = t.items[l].strength;
    return s;
  }

  module7.default(w, [
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
          b = l.submode,
          y = l.items,
          T = l.isRedAddonTip,
          w = l.shouldShowQuestionIcon,
          P = this.context.theme.ModeSettingPanel,
          C = y.length > 4 ? 50 : 56,
          R = (module13.Dimensions.get('window').width - y.length * C - 60) / y.length;
        R = R ** 40;
        var O = this.props.items.map(function (t, n) {
            var o,
              l = c && n == s.state.current;
            return React.default.createElement(module385.PureImageButton, {
              funcId: '' + (s.props.funcId || 'mode_set_view_') + n,
              accessibilityLabel: null != (o = null == t ? undefined : t.name) ? o : '',
              style: [
                x.button,
                {
                  width: C,
                  height: C,
                  borderRadius: C / 2,
                  marginLeft: globals.isRTL ? 0 : 0 == n ? 20 : R,
                  marginRight: globals.isRTL ? (n == y.length - 1 ? 20 : R) : 0,
                },
              ],
              key: n,
              image: t.normal,
              selectedImage: t.selected,
              imageWidth: C,
              imageHeight: C,
              fontSize: 12,
              selectedColor: P.highlightTitleColor,
              textColor: P.buttonTextColor,
              selected: l,
              enabled: c,
              onPress: s.onPressButton.bind(s, n),
            });
          }),
          S = -1 == this.state.current ? '' : (null != (t = null == (n = this.props.items[this.state.current]) ? undefined : n.name) ? t : '') + (b ? ' | ' + b : ''),
          L = !!this.props.addonTip,
          j = null;
        j = c ? (u ? P.warningTextColor : P.highlightTitleColor) : P.disableSubTitleColor;
        var module1623 = w
            ? React.default.createElement(module385.PureImageButton, {
                funcId: 'question_button',
                onPress: null == (o = this.props) ? undefined : o.onPressQuestion,
                imageWidth: 20,
                imageHeight: 20,
                style: {
                  width: 20,
                  height: 20,
                },
                image: require('./1623'),
              })
            : React.default.createElement(module13.View, null),
          I = React.default.createElement(
            module13.Text,
            {
              style: [
                x.title,
                {
                  color: c ? P.enableTitleColor : P.disableTitleColor,
                },
              ],
            },
            this.props.title
          ),
          k = React.default.createElement(
            module13.View,
            {
              style: x.descTextView,
            },
            React.default.createElement(
              module13.Text,
              {
                style: [
                  x.desc,
                  {
                    color: j,
                    fontSize: 13,
                    fontWeight: u ? '400' : '500',
                  },
                ],
              },
              this.props.tip || S
            ),
            module1623
          ),
          D = c ? (T ? 'red' : P.tipEnableColor) : P.tipDisableColor,
          B =
            L &&
            React.default.createElement(
              module13.Text,
              {
                numberOfLines: 1,
                style: {
                  flexShrink: 1,
                  color: D,
                },
              },
              ' | ' + this.props.addonTip
            );
        return React.default.createElement(
          module13.View,
          {
            style: [
              x.containter,
              {
                backgroundColor: P.modeSetCardBackgroundColor,
              },
              this.props.style,
            ],
          },
          React.default.createElement(
            module13.View,
            {
              style: v(
                v({}, x.top),
                {},
                {
                  marginHorizontal: 20,
                }
              ),
            },
            globals.isRTL && B,
            globals.isRTL && k,
            globals.isRTL && I,
            !globals.isRTL && I,
            !globals.isRTL && k,
            !globals.isRTL && B
          ),
          React.default.createElement(
            module13.View,
            {
              style: [
                x.bottom,
                {
                  justifyContent: globals.isRTL ? 'flex-end' : 'flex-start',
                  backgroundColor: 'transparent',
                },
              ],
            },
            O
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
          var n = this.props.willOnPressButton;

          if (
            (undefined === n
              ? function (t) {
                  return true;
                }
              : n)(this.props.items[t].strength)
          ) {
            var o = this.props.items[this.state.current] ? this.props.items[this.state.current].strength : -1,
              s = this.props.items[t].strength;
            this.setState({
              current: t,
            });
            this.value = this.props.items[t].strength;
            if (this.props.onPressButton) this.props.onPressButton(o, s);
          }
        }
      },
    },
  ]);
  return w;
})(React.default.PureComponent);

exports.default = w;
w.contextType = module1200.AppConfigContext;
w.defaultProps = {
  enabled: true,
  isInHomePage: false,
  addonTip: null,
  shouldShowQuestionIcon: false,
};
var x = module13.StyleSheet.create({
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
