var module4 = require('./4'),
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
    var o = h(n);
    if (o && o.has(t)) return o.get(t);
    var l = {},
      s = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var u in t)
      if ('default' !== u && Object.prototype.hasOwnProperty.call(t, u)) {
        var c = s ? Object.getOwnPropertyDescriptor(t, u) : null;
        if (c && (c.get || c.set)) Object.defineProperty(l, u, c);
        else l[u] = t[u];
      }

    l.default = t;
    if (o) o.set(t, l);
    return l;
  })(require('react')),
  module12 = require('./12'),
  module1015 = require('./1015');

function h(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (h = function (t) {
    return t ? o : n;
  })(t);
}

function v() {
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

var y = (function (t) {
  module7.default(S, t);

  var module1015 = S,
    h = v(),
    y = function () {
      var t,
        n = module11.default(module1015);

      if (h) {
        var o = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function S(t) {
    var o;
    module4.default(this, S);
    (o = y.call(this, t))._isIdle = true;
    o._isInitial = true;

    o._setInitialPage = function () {
      if (o.props.layout.width) {
        o._isInitial = true;

        o._scrollTo(o.props.navigationState.index * o.props.layout.width, false);
      }

      setTimeout(function () {
        o._isInitial = false;
      }, 50);
    };

    o._scrollTo = function (t) {
      var n = !(arguments.length > 1 && undefined !== arguments[1]) || arguments[1];
      if (o._isIdle && o._scrollView)
        o._scrollView.scrollTo({
          x: t,
          animated: n && false !== o.props.animationEnabled,
        });
    };

    o._handleMomentumScrollEnd = function (t) {
      var n = Math.round(t.nativeEvent.contentOffset.x / o.props.layout.width),
        l = o.props.navigationState.routes[n];

      if (o.props.canJumpToTab(l)) {
        o.props.jumpTo(l.key);
        if (o.props.onAnimationEnd) o.props.onAnimationEnd();
      } else
        globals.requestAnimationFrame(function () {
          o._scrollTo(o.props.navigationState.index * o.props.layout.width);
        });
    };

    o._handleScroll = function (t) {
      if (!o._isInitial && 0 !== t.nativeEvent.contentSize.width) {
        var n = o.props,
          l = n.navigationState,
          s = n.layout,
          u = l.index * s.width;
        o.props.offsetX.setValue(-u);
        o.props.panX.setValue(u - t.nativeEvent.contentOffset.x);
        globals.cancelAnimationFrame(o._idleCallback);
        o._isIdle = false;
        o._idleCallback = globals.requestAnimationFrame(function () {
          o._isIdle = true;
        });
      }
    };

    var l = o.props,
      s = l.navigationState,
      u = l.layout;
    o.state = {
      initialOffset: {
        x: s.index * u.width,
        y: 0,
      },
    };
    return o;
  }

  module5.default(S, [
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
        if (t.navigationState.routes !== this.props.navigationState.routes || t.layout.width !== this.props.layout.width) this._scrollTo(n, false);
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
          u = n.onSwipeStart,
          f = n.onSwipeEnd;
        return (
          <module12.ScrollView
            horizontal
            pagingEnabled
            directionalLockEnabled
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="always"
            overScrollMode="never"
            scrollEnabled={this.props.swipeEnabled}
            automaticallyAdjustContentInsets={false}
            bounces={false}
            alwaysBounceHorizontal={false}
            scrollsToTop={false}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={1}
            onScroll={this._handleScroll}
            onScrollBeginDrag={u}
            onScrollEndDrag={f}
            onMomentumScrollEnd={this._handleMomentumScrollEnd}
            contentOffset={this.state.initialOffset}
            style={w.container}
            contentContainerStyle={l.width ? null : w.container}
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
  return S;
})(React.Component);

exports.default = y;
y.propTypes = module1015.PagerRendererPropType;
y.defaultProps = {
  canJumpToTab: function () {
    return true;
  },
};
var w = module12.StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    flex: 1,
    overflow: 'hidden',
  },
});
