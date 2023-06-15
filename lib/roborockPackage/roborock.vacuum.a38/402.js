var module403 = require('./403'),
  module404 = require('./404');

function o(n, o) {
  return new module403(n, o);
}

function s(o, s) {
  if (s < o.length + 11) {
    console.log('Message too long for RSA');
    return null;
  }

  for (var h = new Array(), l = o.length - 1; l >= 0 && s > 0; ) h[--s] = o[l--];

  h[--s] = 0;

  for (var u = new module404(), p = new Array(); s > 2; ) {
    for (p[0] = 0; 0 == p[0]; ) u.nextBytes(p);

    h[--s] = p[0];
  }

  h[--s] = 2;
  h[--s] = 0;
  return new module403(h);
}

function h() {
  this.n = null;
  this.e = 0;
  this.d = null;
  this.p = null;
  this.q = null;
  this.dmp1 = null;
  this.dmq1 = null;
  this.coeff = null;
}

function l(t, n) {
  var o = t.toByteArray();
  console.warn('bytes length is :' + o.length);

  for (var s = 0; s < o.length && 0 == o[s]; ) ++s;

  if (o.length - s != n - 1 || 2 != o[s]) return null;

  for (++s; 0 != o[s]; ) if (++s >= o.length) return null;

  for (var h = new Array(); ++s < o.length; ) {
    var l = 255 & o[s];
    h.push(l);
  }

  return h;
}

h.prototype.doPublic = function (t) {
  return t.modPowInt(this.e, this.n);
};

h.prototype.setPublic = function (t, n) {
  if (null != t && null != n && t.length > 0 && n.length > 0) {
    this.n = o(t, 16);
    this.e = parseInt(n, 16);
  } else console.log('Invalid RSA public key');
};

h.prototype.encrypt = function (t) {
  var n = s(t, (this.n.bitLength() + 7) >> 3);
  if (null == n) return null;
  var o = this.doPublic(n);
  if (null == o) return null;
  var h = o.toString(16);
  return 0 == (1 & h.length) ? h : '0' + h;
};

h.prototype.doPrivate = function (t) {
  if (null == this.p || null == this.q) return t.modPow(this.d, this.n);

  for (var n = t.mod(this.p).modPow(this.dmp1, this.p), o = t.mod(this.q).modPow(this.dmq1, this.q); n.compareTo(o) < 0; ) n = n.add(this.p);

  return n.subtract(o).multiply(this.coeff).mod(this.p).multiply(this.q).add(o);
};

h.prototype.setPrivateEx = function (t, n, s, h, l, u, p, f) {
  var c = {};
  if ('object' == typeof t) c = t;
  else {
    c.n = t;
    c.e = n;
    c.d = s;
    c.p = h;
    c.q = l;
    c.dmp1 = u;
    c.dmq1 = p;
    c.coeff = f;
  }

  if (null != c.n && null != c.e && c.n.length > 0 && c.e.length > 0) {
    this.n = o(c.n, 16);
    this.e = parseInt(c.e, 16);
    this.d = o(c.d, 16);
    this.p = o(c.p, 16);
    this.q = o(c.q, 16);
    this.dmp1 = o(c.dmp1, 16);
    this.dmq1 = o(c.dmq1, 16);
    this.coeff = o(c.coeff, 16);
  } else console.log('Invalid RSA private key');
};

h.prototype.generate = function (o, s) {
  var h = new module404(),
    l = o >> 1;
  this.e = parseInt(s, 16);

  for (var u = new module403(s, 16); ; ) {
    for (; (this.p = new module403(o - l, 1, h)), 0 != this.p.subtract(module403.ONE).gcd(u).compareTo(module403.ONE) || !this.p.isProbablePrime(10); );

    for (; (this.q = new module403(l, 1, h)), 0 != this.q.subtract(module403.ONE).gcd(u).compareTo(module403.ONE) || !this.q.isProbablePrime(10); );

    if (this.p.compareTo(this.q) <= 0) {
      var p = this.p;
      this.p = this.q;
      this.q = p;
    }

    var f = this.p.subtract(module403.ONE),
      c = this.q.subtract(module403.ONE),
      v = f.multiply(c);

    if (0 == v.gcd(u).compareTo(module403.ONE)) {
      this.n = this.p.multiply(this.q);
      this.d = u.modInverse(v);
      this.dmp1 = this.d.mod(f);
      this.dmq1 = this.d.mod(c);
      this.coeff = this.q.modInverse(this.p);
      break;
    }
  }
};

h.prototype.decrypt = function (t) {
  var n = o(t, 16),
    s = this.doPrivate(n);
  return null == s ? null : l(s, (this.n.bitLength() + 7) >> 3);
};

h.prototype.getPublicString = function () {
  var t = {
    n: this.n.toString(16),
    e: this.e.toString(16),
  };
  if (t.n.length % 2 == 1) t.n = '0' + t.n;
  return JSON.stringify(t);
};

h.prototype.setPublicString = function (t) {
  var n = JSON.parse(t);
  return this.setPublic(n.n, n.e);
};

h.prototype.getPrivateString = function () {
  var t = {},
    n = this;
  ['n', 'e', 'd', 'p', 'q', 'dmp1', 'dmq1', 'coeff'].forEach(function (o) {
    t[o] = n[o] && n[o].toString(16);
    if ('e' != o && t[o].length % 2 == 1) t[o] = '0' + t[o];
  });
  return JSON.stringify(t);
};

h.prototype.setPrivateString = function (t) {
  var n = JSON.parse(t);
  return this.setPrivateEx(n);
};

h.prototype.linebrk = function (t, n) {
  for (var o = '', s = 0; s + n < t.length; ) {
    o += t.substring(s, s + n) + '\n';
    s += n;
  }

  return o + t.substring(s, t.length);
};

module.exports = h;
