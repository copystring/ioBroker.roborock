var module23 = require('@babel/runtime/helpers/slicedToArray'),
  module50 = require('./50'),
  module22 = require('./22'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1332 = require('./1332'),
  module1390 = require('./1390'),
  module1392 = require('./1392'),
  module1487 = require('./1487'),
  module391 = require('./391'),
  module418 = require('./418'),
  module1329 = require('./1329'),
  module390 = require('./390'),
  module394 = require('./394'),
  module381 = require('./381');

function A(t, o) {
  var n = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(t);
    if (o)
      s = s.filter(function (o) {
        return Object.getOwnPropertyDescriptor(t, o).enumerable;
      });
    n.push.apply(n, s);
  }

  return n;
}

function O(t) {
  for (var o = 1; o < arguments.length; o++) {
    var n = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      A(Object(n), true).forEach(function (o) {
        module50.default(t, o, n[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(n));
    else
      A(Object(n)).forEach(function (o) {
        Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(n, o));
      });
  }

  return t;
}

function R() {
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
  module500 = require('./500').strings,
  module1430 = require('./1430').isRRSurface,
  module393 = require('./393'),
  module1402 = require('./1402'),
  module1332 = require('./1332'),
  module1153 = require('./1153'),
  module1431 = require('./1431').Palette,
  z = {
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

exports.MapModelInCleanMode = z;

var W = false,
  Y = 'android' != module12.Platform.OS || module393.systemMemorySize > 5e3,
  q = module12.Dimensions.get('window'),
  j = q.height,
  U = q.width,
  X = true,
  H = false,
  V = (function (t) {
    module7.default(q, t);

    var module50 = q,
      A = R(),
      F = function () {
        var t,
          o = module11.default(module50);

        if (A) {
          var n = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, n);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function q(t) {
      var o;
      module4.default(this, q);
      (o = F.call(this, t)).top = o.props.hasOwnProperty('top') ? o.props.top : module1153.StatusBarHeight + module1153.AppBarHeight;
      o.bottom = o.props.hasOwnProperty('bottom') ? o.props.bottom : 0;
      o.left = o.props.hasOwnProperty('left') ? o.props.left : 0;
      o.right = o.props.hasOwnProperty('right') ? o.props.right : 0;
      o.size = o.props.hasOwnProperty('initSize') ? o.props.initSize : {};
      o.last = {};
      o.touch = {
        start: {},
        end: {},
        move: {},
        interval: -1,
        lastMovedTimestamp: null,
      };
      o.longPressStart = false;
      o.longPressCanceled = false;
      o.targetDroped = false;
      o.transform = new x();
      o.scaleMin = o.props.scaleMin || 1;
      o.scaleMax = o.props.scaleMax || 5;
      o.lastMapMode = z.Global_Clean;
      o.blockSequenceList = t.blockSequenceInfo || [];
      var n = o.getSelectBlockFromSeqArray(o.blockSequenceList);
      o.onLayouted = false;
      o.layoutDelayBlocks = [];
      o.mapInitialScaled = false;
      o.state = {
        charger: t.charger,
        map: t.map || {
          left: module1332.Config.center.x - module1332.EMPTY_MAP_WIDTH / 2,
          top: module1332.Config.center.y - module1332.EMPTY_MAP_HEIGHT / 2,
          width: module1332.EMPTY_MAP_WIDTH,
          height: module1332.EMPTY_MAP_HEIGHT,
        },
        path: t.path,
        robotStatus: 'Unknown',
        manual: false,
        mapMode: t.mapMode || module1153.MAP_MODE_REGULAR,
        showGotoTips: true,
        labEnabled: false,
        inBlockMode: t.inBlockMode || false,
        inCleanBlockMode: 0,
        selectBlockList: n,
        showPath: true,
        roomNameList: [],
        defaultNameList: [],
        hideAccessory: t.hideAccessory || false,
        blockBubbleShowInfo: o.initBlockBubbleFlag(t) || module1332.BlockBubbleShowInfo.NONE,
        roomModeList: [],
        blockSequenceListReadOnly: [],
        blockSequenceInfo: t.blockSequenceInfo || [],
        showCarpetBubbles: t.showAllComponetBubble || false,
        mapDeg: o.initMapDeg(t) || 0,
        mapInPan: false,
        eidtFloor: {},
      };
      return o;
    }

    module5.default(q, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          var t = this;
          this.roomNameListener = this.specialEventListener = module12.DeviceEventEmitter.addListener(module418.NotificationKeys.DidReceiveSpecialEvent, function (o) {
            if (o.data == module418.EventKeys.RoomNameMappingDidReceive && t.props.editAction != module1390.EditAction.Name) t.getRoomNameListInMap();
          });
          this.panResponder = module12.PanResponder.create({
            onStartShouldSetPanResponder: function () {
              return 0 != X;
            },
            onMoveShouldSetPanResponder: function () {
              return false;
            },
            onPanResponderStart: function (o, n) {
              if (!(null == t.props.onPanResponderStart)) t.props.onPanResponderStart();
              t.setState({
                mapInPan: true,
              });
              t.touch.move = module1402._parseEvent(o.nativeEvent) || {};
              t.touch.page =
                {
                  x: o.nativeEvent.pageX,
                  y: o.nativeEvent.pageY,
                } || {};
              t.touch.interval =
                (1 == o.nativeEvent.touches.length && t.touch.move.timestamp && t.touch.start.timestamp && (t.touch.move.timestamp - t.touch.start.timestamp || 1)) || -1;
              t.touch.start = t.touch.move;

              t._handleLongPressStart(t.touch.start);
            },
            onPanResponderEnd: function (o, n) {
              var s;
              if (
                (null == t.props.onPanResponderEnd || t.props.onPanResponderEnd(),
                t.setState({
                  mapInPan: false,
                }),
                null == (s = t.map) ||
                  s.setState({
                    mapPanStatus: module1332.PanStatus.MAP_VIEWING_FIT,
                  }),
                1 != W &&
                  (t.disableAddingMode(),
                  t.longPressStart ? t._handleLongPressEnd() : t._handleLongPressCancel(),
                  (t.touch.end = module1402._parseEvent(o.nativeEvent)),
                  t.touch.start.timestamp && t.touch.end && t.touch.end.timestamp))
              )
                if (!(t.touch.end.timestamp - t.touch.start.timestamp + t.touch.interval > module1332.Config.click) && t.touch.interval > 0) {
                  if (t.touch.interval > 0 && t.state.mapMode != module1153.MAP_MODE_MAP_EDIT && t.state.mapMode != module1153.MAP_MODE_CARPET_EDIT) {
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
                        transform: module1402._center(t.transform, t.size, l, t.left, t.top, t.right, t.bottom, t.state.mapDeg),
                      });
                  }
                } else if (
                  !t.touch.lastMovedTimestamp ||
                  (t.touch.end.timestamp - t.touch.start.timestamp < 200 && new Date().getTime() - t.touch.lastMovedTimestamp > 200) ||
                  (Math.abs(t.touch.start.x - t.touch.move.x) < 5 && Math.abs(t.touch.start.y - t.touch.move.y) < 5)
                )
                  if ((t._mapSingleClickHandle(t.touch.start), t.isCanBlockEdit())) {
                    if (!t.map || !t.state.map) return;
                    if (undefined === t.state.map.data || undefined === t.state.map.data.data) return;
                    X = false;

                    var p = {
                        x: module12.I18nManager.isRTL ? t.size.width - t.touch.move.x : t.touch.move.x,
                        y: t.touch.move.y,
                      },
                      h = t._translateXY(p),
                      u = h.x / t.transform.xx,
                      c = h.y / t.transform.yy,
                      f = t.getTouchPointBlockID(u, c);

                    if (f <= 0) {
                      if (0 == f) {
                        if (!(null == t.props.didTapWhenNoBlock)) t.props.didTapWhenNoBlock();
                        if (!t.props.didTapWhenNoBlock) globals.showToast(module500.mainpage_unknown_segment_click_tips);
                      }

                      return void (X = true);
                    }

                    t.changeBlockState(f);
                  } else {
                    var v;
                    if (!(null == (v = t.map))) v.clearRectFocus();
                    t.clearAllFBZEditFocus();
                    t.clearAllFurnitureFocus();
                    if (module12.I18nManager.isRTL) {
                      if (t.size && t.size.width)
                        t._singleClick({
                          x: t.size.width - t.touch.start.x,
                          y: t.touch.start.y,
                        });
                    } else t._singleClick(t.touch.start);
                  }
            },
            onPanResponderMove: function (o, n) {
              var s;
              if ((t._handleLongPressCancel(), 1 != W))
                if (
                  (t.map && t.map.clearRectFocus(),
                  null == t.clearAllFBZEditFocus || t.clearAllFBZEditFocus(),
                  t.props.shouldShowRobotMovingAnimation && t.clearAllMarkFocus(),
                  (t.state.manual = true),
                  !t.map || (t.map.state.width && t.map.state.height))
                ) {
                  var l = [module1402._parseEvent(o.nativeEvent), t.touch.move],
                    p = l[0],
                    h = l[1];

                  if (
                    p &&
                    undefined !== o.nativeEvent.pageX &&
                    undefined !== o.nativeEvent.pageY &&
                    undefined !== t.touch &&
                    undefined !== t.touch.page &&
                    undefined !== t.touch.page.x &&
                    undefined !== t.touch.page.y
                  ) {
                    var u = Math.abs(p.x - h.x - (o.nativeEvent.pageX - t.touch.page.x)),
                      c = Math.abs(p.y - h.y - (o.nativeEvent.pageY - t.touch.page.y));
                    if (
                      (undefined !== o.nativeEvent.pageX &&
                        undefined !== o.nativeEvent.pageY &&
                        ((t.touch.page = {
                          x: o.nativeEvent.pageX,
                          y: o.nativeEvent.pageY,
                        }),
                        (t.touch.move = p || {})),
                      (!isNaN(u) && u >= 10) || (!isNaN(c) && c >= 10))
                    )
                      return;
                  }

                  if (
                    p &&
                    !(
                      Math.abs(p.x - t.touch.start.x) < 3 ||
                      ((p.x != h.x || p.y != h.y || p.distance) && (t.touch.lastMovedTimestamp = new Date().getTime()), t.longPressStart && p.x - h.x < 10 && p.y - h.y < 10)
                    )
                  ) {
                    var f = new x(t.transform);
                    if (p.hasOwnProperty('distance')) f.scale(p.distance / h.distance || 1);
                    else f.move(module12.I18nManager.isRTL ? h.x - p.x : p.x - h.x, p.y - h.y);
                    var v =
                      (t.map &&
                        t.map.state.width &&
                        t.map.state.height && {
                          width: t.map.state.width,
                          height: t.map.state.height,
                        }) ||
                      null;

                    if (module1402._checkTrans(f, t.size, v, t.left, t.top, t.right, t.bottom, t.props.noScale, t.state.mapDeg)) {
                      if (1 == Y && p.hasOwnProperty('distance') && t.canPageModeFeature(p, h)) {
                        var _ = {
                            x: (h.x1 + h.x2) / 2,
                            y: (h.y1 + h.y2) / 2,
                          },
                          M = t._translateXY(_, true),
                          k = p.distance / h.distance || 1,
                          S = {
                            x: M.x * k,
                            y: M.y * k,
                          },
                          C = t._translateXYFromMap(S, f),
                          B = (p.x1 + p.x2) / 2,
                          E = (p.y1 + p.y2) / 2,
                          w = B - C.x,
                          P = E - C.y;

                        f.move(module12.I18nManager.isRTL ? -w : w, P);
                      }

                      var A = p.hasOwnProperty('distance') ? module1332.PanStatus.MAP_VIEWING_SCALED : module1332.PanStatus.MAP_VIEWING_MOVED;
                      if (!(null == (s = t.map)))
                        s.setState({
                          transform: (t.transform = f),
                          mapPanStatus: A,
                        });
                    }
                  }
                } else
                  t.map &&
                    t.map.setState({
                      transform: new x(),
                    });
            },
            onPanResponderTerminationRequest: function (t, o) {
              return true;
            },
            onPanResponderTerminate: function (o, n) {
              t.disableAddingMode();
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
        value: function (t, o) {
          return !W;
        },
      },
      {
        key: 'UNSAFE_componentWillUpdate',
        value: function (t, o) {
          var n,
            s,
            p,
            h,
            u,
            c,
            f,
            v,
            M,
            k = this.transform;
          if (o.mapMode == module1153.MAP_MODE_ZONED_CLEAN_EDIT && 3 == o.inCleanBlockMode) null == (M = this.map) || M.updateRotateRects();

          if (o.map !== this.state.map || o.path !== this.state.path) {
            var S = o.map;

            if (S) {
              var C = S.width &&
                S.height && {
                  width: S.width,
                  height: S.height,
                };
              if (!o.manual) module1402._center(k, this.size, C, this.left, this.top, this.right, this.bottom, o.mapDeg);

              var B = {
                  x: S.left || 0,
                  y: S.top + S.height || 0,
                },
                w = module1402._offset(module1332.Config.center.x, module1332.Config.center.y, B),
                P = 0,
                A = (o.path && o.path.points && o.path.points.length) || 0;

              if (A > 2) {
                var R = o.path.points || [];
                w = module1402._offset(R[A - 1].x, R[A - 1].y, B);
              }

              if (o.robot) {
                w = module1402._offset(o.robot.x, o.robot.y, B);
                P = o.robot.angle;
              }

              var F =
                  (o.charger &&
                    o.charger.x &&
                    o.charger.y &&
                    undefined !== o.charger.angle &&
                    module22.default(module1402._offset(o.charger.x, o.charger.y, B), {
                      angle: o.charger.angle,
                    })) ||
                  null,
                I = {
                  displayZones: [],
                };
              if (o.mapMode == module1153.MAP_MODE_REGULAR && o.zones && (I = module1402._parseDisplayRects(o.zones, B)).displayZones.length > 0 && 4 == o.inCleanBlockMode)
                this.clearRectangles();
              var D = module390.default.isMopPathSupported() && o.mopPath && undefined !== o.mopPath.data,
                N = {
                  path: '',
                };

              if (o.path) {
                var G = D ? o.mopPath.data : null;
                N = 'android' != module12.Platform.OS || module1430 ? module1402._parsePath(o.path.points, B, G, false) : module1402._parsePathWithTransform(o.path.points, B, k);
              }

              var z = {
                mopPath: '',
              };
              if (D)
                z =
                  'android' != module12.Platform.OS || module1430
                    ? module1402._parseMopPath(o.path.points, B, o.mopPath.data)
                    : module1402._parseMopPathWithTransform(o.path.points, B, k, o.mopPath.data);
              var W = {
                backWashPath: '',
              };
              if (D)
                W =
                  'android' != module12.Platform.OS || module1430
                    ? module1402._parseBackWashPath(o.path.points, B, o.mopPath.data)
                    : module1402._parseBackWashPathWithTransform(o.path.points, B, k, o.mopPath.data);
              var Y = {
                  pathType: (null == (n = o.pathType) ? undefined : n.data) || module1332.MoppingType.MOPPING_TYPE_BOTH_BOTH,
                },
                q = {
                  pathGotoPlan: '',
                };

              if (this.state.mapMode == module1153.MAP_MODE_GOTO_EDIT && o.pathGotoPlan) {
                var j =
                  'android' != module12.Platform.OS || module1430
                    ? module1402._parseGotoPlanPath(o.pathGotoPlan.points, B, new x())
                    : module1402._parseGotoPlanPath(o.pathGotoPlan.points, B, k);
                q.pathGotoPlan = j.path;
              }

              var U = [];
              if (o.path)
                for (var X = 0; X < o.path.points.length; X++) {
                  var V = module1402._offset(o.path.points[X].x, o.path.points[X].y, B);

                  U.push(O({}, V));
                }
              var K = {
                target: {},
              };
              if (this.state.mapMode == module1153.MAP_MODE_GOTO_EDIT && o.target) K = module1402._parseTarget(o.target, B);
              var Q = [];
              if (o.enemies && (null == (s = o.enemies.data) ? undefined : s.length) > 0)
                for (var J = 0; J < o.enemies.data.length; J++) {
                  var $ = o.enemies.data[J],
                    ee = module1402._offset($[0], $[1], B);

                  Q.push(
                    O(
                      O({}, ee),
                      {},
                      {
                        flag: $[2],
                      }
                    )
                  );
                }
              var te = this.parseWalls(o.walls, B),
                ae = this.parseFBZS(o.fbzs, o.map),
                oe = this.parseFBZS(o.mfbzs, o.map),
                ne = this.parseFBZS(o.clfbzs, o.map),
                se = null;
              if (this._isMapModeCarpetIgnore()) se = this.parseFBZS(o.cfbzs, o.map);
              var ie = this.parseFBZS(o.customCarpet, o.map),
                re = this.parseFurnitures(o.furnitures, o.map),
                le = this.getMapCurrentFloor(o.floorMap, o.eidtFloor, o.map),
                pe = [];
              if ((null == (p = o.blocks) ? undefined : null == (h = p.blocks) ? undefined : h.length) > 0) pe = o.blocks.blocks;
              var he = o.ignoredObstacles && o.ignoredObstacles.obstacles ? o.ignoredObstacles.obstacles : [],
                ue = [];
              if (undefined !== o.obstacles && o.obstacles != {} && o.obstacles.obstacles && o.obstacles.obstacles.length)
                for (
                  var ce = function (t) {
                      var n = o.obstacles.obstacles[t];
                      if (
                        -1 !=
                        he.findIndex(function (t) {
                          return t[0] === n[0] && t[1] === n[1] && t[2] === n[2];
                        })
                      )
                        return 'continue';

                      if (module390.default.isFwFilterObstacleSupported()) {
                        var s = module1402._offset(n[0] / 50, n[1] / 50, B);

                        if (n.length > 3) ue.push([n[0], n[1], n[2], s.x, s.y, n[3], n[4], n[5]]);
                        else ue.push([n[0], n[1], n[2], s.x, s.y]);
                        return 'continue';
                      }

                      var l = false;
                      if (o.charger && o.charger.x && o.charger.y && Math.sqrt((50 * o.charger.x - n[0]) ** 2 + (50 * o.charger.y - n[1]) ** 2) <= 300) return 'continue';

                      for (var p = t + 1; p < o.obstacles.obstacles.length; p++) {
                        var h = o.obstacles.obstacles[p];

                        if (Math.sqrt((h[0] - n[0]) ** 2 + (h[1] - n[1]) ** 2) <= 300) {
                          l = true;
                          break;
                        }
                      }

                      if (l) return 'continue';

                      var u = module1402._offset(n[0] / 50, n[1] / 50, B);

                      if (n.length > 3) ue.push([n[0], n[1], n[2], u.x, u.y, n[3], n[4], n[5]]);
                      else ue.push([n[0], n[1], n[2], u.x, u.y]);
                    },
                    de = 0;
                  de < o.obstacles.obstacles.length;
                  de++
                )
                  ce(de);
              else ue = [];
              ue = (ue = ue.filter(function (t) {
                if (!S.data || !S.data.data) return true;

                var o = t[3],
                  n = t[4],
                  s = module1402._mapScreenXYToIndex(S, o, n),
                  l = module1402._mapScreenToOriginXY(S, o, n),
                  p = module1402._getAroundIndexInfo(S, l.x, l.y, 2),
                  h = 0;

                p.forEach(function (t) {
                  if (0 == t[1]) h++;
                });
                return 0 != (7 & S.data.data[s]) || h != p.length;
              })).sort(function (t, o) {
                return o[1] - t[1];
              });
              var me = undefined,
                fe = undefined,
                ve = -1;

              if (
                !(
                  undefined === o.carpetMap ||
                  '' == o.carpetMap.image ||
                  (!module390.default.isCarpetSupported() && !module390.default.isCarpetShowOnMap()) ||
                  (module390.default.isRubberBrushCarpetSupported() && !this.props.showBrushCarpet)
                )
              ) {
                fe = o.carpetMap.capData;
                me = o.carpetMap.image;
                ve = o.carpetMap.firstIndex;
              }

              var ge = o.dockType && o.dockType.data ? o.dockType.data : -1;
              if (this.map)
                this.map.setState(
                  O(
                    O(
                      O(
                        O(
                          O(
                            O(
                              O(
                                O(
                                  O(
                                    {
                                      status: o.robotStatus,
                                      transform: k,
                                      map: S.image,
                                      robot: w,
                                      robotAngle: P,
                                      charger: F,
                                      blockInClean: pe,
                                      mapNoBlock: S.imageNoBlock,
                                      mapBCBackground: S.imageBlockCleanBackground,
                                      roomColorData: S.colorData,
                                      centerInfo: S.centerInfo,
                                      obstacles: ue,
                                      cfbZones: se,
                                      cusCarpetZones: ie,
                                      initFBZone: t.initFBZone,
                                      fbzWalls: te,
                                      fbzZones: ae,
                                      mopZones: oe,
                                      cleanZones: ne,
                                      furnitures: re,
                                      ignoredObstacles: he,
                                      floorMap: le,
                                      carpetMap: me,
                                      carpetData: fe,
                                      carpetFirstIndex: ve,
                                      dockType: ge,
                                      enemies: Q,
                                    },
                                    C
                                  ),
                                  N
                                ),
                                I
                              ),
                              q
                            ),
                            K
                          ),
                          z
                        ),
                        W
                      ),
                      Y
                    ),
                    {},
                    {
                      pathPoints: U,
                      pathData: {
                        points: null == o ? undefined : null == (u = o.path) ? undefined : u.points,
                        planPoints: this.state.mapMode == module1153.MAP_MODE_GOTO_EDIT && (null == o ? undefined : null == (c = o.pathGotoPlan) ? undefined : c.points),
                        mopData: null == o ? undefined : null == (f = o.mopPath) ? undefined : f.data,
                        pathType: null == o ? undefined : null == (v = o.pathType) ? undefined : v.data,
                        offset: B,
                      },
                    }
                  ),
                  function () {
                    H = true;
                  }
                );
            }
          } else {
            if (!this.map) return;
            var be =
              (this.map.state.width &&
                this.map.state.height && {
                  width: this.map.state.width,
                  height: this.map.state.height,
                }) ||
              {};

            if (
              (!o.manual && module1402._center(k, this.size, be, this.left, this.top, this.right, this.bottom, o.mapDeg),
              (o.robotStatus === this.map.state.status && o.manual === this.state.manual) ||
                this.map.setState({
                  status: o.robotStatus,
                  transform: k,
                }),
              t.editAction == module1390.EditAction.Floor)
            ) {
              var ye = this.getMapCurrentFloor(o.floorMap, o.eidtFloor, o.map);
              this.map.setState({
                floorMap: ye,
              });
            }

            if (this.map) this.map.setRectsMode(o.inCleanBlockMode);
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
            o = undefined == this.props.showOnlyGeneralObstacles ? module394.MC.onlyShowGeneralObstacle : this.props.showOnlyGeneralObstacles,
            n = this.isCanBlockEdit();
          return React.default.createElement(
            module12.View,
            {
              style: [K.container, this.props.style],
            },
            React.default.createElement(
              module12.View,
              module22.default({}, module391.default.getAccessibilityLabel('map_root'), this.panResponder.panHandlers, {
                pointerEvents: this.props.pointerEvents || 'auto',
                onLayout: function (o) {
                  t.size = o.nativeEvent.layout;

                  if (t.state.map && t.state.map.height && t.state.map.width) {
                    module1402._center(t.transform, t.size, t.state.map, t.left, t.top, t.right, t.bottom, t.state.mapDeg);

                    t._handleLayoutEnd();

                    if (H) {
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
              React.default.createElement(module1392.default, {
                transform: this.transform,
                ref: function (o) {
                  return (t.map = o);
                },
                color: module1431.map,
                mapDeg: this.state.mapDeg,
                parent: this,
                mapMode: this.state.mapMode,
                subCarpetMode: this.props.subCarpetMode,
                mapInPan: this.state.mapInPan,
                hideAccessory: this.state.hideAccessory,
                imageOnloadCallback: this.props.imageOnloadCallback,
                isCollectDustDock: this.props.isCollectDustDock,
                showDockBubbles: this.props.showDockBubbles,
                mapCarpetFocusCallback: this.props.mapCarpetFocusCallback,
                mapCarpetSaveEdit: this.props.mapCarpetSaveEdit,
                showMapObjectDebugInfo: this.props.showMapObjectDebugInfo,
                showAsGeneralObject: this.props.showAsGeneralObject,
                showOnlyGeneralObstacles: o,
                obstaclePopBoxType: this.props.obstaclePopBoxType,
                alwaysShowFBZ: this.props.alwaysShowFBZ,
                ignoreCarpetEdited: this.props.ignoreCarpetEdited,
                zonesHasEdited: this.props.zonesHasEdited,
                cusCarpetEdited: this.props.cusCarpetEdited,
                blockCanEdit: n,
                roomBubbleMode: this.state.blockBubbleShowInfo,
                showSplitLine: this.props.editAction == module1390.EditAction.Split,
                eidtCountChange: this.props.eidtCountChange,
                showFurnitureIcon: this.props.showFurnitureIcon,
                showFurnitureOnly: this.props.showFurnitureOnly,
                mapElementShowFlag: this.props.mapElementShowFlag,
                onRectPanStart: this.props.onPanResponderStart,
                onRectPanEnd: this.props.onPanResponderEnd,
              })
            )
          );
        },
      },
      {
        key: 'initMapDeg',
        value: function (t) {
          if (t.syncMapDeg) {
            var o = undefined !== t.mapID ? t.mapID : module381.RSM.currentMapId,
              n = module1329.MM.mapRotateAngle[o];
            return n || 0;
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
            ? module1332.BlockBubbleShowInfo.DISPLAYNAME | module1332.BlockBubbleShowInfo.CLEANMODE | module1332.BlockBubbleShowInfo.CLEANSEQUENCE
            : module1332.BlockBubbleShowInfo.NONE;
        },
      },
      {
        key: 'getTouchPointBlockID',
        value: function (t, o) {
          var s = this.state.map.data,
            l = module1402._mapScreenToOriginXY(this.state.map, t, o),
            p = module1402._mapOriginXYToIndex(this.state.map, l.x, l.y);

          if (p < 0 || 0 == (7 & s.data[p])) return -1;
          var h = s.data[p] >>> 3;
          if (h > 0) return h;
          if (undefined === s.blockNum || s.blockNum <= 1) return -1;

          for (var u = module1402._getAroundIndexInfo(this.state.map, l.x, l.y), c = [], f = [], v = 0; v < u.length; v++) {
            var b = module23.default(u[v], 2),
              y = b[0],
              _ = b[1];
            if (0 != _ && 0 != y) c.push(y);
            if (0 == _) f.push(y);
          }

          if (c.length + f.length < u.length) return 0;

          for (var M = 1; M < c.length; M++) if (c[M] != c[M - 1]) return 0;

          return c[0];
        },
      },
      {
        key: 'canPageModeFeature',
        value: function (t, o) {
          if ('android' != module12.Platform.OS) return true;
          if (t.y2 < 0 || o.y2 < 0) return false;
          var n = Math.abs(t.y1 - o.y1 - (t.pageY1 - o.pageY1)),
            s = Math.abs(t.y2 - o.y2 - (t.pageY2 - o.pageY2));
          return !((!isNaN(n) && n >= 10) || (!isNaN(s) && s >= 10));
        },
      },
      {
        key: 'boundToTargetTrans',
        value: function (t, o, n) {
          var s = this;
          W = true;
          var l = o.x - t.x,
            p = o.y - t.y,
            h = o.xx - t.xx,
            u = 10;
          if (n) u = 1;

          for (
            var c = function (o) {
                setTimeout(function () {
                  var n = new x(t);
                  n.move((l / u) * (o + 1), (p / u) * (o + 1));
                  n.scaleTo(t.xx + (h / u) * (o + 1) || 1);
                  if (s.map)
                    s.map.setState({
                      transform: n,
                    });
                  s.transform = n;
                  if (o >= u - 1) W = false;
                }, 10 * o);
              },
              f = 0;
            f < u;
            f++
          )
            c(f);
        },
      },
      {
        key: 'moveMap',
        value: function (t, o, n) {
          var s = this,
            l = new x(this.transform),
            p = new x(this.transform);
          p.move(t, o);
          W = true;
          this.state.manual = true;
          var h = p.x - l.x,
            u = p.y - l.y,
            c = p.xx - l.xx,
            f = Math.abs(h) ** Math.abs(u),
            v = Math.ceil(f / 40);
          if (n) v = 1;
          !(function t(o) {
            setTimeout(function () {
              var n = new x(l);
              n.move((h / v) * (o + 1), (u / v) * (o + 1));
              n.scaleTo(l.xx + (c / v) * (o + 1) || 1);
              if (s.map)
                s.map.setState(
                  {
                    transform: n,
                  },
                  function () {
                    if (o < v - 1) t(o + 1);
                    s.transform = n;
                    if (o >= v - 1) W = false;
                  }
                );
            }, 10 * o);
          })(0);
        },
      },
      {
        key: 'moveMapTo',
        value: function (t, o) {
          var n,
            s = this,
            l = new x(this.transform);
          l.moveTo(t, o);
          W = true;
          this.state.manual = true;
          if (!(null == (n = this.map)))
            n.setState(
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
        key: '_parseMapOffset',
        value: function (t) {
          var o = 0,
            n = 0,
            s = this.transform.x,
            l = this.transform.y;

          if (undefined !== this.size && this.size.width && this.size.height) {
            o = (this.size.width - this.state.map.width * t.xx) / 2;
            n = (this.size.height - this.state.map.height * t.yy) / 2;
          } else {
            o = (U - this.state.map.width * t.xx) / 2;
            n = (0.67 * j - this.state.map.height * t.yy) / 2;
          }

          return {
            offsetX: o + s,
            offsetY: n + l,
          };
        },
      },
      {
        key: '_translateXY',
        value: function (t) {
          var o = arguments.length > 1 && undefined !== arguments[1] && arguments[1],
            s = this._parseMapOffset(this.transform);

          if (o || 0 == this.state.mapDeg)
            return {
              x: t.x - s.offsetX,
              y: t.y - s.offsetY,
            };

          var l = this.state.map.width * this.transform.xx,
            p = this.state.map.height * this.transform.yy,
            h = {
              x: s.offsetX + l / 2,
              y: s.offsetY + p / 2,
            },
            u = module1402._parseDegPointWithTrans(t, h, this.transform, this.state.mapDeg),
            c = module23.default(u, 2),
            f = c[0],
            v = c[1];

          return {
            x: l / 2 + f * this.transform.xx,
            y: p / 2 + v * this.transform.yy,
          };
        },
      },
      {
        key: '_translateXYFromMap',
        value: function (t, o) {
          var n = this._parseMapOffset(o);

          return {
            x: t.x + n.offsetX,
            y: t.y + n.offsetY,
          };
        },
      },
      {
        key: '_dropTarget',
        value: function (t) {
          if (t.x && t.y && this.map && this.map.target) {
            this.targetDroped = true;

            var o = this._translateXY(t);

            o = {
              x: o.x / (this.transform.xx || 1),
              y: o.y / (this.transform.yy || 1),
            };
            this.map.target.setState({
              visible: true,
              position: o,
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
          return this.state.mapMode == module1153.MAP_MODE_CARPET_EDIT && this.props.subCarpetMode & module381.CarpetEditMode.CarpetIgnore;
        },
      },
      {
        key: '_singleClick',
        value: function (t) {
          if (t.x && t.y && this.map) {
            if (this.state.mapMode == module1153.MAP_MODE_CARPET_EDIT) this.handleCarpetMapClick(t);
            else this.handleGlobalCarpetClick(t);
            if (this.state.mapMode == module1153.MAP_MODE_GOTO_EDIT) this.props.parent.isGoing || this._dropTarget(t);
          }
        },
      },
      {
        key: '_mapSingleClickHandle',
        value: function (t) {
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
              o = this.state.map.top + this.state.map.height - this.map.target.state.position.y;
            return [(t = 50 * t.toFixed()), (o = 50 * o.toFixed())];
          }

          return null;
        },
      },
      {
        key: 'addRectangle',
        value: function () {
          var t = this,
            o = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : null;
          if (this.onLayouted) return this.map && this.map.addRectangle(o);
          else {
            this.waitForAddRect = true;
            this.layoutDelayBlocks.push(function () {
              if (t.map) t.map.addRectangle(o);
              t.waitForAddRect = false;
            });
            return true;
          }
        },
      },
      {
        key: 'addRectangleArray',
        value: function (t) {
          var o,
            n = this;
          if (this.onLayouted) return null == (o = this.map) ? undefined : o.addRectangleArray(t);
          else {
            this.waitForAddRect = true;
            this.layoutDelayBlocks.push(function () {
              var o;
              if (!(null == (o = n.map))) o.addRectangleArray(t);
              n.waitForAddRect = false;
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
        key: 'getZoneParams',
        value: function () {
          var t,
            o = null == (t = this.map) ? undefined : t.getVisibleRectZones();
          if (!o || o.length <= 0) return null;

          for (var n = [], s = 0; s < o.length; s++) {
            var l = o[s].state.rectSize;
            if (module1402._isVerticalRotate((180 * o[s].state.slopeAngle) / Math.PI)) l = this._getVerticalZoneRect(l);
            var p = this.state.map.left + l.x,
              h = this.state.map.top + this.state.map.height - (l.y + l.height),
              u = p + l.width,
              c = h + l.height;
            p = 50 * parseInt(p.toFixed());
            h = 50 * parseInt(h.toFixed());
            u = 50 * parseInt(u.toFixed());
            c = 50 * parseInt(c.toFixed());
            n.push([p, h, u, c]);
          }

          return n;
        },
      },
      {
        key: '_getVerticalZoneRect',
        value: function (t) {
          var o = t.x + t.width / 2,
            n = t.y + t.height / 2;
          return {
            x: o - t.height / 2,
            y: n - t.width / 2,
            width: t.height,
            height: t.width,
          };
        },
      },
      {
        key: 'getFBZParams',
        value: function () {
          var t;
          if (!this.map) return [];

          for (var o = null == (t = this.map) ? undefined : t.getVisibleFBZZones(), n = [], s = 0; s < o.length; s++) {
            var l = [];
            if (o[s].state.type == module1332.FbzType.FBZ_TYPE_REGULAR) l.push(0);
            else if (o[s].state.type == module1332.FbzType.FBZ_TYPE_MOPPING) l.push(2);
            else if (o[s].state.type == module1332.FbzType.FBZ_TYPE_CLEANING) l.push(3);

            this._getSingleFBZoneParams(o[s].state.rectSize, o[s].state.slopeAngle, l);

            n.push(l);
          }

          return n;
        },
      },
      {
        key: '_getSingleFBZoneParams',
        value: function (t, o, n) {
          for (
            var s = this.state.map.left + t.x,
              l = this.state.map.top + this.state.map.height - (t.y + t.height),
              p = t.width,
              h = t.height,
              u = [s, s + p, s + p, s],
              c = [l + h, l + h, l, l],
              f = s + 0.5 * p,
              v = l + 0.5 * h,
              b = 0;
            b < u.length;
            b++
          ) {
            var y = o,
              _ = u[b] - f,
              M = c[b] - v,
              k = M ** _,
              S = module1402._regularAngle(k - y),
              C = Math.sqrt(_ * _ + M * M);

            u[b] = C * Math.cos(S) + f;
            c[b] = C * Math.sin(S) + v;
            u[b] = parseInt((50 * u[b]).toFixed());
            c[b] = parseInt((50 * c[b]).toFixed());
            n.push(u[b]);
            n.push(c[b]);
          }
        },
      },
      {
        key: 'getCarpetZonesParams',
        value: function (t) {
          var o,
            n = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : -1;
          if (!this.map) return [];
          var s = null == (o = this.map) ? undefined : o.getVisibleCarpetZones(t);
          if (-1 != n)
            s = s.filter(function (t) {
              return t.state.id != n;
            });

          for (var l = [], p = 0; p < s.length; p++) {
            var h = [];

            this._getSingleFBZoneParams(s[p].state.rectSize, s[p].state.slopeAngle, h);

            l.push(h);
          }

          return l;
        },
      },
      {
        key: 'getEditFurnitureParams',
        value: function () {
          var t, o;
          if (!this.map) return [];

          for (var n = null == (t = this.map) ? undefined : t.getEditFurnitures(), s = [], l = 0; l < n.length; l++) {
            var p = [];
            p.push(1);
            var h = n[l].id > 0 ? n[l].id : -1;
            p.push(h);

            this._getSingleFBZoneParams(n[l].rectSize, n[l].slopeAngle, p);

            p.push(n[l].type);
            p.push(n[l].subType);
            p.push(n[l].direction);
            s.push(p);
          }

          var u = null == (o = this.map) ? undefined : o.getDeleteFurnitures();

          for (l = 0; l < u.length; l++) {
            var c = [];
            c.push(0);
            c.push(u[l]);
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

          for (var o = null == (t = this.map) ? undefined : t.getAllFurnitures(), n = [], s = 0; s < o.length; s++) {
            var l = [];

            this._getSingleFBZoneParams(o[s].rectSize, o[s].slopeAngle, l);

            l.push(o[s].type);
            n.push(l);
          }

          return n;
        },
      },
      {
        key: 'getWallsParams',
        value: function () {
          var t;
          if (!this.map) return [];

          for (var o = null == (t = this.map) ? undefined : t.getVisibleWalls(), n = [], s = 0; s < o.length; s++) {
            var l = [];
            l.push(1);

            for (
              var p = [
                  this.state.map.left + o[s].state.position.start.x,
                  this.state.map.top + this.state.map.height - o[s].state.position.start.y,
                  this.state.map.left + o[s].state.position.end.x,
                  this.state.map.top + this.state.map.height - o[s].state.position.end.y,
                ],
                h = 0;
              h < p.length;
              h++
            )
              l.push(parseInt((50 * p[h]).toFixed()));

            n.push(l);
          }

          return n;
        },
      },
      {
        key: 'decodeMachineFBZ',
        value: function (t, o) {
          var n = o || this.state.map;
          if (!n) return {};

          for (var s = [], l = [], p = 0; p < t.length / 2; p++) {
            var h = t[2 * p],
              u = t[2 * p + 1];
            h -= n.left;
            u = n.height + n.top - u;
            s.push(h);
            l.push(u);
          }

          var c = Math.sqrt((s[0] - s[3]) ** 2 + (l[0] - l[3]) ** 2),
            f = Math.sqrt((s[0] - s[1]) ** 2 + (l[0] - l[1]) ** 2),
            v = (s[0] + s[2]) / 2,
            b = (l[0] + l[2]) / 2,
            y = v - f / 2,
            _ = b - c / 2,
            M = (s[1] + s[2]) / 2,
            k = (l[1] + l[2]) / 2;

          return {
            rectSize: {
              x: y,
              y: _,
              width: f,
              height: c,
            },
            slopeAngle: (k - b) ** (M - v),
          };
        },
      },
      {
        key: 'parseWalls',
        value: function (t, o) {
          if (!t) return null;
          if (t == {} || !t.num || !t.walls || !t.walls.length) return null;

          for (var n = new Array(), s = 0; s < t.walls.length; s++) {
            var l = t.walls[s],
              p = {
                x: l[0] - o.x,
                y: o.y - l[1],
              },
              h = {
                x: l[2] - o.x,
                y: o.y - l[3],
              };
            n.push({
              start: p,
              end: h,
            });
          }

          return n;
        },
      },
      {
        key: 'parseFBZS',
        value: function (t, o) {
          if (!t) return null;
          if (t == {} || !t.num || !t.fbzs || !t.fbzs.length) return null;

          for (var n = new Array(), s = 0; s < t.fbzs.length; s++) {
            var l = t.fbzs[s];
            n.push(this.decodeMachineFBZ(l, o));
          }

          return n;
        },
      },
      {
        key: 'parseFurnitures',
        value: function (t, n) {
          var s;
          if (!t || t == {} || !t.num || !t.data) return null;
          var l,
            p = t.data.length > 0 ? t.data.concat() : [];
          if ((null == (s = t.hide) ? undefined : s.length) > 0)
            (((null == (l = t.hide) ? undefined : l.length) == t.num && 0 == p.length) || module394.MC.showAllFurnitureModel) && p.push.apply(p, module31.default(t.hide));
          if (!p.length) return null;

          for (var h = new Array(), u = 0; u < p.length; u++) {
            var c,
              f,
              v = p[u],
              b = v.slice(0, 8),
              y = this.decodeMachineFBZ(b, n);

            if ((null == y ? undefined : null == (c = y.rectSize) ? undefined : c.width) && (null == y ? undefined : null == (f = y.rectSize) ? undefined : f.height)) {
              y.percent = v[8];
              y.type = v[9];
              y.subType = v[10];
              y.edited = v[11];
              y.id = v[12];
              y.direction = v[13];
              h.push(y);
            }
          }

          return h;
        },
      },
      {
        key: 'getMapCurrentFloor',
        value: function (t, o, n) {
          var s = t;

          if (this.props.editAction == module1390.EditAction.Floor && o && Object.keys(o).length > 0) {
            var p = module22.default(s.data, o),
              h = {
                width: n.width,
                height: n.height,
                top: n.top + 0.5 - n.data.top,
                left: n.left + 0.5 - n.data.left,
              },
              u = module1487.convertFloorDataToImage(p, h, n.data);
            s.image = u;
          }

          return s;
        },
      },
      {
        key: 'getSplitParams',
        value: function () {
          if (!this.map || this.props.editAction != module1390.EditAction.Split) return null;
          var t = this.map.getBlockOpts();
          if (null == t) return null;
          if (t.error)
            return {
              error: t.error,
            };
          var o = this.state.map.left + t.left.x,
            n = this.state.map.top + this.state.map.height - t.left.y;
          o = 50 * o.toFixed();
          n = 50 * n.toFixed();
          var s = this.state.map.left + t.right.x,
            l = this.state.map.top + this.state.map.height - t.right.y;
          s = 50 * s.toFixed();
          l = 50 * l.toFixed();
          var p = [this.map.blockOp.inAction.currentSplitBlock, o, n, s, l];
          console.warn('split paras:' + p);
          return {
            info: p,
          };
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
          var o;
          if (!(null == (o = this.map) || null == o.clearCarpetEditZones)) o.clearCarpetEditZones(t);
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
          return null == (t = this.map) ? undefined : t.isFBZReachMaxNum(module1332.FbzType.FBZ_TYPE_REGULAR);
        },
      },
      {
        key: 'isMoppingFBZReachMaxNum',
        value: function () {
          var t;
          return null == (t = this.map) ? undefined : t.isFBZReachMaxNum(module1332.FbzType.FBZ_TYPE_MOPPING);
        },
      },
      {
        key: 'isCleanFBZReachMaxNum',
        value: function () {
          var t;
          return null == (t = this.map) ? undefined : t.isFBZReachMaxNum(module1332.FbzType.FBZ_TYPE_CLEANING);
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
        key: 'isCarpetReachMaxNum',
        value: function (t) {
          var o;
          return null == (o = this.map) ? undefined : o.isCarpetReachMaxNum(t);
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
            mapMode: module1153.MAP_MODE_GOTO_EDIT,
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
            mapMode: module1153.MAP_MODE_ZONED_CLEAN_EDIT,
          });
          if (this.map)
            this.map.setState({
              displayZones: [],
            });
        },
      },
      {
        key: 'enableAddingWallMode',
        value: function (t) {
          var o;
          this.disableAddingModeCallback = t;
          if (!(null == (o = this.map))) o.addWall();
        },
      },
      {
        key: 'enableAddingNogoMode',
        value: function (t) {
          var o;
          this.disableAddingModeCallback = t;
          if (!(null == (o = this.map))) o.addFBZoneNew(module1332.FbzType.FBZ_TYPE_REGULAR);
        },
      },
      {
        key: 'addMoppingFBZone',
        value: function () {
          var t;
          if (!(null == (t = this.map))) t.addFBZoneNew(module1332.FbzType.FBZ_TYPE_MOPPING);
        },
      },
      {
        key: 'addCleaningFBZone',
        value: function () {
          var t;
          if (!(null == (t = this.map))) t.addFBZoneNew(module1332.FbzType.FBZ_TYPE_CLEANING);
        },
      },
      {
        key: 'addCarpetNewZone',
        value: function (t) {
          var o;
          if (!(null == (o = this.map))) o.addCarpetEditZone(t);
        },
      },
      {
        key: 'addFurniture',
        value: function (t, o) {
          var n,
            s = arguments.length > 2 && undefined !== arguments[2] ? arguments[2] : null;
          if (!(null == (n = this.map))) n.addFurniture(t, o, s);
        },
      },
      {
        key: 'handleCarpetMapClick',
        value: function (t) {
          var o,
            n,
            s = this;
          if (!(null == (o = (n = this.props).resetAllCarpetStatus)))
            o.call(n, function () {
              var o;

              if (t) {
                t = s._translateXY(t);
                if (!(null == (o = s.map))) o.addCarpetFBZoneByClick(t);
              }
            });
        },
      },
      {
        key: 'handleGlobalCarpetClick',
        value: function (t) {
          if (this.map && this.state.showCarpetBubbles) {
            t = this._translateXY(t);
            if (!this.map.handleShowFurnitureBubble(t, this.props.showAllComponetBubble))
              module1329.MM.hasCarpetMap && this.map.handleShowCarpetBubble(t, this.props.showAllComponetBubble);
          }
        },
      },
      {
        key: 'findCarpetAndShowGuide',
        value: function () {
          if (this.map) this.map.handleShowCarpetBubbleGuide();
        },
      },
      {
        key: 'disableAddingMode',
        value: function () {
          if (this.disableAddingModeCallback) this.disableAddingModeCallback();
        },
      },
      {
        key: 'enableMapSaveButtonOnMain',
        value: function () {
          if (this.props.parent && this.props.parent._enableMapSaveButton) this.props.parent._enableMapSaveButton();
        },
      },
      {
        key: 'getBackupRoomNameList',
        value: function () {
          module393.getRoomList(function (t, o) {
            console.warn('result:' + t + ' currentlist:' + JSON.stringify(o));
          });
        },
      },
      {
        key: 'changeMapViewMode',
        value: function (t) {
          if (t != this.lastMapMode) {
            this.lastMapMode = t;
            var o = module1332.BlockBubbleShowInfo.DISPLAYNAME | module1332.BlockBubbleShowInfo.CLEANSEQUENCE,
              n = module1332.BlockBubbleShowInfo.DISPLAYNAME | module1332.BlockBubbleShowInfo.CLEANSEQUENCE | module1332.BlockBubbleShowInfo.CLEANMODE;
            if (this.props.showAllBlocksBubble && !module390.default.isCustomModeIconSupported()) n = o;
            if (t == z.Global_Clean)
              this.setState({
                inBlockMode: false,
                inCleanBlockMode: 0,
                mapMode: module1153.MAP_MODE_REGULAR,
                blockBubbleShowInfo: o,
                showCarpetBubbles: true,
              });
            else if (t == z.Segment_Clean_Read_Only) {
              this.setState({
                inCleanBlockMode: 1,
                mapMode: module1153.MAP_MODE_REGULAR,
                blockBubbleShowInfo: o,
                showCarpetBubbles: false,
              });
              this.resetSelectBlocks();
            } else if (t == z.Segment_Clean_Edit)
              this.setState({
                inCleanBlockMode: 2,
                mapMode: module1153.MAP_MODE_BLOCK_CLEAN_EDIT,
                blockBubbleShowInfo: o,
                showCarpetBubbles: false,
              });
            else if (t == z.Zone_Clean_Read_Only) {
              this.clearRectFocus();
              this.setState({
                inBlockMode: false,
                inCleanBlockMode: 4,
                mapMode: module1153.MAP_MODE_REGULAR,
                blockBubbleShowInfo: module1332.BlockBubbleShowInfo.NONE,
                showCarpetBubbles: false,
              });
            } else if (t == z.Zone_Clean_Edit)
              this.setState({
                inBlockMode: false,
                inCleanBlockMode: 3,
                mapMode: module1153.MAP_MODE_ZONED_CLEAN_EDIT,
                blockBubbleShowInfo: module1332.BlockBubbleShowInfo.NONE,
                showCarpetBubbles: true,
              });
            else if (t == z.Global_Clean_With_Clean_Type)
              this.setState({
                inCleanBlockMode: 0,
                mapMode: module1153.MAP_MODE_REGULAR,
                blockBubbleShowInfo: n,
                showCarpetBubbles: true,
              });
            else if (t == z.Segment_Clean_Edit_With_Clean_Type)
              this.setState({
                inCleanBlockMode: 2,
                mapMode: module1153.MAP_MODE_BLOCK_CLEAN_EDIT,
                blockBubbleShowInfo: n,
                showCarpetBubbles: false,
              });
            else if (t == z.Segment_Clean_Read_Only_With_Clean_Type) {
              this.setState({
                inCleanBlockMode: 1,
                mapMode: module1153.MAP_MODE_REGULAR,
                blockBubbleShowInfo: n,
                showCarpetBubbles: false,
              });
              this.resetSelectBlocks();
            } else if (t == z.Segment_Clean_Sequential_Edit_With_Clean_Type)
              this.setState({
                inCleanBlockMode: 2,
                mapMode: module1153.MAP_MODE_BLOCK_CLEAN_EDIT,
                blockBubbleShowInfo: n,
                showCarpetBubbles: false,
              });
            else if (t == z.Segment_Clean_Sequential_Read_Only_With_Clean_Type) {
              this.setState({
                inCleanBlockMode: 1,
                mapMode: module1153.MAP_MODE_REGULAR,
                blockBubbleShowInfo: n,
                showCarpetBubbles: false,
              });
              this.resetSelectBlocks();
            } else if (t == z.Segment_Clean_Sequential_Edit)
              this.setState({
                inBlockMode: true,
                inCleanBlockMode: 0,
                mapMode: module1153.MAP_MODE_MAP_EDIT,
                hideAccessory: true,
                blockBubbleShowInfo: module1332.BlockBubbleShowInfo.CLEANSEQUENCE,
              });
            else if (t == z.Segment_Clean_Sequential_Read_Only) {
              this.setState({
                inCleanBlockMode: 1,
                mapMode: module1153.MAP_MODE_REGULAR,
                blockBubbleShowInfo: n,
              });
              this.resetSelectBlocks();
            }
          }
        },
      },
      {
        key: 'setHighlightSegments',
        value: function (t) {
          for (var o = [], n = 0; n < 32; n++) o.push(0);

          for (var s = 0; s < t.length; s++) {
            o[t[s]] = 1;
          }

          this.blockSequenceList = t;
          this.setState({
            selectBlockList: o,
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
          var t, o;

          if (((this.blockSequenceList = []), !this.isNoBlockSelected())) {
            for (var n = [], s = 0; s < 32; s++) n.push(0);

            this.setState({
              selectBlockList: n,
            });
            if (!(null == (t = (o = this.props).selectedBlocksDidChange))) t.call(o, []);
          }
        },
      },
      {
        key: 'changeBlockState',
        value: function (t) {
          var o, n, s, l, p, h;

          if (this.isCanBlockEdit()) {
            var u = this.state.selectBlockList;
            u[t] = 1 - u[t];

            for (var c = 0; c < u.length; c++) {
              if (1 == u[c]) {
                var f = c + '';
                if (undefined === this.state.map.mapList[f]) u[c] = 0;
              }
            }

            if (1 == u[t]) this.blockSequenceList.push(t);
            else
              for (var v = 0; v < this.blockSequenceList.length; v++)
                if (this.blockSequenceList[v] == t) {
                  this.blockSequenceList.splice(v, 1);
                  break;
                }
            this.setState({
              selectBlockList: u,
              blockSequenceListReadOnly: this.blockSequenceList,
            });
            if (1 == u[t] && 1 == this.blockSequenceList.length) null == (o = (n = this.props).didTapBlockInCustomMode) || o.call(n, t);
            if (!(null == (s = (l = this.props).selectedBlocksDidChange))) s.call(l, this.blockSequenceList);
            if (!(null == (p = (h = this.props).didTapBlockInCustomOrder))) p.call(h, t);
            X = true;
          } else X = true;
        },
      },
      {
        key: 'getRoomNameListInMap',
        value: function () {
          var t, o;

          if (
            !('android' == module12.Platform.OS && module393.MiApiLevel < module393.androidRoomApiLevel && module393.isMiApp) &&
            !module391.default.isShareUser() &&
            (this.checkAppVersion() || !module393.isMiApp)
          ) {
            var n = module1329.MM.roomNameMapping,
              s = module1329.MM.roomNameList;

            if (null != n && null != s) {
              for (var l = [], p = [], h = [], u = 0; u < 32; u++) l.push([-1, -1]);

              for (var c = 0; c < n.length; c++) {
                var f = n[c][0];
                h.push(f);
                l[f][0] = parseInt(n[c][1]);
                if (3 == n[c].length) l[f][2] = n[c][2];
              }

              for (var v = 0; v < s.length; v++)
                for (var y = s[v].name, _ = s[v].roomId, M = 0; M < l.length; M++)
                  if (_ == l[M][0]) {
                    l[M][1] = y;
                    break;
                  }

              for (var k = 0; k < 32; k++) p.push('');

              var C = null == (t = module1329.MM.mapData) ? undefined : null == (o = t.map) ? undefined : o.colorData,
                E = module1329.MM.allServerNames || [];
              if (C && C.length > 0) for (var w = 0; w < C.length; w++) C[w] > 0 && -1 == h.indexOf(w) && (p[w] = this.getDefaultRoomName(E, p));
              this.setState({
                roomNameList: l,
                defaultNameList: p,
              });
            }
          }
        },
      },
      {
        key: 'getDefaultRoomName',
        value: function (t, o) {
          for (var n = module500.default_room_name, s = 1, l = '' + n + s; (-1 != t.indexOf(l) || -1 != o.indexOf(l)) && ((l = '' + n + s), 20 != ++s); );

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
          if (undefined !== this.state.selectBlockList) for (var o = 0; o < this.state.selectBlockList.length; o++) 0 != this.state.selectBlockList[o] && t.push(o);
          return t;
        },
      },
      {
        key: 'getExistingBlocks',
        value: function () {
          if (undefined !== this.state.map.mapList) {
            for (var t = Object.keys(this.state.map.mapList), o = [], n = 0; n < t.length; n++) '0' != t[n] && o.push(t[n] - '');

            return o;
          }

          return [];
        },
      },
      {
        key: 'checkSegmentSize',
        value: function (t) {
          if (t.length <= 0) return false;

          for (var o = 0; o < t.length; o++) {
            var n, s, l;
            if (
              (null == (n = this.state.map) ? undefined : n.centerInfo) &&
              (null == (s = this.state.map) ? undefined : null == (l = s.centerInfo[t[o]]) ? undefined : l.count) > 3
            )
              return true;
          }

          return false;
        },
      },
      {
        key: 'setSingleCleanMopMode',
        value: function (t, o, n, s) {
          var l = this.state.roomModeList,
            p = l;
          if (
            !l.find(function (o) {
              return o.id == t;
            })
          )
            p.push({
              id: t,
              cleanMode: o,
              waterMode: n,
              mopMode: s,
            });
          else
            p = l.map(function (l) {
              if (l.id == t) {
                l.cleanMode = o;
                l.waterMode = n;
                l.mopMode = s;
                l.mopTemplateId = null == l ? undefined : l.mop_template_id;
              }

              return l;
            });
          console.log('ModeList: ' + JSON.stringify(this.state.roomModeList) + ' CleanModeSet: ' + JSON.stringify(p));
          this.setState({
            roomModeList: p,
          });
          this.resetSelectBlocks();
        },
      },
      {
        key: 'setSingleRoomName',
        value: function (t, o, n) {
          var s = arguments.length > 3 && undefined !== arguments[3] ? arguments[3] : 0,
            l = arguments.length > 4 && undefined !== arguments[4] && arguments[4],
            p = this.state.roomNameList || [];
          p[t][1] = o;
          p[t][0] = n;
          p[t][2] = s;

          for (var h = 0; h < p.length; h++) h != t && p[h][1] == o && ((p[h][0] = -1), (p[h][1] = -1));

          var u = this.state.defaultNameList || [];

          if (l) {
            var c = module1329.MM.allServerNames || [],
              f = u.indexOf(o);
            if (-1 != f) u[f] = this.getDefaultRoomName(c, u);
          }

          this.setState({
            roomNameList: p,
            defaultNameList: u,
          });
          this.resetSelectBlocks();
        },
      },
      {
        key: 'setAllCleanMopMode',
        value: function (t) {
          var o = t.map(function (t) {
            return {
              id: t.segment,
              cleanMode: t.fan_power,
              waterMode: t.water_box_mode,
              mopMode: t.mop_mode,
              mopTemplateId: null == t ? undefined : t.mop_template_id,
            };
          });
          this.setState({
            roomModeList: o,
          });
        },
      },
      {
        key: 'setCleanMode',
        value: function (t) {
          var o = this.state.roomModeList.map(function (o) {
            o.cleanMode = t;
            return o;
          });
          this.setState({
            roomModeList: o,
          });
        },
      },
      {
        key: 'setWaterMode',
        value: function (t) {
          var o = this.state.roomModeList.map(function (o) {
            o.waterMode = t;
            return o;
          });
          this.setState({
            roomModeList: o,
          });
        },
      },
      {
        key: 'setCleanSequence',
        value: function (t) {
          var o = arguments.length > 1 && undefined !== arguments[1] && arguments[1];

          if (undefined !== t) {
            this.setState({
              blockSequenceInfo: t,
            });
            if (o) this.blockSequenceList = t;
          }
        },
      },
      {
        key: 'getSelectBlockFromSeqArray',
        value: function (t) {
          for (var o = [], n = 0; n < 32; n++) o.push(0);

          if (undefined !== t) for (var s = 0; s < t.length; s++) o[t[s]] = 1;
          return o;
        },
      },
      {
        key: 'resetOrderEdit',
        value: function (t) {
          var o = this.getSelectBlockFromSeqArray(t);
          this.blockSequenceList = t;
          this.setState({
            selectBlockList: o,
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
          if (t.length > 0) for (var o = t.length - 1; o >= 0; o--) if (t[o].props.originX > 0 && t[o].props.originY > 0) return void t[o].showReminderBubble();
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
          var o = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : null,
            n = this.state.mapDeg + (t ? 90 : -90);
          this.setState({
            mapDeg: n % 360,
          });
          if (o) o(n % 360);
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
        key: 'hideChargerBubble',
        value: function () {
          var t;
          if (!(null == this || null == (t = this.map))) t.hideChargerBubble();
        },
      },
      {
        key: 'showChargerBubble',
        value: function (t) {
          var o;
          if (!(null == this || null == (o = this.map) || null == o.showChargerBubble)) o.showChargerBubble(t);
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

exports.MapView = V;
V.defaultProps = {
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
  onPressCarpetBubble: function () {},
  onPressFurnitureBubble: function () {},
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
V.propTypes = {
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
