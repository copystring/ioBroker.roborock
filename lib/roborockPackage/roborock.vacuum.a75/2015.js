require('./390');

require('./420');

require('./424');

var module22 = require('./22'),
  regeneratorRuntime = require('regenerator-runtime'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module385 = require('./385'),
  module391 = require('./391'),
  module416 = require('./416'),
  module394 = require('./394'),
  module1199 = require('./1199'),
  module1616 = require('./1616'),
  module1343 = require('./1343');

function k() {
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

require('./1491');

require('./389');

var module393 = require('./393'),
  module510 = require('./510').strings,
  D = 0,
  N = (function (t) {
    module9.default(N, t);

    var n = N,
      module1199 = k(),
      P = function () {
        var t,
          o = module12.default(n);

        if (module1199) {
          var s = module12.default(this).constructor;
          t = Reflect.construct(o, arguments, s);
        } else t = o.apply(this, arguments);

        return module11.default(this, t);
      };

    function N(t) {
      var n;
      module6.default(this, N);
      (n = P.call(this, t)).state = {
        serialNumber: module394.default.sharedCache().serialNumber,
      };
      n.pressWhiteBoardCount = 0;
      return n;
    }

    module7.default(N, [
      {
        key: 'componentDidMount',
        value: function () {
          var t = this;
          this.getSerialNumber();
          if (module393.isMiApp)
            module393.getDevicePropertyFromMemCache(['ssid', 'localip', 'mac'], function (n) {
              if (n.ssid || n.localip || n.mac)
                t.setState({
                  ssid: n.ssid || Unknown,
                  ip: n.localip || Unknown,
                  mac: n.mac || Unknown,
                  firmwareVersion: n.lastVersion || Unknown,
                });
              else t.fetchNetworkInfo();
            });

          if (!module393.isMiApp) {
            this.fetchNetworkInfo();
            this.getFirmwareVersionRoborock();
          }
        },
      },
      {
        key: 'getSerialNumber',
        value: function () {
          var t, n;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.next = 2;
                    return regeneratorRuntime.default.awrap(module416.default.getSerialNumber());

                  case 2:
                    t = o.sent;
                    console.log('getSerialNumber --- ' + JSON.stringify(t));

                    if (t.result) {
                      n = t.result[0].serial_number;
                      module394.default.sharedCache().serialNumber = n;
                      if ('' == n || n.length < 1) n = ' ';
                      this.setState({
                        serialNumber: n,
                      });
                    }

                  case 5:
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
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    if (!module391.default.isShareUser()) {
                      n.next = 3;
                      break;
                    }

                    this.setState({
                      firmwareVersion: module510.share_device,
                    });
                    return n.abrupt('return');

                  case 3:
                    if (module393.isSupportFirmwareVersion()) {
                      n.next = 5;
                      break;
                    }

                    return n.abrupt('return');

                  case 5:
                    n.next = 7;
                    return regeneratorRuntime.default.awrap(module393.getFirmwareVersion());

                  case 7:
                    if (undefined != (t = n.sent) && undefined != t.currentVersion)
                      this.setState({
                        firmwareVersion: t.currentVersion,
                      });

                  case 9:
                  case 'end':
                    return n.stop();
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
          console.log('System Info : ' + JSON.stringify(module393.systemInfo));
        },
      },
      {
        key: 'getItems',
        value: function () {
          var t = this;
          return [
            {
              title: module510.debug_info_serial_model,
              funcId: 'debug_info_serial_model',
              detail: module393.deviceModel,
              detailWidth: 350,
              onPress: function () {
                return t.onPressItem(module393.deviceModel);
              },
              shouldShowRightArrow: false,
              visible: true,
            },
            {
              title: module510.debug_info_serial_number,
              funcId: 'debug_info_serial_number',
              detail: this.handleEmptyString(this.state.serialNumber),
              detailWidth: 350,
              onPress: function () {
                return t.onPressItem(t.state.serialNumber);
              },
              shouldShowRightArrow: false,
              visible: true,
            },
            {
              title: module393.isMiApp ? module510.debug_info_xiaomi_id : 'UID',
              funcId: 'debug_info_xiaomi_id',
              detail: module393.userId,
              detailWidth: 350,
              onPress: function () {
                return t.onPressItem(module393.userId);
              },
              shouldShowRightArrow: false,
              visible: true,
            },
            {
              title: module510.app_vesion_info,
              funcId: 'app_vesion_info',
              detail: module391.default.getAppDisplayVersion(),
              detailWidth: 350,
              onPress: function () {
                return t.onPressItem(module393.currentAppVersion() + ' ' + ('ios' == module13.Platform.OS ? 'iOS' : 'Android') + ' ' + module13.Platform.Version);
              },
              shouldShowRightArrow: false,
              visible: !module393.isMiApp && module393.currentAppVersion(),
            },
            {
              title: module510.debug_info_firmware_version,
              funcId: 'debug_info_firmware_version',
              detail: this.state.firmwareVersion,
              detailWidth: 350,
              onPress: function () {
                return t.onPressItem(t.state.firmwareVersion);
              },
              shouldShowRightArrow: false,
              visible: module393.isMiApp || module393.isSupportFirmwareVersion(),
            },
            {
              title: module510.debug_info_plugin_version,
              funcId: 'debug_info_plugin_version',
              detail: module391.default.pluginVersion(),
              detailWidth: 350,
              onPress: function () {
                return t.onPressItem(module391.default.pluginVersion());
              },
              shouldShowRightArrow: false,
              visible: true,
            },
            {
              title: 'DID',
              funcId: 'DIDDIDDIDDIDDID',
              detail: module391.default.getDid(),
              detailWidth: 350,
              onPress: function () {
                return t.onPressItem(module391.default.getDid());
              },
              shouldShowRightArrow: false,
              visible: !module393.isMiApp,
            },
            {
              title: module510.localization_strings_Setting_General_NetInfoPage_0,
              funcId: 'localization_strings_Setting_General_NetInfoPage_0',
              detail: this.state.ssid,
              detailWidth: 350,
              onPress: function () {
                return t.onPressItem(t.state.ssid);
              },
              shouldShowRightArrow: false,
              visible: true,
            },
            {
              title: module510.localization_strings_Setting_General_NetInfoPage_1,
              funcId: 'localization_strings_Setting_General_NetInfoPage_1',
              detail: this.state.ip,
              detailWidth: 350,
              onPress: function () {
                return t.onPressItem(t.state.ip);
              },
              shouldShowRightArrow: false,
              visible: true,
            },
            {
              title: module510.localization_strings_Setting_General_NetInfoPage_2,
              funcId: 'localization_strings_Setting_General_NetInfoPage_2',
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
                    module385.SettingListItemView,
                    module22.default({}, t, {
                      key: n,
                      titleColor: 'rgba(0,0,0,0.8)',
                    })
                  )
                : React.default.createElement(module13.View, {
                    key: n,
                  });
            });
          return React.default.createElement(
            module13.Modal,
            {
              transparent: true,
              visible: true,
              onRequestClose: this.onPressHideButton.bind(this),
            },
            React.default.createElement(
              module13.TouchableWithoutFeedback,
              {
                onPress: function () {
                  t.onPressHideButton();
                },
              },
              React.default.createElement(
                module13.View,
                {
                  style: [module391.default.iOSAndroidReturn(R.iOSContainer, R.androidContainer)],
                },
                React.default.createElement(
                  module1616.default,
                  {
                    onClose: function () {
                      t.onPressHideButton();
                    },
                  },
                  React.default.createElement(
                    module13.View,
                    {
                      style: [
                        R.contentView,
                        {
                          backgroundColor: n.productInfo.btnBackgroundColor,
                          borderTopLeftRadius: 14,
                          borderTopRightRadius: 14,
                        },
                      ],
                    },
                    React.default.createElement(module1616.SwipeDownIndicator, {
                      style: {
                        marginTop: 10,
                      },
                    }),
                    React.default.createElement(
                      module13.ScrollView,
                      {
                        style: {
                          marginVertical: 20,
                        },
                      },
                      s,
                      React.default.createElement(
                        module13.TouchableWithoutFeedback,
                        {
                          onPress: this.onPressWhiteBoard.bind(this),
                        },
                        React.default.createElement(
                          module13.View,
                          {
                            style: [
                              R.bottom,
                              {
                                backgroundColor: n.settingBackgroundColor,
                              },
                            ],
                          },
                          React.default.createElement(module385.PureButton, {
                            title: module510.debug_info_copy_all,
                            funcId: 'debug_info_page_copy_button',
                            textColor: n.productInfo.btnTextColor,
                            fontSize: 20,
                            style: [
                              R.button,
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
          module13.Clipboard.setString(t);
          this.props.parent.showMsg(module510.debug_info_copy_success);
        },
      },
      {
        key: 'onPressCopyButton',
        value: function () {
          var t = '';
          this.getItems().forEach(function (n) {
            if (n.visible) t += n.title + ' : ' + n.detail + ', ';
          });
          module13.Clipboard.setString(t);
          this.props.parent.showMsg(module510.debug_info_copy_success);
          this.onPressHideButton();
        },
      },
      {
        key: 'onPressHideButton',
        value: function () {
          D = 0;
          this.props.parent.setState({
            shouldShowDebugInfoView: false,
          });
        },
      },
      {
        key: 'fetchNetworkInfo',
        value: function () {
          var t,
            n = this;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.prev = 0;
                    o.next = 3;
                    return regeneratorRuntime.default.awrap(module416.default.getNetworkInfo());

                  case 3:
                    t = o.sent;
                    console.log('fetchNetworkInfo --- ' + JSON.stringify(t));
                    if (this.props.parent.state.shouldShowDebugInfoView)
                      this.setState({
                        ssid: t.result.ssid || Unknown,
                        ip: t.result.ip || Unknown,
                        mac: t.result.mac || Unknown,
                      });
                    o.next = 12;
                    break;

                  case 8:
                    o.prev = 8;
                    o.t0 = o.catch(0);

                    if (D < 10 && this.props.parent.state.shouldShowDebugInfoView) {
                      D++;
                      setTimeout(function () {
                        n.fetchNetworkInfo();
                      }, 1e3);
                    } else {
                      D = 0;
                      this.props.parent.showMsg(module510.localization_strings_Setting_CleanModePage_3);
                    }

                    console.log('fetchNetworkInfo error: ' + ('object' == typeof o.t0 ? JSON.stringify(o.t0) : o.t0));

                  case 12:
                  case 'end':
                    return o.stop();
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
        key: 'handleEmptyString',
        value: function (t) {
          return '' === t || undefined == t || t.length < 1 ? ' ' : t;
        },
      },
    ]);
    return N;
  })(React.Component);

exports.default = N;
N.contextType = module1199.AppConfigContext;
var R = module13.StyleSheet.create({
  androidContainer: {
    width: module13.Dimensions.get('window').width,
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: module1343.AppBorderRadius,
  },
  iOSContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: module13.Dimensions.get('window').width,
    height: module13.Dimensions.get('window').height,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
    borderRadius: module1343.AppBorderRadius,
  },
  contentView: {
    backgroundColor: 'white',
    width: module13.Dimensions.get('window').width,
  },
  bottom: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignSelf: 'stretch',
    justifyContent: 'space-around',
  },
  button: {
    width: module13.Dimensions.get('window').width,
    height: 70,
    marginTop: 10,
  },
});
