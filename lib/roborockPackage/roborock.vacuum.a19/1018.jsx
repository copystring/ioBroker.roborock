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
    var s = {},
      u = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var l in t)
      if ('default' !== l && Object.prototype.hasOwnProperty.call(t, l)) {
        var p = u ? Object.getOwnPropertyDescriptor(t, l) : null;
        if (p && (p.get || p.set)) Object.defineProperty(s, l, p);
        else s[l] = t[l];
      }

    s.default = t;
    if (o) o.set(t, s);
    return s;
  })(require('react')),
  module12 = require('./12'),
  module1017 = require('./1017');

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

var _ = (function (t) {
  module7.default(y, t);

  var module1017 = y,
    h = v(),
    _ = function () {
      var t,
        n = module11.default(module1017);

      if (h) {
        var o = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function y(t) {
    var o;
    module4.default(this, y);
    (o = _.call(this, t))._isIdle = true;
    o._currentIndex = 0;

    o._getPageIndex = function (t) {
      return module12.I18nManager.isRTL ? o.props.navigationState.routes.length - (t + 1) : t;
    };

    o._setPage = function (t) {
      var n = !(arguments.length > 1 && undefined !== arguments[1]) || arguments[1],
        s = o._viewPager;

      if (s) {
        var u = o._getPageIndex(t);

        if (false === o.props.animationEnabled || false === n) s.setPageWithoutAnimation(u);
        else s.setPage(u);
      }
    };

    o._handlePageChange = function (t, n) {
      if (o._isIdle && o._currentIndex !== t) {
        o._setPage(t, n);

        o._currentIndex = t;
      }
    };

    o._handlePageScroll = function (t) {
      o.props.offsetX.setValue(t.nativeEvent.position * o.props.layout.width * (module12.I18nManager.isRTL ? 1 : -1));
      o.props.panX.setValue(t.nativeEvent.offset * o.props.layout.width * (module12.I18nManager.isRTL ? 1 : -1));
    };

    o._handlePageScrollStateChanged = function (t) {
      o._isIdle = 'idle' === t;
      var n = o._currentIndex,
        s = o.props.navigationState.routes[n];

      switch ((o.props.canJumpToTab(s) ? o.props.jumpTo(s.key) : (o._setPage(o.props.navigationState.index), (o._currentIndex = o.props.navigationState.index)), t)) {
        case 'dragging':
          if (o.props.onSwipeStart) o.props.onSwipeStart();
          break;

        case 'settling':
          if (o.props.onSwipeEnd) o.props.onSwipeEnd();
          break;

        case 'idle':
          if (o.props.onAnimationEnd) o.props.onAnimationEnd();
      }
    };

    o._handlePageSelected = function (t) {
      var n = o._getPageIndex(t.nativeEvent.position);

      o._currentIndex = n;
    };

    o._setRef = function (t) {
      return (o._viewPager = t);
    };

    o._currentIndex = o.props.navigationState.index;
    return o;
  }

  module5.default(y, [
    {
      key: 'componentDidUpdate',
      value: function (t) {
        if (t.navigationState.routes !== this.props.navigationState.routes || t.layout.width !== this.props.layout.width)
          this._handlePageChange(this.props.navigationState.index, false);
        else if (t.navigationState.index !== this.props.navigationState.index) this._handlePageChange(this.props.navigationState.index);
      },
    },
    {
      key: 'render',
      value: function () {
        var t = this.props,
          n = t.children,
          o = t.navigationState,
          s = t.swipeEnabled,
          u = t.keyboardDismissMode,
          l = React.Children.map(n, function (t, n) {
            return (
              <module12.View key={o.routes[n].key} testID={o.routes[n].testID} style={P.page}>
                {t}
              </module12.View>
            );
          });
        if (module12.I18nManager.isRTL) l.reverse();

        var f = this._getPageIndex(o.index);

        return (
          <module12.ViewPagerAndroid
            key={o.routes.length}
            keyboardDismissMode={u}
            initialPage={f}
            scrollEnabled={false !== s}
            onPageScroll={this._handlePageScroll}
            onPageScrollStateChanged={this._handlePageScrollStateChanged}
            onPageSelected={this._handlePageSelected}
            style={P.container}
            ref={this._setRef}
          >
            {l}
          </module12.ViewPagerAndroid>
        );
      },
    },
  ]);
  return y;
})(React.Component);

exports.default = _;
_.propTypes = module1017.PagerRendererPropType;
_.defaultProps = {
  canJumpToTab: function () {
    return true;
  },
  keyboardDismissMode: 'on-drag',
};
var P = module12.StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  page: {
    overflow: 'hidden',
  },
});
