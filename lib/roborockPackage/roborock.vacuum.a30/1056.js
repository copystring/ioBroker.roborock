var module23 = require('@babel/runtime/helpers/slicedToArray'),
  module50 = require('./50'),
  module22 = require('./22'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1057 = require('./1057'),
  module1120 = require('./1120'),
  module1123 = require('./1123'),
  module1401 = require('./1401'),
  module391 = require('./391'),
  module419 = require('./419'),
  module414 = require('./414'),
  module390 = require('./390'),
  module394 = require('./394'),
  module381 = require('./381');

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

var PropTypes = require('prop-types'),
  x = module12.ART.Transform,
  module505 = require('./505').strings,
  module1336 = require('./1336').isRRSurface,
  module393 = require('./393'),
  module1261 = require('./1261'),
  module1057 = require('./1057'),
  module1265 = require('./1265'),
  module1337 = require('./1337').Palette,
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

var W = false,
  Y = 'android' != module12.Platform.OS || module393.systemMemorySize > 5e3,
  q = module12.Dimensions.get('window'),
  j = q.height,
  U = q.width,
  V = true,
  X = false,
  H = (function (t) {
    module7.default(q, t);

    var module50 = q,
      A = O(),
      R = function () {
        var t,
          n = module11.default(module50);

        if (A) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function q(t) {
      var n;
      module4.default(this, q);
      (n = R.call(this, t)).top = n.props.hasOwnProperty('top') ? n.props.top : module1265.StatusBarHeight + module1265.AppBarHeight;
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
      n.transform = new x();
      n.scaleMin = n.props.scaleMin || 1;
      n.scaleMax = n.props.scaleMax || 5;
      n.lastMapMode = G.Global_Clean;
      n.blockSequenceList = t.blockSequenceInfo || [];
      var o = n.getSelectBlockFromSeqArray(n.blockSequenceList);
      n.onLayouted = false;
      n.layoutDelayBlocks = [];
      n.mapInitialScaled = false;
      n.state = {
        charger: t.charger,
        map: t.map || {
          left: module1057.Config.center.x - module1057.EMPTY_MAP_WIDTH / 2,
          top: module1057.Config.center.y - module1057.EMPTY_MAP_HEIGHT / 2,
          width: module1057.EMPTY_MAP_WIDTH,
          height: module1057.EMPTY_MAP_HEIGHT,
        },
        path: t.path,
        robotStatus: 'Unknown',
        manual: false,
        mapMode: t.mapMode || module1265.MAP_MODE_REGULAR,
        showGotoTips: true,
        labEnabled: false,
        inBlockMode: t.inBlockMode || false,
        inCleanBlockMode: 0,
        selectBlockList: o,
        showPath: true,
        roomNameList: [],
        defaultNameList: [],
        hideAccessory: t.hideAccessory || false,
        blockBubbleShowInfo: n.initBlockBubbleFlag(t) || module1057.BlockBubbleShowInfo.NONE,
        roomModeList: [],
        blockSequenceListReadOnly: [],
        blockSequenceInfo: t.blockSequenceInfo || [],
        showCarpetBubbles: t.showAllComponetBubble || false,
        mapDeg: n.initMapDeg(t) || 0,
        mapPanStatus: module1057.PanStatus.MAP_VIEWING_NONE,
        eidtFloor: {},
      };
      return n;
    }

    module5.default(q, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          var t = this;
          this.roomNameListener = this.specialEventListener = module12.DeviceEventEmitter.addListener(module419.NotificationKeys.DidReceiveSpecialEvent, function (n) {
            if (n.data == module419.EventKeys.RoomNameMappingDidReceive && t.props.editAction != module1120.EditAction.Name) t.getRoomNameListInMap();
          });
          this.panResponder = module12.PanResponder.create({
            onStartShouldSetPanResponder: function () {
              return 0 != V;
            },
            onMoveShouldSetPanResponder: function () {
              return false;
            },
            onPanResponderStart: function (n, o) {
              if (!(null == t.props.onPanResponderStart)) t.props.onPanResponderStart();
              t.setState({
                mapPanStatus: module1057.PanStatus.MAP_VIEWING_FIT,
              });
              t.touch.move = module1261._parseEvent(n.nativeEvent) || {};
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
                  mapPanStatus: module1057.PanStatus.MAP_VIEWING_NONE,
                }),
                1 != W &&
                  (t.longPressStart ? t._handleLongPressEnd() : t._handleLongPressCancel(),
                  (t.touch.end = module1261._parseEvent(n.nativeEvent)),
                  t.touch.start.timestamp && t.touch.end && t.touch.end.timestamp))
              )
                if (!(t.touch.end.timestamp - t.touch.start.timestamp + t.touch.interval > module1057.Config.click) && t.touch.interval > 0) {
                  if (t.touch.interval > 0 && t.state.mapMode != module1265.MAP_MODE_MAP_EDIT && t.state.mapMode != module1265.MAP_MODE_CARPET_EDIT) {
                    var s =
                      (t.map &&
                        t.map.state.width &&
                        t.map.state.height && {
                          width: t.map.state.width,
                          height: t.map.state.height,
                        }) ||
                      {};
                    if (t.map)
                      t.map.setState({
                        transform: module1261._center(t.transform, t.size, s, t.left, t.top, t.right, t.bottom, t.state.mapDeg),
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
                    V = false;

                    var l = {
                        x: module12.I18nManager.isRTL ? t.size.width - t.touch.move.x : t.touch.move.x,
                        y: t.touch.move.y,
                      },
                      u = t._translateXY(l),
                      p = u.x / t.transform.xx,
                      h = u.y / t.transform.yy,
                      c = t.getTouchPointBlockID(p, h);

                    if (c <= 0) {
                      if (0 == c) {
                        if (!(null == t.props.didTapWhenNoBlock)) t.props.didTapWhenNoBlock();
                        if (!t.props.didTapWhenNoBlock) globals.showToast(module505.mainpage_unknown_segment_click_tips);
                      }

                      return void (V = true);
                    }

                    t.changeBlockState(c);
                  } else {
                    var f;
                    if (!(null == (f = t.map))) f.clearRectFocus();
                    t.clearAllFBZEditFocus();
                    t.clearAllFurnitureFocus();
                    t.clearAllDoorSillFocus();
                    if (module12.I18nManager.isRTL) {
                      if (t.size && t.size.width)
                        t._singleClick({
                          x: t.size.width - t.touch.start.x,
                          y: t.touch.start.y,
                        });
                    } else t._singleClick(t.touch.start);
                  }
            },
            onPanResponderMove: function (n, o) {
              var s;
              if ((t._handleLongPressCancel(), 1 != W))
                if (
                  (t.map && t.map.clearRectFocus(),
                  null == t.clearAllFBZEditFocus || t.clearAllFBZEditFocus(),
                  t.props.shouldShowRobotMovingAnimation && t.clearAllMarkFocus(),
                  (t.state.manual = true),
                  !t.map || (t.map.state.width && t.map.state.height))
                ) {
                  var l = [module1261._parseEvent(n.nativeEvent), t.touch.move],
                    u = l[0],
                    p = l[1];

                  if (
                    u &&
                    undefined !== n.nativeEvent.pageX &&
                    undefined !== n.nativeEvent.pageY &&
                    undefined !== t.touch &&
                    undefined !== t.touch.page &&
                    undefined !== t.touch.page.x &&
                    undefined !== t.touch.page.y
                  ) {
                    var h = Math.abs(u.x - p.x - (n.nativeEvent.pageX - t.touch.page.x)),
                      c = Math.abs(u.y - p.y - (n.nativeEvent.pageY - t.touch.page.y));
                    if (
                      (undefined !== n.nativeEvent.pageX &&
                        undefined !== n.nativeEvent.pageY &&
                        ((t.touch.page = {
                          x: n.nativeEvent.pageX,
                          y: n.nativeEvent.pageY,
                        }),
                        (t.touch.move = u || {})),
                      (!isNaN(h) && h >= 10) || (!isNaN(c) && c >= 10))
                    )
                      return;
                  }

                  if (
                    u &&
                    !(
                      Math.abs(u.x - t.touch.start.x) < 3 ||
                      ((u.x != p.x || u.y != p.y || u.distance) && (t.touch.lastMovedTimestamp = new Date().getTime()), t.longPressStart && u.x - p.x < 10 && u.y - p.y < 10)
                    )
                  ) {
                    var f = new x(t.transform);
                    if (u.hasOwnProperty('distance')) f.scale(u.distance / p.distance || 1);
                    else f.move(module12.I18nManager.isRTL ? p.x - u.x : u.x - p.x, u.y - p.y);
                    var v =
                      (t.map &&
                        t.map.state.width &&
                        t.map.state.height && {
                          width: t.map.state.width,
                          height: t.map.state.height,
                        }) ||
                      null;

                    if (module1261._checkTrans(f, t.size, v, t.left, t.top, t.right, t.bottom, t.props.noScale, t.state.mapDeg)) {
                      if (1 == Y && u.hasOwnProperty('distance') && t.canPageModeFeature(u, p)) {
                        var _ = {
                            x: (p.x1 + p.x2) / 2,
                            y: (p.y1 + p.y2) / 2,
                          },
                          S = t._translateXY(_, true),
                          M = u.distance / p.distance || 1,
                          k = {
                            x: S.x * M,
                            y: S.y * M,
                          },
                          C = t._translateXYFromMap(k, f),
                          B = (u.x1 + u.x2) / 2,
                          E = (u.y1 + u.y2) / 2,
                          P = B - C.x,
                          w = E - C.y;

                        f.move(module12.I18nManager.isRTL ? -P : P, w);
                      }

                      var A = u.hasOwnProperty('distance') ? module1057.PanStatus.MAP_VIEWING_SCALED : module1057.PanStatus.MAP_VIEWING_MOVED;
                      t.setState({
                        mapPanStatus: A,
                      });
                      if (!(null == (s = t.map)))
                        s.setState({
                          transform: (t.transform = f),
                        });
                    }
                  }
                } else
                  t.map &&
                    t.map.setState({
                      transform: new x(),
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
          return !W && this.state.mapPanStatus != module1057.PanStatus.MAP_VIEWING_SCALED;
        },
      },
      {
        key: 'UNSAFE_componentWillUpdate',
        value: function (t, n) {
          var o,
            s,
            u,
            p,
            h,
            c,
            f,
            v,
            S,
            M,
            k,
            C,
            B,
            P = this.transform;
          if (n.mapMode == module1265.MAP_MODE_ZONED_CLEAN_EDIT && 3 == n.inCleanBlockMode) null == (B = this.map) || B.updateRotateRects();
          var A = (null == (o = n.blocks) ? undefined : null == (s = o.blocks) ? undefined : s.length) > 0 ? n.blocks.blocks : [];

          if (n.map !== this.state.map || n.path !== this.state.path) {
            var O = n.map;

            if (O) {
              var R = O.width &&
                O.height && {
                  width: O.width,
                  height: O.height,
                };
              if (!n.manual) module1261._center(P, this.size, R, this.left, this.top, this.right, this.bottom, n.mapDeg);

              var x = this._mapOffsetToSlam(O),
                D = module1261._offset(module1057.Config.center.x, module1057.Config.center.y, x),
                T = 0,
                L = false,
                z = (null == (u = n.path) ? undefined : null == (p = u.points) ? undefined : p.length) || 0;

              if (z > 2) {
                var G = n.path.points || [];
                D = module1261._offset(G[z - 1].x, G[z - 1].y, x);
                if (module381.RSM.cleanResumeFlag != module381.CleanResumeFlag.None && module390.default.isSupportIncrementalMap()) L = true;
              }

              if (n.robot) {
                if (!L) D = module1261._offset(n.robot.x, n.robot.y, x);
                T = n.robot.angle;
              }

              var W =
                  (n.charger &&
                    n.charger.x &&
                    n.charger.y &&
                    undefined !== n.charger.angle &&
                    module22.default(module1261._offset(n.charger.x, n.charger.y, x), {
                      angle: n.charger.angle,
                    })) ||
                  null,
                Y = {
                  displayZones: [],
                };
              if (n.mapMode == module1265.MAP_MODE_REGULAR && n.zones && (Y = module1261._parseDisplayRects(n.zones, x)).displayZones.length > 0 && 4 == n.inCleanBlockMode)
                this.clearRectangles();
              var q = module390.default.isMopPathSupported() && n.mopPath && undefined !== n.mopPath.data,
                j =
                  'android' != module12.Platform.OS || module1336
                    ? {
                        xx: 1,
                        yy: 1,
                      }
                    : P,
                U = {
                  path: '',
                };

              if (n.path) {
                var V = ('android' != module12.Platform.OS || module1336) && q ? n.mopPath.data : null;
                U = module1261._parsePath(n.path.points, x, V, false, j);
              }

              var H = q
                  ? module1261._parseMopPath(n.path.points, x, n.mopPath.data, j)
                  : {
                      mopPath: '',
                    },
                K = q
                  ? module1261._parseBackWashPath(n.path.points, x, n.mopPath.data, j)
                  : {
                      backWashPath: '',
                    },
                Q = {
                  pathType: (null == (h = n.pathType) ? undefined : h.data) || module1057.MoppingType.MOPPING_TYPE_BOTH_BOTH,
                },
                J = {
                  pathGotoPlan: '',
                };

              if (this.state.mapMode == module1265.MAP_MODE_GOTO_EDIT && n.pathGotoPlan) {
                var $ = module1261._parseGotoPlanPath(n.pathGotoPlan.points, x, j);

                J.pathGotoPlan = $.path;
              }

              var ee = [];
              if (n.path)
                for (var te = 0; te < (null == (ae = n.path.points) ? undefined : ae.length); te++) {
                  var ae,
                    ne = module1261._offset(n.path.points[te].x, n.path.points[te].y, x);

                  ee.push(F({}, ne));
                }
              var oe = {
                target: {},
              };
              if (this.state.mapMode == module1265.MAP_MODE_GOTO_EDIT && n.target) oe = module1261._parseTarget(n.target, x);
              var ie = [];
              if (n.enemies && (null == (c = n.enemies.data) ? undefined : c.length) > 0)
                for (var se = 0; se < n.enemies.data.length; se++) {
                  var le = n.enemies.data[se],
                    re = module1261._offset(le[0], le[1], x);

                  ie.push(
                    F(
                      F({}, re),
                      {},
                      {
                        flag: le[2],
                      }
                    )
                  );
                }
              if (null == (f = t.initStuckPt) ? undefined : f.nearby) this._filterStuckNearbyFbz(n.fbzs, t.initStuckPt.nearby[0]);
              var ue = this.parseFBZS(n.fbzs, n.map),
                pe = this.parseWalls(n.walls, x),
                he = this.parseFBZS(n.mfbzs, n.map),
                ce = this.parseFBZS(n.clfbzs, n.map),
                de = this.parseDoorSills(n.dsfbz, n.map, module1057.DoorSillType.RealSill),
                me = this.parseDoorSills(n.smartds, n.map, module1057.DoorSillType.SmartSill, de.length);
              de = de.concat(me);

              var fe = this.parseStuckPoints(n.stuckpts, x),
                ve = module390.default.isSupportCliffZone() ? this.parseFBZS(n.clffbz, n.map, true, true) : null,
                ge = this._isMapModeCarpetIgnore() ? this.parseFBZS(n.cfbzs, n.map) : null,
                ye = this.parseFBZS(n.customCarpet, n.map),
                be = this.parseFurnitures(n.furnitures, n.map),
                _e = this.getMapCurrentFloor(n.floorMap, n.eidtFloor, n.map),
                Se = (null == (v = n.ignoredObstacles) ? undefined : v.obstacles) || [],
                Me = this.parseObstacles(n.obstacles, Se, O, x, n.charger),
                ke = undefined,
                Ce = undefined,
                Be = -1;

              if (
                !(
                  undefined === n.carpetMap ||
                  '' == n.carpetMap.image ||
                  (!module390.default.isCarpetSupported() && !module390.default.isCarpetShowOnMap()) ||
                  (module390.default.isRubberBrushCarpetSupported() && !this.props.showBrushCarpet)
                )
              ) {
                Ce = n.carpetMap.capData;
                ke = n.carpetMap.image;
                Be = n.carpetMap.firstIndex;
              }

              var Ee = n.dockType && n.dockType.data ? n.dockType.data : -1;
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
                                  F(
                                    {
                                      status: n.robotStatus,
                                      transform: P,
                                      map: O.image,
                                      robot: D,
                                      robotAngle: T,
                                      charger: W,
                                      blockInClean: A,
                                      mapNoBlock: O.imageNoBlock,
                                      mapBCBackground: O.imageBlockCleanBackground,
                                      roomColorData: O.colorData,
                                      centerInfo: O.centerInfo,
                                      obstacles: Me,
                                      cfbZones: ge,
                                      cusCarpetZones: ye,
                                      initFBZone: t.initFBZone,
                                      initStuckPt: t.initStuckPt,
                                      fbzWalls: pe,
                                      fbzZones: ue,
                                      mopZones: he,
                                      cleanZones: ce,
                                      furnitures: be,
                                      doorSills: de,
                                      stuckPoints: fe,
                                      cliffZones: ve,
                                      ignoredObstacles: Se,
                                      floorMap: _e,
                                      carpetMap: ke,
                                      carpetData: Ce,
                                      carpetFirstIndex: Be,
                                      dockType: Ee,
                                      enemies: ie,
                                    },
                                    R
                                  ),
                                  U
                                ),
                                Y
                              ),
                              J
                            ),
                            oe
                          ),
                          H
                        ),
                        K
                      ),
                      Q
                    ),
                    {},
                    {
                      pathPoints: ee,
                      pathData: {
                        points: null == n ? undefined : null == (S = n.path) ? undefined : S.points,
                        planPoints: this.state.mapMode == module1265.MAP_MODE_GOTO_EDIT && (null == n ? undefined : null == (M = n.pathGotoPlan) ? undefined : M.points),
                        mopData: null == n ? undefined : null == (k = n.mopPath) ? undefined : k.data,
                        pathType: null == n ? undefined : null == (C = n.pathType) ? undefined : C.data,
                        offset: x,
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
            var Pe,
              we =
                (this.map.state.width &&
                  this.map.state.height && {
                    width: this.map.state.width,
                    height: this.map.state.height,
                  }) ||
                {};

            if (
              (!n.manual && module1261._center(P, this.size, we, this.left, this.top, this.right, this.bottom, n.mapDeg),
              (n.robotStatus === this.map.state.status && n.manual === this.state.manual) ||
                this.map.setState({
                  status: n.robotStatus,
                  transform: P,
                }),
              t.editAction == module1120.EditAction.Floor)
            ) {
              var Ae = this.getMapCurrentFloor(n.floorMap, n.eidtFloor, n.map);
              this.map.setState({
                floorMap: Ae,
              });
            }

            if (module390.default.isSupportIncrementalMap())
              null == (Pe = this.map) ||
                Pe.setState({
                  blockInClean: A,
                });
            if (this.map) this.map.setRectsMode(n.inCleanBlockMode);
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
            o = this.isCanBlockEdit();
          return React.default.createElement(
            module12.View,
            {
              style: [K.container, this.props.style],
            },
            React.default.createElement(
              module12.View,
              module22.default({}, module391.default.getAccessibilityLabel('map_root'), this.panResponder.panHandlers, {
                pointerEvents: this.props.pointerEvents || 'auto',
                onLayout: function (n) {
                  t.size = n.nativeEvent.layout;

                  if (t.state.map && t.state.map.height && t.state.map.width) {
                    module1261._center(t.transform, t.size, t.state.map, t.left, t.top, t.right, t.bottom, t.state.mapDeg);

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
              React.default.createElement(module1123.default, {
                transform: this.transform,
                ref: function (n) {
                  return (t.map = n);
                },
                color: module1337.map,
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
                showAsGeneralObject: this.props.showAsGeneralObject,
                showOnlyGeneralObstacles: n,
                obstaclePopBoxType: this.props.obstaclePopBoxType,
                alwaysShowFBZ: this.props.alwaysShowFBZ,
                ignoreCarpetEdited: this.props.ignoreCarpetEdited,
                zonesHasEdited: this.props.zonesHasEdited,
                cusCarpetEdited: this.props.cusCarpetEdited,
                blockCanEdit: o,
                roomBubbleMode: this.state.blockBubbleShowInfo,
                showSplitLine: this.props.editAction == module1120.EditAction.Split,
                eidtCountChange: this.props.eidtCountChange,
                showFurnitureIcon: this.props.showFurnitureIcon,
                showFurnitureOnly: this.props.showFurnitureOnly,
                mapElementShowFlag: this.props.mapElementShowFlag,
                onRectPanStart: this.props.onPanResponderStart,
                onRectPanEnd: this.props.onPanResponderEnd,
                initCliffZone: this.props.initCliffZone,
                initDoorSill: this.props.initDoorSill,
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
              o = module414.MM.mapRotateAngle[n];
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
            ? module1057.BlockBubbleShowInfo.DISPLAYNAME | module1057.BlockBubbleShowInfo.CLEANMODE | module1057.BlockBubbleShowInfo.CLEANSEQUENCE
            : module1057.BlockBubbleShowInfo.NONE;
        },
      },
      {
        key: 'getTouchPointBlockID',
        value: function (t, n) {
          var s = this.state.map.data,
            l = module1261._mapScreenToOriginXY(this.state.map, t, n),
            u = module1261._mapOriginXYToIndex(this.state.map, l.x, l.y);

          if (u < 0 || 0 == (7 & s.data[u])) return -1;
          var p = s.data[u] >>> 3;
          if (p > 0) return p;
          if (undefined === s.blockNum || s.blockNum <= 1) return -1;

          for (var h = module1261._getAroundIndexInfo(this.state.map, l.x, l.y), c = [], f = [], v = 0; v < h.length; v++) {
            var y = module23.default(h[v], 2),
              b = y[0],
              _ = y[1];
            if (0 != _ && 0 != b) c.push(b);
            if (0 == _) f.push(b);
          }

          if (c.length + f.length < h.length) return 0;

          for (var S = 1; S < c.length; S++) if (c[S] != c[S - 1]) return 0;

          return c[0];
        },
      },
      {
        key: 'canPageModeFeature',
        value: function (t, n) {
          if ('android' != module12.Platform.OS) return true;
          if (t.y2 < 0 || n.y2 < 0) return false;
          var o = Math.abs(t.y1 - n.y1 - (t.pageY1 - n.pageY1)),
            s = Math.abs(t.y2 - n.y2 - (t.pageY2 - n.pageY2));
          return !((!isNaN(o) && o >= 10) || (!isNaN(s) && s >= 10));
        },
      },
      {
        key: 'boundToTargetTrans',
        value: function (t, n, o) {
          var s = this;
          W = true;
          var l = n.x - t.x,
            u = n.y - t.y,
            p = n.xx - t.xx,
            h = 10;
          if (o) h = 1;

          for (
            var c = function (n) {
                setTimeout(function () {
                  var o = new x(t);
                  o.move((l / h) * (n + 1), (u / h) * (n + 1));
                  o.scaleTo(t.xx + (p / h) * (n + 1) || 1);
                  if (s.map)
                    s.map.setState({
                      transform: o,
                    });
                  s.transform = o;
                  if (n >= h - 1) W = false;
                }, 10 * n);
              },
              f = 0;
            f < h;
            f++
          )
            c(f);
        },
      },
      {
        key: 'moveMap',
        value: function (t, n, o) {
          var s = this,
            l = new x(this.transform),
            u = new x(this.transform);
          u.move(t, n);
          W = true;
          this.state.manual = true;
          var p = u.x - l.x,
            h = u.y - l.y,
            c = u.xx - l.xx,
            f = Math.abs(p) ** Math.abs(h),
            v = Math.ceil(f / 40);
          if (o) v = 1;
          !(function t(n) {
            setTimeout(function () {
              var o = new x(l);
              o.move((p / v) * (n + 1), (h / v) * (n + 1));
              o.scaleTo(l.xx + (c / v) * (n + 1) || 1);
              if (s.map)
                s.map.setState(
                  {
                    transform: o,
                  },
                  function () {
                    if (n < v - 1) t(n + 1);
                    s.transform = o;
                    if (n >= v - 1) W = false;
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
            s = this,
            l = new x(this.transform);
          l.moveTo(t, n);
          W = true;
          this.state.manual = true;
          if (!(null == (o = this.map)))
            o.setState(
              {
                transform: l,
              },
              function () {
                s.transform = l;
                W = false;
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
            s = this.transform.x,
            l = this.transform.y;

          if (undefined !== this.size && this.size.width && this.size.height) {
            n = (this.size.width - this.state.map.width * t.xx) / 2;
            o = (this.size.height - this.state.map.height * t.yy) / 2;
          } else {
            n = (U - this.state.map.width * t.xx) / 2;
            o = (0.67 * j - this.state.map.height * t.yy) / 2;
          }

          return {
            offsetX: n + s,
            offsetY: o + l,
          };
        },
      },
      {
        key: '_translateXY',
        value: function (t) {
          var n = arguments.length > 1 && undefined !== arguments[1] && arguments[1],
            s = this._parseMapOffset(this.transform);

          if (n || 0 == this.state.mapDeg)
            return {
              x: t.x - s.offsetX,
              y: t.y - s.offsetY,
            };

          var l = this.state.map.width * this.transform.xx,
            u = this.state.map.height * this.transform.yy,
            p = {
              x: s.offsetX + l / 2,
              y: s.offsetY + u / 2,
            },
            h = module1261._parseDegPointWithTrans(t, p, this.transform, this.state.mapDeg),
            c = module23.default(h, 2),
            f = c[0],
            v = c[1];

          return {
            x: l / 2 + f * this.transform.xx,
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

            n = {
              x: n.x / (this.transform.xx || 1),
              y: n.y / (this.transform.yy || 1),
            };
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
          return this.state.mapMode == module1265.MAP_MODE_CARPET_EDIT && this.props.subCarpetMode & module381.CarpetEditMode.CarpetIgnore;
        },
      },
      {
        key: '_singleClick',
        value: function (t) {
          if (t.x && t.y && this.map) {
            if (this.state.mapMode == module1265.MAP_MODE_CARPET_EDIT) this.handleCarpetMapClick(t);
            else this.handleGlobalCarpetClick(t);
            if (this.state.mapMode == module1265.MAP_MODE_GOTO_EDIT) this.props.parent.isGoing || this._dropTarget(t);
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
        value: function (t, n, o, s, l) {
          var u,
            p = [];
          if ((null == t ? undefined : null == (u = t.obstacles) ? undefined : u.length) > 0)
            for (
              var h = function (o) {
                  var u = t.obstacles[o];
                  if (
                    -1 !=
                    n.findIndex(function (t) {
                      return t[0] === u[0] && t[1] === u[1] && t[2] === u[2];
                    })
                  )
                    return 'continue';

                  if (module390.default.isFwFilterObstacleSupported()) {
                    var h = module1261._offset(u[0] / 50, u[1] / 50, s),
                      c = u.concat();

                    c.splice(3, 0, h.x, h.y);
                    p.push(c);
                    return 'continue';
                  }

                  var f = false;
                  if (l && l.x && l.y && Math.sqrt((50 * l.x - u[0]) ** 2 + (50 * l.y - u[1]) ** 2) <= 300) return 'continue';

                  for (var v = o + 1; v < t.obstacles.length; v++) {
                    var y = t.obstacles[v];

                    if (Math.sqrt((y[0] - u[0]) ** 2 + (y[1] - u[1]) ** 2) <= 300) {
                      f = true;
                      break;
                    }
                  }

                  if (f) return 'continue';

                  var b = module1261._offset(u[0] / 50, u[1] / 50, s),
                    _ = u.concat();

                  _.splice(3, 0, b.x, b.y);

                  p.push(_);
                },
                c = 0;
              c < t.obstacles.length;
              c++
            )
              h(c);
          p = (p = p.filter(function (t) {
            if (!o.data || !o.data.data) return true;

            var n = t[3],
              s = t[4],
              l = module1261._mapScreenXYToIndex(o, n, s),
              u = module1261._mapScreenToOriginXY(o, n, s),
              p = module1261._getAroundIndexInfo(o, u.x, u.y, 2),
              h = 0;

            p.forEach(function (t) {
              if (0 == t[1]) h++;
            });
            return 0 != (7 & o.data.data[l]) || h != p.length;
          })).sort(function (t, n) {
            return n[1] - t[1];
          });
          return p;
        },
      },
      {
        key: 'decodeMachineFBZ',
        value: function (t, n) {
          var o = n || this.state.map;
          if (!o) return {};

          for (var s = this._mapOffsetToSlam(o), l = [], u = [], p = 0; p < t.length / 2; p++) {
            var h = t[2 * p],
              c = t[2 * p + 1];
            l.push(h - s.x);
            u.push(s.y - c);
          }

          var f = Math.sqrt((l[0] - l[3]) ** 2 + (u[0] - u[3]) ** 2),
            v = Math.sqrt((l[0] - l[1]) ** 2 + (u[0] - u[1]) ** 2),
            y = (l[0] + l[2]) / 2,
            b = (u[0] + u[2]) / 2,
            _ = y - v / 2,
            S = b - f / 2,
            M = (l[1] + l[2]) / 2,
            k = (u[1] + u[2]) / 2;

          return {
            rectSize: {
              x: _,
              y: S,
              width: v,
              height: f,
            },
            slopeAngle: (k - b) ** (M - y),
          };
        },
      },
      {
        key: 'parseWalls',
        value: function (t, n) {
          var o;

          if ((null == t ? undefined : null == (o = t.walls) ? undefined : o.length) > 0) {
            for (var s = new Array(), l = 0; l < t.walls.length; l++) {
              var u = t.walls[l],
                p = module1261._offset(u[0], u[1], n),
                h = module1261._offset(u[2], u[3], n);

              s.push({
                start: p,
                end: h,
              });
            }

            return s;
          }

          return null;
        },
      },
      {
        key: 'parseFBZS',
        value: function (t, n) {
          var o,
            s = arguments.length > 2 && undefined !== arguments[2] && arguments[2],
            u = arguments.length > 3 && undefined !== arguments[3] && arguments[3];

          if ((null == t ? undefined : null == (o = t.fbzs) ? undefined : o.length) > 0) {
            for (var p = new Array(), h = 0; h < t.fbzs.length; h++) {
              var c = t.fbzs[h],
                f = this.decodeMachineFBZ(c, n);
              if (s)
                module22.default(f, {
                  id: h,
                });
              if (u)
                module22.default(f, {
                  data: c,
                });
              p.push(f);
            }

            return p;
          }

          return null;
        },
      },
      {
        key: 'parseFurnitures',
        value: function (t, o) {
          var s;
          if (!t || t == {} || !t.num || !t.data) return null;
          var l,
            u = t.data.length > 0 ? t.data.concat() : [];
          if ((null == (s = t.hide) ? undefined : s.length) > 0)
            (((null == (l = t.hide) ? undefined : l.length) == t.num && 0 == u.length) || module394.MC.showAllFurnitureModel) && u.push.apply(u, module31.default(t.hide));
          if (!u.length) return null;

          for (var p = new Array(), h = 0; h < u.length; h++) {
            var c,
              f,
              v = u[h],
              y = v.slice(0, 8),
              b = this.decodeMachineFBZ(y, o);

            if ((null == b ? undefined : null == (c = b.rectSize) ? undefined : c.width) && (null == b ? undefined : null == (f = b.rectSize) ? undefined : f.height)) {
              b.percent = v[8];
              b.type = v[9];
              b.subType = v[10];
              b.edited = v[11];
              b.id = v[12];
              b.direction = v[13];
              p.push(b);
            }
          }

          return p;
        },
      },
      {
        key: 'parseStuckPoints',
        value: function (t, n) {
          var o;

          if ((null == t ? undefined : null == (o = t.data) ? undefined : o.length) > 0) {
            for (var s = [], l = 0; l < t.data.length; l++) {
              var u = t.data[l],
                p = module1261._offset(u[0], u[1], n);

              s.push(
                F(
                  F({}, p),
                  {},
                  {
                    times: u[2],
                    data: u,
                  }
                )
              );
            }

            return s;
          }

          return null;
        },
      },
      {
        key: 'parseDoorSills',
        value: function (t, n, o) {
          var s,
            u = arguments.length > 3 && undefined !== arguments[3] ? arguments[3] : 0;

          if ((null == t ? undefined : null == (s = t.fbzs) ? undefined : s.length) > 0) {
            for (var p = new Array(), h = 0; h < t.fbzs.length; h++) {
              var c = t.fbzs[h],
                f = this.decodeMachineFBZ(c, n);
              module22.default(f, {
                id: h + u,
                type: o,
                data: c,
              });
              p.push(f);
            }

            return p;
          }

          return [];
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
            var s = this._mapOffsetToSlam(this.state.map),
              l = s.x + t.x,
              u = s.y - (t.y + t.height),
              p = t.width,
              h = t.height,
              c = [l, l + p, l + p, l],
              f = [u + h, u + h, u, u],
              v = l + 0.5 * p,
              y = u + 0.5 * h,
              b = 0;
            b < c.length;
            b++
          ) {
            var _ = n,
              S = c[b] - v,
              M = f[b] - y,
              k = M ** S,
              C = module1261._regularAngle(k - _),
              B = Math.sqrt(S * S + M * M);

            c[b] = B * Math.cos(C) + v;
            f[b] = B * Math.sin(C) + y;
            c[b] = parseInt((50 * c[b]).toFixed());
            f[b] = parseInt((50 * f[b]).toFixed());
            o.push(c[b]);
            o.push(f[b]);
          }
        },
      },
      {
        key: '_getSinglePointParam',
        value: function (t, n) {
          var o = this._mapOffsetToSlam(this.state.map),
            s = o.x + t.x,
            l = o.y - t.y;

          n.push(parseInt((50 * s).toFixed()));
          n.push(parseInt((50 * l).toFixed()));
        },
      },
      {
        key: '_checkSutckPtNearFbzs',
        value: function (t) {
          var n = this.state.fbzs;
          if (!n || !n.fbzs || !n.fbzs.length) return false;

          for (
            var o = this._mapOffsetToSlam(this.state.map),
              s = {
                x: t.x + o.x,
                y: o.y - t.y,
              },
              l = 0;
            l < n.fbzs.length;
            l++
          ) {
            var u = n.fbzs[l];
            if (module1261._boxCircleIntersect(u, s, 20)) return [u, this.decodeMachineFBZ(u)];
          }

          return null;
        },
      },
      {
        key: '_filterStuckNearbyFbz',
        value: function (t, n) {
          if (t && t != {} && t.num && t.fbzs && t.fbzs.length) {
            for (var o = -1, s = 0; s < t.fbzs.length; s++) {
              var l = t.fbzs[s];

              if (
                l.length === n.length &&
                l.every(function (t, o) {
                  return t === n[o];
                })
              ) {
                o = s;
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
            n = null == (t = this.map) ? undefined : t.getVisibleRectZones();
          if (!n || n.length <= 0) return null;

          for (var o = [], s = 0; s < n.length; s++) {
            var l = n[s].state.rectSize;
            if (module1261._isVerticalRotate((180 * n[s].state.slopeAngle) / Math.PI)) l = this._getVerticalZoneRect(l);
            var u = this.state.map.left + l.x,
              p = this.state.map.top + this.state.map.height - (l.y + l.height),
              h = u + l.width,
              c = p + l.height;
            u = 50 * parseInt(u.toFixed());
            p = 50 * parseInt(p.toFixed());
            h = 50 * parseInt(h.toFixed());
            c = 50 * parseInt(c.toFixed());
            o.push([u, p, h, c]);
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
            s = this;
          if (!this.map) return [];

          for (var l = null == (t = this.map) ? undefined : t.getVisibleFBZZones(), u = [], p = 0; p < l.length; p++) {
            var h = [];
            if (l[p].state.type == module1057.FbzType.FBZ_TYPE_REGULAR) h.push(0);
            else if (l[p].state.type == module1057.FbzType.FBZ_TYPE_MOPPING) h.push(2);
            else if (l[p].state.type == module1057.FbzType.FBZ_TYPE_CLEANING) h.push(3);

            this._getSingleFBZoneParams(l[p].state.rectSize, l[p].state.slopeAngle, h);

            u.push(h);
          }

          var c = null == (n = this.map) ? undefined : n.getEditAIFBZPoint();

          for (p = 0; p < c.length; p++) {
            var f = [4];

            this._getSinglePointParam(c[p], f);

            u.push(f);
          }

          var v = null == (o = this.map) ? undefined : o.getEditCliffZones();
          if ((null == v ? undefined : v.length) >= 0)
            v.forEach(function (t) {
              var n = [0];

              s._getSingleFBZoneParams(t.rectSize, t.slopeAngle, n);

              u.push(n);
            });
          return u;
        },
      },
      {
        key: 'getCliffZones',
        value: function () {
          var t,
            n = this,
            o = null == (t = this.map) ? undefined : t.getNoEditCliffZones(),
            s = [];
          if ((null == o ? undefined : o.length) >= 0)
            o.forEach(function (t) {
              var o = [1];

              n._getSingleFBZoneParams(t.rectSize, t.slopeAngle, o);

              s.push(o);
            });
          return s;
        },
      },
      {
        key: 'getCarpetZonesParams',
        value: function (t) {
          var n,
            o = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : -1;
          if (!this.map) return [];
          var s = null == (n = this.map) ? undefined : n.getVisibleCarpetZones(t);
          if (-1 != o)
            s = s.filter(function (t) {
              return t.state.id != o;
            });

          for (var l = [], u = 0; u < s.length; u++) {
            var p = [];

            this._getSingleFBZoneParams(s[u].state.rectSize, s[u].state.slopeAngle, p);

            l.push(p);
          }

          return l;
        },
      },
      {
        key: 'getEditFurnitureParams',
        value: function () {
          var t, n;
          if (!this.map) return [];

          for (var o = null == (t = this.map) ? undefined : t.getEditFurnitures(), s = [], l = 0; l < o.length; l++) {
            var u = [];
            u.push(1);
            var p = o[l].id > 0 ? o[l].id : -1;
            u.push(p);

            this._getSingleFBZoneParams(o[l].rectSize, o[l].slopeAngle, u);

            u.push(o[l].type);
            u.push(o[l].subType);
            u.push(o[l].direction);
            s.push(u);
          }

          var h = null == (n = this.map) ? undefined : n.getDeleteFurnitures();

          for (l = 0; l < h.length; l++) {
            var c = [];
            c.push(0);
            c.push(h[l]);
            s.push(c);
          }

          return s;
        },
      },
      {
        key: 'getAllFurnitureParams',
        value: function () {
          var t;
          if (!this.map) return [];

          for (var n = null == (t = this.map) ? undefined : t.getAllFurnitures(), o = [], s = 0; s < n.length; s++) {
            var l = [];

            this._getSingleFBZoneParams(n[s].rectSize, n[s].slopeAngle, l);

            l.push(n[s].type);
            o.push(l);
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

          for (var n = null == (t = this.map) ? undefined : t.getAllDoorSills(), o = [], s = 0; s < n.length; s++)
            if (!n[s].type || n[s].type != module1057.DoorSillType.SmartSill) {
              var l = [];

              this._getSingleFBZoneParams(n[s].rectSize, n[s].slopeAngle, l);

              o.push(l);
            }

          return o;
        },
      },
      {
        key: 'getAllSmartDoorSillParams',
        value: function () {
          var t;
          if (!this.map) return [];

          for (var n = null == (t = this.map) ? undefined : t.getAllDoorSills(), o = [], s = 0; s < n.length; s++) {
            if (!n[s].type) n[s].type = module1057.DoorSillType.RealSill;
            var l = [n[s].type];

            this._getSingleFBZoneParams(n[s].rectSize, n[s].slopeAngle, l);

            o.push(l);
          }

          return o;
        },
      },
      {
        key: 'getWallsParams',
        value: function () {
          var t;
          if (!this.map) return [];

          for (var n = null == (t = this.map) ? undefined : t.getVisibleWalls(), o = this._mapOffsetToSlam(this.state.map), s = [], l = 0; l < n.length; l++) {
            var u = [];
            u.push(1);

            for (
              var p = [o.x + n[l].state.position.start.x, o.y - n[l].state.position.start.y, o.x + n[l].state.position.end.x, o.y - n[l].state.position.end.y], h = 0;
              h < p.length;
              h++
            )
              u.push(parseInt((50 * p[h]).toFixed()));

            s.push(u);
          }

          return s;
        },
      },
      {
        key: 'getMapCurrentFloor',
        value: function (t, n, o) {
          var s = module22.default({}, t);

          if (this.props.editAction == module1120.EditAction.Floor && n && Object.keys(n).length > 0) {
            var u,
              p = {},
              h = {
                data: [],
              };
            Object.keys(n).forEach(function (t) {
              p[t] = n[t][0];
              if (n[t].length > 1) h.data.push([parseInt(t), n[t][1]]);
            });
            if ((null == (u = t.direction) ? undefined : u.length) > 0)
              t.direction.forEach(function (t) {
                if (
                  -1 ==
                  h.data.findIndex(function (n) {
                    return n[0] == t[0];
                  })
                )
                  h.data.push(t);
              });
            var c = module22.default(s.data.concat(), p),
              f = {
                width: o.width,
                height: o.height,
                top: o.top + 0.5 - o.data.top,
                left: o.left + 0.5 - o.data.left,
              },
              v = module1401.convertFloorDataToImage(c, f, o.data, h);
            s.image = v;
          }

          return s;
        },
      },
      {
        key: 'getSplitParams',
        value: function () {
          if (!this.map || this.props.editAction != module1120.EditAction.Split) return null;
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
          var s = this.state.map.left + t.right.x,
            l = this.state.map.top + this.state.map.height - t.right.y;
          s = 50 * s.toFixed();
          l = 50 * l.toFixed();
          var u = [this.map.blockOp.inAction.currentSplitBlock, n, o, s, l];
          console.warn('split paras:' + u);
          return {
            info: u,
          };
        },
      },
      {
        key: 'addRectangle',
        value: function () {
          var t = this,
            n = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : null;
          if (this.onLayouted) return this.map && this.map.addRectangle(n);
          else {
            this.waitForAddRect = true;
            this.layoutDelayBlocks.push(function () {
              if (t.map) t.map.addRectangle(n);
              t.waitForAddRect = false;
            });
            return true;
          }
        },
      },
      {
        key: 'addRectangleArray',
        value: function (t) {
          var n,
            o = this;
          if (this.onLayouted) return null == (n = this.map) ? undefined : n.addRectangleArray(t);
          else {
            this.waitForAddRect = true;
            this.layoutDelayBlocks.push(function () {
              var n;
              if (!(null == (n = o.map))) n.addRectangleArray(t);
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
          return null == (t = this.map) ? undefined : t.isFBZReachMaxNum(module1057.FbzType.FBZ_TYPE_REGULAR);
        },
      },
      {
        key: 'isMoppingFBZReachMaxNum',
        value: function () {
          var t;
          return null == (t = this.map) ? undefined : t.isFBZReachMaxNum(module1057.FbzType.FBZ_TYPE_MOPPING);
        },
      },
      {
        key: 'isCleanFBZReachMaxNum',
        value: function () {
          var t;
          return null == (t = this.map) ? undefined : t.isFBZReachMaxNum(module1057.FbzType.FBZ_TYPE_CLEANING);
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
          if (!(null == (t = this.map))) t.addFBZoneNew(module1057.FbzType.FBZ_TYPE_REGULAR);
        },
      },
      {
        key: 'addMoppingFBZone',
        value: function () {
          var t;
          if (!(null == (t = this.map))) t.addFBZoneNew(module1057.FbzType.FBZ_TYPE_MOPPING);
        },
      },
      {
        key: 'addCleaningFBZone',
        value: function () {
          var t;
          if (!(null == (t = this.map))) t.addFBZoneNew(module1057.FbzType.FBZ_TYPE_CLEANING);
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
            s = arguments.length > 2 && undefined !== arguments[2] ? arguments[2] : null;
          if (!(null == (o = this.map))) o.addFurniture(t, n, s);
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
            mapMode: module1265.MAP_MODE_GOTO_EDIT,
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
            mapMode: module1265.MAP_MODE_ZONED_CLEAN_EDIT,
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
            s = this;
          if (!(null == (n = (o = this.props).resetAllCarpetStatus)))
            n.call(o, function () {
              var n;

              if (t) {
                t = s._translateXY(t);
                if (!(null == (n = s.map))) n.addCarpetFBZoneByClick(t);
              }
            });
        },
      },
      {
        key: 'handleGlobalCarpetClick',
        value: function (t) {
          var n;

          if (this.map && this.state.showCarpetBubbles) {
            t = this._translateXY(t);
            if (
              !(
                (null == (n = this.map) ? undefined : n.handleShowSmartZoneBubble(t, this.props.showAllComponetBubble)) ||
                this.map.handleShowFurnitureBubble(t, this.props.showAllComponetBubble)
              )
            )
              module414.MM.hasCarpetMap && this.map.handleShowCarpetBubble(t, this.props.showAllComponetBubble);
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
            var n = module1057.BlockBubbleShowInfo.DISPLAYNAME | module1057.BlockBubbleShowInfo.CLEANSEQUENCE,
              o = module1057.BlockBubbleShowInfo.DISPLAYNAME | module1057.BlockBubbleShowInfo.CLEANSEQUENCE | module1057.BlockBubbleShowInfo.CLEANMODE;
            if (this.props.showAllBlocksBubble && !module390.default.isCustomModeIconSupported()) o = n;
            if (t == G.Global_Clean)
              this.setState({
                inBlockMode: false,
                inCleanBlockMode: 0,
                mapMode: module1265.MAP_MODE_REGULAR,
                blockBubbleShowInfo: n,
                showCarpetBubbles: true,
              });
            else if (t == G.Segment_Clean_Read_Only) {
              this.setState({
                inCleanBlockMode: 1,
                mapMode: module1265.MAP_MODE_REGULAR,
                blockBubbleShowInfo: n,
                showCarpetBubbles: false,
              });
              this.resetSelectBlocks();
            } else if (t == G.Segment_Clean_Edit)
              this.setState({
                inCleanBlockMode: 2,
                mapMode: module1265.MAP_MODE_BLOCK_CLEAN_EDIT,
                blockBubbleShowInfo: n,
                showCarpetBubbles: false,
              });
            else if (t == G.Zone_Clean_Read_Only) {
              this.clearRectFocus();
              this.setState({
                inBlockMode: false,
                inCleanBlockMode: 4,
                mapMode: module1265.MAP_MODE_REGULAR,
                blockBubbleShowInfo: module1057.BlockBubbleShowInfo.NONE,
                showCarpetBubbles: false,
              });
            } else if (t == G.Zone_Clean_Edit)
              this.setState({
                inBlockMode: false,
                inCleanBlockMode: 3,
                mapMode: module1265.MAP_MODE_ZONED_CLEAN_EDIT,
                blockBubbleShowInfo: module1057.BlockBubbleShowInfo.NONE,
                showCarpetBubbles: true,
              });
            else if (t == G.Global_Clean_With_Clean_Type)
              this.setState({
                inCleanBlockMode: 0,
                mapMode: module1265.MAP_MODE_REGULAR,
                blockBubbleShowInfo: o,
                showCarpetBubbles: true,
              });
            else if (t == G.Segment_Clean_Edit_With_Clean_Type)
              this.setState({
                inCleanBlockMode: 2,
                mapMode: module1265.MAP_MODE_BLOCK_CLEAN_EDIT,
                blockBubbleShowInfo: o,
                showCarpetBubbles: false,
              });
            else if (t == G.Segment_Clean_Read_Only_With_Clean_Type) {
              this.setState({
                inCleanBlockMode: 1,
                mapMode: module1265.MAP_MODE_REGULAR,
                blockBubbleShowInfo: o,
                showCarpetBubbles: false,
              });
              this.resetSelectBlocks();
            } else if (t == G.Segment_Clean_Sequential_Edit_With_Clean_Type)
              this.setState({
                inCleanBlockMode: 2,
                mapMode: module1265.MAP_MODE_BLOCK_CLEAN_EDIT,
                blockBubbleShowInfo: o,
                showCarpetBubbles: false,
              });
            else if (t == G.Segment_Clean_Sequential_Read_Only_With_Clean_Type) {
              this.setState({
                inCleanBlockMode: 1,
                mapMode: module1265.MAP_MODE_REGULAR,
                blockBubbleShowInfo: o,
                showCarpetBubbles: false,
              });
              this.resetSelectBlocks();
            } else if (t == G.Segment_Clean_Sequential_Edit)
              this.setState({
                inBlockMode: true,
                inCleanBlockMode: 0,
                mapMode: module1265.MAP_MODE_MAP_EDIT,
                hideAccessory: true,
                blockBubbleShowInfo: module1057.BlockBubbleShowInfo.CLEANSEQUENCE,
              });
            else if (t == G.Segment_Clean_Sequential_Read_Only) {
              this.setState({
                inCleanBlockMode: 1,
                mapMode: module1265.MAP_MODE_REGULAR,
                blockBubbleShowInfo: o,
              });
              this.resetSelectBlocks();
            }
          }
        },
      },
      {
        key: 'setHighlightSegments',
        value: function (t) {
          for (var n = [], o = 0; o < 32; o++) n.push(0);

          for (var s = 0; s < t.length; s++) {
            n[t[s]] = 1;
          }

          this.blockSequenceList = t;
          this.setState({
            selectBlockList: n,
            blockSequenceListReadOnly: t,
          });
        },
      },
      {
        key: 'isCanBlockEdit',
        value: function () {
          return this.state.inBlockMode || 2 == this.state.inCleanBlockMode;
        },
      },
      {
        key: 'isNoBlockSelected',
        value: function () {
          if (undefined === this.state.selectBlockList) return true;

          for (var t = 0; t < this.state.selectBlockList.length; t++) if (0 != this.state.selectBlockList[t]) return false;

          return true;
        },
      },
      {
        key: 'resetSelectBlocks',
        value: function () {
          var t, n;

          if (((this.blockSequenceList = []), !this.isNoBlockSelected())) {
            for (var o = [], s = 0; s < 32; s++) o.push(0);

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
          var n, o, s, l, u, p;

          if (this.isCanBlockEdit()) {
            var h = this.state.selectBlockList;
            h[t] = 1 - h[t];

            for (var c = 0; c < h.length; c++) {
              if (1 == h[c]) {
                var f = c + '';
                if (undefined === this.state.map.mapList[f]) h[c] = 0;
              }
            }

            if (1 == h[t]) this.blockSequenceList.push(t);
            else
              for (var v = 0; v < this.blockSequenceList.length; v++)
                if (this.blockSequenceList[v] == t) {
                  this.blockSequenceList.splice(v, 1);
                  break;
                }
            this.setState({
              selectBlockList: h,
              blockSequenceListReadOnly: this.blockSequenceList,
            });
            if (1 == h[t] && 1 == this.blockSequenceList.length) null == (n = (o = this.props).didTapBlockInCustomMode) || n.call(o, t);
            if (!(null == (s = (l = this.props).selectedBlocksDidChange))) s.call(l, this.blockSequenceList);
            if (!(null == (u = (p = this.props).didTapBlockInCustomOrder))) u.call(p, t);
            V = true;
          } else V = true;
        },
      },
      {
        key: 'getRoomNameListInMap',
        value: function () {
          var t, n;

          if (
            !('android' == module12.Platform.OS && module393.MiApiLevel < module393.androidRoomApiLevel && module393.isMiApp) &&
            !module391.default.isShareUser() &&
            (this.checkAppVersion() || !module393.isMiApp)
          ) {
            var o = module414.MM.roomNameMapping,
              s = module414.MM.roomNameList;

            if (null != o && null != s) {
              for (var l = [], u = [], p = [], h = 0; h < 32; h++) l.push([-1, -1]);

              for (var c = 0; c < o.length; c++) {
                var f = o[c][0];
                p.push(f);
                l[f][0] = parseInt(o[c][1]);
                if (3 == o[c].length) l[f][2] = o[c][2];
              }

              for (var v = 0; v < s.length; v++)
                for (var b = s[v].name, _ = s[v].roomId, S = 0; S < l.length; S++)
                  if (_ == l[S][0]) {
                    l[S][1] = b;
                    break;
                  }

              for (var M = 0; M < 32; M++) u.push('');

              var C = null == (t = module414.MM.mapData) ? undefined : null == (n = t.map) ? undefined : n.colorData,
                E = module414.MM.allServerNames || [];
              if (C && C.length > 0) for (var P = 0; P < C.length; P++) C[P] > 0 && -1 == p.indexOf(P) && (u[P] = this.getDefaultRoomName(E, u));
              this.setState({
                roomNameList: l,
                defaultNameList: u,
              });
            }
          }
        },
      },
      {
        key: 'getDefaultRoomName',
        value: function (t, n) {
          for (var o = module505.default_room_name, s = 1, l = '' + o + s; (-1 != t.indexOf(l) || -1 != n.indexOf(l)) && ((l = '' + o + s), 20 != ++s); );

          return l;
        },
      },
      {
        key: 'checkAppVersion',
        value: function () {
          return module393.apiLevel >= 146;
        },
      },
      {
        key: 'getCurrentSelectBlock',
        value: function () {
          var t = [];
          if (undefined !== this.state.selectBlockList) for (var n = 0; n < this.state.selectBlockList.length; n++) 0 != this.state.selectBlockList[n] && t.push(n);
          return t;
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
            var o, s, l;
            if (
              (null == (o = this.state.map) ? undefined : o.centerInfo) &&
              (null == (s = this.state.map) ? undefined : null == (l = s.centerInfo[t[n]]) ? undefined : l.count) > 3
            )
              return true;
          }

          return false;
        },
      },
      {
        key: 'setSingleCleanMopMode',
        value: function (t, n, o, s) {
          var l = this.state.roomModeList,
            u = l;
          if (
            !l.find(function (n) {
              return n.id == t;
            })
          )
            u.push({
              id: t,
              cleanMode: n,
              waterMode: o,
              mopMode: s,
            });
          else
            u = l.map(function (l) {
              if (l.id == t) {
                l.cleanMode = n;
                l.waterMode = o;
                l.mopMode = s;
                l.mopTemplateId = null == l ? undefined : l.mop_template_id;
              }

              return l;
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
          var s = arguments.length > 3 && undefined !== arguments[3] ? arguments[3] : 0,
            l = arguments.length > 4 && undefined !== arguments[4] && arguments[4],
            u = this.state.roomNameList || [];
          u[t][1] = n;
          u[t][0] = o;
          u[t][2] = s;

          for (var p = 0; p < u.length; p++) p != t && u[p][1] == n && ((u[p][0] = -1), (u[p][1] = -1));

          var h = this.state.defaultNameList || [];

          if (l) {
            var c = module414.MM.allServerNames || [],
              f = h.indexOf(n);
            if (-1 != f) h[f] = this.getDefaultRoomName(c, h);
          }

          this.setState({
            roomNameList: u,
            defaultNameList: h,
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
        key: 'setCleanSequence',
        value: function (t) {
          var n = arguments.length > 1 && undefined !== arguments[1] && arguments[1];

          if (undefined !== t) {
            this.setState({
              blockSequenceInfo: t,
            });
            if (n) this.blockSequenceList = t;
          }
        },
      },
      {
        key: 'getSelectBlockFromSeqArray',
        value: function (t) {
          for (var n = [], o = 0; o < 32; o++) n.push(0);

          if (undefined !== t) for (var s = 0; s < t.length; s++) n[t[s]] = 1;
          return n;
        },
      },
      {
        key: 'resetOrderEdit',
        value: function (t) {
          var n = this.getSelectBlockFromSeqArray(t);
          this.blockSequenceList = t;
          this.setState({
            selectBlockList: n,
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
    ]);
    return q;
  })(React.default.Component);

exports.MapView = H;
H.defaultProps = {
  alwaysShowFBZ: false,
  showAsGeneralObject: false,
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
var K = module12.StyleSheet.create({
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
