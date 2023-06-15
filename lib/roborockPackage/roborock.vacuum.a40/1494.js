require('./1161');

var module50 = require('./50'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module385 = require('./385'),
  module391 = require('./391'),
  module515 = require('./515'),
  module1159 = require('./1159'),
  module1493 = require('./1493'),
  module394 = require('./394');

function P(t, o) {
  var n = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(t);
    if (o)
      u = u.filter(function (o) {
        return Object.getOwnPropertyDescriptor(t, o).enumerable;
      });
    n.push.apply(n, u);
  }

  return n;
}

function _(t) {
  for (var n = 1; n < arguments.length; n++) {
    var u = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      P(Object(u), true).forEach(function (n) {
        module50.default(t, n, u[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(u));
    else
      P(Object(u)).forEach(function (o) {
        Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(u, o));
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

require('./393');

var module500 = require('./500').strings,
  j = (function (t) {
    module7.default(P, t);

    var module50 = P,
      module515 = w(),
      v = function () {
        var t,
          n = module11.default(module50);

        if (module515) {
          var u = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, u);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function P(t) {
      var o;
      module4.default(this, P);
      (o = v.call(this, t)).layoutMap = {};
      o.state = {
        selectedIndex: undefined == module394.MC.tabIndex ? module1493.TabNeutral : module394.MC.tabIndex,
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
          module394.MC.tabIndex = t;
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
            u = o.onLayout,
            l = [module500.home_bottom_menu_global, module500.home_bottom_menu_select_zone, module500.home_bottom_menu_draw_zone],
            c = this.context.theme,
            s = l.map(function (o, u) {
              var l = t.state.selectedIndex === u;
              return React.default.createElement(module385.PureButton, {
                onPress: function () {
                  return t.onPressButton(u);
                },
                key: u,
                onLayout: function (o) {
                  return t.didLayout(o, u);
                },
                title: o,
                funcId: 'home_tab_' + u,
                enabled: n,
                textColor: l ? c.homeBottomControl.tabSelectedColor : c.homeBottomControl.tabNormalColor,
                fontSize: module391.default.scaledPixelForPad(l ? 15 : 14),
                fontWeight: l ? 'bold' : 'normal',
                textStyle: S.btnText,
                style: [S.tabButton],
              });
            });
          return React.default.createElement(
            module12.View,
            {
              style: S.tabWrap,
              onLayout: function (t) {
                return u && u(t.nativeEvent.layout);
              },
            },
            React.default.createElement(
              module12.View,
              {
                style: [
                  S.buttonsWrap,
                  {
                    backgroundColor: c.componentBackgroundColor,
                  },
                ],
              },
              s
            ),
            React.default.createElement(module385.GradientView, {
              colors: c.ModeSettingPanel.gradientBackground,
              start: {
                x: 0,
                y: 0,
              },
              end: {
                x: 1,
                y: 0,
              },
              style: [S.indicatorLine, _({}, this.getIndicatorLineLayout())],
            })
          );
        },
      },
    ]);
    return P;
  })(React.default.Component);

j.contextType = module515.AppConfigContext;

var S = module12.StyleSheet.create({
    tabWrap: {
      maxWidth: 300,
      height: module1159.TabWrapHeight,
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
      height: module1159.TabWrapHeight - 8,
      borderRadius: (module1159.TabWrapHeight - 4) / 2,
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
    _({}, module1159.BaseShadow),
    {},
    {
      radius: 10,
      style: {
        alignSelf: 'flex-start',
        marginBottom: 10,
        marginLeft: module1159.HorizontalMargin,
      },
    }
  ),
  B = module385.WithAutoLayoutShadow(j, k);

exports.default = B;
