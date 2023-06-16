var module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module381 = require('./381'),
  module1227 = require('./1227'),
  module506 = require('./506');

require('./387');

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

var v = (function (t) {
  module7.default(x, t);

  var module506 = x,
    v = y(),
    C = function () {
      var t,
        n = module11.default(module506);

      if (v) {
        var o = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function x(t) {
    var o;
    module4.default(this, x);
    (o = C.call(this, t)).state = {
      current: 1,
      isShowQuestionIcon: false,
    };
    o.value = t.items[1].strength;
    return o;
  }

  module5.default(x, [
    {
      key: 'UNSAFE_componentWillMount',
      value: function () {},
    },
    {
      key: 'render',
      value: function () {
        var t = this,
          n = this.props,
          o = n.tip,
          s = n.enabled,
          l = n.submode,
          u = this.context.theme.ModeSettingPanel,
          b = this.props.items.map(function (n, o) {
            var l,
              f = s && o == t.state.current;
            return React.default.createElement(module381.PureImageButton, {
              funcId: '' + (t.props.funcId || 'mode_set_view_') + o,
              accessibilityLabel: null != (l = null == n ? undefined : n.name) ? l : '',
              style: [T.button],
              key: o,
              image: n.normal,
              selectedImage: n.selected,
              imageWidth: 46,
              imageHeight: 46,
              fontSize: 12,
              selectedColor: u.highlightTitleColor,
              textColor: u.buttonTextColor,
              selected: f,
              enabled: s,
              onPress: t.onPressButton.bind(t, o),
            });
          }),
          y = -1 == this.state.current ? '' : this.props.items[this.state.current].name + (l ? ' | ' + l : ''),
          v = 0 == this.state.current && this.props.addonTip,
          C = null;
        C = s ? (o ? u.warningTextColor : u.highlightTitleColor) : u.disableSubTitleColor;
        var module1228 = this.state.isShowQuestionIcon
            ? React.default.createElement(module1227.default, {
                onPress: this.props.onPressQuestion,
                style: {
                  width: 20,
                  height: 20,
                },
                source: require('./1228'),
                highlightedSource: require('./1228'),
              })
            : React.default.createElement(module12.View, null),
          w = React.default.createElement(
            module12.Text,
            {
              style: [
                T.title,
                {
                  color: s ? u.enableTitleColor : u.disableTitleColor,
                },
              ],
            },
            this.props.title
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
                    color: C,
                    fontSize: 13,
                    fontWeight: o ? '400' : '500',
                  },
                ],
              },
              this.props.tip || y
            ),
            module1228
          ),
          S =
            v &&
            React.default.createElement(
              module12.Text,
              {
                numberOfLines: 1,
                style: {
                  flexShrink: 1,
                  color: s ? u.tipEnableColor : u.tipDisableColor,
                },
              },
              ' | ' + this.props.addonTip
            );
        return React.default.createElement(
          module12.View,
          {
            style: [
              T.containter,
              {
                backgroundColor: u.modeSetCardBackgroundColor,
              },
              this.props.style,
            ],
          },
          React.default.createElement(
            module12.View,
            {
              style: T.top,
            },
            globals.isRTL && S,
            globals.isRTL && R,
            globals.isRTL && w,
            !globals.isRTL && w,
            !globals.isRTL && R,
            !globals.isRTL && S
          ),
          React.default.createElement(
            module12.View,
            {
              style: [
                T.bottom,
                {
                  backgroundColor: 'transparent',
                },
              ],
            },
            b
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

exports.default = v;
v.contextType = module506.AppConfigContext;
v.defaultProps = {
  enabled: true,
  isInHomePage: false,
  addonTip: null,
};
var T = module12.StyleSheet.create({
  containter: {
    paddingVertical: 20,
    paddingHorizontal: 20,
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    flex: 0,
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: 'transparent',
  },
  descTextView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
