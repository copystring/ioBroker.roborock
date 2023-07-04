var module23 = require('@babel/runtime/helpers/slicedToArray'),
  module50 = require('./50'),
  module22 = require('./22'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1126 = require('./1126'),
  module1197 = require('./1197'),
  module1198 = require('./1198'),
  module1201 = require('./1201'),
  module1482 = require('./1482'),
  module391 = require('./391'),
  module420 = require('./420'),
  module415 = require('./415'),
  module390 = require('./390'),
  module394 = require('./394'),
  module381 = require('./381');

function R(t, n) {
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

function F(t) {
  for (var n = 1; n < arguments.length; n++) {
    var o = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      R(Object(o), true).forEach(function (n) {
        module50.default(t, n, o[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(o));
    else
      R(Object(o)).forEach(function (n) {
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

var PropTypes = require('prop-types'),
  D = module13.ART.Transform,
  module510 = require('./510').strings,
  module1416 = require('./1416').isRRSurface,
  module393 = require('./393'),
  module1339 = require('./1339'),
  module1343 = require('./1343'),
  module1417 = require('./1417').Palette,
  G = {
    Global_Clean: 'Global_Clean',
    Segment_Clean_Edit: 'Segment_Clean_Edit',
    Zone_Clean_Edit: 'Zone_Clean_Edit',
    Segment_Clean_Read_Only: 'Segment_Clean_Read_Only',
    Zone_Clean_Read_Only: 'Zone_Clean_Read_Only',
    Global_Clean_With_Clean_Type: 'Global_Clean_With_Clean_Type',
    Segment_Clean_Edit_With_Clean_Type: 'Segment_Clean_Edit_With_Clean_Type',
    Segment_Clean_Read_Only_With_Clean_Type: 'Segment_Clean_Read_Only_With_Clean_Type',
    Segment_Clean_Sequential_Edit_With_Clean_Type: 'Segment_Clean_Sequential_Edit_With_Clean_Type',
    Segment_Clean_Sequential_Read_Only_With_Clean_Type: 'Segment_Clean_Sequential_Read_Only_With_Clean_Type',
    Segment_Clean_Sequential_Edit: 'Segment_Clean_Sequential_Edit',
    Segment_Clean_Sequential_Read_Only: 'Segment_Clean_Sequential_Read_Only',
    Clean_Type_Edit: 'Clean_Type_Edit',
    Segment_Edit: 'Segment_Edit',
    Wall_FBZ_Edit: 'Wall_FBZ_Edit',
    Goto_Edit: 'Goto_Edit',
    Reset_Map: 'Reset_Map',
    Carpet_Edit_Ignore: 'Carpet_Edit_Ignore',
  };

exports.MapModelInCleanMode = G;

var Y = false,
  W = 'android' != module13.Platform.OS || module393.systemMemorySize > 5e3,
  q = module13.Dimensions.get('window'),
  j = q.height,
  V = q.width,
  U = true,
  X = false,
  H = (function (t) {
    module9.default(q, t);

    var module50 = q,
      R = O(),
      x = function () {
        var t,
          n = module12.default(module50);

        if (R) {
          var o = module12.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module11.default(this, t);
      };

    function q(t) {
      var n;
      module6.default(this, q);

      (n = x.call(this, t))._handleCleanRectChanged = function (t, o) {
        if (o == module1126.CleanRectType.Normal) {
          if (!(null == n.props.selectedRectDidChange)) n.props.selectedRectDidChange(t);
        } else if (o == module1126.CleanRectType.Extra) null == n.props.onSupplementZonesChanged || n.props.onSupplementZonesChanged(t);
      };

      n.top = n.props.hasOwnProperty('top') ? n.props.top : module1343.StatusBarHeight + module1343.AppBarHeight;
      n.bottom = n.props.hasOwnProperty('bottom') ? n.props.bottom : 0;
      n.left = n.props.hasOwnProperty('left') ? n.props.left : 0;
      n.right = n.props.hasOwnProperty('right') ? n.props.right : 0;
      n.size = n.props.hasOwnProperty('initSize') ? n.props.initSize : {};
      n.last = {};
      n.touch = {
        start: {},
        end: {},
        move: {},
        interval: -1,
        lastMovedTimestamp: null,
      };
      n.longPressStart = false;
      n.longPressCanceled = false;
      n.targetDroped = false;
      n.transform = new D();
      n.scaleMin = n.props.scaleMin || 1;
      n.scaleMax = n.props.scaleMax || 5;
      n.lastMapMode = G.Global_Clean;
      n.onLayouted = false;
      n.layoutDelayBlocks = [];
      n.mapInitialScaled = false;
      n.touchBlockPtMap = new Map([[-1, null]]);
      n.state = {
        charger: t.charger,
        map: t.map || {
          left: module1126.Config.center.x - module1126.EMPTY_MAP_SIZE / 2,
          top: module1126.Config.center.y - module1126.EMPTY_MAP_SIZE / 2,
          width: module1126.EMPTY_MAP_SIZE,
          height: module1126.EMPTY_MAP_SIZE,
        },
        path: t.path,
        robotStatus: 'Unknown',
        manual: false,
        mapMode: t.mapMode || module1343.MAP_MODE_REGULAR,
        showGotoTips: true,
        labEnabled: false,
        inBlockMode: t.inBlockMode || false,
        inCleanBlockMode: 0,
        selectBlockList: n.getSelectBlockFromSeqArray(t.blockSequenceInfo || []),
        showPath: true,
        roomNameList: [],
        defaultNameList: [],
        hideAccessory: t.hideAccessory || false,
        blockBubbleShowInfo: n.initBlockBubbleFlag(t) || module1126.BlockBubbleShowInfo.NONE,
        roomModeList: [],
        blockSequenceListReadOnly: [],
        editSequenceList: t.blockSequenceInfo || [],
        blockSequenceInfo: t.blockSequenceInfo || [],
        shouldHandleClick: t.showAllComponetBubble || false,
        mapDeg: n.initMapDeg(t) || 0,
        mapPanStatus: module1126.PanStatus.MAP_VIEWING_NONE,
        eidtFloor: {},
      };
      return n;
    }

    module7.default(q, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          var t = this;
          this.roomNameListener = this.specialEventListener = module13.DeviceEventEmitter.addListener(module420.NotificationKeys.DidReceiveSpecialEvent, function (n) {
            if (n.data == module420.EventKeys.RoomNameMappingDidReceive && t.props.editAction != module1198.EditAction.Name) t.getRoomNameListInMap();
          });
          this.panResponder = module13.PanResponder.create({
            onStartShouldSetPanResponder: function () {
              return 0 != U;
            },
            onMoveShouldSetPanResponder: function () {
              return false;
            },
            onPanResponderStart: function (n, o) {
              if (!(null == t.props.onPanResponderStart)) t.props.onPanResponderStart();
              t.setState({
                mapPanStatus: module1126.PanStatus.MAP_VIEWING_FIT,
              });
              t.touch.move = module1339._parseEvent(n.nativeEvent) || {};
              t.touch.page =
                {
                  x: n.nativeEvent.pageX,
                  y: n.nativeEvent.pageY,
                } || {};
              t.touch.interval =
                (1 == n.nativeEvent.touches.length && t.touch.move.timestamp && t.touch.start.timestamp && (t.touch.move.timestamp - t.touch.start.timestamp || 1)) || -1;
              t.touch.start = t.touch.move;

              t._handleLongPressStart(t.touch.start);
            },
            onPanResponderEnd: function (n, o) {
              if (
                (null == t.props.onPanResponderEnd || t.props.onPanResponderEnd(),
                t.setState({
                  mapPanStatus: module1126.PanStatus.MAP_VIEWING_NONE,
                }),
                1 != Y &&
                  (t.longPressStart ? t._handleLongPressEnd() : t._handleLongPressCancel(),
                  (t.touch.end = module1339._parseEvent(n.nativeEvent)),
                  t.touch.start.timestamp && t.touch.end && t.touch.end.timestamp))
              )
                if (!(t.touch.end.timestamp - t.touch.start.timestamp + t.touch.interval > module1126.Config.click) && t.touch.interval > 0) {
                  if (t.touch.interval > 0 && t.state.mapMode != module1343.MAP_MODE_MAP_EDIT && t.state.mapMode != module1343.MAP_MODE_CARPET_EDIT) {
                    var l =
                      (t.map &&
                        t.map.state.width &&
                        t.map.state.height && {
                          width: t.map.state.width,
                          height: t.map.state.height,
                        }) ||
                      {};
                    if (t.map)
                      t.map.setState({
                        transform: module1339._center(t.transform, t.size, l, t.left, t.top, t.right, t.bottom, t.state.mapDeg),
                      });
                  }
                } else if (
                  !t.touch.lastMovedTimestamp ||
                  (t.touch.end.timestamp - t.touch.start.timestamp < 200 && new Date().getTime() - t.touch.lastMovedTimestamp > 200) ||
                  (Math.abs(t.touch.start.x - t.touch.move.x) < 5 && Math.abs(t.touch.start.y - t.touch.move.y) < 5)
                )
                  if ((t._hideComponentsBubble(), t.isCanBlockEdit())) {
                    if (!t.map || !t.state.map) return;
                    if (undefined === t.state.map.data || undefined === t.state.map.data.data) return;
                    U = false;

                    var s = {
                        x: module13.I18nManager.isRTL ? t.size.width - t.touch.move.x : t.touch.move.x,
                        y: t.touch.move.y,
                      },
                      u = t._translateXY(s),
                      h = module1339._convertToMapPoint(u, t.transform);

                    if (!h) return;

                    var p = module1339._mapScreenToOriginXY(t.state.map, h.x, h.y),
                      c = t.getTouchPointBlockID(p);

                    if (c <= 0) {
                      if (0 == c) {
                        if (!(null == t.props.didTapWhenNoBlock)) t.props.didTapWhenNoBlock();
                        if (!t.props.didTapWhenNoBlock) globals.showToast(module510.mainpage_unknown_segment_click_tips);
                      }

                      return void (U = true);
                    }

                    t.changeBlockState(c, p);
                  } else {
                    var f;
                    if (!(null == (f = t.map))) f.clearRectFocus();
                    t.clearAllFBZEditFocus();
                    t.clearAllFurnitureFocus();
                    t.clearAllDoorSillFocus();
                    if (module13.I18nManager.isRTL) {
                      if (t.size && t.size.width)
                        t._singleClick({
                          x: t.size.width - t.touch.start.x,
                          y: t.touch.start.y,
                        });
                    } else t._singleClick(t.touch.start);
                  }
            },
            onPanResponderMove: function (n, o) {
              var l;
              if ((t._handleLongPressCancel(), 1 != Y))
                if (
                  (t.map && t.map.clearRectFocus(),
                  null == t.clearAllFBZEditFocus || t.clearAllFBZEditFocus(),
                  t.props.shouldShowRobotMovingAnimation && t.clearAllMarkFocus(),
                  (t.state.manual = true),
                  !t.map || (t.map.state.width && t.map.state.height))
                ) {
                  var s = [module1339._parseEvent(n.nativeEvent), t.touch.move],
                    u = s[0],
                    h = s[1];

                  if (
                    u &&
                    undefined !== n.nativeEvent.pageX &&
                    undefined !== n.nativeEvent.pageY &&
                    undefined !== t.touch &&
                    undefined !== t.touch.page &&
                    undefined !== t.touch.page.x &&
                    undefined !== t.touch.page.y
                  ) {
                    var p = Math.abs(u.x - h.x - (n.nativeEvent.pageX - t.touch.page.x)),
                      c = Math.abs(u.y - h.y - (n.nativeEvent.pageY - t.touch.page.y));
                    if (
                      (undefined !== n.nativeEvent.pageX &&
                        undefined !== n.nativeEvent.pageY &&
                        ((t.touch.page = {
                          x: n.nativeEvent.pageX,
                          y: n.nativeEvent.pageY,
                        }),
                        (t.touch.move = u || {})),
                      (!isNaN(p) && p >= 10) || (!isNaN(c) && c >= 10))
                    )
                      return;
                  }

                  if (
                    u &&
                    !(
                      Math.abs(u.x - t.touch.start.x) < 3 ||
                      ((u.x != h.x || u.y != h.y || u.distance) && (t.touch.lastMovedTimestamp = new Date().getTime()), t.longPressStart && u.x - h.x < 10 && u.y - h.y < 10)
                    )
                  ) {
                    var f = new D(t.transform);
                    if (u.hasOwnProperty('distance')) f.scale(u.distance / h.distance || 1);
                    else f.move(module13.I18nManager.isRTL ? h.x - u.x : u.x - h.x, u.y - h.y);
                    var v =
                      (t.map &&
                        t.map.state.width &&
                        t.map.state.height && {
                          width: t.map.state.width,
                          height: t.map.state.height,
                        }) ||
                      null;

                    if (module1339._checkTrans(f, t.size, v, t.left, t.top, t.right, t.bottom, t.props.noScale, t.state.mapDeg)) {
                      if (1 == W && u.hasOwnProperty('distance') && t.canPageModeFeature(u, h)) {
                        var b = {
                            x: (h.x1 + h.x2) / 2,
                            y: (h.y1 + h.y2) / 2,
                          },
                          S = t._translateXY(b, true),
                          M = u.distance / h.distance || 1,
                          k = {
                            x: S.x * M,
                            y: S.y * M,
                          },
                          C = t._translateXYFromMap(k, f),
                          E = (u.x1 + u.x2) / 2,
                          B = (u.y1 + u.y2) / 2,
                          P = E - C.x,
                          w = B - C.y;

                        f.move(module13.I18nManager.isRTL ? -P : P, w);
                      }

                      var A = u.hasOwnProperty('distance') ? module1126.PanStatus.MAP_VIEWING_SCALED : module1126.PanStatus.MAP_VIEWING_MOVED;
                      t.setState({
                        mapPanStatus: A,
                      });
                      if (!(null == (l = t.map)))
                        l.setState({
                          transform: (t.transform = f),
                        });
                    }
                  }
                } else
                  t.map &&
                    t.map.setState({
                      transform: new D(),
                    });
            },
            onPanResponderTerminationRequest: function (t, n) {
              return true;
            },
            onPanResponderTerminate: function (n, o) {
              if (t.longPressStart) t._handleLongPressEnd();
              else t._handleLongPressCancel();
            },
            onPanResponderGrant: function () {
              if (t.props.onPanResponderGrant) t.props.onPanResponderGrant();
            },
            onPanResponderRelease: function () {
              if (t.props.onPanResponderRelease) t.props.onPanResponderRelease();
            },
          });
        },
      },
      {
        key: 'shouldComponentUpdate',
        value: function (t, n) {
          return !Y && this.state.mapPanStatus != module1126.PanStatus.MAP_VIEWING_SCALED;
        },
      },
      {
        key: 'UNSAFE_componentWillUpdate',
        value: function (t, n) {
          var o,
            l,
            u,
            h,
            p,
            c,
            f,
            v,
            b,
            M,
            k,
            C,
            E,
            B,
            w,
            R = this.transform;
          if (n.mapMode == module1343.MAP_MODE_ZONED_CLEAN_EDIT && 3 == n.inCleanBlockMode) null == (w = this.map) || w.updateRotateRects();
          var O = (null == (o = n.blocks) ? undefined : null == (l = o.blocks) ? undefined : l.length) > 0 ? n.blocks.blocks : [];

          if (n.map !== this.state.map || n.path !== this.state.path) {
            var x = n.map;

            if (x) {
              var D = x.width &&
                x.height && {
                  width: x.width,
                  height: x.height,
                };
              if (!n.manual) module1339._center(R, this.size, D, this.left, this.top, this.right, this.bottom, n.mapDeg);

              var I = this._mapOffsetToSlam(x),
                N = module1339._offset(module1126.Config.center.x, module1126.Config.center.y, I),
                z = (null == (u = n.robot) ? undefined : u.angle) || 0,
                G = false,
                Y = (null == (h = n.path) ? undefined : null == (p = h.points) ? undefined : p.length) || 0;

              if (Y > 2) {
                var W = n.path.points;
                N = module1339._offset(W[Y - 1].x, W[Y - 1].y, I);
                if (module381.RSM.cleanResumeFlag != module381.CleanResumeFlag.None && module390.default.isSupportIncrementalMap()) G = true;
              }

              if (n.robot && !G) N = module1339._offset(n.robot.x, n.robot.y, I);
              var q =
                  (n.charger &&
                    n.charger.x &&
                    n.charger.y &&
                    undefined !== n.charger.angle &&
                    module22.default(module1339._offset(n.charger.x, n.charger.y, I), {
                      angle: n.charger.angle,
                    })) ||
                  null,
                j = {
                  displayZones: [],
                };
              if (n.mapMode == module1343.MAP_MODE_REGULAR && n.zones && (j = module1339._parseDisplayRects(n.zones, I)).displayZones.length > 0 && 4 == n.inCleanBlockMode)
                this.clearRectangles();
              var V = (module390.default.isMopPathSupported() || module390.default.isGotoPureCleanPathSupported()) && n.mopPath && undefined !== n.mopPath.data,
                U =
                  'android' != module13.Platform.OS || module1416
                    ? {
                        xx: 1,
                        yy: 1,
                      }
                    : R,
                H = module390.default.isGotoPureCleanPathSupported(),
                K = module390.default.isShowPureMopPath(),
                Q = {
                  path: '',
                };

              if (n.path) {
                var J = V ? n.mopPath.data : null;
                Q = module1339._parsePath(n.path.points, I, J, U, H, K);
              }

              var $ = V
                  ? module1339._parseMopPath(n.path.points, I, n.mopPath.data, U)
                  : {
                      mopPath: '',
                    },
                ee = {
                  pathType: (null == (c = n.pathType) ? undefined : c.data) || module1126.MoppingType.MOPPING_TYPE_BOTH_BOTH,
                },
                te = {
                  pathGotoPlan: '',
                };

              if (this.state.mapMode == module1343.MAP_MODE_GOTO_EDIT && n.pathGotoPlan) {
                var ae = module1339._parseGotoPlanPath(n.pathGotoPlan.points, I, U);

                te.pathGotoPlan = ae.path;
              }

              var ne = [];
              if (n.path)
                for (var oe = 0; oe < (null == (ie = n.path.points) ? undefined : ie.length); oe++) {
                  var ie,
                    le = module1339._offset(n.path.points[oe].x, n.path.points[oe].y, I);

                  ne.push(F({}, le));
                }
              var se = {
                target: {},
              };
              if (this.state.mapMode == module1343.MAP_MODE_GOTO_EDIT && n.target) se = module1339._parseTarget(n.target, I);
              var re = [];
              if (n.enemies && (null == (f = n.enemies.data) ? undefined : f.length) > 0)
                for (var ue = 0; ue < n.enemies.data.length; ue++) {
                  var he = n.enemies.data[ue],
                    pe = module1339._offset(he[0], he[1], I);

                  re.push(
                    F(
                      F({}, pe),
                      {},
                      {
                        flag: he[2],
                      }
                    )
                  );
                }
              if (null == (v = t.initStuckPt) ? undefined : v.nearby) this._filterStuckNearbyFbz(n.fbzs, t.initStuckPt.nearby[0]);
              var ce = this.parseFBZS(n.fbzs, n.map),
                de = this.parseWalls(n.walls, I),
                me = this.parseFBZS(n.mfbzs, n.map),
                fe = this.parseFBZS(n.clfbzs, n.map),
                ve = this.parseDoorSills(n.dsfbz, n.map, module1126.DoorSillType.RealSill),
                ge = this.parseDoorSills(n.smartds, n.map, module1126.DoorSillType.SmartSill, ve.length);
              ve = ve.concat(ge);

              var ye = this.parseStuckPoints(n.stuckpts, I, n.fbzs),
                _e = module390.default.isSupportCliffZone() ? this.parseFBZS(n.clffbz, n.map, true, true) : null,
                be = this._isMapModeCarpetIgnore() ? this.parseFBZS(n.cfbzs, n.map) : null,
                Se = this.parseFBZS(n.customCarpet, n.map),
                Me = this.parseFurnitures(n.furnitures, n.map),
                ke = this.getMapCurrentFloor(n.floorMap, n.eidtFloor, n.map),
                Ce = (null == (b = n.ignoredObstacles) ? undefined : b.obstacles) || [],
                Ee = this.parseObstacles(n.obstacles, Ce, x, I, n.charger);

              this.parseExtraCleanZones(n.extZones, n.map);
              var Be = undefined,
                Pe = undefined,
                we = -1;

              if (
                !(
                  undefined === n.carpetMap ||
                  '' == n.carpetMap.image ||
                  (!module390.default.isShowCarpetEditEntrance() && !module390.default.isCarpetShowOnMap()) ||
                  (module390.default.isRubberBrushCarpetSupported() && !this.props.showBrushCarpet)
                )
              ) {
                Pe = n.carpetMap.capData;
                Be = n.carpetMap.image;
                we = n.carpetMap.firstIndex;
              }

              var Ae = (null == (M = n.dockType) ? undefined : M.data) ? n.dockType.data : -1;
              if (this.map)
                this.map.setState(
                  F(
                    F(
                      F(
                        F(
                          F(
                            F(
                              F(
                                F(
                                  {
                                    status: n.robotStatus,
                                    transform: R,
                                    map: x.image,
                                    robot: N,
                                    robotAngle: z,
                                    charger: q,
                                    blockInClean: O,
                                    mapNoBlock: x.imageNoBlock,
                                    mapBCBackground: x.imageBlockCleanBackground,
                                    roomColorData: x.colorData,
                                    centerInfo: x.centerInfo,
                                    obstacles: Ee,
                                    cfbZones: be,
                                    cusCarpetZones: Se,
                                    initFBZone: t.initFBZone,
                                    initStuckPt: t.initStuckPt,
                                    fbzWalls: de,
                                    fbzZones: ce,
                                    mopZones: me,
                                    cleanZones: fe,
                                    furnitures: Me,
                                    doorSills: ve,
                                    stuckPoints: ye,
                                    cliffZones: _e,
                                    ignoredObstacles: Ce,
                                    floorMap: ke,
                                    carpetMap: Be,
                                    carpetData: Pe,
                                    carpetFirstIndex: we,
                                    dockType: Ae,
                                    enemies: re,
                                  },
                                  D
                                ),
                                Q
                              ),
                              j
                            ),
                            te
                          ),
                          se
                        ),
                        $
                      ),
                      ee
                    ),
                    {},
                    {
                      pathPoints: ne,
                      pathData: {
                        points: null == n ? undefined : null == (k = n.path) ? undefined : k.points,
                        planPoints: this.state.mapMode == module1343.MAP_MODE_GOTO_EDIT && (null == n ? undefined : null == (C = n.pathGotoPlan) ? undefined : C.points),
                        mopData: null == n ? undefined : null == (E = n.mopPath) ? undefined : E.data,
                        pathType: null == n ? undefined : null == (B = n.pathType) ? undefined : B.data,
                        offset: I,
                      },
                    }
                  ),
                  function () {
                    X = true;
                  }
                );
            }
          } else {
            if (!this.map) return;
            var Re,
              Fe,
              Oe =
                (this.map.state.width &&
                  this.map.state.height && {
                    width: this.map.state.width,
                    height: this.map.state.height,
                  }) ||
                {};

            if (
              (!n.manual && module1339._center(R, this.size, Oe, this.left, this.top, this.right, this.bottom, n.mapDeg),
              (n.robotStatus === this.map.state.status && n.manual === this.state.manual) ||
                this.map.setState({
                  status: n.robotStatus,
                  transform: R,
                }),
              t.editAction == module1198.EditAction.Floor)
            ) {
              var xe = this.getMapCurrentFloor(n.floorMap, n.eidtFloor, n.map);
              this.map.setState({
                floorMap: xe,
              });
            }

            if (module390.default.isSupportIncrementalMap())
              null == (Re = this.map) ||
                Re.setState({
                  blockInClean: O,
                });
            if (this.state.inCleanBlockMode != n.inCleanBlockMode) null == (Fe = this.map) || Fe.setRectsMode(n.inCleanBlockMode);
          }
        },
      },
      {
        key: 'componentDidMount',
        value: function () {
          this.getRoomNameListInMap();
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          if (this.roomNameListener) this.roomNameListener.remove();
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = undefined == this.props.showOnlyGeneralObstacles ? module394.MC.onlyShowGeneralObstacle : this.props.showOnlyGeneralObstacles,
            o = this.isCanBlockEdit(),
            l =
              this.state.inBlockMode && this.state.blockBubbleShowInfo & module1126.BlockBubbleShowInfo.CLEANSEQUENCE ? this.state.editSequenceList : this.state.blockSequenceInfo;
          return React.default.createElement(
            module13.View,
            {
              style: [K.container, this.props.style],
            },
            React.default.createElement(
              module13.View,
              module22.default({}, module391.default.getAccessibilityLabel('map_root'), this.panResponder.panHandlers, {
                pointerEvents: this.props.pointerEvents || 'auto',
                onLayout: function (n) {
                  t.size = n.nativeEvent.layout;

                  if (t.state.map && t.state.map.height && t.state.map.width) {
                    module1339._center(t.transform, t.size, t.state.map, t.left, t.top, t.right, t.bottom, t.state.mapDeg);

                    t._handleLayoutEnd();

                    if (X) {
                      if (t.map && t.map.target)
                        t.map.target.setState({
                          visible: false,
                        });
                      if (!t.manual && t.state.map && t.state.map.width && t.state.map.height && t.state.map.image && t.state.path && t.state.path.points && t.map)
                        t.map.setState({
                          transform: t.transform,
                        });
                    }
                  }
                },
                style: K.mapContainer,
              }),
              React.default.createElement(module1201.default, {
                transform: this.transform,
                ref: function (n) {
                  return (t.map = n);
                },
                color: module1417.map,
                mapDeg: this.state.mapDeg,
                parent: this,
                mapMode: this.state.mapMode,
                subCarpetMode: this.props.subCarpetMode,
                mapPanStatus: this.state.mapPanStatus,
                hideAccessory: this.state.hideAccessory,
                imageOnloadCallback: this.props.imageOnloadCallback,
                isCollectDustDock: this.props.isCollectDustDock,
                showDockBubbles: this.props.showDockBubbles,
                mapCarpetFocusCallback: this.props.mapCarpetFocusCallback,
                mapCarpetSaveEdit: this.props.mapCarpetSaveEdit,
                showMapObjectDebugInfo: this.props.showMapObjectDebugInfo,
                showOnlyGeneralObstacles: n,
                obstaclePopBoxType: this.props.obstaclePopBoxType,
                alwaysShowFBZ: this.props.alwaysShowFBZ,
                ignoreCarpetEdited: this.props.ignoreCarpetEdited,
                zonesHasEdited: this.props.zonesHasEdited,
                cusCarpetEdited: this.props.cusCarpetEdited,
                blockCanEdit: o,
                blockSequenceList: l,
                roomBubbleMode: this.state.blockBubbleShowInfo,
                showSplitLine: this.showSplitLine,
                eidtCountChange: this.props.eidtCountChange,
                showFurnitureIcon: this.props.showFurnitureIcon,
                showFurnitureOnly: this.props.showFurnitureOnly,
                showAllComponetBubble: this.props.showAllComponetBubble,
                mapElementShowFlag: this.props.mapElementShowFlag,
                onRectPanStart: this.props.onPanResponderStart,
                onRectPanEnd: this.props.onPanResponderEnd,
                initCliffZone: this.props.initCliffZone,
                initDoorSill: this.props.initDoorSill,
                showExtraRect: this.showExtraRect,
                cleanRectChanged: this._handleCleanRectChanged,
              })
            )
          );
        },
      },
      {
        key: 'initMapDeg',
        value: function (t) {
          if (t.syncMapDeg) {
            var n = undefined !== t.mapID ? t.mapID : module381.RSM.currentMapId,
              o = module415.MM.mapRotateAngle[n];
            return o || 0;
          }

          return 0;
        },
      },
      {
        key: 'initBlockBubbleFlag',
        value: function (t) {
          return t.blockBubbleShowInfo
            ? t.blockBubbleShowInfo
            : t.showAllBlocksBubble
            ? module1126.BlockBubbleShowInfo.DISPLAYNAME | module1126.BlockBubbleShowInfo.CLEANMODE | module1126.BlockBubbleShowInfo.CLEANSEQUENCE
            : module1126.BlockBubbleShowInfo.NONE;
        },
      },
      {
        key: 'getTouchPointBlockID',
        value: function (t) {
          var n = this.state.map.data,
            l = module1339._mapOriginXYToIndex(this.state.map, t.x, t.y);

          if (l < 0 || 0 == (7 & n.data[l])) return -1;
          var s = n.data[l] >>> 3;
          if (s > 0) return s;
          if (undefined === n.blockNum || n.blockNum <= 1) return -1;

          for (var u = module1339._getAroundIndexInfo(this.state.map, t.x, t.y), h = [], p = [], c = 0; c < u.length; c++) {
            var f = module23.default(u[c], 2),
              v = f[0],
              y = f[1];
            if (0 != y && 0 != v) h.push(v);
            if (0 == y) p.push(v);
          }

          if (h.length + p.length < u.length) return 0;

          for (var _ = 1; _ < h.length; _++) if (h[_] != h[_ - 1]) return 0;

          return h[0];
        },
      },
      {
        key: 'canPageModeFeature',
        value: function (t, n) {
          if ('android' != module13.Platform.OS) return true;
          if (t.y2 < 0 || n.y2 < 0) return false;
          var o = Math.abs(t.y1 - n.y1 - (t.pageY1 - n.pageY1)),
            l = Math.abs(t.y2 - n.y2 - (t.pageY2 - n.pageY2));
          return !((!isNaN(o) && o >= 10) || (!isNaN(l) && l >= 10));
        },
      },
      {
        key: 'boundToTargetTrans',
        value: function (t, n, o) {
          var l = this;
          Y = true;
          var s = n.x - t.x,
            u = n.y - t.y,
            h = n.xx - t.xx,
            p = 10;
          if (o) p = 1;

          for (
            var c = function (n) {
                setTimeout(function () {
                  var o = new D(t);
                  o.move((s / p) * (n + 1), (u / p) * (n + 1));
                  o.scaleTo(t.xx + (h / p) * (n + 1) || 1);
                  if (l.map)
                    l.map.setState({
                      transform: o,
                    });
                  l.transform = o;
                  if (n >= p - 1) Y = false;
                }, 10 * n);
              },
              f = 0;
            f < p;
            f++
          )
            c(f);
        },
      },
      {
        key: 'moveMap',
        value: function (t, n, o) {
          var l = this,
            s = new D(this.transform),
            u = new D(this.transform);
          u.move(t, n);
          Y = true;
          this.state.manual = true;
          var h = u.x - s.x,
            p = u.y - s.y,
            c = u.xx - s.xx,
            f = Math.abs(h) ** Math.abs(p),
            v = Math.ceil(f / 40);
          if (o) v = 1;
          !(function t(n) {
            setTimeout(function () {
              var o = new D(s);
              o.move((h / v) * (n + 1), (p / v) * (n + 1));
              o.scaleTo(s.xx + (c / v) * (n + 1) || 1);
              if (l.map)
                l.map.setState(
                  {
                    transform: o,
                  },
                  function () {
                    if (n < v - 1) t(n + 1);
                    l.transform = o;
                    if (n >= v - 1) Y = false;
                  }
                );
            }, 10 * n);
          })(0);
        },
      },
      {
        key: 'moveMapTo',
        value: function (t, n) {
          var o,
            l = this,
            s = new D(this.transform);
          s.moveTo(t, n);
          Y = true;
          this.state.manual = true;
          if (!(null == (o = this.map)))
            o.setState(
              {
                transform: s,
              },
              function () {
                l.transform = s;
                Y = false;
              }
            );
        },
      },
      {
        key: '_mapOffsetToSlam',
        value: function (t) {
          return {
            x: t.left || 0,
            y: t.top + t.height || 0,
          };
        },
      },
      {
        key: '_parseMapOffset',
        value: function (t) {
          var n = 0,
            o = 0,
            l = this.transform.x,
            s = this.transform.y;

          if (undefined !== this.size && this.size.width && this.size.height) {
            n = (this.size.width - this.state.map.width * t.xx) / 2;
            o = (this.size.height - this.state.map.height * t.yy) / 2;
          } else {
            n = (V - this.state.map.width * t.xx) / 2;
            o = (0.67 * j - this.state.map.height * t.yy) / 2;
          }

          return {
            offsetX: n + l,
            offsetY: o + s,
          };
        },
      },
      {
        key: '_translateXY',
        value: function (t) {
          var n = arguments.length > 1 && undefined !== arguments[1] && arguments[1],
            l = this._parseMapOffset(this.transform);

          if (n || 0 == this.state.mapDeg)
            return {
              x: t.x - l.offsetX,
              y: t.y - l.offsetY,
            };

          var s = this.state.map.width * this.transform.xx,
            u = this.state.map.height * this.transform.yy,
            h = {
              x: l.offsetX + s / 2,
              y: l.offsetY + u / 2,
            },
            p = module1339._parseDegPointWithTrans(t, h, this.transform, this.state.mapDeg),
            c = module23.default(p, 2),
            f = c[0],
            v = c[1];

          return {
            x: s / 2 + f * this.transform.xx,
            y: u / 2 + v * this.transform.yy,
          };
        },
      },
      {
        key: '_translateXYFromMap',
        value: function (t, n) {
          var o = this._parseMapOffset(n);

          return {
            x: t.x + o.offsetX,
            y: t.y + o.offsetY,
          };
        },
      },
      {
        key: '_dropTarget',
        value: function (t) {
          if (t.x && t.y && this.map && this.map.target) {
            this.targetDroped = true;

            var n = this._translateXY(t);

            n = module1339._convertToMapPoint(n, this.transform);
            this.map.target.setState({
              visible: true,
              position: n,
            });
          }
        },
      },
      {
        key: 'removeTarget',
        value: function () {
          if (this.map && this.map.target)
            this.map.target.setState({
              visible: false,
            });
        },
      },
      {
        key: '_isMapModeCarpetIgnore',
        value: function () {
          return this.state.mapMode == module1343.MAP_MODE_CARPET_EDIT && this.props.subCarpetMode & module1197.CarpetEditMode.CarpetIgnore;
        },
      },
      {
        key: '_singleClick',
        value: function (t) {
          if (t.x && t.y && this.map) {
            if (this.state.mapMode == module1343.MAP_MODE_CARPET_EDIT) this.handleCarpetMapClick(t);
            else this.handleGlobalClick(t);
            if (this.state.mapMode == module1343.MAP_MODE_GOTO_EDIT) this.props.parent.isGoing || this._dropTarget(t);
          }
        },
      },
      {
        key: '_hideComponentsBubble',
        value: function () {
          this.hideMapObjectBubble();
          this.hideChargerBubble();
        },
      },
      {
        key: '_handleLongPressStart',
        value: function (t) {},
      },
      {
        key: '_handleLongPressCancel',
        value: function () {
          this.longPressCanceled = true;
        },
      },
      {
        key: '_handleLongPressEnd',
        value: function () {
          this.longPressStart = false;
        },
      },
      {
        key: '_handleLayoutEnd',
        value: function () {
          this.onLayouted = true;

          if (this.layoutDelayBlocks.length > 0) {
            this.layoutDelayBlocks.forEach(function (t) {
              if (t) t();
            });
            this.layoutDelayBlocks.splice(0, this.layoutDelayBlocks.length);
          }
        },
      },
      {
        key: 'getMapViewHeight',
        value: function () {
          return this.size.height ? this.size.height : 0.67 * j;
        },
      },
      {
        key: 'getGotoTarget',
        value: function () {
          if (this.map && this.map.target && this.map.target.state.visible) {
            var t = this.state.map.left + this.map.target.state.position.x,
              n = this.state.map.top + this.state.map.height - this.map.target.state.position.y;
            return [(t = 50 * t.toFixed()), (n = 50 * n.toFixed())];
          }

          return null;
        },
      },
      {
        key: 'parseObstacles',
        value: function (t, n, o, l, s) {
          if (!t || !t.obstacles || 0 == t.obstacles.length) return [];

          for (
            var u = [],
              h = function (l) {
                var h,
                  p = t.obstacles[l];
                if (
                  -1 !=
                  n.findIndex(function (t) {
                    return t[0] === p[0] && t[1] === p[1] && t[2] === p[2];
                  })
                )
                  return 'continue';
                if (s && s.x && s.y && Math.sqrt((50 * s.x - p[0]) ** 2 + (50 * s.y - p[1]) ** 2) <= 300) return 'continue';

                if (null == (h = o.data) ? undefined : h.data) {
                  var c = p[0] / 50 - o.data.left,
                    f = p[1] / 50 - o.data.top,
                    v = module1339._mapOriginXYToIndex(o, c, f),
                    y = module1339._getAroundIndexInfo(o, c, f, 2),
                    _ = 0;

                  if (
                    (y.forEach(function (t) {
                      if (0 == t[1]) _++;
                    }),
                    0 == (7 & o.data.data[v]) && _ == y.length)
                  )
                    return 'continue';
                  var b = o.data.data[v] >>> 3,
                    S = 7 & o.data.data[v];

                  if (0 == b && 1 == S) {
                    var M = {};
                    y.forEach(function (t) {
                      if (0 != t[1] && 1 != t[1]) M[t[0]] ? M[t[0]]++ : (M[t[0]] = 1);
                    });
                    var k = 0;
                    _ = 0;
                    Object.keys(M).forEach(function (t, n) {
                      if (0 == n || M[t] > _) {
                        k = parseInt(t);
                        _ = M[t];
                      }
                    });
                    b = 0 != k ? k : b;
                  }

                  p.push(b);
                  u.push(p);
                }
              },
              p = 0;
            p < t.obstacles.length;
            p++
          )
            h(p);

          var c = module1339._mergeObstacles(u, l, this.transform.xx);

          c = c.sort(function (t, n) {
            return n[1] - t[1];
          });
          return c;
        },
      },
      {
        key: 'decodeMachineFBZ',
        value: function (t, n) {
          var o = n || this.state.map;
          if (!o) return {};

          for (var l = this._mapOffsetToSlam(o), s = [], u = [], h = 0; h < t.length / 2; h++) {
            var p = t[2 * h],
              c = t[2 * h + 1];
            s.push(p - l.x);
            u.push(l.y - c);
          }

          var f = Math.sqrt((s[0] - s[3]) ** 2 + (u[0] - u[3]) ** 2),
            v = Math.sqrt((s[0] - s[1]) ** 2 + (u[0] - u[1]) ** 2),
            y = (s[0] + s[2]) / 2,
            _ = (u[0] + u[2]) / 2,
            b = y - v / 2,
            S = _ - f / 2,
            M = (s[1] + s[2]) / 2,
            k = (u[1] + u[2]) / 2;

          return {
            rectSize: {
              x: b,
              y: S,
              width: v,
              height: f,
            },
            slopeAngle: (k - _) ** (M - y),
          };
        },
      },
      {
        key: 'parseWalls',
        value: function (t, n) {
          var o;

          if ((null == t ? undefined : null == (o = t.walls) ? undefined : o.length) > 0) {
            for (var l = new Array(), s = 0; s < t.walls.length; s++) {
              var u = t.walls[s],
                h = module1339._offset(u[0], u[1], n),
                p = module1339._offset(u[2], u[3], n);

              l.push({
                start: h,
                end: p,
              });
            }

            return l;
          }

          return null;
        },
      },
      {
        key: 'parseFBZS',
        value: function (t, n) {
          var o,
            l = arguments.length > 2 && undefined !== arguments[2] && arguments[2],
            u = arguments.length > 3 && undefined !== arguments[3] && arguments[3];

          if ((null == t ? undefined : null == (o = t.fbzs) ? undefined : o.length) > 0) {
            for (var h = new Array(), p = 0; p < t.fbzs.length; p++) {
              var c = t.fbzs[p],
                f = this.decodeMachineFBZ(c, n);
              if (l)
                module22.default(f, {
                  id: p,
                });
              if (u)
                module22.default(f, {
                  data: c,
                });
              h.push(f);
            }

            return h;
          }

          return null;
        },
      },
      {
        key: 'parseFurnitures',
        value: function (t, o) {
          var l;
          if (!t || t == {} || !t.num || !t.data) return null;
          var s,
            u = t.data.length > 0 ? t.data.concat() : [];
          if ((null == (l = t.hide) ? undefined : l.length) > 0)
            (((null == (s = t.hide) ? undefined : s.length) == t.num && 0 == u.length) || module394.MC.showAllFurnitureModel) && u.push.apply(u, module31.default(t.hide));
          if (!u.length) return null;

          for (var h = new Array(), p = 0; p < u.length; p++) {
            var c,
              f,
              v = u[p],
              y = v.slice(0, 8),
              _ = this.decodeMachineFBZ(y, o);

            if ((null == _ ? undefined : null == (c = _.rectSize) ? undefined : c.width) && (null == _ ? undefined : null == (f = _.rectSize) ? undefined : f.height)) {
              _.percent = v[8];
              _.type = v[9];
              _.subType = v[10];
              _.edited = v[11];
              _.id = v[12];
              _.direction = v[13];
              h.push(_);
            }
          }

          return h;
        },
      },
      {
        key: 'parseStuckPoints',
        value: function (t, n, o) {
          var l;

          if ((null == t ? undefined : null == (l = t.data) ? undefined : l.length) > 0) {
            for (var s = [], u = 0; u < t.data.length; u++) {
              var h = t.data[u],
                p = module1339._offset(h[0], h[1], n),
                c = this._checkSutckPtNearFbzs(
                  p,
                  {
                    x: h[0],
                    y: h[1],
                  },
                  o,
                  n
                );

              s.push(
                F(
                  F({}, p),
                  {},
                  {
                    times: h[2],
                    data: h,
                    nearby: c,
                  }
                )
              );
            }

            return s;
          }

          return [];
        },
      },
      {
        key: 'parseDoorSills',
        value: function (t, n, o) {
          var l,
            u = arguments.length > 3 && undefined !== arguments[3] ? arguments[3] : 0;

          if ((null == t ? undefined : null == (l = t.fbzs) ? undefined : l.length) > 0) {
            for (var h = new Array(), p = 0; p < t.fbzs.length; p++) {
              var c = t.fbzs[p],
                f = this.decodeMachineFBZ(c, n);
              module22.default(f, {
                id: p + u,
                type: o,
                data: c,
              });
              h.push(f);
            }

            return h;
          }

          return [];
        },
      },
      {
        key: 'parseExtraCleanZones',
        value: function (t, n) {
          for (var o, l = new Array(), s = 0; s < (null == t ? undefined : null == (u = t.zones) ? undefined : u.length); s++) {
            var u,
              h = t.zones[s],
              p = this.decodeMachineFBZ(h, n);
            l.push(p);
          }

          var c = null == (o = this.map) ? undefined : o.getVisibleExtraRectCount();

          if (l.length > 0 && 0 == c) {
            var f = l.map(function (t) {
              return t.rectSize;
            });
            this.addRectangleArray(f, module1126.CleanRectType.Extra);
          }
        },
      },
      {
        key: '_getVerticalZoneRect',
        value: function (t) {
          var n = t.x + t.width / 2,
            o = t.y + t.height / 2;
          return {
            x: n - t.height / 2,
            y: o - t.width / 2,
            width: t.height,
            height: t.width,
          };
        },
      },
      {
        key: '_getSingleFBZoneParams',
        value: function (t, n, o) {
          for (
            var l = this._mapOffsetToSlam(this.state.map),
              s = l.x + t.x,
              u = l.y - (t.y + t.height),
              h = t.width,
              p = t.height,
              c = [s, s + h, s + h, s],
              f = [u + p, u + p, u, u],
              v = s + 0.5 * h,
              y = u + 0.5 * p,
              _ = 0;
            _ < c.length;
            _++
          ) {
            var b = n,
              S = c[_] - v,
              M = f[_] - y,
              k = M ** S,
              C = module1339._regularAngle(k - b),
              E = Math.sqrt(S * S + M * M);

            c[_] = E * Math.cos(C) + v;
            f[_] = E * Math.sin(C) + y;
            c[_] = parseInt((50 * c[_]).toFixed());
            f[_] = parseInt((50 * f[_]).toFixed());
            o.push(c[_]);
            o.push(f[_]);
          }
        },
      },
      {
        key: '_getSinglePointParam',
        value: function (t, n) {
          var o = this._mapOffsetToSlam(this.state.map),
            l = o.x + t.x,
            s = o.y - t.y;

          n.push(parseInt((50 * l).toFixed()));
          n.push(parseInt((50 * s).toFixed()));
        },
      },
      {
        key: '_checkSutckPtNearFbzs',
        value: function (t, n, o, l) {
          if (!o || !o.fbzs || !o.fbzs.length) return null;

          for (var s = 0; s < o.fbzs.length; s++) {
            var u = o.fbzs[s];

            if (module1339._boxCircleIntersect(u, n, 20)) {
              var h = this.decodeMachineFBZ(u),
                p = module1339._getStuckPtStretchZone(u, t, h.slopeAngle, l);

              h.rectSize = p;
              return [u, h];
            }
          }

          return null;
        },
      },
      {
        key: '_filterStuckNearbyFbz',
        value: function (t, n) {
          if (t && t != {} && t.num && t.fbzs && t.fbzs.length) {
            for (var o = -1, l = 0; l < t.fbzs.length; l++) {
              var s = t.fbzs[l];

              if (
                s.length === n.length &&
                s.every(function (t, o) {
                  return t === n[o];
                })
              ) {
                o = l;
                break;
              }
            }

            if (-1 != o) t.fbzs.splice(o, 1);
          }
        },
      },
      {
        key: 'getZoneParams',
        value: function () {
          var t,
            n = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : module1126.CleanRectType.Normal,
            o = null == (t = this.map) ? undefined : t.getVisibleRectZones(n);
          if (!o || o.length <= 0) return null;

          for (var l = [], s = 0; s < o.length; s++) {
            var u = o[s].state.rectSize;
            if (module1339._isVerticalRotate((180 * o[s].state.slopeAngle) / Math.PI)) u = this._getVerticalZoneRect(u);
            var h = this.state.map.left + u.x,
              p = this.state.map.top + this.state.map.height - (u.y + u.height),
              c = h + u.width,
              f = p + u.height;
            h = 50 * parseInt(h.toFixed());
            p = 50 * parseInt(p.toFixed());
            c = 50 * parseInt(c.toFixed());
            f = 50 * parseInt(f.toFixed());
            l.push([h, p, c, f]);
          }

          return l;
        },
      },
      {
        key: 'getSupplementZones',
        value: function () {
          var t;
          if (!this.map) return [];

          for (var n = null == (t = this.map) ? undefined : t.getVisibleRectZones(module1126.CleanRectType.Extra), o = [], l = 0; l < n.length; l++) {
            var s = [];

            this._getSingleFBZoneParams(n[l].state.rectSize, n[l].state.slopeAngle, s);

            o.push(s);
          }

          return o;
        },
      },
      {
        key: 'getFBZParams',
        value: function () {
          var t,
            n,
            o,
            l = this;
          if (!this.map) return [];

          for (var s = null == (t = this.map) ? undefined : t.getVisibleFBZZones(), u = [], h = 0; h < s.length; h++) {
            var p = [];
            if (s[h].state.type == module1126.FbzType.FBZ_TYPE_REGULAR) p.push(0);
            else if (s[h].state.type == module1126.FbzType.FBZ_TYPE_MOPPING) p.push(2);
            else if (s[h].state.type == module1126.FbzType.FBZ_TYPE_CLEANING) p.push(3);

            this._getSingleFBZoneParams(s[h].state.rectSize, s[h].state.slopeAngle, p);

            u.push(p);
          }

          var c = null == (n = this.map) ? undefined : n.getEditAIFBZPoint();

          for (h = 0; h < c.length; h++) {
            var f = [4];

            this._getSinglePointParam(c[h], f);

            u.push(f);
          }

          var v = null == (o = this.map) ? undefined : o.getEditCliffZones();
          if ((null == v ? undefined : v.length) >= 0)
            v.forEach(function (t) {
              var n = [0];

              l._getSingleFBZoneParams(t.rectSize, t.slopeAngle, n);

              u.push(n);
            });
          return u;
        },
      },
      {
        key: 'getCliffZones',
        value: function () {
          var t,
            o,
            l,
            s,
            u = this,
            h = (null == (t = this.map) ? undefined : t.getNoEditCliffZones()) || [],
            p = [];
          if ((null == h ? undefined : h.length) >= 0)
            h.forEach(function (t) {
              var n = [1];

              u._getSingleFBZoneParams(t.rectSize, t.slopeAngle, n);

              p.push(n);
            });
          if ((null == (o = module415.MM.mapData) ? undefined : null == (l = o.clffbz) ? undefined : null == (s = l.fbzs) ? undefined : s.length) > 0)
            (function () {
              for (
                var t = module415.MM.mapData.clffbz.fbzs.concat(),
                  o = function (o) {
                    var l = -1;

                    if (
                      ((null == h ? undefined : h.length) > 0 &&
                        (l = h.findIndex(function (n) {
                          var l;
                          return (null == (l = n.data) ? undefined : l.toString()) == t[o].toString();
                        })),
                      -1 == l)
                    ) {
                      var s = t[o];
                      s.forEach(function (t, n, o) {
                        return (o[n] = parseInt((50 * t).toFixed()));
                      });
                      p.push([0].concat(module31.default(s)));
                    }
                  },
                  l = 0;
                l < t.length;
                l++
              )
                o(l);
            })();
          return p;
        },
      },
      {
        key: 'checkCliffZonesEdited',
        value: function () {
          var t,
            n,
            o = null == (t = this.map) ? undefined : t.getEditCliffZones();
          return (null == o ? undefined : o.length) > 0 || (null == (n = this.map) ? undefined : n.isDeleteCliff());
        },
      },
      {
        key: 'getCarpetZonesParams',
        value: function (t) {
          var n,
            o = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : -1;
          if (!this.map) return [];
          var l = null == (n = this.map) ? undefined : n.getVisibleCarpetZones(t);
          if (-1 != o)
            l = l.filter(function (t) {
              return t.state.id != o;
            });

          for (var s = [], u = 0; u < l.length; u++) {
            var h = [];

            this._getSingleFBZoneParams(l[u].state.rectSize, l[u].state.slopeAngle, h);

            s.push(h);
          }

          return s;
        },
      },
      {
        key: 'getEditFurnitureParams',
        value: function () {
          var t, n;
          if (!this.map) return [];

          for (var o = null == (t = this.map) ? undefined : t.getEditFurnitures(), l = [], s = 0; s < o.length; s++) {
            var u = [];
            u.push(1);
            var h = o[s].id > 0 ? o[s].id : -1;
            u.push(h);

            this._getSingleFBZoneParams(o[s].rectSize, o[s].slopeAngle, u);

            u.push(o[s].type);
            u.push(o[s].subType);
            u.push(o[s].direction);
            l.push(u);
          }

          var p = null == (n = this.map) ? undefined : n.getDeleteFurnitures();

          for (s = 0; s < p.length; s++) {
            var c = [];
            c.push(0);
            c.push(p[s]);
            l.push(c);
          }

          return l;
        },
      },
      {
        key: 'getAllFurnitureParams',
        value: function () {
          var t;
          if (!this.map) return [];

          for (var n = null == (t = this.map) ? undefined : t.getAllFurnitures(), o = [], l = 0; l < n.length; l++) {
            var s = [];

            this._getSingleFBZoneParams(n[l].rectSize, n[l].slopeAngle, s);

            s.push(n[l].type);
            o.push(s);
          }

          return o;
        },
      },
      {
        key: 'getAllDoorSills',
        value: function () {
          var t;
          return (null == (t = this.map) ? undefined : t.getAllDoorSills()) || [];
        },
      },
      {
        key: 'getAllDoorSillParams',
        value: function () {
          var t;
          if (!this.map) return [];

          for (var n = null == (t = this.map) ? undefined : t.getAllDoorSills(), o = [], l = 0; l < n.length; l++)
            if (!n[l].type || n[l].type != module1126.DoorSillType.SmartSill) {
              var s = [];

              this._getSingleFBZoneParams(n[l].rectSize, n[l].slopeAngle, s);

              o.push(s);
            }

          return o;
        },
      },
      {
        key: 'getAllSmartDoorSillParams',
        value: function () {
          var t;
          if (!this.map) return [];

          for (var n = null == (t = this.map) ? undefined : t.getAllDoorSills(), o = [], l = 0; l < n.length; l++) {
            if (!n[l].type) n[l].type = module1126.DoorSillType.RealSill;
            var s = [n[l].type];

            this._getSingleFBZoneParams(n[l].rectSize, n[l].slopeAngle, s);

            o.push(s);
          }

          return o;
        },
      },
      {
        key: 'getWallsParams',
        value: function () {
          var t;
          if (!this.map) return [];

          for (var n = null == (t = this.map) ? undefined : t.getVisibleWalls(), o = this._mapOffsetToSlam(this.state.map), l = [], s = 0; s < n.length; s++) {
            var u = [];
            u.push(1);

            for (
              var h = [o.x + n[s].state.position.start.x, o.y - n[s].state.position.start.y, o.x + n[s].state.position.end.x, o.y - n[s].state.position.end.y], p = 0;
              p < h.length;
              p++
            )
              u.push(parseInt((50 * h[p]).toFixed()));

            l.push(u);
          }

          return l;
        },
      },
      {
        key: 'getMapCurrentFloor',
        value: function (t, n, o) {
          var l = module22.default({}, t);

          if (this.props.editAction == module1198.EditAction.Floor && n && Object.keys(n).length > 0) {
            var u,
              h = {},
              p = {
                data: [],
              };
            Object.keys(n).forEach(function (t) {
              h[t] = n[t][0];
              if (n[t].length > 1) p.data.push([parseInt(t), n[t][1]]);
            });
            if ((null == (u = t.direction) ? undefined : u.length) > 0)
              t.direction.forEach(function (t) {
                if (
                  -1 ==
                  p.data.findIndex(function (n) {
                    return n[0] == t[0];
                  })
                )
                  p.data.push(t);
              });
            var c = module22.default(l.data.concat(), h),
              f = {
                width: o.width,
                height: o.height,
                top: o.top + 0.5 - o.data.top,
                left: o.left + 0.5 - o.data.left,
              },
              v = module1482.convertFloorDataToImage(c, f, o.data, p);
            l.image = v;
          }

          return l;
        },
      },
      {
        key: 'getSplitParams',
        value: function () {
          if (!this.map || this.props.editAction != module1198.EditAction.Split) return null;
          var t = this.map.getBlockOpts();
          if (null == t) return null;
          if (t.error)
            return {
              error: t.error,
            };
          var n = this.state.map.left + t.left.x,
            o = this.state.map.top + this.state.map.height - t.left.y;
          n = 50 * n.toFixed();
          o = 50 * o.toFixed();
          var l = this.state.map.left + t.right.x,
            s = this.state.map.top + this.state.map.height - t.right.y;
          l = 50 * l.toFixed();
          s = 50 * s.toFixed();
          var u = [this.map.blockOp.props.blockID, n, o, l, s];
          console.warn('split paras:' + u);
          return {
            info: u,
          };
        },
      },
      {
        key: 'addRectangle',
        value: function () {
          var t,
            n = this,
            o = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : null;
          if (this.onLayouted) return null == (t = this.map) ? undefined : t.addRectangle(o);
          else {
            this.waitForAddRect = true;
            this.layoutDelayBlocks.push(function () {
              var t;
              if (!(null == (t = n.map))) t.addRectangle(o);
              n.waitForAddRect = false;
            });
            return true;
          }
        },
      },
      {
        key: 'addRectangleArray',
        value: function (t) {
          var n,
            o = this,
            l = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : module1126.CleanRectType.Normal,
            s = arguments.length > 2 && undefined !== arguments[2] && arguments[2];
          if (this.onLayouted) return null == (n = this.map) ? undefined : n.addRectangleArray(t, l, s);
          else {
            this.waitForAddRect = true;
            this.layoutDelayBlocks.push(function () {
              var n;
              if (!(null == (n = o.map))) n.addRectangleArray(t, l, s);
              o.waitForAddRect = false;
            });
            return true;
          }
        },
      },
      {
        key: 'clearRectangles',
        value: function () {
          if (this.map) this.map.removeAllRects();
        },
      },
      {
        key: 'clearRectFocus',
        value: function () {
          if (this.map) this.map.clearRectFocus();
        },
      },
      {
        key: 'hasRects',
        value: function () {
          var t;
          return (null == (t = this.map) ? undefined : t.hasRects()) || this.waitForAddRect;
        },
      },
      {
        key: 'clearAllNewAddedFBZFlag',
        value: function () {
          var t;
          if (!(null == (t = this.map))) t.clearAllNewAddedFBZFlag();
        },
      },
      {
        key: 'clearAllFBZEditFocus',
        value: function () {
          var t;
          if (!(null == (t = this.map))) t.clearAllFBZEditFocus();
        },
      },
      {
        key: 'clearCarpetFbzFocus',
        value: function (t) {
          var n;
          if (!(null == (n = this.map) || null == n.clearCarpetEditZones)) n.clearCarpetEditZones(t);
        },
      },
      {
        key: 'clearAllFurnitureFocus',
        value: function () {
          var t;
          if (!(null == (t = this.map))) t.clearAllFurnitureFocus();
        },
      },
      {
        key: 'clearAllDoorSillFocus',
        value: function () {
          var t;
          if (!(null == (t = this.map))) t.clearAllDoorSillFocus();
        },
      },
      {
        key: 'isWallReachMaxNum',
        value: function () {
          var t;
          return null == (t = this.map) ? undefined : t.isWallReachMaxNum();
        },
      },
      {
        key: 'isAllFBZReachMaxNum',
        value: function () {
          var t;
          return null == (t = this.map) ? undefined : t.isFBZReachMaxNum(module1126.FbzType.FBZ_TYPE_REGULAR);
        },
      },
      {
        key: 'isMoppingFBZReachMaxNum',
        value: function () {
          var t;
          return null == (t = this.map) ? undefined : t.isFBZReachMaxNum(module1126.FbzType.FBZ_TYPE_MOPPING);
        },
      },
      {
        key: 'isCleanFBZReachMaxNum',
        value: function () {
          var t;
          return null == (t = this.map) ? undefined : t.isFBZReachMaxNum(module1126.FbzType.FBZ_TYPE_CLEANING);
        },
      },
      {
        key: 'isFBZEditZonesReachMaxNum',
        value: function () {
          var t;
          return null == (t = this.map) ? undefined : t.isFBZEditZonesReachMaxNum();
        },
      },
      {
        key: 'addAllFBWall',
        value: function () {
          var t;
          if (!(null == (t = this.map))) t.addWall();
        },
      },
      {
        key: 'addAllFBZone',
        value: function () {
          var t;
          if (!(null == (t = this.map))) t.addFBZoneNew(module1126.FbzType.FBZ_TYPE_REGULAR);
        },
      },
      {
        key: 'addMoppingFBZone',
        value: function () {
          var t;
          if (!(null == (t = this.map))) t.addFBZoneNew(module1126.FbzType.FBZ_TYPE_MOPPING);
        },
      },
      {
        key: 'addCleaningFBZone',
        value: function () {
          var t;
          if (!(null == (t = this.map))) t.addFBZoneNew(module1126.FbzType.FBZ_TYPE_CLEANING);
        },
      },
      {
        key: 'addCarpetNewZone',
        value: function (t) {
          var n;
          if (!(null == (n = this.map))) n.addCarpetEditZone(t);
        },
      },
      {
        key: 'addFurniture',
        value: function (t, n) {
          var o,
            l = arguments.length > 2 && undefined !== arguments[2] ? arguments[2] : null;
          if (!(null == (o = this.map))) o.addFurniture(t, n, l);
        },
      },
      {
        key: 'addDoorSill',
        value: function (t) {
          var n;
          if (!(null == (n = this.map))) n.addDoorSill(t);
        },
      },
      {
        key: 'addSupplementZone',
        value: function () {
          var t;
          if (!(null == (t = this.map))) t.addRectangle(null, module1126.CleanRectType.Extra);
        },
      },
      {
        key: 'startNewSupplementTask',
        value: function () {
          var t,
            n,
            o = null == (t = this.map) ? undefined : t.getVisibleRectZones(module1126.CleanRectType.Extra);
          this.extraRects =
            null == o
              ? undefined
              : o.map(function (t) {
                  return module22.default({}, t.state.rectSize);
                });
          if (!(null == (n = this.map))) n.removeAllRects(module1126.CleanRectType.Extra);
        },
      },
      {
        key: 'recoverSupplementZones',
        value: function () {
          var t;
          if ((null == (t = this.extraRects) ? undefined : t.length) > 0) this.addRectangleArray(this.extraRects, module1126.CleanRectType.Extra);
        },
      },
      {
        key: 'commitSupplementZones',
        value: function () {
          var t;
          this.extraRects = [];
          if (!(null == (t = this.map))) t.setExtraRectEnable(false);
        },
      },
      {
        key: 'isCarpetReachMaxNum',
        value: function (t) {
          var n;
          return null == (n = this.map) ? undefined : n.isCarpetReachMaxNum(t);
        },
      },
      {
        key: 'isCustomCarpetRectUnknown',
        value: function () {
          var t;
          return null == (t = this.map) ? undefined : t.isCustomCarpetOverflow();
        },
      },
      {
        key: 'isCustomCarpetOverlap',
        value: function () {
          var t;
          return null == (t = this.map) ? undefined : t.isEditCarpetOverlap(true);
        },
      },
      {
        key: 'isIgnoreCarpetOverlap',
        value: function () {
          var t;
          return null == (t = this.map) ? undefined : t.isEditCarpetOverlap(false);
        },
      },
      {
        key: 'checkAnyInChargerOrRobot',
        value: function () {
          var t;
          return null == (t = this.map) ? undefined : t.checkAllInChargerOrRobot();
        },
      },
      {
        key: 'enterGotoEditMode',
        value: function () {
          this.setState({
            mapMode: module1343.MAP_MODE_GOTO_EDIT,
          });
          if (this.map)
            this.map.setState({
              displayZones: [],
            });
        },
      },
      {
        key: 'enterZoneEditMode',
        value: function () {
          this.setState({
            mapMode: module1343.MAP_MODE_ZONED_CLEAN_EDIT,
          });
          if (this.map)
            this.map.setState({
              displayZones: [],
            });
        },
      },
      {
        key: 'handleCarpetMapClick',
        value: function (t) {
          var n,
            o,
            l = this;
          if (!(null == (n = (o = this.props).resetAllCarpetStatus)))
            n.call(o, function () {
              var n;

              if (t) {
                t = l._translateXY(t);
                if (!(null == (n = l.map))) n.addCarpetFBZoneByClick(t);
              }
            });
        },
      },
      {
        key: 'handleGlobalClick',
        value: function (t) {
          var n;

          if (this.map && this.state.shouldHandleClick) {
            t = this._translateXY(t);
            if (
              !(
                (null == (n = this.map) ? undefined : n.handleShowSmartZoneBubble(t, this.props.showAllComponetBubble)) ||
                this.map.handleShowFurnitureBubble(t, this.props.showAllComponetBubble)
              )
            )
              module415.MM.hasCarpetMap && this.map.handleShowCarpetBubble(t, this.props.showAllComponetBubble);
          }
        },
      },
      {
        key: 'findCarpetAndShowGuide',
        value: function () {
          var t;
          if (!(null == (t = this.map))) t.handleShowCarpetBubbleGuide();
        },
      },
      {
        key: 'findSmartBubbleShowGuide',
        value: function (t) {
          var n;
          if (!(null == (n = this.map))) n.handleShowSmartBubbleGuide(t);
        },
      },
      {
        key: 'getBackupRoomNameList',
        value: function () {
          module393.getRoomList(function (t, n) {
            console.warn('result:' + t + ' currentlist:' + JSON.stringify(n));
          });
        },
      },
      {
        key: 'changeMapViewMode',
        value: function (t) {
          if (t != this.lastMapMode) {
            this.lastMapMode = t;
            var n = module1126.BlockBubbleShowInfo.DISPLAYNAME | module1126.BlockBubbleShowInfo.CLEANSEQUENCE,
              o = module1126.BlockBubbleShowInfo.DISPLAYNAME | module1126.BlockBubbleShowInfo.CLEANSEQUENCE | module1126.BlockBubbleShowInfo.CLEANMODE;
            if (this.props.showAllBlocksBubble && !module390.default.isCustomModeIconSupported()) o = n;
            if (t == G.Global_Clean)
              this.setState({
                inBlockMode: false,
                inCleanBlockMode: 0,
                mapMode: module1343.MAP_MODE_REGULAR,
                blockBubbleShowInfo: n,
                shouldHandleClick: true,
              });
            else if (t == G.Segment_Clean_Read_Only) {
              this.setState({
                inCleanBlockMode: 1,
                mapMode: module1343.MAP_MODE_REGULAR,
                blockBubbleShowInfo: n,
                shouldHandleClick: false,
              });
              this.resetSelectBlocks();
            } else if (t == G.Segment_Clean_Edit)
              this.setState({
                inCleanBlockMode: 2,
                mapMode: module1343.MAP_MODE_BLOCK_CLEAN_EDIT,
                blockBubbleShowInfo: n,
                shouldHandleClick: false,
              });
            else if (t == G.Zone_Clean_Read_Only) {
              this.clearRectFocus();
              this.setState({
                inBlockMode: false,
                inCleanBlockMode: 4,
                mapMode: module1343.MAP_MODE_REGULAR,
                blockBubbleShowInfo: module1126.BlockBubbleShowInfo.NONE,
                shouldHandleClick: false,
              });
            } else if (t == G.Zone_Clean_Edit)
              this.setState({
                inBlockMode: false,
                inCleanBlockMode: 3,
                mapMode: module1343.MAP_MODE_ZONED_CLEAN_EDIT,
                blockBubbleShowInfo: module1126.BlockBubbleShowInfo.NONE,
                shouldHandleClick: true,
              });
            else if (t == G.Global_Clean_With_Clean_Type)
              this.setState({
                inCleanBlockMode: 0,
                mapMode: module1343.MAP_MODE_REGULAR,
                blockBubbleShowInfo: o,
                shouldHandleClick: true,
              });
            else if (t == G.Segment_Clean_Edit_With_Clean_Type)
              this.setState({
                inCleanBlockMode: 2,
                mapMode: module1343.MAP_MODE_BLOCK_CLEAN_EDIT,
                blockBubbleShowInfo: o,
                shouldHandleClick: false,
              });
            else if (t == G.Segment_Clean_Read_Only_With_Clean_Type) {
              this.setState({
                inCleanBlockMode: 1,
                mapMode: module1343.MAP_MODE_REGULAR,
                blockBubbleShowInfo: o,
                shouldHandleClick: false,
              });
              this.resetSelectBlocks();
            } else if (t == G.Segment_Clean_Sequential_Edit_With_Clean_Type)
              this.setState({
                inCleanBlockMode: 2,
                mapMode: module1343.MAP_MODE_BLOCK_CLEAN_EDIT,
                blockBubbleShowInfo: o,
                shouldHandleClick: false,
              });
            else if (t == G.Segment_Clean_Sequential_Read_Only_With_Clean_Type) {
              this.setState({
                inCleanBlockMode: 1,
                mapMode: module1343.MAP_MODE_REGULAR,
                blockBubbleShowInfo: o,
                shouldHandleClick: false,
              });
              this.resetSelectBlocks();
            } else if (t == G.Segment_Clean_Sequential_Edit)
              this.setState({
                inBlockMode: true,
                inCleanBlockMode: 0,
                mapMode: module1343.MAP_MODE_MAP_EDIT,
                hideAccessory: true,
                blockBubbleShowInfo: module1126.BlockBubbleShowInfo.CLEANSEQUENCE,
              });
            else if (t == G.Segment_Clean_Sequential_Read_Only) {
              this.setState({
                inCleanBlockMode: 1,
                mapMode: module1343.MAP_MODE_REGULAR,
                blockBubbleShowInfo: o,
              });
              this.resetSelectBlocks();
            }
          }
        },
      },
      {
        key: 'isCanBlockEdit',
        value: function () {
          return this.state.inBlockMode || 2 == this.state.inCleanBlockMode;
        },
      },
      {
        key: 'getSelectBlockFromSeqArray',
        value: function (t) {
          var n = new Array(module1126.MAX_BLOCK_NO).fill(0);
          if (undefined !== t)
            t.forEach(function (t) {
              n[t] = 1;
            });
          return n;
        },
      },
      {
        key: 'setHighlightSegments',
        value: function (t) {
          var n = arguments.length > 1 && undefined !== arguments[1] && arguments[1];

          if (undefined !== t) {
            var o = {
              selectBlockList: this.getSelectBlockFromSeqArray(t),
            };
            if (n)
              module22.default(o, {
                editSequenceList: t,
              });
            this.setState(o);
          }
        },
      },
      {
        key: 'setCleanSequence',
        value: function (t) {
          if (undefined !== t)
            this.setState({
              blockSequenceInfo: t,
            });
        },
      },
      {
        key: 'getCurrentSelectBlock',
        value: function () {
          var t,
            n = [];
          if (!(null == (t = this.state.selectBlockList)))
            t.forEach(function (t, o) {
              if (0 != t) n.push(o);
            });
          return n;
        },
      },
      {
        key: 'resetSelectBlocks',
        value: function () {
          var t, n;

          if (
            (this.setState({
              editSequenceList: [],
            }),
            0 != this.getCurrentSelectBlock().length)
          ) {
            var o = new Array(module1126.MAX_BLOCK_NO).fill(0);
            this.setState({
              selectBlockList: o,
            });
            if (!(null == (t = (n = this.props).selectedBlocksDidChange))) t.call(n, []);
          }
        },
      },
      {
        key: 'changeBlockState',
        value: function (t) {
          var n,
            o,
            l,
            s,
            u,
            h,
            p = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : null;

          if (this.isCanBlockEdit()) {
            var c = this.state.selectBlockList;
            c[t] = 1 - c[t];

            for (var f = 0; f < c.length; f++) {
              if (1 == c[f]) {
                var v = f + '';
                if (undefined === this.state.map.mapList[v]) c[f] = 0;
              }
            }

            var y,
              _,
              b,
              S = new Set(this.state.editSequenceList);

            if (1 == c[t]) {
              S.add(t);
              if (p) null == (y = this.touchBlockPtMap) || y.set(t, p);
            } else {
              if (!(null == (_ = S))) _.delete(t);
              if (null == (b = this.touchBlockPtMap) ? undefined : b.has(t)) this.touchBlockPtMap.delete(t);
            }

            S = Array.from(S);
            this.setState({
              selectBlockList: c,
              editSequenceList: S,
              blockSequenceListReadOnly: S,
            });
            if (1 == c[t] && 1 == S.length) null == (n = (o = this.props).didTapBlockInCustomMode) || n.call(o, t);
            if (!(null == (l = (s = this.props).selectedBlocksDidChange))) l.call(s, S);
            if (!(null == (u = (h = this.props).didTapBlockInCustomOrder))) u.call(h, t);
            U = true;
          } else U = true;
        },
      },
      {
        key: 'clearTouchBlockPts',
        value: function () {
          var t;
          if (!(null == (t = this.touchBlockPtMap))) t.clear();
        },
      },
      {
        key: 'getRoomNameListInMap',
        value: function () {
          var t, n;

          if (
            !('android' == module13.Platform.OS && module393.MiApiLevel < module393.androidRoomApiLevel && module393.isMiApp) &&
            !module391.default.isShareUser() &&
            (this.checkAppVersion() || !module393.isMiApp)
          ) {
            var o = module415.MM.roomNameMapping,
              l = module415.MM.roomNameList;

            if (null != o && null != l) {
              for (
                var s = new Array(module1126.MAX_BLOCK_NO).fill().map(function (t) {
                    return [-1, -1];
                  }),
                  u = [],
                  h = 0;
                h < o.length;
                h++
              ) {
                var p = o[h][0];
                u.push(p);
                s[p][0] = parseInt(o[h][1]);
                if (3 == o[h].length) s[p][2] = o[h][2];
              }

              for (var c = 0; c < l.length; c++)
                for (var f = l[c].name, v = l[c].roomId, b = 0; b < s.length; b++)
                  if (v == s[b][0]) {
                    s[b][1] = f;
                    break;
                  }

              var S = new Array(module1126.MAX_BLOCK_NO).fill().map(function (t) {
                  return '';
                }),
                M = null == (t = module415.MM.mapData) ? undefined : null == (n = t.map) ? undefined : n.colorData,
                k = module415.MM.allServerNames || [];
              if (M && M.length > 0) for (var E = 0; E < M.length; E++) M[E] > 0 && -1 == u.indexOf(E) && (S[E] = this.getDefaultRoomName(k, S));
              this.setState({
                roomNameList: s,
                defaultNameList: S,
              });
            }
          }
        },
      },
      {
        key: 'getDefaultRoomName',
        value: function (t, n) {
          for (var o = module510.default_room_name, l = 1, s = '' + o + l; (-1 != t.indexOf(s) || -1 != n.indexOf(s)) && ((s = '' + o + l), 20 != ++l); );

          return s;
        },
      },
      {
        key: 'checkAppVersion',
        value: function () {
          return module393.apiLevel >= 146;
        },
      },
      {
        key: 'getExistingBlocks',
        value: function () {
          if (undefined !== this.state.map.mapList) {
            for (var t = Object.keys(this.state.map.mapList), n = [], o = 0; o < t.length; o++) '0' != t[o] && n.push(t[o] - '');

            return n;
          }

          return [];
        },
      },
      {
        key: 'checkSegmentSize',
        value: function (t) {
          if (t.length <= 0) return false;

          for (var n = 0; n < t.length; n++) {
            var o, l, s;
            if (
              (null == (o = this.state.map) ? undefined : o.centerInfo) &&
              (null == (l = this.state.map) ? undefined : null == (s = l.centerInfo[t[n]]) ? undefined : s.count) > 3
            )
              return true;
          }

          return false;
        },
      },
      {
        key: 'getSegmentArea',
        value: function (t) {
          var n;
          return (null == (n = this.state.map) ? undefined : n.centerInfo) && this.state.map.centerInfo[t] ? 0.05 * this.state.map.centerInfo[t].count * 0.05 : 0;
        },
      },
      {
        key: 'setSingleCleanMopMode',
        value: function (t, n, o, l) {
          var s = this.state.roomModeList,
            u = s;
          if (
            !s.find(function (n) {
              return n.id == t;
            })
          )
            u.push({
              id: t,
              cleanMode: n,
              waterMode: o,
              mopMode: l,
            });
          else
            u = s.map(function (s) {
              if (s.id == t) {
                s.cleanMode = n;
                s.waterMode = o;
                s.mopMode = l;
                s.mopTemplateId = null == s ? undefined : s.mop_template_id;
              }

              return s;
            });
          console.log('ModeList: ' + JSON.stringify(this.state.roomModeList) + ' CleanModeSet: ' + JSON.stringify(u));
          this.setState({
            roomModeList: u,
          });
          this.resetSelectBlocks();
        },
      },
      {
        key: 'setSingleRoomName',
        value: function (t, n, o) {
          var l = arguments.length > 3 && undefined !== arguments[3] ? arguments[3] : 0,
            s = arguments.length > 4 && undefined !== arguments[4] && arguments[4],
            u = this.state.roomNameList || [];
          u[t][1] = n;
          u[t][0] = o;
          u[t][2] = l;

          for (var h = 0; h < u.length; h++) h != t && u[h][1] == n && ((u[h][0] = -1), (u[h][1] = -1));

          var p = this.state.defaultNameList || [];

          if (s) {
            var c = module415.MM.allServerNames || [],
              f = p.indexOf(n);
            if (-1 != f) p[f] = this.getDefaultRoomName(c, p);
          }

          this.setState({
            roomNameList: u,
            defaultNameList: p,
          });
          this.resetSelectBlocks();
        },
      },
      {
        key: 'setAllCleanMopMode',
        value: function (t) {
          var n = t.map(function (t) {
            return {
              id: t.segment,
              cleanMode: t.fan_power,
              waterMode: t.water_box_mode,
              mopMode: t.mop_mode,
              mopTemplateId: null == t ? undefined : t.mop_template_id,
            };
          });
          this.setState({
            roomModeList: n,
          });
        },
      },
      {
        key: 'setCleanMode',
        value: function (t) {
          var n = this.state.roomModeList.map(function (n) {
            n.cleanMode = t;
            return n;
          });
          this.setState({
            roomModeList: n,
          });
        },
      },
      {
        key: 'setWaterMode',
        value: function (t) {
          var n = this.state.roomModeList.map(function (n) {
            n.waterMode = t;
            return n;
          });
          this.setState({
            roomModeList: n,
          });
        },
      },
      {
        key: 'setMapObjectVisible',
        value: function (t) {
          if (this.map)
            this.map.setState({
              showMapObject: !!t,
            });
        },
      },
      {
        key: 'mapObjectNumber',
        value: function () {
          return ((this.map && this.map.mapObjectRefs) || []).length;
        },
      },
      {
        key: 'showMapObjectPhotoReminder',
        value: function () {
          var t = (this.map && this.map.mapObjectRefs) || [];
          if (t.length > 0) for (var n = t.length - 1; n >= 0; n--) if (t[n].props.originX > 0 && t[n].props.originY > 0) return void t[n].showReminderBubble();
        },
      },
      {
        key: 'hideMapObjectBubble',
        value: function () {
          console.warn('hide bubbles');
          if (this.map) this.map.hideAllMapObjects();
        },
      },
      {
        key: 'resetManual',
        value: function (t) {
          this.setState({
            manual: t,
          });
        },
      },
      {
        key: 'playRobotAnimation',
        value: function () {
          if (this.map) this.map.playRobotAnimation();
        },
      },
      {
        key: 'pauseRobotAnimation',
        value: function () {
          if (this.map) this.map.pauseRobotAnimation();
        },
      },
      {
        key: 'stopRobotAnimation',
        value: function () {
          if (this.map) this.map.stopRobotAnimation();
        },
      },
      {
        key: 'setRobotMovingSpeed',
        value: function (t) {
          if (this.map) this.map.setRobotMovingSpeed(t);
        },
      },
      {
        key: 'rotateMap',
        value: function (t) {
          var n = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : null,
            o = this.state.mapDeg + (t ? 90 : -90);
          this.setState({
            mapDeg: o % 360,
          });
          if (n) n(o % 360);
        },
      },
      {
        key: 'setMapDeg',
        value: function (t) {
          this.setState({
            mapDeg: t % 360,
          });
        },
      },
      {
        key: 'getMapDeg',
        value: function () {
          return this.state.mapDeg % 360;
        },
      },
      {
        key: 'hideChargerBubble',
        value: function () {
          var t;
          if (!(null == this || null == (t = this.map))) t.hideChargerBubble();
        },
      },
      {
        key: 'showChargerBubble',
        value: function (t) {
          var n;
          if (!(null == this || null == (n = this.map) || null == n.showChargerBubble)) n.showChargerBubble(t);
        },
      },
      {
        key: 'addHistoryMark',
        value: function () {
          var t;
          if (!(null == (t = this.map))) t.addHistoryMark();
        },
      },
      {
        key: 'clearAllMarkFocus',
        value: function () {
          var t;
          if (!(null == (t = this.map))) t.clearAllMarkFocus();
        },
      },
      {
        key: 'showSplitLine',
        get: function () {
          return this.props.editAction == module1198.EditAction.Split;
        },
      },
      {
        key: 'showExtraRect',
        get: function () {
          return 'function' == typeof this.props.onSupplementZonesChanged;
        },
      },
    ]);
    return q;
  })(React.default.Component);

exports.MapView = H;
H.defaultProps = {
  alwaysShowFBZ: false,
  showMapObjectDebugInfo: false,
  obstaclePopBoxType: 'ai',
  isCollectDustDock: false,
  showDockBubbles: false,
  shouldShowMapObjectBubbleChecker: function () {
    return false;
  },
  onPressMapObject: function () {},
  onPressMapObjectBubble: function () {},
  onPressMapObjectPhotoReminderBubble: function () {},
  onPressFurnitureBubble: function () {},
  onPressSmartZoneBubble: function () {},
  onPathPlaybackFinished: function () {},
  shouldShowRobotMovingAnimation: false,
  syncMapDeg: true,
  onPressChargerErrorBubble: function () {},
  ignoreCarpetEdited: false,
  cusCarpetEdited: false,
  zonesHasEdited: false,
  showAllBlocksBubble: false,
  showAllComponetBubble: false,
  showFurnitureIcon: false,
  showFurnitureOnly: false,
  mapElementShowFlag: 255,
};
H.propTypes = {
  isCollectDustDock: PropTypes.bool,
  showDockBubbles: PropTypes.bool,
};
var K = module13.StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  mapContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
