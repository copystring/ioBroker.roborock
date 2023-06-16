var n,
  module55 = require('@babel/runtime/helpers/defineEnumerableProperties'),
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
    var o = O(n);
    if (o && o.has(t)) return o.get(t);
    var u = {},
      f = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var c in t)
      if ('default' !== c && Object.prototype.hasOwnProperty.call(t, c)) {
        var l = f ? Object.getOwnPropertyDescriptor(t, c) : null;
        if (l && (l.get || l.set)) Object.defineProperty(u, c, l);
        else u[c] = t[c];
      }

    u.default = t;
    if (o) o.set(t, u);
    return u;
  })(require('react')),
  PropTypes = require('prop-types'),
  module12 = require('./12'),
  module1017 = require('./1017'),
  j = ['navigationState', 'onIndexChange', 'initialLayout', 'renderScene', 'renderPager', 'renderHeader', 'renderFooter'];

function O(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (O = function (t) {
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

function P(t) {
  for (var n = 1; n < arguments.length; n++) {
    var o = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      w(Object(o), true).forEach(function (n) {
        module49.default(t, n, o[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(o));
    else
      w(Object(o)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(o, n));
      });
  }

  return t;
}

function S() {
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

switch (module12.Platform.OS) {
  case 'android':
    n = require('./1018').default;
    break;

  case 'ios':
    n = require('./1019').default;
    break;

  default:
    n = require('./1020').default;
}

var x = (function (t) {
  module7.default(b, t);

  var n = b,
    module49 = S(),
    h = function () {
      var t,
        o = module11.default(n);

      if (module49) {
        var f = module11.default(this).constructor;
        t = Reflect.construct(o, arguments, f);
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
        f = o.width;

      if (!(n.state.layout.width === f && n.state.layout.height === u)) {
        n.state.offsetX.setValue(-n.props.navigationState.index * f);
        n.state.layoutXY.setValue({
          x: f || 0.001,
          y: u || 0.001,
        });
        n.setState({
          layout: {
            measured: true,
            height: u,
            width: f,
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
        jumpToIndex: n._jumpToIndex,
        useNativeDriver: true === n.props.useNativeDriver,
      };
    };

    n._jumpToIndex = function (t) {
      var o = n.props.navigationState.routes[t].key;
      console.warn(
        'Method `jumpToIndex` is deprecated. Please upgrade your code to use `jumpTo` instead.',
        'Change your code from `jumpToIndex(' + t + ")` to `jumpTo('" + o + "').`"
      );

      n._jumpTo(o);
    };

    n._jumpTo = function (t) {
      if (n._mounted) {
        var o = n.props,
          u = o.canJumpToTab,
          f = o.navigationState,
          c = f.routes.findIndex(function (n) {
            return n.key === t;
          });
        if (u(f.routes[c]) && c !== f.index) n.props.onIndexChange(c);
      }
    };

    var o = n.props.navigationState,
      u = P(
        P({}, n.props.initialLayout),
        {},
        {
          measured: false,
        }
      ),
      c = new module12.Animated.Value(0),
      l = new module12.Animated.Value(-o.index * u.width),
      s = new module12.Animated.ValueXY({
        x: u.width || 0.001,
        y: u.height || 0.001,
      }),
      p = module12.Animated.multiply(module12.Animated.divide(module12.Animated.add(c, l), s.x), -1);
    n.state = {
      layout: u,
      layoutXY: s,
      panX: c,
      offsetX: l,
      position: p,
    };
    return n;
  }

  module5.default(b, [
    {
      key: 'componentDidMount',
      value: function () {
        this._mounted = true;
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
          f = n.renderPager,
          c = n.renderHeader,
          l = n.renderFooter,
          s = module55.default(n, j),
          p = this._buildSceneRendererProps();

        return (
          <module12.View collapsable={false} style={[_.container, this.props.style]}>
            {c && c(p)}
            <module12.View onLayout={this._handleLayout} style={_.pager}>
              {f(
                P(
                  P(P({}, p), s),
                  {},
                  {
                    panX: this.state.panX,
                    offsetX: this.state.offsetX,
                    children: u.routes.map(function (n, o) {
                      var f = t._renderScene(
                        P(
                          P({}, p),
                          {},
                          {
                            route: n,
                            index: o,
                            focused: o === u.index,
                          }
                        )
                      );

                      return f
                        ? React.cloneElement(f, {
                            key: n.key,
                          })
                        : f;
                    }),
                  }
                )
              )}
            </module12.View>
            {l && l(p)}
          </module12.View>
        );
      },
    },
  ]);
  return b;
})(React.Component);

exports.default = x;
x.propTypes = {
  navigationState: module1017.NavigationStatePropType.isRequired,
  onIndexChange: PropTypes.default.func.isRequired,
  initialLayout: PropTypes.default.shape({
    height: PropTypes.default.number.isRequired,
    width: PropTypes.default.number.isRequired,
  }),
  canJumpToTab: PropTypes.default.func.isRequired,
  renderPager: PropTypes.default.func.isRequired,
  renderScene: PropTypes.default.func.isRequired,
  renderHeader: PropTypes.default.func,
  renderFooter: PropTypes.default.func,
};
x.defaultProps = {
  canJumpToTab: function () {
    return true;
  },
  renderPager: function (t) {
    return <n />;
  },
  initialLayout: {
    height: 0,
    width: 0,
  },
  useNativeDriver: false,
};

var _ = module12.StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  pager: {
    flex: 1,
  },
});
