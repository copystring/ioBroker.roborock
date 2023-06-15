var module50 = require('./50'),
  module22 = require('./22'),
  regeneratorRuntime = require('regenerator-runtime'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1796 = require('./1796'),
  _ = require('./1411'),
  module515 = require('./515'),
  module418 = require('./418'),
  module1329 = require('./1329'),
  module381 = require('./381'),
  module1330 = require('./1330'),
  module1410 = require('./1410'),
  module385 = require('./385'),
  module1802 = require('./1802'),
  module414 = require('./414'),
  module391 = require('./391'),
  module1493 = require('./1493'),
  module390 = require('./390'),
  module422 = require('./422'),
  module382 = require('./382'),
  module1840 = require('./1840'),
  module1212 = require('./1212'),
  module1797 = require('./1797'),
  module1327 = require('./1327'),
  module1328 = require('./1328'),
  module1397 = require('./1397'),
  module394 = require('./394'),
  module1326 = require('./1326');

function W(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var l = Object.getOwnPropertySymbols(t);
    if (n)
      l = l.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, l);
  }

  return o;
}

function J(t) {
  for (var o = 1; o < arguments.length; o++) {
    var l = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      W(Object(l), true).forEach(function (o) {
        module50.default(t, o, l[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(l));
    else
      W(Object(l)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(l, n));
      });
  }

  return t;
}

function A() {
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

var module393 = require('./393'),
  module500 = require('./500').strings,
  H = {
    GlobalClean: 'GlobalClean',
    Segment: 'Segment',
    Zone: 'Zone',
  };

exports.SmartSceneMode = H;

var K = (function (t) {
  module7.default(K, t);

  var module50 = K,
    module515 = A(),
    W = function () {
      var t,
        o = module11.default(module50);

      if (module515) {
        var l = module11.default(this).constructor;
        t = Reflect.construct(o, arguments, l);
      } else t = o.apply(this, arguments);

      return module9.default(this, t);
    };

  function K(t) {
    var n, o;
    module4.default(this, K);

    (o = W.call(this, t)).checkShowFurnitureModel = function () {
      var t;
      return regeneratorRuntime.default.async(
        function (n) {
          for (;;)
            switch ((n.prev = n.next)) {
              case 0:
                n.next = 2;
                return regeneratorRuntime.default.awrap(module418.GetStorageKey(module418.StorageKeys.ShowFurnitureModel));

              case 2:
                t = n.sent;
                o.setState({
                  showFurnitureModel: !('on' != t),
                });
                module394.MC.showAllFurnitureModel = !('on' != t);

              case 5:
              case 'end':
                return n.stop();
            }
        },
        null,
        null,
        null,
        Promise
      );
    };

    o.selectedBlockCount = 0;
    o.selectedRectCount = 0;
    o.zidList = [];
    o.initialSelectedCleanSegments = [];
    o.state = {
      mode: H.Zone,
      shouldShowMap: true,
      noMap: {
        tip: '',
        showGuide: false,
      },
      cleanCount: 1,
      map: {
        selectedBlockCount: 0,
        selectedRectCount: 0,
      },
      bottomMenu: {
        isHidden: false,
        tip: '',
      },
      confirmButton: {
        isEnabled: false,
      },
      cleanMopMode: 0,
      cleanMode: 102,
      waterMode: 202,
      mopMode: module422.DMM.isGarnet ? 1 : 300,
      initializedInfo: false,
      hasMapList: (null != (n = module1329.MM.maps) ? n : []).length > 0,
    };
    return o;
  }

  module5.default(K, [
    {
      key: 'componentDidMount',
      value: function () {
        this.configNavigationBar();
        this.initMapView();
        this.initParams();
        this.registListeners();
        module1329.MM.getMultiMaps();
      },
    },
    {
      key: 'componentWillUnmount',
      value: function () {
        this.removeListeners();
      },
    },
    {
      key: 'render',
      value: function () {
        var t,
          n,
          l,
          s,
          u,
          c,
          h,
          p = this,
          v = React.default.createElement(_.default, {
            tip: this.state.noMap.tip,
            shouldShowGuideButton: this.state.noMap.showGuide,
          }),
          w = {
            title: module500.rubys_main_button_text_add,
            enabled: !module381.RSM.isCleaning() && !module381.RSM.isCleanTaskShouldResume(),
            image: this.theme.homeSidebar.addZoneIcon,
            funcId: 'smart_add_zone',
            onPress: function () {
              p.onPressAddZone();
            },
          },
          E =
            (null != (t = null == (n = null != (l = null == (s = this.mapSelectView) ? undefined : null == s.getItems ? undefined : s.getItems()) ? l : []) ? undefined : n.length)
              ? t
              : 0) > 0,
          R = React.default.createElement(
            module12.View,
            {
              style: [
                q.container,
                {
                  alignSelf: 'stretch',
                  marginTop: 15,
                },
                {
                  backgroundColor: this.theme.timerSetting.segmentSettingViewBackgroundColor,
                },
              ],
              pointerEvents: 'auto',
            },
            React.default.createElement(module385.SettingListItemView, {
              funcId: 'timer_setting_select_area',
              title: module500.multi_map_timer_select_map_title,
              detail:
                module1397.FloorMapPageUtils.getRealName(
                  null !=
                    (u =
                      null ==
                      (c = module1329.MM.maps.find(function (t) {
                        return t.id == module381.RSM.currentMapId;
                      }))
                        ? undefined
                        : c.name)
                    ? u
                    : ''
                ) || ' ',
              onPress: function () {
                return p.mapSelectView.show();
              },
              shouldShowTopLongLine: true,
              shouldShowBottomLongLine: !this.state.shouldShowBottom,
              shouldShowRightArrow: E,
              enabled: E,
            }),
            React.default.createElement(
              module12.View,
              {
                style: {
                  height: 400,
                  justifyContent: 'center',
                },
              },
              this.state.shouldShowMap
                ? React.default.createElement(
                    React.default.Fragment,
                    null,
                    React.default.createElement(module1330.MapView, {
                      top: 10,
                      bottom: 10,
                      left: 30,
                      right: 30,
                      style: {
                        flex: 1,
                        justifyContent: 'center',
                        alignSelf: 'stretch',
                        backgroundColor: 'transparent',
                      },
                      ref: function (t) {
                        return (p.mapView = t);
                      },
                      showAllBlocksBubble: true,
                      selectedBlocksDidChange: function (t) {
                        p.selectedBlocksDidChange(t);
                      },
                      selectedRectDidChange: function (t) {
                        p.selectedRectDidChange(t);
                      },
                      showFurnitureIcon: !this.state.showFurnitureModel,
                      style: {
                        flex: 1,
                        justifyContent: 'center',
                        alignSelf: 'stretch',
                        backgroundColor: 'transparent',
                      },
                    }),
                    React.default.createElement(
                      module12.Text,
                      {
                        style: [
                          q.bottomTip,
                          {
                            top: 15,
                            color: this.theme.timerSetting.segmentSettingViewTextColor,
                          },
                        ],
                      },
                      this.state.bottomMenu.tip
                    )
                  )
                : v,
              this.state.mode == H.Zone &&
                this.state.shouldShowMap &&
                React.default.createElement(
                  module385.TopImageButton,
                  module22.default(
                    {
                      style: {
                        position: 'absolute',
                        left: 10,
                        bottom: 80,
                      },
                    },
                    w,
                    {
                      imageWidth: 60,
                      imageHeight: 60,
                      fontSize: 11,
                      textTop: -5,
                      textColor: this.theme.homeSidebar.textColor,
                      maxTextWidth: 80,
                    }
                  )
                )
            )
          ),
          k = React.default.createElement(module385.SettingListItemView, {
            title: module500.smart_scene_clean_mode_setting_item_title,
            bottomDetail: this.getCleanModeDetailText(),
            onPress: function () {
              return p.onPressCustomMode();
            },
          }),
          T = React.default.createElement(module385.SettingListItemView, {
            title: module500.localization_strings_Setting_History_index_12,
            bottomDetail: this.state.cleanCount + ' ' + module500.dust_collection_life14,
            onPress: function () {
              return p.cleanCountActionSheetView.show();
            },
          }),
          z = React.default.createElement(module1796.default, {
            ref: function (t) {
              p.modalMapEditMenu = t;
            },
            contentBackgroundColor: 'transparent',
            parent: this,
            paddingBottom: 0,
            isBottomViewHidden: true,
            isGotoMyMapHidden: true,
            onClose: function () {
              var t;
              if (!(null == (t = p.modalMapEditMenu))) t.hide();
            },
            onPressFloor: function (t) {
              p.onPressFloor(t);
            },
            toastHandler: function (t) {
              p.modalMapEditMenu.showToast(t);
            },
            alertHandler: function (t, n, o) {
              p.modalMapEditMenu.alert(t, n, o);
            },
          }),
          N = React.default.createElement(module382.ModeSettingPanel, {
            ref: function (t) {
              p.customModeView = t;
            },
            didSetMode: function (t, n, o) {
              p.onCustomModePanelChange(t, n, o);
            },
            isSmartScene: true,
            shouldShowCustomSwitch: !module422.DMM.isGarnet,
            isTabZone: this.state.mode == H.Zone,
            onPressQuestion: function () {
              return p.onPressQuestionIcon();
            },
            onPressMore: function () {
              p.customModeView.hide();
              p.props.navigation.navigate('MopModeListPage', {
                title: module500.custom_mode_panel_more_mode_title,
              });
            },
          }),
          O = React.default.createElement(module1802.default, {
            ref: function (t) {
              p.newSwitchGuideView = t;
            },
            parent: this,
            bgImage: this.theme.guideImages.findCarpet,
            topTitle: module500.tanos_s_mop_mode_title,
            context: module500.tanos_s_mop_mode_info1,
            buttonInfo: [module500.localization_strings_Setting_RemoteControlPage_51],
            buttonFuncId: ['mop_mode_guide_ok'],
          }),
          G = React.default.createElement(module385.CancelableLoadingView, {
            loadingAccessibilityLabelKey: 'loading_view_loading',
            closeAccessibilityLabelKey: 'loading_view_loading_close',
            ref: function (t) {
              p.loadingView = t;
            },
            showButton: true,
          });
        console.log('TTTT: ' + ((null != (h = this.selectedCleanSegments) ? h : []).length > 0 ? this.selectedCleanSegments.join(',') : '0'));
        var F = React.default.createElement(module1840.default, {
            didSelectMap: function (t) {
              var n;
              if (!(null == (n = p.mapSelectView)))
                n.hide(function () {
                  var n;
                  p.loadEditingMap(null != (n = t.id) ? n : -1);
                });
            },
            ref: function (t) {
              return (p.mapSelectView = t);
            },
          }),
          W = React.default.createElement(module1212.default, {
            ref: function (t) {
              p.cleanCountActionSheetView = t;
            },
            title: module500.localization_strings_Setting_Timer_SettingPage_1,
            actions: ['1 ' + module500.dust_collection_life14, '2 ' + module500.dust_collection_life14, '3 ' + module500.dust_collection_life14],
            didSelectRow: function (t) {
              var n;
              if (!(null == (n = p.cleanCountActionSheetView))) n.hide();
              p.setState({
                cleanCount: t + 1,
              });
            },
            onPressCancel: function () {
              var t;
              if (!(null == (t = p.cleanCountActionSheetView) || null == t.hide)) t.hide();
            },
          }),
          J = this.state.mode != H.GlobalClean || module390.default.isSupportSmartGlobalCleanWithCustomMode();
        return this.state.initializedInfo
          ? React.default.createElement(
              module12.View,
              {
                style: {
                  flex: 1,
                  backgroundColor: this.theme.mapEdit.backgroundColor,
                },
              },
              React.default.createElement(
                module12.View,
                {
                  style: {
                    marginTop: 10,
                    backgroundColor: 'transparent',
                  },
                },
                J && k,
                this.state.mode != H.GlobalClean && T,
                R,
                z,
                N,
                O,
                G,
                F,
                W,
                React.default.createElement(module1802.default, {
                  ref: function (t) {
                    p.forceUpdateView = t;
                  },
                  isModal: true,
                  parent: this,
                  bgImage: this.context.theme.guideImages.newFirmware,
                  topTitle: module500.new_firmware_detected,
                  context: module500.new_firmware_detected1,
                  buttonInfo: [module500.localization_strings_Setting_RemoteControlPage_51],
                  buttonFuncId: ['force_update_firmware_view'],
                  onPressSingleButton: function () {
                    module393.openDeviceUpgradePage();
                  },
                })
              )
            )
          : React.default.createElement(
              module12.View,
              {
                style: {
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: this.theme.mapEdit.backgroundColor,
                },
              },
              React.default.createElement(module385.Spinner, null)
            );
      },
    },
    {
      key: 'onPressMenuConfirm',
      value: function () {
        for (
          var t,
            n,
            o,
            l,
            s,
            u,
            c,
            h,
            p,
            S,
            f,
            M = this,
            _ = {},
            v = (null != (t = this.selectedCleanSegments) ? t : []).map(function (t) {
              return {
                sid: t,
              };
            }),
            w = [],
            b =
              null !=
              (n =
                null == (o = this.mapView)
                  ? undefined
                  : null == (l = o.getZoneParams())
                  ? undefined
                  : l.map(function (t) {
                      return {
                        range: t,
                      };
                    }))
                ? n
                : [],
            y =
              this.isTidValid(this.tid) &&
              null !=
                (s = this.zidList.map(function (t) {
                  return {
                    zid: t,
                  };
                }))
                ? s
                : [],
            E = 0;
          E < b.length ** y.length;
          E++
        )
          w.push(J(J({}, b[E]), y[E]));

        switch (((this.tid = this.isTidValid(this.tid) ? this.tid : null), this.state.mode)) {
          case H.GlobalClean:
            if (!(null == (u = this.loadingView))) u.showWithText('');
            _ = {
              method: 'do_scenes_app_start',
              params: [
                {
                  source: 101,
                  fan_power: this.state.cleanMode || module381.RSM.fanPower,
                  water_box_mode: this.state.waterMode || module381.RSM.waterBoxMode,
                  mop_mode: this.state.mopMode || module381.RSM.mopMode,
                  mop_template_id: this.state.mopMode || module381.RSM.mopModeId,
                },
              ],
            };
            if (!(null == module393.setSmartSceneParams))
              module393
                .setSmartSceneParams(null == (c = globals.initialData) ? undefined : null == (h = c.initialPage) ? undefined : null == (p = h.data) ? undefined : p.mode, _)
                .then(function (t) {
                  console.log('SmartSceneDebug: -- setSmartSceneParams - Success: ' + JSON.stringify(t));
                })
                .catch(function (t) {
                  var n, o, l, s, u, c;
                  if (-10007 == (null == t ? undefined : null == (n = t.data) ? undefined : null == (o = n.error) ? undefined : o.code))
                    globals.showToast(module500.smart_scene_firmware_zone_reach_max_count);
                  else if (-10003 == (null == t ? undefined : null == (l = t.data) ? undefined : null == (s = l.error) ? undefined : s.code))
                    globals.showToast(module500.toast_frequently_operate);
                  else if (
                    'err.network' == (null == t ? undefined : null == (u = t.data) ? undefined : u.error) ||
                    'timeout' == (null == t ? undefined : null == (c = t.data) ? undefined : c.error)
                  )
                    globals.showToast(module500.localization_strings_Setting_History_index_1);
                  else globals.showToast(JSON.stringify(t));
                  console.log('SmartSceneDebug: -- setSmartSceneParams - Failed: ' + JSON.stringify(t));
                })
                .finally(function () {
                  var t;
                  if (!(null == (t = M.loadingView))) t.hide();
                });
            break;

          case H.Segment:
            if (!(null == (S = this.loadingView))) S.showWithText('');
            module414.default
              .setScenesSegment([
                {
                  tid: this.tid,
                  segs: v,
                },
              ])
              .then(function (t) {
                var n, o, l, s;
                console.log('SmartSceneDebug: -- setScenesSegment - Success: ' + JSON.stringify(t));
                var u = (null != (n = null == t ? undefined : t.result) ? n : []).map(function (t) {
                  t.fan_power = M.state.cleanMode || module381.RSM.fanPower;
                  t.water_box_mode = M.state.waterMode || module381.RSM.waterBoxMode;
                  t.mop_mode = M.state.mopMode || module381.RSM.mopMode;
                  t.mop_template_id = M.state.mopMode || module381.RSM.mopModeId;
                  t.repeat = M.state.cleanCount;
                  t.clean_order_mode = 0;
                  return t;
                });
                _ = {
                  method: 'do_scenes_segments',
                  params: {
                    data: u,
                    source: 101,
                  },
                };
                console.log('SmartSceneDebug: -- WillSend do_scenes_segments : ' + JSON.stringify(_));
                return null == module393.setSmartSceneParams
                  ? undefined
                  : module393.setSmartSceneParams(
                      null == (o = globals.initialData) ? undefined : null == (l = o.initialPage) ? undefined : null == (s = l.data) ? undefined : s.mode,
                      _
                    );
              })
              .then(function (t) {
                console.log('SmartSceneDebug: -- setSmartSceneParams - Success: ' + JSON.stringify(t));
              })
              .catch(function (t) {
                var n, o, l, s, u, c;
                if (-10007 == (null == t ? undefined : null == (n = t.data) ? undefined : null == (o = n.error) ? undefined : o.code))
                  globals.showToast(module500.smart_scene_firmware_zone_reach_max_count);
                else if (-10003 == (null == t ? undefined : null == (l = t.data) ? undefined : null == (s = l.error) ? undefined : s.code))
                  globals.showToast(module500.toast_frequently_operate);
                else if (
                  'err.network' == (null == t ? undefined : null == (u = t.data) ? undefined : u.error) ||
                  'timeout' == (null == t ? undefined : null == (c = t.data) ? undefined : c.error)
                )
                  globals.showToast(module500.localization_strings_Setting_History_index_1);
                else globals.showToast(JSON.stringify(t));
                console.log('SmartSceneDebug: -- setScenesSegment or setSmartSceneParams - Failed: ' + JSON.stringify(t));
              })
              .finally(function () {
                var t;
                if (!(null == (t = M.loadingView))) t.hide();
              });
            break;

          case H.Zone:
            if (!(null == (f = this.loadingView))) f.showWithText('');
            console.log(
              'SmartSceneDebug: -- WillSetScenesZone - Zones: ' +
                JSON.stringify({
                  tid: this.tid,
                  zones: w,
                })
            );
            module414.default
              .setScenesZone([
                {
                  tid: this.tid,
                  zones: w,
                },
              ])
              .then(function (t) {
                var n, o, l, s;
                console.log('SmartSceneDebug: -- setScenesZone - Success: ' + JSON.stringify(t));
                var u = (null != (n = null == t ? undefined : t.result) ? n : []).map(function (t) {
                  var n;
                  t.fan_power = M.state.cleanMode || module381.RSM.fanPower;
                  t.water_box_mode = M.state.waterMode || module381.RSM.waterBoxMode;
                  t.mop_mode = M.state.mopMode || module381.RSM.mopMode;
                  t.mop_template_id = M.state.mopMode || module381.RSM.mopModeId;
                  t.repeat = M.state.cleanCount;
                  t.clean_order_mode = 0;
                  var o = null != (n = t.zones) ? n : [];
                  t.zones = o.map(function (t, n) {
                    t.repeat = M.state.cleanCount;
                    return t;
                  });
                  return t;
                });
                _ = {
                  method: 'do_scenes_zones',
                  params: {
                    data: u,
                    source: 101,
                  },
                };
                console.log('SmartSceneDebug: -- WillSend do_scenes_zones : ' + JSON.stringify(_));
                return null == module393.setSmartSceneParams
                  ? undefined
                  : module393.setSmartSceneParams(
                      null == (o = globals.initialData) ? undefined : null == (l = o.initialPage) ? undefined : null == (s = l.data) ? undefined : s.mode,
                      _
                    );
              })
              .then(function (t) {
                console.log('SmartSceneDebug: -- setSmartSceneParams - Success: ' + JSON.stringify(t));
              })
              .catch(function (t) {
                var n, o, l, s, u, c;
                if (-10007 == (null == t ? undefined : null == (n = t.data) ? undefined : null == (o = n.error) ? undefined : o.code))
                  globals.showToast(module500.smart_scene_firmware_zone_reach_max_count);
                else if (-10003 == (null == t ? undefined : null == (l = t.data) ? undefined : null == (s = l.error) ? undefined : s.code))
                  globals.showToast(module500.toast_frequently_operate);
                else if (
                  'err.network' == (null == t ? undefined : null == (u = t.data) ? undefined : u.error) ||
                  'timeout' == (null == t ? undefined : null == (c = t.data) ? undefined : c.error)
                )
                  globals.showToast(module500.localization_strings_Setting_History_index_1);
                else globals.showToast(JSON.stringify(t));
                console.log('SmartSceneDebug: -- setScenesZone or setSmartSceneParams - Failed: ' + JSON.stringify(t));
              })
              .finally(function () {
                var t;
                if (!(null == (t = M.loadingView))) t.hide();
              });
        }
      },
    },
    {
      key: 'onPressAddZone',
      value: function () {
        var t;

        if (module381.RSM.mapStatus != module381.MapStatus.None) {
          if (!(null == (t = this.mapView))) t.enterZoneEditMode();
          if (this.mapView && !this.mapView.addRectangle()) globals.showToast(module500.rubys_main_zone_max_tips);
        } else globals.showToast(module500.tap_zone_clean_button_without_map_tip);
      },
    },
    {
      key: 'onCleanCountChanged',
      value: function (t) {
        this.setState({
          cleanCount: t,
        });
      },
    },
    {
      key: 'onPressCustomMode',
      value: function () {
        var t,
          n,
          o,
          l = module422.DMM.isGarnet ? (null == (t = this.state.mopMode) ? undefined : t.mop_template_id) : this.state.mopMode || 300;
        if (!(null == (n = this.customModeView))) n.show(this.state.cleanMode, this.state.waterMode, l);
        if (!(null == (o = this.customModeView))) o.show(this.state.cleanMode, this.state.waterMode, this.state.mopMode);
      },
    },
    {
      key: 'onPressQuestionIcon',
      value: function () {
        var t;
        if (!(null == (t = this.newSwitchGuideView))) t.show();
      },
    },
    {
      key: 'onPressMapEditIcon',
      value: function () {
        var t;
        if (!(null == (t = this.modalMapEditMenu))) t.show();
      },
    },
    {
      key: 'onPressFloor',
      value: function (t) {
        var n = this;

        if (module381.RSM.isRunning) {
          var o;
          if (!(null == (o = this.modalMapEditMenu))) o.hide();
          var l = {
              text: module500.localization_strings_Main_MainPage_11,
            },
            s = {
              text: module500.localization_strings_Main_Error_ErrorDetailPage_3,
              onPress: function () {
                var o;
                if (!(null == (o = n.loadingView))) o.showWithText();
                module414.default
                  .stop()
                  .then(function () {
                    return module381.RSM.waitUntilStateIsNotLocked().then(function () {
                      t();
                    });
                  })
                  .finally(function () {
                    var t;
                    if (!(null == (t = n.loadingView))) t.hide();
                  });
              },
            };
          globals.Alert.alert('', module500.ask_if_stop_for_change_map, [l, s]);
        } else t();
      },
    },
    {
      key: 'onPressCleanMopModeButton',
      value: function () {
        var t = this.state.cleanMopMode + 1;
        if (t > 2) t = 0;
        this.setState({
          cleanMopMode: t,
        });
      },
    },
    {
      key: 'onCustomModePanelChange',
      value: function (t, n, o) {
        var l;
        this.setState({
          cleanMode: t,
          waterMode: n,
          mopMode: module422.DMM.isGarnet ? o.id : o,
        });
        if (!(null == (l = this.sidebarMenu))) l.updateModeIcon(t, n, o);
      },
    },
    {
      key: 'selectedBlocksDidChange',
      value: function (t) {
        var n,
          o = this;
        this.selectedBlockCount = null != (n = null == t ? undefined : t.length) ? n : 0;
        this.selectedCleanSegments = t;
        this.setState(
          {
            bottomMenu: J(
              J({}, this.state.bottomMenu),
              {},
              {
                tip: this.bottomMenuTip,
              }
            ),
            confirmButton: {
              isEnabled: this.isConfirmButtonEnabled,
            },
          },
          function () {
            var t;
            if (!(null == (t = o.confirmButton) || null == t.setEnabled)) t.setEnabled(o.isConfirmButtonEnabled);
          }
        );
      },
    },
    {
      key: 'selectedRectDidChange',
      value: function (t) {
        var n = this;
        this.selectedRectCount = t;
        this.setState(
          {
            bottomMenu: J(
              J({}, this.state.bottomMenu),
              {},
              {
                tip: this.bottomMenuTip,
              }
            ),
            confirmButton: {
              isEnabled: this.isConfirmButtonEnabled,
            },
          },
          function () {
            var t;
            if (!(null == (t = n.confirmButton) || null == t.setEnabled)) t.setEnabled(n.isConfirmButtonEnabled);
          }
        );
      },
    },
    {
      key: 'configNavigationBar',
      value: function () {
        var t = this;
        this.props.navigation.setParams({
          navBarBackgroundColor: this.context.theme.navBackgroundColor,
          title: this.pageTitle,
          hiddenBottomLine: true,
          rightItems: [
            module1410.default.confirmButton(
              function () {
                t.onPressMenuConfirm();
              },
              this.state.confirmButton.isEnabled,
              function (n) {
                t.confirmButton = n;
              }
            ),
          ],
        });
      },
    },
    {
      key: 'initMapView',
      value: function () {
        var t, n, o, l;
        this.updateMap();
        if (!(null == (t = this.mapView))) t.setAllCleanMopMode(module1329.MM.customCleanModes);
        if (!(null == (n = this.mapView))) n.setCleanSequence(module1329.MM.cleanSequence.concat());
        this.checkShowFurnitureModel();
        if (!(null == (o = this.sidebarMenu)))
          o.setState({
            mapEditButtonEnabled: module390.default.isSupportSmartScene(),
            modeSetButtonEnabled: module390.default.isSupportSmartScene(),
          });
        if (!(null == (l = this.sidebarMenu))) l.updateModeIcon(this.state.cleanMode, this.state.waterMode, this.state.mopMode);
      },
    },
    {
      key: 'initParams',
      value: function () {
        var t,
          n,
          o,
          l,
          s = this,
          u = (null == (t = globals.initialData) ? undefined : null == (n = t.initialPage) ? undefined : null == (o = n.data) ? undefined : o.mode) || 'SelectZone',
          c = null != (l = this.state.mode) ? l : H.Segment;

        switch (u) {
          case 'GlobalClean':
            c = H.GlobalClean;
            break;

          case 'SelectZone':
            c = H.Segment;
            break;

          case 'DrawZone':
            c = H.Zone;
        }

        this.setState(
          {
            mode: c,
            confirmButton: {
              isEnabled: u == H.GlobalClean,
            },
          },
          function () {
            s.configNavigationBar();
          }
        );
        this.updateMap();
      },
    },
    {
      key: 'syncInfo',
      value: function () {
        var t,
          n = this;

        if (module390.default.isSupportSmartScene()) {
          if (!(null == (t = this.loadingView))) t.showWithText('');
          module393
            .getSmartSceneInfo()
            .then(function (t) {
              var o,
                l,
                s,
                u,
                c,
                h,
                p,
                S,
                f,
                M,
                _,
                v,
                w = t;

              console.log('SmartSceneDebug: -- getSmartSceneInfo - Success: ' + JSON.stringify(t));
              console.log('SmartSceneDebug: -- WillReunionScenes - Paras: ' + JSON.stringify(w));
              var b =
                null != (o = null == (l = globals.initialData) ? undefined : null == (s = l.initialPage) ? undefined : null == (u = s.data) ? undefined : u.parameters) ? o : '[]';
              if (b.length <= 0) b = '[]';
              console.log('SmartSceneDebug: -- initialPageData - Paras: ' + JSON.stringify(b));
              var C =
                  null != (c = null == (h = null != (S = JSON.parse(b)) ? S : {}) ? undefined : null == (p = h.params) ? undefined : p.data)
                    ? c
                    : null != (f = null == (M = null != (_ = JSON.parse(b)) ? _ : {}) ? undefined : M.params)
                    ? f
                    : {},
                y = (null != (v = null == C ? undefined : C.length) ? v : 0) > 0 ? C[0] : {};
              n.initSceneParas(y);
              return module414.default.reunionScenes(w);
            })
            .catch(function (t) {
              console.log('SmartSceneDebug: -- syncInfo - Failed: ' + JSON.stringify(t));
            })
            .finally(function () {
              var t;
              if (!(null == (t = n.loadingView))) t.hide();
            });
        }
      },
    },
    {
      key: 'registListeners',
      value: function () {
        var t = this;
        this.mapListener = module12.DeviceEventEmitter.addListener(module418.NotificationKeys.MapDidUpdate, function () {
          var n, o, l, s;

          if ((t.updateMap(), (null != (n = null == (o = t.initialZonesList) ? undefined : o.length) ? n : 0) > 0)) {
            var u,
              c,
              h,
              p = t.initialZonesList;
            t.zidList = p.map(function (t) {
              return t.zid;
            });
            console.log('SmartSceneDebug: -- ZoneList: ' + JSON.stringify(p));
            var S = null != (u = null == (c = module1329.MM.mapData) ? undefined : null == (h = c.smartZones) ? undefined : h.smartZones) ? u : [];
            console.log('SmartSceneDebug: -- MapZoneList: ' + JSON.stringify(S) + ', ZList: ' + JSON.stringify(t.zidList));
            S.filter(function (n) {
              console.log('SmartSceneDebug: ' + t.zidList.hasElement(n.zid));
              return t.zidList.hasElement(n.zid);
            })
              .map(function (t) {
                return t.range;
              })
              .forEach(function (n) {
                var o;
                console.log('SmartSceneDebug: -- WillDrawZone: ' + JSON.stringify(n));
                var l = n[0],
                  s = n[1],
                  u = n[2],
                  c = n[3],
                  h = [l, c, u, c, u, s, l, s];
                console.log('SmartSceneDebug: -- WillDrawZone: ' + h);
                if (!(null == (o = t.mapView)))
                  o.setState(J({}, module1329.MM.mapData), function () {
                    t.mapView.addRectangle(t.mapView.decodeMachineFBZ(h, t.mapView.state.map).rectSize);
                  });
              });
            t.zidList = p.map(function (t) {
              return t.zid;
            });
            t.initialZonesList = [];
          }

          if ((null != (l = null == (s = t.initialSelectedCleanSegments) ? undefined : s.length) ? l : 0) > 0) {
            t.initialSelectedCleanSegments.forEach(function (n) {
              t.mapView.changeBlockState(n);
            });
            t.initialSelectedCleanSegments = [];
          }
        });
        this.robotListener = module12.DeviceEventEmitter.addListener(module418.NotificationKeys.RobotStatusDidUpdate, function () {
          t.updateMap();

          if (!t.state.initializedInfo) {
            console.log('SmartSceneDebug: -- RobotStatusDidUpdate Will sync');
            t.setState(
              {
                initializedInfo: true,
              },
              function () {
                t.syncInfo();
              }
            );
          }
        });
        this.specialEventListener = module12.DeviceEventEmitter.addListener(module418.NotificationKeys.DidReceiveSpecialEvent, function (n) {
          if (n.data == module418.EventKeys.CurrentMapDidChange) t.resetSceneParams();
          else if (n.data == module418.EventKeys.MultiMapsDidReceive)
            t.setState({
              hasMapList: module1329.MM.maps.length > 0,
            });
        });
        this.firmwareUpdateListener = module12.DeviceEventEmitter.addListener(module418.NotificationKeys.RedDotDidChange, function (t) {
          if ('firmware_update' == t.name) {
            var n = t.value;
            if (!module390.default.isSupportSmartScene())
              if (n) {
                var o = {
                    text: module500.localization_strings_Main_MainPage_11,
                    onPress: function () {
                      var t;
                      if (!(null == (t = globals.app) || null == t.exit)) t.exit();
                    },
                  },
                  l = {
                    text: module500.smart_scene_firmware_update_alert_confirm,
                    onPress: function () {
                      module393.openDeviceUpgradePage();
                    },
                  };
                globals.Alert.alert(module500.localization_strings_Setting_RemoteControlPage_54, '', [o, l]);
              } else {
                var s = {
                  text: module500.localization_strings_Main_Error_ErrorDetailPage_3,
                  onPress: function () {
                    var t;
                    if (!(null == (t = globals.app) || null == t.exit)) t.exit();
                  },
                };
                globals.Alert.alert(module500.smart_scene_firmware_will_support_alert_title, '', [s]);
              }
          }
        });
        this.themeListener = module12.DeviceEventEmitter.addListener(module418.NotificationKeys.ThemeDidChange, function () {
          var n = t.context.theme;
          t.props.navigation.setParams({
            navBarBackgroundColor: n.navBackgroundColor,
          });
        });
        this.redPointListener = module12.DeviceEventEmitter.addListener(module418.NotificationKeys.RedDotDidChange, function (n) {
          if ('firmware_update' == n.name && n.isForce) t.detectedForceUpdate();
        });
      },
    },
    {
      key: 'removeListeners',
      value: function () {
        var t, n, o, l, s, u;
        if (!(null == (t = this.mapListener))) t.remove();
        if (!(null == (n = this.robotListener))) n.remove();
        if (!(null == (o = this.specialEventListener))) o.remove();
        if (!(null == (l = this.firmwareUpdateListener))) l.remove();
        if (!(null == (s = this.themeListener))) s.remove();
        if (!(null == (u = this.redPointListener))) u.remove();
      },
    },
    {
      key: 'updateMap',
      value: function () {
        var t, n, o, l;
        module381.RSM.hasGotMapFirstTime = true;
        var s = module1329.MM.mapRotateAngle[module381.RSM.currentMapId];
        if (!(null == (t = this.mapView)))
          t.setState(
            J(
              J({}, module1329.MM.mapData),
              {},
              {
                robotStatus: module381.RSM.state,
                mapDeg: s || 0,
              }
            )
          );
        this.setState({
          noMapTip: this.noMapTip,
          shouldShowMap: !this.shouldShowNoMap,
          noMap: {
            tip: this.noMapTip,
            showGuide: this.noMapShouldShowGuide,
          },
          bottomMenu: {
            isHidden: this.shouldShowNoMap && this.state.mode != H.GlobalClean,
            tip: this.bottomMenuTip,
          },
        });
        if (!(null == (n = this.sidebarMenu)))
          n.setState({
            tab: this.state.mode == H.Segment ? module1493.TabSegment : module1493.TabZone,
            mapEditButtonEnabled: module390.default.isSupportSmartScene(),
            modeSetButtonEnabled: module390.default.isSupportSmartScene(),
          });
        if (!(null == (o = this.mapView))) o.changeMapViewMode(this.mapMode);
        if (!(null == (l = this.sidebarMenu))) l.updateModeIcon(this.state.cleanMode, this.state.waterMode, this.state.mopMode);
      },
    },
    {
      key: 'loadEditingMap',
      value: function (t) {
        var n = this;
        return new Promise(function (o, l) {
          var s;
          if (t != module381.RSM.currentMapId)
            module381.RSM.isRunning
              ? l(MultiFloorPageErrors.DeviceNotAvaliable)
              : n.isLoadingMap
              ? l(MultiFloorPageErrors.LoadMapDuplicated)
              : ((n.isLoadingMap = true),
                null == (s = n.loadingView) || s.showWithText(),
                new module1797.MultiMapDataProvider()
                  .loadMap(t)
                  .then(function (o) {
                    n.mapUpdated = false;
                    module1329.MM.getMap(true);
                    return n.checkMapUpdated(t);
                  })
                  .then(function () {
                    module12.DeviceEventEmitter.emit(module418.NotificationKeys.DidReceiveSpecialEvent, {
                      data: module418.EventKeys.MapSegmentsDidChange,
                    });
                    o();
                  })
                  .catch(function (t) {
                    l(t);
                  })
                  .finally(function () {
                    var t;
                    n.isLoadingMap = false;
                    if (!(null == (t = n.loadingView) || null == t.hide)) t.hide();
                  }));
          else o();
        });
      },
    },
    {
      key: 'checkMapUpdated',
      value: function (t) {
        var n = this;
        return new Promise(function (o, l) {
          var s = 0,
            u = setInterval(function () {
              if (s > 15) {
                clearInterval(u);
                l();
              }

              if (n.mapUpdated && module381.RSM.currentMapId == t) {
                clearInterval(u);
                o();
              } else s++;
            }, 300);
        });
      },
    },
    {
      key: 'getCleanModeDetailText',
      value: function () {
        var t = module422.DMM.isGarnet,
          n = this.state.currentCleanMethod;
        if (module382.isModeCustomized(this.state.cleanMode, this.state.waterMode, this.state.mopMode)) return module500.map_edit_bottom_menu_mode;
        var o = module382.getCleanModeTitle(this.state.cleanMode),
          l = module382.getMopWaterOrStrengthTitle(this.state.waterMode),
          s = o + (l ? ' | ' + l : '');
        if (module390.default.isPureCleanMopSupported() && this.state.cleanMode == module1326.CleanModeZero) return l + ' | ' + module382.getMopMethodTitle(this.state.mopMode);

        if (module390.default.isShakeMopSetSupported() && 200 != this.state.waterMode) {
          var u,
            c = t ? (null == (u = module1328.ModeDataInstance.modePannelCustomMops[0]) ? undefined : u.name) : module382.getMopMethodTitle(this.state.mopMode);
          if (301 == this.state.mopMode) return l + ' | ' + c;

          if (t) {
            if (n == module1327.CleanMethodClean) return s;
            if (n == module1327.CleanMethodMop) return c;
            if (n == module1327.CleanMethodCleanAndMop) return s + ' | ' + c;
          }
        }

        return s;
      },
    },
    {
      key: 'initSceneParas',
      value: function (t) {
        var n = this;
        return new Promise(function (o, l) {
          var s, u, c, h;
          console.log('SmartSceneDebug: -- WillInitSceneParas : ' + JSON.stringify(t));

          var p = null == t ? undefined : t.tid,
            S = null != (s = null == t ? undefined : t.fan_power) ? s : module381.RSM.fanPower,
            f = null != (u = null == t ? undefined : t.water_box_mode) ? u : module381.RSM.waterBoxMode,
            M = null != (c = null == t ? undefined : t.mop_mode) ? c : module381.RSM.mopMode,
            _ = null != (h = null == t ? undefined : t.repeat) ? h : 1,
            v = null == t ? undefined : t.map_flag;

          if ((!n.isTidValid(p) || undefined === v) && n.state.mode != H.GlobalClean) {
            console.log('SmartSceneDebug: -- Tid is not valid : ' + p);
            var w = n.isTidValid(p) ? 'MapFlag is undefined.' : 'Tid is not valid';
            n.setState({
              cleanMode: S,
              waterMode: f,
              mopMode: M,
              cleanCount: _,
            });
            return void l(w);
          }

          console.log('SmartSceneDebug: -- Tid is valid : ' + p + ' or is GlobalClean.');

          var b = function () {
            if (
              ((n.tid = p),
              console.log('SmartSceneDebug: -- WillInitSceneParas : cleanMode: ' + S + ', waterMode: ' + f + ', mopMode: ' + M + ', cleanCount: ' + _),
              n.setState({
                cleanMode: S,
                waterMode: f,
                mopMode: M,
                cleanCount: _,
              }),
              null == t ? undefined : t.zones)
            )
              n.initialZonesList = null == t ? undefined : t.zones;
            else if (null == t ? undefined : t.segs) {
              var o = null == t ? undefined : t.segs;
              console.log('SmartSceneDebug: -- SelectBlockList: ' + JSON.stringify(o));
              o.map(function (t) {
                return t.sid;
              }).forEach(function (t) {
                console.log('SmartSceneDebug: -- WillSelectBlock: ' + JSON.stringify(t));
                n.initialSelectedCleanSegments.push(t);
              });
            }
          };

          console.log('SmartSceneDebug: -- WillCompareCurrentMap: ' + v + ', ' + module381.RSM.currentMapId);

          if (v !== module381.RSM.currentMapId && n.state.mode != H.GlobalClean) {
            console.log('SmartSceneDebug: -- WillLoadCurrentMap.');
            module414.default
              .loadMultiMap(v)
              .then(function () {
                b();
                o();
              })
              .catch(function (t) {
                console.log('SmartSceneDebug: -- LoadCurrentMapFailed: ' + JSON.stringify(t));
                l(t);
              });
          } else {
            b();
            o();
          }
        });
      },
    },
    {
      key: 'resetSceneParams',
      value: function () {
        var t, n;
        this.tid = null;
        this.zidList = [];
        if (!(null == (t = this.mapView))) t.clearRectangles();
        this.selectedCleanSegments = [];
        if (!(null == (n = this.mapView))) n.resetSelectBlocks();
      },
    },
    {
      key: 'isTidValid',
      value: function (t) {
        var n;
        module381.RSM.validTids.forEach(function (n) {
          console.log('SmartSceneDebug: ' + n);
          console.log('SmartSceneDebugTid: ' + t);
        });
        return (null != (n = module381.RSM.validTids) ? n : []).hasElement(t);
      },
    },
    {
      key: 'detectedForceUpdate',
      value: function () {
        var t = this;

        if (!module393.isMiApp && !module391.default.isShareUser()) {
          var n;
          if (!(null == (n = this.forceUpdateView))) n.show();
          var o = setInterval(function () {
            module393
              .getFirmwareVersion()
              .then(function (n) {
                var l;

                if (n.currentVersion == n.lastVersion) {
                  clearInterval(o);
                  if (!(null == (l = t.forceUpdateView))) l.dismissModalView();
                }
              })
              .catch(function (t) {
                console.log(t);
              });
          }, 2e3);
        }
      },
    },
    {
      key: 'theme',
      get: function () {
        return this.context.theme;
      },
    },
    {
      key: 'inCleaning',
      get: function () {
        return (
          module381.RSM.cleanResumeFlag != module381.CleanResumeFlag.None ||
          module381.RSM.backDockResumeFlag != module381.BackDockResumeFlag.None ||
          module381.RSM.state == module381.RobotState.SPOT_CLEAN
        );
      },
    },
    {
      key: 'noMapShouldShowGuide',
      get: function () {
        return module381.RSM.mapStatus == module381.MapStatus.Has_WithoutSegments;
      },
    },
    {
      key: 'mapMode',
      get: function () {
        if (!module390.default.isSupportSmartScene()) return module1330.MapModelInCleanMode.Segment_Clean_Read_Only;

        switch (this.state.mode) {
          case H.GlobalClean:
            return module1330.MapModelInCleanMode.Global_Clean_With_Clean_Type;

          case H.Segment:
            var t = module381.RSM.isCustomCleanMode() || module381.RSM.isCustomWaterMode() || module381.RSM.isCustomMopMode(),
              n = module381.RSM.isSegmentCleanTaskShouldResume() || module381.RSM.state == module381.RobotState.SEGMENT_CLEAN;
            if (t)
              return n
                ? module1330.MapModelInCleanMode.Segment_Clean_Sequential_Read_Only_With_Clean_Type
                : module1330.MapModelInCleanMode.Segment_Clean_Sequential_Edit_With_Clean_Type;
            else return n ? module1330.MapModelInCleanMode.Segment_Clean_Read_Only : module1330.MapModelInCleanMode.Segment_Clean_Edit;

          case H.Zone:
            return module1330.MapModelInCleanMode.Zone_Clean_Edit;

          default:
            throw new Error('Unrecognized mode.');
        }
      },
    },
    {
      key: 'noMapTip',
      get: function () {
        var t = '';

        switch (this.state.mode) {
          case H.GlobalClean:
            t = module500.no_seg_map_tip;

          case H.Segment:
            t = module500.smart_scene_global_no_map_tip;

          case H.Zone:
            t = module500.smart_scene_global_no_map_tip;
        }

        return t;
      },
    },
    {
      key: 'shouldShowNoMap',
      get: function () {
        switch (this.state.mode) {
          case H.GlobalClean:
            return module381.RSM.mapStatus == module381.MapStatus.None;

          case H.Segment:
            return module381.RSM.mapStatus == module381.MapStatus.None || -1 == module381.RSM.currentMapId;

          case H.Zone:
            return module381.RSM.mapStatus == module381.MapStatus.None || !module381.RSM.mapSaveEnabled || -1 == module381.RSM.currentMapId;

          default:
            return false;
        }
      },
    },
    {
      key: 'bottomMenuTip',
      get: function () {
        var t = '';

        switch (this.state.mode) {
          case H.GlobalClean:
            t = '';
            break;

          case H.Segment:
            if (module381.RSM.mapStatus == module381.MapStatus.Has_WithSegments)
              t =
                this.selectedBlockCount > 0
                  ? '' +
                    module500.main_page_top_tip_has_selected.templateStringWithParams({
                      zones: this.selectedBlockCount,
                    })
                  : module500.home_menu_select_zone_tip;
            break;

          case H.Zone:
            if (module381.RSM.mapStatus != module381.MapStatus.None)
              t =
                this.selectedRectCount > 0
                  ? '' +
                    module500.mainpage_top_tip_has_drawed.templateStringWithParams({
                      zones: this.selectedRectCount,
                    })
                  : module500.home_menu_draw_zone_tip;
        }

        return t;
      },
    },
    {
      key: 'isConfirmButtonEnabled',
      get: function () {
        switch (this.state.mode) {
          case H.GlobalClean:
            return true;

          case H.Segment:
            return this.selectedBlockCount > 0;

          case H.Zone:
            return this.selectedRectCount > 0;
        }
      },
    },
    {
      key: 'pageTitle',
      get: function () {
        switch (this.state.mode) {
          case H.GlobalClean:
          case H.Segment:
          case H.Zone:
          default:
            return module500.smart_scene_global_title;
        }
      },
    },
  ]);
  return K;
})(React.default.Component);

exports.default = K;
K.contextType = module515.AppConfigContext;
var q = module12.StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  wrap: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 120,
    alignSelf: 'center',
    zIndex: 0,
    alignItems: 'center',
  },
  cleanMopWrap: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 200,
    left: 20,
    zIndex: 0,
  },
  topTipView: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    paddingHorizontal: 40,
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
  confirmMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: module391.default.isIphoneX() ? 10 : 0,
    paddingHorizontal: 20,
  },
  confirmButton: {
    marginRight: 20,
  },
  bottomTip: {
    marginHorizontal: 20,
    position: 'absolute',
    alignSelf: 'center',
    textAlign: 'center',
    color: 'rgba(0,0,0,0.6)',
  },
});
