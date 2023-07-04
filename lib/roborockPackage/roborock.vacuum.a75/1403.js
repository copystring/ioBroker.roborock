var module22 = require('./22'),
  module23 = require('@babel/runtime/helpers/slicedToArray'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1350 = require('./1350'),
  module391 = require('./391'),
  module1199 = require('./1199'),
  module1200 = require('./1200');

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

var _ = module13.ART.Transform,
  module510 = require('./510').strings,
  module1343 = require('./1343'),
  module1339 = require('./1339'),
  M = (function (t) {
    module9.default(A, t);

    var module1199 = A,
      M = S(),
      b = function () {
        var t,
          n = module12.default(module1199);

        if (M) {
          var o = module12.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module11.default(this, t);
      };

    function A(t) {
      var n;
      module6.default(this, A);

      (n = b.call(this, t))._handleStartShouldSetPanResponder = function () {
        return (
          n.props.mapMode == module1343.MAP_MODE_MAP_EDIT ||
          (module1200.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
            globals.showToast(module510.robot_communication_exception);
          }),
          false)
        );
      };

      n._handlePanResponderStart = function (t, o) {
        n.touch.move = module1339._parseEvent2(t.nativeEvent, o) || {};
        n.needAdjustPoint = false;
        n.setState({
          leftSplitPoint: null,
          rightSplitPoint: null,
        });
      };

      n._handlePanResponderEnd = function (t, o) {
        if (0 === t.nativeEvent.touches.length) n.generateSplitLine();
      };

      n.touch = {
        start: {},
        end: {},
        move: {},
      };
      n.splitInfo = {
        blockBoarderList: {},
        blockBoarder: [],
      };
      n.state = {
        visible: false,
        inSplit: false,
        inMerge: false,
        inNaming: false,
        transform: new _(),
        currentMergeBlocks: [],
        leftPoint: {},
        rightPoint: {},
        leftSplitPoint: {},
        rightSplitPoint: {},
      };
      n.adjustDirecton = {
        left: false,
        right: false,
      };
      return n;
    }

    module7.default(A, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          var t = this;
          this.adjustDirectonInit();
          this.splitInfoInit();
          this.panResponderLeft = module13.PanResponder.create({
            onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
            onMoveShouldSetPanResponder: function () {
              return true;
            },
            onPanResponderStart: this._handlePanResponderStart,
            onPanResponderEnd: this._handlePanResponderEnd,
            onPanResponderMove: function (n, o) {
              var s = t._getMoveXY(n, o);

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
            onPanResponderTerminationRequest: function (t, n) {
              return false;
            },
          });
          this.panResponderRight = module13.PanResponder.create({
            onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
            onMoveShouldSetPanResponder: function () {
              return true;
            },
            onPanResponderStart: this._handlePanResponderStart,
            onPanResponderEnd: this._handlePanResponderEnd,
            onPanResponderMove: function (n, o) {
              var s = t._getMoveXY(n, o);

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
            onPanResponderTerminationRequest: function (t, n) {
              return false;
            },
          });
          this.panResponderLine = module13.PanResponder.create({
            onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
            onMoveShouldSetPanResponder: function () {
              return true;
            },
            onPanResponderStart: this._handlePanResponderStart,
            onPanResponderEnd: this._handlePanResponderEnd,
            onPanResponderMove: function (n, o) {
              var s = t._getMoveXY(n, o);

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
            onPanResponderTerminationRequest: function (t, n) {
              return false;
            },
          });
        },
      },
      {
        key: '_getMoveXY',
        value: function (t, n) {
          var s = [module1339._parseEvent2(t.nativeEvent, n), this.touch.move],
            l = s[0],
            h = s[1];
          if (((this.touch.move = l || {}), !(l && l.x && l.y && h.x))) return null;
          if (l.hasOwnProperty('distance')) return null;

          var u = module1339._parseDegPointWithTrans(l, h, this.props.transform, this.props.mapDeg),
            f = module23.default(u, 2);

          return {
            x: f[0],
            y: f[1],
          };
        },
      },
      {
        key: 'getLeftRightPos',
        value: function () {
          return null == this.state.leftSplitPoint || null == this.state.rightSplitPoint
            ? {
                error: this.needAdjustPoint ? module510.map_edit_split_restriction_point_adjust : module510.map_edit_split_restriction_point_illegal,
              }
            : {
                left: this.state.leftSplitPoint,
                right: this.state.rightSplitPoint,
              };
        },
      },
      {
        key: 'formLine',
        value: function (t, n) {
          var o = 0,
            s = 0,
            l = 0;

          if (t.x == n.x) {
            o = 1;
            s = 0;
            l = t.x;
          } else {
            o = (n.y - t.y) / (n.x - t.x);
            s = -1;
            l = t.y - o * t.x;

            if (Math.abs(o) >= 1) {
              o = 1;
              s = (n.x - t.x) / (n.y - t.y);
              l = t.x - s * t.y;
            }
          }

          return {
            A: o,
            B: s,
            C: l,
          };
        },
      },
      {
        key: 'generateSplitLine',
        value: function () {
          this.adjustDirectonInit();
          var t = this.props.blockID,
            n = this.props.parent.props.parent.state.map,
            s = n.data;
          if (!s || !s.data || s.data.length <= 0) this.resetSplitPoint();
          else {
            var l = function (t, n) {
                return Math.floor(n) * s.width + Math.floor(t);
              },
              h = function (t, n) {
                var o = s.offset + l(t, n);
                return [s.data[o] >>> 3, 7 & s.data[o]];
              },
              u = function (o, s) {
                var l = module1339._getAroundIndexInfo(n, o, s),
                  h = 0;

                l.forEach(function (n) {
                  if (n[0] == t && n[1] > 1) h++;
                });
                return h == l.length;
              },
              f = {
                x: this.state.leftPoint.x,
                y: this.state.leftPoint.y,
              },
              p = {
                x: this.state.rightPoint.x,
                y: this.state.rightPoint.y,
              },
              c = this.formLine(f, p),
              y = module1339._mapScreenToOriginXY(n, f.x, f.y),
              v = module1339._mapScreenToOriginXY(n, p.x, p.y),
              x = this.formLine(v, y),
              P = function (t, n, o) {
                if (o) t = Math.floor(x.B * n + x.C);
                else n = Math.floor(x.A * t + x.C);
                return [t, n];
              },
              S = function (n, s) {
                var l = P(n, s, null == n),
                  u = module23.default(l, 2);
                n = u[0];
                s = u[1];
                var f = h(n, s),
                  p = module23.default(f, 2),
                  c = p[0],
                  y = p[1];
                return c == t && 0 != y;
              },
              _ = function (n, s) {
                var l = P(n, s, null == n),
                  u = module23.default(l, 2);
                n = u[0];
                s = u[1];
                var f = h(n, s),
                  p = module23.default(f, 2),
                  c = p[0],
                  y = p[1];
                return c == t && 1 == y;
              },
              R = false,
              w = false,
              M = {},
              k = {};

            if (1 == Math.abs(x.A)) {
              for (var b = y.y ** v.y, A = y.y ** v.y, D = 0; D < s.height && !(b - D <= A); D++) {
                var T = b - D,
                  j = Math.floor(x.B * T + x.C),
                  N = h(j, T),
                  I = module23.default(N, 2),
                  C = I[0],
                  B = I[1];

                if (C == t && 0 != B) {
                  if (((R = true), 0 == D && (this.adjustDirecton.right = 1 != B ? S(null, b + 1) : u(j, T)), !this.adjustDirecton.right)) {
                    if (1 == B && _(null, T - 1)) continue;

                    var L = (M = module1339._mapOriginXYToScreen(n, j, T)).y;

                    M = {
                      x: c.B * L + c.C,
                      y: L,
                    };
                    console.warn('found and out');
                  }

                  break;
                }
              }

              for (var O = 0; O < s.height && !(A + O >= b); O++) {
                var Y = A + O,
                  X = Math.floor(x.B * Y + x.C),
                  V = h(X, Y),
                  F = module23.default(V, 2),
                  W = F[0],
                  Z = F[1];

                if (W == t && 0 != Z) {
                  if (((w = true), 0 == O && (this.adjustDirecton.left = 1 != Z ? S(null, A - 1) : u(X, Y)), !this.adjustDirecton.left)) {
                    if (1 == Z && _(null, Y + 1)) continue;

                    var q = (k = module1339._mapOriginXYToScreen(n, X, Y)).y;

                    k = {
                      x: c.B * q + c.C,
                      y: q,
                    };
                    console.warn('found and out');
                  }

                  break;
                }
              }

              this.setEndpointResult(R && w, M, k);
            } else {
              for (var H = y.x ** v.x, U = y.x ** v.x, z = 0; z < s.width && !(H - z <= U); z++) {
                var G = H - z,
                  J = Math.floor(x.A * G + x.C),
                  K = h(G, J),
                  Q = module23.default(K, 2),
                  $ = Q[0],
                  tt = Q[1];

                if ($ == t && 0 != tt) {
                  if (((R = true), 0 == z && (this.adjustDirecton.right = 1 != tt ? S(H + 1, null) : u(G, J)), !this.adjustDirecton.right)) {
                    if (1 == tt && _(G - 1, null)) continue;

                    var et = (M = module1339._mapOriginXYToScreen(n, G, J)).x;

                    M = {
                      x: et,
                      y: c.A * et + c.C,
                    };
                    console.warn('found and out');
                  }

                  break;
                }
              }

              for (var nt = 0; nt < s.width && !(U + nt >= H); nt++) {
                var it = U + nt,
                  rt = Math.floor(x.A * it + x.C),
                  ot = h(it, rt),
                  at = module23.default(ot, 2),
                  st = at[0],
                  lt = at[1];

                if (st == t && 0 != lt) {
                  if (((w = true), 0 == nt && (this.adjustDirecton.left = 1 != lt ? S(U - 1, null) : u(it, rt)), !this.adjustDirecton.left)) {
                    if (1 == lt && _(it + 1, null)) continue;

                    var ht = (k = module1339._mapOriginXYToScreen(n, it, rt)).x;

                    k = {
                      x: ht,
                      y: c.A * ht + c.C,
                    };
                    console.warn('found and out');
                  }

                  break;
                }
              }

              this.setEndpointResult(R && w, M, k);
            }
          }
        },
      },
      {
        key: 'splitLineEndpointValid',
        value: function (t, n) {
          var o = function (t) {
            return null != t && undefined !== t && !isNaN(t);
          };

          return !this.adjustDirecton.left && !this.adjustDirecton.right && !!(o(t.x) && o(t.y) && o(n.x) && o(n.y)) && (t.x != n.x || t.y != n.y);
        },
      },
      {
        key: 'setEndpointResult',
        value: function (t, n, o) {
          if (t)
            this.splitLineEndpointValid(n, o)
              ? this.setState({
                  leftSplitPoint: n,
                  rightSplitPoint: o,
                })
              : this.showAdjustPoint();
          else this.resetSplitPoint();
        },
      },
      {
        key: 'adjustDirectonInit',
        value: function () {
          this.adjustDirecton.left = false;
          this.adjustDirecton.right = false;
        },
      },
      {
        key: 'splitInfoInit',
        value: function () {
          var t = {};
          if (this.props.touchPt) t = this.getTouchEdge(this.props.touchPt);
          else {
            var n = this.props.parent.props.parent.state.map,
              o = (null == n ? undefined : n.centerInfo[this.props.blockID]) || null;

            if (n && o && o.maxX && o.maxY) {
              var s = {
                  x: (o.maxX + o.minX) / 2,
                  y: (o.minY + o.maxY) / 2,
                },
                l = module1339._mapRectXYToOrigin(n, s.x, s.y);

              t = this.getTouchEdge(l);
            }
          }

          if (t && t.res) {
            var h = this.props.parent.props.parent.state.map,
              u = module1339._mapOriginXYToScreen(h, t.left.x, t.left.y),
              f = module1339._mapOriginXYToScreen(h, t.right.x, t.right.y);

            this.setState({
              leftPoint: u,
              rightPoint: f,
              leftSplitPoint: u,
              rightSplitPoint: f,
            });
          }
        },
      },
      {
        key: 'getTouchEdge',
        value: function (t) {
          for (var n = this.props.parent.props.parent.state.map.data, o = 1024, s = 0, l = 1024, h = 0, u = 0; u < n.height; u++) {
            var f = n.offset + n.width * u + t.x;
            if (0 != (7 & n.data[f])) n.data[f] >>> 3 == this.props.blockID && (u < l && (l = u), u > h && (h = u));
          }

          for (var p = 0; p < n.width; p++) {
            var c = n.offset + n.width * t.y + p;
            if (0 != (255 & n.data[c])) n.data[c] >>> 3 == this.props.blockID && (p > s && (s = p), p < o && (o = p));
          }

          return Math.abs(l - h) > Math.abs(o - s)
            ? {
                res: true,
                left: {
                  x: o,
                  y: t.y,
                },
                right: {
                  x: s,
                  y: t.y,
                },
              }
            : {
                res: true,
                left: {
                  x: t.x,
                  y: l,
                },
                right: {
                  x: t.x,
                  y: h,
                },
              };
        },
      },
      {
        key: 'resetSplitPoint',
        value: function () {
          this.needAdjustPoint = false;
          this.setState({
            leftSplitPoint: null,
            rightSplitPoint: null,
          });
          globals.showToast(module510.map_edit_split_restriction_point_illegal);
        },
      },
      {
        key: 'showAdjustPoint',
        value: function () {
          this.needAdjustPoint = true;
          globals.showToast(module510.map_edit_split_restriction_point_adjust);
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this.context.theme.displayZones,
            o = this.state.rightPoint.x * this.props.transform.xx,
            s = this.state.rightPoint.y * this.props.transform.yy,
            l = this.state.leftPoint.x * this.props.transform.xx,
            h = this.state.leftPoint.y * this.props.transform.yy,
            u = o >= l + 1 ? l - 1 : o - 1,
            f = s >= h + 1 ? h - 1 : s - 1,
            x = o - u,
            P = s - f,
            S = l - u,
            _ = h - f,
            R = Math.abs(o - l) + 30,
            w = Math.abs(s - h) + 30,
            E = x + '',
            M = P + '',
            b = S + '',
            A = _ + '',
            D = R + '',
            T = w + '',
            j = 0,
            N = 0,
            I = 0,
            C = 0,
            B = '',
            L = '',
            O = '',
            Y = '',
            X = '',
            V = '',
            F = {
              x: 0,
              y: 0,
            },
            W = {
              x: 0,
              y: 0,
            };

          if (null != this.state.rightSplitPoint && null != this.state.leftSplitPoint) {
            F = {
              x: this.state.rightSplitPoint.x * this.props.transform.xx,
              y: this.state.rightSplitPoint.y * this.props.transform.yy,
            };
            W = {
              x: this.state.leftSplitPoint.x * this.props.transform.xx,
              y: this.state.leftSplitPoint.y * this.props.transform.yy,
            };
            j = F.x >= W.x + 1 ? W.x - 1 : F.x - 1;
            N = F.y >= W.y + 1 ? W.y - 1 : F.y - 1;
            B = F.x - j + '';
            L = F.y - N + '';
            O = W.x - j + '';
            Y = W.y - N + '';
            X = (I = Math.abs(F.x - W.x) + 30) + '';
            V = (C = Math.abs(F.y - W.y) + 30) + '';
          }

          var Z =
              isNaN(R) || isNaN(w)
                ? React.default.createElement(module13.View, null)
                : React.default.createElement(
                    module13.View,
                    module22.default(
                      {},
                      this.panResponderLeft.panHandlers,
                      {
                        pointerEvents: 'auto',
                      },
                      module391.default.getAccessibilityLabel('left_segment_icon'),
                      {
                        style: [
                          k.endButton,
                          {
                            left: l - 20,
                            top: h - 20,
                          },
                        ],
                      }
                    ),
                    React.default.createElement(
                      module1350.Svg,
                      {
                        height: '40',
                        width: '40',
                      },
                      React.default.createElement(module1350.Circle, {
                        cx: '20',
                        cy: '20',
                        r: '8',
                        stroke: 'white',
                        strokeWidth: '1.5',
                        fill: t.allFBZBorderColor,
                      })
                    )
                  ),
            q =
              isNaN(R) || isNaN(w)
                ? React.default.createElement(module13.View, null)
                : React.default.createElement(
                    module13.View,
                    module22.default(
                      {},
                      this.panResponderRight.panHandlers,
                      {
                        pointerEvents: 'auto',
                      },
                      module391.default.getAccessibilityLabel('right_segment_icon'),
                      {
                        style: [
                          k.endButton,
                          {
                            left: o - 20,
                            top: s - 20,
                          },
                        ],
                      }
                    ),
                    React.default.createElement(
                      module1350.Svg,
                      {
                        height: '40',
                        width: '40',
                      },
                      React.default.createElement(module1350.Circle, {
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
              isNaN(R) || isNaN(w)
                ? React.default.createElement(module13.View, null)
                : React.default.createElement(
                    module13.View,
                    {
                      pointerEvents: 'none',
                      style: [
                        k.linedash,
                        {
                          left: u,
                          top: f,
                          transform: [
                            {
                              rotateY: module13.I18nManager.isRTL ? '180deg' : '0deg',
                            },
                          ],
                        },
                      ],
                    },
                    React.default.createElement(
                      module1350.Svg,
                      {
                        width: D,
                        height: T,
                      },
                      React.default.createElement(module1350.Line, {
                        x1: b,
                        y1: A,
                        x2: E,
                        y2: M,
                        stroke: t.allFBZBorderColor,
                        strokeWidth: 2,
                        strokeDasharray: ['3', '3'],
                      })
                    )
                  ),
            U =
              null == this.state.leftSplitPoint || null == this.state.rightSplitPoint || isNaN(I) || isNaN(C)
                ? React.default.createElement(module13.View, null)
                : React.default.createElement(
                    module13.View,
                    {
                      pointerEvents: 'none',
                      style: [
                        k.linedash,
                        {
                          left: j,
                          top: N,
                          transform: [
                            {
                              rotateY: module13.I18nManager.isRTL ? '180deg' : '0deg',
                            },
                          ],
                        },
                      ],
                    },
                    React.default.createElement(
                      module1350.Svg,
                      {
                        width: X,
                        height: V,
                      },
                      React.default.createElement(module1350.Line, {
                        x1: O,
                        y1: Y,
                        x2: B,
                        y2: L,
                        stroke: t.allFBZBorderColor,
                        strokeWidth: 4,
                      })
                    )
                  ),
            z = s - h,
            G = o - l,
            J = Math.abs(z),
            K = Math.abs(G),
            Q = Math.sqrt(J * J + K * K) / 2 + 40,
            $ = (l + o) / 2,
            tt = (h + s) / 2,
            et = (z ** G / Math.PI) * 180,
            nt =
              isNaN(R) || isNaN(w)
                ? React.default.createElement(module13.View, null)
                : React.default.createElement(
                    module13.View,
                    module22.default({}, this.panResponderLine.panHandlers, {
                      pointerEvents: 'auto',
                      style: {
                        position: 'absolute',
                        left: $ - Q,
                        top: tt - 15,
                        width: 2 * Q,
                        height: 30,
                        transform: [
                          {
                            rotateZ: et * (module13.I18nManager.isRTL ? -1 : 1) + 'deg',
                          },
                          {
                            translateX: 0,
                          },
                        ],
                      },
                    })
                  );
          return React.default.createElement(
            module13.View,
            {
              pointerEvents: 'box-none',
              style: [
                k.container,
                {
                  width: this.props.width * this.props.transform.xx,
                },
              ],
            },
            H,
            U,
            nt,
            Z,
            q
          );
        },
      },
    ]);
    return A;
  })(React.default.Component);

exports.default = M;
M.contextType = module1199.AppConfigContext;
M.defaultProps = {
  blockID: -1,
  touchPt: null,
  transform: {
    xx: 1,
    yy: 1,
  },
};
var k = module13.StyleSheet.create({
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
