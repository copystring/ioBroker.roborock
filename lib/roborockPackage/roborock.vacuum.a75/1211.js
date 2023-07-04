var module22 = require('./22'),
  module50 = require('./50'),
  module6 = require('./6'),
  module8 = require('./8'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1126 = require('./1126'),
  module1212 = require('./1212'),
  module1199 = require('./1199'),
  module420 = require('./420'),
  module1349 = require('./1349');

function w(t, n) {
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

function C(t) {
  for (var n = 1; n < arguments.length; n++) {
    var s = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      w(Object(s), true).forEach(function (n) {
        module50.default(t, n, s[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      w(Object(s)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(s, n));
      });
  }

  return t;
}

function T() {
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

var module1339 = require('./1339'),
  z = 2 * module1126.buttonConfig.rectBtn.size.width,
  O = (function (t) {
    module9.default(O, t);

    var module50 = O,
      module1199 = T(),
      w = function () {
        var t,
          n = module12.default(module50);

        if (module1199) {
          var s = module12.default(this).constructor;
          t = Reflect.construct(n, arguments, s);
        } else t = n.apply(this, arguments);

        return module11.default(this, t);
      };

    function O(t) {
      var n;
      module6.default(this, O);

      (n = w.call(this, t)).updateRect = function (t) {
        var o = C(C({}, n.state.rectSize), t);
        if (!(null != n.props.checkAndroidOverflow && n.props.checkAndroidOverflow(o, null, n.state.slopeAngle)))
          n.setState({
            rectSize: o,
          });
      };

      n.getInfo = function () {
        return {
          rectSize: n.state.rectSize,
          slopeAngle: n.state.slopeAngle,
          mapDeg: n.props.mapDeg,
          trans: n.props.transform,
        };
      };

      n.onShouldTwoFinger = function () {
        return true;
      };

      n.onTouchStart = function (t) {
        if (!(null == n.props.handlePanStart)) n.props.handlePanStart(n.state.id, t == module1212.RectPanType.PanTypeMove, n.props.type);
      };

      n.onTouchEnd = function (t) {
        if (!(null == n.props.handlePanEnd)) n.props.handlePanEnd(module8.default(n), t != module1212.RectPanType.PanTypeRotate);
      };

      n.state = {
        id: n.props.id,
        serial: n.props.id || 1,
        visible: module1126.RectConfig.visible,
        isFocus: module1126.RectConfig.isFocus,
        rectSize: module1126.RectConfig.initSize,
        slopeAngle: 0,
        shouldHide: false,
        enable: true,
      };
      return n;
    }

    module7.default(O, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          var t = this;
          this.panResponderDelete = module13.PanResponder.create({
            onStartShouldSetPanResponder: function () {
              return true;
            },
            onMoveShouldSetPanResponder: function () {
              return true;
            },
            onPanResponderEnd: function (n, o) {
              if (0 === n.nativeEvent.touches.length) t.props.parent.removeRectangle(t.state.id, t.props.type);
            },
            onPanResponderTerminationRequest: function (t, n) {
              return false;
            },
          });
        },
      },
      {
        key: 'componentDidMount',
        value: function () {
          var t = this;
          this.areaUnitListener = module13.DeviceEventEmitter.addListener(module420.NotificationKeys.AreaUnitChange, function (n) {
            t.forceUpdate();
          });
          this.panProxy = new module1212.PanResponderProxy(module1212.RectPanType.PanTypeMove | module1212.RectPanType.PanTypeScale);
          this.panProxy.registerPanResponder({
            updateRect: this.updateRect,
            getInfo: this.getInfo,
            onShouldTwoFinger: this.onShouldTwoFinger,
            onTouchStart: this.onTouchStart,
            onTouchEnd: this.onTouchEnd,
          });
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          if (this.areaUnitListener) this.areaUnitListener.remove();
        },
      },
      {
        key: 'shouldComponentUpdate',
        value: function (t, n) {
          return !module1339.objectShallowEqual(this.props, t, true) || !module1339.objectShallowEqual(this.state, n, true);
        },
      },
      {
        key: 'reInitRender',
        value: function (t) {
          this.setState({
            serial: t,
            id: t,
            visible: module1126.RectConfig.visible,
            rectSize: module1126.RectConfig.initSize,
            enable: true,
          });
        },
      },
      {
        key: 'updateRotateRects',
        value: function () {
          if (this.state.visible) {
            var t = (180 * this.state.slopeAngle) / Math.PI,
              n = -1 * this.props.mapDeg - t;

            if (n) {
              var o = this.state.rectSize;
              o = module1339._getRotateRect(o, n);
              this.setState({
                rectSize: o,
                slopeAngle: (this.props.mapDeg * Math.PI) / -180,
              });
            }
          }
        },
      },
      {
        key: 'render',
        value: function () {
          if (!this.state.visible || this.state.shouldHide) return React.default.createElement(module13.View, null);

          var t = module1339._convertToPixelRect(this.state.rectSize, this.props.transform);

          if (!t || isNaN(t.x) || isNaN(t.y) || isNaN(t.width) || isNaN(t.height)) return null;
          var o = t.width + 2 * z,
            s = t.height + 2 * z,
            l = this.isFocus
              ? {}
              : {
                  bottom: module1126.buttonConfig.rectBtn.size.height + 13,
                },
            c = module1349.default.zoneAreaView(t.width, this.state.rectSize, true, this.state.serial, l),
            u = module1349.default.zoneFocusBorderView(t.width, t.height, z),
            p = module1349.default.zoneDeleteButton('clean_rect_edit_delete', this.panResponderDelete, z),
            h = module1349.default.zoneScaleButton(t, 'clean_rect_edit_scale', this.panProxy.panResponderScale, z),
            b = module1349.default.zoneDragButtonView(t.height, this.panProxy.panResponder),
            R = (((module13.I18nManager.isRTL ? -1 : 1) * this.state.slopeAngle * 180) / Math.PI).toString() + 'deg';
          return React.default.createElement(
            module13.View,
            {
              pointerEvents: this.state.enable ? 'box-none' : 'none',
              style: {
                position: 'absolute',
                left: t.x - z,
                top: t.y - z,
                width: o,
                height: s,
                overflow: 'visible',
                transform: [
                  {
                    rotate: R,
                  },
                  {
                    translateX: 0,
                  },
                ],
                zIndex: this.isFocus ? 1 : 0,
                elevation: this.isFocus ? 1 : 0,
              },
            },
            React.default.createElement(
              module13.View,
              {
                pointerEvents: 'box-none',
                style: {
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: o,
                  height: s,
                  overflow: 'visible',
                },
              },
              React.default.createElement(
                module13.View,
                module22.default({}, this.panProxy.panResponder.panHandlers, {
                  pointerEvents: this.state.enable ? 'auto' : 'none',
                  style: {
                    position: 'absolute',
                    left: z,
                    top: z,
                    width: t.width,
                    height: t.height,
                    overflow: 'visible',
                    backgroundColor: this.rectColor,
                    borderColor: this.borderColor,
                    borderWidth: 2,
                  },
                })
              ),
              this.isFocus && u,
              this.state.enable && c,
              this.isFocus && p,
              this.isFocus && h,
              this.isFocus && b
            )
          );
        },
      },
      {
        key: 'theme',
        get: function () {
          return this.context.theme.displayZones;
        },
      },
      {
        key: 'isNormal',
        get: function () {
          return this.props.type == module1126.CleanRectType.Normal;
        },
      },
      {
        key: 'isFocus',
        get: function () {
          return this.state.isFocus;
        },
      },
      {
        key: 'borderColor',
        get: function () {
          return this.isNormal ? this.theme.cleanRectBorderColor : this.theme.mopFBZBorderColor;
        },
      },
      {
        key: 'rectColor',
        get: function () {
          return this.isNormal ? this.theme.cleanRectColor : this.theme.mopFBZColor;
        },
      },
    ]);
    return O;
  })(React.default.Component);

exports.default = O;
O.contextType = module1199.AppConfigContext;
O.defaultProps = {
  transform: {
    xx: 1,
    yy: 1,
  },
  mapDeg: 0,
  type: module1126.CleanRectType.Normal,
};
