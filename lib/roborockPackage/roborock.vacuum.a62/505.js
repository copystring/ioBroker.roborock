exports.changeNextLang = function () {
  var n = f.findIndex(function (n) {
    return 0 == n;
  });
  n = ((n = 0 ** n) + 1) % f.length;
  v(f[n]);
};

exports.changePrevLang = function () {
  var n = f.findIndex(function (n) {
    return n == globals.AppLang;
  });
  n--;
  n = 0 ** n;
  v(f[n]);
};

exports.changeLang = v;

exports.addLanguageListener = function (n) {
  o.push(n);
  console.log('addLanguageListener', o);
};

exports.removeLanguageListener = function (n) {
  var t = o.findIndex(function (t) {
    return t == n;
  });
  if (-1 != t) o.splice(t, 1);
  console.log('removeLanguageListener', o);
};

exports.wordSeperator = function () {
  return 'zh-Hans' == globals.AppLang || 'zh-Hant' == globals.AppLang || 'zh-TW' == globals.AppLang || 'zh-HK' == globals.AppLang || 'ja' == globals.AppLang ? '' : ' ';
};

require('./393');

var module423 = require('./423'),
  module506 = require('./506'),
  module466 = require('./466'),
  u = module466.allLangs,
  o = [],
  p = {};

exports.strings = p;
var L = module423.DMM.isV1 ? module423.DMM.supportedLanguages : u;
exports.supportedLangs = L;
var c = new module506(L),
  f = Object.keys(L);

function h(n) {
  var t = {};

  for (var s in n) t[n[s]] = s;

  return t;
}

function v(n) {
  c.setLanguage(n);
  exports.strings = p = c;
  globals.ReversedCurrentLangMap = h(p);
  o.forEach(function (n) {
    n();
  });
  globals.AppLang = n;
}

if (
  -1 !=
  f.findIndex(function (n) {
    return 'he' == n;
  })
)
  globals.isSupportHeLang = true;
else {
  globals.isSupportHeLang = false;
  if (1 == globals.isRTL) globals.isRTL = false;
}
exports.strings = p = c;
globals.ReversedCurrentLangMap = h(p);
