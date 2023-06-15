var module21 = require('./21'),
  module22 = require('./22'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1235 = require('./1235'),
  module1256 = require('./1256'),
  module506 = require('./506'),
  module387 = require('./387');

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
  E = (function (t) {
    module7.default(P, t);

    var module506 = P,
      E = C(),
      x = function () {
        var t,
          n = module11.default(module506);

        if (E) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function P(t) {
      var n;
      module4.default(this, P);
      (n = x.call(this, t)).touch = {
        start: {},
        end: {},
        move: {},
        interval: -1,
      };
      n.scale = {
        dx: 0,
        dy: 0,
      };
      n.wallEnd = {
        x: 0,
        y: 0,
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

    module5.default(P, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          var t = this;
          this.panResponder = module12.PanResponder.create({
            onStartShouldSetPanResponder: function () {
              return !!t.props.editable && (t.props.handlePanOnShouldStart && t.props.handlePanOnShouldStart(), true);
            },
            onMoveShouldSetPanResponder: function () {
              return false;
            },
            onPanResponderStart: function (n, o) {
              t.touch.move = module1247._parseEvent2(n.nativeEvent, o) || {};
              if (t.props.handlePanStart) t.props.handlePanStart(t.state.id);
            },
            onPanResponderEnd: function (n, o) {
              if (0 === n.nativeEvent.touches.length && t.props.handlePanEnd) t.props.handlePanEnd(t);
            },
            onPanResponderMove: function (n, s) {
              var l = [module1247._parseEvent2(n.nativeEvent, s), t.touch.move],
                u = l[0],
                p = l[1];

              if (((t.touch.move = u || {}), u && !u.hasOwnProperty('distance'))) {
                var c = module1247._parseDegPointWithTrans(u, p, t.props.transform, t.props.mapDeg),
                  h = module22.default(c, 2),
                  f = h[0],
                  v = h[1];

                if (!isNaN(f) && !isNaN(v)) {
                  var b = {
                    x: t.state.position.start.x + f,
                    y: t.state.position.start.y + v,
                  };

                  if (null == t.props.checkAndroidOverflow || !t.props.checkAndroidOverflow(null, b, 0)) {
                    var y = {
                      x: t.state.position.end.x + f,
                      y: t.state.position.end.y + v,
                    };

                    if (!(null != t.props.checkAndroidOverflow && t.props.checkAndroidOverflow(null, y, 0))) {
                      t._setChanged();

                      t.setState({
                        position: {
                          start: b,
                          end: y,
                        },
                      });
                    }
                  }
                }
              }
            },
            onPanResponderTerminationRequest: function (t, n) {
              return false;
            },
          });
          this.panResponderScale = module12.PanResponder.create({
            onStartShouldSetPanResponder: function () {
              return true;
            },
            onMoveShouldSetPanResponder: function () {
              return true;
            },
            onPanResponderStart: function (n, o) {
              if (!(n.nativeEvent.touches.length > 1)) {
                var s = module1247._parseMove(n.nativeEvent, o) || {};
                t.scale.dx = s.x;
                t.scale.dy = s.y;
                t.wallEnd = {
                  x: t.state.position.end.x,
                  y: t.state.position.end.y,
                };
              }
            },
            onPanResponderEnd: function (n, o) {
              if (0 === n.nativeEvent.touches.length && t.props.handlePanEnd) t.props.handlePanEnd(t);
            },
            onPanResponderMove: function (n, s) {
              if (!(n.nativeEvent.touches.length > 1)) {
                n = module1247._parseMove(n.nativeEvent, s) || {};

                var l = {
                    x: t.scale.dx,
                    y: t.scale.dy,
                  },
                  u = module1247._parseDegPointWithTrans(n, l, t.props.transform, t.props.mapDeg),
                  p = module22.default(u, 2),
                  c = p[0],
                  h = p[1],
                  f = t.wallEnd.x + c,
                  b = t.wallEnd.y + h,
                  y = b - t.state.position.start.y,
                  w = f - t.state.position.start.x,
                  C = Math.abs(y),
                  E = Math.abs(w),
                  R = y ** w,
                  x = Math.sqrt(C * C + E * E);

                if (x > module1235.RectConfig.maxLength) {
                  var P = module1235.RectConfig.maxLength - x;
                  b += Math.sin(R) * P;
                  f += Math.cos(R) * P;
                }

                if (!(x < module1235.RectConfig.minLength)) {
                  var D = {
                    x: f,
                    y: b,
                  };

                  if (!(null != t.props.checkAndroidOverflow && t.props.checkAndroidOverflow(null, D, 0))) {
                    t._setChanged();

                    t.setState({
                      position: {
                        start: t.state.position.start,
                        end: D,
                      },
                    });
                  }
                }
              }
            },
            onPanResponderTerminationRequest: function (t, n) {
              return false;
            },
          });
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

                if (!(null == t.props.handleRemoveWall)) t.props.handleRemoveWall(t.state.id);
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
        value: function () {},
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
          var o = this;
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
            }
          );
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
          if (!this.state.visible) return React.default.createElement(module12.View, null);

          var t = this.context.theme.displayZones,
            o = module1247._convertToPixelPosition(this.state.position, this.props.transform),
            s = o.end.y - o.start.y,
            l = o.end.x - o.start.x,
            u = Math.abs(s),
            p = Math.abs(l),
            c = Math.sqrt(u * u + p * p),
            y = (s ** l / Math.PI) * 180,
            C = o.start.x,
            E = o.start.y,
            x = 3.5 * module1235.buttonConfig.rectScale.size.width,
            P = 2 * c + x,
            D = x / 2,
            _ = P / 2,
            M = this.props.transform.xx;

          if (M >= 5) M = 5;
          if (M <= 1) M = 1;
          var O = React.default.createElement(
              module12.View,
              module21.default({}, this.panResponder.panHandlers, {
                pointerEvents: 'auto',
                style: {
                  position: 'absolute',
                  left: _ - module1235.buttonConfig.rectOperateBoarderDis - M,
                  top: D - module1235.buttonConfig.rectOperateBoarderDis - 4.5 - M,
                  width: c + 2 * module1235.buttonConfig.rectOperateBoarderDis + 1,
                  height: 15 + 2 * module1235.buttonConfig.rectOperateBoarderDis + M,
                  overflow: this.state.isFocus ? 'visible' : 'hidden',
                  backgroundColor: 'transparent',
                  borderColor: this.state.isFocus ? t.focusViewColor : 'transparent',
                  borderWidth: 2,
                  borderStyle: 'dashed',
                  borderRadius: 'android' === module12.Platform.OS ? 5 : 0,
                },
              })
            ),
            z = (c / (this.props.transform.xx || 1)) * 0.05,
            B = module387.default.lengthConvert(z).toFixed(1) + module387.default.getLengthUnit(),
            k =
              this.props.editable && this.state.isFocus
                ? React.default.createElement(
                    module12.View,
                    {
                      pointerEvents: 'none',
                      style: {
                        position: 'absolute',
                        left: _ - module1235.buttonConfig.rectOperateBoarderDis - 2,
                        bottom: 10,
                        width: 90,
                        height: module1235.buttonConfig.rectSerial.size.height,
                        overflow: 'visible',
                        alignItems: 'flex-start',
                      },
                    },
                    React.default.createElement(
                      module12.Text,
                      {
                        numberOfLines: 1,
                        style: [
                          R.areaText,
                          {
                            color: t.areaTextColor,
                          },
                        ],
                      },
                      B
                    )
                  )
                : React.default.createElement(module12.View, null),
            F = this.state.isFocus
              ? React.default.createElement(module1256.RectButton, {
                  funcId: 'invisible_wall_edit_delete',
                  panResponder: this.panResponderDelete,
                  left: _ - (1.5 * module1235.buttonConfig.rectDelete.size.width) / 2 - module1235.buttonConfig.rectOperateBoarderDis - M,
                  top: D - (1.5 * module1235.buttonConfig.rectDelete.size.height) / 2 - module1235.buttonConfig.rectOperateBoarderDis - 4.5 - M,
                  width: module1235.buttonConfig.rectDelete.size.width,
                  height: module1235.buttonConfig.rectDelete.size.height,
                  imageSource: t.deleteImg,
                })
              : React.default.createElement(module12.View, null),
            T = this.state.isFocus
              ? React.default.createElement(module1256.RectButton, {
                  funcId: 'invisible_wall_edit_scale',
                  panResponder: this.panResponderScale,
                  left: P - D - (1.5 * module1235.buttonConfig.rectScale.size.width) / 2 + module1235.buttonConfig.rectOperateBoarderDis - M + 1,
                  top: D - (1.5 * module1235.buttonConfig.rectScale.size.height) / 2 + module1235.buttonConfig.rectOperateBoarderDis + 10.5 - M,
                  width: module1235.buttonConfig.rectScale.size.width,
                  height: module1235.buttonConfig.rectScale.size.height,
                  imageSource: t.scaleImg,
                })
              : React.default.createElement(module12.View, null),
            module1259 = this.state.isFocus
              ? React.default.createElement(module12.View, null)
              : React.default.createElement(module1256.DisplayButton, {
                  left: _ - (module1235.buttonConfig.rectDisplay.size.width / 2) * M,
                  top: D - (module1235.buttonConfig.rectDisplay.size.height / 2) * M,
                  width: module1235.buttonConfig.rectDisplay.size.width * M,
                  height: module1235.buttonConfig.rectDisplay.size.height * M,
                  imageSource: require('./1259'),
                }),
            module1259 = this.state.isFocus
              ? React.default.createElement(module12.View, null)
              : React.default.createElement(module1256.DisplayButton, {
                  left: P - D - (module1235.buttonConfig.rectDisplay.size.width * M) / 2,
                  top: D - (module1235.buttonConfig.rectDisplay.size.height * M) / 2,
                  width: module1235.buttonConfig.rectDisplay.size.width * M,
                  height: module1235.buttonConfig.rectDisplay.size.height * M,
                  imageSource: require('./1259'),
                }),
            I = !this.props.editable;
          return React.default.createElement(
            module12.View,
            {
              pointerEvents: I ? 'none' : 'box-none',
              style: {
                position: 'absolute',
                left: C - _,
                top: E - D,
                width: P,
                height: x,
                overflow: 'visible',
                transform: [
                  {
                    rotateZ: y * (module12.I18nManager.isRTL ? -1 : 1) + 'deg',
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
                left: _ - M,
                top: D - M,
                width: c,
                height: 0,
                overflow: 'hidden',
                borderColor: t.allFBZBorderColor,
                borderWidth: M,
                borderStyle: 'solid',
                backgroundColor: t.allFBZBorderColor,
              },
            }),
            React.default.createElement(module12.View, {
              pointerEvents: 'auto',
              style: {
                position: 'absolute',
                left: _ - M,
                top: D - M - 7,
                width: c,
                height: 15,
                borderColor: 'red',
              },
            }),
            k,
            O,
            F,
            T,
            module1259,
            module1259
          );
        },
      },
    ]);
    return P;
  })(React.default.Component);

exports.default = E;
E.contextType = module506.AppConfigContext;
E.defaultProps = {
  transform: {
    xx: 1,
    yy: 1,
  },
  editable: false,
};
var R = module12.StyleSheet.create({
  areaText: {
    color: module1235.buttonConfig.areaTextColor,
    fontSize: 10,
  },
});
