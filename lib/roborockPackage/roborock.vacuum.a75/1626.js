exports.default = function (t) {
  t.parent.mapView3D;

  var n,
    h,
    U,
    H,
    V = React.useContext(module1199.AppConfigContext).theme,
    K = function () {
      return module390.default.isDssBelievable() && (module381.RSM.isO3Dock() || module381.RSM.isO3PlusDock() || module381.RSM.isO4Dock() || module381.RSM.isPearlDock());
    },
    Z = K() ? module1632.default : module1628.default,
    z = React.useRef(),
    J = React.useRef(),
    Q = React.useRef(),
    j = React.useState(module381.RSM.isHomeButtonsEnabled()),
    q = module23.default(j, 2),
    X = q[0],
    Y = q[1],
    $ = React.useState(),
    ee = module23.default($, 2),
    te = ee[0],
    ae = ee[1],
    ne = React.useState(false),
    oe = module23.default(ne, 2),
    re = oe[0],
    se = oe[1],
    le = React.useState(false),
    ue = module23.default(le, 2),
    ce = ue[0],
    ie = ue[1],
    Se = React.useState(F),
    pe = module23.default(Se, 2),
    de = pe[0],
    Re = pe[1],
    Me = React.useState(0),
    me = module23.default(Me, 2),
    fe = me[0],
    _e = me[1],
    ge = t.parent.mapView,
    Ce = t.parent.mapViewMatrix,
    ke = t.parent.sidebarMenu;

  React.useEffect(function () {}, []);
  React.useEffect(
    function () {
      if (ce)
        setTimeout(function () {
          return ie(false);
        });
      var t = module13.DeviceEventEmitter.addListener(module420.NotificationKeys.BottomControlMenuNeedRefresh, function (t) {
        ie(true);
        console.log('receive refresh', module381.RSM.mopModeId);
      });
      return function () {
        t.remove();
      };
    },
    [ce]
  );
  React.useEffect(
    function () {
      ke = t.parent.sidebarMenu;
      var n = module13.DeviceEventEmitter.addListener(module420.NotificationKeys.RobotStatusDidUpdate, function (n) {
        ge = t.parent.mapView;
        Y(module381.RSM.isHomeButtonsEnabled());
        be();
      });
      be();
      var o = module13.DeviceEventEmitter.addListener(module420.NotificationKeys.BottomControlDoAction, function (t) {
        var n = t.cmd,
          o = t.data;

        if ('changeTab' == n) {
          Re(o);
          Ae(o);
        }
      });
      return function () {
        n.remove();
        o.remove();
      };
    },
    [de, te]
  );

  var be = function () {
      var n,
        o = de,
        s = !module381.RSM.isBackDockWashingDusterMode() && module381.RSM.backDockResumeFlag == module381.BackDockResumeFlag.Has,
        l = module381.RSM.isBackDockWashingDusterMode() && module381.RSM.backDockResumeFlag == module381.BackDockResumeFlag.Has,
        u = module381.RSM.isPureCleaningMode() && module381.RSM.cleanResumeFlag != module381.CleanResumeFlag.None,
        c = module381.RSM.isPureMoppingMode() && module381.RSM.cleanResumeFlag != module381.CleanResumeFlag.None,
        p = (module381.RSM.isCleanMopCleaningMode() || module381.RSM.isCleanMopMoppingMode()) && module381.RSM.cleanResumeFlag != module381.CleanResumeFlag.None,
        R = s ? 'resume' : 'start',
        M = u ? 'resume' : 'start',
        f = c ? 'resume' : 'start',
        _ = p ? 'resume' : 'start',
        C = l ? 'resume' : 'start',
        k = module381.RSM.isDrying ? 'stop' : 'start',
        b = 'startCharge',
        h = module381.RSM.isWashReady && module381.RSM.isReadyToCmd(),
        w = (module381.RSM.isCollectWashDock() || module381.RSM.isCollectWashDryDock()) && (module381.RSM.isChargingOnDock() || module381.RSM.isReadyToCmd()),
        x = module381.RSM.isReadyToCollectDust() ? 'startCollect' : s ? 'resumeCharge' : 'startCharge';

      if (w) b = 'unfold';
      else if (l) b = 'startCharge';
      else if (s) b = 'startCharge';
      module381.RSM.state;

      if (module381.RSM.isReadyToCollectDust()) {
        R = 'startCollectDust';
        b = module381.RSM.isCollectDock() ? 'startCollectDust' : 'unfold';
      } else if (module381.RSM.state == module381.RobotState.COLLECTING_DUST) {
        R = 'stopCollectDust';
        b = 'stop';
      } else if (module381.RSM.state == module381.RobotState.CHARGING) {
        R = 'charging';
        b = module381.RSM.isWashDock() ? 'startWash' : 'charging';
      } else if (module381.RSM.state == module381.RobotState.FULL_CHARGE) {
        R = 'full';
        b = module381.RSM.isWashDock() ? 'startWash' : 'full';
      } else if (module381.RSM.isCleaning() || module381.RSM.state == module381.RobotState.QUICK_BUILDING_MAP) {
        M = 'pause';
        b = 'startCharge';
        C = 'halfwayWash';
      } else if (module381.RSM.isPureMopping()) {
        f = 'pause';
        R = 'start';
      } else if (module381.RSM.state == module381.RobotState.BACK_TO_DOCK) {
        R = 'pause';
        b = 'pauseCharge';
      } else if (module381.RSM.state == module381.RobotState.BACK_TO_DOCK_WASHING_DUSTER) {
        C = 'pause';
        b = 'pauseBackWash';

        if (module381.RSM.cleanResumeFlag != module381.CleanResumeFlag.None) {
          f = 'pause';
          M = 'pause';
        }
      } else if (module381.RSM.state == module381.RobotState.WASHING_DUSTER) {
        C = 'stop';
        b = 'stop';

        if (module381.RSM.cleanResumeFlag != module381.CleanResumeFlag.None) {
          f = 'pause';
          M = 'pause';
        }
      } else if (module381.RSM.isInCleanMopping()) _ = 'pause';

      if (h) b = 'unfold';
      if (
        K() &&
        module381.RSM.state != module381.RobotState.COLLECTING_DUST &&
        module381.RSM.state != module381.RobotState.WASHING_DUSTER &&
        module381.RSM.state != module381.RobotState.BACK_TO_DOCK &&
        module381.RSM.state != module381.RobotState.BACK_TO_DOCK_WASHING_DUSTER &&
        module381.RSM.cleanResumeFlag != module381.CleanResumeFlag.Quick_Build_Map
      )
        b = 'unfold';
      var D = module381.RSM.isEnterBackgroundWhenCleaning && module381.RSM.isFnishCleanChargingOnDock() && module381.RSM.cleanResumeFlag == module381.CleanResumeFlag.None;

      if (
        module381.RSM.isFinishCleanBackDock() ||
        ((module381.RSM.state == module381.RobotState.BACK_TO_DOCK_WASHING_DUSTER || module381.RSM.state == module381.RobotState.WASHING_DUSTER) &&
          module381.RSM.cleanResumeFlag == module381.CleanResumeFlag.None) ||
        D ||
        module381.RSM.cleanResumeFlag == module381.CleanResumeFlag.Quick_Build_Map ||
        module381.RSM.state == module381.RobotState.SPOT_CLEAN
      ) {
        o = F;
        module381.RSM.isEnterBackgroundWhenCleaning = false;
      } else if (
        module381.RSM.cleanResumeFlag == module381.CleanResumeFlag.Global_Clean ||
        ((module381.RSM.isChargingOnDock() || module381.RSM.isReadyToCmd()) && module381.RSM.cleanResumeFlag == module381.CleanResumeFlag.None)
      ) {
        if (!(de != F && module381.RSM.state != module381.RobotState.CLEAN)) o = O;
      } else if (module381.RSM.cleanResumeFlag == module381.CleanResumeFlag.Segment_Clean) o = W;
      else if (module381.RSM.cleanResumeFlag == module381.CleanResumeFlag.Zone_Clean) o = L;

      if (t.tabDidChange) t.tabDidChange(o);
      Ae(o);
      Re(o);
      We(o);
      var T = {
          cleanIconMode: M,
          chargeIconMode: R,
          mopIconMode: f,
          cleanMopIconMode: _,
          washIconMode: C,
          dockIconMode: b,
          collectIconMode: x,
          dryIconMode: k,
        },
        v = false;
      if (te)
        Object.keys(T).forEach(function (t) {
          if (te[t] != T[t]) v = true;
        });
      else v = true;
      if (v) ae(T);

      _e(module381.RSM.cleanProgress);

      if ('unfold' != b) null == Q || null == (n = Q.current) || n.hide();
    },
    he = function (n, o) {
      var module23, React, module13, module1627, module1628, module420, module1124, h, module1631, D, T, v, E, y;
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
                module13 = {
                  0: module381.RobotState.ZONED_CLEAN,
                  1: module381.RobotState.ZONED_MOPPING,
                  2: module381.RobotState.ZONED_CLEAN_MOP_CLEANING,
                };
                module1627 = {
                  0: module510.clean_task_change_tip_for_clean,
                  1: module510.clean_task_change_tip_for_mop,
                  2: module510.clean_task_change_tip_for_clean_then_mop,
                };

                module1628 = function () {
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

                module420 = function (t) {
                  if (0 == t) module381.RSM.mockPureCleaningMode();
                  if (1 == t) module381.RSM.mockPureMoppingMode();
                  if (2 == t) module381.RSM.mockCleanMopCleaningMode();
                };

                module1124 = function (t) {
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
                            return regeneratorRuntime.default.awrap(module416.default.start([o]));

                          case 4:
                            module387.LogEventCommon('start_clean', o);
                            module393.localPingWithCallback(function (t) {
                              module387.LogEventStatus('connection_with_robot', {
                                isDirectConnection: t,
                              });
                            });
                            module381.RSM.preMockState = module23[n];
                            module381.RSM.cleanResumeFlag = module381.CleanResumeFlag.Global_Clean;
                            module420(n);
                            de = F;
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

                h = function () {
                  var o, l, module1627, module1628, C, h, module1631;
                  return regeneratorRuntime.default.async(
                    function (D) {
                      for (;;)
                        switch ((D.prev = D.next)) {
                          case 0:
                            if (((D.prev = 0), de != O && de != F)) {
                              D.next = 12;
                              break;
                            }

                            if (!(module381.RSM.isSwitchMapModeManual && -1 != module381.RSM.currentMapId && module415.MM.maps.length > 1)) {
                              D.next = 8;
                              break;
                            }

                            o = {
                              text: module510.localization_strings_Main_MainPage_11,
                            };
                            l = {
                              text: module510.localization_strings_Main_Error_ErrorDetailPage_3,
                              onPress: function () {
                                return regeneratorRuntime.default.async(
                                  function (t) {
                                    for (;;)
                                      switch ((t.prev = t.next)) {
                                        case 0:
                                          t.next = 2;
                                          return regeneratorRuntime.default.awrap(module1124(module381.RSM.currentMapId));

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
                              module510.start_clean_with_manual_mode_alert_title.templateStringWithParams({
                                mapName: module415.MM.getCurrentMapName(),
                              }),
                              [o, l]
                            );
                            D.next = 10;
                            break;

                          case 8:
                            D.next = 10;
                            return regeneratorRuntime.default.awrap(module1124());

                          case 10:
                            D.next = 51;
                            break;

                          case 12:
                            if (de != W) {
                              D.next = 30;
                              break;
                            }

                            if ((console.log('Segment mop', t.cleanSegments), !(t.cleanSegments.length > 0))) {
                              D.next = 26;
                              break;
                            }

                            module1627 = [
                              {
                                clean_mop: n,
                                segments: t.cleanSegments,
                                repeat: (4 == module381.RSM.mopModeId ? 2 : ke.state.cleanCount) || 1,
                                clean_order_mode: ke.state.cleanOrder,
                              },
                            ];
                            module1628 = module381.RSM.isSupportOrderSegmentClean() ? module1627 : t.cleanSegments;
                            globals.dlog('clean_mop:' + n, JSON.stringify(module1628));
                            D.next = 20;
                            return regeneratorRuntime.default.awrap(module416.default.segmentClean(module1628));

                          case 20:
                            module387.LogEventCommon('start_segment_clean', module1628);
                            module381.RSM.preMockState = React[n];
                            module381.RSM.cleanResumeFlag = module381.CleanResumeFlag.Segment_Clean;
                            module420(n);
                            D.next = 28;
                            break;

                          case 26:
                            D.next = 28;
                            return regeneratorRuntime.default.awrap(module1124());

                          case 28:
                            D.next = 51;
                            break;

                          case 30:
                            if (de != L) {
                              D.next = 51;
                              break;
                            }

                            if (((C = ge ? ge.getZoneParams() : null), ge || !mapView3D)) {
                              D.next = 36;
                              break;
                            }

                            D.next = 35;
                            return regeneratorRuntime.default.awrap(mapView3D.getZoneParams());

                          case 35:
                            C = D.sent;

                          case 36:
                            if (!C || !C.length) {
                              D.next = 49;
                              break;
                            }

                            h = (4 == module381.RSM.mopModeId ? 2 : ke.state.cleanCount) || 1;
                            C.forEach(function (t) {
                              t.push(h);
                            });
                            module1631 = module424.DMM.isGarnet
                              ? {
                                  clean_mop: n,
                                  zones: C,
                                }
                              : C;
                            globals.dlog('clean_mop:' + n, JSON.stringify(module1631));
                            D.next = 43;
                            return regeneratorRuntime.default.awrap(module416.default.zoneClean(module1631));

                          case 43:
                            module387.LogEventCommon('start_zone_clean', module1631);
                            module381.RSM.preMockState = module13[n];
                            module381.RSM.cleanResumeFlag = module381.CleanResumeFlag.Zone_Clean;
                            module420(n);
                            D.next = 51;
                            break;

                          case 49:
                            D.next = 51;
                            return regeneratorRuntime.default.awrap(module1124());

                          case 51:
                            D.next = 56;
                            break;

                          case 53:
                            D.prev = 53;
                            D.t0 = D.catch(0);
                            console.log('handleCleanTask ' + n + '@startNewTask error: ' + ('object' == typeof D.t0 ? JSON.stringify(D.t0) : D.t0));

                          case 56:
                          case 'end':
                            return D.stop();
                        }
                    },
                    null,
                    null,
                    [[0, 53]],
                    Promise
                  );
                };

                module1631 = function () {
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
                            return regeneratorRuntime.default.awrap(module416.default.resumeSegmentClean());

                          case 4:
                            module381.RSM.preMockState = React[n];
                            module420(n);
                            t.next = 26;
                            break;

                          case 8:
                            if (!module381.RSM.isGlobalCleanTaskShouldResume()) {
                              t.next = 15;
                              break;
                            }

                            t.next = 11;
                            return regeneratorRuntime.default.awrap(
                              module416.default.start([
                                {
                                  clean_mop: n,
                                },
                              ])
                            );

                          case 11:
                            module381.RSM.preMockState = module23[n];
                            module420(n);
                            t.next = 26;
                            break;

                          case 15:
                            if (!module381.RSM.isZoneCleanTaskShouldResume()) {
                              t.next = 22;
                              break;
                            }

                            t.next = 18;
                            return regeneratorRuntime.default.awrap(module416.default.resumeZoneClean());

                          case 18:
                            module381.RSM.preMockState = module13[n];
                            module420(n);
                            t.next = 26;
                            break;

                          case 22:
                            if (!module381.RSM.isQuickBuildMapTaskShouldResume()) {
                              t.next = 26;
                              break;
                            }

                            t.next = 25;
                            return regeneratorRuntime.default.awrap(module416.default.resumeQuickBuildMap());

                          case 25:
                            module381.RSM.preMockState = module381.RobotState.QUICK_BUILDING_MAP;

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
                if (!module381.RSM.mapSaveEnabled || 0 != module415.MM.maps.length || module381.RSM.cleanResumeFlag != module381.CleanResumeFlag.None) {
                  I.next = 17;
                  break;
                }

                if (!(null == t)) t.handleNoMapFirstClean();
                o.endAnimation();
                return I.abrupt('return');

              case 17:
                if (
                  ((D = module390.default.isPureCleanMopSupported() && module381.RSM.fanPower == module1624.CleanModeZero),
                  (T = new Date().getTime()),
                  (v =
                    (T - module394.MC.lastShow72HourMopWarningTime) / 1e3 / 60 > 5 &&
                    module381.RSM.lastCleanTimeDistanceToNow > 72 &&
                    module381.RSM.cleanResumeFlag == module381.CleanResumeFlag.None),
                  !(D && v && module390.default.isMainBrushUpDownSupported()))
                ) {
                  I.next = 25;
                  break;
                }

                module394.MC.lastShow72HourMopWarningTime = T;
                globals.showToast(module510.toast_clean_then_mop_24hour);
                o.endAnimation();
                return I.abrupt('return');

              case 25:
                if (module381.RSM.isCleaning() || module381.RSM.isPureMopping() || module381.RSM.isInCleanMopping() || !(module381.RSM.battery < 20)) {
                  I.next = 29;
                  break;
                }

                globals.showToast(module510.localization_strings_Main_Constants_33);
                o.endAnimation();
                return I.abrupt('return');

              case 29:
                if (
                  (module381.RSM.state == module381.RobotState.MALFUNCTIONING && (module381.RSM.preMockState = module381.RobotState.PAUSE),
                  (E =
                    (module381.RSM.state == module381.RobotState.BACK_TO_DOCK_WASHING_DUSTER || module381.RSM.state == module381.RobotState.WASHING_DUSTER) &&
                    module381.RSM.cleanResumeFlag != module381.CleanResumeFlag.None),
                  !module381.RSM.isReadyToNewClean())
                ) {
                  I.next = 36;
                  break;
                }

                I.next = 34;
                return regeneratorRuntime.default.awrap(h());

              case 34:
                I.next = 56;
                break;

              case 36:
                if (!module1628() || !module381.RSM.isCleanTaskShouldResume() || E) {
                  I.next = 41;
                  break;
                }

                I.next = 39;
                return regeneratorRuntime.default.awrap(module1631());

              case 39:
                I.next = 56;
                break;

              case 41:
                if (
                  !module1628() ||
                  !(
                    module381.RSM.isCleaning() ||
                    module381.RSM.isPureMopping() ||
                    module381.RSM.isInCleanMopping() ||
                    E ||
                    module381.RSM.state == module381.RobotState.QUICK_BUILDING_MAP
                  )
                ) {
                  I.next = 48;
                  break;
                }

                I.next = 44;
                return regeneratorRuntime.default.awrap(module416.default.pause());

              case 44:
                module387.LogEventCommon('pause_clean');
                module381.RSM.preMockState = module381.RSM.state == module381.RobotState.SPOT_CLEAN ? module381.RobotState.WAITING : module381.RobotState.PAUSE;
                I.next = 56;
                break;

              case 48:
                if (!module381.RSM.isInBackDockTask() && module1628()) {
                  I.next = 56;
                  break;
                }

                if (!module381.RSM.isInBackDockTask()) {
                  I.next = 54;
                  break;
                }

                I.next = 52;
                return regeneratorRuntime.default.awrap(h());

              case 52:
                I.next = 56;
                break;

              case 54:
                y = module1627[n];
                Ee(y, h);

              case 56:
                o.endAnimation();
                module381.RSM.preMockMotionStatus();
                be();
                I.next = 65;
                break;

              case 61:
                I.prev = 61;
                I.t0 = I.catch(10);
                o.endAnimation();
                console.log('handleCleanTask ' + n + ' error : ' + typeof I.t0 == Object ? JSON.stringify(I.t0) : I.t0);

              case 65:
              case 'end':
                return I.stop();
            }
        },
        null,
        null,
        [[10, 61]],
        Promise
      );
    },
    we = function (t) {
      var n, o, l, u;
      return regeneratorRuntime.default.async(
        function (c) {
          for (;;)
            switch ((c.prev = c.next)) {
              case 0:
                console.log('onPressNewCollectButton');
                if (
                  !(
                    null ==
                    (u = K()
                      ? null == Q
                        ? undefined
                        : null == (n = Q.current)
                        ? undefined
                        : null == (o = n.contentView)
                        ? undefined
                        : null == (l = o.contentView)
                        ? undefined
                        : l.collectButton
                      : J.current.newCollectButton())
                  )
                )
                  u.startAnimation();
                c.prev = 3;
                c.next = 6;
                return regeneratorRuntime.default.awrap(Te(module381.RSM.isReadyToCollectDust()));

              case 6:
                if (!(null == u)) u.endAnimation();
                module381.RSM.preMockMotionStatus();
                be();
                t(true);
                c.next = 17;
                break;

              case 12:
                c.prev = 12;
                c.t0 = c.catch(3);
                u.endAnimation();
                t(false, c.t0);
                console.log('onPressNewCollectButton error', c.t0);

              case 17:
              case 'end':
                return c.stop();
            }
        },
        null,
        null,
        [[3, 12]],
        Promise
      );
    },
    xe = function (t) {
      var n, o, l, u;
      return regeneratorRuntime.default.async(
        function (c) {
          for (;;)
            switch ((c.prev = c.next)) {
              case 0:
                console.log('onPressNewWashButton');
                if (
                  !(
                    null ==
                    (u = K()
                      ? null == Q
                        ? undefined
                        : null == (n = Q.current)
                        ? undefined
                        : null == (o = n.contentView)
                        ? undefined
                        : null == (l = o.contentView)
                        ? undefined
                        : l.washButton
                      : J.current.newWashButton())
                  )
                )
                  u.startAnimation();
                c.prev = 3;
                c.next = 6;
                return regeneratorRuntime.default.awrap(ve());

              case 6:
                if (!(null == u)) u.endAnimation();
                module381.RSM.preMockMotionStatus();
                be();
                t(true);
                c.next = 17;
                break;

              case 12:
                c.prev = 12;
                c.t0 = c.catch(3);
                u.endAnimation();
                t(false, c.t0);
                console.log('onPressNewWashButton error', module428.ErrorImageMap);

              case 17:
              case 'end':
                return c.stop();
            }
        },
        null,
        null,
        [[3, 12]],
        Promise
      );
    },
    De = function (t) {
      var n, o, l, u;
      return regeneratorRuntime.default.async(
        function (c) {
          for (;;)
            switch ((c.prev = c.next)) {
              case 0:
                console.log('onPressNewDryButton');
                if (
                  !(
                    null ==
                    (u = K()
                      ? null == Q
                        ? undefined
                        : null == (n = Q.current)
                        ? undefined
                        : null == (o = n.contentView)
                        ? undefined
                        : null == (l = o.contentView)
                        ? undefined
                        : l.dryButton
                      : J.current.newDryButton())
                  )
                )
                  u.startAnimation();
                c.prev = 3;
                c.next = 6;
                return regeneratorRuntime.default.awrap(module416.default.setDryerStatus(module381.RSM.isDrying ? 0 : 1));

              case 6:
                if (!(null == u)) u.endAnimation();
                module381.RSM.isDrying = !module381.RSM.isDrying;
                module381.RSM.preMockMotionStatus();
                be();
                t(true);
                c.next = 18;
                break;

              case 13:
                c.prev = 13;
                c.t0 = c.catch(3);
                u.endAnimation();
                t(false, c.t0);
                console.log('onPressNewWashButton error', module428.ErrorImageMap);

              case 18:
              case 'end':
                return c.stop();
            }
        },
        null,
        null,
        [[3, 13]],
        Promise
      );
    },
    Te = function (t) {
      var n, o;
      return regeneratorRuntime.default.async(
        function (l) {
          for (;;)
            switch ((l.prev = l.next)) {
              case 0:
                if (
                  ((l.prev = 0),
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
                              return regeneratorRuntime.default.awrap(module416.default.startCollectDust());

                            case 4:
                              n.next = 8;
                              break;

                            case 6:
                              n.next = 8;
                              return regeneratorRuntime.default.awrap(module416.default.charge());

                            case 8:
                              module381.RSM.preMockState = t ? module381.RobotState.COLLECTING_DUST : module381.RobotState.BACK_TO_DOCK;
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
                  l.next = 6;
                  break;
                }

                if (K()) {
                  if (!(null == Q || null == (o = Q.current)))
                    o.hide(function () {
                      Ee(module510.robot_will_begin_collect_dust_tip, function () {
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
                    });
                } else
                  Ee(module510.robot_will_begin_collect_dust_tip, function () {
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
                l.next = 8;
                break;

              case 6:
                l.next = 8;
                return regeneratorRuntime.default.awrap(n());

              case 8:
                l.next = 13;
                break;

              case 10:
                l.prev = 10;
                l.t0 = l.catch(0);
                console.log('startChargeOrCollectTaskForNewControl', l.t0);

              case 13:
              case 'end':
                return l.stop();
            }
        },
        null,
        null,
        [[0, 10]],
        Promise
      );
    },
    ve = function () {
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

                globals.showToast(module510.start_clean_roller_without_waterbox_tip);
                return n.abrupt('return');

              case 4:
                if (module381.RSM.isWaterBoxCarriageIn) {
                  n.next = 7;
                  break;
                }

                globals.showToast(module510.start_clean_roller_without_waterbox_carriage_tip);
                return n.abrupt('return');

              case 7:
                if (module424.DMM.isTopazS && module381.RSM.cleanResumeFlag != module381.CleanResumeFlag.None)
                  null == (t = globals) ||
                    t.Alert.customAlert('', module510.back_dock_to_wash_alert_tip, null, null, {
                      confirmTitle: module510.localization_strings_Setting_RemoteControlPage_51,
                      shouldShowCancel: false,
                    });
                n.next = 11;
                return regeneratorRuntime.default.awrap(module416.default.startWash());

              case 11:
                module381.RSM.preMockState = module381.RSM.isWashReady ? module381.RobotState.WASHING_DUSTER : module381.RobotState.BACK_TO_DOCK_WASHING_DUSTER;
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
    Ne = function () {
      Q.current.show();
    },
    Pe = function (t, n) {
      var o, l, u, c, p, module1627, f;
      return regeneratorRuntime.default.async(
        function (_) {
          for (;;)
            switch ((_.prev = _.next)) {
              case 0:
                t.startAnimation();
                _.prev = 1;
                _.next = 4;
                return regeneratorRuntime.default.awrap(module381.RSM.getStatus());

              case 4:
                if (
                  (module381.RSM.state == module381.RobotState.MALFUNCTIONING && (module381.RSM.preMockState = module381.RobotState.PAUSE),
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
                                            return regeneratorRuntime.default.awrap(module416.default.startCollectDust());

                                          case 4:
                                            n.next = 8;
                                            break;

                                          case 6:
                                            n.next = 8;
                                            return regeneratorRuntime.default.awrap(module416.default.charge());

                                          case 8:
                                            module381.RSM.preMockState = t ? module381.RobotState.COLLECTING_DUST : module381.RobotState.BACK_TO_DOCK;
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

                              Ee(module510.robot_will_begin_collect_dust_tip, function () {
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

                              globals.showToast(module510.start_clean_roller_without_waterbox_tip);
                              return u.abrupt('return');

                            case 15:
                              if (module381.RSM.isWaterBoxCarriageIn) {
                                u.next = 18;
                                break;
                              }

                              globals.showToast(module510.start_clean_roller_without_waterbox_carriage_tip);
                              return u.abrupt('return');

                            case 18:
                              if (module424.DMM.isTopazS && module381.RSM.cleanResumeFlag != module381.CleanResumeFlag.None)
                                null == (l = globals) ||
                                  l.Alert.customAlert('', module510.back_dock_to_wash_alert_tip, null, null, {
                                    confirmTitle: module510.localization_strings_Setting_RemoteControlPage_51,
                                    shouldShowCancel: false,
                                  });
                              u.next = 22;
                              return regeneratorRuntime.default.awrap(module416.default.startWash());

                            case 22:
                              module381.RSM.preMockState = module381.RobotState.BACK_TO_DOCK_WASHING_DUSTER;
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
                  _.next = 23;
                  break;
                }

                if (
                  (t.endAnimation(),
                  (c = (module381.RSM.isPureMopping() || module381.RSM.isCleanMopMopping()) && !n),
                  (p = (module381.RSM.isPureMoppingMode() || module381.RSM.isCleanMopMoppingMode()) && !n && module381.RSM.cleanResumeFlag != module381.CleanResumeFlag.None),
                  !(c || p || (o && n) || (!module424.DMM.isGarnet && !n)))
                ) {
                  _.next = 17;
                  break;
                }

                _.next = 15;
                return regeneratorRuntime.default.awrap(u());

              case 15:
                _.next = 21;
                break;

              case 17:
                if (module381.RSM.isChargingOnDock()) {
                  _.next = 21;
                  break;
                }

                module1627 = n ? module510.home_dialog_begin_new_back_charge : module510.home_dialog_begin_new_back_washing_duster;
                if (module381.RSM.cleanResumeFlag == module381.CleanResumeFlag.Quick_Build_Map) Ee(module510.tap_charge_when_quick_building_map_tip, u);
                else Ee(module1627, u);
                return _.abrupt('return');

              case 21:
                _.next = 53;
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
                  _.next = 28;
                  break;
                }

                _.next = 26;
                return regeneratorRuntime.default.awrap(u());

              case 26:
                _.next = 53;
                break;

              case 28:
                if (!module381.RSM.isInBackDockTask() && module381.RSM.state != module381.RobotState.WASHING_DUSTER) {
                  _.next = 53;
                  break;
                }

                if (((f = module381.RSM.state == module381.RobotState.COLLECTING_DUST), !n)) {
                  _.next = 42;
                  break;
                }

                if (module381.RSM.state != module381.RobotState.COLLECTING_DUST) {
                  _.next = 37;
                  break;
                }

                module387.LogEventCommon('stop_collectDust');
                _.next = 35;
                return regeneratorRuntime.default.awrap(module416.default.stopCollectDust());

              case 35:
                _.next = 40;
                break;

              case 37:
                module387.LogEventCommon('pause_back_charge');
                _.next = 40;
                return regeneratorRuntime.default.awrap(module416.default.pause());

              case 40:
                _.next = 51;
                break;

              case 42:
                if (module381.RSM.state != module381.RobotState.WASHING_DUSTER) {
                  _.next = 48;
                  break;
                }

                module387.LogEventCommon('stop_clean_roller');
                _.next = 46;
                return regeneratorRuntime.default.awrap(module416.default.stopWash());

              case 46:
                _.next = 51;
                break;

              case 48:
                module387.LogEventCommon('pause_clean');
                _.next = 51;
                return regeneratorRuntime.default.awrap(module416.default.pause());

              case 51:
                module381.RSM.preMockState = f ? module381.RobotState.CHARGING : module381.RobotState.PAUSE;
                module381.RSM.backDockResumeFlag = module381.BackDockResumeFlag.Has;

              case 53:
                t.endAnimation();
                module381.RSM.preMockMotionStatus();
                be();
                _.next = 62;
                break;

              case 58:
                _.prev = 58;
                _.t0 = _.catch(1);
                t.endAnimation();
                console.log('handle back dock task toCharge:: ' + n + ' error : ' + typeof _.t0 == 'string' ? _.t0 : JSON.stringify(_.t0));

              case 62:
              case 'end':
                return _.stop();
            }
        },
        null,
        null,
        [[1, 58]],
        Promise
      );
    },
    Ee = function (t, n) {
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
                      module381.RSM.preMockMotionStatus();
                      be();
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
            confirmTitle: module510.localization_strings_Main_Error_ErrorDetailPage_3,
          }
        );
    },
    ye = function (n) {
      return regeneratorRuntime.default.async(
        function (o) {
          for (;;)
            switch ((o.prev = o.next)) {
              case 0:
                if (de != n) {
                  o.next = 2;
                  break;
                }

                return o.abrupt('return');

              case 2:
                if (module381.RSM.isShowStopTaskAlert())
                  globals.Alert.alert('', module510.home_dialog_begin_new_clean, [
                    {
                      text: module510.localization_strings_Main_MainPage_11,
                      onPress: function () {},
                    },
                    {
                      text: module510.localization_strings_Main_Error_ErrorDetailPage_3,
                      onPress: function () {
                        return regeneratorRuntime.default.async(
                          function (t) {
                            for (;;)
                              switch ((t.prev = t.next)) {
                                case 0:
                                  if (((t.prev = 0), !re)) {
                                    t.next = 4;
                                    break;
                                  }

                                  globals.showToast(module510.toast_frequently_operate);
                                  return t.abrupt('return');

                                case 4:
                                  se(true);
                                  t.next = 7;
                                  return regeneratorRuntime.default.awrap(module416.default.stop());

                                case 7:
                                  if (!t.sent) {
                                    t.next = 16;
                                    break;
                                  }

                                  module381.RSM.preMockState = module381.RobotState.WAITING;
                                  module381.RSM.cleanResumeFlag = module381.CleanResumeFlag.None;
                                  module381.RSM.backDockResumeFlag = module381.BackDockResumeFlag.None;
                                  module381.RSM.preMockMotionStatus();
                                  if (ge) ge.resetSelectBlocks();
                                  if (ge) ge.clearRectangles();
                                  be();
                                  Be(n);

                                case 16:
                                  se(false);
                                  t.next = 23;
                                  break;

                                case 19:
                                  t.prev = 19;
                                  t.t0 = t.catch(0);
                                  console.log('Switch tab error : ' + JSON.stringify(t.t0));
                                  se(false);

                                case 23:
                                case 'end':
                                  return t.stop();
                              }
                          },
                          null,
                          null,
                          [[0, 19]],
                          Promise
                        );
                      },
                    },
                  ]);
                else if (n == W && module390.default.isMapSegmentSupported() && !module381.RSM.mapSaveEnabled) {
                  if (t.switchSegmentTabDidFail) t.switchSegmentTabDidFail();
                } else {
                  Be(n);
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
    Ae = function (t) {
      var n, o;
      if (!(null == z || null == (n = z.current) || null == (o = n.contentView))) o.changeTab(t);
    },
    Be = function (t) {
      Ae(t);
      Re(t);
      if (t == W) Ie();
      if (t == O) Fe();
      if (t == L) Oe();
    },
    Ie = function () {
      We(W);
      var n = '';

      if (module381.RSM.mapStatus == module381.MapStatus.Has_WithSegments) {
        var o = 0;
        if (ge)
          ge.state.selectBlockList.forEach(function (t) {
            o += t;
          });
        n =
          o > 0
            ? '' +
              module510.main_page_top_tip_has_selected.templateStringWithParams({
                zones: o,
              })
            : module510.home_menu_select_zone_tip;
      }

      var s = module381.RSM.mapStatus == module381.MapStatus.None || module381.RSM.mapStatus == module381.MapStatus.Has_WithoutSegments;
      if (t.updateParent)
        t.updateParent({
          topTip: n,
          shouldShowNoMap: s,
        });
    },
    Fe = function () {
      We(O);
      if (t.updateParent)
        t.updateParent({
          topTip: '',
        });
    },
    Oe = function () {
      var n, o, l;
      return regeneratorRuntime.default.async(
        function (u) {
          for (;;)
            switch ((u.prev = u.next)) {
              case 0:
                if ((We(L), module381.RSM.mapStatus != module381.MapStatus.None)) {
                  u.next = 3;
                  break;
                }

                return u.abrupt('return');

              case 3:
                if ((ge && ge.enterZoneEditMode(), mapView3D && mapView3D.enterZoneEditMode(), (n = ge && !ge.hasRects()) && ge.addRectangle(), n)) {
                  u.next = 15;
                  break;
                }

                if (((o = ge && ge.getZoneParams()), ge || !mapView3D)) {
                  u.next = 13;
                  break;
                }

                u.next = 12;
                return regeneratorRuntime.default.awrap(mapView3D.getZoneParams());

              case 12:
                o = u.sent;

              case 13:
                l =
                  o && o.length > 0
                    ? '' +
                      module510.mainpage_top_tip_has_drawed.templateStringWithParams({
                        zones: o.length,
                      })
                    : module510.home_menu_draw_zone_tip;
                if (t.updateParent)
                  t.updateParent({
                    topTip: l,
                  });

              case 15:
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
    We = function n(o) {
      if (ke)
        ke.setState({
          tab: o,
        });
      t.parent.state.mapType;
      var s = module381.RSM.mapStatus == module381.MapStatus.None || (module381.RSM.mapStatus == module381.MapStatus.Has_WithoutSegments && o == W);
      if (!s && !module381.RSM.isLocating && module381.RSM.mapStatus != module381.MapStatus.None)
        if (((ge = t.parent.mapView), (mapView3D = t.parent.mapView3D), (Ce = t.parent.mapViewMatrix), ge || mapView3D || Ce)) {
          var l = null;

          if (o == W) {
            var u = 1 == ke.state.cleanOrder;

            if (module381.RSM.cleanResumeFlag == module381.CleanResumeFlag.Segment_Clean) {
              l = u
                ? module381.RSM.isCustomCleanWaterMode()
                  ? module1124.MapModelInCleanMode.Segment_Clean_Sequential_Read_Only_With_Clean_Type
                  : module1124.MapModelInCleanMode.Segment_Clean_Sequential_Read_Only
                : module381.RSM.isCustomCleanWaterMode()
                ? module1124.MapModelInCleanMode.Segment_Clean_Read_Only_With_Clean_Type
                : module1124.MapModelInCleanMode.Segment_Clean_Read_Only;
              if (ge) ge.changeMapViewMode(l);
              if (mapView3D) mapView3D.changeMapViewMode(l);
              if (t.updateParent)
                t.updateParent({
                  topTip: '',
                });
            } else {
              l = u
                ? module381.RSM.isCustomCleanWaterMode()
                  ? module1124.MapModelInCleanMode.Segment_Clean_Sequential_Edit_With_Clean_Type
                  : module1124.MapModelInCleanMode.Segment_Clean_Sequential_Edit
                : module381.RSM.isCustomCleanWaterMode()
                ? module1124.MapModelInCleanMode.Segment_Clean_Edit_With_Clean_Type
                : module1124.MapModelInCleanMode.Segment_Clean_Edit;
              if (ge) ge.changeMapViewMode(l);
              if (mapView3D) mapView3D.changeMapViewMode(l);
            }
          }

          if (!(o != O && o != F)) {
            if (t.updateParent)
              t.updateParent({
                topTip: '',
              });
            l = module381.RSM.isCustomCleanWaterMode() ? module1124.MapModelInCleanMode.Global_Clean_With_Clean_Type : module1124.MapModelInCleanMode.Global_Clean;
            if (ge) ge.changeMapViewMode(l);
            if (mapView3D) mapView3D.changeMapViewMode(l);
          }

          if (o == L)
            module381.RSM.cleanResumeFlag == module381.CleanResumeFlag.Zone_Clean
              ? (ge && ge.changeMapViewMode(module1124.MapModelInCleanMode.Zone_Clean_Read_Only),
                mapView3D && mapView3D.changeMapViewMode(module1124.MapModelInCleanMode.Zone_Clean_Read_Only),
                t.updateParent &&
                  t.updateParent({
                    topTip: '',
                  }))
              : (ge && ge.changeMapViewMode(module1124.MapModelInCleanMode.Zone_Clean_Edit),
                mapView3D && mapView3D.changeMapViewMode(module1124.MapModelInCleanMode.Zone_Clean_Edit));
        } else
          setTimeout(function () {
            n(o);
          }, 200);
    },
    Le = t.childrenAboveTab,
    Ge = t.childrenBelowTab,
    Ue =
      (module390.default.isDynamiclySkipCleanZoneSupported() || module390.default.isDynamiclyAddCleanZonesSupported()) &&
      (module381.RSM.cleanResumeFlag != module381.CleanResumeFlag.None || !!module411.shouldShowDynamicModifyingZones),
    He = {
      imageWidth: 22,
      imageHeight: 22,
      fontSize: 12,
      textLeft: 3,
      textColor: V.homeBottomControl.modifyAreaControlTextColor,
    },
    Ve = React.default.createElement(
      module13.View,
      {
        style: G.modifyCleanAreasControl,
      },
      module390.default.isDynamiclyAddCleanZonesSupported() &&
        React.default.createElement(module385.TopImageButton, {
          title: module510.goto_supplememt_cleanarea_title,
          image: V.homeBottomControl.gotoSupplementCleanIcon,
          imageWidth: 36,
          imageHeight: 36,
          fontSize: 10,
          textTop: 5,
          style: {
            alignSelf: 'flex-start',
          },
          onPress: function () {
            return regeneratorRuntime.default.async(
              function (t) {
                for (;;)
                  switch ((t.prev = t.next)) {
                    case 0:
                      t.prev = 0;
                      t.next = 3;
                      return regeneratorRuntime.default.awrap(module416.default.gotoCleanSupplementZones());

                    case 3:
                      t.next = 7;
                      break;

                    case 5:
                      t.prev = 5;
                      t.t0 = t.catch(0);

                    case 7:
                    case 'end':
                      return t.stop();
                  }
              },
              null,
              null,
              [[0, 5]],
              Promise
            );
          },
        }),
      React.default.createElement(
        module13.View,
        {
          style: G.modifyButtonsWrap,
        },
        module390.default.isDynamiclyAddCleanZonesSupported() &&
          React.default.createElement(
            module385.LeftImageButton,
            module22.default(
              {
                image: V.homeBottomControl.addSupplementAreaIcon,
                title: module510.add_supplement_area_buttontitle,
                onPress: function () {
                  var t;
                  return regeneratorRuntime.default.async(
                    function (n) {
                      for (;;)
                        switch ((n.prev = n.next)) {
                          case 0:
                            console.log('mapView addSupplementZone');
                            if (!(null == (t = ge))) t.addSupplementZone();

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
              },
              He,
              {
                style: G.modifyButton,
              }
            )
          ),
        module390.default.isDynamiclySkipCleanZoneSupported() &&
          React.default.createElement(
            module385.LeftImageButton,
            module22.default(
              {
                image: V.homeBottomControl.skipCurrentAreaIcon,
                title: module510.skip_current_cleanarea_buttontitle,
                onPress: function () {
                  return regeneratorRuntime.default.async(
                    function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            t.next = 2;
                            return regeneratorRuntime.default.awrap(
                              module416.default.skipCurrentCleaningArea({
                                source: 2,
                              })
                            );

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
              },
              He,
              {
                style: G.modifyButton,
              }
            )
          )
      )
    ),
    Ke = React.default.createElement(module1627.default, {
      ref: z,
      enabled: X,
      onPressTab: function (t) {
        return ye(t);
      },
    });

  return React.default.createElement(
    module13.View,
    {
      style: [
        G.wrap,
        {
          width: module13.Dimensions.get('window').width,
        },
      ],
      pointerEvents: 'box-none',
    },
    Le && Le(),
    module381.RSM.hasGotMapFirstTime && (Ue ? Ve : Ke),
    Ge && Ge(),
    React.default.createElement(
      module1631.default,
      {
        info: null == (n = t.infoWrapperData) ? undefined : n.info,
        icon: null == (h = t.infoWrapperData) ? undefined : h.icon,
        actionIcon: null == (U = t.infoWrapperData) ? undefined : U.actionIcon,
        action: null == (H = t.infoWrapperData) ? undefined : H.action,
      },
      React.default.createElement(
        Z,
        module22.default({}, te, {
          ref: J,
          enabled: X,
          cleanProgress: fe,
          onPressCleanButton: function () {
            var t;
            return regeneratorRuntime.default.async(
              function (n) {
                for (;;)
                  switch ((n.prev = n.next)) {
                    case 0:
                      t = J.current.cleanButton();
                      he(0, t);

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
                      t = J.current.mopButton();
                      n.next = 3;
                      return regeneratorRuntime.default.awrap(he(1, t));

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
                      t = J.current.cleanMopButton();
                      n.next = 3;
                      return regeneratorRuntime.default.awrap(he(2, t));

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
                      t = J.current.chargeButton();
                      n.next = 3;
                      return regeneratorRuntime.default.awrap(Pe(t, true));

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

                      globals.showToast(module510.localization_strings_Main_Constants_33);
                      return n.abrupt('return');

                    case 3:
                      t = J.current.washButton();
                      n.next = 6;
                      return regeneratorRuntime.default.awrap(Pe(t));

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
          onPressNewCollectButton: we,
          onPressNewWashButton: xe,
          onPressNewDockButton: function () {
            var n, o, l, u, c, p;
            return regeneratorRuntime.default.async(
              function (M) {
                for (;;)
                  switch ((M.prev = M.next)) {
                    case 0:
                      console.log('onPressNewDockButton start');
                      (n = J.current.dockButton()).startAnimation();
                      M.prev = 3;
                      M.next = 6;
                      return regeneratorRuntime.default.awrap(module381.RSM.getStatus());

                    case 6:
                      if (
                        (module381.RSM.state == module381.RobotState.MALFUNCTIONING && (module381.RSM.preMockState = module381.RobotState.PAUSE),
                        (o = module381.RSM.isCollectDock() && module381.RSM.isChargingOnDock()),
                        (l = module381.RSM.isWashDock() && module381.RSM.isChargingOnDock()),
                        (u = module381.RSM.isBackDockWashingDusterMode() && module381.RSM.backDockResumeFlag == module381.BackDockResumeFlag.Has),
                        (c = !module381.RSM.isBackDockWashingDusterMode() && module381.RSM.backDockResumeFlag == module381.BackDockResumeFlag.Has),
                        (p = function () {
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
                                                  return regeneratorRuntime.default.awrap(module416.default.startWashThenCharge());

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
                                                  return regeneratorRuntime.default.awrap(module416.default.charge());

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
                                                  return regeneratorRuntime.default.awrap(module416.default.startWash());

                                                case 15:
                                                  n = 'washThenCharge' == t || 'wash' == t;
                                                  module381.RSM.preMockState = n ? module381.RobotState.BACK_TO_DOCK_WASHING_DUSTER : module381.RobotState.BACK_TO_DOCK;
                                                  module381.RSM.backDockResumeFlag = n ? module381.BackDockResumeFlag.None : module381.BackDockResumeFlag.Has;
                                                  if ('wash' != t) module381.RSM.cleanResumeFlag = module381.CleanResumeFlag.None;
                                                  module381.RSM.preMockMotionStatus();
                                                  be();

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
                        M.next = 17;
                        break;
                      }

                      M.next = 15;
                      return regeneratorRuntime.default.awrap(ve());

                    case 15:
                      M.next = 60;
                      break;

                    case 17:
                      if (!o) {
                        M.next = 22;
                        break;
                      }

                      M.next = 20;
                      return regeneratorRuntime.default.awrap(Te(true));

                    case 20:
                      M.next = 60;
                      break;

                    case 22:
                      if (module381.RSM.state != module381.RobotState.COLLECTING_DUST) {
                        M.next = 29;
                        break;
                      }

                      module387.LogEventCommon('stop_collectDust');
                      M.next = 26;
                      return regeneratorRuntime.default.awrap(module416.default.stopCollectDust());

                    case 26:
                      module381.RSM.preMockState = module381.RobotState.CHARGING;
                      M.next = 60;
                      break;

                    case 29:
                      if (module381.RSM.state != module381.RobotState.WASHING_DUSTER) {
                        M.next = 36;
                        break;
                      }

                      module387.LogEventCommon('stop_clean_roller');
                      M.next = 33;
                      return regeneratorRuntime.default.awrap(module416.default.stopWash());

                    case 33:
                      if (module424.DMM.isPearl) module381.RSM.preMockState = 100 == module381.RSM.battery ? module381.RobotState.FULL_CHARGE : module381.RobotState.CHARGING;
                      else module381.RSM.preMockState = module381.RSM.cleanResumeFlag == module381.CleanResumeFlag.None ? module381.RobotState.WAITING : module381.RobotState.PAUSE;
                      M.next = 60;
                      break;

                    case 36:
                      if (
                        (module381.RSM.cleanResumeFlag == module381.CleanResumeFlag.None && !module381.RSM.isCleaning()) ||
                        module381.RSM.backDockResumeFlag != module381.BackDockResumeFlag.None
                      ) {
                        M.next = 44;
                        break;
                      }

                      if (module381.RSM.cleanResumeFlag != module381.CleanResumeFlag.Quick_Build_Map) {
                        M.next = 40;
                        break;
                      }

                      Ee(module510.tap_charge_when_quick_building_map_tip, function () {
                        return Te(false);
                      });
                      return M.abrupt('return');

                    case 40:
                      if (K()) Ne();
                      else if (module381.RSM.isChargingOnDock()) {
                        if (module381.RSM.isChargingOnDock())
                          globals.showToast(
                            module381.RSM.state == module381.RobotState.FULL_CHARGE
                              ? module510.localization_strings_Common_Constants_17
                              : module510.localization_strings_Common_Constants_8
                          );
                      } else p();
                      return M.abrupt('return');

                    case 44:
                      if (!module381.RSM.isReadyToCmd() && module381.RSM.state != module381.RobotState.PAUSE) {
                        M.next = 53;
                        break;
                      }

                      if (!u && !c) {
                        M.next = 49;
                        break;
                      }

                      if (K()) Ne();
                      else p();
                      M.next = 51;
                      break;

                    case 49:
                      M.next = 51;
                      return regeneratorRuntime.default.awrap(Te(false));

                    case 51:
                      M.next = 60;
                      break;

                    case 53:
                      if (module381.RSM.state != module381.RobotState.BACK_TO_DOCK && module381.RSM.state != module381.RobotState.BACK_TO_DOCK_WASHING_DUSTER) {
                        M.next = 59;
                        break;
                      }

                      M.next = 56;
                      return regeneratorRuntime.default.awrap(module416.default.pause());

                    case 56:
                      module381.RSM.preMockState = module381.RobotState.PAUSE;
                      M.next = 60;
                      break;

                    case 59:
                      if (module381.RSM.state == module381.RobotState.CHARGING) globals.showToast(module510.localization_strings_Common_Constants_8);
                      else if (module381.RSM.state == module381.RobotState.FULL_CHARGE) globals.showToast(module510.localization_strings_Common_Constants_17);

                    case 60:
                      n.endAnimation();
                      module381.RSM.preMockMotionStatus();
                      be();
                      M.next = 69;
                      break;

                    case 65:
                      M.prev = 65;
                      M.t0 = M.catch(3);
                      n.endAnimation();
                      console.log('handle back dock task toCharge:: ' + toCharge + ' error : ' + typeof M.t0 == 'string' ? M.t0 : JSON.stringify(M.t0));

                    case 69:
                    case 'end':
                      return M.stop();
                  }
              },
              null,
              null,
              [[3, 65]],
              Promise
            );
          },
          onPressNewDryButton: De,
          showDockPanel: Ne,
        })
      )
    ),
    K() &&
      React.default.createElement(
        module1633.default,
        module22.default({}, te, {
          ref: Q,
          enabled: X,
          onPressNewCollectButton: we,
          onPressNewWashButton: xe,
          onPressNewDryButton: De,
          onClose: function () {
            return Q.current.hide();
          },
          paddingBottom: 0,
          contentBackgroundColor: 'transparent',
          outterWrapStyle: {
            borderTopLeftRadius: 14,
            borderTopRightRadius: 14,
          },
        })
      )
  );
};

var module22 = require('./22'),
  regeneratorRuntime = require('regenerator-runtime'),
  module23 = require('@babel/runtime/helpers/slicedToArray'),
  React = require('react'),
  module13 = require('./13'),
  module381 = require('./381'),
  module415 = require('./415'),
  module416 = require('./416'),
  module1627 = require('./1627'),
  module1628 = require('./1628'),
  module420 = require('./420'),
  module390 = require('./390'),
  module1124 = require('./1124'),
  module424 = require('./424'),
  module1434 = require('./1434'),
  module1631 = require('./1631'),
  module387 = require('./387'),
  module428 = require('./428'),
  module1632 = require('./1632'),
  module1633 = require('./1633'),
  module394 = require('./394'),
  module1624 = require('./1624'),
  module1199 = require('./1199'),
  module385 = require('./385'),
  module510 = require('./510').strings,
  module393 = require('./393'),
  module411 = require('./411'),
  F = -1;

exports.TabNeutral = F;
var O = 0;
exports.TabGlobal = O;
var W = 1;
exports.TabSegment = W;
var L = 2;
exports.TabZone = L;
var G = module13.StyleSheet.create({
  wrap: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: module1434.BottomControlBottom,
    alignSelf: 'center',
    zIndex: 0,
    alignItems: 'stretch',
  },
  modifyCleanAreasControl: {
    marginLeft: 20,
    marginBottom: 10,
  },
  modifyButtonsWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  modifyButton: {
    height: 40,
    paddingHorizontal: 10,
  },
});
