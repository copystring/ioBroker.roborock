var module23 = require('@babel/runtime/helpers/slicedToArray'),
  module50 = require('./50'),
  regeneratorRuntime = require('regenerator-runtime'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module381 = require('./381'),
  module1329 = require('./1329'),
  module418 = require('./418'),
  module385 = require('./385'),
  module391 = require('./391'),
  module414 = require('./414'),
  module390 = require('./390'),
  module1390 = require('./1390'),
  module1962 = require('./1962'),
  module1802 = require('./1802'),
  module1330 = require('./1330'),
  module1410 = require('./1410'),
  module394 = require('./394'),
  module515 = require('./515'),
  module1797 = require('./1797'),
  module1391 = require('./1391'),
  module1332 = require('./1332');

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

function I(t) {
  for (var n = 1; n < arguments.length; n++) {
    var o = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      A(Object(o), true).forEach(function (n) {
        module50.default(t, n, o[n]);
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
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (t) {
    return false;
  }
}

var module1153 = require('./1153'),
  module393 = require('./393'),
  z = module12.NativeModules.RRPluginSDK,
  module1404 = require('./1404'),
  module500 = require('./500').strings,
  H = (function (t) {
    module7.default(A, t);

    var n = A,
      module50 = O(),
      D = function () {
        var t,
          o = module11.default(n);

        if (module50) {
          var u = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, u);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function A(t) {
      var n;
      module4.default(this, A);

      (n = D.call(this, t)).onNavigationBackPress = function () {
        n.props.navigation.pop();
      };

      n.onNavigationGuidePress = function () {
        if (n.newSwitchGuideView) n.newSwitchGuideView.show();
      };

      n.handleSelectedBlocksDidChange = function (t) {
        if (n.isCustomName() && 1 == t.length) {
          n.editMenu.showConfirmMenu(module500.map_edit_name_select_more_segment_tip);
          return void n.showRoomNameView();
        }
      };

      n.onResegmentButtonPressed = function () {
        if (n.state.mapStatus != module381.MapStatus.None)
          if (module381.RSM.isRunning)
            module1391.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
              n.showToast(module500.robot_communication_exception);
            });
          else if (n.canAutoSplitButton()) {
            var t;
            if (!(null == (t = globals.Alert)))
              t.customAlert(
                module500.mannual_split_map_tip,
                '',
                function () {
                  return n.onPressAutoSplitButton();
                },
                null,
                {
                  confirmTitle: module500.localization_strings_Main_Error_ErrorDetailPage_3,
                }
              );
          } else {
            var o;
            if (!(null == (o = globals.Alert)))
              o.alert(module500.refresh_segments_alert_hint, '', [
                {
                  text: module500.localization_strings_Main_MainPage_11,
                  onPress: function () {},
                },
                {
                  text: module500.rubys_location_confirm_button_confirm,
                  onPress: function () {
                    var t = module381.RSM.currentMapId;
                    if (1 == module1329.MM.maps.length && 1 == module1329.MM.mapCountMax) t = module1329.MM.maps[0].id;
                    n.refreshMapSegments(t);
                  },
                },
              ]);
          }
      };

      n.onPressMergeZoneButton = function () {
        n.setState({
          action: module1390.EditAction.Merge,
        });
        n.setReSegmentButtonVisible(false);
      };

      n.onPressSplitZoneButton = function () {
        n.setState({
          action: module1390.EditAction.Split,
        });
        n.setReSegmentButtonVisible(false);
      };

      n.onPressConfirmButtonForSplit = function () {
        n.splitSelectBlock();
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
        for (var t, o, s, u = [], c = null != (t = null == (o = n.mapView) ? undefined : null == (s = o.state) ? undefined : s.roomNameList) ? t : [], l = 0; l < c.length; l++)
          if (-1 != c[l][0]) {
            var p = 3 == c[l].length ? c[l][2] : 0;
            p = 'string' == typeof p ? parseInt(p) : p;
            if (module393.isMiApp)
              u.push({
                miRoomId: c[l][0] + '',
                robotRoomId: l,
                robotTagId: p,
              });
            else
              u.push({
                iotRoomId: c[l][0] + '',
                robotRoomId: l,
                robotTagId: p,
              });
          }

        if (u.length <= 0) n.showToast(module500.map_edit_name_select_more_segment_tip);
        else {
          n.editMenu.hideConfirmMenu();
          n.startLoading();
          n.isUpdatingRoomName = true;
          module414.default
            .nameSegment(u)
            .then(function () {
              module1329.MM.updateRoomNameMapping(function (t) {
                if (t) n.showToast(module500.naming_failed);
                n.endLoading();
              });
            })
            .catch(function (t) {
              n.endLoading();
              n.showToast(module500.naming_failed);
            })
            .finally(function () {
              n.resetActionStatus();
              n.isUpdatingRoomName = false;
            });
        }
      };

      n.onPressCancelButtonForName = function () {
        var t;
        n.resetActionStatus();
        if (!(null == (t = n.mapView))) t.getRoomNameListInMap();
      };

      n.onPressRoomNameButton = function () {
        if (z) {
          if (!module393.isRoomNameSupported()) return void n.showToast(module500.map_object_app_version_tip);
        } else if (module393.MiApiLevel < module393.androidRoomApiLevel) return void n.showToast(module500.localization_strings_Setting_RemoteControlPage_50);

        if (n.mapView) {
          var t;
          if (!n.mapView.checkAppVersion()) return void n.showAppVersionNoWorkAlert();
          var o,
            s = ((null == (t = n.mapView) ? undefined : t.getCurrentSelectBlock()) || []).length;

          if (0 == s || 1 == s) {
            n.setReSegmentButtonVisible(false);
            if (!(null == (o = n.editMenu))) o.showConfirmMenu(module500.map_edit_name_select_more_segment_tip);
            n.setState({
              action: module1390.EditAction.Name,
            });
            if (1 == s) n.showRoomNameView();
          } else s > 1 && n.showToast(module500.map_edit_name_select_more_segment_tip);
        }
      };

      n.editMapSegmentsIsDisable = function (t) {
        n.showToast(t);
      };

      n.confirmMenuConfirmButtonEnabled = function () {
        return !(n.isCustomName() && !n.editedRoom);
      };

      n.onPressRoomNameConfirmButton = function (t) {
        var o,
          s = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : 0,
          u = (null == (o = n.mapView) ? undefined : o.getCurrentSelectBlock()) || [];
        if (1 == u.length) n.setNewRoomName(t, u[0], s);
        else n.showToast(module500.map_edit_name_select_more_segment_tip);
      };

      n.onPressRoomNameSelectClose = function () {
        var t;
        if (!(null == (t = n.mapView))) t.resetSelectBlocks();
      };

      n.onDealTagDuplicateName = function (t, o, s) {
        var u = [];
        if (
          (n.mapView.state.roomNameList.map(function (t) {
            if (-1 != t[0] && -1 != t[1]) u.push(t[1]);
          }),
          0 == u.length)
        )
          return o;

        for (
          var c = o, l = 0;
          -1 != u.indexOf(c) &&
          c != s &&
          ((c = 0 == l ? module1332.RoomTagInfo[t].name : '' + module1332.RoomTagInfo[t].name + l),
          l++,
          c == o && (c = 0 == l ? module1332.RoomTagInfo[t].name : '' + module1332.RoomTagInfo[t].name + l),
          20 != l);

        );

        return c;
      };

      n.initAction = n.props.navigation.state.params.action || module1390.EditAction.None;
      n.state = {
        shouldShowObstaclesType: false,
        shouldShowReSegmentButton:
          module390.default.isReSegmentSupported() || (module381.RSM.mapStatus == module381.MapStatus.Has_WithoutSegments && -1 != module381.RSM.currentMapId),
        action: n.initAction,
        mapStatus: module381.RSM.mapStatus,
        overTimer: module1153.OverTimer_Six,
      };
      n.mapSegmentHasShow = false;
      n.editedRoom = false;
      n.currentSegmentStatusQueryCount = 0;
      n.segmentOperationLock = false;
      n.isLastRobotStatusLocked = module381.RSM.state == module381.RobotState.LOCKED;
      n.unMount = false;
      return n;
    }

    module5.default(A, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          var t = this;
          this.backListener = module12.BackHandler.addEventListener(module12.BackHandler.DEVICE_BACK_EVENT, function () {
            t.onNavigationBackPress();
            return true;
          });
          this.initAction = this.props.navigation.getParam('initAction', module1390.EditAction.None);
        },
      },
      {
        key: 'componentDidMount',
        value: function () {
          var t,
            n = this;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    this.configNavibar();
                    this.initMapView();
                    this.registListeners();
                    t = this.mapView;
                    module1404.setTimeout(function () {
                      if (t) t.getRoomNameListInMap();
                    }, 1e3);
                    this.showGuideViewIfNeeded();
                    module1404.setTimeout(function () {
                      n.initActionShow();
                    }, 500);

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
              module1410.default.guideButton(this.onNavigationGuidePress, function (n) {
                t.guideButton = n;
              }),
            ];
          module1410.default.setNavigation(this, globals.isRTL ? n.reverse() : n, this.onNavigationBackPress);
        },
      },
      {
        key: 'initMapView',
        value: function () {
          var t;
          if (!(null == (t = this.mapView))) t.setState(I({}, module1329.MM.mapData));
        },
      },
      {
        key: 'initActionShow',
        value: function () {
          if (this.initAction == module1390.EditAction.Name) {
            var t;
            if (this.state.mapStatus == module381.MapStatus.Has_WithSegments)
              if ((module393.isMiApp || module390.default.isRoomNameSupported()) && !module391.default.isShareUser()) {
                if (!(null == (t = this.editMenu)))
                  t.setState({
                    currentAction: module1390.EditAction.Name,
                  });
                this.onPressRoomNameButton();
              }
            this.initAction = module1390.EditAction.None;
          }
        },
      },
      {
        key: 'registListeners',
        value: function () {
          var t = this,
            n = this.mapView;
          this.mapListener = module12.DeviceEventEmitter.addListener(module418.NotificationKeys.MapDidUpdate, function (o) {
            if (t.isUpdatingRoomName || t.editMenu.state.tip) {
              if (!t.isUpdatingRoomName)
                n &&
                  n.setState(
                    I(
                      I({}, module1329.MM.mapData),
                      {},
                      {
                        robotStatus: module381.RSM.state,
                      }
                    )
                  );
            } else {
              if (n) n.getRoomNameListInMap();
              if (n)
                n.setState(
                  I(
                    I({}, module1329.MM.mapData),
                    {},
                    {
                      robotStatus: module381.RSM.state,
                    }
                  )
                );
            }
          });
          this.specialEventListener = module12.DeviceEventEmitter.addListener(module418.NotificationKeys.DidReceiveSpecialEvent, function (n) {
            if (n.data == module418.EventKeys.MapSegmentsDidChange && t.mapView)
              t.mapView.setState(
                I(
                  I({}, module1329.MM.mapData),
                  {},
                  {
                    robotStatus: module381.RSM.state,
                  }
                )
              );
          });
          this.robotStatusListener = module12.DeviceEventEmitter.addListener(module418.NotificationKeys.RobotStatusDidUpdate, function (n) {
            t.setState({
              mapStatus: module381.RSM.mapStatus,
            });
          });
        },
      },
      {
        key: 'onSegmentFinished',
        value: function (t) {
          var n;

          if (((this.segmentOperationLock = false), (this.currentSegmentStatusQueryCount = 0), console.log('OnSegmentFinished: ' + t), t)) {
            if (!(null == (n = this.mapView))) n.getRoomNameListInMap();
            module12.DeviceEventEmitter.emit(module418.NotificationKeys.DidReceiveSpecialEvent, {
              data: module418.EventKeys.MapSegmentsDidChange,
            });
            module12.DeviceEventEmitter.emit(module418.NotificationKeys.DidReceiveSpecialEvent, {
              data: module418.EventKeys.SegmentCustomModeDidChange,
            });
            module12.DeviceEventEmitter.emit(module418.NotificationKeys.DidReceiveSpecialEvent, {
              data: module418.EventKeys.CleanSequenceDidChange,
            });
          } else globals.showToast(module500.map_object_ignore_failed);

          this.endLoading();
        },
      },
      {
        key: 'showGuideViewIfNeeded',
        value: function () {
          var t,
            n,
            o = this;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    t = module418.StorageKeys.EditZonebyGuide;
                    s.next = 3;
                    return regeneratorRuntime.default.awrap(module418.GetStorageKey(t));

                  case 3:
                    if (((n = s.sent), !!n)) {
                      s.next = 11;
                      break;
                    }

                    s.next = 8;
                    return regeneratorRuntime.default.awrap(module418.SetStorageKey(t, t));

                  case 8:
                    module1404.setTimeout(function () {
                      if (o.newSwitchGuideView) o.newSwitchGuideView.show();
                    }, 50);
                    s.next = 12;
                    break;

                  case 11:
                    setTimeout(function () {
                      o.checkSegmentEdit();
                    }, 50);

                  case 12:
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
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    n.next = 2;
                    return regeneratorRuntime.default.awrap(module1329.MM.getCustomCleanMode());

                  case 2:
                    if ((t = module1329.MM.customCleanModes) && t.length > 0) this.showSegmentEditPrompt();

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
        key: 'hasCustomOrder',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    n.next = 2;
                    return regeneratorRuntime.default.awrap(module1329.MM.getCleanSequence());

                  case 2:
                    if ((t = module1329.MM.cleanSequence) && t.length > 0) this.showSegmentEditPrompt();

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
                    if (1 != module381.RSM.FCCState) {
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
            module1404.setTimeout(function () {
              module500.localization_strings_Setting_RemoteControlPage_51;
              if (t.editMenu)
                t.editMenu.setState({
                  tip: module500.map_edit_segment_prompt,
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
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    n.prev = 0;
                    n.next = 3;
                    return regeneratorRuntime.default.awrap(module393.getServerTimers());

                  case 3:
                    t = n.sent;
                    this.handleServerTimerList(t, module393.isMiApp);
                    n.next = 10;
                    break;

                  case 7:
                    n.prev = 7;
                    n.t0 = n.catch(0);
                    this.showToast(module500.robot_communication_exception);

                  case 10:
                  case 'end':
                    return n.stop();
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
          if (t[0].constructor == Object) n = module23.default(t, 1)[0].segments;
          else n = module23.default(t, 3)[2];
          return n;
        },
      },
      {
        key: 'fetchListDataFromRobot',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    if (((n.prev = 0), !module390.default.isSupportFetchTimerSummary())) {
                      n.next = 6;
                      break;
                    }

                    n.next = 4;
                    return regeneratorRuntime.default.awrap(this.loopFetchRobotTimer());

                  case 4:
                    n.next = 11;
                    break;

                  case 6:
                    n.next = 8;
                    return regeneratorRuntime.default.awrap(module414.default.getTimer());

                  case 8:
                    t = n.sent;
                    console.log('fetchListDataFromRobot - ' + JSON.stringify(t.result));
                    this.handleRobotTimerList(t.result);

                  case 11:
                    n.next = 17;
                    break;

                  case 13:
                    n.prev = 13;
                    n.t0 = n.catch(0);
                    this.showToast(module500.robot_communication_exception);
                    console.log('fetchListDataFromRobot  error: ' + ('object' == typeof n.t0 ? JSON.stringify(n.t0) : n.t0));

                  case 17:
                  case 'end':
                    return n.stop();
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
            var s = module23.default(t, 3)[2],
              u = module23.default(s, 2)[1],
              c = [];
            if (module381.RSM.isSupportOrderSegmentClean()) c = module23.default(u, 2)[1].segments;
            else c = module23.default(u, 3)[2];
            console.log('segments - -----' + JSON.stringify(c));
            n.isSegmentClean(c);
          });
        },
      },
      {
        key: 'loopFetchRobotTimer',
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
                    return regeneratorRuntime.default.awrap(module414.default.getTimerListSummary());

                  case 3:
                    t = o.sent;
                    console.log('getTimerListSummary - ' + JSON.stringify(t));
                    if (!t.result.length) 0;
                    t.result.forEach(function (t) {
                      return regeneratorRuntime.default.async(
                        function (o) {
                          for (;;)
                            switch ((o.prev = o.next)) {
                              case 0:
                                o.next = 2;
                                return regeneratorRuntime.default.awrap(n.fetchTimerDetail(t));

                              case 2:
                                if (!o.sent) {
                                  o.next = 4;
                                  break;
                                }

                                return o.abrupt('return');

                              case 4:
                              case 'end':
                                return o.stop();
                            }
                        },
                        null,
                        null,
                        null,
                        Promise
                      );
                    });
                    o.next = 13;
                    break;

                  case 9:
                    o.prev = 9;
                    o.t0 = o.catch(0);
                    console.log('loopFetchRobotTimer  error: ' + ('object' == typeof o.t0 ? JSON.stringify(o.t0) : o.t0));
                    this.showToast(module500.robot_communication_exception);

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
        key: 'fetchTimerDetail',
        value: function (t) {
          var n, s, c, l, p, h, f, S, v, M, w, y;
          return regeneratorRuntime.default.async(
            function (b) {
              for (;;)
                switch ((b.prev = b.next)) {
                  case 0:
                    b.prev = 0;
                    n = this;
                    b.next = 4;
                    return regeneratorRuntime.default.awrap(module414.default.getTimerDetail(t));

                  case 4:
                    if (
                      ((s = b.sent),
                      console.log('fetchTimerDetail - ' + JSON.stringify(s)),
                      (c = s.result[0]),
                      (l = module23.default(c, 3)),
                      (p = l[2]),
                      (h = module23.default(p, 2)),
                      (f = h[1]),
                      (S = []),
                      module381.RSM.isSupportOrderSegmentClean()
                        ? ((v = module23.default(f, 2)), (M = v[1]), (S = M.segments))
                        : ((w = module23.default(f, 3)), (y = w[2]), (S = y)),
                      console.log('data item segments - ' + JSON.stringify(S)),
                      !n.isSegmentClean(S))
                    ) {
                      b.next = 14;
                      break;
                    }

                    return b.abrupt('return', true);

                  case 14:
                    return b.abrupt('return', false);

                  case 17:
                    b.prev = 17;
                    b.t0 = b.catch(0);
                    this.showToast(module500.robot_communication_exception);
                    console.log('fetchTimerDetail  error: ' + ('object' == typeof b.t0 ? JSON.stringify(b.t0) : b.t0));
                    return b.abrupt('return', false);

                  case 22:
                  case 'end':
                    return b.stop();
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
          var t = module381.RSM.currentMapId;
          if (1 == module1329.MM.maps.length && 1 == module1329.MM.mapCountMax) t = module1329.MM.maps[0].id;
          this.manualSegmentMap(t);
        },
      },
      {
        key: 'manualSegmentMap',
        value: function (t) {
          var n = this;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    setTimeout(function () {
                      n.startLoading();
                    }, 100);
                    o.prev = 1;
                    o.next = 4;
                    return regeneratorRuntime.default.awrap(
                      module414.default.manualSegmentMap(
                        module390.default.isMultiFloorSupported()
                          ? {
                              map_flag: t,
                            }
                          : []
                      )
                    );

                  case 4:
                    module1797.MapListDataProvider.syncSmartSceneIfNeeded();
                    module1329.MM.getMap(true);
                    this.updateMap();
                    this.endLoading();
                    o.next = 14;
                    break;

                  case 11:
                    o.prev = 11;
                    o.t0 = o.catch(1);
                    this.endLoading();

                  case 14:
                  case 'end':
                    return o.stop();
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
          var n, o;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    if (!(null == (n = this.mapView))) n.resetSelectBlocks();
                    this.startLoading();
                    s.prev = 2;
                    s.next = 5;
                    return regeneratorRuntime.default.awrap(
                      module414.default.manualSegmentMap(
                        module390.default.isMultiFloorSupported()
                          ? {
                              map_flag: t,
                            }
                          : []
                      )
                    );

                  case 5:
                    module1797.MapListDataProvider.syncSmartSceneIfNeeded();
                    module1329.MM.getMap(true);
                    if (!(null == (o = this.mapView))) o.getRoomNameListInMap();
                    module12.DeviceEventEmitter.emit(module418.NotificationKeys.DidReceiveSpecialEvent, {
                      data: module418.EventKeys.MapSegmentsDidChange,
                    });
                    module12.DeviceEventEmitter.emit(module418.NotificationKeys.DidReceiveSpecialEvent, {
                      data: module418.EventKeys.SegmentCustomModeDidChange,
                    });
                    module12.DeviceEventEmitter.emit(module418.NotificationKeys.DidReceiveSpecialEvent, {
                      data: module418.EventKeys.CleanSequenceDidChange,
                    });
                    this.endLoading();
                    s.next = 17;
                    break;

                  case 14:
                    s.prev = 14;
                    s.t0 = s.catch(2);
                    this.endLoading();

                  case 17:
                  case 'end':
                    return s.stop();
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
                    if (this.mapView) this.mapView.setState(I({}, module1329.MM.mapData));

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
            n,
            o,
            s,
            c,
            l = this;
          return regeneratorRuntime.default.async(
            function (p) {
              for (;;)
                switch ((p.prev = p.next)) {
                  case 0:
                    if (this.mapView) {
                      p.next = 3;
                      break;
                    }

                    this.showToast(module500.map_edit_split_no_map);
                    return p.abrupt('return');

                  case 3:
                    if (1 == this.mapView.getCurrentSelectBlock().length) {
                      p.next = 7;
                      break;
                    }

                    this.showToast(module500.map_edit_split_restriction);
                    return p.abrupt('return');

                  case 7:
                    if (!(undefined !== this.mapView.state.map.data.blockNum && this.mapView.state.map.data.blockNum > 15)) {
                      p.next = 10;
                      break;
                    }

                    this.showToast(module500.map_edit_split_restriction_num);
                    return p.abrupt('return');

                  case 10:
                    if (null != (o = null == (t = this.mapView) ? undefined : t.getSplitParams())) {
                      p.next = 14;
                      break;
                    }

                    this.showToast(module500.map_edit_split_no_map);
                    return p.abrupt('return');

                  case 14:
                    if (!o.error) {
                      p.next = 17;
                      break;
                    }

                    this.showToast(o.error);
                    return p.abrupt('return');

                  case 17:
                    if (o.info) {
                      p.next = 20;
                      break;
                    }

                    this.showToast(module500.map_edit_split_restriction_point_illegal);
                    return p.abrupt('return');

                  case 20:
                    this.editMenu.hideConfirmMenu();
                    if (!(null == (n = this.mapView))) n.resetSelectBlocks();
                    module1404.setTimeout(function () {
                      return l.startLoading();
                    }, 100);
                    p.prev = 23;
                    p.next = 26;
                    return regeneratorRuntime.default.awrap(module414.default.splitSegment(o.info));

                  case 26:
                    module1797.MapListDataProvider.syncSmartSceneIfNeeded();
                    module1329.MM.getMap(true);
                    if (!(null == (s = this.mapView))) s.getRoomNameListInMap();
                    module12.DeviceEventEmitter.emit(module418.NotificationKeys.DidReceiveSpecialEvent, {
                      data: module418.EventKeys.MapSegmentsDidChange,
                    });
                    module12.DeviceEventEmitter.emit(module418.NotificationKeys.DidReceiveSpecialEvent, {
                      data: module418.EventKeys.SegmentCustomModeDidChange,
                    });
                    module12.DeviceEventEmitter.emit(module418.NotificationKeys.DidReceiveSpecialEvent, {
                      data: module418.EventKeys.CleanSequenceDidChange,
                    });
                    p.next = 38;
                    break;

                  case 34:
                    p.prev = 34;
                    p.t0 = p.catch(23);
                    c = module1410.default.errorText(p.t0.data.error ? p.t0.data.error.code : 0);
                    this.showToast(c);

                  case 38:
                    p.prev = 38;
                    this.resetActionStatus();
                    this.endLoading();
                    return p.finish(38);

                  case 42:
                  case 'end':
                    return p.stop();
                }
            },
            null,
            this,
            [[23, 34, 38, 42]],
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
            n,
            o,
            s,
            c,
            l,
            p = this;
          return regeneratorRuntime.default.async(
            function (h) {
              for (;;)
                switch ((h.prev = h.next)) {
                  case 0:
                    if (this.mapView) {
                      h.next = 3;
                      break;
                    }

                    this.showToast(module500.map_edit_merge_no_map);
                    return h.abrupt('return');

                  case 3:
                    if (!((n = (null == (t = this.mapView) ? undefined : t.getCurrentSelectBlock()) || []).length < 2)) {
                      h.next = 9;
                      break;
                    }

                    this.showToast(module500.map_edit_merge_restriction);
                    return h.abrupt('return');

                  case 9:
                    if (this.isMergeValid(n)) {
                      h.next = 14;
                      break;
                    }

                    this.showToast(module500.map_edit_merge_restriction);
                    return h.abrupt('return');

                  case 14:
                    if (!(null == (o = this.editMenu))) o.hideConfirmMenu();
                    if (!(null == (s = this.mapView))) s.resetSelectBlocks();
                    module1404.setTimeout(function () {
                      return p.startLoading();
                    }, 100);
                    h.prev = 17;
                    h.next = 20;
                    return regeneratorRuntime.default.awrap(module414.default.mergeSegment(n));

                  case 20:
                    module1797.MapListDataProvider.syncSmartSceneIfNeeded();
                    module1329.MM.getMap(true);
                    if (!(null == (c = this.mapView))) c.getRoomNameListInMap();
                    module12.DeviceEventEmitter.emit(module418.NotificationKeys.DidReceiveSpecialEvent, {
                      data: module418.EventKeys.MapSegmentsDidChange,
                    });
                    module12.DeviceEventEmitter.emit(module418.NotificationKeys.DidReceiveSpecialEvent, {
                      data: module418.EventKeys.SegmentCustomModeDidChange,
                    });
                    module12.DeviceEventEmitter.emit(module418.NotificationKeys.DidReceiveSpecialEvent, {
                      data: module418.EventKeys.CleanSequenceDidChange,
                    });
                    h.next = 32;
                    break;

                  case 28:
                    h.prev = 28;
                    h.t0 = h.catch(17);
                    l = module1410.default.errorText(h.t0.data.error ? h.t0.data.error.code : 0);
                    this.showToast(l);

                  case 32:
                    h.prev = 32;
                    this.resetActionStatus();
                    this.endLoading();
                    return h.finish(32);

                  case 36:
                  case 'end':
                    return h.stop();
                }
            },
            null,
            this,
            [[17, 28, 32, 36]],
            Promise
          );
        },
      },
      {
        key: 'setNewRoomName',
        value: function (t, n, o) {
          var s,
            c,
            l = this;
          return regeneratorRuntime.default.async(
            function (p) {
              for (;;)
                switch ((p.prev = p.next)) {
                  case 0:
                    if (((this.editedRoom = true), this.mapView.checkAppVersion())) {
                      p.next = 4;
                      break;
                    }

                    this.showAppVersionNoWorkAlert();
                    return p.abrupt('return');

                  case 4:
                    s = {};

                    try {
                      c = this.mapView.state.roomNameList;
                      module393.getRoomList(function (p, h) {
                        var f, S, v, _, w, y, b, k;

                        return regeneratorRuntime.default.async(
                          function (N) {
                            for (;;)
                              switch ((N.prev = N.next)) {
                                case 0:
                                  if (!p) {
                                    N.next = 56;
                                    break;
                                  }

                                  f = 0;

                                case 2:
                                  if (!(f < h.length)) {
                                    N.next = 16;
                                    break;
                                  }

                                  S = h[f].name;
                                  v = h[f].roomId;
                                  _ = 0;

                                case 5:
                                  if (!(_ < c.length)) {
                                    N.next = 12;
                                    break;
                                  }

                                  if (v != c[_][0]) {
                                    N.next = 9;
                                    break;
                                  }

                                  c[_][1] = S;
                                  return N.abrupt('continue', 9);

                                case 9:
                                  _++;
                                  N.next = 5;
                                  break;

                                case 12:
                                  s[S] = v;

                                case 13:
                                  f++;
                                  N.next = 2;
                                  break;

                                case 16:
                                  if ('' != t) {
                                    N.next = 22;
                                    break;
                                  }

                                  console.log('NewRoomName Empty.');
                                  c[n][0] = -1;
                                  c[n][1] = -1;
                                  l.mapView.setSingleRoomName(n, -1, -1);
                                  return N.abrupt('return');

                                case 22:
                                  if (undefined === s[t]) {
                                    N.next = 38;
                                    break;
                                  }

                                  w = l.mapView.state.roomNameList;
                                  y = 0;

                                case 25:
                                  if (!(y < w.length)) {
                                    N.next = 32;
                                    break;
                                  }

                                  if (y == n || w[y][1] != t) {
                                    N.next = 29;
                                    break;
                                  }

                                  l.showToast(module500.room_name_already_in_use);
                                  return N.abrupt('return');

                                case 29:
                                  y++;
                                  N.next = 25;
                                  break;

                                case 32:
                                  c[n][0] = s[t];
                                  c[n][1] = t;
                                  c[n][2] = o;
                                  l.mapView.setSingleRoomName(n, t, s[t], o);
                                  N.next = 54;
                                  break;

                                case 38:
                                  N.prev = 38;
                                  N.next = 41;
                                  return regeneratorRuntime.default.awrap(module393.addNewRoomWithName(t));

                                case 41:
                                  b = N.sent;
                                  k = b.roomId;
                                  c[n][0] = k;
                                  c[n][1] = t;
                                  c[n][2] = o;
                                  module1329.MM.allServerNames.push(t);
                                  l.mapView.setSingleRoomName(n, t, k, o, true);
                                  N.next = 53;
                                  break;

                                case 50:
                                  N.prev = 50;
                                  N.t0 = N.catch(38);
                                  l.showAddNewNameError(N.t0);

                                case 53:
                                  return N.abrupt('return');

                                case 54:
                                  N.next = 57;
                                  break;

                                case 56:
                                  console.warn('cannot get room list');

                                case 57:
                                case 'end':
                                  return N.stop();
                              }
                          },
                          null,
                          null,
                          [[38, 50]],
                          Promise
                        );
                      });
                    } catch (t) {
                      console.log('getRoomNameMapping  error: ' + ('object' == typeof t ? JSON.stringify(t) : t));
                    }

                  case 6:
                  case 'end':
                    return p.stop();
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
        key: 'showAddNewNameError',
        value: function (t) {
          if (module393.isMiApp)
            t && ('exceed room max count' == t.message || (t.message.error && -105 == t.message.error.code))
              ? globals.showToast(module500.room_count_reach_limit)
              : t && 'room name too long' == t.message
              ? globals.showToast(module500.floor_map_name_too_long)
              : t && t.message && t.message.error && t.message.error.localDescription
              ? globals.showToast(t.message.error.localDescription)
              : t && t.message
              ? globals.showToast(t.message)
              : globals.showToast(module500.naming_failed);
          else if (!t || ('userinfo.err.room.exceed.limit' != t.code && -103 != t.code))
            (t && 'userinfo.err.duplicate.name' == t.code) || -102 == t.code ? globals.showToast(module500.room_already_exist) : globals.showToast(module500.naming_failed);
          else globals.showToast(module500.room_count_reach_limit);
        },
      },
      {
        key: 'showAppVersionNoWorkAlert',
        value: function () {
          var t,
            n = this;
          if (!(null == (t = globals.Alert)))
            t.alert(module500.localization_strings_Setting_RemoteControlPage_49, module500.localization_strings_Setting_RemoteControlPage_50, [
              {
                text: module500.localization_strings_Setting_RemoteControlPage_51,
                onPress: function () {
                  return n.props.navigation.pop();
                },
              },
            ]);
        },
      },
      {
        key: 'canAutoSplitButton',
        value: function () {
          return this.state.mapStatus == module381.MapStatus.Has_WithoutSegments && -1 != module381.RSM.currentMapId;
        },
      },
      {
        key: 'canReSplitButton',
        value: function () {
          return module390.default.isReSegmentSupported() && this.state.mapStatus == module381.MapStatus.Has_WithSegments;
        },
      },
      {
        key: 'isCustomName',
        value: function () {
          return this.state.action == module1390.EditAction.Name;
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
          var t = module381.RSM.isSupportAutoSplitSegments(),
            n = module381.RSM.mapStatus != module381.MapStatus.None,
            o = module381.RSM.isReadyToCmd() || module381.RSM.isChargingOnDock(),
            s = '';
          if (t) n ? o || (s = module500.auto_split_will_trigger_after_cleaning_and_charing) : (s = module500.zone_will_auto_split_when_finishing_clean);
          else s = module500.localization_strings_Setting_RemoteControlPage_54;
          if (t && n && o) this.handleManualSegmentMap();
          else
            setTimeout(function () {
              var t,
                n = {
                  text: module500.localization_strings_Setting_RemoteControlPage_51,
                };
              if (!(null == (t = globals.Alert))) t.alert('', s, [n]);
            }, 100);
        },
      },
      {
        key: 'showRoomNameView',
        value: function () {
          var t,
            n,
            o = this;

          if (!this.passNameMenuParams()) {
            if (!(null == (t = this.mapView))) t.resetSelectBlocks();
            module1329.MM.updateRoomNameMapping(function (t) {
              if (t && module393.isMiApp) o.showToast('' + ('object' == typeof t ? JSON.stringify(t) : t));
            });
            return void this.showToast(module500.localization_strings_Setting_CleanModePage_3);
          }

          if (1 == ((this.mapView && this.mapView.blockSequenceList) || []).length) {
            this.setReSegmentButtonVisible(false);
            if (!(null == (n = this.roomNameView))) n.show();
          } else this.showToast(module500.map_edit_name_select_more_segment_tip);
        },
      },
      {
        key: 'passNameMenuParams',
        value: function () {
          var t = [],
            n = -1,
            o = -1,
            s = 0;

          if (this.mapView) {
            var u,
              c = (null == (u = this.mapView) ? undefined : u.getCurrentSelectBlock()) || [];

            if ((1 == (null == c ? undefined : c.length) && (n = c[0]), module1329.MM.allServerNames && 0 != module1329.MM.allServerNames.length)) {
              if (-1 != n) {
                var l = this.mapView.state.roomNameList,
                  p = l[n][1];
                if (3 == l[n].length) s = l[n][2];

                for (var h = 0; h < module1329.MM.allServerNames.length; h++) {
                  var f = module1329.MM.allServerNames[h];

                  if (p == f) {
                    o = h;
                    t.push({
                      name: f,
                      used: false,
                    });
                  } else
                    t.push({
                      name: f,
                      used: false,
                    });
                }
              }

              this.roomNameView.setNamesAndSelectedIndex(t, o, s);
              return true;
            }

            if (null != module1329.MM.allServerNames && 0 == module1329.MM.allServerNames.length) {
              this.roomNameView.setNamesAndSelectedIndex(t, o, s);
              return true;
            }

            this.roomNameView.setNamesAndSelectedIndex(t, o, s);
          } else this.roomNameView.setNamesAndSelectedIndex(t, o, s);

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
          if (this.loadingView) this.loadingView.showWithTextAndOverTimer(module500.rubys_main_diag_update_map, t);
        },
      },
      {
        key: 'startLoading',
        value: function () {
          if (this.loadingView) this.loadingView.showWithText(module500.rubys_main_diag_update_map);
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
        key: 'render',
        value: function () {
          var t = this,
            n = this.context.theme,
            o = React.default.createElement(module1330.MapView, {
              style: module1410.MapEditCommonStyles.map,
              parent: this,
              ref: function (n) {
                return (t.mapView = n);
              },
              left: module1410.MapEditCommonStyles.mapLeft,
              right: module1410.MapEditCommonStyles.mapRight,
              top: module1410.MapEditCommonStyles.mapTop,
              bottom: module1410.MapEditCommonStyles.mapBottom,
              mapMode: module1153.MAP_MODE_MAP_EDIT,
              editAction: this.state.action,
              inBlockMode: true,
              hideAccessory: true,
              blockBubbleShowInfo: module1330.BlockBubbleShowInfo.DISPLAYNAME,
              selectedBlocksDidChange: this.handleSelectedBlocksDidChange,
            }),
            s = (this.canReSplitButton() || this.canAutoSplitButton()) && this.state.shouldShowReSegmentButton && this.state.mapStatus != module381.MapStatus.None,
            u = React.default.createElement(module385.TopImageButton, {
              funcId: 'reset_order_btn',
              style: module1410.MapEditCommonStyles.refreshMapSegmentIndicator,
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
              title: module500.refresh_map_segments,
              fontSize: 12,
              textTop: 5,
              numberOfLines: 2,
              maxTextWidth: 80,
            }),
            c =
              this.state.mapStatus == module381.MapStatus.None || (this.state.mapStatus == module381.MapStatus.Has_WithoutSegments && -1 == module381.RSM.currentMapId)
                ? module1410.default.getNoMapTipView(this.state.mapStatus)
                : o,
            l = module390.default.isSupportRoomTag();
          return React.default.createElement(
            module12.View,
            {
              style: [
                module1410.MapEditCommonStyles.root,
                {
                  height: module394.default.sharedCache().ScreenHeight - module391.default.statusbarHeight(),
                  backgroundColor: n.mapEdit.backgroundColor,
                },
              ],
            },
            c,
            React.default.createElement(module1390.default, {
              type: module1390.MenuType.Menu_Zone,
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
              onPressNameButton: this.onPressRoomNameButton,
              editMapSegmentsIsDisable: this.editMapSegmentsIsDisable,
              confirmMenuConfirmButtonEnabled: this.confirmMenuConfirmButtonEnabled,
            }),
            React.default.createElement(module1962.default, {
              ref: function (n) {
                t.roomNameView = n;
              },
              supportTag: l,
              onPressConfirmButton: this.onPressRoomNameConfirmButton,
              onPressCloseButton: this.onPressRoomNameSelectClose,
              onDealTagDuplicateName: this.onDealTagDuplicateName,
            }),
            s && u,
            React.default.createElement(module1802.default, {
              ref: function (n) {
                t.newSwitchGuideView = n;
              },
              isModal: true,
              parent: this,
              bgImage: n.guideImages.split,
              topTitle: module500.map_edit_zone_title,
              context: module500.map_edit_zone_zone_info,
              buttonInfo: [module500.localization_strings_Setting_RemoteControlPage_51],
              buttonFuncId: ['map_edit_zone_guide_ok'],
            }),
            React.default.createElement(module385.CancelableLoadingView, {
              loadingAccessibilityLabelKey: 'map_edit_zone_info_view_loading',
              closeAccessibilityLabelKey: 'map_edit_zone_info_view_loading_close',
              ref: function (n) {
                t.loadingView = n;
              },
              onOverTimer: function () {
                globals.showToast(module500.map_object_ignore_failed);
              },
              showButton: true,
            })
          );
        },
      },
    ]);
    return A;
  })(React.Component);

exports.default = H;
H.contextType = module515.AppConfigContext;
