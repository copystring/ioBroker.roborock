var regeneratorRuntime = require('regenerator-runtime'),
  o = require('./21'),
  module30 = require('./30'),
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
    var o = O(n);
    if (o && o.has(t)) return o.get(t);
    var s = {},
      u = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var l in t)
      if ('default' !== l && Object.prototype.hasOwnProperty.call(t, l)) {
        var c = u ? Object.getOwnPropertyDescriptor(t, l) : null;
        if (c && (c.get || c.set)) Object.defineProperty(s, l, c);
        else s[l] = t[l];
      }

    s.default = t;
    if (o) o.set(t, s);
    return s;
  })(require('react')),
  module12 = require('./12'),
  module381 = require('./381'),
  module1115 = require('./1115'),
  module387 = require('./387'),
  module407 = require('./407'),
  module1344 = require('./1344'),
  module377 = require('./377'),
  module411 = require('./411'),
  module390 = require('./390'),
  module386 = require('./386'),
  module1231 = require('./1231'),
  module1229 = require('./1229'),
  module1916 = require('./1916'),
  module506 = require('./506'),
  module415 = require('./415'),
  module1112 = require('./1112'),
  module935 = require('./935'),
  module383 = require('./383'),
  module1259 = require('./1259');

function O(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (O = function (t) {
    return t ? o : n;
  })(t);
}

