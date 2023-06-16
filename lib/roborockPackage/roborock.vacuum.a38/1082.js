var regeneratorRuntime = require('regenerator-runtime'),
  module50 = require('./50'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1069 = require('./1069'),
  module1083 = require('./1083');

function P(t, n) {
  var s = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    if (n)
      o = o.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    s.push.apply(s, o);
  }

  return s;
}

function y(t) {
  for (var n = 1; n < arguments.length; n++) {
    var o = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      P(Object(o), true).forEach(function (n) {
        module50.default(t, n, o[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(o));
    else
      P(Object(o)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(o, n));
      });
  }

  return t;
}

function T() {
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

var x = {
    duration: 250,
    easing: module12.Easing.inOut(module12.Easing.ease),
    timing: module12.Animated.timing,
  },
  b = (function (t) {
    module7.default(b, t);

    var module50 = b,
      module1069 = T(),
      P = function () {
        var t,
          n = module11.default(module50);

        if (module1069) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function b(t, s) {
      var u;
      module4.default(this, b);

      (u = P.call(this, t, s))._onLayout = function (t) {
        var n = t.nativeEvent.layout,
          s = n.height,
          o = n.width;

        if (u.state.layout.initWidth !== o || u.state.layout.initHeight !== s) {
          var c = y(
            y({}, u.state.layout),
            {},
            {
              initHeight: s,
              initWidth: o,
              isMeasured: true,
            }
          );
          c.height.setValue(s);
          c.width.setValue(o);
          var l = y(
            y({}, u.state),
            {},
            {
              layout: c,
            }
          );
          u._transitionProps = w(u.props, l);
          u.setState(l);
        }
      };

      u._onTransitionEnd = function () {
        if (u._isMounted) {
          var t = u._prevTransitionProps;
          u._prevTransitionProps = null;
          var s = S(u.state.scenes),
            o = y(
              y({}, u.state),
              {},
              {
                scenes: s,
              }
            );
          u._transitionProps = w(u.props, o);
          u.setState(o, function () {
            var s;
            return regeneratorRuntime.default.async(
              function (o) {
                for (;;)
                  switch ((o.prev = o.next)) {
                    case 0:
                      if (!u.props.onTransitionEnd) {
                        o.next = 5;
                        break;
                      }

                      if (!((s = u.props.onTransitionEnd(u._transitionProps, t)) instanceof Promise)) {
                        o.next = 5;
                        break;
                      }

                      o.next = 5;
                      return regeneratorRuntime.default.awrap(s);

                    case 5:
                      if (u._queuedTransition) {
                        u._startTransition(u._queuedTransition.nextProps, u._queuedTransition.nextScenes, u._queuedTransition.indexHasChanged);

                        u._queuedTransition = null;
                      } else u._isTransitionRunning = false;

                    case 6:
                    case 'end':
                      return o.stop();
                  }
              },
              null,
              null,
              null,
              Promise
            );
          });
        }
      };

      var c = {
        height: new module12.Animated.Value(0),
        initHeight: 0,
        initWidth: 0,
        isMeasured: false,
        width: new module12.Animated.Value(0),
      };
      u.state = {
        layout: c,
        position: new module12.Animated.Value(u.props.navigation.state.index),
        progress: new module12.Animated.Value(1),
        scenes: module1083.default([], u.props.navigation.state, null, u.props.descriptors),
      };
      u._prevTransitionProps = null;
      u._transitionProps = w(t, u.state);
      u._isMounted = false;
      u._isTransitionRunning = false;
      u._queuedTransition = null;
      return u;
    }

    module5.default(b, [
      {
        key: 'componentDidMount',
        value: function () {
          this._isMounted = true;
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          this._isMounted = false;
        },
      },
      {
        key: 'componentWillReceiveProps',
        value: function (t) {
          var n = module1083.default(this.state.scenes, t.navigation.state, this.props.navigation.state, t.descriptors);

          if (
            (t.navigation.state.isTransitioning || (n = S(n)),
            t.screenProps !== this.props.screenProps &&
              this.setState({
                nextScenes: n,
              }),
            n !== this.state.scenes)
          ) {
            var s = t.navigation.state.index !== this.props.navigation.state.index;
            if (this._isTransitionRunning)
              this._queuedTransition = {
                nextProps: t,
                nextScenes: n,
                indexHasChanged: s,
              };
            else this._startTransition(t, n, s);
          }
        },
      },
      {
        key: '_startTransition',
        value: function (t, s, o) {
          var u = this,
            c = y(
              y({}, this.state),
              {},
              {
                scenes: s,
              }
            ),
            l = c.position,
            p = c.progress;
          p.setValue(0);
          this._prevTransitionProps = this._transitionProps;
          this._transitionProps = w(t, c);
          var f = t.navigation.state.index;

          if (this._transitionProps.navigation.state.isTransitioning) {
            var h = t.configureTransition ? t.configureTransition(this._transitionProps, this._prevTransitionProps) : null,
              _ = y(y({}, x), h),
              P = _.timing;

            delete _.timing;
            var T = l.__getValue() !== f,
              b =
                o && T
                  ? [
                      P(
                        p,
                        y(
                          y({}, _),
                          {},
                          {
                            toValue: 1,
                          }
                        )
                      ),
                      P(
                        l,
                        y(
                          y({}, _),
                          {},
                          {
                            toValue: t.navigation.state.index,
                          }
                        )
                      ),
                    ]
                  : [];
            this._isTransitionRunning = true;
            this.setState(c, function () {
              var s;
              return regeneratorRuntime.default.async(
                function (o) {
                  for (;;)
                    switch ((o.prev = o.next)) {
                      case 0:
                        if (!t.onTransitionStart) {
                          o.next = 5;
                          break;
                        }

                        if (!((s = t.onTransitionStart(u._transitionProps, u._prevTransitionProps)) instanceof Promise)) {
                          o.next = 5;
                          break;
                        }

                        o.next = 5;
                        return regeneratorRuntime.default.awrap(s);

                      case 5:
                        module12.Animated.parallel(b).start(u._onTransitionEnd);

                      case 6:
                      case 'end':
                        return o.stop();
                    }
                },
                null,
                null,
                null,
                Promise
              );
            });
          } else
            this.setState(c, function () {
              var s;
              return regeneratorRuntime.default.async(
                function (o) {
                  for (;;)
                    switch ((o.prev = o.next)) {
                      case 0:
                        if (!((s = t.onTransitionStart(u._transitionProps, u._prevTransitionProps)) instanceof Promise)) {
                          o.next = 4;
                          break;
                        }

                        o.next = 4;
                        return regeneratorRuntime.default.awrap(s);

                      case 4:
                        p.setValue(1);
                        l.setValue(f);

                        u._onTransitionEnd();

                      case 7:
                      case 'end':
                        return o.stop();
                    }
                },
                null,
                null,
                null,
                Promise
              );
            });
        },
      },
      {
        key: 'render',
        value: function () {
          return React.default.createElement(
            module12.View,
            {
              onLayout: this._onLayout,
              style: j.main,
            },
            this.props.render(this._transitionProps, this._prevTransitionProps)
          );
        },
      },
    ]);
    return b;
  })(React.default.Component);

function w(t, n) {
  var s = t.navigation,
    o = n.layout,
    u = n.position,
    c = n.progress,
    l = n.scenes,
    p = l.find(V);
  module1069.default(p, 'Could not find active scene');
  return {
    layout: o,
    navigation: s,
    position: u,
    progress: c,
    scenes: l,
    scene: p,
    index: p.index,
  };
}

function O(t) {
  return !t.isStale;
}

function S(t) {
  var n = t.filter(O);
  return n.length === t.length ? t : n;
}

function V(t) {
  return t.isActive;
}

var j = module12.StyleSheet.create({
    main: {
      flex: 1,
    },
  }),
  k = b;
exports.default = k;
