var regeneratorRuntime = require('regenerator-runtime'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  module407 = require('./407'),
  module381 = require('./381'),
  React = require('react'),
  module12 = require('./12'),
  module411 = require('./411'),
  module506 = require('./506'),
  module415 = require('./415'),
  module383 = require('./383');

function M() {
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

require('./389');

require('./934');

require('./385');

var module491 = require('./491').strings,
  w = module12.Dimensions.get('window'),
  module1913 = (function (t) {
    module7.default(T, t);

    var module506 = T,
      w = M(),
      module1912 = function () {
        var t,
          o = module11.default(module506);

        if (w) {
          var n = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, n);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function T(t) {
      var o;
      module4.default(this, T);
      (o = module1912.call(this, t)).state = {
        value: module415.DMM.volumeMin,
      };
      return o;
    }

    module5.default(T, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          this.getInitialValue();
        },
      },
      {
        key: 'componentDidMount',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    n.prev = 0;
                    n.next = 3;
                    return regeneratorRuntime.default.awrap(module411.GetStorageKey(module411.StorageKeys.VolumeValue));

                  case 3:
                    if ((t = n.sent))
                      this.setState({
                        value: this.adjustVolumeValue(parseInt(t)),
                      });
                    n.next = 10;
                    break;

                  case 7:
                    n.prev = 7;
                    n.t0 = n.catch(0);
                    console.log('get Volume  error: ' + ('object' == typeof n.t0 ? JSON.stringify(n.t0) : n.t0));

                  case 10:
                  case 'end':
                    return n.stop();
                }
            },
            null,
            this,
            [[0, 7]],
            Promise
          );
        },
      },
      {
        key: 'getInitialValue',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    n.prev = 0;
                    n.next = 3;
                    return regeneratorRuntime.default.awrap(module407.default.getSoundVolume());

                  case 3:
                    t = n.sent;
                    console.log('getSoundVolume - ' + JSON.stringify(t));
                    this.setState({
                      value: this.adjustVolumeValue(parseInt(t.result[0])),
                    });
                    n.next = 8;
                    return regeneratorRuntime.default.awrap(module411.SetStorageKey(module411.StorageKeys.VolumeValue, '' + t.result[0]));

                  case 8:
                    n.next = 13;
                    break;

                  case 10:
                    n.prev = 10;
                    n.t0 = n.catch(0);
                    console.log('getSoundVolume  error: ' + ('object' == typeof n.t0 ? JSON.stringify(n.t0) : n.t0));

                  case 13:
                  case 'end':
                    return n.stop();
                }
            },
            null,
            this,
            [[0, 10]],
            Promise
          );
        },
      },
      {
        key: 'adjustVolumeValue',
        value: function (t) {
          return t > module415.DMM.volumeMax ? module415.DMM.volumeMax : t < module415.DMM.volumeMin ? module415.DMM.volumeMin : t;
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            o = this.context.theme.soundPackage;
          return React.default.createElement(
            module12.View,
            {
              style: C.container,
            },
            React.default.createElement(
              module12.Text,
              {
                style: [
                  C.tint,
                  {
                    color: o.sliderTextColor,
                    marginTop: 25,
                    marginBottom: 5,
                  },
                ],
              },
              module491.setting_robot_volume
            ),
            React.default.createElement(
              module12.View,
              {
                style: [
                  C.sliderWrap,
                  {
                    borderColor: o.lineColor,
                    backgroundColor: o.itemBackgroundColor,
                  },
                ],
              },
              React.default.createElement(module12.ImageBackground, {
                style: {
                  height: 20,
                  width: 20,
                  marginRight: 5,
                },
                resizeMode: 'contain',
                source: require('./1912'),
              }),
              React.default.createElement(module381.Slider, {
                style: {
                  flex: 1,
                  marginHorizontal: 5,
                },
                minimumValue: module415.DMM.volumeMin,
                maximumValue: module415.DMM.volumeMax,
                value: this.state.value,
                minimumTrackTintColor: '#3384ff',
                maximumTrackTintColor: 'rgba(0,0,0,0.1)',
                thumbTintColor: '#ffffff',
                thumbStyle: C.thumbStyle,
                trackStyle: C.trackStyle,
                debugTouchArea: false,
                onSlidingComplete: function (o) {
                  t.onSlidingComplete(o);
                },
              }),
              React.default.createElement(module12.ImageBackground, {
                style: {
                  height: 20,
                  width: 20,
                  marginLeft: 5,
                },
                resizeMode: 'contain',
                source: require('./1913'),
              })
            ),
            React.default.createElement(
              module12.Text,
              {
                style: [
                  C.tint,
                  {
                    marginTop: 5,
                    color: o.sliderTextColor,
                  },
                ],
              },
              module491.setting_volume_tips_text
            )
          );
        },
      },
      {
        key: 'onSlidingComplete',
        value: function (t) {
          var module4, module5;
          return regeneratorRuntime.default.async(
            function (u) {
              for (;;)
                switch ((u.prev = u.next)) {
                  case 0:
                    module4 = parseInt(t.toFixed(0));
                    u.prev = 1;
                    u.next = 4;
                    return regeneratorRuntime.default.awrap(module407.default.setSoundVolume(module4));

                  case 4:
                    module5 = u.sent;
                    console.log('setSoundVolume - ' + JSON.stringify(module5));
                    u.next = 8;
                    return regeneratorRuntime.default.awrap(module407.default.testSoundVolume());

                  case 8:
                    console.log('testSoundVolume - ' + JSON.stringify(module5));
                    this.setState({
                      value: module4,
                    });
                    u.next = 13;
                    return regeneratorRuntime.default.awrap(module411.SetStorageKey(module411.StorageKeys.VolumeValue, '' + module4));

                  case 13:
                    module383.LogEventStatus('robot_volume_status', {
                      volume: module4,
                    });
                    u.next = 20;
                    break;

                  case 16:
                    u.prev = 16;
                    u.t0 = u.catch(1);
                    console.log('setSoundVolume  error: ' + ('object' == typeof u.t0 ? JSON.stringify(u.t0) : u.t0));
                    if (this.props.setVolumeDidFail) this.props.setVolumeDidFail(module491.robot_communication_exception);

                  case 20:
                  case 'end':
                    return u.stop();
                }
            },
            null,
            this,
            [[1, 16]],
            Promise
          );
        },
      },
    ]);
    return T;
  })(React.default.Component);

exports.default = module1913;
module1913.contextType = module506.AppConfigContext;
var C = module12.StyleSheet.create({
  container: {},
  tintWrap: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 22,
    marginRight: 22,
  },
  sliderWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 'ios' == module12.Platform.OS ? 4 : 15,
    backgroundColor: 'white',
    borderTopWidth: 0.8,
    borderBottomWidth: 0.8,
  },
  tint: {
    fontSize: 13,
    lineHeight: 18,
    color: 'rgba(0,0,0,0.4)',
    marginHorizontal: 20,
    textAlign: globals.isRTL ? 'right' : 'left',
  },
  thumbStyle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    shadowColor: 'rgba(0,0,0,0.6)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.22,
    shadowRadius: 3,
    elevation: 3,
  },
  trackStyle: {
    height: 4,
    borderRadius: 2,
  },
});
