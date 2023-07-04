var module50 = require('./50'),
  module22 = require('./22'),
  module23 = require('@babel/runtime/helpers/slicedToArray'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  PropTypes = require('prop-types'),
  module1203 = require('./1203'),
  module1126 = require('./1126'),
  module1210 = require('./1210'),
  module1468 = require('./1468'),
  module420 = require('./420'),
  module381 = require('./381'),
  module1413 = require('./1413'),
  module398 = require('./398'),
  module424 = require('./424'),
  module1199 = require('./1199'),
  module391 = require('./391'),
  module390 = require('./390');

function x(t, n) {
  var s = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    if (n)
      o = o.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    s.push.apply(s, o);
  }

  return s;
}

function D(t) {
  for (var s = 1; s < arguments.length; s++) {
    var o = null != arguments[s] ? arguments[s] : {};
    if (s % 2)
      x(Object(o), true).forEach(function (s) {
        module50.default(t, s, o[s]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(o));
    else
      x(Object(o)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(o, n));
      });
  }

  return t;
}

function T(t) {
  var n = B();
  return function () {
    var s,
      o = module12.default(t);

    if (n) {
      var l = module12.default(this).constructor;
      s = Reflect.construct(o, arguments, l);
    } else s = o.apply(this, arguments);

    return module11.default(this, s);
  };
}

