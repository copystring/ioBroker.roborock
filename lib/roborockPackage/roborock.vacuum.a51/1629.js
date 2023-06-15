var module50 = require('./50'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module385 = require('./385'),
  module391 = require('./391'),
  module1193 = require('./1193'),
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

function x(t) {
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

function P() {
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

var O = (function (t) {
  module9.default(O, t);

  var module50 = O,
    module1193 = P(),
    w = function () {
      var t,
        o = module12.default(module50);

      if (module1193) {
        var u = module12.default(this).constructor;
        t = Reflect.construct(o, arguments, u);
      } else t = o.apply(this, arguments);

      return module11.default(this, t);
    };

  function O(t) {
    var n;
    module6.default(this, O);
    (n = w.call(this, t)).layoutMap = {};
    n.state = {
      selectedIndex: undefined == module394.MC.customTabIndex ? t.current : module394.MC.customTabIndex,
    };
    return n;
  }

  module7.default(O, [
    {
      key: 'onPressButton',
      value: function (t) {
        var n = this.props,
          o = n.tabWillChange,
          u = undefined === o || o,
          l = n.onPressTab;

        if (('function' == typeof u && u(t)) || true === u) {
          this.setState({
            selectedIndex: t,
          });
          if (l) l(t);
          module394.MC.customTabIndex = t;
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
              left: t.x + this.tabHPadding,
              width: t.width - 2 * this.tabHPadding,
              bottom: 0,
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
          s = this.context.theme,
          c = this.isFolding ? module13.Dimensions.get('window').width : module13.Dimensions.get('window').width - 30,
          b = this.isFolding ? 14 : 15,
          v = this.isFolding ? 13 : 16,
          w = l.map(function (n, u) {
            var h = t.state.selectedIndex === u;
            return React.default.createElement(module385.PureButton, {
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
              textColor: h ? s.homeBottomControl.tabSelectedColor : s.homeBottomControl.tabNormalColor,
              fontSize: module391.default.scaledPixelForPad(h ? v : b),
              fontWeight: h ? 'bold' : 'normal',
              maxTextWidth: c / l.length,
              style: [
                C.tabButton,
                {
                  paddingHorizontal: t.tabHPadding,
                },
                t.isFolding
                  ? {
                      height: 25,
                    }
                  : {},
              ],
            });
          });
        return React.default.createElement(
          module13.View,
          {
            style: C.tabWrap,
            onLayout: function (t) {
              return u && u(t.nativeEvent.layout);
            },
          },
          React.default.createElement(
            module13.View,
            {
              style: C.buttonsWrap,
            },
            w
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
            style: [C.indicatorLine, x({}, this.getIndicatorLineLayout())],
          })
        );
      },
    },
    {
      key: 'isFolding',
      get: function () {
        return module13.Dimensions.get('window').width < 330;
      },
    },
    {
      key: 'tabHPadding',
      get: function () {
        return this.isFolding ? 5 : 10;
      },
    },
  ]);
  return O;
})(React.default.Component);

exports.default = O;
O.contextType = module1193.AppConfigContext;
var C = module13.StyleSheet.create({
  tabWrap: {
    marginVertical: 10,
    marginLeft: 20,
    marginRight: 10,
    alignSelf: 'flex-start',
  },
  buttonsWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    paddingVertical: 4,
    backgroundColor: 'transparent',
  },
  tabButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
  },
  indicatorLine: {
    position: 'absolute',
    height: 2,
    backgroundColor: '#72B4FE',
  },
});
