require('./391');

require('./394');

var regeneratorRuntime = require('regenerator-runtime'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module385 = require('./385'),
  module415 = require('./415'),
  module419 = require('./419'),
  module387 = require('./387');

function b() {
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

require('./505').strings;

var module1265 = require('./1265').Definitions,
  x = function (t) {
    return t ? module12.Dimensions.get('screen').height : module12.Dimensions.get('window').height;
  },
  C = (function (t) {
    module7.default(R, t);

    var n = R,
      C = b(),
      E = function () {
        var t,
          o = module11.default(n);

        if (C) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, s);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function R(t) {
      var n;
      module4.default(this, R);
      (n = E.call(this, t)).state = {
        current: -1,
        visible: false,
      };
      n.animatedOpacity = new module12.Animated.Value(0);
      return n;
    }

    module5.default(R, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {},
      },
      {
        key: 'componentDidMount',
        value: function () {
          var t,
            n,
            s = this;
          regeneratorRuntime.default.async(
            function (u) {
              for (;;)
                switch ((u.prev = u.next)) {
                  case 0:
                    u.next = 2;
                    return regeneratorRuntime.default.awrap(module419.GetStorageKey(module419.StorageKeys.MonitorVideoDefinition));

                  case 2:
                    t = u.sent;
                    n = module1265.findIndex(function (n) {
                      return n.command == t;
                    });
                    s.selectItem(-1 == n ? 1 : n);

                  case 5:
                  case 'end':
                    return u.stop();
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
            s = module1265.map(function (t, o) {
              return React.default.createElement(module385.PureButton, {
                title: t.title,
                style: k.button,
                key: o,
                textColor: 'white',
                fontSize: 17,
                selectedTextColor: '#007AFF',
                selected: o == n.state.current,
                onPress: n.selectItem.bind(n, o),
              });
            }),
            u = this.animatedOpacity.interpolate({
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
                      k.container,
                      {
                        opacity: this.animatedOpacity,
                        width: ((t = true), t ? module12.Dimensions.get('screen').width : module12.Dimensions.get('window').width),
                        height: o || x(true),
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
                          k.wrap,
                          {
                            marginRight: u,
                          },
                        ],
                      },
                      s
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
          var n;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    this.hide();
                    s.prev = 1;
                    n = module1265[t].command;
                    module387.LogEventCommon('tap_video_quality_' + n);
                    s.next = 6;
                    return regeneratorRuntime.default.awrap(module415.default.setVideoQuality(n));

                  case 6:
                    this.setState({
                      current: t,
                    });
                    s.next = 10;
                    return regeneratorRuntime.default.awrap(module419.SetStorageKey(module419.StorageKeys.MonitorVideoDefinition, n));

                  case 10:
                    if (this.props.definitionDidChange) this.props.definitionDidChange(true, module1265[t]);
                    if ('SD' == n) module387.LogEventStat(module387.LogEventMap.RealTimeDefinitionLD);
                    if ('HD' == n) module387.LogEventStat(module387.LogEventMap.RealTimeDefinitionHD);
                    s.next = 18;
                    break;

                  case 15:
                    s.prev = 15;
                    s.t0 = s.catch(1);
                    if (this.props.definitionDidChange) this.props.definitionDidChange(false, s.t0);

                  case 18:
                  case 'end':
                    return s.stop();
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
    return R;
  })(React.Component);

exports.default = C;
var k = module12.StyleSheet.create({
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
