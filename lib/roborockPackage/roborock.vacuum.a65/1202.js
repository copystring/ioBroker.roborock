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
  module1204 = require('./1204'),
  module1127 = require('./1127'),
  module1211 = require('./1211'),
  module1469 = require('./1469'),
  module420 = require('./420'),
  module381 = require('./381'),
  module1414 = require('./1414'),
  module424 = require('./424'),
  module1200 = require('./1200'),
  module391 = require('./391'),
  module390 = require('./390');

function P(t, n) {
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

function D(t) {
  for (var o = 1; o < arguments.length; o++) {
    var s = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      P(Object(s), true).forEach(function (o) {
        module50.default(t, o, s[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      P(Object(s)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(s, n));
      });
  }

  return t;
}

function T(t) {
  var n = B();
  return function () {
    var o,
      s = module12.default(t);

    if (n) {
      var l = module12.default(this).constructor;
      o = Reflect.construct(s, arguments, l);
    } else o = s.apply(this, arguments);

    return module11.default(this, o);
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

var module1421 = require('./1421'),
  F = module13.ART.Transform,
  module510 = require('./510').strings,
  module1340 = require('./1340'),
  module1127 = require('./1127'),
  module1417 = require('./1417'),
  N = module1417.RRSurface,
  j = module1417.isRRSurface,
  module1415 = require('./1415'),
  module1344 = require('./1344'),
  module1476 = require('./1476'),
  module1477 = require('./1477'),
  module1478 = require('./1478'),
  module1479 = require('./1479'),
  module1480 = (function (t) {
    module9.default(p, t);
    var n = T(p);

    function p(t) {
      var o;
      module6.default(this, p);
      (o = n.call(this, t)).smallDiam = 12;
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
            onPanResponderStart: function (n, o) {
              t._handleLongPressStart();

              t.touch.move = module1340._parseEvent2(n.nativeEvent, o) || {};
            },
            onPanResponderEnd: function () {
              if (t.longPressStart) t.longPressStart = false;
              else t._handleLongPressCancel();
            },
            onPanResponderMove: function (n, o) {
              if (t.longPressStart) {
                var l = [module1340._parseEvent2(n.nativeEvent, o), t.touch.move],
                  h = l[0],
                  u = l[1];
                if (((t.touch.move = h || {}), !(h && h.x && h.y && u.x))) return;

                var p = module1340._parseDegPointWithTrans(h, u, t.props.transform, t.props.mapDeg),
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

            var t = module1340._parseDegPoint(0, -30 / (this.props.transform.yy || 1), this.props.mapDeg),
              n = module23.default(t, 2),
              o = n[0],
              l = n[1];

            this.setState({
              position: {
                x: this.state.position.x + o,
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
          module1421.setTimeout(function () {
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
                source: require('./1480'),
              })
            )
          );
        },
      },
    ]);
    return p;
  })(React.default.Component);

module1480.propTypes = {
  onLongPress: PropTypes.default.func,
};
module1480.defaultProps = {
  onLongPress: function () {},
  transform: {
    xx: 1,
    yy: 1,
  },
};

var module1482 = (function (t) {
  module9.default(p, t);
  var n = T(p);

  function p(t) {
    var o;
    module6.default(this, p);

    (o = n.call(this, t)).mapSourceOnLoad = function (t, n) {
      if (o.props.imageOnloadCallback)
        n == module1127.shareViewLoadType.ONLOAD_OBSTACLE
          ? o.lastObstacles && ++o.mapObjectImageLoadNum == o.lastObstacles.length && ((o.mapObjectImageLoadNum = 0), o._imageOnLoaded([n]))
          : (o._imageOnLoaded([n]), (o.mapLoadSources[n] = t.url));
    };

    o.colorOfRoom = function (t) {
      var n =
        o.props.parent.state.selectBlockList[t] && o.props.blockCanEdit
          ? ['#DFDFDFff', '#50A4FF', '#FF744D', '#008FA8', '#F5AF10', '#E9E9E9ff']
          : ['#DFDFDF88', '#05819B88', '#C6920088', '#C4715888', '#1369C088', '#E9E9E988'];
      return o.state.roomColorData ? n[o.state.roomColorData[t]] : n[0];
    };

    o.pixelOfElement = function (t) {
      var n = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : null,
        s = null != n ? n : t;
      return [t * (o.state.transform.xx || 1), s * (o.state.transform.yy || 1)];
    };

    o.showChargerWaring = function () {
      return (
        !o.props.parent.props.shouldShowRobotMovingAnimation && !o.props.hideAccessory && !(-1 == [38, 39, 40, 42].indexOf(module381.RSM.errorCode) || !o.charger || !o.charger.x)
      );
    };

    o.showRobotAnimation = function () {
      return (
        !(-1 != [38, 39, 40, 42].indexOf(module381.RSM.errorCode) && o.charger && o.charger.x && o.charging) &&
        !o.props.hideAccessory &&
        undefined !== o.state.status &&
        undefined !== o.robotAniStatus &&
        'Running' !== o.robotAniStatus &&
        null != o.robotAniStatus
      );
    };

    o.handleClickSmartZone = function (t, n, s) {
      if (o._isGlobalTag() && o.props.showAllComponetBubble && n) {
        var l = module1340._getRotateMaxRectSize(s);

        o.smartZoneInfo = {
          zoneArea: {
            x: l.x - 2,
            y: l.y - 2,
            width: l.width + 4,
            height: l.height + 4,
          },
          zoneData: n,
        };
        o.showSmartZoneBubble(t);
      }
    };

    o.handleFBZPanEnd = function (t, n) {
      if (n) o.moveMapToRectCenter(null == t ? undefined : t.state.rectSize);
    };

    o.handleRectPanStart = function (t, n, l) {
      var h = o._getCRRefs(l),
        u = module23.default(h, 2),
        p = u[0];

      u[1];
      if (n) o._setMapZonesFocus(p, t);
      if (!(null == o.props.onRectPanStart)) o.props.onRectPanStart();
    };

    o.handleRectPanEnd = function (t, n) {
      if (n) o.moveMapToRectCenter(null == t ? undefined : t.state.rectSize);
      if (!(null == o.props.onRectPanEnd)) o.props.onRectPanEnd();
    };

    o.mapEditPageDidChange = function () {
      var t = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : -1;
      return module13.DeviceEventEmitter.emit(module420.NotificationKeys.MapEditDidChange, {
        data: t,
      });
    };

    o.getTargetPos = function (t) {
      return t ? o.robot : o.charger;
    };

    o.handlePressDockBubble = function () {
      return o.props.parent.props.onPressDockBubble && o.props.parent.props.onPressDockBubble();
    };

    o.handlePressChargerErrorBubble = function () {
      return o.props.parent.props.onPressChargerErrorBubble && o.props.parent.props.onPressChargerErrorBubble();
    };

    o.handleBubbleLayout = function (t, n) {
      return o.moveMapIfNeeded(t, n);
    };

    o.handlePressFurnitureBubble = function () {
      return null == o.props.parent.props.onPressFurnitureBubble ? undefined : o.props.parent.props.onPressFurnitureBubble(o.furnitureArea);
    };

    o.handlePressSmartZoneBubble = function () {
      var t, n;
      if (o.state.smartBubbleType != module1127.SmartBubbleType.BT_CARPET) {
        if (o.state.smartBubbleType != module1127.SmartBubbleType.BT_NONE && (null == (t = o.smartZoneInfo) ? undefined : t.zoneData))
          null == (n = o.props.parent) || null == n.props.onPressSmartZoneBubble || n.props.onPressSmartZoneBubble(o.smartZoneInfo.zoneData, o.state.smartBubbleType);
      } else if (!(null == o.props.parent.props.onPressSmartZoneBubble)) o.props.parent.props.onPressSmartZoneBubble(o.carpetArea, o.state.smartBubbleType);
    };

    o.handleCheckAndroidOverflow = function (t, n, s) {
      var l = arguments.length > 3 && undefined !== arguments[3] && arguments[3],
        h = (o._getEdgeCheckPadding() - (n ? 45 : l ? 65 : 35)) / o.state.transform.xx;
      if (n) return (n.x <= -1 * h || n.x >= o.state.width + h || n.y <= -1 * h || n.y >= o.state.height + h) && (globals.showToast(module510.rotate_map_rect_warning), true);

      if (t) {
        if ((s = Math.abs(((180 * s) / Math.PI) % 360)) > 90 && s <= 270) s = Math.abs(s - 180);
        if (s > 270 && s < 360) s = 360 - s;
        s = o.degreeToRad(s);
        var u = t.x + t.width / 2,
          p = t.y + t.height / 2,
          c = (t.height / 2) * Math.cos(-1 * s) - (t.width / 2) * Math.sin(-1 * s),
          f = p - c,
          b = p + c,
          v = (t.height / 2) * Math.sin(s) + (t.width / 2) * Math.cos(s);
        return (u - v <= -1 * h || u + v >= o.state.width + h || f <= -1 * h || b >= o.state.height + h) && (globals.showToast(module510.rotate_map_rect_warning), true);
      }

      return false;
    };

    o.handleShouldShowBubbleChecker = function (t) {
      if (o.props.parent.props.shouldShowMapObjectBubbleChecker) o.props.parent.props.shouldShowMapObjectBubbleChecker(t);
    };

    o.handlePressObjectBubble = function (t) {
      var n = {
        x: t.originX,
        y: t.originY,
        type: t.type,
        percent: t.percent,
        photoId: t.photoId,
      };
      if (!(null == o.props.parent.props.onPressMapObjectBubble)) o.props.parent.props.onPressMapObjectBubble(n, o.state.ignoredObstacles);
    };

    o.handlePressPhotoReminderBubble = function (t) {
      var n = {
        x: t.originX,
        y: t.originY,
        type: t.type,
        percent: t.percent,
        photoId: t.photoId,
      };
      if (!(null == o.props.parent.props.onPressMapObjectPhotoReminderBubble)) o.props.parent.props.onPressMapObjectPhotoReminderBubble(n, o.state.ignoredObstacles);
    };

    o.handlePressObjectDelete = function (t) {
      for (n = t.x, s = t.y, l = [], h = 0, undefined; h < o.state.obstacles.length; h++) {
        var n, s, l, h;
        var u = o.state.obstacles[h],
          p = t.transform.point(u[3], u[4]);
        if ((p.x - n) * (p.x - n) + (p.y - s) * (p.y - s) < 2500)
          l.push({
            x: u[0],
            y: u[1],
            type: u[2],
          });
      }

      if (!(null == o.props.parent.props.onIgnoreMapObjects)) o.props.parent.props.onIgnoreMapObjects(l, o.state.ignoredObstacles);
    };

    o.handleObjectNameViewDidShow = function (t) {
      var n = [D({}, t)];
      o.setState({
        showMapObjectNameObjects: n,
      });
    };

    o.handleObjectNameViewDidHide = function (t) {
      var n = o.state.showMapObjectNameObjects;
      if (
        -1 !=
        n.findIndex(function (n) {
          return n.originX == t.originX && n.originY == t.originY && n.type == t.type;
        })
      )
        n = n.filter(function (n) {
          return n.originX != t.originX && n.originY != t.originY && n.type != t.type;
        });
      o.setState({
        showMapObjectNameObjects: n,
      });
    };

    o.handleMapObjectBubbleDidShow = function (t) {
      o.hideAllMapObjects(t);

      o._cleanAllMapBubble();
    };

    o.handleMapObjectImageOnLoad = function () {
      return o.mapSourceOnLoad({}, module1127.shareViewLoadType.ONLOAD_OBSTACLE);
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
    o.rectReferences = {
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
    };
    o.exRectRefs = {
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
    o.furnitureArea = {};
    o.mapRotatePadding = 0;
    o.carpetBubbleOpacity = new module13.Animated.Value(0);
    o.chargerBubbleOpacity = new module13.Animated.Value(0);
    o.furnitureBubbleOpa = new module13.Animated.Value(0);
    o.samrtZoneBubbleOpa = new module13.Animated.Value(0);
    o.chargerLottieSize = {
      width: 0,
      height: 0,
    };
    o.state = {
      map: o.props.map || '',
      path: o.props.path || '',
      pathGotoPlan: o.props.pathGotoPlan || '',
      mopPath: o.props.mopPath || '',
      target: o.props.target || {},
      width: module1127.EMPTY_MAP_SIZE,
      height: module1127.EMPTY_MAP_SIZE,
      transform: o.props.transform || new F(),
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
      smartBubbleType: module1127.SmartBubbleType.BT_NONE,
      chargerErrorText: '',
    };
    return o;
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
          onPanResponderStart: function (n, o) {
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
          t.mapMode == module1344.MAP_MODE_GOTO_EDIT &&
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
        var o;
        if (this.lottieView) this.lottieView.play();
        if (!(null == (o = this.lottieCharger))) o.play();
      },
    },
    {
      key: '_checkMapDiff',
      value: function (t) {
        var n = [];
        if (!t.charger || (t.charger && this.mapLoadSources[module1127.shareViewLoadType.ONLOAD_CHARGER])) n.push(module1127.shareViewLoadType.ONLOAD_CHARGER);
        if (undefined === t.carpetMap || t.carpetMap === this.mapLoadSources[module1127.shareViewLoadType.ONLOAD_CARPETMAP]) n.push(module1127.shareViewLoadType.ONLOAD_CARPETMAP);
        if (!this.currentMap || this.currentMap === this.mapLoadSources[module1127.shareViewLoadType.ONLOAD_MAP]) n.push(module1127.shareViewLoadType.ONLOAD_MAP);
        if (t.obstacles && 0 != t.obstacles.length) this.lastObstacles = t.obstacles;
        else n.push(module1127.shareViewLoadType.ONLOAD_OBSTACLE);
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
        var o = n.map;
        if (1 == t.parent.state.inCleanBlockMode) o = n.mapBCBackground;
        else if ((undefined !== t.parent.state.map.data && t.parent.state.map.data.blockNum <= 1) || t.mapMode == module1344.MAP_MODE_CARPET_EDIT) o = n.mapNoBlock;
        return o;
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
          return module381.RSM.isO0Dock() ? module1127.DockTypeRes[module1127.DockType.Normal] : module1127.DockTypeRes[module1127.DockType.Other];
        else return 0 == this.state.dockType ? module1127.DockTypeRes[module1127.DockType.Normal] : module1127.DockTypeRes[module1127.DockType.Other];
      },
    },
    {
      key: '_isGlobalTag',
      value: function () {
        return this.props.mapMode == module1344.MAP_MODE_REGULAR && !this.props.parent.state.inCleanBlockMode;
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
          p = this.pixelOfElement(module1127.Config.size.chargerRadius, module1127.Config.size.chargerRadius * u),
          c = module23.default(p, 2),
          v = c[0],
          y = c[1];

        if (l.type == module1127.DockType.Normal) {
          h = 0.77;
          u = 0.5;
          var w = this.pixelOfElement(module1127.Config.size.chargerNormal * h, module1127.Config.size.chargerNormal),
            R = module23.default(w, 2);
          v = R[0];
          y = R[1];
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
                        rotateZ: -1 * module1340.adjustChargerAngle(this.charger.angle) + 'deg',
                      },
                    ],
                    zIndex: n ? 999 : 0,
                  },
                  source: l.chargerIcon,
                  onLoad: this.props.imageOnloadCallback
                    ? function (n) {
                        return t.mapSourceOnLoad(n.nativeEvent.source, module1127.shareViewLoadType.ONLOAD_CHARGER);
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
          l = this.pixelOfElement(module1127.Config.size.chargerRadius, 0.86 * module1127.Config.size.chargerRadius),
          h = module23.default(l, 2),
          u = h[0],
          p = h[1];

        return !this.props.hideAccessory && this.state.charger && n.type != module1127.DockType.Normal
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
                        rotateZ: -1 * module1340.adjustChargerAngle(this.charger.angle) + 'deg',
                      },
                    ],
                    zIndex: t ? 999 : 0,
                  },
                  source: require('./1481'),
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
          ? React.default.createElement(module1211.ObjectNameBubble, {
              hasArrow: (this.state.chargerErrorText && this.state.chargerErrorText.length) || this._isCanJumpOnyxDock(),
              objectName: this.state.chargerErrorText && this.state.chargerErrorText.length ? this.state.chargerErrorText : this._getChargerResources().name,
              objectImage: this.state.chargerErrorText && this.state.chargerErrorText.length ? module1476 : this._getChargerResources().chargerBubbleIcon,
              center: n,
              imageStyle: K.chargerBubbleImg,
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
        var t = module381.RSM.isO0Dock() ? module1127.Config.size.chargerNormal : module1127.Config.size.chargerRadius,
          n = this.pixelOfElement(module1127.DOCK_FORBIDDEN_R),
          o = module23.default(n, 2),
          l = o[0],
          h = o[1],
          u = this.pixelOfElement(module1127.DOCK_FORBIDDEN_R - t / 2),
          p = module23.default(u, 2),
          c = p[0],
          v = p[1];
        return !this.props.hideAccessory && (this.charger.x || this.charger.y) && this.state.charger && this.props.mapMode == module1344.MAP_MODE_MAP_EDIT
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
                    rotateZ: module1340.adjustChargerAngle(this.charger.angle) * (module13.I18nManager.isRTL ? 1 : -1) + 'deg',
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
        var n = this.pixelOfElement(module1127.Config.size.robotRadius),
          o = module23.default(n, 2),
          l = o[0],
          h = o[1];
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
          React.default.createElement(module1204.default, {
            ref: function (n) {
              return (t.lottieCharger = n);
            },
            style: {
              width: 1.75 * l,
              height: 1.75 * h,
            },
            source: module1127.MapAnimates.Warning,
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
        var o = this.chargerLottieSize.width * this.state.transform.xx,
          s = this.chargerLottieSize.height * this.state.transform.yy;
        return React.default.createElement(module1211.ChargerStatusLottieView, {
          mapDeg: this.props.mapDeg,
          center: n,
          baseWidth: o,
          baseHeight: s,
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
          o = module1127.MapAnimates[n];
        if (undefined === o) return null;
        var l = this.pixelOfElement(module1127.Config.size.robotRadius),
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
              React.default.createElement(module1204.default, {
                ref: function (n) {
                  return (t.lottieView = n);
                },
                style: {
                  width: 2 * u,
                  height: 2 * p,
                },
                source: o,
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
              React.default.createElement(module1204.default, {
                ref: function (n) {
                  return (t.lottieView = n);
                },
                style: {
                  width: 1.75 * u,
                  height: 1.75 * p,
                },
                source: o,
              })
            );
      },
    },
    {
      key: 'getRobot',
      value: function (t) {
        var n = this,
          l = this.pixelOfElement(module1127.Config.size.robotRadius),
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
          onPanResponderStart: function (t, o) {
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
          y = 'android' != module13.Platform.OS ? module13.Image : module1415,
          w = React.default.createElement(y, {
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
                module1415,
                {
                  pointerEvents: 'none',
                  resizeMethod: 'scale',
                  source: module424.DMM.robotInMap.shadowBg,
                  style: {
                    width: u,
                    height: p,
                  },
                },
                w
              )
            )
          : null;
      },
    },
    {
      key: 'getAnimatedRobot',
      value: function (t, n) {
        var o = this,
          s = !this.props.hideAccessory && this.props.mapMode != module1344.MAP_MODE_ZONED_CLEAN_EDIT && this.props.mapMode != module1344.MAP_MODE_BLOCK_CLEAN_EDIT && n > 10;
        return React.default.createElement(module1211.AnimatedRobot, {
          pathPoints: this.state.pathPoints ? this.state.pathPoints : [],
          pathData: this.state.pathData,
          transform: this.state.transform,
          robot: this.robotPos,
          width: t,
          height: n,
          showPath: s,
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
        var n = this;
        return 1 != this.props.parent.state.inBlockMode && this.props.mapMode != module1344.MAP_MODE_CARPET_EDIT && this.props.mapMode != module1344.MAP_MODE_DOORSILL_EDIT
          ? React.default.createElement(module1469.ForbiddenView, {
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
          o = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : module1127.CleanRectType.Normal,
          l = this._getCRRefs(o),
          h = module23.default(l, 2),
          u = h[0];

        h[1];
        return Object.keys(u).map(function (s, l) {
          return React.default.createElement(module1211.CleanRect, {
            key: l,
            id: s,
            type: o,
            mapDeg: n.props.mapDeg,
            ref: function (t) {
              return (u[s] = t);
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
          ? this.state.displayZones.map(function (n, o) {
              var s = module1340._convertToPixelRect(n, t.state.transform);

              return React.default.createElement(module13.View, {
                key: o,
                pointerEvents: 'none',
                style: {
                  position: 'absolute',
                  left: s.x,
                  top: s.y,
                  width: s.width,
                  height: s.height,
                  overflow: 'visible',
                  backgroundColor: module1127.buttonConfig.rectBgColor,
                  borderColor: module1127.buttonConfig.rectColorSolid,
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
        if (!(this.props.mapElementShowFlag & module1127.MapElementShow.OBSTACLE)) return [];
        var s = [];
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
              R = -99 == h[2] ? 'merges' : !c.photoId || c.photoId.length < 1 ? 'ai' : this.props.obstaclePopBoxType,
              C = -99 == h[2] ? h.length - 2 : h.length - 1,
              M = this.state.roomColorData[h[C]];
            n.push(
              React.default.createElement(
                module1211.MapObjectView,
                module22.default(
                  {
                    ref: function (t) {
                      s.push(t);
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
                    showMapObjectName: this.props.mapMode == module1344.MAP_MODE_REGULAR,
                    showAsBlackWall: false,
                    showDebugInfo: this.props.showMapObjectDebugInfo,
                    popBoxType: R,
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
        return s;
      },
    },
    {
      key: 'getBlockOperationView',
      value: function (t) {
        var n,
          o,
          s,
          l = this,
          h = (null == (n = this.props.parent) ? undefined : n.getCurrentSelectBlock()) || [],
          u = null,
          p = -1;

        if (1 == h.length) {
          p = h[0];
          u = (null == (o = this.props.parent) ? undefined : null == (s = o.touchBlockPtMap) ? undefined : null == s.get ? undefined : s.get(p)) || null;
        }

        return this.props.showSplitLine && -1 != p
          ? React.default.createElement(module1211.BlockOperation, {
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
        var s,
          l = [];
        if (1 == this.props.parent.state.inCleanBlockMode)
          (null == (s = this.state.blockInClean) ? undefined : s.length) > 0
            ? (l = this.state.blockInClean.concat())
            : 0 != this.props.parent.state.blockSequenceListReadOnly.length && (l = this.props.parent.state.blockSequenceListReadOnly.concat());

        for (
          var h = this.props.roomBubbleMode,
            u = this.props.parent.props.showAllBlocksBubble,
            p = module13.Dimensions.get('window').width,
            c = function (s) {
              var c;
              if (0 == t.state.centerInfo[s].count) return 'continue';
              var v = !!t.props.blockCanEdit && t.props.parent.state.selectBlockList[s];
              if (h == module1127.BlockBubbleShowInfo.NONE && 1 != v) return 'continue';
              var y = t.props.parent.state.roomModeList.find(function (t) {
                  return t.id == s;
                }),
                R = y ? y.cleanMode : -1,
                C = y ? y.waterMode : -1,
                S = y ? y.mopMode : -1,
                A = null != (c = null == y ? undefined : y.mopTemplateId) ? c : -1;

              if (h & module1127.BlockBubbleShowInfo.CLEANMODE && u) {
                R = module381.RSM.isCustomCleanMode() ? R : -1;
                C = module381.RSM.isCustomWaterMode() ? C : -1;
                S = module381.RSM.isCustomMopMode() ? S : -1;
              }

              var O = t.state.centerInfo[s].x / t.state.centerInfo[s].count,
                P = t.state.centerInfo[s].y / t.state.centerInfo[s].count,
                D = (O + 0.5) * t.state.transform.xx,
                T = (t.state.height - P - 0.5) * t.state.transform.yy,
                B = (t.state.centerInfo[s].maxX - t.state.centerInfo[s].minX) * t.state.transform.xx,
                x = !v && u ? B ** 60 : p,
                F = {
                  left: D - x / 2,
                  top: T - (180 == Math.abs(t.props.mapDeg) ? 0 : 17),
                },
                I = '',
                Z = -1,
                L = t.props.parent.state.roomNameList;

              if ((0 != L.length && (-1 != L[s][1] && (I = L[s][1]), 3 == L[s].length && (Z = L[s][2])), '' == I)) {
                var V = t.props.parent.state.defaultNameList;
                if (0 != V.length && V[s] && V[s].length > 0) I = V[s];
              }

              I = undefined === I ? '' : I;

              for (var N = -1, j = 0; j < t.props.blockSequenceList.length; j++)
                if (t.props.blockSequenceList[j] == s) {
                  N = j + 1;
                  break;
                }

              if (module424.DMM.isTanosSC) C = null;
              if (!(t.props.mapElementShowFlag & module1127.MapElementShow.NAME_TAG)) h &= module1127.BlockBubbleShowInfo.CLEANMODE | module1127.BlockBubbleShowInfo.CLEANSEQUENCE;
              if (!(t.props.mapElementShowFlag & module1127.MapElementShow.CUSTOM_ORDER)) h &= module1127.BlockBubbleShowInfo.DISPLAYNAME;
              var z = t.state.roomColorData[s];
              if (
                1 == t.props.parent.state.inCleanBlockMode &&
                -1 ==
                  l.findIndex(function (t) {
                    return t == s;
                  })
              )
                z = 8;
              n.push(
                React.default.createElement(
                  module13.View,
                  {
                    pointerEvents: t.props.blockCanEdit ? 'box-none' : 'none',
                    key: s,
                    style: [
                      K.roomBubbleView,
                      {
                        left: F.left,
                        top: F.top,
                        width: x,
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
                    module1211.RoomInfoBubble,
                    module22.default({}, module391.default.getAccessibilityLabel('room_info_bubble'), {
                      isSelected: 1 == v,
                      sequenceID: -1 == N ? '' : N.toString(),
                      roomColor: t.colorOfRoom(s),
                      cleanMode: R,
                      waterMode: C,
                      mopMode: S,
                      mopTemplateId: A,
                      displayMode: h,
                      roomName: I,
                      roomTag: Z,
                      colorIndex: z,
                      maxWidth: B,
                      transform: t.state.transform,
                      hideShadow: t.props.mapPanStatus > module1127.PanStatus.MAP_VIEWING_FIT,
                      onPressTag: function () {
                        return t.onPressTag(s);
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
          o = [];
        if (undefined === this.props.parent.state.map.mapList) return o;

        var s,
          l = function (s) {
            var l = n.props.parent.state.map.mapList[s];
            if (undefined !== l)
              o.push(
                React.default.createElement(module1415, {
                  key: s,
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
          ((null == (s = this.props.parent) ? undefined : s.getCurrentSelectBlock()) || []).forEach(function (t) {
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
        return o;
      },
    },
    {
      key: 'getCarpetMapView',
      value: function (t) {
        var n = this;
        if (!(this.props.mapElementShowFlag & module1127.MapElementShow.FLOOR_CARPET)) return null;
        var o = this.state.carpetMap;
        if (undefined === o) return null;
        var s = React.default.createElement(module1415, {
            pointerEvents: 'none',
            layerScaleFilter: 'Nearest',
            style: t,
            source: {
              uri: o,
            },
            onLoad: this.props.imageOnloadCallback
              ? function (t) {
                  return n.mapSourceOnLoad(t.nativeEvent.source, module1127.shareViewLoadType.ONLOAD_CARPETMAP);
                }
              : null,
          }),
          l = React.default.createElement(module13.Image, {
            pointerEvents: 'none',
            style: t,
            source: {
              uri: o,
            },
            onLoad: this.props.imageOnloadCallback
              ? function (t) {
                  return n.mapSourceOnLoad(t.nativeEvent.source, module1127.shareViewLoadType.ONLOAD_CARPETMAP);
                }
              : null,
          });
        return (
          React.default.createElement(
            module13.View,
            module391.default.getAccessibilityLabel('map_carpet'),
            this.state.transform.xx < 1.2 && 'android' != module13.Platform.OS ? l : s
          ) || null
        );
      },
    },
    {
      key: 'getFloorMapView',
      value: function (t) {
        if (!(this.props.mapElementShowFlag & module1127.MapElementShow.FLOOR_CARPET)) return null;
        var n = this.state.floorMap;
        return (null == n ? undefined : n.image) && '' != (null == n ? undefined : n.image)
          ? React.default.createElement(module1415, {
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
        if (!(this.props.mapElementShowFlag & module1127.MapElementShow.FURNITURE)) return null;

        var n = this.furnitureArea && (null == (t = this.furnitureView) ? undefined : t.showFurnitureIcon(this.furnitureArea.type, this.furnitureArea.edited)),
          o = this._getFurnitureBubbleCenter(n),
          l = module23.default(o, 2),
          h = l[0],
          u = l[1];

        if (!h || !h.x || !h.y) return null;
        var p = !n && module381.RSM.isHomeButtonsEnabled();
        return React.default.createElement(module1211.ObjectNameBubble, {
          funcId: 'map_furniture_bubble',
          objectName: u,
          objectImage: p ? module1478 : module1477,
          objectLottie: p ? module1479 : null,
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
        if (!(this.props.mapElementShowFlag & module1127.MapElementShow.FLOOR_CARPET || (n != module1127.SmartBubbleType.BT_CARPET && n != module1127.SmartBubbleType.BT_DOORSILL)))
          return null;

        var o = this._getSmartZoneBubbleCenter(null == (t = this.smartZoneInfo) ? undefined : t.zoneArea);

        if ((n == module1127.SmartBubbleType.BT_CARPET && (o = this._getCarpetBubbleCenter()), !o || !o.x || !o.y)) return null;
        var s,
          l,
          h = module1127.SmartBubbleConfig[n].pageTitle;
        if (n == module1127.SmartBubbleType.BT_STUCK)
          h = (null == (s = this.smartZoneInfo) ? undefined : null == (l = s.zoneData) ? undefined : l.nearby)
            ? module510.map_ai_zone_bubble_adjust
            : module510.map_ai_zone_bubble_set;
        var u = n == module1127.SmartBubbleType.BT_CARPET ? K.carpetBubbleImg : K.smartBubbleImg;
        u = D(
          D({}, u),
          {},
          {
            tintColor: this.theme.bubble.tintColor,
          }
        );
        var p =
          n == module1127.SmartBubbleType.BT_CARPET
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
                style: K.smartBubbleImg,
              };
        return React.default.createElement(module1211.ObjectNameBubble, {
          funcId: 'map_smart_zone_bubble_' + n,
          objectName: h,
          objectImage: module1127.SmartBubbleConfig[n].bubbleImg,
          imageStyle: u,
          gardienConfig: p,
          center: o,
          topOffset: n == module1127.SmartBubbleType.BT_CARPET ? 10 : 0,
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
      value: function (t, n, o) {
        if (this.props.mapMode == module1344.MAP_MODE_EASTER_EGG) return null;
        var s = null;
        if (this.state.pathGotoPlan && '' != this.state.pathGotoPlan)
          s = React.default.createElement(module1414.RRShape, {
            transform: 'android' != module13.Platform.OS || j ? o : null,
            stroke: this.color.pathGotoPlan,
            strokeWidth: 1,
            strokeDash: 'android' == module13.Platform.OS ? [5, 10] : [2, 2],
            d: this.state.pathGotoPlan,
          });
        var l = null;
        if (this.state.path && '' != this.state.path)
          l = React.default.createElement(module1414.RRShape, {
            transform: 'android' != module13.Platform.OS || j ? o : null,
            stroke: this.theme.map.pathColor,
            strokeWidth: 0.5,
            d: this.state.path,
          });
        var h = null;
        if (this.state.mopPath && '' != this.state.mopPath)
          h = React.default.createElement(module1414.RRShape, {
            transform: 'android' != module13.Platform.OS || j ? o : null,
            stroke: this.theme.map.mopPathColor,
            strokeWidth: 6.5,
            strokeOverlay: true,
            d: this.state.mopPath,
          });
        var u = null;
        if (this.state.backWashPath && '' != this.state.backWashPath)
          u = React.default.createElement(module1414.RRShape, {
            transform: 'android' != module13.Platform.OS || j ? o : null,
            stroke: this.theme.map.backWashPathColor,
            strokeWidth: 0.5,
            strokeCap: 'round',
            strokeDash: 'android' == module13.Platform.OS ? [0.5, 4] : [0.15, 1],
            d: this.state.backWashPath,
          });
        var p = null;
        if (this.state.pureCleanPath && '' != this.state.pureCleanPath)
          p = React.default.createElement(module1414.RRShape, {
            transform: 'android' != module13.Platform.OS || j ? o : null,
            stroke: this.theme.map.pureMopColor,
            strokeWidth: 0.5,
            d: this.state.pureCleanPath,
          });
        return React.default.createElement(
          N,
          {
            width: t,
            height: n,
            style: K.pathContainer,
          },
          s,
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
        return module390.default.isShowCarpetEditEntrance() && this.props.mapElementShowFlag & module1127.MapElementShow.FLOOR_CARPET
          ? React.default.createElement(module1469.CarpetsView, {
              ref: function (t) {
                return (n.carpetEditView = t);
              },
              mapRect: {
                width: this.state.width,
                height: this.state.height,
              },
              mapMode: this.props.mapMode,
              mapDeg: this.props.mapDeg,
              transform: t,
              subCarpetMode: this.props.subCarpetMode,
              ignoreCarpetEdited: this.props.ignoreCarpetEdited,
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
        return this.props.mapElementShowFlag & module1127.MapElementShow.FURNITURE &&
          (this.props.mapMode == module1344.MAP_MODE_FURNITURE_EDIT ||
            (this.props.showFurnitureOnly && !this.props.blockCanEdit) ||
            (this.props.mapMode != module1344.MAP_MODE_MAP_EDIT &&
              this.props.mapMode != module1344.MAP_MODE_GOTO_EDIT &&
              this.props.mapMode != module1344.MAP_MODE_EASTER_EGG &&
              !this.props.hideAccessory))
          ? React.default.createElement(module1469.FurnitureView, {
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
          ? React.default.createElement(module1469.HistoryMarkView, {
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
        if (this.props.mapMode != module1344.MAP_MODE_EASTER_EGG) return null;
        if (!this.state.enemies || this.state.enemies.length <= 0) return null;
        var n = this.pixelOfElement(module1127.Config.size.objectsRadius),
          l = module23.default(n, 2),
          h = l[0],
          u = l[1];
        return this.state.enemies.map(function (n, s) {
          var l = module1340._convertToPixelPoint(n, t.state.transform);

          return !n.flag
            ? React.default.createElement(
                module13.Image,
                module22.default(
                  {
                    key: s,
                    pointerEvents: 'none',
                  },
                  module391.default.getAccessibilityLabel('map_enemies_' + s),
                  {
                    resizeMethod: 'scale',
                    style: {
                      position: 'absolute',
                      width: h,
                      height: u,
                      left: l.x - h / 2,
                      top: l.y - u / 2,
                    },
                    source: require('./1482'),
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
        return this.props.mapElementShowFlag & module1127.MapElementShow.FLOOR_CARPET &&
          (module390.default.isSupportSmartDoorSill() || module390.default.isSupportCustomDoorSill()) &&
          1 != this.props.parent.state.inBlockMode &&
          this.props.mapMode != module1344.MAP_MODE_CARPET_EDIT &&
          this.props.mapMode != module1344.MAP_MODE_MAP_EDIT
          ? React.default.createElement(module1469.DoorSillView, {
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
          this.props.mapMode == module1344.MAP_MODE_REGULAR
          ? React.default.createElement(module1469.AIObjectView, {
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
          n = new F({
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
          this.robotAngle = module1340.adjustChargerAngle(this.charger.angle) + module424.DMM.robotInMap.chargerAngle + c;
        }

        this.robotPos = (this.charging && this.charger) || this.robot;
        var v = module1127.Config.size.robotDiameter * n.xx;

        if (this.charging && this.charger) {
          var y = {
            x: (v - 10) * (module381.RSM.isO0Dock() ? 0.5 : 0.25) * Math.cos(this.degreeToRad(-module1340.adjustChargerAngle(this.charger.angle))),
            y: 0.5 * (v - 10) * Math.sin(this.degreeToRad(-module1340.adjustChargerAngle(this.charger.angle))),
          };
          this.robotPos = {
            x: this.robotPos.x + y.x,
            y: this.robotPos.y + y.y,
          };
        }

        var w = {
            overflow: 'visible',
            position: 'absolute',
            top: 0,
            left: 0,
            width: u,
            height: p,
          },
          R = this.getBlockMapsView(w),
          C = [];
        this.mapObjectRefs = this.getMapObjects(n, C);
        var S = this.props.mapMode == module1344.MAP_MODE_REGULAR,
          A = this.getCleanPath(u, p, n),
          P = this.getForbiddenView(n),
          D = this.getFloorMapView(w),
          T = this.getCarpetMapView(w),
          B = this.getCarpetEditView(n),
          x = this.props.mapMode == module1344.MAP_MODE_CARPET_EDIT,
          I = this.getFurnitureView(n),
          L = this.props.mapMode != module1344.MAP_MODE_MAP_EDIT,
          V = this.getDoorSillView(n),
          N = this.props.mapMode == module1344.MAP_MODE_DOORSILL_EDIT,
          j = this.getAIObjectView(n),
          G = !this.props.hideAccessory && this.props.mapMode != module1344.MAP_MODE_ZONED_CLEAN_EDIT && this.props.mapMode != module1344.MAP_MODE_BLOCK_CLEAN_EDIT && p > 10;
        if (!module390.default.SupportOverflowTouch()) this.mapRotatePadding = S ? 160 : 100 * n.xx;
        var U = 'android' == module13.Platform.OS && this.props.mapPanStatus != module1127.PanStatus.MAP_VIEWING_NONE;
        return React.default.createElement(
          module13.View,
          {
            pointerEvents: U ? 'none' : 'box-none',
            style: [
              K.container,
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
                  style: K.mapContainer,
                },
                module391.default.getAccessibilityLabel('map_image_view')
              ),
              React.default.createElement(
                module1415,
                {
                  pointerEvents: 'none',
                  layerScaleFilter: 'Nearest',
                  source: this.currentMap
                    ? {
                        uri: this.currentMap,
                      }
                    : null,
                  style: K.mapImage,
                  onLoad: this.props.imageOnloadCallback
                    ? function (n) {
                        return t.mapSourceOnLoad(n.nativeEvent.source, module1127.shareViewLoadType.ONLOAD_MAP);
                      }
                    : null,
                },
                R,
                D,
                T,
                !x && B,
                !N && V,
                !this.props.parent.props.shouldShowRobotMovingAnimation && G && A
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
            !L && I,
            P,
            N && V,
            x && B,
            L && I,
            this.getCleanRect(n),
            this.props.showExtraRect && this.getCleanRect(n, module1127.CleanRectType.Extra),
            React.default.createElement(module1480, {
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
          t == module1127.CleanRectType.Normal ? this.rectReferences : this.exRectRefs,
          t == module1127.CleanRectType.Normal ? module1127.MAX_COUNT_ZONE_RECT : module1127.MAX_COUNT_EXTRA_ZONE,
        ];
      },
    },
    {
      key: 'getVisibleRectZones',
      value: function () {
        for (
          var t = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : module1127.CleanRectType.Normal,
            n = this._getCRRefs(t),
            o = module23.default(n, 2),
            l = o[0],
            h = o[1],
            u = [],
            p = 1;
          p <= h;
          p++
        ) {
          var c;
          if (null == (c = l[p]) ? undefined : c.state.visible) u.push(l[p]);
        }

        if (u.length > 0)
          u.sort(function (t, n) {
            return t.state.serial - n.state.serial;
          });
        return u;
      },
    },
    {
      key: 'clearRectFocus',
      value: function () {
        for (
          var t = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : module1127.CleanRectType.Normal,
            n = this._getCRRefs(t),
            o = module23.default(n, 2),
            l = o[0],
            h = o[1],
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
            n = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : module1127.CleanRectType.Normal,
            o = this._getCRRefs(n),
            l = module23.default(o, 2),
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
            t = t ? module1340._getRotateRect(t, -1 * this.props.mapDeg) : this._getDefaultMapZonesArea(c);
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
        var n = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : module1127.CleanRectType.Normal,
          o = arguments.length > 2 && undefined !== arguments[2] && arguments[2];
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

        for (var f, b, v = 0, y = false, w = this.degreeToRad(-1 * this.props.mapDeg), R = 1; R <= p; R++) {
          if (u[R] && 0 == u[R].state.visible && u[R].state.serial == c + v + 1) {
            var C,
              M = t[v];
            if (!M) continue;
            M = module1340._getRotateRect(M, -1 * this.props.mapDeg);
            if (!(null == (C = u[R])))
              C.setState({
                visible: true,
                rectSize: M,
                slopeAngle: w || 0,
                enable: o,
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
          o,
          l,
          h = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : module1127.CleanRectType.Normal,
          u = this._getCRRefs(h),
          p = module23.default(u, 2),
          c = p[0],
          f = p[1];

        if (c[t].state.visible) {
          for (var b = this._getVisibleZonesCount(c), v = 1; v <= f; v++) {
            var y, w;
            if ((null == (y = c[v]) ? undefined : y.state.visible) && c[v].state.serial > c[t].state.serial)
              null == (w = c[v]) ||
                w.setState({
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
          if (!(null == (o = (l = this.props).cleanRectChanged))) o.call(l, b - 1, h);
        }
      },
    },
    {
      key: 'removeAllRects',
      value: function () {
        for (
          var t = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : module1127.CleanRectType.Normal,
            n = this._getCRRefs(t),
            o = module23.default(n, 2),
            l = o[0],
            h = o[1];
          h >= 1;
          h--
        ) {
          var u;
          if (!(null == (u = l[h]))) u.reInitRender(h);
        }
      },
    },
    {
      key: 'showExtraZones',
      value: function (t) {
        for (
          var n = (null == t
              ? undefined
              : t.filter(function (t) {
                  return t && 'object' == typeof t;
                })
            ).length,
            o = 1;
          o <= module1127.MAX_COUNT_EXTRA_ZONE;
          o++
        )
          if (o <= n) {
            var s,
              l = module1340._getRotateRect(t[o - 1], -1 * this.props.mapDeg);

            if (!(null == (s = this.exRectRefs[o]))) s.showRect(o, l, 0, false);
          } else {
            var h;
            if (!(null == (h = this.exRectRefs[o]))) h.reInitRender(o);
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
        for (var n = 1; n <= module1127.MAX_COUNT_ZONE_RECT; n++) {
          var o;
          if (!(null == (o = this.rectReferences[n])))
            o.setState({
              shouldHide: 3 != t && 4 != t,
              enable: 3 == t,
            });
        }
      },
    },
    {
      key: 'setExtraRectEnable',
      value: function (t) {
        for (var n = 1; n <= module1127.MAX_COUNT_EXTRA_ZONE; n++) {
          var o;
          if (!(null == (o = this.exRectRefs[n])))
            o.setState({
              isFocus: false,
              enable: t,
            });
        }
      },
    },
    {
      key: 'updateRotateRects',
      value: function () {
        for (var t = 1; t <= module1127.MAX_COUNT_ZONE_RECT; t++) {
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
          var o,
            l = this._getDefaultWallPos(n),
            h = module23.default(l, 2),
            u = h[0],
            p = h[1];

          if (!(null == (o = this.forbiddenEditView))) o.addWall(n, u, p);
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
          o = null == (n = this.forbiddenEditView) ? undefined : n.getNewRectIndex(t);

        if (o > 0) {
          var s,
            l = this.degreeToRad(-1 * this.props.mapDeg),
            h = this._getDefaultMapZonesArea(o);

          if (!(null == (s = this.forbiddenEditView))) s.addFBZZones(o, h, l, t);
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
      key: 'updateCarpetData',
      value: function (t, n) {
        var o;
        if (!(null == (o = this.carpetEditView))) o.updateCarpet(t, n);
      },
    },
    {
      key: 'addCarpetFBZoneByClick',
      value: function (t) {
        this.setCarpetPos(t);
        var n,
          o = this.getRealRectForCarpet();
        return (
          !!o &&
          (this.isCarpetReachMaxNum(false)
            ? (globals.showToast(module510.map_edit_carpet_zone_exceed_limit), false)
            : (null == (n = this.carpetEditView) || n.addCarpetZones(o, 0, false), true))
        );
      },
    },
    {
      key: 'addCarpetEditZone',
      value: function (t) {
        var n,
          o = this._getDefaultMapZonesArea(),
          s = this.degreeToRad(-1 * this.props.mapDeg);

        if (!(null == (n = this.carpetEditView))) n.addCarpetZones(o, s, t);
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
        if (this.carpetArea) this.showSmartZoneBubble(module1127.SmartBubbleType.BT_CARPET);
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
          if (n && module390.default.isCarpetSupported()) this.showSmartZoneBubble(module1127.SmartBubbleType.BT_CARPET);
          if (this.props.mapMode == module1344.MAP_MODE_ZONED_CLEAN_EDIT && !this.addRectangle(this.carpetArea)) globals.showToast(module510.rubys_main_zone_max_tips);
        } else this.hideSmartZoneBubble();
      },
    },
    {
      key: 'hideChargerBubble',
      value: function () {
        var t = this;
        if (this.chargerTimer) module1421.clearTimeout(this.chargerTimer);
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
          o = {};
        if (t && t.length)
          o = {
            chargerErrorText: t,
          };
        this.setState(
          D(
            {
              showChargerBubble: true,
            },
            o
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
        if (!(t && t.length)) this.chargerTimer = module1421.setTimeout(this.hideChargerBubble.bind(this), 5e3);
      },
    },
    {
      key: 'handleShowFurnitureBubble',
      value: function (t, n) {
        if (this.props.mapMode != module1344.MAP_MODE_ZONED_CLEAN_EDIT && !this._isGlobalTag()) return false;
        if (!this.state.furnitures || this.state.furnitures.length <= 0) return false;
        if (!(this.props.mapElementShowFlag & module1127.MapElementShow.FURNITURE)) return false;
        if (!this._isAvailablePosition(t, false)) return false;
        this.furnitureArea = null;

        for (var o = 0; o < this.state.furnitures.length; o++) {
          var s = this.state.furnitures[o];

          if (s && s.type != module1127.FurnitureType.FT_TOILET) {
            var l = this._checkTouchPosInZone(s, t);

            if (l) {
              this.furnitureArea = {
                x: l.x - 10,
                y: l.y - 10,
                width: l.width + 20,
                height: l.height + 20,
                type: s.type,
                subType: s.subType,
                edited: s.edited,
              };
              break;
            }
          }
        }

        var h;
        if (this.furnitureArea)
          this.props.mapMode == module1344.MAP_MODE_ZONED_CLEAN_EDIT
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
        if (this.furnitureTimer) module1421.clearTimeout(this.furnitureTimer);
        this.furnitureTimer = module1421.setTimeout(this.hideFurnitureBubble.bind(this), 5e3);
      },
    },
    {
      key: 'hideFurnitureBubble',
      value: function () {
        var t = this;
        if (this.furnitureTimer) module1421.clearTimeout(this.furnitureTimer);
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
          o,
          s,
          l = null,
          h = false;
        if (t == module1127.SmartBubbleType.BT_CLIFF && (null == (n = this.state.cliffZones) ? undefined : n.length) > 0) l = this.state.cliffZones[0];
        else if (t == module1127.SmartBubbleType.BT_DOORSILL && (null == (o = this.state.doorSills) ? undefined : o.length) > 0) {
          var u = this.state.doorSills.findIndex(function (t) {
            return t.type == module1127.DoorSillType.SmartSill;
          });
          if (-1 != u) l = this.state.doorSills[u];
        } else if (t == module1127.SmartBubbleType.BT_STUCK && (null == (s = this.state.stuckPoints) ? undefined : s.length) > 0) {
          l = {
            rectSize: module1340._pointToStuckRect(this.state.stuckPoints[0]),
            slopeAngle: 0,
          };
          h = true;
        }

        if (l) {
          var p = module1340._getRotateMaxRectSize(l);

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
        var o;
        if (!this._isGlobalTag() || !n) return false;
        if (!this._isAvailablePosition(t, false)) return false;

        var s = function (t) {
          return {
            x: t.x - 2,
            y: t.y - 2,
            width: t.width + 4,
            height: t.height + 4,
          };
        };

        if (((this.smartZoneInfo = null), (null == (o = this.state.cliffZones) ? undefined : o.length) > 0))
          for (var l = 0; l < this.state.cliffZones.length; l++) {
            var h = this._checkTouchPosInZone(this.state.cliffZones[l], t);

            if (h) {
              this.smartZoneInfo = {
                zoneArea: s(h),
                zoneData: this.state.cliffZones[l],
              };
              break;
            }
          }
        if (this.smartZoneInfo) this.showSmartZoneBubble(module1127.SmartBubbleType.BT_CLIFF);
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
        if (this.smartBBTimer) module1421.clearTimeout(this.smartBBTimer);
        this.smartBBTimer = module1421.setTimeout(this.hideSmartZoneBubble.bind(this), 5e3);
      },
    },
    {
      key: 'hideSmartZoneBubble',
      value: function () {
        var t = this;
        if (this.smartBBTimer) module1421.clearTimeout(this.smartBBTimer);
        if (this.state.showSmartZoneBubble)
          module13.Animated.timing(this.samrtZoneBubbleOpa, {
            toValue: 0,
            duration: 200,
          }).start(function () {
            t.setState({
              showSmartZoneBubble: false,
              smartBubbleType: module1127.SmartBubbleType.BT_NONE,
            });
          });
      },
    },
    {
      key: '_checkTouchPosInZone',
      value: function (t, n) {
        var o = !(arguments.length > 2 && undefined !== arguments[2]) || arguments[2];
        if (!t || !t.rectSize) return null;
        var s = t.rectSize;
        if (!(s.x && s.y && s.width && s.height)) return null;

        var l = o ? module1340._getRotateMaxRectSize(t) : t.rectSize,
          h = module1340._convertToPixelRect(l, this.state.transform);

        return n.x >= h.x && n.x <= h.x + h.width && n.y >= h.y && n.y <= h.y + h.height ? l : null;
      },
    },
    {
      key: '_getCarpetBubbleCenter',
      value: function () {
        if (!this.carpetArea || !this.carpetArea.realX) return null;
        var t = this.props.mapMode != module1344.MAP_MODE_ZONED_CLEAN_EDIT ? this.carpetArea.realX : this.carpetArea.x,
          n = this.props.mapMode != module1344.MAP_MODE_ZONED_CLEAN_EDIT ? this.carpetArea.realY : this.carpetArea.y,
          o = this.props.mapMode != module1344.MAP_MODE_ZONED_CLEAN_EDIT ? this.carpetArea.realW : this.carpetArea.width,
          s = this.props.mapMode != module1344.MAP_MODE_ZONED_CLEAN_EDIT ? this.carpetArea.realH : this.carpetArea.height,
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
                  y: n + s + 10,
                }
              : 270 === p || -90 === p
              ? {
                  x: t + o,
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
          n = (module1127.Config.size.robotRadius * (this.state.transform.yy || 1)) / 2,
          o = {
            x: n,
            y: n,
          };
        return module1340._getRectBubbleCenter(t, o, this.props.mapDeg);
      },
    },
    {
      key: '_getFurnitureBubbleCenter',
      value: function (t) {
        if (!this.furnitureArea || !this.furnitureArea.x || !this.furnitureArea.type) return [null, null];
        var n = module1127.getFurnitureName(this.furnitureArea.type, this.furnitureArea.subType),
          o = 180 == Math.abs(this.props.mapDeg) ? 1 : -0.5,
          s = this.furnitureArea.y + Math.floor(this.furnitureArea.height / 2 + o);
        if (t) s -= module1127.Config.size.objectsRadius / 2 + 2;
        return [
          {
            x: this.furnitureArea.x + Math.floor(this.furnitureArea.width / 2 + 0.5),
            y: s,
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
          o = {
            x: t.x + n.x,
            y: t.y + n.y,
          };
        return module1340._getRectBubbleCenter(o, n, this.props.mapDeg);
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
        for (var n = 0, o = 1; o <= module1127.MAX_COUNT_WALL_OR_FBZ; o++) t[o] && t[o].state.visible && n++;

        return n;
      },
    },
    {
      key: '_setMapZonesFocus',
      value: function (t, n) {
        for (var o = 1; o <= module1127.MAX_COUNT_WALL_OR_FBZ; o++)
          o == n
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
          n = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : -1,
          o = arguments.length > 2 && undefined !== arguments[2] ? arguments[2] : -1,
          s = -1 == n ? module1127.DEFAULT_FBZ_REALHEIGHT : n * (this.state.transform.xx || 1),
          l = -1 == n ? this.justifyRealSize(s) : n,
          h = -1 == o ? this.justifyRealSize(module1127.DEFAULT_FBZ_REALWIDTH) : o,
          u = this.props.parent.getMapViewHeight() / 2;
        u -= s / 2;
        var p = -1 != t ? ((t - 1) * module1127.DEFAULT_RECT_MARGIN) / 2 : 0,
          c = {
            x: module1127.RectConfig.initSize.x + p,
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
          s = this.state.transform.xx || 1,
          l = this.state.transform.yy || 1;

        if (this.isRotated()) {
          var h = {
              width: n.width * s,
              height: n.height * l,
            },
            u = {
              x: t.x + h.width / 2,
              y: t.y + h.height / 2,
            };
          module22 = {
            x: (module22 = this.props.parent._translateXY(u)).x / s - n.width / 2,
            y: module22.y / l - n.height / 2,
          };
        } else
          module22 = {
            x: (module22 = this.props.parent._translateXY(t)).x / s,
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
        var o = arguments.length > 2 && undefined !== arguments[2] ? arguments[2] : null,
          l = module1127.getFurnitureEdge(t, n),
          h = [l.maxWidth, l.maxHeight],
          u = h[0],
          p = h[1],
          c = this.pixelOfElement(u, p),
          f = module23.default(c, 2),
          v = f[0],
          y = f[1],
          w = {
            width: u,
            height: p,
          },
          R = {
            x: (o ? o.x : module13.Dimensions.get('window').width / 2) - v / 2,
            y: (o ? o.y : this.props.parent.getMapViewHeight() / 2) - y / 2,
          };
        return this._convertDefaultZonesArea(R, w);
      },
    },
    {
      key: '_getDefaultWallPos',
      value: function (t) {
        var n = this.props.parent.getMapViewHeight() / 2,
          o = ((t - 1) * module1127.DEFAULT_RECT_MARGIN) / 2,
          s = {
            x: module1127.wallConfig.initSize.start_x + o,
            y: n + o,
          },
          l = this.justifyRealSize(module1127.DEFAULT_FBZ_REALWIDTH),
          h = this.props.parent._translateXY(s);

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
        var t = this;
        if (-1 === this.state.carpetFirstIndex) return null;
        var n,
          o = {
            x: (n = this.state.carpetFirstIndex) % t.state.width,
            y: Math.floor(n / t.state.width),
          };
        return module1340.getMaxCarpetRect(this.state.carpetData, o, this.state.width, this.state.height);
      },
    },
    {
      key: 'getRealRectForCarpet',
      value: function () {
        if (undefined === this.state.carpetMap || undefined === this.state.carpetData) return null;
        if (!(this.props.mapElementShowFlag & module1127.MapElementShow.FLOOR_CARPET)) return null;
        var t = this.carpetPos;
        if (!this._isAvailablePosition(t)) return null;
        var n = {
          x: Math.floor(t.x / this.state.transform.xx),
          y: Math.floor(t.y / this.state.transform.yy),
        };
        return module1340.getMaxCarpetRect(this.state.carpetData, n, this.state.width, this.state.height);
      },
    },
    {
      key: 'getRectForCustomCarpet',
      value: function () {
        var t,
          n = null == (t = this.carpetEditView) ? undefined : t.getCustomCarpets();
        if (!n || n.length <= 0) return null;
        var s = this.carpetPos;
        if (!this._isAvailablePosition(s)) return null;

        for (var l = 0; l < n.length; l++) {
          var h = n[l],
            u = this._checkTouchPosInZone(h, s, false);

          if (u) {
            var p = module1340.adjustMinCarpetRect(u);
            return module22.default(p, {
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
          var o = module13.Dimensions.get('window').width,
            s = t && t.width ? t.width : 70;

          if (!n) {
            var l = module1340._convertToPixelRect(this.carpetArea, this.state.transform);

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
            p = (s + (o - s) ** 80) / 2;

          if (h.x < p) u = p - h.x;
          if (h.x > o - p) u = o - h.x - p;
          if (u) this.props.parent.moveMap(u, 0);
        }
      },
    },
    {
      key: 'moveMapToRectCenter',
      value: function (t) {
        var n;

        if (t) {
          var o = t.x + t.width / 2,
            l = t.y + t.height / 2,
            h = this.state.width / 2,
            u = this.state.height / 2,
            p = h - o,
            c = u - l;

          if (this.isRotated()) {
            var f = module1340._parseDegPoint(p, c, -1 * this.props.mapDeg),
              b = module23.default(f, 2),
              v = b[0],
              y = u + b[1];

            p = h + v - this.state.width / 2;
            c = y - this.state.height / 2;
          }

          var E = this.pixelOfElement(p, c),
            w = module23.default(E, 2),
            R = w[0],
            C = w[1];
          if (!(null == (n = this.props.parent) || null == n.moveMapTo)) n.moveMapTo(R, C);
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
        return (n ** module1127.RectConfig.maxLength) ** module1127.RectConfig.minLength;
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
          o = this.pixelOfElement(this.state.width, this.state.height),
          l = module23.default(o, 2),
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
        for (var t = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : null, n = this.mapObjectRefs || [], o = 0; o < n.length; o++)
          (t && n[o].props.originX == t.originX && n[o].props.originY == t.originY) || n[o].hideBubble();
      },
    },
    {
      key: 'addFurniture',
      value: function (t, n) {
        var o,
          s = arguments.length > 2 && undefined !== arguments[2] ? arguments[2] : null,
          l = this.degreeToRad(-1 * this.props.mapDeg),
          h = this._getFurnitureDefaultArea(t, n, s);

        if (!(this.handleCheckAndroidOverflow(h, null, l, true) || null == (o = this.furnitureView))) o.addFurniture(t, n, h, l);
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
            var o,
              s = this.degreeToRad(-1 * this.props.mapDeg),
              l = this._getDefaultMapZonesArea(n);

            if (!(null == (o = this.historyMarkView))) o.addMarkZone(n, l, s);
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
        var n, o;

        if (null == (n = this.doorSillView) || !n.checkMaxCount()) {
          var s = this.degreeToRad(-1 * this.props.mapDeg),
            l = this._getDefaultMapZonesArea(1, t, module1127.DoorConfig.df_width);

          if (!(null == (o = this.doorSillView))) o.addDoorSill(l, s, t != module1127.DoorConfig.other_df_height);
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
        return this.props.mapMode == module1344.MAP_MODE_EASTER_EGG && this.state.status == module381.RobotState.EGG_ATTACK;
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

exports.default = module1482;
module1482.contextType = module1200.AppConfigContext;
module1482.propTypes = {
  color: PropTypes.default.object,
  map: PropTypes.default.string,
  path: PropTypes.default.string,
  pathGotoPlan: PropTypes.default.string,
  mopPath: PropTypes.default.string,
  target: PropTypes.default.string,
  transform: PropTypes.default.objectOf(F),
  imageOnloadCallback: PropTypes.default.bool,
  isCollectDustDock: PropTypes.default.bool,
  showDockBubbles: PropTypes.default.bool,
};
module1482.defaultProps = {
  isCollectDustDock: false,
  imageOnloadCallback: false,
  showDockBubbles: false,
  mapDeg: 0,
  mapPanStatus: module1127.PanStatus.MAP_VIEWING_NONE,
  blockSequenceList: [],
  onRectPanStart: function () {},
  onRectPanEnd: function () {},
};
var K = module13.StyleSheet.create({
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