function B() {
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

var module1420 = require('./1420'),
  I = module13.ART.Transform,
  module510 = require('./510').strings,
  module1339 = require('./1339'),
  module1126 = require('./1126'),
  module1416 = require('./1416'),
  j = module1416.RRSurface,
  z = module1416.isRRSurface,
  module1414 = require('./1414'),
  module1343 = require('./1343'),
  module1475 = require('./1475'),
  module1476 = require('./1476'),
  module1477 = require('./1477'),
  module1478 = require('./1478'),
  module1479 = (function (t) {
    module9.default(p, t);
    var n = T(p);

    function p(t) {
      var s;
      module6.default(this, p);
      (s = n.call(this, t)).smallDiam = 12;
      s.bigDiam = 108;
      s.longPressStart = false;
      s.longPressCanceled = false;
      s.touch = {
        start: {},
        end: {},
        move: {},
      };
      s.state = {
        visible: false,
        position: {
          x: 0,
          y: 0,
        },
      };
      return s;
    }

    module7.default(p, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          var t = this;
          this.panResponder = module13.PanResponder.create({
            onStartShouldSetPanResponder: function () {
              return true;
            },
            onMoveShouldSetPanResponder: function () {
              return true;
            },
            onPanResponderStart: function (n, s) {
              t._handleLongPressStart();

              t.touch.move = module1339._parseEvent2(n.nativeEvent, s) || {};
            },
            onPanResponderEnd: function () {
              if (t.longPressStart) t.longPressStart = false;
              else t._handleLongPressCancel();
            },
            onPanResponderMove: function (n, s) {
              if (t.longPressStart) {
                var l = [module1339._parseEvent2(n.nativeEvent, s), t.touch.move],
                  h = l[0],
                  u = l[1];
                if (((t.touch.move = h || {}), !(h && h.x && h.y && u.x))) return;

                var p = module1339._parseDegPointWithTrans(h, u, t.props.transform, t.props.mapDeg),
                  c = module23.default(p, 2),
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

            var t = module1339._parseDegPoint(0, -30 / (this.props.transform.yy || 1), this.props.mapDeg),
              n = module23.default(t, 2),
              s = n[0],
              l = n[1];

            this.setState({
              position: {
                x: this.state.position.x + s,
                y: this.state.position.y + l,
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
          module1420.setTimeout(function () {
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
          if (!this.state.visible) return React.default.createElement(module13.View, null);
          var t = 'column',
            n = 'flex-end';

          if (90 == this.props.mapDeg || -270 == this.props.mapDeg) {
            t = 'row';
            n = 'flex-end';
          } else if (270 == this.props.mapDeg || -90 == this.props.mapDeg) {
            t = 'row';
            n = 'flex-start';
          } else if (!(180 != this.props.mapDeg && -180 != this.props.mapDeg)) {
            t = 'column';
            n = 'flex-start';
          }

          return React.default.createElement(
            module13.Animated.View,
            {
              pointerEvents: 'auto',
              style: {
                position: 'absolute',
                left: this.state.position.x * (this.props.transform.xx || 1),
                top: this.state.position.y * (this.props.transform.yy || 1),
                width: 0,
                height: 0,
                flexDirection: t,
                justifyContent: n,
                alignItems: 'center',
                overflow: 'visible',
              },
            },
            React.default.createElement(
              module13.View,
              module22.default({}, this.panResponder.panHandlers, {
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
              React.default.createElement(module13.Image, {
                style: {
                  width: 56,
                  height: 56,
                  resizeMode: 'contain',
                },
                source: require('./1479'),
              })
            )
          );
        },
      },
    ]);
    return p;
  })(React.default.Component);

module1479.propTypes = {
  onLongPress: PropTypes.default.func,
};
module1479.defaultProps = {
  onLongPress: function () {},
  transform: {
    xx: 1,
    yy: 1,
  },
};

var module1481 = (function (t) {
  module9.default(p, t);
  var n = T(p);

  function p(t) {
    var s;
    module6.default(this, p);

    (s = n.call(this, t)).mapSourceOnLoad = function (t, n) {
      if (s.props.imageOnloadCallback)
        n == module1126.shareViewLoadType.ONLOAD_OBSTACLE
          ? s.lastObstacles && ++s.mapObjectImageLoadNum == s.lastObstacles.length && ((s.mapObjectImageLoadNum = 0), s._imageOnLoaded([n]))
          : (s._imageOnLoaded([n]), (s.mapLoadSources[n] = t.url));
    };

    s.colorOfRoom = function (t) {
      var n =
        s.props.parent.state.selectBlockList[t] && s.props.blockCanEdit
          ? ['#DFDFDFff', '#50A4FF', '#FF744D', '#008FA8', '#F5AF10', '#E9E9E9ff']
          : ['#DFDFDF88', '#05819B88', '#C6920088', '#C4715888', '#1369C088', '#E9E9E988'];
      return s.state.roomColorData ? n[s.state.roomColorData[t]] : n[0];
    };

    s.pixelOfElement = function (t) {
      var n = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : null,
        o = null != n ? n : t;
      return [t * (s.state.transform.xx || 1), o * (s.state.transform.yy || 1)];
    };

    s.showChargerWaring = function () {
      return (
        !s.props.parent.props.shouldShowRobotMovingAnimation && !s.props.hideAccessory && !(-1 == [38, 39, 40, 42].indexOf(module381.RSM.errorCode) || !s.charger || !s.charger.x)
      );
    };

    s.showRobotAnimation = function () {
      return (
        !(-1 != [38, 39, 40, 42].indexOf(module381.RSM.errorCode) && s.charger && s.charger.x && s.charging) &&
        !s.props.hideAccessory &&
        undefined !== s.state.status &&
        undefined !== s.robotAniStatus &&
        'Running' !== s.robotAniStatus &&
        null != s.robotAniStatus
      );
    };

    s.handleClickSmartZone = function (t, n, o) {
      if (s._isGlobalTag() && s.props.showAllComponetBubble && n) {
        var l = module1339._getRotateMaxRectSize(o);

        s.smartZoneInfo = {
          zoneArea: {
            x: l.x - 2,
            y: l.y - 2,
            width: l.width + 4,
            height: l.height + 4,
          },
          zoneData: n,
        };
        s.showSmartZoneBubble(t);
      }
    };

    s.handleFBZPanEnd = function (t, n) {
      if (n) s.moveMapToRectCenter(null == t ? undefined : t.state.rectSize);
    };

    s.handleRectPanStart = function (t, n, l) {
      var h = s._getCRRefs(l),
        u = module23.default(h, 2),
        p = u[0];

      u[1];
      if (n) s._setMapZonesFocus(p, t);
      if (!(null == s.props.onRectPanStart)) s.props.onRectPanStart();
    };

    s.handleRectPanEnd = function (t, n) {
      if (n) s.moveMapToRectCenter(null == t ? undefined : t.state.rectSize);
      if (!(null == s.props.onRectPanEnd)) s.props.onRectPanEnd();
    };

    s.mapEditPageDidChange = function () {
      var t = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : -1;
      return module13.DeviceEventEmitter.emit(module420.NotificationKeys.MapEditDidChange, {
        data: t,
      });
    };

    s.getTargetPos = function (t) {
      return t ? s.robot : s.charger;
    };

    s.handlePressDockBubble = function () {
      return s.props.parent.props.onPressDockBubble && s.props.parent.props.onPressDockBubble();
    };

    s.handlePressChargerErrorBubble = function () {
      return s.props.parent.props.onPressChargerErrorBubble && s.props.parent.props.onPressChargerErrorBubble();
    };

    s.handleBubbleLayout = function (t, n) {
      return s.moveMapIfNeeded(t, n);
    };

    s.handlePressFurnitureBubble = function () {
      return null == s.props.parent.props.onPressFurnitureBubble ? undefined : s.props.parent.props.onPressFurnitureBubble(s.furnitureArea);
    };

    s.handlePressSmartZoneBubble = function () {
      var t, n;
      if (s.state.smartBubbleType != module1126.SmartBubbleType.BT_CARPET) {
        if (s.state.smartBubbleType != module1126.SmartBubbleType.BT_NONE && (null == (t = s.smartZoneInfo) ? undefined : t.zoneData))
          null == (n = s.props.parent) || null == n.props.onPressSmartZoneBubble || n.props.onPressSmartZoneBubble(s.smartZoneInfo.zoneData, s.state.smartBubbleType);
      } else if (!(null == s.props.parent.props.onPressSmartZoneBubble)) s.props.parent.props.onPressSmartZoneBubble(s.carpetArea, s.state.smartBubbleType);
    };

    s.handleCheckAndroidOverflow = function (t, n, o) {
      var l = arguments.length > 3 && undefined !== arguments[3] && arguments[3],
        h = (s._getEdgeCheckPadding() - (n ? 45 : l ? 65 : 35)) / s.state.transform.xx;
      if (n) return (n.x <= -1 * h || n.x >= s.state.width + h || n.y <= -1 * h || n.y >= s.state.height + h) && (globals.showToast(module510.rotate_map_rect_warning), true);

      if (t) {
        if ((o = Math.abs(((180 * o) / Math.PI) % 360)) > 90 && o <= 270) o = Math.abs(o - 180);
        if (o > 270 && o < 360) o = 360 - o;
        o = s.degreeToRad(o);
        var u = t.x + t.width / 2,
          p = t.y + t.height / 2,
          c = (t.height / 2) * Math.cos(-1 * o) - (t.width / 2) * Math.sin(-1 * o),
          f = p - c,
          b = p + c,
          v = (t.height / 2) * Math.sin(o) + (t.width / 2) * Math.cos(o);
        return (u - v <= -1 * h || u + v >= s.state.width + h || f <= -1 * h || b >= s.state.height + h) && (globals.showToast(module510.rotate_map_rect_warning), true);
      }

      return false;
    };

    s.handleShouldShowBubbleChecker = function (t) {
      if (s.props.parent.props.shouldShowMapObjectBubbleChecker) s.props.parent.props.shouldShowMapObjectBubbleChecker(t);
    };

    s.handlePressObjectBubble = function (t) {
      var n = {
        x: t.originX,
        y: t.originY,
        type: t.type,
        percent: t.percent,
        photoId: t.photoId,
      };
      if (!(null == s.props.parent.props.onPressMapObjectBubble)) s.props.parent.props.onPressMapObjectBubble(n, s.state.ignoredObstacles);
    };

    s.handlePressPhotoReminderBubble = function (t) {
      var n = {
        x: t.originX,
        y: t.originY,
        type: t.type,
        percent: t.percent,
        photoId: t.photoId,
      };
      if (!(null == s.props.parent.props.onPressMapObjectPhotoReminderBubble)) s.props.parent.props.onPressMapObjectPhotoReminderBubble(n, s.state.ignoredObstacles);
    };

    s.handlePressObjectDelete = function (t) {
      for (n = t.x, o = t.y, l = [], h = 0, undefined; h < s.state.obstacles.length; h++) {
        var n, o, l, h;
        var u = s.state.obstacles[h],
          p = t.transform.point(u[3], u[4]);
        if ((p.x - n) * (p.x - n) + (p.y - o) * (p.y - o) < 2500)
          l.push({
            x: u[0],
            y: u[1],
            type: u[2],
          });
      }

      if (!(null == s.props.parent.props.onIgnoreMapObjects)) s.props.parent.props.onIgnoreMapObjects(l, s.state.ignoredObstacles);
    };

    s.handleObjectNameViewDidShow = function (t) {
      var n = [D({}, t)];
      s.setState({
        showMapObjectNameObjects: n,
      });
    };

    s.handleObjectNameViewDidHide = function (t) {
      var n = s.state.showMapObjectNameObjects;
      if (
        -1 !=
        n.findIndex(function (n) {
          return n.originX == t.originX && n.originY == t.originY && n.type == t.type;
        })
      )
        n = n.filter(function (n) {
          return n.originX != t.originX && n.originY != t.originY && n.type != t.type;
        });
      s.setState({
        showMapObjectNameObjects: n,
      });
    };

    s.handleMapObjectBubbleDidShow = function (t) {
      s.hideAllMapObjects(t);

      s._cleanAllMapBubble();
    };

    s.handleMapObjectImageOnLoad = function () {
      return s.mapSourceOnLoad({}, module1126.shareViewLoadType.ONLOAD_OBSTACLE);
    };

    s.color = s.props.color;
    s.robot = {
      x: 0,
      y: 0,
    };
    s.robotAngle = 0;
    s.charger = {
      x: 0,
      y: 0,
      angle: 0,
    };
    s.charging = false;
    s.rectReferences = {
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
    };
    s.exRectRefs = {
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
    };
    s.mapObjectRefs = [];
    s.mapObjectImageLoadNum = 0;
    s.mapLoadSources = {};
    s.carpetArea = {};
    s.furnitureArea = {};
    s.mapRotatePadding = 0;
    s.carpetBubbleOpacity = new module13.Animated.Value(0);
    s.chargerBubbleOpacity = new module13.Animated.Value(0);
    s.furnitureBubbleOpa = new module13.Animated.Value(0);
    s.samrtZoneBubbleOpa = new module13.Animated.Value(0);
    s.chargerLottieSize = {
      width: 0,
      height: 0,
    };
    s.state = {
      map: s.props.map || '',
      path: s.props.path || '',
      pathGotoPlan: s.props.pathGotoPlan || '',
      mopPath: s.props.mopPath || '',
      target: s.props.target || {},
      width: module1126.EMPTY_MAP_SIZE,
      height: module1126.EMPTY_MAP_SIZE,
      transform: s.props.transform || new I(),
      status: 'Unknown',
      robot: null,
      robotAngle: 0,
      charger: null,
      displayZones: [],
      locatingRippleHarf: new module13.Animated.Value(0),
      showMapObject: true,
      showOnlyGeneralObstacles: false,
      showMapObjectNameObjects: [],
      showChargerBubble: false,
      showFurnitureBubble: false,
      showSmartZoneBubble: false,
      smartBubbleType: module1126.SmartBubbleType.BT_NONE,
      chargerErrorText: '',
    };
    return s;
  }

  module7.default(p, [
    {
      key: 'componentDidMount',
      value: function () {
        var t = this;
        this.panResponderChargerPress = module13.PanResponder.create({
          onStartShouldSetPanResponder: function () {
            return true;
          },
          onMoveShouldSetPanResponder: function () {
            return true;
          },
          onPanResponderStart: function (n, s) {
            t.handleChargerClick(n.nativeEvent);
          },
          onPanResponderEnd: function (t, n) {},
          onPanResponderMove: function (t, n) {},
          onPanResponderTerminationRequest: function (t, n) {
            return false;
          },
          onPanResponderTerminate: function (t, n) {},
        });
      },
    },
    {
      key: 'UNSAFE_componentWillReceiveProps',
      value: function (t) {
        if (this.props.mapMode != t.mapMode) this._cleanAllMapBubble();
      },
    },
    {
      key: 'UNSAFE_componentWillUpdate',
      value: function (t, n) {
        if (
          t.mapMode == module1343.MAP_MODE_GOTO_EDIT &&
          n.target &&
          n.target.x &&
          n.target.y &&
          module381.RobotStatusManager.sharedManager().state == module381.RobotState.GOTO_TARGET
        )
          this.target.setState({
            visible: true,
            position: {
              x: n.target.x,
              y: n.target.y,
            },
          });
        this.currentMap = this._getCurrentMap(t, n);
        if (t.imageOnloadCallback) this._checkMapDiff(n);
      },
    },
    {
      key: 'componentDidUpdate',
      value: function (t, n) {
        var s;
        if (this.lottieView) this.lottieView.play();
        if (!(null == (s = this.lottieCharger))) s.play();
      },
    },
    {
      key: '_checkMapDiff',
      value: function (t) {
        var n = [];
        if (!t.charger || (t.charger && this.mapLoadSources[module1126.shareViewLoadType.ONLOAD_CHARGER])) n.push(module1126.shareViewLoadType.ONLOAD_CHARGER);
        if (undefined === t.carpetMap || t.carpetMap === this.mapLoadSources[module1126.shareViewLoadType.ONLOAD_CARPETMAP]) n.push(module1126.shareViewLoadType.ONLOAD_CARPETMAP);
        if (!this.currentMap || this.currentMap === this.mapLoadSources[module1126.shareViewLoadType.ONLOAD_MAP]) n.push(module1126.shareViewLoadType.ONLOAD_MAP);
        if (t.obstacles && 0 != t.obstacles.length) this.lastObstacles = t.obstacles;
        else n.push(module1126.shareViewLoadType.ONLOAD_OBSTACLE);
        if (n.length > 0) this._imageOnLoaded(n);
      },
    },
    {
      key: '_imageOnLoaded',
      value: function (t) {
        module13.DeviceEventEmitter.emit(module420.NotificationKeys.MapImageLoaded, {
          types: t,
        });
      },
    },
    {
      key: '_getCurrentMap',
      value: function (t, n) {
        var s = n.map;
        if (1 == t.parent.state.inCleanBlockMode) s = n.mapBCBackground;
        else if ((undefined !== t.parent.state.map.data && t.parent.state.map.data.blockNum <= 1) || t.mapMode == module1343.MAP_MODE_CARPET_EDIT) s = n.mapNoBlock;
        return s;
      },
    },
    {
      key: '_isCollectDustDock',
      value: function () {
        return this.props.isCollectDustDock || module381.RSM.isCollectDustDock;
      },
    },
    {
      key: '_isCanJumpOnyxDock',
      value: function () {
        return module381.RSM.isCollectDock() || module381.RSM.isO2Dock();
      },
    },
    {
      key: '_getChargerResources',
      value: function () {
        if ((this.props.showDockBubbles && this.charging) || !(this.state.dockType >= 0))
          return module381.RSM.isO0Dock() ? module1126.DockTypeRes[module1126.DockType.Normal] : module1126.DockTypeRes[module1126.DockType.Other];
        else return 0 == this.state.dockType ? module1126.DockTypeRes[module1126.DockType.Normal] : module1126.DockTypeRes[module1126.DockType.Other];
      },
    },
    {
      key: '_isGlobalTag',
      value: function () {
        return this.props.mapMode == module1343.MAP_MODE_REGULAR && !this.props.parent.state.inCleanBlockMode;
      },
    },
    {
      key: 'handleChargerClick',
      value: function (t) {
        var n = arguments.length > 1 && undefined !== arguments[1] && arguments[1];
        if (!(t.touches.length > 1))
          this.props.showDockBubbles &&
            this._isGlobalTag() &&
            ((n && !this.isRobotCharging) || (this.state.showChargerBubble ? this.hideChargerBubble() : this.showChargerBubble()));
      },
    },
    {
      key: 'getCharger',
      value: function () {
        var t = this,
          n = this.showChargerWaring(),
          l = this._getChargerResources(),
          h = 0.5,
          u = 0.86,
          p = this.pixelOfElement(module1126.Config.size.chargerRadius, module1126.Config.size.chargerRadius * u),
          c = module23.default(p, 2),
          v = c[0],
          y = c[1];

        if (l.type == module1126.DockType.Normal) {
          h = 0.77;
          u = 0.5;
          var R = this.pixelOfElement(module1126.Config.size.chargerNormal * h, module1126.Config.size.chargerNormal),
            w = module23.default(R, 2);
          v = w[0];
          y = w[1];
        }

        return !this.props.hideAccessory && this.state.charger
          ? React.default.createElement(
              module13.Image,
              module22.default(
                {},
                this.panResponderChargerPress.panHandlers,
                {
                  pointerEvents: 'auto',
                },
                module391.default.getAccessibilityLabel('map_charger'),
                {
                  resizeMethod: 'scale',
                  style: {
                    position: 'absolute',
                    width: v,
                    height: y,
                    left: this.charger.x - v / 2 + (v / 2) * (1 - u) * Math.cos(this.degreeToRad(-this.charger.angle)),
                    top: this.charger.y - y / 2 + (y / 2) * (1 - h) * Math.sin(this.degreeToRad(-this.charger.angle)),
                    transform: [
                      {
                        rotateZ: -1 * module1339.adjustChargerAngle(this.charger.angle) + 'deg',
                      },
                    ],
                    zIndex: n ? 999 : 0,
                  },
                  source: l.chargerIcon,
                  onLoad: this.props.imageOnloadCallback
                    ? function (n) {
                        return t.mapSourceOnLoad(n.nativeEvent.source, module1126.shareViewLoadType.ONLOAD_CHARGER);
                      }
                    : null,
                }
              )
            )
          : null;
      },
    },
    {
      key: 'getSpecialChargerTopView',
      value: function () {
        var t = this.showChargerWaring(),
          n = this._getChargerResources(),
          l = this.pixelOfElement(module1126.Config.size.chargerRadius, 0.86 * module1126.Config.size.chargerRadius),
          h = module23.default(l, 2),
          u = h[0],
          p = h[1];

        return !this.props.hideAccessory && this.state.charger && n.type != module1126.DockType.Normal
          ? React.default.createElement(
              module13.Image,
              module22.default(
                {},
                this.panResponderChargerPress.panHandlers,
                {
                  pointerEvents: 'auto',
                },
                module391.default.getAccessibilityLabel('map_charger_top'),
                {
                  resizeMethod: 'scale',
                  resizeMode: 'contain',
                  style: {
                    position: 'absolute',
                    width: u,
                    height: p,
                    left: this.charger.x - u / 2 + (u / 2) * 0.14 * Math.cos(this.degreeToRad(-this.charger.angle)),
                    top: this.charger.y - p / 2 + (p / 2) * 0.5 * Math.sin(this.degreeToRad(-this.charger.angle)),
                    transform: [
                      {
                        rotateZ: -1 * module1339.adjustChargerAngle(this.charger.angle) + 'deg',
                      },
                    ],
                    zIndex: t ? 999 : 0,
                  },
                  source: require('./1480'),
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
          n = this._getChargerBubbleCenter();

        return n && n.x && n.y
          ? React.default.createElement(module1210.ObjectNameBubble, {
              hasArrow: (this.state.chargerErrorText && this.state.chargerErrorText.length) || this._isCanJumpOnyxDock(),
              objectName: this.state.chargerErrorText && this.state.chargerErrorText.length ? this.state.chargerErrorText : this._getChargerResources().name,
              objectImage: this.state.chargerErrorText && this.state.chargerErrorText.length ? module1475 : this._getChargerResources().chargerBubbleIcon,
              center: n,
              imageStyle: J.chargerBubbleImg,
              animatedOpacity: this.chargerBubbleOpacity,
              mapDeg: this.props.mapDeg,
              onBubbleLayout: this.handleBubbleLayout,
              onPressBubble: function () {
                var n;
                if (null == (n = t.state.chargerErrorText) ? undefined : n.length) t.handlePressChargerErrorBubble();
                else t.handlePressDockBubble();
              },
            })
          : null;
      },
    },
    {
      key: 'getChargerForbid',
      value: function () {
        var t = module381.RSM.isO0Dock() ? module1126.Config.size.chargerNormal : module1126.Config.size.chargerRadius,
          n = this.pixelOfElement(module1126.DOCK_FORBIDDEN_R),
          s = module23.default(n, 2),
          l = s[0],
          h = s[1],
          u = this.pixelOfElement(module1126.DOCK_FORBIDDEN_R - t / 2),
          p = module23.default(u, 2),
          c = p[0],
          v = p[1];
        return !this.props.hideAccessory && (this.charger.x || this.charger.y) && this.state.charger && this.props.mapMode == module1343.MAP_MODE_MAP_EDIT
          ? React.default.createElement(module13.View, {
              style: {
                position: 'absolute',
                width: l,
                height: 2 * h,
                left: this.charger.x - l / 2 + 0.5 * c * Math.cos(this.degreeToRad(-this.charger.angle)),
                top: this.charger.y - h + 0.5 * v * Math.sin(this.degreeToRad(-this.charger.angle)),
                backgroundColor: '#00000033',
                borderColor: '#add8ff',
                borderWidth: 1,
                borderStyle: 'dashed',
                borderRadius: h,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                alignItems: 'center',
                overflow: 'hidden',
                transform: [
                  {
                    rotateZ: module1339.adjustChargerAngle(this.charger.angle) * (module13.I18nManager.isRTL ? 1 : -1) + 'deg',
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
        if (!this.showChargerWaring()) return null;
        var n = this.pixelOfElement(module1126.Config.size.robotRadius),
          s = module23.default(n, 2),
          l = s[0],
          h = s[1];
        return React.default.createElement(
          module13.View,
          {
            pointerEvents: 'none',
            style: {
              position: 'absolute',
              width: 1.75 * l,
              height: 1.75 * h,
              left: this.charger.x - (l / 2) * 1.75,
              top: this.charger.y - (h / 2) * 1.75,
              zIndex: 999,
            },
          },
          React.default.createElement(module1203.default, {
            ref: function (n) {
              return (t.lottieCharger = n);
            },
            style: {
              width: 1.75 * l,
              height: 1.75 * h,
            },
            source: module1126.MapAnimates.Warning,
          })
        );
      },
    },
    {
      key: 'getChargerStatusAnimation',
      value: function () {
        if (this.props.parent.props.shouldShowRobotMovingAnimation) return null;
        if (this.props.hideAccessory) return null;
        if (!this.charger || !this.charger.x || !this.charging) return null;
        var t = '';
        if (
          (this.state.status == module381.RobotState.WASHING_DUSTER
            ? (t = module424.DMM.isPearl ? 'WashingdustPearl' : 'Washingdust')
            : this.state.status == module381.RobotState.COLLECTING_DUST && (t = 'Collectdust'),
          t.length <= 0)
        )
          return null;

        var n = this._getChargerBubbleCenter();

        if (this.chargerLottieSize.width * this.state.transform.xx < 56) this.chargerLottieSize.width = 56 / this.state.transform.xx;
        if (this.chargerLottieSize.width * this.state.transform.xx > 80) this.chargerLottieSize.width = 80 / this.state.transform.xx;
        if (this.chargerLottieSize.height * this.state.transform.yy < 56) this.chargerLottieSize.height = 56 / this.state.transform.yy;
        if (this.chargerLottieSize.height * this.state.transform.yy > 80) this.chargerLottieSize.height = 80 / this.state.transform.yy;
        var s = this.chargerLottieSize.width * this.state.transform.xx,
          o = this.chargerLottieSize.height * this.state.transform.yy;
        return React.default.createElement(module1210.ChargerStatusLottieView, {
          mapDeg: this.props.mapDeg,
          center: n,
          baseWidth: s,
          baseHeight: o,
          lottieSource: t,
        });
      },
    },
    {
      key: 'getRobotAnimation',
      value: function () {
        var t = this;
        if (!this.showRobotAnimation()) return null;
        var n = this.robotAniStatus,
          s = module1126.MapAnimates[n];
        if (undefined === s) return null;
        var l = this.pixelOfElement(module1126.Config.size.robotRadius),
          h = module23.default(l, 2),
          u = h[0],
          p = h[1];
        React.default.createElement(module13.View, null);
        return 'Sleeping' === n
          ? React.default.createElement(
              module13.View,
              {
                pointerEvents: 'none',
                style: {
                  position: 'absolute',
                  width: 2 * u,
                  height: 2 * p,
                  left: this.robotPos.x + u / 2 - 0.66 * p,
                  top: this.robotPos.y - p / 2 - 1.33 * p,
                },
              },
              React.default.createElement(module1203.default, {
                ref: function (n) {
                  return (t.lottieView = n);
                },
                style: {
                  width: 2 * u,
                  height: 2 * p,
                },
                source: s,
              })
            )
          : React.default.createElement(
              module13.View,
              {
                pointerEvents: 'none',
                style: {
                  position: 'absolute',
                  width: 1.75 * u,
                  height: 1.75 * p,
                  left: this.robotPos.x - (u / 2) * 1.75,
                  top: this.robotPos.y - (p / 2) * 1.75,
                  zIndex: 'Warning' === n ? 999 : 0,
                },
              },
              React.default.createElement(module1203.default, {
                ref: function (n) {
                  return (t.lottieView = n);
                },
                style: {
                  width: 1.75 * u,
                  height: 1.75 * p,
                },
                source: s,
              })
            );
      },
    },
    {
      key: 'getRobot',
      value: function (t) {
        var n = this,
          l = this.pixelOfElement(module1126.Config.size.robotRadius),
          h = module23.default(l, 2),
          u = h[0],
          p = h[1],
          c = this.showChargerWaring() || (this.showRobotAnimation() && 'Warning' === this.robotAniStatus);
        this.panResponderRobotPress = module13.PanResponder.create({
          onStartShouldSetPanResponder: function () {
            return true;
          },
          onMoveShouldSetPanResponder: function () {
            return true;
          },
          onPanResponderStart: function (t, s) {
            n.handleChargerClick(t.nativeEvent, true);
          },
          onPanResponderEnd: function (t, n) {},
          onPanResponderMove: function (t, n) {},
          onPanResponderTerminationRequest: function (t, n) {
            return false;
          },
          onPanResponderTerminate: function (t, n) {},
        });
        var v = {
            resizeMode: 'contain',
            width: u,
            height: p,
            transform: [
              {
                rotateZ: -1 * Math.floor(t) + 'deg',
              },
              {
                translateX: 0,
              },
            ],
          },
          y = 'android' != module13.Platform.OS ? module13.Image : module1414,
          R = React.default.createElement(y, {
            resizeMethod: 'scale',
            source: module424.DMM.robotInMap.image,
            style: v,
          });
        return !this.props.hideAccessory
          ? React.default.createElement(
              module13.View,
              module22.default(
                {
                  pointerEvents: 'auto',
                },
                this.panResponderRobotPress.panHandlers,
                module391.default.getAccessibilityLabel('map_robot'),
                {
                  style: {
                    position: 'absolute',
                    overflow: 'visible',
                    left: this.robotPos.x - u / 2,
                    top: this.robotPos.y - p / 2,
                    zIndex: c ? 999 : 0,
                  },
                }
              ),
              React.default.createElement(
                module1414,
                {
                  pointerEvents: 'none',
                  resizeMethod: 'scale',
                  source: module424.DMM.robotInMap.shadowBg,
                  style: {
                    width: u,
                    height: p,
                  },
                },
                R
              )
            )
          : null;
      },
    },
    {
      key: 'getAnimatedRobot',
      value: function (t, n) {
        var s = this,
          o = !this.props.hideAccessory && this.props.mapMode != module1343.MAP_MODE_ZONED_CLEAN_EDIT && this.props.mapMode != module1343.MAP_MODE_BLOCK_CLEAN_EDIT && n > 10;
        return React.default.createElement(module1210.AnimatedRobot, {
          pathPoints: this.state.pathPoints ? this.state.pathPoints : [],
          pathData: this.state.pathData,
          transform: this.state.transform,
          robot: this.robotPos,
          width: t,
          height: n,
          showPath: o,
          onPlayFinished: this.props.parent.props.onPathPlaybackFinished,
          ref: function (t) {
            return (s.animatedRobot = t);
          },
        });
      },
    },
    {
      key: 'getForbiddenView',
      value: function (t) {
        var n = this;
        return 1 != this.props.parent.state.inBlockMode && this.props.mapMode != module1343.MAP_MODE_CARPET_EDIT && this.props.mapMode != module1343.MAP_MODE_DOORSILL_EDIT
          ? React.default.createElement(module1468.ForbiddenView, {
              ref: function (t) {
                return (n.forbiddenEditView = t);
              },
              mapMode: this.props.mapMode,
              mapDeg: this.props.mapDeg,
              transform: t,
              fbzWalls: this.state.fbzWalls,
              fbzZones: this.state.fbzZones,
              mopZones: this.state.mopZones,
              cleanZones: this.state.cleanZones,
              cliffZones: this.state.cliffZones,
              zonesHasEdited: this.props.zonesHasEdited,
              initFBZone: this.state.initFBZone,
              initStuckPt: this.state.initStuckPt,
              initCliffZone: this.props.initCliffZone,
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
        var n = this,
          s = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : module1126.CleanRectType.Normal,
          l = this._getCRRefs(s),
          h = module23.default(l, 2),
          u = h[0];

        h[1];
        return Object.keys(u).map(function (o, l) {
          return React.default.createElement(module1210.CleanRect, {
            key: l,
            id: o,
            type: s,
            mapDeg: n.props.mapDeg,
            ref: function (t) {
              return (u[o] = t);
            },
            parent: n,
            transform: t,
            handlePanStart: n.handleRectPanStart,
            handlePanEnd: n.handleRectPanEnd,
            checkAndroidOverflow: n.handleCheckAndroidOverflow,
          });
        });
      },
    },
    {
      key: 'getDisplayZonesView',
      value: function () {
        var t = this;
        return 4 == this.props.parent.state.inCleanBlockMode
          ? this.state.displayZones.map(function (n, s) {
              var o = module1339._convertToPixelRect(n, t.state.transform);

              return React.default.createElement(module13.View, {
                key: s,
                pointerEvents: 'none',
                style: {
                  position: 'absolute',
                  left: o.x,
                  top: o.y,
                  width: o.width,
                  height: o.height,
                  overflow: 'visible',
                  backgroundColor: module1126.buttonConfig.rectBgColor,
                  borderColor: module1126.buttonConfig.rectColorSolid,
                  borderWidth: 1,
                  borderStyle: 'solid',
                },
              });
            })
          : null;
      },
    },
    {
      key: 'getMapObjects',
      value: function (t, n) {
        if (!(this.props.mapElementShowFlag & module1126.MapElementShow.OBSTACLE)) return [];
        var o = [];
        if (undefined !== this.state.obstacles)
          for (var l = 0; l < this.state.obstacles.length; l++) {
            var h = this.state.obstacles[l],
              u = t.point(h[3], h[4]),
              p =
                h.length > 5
                  ? {
                      percent: h[5],
                    }
                  : {},
              c =
                h.length > 5
                  ? {
                      photoId: h[7],
                    }
                  : {},
              b =
                -99 == h[2]
                  ? {
                      merges: h[h.length - 1],
                    }
                  : {},
              v =
                h.length > 5
                  ? {
                      avoidTimes: h[6],
                    }
                  : {},
              y = this.props.showOnlyGeneralObstacles ? 42 : h[2],
              w = -99 == h[2] ? 'merges' : !c.photoId || c.photoId.length < 1 ? 'ai' : this.props.obstaclePopBoxType,
              C = -99 == h[2] ? h.length - 2 : h.length - 1,
              M = this.state.roomColorData[h[C]];
            n.push(
              React.default.createElement(
                module1210.MapObjectView,
                module22.default(
                  {
                    ref: function (t) {
                      o.push(t);
                    },
                    key: l,
                    x: u.x,
                    y: u.y,
                    originX: h[0],
                    originY: h[1],
                    type: y,
                  },
                  p,
                  c,
                  v,
                  b,
                  {
                    colorIndex: M,
                    transform: t,
                    parent: this,
                    visible: !this.props.hideAccessory && 1 == this.state.showMapObject,
                    showMapObjectName: this.props.mapMode == module1343.MAP_MODE_REGULAR,
                    showAsBlackWall: false,
                    showDebugInfo: this.props.showMapObjectDebugInfo,
                    popBoxType: w,
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
        return o;
      },
    },
    {
      key: 'getBlockOperationView',
      value: function (t) {
        var n,
          s,
          o,
          l = this,
          h = (null == (n = this.props.parent) ? undefined : n.getCurrentSelectBlock()) || [],
          u = null,
          p = -1;

        if (1 == h.length) {
          p = h[0];
          u = (null == (s = this.props.parent) ? undefined : null == (o = s.touchBlockPtMap) ? undefined : null == o.get ? undefined : o.get(p)) || null;
        }

        return this.props.showSplitLine && -1 != p
          ? React.default.createElement(module1210.BlockOperation, {
              ref: function (t) {
                return (l.blockOp = t);
              },
              parent: this,
              blockID: p,
              touchPt: u,
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
          n = [];
        if (undefined === this.state.centerInfo) return n;
        var o,
          l = [];
        if (1 == this.props.parent.state.inCleanBlockMode)
          (null == (o = this.state.blockInClean) ? undefined : o.length) > 0
            ? (l = this.state.blockInClean.concat())
            : 0 != this.props.parent.state.blockSequenceListReadOnly.length && (l = this.props.parent.state.blockSequenceListReadOnly.concat());

        for (
          var h = this.props.roomBubbleMode,
            u = this.props.parent.props.showAllBlocksBubble,
            p = module13.Dimensions.get('window').width,
            c = function (o) {
              var c;
              if (0 == t.state.centerInfo[o].count) return 'continue';
              var v = !!t.props.blockCanEdit && t.props.parent.state.selectBlockList[o];
              if (h == module1126.BlockBubbleShowInfo.NONE && 1 != v) return 'continue';

              var y = t.props.parent.state.roomModeList.find(function (t) {
                  return t.id == o;
                }),
                w = y ? y.cleanMode : -1,
                C = y ? y.waterMode : -1,
                S = y ? y.mopMode : -1,
                _ = null != (c = null == y ? undefined : y.mopTemplateId) ? c : -1;

              if (h & module1126.BlockBubbleShowInfo.CLEANMODE && u) {
                w = module381.RSM.isCustomCleanMode() ? w : -1;
                C = module381.RSM.isCustomWaterMode() ? C : -1;
                S = module381.RSM.isCustomMopMode() ? S : -1;
              }

              var k = t.state.centerInfo[o].x / t.state.centerInfo[o].count,
                O = t.state.centerInfo[o].y / t.state.centerInfo[o].count,
                x = (k + 0.5) * t.state.transform.xx,
                D = (t.state.height - O - 0.5) * t.state.transform.yy,
                T = (t.state.centerInfo[o].maxX - t.state.centerInfo[o].minX) * t.state.transform.xx,
                B = !v && u ? T ** 60 : p,
                F = {
                  left: x - B / 2,
                  top: D - (180 == Math.abs(t.props.mapDeg) ? 0 : 17),
                },
                I = '',
                L = -1,
                Z = t.props.parent.state.roomNameList;

              if ((0 != Z.length && (-1 != Z[o][1] && (I = Z[o][1]), 3 == Z[o].length && (L = Z[o][2])), '' == I)) {
                var V = t.props.parent.state.defaultNameList;
                if (0 != V.length && V[o] && V[o].length > 0) I = V[o];
              }

              I = undefined === I ? '' : I;

              for (var N = -1, j = 0; j < t.props.blockSequenceList.length; j++)
                if (t.props.blockSequenceList[j] == o) {
                  N = j + 1;
                  break;
                }

              if (module424.DMM.isTanosSC) C = null;
              if (!(t.props.mapElementShowFlag & module1126.MapElementShow.NAME_TAG)) h &= module1126.BlockBubbleShowInfo.CLEANMODE | module1126.BlockBubbleShowInfo.CLEANSEQUENCE;
              if (!(t.props.mapElementShowFlag & module1126.MapElementShow.CUSTOM_ORDER)) h &= module1126.BlockBubbleShowInfo.DISPLAYNAME;
              var z = t.state.roomColorData[o];
              if (
                1 == t.props.parent.state.inCleanBlockMode &&
                -1 ==
                  l.findIndex(function (t) {
                    return t == o;
                  })
              )
                z = 8;
              n.push(
                React.default.createElement(
                  module13.View,
                  {
                    pointerEvents: t.props.blockCanEdit ? 'box-none' : 'none',
                    key: o,
                    style: [
                      J.roomBubbleView,
                      {
                        left: F.left,
                        top: F.top,
                        width: B,
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
                    module1210.RoomInfoBubble,
                    module22.default({}, module391.default.getAccessibilityLabel('room_info_bubble'), {
                      isSelected: 1 == v,
                      sequenceID: -1 == N ? '' : N.toString(),
                      roomColor: t.colorOfRoom(o),
                      cleanMode: w,
                      waterMode: C,
                      mopMode: S,
                      mopTemplateId: _,
                      displayMode: h,
                      roomName: I,
                      roomTag: L,
                      colorIndex: z,
                      maxWidth: T,
                      transform: t.state.transform,
                      hideShadow: t.props.mapPanStatus > module1126.PanStatus.MAP_VIEWING_FIT,
                      onPressTag: function () {
                        return t.onPressTag(o);
                      },
                    })
                  )
                )
              );
            },
            v = 1;
          v < this.state.centerInfo.length;
          v++
        )
          c(v);

        return n;
      },
    },
    {
      key: 'onPressTag',
      value: function (t) {
        var n;
        if (!(null == (n = this.props.parent))) n.changeBlockState(t);
      },
    },
    {
      key: 'getBlockMapsView',
      value: function (t) {
        var n = this,
          s = [];
        if (undefined === this.props.parent.state.map.mapList) return s;

        var o,
          l = function (o) {
            var l = n.props.parent.state.map.mapList[o];
            if (undefined !== l)
              s.push(
                React.default.createElement(module1414, {
                  key: o,
                  pointerEvents: 'none',
                  layerScaleFilter: 'Nearest',
                  style: t,
                  source: {
                    uri: l,
                  },
                })
              );
          };

        if (this.props.blockCanEdit)
          ((null == (o = this.props.parent) ? undefined : o.getCurrentSelectBlock()) || []).forEach(function (t) {
            l(t + '');
          });
        else if (1 == this.props.parent.state.inCleanBlockMode) {
          var h;
          if ((null == (h = this.state.blockInClean) ? undefined : h.length) > 0)
            this.state.blockInClean.forEach(function (t) {
              l(t + '');
            });
          else if (0 != this.props.parent.state.blockSequenceListReadOnly.length)
            this.props.parent.state.blockSequenceListReadOnly.forEach(function (t) {
              l(t + '');
            });
        }
        return s;
      },
    },
    {
      key: 'getCarpetMapView',
      value: function (t) {
        var n = this;
        if (!(this.props.mapElementShowFlag & module1126.MapElementShow.FLOOR_CARPET)) return null;
        var s = this.state.carpetMap;
        if (undefined === s) return null;
        var o = React.default.createElement(module1414, {
            pointerEvents: 'none',
            layerScaleFilter: 'Nearest',
            style: t,
            source: {
              uri: s,
            },
            onLoad: this.props.imageOnloadCallback
              ? function (t) {
                  return n.mapSourceOnLoad(t.nativeEvent.source, module1126.shareViewLoadType.ONLOAD_CARPETMAP);
                }
              : null,
          }),
          l = React.default.createElement(module13.Image, {
            pointerEvents: 'none',
            style: t,
            source: {
              uri: s,
            },
            onLoad: this.props.imageOnloadCallback
              ? function (t) {
                  return n.mapSourceOnLoad(t.nativeEvent.source, module1126.shareViewLoadType.ONLOAD_CARPETMAP);
                }
              : null,
          });
        return (
          React.default.createElement(
            module13.View,
            module391.default.getAccessibilityLabel('map_carpet'),
            this.state.transform.xx < 1.2 && 'android' != module13.Platform.OS ? l : o
          ) || null
        );
      },
    },
    {
      key: 'getFloorMapView',
      value: function (t) {
        if (!(this.props.mapElementShowFlag & module1126.MapElementShow.FLOOR_CARPET)) return null;
        var n = this.state.floorMap;
        return (null == n ? undefined : n.image) && '' != (null == n ? undefined : n.image)
          ? React.default.createElement(module1414, {
              pointerEvents: 'none',
              layerScaleFilter: 'Nearest',
              style: t,
              source: {
                uri: n.image,
              },
            })
          : null;
      },
    },
    {
      key: 'getFurnitureBubbleView',
      value: function () {
        var t;
        if (!(this.props.mapElementShowFlag & module1126.MapElementShow.FURNITURE)) return null;

        var n = this.furnitureArea && (null == (t = this.furnitureView) ? undefined : t.showFurnitureIcon(this.furnitureArea.type, this.furnitureArea.edited)),
          s = this._getFurnitureBubbleCenter(n),
          l = module23.default(s, 2),
          h = l[0],
          u = l[1];

        if (!h || !h.x || !h.y) return null;
        var p = !n && module381.RSM.isHomeButtonsEnabled();
        return React.default.createElement(module1210.ObjectNameBubble, {
          funcId: 'map_furniture_bubble',
          objectName: u,
          objectImage: p ? module1477 : module1476,
          objectLottie: p ? module1478 : null,
          center: h,
          transform: this.state.transform,
          textWidth: 70,
          animatedOpacity: this.furnitureBubbleOpa,
          mapDeg: this.props.mapDeg,
          bubbleWidth: 80,
          hasArrow: !!p,
          onPressBubble: p ? this.handlePressFurnitureBubble : null,
        });
      },
    },
    {
      key: 'getSmartZoneBubbleView',
      value: function () {
        var t,
          n = this.state.smartBubbleType;
        if (!(this.props.mapElementShowFlag & module1126.MapElementShow.FLOOR_CARPET || (n != module1126.SmartBubbleType.BT_CARPET && n != module1126.SmartBubbleType.BT_DOORSILL)))
          return null;

        var s = this._getSmartZoneBubbleCenter(null == (t = this.smartZoneInfo) ? undefined : t.zoneArea);

        if ((n == module1126.SmartBubbleType.BT_CARPET && (s = this._getCarpetBubbleCenter()), !s || !s.x || !s.y)) return null;
        var o,
          l,
          h = module1126.SmartBubbleConfig[n].pageTitle;
        if (n == module1126.SmartBubbleType.BT_STUCK)
          h = (null == (o = this.smartZoneInfo) ? undefined : null == (l = o.zoneData) ? undefined : l.nearby)
            ? module510.map_ai_zone_bubble_adjust
            : module510.map_ai_zone_bubble_set;
        var u = n == module1126.SmartBubbleType.BT_CARPET ? J.carpetBubbleImg : J.smartBubbleImg;
        u = D(
          D({}, u),
          {},
          {
            tintColor: this.theme.bubble.tintColor,
          }
        );
        var p =
          n == module1126.SmartBubbleType.BT_CARPET
            ? null
            : {
                start: {
                  x: 0,
                  y: 0,
                },
                end: {
                  x: 0,
                  y: 1,
                },
                colors: this.theme.bubble.gardienColors,
                style: J.smartBubbleImg,
              };
        return React.default.createElement(module1210.ObjectNameBubble, {
          funcId: 'map_smart_zone_bubble_' + n,
          objectName: h,
          objectImage: module1126.SmartBubbleConfig[n].bubbleImg,
          imageStyle: u,
          gardienConfig: p,
          center: s,
          topOffset: n == module1126.SmartBubbleType.BT_CARPET ? 10 : 0,
          bubbleWidth: 80,
          transform: this.state.transform,
          textWidth: 70,
          animatedOpacity: this.samrtZoneBubbleOpa,
          mapDeg: this.props.mapDeg,
          onBubbleLayout: this.handleBubbleLayout,
          onPressBubble: this.handlePressSmartZoneBubble,
        });
      },
    },
    {
      key: 'getCleanPath',
      value: function (t, n, s) {
        if (this.props.mapMode == module1343.MAP_MODE_EASTER_EGG) return null;
        var o = null;
        if (this.state.pathGotoPlan && '' != this.state.pathGotoPlan)
          o = React.default.createElement(module1413.RRShape, {
            transform: 'android' != module13.Platform.OS || z ? s : null,
            stroke: this.color.pathGotoPlan,
            strokeWidth: 1,
            strokeDash: 'android' == module13.Platform.OS ? [5, 10] : [2, 2],
            d: this.state.pathGotoPlan,
          });
        var l = null;
        if (this.state.path && '' != this.state.path)
          l = React.default.createElement(module1413.RRShape, {
            transform: 'android' != module13.Platform.OS || z ? s : null,
            stroke: this.theme.map.pathColor,
            strokeWidth: 0.5,
            d: this.state.path,
          });
        var h = null;
        if (this.state.mopPath && '' != this.state.mopPath)
          h = React.default.createElement(module1413.RRShape, {
            transform: 'android' != module13.Platform.OS || z ? s : null,
            stroke: this.theme.map.mopPathColor,
            strokeWidth: 6.5,
            strokeOverlay: true,
            d: this.state.mopPath,
          });
        var u = null;
        if (this.state.backWashPath && '' != this.state.backWashPath)
          u = React.default.createElement(module1413.RRShape, {
            transform: 'android' != module13.Platform.OS || z ? s : null,
            stroke: this.theme.map.backWashPathColor,
            strokeWidth: 0.5,
            strokeCap: 'round',
            strokeDash: 'android' == module13.Platform.OS ? [0.5, 4] : [0.15, 1],
            d: this.state.backWashPath,
          });
        var p = null;
        if (this.state.pureCleanPath && '' != this.state.pureCleanPath)
          p = React.default.createElement(module1413.RRShape, {
            transform: 'android' != module13.Platform.OS || z ? s : null,
            stroke: this.theme.map.pureMopColor,
            strokeWidth: 0.5,
            d: this.state.pureCleanPath,
          });
        return React.default.createElement(
          j,
          {
            width: t,
            height: n,
            style: J.pathContainer,
          },
          o,
          h,
          l,
          u,
          p
        );
      },
    },
    {
      key: 'getCarpetEditView',
      value: function (t) {
        var n = this;
        return module390.default.isShowCarpetEditEntrance() && this.props.mapElementShowFlag & module1126.MapElementShow.FLOOR_CARPET
          ? React.default.createElement(module1468.CarpetsView, {
              ref: function (t) {
                return (n.carpetEditView = t);
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
              mapCarpetSaveEdit: this.props.mapCarpetSaveEdit,
            })
          : null;
      },
    },
    {
      key: 'getFurnitureView',
      value: function (t) {
        var n = this;
        return this.props.mapElementShowFlag & module1126.MapElementShow.FURNITURE &&
          (this.props.mapMode == module1343.MAP_MODE_FURNITURE_EDIT ||
            (this.props.showFurnitureOnly && !this.props.blockCanEdit) ||
            (this.props.mapMode != module1343.MAP_MODE_MAP_EDIT &&
              this.props.mapMode != module1343.MAP_MODE_GOTO_EDIT &&
              this.props.mapMode != module1343.MAP_MODE_EASTER_EGG &&
              !this.props.hideAccessory))
          ? React.default.createElement(module1468.FurnitureView, {
              ref: function (t) {
                return (n.furnitureView = t);
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
              showFurnitureIcon: this.props.showFurnitureIcon,
            })
          : null;
      },
    },
    {
      key: 'getHistoryMarkView',
      value: function (t) {
        var n = this;
        return this.props.parent.props.shouldShowRobotMovingAnimation
          ? React.default.createElement(module1468.HistoryMarkView, {
              ref: function (t) {
                return (n.historyMarkView = t);
              },
              mapDeg: this.props.mapDeg,
              parent: this,
              transform: t,
            })
          : null;
      },
    },
    {
      key: 'getEnemiesView',
      value: function () {
        var t = this;
        if (this.props.mapMode != module1343.MAP_MODE_EASTER_EGG) return null;
        if (!this.state.enemies || this.state.enemies.length <= 0) return null;
        var n = this.pixelOfElement(module1126.Config.size.objectsRadius),
          l = module23.default(n, 2),
          h = l[0],
          u = l[1];
        return this.state.enemies.map(function (n, o) {
          var l = module1339._convertToPixelPoint(n, t.state.transform);

          return !n.flag
            ? React.default.createElement(
                module13.Image,
                module22.default(
                  {
                    key: o,
                    pointerEvents: 'none',
                  },
                  module391.default.getAccessibilityLabel('map_enemies_' + o),
                  {
                    resizeMethod: 'scale',
                    style: {
                      position: 'absolute',
                      width: h,
                      height: u,
                      left: l.x - h / 2,
                      top: l.y - u / 2,
                    },
                    source: require('./1481'),
                  }
                )
              )
            : null;
        });
      },
    },
    {
      key: 'getDoorSillView',
      value: function (t) {
        var n = this;
        return this.props.mapElementShowFlag & module1126.MapElementShow.FLOOR_CARPET &&
          (module390.default.isSupportSmartDoorSill() || module390.default.isSupportCustomDoorSill()) &&
          1 != this.props.parent.state.inBlockMode &&
          this.props.mapMode != module1343.MAP_MODE_CARPET_EDIT &&
          this.props.mapMode != module1343.MAP_MODE_MAP_EDIT
          ? React.default.createElement(module1468.DoorSillView, {
              ref: function (t) {
                return (n.doorSillView = t);
              },
              mapMode: this.props.mapMode,
              mapDeg: this.props.mapDeg,
              transform: t,
              doorSills: this.state.doorSills,
              initDoorSill: this.props.initDoorSill,
              zonesHasEdited: this.props.zonesHasEdited,
              alwaysShowFBZ: this.props.alwaysShowFBZ,
              handleFBZPanEnd: this.handleFBZPanEnd,
              checkAndroidOverflow: this.handleCheckAndroidOverflow,
              mapEditPageDidChange: this.mapEditPageDidChange,
            })
          : null;
      },
    },
    {
      key: 'getAIObjectView',
      value: function (t) {
        var n = this;
        return (module390.default.isSupportStuckZone() || module390.default.isSupportSmartDoorSill()) &&
          1 != this.props.parent.state.inBlockMode &&
          this.props.mapMode == module1343.MAP_MODE_REGULAR
          ? React.default.createElement(module1468.AIObjectView, {
              ref: function (t) {
                return (n.aiObjectView = t);
              },
              mapMode: this.props.mapMode,
              mapDeg: this.props.mapDeg,
              transform: t,
              stuckPoints: this.state.stuckPoints,
              doorSills: this.state.doorSills,
              zonesHasEdited: this.props.zonesHasEdited,
              clickSmartZone: this.handleClickSmartZone,
            })
          : null;
      },
    },
    {
      key: 'render',
      value: function () {
        var t = this,
          n = new I({
            xx: this.state.transform.xx,
            yy: this.state.transform.yy,
          }),
          l = this.pixelOfElement(this.state.width, this.state.height),
          h = module23.default(l, 2),
          u = h[0],
          p = h[1];

        if (
          ((this.charging = this.isRobotOnCharger && this.state.charger),
          (this.charger = this.state.charger
            ? module22.default(n.point(this.state.charger.x, this.state.charger.y), {
                angle: this.state.charger.angle,
              })
            : {
                x: 0,
                y: 0,
                angle: 0,
              }),
          (this.robot = u && p && this.state.robot ? n.point(this.state.robot.x, this.state.robot.y) : n.point(50, 50)),
          (this.robotAngle = u && p && this.state.robotAngle ? this.state.robotAngle : 0),
          this.charging)
        ) {
          var c = this.state.status === module381.RobotState.WASHING_DUSTER ? 180 : 0;
          this.robotAngle = module1339.adjustChargerAngle(this.charger.angle) + module424.DMM.robotInMap.chargerAngle + c;
        }

        this.robotPos = (this.charging && this.charger) || this.robot;
        var v = module1126.Config.size.robotDiameter * n.xx;

        if (this.charging && this.charger) {
          var y = {
            x: (v - 10) * (module381.RSM.isO0Dock() ? 0.5 : 0.25) * Math.cos(this.degreeToRad(-module1339.adjustChargerAngle(this.charger.angle))),
            y: 0.5 * (v - 10) * Math.sin(this.degreeToRad(-module1339.adjustChargerAngle(this.charger.angle))),
          };
          this.robotPos = {
            x: this.robotPos.x + y.x,
            y: this.robotPos.y + y.y,
          };
        }

        var R = {
            overflow: 'visible',
            position: 'absolute',
            top: 0,
            left: 0,
            width: u,
            height: p,
          },
          w = this.getBlockMapsView(R),
          C = [];
        this.mapObjectRefs = this.getMapObjects(n, C);

        var S = this.props.mapMode == module1343.MAP_MODE_REGULAR,
          _ = this.getCleanPath(u, p, n),
          k = this.getForbiddenView(n),
          x = this.getFloorMapView(R),
          D = this.getCarpetMapView(R),
          T = this.getCarpetEditView(n),
          B = this.props.mapMode == module1343.MAP_MODE_CARPET_EDIT,
          F = this.getFurnitureView(n),
          L = this.props.mapMode != module1343.MAP_MODE_MAP_EDIT,
          V = this.getDoorSillView(n),
          N = this.props.mapMode == module1343.MAP_MODE_DOORSILL_EDIT,
          j = this.getAIObjectView(n),
          z = !this.props.hideAccessory && this.props.mapMode != module1343.MAP_MODE_ZONED_CLEAN_EDIT && this.props.mapMode != module1343.MAP_MODE_BLOCK_CLEAN_EDIT && p > 10;

        if (!module390.default.SupportOverflowTouch()) this.mapRotatePadding = S ? 160 : 100 * n.xx;
        var H = 'android' == module13.Platform.OS && this.props.mapPanStatus != module1126.PanStatus.MAP_VIEWING_NONE;
        return React.default.createElement(
          module13.View,
          {
            pointerEvents: H ? 'none' : 'box-none',
            style: [
              J.container,
              {
                left: this.state.transform.x,
                top: this.state.transform.y,
                width: u + 2 * this.mapRotatePadding,
                height: p + 2 * this.mapRotatePadding,
              },
              module390.default.isSupportMapRotate() && {
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
            module13.View,
            {
              pointerEvents: 'box-none',
              style: {
                width: u,
                height: p,
              },
            },
            React.default.createElement(
              module13.View,
              module22.default(
                {
                  pointerEvents: 'none',
                  style: J.mapContainer,
                },
                module391.default.getAccessibilityLabel('map_image_view')
              ),
              React.default.createElement(
                module1414,
                {
                  pointerEvents: 'none',
                  layerScaleFilter: 'Nearest',
                  source: this.currentMap
                    ? {
                        uri: this.currentMap,
                      }
                    : null,
                  style: J.mapImage,
                  onLoad: this.props.imageOnloadCallback
                    ? function (n) {
                        return t.mapSourceOnLoad(n.nativeEvent.source, module1126.shareViewLoadType.ONLOAD_MAP);
                      }
                    : null,
                },
                w,
                x,
                D,
                !B && T,
                !N && V,
                !this.props.parent.props.shouldShowRobotMovingAnimation && z && _
              )
            ),
            this.getDisplayZonesView(),
            this.getChargerWaringAnimation(),
            this.getCharger(),
            this.getChargerForbid(),
            this.getRobotAnimation(),
            this.props.parent.props.shouldShowRobotMovingAnimation ? this.getAnimatedRobot(u, p) : this.getRobot(this.robotAngle),
            this.getSpecialChargerTopView(),
            !S && C,
            this.getEnemiesView(),
            !L && F,
            k,
            N && V,
            B && T,
            L && F,
            this.getCleanRect(n),
            this.props.showExtraRect && this.getCleanRect(n, module1126.CleanRectType.Extra),
            React.default.createElement(module1479, {
              ref: function (n) {
                return (t.target = n);
              },
              transform: n,
              mapDeg: this.props.mapDeg,
              onLongPress: function () {
                t.props.parent.targetDroped = true;
              },
            }),
            S && C,
            this.getBlockBubbleView(),
            j,
            this.getBlockOperationView(n),
            this.state.showChargerBubble && this.getChargerBubbleView(),
            this.state.showFurnitureBubble && this.getFurnitureBubbleView(),
            this.state.showSmartZoneBubble && this.getSmartZoneBubbleView(),
            this.getChargerStatusAnimation(),
            this.getHistoryMarkView(n)
          )
        );
      },
    },
    {
      key: 'getBlockOpts',
      value: function () {
        return this.blockOp ? this.blockOp.getLeftRightPos() : null;
      },
    },
    {
      key: '_getCRRefs',
      value: function (t) {
        return [
          t == module1126.CleanRectType.Normal ? this.rectReferences : this.exRectRefs,
          t == module1126.CleanRectType.Normal ? module1126.MAX_COUNT_ZONE_RECT : module1126.MAX_COUNT_EXTRA_ZONE,
        ];
      },
    },
    {
      key: 'getVisibleRectZones',
      value: function () {
        for (
          var t = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : module1126.CleanRectType.Normal,
            n = this._getCRRefs(t),
            s = module23.default(n, 2),
            l = s[0],
            h = s[1],
            u = [],
            p = 1;
          p <= h;
          p++
        ) {
          var c;
          if (null == (c = l[p]) ? undefined : c.state.visible) u.push(l[p]);
        }

        if (u.length <= 0) return null;
        else {
          u.sort(function (t, n) {
            return t.state.serial - n.state.serial;
          });
          return u;
        }
      },
    },
    {
      key: 'clearRectFocus',
      value: function () {
        for (
          var t = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : module1126.CleanRectType.Normal,
            n = this._getCRRefs(t),
            s = module23.default(n, 2),
            l = s[0],
            h = s[1],
            u = 1;
          u <= h;
          u++
        ) {
          var p;
          if (!(null == (p = l[u])))
            p.setState({
              isFocus: false,
            });
        }
      },
    },
    {
      key: 'addRectangle',
      value: function () {
        for (
          var t = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : null,
            n = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : module1126.CleanRectType.Normal,
            s = this._getCRRefs(n),
            l = module23.default(s, 2),
            h = l[0],
            u = l[1],
            p = this._getVisibleZonesCount(h),
            c = 1;
          c <= u;
          c++
        )
          if (h[c] && 0 == h[c].state.visible && h[c].state.serial == p + 1) {
            var f,
              b,
              v,
              y = this.degreeToRad(-1 * this.props.mapDeg);
            t = t ? module1339._getRotateRect(t, -1 * this.props.mapDeg) : this._getDefaultMapZonesArea(c);
            if (!(null == (f = h[c])))
              f.setState({
                visible: true,
                rectSize: t,
                slopeAngle: y || 0,
              });

            this._setMapZonesFocus(h, c);

            if (!(null == (b = (v = this.props).cleanRectChanged))) b.call(v, p + 1, n);
            return true;
          }

        return false;
      },
    },
    {
      key: 'addRectangleArray',
      value: function (t) {
        var n = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : module1126.CleanRectType.Normal,
          s = arguments.length > 2 && undefined !== arguments[2] && arguments[2];
        if (!t || t.length <= 0) return false;
        t = t.filter(function (t) {
          return t && 'object' == typeof t;
        });

        var l = this._getCRRefs(n),
          h = module23.default(l, 2),
          u = h[0],
          p = h[1],
          c = this._getVisibleZonesCount(u);

        if (p - c < t.length) t = t.splice(0, p - c);

        for (var f, b, v = 0, y = false, R = this.degreeToRad(-1 * this.props.mapDeg), w = 1; w <= p; w++) {
          if (u[w] && 0 == u[w].state.visible && u[w].state.serial == c + v + 1) {
            var C,
              M = t[v];
            if (!M) continue;
            M = module1339._getRotateRect(M, -1 * this.props.mapDeg);
            if (!(null == (C = u[w])))
              C.setState({
                visible: true,
                rectSize: M,
                slopeAngle: R || 0,
                enable: s,
              });
            v++;
            y = true;
          }

          if (v >= t.length) break;
        }

        if (y) null == (f = (b = this.props).cleanRectChanged) || f.call(b, c + v, n);
        return y;
      },
    },
    {
      key: 'removeRectangle',
      value: function (t) {
        var n,
          s,
          l,
          h = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : module1126.CleanRectType.Normal,
          u = this._getCRRefs(h),
          p = module23.default(u, 2),
          c = p[0],
          f = p[1];

        if (c[t].state.visible) {
          for (var b = this._getVisibleZonesCount(c), v = 1; v <= f; v++) {
            var y, R;
            if ((null == (y = c[v]) ? undefined : y.state.visible) && c[v].state.serial > c[t].state.serial)
              null == (R = c[v]) ||
                R.setState({
                  serial: c[v].state.serial - 1,
                });
          }

          if (!(null == (n = c[t])))
            n.setState({
              visible: false,
              isFocus: false,
              serial: b,
              enable: true,
            });
          if (!(null == (s = (l = this.props).cleanRectChanged))) s.call(l, b - 1, h);
        }
      },
    },
    {
      key: 'removeAllRects',
      value: function () {
        for (
          var t = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : module1126.CleanRectType.Normal,
            n = this._getCRRefs(t),
            s = module23.default(n, 2),
            l = s[0],
            h = s[1];
          h >= 1;
          h--
        ) {
          var u;
          if (!(null == (u = l[h]))) u.reInitRender(h);
        }
      },
    },
    {
      key: 'getVisibleExtraRectCount',
      value: function () {
        return this._getVisibleZonesCount(this.exRectRefs);
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
        for (var n = 1; n <= module1126.MAX_COUNT_ZONE_RECT; n++) {
          var s;
          if (!(null == (s = this.rectReferences[n])))
            s.setState({
              shouldHide: 3 != t && 4 != t,
              enable: 3 == t,
            });
        }
      },
    },
    {
      key: 'setExtraRectEnable',
      value: function (t) {
        for (var n = 1; n <= module1126.MAX_COUNT_EXTRA_ZONE; n++) {
          var s;
          if (!(null == (s = this.exRectRefs[n])))
            s.setState({
              isFocus: false,
              enable: t,
            });
        }
      },
    },
    {
      key: 'updateRotateRects',
      value: function () {
        for (var t = 1; t <= module1126.MAX_COUNT_ZONE_RECT; t++) {
          var n;
          if (!(null == (n = this.rectReferences[t]))) n.updateRotateRects();
        }
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
        var n;
        if (!(null == (n = this.forbiddenEditView))) n.removeWall(t);
      },
    },
    {
      key: 'addWall',
      value: function () {
        var t,
          n = null == (t = this.forbiddenEditView) ? undefined : t.getNewWallIndex();

        if (n > 0) {
          var s,
            l = this._getDefaultWallPos(n),
            h = module23.default(l, 2),
            u = h[0],
            p = h[1];

          if (!(null == (s = this.forbiddenEditView))) s.addWall(n, u, p);
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
        var n;
        return null == (n = this.forbiddenEditView) ? undefined : n.isFBZsReachMaxNum(t);
      },
    },
    {
      key: 'addFBZoneNew',
      value: function (t) {
        var n,
          s = null == (n = this.forbiddenEditView) ? undefined : n.getNewRectIndex(t);

        if (s > 0) {
          var o,
            l = this.degreeToRad(-1 * this.props.mapDeg),
            h = this._getDefaultMapZonesArea(s);

          if (!(null == (o = this.forbiddenEditView))) o.addFBZZones(s, h, l, t);
        }
      },
    },
    {
      key: 'clearFBZonesFocus',
      value: function (t) {
        var n;
        if (!(null == (n = this.forbiddenEditView))) n.clearFBZonesFocus(t);
      },
    },
    {
      key: 'clearFBZonesNewAddedFlag',
      value: function (t) {
        var n;
        if (!(null == (n = this.forbiddenEditView))) n.clearFBZonesNewAddedFlag(t);
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
      key: 'getEditAIFBZPoint',
      value: function () {
        var t;
        return (null == (t = this.forbiddenEditView) ? undefined : t.getEditStuckPoint()) || [];
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
      key: 'getEditCliffZones',
      value: function () {
        var t;
        return null == (t = this.forbiddenEditView) ? undefined : t.getEditCliffZones();
      },
    },
    {
      key: 'getNoEditCliffZones',
      value: function () {
        var t;
        return null == (t = this.forbiddenEditView) ? undefined : t.getNoEditCliffZones();
      },
    },
    {
      key: 'isDeleteCliff',
      value: function () {
        var t;
        return null == (t = this.forbiddenEditView) ? undefined : t.isDeleteCliff();
      },
    },
    {
      key: 'addCarpetFBZoneByClick',
      value: function (t) {
        this.setCarpetPos(t);
        var n,
          s = this.getRealRectForCarpet();
        return (
          !!s &&
          (this.isCarpetReachMaxNum(false)
            ? (globals.showToast(module510.map_edit_carpet_zone_exceed_limit), false)
            : (null == (n = this.carpetEditView) || n.addCarpetZones(s, 0, false), true))
        );
      },
    },
    {
      key: 'addCarpetEditZone',
      value: function (t) {
        var n,
          s = this._getDefaultMapZonesArea(),
          o = this.degreeToRad(-1 * this.props.mapDeg);

        if (!(null == (n = this.carpetEditView))) n.addCarpetZones(s, o, t);
      },
    },
    {
      key: 'clearCarpetEditZones',
      value: function (t) {
        var n;
        if (!(null == (n = this.carpetEditView) || null == n.clearCarpetZonesFocus)) n.clearCarpetZonesFocus(t);
      },
    },
    {
      key: 'getVisibleCarpetZones',
      value: function (t) {
        var n;
        return (null == (n = this.carpetEditView) ? undefined : n.getVisibleCarpetZones(t)) || [];
      },
    },
    {
      key: 'isCarpetReachMaxNum',
      value: function (t) {
        var n;
        return null == (n = this.carpetEditView) ? undefined : n.isCarpetEditZonesMax(t);
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
        var n;
        return null == (n = this.carpetEditView) ? undefined : n.isEditCarpetOverlap(t);
      },
    },
    {
      key: 'handleShowCarpetBubbleGuide',
      value: function () {
        this.carpetArea = this.getCarpetRectByIndex();
        if (this.carpetArea) this.showSmartZoneBubble(module1126.SmartBubbleType.BT_CARPET);
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
      value: function (t, n) {
        this.setCarpetPos(t);
        this.carpetArea = this.getRealRectForCarpet();
        if (!this.carpetArea) this.carpetArea = this.getRectForCustomCarpet();

        if (this.carpetArea) {
          if (n && module390.default.isCarpetSupported()) this.showSmartZoneBubble(module1126.SmartBubbleType.BT_CARPET);
          if (this.props.mapMode == module1343.MAP_MODE_ZONED_CLEAN_EDIT && !this.addRectangle(this.carpetArea)) globals.showToast(module510.rubys_main_zone_max_tips);
        } else this.hideSmartZoneBubble();
      },
    },
    {
      key: 'hideChargerBubble',
      value: function () {
        var t = this;
        if (this.chargerTimer) module1420.clearTimeout(this.chargerTimer);
        if (this.state.showChargerBubble)
          module13.Animated.timing(this.chargerBubbleOpacity, {
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
        var n = this,
          s = {};
        if (t && t.length)
          s = {
            chargerErrorText: t,
          };
        this.setState(
          D(
            {
              showChargerBubble: true,
            },
            s
          ),
          function () {
            module13.Animated.timing(n.chargerBubbleOpacity, {
              toValue: 1,
              duration: 500,
            }).start(function () {
              n.hideAllMapObjects();
              n.hideFurnitureBubble();
              n.hideSmartZoneBubble();
            });
          }
        );
        if (!(t && t.length)) this.chargerTimer = module1420.setTimeout(this.hideChargerBubble.bind(this), 5e3);
      },
    },
    {
      key: 'handleShowFurnitureBubble',
      value: function (t, n) {
        if (this.props.mapMode != module1343.MAP_MODE_ZONED_CLEAN_EDIT && !this._isGlobalTag()) return false;
        if (!this.state.furnitures || this.state.furnitures.length <= 0) return false;
        if (!(this.props.mapElementShowFlag & module1126.MapElementShow.FURNITURE)) return false;
        if (!this._isAvailablePosition(t, false)) return false;
        this.furnitureArea = null;

        for (var s = 0; s < this.state.furnitures.length; s++) {
          var o = this.state.furnitures[s];

          if (o && o.type != module1126.FurnitureType.FT_TOILET) {
            var l = this._checkTouchPosInZone(o, t);

            if (l) {
              this.furnitureArea = {
                x: l.x - 10,
                y: l.y - 10,
                width: l.width + 20,
                height: l.height + 20,
                type: o.type,
                subType: o.subType,
                edited: o.edited,
              };
              break;
            }
          }
        }

        var h;
        if (this.furnitureArea)
          this.props.mapMode == module1343.MAP_MODE_ZONED_CLEAN_EDIT
            ? !(null == (h = this.furnitureView) ? undefined : h.showFurnitureIcon(this.furnitureArea.type, this.furnitureArea.edited)) &&
              !this.addRectangle(this.furnitureArea) &&
              globals.showToast(module510.rubys_main_zone_max_tips)
            : this._isGlobalTag() && n && this.showFurnitureBubble();
        else this.hideFurnitureBubble();
        return null != this.furnitureArea;
      },
    },
    {
      key: 'showFurnitureBubble',
      value: function () {
        var t = this;
        this.setState(
          {
            showFurnitureBubble: true,
          },
          function () {
            module13.Animated.timing(t.furnitureBubbleOpa, {
              toValue: 1,
              duration: 500,
            }).start(function () {});
          }
        );
        if (this.furnitureTimer) module1420.clearTimeout(this.furnitureTimer);
        this.furnitureTimer = module1420.setTimeout(this.hideFurnitureBubble.bind(this), 5e3);
      },
    },
    {
      key: 'hideFurnitureBubble',
      value: function () {
        var t = this;
        if (this.furnitureTimer) module1420.clearTimeout(this.furnitureTimer);
        if (this.state.showFurnitureBubble)
          module13.Animated.timing(this.furnitureBubbleOpa, {
            toValue: 0,
            duration: 200,
          }).start(function () {
            t.setState({
              showFurnitureBubble: false,
            });
          });
      },
    },
    {
      key: 'handleShowSmartBubbleGuide',
      value: function (t) {
        var n,
          s,
          o,
          l = null,
          h = false;
        if (t == module1126.SmartBubbleType.BT_CLIFF && (null == (n = this.state.cliffZones) ? undefined : n.length) > 0) l = this.state.cliffZones[0];
        else if (t == module1126.SmartBubbleType.BT_DOORSILL && (null == (s = this.state.doorSills) ? undefined : s.length) > 0) {
          var u = this.state.doorSills.findIndex(function (t) {
            return t.type == module1126.DoorSillType.SmartSill;
          });
          if (-1 != u) l = this.state.doorSills[u];
        } else if (t == module1126.SmartBubbleType.BT_STUCK && (null == (o = this.state.stuckPoints) ? undefined : o.length) > 0) {
          l = {
            rectSize: module1339._pointToStuckRect(this.state.stuckPoints[0]),
            slopeAngle: 0,
          };
          h = true;
        }

        if (l) {
          var p = module1339._getRotateMaxRectSize(l);

          this.smartZoneInfo = {
            zoneArea: {
              x: p.x - 2,
              y: p.y - 2,
              width: p.width + 4,
              height: p.height + 4,
            },
            zoneData: h ? this.state.stuckPoints[0] : l,
          };
          this.showSmartZoneBubble(t);
        }
      },
    },
    {
      key: 'handleShowSmartZoneBubble',
      value: function (t, n) {
        var s;
        if (!this._isGlobalTag() || !n) return false;
        if (!this._isAvailablePosition(t, false)) return false;

        var o = function (t) {
          return {
            x: t.x - 2,
            y: t.y - 2,
            width: t.width + 4,
            height: t.height + 4,
          };
        };

        if (((this.smartZoneInfo = null), (null == (s = this.state.cliffZones) ? undefined : s.length) > 0))
          for (var l = 0; l < this.state.cliffZones.length; l++) {
            var h = this._checkTouchPosInZone(this.state.cliffZones[l], t);

            if (h) {
              this.smartZoneInfo = {
                zoneArea: o(h),
                zoneData: this.state.cliffZones[l],
              };
              break;
            }
          }
        if (this.smartZoneInfo) this.showSmartZoneBubble(module1126.SmartBubbleType.BT_CLIFF);
        else this.hideSmartZoneBubble();
        return null != this.smartZoneInfo;
      },
    },
    {
      key: 'showSmartZoneBubble',
      value: function (t) {
        var n = this;
        this.samrtZoneBubbleOpa.setValue(0);
        this.setState(
          {
            showSmartZoneBubble: true,
            smartBubbleType: t,
          },
          function () {
            module13.Animated.timing(n.samrtZoneBubbleOpa, {
              toValue: 1,
              duration: 500,
            }).start(function () {});
          }
        );
        if (this.smartBBTimer) module1420.clearTimeout(this.smartBBTimer);
        this.smartBBTimer = module1420.setTimeout(this.hideSmartZoneBubble.bind(this), 5e3);
      },
    },
    {
      key: 'hideSmartZoneBubble',
      value: function () {
        var t = this;
        if (this.smartBBTimer) module1420.clearTimeout(this.smartBBTimer);
        if (this.state.showSmartZoneBubble)
          module13.Animated.timing(this.samrtZoneBubbleOpa, {
            toValue: 0,
            duration: 200,
          }).start(function () {
            t.setState({
              showSmartZoneBubble: false,
              smartBubbleType: module1126.SmartBubbleType.BT_NONE,
            });
          });
      },
    },
    {
      key: '_checkTouchPosInZone',
      value: function (t, n) {
        var s = !(arguments.length > 2 && undefined !== arguments[2]) || arguments[2];
        if (!t || !t.rectSize) return null;
        var o = t.rectSize;
        if (!(o.x && o.y && o.width && o.height)) return null;

        var l = s ? module1339._getRotateMaxRectSize(t) : t.rectSize,
          h = module1339._convertToPixelRect(l, this.state.transform);

        return n.x >= h.x && n.x <= h.x + h.width && n.y >= h.y && n.y <= h.y + h.height ? l : null;
      },
    },
    {
      key: '_getCarpetBubbleCenter',
      value: function () {
        if (!this.carpetArea || !this.carpetArea.realX) return null;
        var t = this.props.mapMode != module1343.MAP_MODE_ZONED_CLEAN_EDIT ? this.carpetArea.realX : this.carpetArea.x,
          n = this.props.mapMode != module1343.MAP_MODE_ZONED_CLEAN_EDIT ? this.carpetArea.realY : this.carpetArea.y,
          s = this.props.mapMode != module1343.MAP_MODE_ZONED_CLEAN_EDIT ? this.carpetArea.realW : this.carpetArea.width,
          o = this.props.mapMode != module1343.MAP_MODE_ZONED_CLEAN_EDIT ? this.carpetArea.realH : this.carpetArea.height,
          l = this.carpetArea.x + this.carpetArea.width / 2,
          h = this.carpetArea.y + this.carpetArea.height / 2,
          u = {
            x: l,
            y: n,
          },
          p = this.props.mapDeg % 360;
        if (p)
          u =
            90 === p || -270 === p
              ? {
                  x: t,
                  y: h,
                }
              : 180 === p || -180 === p
              ? {
                  x: l,
                  y: n + o + 10,
                }
              : 270 === p || -90 === p
              ? {
                  x: t + s,
                  y: h,
                }
              : {
                  x: l,
                  y: h,
                };
        return u;
      },
    },
    {
      key: '_getChargerBubbleCenter',
      value: function () {
        var t = {
            x: this.charging ? this.robotPos.x : this.charger.x,
            y: this.charging ? this.robotPos.y : this.charger.y,
          },
          n = (module1126.Config.size.robotRadius * (this.state.transform.yy || 1)) / 2,
          s = {
            x: n,
            y: n,
          };
        return module1339._getRectBubbleCenter(t, s, this.props.mapDeg);
      },
    },
    {
      key: '_getFurnitureBubbleCenter',
      value: function (t) {
        if (!this.furnitureArea || !this.furnitureArea.x || !this.furnitureArea.type) return [null, null];
        var n = module1126.getFurnitureName(this.furnitureArea.type, this.furnitureArea.subType),
          s = 180 == Math.abs(this.props.mapDeg) ? 1 : -0.5,
          o = this.furnitureArea.y + Math.floor(this.furnitureArea.height / 2 + s);
        if (t) o -= module1126.Config.size.objectsRadius / 2 + 2;
        return [
          {
            x: this.furnitureArea.x + Math.floor(this.furnitureArea.width / 2 + 0.5),
            y: o,
          },
          n,
        ];
      },
    },
    {
      key: '_getSmartZoneBubbleCenter',
      value: function (t) {
        if (!t || !t.x || !t.y) return null;
        var n = {
            x: t.width / 2,
            y: t.height / 2,
          },
          s = {
            x: t.x + n.x,
            y: t.y + n.y,
          };
        return module1339._getRectBubbleCenter(s, n, this.props.mapDeg);
      },
    },
    {
      key: '_cleanAllMapBubble',
      value: function () {
        this.hideChargerBubble();
        this.hideFurnitureBubble();
        this.hideSmartZoneBubble();
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
        for (var n = 0, s = 1; s <= module1126.MAX_COUNT_WALL_OR_FBZ; s++) t[s] && t[s].state.visible && n++;

        return n;
      },
    },
    {
      key: '_setMapZonesFocus',
      value: function (t, n) {
        for (var s = 1; s <= module1126.MAX_COUNT_WALL_OR_FBZ; s++)
          s == n
            ? t[s] &&
              t[s].setState({
                isFocus: true,
              })
            : t[s] &&
              t[s].setState({
                isFocus: false,
              });
      },
    },
    {
      key: '_getDefaultMapZonesArea',
      value: function () {
        var t = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : -1,
          n = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : -1,
          s = arguments.length > 2 && undefined !== arguments[2] ? arguments[2] : -1,
          o = -1 == n ? module1126.DEFAULT_FBZ_REALHEIGHT : n * (this.state.transform.xx || 1),
          l = -1 == n ? this.justifyRealSize(o) : n,
          h = -1 == s ? this.justifyRealSize(module1126.DEFAULT_FBZ_REALWIDTH) : s,
          u = this.props.parent.getMapViewHeight() / 2;
        u -= o / 2;
        var p = -1 != t ? ((t - 1) * module1126.DEFAULT_RECT_MARGIN) / 2 : 0,
          c = {
            x: module1126.RectConfig.initSize.x + p,
            y: u + p,
          },
          f = {
            width: h,
            height: l,
          };
        return this._convertDefaultZonesArea(c, f);
      },
    },
    {
      key: '_convertDefaultZonesArea',
      value: function (t, n) {
        var module22,
          o = this.state.transform.xx || 1,
          l = this.state.transform.yy || 1;

        if (this.isRotated()) {
          var h = {
              width: n.width * o,
              height: n.height * l,
            },
            u = {
              x: t.x + h.width / 2,
              y: t.y + h.height / 2,
            };
          module22 = {
            x: (module22 = this.props.parent._translateXY(u)).x / o - n.width / 2,
            y: module22.y / l - n.height / 2,
          };
        } else
          module22 = {
            x: (module22 = this.props.parent._translateXY(t)).x / o,
            y: module22.y / l,
          };

        var p = (this._getEdgeCheckPadding() - 35) / this.state.transform.xx - n.width / 2,
          c = {
            x: module22.x + n.width / 2,
            y: module22.y + n.height / 2,
          };
        c.x = (c.x ** (-1 * p)) ** (this.state.width + p);
        c.y = (c.y ** (-1 * p)) ** (this.state.height + p);
        module22 = {
          x: c.x - n.width / 2,
          y: c.y - n.height / 2,
        };
        return D(D({}, n), module22);
      },
    },
    {
      key: '_getFurnitureDefaultArea',
      value: function (t, n) {
        var s = arguments.length > 2 && undefined !== arguments[2] ? arguments[2] : null,
          l = module1126.getFurnitureEdge(t, n),
          h = [l.maxWidth, l.maxHeight],
          u = h[0],
          p = h[1],
          c = this.pixelOfElement(u, p),
          f = module23.default(c, 2),
          v = f[0],
          y = f[1],
          R = {
            width: u,
            height: p,
          },
          w = {
            x: (s ? s.x : module13.Dimensions.get('window').width / 2) - v / 2,
            y: (s ? s.y : this.props.parent.getMapViewHeight() / 2) - y / 2,
          };
        return this._convertDefaultZonesArea(w, R);
      },
    },
    {
      key: '_getDefaultWallPos',
      value: function (t) {
        var n = this.props.parent.getMapViewHeight() / 2,
          s = ((t - 1) * module1126.DEFAULT_RECT_MARGIN) / 2,
          o = {
            x: module1126.wallConfig.initSize.start_x + s,
            y: n + s,
          },
          l = this.justifyRealSize(module1126.DEFAULT_FBZ_REALWIDTH),
          h = this.props.parent._translateXY(o);

        h = {
          x: h.x / (this.state.transform.xx || 1),
          y: h.y / (this.state.transform.yy || 1),
        };
        var u = (this._getEdgeCheckPadding() - 45) / this.state.transform.xx;
        h.x = (h.x ** (-1 * u)) ** (this.state.width + u);
        h.y = (h.y ** (-1 * u)) ** (this.state.height + u);
        var p = {
          x: h.x + l * Math.cos(this.degreeToRad(this.props.mapDeg)),
          y: h.y - l * Math.sin(this.degreeToRad(this.props.mapDeg)),
        };
        p.x = (p.x ** (-1 * u)) ** (this.state.width + u);
        p.y = (p.y ** (-1 * u)) ** (this.state.height + u);
        return [D({}, h), p];
      },
    },
    {
      key: 'getCarpetRectByIndex',
      value: function () {
        if (-1 === this.state.carpetFirstIndex) return null;
        var t = this.state.carpetFirstIndex,
          n = this.convertIndexToPos(t),
          s = this.getMaxCarpetRect(n, t);
        return (
          s ||
          D(
            {
              width: this.justifyRealSize(module1126.DEFAULT_FBZ_REALWIDTH),
              height: this.justifyRealSize(module1126.DEFAULT_FBZ_REALHEIGHT),
            },
            n
          )
        );
      },
    },
    {
      key: 'getRealRectForCarpet',
      value: function () {
        if (undefined === this.state.carpetMap || undefined === this.state.carpetData) return null;
        if (!(this.props.mapElementShowFlag & module1126.MapElementShow.FLOOR_CARPET)) return null;
        var t = this.carpetPos;
        if (!this._isAvailablePosition(t)) return null;
        var n = {
            x: Math.floor(t.x / this.state.transform.xx),
            y: Math.floor(t.y / this.state.transform.yy),
          },
          s = this.convertPosToIndex(n);
        if (this.state.carpetData && (s > this.state.carpetData.length - 1 || 0 == this.state.carpetData[s])) return null;
        var o = this.getMaxCarpetRect(n, s);
        return (
          o ||
          D(
            {
              width: this.justifyRealSize(module1126.DEFAULT_FBZ_REALWIDTH),
              height: this.justifyRealSize(module1126.DEFAULT_FBZ_REALHEIGHT),
            },
            n
          )
        );
      },
    },
    {
      key: 'getMaxCarpetRect',
      value: function (t, n) {
        var s = this,
          o = this.state.carpetData,
          l = new Array(o.length);
        module398.fill(l, 0);
        var h = [],
          u = t.x,
          p = t.x,
          c = t.y,
          f = t.y;
        l[n] = 1;
        h.push(t);

        for (
          var b = function () {
            var t = undefined,
              n = h.pop();
            p = n.x ** p;
            f = n.y ** f;
            u = n.x ** u;
            c = n.y ** c;
            var b = [];
            if (n.x > 0)
              b.push({
                x: n.x - 1,
                y: n.y,
              });
            if (n.x < s.state.width - 1)
              b.push({
                x: n.x + 1,
                y: n.y,
              });
            if (n.y > 0)
              b.push({
                x: n.x,
                y: n.y - 1,
              });
            if (n.y < s.state.height - 1)
              b.push({
                x: n.x,
                y: n.y + 1,
              });
            b.forEach(function (n) {
              t = s.convertPosToIndex(n);

              if (1 == o[t] && 0 == l[t]) {
                l[t] = 1;
                h.push(n);
              }
            });
          };
          h.length > 0;

        )
          b();

        var v = {
          x: p,
          y: f,
          width: u - p + 1,
          height: c - f + 1,
        };
        return this.adjustMinCarpetRect(v);
      },
    },
    {
      key: 'adjustMinCarpetRect',
      value: function (t) {
        var n = t.width,
          s = t.height,
          o = [t.x, t.y],
          l = o[0],
          h = o[1];

        if (n + 6 < module1126.RectConfig.minLength) {
          l -= (module1126.RectConfig.minLength - n) / 2;
          n = module1126.RectConfig.minLength;
        } else {
          l -= 3;
          n += 6;
        }

        if (s + 6 < module1126.RectConfig.minLength) {
          h -= (module1126.RectConfig.minLength - s) / 2;
          s = module1126.RectConfig.minLength;
        } else {
          h -= 3;
          s += 6;
        }

        return {
          x: l,
          y: h,
          width: n,
          height: s,
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
      key: 'getRectForCustomCarpet',
      value: function () {
        if (!this.state.cusCarpetZones || this.state.cusCarpetZones.length <= 0) return null;
        var t = this.carpetPos;
        if (!this._isAvailablePosition(t)) return null;

        for (var n = 0; n < this.state.cusCarpetZones.length; n++) {
          var o = this.state.cusCarpetZones[n],
            l = this._checkTouchPosInZone(o, t, false);

          if (l) {
            var h = this.adjustMinCarpetRect(l);
            return module22.default(h, {
              custom: true,
            });
          }
        }

        return null;
      },
    },
    {
      key: 'moveMapIfNeeded',
      value: function (t, n) {
        if (!this.isRotated()) {
          var s = module13.Dimensions.get('window').width,
            o = t && t.width ? t.width : 70;

          if (!n) {
            var l = module1339._convertToPixelRect(this.carpetArea, this.state.transform);

            if (!l || !l.x || !l.width) return;
            n = l.x + l.width / 2;
          }

          var h = this.props.parent._translateXYFromMap(
              {
                x: n,
                y: 0,
              },
              this.state.transform
            ),
            u = 0,
            p = (o + (s - o) ** 80) / 2;

          if (h.x < p) u = p - h.x;
          if (h.x > s - p) u = s - h.x - p;
          if (u) this.props.parent.moveMap(u, 0);
        }
      },
    },
    {
      key: 'moveMapToRectCenter',
      value: function (t) {
        var n;

        if (t) {
          var s = t.x + t.width / 2,
            l = t.y + t.height / 2,
            h = this.state.width / 2,
            u = this.state.height / 2,
            p = h - s,
            c = u - l;

          if (this.isRotated()) {
            var f = module1339._parseDegPoint(p, c, -1 * this.props.mapDeg),
              b = module23.default(f, 2),
              v = b[0],
              y = u + b[1];

            p = h + v - this.state.width / 2;
            c = y - this.state.height / 2;
          }

          var E = this.pixelOfElement(p, c),
            R = module23.default(E, 2),
            w = R[0],
            C = R[1];
          if (!(null == (n = this.props.parent) || null == n.moveMapTo)) n.moveMapTo(w, C);
        }
      },
    },
    {
      key: 'mapOriginXYToScreen',
      value: function (t) {
        var n = this.props.parent.state.map;
        return {
          x: (t.x + 0.5) * this.state.transform.xx,
          y: (n.height - t.y - 0.5) * this.state.transform.yy,
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
        var n = t / (this.state.transform.xx || 1);
        return (n ** module1126.RectConfig.maxLength) ** module1126.RectConfig.minLength;
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
        var n = !(arguments.length > 1 && undefined !== arguments[1]) || arguments[1],
          s = this.pixelOfElement(this.state.width, this.state.height),
          l = module23.default(s, 2),
          h = l[0],
          u = l[1];
        return !(!h || !u) && (!n || !(t.x < 0 || t.y < 0 || t.x > h || t.y > u));
      },
    },
    {
      key: '_getEdgeCheckPadding',
      value: function () {
        return module390.default.SupportOverflowTouch() ? 100 * this.state.transform.xx : this.mapRotatePadding;
      },
    },
    {
      key: 'hideAllMapObjects',
      value: function () {
        for (var t = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : null, n = this.mapObjectRefs || [], s = 0; s < n.length; s++)
          (t && n[s].props.originX == t.originX && n[s].props.originY == t.originY) || n[s].hideBubble();
      },
    },
    {
      key: 'addFurniture',
      value: function (t, n) {
        var s,
          o = arguments.length > 2 && undefined !== arguments[2] ? arguments[2] : null,
          l = this.degreeToRad(-1 * this.props.mapDeg),
          h = this._getFurnitureDefaultArea(t, n, o);

        if (!(this.handleCheckAndroidOverflow(h, null, l, true) || null == (s = this.furnitureView))) s.addFurniture(t, n, h, l);
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
    {
      key: 'getAllFurnitures',
      value: function () {
        var t;
        return (null == (t = this.furnitureView) ? undefined : t.getAllFurnitures()) || [];
      },
    },
    {
      key: 'addHistoryMark',
      value: function () {
        var t,
          n = null == (t = this.historyMarkView) ? undefined : t.getNewRectIndex();

        if (-1 != n) {
          if (n > 0) {
            var s,
              o = this.degreeToRad(-1 * this.props.mapDeg),
              l = this._getDefaultMapZonesArea(n);

            if (!(null == (s = this.historyMarkView))) s.addMarkZone(n, l, o);
          }
        } else globals.showToast(module510.history_mark_zone_exceed_limit);
      },
    },
    {
      key: 'clearAllMarkFocus',
      value: function () {
        var t;
        if (!(null == (t = this.historyMarkView))) t.clearMarkZoneFocus();
      },
    },
    {
      key: 'addDoorSill',
      value: function (t) {
        var n, s;

        if (null == (n = this.doorSillView) || !n.checkMaxCount()) {
          var o = this.degreeToRad(-1 * this.props.mapDeg),
            l = this._getDefaultMapZonesArea(1, t, module1126.DoorConfig.df_width);

          if (!(null == (s = this.doorSillView))) s.addDoorSill(l, o, t != module1126.DoorConfig.other_df_height);
        }
      },
    },
    {
      key: 'clearAllDoorSillFocus',
      value: function () {
        var t;
        if (!(null == (t = this.doorSillView))) t.clearAllDoorSillFocus();
      },
    },
    {
      key: 'getAllDoorSills',
      value: function () {
        var t;
        return (null == (t = this.doorSillView) ? undefined : t.getAllDoorSills()) || [];
      },
    },
    {
      key: 'theme',
      get: function () {
        return this.context.theme;
      },
    },
    {
      key: 'robotAniStatus',
      get: function () {
        return this.isEasterEgg ? 'Warning' : module381.RobotStatusInMap[this.state.status];
      },
    },
    {
      key: 'isEasterEgg',
      get: function () {
        return this.props.mapMode == module1343.MAP_MODE_EASTER_EGG && this.state.status == module381.RobotState.EGG_ATTACK;
      },
    },
    {
      key: 'isRobotOnCharger',
      get: function () {
        return (
          this.state.status === module381.RobotState.CHARGING ||
          this.state.status === module381.RobotState.FULL_CHARGE ||
          this.state.status === module381.RobotState.UPDATING ||
          this.state.status === module381.RobotState.COLLECTING_DUST ||
          this.state.status === module381.RobotState.WASHING_DUSTER
        );
      },
    },
    {
      key: 'isRobotCharging',
      get: function () {
        return this.state.status == module381.RobotState.CHARGING || this.state.status == module381.RobotState.FULL_CHARGE;
      },
    },
  ]);
  return p;
})(React.default.Component);

exports.default = module1481;
module1481.contextType = module1199.AppConfigContext;
module1481.propTypes = {
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
module1481.defaultProps = {
  isCollectDustDock: false,
  imageOnloadCallback: false,
  showDockBubbles: false,
  mapDeg: 0,
  mapPanStatus: module1126.PanStatus.MAP_VIEWING_NONE,
  blockSequenceList: [],
  onRectPanStart: function () {},
  onRectPanEnd: function () {},
};
var J = module13.StyleSheet.create({
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
        rotateY: module13.I18nManager.isRTL ? '180deg' : '0deg',
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
  smartBubbleImg: {
    width: module391.default.scaledPixel(22),
    height: module391.default.scaledPixel(22),
    borderRadius: module391.default.scaledPixel(22) / 2,
  },
  carpetBubbleImg: {
    width: module391.default.scaledPixel(26),
    height: module391.default.scaledPixel(26),
    borderRadius: module391.default.scaledPixel(26) / 2,
    backgroundColor: '#409FFF',
  },
  chargerBubbleImg: {
    width: module391.default.scaledPixel(26),
    height: module391.default.scaledPixel(26),
    borderRadius: module391.default.scaledPixel(26) / 2,
  },
});
