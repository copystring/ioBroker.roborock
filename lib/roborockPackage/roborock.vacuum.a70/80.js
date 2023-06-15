var module23 = require('@babel/runtime/helpers/slicedToArray'),
  module14 = require('./14'),
  o = {
    createIdentityMatrix: function () {
      return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    },
    createCopy: function (t) {
      return [t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8], t[9], t[10], t[11], t[12], t[13], t[14], t[15]];
    },
    createOrthographic: function (t, n, o, u, s, c) {
      return [2 / (n - t), 0, 0, 0, 0, 2 / (u - o), 0, 0, 0, 0, -2 / (c - s), 0, -(n + t) / (n - t), -(u + o) / (u - o), -(c + s) / (c - s), 1];
    },
    createFrustum: function (t, n, o, u, s, c) {
      var v = 1 / (n - t),
        f = 1 / (u - o),
        h = 1 / (s - c);
      return [s * v * 2, 0, 0, 0, 0, s * f * 2, 0, 0, (n + t) * v, (u + o) * f, (c + s) * h, -1, 0, 0, c * s * h * 2, 0];
    },
    createPerspective: function (t, n, o, u) {
      var s = 1 / Math.tan(t / 2),
        c = 1 / (o - u);
      return [s / n, 0, 0, 0, 0, s, 0, 0, 0, 0, (u + o) * c, -1, 0, 0, u * o * c * 2, 0];
    },
    createTranslate2d: function (t, n) {
      var u = o.createIdentityMatrix();
      o.reuseTranslate2dCommand(u, t, n);
      return u;
    },
    reuseTranslate2dCommand: function (t, n, o) {
      t[12] = n;
      t[13] = o;
    },
    reuseTranslate3dCommand: function (t, n, o, u) {
      t[12] = n;
      t[13] = o;
      t[14] = u;
    },
    createScale: function (t) {
      var n = o.createIdentityMatrix();
      o.reuseScaleCommand(n, t);
      return n;
    },
    reuseScaleCommand: function (t, n) {
      t[0] = n;
      t[5] = n;
    },
    reuseScale3dCommand: function (t, n, o, u) {
      t[0] = n;
      t[5] = o;
      t[10] = u;
    },
    reusePerspectiveCommand: function (t, n) {
      t[11] = -1 / n;
    },
    reuseScaleXCommand: function (t, n) {
      t[0] = n;
    },
    reuseScaleYCommand: function (t, n) {
      t[5] = n;
    },
    reuseScaleZCommand: function (t, n) {
      t[10] = n;
    },
    reuseRotateXCommand: function (t, n) {
      t[5] = Math.cos(n);
      t[6] = Math.sin(n);
      t[9] = -Math.sin(n);
      t[10] = Math.cos(n);
    },
    reuseRotateYCommand: function (t, n) {
      t[0] = Math.cos(n);
      t[2] = -Math.sin(n);
      t[8] = Math.sin(n);
      t[10] = Math.cos(n);
    },
    reuseRotateZCommand: function (t, n) {
      t[0] = Math.cos(n);
      t[1] = Math.sin(n);
      t[4] = -Math.sin(n);
      t[5] = Math.cos(n);
    },
    createRotateZ: function (t) {
      var n = o.createIdentityMatrix();
      o.reuseRotateZCommand(n, t);
      return n;
    },
    reuseSkewXCommand: function (t, n) {
      t[4] = Math.tan(n);
    },
    reuseSkewYCommand: function (t, n) {
      t[1] = Math.tan(n);
    },
    multiplyInto: function (t, n, o) {
      var u = n[0],
        s = n[1],
        c = n[2],
        v = n[3],
        f = n[4],
        h = n[5],
        M = n[6],
        l = n[7],
        C = n[8],
        p = n[9],
        x = n[10],
        T = n[11],
        y = n[12],
        S = n[13],
        D = n[14],
        P = n[15],
        q = o[0],
        X = o[1],
        Y = o[2],
        I = o[3];
      t[0] = q * u + X * f + Y * C + I * y;
      t[1] = q * s + X * h + Y * p + I * S;
      t[2] = q * c + X * M + Y * x + I * D;
      t[3] = q * v + X * l + Y * T + I * P;
      q = o[4];
      X = o[5];
      Y = o[6];
      I = o[7];
      t[4] = q * u + X * f + Y * C + I * y;
      t[5] = q * s + X * h + Y * p + I * S;
      t[6] = q * c + X * M + Y * x + I * D;
      t[7] = q * v + X * l + Y * T + I * P;
      q = o[8];
      X = o[9];
      Y = o[10];
      I = o[11];
      t[8] = q * u + X * f + Y * C + I * y;
      t[9] = q * s + X * h + Y * p + I * S;
      t[10] = q * c + X * M + Y * x + I * D;
      t[11] = q * v + X * l + Y * T + I * P;
      q = o[12];
      X = o[13];
      Y = o[14];
      I = o[15];
      t[12] = q * u + X * f + Y * C + I * y;
      t[13] = q * s + X * h + Y * p + I * S;
      t[14] = q * c + X * M + Y * x + I * D;
      t[15] = q * v + X * l + Y * T + I * P;
    },
    determinant: function (n) {
      var o = module23(n, 16),
        u = o[0],
        s = o[1],
        c = o[2],
        v = o[3],
        f = o[4],
        h = o[5],
        M = o[6],
        l = o[7],
        C = o[8],
        p = o[9],
        x = o[10],
        T = o[11],
        y = o[12],
        S = o[13],
        D = o[14],
        P = o[15];
      return (
        v * M * p * y -
        c * l * p * y -
        v * h * x * y +
        s * l * x * y +
        c * h * T * y -
        s * M * T * y -
        v * M * C * S +
        c * l * C * S +
        v * f * x * S -
        u * l * x * S -
        c * f * T * S +
        u * M * T * S +
        v * h * C * D -
        s * l * C * D -
        v * f * p * D +
        u * l * p * D +
        s * f * T * D -
        u * h * T * D -
        c * h * C * P +
        s * M * C * P +
        c * f * p * P -
        u * M * p * P -
        s * f * x * P +
        u * h * x * P
      );
    },
    inverse: function (n) {
      var u = o.determinant(n);
      if (!u) return n;
      var s = module23(n, 16),
        c = s[0],
        v = s[1],
        f = s[2],
        h = s[3],
        M = s[4],
        l = s[5],
        C = s[6],
        p = s[7],
        x = s[8],
        T = s[9],
        y = s[10],
        S = s[11],
        D = s[12],
        P = s[13],
        q = s[14],
        X = s[15];
      return [
        (C * S * P - p * y * P + p * T * q - l * S * q - C * T * X + l * y * X) / u,
        (h * y * P - f * S * P - h * T * q + v * S * q + f * T * X - v * y * X) / u,
        (f * p * P - h * C * P + h * l * q - v * p * q - f * l * X + v * C * X) / u,
        (h * C * T - f * p * T - h * l * y + v * p * y + f * l * S - v * C * S) / u,
        (p * y * D - C * S * D - p * x * q + M * S * q + C * x * X - M * y * X) / u,
        (f * S * D - h * y * D + h * x * q - c * S * q - f * x * X + c * y * X) / u,
        (h * C * D - f * p * D - h * M * q + c * p * q + f * M * X - c * C * X) / u,
        (f * p * x - h * C * x + h * M * y - c * p * y - f * M * S + c * C * S) / u,
        (l * S * D - p * T * D + p * x * P - M * S * P - l * x * X + M * T * X) / u,
        (h * T * D - v * S * D - h * x * P + c * S * P + v * x * X - c * T * X) / u,
        (v * p * D - h * l * D + h * M * P - c * p * P - v * M * X + c * l * X) / u,
        (h * l * x - v * p * x - h * M * T + c * p * T + v * M * S - c * l * S) / u,
        (C * T * D - l * y * D - C * x * P + M * y * P + l * x * q - M * T * q) / u,
        (v * y * D - f * T * D + f * x * P - c * y * P - v * x * q + c * T * q) / u,
        (f * l * D - v * C * D - f * M * P + c * C * P + v * M * q - c * l * q) / u,
        (v * C * x - f * l * x + f * M * T - c * C * T - v * M * y + c * l * y) / u,
      ];
    },
    transpose: function (t) {
      return [t[0], t[4], t[8], t[12], t[1], t[5], t[9], t[13], t[2], t[6], t[10], t[14], t[3], t[7], t[11], t[15]];
    },
    multiplyVectorByMatrix: function (n, o) {
      var u = module23(n, 4),
        s = u[0],
        c = u[1],
        v = u[2],
        f = u[3];
      return [
        s * o[0] + c * o[4] + v * o[8] + f * o[12],
        s * o[1] + c * o[5] + v * o[9] + f * o[13],
        s * o[2] + c * o[6] + v * o[10] + f * o[14],
        s * o[3] + c * o[7] + v * o[11] + f * o[15],
      ];
    },
    v3Length: function (t) {
      return Math.sqrt(t[0] * t[0] + t[1] * t[1] + t[2] * t[2]);
    },
    v3Normalize: function (t, n) {
      var u = 1 / (n || o.v3Length(t));
      return [t[0] * u, t[1] * u, t[2] * u];
    },
    v3Dot: function (t, n) {
      return t[0] * n[0] + t[1] * n[1] + t[2] * n[2];
    },
    v3Combine: function (t, n, o, u) {
      return [o * t[0] + u * n[0], o * t[1] + u * n[1], o * t[2] + u * n[2]];
    },
    v3Cross: function (t, n) {
      return [t[1] * n[2] - t[2] * n[1], t[2] * n[0] - t[0] * n[2], t[0] * n[1] - t[1] * n[0]];
    },
    quaternionToDegreesXYZ: function (n, u, s) {
      var c = module23(n, 4),
        v = c[0],
        f = c[1],
        h = c[2],
        M = c[3],
        l = v * v,
        C = f * f,
        p = h * h,
        x = v * f + h * M,
        T = M * M + l + C + p,
        y = 180 / Math.PI;
      return x > 0.49999 * T
        ? [0, 2 * v ** M * y, 90]
        : x < -0.49999 * T
        ? [0, -2 * v ** M * y, -90]
        : [
            o.roundTo3Places((2 * v * M - 2 * f * h) ** (1 - 2 * l - 2 * p) * y),
            o.roundTo3Places((2 * f * M - 2 * v * h) ** (1 - 2 * C - 2 * p) * y),
            o.roundTo3Places(Math.asin(2 * v * f + 2 * h * M) * y),
          ];
    },
    roundTo3Places: function (t) {
      var n = t.toString().split('e');
      return 0.001 * Math.round(n[0] + 'e' + (n[1] ? +n[1] - 3 : 3));
    },
    decomposeMatrix: function (t) {
      module14(16 === t.length, 'Matrix decomposition needs a list of 3d matrix values, received %s', t);
      var u = [],
        s = [],
        c = [],
        v = [],
        f = [];

      if (t[15]) {
        for (var h = [], M = [], l = 0; l < 4; l++) {
          h.push([]);

          for (var C = 0; C < 4; C++) {
            var p = t[4 * l + C] / t[15];
            h[l].push(p);
            M.push(3 === C ? 0 : p);
          }
        }

        if (((M[15] = 1), o.determinant(M))) {
          if (0 !== h[0][3] || 0 !== h[1][3] || 0 !== h[2][3]) {
            var x = [h[0][3], h[1][3], h[2][3], h[3][3]],
              T = o.inverse(M),
              y = o.transpose(T);
            u = o.multiplyVectorByMatrix(x, y);
          } else {
            u[0] = u[1] = u[2] = 0;
            u[3] = 1;
          }

          for (var S = 0; S < 3; S++) f[S] = h[3][S];

          for (var D = [], P = 0; P < 3; P++) D[P] = [h[P][0], h[P][1], h[P][2]];

          c[0] = o.v3Length(D[0]);
          D[0] = o.v3Normalize(D[0], c[0]);
          v[0] = o.v3Dot(D[0], D[1]);
          D[1] = o.v3Combine(D[1], D[0], 1, -v[0]);
          v[0] = o.v3Dot(D[0], D[1]);
          D[1] = o.v3Combine(D[1], D[0], 1, -v[0]);
          c[1] = o.v3Length(D[1]);
          D[1] = o.v3Normalize(D[1], c[1]);
          v[0] /= c[1];
          v[1] = o.v3Dot(D[0], D[2]);
          D[2] = o.v3Combine(D[2], D[0], 1, -v[1]);
          v[2] = o.v3Dot(D[1], D[2]);
          D[2] = o.v3Combine(D[2], D[1], 1, -v[2]);
          c[2] = o.v3Length(D[2]);
          D[2] = o.v3Normalize(D[2], c[2]);
          v[1] /= c[2];
          v[2] /= c[2];
          var q,
            X = o.v3Cross(D[1], D[2]);
          if (o.v3Dot(D[0], X) < 0)
            for (var Y = 0; Y < 3; Y++) {
              c[Y] *= -1;
              D[Y][0] *= -1;
              D[Y][1] *= -1;
              D[Y][2] *= -1;
            }
          s[0] = 0.5 * Math.sqrt((1 + D[0][0] - D[1][1] - D[2][2]) ** 0);
          s[1] = 0.5 * Math.sqrt((1 - D[0][0] + D[1][1] - D[2][2]) ** 0);
          s[2] = 0.5 * Math.sqrt((1 - D[0][0] - D[1][1] + D[2][2]) ** 0);
          s[3] = 0.5 * Math.sqrt((1 + D[0][0] + D[1][1] + D[2][2]) ** 0);
          if (D[2][1] > D[1][2]) s[0] = -s[0];
          if (D[0][2] > D[2][0]) s[1] = -s[1];
          if (D[1][0] > D[0][1]) s[2] = -s[2];
          return {
            rotationDegrees: (q =
              s[0] < 0.001 && s[0] >= 0 && s[1] < 0.001 && s[1] >= 0 ? [0, 0, o.roundTo3Places((180 * D[0][1] ** D[0][0]) / Math.PI)] : o.quaternionToDegreesXYZ(s, h, D)),
            perspective: u,
            quaternion: s,
            scale: c,
            skew: v,
            translation: f,
            rotate: q[2],
            rotateX: q[0],
            rotateY: q[1],
            scaleX: c[0],
            scaleY: c[1],
            translateX: f[0],
            translateY: f[1],
          };
        }
      }
    },
  };

module.exports = o;
