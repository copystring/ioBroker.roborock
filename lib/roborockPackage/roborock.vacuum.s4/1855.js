var regeneratorRuntime = require('regenerator-runtime'),
  module21 = require('./21'),
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
    var o = L(n);
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
  })(require('react')),
  module12 = require('./12'),
  module381 = require('./381'),
  module387 = require('./387'),
  module377 = require('./377'),
  module411 = require('./411'),
  module1378 = require('./1378'),
  module383 = require('./383'),
  module1231 = require('./1231'),
  module1856 = require('./1856'),
  module386 = require('./386'),
  module1857 = require('./1857'),
  module502 = require('./502'),
  module506 = require('./506'),
  module415 = require('./415');

function L(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (L = function (t) {
    return t ? o : n;
  })(t);
}

function x() {
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

var module491 = require('./491').strings,
  module389 = require('./389'),
  module936 = require('./936'),
  V = (function (t) {
    module7.default(V, t);

    var module506 = V,
      L = x(),
      A = function () {
        var t,
          n = module11.default(module506);

        if (L) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function V(t) {
      var n;
      module4.default(this, V);

      (n = A.call(this, t)).renderListRow = function (t) {
        var n = t.index,
          s = t.section.data.length,
          l = t.item;
        return React.default.createElement(
          module381.SettingListItemView,
          module21.default({}, l, {
            key: n,
            shouldShowBottomLine: !module389.isMiApp && n < s - 1,
            bottomLineStyle: {
              width: module12.Dimensions.get('window').width - 50,
            },
            touchStyle: [
              {
                borderTopLeftRadius: 0 == n ? 8 : 0,
              },
              {
                borderTopRightRadius: 0 == n ? 8 : 0,
              },
              {
                borderBottomLeftRadius: n == s - 1 ? 8 : 0,
              },
              {
                borderBottomRightRadius: n == s - 1 ? 8 : 0,
              },
            ],
          })
        );
      };

      n.sectionComp = function () {
        return React.default.createElement(module12.View, {
          style: {
            height: 15,
            backgroundColor: n.context.theme.settingBackgroundColor,
          },
        });
      };

      n.state = {
        shouldShowRedPointForFirmwareUpdate: module377.RobotStatusManager.sharedManager().firmwareShouldShowRedDot,
        deviceName: module389.deviceName,
        timeZoneShouldShowRedDot: module377.RobotStatusManager.sharedManager().timeZoneShouldShowRedDot,
        soundPackageShouldShowRedDot: module377.RobotStatusManager.sharedManager().soundPackageShouldShowRedDot,
        dustCollectionVisible: module377.RobotStatusManager.sharedManager().isCollectDustDock,
      };
      console.log('Devicename - ' + n.state.deviceName);
      n.pressTitleCount = 0;
      n.isTriggerFindMe = false;
      n.unMount = false;
      return n;
    }

    module5.default(V, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          var t = this;
          if (module389.isMiApp)
            this.deviceNameChangedListener = module389.DeviceEvent.deviceNameChanged.addListener(function (n) {
              t.setState({
                deviceName: module389.Device.name,
              });
              module389.deviceName = module389.Device.name;
            });
          else
            this.deviceNameChangedListener = module12.DeviceEventEmitter.addListener(module389.deviceNameChangedEvent, function (n) {
              t.setState({
                deviceName: n.newName,
              });
              module389.deviceName = n.newName;
            });
        },
      },
      {
        key: 'componentDidMount',
        value: function () {
          var t, o;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    console.log('\u8bbe\u7f6e\u9875\u9762 componentDidMount');
                    t = this;
                    this.props.navigation.setParams({
                      title: module491.localization_strings_Setting_index_21,
                      onPressTitle: this.onPressTitle.bind(this),
                      hiddenBottomLine: module389.isMiApp,
                    });
                    this.redPointListener = module12.DeviceEventEmitter.addListener(module411.NotificationKeys.RedDotDidChange, function (n) {
                      t.forceUpdate();
                    });
                    s.next = 6;
                    return regeneratorRuntime.default.awrap(this.getDustCollectionVisible());

                  case 6:
                    o = s.sent;
                    if (!this.unMount)
                      this.setState({
                        dustCollectionVisible: o,
                      });

                  case 8:
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
        key: 'forceUpdate',
        value: function () {
          this.setState({
            timeZoneShouldShowRedDot: module377.RobotStatusManager.sharedManager().timeZoneShouldShowRedDot,
            soundPackageShouldShowRedDot: module377.RobotStatusManager.sharedManager().soundPackageShouldShowRedDot,
          });
        },
      },
      {
        key: 'onPressTitle',
        value: function () {
          console.log('onPressTitle');
          this.pressTitleCount++;

          if (this.pressTitleCount >= 10) {
            this.pressTitleCount = 0;
            this.randomCodeView.setState({
              shouldShow: true,
            });
            this.getSn();
          }
        },
      },
      {
        key: 'getSn',
        value: function () {
          var t, module21, s;
          return regeneratorRuntime.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    l.prev = 0;
                    l.next = 3;
                    return regeneratorRuntime.default.awrap(RobotApi.getSerialNumber());

                  case 3:
                    t = l.sent;
                    module21 = t.result[0].serial_number;
                    console.log('getSn --- ' + JSON.stringify(t));
                    l.next = 8;
                    return regeneratorRuntime.default.awrap(module389.getPrivacyCode(module21));

                  case 8:
                    s = l.sent;
                    console.log('get randomCode - ' + s);
                    this.randomCodeView.setState({
                      randomCode: s,
                    });
                    l.next = 16;
                    break;

                  case 13:
                    l.prev = 13;
                    l.t0 = l.catch(0);
                    console.log('getSn  error: ' + ('object' == typeof l.t0 ? JSON.stringify(l.t0) : l.t0));

                  case 16:
                  case 'end':
                    return l.stop();
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
        key: 'componentWillUnmount',
        value: function () {
          this.unMount = true;
          console.log('\u8bbe\u7f6e\u9875\u9762 componentWillUnmount');
          this.redPointListener.remove();
          if (this.deviceNameChangedListener) this.deviceNameChangedListener.remove();
          this.deviceNameChangedListener = null;
          module1231.MapManager.sharedManager().isStopedBySettingPage = false;
          module1231.MapManager.sharedManager().start();
          if (this.props.navigation.state.params.enabledTitleBarUpdate) this.props.navigation.state.params.enabledTitleBarUpdate();
          module1857.default.checkFirmwareRedPoint();
        },
      },
      {
        key: 'getThreeDimensionTitle',
        value: function () {
          return module415.DMM.isTanosV
            ? module491.camera_setting_rrai_title
            : module415.DMM.isTanosSPlus || module415.DMM.isTopazSPlus
            ? module491.localization_strings_Setting_index_24
            : module491.camera_setting_detail2;
        },
      },
      {
        key: 'getMenuDatas',
        value: function () {
          var t = this,
            n = {
              title: '\u62d6\u677f\u5347\u964d\u9707\u52a8\u6d4b\u8bd5',
              funcId: 'setting_layer_board',
              onPress: function () {
                t.openSettingLayerBorad();
              },
              visible: 'rr5ac0b0ba0e3d70' == module389.userId,
              shouldShowBottomLine: false,
            },
            o = {
              title: this.getThreeDimensionTitle(),
              funcId: 'three_dimension',
              visible: module415.DMM.isTanosV || module415.DMM.isTanosSPlus || module415.DMM.isTopazSPlus || module415.DMM.isTanosSV || module415.DMM.isTopazSV,
              shouldShowBottomLine: false,
              onPress: function () {
                t.openStructureLightPage();
              },
            },
            s = {
              title: module491.map_edit_title,
              funcId: 'setting_page_map_edit',
              onPress: function () {
                t.openFloorMapPage();
              },
              shouldShowBottomLine: false,
              visible: true,
            },
            l = {
              title: module491.setting_robot_setting,
              funcId: 'setting_page_robot_setting',
              onPress: function () {
                return t.openRobotSettingPage();
              },
              visible: true,
              shouldShowRedPoint: this.state.timeZoneShouldShowRedDot,
              shouldShowBottomLine: false,
            },
            u = {
              title: module491.carpet_clean_mode_setting_title,
              funcId: 'robot_setting_page_carpet_clean_mode',
              onPress: this.openCarpetCleanModePage.bind(this),
              visible: module386.default.isCarpetSupported() && !module415.DMM.isGarnet,
              shouldShowBottomLine: false,
            },
            c = {
              title: module491.dust_collection_setting_title,
              funcId: 'robot_setting_page_dust_collection_mode',
              onPress: this.openDustCollectionModePage.bind(this),
              visible: this.state.dustCollectionVisible && !this.isGarnetShowWashTowel(),
              shouldShowBottomLine: false,
            },
            p = {
              title: module491.wash_towel_title,
              funcId: 'robot_setting_page_wash_towel_mode',
              onPress: this.openWashTowelPage.bind(this),
              visible: module377.RSM.hasConnectedWashDock || module377.RSM.isO2Dock() || module377.RSM.isO3Dock() || module415.DMM.isTopazS,
              shouldShowBottomLine: false,
            },
            h = {
              title: module491.setting_realtime_monitor_switch_title,
              isDetailCenter: false,
              rightCenter: true,
              visible:
                module386.default.isVideoMonitorSupported() &&
                !module387.default.isShareUser() &&
                !module389.isMiApp &&
                (module415.DMM.isTanosV || module415.DMM.isTopazSV || module415.DMM.isTanosSV),
              funcId: 'camera_setting_real_time_monitor',
              onPress: function () {
                return t.props.navigation.navigate('CameraSettingDetail', {
                  mode: 2,
                  isMonitorPage: t.props.navigation.state.params.isMonitorPage,
                });
              },
              shouldShowBottomLine: false,
            },
            _ = {
              title: module491.robot_setting_air_dry_title,
              funcId: 'setting_page_air_dry',
              onPress: function () {
                return t.openAirDryPage();
              },
              visible: module415.DMM.isGarnet,
              shouldShowBottomLine: false,
            },
            f = {
              title: module491.soundpackage_volume_adjust_title,
              funcId: 'setting_page_soundpackage_volume',
              onPress: function () {
                return t.openSoundPackagePage();
              },
              shouldShowRedPoint: this.state.soundPackageShouldShowRedDot,
              visible: true,
              shouldShowBottomLine: false,
            },
            M = {
              title: module491.localization_strings_Setting_index_3,
              funcId: 'setting_page_timer',
              onPress: function () {
                return t.openTimerSettingPage();
              },
              visible: !(module387.default.isShareUser() && 1 == module377.RobotStatusManager.sharedManager().FCCState),
              shouldShowBottomLine: false,
            },
            P = {
              title: module491.rubys_main_button_text_goto,
              funcId: 'setting_page_goto',
              onPress: function () {
                return t.onOpenMapViewGotoPage();
              },
              visible: true,
              shouldShowBottomLine: false,
            },
            b = {
              title: module491.localization_strings_Setting_index_23,
              funcId: 'setting_page_remote',
              onPress: this.openRemoteControlPage.bind(this),
              visible: module389.apiLevel >= 10003 || module389.isMiApp,
              shouldShowBottomLine: false,
            },
            y = {
              title: module491.localization_strings_Setting_History_index_2,
              funcId: 'setting_page_clean_history',
              eventName: module383.LogEventMap.CleanRecordListPage,
              onPress: function () {
                return t.openHistoryPage();
              },
              visible: true,
              shouldShowBottomLine: module389.isMiApp,
              isLineMarginRight: module389.isMiApp,
            },
            C = {
              title: module491.localization_strings_Setting_index_9,
              funcId: 'setting_page_supplies',
              eventName: module383.LogEventMap.SuppliesListPage,
              onPress: this.openSuppliesPage.bind(this),
              shouldShowRedPoint: module377.RobotStatusManager.sharedManager().suppliesShouldShowRedDot,
              visible: true,
              shouldShowBottomLine: false,
            },
            R = {
              title: module491.localization_strings_Setting_Guide_index_17,
              funcId: 'setting_page_contact',
              onPress: function () {
                return t.onOpenContactUSPage();
              },
              visible: true,
              shouldShowBottomLine: module389.isMiApp && !module386.default.isObaAccount() && !module377.RobotStatusManager.sharedManager().wifiDebug,
              isLineMarginRight: module389.isMiApp,
            },
            L = {
              title: module491.localization_strings_Setting_Guide_GuideDetailPage_0,
              funcId: 'setting_page_guide',
              onPress: function () {
                return t.openGuidePage();
              },
              visible: module386.default.shouldShowGuidePage() && !module415.DMM.isTopazS,
              shouldShowBottomLine: module389.isMiApp,
              isLineMarginRight: module389.isMiApp,
            },
            x = {
              title: module491.wifi_debug_mode_title1,
              funcId: 'setting_page_WiFi',
              onPress: function () {
                return t.openWiFiDebugPage();
              },
              visible: module377.RobotStatusManager.sharedManager().wifiDebug,
              shouldShowBottomLine: module389.isMiApp && !module386.default.isObaAccount(),
              isLineMarginRight: module389.isMiApp,
            },
            A = {
              title: module491.localization_strings_Setting_General_index_3,
              funcId: 'setting_page_device_upgrade',
              onPress: function () {
                return t.openDeviceUpgradePage();
              },
              shouldShowRedPoint: module377.RobotStatusManager.sharedManager().firmwareShouldShowRedDot,
              visible: module389.isSupportFirmwareVersion() && !module387.default.isShareUser(),
              shouldShowBottomLine: false,
            },
            V = {
              title: module491.setting_page_device_share,
              funcId: 'setting_page_device_share',
              onPress: function () {
                return module389.openDeviceSharePage();
              },
              visible: module389.canOpenDeviceSharePage() && !module387.default.isShareUser(),
              shouldShowBottomLine: false,
            },
            E = {
              title: module491.localization_strings_Setting_index_2,
              onPress: function () {
                return t.triggerFindMe();
              },
              funcId: 'setting_page_find_me',
              visible: module386.default.isFindMeSupported(),
              shouldShowBottomLine: module389.isMiApp,
              isLineMarginRight: module389.isMiApp,
            },
            N = {
              title: module502.ObaInfoString.Title,
              funcId: 'setting_page_oba_info',
              onPress: function () {
                return t.openObaPage();
              },
              visible: module386.default.isObaAccount(),
              shouldShowBottomLine: module389.isMiApp,
              isLineMarginRight: module389.isMiApp,
            },
            z = [
              {
                data: [n, o, h, s, l, p, _, c, u, f],
              },
              {
                data: [M, P, b],
              },
              {
                data: [y, C, R, L, x],
              },
              {
                data: [A, V, E, N],
              },
            ],
            F = [
              {
                sectionTitle: module491.setting_section_title_clean_management,
                funcId: 'setting_page_section_title1',
                visible: true,
              },
              n,
              s,
              M,
              P,
              b,
              y,
              {
                sectionTitle: module491.setting_section_title1,
                funcId: 'setting_page_section_title2',
                visible: true,
              },
              o,
              h,
              l,
              p,
              _,
              c,
              u,
              f,
              E,
              {
                sectionTitle: module491.setting_section_title_more_info,
                funcId: 'setting_page_section_title3',
                visible: true,
              },
              C,
              R,
              x,
              N,
            ];
          if (!module389.isMiApp) for (var U = 0; U < z.length; U++) for (var O = z[U].data, G = 0; G < O.length; G++) O[G].visible || (O.splice(G, 1), (G -= 1));
          return module389.isMiApp ? F : z;
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.context.theme,
            s =
              !module387.default.isShareUser() &&
              React.default.createElement(module381.PureButton, {
                funcId: 'setting_delete_device',
                style: [
                  E.deleteButton,
                  {
                    backgroundColor: n.setting.delBackgroundColor,
                  },
                ],
                title: module491.localization_strings_Setting_General_index_4,
                textColor: 'red',
                fontSize: 15,
                onPress: function () {
                  module389.openDeleteDevice();
                },
              });

          if (module389.isMiApp) {
            var l = module389.SETTING_KEYS,
              u = l.first_options,
              c = [u.SHARE, u.IFTTT, u.FIRMWARE_UPGRADE],
              p = React.default.createElement(module389.CommonSetting, {
                navigation: this.props.navigation,
                firstOptions: c,
                showDot: this.state.shouldShowRedPointForFirmwareUpdate ? [u.FIRMWARE_UPGRADE] : [],
                extraOptions: {
                  licenseUrl: module1378.default.UserAgreement(),
                  policyUrl: module1378.default.UserPrivacyProtocol(),
                },
              }),
              S = this.getMenuDatas().map(function (s, l) {
                return s.visible
                  ? s.title
                    ? React.default.createElement(
                        module381.SettingListItemView,
                        module21.default({}, s, {
                          key: l,
                          paddingLeft: 25,
                          paddingRight: 25,
                          iconSize: 18,
                          style: {
                            backgroundColor: t.context.theme.settingListItem.miSetBackgroundColor,
                          },
                        })
                      )
                    : s.sectionTitle
                    ? React.default.createElement(
                        module12.View,
                        {
                          style: [
                            E.sectionMijia,
                            {
                              marginTop: 0,
                              paddingTop: s.sectionTitle.length > 0 ? 25 : 5,
                              paddingBottom: s.sectionTitle.length > 0 ? 10 : 5,
                              backgroundColor: t.context.theme.settingListItem.miSetBackgroundColor,
                            },
                          ],
                          key: l,
                        },
                        s.sectionTitle.length > 0 &&
                          React.default.createElement(
                            module12.Text,
                            {
                              style: [
                                E.sectionTitle,
                                {
                                  color: n.setting.topTextColor,
                                },
                              ],
                            },
                            s.sectionTitle
                          )
                      )
                    : React.default.createElement(module12.View, {
                        style: E.section,
                        key: l,
                      })
                  : React.default.createElement(module12.View, {
                      key: l,
                    });
              });
            return React.default.createElement(
              module12.View,
              {
                style: [
                  E.containterView,
                  {
                    backgroundColor: n.settingBackgroundColor,
                  },
                ],
              },
              React.default.createElement(
                module12.ScrollView,
                {
                  style: E.containter,
                  showsVerticalScrollIndicator: false,
                },
                React.default.createElement(
                  module12.View,
                  {
                    style: {},
                  },
                  S
                ),
                p
              ),
              React.default.createElement(module1856.default, {
                ref: function (n) {
                  t.randomCodeView = n;
                },
              })
            );
          }

          return React.default.createElement(
            module12.View,
            {
              style: [
                E.containterView,
                {
                  backgroundColor: n.settingBackgroundColor,
                },
              ],
            },
            React.default.createElement(module12.SectionList, {
              style: [
                {
                  flex: 1,
                },
                {
                  paddingHorizontal: 15,
                },
              ],
              showsVerticalScrollIndicator: false,
              automaticallyAdjustContentInsets: false,
              sections: this.getMenuDatas(),
              renderItem: this.renderListRow,
              keyExtractor: function (t, n) {
                return 'index:' + n + t;
              },
              renderSectionHeader: this.sectionComp,
              ListFooterComponent: function () {
                return s;
              },
              stickySectionHeadersEnabled: false,
            }),
            React.default.createElement(module1856.default, {
              ref: function (n) {
                t.randomCodeView = n;
              },
            })
          );
        },
      },
      {
        key: 'openRobotSettingPage',
        value: function () {
          this.props.navigation.navigate('RobotSettingPage', {
            title: module491.setting_robot_setting,
          });
        },
      },
      {
        key: 'openTimerSettingPage',
        value: function () {
          this.props.navigation.navigate('TimerPage', {
            title: module491.localization_strings_Setting_index_3,
          });
        },
      },
      {
        key: 'openSoundPackagePage',
        value: function () {
          this.props.navigation.navigate('SoundPackagePage', {
            title: module491.soundpackage_volume_adjust_title,
          });
        },
      },
      {
        key: 'openHistoryPage',
        value: function () {
          this.props.navigation.navigate('HistoryPage', {
            title: module491.localization_strings_Setting_History_index_2,
          });
        },
      },
      {
        key: 'openSuppliesPage',
        value: function () {
          this.props.navigation.navigate('SuppliesPage', {
            parent: this,
          });
        },
      },
      {
        key: 'openGuidePage',
        value: function () {
          this.props.navigation.navigate('GuidePage', {
            title: module491.localization_strings_Setting_Guide_GuideDetailPage_0,
          });
        },
      },
      {
        key: 'openObaPage',
        value: function () {
          this.props.navigation.navigate('ObaInfoPage', {
            title: module502.ObaInfoString.Title,
          });
        },
      },
      {
        key: 'openNetinfoPage',
        value: function () {
          this.props.navigation.navigate('NetInfoPage', {
            title: module491.localization_strings_Setting_General_index_5,
          });
        },
      },
      {
        key: 'openCleanModePage',
        value: function () {
          this.props.navigation.navigate('CleanModePage', {
            title: module491.localization_strings_Setting_CleanModePage_5,
            parent: this,
          });
        },
      },
      {
        key: 'openIntelligentScene',
        value: function () {
          module389.openIftttAutoPage();
        },
      },
      {
        key: 'openRemoteControlPage',
        value: function () {
          if (module377.RSM.voiceChat) globals.showToast(module491.voice_chat_title2);
          else {
            console.log('\u6253\u5f00 \u8fdc\u7a0b\u9065\u63a7\u754c\u9762-----');
            if (module389.isMiApp || module386.default.isRemoteSupported()) this.props.navigation.navigate('RemoteControlPageNew', {});
            else globals.showToast(module491.localization_strings_Setting_RemoteControlPage_54);
          }
        },
      },
      {
        key: 'onOpenMapViewGotoPage',
        value: function () {
          if (module377.RSM.voiceChat) globals.showToast(module491.voice_chat_title2);
          else
            this.props.navigation.navigate('MapViewGotoPage', {
              title: module491.rubys_main_button_text_goto,
            });
        },
      },
      {
        key: 'triggerFindMe',
        value: function () {
          var t = this;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    if (!this.isTriggerFindMe) {
                      o.next = 2;
                      break;
                    }

                    return o.abrupt('return');

                  case 2:
                    o.prev = 2;
                    this.isTriggerFindMe = true;
                    o.next = 6;
                    return regeneratorRuntime.default.awrap(RobotApi.findMe());

                  case 6:
                    globals.showToast(module491.localization_strings_Setting_index_19);
                    setTimeout(function () {
                      t.isTriggerFindMe = false;
                    }, 1e3);
                    o.next = 16;
                    break;

                  case 11:
                    o.prev = 11;
                    o.t0 = o.catch(2);
                    this.isTriggerFindMe = false;
                    console.log(o.t0);
                    globals.showToast(module491.robot_communication_exception);

                  case 16:
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
        key: 'getDustCollectionVisible',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    t = module377.RobotStatusManager.sharedManager().isCollectDustDock;
                    o.next = 3;
                    return regeneratorRuntime.default.awrap(module411.GetStorageKey(module411.StorageKeys.HasCollectDustDock));

                  case 3:
                    if (!o.sent) {
                      o.next = 6;
                      break;
                    }

                    return o.abrupt('return', true);

                  case 6:
                    if (!t) {
                      o.next = 10;
                      break;
                    }

                    o.next = 9;
                    return regeneratorRuntime.default.awrap(module411.SetStorageKey(module411.StorageKeys.HasCollectDustDock, '1'));

                  case 9:
                    return o.abrupt('return', true);

                  case 10:
                    return o.abrupt('return', false);

                  case 11:
                  case 'end':
                    return o.stop();
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
        key: 'openNetInfoPage',
        value: function () {
          var t = this;
          module389.getDevicePropertyFromMemCache(['ssid', 'localip', 'mac'], function (n) {
            if (n.ssid || n.localip || n.mac)
              t.props.navigation.navigate('NetInfoPage', {
                ssid: n.ssid || Unknown,
                localip: n.localip || Unknown,
                mac: n.mac || Unknown,
              });
            else alert(module491.localization_strings_Setting_CleanModePage_3);
          });
        },
      },
      {
        key: 'onOpenContactUSPage',
        value: function () {
          this.props.navigation.navigate('ContactUSPage', {
            title: module491.localization_strings_Setting_Guide_index_17,
          });
        },
      },
      {
        key: 'openDeviceUpgradePage',
        value: function () {
          module389.openDeviceUpgradePage();
          this.setState({
            shouldShowRedPointForFirmwareUpdate: false,
          });
          module377.RobotStatusManager.sharedManager().firmwareShouldShowRedDot = false;
          module12.DeviceEventEmitter.emit(module411.NotificationKeys.RedDotDidChange, {
            name: 'firmware_update',
            value: false,
          });
        },
      },
      {
        key: 'openFloorMapPage',
        value: function () {
          this.props.navigation.navigate('MultiFloorPage', {
            title: module491.map_edit_title,
          });
        },
      },
      {
        key: 'openCarpetCleanModePage',
        value: function () {
          this.props.navigation.navigate('CarpetCleanModeSetting', {
            parent: this,
            title: module491.setting_timezone_title,
          });
        },
      },
      {
        key: 'openStructureLightPage',
        value: function () {
          this.props.navigation.navigate('StructureLightSetting', {
            title: this.getThreeDimensionTitle(),
          });
        },
      },
      {
        key: 'openWiFiDebugPage',
        value: function () {
          this.props.navigation.navigate('WiFiDebugPage', {
            title: module491.wifi_debug_mode_title1,
            refrence: module1378.default.WiFiPrivacy(),
          });
        },
      },
      {
        key: 'openSettingLayerBorad',
        value: function () {
          this.props.navigation.navigate('SettingLayerBorad', {
            parent: this,
            title: '\u62d6\u677f\u5347\u964d\u9707\u52a8\u6d4b\u8bd5',
          });
        },
      },
      {
        key: 'openDustCollectionModePage',
        value: function () {
          this.props.navigation.navigate('DustCollectionModeSetting', {
            parent: this,
          });
        },
      },
      {
        key: 'openWashTowelPage',
        value: function () {
          this.props.navigation.navigate('WashTowelSettingNew', {
            parent: this,
            dustCollectionVisible: this.state.dustCollectionVisible,
          });
        },
      },
      {
        key: 'isGarnetShowWashTowel',
        value: function () {
          return module415.DMM.isGarnet && this.state.dustCollectionVisible;
        },
      },
      {
        key: 'openAirDryPage',
        value: function () {
          this.props.navigation.navigate('SettingAirDryPage', {
            title: module491.robot_setting_air_dry_title,
          });
        },
      },
    ]);
    return V;
  })(React.Component);

exports.default = V;
V.contextType = module506.AppConfigContext;
var E = module12.StyleSheet.create({
  containterView: {
    flex: 1,
  },
  containter: {
    flex: 1,
    marginTop: module936.NavigationBarHeight,
    paddingBottom: 20,
  },
  section: {
    justifyContent: 'center',
    paddingVertical: 7,
  },
  sectionMijia: {
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingLeft: 20,
  },
  sectionTitle: {
    paddingVertical: module389.isMiApp ? 5 : 0,
    fontSize: module389.isMiApp ? 11.5 : 13,
    marginLeft: module389.isMiApp ? 7 : 0,
  },
  deleteButton: {
    marginTop: 10,
    alignSelf: 'stretch',
    height: 60,
    marginBottom: 20,
    marginTop: 24,
    borderRadius: 8,
  },
  lineView: {
    height: 0.5,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
});
