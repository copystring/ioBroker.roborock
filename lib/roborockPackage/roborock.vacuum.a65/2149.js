var module50 = require('./50'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module385 = require('./385'),
  module391 = require('./391'),
  module1200 = require('./1200'),
  module394 = require('./394'),
  module1435 = require('./1435');

function O(t, n) {
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

function P(t) {
  for (var o = 1; o < arguments.length; o++) {
    var u = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      O(Object(u), true).forEach(function (o) {
        module50.default(t, o, u[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(u));
    else
      O(Object(u)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(u, n));
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

require('./510').strings;

var C = (function (t) {
  module9.default(O, t);

  var module50 = O,
    module1200 = w(),
    x = function () {
      var t,
        o = module12.default(module50);

      if (module1200) {
        var u = module12.default(this).constructor;
        t = Reflect.construct(o, arguments, u);
      } else t = o.apply(this, arguments);

      return module11.default(this, t);
    };

  function O(t) {
    var n;
    module6.default(this, O);
    (n = x.call(this, t)).layoutMap = {};
    n.state = {};
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
              left: t.x + 15,
              width: t.width - 30,
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
        var t = this,
          n = this.props,
          o = n.enabled,
          u = n.onLayout,
          l = n.tabs,
          c = this.context.theme,
          s = l.map(function (n, u) {
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
              enabled: o,
              textColor: l ? c.homeBottomControl.tabSelectedColor : c.homeBottomControl.tabNormalColor,
              fontSize: module391.default.scaledPixel(l ? 15 : 14),
              fontWeight: l ? 'bold' : 'normal',
              textStyle: j.btnText,
              maxTextWidth: 150,
              style: [j.tabButton],
            });
          });
        return React.default.createElement(
          module13.View,
          {
            style: j.tabWrap,
            onLayout: function (t) {
              return u && u(t.nativeEvent.layout);
            },
          },
          React.default.createElement(
            module13.View,
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
            style: [j.indicatorLine, P({}, this.getIndicatorLineLayout())],
          })
        );
      },
    },
  ]);
  return O;
})(React.default.Component);

C.contextType = module1200.AppConfigContext;
var j = module13.StyleSheet.create({
    tabWrap: {
      maxWidth: 320,
      borderRadius: 10,
      paddingVertical: 10,
      alignSelf: 'flex-start',
      backgroundColor: 'white',
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
      backgroundColor: 'transparent',
      paddingHorizontal: 15,
    },
    indicatorLine: {
      position: 'absolute',
      height: 2,
      backgroundColor: '#72B4FE',
    },
  }),
  S = P(
    P({}, module1435.BaseShadow),
    {},
    {
      radius: 10,
      height: 90,
      style: {
        marginLeft: module1435.HorizontalMargin,
        position: 'absolute',
        bottom: 60,
        zIndex: 9,
      },
    }
  ),
  k = module385.WithAutoLayoutShadow(C, S);
exports.default = k;
