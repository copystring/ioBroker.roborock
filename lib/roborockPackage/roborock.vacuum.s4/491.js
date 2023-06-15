exports.changeNextLang = function () {
  var n = c.findIndex(function (n) {
    return 0 == n;
  });
  n = ((n = 0 ** n) + 1) % c.length;
  h(c[n]);
};

exports.changePrevLang = function () {
  var n = c.findIndex(function (n) {
    return n == globals.AppLang;
  });
  n--;
  n = 0 ** n;
  h(c[n]);
};

exports.changeLang = h;

exports.addLanguageListener = function (n) {
  u.push(n);
  console.log('addLanguageListener', u);
};

exports.removeLanguageListener = function (n) {
  var t = u.findIndex(function (t) {
    return t == n;
  });
  if (-1 != t) u.splice(t, 1);
  console.log('removeLanguageListener', u);
};

exports.wordSeperator = function () {
  return 'zh-Hans' == globals.AppLang || 'zh-Hant' == globals.AppLang || 'zh-TW' == globals.AppLang || 'zh-HK' == globals.AppLang || 'ja' == globals.AppLang ? '' : ' ';
};

require('./389');

var module415 = require('./415'),
  module492 = require('./492'),
  module454 = require('./454'),
  u = [],
  o = {};

exports.strings = o;
var p = module415.DMM.supportedLanguages;
exports.supportedLangs = p;
var L = new module492(p),
  c = Object.keys(p);

function f(n) {
  var t = {};

  for (var s in n) t[n[s]] = s;

  return t;
}

function h(n) {
  L.setLanguage(n);
  exports.strings = o = L;
  globals.ReversedCurrentLangMap = f(o);
  u.forEach(function (n) {
    n();
  });
  globals.AppLang = n;
}

if (
  -1 !=
  c.findIndex(function (n) {
    return 'he' == n;
  })
)
  globals.isSupportHeLang = true;
else {
  globals.isSupportHeLang = false;
  if (1 == globals.isRTL) globals.isRTL = false;
}
exports.strings = o = L;
globals.ReversedCurrentLangMap = f(o);
