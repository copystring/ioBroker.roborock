var module471 = require('./471'),
  module472 = require('./472'),
  h = Object.keys(module472),
  o = function (o) {
    h.forEach(function (h) {
      var s = o[h],
        v = module471[h],
        z = module472[h];
      Object.defineProperty(o, h, {
        enumerable: true,
        get: function () {
          return s && -1 == s.indexOf('###') ? s : v && -1 == v.indexOf('###') ? v : z;
        },
      });
    });
  },
  module471 = require('./471');

o(module471);

var module473 = require('./473');

o(module473);

var module474 = require('./474');

o(module474);

var module475 = require('./475');

o(module475);

var module476 = require('./476');

o(module476);

var module477 = require('./477');

o(module477);

var module478 = require('./478');

o(module478);

var module479 = require('./479');

o(module479);

var module480 = require('./480');

o(module480);

var module481 = require('./481');

o(module481);

var module482 = require('./482');

o(module482);

var module483 = require('./483');

o(module483);

var module484 = require('./484');

o(module484);

var module485 = require('./485');

o(module485);

var module486 = require('./486');

o(module486);

var module487 = require('./487');

o(module487);

var module488 = require('./488');

o(module488);

var module489 = require('./489');

o(module489);

var module490 = require('./490');

o(module490);

var module491 = require('./491');

o(module491);

var module492 = require('./492');

o(module492);

var module493 = require('./493');

o(module493);

var module494 = require('./494');

o(module494);
exports.allLangs = {
  en: module471,
  'zh-CN': module472,
  'zh-Hans': module472,
  'zh-Hant': module473,
  'zh-HK': module474,
  'zh-TW': module475,
  ko: module476,
  ru: module477,
  ja: module478,
  de: module479,
  es: module480,
  fr: module481,
  it: module482,
  he: module483,
  id: module484,
  pl: module485,
  ro: module486,
  th: module487,
  uk: module488,
  vi: module489,
  pt: module490,
  ms: module491,
  tr: module492,
  'es-LA': module493,
  ar: module494,
};

exports.genSupportedLangs = function (n) {
  var t = {};
  n.forEach(function (n) {
    t[n] = exports.allLangs[n];
  });
  return t;
};

exports.hansDoc = module472;
exports.enDoc = module471;
exports.frDoc = module481;
exports.esDoc = module480;
exports.itDoc = module482;
exports.frDoc = module481;
exports.deDoc = module479;
exports.tanoseV1Langs = {
  en: module471,
  'zh-CN': module472,
  'zh-Hans': module472,
  'zh-Hant': module473,
  'zh-HK': module474,
  'zh-TW': module475,
};
exports.cnWithEnV1Langs = {
  en: module471,
  'zh-CN': module472,
  'zh-Hans': module472,
};
exports.allWithoutHeLangs = {
  en: module471,
  'zh-CN': module472,
  'zh-Hans': module472,
  'zh-Hant': module473,
  'zh-HK': module474,
  'zh-TW': module475,
  ko: module476,
  ru: module477,
  ja: module478,
  de: module479,
  es: module480,
  fr: module481,
  it: module482,
  id: module484,
  pl: module485,
  ro: module486,
  th: module487,
  uk: module488,
  vi: module489,
  pt: module490,
  ms: module491,
  tr: module492,
  'es-LA': module493,
};
exports.defaultV1SupportedLangs = {
  en: module471,
  'zh-CN': module472,
  'zh-Hans': module472,
  'zh-Hant': module473,
  'zh-HK': module474,
  'zh-TW': module475,
  ko: module476,
  ru: module477,
  ja: module478,
  de: module479,
  es: module480,
  fr: module481,
  it: module482,
  he: module483,
  id: module484,
  pl: module485,
  ro: module486,
  th: module487,
  uk: module488,
  vi: module489,
  pt: module490,
  ms: module491,
  tr: module492,
  'es-LA': module493,
  ar: module494,
};
exports.topazSVV1SupportedLangs = {
  en: module471,
  'zh-CN': module472,
  'zh-Hans': module472,
  'zh-Hant': module473,
  'zh-HK': module474,
  'zh-TW': module475,
  ko: module476,
  ru: module477,
  ja: module478,
  de: module479,
  es: module480,
  fr: module481,
  it: module482,
};
