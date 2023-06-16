var module50 = require('./50'),
  module23 = require('@babel/runtime/helpers/slicedToArray'),
  regeneratorRuntime = require('regenerator-runtime'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module381 = require('./381'),
  module414 = require('./414'),
  module419 = require('./419'),
  module385 = require('./385'),
  module391 = require('./391'),
  module415 = require('./415'),
  module390 = require('./390'),
  module1120 = require('./1120'),
  module2009 = require('./2009'),
  module1268 = require('./1268'),
  module1055 = require('./1055'),
  module1271 = require('./1271'),
  module394 = require('./394'),
  module1121 = require('./1121'),
  module1269 = require('./1269'),
  module1122 = require('./1122'),
  module1057 = require('./1057');

function D(t, n) {
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
    var s = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      D(Object(s), true).forEach(function (n) {
        module50.default(t, n, s[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      D(Object(s)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(s, n));
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

var module1265 = require('./1265'),
  module393 = require('./393'),
  j = module12.NativeModules.RRPluginSDK,
  module1340 = require('./1340'),
  module505 = require('./505').strings,
  H = (function (t) {
    module7.default(D, t);

    var n = D,
      module50 = O(),
      B = function () {
        var t,
          s = module11.default(n);

        if (module50) {
          var u = module11.default(this).constructor;
          t = Reflect.construct(s, arguments, u);
        } else t = s.apply(this, arguments);

        return module9.default(this, t);
      };

    function D(t) {
      var n;
      module4.default(this, D);

      (n = B.call(this, t)).onNavigationBackPress = function () {
        n.props.navigation.pop();
      };

      n.onNavigationGuidePress = function () {
        if (n.newSwitchGuideView) n.newSwitchGuideView.show();
      };

      n.handleSelectedBlocksDidChange = function (t) {
        if (n.isCustomName() && 1 == t.length) {
          n.editMenu.showConfirmMenu(module505.map_edit_name_select_more_segment_tip);
          return void n.showRoomNameView();
        }
      };

      n.onResegmentButtonPressed = function () {
        if (n.state.mapStatus != module381.MapStatus.None)
          if (module381.RSM.isRunning)
            module1122.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
              n.showToast(module505.robot_communication_exception);
            });
          else if (n.canAutoSplitButton()) {
            var t;
            if (!(null == (t = globals.Alert)))
              t.customAlert(
                module505.mannual_split_map_tip,
                '',
                function () {
                  return n.onPressAutoSplitButton();
                },
                null,
                {
                  confirmTitle: module505.localization_strings_Main_Error_ErrorDetailPage_3,
                }
              );
          } else {
            var o;
            if (!(null == (o = globals.Alert)))
              o.alert(module505.refresh_segments_alert_hint, '', [
                {
                  text: module505.localization_strings_Main_MainPage_11,
                  onPress: function () {},
                },
                {
                  text: module505.rubys_location_confirm_button_confirm,
                  onPress: function () {
                    n.refreshMapSegments();
                  },
                },
              ]);
          }
      };

      n.onPressMergeZoneButton = function () {
        n.setState({
          action: module1120.EditAction.Merge,
        });
        n.setReSegmentButtonVisible(false);
      };

      n.onPressSplitZoneButton = function () {
        n.setState({
          action: module1120.EditAction.Split,
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
        for (var t, o, s, u = [], l = null != (t = null == (o = n.mapView) ? undefined : null == (s = o.state) ? undefined : s.roomNameList) ? t : [], c = 0; c < l.length; c++)
          if (-1 != l[c][0]) {
            var p = 3 == l[c].length ? l[c][2] : 0;
            p = 'string' == typeof p ? parseInt(p) : p;
            if (module393.isMiApp)
              u.push({
                miRoomId: l[c][0] + '',
                robotRoomId: c,
                robotTagId: p,
              });
            else
              u.push({
                iotRoomId: l[c][0] + '',
                robotRoomId: c,
                robotTagId: p,
              });
          }

        if (u.length <= 0) n.showToast(module505.map_edit_name_select_more_segment_tip);
        else {
          n.editMenu.hideConfirmMenu();
          n.startLoading();
          n.isUpdatingRoomName = true;
          module415.default
            .nameSegment(u)
            .then(function () {
              module414.MM.updateRoomNameMapping(function (t) {
                if (t) n.showToast(module505.naming_failed);
                n.endLoading();
              });
            })
            .catch(function (t) {
              n.endLoading();
              n.showToast(module505.naming_failed);
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
        if (j) {
          if (!module393.isRoomNameSupported()) return void n.showToast(module505.map_object_app_version_tip);
        } else if (module393.MiApiLevel < module393.androidRoomApiLevel) return void n.showToast(module505.localization_strings_Setting_RemoteControlPage_50);

        if (n.mapView) {
          var t;
          if (!n.mapView.checkAppVersion()) return void n.showAppVersionNoWorkAlert();
          var o,
            s = ((null == (t = n.mapView) ? undefined : t.getCurrentSelectBlock()) || []).length;

          if (0 == s || 1 == s) {
            n.setReSegmentButtonVisible(false);
            if (!(null == (o = n.editMenu))) o.showConfirmMenu(module505.map_edit_name_select_more_segment_tip);
            n.setState({
              action: module1120.EditAction.Name,
            });
            if (1 == s) n.showRoomNameView();
          } else s > 1 && n.showToast(module505.map_edit_name_select_more_segment_tip);
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
        else n.showToast(module505.map_edit_name_select_more_segment_tip);
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
          var l = o, c = 0;
          -1 != u.indexOf(l) &&
          l != s &&
          ((l = 0 == c ? module1057.RoomTagInfo[t].name : '' + module1057.RoomTagInfo[t].name + c),
          c++,
          l == o && (l = 0 == c ? module1057.RoomTagInfo[t].name : '' + module1057.RoomTagInfo[t].name + c),
          20 != c);

        );

        return l;
      };

      n.initAction = n.props.navigation.state.params.action || module1120.EditAction.None;
      n.state = {
        shouldShowObstaclesType: false,
        shouldShowReSegmentButton:
          module390.default.isReSegmentSupported() || (module381.RSM.mapStatus == module381.MapStatus.Has_WithoutSegments && -1 != module381.RSM.currentMapId),
        action: n.initAction,
        mapStatus: module381.RSM.mapStatus,
        overTimer: module1265.OverTimer_Six,
      };
      n.mapSegmentHasShow = false;
      n.editedRoom = false;
      n.currentSegmentStatusQueryCount = 0;
      n.segmentOperationLock = false;
      n.isLastRobotStatusLocked = module381.RSM.state == module381.RobotState.LOCKED;
      n.unMount = false;
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
          this.initAction = this.props.navigation.getParam('initAction', module1120.EditAction.None);
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
                    this.updateMap();
                    this.registListeners();
                    t = this.mapView;
                    module1340.setTimeout(function () {
                      if (t) t.getRoomNameListInMap();
                    }, 1e3);
                    this.showGuideViewIfNeeded();
                    module1340.setTimeout(function () {
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
              module1271.default.guideButton(this.onNavigationGuidePress, function (n) {
                t.guideButton = n;
              }),
            ];
          module1271.default.setNavigation(this, globals.isRTL ? n.reverse() : n, this.onNavigationBackPress);
        },
      },
      {
        key: 'initActionShow',
        value: function () {
          if (this.initAction == module1120.EditAction.Name) {
            var t;
            if (this.state.mapStatus == module381.MapStatus.Has_WithSegments)
              if ((module393.isMiApp || module390.default.isRoomNameSupported()) && !module391.default.isShareUser()) {
                if (!(null == (t = this.editMenu)))
                  t.setState({
                    currentAction: module1120.EditAction.Name,
                  });
                this.onPressRoomNameButton();
              }
            this.initAction = module1120.EditAction.None;
          }
        },
      },
      {
        key: 'registListeners',
        value: function () {
          var t = this,
            n = this.mapView;
          this.mapListener = module12.DeviceEventEmitter.addListener(module419.NotificationKeys.MapDidUpdate, function (o) {
            if (t.isUpdatingRoomName || t.editMenu.state.tip) {
              if (!t.isUpdatingRoomName) t.updateMap();
            } else {
              if (n) n.getRoomNameListInMap();
              t.updateMap();
            }
          });
          this.specialEventListener = module12.DeviceEventEmitter.addListener(module419.NotificationKeys.DidReceiveSpecialEvent, function (n) {
            if (n.data == module419.EventKeys.MapSegmentsDidChange) t.updateMap();
          });
          this.robotStatusListener = module12.DeviceEventEmitter.addListener(module419.NotificationKeys.RobotStatusDidUpdate, function (n) {
            t.setState({
              mapStatus: module381.RSM.mapStatus,
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
          if (t) this.notifyMapZoneEdited();
          else globals.showToast(module505.map_object_ignore_failed);
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
                    t = module419.StorageKeys.EditZonebyGuide;
                    s.next = 3;
                    return regeneratorRuntime.default.awrap(module419.GetStorageKey(t));

                  case 3:
                    if (((n = s.sent), !!n)) {
                      s.next = 11;
                      break;
                    }

                    s.next = 8;
                    return regeneratorRuntime.default.awrap(module419.SetStorageKey(t, t));

                  case 8:
                    module1340.setTimeout(function () {
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
                    return regeneratorRuntime.default.awrap(module414.MM.getCustomCleanMode());

                  case 2:
                    if ((t = module414.MM.customCleanModes) && t.length > 0) this.showSegmentEditPrompt();

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
                    return regeneratorRuntime.default.awrap(module414.MM.getCleanSequence());

                  case 2:
                    if ((t = module414.MM.cleanSequence) && t.length > 0) this.showSegmentEditPrompt();

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
        key: 'showSegmentEditPrompt',
        value: function () {
          var t = this;

          if (!this.mapSegmentHasShow) {
            this.mapSegmentHasShow = true;
            module1340.setTimeout(function () {
              module505.localization_strings_Setting_RemoteControlPage_51;
              if (t.editMenu)
                t.editMenu.setState({
                  tip: module505.map_edit_segment_prompt,
                });
            }, 100);
          }
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
                    this.showToast(module505.robot_communication_exception);

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
                    return regeneratorRuntime.default.awrap(module415.default.getTimer());

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
                    this.showToast(module505.robot_communication_exception);
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
            var o = module23.default(t, 3)[2],
              u = module23.default(o, 2)[1],
              l = [];
            if (module381.RSM.isSupportOrderSegmentClean()) l = module23.default(u, 2)[1].segments;
            else l = module23.default(u, 3)[2];
            console.log('segments - -----' + JSON.stringify(l));
            n.isSegmentClean(l);
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
                    return regeneratorRuntime.default.awrap(module415.default.getTimerListSummary());

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
                    this.showToast(module505.robot_communication_exception);

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
          var n, o, l, c, p, h, f, S, v, w, M, b;
          return regeneratorRuntime.default.async(
            function (y) {
              for (;;)
                switch ((y.prev = y.next)) {
                  case 0:
                    y.prev = 0;
                    n = this;
                    y.next = 4;
                    return regeneratorRuntime.default.awrap(module415.default.getTimerDetail(t));

                  case 4:
                    if (
                      ((o = y.sent),
                      console.log('fetchTimerDetail - ' + JSON.stringify(o)),
                      (l = o.result[0]),
                      (c = module23.default(l, 3)),
                      (p = c[2]),
                      (h = module23.default(p, 2)),
                      (f = h[1]),
                      (S = []),
                      module381.RSM.isSupportOrderSegmentClean()
                        ? ((v = module23.default(f, 2)), (w = v[1]), (S = w.segments))
                        : ((M = module23.default(f, 3)), (b = M[2]), (S = b)),
                      console.log('data item segments - ' + JSON.stringify(S)),
                      !n.isSegmentClean(S))
                    ) {
                      y.next = 14;
                      break;
                    }

                    return y.abrupt('return', true);

                  case 14:
                    return y.abrupt('return', false);

                  case 17:
                    y.prev = 17;
                    y.t0 = y.catch(0);
                    this.showToast(module505.robot_communication_exception);
                    console.log('fetchTimerDetail  error: ' + ('object' == typeof y.t0 ? JSON.stringify(y.t0) : y.t0));
                    return y.abrupt('return', false);

                  case 22:
                  case 'end':
                    return y.stop();
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
        key: 'updateMap',
        value: function () {
          var t;
          if (!(null == (t = this.mapView)))
            t.setState(
              I(
                I({}, module414.MM.mapData),
                {},
                {
                  robotStatus: module381.RSM.state,
                }
              )
            );
        },
      },
      {
        key: 'notifyMapZoneEdited',
        value: function () {
          var t;
          if (!(null == (t = this.mapView))) t.getRoomNameListInMap();
          module12.DeviceEventEmitter.emit(module419.NotificationKeys.DidReceiveSpecialEvent, {
            data: module419.EventKeys.MapSegmentsDidChange,
          });
          module12.DeviceEventEmitter.emit(module419.NotificationKeys.DidReceiveSpecialEvent, {
            data: module419.EventKeys.SegmentCustomModeDidChange,
          });
          module12.DeviceEventEmitter.emit(module419.NotificationKeys.DidReceiveSpecialEvent, {
            data: module419.EventKeys.CleanSequenceDidChange,
          });
        },
      },
      {
        key: 'getNewMap',
        value: function () {
          module1269.MapListDataProvider.syncSmartSceneIfNeeded();
          module414.MM.getMapAfterSaveMap();
        },
      },
      {
        key: 'showAppVersionNoWorkAlert',
        value: function () {
          var t,
            n = this;
          if (!(null == (t = globals.Alert)))
            t.alert(module505.localization_strings_Setting_RemoteControlPage_49, module505.localization_strings_Setting_RemoteControlPage_50, [
              {
                text: module505.localization_strings_Setting_RemoteControlPage_51,
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
          return this.state.action == module1120.EditAction.Name;
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
        key: 'handleManualSegmentMap',
        value: function () {
          var t,
            n = this;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    t = module381.RSM.currentMapId;
                    if (1 == module414.MM.maps.length && 1 == module414.MM.mapCountMax) t = module414.MM.maps[0].id;
                    setTimeout(function () {
                      n.startLoading();
                    }, 100);
                    o.prev = 3;
                    o.next = 6;
                    return regeneratorRuntime.default.awrap(
                      module415.default.manualSegmentMap(
                        module390.default.isMultiFloorSupported()
                          ? {
                              map_flag: t,
                            }
                          : []
                      )
                    );

                  case 6:
                    this.getNewMap();
                    this.updateMap();
                    this.endLoading();
                    o.next = 14;
                    break;

                  case 11:
                    o.prev = 11;
                    o.t0 = o.catch(3);
                    this.endLoading();

                  case 14:
                  case 'end':
                    return o.stop();
                }
            },
            null,
            this,
            [[3, 11]],
            Promise
          );
        },
      },
      {
        key: 'refreshMapSegments',
        value: function () {
          var t, n;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    n = module381.RSM.currentMapId;
                    if (1 == module414.MM.maps.length && 1 == module414.MM.mapCountMax) n = module414.MM.maps[0].id;
                    if (!(null == (t = this.mapView))) t.resetSelectBlocks();
                    this.startLoading();
                    o.prev = 4;
                    o.next = 7;
                    return regeneratorRuntime.default.awrap(
                      module415.default.manualSegmentMap(
                        module390.default.isMultiFloorSupported()
                          ? {
                              map_flag: n,
                            }
                          : []
                      )
                    );

                  case 7:
                    this.getNewMap();
                    this.notifyMapZoneEdited();
                    this.endLoading();
                    o.next = 15;
                    break;

                  case 12:
                    o.prev = 12;
                    o.t0 = o.catch(4);
                    this.endLoading();

                  case 15:
                  case 'end':
                    return o.stop();
                }
            },
            null,
            this,
            [[4, 12]],
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
            l = this;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    if (this.mapView) {
                      c.next = 3;
                      break;
                    }

                    this.showToast(module505.map_edit_split_no_map);
                    return c.abrupt('return');

                  case 3:
                    if (1 == this.mapView.getCurrentSelectBlock().length) {
                      c.next = 7;
                      break;
                    }

                    this.showToast(module505.map_edit_split_restriction);
                    return c.abrupt('return');

                  case 7:
                    if (!(undefined !== this.mapView.state.map.data.blockNum && this.mapView.state.map.data.blockNum > 15)) {
                      c.next = 10;
                      break;
                    }

                    this.showToast(module505.map_edit_split_restriction_num);
                    return c.abrupt('return');

                  case 10:
                    if (null != (o = null == (t = this.mapView) ? undefined : t.getSplitParams())) {
                      c.next = 14;
                      break;
                    }

                    this.showToast(module505.map_edit_split_no_map);
                    return c.abrupt('return');

                  case 14:
                    if (!o.error) {
                      c.next = 17;
                      break;
                    }

                    this.showToast(o.error);
                    return c.abrupt('return');

                  case 17:
                    if (o.info) {
                      c.next = 20;
                      break;
                    }

                    this.showToast(module505.map_edit_split_restriction_point_illegal);
                    return c.abrupt('return');

                  case 20:
                    this.editMenu.hideConfirmMenu();
                    if (!(null == (n = this.mapView))) n.resetSelectBlocks();
                    module1340.setTimeout(function () {
                      return l.startLoading();
                    }, 100);
                    c.prev = 23;
                    c.next = 26;
                    return regeneratorRuntime.default.awrap(module415.default.splitSegment(o.info));

                  case 26:
                    this.getNewMap();
                    this.notifyMapZoneEdited();
                    c.next = 34;
                    break;

                  case 30:
                    c.prev = 30;
                    c.t0 = c.catch(23);
                    s = module1271.default.errorText(c.t0.data.error ? c.t0.data.error.code : 0);
                    this.showToast(s);

                  case 34:
                    c.prev = 34;
                    this.resetActionStatus();
                    this.endLoading();
                    return c.finish(34);

                  case 38:
                  case 'end':
                    return c.stop();
                }
            },
            null,
            this,
            [[23, 30, 34, 38]],
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
            l,
            c = this;
          return regeneratorRuntime.default.async(
            function (p) {
              for (;;)
                switch ((p.prev = p.next)) {
                  case 0:
                    if (this.mapView) {
                      p.next = 3;
                      break;
                    }

                    this.showToast(module505.map_edit_merge_no_map);
                    return p.abrupt('return');

                  case 3:
                    if (!((n = (null == (t = this.mapView) ? undefined : t.getCurrentSelectBlock()) || []).length < 2)) {
                      p.next = 9;
                      break;
                    }

                    this.showToast(module505.map_edit_merge_restriction);
                    return p.abrupt('return');

                  case 9:
                    if (this.isMergeValid(n)) {
                      p.next = 14;
                      break;
                    }

                    this.showToast(module505.map_edit_merge_restriction);
                    return p.abrupt('return');

                  case 14:
                    if (!(null == (o = this.editMenu))) o.hideConfirmMenu();
                    if (!(null == (s = this.mapView))) s.resetSelectBlocks();
                    module1340.setTimeout(function () {
                      return c.startLoading();
                    }, 100);
                    p.prev = 17;
                    p.next = 20;
                    return regeneratorRuntime.default.awrap(module415.default.mergeSegment(n));

                  case 20:
                    this.getNewMap();
                    this.notifyMapZoneEdited();
                    p.next = 28;
                    break;

                  case 24:
                    p.prev = 24;
                    p.t0 = p.catch(17);
                    l = module1271.default.errorText(p.t0.data.error ? p.t0.data.error.code : 0);
                    this.showToast(l);

                  case 28:
                    p.prev = 28;
                    this.resetActionStatus();
                    this.endLoading();
                    return p.finish(28);

                  case 32:
                  case 'end':
                    return p.stop();
                }
            },
            null,
            this,
            [[17, 24, 28, 32]],
            Promise
          );
        },
      },
      {
        key: 'setNewRoomName',
        value: function (t, n, o) {
          var s,
            l,
            c = this;
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
                      l = this.mapView.state.roomNameList;
                      module393.getRoomList(function (p, h) {
                        var f, S, v, _, M, b, y, k;

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
                                  if (!(_ < l.length)) {
                                    N.next = 12;
                                    break;
                                  }

                                  if (v != l[_][0]) {
                                    N.next = 9;
                                    break;
                                  }

                                  l[_][1] = S;
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
                                  l[n][0] = -1;
                                  l[n][1] = -1;
                                  c.mapView.setSingleRoomName(n, -1, -1);
                                  return N.abrupt('return');

                                case 22:
                                  if (undefined === s[t]) {
                                    N.next = 38;
                                    break;
                                  }

                                  M = c.mapView.state.roomNameList;
                                  b = 0;

                                case 25:
                                  if (!(b < M.length)) {
                                    N.next = 32;
                                    break;
                                  }

                                  if (b == n || M[b][1] != t) {
                                    N.next = 29;
                                    break;
                                  }

                                  c.showToast(module505.room_name_already_in_use);
                                  return N.abrupt('return');

                                case 29:
                                  b++;
                                  N.next = 25;
                                  break;

                                case 32:
                                  l[n][0] = s[t];
                                  l[n][1] = t;
                                  l[n][2] = o;
                                  c.mapView.setSingleRoomName(n, t, s[t], o);
                                  N.next = 54;
                                  break;

                                case 38:
                                  N.prev = 38;
                                  N.next = 41;
                                  return regeneratorRuntime.default.awrap(module393.addNewRoomWithName(t));

                                case 41:
                                  y = N.sent;
                                  k = y.roomId;
                                  l[n][0] = k;
                                  l[n][1] = t;
                                  l[n][2] = o;
                                  module414.MM.allServerNames.push(t);
                                  c.mapView.setSingleRoomName(n, t, k, o, true);
                                  N.next = 53;
                                  break;

                                case 50:
                                  N.prev = 50;
                                  N.t0 = N.catch(38);
                                  c.showAddNewNameError(N.t0);

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
              ? globals.showToast(module505.room_count_reach_limit)
              : t && 'room name too long' == t.message
              ? globals.showToast(module505.floor_map_name_too_long)
              : t && t.message && t.message.error && t.message.error.localDescription
              ? globals.showToast(t.message.error.localDescription)
              : t && t.message
              ? globals.showToast(t.message)
              : globals.showToast(module505.naming_failed);
          else if (!t || ('userinfo.err.room.exceed.limit' != t.code && -103 != t.code))
            (t && 'userinfo.err.duplicate.name' == t.code) || -102 == t.code ? globals.showToast(module505.room_already_exist) : globals.showToast(module505.naming_failed);
          else globals.showToast(module505.room_count_reach_limit);
        },
      },
      {
        key: 'onPressAutoSplitButton',
        value: function () {
          var t = module381.RSM.isSupportAutoSplitSegments(),
            n = module381.RSM.mapStatus != module381.MapStatus.None,
            o = module381.RSM.isReadyToCmd() || module381.RSM.isChargingOnDock(),
            s = '';
          if (t) n ? o || (s = module505.auto_split_will_trigger_after_cleaning_and_charing) : (s = module505.zone_will_auto_split_when_finishing_clean);
          else s = module505.localization_strings_Setting_RemoteControlPage_54;
          if (t && n && o) this.handleManualSegmentMap();
          else
            setTimeout(function () {
              var t,
                n = {
                  text: module505.localization_strings_Setting_RemoteControlPage_51,
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
            module414.MM.updateRoomNameMapping(function (t) {
              if (t && module393.isMiApp) o.showToast('' + ('object' == typeof t ? JSON.stringify(t) : t));
            });
            return void this.showToast(module505.localization_strings_Setting_CleanModePage_3);
          }

          if (1 == ((this.mapView && this.mapView.blockSequenceList) || []).length) {
            this.setReSegmentButtonVisible(false);
            if (!(null == (n = this.roomNameView))) n.show();
          } else this.showToast(module505.map_edit_name_select_more_segment_tip);
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
              l = (null == (u = this.mapView) ? undefined : u.getCurrentSelectBlock()) || [];

            if ((1 == (null == l ? undefined : l.length) && (n = l[0]), module414.MM.allServerNames && 0 != module414.MM.allServerNames.length)) {
              if (-1 != n) {
                var c = this.mapView.state.roomNameList,
                  p = c[n][1];
                if (3 == c[n].length) s = c[n][2];

                for (var h = 0; h < module414.MM.allServerNames.length; h++) {
                  var f = module414.MM.allServerNames[h];

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

            if (null != module414.MM.allServerNames && 0 == module414.MM.allServerNames.length) {
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
          if (this.loadingView) this.loadingView.showWithTextAndOverTimer(module505.rubys_main_diag_update_map, t);
        },
      },
      {
        key: 'startLoading',
        value: function () {
          if (this.loadingView) this.loadingView.showWithText(module505.rubys_main_diag_update_map);
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
            o = React.default.createElement(module1055.MapView, {
              style: module1271.MapEditCommonStyles.map,
              parent: this,
              ref: function (n) {
                return (t.mapView = n);
              },
              left: module1271.MapEditCommonStyles.mapLeft,
              right: module1271.MapEditCommonStyles.mapRight,
              top: module1271.MapEditCommonStyles.mapTop,
              bottom: module1271.MapEditCommonStyles.mapBottom,
              mapMode: module1265.MAP_MODE_MAP_EDIT,
              editAction: this.state.action,
              inBlockMode: true,
              hideAccessory: true,
              blockBubbleShowInfo: module1055.BlockBubbleShowInfo.DISPLAYNAME,
              selectedBlocksDidChange: this.handleSelectedBlocksDidChange,
            }),
            s = (this.canReSplitButton() || this.canAutoSplitButton()) && this.state.shouldShowReSegmentButton && this.state.mapStatus != module381.MapStatus.None,
            u = React.default.createElement(module385.TopImageButton, {
              funcId: 'reset_order_btn',
              style: module1271.MapEditCommonStyles.refreshMapSegmentIndicator,
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
              title: module505.refresh_map_segments,
              fontSize: 12,
              textTop: 5,
              numberOfLines: 2,
              maxTextWidth: 80,
            }),
            l =
              this.state.mapStatus == module381.MapStatus.None || (this.state.mapStatus == module381.MapStatus.Has_WithoutSegments && -1 == module381.RSM.currentMapId)
                ? module1271.default.getNoMapTipView(this.state.mapStatus)
                : o,
            c = module390.default.isSupportRoomTag();
          return React.default.createElement(
            module12.View,
            {
              style: [
                module1271.MapEditCommonStyles.root,
                {
                  height: module394.default.sharedCache().ScreenHeight - module391.default.statusbarHeight(),
                  backgroundColor: n.mapEdit.backgroundColor,
                },
              ],
            },
            l,
            React.default.createElement(module1120.default, {
              type: module1120.MenuType.Menu_Zone,
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
            React.default.createElement(module2009.default, {
              ref: function (n) {
                t.roomNameView = n;
              },
              supportTag: c,
              onPressConfirmButton: this.onPressRoomNameConfirmButton,
              onPressCloseButton: this.onPressRoomNameSelectClose,
              onDealTagDuplicateName: this.onDealTagDuplicateName,
            }),
            s && u,
            React.default.createElement(module1268.default, {
              ref: function (n) {
                t.newSwitchGuideView = n;
              },
              isModal: true,
              parent: this,
              bgImage: n.guideImages.split,
              topTitle: module505.map_edit_zone_title,
              context: module505.map_edit_zone_zone_info,
              buttonInfo: [module505.localization_strings_Setting_RemoteControlPage_51],
              buttonFuncId: ['map_edit_zone_guide_ok'],
            }),
            React.default.createElement(module385.CancelableLoadingView, {
              loadingAccessibilityLabelKey: 'map_edit_zone_info_view_loading',
              closeAccessibilityLabelKey: 'map_edit_zone_info_view_loading_close',
              ref: function (n) {
                t.loadingView = n;
              },
              onOverTimer: function () {
                globals.showToast(module505.map_object_ignore_failed);
              },
              showButton: true,
            })
          );
        },
      },
    ]);
    return D;
  })(React.Component);

exports.default = H;
H.contextType = module1121.AppConfigContext;
