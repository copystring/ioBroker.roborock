var module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1215 = require('./1215');

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

var y = (function (t) {
  module7.default(w, t);

  var n = w,
    module1215 = v(),
    y = function () {
      var t,
        o = module11.default(n);

      if (module1215) {
        var l = module11.default(this).constructor;
        t = Reflect.construct(o, arguments, l);
      } else t = o.apply(this, arguments);

      return module9.default(this, t);
    };

  function w(t) {
    var n;
    module4.default(this, w);
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

      if (n.props.canJumpToTab(l)) {
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

  module5.default(w, [
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
          c = n.onSwipeStart,
          u = n.onSwipeEnd;
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
            onScrollBeginDrag={c}
            onScrollEndDrag={u}
            onMomentumScrollEnd={this._handleMomentumScrollEnd}
            contentOffset={this.state.initialOffset}
            style={S.container}
            contentContainerStyle={l.width ? null : S.container}
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
  return w;
})(React.Component);

exports.default = y;
y.propTypes = module1215.PagerRendererPropType;
y.defaultProps = {
  canJumpToTab: function () {
    return true;
  },
};
var S = module12.StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    flex: 1,
    overflow: 'hidden',
  },
});
