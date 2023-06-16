var regeneratorRuntime = require('regenerator-runtime'),
  module22 = require('./22'),
  module49 = require('./49'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = D(require('react')),
  module12 = require('./12'),
  module377 = require('./377'),
  module1231 = require('./1231'),
  module411 = require('./411'),
  module381 = require('./381'),
  module387 = require('./387'),
  module407 = require('./407'),
  module386 = require('./386'),
  module1326 = D(require('./1326')),
  module1986 = require('./1986'),
  module1808 = require('./1808'),
  module1233 = require('./1233'),
  module1344 = D(require('./1344')),
  module390 = require('./390'),
  module506 = require('./506'),
  module1801 = require('./1801'),
  module1261 = require('./1261');

function T(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (T = function (t) {
    return t ? o : n;
  })(t);
}

function D(t, n) {
  if (!n && t && t.__esModule) return t;
  if (null === t || ('object' != typeof t && 'function' != typeof t))
    return {
      default: t,
    };
  var o = T(n);
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
}

function A(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(t);
    if (n)
      s = s.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, s);
  }

  return o;
}

function F(t) {
  for (var n = 1; n < arguments.length; n++) {
    var o = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      A(Object(o), true).forEach(function (n) {
        module49.default(t, n, o[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(o));
    else
      A(Object(o)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(o, n));
      });
  }

  return t;
}

function O() {
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

var module936 = require('./936'),
  module389 = require('./389'),
  j = module12.NativeModules.RRPluginSDK,
  module1249 = require('./1249'),
  module491 = require('./491').strings,
  H = [module491.map_edit_floor_tile, module491.map_edit_floor_wood, module491.map_edit_floor_other],
  G = (function (t) {
    module7.default(D, t);

    var module49 = D,
      module506 = O(),
      T = function () {
        var t,
          n = module11.default(module49);

        if (module506) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function D(t) {
      var n;
      module4.default(this, D);

      (n = T.call(this, t)).onNavigationBackPress = function () {
        n.props.navigation.pop();
      };

      n.onNavigationGuidePress = function () {
        if (n.newSwitchGuideView) n.newSwitchGuideView.show();
      };

      n.handleSelectedBlocksDidChange = function (t) {
        if (n.isCustomName() && 1 == t.length) {
          n.editMenu.showConfirmMenu(module491.map_edit_name_select_more_segment_tip);
          return void n.showRoomNameView();
        }

        if (n.state.action == module1326.EditAction.Floor && 1 == t.length) {
          n.editMenu.showConfirmMenu(module491.map_edit_floor_change_tip);
          n.showFloorSheetView();
        }
      };

      n.onResegmentButtonPressed = function () {
        if (n.state.mapStatus != module377.MapStatus.None)
          module377.RSM.isRunning
            ? module1261.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
                n.showToast(module491.robot_communication_exception);
              })
            : n.canAutoSplitButton()
            ? n.alert &&
              n.alert.customAlert(
                module491.mannual_split_map_tip,
                '',
                function () {
                  return n.onPressAutoSplitButton();
                },
                null,
                {
                  confirmTitle: module491.localization_strings_Main_Error_ErrorDetailPage_3,
                }
              )
            : n.alert.alert(module491.refresh_segments_alert_hint, '', [
                {
                  text: module491.localization_strings_Main_MainPage_11,
                  onPress: function () {},
                },
                {
                  text: module491.rubys_location_confirm_button_confirm,
                  onPress: function () {
                    n.alert.hide();
                    var t = module377.RSM.currentMapId;
                    if (1 == module1231.MM.maps.length && 1 == module1231.MM.mapCountMax) t = module1231.MM.maps[0].id;
                    n.refreshMapSegments(t);
                  },
                },
              ]);
      };

      n.onPressMergeZoneButton = function () {
        n.setState({
          action: module1326.EditAction.Merge,
        });
        n.setReSegmentButtonVisible(false);
      };

      n.onPressSplitZoneButton = function () {
        n.setState({
          action: module1326.EditAction.Split,
        });
        n.setReSegmentButtonVisible(false);
      };

      n.onPressConfirmButtonForSplit = function () {
        n.editMenu.hideConfirmMenu();
        if (n.mapView && undefined === n.mapView.state.selectBlockList) n.showToast(module491.map_edit_split_no_map);

        for (var t = 0, o = 1; o < n.mapView.state.selectBlockList.length; o++) 1 == n.mapView.state.selectBlockList[o] && t++;

        if (1 != t) {
          n.showToast(module491.map_edit_split_restriction);
          return 0;
        } else if (undefined !== n.mapView.state.map.data.blockNum && n.mapView.state.map.data.blockNum > 15) {
          n.showToast(module491.map_edit_split_restriction_num);
          return 0;
        } else return void (null != n.mapView.getSplitParams() ? n.mapView && n.splitSelectBlock() : n.showToast(module491.map_edit_split_restriction_point_illegal));
      };

      n.onPressCancelButtonForSplit = function () {
        n.resetActionStatus();
      };

      n.onPressConfirmButtonForMerge = function () {
        n.mergeSelectBlock();
      };

      n.onPressCancelButtonForMerge = function () {
        n.resetActionStatus();
      };

      n.onPressConfirmButtonForName = function () {
        for (var t, o, s, u = [], l = null != (t = null == (o = n.mapView) ? undefined : null == (s = o.state) ? undefined : s.roomNameList) ? t : [], c = 0; c < l.length; c++)
          -1 != l[c][0] &&
            (module389.isMiApp
              ? u.push({
                  miRoomId: l[c][0] + '',
                  robotRoomId: c,
                })
              : u.push({
                  iotRoomId: l[c][0] + '',
                  robotRoomId: c,
                }));

        n.editMenu.hideConfirmMenu();
        n.startLoading();
        n.isUpdatingRoomName = true;
        module407.default
          .nameSegment(u)
          .then(function () {
            module1231.MM.updateRoomNameMapping(function (t) {
              if (t) n.showToast(module491.naming_failed);
              n.endLoading();
            });
          })
          .catch(function (t) {
            n.endLoading();
            n.showToast(module491.naming_failed);
          })
          .finally(function () {
            n.resetActionStatus();
            n.isUpdatingRoomName = false;
          });
      };

      n.onPressCancelButtonForName = function () {
        n.resetActionStatus();
        if (n.mapView) n.mapView.getRoomNameListInEditPage(true);
      };

      n.onPressConfirmButtonForFloor = function () {
        n.editMenu.hideConfirmMenu();
        n.startLoading();
        var t = [];
        Object.keys(n.floorData).map(function (o) {
          var s = [];
          s.push(parseInt(o));
          s.push(n.floorData[o]);
          t.push(s);
        });
        if (t.length <= 0) n.endLoading();
        else
          module407.default
            .saveFloorMaterial({
              data: t,
            })
            .then(function (t) {
              module1231.MM.getMap(true);
            })
            .catch(function (t) {
              var o = module1344.default.errorText(t.data.error ? t.data.error.code : 0);
              n.showToast(o);
            })
            .finally(function () {
              n.resetActionStatus();
              n.floorData = {};
              n.endLoading();
            });
      };

      n.onPressCancelButtonForFloor = function () {
        n.resetActionStatus();
        n.floorData = {};
      };

      n.onPressRoomNameButton = function () {
        if (j) {
          if (!module389.isRoomNameSupported()) return void n.showToast(module491.map_object_app_version_tip);
        } else if (module389.MiApiLevel < module389.androidRoomApiLevel) return void n.showToast(module491.localization_strings_Setting_RemoteControlPage_50);

        if (n.mapView) {
          if (!n.mapView.checkAppVersion()) {
            var t = {
              text: module491.localization_strings_Setting_RemoteControlPage_51,
              onPress: function () {
                return n.props.navigator.pop();
              },
            };
            return void n.alert.alert(module491.localization_strings_Setting_RemoteControlPage_49, module491.localization_strings_Setting_RemoteControlPage_50, [t]);
          }

          for (var o = 0, s = 0; s < n.mapView.state.selectBlockList.length; s++) 0 != n.mapView.state.selectBlockList[s] && o++;

          if (0 == o || 1 == o) {
            n.setReSegmentButtonVisible(false);
            n.editMenu.showConfirmMenu(module491.map_edit_name_select_more_segment_tip);
            n.setState({
              action: module1326.EditAction.Name,
            });
            if (1 == o) n.showRoomNameView();
          } else if (o > 1) n.showToast(module491.map_edit_name_select_more_segment_tip);
        }
      };

      n.onPressRoomFloorButton = function () {
        for (var t, o = 0, s = 0; s < n.mapView.state.selectBlockList.length; s++) 0 != n.mapView.state.selectBlockList[s] && o++;

        if (o <= 1) {
          n.setReSegmentButtonVisible(false);
          n.editMenu.showConfirmMenu(module491.map_edit_floor_change_tip);
          n.setState({
            action: module1326.EditAction.Floor,
          });
          if (!(null == (t = n.mapView)))
            t.setState({
              eidtFloor: n.floorData,
            });
          if (1 == o) n.showFloorSheetView();
        } else n.showToast(module491.map_edit_floor_select_segment_tip);
      };

      n.editMapSegmentsIsDisable = function (t) {
        n.showToast(t);
      };

      n.confirmMenuConfirmButtonEnabled = function () {
        return !(n.isCustomName() && !n.editedRoom);
      };

      n.onPressRoomNameConfirmButton = function (t) {
        for (var o = 0, s = -1, u = 0; u < n.mapView.state.selectBlockList.length; u++) {
          o += n.mapView.state.selectBlockList[u];
          if (0 != n.mapView.state.selectBlockList[u]) s = u;
        }

        if (1 == o) n.setNewRoomName(t, s);
        else n.showToast(module491.map_edit_name_select_more_segment_tip);
      };

      n.onPressRoomNameSelectClose = function () {
        var t;
        if (!(null == (t = n.mapView))) t.resetSelectBlocks();
      };

      n.onRoomNameSelectDulicated = function () {
        var t;
        if (n.roomNameView) n.roomNameView.hide();
        n.showToast(module491.room_already_exist);
        if (!(null == (t = n.mapView))) t.resetSelectBlocks();
      };

      n.onSelectAreaViewMode = function (t) {
        for (var o, s = 0 == t ? 4 : 1 == t ? 3 : 0, u = 0, l = -1, c = 0; c < n.mapView.state.selectBlockList.length; c++) {
          u += n.mapView.state.selectBlockList[c];
          if (0 != n.mapView.state.selectBlockList[c]) l = c;
        }

        if (1 == u) {
          n.floorData[l] = s;
          if (!(null == (o = n.mapView)))
            o.setState({
              eidtFloor: n.floorData,
            });
          n.hideFloorSheetView();
        } else n.showToast(module491.map_edit_name_select_more_segment_tip);
      };

      n.hideFloorSheetView = function () {
        var t, o;
        if (!(null == (t = n.actionSheet))) t.hide();
        if (!(null == (o = n.mapView))) o.resetSelectBlocks();
      };

      n.initAction = n.props.navigation.state.params.action || module1326.EditAction.None;
      n.state = {
        mapObjectDeleteButtonVisible: false,
        shouldShowObstaclesType: false,
        shouldShowReSegmentButton:
          module386.default.isReSegmentSupported() || (module377.RSM.mapStatus == module377.MapStatus.Has_WithoutSegments && -1 != module377.RSM.currentMapId),
        action: n.initAction,
        mapStatus: module377.RSM.mapStatus,
        overTimer: module936.OverTimer_Six,
        shouldShowFloorSheetView: false,
      };
      n.mapSegmentHasShow = false;
      n.editedRoom = false;
      n.currentSegmentStatusQueryCount = 0;
      n.segmentOperationLock = false;
      n.isLastRobotStatusLocked = module377.RSM.state == module377.RobotState.LOCKED;
      n.unMount = false;
      n.animatedWrapMarginBottom = new module12.Animated.Value(-500);
      n.floorData = {};
      return n;
    }

    module5.default(D, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          var t = this;
          this.backListener = module12.BackHandler.addEventListener(module12.BackHandler.DEVICE_BACK_EVENT, function () {
            t.onNavigationBackPress();
            return true;
          });
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
                    this.configNavibar();
                    this.initMapView();
                    this.registListeners();
                    t = this.mapView;
                    module1249.setTimeout(function () {
                      if (t) t.getRoomNameListInEditPage(true);
                    }, 1e3);
                    this.showGuideViewIfNeeded();

                  case 6:
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
        key: 'componentWillUnmount',
        value: function () {
          this.unMount = true;
          if (this.mapListener) this.mapListener.remove();
          if (this.backListener) this.backListener.remove();
          if (this.specialEventListener) this.specialEventListener.remove();
          if (this.robotStatusListener) this.robotStatusListener.remove();
          if (this.resegmentTimer) clearInterval(this.resegmentTimer);
        },
      },
      {
        key: 'configNavibar',
        value: function () {
          var t = this,
            n = [
              module1344.default.guideButton(this.onNavigationGuidePress, function (n) {
                t.guideButton = n;
              }),
            ];
          module1344.default.setNavigation(this, globals.isRTL ? n.reverse() : n, this.onNavigationBackPress);
        },
      },
      {
        key: 'initMapView',
        value: function () {
          var t;
          if (!(null == (t = this.mapView))) t.setState(F({}, module1231.MM.mapData));
        },
      },
      {
        key: 'registListeners',
        value: function () {
          var t = this,
            n = this.mapView;
          this.mapListener = module12.DeviceEventEmitter.addListener(module411.NotificationKeys.MapDidUpdate, function (o) {
            if (t.isUpdatingRoomName || t.editMenu.state.tip) {
              if (!t.isUpdatingRoomName)
                n &&
                  n.setState(
                    F(
                      F({}, module1231.MM.mapData),
                      {},
                      {
                        robotStatus: module377.RSM.state,
                      }
                    )
                  );
            } else {
              if (n) n.getAllRoomNameList();
              if (n)
                n.setState(
                  F(
                    F({}, module1231.MM.mapData),
                    {},
                    {
                      robotStatus: module377.RSM.state,
                    }
                  )
                );
            }
          });
          this.specialEventListener = module12.DeviceEventEmitter.addListener(module411.NotificationKeys.DidReceiveSpecialEvent, function (n) {
            if (n.data == module411.EventKeys.RoomNameMappingDidReceive && t.mapView) t.mapView.getRoomNameListInEditPage(false);
            if (n.data == module411.EventKeys.MapSegmentsDidChange && t.mapView)
              t.mapView.setState(
                F(
                  F({}, module1231.MM.mapData),
                  {},
                  {
                    robotStatus: module377.RSM.state,
                  }
                )
              );
          });
          this.robotStatusListener = module12.DeviceEventEmitter.addListener(module411.NotificationKeys.RobotStatusDidUpdate, function (n) {
            t.setState({
              mapStatus: module377.RSM.mapStatus,
            });
          });
        },
      },
      {
        key: 'onSegmentFinished',
        value: function (t) {
          this.segmentOperationLock = false;
          this.currentSegmentStatusQueryCount = 0;
          console.log('OnSegmentFinished: ' + t);

          if (t) {
            if (this.mapView) this.mapView.getAllRoomNameList();
            module12.DeviceEventEmitter.emit(module411.NotificationKeys.DidReceiveSpecialEvent, {
              data: module411.EventKeys.MapSegmentsDidChange,
            });
            module12.DeviceEventEmitter.emit(module411.NotificationKeys.DidReceiveSpecialEvent, {
              data: module411.EventKeys.SegmentCustomModeDidChange,
            });
            module12.DeviceEventEmitter.emit(module411.NotificationKeys.DidReceiveSpecialEvent, {
              data: module411.EventKeys.CleanSequenceDidChange,
            });
          } else globals.showToast(module491.map_object_ignore_failed);

          this.endLoading();
        },
      },
      {
        key: 'showGuideViewIfNeeded',
        value: function () {
          var t,
            o,
            s = this;
          return regeneratorRuntime.default.async(
            function (u) {
              for (;;)
                switch ((u.prev = u.next)) {
                  case 0:
                    t = module411.StorageKeys.EditZonebyGuide;
                    u.next = 3;
                    return regeneratorRuntime.default.awrap(module411.GetStorageKey(t));

                  case 3:
                    if (((o = u.sent), !!o)) {
                      u.next = 11;
                      break;
                    }

                    u.next = 8;
                    return regeneratorRuntime.default.awrap(module411.SetStorageKey(t, t));

                  case 8:
                    module1249.setTimeout(function () {
                      if (s.newSwitchGuideView) s.newSwitchGuideView.show();
                    }, 50);
                    u.next = 12;
                    break;

                  case 11:
                    setTimeout(function () {
                      s.checkSegmentEdit();
                    }, 50);

                  case 12:
                  case 'end':
                    return u.stop();
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
        key: 'checkSegmentEdit',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    if (!this.state.showModal) {
                      t.next = 2;
                      break;
                    }

                    return t.abrupt('return');

                  case 2:
                    this.hasCustomMode();
                    this.hasCustomOrder();
                    this.hasSegmentTimer();

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
        key: 'hasCustomMode',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.next = 2;
                    return regeneratorRuntime.default.awrap(module1231.MM.getCustomCleanMode());

                  case 2:
                    if ((t = module1231.MM.customCleanModes) && t.length > 0) this.showSegmentEditPrompt();

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
        key: 'hasCustomOrder',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.next = 2;
                    return regeneratorRuntime.default.awrap(module1231.MM.getCleanSequence());

                  case 2:
                    if ((t = module1231.MM.cleanSequence) && t.length > 0) this.showSegmentEditPrompt();

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
        key: 'hasSegmentTimer',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    if (!this.mapSegmentHasShow) {
                      t.next = 2;
                      break;
                    }

                    return t.abrupt('return');

                  case 2:
                    if (1 != module377.RSM.FCCState) {
                      t.next = 8;
                      break;
                    }

                    t.next = 6;
                    return regeneratorRuntime.default.awrap(this.fetchTimerListFromServer());

                  case 6:
                    t.next = 10;
                    break;

                  case 8:
                    t.next = 10;
                    return regeneratorRuntime.default.awrap(this.fetchListDataFromRobot());

                  case 10:
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
        key: 'isSegmentClean',
        value: function (t) {
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    if ('0' == t || 'ok' == t) {
                      n.next = 3;
                      break;
                    }

                    this.showSegmentEditPrompt();
                    return n.abrupt('return', true);

                  case 3:
                    return n.abrupt('return', false);

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
        key: 'showSegmentEditPrompt',
        value: function () {
          var t = this;

          if (!this.mapSegmentHasShow) {
            this.mapSegmentHasShow = true;
            module1249.setTimeout(function () {
              module491.localization_strings_Setting_RemoteControlPage_51;
              if (t.editMenu)
                t.editMenu.setState({
                  tip: module491.map_edit_segment_prompt,
                });
            }, 100);
          }
        },
      },
      {
        key: 'fetchTimerListFromServer',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.prev = 0;
                    o.next = 3;
                    return regeneratorRuntime.default.awrap(module389.getServerTimers());

                  case 3:
                    t = o.sent;
                    this.handleServerTimerList(t, module389.isMiApp);
                    o.next = 10;
                    break;

                  case 7:
                    o.prev = 7;
                    o.t0 = o.catch(0);
                    this.showToast(module491.robot_communication_exception);

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
        key: 'handleServerTimerList',
        value: function (t, n) {
          var o = this;
          t.forEach(function (t) {
            var s = o.parseServerTimerParas(n ? t.setting.on_param : t.params.params);
            console.log('data segments', s);
            o.isSegmentClean(s);
          });
        },
      },
      {
        key: 'parseServerTimerParas',
        value: function (t) {
          var n = [];
          if (t[0].constructor == Object) n = module22.default(t, 1)[0].segments;
          else n = module22.default(t, 3)[2];
          return n;
        },
      },
      {
        key: 'fetchListDataFromRobot',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    if (((o.prev = 0), !module386.default.isSupportFetchTimerSummary())) {
                      o.next = 6;
                      break;
                    }

                    o.next = 4;
                    return regeneratorRuntime.default.awrap(this.loopFetchRobotTimer());

                  case 4:
                    o.next = 11;
                    break;

                  case 6:
                    o.next = 8;
                    return regeneratorRuntime.default.awrap(module407.default.getTimer());

                  case 8:
                    t = o.sent;
                    console.log('fetchListDataFromRobot - ' + JSON.stringify(t.result));
                    this.handleRobotTimerList(t.result);

                  case 11:
                    o.next = 17;
                    break;

                  case 13:
                    o.prev = 13;
                    o.t0 = o.catch(0);
                    this.showToast(module491.robot_communication_exception);
                    console.log('fetchListDataFromRobot  error: ' + ('object' == typeof o.t0 ? JSON.stringify(o.t0) : o.t0));

                  case 17:
                  case 'end':
                    return o.stop();
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
        key: 'handleRobotTimerList',
        value: function (t) {
          var n = this;
          t.forEach(function (t) {
            var s = module22.default(t, 3)[2],
              u = module22.default(s, 2)[1],
              l = [];
            if (module377.RSM.isSupportOrderSegmentClean()) l = module22.default(u, 2)[1].segments;
            else l = module22.default(u, 3)[2];
            console.log('segments - -----' + JSON.stringify(l));
            n.isSegmentClean(l);
          });
        },
      },
      {
        key: 'loopFetchRobotTimer',
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
                    return regeneratorRuntime.default.awrap(module407.default.getTimerListSummary());

                  case 3:
                    t = s.sent;
                    console.log('getTimerListSummary - ' + JSON.stringify(t));
                    if (!t.result.length) 0;
                    t.result.forEach(function (t) {
                      return regeneratorRuntime.default.async(
                        function (s) {
                          for (;;)
                            switch ((s.prev = s.next)) {
                              case 0:
                                s.next = 2;
                                return regeneratorRuntime.default.awrap(o.fetchTimerDetail(t));

                              case 2:
                                if (!s.sent) {
                                  s.next = 4;
                                  break;
                                }

                                return s.abrupt('return');

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
                    });
                    s.next = 13;
                    break;

                  case 9:
                    s.prev = 9;
                    s.t0 = s.catch(0);
                    console.log('loopFetchRobotTimer  error: ' + ('object' == typeof s.t0 ? JSON.stringify(s.t0) : s.t0));
                    this.showToast(module491.robot_communication_exception);

                  case 13:
                  case 'end':
                    return s.stop();
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
        key: 'fetchTimerDetail',
        value: function (t) {
          var module49, u, l, c, p, h, f, S, w, _, M, y;

          return regeneratorRuntime.default.async(
            function (k) {
              for (;;)
                switch ((k.prev = k.next)) {
                  case 0:
                    k.prev = 0;
                    module49 = this;
                    k.next = 4;
                    return regeneratorRuntime.default.awrap(module407.default.getTimerDetail(t));

                  case 4:
                    if (
                      ((u = k.sent),
                      console.log('fetchTimerDetail - ' + JSON.stringify(u)),
                      (l = u.result[0]),
                      (c = module22.default(l, 3)),
                      (p = c[2]),
                      (h = module22.default(p, 2)),
                      (f = h[1]),
                      (S = []),
                      module377.RSM.isSupportOrderSegmentClean()
                        ? ((w = module22.default(f, 2)), (_ = w[1]), (S = _.segments))
                        : ((M = module22.default(f, 3)), (y = M[2]), (S = y)),
                      console.log('data item segments - ' + JSON.stringify(S)),
                      !module49.isSegmentClean(S))
                    ) {
                      k.next = 14;
                      break;
                    }

                    return k.abrupt('return', true);

                  case 14:
                    return k.abrupt('return', false);

                  case 17:
                    k.prev = 17;
                    k.t0 = k.catch(0);
                    this.showToast(module491.robot_communication_exception);
                    console.log('fetchTimerDetail  error: ' + ('object' == typeof k.t0 ? JSON.stringify(k.t0) : k.t0));
                    return k.abrupt('return', false);

                  case 22:
                  case 'end':
                    return k.stop();
                }
            },
            null,
            this,
            [[0, 17]],
            Promise
          );
        },
      },
      {
        key: 'handleManualSegmentMap',
        value: function () {
          var t = module377.RSM.currentMapId;
          if (1 == module1231.MM.maps.length && 1 == module1231.MM.mapCountMax) t = module1231.MM.maps[0].id;
          this.manualSegmentMap(t);
        },
      },
      {
        key: 'manualSegmentMap',
        value: function (t) {
          var o = this;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    setTimeout(function () {
                      o.startLoading();
                    }, 100);
                    s.prev = 1;
                    s.next = 4;
                    return regeneratorRuntime.default.awrap(
                      module407.default.manualSegmentMap(
                        module386.default.isMultiFloorSupported()
                          ? {
                              map_flag: t,
                            }
                          : []
                      )
                    );

                  case 4:
                    module1801.MapListDataProvider.syncSmartSceneIfNeeded();
                    module1231.MM.getMap(true);
                    this.updateMap();
                    this.endLoading();
                    s.next = 14;
                    break;

                  case 11:
                    s.prev = 11;
                    s.t0 = s.catch(1);
                    this.endLoading();

                  case 14:
                  case 'end':
                    return s.stop();
                }
            },
            null,
            this,
            [[1, 11]],
            Promise
          );
        },
      },
      {
        key: 'refreshMapSegments',
        value: function (t) {
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    this.mapView.resetSelectBlocks();
                    this.startLoading();
                    o.prev = 2;
                    o.next = 5;
                    return regeneratorRuntime.default.awrap(
                      module407.default.manualSegmentMap(
                        module386.default.isMultiFloorSupported()
                          ? {
                              map_flag: t,
                            }
                          : []
                      )
                    );

                  case 5:
                    module1801.MapListDataProvider.syncSmartSceneIfNeeded();
                    module1231.MM.getMap(true);
                    if (this.mapView) this.mapView.getAllRoomNameList();
                    module12.DeviceEventEmitter.emit(module411.NotificationKeys.DidReceiveSpecialEvent, {
                      data: module411.EventKeys.MapSegmentsDidChange,
                    });
                    module12.DeviceEventEmitter.emit(module411.NotificationKeys.DidReceiveSpecialEvent, {
                      data: module411.EventKeys.SegmentCustomModeDidChange,
                    });
                    module12.DeviceEventEmitter.emit(module411.NotificationKeys.DidReceiveSpecialEvent, {
                      data: module411.EventKeys.CleanSequenceDidChange,
                    });
                    this.endLoading();
                    o.next = 17;
                    break;

                  case 14:
                    o.prev = 14;
                    o.t0 = o.catch(2);
                    this.endLoading();

                  case 17:
                  case 'end':
                    return o.stop();
                }
            },
            null,
            this,
            [[2, 14]],
            Promise
          );
        },
      },
      {
        key: 'updateMap',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    if (this.mapView) this.mapView.setState(F({}, module1231.MM.mapData));

                  case 1:
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
        key: 'splitSelectBlock',
        value: function () {
          var t,
            o,
            s = this;
          return regeneratorRuntime.default.async(
            function (u) {
              for (;;)
                switch ((u.prev = u.next)) {
                  case 0:
                    this.mapView.resetSelectBlocks();
                    t = this.mapView.getSplitParams();
                    module1249.setTimeout(function () {
                      return s.startLoading();
                    }, 100);
                    u.prev = 3;
                    u.next = 6;
                    return regeneratorRuntime.default.awrap(module407.default.splitSegment(t));

                  case 6:
                    module1801.MapListDataProvider.syncSmartSceneIfNeeded();
                    module1231.MM.getMap(true);
                    if (this.mapView) this.mapView.getAllRoomNameList();
                    module12.DeviceEventEmitter.emit(module411.NotificationKeys.DidReceiveSpecialEvent, {
                      data: module411.EventKeys.MapSegmentsDidChange,
                    });
                    module12.DeviceEventEmitter.emit(module411.NotificationKeys.DidReceiveSpecialEvent, {
                      data: module411.EventKeys.SegmentCustomModeDidChange,
                    });
                    module12.DeviceEventEmitter.emit(module411.NotificationKeys.DidReceiveSpecialEvent, {
                      data: module411.EventKeys.CleanSequenceDidChange,
                    });
                    u.next = 18;
                    break;

                  case 14:
                    u.prev = 14;
                    u.t0 = u.catch(3);
                    o = module1344.default.errorText(u.t0.data.error ? u.t0.data.error.code : 0);
                    this.showToast(o);

                  case 18:
                    u.prev = 18;
                    this.resetActionStatus();
                    this.endLoading();
                    return u.finish(18);

                  case 22:
                  case 'end':
                    return u.stop();
                }
            },
            null,
            this,
            [[3, 14, 18, 22]],
            Promise
          );
        },
      },
      {
        key: 'isMergeValid',
        value: function (t) {
          if ((console.log('MergeM: SelectedBlocks: ' + t), t.length < 2)) return false;
          var n = new Set(t),
            o = t[0],
            s = new Set([o]);
          console.log('MergeM: Enter Loop.');

          for (var u = 0; s.size > 0; ) {
            if ((console.log('MergeM: CurrentBlockId: ' + o + ', Queue: ' + JSON.stringify(s) + ', Uncovered: ' + JSON.stringify(n)), u > 1024)) {
              console.error('MergeM: Maxloop count reached, check if there is an infinite loop.');
              return false;
            }

            if (
              (this.neighbours(o).forEach(function (t) {
                if (n.has(t)) s.add(t);
              }),
              s.delete(o),
              n.delete(o),
              0 == s.size)
            )
              break;
            o = s.keys().next().value;
            u++;
          }

          console.log('MergeM: End Loop.');
          console.log('MergeM: UncoverdBlockSize: ' + n.size);
          return 0 == n.size;
        },
      },
      {
        key: 'neighbours',
        value: function (t) {
          var n = this.mapView.state.map.neighbourInfo || [];
          return n
            ? n
                .slice(32 * t, 32 * (t + 1) - 1)
                .map(function (t, n) {
                  return 1 == t ? n : -1;
                })
                .filter(function (t) {
                  return -1 != t;
                })
            : [];
        },
      },
      {
        key: 'mergeSelectBlock',
        value: function () {
          var t,
            o,
            s,
            u = this;
          return regeneratorRuntime.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    for (
                      this.mapView && undefined === this.mapView.state.selectBlockList && this.showToast(module491.map_edit_merge_no_map), t = [], o = 1;
                      o < this.mapView.state.selectBlockList.length;
                      o++
                    )
                      0 != this.mapView.state.selectBlockList[o] && t.push(o);

                    if (!(t.length < 2)) {
                      l.next = 8;
                      break;
                    }

                    this.showToast(module491.map_edit_merge_restriction);
                    return l.abrupt('return');

                  case 8:
                    if (this.isMergeValid(t)) {
                      l.next = 13;
                      break;
                    }

                    this.showToast(module491.map_edit_merge_restriction);
                    return l.abrupt('return');

                  case 13:
                    0;
                    this.editMenu.hideConfirmMenu();
                    this.mapView.resetSelectBlocks();
                    module1249.setTimeout(function () {
                      return u.startLoading();
                    }, 100);
                    l.prev = 17;
                    l.next = 20;
                    return regeneratorRuntime.default.awrap(module407.default.mergeSegment(t));

                  case 20:
                    module1801.MapListDataProvider.syncSmartSceneIfNeeded();
                    1;
                    module1231.MM.getMap(true);
                    if (this.mapView) this.mapView.getAllRoomNameList();
                    module12.DeviceEventEmitter.emit(module411.NotificationKeys.DidReceiveSpecialEvent, {
                      data: module411.EventKeys.MapSegmentsDidChange,
                    });
                    module12.DeviceEventEmitter.emit(module411.NotificationKeys.DidReceiveSpecialEvent, {
                      data: module411.EventKeys.SegmentCustomModeDidChange,
                    });
                    module12.DeviceEventEmitter.emit(module411.NotificationKeys.DidReceiveSpecialEvent, {
                      data: module411.EventKeys.CleanSequenceDidChange,
                    });
                    l.next = 33;
                    break;

                  case 29:
                    l.prev = 29;
                    l.t0 = l.catch(17);
                    s = module1344.default.errorText(l.t0.data.error ? l.t0.data.error.code : 0);
                    this.showToast(s);

                  case 33:
                    l.prev = 33;
                    this.resetActionStatus();
                    this.endLoading();
                    return l.finish(33);

                  case 37:
                  case 'end':
                    return l.stop();
                }
            },
            null,
            this,
            [[17, 29, 33, 37]],
            Promise
          );
        },
      },
      {
        key: 'setNewRoomName',
        value: function (t, o) {
          var s,
            u,
            l,
            c,
            p = this;
          return regeneratorRuntime.default.async(
            function (h) {
              for (;;)
                switch ((h.prev = h.next)) {
                  case 0:
                    for (this.editedRoom = true, s = [], u = {}, l = 0; l < 32; l++) s.push([-1, -1]);

                    if (this.mapView.checkAppVersion()) {
                      h.next = 7;
                      break;
                    }

                    this.alert.alert(module491.localization_strings_Setting_RemoteControlPage_49, module491.localization_strings_Setting_RemoteControlPage_50, [
                      {
                        text: module491.localization_strings_Setting_RemoteControlPage_51,
                        onPress: function () {
                          return p.props.navigator.pop();
                        },
                      },
                    ]);
                    return h.abrupt('return');

                  case 7:
                    try {
                      c = this.mapView.state.roomNameList;
                      module389.getRoomList(function (s, l) {
                        var h, f, S, v, w, _, M, y;

                        return regeneratorRuntime.default.async(
                          function (b) {
                            for (;;)
                              switch ((b.prev = b.next)) {
                                case 0:
                                  if (!s) {
                                    b.next = 42;
                                    break;
                                  }

                                  h = 0;

                                case 2:
                                  if (!(h < l.length)) {
                                    b.next = 16;
                                    break;
                                  }

                                  f = l[h].name;
                                  S = l[h].roomId;
                                  v = 0;

                                case 5:
                                  if (!(v < c.length)) {
                                    b.next = 12;
                                    break;
                                  }

                                  if (S != c[v][0]) {
                                    b.next = 9;
                                    break;
                                  }

                                  c[v][1] = f;
                                  return b.abrupt('continue', 9);

                                case 9:
                                  v++;
                                  b.next = 5;
                                  break;

                                case 12:
                                  u[f] = S;

                                case 13:
                                  h++;
                                  b.next = 2;
                                  break;

                                case 16:
                                  if ('' != t) {
                                    b.next = 22;
                                    break;
                                  }

                                  console.log('NewRoomName Empty.');
                                  c[o][0] = -1;
                                  c[o][1] = -1;
                                  p.mapView.setSingleRoomName(o, -1, -1);
                                  return b.abrupt('return');

                                case 22:
                                  if (undefined === u[t]) {
                                    b.next = 39;
                                    break;
                                  }

                                  w = p.mapView.state.roomNameList;
                                  _ = 0;

                                case 25:
                                  if (!(_ < w.length)) {
                                    b.next = 32;
                                    break;
                                  }

                                  if (_ == o || w[_][1] != t) {
                                    b.next = 29;
                                    break;
                                  }

                                  p.showToast(module491.room_name_already_in_use);
                                  return b.abrupt('return');

                                case 29:
                                  _++;
                                  b.next = 25;
                                  break;

                                case 32:
                                  for (c[o][0] = u[t], c[o][1] = t, M = [], y = 0; y < c.length; y++)
                                    -1 != c[y][0] &&
                                      (module389.isMiApp
                                        ? M.push({
                                            miRoomId: c[y][0] + '',
                                            robotRoomId: y,
                                          })
                                        : M.push({
                                            iotRoomId: c[y][0] + '',
                                            robotRoomId: y,
                                          }));

                                  p.mapView.setSingleRoomName(o, t, c[o][0]);
                                  b.next = 40;
                                  break;

                                case 39:
                                  module389.addNewRoomWithName(t, function (s, u) {
                                    var l, h, f;
                                    return regeneratorRuntime.default.async(
                                      function (n) {
                                        for (;;)
                                          switch ((n.prev = n.next)) {
                                            case 0:
                                              if (s)
                                                for (l = u.roomId, c[o][0] = l, c[o][1] = t, p.mapView.setSingleRoomName(o, t, c[o][0]), h = [], f = 0; f < c.length; f++)
                                                  -1 != c[f][0] &&
                                                    (module389.isMiApp
                                                      ? h.push({
                                                          miRoomId: c[f][0] + '',
                                                          robotRoomId: f,
                                                        })
                                                      : h.push({
                                                          iotRoomId: c[f][0] + '',
                                                          robotRoomId: f,
                                                        }));
                                              else
                                                module389.isMiApp
                                                  ? u && ('exceed room max count' == u.message || (u.message.error && -105 == u.message.error.code))
                                                    ? globals.showToast(module491.room_count_reach_limit)
                                                    : u && 'room name too long' == u.message
                                                    ? globals.showToast(module491.floor_map_name_too_long)
                                                    : u && u.message && u.message.error && u.message.error.localDescription
                                                    ? globals.showToast(u.message.error.localDescription)
                                                    : u && u.message
                                                    ? globals.showToast(u.message)
                                                    : globals.showToast(module491.naming_failed)
                                                  : !u || ('userinfo.err.room.exceed.limit' != u.code && -103 != u.code)
                                                  ? (u && 'userinfo.err.duplicate.name' == u.code) || -102 == u.code
                                                    ? globals.showToast(module491.room_already_exist)
                                                    : globals.showToast(module491.naming_failed)
                                                  : globals.showToast(module491.room_count_reach_limit);
                                              return n.abrupt('return');

                                            case 2:
                                            case 'end':
                                              return n.stop();
                                          }
                                      },
                                      null,
                                      null,
                                      null,
                                      Promise
                                    );
                                  });

                                case 40:
                                  b.next = 43;
                                  break;

                                case 42:
                                  console.warn('cannot get room list');

                                case 43:
                                case 'end':
                                  return b.stop();
                              }
                          },
                          null,
                          null,
                          null,
                          Promise
                        );
                      });
                    } catch (t) {
                      console.log('getRoomNameMapping  error: ' + ('object' == typeof t ? JSON.stringify(t) : t));
                    }

                  case 8:
                  case 'end':
                    return h.stop();
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
        key: 'canAutoSplitButton',
        value: function () {
          return this.state.mapStatus == module377.MapStatus.Has_WithoutSegments && -1 != module377.RSM.currentMapId;
        },
      },
      {
        key: 'canReSplitButton',
        value: function () {
          return module386.default.isReSegmentSupported() && this.state.mapStatus == module377.MapStatus.Has_WithSegments;
        },
      },
      {
        key: 'isCustomName',
        value: function () {
          return this.state.action == module1326.EditAction.Name;
        },
      },
      {
        key: 'resetActionStatus',
        value: function () {
          this.setState({
            action: this.initAction,
          });
          this.setReSegmentButtonVisible(true);
        },
      },
      {
        key: 'onPressAutoSplitButton',
        value: function () {
          var t = this,
            n = module377.RSM.isSupportAutoSplitSegments(),
            o = module377.RSM.mapStatus != module377.MapStatus.None,
            s = module377.RSM.isReadyToCmd() || module377.RSM.isChargingOnDock(),
            u = '';
          if (n) o ? s || (u = module491.auto_split_will_trigger_after_cleaning_and_charing) : (u = module491.zone_will_auto_split_when_finishing_clean);
          else u = module491.localization_strings_Setting_RemoteControlPage_54;
          if (n && o && s) this.handleManualSegmentMap();
          else
            setTimeout(function () {
              var n = {
                text: module491.localization_strings_Setting_RemoteControlPage_51,
              };
              t.alert.alert('', u, [n]);
            }, 100);
        },
      },
      {
        key: 'showRoomNameView',
        value: function () {
          var t;

          if (!this.passNameMenuParams()) {
            if (!(null == (t = this.mapView))) t.resetSelectBlocks();
            module1231.MM.updateRoomNameMapping();
            return void this.showToast(module491.localization_strings_Setting_CleanModePage_3);
          }

          if (1 == ((this.mapView && this.mapView.blockSequenceList) || []).length) {
            this.setReSegmentButtonVisible(false);
            if (this.roomNameView) this.roomNameView.show();
          } else this.showToast(module491.map_edit_name_select_more_segment_tip);
        },
      },
      {
        key: 'passNameMenuParams',
        value: function () {
          if (this.mapView) {
            var t,
              n = [],
              o = -1;

            if (((t = this.mapView.getCurrentSelectBlock()), this.mapView.editPageNameList && 0 != this.mapView.editPageNameList.length)) {
              if (-1 != t)
                for (var s = this.mapView.state.roomNameList[t][1], u = 0; u < this.mapView.editPageNameList.length; u++) {
                  var l = this.mapView.editPageNameList[u].name;
                  this.mapView.editPageNameList[u].used;

                  if (s == l) {
                    o = u + 1;
                    n.push({
                      name: l,
                      used: false,
                    });
                  } else
                    n.push({
                      name: l,
                      used: false,
                    });
                }
              this.roomNameView.setNamesAndSelectedIndex(n, o);
              return true;
            }

            if (undefined !== this.mapView.editPageNameList && 0 == this.mapView.editPageNameList.length) {
              this.roomNameView.setNamesAndSelectedIndex(n, o);
              return true;
            } else {
              this.roomNameView.setNamesAndSelectedIndex(n, o);
              return false;
            }
          }

          this.roomNameView.setNamesAndSelectedIndex(buttons, id);
          return false;
        },
      },
      {
        key: 'setReSegmentButtonVisible',
        value: function (t) {
          this.setState({
            shouldShowReSegmentButton: t,
          });
        },
      },
      {
        key: 'showWithTextAndOverTimer',
        value: function (t) {
          if (this.loadingView) this.loadingView.showWithTextAndOverTimer(module491.rubys_main_diag_update_map, t);
        },
      },
      {
        key: 'startLoading',
        value: function () {
          if (this.loadingView) this.loadingView.showWithText(module491.rubys_main_diag_update_map);
        },
      },
      {
        key: 'endLoading',
        value: function () {
          if (this.loadingView) this.loadingView.hide();
        },
      },
      {
        key: 'showToast',
        value: function (t) {
          globals.showToast(t);
        },
      },
      {
        key: 'showFloorSheetView',
        value: function () {
          var t;
          if (!(null == (t = this.actionSheet))) t.show();
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.context.theme,
            o = React.default.createElement(module1233.MapView, {
              style: module1344.MapEditCommonStyles.map,
              parent: this,
              ref: function (n) {
                return (t.mapView = n);
              },
              left: module1344.MapEditCommonStyles.mapLeft,
              right: module1344.MapEditCommonStyles.mapRight,
              top: module1344.MapEditCommonStyles.mapTop,
              bottom: module1344.MapEditCommonStyles.mapBottom,
              mapMode: module936.MAP_MODE_MAP_EDIT,
              editAction: this.state.action,
              inBlockMode: true,
              hideAccessory: true,
              showMapObjectDeleteButton: this.state.mapObjectDeleteButtonVisible,
              selectedBlocksDidChange: this.handleSelectedBlocksDidChange,
            }),
            s = (this.canReSplitButton() || this.canAutoSplitButton()) && this.state.shouldShowReSegmentButton && this.state.mapStatus != module377.MapStatus.None,
            u = React.default.createElement(module381.TopImageButton, {
              funcId: 'reset_order_btn',
              style: module1344.MapEditCommonStyles.refreshMapSegmentIndicator,
              image: n.mapEdit.resetImg,
              textColor: n.mapEdit.itemTextColor,
              selectedColor: n.mapEdit.selectedTextColor,
              selectedTextColor: n.mapEdit.selectedTextColor,
              imageWidth: 40,
              imageHeight: 40,
              hitSlop: {
                top: 20,
                left: 30,
                bottom: 20,
                right: 15,
              },
              onPress: this.onResegmentButtonPressed,
              title: module491.refresh_map_segments,
              fontSize: 12,
              textTop: 5,
              numberOfLines: 2,
              maxTextWidth: 80,
            }),
            l =
              this.state.mapStatus == module377.MapStatus.None || (this.state.mapStatus == module377.MapStatus.Has_WithoutSegments && -1 == module377.RSM.currentMapId)
                ? module1344.default.getNoMapTipView(this.state.mapStatus)
                : o;
          return React.default.createElement(
            module12.View,
            {
              style: [
                module1344.MapEditCommonStyles.root,
                {
                  height: module390.default.sharedCache().ScreenHeight - module387.default.statusbarHeight(),
                  backgroundColor: n.mapEdit.backgroundColor,
                },
              ],
            },
            l,
            React.default.createElement(module1326.default, {
              type: module1326.MenuType.Menu_Zone,
              ref: function (n) {
                return (t.editMenu = n);
              },
              hasConfirmMenu: true,
              currentAction: this.state.action,
              onPressMergeZoneButton: this.onPressMergeZoneButton,
              onPressSplitZoneButton: this.onPressSplitZoneButton,
              onPressConfirmButtonForSplit: this.onPressConfirmButtonForSplit,
              onPressCancelButtonForSplit: this.onPressCancelButtonForSplit,
              onPressConfirmButtonForMerge: this.onPressConfirmButtonForMerge,
              onPressCancelButtonForMerge: this.onPressCancelButtonForMerge,
              onPressConfirmButtonForName: this.onPressConfirmButtonForName,
              onPressCancelButtonForName: this.onPressCancelButtonForName,
              onPressConfirmButtonForFloor: this.onPressConfirmButtonForFloor,
              onPressCancelButtonForFloor: this.onPressCancelButtonForFloor,
              onPressNameButton: this.onPressRoomNameButton,
              onPressFloorButton: this.onPressRoomFloorButton,
              editMapSegmentsIsDisable: this.editMapSegmentsIsDisable,
              confirmMenuConfirmButtonEnabled: this.confirmMenuConfirmButtonEnabled,
            }),
            React.default.createElement(module1986.default, {
              ref: function (n) {
                t.roomNameView = n;
              },
              onPressConfirmButton: this.onPressRoomNameConfirmButton,
              onPressCloseButton: this.onPressRoomNameSelectClose,
              onNameDuplicated: this.onRoomNameSelectDulicated,
            }),
            React.default.createElement(module381.ActionSheetView, {
              ref: function (n) {
                return (t.actionSheet = n);
              },
              actions: H,
              didSelectRow: this.onSelectAreaViewMode,
              onPressCancel: this.hideFloorSheetView,
              onPressCloseButton: this.onPressRoomNameSelectClose,
            }),
            React.default.createElement(module381.AlertView, {
              ref: function (n) {
                return (t.alert = n);
              },
            }),
            s && u,
            React.default.createElement(module1808.default, {
              ref: function (n) {
                t.newSwitchGuideView = n;
              },
              isModal: true,
              parent: this,
              bgImage: n.guideImages.split,
              topTitle: module491.map_edit_zone_title,
              context: module491.map_edit_zone_zone_info,
              buttonInfo: [module491.localization_strings_Setting_RemoteControlPage_51],
              buttonFuncId: ['map_edit_zone_guide_ok'],
            }),
            React.default.createElement(module381.CancelableLoadingView, {
              loadingAccessibilityLabelKey: 'map_edit_zone_info_view_loading',
              closeAccessibilityLabelKey: 'map_edit_zone_info_view_loading_close',
              ref: function (n) {
                t.loadingView = n;
              },
              onOverTimer: function () {
                globals.showToast(module491.map_object_ignore_failed);
              },
              showButton: true,
            })
          );
        },
      },
    ]);
    return D;
  })(React.Component);

exports.default = G;
G.contextType = module506.AppConfigContext;
module12.StyleSheet.create({
  rotateButton: {
    position: 'absolute',
    top: 100 + (module12.StatusBar.currentHeight || 0),
    right: 15,
  },
  floorSheet: {
    height: 500,
    justifyContent: 'flex-end',
    paddingBottom: 25,
    overflow: 'hidden',
  },
  modalView: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: module12.Dimensions.get('window').width,
    height: module12.Dimensions.get('window').height,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: module936.AppBorderRadius,
  },
});
