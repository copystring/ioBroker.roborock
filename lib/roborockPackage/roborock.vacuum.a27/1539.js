exports.WithSwipeToClose = function (t) {
  return (function (n) {
    module7.default(f, n);
    var l = h(f);

    function f() {
      module4.default(this, f);
      return l.apply(this, arguments);
    }

    module5.default(f, [
      {
        key: 'render',
        value: function () {
          var n = this;
          return React.default.createElement(
            y,
            {
              onClose: function () {
                if (n.props.onClose) n.props.onClose();
              },
              onReset: function () {
                if (n.props.onReset) n.props.onReset();
              },
            },
            React.default.createElement(t, this.props)
          );
        },
      },
    ]);
    return f;
  })(y);
};

var module22 = require('./22'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12');

function h(t) {
  var n = v();
  return function () {
    var o,
      u = module11.default(t);

    if (n) {
      var s = module11.default(this).constructor;
      o = Reflect.construct(u, arguments, s);
    } else o = u.apply(this, arguments);

    return module9.default(this, o);
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
  module7.default(f, t);
  var l = h(f);

  function f(t) {
    var n;
    module4.default(this, f);
    (n = l.call(this, t)).state = {
      contentHeight: 0,
    };
    n.initPanGestures();
    return n;
  }

  module5.default(f, [
    {
      key: 'initPanGestures',
      value: function () {
        var t = this;
        this.pan = new module12.Animated.ValueXY();
        this.panResponder = module12.PanResponder.create({
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
              module12.Animated.timing(t.pan, {
                toValue: {
                  x: t.pan.x._value,
                  y: t.state.contentHeight,
                },
                duration: 100,
                easing: module12.Easing.inOut(module12.Easing.linear),
              }).start(function (n) {
                if (n.finished && t.props.onClose) t.props.onClose();
              });
            else
              module12.Animated.timing(t.pan, {
                toValue: {
                  x: t.pan.x._value,
                  y: 0,
                },
                duration: 100,
                easing: module12.Easing.inOut(module12.Easing.linear),
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
          module12.Animated.View,
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
  module7.default(l, t);
  var n = h(l);

  function l() {
    module4.default(this, l);
    return n.apply(this, arguments);
  }

  module5.default(l, [
    {
      key: 'render',
      value: function () {
        return React.default.createElement(module12.View, {
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
