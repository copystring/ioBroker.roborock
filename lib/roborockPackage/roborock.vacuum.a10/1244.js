var module22 = require('./22'),
  module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module12 = require('./12'),
  module1233 = require('./1233'),
  module1245 = require('./1245'),
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
    };
    this.rectPanType = n;
  }

  module5.default(t, [
    {
      key: 'registerPanResponder',
      value: function (t) {
        if (t && 'object' == typeof t) module21.default(this.callBack, t);

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
              t.touch.move = module1245._parseEvent2(n.nativeEvent, o) || {};
              if (!(null == t.callBack.onTouchStart)) t.callBack.onTouchStart();
            },
            onPanResponderEnd: function (n, o) {
              if (0 === n.nativeEvent.touches.length) null == t.callBack.onTouchEnd || t.callBack.onTouchEnd();
            },
            onPanResponderMove: function (o, l) {
              if (!t.callBack.onShouldMove || t.callBack.onShouldMove()) {
                var s = [module1245._parseEvent2(o.nativeEvent, l), t.touch.move],
                  c = s[0],
                  h = s[1];

                if (((t.touch.move = c || {}), c)) {
                  var u = null == t.callBack.getInfo ? undefined : t.callBack.getInfo();

                  if (u) {
                    var p = u.rectSize;

                    if (p) {
                      var v = null;

                      if (null != t.callBack.onShouldTwoFinger && t.callBack.onShouldTwoFinger() && c.hasOwnProperty('distance') && h.hasOwnProperty('distance')) {
                        var f = c.distance / h.distance,
                          R = c.distance / h.distance,
                          M = f * p.width,
                          P = R * p.height,
                          S = t._justifyRateXY(M, P),
                          y = module22.default(S, 2);

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

                        var w = module1245._parseDegPointWithTrans(c, h, u.trans, u.mapDeg),
                          D = module22.default(w, 2),
                          X = D[0],
                          Y = D[1];

                        v = {
                          x: p.x + X,
                          y: p.y + Y,
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
                var l = module1245._parseMove(n.nativeEvent, o) || {};
                t.scale.dx = l.x;
                t.scale.dy = l.y;
                var s = null == t.callBack.getInfo ? undefined : t.callBack.getInfo();

                if (s) {
                  var c = s.rectSize;

                  if (c) {
                    t.rotateTrans.midX = c.x + c.width / 2;
                    t.rotateTrans.midY = c.y + c.height / 2;
                    var h = s.slopeAngle,
                      u = h + (c.height ** c.width - Math.PI);
                    t.rotateTrans.diagnal = Math.sqrt(c.width ** 2 + c.height ** 2);
                    t.rotateTrans.realLTX = t.rotateTrans.midX + (t.rotateTrans.diagnal / 2) * Math.cos(u);
                    t.rotateTrans.realLTY = t.rotateTrans.midY + (t.rotateTrans.diagnal / 2) * Math.sin(u);
                    t.rotateTrans.realRDX = 2 * t.rotateTrans.midX - t.rotateTrans.realLTX;
                    t.rotateTrans.realRDY = 2 * t.rotateTrans.midY - t.rotateTrans.realLTY;
                    t.rotateTrans.targetVectorX = Math.cos(h);
                    t.rotateTrans.targetVectorY = Math.sin(h);
                    t.rotateTrans.targetVectorHX = Math.cos(h + Math.PI / 2);
                    t.rotateTrans.targetVectorHY = Math.sin(h + Math.PI / 2);
                    t.rotateTrans.widthVsign = module1245._pointVectorToLine(
                      t.rotateTrans.realLTX,
                      t.rotateTrans.realLTY,
                      t.rotateTrans.targetVectorX,
                      t.rotateTrans.targetVectorY
                    );
                    t.rotateTrans.heightVsign = module1245._pointVectorToLine(
                      t.rotateTrans.realLTX,
                      t.rotateTrans.realLTY,
                      t.rotateTrans.targetVectorHX,
                      t.rotateTrans.targetVectorHY
                    );
                    t.rotateTrans.signwRD = t.rotateTrans.realRDX * t.rotateTrans.widthVsign[0] + t.rotateTrans.realRDY * t.rotateTrans.widthVsign[1] + t.rotateTrans.widthVsign[2];
                    t.rotateTrans.signhRD =
                      t.rotateTrans.realRDX * t.rotateTrans.heightVsign[0] + t.rotateTrans.realRDY * t.rotateTrans.heightVsign[1] + t.rotateTrans.heightVsign[2];
                  }
                }
              }
            },
            onPanResponderEnd: function (n, o) {
              if (0 === n.nativeEvent.touches.length) null == t.callBack.onTouchEnd || t.callBack.onTouchEnd();
            },
            onPanResponderMove: function (o, l) {
              if (!(o.nativeEvent.touches.length > 1)) {
                o = module1245._parseMove(o.nativeEvent, l) || {};
                var s = null == t.callBack.getInfo ? undefined : t.callBack.getInfo();

                if (s) {
                  var c = s.rectSize;

                  if (c) {
                    var h = {
                        x: t.scale.dx,
                        y: t.scale.dy,
                      },
                      u = module1245._parseDegPointWithTrans(o, h, s.trans, s.mapDeg),
                      p = module22.default(u, 2),
                      v = p[0],
                      f = p[1];

                    t.scale.dx = o.x;
                    t.scale.dy = o.y;
                    var R = null;

                    if (s.mapDeg % 360 == 0 && 0 === s.slopeAngle) {
                      var M = v + c.width,
                        P = f + c.height,
                        S = t._justifyRateXY(M, P),
                        y = module22.default(S, 3);

                      M = y[0];
                      P = y[1];
                      R = {
                        width: M,
                        height: P,
                      };
                    } else {
                      var w = t.rotateTrans.realRDX + v,
                        D = t.rotateTrans.realRDY + f,
                        X = Math.sqrt((w - t.rotateTrans.realLTX) ** 2 + (D - t.rotateTrans.realLTY) ** 2),
                        Y = (w - t.rotateTrans.realLTX) * t.rotateTrans.targetVectorX + (D - t.rotateTrans.realLTY) * t.rotateTrans.targetVectorY,
                        B = Math.sqrt(X ** 2 - Y ** 2),
                        k = t._justifyRateXY(Y, B),
                        L = module22.default(k, 3);

                      if (((Y = L[0]), (B = L[1]), L[2])) {
                        var V = B ** Y,
                          E = module1245._regularAngle(s.slopeAngle + V);

                        t.rotateTrans.diagnal = Math.sqrt(Y ** 2 + B ** 2);
                        t.rotateTrans.realRDX = t.rotateTrans.realLTX + Math.cos(E) * t.rotateTrans.diagnal;
                        t.rotateTrans.realRDY = t.rotateTrans.realLTY + Math.sin(E) * t.rotateTrans.diagnal;
                      } else {
                        t.rotateTrans.diagnal = X;
                        t.rotateTrans.realRDX = w;
                        t.rotateTrans.realRDY = D;
                      }

                      var x = t.rotateTrans.realRDX * t.rotateTrans.widthVsign[0] + t.rotateTrans.realRDY * t.rotateTrans.widthVsign[1] + t.rotateTrans.widthVsign[2],
                        _ = t.rotateTrans.realRDX * t.rotateTrans.heightVsign[0] + t.rotateTrans.realRDY * t.rotateTrans.heightVsign[1] + t.rotateTrans.heightVsign[2];

                      if (t.rotateTrans.signwRD * x <= 0 || t.rotateTrans.signhRD * _ <= 0) return;
                      R = {
                        x: (t.rotateTrans.realRDX + t.rotateTrans.realLTX) / 2 - Y / 2,
                        y: (t.rotateTrans.realRDY + t.rotateTrans.realLTY) / 2 - B / 2,
                        width: Y,
                        height: B,
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
              if (0 === n.nativeEvent.touches.length) null == t.callBack.onTouchEnd || t.callBack.onTouchEnd(false);
            },
            onPanResponderMove: function (o, l) {
              if (!(o.nativeEvent.touches.length > 1)) {
                var s = module1245._parseMove2(o.nativeEvent, l) || {},
                  c = null == t.callBack.getInfo ? undefined : t.callBack.getInfo();

                if (c) {
                  var h = module1245._parseDegPointWithTrans(
                      s,
                      {
                        x: 0,
                        y: 0,
                      },
                      c.trans,
                      c.mapDeg
                    ),
                    u = module22.default(h, 2),
                    p = u[0],
                    v = u[1],
                    f = t.rotateTrans.realLDX + p,
                    R = t.rotateTrans.realLDY + v,
                    M = (R - t.rotateTrans.midY) ** (f - t.rotateTrans.midX) + t.rotateTrans.ltBaseAngle;

                  if (!(null == t.callBack.updateAngle)) t.callBack.updateAngle(M);
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
          c = module1233.RectConfig.maxLength,
          T = module1233.RectConfig.maxLength,
          u = module1233.RectConfig.minLength,
          p = module1233.RectConfig.minLength,
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
