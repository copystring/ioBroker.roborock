require('./1964');

require('./394');

var regeneratorRuntime = require('regenerator-runtime'),
  module22 = require('./22'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module385 = require('./385'),
  module391 = require('./391'),
  module381 = require('./381'),
  module420 = require('./420'),
  module1655 = require('./1655'),
  module387 = require('./387'),
  module415 = require('./415'),
  module1963 = require('./1963'),
  module390 = require('./390'),
  module1491 = require('./1491'),
  module1200 = require('./1200'),
  module424 = require('./424'),
  module520 = require('./520'),
  module418 = require('./418');

function B() {
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

var module510 = require('./510').strings,
  module393 = require('./393'),
  module1344 = require('./1344'),
  V = (function (t) {
    module9.default(V, t);

    var n = V,
      module1200 = B(),
      N = function () {
        var t,
          o = module12.default(n);

        if (module1200) {
          var s = module12.default(this).constructor;
          t = Reflect.construct(o, arguments, s);
        } else t = o.apply(this, arguments);

        return module11.default(this, t);
      };

    function V(t) {
      var n;
      module6.default(this, V);

      (n = N.call(this, t)).renderListRow = function (t) {
        var n = t.index,
          o = t.section.data.length,
          l = t.item;
        return React.default.createElement(
          module385.SettingListItemView,
          module22.default({}, l, {
            key: n,
            shouldShowBottomLine: !module393.isMiApp && n < o - 1,
            bottomLineStyle: {
              width: module13.Dimensions.get('window').width - 50,
            },
            touchStyle: [
              {
                borderTopLeftRadius: 0 == n ? 8 : 0,
              },
              {
                borderTopRightRadius: 0 == n ? 8 : 0,
              },
              {
                borderBottomLeftRadius: n == o - 1 ? 8 : 0,
              },
              {
                borderBottomRightRadius: n == o - 1 ? 8 : 0,
              },
            ],
          })
        );
      };

      n.sectionComp = function () {
        return React.default.createElement(module13.View, {
          style: {
            height: 15,
            backgroundColor: n.context.theme.settingBackgroundColor,
          },
        });
      };

      n.openGroundCleanModePage = function () {
        n.props.navigation.navigate('GroundCleanModePage', {
          title: module510.ground_material_clean_setting_title,
        });
      };

      n.state = {
        shouldShowRedPointForFirmwareUpdate: module381.RobotStatusManager.sharedManager().firmwareShouldShowRedDot,
        deviceName: module393.deviceName,
        timeZoneShouldShowRedDot: module381.RobotStatusManager.sharedManager().timeZoneShouldShowRedDot,
        soundPackageShouldShowRedDot: module381.RobotStatusManager.sharedManager().soundPackageShouldShowRedDot,
      };
      console.log('Devicename - ' + n.state.deviceName);
      n.pressTitleCount = 0;
      n.unMount = false;
      return n;
    }

    module7.default(V, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          var t = this;
          this.props.navigation.setParams({
            hiddenBottomLine: true,
          });
          if (module393.isMiApp)
            this.deviceNameChangedListener = module393.DeviceEvent.deviceNameChanged.addListener(function (n) {
              if (!t.unMount)
                t.setState({
                  deviceName: module393.Device.name,
                });
              module393.deviceName = module393.Device.name;
            });
          else {
            this.deviceNameChangedListener = module13.DeviceEventEmitter.addListener(module393.deviceNameChangedEvent, function (n) {
              if (!t.unMount)
                t.setState({
                  deviceName: n.newName,
                });
              module393.deviceName = n.newName;
            });
            this.props.navigation.setParams({
              navBarBackgroundColor: this.context.theme.settingBackgroundColor,
            });
          }
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
                    t = this;
                    this.props.navigation.setParams({
                      title: module510.localization_strings_Setting_index_21,
                      onPressTitle: this.onPressTitle.bind(this),
                    });
                    this.redPointListener = module13.DeviceEventEmitter.addListener(module420.NotificationKeys.RedDotDidChange, function (n) {
                      t.forceUpdate();
                    });
                    module418.Log.log(module418.LogTypes.KeyEvent, 'enter setting page, lang: ' + globals.AppLang + ',isRTL:' + globals.isRTL);

                  case 4:
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
        key: 'onThemeChange',
        value: function (t) {
          this.props.navigation.setParams({
            navBarBackgroundColor: this.context.theme.settingBackgroundColor,
          });
        },
      },
      {
        key: 'forceUpdate',
        value: function () {
          if (!this.unMount)
            this.setState({
              timeZoneShouldShowRedDot: module381.RobotStatusManager.sharedManager().timeZoneShouldShowRedDot,
              soundPackageShouldShowRedDot: module381.RobotStatusManager.sharedManager().soundPackageShouldShowRedDot,
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
          var t, n, s;
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
                    n = t.result[0].serial_number;
                    console.log('getSn --- ' + JSON.stringify(t));
                    l.next = 8;
                    return regeneratorRuntime.default.awrap(module393.getPrivacyCode(n));

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
          module415.MapManager.sharedManager().isStopedBySettingPage = false;
          module415.MapManager.sharedManager().start();
          if (this.props.navigation.state.params.enabledTitleBarUpdate) this.props.navigation.state.params.enabledTitleBarUpdate();
        },
      },
      {
        key: 'getThreeDimensionTitle',
        value: function () {
          return module424.DMM.isTopazSC || module424.DMM.isPearl
            ? module510.setting_auto_avoid_obstacle_title
            : module424.DMM.isTanosV
            ? module510.camera_setting_rrai_title
            : module424.DMM.isTanosSPlus
            ? module510.localization_strings_Setting_index_24
            : module510.camera_setting_detail2;
        },
      },
      {
        key: 'getMenuDatas',
        value: function () {
          var t = this,
            n = {
              title: this.getThreeDimensionTitle(),
              funcId: 'three_dimension',
              visible: module390.default.isReactiveAISupported(),
              shouldShowBottomLine: false,
              onPress: this.openStructureLightPage.bind(this),
            },
            o = {
              title: module510.map_edit_title,
              funcId: 'setting_page_map_edit',
              onPress: this.openFloorMapPage.bind(this),
              shouldShowBottomLine: false,
              visible: true,
            },
            s = {
              title: module510.setting_robot_setting,
              funcId: 'setting_page_robot_setting',
              onPress: this.openRobotSettingPage.bind(this),
              visible: true,
              shouldShowBottomLine: false,
            },
            l = {
              title: module510.carpet_clean_mode_setting_title,
              funcId: 'robot_setting_page_carpet_clean_mode',
              onPress: this.openCarpetCleanModePage.bind(this),
              visible: module390.default.isCarpetSupported() && !module424.DMM.isGarnet,
              shouldShowBottomLine: false,
            },
            u = {
              title: module510.ground_material_clean_setting_title,
              funcId: 'robot_setting_page_ground_clean_mode',
              onPress: this.openGroundCleanModePage,
              visible: module390.default.isSupportFloorDirection(),
              shouldShowBottomLine: false,
            },
            c = {
              title: module510.dust_collection_setting_title,
              funcId: 'robot_setting_page_dust_collection_mode',
              onPress: this.openDustCollectionModePage.bind(this),
              visible: module381.RSM.isO1Dock() || module381.RSM.isOCDock() || 1 == module381.RSM.lastDockType,
              shouldShowBottomLine: false,
            },
            p = {
              title: module510.wash_towel_title,
              funcId: 'robot_setting_page_wash_towel_mode',
              onPress: this.openWashTowelPage.bind(this),
              visible: module381.RSM.isO2Dock() || 2 == module381.RSM.lastDockType,
              shouldShowBottomLine: false,
            },
            h = {
              title: module510.robot_setting_self_cleaning_title,
              funcId: 'robot_setting_page_self_cleaning',
              onPress: this.openSelfCleaningSettingPage.bind(this),
              visible: module381.RSM.isCollectWashDock() || module381.RSM.isCollectWashDryDock(),
              shouldShowBottomLine: false,
            },
            _ = {
              title: module510.setting_realtime_monitor_switch_title,
              isDetailCenter: false,
              rightCenter: true,
              visible:
                module390.default.isVideoMonitorSupported() &&
                !module391.default.isShareUser() &&
                !module393.isMiApp &&
                (module424.DMM.isTanosV || module424.DMM.isTopazSV || module424.DMM.isPearlPlus || module424.DMM.isTanosSV),
              funcId: 'camera_setting_real_time_monitor',
              onPress: function () {
                return t.props.navigation.navigate('CameraSettingDetail');
              },
              shouldShowBottomLine: false,
            },
            f = {
              title: module510.soundpackage_volume_adjust_title,
              funcId: 'setting_page_soundpackage_volume',
              onPress: function () {
                return t.openSoundPackagePage();
              },
              shouldShowRedPoint: this.state.soundPackageShouldShowRedDot,
              visible: true,
              shouldShowBottomLine: false,
            },
            v = {
              title: module510.localization_strings_Setting_index_3,
              funcId: 'setting_page_timer',
              onPress: function () {
                return t.openTimerSettingPage();
              },
              visible: !(module391.default.isShareUser() && 1 == module381.RobotStatusManager.sharedManager().FCCState),
              shouldShowBottomLine: false,
            },
            w = {
              title: module510.rubys_main_button_text_goto,
              funcId: 'setting_page_goto',
              onPress: function () {
                return t.onOpenMapViewGotoPage();
              },
              visible: true,
              shouldShowBottomLine: false,
            },
            b = {
              title: module510.localization_strings_Setting_index_23,
              funcId: 'setting_page_remote',
              onPress: this.openRemoteControlPage.bind(this),
              visible: module393.apiLevel >= 10003 || module393.isMiApp,
              shouldShowBottomLine: false,
            },
            y = {
              title: module510.localization_strings_Setting_History_index_2,
              funcId: 'setting_page_clean_history',
              eventName: module387.LogEventMap.CleanRecordListPage,
              onPress: function () {
                return t.openHistoryPage();
              },
              visible: true,
              shouldShowBottomLine: false,
            },
            C = {
              title: module510.localization_strings_Setting_index_9,
              funcId: 'setting_page_supplies',
              eventName: module387.LogEventMap.SuppliesListPage,
              onPress: this.openSuppliesPage.bind(this),
              shouldShowRedPoint: module381.RobotStatusManager.sharedManager().suppliesShouldShowRedDot,
              visible: true,
              shouldShowBottomLine: false,
            },
            R = {
              title: module510.localization_strings_Setting_Guide_index_8,
              funcId: 'setting_page_product',
              onPress: function () {
                return t.onOpenProductInfoPage();
              },
              shouldShowRedPoint: this.state.timeZoneShouldShowRedDot,
              visible: true,
              shouldShowBottomLine: false,
            },
            T = {
              title: module510.localization_strings_Setting_Guide_GuideDetailPage_0,
              funcId: 'setting_page_guide',
              onPress: function () {
                return t.openGuidePage();
              },
              visible: true,
              shouldShowBottomLine: false,
            },
            I = {
              title: module510.wifi_debug_mode_title1,
              funcId: 'setting_page_WiFi',
              onPress: function () {
                return t.openWiFiDebugPage();
              },
              visible: module381.RobotStatusManager.sharedManager().wifiDebug,
              shouldShowBottomLine: false,
            },
            B = {
              title: module510.localization_strings_Setting_General_index_3,
              funcId: 'setting_page_device_upgrade',
              onPress: function () {
                return t.openDeviceUpgradePage();
              },
              shouldShowRedPoint: module381.RobotStatusManager.sharedManager().firmwareShouldShowRedDot,
              visible: module393.isSupportFirmwareVersion() && !module391.default.isShareUser(),
              shouldShowBottomLine: false,
            },
            N = {
              title: module510.setting_page_device_share,
              funcId: 'setting_page_device_share',
              onPress: function () {
                return module393.openDeviceSharePage();
              },
              visible: module393.canOpenDeviceSharePage() && !module391.default.isShareUser(),
              shouldShowBottomLine: false,
            },
            V = {
              title: module1491.ObaInfoString.Title,
              funcId: 'setting_page_oba_info',
              onPress: function () {
                return t.openObaPage();
              },
              visible: module390.default.isObaAccount(),
              shouldShowBottomLine: false,
            },
            z = [
              {
                data: [o, v, n, l, u, h, c, p],
              },
              {
                data: [f, _, s],
              },
              {
                data: [w, b],
              },
              {
                data: [y, C, T, R],
              },
              {
                data: [I, B, N, V],
              },
            ],
            A = [
              {
                sectionTitle: module510.setting_section_title_clean_management,
                funcId: 'setting_page_section_title1',
                visible: true,
              },
              o,
              v,
              n,
              l,
              u,
              h,
              c,
              p,
              {
                sectionTitle: module510.setting_section_title1,
                funcId: 'setting_page_section_title2',
                visible: true,
              },
              f,
              s,
              {
                sectionTitle: module510.setting_section_title2,
                funcId: 'setting_page_section_title3',
                visible: true,
              },
              w,
              b,
              {
                sectionTitle: module510.setting_section_title_more_info,
                funcId: 'setting_page_section_title4',
                visible: true,
              },
              y,
              C,
              R,
              I,
              V,
            ];
          if (!module393.isMiApp) for (var U = 0; U < z.length; U++) for (var F = z[U].data, G = 0; G < F.length; G++) F[G].visible || (F.splice(G, 1), (G -= 1));
          return module393.isMiApp ? A : z;
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.context.theme,
            l =
              !module391.default.isShareUser() &&
              React.default.createElement(module385.PureButton, {
                funcId: 'setting_delete_device',
                style: [
                  A.deleteButton,
                  {
                    backgroundColor: n.setting.delBackgroundColor,
                  },
                ],
                title: module510.localization_strings_Setting_General_index_4,
                textColor: 'red',
                fontSize: 15,
                onPress: function () {
                  return regeneratorRuntime.default.async(
                    function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            t.next = 2;
                            return regeneratorRuntime.default.awrap(module393.postPrivacyAgreementStatus(module381.RSM.serverCode, 1));

                          case 2:
                            module393.openDeleteDevice();

                          case 3:
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
              });

          if (module393.isMiApp) {
            var u = module393.SETTING_KEYS,
              c = u.first_options,
              p = [c.SHARE, c.IFTTT, c.FIRMWARE_UPGRADE],
              h = React.default.createElement(module393.CommonSetting, {
                navigation: this.props.navigation,
                firstOptions: p,
                showDot: this.state.shouldShowRedPointForFirmwareUpdate ? [c.FIRMWARE_UPGRADE] : [],
                commonSettingStyle: {
                  titleStyle: {
                    fontSize: 11.5,
                    color: n.setting.topTextColor,
                    paddingTop: 30,
                    paddingBottom: 15,
                  },
                  itemStyle: {
                    titleStyle: {
                      fontSize: 16,
                      color: n.settingListItem.titleColor,
                      fontWeight: 'bold',
                      left: 0,
                    },
                    containerStyle: {
                      paddingLeft: 25,
                    },
                  },
                  titleContainer: {
                    paddingLeft: 27,
                  },
                },
              }),
              w = React.default.createElement(module13.View, {
                style: [
                  A.bottomLine,
                  {
                    top: 0,
                    backgroundColor: n.settingListItem.borderColor,
                  },
                ],
              }),
              b = this.getMenuDatas().map(function (o, l) {
                return o.visible
                  ? o.title
                    ? React.default.createElement(
                        module385.SettingListItemView,
                        module22.default({}, o, {
                          key: l,
                          paddingLeft: 25,
                          paddingRight: 25,
                          iconSize: 18,
                          style: {
                            backgroundColor: n.settingListItem.miSetBackgroundColor,
                          },
                          titleStyle: {
                            fontWeight: 'bold',
                          },
                        })
                      )
                    : o.sectionTitle
                    ? React.default.createElement(
                        module13.View,
                        {
                          style: [
                            A.sectionMijia,
                            {
                              marginTop: 0,
                              paddingTop: o.sectionTitle.length > 0 ? 25 : 5,
                              paddingBottom: o.sectionTitle.length > 0 ? 10 : 5,
                              backgroundColor: t.context.theme.settingListItem.miSetBackgroundColor,
                            },
                          ],
                          key: l,
                        },
                        l > 0 && w,
                        o.sectionTitle.length > 0 &&
                          React.default.createElement(
                            module13.Text,
                            {
                              style: [
                                A.sectionTitle,
                                {
                                  color: n.setting.topTextColor,
                                },
                              ],
                            },
                            o.sectionTitle
                          )
                      )
                    : React.default.createElement(module13.View, {
                        style: A.section,
                        key: l,
                      })
                  : React.default.createElement(module13.View, {
                      key: l,
                    });
              });
            return React.default.createElement(
              module13.View,
              {
                style: [
                  A.containterView,
                  {
                    backgroundColor: n.settingBackgroundColor,
                  },
                ],
              },
              React.default.createElement(
                module13.ScrollView,
                {
                  style: A.containter,
                  showsVerticalScrollIndicator: false,
                },
                React.default.createElement(
                  module13.View,
                  {
                    style: {},
                  },
                  b,
                  React.default.createElement(module13.View, {
                    style: [
                      A.bottomLine,
                      {
                        bottom: 0,
                        backgroundColor: n.settingListItem.borderColor,
                      },
                    ],
                  })
                ),
                h
              ),
              React.default.createElement(module1963.default, {
                ref: function (n) {
                  t.randomCodeView = n;
                },
              })
            );
          }

          return React.default.createElement(
            module13.View,
            {
              style: [
                A.containterView,
                {
                  backgroundColor: n.settingBackgroundColor,
                },
              ],
            },
            React.default.createElement(module13.SectionList, {
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
                return l;
              },
              stickySectionHeadersEnabled: false,
            }),
            React.default.createElement(module1963.default, {
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
            title: module510.setting_robot_setting,
          });
        },
      },
      {
        key: 'openTimerSettingPage',
        value: function () {
          this.props.navigation.navigate('TimerPage', {
            title: module510.localization_strings_Setting_index_3,
          });
        },
      },
      {
        key: 'openSoundPackagePage',
        value: function () {
          this.props.navigation.navigate('SoundPackagePage', {
            title: module510.soundpackage_volume_adjust_title,
          });
        },
      },
      {
        key: 'openHistoryPage',
        value: function () {
          this.props.navigation.navigate('HistoryPage', {
            title: module510.localization_strings_Setting_History_index_2,
          });
        },
      },
      {
        key: 'openSuppliesPage',
        value: function () {
          this.props.navigation.navigate('SuppliesPage', {
            parent: this,
            title: module510.localization_strings_Setting_index_9,
          });
        },
      },
      {
        key: 'openGuidePage',
        value: function () {
          if ('cn' == module391.default.getAppLanguage()) {
            var t = {
              modelId: module393.deviceModel.split('.').pop(),
              isDark: globals.app.state.theme == module520.Themes.dark,
            };
            this.props.navigation.navigate('WebViewPage', {
              title: module510.localization_strings_Setting_Guide_GuideDetailPage_0,
              url: z('https://www.roborock.com/supportInfo', t),
              isNotMarginBottom: true,
            });
          } else module13.Linking.openURL('https://support.roborock.com/hc/en-us');
        },
      },
      {
        key: 'openObaPage',
        value: function () {
          this.props.navigation.navigate('ObaInfoPage', {
            title: module1491.ObaInfoString.Title,
          });
        },
      },
      {
        key: 'openNetinfoPage',
        value: function () {
          this.props.navigation.navigate('NetInfoPage', {
            title: module510.localization_strings_Setting_General_index_5,
          });
        },
      },
      {
        key: 'openCleanModePage',
        value: function () {
          this.props.navigation.navigate('CleanModePage', {
            title: module510.localization_strings_Setting_CleanModePage_5,
            parent: this,
          });
        },
      },
      {
        key: 'openIntelligentScene',
        value: function () {
          module393.openIftttAutoPage();
        },
      },
      {
        key: 'openRemoteControlPage',
        value: function () {
          if (module381.RSM.voiceChat) globals.showToast(module510.voice_chat_title2);
          else {
            console.log('\u6253\u5f00 \u8fdc\u7a0b\u9065\u63a7\u754c\u9762-----');
            if (module393.isMiApp || module390.default.isRemoteSupported()) this.props.navigation.navigate('RemoteControlPageNew', {});
            else globals.showToast(module510.localization_strings_Setting_RemoteControlPage_54);
          }
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
        key: 'onOpenMapViewGotoPage',
        value: function () {
          if (module381.RSM.voiceChat) globals.showToast(module510.voice_chat_title2);
          else
            this.props.navigation.navigate('MapViewGotoPage', {
              title: module510.rubys_main_button_text_goto,
            });
        },
      },
      {
        key: 'openNetInfoPage',
        value: function () {
          var t = this;
          module393.getDevicePropertyFromMemCache(['ssid', 'localip', 'mac'], function (n) {
            if (n.ssid || n.localip || n.mac)
              t.props.navigation.navigate('NetInfoPage', {
                ssid: n.ssid || Unknown,
                localip: n.localip || Unknown,
                mac: n.mac || Unknown,
              });
            else alert(module510.localization_strings_Setting_CleanModePage_3);
          });
        },
      },
      {
        key: 'onOpenProductInfoPage',
        value: function () {
          this.props.navigation.navigate('ProductInformationPage', {
            title: module510.localization_strings_Setting_Guide_index_8,
          });
        },
      },
      {
        key: 'openDeviceUpgradePage',
        value: function () {
          module393.openDeviceUpgradePage();
          this.setState({
            shouldShowRedPointForFirmwareUpdate: false,
          });
          module381.RobotStatusManager.sharedManager().firmwareShouldShowRedDot = false;
          module13.DeviceEventEmitter.emit(module420.NotificationKeys.RedDotDidChange, {
            name: 'firmware_update',
            value: false,
          });
        },
      },
      {
        key: 'openFloorMapPage',
        value: function () {
          this.props.navigation.navigate('MultiFloorPage', {
            title: module510.map_edit_title,
          });
        },
      },
      {
        key: 'openCarpetCleanModePage',
        value: function () {
          this.props.navigation.navigate('CarpetCleanModeSetting', {
            parent: this,
            title: module510.setting_timezone_title,
          });
        },
      },
      {
        key: 'openStructureLightPage',
        value: function () {
          this.props.navigation.navigate('StructureLightSetting', {});
        },
      },
      {
        key: 'openWiFiDebugPage',
        value: function () {
          this.props.navigation.navigate('WiFiDebugPage', {
            title: module510.wifi_debug_mode_title1,
            refrence: module1655.default.WiFiPrivacy(),
          });
        },
      },
      {
        key: 'openDustCollectionModePage',
        value: function () {
          this.props.navigation.navigate('DustCollectionModeSetting', {
            title: module510.dust_collection_setting_title,
            parent: this,
          });
        },
      },
      {
        key: 'openWashTowelPage',
        value: function () {
          this.props.navigation.navigate('WashTowelSettingNew', {
            parent: this,
          });
        },
      },
      {
        key: 'openAirDryPage',
        value: function () {
          this.props.navigation.navigate('SettingAirDryPage', {
            title: module510.robot_setting_air_dry_title,
          });
        },
      },
      {
        key: 'openSelfCleaningSettingPage',
        value: function () {
          this.props.navigation.navigate('DockSettingPage', {
            title: module510.robot_setting_self_cleaning_title,
          });
        },
      },
    ]);
    return V;
  })(React.Component);

function z(t, n) {
  var o,
    s = '';
  if (t.includes('?')) for (o in n) s += '&' + o + '=' + n[o];
  else for (o in ((s += '?'), n)) s += '&' + o + '=' + n[o];
  return t + s;
}

exports.default = V;
V.contextType = module1200.AppConfigContext;
var A = module13.StyleSheet.create({
  containterView: {
    flex: 1,
  },
  containter: {
    flex: 1,
    marginTop: module1344.NavigationBarHeight,
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
    paddingVertical: module393.isMiApp ? 5 : 0,
    fontSize: module393.isMiApp ? 11.5 : 13,
    marginLeft: module393.isMiApp ? 7 : 0,
  },
  deleteButton: {
    alignSelf: 'stretch',
    height: 60,
    marginBottom: 20,
    marginTop: 24,
    borderRadius: 8,
  },
  bottomLine: {
    position: 'absolute',
    marginLeft: 20,
    width: module13.Dimensions.get('window').width - 40,
    height: 0.8,
  },
});
