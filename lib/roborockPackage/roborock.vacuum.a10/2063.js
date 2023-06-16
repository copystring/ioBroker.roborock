exports.clear = h;
exports.update = b;
exports.currentState = v;
exports.addSubscription = S;
var n = 'https://clients3.google.com/generate_204',
  t = 6e4,
  l = 5e3,
  u = new Set(),
  c = null,
  o = null,
  f = null;

function s(n) {
  if (c !== n) {
    c = n;
    u.forEach(function (n) {
      n(c);
    });
  }
}

function p() {
  var u = false;
  return {
    promise: fetch(n)
      .then(function (n) {
        if (!u) {
          s(204 === n.status);
          f = setTimeout(p, c ? t : l);
        }
      })
      .catch(function () {
        s(false);
        f = setTimeout(p, l);
      }),
    cancel: function () {
      u = true;
    },
  };
}

function h() {
  if (null !== o) {
    o.cancel();
    o = null;
  }

  if (null !== f) {
    clearTimeout(f);
    f = null;
  }

  u.clear();
}

function b(n) {
  var t;
  if ('boolean' == typeof n.isInternetReachable) s(n.isInternetReachable);
  else {
    t = n.isConnected;

    if (null !== o) {
      o.cancel();
      o = null;
    }

    if (null !== f) {
      clearTimeout(f);
      f = null;
    }

    if (t) {
      if (!c) s(null);
      o = p();
    } else s(false);
  }
}

function v() {
  return c;
}

function S(n) {
  u.add(n);
  return function () {
    u.delete(n);
  };
}

var _ = {
  update: b,
  currentState: v,
  clear: h,
  addSubscription: S,
};
exports.default = _;
