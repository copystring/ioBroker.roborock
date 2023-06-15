var module50 = require('./50'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module385 = require('./385'),
  module391 = require('./391'),
  module1121 = require('./1121'),
  module1355 = require('./1355'),
  module1546 = require('./1546'),
  module394 = require('./394');

function w(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(t);
    if (n)
      u = u.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, u);
  }

  return o;
}

function O(t) {
  for (var o = 1; o < arguments.length; o++) {
    var u = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      w(Object(u), true).forEach(function (o) {
        module50.default(t, o, u[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(u));
    else
      w(Object(u)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(u, n));
      });
  }

  return t;
}

function _() {
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

var module505 = require('./505').strings,
  k = (function (t) {
    module7.default(w, t);

    var module50 = w,
      module1121 = _(),
      v = function () {
        var t,
          o = module11.default(module50);

        if (module1121) {
          var u = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, u);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function w(t) {
      var n;
      module4.default(this, w);
      (n = v.call(this, t)).layoutMap = {};
      n.state = {
        selectedIndex: undefined == module394.MC.tabIndex ? module1546.TabNeutral : module394.MC.tabIndex,
      };
      return n;
    }

    module5.default(w, [
      {
        key: 'onPressButton',
        value: function (t) {
          if (this.props.onPressTab) this.props.onPressTab(t);
        },
      },
      {
        key: 'didLayout',
        value: function (t, n) {
          var o = t.nativeEvent.layout;
          this.layoutMap[n] = o;

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
                left: t.x + this.tabHPadding,
                width: t.width - 2 * this.tabHPadding,
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
          var n = this.props,
            o = n.enabled,
            u = n.onLayout,
            l = [module505.home_bottom_menu_global, module505.home_bottom_menu_select_zone, module505.home_bottom_menu_draw_zone],
            s = this.context.theme,
            c = l.map(function (n, u) {
              var l = t.state.selectedIndex === u;
              return React.default.createElement(module385.PureButton, {
                onPress: function () {
                  return t.onPressButton(u);
                },
                key: u,
                onLayout: function (n) {
                  return t.didLayout(n, u);
                },
                title: n,
                funcId: 'home_tab_' + u,
                enabled: o,
                textColor: l ? s.homeBottomControl.tabSelectedColor : s.homeBottomControl.tabNormalColor,
                fontSize: module391.default.scaledPixelForPad(l ? 15 : 14),
                fontWeight: l ? 'bold' : 'normal',
                textStyle: j.btnText,
                style: [
                  j.tabButton,
                  {
                    paddingHorizontal: t.tabHPadding,
                  },
                ],
              });
            });
          return React.default.createElement(
            module12.View,
            {
              style: j.tabWrap,
              onLayout: function (t) {
                return u && u(t.nativeEvent.layout);
              },
            },
            React.default.createElement(
              module12.View,
              {
                style: [
                  j.buttonsWrap,
                  {
                    backgroundColor: s.componentBackgroundColor,
                    paddingHorizontal: this.isFolding ? 5 : 20,
                  },
                ],
              },
              c
            ),
            React.default.createElement(module385.GradientView, {
              colors: s.ModeSettingPanel.gradientBackground,
              start: {
                x: 0,
                y: 0,
              },
              end: {
                x: 1,
                y: 0,
              },
              style: [j.indicatorLine, O({}, this.getIndicatorLineLayout())],
            })
          );
        },
      },
      {
        key: 'isFolding',
        get: function () {
          return module12.Dimensions.get('window').width < 330;
        },
      },
      {
        key: 'tabHPadding',
        get: function () {
          return this.isFolding ? 8 : 12;
        },
      },
    ]);
    return w;
  })(React.default.Component);

k.contextType = module1121.AppConfigContext;
var j = module12.StyleSheet.create({
    tabWrap: {
      maxWidth: 300,
      height: module1355.TabWrapHeight,
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
      height: module1355.TabWrapHeight - 8,
      borderRadius: (module1355.TabWrapHeight - 4) / 2,
      backgroundColor: 'transparent',
    },
    indicatorLine: {
      position: 'absolute',
      height: 2,
      bottom: 0,
      backgroundColor: '#72B4FE',
    },
  }),
  S = O(
    O({}, module1355.BaseShadow),
    {},
    {
      radius: 10,
      style: {
        alignSelf: 'flex-start',
        marginBottom: 10,
        marginLeft: module1355.HorizontalMargin,
      },
    }
  ),
  B = module385.WithAutoLayoutShadow(k, S);
exports.default = B;
