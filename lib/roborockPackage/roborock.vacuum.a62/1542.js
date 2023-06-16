var module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module385 = require('./385'),
  module1121 = require('./1121');

function b() {
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

var T = (function (t) {
  module7.default(w, t);

  var module1121 = w,
    T = b(),
    x = function () {
      var t,
        o = module11.default(module1121);

      if (T) {
        var n = module11.default(this).constructor;
        t = Reflect.construct(o, arguments, n);
      } else t = o.apply(this, arguments);

      return module9.default(this, t);
    };

  function w(t) {
    var n;
    module4.default(this, w);
    (n = x.call(this, t)).state = {
      current: 1,
      isShowQuestionIcon: false,
    };
    n.value = t.items[1].strength;
    return n;
  }

  module5.default(w, [
    {
      key: 'UNSAFE_componentWillMount',
      value: function () {},
    },
    {
      key: 'render',
      value: function () {
        var t = this,
          o = this.context.theme.ModeSettingPanel,
          n = this.props,
          s = n.isRedAddonTip,
          l = n.shouldShowQuestionIcon,
          u = (module12.Dimensions.get('window').width - 40 - 44) / this.props.items.length,
          f = this.props.items.map(function (n, s) {
            var l = t.props.enabled && s == t.state.current,
              p = React.default.createElement(module385.LeftImageButton, {
                key: s,
                funcId: 'mop_mode_set_view_' + s,
                enabled: t.props.enabled,
                onPress: t.onPressButton.bind(t, s),
                imageWidth: 30,
                imageHeight: 30,
                fontSize: t.props.items.length > 2 ? 12 : 14,
                selectedTextColor: o.buttonTextSelectedColor,
                textColor: o.buttonTextColor,
                selected: l,
                image: n.normal,
                selectedImage: n.selected,
                title: n.name,
                textLeft: -1,
                maxTextWidth: 90,
                style: [
                  y.button,
                  {
                    width: u,
                    backgroundColor: 'transparent',
                  },
                ],
              }),
              f = React.default.createElement(
                module385.GradientView,
                {
                  key: s,
                  colors: o.gradientBackground,
                  start: {
                    x: 0,
                    y: 0,
                  },
                  end: {
                    x: 1,
                    y: 0,
                  },
                  style: {
                    backgroundColor: '#3777F7',
                    borderRadius: 25,
                  },
                },
                p
              );
            return l ? f : p;
          }),
          b = -1 == this.state.current ? '' : this.props.items[this.state.current].name,
          T = 1 == this.state.current && this.props.addonTip,
          x = s ? 'red' : this.props.enabled ? o.tipEnableColor : o.tipDisableColor,
          module1541 =
            this.state.isShowQuestionIcon && l
              ? React.default.createElement(module385.PureImageButton, {
                  onPress: function () {
                    return t.props.enabled && t.props.onPressQuestion && t.props.onPressQuestion(t.value);
                  },
                  funcId: 'mop_method_help_button',
                  imageWidth: 15,
                  imageHeight: 15,
                  style: {
                    marginTop: 2,
                    marginLeft: globals.isRTL ? 3 : 10,
                    marginRight: globals.isRTL ? 0 : 3,
                    width: 15,
                    height: 15,
                    opacity: this.props.enabled ? 1 : 0.18,
                    transform: globals.isRTL
                      ? [
                          {
                            rotateY: '180deg',
                          },
                        ]
                      : [],
                  },
                  image: require('./1541'),
                })
              : React.default.createElement(module12.View, null),
          v = React.default.createElement(
            module12.Text,
            {
              style: [
                y.title,
                {
                  color: this.props.enabled ? o.enableTitleColor : o.disableTitleColor,
                },
              ],
            },
            this.props.title
          ),
          C = globals.isRTL ? ' ' + this.props.addonTip + ' |' : ' | ' + this.props.addonTip,
          R =
            T &&
            React.default.createElement(
              module12.Text,
              {
                style: {
                  color: x,
                  fontSize: 13,
                  marginLeft: 5,
                },
              },
              C
            ),
          S = React.default.createElement(
            module12.Text,
            {
              style: [
                y.desc,
                {
                  color: this.props.tip || !this.props.enabled ? (this.props.enabled ? o.enableSubTitleColor : o.disableSubTitleColor) : o.highlightTitleColor,
                  fontSize: 13,
                  fontWeight: this.props.tip ? '400' : '500',
                },
              ],
            },
            this.props.tip || b
          ),
          I = React.default.createElement(
            module12.View,
            {
              style: y.descTextView,
            },
            globals.isRTL ? module1541 : S,
            R,
            globals.isRTL ? S : module1541
          );
        return React.default.createElement(
          module12.View,
          {
            style: [y.containter, this.props.style],
          },
          React.default.createElement(
            module12.View,
            {
              style: y.top,
            },
            globals.isRTL && I,
            globals.isRTL && v,
            !globals.isRTL && v,
            !globals.isRTL && I
          ),
          React.default.createElement(
            module12.View,
            {
              style: [
                y.bottom,
                {
                  backgroundColor: this.props.enabled ? o.itemEnableBackgroundColor : o.itemDisableBackgroundColor,
                },
              ],
            },
            f
          )
        );
      },
    },
    {
      key: 'setMode',
      value: function (t, o) {
        var n = this.props.items.findIndex(function (o) {
          return o.strength == t;
        });
        this.value = t;
        this.setState({
          current: n,
          isShowQuestionIcon: 301 == t || 303 == t,
        });
      },
    },
    {
      key: 'onPressButton',
      value: function (t) {
        if (t != this.state.current) {
          var o = this.props.items[this.state.current] ? this.props.items[this.state.current].strength : -1,
            n = this.props.items[t].strength;
          this.setState({
            current: t,
            isShowQuestionIcon: 301 == n || 303 == n,
          });
          this.value = this.props.items[t].strength;
          if (this.props.onPressButton) this.props.onPressButton(o, n);
        }
      },
    },
  ]);
  return w;
})(React.default.PureComponent);

exports.default = T;
T.contextType = module1121.AppConfigContext;
T.defaultProps = {
  enabled: true,
  isInHomePage: false,
  addonTip: null,
  shouldShowQuestionIcon: true,
};
var y = module12.StyleSheet.create({
  containter: {},
  top: {
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: globals.isRTL ? 'flex-end' : 'flex-start',
  },
  title: {
    fontSize: 15,
    color: 'rgba(0,0,0,0.8)',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  desc: {
    marginHorizontal: 5,
    fontWeight: '500',
  },
  bottom: {
    backgroundColor: 'rgba(0,0,0,0.03)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  button: {
    flex: 0,
    height: 50,
    backgroundColor: 'transparent',
  },
  descTextView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
