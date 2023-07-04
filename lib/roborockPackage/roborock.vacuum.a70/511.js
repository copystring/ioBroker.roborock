var module6 = require('./6'),
  module13 = require('./13').NativeModules.ReactLocalization.language,
  module411 = require('./411');

console.log('mi interfaceLanguage - ' + module13);
if (-1 == ['zh-CN', 'zh-TW', 'zh-HK', 'zh-Hans', 'zh-Hant', 'es-LA'].indexOf(module13)) module13 = module13.split('-')[0];
if ('in' == module13) module13 = 'id';
if ('aw' == module13) module13 = 'he';
module13 = module411.lang || module13;
globals.AppLang = module13;
console.log('interfaceLanguage - ' + module13);

if ('he' == globals.AppLang || 'ar' == globals.AppLang) {
  globals.isRTL = true;
  if (undefined !== globals.isSupportHeLang && 1 != globals.isSupportHeLang) globals.isRTL = false;
} else globals.isRTL = false;

var h = (function () {
  function n(u) {
    module6.default(this, n);
    this.props = u;
    this.setLanguage(module13);
  }

  module7.default(n, [
    {
      key: '_getBestMatchingLanguage',
      value: function (n, t) {
        return t[n] ? n : t.en ? 'en' : Object.keys(t)[0];
      },
    },
  ]);
  module7.default(n, [
    {
      key: 'setLanguage',
      value: function (n) {
        var t = this._getBestMatchingLanguage(n, this.props);

        if (((this.language = t), this.props[t])) {
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
        return module13;
      },
    },
    {
      key: 'getResourceLanguageCode',
      value: function (n) {
        return n
          ? n[this.language]
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
  return n;
})();

module.exports = h;
