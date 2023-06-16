var module22 = require('./22'),
  module4 = require('./4'),
  module6 = require('./6'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1057 = require('./1057'),
  module1134 = require('./1134'),
  module1121 = require('./1121'),
  module391 = require('./391'),
  module1271 = require('./1271');

function C() {
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
  P = (function (t) {
    module7.default(T, t);

    var module1121 = T,
      P = C(),
      D = function () {
        var t,
          n = module11.default(module1121);

        if (P) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function T(t) {
      var n;
      module4.default(this, T);

      (n = D.call(this, t)).updatePosition = function (t, o) {
        if (
          !(
            (o && (null == n.props.checkAndroidOverflow ? undefined : n.props.checkAndroidOverflow(null, t.start, 0))) ||
            (null != n.props.checkAndroidOverflow && n.props.checkAndroidOverflow(null, t.end, 0))
          )
        ) {
          n._setChanged();

          n.setState({
            position: {
              start: t.start,
              end: t.end,
            },
          });
        }
      };

      n.getInfo = function () {
        return {
          position: n.state.position,
          mapDeg: n.props.mapDeg,
          trans: n.props.transform,
        };
      };

      n.onShouldStart = function () {
        return !!n.props.editable && (null == n.props.handlePanOnShouldStart || n.props.handlePanOnShouldStart(), true);
      };

      n.onTouchStart = function (t) {
        if (t == module1134.RectPanType.PanTypeMoveWall) null == n.props.handlePanStart || n.props.handlePanStart(n.state.id);
      };

      n.onTouchEnd = function () {
        if (!(null == n.props.handlePanEnd)) n.props.handlePanEnd(module6.default(n));
      };

      n.onTouchDelete = function () {
        n._setChanged();

        if (!(null == n.props.handleRemoveWall)) n.props.handleRemoveWall(n.state.id);
      };

      n.state = {
        id: n.props.id || 1,
        serial: n.props.id || 1,
        visible: false,
        isFocus: false,
        position: {
          start: n.props.start || {
            x: 0,
            y: 0,
          },
          end: n.props.end || {
            x: 0,
            y: 0,
          },
        },
        newAdded: false,
      };
      n.changed = false;
      return n;
    }

    module5.default(T, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          this.panProxy = new module1134.PanResponderProxy(module1134.RectPanType.PanTypeMoveWall | module1134.RectPanType.PanTypeDragEnd | module1134.RectPanType.PanTypeDelete);
          this.panProxy.registerPanResponder({
            updatePosition: this.updatePosition,
            getInfo: this.getInfo,
            onShouldStart: this.onShouldStart,
            onTouchStart: this.onTouchStart,
            onTouchEnd: this.onTouchEnd,
            onTouchDelete: this.onTouchDelete,
          });
        },
      },
      {
        key: 'shouldComponentUpdate',
        value: function (t, n) {
          return !module1261.objectShallowEqual(this.props, t, true) || !module1261.objectShallowEqual(this.state, n, true);
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
              visible: false,
              newAdded: false,
              position: {
                start: {
                  x: 0,
                  y: 0,
                },
                end: {
                  x: 0,
                  y: 0,
                },
              },
            },
            function () {
              n.changed = false;
            }
          );
        },
      },
      {
        key: 'showWall',
        value: function (t, n, o) {
          var s = this;
          this.setState(
            {
              serial: t,
              id: t,
              visible: true,
              position: {
                start: n,
                end: o,
              },
            },
            function () {
              s.changed = false;
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
              position: {
                start: t,
                end: n,
              },
            },
            function () {
              o._setChanged();

              if (s) s();
            }
          );
        },
      },
      {
        key: 'removeZone',
        value: function (t) {
          this.setState({
            visible: false,
            newAdded: false,
            isFocus: false,
            serial: t,
          });
        },
      },
      {
        key: 'isVisible',
        value: function () {
          return this.state.visible;
        },
      },
      {
        key: '_setChanged',
        value: function () {
          var t, n;

          if (!this.changed) {
            this.changed = true;
            if (!(null == (t = (n = this.props).mapEditPageDidChange))) t.call(n);
          }
        },
      },
      {
        key: 'render',
        value: function () {
          var t, o, s;
          if (!this.state.visible) return React.default.createElement(module12.View, null);

          var l = this.context.theme.displayZones,
            u = module1261._convertToPixelEndpoint(this.state.position, this.props.transform),
            h = u.end.y - u.start.y,
            p = u.end.x - u.start.x,
            w = Math.abs(h),
            C = Math.abs(p),
            P = Math.sqrt(w * w + C * C),
            D = (h ** p / Math.PI) * 180,
            T = u.start.x,
            R = u.start.y,
            k = 4 * module1057.buttonConfig.rectBtn.size.width + this.wallHeight,
            B = 2 * P + 4 * module1057.buttonConfig.rectOperateBoarderDis,
            O = k / 2,
            _ = B / 2,
            F = React.default.createElement(
              module12.View,
              module22.default({}, this.panProxy.panResponder.panHandlers, {
                pointerEvents: 'auto',
                style: {
                  position: 'absolute',
                  left: _ - module1057.buttonConfig.rectOperateBoarderDis - 1,
                  top: O - module1057.buttonConfig.rectOperateBoarderDis - 1 - this.wallHeight / 2,
                  width: P + 2 * module1057.buttonConfig.rectOperateBoarderDis + 1,
                  height: 2 * module1057.buttonConfig.rectOperateBoarderDis + this.wallHeight + 1,
                  overflow: this.state.isFocus ? 'visible' : 'hidden',
                  backgroundColor: 'transparent',
                  borderColor: this.state.isFocus ? l.focusViewColor : 'transparent',
                  borderWidth: 2,
                  borderStyle: 'dashed',
                  borderRadius: 'android' === module12.Platform.OS ? 5 : 0,
                },
              })
            ),
            V = (P / (this.props.transform.xx || 1)) * 0.05,
            M = module391.default.lengthConvert(V).toFixed(1) + module391.default.getLengthUnit(),
            A =
              this.props.editable && this.state.isFocus
                ? React.default.createElement(
                    module12.View,
                    {
                      pointerEvents: 'none',
                      style: [
                        E.areaView,
                        {
                          left: _ + P / 2 - 45,
                        },
                      ],
                    },
                    React.default.createElement(
                      module12.Text,
                      {
                        numberOfLines: 1,
                        style: [
                          E.areaText,
                          {
                            color: l.areaTextColor,
                          },
                        ],
                      },
                      M
                    )
                  )
                : React.default.createElement(module12.View, null),
            H = O - this.wallHeight / 2,
            z = module1271.default.zoneDeleteButton('invisible_wall_edit_delete', null == (t = this.panProxy) ? undefined : t.panResponderDelete, _, H),
            I = {
              width: _ + P,
              height: O + this.wallHeight / 2,
            },
            W = module1271.default.zoneScaleButton(I, 'invisible_wall_edit_scale', null == (o = this.panProxy) ? undefined : o.panResponderDragEnd, 0),
            Z = _ - module1057.buttonConfig.rectOperateBoarderDis - 1.5 * module1057.buttonConfig.rectBtn.size.width - 1,
            j = module1271.default.zoneDragButtonView(this.wallHeight, null == (s = this.panProxy) ? undefined : s.panResponder, {
              left: Z,
            }),
            q = module1057.buttonConfig.rectDisplay.size.width * this.props.transform.xx,
            L = module1057.buttonConfig.rectDisplay.size.height * this.props.transform.xx,
            module1324 = this.state.isFocus
              ? React.default.createElement(module12.View, null)
              : React.default.createElement(module1134.DisplayButton, {
                  left: _ - q / 2,
                  top: O - L / 2,
                  width: q,
                  height: L,
                  imageSource: require('./1324'),
                }),
            module1324 = this.state.isFocus
              ? React.default.createElement(module12.View, null)
              : React.default.createElement(module1134.DisplayButton, {
                  left: B - 2 * module1057.buttonConfig.rectOperateBoarderDis - q / 2,
                  top: O - L / 2,
                  width: q,
                  height: L,
                  imageSource: require('./1324'),
                }),
            X = !this.props.editable;

          return React.default.createElement(
            module12.View,
            {
              pointerEvents: X ? 'none' : 'box-none',
              style: {
                position: 'absolute',
                left: T - _,
                top: R - O,
                width: B,
                height: k,
                overflow: 'visible',
                transform: [
                  {
                    rotateZ: D * (module12.I18nManager.isRTL ? -1 : 1) + 'deg',
                  },
                  {
                    translateX: 0,
                  },
                ],
                zIndex: this.state.isFocus ? 1 : 0,
                elevation: this.state.isFocus ? 1 : 0,
              },
            },
            React.default.createElement(module12.View, {
              pointerEvents: 'none',
              style: {
                position: 'absolute',
                left: _,
                top: O - this.wallHeight / 2,
                width: P,
                height: this.wallHeight,
                overflow: 'hidden',
                backgroundColor: this.wallColor,
              },
            }),
            A,
            F,
            this.state.isFocus && z,
            this.state.isFocus && W,
            this.state.isFocus && j,
            module1324,
            module1324
          );
        },
      },
      {
        key: 'wallHeight',
        get: function () {
          var t,
            n = this;
          return this.props.wallHeight || ((t = 2 * n.props.transform.xx), (t ** 5) ** 1);
        },
      },
      {
        key: 'wallColor',
        get: function () {
          return this.props.wallColor || this.context.theme.displayZones.allFBZBorderColor;
        },
      },
    ]);
    return T;
  })(React.default.Component);

exports.default = P;
P.contextType = module1121.AppConfigContext;
P.defaultProps = {
  transform: {
    xx: 1,
    yy: 1,
  },
  editable: false,
};
var E = module12.StyleSheet.create({
  areaView: {
    position: 'absolute',
    bottom: 10,
    width: 90,
    height: module1057.buttonConfig.rectSerial.size.height,
    overflow: 'visible',
    alignItems: 'center',
  },
  areaText: {
    color: module1057.buttonConfig.areaTextColor,
    fontSize: 10,
  },
});
