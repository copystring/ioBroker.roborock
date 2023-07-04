var module22 = require('./22'),
  module6 = require('./6'),
  module8 = require('./8'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  module50 = require('./50');

function h() {
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

function f(t, n) {
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

function y(t) {
  for (var n = 1; n < arguments.length; n++) {
    var o = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      f(Object(o), true).forEach(function (n) {
        module50(t, n, o[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(o));
    else
      f(Object(o)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(o, n));
      });
  }

  return t;
}

require('./52');

var R,
  v,
  _,
  module233 = require('./233'),
  React = require('react'),
  module86 = require('./86'),
  module262 = require('./262'),
  module269 = require('./269'),
  module61 = require('./61'),
  module84 = require('./84'),
  module268 = require('./268'),
  module83 = require('./83'),
  module14 = require('./14'),
  module270 = require('./270'),
  module182 = require('./182'),
  module177 = require('./177'),
  module271 = require('./271');

function I(t) {
  var n = y({}, module262.Mixin);

  for (var o in n) 'function' == typeof n[o] && (n[o] = n[o].bind(t));

  return n;
}

R = module182('RCTScrollView');
_ = module182('AndroidHorizontalScrollView');
v = module182('AndroidHorizontalScrollContentView');
var D = React.createContext(null),
  j = Object.freeze({
    horizontal: true,
  }),
  L = Object.freeze({
    horizontal: false,
  });

class N {
  constructor(t) {
    var o;

    for (var s in (module6(this, N),
    ((o = O.call(this, t))._scrollResponder = I(module8(o))),
    (o._scrollAnimatedValue = new module233.Value(0)),
    (o._scrollAnimatedValueAttachment = null),
    (o._stickyHeaderRefs = new Map()),
    (o._headerLayoutYs = new Map()),
    (o.state = y(
      {
        layoutHeight: null,
      },
      module262.Mixin.scrollResponderMixinGetInitialState()
    )),
    (o._handleScroll = function (t) {
      if ('on-drag' === o.props.keyboardDismissMode && o.state.isTouching) module268();

      o._scrollResponder.scrollResponderHandleScroll(t);
    }),
    (o._handleLayout = function (t) {
      if (true === o.props.invertStickyHeaders)
        o.setState({
          layoutHeight: t.nativeEvent.layout.height,
        });
      if (o.props.onLayout) o.props.onLayout(t);
    }),
    (o._handleContentOnLayout = function (t) {
      var n = t.nativeEvent.layout,
        l = n.width,
        s = n.height;
      if (o.props.onContentSizeChange) o.props.onContentSizeChange(l, s);
    }),
    (o._scrollViewRef = null),
    (o._setScrollViewRef = function (t) {
      o._scrollViewRef = t;
    }),
    (o._innerViewRef = null),
    (o._setInnerViewRef = function (t) {
      o._innerViewRef = t;
    }),
    module262.Mixin))
      'function' == typeof module262.Mixin[s] && s.startsWith('scrollResponder') && (module8(o)[s] = module262.Mixin[s].bind(module8(o)));

    Object.keys(module262.Mixin)
      .filter(function (t) {
        return 'function' != typeof module262.Mixin[t];
      })
      .forEach(function (t) {
        module8(o)[t] = module262.Mixin[t];
      });
    return o;
  }

  UNSAFE_componentWillMount() {
    this._scrollResponder.UNSAFE_componentWillMount();

    this._scrollAnimatedValue = new module233.Value(this.props.contentOffset ? this.props.contentOffset.y : 0);

    this._scrollAnimatedValue.setOffset((this.props.contentInset && this.props.contentInset.top) || 0);

    this._stickyHeaderRefs = new Map();
    this._headerLayoutYs = new Map();
  }

  UNSAFE_componentWillReceiveProps(t) {
    var n = this.props.contentInset ? this.props.contentInset.top : 0,
      o = t.contentInset ? t.contentInset.top : 0;
    if (n !== o) this._scrollAnimatedValue.setOffset(o || 0);
  }

  componentDidMount() {
    this._updateAnimatedNodeAttachment();
  }

  componentDidUpdate() {
    this._updateAnimatedNodeAttachment();
  }

  componentWillUnmount() {
    this._scrollResponder.componentWillUnmount();

    if (this._scrollAnimatedValueAttachment) this._scrollAnimatedValueAttachment.detach();
  }

  setNativeProps(t) {
    if (this._scrollViewRef) this._scrollViewRef.setNativeProps(t);
  }

  getScrollResponder() {
    return this;
  }

  getScrollableNode() {
    return module86.findNodeHandle(this._scrollViewRef);
  }

  getInnerViewNode() {
    return module86.findNodeHandle(this._innerViewRef);
  }

  getNativeScrollRef() {
    return this._scrollViewRef;
  }

  scrollTo(t, n, o) {
    var l, s, c;

    if ('number' == typeof t) {
      console.warn('`scrollTo(y, x, animated)` is deprecated. Use `scrollTo({x: 5, y: 5, animated: true})` instead.');
      s = t;
      l = n;
      c = o;
    } else if (t) {
      s = t.y;
      l = t.x;
      c = t.animated;
    }

    this._scrollResponder.scrollResponderScrollTo({
      x: l || 0,
      y: s || 0,
      animated: false !== c,
    });
  }

  scrollToEnd(t) {
    var n = false !== (t && t.animated);

    this._scrollResponder.scrollResponderScrollToEnd({
      animated: n,
    });
  }

  scrollWithoutAnimationTo() {
    var t = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : 0,
      n = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : 0;
    console.warn('`scrollWithoutAnimationTo` is deprecated. Use `scrollTo` instead');
    this.scrollTo({
      x: n,
      y: t,
      animated: false,
    });
  }

  flashScrollIndicators() {
    this._scrollResponder.scrollResponderFlashScrollIndicators();
  }

  _getKeyForIndex(t, n) {
    var o = n[t];
    return o && o.key;
  }

  _updateAnimatedNodeAttachment() {
    if (this._scrollAnimatedValueAttachment) this._scrollAnimatedValueAttachment.detach();
    if (this.props.stickyHeaderIndices && this.props.stickyHeaderIndices.length > 0)
      this._scrollAnimatedValueAttachment = module233.attachNativeEvent(this._scrollViewRef, 'onScroll', [
        {
          nativeEvent: {
            contentOffset: {
              y: this._scrollAnimatedValue,
            },
          },
        },
      ]);
  }

  _setStickyHeaderRef(t, n) {
    if (n) this._stickyHeaderRefs.set(t, n);
    else this._stickyHeaderRefs.delete(t);
  }

  _onStickyHeaderLayout(t, n, o) {
    var l = this.props.stickyHeaderIndices;

    if (l) {
      var s = React.Children.toArray(this.props.children);

      if (o === this._getKeyForIndex(t, s)) {
        var c = n.nativeEvent.layout.y;

        this._headerLayoutYs.set(o, c);

        var p = l[l.indexOf(t) - 1];

        if (null != p) {
          var u = this._stickyHeaderRefs.get(this._getKeyForIndex(p, s));

          if (u && u.setNextHeaderY) u.setNextHeaderY(c);
        }
      }
    }
  }

  render() {
    var n,
      o,
      l = this;

    if (true === this.props.horizontal) {
      n = _;
      o = v;
    } else {
      n = R;
      o = module84;
    }

    module14(undefined !== n, 'ScrollViewClass must not be undefined');
    module14(undefined !== o, 'ScrollContentContainerViewClass must not be undefined');
    var s = [true === this.props.horizontal && P.contentContainerHorizontal, this.props.contentContainerStyle],
      c = {};
    if (this.props.onContentSizeChange)
      c = {
        onLayout: this._handleContentOnLayout,
      };
    var p = this.props.stickyHeaderIndices,
      u = this.props.children;

    if (null != p && p.length > 0) {
      var h = React.Children.toArray(this.props.children);
      u = h.map(function (t, n) {
        var o = t ? p.indexOf(n) : -1;

        if (o > -1) {
          var s = t.key,
            c = p[o + 1],
            u = l.props.StickyHeaderComponent || module269;
          return (
            <u
              key={s}
              ref={function (t) {
                return l._setStickyHeaderRef(s, t);
              }}
              nextHeaderLayoutY={l._headerLayoutYs.get(l._getKeyForIndex(c, h))}
              onLayout={function (t) {
                return l._onStickyHeaderLayout(n, t, s);
              }}
              scrollAnimatedValue={l._scrollAnimatedValue}
              inverted={l.props.invertStickyHeaders}
              scrollViewHeight={l.state.layoutHeight}
            >
              {t}
            </u>
          );
        }

        return t;
      });
    }

    u = <D.Provider value={true === this.props.horizontal ? j : L}>{u}</D.Provider>;
    var f = Array.isArray(p) && p.length > 0,
      S = <o>{u}</o>,
      H = undefined !== this.props.alwaysBounceHorizontal ? this.props.alwaysBounceHorizontal : this.props.horizontal,
      k = undefined !== this.props.alwaysBounceVertical ? this.props.alwaysBounceVertical : !this.props.horizontal,
      E = !!this.props.DEPRECATED_sendUpdatedChildFrames,
      C = true === this.props.horizontal ? P.baseHorizontal : P.baseVertical,
      O = y(
        y({}, this.props),
        {},
        {
          alwaysBounceHorizontal: H,
          alwaysBounceVertical: k,
          style: [C, this.props.style],
          onContentSizeChange: null,
          onLayout: this._handleLayout,
          onMomentumScrollBegin: this._scrollResponder.scrollResponderHandleMomentumScrollBegin,
          onMomentumScrollEnd: this._scrollResponder.scrollResponderHandleMomentumScrollEnd,
          onResponderGrant: this._scrollResponder.scrollResponderHandleResponderGrant,
          onResponderReject: this._scrollResponder.scrollResponderHandleResponderReject,
          onResponderRelease: this._scrollResponder.scrollResponderHandleResponderRelease,
          onResponderTerminate: this._scrollResponder.scrollResponderHandleTerminate,
          onResponderTerminationRequest: this._scrollResponder.scrollResponderHandleTerminationRequest,
          onScrollBeginDrag: this._scrollResponder.scrollResponderHandleScrollBeginDrag,
          onScrollEndDrag: this._scrollResponder.scrollResponderHandleScrollEndDrag,
          onScrollShouldSetResponder: this._scrollResponder.scrollResponderHandleScrollShouldSetResponder,
          onStartShouldSetResponder: this._scrollResponder.scrollResponderHandleStartShouldSetResponder,
          onStartShouldSetResponderCapture: this._scrollResponder.scrollResponderHandleStartShouldSetResponderCapture,
          onTouchEnd: this._scrollResponder.scrollResponderHandleTouchEnd,
          onTouchMove: this._scrollResponder.scrollResponderHandleTouchMove,
          onTouchStart: this._scrollResponder.scrollResponderHandleTouchStart,
          onTouchCancel: this._scrollResponder.scrollResponderHandleTouchCancel,
          onScroll: this._handleScroll,
          scrollBarThumbImage: module177(this.props.scrollBarThumbImage),
          scrollEventThrottle: f ? 1 : this.props.scrollEventThrottle,
          sendMomentumEvents: !(!this.props.onMomentumScrollBegin && !this.props.onMomentumScrollEnd),
          DEPRECATED_sendUpdatedChildFrames: E,
          snapToStart: false !== this.props.snapToStart,
          snapToEnd: false !== this.props.snapToEnd,
          pagingEnabled: true === this.props.pagingEnabled || null != this.props.snapToInterval || null != this.props.snapToOffsets,
        }
      ),
      I = this.props.decelerationRate;
    if (null != I) O.decelerationRate = module270(I);
    var N = this.props.refreshControl;

    if (N) {
      var B = module271(module83(O.style)),
        F = B.outer,
        U = B.inner;
      return React.cloneElement(
        N,
        {
          style: [C, F],
        },
        <n>{S}</n>
      );
    }

    return <n>{S}</n>;
  }
}

N.Context = D;
var P = module61.create({
  baseVertical: {
    flexGrow: 1,
    flexShrink: 1,
    flexDirection: 'column',
    overflow: 'scroll',
  },
  baseHorizontal: {
    flexGrow: 1,
    flexShrink: 1,
    flexDirection: 'row',
    overflow: 'scroll',
  },
  contentContainerHorizontal: {
    flexDirection: 'row',
  },
});
module.exports = N;
