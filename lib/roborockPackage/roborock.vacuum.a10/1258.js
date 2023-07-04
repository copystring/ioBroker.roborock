var module21 = require('./21'),
  module22 = require('./22'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1067 = require('./1067'),
  module387 = require('./387'),
  module506 = require('./506'),
  module1259 = require('./1259');

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

var M = module12.ART.Transform,
  module491 = require('./491').strings,
  module934 = require('./934'),
  module1245 = require('./1245'),
  B = (function (t) {
    module7.default(_, t);

    var module506 = _,
      B = x(),
      E = function () {
        var t,
          o = module11.default(module506);

        if (B) {
          var n = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, n);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function _(t) {
      var o;
      module4.default(this, _);

      (o = E.call(this, t))._handleStartShouldSetPanResponder = function () {
        return (
          o.props.mapMode == module934.MAP_MODE_MAP_EDIT ||
          (module1259.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
            globals.showToast(module491.robot_communication_exception);
          }),
          false)
        );
      };

      o._handlePanResponderStart = function (t, n) {
        o.touch.move = module1245._parseEvent2(t.nativeEvent, n) || {};
        o.setState({
          leftSplitPoint: null,
          rightSplitPoint: null,
        });
      };

      o._handlePanResponderEnd = function (t, n) {
        if (0 === t.nativeEvent.touches.length) o.generateSplitLine();
      };

      o.touch = {
        start: {},
        end: {},
        move: {},
      };
      o.inAction = {
        left: false,
        right: true,
        currentSplitBlock: -1,
      };
      o.splitInfo = {
        blockBoarderList: {},
        blockBoarder: [],
      };
      o.state = {
        visible: false,
        inSplit: false,
        inMerge: false,
        inNaming: false,
        transform: new M(),
        currentMergeBlocks: [],
        leftPoint: {},
        rightPoint: {},
        leftSplitPoint: {},
        rightSplitPoint: {},
      };
      return o;
    }

    module5.default(_, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          var t = this;
          this.splitInfoInit();
          this.props.parent.props.parent.enterMapEditMode();
          this.panResponderLeft = module12.PanResponder.create({
            onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
            onMoveShouldSetPanResponder: function () {
              return true;
            },
            onPanResponderStart: this._handlePanResponderStart,
            onPanResponderEnd: this._handlePanResponderEnd,
            onPanResponderMove: function (o, n) {
              var s = t._getMoveXY(o, n);

              if (s) {
                var l = {
                  x: t.state.leftPoint.x + s.x,
                  y: t.state.leftPoint.y + s.y,
                };
                if (!(null != t.props.checkAndroidOverflow && t.props.checkAndroidOverflow(null, l, 0)))
                  t.setState({
                    leftPoint: l,
                  });
              }
            },
            onPanResponderTerminationRequest: function (t, o) {
              return false;
            },
          });
          this.panResponderRight = module12.PanResponder.create({
            onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
            onMoveShouldSetPanResponder: function () {
              return true;
            },
            onPanResponderStart: this._handlePanResponderStart,
            onPanResponderEnd: this._handlePanResponderEnd,
            onPanResponderMove: function (o, n) {
              var s = t._getMoveXY(o, n);

              if (s) {
                var l = {
                  x: t.state.rightPoint.x + s.x,
                  y: t.state.rightPoint.y + s.y,
                };
                if (!(null != t.props.checkAndroidOverflow && t.props.checkAndroidOverflow(null, l, 0)))
                  t.setState({
                    rightPoint: l,
                  });
              }
            },
            onPanResponderTerminationRequest: function (t, o) {
              return false;
            },
          });
          this.panResponderLine = module12.PanResponder.create({
            onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
            onMoveShouldSetPanResponder: function () {
              return true;
            },
            onPanResponderStart: this._handlePanResponderStart,
            onPanResponderEnd: this._handlePanResponderEnd,
            onPanResponderMove: function (o, n) {
              var s = t._getMoveXY(o, n);

              if (s) {
                var l = {
                  x: t.state.leftPoint.x + s.x,
                  y: t.state.leftPoint.y + s.y,
                };

                if (null == t.props.checkAndroidOverflow || !t.props.checkAndroidOverflow(null, l, 0)) {
                  var h = {
                    x: t.state.rightPoint.x + s.x,
                    y: t.state.rightPoint.y + s.y,
                  };
                  if (!(null != t.props.checkAndroidOverflow && t.props.checkAndroidOverflow(null, h, 0)))
                    t.setState({
                      leftPoint: l,
                      rightPoint: h,
                    });
                }
              }
            },
            onPanResponderTerminationRequest: function (t, o) {
              return false;
            },
          });
        },
      },
      {
        key: '_getMoveXY',
        value: function (t, o) {
          var s = [module1245._parseEvent2(t.nativeEvent, o), this.touch.move],
            l = s[0],
            h = s[1];
          if (((this.touch.move = l || {}), !(l && l.x && l.y && h.x))) return null;
          if (l.hasOwnProperty('distance')) return null;

          var f = module1245._parseDegPointWithTrans(l, h, this.props.transform, this.props.mapDeg),
            p = module22.default(f, 2);

          return {
            x: p[0],
            y: p[1],
          };
        },
      },
      {
        key: 'formLine',
        value: function (t, o) {
          var n = 0,
            s = 0,
            l = 0;

          if (t.x == o.x) {
            n = 1;
            s = 0;
            l = -1 * t.x;
          } else {
            n = (o.y - t.y) / (o.x - t.x);
            s = -1;
            l = t.y - n * t.x;

            if (Math.abs(n) > 1) {
              n = 1;
              s = -(o.x - t.x) / (o.y - t.y);
              l = -1 * (t.x + s * t.y);
            }
          }

          return {
            A: n,
            B: s,
            C: l,
          };
        },
      },
      {
        key: 'generateSplitLine',
        value: function () {
          var t = this.props.parent.props.parent.state.map.data,
            o = {
              x: this.state.leftPoint.x,
              y: this.state.leftPoint.y,
            },
            n = {
              x: this.state.rightPoint.x,
              y: this.state.rightPoint.y,
            },
            s = this.formLine(o, n),
            l = this.mapScreenToOriginXY(o),
            h = this.mapScreenToOriginXY(n),
            f = this.inAction.currentSplitBlock,
            p = this.formLine(h, l),
            u = false,
            c = false,
            v = {},
            y = {};

          if (0 == p.B || 1 == Math.abs(p.A)) {
            for (var S = l.y >= h.y ? l.y : h.y, P = l.y <= h.y ? l.y : h.y, x = 0; x < t.height && !(S - x <= P); x++) {
              var M,
                w = S - x,
                k = (-1 / p.A) * Math.floor(p.B * w + p.C);
              M = t.data[t.offset + Math.floor(w) * t.width + Math.floor(k)] >>> 3;
              var R = 7 & t.data[t.offset + Math.floor(w) * t.width + Math.floor(k)];

              if (M == f && 0 != R) {
                var B = (v = this.mapOriginToScreen(t.offset + Math.floor(w) * t.width + Math.floor(k))).y;
                v = {
                  x: -(s.B * B + s.C) / s.A,
                  y: B,
                };
                u = true;
                console.warn('found and out');
                break;
              }
            }

            for (var b = 0; b < t.height && !(P + b >= S); b++) {
              var E,
                _ = P + b,
                A = (-1 / p.A) * Math.floor(p.B * _ + p.C);

              E = t.data[t.offset + Math.floor(_) * t.width + Math.floor(A)] >>> 3;
              var L = 7 & t.data[t.offset + Math.floor(_) * t.width + Math.floor(A)];

              if (E == f && 0 != L) {
                var I = (y = this.mapOriginToScreen(t.offset + Math.floor(_) * t.width + Math.floor(A))).y;
                y = {
                  x: -(s.B * I + s.C) / s.A,
                  y: I,
                };
                c = true;
                console.warn('found and out');
                break;
              }
            }

            if (u && c)
              this.setState({
                leftSplitPoint: v,
                rightSplitPoint: y,
              });
            else this.resetSplitPoint();
          } else {
            for (var N = l.x >= h.x ? l.x : h.x, T = l.x <= h.x ? l.x : h.x, O = 0; O < t.width && !(N - O <= T); O++) {
              var C,
                V = N - O,
                Y = Math.floor(p.A * V + p.C);
              C = t.data[t.offset + Math.floor(Y) * t.width + Math.floor(V)] >>> 3;
              var X = 7 & t.data[t.offset + Math.floor(Y) * t.width + Math.floor(V)];

              if (C == f && 0 != X) {
                var D = (v = this.mapOriginToScreen(t.offset + Math.floor(Y) * t.width + Math.floor(V))).x;
                v = {
                  x: D,
                  y: -(s.A * D + s.C) / s.B,
                };
                u = true;
                console.warn('found and out');
                break;
              }
            }

            for (var F = 0; F < t.width && !(T + F >= N); F++) {
              var W,
                Z = T + F,
                q = Math.floor(p.A * Z + p.C);
              W = t.data[t.offset + Math.floor(q) * t.width + Math.floor(Z)] >>> 3;
              var H = 7 & t.data[t.offset + Math.floor(q) * t.width + Math.floor(Z)];

              if (W == f && 0 != H) {
                var j = (y = this.mapOriginToScreen(t.offset + Math.floor(q) * t.width + Math.floor(Z))).x;
                y = {
                  x: j,
                  y: -(s.A * j + s.C) / s.B,
                };
                c = true;
                console.warn('found and out');
                break;
              }
            }

            if (u && c)
              this.setState({
                leftSplitPoint: v,
                rightSplitPoint: y,
              });
            else this.resetSplitPoint();
          }
        },
      },
      {
        key: 'splitInfoInit',
        value: function () {
          if ('undefined' != this.props.parent) {
            for (var t = 1; t < this.props.parent.props.parent.state.selectBlockList.length; t++)
              if (1 == this.props.parent.props.parent.state.selectBlockList[t]) {
                this.inAction.currentSplitBlock = t;
                break;
              }

            var o = {};

            if ((o = module1245._isVerticalRotate(this.props.mapDeg) ? this.getRotateEdge() : this.getNormalEdge()) && o.res) {
              var n = this.mapOriginToScreen(o.left),
                s = this.mapOriginToScreen(o.right);
              this.setState({
                leftPoint: n,
                rightPoint: s,
                leftSplitPoint: n,
                rightSplitPoint: s,
              });
            }
          }
        },
      },
      {
        key: 'getNormalEdge',
        value: function () {
          for (var t = this.props.parent.props.parent.state.map.data, o = 1024, n = 0, s = {}, l = 0; l < t.width; l++) {
            for (var h = 1024, f = 0, p = 0; p < t.height; p++) {
              var u = t.offset + t.width * p + l;
              if (0 != (7 & t.data[u])) t.data[u] >>> 3 == this.inAction.currentSplitBlock && (p < h && (h = p), p > f && (f = p), l > n && (n = l), l < o && (o = l));
            }

            s[l + '0'] = [h, f];
          }

          this.splitInfo.blockBoarderList = s;
          this.splitInfo.blockBoarder = [o, n];
          var c = Math.floor((this.splitInfo.blockBoarder[0] + this.splitInfo.blockBoarder[1]) / 2);
          if (undefined === this.splitInfo.blockBoarderList || undefined === this.splitInfo.blockBoarderList[c + '0'])
            return {
              res: false,
            };
          var v = this.splitInfo.blockBoarderList[c + '0'][0],
            y = this.splitInfo.blockBoarderList[c + '0'][1];
          return {
            res: true,
            left: c + t.offset + t.width * v,
            right: c + t.offset + t.width * y,
          };
        },
      },
      {
        key: 'getRotateEdge',
        value: function () {
          for (var t = this.props.parent.props.parent.state.map.data, o = 1024, n = 0, s = {}, l = 0; l < t.height; l++) {
            for (var h = 1024, f = 0, p = 0; p < t.width; p++) {
              var u = t.offset + t.width * l + p;
              if (0 != (255 & t.data[u])) t.data[u] >>> 3 == this.inAction.currentSplitBlock && (l < o && (o = l), l > n && (n = l), p > f && (f = p), p < h && (h = p));
            }

            s[l + '0'] = [h, f];
          }

          this.splitInfo.blockBoarderList = s;
          this.splitInfo.blockBoarder = [o, n];
          var c = Math.floor((this.splitInfo.blockBoarder[0] + this.splitInfo.blockBoarder[1]) / 2);
          if (undefined === this.splitInfo.blockBoarderList || undefined === this.splitInfo.blockBoarderList[c + '0'])
            return {
              res: false,
            };
          var v = this.splitInfo.blockBoarderList[c + '0'][0],
            y = this.splitInfo.blockBoarderList[c + '0'][1];
          return {
            res: true,
            left: v + t.offset + t.width * c,
            right: y + t.offset + t.width * c,
          };
        },
      },
      {
        key: 'mapScreenToOriginXY',
        value: function (t) {
          var o = {
              x: t.x,
              y: t.y,
            },
            n = o.x,
            s = o.y,
            l = this.props.parent.props.parent.state.map,
            h = l.height - Math.floor(s) + l.top - l.data.top;
          return {
            x: Math.floor(n) + l.left - l.data.left,
            y: h,
          };
        },
      },
      {
        key: 'mapOriginToScreen',
        value: function (t) {
          var o = this.props.parent.props.parent.state.map,
            n = Math.floor((t - o.data.offset) / o.data.width),
            s = o.height + o.top - n - o.data.top;
          return {
            x: ((t - o.data.offset) % o.data.width) - o.left + o.data.left,
            y: s,
          };
        },
      },
      {
        key: 'resetSplitPoint',
        value: function () {
          this.setState({
            leftSplitPoint: null,
            rightSplitPoint: null,
          });
          globals.showToast(module491.map_edit_split_restriction_point_illegal);
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this.context.theme.displayZones,
            n = this.state.rightPoint.x * this.props.transform.xx,
            s = this.state.rightPoint.y * this.props.transform.yy,
            l = this.state.leftPoint.x * this.props.transform.xx,
            h = this.state.leftPoint.y * this.props.transform.yy,
            f = n >= l + 1 ? l - 1 : n - 1,
            p = s >= h + 1 ? h - 1 : s - 1,
            S = n - f,
            P = s - p,
            x = l - f,
            M = h - p,
            w = Math.abs(n - l) + 30,
            k = Math.abs(s - h) + 30,
            R = S + '',
            B = P + '',
            E = x + '',
            _ = M + '',
            A = w + '',
            L = k + '',
            I = 0,
            N = 0,
            T = 0,
            O = 0,
            C = '',
            V = '',
            Y = '',
            X = '',
            D = '',
            F = '',
            W = {
              x: 0,
              y: 0,
            },
            Z = {
              x: 0,
              y: 0,
            };

          if (null != this.state.rightSplitPoint && null != this.state.leftSplitPoint) {
            W = {
              x: this.state.rightSplitPoint.x * this.props.transform.xx,
              y: this.state.rightSplitPoint.y * this.props.transform.yy,
            };
            Z = {
              x: this.state.leftSplitPoint.x * this.props.transform.xx,
              y: this.state.leftSplitPoint.y * this.props.transform.yy,
            };
            I = W.x >= Z.x + 1 ? Z.x - 1 : W.x - 1;
            N = W.y >= Z.y + 1 ? Z.y - 1 : W.y - 1;
            C = W.x - I + '';
            V = W.y - N + '';
            Y = Z.x - I + '';
            X = Z.y - N + '';
            D = (T = Math.abs(W.x - Z.x) + 30) + '';
            F = (O = Math.abs(W.y - Z.y) + 30) + '';
          }

          var q =
              isNaN(w) || isNaN(k)
                ? React.default.createElement(module12.View, null)
                : React.default.createElement(
                    module12.View,
                    module21.default(
                      {},
                      this.panResponderLeft.panHandlers,
                      {
                        pointerEvents: 'auto',
                      },
                      module387.default.getAccessibilityLabel('left_segment_icon'),
                      {
                        style: [
                          b.endButton,
                          {
                            left: l - 20,
                            top: h - 20,
                          },
                        ],
                      }
                    ),
                    React.default.createElement(
                      module1067.Svg,
                      {
                        height: '40',
                        width: '40',
                      },
                      React.default.createElement(module1067.Circle, {
                        cx: '20',
                        cy: '20',
                        r: '8',
                        stroke: 'white',
                        strokeWidth: '1.5',
                        fill: t.allFBZBorderColor,
                      })
                    )
                  ),
            H =
              isNaN(w) || isNaN(k)
                ? React.default.createElement(module12.View, null)
                : React.default.createElement(
                    module12.View,
                    module21.default(
                      {},
                      this.panResponderRight.panHandlers,
                      {
                        pointerEvents: 'auto',
                      },
                      module387.default.getAccessibilityLabel('right_segment_icon'),
                      {
                        style: [
                          b.endButton,
                          {
                            left: n - 20,
                            top: s - 20,
                          },
                        ],
                      }
                    ),
                    React.default.createElement(
                      module1067.Svg,
                      {
                        height: '40',
                        width: '40',
                      },
                      React.default.createElement(module1067.Circle, {
                        cx: '20',
                        cy: '20',
                        r: '8',
                        stroke: 'white',
                        strokeWidth: '1.5',
                        fill: t.allFBZBorderColor,
                      })
                    )
                  ),
            j =
              isNaN(w) || isNaN(k)
                ? React.default.createElement(module12.View, null)
                : React.default.createElement(
                    module12.View,
                    {
                      pointerEvents: 'none',
                      style: [
                        b.linedash,
                        {
                          left: f,
                          top: p,
                          transform: [
                            {
                              rotateY: module12.I18nManager.isRTL ? '180deg' : '0deg',
                            },
                          ],
                        },
                      ],
                    },
                    React.default.createElement(
                      module1067.Svg,
                      {
                        width: A,
                        height: L,
                      },
                      React.default.createElement(module1067.Line, {
                        x1: E,
                        y1: _,
                        x2: R,
                        y2: B,
                        stroke: t.allFBZBorderColor,
                        strokeWidth: 2,
                        strokeDasharray: ['3', '3'],
                      })
                    )
                  ),
            U =
              null == this.state.leftSplitPoint || null == this.state.rightSplitPoint || isNaN(T) || isNaN(O)
                ? React.default.createElement(module12.View, null)
                : React.default.createElement(
                    module12.View,
                    {
                      pointerEvents: 'none',
                      style: [
                        b.linedash,
                        {
                          left: I,
                          top: N,
                          transform: [
                            {
                              rotateY: module12.I18nManager.isRTL ? '180deg' : '0deg',
                            },
                          ],
                        },
                      ],
                    },
                    React.default.createElement(
                      module1067.Svg,
                      {
                        width: D,
                        height: F,
                      },
                      React.default.createElement(module1067.Line, {
                        x1: Y,
                        y1: X,
                        x2: C,
                        y2: V,
                        stroke: t.allFBZBorderColor,
                        strokeWidth: 4,
                      })
                    )
                  ),
            z = s - h,
            G = n - l,
            J = Math.abs(z),
            K = Math.abs(G),
            Q = Math.sqrt(J * J + K * K) / 2 + 40,
            $ = (l + n) / 2,
            tt = (h + s) / 2,
            et = (z ** G / Math.PI) * 180,
            ot =
              isNaN(w) || isNaN(k)
                ? React.default.createElement(module12.View, null)
                : React.default.createElement(
                    module12.View,
                    module21.default({}, this.panResponderLine.panHandlers, {
                      pointerEvents: 'auto',
                      style: {
                        position: 'absolute',
                        left: $ - Q,
                        top: tt - 15,
                        width: 2 * Q,
                        height: 30,
                        transform: [
                          {
                            rotateZ: et * (module12.I18nManager.isRTL ? -1 : 1) + 'deg',
                          },
                          {
                            translateX: 0,
                          },
                        ],
                      },
                    })
                  );
          return React.default.createElement(
            module12.View,
            {
              pointerEvents: 'box-none',
              style: [
                b.container,
                {
                  width: this.props.width * this.props.transform.xx,
                },
              ],
            },
            j,
            U,
            ot,
            q,
            H
          );
        },
      },
    ]);
    return _;
  })(React.default.Component);

exports.default = B;
B.contextType = module506.AppConfigContext;
B.defaultProps = {
  transform: {
    xx: 1,
    yy: 1,
  },
};
var b = module12.StyleSheet.create({
  container: {
    position: 'absolute',
    overflow: 'visible',
    left: 0,
    top: 0,
    height: 10,
  },
  linedash: {
    position: 'absolute',
    overflow: 'visible',
    top: 0,
    left: 20,
  },
  endButton: {
    position: 'absolute',
    width: 40,
    height: 40,
    overflow: 'visible',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
