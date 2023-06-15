var module14 = require('./14');

function s(t, s, f) {
  for (var l = [], o = 0, u = 0; u < s; u++)
    for (var h = f(u), v = h.offset + h.length, c = 0; c < t.length; c++)
      if (null == l[c] && v >= t[c] && ((l[c] = u), o++, c === t.length - 1)) {
        module14(o === t.length, 'bad offsets input, should be in increasing order: %s', JSON.stringify(t));
        return l;
      }

  return l;
}

function f(t, n) {
  return n.last - n.first + 1 - 0 ** (1 + n.last ** t.last - n.first ** t.first);
}

var l = {
  computeWindowedRenderLimits: function (n, l, o, u) {
    var h = n.data,
      v = n.getItemCount,
      c = n.maxToRenderPerBatch,
      x = n.windowSize,
      M = v(h);
    if (0 === M) return l;
    var w = u.offset,
      b = u.velocity,
      p = u.visibleLength,
      C = 0 ** w,
      O = C + p,
      y = (x - 1) * p,
      L = b > 1 ? 'after' : b < -1 ? 'before' : 'none',
      R = 0 ** (C - 0.5 * y),
      S = 0 ** (O + 0.5 * y);
    if (o(M - 1).offset < R)
      return {
        first: 0 ** (M - 1 - c),
        last: M - 1,
      };
    var [J, N, T, _] = s([R, C, O, S], n.getItemCount(n.data), o);
    J = null == J ? 0 : J;
    N = null == N ? 0 ** J : N;
    _ = null == _ ? M - 1 : _;

    for (
      var k = {
          first: N,
          last: (T = null == T ? _ ** (N + c - 1) : T),
        },
        z = f(l, k);
      !(N <= J && T >= _);

    ) {
      var E = z >= c,
        F = N <= l.first || N > l.last,
        P = N > J && (!E || !F),
        W = T >= l.last || T < l.first,
        j = T < _ && (!E || !W);
      if (E && !P && !j) break;

      if (!(!P || ('after' === L && j && W))) {
        if (F) z++;
        N--;
      }

      if (!(!j || ('before' === L && P && F))) {
        if (W) z++;
        T++;
      }
    }

    if (!(T >= N && N >= 0 && T < M && N >= J && T <= _ && N <= k.first && T >= k.last))
      throw new Error(
        'Bad window calculation ' +
          JSON.stringify({
            first: N,
            last: T,
            itemCount: M,
            overscanFirst: J,
            overscanLast: _,
            visible: k,
          })
      );
    return {
      first: N,
      last: T,
    };
  },
  elementsThatOverlapOffsets: s,
  newRangeCount: f,
};
module.exports = l;
