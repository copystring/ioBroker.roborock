var module22 = require('./22'),
  regeneratorRuntime = require('regenerator-runtime'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module385 = require('./385'),
  module414 = require('./414'),
  module394 = require('./394'),
  module515 = require('./515'),
  module390 = require('./390'),
  module1802 = require('./1802'),
  module418 = require('./418'),
  module381 = require('./381');

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

require('./1153');

var module500 = require('./500').strings,
  module389 = require('./389'),
  V = 0,
  W = {
    0: module500.dust_collection_title_1,
    1: module500.dust_collection_title_2,
    2: module500.dust_collection_title_3,
    3: module500.localization_strings_Common_Protocol_2,
    4: module500.dust_collection_title_5,
  },
  P = {
    7200: module500.dock_kit_setting2,
    10800: module500.dock_kit_setting3,
    14400: module500.dock_kit_setting1,
  },
  module1984 = (function (t) {
    module7.default(I, t);

    var n = I,
      module515 = T(),
      module1983 = function () {
        var t,
          o = module11.default(n);

        if (module515) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, s);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function I(t) {
      var n;
      module4.default(this, I);
      n = module1983.call(this, t);
      t.navigation.state.params;
      n.pressTitleCount = 0;
      n.state = {
        loading: true,
        requestFailed: false,
        refreshing: false,
        washTowelMode: module394.default.sharedCache().washTowelMode,
        washValue: 0,
        backWashMode: 0,
        dustCollectionSwitch: false,
        dustCollectionMode: module394.default.sharedCache().dustCollectionMode,
        isStartDryerSwitchOn: false,
        dryTime: 7200,
      };
      return n;
    }

    module5.default(I, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {},
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          if (this.setListener) this.setListener.remove();
        },
      },
      {
        key: 'componentDidMount',
        value: function () {
          var t = this;
          this.props.navigation.setParams({
            navBarBackgroundColor: this.context.theme.settingBackgroundColor,
            hiddenBottomLine: true,
            onPressTitle: this.onPressTitle.bind(this),
          });
          this.initData(false);
          this.setListener = module12.DeviceEventEmitter.addListener(module418.NotificationKeys.SelfCleaningSetDidChange, function (n) {
            if ('washTowelMode' == n.name)
              t.setState({
                washTowelMode: n.mode,
              });
            if ('backWashMode' == n.name)
              t.setState({
                backWashMode: n.mode,
                washValue: n.value,
              });
            if ('dustCollectionMode' == n.name)
              t.setState({
                dustCollectionMode: n.mode,
              });
            if ('dryTime' == n.name)
              t.setState({
                dryTime: n.value,
              });
          });
        },
      },
      {
        key: 'onPressTitle',
        value: function () {
          console.log('onPressTitle');
          this.pressTitleCount++;

          if (this.pressTitleCount >= 5) {
            this.pressTitleCount = 0;
            this.props.navigation.navigate('ChangeWaterDebugPage');
          }
        },
      },
      {
        key: 'initData',
        value: function (t) {
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    this.setState({
                      loading: !t,
                      requestFailed: false,
                      refreshing: t,
                    });
                    n.prev = 1;
                    n.next = 4;
                    return regeneratorRuntime.default.awrap(this.getWashTowelModeStatus());

                  case 4:
                    n.next = 6;
                    return regeneratorRuntime.default.awrap(this.getSmartWashParams());

                  case 6:
                    n.next = 8;
                    return regeneratorRuntime.default.awrap(this.getDustCollectionModeStatus());

                  case 8:
                    n.next = 10;
                    return regeneratorRuntime.default.awrap(this.getDustCollectionStatus());

                  case 10:
                    if (((n.t0 = module390.default.isSupportedDrying()), !n.t0)) {
                      n.next = 14;
                      break;
                    }

                    n.next = 14;
                    return regeneratorRuntime.default.awrap(this.getDryerSetting());

                  case 14:
                    this.finishLoading(false);
                    V = 0;
                    n.next = 22;
                    break;

                  case 18:
                    n.prev = 18;
                    n.t1 = n.catch(1);
                    console.log('initData - ' + n.t1);
                    this.retry(t);

                  case 22:
                  case 'end':
                    return n.stop();
                }
            },
            null,
            this,
            [[1, 18]],
            Promise
          );
        },
      },
      {
        key: 'retry',
        value: function (t) {
          var n = this;

          if (V < 3) {
            V++;
            setTimeout(function () {
              console.log('retryTimes:' + V);
              n.initData(t);
            }, 1e3);
          } else
            this.setState({
              requestFailed: true,
            });
        },
      },
      {
        key: 'finishLoading',
        value: function (t) {
          this.setState({
            requestFailed: t,
            loading: false,
            refreshing: false,
          });
        },
      },
      {
        key: 'getWashTowelModeStatus',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    n.prev = 0;
                    n.next = 3;
                    return regeneratorRuntime.default.awrap(module414.default.getWashTowelMode());

                  case 3:
                    t = n.sent;
                    console.log('getWashTowelModeStatus: ' + JSON.stringify(t));
                    this.setState({
                      washTowelMode: t.result.wash_mode,
                    });
                    n.next = 12;
                    break;

                  case 8:
                    n.prev = 8;
                    n.t0 = n.catch(0);
                    globals.showToast(module500.robot_communication_exception);
                    console.log(n.t0);

                  case 12:
                  case 'end':
                    return n.stop();
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
        key: 'getSmartWashParams',
        value: function () {
          var t, n, o, l;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    c.prev = 0;
                    c.next = 3;
                    return regeneratorRuntime.default.awrap(module414.default.getSmartWashParams());

                  case 3:
                    t = c.sent;
                    n = parseInt(t.result.wash_interval / 60);
                    o = t.result.smart_wash;
                    l = 1 == o ? 0 : n % 5 ? 2 : 1;
                    this.setState({
                      backWashMode: l,
                      washValue: n,
                    });
                    c.next = 14;
                    break;

                  case 10:
                    c.prev = 10;
                    c.t0 = c.catch(0);
                    globals.showToast(module500.robot_communication_exception);
                    console.log(c.t0);

                  case 14:
                  case 'end':
                    return c.stop();
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
        key: 'getDustCollectionModeStatus',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    n.prev = 0;
                    n.next = 3;
                    return regeneratorRuntime.default.awrap(module414.default.getDustCollectionMode());

                  case 3:
                    t = n.sent;
                    console.log('getDustCollectionModeStatus: ' + JSON.stringify(t));
                    this.setState({
                      dustCollectionMode: t.result.mode,
                    });
                    n.next = 12;
                    break;

                  case 8:
                    n.prev = 8;
                    n.t0 = n.catch(0);
                    globals.showToast(module500.robot_communication_exception);
                    console.log(n.t0);

                  case 12:
                  case 'end':
                    return n.stop();
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
        key: 'getDustCollectionStatus',
        value: function () {
          var t, n;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.prev = 0;
                    o.next = 3;
                    return regeneratorRuntime.default.awrap(module414.default.getDustCollectionStatus());

                  case 3:
                    t = o.sent;
                    console.log('getDustCollectionModeStatus - ' + JSON.stringify(t));
                    n = t.result.status;
                    this.setState({
                      dustCollectionSwitch: 1 == n,
                    });
                    o.next = 13;
                    break;

                  case 9:
                    o.prev = 9;
                    o.t0 = o.catch(0);
                    console.log(o.t0);
                    this.setState({
                      dustCollectionVisible: false,
                    });

                  case 13:
                  case 'end':
                    return o.stop();
                }
            },
            null,
            this,
            [[0, 9]],
            Promise
          );
        },
      },
      {
        key: 'onDustCollectionValueChanged',
        value: function (t) {
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    this.setState({
                      dustCollectionSwitch: t,
                    });
                    n.prev = 1;
                    n.next = 4;
                    return regeneratorRuntime.default.awrap(module414.default.setDustCollectionStatus(t ? 1 : 0));

                  case 4:
                    n.next = 12;
                    break;

                  case 7:
                    n.prev = 7;
                    n.t0 = n.catch(1);
                    this.setState({
                      dustCollectionSwitch: !t,
                    });
                    globals.showToast(module500.robot_communication_exception);
                    console.log(n.t0);

                  case 12:
                  case 'end':
                    return n.stop();
                }
            },
            null,
            this,
            [[1, 7]],
            Promise
          );
        },
      },
      {
        key: 'getDryerSetting',
        value: function () {
          var t, n, o, l;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    c.prev = 0;
                    c.next = 3;
                    return regeneratorRuntime.default.awrap(module414.default.getDryerSetting());

                  case 3:
                    t = c.sent;
                    n = t.result.status;
                    o = t.result.on;
                    l = o.dry_time;
                    this.setState({
                      isStartDryerSwitchOn: !!n,
                      dryTime: l,
                    });
                    c.next = 13;
                    break;

                  case 10:
                    c.prev = 10;
                    c.t0 = c.catch(0);
                    console.log('getDryerSetting  error: ' + ('object' == typeof c.t0 ? JSON.stringify(c.t0) : c.t0));

                  case 13:
                  case 'end':
                    return c.stop();
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
        key: 'setDryerSetting',
        value: function (t, n) {
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.prev = 0;
                    o.next = 3;
                    return regeneratorRuntime.default.awrap(module414.default.setDryerSetting(t, n));

                  case 3:
                    this.setState({
                      dryTime: t,
                    });
                    o.next = 10;
                    break;

                  case 7:
                    o.prev = 7;
                    o.t0 = o.catch(0);
                    console.log('setDryerSetting  error: ' + ('object' == typeof o.t0 ? JSON.stringify(o.t0) : o.t0));

                  case 10:
                  case 'end':
                    return o.stop();
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
        key: 'onStartDryerSwitchValueChanged',
        value: function (t) {
          if (t) {
            if (this.dryerGuideView) this.dryerGuideView.show();
          } else this.setStartDryerSwitch(t);
        },
      },
      {
        key: 'setStartDryerSwitch',
        value: function (t) {
          if (this.dryerGuideView) this.dryerGuideView.dismissModalView();
          this.setState({
            isStartDryerSwitchOn: t,
          });
          var n = t ? 1 : 0;
          this.setDryerSetting(this.state.dryTime, n);
        },
      },
      {
        key: 'getWashTowelData',
        value: function () {
          var t = this.state.backWashMode == module389.BackWashModeMap.BackWashModeSmart ? module500.back_wash_title1 : this.state.washValue + 'min',
            n =
              this.state.washTowelMode == module389.WashTowelModeMap.WashTowelModeQuick
                ? module500.wash_towel_mode_title_1
                : this.state.washTowelMode == module389.WashTowelModeMap.WashTowelModeDaily
                ? module500.wash_towel_mode_title_2
                : module500.wash_towel_mode_title_3;
          return [
            {
              title: module500.wash_towel_mode_title,
              funcId: 'wash_towel_mode_title',
              detail: n,
              isDetailCenter: false,
              rightCenter: true,
              bottomDetail: module500.dock_kit_setting15,
              onPress: this.openWashTowelPage.bind(this, false),
              visible: true,
              shouldShowBottomLine: true,
              detailWidth: 150,
              titleWidth: 150,
            },
            {
              title: module500.back_wash_time_setting,
              funcId: 'back_wash_time_setting',
              detail: t,
              isDetailCenter: false,
              rightCenter: true,
              bottomDetail: module500.dock_kit_setting16,
              onPress: this.openWashTowelPage.bind(this, true),
              visible: true,
              shouldShowBottomLine: false,
              detailWidth: 150,
              titleWidth: 150,
            },
          ];
        },
      },
      {
        key: 'getDustCollectionData',
        value: function () {
          return [
            {
              title: module500.dust_collection_title,
              funcId: 'setting_page_dust_collection',
              bottomDetail: this.state.dustCollectionSwitch ? module500.dust_collection_info : module500.dust_collection_info_close,
              shouldShowSwitch: true,
              switchOn: this.state.dustCollectionSwitch,
              switchValueChanged: this.onDustCollectionValueChanged.bind(this),
              visible: true,
              shouldShowBottomLine: false,
            },
            {
              title: module500.dust_collection_desc_title,
              funcId: 'dust_collection_desc_title',
              detail: W[this.state.dustCollectionMode],
              onPress: this.openDustCollectionPage.bind(this, true),
              visible: this.state.dustCollectionSwitch,
              shouldShowBottomLine: false,
              shouldShowTopLine: true,
              detailWidth: 150,
              titleWidth: 150,
            },
          ];
        },
      },
      {
        key: 'openWashTowelPage',
        value: function (t) {
          this.props.navigation.navigate('WashTowelSetting', {
            isTimeSetting: t,
            title: t ? module500.back_wash_time_setting : module500.wash_towel_mode_title,
          });
        },
      },
      {
        key: 'openDustCollectionPage',
        value: function (t) {
          this.props.navigation.navigate('DustCollectionModeSetting', {
            title: module500.dust_collection_desc_title,
            isSetMode: t,
          });
        },
      },
      {
        key: 'openDryerTimeSetPagePage',
        value: function () {
          this.props.navigation.navigate('DryTimeSettingPage', {
            dryTime: this.state.dryTime,
            title: module500.dock_kit_setting6,
          });
        },
      },
      {
        key: 'getDryerSettingData',
        value: function () {
          return [
            {
              title: module500.dock_kit_setting5,
              shouldShowSwitch: true,
              bottomDetail: module500.dock_kit_setting17,
              switchOn: this.state.isStartDryerSwitchOn,
              switchValueChanged: this.onStartDryerSwitchValueChanged.bind(this),
              shouldShowBottomLine: false,
              visible: module390.default.isSupportedDrying(),
              funcId: 'back_wash_title1',
            },
            {
              title: module500.dock_kit_setting6,
              funcId: 'dust_collection_desc_title',
              detail: P[this.state.dryTime],
              onPress: this.openDryerTimeSetPagePage.bind(this, true),
              visible: module390.default.isSupportedDrying() && this.state.isStartDryerSwitchOn,
              shouldShowBottomLine: false,
              shouldShowTopLine: true,
              detailWidth: 150,
              titleWidth: 150,
            },
          ];
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.context.theme,
            s = React.default.createElement(module385.RequestRetryView, {
              onPressButton: function () {
                V = 0;
                t.initData(false);
              },
            });
          if (this.state.requestFailed) return s;
          var l = React.default.createElement(
            module12.View,
            {
              style: [
                L.containterView,
                {
                  backgroundColor: n.settingBackgroundColor,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ],
            },
            React.default.createElement(module385.Spinner, null)
          );
          if (this.state.loading) return l;
          var c = this.getWashTowelData().map(function (t, n) {
              return t.visible
                ? t.title
                  ? React.default.createElement(
                      module385.SettingListItemView,
                      module22.default({}, t, {
                        key: n,
                        fontSize: 16,
                        width: module12.Dimensions.get('window').width - 30,
                        bottomDetailWidth: module12.Dimensions.get('window').width - 70,
                      })
                    )
                  : React.default.createElement(module12.View, null)
                : null;
            }),
            u = this.getDustCollectionData().map(function (t, n) {
              return t.visible
                ? t.title
                  ? React.default.createElement(
                      module385.SettingListItemView,
                      module22.default({}, t, {
                        key: n,
                        width: module12.Dimensions.get('window').width - 30,
                        bottomDetailWidth: module12.Dimensions.get('window').width - 70,
                      })
                    )
                  : React.default.createElement(module12.View, null)
                : null;
            }),
            h = this.getDryerSettingData().map(function (t, n) {
              return t.visible
                ? t.title
                  ? React.default.createElement(
                      module385.SettingListItemView,
                      module22.default({}, t, {
                        key: n,
                        fontSize: 16,
                        width: module12.Dimensions.get('window').width - 30,
                        bottomDetailWidth: module12.Dimensions.get('window').width - 70,
                      })
                    )
                  : React.default.createElement(module12.View, null)
                : null;
            });
          return React.default.createElement(
            module12.View,
            {
              style: [
                L.containter,
                {
                  backgroundColor: n.settingBackgroundColor,
                },
              ],
            },
            React.default.createElement(
              module12.ScrollView,
              {
                style: L.containterScroll,
                showsVerticalScrollIndicator: false,
                refreshControl: React.default.createElement(module12.RefreshControl, {
                  refreshing: this.state.refreshing,
                  onRefresh: function () {
                    V = 0;
                    t.initData(true);
                  },
                }),
              },
              React.default.createElement(
                module12.View,
                null,
                React.default.createElement(module12.View, {
                  style: L.section,
                }),
                React.default.createElement(
                  module12.View,
                  {
                    style: {
                      borderRadius: 8,
                      overflow: 'hidden',
                      marginHorizontal: 15,
                    },
                  },
                  c
                ),
                React.default.createElement(module12.View, {
                  style: L.section,
                }),
                React.default.createElement(
                  module12.View,
                  {
                    style: {
                      borderRadius: 8,
                      overflow: 'hidden',
                      marginHorizontal: 15,
                    },
                  },
                  u
                ),
                React.default.createElement(module12.View, {
                  style: L.section,
                }),
                React.default.createElement(
                  module12.View,
                  {
                    style: {
                      borderRadius: 8,
                      overflow: 'hidden',
                      marginHorizontal: 15,
                    },
                  },
                  h
                )
              ),
              React.default.createElement(module12.View, {
                style: L.section,
              })
            ),
            React.default.createElement(module1802.default, {
              ref: function (n) {
                t.dryerGuideView = n;
              },
              parent: this,
              isModal: true,
              bgImage: module381.RSM.isO3Dock() ? require('./1983') : require('./1984'),
              topTitle: module500.dock_kit_setting11,
              context: module500.dock_kit_setting12,
              buttonInfo: [module500.localization_strings_Main_MainPage_11, module500.dock_kit_setting14],
              buttonFuncId: ['dryer_setting_guide_left', 'dryer_setting_guide_right'],
              onPressGoSetting: function () {
                return t.setStartDryerSwitch(true);
              },
            })
          );
        },
      },
    ]);
    return I;
  })(React.Component);

exports.default = module1984;
module1984.contextType = module515.AppConfigContext;
var L = module12.StyleSheet.create({
  containterView: {
    flex: 1,
  },
  containter: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  containterScroll: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  infoTextView: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  infoText: {
    color: 'rgba(0,0,0,0.3)',
    left: 15,
    paddingBottom: 10,
    fontSize: 16,
  },
  section: {
    paddingVertical: 10,
  },
  dryView: {
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    alignSelf: 'flex-start',
    paddingLeft: 20,
    paddingVertical: 20,
    fontSize: 16,
  },
});
