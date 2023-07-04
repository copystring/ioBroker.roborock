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
  module394 = require('./394');

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

function w(t) {
  for (var o = 1; o < arguments.length; o++) {
    var u = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      x(Object(u), true).forEach(function (o) {
        module50.default(t, o, u[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(u));
    else
      x(Object(u)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(u, n));
      });
  }

  return t;
}

function O() {
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

var P = (function (t) {
  module7.default(P, t);

  var module50 = P,
    module515 = O(),
    x = function () {
      var t,
        o = module11.default(module50);

      if (module515) {
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
      selectedIndex: undefined == module394.MC.customTabIndex ? t.current : module394.MC.customTabIndex,
    };
    return n;
  }

  module5.default(P, [
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
              left: t.x + 10,
              width: t.width - 20,
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
          c = this.context.theme,
          s = l.map(function (n, u) {
            var s = t.state.selectedIndex === u;
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
              textColor: s ? c.homeBottomControl.tabSelectedColor : c.homeBottomControl.tabNormalColor,
              fontSize: module391.default.scaledPixelForPad(s ? 16 : 15),
              fontWeight: s ? 'bold' : 'normal',
              textStyle: C.btnText,
              maxTextWidth: (module12.Dimensions.get('window').width - 30) / l.length,
              style: [C.tabButton],
            });
          });
        return React.default.createElement(
          module12.View,
          {
            style: [
              C.tabWrap,
              {
                maxWidth: module12.Dimensions.get('window').width - 30,
              },
            ],
            onLayout: function (t) {
              return u && u(t.nativeEvent.layout);
            },
          },
          React.default.createElement(
            module12.View,
            {
              style: [
                C.buttonsWrap,
                {
                  backgroundColor: 'transparent',
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
            style: [C.indicatorLine, w({}, this.getIndicatorLineLayout())],
          })
        );
      },
    },
  ]);
  return P;
})(React.default.Component);

exports.default = P;
P.contextType = module515.AppConfigContext;
var C = module12.StyleSheet.create({
  tabWrap: {
    marginVertical: 10,
    marginLeft: 20,
    alignSelf: 'flex-start',
  },
  buttonsWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 4,
    borderRadius: 10,
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
