exports.default = function (t) {
  var x,
    v,
    I,
    y,
    A = module377.RSM.hasConnectedWashDock || module377.RSM.isO2Dock() || module377.RSM.isO3Dock() || module415.DMM.isTopazS,
    B = module415.DMM.isGarnet ? module1349.default : A ? module1350.default : module1347.default,
    W = React.useRef(),
    G = React.useRef(),
    L = React.useState(module377.RSM.isHomeButtonsEnabled()),
    U = module22.default(L, 2),
    H = U[0],
    K = U[1],
    z = React.useState(),
    Z = module22.default(z, 2),
    j = Z[0],
    V = Z[1],
    J = React.useState(false),
    q = module22.default(J, 2),
    Q = q[0],
    X = q[1],
    Y = React.useState(false),
    $ = module22.default(Y, 2),
    ee = $[0],
    te = $[1],
    ae = React.useState(N),
    ne = module22.default(ae, 2),
    oe = ne[0],
    re = ne[1],
    se = t.parent.mapView,
    le = t.parent.sidebarMenu;
  React.useEffect(
    function () {
      if (ee)
        setTimeout(function () {
          return te(false);
        });
      var t = module12.DeviceEventEmitter.addListener(module411.NotificationKeys.BottomControlMenuNeedRefresh, function (t) {
        te(true);
        console.log('receive refresh', module377.RSM.mopModeId);
      });
      return function () {
        t.remove();
      };
    },
    [ee]
  );
  React.useEffect(
    function () {
      le = t.parent.sidebarMenu;
      var n = module12.DeviceEventEmitter.addListener(module411.NotificationKeys.RobotStatusDidUpdate, function (n) {
        se = t.parent.mapView;
        K(module377.RSM.isHomeButtonsEnabled());
        ue();
      });
      ue();
      return function () {
        n.remove();
      };
    },
    [oe, j]
  );

  var ue = function () {
      var n = oe,
        o = !module377.RSM.isBackDockWashingDusterMode() && module377.RSM.backDockResumeFlag == module377.BackDockResumeFlag.Has,
        s = module377.RSM.isBackDockWashingDusterMode() && module377.RSM.backDockResumeFlag == module377.BackDockResumeFlag.Has,
        l = module377.RSM.isPureCleaningMode() && module377.RSM.cleanResumeFlag != module377.CleanResumeFlag.None,
        u = module377.RSM.isPureMoppingMode() && module377.RSM.cleanResumeFlag != module377.CleanResumeFlag.None,
        S = (module377.RSM.isCleanMopCleaningMode() || module377.RSM.isCleanMopMoppingMode()) && module377.RSM.cleanResumeFlag != module377.CleanResumeFlag.None,
        M = o ? 'resume' : 'start',
        p = l ? 'resume' : 'start',
        R = u ? 'resume' : 'start',
        f = S ? 'resume' : 'start',
        _ = s ? 'resume' : 'start';

      module377.RSM.state;
      if (module377.RSM.isReadyToCollectDust()) M = 'startCollectDust';
      else if (module377.RSM.state == module377.RobotState.COLLECTING_DUST) M = 'stopCollectDust';
      else if (module377.RSM.state == module377.RobotState.CHARGING) M = 'charging';
      else if (module377.RSM.state == module377.RobotState.FULL_CHARGE) M = 'full';
      else if (module377.RSM.isCleaning()) {
        p = 'pause';
        M = 'start';
      } else if (module377.RSM.isPureMopping()) {
        R = 'pause';
        M = 'start';
      } else if (module377.RSM.state == module377.RobotState.BACK_TO_DOCK) M = 'pause';
      else if (module377.RSM.state == module377.RobotState.BACK_TO_DOCK_WASHING_DUSTER) {
        _ = 'pause';

        if (module377.RSM.cleanResumeFlag != module377.CleanResumeFlag.None) {
          R = 'pause';
          if (!module415.DMM.isGarnet) p = 'pause';
        }
      } else if (module377.RSM.state == module377.RobotState.WASHING_DUSTER) {
        _ = 'stop';

        if (module377.RSM.cleanResumeFlag != module377.CleanResumeFlag.None) {
          R = 'pause';
          if (!module415.DMM.isGarnet) p = 'pause';
        }
      } else if (module377.RSM.isInCleanMopping()) f = 'pause';
      var C = module377.RSM.isEnterBackgroundWhenCleaning && module377.RSM.isFnishCleanChargingOnDock();

      if (module377.RSM.isFnishCleanBackDock() || module377.RSM.state == module377.RobotState.BACK_TO_DOCK_WASHING_DUSTER || C) {
        n = N;
        module377.RSM.isEnterBackgroundWhenCleaning = false;
      } else if (
        module377.RSM.cleanResumeFlag == module377.CleanResumeFlag.Global_Clean ||
        ((module377.RSM.isChargingOnDock() || module377.RSM.isReadyToCmd()) && module377.RSM.cleanResumeFlag == module377.CleanResumeFlag.None)
      ) {
        if (!(module377.RSM.cleanResumeFlag != module377.CleanResumeFlag.Global_Clean && oe != N)) n = E;
      } else if (module377.RSM.cleanResumeFlag == module377.CleanResumeFlag.Segment_Clean) n = P;
      else if (module377.RSM.cleanResumeFlag == module377.CleanResumeFlag.Zone_Clean) n = O;

      if (t.tabDidChange) t.tabDidChange(n);
      pe(n);
      re(n);
      ge(n);
      var b = {
          cleanIconMode: p,
          chargeIconMode: M,
          mopIconMode: R,
          cleanMopIconMode: f,
          washIconMode: _,
        },
        k = false;
      if (j)
        Object.keys(b).forEach(function (t) {
          if (j[t] != b[t]) k = true;
        });
      else k = true;
      if (k) V(b);
    },
    ce = function (o, s) {
      var React, module12, module1346, module1347, module1349, module1350, module411, module386, module1231, x, D;
      return regeneratorRuntime.default.async(
        function (v) {
          for (;;)
            switch ((v.prev = v.next)) {
              case 0:
                React = {
                  0: module377.RobotState.CLEAN,
                  1: module377.RobotState.MOPPING,
                  2: module377.RobotState.CLEAN_MOP_CLEANING,
                };
                module12 = {
                  0: module377.RobotState.SEGMENT_CLEAN,
                  1: module377.RobotState.SEGMENT_MOPPING,
                  2: module377.RobotState.SEGMENT_CLEAN_MOP_CLEANING,
                };
                module1346 = {
                  0: module377.RobotState.ZONED_CLEAN,
                  1: module377.RobotState.ZONED_MOPPING,
                  2: module377.RobotState.ZONED_CLEAN_MOP_CLEANING,
                };
                module1347 = {
                  0: module491.clean_task_change_tip_for_clean,
                  1: module491.clean_task_change_tip_for_mop,
                  2: module491.clean_task_change_tip_for_clean_then_mop,
                };

                module1349 = function () {
                  return (
                    undefined == module377.RSM.clean_mop_status ||
                    (0 == o
                      ? 1 == module377.RSM.clean_mop_status || module377.RSM.state == module377.RobotState.SPOT_CLEAN
                      : 1 == o
                      ? 2 == module377.RSM.clean_mop_status
                      : 2 == o
                      ? 6 == module377.RSM.clean_mop_status || 7 == module377.RSM.clean_mop_status
                      : undefined)
                  );
                };

                module1350 = function (t) {
                  if (0 == t) module377.RSM.mockPureCleaningMode();
                  if (1 == t) module377.RSM.mockPureMoppingMode();
                  if (2 == t) module377.RSM.mockCleanMopCleaningMode();
                };

                module411 = function (t) {
                  var s;
                  return regeneratorRuntime.default.async(
                    function (u) {
                      for (;;)
                        switch ((u.prev = u.next)) {
                          case 0:
                            u.prev = 0;
                            s =
                              undefined != t
                                ? {
                                    clean_mop: o,
                                    map_index: [t],
                                  }
                                : {
                                    clean_mop: o,
                                  };
                            u.next = 4;
                            return regeneratorRuntime.default.awrap(module407.default.start([s]));

                          case 4:
                            module383.LogEventCommon('start_clean', s);
                            module377.RSM.state = React[o];
                            module377.RSM.cleanResumeFlag = module377.CleanResumeFlag.Global_Clean;
                            module1350(o);
                            oe = N;
                            u.next = 14;
                            break;

                          case 11:
                            u.prev = 11;
                            u.t0 = u.catch(0);
                            console.log('globalStartTask  ' + o + ' error: ' + ('object' == typeof u.t0 ? JSON.stringify(u.t0) : u.t0));

                          case 14:
                          case 'end':
                            return u.stop();
                        }
                    },
                    null,
                    null,
                    [[0, 11]],
                    Promise
                  );
                };

                module386 = function () {
                  var s, l, module1347, module1349, b, module1231, x;
                  return regeneratorRuntime.default.async(
                    function (D) {
                      for (;;)
                        switch ((D.prev = D.next)) {
                          case 0:
                            if (((D.prev = 0), oe != E && oe != N)) {
                              D.next = 12;
                              break;
                            }

                            if (!(module377.RSM.isSwitchMapModeManual && -1 != module377.RSM.currentMapId && module1229.MM.maps.length > 1)) {
                              D.next = 8;
                              break;
                            }

                            s = {
                              text: module491.localization_strings_Main_MainPage_11,
                            };
                            l = {
                              text: module491.localization_strings_Main_Error_ErrorDetailPage_3,
                              onPress: function () {
                                return regeneratorRuntime.default.async(
                                  function (t) {
                                    for (;;)
                                      switch ((t.prev = t.next)) {
                                        case 0:
                                          t.next = 2;
                                          return regeneratorRuntime.default.awrap(module411(module377.RSM.currentMapId));

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
                              module491.start_clean_with_manual_mode_alert_title.templateStringWithParams({
                                mapName: module1229.MM.getCurrentMapName(),
                              }),
                              [s, l]
                            );
                            D.next = 10;
                            break;

                          case 8:
                            D.next = 10;
                            return regeneratorRuntime.default.awrap(module411());

                          case 10:
                            D.next = 47;
                            break;

                          case 12:
                            if (oe != P) {
                              D.next = 30;
                              break;
                            }

                            if ((console.log('Segment mop', t.cleanSegments), !(t.cleanSegments.length > 0))) {
                              D.next = 26;
                              break;
                            }

                            module1347 = [
                              {
                                clean_mop: o,
                                segments: t.cleanSegments,
                                repeat: le.state.cleanCount,
                                clean_order_mode: le.state.cleanOrder,
                              },
                            ];
                            module1349 = module377.RSM.isSupportOrderSegmentClean() ? module1347 : t.cleanSegments;
                            globals.dlog('clean_mop:' + o, JSON.stringify(module1349));
                            D.next = 20;
                            return regeneratorRuntime.default.awrap(module407.default.segmentClean(module1349));

                          case 20:
                            module383.LogEventCommon('start_segment_clean', module1349);
                            module377.RSM.state = module12[o];
                            module377.RSM.cleanResumeFlag = module377.CleanResumeFlag.Segment_Clean;
                            module1350(o);
                            D.next = 28;
                            break;

                          case 26:
                            D.next = 28;
                            return regeneratorRuntime.default.awrap(module411());

                          case 28:
                            D.next = 47;
                            break;

                          case 30:
                            if (oe != O) {
                              D.next = 47;
                              break;
                            }

                            if (!(b = se ? se.getZoneParams() : null) || !b.length) {
                              D.next = 45;
                              break;
                            }

                            module1231 = le.state.cleanCount;
                            b.forEach(function (t) {
                              t.push(module1231);
                            });
                            x = module415.DMM.isGarnet
                              ? {
                                  clean_mop: o,
                                  zones: b,
                                }
                              : b;
                            globals.dlog('clean_mop:' + o, JSON.stringify(x));
                            D.next = 39;
                            return regeneratorRuntime.default.awrap(module407.default.zoneClean(x));

                          case 39:
                            module383.LogEventCommon('start_zone_clean', x);
                            module377.RSM.state = module1346[o];
                            module377.RSM.cleanResumeFlag = module377.CleanResumeFlag.Zone_Clean;
                            module1350(o);
                            D.next = 47;
                            break;

                          case 45:
                            D.next = 47;
                            return regeneratorRuntime.default.awrap(module411());

                          case 47:
                            D.next = 52;
                            break;

                          case 49:
                            D.prev = 49;
                            D.t0 = D.catch(0);
                            console.log('handleCleanTask ' + o + '@startNewTask error: ' + ('object' == typeof D.t0 ? JSON.stringify(D.t0) : D.t0));

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

                module1231 = function () {
                  return regeneratorRuntime.default.async(
                    function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            if (((t.prev = 0), !module377.RSM.isSegmentCleanTaskShouldResume())) {
                              t.next = 8;
                              break;
                            }

                            t.next = 4;
                            return regeneratorRuntime.default.awrap(module407.default.resumeSegmentClean());

                          case 4:
                            module377.RSM.state = module12[o];
                            module1350(o);
                            t.next = 20;
                            break;

                          case 8:
                            if (!module377.RSM.isGlobalCleanTaskShouldResume()) {
                              t.next = 15;
                              break;
                            }

                            t.next = 11;
                            return regeneratorRuntime.default.awrap(
                              module407.default.start([
                                {
                                  clean_mop: o,
                                },
                              ])
                            );

                          case 11:
                            module377.RSM.state = React[o];
                            module1350(o);
                            t.next = 20;
                            break;

                          case 15:
                            if (!module377.RSM.isZoneCleanTaskShouldResume()) {
                              t.next = 20;
                              break;
                            }

                            t.next = 18;
                            return regeneratorRuntime.default.awrap(module407.default.resumeZoneClean());

                          case 18:
                            module377.RSM.state = module1346[o];
                            module1350(o);

                          case 20:
                            module383.LogEventCommon('resume_clean');
                            t.next = 26;
                            break;

                          case 23:
                            t.prev = 23;
                            t.t0 = t.catch(0);
                            console.log('handleCleanTask ' + o + '@resumeTask error: ' + ('object' == typeof t.t0 ? JSON.stringify(t.t0) : t.t0));

                          case 26:
                          case 'end':
                            return t.stop();
                        }
                    },
                    null,
                    null,
                    [[0, 23]],
                    Promise
                  );
                };

                s.startAnimation();
                v.prev = 10;
                v.next = 13;
                return regeneratorRuntime.default.awrap(module377.RSM.getStatus());

              case 13:
                if (module377.RSM.isCleaning() || module377.RSM.isPureMopping() || module377.RSM.isInCleanMopping() || !(module377.RSM.battery <= 20)) {
                  v.next = 17;
                  break;
                }

                globals.showToast(module491.localization_strings_Main_Constants_33);
                s.endAnimation();
                return v.abrupt('return');

              case 17:
                if (
                  (module377.RSM.state == module377.RobotState.MALFUNCTIONING && (module377.RSM.state = module377.RobotState.PAUSE),
                  (x =
                    (module377.RSM.state == module377.RobotState.BACK_TO_DOCK_WASHING_DUSTER || module377.RSM.state == module377.RobotState.WASHING_DUSTER) &&
                    module377.RSM.cleanResumeFlag != module377.CleanResumeFlag.None),
                  !module377.RSM.isReadyToNewClean())
                ) {
                  v.next = 24;
                  break;
                }

                v.next = 22;
                return regeneratorRuntime.default.awrap(module386());

              case 22:
                v.next = 44;
                break;

              case 24:
                if (!module1349() || !module377.RSM.isCleanTaskShouldResume() || x) {
                  v.next = 29;
                  break;
                }

                v.next = 27;
                return regeneratorRuntime.default.awrap(module1231());

              case 27:
                v.next = 44;
                break;

              case 29:
                if (!module1349() || !(module377.RSM.isCleaning() || module377.RSM.isPureMopping() || module377.RSM.isInCleanMopping() || x)) {
                  v.next = 36;
                  break;
                }

                v.next = 32;
                return regeneratorRuntime.default.awrap(module407.default.pause());

              case 32:
                module383.LogEventCommon('pause_clean');
                module377.RSM.state = module377.RSM.state == module377.RobotState.SPOT_CLEAN ? module377.RobotState.WAITING : module377.RobotState.PAUSE;
                v.next = 44;
                break;

              case 36:
                if (!module377.RSM.isInBackDockTask() && module1349()) {
                  v.next = 44;
                  break;
                }

                if (!module377.RSM.isInBackDockTask()) {
                  v.next = 42;
                  break;
                }

                v.next = 40;
                return regeneratorRuntime.default.awrap(module386());

              case 40:
                v.next = 44;
                break;

              case 42:
                D = module1347[o];
                Se(D, module386);

              case 44:
                s.endAnimation();
                ue();
                module377.RSM.lockMotionStatus();
                v.next = 53;
                break;

              case 49:
                v.prev = 49;
                v.t0 = v.catch(10);
                s.endAnimation();
                console.log('handleCleanTask ' + o + ' error : ' + typeof v.t0 == Object ? JSON.stringify(v.t0) : v.t0);

              case 53:
              case 'end':
                return v.stop();
            }
        },
        null,
        null,
        [[10, 49]],
        Promise
      );
    },
    ie = function (o, s) {
      var l, u, S, p, R, module1349, module1350, C, b;
      return regeneratorRuntime.default.async(
        function (k) {
          for (;;)
            switch ((k.prev = k.next)) {
              case 0:
                o.startAnimation();
                k.prev = 1;
                k.next = 4;
                return regeneratorRuntime.default.awrap(module377.RSM.getStatus());

              case 4:
                if (
                  (module377.RSM.state == module377.RobotState.MALFUNCTIONING && (module377.RSM.state = module377.RobotState.PAUSE),
                  (l = module377.RSM.isReadyToCollectDust()),
                  (u = function () {
                    var t = module377.RSM.state == module377.RobotState.BACK_TO_DOCK || module377.RSM.isAirDrying || module377.RSM.state == module377.RobotState.COLLECTING_DUST,
                      n = module377.RSM.state == module377.RobotState.BACK_TO_DOCK_WASHING_DUSTER || module377.RSM.state == module377.RobotState.WASHING_DUSTER;
                    return t ? s : n && !s;
                  }),
                  (S = function () {
                    var t, o;
                    return regeneratorRuntime.default.async(
                      function (u) {
                        for (;;)
                          switch ((u.prev = u.next)) {
                            case 0:
                              if (((u.prev = 0), !s)) {
                                u.next = 11;
                                break;
                              }

                              if (
                                ((t = function (t) {
                                  return regeneratorRuntime.default.async(
                                    function (o) {
                                      for (;;)
                                        switch ((o.prev = o.next)) {
                                          case 0:
                                            if (
                                              (module377.RSM.backDockResumeFlag == module377.BackDockResumeFlag.None
                                                ? module383.LogEventCommon('start_charge', {
                                                    isDustTask: t,
                                                  })
                                                : module383.LogEventCommon('resume_back_charge', {
                                                    isDustTask: t,
                                                  }),
                                              !t)
                                            ) {
                                              o.next = 6;
                                              break;
                                            }

                                            o.next = 4;
                                            return regeneratorRuntime.default.awrap(module407.default.startCollectDust());

                                          case 4:
                                            o.next = 8;
                                            break;

                                          case 6:
                                            o.next = 8;
                                            return regeneratorRuntime.default.awrap(module407.default.charge());

                                          case 8:
                                            module377.RSM.state = t ? module377.RobotState.COLLECTING_DUST : module377.RobotState.BACK_TO_DOCK;
                                            module377.RSM.backDockResumeFlag = t ? module377.BackDockResumeFlag.None : module377.BackDockResumeFlag.Has;
                                            module377.RSM.cleanResumeFlag = module377.CleanResumeFlag.None;

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
                                }),
                                !l)
                              ) {
                                u.next = 7;
                                break;
                              }

                              Se(module491.robot_will_begin_collect_dust_tip, function () {
                                return regeneratorRuntime.default.async(
                                  function (o) {
                                    for (;;)
                                      switch ((o.prev = o.next)) {
                                        case 0:
                                          o.next = 2;
                                          return regeneratorRuntime.default.awrap(t(true));

                                        case 2:
                                          return o.abrupt('return', o.sent);

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
                              });
                              u.next = 9;
                              break;

                            case 7:
                              u.next = 9;
                              return regeneratorRuntime.default.awrap(t(false));

                            case 9:
                              u.next = 18;
                              break;

                            case 11:
                              module383.LogEventCommon('start_clean_roller');
                              if (module415.DMM.isTopazS && module377.RSM.cleanResumeFlag != module377.CleanResumeFlag.None)
                                null == (o = globals) ||
                                  o.Alert.customAlert('', module491.back_dock_to_wash_alert_tip, null, null, {
                                    confirmTitle: module491.localization_strings_Setting_RemoteControlPage_51,
                                    shouldShowCancel: false,
                                  });
                              u.next = 16;
                              return regeneratorRuntime.default.awrap(module407.default.startWash());

                            case 16:
                              module377.RSM.state = module377.RobotState.BACK_TO_DOCK_WASHING_DUSTER;
                              module377.RSM.backDockResumeFlag = module377.BackDockResumeFlag.None;

                            case 18:
                              u.next = 23;
                              break;

                            case 20:
                              u.prev = 20;
                              u.t0 = u.catch(0);
                              console.log('handleBackDockTask startTask toCharge:: ' + s + ' error: ' + ('object' == typeof u.t0 ? JSON.stringify(u.t0) : u.t0));

                            case 23:
                            case 'end':
                              return u.stop();
                          }
                      },
                      null,
                      null,
                      [[0, 20]],
                      Promise
                    );
                  }),
                  !(
                    module377.RSM.isCleaning() ||
                    (module377.RSM.isCleanTaskShouldResume() && !module377.RSM.isInBackDockTask() && !module377.RSM.isChargingOnDock()) ||
                    module377.RSM.isPureMopping() ||
                    module377.RSM.isInCleanMopping()
                  ))
                ) {
                  k.next = 24;
                  break;
                }

                if (
                  (o.endAnimation(),
                  (p = (module377.RSM.isPureMopping() || module377.RSM.isCleanMopMopping()) && !s),
                  (R = (module377.RSM.isPureMoppingMode() || module377.RSM.isCleanMopMoppingMode()) && !s && module377.RSM.cleanResumeFlag != module377.CleanResumeFlag.None),
                  !(p || R || (l && s) || (module415.DMM.isTopazS && !s)))
                ) {
                  k.next = 17;
                  break;
                }

                k.next = 15;
                return regeneratorRuntime.default.awrap(S());

              case 15:
                k.next = 22;
                break;

              case 17:
                if (module377.RSM.isChargingOnDock()) {
                  k.next = 22;
                  break;
                }

                module1349 = s ? module491.home_dialog_begin_new_back_charge : module491.home_dialog_begin_new_back_washing_duster;
                module1350 = module377.RSM.isWaterBoxCarriageIn && module377.RSM.isWaterBoxIn && module415.DMM.isTopazS;

                if (s && module1350) {
                  C = t.askBeforeBackDock;
                  t.chargeOrWashThenCharge;
                  if (C)
                    C(function (t) {
                      return regeneratorRuntime.default.async(
                        function (o) {
                          for (;;)
                            switch ((o.prev = o.next)) {
                              case 0:
                                if (!t) {
                                  o.next = 6;
                                  break;
                                }

                                o.next = 3;
                                return regeneratorRuntime.default.awrap(module407.default.startWashThenCharge());

                              case 3:
                                console.log('pure charge and wash ');
                                o.next = 9;
                                break;

                              case 6:
                                o.next = 8;
                                return regeneratorRuntime.default.awrap(module407.default.charge());

                              case 8:
                                console.log('pure charge');

                              case 9:
                                module377.RSM.state = t ? module377.RobotState.BACK_TO_DOCK_WASHING_DUSTER : module377.RobotState.BACK_TO_DOCK;
                                module377.RSM.backDockResumeFlag = t ? module377.BackDockResumeFlag.None : module377.BackDockResumeFlag.Has;
                                module377.RSM.cleanResumeFlag = module377.CleanResumeFlag.None;

                              case 12:
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
                } else Se(module1349, S);

                return k.abrupt('return');

              case 22:
                k.next = 58;
                break;

              case 24:
                if (
                  !(
                    module377.RSM.isReadyToCmd() ||
                    module377.RSM.state == module377.RobotState.PAUSE ||
                    (module377.RSM.isChargingOnDock() && (!s || l)) ||
                    (module377.RSM.isInBackDockTask() && !u())
                  )
                ) {
                  k.next = 29;
                  break;
                }

                k.next = 27;
                return regeneratorRuntime.default.awrap(S());

              case 27:
                k.next = 58;
                break;

              case 29:
                if (!module377.RSM.isInBackDockTask() && module377.RSM.state != module377.RobotState.WASHING_DUSTER) {
                  k.next = 58;
                  break;
                }

                if (((b = module377.RSM.state == module377.RobotState.COLLECTING_DUST), !s)) {
                  k.next = 47;
                  break;
                }

                if (module377.RSM.state != module377.RobotState.COLLECTING_DUST) {
                  k.next = 38;
                  break;
                }

                module383.LogEventCommon('stop_collectDust');
                k.next = 36;
                return regeneratorRuntime.default.awrap(module407.default.stopCollectDust());

              case 36:
                k.next = 45;
                break;

              case 38:
                if (!module377.RSM.isAirDrying) {
                  k.next = 42;
                  break;
                }

                return k.abrupt('return');

              case 42:
                module383.LogEventCommon('pause_back_charge');
                k.next = 45;
                return regeneratorRuntime.default.awrap(module407.default.pause());

              case 45:
                k.next = 56;
                break;

              case 47:
                if (module377.RSM.state != module377.RobotState.WASHING_DUSTER) {
                  k.next = 53;
                  break;
                }

                module383.LogEventCommon('stop_clean_roller');
                k.next = 51;
                return regeneratorRuntime.default.awrap(module407.default.stopWash());

              case 51:
                k.next = 56;
                break;

              case 53:
                module383.LogEventCommon('pause_clean');
                k.next = 56;
                return regeneratorRuntime.default.awrap(module407.default.pause());

              case 56:
                module377.RSM.state = b ? module377.RobotState.CHARGING : module377.RobotState.PAUSE;
                module377.RSM.backDockResumeFlag = module377.BackDockResumeFlag.Has;

              case 58:
                o.endAnimation();
                ue();
                module377.RSM.lockMotionStatus();
                k.next = 67;
                break;

              case 63:
                k.prev = 63;
                k.t0 = k.catch(1);
                o.endAnimation();
                console.log('handle back dock task toCharge:: ' + s + ' error : ' + typeof k.t0 == 'string' ? k.t0 : JSON.stringify(k.t0));

              case 67:
              case 'end':
                return k.stop();
            }
        },
        null,
        null,
        [[1, 63]],
        Promise
      );
    },
    Se = function (t, o) {
      if (globals.Alert)
        globals.Alert.customAlert(
          '',
          t,
          function () {
            return regeneratorRuntime.default.async(
              function (s) {
                for (;;)
                  switch ((s.prev = s.next)) {
                    case 0:
                      if (((s.prev = 0), (s.t0 = o), !s.t0)) {
                        s.next = 5;
                        break;
                      }

                      s.next = 5;
                      return regeneratorRuntime.default.awrap(o());

                    case 5:
                      ue();
                      module377.RSM.lockMotionStatus();
                      s.next = 12;
                      break;

                    case 9:
                      s.prev = 9;
                      s.t1 = s.catch(0);
                      console.log('showConfirmDialog ' + t + ' error: ' + ('object' == typeof s.t1 ? JSON.stringify(s.t1) : s.t1));

                    case 12:
                    case 'end':
                      return s.stop();
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
            confirmTitle: module491.localization_strings_Main_Error_ErrorDetailPage_3,
          }
        );
    },
    Me = function (o) {
      return regeneratorRuntime.default.async(
        function (s) {
          for (;;)
            switch ((s.prev = s.next)) {
              case 0:
                if (oe != o) {
                  s.next = 2;
                  break;
                }

                return s.abrupt('return');

              case 2:
                if (
                  module377.RSM.cleanResumeFlag != module377.CleanResumeFlag.None ||
                  (module377.RSM.backDockResumeFlag != module377.BackDockResumeFlag.None && module377.RSM.state != module377.RobotState.WAITING) ||
                  module377.RSM.state == module377.RobotState.SPOT_CLEAN
                )
                  globals.Alert.alert('', module491.home_dialog_begin_new_clean, [
                    {
                      text: module491.localization_strings_Main_MainPage_11,
                      onPress: function () {},
                    },
                    {
                      text: module491.localization_strings_Main_Error_ErrorDetailPage_3,
                      onPress: function () {
                        return regeneratorRuntime.default.async(
                          function (t) {
                            for (;;)
                              switch ((t.prev = t.next)) {
                                case 0:
                                  if (((t.prev = 0), !Q)) {
                                    t.next = 4;
                                    break;
                                  }

                                  globals.showToast(module491.toast_frequently_operate);
                                  return t.abrupt('return');

                                case 4:
                                  X(true);
                                  t.next = 7;
                                  return regeneratorRuntime.default.awrap(module407.default.stop());

                                case 7:
                                  if (!t.sent) {
                                    t.next = 15;
                                    break;
                                  }

                                  module377.RSM.state = module377.RobotState.WAITING;
                                  module377.RSM.cleanResumeFlag = module377.CleanResumeFlag.None;
                                  module377.RSM.backDockResumeFlag = module377.BackDockResumeFlag.None;
                                  if (se) se.resetSelectBlocks();
                                  if (se) se.clearRectangles();
                                  ue();
                                  Re(o);

                                case 15:
                                  X(false);
                                  t.next = 22;
                                  break;

                                case 18:
                                  t.prev = 18;
                                  t.t0 = t.catch(0);
                                  console.log('Switch tab error : ' + JSON.stringify(t.t0));
                                  X(false);

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
                else if (o == P && module386.default.isMapSegmentSupported() && !module377.RSM.mapSaveEnabled) {
                  if (t.switchSegmentTabDidFail) t.switchSegmentTabDidFail();
                } else {
                  Re(o);
                  if (t.tabDidChange) t.tabDidChange(o);
                }

              case 3:
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
    pe = function (t) {
      if (W.current.contentView) W.current.contentView.changeTab(t);
    },
    Re = function (t) {
      pe(t);
      re(t);
      if (t == P) de();
      if (t == E) fe();
      if (t == O) _e();
    },
    de = function () {
      ge(P);
      var n = '';

      if (module377.RSM.mapStatus == module377.MapStatus.Has_WithSegments) {
        var o = 0;
        if (se)
          se.state.selectBlockList.forEach(function (t) {
            o += t;
          });
        n =
          o > 0
            ? '' +
              module491.main_page_top_tip_has_selected.templateStringWithParams({
                zones: o,
              })
            : module491.home_menu_select_zone_tip;
      }

      var s = module377.RSM.mapStatus == module377.MapStatus.None || module377.RSM.mapStatus == module377.MapStatus.Has_WithoutSegments;
      if (t.updateParent)
        t.updateParent({
          topTip: n,
          shouldShowNoMap: s,
        });
    },
    fe = function () {
      ge(E);
      if (t.updateParent)
        t.updateParent({
          topTip: '',
        });
    },
    _e = function () {
      if ((ge(O), module377.RSM.mapStatus != module377.MapStatus.None)) {
        if (se) se.enterZoneEditMode();
        var n = se && !se.hasRects();

        if ((n && se.addRectangle(), !n)) {
          var o = se && se.getZoneParams(),
            s =
              o && o.length > 0
                ? '' +
                  module491.mainpage_top_tip_has_drawed.templateStringWithParams({
                    zones: o.length,
                  })
                : module491.home_menu_draw_zone_tip;
          if (t.updateParent)
            t.updateParent({
              topTip: s,
            });
        }
      }
    },
    ge = function n(o) {
      if (
        (le &&
          le.setState({
            tab: o,
          }),
        module377.RSM.mapStatus != module377.MapStatus.None)
      )
        if ((se = t.parent.mapView)) {
          var s = null;

          if (o == P) {
            var l = 1 == le.state.cleanOrder;

            if (module377.RSM.cleanResumeFlag == module377.CleanResumeFlag.Segment_Clean) {
              s = l
                ? module377.RSM.isCustomCleanWaterMode()
                  ? module1231.MapModelInCleanMode.Segment_Clean_Sequential_Read_Only_With_Clean_Type
                  : module1231.MapModelInCleanMode.Segment_Clean_Sequential_Read_Only
                : module377.RSM.isCustomCleanWaterMode()
                ? module1231.MapModelInCleanMode.Segment_Clean_Read_Only_With_Clean_Type
                : module1231.MapModelInCleanMode.Segment_Clean_Read_Only;
              if (se) se.changeMapViewMode(s);
              if (t.updateParent)
                t.updateParent({
                  topTip: '',
                });
            } else {
              s = l
                ? module377.RSM.isCustomCleanWaterMode()
                  ? module1231.MapModelInCleanMode.Segment_Clean_Sequential_Edit_With_Clean_Type
                  : module1231.MapModelInCleanMode.Segment_Clean_Sequential_Edit
                : module377.RSM.isCustomCleanWaterMode()
                ? module1231.MapModelInCleanMode.Segment_Clean_Edit_With_Clean_Type
                : module1231.MapModelInCleanMode.Segment_Clean_Edit;
              if (se) se.changeMapViewMode(s);
            }
          }

          if (!(o != E && o != N)) {
            if (t.updateParent)
              t.updateParent({
                topTip: '',
              });
            s = module377.RSM.isCustomCleanWaterMode() ? module1231.MapModelInCleanMode.Global_Clean_With_Clean_Type : module1231.MapModelInCleanMode.Global_Clean;
            if (se) se.changeMapViewMode(s);
          }

          if (o == O)
            module377.RSM.cleanResumeFlag == module377.CleanResumeFlag.Zone_Clean
              ? (se && se.changeMapViewMode(module1231.MapModelInCleanMode.Zone_Clean_Read_Only),
                t.updateParent &&
                  t.updateParent({
                    topTip: '',
                  }))
              : se && se.changeMapViewMode(module1231.MapModelInCleanMode.Zone_Clean_Edit);
        } else
          setTimeout(function () {
            n(o);
          }, 200);
    },
    me = t.childrenAboveTab,
    Ce = t.childrenBelowTab;

  return React.default.createElement(
    module12.View,
    {
      style: F.wrap,
      pointerEvents: 'box-none',
    },
    me && me(),
    React.default.createElement(module1346.default, {
      ref: W,
      enabled: H,
      onPressTab: function (t) {
        return Me(t);
      },
    }),
    Ce && Ce(),
    React.default.createElement(
      module1351.default,
      {
        info: null == (x = t.infoWrapperData) ? undefined : x.info,
        icon: null == (v = t.infoWrapperData) ? undefined : v.icon,
        actionIcon: null == (I = t.infoWrapperData) ? undefined : I.actionIcon,
        action: null == (y = t.infoWrapperData) ? undefined : y.action,
      },
      React.default.createElement(
        B,
        module21.default({}, j, {
          ref: G,
          enabled: H,
          onPressCleanButton: function () {
            var t;
            return regeneratorRuntime.default.async(
              function (n) {
                for (;;)
                  switch ((n.prev = n.next)) {
                    case 0:
                      t = G.current.cleanButton();
                      ce(0, t);

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
              function (o) {
                for (;;)
                  switch ((o.prev = o.next)) {
                    case 0:
                      t = G.current.mopButton();
                      o.next = 3;
                      return regeneratorRuntime.default.awrap(ce(1, t));

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
          onPressCleanMopButton: function () {
            var t;
            return regeneratorRuntime.default.async(
              function (o) {
                for (;;)
                  switch ((o.prev = o.next)) {
                    case 0:
                      t = G.current.cleanMopButton();
                      o.next = 3;
                      return regeneratorRuntime.default.awrap(ce(2, t));

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
          onPressChargeButton: function () {
            var t;
            return regeneratorRuntime.default.async(
              function (o) {
                for (;;)
                  switch ((o.prev = o.next)) {
                    case 0:
                      t = G.current.chargeButton();
                      o.next = 3;
                      return regeneratorRuntime.default.awrap(ie(t, true));

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
          onPressWashButton: function () {
            var t;
            return regeneratorRuntime.default.async(
              function (o) {
                for (;;)
                  switch ((o.prev = o.next)) {
                    case 0:
                      if (
                        !(
                          module377.RSM.state != module377.RobotState.BACK_TO_DOCK_WASHING_DUSTER &&
                          module377.RSM.state != module377.RobotState.WASHING_DUSTER &&
                          module377.RSM.battery < 10
                        )
                      ) {
                        o.next = 3;
                        break;
                      }

                      globals.showToast(module491.localization_strings_Main_Constants_33);
                      return o.abrupt('return');

                    case 3:
                      t = G.current.washButton();
                      o.next = 6;
                      return regeneratorRuntime.default.awrap(ie(t));

                    case 6:
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
        })
      )
    )
  );
};

var regeneratorRuntime = require('regenerator-runtime'),
  module21 = require('./21'),
  module22 = require('./22'),
  React = (function (t, n) {
    if (!n && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var o = v(n);
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
  module377 = require('./377'),
  module1229 = require('./1229'),
  module407 = require('./407'),
  module1346 = require('./1346'),
  module1347 = require('./1347'),
  module1349 = require('./1349'),
  module1350 = require('./1350'),
  module411 = require('./411'),
  module386 = require('./386'),
  module1231 = require('./1231'),
  module415 = require('./415'),
  module1063 = require('./1063'),
  module1351 = require('./1351'),
  module383 = require('./383');

require('./1352');

function v(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (v = function (t) {
    return t ? o : n;
  })(t);
}

require('./389');

var module491 = require('./491').strings,
  N = -1;

exports.TabNeutral = N;
var E = 0;
exports.TabGlobal = E;
var P = 1;
exports.TabSegment = P;
var O = 2;
exports.TabZone = O;
var F = module12.StyleSheet.create({
  wrap: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: module1063.BottomControlBottom,
    alignSelf: 'center',
    zIndex: 0,
    alignItems: 'center',
  },
});
