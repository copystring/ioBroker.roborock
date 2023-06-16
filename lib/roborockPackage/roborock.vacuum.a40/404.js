function t() {
  this.i = 0;
  this.j = 0;
  this.S = new Array();
}

t.prototype.init = function (t) {
  var n, o, h;

  for (n = 0; n < 256; ++n) this.S[n] = n;

  for (o = 0, n = 0; n < 256; ++n) {
    o = (o + this.S[n] + t[n % t.length]) & 255;
    h = this.S[n];
    this.S[n] = this.S[o];
    this.S[o] = h;
  }

  this.i = 0;
  this.j = 0;
};

t.prototype.next = function () {
  var t;
  this.i = (this.i + 1) & 255;
  this.j = (this.j + this.S[this.i]) & 255;
  t = this.S[this.i];
  this.S[this.i] = this.S[this.j];
  this.S[this.j] = t;
  return this.S[(t + this.S[this.i]) & 255];
};

var n,
  o,
  h,
  s = 256;

function f() {
  var t;
  t = new Date().getTime();
  o[h++] ^= 255 & t;
  o[h++] ^= (t >> 8) & 255;
  o[h++] ^= (t >> 16) & 255;
  o[h++] ^= (t >> 24) & 255;
  if (h >= s) h -= s;
}

if (null == o) {
  var p;

  if (((o = new Array()), (h = 0), 'undefined' != typeof window)) {
    if (window.crypto && window.crypto.getRandomValues) {
      var w = new Uint8Array(32);

      for (window.crypto.getRandomValues(w), p = 0; p < 32; ++p) o[h++] = w[p];
    }

    if ('Netscape' == navigator.appName && navigator.appVersion < '5' && window.crypto) {
      var c = window.crypto.random(32);

      for (p = 0; p < c.length; ++p) o[h++] = 255 & c.charCodeAt(p);
    }
  }

  for (; h < s; ) {
    p = Math.floor(65536 * Math.random());
    o[h++] = p >>> 8;
    o[h++] = 255 & p;
  }

  h = 0;
  f();
}

function u() {
  if (null == n) {
    for (f(), (n = new t()).init(o), h = 0; h < o.length; ++h) o[h] = 0;

    h = 0;
  }

  return n.next();
}

function S() {}

S.prototype.nextBytes = function (t) {
  var n;

  for (n = 0; n < t.length; ++n) t[n] = u();
};

module.exports = S;
