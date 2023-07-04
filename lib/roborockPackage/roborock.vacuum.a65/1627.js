exports.default = function (t) {
  t.parent.mapView3D;

  var n,
    h,
    H,
    V,
    K = React.useContext(module1200.AppConfigContext).theme,
    Z = function () {
      return module390.default.isDssBelievable() && (module381.RSM.isO3Dock() || module381.RSM.isO3PlusDock() || module381.RSM.isO4Dock() || module381.RSM.isPearlDock());
    },
    z = Z() ? module1633.default : module1629.default,
    J = React.useRef(),
    Q = React.useRef(),
    j = React.useRef(),
    q = React.useState(module381.RSM.isHomeButtonsEnabled()),
    X = module23.default(q, 2),
    Y = X[0],
    $ = X[1],
    ee = React.useState(),
    te = module23.default(ee, 2),
    ae = te[0],
    ne = te[1],
    oe = React.useState(false),
    re = module23.default(oe, 2),
    se = re[0],
    le = re[1],
    ue = React.useState(false),
    ce = module23.default(ue, 2),
    ie = ce[0],
    pe = ce[1],
    Se = React.useState(F),
    de = module23.default(Se, 2),
    Re = de[0],
    Me = de[1],
    me = React.useState(0),
    fe = module23.default(me, 2),
    _e = fe[0],
    ge = fe[1],
    Ce = t.parent.mapView,
    ke = t.parent.mapViewMatrix,
    be = t.parent.sidebarMenu;

  React.useEffect(function () {}, []);
  React.useEffect(
    function () {
      if (ie)
        setTimeout(function () {
          return pe(false);
        });
      var t = module13.DeviceEventEmitter.addListener(module420.NotificationKeys.BottomControlMenuNeedRefresh, function (t) {
        pe(true);
        console.log('receive refresh', module381.RSM.mopModeId);
      });
      return function () {
        t.remove();
      };
    },
    [ie]
  );
  React.useEffect(
    function () {
      be = t.parent.sidebarMenu;
      var n = module13.DeviceEventEmitter.addListener(module420.NotificationKeys.RobotStatusDidUpdate, function (n) {
        Ce = t.parent.mapView;
        $(module381.RSM.isHomeButtonsEnabled());
        he();
      });
      he();
      var o = module13.DeviceEventEmitter.addListener(module420.NotificationKeys.BottomControlDoAction, function (t) {
        var n = t.cmd,
          o = t.data;

        if ('changeTab' == n) {
          Me(o);
          Be(o);
        }
      });
      return function () {
        n.remove();
        o.remove();
      };
    },
    [Re, ae]
  );

  var he = function () {
      var n,
        o = Re,
        s = !module381.RSM.isBackDockWashingDusterMode() && module381.RSM.backDockResumeFlag == module381.BackDockResumeFlag.Has,
        l = module381.RSM.isBackDockWashingDusterMode() && module381.RSM.backDockResumeFlag == module381.BackDockResumeFlag.Has,
        u = module381.RSM.isPureCleaningMode() && module381.RSM.cleanResumeFlag != module381.CleanResumeFlag.None,
        c = module381.RSM.isPureMoppingMode() && module381.RSM.cleanResumeFlag != module381.CleanResumeFlag.None,
        S = (module381.RSM.isCleanMopCleaningMode() || module381.RSM.isCleanMopMoppingMode()) && module381.RSM.cleanResumeFlag != module381.CleanResumeFlag.None,
        R = s ? 'resume' : 'start',
        M = u ? 'resume' : 'start',
        f = c ? 'resume' : 'start',
        _ = S ? 'resume' : 'start',
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
        Z() &&
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
        if (!(Re != F && module381.RSM.state != module381.RobotState.CLEAN)) o = O;
      } else if (module381.RSM.cleanResumeFlag == module381.CleanResumeFlag.Segment_Clean) o = W;
      else if (module381.RSM.cleanResumeFlag == module381.CleanResumeFlag.Zone_Clean) o = G;

      if (t.tabDidChange) t.tabDidChange(o);
      Be(o);
      Me(o);
      Ge(o);
      var v = {
          cleanIconMode: M,
          chargeIconMode: R,
          mopIconMode: f,
          cleanMopIconMode: _,
          washIconMode: C,
          dockIconMode: b,
          collectIconMode: x,
          dryIconMode: k,
        },
        T = false;
      if (ae)
        Object.keys(v).forEach(function (t) {
          if (ae[t] != v[t]) T = true;
        });
      else T = true;
      if (T) ne(v);
      ge(module381.RSM.cleanProgress);
      if ('unfold' != b) null == j || null == (n = j.current) || n.hide();
    },
    we = function (n, o) {
      var module23, React, module13, module1628, module1629, module420, module1125, h, module1632, D, v, T, y, E;
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
                module1628 = {
                  0: module510.clean_task_change_tip_for_clean,
                  1: module510.clean_task_change_tip_for_mop,
                  2: module510.clean_task_change_tip_for_clean_then_mop,
                };

                module1629 = function () {
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

                module1125 = function (t) {
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
                            Re = F;
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
                  var o, l, module1628, module1629, C, h, module1632;
                  return regeneratorRuntime.default.async(
                    function (D) {
                      for (;;)
                        switch ((D.prev = D.next)) {
                          case 0:
                            if (((D.prev = 0), Re != O && Re != F)) {
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
                                          return regeneratorRuntime.default.awrap(module1125(module381.RSM.currentMapId));

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
                            return regeneratorRuntime.default.awrap(module1125());

                          case 10:
                            D.next = 51;
                            break;

                          case 12:
                            if (Re != W) {
                              D.next = 30;
                              break;
                            }

                            if ((console.log('Segment mop', t.cleanSegments), !(t.cleanSegments.length > 0))) {
                              D.next = 26;
                              break;
                            }

                            module1628 = [
                              {
                                clean_mop: n,
                                segments: t.cleanSegments,
                                repeat: (4 == module381.RSM.mopModeId ? 2 : be.state.cleanCount) || 1,
                                clean_order_mode: be.state.cleanOrder,
                              },
                            ];
                            module1629 = module381.RSM.isSupportOrderSegmentClean() ? module1628 : t.cleanSegments;
                            globals.dlog('clean_mop:' + n, JSON.stringify(module1629));
                            D.next = 20;
                            return regeneratorRuntime.default.awrap(module416.default.segmentClean(module1629));

                          case 20:
                            module387.LogEventCommon('start_segment_clean', module1629);
                            module381.RSM.preMockState = React[n];
                            module381.RSM.cleanResumeFlag = module381.CleanResumeFlag.Segment_Clean;
                            module420(n);
                            D.next = 28;
                            break;

                          case 26:
                            D.next = 28;
                            return regeneratorRuntime.default.awrap(module1125());

                          case 28:
                            D.next = 51;
                            break;

                          case 30:
                            if (Re != G) {
                              D.next = 51;
                              break;
                            }

                            if (((C = Ce ? Ce.getZoneParams() : null), Ce || !mapView3D)) {
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

                            h = (4 == module381.RSM.mopModeId ? 2 : be.state.cleanCount) || 1;
                            C.forEach(function (t) {
                              t.push(h);
                            });
                            module1632 = module424.DMM.isGarnet
                              ? {
                                  clean_mop: n,
                                  zones: C,
                                }
                              : C;
                            globals.dlog('clean_mop:' + n, JSON.stringify(module1632));
                            D.next = 43;
                            return regeneratorRuntime.default.awrap(module416.default.zoneClean(module1632));

                          case 43:
                            module387.LogEventCommon('start_zone_clean', module1632);
                            module381.RSM.preMockState = module13[n];
                            module381.RSM.cleanResumeFlag = module381.CleanResumeFlag.Zone_Clean;
                            module420(n);
                            D.next = 51;
                            break;

                          case 49:
                            D.next = 51;
                            return regeneratorRuntime.default.awrap(module1125());

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

                module1632 = function () {
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
                if (!module381.RSM.mapSaveEnabled || -1 != module381.RSM.currentMapId || module381.RSM.cleanResumeFlag != module381.CleanResumeFlag.None) {
                  I.next = 17;
                  break;
                }

                if (!(null == t)) t.handleNoMapFirstClean();
                o.endAnimation();
                return I.abrupt('return');

              case 17:
                if (
                  ((D = module390.default.isPureCleanMopSupported() && module381.RSM.fanPower == module1625.CleanModeZero),
                  (v = new Date().getTime()),
                  (T =
                    (v - module394.MC.lastShow72HourMopWarningTime) / 1e3 / 60 > 5 &&
                    module381.RSM.lastCleanTimeDistanceToNow > 72 &&
                    module381.RSM.cleanResumeFlag == module381.CleanResumeFlag.None),
                  !(D && T && module390.default.isMainBrushUpDownSupported()))
                ) {
                  I.next = 25;
                  break;
                }

                module394.MC.lastShow72HourMopWarningTime = v;
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
                  (y =
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
                if (!module1629() || !module381.RSM.isCleanTaskShouldResume() || y) {
                  I.next = 41;
                  break;
                }

                I.next = 39;
                return regeneratorRuntime.default.awrap(module1632());

              case 39:
                I.next = 56;
                break;

              case 41:
                if (
                  !module1629() ||
                  !(
                    module381.RSM.isCleaning() ||
                    module381.RSM.isPureMopping() ||
                    module381.RSM.isInCleanMopping() ||
                    y ||
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
                if (!module381.RSM.isInBackDockTask() && module1629()) {
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
                E = module1628[n];
                Ee(E, h);

              case 56:
                o.endAnimation();
                module381.RSM.preMockMotionStatus();
                he();
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
    xe = function (t) {
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
                    (u = Z()
                      ? null == j
                        ? undefined
                        : null == (n = j.current)
                        ? undefined
                        : null == (o = n.contentView)
                        ? undefined
                        : null == (l = o.contentView)
                        ? undefined
                        : l.collectButton
                      : Q.current.newCollectButton())
                  )
                )
                  u.startAnimation();
                c.prev = 3;
                c.next = 6;
                return regeneratorRuntime.default.awrap(Te(module381.RSM.isReadyToCollectDust()));

              case 6:
                if (!(null == u)) u.endAnimation();
                module381.RSM.preMockMotionStatus();
                he();
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
    De = function (t) {
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
                    (u = Z()
                      ? null == j
                        ? undefined
                        : null == (n = j.current)
                        ? undefined
                        : null == (o = n.contentView)
                        ? undefined
                        : null == (l = o.contentView)
                        ? undefined
                        : l.washButton
                      : Q.current.newWashButton())
                  )
                )
                  u.startAnimation();
                c.prev = 3;
                c.next = 6;
                return regeneratorRuntime.default.awrap(Ne());

              case 6:
                if (!(null == u)) u.endAnimation();
                module381.RSM.preMockMotionStatus();
                he();
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
    ve = function (t) {
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
                    (u = Z()
                      ? null == j
                        ? undefined
                        : null == (n = j.current)
                        ? undefined
                        : null == (o = n.contentView)
                        ? undefined
                        : null == (l = o.contentView)
                        ? undefined
                        : l.dryButton
                      : Q.current.newDryButton())
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
                he();
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

                if (Z()) {
                  if (!(null == j || null == (o = j.current)))
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
    Ne = function () {
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
    Pe = function () {
      j.current.show();
    },
    ye = function (t, n) {
      var o, l, u, c, S, module1628, f;
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
                  (S = (module381.RSM.isPureMoppingMode() || module381.RSM.isCleanMopMoppingMode()) && !n && module381.RSM.cleanResumeFlag != module381.CleanResumeFlag.None),
                  !(c || S || (o && n) || (!module424.DMM.isGarnet && !n)))
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

                module1628 = n ? module510.home_dialog_begin_new_back_charge : module510.home_dialog_begin_new_back_washing_duster;
                if (module381.RSM.cleanResumeFlag == module381.CleanResumeFlag.Quick_Build_Map) Ee(module510.tap_charge_when_quick_building_map_tip, u);
                else Ee(module1628, u);
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
                he();
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
                      he();
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
    Ae = function (n) {
      return regeneratorRuntime.default.async(
        function (o) {
          for (;;)
            switch ((o.prev = o.next)) {
              case 0:
                if (Re != n) {
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
                                  if (((t.prev = 0), !se)) {
                                    t.next = 4;
                                    break;
                                  }

                                  globals.showToast(module510.toast_frequently_operate);
                                  return t.abrupt('return');

                                case 4:
                                  le(true);
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
                                  if (Ce) Ce.resetSelectBlocks();
                                  if (Ce) Ce.clearRectangles();
                                  he();
                                  Ie(n);

                                case 16:
                                  le(false);
                                  t.next = 23;
                                  break;

                                case 19:
                                  t.prev = 19;
                                  t.t0 = t.catch(0);
                                  console.log('Switch tab error : ' + JSON.stringify(t.t0));
                                  le(false);

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
                  Ie(n);
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
    Be = function (t) {
      var n, o;
      if (!(null == J || null == (n = J.current) || null == (o = n.contentView))) o.changeTab(t);
    },
    Ie = function (t) {
      Be(t);
      Me(t);
      if (t == W) Fe();
      if (t == O) Oe();
      if (t == G) We();
    },
    Fe = function () {
      Ge(W);
      var n = '';

      if (module381.RSM.mapStatus == module381.MapStatus.Has_WithSegments) {
        var o = 0;
        if (Ce)
          Ce.state.selectBlockList.forEach(function (t) {
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
    Oe = function () {
      Ge(O);
      if (t.updateParent)
        t.updateParent({
          topTip: '',
        });
    },
    We = function () {
      var n, o, l;
      return regeneratorRuntime.default.async(
        function (u) {
          for (;;)
            switch ((u.prev = u.next)) {
              case 0:
                if ((Ge(G), module381.RSM.mapStatus != module381.MapStatus.None)) {
                  u.next = 3;
                  break;
                }

                return u.abrupt('return');

              case 3:
                if ((Ce && Ce.enterZoneEditMode(), mapView3D && mapView3D.enterZoneEditMode(), (n = Ce && !Ce.hasRects()) && Ce.addRectangle(), n)) {
                  u.next = 15;
                  break;
                }

                if (((o = Ce && Ce.getZoneParams()), Ce || !mapView3D)) {
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
    Ge = function n(o) {
      if (be)
        be.setState({
          tab: o,
        });
      t.parent.state.mapType;
      var s = module381.RSM.mapStatus == module381.MapStatus.None || (module381.RSM.mapStatus == module381.MapStatus.Has_WithoutSegments && o == W);
      if (!s && !module381.RSM.isLocating && module381.RSM.mapStatus != module381.MapStatus.None)
        if (((Ce = t.parent.mapView), (mapView3D = t.parent.mapView3D), (ke = t.parent.mapViewMatrix), Ce || mapView3D || ke)) {
          var l = null;

          if (o == W) {
            var u = 1 == be.state.cleanOrder;

            if (module381.RSM.cleanResumeFlag == module381.CleanResumeFlag.Segment_Clean) {
              l = u
                ? module381.RSM.isCustomCleanWaterMode()
                  ? module1125.MapModelInCleanMode.Segment_Clean_Sequential_Read_Only_With_Clean_Type
                  : module1125.MapModelInCleanMode.Segment_Clean_Sequential_Read_Only
                : module381.RSM.isCustomCleanWaterMode()
                ? module1125.MapModelInCleanMode.Segment_Clean_Read_Only_With_Clean_Type
                : module1125.MapModelInCleanMode.Segment_Clean_Read_Only;
              if (Ce) Ce.changeMapViewMode(l);
              if (mapView3D) mapView3D.changeMapViewMode(l);
              if (t.updateParent)
                t.updateParent({
                  topTip: '',
                });
            } else {
              l = u
                ? module381.RSM.isCustomCleanWaterMode()
                  ? module1125.MapModelInCleanMode.Segment_Clean_Sequential_Edit_With_Clean_Type
                  : module1125.MapModelInCleanMode.Segment_Clean_Sequential_Edit
                : module381.RSM.isCustomCleanWaterMode()
                ? module1125.MapModelInCleanMode.Segment_Clean_Edit_With_Clean_Type
                : module1125.MapModelInCleanMode.Segment_Clean_Edit;
              if (Ce) Ce.changeMapViewMode(l);
              if (mapView3D) mapView3D.changeMapViewMode(l);
            }
          }

          if (!(o != O && o != F)) {
            if (t.updateParent)
              t.updateParent({
                topTip: '',
              });
            l = module381.RSM.isCustomCleanWaterMode() ? module1125.MapModelInCleanMode.Global_Clean_With_Clean_Type : module1125.MapModelInCleanMode.Global_Clean;
            if (Ce) Ce.changeMapViewMode(l);
            if (mapView3D) mapView3D.changeMapViewMode(l);
          }

          if (o == G)
            module381.RSM.cleanResumeFlag == module381.CleanResumeFlag.Zone_Clean
              ? (Ce && Ce.changeMapViewMode(module1125.MapModelInCleanMode.Zone_Clean_Read_Only),
                mapView3D && mapView3D.changeMapViewMode(module1125.MapModelInCleanMode.Zone_Clean_Read_Only),
                t.updateParent &&
                  t.updateParent({
                    topTip: '',
                  }))
              : (Ce && Ce.changeMapViewMode(module1125.MapModelInCleanMode.Zone_Clean_Edit),
                mapView3D && mapView3D.changeMapViewMode(module1125.MapModelInCleanMode.Zone_Clean_Edit));
        } else
          setTimeout(function () {
            n(o);
          }, 200);
    },
    Le = t.childrenAboveTab,
    Ue = t.childrenBelowTab,
    He = t.shouldShowGotoSupplementZoneButton,
    Ve =
      (module390.default.isDynamiclySkipCleanZoneSupported() || module390.default.isDynamiclyAddCleanZonesSupported()) &&
      (module381.RSM.cleanResumeFlag != module381.CleanResumeFlag.None || !!module411.shouldShowDynamicModifyingZones),
    Ke = {
      imageWidth: 22,
      imageHeight: 22,
      fontSize: 12,
      textLeft: 3,
      textColor: K.homeBottomControl.modifyAreaControlTextColor,
    },
    Ze = React.default.createElement(
      module13.View,
      {
        style: U.modifyCleanAreasControl,
      },
      module390.default.isDynamiclyAddCleanZonesSupported() &&
        He &&
        React.default.createElement(module385.TopImageButton, {
          title: module510.goto_supplememt_cleanarea_title,
          image: K.homeBottomControl.gotoSupplementCleanIcon,
          imageWidth: 36,
          imageHeight: 36,
          fontSize: 10,
          textTop: 5,
          style: {
            alignSelf: 'flex-start',
          },
          onPress: function () {
            var t, n, o;
            return regeneratorRuntime.default.async(
              function (l) {
                for (;;)
                  switch ((l.prev = l.next)) {
                    case 0:
                      l.prev = 0;
                      n = null == (t = Ce) ? undefined : t.getSupplementZones();
                      l.next = 4;
                      return regeneratorRuntime.default.awrap(
                        module416.default.gotoCleanSupplementZones({
                          zones: n,
                          source: 2,
                        })
                      );

                    case 4:
                      o = l.sent;
                      console.log('gotoSupplementAreasClean', n, o);
                      l.next = 11;
                      break;

                    case 8:
                      l.prev = 8;
                      l.t0 = l.catch(0);
                      console.log('gotoSupplementAreasClean error', l.t0);

                    case 11:
                    case 'end':
                      return l.stop();
                  }
              },
              null,
              null,
              [[0, 8]],
              Promise
            );
          },
        }),
      React.default.createElement(
        module13.View,
        {
          style: U.modifyButtonsWrap,
        },
        module390.default.isDynamiclyAddCleanZonesSupported() &&
          React.default.createElement(
            module385.LeftImageButton,
            module22.default(
              {
                image: K.homeBottomControl.addSupplementAreaIcon,
                title: module510.add_supplement_area_buttontitle,
                onPress: function () {
                  var t, n;
                  return regeneratorRuntime.default.async(
                    function (o) {
                      for (;;)
                        switch ((o.prev = o.next)) {
                          case 0:
                            console.log('mapView addSupplementZone');
                            if ((null == (t = Ce) ? undefined : t.getSupplementZones().length) <= L) null == (n = Ce) || n.addSupplementZone();

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
                },
              },
              Ke,
              {
                style: U.modifyButton,
              }
            )
          ),
        module390.default.isDynamiclySkipCleanZoneSupported() &&
          React.default.createElement(
            module385.LeftImageButton,
            module22.default(
              {
                image: K.homeBottomControl.skipCurrentAreaIcon,
                title: module510.skip_current_cleanarea_buttontitle,
                onPress: function () {
                  return regeneratorRuntime.default.async(
                    function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            Ee(module510.skip_current_area_alert_tip, function () {
                              return regeneratorRuntime.default.async(
                                function (t) {
                                  for (;;)
                                    switch ((t.prev = t.next)) {
                                      case 0:
                                        t.prev = 0;
                                        t.next = 3;
                                        return regeneratorRuntime.default.awrap(
                                          module416.default.skipCurrentCleaningArea({
                                            source: 2,
                                          })
                                        );

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
                            });

                          case 1:
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
              Ke,
              {
                enabled: module381.RSM.isCleaning() && !He,
                style: U.modifyButton,
              }
            )
          )
      )
    ),
    ze = React.default.createElement(module1628.default, {
      ref: J,
      enabled: Y,
      onPressTab: function (t) {
        return Ae(t);
      },
    });

  return React.default.createElement(
    module13.View,
    {
      style: [
        U.wrap,
        {
          width: module13.Dimensions.get('window').width,
        },
      ],
      pointerEvents: 'box-none',
    },
    Le && Le(),
    module381.RSM.hasGotMapFirstTime && (Ve ? Ze : ze),
    Ue && Ue(),
    React.default.createElement(
      module1632.default,
      {
        info: null == (n = t.infoWrapperData) ? undefined : n.info,
        icon: null == (h = t.infoWrapperData) ? undefined : h.icon,
        actionIcon: null == (H = t.infoWrapperData) ? undefined : H.actionIcon,
        action: null == (V = t.infoWrapperData) ? undefined : V.action,
      },
      React.default.createElement(
        z,
        module22.default({}, ae, {
          ref: Q,
          enabled: Y,
          cleanProgress: _e,
          onPressCleanButton: function () {
            var t;
            return regeneratorRuntime.default.async(
              function (n) {
                for (;;)
                  switch ((n.prev = n.next)) {
                    case 0:
                      t = Q.current.cleanButton();
                      we(0, t);

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
                      t = Q.current.mopButton();
                      n.next = 3;
                      return regeneratorRuntime.default.awrap(we(1, t));

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
                      t = Q.current.cleanMopButton();
                      n.next = 3;
                      return regeneratorRuntime.default.awrap(we(2, t));

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
                      t = Q.current.chargeButton();
                      n.next = 3;
                      return regeneratorRuntime.default.awrap(ye(t, true));

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
                      t = Q.current.washButton();
                      n.next = 6;
                      return regeneratorRuntime.default.awrap(ye(t));

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
          onPressNewCollectButton: xe,
          onPressNewWashButton: De,
          onPressNewDockButton: function () {
            var n, o, l, u, c, S;
            return regeneratorRuntime.default.async(
              function (M) {
                for (;;)
                  switch ((M.prev = M.next)) {
                    case 0:
                      console.log('onPressNewDockButton start');
                      (n = Q.current.dockButton()).startAnimation();
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
                        (S = function () {
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
                                                  he();

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
                      return regeneratorRuntime.default.awrap(Ne());

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
                      if (Z()) Pe();
                      else if (module381.RSM.isChargingOnDock()) {
                        if (module381.RSM.isChargingOnDock())
                          globals.showToast(
                            module381.RSM.state == module381.RobotState.FULL_CHARGE
                              ? module510.localization_strings_Common_Constants_17
                              : module510.localization_strings_Common_Constants_8
                          );
                      } else S();
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

                      if (Z()) Pe();
                      else S();
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
                      he();
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
          onPressNewDryButton: ve,
          showDockPanel: Pe,
        })
      )
    ),
    Z() &&
      React.default.createElement(
        module1634.default,
        module22.default({}, ae, {
          ref: j,
          enabled: Y,
          onPressNewCollectButton: xe,
          onPressNewWashButton: De,
          onPressNewDryButton: ve,
          onClose: function () {
            return j.current.hide();
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
  module1628 = require('./1628'),
  module1629 = require('./1629'),
  module420 = require('./420'),
  module390 = require('./390'),
  module1125 = require('./1125'),
  module424 = require('./424'),
  module1435 = require('./1435'),
  module1632 = require('./1632'),
  module387 = require('./387'),
  module428 = require('./428'),
  module1633 = require('./1633'),
  module1634 = require('./1634'),
  module394 = require('./394'),
  module1625 = require('./1625'),
  module1200 = require('./1200'),
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
var G = 2;
exports.TabZone = G;
var L = 5;
var U = module13.StyleSheet.create({
  wrap: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: module1435.BottomControlBottom,
    alignSelf: 'center',
    zIndex: 0,
    alignItems: 'stretch',
  },
  modifyCleanAreasControl: {
    marginLeft: 20,
    marginRight: 70,
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
