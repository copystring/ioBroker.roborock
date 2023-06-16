var module62 = require('./62'),
  module259 = require('./259'),
  module261 = require('./261'),
  module85 = require('./85'),
  module161 = require('./161'),
  module46 = require('./46'),
  module13 = require('./13'),
  module210 = require('./210'),
  module111 = require('./111'),
  module15 = require('./15'),
  module20 = require('./20').ScrollViewManager,
  R = {
    Mixin: {
      _subscriptionKeyboardWillShow: null,
      _subscriptionKeyboardWillHide: null,
      _subscriptionKeyboardDidShow: null,
      _subscriptionKeyboardDidHide: null,
      scrollResponderMixinGetInitialState: function () {
        return {
          isTouching: false,
          lastMomentumScrollBeginTime: 0,
          lastMomentumScrollEndTime: 0,
          observedScrollSinceBecomingResponder: false,
          becameResponderWhileAnimating: false,
        };
      },
      scrollResponderHandleScrollShouldSetResponder: function () {
        return true !== this.props.disableScrollViewPanResponder && this.state.isTouching;
      },
      scrollResponderHandleStartShouldSetResponder: function (o) {
        if (true === this.props.disableScrollViewPanResponder) return false;
        var s = module161.currentlyFocusedField();
        return 'handled' === this.props.keyboardShouldPersistTaps && null != s && o.target !== s;
      },
      scrollResponderHandleStartShouldSetResponderCapture: function (o) {
        if (this.scrollResponderIsAnimating()) return true;
        if (true === this.props.disableScrollViewPanResponder) return false;
        var s = module161.currentlyFocusedField(),
          n = this.props.keyboardShouldPersistTaps;
        return !((n && 'never' !== n) || null == s || !o.target || module161.isTextInput(o.target));
      },
      scrollResponderHandleResponderReject: function () {},
      scrollResponderHandleTerminationRequest: function () {
        return !this.state.observedScrollSinceBecomingResponder;
      },
      scrollResponderHandleTouchEnd: function (o) {
        var s = o.nativeEvent;
        this.state.isTouching = 0 !== s.touches.length;
        if (this.props.onTouchEnd) this.props.onTouchEnd(o);
      },
      scrollResponderHandleTouchCancel: function (o) {
        this.state.isTouching = false;
        if (this.props.onTouchCancel) this.props.onTouchCancel(o);
      },
      scrollResponderHandleResponderRelease: function (o) {
        if (this.props.onResponderRelease) this.props.onResponderRelease(o);
        var s = module161.currentlyFocusedField();

        if (
          !(
            true === this.props.keyboardShouldPersistTaps ||
            'always' === this.props.keyboardShouldPersistTaps ||
            null == s ||
            o.target === s ||
            this.state.observedScrollSinceBecomingResponder ||
            this.state.becameResponderWhileAnimating
          )
        ) {
          if (this.props.onScrollResponderKeyboardDismissed) this.props.onScrollResponderKeyboardDismissed(o);
          module161.blurTextInput(s);
        }
      },
      scrollResponderHandleScroll: function (o) {
        this.state.observedScrollSinceBecomingResponder = true;
        if (this.props.onScroll) this.props.onScroll(o);
      },
      scrollResponderHandleResponderGrant: function (o) {
        this.state.observedScrollSinceBecomingResponder = false;
        if (this.props.onResponderGrant) this.props.onResponderGrant(o);
        this.state.becameResponderWhileAnimating = this.scrollResponderIsAnimating();
      },
      scrollResponderHandleScrollBeginDrag: function (o) {
        module259.beginScroll();
        if (this.props.onScrollBeginDrag) this.props.onScrollBeginDrag(o);
      },
      scrollResponderHandleScrollEndDrag: function (o) {
        var n = o.nativeEvent.velocity;
        if (!(this.scrollResponderIsAnimating() || (n && (0 !== n.x || 0 !== n.y)))) module259.endScroll();
        if (this.props.onScrollEndDrag) this.props.onScrollEndDrag(o);
      },
      scrollResponderHandleMomentumScrollBegin: function (o) {
        this.state.lastMomentumScrollBeginTime = module111();
        if (this.props.onMomentumScrollBegin) this.props.onMomentumScrollBegin(o);
      },
      scrollResponderHandleMomentumScrollEnd: function (o) {
        module259.endScroll();
        this.state.lastMomentumScrollEndTime = module111();
        if (this.props.onMomentumScrollEnd) this.props.onMomentumScrollEnd(o);
      },
      scrollResponderHandleTouchStart: function (o) {
        this.state.isTouching = true;
        if (this.props.onTouchStart) this.props.onTouchStart(o);
      },
      scrollResponderHandleTouchMove: function (o) {
        if (this.props.onTouchMove) this.props.onTouchMove(o);
      },
      scrollResponderIsAnimating: function () {
        return module111() - this.state.lastMomentumScrollEndTime < 16 || this.state.lastMomentumScrollEndTime < this.state.lastMomentumScrollBeginTime;
      },
      scrollResponderGetScrollableNode: function () {
        return this.getScrollableNode ? this.getScrollableNode() : module85.findNodeHandle(this);
      },
      scrollResponderScrollTo: function (o, s, n) {
        if ('number' == typeof o) console.warn('`scrollResponderScrollTo(x, y, animated)` is deprecated. Use `scrollResponderScrollTo({x: 5, y: 5, animated: true})` instead.');
        else {
          var l = o || {};
          o = l.x;
          s = l.y;
          n = l.animated;
        }
        module46.dispatchViewManagerCommand(module210(this.scrollResponderGetScrollableNode()), module46.getViewManagerConfig('RCTScrollView').Commands.scrollTo, [
          o || 0,
          s || 0,
          false !== n,
        ]);
      },
      scrollResponderScrollToEnd: function (o) {
        var s = false !== (o && o.animated);
        module46.dispatchViewManagerCommand(this.scrollResponderGetScrollableNode(), module46.getViewManagerConfig('RCTScrollView').Commands.scrollToEnd, [s]);
      },
      scrollResponderScrollWithoutAnimationTo: function (o, s) {
        console.warn('`scrollResponderScrollWithoutAnimationTo` is deprecated. Use `scrollResponderScrollTo` instead');
        this.scrollResponderScrollTo({
          x: o,
          y: s,
          animated: false,
        });
      },
      scrollResponderZoomTo: function (o, s) {
        module13(module20 && module20.zoomToRect, 'zoomToRect is not implemented');

        if ('animated' in o) {
          s = o.animated;
          delete o.animated;
        } else if (undefined !== s) console.warn('`scrollResponderZoomTo` `animated` argument is deprecated. Use `options.animated` instead');

        module20.zoomToRect(this.scrollResponderGetScrollableNode(), o, false !== s);
      },
      scrollResponderFlashScrollIndicators: function () {
        module46.dispatchViewManagerCommand(this.scrollResponderGetScrollableNode(), module46.getViewManagerConfig('RCTScrollView').Commands.flashScrollIndicators, []);
      },
      scrollResponderScrollNativeHandleToKeyboard: function (o, s, n) {
        this.additionalScrollOffset = s || 0;
        this.preventNegativeScrollOffset = !!n;
        module46.measureLayout(o, module85.findNodeHandle(this.getInnerViewNode()), this.scrollResponderTextInputFocusError, this.scrollResponderInputMeasureAndScrollToKeyboard);
      },
      scrollResponderInputMeasureAndScrollToKeyboard: function (s, n, l, t) {
        var c = module62.get('window').height;
        if (this.keyboardWillOpenTo) c = this.keyboardWillOpenTo.endCoordinates.screenY;
        var p = n - c + t + this.additionalScrollOffset;
        if (this.preventNegativeScrollOffset) p = 0 ** p;
        this.scrollResponderScrollTo({
          x: 0,
          y: p,
          animated: true,
        });
        this.additionalOffset = 0;
        this.preventNegativeScrollOffset = false;
      },
      scrollResponderTextInputFocusError: function (o) {
        console.error('Error measuring text field: ', o);
      },
      UNSAFE_componentWillMount: function () {
        var o = this.props.keyboardShouldPersistTaps;
        module15('boolean' != typeof o, "'keyboardShouldPersistTaps={" + o + "}' is deprecated. Use 'keyboardShouldPersistTaps=\"" + (o ? 'always' : 'never') + '"\' instead');
        this.keyboardWillOpenTo = null;
        this.additionalScrollOffset = 0;
        this._subscriptionKeyboardWillShow = module261.addListener('keyboardWillShow', this.scrollResponderKeyboardWillShow);
        this._subscriptionKeyboardWillHide = module261.addListener('keyboardWillHide', this.scrollResponderKeyboardWillHide);
        this._subscriptionKeyboardDidShow = module261.addListener('keyboardDidShow', this.scrollResponderKeyboardDidShow);
        this._subscriptionKeyboardDidHide = module261.addListener('keyboardDidHide', this.scrollResponderKeyboardDidHide);
      },
      componentWillUnmount: function () {
        if (null != this._subscriptionKeyboardWillShow) this._subscriptionKeyboardWillShow.remove();
        if (null != this._subscriptionKeyboardWillHide) this._subscriptionKeyboardWillHide.remove();
        if (null != this._subscriptionKeyboardDidShow) this._subscriptionKeyboardDidShow.remove();
        if (null != this._subscriptionKeyboardDidHide) this._subscriptionKeyboardDidHide.remove();
      },
      scrollResponderKeyboardWillShow: function (o) {
        this.keyboardWillOpenTo = o;
        if (this.props.onKeyboardWillShow) this.props.onKeyboardWillShow(o);
      },
      scrollResponderKeyboardWillHide: function (o) {
        this.keyboardWillOpenTo = null;
        if (this.props.onKeyboardWillHide) this.props.onKeyboardWillHide(o);
      },
      scrollResponderKeyboardDidShow: function (o) {
        if (o) this.keyboardWillOpenTo = o;
        if (this.props.onKeyboardDidShow) this.props.onKeyboardDidShow(o);
      },
      scrollResponderKeyboardDidHide: function (o) {
        this.keyboardWillOpenTo = null;
        if (this.props.onKeyboardDidHide) this.props.onKeyboardDidHide(o);
      },
    },
  };

module.exports = R;
