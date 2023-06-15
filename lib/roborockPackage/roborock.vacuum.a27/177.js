var t,
  n,
  s,
  u,
  module178 = require('./178'),
  module179 = require('./179');

function c() {
  if (u) return u;
  var t = globals.nativeExtensions && globals.nativeExtensions.SourceCode;
  if (!t) t = require('./181').default;
  u = t.getConstants().scriptURL;
  return u;
}

function l() {
  if (undefined === n) {
    var t = c(),
      s = t && t.match(/^https?:\/\/.*?\//);
    n = s ? s[0] : null;
  }

  return n;
}

function v(t) {
  if (t) {
    if (t.startsWith('assets://')) return null;
    if (!(t = t.substring(0, t.lastIndexOf('/') + 1)).includes('://')) t = 'file://' + t;
  }

  return t;
}

module.exports = function (n) {
  if ('object' == typeof n) return n;
  var u = module178.getAssetByID(n);
  if (!u) return null;
  var p = new module179(l(), (undefined === s && (s = v(c())), s), u);
  return t ? t(p) : p.defaultAsset();
};

module.exports.pickScale = module179.pickScale;

module.exports.setCustomSourceTransformer = function (n) {
  t = n;
};
