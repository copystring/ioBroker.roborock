var module22 = require('./22'),
  regeneratorRuntime = require('regenerator-runtime'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module385 = require('./385'),
  module415 = require('./415'),
  module394 = require('./394'),
  module1121 = require('./1121'),
  module390 = require('./390'),
  module1268 = require('./1268'),
  module419 = require('./419'),
  module381 = require('./381');

function x() {
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

require('./1265');

var module505 = require('./505').strings,
  module389 = require('./389'),
  V = 0,
  P = {
    0: module505.dust_collection_title_1,
    1: module505.dust_collection_title_2,
    2: module505.dust_collection_title_3,
    3: module505.localization_strings_Common_Protocol_2,
    4: module505.dust_collection_title_5,
  },
  W = {
    7200: module505.dock_kit_setting2,
    10800: module505.dock_kit_setting3,
    14400: module505.dock_kit_setting1,
  },
  module2035 = (function (t) {
    module7.default(L, t);

    var n = L,
      module1121 = x(),
      module2034 = function () {
        var t,
          o = module11.default(n);

        if (module1121) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, s);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function L(t) {
      var n;
      module4.default(this, L);
      n = module2034.call(this, t);
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
        isAutoDeliveryCleanFluidOn: false,
        dryTime: 7200,
      };
      return n;
    }

    module5.default(L, [
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
          this.setListener = module12.DeviceEventEmitter.addListener(module419.NotificationKeys.SelfCleaningSetDidChange, function (n) {
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
          if (!module390.default.isOversea()) {
            console.log('onPressTitle');
            this.pressTitleCount++;

            if (this.pressTitleCount >= 5) {
              this.pressTitleCount = 0;
              this.props.navigation.navigate('ChangeWaterDebugPage');
            }
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
                    if (((n.t0 = module381.RSM.isO4Dock()), !n.t0)) {
                      n.next = 14;
                      break;
                    }

                    n.next = 14;
                    return regeneratorRuntime.default.awrap(this.getAutoDeliveryCleanFluidStatus());

                  case 14:
                    if (((n.t1 = module390.default.isSupportedDrying()), !n.t1)) {
                      n.next = 18;
                      break;
                    }

                    n.next = 18;
                    return regeneratorRuntime.default.awrap(this.getDryerSetting());

                  case 18:
                    this.finishLoading(false);
                    V = 0;
                    n.next = 26;
                    break;

                  case 22:
                    n.prev = 22;
                    n.t2 = n.catch(1);
                    console.log('initData - ' + n.t2);
                    this.retry(t);

                  case 26:
                  case 'end':
                    return n.stop();
                }
            },
            null,
            this,
            [[1, 22]],
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
                    return regeneratorRuntime.default.awrap(module415.default.getWashTowelMode());

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
                    globals.showToast(module505.robot_communication_exception);
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
            function (u) {
              for (;;)
                switch ((u.prev = u.next)) {
                  case 0:
                    u.prev = 0;
                    u.next = 3;
                    return regeneratorRuntime.default.awrap(module415.default.getSmartWashParams());

                  case 3:
                    t = u.sent;
                    n = parseInt(t.result.wash_interval / 60);
                    o = t.result.smart_wash;
                    l = 1 == o ? 0 : n % 5 ? 2 : 1;
                    this.setState({
                      backWashMode: l,
                      washValue: n,
                    });
                    u.next = 14;
                    break;

                  case 10:
                    u.prev = 10;
                    u.t0 = u.catch(0);
                    globals.showToast(module505.robot_communication_exception);
                    console.log(u.t0);

                  case 14:
                  case 'end':
                    return u.stop();
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
                    return regeneratorRuntime.default.awrap(module415.default.getDustCollectionMode());

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
                    globals.showToast(module505.robot_communication_exception);
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
                    return regeneratorRuntime.default.awrap(module415.default.getDustCollectionStatus());

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
                    return regeneratorRuntime.default.awrap(module415.default.setDustCollectionStatus(t ? 1 : 0));

                  case 4:
                    n.next = 12;
                    break;

                  case 7:
                    n.prev = 7;
                    n.t0 = n.catch(1);
                    this.setState({
                      dustCollectionSwitch: !t,
                    });
                    globals.showToast(module505.robot_communication_exception);
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
        key: 'onAutoDeliveryCleanFluidChanged',
        value: function (t) {
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    this.setState({
                      isAutoDeliveryCleanFluidOn: t,
                    });
                    n.prev = 1;
                    n.next = 4;
                    return regeneratorRuntime.default.awrap(module415.default.setAutoDeliveryCleanFluid(t ? 1 : 0));

                  case 4:
                    n.next = 12;
                    break;

                  case 7:
                    n.prev = 7;
                    n.t0 = n.catch(1);
                    this.setState({
                      isAutoDeliveryCleanFluidOn: !t,
                    });
                    globals.showToast(module505.robot_communication_exception);
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
            function (u) {
              for (;;)
                switch ((u.prev = u.next)) {
                  case 0:
                    u.prev = 0;
                    u.next = 3;
                    return regeneratorRuntime.default.awrap(module415.default.getDryerSetting());

                  case 3:
                    t = u.sent;
                    n = t.result.status;
                    o = t.result.on;
                    l = o.dry_time;
                    this.setState({
                      isStartDryerSwitchOn: !!n,
                      dryTime: l,
                    });
                    u.next = 13;
                    break;

                  case 10:
                    u.prev = 10;
                    u.t0 = u.catch(0);
                    console.log('getDryerSetting  error: ' + ('object' == typeof u.t0 ? JSON.stringify(u.t0) : u.t0));

                  case 13:
                  case 'end':
                    return u.stop();
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
        key: 'getAutoDeliveryCleanFluidStatus',
        value: function () {
          var t, n;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.prev = 0;
                    o.next = 3;
                    return regeneratorRuntime.default.awrap(module415.default.getAutoDeliveryCleanFluid());

                  case 3:
                    t = o.sent;
                    n = t.result.status;
                    this.setState({
                      isAutoDeliveryCleanFluidOn: 1 == n,
                    });
                    o.next = 11;
                    break;

                  case 8:
                    o.prev = 8;
                    o.t0 = o.catch(0);
                    console.log('getAutoDeliveryCleanFluidStatus  error: ' + ('object' == typeof o.t0 ? JSON.stringify(o.t0) : o.t0));

                  case 11:
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
        key: 'setDryerSetting',
        value: function (t, n) {
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.prev = 0;
                    o.next = 3;
                    return regeneratorRuntime.default.awrap(module415.default.setDryerSetting(t, n));

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
            if ((module381.RSM.isO2Dock() || module381.RSM.isO3Dock()) && this.dryerGuideView) this.dryerGuideView.show();
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
          var t = this.state.backWashMode == module389.BackWashModeMap.BackWashModeSmart ? module505.back_wash_title1 : this.state.washValue + 'min',
            n =
              this.state.washTowelMode == module389.WashTowelModeMap.WashTowelModeQuick
                ? module505.wash_towel_mode_title_1
                : this.state.washTowelMode == module389.WashTowelModeMap.WashTowelModeDaily
                ? module505.wash_towel_mode_title_2
                : module505.wash_towel_mode_title_3;
          return [
            {
              title: module505.wash_towel_mode_title,
              funcId: 'wash_towel_mode_title',
              detail: n,
              isDetailCenter: false,
              rightCenter: true,
              bottomDetail: module505.dock_kit_setting15,
              onPress: this.openWashTowelPage.bind(this, false),
              visible: true,
              shouldShowBottomLine: true,
              detailWidth: 150,
              titleWidth: 150,
            },
            {
              title: module505.back_wash_time_setting,
              funcId: 'back_wash_time_setting',
              detail: t,
              isDetailCenter: false,
              rightCenter: true,
              bottomDetail: module505.dock_kit_setting16,
              onPress: this.openWashTowelPage.bind(this, true),
              visible: true,
              shouldShowBottomLine: false,
              detailWidth: 150,
              titleWidth: 150,
            },
            {
              title: module505.auto_delivery_cleaning_fluid_title,
              funcId: 'auto_delivery_cleaning_fluid',
              bottomDetail: module505.auto_delivery_cleaning_fluid_desc,
              shouldShowSwitch: true,
              switchOn: this.state.isAutoDeliveryCleanFluidOn,
              switchValueChanged: this.onAutoDeliveryCleanFluidChanged.bind(this),
              visible: module381.RSM.isO4Dock(),
              shouldShowBottomLine: false,
            },
          ];
        },
      },
      {
        key: 'getDustCollectionData',
        value: function () {
          return [
            {
              title: module505.dust_collection_title,
              funcId: 'setting_page_dust_collection',
              bottomDetail: this.state.dustCollectionSwitch ? module505.dust_collection_info : module505.dust_collection_info_close,
              shouldShowSwitch: true,
              switchOn: this.state.dustCollectionSwitch,
              switchValueChanged: this.onDustCollectionValueChanged.bind(this),
              visible: true,
              shouldShowBottomLine: false,
            },
            {
              title: module505.dust_collection_desc_title,
              funcId: 'dust_collection_desc_title',
              detail: P[this.state.dustCollectionMode],
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
            title: t ? module505.back_wash_time_setting : module505.wash_towel_mode_title,
          });
        },
      },
      {
        key: 'openDustCollectionPage',
        value: function (t) {
          this.props.navigation.navigate('DustCollectionModeSetting', {
            title: module505.dust_collection_desc_title,
            isSetMode: t,
          });
        },
      },
      {
        key: 'openDryerTimeSetPagePage',
        value: function () {
          this.props.navigation.navigate('DryTimeSettingPage', {
            dryTime: this.state.dryTime,
            title: module505.dock_kit_setting6,
          });
        },
      },
      {
        key: 'getDryerSettingData',
        value: function () {
          return [
            {
              title: module505.dock_kit_setting5,
              shouldShowSwitch: true,
              bottomDetail: module505.dock_kit_setting17,
              switchOn: this.state.isStartDryerSwitchOn,
              switchValueChanged: this.onStartDryerSwitchValueChanged.bind(this),
              shouldShowBottomLine: false,
              visible: module390.default.isSupportedDrying(),
              funcId: 'back_wash_title1',
            },
            {
              title: module505.dock_kit_setting6,
              funcId: 'dust_collection_desc_title',
              detail: W[this.state.dryTime],
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
                E.containterView,
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
          var u = this.getWashTowelData().map(function (t, n) {
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
            c = this.getDustCollectionData().map(function (t, n) {
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
                E.containter,
                {
                  backgroundColor: n.settingBackgroundColor,
                },
              ],
            },
            React.default.createElement(
              module12.ScrollView,
              {
                style: E.containterScroll,
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
                  style: E.section,
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
                  style: E.section,
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
                  style: E.section,
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
                style: E.section,
              })
            ),
            React.default.createElement(module1268.default, {
              ref: function (n) {
                t.dryerGuideView = n;
              },
              parent: this,
              isModal: true,
              bgImage: module381.RSM.isO3Dock() ? require('./2034') : require('./2035'),
              topTitle: module505.dock_kit_setting11,
              context: module505.dock_kit_setting12,
              buttonInfo: [module505.localization_strings_Main_MainPage_11, module505.dock_kit_setting14],
              buttonFuncId: ['dryer_setting_guide_left', 'dryer_setting_guide_right'],
              onPressGoSetting: function () {
                return t.setStartDryerSwitch(true);
              },
            })
          );
        },
      },
    ]);
    return L;
  })(React.Component);

exports.default = module2035;
module2035.contextType = module1121.AppConfigContext;
var E = module12.StyleSheet.create({
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
