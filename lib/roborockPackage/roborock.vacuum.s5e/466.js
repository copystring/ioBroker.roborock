var module467 = require('./467'),
  module468 = require('./468'),
  t = Object.keys(module468),
  z = function (z) {
    t.forEach(function (t) {
      var v = z[t],
        s = module467[t],
        o = module468[t];
      Object.defineProperty(z, t, {
        enumerable: true,
        get: function () {
          return v && -1 == v.indexOf('###') ? v : s && -1 == s.indexOf('###') ? s : o;
        },
      });
    });
  },
  module467 = require('./467');

z(module467);

var module469 = require('./469');

z(module469);

var module470 = require('./470');

z(module470);

var module471 = require('./471');

z(module471);

var module472 = require('./472');

z(module472);

var module473 = require('./473');

z(module473);

var module474 = require('./474');

z(module474);

var module475 = require('./475');

z(module475);

var module476 = require('./476');

z(module476);

var module477 = require('./477');

z(module477);

var module478 = require('./478');

z(module478);

var module479 = require('./479');

z(module479);

var module480 = require('./480');

z(module480);

var module481 = require('./481');

z(module481);

var module482 = require('./482');

z(module482);

var module483 = require('./483');

z(module483);

var module484 = require('./484');

z(module484);

var module485 = require('./485');

z(module485);

var module486 = require('./486');

z(module486);

var module487 = require('./487');

z(module487);

var module488 = require('./488');

z(module488);

var module489 = require('./489');

z(module489);

var module490 = require('./490');

z(module490);
exports.allLangs = {
  en: module467,
  'zh-CN': module468,
  'zh-Hans': module468,
  'zh-Hant': module469,
  'zh-HK': module470,
  'zh-TW': module471,
  ko: module472,
  ru: module473,
  ja: module474,
  de: module475,
  es: module476,
  fr: module477,
  it: module478,
  he: module479,
  id: module480,
  pl: module481,
  ro: module482,
  th: module483,
  uk: module484,
  vi: module485,
  pt: module486,
  ms: module487,
  tr: module488,
  'es-LA': module489,
  ar: module490,
};
exports.hansDoc = module468;
exports.enDoc = module467;
exports.frDoc = module477;
exports.esDoc = module476;
exports.itDoc = module478;
exports.frDoc = module477;
exports.deDoc = module475;
exports.tanoseV1Langs = {
  en: module467,
  'zh-CN': module468,
  'zh-Hans': module468,
  'zh-Hant': module469,
  'zh-HK': module470,
  'zh-TW': module471,
};
exports.cnWithEnV1Langs = {
  en: module467,
  'zh-CN': module468,
  'zh-Hans': module468,
};
exports.allWithoutHeLangs = {
  en: module467,
  'zh-CN': module468,
  'zh-Hans': module468,
  'zh-Hant': module469,
  'zh-HK': module470,
  'zh-TW': module471,
  ko: module472,
  ru: module473,
  ja: module474,
  de: module475,
  es: module476,
  fr: module477,
  it: module478,
  id: module480,
  pl: module481,
  ro: module482,
  th: module483,
  uk: module484,
  vi: module485,
  pt: module486,
  ms: module487,
  tr: module488,
  'es-LA': module489,
};
exports.defaultV1SupportedLangs = {
  en: module467,
  'zh-CN': module468,
  'zh-Hans': module468,
  'zh-Hant': module469,
  'zh-HK': module470,
  'zh-TW': module471,
  ko: module472,
  ru: module473,
  ja: module474,
  de: module475,
  es: module476,
  fr: module477,
  it: module478,
  he: module479,
  id: module480,
  pl: module481,
  ro: module482,
  th: module483,
  uk: module484,
  vi: module485,
  pt: module486,
  ms: module487,
  tr: module488,
  'es-LA': module489,
  ar: module490,
};
exports.topazSVV1SupportedLangs = {
  en: module467,
  'zh-CN': module468,
  'zh-Hans': module468,
  'zh-Hant': module469,
  'zh-HK': module470,
  'zh-TW': module471,
  ko: module472,
  ru: module473,
  ja: module474,
  de: module475,
  es: module476,
  fr: module477,
  it: module478,
};
