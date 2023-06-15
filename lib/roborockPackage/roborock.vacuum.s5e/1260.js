var module23 = require('@babel/runtime/helpers/slicedToArray'),
  module22 = require('./22'),
  module12 = require('./12'),
  module1057 = require('./1057'),
  module1261 = require('./1261'),
  T = {
    PanTypeMove: 1,
    PanTypeScale: 2,
    PanTypeRotate: 4,
    PanTypeMoveWall: 8,
    PanTypeDragEnd: 16,
    PanTypeDelete: 32,
  };

exports.RectPanType = T;

var p = (function () {
  function t(n) {
    module4.default(this, t);
    this.touch = {
      start: {},
      end: {},
      move: {},
      interval: -1,
    };
    this.scale = {
      dx: 0,
      dy: 0,
    };
    this.wallEnd = {
      x: 0,
      y: 0,
    };
    this.rotateTrans = {
      realLTX: 0,
      realLTY: 0,
      realRDX: 0,
      realRDY: 0,
      realLDX: 0,
      realLDY: 0,
      targetVectorX: 0,
      targetVectorY: 0,
      widthVsign: new Array(0, 0, 0),
      heightVsign: new Array(0, 0, 0),
      signwRD: 0,
      signhRD: 0,
      diagnal: 0,
      ltBaseAngle: 0,
    };
    this.callBack = {
      updateRect: null,
      updateAngle: null,
      updatePosition: null,
      getInfo: null,
      onShouldStart: null,
      onTouchStart: null,
      onTouchEnd: null,
      onShouldTwoFinger: null,
      onTouchMove: null,
      onTouchDelete: null,
    };
    this.rectPanType = n;
  }

  module5.default(t, [
    {
      key: 'registerPanResponder',
      value: function (t) {
        if (t && 'object' == typeof t) module22.default(this.callBack, t);

        this._initPanResponder();
      },
    },
    {
      key: '_initPanResponder',
      value: function () {
        var t = this;

        if (this.rectPanType & T.PanTypeMove || this.rectPanType & T.PanTypeMoveWall) {
          this.wallMove = this.rectPanType & T.PanTypeMoveWall;
          this.panResponder = module12.PanResponder.create({
            onStartShouldSetPanResponder: function () {
              return !(t.callBack.onShouldStart && !t.callBack.onShouldStart());
            },
            onMoveShouldSetPanResponder: function () {
              return false;
            },
            onPanResponderStart: function (n, o) {
              t.touch.move = module1261._parseEvent2(n.nativeEvent, o) || {};
              if (!(null == t.callBack.onTouchStart)) t.callBack.onTouchStart(t.wallMove ? T.PanTypeMoveWall : T.PanTypeMove);
            },
            onPanResponderEnd: function (n, o) {
              if (0 === n.nativeEvent.touches.length) null == t.callBack.onTouchEnd || t.callBack.onTouchEnd(t.wallMove ? T.PanTypeMoveWall : T.PanTypeMove);
            },
            onPanResponderMove: function (n, o) {
              if (!t.callBack.onShouldMove || t.callBack.onShouldMove()) {
                var l = [module1261._parseEvent2(n.nativeEvent, o), t.touch.move],
                  s = l[0],
                  c = l[1];
                t.touch.move = s || {};
                if (s) t.wallMove ? t._moveLine(s, c) : t._moveRect(s, c);
              }
            },
            onPanResponderTerminationRequest: function (t, n) {
              return false;
            },
          });
        }

        if (this.rectPanType & T.PanTypeScale)
          this.panResponderScale = module12.PanResponder.create({
            onStartShouldSetPanResponder: function () {
              return true;
            },
            onMoveShouldSetPanResponder: function () {
              return true;
            },
            onPanResponderStart: function (n, o) {
              if (!(n.nativeEvent.touches.length > 1)) {
                var l = module1261._parseMove(n.nativeEvent, o) || {};
                t.scale.dx = l.x;
                t.scale.dy = l.y;
                var s = null == t.callBack.getInfo ? undefined : t.callBack.getInfo();

                if (s) {
                  var c = s.rectSize;

                  if (c) {
                    t.rotateTrans.midX = c.x + c.width / 2;
                    t.rotateTrans.midY = c.y + c.height / 2;
                    var h = s.slopeAngle,
                      p = h + (c.height ** c.width - Math.PI);
                    t.rotateTrans.diagnal = Math.sqrt(c.width ** 2 + c.height ** 2);
                    t.rotateTrans.realLTX = t.rotateTrans.midX + (t.rotateTrans.diagnal / 2) * Math.cos(p);
                    t.rotateTrans.realLTY = t.rotateTrans.midY + (t.rotateTrans.diagnal / 2) * Math.sin(p);
                    t.rotateTrans.realRDX = 2 * t.rotateTrans.midX - t.rotateTrans.realLTX;
                    t.rotateTrans.realRDY = 2 * t.rotateTrans.midY - t.rotateTrans.realLTY;
                    t.rotateTrans.targetVectorX = Math.cos(h);
                    t.rotateTrans.targetVectorY = Math.sin(h);
                    t.rotateTrans.targetVectorHX = Math.cos(h + Math.PI / 2);
                    t.rotateTrans.targetVectorHY = Math.sin(h + Math.PI / 2);
                    t.rotateTrans.widthVsign = module1261._pointVectorToLine(
                      t.rotateTrans.realLTX,
                      t.rotateTrans.realLTY,
                      t.rotateTrans.targetVectorX,
                      t.rotateTrans.targetVectorY
                    );
                    t.rotateTrans.heightVsign = module1261._pointVectorToLine(
                      t.rotateTrans.realLTX,
                      t.rotateTrans.realLTY,
                      t.rotateTrans.targetVectorHX,
                      t.rotateTrans.targetVectorHY
                    );
                    t.rotateTrans.signwRD = t.rotateTrans.realRDX * t.rotateTrans.widthVsign[0] + t.rotateTrans.realRDY * t.rotateTrans.widthVsign[1] + t.rotateTrans.widthVsign[2];
                    t.rotateTrans.signhRD =
                      t.rotateTrans.realRDX * t.rotateTrans.heightVsign[0] + t.rotateTrans.realRDY * t.rotateTrans.heightVsign[1] + t.rotateTrans.heightVsign[2];
                    if (!(null == t.callBack.onTouchStart)) t.callBack.onTouchStart(T.PanTypeScale);
                  }
                }
              }
            },
            onPanResponderEnd: function (n, o) {
              if (0 === n.nativeEvent.touches.length) null == t.callBack.onTouchEnd || t.callBack.onTouchEnd(T.PanTypeScale);
            },
            onPanResponderMove: function (o, l) {
              if (!(o.nativeEvent.touches.length > 1)) {
                o = module1261._parseMove(o.nativeEvent, l) || {};
                var s = null == t.callBack.getInfo ? undefined : t.callBack.getInfo();

                if (s) {
                  var c = s.rectSize;

                  if (c) {
                    var h = {
                        x: t.scale.dx,
                        y: t.scale.dy,
                      },
                      T = module1261._parseDegPointWithTrans(o, h, s.trans, s.mapDeg),
                      p = module23.default(T, 2),
                      v = p[0],
                      f = p[1];

                    t.scale.dx = o.x;
                    t.scale.dy = o.y;
                    var R = null;

                    if (s.mapDeg % 360 == 0 && 0 === s.slopeAngle) {
                      var P = v + c.width,
                        y = f + c.height,
                        M = t._justifyRateXY(P, y),
                        S = module23.default(M, 3);

                      P = S[0];
                      y = S[1];
                      R = {
                        width: P,
                        height: y,
                      };
                    } else {
                      var k = t.rotateTrans.realRDX + v,
                        D = t.rotateTrans.realRDY + f,
                        B = Math.sqrt((k - t.rotateTrans.realLTX) ** 2 + (D - t.rotateTrans.realLTY) ** 2),
                        w = (k - t.rotateTrans.realLTX) * t.rotateTrans.targetVectorX + (D - t.rotateTrans.realLTY) * t.rotateTrans.targetVectorY,
                        E = Math.sqrt(B ** 2 - w ** 2),
                        x = t._justifyRateXY(w, E),
                        X = module23.default(x, 3);

                      if (((w = X[0]), (E = X[1]), X[2])) {
                        var Y = E ** w,
                          L = module1261._regularAngle(s.slopeAngle + Y);

                        t.rotateTrans.diagnal = Math.sqrt(w ** 2 + E ** 2);
                        t.rotateTrans.realRDX = t.rotateTrans.realLTX + Math.cos(L) * t.rotateTrans.diagnal;
                        t.rotateTrans.realRDY = t.rotateTrans.realLTY + Math.sin(L) * t.rotateTrans.diagnal;
                      } else {
                        t.rotateTrans.diagnal = B;
                        t.rotateTrans.realRDX = k;
                        t.rotateTrans.realRDY = D;
                      }

                      var V = t.rotateTrans.realRDX * t.rotateTrans.widthVsign[0] + t.rotateTrans.realRDY * t.rotateTrans.widthVsign[1] + t.rotateTrans.widthVsign[2],
                        _ = t.rotateTrans.realRDX * t.rotateTrans.heightVsign[0] + t.rotateTrans.realRDY * t.rotateTrans.heightVsign[1] + t.rotateTrans.heightVsign[2];

                      if (t.rotateTrans.signwRD * V <= 0 || t.rotateTrans.signhRD * _ <= 0) return;
                      R = {
                        x: (t.rotateTrans.realRDX + t.rotateTrans.realLTX) / 2 - w / 2,
                        y: (t.rotateTrans.realRDY + t.rotateTrans.realLTY) / 2 - E / 2,
                        width: w,
                        height: E,
                      };
                    }

                    if (R) null == t.callBack.updateRect || t.callBack.updateRect(R);
                  }
                }
              }
            },
            onPanResponderTerminationRequest: function (t, n) {
              return false;
            },
          });
        if (this.rectPanType & T.PanTypeRotate)
          this.panResponderRotate = module12.PanResponder.create({
            onStartShouldSetPanResponder: function () {
              return true;
            },
            onMoveShouldSetPanResponder: function () {
              return true;
            },
            onPanResponderStart: function (n, o) {
              if (!(n.nativeEvent.touches.length > 1)) {
                var l = null == t.callBack.getInfo ? undefined : t.callBack.getInfo();

                if (l) {
                  var s = l.rectSize;

                  if (s) {
                    if (!(null == t.callBack.onTouchStart)) t.callBack.onTouchStart(T.PanTypeRotate);
                    t.rotateTrans.midX = s.x + s.width / 2;
                    t.rotateTrans.midY = s.y + s.height / 2;
                    t.rotateTrans.ltBaseAngle = s.height ** s.width;
                    var c = Math.sqrt(s.width ** 2 + s.height ** 2),
                      h = l.slopeAngle - t.rotateTrans.ltBaseAngle;
                    t.rotateTrans.realLDX = t.rotateTrans.midX + (c / 2) * Math.cos(h);
                    t.rotateTrans.realLDY = t.rotateTrans.midY + (c / 2) * Math.sin(h);
                  }
                }
              }
            },
            onPanResponderEnd: function (n, o) {
              if (0 === n.nativeEvent.touches.length) null == t.callBack.onTouchEnd || t.callBack.onTouchEnd(T.PanTypeRotate);
            },
            onPanResponderMove: function (o, l) {
              if (!(o.nativeEvent.touches.length > 1)) {
                var s = module1261._parseMove2(o.nativeEvent, l) || {},
                  c = null == t.callBack.getInfo ? undefined : t.callBack.getInfo();

                if (c) {
                  var h = module1261._parseDegPointWithTrans(
                      s,
                      {
                        x: 0,
                        y: 0,
                      },
                      c.trans,
                      c.mapDeg
                    ),
                    p = module23.default(h, 2),
                    v = p[0],
                    f = p[1];

                  if (!(Math.abs(v) < 0.4 && Math.abs(f) < 0.4)) {
                    if (!(null == t.callBack.onTouchMove)) t.callBack.onTouchMove(T.PanTypeRotate);
                    var R = t.rotateTrans.realLDX + v,
                      P = t.rotateTrans.realLDY + f,
                      y = (P - t.rotateTrans.midY) ** (R - t.rotateTrans.midX) + t.rotateTrans.ltBaseAngle;
                    if (!(null == t.callBack.updateAngle)) t.callBack.updateAngle(y);
                  }
                }
              }
            },
            onPanResponderTerminationRequest: function (t, n) {
              return false;
            },
          });
        if (this.rectPanType & T.PanTypeDragEnd)
          this.panResponderDragEnd = module12.PanResponder.create({
            onStartShouldSetPanResponder: function () {
              return true;
            },
            onMoveShouldSetPanResponder: function () {
              return true;
            },
            onPanResponderStart: function (n, o) {
              if (!(n.nativeEvent.touches.length > 1)) {
                var l = module1261._parseMove(n.nativeEvent, o) || {};
                t.scale.dx = l.x;
                t.scale.dy = l.y;
                var s = null == t.callBack.getInfo ? undefined : t.callBack.getInfo();
                if (s)
                  t.wallEnd = {
                    x: s.position.end.x,
                    y: s.position.end.y,
                  };
              }
            },
            onPanResponderEnd: function (n, o) {
              if (0 === n.nativeEvent.touches.length) null == t.callBack.onTouchEnd || t.callBack.onTouchEnd(T.PanTypeDragEnd);
            },
            onPanResponderMove: function (o, l) {
              if (!(o.nativeEvent.touches.length > 1)) {
                o = module1261._parseMove(o.nativeEvent, l) || {};
                var s = null == t.callBack.getInfo ? undefined : t.callBack.getInfo();

                if (s) {
                  var c = {
                      x: t.scale.dx,
                      y: t.scale.dy,
                    },
                    T = module1261._parseDegPointWithTrans(o, c, s.trans, s.mapDeg),
                    p = module23.default(T, 2),
                    v = p[0],
                    f = p[1],
                    R = t.wallEnd.x + v,
                    P = t.wallEnd.y + f,
                    y = P - s.position.start.y,
                    M = R - s.position.start.x,
                    S = Math.abs(y),
                    k = Math.abs(M),
                    D = y ** M,
                    B = Math.sqrt(S * S + k * k);

                  if (B > module1057.RectConfig.maxLength) {
                    var w = module1057.RectConfig.maxLength - B;
                    P += Math.sin(D) * w;
                    R += Math.cos(D) * w;
                  }

                  if (!(B < module1057.RectConfig.minLength)) {
                    var E = {
                      start: s.position.start,
                      end: {
                        x: R,
                        y: P,
                      },
                    };
                    if (!(null == t.callBack.updatePosition)) t.callBack.updatePosition(E, false);
                  }
                }
              }
            },
            onPanResponderTerminationRequest: function (t, n) {
              return false;
            },
          });
        if (this.rectPanType & T.PanTypeDelete)
          this.panResponderDelete = module12.PanResponder.create({
            onStartShouldSetPanResponder: function () {
              return true;
            },
            onMoveShouldSetPanResponder: function () {
              return true;
            },
            onPanResponderEnd: function (n, o) {
              if (0 === n.nativeEvent.touches.length) null == t.callBack.onTouchDelete || t.callBack.onTouchDelete();
            },
            onPanResponderTerminationRequest: function (t, n) {
              return false;
            },
          });
      },
    },
    {
      key: '_justifyRateXY',
      value: function (t, n) {
        var o,
          l,
          s = false,
          c = module1057.RectConfig.maxLength,
          u = module1057.RectConfig.maxLength,
          T = module1057.RectConfig.minLength,
          p = module1057.RectConfig.minLength,
          v = null == (o = (l = this.callBack).getInfo) ? undefined : o.call(l);

        if (v && v.edgeSize) {
          c = v.edgeSize.maxWidth;
          u = v.edgeSize.maxHeight;
          T = v.edgeSize.minWidth;
          p = v.edgeSize.minHeight;
        }

        if (t > c || n > u || t < T || n < p) {
          t = (t ** c) ** T;
          n = (n ** u) ** p;
          s = true;
        }

        return [t, n, s];
      },
    },
    {
      key: '_moveRect',
      value: function (t, o) {
        var l,
          s,
          c,
          h,
          T,
          p,
          v = null == (l = (s = this.callBack).getInfo) ? undefined : l.call(s);

        if (v) {
          var f = v.rectSize;

          if (f) {
            var R = null;

            if ((null == (c = (h = this.callBack).onShouldTwoFinger) ? undefined : c.call(h)) && t.hasOwnProperty('distance') && o.hasOwnProperty('distance')) {
              var P = t.distance / o.distance,
                y = t.distance / o.distance,
                M = P * f.width,
                S = y * f.height,
                k = this._justifyRateXY(M, S),
                D = module23.default(k, 2);

              M = D[0];
              S = D[1];
              R = {
                x: f.x + (f.width - M) / 2,
                y: f.y + (f.height - S) / 2,
                width: M,
                height: S,
              };
            } else if (!t.hasOwnProperty('distance')) {
              if (!(t && t.x && t.y && o.x)) return;

              var B = module1261._parseDegPointWithTrans(t, o, v.trans, v.mapDeg),
                w = module23.default(B, 2),
                E = w[0],
                x = w[1];

              R = {
                x: f.x + E,
                y: f.y + x,
              };
            }

            if (R) null == (T = (p = this.callBack).updateRect) || T.call(p, R);
          }
        }
      },
    },
    {
      key: '_moveLine',
      value: function (t, o) {
        var l, s, c, h;

        if (!t.hasOwnProperty('distance')) {
          var T = null == (l = (s = this.callBack).getInfo) ? undefined : l.call(s);

          if (T) {
            var p = module1261._parseDegPointWithTrans(t, o, T.trans, T.mapDeg),
              v = module23.default(p, 2),
              f = v[0],
              R = v[1];

            if (!isNaN(f) && !isNaN(R)) {
              var P = {
                start: {
                  x: T.position.start.x + f,
                  y: T.position.start.y + R,
                },
                end: {
                  x: T.position.end.x + f,
                  y: T.position.end.y + R,
                },
              };
              if (!(null == (c = (h = this.callBack).updatePosition))) c.call(h, P, true);
            }
          }
        }
      },
    },
  ]);
  return t;
})();

exports.default = p;
