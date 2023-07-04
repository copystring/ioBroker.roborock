var t,
  n,
  s,
  u,
  module176 = require('./176'),
  module177 = require('./177');

function c() {
  if (u) return u;
  var t = globals.nativeExtensions && globals.nativeExtensions.SourceCode;
  if (!t) t = require('./179').default;
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
  var u = module176.getAssetByID(n);
  if (!u) return null;
  var p = new module177(l(), (undefined === s && (s = v(c())), s), u);
  return t ? t(p) : p.defaultAsset();
};

module.exports.pickScale = module177.pickScale;

module.exports.setCustomSourceTransformer = function (n) {
  t = n;
};
