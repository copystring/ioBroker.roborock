var module22 = require('./22'),
  module49 = require('./49'),
  module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1233 = require('./1233'),
  module1239 = require('./1239'),
  module1324 = require('./1324'),
  module1325 = require('./1325'),
  module1339 = require('./1339'),
  module387 = require('./387'),
  module411 = require('./411'),
  module1229 = require('./1229'),
  module386 = require('./386'),
  module390 = require('./390'),
  module377 = require('./377');

function R(t, o) {
  var s = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    if (o)
      n = n.filter(function (o) {
        return Object.getOwnPropertyDescriptor(t, o).enumerable;
      });
    s.push.apply(s, n);
  }

  return s;
}

function O(t) {
  for (var o = 1; o < arguments.length; o++) {
    var n = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      R(Object(n), true).forEach(function (o) {
        module49.default(t, o, n[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(n));
    else
      R(Object(n)).forEach(function (o) {
        Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(n, o));
      });
  }

  return t;
}

function A() {
  if ('undefined' == typeof Reflect || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if ('function' == typeof Proxy) return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (t) {
    return false;
  }
}

var PropTypes = require('prop-types'),
  L = module12.ART.Transform,
  module1267 = require('./1267').isRRSurface,
  module389 = require('./389'),
  module1245 = require('./1245'),
  module1233 = require('./1233'),
  module934 = require('./934'),
  module1268 = require('./1268').Palette,
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

var z = 32,
  W = 'map_viewing_moved',
  Y = 'map_viewing_scaled',
  q = false,
  j = 'map_viewing_fit',
  U = 'android' != module12.Platform.OS || module389.systemMemorySize > 5e3,
  H = module12.Dimensions.get('window'),
  X = H.height,
  V = H.width,
  K = true,
  J = true,
  Q = false,
  $ = (function (t) {
    module7.default(H, t);

    var module49 = H,
      R = A(),
      x = function () {
        var t,
          o = module11.default(module49);

        if (R) {
          var n = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, n);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function H(t) {
      var o;
      module4.default(this, H);
      (o = x.call(this, t)).top = o.props.hasOwnProperty('top') ? o.props.top : module934.StatusBarHeight + module934.AppBarHeight;
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
      o.transform = new L();
      o.scaleMin = o.props.scaleMin || 1;
      o.scaleMax = o.props.scaleMax || 5;
      o.lastMapMode = G.Global_Clean;
      o.blockSequenceList = [];
      var s = [];
      o.onLayouted = false;
      o.layoutDelayBlocks = [];

      for (var n = 0; n <= z; n++) s.push(0);

      o.mapInitialScaled = false;
      o.state = {
        charger: t.charger,
        map: t.map || {
          left: module1233.Config.center.x - module1233.EMPTY_MAP_WIDTH / 2,
          top: module1233.Config.center.y - module1233.EMPTY_MAP_HEIGHT / 2,
          width: module1233.EMPTY_MAP_WIDTH,
          height: module1233.EMPTY_MAP_HEIGHT,
        },
        path: t.path,
        robotStatus: 'Unknown',
        manual: false,
        mapMode: t.mapMode || module934.MAP_MODE_REGULAR,
        showGotoTips: true,
        labEnabled: false,
        inBlockMode: t.inBlockMode || false,
        inCleanBlockMode: 0,
        selectBlockList: s,
        selectBlockListReadOnly: s,
        showPath: true,
        roomNameList: [],
        hideAccessory: t.hideAccessory || false,
        blockBubbleShowInfo: t.blockBubbleShowInfo || module1233.BlockBubbleShowInfo.DISPLAYNAME,
        roomModeList: [],
        blockSequenceListReadOnly: [],
        blockSequenceInfo: [],
        showCarpetBubbles: t.showCarpetBubbles || false,
        mapDeg: o.initMapDeg(t) || 0,
        mapInPan: false,
        eidtFloor: {},
      };
      return o;
    }

    module5.default(H, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          var t = this;
          this.roomNameListener = this.specialEventListener = module12.DeviceEventEmitter.addListener(module411.NotificationKeys.DidReceiveSpecialEvent, function (o) {
            if (o.data == module411.EventKeys.RoomNameMappingDidReceive && t.props.editAction != module1324.EditAction.Name) t.getAllRoomNameList();
          });
          this.panResponder = module12.PanResponder.create({
            onStartShouldSetPanResponder: function () {
              return 0 != K && 0 != J;
            },
            onMoveShouldSetPanResponder: function () {
              return false;
            },
            onPanResponderStart: function (o, s) {
              t.setState({
                mapInPan: true,
              });
              t.touch.move = module1245._parseEvent(o.nativeEvent) || {};
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
            onPanResponderEnd: function (o, s) {
              if (
                (t.setState({
                  mapInPan: false,
                }),
                1 != q &&
                  (t.disableAddingMode(),
                  t.longPressStart ? t._handleLongPressEnd() : t._handleLongPressCancel(),
                  (t.touch.end = module1245._parseEvent(o.nativeEvent)),
                  t.touch.start.timestamp && t.touch.end && t.touch.end.timestamp))
              )
                if (!(t.touch.end.timestamp - t.touch.start.timestamp + t.touch.interval > module1233.Config.click) && t.touch.interval > 0) {
                  if (t.touch.interval > 0 && t.state.mapMode != module934.MAP_MODE_MAP_EDIT && t.state.mapMode != module934.MAP_MODE_CARPET_EDIT) {
                    var n =
                      (t.map &&
                        t.map.state.width &&
                        t.map.state.height && {
                          width: t.map.state.width,
                          height: t.map.state.height,
                        }) ||
                      {};
                    if (t.map)
                      t.map.setState({
                        transform: module1245._center(t.transform, t.size, n, t.left, t.top, t.right, t.bottom, t.state.mapDeg),
                      });
                  }
                } else if (
                  !t.touch.lastMovedTimestamp ||
                  (t.touch.end.timestamp - t.touch.start.timestamp < 200 && new Date().getTime() - t.touch.lastMovedTimestamp > 200) ||
                  (Math.abs(t.touch.start.x - t.touch.move.x) < 5 && Math.abs(t.touch.start.y - t.touch.move.y) < 5)
                )
                  if (t.isCanBlockEdit()) {
                    if (!t.map) return;
                    if (!t.state.map || undefined === t.state.map.data) return;

                    t._mapSingleClickHandle(t.touch.start);

                    J = false;

                    var l = {
                        x: module12.I18nManager.isRTL ? t.size.width - t.touch.move.x : t.touch.move.x,
                        y: t.touch.move.y,
                      },
                      h = t._translateXY(l),
                      p = h.x / t.transform.xx,
                      u = h.y / t.transform.yy,
                      c =
                        t.state.map.data.offset +
                        t.state.map.data.width * (t.state.map.height - Math.floor(u) + Math.floor(t.state.map.top) - t.state.map.data.top) +
                        (Math.floor(p) + Math.floor(t.state.map.left) - t.state.map.data.left);

                    if (c < 0) return void (J = true);
                    if (undefined === t.state.map.data.data) return void (J = true);
                    if (0 == (7 & t.state.map.data.data[c])) return void (J = true);
                    var f = t.state.map.data.data[c] >>> 3;

                    if (0 == f) {
                      if (undefined !== t.state.map.data.blockNum && t.state.map.data.blockNum <= 1 && t.props.didTapWhenNoBlock) t.props.didTapWhenNoBlock();
                      return void (J = true);
                    }

                    t.changeBlockState(f);
                  } else {
                    if (t.map) t.map.clearRectFocus();
                    t.clearAllFBZEditFocus();
                    t.clearAllFurnitureFocus();
                    if (module12.I18nManager.isRTL) {
                      if (t.size && t.size.width)
                        t._singleClick({
                          x: t.size.width - t.touch.start.x,
                          y: t.touch.start.y,
                        });
                    } else t._singleClick(t.touch.start);

                    t._mapSingleClickHandle(t.touch.start);
                  }
            },
            onPanResponderMove: function (o, s) {
              if ((t._handleLongPressCancel(), 1 != q))
                if (
                  (t.map && t.map.clearRectFocus(),
                  null == t.clearAllFBZEditFocus || t.clearAllFBZEditFocus(),
                  (t.state.manual = true),
                  !t.map || (t.map.state.width && t.map.state.height))
                ) {
                  var n = [module1245._parseEvent(o.nativeEvent), t.touch.move],
                    l = n[0],
                    h = n[1];

                  if (
                    l &&
                    undefined !== o.nativeEvent.pageX &&
                    undefined !== o.nativeEvent.pageY &&
                    undefined !== t.touch &&
                    undefined !== t.touch.page &&
                    undefined !== t.touch.page.x &&
                    undefined !== t.touch.page.y
                  ) {
                    var p = Math.abs(l.x - h.x - (o.nativeEvent.pageX - t.touch.page.x)),
                      u = Math.abs(l.y - h.y - (o.nativeEvent.pageY - t.touch.page.y));
                    if (
                      (undefined !== o.nativeEvent.pageX &&
                        undefined !== o.nativeEvent.pageY &&
                        ((t.touch.page = {
                          x: o.nativeEvent.pageX,
                          y: o.nativeEvent.pageY,
                        }),
                        (t.touch.move = l || {})),
                      (!isNaN(p) && p >= 10) || (!isNaN(u) && u >= 10))
                    )
                      return;
                  }

                  if (
                    l &&
                    !(
                      Math.abs(l.x - t.touch.start.x) < 3 ||
                      ((l.x != h.x || l.y != h.y || l.distance) && (t.touch.lastMovedTimestamp = new Date().getTime()), t.longPressStart && l.x - h.x < 10 && l.y - h.y < 10)
                    )
                  ) {
                    var c = new L(t.transform);
                    if (l.hasOwnProperty('distance')) c.scale(l.distance / h.distance || 1);
                    else c.move(module12.I18nManager.isRTL ? h.x - l.x : l.x - h.x, l.y - h.y);
                    var f =
                      (t.map &&
                        t.map.state.width &&
                        t.map.state.height && {
                          width: t.map.state.width,
                          height: t.map.state.height,
                        }) ||
                      null;

                    if (module1245._checkTrans(c, t.size, f, t.left, t.top, t.right, t.bottom, t.props.noScale)) {
                      if (1 == U && l.hasOwnProperty('distance') && t.canPageModeFeature(l, h)) {
                        var b = {
                            x: (h.x1 + h.x2) / 2,
                            y: (h.y1 + h.y2) / 2,
                          },
                          M = t._translateXY(b, true),
                          _ = l.distance / h.distance || 1,
                          y = {
                            x: M.x * _,
                            y: M.y * _,
                          },
                          k = t._translateXYFromMap(y, c),
                          S = (l.x1 + l.x2) / 2,
                          B = (l.y1 + l.y2) / 2,
                          C = S - k.x,
                          E = B - k.y;

                        c.move(module12.I18nManager.isRTL ? -C : C, E);
                      }

                      if (t.map)
                        t.map.setState({
                          transform: (t.transform = c),
                        });
                      if (l.hasOwnProperty('distance')) j = Y;
                      if (j != Y) j = W;
                    }
                  }
                } else
                  t.map &&
                    t.map.setState({
                      transform: new L(),
                    });
            },
            onPanResponderTerminationRequest: function (t, o) {
              return true;
            },
            onPanResponderTerminate: function (o, s) {
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
          return !q;
        },
      },
      {
        key: 'UNSAFE_componentWillUpdate',
        value: function (t, o) {
          var s,
            l,
            h,
            p,
            u = this.transform;

          if (o.map === this.state.map && o.path === this.state.path) {
            var c =
              (this.map &&
                this.map.state.width &&
                this.map.state.height && {
                  width: this.map.state.width,
                  height: this.map.state.height,
                }) ||
              {};
            if (!o.manual) module1245._center(u, this.size, c, this.left, this.top, this.right, this.bottom, o.mapDeg);
            if (this.map && (o.robotStatus !== this.map.state.status || o.manual !== this.state.manual))
              this.map.setState({
                status: o.robotStatus,
                transform: u,
              });
            return void (this.map && this.map.setRectsMode(o.inCleanBlockMode));
          }

          var f = o.map;

          if (f) {
            var M = f.width &&
              f.height && {
                width: f.width,
                height: f.height,
              };
            if (!o.manual) module1245._center(u, this.size, M, this.left, this.top, this.right, this.bottom, o.mapDeg);

            var _ = {
                x: f.left || 0,
                y: f.top + f.height || 0,
              },
              y = module1245._offset(module1233.Config.center.x, module1233.Config.center.y, _),
              k = 0,
              S = (o.path && o.path.points && o.path.points.length) || 0;

            if (S > 2) {
              var B = o.path.points || [];
              y = module1245._offset(B[S - 1].x, B[S - 1].y, _);
            }

            if (o.robot) {
              y = module1245._offset(o.robot.x, o.robot.y, _);
              k = o.robot.angle;
            }

            var C =
                (o.charger &&
                  o.charger.x &&
                  o.charger.y &&
                  undefined !== o.charger.angle &&
                  module21.default(module1245._offset(o.charger.x, o.charger.y, _), {
                    angle: o.charger.angle,
                  })) ||
                null,
              w = {
                displayZones: [],
              };
            if (o.mapMode == module934.MAP_MODE_REGULAR && o.zones && (w = module1245._parseDisplayRects(o.zones, _)).displayZones.length > 0 && 4 == o.inCleanBlockMode)
              this.clearRectangles();
            var P = module386.default.isMopPathSupported() && o.mopPath && undefined !== o.mopPath.data,
              R = {
                path: '',
              };

            if (o.path) {
              var A = P ? o.mopPath.data : null;
              R = 'android' != module12.Platform.OS || module1267 ? module1245._parsePath(o.path.points, _, A, false) : module1245._parsePathWithTransform(o.path.points, _, u);
            }

            var x = {
              mopPath: '',
            };
            if (P)
              x =
                'android' != module12.Platform.OS || module1267
                  ? module1245._parseMopPath(o.path.points, _, o.mopPath.data)
                  : module1245._parseMopPathWithTransform(o.path.points, _, u, o.mopPath.data);
            var F = {
              backWashPath: '',
            };
            if (P)
              F =
                'android' != module12.Platform.OS || module1267
                  ? module1245._parseBackWashPath(o.path.points, _, o.mopPath.data)
                  : module1245._parseBackWashPathWithTransform(o.path.points, _, u, o.mopPath.data);
            var D = {
              pathType: module1233.MoppingType.MOPPING_TYPE_BOTH_BOTH,
            };
            if (o.pathType)
              D = {
                pathType: o.pathType.data,
              };
            var Z = {
              pathGotoPlan: '',
            };

            if (this.state.mapMode == module934.MAP_MODE_GOTO_EDIT && o.pathGotoPlan) {
              var G =
                'android' != module12.Platform.OS || module1267
                  ? module1245._parseGotoPlanPath(o.pathGotoPlan.points, _, new L())
                  : module1245._parseGotoPlanPath(o.pathGotoPlan.points, _, u);
              Z.pathGotoPlan = G.path;
            }

            var z = [];
            if (o.path)
              for (var W = 0; W < o.path.points.length; W++) {
                var Y = module1245._offset(o.path.points[W].x, o.path.points[W].y, _);

                z.push(O({}, Y));
              }
            var q = {
              target: {},
            };
            if (this.state.mapMode == module934.MAP_MODE_GOTO_EDIT && o.target) q = module1245._parseTarget(o.target, _);
            var j = this.parseWalls(o.walls, _),
              U = this.parseFBZS(o.fbzs, o.map),
              H = this.parseFBZS(o.mfbzs, o.map),
              X = this.parseFBZS(o.clfbzs, o.map),
              V = null;
            if (this._isMapModeCarpetIgnore()) V = this.parseFBZS(o.cfbzs, o.map);
            var K = this.parseFBZS(o.customCarpet, o.map),
              J = this.parseFurnitures(o.furnitures, o.map),
              $ = this.getMapCurrentFloor(o.floorMap, o.eidtFloor, o.map),
              tt = [];
            tt = undefined !== o.blocks && o.blocks != {} && o.blocks.blocks && o.blocks.blocks.length ? o.blocks.blocks : [];
            var et = o.ignoredObstacles && o.ignoredObstacles.obstacles ? o.ignoredObstacles.obstacles : [],
              at = [];
            if (undefined !== o.obstacles && o.obstacles != {} && o.obstacles.obstacles && o.obstacles.obstacles.length)
              for (
                var ot = function (t) {
                    var s = o.obstacles.obstacles[t];
                    if (
                      -1 !=
                      et.findIndex(function (t) {
                        return t[0] === s[0] && t[1] === s[1] && t[2] === s[2];
                      })
                    )
                      return 'continue';

                    if (module386.default.isFwFilterObstacleSupported()) {
                      var n = module1245._offset(s[0] / 50, s[1] / 50, _);

                      if (s.length > 3) at.push([s[0], s[1], s[2], n.x, n.y, s[3], s[4], s[5]]);
                      else at.push([s[0], s[1], s[2], n.x, n.y]);
                      return 'continue';
                    }

                    var l = false;
                    if (o.charger && o.charger.x && o.charger.y && Math.sqrt((50 * o.charger.x - s[0]) ** 2 + (50 * o.charger.y - s[1]) ** 2) <= 300) return 'continue';

                    for (var h = t + 1; h < o.obstacles.obstacles.length; h++) {
                      var p = o.obstacles.obstacles[h];

                      if (Math.sqrt((p[0] - s[0]) ** 2 + (p[1] - s[1]) ** 2) <= 300) {
                        l = true;
                        break;
                      }
                    }

                    if (l) return 'continue';

                    var u = module1245._offset(s[0] / 50, s[1] / 50, _);

                    if (s.length > 3) at.push([s[0], s[1], s[2], u.x, u.y, s[3], s[4], s[5]]);
                    else at.push([s[0], s[1], s[2], u.x, u.y]);
                  },
                  st = 0;
                st < o.obstacles.obstacles.length;
                st++
              )
                ot(st);
            else at = [];
            at = (at = at.filter(function (t) {
              if (!f.data || !f.data.data) return true;
              var o = t[3],
                s = t[4],
                n = f.data.offset + f.data.width * (f.height - Math.floor(s) + Math.floor(f.top) - f.data.top) + (Math.floor(o) + Math.floor(f.left) - f.data.left),
                l = f.data.offset + f.data.width * (f.height - Math.floor(s + 1) + Math.floor(f.top) - f.data.top) + (Math.floor(o) + Math.floor(f.left) - f.data.left),
                h = f.data.offset + f.data.width * (f.height - Math.floor(s + 2) + Math.floor(f.top) - f.data.top) + (Math.floor(o) + Math.floor(f.left) - f.data.left),
                p = f.data.offset + f.data.width * (f.height - Math.floor(s - 1) + Math.floor(f.top) - f.data.top) + (Math.floor(o) + Math.floor(f.left) - f.data.left),
                u = f.data.offset + f.data.width * (f.height - Math.floor(s - 2) + Math.floor(f.top) - f.data.top) + (Math.floor(o) + Math.floor(f.left) - f.data.left),
                c = n - 1,
                v = n - 2,
                b = n + 1,
                M = n + 2;
              return (
                0 != (7 & f.data.data[n]) ||
                0 != (7 & f.data.data[l]) ||
                0 != (7 & f.data.data[h]) ||
                0 != (7 & f.data.data[p]) ||
                0 != (7 & f.data.data[u]) ||
                0 != (7 & f.data.data[c]) ||
                0 != (7 & f.data.data[v]) ||
                0 != (7 & f.data.data[b]) ||
                0 != (7 & f.data.data[M])
              );
            })).sort(function (t, o) {
              return o[1] - t[1];
            });
            var nt = undefined,
              it = undefined,
              rt = -1;

            if (undefined !== o.carpetMap && '' != o.carpetMap.image && module386.default.isCarpetSupported()) {
              it = o.carpetMap.capData;
              nt = o.carpetMap.image;
              rt = o.carpetMap.firstIndex;
            }

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
                                    transform: u,
                                    map: f.image,
                                    robot: y,
                                    robotAngle: k,
                                    charger: C,
                                    blockInClean: tt,
                                    mapNoBlock: f.imageNoBlock,
                                    mapBCBackground: f.imageBlockCleanBackground,
                                    roomColorData: f.colorData,
                                    centerInfo: f.centerInfo,
                                    obstacles: at,
                                    cfbZones: V,
                                    cusCarpetZones: K,
                                    initFBZone: t.initFBZone,
                                    fbzWalls: j,
                                    fbzZones: U,
                                    mopZones: H,
                                    cleanZones: X,
                                    furnitures: J,
                                    ignoredObstacles: et,
                                    floorMap: $,
                                    carpetMap: nt,
                                    carpetData: it,
                                    carpetFirstIndex: rt,
                                  },
                                  M
                                ),
                                R
                              ),
                              w
                            ),
                            Z
                          ),
                          q
                        ),
                        x
                      ),
                      F
                    ),
                    D
                  ),
                  {},
                  {
                    pathPoints: z,
                    pathData: {
                      points: null == o ? undefined : null == (s = o.path) ? undefined : s.points,
                      planPoints: this.state.mapMode == module934.MAP_MODE_GOTO_EDIT && (null == o ? undefined : null == (l = o.pathGotoPlan) ? undefined : l.points),
                      mopData: null == o ? undefined : null == (h = o.mopPath) ? undefined : h.data,
                      pathType: null == o ? undefined : null == (p = o.pathType) ? undefined : p.data,
                      offset: _,
                    },
                  }
                ),
                function () {
                  Q = true;
                }
              );
          }
        },
      },
      {
        key: 'componentDidMount',
        value: function () {
          this.getAllRoomNameList();
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
            o = undefined == this.props.showOnlyGeneralObstacles ? module390.MC.onlyShowGeneralObstacle : this.props.showOnlyGeneralObstacles,
            s = this.isCanBlockEdit(),
            l = this.roomBubbleMode();
          return React.default.createElement(
            module12.View,
            {
              style: [tt.container, this.props.style],
            },
            React.default.createElement(
              module12.View,
              module21.default({}, module387.default.getAccessibilityLabel('map_root'), this.panResponder.panHandlers, {
                pointerEvents: this.props.pointerEvents || 'auto',
                onLayout: function (o) {
                  t.size = o.nativeEvent.layout;

                  if (t.state.map && t.state.map.height && t.state.map.width) {
                    module1245._center(t.transform, t.size, t.state.map, t.left, t.top, t.right, t.bottom, t.state.mapDeg);

                    t._handleLayoutEnd();

                    if (Q) {
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
                style: tt.mapContainer,
              }),
              React.default.createElement(module1325.default, {
                transform: this.transform,
                ref: function (o) {
                  return (t.map = o);
                },
                color: module1268.map,
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
                showMapObjectDebugInfo: this.props.showMapObjectDebugInfo,
                showAsGeneralObject: this.props.showAsGeneralObject,
                showOnlyGeneralObstacles: o,
                obstaclePopBoxType: this.props.obstaclePopBoxType,
                alwaysShowFBZ: this.props.alwaysShowFBZ,
                ignoreCarpetEdited: this.props.ignoreCarpetEdited,
                zonesHasEdited: this.props.zonesHasEdited,
                cusCarpetEdited: this.props.cusCarpetEdited,
                blockCanEdit: s,
                roomBubbleMode: l,
                showSplitLine: this.props.editAction == module1324.EditAction.Split,
                eidtCountChange: this.props.eidtCountChange,
              })
            )
          );
        },
      },
      {
        key: 'initMapDeg',
        value: function (t) {
          if (t.syncMapDeg) {
            var o = undefined !== t.mapID ? t.mapID : module377.RSM.currentMapId,
              s = module1229.MM.mapRotateAngle[o];
            return s || 0;
          }

          return 0;
        },
      },
      {
        key: 'roomBubbleMode',
        value: function () {
          var t = this.state.blockBubbleShowInfo & module1233.BlockBubbleShowInfo.DISPLAYNAME,
            o = this.state.blockBubbleShowInfo & module1233.BlockBubbleShowInfo.CLEANMODE,
            s = this.state.blockBubbleShowInfo & module1233.BlockBubbleShowInfo.CLEANSEQUENCE;
          if (this.props.showAllBubbleInfo)
            return t && o
              ? module1239.RoomInfoBubbleMode.Home
              : t && !o
              ? module1239.RoomInfoBubbleMode.HomeWithoutMode
              : t || !o || s
              ? module1239.RoomInfoBubbleMode.None
              : module1239.RoomInfoBubbleMode.OnlyShowMode;
          else
            return this.state.inBlockMode
              ? o
                ? module1239.RoomInfoBubbleMode.EditMode
                : t
                ? module1239.RoomInfoBubbleMode.EditArea
                : s
                ? module1239.RoomInfoBubbleMode.EditOrder
                : module1239.RoomInfoBubbleMode.None
              : module1239.RoomInfoBubbleMode.None;
        },
      },
      {
        key: 'canPageModeFeature',
        value: function (t, o) {
          if ('android' != module12.Platform.OS) return true;
          if (t.y2 < 0 || o.y2 < 0) return false;
          var s = Math.abs(t.y1 - o.y1 - (t.pageY1 - o.pageY1)),
            n = Math.abs(t.y2 - o.y2 - (t.pageY2 - o.pageY2));
          return !((!isNaN(s) && s >= 10) || (!isNaN(n) && n >= 10));
        },
      },
      {
        key: 'boundToTargetTrans',
        value: function (t, o, s) {
          var n = this;
          q = true;
          var l = o.x - t.x,
            h = o.y - t.y,
            p = o.xx - t.xx,
            u = 10;
          if (s) u = 1;

          for (
            var c = function (o) {
                setTimeout(function () {
                  var s = new L(t);
                  s.move((l / u) * (o + 1), (h / u) * (o + 1));
                  s.scaleTo(t.xx + (p / u) * (o + 1) || 1);
                  if (n.map)
                    n.map.setState({
                      transform: s,
                    });
                  n.transform = s;
                  if (o >= u - 1) q = false;
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
        value: function (t, o, s) {
          var n = this,
            l = new L(this.transform),
            h = new L(this.transform);
          h.move(t, o);
          q = true;
          this.state.manual = true;
          var p = h.x - l.x,
            u = h.y - l.y,
            c = h.xx - l.xx,
            f = Math.abs(p) ** Math.abs(u),
            v = Math.ceil(f / 40);
          if (s) v = 1;
          !(function t(o) {
            setTimeout(function () {
              var s = new L(l);
              s.move((p / v) * (o + 1), (u / v) * (o + 1));
              s.scaleTo(l.xx + (c / v) * (o + 1) || 1);
              if (n.map)
                n.map.setState(
                  {
                    transform: s,
                  },
                  function () {
                    if (o < v - 1) t(o + 1);
                    n.transform = s;
                    if (o >= v - 1) q = false;
                  }
                );
            }, 10 * o);
          })(0);
        },
      },
      {
        key: 'moveMapTo',
        value: function (t, o) {
          var s,
            n = this,
            l = new L(this.transform);
          l.moveTo(t, o);
          q = true;
          this.state.manual = true;
          if (!(null == (s = this.map)))
            s.setState(
              {
                transform: l,
              },
              function () {
                n.transform = l;
                q = false;
              }
            );
        },
      },
      {
        key: '_parseMapOffset',
        value: function (t) {
          var o = 0,
            s = 0,
            n = this.transform.x,
            l = this.transform.y;

          if (undefined !== this.size && this.size.width && this.size.height) {
            o = (this.size.width - this.state.map.width * t.xx) / 2;
            s = (this.size.height - this.state.map.height * t.yy) / 2;
          } else {
            o = (V - this.state.map.width * t.xx) / 2;
            s = (0.67 * X - this.state.map.height * t.yy) / 2;
          }

          return {
            offsetX: o + n,
            offsetY: s + l,
          };
        },
      },
      {
        key: '_translateXY',
        value: function (t) {
          var s = arguments.length > 1 && undefined !== arguments[1] && arguments[1],
            n = this._parseMapOffset(this.transform);

          if (s || 0 == this.state.mapDeg)
            return {
              x: t.x - n.offsetX,
              y: t.y - n.offsetY,
            };

          var l = this.state.map.width * this.transform.xx,
            h = this.state.map.height * this.transform.yy,
            p = {
              x: n.offsetX + l / 2,
              y: n.offsetY + h / 2,
            },
            u = module1245._parseDegPointWithTrans(t, p, this.transform, this.state.mapDeg),
            c = module22.default(u, 2),
            f = c[0],
            v = c[1];

          return {
            x: l / 2 + f * this.transform.xx,
            y: h / 2 + v * this.transform.yy,
          };
        },
      },
      {
        key: '_translateXYFromMap',
        value: function (t, o) {
          var s = this._parseMapOffset(o);

          return {
            x: t.x + s.offsetX,
            y: t.y + s.offsetY,
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
          return this.state.mapMode == module934.MAP_MODE_CARPET_EDIT && this.props.subCarpetMode & module377.CarpetEditMode.CarpetIgnore;
        },
      },
      {
        key: '_singleClick',
        value: function (t) {
          if (t.x && t.y && this.map) {
            if (this.state.mapMode == module934.MAP_MODE_CARPET_EDIT) this.handleCarpetMapClick(t);
            else this.handleGlobalCarpetClick(t);
            if (this.state.mapMode == module934.MAP_MODE_GOTO_EDIT) this.props.parent.isGoing || this._dropTarget(t);
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
          return this.size.height ? this.size.height : 0.67 * X;
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
          return this.map ? this.map.hasRects() : this.waitForAddRect;
        },
      },
      {
        key: 'getZoneParams',
        value: function () {
          if (!this.map) return null;

          for (var t = [], o = [], s = 1; s <= module1233.MAX_COUNT_WALL_OR_FBZ; s++)
            this.map.rectReferences[s] && this.map.rectReferences[s].state.visible && o.push(this.map.rectReferences[s]);

          if (
            (o.sort(function (t, o) {
              return t.state.serial - o.state.serial;
            }),
            o.length <= 0)
          )
            return null;

          for (s = 0; s < o.length; s++) {
            var n = o[s].state.rectSize;
            if (module1245._isVerticalRotate(this.state.mapDeg)) n = this._getVerticalZoneRect(n);
            var l = this.state.map.left + n.x,
              h = this.state.map.top + this.state.map.height - (n.y + n.height),
              p = l + n.width,
              u = h + n.height;
            l = 50 * parseInt(l.toFixed());
            h = 50 * parseInt(h.toFixed());
            p = 50 * parseInt(p.toFixed());
            u = 50 * parseInt(u.toFixed());
            t.push([l, h, p, u]);
          }

          return t;
        },
      },
      {
        key: '_getVerticalZoneRect',
        value: function (t) {
          var o = t.x + t.width / 2,
            s = t.y + t.height / 2;
          return {
            x: o - t.height / 2,
            y: s - t.width / 2,
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

          for (var o = null == (t = this.map) ? undefined : t.getVisibleFBZZones(), s = [], n = 0; n < o.length; n++) {
            var l = [];
            if (o[n].state.type == module1233.FbzType.FBZ_TYPE_REGULAR) l.push(0);
            else if (o[n].state.type == module1233.FbzType.FBZ_TYPE_MOPPING) l.push(2);
            else if (o[n].state.type == module1233.FbzType.FBZ_TYPE_CLEANING) l.push(3);

            this._getSingleFBZoneParams(o[n].state.rectSize, o[n].state.slopeAngle, l);

            s.push(l);
          }

          return s;
        },
      },
      {
        key: '_getSingleFBZoneParams',
        value: function (t, o, s) {
          for (
            var n = this.state.map.left + t.x,
              l = this.state.map.top + this.state.map.height - (t.y + t.height),
              h = t.width,
              p = t.height,
              u = [n, n + h, n + h, n],
              c = [l + p, l + p, l, l],
              f = n + 0.5 * h,
              v = l + 0.5 * p,
              b = 0;
            b < u.length;
            b++
          ) {
            var M = o,
              _ = u[b] - f,
              y = c[b] - v,
              k = y ** _,
              S = module1245._regularAngle(k - M),
              B = Math.sqrt(_ * _ + y * y);

            u[b] = B * Math.cos(S) + f;
            c[b] = B * Math.sin(S) + v;
            u[b] = parseInt((50 * u[b]).toFixed());
            c[b] = parseInt((50 * c[b]).toFixed());
            s.push(u[b]);
            s.push(c[b]);
          }
        },
      },
      {
        key: 'getCarpetZonesParams',
        value: function (t) {
          var o,
            s = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : -1;
          if (!this.map) return [];
          var n = null == (o = this.map) ? undefined : o.getVisibleCarpetZones(t);
          if (-1 != s)
            n = n.filter(function (t) {
              return t.state.id != s;
            });

          for (var l = [], h = 0; h < n.length; h++) {
            var p = [];

            this._getSingleFBZoneParams(n[h].state.rectSize, n[h].state.slopeAngle, p);

            l.push(p);
          }

          return l;
        },
      },
      {
        key: 'getEditFurnitureParams',
        value: function () {
          var t, o;
          if (!this.map) return [];

          for (var s = null == (t = this.map) ? undefined : t.getEditFurnitures(), n = [], l = 0; l < s.length; l++) {
            var h = [];
            h.push(1);
            var p = s[l].id > 0 ? s[l].id : -1;
            h.push(p);

            this._getSingleFBZoneParams(s[l].rectSize, s[l].slopeAngle, h);

            h.push(s[l].type);
            h.push(s[l].subType);
            h.push(s[l].direction);
            n.push(h);
          }

          var u = null == (o = this.map) ? undefined : o.getDeleteFurnitures();

          for (l = 0; l < u.length; l++) {
            var c = [];
            c.push(0);
            c.push(u[l]);
            n.push(c);
          }

          return n;
        },
      },
      {
        key: 'getWallsParams',
        value: function () {
          var t;
          if (!this.map) return [];

          for (var o = null == (t = this.map) ? undefined : t.getVisibleWalls(), s = [], n = 0; n < o.length; n++) {
            var l = [];
            l.push(1);

            for (
              var h = [
                  this.state.map.left + o[n].state.position.start.x,
                  this.state.map.top + this.state.map.height - o[n].state.position.start.y,
                  this.state.map.left + o[n].state.position.end.x,
                  this.state.map.top + this.state.map.height - o[n].state.position.end.y,
                ],
                p = 0;
              p < h.length;
              p++
            )
              l.push(parseInt((50 * h[p]).toFixed()));

            s.push(l);
          }

          return s;
        },
      },
      {
        key: 'decodeMachineFBZ',
        value: function (t, o) {
          var s = o || this.state.map;

          if (s) {
            for (var n = [], l = [], h = 0; h < t.length / 2; h++) {
              var p = t[2 * h],
                u = t[2 * h + 1];
              p -= s.left;
              u = s.height + s.top - u;
              n.push(p);
              l.push(u);
            }

            var c = Math.sqrt((n[0] - n[3]) ** 2 + (l[0] - l[3]) ** 2),
              f = Math.sqrt((n[0] - n[1]) ** 2 + (l[0] - l[1]) ** 2),
              v = (n[0] + n[2]) / 2,
              b = (l[0] + l[2]) / 2,
              M = v - f / 2,
              _ = b - c / 2,
              y = (n[1] + n[2]) / 2,
              k = (l[1] + l[2]) / 2;

            return {
              rectSize: {
                x: M,
                y: _,
                width: f,
                height: c,
              },
              slopeAngle: (k - b) ** (y - v),
            };
          }
        },
      },
      {
        key: 'parseWalls',
        value: function (t, o) {
          if (!t) return null;
          if (t == {} || !t.num || !t.walls || !t.walls.length) return null;

          for (var s = new Array(), n = 0; n < t.walls.length; n++) {
            var l = t.walls[n],
              h = {
                x: l[0] - o.x,
                y: o.y - l[1],
              },
              p = {
                x: l[2] - o.x,
                y: o.y - l[3],
              };
            s.push({
              start: h,
              end: p,
            });
          }

          return s;
        },
      },
      {
        key: 'parseFBZS',
        value: function (t, o) {
          if (!t) return null;
          if (t == {} || !t.num || !t.fbzs || !t.fbzs.length) return null;

          for (var s = new Array(), n = 0; n < t.fbzs.length; n++) {
            var l = t.fbzs[n];
            s.push(this.decodeMachineFBZ(l, o));
          }

          return s;
        },
      },
      {
        key: 'parseFurnitures',
        value: function (t, o) {
          if (!t) return null;
          if (t == {} || !t.num || !t.data || !t.data.length) return null;

          for (var s = new Array(), n = 0; n < t.data.length; n++) {
            var l = t.data[n],
              h = l.slice(0, 8),
              p = this.decodeMachineFBZ(h, o);
            p.percent = l[8];
            p.type = l[9];
            p.subType = l[10];
            p.edited = l[11];
            p.id = l[12];
            p.direction = l[13];
            s.push(p);
          }

          return s;
        },
      },
      {
        key: 'getMapCurrentFloor',
        value: function (t, o, s) {
          var l = t;

          if (this.props.editAction == module1324.EditAction.Floor) {
            var h = module21.default(l.data, o),
              p = {
                width: s.width,
                height: s.height,
                top: s.top + 0.5 - s.data.top,
                left: s.left + 0.5 - s.data.left,
              },
              u = module1339.convertFloorDataToImage(h, p, s.data);
            l.image = u;
          }

          return l;
        },
      },
      {
        key: 'getSplitParams',
        value: function () {
          if (this.map && this.map.blockOp && this.props.editAction == module1324.EditAction.Split) {
            if (null == this.map.blockOp.state.leftSplitPoint || null == this.map.blockOp.state.rightSplitPoint) return null;
            var t = this.map.blockOp.state.leftSplitPoint,
              o = this.map.blockOp.state.rightSplitPoint,
              s = this.state.map.left + t.x,
              n = this.state.map.top + this.state.map.height - t.y;
            s = 50 * s.toFixed();
            n = 50 * n.toFixed();
            var l = this.state.map.left + o.x,
              h = this.state.map.top + this.state.map.height - o.y;
            l = 50 * l.toFixed();
            h = 50 * h.toFixed();
            var p = [this.map.blockOp.inAction.currentSplitBlock, s, n, l, h];
            console.warn('split paras:' + p);
            return p;
          }

          return null;
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
          return null == (t = this.map) ? undefined : t.isFBZReachMaxNum(module1233.FbzType.FBZ_TYPE_REGULAR);
        },
      },
      {
        key: 'isMoppingFBZReachMaxNum',
        value: function () {
          var t;
          return null == (t = this.map) ? undefined : t.isFBZReachMaxNum(module1233.FbzType.FBZ_TYPE_MOPPING);
        },
      },
      {
        key: 'isCleanFBZReachMaxNum',
        value: function () {
          var t;
          return null == (t = this.map) ? undefined : t.isFBZReachMaxNum(module1233.FbzType.FBZ_TYPE_CLEANING);
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
            mapMode: module934.MAP_MODE_GOTO_EDIT,
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
            mapMode: module934.MAP_MODE_ZONED_CLEAN_EDIT,
          });
          if (this.map)
            this.map.setState({
              displayZones: [],
            });
        },
      },
      {
        key: 'enterMapEditMode',
        value: function () {
          this.setState({
            mapMode: module934.MAP_MODE_MAP_EDIT,
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
          if (!(null == (o = this.map))) o.addFBZoneNew(module1233.FbzType.FBZ_TYPE_REGULAR);
        },
      },
      {
        key: 'addMoppingFBZone',
        value: function () {
          var t;
          if (!(null == (t = this.map))) t.addFBZoneNew(module1233.FbzType.FBZ_TYPE_MOPPING);
        },
      },
      {
        key: 'addCleaningFBZone',
        value: function () {
          var t;
          if (!(null == (t = this.map))) t.addFBZoneNew(module1233.FbzType.FBZ_TYPE_CLEANING);
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
          var s,
            n = arguments.length > 2 && undefined !== arguments[2] ? arguments[2] : null;
          if (!(null == (s = this.map))) s.addFurniture(t, o, n);
        },
      },
      {
        key: 'handleCarpetMapClick',
        value: function (t) {
          var o,
            s,
            n = this;
          if (!(null == (o = (s = this.props).resetAllCarpetStatus)))
            o.call(s, function () {
              var o;

              if (t) {
                t = n._translateXY(t);
                if (!(null == (o = n.map))) o.addCarpetFBZoneByClick(t);
              }
            });
        },
      },
      {
        key: 'handleGlobalCarpetClick',
        value: function (t) {
          if (this.map && module1229.MM.hasCarpetMap && this.state.showCarpetBubbles) {
            t = this._translateXY(t);
            this.map.handleShowCarpetBubble(t);
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
          module389.getRoomList(function (t, o) {
            console.warn('result:' + t + ' currentlist:' + JSON.stringify(o));
          });
        },
      },
      {
        key: 'changeMapViewMode',
        value: function (t) {
          if (t != this.lastMapMode) {
            this.lastMapMode = t;
            var o = module1233.BlockBubbleShowInfo.DISPLAYNAME | module1233.BlockBubbleShowInfo.CLEANMODE;
            if (t == G.Global_Clean)
              this.setState({
                inBlockMode: false,
                inCleanBlockMode: 0,
                mapMode: module934.MAP_MODE_REGULAR,
                blockBubbleShowInfo: module1233.BlockBubbleShowInfo.DISPLAYNAME,
                showCarpetBubbles: true,
              });
            else if (t == G.Segment_Clean_Read_Only) {
              this.setState({
                inCleanBlockMode: 1,
                mapMode: module934.MAP_MODE_REGULAR,
                blockBubbleShowInfo: module1233.BlockBubbleShowInfo.DISPLAYNAME,
                showCarpetBubbles: false,
              });
              this.resetSelectBlocks();
            } else if (t == G.Segment_Clean_Edit)
              this.setState({
                inCleanBlockMode: 2,
                mapMode: module934.MAP_MODE_BLOCK_CLEAN_EDIT,
                blockBubbleShowInfo: module1233.BlockBubbleShowInfo.DISPLAYNAME,
                showCarpetBubbles: false,
              });
            else if (t == G.Zone_Clean_Read_Only) {
              this.clearRectFocus();
              this.setState({
                inBlockMode: false,
                inCleanBlockMode: 4,
                mapMode: module934.MAP_MODE_REGULAR,
                blockBubbleShowInfo: module1233.BlockBubbleShowInfo.NONE,
                showCarpetBubbles: false,
              });
            } else if (t == G.Zone_Clean_Edit)
              this.setState({
                inBlockMode: false,
                inCleanBlockMode: 3,
                mapMode: module934.MAP_MODE_ZONED_CLEAN_EDIT,
                blockBubbleShowInfo: module1233.BlockBubbleShowInfo.NONE,
                showCarpetBubbles: true,
              });
            else if (t == G.Global_Clean_With_Clean_Type)
              this.setState({
                inCleanBlockMode: 0,
                mapMode: module934.MAP_MODE_REGULAR,
                blockBubbleShowInfo: o,
                showCarpetBubbles: true,
              });
            else if (t == G.Segment_Clean_Edit_With_Clean_Type)
              this.setState({
                inCleanBlockMode: 2,
                mapMode: module934.MAP_MODE_BLOCK_CLEAN_EDIT,
                blockBubbleShowInfo: o,
                showCarpetBubbles: false,
              });
            else if (t == G.Segment_Clean_Read_Only_With_Clean_Type) {
              this.setState({
                inCleanBlockMode: 1,
                mapMode: module934.MAP_MODE_REGULAR,
                blockBubbleShowInfo: o,
                showCarpetBubbles: false,
              });
              this.resetSelectBlocks();
            } else if (t == G.Segment_Clean_Sequential_Edit_With_Clean_Type)
              this.setState({
                inCleanBlockMode: 2,
                mapMode: module934.MAP_MODE_BLOCK_CLEAN_EDIT,
                blockBubbleShowInfo: o,
                showCarpetBubbles: false,
              });
            else if (t == G.Segment_Clean_Sequential_Read_Only_With_Clean_Type) {
              this.setState({
                inCleanBlockMode: 1,
                mapMode: module934.MAP_MODE_REGULAR,
                blockBubbleShowInfo: o,
                showCarpetBubbles: false,
              });
              this.resetSelectBlocks();
            } else if (t == G.Segment_Clean_Sequential_Edit) {
              this.enterMapEditMode();
              this.setState({
                inBlockMode: true,
                inCleanBlockMode: 0,
                hideAccessory: true,
                blockBubbleShowInfo: module1233.BlockBubbleShowInfo.CLEANSEQUENCE,
              });
            } else if (t == G.Segment_Clean_Sequential_Read_Only) {
              this.setState({
                inCleanBlockMode: 1,
                mapMode: module934.MAP_MODE_REGULAR,
                blockBubbleShowInfo: o,
              });
              this.resetSelectBlocks();
            }
          }
        },
      },
      {
        key: 'setMapViewEnabled',
        value: function (t) {
          K = t;
        },
      },
      {
        key: 'getMapViewEnabled',
        value: function () {
          return K;
        },
      },
      {
        key: 'setHighlightSegments',
        value: function (t) {
          for (var o = [], s = 0; s < z; s++) o.push(0);

          for (var n = 0; n < t.length; n++) {
            var l = t[n];
            o[l] = 1;
            this.blockSequenceList.push(l);
          }

          this.setState({
            selectBlockList: o,
          });
          this.setState({
            blockSequenceListReadOnly: this.blockSequenceList,
            selectBlockListReadOnly: o,
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
          var t = [];
          if (this.isNoBlockSelected()) this.blockSequenceList = [];
          else {
            for (var o = 0; o < z; o++) t.push(0);

            this.setState({
              selectBlockList: t,
            });
            this.blockSequenceList = [];
            if (this.props.selectedBlocksDidChange) this.props.selectedBlocksDidChange(this.blockSequenceList);
          }
        },
      },
      {
        key: 'changeBlockState',
        value: function (t) {
          if (this.isCanBlockEdit()) {
            var o = this.state.selectBlockList;
            o[t] = 1 - o[t];

            for (var s = 0; s < o.length; s++) {
              if (1 == o[s]) {
                var n = s + '';
                if (undefined === this.state.map.mapList[n]) o[s] = 0;
              }
            }

            if (1 == o[t]) this.blockSequenceList.push(t);
            else
              for (var l = 0; l < this.blockSequenceList.length; l++)
                if (this.blockSequenceList[l] == t) {
                  this.blockSequenceList.splice(l, 1);
                  break;
                }
            this.setState({
              selectBlockList: o,
            });
            this.setState({
              blockSequenceListReadOnly: this.blockSequenceList,
              selectBlockListReadOnly: o,
            });
            if (1 == o[t] && 1 == this.blockSequenceList.length && this.props.didTapBlockInCustomMode) this.props.didTapBlockInCustomMode(t);
            if (this.props.selectedBlocksDidChange) this.props.selectedBlocksDidChange(this.blockSequenceList);
            J = true;
          } else J = true;
        },
      },
      {
        key: 'getAllRoomNameList',
        value: function () {
          if (!(('android' == module12.Platform.OS && module389.MiApiLevel < module389.androidRoomApiLevel && module389.isMiApp) || module387.default.isShareUser())) {
            var t = module1229.MM.roomNameMapping,
              o = module1229.MM.roomNameList;

            if (null != t && null != o) {
              var s = [],
                n = [];

              if (this.checkAppVersion() || !module389.isMiApp) {
                for (var l = 0; l < z; l++) s.push([-1, -1]);

                for (var h = 0; h < t.length; h++) s[t[h][0]][0] = parseInt(t[h][1]);

                for (var p = 0; p < o.length; p++) {
                  for (var u = o[p].name, c = o[p].roomId, f = false, b = 0; b < s.length; b++)
                    if (c == s[b][0]) {
                      s[b][1] = u;
                      n.push({
                        roomId: c,
                        roomName: u,
                        blockID: b,
                      });
                      f = true;
                      break;
                    }

                  if (!f)
                    n.push({
                      roomId: c,
                      roomName: u,
                      blockID: -1,
                    });
                }

                this.setState({
                  roomNameList: s,
                });
                this.roomInfo = s;
              }
            }
          }
        },
      },
      {
        key: 'checkAppVersion',
        value: function () {
          return !(module389.apiLevel < 146);
        },
      },
      {
        key: 'getRoomNameListInEditPage',
        value: function (t) {
          if (!(('android' == module12.Platform.OS && module389.MiApiLevel < module389.androidRoomApiLevel && module389.isMiApp) || module387.default.isShareUser())) {
            var o = module1229.MM.roomNameMapping,
              s = module1229.MM.roomNameList;

            if (null != o && null != s) {
              var n = [],
                l = [];

              if (this.checkAppVersion() || !module389.isMiApp) {
                for (var h = 0; h < z; h++) n.push([-1, -1]);

                for (var p = 0; p < o.length; p++) n[o[p][0]][0] = parseInt(o[p][1]);

                for (var u = 0; u < s.length; u++) {
                  for (var c = s[u].name, f = s[u].roomId, b = false, M = 0; M < n.length; M++)
                    if (f == n[M][0]) {
                      n[M][1] = c;
                      l.push({
                        name: c,
                        used: false,
                      });
                      b = true;
                      break;
                    }

                  if (!b)
                    l.push({
                      name: c,
                      used: false,
                    });
                }

                if (t)
                  this.setState({
                    roomNameList: n,
                  });
                console.warn('final list:' + JSON.stringify(l));
                this.editPageNameList = l;
              }
            }
          }
        },
      },
      {
        key: 'getCurrentSelectBlock',
        value: function () {
          if (undefined !== this.state.selectBlockList) {
            for (var t = 0, o = -1, s = 0; s < this.state.selectBlockList.length; s++) 0 != this.state.selectBlockList[s] && ((o = s), t++);

            return t > 1 ? -1 : o;
          }

          return -1;
        },
      },
      {
        key: 'getExistingBlocks',
        value: function () {
          if (undefined !== this.state.map.mapList) {
            for (var t = Object.keys(this.state.map.mapList), o = [], s = 0; s < t.length; s++) '0' != t[s] && o.push(t[s] - '');

            return o;
          }

          return [];
        },
      },
      {
        key: 'setSingleCleanMopMode',
        value: function (t, o, s, n) {
          var l = this.state.roomModeList,
            h = l;
          if (
            !l.find(function (o) {
              return o.id == t;
            })
          )
            h.push({
              id: t,
              cleanMode: o,
              waterMode: s,
              mopMode: n,
            });
          else
            h = l.map(function (l) {
              if (l.id == t) {
                l.cleanMode = o;
                l.waterMode = s;
                l.mopMode = n;
                l.mopTemplateId = null == l ? undefined : l.mop_template_id;
              }

              return l;
            });
          console.log('ModeList: ' + JSON.stringify(this.state.roomModeList) + ' CleanModeSet: ' + JSON.stringify(h));
          this.setState({
            roomModeList: h,
          });
          this.resetSelectBlocks();
        },
      },
      {
        key: 'setSingleRoomName',
        value: function (t, o, s) {
          this.currentRoomNameList = this.state.roomNameList || [];
          this.currentRoomNameList[t][1] = o;
          this.currentRoomNameList[t][0] = s;

          for (var n = 0; n < this.currentRoomNameList.length; n++)
            n != t && this.currentRoomNameList[n][1] == o && ((this.currentRoomNameList[n][0] = -1), (this.currentRoomNameList[n][1] = -1));

          this.getAllRoomNameList();
          this.setState({
            roomNameList: this.currentRoomNameList,
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
        value: function (t, o) {
          if (
            undefined !== t &&
            (this.setState({
              blockSequenceInfo: t,
            }),
            o)
          ) {
            this.blockSequenceList = t;

            for (var s = [], n = 0; n < z; n++) s.push(0);

            for (var l = 0; l < t.length; l++) s[t[l]] = 1;

            this.setState({
              selectBlockList: s,
            });
            if (this.props.selectedBlocksDidChange) this.props.selectedBlocksDidChange(this.blockSequenceList);
          }
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
            s = t ? 90 : -90;
          this.setState(
            {
              mapDeg: (this.state.mapDeg + s) % 360,
            },
            function () {
              if (o) o();
            }
          );
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
    ]);
    return H;
  })(React.default.Component);

exports.MapView = $;
$.defaultProps = {
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
  onPathPlaybackFinished: function () {},
  shouldShowRobotMovingAnimation: false,
  syncMapDeg: true,
  onPressChargerErrorBubble: function () {},
  ignoreCarpetEdited: false,
  cusCarpetEdited: false,
  zonesHasEdited: false,
  showAllBubbleInfo: false,
};
$.propTypes = {
  isCollectDustDock: PropTypes.bool,
  showDockBubbles: PropTypes.bool,
};
var tt = module12.StyleSheet.create({
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
