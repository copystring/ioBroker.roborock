var module22 = require('./22'),
  module50 = require('./50'),
  module6 = require('./6'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1057 = require('./1057'),
  module1134 = require('./1134'),
  module1121 = require('./1121'),
  module419 = require('./419'),
  module1271 = require('./1271');

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

function E(t) {
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

var module1261 = require('./1261'),
  O = 2 * module1057.buttonConfig.rectBtn.size.width,
  x = (function (t) {
    module7.default(x, t);

    var module50 = x,
      module1121 = T(),
      w = function () {
        var t,
          n = module11.default(module50);

        if (module1121) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, s);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function x(t) {
      var n;
      module4.default(this, x);

      (n = w.call(this, t)).updateRect = function (t) {
        var o = E(E({}, n.state.rectSize), t);
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
        if (!(null == n.props.handlePanStart)) n.props.handlePanStart(n.state.id, t == module1134.RectPanType.PanTypeMove);
      };

      n.onTouchEnd = function (t) {
        if (!(null == n.props.handlePanEnd)) n.props.handlePanEnd(module6.default(n), t != module1134.RectPanType.PanTypeRotate);
      };

      n.state = {
        id: n.props.id,
        serial: n.props.id || 1,
        visible: module1057.RectConfig.visible,
        isFocus: module1057.RectConfig.isFocus,
        rectSize: module1057.RectConfig.initSize,
        slopeAngle: 0,
        cleanMode: 0,
      };
      return n;
    }

    module5.default(x, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          var t = this;
          this.panResponderDelete = module12.PanResponder.create({
            onStartShouldSetPanResponder: function () {
              return true;
            },
            onMoveShouldSetPanResponder: function () {
              return true;
            },
            onPanResponderEnd: function (n, o) {
              if (0 === n.nativeEvent.touches.length) t.props.parent.removeRectangle(t.state.id);
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
          this.areaUnitListener = module12.DeviceEventEmitter.addListener(module419.NotificationKeys.AreaUnitChange, function (n) {
            t.forceUpdate();
          });
          this.panProxy = new module1134.PanResponderProxy(module1134.RectPanType.PanTypeMove | module1134.RectPanType.PanTypeScale);
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
          return !module1261.objectShallowEqual(this.props, t, true) || !module1261.objectShallowEqual(this.state, n, true);
        },
      },
      {
        key: 'reInitRender',
        value: function (t) {
          this.setState({
            serial: t,
            id: t,
            visible: module1057.RectConfig.visible,
            rectSize: module1057.RectConfig.initSize,
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
              o = module1261._getRotateRect(o, n);
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
          if (!this.state.visible || (3 != this.state.cleanMode && 4 != this.state.cleanMode)) return React.default.createElement(module12.View, null);

          var t = this.context.theme.displayZones,
            o = module1261._convertToPixelRect(this.state.rectSize, this.props.transform);

          if (!o || isNaN(o.x) || isNaN(o.y) || isNaN(o.width) || isNaN(o.height)) return null;
          var s = o.width + 2 * O,
            l = o.height + 2 * O,
            c = this.state.isFocus
              ? {}
              : {
                  bottom: module1057.buttonConfig.rectBtn.size.height + 13,
                },
            u = 4 != this.state.cleanMode,
            p = module1271.default.zoneAreaView(o.width, this.state.rectSize, true, this.state.serial, c),
            h = module1271.default.zoneFocusBorderView(o.width, o.height, O),
            R = module1271.default.zoneDeleteButton('clean_rect_edit_delete', this.panResponderDelete, O),
            P = module1271.default.zoneScaleButton(o, 'clean_rect_edit_scale', this.panProxy.panResponderScale, O),
            S = module1271.default.zoneDragButtonView(o.height, this.panProxy.panResponder),
            w = (((module12.I18nManager.isRTL ? -1 : 1) * this.state.slopeAngle * 180) / Math.PI).toString() + 'deg';
          return React.default.createElement(
            module12.View,
            {
              pointerEvents: 3 == this.state.cleanMode ? 'box-none' : 'none',
              style: {
                position: 'absolute',
                left: o.x - O,
                top: o.y - O,
                width: s,
                height: l,
                overflow: 'visible',
                transform: [
                  {
                    rotate: w,
                  },
                  {
                    translateX: 0,
                  },
                ],
                zIndex: this.state.isFocus ? 1 : 0,
                elevation: this.state.isFocus ? 1 : 0,
              },
            },
            React.default.createElement(
              module12.View,
              {
                pointerEvents: 'box-none',
                style: {
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: s,
                  height: l,
                  overflow: 'visible',
                },
              },
              React.default.createElement(
                module12.View,
                module22.default({}, this.panProxy.panResponder.panHandlers, {
                  pointerEvents: 3 == this.state.cleanMode ? 'auto' : 'none',
                  style: {
                    position: 'absolute',
                    left: O,
                    top: O,
                    width: o.width,
                    height: o.height,
                    overflow: 'visible',
                    backgroundColor: t.cleanRectColor,
                    borderColor: t.cleanRectBorderColor,
                    borderWidth: 2,
                  },
                })
              ),
              this.state.isFocus && h,
              u && p,
              this.state.isFocus && R,
              this.state.isFocus && P,
              this.state.isFocus && S
            )
          );
        },
      },
    ]);
    return x;
  })(React.default.Component);

exports.default = x;
x.contextType = module1121.AppConfigContext;
x.defaultProps = {
  transform: {
    xx: 1,
    yy: 1,
  },
  mapDeg: 0,
};
