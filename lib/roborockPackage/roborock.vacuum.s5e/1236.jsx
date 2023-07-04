var module56 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module50 = require('./50'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  PropTypes = require('prop-types'),
  module12 = require('./12'),
  module1237 = require('./1237'),
  module1240 = require('./1240'),
  module1239 = require('./1239');

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
  for (var n = 1; n < arguments.length; n++) {
    var o = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      w(Object(o), true).forEach(function (n) {
        module50.default(t, n, o[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(o));
    else
      w(Object(o)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(o, n));
      });
  }

  return t;
}

function T() {
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

var _ = (function (t) {
  module7.default(b, t);

  var n = b,
    module50 = T(),
    h = function () {
      var t,
        o = module11.default(n);

      if (module50) {
        var s = module11.default(this).constructor;
        t = Reflect.construct(o, arguments, s);
      } else t = o.apply(this, arguments);

      return module9.default(this, t);
    };

  function b(t) {
    var n;
    module4.default(this, b);
    (n = h.call(this, t))._mounted = false;

    n._renderScene = function (t) {
      return n.props.renderScene(t);
    };

    n._handleLayout = function (t) {
      var o = t.nativeEvent.layout,
        u = o.height,
        s = o.width;

      if (!(n.state.layout.width === s && n.state.layout.height === u)) {
        n.state.panX.setValue(0);
        n.state.offsetX.setValue(-n.props.navigationState.index * s);
        n.state.layoutXY.setValue({
          x: s || 0.001,
          y: u || 0.001,
        });
        n.setState({
          layout: {
            measured: true,
            height: u,
            width: s,
          },
        });
      }
    };

    n._buildSceneRendererProps = function () {
      return {
        panX: n.state.panX,
        offsetX: n.state.offsetX,
        position: n.state.position,
        layout: n.state.layout,
        navigationState: n.props.navigationState,
        jumpTo: n._jumpTo,
        useNativeDriver: true === n.props.useNativeDriver,
      };
    };

    n._jumpTo = function (t) {
      if (n._mounted) {
        var o = n.props,
          u = o.canJumpToTab,
          s = o.navigationState,
          c = s.routes.findIndex(function (n) {
            return n.key === t;
          });
        if (u(s.routes[c]) && c !== s.index) n.props.onIndexChange(c);
      }
    };

    var o = n.props.navigationState,
      u = O(
        O({}, n.props.initialLayout),
        {},
        {
          measured: false,
        }
      ),
      c = new module12.Animated.Value(0),
      l = new module12.Animated.Value(-o.index * u.width),
      f = new module12.Animated.ValueXY({
        x: u.width || 0.001,
        y: u.height || 0.001,
      }),
      p = module12.Animated.multiply(module12.Animated.divide(module12.Animated.add(c, l), f.x), -1);
    n.state = {
      layout: u,
      layoutXY: f,
      panX: c,
      offsetX: l,
      position: p,
      renderUnfocusedScenes: false,
    };
    return n;
  }

  module5.default(b, [
    {
      key: 'componentDidMount',
      value: function () {
        var t = this;
        this._mounted = true;
        setTimeout(function () {
          return t.setState({
            renderUnfocusedScenes: true,
          });
        }, 0);
      },
    },
    {
      key: 'componentWillUnmount',
      value: function () {
        this._mounted = false;
      },
    },
    {
      key: 'render',
      value: function () {
        var t = this,
          n = this.props,
          u = n.navigationState,
          s = n.renderPager,
          c = n.renderTabBar,
          l = n.tabBarPosition,
          f = module56.default(n, ['navigationState', 'onIndexChange', 'initialLayout', 'renderScene', 'renderPager', 'renderTabBar', 'tabBarPosition']),
          p = this._buildSceneRendererProps();

        return (
          <module12.View collapsable={false} style={[j.container, this.props.style]}>
            {'top' === l && c(p)}
            <module12.View onLayout={this._handleLayout} style={j.pager}>
              {s(
                O(
                  O(O({}, p), f),
                  {},
                  {
                    panX: this.state.panX,
                    offsetX: this.state.offsetX,
                    children: u.routes.map(function (n, o) {
                      var u;
                      u =
                        t.props.navigationState.index === o || t.state.renderUnfocusedScenes ? (
                          t._renderScene(
                            O(
                              O({}, p),
                              {},
                              {
                                route: n,
                              }
                            )
                          )
                        ) : (
                          <module12.View />
                        );
                      if (React.isValidElement(u))
                        u = React.cloneElement(u, {
                          key: n.key,
                        });
                      return u;
                    }),
                  }
                )
              )}
            </module12.View>
            {'bottom' === l && c(p)}
          </module12.View>
        );
      },
    },
  ]);
  return b;
})(React.Component);

exports.default = _;
_.propTypes = {
  navigationState: module1239.NavigationStatePropType.isRequired,
  onIndexChange: PropTypes.default.func.isRequired,
  initialLayout: PropTypes.default.shape({
    height: PropTypes.default.number.isRequired,
    width: PropTypes.default.number.isRequired,
  }),
  canJumpToTab: PropTypes.default.func.isRequired,
  renderPager: PropTypes.default.func.isRequired,
  renderScene: PropTypes.default.func.isRequired,
  renderTabBar: PropTypes.default.func,
  tabBarPosition: PropTypes.default.oneOf(['top', 'bottom']),
};
_.defaultProps = {
  canJumpToTab: function () {
    return true;
  },
  tabBarPosition: 'top',
  renderTabBar: function (t) {
    return <module1237.default />;
  },
  renderPager: function (t) {
    return <module1240.default />;
  },
  getTestID: function (t) {
    var n = t.route;
    return 'string' == typeof n.testID ? n.testID : undefined;
  },
  initialLayout: {
    height: 0,
    width: 0,
  },
  useNativeDriver: false,
};
var j = module12.StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  pager: {
    flex: 1,
  },
});
