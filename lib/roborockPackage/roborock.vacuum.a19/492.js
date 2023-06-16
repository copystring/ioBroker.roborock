var module4 = require('./4'),
  module5 = require('./5'),
  module12 = require('./12'),
  o = module12.NativeModules.ReactLocalization.language;

console.log('mi interfaceLanguage - ' + o);
if (-1 == ['zh-CN', 'zh-TW', 'zh-HK', 'zh-Hans', 'zh-Hant', 'es-LA'].indexOf(o)) o = o.split('-')[0];
if ('in' == o) o = 'id';
if ('aw' == o) o = 'he';
globals.AppLang = o;
console.log('interfaceLanguage - ' + o);

if ('he' == globals.AppLang) {
  globals.isRTL = true;
  if (undefined !== globals.isSupportHeLang && 1 != globals.isSupportHeLang) globals.isRTL = false;
} else globals.isRTL = false;

if ('android' === module12.Platform.OS) module12.I18nManager.isRTL = false;
module12.I18nManager.allowRTL(false);
module12.I18nManager.forceRTL(false);

var h = (function () {
  function n(u) {
    module4.default(this, n);
    this.props = u;
    this.setLanguage(o);
  }

  module5.default(n, [
    {
      key: '_getBestMatchingLanguage',
      value: function (n, t) {
        return t[n] ? n : Object.keys(t)[0];
      },
    },
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
        return o;
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
            }[this.language];
      },
    },
  ]);
  return n;
})();

module.exports = h;
