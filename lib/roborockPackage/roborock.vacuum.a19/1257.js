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
  module1069 = require('./1069'),
  module1235 = require('./1235'),
  module1243 = require('./1243'),
  module1256 = require('./1256'),
  module506 = require('./506'),
  module387 = require('./387');

function S(t, n) {
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

function R(t) {
  for (var n = 1; n < arguments.length; n++) {
    var s = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      S(Object(s), true).forEach(function (n) {
        module49.default(t, n, s[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      S(Object(s)).forEach(function (n) {
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
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (t) {
    return false;
  }
}

var module1247 = require('./1247'),
  F = module1235.buttonConfig.rectScale.size.width,
  z = (function (t) {
    module7.default(z, t);

    var module49 = z,
      module506 = T(),
      S = function () {
        var t,
          n = module11.default(module49);

        if (module506) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, s);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function z(t) {
      var n;
      module4.default(this, z);

      (n = S.call(this, t)).updateRect = function (t) {
        var o = R(R({}, n.state.rectSize), t);

        if (!(null != n.props.checkAndroidOverflow && n.props.checkAndroidOverflow(o, null, n.state.slopeAngle))) {
          n._setChanged();

          n.setState({
            rectSize: o,
          });
        }
      };

      n.updateAngle = function (t) {
        if (!(null != n.props.checkAndroidOverflow && n.props.checkAndroidOverflow(n.state.rectSize, null, t))) {
          n._setChanged();

          n.setState({
            slopeAngle: t,
          });
        }
      };

      n.getInfo = function () {
        return {
          rectSize: n.state.rectSize,
          slopeAngle: n.state.slopeAngle,
          mapDeg: n.props.mapDeg,
          trans: n.props.transform,
        };
      };

      n.onShouldStart = function () {
        if (!(null == n.props.handlePanOnShouldStart)) n.props.handlePanOnShouldStart();
        return true;
      };

      n.onTouchStart = function () {
        if (!(null == n.props.handlePanStart)) n.props.handlePanStart(n.state.type, n.state.id);
      };

      n.onTouchEnd = function () {
        var t = !(arguments.length > 0 && undefined !== arguments[0]) || arguments[0];
        if (!(null == n.props.handlePanEnd)) n.props.handlePanEnd(module6.default(n), t);
      };

      n.state = {
        type: t.type || module1235.FbzType.FBZ_TYPE_REGULAR,
        id: t.id,
        serial: t.id || 1,
        visible: module1235.RectConfig.visible,
        isFocus: module1235.RectConfig.isFocus,
        rectSize: module1235.RectConfig.initSize,
        slopeAngle: module1235.RectConfig.angle,
        newAdded: module1235.RectConfig.newAdded,
        editable: t.editable || false,
      };
      n.changed = false;
      if (n.state.type == module1235.FbzType.FBZ_TYPE_CARPET) F = module1235.buttonConfig.carpetPaddingSide;
      return n;
    }

    module5.default(z, [
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
              if (0 === n.nativeEvent.touches.length) {
                t._setChanged();

                if (!(null == t.props.handleRemoveFBZ)) t.props.handleRemoveFBZ(t.state.type, t.state.id);
              }
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
        key: 'shouldComponentUpdate',
        value: function (t, n) {
          return !module1247.objectShallowEqual(this.props, t, true) || !module1247.objectShallowEqual(this.state, n, true);
        },
      },
      {
        key: 'resetChanged',
        value: function () {
          this.changed = false;
          this.setState({
            newAdded: false,
          });
        },
      },
      {
        key: 'reInitRender',
        value: function (t) {
          var n = this;
          this.setState(
            {
              serial: t,
              id: t,
              visible: module1235.RectConfig.visible,
              newAdded: module1235.RectConfig.newAdded,
              rectSize: module1235.RectConfig.initSize,
            },
            function () {
              n.changed = false;
            }
          );
        },
      },
      {
        key: 'addNew',
        value: function (t, n) {
          var o = this,
            s = arguments.length > 2 && undefined !== arguments[2] ? arguments[2] : null;
          this.setState(
            {
              visible: true,
              newAdded: true,
              rectSize: t,
              slopeAngle: n || 0,
            },
            function () {
              o._setChanged();

              if (s) s();
            }
          );
        },
      },
      {
        key: 'showZone',
        value: function (t, n, o) {
          var s = this;
          this.setState(
            {
              serial: t,
              id: t,
              visible: true,
              newAdded: false,
              slopeAngle: o,
              rectSize: n,
            },
            function () {
              s.changed = false;
            }
          );
        },
      },
      {
        key: 'removeZone',
        value: function (t) {
          var n = this;
          this.setState(
            {
              visible: false,
              newAdded: false,
              isFocus: false,
              serial: t,
            },
            function () {
              n.changed = false;
            }
          );
        },
      },
      {
        key: 'setFocus',
        value: function (t) {
          this.setState({
            isFocus: t,
            editable: t,
          });
        },
      },
      {
        key: 'cleanFocus',
        value: function () {
          this.setState({
            isFocus: false,
            editable: this.props.editable,
          });
        },
      },
      {
        key: 'hasEdit',
        value: function () {
          return 1 == this.changed || 1 == this.state.newAdded;
        },
      },
      {
        key: 'isVisible',
        value: function () {
          return !!(this.state.visible && this.state.rectSize.height > 0);
        },
      },
      {
        key: '_setChanged',
        value: function () {
          var t, n;

          if (!this.changed) {
            this.changed = true;
            if (!(null == (t = (n = this.props).mapEditPageDidChange))) t.call(n, this.state.type);
          }
        },
      },
      {
        key: '_getBackgroudColor',
        value: function () {
          var t = globals.app.state.theme.displayZones.allFBZColor;
          if (this.state.type == module1235.FbzType.FBZ_TYPE_MOPPING) t = globals.app.state.theme.displayZones.mopFBZColor;
          else if (this.state.type == module1235.FbzType.FBZ_TYPE_CLEANING) t = globals.app.state.theme.displayZones.cleanFBZColor;
          else if (this.state.type == module1235.FbzType.FBZ_TYPE_CARPET) t = globals.app.state.theme.displayZones.carpetColor;
          else if (this.state.type == module1235.FbzType.RECT_TYPE_CARPET) t = 'transparent';
          return t;
        },
      },
      {
        key: '_getborderColor',
        value: function () {
          var t = globals.app.state.theme.displayZones.allFBZBorderColor;
          if (this.state.type == module1235.FbzType.FBZ_TYPE_MOPPING) t = globals.app.state.theme.displayZones.mopFBZBorderColor;
          else if (this.state.type == module1235.FbzType.FBZ_TYPE_CLEANING) t = globals.app.state.theme.displayZones.cleanFBZBorderColor;
          else if (this.state.type == module1235.FbzType.FBZ_TYPE_CARPET) t = globals.app.state.theme.displayZones.carpetBorderColor;
          else if (this.state.type == module1235.FbzType.RECT_TYPE_CARPET) t = 'transparent';
          return t;
        },
      },
      {
        key: 'getAreaView',
        value: function (t) {
          var n = 0.05 * this.state.rectSize.width,
            o = 0.05 * this.state.rectSize.height,
            s =
              t > 70
                ? module387.default.lengthConvert(n).toFixed(1) +
                  module387.default.getLengthUnit() +
                  ' x ' +
                  module387.default.lengthConvert(o).toFixed(1) +
                  module387.default.getLengthUnit()
                : module387.default.areaConvert(n * o).toFixed(1) + module387.default.getAreaUnit();
          return this.props.showArea && this.state.isFocus
            ? React.default.createElement(
                module12.View,
                {
                  pointerEvents: 'none',
                  style: A.areaView,
                },
                React.default.createElement(
                  module12.Text,
                  {
                    numberOfLines: 1,
                    style: [
                      A.areaText,
                      {
                        color: globals.app.state.theme.displayZones.areaTextColor,
                      },
                    ],
                  },
                  s
                )
              )
            : React.default.createElement(module12.View, null);
        },
      },
      {
        key: 'getFocusBorderView',
        value: function (t, n) {
          var o = this,
            s = 'android' === module12.Platform.OS ? 5 : 0;
          return this.state.isFocus
            ? React.default.createElement(module12.View, {
                pointerEvents: 'none',
                ref: function (t) {
                  o.fbzfocusView = t;
                },
                style: {
                  position: 'absolute',
                  left: F - module1235.buttonConfig.rectOperateBoarderDis - 1,
                  top: F - module1235.buttonConfig.rectOperateBoarderDis - 1,
                  width: t + 2 * module1235.buttonConfig.rectOperateBoarderDis + 1,
                  height: n + 2 * module1235.buttonConfig.rectOperateBoarderDis + 1,
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
        key: 'render',
        value: function () {
          var t = this;
          if (!this.state.visible) return React.default.createElement(module12.View, null);

          var o = this.context.theme.displayZones,
            s = module1247._convertToPixelRect(this.state.rectSize, this.props.transform);

          if (!s || isNaN(s.x) || isNaN(s.y) || isNaN(s.width) || isNaN(s.height)) return null;

          for (
            var l = s.width + 2 * F,
              u = s.height + 2 * F,
              c = this.state.type != module1235.FbzType.FBZ_TYPE_CARPET && this.state.type != module1235.FbzType.RECT_TYPE_CARPET,
              h =
                this.state.isFocus && c
                  ? React.default.createElement(module1256.RectButton, {
                      funcId: 'forbidden_rect_edit_delete',
                      panResponder: this.panResponderDelete,
                      left: F - (1.5 * module1235.buttonConfig.rectDelete.size.width) / 2 - module1235.buttonConfig.rectOperateBoarderDis,
                      top: F - (1.5 * module1235.buttonConfig.rectDelete.size.height) / 2 + 1 - module1235.buttonConfig.rectOperateBoarderDis,
                      width: module1235.buttonConfig.rectDelete.size.width,
                      height: module1235.buttonConfig.rectDelete.size.height,
                      imageSource: o.deleteImg,
                    })
                  : React.default.createElement(module12.View, null),
              p = this.state.isFocus
                ? React.default.createElement(module1256.RectButton, {
                    funcId: 'forbidden_rect_edit_scale',
                    panResponder: this.panProxy.panResponderScale,
                    left: s.width + F - (1.5 * module1235.buttonConfig.rectScale.size.width) / 2 - 1 + module1235.buttonConfig.rectOperateBoarderDis,
                    top: s.height + F - (1.5 * module1235.buttonConfig.rectScale.size.height) / 2 - 2 + module1235.buttonConfig.rectOperateBoarderDis,
                    width: module1235.buttonConfig.rectScale.size.width,
                    height: module1235.buttonConfig.rectScale.size.height,
                    imageSource: o.scaleImg,
                  })
                : React.default.createElement(module12.View, null),
              C =
                this.state.isFocus && c
                  ? React.default.createElement(module1256.RectButton, {
                      funcId: 'forbidden_rect_edit_rotate',
                      panResponder: this.panProxy.panResponderRotate,
                      left: s.width + F - (1.5 * module1235.buttonConfig.rectRotate.size.width) / 2 - 1 + module1235.buttonConfig.rectOperateBoarderDis,
                      top: F - (1.5 * module1235.buttonConfig.rectRotate.size.height) / 2 + 1 - module1235.buttonConfig.rectOperateBoarderDis,
                      width: module1235.buttonConfig.rectRotate.size.width,
                      height: module1235.buttonConfig.rectRotate.size.height,
                      imageSource: o.rotateImg,
                    })
                  : React.default.createElement(module12.View, null),
              P = new Array(),
              S = (2 * this.props.transform.xx) / 2,
              R = Math.sqrt(s.width ** 2 + s.height ** 2),
              T = 1,
              z = (R - s.width) / -2;
            z <= R;
            z += S
          )
            P.push(
              React.default.createElement(module1069.Line, {
                key: T++,
                x1: z,
                y1: (R - s.height) / -2,
                x2: z,
                y2: R,
                stroke: '#FFFFFF66',
                strokeWidth: 1,
                transform: 'rotate(45, ' + s.width / 2 + ' ' + s.height / 2 + ')',
              })
            );

          var A = (((module12.I18nManager.isRTL ? -1 : 1) * this.state.slopeAngle * 180) / Math.PI).toString() + 'deg',
            B = 'time_key_' + new Date().getTime();
          if (this.state.type == module1235.FbzType.FBZ_TYPE_CARPET) B = this.state.newAdded ? 'forbidden_zone_carpet_ignore' : 'forbidden_zone_carpet_recover';
          var O = !this.state.editable;
          return React.default.createElement(
            module12.View,
            {
              pointerEvents: O ? 'none' : 'box-none',
              style: {
                position: 'absolute',
                left: s.x - F,
                top: s.y - F,
                width: l,
                height: u,
                overflow: 'visible',
                transform: [
                  {
                    rotate: A,
                  },
                  {
                    translateX: 0,
                  },
                ],
                zIndex: this.state.isFocus ? 1 : 0,
                elevation: this.state.isFocus ? 1 : 0,
              },
            },
            this.getAreaView(s.width),
            React.default.createElement(
              module12.View,
              {
                pointerEvents: 'box-none',
                style: {
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: l,
                  height: u,
                  overflow: 'visible',
                },
                ref: function (n) {
                  t.fbzwarpView = n;
                },
              },
              React.default.createElement(
                module12.View,
                module21.default({}, module387.default.getAccessibilityLabel(B), this.panProxy.panResponder.panHandlers, {
                  pointerEvents: O ? 'none' : 'auto',
                  style: {
                    position: 'absolute',
                    left: F,
                    top: F,
                    width: s.width,
                    height: s.height,
                    overflow: 'visible',
                    backgroundColor: this._getBackgroudColor(),
                    borderColor: this._getborderColor(),
                    borderWidth: this.state.type == module1235.FbzType.RECT_TYPE_CARPET ? 0 : 2,
                  },
                }),
                this.state.type == module1235.FbzType.RECT_TYPE_CARPET &&
                  React.default.createElement(
                    module1069.Svg,
                    {
                      width: s.width,
                      height: s.height,
                    },
                    P
                  )
              ),
              this.getFocusBorderView(s.width, s.height),
              h,
              p,
              C
            )
          );
        },
      },
    ]);
    return z;
  })(React.default.Component);

exports.default = z;
z.contextType = module506.AppConfigContext;
z.defaultProps = {
  transform: {
    xx: 1,
    yy: 1,
  },
  editable: false,
  showArea: false,
  mapDeg: 0,
};
var A = module12.StyleSheet.create({
  areaText: {
    color: module1235.buttonConfig.areaTextColor,
    fontSize: 10,
  },
  areaView: {
    position: 'absolute',
    left: F - module1235.buttonConfig.rectOperateBoarderDis,
    bottom: 0,
    width: 100,
    height: module1235.buttonConfig.rectSerial.size.height,
    overflow: 'visible',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});
