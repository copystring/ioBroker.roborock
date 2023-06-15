exports.default = function (t) {
  var n,
    w,
    y,
    W,
    G,
    L = module422.DMM.isTopazS,
    U = module381.RSM.hasConnectedWashDock || module381.RSM.isO2Dock() || module381.RSM.isO3Dock() || L;
  G =
    module393.isNewBottomControlSupported() && !module422.DMM.isGarnet
      ? module1499.default
      : module422.DMM.isGarnet
      ? module1497.default
      : U
      ? module1498.default
      : module1495.default;
  var K = React.useRef(),
    H = React.useRef(),
    z = React.useState(module381.RSM.isHomeButtonsEnabled()),
    Z = module23.default(z, 2),
    J = Z[0],
    V = Z[1],
    Q = React.useState(),
    j = module23.default(Q, 2),
    q = j[0],
    X = j[1],
    Y = React.useState(false),
    $ = module23.default(Y, 2),
    ee = $[0],
    te = $[1],
    ae = React.useState(false),
    ne = module23.default(ae, 2),
    oe = ne[0],
    re = ne[1],
    se = React.useState(A),
    le = module23.default(se, 2),
    ue = le[0],
    ce = le[1],
    ie = t.parent.mapView,
    Se = t.parent.sidebarMenu;
  React.useEffect(
    function () {
      if (oe)
        setTimeout(function () {
          return re(false);
        });
      var t = module12.DeviceEventEmitter.addListener(module418.NotificationKeys.BottomControlMenuNeedRefresh, function (t) {
        re(true);
        console.log('receive refresh', module381.RSM.mopModeId);
      });
      return function () {
        t.remove();
      };
    },
    [oe]
  );
  React.useEffect(
    function () {
      Se = t.parent.sidebarMenu;
      var n = module12.DeviceEventEmitter.addListener(module418.NotificationKeys.RobotStatusDidUpdate, function (n) {
        ie = t.parent.mapView;
        V(module381.RSM.isHomeButtonsEnabled());
        Re();
      });
      Re();
      var o = module12.DeviceEventEmitter.addListener(module418.NotificationKeys.BottomControlDoAction, function (t) {
        var n = t.cmd,
          o = t.data;

        if ('changeTab' == n) {
          ce(o);
          me(o);
        }
      });
      return function () {
        n.remove();
        o.remove();
      };
    },
    [ue, q]
  );

  var Re = function () {
      var n = ue,
        o = !module381.RSM.isBackDockWashingDusterMode() && module381.RSM.backDockResumeFlag == module381.BackDockResumeFlag.Has,
        s = module381.RSM.isBackDockWashingDusterMode() && module381.RSM.backDockResumeFlag == module381.BackDockResumeFlag.Has,
        l = module381.RSM.isPureCleaningMode() && module381.RSM.cleanResumeFlag != module381.CleanResumeFlag.None,
        u = module381.RSM.isPureMoppingMode() && module381.RSM.cleanResumeFlag != module381.CleanResumeFlag.None,
        c = (module381.RSM.isCleanMopCleaningMode() || module381.RSM.isCleanMopMoppingMode()) && module381.RSM.cleanResumeFlag != module381.CleanResumeFlag.None,
        R = o ? 'resume' : 'start',
        M = l ? 'resume' : 'start',
        p = u ? 'resume' : 'start',
        _ = c ? 'resume' : 'start',
        f = s ? 'resume' : 'start',
        C = 'startCharge',
        k = module381.RSM.isWashReady && module381.RSM.isReadyToCmd(),
        b = (module381.RSM.isO2Dock() || module381.RSM.isO3Dock()) && (module381.RSM.isChargingOnDock() || module381.RSM.isReadyToCmd()),
        h = module381.RSM.isReadyToCollectDust() ? 'startCollect' : 'startCharge';

      if (b) C = 'unfold';
      else if (s) C = 'startCharge';
      else if (o) C = 'startCharge';
      module381.RSM.state;

      if (module381.RSM.isReadyToCollectDust()) {
        R = 'startCollectDust';
        C = module381.RSM.isCollectDock() ? 'startCollectDust' : 'unfold';
      } else if (module381.RSM.state == module381.RobotState.COLLECTING_DUST) {
        R = 'stopCollectDust';
        C = 'stop';
      } else if (module381.RSM.state == module381.RobotState.CHARGING) {
        R = 'charging';
        C = module381.RSM.isO2Dock() ? 'startWash' : 'charging';
      } else if (module381.RSM.state == module381.RobotState.FULL_CHARGE) {
        R = 'full';
        C = module381.RSM.isO2Dock() ? 'startWash' : 'full';
      } else if (module381.RSM.isCleaning() || module381.RSM.state == module381.RobotState.QUICK_BUILDING_MAP) {
        M = 'pause';
        C = 'startCharge';
      } else if (module381.RSM.isPureMopping()) {
        p = 'pause';
        R = 'start';
      } else if (module381.RSM.state == module381.RobotState.BACK_TO_DOCK) {
        R = 'pause';
        C = 'pauseCharge';
      } else if (module381.RSM.state == module381.RobotState.BACK_TO_DOCK_WASHING_DUSTER) {
        f = 'pause';
        C = 'pauseBackWash';

        if (module381.RSM.cleanResumeFlag != module381.CleanResumeFlag.None) {
          p = 'pause';
          if (!module422.DMM.isGarnet) M = 'pause';
        }
      } else if (module381.RSM.state == module381.RobotState.WASHING_DUSTER) {
        f = 'stop';
        C = 'stop';

        if (module381.RSM.cleanResumeFlag != module381.CleanResumeFlag.None) {
          p = 'pause';
          if (!module422.DMM.isGarnet) M = 'pause';
        }
      } else if (module381.RSM.isInCleanMopping()) _ = 'pause';

      if (k) C = 'unfold';
      var x = module381.RSM.isEnterBackgroundWhenCleaning && module381.RSM.isFnishCleanChargingOnDock();

      if (
        module381.RSM.isFnishCleanBackDock() ||
        (module381.RSM.state == module381.RobotState.BACK_TO_DOCK_WASHING_DUSTER && module381.RSM.cleanResumeFlag == module381.CleanResumeFlag.None) ||
        x ||
        module381.RSM.cleanResumeFlag == module381.CleanResumeFlag.Quick_Build_Map
      ) {
        n = A;
        module381.RSM.isEnterBackgroundWhenCleaning = false;
      } else if (
        module381.RSM.cleanResumeFlag == module381.CleanResumeFlag.Global_Clean ||
        module381.RSM.state == module381.RobotState.SPOT_CLEAN ||
        ((module381.RSM.isChargingOnDock() || module381.RSM.isReadyToCmd()) && module381.RSM.cleanResumeFlag == module381.CleanResumeFlag.None)
      ) {
        if (!(ue != A && module381.RSM.state != module381.RobotState.CLEAN && module381.RSM.state != module381.RobotState.SPOT_CLEAN)) n = I;
      } else if (module381.RSM.cleanResumeFlag == module381.CleanResumeFlag.Segment_Clean) n = F;
      else if (module381.RSM.cleanResumeFlag == module381.CleanResumeFlag.Zone_Clean) n = B;

      if (t.tabDidChange) t.tabDidChange(n);
      me(n);
      ce(n);
      xe(n);
      var w = {
          cleanIconMode: M,
          chargeIconMode: R,
          mopIconMode: p,
          cleanMopIconMode: _,
          washIconMode: f,
          dockIconMode: C,
          collectIconMode: h,
        },
        T = false;
      if (q)
        Object.keys(w).forEach(function (t) {
          if (q[t] != w[t]) T = true;
        });
      else T = true;
      if (T) X(w);
    },
    Me = function (n, o) {
      var module23, React, module12, module1494, module1495, module1497, module1498, module1499, module418, h, x;
      return regeneratorRuntime.default.async(
        function (w) {
          for (;;)
            switch ((w.prev = w.next)) {
              case 0:
                module23 = {
                  0: module381.RobotState.CLEAN,
                  1: module381.RobotState.MOPPING,
                  2: module381.RobotState.CLEAN_MOP_CLEANING,
                };
                React = {
                  0: module381.RobotState.SEGMENT_CLEAN,
                  1: module381.RobotState.SEGMENT_MOPPING,
                  2: module381.RobotState.SEGMENT_CLEAN_MOP_CLEANING,
                };
                module12 = {
                  0: module381.RobotState.ZONED_CLEAN,
                  1: module381.RobotState.ZONED_MOPPING,
                  2: module381.RobotState.ZONED_CLEAN_MOP_CLEANING,
                };
                module1494 = {
                  0: module500.clean_task_change_tip_for_clean,
                  1: module500.clean_task_change_tip_for_mop,
                  2: module500.clean_task_change_tip_for_clean_then_mop,
                };

                module1495 = function () {
                  return (
                    undefined == module381.RSM.clean_mop_status ||
                    (0 == n
                      ? 1 == module381.RSM.clean_mop_status || module381.RSM.state == module381.RobotState.SPOT_CLEAN
                      : 1 == n
                      ? 2 == module381.RSM.clean_mop_status
                      : 2 == n
                      ? 6 == module381.RSM.clean_mop_status || 7 == module381.RSM.clean_mop_status
                      : undefined)
                  );
                };

                module1497 = function (t) {
                  if (0 == t) module381.RSM.mockPureCleaningMode();
                  if (1 == t) module381.RSM.mockPureMoppingMode();
                  if (2 == t) module381.RSM.mockCleanMopCleaningMode();
                };

                module1498 = function (t) {
                  var o;
                  return regeneratorRuntime.default.async(
                    function (u) {
                      for (;;)
                        switch ((u.prev = u.next)) {
                          case 0:
                            u.prev = 0;
                            o =
                              undefined != t
                                ? {
                                    clean_mop: n,
                                    map_index: [t],
                                  }
                                : {
                                    clean_mop: n,
                                  };
                            u.next = 4;
                            return regeneratorRuntime.default.awrap(module414.default.start([o]));

                          case 4:
                            module387.LogEventCommon('start_clean', o);
                            module393.localPingWithCallback(function (t) {
                              module387.LogEventStatus('connection_with_robot', {
                                isDirectConnection: t,
                              });
                            });
                            module381.RSM.state = module23[n];
                            module381.RSM.cleanResumeFlag = module381.CleanResumeFlag.Global_Clean;
                            module1497(n);
                            ue = A;
                            u.next = 15;
                            break;

                          case 12:
                            u.prev = 12;
                            u.t0 = u.catch(0);
                            console.log('globalStartTask  ' + n + ' error: ' + ('object' == typeof u.t0 ? JSON.stringify(u.t0) : u.t0));

                          case 15:
                          case 'end':
                            return u.stop();
                        }
                    },
                    null,
                    null,
                    [[0, 12]],
                    Promise
                  );
                };

                module1499 = function () {
                  var o, l, module1494, module1495, k, module418, h;
                  return regeneratorRuntime.default.async(
                    function (x) {
                      for (;;)
                        switch ((x.prev = x.next)) {
                          case 0:
                            if (((x.prev = 0), ue != I && ue != A)) {
                              x.next = 12;
                              break;
                            }

                            if (!(module381.RSM.isSwitchMapModeManual && -1 != module381.RSM.currentMapId && module1329.MM.maps.length > 1)) {
                              x.next = 8;
                              break;
                            }

                            o = {
                              text: module500.localization_strings_Main_MainPage_11,
                            };
                            l = {
                              text: module500.localization_strings_Main_Error_ErrorDetailPage_3,
                              onPress: function () {
                                return regeneratorRuntime.default.async(
                                  function (t) {
                                    for (;;)
                                      switch ((t.prev = t.next)) {
                                        case 0:
                                          t.next = 2;
                                          return regeneratorRuntime.default.awrap(module1498(module381.RSM.currentMapId));

                                        case 2:
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
                            };
                            globals.Alert.alert(
                              '',
                              module500.start_clean_with_manual_mode_alert_title.templateStringWithParams({
                                mapName: module1329.MM.getCurrentMapName(),
                              }),
                              [o, l]
                            );
                            x.next = 10;
                            break;

                          case 8:
                            x.next = 10;
                            return regeneratorRuntime.default.awrap(module1498());

                          case 10:
                            x.next = 47;
                            break;

                          case 12:
                            if (ue != F) {
                              x.next = 30;
                              break;
                            }

                            if ((console.log('Segment mop', t.cleanSegments), !(t.cleanSegments.length > 0))) {
                              x.next = 26;
                              break;
                            }

                            module1494 = [
                              {
                                clean_mop: n,
                                segments: t.cleanSegments,
                                repeat: (4 == module381.RSM.mopModeId ? 2 : Se.state.cleanCount) || 1,
                                clean_order_mode: Se.state.cleanOrder,
                              },
                            ];
                            module1495 = module381.RSM.isSupportOrderSegmentClean() ? module1494 : t.cleanSegments;
                            globals.dlog('clean_mop:' + n, JSON.stringify(module1495));
                            x.next = 20;
                            return regeneratorRuntime.default.awrap(module414.default.segmentClean(module1495));

                          case 20:
                            module387.LogEventCommon('start_segment_clean', module1495);
                            module381.RSM.state = React[n];
                            module381.RSM.cleanResumeFlag = module381.CleanResumeFlag.Segment_Clean;
                            module1497(n);
                            x.next = 28;
                            break;

                          case 26:
                            x.next = 28;
                            return regeneratorRuntime.default.awrap(module1498());

                          case 28:
                            x.next = 47;
                            break;

                          case 30:
                            if (ue != B) {
                              x.next = 47;
                              break;
                            }

                            if (!(k = ie ? ie.getZoneParams() : null) || !k.length) {
                              x.next = 45;
                              break;
                            }

                            module418 = (4 == module381.RSM.mopModeId ? 2 : Se.state.cleanCount) || 1;
                            k.forEach(function (t) {
                              t.push(module418);
                            });
                            h = module422.DMM.isGarnet
                              ? {
                                  clean_mop: n,
                                  zones: k,
                                }
                              : k;
                            globals.dlog('clean_mop:' + n, JSON.stringify(h));
                            x.next = 39;
                            return regeneratorRuntime.default.awrap(module414.default.zoneClean(h));

                          case 39:
                            module387.LogEventCommon('start_zone_clean', h);
                            module381.RSM.state = module12[n];
                            module381.RSM.cleanResumeFlag = module381.CleanResumeFlag.Zone_Clean;
                            module1497(n);
                            x.next = 47;
                            break;

                          case 45:
                            x.next = 47;
                            return regeneratorRuntime.default.awrap(module1498());

                          case 47:
                            x.next = 52;
                            break;

                          case 49:
                            x.prev = 49;
                            x.t0 = x.catch(0);
                            console.log('handleCleanTask ' + n + '@startNewTask error: ' + ('object' == typeof x.t0 ? JSON.stringify(x.t0) : x.t0));

                          case 52:
                          case 'end':
                            return x.stop();
                        }
                    },
                    null,
                    null,
                    [[0, 49]],
                    Promise
                  );
                };

                module418 = function () {
                  return regeneratorRuntime.default.async(
                    function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            if (((t.prev = 0), !module381.RSM.isSegmentCleanTaskShouldResume())) {
                              t.next = 8;
                              break;
                            }

                            t.next = 4;
                            return regeneratorRuntime.default.awrap(module414.default.resumeSegmentClean());

                          case 4:
                            module381.RSM.state = React[n];
                            module1497(n);
                            t.next = 26;
                            break;

                          case 8:
                            if (!module381.RSM.isGlobalCleanTaskShouldResume()) {
                              t.next = 15;
                              break;
                            }

                            t.next = 11;
                            return regeneratorRuntime.default.awrap(
                              module414.default.start([
                                {
                                  clean_mop: n,
                                },
                              ])
                            );

                          case 11:
                            module381.RSM.state = module23[n];
                            module1497(n);
                            t.next = 26;
                            break;

                          case 15:
                            if (!module381.RSM.isZoneCleanTaskShouldResume()) {
                              t.next = 22;
                              break;
                            }

                            t.next = 18;
                            return regeneratorRuntime.default.awrap(module414.default.resumeZoneClean());

                          case 18:
                            module381.RSM.state = module12[n];
                            module1497(n);
                            t.next = 26;
                            break;

                          case 22:
                            if (!module381.RSM.isQuickBuildMapTaskShouldResume()) {
                              t.next = 26;
                              break;
                            }

                            t.next = 25;
                            return regeneratorRuntime.default.awrap(module414.default.resumeQuickBuildMap());

                          case 25:
                            module381.RSM.state = module381.RobotState.QUICK_BUILDING_MAP;

                          case 26:
                            module387.LogEventCommon('resume_clean');
                            t.next = 32;
                            break;

                          case 29:
                            t.prev = 29;
                            t.t0 = t.catch(0);
                            console.log('handleCleanTask ' + n + '@resumeTask error: ' + ('object' == typeof t.t0 ? JSON.stringify(t.t0) : t.t0));

                          case 32:
                          case 'end':
                            return t.stop();
                        }
                    },
                    null,
                    null,
                    [[0, 29]],
                    Promise
                  );
                };

                o.startAnimation();
                w.prev = 10;
                w.next = 13;
                return regeneratorRuntime.default.awrap(module381.RSM.getStatus());

              case 13:
                if (module381.RSM.isCleaning() || module381.RSM.isPureMopping() || module381.RSM.isInCleanMopping() || !(module381.RSM.battery < 20)) {
                  w.next = 17;
                  break;
                }

                globals.showToast(module500.localization_strings_Main_Constants_33);
                o.endAnimation();
                return w.abrupt('return');

              case 17:
                if (
                  (module381.RSM.state == module381.RobotState.MALFUNCTIONING && (module381.RSM.state = module381.RobotState.PAUSE),
                  (h =
                    (module381.RSM.state == module381.RobotState.BACK_TO_DOCK_WASHING_DUSTER || module381.RSM.state == module381.RobotState.WASHING_DUSTER) &&
                    module381.RSM.cleanResumeFlag != module381.CleanResumeFlag.None),
                  !module381.RSM.isReadyToNewClean())
                ) {
                  w.next = 24;
                  break;
                }

                w.next = 22;
                return regeneratorRuntime.default.awrap(module1499());

              case 22:
                w.next = 44;
                break;

              case 24:
                if (!module1495() || !module381.RSM.isCleanTaskShouldResume() || h) {
                  w.next = 29;
                  break;
                }

                w.next = 27;
                return regeneratorRuntime.default.awrap(module418());

              case 27:
                w.next = 44;
                break;

              case 29:
                if (
                  !module1495() ||
                  !(
                    module381.RSM.isCleaning() ||
                    module381.RSM.isPureMopping() ||
                    module381.RSM.isInCleanMopping() ||
                    h ||
                    module381.RSM.state == module381.RobotState.QUICK_BUILDING_MAP
                  )
                ) {
                  w.next = 36;
                  break;
                }

                w.next = 32;
                return regeneratorRuntime.default.awrap(module414.default.pause());

              case 32:
                module387.LogEventCommon('pause_clean');
                module381.RSM.state = module381.RSM.state == module381.RobotState.SPOT_CLEAN ? module381.RobotState.WAITING : module381.RobotState.PAUSE;
                w.next = 44;
                break;

              case 36:
                if (!module381.RSM.isInBackDockTask() && module1495()) {
                  w.next = 44;
                  break;
                }

                if (!module381.RSM.isInBackDockTask()) {
                  w.next = 42;
                  break;
                }

                w.next = 40;
                return regeneratorRuntime.default.awrap(module1499());

              case 40:
                w.next = 44;
                break;

              case 42:
                x = module1494[n];
                fe(x, module1499);

              case 44:
                o.endAnimation();
                Re();
                module381.RSM.lockMotionStatus();
                w.next = 53;
                break;

              case 49:
                w.prev = 49;
                w.t0 = w.catch(10);
                o.endAnimation();
                console.log('handleCleanTask ' + n + ' error : ' + typeof w.t0 == Object ? JSON.stringify(w.t0) : w.t0);

              case 53:
              case 'end':
                return w.stop();
            }
        },
        null,
        null,
        [[10, 49]],
        Promise
      );
    },
    pe = function (t) {
      var n;
      return regeneratorRuntime.default.async(
        function (o) {
          for (;;)
            switch ((o.prev = o.next)) {
              case 0:
                if (
                  ((o.prev = 0),
                  (n = function () {
                    return regeneratorRuntime.default.async(
                      function (n) {
                        for (;;)
                          switch ((n.prev = n.next)) {
                            case 0:
                              if (
                                (module381.RSM.backDockResumeFlag == module381.BackDockResumeFlag.None
                                  ? module387.LogEventCommon('start_charge', {
                                      isDustTask: t,
                                    })
                                  : module387.LogEventCommon('resume_back_charge', {
                                      isDustTask: t,
                                    }),
                                !t)
                              ) {
                                n.next = 6;
                                break;
                              }

                              n.next = 4;
                              return regeneratorRuntime.default.awrap(module414.default.startCollectDust());

                            case 4:
                              n.next = 8;
                              break;

                            case 6:
                              n.next = 8;
                              return regeneratorRuntime.default.awrap(module414.default.charge());

                            case 8:
                              module381.RSM.state = t ? module381.RobotState.COLLECTING_DUST : module381.RobotState.BACK_TO_DOCK;
                              module381.RSM.backDockResumeFlag = t ? module381.BackDockResumeFlag.None : module381.BackDockResumeFlag.Has;
                              module381.RSM.cleanResumeFlag = module381.CleanResumeFlag.None;

                            case 11:
                            case 'end':
                              return n.stop();
                          }
                      },
                      null,
                      null,
                      null,
                      Promise
                    );
                  }),
                  !t)
                ) {
                  o.next = 6;
                  break;
                }

                fe(module500.robot_will_begin_collect_dust_tip, function () {
                  return regeneratorRuntime.default.async(
                    function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            t.next = 2;
                            return regeneratorRuntime.default.awrap(n());

                          case 2:
                            return t.abrupt('return', t.sent);

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
                });
                o.next = 8;
                break;

              case 6:
                o.next = 8;
                return regeneratorRuntime.default.awrap(n());

              case 8:
                o.next = 13;
                break;

              case 10:
                o.prev = 10;
                o.t0 = o.catch(0);
                console.log('startChargeOrCollectTaskForNewControl', o.t0);

              case 13:
              case 'end':
                return o.stop();
            }
        },
        null,
        null,
        [[0, 10]],
        Promise
      );
    },
    de = function () {
      var t;
      return regeneratorRuntime.default.async(
        function (n) {
          for (;;)
            switch ((n.prev = n.next)) {
              case 0:
                if ((module387.LogEventCommon('start_clean_roller'), module381.RSM.isWaterBoxIn)) {
                  n.next = 4;
                  break;
                }

                globals.showToast(module500.start_clean_roller_without_waterbox_tip);
                return n.abrupt('return');

              case 4:
                if (module381.RSM.isWaterBoxCarriageIn) {
                  n.next = 7;
                  break;
                }

                globals.showToast(module500.start_clean_roller_without_waterbox_carriage_tip);
                return n.abrupt('return');

              case 7:
                if (module422.DMM.isTopazS && module381.RSM.cleanResumeFlag != module381.CleanResumeFlag.None)
                  null == (t = globals) ||
                    t.Alert.customAlert('', module500.back_dock_to_wash_alert_tip, null, null, {
                      confirmTitle: module500.localization_strings_Setting_RemoteControlPage_51,
                      shouldShowCancel: false,
                    });
                n.next = 11;
                return regeneratorRuntime.default.awrap(module414.default.startWash());

              case 11:
                module381.RSM.state = module381.RobotState.BACK_TO_DOCK_WASHING_DUSTER;
                module381.RSM.backDockResumeFlag = module381.BackDockResumeFlag.None;

              case 13:
              case 'end':
                return n.stop();
            }
        },
        null,
        null,
        null,
        Promise
      );
    },
    _e = function (t, n) {
      var o, l, u, c, R, module1494, _;

      return regeneratorRuntime.default.async(
        function (f) {
          for (;;)
            switch ((f.prev = f.next)) {
              case 0:
                t.startAnimation();
                f.prev = 1;
                f.next = 4;
                return regeneratorRuntime.default.awrap(module381.RSM.getStatus());

              case 4:
                if (
                  (module381.RSM.state == module381.RobotState.MALFUNCTIONING && (module381.RSM.state = module381.RobotState.PAUSE),
                  (o = module381.RSM.isReadyToCollectDust()),
                  (l = function () {
                    var t = module381.RSM.state == module381.RobotState.BACK_TO_DOCK || module381.RSM.isAirDrying || module381.RSM.state == module381.RobotState.COLLECTING_DUST,
                      o = module381.RSM.state == module381.RobotState.BACK_TO_DOCK_WASHING_DUSTER || module381.RSM.state == module381.RobotState.WASHING_DUSTER;
                    return t ? n : o && !n;
                  }),
                  (u = function () {
                    var t, l;
                    return regeneratorRuntime.default.async(
                      function (u) {
                        for (;;)
                          switch ((u.prev = u.next)) {
                            case 0:
                              if (((u.prev = 0), !n)) {
                                u.next = 11;
                                break;
                              }

                              if (
                                ((t = function (t) {
                                  return regeneratorRuntime.default.async(
                                    function (n) {
                                      for (;;)
                                        switch ((n.prev = n.next)) {
                                          case 0:
                                            if (
                                              (module381.RSM.backDockResumeFlag == module381.BackDockResumeFlag.None
                                                ? module387.LogEventCommon('start_charge', {
                                                    isDustTask: t,
                                                  })
                                                : module387.LogEventCommon('resume_back_charge', {
                                                    isDustTask: t,
                                                  }),
                                              !t)
                                            ) {
                                              n.next = 6;
                                              break;
                                            }

                                            n.next = 4;
                                            return regeneratorRuntime.default.awrap(module414.default.startCollectDust());

                                          case 4:
                                            n.next = 8;
                                            break;

                                          case 6:
                                            n.next = 8;
                                            return regeneratorRuntime.default.awrap(module414.default.charge());

                                          case 8:
                                            module381.RSM.state = t ? module381.RobotState.COLLECTING_DUST : module381.RobotState.BACK_TO_DOCK;
                                            module381.RSM.backDockResumeFlag = t ? module381.BackDockResumeFlag.None : module381.BackDockResumeFlag.Has;
                                            module381.RSM.cleanResumeFlag = module381.CleanResumeFlag.None;

                                          case 11:
                                          case 'end':
                                            return n.stop();
                                        }
                                    },
                                    null,
                                    null,
                                    null,
                                    Promise
                                  );
                                }),
                                !o)
                              ) {
                                u.next = 7;
                                break;
                              }

                              fe(module500.robot_will_begin_collect_dust_tip, function () {
                                return regeneratorRuntime.default.async(
                                  function (n) {
                                    for (;;)
                                      switch ((n.prev = n.next)) {
                                        case 0:
                                          n.next = 2;
                                          return regeneratorRuntime.default.awrap(t(true));

                                        case 2:
                                          return n.abrupt('return', n.sent);

                                        case 3:
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
                              u.next = 9;
                              break;

                            case 7:
                              u.next = 9;
                              return regeneratorRuntime.default.awrap(t(false));

                            case 9:
                              u.next = 24;
                              break;

                            case 11:
                              if ((module387.LogEventCommon('start_clean_roller'), module381.RSM.isWaterBoxIn)) {
                                u.next = 15;
                                break;
                              }

                              globals.showToast(module500.start_clean_roller_without_waterbox_tip);
                              return u.abrupt('return');

                            case 15:
                              if (module381.RSM.isWaterBoxCarriageIn) {
                                u.next = 18;
                                break;
                              }

                              globals.showToast(module500.start_clean_roller_without_waterbox_carriage_tip);
                              return u.abrupt('return');

                            case 18:
                              if (module422.DMM.isTopazS && module381.RSM.cleanResumeFlag != module381.CleanResumeFlag.None)
                                null == (l = globals) ||
                                  l.Alert.customAlert('', module500.back_dock_to_wash_alert_tip, null, null, {
                                    confirmTitle: module500.localization_strings_Setting_RemoteControlPage_51,
                                    shouldShowCancel: false,
                                  });
                              u.next = 22;
                              return regeneratorRuntime.default.awrap(module414.default.startWash());

                            case 22:
                              module381.RSM.state = module381.RobotState.BACK_TO_DOCK_WASHING_DUSTER;
                              module381.RSM.backDockResumeFlag = module381.BackDockResumeFlag.None;

                            case 24:
                              u.next = 29;
                              break;

                            case 26:
                              u.prev = 26;
                              u.t0 = u.catch(0);
                              console.log('handleBackDockTask startTask toCharge:: ' + n + ' error: ' + ('object' == typeof u.t0 ? JSON.stringify(u.t0) : u.t0));

                            case 29:
                            case 'end':
                              return u.stop();
                          }
                      },
                      null,
                      null,
                      [[0, 26]],
                      Promise
                    );
                  }),
                  !(
                    module381.RSM.isCleaning() ||
                    (module381.RSM.isCleanTaskShouldResume() && !module381.RSM.isInBackDockTask() && !module381.RSM.isChargingOnDock()) ||
                    module381.RSM.isPureMopping() ||
                    module381.RSM.isInCleanMopping() ||
                    module381.RSM.state == module381.RobotState.QUICK_BUILDING_MAP
                  ))
                ) {
                  f.next = 23;
                  break;
                }

                if (
                  (t.endAnimation(),
                  (c = (module381.RSM.isPureMopping() || module381.RSM.isCleanMopMopping()) && !n),
                  (R = (module381.RSM.isPureMoppingMode() || module381.RSM.isCleanMopMoppingMode()) && !n && module381.RSM.cleanResumeFlag != module381.CleanResumeFlag.None),
                  !(c || R || (o && n) || (!module422.DMM.isGarnet && !n)))
                ) {
                  f.next = 17;
                  break;
                }

                f.next = 15;
                return regeneratorRuntime.default.awrap(u());

              case 15:
                f.next = 21;
                break;

              case 17:
                if (module381.RSM.isChargingOnDock()) {
                  f.next = 21;
                  break;
                }

                module1494 = n ? module500.home_dialog_begin_new_back_charge : module500.home_dialog_begin_new_back_washing_duster;
                if (module381.RSM.cleanResumeFlag == module381.CleanResumeFlag.Quick_Build_Map) fe(module500.tap_charge_when_quick_building_map_tip, u);
                else fe(module1494, u);
                return f.abrupt('return');

              case 21:
                f.next = 57;
                break;

              case 23:
                if (
                  !(
                    module381.RSM.isReadyToCmd() ||
                    module381.RSM.state == module381.RobotState.PAUSE ||
                    (module381.RSM.isChargingOnDock() && (!n || o)) ||
                    (module381.RSM.isInBackDockTask() && !l())
                  )
                ) {
                  f.next = 28;
                  break;
                }

                f.next = 26;
                return regeneratorRuntime.default.awrap(u());

              case 26:
                f.next = 57;
                break;

              case 28:
                if (!module381.RSM.isInBackDockTask() && module381.RSM.state != module381.RobotState.WASHING_DUSTER) {
                  f.next = 57;
                  break;
                }

                if (((_ = module381.RSM.state == module381.RobotState.COLLECTING_DUST), !n)) {
                  f.next = 46;
                  break;
                }

                if (module381.RSM.state != module381.RobotState.COLLECTING_DUST) {
                  f.next = 37;
                  break;
                }

                module387.LogEventCommon('stop_collectDust');
                f.next = 35;
                return regeneratorRuntime.default.awrap(module414.default.stopCollectDust());

              case 35:
                f.next = 44;
                break;

              case 37:
                if (!module381.RSM.isAirDrying) {
                  f.next = 41;
                  break;
                }

                return f.abrupt('return');

              case 41:
                module387.LogEventCommon('pause_back_charge');
                f.next = 44;
                return regeneratorRuntime.default.awrap(module414.default.pause());

              case 44:
                f.next = 55;
                break;

              case 46:
                if (module381.RSM.state != module381.RobotState.WASHING_DUSTER) {
                  f.next = 52;
                  break;
                }

                module387.LogEventCommon('stop_clean_roller');
                f.next = 50;
                return regeneratorRuntime.default.awrap(module414.default.stopWash());

              case 50:
                f.next = 55;
                break;

              case 52:
                module387.LogEventCommon('pause_clean');
                f.next = 55;
                return regeneratorRuntime.default.awrap(module414.default.pause());

              case 55:
                module381.RSM.state = _ ? module381.RobotState.CHARGING : module381.RobotState.PAUSE;
                module381.RSM.backDockResumeFlag = module381.BackDockResumeFlag.Has;

              case 57:
                t.endAnimation();
                Re();
                module381.RSM.lockMotionStatus();
                f.next = 66;
                break;

              case 62:
                f.prev = 62;
                f.t0 = f.catch(1);
                t.endAnimation();
                console.log('handle back dock task toCharge:: ' + n + ' error : ' + typeof f.t0 == 'string' ? f.t0 : JSON.stringify(f.t0));

              case 66:
              case 'end':
                return f.stop();
            }
        },
        null,
        null,
        [[1, 62]],
        Promise
      );
    },
    fe = function (t, n) {
      if (globals.Alert)
        globals.Alert.customAlert(
          '',
          t,
          function () {
            return regeneratorRuntime.default.async(
              function (o) {
                for (;;)
                  switch ((o.prev = o.next)) {
                    case 0:
                      if (((o.prev = 0), (o.t0 = n), !o.t0)) {
                        o.next = 5;
                        break;
                      }

                      o.next = 5;
                      return regeneratorRuntime.default.awrap(n());

                    case 5:
                      Re();
                      module381.RSM.lockMotionStatus();
                      o.next = 12;
                      break;

                    case 9:
                      o.prev = 9;
                      o.t1 = o.catch(0);
                      console.log('showConfirmDialog ' + t + ' error: ' + ('object' == typeof o.t1 ? JSON.stringify(o.t1) : o.t1));

                    case 12:
                    case 'end':
                      return o.stop();
                  }
              },
              null,
              null,
              [[0, 9]],
              Promise
            );
          },
          null,
          {
            confirmTitle: module500.localization_strings_Main_Error_ErrorDetailPage_3,
          }
        );
    },
    ge = function (n) {
      return regeneratorRuntime.default.async(
        function (o) {
          for (;;)
            switch ((o.prev = o.next)) {
              case 0:
                if (ue != n) {
                  o.next = 2;
                  break;
                }

                return o.abrupt('return');

              case 2:
                if (module381.RSM.isShowStopTaskAlert())
                  globals.Alert.alert('', module500.home_dialog_begin_new_clean, [
                    {
                      text: module500.localization_strings_Main_MainPage_11,
                      onPress: function () {},
                    },
                    {
                      text: module500.localization_strings_Main_Error_ErrorDetailPage_3,
                      onPress: function () {
                        return regeneratorRuntime.default.async(
                          function (t) {
                            for (;;)
                              switch ((t.prev = t.next)) {
                                case 0:
                                  if (((t.prev = 0), !ee)) {
                                    t.next = 4;
                                    break;
                                  }

                                  globals.showToast(module500.toast_frequently_operate);
                                  return t.abrupt('return');

                                case 4:
                                  te(true);
                                  t.next = 7;
                                  return regeneratorRuntime.default.awrap(module414.default.stop());

                                case 7:
                                  if (!t.sent) {
                                    t.next = 15;
                                    break;
                                  }

                                  module381.RSM.state = module381.RobotState.WAITING;
                                  module381.RSM.cleanResumeFlag = module381.CleanResumeFlag.None;
                                  module381.RSM.backDockResumeFlag = module381.BackDockResumeFlag.None;
                                  if (ie) ie.resetSelectBlocks();
                                  if (ie) ie.clearRectangles();
                                  Re();
                                  Ce(n);

                                case 15:
                                  te(false);
                                  t.next = 22;
                                  break;

                                case 18:
                                  t.prev = 18;
                                  t.t0 = t.catch(0);
                                  console.log('Switch tab error : ' + JSON.stringify(t.t0));
                                  te(false);

                                case 22:
                                case 'end':
                                  return t.stop();
                              }
                          },
                          null,
                          null,
                          [[0, 18]],
                          Promise
                        );
                      },
                    },
                  ]);
                else if (n == F && module390.default.isMapSegmentSupported() && !module381.RSM.mapSaveEnabled) {
                  if (t.switchSegmentTabDidFail) t.switchSegmentTabDidFail();
                } else {
                  Ce(n);
                  if (t.tabDidChange) t.tabDidChange(n);
                }

              case 3:
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
    me = function (t) {
      var n, o;
      if (!(null == K || null == (n = K.current) || null == (o = n.contentView))) o.changeTab(t);
    },
    Ce = function (t) {
      me(t);
      ce(t);
      if (t == F) ke();
      if (t == I) be();
      if (t == B) he();
    },
    ke = function () {
      xe(F);
      var n = '';

      if (module381.RSM.mapStatus == module381.MapStatus.Has_WithSegments) {
        var o = 0;
        if (ie)
          ie.state.selectBlockList.forEach(function (t) {
            o += t;
          });
        n =
          o > 0
            ? '' +
              module500.main_page_top_tip_has_selected.templateStringWithParams({
                zones: o,
              })
            : module500.home_menu_select_zone_tip;
      }

      var s = module381.RSM.mapStatus == module381.MapStatus.None || module381.RSM.mapStatus == module381.MapStatus.Has_WithoutSegments;
      if (t.updateParent)
        t.updateParent({
          topTip: n,
          shouldShowNoMap: s,
        });
    },
    be = function () {
      xe(I);
      if (t.updateParent)
        t.updateParent({
          topTip: '',
        });
    },
    he = function () {
      if ((xe(B), module381.RSM.mapStatus != module381.MapStatus.None)) {
        if (ie) ie.enterZoneEditMode();
        var n = ie && !ie.hasRects();

        if ((n && ie.addRectangle(), !n)) {
          var o = ie && ie.getZoneParams(),
            s =
              o && o.length > 0
                ? '' +
                  module500.mainpage_top_tip_has_drawed.templateStringWithParams({
                    zones: o.length,
                  })
                : module500.home_menu_draw_zone_tip;
          if (t.updateParent)
            t.updateParent({
              topTip: s,
            });
        }
      }
    },
    xe = function n(o) {
      if (Se)
        Se.setState({
          tab: o,
        });
      var s = '2d' == t.parent.state.mapType,
        l = module381.RSM.mapStatus == module381.MapStatus.None || (module381.RSM.mapStatus == module381.MapStatus.Has_WithoutSegments && o == F);
      if (s && !l && !module381.RSM.isLocating && module381.RSM.mapStatus != module381.MapStatus.None)
        if ((ie = t.parent.mapView)) {
          var u = null;

          if (o == F) {
            var c = 1 == Se.state.cleanOrder;

            if (module381.RSM.cleanResumeFlag == module381.CleanResumeFlag.Segment_Clean) {
              u = c
                ? module381.RSM.isCustomCleanWaterMode()
                  ? module1330.MapModelInCleanMode.Segment_Clean_Sequential_Read_Only_With_Clean_Type
                  : module1330.MapModelInCleanMode.Segment_Clean_Sequential_Read_Only
                : module381.RSM.isCustomCleanWaterMode()
                ? module1330.MapModelInCleanMode.Segment_Clean_Read_Only_With_Clean_Type
                : module1330.MapModelInCleanMode.Segment_Clean_Read_Only;
              if (ie) ie.changeMapViewMode(u);
              if (t.updateParent)
                t.updateParent({
                  topTip: '',
                });
            } else {
              u = c
                ? module381.RSM.isCustomCleanWaterMode()
                  ? module1330.MapModelInCleanMode.Segment_Clean_Sequential_Edit_With_Clean_Type
                  : module1330.MapModelInCleanMode.Segment_Clean_Sequential_Edit
                : module381.RSM.isCustomCleanWaterMode()
                ? module1330.MapModelInCleanMode.Segment_Clean_Edit_With_Clean_Type
                : module1330.MapModelInCleanMode.Segment_Clean_Edit;
              if (ie) ie.changeMapViewMode(u);
            }
          }

          if (!(o != I && o != A)) {
            if (t.updateParent)
              t.updateParent({
                topTip: '',
              });
            u = module381.RSM.isCustomCleanWaterMode() ? module1330.MapModelInCleanMode.Global_Clean_With_Clean_Type : module1330.MapModelInCleanMode.Global_Clean;
            if (ie) ie.changeMapViewMode(u);
          }

          if (o == B)
            module381.RSM.cleanResumeFlag == module381.CleanResumeFlag.Zone_Clean
              ? (ie && ie.changeMapViewMode(module1330.MapModelInCleanMode.Zone_Clean_Read_Only),
                t.updateParent &&
                  t.updateParent({
                    topTip: '',
                  }))
              : ie && ie.changeMapViewMode(module1330.MapModelInCleanMode.Zone_Clean_Edit);
        } else
          setTimeout(function () {
            n(o);
          }, 200);
    },
    De = t.childrenAboveTab,
    we = t.childrenBelowTab;

  return React.default.createElement(
    module12.View,
    {
      style: [
        O.wrap,
        {
          width: module12.Dimensions.get('window').width,
        },
      ],
      pointerEvents: 'box-none',
    },
    De && De(),
    module381.RSM.hasGotMapFirstTime &&
      React.default.createElement(module1494.default, {
        ref: K,
        enabled: J,
        onPressTab: function (t) {
          return ge(t);
        },
      }),
    we && we(),
    React.default.createElement(
      module1501.default,
      {
        info: null == (n = t.infoWrapperData) ? undefined : n.info,
        icon: null == (w = t.infoWrapperData) ? undefined : w.icon,
        actionIcon: null == (y = t.infoWrapperData) ? undefined : y.actionIcon,
        action: null == (W = t.infoWrapperData) ? undefined : W.action,
      },
      React.default.createElement(
        G,
        module22.default({}, q, {
          ref: H,
          enabled: J,
          onPressCleanButton: function () {
            var t;
            return regeneratorRuntime.default.async(
              function (n) {
                for (;;)
                  switch ((n.prev = n.next)) {
                    case 0:
                      t = H.current.cleanButton();
                      Me(0, t);

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
          },
          onPressMopButton: function () {
            var t;
            return regeneratorRuntime.default.async(
              function (n) {
                for (;;)
                  switch ((n.prev = n.next)) {
                    case 0:
                      t = H.current.mopButton();
                      n.next = 3;
                      return regeneratorRuntime.default.awrap(Me(1, t));

                    case 3:
                    case 'end':
                      return n.stop();
                  }
              },
              null,
              null,
              null,
              Promise
            );
          },
          onPressCleanMopButton: function () {
            var t;
            return regeneratorRuntime.default.async(
              function (n) {
                for (;;)
                  switch ((n.prev = n.next)) {
                    case 0:
                      t = H.current.cleanMopButton();
                      n.next = 3;
                      return regeneratorRuntime.default.awrap(Me(2, t));

                    case 3:
                    case 'end':
                      return n.stop();
                  }
              },
              null,
              null,
              null,
              Promise
            );
          },
          onPressChargeButton: function () {
            var t;
            return regeneratorRuntime.default.async(
              function (n) {
                for (;;)
                  switch ((n.prev = n.next)) {
                    case 0:
                      t = H.current.chargeButton();
                      n.next = 3;
                      return regeneratorRuntime.default.awrap(_e(t, true));

                    case 3:
                    case 'end':
                      return n.stop();
                  }
              },
              null,
              null,
              null,
              Promise
            );
          },
          onPressWashButton: function () {
            var t;
            return regeneratorRuntime.default.async(
              function (n) {
                for (;;)
                  switch ((n.prev = n.next)) {
                    case 0:
                      if (
                        !(
                          module381.RSM.state != module381.RobotState.BACK_TO_DOCK_WASHING_DUSTER &&
                          module381.RSM.state != module381.RobotState.WASHING_DUSTER &&
                          module381.RSM.battery < 10
                        )
                      ) {
                        n.next = 3;
                        break;
                      }

                      globals.showToast(module500.localization_strings_Main_Constants_33);
                      return n.abrupt('return');

                    case 3:
                      t = H.current.washButton();
                      n.next = 6;
                      return regeneratorRuntime.default.awrap(_e(t));

                    case 6:
                    case 'end':
                      return n.stop();
                  }
              },
              null,
              null,
              null,
              Promise
            );
          },
          onPressNewCollectButton: function (t) {
            var n;
            return regeneratorRuntime.default.async(
              function (o) {
                for (;;)
                  switch ((o.prev = o.next)) {
                    case 0:
                      console.log('onPressNewCollectButton');
                      (n = H.current.newCollectButton()).startAnimation();
                      o.prev = 3;
                      o.next = 6;
                      return regeneratorRuntime.default.awrap(pe(module381.RSM.isReadyToCollectDust()));

                    case 6:
                      n.endAnimation();
                      module381.RSM.lockMotionStatus();
                      Re();
                      t(true);
                      console.log('onPressNewCollectButton', res);
                      o.next = 18;
                      break;

                    case 13:
                      o.prev = 13;
                      o.t0 = o.catch(3);
                      n.endAnimation();
                      t(false, o.t0);
                      console.log('onPressNewCollectButton error', o.t0);

                    case 18:
                    case 'end':
                      return o.stop();
                  }
              },
              null,
              null,
              [[3, 13]],
              Promise
            );
          },
          onPressNewWashButton: function (t) {
            var n;
            return regeneratorRuntime.default.async(
              function (o) {
                for (;;)
                  switch ((o.prev = o.next)) {
                    case 0:
                      console.log('onPressNewWashButton');
                      (n = H.current.newWashButton()).startAnimation();
                      o.prev = 3;
                      o.next = 6;
                      return regeneratorRuntime.default.awrap(de());

                    case 6:
                      n.endAnimation();
                      module381.RSM.lockMotionStatus();
                      Re();
                      t(true);
                      o.next = 17;
                      break;

                    case 12:
                      o.prev = 12;
                      o.t0 = o.catch(3);
                      n.endAnimation();
                      t(false, o.t0);
                      console.log('onPressNewWashButton error', module426.ErrorImageMap);

                    case 17:
                    case 'end':
                      return o.stop();
                  }
              },
              null,
              null,
              [[3, 12]],
              Promise
            );
          },
          onPressNewDockButton: function () {
            var n, o, l, u, c, R;
            return regeneratorRuntime.default.async(
              function (p) {
                for (;;)
                  switch ((p.prev = p.next)) {
                    case 0:
                      console.log('onPressNewDockButton start');
                      (n = H.current.dockButton()).startAnimation();
                      p.prev = 3;
                      p.next = 6;
                      return regeneratorRuntime.default.awrap(module381.RSM.getStatus());

                    case 6:
                      if (
                        (module381.RSM.state == module381.RobotState.MALFUNCTIONING && (module381.RSM.state = module381.RobotState.PAUSE),
                        (o = module381.RSM.isCollectDock() && module381.RSM.isChargingOnDock()),
                        (l = module381.RSM.isO2Dock() && module381.RSM.isChargingOnDock()),
                        (u = module381.RSM.isBackDockWashingDusterMode() && module381.RSM.backDockResumeFlag == module381.BackDockResumeFlag.Has),
                        (c = !module381.RSM.isBackDockWashingDusterMode() && module381.RSM.backDockResumeFlag == module381.BackDockResumeFlag.Has),
                        (R = function () {
                          var n;
                          return regeneratorRuntime.default.async(
                            function (o) {
                              for (;;)
                                switch ((o.prev = o.next)) {
                                  case 0:
                                    n = t.askBeforeBackDock;
                                    if (n)
                                      n(function (t) {
                                        var n;
                                        return regeneratorRuntime.default.async(
                                          function (o) {
                                            for (;;)
                                              switch ((o.prev = o.next)) {
                                                case 0:
                                                  if ('washThenCharge' != t) {
                                                    o.next = 6;
                                                    break;
                                                  }

                                                  o.next = 3;
                                                  return regeneratorRuntime.default.awrap(module414.default.startWashThenCharge());

                                                case 3:
                                                  console.log('pure charge and wash ');
                                                  o.next = 15;
                                                  break;

                                                case 6:
                                                  if ('charge' != t) {
                                                    o.next = 12;
                                                    break;
                                                  }

                                                  o.next = 9;
                                                  return regeneratorRuntime.default.awrap(module414.default.charge());

                                                case 9:
                                                  console.log('pure charge');
                                                  o.next = 15;
                                                  break;

                                                case 12:
                                                  if ('wash' != t) {
                                                    o.next = 15;
                                                    break;
                                                  }

                                                  o.next = 15;
                                                  return regeneratorRuntime.default.awrap(module414.default.startWash());

                                                case 15:
                                                  n = 'washThenCharge' == t || 'wash' == t;
                                                  module381.RSM.state = n ? module381.RobotState.BACK_TO_DOCK_WASHING_DUSTER : module381.RobotState.BACK_TO_DOCK;
                                                  module381.RSM.backDockResumeFlag = n ? module381.BackDockResumeFlag.None : module381.BackDockResumeFlag.Has;
                                                  if ('wash' != t) module381.RSM.cleanResumeFlag = module381.CleanResumeFlag.None;
                                                  module381.RSM.lockMotionStatus();
                                                  Re();

                                                case 21:
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

                                  case 2:
                                  case 'end':
                                    return o.stop();
                                }
                            },
                            null,
                            null,
                            null,
                            Promise
                          );
                        }),
                        !l)
                      ) {
                        p.next = 17;
                        break;
                      }

                      p.next = 15;
                      return regeneratorRuntime.default.awrap(de());

                    case 15:
                      p.next = 57;
                      break;

                    case 17:
                      if (!o) {
                        p.next = 22;
                        break;
                      }

                      p.next = 20;
                      return regeneratorRuntime.default.awrap(pe(true));

                    case 20:
                      p.next = 57;
                      break;

                    case 22:
                      if (module381.RSM.state != module381.RobotState.COLLECTING_DUST) {
                        p.next = 29;
                        break;
                      }

                      module387.LogEventCommon('stop_collectDust');
                      p.next = 26;
                      return regeneratorRuntime.default.awrap(module414.default.stopCollectDust());

                    case 26:
                      module381.RSM.state = module381.RobotState.CHARGING;
                      p.next = 57;
                      break;

                    case 29:
                      if (module381.RSM.state != module381.RobotState.WASHING_DUSTER) {
                        p.next = 36;
                        break;
                      }

                      module387.LogEventCommon('stop_clean_roller');
                      p.next = 33;
                      return regeneratorRuntime.default.awrap(module414.default.stopWash());

                    case 33:
                      module381.RSM.state = module381.RobotState.WAITING;
                      p.next = 57;
                      break;

                    case 36:
                      if (
                        (module381.RSM.cleanResumeFlag == module381.CleanResumeFlag.None && !module381.RSM.isCleaning()) ||
                        module381.RSM.backDockResumeFlag != module381.BackDockResumeFlag.None
                      ) {
                        p.next = 41;
                        break;
                      }

                      if (module381.RSM.cleanResumeFlag == module381.CleanResumeFlag.Quick_Build_Map)
                        fe(module500.tap_charge_when_quick_building_map_tip, function () {
                          return pe(false);
                        });
                      else R();
                      return p.abrupt('return');

                    case 41:
                      if (!module381.RSM.isReadyToCmd() && module381.RSM.state != module381.RobotState.PAUSE) {
                        p.next = 50;
                        break;
                      }

                      if (!u && !c) {
                        p.next = 46;
                        break;
                      }

                      R();
                      p.next = 48;
                      break;

                    case 46:
                      p.next = 48;
                      return regeneratorRuntime.default.awrap(pe(false));

                    case 48:
                      p.next = 57;
                      break;

                    case 50:
                      if (module381.RSM.state != module381.RobotState.BACK_TO_DOCK && module381.RSM.state != module381.RobotState.BACK_TO_DOCK_WASHING_DUSTER) {
                        p.next = 56;
                        break;
                      }

                      p.next = 53;
                      return regeneratorRuntime.default.awrap(module414.default.pause());

                    case 53:
                      module381.RSM.state = module381.RobotState.PAUSE;
                      p.next = 57;
                      break;

                    case 56:
                      if (module381.RSM.state == module381.RobotState.CHARGING) globals.showToast(module500.localization_strings_Common_Constants_8);
                      else if (module381.RSM.state == module381.RobotState.FULL_CHARGE) globals.showToast(module500.localization_strings_Common_Constants_17);

                    case 57:
                      n.endAnimation();
                      module381.RSM.lockMotionStatus();
                      Re();
                      p.next = 66;
                      break;

                    case 62:
                      p.prev = 62;
                      p.t0 = p.catch(3);
                      n.endAnimation();
                      console.log('handle back dock task toCharge:: ' + toCharge + ' error : ' + typeof p.t0 == 'string' ? p.t0 : JSON.stringify(p.t0));

                    case 66:
                    case 'end':
                      return p.stop();
                  }
              },
              null,
              null,
              [[3, 62]],
              Promise
            );
          },
        })
      )
    )
  );
};

require('./1328');

var module22 = require('./22'),
  regeneratorRuntime = require('regenerator-runtime'),
  module23 = require('@babel/runtime/helpers/slicedToArray'),
  React = require('react'),
  module12 = require('./12'),
  module381 = require('./381'),
  module1329 = require('./1329'),
  module414 = require('./414'),
  module1494 = require('./1494'),
  module1495 = require('./1495'),
  module1497 = require('./1497'),
  module1498 = require('./1498'),
  module1499 = require('./1499'),
  module418 = require('./418'),
  module390 = require('./390'),
  module1330 = require('./1330'),
  module422 = require('./422'),
  module1159 = require('./1159'),
  module1501 = require('./1501'),
  module387 = require('./387'),
  module426 = require('./426'),
  module500 = require('./500').strings,
  module393 = require('./393'),
  A = -1;

exports.TabNeutral = A;
var I = 0;
exports.TabGlobal = I;
var F = 1;
exports.TabSegment = F;
var B = 2;
exports.TabZone = B;
var O = module12.StyleSheet.create({
  wrap: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: module1159.BottomControlBottom,
    alignSelf: 'center',
    zIndex: 0,
    alignItems: 'stretch',
  },
});
