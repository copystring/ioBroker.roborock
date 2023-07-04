var module50 = require('./50'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  PropTypes = require('prop-types'),
  module13 = require('./13'),
  module1317 = require('./1317');

function w(t, n) {
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

function b(t) {
  for (var n = 1; n < arguments.length; n++) {
    var l = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      w(Object(l), true).forEach(function (n) {
        module50.default(t, n, l[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(l));
    else
      w(Object(l)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(l, n));
      });
  }

  return t;
}

function S() {
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
  module9.default(y, t);

  var n = y,
    module50 = S(),
    h = function () {
      var t,
        l = module12.default(n);

      if (module50) {
        var s = module12.default(this).constructor;
        t = Reflect.construct(l, arguments, s);
      } else t = l.apply(this, arguments);

      return module11.default(this, t);
    };

  function y(t) {
    var n;
    module6.default(this, y);
    (n = h.call(this, t))._isIdle = true;
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

    var o = n.props,
      s = o.navigationState,
      c = o.layout;
    n.state = {
      initialOffset: {
        x: s.index * c.width,
        y: 0,
      },
    };
    return n;
  }

  module7.default(y, [
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
          p = n.bounces;
        return (
          <module13.ScrollView
            horizontal
            pagingEnabled
            directionalLockEnabled
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="always"
            overScrollMode="never"
            scrollToOverflowEnabled
            scrollEnabled={this.props.swipeEnabled}
            automaticallyAdjustContentInsets={false}
            bounces={p}
            alwaysBounceHorizontal={p}
            scrollsToTop={false}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={1}
            onScroll={this._handleScroll}
            onScrollBeginDrag={c}
            onScrollEndDrag={u}
            onMomentumScrollEnd={this._handleMomentumScrollEnd}
            contentOffset={this.state.initialOffset}
            style={O.container}
            contentContainerStyle={l.width ? null : O.container}
            ref={function (n) {
              return (t._scrollView = n);
            }}
          >
            <o />
          </module13.ScrollView>
        );
      },
    },
  ]);
  return y;
})(React.Component);

exports.default = _;
_.propTypes = b(
  b({}, module1317.PagerRendererPropType),
  {},
  {
    bounces: PropTypes.default.bool.isRequired,
  }
);
_.defaultProps = {
  canJumpToTab: function () {
    return true;
  },
  bounces: false,
};
var O = module13.StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    flex: 1,
    overflow: 'hidden',
  },
});
