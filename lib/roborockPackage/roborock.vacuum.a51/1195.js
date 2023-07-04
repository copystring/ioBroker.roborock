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
  module1197 = require('./1197'),
  module1120 = require('./1120'),
  module1204 = require('./1204'),
  module1462 = require('./1462'),
  module420 = require('./420'),
  module381 = require('./381'),
  module1407 = require('./1407'),
  module398 = require('./398'),
  module424 = require('./424'),
  module1193 = require('./1193'),
  module391 = require('./391'),
  module390 = require('./390'),
  module393 = require('./393');

function T(t, s) {
  var n = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    if (s)
      o = o.filter(function (s) {
        return Object.getOwnPropertyDescriptor(t, s).enumerable;
      });
    n.push.apply(n, o);
  }

  return n;
}

function x(t) {
  for (var n = 1; n < arguments.length; n++) {
    var o = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      T(Object(o), true).forEach(function (n) {
        module50.default(t, n, o[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(o));
    else
      T(Object(o)).forEach(function (s) {
        Object.defineProperty(t, s, Object.getOwnPropertyDescriptor(o, s));
      });
  }

  return t;
}

function B(t) {
  var s = F();
  return function () {
    var n,
      o = module12.default(t);

    if (s) {
      var l = module12.default(this).constructor;
      n = Reflect.construct(o, arguments, l);
    } else n = o.apply(this, arguments);

    return module11.default(this, n);
  };
}

function F() {
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

var module1414 = require('./1414'),
  Z = module13.ART.Transform,
  module510 = require('./510').strings,
  module1333 = require('./1333'),
  module1120 = require('./1120'),
  module1410 = require('./1410'),
  z = module1410.RRSurface,
  W = module1410.isRRSurface,
  module1408 = require('./1408'),
  module1337 = require('./1337'),
  module1469 = require('./1469'),
  module1470 = require('./1470'),
  module1471 = require('./1471'),
  module1472 = require('./1472'),
  module1473 = (function (t) {
    module9.default(p, t);
    var s = B(p);

    function p(t) {
      var n;
      module6.default(this, p);
      (n = s.call(this, t)).smallDiam = 12;
      n.bigDiam = 108;
      n.longPressStart = false;
      n.longPressCanceled = false;
      n.touch = {
        start: {},
        end: {},
        move: {},
      };
      n.state = {
        visible: false,
        position: {
          x: 0,
          y: 0,
        },
      };
      return n;
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
            onPanResponderStart: function (s, n) {
              t._handleLongPressStart();

              t.touch.move = module1333._parseEvent2(s.nativeEvent, n) || {};
            },
            onPanResponderEnd: function () {
              if (t.longPressStart) t.longPressStart = false;
              else t._handleLongPressCancel();
            },
            onPanResponderMove: function (s, n) {
              if (t.longPressStart) {
                var l = [module1333._parseEvent2(s.nativeEvent, n), t.touch.move],
                  h = l[0],
                  u = l[1];
                if (((t.touch.move = h || {}), !(h && h.x && h.y && u.x))) return;

                var p = module1333._parseDegPointWithTrans(h, u, t.props.transform, t.props.mapDeg),
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

            var t = module1333._parseDegPoint(0, -30 / (this.props.transform.yy || 1), this.props.mapDeg),
              s = module23.default(t, 2),
              n = s[0],
              l = s[1];

            this.setState({
              position: {
                x: this.state.position.x + n,
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
          module1414.setTimeout(function () {
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
                justifyContent: s,
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
                source: require('./1473'),
              })
            )
          );
        },
      },
    ]);
    return p;
  })(React.default.Component);

module1473.propTypes = {
  onLongPress: PropTypes.default.func,
};
module1473.defaultProps = {
  onLongPress: function () {},
  transform: {
    xx: 1,
    yy: 1,
  },
};

var module1475 = (function (t) {
  module9.default(p, t);
  var s = B(p);

  function p(t) {
    var n;
    module6.default(this, p);

    (n = s.call(this, t)).mapSourceOnLoad = function (t, s) {
      if (n.props.imageOnloadCallback)
        s == module1120.shareViewLoadType.ONLOAD_OBSTACLE
          ? n.lastObstacles && ++n.mapObjectImageLoadNum == n.lastObstacles.length && ((n.mapObjectImageLoadNum = 0), n._imageOnLoaded([s]))
          : (n._imageOnLoaded([s]), (n.mapLoadSources[s] = t.url));
    };

    n.colorOfRoom = function (t) {
      var s =
        n.props.parent.state.selectBlockList[t] && n.props.blockCanEdit
          ? ['#DFDFDFff', '#50A4FF', '#FF744D', '#008FA8', '#F5AF10', '#E9E9E9ff']
          : ['#DFDFDF88', '#05819B88', '#C6920088', '#C4715888', '#1369C088', '#E9E9E988'];
      return n.state.roomColorData ? s[n.state.roomColorData[t]] : s[0];
    };

    n.pixelOfElement = function (t) {
      var s = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : null,
        o = null != s ? s : t;
      return [t * (n.state.transform.xx || 1), o * (n.state.transform.yy || 1)];
    };

    n.showChargerWaring = function () {
      return (
        !n.props.parent.props.shouldShowRobotMovingAnimation && !n.props.hideAccessory && !(-1 == [38, 39, 40, 42].indexOf(module381.RSM.errorCode) || !n.charger || !n.charger.x)
      );
    };

    n.showRobotAnimation = function () {
      if (-1 != [38, 39, 40, 42].indexOf(module381.RSM.errorCode) && n.charger && n.charger.x && n.charging) return false;
      if (n.props.hideAccessory || undefined === n.state.status || undefined === module381.RobotStatusInMap[n.state.status]) return false;
      var t = module381.RobotStatusInMap[n.state.status];
      return (
        ((n.props.mapMode == module1337.MAP_MODE_EASTER_EGG && n.state.status == module381.RobotState.EGG_ATTACK) || ('Running' !== t && null != t && undefined !== t)) &&
        module381.RSM.state != module381.RobotState.WASHING_DUSTER
      );
    };

    n.handleClickSmartZone = function (t, s, o) {
      if (n._isGlobalTag() && n.props.showAllComponetBubble && s) {
        var l = module1333._getRotateMaxRectSize(o);

        n.smartZoneInfo = {
          zoneArea: {
            x: l.x - 2,
            y: l.y - 2,
            width: l.width + 4,
            height: l.height + 4,
          },
          zoneData: s,
        };
        n.showSmartZoneBubble(t);
      }
    };

    n.handleFBZPanEnd = function (t, s) {
      if (s) n.moveMapToRectCenter(null == t ? undefined : t.state.rectSize);
    };

    n.handleRectPanStart = function (t, s) {
      if (s) n._setMapZonesFocus(n.rectReferences, t);
      if (!(null == n.props.onRectPanStart)) n.props.onRectPanStart();
    };

    n.handleRectPanEnd = function (t, s) {
      if (s) n.moveMapToRectCenter(null == t ? undefined : t.state.rectSize);
      if (!(null == n.props.onRectPanEnd)) n.props.onRectPanEnd();
    };

    n.mapEditPageDidChange = function () {
      var t = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : -1;
      return module13.DeviceEventEmitter.emit(module420.NotificationKeys.MapEditDidChange, {
        data: t,
      });
    };

    n.getTargetPos = function (t) {
      return t ? n.robot : n.charger;
    };

    n.handlePressDockBubble = function () {
      return n.props.parent.props.onPressDockBubble && n.props.parent.props.onPressDockBubble();
    };

    n.handlePressChargerErrorBubble = function () {
      return n.props.parent.props.onPressChargerErrorBubble && n.props.parent.props.onPressChargerErrorBubble();
    };

    n.handleBubbleLayout = function (t, s) {
      return n.moveMapIfNeeded(t, s);
    };

    n.handlePressFurnitureBubble = function () {
      return null == n.props.parent.props.onPressFurnitureBubble ? undefined : n.props.parent.props.onPressFurnitureBubble(n.furnitureArea);
    };

    n.handlePressSmartZoneBubble = function () {
      var t, s;
      if (n.state.smartBubbleType != module1120.SmartBubbleType.BT_CARPET) {
        if (n.state.smartBubbleType != module1120.SmartBubbleType.BT_NONE && (null == (t = n.smartZoneInfo) ? undefined : t.zoneData))
          null == (s = n.props.parent) || null == s.props.onPressSmartZoneBubble || s.props.onPressSmartZoneBubble(n.smartZoneInfo.zoneData, n.state.smartBubbleType);
      } else if (!(null == n.props.parent.props.onPressSmartZoneBubble)) n.props.parent.props.onPressSmartZoneBubble(n.carpetArea, n.state.smartBubbleType);
    };

    n.handleCheckAndroidOverflow = function (t, s, o) {
      var l = arguments.length > 3 && undefined !== arguments[3] && arguments[3],
        h = (n._getEdgeCheckPadding() - (s ? 45 : l ? 65 : 35)) / n.state.transform.xx;
      if (s) return (s.x <= -1 * h || s.x >= n.state.width + h || s.y <= -1 * h || s.y >= n.state.height + h) && (globals.showToast(module510.rotate_map_rect_warning), true);

      if (t) {
        if ((o = Math.abs(((180 * o) / Math.PI) % 360)) > 90 && o <= 270) o = Math.abs(o - 180);
        if (o > 270 && o < 360) o = 360 - o;
        o = n.degreeToRad(o);
        var u = t.x + t.width / 2,
          p = t.y + t.height / 2,
          c = (t.height / 2) * Math.cos(-1 * o) - (t.width / 2) * Math.sin(-1 * o),
          f = p - c,
          b = p + c,
          v = (t.height / 2) * Math.sin(o) + (t.width / 2) * Math.cos(o);
        return (u - v <= -1 * h || u + v >= n.state.width + h || f <= -1 * h || b >= n.state.height + h) && (globals.showToast(module510.rotate_map_rect_warning), true);
      }

      return false;
    };

    n.handleShouldShowBubbleChecker = function (t) {
      if (n.props.parent.props.shouldShowMapObjectBubbleChecker) n.props.parent.props.shouldShowMapObjectBubbleChecker(t);
    };

    n.handlePressObjectBubble = function (t) {
      var s = {
        x: t.originX,
        y: t.originY,
        type: t.type,
        percent: t.percent,
        photoId: t.photoId,
      };
      if (!(null == n.props.parent.props.onPressMapObjectBubble)) n.props.parent.props.onPressMapObjectBubble(s, n.state.ignoredObstacles);
    };

    n.handlePressPhotoReminderBubble = function (t) {
      var s = {
        x: t.originX,
        y: t.originY,
        type: t.type,
        percent: t.percent,
        photoId: t.photoId,
      };
      if (!(null == n.props.parent.props.onPressMapObjectPhotoReminderBubble)) n.props.parent.props.onPressMapObjectPhotoReminderBubble(s, n.state.ignoredObstacles);
    };

    n.handlePressObjectDelete = function (t) {
      for (s = t.x, o = t.y, l = [], h = 0, undefined; h < n.state.obstacles.length; h++) {
        var s, o, l, h;
        var u = n.state.obstacles[h],
          p = t.transform.point(u[3], u[4]);
        if ((p.x - s) * (p.x - s) + (p.y - o) * (p.y - o) < 2500)
          l.push({
            x: u[0],
            y: u[1],
            type: u[2],
          });
      }

      if (!(null == n.props.parent.props.onIgnoreMapObjects)) n.props.parent.props.onIgnoreMapObjects(l, n.state.ignoredObstacles);
    };

    n.handleObjectNameViewDidShow = function (t) {
      var s = [x({}, t)];
      n.setState({
        showMapObjectNameObjects: s,
      });
    };

    n.handleObjectNameViewDidHide = function (t) {
      var s = n.state.showMapObjectNameObjects;
      if (
        -1 !=
        s.findIndex(function (s) {
          return s.originX == t.originX && s.originY == t.originY && s.type == t.type;
        })
      )
        s = s.filter(function (s) {
          return s.originX != t.originX && s.originY != t.originY && s.type != t.type;
        });
      n.setState({
        showMapObjectNameObjects: s,
      });
    };

    n.handleMapObjectBubbleDidShow = function (t) {
      n.hideAllMapObjects(t);

      n._cleanAllMapBubble();
    };

    n.handleMapObjectImageOnLoad = function () {
      return n.mapSourceOnLoad({}, module1120.shareViewLoadType.ONLOAD_OBSTACLE);
    };

    n.color = n.props.color;
    n.robot = {
      x: 0,
      y: 0,
    };
    n.robotAngle = 0;
    n.charger = {
      x: 0,
      y: 0,
      angle: 0,
    };
    n.charging = false;
    n.lastStatus = 'undefined';
    n.rectReferences = {
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
    };
    n.mapObjectRefs = [];
    n.mapObjectImageLoadNum = 0;
    n.mapLoadSources = {};
    n.carpetArea = {};
    n.furnitureArea = {};
    n.mapRotatePadding = 0;
    n.carpetBubbleOpacity = new module13.Animated.Value(0);
    n.chargerBubbleOpacity = new module13.Animated.Value(0);
    n.furnitureBubbleOpa = new module13.Animated.Value(0);
    n.samrtZoneBubbleOpa = new module13.Animated.Value(0);
    n.chargerLottieSize = {
      width: 0,
      height: 0,
    };
    n.state = {
      map: n.props.map || '',
      path: n.props.path || '',
      pathGotoPlan: n.props.pathGotoPlan || '',
      mopPath: n.props.mopPath || '',
      target: n.props.target || {},
      width: module1120.EMPTY_MAP_SIZE,
      height: module1120.EMPTY_MAP_SIZE,
      transform: n.props.transform || new Z(),
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
      smartBubbleType: module1120.SmartBubbleType.BT_NONE,
      chargerErrorText: '',
    };
    return n;
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
          onPanResponderStart: function (s, n) {
            t.handleChargerClick(s.nativeEvent);
          },
          onPanResponderEnd: function (t, s) {},
          onPanResponderMove: function (t, s) {},
          onPanResponderTerminationRequest: function (t, s) {
            return false;
          },
          onPanResponderTerminate: function (t, s) {},
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
      value: function (t, s) {
        if (
          t.mapMode == module1337.MAP_MODE_GOTO_EDIT &&
          s.target &&
          s.target.x &&
          s.target.y &&
          module381.RobotStatusManager.sharedManager().state == module381.RobotState.GOTO_TARGET
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
        var n;
        if (this.lottieView) this.lottieView.play();
        if (!(null == (n = this.lottieCharger))) n.play();
        this.lastStatus = s.robotStatus;
      },
    },
    {
      key: '_checkMapDiff',
      value: function (t) {
        var s = [];
        if (!t.charger || (t.charger && this.mapLoadSources[module1120.shareViewLoadType.ONLOAD_CHARGER])) s.push(module1120.shareViewLoadType.ONLOAD_CHARGER);
        if (undefined === t.carpetMap || t.carpetMap === this.mapLoadSources[module1120.shareViewLoadType.ONLOAD_CARPETMAP]) s.push(module1120.shareViewLoadType.ONLOAD_CARPETMAP);
        if (!this.currentMap || this.currentMap === this.mapLoadSources[module1120.shareViewLoadType.ONLOAD_MAP]) s.push(module1120.shareViewLoadType.ONLOAD_MAP);
        if (t.obstacles && 0 != t.obstacles.length) this.lastObstacles = t.obstacles;
        else s.push(module1120.shareViewLoadType.ONLOAD_OBSTACLE);
        if (s.length > 0) this._imageOnLoaded(s);
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
      value: function (t, s) {
        var n = s.map;
        if (1 == t.parent.state.inCleanBlockMode) n = s.mapBCBackground;
        else if ((undefined !== t.parent.state.map.data && t.parent.state.map.data.blockNum <= 1) || t.mapMode == module1337.MAP_MODE_CARPET_EDIT) n = s.mapNoBlock;
        return n;
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
          return module381.RSM.isO0Dock() ? module1120.DockTypeRes[module1120.DockType.Normal] : module1120.DockTypeRes[module1120.DockType.Other];
        else return 0 == this.state.dockType ? module1120.DockTypeRes[module1120.DockType.Normal] : module1120.DockTypeRes[module1120.DockType.Other];
      },
    },
    {
      key: '_isGlobalTag',
      value: function () {
        return this.props.mapMode == module1337.MAP_MODE_REGULAR && !this.props.parent.state.inCleanBlockMode;
      },
    },
    {
      key: 'handleChargerClick',
      value: function (t) {
        var s = arguments.length > 1 && undefined !== arguments[1] && arguments[1];
        if (!(t.touches.length > 1))
          this.props.showDockBubbles &&
            this._isGlobalTag() &&
            ((s && this.state.status != module381.RobotState.CHARGING && this.state.status != module381.RobotState.FULL_CHARGE) ||
              (this.state.showChargerBubble ? this.hideChargerBubble() : this.showChargerBubble()));
      },
    },
    {
      key: 'getCharger',
      value: function () {
        var t = this,
          s = this.showChargerWaring(),
          l = this._getChargerResources(),
          h = 0.5,
          u = 0.86,
          p = this.pixelOfElement(module1120.Config.size.chargerRadius, module1120.Config.size.chargerRadius * u),
          c = module23.default(p, 2),
          v = c[0],
          y = c[1];

        if (l.type == module1120.DockType.Normal) {
          h = 0.77;
          u = 0.5;
          var w = this.pixelOfElement(module1120.Config.size.chargerNormal * h, module1120.Config.size.chargerNormal),
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
                        rotateZ: -1 * module1333.adjustChargerAngle(this.charger.angle) + 'deg',
                      },
                    ],
                    zIndex: s ? 999 : 0,
                  },
                  source: l.chargerIcon,
                  onLoad: this.props.imageOnloadCallback
                    ? function (s) {
                        return t.mapSourceOnLoad(s.nativeEvent.source, module1120.shareViewLoadType.ONLOAD_CHARGER);
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
          s = this._getChargerResources(),
          l = this.pixelOfElement(module1120.Config.size.chargerRadius, 0.86 * module1120.Config.size.chargerRadius),
          h = module23.default(l, 2),
          u = h[0],
          p = h[1];

        return !this.props.hideAccessory && this.state.charger && s.type != module1120.DockType.Normal
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
                        rotateZ: -1 * module1333.adjustChargerAngle(this.charger.angle) + 'deg',
                      },
                    ],
                    zIndex: t ? 999 : 0,
                  },
                  source: require('./1474'),
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

        return s && s.x && s.y
          ? React.default.createElement(module1204.ObjectNameBubble, {
              hasArrow: (this.state.chargerErrorText && this.state.chargerErrorText.length) || this._isCanJumpOnyxDock(),
              objectName: this.state.chargerErrorText && this.state.chargerErrorText.length ? this.state.chargerErrorText : this._getChargerResources().name,
              objectImage: this.state.chargerErrorText && this.state.chargerErrorText.length ? module1469 : this._getChargerResources().chargerBubbleIcon,
              center: s,
              imageStyle: Q.chargerBubbleImg,
              animatedOpacity: this.chargerBubbleOpacity,
              mapDeg: this.props.mapDeg,
              onBubbleLayout: this.handleBubbleLayout,
              onPressBubble: function () {
                var s;
                if (null == (s = t.state.chargerErrorText) ? undefined : s.length) t.handlePressChargerErrorBubble();
                else t.handlePressDockBubble();
              },
            })
          : null;
      },
    },
    {
      key: 'getChargerForbid',
      value: function () {
        var t = module381.RSM.isO0Dock() ? module1120.Config.size.chargerNormal : module1120.Config.size.chargerRadius,
          s = this.pixelOfElement(module1120.DOCK_FORBIDDEN_R),
          n = module23.default(s, 2),
          l = n[0],
          h = n[1],
          u = this.pixelOfElement(module1120.DOCK_FORBIDDEN_R - t / 2),
          p = module23.default(u, 2),
          c = p[0],
          v = p[1];
        return !this.props.hideAccessory && (this.charger.x || this.charger.y) && this.state.charger && this.props.mapMode == module1337.MAP_MODE_MAP_EDIT
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
                    rotateZ: module1333.adjustChargerAngle(this.charger.angle) * (module13.I18nManager.isRTL ? 1 : -1) + 'deg',
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
        var s = this.pixelOfElement(module1120.Config.size.robotRadius),
          n = module23.default(s, 2),
          l = n[0],
          h = n[1];
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
          React.default.createElement(module1197.default, {
            ref: function (s) {
              return (t.lottieCharger = s);
            },
            style: {
              width: 1.75 * l,
              height: 1.75 * h,
            },
            source: module1120.MapAnimates.Warning,
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
          (module381.RSM.state == module381.RobotState.WASHING_DUSTER
            ? ((t = module424.DMM.isPearl ? 'WashingdustPearl' : 'Washingdust'), module424.DMM.isPearl && module393.isMiApp && (t = ''))
            : module381.RSM.state == module381.RobotState.COLLECTING_DUST && (t = 'Collectdust'),
          t.length <= 0)
        )
          return null;

        var s = this._getChargerBubbleCenter();

        if (this.chargerLottieSize.width * this.state.transform.xx < 56) this.chargerLottieSize.width = 56 / this.state.transform.xx;
        if (this.chargerLottieSize.width * this.state.transform.xx > 80) this.chargerLottieSize.width = 80 / this.state.transform.xx;
        if (this.chargerLottieSize.height * this.state.transform.yy < 56) this.chargerLottieSize.height = 56 / this.state.transform.yy;
        if (this.chargerLottieSize.height * this.state.transform.yy > 80) this.chargerLottieSize.height = 80 / this.state.transform.yy;
        var n = this.chargerLottieSize.width * this.state.transform.xx,
          o = this.chargerLottieSize.height * this.state.transform.yy;
        return React.default.createElement(module1204.ChargerStatusLottieView, {
          mapDeg: this.props.mapDeg,
          center: s,
          baseWidth: n,
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
        var s = module381.RobotStatusInMap[this.state.status],
          n = this.pixelOfElement(module1120.Config.size.robotRadius),
          l = module23.default(n, 2),
          h = l[0],
          u = l[1],
          p = {
            position: 'absolute',
            width: 1.75 * h,
            height: 1.75 * u,
            left: this.robot ? this.robotPos.x - (h / 2) * 1.75 : (-h / 2) * 1.75,
            top: this.robot ? this.robotPos.y - (u / 2) * 1.75 : (-u / 2) * 1.75,
            zIndex: 'Warning' === s ? 999 : 0,
          };
        React.default.createElement(module13.View, null);
        return this.props.mapMode == module1337.MAP_MODE_EASTER_EGG && this.state.status == module381.RobotState.EGG_ATTACK
          ? React.default.createElement(
              module13.View,
              {
                pointerEvents: 'none',
                style: p,
              },
              React.default.createElement(module1197.default, {
                ref: function (s) {
                  return (t.lottieView = s);
                },
                style: {
                  width: 1.75 * h,
                  height: 1.75 * u,
                },
                source: module1120.MapAnimates.Warning,
              })
            )
          : 'Sleeping' === s
          ? React.default.createElement(
              module13.View,
              {
                pointerEvents: 'none',
                style: {
                  position: 'absolute',
                  width: 2 * h,
                  height: 2 * u,
                  left: this.robot ? this.robotPos.x + h / 2 - 0.66 * u : h - 0.66 * u,
                  top: this.robot ? this.robotPos.y - u / 2 - 1.33 * u : -1.33 * u,
                },
              },
              React.default.createElement(module1197.default, {
                ref: function (s) {
                  return (t.lottieView = s);
                },
                style: {
                  width: 2 * h,
                  height: 2 * u,
                },
                source: module1120.MapAnimates[s],
              })
            )
          : React.default.createElement(
              module13.View,
              {
                pointerEvents: 'none',
                style: p,
              },
              React.default.createElement(module1197.default, {
                ref: function (s) {
                  return (t.lottieView = s);
                },
                style: {
                  width: 1.75 * h,
                  height: 1.75 * u,
                },
                source: module1120.MapAnimates[s],
              })
            );
      },
    },
    {
      key: 'getRobot',
      value: function (t) {
        var s = this,
          l = this.pixelOfElement(module1120.Config.size.robotRadius),
          h = module23.default(l, 2),
          u = h[0],
          p = h[1],
          c = this.showChargerWaring() || (this.showRobotAnimation() && 'Warning' === module381.RobotStatusInMap[this.state.status]);
        this.panResponderRobotPress = module13.PanResponder.create({
          onStartShouldSetPanResponder: function () {
            return true;
          },
          onMoveShouldSetPanResponder: function () {
            return true;
          },
          onPanResponderStart: function (t, n) {
            s.handleChargerClick(t.nativeEvent, true);
          },
          onPanResponderEnd: function (t, s) {},
          onPanResponderMove: function (t, s) {},
          onPanResponderTerminationRequest: function (t, s) {
            return false;
          },
          onPanResponderTerminate: function (t, s) {},
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
          y = 'android' != module13.Platform.OS ? module13.Image : module1408,
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
                    left: this.robot ? this.robotPos.x - u / 2 : 0,
                    top: this.robot ? this.robotPos.y - p / 2 : 0,
                    zIndex: c ? 999 : 0,
                  },
                }
              ),
              React.default.createElement(
                module1408,
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
      value: function (t, s) {
        var n = this,
          o = !this.props.hideAccessory && this.props.mapMode != module1337.MAP_MODE_ZONED_CLEAN_EDIT && this.props.mapMode != module1337.MAP_MODE_BLOCK_CLEAN_EDIT && s > 10;
        return React.default.createElement(module1204.AnimatedRobot, {
          pathPoints: this.state.pathPoints ? this.state.pathPoints : [],
          pathData: this.state.pathData,
          transform: this.state.transform,
          robot: this.robotPos,
          width: t,
          height: s,
          showPath: o,
          onPlayFinished: this.props.parent.props.onPathPlaybackFinished,
          ref: function (t) {
            return (n.animatedRobot = t);
          },
        });
      },
    },
    {
      key: 'getForbiddenView',
      value: function (t) {
        var s = this;
        return 1 != this.props.parent.state.inBlockMode && this.props.mapMode != module1337.MAP_MODE_CARPET_EDIT && this.props.mapMode != module1337.MAP_MODE_DOORSILL_EDIT
          ? React.default.createElement(module1462.ForbiddenView, {
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
        var s = this;
        return Object.keys(this.rectReferences).map(function (n, o) {
          return React.default.createElement(module1204.CleanRect, {
            key: o,
            id: n,
            mapDeg: s.props.mapDeg,
            ref: function (t) {
              return (s.rectReferences[n] = t);
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
          ? this.state.displayZones.map(function (s, n) {
              var o = module1333._convertToPixelRect(s, t.state.transform);

              return React.default.createElement(module13.View, {
                key: n,
                pointerEvents: 'none',
                style: {
                  position: 'absolute',
                  left: o.x,
                  top: o.y,
                  width: o.width,
                  height: o.height,
                  overflow: 'visible',
                  backgroundColor: module1120.buttonConfig.rectBgColor,
                  borderColor: module1120.buttonConfig.rectColorSolid,
                  borderWidth: 1,
                  borderStyle: 'solid',
                },
              });
            })
          : React.default.createElement(module13.View, null);
      },
    },
    {
      key: 'getMapObjects',
      value: function (t, s) {
        if (!(this.props.mapElementShowFlag & module1120.MapElementShow.OBSTACLE)) return [];
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
              R = -99 == h[2] ? 'merges' : !c.photoId || c.photoId.length < 1 ? 'ai' : this.props.obstaclePopBoxType,
              C = -99 == h[2] ? h.length - 2 : h.length - 1,
              M = this.state.roomColorData[h[C]];
            s.push(
              React.default.createElement(
                module1204.MapObjectView,
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
                    showMapObjectName: this.props.mapMode == module1337.MAP_MODE_REGULAR,
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
        return o;
      },
    },
    {
      key: 'getBlockOperationView',
      value: function (t) {
        var s,
          n,
          o,
          l = this,
          h = (null == (s = this.props.parent) ? undefined : s.getCurrentSelectBlock()) || [],
          u = null,
          p = -1;

        if (1 == h.length) {
          p = h[0];
          u = (null == (n = this.props.parent) ? undefined : null == (o = n.touchBlockPtMap) ? undefined : null == o.get ? undefined : o.get(p)) || null;
        }

        return this.props.showSplitLine && -1 != p
          ? React.default.createElement(module1204.BlockOperation, {
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
          s = [];
        if (undefined === this.state.centerInfo) return s;
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
              if (h == module1120.BlockBubbleShowInfo.NONE && 1 != v) return 'continue';

              var y = t.props.parent.state.roomModeList.find(function (t) {
                  return t.id == o;
                }),
                R = y ? y.cleanMode : -1,
                C = y ? y.waterMode : -1,
                S = y ? y.mopMode : -1,
                _ = null != (c = null == y ? undefined : y.mopTemplateId) ? c : -1;

              if (h & module1120.BlockBubbleShowInfo.CLEANMODE && u) {
                R = module381.RSM.isCustomCleanMode() ? R : -1;
                C = module381.RSM.isCustomWaterMode() ? C : -1;
                S = module381.RSM.isCustomMopMode() ? S : -1;
              }

              var O = t.state.centerInfo[o].x / t.state.centerInfo[o].count,
                k = t.state.centerInfo[o].y / t.state.centerInfo[o].count,
                D = (O + 0.5) * t.state.transform.xx,
                T = (t.state.height - k - 0.5) * t.state.transform.yy,
                x = (t.state.centerInfo[o].maxX - t.state.centerInfo[o].minX) * t.state.transform.xx,
                B = !v && u ? x ** 60 : p,
                F = {
                  left: D - B / 2,
                  top: T - (180 == Math.abs(t.props.mapDeg) ? 0 : 17),
                },
                I = '',
                Z = -1,
                L = t.props.parent.state.roomNameList;

              if ((0 != L.length && (-1 != L[o][1] && (I = L[o][1]), 3 == L[o].length && (Z = L[o][2])), '' == I)) {
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
              if (!(t.props.mapElementShowFlag & module1120.MapElementShow.NAME_TAG)) h &= module1120.BlockBubbleShowInfo.CLEANMODE | module1120.BlockBubbleShowInfo.CLEANSEQUENCE;
              if (!(t.props.mapElementShowFlag & module1120.MapElementShow.CUSTOM_ORDER)) h &= module1120.BlockBubbleShowInfo.DISPLAYNAME;
              var z = t.state.roomColorData[o];
              if (
                1 == t.props.parent.state.inCleanBlockMode &&
                -1 ==
                  l.findIndex(function (t) {
                    return t == o;
                  })
              )
                z = 8;
              s.push(
                React.default.createElement(
                  module13.View,
                  {
                    pointerEvents: t.props.blockCanEdit ? 'box-none' : 'none',
                    key: o,
                    style: [
                      Q.roomBubbleView,
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
                    module1204.RoomInfoBubble,
                    module22.default({}, module391.default.getAccessibilityLabel('room_info_bubble'), {
                      isSelected: 1 == v,
                      sequenceID: -1 == N ? '' : N.toString(),
                      roomColor: t.colorOfRoom(o),
                      cleanMode: R,
                      waterMode: C,
                      mopMode: S,
                      mopTemplateId: _,
                      displayMode: h,
                      roomName: I,
                      roomTag: Z,
                      colorIndex: z,
                      maxWidth: x,
                      transform: t.state.transform,
                      hideShadow: t.props.mapPanStatus > module1120.PanStatus.MAP_VIEWING_FIT,
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

        return s;
      },
    },
    {
      key: 'onPressTag',
      value: function (t) {
        var s;
        if (!(null == (s = this.props.parent))) s.changeBlockState(t);
      },
    },
    {
      key: 'getBlockMapsView',
      value: function (t) {
        var s = this,
          n = [];
        if (undefined === this.props.parent.state.map.mapList) return n;

        var o,
          l = function (o) {
            var l = s.props.parent.state.map.mapList[o];
            if (undefined !== l)
              n.push(
                React.default.createElement(module1408, {
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
        return n;
      },
    },
    {
      key: 'getCarpetMapView',
      value: function (t) {
        var s = this;
        if (!(this.props.mapElementShowFlag & module1120.MapElementShow.FLOOR_CARPET)) return null;
        var n = this.state.carpetMap;
        if (undefined === n) return null;
        var o = React.default.createElement(module1408, {
            pointerEvents: 'none',
            layerScaleFilter: 'Nearest',
            style: t,
            source: {
              uri: n,
            },
            onLoad: this.props.imageOnloadCallback
              ? function (t) {
                  return s.mapSourceOnLoad(t.nativeEvent.source, module1120.shareViewLoadType.ONLOAD_CARPETMAP);
                }
              : null,
          }),
          l = React.default.createElement(module13.Image, {
            pointerEvents: 'none',
            style: t,
            source: {
              uri: n,
            },
            onLoad: this.props.imageOnloadCallback
              ? function (t) {
                  return s.mapSourceOnLoad(t.nativeEvent.source, module1120.shareViewLoadType.ONLOAD_CARPETMAP);
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
        if (!(this.props.mapElementShowFlag & module1120.MapElementShow.FLOOR_CARPET)) return null;
        var s = this.state.floorMap;
        return (null == s ? undefined : s.image) && '' != (null == s ? undefined : s.image)
          ? React.default.createElement(module1408, {
              pointerEvents: 'none',
              layerScaleFilter: 'Nearest',
              style: t,
              source: {
                uri: s.image,
              },
            })
          : null;
      },
    },
    {
      key: 'getFurnitureBubbleView',
      value: function () {
        var t;
        if (!(this.props.mapElementShowFlag & module1120.MapElementShow.FURNITURE)) return null;

        var s = this.furnitureArea && (null == (t = this.furnitureView) ? undefined : t.showFurnitureIcon(this.furnitureArea.type, this.furnitureArea.edited)),
          n = this._getFurnitureBubbleCenter(s),
          l = module23.default(n, 2),
          h = l[0],
          u = l[1];

        if (!h || !h.x || !h.y) return null;
        var p = !s && module381.RSM.isHomeButtonsEnabled();
        return React.default.createElement(module1204.ObjectNameBubble, {
          funcId: 'map_furniture_bubble',
          objectName: u,
          objectImage: p ? module1471 : module1470,
          objectLottie: p ? module1472 : null,
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
          s = this.state.smartBubbleType;
        if (!(this.props.mapElementShowFlag & module1120.MapElementShow.FLOOR_CARPET || (s != module1120.SmartBubbleType.BT_CARPET && s != module1120.SmartBubbleType.BT_DOORSILL)))
          return null;

        var n = this._getSmartZoneBubbleCenter(null == (t = this.smartZoneInfo) ? undefined : t.zoneArea);

        if ((s == module1120.SmartBubbleType.BT_CARPET && (n = this._getCarpetBubbleCenter()), !n || !n.x || !n.y)) return null;
        var o,
          l,
          h = module1120.SmartBubbleConfig[s].pageTitle;
        if (s == module1120.SmartBubbleType.BT_STUCK)
          h = (null == (o = this.smartZoneInfo) ? undefined : null == (l = o.zoneData) ? undefined : l.nearby)
            ? module510.map_ai_zone_bubble_adjust
            : module510.map_ai_zone_bubble_set;
        var u = s == module1120.SmartBubbleType.BT_CARPET ? Q.carpetBubbleImg : Q.smartBubbleImg;
        u = x(
          x({}, u),
          {},
          {
            tintColor: this.theme.bubble.tintColor,
          }
        );
        var p =
          s == module1120.SmartBubbleType.BT_CARPET
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
                style: Q.smartBubbleImg,
              };
        return React.default.createElement(module1204.ObjectNameBubble, {
          funcId: 'map_smart_zone_bubble_' + s,
          objectName: h,
          objectImage: module1120.SmartBubbleConfig[s].bubbleImg,
          imageStyle: u,
          gardienConfig: p,
          center: n,
          topOffset: s == module1120.SmartBubbleType.BT_CARPET ? 10 : 0,
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
      value: function (t, s, n) {
        if (this.props.mapMode == module1337.MAP_MODE_EASTER_EGG) return null;
        var o = null;
        if (this.state.pathGotoPlan && '' != this.state.pathGotoPlan)
          o = React.default.createElement(module1407.RRShape, {
            transform: 'android' != module13.Platform.OS || W ? n : null,
            stroke: this.color.pathGotoPlan,
            strokeWidth: 1,
            strokeDash: 'android' == module13.Platform.OS ? [5, 10] : [2, 2],
            d: this.state.pathGotoPlan,
          });
        var l = null;
        if (this.state.path && '' != this.state.path)
          l = React.default.createElement(module1407.RRShape, {
            transform: 'android' != module13.Platform.OS || W ? n : null,
            stroke: this.theme.map.pathColor,
            strokeWidth: 0.5,
            d: this.state.path,
          });
        var h = null;
        if (this.state.mopPath && '' != this.state.mopPath)
          h = React.default.createElement(module1407.RRShape, {
            transform: 'android' != module13.Platform.OS || W ? n : null,
            stroke: this.theme.map.mopPathColor,
            strokeWidth: 6.5,
            strokeOverlay: true,
            d: this.state.mopPath,
          });
        var u = null;
        if (this.state.backWashPath && '' != this.state.backWashPath)
          u = React.default.createElement(module1407.RRShape, {
            transform: 'android' != module13.Platform.OS || W ? n : null,
            stroke: this.theme.map.backWashPathColor,
            strokeWidth: 0.5,
            strokeCap: 'round',
            strokeDash: 'android' == module13.Platform.OS ? [0.5, 4] : [0.15, 1],
            d: this.state.backWashPath,
          });
        var p = null;
        if (this.state.pureCleanPath && '' != this.state.pureCleanPath)
          p = React.default.createElement(module1407.RRShape, {
            transform: 'android' != module13.Platform.OS || W ? n : null,
            stroke: this.theme.map.pureMopColor,
            strokeWidth: 0.5,
            d: this.state.pureCleanPath,
          });
        return React.default.createElement(
          z,
          {
            width: t,
            height: s,
            style: Q.pathContainer,
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
        var s = this;
        return module390.default.isShowCarpetEditEntrance() && this.props.mapElementShowFlag & module1120.MapElementShow.FLOOR_CARPET
          ? React.default.createElement(module1462.CarpetsView, {
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
              mapCarpetSaveEdit: this.props.mapCarpetSaveEdit,
            })
          : null;
      },
    },
    {
      key: 'getFurnitureView',
      value: function (t) {
        var s = this;
        return this.props.mapElementShowFlag & module1120.MapElementShow.FURNITURE &&
          (this.props.mapMode == module1337.MAP_MODE_FURNITURE_EDIT ||
            (this.props.showFurnitureOnly && !this.props.blockCanEdit) ||
            (this.props.mapMode != module1337.MAP_MODE_MAP_EDIT &&
              this.props.mapMode != module1337.MAP_MODE_GOTO_EDIT &&
              this.props.mapMode != module1337.MAP_MODE_EASTER_EGG &&
              !this.props.hideAccessory))
          ? React.default.createElement(module1462.FurnitureView, {
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
              showFurnitureIcon: this.props.showFurnitureIcon,
            })
          : null;
      },
    },
    {
      key: 'getHistoryMarkView',
      value: function (t) {
        var s = this;
        return this.props.parent.props.shouldShowRobotMovingAnimation
          ? React.default.createElement(module1462.HistoryMarkView, {
              ref: function (t) {
                return (s.historyMarkView = t);
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
        if (this.props.mapMode != module1337.MAP_MODE_EASTER_EGG) return null;
        if (!this.state.enemies || this.state.enemies.length <= 0) return null;
        var s = this.pixelOfElement(module1120.Config.size.objectsRadius),
          l = module23.default(s, 2),
          h = l[0],
          u = l[1];
        return this.state.enemies.map(function (s, o) {
          var l = module1333._convertToPixelPoint(s, t.state.transform);

          return !s.flag
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
                    source: require('./1475'),
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
        var s = this;
        return this.props.mapElementShowFlag & module1120.MapElementShow.FLOOR_CARPET &&
          (module390.default.isSupportSmartDoorSill() || module390.default.isSupportCustomDoorSill()) &&
          1 != this.props.parent.state.inBlockMode &&
          this.props.mapMode != module1337.MAP_MODE_CARPET_EDIT &&
          this.props.mapMode != module1337.MAP_MODE_MAP_EDIT
          ? React.default.createElement(module1462.DoorSillView, {
              ref: function (t) {
                return (s.doorSillView = t);
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
        var s = this;
        return (module390.default.isSupportStuckZone() || module390.default.isSupportSmartDoorSill()) &&
          1 != this.props.parent.state.inBlockMode &&
          this.props.mapMode == module1337.MAP_MODE_REGULAR
          ? React.default.createElement(module1462.AIObjectView, {
              ref: function (t) {
                return (s.aiObjectView = t);
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
          s = new Z({
            xx: this.state.transform.xx,
            yy: this.state.transform.yy,
          }),
          l = this.pixelOfElement(this.state.width, this.state.height),
          h = module23.default(l, 2),
          u = h[0],
          p = h[1];

        if (
          ((this.charging =
            (this.state.status === module381.RobotState.CHARGING ||
              this.state.status === module381.RobotState.FULL_CHARGE ||
              this.state.status === module381.RobotState.UPDATING ||
              this.state.status === module381.RobotState.COLLECTING_DUST ||
              this.state.status === module381.RobotState.WASHING_DUSTER) &&
            this.state.charger),
          (this.charger = this.state.charger
            ? module22.default(s.point(this.state.charger.x, this.state.charger.y), {
                angle: this.state.charger.angle,
              })
            : {
                x: 0,
                y: 0,
                angle: 0,
              }),
          (this.robot = u && p && this.state.robot ? s.point(this.state.robot.x, this.state.robot.y) : s.point(50, 50)),
          (this.robotAngle = u && p && this.state.robotAngle ? this.state.robotAngle : 0),
          this.charging && this.state.charger)
        ) {
          var c = this.state.status === module381.RobotState.WASHING_DUSTER ? 180 : 0;
          this.robotAngle = module1333.adjustChargerAngle(this.charger.angle) + module424.DMM.robotInMap.chargerAngle + c;
        }

        this.robotPos = (this.charging && this.charger) || this.robot;
        var v = module1120.Config.size.robotDiameter * this.state.transform.xx;

        if (this.charging && this.charger) {
          var y = {
            x: (v - 10) * (module381.RSM.isO0Dock() ? 0.5 : 0.25) * Math.cos(this.degreeToRad(-module1333.adjustChargerAngle(this.charger.angle))),
            y: 0.5 * (v - 10) * Math.sin(this.degreeToRad(-module1333.adjustChargerAngle(this.charger.angle))),
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
        this.mapObjectRefs = this.getMapObjects(s, C);

        var S = this.props.mapMode == module1337.MAP_MODE_REGULAR,
          _ = this.getCleanPath(u, p, s),
          O = this.getForbiddenView(s),
          D = this.getFloorMapView(w),
          T = this.getCarpetMapView(w),
          x = this.getCarpetEditView(s),
          B = this.props.mapMode == module1337.MAP_MODE_CARPET_EDIT,
          F = this.getFurnitureView(s),
          I = this.props.mapMode != module1337.MAP_MODE_MAP_EDIT,
          L = this.getDoorSillView(s),
          N = this.props.mapMode == module1337.MAP_MODE_DOORSILL_EDIT,
          j = this.getAIObjectView(s),
          z = !this.props.hideAccessory && this.props.mapMode != module1337.MAP_MODE_ZONED_CLEAN_EDIT && this.props.mapMode != module1337.MAP_MODE_BLOCK_CLEAN_EDIT && p > 10;

        if (!module390.default.SupportOverflowTouch()) this.mapRotatePadding = S ? 160 : 100 * this.state.transform.xx;
        var W = 'android' == module13.Platform.OS && this.props.mapPanStatus != module1120.PanStatus.MAP_VIEWING_NONE;
        return React.default.createElement(
          module13.View,
          {
            pointerEvents: W ? 'none' : 'box-none',
            style: [
              Q.container,
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
                  style: Q.mapContainer,
                },
                module391.default.getAccessibilityLabel('map_image_view')
              ),
              React.default.createElement(
                module1408,
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
                        return t.mapSourceOnLoad(s.nativeEvent.source, module1120.shareViewLoadType.ONLOAD_MAP);
                      }
                    : null,
                },
                R,
                D,
                T,
                !B && x,
                !N && L,
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
            !I && F,
            O,
            N && L,
            B && x,
            I && F,
            this.getCleanRect(s),
            React.default.createElement(module1473, {
              ref: function (s) {
                return (t.target = s);
              },
              transform: s,
              mapDeg: this.props.mapDeg,
              onLongPress: function () {
                t.props.parent.targetDroped = true;
              },
            }),
            S && C,
            this.getBlockBubbleView(),
            j,
            this.getBlockOperationView(s),
            this.state.showChargerBubble && this.getChargerBubbleView(),
            this.state.showFurnitureBubble && this.getFurnitureBubbleView(),
            this.state.showSmartZoneBubble && this.getSmartZoneBubbleView(),
            this.getChargerStatusAnimation(),
            this.getHistoryMarkView(s)
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
      key: 'getVisibleRectZones',
      value: function () {
        for (var t = [], s = 1; s <= module1120.MAX_COUNT_ZONE_RECT; s++) this.rectReferences[s] && this.rectReferences[s].state.visible && t.push(this.rectReferences[s]);

        if (t.length <= 0) return null;
        else {
          t.sort(function (t, s) {
            return t.state.serial - s.state.serial;
          });
          return t;
        }
      },
    },
    {
      key: 'clearRectFocus',
      value: function () {
        for (var t = 1; t <= module1120.MAX_COUNT_ZONE_RECT; t++) {
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
          var t = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : null, s = this._getVisibleZonesCount(this.rectReferences), n = 1;
          n <= module1120.MAX_COUNT_ZONE_RECT;
          n++
        )
          if (this.rectReferences[n] && 0 == this.rectReferences[n].state.visible && this.rectReferences[n].state.serial == s + 1) {
            var o,
              l = this.degreeToRad(-1 * this.props.mapDeg);
            t = t ? module1333._getRotateRect(t, -1 * this.props.mapDeg) : this._getDefaultMapZonesArea(n);
            if (!(null == (o = this.rectReferences[n])))
              o.setState({
                visible: true,
                rectSize: t,
                slopeAngle: l || 0,
              });

            this._setMapZonesFocus(this.rectReferences, n);

            if (this.props.parent.props.selectedRectDidChange) this.props.parent.props.selectedRectDidChange(s + 1);
            return true;
          }

        return false;
      },
    },
    {
      key: 'addRectangleArray',
      value: function (t) {
        if (!t || t.length <= 0) return false;
        t = t.filter(function (t) {
          return t && 'object' == typeof t;
        });
        if (module1120.MAX_COUNT_ZONE_RECT - s < t.length) t = t.splice(0, module1120.MAX_COUNT_ZONE_RECT - s);

        for (
          var s = this._getVisibleZonesCount(this.rectReferences), n = 0, o = false, l = this.degreeToRad(-1 * this.props.mapDeg), h = 1;
          h <= module1120.MAX_COUNT_ZONE_RECT;
          h++
        ) {
          if (this.rectReferences[h] && 0 == this.rectReferences[h].state.visible && this.rectReferences[h].state.serial == s + n + 1) {
            var u,
              p = t[n];
            if (!p) continue;
            p = module1333._getRotateRect(p, -1 * this.props.mapDeg);
            if (!(null == (u = this.rectReferences[h])))
              u.setState({
                visible: true,
                rectSize: p,
                slopeAngle: l || 0,
              });
            n++;
            o = true;
          }

          if (n >= t.length) break;
        }

        if (o && this.props.parent.props.selectedRectDidChange) this.props.parent.props.selectedRectDidChange(s + n);
        return o;
      },
    },
    {
      key: 'removeRectangle',
      value: function (t) {
        var s;

        if (this.rectReferences[t].state.visible) {
          for (var n = this._getVisibleZonesCount(this.rectReferences), o = 1; o <= module1120.MAX_COUNT_ZONE_RECT; o++) {
            var l;
            if (this.rectReferences[o] && this.rectReferences[o].state.visible && this.rectReferences[o].state.serial > this.rectReferences[t].state.serial)
              null == (l = this.rectReferences[o]) ||
                l.setState({
                  serial: this.rectReferences[o].state.serial - 1,
                });
          }

          if (!(null == (s = this.rectReferences[t])))
            s.setState({
              visible: false,
              isFocus: false,
              serial: n,
            });
          if (this.props.parent.props.selectedRectDidChange) this.props.parent.props.selectedRectDidChange(n - 1);
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
        for (var s = 1; s <= module1120.MAX_COUNT_ZONE_RECT; s++) {
          var n;
          if (!(null == (n = this.rectReferences[s])))
            n.setState({
              cleanMode: t,
            });
        }
      },
    },
    {
      key: 'updateRotateRects',
      value: function () {
        for (var t = 1; t <= module1120.MAX_COUNT_ZONE_RECT; t++) {
          var s;
          if (!(null == (s = this.rectReferences[t]))) s.updateRotateRects();
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
          var n,
            l = this._getDefaultWallPos(s),
            h = module23.default(l, 2),
            u = h[0],
            p = h[1];

          if (!(null == (n = this.forbiddenEditView))) n.addWall(s, u, p);
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
          n = null == (s = this.forbiddenEditView) ? undefined : s.getNewRectIndex(t);

        if (n > 0) {
          var o,
            l = this.degreeToRad(-1 * this.props.mapDeg),
            h = this._getDefaultMapZonesArea(n);

          if (!(null == (o = this.forbiddenEditView))) o.addFBZZones(n, h, l, t);
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
        var s,
          n = this.getRealRectForCarpet();
        return (
          !!n &&
          (this.isCarpetReachMaxNum(false)
            ? (globals.showToast(module510.map_edit_carpet_zone_exceed_limit), false)
            : (null == (s = this.carpetEditView) || s.addCarpetZones(n, 0, false), true))
        );
      },
    },
    {
      key: 'addCarpetEditZone',
      value: function (t) {
        var s,
          n = this._getDefaultMapZonesArea(),
          o = this.degreeToRad(-1 * this.props.mapDeg);

        if (!(null == (s = this.carpetEditView))) s.addCarpetZones(n, o, t);
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
        if (this.carpetArea) this.showSmartZoneBubble(module1120.SmartBubbleType.BT_CARPET);
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
      value: function (t, s) {
        this.setCarpetPos(t);
        this.carpetArea = this.getRealRectForCarpet();
        if (!this.carpetArea) this.carpetArea = this.getRectForCustomCarpet();

        if (this.carpetArea) {
          if (s && module390.default.isCarpetSupported()) this.showSmartZoneBubble(module1120.SmartBubbleType.BT_CARPET);
          if (this.props.mapMode == module1337.MAP_MODE_ZONED_CLEAN_EDIT && !this.addRectangle(this.carpetArea)) globals.showToast(module510.rubys_main_zone_max_tips);
        } else this.hideSmartZoneBubble();
      },
    },
    {
      key: 'hideChargerBubble',
      value: function () {
        var t = this;
        if (this.chargerTimer) module1414.clearTimeout(this.chargerTimer);
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
        var s = this,
          n = {};
        if (t && t.length)
          n = {
            chargerErrorText: t,
          };
        this.setState(
          x(
            {
              showChargerBubble: true,
            },
            n
          ),
          function () {
            module13.Animated.timing(s.chargerBubbleOpacity, {
              toValue: 1,
              duration: 500,
            }).start(function () {
              s.hideAllMapObjects();
              s.hideFurnitureBubble();
              s.hideSmartZoneBubble();
            });
          }
        );
        if (!(t && t.length)) this.chargerTimer = module1414.setTimeout(this.hideChargerBubble.bind(this), 5e3);
      },
    },
    {
      key: 'handleShowFurnitureBubble',
      value: function (t, s) {
        if (this.props.mapMode != module1337.MAP_MODE_ZONED_CLEAN_EDIT && !this._isGlobalTag()) return false;
        if (!this.state.furnitures || this.state.furnitures.length <= 0) return false;
        if (!(this.props.mapElementShowFlag & module1120.MapElementShow.FURNITURE)) return false;
        if (!this._isAvailablePosition(t, false)) return false;
        this.furnitureArea = null;

        for (var n = 0; n < this.state.furnitures.length; n++) {
          var o = this.state.furnitures[n];

          if (o && o.type != module1120.FurnitureType.FT_TOILET) {
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
          this.props.mapMode == module1337.MAP_MODE_ZONED_CLEAN_EDIT
            ? !(null == (h = this.furnitureView) ? undefined : h.showFurnitureIcon(this.furnitureArea.type, this.furnitureArea.edited)) &&
              !this.addRectangle(this.furnitureArea) &&
              globals.showToast(module510.rubys_main_zone_max_tips)
            : this._isGlobalTag() && s && this.showFurnitureBubble();
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
        if (this.furnitureTimer) module1414.clearTimeout(this.furnitureTimer);
        this.furnitureTimer = module1414.setTimeout(this.hideFurnitureBubble.bind(this), 5e3);
      },
    },
    {
      key: 'hideFurnitureBubble',
      value: function () {
        var t = this;
        if (this.furnitureTimer) module1414.clearTimeout(this.furnitureTimer);
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
        var s,
          n,
          o,
          l = null,
          h = false;
        if (t == module1120.SmartBubbleType.BT_CLIFF && (null == (s = this.state.cliffZones) ? undefined : s.length) > 0) l = this.state.cliffZones[0];
        else if (t == module1120.SmartBubbleType.BT_DOORSILL && (null == (n = this.state.doorSills) ? undefined : n.length) > 0) {
          var u = this.state.doorSills.findIndex(function (t) {
            return t.type == module1120.DoorSillType.SmartSill;
          });
          if (-1 != u) l = this.state.doorSills[u];
        } else if (t == module1120.SmartBubbleType.BT_STUCK && (null == (o = this.state.stuckPoints) ? undefined : o.length) > 0) {
          l = {
            rectSize: module1333._pointToStuckRect(this.state.stuckPoints[0]),
            slopeAngle: 0,
          };
          h = true;
        }

        if (l) {
          var p = module1333._getRotateMaxRectSize(l);

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
      value: function (t, s) {
        var n;
        if (!this._isGlobalTag() || !s) return false;
        if (!this._isAvailablePosition(t, false)) return false;

        var o = function (t) {
          return {
            x: t.x - 2,
            y: t.y - 2,
            width: t.width + 4,
            height: t.height + 4,
          };
        };

        if (((this.smartZoneInfo = null), (null == (n = this.state.cliffZones) ? undefined : n.length) > 0))
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
        if (this.smartZoneInfo) this.showSmartZoneBubble(module1120.SmartBubbleType.BT_CLIFF);
        else this.hideSmartZoneBubble();
        return null != this.smartZoneInfo;
      },
    },
    {
      key: 'showSmartZoneBubble',
      value: function (t) {
        var s = this;
        this.samrtZoneBubbleOpa.setValue(0);
        this.setState(
          {
            showSmartZoneBubble: true,
            smartBubbleType: t,
          },
          function () {
            module13.Animated.timing(s.samrtZoneBubbleOpa, {
              toValue: 1,
              duration: 500,
            }).start(function () {});
          }
        );
        if (this.smartBBTimer) module1414.clearTimeout(this.smartBBTimer);
        this.smartBBTimer = module1414.setTimeout(this.hideSmartZoneBubble.bind(this), 5e3);
      },
    },
    {
      key: 'hideSmartZoneBubble',
      value: function () {
        var t = this;
        if (this.smartBBTimer) module1414.clearTimeout(this.smartBBTimer);
        if (this.state.showSmartZoneBubble)
          module13.Animated.timing(this.samrtZoneBubbleOpa, {
            toValue: 0,
            duration: 200,
          }).start(function () {
            t.setState({
              showSmartZoneBubble: false,
              smartBubbleType: module1120.SmartBubbleType.BT_NONE,
            });
          });
      },
    },
    {
      key: '_checkTouchPosInZone',
      value: function (t, s) {
        var n = !(arguments.length > 2 && undefined !== arguments[2]) || arguments[2];
        if (!t || !t.rectSize) return null;
        var o = t.rectSize;
        if (!(o.x && o.y && o.width && o.height)) return null;

        var l = n ? module1333._getRotateMaxRectSize(t) : t.rectSize,
          h = module1333._convertToPixelRect(l, this.state.transform);

        return s.x >= h.x && s.x <= h.x + h.width && s.y >= h.y && s.y <= h.y + h.height ? l : null;
      },
    },
    {
      key: '_getCarpetBubbleCenter',
      value: function () {
        if (!this.carpetArea || !this.carpetArea.realX) return null;
        var t = this.props.mapMode != module1337.MAP_MODE_ZONED_CLEAN_EDIT ? this.carpetArea.realX : this.carpetArea.x,
          s = this.props.mapMode != module1337.MAP_MODE_ZONED_CLEAN_EDIT ? this.carpetArea.realY : this.carpetArea.y,
          n = this.props.mapMode != module1337.MAP_MODE_ZONED_CLEAN_EDIT ? this.carpetArea.realW : this.carpetArea.width,
          o = this.props.mapMode != module1337.MAP_MODE_ZONED_CLEAN_EDIT ? this.carpetArea.realH : this.carpetArea.height,
          l = this.carpetArea.x + this.carpetArea.width / 2,
          h = this.carpetArea.y + this.carpetArea.height / 2,
          u = {
            x: l,
            y: s,
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
                  y: s + o + 10,
                }
              : 270 === p || -90 === p
              ? {
                  x: t + n,
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
          s = (module1120.Config.size.robotRadius * (this.state.transform.yy || 1)) / 2,
          n = {
            x: s,
            y: s,
          };
        return module1333._getRectBubbleCenter(t, n, this.props.mapDeg);
      },
    },
    {
      key: '_getFurnitureBubbleCenter',
      value: function (t) {
        if (!this.furnitureArea || !this.furnitureArea.x || !this.furnitureArea.type) return [null, null];
        var s = module1120.getFurnitureName(this.furnitureArea.type, this.furnitureArea.subType),
          n = 180 == Math.abs(this.props.mapDeg) ? 1 : -0.5,
          o = this.furnitureArea.y + Math.floor(this.furnitureArea.height / 2 + n);
        if (t) o -= module1120.Config.size.objectsRadius / 2 + 2;
        return [
          {
            x: this.furnitureArea.x + Math.floor(this.furnitureArea.width / 2 + 0.5),
            y: o,
          },
          s,
        ];
      },
    },
    {
      key: '_getSmartZoneBubbleCenter',
      value: function (t) {
        if (!t || !t.x || !t.y) return null;
        var s = {
            x: t.width / 2,
            y: t.height / 2,
          },
          n = {
            x: t.x + s.x,
            y: t.y + s.y,
          };
        return module1333._getRectBubbleCenter(n, s, this.props.mapDeg);
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
        for (var s = 0, n = 1; n <= module1120.MAX_COUNT_WALL_OR_FBZ; n++) t[n] && t[n].state.visible && s++;

        return s;
      },
    },
    {
      key: '_setMapZonesFocus',
      value: function (t, s) {
        for (var n = 1; n <= module1120.MAX_COUNT_WALL_OR_FBZ; n++)
          n == s
            ? t[n] &&
              t[n].setState({
                isFocus: true,
              })
            : t[n] &&
              t[n].setState({
                isFocus: false,
              });
      },
    },
    {
      key: '_getDefaultMapZonesArea',
      value: function () {
        var t = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : -1,
          s = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : -1,
          n = arguments.length > 2 && undefined !== arguments[2] ? arguments[2] : -1,
          o = -1 == s ? module1120.DEFAULT_FBZ_REALHEIGHT : s * (this.state.transform.xx || 1),
          l = -1 == s ? this.justifyRealSize(o) : s,
          h = -1 == n ? this.justifyRealSize(module1120.DEFAULT_FBZ_REALWIDTH) : n,
          u = this.props.parent.getMapViewHeight() / 2;
        u -= o / 2;
        var p = -1 != t ? ((t - 1) * module1120.DEFAULT_RECT_MARGIN) / 2 : 0,
          c = {
            x: module1120.RectConfig.initSize.x + p,
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
      value: function (t, s) {
        var module22,
          o = this.state.transform.xx || 1,
          l = this.state.transform.yy || 1;

        if (this.isRotated()) {
          var h = {
              width: s.width * o,
              height: s.height * l,
            },
            u = {
              x: t.x + h.width / 2,
              y: t.y + h.height / 2,
            };
          module22 = {
            x: (module22 = this.props.parent._translateXY(u)).x / o - s.width / 2,
            y: module22.y / l - s.height / 2,
          };
        } else
          module22 = {
            x: (module22 = this.props.parent._translateXY(t)).x / o,
            y: module22.y / l,
          };

        var p = (this._getEdgeCheckPadding() - 35) / this.state.transform.xx - s.width / 2,
          c = {
            x: module22.x + s.width / 2,
            y: module22.y + s.height / 2,
          };
        c.x = (c.x ** (-1 * p)) ** (this.state.width + p);
        c.y = (c.y ** (-1 * p)) ** (this.state.height + p);
        module22 = {
          x: c.x - s.width / 2,
          y: c.y - s.height / 2,
        };
        return x(x({}, s), module22);
      },
    },
    {
      key: '_getFurnitureDefaultArea',
      value: function (t, s) {
        var n = arguments.length > 2 && undefined !== arguments[2] ? arguments[2] : null,
          l = module1120.getFurnitureEdge(t, s),
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
            x: (n ? n.x : module13.Dimensions.get('window').width / 2) - v / 2,
            y: (n ? n.y : this.props.parent.getMapViewHeight() / 2) - y / 2,
          };
        return this._convertDefaultZonesArea(R, w);
      },
    },
    {
      key: '_getDefaultWallPos',
      value: function (t) {
        var s = this.props.parent.getMapViewHeight() / 2,
          n = ((t - 1) * module1120.DEFAULT_RECT_MARGIN) / 2,
          o = {
            x: module1120.wallConfig.initSize.start_x + n,
            y: s + n,
          },
          l = this.justifyRealSize(module1120.DEFAULT_FBZ_REALWIDTH),
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
        return [x({}, h), p];
      },
    },
    {
      key: 'getCarpetRectByIndex',
      value: function () {
        if (-1 === this.state.carpetFirstIndex) return null;
        var t = this.state.carpetFirstIndex,
          s = this.convertIndexToPos(t),
          n = this.getMaxCarpetRect(s, t);
        return (
          n ||
          x(
            {
              width: this.justifyRealSize(module1120.DEFAULT_FBZ_REALWIDTH),
              height: this.justifyRealSize(module1120.DEFAULT_FBZ_REALHEIGHT),
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
        if (!(this.props.mapElementShowFlag & module1120.MapElementShow.FLOOR_CARPET)) return null;
        var t = this.carpetPos;
        if (!this._isAvailablePosition(t)) return null;
        var s = {
            x: Math.floor(t.x / this.state.transform.xx),
            y: Math.floor(t.y / this.state.transform.yy),
          },
          n = this.convertPosToIndex(s);
        if (this.state.carpetData && (n > this.state.carpetData.length - 1 || 0 == this.state.carpetData[n])) return null;
        var o = this.getMaxCarpetRect(s, n);
        return (
          o ||
          x(
            {
              width: this.justifyRealSize(module1120.DEFAULT_FBZ_REALWIDTH),
              height: this.justifyRealSize(module1120.DEFAULT_FBZ_REALHEIGHT),
            },
            s
          )
        );
      },
    },
    {
      key: 'getMaxCarpetRect',
      value: function (t, s) {
        var n = this,
          o = this.state.carpetData,
          l = new Array(o.length);
        module398.fill(l, 0);
        var h = [],
          u = t.x,
          p = t.x,
          c = t.y,
          f = t.y;
        l[s] = 1;
        h.push(t);

        for (
          var b = function () {
            var t = undefined,
              s = h.pop();
            p = s.x ** p;
            f = s.y ** f;
            u = s.x ** u;
            c = s.y ** c;
            var b = [];
            if (s.x > 0)
              b.push({
                x: s.x - 1,
                y: s.y,
              });
            if (s.x < n.state.width - 1)
              b.push({
                x: s.x + 1,
                y: s.y,
              });
            if (s.y > 0)
              b.push({
                x: s.x,
                y: s.y - 1,
              });
            if (s.y < n.state.height - 1)
              b.push({
                x: s.x,
                y: s.y + 1,
              });
            b.forEach(function (s) {
              t = n.convertPosToIndex(s);

              if (1 == o[t] && 0 == l[t]) {
                l[t] = 1;
                h.push(s);
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
        var s = t.width,
          n = t.height,
          o = [t.x, t.y],
          l = o[0],
          h = o[1];

        if (s + 6 < module1120.RectConfig.minLength) {
          l -= (module1120.RectConfig.minLength - s) / 2;
          s = module1120.RectConfig.minLength;
        } else {
          l -= 3;
          s += 6;
        }

        if (n + 6 < module1120.RectConfig.minLength) {
          h -= (module1120.RectConfig.minLength - n) / 2;
          n = module1120.RectConfig.minLength;
        } else {
          h -= 3;
          n += 6;
        }

        return {
          x: l,
          y: h,
          width: s,
          height: n,
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

        for (var s = 0; s < this.state.cusCarpetZones.length; s++) {
          var o = this.state.cusCarpetZones[s],
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
      value: function (t, s) {
        if (!this.isRotated()) {
          var n = module13.Dimensions.get('window').width,
            o = t && t.width ? t.width : 70;

          if (!s) {
            var l = module1333._convertToPixelRect(this.carpetArea, this.state.transform);

            if (!l || !l.x || !l.width) return;
            s = l.x + l.width / 2;
          }

          var h = this.props.parent._translateXYFromMap(
              {
                x: s,
                y: 0,
              },
              this.state.transform
            ),
            u = 0,
            p = (o + (n - o) ** 80) / 2;

          if (h.x < p) u = p - h.x;
          if (h.x > n - p) u = n - h.x - p;
          if (u) this.props.parent.moveMap(u, 0);
        }
      },
    },
    {
      key: 'moveMapToRectCenter',
      value: function (t) {
        var s;

        if (t) {
          var n = t.x + t.width / 2,
            l = t.y + t.height / 2,
            h = this.state.width / 2,
            u = this.state.height / 2,
            p = h - n,
            c = u - l;

          if (this.isRotated()) {
            var f = module1333._parseDegPoint(p, c, -1 * this.props.mapDeg),
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
          if (!(null == (s = this.props.parent) || null == s.moveMapTo)) s.moveMapTo(R, C);
        }
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
        return (s ** module1120.RectConfig.maxLength) ** module1120.RectConfig.minLength;
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
        var s = !(arguments.length > 1 && undefined !== arguments[1]) || arguments[1],
          n = this.pixelOfElement(this.state.width, this.state.height),
          l = module23.default(n, 2),
          h = l[0],
          u = l[1];
        return !(!h || !u) && (!s || !(t.x < 0 || t.y < 0 || t.x > h || t.y > u));
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
        for (var t = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : null, s = this.mapObjectRefs || [], n = 0; n < s.length; n++)
          (t && s[n].props.originX == t.originX && s[n].props.originY == t.originY) || s[n].hideBubble();
      },
    },
    {
      key: 'addFurniture',
      value: function (t, s) {
        var n,
          o = arguments.length > 2 && undefined !== arguments[2] ? arguments[2] : null,
          l = this.degreeToRad(-1 * this.props.mapDeg),
          h = this._getFurnitureDefaultArea(t, s, o);

        if (!(this.handleCheckAndroidOverflow(h, null, l, true) || null == (n = this.furnitureView))) n.addFurniture(t, s, h, l);
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
          s = null == (t = this.historyMarkView) ? undefined : t.getNewRectIndex();

        if (-1 != s) {
          if (s > 0) {
            var n,
              o = this.degreeToRad(-1 * this.props.mapDeg),
              l = this._getDefaultMapZonesArea(s);

            if (!(null == (n = this.historyMarkView))) n.addMarkZone(s, l, o);
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
        var s, n;

        if (null == (s = this.doorSillView) || !s.checkMaxCount()) {
          var o = this.degreeToRad(-1 * this.props.mapDeg),
            l = this._getDefaultMapZonesArea(1, t, module1120.DoorConfig.df_width);

          if (!(null == (n = this.doorSillView))) n.addDoorSill(l, o, t != module1120.DoorConfig.other_df_height);
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
  ]);
  return p;
})(React.default.Component);

exports.default = module1475;
module1475.contextType = module1193.AppConfigContext;
module1475.propTypes = {
  color: PropTypes.default.object,
  map: PropTypes.default.string,
  path: PropTypes.default.string,
  pathGotoPlan: PropTypes.default.string,
  mopPath: PropTypes.default.string,
  target: PropTypes.default.string,
  transform: PropTypes.default.objectOf(Z),
  imageOnloadCallback: PropTypes.default.bool,
  isCollectDustDock: PropTypes.default.bool,
  showDockBubbles: PropTypes.default.bool,
};
module1475.defaultProps = {
  isCollectDustDock: false,
  imageOnloadCallback: false,
  showDockBubbles: false,
  mapDeg: 0,
  mapPanStatus: module1120.PanStatus.MAP_VIEWING_NONE,
  blockSequenceList: [],
  onRectPanStart: function () {},
  onRectPanEnd: function () {},
};
var Q = module13.StyleSheet.create({
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
