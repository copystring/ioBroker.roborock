require('./377');

require('./386');

require('./415');

var regeneratorRuntime = require('regenerator-runtime'),
  module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = C(require('react')),
  module12 = require('./12'),
  module381 = require('./381'),
  module387 = require('./387'),
  module407 = require('./407'),
  module411 = require('./411'),
  module390 = require('./390'),
  module506 = require('./506'),
  module1353 = C(require('./1353')),
  module934 = require('./934');

function I(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (I = function (t) {
    return t ? o : n;
  })(t);
}

function C(t, n) {
  if (!n && t && t.__esModule) return t;
  if (null === t || ('object' != typeof t && 'function' != typeof t))
    return {
      default: t,
    };
  var o = I(n);
  if (o && o.has(t)) return o.get(t);
  var s = {},
    l = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var u in t)
    if ('default' !== u && Object.prototype.hasOwnProperty.call(t, u)) {
      var c = l ? Object.getOwnPropertyDescriptor(t, u) : null;
      if (c && (c.get || c.set)) Object.defineProperty(s, u, c);
      else s[u] = t[u];
    }

  s.default = t;
  if (o) o.set(t, s);
  return s;
}

function V() {
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

require('./503');

require('./385');

var module389 = require('./389'),
  module491 = require('./491').strings,
  A = 0,
  x = (function (t) {
    module7.default(C, t);

    var module506 = C,
      module934 = V(),
      I = function () {
        var t,
          n = module11.default(module506);

        if (module934) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function C(t) {
      var n;
      module4.default(this, C);
      (n = I.call(this, t)).state = {
        serialNumber: module390.default.sharedCache().serialNumber,
      };
      n.pressWhiteBoardCount = 0;
      return n;
    }

    module5.default(C, [
      {
        key: 'componentDidMount',
        value: function () {
          var t = this;
          this.getSerialNumber();
          this.getLocalRobotTimezone();
          this.getTimeZone();
          if (module389.isMiApp)
            module389.getDevicePropertyFromMemCache(['ssid', 'localip', 'mac'], function (n) {
              if (n.ssid || n.localip || n.mac)
                t.setState({
                  ssid: n.ssid || Unknown,
                  ip: n.localip || Unknown,
                  mac: n.mac || Unknown,
                  firmwareVersion: n.lastVersion || Unknown,
                });
              else t.fetchNetworkInfo();
            });

          if (!module389.isMiApp) {
            this.fetchNetworkInfo();
            this.getFirmwareVersionRoborock();
          }
        },
      },
      {
        key: 'getSerialNumber',
        value: function () {
          var t, o;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    s.next = 2;
                    return regeneratorRuntime.default.awrap(module407.default.getSerialNumber());

                  case 2:
                    t = s.sent;
                    console.log('getSerialNumber --- ' + JSON.stringify(t));

                    if (t.result) {
                      o = t.result[0].serial_number;
                      module390.default.sharedCache().serialNumber = o;
                      if ('' == o || o.length < 1) o = ' ';
                      this.setState({
                        serialNumber: o,
                      });
                    }

                  case 5:
                  case 'end':
                    return s.stop();
                }
            },
            null,
            this,
            null,
            Promise
          );
        },
      },
      {
        key: 'getTimeZone',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.next = 2;
                    return regeneratorRuntime.default.awrap(module407.default.getTimeZone());

                  case 2:
                    t = o.sent;
                    console.log('getTimeZone --- ' + JSON.stringify(t));
                    module387.default.timeZoneChange(t.result[0]);
                    this.setState({
                      timezone: timezone,
                    });

                  case 6:
                  case 'end':
                    return o.stop();
                }
            },
            null,
            this,
            null,
            Promise
          );
        },
      },
      {
        key: 'getFirmwareVersionRoborock',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    if (!module387.default.isShareUser()) {
                      o.next = 3;
                      break;
                    }

                    this.setState({
                      firmwareVersion: module491.share_device,
                    });
                    return o.abrupt('return');

                  case 3:
                    if (module389.isSupportFirmwareVersion()) {
                      o.next = 5;
                      break;
                    }

                    return o.abrupt('return');

                  case 5:
                    o.next = 7;
                    return regeneratorRuntime.default.awrap(module389.getFirmwareVersion());

                  case 7:
                    if (undefined != (t = o.sent) && undefined != t.currentVersion)
                      this.setState({
                        firmwareVersion: t.currentVersion,
                      });

                  case 9:
                  case 'end':
                    return o.stop();
                }
            },
            null,
            this,
            null,
            Promise
          );
        },
      },
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          console.log('System Info : ' + JSON.stringify(module389.systemInfo));
        },
      },
      {
        key: 'getItems',
        value: function () {
          var t = this;
          return [
            {
              title: module491.debug_info_serial_model,
              detail: module389.deviceModel,
              detailWidth: 350,
              onPress: function () {
                return t.onPressItem(module389.deviceModel);
              },
              shouldShowRightArrow: false,
              visible: true,
            },
            {
              title: module491.debug_info_serial_number,
              detail: this.handleEmptyString(this.state.serialNumber),
              detailWidth: 350,
              onPress: function () {
                return t.onPressItem(t.state.serialNumber);
              },
              shouldShowRightArrow: false,
              visible: true,
            },
            {
              title: module389.isMiApp ? module491.debug_info_xiaomi_id : 'UID',
              detail: module389.userId,
              detailWidth: 350,
              onPress: function () {
                return t.onPressItem(module389.userId);
              },
              shouldShowRightArrow: false,
              visible: true,
            },
            {
              title: module491.app_vesion_info,
              detail: module389.currentAppVersion() + '(' + ('ios' == module12.Platform.OS ? 'iOS' : 'Android') + ' ' + module12.Platform.Version + ')',
              detailWidth: 350,
              onPress: function () {
                return t.onPressItem(module389.currentAppVersion() + ' ' + ('ios' == module12.Platform.OS ? 'iOS' : 'Android') + ' ' + module12.Platform.Version);
              },
              shouldShowRightArrow: false,
              visible: !module389.isMiApp && module389.currentAppVersion(),
            },
            {
              title: module491.debug_info_firmware_version,
              detail: this.state.firmwareVersion,
              detailWidth: 350,
              onPress: function () {
                return t.onPressItem(t.state.firmwareVersion);
              },
              shouldShowRightArrow: false,
              visible: module389.isMiApp || module389.isSupportFirmwareVersion(),
            },
            {
              title: module491.debug_info_plugin_version,
              detail: module387.default.pluginVersion(),
              detailWidth: 350,
              onPress: function () {
                return t.onPressItem(module387.default.pluginVersion());
              },
              shouldShowRightArrow: false,
              visible: true,
            },
            {
              title: 'DID',
              detail: module387.default.getDid(),
              detailWidth: 350,
              onPress: function () {
                return t.onPressItem(module387.default.getDid());
              },
              shouldShowRightArrow: false,
              visible: !module389.isMiApp,
            },
            {
              title: module491.localization_strings_Setting_General_NetInfoPage_0,
              detail: this.state.ssid,
              detailWidth: 350,
              onPress: function () {
                return t.onPressItem(t.state.ssid);
              },
              shouldShowRightArrow: false,
              visible: true,
            },
            {
              title: module491.localization_strings_Setting_General_NetInfoPage_1,
              detail: this.state.ip,
              detailWidth: 350,
              onPress: function () {
                return t.onPressItem(t.state.ip);
              },
              shouldShowRightArrow: false,
              visible: true,
            },
            {
              title: module491.localization_strings_Setting_General_NetInfoPage_2,
              detailWidth: 350,
              detail: this.state.mac,
              onPress: function () {
                return t.onPressItem(t.state.mac);
              },
              shouldShowRightArrow: false,
              visible: true,
              shouldShowBottomLine: false,
            },
          ];
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.context.theme,
            s = this.getItems().map(function (t, n) {
              return t.visible
                ? React.default.createElement(
                    module381.SettingListItemView,
                    module21.default({}, t, {
                      key: n,
                      titleColor: 'rgba(0,0,0,0.8)',
                    })
                  )
                : React.default.createElement(module12.View, {
                    key: n,
                  });
            });
          return React.default.createElement(
            module12.Modal,
            {
              transparent: true,
              visible: true,
              onRequestClose: this.onPressHideButton.bind(this),
            },
            React.default.createElement(
              module12.TouchableWithoutFeedback,
              {
                onPress: function () {
                  t.onPressHideButton();
                },
              },
              React.default.createElement(
                module12.View,
                {
                  style: [module387.default.iOSAndroidReturn(O.iOSContainer, O.androidContainer)],
                },
                React.default.createElement(
                  module1353.default,
                  {
                    onClose: function () {
                      t.onPressHideButton();
                    },
                  },
                  React.default.createElement(
                    module12.View,
                    {
                      style: [
                        O.contentView,
                        {
                          backgroundColor: n.productInfo.btnBackgroundColor,
                          borderTopLeftRadius: 14,
                          borderTopRightRadius: 14,
                        },
                      ],
                    },
                    React.default.createElement(module1353.SwipeDownIndicator, {
                      style: {
                        marginTop: 10,
                      },
                    }),
                    React.default.createElement(
                      module12.ScrollView,
                      {
                        style: {
                          marginVertical: 20,
                        },
                      },
                      s,
                      React.default.createElement(
                        module12.TouchableWithoutFeedback,
                        {
                          onPress: this.onPressWhiteBoard.bind(this),
                        },
                        React.default.createElement(
                          module12.View,
                          {
                            style: [
                              O.bottom,
                              {
                                backgroundColor: n.settingBackgroundColor,
                              },
                            ],
                          },
                          React.default.createElement(module381.PureButton, {
                            title: module491.debug_info_copy_all,
                            funcId: 'debug_info_page_copy_button',
                            textColor: n.productInfo.btnTextColor,
                            fontSize: 20,
                            style: [
                              O.button,
                              {
                                backgroundColor: n.productInfo.btnBackgroundColor,
                              },
                            ],
                            onPress: function () {
                              return t.onPressCopyButton();
                            },
                          })
                        )
                      )
                    )
                  )
                )
              )
            )
          );
        },
      },
      {
        key: 'onPressWhiteBoard',
        value: function () {},
      },
      {
        key: 'onPressItem',
        value: function (t) {
          module12.Clipboard.setString(t);
          this.props.parent.showMsg(module491.debug_info_copy_success);
        },
      },
      {
        key: 'onPressCopyButton',
        value: function () {
          var t = '';
          this.getItems().forEach(function (n) {
            if (n.visible) t += n.title + ' : ' + n.detail + ', ';
          });
          module12.Clipboard.setString(t);
          this.props.parent.showMsg(module491.debug_info_copy_success);
          this.onPressHideButton();
        },
      },
      {
        key: 'onPressHideButton',
        value: function () {
          A = 0;
          this.props.parent.setState({
            shouldShowDebugInfoView: false,
          });
        },
      },
      {
        key: 'fetchNetworkInfo',
        value: function () {
          var t,
            o = this;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    s.prev = 0;
                    s.next = 3;
                    return regeneratorRuntime.default.awrap(module407.default.getNetworkInfo());

                  case 3:
                    t = s.sent;
                    console.log('fetchNetworkInfo --- ' + JSON.stringify(t));
                    if (this.props.parent.state.shouldShowDebugInfoView)
                      this.setState({
                        ssid: t.result.ssid || Unknown,
                        ip: t.result.ip || Unknown,
                        mac: t.result.mac || Unknown,
                      });
                    s.next = 12;
                    break;

                  case 8:
                    s.prev = 8;
                    s.t0 = s.catch(0);

                    if (A < 10 && this.props.parent.state.shouldShowDebugInfoView) {
                      A++;
                      setTimeout(function () {
                        o.fetchNetworkInfo();
                      }, 1e3);
                    } else {
                      A = 0;
                      this.props.parent.showMsg(module491.localization_strings_Setting_CleanModePage_3);
                    }

                    console.log('fetchNetworkInfo error: ' + ('object' == typeof s.t0 ? JSON.stringify(s.t0) : s.t0));

                  case 12:
                  case 'end':
                    return s.stop();
                }
            },
            null,
            this,
            [[0, 8]],
            Promise
          );
        },
      },
      {
        key: 'getLocalRobotTimezone',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.prev = 0;
                    o.t0 = module387.default;
                    o.next = 4;
                    return regeneratorRuntime.default.awrap(module411.GetStorageKey(module411.StorageKeys.RobotTimeZone));

                  case 4:
                    o.t1 = o.sent;
                    t = o.t0.timeZoneChange.call(o.t0, o.t1);
                    this.setState({
                      timezone: t,
                    });
                    console.log('getLocalRobotTimezone  timeZone: ' + t);
                    o.next = 13;
                    break;

                  case 10:
                    o.prev = 10;
                    o.t2 = o.catch(0);
                    console.log('getLocalRobotTimezone  error: ' + ('object' == typeof o.t2 ? JSON.stringify(o.t2) : o.t2));

                  case 13:
                  case 'end':
                    return o.stop();
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
        key: 'handleEmptyString',
        value: function (t) {
          return '' === t || undefined == t || t.length < 1 ? ' ' : t;
        },
      },
    ]);
    return C;
  })(React.Component);

exports.default = x;
x.contextType = module506.AppConfigContext;
var O = module12.StyleSheet.create({
  androidContainer: {
    width: module12.Dimensions.get('window').width,
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: module934.AppBorderRadius,
  },
  iOSContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: module12.Dimensions.get('window').width,
    height: module12.Dimensions.get('window').height,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
    borderRadius: module934.AppBorderRadius,
  },
  contentView: {
    backgroundColor: 'white',
    width: module12.Dimensions.get('window').width,
  },
  bottom: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignSelf: 'stretch',
    justifyContent: 'space-around',
  },
  button: {
    width: module12.Dimensions.get('window').width,
    height: 70,
    marginTop: 10,
  },
});
