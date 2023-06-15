var n =
  Object.assign ||
  function (n) {
    for (var o = 1; o < arguments.length; o++) {
      var t = arguments[o];

      for (var c in t) Object.prototype.hasOwnProperty.call(t, c) && (n[c] = t[c]);
    }

    return n;
  };

function o(n, o) {
  var t = {};

  for (var c in n) o.indexOf(c) >= 0 || (Object.prototype.hasOwnProperty.call(n, c) && (t[c] = n[c]));

  return t;
}

var module1819 = require('./1819'),
  module1836 = require('./1836'),
  module1837 = require('./1837'),
  module1826 = require('./1826'),
  module1838 = require('./1838'),
  module1839 = require('./1839');

module.exports = function (p) {
  var l = [],
    h = module1836(p).map(function (n) {
      return n.vdom;
    });
  return {
    data: (function c(v, p, b, O) {
      var x = -1,
        I = v.uniforms,
        y = v.children,
        C = v.contents,
        w = v.preload,
        j = o(v, ['uniforms', 'children', 'contents', 'preload']),
        P = n({}, I),
        T = b.map(function (n) {
          return n.vdom;
        }),
        E = function () {
          for (x++; x === p || -1 !== O.indexOf(x); ) x++;

          return x;
        },
        M = module1837(v, T),
        _ = M.map(function (n) {
          return {
            vdom: n.vdom,
            fboId: E(),
          };
        }),
        D = b.concat(_),
        F = D.map(function (n) {
          return n.vdom;
        }),
        V = D.map(function (n) {
          return n.fboId;
        }),
        k = [],
        q = [],
        z = y.concat(M).map(function (n) {
          var o = n.uniform,
            t = n.vdom,
            c = n.data,
            f = F.indexOf(t),
            s = undefined,
            v = undefined;

          if (-1 === f) {
            s = E();
            v = q;
          } else {
            s = D[f].fboId;
            if (f >= b.length) v = k;
          }

          if (o) P[o] = module1826.Framebuffer(s);
          return {
            data: c,
            fboId: s,
            addToCollection: v,
          };
        }),
        A = z.map(function (n) {
          return n.fboId;
        }),
        B = O.concat(V).concat(A),
        G = [];

      z.forEach(function (n) {
        var o = n.data,
          t = n.fboId,
          f = n.addToCollection;

        if (-1 === G.indexOf(t)) {
          G.push(t);
          if (f) f.unshift(c(o, t, D, B));
        }
      });
      C.forEach(function (n) {
        var o = n.uniform,
          c = n.vdom,
          f = n.opts,
          s = h.indexOf(c);
        module1819(-1 !== s, 'contents was discovered by findContentsMeta');
        P[o] = module1826.withOpts(module1826.Content(s), f);
      });
      if (w) l = l.concat(module1838(I));
      return n({}, j, {
        uniforms: P,
        contextChildren: k,
        children: q,
        fboId: p,
      });
    })(p, -1, [], []),
    contentsVDOM: h,
    imagesToPreload: module1839(l),
  };
};
