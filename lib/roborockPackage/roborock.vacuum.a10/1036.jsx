var module55 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module49 = require('./49'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = (function (t, n) {
    if (!n && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var o = S(n);
    if (o && o.has(t)) return o.get(t);
    var u = {},
      s = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var f in t)
      if ('default' !== f && Object.prototype.hasOwnProperty.call(t, f)) {
        var c = s ? Object.getOwnPropertyDescriptor(t, f) : null;
        if (c && (c.get || c.set)) Object.defineProperty(u, f, c);
        else u[f] = t[f];
      }

    u.default = t;
    if (o) o.set(t, u);
    return u;
  })(require('react')),
  PropTypes = require('prop-types'),
  module12 = require('./12'),
  module1037 = require('./1037'),
  module1040 = require('./1040'),
  module1039 = require('./1039'),
  P = ['navigationState', 'onIndexChange', 'initialLayout', 'renderScene', 'renderPager', 'renderTabBar', 'tabBarPosition'];

function S(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (S = function (t) {
    return t ? o : n;
  })(t);
}

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

function j(t) {
  for (var n = 1; n < arguments.length; n++) {
    var u = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      w(Object(u), true).forEach(function (n) {
        module49.default(t, n, u[n]);
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
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (t) {
    return false;
  }
}

var T = (function (t) {
  module7.default(b, t);

  var module49 = b,
    PropTypes = _(),
    v = function () {
      var t,
        n = module11.default(module49);

      if (PropTypes) {
        var u = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, u);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function b(t) {
    var n;
    module4.default(this, b);
    (n = v.call(this, t))._mounted = false;

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
          f = s.routes.findIndex(function (n) {
            return n.key === t;
          });
        if (u(s.routes[f]) && f !== s.index) n.props.onIndexChange(f);
      }
    };

    var o = n.props.navigationState,
      s = j(
        j({}, n.props.initialLayout),
        {},
        {
          measured: false,
        }
      ),
      f = new module12.Animated.Value(0),
      c = new module12.Animated.Value(-o.index * s.width),
      l = new module12.Animated.ValueXY({
        x: s.width || 0.001,
        y: s.height || 0.001,
      }),
      p = module12.Animated.multiply(module12.Animated.divide(module12.Animated.add(f, c), l.x), -1);
    n.state = {
      layout: s,
      layoutXY: l,
      panX: f,
      offsetX: c,
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
          o = this.props,
          u = o.navigationState,
          s = o.renderPager,
          f = o.renderTabBar,
          c = o.tabBarPosition,
          l = module55.default(o, P),
          y = this._buildSceneRendererProps();

        return (
          <module12.View collapsable={false} style={[x.container, this.props.style]}>
            {'top' === c && f(y)}
            <module12.View onLayout={this._handleLayout} style={x.pager}>
              {s(
                j(
                  j(j({}, y), l),
                  {},
                  {
                    panX: this.state.panX,
                    offsetX: this.state.offsetX,
                    children: u.routes.map(function (n, o) {
                      var u;
                      u =
                        t.props.navigationState.index === o || t.state.renderUnfocusedScenes ? (
                          t._renderScene(
                            j(
                              j({}, y),
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
            {'bottom' === c && f(y)}
          </module12.View>
        );
      },
    },
  ]);
  return b;
})(React.Component);

exports.default = T;
T.propTypes = {
  navigationState: module1039.NavigationStatePropType.isRequired,
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
T.defaultProps = {
  canJumpToTab: function () {
    return true;
  },
  tabBarPosition: 'top',
  renderTabBar: function (t) {
    return <module1037.default />;
  },
  renderPager: function (t) {
    return <module1040.default />;
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
var x = module12.StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  pager: {
    flex: 1,
  },
});
