exports.setup = c;
exports.tearDown = v;
exports.latest = s;
exports.add = _;
exports.remove = h;

var module1929 = require('./1929'),
  module1926 = require('./1926'),
  o = new Set(),
  f = null;

function l(t) {
  var n = module1926.default.convertState(t);
  f = n;
  o.forEach(function (t) {
    return t(n);
  });
}

function c() {
  module1929.default.add(l);
}

function v() {}

function s() {
  return f
    ? Promise.resolve(f)
    : module1929.default.latest().then(function (t) {
        f = module1926.default.convertState(t);
        return f;
      });
}

function _(t) {
  o.add(t);
  if (f) t(f);
  else s().then(t);
}

function h(t) {
  o.delete(t);
}

var p = {
  setup: c,
  tearDown: v,
  latest: s,
  add: _,
  remove: h,
};
exports.default = p;
