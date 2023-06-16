var module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1318 = require('./1318');

function v() {
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

var S = (function (t) {
  module9.default(P, t);

  var n = P,
    module1318 = v(),
    S = function () {
      var t,
        o = module12.default(n);

      if (module1318) {
        var s = module12.default(this).constructor;
        t = Reflect.construct(o, arguments, s);
      } else t = o.apply(this, arguments);

      return module11.default(this, t);
    };

  function P(t) {
    var n;
    module6.default(this, P);
    (n = S.call(this, t))._isIdle = true;
    n._currentIndex = 0;

    n._getPageIndex = function (t) {
      return module13.I18nManager.isRTL ? n.props.navigationState.routes.length - (t + 1) : t;
    };

    n._setPage = function (t) {
      var o = !(arguments.length > 1 && undefined !== arguments[1]) || arguments[1],
        s = n._viewPager;

      if (s) {
        var l = n._getPageIndex(t);

        if (false === n.props.animationEnabled || false === o) s.setPageWithoutAnimation(l);
        else s.setPage(l);
      }
    };

    n._handlePageChange = function (t, o) {
      if (n._isIdle && n._currentIndex !== t) {
        n._setPage(t, o);

        n._currentIndex = t;
      }
    };

    n._handlePageScroll = function (t) {
      n.props.offsetX.setValue(n._getPageIndex(t.nativeEvent.position) * n.props.layout.width * -1);
      n.props.panX.setValue(t.nativeEvent.offset * n.props.layout.width * (module13.I18nManager.isRTL ? 1 : -1));
    };

    n._handlePageScrollStateChanged = function (t) {
      n._isIdle = 'string' != typeof t && t.nativeEvent ? 'idle' === t.nativeEvent.pageScrollState : 'idle' === t;
      var o = n._currentIndex,
        s = n.props.navigationState.routes[o];

      switch (
        (n.props.canJumpToTab({
          route: s,
        })
          ? n.props.jumpTo(s.key)
          : (n._setPage(n.props.navigationState.index), (n._currentIndex = n.props.navigationState.index)),
        t)
      ) {
        case 'dragging':
          if (n.props.onSwipeStart) n.props.onSwipeStart();
          break;

        case 'settling':
          if (n.props.onSwipeEnd) n.props.onSwipeEnd();
          break;

        case 'idle':
          if (n.props.onAnimationEnd) n.props.onAnimationEnd();
      }
    };

    n._handlePageSelected = function (t) {
      var o = n._getPageIndex(t.nativeEvent.position);

      n._currentIndex = o;
    };

    n._currentIndex = n.props.navigationState.index;
    return n;
  }

  module7.default(P, [
    {
      key: 'componentDidUpdate',
      value: function (t) {
        if (t.navigationState.routes.length !== this.props.navigationState.routes.length || t.layout.width !== this.props.layout.width)
          this._handlePageChange(this.props.navigationState.index, false);
        else if (t.navigationState.index !== this.props.navigationState.index) this._handlePageChange(this.props.navigationState.index);
      },
    },
    {
      key: 'render',
      value: function () {
        var t = this,
          n = this.props,
          o = n.navigationState,
          s = n.swipeEnabled,
          l = n.keyboardDismissMode,
          p = (module13.I18nManager.isRTL ? React.Children.toArray(this.props.children).reverse() : React.Children.toArray(this.props.children)).map(function (n, s) {
            var l = o.routes[s],
              p = s === o.index;
            return (
              <module13.View
                key={l.key}
                testID={t.props.getTestID({
                  route: l,
                })}
                accessibilityElementsHidden={!p}
                importantForAccessibility={p ? 'auto' : 'no-hide-descendants'}
                style={_.page}
              >
                {n}
              </module13.View>
            );
          }),
          u = this._getPageIndex(o.index);

        return (
          <module13.ViewPagerAndroid
            key={o.routes.length}
            keyboardDismissMode={l}
            initialPage={u}
            scrollEnabled={false !== s}
            onPageScroll={this._handlePageScroll}
            onPageScrollStateChanged={this._handlePageScrollStateChanged}
            onPageSelected={this._handlePageSelected}
            style={_.container}
            ref={function (n) {
              return (t._viewPager = n);
            }}
          >
            {p}
          </module13.ViewPagerAndroid>
        );
      },
    },
  ]);
  return P;
})(React.Component);

exports.default = S;
S.propTypes = module1318.PagerRendererPropType;
S.defaultProps = {
  canJumpToTab: function () {
    return true;
  },
  keyboardDismissMode: 'on-drag',
};

var _ = module13.StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  page: {
    overflow: 'hidden',
  },
});
