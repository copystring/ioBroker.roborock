var module22 = require('./22'),
  module23 = require('@babel/runtime/helpers/slicedToArray'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1332 = require('./1332'),
  module1413 = require('./1413'),
  module515 = require('./515'),
  module391 = require('./391'),
  module1410 = require('./1410');

function S() {
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

var module1402 = require('./1402'),
  R = (function (t) {
    module7.default(_, t);

    var module515 = _,
      R = S(),
      C = function () {
        var t,
          n = module11.default(module515);

        if (R) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function _(t) {
      var n;
      module4.default(this, _);
      (n = C.call(this, t)).touch = {
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

    module5.default(_, [
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
              t.touch.move = module1402._parseEvent2(n.nativeEvent, o) || {};
              if (t.props.handlePanStart) t.props.handlePanStart(t.state.id);
            },
            onPanResponderEnd: function (n, o) {
              if (0 === n.nativeEvent.touches.length) null == t.props.handlePanEnd || t.props.handlePanEnd(t);
            },
            onPanResponderMove: function (n, s) {
              var l = [module1402._parseEvent2(n.nativeEvent, s), t.touch.move],
                u = l[0],
                p = l[1];

              if (((t.touch.move = u || {}), u && !u.hasOwnProperty('distance'))) {
                var h = module1402._parseDegPointWithTrans(u, p, t.props.transform, t.props.mapDeg),
                  c = module23.default(h, 2),
                  f = c[0],
                  v = c[1];

                if (!isNaN(f) && !isNaN(v)) {
                  var y = {
                    x: t.state.position.start.x + f,
                    y: t.state.position.start.y + v,
                  };

                  if (null == t.props.checkAndroidOverflow || !t.props.checkAndroidOverflow(null, y, 0)) {
                    var b = {
                      x: t.state.position.end.x + f,
                      y: t.state.position.end.y + v,
                    };

                    if (!(null != t.props.checkAndroidOverflow && t.props.checkAndroidOverflow(null, b, 0))) {
                      t._setChanged();

                      t.setState({
                        position: {
                          start: y,
                          end: b,
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
                var s = module1402._parseMove(n.nativeEvent, o) || {};
                t.scale.dx = s.x;
                t.scale.dy = s.y;
                t.wallEnd = {
                  x: t.state.position.end.x,
                  y: t.state.position.end.y,
                };
              }
            },
            onPanResponderEnd: function (n, o) {
              if (0 === n.nativeEvent.touches.length) null == t.props.handlePanEnd || t.props.handlePanEnd(t);
            },
            onPanResponderMove: function (n, s) {
              if (!(n.nativeEvent.touches.length > 1)) {
                n = module1402._parseMove(n.nativeEvent, s) || {};

                var l = {
                    x: t.scale.dx,
                    y: t.scale.dy,
                  },
                  u = module1402._parseDegPointWithTrans(n, l, t.props.transform, t.props.mapDeg),
                  p = module23.default(u, 2),
                  h = p[0],
                  c = p[1],
                  f = t.wallEnd.x + h,
                  y = t.wallEnd.y + c,
                  b = y - t.state.position.start.y,
                  w = f - t.state.position.start.x,
                  x = Math.abs(b),
                  S = Math.abs(w),
                  R = b ** w,
                  P = Math.sqrt(x * x + S * S);

                if (P > module1332.RectConfig.maxLength) {
                  var C = module1332.RectConfig.maxLength - P;
                  y += Math.sin(R) * C;
                  f += Math.cos(R) * C;
                }

                if (!(P < module1332.RectConfig.minLength)) {
                  var _ = {
                    x: f,
                    y: y,
                  };

                  if (!(null != t.props.checkAndroidOverflow && t.props.checkAndroidOverflow(null, _, 0))) {
                    t._setChanged();

                    t.setState({
                      position: {
                        start: t.state.position.start,
                        end: _,
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
          return !module1402.objectShallowEqual(this.props, t, true) || !module1402.objectShallowEqual(this.state, n, true);
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
            o = module1402._convertToPixelEndpoint(this.state.position, this.props.transform),
            s = o.end.y - o.start.y,
            l = o.end.x - o.start.x,
            u = Math.abs(s),
            p = Math.abs(l),
            h = Math.sqrt(u * u + p * p),
            b = (s ** l / Math.PI) * 180,
            S = o.start.x,
            R = o.start.y,
            C = 2 * this.props.transform.xx;

          if (C >= 5) C = 5;
          if (C <= 1) C = 1;

          var _ = 4 * module1332.buttonConfig.rectBtn.size.width + C,
            M = 2 * h + _,
            D = _ / 2,
            k = M / 2,
            O = React.default.createElement(
              module12.View,
              module22.default({}, this.panResponder.panHandlers, {
                pointerEvents: 'auto',
                style: {
                  position: 'absolute',
                  left: k - module1332.buttonConfig.rectOperateBoarderDis - 1,
                  top: D - module1332.buttonConfig.rectOperateBoarderDis - 1 - C / 2,
                  width: h + 2 * module1332.buttonConfig.rectOperateBoarderDis + 1,
                  height: 2 * module1332.buttonConfig.rectOperateBoarderDis + C + 1,
                  overflow: this.state.isFocus ? 'visible' : 'hidden',
                  backgroundColor: 'transparent',
                  borderColor: this.state.isFocus ? t.focusViewColor : 'transparent',
                  borderWidth: 2,
                  borderStyle: 'dashed',
                  borderRadius: 'android' === module12.Platform.OS ? 5 : 0,
                },
              })
            ),
            B = (h / (this.props.transform.xx || 1)) * 0.05,
            F = module391.default.lengthConvert(B).toFixed(1) + module391.default.getLengthUnit(),
            T =
              this.props.editable && this.state.isFocus
                ? React.default.createElement(
                    module12.View,
                    {
                      pointerEvents: 'none',
                      style: [
                        P.areaView,
                        {
                          left: k + h / 2 - 45,
                        },
                      ],
                    },
                    React.default.createElement(
                      module12.Text,
                      {
                        numberOfLines: 1,
                        style: [
                          P.areaText,
                          {
                            color: t.areaTextColor,
                          },
                        ],
                      },
                      F
                    )
                  )
                : React.default.createElement(module12.View, null),
            V = D - C / 2,
            A = module1410.default.zoneDeleteButton('invisible_wall_edit_delete', this.panResponderDelete, k, V),
            z = {
              width: k + h,
              height: D + C / 2,
            },
            q = module1410.default.zoneScaleButton(z, 'invisible_wall_edit_scale', this.panResponderScale, 0),
            W = k - module1332.buttonConfig.rectOperateBoarderDis - 1.5 * module1332.buttonConfig.rectBtn.size.width - 1,
            L = module1410.default.zoneDragButtonView(C, this.panResponder, {
              left: W,
            }),
            N = module1332.buttonConfig.rectDisplay.size.width * this.props.transform.xx,
            I = module1332.buttonConfig.rectDisplay.size.height * this.props.transform.xx,
            module1421 = this.state.isFocus
              ? React.default.createElement(module12.View, null)
              : React.default.createElement(module1413.DisplayButton, {
                  left: k - N / 2,
                  top: D - I / 2,
                  width: N,
                  height: I,
                  imageSource: require('./1421'),
                }),
            module1421 = this.state.isFocus
              ? React.default.createElement(module12.View, null)
              : React.default.createElement(module1413.DisplayButton, {
                  left: M - D - N / 2,
                  top: D - I / 2,
                  width: N,
                  height: I,
                  imageSource: require('./1421'),
                }),
            Z = !this.props.editable;

          return React.default.createElement(
            module12.View,
            {
              pointerEvents: Z ? 'none' : 'box-none',
              style: {
                position: 'absolute',
                left: S - k,
                top: R - D,
                width: M,
                height: _,
                overflow: 'visible',
                transform: [
                  {
                    rotateZ: b * (module12.I18nManager.isRTL ? -1 : 1) + 'deg',
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
                left: k,
                top: D - C / 2,
                width: h,
                height: C,
                overflow: 'hidden',
                backgroundColor: t.allFBZBorderColor,
              },
            }),
            T,
            O,
            this.state.isFocus && A,
            this.state.isFocus && q,
            this.state.isFocus && L,
            module1421,
            module1421
          );
        },
      },
    ]);
    return _;
  })(React.default.Component);

exports.default = R;
R.contextType = module515.AppConfigContext;
R.defaultProps = {
  transform: {
    xx: 1,
    yy: 1,
  },
  editable: false,
};
var P = module12.StyleSheet.create({
  areaView: {
    position: 'absolute',
    bottom: 10,
    width: 90,
    height: module1332.buttonConfig.rectSerial.size.height,
    overflow: 'visible',
    alignItems: 'center',
  },
  areaText: {
    color: module1332.buttonConfig.areaTextColor,
    fontSize: 10,
  },
});
