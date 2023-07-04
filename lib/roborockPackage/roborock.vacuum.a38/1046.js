var module1047 = require('./1047');

module.exports = E;
module.exports.parse = o;

module.exports.compile = function (t, n) {
  return u(o(t, n), n);
};

module.exports.tokensToFunction = u;
module.exports.tokensToRegExp = w;
var n = new RegExp(['(\\\\.)', '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'].join('|'), 'g');

function o(t, o) {
  for (var p, u = [], f = 0, s = 0, h = '', x = (o && o.delimiter) || '/'; null != (p = n.exec(t)); ) {
    var v = p[0],
      w = p[1],
      E = p.index;
    if (((h += t.slice(s, E)), (s = E + v.length), w)) h += w[1];
    else {
      var y = t[s],
        R = p[2],
        $ = p[3],
        b = p[4],
        T = p[5],
        k = p[6],
        C = p[7];

      if (h) {
        u.push(h);
        h = '';
      }

      var U = null != R && null != y && y !== R,
        S = '+' === k || '*' === k,
        j = '?' === k || '*' === k,
        A = p[2] || x,
        I = b || T;
      u.push({
        name: $ || f++,
        prefix: R || '',
        delimiter: A,
        optional: j,
        repeat: S,
        partial: U,
        asterisk: !!C,
        pattern: I ? c(I) : C ? '.*' : '[^' + l(A) + ']+?',
      });
    }
  }

  if (s < t.length) h += t.substr(s);
  if (h) u.push(h);
  return u;
}

function p(t) {
  return encodeURI(t).replace(/[\/?#]/g, function (t) {
    return '%' + t.charCodeAt(0).toString(16).toUpperCase();
  });
}

function u(n, o) {
  for (var u = new Array(n.length), l = 0; l < n.length; l++) 'object' == typeof n[l] && (u[l] = new RegExp('^(?:' + n[l].pattern + ')$', s(o)));

  return function (o, l) {
    for (var c = '', f = o || {}, s = (l || {}).pretty ? p : encodeURIComponent, h = 0; h < n.length; h++) {
      var x = n[h];

      if ('string' != typeof x) {
        var v,
          w = f[x.name];

        if (null == w) {
          if (x.optional) {
            if (x.partial) c += x.prefix;
            continue;
          }

          throw new TypeError('Expected "' + x.name + '" to be defined');
        }

        if (module1047(w)) {
          if (!x.repeat) throw new TypeError('Expected "' + x.name + '" to not repeat, but received `' + JSON.stringify(w) + '`');

          if (0 === w.length) {
            if (x.optional) continue;
            throw new TypeError('Expected "' + x.name + '" to not be empty');
          }

          for (var E = 0; E < w.length; E++) {
            if (((v = s(w[E])), !u[h].test(v))) throw new TypeError('Expected all "' + x.name + '" to match "' + x.pattern + '", but received `' + JSON.stringify(v) + '`');
            c += (0 === E ? x.prefix : x.delimiter) + v;
          }
        } else {
          if (
            ((v = x.asterisk
              ? encodeURI(w).replace(/[?#]/g, function (t) {
                  return '%' + t.charCodeAt(0).toString(16).toUpperCase();
                })
              : s(w)),
            !u[h].test(v))
          )
            throw new TypeError('Expected "' + x.name + '" to match "' + x.pattern + '", but received "' + v + '"');
          c += x.prefix + v;
        }
      } else c += x;
    }

    return c;
  };
}

function l(t) {
  return t.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1');
}

function c(t) {
  return t.replace(/([=!:$\/()])/g, '\\$1');
}

function f(t, n) {
  t.keys = n;
  return t;
}

function s(t) {
  return t && t.sensitive ? '' : 'i';
}

function h(t, n) {
  var o = t.source.match(/\((?!\?)/g);
  if (o)
    for (var p = 0; p < o.length; p++)
      n.push({
        name: p,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null,
      });
  return f(t, n);
}

function x(t, n, o) {
  for (var p = [], u = 0; u < t.length; u++) p.push(E(t[u], n, o).source);

  return f(new RegExp('(?:' + p.join('|') + ')', s(o)), n);
}

function v(t, n, p) {
  return w(o(t, p), n, p);
}

function w(n, o, p) {
  if (!module1047(o)) {
    p = o || p;
    o = [];
  }

  for (var u = (p = p || {}).strict, c = false !== p.end, h = '', x = 0; x < n.length; x++) {
    var v = n[x];
    if ('string' == typeof v) h += l(v);
    else {
      var w = l(v.prefix),
        E = '(?:' + v.pattern + ')';
      o.push(v);
      if (v.repeat) E += '(?:' + w + E + ')*';
      h += E = v.optional ? (v.partial ? w + '(' + E + ')?' : '(?:' + w + '(' + E + '))?') : w + '(' + E + ')';
    }
  }

  var y = l(p.delimiter || '/'),
    R = h.slice(-y.length) === y;
  if (!u) h = (R ? h.slice(0, -y.length) : h) + '(?:' + y + '(?=$))?';
  h += c ? '$' : u && R ? '' : '(?=' + y + '|$)';
  return f(new RegExp('^' + h, s(p)), o);
}

function E(n, o, p) {
  if (!module1047(o)) {
    p = o || p;
    o = [];
  }

  p = p || {};
  return n instanceof RegExp ? h(n, o) : module1047(n) ? x(n, o, p) : v(n, o, p);
}
