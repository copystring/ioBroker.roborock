var regeneratorRuntime = require('regenerator-runtime'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  module415 = require('./415'),
  module385 = require('./385'),
  React = require('react'),
  module12 = require('./12'),
  module419 = require('./419'),
  module1121 = require('./1121'),
  module423 = require('./423'),
  module387 = require('./387');

function M() {
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

require('./393');

require('./1265');

require('./389');

var module505 = require('./505').strings,
  w = module12.Dimensions.get('window'),
  module1941 = (function (t) {
    module7.default(D, t);

    var module1121 = D,
      w = M(),
      module1940 = function () {
        var t,
          o = module11.default(module1121);

        if (w) {
          var n = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, n);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function D(t) {
      var o;
      module4.default(this, D);
      (o = module1940.call(this, t)).state = {
        value: module423.DMM.volumeMin,
      };
      return o;
    }

    module5.default(D, [
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
                    return regeneratorRuntime.default.awrap(module419.GetStorageKey(module419.StorageKeys.VolumeValue));

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
                    return regeneratorRuntime.default.awrap(module415.default.getSoundVolume());

                  case 3:
                    t = n.sent;
                    console.log('getSoundVolume - ' + JSON.stringify(t));
                    this.setState({
                      value: this.adjustVolumeValue(parseInt(t.result[0])),
                    });
                    n.next = 8;
                    return regeneratorRuntime.default.awrap(module419.SetStorageKey(module419.StorageKeys.VolumeValue, '' + t.result[0]));

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
          return t > module423.DMM.volumeMax ? module423.DMM.volumeMax : t < module423.DMM.volumeMin ? module423.DMM.volumeMin : t;
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
                    marginTop: 20,
                    marginBottom: 10,
                  },
                ],
              },
              module505.setting_robot_volume
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
                source: require('./1940'),
              }),
              React.default.createElement(module385.Slider, {
                style: {
                  flex: 1,
                  marginHorizontal: 5,
                },
                minimumValue: module423.DMM.volumeMin,
                maximumValue: module423.DMM.volumeMax,
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
                source: require('./1941'),
              })
            ),
            React.default.createElement(
              module12.Text,
              {
                style: [
                  C.tint,
                  {
                    marginTop: 10,
                    color: o.sliderTextColor,
                    fontSize: 12,
                  },
                ],
              },
              module505.setting_volume_tips_text
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
                    return regeneratorRuntime.default.awrap(module415.default.setSoundVolume(module4));

                  case 4:
                    module5 = u.sent;
                    console.log('setSoundVolume - ' + JSON.stringify(module5));
                    u.next = 8;
                    return regeneratorRuntime.default.awrap(module415.default.testSoundVolume());

                  case 8:
                    console.log('testSoundVolume - ' + JSON.stringify(module5));
                    this.setState({
                      value: module4,
                    });
                    u.next = 13;
                    return regeneratorRuntime.default.awrap(module419.SetStorageKey(module419.StorageKeys.VolumeValue, '' + module4));

                  case 13:
                    module387.LogEventStatus('robot_volume_status', {
                      volume: module4,
                    });
                    u.next = 20;
                    break;

                  case 16:
                    u.prev = 16;
                    u.t0 = u.catch(1);
                    console.log('setSoundVolume  error: ' + ('object' == typeof u.t0 ? JSON.stringify(u.t0) : u.t0));
                    if (this.props.setVolumeDidFail) this.props.setVolumeDidFail(module505.robot_communication_exception);

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
    return D;
  })(React.default.Component);

exports.default = module1941;
module1941.contextType = module1121.AppConfigContext;
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
    borderRadius: 8,
  },
  tint: {
    fontSize: 16,
    lineHeight: 18,
    color: 'rgba(0,0,0,0.4)',
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
