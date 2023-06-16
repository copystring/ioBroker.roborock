exports.WithSwipeToClose = function (t) {
  return (function (l) {
    module9.default(c, l);
    var f = h(c);

    function c() {
      module6.default(this, c);
      return f.apply(this, arguments);
    }

    module7.default(c, [
      {
        key: 'render',
        value: function () {
          var o = this;
          return React.default.createElement(
            y,
            {
              onClose: function () {
                if (o.props.onClose) o.props.onClose();
              },
              onReset: function () {
                if (o.props.onReset) o.props.onReset();
              },
            },
            React.default.createElement(
              t,
              module22.default(
                {
                  ref: function (t) {
                    return (o.contentView = t);
                  },
                  parent: this,
                },
                this.props
              )
            )
          );
        },
      },
    ]);
    return c;
  })(y);
};

var module22 = require('./22'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13');

function h(t) {
  var n = v();
  return function () {
    var o,
      u = module12.default(t);

    if (n) {
      var s = module12.default(this).constructor;
      o = Reflect.construct(u, arguments, s);
    } else o = u.apply(this, arguments);

    return module11.default(this, o);
  };
}

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
  module9.default(f, t);
  var l = h(f);

  function f(t) {
    var n;
    module6.default(this, f);
    (n = l.call(this, t)).state = {
      contentHeight: 0,
    };
    n.initPanGestures();
    return n;
  }

  module7.default(f, [
    {
      key: 'initPanGestures',
      value: function () {
        var t = this;
        this.pan = new module13.Animated.ValueXY();
        this.panResponder = module13.PanResponder.create({
          onStartShouldSetPanResponder: function () {
            return true;
          },
          onStartShouldSetPanResponderCapture: function () {
            return false;
          },
          onMoveShouldSetPanResponderCapture: function () {
            return false;
          },
          onMoveShouldSetPanResponder: function (t, n) {
            return false;
          },
          onPanResponderGrant: function () {
            t.pan.setOffset({
              x: t.pan.x._value,
              y: t.pan.y._value,
            });
          },
          onPanResponderMove: function (n, o) {
            t.pan.setValue({
              x: o.dx,
              y: 0 ** o.dy,
            });
          },
          onPanResponderRelease: function (n, o) {
            if (t.pan.y._value > t.state.contentHeight / 2)
              module13.Animated.timing(t.pan, {
                toValue: {
                  x: t.pan.x._value,
                  y: t.state.contentHeight,
                },
                duration: 100,
                easing: module13.Easing.inOut(module13.Easing.linear),
              }).start(function (n) {
                if (n.finished && t.props.onClose) t.props.onClose();
              });
            else
              module13.Animated.timing(t.pan, {
                toValue: {
                  x: t.pan.x._value,
                  y: 0,
                },
                duration: 100,
                easing: module13.Easing.inOut(module13.Easing.linear),
              }).start(function (n) {
                if (n.finished && t.props.onReset) t.props.onReset();
              });
            t.pan.flattenOffset();
          },
        });
      },
    },
    {
      key: 'onLayoutComponent',
      value: function (t) {
        this.setState({
          contentHeight: t.nativeEvent.layout.height,
        });
      },
    },
    {
      key: 'render',
      value: function () {
        var t = this,
          o = this.pan.y;
        return React.default.createElement(
          module13.Animated.View,
          module22.default(
            {
              style: {
                transform: [
                  {
                    translateY: o,
                  },
                ],
              },
            },
            this.panResponder.panHandlers,
            {
              onLayout: function (n) {
                return t.onLayoutComponent(n);
              },
            }
          ),
          this.props.children
        );
      },
    },
  ]);
  return f;
})(React.default.Component);

exports.default = y;

var R = (function (t) {
  module9.default(l, t);
  var n = h(l);

  function l() {
    module6.default(this, l);
    return n.apply(this, arguments);
  }

  module7.default(l, [
    {
      key: 'render',
      value: function () {
        return React.default.createElement(module13.View, {
          style: [
            {
              height: 5,
              width: 40,
              backgroundColor: 'rgba(155, 155, 155, 0.5)',
              borderRadius: 2.5,
              alignSelf: 'center',
            },
            this.props.style,
          ],
        });
      },
    },
  ]);
  return l;
})(React.default.Component);

exports.SwipeDownIndicator = R;
