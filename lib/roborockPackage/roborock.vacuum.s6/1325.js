var module21 = require('./21'),
  module49 = require('./49'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1069 = require('./1069'),
  module1256 = require('./1256'),
  module1243 = require('./1243'),
  module1235 = require('./1235'),
  module506 = require('./506');

function R(t, o) {
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
    var s = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      R(Object(s), true).forEach(function (o) {
        module49.default(t, o, s[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      R(Object(s)).forEach(function (o) {
        Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(s, o));
      });
  }

  return t;
}

function C() {
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
  z = module1235.buttonConfig.rectScale.size.width,
  D = module1235.buttonConfig.rectScale.size.width,
  E = (function (t) {
    module7.default(E, t);

    var module49 = E,
      module506 = C(),
      R = function () {
        var t,
          o = module11.default(module49);

        if (module506) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, s);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function E(t) {
      var o;
      module4.default(this, E);

      (o = R.call(this, t)).updateRect = function (t) {
        var n = O(O({}, o.props.rectSize), t);
        if (!((null != o.props.checkAndroidOverflow && o.props.checkAndroidOverflow(n, null, o.props.slopeAngle, true)) || null == o.props.handleUpdateRect))
          o.props.handleUpdateRect(o.props.id, n);
      };

      o.updateAngle = function (t) {
        if (!((null != o.props.checkAndroidOverflow && o.props.checkAndroidOverflow(o.props.rectSize, null, t, true)) || null == o.props.handleUpdateAngle))
          o.props.handleUpdateAngle(o.props.id, t);
      };

      o.getInfo = function () {
        return {
          rectSize: o.props.rectSize,
          slopeAngle: o.props.slopeAngle,
          mapDeg: o.props.mapDeg,
          trans: o.props.transform,
          edgeSize: o.edgeSize,
        };
      };

      o.onShouldStart = function () {
        return null == o.props.handlePanOnShouldStart ? undefined : o.props.handlePanOnShouldStart(o.props.id);
      };

      o.onTouchStart = function () {
        if (!(null == o.props.handlePanStart)) o.props.handlePanStart(o.props.id);
      };

      o.edgeSize = module1235.FurnitureSize[t.type];
      return o;
    }

    module5.default(E, [
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
            onPanResponderEnd: function (o, n) {
              if (0 === o.nativeEvent.touches.length) null == t.props.handleFBZoneRemove || t.props.handleFBZoneRemove(t.props.id);
            },
            onPanResponderTerminationRequest: function (t, o) {
              return false;
            },
          });
          this.panProxy = new module1243.PanResponderProxy(module1243.RectPanType.PanTypeMove | module1243.RectPanType.PanTypeScale | module1243.RectPanType.PanTypeRotate);
          this.panProxy.registerPanResponder({
            updateAngle: this.updateAngle,
            updateRect: this.updateRect,
            getInfo: this.getInfo,
            onShouldStart: this.onShouldStart,
            onTouchStart: this.onTouchStart,
            onTouchEnd: this.onTouchEnd,
          });
        },
      },
      {
        key: 'UNSAFE_componentWillReceiveProps',
        value: function (t) {
          if (t.type != this.props.type) this.edgeSize = module1235.FurnitureSize[t.type];
        },
      },
      {
        key: 'shouldComponentUpdate',
        value: function (t, o) {
          return !module1247.objectShallowEqual(this.props, t, true) || !module1247.objectShallowEqual(this.state, o, true);
        },
      },
      {
        key: '_getFurnitureImage',
        value: function () {
          var t = null;
          if (module1235.FurnitureResource[this.props.type]) t = module1235.FurnitureResource[this.props.type].image;
          return t;
        },
      },
      {
        key: 'getFocusBorderView',
        value: function (t, o) {
          var n = this,
            s = 'android' === module12.Platform.OS ? 5 : 0;
          return this.props.isFocus
            ? React.default.createElement(module12.View, {
                pointerEvents: 'none',
                ref: function (t) {
                  n.fbzfocusView = t;
                },
                style: {
                  position: 'absolute',
                  left: D + z - module1235.buttonConfig.rectOperateBoarderDis - 1,
                  top: z - module1235.buttonConfig.rectOperateBoarderDis - 1,
                  width: t + 2 * module1235.buttonConfig.rectOperateBoarderDis + 1,
                  height: o + 2 * module1235.buttonConfig.rectOperateBoarderDis + 1,
                  overflow: 'visible',
                  backgroundColor: 'transparent',
                  borderColor: globals.app.state.theme.displayZones.focusViewColor,
                  borderWidth: 2,
                  borderStyle: 'dashed',
                  borderRadius: s,
                },
              })
            : React.default.createElement(module12.View, null);
        },
      },
      {
        key: 'getDragButtonView',
        value: function (t) {
          if (!this.props.isFocus) return null;
          var n = D + z - module1235.buttonConfig.rectOperateBoarderDis + 1,
            s = z + t + module1235.buttonConfig.rectOperateBoarderDis - 1,
            u = D / 2 + z - module1235.buttonConfig.rectOperateBoarderDis + 1;
          return React.default.createElement(
            module12.View,
            module21.default(
              {
                pointerEvents: 'auto',
              },
              this.panProxy.panResponder.panHandlers,
              {
                style: [
                  F.dragView,
                  {
                    top: s,
                    width: n,
                    height: n,
                  },
                ],
              }
            ),
            React.default.createElement(
              module1069.Svg,
              {
                left: D / 2,
                top: 0,
                width: u,
                height: u,
              },
              React.default.createElement(module1069.Line, {
                x1: u,
                y1: 0,
                x2: 0,
                y2: u,
                stroke: globals.app.state.theme.displayZones.focusViewColor,
                strokeWidth: 2,
              })
            ),
            React.default.createElement(module1256.RectButton, {
              funcId: 'furniture_rect_edit_drag',
              left: 0,
              top: n - 1.5 * D,
              width: module1235.buttonConfig.rectRotate.size.width,
              height: module1235.buttonConfig.rectRotate.size.height,
              imageSource: globals.app.state.theme.displayZones.dragImg,
            })
          );
        },
      },
      {
        key: 'render',
        value: function () {
          if (this.props.type == module1235.FurnitureType.FT_NONE) return React.default.createElement(module12.View, null);

          var t = this.context.theme.displayZones,
            n = module1247._convertToPixelRect(this.props.rectSize, this.props.transform);

          if (!n || isNaN(n.x) || isNaN(n.y) || isNaN(n.width) || isNaN(n.height)) return null;
          var s = n.width + 2 * z + D,
            u = n.height + 2 * z + D,
            p =
              (this.props.isFocus &&
                React.default.createElement(module1256.RectButton, {
                  funcId: 'furniture_rect_edit_delete',
                  panResponder: this.panResponderDelete,
                  left: D + z - (1.5 * module1235.buttonConfig.rectDelete.size.width) / 2 - module1235.buttonConfig.rectOperateBoarderDis,
                  top: z - (1.5 * module1235.buttonConfig.rectDelete.size.height) / 2 + 1 - module1235.buttonConfig.rectOperateBoarderDis,
                  width: module1235.buttonConfig.rectDelete.size.width,
                  height: module1235.buttonConfig.rectDelete.size.height,
                  imageSource: t.deleteImg,
                })) ||
              null,
            l =
              (this.props.isFocus &&
                React.default.createElement(module1256.RectButton, {
                  funcId: 'furniture_rect_edit_scale',
                  panResponder: this.panProxy.panResponderScale,
                  left: n.width + D + z - (1.5 * module1235.buttonConfig.rectScale.size.width) / 2 - 1 + module1235.buttonConfig.rectOperateBoarderDis,
                  top: n.height + z - (1.5 * module1235.buttonConfig.rectScale.size.height) / 2 - 2 + module1235.buttonConfig.rectOperateBoarderDis,
                  width: module1235.buttonConfig.rectScale.size.width,
                  height: module1235.buttonConfig.rectScale.size.height,
                  imageSource: t.scaleImg,
                })) ||
              null,
            c =
              (this.props.isFocus &&
                React.default.createElement(module1256.RectButton, {
                  funcId: 'furniture_rect_edit_rotate',
                  panResponder: this.panProxy.panResponderRotate,
                  left: n.width + D + z - (1.5 * module1235.buttonConfig.rectRotate.size.width) / 2 - 1 + module1235.buttonConfig.rectOperateBoarderDis,
                  top: z - (1.5 * module1235.buttonConfig.rectRotate.size.height) / 2 + 1 - module1235.buttonConfig.rectOperateBoarderDis,
                  width: module1235.buttonConfig.rectRotate.size.width,
                  height: module1235.buttonConfig.rectRotate.size.height,
                  imageSource: t.rotateImg,
                })) ||
              null,
            y = (((module12.I18nManager.isRTL ? -1 : 1) * this.props.slopeAngle * 180) / Math.PI).toString() + 'deg',
            w = this.props.isFocus ? 1 : this.props.isDrag ? 0.8 : 0.5,
            v = !this.props.editable;
          return React.default.createElement(
            module12.View,
            {
              pointerEvents: v ? 'none' : 'box-none',
              style: {
                position: 'absolute',
                left: n.x - z - D,
                top: n.y - z,
                width: s,
                height: u,
                overflow: 'visible',
                transform: [
                  {
                    rotate: y,
                  },
                  {
                    translateX: 0,
                  },
                ],
                zIndex: this.props.isFocus ? 1 : 0,
                elevation: this.props.isFocus ? 1 : 0,
              },
            },
            React.default.createElement(
              module12.View,
              module21.default({}, this.panProxy.panResponder.panHandlers, {
                pointerEvents: v ? 'none' : 'auto',
                style: {
                  position: 'absolute',
                  left: D + z,
                  top: z,
                  width: n.width,
                  height: n.height,
                },
              }),
              React.default.createElement(module12.Image, {
                style: {
                  width: n.width,
                  height: n.height,
                },
                opacity: w,
                resizeMode: 'stretch',
                source: this._getFurnitureImage(),
              })
            ),
            this.getFocusBorderView(n.width, n.height),
            p,
            l,
            c,
            this.getDragButtonView(n.height)
          );
        },
      },
    ]);
    return E;
  })(React.default.Component);

exports.default = E;
E.contextType = module506.AppConfigContext;
E.defaultProps = {
  transform: {
    xx: 1,
    yy: 1,
  },
  editable: false,
  mapDeg: 0,
  isFocus: false,
  isDrag: false,
  id: 0,
  percent: 0,
  direction: 0,
  type: module1235.FurnitureType.FT_NONE,
  subType: module1235.FurnitureType.FT_NONE,
  rectSize: module1235.RectConfig.initSize,
  slopeAngle: module1235.RectConfig.angle,
  changed: false,
};
var F = module12.StyleSheet.create({
  dragView: {
    position: 'absolute',
    left: 0,
    overflow: 'visible',
  },
});
