require('./387');

require('./390');

var regeneratorRuntime = require('regenerator-runtime'),
  module4 = require('./4'),
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
    var o = b(n);
    if (o && o.has(t)) return o.get(t);
    var u = {},
      s = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var c in t)
      if ('default' !== c && Object.prototype.hasOwnProperty.call(t, c)) {
        var l = s ? Object.getOwnPropertyDescriptor(t, c) : null;
        if (l && (l.get || l.set)) Object.defineProperty(u, c, l);
        else u[c] = t[c];
      }

    u.default = t;
    if (o) o.set(t, u);
    return u;
  })(require('react')),
  module12 = require('./12'),
  module381 = require('./381'),
  module407 = require('./407'),
  module411 = require('./411'),
  module383 = require('./383');

function b(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (b = function (t) {
    return t ? o : n;
  })(t);
}

function D() {
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

require('./491').strings;

var module934 = require('./934').Definitions,
  S = function (t) {
    return t ? module12.Dimensions.get('screen').height : module12.Dimensions.get('window').height;
  },
  k = (function (t) {
    module7.default(P, t);

    var b = P,
      k = D(),
      C = function () {
        var t,
          n = module11.default(b);

        if (k) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function P(t) {
      var n;
      module4.default(this, P);
      (n = C.call(this, t)).state = {
        current: -1,
        visible: false,
      };
      n.animatedOpacity = new module12.Animated.Value(0);
      return n;
    }

    module5.default(P, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {},
      },
      {
        key: 'componentDidMount',
        value: function () {
          var t,
            o,
            u = this;
          regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    s.next = 2;
                    return regeneratorRuntime.default.awrap(module411.GetStorageKey(module411.StorageKeys.MonitorVideoDefinition));

                  case 2:
                    t = s.sent;
                    o = module934.findIndex(function (n) {
                      return n.command == t;
                    });
                    u.selectItem(-1 == o ? 1 : o);

                  case 5:
                  case 'end':
                    return s.stop();
                }
            },
            null,
            null,
            null,
            Promise
          );
        },
      },
      {
        key: 'render',
        value: function () {
          var t,
            n = this,
            o = this.props.height,
            u = module934.map(function (t, o) {
              return React.default.createElement(module381.PureButton, {
                title: t.title,
                style: x.button,
                key: o,
                textColor: 'white',
                fontSize: 17,
                selectedTextColor: '#007AFF',
                selected: o == n.state.current,
                onPress: n.selectItem.bind(n, o),
              });
            }),
            s = this.animatedOpacity.interpolate({
              inputRange: [0, 1],
              outputRange: [-260, 0],
            });
          return this.state.visible
            ? React.default.createElement(
                module12.TouchableWithoutFeedback,
                {
                  onPress: function () {
                    n.hide();
                  },
                },
                React.default.createElement(
                  module12.Animated.View,
                  {
                    style: [
                      x.container,
                      {
                        opacity: this.animatedOpacity,
                        width: ((t = true), t ? module12.Dimensions.get('screen').width : module12.Dimensions.get('window').width),
                        height: o || S(true),
                      },
                    ],
                  },
                  React.default.createElement(
                    module12.TouchableOpacity,
                    {
                      activeOpacity: 1,
                    },
                    React.default.createElement(
                      module12.Animated.View,
                      {
                        style: [
                          x.wrap,
                          {
                            marginRight: s,
                          },
                        ],
                      },
                      u
                    )
                  )
                )
              )
            : null;
        },
      },
      {
        key: 'selectItem',
        value: function (t) {
          var module4;
          return regeneratorRuntime.default.async(
            function (u) {
              for (;;)
                switch ((u.prev = u.next)) {
                  case 0:
                    this.hide();
                    u.prev = 1;
                    module4 = module934[t].command;
                    module383.LogEventCommon('tap_video_quality_' + module4);
                    u.next = 6;
                    return regeneratorRuntime.default.awrap(module407.default.setVideoQuality(module4));

                  case 6:
                    this.setState({
                      current: t,
                    });
                    u.next = 10;
                    return regeneratorRuntime.default.awrap(module411.SetStorageKey(module411.StorageKeys.MonitorVideoDefinition, module4));

                  case 10:
                    if (this.props.definitionDidChange) this.props.definitionDidChange(true, module934[t]);
                    if ('SD' == module4) module383.LogEventStat(module383.LogEventMap.RealTimeDefinitionLD);
                    if ('HD' == module4) module383.LogEventStat(module383.LogEventMap.RealTimeDefinitionHD);
                    u.next = 18;
                    break;

                  case 15:
                    u.prev = 15;
                    u.t0 = u.catch(1);
                    if (this.props.definitionDidChange) this.props.definitionDidChange(false, u.t0);

                  case 18:
                  case 'end':
                    return u.stop();
                }
            },
            null,
            this,
            [[1, 15]],
            Promise
          );
        },
      },
      {
        key: 'hide',
        value: function () {
          var t = this;
          if (0 != this.state.visible)
            module12.Animated.timing(this.animatedOpacity, {
              toValue: 0,
              duration: 100,
            }).start(function () {
              t.setState({
                visible: false,
              });
            });
        },
      },
      {
        key: 'show',
        value: function () {
          var t = this;
          this.setState(
            {
              visible: true,
            },
            function () {
              module12.Animated.spring(t.animatedOpacity, {
                toValue: 1,
                duration: 150,
                bounciness: 0,
              }).start();
            }
          );
        },
      },
    ]);
    return P;
  })(React.Component);

exports.default = k;
var x = module12.StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 101,
    backgroundColor: 'rgba(00, 00, 00, 0.3)',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  wrap: {
    width: 260,
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.9)',
    overflow: 'hidden',
  },
  button: {
    width: 260,
    height: 80,
    backgroundColor: 'transparent',
  },
});
