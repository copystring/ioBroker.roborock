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
  module390 = require('./390');

function x(t, n) {
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
      x(Object(u), true).forEach(function (o) {
        module49.default(t, o, u[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(u));
    else
      x(Object(u)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(u, n));
      });
  }

  return t;
}

function C() {
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

require('./491').strings;

var P = (function (t) {
  module7.default(P, t);

  var module49 = P,
    module506 = C(),
    x = function () {
      var t,
        o = module11.default(module49);

      if (module506) {
        var u = module11.default(this).constructor;
        t = Reflect.construct(o, arguments, u);
      } else t = o.apply(this, arguments);

      return module9.default(this, t);
    };

  function P(t) {
    var n;
    module4.default(this, P);
    (n = x.call(this, t)).layoutMap = {};
    n.state = {
      selectedIndex: undefined == module390.MC.customTabIndex ? t.current : module390.MC.customTabIndex,
    };
    return n;
  }

  module5.default(P, [
    {
      key: 'onPressButton',
      value: function (t) {
        this.setState({
          selectedIndex: t,
        });
        var n = this.props,
          o = n.tabWillChange,
          u = undefined === o || o,
          l = n.onPressTab;

        if (u && u(t)) {
          if (l) l(t);
          module390.MC.customTabIndex = t;
        }
      },
    },
    {
      key: 'didLayout',
      value: function (t, n) {
        var o = t.nativeEvent.layout;
        this.layoutMap[n] = o;

        if (Object.keys(this.layoutMap).length == this.props.tabs.length) {
          console.log('custom tab layout ready', this.layoutMap);
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
              left: t.x + 20,
              width: t.width - 40,
            }
          : {};
      },
    },
    {
      key: 'changeTab',
      value: function (t) {
        this.setState({
          selectedIndex: t,
        });
      },
    },
    {
      key: 'render',
      value: function () {
        var t = this;
        console.log('custom tab render', this.state.selectedIndex);
        var n = this.props,
          o = n.enabled,
          u = n.onLayout,
          l = n.tabs,
          c = this.context.theme,
          s = l.map(function (n, u) {
            var l = t.state.selectedIndex === u;
            return React.default.createElement(module381.PureButton, {
              onPress: function () {
                return t.onPressButton(u);
              },
              key: u,
              onLayout: function (n) {
                return t.didLayout(n, u);
              },
              title: n,
              funcId: 'custom_mode_panel_tab_' + u,
              enabled: o,
              textColor: l ? c.homeBottomControl.tabSelectedColor : c.homeBottomControl.tabNormalColor,
              fontSize: module387.default.scaledPixel(l ? 17 : 16),
              fontWeight: l ? 'bold' : 'normal',
              textStyle: j.btnText,
              style: [j.tabButton],
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
                  backgroundColor: 'transparent',
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
            style: [j.indicatorLine, O({}, this.getIndicatorLineLayout())],
          })
        );
      },
    },
  ]);
  return P;
})(React.default.Component);

exports.default = P;
P.contextType = module506.AppConfigContext;
var j = module12.StyleSheet.create({
  tabWrap: {
    maxWidth: 300,
    height: 40,
    marginBottom: 12,
    alignSelf: 'flex-start',
    backgroundColor: 'transparent',
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
    height: 40,
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
  },
  indicatorLine: {
    position: 'absolute',
    height: 2,
    bottom: 0,
    backgroundColor: '#72B4FE',
  },
});
