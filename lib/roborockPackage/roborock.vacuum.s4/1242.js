var module21 = require('./21'),
  module49 = require('./49'),
  module4 = require('./4'),
  module5 = require('./5'),
  module6 = require('./6'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1235 = require('./1235'),
  module1243 = require('./1243'),
  module1256 = require('./1256'),
  module506 = require('./506'),
  module387 = require('./387'),
  module411 = require('./411');

function E(t, n) {
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

function P(t) {
  for (var n = 1; n < arguments.length; n++) {
    var s = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      E(Object(s), true).forEach(function (n) {
        module49.default(t, n, s[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      E(Object(s)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(s, n));
      });
  }

  return t;
}

function x() {
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

var module1247 = require('./1247'),
  z = 2 * module1235.buttonConfig.rectDelete.size.width,
  D = z / 2 - module1235.buttonConfig.rectOperateBoarderDis,
  T = z / 2,
  V = (function (t) {
    module7.default(V, t);

    var module49 = V,
      module506 = x(),
      E = function () {
        var t,
          n = module11.default(module49);

        if (module506) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, s);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function V(t) {
      var n;
      module4.default(this, V);

      (n = E.call(this, t)).updateRect = function (t) {
        var o = P(P({}, n.state.rectSize), t);
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

      n.onTouchStart = function () {
        if (!(null == n.props.handlePanStart)) n.props.handlePanStart(n.state.id);
      };

      n.onTouchEnd = function () {
        var t = !(arguments.length > 0 && undefined !== arguments[0]) || arguments[0];
        if (!(null == n.props.handlePanEnd)) n.props.handlePanEnd(module6.default(n), t);
      };

      n.state = {
        id: n.props.id,
        serial: n.props.id || 1,
        visible: module1235.RectConfig.visible,
        isFocus: module1235.RectConfig.isFocus,
        rectSize: module1235.RectConfig.initSize,
        slopeAngle: 0,
        cleanMode: 0,
      };
      return n;
    }

    module5.default(V, [
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
          this.areaUnitListener = module12.DeviceEventEmitter.addListener(module411.NotificationKeys.AreaUnitChange, function (n) {
            t.forceUpdate();
          });
          this.panProxy = new module1243.PanResponderProxy(module1243.RectPanType.PanTypeMove | module1243.RectPanType.PanTypeScale);
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
          return !module1247.objectShallowEqual(this.props, t, true) || !module1247.objectShallowEqual(this.state, n, true);
        },
      },
      {
        key: 'reInitRender',
        value: function (t) {
          this.setState({
            serial: t,
            id: t,
            visible: module1235.RectConfig.visible,
            rectSize: module1235.RectConfig.initSize,
          });
        },
      },
      {
        key: 'getFocusBorderView',
        value: function (t, n) {
          var o = this,
            s = this.context.theme.displayZones;
          return this.state.isFocus
            ? React.default.createElement(module12.View, {
                pointerEvents: 'none',
                ref: function (t) {
                  o.fbzfocusView = t;
                },
                style: {
                  position: 'absolute',
                  left: z / 2 - module1235.buttonConfig.rectOperateBoarderDis - 1,
                  top: z / 2 - module1235.buttonConfig.rectOperateBoarderDis - 1,
                  width: t + 2 * module1235.buttonConfig.rectOperateBoarderDis + 1,
                  height: n + 2 * module1235.buttonConfig.rectOperateBoarderDis + 1,
                  overflow: 'visible',
                  backgroundColor: 'transparent',
                  borderColor: s.focusViewColor,
                  borderWidth: 2,
                  borderStyle: 'dashed',
                  borderRadius: 'android' === module12.Platform.OS ? 5 : 0,
                },
              })
            : React.default.createElement(module12.View, null);
        },
      },
      {
        key: 'render',
        value: function () {
          if (!this.state.visible || (3 != this.state.cleanMode && 4 != this.state.cleanMode)) return React.default.createElement(module12.View, null);

          var t = this.context.theme.displayZones,
            o = module1247._convertToPixelRect(this.state.rectSize, this.props.transform);

          if (!o || isNaN(o.x) || isNaN(o.y) || isNaN(o.width) || isNaN(o.height)) return null;
          var s = o.width + z,
            l = o.height + z,
            c = this.state.isFocus ? D : T,
            u = this.state.isFocus ? 0 : 15,
            f = 4 != this.state.cleanMode,
            h = f
              ? React.default.createElement(
                  module12.View,
                  {
                    pointerEvents: 'none',
                    style: [
                      F.serialView,
                      {
                        left: c,
                        bottom: u,
                      },
                    ],
                  },
                  React.default.createElement(
                    module12.Text,
                    {
                      style: [
                        F.areaText,
                        {
                          color: t.areaTextColor,
                        },
                      ],
                    },
                    this.state.serial
                  )
                )
              : React.default.createElement(module12.View, null),
            w = 0.05 * this.state.rectSize.width,
            S = 0.05 * this.state.rectSize.height,
            R =
              o.width > 70
                ? module387.default.lengthConvert(w).toFixed(1) +
                  module387.default.getLengthUnit() +
                  ' x ' +
                  module387.default.lengthConvert(S).toFixed(1) +
                  module387.default.getLengthUnit()
                : module387.default.areaConvert(w * S).toFixed(1) + module387.default.getAreaUnit(),
            E = f
              ? React.default.createElement(
                  module12.View,
                  {
                    pointerEvents: 'none',
                    style: [
                      F.areaView,
                      {
                        left: c + 11,
                        bottom: u,
                      },
                    ],
                  },
                  React.default.createElement(
                    module12.Text,
                    {
                      numberOfLines: 1,
                      style: [
                        F.areaText,
                        {
                          color: t.areaTextColor,
                        },
                      ],
                    },
                    R
                  )
                )
              : React.default.createElement(module12.View, null),
            P = this.state.isFocus
              ? React.default.createElement(module1256.RectButton, {
                  funcId: 'clean_rect_edit_delete',
                  panResponder: this.panResponderDelete,
                  left: z / 2 - (1.5 * module1235.buttonConfig.rectDelete.size.width) / 2 - module1235.buttonConfig.rectOperateBoarderDis,
                  top: z / 2 - (1.5 * module1235.buttonConfig.rectDelete.size.height) / 2 + 1 - module1235.buttonConfig.rectOperateBoarderDis,
                  width: module1235.buttonConfig.rectDelete.size.width,
                  height: module1235.buttonConfig.rectDelete.size.height,
                  imageSource: t.deleteImg,
                })
              : React.default.createElement(module12.View, null),
            x = this.state.isFocus
              ? React.default.createElement(module1256.RectButton, {
                  funcId: 'clean_rect_edit_scale',
                  panResponder: this.panProxy.panResponderScale,
                  left: o.width - (1.5 * module1235.buttonConfig.rectScale.size.width) / 2 - 1 + z / 2 + module1235.buttonConfig.rectOperateBoarderDis,
                  top: o.height - (1.5 * module1235.buttonConfig.rectScale.size.height) / 2 - 2 + z / 2 + module1235.buttonConfig.rectOperateBoarderDis,
                  width: module1235.buttonConfig.rectScale.size.width,
                  height: module1235.buttonConfig.rectScale.size.height,
                  imageSource: t.scaleImg,
                })
              : React.default.createElement(module12.View, null),
            V = (((module12.I18nManager.isRTL ? -1 : 1) * this.state.slopeAngle * 180) / Math.PI).toString() + 'deg';
          return React.default.createElement(
            module12.View,
            {
              pointerEvents: 3 == this.state.cleanMode ? 'box-none' : 'none',
              style: {
                position: 'absolute',
                left: o.x - z / 2,
                top: o.y - z / 2,
                width: s,
                height: l,
                overflow: 'visible',
                transform: [
                  {
                    rotate: V,
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
                module21.default({}, this.panProxy.panResponder.panHandlers, {
                  pointerEvents: 3 == this.state.cleanMode ? 'auto' : 'none',
                  style: {
                    position: 'absolute',
                    left: z / 2,
                    top: z / 2,
                    width: o.width,
                    height: o.height,
                    overflow: 'visible',
                    backgroundColor: t.cleanRectColor,
                    borderColor: t.cleanRectBorderColor,
                    borderWidth: 2,
                  },
                })
              ),
              this.getFocusBorderView(o.width, o.height),
              h,
              E,
              P,
              x
            )
          );
        },
      },
    ]);
    return V;
  })(React.default.Component);

exports.default = V;
V.contextType = module506.AppConfigContext;
V.defaultProps = {
  transform: {
    xx: 1,
    yy: 1,
  },
  mapDeg: 0,
};
var F = module12.StyleSheet.create({
  areaText: {
    color: module1235.buttonConfig.areaTextColor,
    fontSize: 10,
  },
  areaView: {
    position: 'absolute',
    left: D + 11,
    bottom: 0,
    width: 90,
    height: module1235.buttonConfig.rectSerial.size.height,
    overflow: 'visible',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  serialView: {
    position: 'absolute',
    left: D,
    bottom: 0,
    width: module1235.buttonConfig.rectSerial.size.width,
    height: module1235.buttonConfig.rectSerial.size.height,
    overflow: 'visible',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});
