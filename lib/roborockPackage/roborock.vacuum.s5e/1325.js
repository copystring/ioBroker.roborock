var module22 = require('./22'),
  module23 = require('@babel/runtime/helpers/slicedToArray'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1272 = require('./1272'),
  module391 = require('./391'),
  module1121 = require('./1121'),
  module1122 = require('./1122');

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

var _ = module12.ART.Transform,
  module505 = require('./505').strings,
  module1265 = require('./1265'),
  module1261 = require('./1261'),
  E = (function (t) {
    module7.default(B, t);

    var module1121 = B,
      E = S(),
      M = function () {
        var t,
          n = module11.default(module1121);

        if (E) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function B(t) {
      var n;
      module4.default(this, B);

      (n = M.call(this, t))._handleStartShouldSetPanResponder = function () {
        return (
          n.props.mapMode == module1265.MAP_MODE_MAP_EDIT ||
          (module1122.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
            globals.showToast(module505.robot_communication_exception);
          }),
          false)
        );
      };

      n._handlePanResponderStart = function (t, o) {
        n.touch.move = module1261._parseEvent2(t.nativeEvent, o) || {};
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
      n.inAction = {
        left: false,
        right: true,
        currentSplitBlock: -1,
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

    module5.default(B, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          var t = this;
          this.adjustDirectonInit();
          this.splitInfoInit();
          this.panResponderLeft = module12.PanResponder.create({
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
          this.panResponderRight = module12.PanResponder.create({
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
          this.panResponderLine = module12.PanResponder.create({
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
          var s = [module1261._parseEvent2(t.nativeEvent, n), this.touch.move],
            l = s[0],
            h = s[1];
          if (((this.touch.move = l || {}), !(l && l.x && l.y && h.x))) return null;
          if (l.hasOwnProperty('distance')) return null;

          var u = module1261._parseDegPointWithTrans(l, h, this.props.transform, this.props.mapDeg),
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
                error: this.needAdjustPoint ? module505.map_edit_split_restriction_point_adjust : module505.map_edit_split_restriction_point_illegal,
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
          var t = this.inAction.currentSplitBlock,
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
                var l = module1261._getAroundIndexInfo(n, o, s),
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
              v = module1261._mapScreenToOriginXY(n, f.x, f.y),
              y = module1261._mapScreenToOriginXY(n, p.x, p.y),
              P = this.formLine(y, v),
              x = function (t, n, o) {
                if (o) t = Math.floor(P.B * n + P.C);
                else n = Math.floor(P.A * t + P.C);
                return [t, n];
              },
              S = function (n, s) {
                var l = x(n, s, null == n),
                  u = module23.default(l, 2);
                n = u[0];
                s = u[1];
                var f = h(n, s),
                  p = module23.default(f, 2),
                  c = p[0],
                  v = p[1];
                return c == t && 0 != v;
              },
              _ = function (n, s) {
                var l = x(n, s, null == n),
                  u = module23.default(l, 2);
                n = u[0];
                s = u[1];
                var f = h(n, s),
                  p = module23.default(f, 2),
                  c = p[0],
                  v = p[1];
                return c == t && 1 == v;
              },
              k = false,
              R = false,
              E = {},
              b = {};

            if (1 == Math.abs(P.A)) {
              for (var M = v.y ** y.y, B = v.y ** y.y, A = 0; A < s.height && !(M - A <= B); A++) {
                var I = M - A,
                  L = Math.floor(P.B * I + P.C),
                  N = h(L, I),
                  j = module23.default(N, 2),
                  D = j[0],
                  T = j[1];

                if (D == t && 0 != T) {
                  if (((k = true), 0 == A && (this.adjustDirecton.right = 1 != T ? S(null, M + 1) : u(L, I)), !this.adjustDirecton.right)) {
                    if (1 == T && _(null, I - 1)) continue;

                    var C = (E = module1261._mapOriginXYToScreen(n, L, I)).y;

                    E = {
                      x: c.B * C + c.C,
                      y: C,
                    };
                    console.warn('found and out');
                  }

                  break;
                }
              }

              for (var O = 0; O < s.height && !(B + O >= M); O++) {
                var V = B + O,
                  Y = Math.floor(P.B * V + P.C),
                  X = h(Y, V),
                  F = module23.default(X, 2),
                  W = F[0],
                  Z = F[1];

                if (W == t && 0 != Z) {
                  if (((R = true), 0 == O && (this.adjustDirecton.left = 1 != Z ? S(null, B - 1) : u(Y, V)), !this.adjustDirecton.left)) {
                    if (1 == Z && _(null, V + 1)) continue;

                    var q = (b = module1261._mapOriginXYToScreen(n, Y, V)).y;

                    b = {
                      x: c.B * q + c.C,
                      y: q,
                    };
                    console.warn('found and out');
                  }

                  break;
                }
              }

              this.setEndpointResult(k && R, E, b);
            } else {
              for (var H = v.x ** y.x, U = v.x ** y.x, z = 0; z < s.width && !(H - z <= U); z++) {
                var G = H - z,
                  J = Math.floor(P.A * G + P.C),
                  K = h(G, J),
                  Q = module23.default(K, 2),
                  $ = Q[0],
                  tt = Q[1];

                if ($ == t && 0 != tt) {
                  if (((k = true), 0 == z && (this.adjustDirecton.right = 1 != tt ? S(H + 1, null) : u(G, J)), !this.adjustDirecton.right)) {
                    if (1 == tt && _(G - 1, null)) continue;

                    var et = (E = module1261._mapOriginXYToScreen(n, G, J)).x;

                    E = {
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
                  ot = Math.floor(P.A * it + P.C),
                  rt = h(it, ot),
                  at = module23.default(rt, 2),
                  st = at[0],
                  lt = at[1];

                if (st == t && 0 != lt) {
                  if (((R = true), 0 == nt && (this.adjustDirecton.left = 1 != lt ? S(U - 1, null) : u(it, ot)), !this.adjustDirecton.left)) {
                    if (1 == lt && _(it + 1, null)) continue;

                    var ht = (b = module1261._mapOriginXYToScreen(n, it, ot)).x;

                    b = {
                      x: ht,
                      y: c.A * ht + c.C,
                    };
                    console.warn('found and out');
                  }

                  break;
                }
              }

              this.setEndpointResult(k && R, E, b);
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
          this.inAction.currentSplitBlock = this.props.blockID;
          var t = {};

          if ((t = module1261._isVerticalRotate(this.props.mapDeg) ? this.getRotateEdge() : this.getNormalEdge()) && t.res) {
            var n = this.props.parent.props.parent.state.map,
              o = module1261._mapOriginXYToScreen(n, t.left.x, t.left.y),
              s = module1261._mapOriginXYToScreen(n, t.right.x, t.right.y);

            this.setState({
              leftPoint: o,
              rightPoint: s,
              leftSplitPoint: o,
              rightSplitPoint: s,
            });
          }
        },
      },
      {
        key: 'getNormalEdge',
        value: function () {
          for (var t = this.props.parent.props.parent.state.map.data, n = 1024, o = 0, s = {}, l = 0; l < t.width; l++) {
            for (var h = 1024, u = 0, f = 0; f < t.height; f++) {
              var p = t.offset + t.width * f + l;
              if (0 != (7 & t.data[p])) t.data[p] >>> 3 == this.inAction.currentSplitBlock && (f < h && (h = f), f > u && (u = f), l > o && (o = l), l < n && (n = l));
            }

            s[l + '0'] = [h, u];
          }

          this.splitInfo.blockBoarderList = s;
          this.splitInfo.blockBoarder = [n, o];
          var c = Math.floor((this.splitInfo.blockBoarder[0] + this.splitInfo.blockBoarder[1]) / 2);
          return undefined === this.splitInfo.blockBoarderList || undefined === this.splitInfo.blockBoarderList[c + '0']
            ? {
                res: false,
              }
            : {
                res: true,
                left: {
                  x: c,
                  y: this.splitInfo.blockBoarderList[c + '0'][0],
                },
                right: {
                  x: c,
                  y: this.splitInfo.blockBoarderList[c + '0'][1],
                },
              };
        },
      },
      {
        key: 'getRotateEdge',
        value: function () {
          for (var t = this.props.parent.props.parent.state.map.data, n = 1024, o = 0, s = {}, l = 0; l < t.height; l++) {
            for (var h = 1024, u = 0, f = 0; f < t.width; f++) {
              var p = t.offset + t.width * l + f;
              if (0 != (255 & t.data[p])) t.data[p] >>> 3 == this.inAction.currentSplitBlock && (l < n && (n = l), l > o && (o = l), f > u && (u = f), f < h && (h = f));
            }

            s[l + '0'] = [h, u];
          }

          this.splitInfo.blockBoarderList = s;
          this.splitInfo.blockBoarder = [n, o];
          var c = Math.floor((this.splitInfo.blockBoarder[0] + this.splitInfo.blockBoarder[1]) / 2);
          return undefined === this.splitInfo.blockBoarderList || undefined === this.splitInfo.blockBoarderList[c + '0']
            ? {
                res: false,
              }
            : {
                res: true,
                left: {
                  x: this.splitInfo.blockBoarderList[c + '0'][0],
                  y: c,
                },
                right: {
                  x: this.splitInfo.blockBoarderList[c + '0'][1],
                  y: c,
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
          globals.showToast(module505.map_edit_split_restriction_point_illegal);
        },
      },
      {
        key: 'showAdjustPoint',
        value: function () {
          this.needAdjustPoint = true;
          globals.showToast(module505.map_edit_split_restriction_point_adjust);
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
            P = o - u,
            x = s - f,
            S = l - u,
            _ = h - f,
            k = Math.abs(o - l) + 30,
            R = Math.abs(s - h) + 30,
            w = P + '',
            E = x + '',
            M = S + '',
            B = _ + '',
            A = k + '',
            I = R + '',
            L = 0,
            N = 0,
            j = 0,
            D = 0,
            T = '',
            C = '',
            O = '',
            V = '',
            Y = '',
            X = '',
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
            L = F.x >= W.x + 1 ? W.x - 1 : F.x - 1;
            N = F.y >= W.y + 1 ? W.y - 1 : F.y - 1;
            T = F.x - L + '';
            C = F.y - N + '';
            O = W.x - L + '';
            V = W.y - N + '';
            Y = (j = Math.abs(F.x - W.x) + 30) + '';
            X = (D = Math.abs(F.y - W.y) + 30) + '';
          }

          var Z =
              isNaN(k) || isNaN(R)
                ? React.default.createElement(module12.View, null)
                : React.default.createElement(
                    module12.View,
                    module22.default(
                      {},
                      this.panResponderLeft.panHandlers,
                      {
                        pointerEvents: 'auto',
                      },
                      module391.default.getAccessibilityLabel('left_segment_icon'),
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
                      module1272.Svg,
                      {
                        height: '40',
                        width: '40',
                      },
                      React.default.createElement(module1272.Circle, {
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
              isNaN(k) || isNaN(R)
                ? React.default.createElement(module12.View, null)
                : React.default.createElement(
                    module12.View,
                    module22.default(
                      {},
                      this.panResponderRight.panHandlers,
                      {
                        pointerEvents: 'auto',
                      },
                      module391.default.getAccessibilityLabel('right_segment_icon'),
                      {
                        style: [
                          b.endButton,
                          {
                            left: o - 20,
                            top: s - 20,
                          },
                        ],
                      }
                    ),
                    React.default.createElement(
                      module1272.Svg,
                      {
                        height: '40',
                        width: '40',
                      },
                      React.default.createElement(module1272.Circle, {
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
              isNaN(k) || isNaN(R)
                ? React.default.createElement(module12.View, null)
                : React.default.createElement(
                    module12.View,
                    {
                      pointerEvents: 'none',
                      style: [
                        b.linedash,
                        {
                          left: u,
                          top: f,
                          transform: [
                            {
                              rotateY: module12.I18nManager.isRTL ? '180deg' : '0deg',
                            },
                          ],
                        },
                      ],
                    },
                    React.default.createElement(
                      module1272.Svg,
                      {
                        width: A,
                        height: I,
                      },
                      React.default.createElement(module1272.Line, {
                        x1: M,
                        y1: B,
                        x2: w,
                        y2: E,
                        stroke: t.allFBZBorderColor,
                        strokeWidth: 2,
                        strokeDasharray: ['3', '3'],
                      })
                    )
                  ),
            U =
              null == this.state.leftSplitPoint || null == this.state.rightSplitPoint || isNaN(j) || isNaN(D)
                ? React.default.createElement(module12.View, null)
                : React.default.createElement(
                    module12.View,
                    {
                      pointerEvents: 'none',
                      style: [
                        b.linedash,
                        {
                          left: L,
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
                      module1272.Svg,
                      {
                        width: Y,
                        height: X,
                      },
                      React.default.createElement(module1272.Line, {
                        x1: O,
                        y1: V,
                        x2: T,
                        y2: C,
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
              isNaN(k) || isNaN(R)
                ? React.default.createElement(module12.View, null)
                : React.default.createElement(
                    module12.View,
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
            H,
            U,
            nt,
            Z,
            q
          );
        },
      },
    ]);
    return B;
  })(React.default.Component);

exports.default = E;
E.contextType = module1121.AppConfigContext;
E.defaultProps = {
  blockID: -1,
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
