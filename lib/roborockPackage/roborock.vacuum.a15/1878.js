require('./1880');

require('./394');

var regeneratorRuntime = require('regenerator-runtime'),
  module22 = require('./22'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module385 = require('./385'),
  module391 = require('./391'),
  module381 = require('./381'),
  module419 = require('./419'),
  module1573 = require('./1573'),
  module387 = require('./387'),
  module414 = require('./414'),
  module1879 = require('./1879'),
  module390 = require('./390'),
  module1409 = require('./1409'),
  module1121 = require('./1121'),
  module423 = require('./423'),
  module515 = require('./515'),
  module417 = require('./417');

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

var module505 = require('./505').strings,
  module393 = require('./393'),
  module1265 = require('./1265'),
  V = (function (t) {
    module7.default(V, t);

    var n = V,
      module1121 = B(),
      N = function () {
        var t,
          o = module11.default(n);

        if (module1121) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, s);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function V(t) {
      var n;
      module4.default(this, V);

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
        return React.default.createElement(module12.View, {
          style: {
            height: 15,
            backgroundColor: n.context.theme.settingBackgroundColor,
          },
        });
      };

      n.openGroundCleanModePage = function () {
        n.props.navigation.navigate('GroundCleanModePage', {
          title: module505.ground_material_clean_setting_title,
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

    module5.default(V, [
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
            this.deviceNameChangedListener = module12.DeviceEventEmitter.addListener(module393.deviceNameChangedEvent, function (n) {
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
                      title: module505.localization_strings_Setting_index_21,
                      onPressTitle: this.onPressTitle.bind(this),
                    });
                    this.redPointListener = module12.DeviceEventEmitter.addListener(module419.NotificationKeys.RedDotDidChange, function (n) {
                      t.forceUpdate();
                    });
                    module417.Log.log(module417.LogTypes.KeyEvent, 'enter setting page, lang: ' + globals.AppLang + ',isRTL:' + globals.isRTL);

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
          module414.MapManager.sharedManager().isStopedBySettingPage = false;
          module414.MapManager.sharedManager().start();
          if (this.props.navigation.state.params.enabledTitleBarUpdate) this.props.navigation.state.params.enabledTitleBarUpdate();
        },
      },
      {
        key: 'getThreeDimensionTitle',
        value: function () {
          return module423.DMM.isTanosV
            ? module505.camera_setting_rrai_title
            : module423.DMM.isTanosSPlus
            ? module505.localization_strings_Setting_index_24
            : module505.camera_setting_detail2;
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
              title: module505.map_edit_title,
              funcId: 'setting_page_map_edit',
              onPress: this.openFloorMapPage.bind(this),
              shouldShowBottomLine: false,
              visible: true,
            },
            s = {
              title: module505.setting_robot_setting,
              funcId: 'setting_page_robot_setting',
              onPress: this.openRobotSettingPage.bind(this),
              visible: true,
              shouldShowBottomLine: false,
            },
            l = {
              title: module505.carpet_clean_mode_setting_title,
              funcId: 'robot_setting_page_carpet_clean_mode',
              onPress: this.openCarpetCleanModePage.bind(this),
              visible: module390.default.isCarpetSupported() && !module423.DMM.isGarnet,
              shouldShowBottomLine: false,
            },
            u = {
              title: module505.ground_material_clean_setting_title,
              funcId: 'robot_setting_page_ground_clean_mode',
              onPress: this.openGroundCleanModePage,
              visible: module390.default.isSupportFloorDirection(),
              shouldShowBottomLine: false,
            },
            c = {
              title: module505.dust_collection_setting_title,
              funcId: 'robot_setting_page_dust_collection_mode',
              onPress: this.openDustCollectionModePage.bind(this),
              visible: module381.RSM.isO1Dock() || module381.RSM.isOCDock() || 1 == module381.RSM.lastDockType,
              shouldShowBottomLine: false,
            },
            p = {
              title: module505.wash_towel_title,
              funcId: 'robot_setting_page_wash_towel_mode',
              onPress: this.openWashTowelPage.bind(this),
              visible: module381.RSM.isO2Dock() || 2 == module381.RSM.lastDockType,
              shouldShowBottomLine: false,
            },
            h = {
              title: module505.robot_setting_self_cleaning_title,
              funcId: 'robot_setting_page_self_cleaning',
              onPress: this.openSelfCleaningSettingPage.bind(this),
              visible: module381.RSM.isCollectWashDock() || module381.RSM.isCollectWashDryDock(),
              shouldShowBottomLine: false,
            },
            _ = {
              title: module505.setting_realtime_monitor_switch_title,
              isDetailCenter: false,
              rightCenter: true,
              visible:
                module390.default.isVideoMonitorSupported() &&
                !module391.default.isShareUser() &&
                !module393.isMiApp &&
                (module423.DMM.isTanosV || module423.DMM.isTopazSV || module423.DMM.isTanosSV),
              funcId: 'camera_setting_real_time_monitor',
              onPress: function () {
                return t.props.navigation.navigate('CameraSettingDetail');
              },
              shouldShowBottomLine: false,
            },
            f = {
              title: module505.soundpackage_volume_adjust_title,
              funcId: 'setting_page_soundpackage_volume',
              onPress: function () {
                return t.openSoundPackagePage();
              },
              shouldShowRedPoint: this.state.soundPackageShouldShowRedDot,
              visible: true,
              shouldShowBottomLine: false,
            },
            v = {
              title: module505.localization_strings_Setting_index_3,
              funcId: 'setting_page_timer',
              onPress: function () {
                return t.openTimerSettingPage();
              },
              visible: !(module391.default.isShareUser() && 1 == module381.RobotStatusManager.sharedManager().FCCState),
              shouldShowBottomLine: false,
            },
            w = {
              title: module505.rubys_main_button_text_goto,
              funcId: 'setting_page_goto',
              onPress: function () {
                return t.onOpenMapViewGotoPage();
              },
              visible: true,
              shouldShowBottomLine: false,
            },
            b = {
              title: module505.localization_strings_Setting_index_23,
              funcId: 'setting_page_remote',
              onPress: this.openRemoteControlPage.bind(this),
              visible: module393.apiLevel >= 10003 || module393.isMiApp,
              shouldShowBottomLine: false,
            },
            M = {
              title: module505.localization_strings_Setting_History_index_2,
              funcId: 'setting_page_clean_history',
              eventName: module387.LogEventMap.CleanRecordListPage,
              onPress: function () {
                return t.openHistoryPage();
              },
              visible: true,
              shouldShowBottomLine: false,
            },
            C = {
              title: module505.localization_strings_Setting_index_9,
              funcId: 'setting_page_supplies',
              eventName: module387.LogEventMap.SuppliesListPage,
              onPress: this.openSuppliesPage.bind(this),
              shouldShowRedPoint: module381.RobotStatusManager.sharedManager().suppliesShouldShowRedDot,
              visible: true,
              shouldShowBottomLine: false,
            },
            D = {
              title: module505.localization_strings_Setting_Guide_index_8,
              funcId: 'setting_page_product',
              onPress: function () {
                return t.onOpenProductInfoPage();
              },
              shouldShowRedPoint: this.state.timeZoneShouldShowRedDot,
              visible: true,
              shouldShowBottomLine: false,
            },
            T = {
              title: module505.localization_strings_Setting_Guide_GuideDetailPage_0,
              funcId: 'setting_page_guide',
              onPress: function () {
                return t.openGuidePage();
              },
              visible: true,
              shouldShowBottomLine: false,
            },
            I = {
              title: module505.wifi_debug_mode_title1,
              funcId: 'setting_page_WiFi',
              onPress: function () {
                return t.openWiFiDebugPage();
              },
              visible: module381.RobotStatusManager.sharedManager().wifiDebug,
              shouldShowBottomLine: false,
            },
            B = {
              title: module505.localization_strings_Setting_General_index_3,
              funcId: 'setting_page_device_upgrade',
              onPress: function () {
                return t.openDeviceUpgradePage();
              },
              shouldShowRedPoint: module381.RobotStatusManager.sharedManager().firmwareShouldShowRedDot,
              visible: module393.isSupportFirmwareVersion() && !module391.default.isShareUser(),
              shouldShowBottomLine: false,
            },
            N = {
              title: module505.setting_page_device_share,
              funcId: 'setting_page_device_share',
              onPress: function () {
                return module393.openDeviceSharePage();
              },
              visible: module393.canOpenDeviceSharePage() && !module391.default.isShareUser(),
              shouldShowBottomLine: false,
            },
            V = {
              title: module1409.ObaInfoString.Title,
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
                data: [M, C, T, D],
              },
              {
                data: [I, B, N, V],
              },
            ],
            A = [
              {
                sectionTitle: module505.setting_section_title_clean_management,
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
                sectionTitle: module505.setting_section_title1,
                funcId: 'setting_page_section_title2',
                visible: true,
              },
              f,
              s,
              {
                sectionTitle: module505.setting_section_title2,
                funcId: 'setting_page_section_title3',
                visible: true,
              },
              w,
              b,
              {
                sectionTitle: module505.setting_section_title_more_info,
                funcId: 'setting_page_section_title4',
                visible: true,
              },
              M,
              C,
              D,
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
            o =
              !module391.default.isShareUser() &&
              React.default.createElement(module385.PureButton, {
                funcId: 'setting_delete_device',
                style: [
                  A.deleteButton,
                  {
                    backgroundColor: n.setting.delBackgroundColor,
                  },
                ],
                title: module505.localization_strings_Setting_General_index_4,
                textColor: 'red',
                fontSize: 15,
                onPress: function () {
                  module393.openDeleteDevice();
                },
              });

          if (module393.isMiApp) {
            var l = module393.SETTING_KEYS,
              u = l.first_options,
              c = [u.SHARE, u.IFTTT, u.FIRMWARE_UPGRADE],
              p = React.default.createElement(module393.CommonSetting, {
                navigation: this.props.navigation,
                firstOptions: c,
                showDot: this.state.shouldShowRedPointForFirmwareUpdate ? [u.FIRMWARE_UPGRADE] : [],
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
              h = React.default.createElement(module12.View, {
                style: [
                  A.bottomLine,
                  {
                    top: 0,
                    backgroundColor: n.settingListItem.borderColor,
                  },
                ],
              }),
              P = this.getMenuDatas().map(function (o, l) {
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
                        module12.View,
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
                        l > 0 && h,
                        o.sectionTitle.length > 0 &&
                          React.default.createElement(
                            module12.Text,
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
                    : React.default.createElement(module12.View, {
                        style: A.section,
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
                  A.containterView,
                  {
                    backgroundColor: n.settingBackgroundColor,
                  },
                ],
              },
              React.default.createElement(
                module12.ScrollView,
                {
                  style: A.containter,
                  showsVerticalScrollIndicator: false,
                },
                React.default.createElement(
                  module12.View,
                  {
                    style: {},
                  },
                  P,
                  React.default.createElement(module12.View, {
                    style: [
                      A.bottomLine,
                      {
                        bottom: 0,
                        backgroundColor: n.settingListItem.borderColor,
                      },
                    ],
                  })
                ),
                p
              ),
              React.default.createElement(module1879.default, {
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
                A.containterView,
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
                return o;
              },
              stickySectionHeadersEnabled: false,
            }),
            React.default.createElement(module1879.default, {
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
            title: module505.setting_robot_setting,
          });
        },
      },
      {
        key: 'openTimerSettingPage',
        value: function () {
          this.props.navigation.navigate('TimerPage', {
            title: module505.localization_strings_Setting_index_3,
          });
        },
      },
      {
        key: 'openSoundPackagePage',
        value: function () {
          this.props.navigation.navigate('SoundPackagePage', {
            title: module505.soundpackage_volume_adjust_title,
          });
        },
      },
      {
        key: 'openHistoryPage',
        value: function () {
          this.props.navigation.navigate('HistoryPage', {
            title: module505.localization_strings_Setting_History_index_2,
          });
        },
      },
      {
        key: 'openSuppliesPage',
        value: function () {
          this.props.navigation.navigate('SuppliesPage', {
            parent: this,
            title: module505.localization_strings_Setting_index_9,
          });
        },
      },
      {
        key: 'openGuidePage',
        value: function () {
          if ('cn' == module391.default.getAppLanguage()) {
            var t = {
              modelId: module423.DMM.currentSeries,
              isDark: globals.app.state.theme == module515.Themes.dark,
            };
            this.props.navigation.navigate('WebViewPage', {
              title: module505.localization_strings_Setting_Guide_GuideDetailPage_0,
              url: z('https://www.roborock.com/supportInfo', t),
              isNotMarginBottom: true,
            });
          } else module12.Linking.openURL('https://support.roborock.com/hc/en-us');
        },
      },
      {
        key: 'openObaPage',
        value: function () {
          this.props.navigation.navigate('ObaInfoPage', {
            title: module1409.ObaInfoString.Title,
          });
        },
      },
      {
        key: 'openNetinfoPage',
        value: function () {
          this.props.navigation.navigate('NetInfoPage', {
            title: module505.localization_strings_Setting_General_index_5,
          });
        },
      },
      {
        key: 'openCleanModePage',
        value: function () {
          this.props.navigation.navigate('CleanModePage', {
            title: module505.localization_strings_Setting_CleanModePage_5,
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
          if (module381.RSM.voiceChat) globals.showToast(module505.voice_chat_title2);
          else {
            console.log('\u6253\u5f00 \u8fdc\u7a0b\u9065\u63a7\u754c\u9762-----');
            if (module393.isMiApp || module390.default.isRemoteSupported()) this.props.navigation.navigate('RemoteControlPageNew', {});
            else globals.showToast(module505.localization_strings_Setting_RemoteControlPage_54);
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
          if (module381.RSM.voiceChat) globals.showToast(module505.voice_chat_title2);
          else
            this.props.navigation.navigate('MapViewGotoPage', {
              title: module505.rubys_main_button_text_goto,
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
            else alert(module505.localization_strings_Setting_CleanModePage_3);
          });
        },
      },
      {
        key: 'onOpenProductInfoPage',
        value: function () {
          this.props.navigation.navigate('ProductInformationPage', {
            title: module505.localization_strings_Setting_Guide_index_8,
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
          module12.DeviceEventEmitter.emit(module419.NotificationKeys.RedDotDidChange, {
            name: 'firmware_update',
            value: false,
          });
        },
      },
      {
        key: 'openFloorMapPage',
        value: function () {
          this.props.navigation.navigate('MultiFloorPage', {
            title: module505.map_edit_title,
          });
        },
      },
      {
        key: 'openCarpetCleanModePage',
        value: function () {
          this.props.navigation.navigate('CarpetCleanModeSetting', {
            parent: this,
            title: module505.setting_timezone_title,
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
            title: module505.wifi_debug_mode_title1,
            refrence: module1573.default.WiFiPrivacy(),
          });
        },
      },
      {
        key: 'openDustCollectionModePage',
        value: function () {
          this.props.navigation.navigate('DustCollectionModeSetting', {
            title: module505.dust_collection_setting_title,
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
            title: module505.robot_setting_air_dry_title,
          });
        },
      },
      {
        key: 'openSelfCleaningSettingPage',
        value: function () {
          this.props.navigation.navigate('SelfCleaningSettingPage', {
            title: module505.robot_setting_self_cleaning_title,
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
V.contextType = module1121.AppConfigContext;
var A = module12.StyleSheet.create({
  containterView: {
    flex: 1,
  },
  containter: {
    flex: 1,
    marginTop: module1265.NavigationBarHeight,
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
    width: module12.Dimensions.get('window').width - 40,
    height: 0.8,
  },
});
