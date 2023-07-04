exports.default = function (t) {
  var n,
    h,
    F,
    B,
    y = module1550.default,
    O = React.useRef(),
    W = React.useRef(),
    G = React.useState(module381.RSM.isHomeButtonsEnabled()),
    L = module23.default(G, 2),
    U = L[0],
    K = L[1],
    H = React.useState(),
    z = module23.default(H, 2),
    Z = z[0],
    J = z[1],
    V = React.useState(false),
    Q = module23.default(V, 2),
    j = Q[0],
    q = Q[1],
    X = React.useState(false),
    Y = module23.default(X, 2),
    $ = Y[0],
    ee = Y[1],
    te = React.useState(N),
    ae = module23.default(te, 2),
    ne = ae[0],
    oe = ae[1],
    re = React.useState(0),
    se = module23.default(re, 2),
    le = se[0],
    ue = se[1],
    ce = t.parent.mapView,
    ie = t.parent.sidebarMenu;
  React.useEffect(
    function () {
      if ($)
        setTimeout(function () {
          return ee(false);
        });
      var t = module12.DeviceEventEmitter.addListener(module419.NotificationKeys.BottomControlMenuNeedRefresh, function (t) {
        ee(true);
        console.log('receive refresh', module381.RSM.mopModeId);
      });
      return function () {
        t.remove();
      };
    },
    [$]
  );
  React.useEffect(
    function () {
      ie = t.parent.sidebarMenu;
      var n = module12.DeviceEventEmitter.addListener(module419.NotificationKeys.RobotStatusDidUpdate, function (n) {
        ce = t.parent.mapView;
        K(module381.RSM.isHomeButtonsEnabled());
        Se();
      });
      Se();
      var o = module12.DeviceEventEmitter.addListener(module419.NotificationKeys.BottomControlDoAction, function (t) {
        var n = t.cmd,
          o = t.data;

        if ('changeTab' == n) {
          oe(o);
          ge(o);
        }
      });
      return function () {
        n.remove();
        o.remove();
      };
    },
    [ne, Z]
  );

  var Se = function () {
      var n = ne,
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
        C = module381.RSM.isDrying ? 'stop' : 'start',
        k = 'startCharge',
        h = module381.RSM.isWashReady && module381.RSM.isReadyToCmd(),
        x = (module381.RSM.isCollectWashDock() || module381.RSM.isCollectWashDryDock()) && (module381.RSM.isChargingOnDock() || module381.RSM.isReadyToCmd()),
        w = module381.RSM.isReadyToCollectDust() ? 'startCollect' : 'startCharge';

      if (x) k = 'unfold';
      else if (s) k = 'startCharge';
      else if (o) k = 'startCharge';
      module381.RSM.state;

      if (module381.RSM.isReadyToCollectDust()) {
        R = 'startCollectDust';
        k = module381.RSM.isCollectDock() ? 'startCollectDust' : 'unfold';
      } else if (module381.RSM.state == module381.RobotState.COLLECTING_DUST) {
        R = 'stopCollectDust';
        k = 'stop';
      } else if (module381.RSM.state == module381.RobotState.CHARGING) {
        R = 'charging';
        k = module381.RSM.isWashDock() ? 'startWash' : 'charging';
      } else if (module381.RSM.state == module381.RobotState.FULL_CHARGE) {
        R = 'full';
        k = module381.RSM.isWashDock() ? 'startWash' : 'full';
      } else if (module381.RSM.isCleaning() || module381.RSM.state == module381.RobotState.QUICK_BUILDING_MAP) {
        M = 'pause';
        k = 'startCharge';
      } else if (module381.RSM.isPureMopping()) {
        p = 'pause';
        R = 'start';
      } else if (module381.RSM.state == module381.RobotState.BACK_TO_DOCK) {
        R = 'pause';
        k = 'pauseCharge';
      } else if (module381.RSM.state == module381.RobotState.BACK_TO_DOCK_WASHING_DUSTER) {
        f = 'pause';
        k = 'pauseBackWash';

        if (module381.RSM.cleanResumeFlag != module381.CleanResumeFlag.None) {
          p = 'pause';
          if (!module423.DMM.isGarnet) M = 'pause';
        }
      } else if (module381.RSM.state == module381.RobotState.WASHING_DUSTER) {
        f = 'stop';
        k = 'stop';

        if (module381.RSM.cleanResumeFlag != module381.CleanResumeFlag.None) {
          p = 'pause';
          if (!module423.DMM.isGarnet) M = 'pause';
        }
      } else if (module381.RSM.isInCleanMopping()) _ = 'pause';

      if (h) k = 'unfold';
      var D = module381.RSM.isEnterBackgroundWhenCleaning && module381.RSM.isFnishCleanChargingOnDock() && module381.RSM.cleanResumeFlag == module381.CleanResumeFlag.None;

      if (
        module381.RSM.isFnishCleanBackDock() ||
        (module381.RSM.state == module381.RobotState.BACK_TO_DOCK_WASHING_DUSTER && module381.RSM.cleanResumeFlag == module381.CleanResumeFlag.None) ||
        D ||
        module381.RSM.cleanResumeFlag == module381.CleanResumeFlag.Quick_Build_Map
      ) {
        n = N;
        module381.RSM.isEnterBackgroundWhenCleaning = false;
      } else if (
        module381.RSM.cleanResumeFlag == module381.CleanResumeFlag.Global_Clean ||
        module381.RSM.state == module381.RobotState.SPOT_CLEAN ||
        ((module381.RSM.isChargingOnDock() || module381.RSM.isReadyToCmd()) && module381.RSM.cleanResumeFlag == module381.CleanResumeFlag.None)
      ) {
        if (!(ne != N && module381.RSM.state != module381.RobotState.CLEAN && module381.RSM.state != module381.RobotState.SPOT_CLEAN)) n = P;
      } else if (module381.RSM.cleanResumeFlag == module381.CleanResumeFlag.Segment_Clean) n = E;
      else if (module381.RSM.cleanResumeFlag == module381.CleanResumeFlag.Zone_Clean) n = A;

      if (t.tabDidChange) t.tabDidChange(n);
      ge(n);
      oe(n);
      he(n);
      var T = {
          cleanIconMode: M,
          chargeIconMode: R,
          mopIconMode: p,
          cleanMopIconMode: _,
          washIconMode: f,
          dockIconMode: k,
          collectIconMode: w,
          dryIconMode: C,
        },
        v = false;
      if (Z)
        Object.keys(T).forEach(function (t) {
          if (Z[t] != T[t]) v = true;
        });
      else v = true;
      if (v) J(T);
      ue(module381.RSM.cleanProgress);
    },
    Re = function (n, o) {
      var module23, React, module12, module1545, module1550, module419, module390, module1055, h, x, D;
      return regeneratorRuntime.default.async(
        function (I) {
          for (;;)
            switch ((I.prev = I.next)) {
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
                module1545 = {
                  0: module505.clean_task_change_tip_for_clean,
                  1: module505.clean_task_change_tip_for_mop,
                  2: module505.clean_task_change_tip_for_clean_then_mop,
                };

                module1550 = function () {
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

                module419 = function (t) {
                  if (0 == t) module381.RSM.mockPureCleaningMode();
                  if (1 == t) module381.RSM.mockPureMoppingMode();
                  if (2 == t) module381.RSM.mockCleanMopCleaningMode();
                };

                module390 = function (t) {
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
                            return regeneratorRuntime.default.awrap(module415.default.start([o]));

                          case 4:
                            module387.LogEventCommon('start_clean', o);
                            module393.localPingWithCallback(function (t) {
                              module387.LogEventStatus('connection_with_robot', {
                                isDirectConnection: t,
                              });
                            });
                            module381.RSM.state = module23[n];
                            module381.RSM.cleanResumeFlag = module381.CleanResumeFlag.Global_Clean;
                            module419(n);
                            ne = N;
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

                module1055 = function () {
                  var o, l, module1545, module1550, k, h, x;
                  return regeneratorRuntime.default.async(
                    function (D) {
                      for (;;)
                        switch ((D.prev = D.next)) {
                          case 0:
                            if (((D.prev = 0), ne != P && ne != N)) {
                              D.next = 12;
                              break;
                            }

                            if (!(module381.RSM.isSwitchMapModeManual && -1 != module381.RSM.currentMapId && module414.MM.maps.length > 1)) {
                              D.next = 8;
                              break;
                            }

                            o = {
                              text: module505.localization_strings_Main_MainPage_11,
                            };
                            l = {
                              text: module505.localization_strings_Main_Error_ErrorDetailPage_3,
                              onPress: function () {
                                return regeneratorRuntime.default.async(
                                  function (t) {
                                    for (;;)
                                      switch ((t.prev = t.next)) {
                                        case 0:
                                          t.next = 2;
                                          return regeneratorRuntime.default.awrap(module390(module381.RSM.currentMapId));

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
                              module505.start_clean_with_manual_mode_alert_title.templateStringWithParams({
                                mapName: module414.MM.getCurrentMapName(),
                              }),
                              [o, l]
                            );
                            D.next = 10;
                            break;

                          case 8:
                            D.next = 10;
                            return regeneratorRuntime.default.awrap(module390());

                          case 10:
                            D.next = 47;
                            break;

                          case 12:
                            if (ne != E) {
                              D.next = 30;
                              break;
                            }

                            if ((console.log('Segment mop', t.cleanSegments), !(t.cleanSegments.length > 0))) {
                              D.next = 26;
                              break;
                            }

                            module1545 = [
                              {
                                clean_mop: n,
                                segments: t.cleanSegments,
                                repeat: (4 == module381.RSM.mopModeId ? 2 : ie.state.cleanCount) || 1,
                                clean_order_mode: ie.state.cleanOrder,
                              },
                            ];
                            module1550 = module381.RSM.isSupportOrderSegmentClean() ? module1545 : t.cleanSegments;
                            globals.dlog('clean_mop:' + n, JSON.stringify(module1550));
                            D.next = 20;
                            return regeneratorRuntime.default.awrap(module415.default.segmentClean(module1550));

                          case 20:
                            module387.LogEventCommon('start_segment_clean', module1550);
                            module381.RSM.state = React[n];
                            module381.RSM.cleanResumeFlag = module381.CleanResumeFlag.Segment_Clean;
                            module419(n);
                            D.next = 28;
                            break;

                          case 26:
                            D.next = 28;
                            return regeneratorRuntime.default.awrap(module390());

                          case 28:
                            D.next = 47;
                            break;

                          case 30:
                            if (ne != A) {
                              D.next = 47;
                              break;
                            }

                            if (!(k = ce ? ce.getZoneParams() : null) || !k.length) {
                              D.next = 45;
                              break;
                            }

                            h = (4 == module381.RSM.mopModeId ? 2 : ie.state.cleanCount) || 1;
                            k.forEach(function (t) {
                              t.push(h);
                            });
                            x = module423.DMM.isGarnet
                              ? {
                                  clean_mop: n,
                                  zones: k,
                                }
                              : k;
                            globals.dlog('clean_mop:' + n, JSON.stringify(x));
                            D.next = 39;
                            return regeneratorRuntime.default.awrap(module415.default.zoneClean(x));

                          case 39:
                            module387.LogEventCommon('start_zone_clean', x);
                            module381.RSM.state = module12[n];
                            module381.RSM.cleanResumeFlag = module381.CleanResumeFlag.Zone_Clean;
                            module419(n);
                            D.next = 47;
                            break;

                          case 45:
                            D.next = 47;
                            return regeneratorRuntime.default.awrap(module390());

                          case 47:
                            D.next = 52;
                            break;

                          case 49:
                            D.prev = 49;
                            D.t0 = D.catch(0);
                            console.log('handleCleanTask ' + n + '@startNewTask error: ' + ('object' == typeof D.t0 ? JSON.stringify(D.t0) : D.t0));

                          case 52:
                          case 'end':
                            return D.stop();
                        }
                    },
                    null,
                    null,
                    [[0, 49]],
                    Promise
                  );
                };

                h = function () {
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
                            return regeneratorRuntime.default.awrap(module415.default.resumeSegmentClean());

                          case 4:
                            module381.RSM.state = React[n];
                            module419(n);
                            t.next = 26;
                            break;

                          case 8:
                            if (!module381.RSM.isGlobalCleanTaskShouldResume()) {
                              t.next = 15;
                              break;
                            }

                            t.next = 11;
                            return regeneratorRuntime.default.awrap(
                              module415.default.start([
                                {
                                  clean_mop: n,
                                },
                              ])
                            );

                          case 11:
                            module381.RSM.state = module23[n];
                            module419(n);
                            t.next = 26;
                            break;

                          case 15:
                            if (!module381.RSM.isZoneCleanTaskShouldResume()) {
                              t.next = 22;
                              break;
                            }

                            t.next = 18;
                            return regeneratorRuntime.default.awrap(module415.default.resumeZoneClean());

                          case 18:
                            module381.RSM.state = module12[n];
                            module419(n);
                            t.next = 26;
                            break;

                          case 22:
                            if (!module381.RSM.isQuickBuildMapTaskShouldResume()) {
                              t.next = 26;
                              break;
                            }

                            t.next = 25;
                            return regeneratorRuntime.default.awrap(module415.default.resumeQuickBuildMap());

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
                I.prev = 10;
                I.next = 13;
                return regeneratorRuntime.default.awrap(module381.RSM.getStatus());

              case 13:
                if (module381.RSM.isCleaning() || module381.RSM.isPureMopping() || module381.RSM.isInCleanMopping() || !(module381.RSM.battery < 20)) {
                  I.next = 17;
                  break;
                }

                globals.showToast(module505.localization_strings_Main_Constants_33);
                o.endAnimation();
                return I.abrupt('return');

              case 17:
                if (
                  (module381.RSM.state == module381.RobotState.MALFUNCTIONING && (module381.RSM.state = module381.RobotState.PAUSE),
                  (x =
                    (module381.RSM.state == module381.RobotState.BACK_TO_DOCK_WASHING_DUSTER || module381.RSM.state == module381.RobotState.WASHING_DUSTER) &&
                    module381.RSM.cleanResumeFlag != module381.CleanResumeFlag.None),
                  !module381.RSM.isReadyToNewClean())
                ) {
                  I.next = 24;
                  break;
                }

                I.next = 22;
                return regeneratorRuntime.default.awrap(module1055());

              case 22:
                I.next = 44;
                break;

              case 24:
                if (!module1550() || !module381.RSM.isCleanTaskShouldResume() || x) {
                  I.next = 29;
                  break;
                }

                I.next = 27;
                return regeneratorRuntime.default.awrap(h());

              case 27:
                I.next = 44;
                break;

              case 29:
                if (
                  !module1550() ||
                  !(
                    module381.RSM.isCleaning() ||
                    module381.RSM.isPureMopping() ||
                    module381.RSM.isInCleanMopping() ||
                    x ||
                    module381.RSM.state == module381.RobotState.QUICK_BUILDING_MAP
                  )
                ) {
                  I.next = 36;
                  break;
                }

                I.next = 32;
                return regeneratorRuntime.default.awrap(module415.default.pause());

              case 32:
                module387.LogEventCommon('pause_clean');
                module381.RSM.state = module381.RSM.state == module381.RobotState.SPOT_CLEAN ? module381.RobotState.WAITING : module381.RobotState.PAUSE;
                I.next = 44;
                break;

              case 36:
                if (!module381.RSM.isInBackDockTask() && module1550()) {
                  I.next = 44;
                  break;
                }

                if (!module381.RSM.isInBackDockTask()) {
                  I.next = 42;
                  break;
                }

                I.next = 40;
                return regeneratorRuntime.default.awrap(module1055());

              case 40:
                I.next = 44;
                break;

              case 42:
                D = module1545[n];

                _e(D, module1055);

              case 44:
                o.endAnimation();
                Se();
                module381.RSM.lockMotionStatus();
                I.next = 53;
                break;

              case 49:
                I.prev = 49;
                I.t0 = I.catch(10);
                o.endAnimation();
                console.log('handleCleanTask ' + n + ' error : ' + typeof I.t0 == Object ? JSON.stringify(I.t0) : I.t0);

              case 53:
              case 'end':
                return I.stop();
            }
        },
        null,
        null,
        [[10, 49]],
        Promise
      );
    },
    Me = function (t) {
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
                              return regeneratorRuntime.default.awrap(module415.default.startCollectDust());

                            case 4:
                              n.next = 8;
                              break;

                            case 6:
                              n.next = 8;
                              return regeneratorRuntime.default.awrap(module415.default.charge());

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

                _e(module505.robot_will_begin_collect_dust_tip, function () {
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
    pe = function () {
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

                globals.showToast(module505.start_clean_roller_without_waterbox_tip);
                return n.abrupt('return');

              case 4:
                if (module381.RSM.isWaterBoxCarriageIn) {
                  n.next = 7;
                  break;
                }

                globals.showToast(module505.start_clean_roller_without_waterbox_carriage_tip);
                return n.abrupt('return');

              case 7:
                if (module423.DMM.isTopazS && module381.RSM.cleanResumeFlag != module381.CleanResumeFlag.None)
                  null == (t = globals) ||
                    t.Alert.customAlert('', module505.back_dock_to_wash_alert_tip, null, null, {
                      confirmTitle: module505.localization_strings_Setting_RemoteControlPage_51,
                      shouldShowCancel: false,
                    });
                n.next = 11;
                return regeneratorRuntime.default.awrap(module415.default.startWash());

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
    de = function (t, n) {
      var o, l, u, c, R, module1545, _;

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
                    var t = module381.RSM.state == module381.RobotState.BACK_TO_DOCK || module381.RSM.state == module381.RobotState.COLLECTING_DUST,
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
                                            return regeneratorRuntime.default.awrap(module415.default.startCollectDust());

                                          case 4:
                                            n.next = 8;
                                            break;

                                          case 6:
                                            n.next = 8;
                                            return regeneratorRuntime.default.awrap(module415.default.charge());

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

                              _e(module505.robot_will_begin_collect_dust_tip, function () {
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

                              globals.showToast(module505.start_clean_roller_without_waterbox_tip);
                              return u.abrupt('return');

                            case 15:
                              if (module381.RSM.isWaterBoxCarriageIn) {
                                u.next = 18;
                                break;
                              }

                              globals.showToast(module505.start_clean_roller_without_waterbox_carriage_tip);
                              return u.abrupt('return');

                            case 18:
                              if (module423.DMM.isTopazS && module381.RSM.cleanResumeFlag != module381.CleanResumeFlag.None)
                                null == (l = globals) ||
                                  l.Alert.customAlert('', module505.back_dock_to_wash_alert_tip, null, null, {
                                    confirmTitle: module505.localization_strings_Setting_RemoteControlPage_51,
                                    shouldShowCancel: false,
                                  });
                              u.next = 22;
                              return regeneratorRuntime.default.awrap(module415.default.startWash());

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
                  !(c || R || (o && n) || (!module423.DMM.isGarnet && !n)))
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

                module1545 = n ? module505.home_dialog_begin_new_back_charge : module505.home_dialog_begin_new_back_washing_duster;
                if (module381.RSM.cleanResumeFlag == module381.CleanResumeFlag.Quick_Build_Map) _e(module505.tap_charge_when_quick_building_map_tip, u);
                else _e(module1545, u);
                return f.abrupt('return');

              case 21:
                f.next = 53;
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
                f.next = 53;
                break;

              case 28:
                if (!module381.RSM.isInBackDockTask() && module381.RSM.state != module381.RobotState.WASHING_DUSTER) {
                  f.next = 53;
                  break;
                }

                if (((_ = module381.RSM.state == module381.RobotState.COLLECTING_DUST), !n)) {
                  f.next = 42;
                  break;
                }

                if (module381.RSM.state != module381.RobotState.COLLECTING_DUST) {
                  f.next = 37;
                  break;
                }

                module387.LogEventCommon('stop_collectDust');
                f.next = 35;
                return regeneratorRuntime.default.awrap(module415.default.stopCollectDust());

              case 35:
                f.next = 40;
                break;

              case 37:
                module387.LogEventCommon('pause_back_charge');
                f.next = 40;
                return regeneratorRuntime.default.awrap(module415.default.pause());

              case 40:
                f.next = 51;
                break;

              case 42:
                if (module381.RSM.state != module381.RobotState.WASHING_DUSTER) {
                  f.next = 48;
                  break;
                }

                module387.LogEventCommon('stop_clean_roller');
                f.next = 46;
                return regeneratorRuntime.default.awrap(module415.default.stopWash());

              case 46:
                f.next = 51;
                break;

              case 48:
                module387.LogEventCommon('pause_clean');
                f.next = 51;
                return regeneratorRuntime.default.awrap(module415.default.pause());

              case 51:
                module381.RSM.state = _ ? module381.RobotState.CHARGING : module381.RobotState.PAUSE;
                module381.RSM.backDockResumeFlag = module381.BackDockResumeFlag.Has;

              case 53:
                t.endAnimation();
                Se();
                module381.RSM.lockMotionStatus();
                f.next = 62;
                break;

              case 58:
                f.prev = 58;
                f.t0 = f.catch(1);
                t.endAnimation();
                console.log('handle back dock task toCharge:: ' + n + ' error : ' + typeof f.t0 == 'string' ? f.t0 : JSON.stringify(f.t0));

              case 62:
              case 'end':
                return f.stop();
            }
        },
        null,
        null,
        [[1, 58]],
        Promise
      );
    },
    _e = function (t, n) {
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
                      Se();
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
            confirmTitle: module505.localization_strings_Main_Error_ErrorDetailPage_3,
          }
        );
    },
    fe = function (n) {
      return regeneratorRuntime.default.async(
        function (o) {
          for (;;)
            switch ((o.prev = o.next)) {
              case 0:
                if (ne != n) {
                  o.next = 2;
                  break;
                }

                return o.abrupt('return');

              case 2:
                if (module381.RSM.isShowStopTaskAlert())
                  globals.Alert.alert('', module505.home_dialog_begin_new_clean, [
                    {
                      text: module505.localization_strings_Main_MainPage_11,
                      onPress: function () {},
                    },
                    {
                      text: module505.localization_strings_Main_Error_ErrorDetailPage_3,
                      onPress: function () {
                        return regeneratorRuntime.default.async(
                          function (t) {
                            for (;;)
                              switch ((t.prev = t.next)) {
                                case 0:
                                  if (((t.prev = 0), !j)) {
                                    t.next = 4;
                                    break;
                                  }

                                  globals.showToast(module505.toast_frequently_operate);
                                  return t.abrupt('return');

                                case 4:
                                  q(true);
                                  t.next = 7;
                                  return regeneratorRuntime.default.awrap(module415.default.stop());

                                case 7:
                                  if (!t.sent) {
                                    t.next = 15;
                                    break;
                                  }

                                  module381.RSM.state = module381.RobotState.WAITING;
                                  module381.RSM.cleanResumeFlag = module381.CleanResumeFlag.None;
                                  module381.RSM.backDockResumeFlag = module381.BackDockResumeFlag.None;
                                  if (ce) ce.resetSelectBlocks();
                                  if (ce) ce.clearRectangles();
                                  Se();
                                  me(n);

                                case 15:
                                  q(false);
                                  t.next = 22;
                                  break;

                                case 18:
                                  t.prev = 18;
                                  t.t0 = t.catch(0);
                                  console.log('Switch tab error : ' + JSON.stringify(t.t0));
                                  q(false);

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
                else if (n == E && module390.default.isMapSegmentSupported() && !module381.RSM.mapSaveEnabled) {
                  if (t.switchSegmentTabDidFail) t.switchSegmentTabDidFail();
                } else {
                  me(n);
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
    ge = function (t) {
      var n, o;
      if (!(null == O || null == (n = O.current) || null == (o = n.contentView))) o.changeTab(t);
    },
    me = function (t) {
      ge(t);
      oe(t);
      if (t == E) Ce();
      if (t == P) ke();
      if (t == A) be();
    },
    Ce = function () {
      he(E);
      var n = '';

      if (module381.RSM.mapStatus == module381.MapStatus.Has_WithSegments) {
        var o = 0;
        if (ce)
          ce.state.selectBlockList.forEach(function (t) {
            o += t;
          });
        n =
          o > 0
            ? '' +
              module505.main_page_top_tip_has_selected.templateStringWithParams({
                zones: o,
              })
            : module505.home_menu_select_zone_tip;
      }

      var s = module381.RSM.mapStatus == module381.MapStatus.None || module381.RSM.mapStatus == module381.MapStatus.Has_WithoutSegments;
      if (t.updateParent)
        t.updateParent({
          topTip: n,
          shouldShowNoMap: s,
        });
    },
    ke = function () {
      he(P);
      if (t.updateParent)
        t.updateParent({
          topTip: '',
        });
    },
    be = function () {
      if ((he(A), module381.RSM.mapStatus != module381.MapStatus.None)) {
        if (ce) ce.enterZoneEditMode();
        var n = ce && !ce.hasRects();

        if ((n && ce.addRectangle(), !n)) {
          var o = ce && ce.getZoneParams(),
            s =
              o && o.length > 0
                ? '' +
                  module505.mainpage_top_tip_has_drawed.templateStringWithParams({
                    zones: o.length,
                  })
                : module505.home_menu_draw_zone_tip;
          if (t.updateParent)
            t.updateParent({
              topTip: s,
            });
        }
      }
    },
    he = function n(o) {
      if (ie)
        ie.setState({
          tab: o,
        });
      var s = '2d' == t.parent.state.mapType,
        l = module381.RSM.mapStatus == module381.MapStatus.None || (module381.RSM.mapStatus == module381.MapStatus.Has_WithoutSegments && o == E);
      if (s && !l && !module381.RSM.isLocating && module381.RSM.mapStatus != module381.MapStatus.None)
        if ((ce = t.parent.mapView)) {
          var u = null;

          if (o == E) {
            var c = 1 == ie.state.cleanOrder;

            if (module381.RSM.cleanResumeFlag == module381.CleanResumeFlag.Segment_Clean) {
              u = c
                ? module381.RSM.isCustomCleanWaterMode()
                  ? module1055.MapModelInCleanMode.Segment_Clean_Sequential_Read_Only_With_Clean_Type
                  : module1055.MapModelInCleanMode.Segment_Clean_Sequential_Read_Only
                : module381.RSM.isCustomCleanWaterMode()
                ? module1055.MapModelInCleanMode.Segment_Clean_Read_Only_With_Clean_Type
                : module1055.MapModelInCleanMode.Segment_Clean_Read_Only;
              if (ce) ce.changeMapViewMode(u);
              if (t.updateParent)
                t.updateParent({
                  topTip: '',
                });
            } else {
              u = c
                ? module381.RSM.isCustomCleanWaterMode()
                  ? module1055.MapModelInCleanMode.Segment_Clean_Sequential_Edit_With_Clean_Type
                  : module1055.MapModelInCleanMode.Segment_Clean_Sequential_Edit
                : module381.RSM.isCustomCleanWaterMode()
                ? module1055.MapModelInCleanMode.Segment_Clean_Edit_With_Clean_Type
                : module1055.MapModelInCleanMode.Segment_Clean_Edit;
              if (ce) ce.changeMapViewMode(u);
            }
          }

          if (!(o != P && o != N)) {
            if (t.updateParent)
              t.updateParent({
                topTip: '',
              });
            u = module381.RSM.isCustomCleanWaterMode() ? module1055.MapModelInCleanMode.Global_Clean_With_Clean_Type : module1055.MapModelInCleanMode.Global_Clean;
            if (ce) ce.changeMapViewMode(u);
          }

          if (o == A)
            module381.RSM.cleanResumeFlag == module381.CleanResumeFlag.Zone_Clean
              ? (ce && ce.changeMapViewMode(module1055.MapModelInCleanMode.Zone_Clean_Read_Only),
                t.updateParent &&
                  t.updateParent({
                    topTip: '',
                  }))
              : ce && ce.changeMapViewMode(module1055.MapModelInCleanMode.Zone_Clean_Edit);
        } else
          setTimeout(function () {
            n(o);
          }, 200);
    },
    xe = t.childrenAboveTab,
    we = t.childrenBelowTab;

  return React.default.createElement(
    module12.View,
    {
      style: [
        I.wrap,
        {
          width: module12.Dimensions.get('window').width,
        },
      ],
      pointerEvents: 'box-none',
    },
    xe && xe(),
    module381.RSM.hasGotMapFirstTime &&
      React.default.createElement(module1545.default, {
        ref: O,
        enabled: U,
        onPressTab: function (t) {
          return fe(t);
        },
      }),
    we && we(),
    React.default.createElement(
      module1552.default,
      {
        info: null == (n = t.infoWrapperData) ? undefined : n.info,
        icon: null == (h = t.infoWrapperData) ? undefined : h.icon,
        actionIcon: null == (F = t.infoWrapperData) ? undefined : F.actionIcon,
        action: null == (B = t.infoWrapperData) ? undefined : B.action,
      },
      React.default.createElement(
        y,
        module22.default({}, Z, {
          ref: W,
          enabled: U,
          cleanProgress: le,
          onPressCleanButton: function () {
            var t;
            return regeneratorRuntime.default.async(
              function (n) {
                for (;;)
                  switch ((n.prev = n.next)) {
                    case 0:
                      t = W.current.cleanButton();
                      Re(0, t);

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
                      t = W.current.mopButton();
                      n.next = 3;
                      return regeneratorRuntime.default.awrap(Re(1, t));

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
                      t = W.current.cleanMopButton();
                      n.next = 3;
                      return regeneratorRuntime.default.awrap(Re(2, t));

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
                      t = W.current.chargeButton();
                      n.next = 3;
                      return regeneratorRuntime.default.awrap(de(t, true));

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

                      globals.showToast(module505.localization_strings_Main_Constants_33);
                      return n.abrupt('return');

                    case 3:
                      t = W.current.washButton();
                      n.next = 6;
                      return regeneratorRuntime.default.awrap(de(t));

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
                      (n = W.current.newCollectButton()).startAnimation();
                      o.prev = 3;
                      o.next = 6;
                      return regeneratorRuntime.default.awrap(Me(module381.RSM.isReadyToCollectDust()));

                    case 6:
                      n.endAnimation();
                      module381.RSM.lockMotionStatus();
                      Se();
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
                      (n = W.current.newWashButton()).startAnimation();
                      o.prev = 3;
                      o.next = 6;
                      return regeneratorRuntime.default.awrap(pe());

                    case 6:
                      n.endAnimation();
                      module381.RSM.lockMotionStatus();
                      Se();
                      t(true);
                      o.next = 17;
                      break;

                    case 12:
                      o.prev = 12;
                      o.t0 = o.catch(3);
                      n.endAnimation();
                      t(false, o.t0);
                      console.log('onPressNewWashButton error', module427.ErrorImageMap);

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
                      (n = W.current.dockButton()).startAnimation();
                      p.prev = 3;
                      p.next = 6;
                      return regeneratorRuntime.default.awrap(module381.RSM.getStatus());

                    case 6:
                      if (
                        (module381.RSM.state == module381.RobotState.MALFUNCTIONING && (module381.RSM.state = module381.RobotState.PAUSE),
                        (o = module381.RSM.isCollectDock() && module381.RSM.isChargingOnDock()),
                        (l = module381.RSM.isWashDock() && module381.RSM.isChargingOnDock()),
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
                                                  return regeneratorRuntime.default.awrap(module415.default.startWashThenCharge());

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
                                                  return regeneratorRuntime.default.awrap(module415.default.charge());

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
                                                  return regeneratorRuntime.default.awrap(module415.default.startWash());

                                                case 15:
                                                  n = 'washThenCharge' == t || 'wash' == t;
                                                  module381.RSM.state = n ? module381.RobotState.BACK_TO_DOCK_WASHING_DUSTER : module381.RobotState.BACK_TO_DOCK;
                                                  module381.RSM.backDockResumeFlag = n ? module381.BackDockResumeFlag.None : module381.BackDockResumeFlag.Has;
                                                  if ('wash' != t) module381.RSM.cleanResumeFlag = module381.CleanResumeFlag.None;
                                                  module381.RSM.lockMotionStatus();
                                                  Se();

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
                      return regeneratorRuntime.default.awrap(pe());

                    case 15:
                      p.next = 57;
                      break;

                    case 17:
                      if (!o) {
                        p.next = 22;
                        break;
                      }

                      p.next = 20;
                      return regeneratorRuntime.default.awrap(Me(true));

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
                      return regeneratorRuntime.default.awrap(module415.default.stopCollectDust());

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
                      return regeneratorRuntime.default.awrap(module415.default.stopWash());

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
                        _e(module505.tap_charge_when_quick_building_map_tip, function () {
                          return Me(false);
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
                      return regeneratorRuntime.default.awrap(Me(false));

                    case 48:
                      p.next = 57;
                      break;

                    case 50:
                      if (module381.RSM.state != module381.RobotState.BACK_TO_DOCK && module381.RSM.state != module381.RobotState.BACK_TO_DOCK_WASHING_DUSTER) {
                        p.next = 56;
                        break;
                      }

                      p.next = 53;
                      return regeneratorRuntime.default.awrap(module415.default.pause());

                    case 53:
                      module381.RSM.state = module381.RobotState.PAUSE;
                      p.next = 57;
                      break;

                    case 56:
                      if (module381.RSM.state == module381.RobotState.CHARGING) globals.showToast(module505.localization_strings_Common_Constants_8);
                      else if (module381.RSM.state == module381.RobotState.FULL_CHARGE) globals.showToast(module505.localization_strings_Common_Constants_17);

                    case 57:
                      n.endAnimation();
                      module381.RSM.lockMotionStatus();
                      Se();
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
          onPressNewDryButton: function (t) {
            var n;
            return regeneratorRuntime.default.async(
              function (o) {
                for (;;)
                  switch ((o.prev = o.next)) {
                    case 0:
                      console.log('onPressNewDryButton');
                      (n = W.current.newDryButton()).startAnimation();
                      o.prev = 3;
                      o.next = 6;
                      return regeneratorRuntime.default.awrap(module415.default.setDryerStatus(module381.RSM.isDrying ? 0 : 1));

                    case 6:
                      n.endAnimation();
                      module381.RSM.isDrying = !module381.RSM.isDrying;
                      module381.RSM.lockMotionStatus();
                      Se();
                      t(true);
                      o.next = 18;
                      break;

                    case 13:
                      o.prev = 13;
                      o.t0 = o.catch(3);
                      n.endAnimation();
                      t(false, o.t0);
                      console.log('onPressNewWashButton error', module427.ErrorImageMap);

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
        })
      )
    )
  );
};

require('./1546');

require('./1548');

require('./1549');

require('./1543');

var module22 = require('./22'),
  regeneratorRuntime = require('regenerator-runtime'),
  module23 = require('@babel/runtime/helpers/slicedToArray'),
  React = require('react'),
  module12 = require('./12'),
  module381 = require('./381'),
  module414 = require('./414'),
  module415 = require('./415'),
  module1545 = require('./1545'),
  module1550 = require('./1550'),
  module419 = require('./419'),
  module390 = require('./390'),
  module1055 = require('./1055'),
  module423 = require('./423'),
  module1355 = require('./1355'),
  module1552 = require('./1552'),
  module387 = require('./387'),
  module427 = require('./427'),
  module505 = require('./505').strings,
  module393 = require('./393'),
  N = -1;

exports.TabNeutral = N;
var P = 0;
exports.TabGlobal = P;
var E = 1;
exports.TabSegment = E;
var A = 2;
exports.TabZone = A;
var I = module12.StyleSheet.create({
  wrap: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: module1355.BottomControlBottom,
    alignSelf: 'center',
    zIndex: 0,
    alignItems: 'stretch',
  },
});
