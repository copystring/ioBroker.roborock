var module49 = require('./49'),
  module21 = require('./21'),
  module22 = require('./22'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  PropTypes = require('prop-types'),
  module927 = require('./927'),
  module1235 = require('./1235'),
  module1241 = require('./1241'),
  module1243 = require('./1243'),
  module411 = require('./411'),
  module377 = require('./377'),
  module1266 = require('./1266'),
  module394 = require('./394'),
  module415 = require('./415'),
  module506 = require('./506'),
  module387 = require('./387'),
  module386 = require('./386');

function P(t, s) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    if (s)
      n = n.filter(function (s) {
        return Object.getOwnPropertyDescriptor(t, s).enumerable;
      });
    o.push.apply(o, n);
  }

  return o;
}

function B(t) {
  for (var o = 1; o < arguments.length; o++) {
    var n = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      P(Object(n), true).forEach(function (o) {
        module49.default(t, o, n[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(n));
    else
      P(Object(n)).forEach(function (s) {
        Object.defineProperty(t, s, Object.getOwnPropertyDescriptor(n, s));
      });
  }

  return t;
}

function S(t) {
  var s = T();
  return function () {
    var o,
      n = module11.default(t);

    if (s) {
      var h = module11.default(this).constructor;
      o = Reflect.construct(n, arguments, h);
    } else o = n.apply(this, arguments);

    return module9.default(this, o);
  };
}

function T() {
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

var module1249 = require('./1249'),
  F = module12.ART.Shape,
  I = module12.ART.Transform,
  module491 = require('./491').strings,
  module1247 = require('./1247'),
  module1235 = require('./1235'),
  module1269 = require('./1269'),
  W = module1269.RRSurface,
  z = module1269.isRRSurface,
  module1267 = require('./1267'),
  module936 = require('./936'),
  module1270 = require('./1270').Palette,
  X = module12.Dimensions.get('window').width,
  module1328 = require('./1328'),
  module1329 = (function (t) {
    module7.default(u, t);
    var s = S(u);

    function u(t) {
      var o;
      module4.default(this, u);
      (o = s.call(this, t)).smallDiam = 12;
      o.bigDiam = 108;
      o.longPressStart = false;
      o.longPressCanceled = false;
      o.touch = {
        start: {},
        end: {},
        move: {},
      };
      o.state = {
        visible: false,
        position: {
          x: 0,
          y: 0,
        },
      };
      return o;
    }

    module5.default(u, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          var t = this;
          this.panResponder = module12.PanResponder.create({
            onStartShouldSetPanResponder: function () {
              return true;
            },
            onMoveShouldSetPanResponder: function () {
              return true;
            },
            onPanResponderStart: function (s, o) {
              t._handleLongPressStart();

              t.touch.move = module1247._parseEvent2(s.nativeEvent, o) || {};
            },
            onPanResponderEnd: function () {
              if (t.longPressStart) t.longPressStart = false;
              else t._handleLongPressCancel();
            },
            onPanResponderMove: function (s, o) {
              if (t.longPressStart) {
                var h = [module1247._parseEvent2(s.nativeEvent, o), t.touch.move],
                  l = h[0],
                  p = h[1];
                if (((t.touch.move = l || {}), !(l && l.x && l.y && p.x))) return;

                var u = module1247._parseDegPointWithTrans(l, p, t.props.transform, t.props.mapDeg),
                  c = module22.default(u, 2),
                  f = c[0],
                  b = c[1];

                t.setState({
                  position: {
                    x: t.state.position.x + f,
                    y: t.state.position.y + b,
                  },
                });
              }
            },
            onPanResponderTerminationRequest: function () {
              return true;
            },
            onPanResponderTerminate: function () {
              if (t.longPressStart) t.longPressStart = false;
              else t._handleLongPressCancel();
            },
          });
        },
      },
      {
        key: '_longPress',
        value: function () {
          if (!this.longPressCanceled) {
            this.props.onLongPress();
            this.longPressStart = true;

            var t = module1247._parseDegPoint(0, -30 / (this.props.transform.yy || 1), this.props.mapDeg),
              s = module22.default(t, 2),
              o = s[0],
              h = s[1];

            this.setState({
              position: {
                x: this.state.position.x + o,
                y: this.state.position.y + h,
              },
            });
          }
        },
      },
      {
        key: '_handleLongPressStart',
        value: function () {
          var t = this;
          this.longPressCanceled = false;
          module1249.setTimeout(function () {
            return t._longPress();
          }, 600);
        },
      },
      {
        key: '_handleLongPressCancel',
        value: function () {
          this.longPressCanceled = true;
        },
      },
      {
        key: 'componentDidMount',
        value: function () {},
      },
      {
        key: 'render',
        value: function () {
          if (!this.state.visible) return React.default.createElement(module12.View, null);
          var t = 'column',
            s = 'flex-end';

          if (90 == this.props.mapDeg || -270 == this.props.mapDeg) {
            t = 'row';
            s = 'flex-end';
          } else if (270 == this.props.mapDeg || -90 == this.props.mapDeg) {
            t = 'row';
            s = 'flex-start';
          } else if (!(180 != this.props.mapDeg && -180 != this.props.mapDeg)) {
            t = 'column';
            s = 'flex-start';
          }

          return React.default.createElement(
            module12.Animated.View,
            {
              pointerEvents: 'auto',
              style: {
                position: 'absolute',
                left: this.state.position.x * (this.props.transform.xx || 1),
                top: this.state.position.y * (this.props.transform.yy || 1),
                width: 0,
                height: 0,
                flexDirection: t,
                justifyContent: s,
                alignItems: 'center',
                overflow: 'visible',
              },
            },
            React.default.createElement(
              module12.View,
              module21.default({}, this.panResponder.panHandlers, {
                style: {
                  width: 56,
                  height: 56,
                  transform: [
                    {
                      rotateZ: -1 * this.props.mapDeg + 'deg',
                    },
                    {
                      translateX: 0,
                    },
                  ],
                },
              }),
              React.default.createElement(module12.Image, {
                style: {
                  width: 56,
                  height: 56,
                  resizeMode: 'contain',
                },
                source: require('./1329'),
              })
            )
          );
        },
      },
    ]);
    return u;
  })(React.default.Component);

module1329.propTypes = {
  onLongPress: PropTypes.default.func,
};
module1329.defaultProps = {
  onLongPress: function () {},
  transform: {
    xx: 1,
    yy: 1,
  },
};

var module1340 = (function (t) {
  module7.default(u, t);
  var s = S(u);

  function u(t) {
    var o;
    module4.default(this, u);

    (o = s.call(this, t)).mapSourceOnLoad = function (t, s) {
      if (o.props.imageOnloadCallback)
        s == module1235.shareViewLoadType.ONLOAD_OBSTACLE
          ? o.lastObstacles && ++o.mapObjectImageLoadNum == o.lastObstacles.length && ((o.mapObjectImageLoadNum = 0), o._imageOnLoaded([s]))
          : (o._imageOnLoaded([s]), (o.mapLoadSources[s] = t.url));
    };

    o.colorOfRoom = function (t) {
      var s =
        o.props.parent.state.selectBlockList[t] && o.props.blockCanEdit
          ? ['#DFDFDFff', '#50A4FF', '#FF744D', '#008FA8', '#F5AF10', '#E9E9E9ff']
          : ['#DFDFDF88', '#05819B88', '#C6920088', '#C4715888', '#1369C088', '#E9E9E988'];
      return o.state.roomColorData ? s[o.state.roomColorData[t]] : s[0];
    };

    o.handleFBZPanEnd = function (t, s) {
      if (s) o.moveMapToRectCenter(null == t ? undefined : t.state.rectSize);
    };

    o.handleRectPanStart = function (t) {
      return o._setMapZonesFocus(o.rectReferences, t);
    };

    o.handleRectPanEnd = function (t, s) {
      return s && o.moveMapToRectCenter(null == t ? undefined : t.state.rectSize);
    };

    o.mapEditPageDidChange = function () {
      var t = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : -1;
      return module12.DeviceEventEmitter.emit(module411.NotificationKeys.MapEditDidChange, {
        data: t,
      });
    };

    o.getTargetPos = function (t) {
      return t ? o.robot : o.charger;
    };

    o.handlePressCarpetBubble = function () {
      return null == o.props.parent.props.onPressCarpetBubble ? undefined : o.props.parent.props.onPressCarpetBubble(o.carpetArea);
    };

    o.handlePressDockBubble = function () {
      return o.props.parent.props.onPressDockBubble && o.props.parent.props.onPressDockBubble();
    };

    o.handlePressChargerErrorBubble = function () {
      return o.props.parent.props.onPressChargerErrorBubble && o.props.parent.props.onPressChargerErrorBubble();
    };

    o.handleBubbleLayout = function (t, s) {
      return o.moveMapIfNeeded(t, s);
    };

    o.handleCheckAndroidOverflow = function (t, s, n) {
      var h = arguments.length > 3 && undefined !== arguments[3] && arguments[3],
        l = (o._getEdgeCheckPadding() - (s ? 45 : h ? 65 : 35)) / o.state.transform.xx;
      if (s) return (s.x <= -1 * l || s.x >= o.state.width + l || s.y <= -1 * l || s.y >= o.state.height + l) && (globals.showToast(module491.rotate_map_rect_warning), true);

      if (t) {
        if ((n = Math.abs(((180 * n) / Math.PI) % 360)) > 90 && n <= 270) n = Math.abs(n - 180);
        if (n > 270 && n < 360) n = 360 - n;
        n = o.degreeToRad(n);
        var p = t.x + t.width / 2,
          u = t.y + t.height / 2,
          c = (t.height / 2) * Math.cos(-1 * n) - (t.width / 2) * Math.sin(-1 * n),
          f = u - c,
          b = u + c,
          v = (t.height / 2) * Math.sin(n) + (t.width / 2) * Math.cos(n);
        return (p - v <= -1 * l || p + v >= o.state.width + l || f <= -1 * l || b >= o.state.height + l) && (globals.showToast(module491.rotate_map_rect_warning), true);
      }

      return false;
    };

    o.handleShouldShowBubbleChecker = function (t) {
      if (o.props.parent.props.shouldShowMapObjectBubbleChecker) o.props.parent.props.shouldShowMapObjectBubbleChecker(t);
    };

    o.handlePressObjectBubble = function (t) {
      var s = {
        x: t.originX,
        y: t.originY,
        type: t.type,
        percent: t.percent,
        photoId: t.photoId,
      };
      if (o.props.parent.props.onPressMapObjectBubble) o.props.parent.props.onPressMapObjectBubble(s, o.state.ignoredObstacles);
    };

    o.handlePressPhotoReminderBubble = function (t) {
      var s = {
        x: t.originX,
        y: t.originY,
        type: t.type,
        percent: t.percent,
        photoId: t.photoId,
      };
      if (o.props.parent.props.onPressMapObjectPhotoReminderBubble) o.props.parent.props.onPressMapObjectPhotoReminderBubble(s, o.state.ignoredObstacles);
    };

    o.handlePressObjectDelete = function (t) {
      for (s = t.x, n = t.y, h = [], l = 0, undefined; l < o.state.obstacles.length; l++) {
        var s, n, h, l;
        var p = o.state.obstacles[l],
          u = t.transform.point(p[3], p[4]);
        if ((u.x - s) * (u.x - s) + (u.y - n) * (u.y - n) < 2500)
          h.push({
            x: p[0],
            y: p[1],
            type: p[2],
          });
      }

      if (o.props.parent.props.onIgnoreMapObjects) o.props.parent.props.onIgnoreMapObjects(h, o.state.ignoredObstacles);
    };

    o.handleObjectNameViewDidShow = function (t) {
      var s = [B({}, t)];
      o.setState({
        showMapObjectNameObjects: s,
      });
    };

    o.handleObjectNameViewDidHide = function (t) {
      var s = o.state.showMapObjectNameObjects;
      if (
        -1 !=
        s.findIndex(function (s) {
          return s.originX == t.originX && s.originY == t.originY && s.type == t.type;
        })
      )
        s = s.filter(function (s) {
          return s.originX != t.originX && s.originY != t.originY && s.type != t.type;
        });
      o.setState({
        showMapObjectNameObjects: s,
      });
    };

    o.handleMapObjectBubbleDidShow = function (t) {
      o.hideAllMapObjects(t);
      o.hideChargerBubble();
      o.hideCarpetBubble();
    };

    o.handleMapObjectImageOnLoad = function () {
      return o.mapSourceOnLoad({}, module1235.shareViewLoadType.ONLOAD_OBSTACLE);
    };

    o.color = o.props.color;
    o.robot = {
      x: 0,
      y: 0,
    };
    o.robotAngle = 0;
    o.charger = {
      x: 0,
      y: 0,
      angle: 0,
    };
    o.charging = false;
    o.lastStatus = 'undefined';
    o.rectReferences = {
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
    };
    o.mapObjectRefs = [];
    o.mapObjectImageLoadNum = 0;
    o.mapLoadSources = {};
    o.carpetArea = {};
    o.mapRotatePadding = 0;
    o.carpetBubbleOpacity = new module12.Animated.Value(0);
    o.chargerBubbleOpacity = new module12.Animated.Value(0);
    o.state = {
      map: o.props.map || '',
      path: o.props.path || '',
      pathGotoPlan: o.props.pathGotoPlan || '',
      mopPath: o.props.mopPath || '',
      target: o.props.target || {},
      width: module1235.EMPTY_MAP_WIDTH,
      height: module1235.EMPTY_MAP_HEIGHT,
      transform: o.props.transform || new I(),
      status: 'Unknown',
      robot: null,
      robotAngle: 0,
      charger: null,
      displayZones: [],
      locatingRippleHarf: new module12.Animated.Value(0),
      showMapObject: true,
      showOnlyGeneralObstacles: false,
      showMapObjectDeleteButton: false,
      showMapObjectNameObjects: [],
      showCarpetBubble: false,
      showChargerBubble: false,
      chargerErrorText: '',
    };
    return o;
  }

  module5.default(u, [
    {
      key: 'componentDidMount',
      value: function () {},
    },
    {
      key: 'UNSAFE_componentWillReceiveProps',
      value: function (t) {
        if (this.props.mapMode != t.mapMode) {
          this.hideCarpetBubble();
          this.hideChargerBubble();
        }
      },
    },
    {
      key: 'UNSAFE_componentWillUpdate',
      value: function (t, s) {
        if (
          t.mapMode == module936.MAP_MODE_GOTO_EDIT &&
          s.target &&
          s.target.x &&
          s.target.y &&
          module377.RobotStatusManager.sharedManager().state == module377.RobotState.GOTO_TARGET
        )
          this.target.setState({
            visible: true,
            position: {
              x: s.target.x,
              y: s.target.y,
            },
          });
        this.currentMap = this._getCurrentMap(t, s);
        if (t.imageOnloadCallback) this._checkMapDiff(s);
      },
    },
    {
      key: 'componentDidUpdate',
      value: function (t, s) {
        if (this.lottieView) this.lottieView.play();
        if (this.lottieCharger) this.lottieCharger.play();
        this.lastStatus = s.robotStatus;
      },
    },
    {
      key: '_checkMapDiff',
      value: function (t) {
        var s = [];
        if (!t.charger || (t.charger && this.mapLoadSources[module1235.shareViewLoadType.ONLOAD_CHARGER])) s.push(module1235.shareViewLoadType.ONLOAD_CHARGER);
        if (undefined === t.carpetMap || t.carpetMap === this.mapLoadSources[module1235.shareViewLoadType.ONLOAD_CARPETMAP]) s.push(module1235.shareViewLoadType.ONLOAD_CARPETMAP);
        if (!this.currentMap || this.currentMap === this.mapLoadSources[module1235.shareViewLoadType.ONLOAD_MAP]) s.push(module1235.shareViewLoadType.ONLOAD_MAP);
        if (t.obstacles && 0 != t.obstacles.length) this.lastObstacles = t.obstacles;
        else s.push(module1235.shareViewLoadType.ONLOAD_OBSTACLE);
        if (s.length > 0) this._imageOnLoaded(s);
      },
    },
    {
      key: '_imageOnLoaded',
      value: function (t) {
        module12.DeviceEventEmitter.emit(module411.NotificationKeys.MapImageLoaded, {
          types: t,
        });
      },
    },
    {
      key: '_getCurrentMap',
      value: function (t, s) {
        var o = s.map;
        if (1 == t.parent.state.inCleanBlockMode) o = s.mapBCBackground;
        else if (
          3 == t.parent.state.inCleanBlockMode ||
          4 == t.parent.state.inCleanBlockMode ||
          (undefined !== t.parent.state.map.data && t.parent.state.map.data.blockNum <= 1) ||
          t.mapMode == module936.MAP_MODE_CARPET_EDIT
        )
          o = s.mapNoBlock;
        return o;
      },
    },
    {
      key: '_isCollectDustDock',
      value: function () {
        return this.props.isCollectDustDock || module377.RSM.isCollectDustDock;
      },
    },
    {
      key: '_isOnyxDock',
      value: function () {
        return module377.RSM.isO1Dock() || module377.RSM.isO2Dock() || module377.RSM.isO3Dock();
      },
    },
    {
      key: '_getChargerResources',
      value: function () {
        var module1331 = {
            name: module491.charger_type_name_normal,
            chargerIcon: require('./1330'),
            chargerBubbleIcon: require('./1331'),
          },
          module1333 = {
            name: module491.charger_type_name_garnet,
            chargerIcon: require('./1332'),
            chargerBubbleIcon: require('./1333'),
          },
          module1335 = {
            name: module491.charger_type_name_collect_dust,
            chargerIcon: require('./1334'),
            chargerBubbleIcon: require('./1335'),
          },
          module1337 = {
            name: module491.charger_type_name_o2,
            chargerIcon: require('./1336'),
            chargerBubbleIcon: require('./1337'),
          },
          module1339 = {
            name: module491.charger_type_name_o3,
            chargerIcon: require('./1338'),
            chargerBubbleIcon: require('./1339'),
          };
        return module415.DMM.isGarnet
          ? module1333
          : module377.RSM.isO1Dock()
          ? module1335
          : module377.RSM.isO2Dock()
          ? module1337
          : module377.RSM.isO3Dock()
          ? module1339
          : module1331;
      },
    },
    {
      key: 'handleChargerClick',
      value: function (t) {
        var s = arguments.length > 1 && undefined !== arguments[1] && arguments[1];
        if (!(t.touches.length > 1))
          this.props.showDockBubbles &&
            (this.props.mapMode != module936.MAP_MODE_REGULAR ||
              this.props.parent.state.inCleanBlockMode ||
              (s && this.state.status != module377.RobotState.CHARGING && this.state.status != module377.RobotState.FULL_CHARGE) ||
              (this.state.showChargerBubble ? this.hideChargerBubble() : this.showChargerBubble()));
      },
    },
    {
      key: 'getCharger',
      value: function () {
        var t = this;
        this.panResponderChargerPress = module12.PanResponder.create({
          onStartShouldSetPanResponder: function () {
            return true;
          },
          onMoveShouldSetPanResponder: function () {
            return true;
          },
          onPanResponderStart: function (s, o) {
            t.handleChargerClick(s.nativeEvent);
          },
          onPanResponderEnd: function (t, s) {},
          onPanResponderMove: function (t, s) {},
          onPanResponderTerminationRequest: function (t, s) {
            return false;
          },
          onPanResponderTerminate: function (t, s) {},
        });
        var s = module1235.Config.size.chargerWidth * this.state.transform.xx,
          n = module1235.Config.size.chargerHeight * this.state.transform.yy;
        return !this.props.hideAccessory && this.state.charger
          ? React.default.createElement(
              module12.Image,
              module21.default(
                {},
                this.panResponderChargerPress.panHandlers,
                {
                  pointerEvents: 'auto',
                },
                module387.default.getAccessibilityLabel('map_charger'),
                {
                  resizeMethod: 'scale',
                  style: {
                    position: 'absolute',
                    width: s,
                    height: n,
                    left: this.charger.x - s / 2 + (s / 2) * 0.5 * Math.cos(this.degreeToRad(-this.charger.angle)),
                    top: this.charger.y - n / 2 + (n / 2) * 0.5 * Math.sin(this.degreeToRad(-this.charger.angle)),
                    transform: [
                      {
                        rotateZ: -1 * this.adjustChargerAngle(this.charger.angle) + 'deg',
                      },
                    ],
                  },
                  source: this._getChargerResources().chargerIcon,
                  onLoad: this.props.imageOnloadCallback
                    ? function (s) {
                        return t.mapSourceOnLoad(s.nativeEvent.source, module1235.shareViewLoadType.ONLOAD_CHARGER);
                      }
                    : null,
                }
              )
            )
          : null;
      },
    },
    {
      key: 'getChargerBubbleView',
      value: function () {
        var t = this,
          s = this._getChargerBubbleCenter();

        return React.default.createElement(module1241.ObjectNameBubble, {
          hasArrow: (this.state.chargerErrorText && this.state.chargerErrorText.length) || this._isOnyxDock(),
          objectName: this.state.chargerErrorText && this.state.chargerErrorText.length ? this.state.chargerErrorText : this._getChargerResources().name,
          objectImage: this.state.chargerErrorText && this.state.chargerErrorText.length ? require('./1340') : this._getChargerResources().chargerBubbleIcon,
          center: s,
          animatedOpacity: this.chargerBubbleOpacity,
          mapDeg: this.props.mapDeg,
          onBubbleLayout: this.handleBubbleLayout,
          onPressBubble: function () {
            if (t.state.chargerErrorText && t.state.chargerErrorText.length) t.handlePressChargerErrorBubble();
            else t.handlePressDockBubble();
          },
        });
      },
    },
    {
      key: 'getChargerForbid',
      value: function () {
        return !this.props.hideAccessory && (this.charger.x || this.charger.y) && this.state.charger && this.props.mapMode == module936.MAP_MODE_MAP_EDIT
          ? React.default.createElement(module12.View, {
              style: {
                position: 'absolute',
                width: module1235.DOCK_FORBIDDEN_R * this.state.transform.xx,
                height: module1235.DOCK_FORBIDDEN_R * this.state.transform.yy * 2,
                left:
                  this.charger.x -
                  (module1235.DOCK_FORBIDDEN_R / 2) * this.state.transform.xx +
                  (module1235.DOCK_FORBIDDEN_R - module1235.Config.size.chargerWidth / 2) * this.state.transform.xx * 0.5 * Math.cos(this.degreeToRad(-this.charger.angle)),
                top:
                  this.charger.y -
                  module1235.DOCK_FORBIDDEN_R * this.state.transform.yy +
                  (module1235.DOCK_FORBIDDEN_R - module1235.Config.size.chargerWidth / 2) * this.state.transform.yy * 0.5 * Math.sin(this.degreeToRad(-this.charger.angle)),
                backgroundColor: '#00000033',
                borderColor: '#add8ff',
                borderWidth: 1,
                borderStyle: 'dashed',
                borderRadius: module1235.DOCK_FORBIDDEN_R * this.state.transform.yy,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                alignItems: 'center',
                overflow: 'hidden',
                transform: [
                  {
                    rotateZ: this.adjustChargerAngle(this.charger.angle) * (module12.I18nManager.isRTL ? 1 : -1) + 'deg',
                  },
                ],
              },
            })
          : null;
      },
    },
    {
      key: 'getChargerWaringAnimation',
      value: function () {
        var t = this;
        if (this.props.hideAccessory) return null;
        if (-1 == [38, 39, 40, 42].indexOf(module377.RSM.errorCode) || !this.charger || !this.charger.x) return null;
        var s = module1235.Config.size.robotRadius * this.state.transform.xx,
          o = module1235.Config.size.robotRadius * this.state.transform.yy;
        return React.default.createElement(
          module12.View,
          {
            pointerEvents: 'none',
            style: {
              position: 'absolute',
              width: 1.75 * s,
              height: 1.75 * o,
              left: this.charger.x - (s / 2) * 1.75,
              top: this.charger.y - (o / 2) * 1.75,
            },
          },
          React.default.createElement(module927.default, {
            ref: function (s) {
              return (t.lottieCharger = s);
            },
            style: {
              width: 1.75 * s,
              height: 1.75 * o,
            },
            source: module1270.anim.Warning,
          })
        );
      },
    },
    {
      key: 'getRobotAnimation',
      value: function () {
        var t = this;
        if (this.props.hideAccessory || undefined === this.state.status || undefined === module377.RobotStatusInMap[this.state.status]) return null;
        var s = module377.RobotStatusInMap[this.state.status];
        if ('Running' === s || null == s || undefined === s) return null;
        if (-1 != [38, 39, 40, 42].indexOf(module377.RSM.errorCode) && this.charger && this.charger.x && this.charging) return null;
        var o = module1235.Config.size.robotRadius * this.state.transform.xx,
          n = module1235.Config.size.robotRadius * this.state.transform.yy;
        React.default.createElement(module12.View, null);
        return 'Sleeping' === s
          ? React.default.createElement(
              module12.View,
              {
                pointerEvents: 'none',
                style: {
                  position: 'absolute',
                  width: 2 * o,
                  height: 2 * n,
                  left: this.robot ? this.robotPos.x + o / 2 - 0.66 * n : o - 0.66 * n,
                  top: this.robot ? this.robotPos.y - n / 2 - 1.33 * n : -1.33 * n,
                },
              },
              React.default.createElement(module927.default, {
                ref: function (s) {
                  return (t.lottieView = s);
                },
                style: {
                  width: 2 * o,
                  height: 2 * n,
                },
                source: module1270.anim[s],
              })
            )
          : React.default.createElement(
              module12.View,
              {
                pointerEvents: 'none',
                style: {
                  position: 'absolute',
                  width: 1.75 * o,
                  height: 1.75 * n,
                  left: this.robot ? this.robotPos.x - (o / 2) * 1.75 : (-o / 2) * 1.75,
                  top: this.robot ? this.robotPos.y - (n / 2) * 1.75 : (-n / 2) * 1.75,
                },
              },
              React.default.createElement(module927.default, {
                ref: function (s) {
                  return (t.lottieView = s);
                },
                style: {
                  width: 1.75 * o,
                  height: 1.75 * n,
                },
                source: module1270.anim[s],
              })
            );
      },
    },
    {
      key: 'getRobot',
      value: function (t) {
        var s = this,
          n = module1235.Config.size.robotRadius * this.state.transform.xx,
          h = module1235.Config.size.robotRadius * this.state.transform.yy,
          l = module415.DMM.robotInMap.image;
        this.panResponderRobotPress = module12.PanResponder.create({
          onStartShouldSetPanResponder: function () {
            return true;
          },
          onMoveShouldSetPanResponder: function () {
            return true;
          },
          onPanResponderStart: function (t, o) {
            s.handleChargerClick(t.nativeEvent, true);
          },
          onPanResponderEnd: function (t, s) {},
          onPanResponderMove: function (t, s) {},
          onPanResponderTerminationRequest: function (t, s) {
            return false;
          },
          onPanResponderTerminate: function (t, s) {},
        });
        return !this.props.hideAccessory
          ? React.default.createElement(
              module12.View,
              module21.default(
                {
                  pointerEvents: 'auto',
                },
                this.panResponderRobotPress.panHandlers,
                module387.default.getAccessibilityLabel('map_robot'),
                {
                  style: {
                    position: 'absolute',
                    overflow: 'visible',
                    left: this.robot ? this.robotPos.x - n / 2 : 0,
                    top: this.robot ? this.robotPos.y - h / 2 : 0,
                    transform: [
                      {
                        rotateZ: -1 * Math.floor(t) + 'deg',
                      },
                    ],
                  },
                }
              ),
              React.default.createElement(module1267, {
                resizeMethod: 'scale',
                source: l,
                style: {
                  width: n,
                  height: h,
                },
              })
            )
          : null;
      },
    },
    {
      key: 'getAnimatedRobot',
      value: function (t, s) {
        var o = this,
          n = !this.props.hideAccessory && this.props.mapMode != module936.MAP_MODE_ZONED_CLEAN_EDIT && this.props.mapMode != module936.MAP_MODE_BLOCK_CLEAN_EDIT && s > 10;
        return React.default.createElement(module1241.AnimatedRobot, {
          pathPoints: this.state.pathPoints ? this.state.pathPoints : [],
          pathData: this.state.pathData,
          transform: this.state.transform,
          robot: this.robotPos,
          width: t,
          height: s,
          showPath: n,
          onPlayFinished: this.props.parent.props.onPathPlaybackFinished,
          ref: function (t) {
            return (o.animatedRobot = t);
          },
        });
      },
    },
    {
      key: 'getForbiddenView',
      value: function (t) {
        var s = this;
        return 1 != this.props.parent.state.inBlockMode && this.props.mapMode != module936.MAP_MODE_CARPET_EDIT
          ? React.default.createElement(module1243.ForbiddenView, {
              ref: function (t) {
                return (s.forbiddenEditView = t);
              },
              mapMode: this.props.mapMode,
              mapDeg: this.props.mapDeg,
              transform: t,
              fbzWalls: this.state.fbzWalls,
              fbzZones: this.state.fbzZones,
              mopZones: this.state.mopZones,
              cleanZones: this.state.cleanZones,
              zonesHasEdited: this.props.zonesHasEdited,
              initFBZone: this.state.initFBZone,
              alwaysShowFBZ: this.props.alwaysShowFBZ,
              handleFBZPanEnd: this.handleFBZPanEnd,
              checkAndroidOverflow: this.handleCheckAndroidOverflow,
              mapEditPageDidChange: this.mapEditPageDidChange,
              getTargetPos: this.getTargetPos,
            })
          : null;
      },
    },
    {
      key: 'getCleanRect',
      value: function (t) {
        var s = this;
        return Object.keys(this.rectReferences).map(function (o, n) {
          return React.default.createElement(module1241.CleanRect, {
            key: n,
            id: o,
            mapDeg: s.props.mapDeg,
            ref: function (t) {
              return (s.rectReferences[o] = t);
            },
            parent: s,
            transform: t,
            handlePanStart: s.handleRectPanStart,
            handlePanEnd: s.handleRectPanEnd,
            checkAndroidOverflow: s.handleCheckAndroidOverflow,
          });
        });
      },
    },
    {
      key: 'getDisplayZonesView',
      value: function () {
        var t = this;
        return 4 == this.props.parent.state.inCleanBlockMode
          ? this.state.displayZones.map(function (s, o) {
              return React.default.createElement(module12.View, {
                key: o,
                pointerEvents: 'none',
                style: {
                  position: 'absolute',
                  left: s.left * t.state.transform.xx,
                  top: s.top * t.state.transform.yy,
                  width: s.width * t.state.transform.xx,
                  height: s.height * t.state.transform.yy,
                  overflow: 'visible',
                  backgroundColor: module1235.buttonConfig.rectBgColor,
                  borderColor: module1235.buttonConfig.rectColorSolid,
                  borderWidth: 1,
                  borderStyle: 'solid',
                },
              });
            })
          : React.default.createElement(module12.View, null);
      },
    },
    {
      key: 'getMapObjects',
      value: function (t, s) {
        var n = [];
        if (undefined !== this.state.obstacles)
          for (var h = 0; h < this.state.obstacles.length; h++) {
            var l = this.state.obstacles[h],
              p = t.point(l[3], l[4]),
              u =
                l.length > 5
                  ? {
                      percent: l[5],
                    }
                  : {},
              c =
                l.length > 5
                  ? {
                      photoId: l[7],
                    }
                  : {},
              b =
                l.length > 5
                  ? {
                      avoidTimes: l[6],
                    }
                  : {},
              v = this.props.showOnlyGeneralObstacles ? 42 : l[2];
            s.push(
              React.default.createElement(
                module1241.MapObjectView,
                module21.default(
                  {
                    ref: function (t) {
                      n.push(t);
                    },
                    key: h,
                    x: p.x,
                    y: p.y,
                    originX: l[0],
                    originY: l[1],
                    type: v,
                  },
                  u,
                  c,
                  b,
                  {
                    transform: t,
                    parent: this,
                    visible: !this.props.hideAccessory && 1 == this.state.showMapObject,
                    showMapObjectName: this.props.mapMode == module936.MAP_MODE_REGULAR,
                    showAsGeneralObject: this.props.showAsGeneralObject,
                    showAsBlackWall: false,
                    showDebugInfo: this.props.showMapObjectDebugInfo,
                    showDeleteButton: this.state.showMapObjectDeleteButton,
                    popBoxType: this.props.obstaclePopBoxType,
                    shouldShowBubbleChecker: this.handleShouldShowBubbleChecker,
                    onPressBubble: this.handlePressObjectBubble,
                    onPressPhotoReminderBubble: this.handlePressPhotoReminderBubble,
                    onPressDelete: this.handlePressObjectDelete,
                    nameViewDidShow: this.handleObjectNameViewDidShow,
                    nameViewDidHide: this.handleObjectNameViewDidHide,
                    mapObjectBubbleDidShow: this.handleMapObjectBubbleDidShow,
                    mapObjectImageOnLoad: this.props.imageOnloadCallback ? this.handleMapObjectImageOnLoad : null,
                    showOnlyGeneralObstacles: this.props.showOnlyGeneralObstacles,
                    mapDeg: this.props.mapDeg,
                  }
                )
              )
            );
          }
        return n;
      },
    },
    {
      key: 'getBlockOperationView',
      value: function (t) {
        var s = this,
          o = 0;
        if (this.props.parent.state.selectBlockList) for (var n = 0; n < this.props.parent.state.selectBlockList.length; n++) o += this.props.parent.state.selectBlockList[n];
        return this.props.showSplitLine && 1 == o
          ? React.default.createElement(module1241.BlockOperation, {
              ref: function (t) {
                return (s.blockOp = t);
              },
              parent: this,
              transform: t,
              mapDeg: this.props.mapDeg,
              mapMode: this.props.mapMode,
              width: this.state.width,
              checkAndroidOverflow: this.handleCheckAndroidOverflow,
            })
          : null;
      },
    },
    {
      key: 'getBlockBubbleView',
      value: function () {
        var t = this,
          s = [];
        if (undefined === this.state.centerInfo) return s;
        var n = this.props.roomBubbleMode;
        if (n == module1241.RoomInfoBubbleMode.None) return s;

        for (
          var h = this.props.parent.props.showAllBubbleInfo,
            l = function (l) {
              var p;
              if (0 == t.state.centerInfo[l].count) return 'continue';
              var u = t.props.parent.state.roomModeList.find(function (t) {
                  return t.id == l;
                }),
                c = u ? u.cleanMode : -1,
                v = u ? u.waterMode : -1,
                y = u ? u.mopMode : -1,
                C = null != (p = null == u ? undefined : u.mopTemplateId) ? p : -1;

              if (n == module1241.RoomInfoBubbleMode.Home) {
                c = module377.RSM.isCustomCleanMode() ? c : -1;
                v = module377.RSM.isCustomWaterMode() ? v : -1;
                y = module377.RSM.isCustomMopMode() ? y : -1;
              }

              var w = t.state.centerInfo[l].x / t.state.centerInfo[l].count,
                E = t.state.centerInfo[l].y / t.state.centerInfo[l].count,
                x = t.state.centerInfo[l].minX * t.state.transform.xx,
                O = t.state.centerInfo[l].maxX * t.state.transform.xx - x,
                D = t.mapOriginXYToScreen({
                  x: w,
                  y: E,
                }),
                A = '';
              if (0 != t.props.parent.state.roomNameList.length && -1 != t.props.parent.state.roomNameList[l][1]) A = t.props.parent.state.roomNameList[l][1];
              A = undefined === A ? '' : A;
              var P = -1;

              if (t.props.parent.state.inBlockMode && t.props.parent.state.blockBubbleShowInfo & module1235.BlockBubbleShowInfo.CLEANSEQUENCE) {
                for (var B = 0; B < t.props.parent.blockSequenceList.length; B++)
                  if (t.props.parent.blockSequenceList[B] == l) {
                    P = B + 1;
                    break;
                  }
              } else
                for (var S = 0; S < t.props.parent.state.blockSequenceInfo.length; S++)
                  if (t.props.parent.state.blockSequenceInfo[S] == l) {
                    P = S + 1;
                    break;
                  }

              P = n == module1241.RoomInfoBubbleMode.EditArea ? -1 : P;
              var T = !!t.props.blockCanEdit && t.props.parent.state.selectBlockList[l],
                L = !T && h,
                F = L ? x : x + (O - X) / 2,
                I = L ? O : X;
              if (module415.DMM.isTanosSC) v = null;
              s.push(
                React.default.createElement(
                  module12.View,
                  {
                    pointerEvents: 'none',
                    key: l,
                    style: [
                      Q.roomBubbleView,
                      {
                        left: F,
                        top: D.y - 17,
                        width: I,
                        transform: [
                          {
                            rotateZ: -1 * t.props.mapDeg + 'deg',
                          },
                          {
                            translateX: 0,
                          },
                        ],
                      },
                    ],
                  },
                  React.default.createElement(
                    module1241.RoomInfoBubble,
                    module21.default({}, module387.default.getAccessibilityLabel('room_info_bubble'), {
                      isSelected: 1 == T,
                      sequenceID: -1 == P ? '' : P.toString(),
                      roomColor: t.colorOfRoom(l),
                      cleanMode: c,
                      waterMode: v,
                      mopMode: y,
                      mopTemplateId: C,
                      displayMode: n,
                      roomName: A,
                      maxWidth: O,
                    })
                  )
                )
              );
            },
            p = 1;
          p < this.state.centerInfo.length;
          p++
        )
          l(p);

        return s;
      },
    },
    {
      key: 'getBlockMapsView',
      value: function (t) {
        var s = [];
        if (undefined === this.props.parent.state.map.mapList) return s;
        if (this.props.blockCanEdit)
          for (var o = 0; o < this.props.parent.state.selectBlockList.length; o++)
            if (0 != this.props.parent.state.selectBlockList[o]) {
              var n = o + '',
                h = this.props.parent.state.map.mapList[n];
              if (undefined !== h)
                s.push(
                  React.default.createElement(module1267, {
                    key: o,
                    pointerEvents: 'none',
                    layerScaleFilter: 'Nearest',
                    style: t,
                    source: {
                      uri: h,
                    },
                  })
                );
            }
        if (1 == this.props.parent.state.inCleanBlockMode && 0 != this.props.parent.state.blockSequenceListReadOnly.length)
          for (var l = 0; l < this.props.parent.state.selectBlockList.length; l++)
            if (0 != this.props.parent.state.selectBlockListReadOnly[l]) {
              var p = l + '',
                u = this.props.parent.state.map.mapList[p];
              if (undefined !== u)
                s.push(
                  React.default.createElement(module1267, {
                    key: l,
                    pointerEvents: 'none',
                    layerScaleFilter: 'Nearest',
                    style: t,
                    source: {
                      uri: u,
                    },
                  })
                );
            }
        if (
          1 == this.props.parent.state.inCleanBlockMode &&
          undefined !== this.state.blockInClean &&
          this.state.blockInClean.length &&
          0 == this.props.parent.state.blockSequenceListReadOnly.length
        )
          for (var c = 0; c < this.state.blockInClean.length; c++) {
            var b = this.state.blockInClean[c] + '',
              v = this.props.parent.state.map.mapList[b];
            if (undefined !== v)
              s.push(
                React.default.createElement(module1267, {
                  key: c,
                  pointerEvents: 'none',
                  layerScaleFilter: 'Nearest',
                  style: t,
                  source: {
                    uri: v,
                  },
                })
              );
          }
        return s;
      },
    },
    {
      key: 'getCarpetMapView',
      value: function (t) {
        var s = this,
          o = this.state.carpetMap;
        if (undefined === o) return null;
        var n = React.default.createElement(module1267, {
            pointerEvents: 'none',
            layerScaleFilter: 'Nearest',
            style: t,
            source: {
              uri: o,
            },
            onLoad: this.props.imageOnloadCallback
              ? function (t) {
                  return s.mapSourceOnLoad(t.nativeEvent.source, module1235.shareViewLoadType.ONLOAD_CARPETMAP);
                }
              : null,
          }),
          h = React.default.createElement(module12.Image, {
            pointerEvents: 'none',
            style: t,
            source: {
              uri: o,
            },
            onLoad: this.props.imageOnloadCallback
              ? function (t) {
                  return s.mapSourceOnLoad(t.nativeEvent.source, module1235.shareViewLoadType.ONLOAD_CARPETMAP);
                }
              : null,
          });
        return (
          React.default.createElement(
            module12.View,
            module387.default.getAccessibilityLabel('map_carpet'),
            this.state.transform.xx < 1.2 && 'android' != module12.Platform.OS ? h : n
          ) || null
        );
      },
    },
    {
      key: 'getFloorMapView',
      value: function (t) {
        var s = this.state.floorMap;
        return undefined === s || undefined === s.image || '' == s.image
          ? null
          : React.default.createElement(module1267, {
              pointerEvents: 'none',
              layerScaleFilter: 'Nearest',
              style: t,
              source: {
                uri: s.image,
              },
            });
      },
    },
    {
      key: 'getCarpetBubbleView',
      value: function () {
        var t = this._getCarpetBubbleCenter();

        return t
          ? React.default.createElement(module1241.ObjectNameBubble, {
              funcId: 'map_carpet_bubble',
              objectName: module491.carpet_bubble_name,
              objectImage: module1328,
              center: t,
              topOffset: 10,
              transform: this.state.transform,
              textWidth: 70,
              animatedOpacity: this.carpetBubbleOpacity,
              mapDeg: this.props.mapDeg,
              onBubbleLayout: this.handleBubbleLayout,
              onPressBubble: this.handlePressCarpetBubble,
            })
          : null;
      },
    },
    {
      key: 'getCleanPath',
      value: function (t, s, o) {
        var n = null;
        if (this.state.pathGotoPlan && '' != this.state.pathGotoPlan)
          n = React.default.createElement(F, {
            transform: 'android' != module12.Platform.OS || z ? o : null,
            stroke: this.color.pathGotoPlan,
            strokeWidth: 1,
            strokeDash: 'android' == module12.Platform.OS ? [5, 10] : [2, 2],
            d: this.state.pathGotoPlan,
          });
        var h = null;
        if (this.state.path && '' != this.state.path)
          h = React.default.createElement(F, {
            transform: 'android' != module12.Platform.OS || z ? o : null,
            stroke: this.context.theme.map.pathColor,
            strokeWidth: 0.5,
            d: this.state.path,
          });
        var l = null;
        if (this.state.mopPath && '' != this.state.mopPath)
          l = React.default.createElement(module1266.RRShape, {
            transform: 'android' != module12.Platform.OS || z ? o : null,
            stroke: this.context.theme.map.mopPathColor,
            strokeWidth: 6.5,
            strokeOverlay: true,
            d: this.state.mopPath,
          });
        var p = null;
        if (this.state.backWashPath && '' != this.state.backWashPath)
          p = React.default.createElement(F, {
            transform: 'android' != module12.Platform.OS || z ? o : null,
            stroke: this.context.theme.map.backWashPathColor,
            strokeWidth: 0.5,
            strokeDash: 'android' == module12.Platform.OS ? [4, 8] : [1.5, 1.5],
            d: this.state.backWashPath,
          });
        return React.default.createElement(
          W,
          {
            width: t,
            height: s,
            style: Q.pathContainer,
          },
          n,
          l,
          h,
          p
        );
      },
    },
    {
      key: 'getCarpetEditView',
      value: function (t) {
        var s = this;
        return React.default.createElement(module1243.CarpetsView, {
          ref: function (t) {
            return (s.carpetEditView = t);
          },
          mapRect: {
            width: this.state.width,
            height: this.state.height,
          },
          mapMode: this.props.mapMode,
          subCarpetMode: this.props.subCarpetMode,
          mapDeg: this.props.mapDeg,
          transform: t,
          cfbZones: this.state.cfbZones,
          ignoreCarpetEdited: this.props.ignoreCarpetEdited,
          cusCarpetZones: this.state.cusCarpetZones,
          cusCarpetEdited: this.props.cusCarpetEdited,
          initFBZone: this.state.initFBZone,
          handleFBZPanEnd: this.handleFBZPanEnd,
          checkAndroidOverflow: this.handleCheckAndroidOverflow,
          mapEditPageDidChange: this.mapEditPageDidChange,
          mapCarpetFocusCallback: this.props.mapCarpetFocusCallback,
        });
      },
    },
    {
      key: 'getFurnitureView',
      value: function (t) {
        var s = this;
        return 1 != this.props.parent.state.inBlockMode && this.props.mapMode != module936.MAP_MODE_CARPET_EDIT
          ? React.default.createElement(module1243.FurnitureView, {
              ref: function (t) {
                return (s.furnitureView = t);
              },
              mapMode: this.props.mapMode,
              mapDeg: this.props.mapDeg,
              parent: this,
              transform: t,
              furnitures: this.state.furnitures,
              zonesHasEdited: this.props.zonesHasEdited,
              checkAndroidOverflow: this.handleCheckAndroidOverflow,
              mapEditPageDidChange: this.mapEditPageDidChange,
              eidtCountChange: this.props.eidtCountChange,
            })
          : null;
      },
    },
    {
      key: 'render',
      value: function () {
        var t = this,
          s = new I({
            xx: this.state.transform.xx,
            yy: this.state.transform.yy,
          }),
          n = [this.state.width * (s.xx || 1), this.state.height * (s.yy || 1)],
          h = n[0],
          l = n[1];

        if (
          ((this.charging =
            (this.state.status === module377.RobotState.CHARGING ||
              this.state.status === module377.RobotState.FULL_CHARGE ||
              this.state.status === module377.RobotState.UPDATING ||
              this.state.status === module377.RobotState.COLLECTING_DUST ||
              this.state.status === module377.RobotState.WASHING_DUSTER) &&
            this.state.charger),
          (this.charger = this.state.charger
            ? module21.default(s.point(this.state.charger.x, this.state.charger.y), {
                angle: this.state.charger.angle,
              })
            : {
                x: 0,
                y: 0,
                angle: 0,
              }),
          (this.robot = h && l && this.state.robot ? s.point(this.state.robot.x, this.state.robot.y) : s.point(50, 50)),
          (this.robotAngle = h && l && this.state.robotAngle ? this.state.robotAngle : 0),
          this.charging && this.state.charger)
        ) {
          var p = this.state.status === module377.RobotState.WASHING_DUSTER ? 180 : 0;
          this.robotAngle = this.adjustChargerAngle(this.charger.angle) + module415.DMM.robotInMap.chargerAngle + p;
        }

        this.robotPos = (this.charging && this.charger) || this.robot;
        var u = module1235.Config.size.robotDiameter * this.state.transform.xx;

        if (this.charging && this.charger) {
          var c = {
            x: 0.5 * (u - 10) * Math.cos(this.degreeToRad(-this.adjustChargerAngle(this.charger.angle))),
            y: 0.5 * (u - 10) * Math.sin(this.degreeToRad(-this.adjustChargerAngle(this.charger.angle))),
          };
          this.robotPos = {
            x: this.robotPos.x + c.x,
            y: this.robotPos.y + c.y,
          };
        }

        var v = {
            overflow: 'visible',
            position: 'absolute',
            top: 0,
            left: 0,
            width: h,
            height: l,
          },
          y = this.getBlockMapsView(v),
          R = this.getFloorMapView(v),
          w = this.getCarpetMapView(v),
          E = [];
        this.mapObjectRefs = this.getMapObjects(s, E);
        var x = this.getCleanPath(h, l, s),
          O = this.getForbiddenView(s),
          D = this.getCarpetEditView(s),
          P = this.getFurnitureView(s),
          B = this.props.mapMode == module936.MAP_MODE_REGULAR,
          S = !this.props.hideAccessory && this.props.mapMode != module936.MAP_MODE_ZONED_CLEAN_EDIT && this.props.mapMode != module936.MAP_MODE_BLOCK_CLEAN_EDIT && l > 10,
          T = this.props.mapMode == module936.MAP_MODE_CARPET_EDIT;
        if (!module386.default.SupportOverflowTouch()) this.mapRotatePadding = B ? 160 : 100 * this.state.transform.xx;
        var L = 'android' == module12.Platform.OS && this.props.mapInPan;
        return React.default.createElement(
          module12.View,
          {
            pointerEvents: L ? 'none' : 'box-none',
            style: [
              Q.container,
              {
                left: this.state.transform.x,
                top: this.state.transform.y,
                width: h + 2 * this.mapRotatePadding,
                height: l + 2 * this.mapRotatePadding,
              },
              module386.default.shouldRotateMap() && {
                transform: [
                  {
                    rotateZ: this.props.mapDeg + 'deg',
                  },
                  {
                    translateX: 0,
                  },
                ],
              },
            ],
          },
          React.default.createElement(
            module12.View,
            {
              pointerEvents: 'box-none',
              style: {
                width: h,
                height: l,
              },
            },
            React.default.createElement(
              module12.View,
              module21.default(
                {
                  pointerEvents: 'none',
                  style: Q.mapContainer,
                },
                module387.default.getAccessibilityLabel('map_image_view')
              ),
              React.default.createElement(
                module1267,
                {
                  pointerEvents: 'none',
                  layerScaleFilter: 'Nearest',
                  source: this.currentMap
                    ? {
                        uri: this.currentMap,
                      }
                    : null,
                  style: Q.mapImage,
                  onLoad: this.props.imageOnloadCallback
                    ? function (s) {
                        return t.mapSourceOnLoad(s.nativeEvent.source, module1235.shareViewLoadType.ONLOAD_MAP);
                      }
                    : null,
                },
                y,
                R,
                w,
                !T && D,
                !this.props.parent.props.shouldShowRobotMovingAnimation && S && x
              )
            ),
            this.getDisplayZonesView(),
            this.getChargerWaringAnimation(),
            this.getCharger(),
            this.getChargerForbid(),
            this.getRobotAnimation(),
            this.props.parent.props.shouldShowRobotMovingAnimation ? this.getAnimatedRobot(h, l) : this.getRobot(this.robotAngle),
            !B && E,
            O,
            T && D,
            P,
            this.getBlockBubbleView(),
            this.getBlockOperationView(s),
            this.getCleanRect(s),
            React.default.createElement(module1329, {
              ref: function (s) {
                return (t.target = s);
              },
              transform: s,
              mapDeg: this.props.mapDeg,
              onLongPress: function () {
                t.props.parent.targetDroped = true;
              },
            }),
            B && E,
            this.state.showCarpetBubble && this.getCarpetBubbleView(),
            this.state.showChargerBubble && this.getChargerBubbleView()
          )
        );
      },
    },
    {
      key: 'clearRectFocus',
      value: function () {
        for (var t = 1; t <= module1235.MAX_COUNT_WALL_OR_FBZ; t++) {
          var s;
          if (!(null == (s = this.rectReferences[t])))
            s.setState({
              isFocus: false,
            });
        }
      },
    },
    {
      key: 'addRectangle',
      value: function () {
        for (
          var t = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : null, s = this._getVisibleZonesCount(this.rectReferences), o = 1;
          o <= module1235.MAX_COUNT_WALL_OR_FBZ;
          o++
        )
          if (this.rectReferences[o] && 0 == this.rectReferences[o].state.visible && this.rectReferences[o].state.serial == s + 1) {
            var n = this.degreeToRad(-1 * this.props.mapDeg);
            if (t) n = 0;
            else t = this._getDefaultMapZonesArea(o);
            if (this.rectReferences[o])
              this.rectReferences[o].setState({
                visible: true,
                rectSize: t,
                slopeAngle: n || 0,
              });

            this._setMapZonesFocus(this.rectReferences, o);

            if (this.props.parent.props.selectedRectDidChange) this.props.parent.props.selectedRectDidChange(s + 1);
            return true;
          }

        return false;
      },
    },
    {
      key: 'removeRectangle',
      value: function (t) {
        if (this.rectReferences[t].state.visible) {
          var s = this._getVisibleZonesCount(this.rectReferences);

          this.clearRectFocus();
          if (this.rectReferences[t])
            this.rectReferences[t].setState({
              visible: false,
            });

          for (var o = 1; o <= module1235.MAX_COUNT_WALL_OR_FBZ; o++)
            this.rectReferences[o] &&
              this.rectReferences[o].state.visible &&
              this.rectReferences[o].state.serial > this.rectReferences[t].state.serial &&
              this.rectReferences[o] &&
              this.rectReferences[o].setState({
                serial: this.rectReferences[o].state.serial - 1,
              });

          if (this.rectReferences[t])
            this.rectReferences[t].setState({
              serial: s,
            });
          if (this.props.parent.props.selectedRectDidChange) this.props.parent.props.selectedRectDidChange(s - 1);
        }
      },
    },
    {
      key: 'removeAllRects',
      value: function () {
        for (var t = 5; t >= 1; t--) {
          var s;
          if (!(null == (s = this.rectReferences[t]))) s.reInitRender(t);
        }
      },
    },
    {
      key: 'hasRects',
      value: function () {
        return this._getVisibleZonesCount(this.rectReferences) > 0;
      },
    },
    {
      key: 'setRectsMode',
      value: function (t) {
        for (var s = 1; s <= module1235.MAX_COUNT_WALL_OR_FBZ; s++)
          this.rectReferences[s] &&
            this.rectReferences[s].setState({
              cleanMode: t,
            });
      },
    },
    {
      key: 'isWallReachMaxNum',
      value: function () {
        var t;
        return null == (t = this.forbiddenEditView) ? undefined : t.isWallsReachMaxNum();
      },
    },
    {
      key: 'removeWall',
      value: function (t) {
        var s;
        if (!(null == (s = this.forbiddenEditView))) s.removeWall(t);
      },
    },
    {
      key: 'addWall',
      value: function () {
        var t,
          s = null == (t = this.forbiddenEditView) ? undefined : t.getNewWallIndex();

        if (s > 0) {
          var o,
            h = this._getDefaultWallPos(s),
            l = module22.default(h, 2),
            p = l[0],
            u = l[1];

          if (!(null == (o = this.forbiddenEditView))) o.addWall(s, p, u);
        }
      },
    },
    {
      key: 'clearWallsNewAddedFlag',
      value: function () {
        var t;
        if (!(null == (t = this.forbiddenEditView))) t.clearWallsNewAddedFlag();
      },
    },
    {
      key: 'clearWallFocus',
      value: function () {
        var t;
        if (!(null == (t = this.forbiddenEditView))) t.clearWallFocus();
      },
    },
    {
      key: 'getVisibleWalls',
      value: function () {
        var t;
        return (null == (t = this.forbiddenEditView) ? undefined : t.getVisibleWalls()) || [];
      },
    },
    {
      key: 'isFBZReachMaxNum',
      value: function (t) {
        var s;
        return null == (s = this.forbiddenEditView) ? undefined : s.isFBZsReachMaxNum(t);
      },
    },
    {
      key: 'addFBZoneNew',
      value: function (t) {
        var s,
          o = null == (s = this.forbiddenEditView) ? undefined : s.getNewRectIndex(t);

        if (o > 0) {
          var n,
            h = this.degreeToRad(-1 * this.props.mapDeg),
            l = this._getDefaultMapZonesArea(o);

          if (!(null == (n = this.forbiddenEditView))) n.addFBZZones(o, l, h, t);
        }
      },
    },
    {
      key: 'clearFBZonesFocus',
      value: function (t) {
        var s;
        if (!(null == (s = this.forbiddenEditView))) s.clearFBZonesFocus(t);
      },
    },
    {
      key: 'clearFBZonesNewAddedFlag',
      value: function (t) {
        var s;
        if (!(null == (s = this.forbiddenEditView))) s.clearFBZonesNewAddedFlag(t);
      },
    },
    {
      key: 'getVisibleFBZZones',
      value: function () {
        var t;
        return (null == (t = this.forbiddenEditView) ? undefined : t.getVisibleFBZZones()) || [];
      },
    },
    {
      key: 'isFBZEditZonesReachMaxNum',
      value: function () {
        var t;
        return null == (t = this.forbiddenEditView) ? undefined : t.isAllZonesReachMaxNum();
      },
    },
    {
      key: 'checkAllInChargerOrRobot',
      value: function () {
        var t;
        return null == (t = this.forbiddenEditView) ? undefined : t.checkAllInChargerOrRobot();
      },
    },
    {
      key: 'clearAllFBZEditFocus',
      value: function () {
        var t;
        return null == (t = this.forbiddenEditView) ? undefined : t.clearAllFBZEditFocus();
      },
    },
    {
      key: 'clearAllNewAddedFBZFlag',
      value: function () {
        var t;
        return null == (t = this.forbiddenEditView) ? undefined : t.clearAllNewAddedFBZFlag();
      },
    },
    {
      key: 'addCarpetFBZoneByClick',
      value: function (t) {
        this.setCarpetPos(t);
        var s,
          o = this.getRealRectForCarpet();
        return (
          !!o &&
          (this.isCarpetReachMaxNum(false)
            ? (globals.showToast(module491.map_edit_carpet_zone_exceed_limit), false)
            : (null == (s = this.carpetEditView) || s.addCarpetZones(o, 0, false), true))
        );
      },
    },
    {
      key: 'addCarpetEditZone',
      value: function (t) {
        var s,
          o = this._getDefaultMapZonesArea(),
          n = this.degreeToRad(-1 * this.props.mapDeg);

        if (!(null == (s = this.carpetEditView))) s.addCarpetZones(o, n, t);
      },
    },
    {
      key: 'clearCarpetEditZones',
      value: function (t) {
        var s;
        if (!(null == (s = this.carpetEditView) || null == s.clearCarpetZonesFocus)) s.clearCarpetZonesFocus(t);
      },
    },
    {
      key: 'getVisibleCarpetZones',
      value: function (t) {
        var s;
        return (null == (s = this.carpetEditView) ? undefined : s.getVisibleCarpetZones(t)) || [];
      },
    },
    {
      key: 'isCarpetReachMaxNum',
      value: function (t) {
        var s;
        return null == (s = this.carpetEditView) ? undefined : s.isCarpetEditZonesMax(t);
      },
    },
    {
      key: 'isCustomCarpetOverflow',
      value: function () {
        var t;
        return null == (t = this.carpetEditView) ? undefined : t.isCustomCarpetOverflow();
      },
    },
    {
      key: 'isEditCarpetOverlap',
      value: function (t) {
        var s;
        return null == (s = this.carpetEditView) ? undefined : s.isEditCarpetOverlap(t);
      },
    },
    {
      key: 'handleShowCarpetBubbleGuide',
      value: function () {
        this.carpetArea = this.getCarpetRectByIndex();
        if (this.carpetArea) this.showCarpetBubble();
      },
    },
    {
      key: 'setCarpetPos',
      value: function (t) {
        this.carpetPos = t;
      },
    },
    {
      key: 'handleShowCarpetBubble',
      value: function (t) {
        this.setCarpetPos(t);
        this.carpetArea = this.getRealRectForCarpet();
        if (!this.carpetArea) this.carpetArea = this.getRectForCustomCarpet();

        if (this.carpetArea) {
          this.showCarpetBubble();
          if (this.props.mapMode == module936.MAP_MODE_ZONED_CLEAN_EDIT && !this.addRectangle(this.carpetArea)) globals.showToast(module491.rubys_main_zone_max_tips);
        } else this.hideCarpetBubble();
      },
    },
    {
      key: 'hideCarpetBubble',
      value: function () {
        var t = this;
        if (this.carpetTimer) module1249.clearTimeout(this.carpetTimer);
        if (this.state.showCarpetBubble)
          module12.Animated.timing(this.carpetBubbleOpacity, {
            toValue: 0,
            duration: 200,
          }).start(function () {
            t.setState({
              showCarpetBubble: false,
            });
          });
      },
    },
    {
      key: 'showCarpetBubble',
      value: function () {
        var t = this;
        this.setState(
          {
            showCarpetBubble: true,
          },
          function () {
            module12.Animated.timing(t.carpetBubbleOpacity, {
              toValue: 1,
              duration: 500,
            }).start(function () {
              t.moveMapIfNeeded();
            });
          }
        );
        if (this.carpetTimer) module1249.clearTimeout(this.carpetTimer);
        this.carpetTimer = module1249.setTimeout(this.hideCarpetBubble.bind(this), 5e3);
      },
    },
    {
      key: 'moveMapIfNeeded',
      value: function (t, s) {
        if (!this.isRotated()) {
          var o = t && t.width ? t.width : 70;

          if (!s) {
            var n = this.transMapCarpetRectToReal(this.carpetArea);
            s = n.x + n.width / 2;
          }

          var h = this.props.parent._translateXYFromMap(
              {
                x: s,
                y: 0,
              },
              this.state.transform
            ),
            l = 0,
            p = o / 2 + 40;

          if (h.x < p) l = p - h.x;
          if (h.x > X - p) l = X - h.x - p;
          if (l) this.props.parent.moveMap(l, 0);
        }
      },
    },
    {
      key: 'moveMapToRectCenter',
      value: function (t) {
        var s;

        if (t) {
          var o = t.x + t.width / 2,
            h = t.y + t.height / 2,
            l = this.state.width / 2,
            p = this.state.height / 2,
            u = l - o,
            c = p - h;

          if (this.isRotated()) {
            var f = module1247._parseDegPoint(u, c, -1 * this.props.mapDeg),
              b = module22.default(f, 2),
              v = b[0],
              y = p + b[1];

            u = l + v - this.state.width / 2;
            c = y - this.state.height / 2;
          }

          if (!(null == (s = this.props.parent) || null == s.moveMapTo)) s.moveMapTo(u * this.state.transform.xx, c * this.state.transform.yy);
        }
      },
    },
    {
      key: 'hideChargerBubble',
      value: function () {
        var t = this;
        if (this.chargerTimer) module1249.clearTimeout(this.chargerTimer);
        if (this.state.showChargerBubble)
          module12.Animated.timing(this.chargerBubbleOpacity, {
            toValue: 0,
            duration: 200,
          }).start(function () {
            t.setState({
              showChargerBubble: false,
              chargerErrorText: '',
            });
          });
      },
    },
    {
      key: 'showChargerBubble',
      value: function (t) {
        var s = this,
          o = {};
        if (t && t.length)
          o = {
            chargerErrorText: t,
          };
        this.setState(
          B(
            {
              showChargerBubble: true,
            },
            o
          ),
          function () {
            module12.Animated.timing(s.chargerBubbleOpacity, {
              toValue: 1,
              duration: 500,
            }).start(function () {
              s.hideAllMapObjects();
              s.hideCarpetBubble();
            });
          }
        );
        if (!(t && t.length)) this.chargerTimer = module1249.setTimeout(this.hideChargerBubble.bind(this), 5e3);
      },
    },
    {
      key: '_getCarpetBubbleCenter',
      value: function () {
        if (!this.carpetArea || !this.carpetArea.realX) return null;
        var t = this.props.mapMode != module936.MAP_MODE_ZONED_CLEAN_EDIT ? this.carpetArea.realX : this.carpetArea.x,
          s = this.props.mapMode != module936.MAP_MODE_ZONED_CLEAN_EDIT ? this.carpetArea.realY : this.carpetArea.y,
          o = this.props.mapMode != module936.MAP_MODE_ZONED_CLEAN_EDIT ? this.carpetArea.realW : this.carpetArea.width,
          n = this.props.mapMode != module936.MAP_MODE_ZONED_CLEAN_EDIT ? this.carpetArea.realH : this.carpetArea.height,
          h = this.carpetArea.x + this.carpetArea.width / 2,
          l = this.carpetArea.y + this.carpetArea.height / 2,
          p = {
            x: h,
            y: s,
          };

        if (this.props.mapDeg) {
          var u = this.props.mapDeg % 360;
          p =
            90 === u || -270 === u
              ? {
                  x: t,
                  y: l,
                }
              : 180 === u || -180 === u
              ? {
                  x: h,
                  y: s + n + 10,
                }
              : 270 === u || -90 === u
              ? {
                  x: t + o,
                  y: l,
                }
              : {
                  x: h,
                  y: l,
                };
        }

        return p;
      },
    },
    {
      key: '_getChargerBubbleCenter',
      value: function () {
        var t = this.charging ? this.robotPos.x : this.charger.x,
          s = this.charging ? this.robotPos.y : this.charger.y,
          o = (module1235.Config.size.robotRadius * (this.state.transform.yy || 1)) / 2,
          n = {
            x: t,
            y: s - o,
          };

        if (this.props.mapDeg) {
          var h = this.props.mapDeg % 360;
          n =
            90 === h || -270 === h
              ? {
                  x: t - o,
                  y: s,
                }
              : 180 === h || -180 === h
              ? {
                  x: t,
                  y: s + o,
                }
              : 270 === h || -90 === h
              ? {
                  x: t + o,
                  y: s,
                }
              : {
                  x: t,
                  y: s,
                };
        }

        return n;
      },
    },
    {
      key: 'playRobotAnimation',
      value: function () {
        if (this.animatedRobot) this.animatedRobot.play();
      },
    },
    {
      key: 'pauseRobotAnimation',
      value: function () {
        if (this.animatedRobot) this.animatedRobot.pause();
      },
    },
    {
      key: 'stopRobotAnimation',
      value: function () {
        if (this.animatedRobot) this.animatedRobot.stop();
      },
    },
    {
      key: 'setRobotMovingSpeed',
      value: function (t) {
        if (this.animatedRobot) this.animatedRobot.setSpeed(t);
      },
    },
    {
      key: '_getVisibleZonesCount',
      value: function (t) {
        for (var s = 0, o = 1; o <= module1235.MAX_COUNT_WALL_OR_FBZ; o++) t[o] && t[o].state.visible && s++;

        return s;
      },
    },
    {
      key: '_setMapZonesFocus',
      value: function (t, s) {
        for (var o = 1; o <= module1235.MAX_COUNT_WALL_OR_FBZ; o++)
          o == s
            ? t[o] &&
              t[o].setState({
                isFocus: true,
              })
            : t[o] &&
              t[o].setState({
                isFocus: false,
              });
      },
    },
    {
      key: '_getDefaultMapZonesArea',
      value: function () {
        var t = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : -1,
          s = this.props.parent.getMapViewHeight() / 2;
        s -= module1235.DEFAULT_FBZ_REALHEIGHT / 2;
        var o = -1 != t ? ((t - 1) * module1235.DEFAULT_RECT_MARGIN) / 2 : 0,
          n = {
            x: module1235.RectConfig.initSize.x + o,
            y: s + o,
          },
          h = {
            width: this.justifyRealSize(module1235.DEFAULT_FBZ_REALWIDTH),
            height: this.justifyRealSize(module1235.DEFAULT_FBZ_REALHEIGHT),
          };
        return this._convertDefaultZonesArea(n, h);
      },
    },
    {
      key: '_convertDefaultZonesArea',
      value: function (t, s) {
        var module21,
          n = this.state.transform.xx || 1,
          h = this.state.transform.yy || 1;

        if (this.isRotated()) {
          var l = {
              width: s.width * n,
              height: s.height * h,
            },
            p = {
              x: t.x + l.width / 2,
              y: t.y + l.height / 2,
            };
          module21 = {
            x: (module21 = this.props.parent._translateXY(p)).x / n - s.width / 2,
            y: module21.y / h - s.height / 2,
          };
        } else
          module21 = {
            x: (module21 = this.props.parent._translateXY(t)).x / n,
            y: module21.y / h,
          };

        var u = (this._getEdgeCheckPadding() - 35) / this.state.transform.xx - s.width / 2,
          c = {
            x: module21.x + s.width / 2,
            y: module21.y + s.height / 2,
          };
        c.x = (c.x ** (-1 * u)) ** (this.state.width + u);
        c.y = (c.y ** (-1 * u)) ** (this.state.height + u);
        module21 = {
          x: c.x - s.width / 2,
          y: c.y - s.height / 2,
        };
        return B(B({}, s), module21);
      },
    },
    {
      key: '_getFurnitureDefaultArea',
      value: function (t) {
        module12.Dimensions.get('window');
        var s = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : null,
          o = module1235.FurnitureSize[t],
          n = o ? o.maxWidth : module1235.FurnitureSize[module1235.FurnitureType.FT_BED].maxWidth,
          h = o ? o.maxHeight : module1235.FurnitureSize[module1235.FurnitureType.FT_BED].maxHeight,
          l = {
            width: n,
            height: h,
          },
          p = {
            x: (s ? s.x : module12.Dimensions.get('window').width / 2) - (n * this.state.transform.xx) / 2,
            y: (s ? s.y : this.props.parent.getMapViewHeight() / 2) - (h * this.state.transform.yy) / 2,
          };
        return this._convertDefaultZonesArea(p, l);
      },
    },
    {
      key: '_getDefaultWallPos',
      value: function (t) {
        var s = this.props.parent.getMapViewHeight() / 2,
          o = ((t - 1) * module1235.DEFAULT_RECT_MARGIN) / 2,
          n = {
            x: module1235.wallConfig.initSize.start_x + o,
            y: s + o,
          },
          h = this.justifyRealSize(module1235.DEFAULT_FBZ_REALWIDTH),
          l = this.props.parent._translateXY(n);

        l = {
          x: l.x / (this.state.transform.xx || 1),
          y: l.y / (this.state.transform.yy || 1),
        };
        var p = (this._getEdgeCheckPadding() - 45) / this.state.transform.xx;
        l.x = (l.x ** (-1 * p)) ** (this.state.width + p);
        l.y = (l.y ** (-1 * p)) ** (this.state.height + p);
        var u = {
          x: l.x + h * Math.cos(this.degreeToRad(this.props.mapDeg)),
          y: l.y - h * Math.sin(this.degreeToRad(this.props.mapDeg)),
        };
        u.x = (u.x ** (-1 * p)) ** (this.state.width + p);
        u.y = (u.y ** (-1 * p)) ** (this.state.height + p);
        return [B({}, l), u];
      },
    },
    {
      key: 'getCarpetRectByIndex',
      value: function () {
        if (-1 === this.state.carpetFirstIndex) return null;
        var t = this.state.carpetFirstIndex,
          s = this.convertIndexToPos(t),
          o = this.getMaxCarpetRect(s, t);
        return (
          o ||
          B(
            {
              width: this.justifyRealSize(module1235.DEFAULT_FBZ_REALWIDTH),
              height: this.justifyRealSize(module1235.DEFAULT_FBZ_REALHEIGHT),
            },
            s
          )
        );
      },
    },
    {
      key: 'getRealRectForCarpet',
      value: function () {
        if (undefined === this.state.carpetMap || undefined === this.state.carpetData) return null;
        var t = this.carpetPos;
        if (!this._isAvailablePosition(t)) return null;
        var s = {
            x: Math.floor(t.x / this.state.transform.xx),
            y: Math.floor(t.y / this.state.transform.yy),
          },
          o = this.convertPosToIndex(s);
        if (this.state.carpetData && (o > this.state.carpetData.length - 1 || 0 == this.state.carpetData[o])) return null;
        var n = this.getMaxCarpetRect(s, o);
        return (
          n ||
          B(
            {
              width: this.justifyRealSize(module1235.DEFAULT_FBZ_REALWIDTH),
              height: this.justifyRealSize(module1235.DEFAULT_FBZ_REALHEIGHT),
            },
            s
          )
        );
      },
    },
    {
      key: 'getMaxCarpetRect',
      value: function (t, s) {
        var o = this,
          n = this.state.carpetData,
          h = new Array(n.length);
        module394.fill(h, 0);
        var l = [],
          p = t.x,
          u = t.x,
          c = t.y,
          f = t.y;
        h[s] = 1;
        l.push(t);

        for (
          var b = function () {
            var t = undefined,
              s = l.pop();
            u = s.x ** u;
            f = s.y ** f;
            p = s.x ** p;
            c = s.y ** c;
            var b = [];
            if (s.x > 0)
              b.push({
                x: s.x - 1,
                y: s.y,
              });
            if (s.x < o.state.width - 1)
              b.push({
                x: s.x + 1,
                y: s.y,
              });
            if (s.y > 0)
              b.push({
                x: s.x,
                y: s.y - 1,
              });
            if (s.y < o.state.height - 1)
              b.push({
                x: s.x,
                y: s.y + 1,
              });
            b.forEach(function (s) {
              t = o.convertPosToIndex(s);

              if (1 == n[t] && 0 == h[t]) {
                h[t] = 1;
                l.push(s);
              }
            });
          };
          l.length > 0;

        )
          b();

        var v = {
          x: u,
          y: f,
          width: p - u + 1,
          height: c - f + 1,
        };
        return this.adjustMinCarpetRect(v);
      },
    },
    {
      key: 'adjustMinCarpetRect',
      value: function (t) {
        var s = t.width,
          o = t.height,
          n = [t.x, t.y],
          h = n[0],
          l = n[1];

        if (s + 6 < module1235.RectConfig.minLength) {
          h -= (module1235.RectConfig.minLength - s) / 2;
          s = module1235.RectConfig.minLength;
        } else {
          h -= 3;
          s += 6;
        }

        if (o + 6 < module1235.RectConfig.minLength) {
          l -= (module1235.RectConfig.minLength - o) / 2;
          o = module1235.RectConfig.minLength;
        } else {
          l -= 3;
          o += 6;
        }

        return {
          x: h,
          y: l,
          width: s,
          height: o,
          realX: t.x,
          realY: t.y,
          realW: t.width,
          realH: t.height,
        };
      },
    },
    {
      key: 'convertPosToIndex',
      value: function (t) {
        return t.y * this.state.width + t.x;
      },
    },
    {
      key: 'convertIndexToPos',
      value: function (t) {
        return {
          x: t % this.state.width,
          y: Math.floor(t / this.state.width),
        };
      },
    },
    {
      key: 'transMapCarpetRectToReal',
      value: function (t) {
        return {
          x: t.x * (this.state.transform.xx || 1),
          y: t.y * (this.state.transform.xx || 1),
          width: t.width * (this.state.transform.xx || 1),
          height: t.height * (this.state.transform.xx || 1),
        };
      },
    },
    {
      key: 'getRectForCustomCarpet',
      value: function () {
        if (!this.state.cusCarpetZones || this.state.cusCarpetZones.length <= 0) return null;
        var t = this.carpetPos;
        if (!this._isAvailablePosition(t)) return null;

        for (var s = 0; s < this.state.cusCarpetZones.length; s++) {
          var n = this.state.cusCarpetZones[s];

          if (n) {
            var h = n.rectSize;

            if (h.x && h.y && h.width && h.height && ((h = this.transMapCarpetRectToReal(n.rectSize)), t.x >= h.x && t.x <= h.x + h.width && t.y >= h.y && t.y <= h.y + h.height)) {
              var l = this.adjustMinCarpetRect(n.rectSize);
              return module21.default(l, {
                custom: true,
              });
            }
          }
        }

        return null;
      },
    },
    {
      key: 'mapOriginXYToScreen',
      value: function (t) {
        var s = this.props.parent.state.map;
        return {
          x: (t.x + 0.5) * this.state.transform.xx,
          y: (s.height - t.y - 0.5) * this.state.transform.yy,
        };
      },
    },
    {
      key: 'degreeToRad',
      value: function (t) {
        return (t * Math.PI) / 180;
      },
    },
    {
      key: 'justifyRealSize',
      value: function (t) {
        var s = t / (this.state.transform.xx || 1);
        return (s ** module1235.RectConfig.maxLength) ** module1235.RectConfig.minLength;
      },
    },
    {
      key: 'adjustChargerAngle',
      value: function (t) {
        if (isNaN(t)) return 0;

        for (var s = t, o = -2; o <= 2; o++)
          if (Math.abs(t - 90 * o) <= 15) {
            s = 90 * o;
            break;
          }

        return s;
      },
    },
    {
      key: 'isRotated',
      value: function () {
        return this.props.mapDeg % 360 != 0;
      },
    },
    {
      key: '_isAvailablePosition',
      value: function (t) {
        var s = [this.state.width * (this.state.transform.xx || 1), this.state.height * (this.state.transform.yy || 1)],
          o = s[0],
          n = s[1];
        return !(!o || !n) && !(t.x < 0 || t.y < 0 || t.x > o || t.y > n);
      },
    },
    {
      key: '_getEdgeCheckPadding',
      value: function () {
        return module386.default.SupportOverflowTouch() ? 100 * this.state.transform.xx : this.mapRotatePadding;
      },
    },
    {
      key: 'hideAllMapObjects',
      value: function () {
        for (var t = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : null, s = this.mapObjectRefs || [], o = 0; o < s.length; o++)
          (t && s[o].props.originX == t.originX && s[o].props.originY == t.originY) || s[o].hideBubble();
      },
    },
    {
      key: 'addFurniture',
      value: function (t, s) {
        var o,
          n = arguments.length > 2 && undefined !== arguments[2] ? arguments[2] : null,
          h = this.degreeToRad(-1 * this.props.mapDeg),
          l = this._getFurnitureDefaultArea(t, n);

        if (!(null == (o = this.furnitureView))) o.addFurniture(t, s, l, h);
      },
    },
    {
      key: 'getEditFurnitures',
      value: function () {
        var t;
        return (null == (t = this.furnitureView) ? undefined : t.getEditFurnitures()) || [];
      },
    },
    {
      key: 'getDeleteFurnitures',
      value: function () {
        var t;
        return (null == (t = this.furnitureView) ? undefined : t.getDeletedFurnitures()) || [];
      },
    },
    {
      key: 'clearAllFurnitureFocus',
      value: function () {
        var t;
        return null == (t = this.furnitureView) ? undefined : t.clearAllFurnitureFocus();
      },
    },
  ]);
  return u;
})(React.default.Component);

exports.default = module1340;
module1340.contextType = module506.AppConfigContext;
module1340.propTypes = {
  color: PropTypes.default.object,
  map: PropTypes.default.string,
  path: PropTypes.default.string,
  pathGotoPlan: PropTypes.default.string,
  mopPath: PropTypes.default.string,
  target: PropTypes.default.string,
  transform: PropTypes.default.objectOf(I),
  imageOnloadCallback: PropTypes.default.bool,
  isCollectDustDock: PropTypes.default.bool,
  showDockBubbles: PropTypes.default.bool,
};
module1340.defaultProps = {
  isCollectDustDock: false,
  imageOnloadCallback: false,
  showDockBubbles: false,
  mapDeg: 0,
  mapInPan: false,
};
var Q = module12.StyleSheet.create({
  container: {
    flex: 0,
    overflow: 'visible',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContainer: {
    flex: 1,
    overflow: 'visible',
    transform: [
      {
        rotateY: module12.I18nManager.isRTL ? '180deg' : '0deg',
      },
    ],
  },
  mapImage: {
    flex: 1,
    overflow: 'visible',
  },
  fbzContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  pathContainer: {
    flex: 1,
    alignSelf: 'stretch',
  },
  roomBubbleView: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
