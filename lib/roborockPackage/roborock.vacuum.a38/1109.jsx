var o,
  module56 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module50 = require('./50'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  PropTypes = require('prop-types'),
  module12 = require('./12'),
  module1110 = require('./1110');

function j(t, n) {
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
  for (var n = 1; n < arguments.length; n++) {
    var o = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      j(Object(o), true).forEach(function (n) {
        module50.default(t, n, o[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(o));
    else
      j(Object(o)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(o, n));
      });
  }

  return t;
}

function x() {
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

switch (module12.Platform.OS) {
  case 'android':
    o = require('./1111').default;
    break;

  case 'ios':
    o = require('./1112').default;
    break;

  default:
    o = require('./1113').default;
}

var P = (function (t) {
  module7.default(v, t);

  var n = v,
    o = x(),
    s = function () {
      var t,
        u = module11.default(n);

      if (o) {
        var s = module11.default(this).constructor;
        t = Reflect.construct(u, arguments, s);
      } else t = u.apply(this, arguments);

      return module9.default(this, t);
    };

  function v(t) {
    var n;
    module4.default(this, v);
    (n = s.call(this, t))._mounted = false;

    n._renderScene = function (t) {
      return n.props.renderScene(t);
    };

    n._handleLayout = function (t) {
      var o = t.nativeEvent.layout,
        u = o.height,
        s = o.width;

      if (!(n.state.layout.width === s && n.state.layout.height === u)) {
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
          s = o.navigationState,
          c = s.routes.findIndex(function (n) {
            return n.key === t;
          });
        if (u(s.routes[c]) && c !== s.index) n.props.onIndexChange(c);
      }
    };

    var o = n.props.navigationState,
      u = w(
        w({}, n.props.initialLayout),
        {},
        {
          measured: false,
        }
      ),
      f = new module12.Animated.Value(0),
      l = new module12.Animated.Value(-o.index * u.width),
      p = new module12.Animated.ValueXY({
        x: u.width || 0.001,
        y: u.height || 0.001,
      }),
      y = module12.Animated.multiply(module12.Animated.divide(module12.Animated.add(f, l), p.x), -1);
    n.state = {
      layout: u,
      layoutXY: p,
      panX: f,
      offsetX: l,
      position: y,
    };
    return n;
  }

  module5.default(v, [
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
          o = n.navigationState,
          s = n.renderPager,
          c = n.renderHeader,
          f = n.renderFooter,
          l = module56.default(n, ['navigationState', 'onIndexChange', 'initialLayout', 'renderScene', 'renderPager', 'renderHeader', 'renderFooter']),
          p = this._buildSceneRendererProps();

        return (
          <module12.View collapsable={false} style={[O.container, this.props.style]}>
            {c && c(p)}
            <module12.View onLayout={this._handleLayout} style={O.pager}>
              {s(
                w(
                  w(w({}, p), l),
                  {},
                  {
                    panX: this.state.panX,
                    offsetX: this.state.offsetX,
                    children: o.routes.map(function (n, u) {
                      var s = t._renderScene(
                        w(
                          w({}, p),
                          {},
                          {
                            route: n,
                            index: u,
                            focused: u === o.index,
                          }
                        )
                      );

                      return s
                        ? React.cloneElement(s, {
                            key: n.key,
                          })
                        : s;
                    }),
                  }
                )
              )}
            </module12.View>
            {f && f(p)}
          </module12.View>
        );
      },
    },
  ]);
  return v;
})(React.Component);

exports.default = P;
P.propTypes = {
  navigationState: module1110.NavigationStatePropType.isRequired,
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
P.defaultProps = {
  canJumpToTab: function () {
    return true;
  },
  renderPager: function (t) {
    return <o />;
  },
  initialLayout: {
    height: 0,
    width: 0,
  },
  useNativeDriver: false,
};
var O = module12.StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  pager: {
    flex: 1,
  },
});
