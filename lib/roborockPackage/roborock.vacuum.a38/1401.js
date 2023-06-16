var module23 = require('@babel/runtime/helpers/slicedToArray'),
  module22 = require('./22'),
  module12 = require('./12'),
  module1332 = require('./1332'),
  module1402 = require('./1402'),
  u = {
    PanTypeMove: 1,
    PanTypeScale: 2,
    PanTypeRotate: 4,
  };

exports.RectPanType = u;

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
      getInfo: null,
      onShouldStart: null,
      onTouchStart: null,
      onTouchEnd: null,
      onShouldTwoFinger: null,
      onTouchMove: null,
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
        if (this.rectPanType & u.PanTypeMove)
          this.panResponder = module12.PanResponder.create({
            onStartShouldSetPanResponder: function () {
              return !(t.callBack.onShouldStart && !t.callBack.onShouldStart());
            },
            onMoveShouldSetPanResponder: function () {
              return false;
            },
            onPanResponderStart: function (n, o) {
              t.touch.move = module1402._parseEvent2(n.nativeEvent, o) || {};
              if (!(null == t.callBack.onTouchStart)) t.callBack.onTouchStart(u.PanTypeMove);
            },
            onPanResponderEnd: function (n, o) {
              if (0 === n.nativeEvent.touches.length) null == t.callBack.onTouchEnd || t.callBack.onTouchEnd(u.PanTypeMove);
            },
            onPanResponderMove: function (o, l) {
              if (!t.callBack.onShouldMove || t.callBack.onShouldMove()) {
                var s = [module1402._parseEvent2(o.nativeEvent, l), t.touch.move],
                  c = s[0],
                  h = s[1];

                if (((t.touch.move = c || {}), c)) {
                  var u = null == t.callBack.getInfo ? undefined : t.callBack.getInfo();

                  if (u) {
                    var p = u.rectSize;

                    if (p) {
                      var v = null;

                      if ((null == t.callBack.onShouldTwoFinger ? undefined : t.callBack.onShouldTwoFinger()) && c.hasOwnProperty('distance') && h.hasOwnProperty('distance')) {
                        var f = c.distance / h.distance,
                          R = c.distance / h.distance,
                          M = f * p.width,
                          P = R * p.height,
                          S = t._justifyRateXY(M, P),
                          y = module23.default(S, 2);

                        M = y[0];
                        P = y[1];
                        v = {
                          x: p.x + (p.width - M) / 2,
                          y: p.y + (p.height - P) / 2,
                          width: M,
                          height: P,
                        };
                      } else if (!c.hasOwnProperty('distance')) {
                        if (!(c && c.x && c.y && h.x)) return;

                        var B = module1402._parseDegPointWithTrans(c, h, u.trans, u.mapDeg),
                          k = module23.default(B, 2),
                          w = k[0],
                          D = k[1];

                        v = {
                          x: p.x + w,
                          y: p.y + D,
                        };
                      }

                      if (v) null == t.callBack.updateRect || t.callBack.updateRect(v);
                    }
                  }
                }
              }
            },
            onPanResponderTerminationRequest: function (t, n) {
              return false;
            },
          });
        if (this.rectPanType & u.PanTypeScale)
          this.panResponderScale = module12.PanResponder.create({
            onStartShouldSetPanResponder: function () {
              return true;
            },
            onMoveShouldSetPanResponder: function () {
              return true;
            },
            onPanResponderStart: function (n, o) {
              if (!(n.nativeEvent.touches.length > 1)) {
                var l = module1402._parseMove(n.nativeEvent, o) || {};
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
                    t.rotateTrans.widthVsign = module1402._pointVectorToLine(
                      t.rotateTrans.realLTX,
                      t.rotateTrans.realLTY,
                      t.rotateTrans.targetVectorX,
                      t.rotateTrans.targetVectorY
                    );
                    t.rotateTrans.heightVsign = module1402._pointVectorToLine(
                      t.rotateTrans.realLTX,
                      t.rotateTrans.realLTY,
                      t.rotateTrans.targetVectorHX,
                      t.rotateTrans.targetVectorHY
                    );
                    t.rotateTrans.signwRD = t.rotateTrans.realRDX * t.rotateTrans.widthVsign[0] + t.rotateTrans.realRDY * t.rotateTrans.widthVsign[1] + t.rotateTrans.widthVsign[2];
                    t.rotateTrans.signhRD =
                      t.rotateTrans.realRDX * t.rotateTrans.heightVsign[0] + t.rotateTrans.realRDY * t.rotateTrans.heightVsign[1] + t.rotateTrans.heightVsign[2];
                    if (!(null == t.callBack.onTouchStart)) t.callBack.onTouchStart(u.PanTypeScale);
                  }
                }
              }
            },
            onPanResponderEnd: function (n, o) {
              if (0 === n.nativeEvent.touches.length) null == t.callBack.onTouchEnd || t.callBack.onTouchEnd(u.PanTypeScale);
            },
            onPanResponderMove: function (o, l) {
              if (!(o.nativeEvent.touches.length > 1)) {
                o = module1402._parseMove(o.nativeEvent, l) || {};
                var s = null == t.callBack.getInfo ? undefined : t.callBack.getInfo();

                if (s) {
                  var c = s.rectSize;

                  if (c) {
                    var h = {
                        x: t.scale.dx,
                        y: t.scale.dy,
                      },
                      u = module1402._parseDegPointWithTrans(o, h, s.trans, s.mapDeg),
                      p = module23.default(u, 2),
                      v = p[0],
                      f = p[1];

                    t.scale.dx = o.x;
                    t.scale.dy = o.y;
                    var R = null;

                    if (s.mapDeg % 360 == 0 && 0 === s.slopeAngle) {
                      var M = v + c.width,
                        P = f + c.height,
                        S = t._justifyRateXY(M, P),
                        y = module23.default(S, 3);

                      M = y[0];
                      P = y[1];
                      R = {
                        width: M,
                        height: P,
                      };
                    } else {
                      var B = t.rotateTrans.realRDX + v,
                        k = t.rotateTrans.realRDY + f,
                        w = Math.sqrt((B - t.rotateTrans.realLTX) ** 2 + (k - t.rotateTrans.realLTY) ** 2),
                        D = (B - t.rotateTrans.realLTX) * t.rotateTrans.targetVectorX + (k - t.rotateTrans.realLTY) * t.rotateTrans.targetVectorY,
                        X = Math.sqrt(w ** 2 - D ** 2),
                        Y = t._justifyRateXY(D, X),
                        L = module23.default(Y, 3);

                      if (((D = L[0]), (X = L[1]), L[2])) {
                        var V = X ** D,
                          E = module1402._regularAngle(s.slopeAngle + V);

                        t.rotateTrans.diagnal = Math.sqrt(D ** 2 + X ** 2);
                        t.rotateTrans.realRDX = t.rotateTrans.realLTX + Math.cos(E) * t.rotateTrans.diagnal;
                        t.rotateTrans.realRDY = t.rotateTrans.realLTY + Math.sin(E) * t.rotateTrans.diagnal;
                      } else {
                        t.rotateTrans.diagnal = w;
                        t.rotateTrans.realRDX = B;
                        t.rotateTrans.realRDY = k;
                      }

                      var x = t.rotateTrans.realRDX * t.rotateTrans.widthVsign[0] + t.rotateTrans.realRDY * t.rotateTrans.widthVsign[1] + t.rotateTrans.widthVsign[2],
                        _ = t.rotateTrans.realRDX * t.rotateTrans.heightVsign[0] + t.rotateTrans.realRDY * t.rotateTrans.heightVsign[1] + t.rotateTrans.heightVsign[2];

                      if (t.rotateTrans.signwRD * x <= 0 || t.rotateTrans.signhRD * _ <= 0) return;
                      R = {
                        x: (t.rotateTrans.realRDX + t.rotateTrans.realLTX) / 2 - D / 2,
                        y: (t.rotateTrans.realRDY + t.rotateTrans.realLTY) / 2 - X / 2,
                        width: D,
                        height: X,
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
        if (this.rectPanType & u.PanTypeRotate)
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
                    if (!(null == t.callBack.onTouchStart)) t.callBack.onTouchStart(u.PanTypeRotate);
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
              if (0 === n.nativeEvent.touches.length) null == t.callBack.onTouchEnd || t.callBack.onTouchEnd(u.PanTypeRotate);
            },
            onPanResponderMove: function (o, l) {
              if (!(o.nativeEvent.touches.length > 1)) {
                var s = module1402._parseMove2(o.nativeEvent, l) || {},
                  c = null == t.callBack.getInfo ? undefined : t.callBack.getInfo();

                if (c) {
                  var h = module1402._parseDegPointWithTrans(
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
                    if (!(null == t.callBack.onTouchMove)) t.callBack.onTouchMove(u.PanTypeRotate);
                    var R = t.rotateTrans.realLDX + v,
                      M = t.rotateTrans.realLDY + f,
                      P = (M - t.rotateTrans.midY) ** (R - t.rotateTrans.midX) + t.rotateTrans.ltBaseAngle;
                    if (!(null == t.callBack.updateAngle)) t.callBack.updateAngle(P);
                  }
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
      key: '_justifyRateXY',
      value: function (t, n) {
        var o,
          l,
          s = false,
          c = module1332.RectConfig.maxLength,
          T = module1332.RectConfig.maxLength,
          u = module1332.RectConfig.minLength,
          p = module1332.RectConfig.minLength,
          v = null == (o = (l = this.callBack).getInfo) ? undefined : o.call(l);

        if (v && v.edgeSize) {
          c = v.edgeSize.maxWidth;
          T = v.edgeSize.maxHeight;
          u = v.edgeSize.minWidth;
          p = v.edgeSize.minHeight;
        }

        if (t > c || n > T || t < u || n < p) {
          t = (t ** c) ** u;
          n = (n ** T) ** p;
          s = true;
        }

        return [t, n, s];
      },
    },
  ]);
  return t;
})();

exports.default = p;
