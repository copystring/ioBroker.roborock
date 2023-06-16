exports.setup = c;
exports.tearDown = v;
exports.latest = s;
exports.add = _;
exports.remove = h;

var module1980 = require('./1980'),
  module1977 = require('./1977'),
  o = new Set(),
  f = null;

function l(t) {
  var n = module1977.default.convertState(t);
  f = n;
  o.forEach(function (t) {
    return t(n);
  });
}

function c() {
  module1980.default.add(l);
}

function v() {}

function s() {
  return f
    ? Promise.resolve(f)
    : module1980.default.latest().then(function (t) {
        f = module1977.default.convertState(t);
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
