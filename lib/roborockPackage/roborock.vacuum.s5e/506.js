var module4 = require('./4'),
  module12 = require('./12').NativeModules.ReactLocalization.language;

console.log('mi interfaceLanguage - ' + module12);
if (-1 == ['zh-CN', 'zh-TW', 'zh-HK', 'zh-Hans', 'zh-Hant', 'es-LA'].indexOf(module12)) module12 = module12.split('-')[0];
if ('in' == module12) module12 = 'id';
if ('aw' == module12) module12 = 'he';
globals.AppLang = module12;
console.log('interfaceLanguage - ' + module12);

if ('he' == globals.AppLang || 'ar' == globals.AppLang) {
  globals.isRTL = true;
  if (undefined !== globals.isSupportHeLang && 1 != globals.isSupportHeLang) globals.isRTL = false;
} else globals.isRTL = false;

var o = (function () {
  function t(u) {
    module4.default(this, t);
    this.props = u;
    this.setLanguage(module12);
  }

  module5.default(t, [
    {
      key: '_getBestMatchingLanguage',
      value: function (t, n) {
        return n[t] ? t : Object.keys(n)[0];
      },
    },
  ]);
  module5.default(t, [
    {
      key: 'setLanguage',
      value: function (t) {
        var n = this._getBestMatchingLanguage(t, this.props);

        if (((this.language = n), this.props[n])) {
          var u = this.props[this.language];

          for (var s in u) u.hasOwnProperty(s) && (this[s] = u[s]);
        }
      },
    },
    {
      key: 'getLanguage',
      value: function () {
        return this.language;
      },
    },
    {
      key: 'getInterfaceLanguage',
      value: function () {
        return module12;
      },
    },
    {
      key: 'getResourceLanguageCode',
      value: function (t) {
        return t
          ? t[this.language]
          : {
              en: 'en',
              'zh-CN': 'cn',
              'zh-Hans': 'cn',
              'zh-Hant': 'tw',
              'zh-HK': 'tw',
              'zh-TW': 'tw',
              'es-LA': 'esla',
              ko: 'ko',
              ru: 'ru',
              ja: 'ja',
              de: 'de',
              es: 'es',
              fr: 'fr',
              it: 'it',
              he: 'he',
              id: 'id',
              pl: 'pl',
              ro: 'ro',
              th: 'th',
              uk: 'uk',
              vi: 'vi',
              ms: 'my',
              ar: 'ar',
            }[this.language];
      },
    },
  ]);
  return t;
})();

module.exports = o;
