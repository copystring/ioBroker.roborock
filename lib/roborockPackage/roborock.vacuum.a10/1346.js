require('./1065');

var module49 = require('./49'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module381 = require('./381'),
  module387 = require('./387'),
  module506 = require('./506'),
  module1063 = require('./1063'),
  module1345 = require('./1345'),
  module390 = require('./390');

function P(t, o) {
  var n = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var l = Object.getOwnPropertySymbols(t);
    if (o)
      l = l.filter(function (o) {
        return Object.getOwnPropertyDescriptor(t, o).enumerable;
      });
    n.push.apply(n, l);
  }

  return n;
}

function _(t) {
  for (var n = 1; n < arguments.length; n++) {
    var l = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      P(Object(l), true).forEach(function (n) {
        module49.default(t, n, l[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(l));
    else
      P(Object(l)).forEach(function (o) {
        Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(l, o));
      });
  }

  return t;
}

function w() {
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

require('./389');

var module491 = require('./491').strings,
  B = (function (t) {
    module7.default(P, t);

    var module49 = P,
      module506 = w(),
      v = function () {
        var t,
          n = module11.default(module49);

        if (module506) {
          var l = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, l);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function P(t) {
      var o;
      module4.default(this, P);
      (o = v.call(this, t)).layoutMap = {};
      o.state = {
        selectedIndex: undefined == module390.MC.tabIndex ? module1345.TabNeutral : module390.MC.tabIndex,
      };
      return o;
    }

    module5.default(P, [
      {
        key: 'onPressButton',
        value: function (t) {
          if (this.props.onPressTab) this.props.onPressTab(t);
        },
      },
      {
        key: 'didLayout',
        value: function (t, o) {
          var n = t.nativeEvent.layout;
          this.layoutMap[o] = n;

          if (3 == Object.keys(this.layoutMap).length) {
            console.log('tab layout ready', this.layoutMap);
            this.forceUpdate();
          }
        },
      },
      {
        key: 'getIndicatorLineLayout',
        value: function () {
          var t = this.layoutMap[this.state.selectedIndex];
          return t
            ? {
                left: t.x + 12,
                width: t.width - 24,
              }
            : {};
        },
      },
      {
        key: 'changeTab',
        value: function (t) {
          module390.MC.tabIndex = t;
          this.setState({
            selectedIndex: t,
          });
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this;
          console.log('tab render', this.state.selectedIndex);
          var o = this.props,
            n = o.enabled,
            l = o.onLayout,
            u = [module491.home_bottom_menu_global, module491.home_bottom_menu_select_zone, module491.home_bottom_menu_draw_zone],
            c = this.context.theme,
            s = u.map(function (o, l) {
              var u = t.state.selectedIndex === l;
              return React.default.createElement(module381.PureButton, {
                onPress: function () {
                  return t.onPressButton(l);
                },
                key: l,
                onLayout: function (o) {
                  return t.didLayout(o, l);
                },
                title: o,
                funcId: 'home_tab_' + l,
                enabled: n,
                textColor: u ? c.homeBottomControl.tabSelectedColor : c.homeBottomControl.tabNormalColor,
                fontSize: module387.default.scaledPixel(u ? 15 : 14),
                fontWeight: u ? 'bold' : 'normal',
                textStyle: j.btnText,
                style: [j.tabButton],
              });
            });
          return React.default.createElement(
            module12.View,
            {
              style: j.tabWrap,
              onLayout: function (t) {
                return l && l(t.nativeEvent.layout);
              },
            },
            React.default.createElement(
              module12.View,
              {
                style: [
                  j.buttonsWrap,
                  {
                    backgroundColor: c.componentBackgroundColor,
                  },
                ],
              },
              s
            ),
            React.default.createElement(module381.GradientView, {
              colors: c.ModeSettingPanel.gradientBackground,
              start: {
                x: 0,
                y: 0,
              },
              end: {
                x: 1,
                y: 0,
              },
              style: [j.indicatorLine, _({}, this.getIndicatorLineLayout())],
            })
          );
        },
      },
    ]);
    return P;
  })(React.default.Component);

B.contextType = module506.AppConfigContext;

var j = module12.StyleSheet.create({
    tabWrap: {
      maxWidth: 300,
      height: module1063.TabWrapHeight,
      marginBottom: 12,
      alignSelf: 'flex-start',
    },
    buttonsWrap: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 4,
      paddingHorizontal: 20,
      borderRadius: 10,
    },
    tabButton: {
      height: module1063.TabWrapHeight - 8,
      borderRadius: (module1063.TabWrapHeight - 4) / 2,
      backgroundColor: 'transparent',
      paddingHorizontal: 12,
    },
    indicatorLine: {
      position: 'absolute',
      height: 2,
      bottom: 0,
      backgroundColor: '#72B4FE',
    },
  }),
  k = _(
    _({}, module1063.BaseShadow),
    {},
    {
      radius: 10,
      style: {
        alignSelf: 'flex-start',
        marginBottom: 10,
        marginLeft: module1063.HorizontalMargin,
      },
    }
  ),
  L = module381.WithAutoLayoutShadow(B, k);

exports.default = L;
