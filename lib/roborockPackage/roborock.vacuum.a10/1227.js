var module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module381 = require('./381'),
  module506 = require('./506');

function b() {
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

var y = (function (t) {
  module7.default(w, t);

  var module506 = w,
    y = b(),
    x = function () {
      var t,
        o = module11.default(module506);

      if (y) {
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
              p = React.default.createElement(module381.LeftImageButton, {
                key: s,
                funcId: 'mop_mode_set_view_' + s,
                enabled: t.props.enabled,
                onPress: t.onPressButton.bind(t, s),
                imageWidth: 30,
                imageHeight: 30,
                fontSize: 14,
                selectedTextColor: o.buttonTextSelectedColor,
                textColor: o.buttonTextColor,
                selected: l,
                image: n.normal,
                selectedImage: n.selected,
                title: n.name,
                textLeft: 5,
                maxTextWidth: 90,
                style: [
                  T.button,
                  {
                    width: u,
                    backgroundColor: 'transparent',
                  },
                ],
              }),
              f = React.default.createElement(
                module381.GradientView,
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
          y = 1 == this.state.current && this.props.addonTip,
          x = s ? 'red' : this.props.enabled ? o.tipEnableColor : o.tipDisableColor,
          module1226 =
            this.state.isShowQuestionIcon && l
              ? React.default.createElement(module381.PureImageButton, {
                  onPress: function () {
                    return t.props.enabled && t.props.onPressQuestion && t.props.onPressQuestion();
                  },
                  funcId: 'mop_method_help_button',
                  imageWidth: 15,
                  imageHeight: 15,
                  style: {
                    marginLeft: globals.isRTL ? 3 : 10,
                    marginRight: globals.isRTL ? 10 : 3,
                    width: 15,
                    height: 15,
                    opacity: this.props.enabled ? 1 : 0.18,
                  },
                  image: require('./1226'),
                })
              : React.default.createElement(module12.View, null),
          v = React.default.createElement(
            module12.Text,
            {
              style: [
                T.title,
                {
                  color: this.props.enabled ? o.enableTitleColor : o.disableTitleColor,
                },
              ],
            },
            this.props.title
          ),
          C = globals.isRTL ? ' ' + this.props.addonTip + ' |' : ' | ' + this.props.addonTip,
          S =
            y &&
            React.default.createElement(
              module12.Text,
              {
                style: {
                  color: x,
                  fontSize: 13,
                },
              },
              C
            ),
          R = React.default.createElement(
            module12.View,
            {
              style: T.descTextView,
            },
            React.default.createElement(
              module12.Text,
              {
                style: [
                  T.desc,
                  {
                    color: this.props.tip || !this.props.enabled ? (this.props.enabled ? o.enableSubTitleColor : o.disableSubTitleColor) : o.highlightTitleColor,
                    fontSize: 13,
                    fontWeight: this.props.tip ? '400' : '500',
                  },
                ],
              },
              this.props.tip || b
            ),
            S,
            module1226
          );
        return React.default.createElement(
          module12.View,
          {
            style: [T.containter, this.props.style],
          },
          React.default.createElement(
            module12.View,
            {
              style: T.top,
            },
            globals.isRTL && R,
            globals.isRTL && v,
            !globals.isRTL && v,
            !globals.isRTL && R
          ),
          React.default.createElement(
            module12.View,
            {
              style: [
                T.bottom,
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
          isShowQuestionIcon: t == o,
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
            isShowQuestionIcon: 301 == n,
          });
          this.value = this.props.items[t].strength;
          if (this.props.onPressButton) this.props.onPressButton(o, n);
        }
      },
    },
  ]);
  return w;
})(React.default.PureComponent);

exports.default = y;
y.contextType = module506.AppConfigContext;
y.defaultProps = {
  enabled: true,
  isInHomePage: false,
  addonTip: null,
  shouldShowQuestionIcon: true,
};
var T = module12.StyleSheet.create({
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
    fontWeight: '500',
    textAlign: 'center',
  },
  desc: {
    marginLeft: 10,
    marginRight: 5,
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