function z() {
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

require('./1851');

require('./1914');

require('./1856').Supplies;

require('./1885');

require('./503');

require('./1865');

var module491 = require('./491').strings,
  module934 = require('./934'),
  module389 = require('./389'),
  module1366 = require('./1366'),
  module385 = require('./385'),
  J = 0,
  U = (function (t) {
    module7.default(U, t);

    var module506 = U,
      O = z(),
      A = function () {
        var t,
          n = module11.default(module506);

        if (O) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function U(t) {
      var n;
      module4.default(this, U);
      (n = A.call(this, t)).state = {
        mapSaveModeEnabled: true,
        carpetPressurizeSwitch: false,
        mopModeSwitch: false,
        notificationSwitch: false,
        robotZone: module390.default.sharedCache().robotTimeZone,
        shouldShowTimePicker: false,
        ledStatusSwitch: true,
        dustCollectionSwitch: false,
        isDoNotDisturbSwitchOn: true,
        deviceName: module389.deviceName,
        timeZoneShouldShowRedDot: module377.RobotStatusManager.sharedManager().timeZoneShouldShowRedDot,
        cameraEnabled: false,
        petModeEnabled: false,
        realTimeMonitorEnabled: false,
        explorationEnabled: false,
        ledSetting: 0,
        loading: true,
        requestFailed: false,
        refreshing: false,
        areaUnitIndex: module390.default.sharedCache().areaUnitIndex,
        shouldShowAreaUnitView: false,
        childLockSwitch: false,
        flowLedStatusSwitch: true,
      };
      n.doNotDisturbBeginMinute = -1;
      n.doNotDisturbBeginHour = -1;
      n.doNotDisturbEndHour = -1;
      n.doNotDisturbEndMinute = -1;
      n.animatedWrapMarginBottom = new module12.Animated.Value(-500);
      return n;
    }

    module5.default(U, [
      {
        key: 'getMenuDatas',
        value: function () {
          return [
            {
              visible: true,
            },
            {
              title: module491.localization_strings_Setting_General_index_1,
              funcId: 'robot_setting_page_device_name',
              detail: this.state.deviceName,
              detailWidth: 150,
              onPress: function () {
                return module389.openChangeDeviceName();
              },
              visible: !module387.default.isShareUser() && !module389.isMiApp,
              shouldShowTopLongLine: true,
              shouldShowBottomLongLine: true,
            },
            {
              visible: !module387.default.isShareUser() && !module389.isMiApp,
            },
            {
              title: module491.led_status_title,
              funcId: 'robot_setting_page_led',
              bottomDetail: module491.led_status_detail,
              shouldShowSwitch: true,
              switchOn: this.state.ledStatusSwitch,
              switchValueChanged: this._onLedStatusSwitchValueChanged.bind(this),
              visible: module386.default.isLedSwitchVisible(),
              shouldShowBottomLongLine:
                !module386.default.isFlowLedSettingSupported() &&
                (module386.default.shouldHideCarpetPressurize() || module386.default.isCarpetSupported()) &&
                !module415.DMM.isGarnet,
              shouldShowTopLongLine: true,
            },
            {
              title: module491.flow_led_status_title,
              funcId: 'robot_setting_page_flow_led',
              shouldShowSwitch: true,
              switchOn: this.state.flowLedStatusSwitch,
              switchValueChanged: this._onFlowLedStatusSwitchValueChanged.bind(this),
              visible: module386.default.isFlowLedSettingSupported(),
              shouldShowBottomLongLine: (module386.default.shouldHideCarpetPressurize() || module386.default.isCarpetSupported()) && !module415.DMM.isGarnet,
              shouldShowTopLongLine: !module386.default.isLedSwitchVisible(),
            },
            {
              title: module491.setting_carpet_mode_title,
              funcId: 'robot_setting_page_carpet_mode',
              bottomDetail: module491.setting_carpet_mode_text,
              shouldShowSwitch: true,
              switchOn: this.state.carpetPressurizeSwitch,
              switchValueChanged: this._onCarpetPressurizeSwitchValueChanged.bind(this),
              shouldShowBottomLine: true,
              visible: (!module386.default.shouldHideCarpetPressurize() && !module386.default.isCarpetSupported()) || module415.DMM.isGarnet,
              shouldShowBottomLongLine: true,
              shouldShowTopLongLine: !module386.default.isLedSwitchVisible() && !module386.default.isFlowLedSettingSupported(),
            },
            {
              visible: module386.default.isSetChildSupported(),
            },
            {
              title: module491.child_lock_title,
              funcId: 'robot_setting_page_child_lock',
              bottomDetail: module491.child_lock_detial,
              shouldShowSwitch: true,
              switchOn: this.state.childLockSwitch,
              switchValueChanged: this._onSetChildLockValueChanged.bind(this),
              visible: module386.default.isSetChildSupported(),
              shouldShowBottomLongLine: true,
              shouldShowTopLine: true,
              shouldShowTopLongLine: true,
            },
            {
              visible: true,
            },
            {
              title: module491.setting_timezone_title,
              funcId: 'robot_setting_page_timezone',
              detail: this.state.robotZone,
              onPress: this.openSyncTimezonePage.bind(this),
              shouldShowBottomLine: false,
              visible: true,
              shouldShowRedPoint: this.state.timeZoneShouldShowRedDot,
              shouldShowTopLine: true,
              shouldShowTopLongLine: true,
              shouldShowBottomLine: true,
              shouldShowBottomLongLine: true,
              detailWidth: 150,
              titleWidth: 150,
            },
            {
              visible: true,
            },
            {
              title: module491.localization_strings_Setting_DoNotDisturbPage_12,
              funcId: 'robot_setting_page_donot_disturb',
              bottomDetail: module377.RSM.isCollectDustDock ? module491.no_disturb_with_dust_collection : module491.localization_strings_Setting_DoNotDisturbPage_13,
              shouldShowSwitch: true,
              switchOn: this.state.isDoNotDisturbSwitchOn,
              switchValueChanged: this.onDonotDisturbSwitchValueChanged.bind(this),
              visible: true,
              shouldShowTopLine: true,
              shouldShowTopLongLine: true,
            },
          ].concat(module30.default(this.getDoNotDisturbMenus()), [
            {
              visible: true,
            },
            {
              title: module491.area_of_unit,
              funcId: 'robot_setting_page_area_unit',
              detail: module385.AreaUnitNames()[this.state.areaUnitIndex],
              onPress: this.setAreaUnit.bind(this),
              shouldShowBottomLine: false,
              visible: true,
              shouldShowTopLine: false,
              shouldShowTopLongLine: true,
              shouldShowBottomLine: false,
              shouldShowBottomLongLine: true,
              detailWidth: 350,
            },
          ]);
        },
      },
      {
        key: 'getDoNotDisturbMenus',
        value: function () {
          var t = [
            {
              title: module491.localization_strings_Setting_DoNotDisturbPage_0,
              funcId: 'robot_setting_page_donot_disturb_begin',
              detail: (module1366.addZeroPrefix(this.doNotDisturbBeginHour) + ':' + module1366.addZeroPrefix(this.doNotDisturbBeginMinute)).replace('0-1:0-1', '--:--'),
              onPress: this.setDotNotDisturbBeginTime.bind(this),
              visible: true,
            },
            {
              title: module491.localization_strings_Setting_DoNotDisturbPage_1,
              funcId: 'robot_setting_page_donot_disturb_end',
              detail: (module1366.addZeroPrefix(this.doNotDisturbEndHour) + ':' + module1366.addZeroPrefix(this.doNotDisturbEndMinute)).replace('0-1:0-1', '--:--'),
              shouldShowBottomLine: false,
              onPress: this.setDotNotDisturbEndTime.bind(this),
              visible: true,
              shouldShowBottomLine: true,
              shouldShowBottomLongLine: true,
            },
          ];
          return this.state.isDoNotDisturbSwitchOn ? t : [];
        },
      },
      {
        key: 'getMultiFloorMenus',
        value: function () {
          if (module386.default.isMultiFloorSupported()) this.state.mapSaveModeEnabled;
          return [];
        },
      },
      {
        key: 'componentDidMount',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    this.props.navigation.setParams({
                      title: module491.setting_robot_setting,
                    });
                    this.getSwitchData(false);
                    this.updateMopModeSwitchState();
                    this.getLocalRobotTimezone();
                    this.getLocalDndTimer();

                  case 5:
                  case 'end':
                    return t.stop();
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
          this.setState({
            mapSaveModeEnabled: module377.RobotStatusManager.sharedManager().mapSaveEnabled,
            multiFloorEnabled: module377.RobotStatusManager.sharedManager().multiFloorEnabled,
          });
          this.registerDeviceNameChangeListener();
          this.registerRobotTimeZoneRedDotListener();
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          this.unreigsterListeners();
        },
      },
      {
        key: 'getSwitchData',
        value: function (t) {
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    if (
                      (this.setState({
                        loading: !t,
                        requestFailed: false,
                        refreshing: t,
                      }),
                      (o.prev = 1),
                      !((!module386.default.shouldHideCarpetPressurize() && !module386.default.isCarpetSupported()) || module415.DMM.isGarnet))
                    ) {
                      o.next = 6;
                      break;
                    }

                    o.next = 6;
                    return regeneratorRuntime.default.awrap(this.getCarpetPressurizeStatus());

                  case 6:
                    if (!module386.default.isLedSwitchVisible()) {
                      o.next = 10;
                      break;
                    }

                    o.next = 10;
                    return regeneratorRuntime.default.awrap(this.getLedStatus());

                  case 10:
                    if (!module386.default.isFlowLedSettingSupported()) {
                      o.next = 13;
                      break;
                    }

                    o.next = 13;
                    return regeneratorRuntime.default.awrap(this.getFlowLedStatus());

                  case 13:
                    if (!module386.default.isSetChildSupported()) {
                      o.next = 16;
                      break;
                    }

                    o.next = 16;
                    return regeneratorRuntime.default.awrap(this.getChildLockStatus());

                  case 16:
                    o.next = 18;
                    return regeneratorRuntime.default.awrap(this.getRobotTimezone());

                  case 18:
                    o.next = 20;
                    return regeneratorRuntime.default.awrap(this.getDndTimer());

                  case 20:
                    this.setState({
                      refreshing: false,
                    });
                    this.finishLoading(false);
                    J = 0;
                    o.next = 29;
                    break;

                  case 25:
                    o.prev = 25;
                    o.t0 = o.catch(1);
                    console.log('getSwitchData - ' + JSON.stringify(o.t0));
                    this.retry();

                  case 29:
                  case 'end':
                    return o.stop();
                }
            },
            null,
            this,
            [[1, 25]],
            Promise
          );
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            s = this.context.theme,
            u = React.default.createElement(module381.RequestRetryView, {
              onPressButton: function () {
                J = 0;
                t.getSwitchData(false);
              },
            });
          if (this.state.requestFailed) return u;
          var l = React.default.createElement(
            module12.View,
            {
              style: [
                Z.containterView,
                {
                  backgroundColor: globals.app.state.theme.settingBackgroundColor,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ],
            },
            React.default.createElement(module1112.default, null)
          );
          if (this.state.loading) return l;
          var c = this.getMenuDatas().map(function (t, n) {
              return t.visible
                ? t.title
                  ? React.default.createElement(
                      module381.SettingListItemView,
                      o.default({}, t, {
                        key: n,
                        titleColor: 'rgba(0,0,0,0.8)',
                        style: {
                          width: module12.Dimensions.get('window').width,
                        },
                      })
                    )
                  : React.default.createElement(module12.View, {
                      style: Z.section,
                      key: n,
                    })
                : React.default.createElement(module12.View, {
                    key: n,
                  });
            }),
            h =
              this.state.shouldShowTimePicker &&
              React.default.createElement(
                module935.default,
                {
                  transparent: true,
                  onRequestClose: function () {
                    t.hideTimerPicker();
                  },
                },
                React.default.createElement(
                  module12.Animated.View,
                  {
                    style: [
                      Z.modal,
                      {
                        opacity: this.animatedWrapMarginBottom.interpolate({
                          inputRange: [-500, 0],
                          outputRange: [0, 1],
                        }),
                        height: module390.default.sharedCache().ScreenHeight - module387.default.statusbarHeight(),
                      },
                    ],
                  },
                  React.default.createElement(
                    module12.TouchableWithoutFeedback,
                    {
                      onPress: function () {
                        t.hideTimerPicker();
                      },
                    },
                    React.default.createElement(module12.View, {
                      style: Z.timerOutView,
                    })
                  ),
                  React.default.createElement(
                    module12.Animated.View,
                    {
                      style: {
                        position: 'absolute',
                        zIndex: 99999,
                        bottom: this.animatedWrapMarginBottom,
                        justifyContent: 'flex-end',
                        paddingBottom: 20,
                        overflow: 'hidden',
                      },
                    },
                    React.default.createElement(module381.CustomDatePicker, {
                      ref: function (n) {
                        t.timePicker = n;
                      },
                      showDate: this.state.showDate,
                      title: this.isDoNotDisturbBeginTime ? module491.localization_strings_Setting_DoNotDisturbPage_0 : module491.localization_strings_Setting_DoNotDisturbPage_1,
                      onPressCancelButton: this.hideTimerPicker.bind(this),
                      onPressConfirmButton: this.didSelectTime.bind(this),
                    })
                  )
                )
              ),
            f =
              this.state.shouldShowAreaUnitView &&
              React.default.createElement(
                module935.default,
                {
                  transparent: true,
                  onRequestClose: function () {
                    t.hideAreaUnitView();
                  },
                },
                React.default.createElement(
                  module12.TouchableWithoutFeedback,
                  {
                    accessible: false,
                    onPress: function () {
                      t.hideAreaUnitView();
                    },
                  },
                  React.default.createElement(
                    module12.Animated.View,
                    {
                      style: [
                        Z.modal,
                        {
                          opacity: this.animatedWrapMarginBottom.interpolate({
                            inputRange: [-500, 0],
                            outputRange: [0, 1],
                          }),
                          height: module390.default.sharedCache().ScreenHeight - module387.default.statusbarHeight(),
                        },
                      ],
                    },
                    React.default.createElement(
                      module12.Animated.View,
                      {
                        style: {
                          height: 500,
                          marginBottom: this.animatedWrapMarginBottom,
                          justifyContent: 'flex-end',
                          paddingBottom: 25,
                          overflow: 'hidden',
                        },
                      },
                      React.default.createElement(module1115.ActionSheetView, {
                        title: module491.area_of_unit,
                        actions: module385.AreaUnitNames(),
                        didSelectRow: function (n) {
                          return t._onSelectAreaViewMode(n);
                        },
                        onPressCancel: function () {
                          t.hideAreaUnitView();
                        },
                      })
                    )
                  )
                )
              );
          return React.default.createElement(
            module12.View,
            {
              style: [
                Z.containterView,
                {
                  backgroundColor: s.settingBackgroundColor,
                },
              ],
            },
            React.default.createElement(
              module12.ScrollView,
              {
                style: Z.containter,
                showsVerticalScrollIndicator: false,
                refreshControl: React.default.createElement(module12.RefreshControl, {
                  refreshing: this.state.refreshing,
                  onRefresh: function () {
                    return t.getSwitchData(true);
                  },
                }),
              },
              c,
              React.default.createElement(module1344.default, {
                ref: function (n) {
                  t.tipsView = n;
                },
                parent: this,
                status: this.state.status,
                modalVisible: false,
              }),
              h,
              f,
              React.default.createElement(module1231.MapSavePopBox, {
                ref: function (n) {
                  t.mapSaveView = n;
                },
                didCancel: function () {
                  t.setState({
                    multiFloorEnabled: true,
                  });
                },
                isOverwriteMode: false,
                saveMap: this.handleSaveMap.bind(this),
              }),
              React.default.createElement(module1916.LedSettingModalView, {
                ref: function (n) {
                  t.ledSettingView = n;
                },
                didSet: function (o) {
                  return regeneratorRuntime.default.async(
                    function (s) {
                      for (;;)
                        switch ((s.prev = s.next)) {
                          case 0:
                            s.next = 2;
                            return regeneratorRuntime.default.awrap(t.updateCameraStatus(o));

                          case 2:
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
              }),
              React.default.createElement(module381.AlertView, {
                ref: function (n) {
                  return (t.alert = n);
                },
              })
            )
          );
        },
      },
      {
        key: 'handleSaveMap',
        value: function (t) {
          var o;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    s.prev = 0;
                    s.next = 3;
                    return regeneratorRuntime.default.awrap(
                      module407.default.setLabStatus({
                        lab_status: 1,
                        reserve_map: t,
                      })
                    );

                  case 3:
                    o = s.sent;
                    console.log('handleSaveMap - ' + JSON.stringify(o));
                    module1229.MM.getMultiMaps();
                    s.next = 12;
                    break;

                  case 8:
                    s.prev = 8;
                    s.t0 = s.catch(0);
                    this.setState({
                      multiFloorEnabled: true,
                    });
                    globals.showToast(module491.robot_communication_exception);

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
        key: 'didSelectTime',
        value: function (t) {
          if (this.isDoNotDisturbBeginTime) {
            this.doNotDisturbBeginHour = t.getHours();
            this.doNotDisturbBeginMinute = t.getMinutes();
          } else {
            this.doNotDisturbEndHour = t.getHours();
            this.doNotDisturbEndMinute = t.getMinutes();
          }

          this.hideTimerPicker();
          this.saveDoNotDisturbData();
        },
      },
      {
        key: 'showTimerPicker',
        value: function (t, n) {
          var o = this,
            s = new Date();
          s.setHours(t);
          s.setMinutes(n);
          this.setState(
            {
              shouldShowTimePicker: true,
              showDate: s,
            },
            function () {
              module12.Animated.spring(o.animatedWrapMarginBottom, {
                toValue: 0,
                duration: 200,
              }).start();
            }
          );
        },
      },
      {
        key: 'hideTimerPicker',
        value: function () {
          var t = this;
          module12.Animated.timing(this.animatedWrapMarginBottom, {
            toValue: -500,
            duration: 200,
          }).start(function () {
            t.setState({
              shouldShowTimePicker: false,
            });
          });
        },
      },
      {
        key: 'getLocalDndTimer',
        value: function () {
          var t, o, module30, module4, l;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    c.prev = 0;
                    c.next = 3;
                    return regeneratorRuntime.default.awrap(module411.GetStorageKey(module411.StorageKeys.DoNotDisturbBeginHour));

                  case 3:
                    t = c.sent;
                    c.next = 6;
                    return regeneratorRuntime.default.awrap(module411.GetStorageKey(module411.StorageKeys.DoNotDisturbBeginMinute));

                  case 6:
                    o = c.sent;
                    c.next = 9;
                    return regeneratorRuntime.default.awrap(module411.GetStorageKey(module411.StorageKeys.DoNotDisturbEndHour));

                  case 9:
                    module30 = c.sent;
                    c.next = 12;
                    return regeneratorRuntime.default.awrap(module411.GetStorageKey(module411.StorageKeys.DoNotDisturbEndMinute));

                  case 12:
                    module4 = c.sent;
                    c.next = 15;
                    return regeneratorRuntime.default.awrap(module411.GetStorageKey(module411.StorageKeys.DoNotDisturbEnable));

                  case 15:
                    l = c.sent;

                    if (t && o && module30 && module4 && l) {
                      this.doNotDisturbBeginHour = parseInt(t);
                      this.doNotDisturbBeginMinute = parseInt(o);
                      this.doNotDisturbEndHour = parseInt(module30);
                      this.doNotDisturbEndMinute = parseInt(module4);
                      this.setState({
                        isDoNotDisturbSwitchOn: '1' == l,
                      });
                    }

                    console.log('getLocalDndTimer  startHour: ' + t + '  startMinute:  ' + o + ' endHour:  ' + module30 + ' endMinute:  ' + module4 + ' enable: ' + l);
                    c.next = 23;
                    break;

                  case 20:
                    c.prev = 20;
                    c.t0 = c.catch(0);
                    console.log('getLocalDndTimer  error: ' + ('object' == typeof c.t0 ? JSON.stringify(c.t0) : c.t0));

                  case 23:
                  case 'end':
                    return c.stop();
                }
            },
            null,
            this,
            [[0, 20]],
            Promise
          );
        },
      },
      {
        key: 'getDndTimer',
        value: function () {
          var t, o;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    s.next = 2;
                    return regeneratorRuntime.default.awrap(module407.default.getDndTimer());

                  case 2:
                    t = s.sent;
                    o = t.result[0];
                    this.doNotDisturbBeginHour = o.start_hour;
                    this.doNotDisturbBeginMinute = o.start_minute;
                    this.doNotDisturbEndHour = o.end_hour;
                    this.doNotDisturbEndMinute = o.end_minute;
                    this.setState({
                      isDoNotDisturbSwitchOn: 1 == o.enabled,
                    });
                    this.saveLocalDoNotDisturbData();
                    console.log('getDndTimer - ' + JSON.stringify(t));

                  case 11:
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
        key: 'saveDoNotDisturbData',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    if (-1 != this.doNotDisturbBeginHour && -1 != this.doNotDisturbBeginMinute && -1 != this.doNotDisturbEndHour && -1 != this.doNotDisturbEndMinute) {
                      o.next = 2;
                      break;
                    }

                    return o.abrupt('return');

                  case 2:
                    o.prev = 2;
                    o.next = 5;
                    return regeneratorRuntime.default.awrap(
                      module407.default.setDndTimer(this.doNotDisturbBeginHour, this.doNotDisturbBeginMinute, this.doNotDisturbEndHour, this.doNotDisturbEndMinute)
                    );

                  case 5:
                    t = o.sent;
                    this.saveLocalDoNotDisturbData();
                    module383.LogEventStatus('carpet_pressurize_status_switch', {
                      on: true,
                      beginHour: this.doNotDisturbBeginHour,
                      beginMinite: this.doNotDisturbBeginMinute,
                      endHour: this.doNotDisturbEndHour,
                      endMinite: this.doNotDisturbEndMinute,
                    });
                    console.log('saveDoNotDisturbData -' + JSON.stringify(t));
                    o.next = 14;
                    break;

                  case 11:
                    o.prev = 11;
                    o.t0 = o.catch(2);
                    console.log('saveDoNotDisturbData  error: ' + ('object' == typeof o.t0 ? JSON.stringify(o.t0) : o.t0));

                  case 14:
                  case 'end':
                    return o.stop();
                }
            },
            null,
            this,
            [[2, 11]],
            Promise
          );
        },
      },
      {
        key: 'saveLocalDoNotDisturbData',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    t.next = 2;
                    return regeneratorRuntime.default.awrap(module411.SetStorageKey(module411.StorageKeys.DoNotDisturbBeginHour, this.doNotDisturbBeginHour.toString()));

                  case 2:
                    t.next = 4;
                    return regeneratorRuntime.default.awrap(module411.SetStorageKey(module411.StorageKeys.DoNotDisturbBeginMinute, this.doNotDisturbBeginMinute.toString()));

                  case 4:
                    t.next = 6;
                    return regeneratorRuntime.default.awrap(module411.SetStorageKey(module411.StorageKeys.DoNotDisturbEndHour, this.doNotDisturbEndHour.toString()));

                  case 6:
                    t.next = 8;
                    return regeneratorRuntime.default.awrap(module411.SetStorageKey(module411.StorageKeys.DoNotDisturbEndMinute, this.doNotDisturbEndMinute.toString()));

                  case 8:
                    t.next = 10;
                    return regeneratorRuntime.default.awrap(module411.SetStorageKey(module411.StorageKeys.DoNotDisturbEnable, this.state.isDoNotDisturbSwitchOn ? '1' : '0'));

                  case 10:
                    console.log(
                      'saveLocalDoNotDisturbData  startHour: ' +
                        this.doNotDisturbBeginHour.toString() +
                        '  startMinute:  ' +
                        this.doNotDisturbBeginMinute +
                        ' endHour:  ' +
                        this.doNotDisturbEndHour +
                        ' endMinute:  ' +
                        this.doNotDisturbEndMinute +
                        '  enable: ' +
                        this.state.isDoNotDisturbSwitchOn
                    );

                  case 11:
                  case 'end':
                    return t.stop();
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
        key: 'getLedStatus',
        value: function () {
          var t, o;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    s.next = 2;
                    return regeneratorRuntime.default.awrap(module407.default.getLedStatus());

                  case 2:
                    t = s.sent;
                    o = t.result[0];
                    this.setState({
                      ledStatusSwitch: 1 == o,
                    });
                    console.log('getLedStatus - ' + JSON.stringify(t));

                  case 6:
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
        key: '_onLedStatusSwitchValueChanged',
        value: function (t) {
          var o, s;
          return regeneratorRuntime.default.async(
            function (u) {
              for (;;)
                switch ((u.prev = u.next)) {
                  case 0:
                    if (((u.prev = 0), module386.default.isSupportLedStatusSwitch())) {
                      u.next = 4;
                      break;
                    }

                    globals.showToast(module491.localization_strings_Setting_RemoteControlPage_54);
                    return u.abrupt('return');

                  case 4:
                    this.setState({
                      ledStatusSwitch: t,
                    });
                    o = t ? 1 : 0;
                    u.next = 8;
                    return regeneratorRuntime.default.awrap(module407.default.setLedStatus(o));

                  case 8:
                    s = u.sent;
                    module383.LogEventStatus('led_status_switch', {
                      on: t,
                    });
                    console.log('_onLedStatusSwitchValueChanged:' + JSON.stringify(s));
                    u.next = 18;
                    break;

                  case 13:
                    u.prev = 13;
                    u.t0 = u.catch(0);
                    this.setState({
                      ledStatusSwitch: !t,
                    });
                    globals.showToast(module491.robot_communication_exception);
                    console.log(u.t0);

                  case 18:
                  case 'end':
                    return u.stop();
                }
            },
            null,
            this,
            [[0, 13]],
            Promise
          );
        },
      },
      {
        key: '_onCarpetPressurizeSwitchValueChanged',
        value: function (t) {
          var o, module30, u;
          return regeneratorRuntime.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    l.prev = 0;
                    o = module386.default.isNewCarpetPressurize();
                    module30 = {
                      enable: t ? 1 : 0,
                      current_integral: o ? 550 : 450,
                      current_high: o ? 625 : 500,
                      current_low: o ? 500 : 400,
                      stall_time: 10,
                    };
                    this.setState({
                      carpetPressurizeSwitch: t,
                    });
                    module383.LogEventStatus('carpet_pressurize_status_switch', {
                      on: t,
                    });
                    l.next = 7;
                    return regeneratorRuntime.default.awrap(module407.default.setCarpetMode(module30));

                  case 7:
                    u = l.sent;
                    console.log('_onCarpetPressurizeSwitchValueChanged:' + JSON.stringify(u));
                    l.next = 16;
                    break;

                  case 11:
                    l.prev = 11;
                    l.t0 = l.catch(0);
                    this.setState({
                      carpetPressurizeSwitch: !t,
                    });
                    globals.showToast(module491.robot_communication_exception);
                    console.log(l.t0);

                  case 16:
                  case 'end':
                    return l.stop();
                }
            },
            null,
            this,
            [[0, 11]],
            Promise
          );
        },
      },
      {
        key: '_onMopModeSwitchValueChanged',
        value: function (t) {
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    if (
                      (console.log('MopMode Switch - ' + t),
                      this.setState({
                        mopModeSwitch: t,
                      }),
                      (o.prev = 2),
                      105 != module377.RobotStatusManager.sharedManager().fanPower || t)
                    ) {
                      o.next = 6;
                      break;
                    }

                    o.next = 6;
                    return regeneratorRuntime.default.awrap(module407.default.setCustomMode(101));

                  case 6:
                    o.next = 8;
                    return regeneratorRuntime.default.awrap(module411.SetStorageKey(module411.StorageKeys.RobotMopModeState, t ? '1' : '0'));

                  case 8:
                    o.next = 15;
                    break;

                  case 10:
                    o.prev = 10;
                    o.t0 = o.catch(2);
                    this.setState({
                      mopModeSwitch: !t,
                    });
                    globals.showToast(module491.robot_communication_exception);
                    console.log(o.t0);

                  case 15:
                  case 'end':
                    return o.stop();
                }
            },
            null,
            this,
            [[2, 10]],
            Promise
          );
        },
      },
      {
        key: '_onMultifloorSwitchValueChanged',
        value: function (t) {
          var o;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    if ((console.log('_onMultifloorSwitchValueChanged - ' + t), !module377.RSM.isRunning)) {
                      s.next = 4;
                      break;
                    }

                    module1259.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
                      globals.showToast(module491.robot_communication_exception);
                    });
                    return s.abrupt('return');

                  case 4:
                    if (
                      (this.setState({
                        multiFloorEnabled: t,
                      }),
                      (s.prev = 5),
                      t)
                    ) {
                      s.next = 10;
                      break;
                    }

                    if (module1229.MM.maps.length > 0) {
                      if (this.mapSaveView) this.mapSaveView.show();
                    } else this.handleSaveMap(-1);
                    s.next = 14;
                    break;

                  case 10:
                    s.next = 12;
                    return regeneratorRuntime.default.awrap(
                      module407.default.setLabStatus({
                        lab_status: 3,
                      })
                    );

                  case 12:
                    o = s.sent;
                    console.log('setLabStatus - ' + JSON.stringify(o));

                  case 14:
                    s.next = 21;
                    break;

                  case 16:
                    s.prev = 16;
                    s.t0 = s.catch(5);
                    this.setState({
                      multiFloorEnabled: !t,
                    });
                    globals.showToast(module491.robot_communication_exception);
                    console.log(s.t0);

                  case 21:
                  case 'end':
                    return s.stop();
                }
            },
            null,
            this,
            [[5, 16]],
            Promise
          );
        },
      },
      {
        key: '_onCameraSwitichValueChanged',
        value: function (t) {
          var o = this;
          this.setState(
            {
              cameraEnabled: t,
            },
            function () {
              return regeneratorRuntime.default.async(
                function (s) {
                  for (;;)
                    switch ((s.prev = s.next)) {
                      case 0:
                        s.next = 2;
                        return regeneratorRuntime.default.awrap(o.updateCameraStatus());

                      case 2:
                        if (s.sent) {
                          s.next = 4;
                          break;
                        }

                        o.setState({
                          cameraEnabled: !t,
                        });

                      case 4:
                      case 'end':
                        return s.stop();
                    }
                },
                null,
                null,
                null,
                Promise
              );
            }
          );
        },
      },
      {
        key: '_onPetModeSwitchValueChanged',
        value: function (t) {
          var o = this;
          this.setState(
            {
              petModeEnabled: t,
            },
            function () {
              return regeneratorRuntime.default.async(
                function (s) {
                  for (;;)
                    switch ((s.prev = s.next)) {
                      case 0:
                        s.next = 2;
                        return regeneratorRuntime.default.awrap(o.updateCameraStatus());

                      case 2:
                        if (s.sent) {
                          s.next = 4;
                          break;
                        }

                        o.setState({
                          petModeEnabled: !t,
                        });

                      case 4:
                      case 'end':
                        return s.stop();
                    }
                },
                null,
                null,
                null,
                Promise
              );
            }
          );
        },
      },
      {
        key: '_onRealTimeMonitorSwitchValueChanged',
        value: function (t) {
          var o = this;
          this.setState(
            {
              realTimeMonitorEnabled: t,
            },
            function () {
              return regeneratorRuntime.default.async(
                function (s) {
                  for (;;)
                    switch ((s.prev = s.next)) {
                      case 0:
                        s.next = 2;
                        return regeneratorRuntime.default.awrap(o.updateCameraStatus());

                      case 2:
                        if (s.sent) {
                          s.next = 4;
                          break;
                        }

                        o.setState({
                          realTimeMonitorEnabled: !t,
                        });

                      case 4:
                      case 'end':
                        return s.stop();
                    }
                },
                null,
                null,
                null,
                Promise
              );
            }
          );
        },
      },
      {
        key: '_onExplorationSwitchValueChanged',
        value: function (t) {
          var o = this;
          this.setState(
            {
              explorationEnabled: t,
            },
            function () {
              return regeneratorRuntime.default.async(
                function (s) {
                  for (;;)
                    switch ((s.prev = s.next)) {
                      case 0:
                        s.next = 2;
                        return regeneratorRuntime.default.awrap(o.updateCameraStatus());

                      case 2:
                        if (s.sent) {
                          s.next = 4;
                          break;
                        }

                        o.setState({
                          explorationEnabled: !t,
                        });

                      case 4:
                      case 'end':
                        return s.stop();
                    }
                },
                null,
                null,
                null,
                Promise
              );
            }
          );
        },
      },
      {
        key: 'updateCameraStatus',
        value: function (t) {
          var o, module30, module4, module5, module7, module9, f, React, module12, module381, module1115, module387, module1344;
          return regeneratorRuntime.default.async(
            function (y) {
              for (;;)
                switch ((y.prev = y.next)) {
                  case 0:
                    o = 0;
                    module30 = this.state;
                    module4 = module30.cameraEnabled;
                    module5 = module30.petModeEnabled;
                    module7 = module30.realTimeMonitorEnabled;
                    module9 = module30.explorationEnabled;
                    React = f = module4 ? 1 : 0;
                    module12 = module5 ? 1 : 0;
                    module381 = module7 ? 1 : 0;
                    module1115 = module9 ? 1 : 0;
                    module387 = undefined == t ? this.state.ledSetting : t;
                    o = f | (module12 << 1) | (module381 << 2) | (module387 << 3) | (React << 5) | (module1115 << 6);
                    y.prev = 9;
                    y.next = 12;
                    return regeneratorRuntime.default.awrap(module407.default.setCameraStatus(o));

                  case 12:
                    module1344 = y.sent;
                    console.log('updateCameraStatus - ' + JSON.stringify(module1344) + ' - ' + module4 + ' - ' + module5 + ' - ' + module7 + ' - ' + o);
                    this.setState({
                      ledSetting: t,
                    });
                    return y.abrupt('return', true);

                  case 18:
                    y.prev = 18;
                    y.t0 = y.catch(9);
                    globals.showToast(module491.robot_communication_exception);
                    console.log('updateCameraStatus  error: ' + ('object' == typeof y.t0 ? JSON.stringify(y.t0) : y.t0));
                    return y.abrupt('return', false);

                  case 23:
                  case 'end':
                    return y.stop();
                }
            },
            null,
            this,
            [[9, 18]],
            Promise
          );
        },
      },
      {
        key: '_onCustomModeSwitchValueChanged',
        value: function (t) {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                  case 'end':
                    return t.stop();
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
        key: 'updateMopModeSwitchState',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.next = 2;
                    return regeneratorRuntime.default.awrap(module411.GetStorageKey(module411.StorageKeys.RobotMopModeState));

                  case 2:
                    t = o.sent;
                    this.setState({
                      mopModeSwitch: '1' == t,
                    });

                  case 4:
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
        key: '_onMapSaveSwitchValueChanged',
        value: function (t) {
          var n = this;
          if ((console.log('Toggle Switch - ' + t), t)) this.changeMapSaveSwitchStatus(t);
          else {
            var o = this;
            this.setState(
              {
                mapSaveModeEnabled: false,
              },
              function () {
                n.alert.alert(module491.map_edit_map_lab_close_warn, '', [
                  {
                    text: module491.localization_strings_Main_MainPage_11,
                    onPress: function () {
                      n.setState({
                        mapSaveModeEnabled: true,
                      });
                    },
                  },
                  {
                    text: module491.localization_strings_Main_Error_ErrorDetailPage_3,
                    onPress: function () {
                      o.changeMapSaveSwitchStatus(t);
                    },
                  },
                ]);
              }
            );
          }
        },
      },
      {
        key: 'getNotificationSwitchStatus',
        value: function () {
          var t, o, s;
          return regeneratorRuntime.default.async(
            function (u) {
              for (;;)
                switch ((u.prev = u.next)) {
                  case 0:
                    u.prev = 0;
                    u.next = 3;
                    return regeneratorRuntime.default.awrap(
                      module387.default.asyncSmartHomeAPI('/scene/list', {
                        did: module389.deviceId,
                      })
                    );

                  case 3:
                    t = u.sent;
                    console.log('getNotificationSwitchStatus : ' + JSON.stringify(t));
                    o = Object.keys(t.result).find(function (n) {
                      return 24 == t.result[n].st_id || 26 == t.result[n].st_id;
                    });
                    s = o ? t.result[o] : t.result[0];
                    this.setState({
                      notificationSwitch: '1' == s.setting.enable_exception_alert,
                    });
                    this.setting = s;
                    u.next = 14;
                    break;

                  case 11:
                    u.prev = 11;
                    u.t0 = u.catch(0);
                    console.log('getNotificationSwitchStatus error : ' + u.t0);

                  case 14:
                  case 'end':
                    return u.stop();
                }
            },
            null,
            this,
            [[0, 11]],
            Promise
          );
        },
      },
      {
        key: '_onNotificationSwitchValueChanged',
        value: function (t) {
          var o, module30, u;
          return regeneratorRuntime.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    l.prev = 0;
                    o = this.setting;
                    console.log('_onNotificationSwitchValueChanged getNotificationSwitchStatus : ' + JSON.stringify(o));
                    module30 = {
                      us_id: o.us_id,
                      identity: o.identity,
                      name: o.name,
                      st_id: o.st_id || 24,
                      setting: {
                        enable_exception_alert: t ? 1 : 0,
                      },
                      authed: o.authed,
                    };
                    l.next = 6;
                    return regeneratorRuntime.default.awrap(module387.default.asyncSmartHomeAPI('/scene/edit', module30));

                  case 6:
                    u = l.sent;
                    console.log('/scene/edit : ' + JSON.stringify(u));
                    this.setState({
                      notificationSwitch: t,
                    });
                    l.next = 15;
                    break;

                  case 11:
                    l.prev = 11;
                    l.t0 = l.catch(0);
                    console.log(l.t0);
                    globals.showToast(module491.robot_communication_exception);

                  case 15:
                  case 'end':
                    return l.stop();
                }
            },
            null,
            this,
            [[0, 11]],
            Promise
          );
        },
      },
      {
        key: 'changeMapSaveSwitchStatus',
        value: function (t) {
          var o, module30, u;
          return regeneratorRuntime.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    if (!module377.RSM.isRunning || t) {
                      l.next = 4;
                      break;
                    }

                    this.setState({
                      mapSaveModeEnabled: !t,
                    });
                    module1259.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
                      globals.showToast(module491.robot_communication_exception);
                    });
                    return l.abrupt('return');

                  case 4:
                    l.prev = 4;
                    this.setState({
                      mapSaveModeEnabled: t,
                    });
                    o = t ? 1 : 0;
                    module30 = module386.default.isMultiFloorSupported()
                      ? {
                          lab_status: o,
                        }
                      : o;
                    l.next = 10;
                    return regeneratorRuntime.default.awrap(module407.default.setLabStatus(module30));

                  case 10:
                    u = l.sent;

                    if (!t) {
                      this.setState({
                        multiFloorEnabled: false,
                      });
                      module1229.MM.getMultiMaps();
                      module1229.MM.maps = [];
                      module12.DeviceEventEmitter.emit(module411.NotificationKeys.DidReceiveSpecialEvent, {
                        data: module411.EventKeys.MapSegmentsDidChange,
                      });
                    }

                    console.log('changeMapSaveSwitchStatus - ' + JSON.stringify(u));
                    this.tipsView.setState({
                      shouldShow: t,
                    });
                    module377.RSM.mapSaveEnabled = t;
                    l.next = 32;
                    break;

                  case 17:
                    if (((l.prev = 17), (l.t0 = l.catch(4)), console.log(l.t0), -3 != l.t0.data.error)) {
                      l.next = 22;
                      break;
                    }

                    return l.abrupt('return');

                  case 22:
                    if (
                      (this.setState({
                        mapSaveModeEnabled: !t,
                      }),
                      -10005 != l.t0.data.error.code)
                    ) {
                      l.next = 26;
                      break;
                    }

                    globals.showToast(module491.plugin_need_update);
                    return l.abrupt('return');

                  case 26:
                    if (-10005 != l.t0.data.error) {
                      l.next = 30;
                      break;
                    }

                    globals.showToast(module491.plugin_need_update);
                    return l.abrupt('return');

                  case 30:
                    globals.showToast(module491.robot_communication_exception);

                  case 32:
                  case 'end':
                    return l.stop();
                }
            },
            null,
            this,
            [[4, 17]],
            Promise
          );
        },
      },
      {
        key: 'getCarpetPressurizeStatus',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.next = 2;
                    return regeneratorRuntime.default.awrap(module407.default.getCarpetMode());

                  case 2:
                    t = o.sent;
                    console.log('getCarpetPressurizeStatus: ' + JSON.stringify(t));
                    this.setState({
                      carpetPressurizeSwitch: 1 == t.result[0].enable,
                    });

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
                      robotZone: t,
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
        key: 'getRobotTimezone',
        value: function () {
          var t, o, s, u, l;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    c.next = 2;
                    return regeneratorRuntime.default.awrap(module407.default.getTimeZone());

                  case 2:
                    t = c.sent;
                    o = module387.default.timeZoneChange(t.result[0]);
                    console.log('getRobotTimezone - ' + JSON.stringify(t));
                    this.setState({
                      robotZone: o,
                    });
                    c.next = 8;
                    return regeneratorRuntime.default.awrap(module389.getPhoneTimezone());

                  case 8:
                    s = c.sent;
                    u = t.result[0];
                    l = s != u;
                    module390.default.sharedCache().robotTimeZone = u;
                    module390.default.sharedCache().phoneTimeZone = s;
                    module377.RobotStatusManager.sharedManager().timeZoneShouldShowRedDot = l;
                    module12.DeviceEventEmitter.emit(module411.NotificationKeys.RedDotDidChange, {
                      name: 'sync_time_zone',
                      value: l,
                    });

                  case 15:
                  case 'end':
                    return c.stop();
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
        key: 'openSyncTimezonePage',
        value: function () {
          this.props.navigation.navigate('SyncTimezonePage', {
            parent: this,
            title: module491.setting_timezone_title,
          });
        },
      },
      {
        key: 'onDonotDisturbSwitchValueChanged',
        value: function (t) {
          var o;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    if (
                      (this.setState({
                        isDoNotDisturbSwitchOn: t,
                      }),
                      !t)
                    ) {
                      s.next = 5;
                      break;
                    }

                    this.saveDoNotDisturbData();
                    s.next = 16;
                    break;

                  case 5:
                    s.prev = 5;
                    s.next = 8;
                    return regeneratorRuntime.default.awrap(module407.default.closeDndTimer());

                  case 8:
                    o = s.sent;
                    module383.LogEventStatus('carpet_pressurize_status_switch', {
                      on: t,
                    });
                    console.log('closeDndTimer - ' + JSON.stringify(o));
                    s.next = 16;
                    break;

                  case 13:
                    s.prev = 13;
                    s.t0 = s.catch(5);
                    console.log('closeDndTimer  error: ' + ('object' == typeof s.t0 ? JSON.stringify(s.t0) : s.t0));

                  case 16:
                  case 'end':
                    return s.stop();
                }
            },
            null,
            this,
            [[5, 13]],
            Promise
          );
        },
      },
      {
        key: 'setDotNotDisturbBeginTime',
        value: function () {
          this.showTimerPicker(this.doNotDisturbBeginHour, this.doNotDisturbBeginMinute);
          this.isDoNotDisturbBeginTime = true;
        },
      },
      {
        key: 'setDotNotDisturbEndTime',
        value: function () {
          this.showTimerPicker(this.doNotDisturbEndHour, this.doNotDisturbEndMinute);
          this.isDoNotDisturbBeginTime = false;
        },
      },
      {
        key: 'registerDeviceNameChangeListener',
        value: function () {
          var t = this;
          if (!module389.isMiApp)
            this.deviceNameChangedListener = module12.DeviceEventEmitter.addListener(module389.deviceNameChangedEvent, function (n) {
              t.setState({
                deviceName: n.newName,
              });
              module389.deviceName = n.newName;
            });
        },
      },
      {
        key: 'registerRobotTimeZoneRedDotListener',
        value: function () {
          var t = this;
          this.redPointListener = module12.DeviceEventEmitter.addListener(module411.NotificationKeys.RedDotDidChange, function (n) {
            t.setState({
              timeZoneShouldShowRedDot: module377.RobotStatusManager.sharedManager().timeZoneShouldShowRedDot,
            });
          });
        },
      },
      {
        key: 'unreigsterListeners',
        value: function () {
          if (this.deviceNameChangedListener) this.deviceNameChangedListener.remove();
          this.deviceNameChangedListener = null;
          if (this.redPointListener) this.redPointListener.remove();
          this.redPointListener = null;
        },
      },
      {
        key: 'finishLoading',
        value: function (t) {
          this.setState({
            requestFailed: t,
          });
          if (this.state.loading)
            this.setState({
              loading: false,
            });
        },
      },
      {
        key: 'retry',
        value: function () {
          var t = this;

          if (J < 3) {
            J++;
            setTimeout(function () {
              console.warn('retryTimes:' + J);
              t.getSwitchData(false);
            }, 1e3);
          } else
            this.setState({
              requestFailed: true,
            });
        },
      },
      {
        key: 'setAreaUnit',
        value: function () {
          var t = this;
          this.setState(
            {
              shouldShowAreaUnitView: true,
            },
            function () {
              module12.Animated.timing(t.animatedWrapMarginBottom, {
                toValue: 0,
                duration: 300,
              }).start();
            }
          );
        },
      },
      {
        key: 'hideAreaUnitView',
        value: function () {
          var t = this;
          module12.Animated.timing(this.animatedWrapMarginBottom, {
            toValue: -500,
            duration: 300,
          }).start(function () {
            t.setState({
              shouldShowAreaUnitView: false,
            });
          });
        },
      },
      {
        key: '_onSelectAreaViewMode',
        value: function (t) {
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    this.setState({
                      areaUnitIndex: t,
                    });
                    module390.default.sharedCache().areaUnitIndex = t;
                    this.hideAreaUnitView();
                    module12.DeviceEventEmitter.emit(module411.NotificationKeys.AreaUnitChange);
                    o.next = 6;
                    return regeneratorRuntime.default.awrap(module411.SetStorageKey(module411.StorageKeys.AreaUnitIndex, '' + t));

                  case 6:
                    module383.LogEventStatus('select_area_unit', {
                      unitIndex: t,
                    });

                  case 7:
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
        key: '_onSetChildLockValueChanged',
        value: function (t) {
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    console.log('ChildLock Switch - ' + t);
                    this.setState({
                      childLockSwitch: t,
                    });
                    o.prev = 2;
                    o.next = 5;
                    return regeneratorRuntime.default.awrap(module407.default.setChildLockStatus(t ? 1 : 0));

                  case 5:
                    o.next = 12;
                    break;

                  case 7:
                    o.prev = 7;
                    o.t0 = o.catch(2);
                    this.setState({
                      childLockSwitch: !t,
                    });
                    globals.showToast(module491.robot_communication_exception);
                    console.log(o.t0);

                  case 12:
                  case 'end':
                    return o.stop();
                }
            },
            null,
            this,
            [[2, 7]],
            Promise
          );
        },
      },
      {
        key: 'getChildLockStatus',
        value: function () {
          var t, o;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    s.next = 2;
                    return regeneratorRuntime.default.awrap(module407.default.getChildLockStatus());

                  case 2:
                    t = s.sent;
                    o = t.result.lock_status;
                    this.setState({
                      childLockSwitch: 1 == o,
                    });
                    console.log('getChildLock - ' + JSON.stringify(t));

                  case 6:
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
        key: 'getFlowLedStatus',
        value: function () {
          var t, o;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    s.next = 2;
                    return regeneratorRuntime.default.awrap(module407.default.getFlowSettingStatus());

                  case 2:
                    t = s.sent;
                    o = t.result.status;
                    this.setState({
                      flowLedStatusSwitch: 1 == o,
                    });
                    console.log('getFlowLedStatus - ' + JSON.stringify(t));

                  case 6:
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
        key: '_onFlowLedStatusSwitchValueChanged',
        value: function (t) {
          var o, s;
          return regeneratorRuntime.default.async(
            function (u) {
              for (;;)
                switch ((u.prev = u.next)) {
                  case 0:
                    if (((u.prev = 0), module386.default.isFlowLedSettingSupported())) {
                      u.next = 4;
                      break;
                    }

                    globals.showToast(module491.localization_strings_Setting_RemoteControlPage_54);
                    return u.abrupt('return');

                  case 4:
                    this.setState({
                      flowLedStatusSwitch: t,
                    });
                    o = t ? 1 : 0;
                    u.next = 8;
                    return regeneratorRuntime.default.awrap(module407.default.setFlowSettingStatus(o));

                  case 8:
                    s = u.sent;
                    console.log('_onFlowLedStatusSwitchValueChanged:' + JSON.stringify(s));
                    u.next = 17;
                    break;

                  case 12:
                    u.prev = 12;
                    u.t0 = u.catch(0);
                    this.setState({
                      flowLedStatusSwitch: !t,
                    });
                    globals.showToast(module491.robot_communication_exception);
                    console.log(u.t0);

                  case 17:
                  case 'end':
                    return u.stop();
                }
            },
            null,
            this,
            [[0, 12]],
            Promise
          );
        },
      },
    ]);
    return U;
  })(React.Component);

exports.default = U;
U.contextType = module506.AppConfigContext;
var Z = module12.StyleSheet.create({
  containterView: {
    flex: 1,
  },
  containter: {
    flex: 1,
    marginTop: module934.NavigationBarHeight,
    paddingBottom: 20,
  },
  modal: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: module12.Dimensions.get('window').width,
    height: module12.Dimensions.get('window').height,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: module934.AppBorderRadius,
  },
  section: {
    paddingVertical: 7,
  },
  sectionTitle: {
    fontSize: 12,
    color: '#888888',
  },
  toastView: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
  },
  timerOutView: {
    position: 'absolute',
    width: module12.Dimensions.get('window').width,
    height: module12.Dimensions.get('window').height,
  },
});
