exports.setup = c;
exports.tearDown = v;
exports.latest = s;
exports.add = _;
exports.remove = h;

var module2067 = require('./2067'),
  module2064 = require('./2064'),
  o = new Set(),
  f = null;

function l(t) {
  var n = module2064.default.convertState(t);
  f = n;
  o.forEach(function (t) {
    return t(n);
  });
}

function c() {
  module2067.default.add(l);
}

function v() {}

function s() {
  return f
    ? Promise.resolve(f)
    : module2067.default.latest().then(function (t) {
        f = module2064.default.convertState(t);
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
