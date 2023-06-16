var module49 = require('./49'),
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
    var o = v(n);
    if (o && o.has(t)) return o.get(t);
    var l = {},
      s = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var c in t)
      if ('default' !== c && Object.prototype.hasOwnProperty.call(t, c)) {
        var u = s ? Object.getOwnPropertyDescriptor(t, c) : null;
        if (u && (u.get || u.set)) Object.defineProperty(l, c, u);
        else l[c] = t[c];
      }

    l.default = t;
    if (o) o.set(t, l);
    return l;
  })(require('react')),
  PropTypes = require('prop-types'),
  module12 = require('./12'),
  module1041 = require('./1041');

function v(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (v = function (t) {
    return t ? o : n;
  })(t);
}

function b(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var l = Object.getOwnPropertySymbols(t);
    if (n)
      l = l.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, l);
  }

  return o;
}

function w(t) {
  for (var o = 1; o < arguments.length; o++) {
    var l = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      b(Object(l), true).forEach(function (o) {
        module49.default(t, o, l[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(l));
    else
      b(Object(l)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(l, n));
      });
  }

  return t;
}

function O() {
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

var S = (function (t) {
  module7.default(v, t);

  var module49 = v,
    PropTypes = O(),
    y = function () {
      var t,
        o = module11.default(module49);

      if (PropTypes) {
        var l = module11.default(this).constructor;
        t = Reflect.construct(o, arguments, l);
      } else t = o.apply(this, arguments);

      return module9.default(this, t);
    };

  function v(t) {
    var n;
    module4.default(this, v);
    (n = y.call(this, t))._isIdle = true;
    n._isInitial = true;

    n._setInitialPage = function () {
      if (n.props.layout.width) {
        n._isInitial = true;

        n._scrollTo(n.props.navigationState.index * n.props.layout.width, false);
      }

      setTimeout(function () {
        n._isInitial = false;
      }, 50);
    };

    n._scrollTo = function (t) {
      var o = !(arguments.length > 1 && undefined !== arguments[1]) || arguments[1];
      if (n._isIdle && n._scrollView)
        n._scrollView.scrollTo({
          x: t,
          animated: o && false !== n.props.animationEnabled,
        });
    };

    n._handleMomentumScrollEnd = function (t) {
      var o = Math.round(t.nativeEvent.contentOffset.x / n.props.layout.width),
        l = n.props.navigationState.routes[o];

      if (
        n.props.canJumpToTab({
          route: l,
        })
      ) {
        n.props.jumpTo(l.key);
        if (n.props.onAnimationEnd) n.props.onAnimationEnd();
      } else
        globals.requestAnimationFrame(function () {
          n._scrollTo(n.props.navigationState.index * n.props.layout.width);
        });
    };

    n._handleScroll = function (t) {
      if (!n._isInitial && 0 !== t.nativeEvent.contentSize.width) {
        var o = n.props,
          l = o.navigationState,
          s = o.layout,
          c = l.index * s.width;
        n.props.offsetX.setValue(-c);
        n.props.panX.setValue(c - t.nativeEvent.contentOffset.x);
        globals.cancelAnimationFrame(n._idleCallback);
        n._isIdle = false;
        n._idleCallback = globals.requestAnimationFrame(function () {
          n._isIdle = true;
        });
      }
    };

    var l = n.props,
      s = l.navigationState,
      c = l.layout;
    n.state = {
      initialOffset: {
        x: s.index * c.width,
        y: 0,
      },
    };
    return n;
  }

  module5.default(v, [
    {
      key: 'componentDidMount',
      value: function () {
        this._setInitialPage();
      },
    },
    {
      key: 'componentDidUpdate',
      value: function (t) {
        var n = this.props.navigationState.index * this.props.layout.width;
        if (t.navigationState.routes.length !== this.props.navigationState.routes.length || t.layout.width !== this.props.layout.width) this._scrollTo(n, false);
        else if (t.navigationState.index !== this.props.navigationState.index) this._scrollTo(n);
      },
    },
    {
      key: 'render',
      value: function () {
        var t = this,
          n = this.props,
          o = n.children,
          l = n.layout,
          s = n.navigationState,
          c = n.onSwipeStart,
          u = n.onSwipeEnd,
          f = n.bounces;
        return (
          <module12.ScrollView
            horizontal
            pagingEnabled
            directionalLockEnabled
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="always"
            overScrollMode="never"
            scrollToOverflowEnabled
            scrollEnabled={this.props.swipeEnabled}
            automaticallyAdjustContentInsets={false}
            bounces={f}
            alwaysBounceHorizontal={f}
            scrollsToTop={false}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={1}
            onScroll={this._handleScroll}
            onScrollBeginDrag={c}
            onScrollEndDrag={u}
            onMomentumScrollEnd={this._handleMomentumScrollEnd}
            contentOffset={this.state.initialOffset}
            style={_.container}
            contentContainerStyle={l.width ? null : _.container}
            ref={function (n) {
              return (t._scrollView = n);
            }}
          >
            <o />
          </module12.ScrollView>
        );
      },
    },
  ]);
  return v;
})(React.Component);

exports.default = S;
S.propTypes = w(
  w({}, module1041.PagerRendererPropType),
  {},
  {
    bounces: PropTypes.default.bool.isRequired,
  }
);
S.defaultProps = {
  canJumpToTab: function () {
    return true;
  },
  bounces: false,
};

var _ = module12.StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    flex: 1,
    overflow: 'hidden',
  },
});
