var module455 = require('./455'),
  module456 = require('./456'),
  h = Object.keys(module456),
  v = function (v) {
    h.forEach(function (h) {
      var s = v[h],
        o = module455[h],
        z = module456[h];
      Object.defineProperty(v, h, {
        enumerable: true,
        get: function () {
          return s && -1 == s.indexOf('###') ? s : o && -1 == o.indexOf('###') ? o : z;
        },
      });
    });
  },
  module455 = require('./455');

v(module455);

var module457 = require('./457');

v(module457);

var module458 = require('./458');

v(module458);

var module459 = require('./459');

v(module459);

var module460 = require('./460');

v(module460);

var module461 = require('./461');

v(module461);

var module462 = require('./462');

v(module462);

var module463 = require('./463');

v(module463);

var module464 = require('./464');

v(module464);

var module465 = require('./465');

v(module465);

var module466 = require('./466');

v(module466);

var module467 = require('./467');

v(module467);

var module468 = require('./468');

v(module468);

var module469 = require('./469');

v(module469);

var module470 = require('./470');

v(module470);

var module471 = require('./471');

v(module471);

var module472 = require('./472');

v(module472);

var module473 = require('./473');

v(module473);

var module474 = require('./474');

v(module474);

var module475 = require('./475');

v(module475);

var module476 = require('./476');

v(module476);

var module477 = require('./477');

v(module477);
exports.allLangs = {
  en: module455,
  'zh-CN': module456,
  'zh-Hans': module456,
  'zh-Hant': module457,
  'zh-HK': module458,
  'zh-TW': module459,
  ko: module460,
  ru: module461,
  ja: module462,
  de: module463,
  es: module464,
  fr: module465,
  it: module466,
  he: module467,
  id: module468,
  pl: module469,
  ro: module470,
  th: module471,
  uk: module472,
  vi: module473,
  pt: module474,
  ms: module475,
  tr: module476,
  'es-LA': module477,
};
exports.hansDoc = module456;
exports.enDoc = module455;
exports.frDoc = module465;
exports.esDoc = module464;
exports.itDoc = module466;
exports.frDoc = module465;
exports.deDoc = module463;
exports.tanoseV1Langs = {
  en: module455,
  'zh-CN': module456,
  'zh-Hans': module456,
  'zh-Hant': module457,
  'zh-HK': module458,
  'zh-TW': module459,
};
exports.cnWithEnV1Langs = {
  en: module455,
  'zh-CN': module456,
  'zh-Hans': module456,
};
exports.allWithoutHeLangs = {
  en: module455,
  'zh-CN': module456,
  'zh-Hans': module456,
  'zh-Hant': module457,
  'zh-HK': module458,
  'zh-TW': module459,
  ko: module460,
  ru: module461,
  ja: module462,
  de: module463,
  es: module464,
  fr: module465,
  it: module466,
  id: module468,
  pl: module469,
  ro: module470,
  th: module471,
  uk: module472,
  vi: module473,
  pt: module474,
  ms: module475,
  tr: module476,
  'es-LA': module477,
};
exports.defaultV1SupportedLangs = {
  en: module455,
  'zh-CN': module456,
  'zh-Hans': module456,
  'zh-Hant': module457,
  'zh-HK': module458,
  'zh-TW': module459,
  ko: module460,
  ru: module461,
  ja: module462,
  de: module463,
  es: module464,
  fr: module465,
  it: module466,
  he: module467,
  id: module468,
  pl: module469,
  ro: module470,
  th: module471,
  uk: module472,
  vi: module473,
  pt: module474,
  ms: module475,
  tr: module476,
  'es-LA': module477,
};
