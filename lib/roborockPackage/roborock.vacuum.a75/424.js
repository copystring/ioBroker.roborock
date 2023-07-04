var u,
  module50 = require('./50'),
  module6 = require('./6'),
  module96 = require('./96'),
  module425 = require('./425'),
  module393 = require('./393'),
  b = module393.deviceModel || module393.Device.model,
  module470 = require('./470').allLangs;

Array.prototype.hasElement = function (o) {
  return -1 != this.indexOf(o);
};

String.prototype.templateStringWithParams = function (o) {
  var u = Object.keys(o),
    c = Object.values(o);
  return module96.default(Function, module31.default(u).concat(['return `' + this + '`;'])).apply(undefined, module31.default(c));
};

var f = null,
  module498 = (function () {
    function o() {
      module6.default(this, o);
      if (!f) f = this;
      return f;
    }

    module7.default(
      o,
      [
        {
          key: 'isV',
          value: function (o) {
            return this.productVersion == o;
          },
        },
        {
          key: 'currentSeries',
          get: function () {
            return h(b);
          },
        },
        {
          key: 'currentProduct',
          get: function () {
            return C(b);
          },
        },
        {
          key: 'productVersion',
          get: function () {
            var o = b.split(/[^.]*\.[^.]*\.\D*\d*[^v]*/).join('');

            if (!o.match(/v\d*/) && 0 != o.length) {
              console.warn('Invalid product format!');
              return null;
            }

            var u = o.split('v').join('');
            return '' == u ? '1' : u;
          },
        },
        {
          key: 'volumeMax',
          get: function () {
            return M(b).max;
          },
        },
        {
          key: 'volumeMin',
          get: function () {
            return M(b).min;
          },
        },
        {
          key: 'supplies',
          get: function () {
            return E(b).supplies;
          },
        },
        {
          key: 'chargerAngle',
          get: function () {
            return this.currentProduct == T.RubyPlus || this.currentProduct == T.Garnet || this.currentProduct == T.Pearl ? 0 : 180;
          },
        },
        {
          key: 'robotInMap',
          get: function () {
            return {
              image: this.currentProduct == T.RubyPlus ? require('./495') : this.currentProduct == T.Garnet ? require('./496') : require('./497'),
              chargerAngle: this.chargerAngle,
              shadowBg: this.currentProduct == T.RubyPlus ? null : this.currentProduct == T.Garnet ? null : require('./498'),
            };
          },
        },
        {
          key: 'agreeProtocolLevel',
          get: function () {
            return this.currentProduct == T.Rubys ? 3 : 9;
          },
        },
        {
          key: 'bucket',
          get: function () {
            return E(b).bucket || ' ';
          },
        },
        {
          key: 'soundPackageFilePath',
          get: function () {
            var o = 1 == this.productVersion ? '' : 'debug/',
              u = E(b).bucket;
            return this.isTanos || this.isTanosE || this.isTanosV || this.isRubys || this.isRubyPlus || this.isRubysE || this.isRubySC
              ? '/' + u + '/app/voice-pkg/' + o
              : '/app/' + u + '/voice-pkg/' + o;
          },
        },
        {
          key: 'configFilePath',
          get: function () {
            var o = 1 == this.productVersion ? '' : 'debug/';
            return '/' + E(b).bucket + '/app/config/' + o;
          },
        },
        {
          key: 'errorImages',
          get: function () {
            return E(b).errorImages;
          },
        },
        {
          key: 'supportedLanguages',
          get: function () {
            return 1 == this.productVersion ? E(b).supportedLanguages : module470;
          },
        },
        {
          key: 'supportedGuideLanguages',
          get: function () {
            return E(b).guideLanguage.supported;
          },
        },
        {
          key: 'translatedGuideLanguages',
          get: function () {
            return E(b).guideLanguage.translated;
          },
        },
        {
          key: 'obstacleImagesMap',
          get: function () {
            return E(b).obstacleImages;
          },
        },
        {
          key: 'errorsMap',
          get: function () {
            return E(b).errors;
          },
        },
        {
          key: 'isV1',
          get: function () {
            return this.isV(1);
          },
        },
        {
          key: 'isV2',
          get: function () {
            return this.isV(2);
          },
        },
        {
          key: 'isV3',
          get: function () {
            return this.isV(3);
          },
        },
        {
          key: 'isV4',
          get: function () {
            return this.isV(4);
          },
        },
        {
          key: 'isV5',
          get: function () {
            return this.isV(5);
          },
        },
        {
          key: 'isTanosV',
          get: function () {
            return this.currentProduct == T.TanosV_CN || this.currentProduct == T.TanosV_CE;
          },
        },
        {
          key: 'isTanos',
          get: function () {
            return this.currentProduct == T.Tanos_CN || this.currentProduct == T.Tanos_CE;
          },
        },
        {
          key: 'isRuby',
          get: function () {
            return this.currentProduct == T.Ruby;
          },
        },
        {
          key: 'isRubys',
          get: function () {
            return this.currentProduct == T.Rubys;
          },
        },
        {
          key: 'isRuby2',
          get: function () {
            return this.currentProduct == T.Ruby2;
          },
        },
        {
          key: 'isSapphire',
          get: function () {
            return this.currentProduct == T.Sapphire;
          },
        },
        {
          key: 'isSapphireC',
          get: function () {
            return this.currentProduct == T.SapphireC;
          },
        },
        {
          key: 'isSapphirePlus',
          get: function () {
            return this.currentProduct == T.SapphirePlus;
          },
        },
        {
          key: 'isTanosCN',
          get: function () {
            return this.currentProduct == T.Tanos_CN;
          },
        },
        {
          key: 'isTanosCE',
          get: function () {
            return this.currentProduct == T.Tanos_CE;
          },
        },
        {
          key: 'isRubyPlus',
          get: function () {
            return this.currentProduct == T.RubyPlus;
          },
        },
        {
          key: 'isRubysLite',
          get: function () {
            return this.currentProduct == T.RubysLite;
          },
        },
        {
          key: 'isRubySC',
          get: function () {
            return this.currentProduct == T.RubySC;
          },
        },
        {
          key: 'isTanosE',
          get: function () {
            return this.currentProduct == T.TanosE;
          },
        },
        {
          key: 'isSapphireLite',
          get: function () {
            return this.currentProduct == T.SapphireLite;
          },
        },
        {
          key: 'isTanosV_CN',
          get: function () {
            return this.currentProduct == T.TanosV_CN;
          },
        },
        {
          key: 'isTanosV_CE',
          get: function () {
            return this.currentProduct == T.TanosV_CE;
          },
        },
        {
          key: 'isRubysE',
          get: function () {
            return this.currentProduct == T.RubysE;
          },
        },
        {
          key: 'isTanosS',
          get: function () {
            return this.currentProduct == T.TanosS;
          },
        },
        {
          key: 'isGarnet',
          get: function () {
            return this.currentProduct == T.Garnet;
          },
        },
        {
          key: 'isTanosSPlus',
          get: function () {
            return this.currentProduct == T.TanosSPlus;
          },
        },
        {
          key: 'isTopazSV',
          get: function () {
            return this.currentProduct == T.TopazSV_CN || this.currentProduct == T.TopazSV_CE;
          },
        },
        {
          key: 'isTopazSV_CN',
          get: function () {
            return this.currentProduct == T.TopazSV_CN;
          },
        },
        {
          key: 'isTopazSV_CE',
          get: function () {
            return this.currentProduct == T.TopazSV_CE;
          },
        },
        {
          key: 'isCoral',
          get: function () {
            return this.currentProduct == T.Coral;
          },
        },
        {
          key: 'isTopazS',
          get: function () {
            return this.currentProduct == T.TopazS || this.currentProduct == T.TopazS_CE || this.currentProduct == T.TopazSPower;
          },
        },
        {
          key: 'isTopazSPlus',
          get: function () {
            return this.currentProduct == T.TopazSPlus;
          },
        },
        {
          key: 'isTopazSPower',
          get: function () {
            return this.currentProduct == T.TopazSPower;
          },
        },
        {
          key: 'isTanosSC',
          get: function () {
            return this.currentProduct == T.TanosSC;
          },
        },
        {
          key: 'isTanosSL',
          get: function () {
            return this.currentProduct == T.TanosSL;
          },
        },
        {
          key: 'isTanosSE',
          get: function () {
            return this.currentProduct == T.TanosSE;
          },
        },
        {
          key: 'isTanosSV',
          get: function () {
            return this.currentProduct == T.TanosSV;
          },
        },
        {
          key: 'isTanosSMax',
          get: function () {
            return this.currentProduct == T.TanosSMax;
          },
        },
        {
          key: 'isTopazSC',
          get: function () {
            return this.currentProduct == T.TopazSC_CN || this.currentProduct == T.TopazSC_CE;
          },
        },
        {
          key: 'isUltron',
          get: function () {
            return this.currentProduct == T.Ultron;
          },
        },
        {
          key: 'isUltronSPlus',
          get: function () {
            return this.currentProduct == T.UltronSPlus;
          },
        },
        {
          key: 'isUltronSMop',
          get: function () {
            return false;
          },
        },
        {
          key: 'isUltronSV',
          get: function () {
            return false;
          },
        },
        {
          key: 'isUltronLite',
          get: function () {
            return this.currentProduct == T.UltronLite;
          },
        },
        {
          key: 'isUltronE',
          get: function () {
            return this.currentProduct == T.UltronE;
          },
        },
        {
          key: 'isUltronSLite',
          get: function () {
            return false;
          },
        },
        {
          key: 'isPearl',
          get: function () {
            return this.currentProduct == T.Pearl;
          },
        },
        {
          key: 'isPearlPlus',
          get: function () {
            return this.currentProduct == T.PearlPlus;
          },
        },
      ],
      [
        {
          key: 'sharedManager',
          value: function () {
            return new o();
          },
        },
      ]
    );
    return o;
  })();

exports.default = module498;
var T = {
  Ruby: 'RUBY',
  Ruby2: 'RUBY2',
  Rubys: 'RUBYS',
  Sapphire: 'SAPPHIRE',
  SapphireC: 'SAPPHIREC',
  Tanos_CN: 'TANOS_CN',
  Tanos_CE: 'TANOS_CE',
  RubyPlus: 'RUBYPLUS',
  RubysLite: 'RUBYSLITE',
  RubySC: 'RUBYSC',
  TanosE: 'TANOSE',
  SapphireLite: 'SAPPHIRELITE',
  TanosV_CN: 'TANOSV_CN',
  TanosV_CE: 'TANOSV_CE',
  RubysE: 'RUBYSE',
  TanosS: 'TANOSS',
  Garnet: 'GARNET',
  TanosSPlus: 'TANOSSPLUS',
  TopazSV_CN: 'TOPAZSV_CN',
  TopazSV_CE: 'TOPAZSV_CE',
  Coral: 'Coral',
  TanosSL: 'TANOSSL',
  TanosSC: 'TANOSSC',
  TanosSE: 'TANOSSE',
  TopazS: 'TOPAZS',
  TopazS_CE: 'TOPAZS_CE',
  TopazSPower: 'TopazSPower',
  TanosSV: 'TANOSSV',
  TopazSPlus: 'TOPAZSPLUS',
  TanosSMax: 'TANOSSMAX',
  SapphirePlus: 'SAPPHIREPLUS',
  TopazSC_CN: 'TOPAZSC_CN',
  TopazSC_CE: 'TOPAZSC_CE',
  Ultron: 'Ultron',
  UltronSPlus: 'UltronSPlus',
  UltronE: 'UltronE',
  UltronLite: 'UltronLite',
  Pearl: 'Pearl',
  PearlPlus: 'PearlPlus',
};
exports.Products = T;
var P = {
  v1: 'v1',
  m1s: 'm1s',
  s5: 's5',
  e2: 'e2',
  c1: 'c1',
  t6: 't6',
  s6: 's6',
  t4: 't4',
  s4: 's4',
  a05: 'a05',
  p6: 'p6',
  s5e: 's5e',
  p5: 'p5',
  a08: 'a08',
  a11: 'a11',
  t7: 't7',
  a01: 'a01',
  t7p: 't7p',
  a09: 'a09',
  a10: 'a10',
  a19: 'a19',
  a14: 'a14',
  a15: 'a15',
  a16: 'a16',
  a17: 'a17',
  a23: 'a23',
  a24: 'a24',
  a26: 'a26',
  a27: 'a27',
  Coral: 'Coral',
  a37: 'a37',
  a38: 'a38',
  a39: 'a39',
  a40: 'a40',
  a33: 'a33',
  a34: 'a34',
  TopazS: 'TopazS',
  a30: 'a30',
  a44: 'a44',
  a45: 'a45',
  a46: 'a46',
  a47: 'a47',
  Ultron: 'Ultron',
  UltronSPlus: 'UltronSPlus',
  UltronE: 'UltronE',
  UltronLite: 'UltronLite',
  Pearl: 'Pearl',
  PearlPlus: 'PearlPlus',
  a51: 'a51',
  a52: 'a52',
  a49: 'a49',
  a62: 'a62',
  a64: 'a64',
  a65: 'a65',
  a66: 'a66',
};
exports.DeviceSeries = P;
u = {};
module50.default(u, P.v1, {
  models: ['rockrobo.vacuum.v1', 'rockrobo.sweeper.v2', 'rockrobo.sweeper.v1'],
  product: T.Ruby,
  volume: y.Default,
  resources: module425.ResourceMap.Ruby,
});
module50.default(u, P.m1s, {
  models: ['roborock.vacuum.m1s', 'roborock.vacuum.m1sv2', 'roborock.vacuum.m1sv3'],
  bucket: T.Ruby2,
  volume: y.Default,
  resources: module425.ResourceMap.Ruby2,
});
module50.default(u, P.s5, {
  models: ['roborock.vacuum.s5', 'roborock.sweeper.s5v2', 'roborock.sweeper.s5v3'],
  product: T.Rubys,
  volume: y.Default,
  resources: module425.ResourceMap.Rubys,
});
module50.default(u, P.e2, {
  models: ['roborock.vacuum.e2', 'roborock.sweeper.e2v2', 'roborock.sweeper.e2v3'],
  product: T.Sapphire,
  volume: y.Default,
  resources: module425.ResourceMap.Sapphire,
});
module50.default(u, P.c1, {
  models: ['roborock.vacuum.c1', 'roborock.sweeper.c1v2', 'roborock.sweeper.c1v3'],
  product: T.SapphireC,
  volume: y.Default,
  resources: module425.ResourceMap.SapphireC,
});
module50.default(u, P.t6, {
  models: ['roborock.vacuum.t6', 'roborock.vacuum.t6v2', 'roborock.vacuum.t6v3'],
  product: T.Tanos_CN,
  volume: y.Default,
  resources: module425.ResourceMap.Tanos_CN,
});
module50.default(u, P.s6, {
  models: ['roborock.vacuum.s6', 'roborock.vacuum.s6v2', 'roborock.vacuum.s6v3'],
  product: T.Tanos_CE,
  volume: y.Default,
  resources: module425.ResourceMap.Tanos_CE,
});
module50.default(u, P.t4, {
  models: ['roborock.vacuum.t4', 'roborock.vacuum.t4v2', 'roborock.vacuum.t4v3'],
  product: T.RubyPlus,
  volume: y.Default,
  resources: module425.ResourceMap.RubyPlus,
});
module50.default(u, P.s4, {
  models: ['roborock.vacuum.s4', 'roborock.vacuum.s4v2', 'roborock.vacuum.s4v3'],
  product: T.RubyPlus,
  volume: y.Default,
  resources: module425.ResourceMap.RubyPlus,
});
module50.default(u, P.a05, {
  models: ['roborock.vacuum.a05', 'roborock.vacuum.a05v2', 'roborock.vacuum.a05v3'],
  product: T.RubysLite,
  volume: y.Type1,
  resources: module425.ResourceMap.RubysLite,
});
module50.default(u, P.p6, {
  models: ['roborock.vacuum.p6', 'roborock.vacuum.p6v2', 'roborock.vacuum.p6v3', 'roborock.vacuum.p6v4', 'roborock.vacuum.p6v5'],
  product: T.RubysLite,
  volume: y.Type1,
  resources: module425.ResourceMap.RubysLite,
});
module50.default(u, P.s5e, {
  models: ['roborock.vacuum.s5e', 'roborock.vacuum.s5ev2', 'roborock.vacuum.s5ev3', 'roborock.vacuum.s5ev4', 'roborock.vacuum.s5ev5'],
  product: T.RubysLite,
  volume: y.Type1,
  resources: module425.ResourceMap.RubysLite,
});
module50.default(u, P.p5, {
  models: ['roborock.vacuum.p5', 'roborock.vacuum.p5v2', 'roborock.vacuum.p5v3', 'roborock.vacuum.p5v4', 'roborock.vacuum.p5v5'],
  product: T.RubySC,
  volume: y.Default,
  resources: module425.ResourceMap.RubySC,
});
module50.default(u, P.a08, {
  models: ['roborock.vacuum.a08', 'roborock.vacuum.a08v2', 'roborock.vacuum.a08v3'],
  product: T.RubySC,
  volume: y.Default,
  resources: module425.ResourceMap.RubySC,
});
module50.default(u, P.a11, {
  models: ['roborock.vacuum.a11', 'roborock.vacuum.a11v2', 'roborock.vacuum.a11v3', 'roborock.vacuum.a11v4', 'roborock.vacuum.a11v5'],
  product: T.TanosE,
  volume: y.Type2,
  resources: module425.ResourceMap.TanosE,
});
module50.default(u, P.t7, {
  models: ['roborock.vacuum.t7', 'roborock.vacuum.t7v2', 'roborock.vacuum.t7v3'],
  product: T.TanosE,
  volume: y.Type2,
  resources: module425.ResourceMap.TanosE,
});
module50.default(u, P.a01, {
  models: ['roborock.vacuum.a01', 'roborock.vacuum.a01v2', 'roborock.vacuum.a01v3'],
  product: T.SapphireLite,
  volume: y.Default,
  resources: module425.ResourceMap.SapphireLite,
});
module50.default(u, P.t7p, {
  models: ['roborock.vacuum.t7p', 'roborock.vacuum.t7pv2', 'roborock.vacuum.t7pv3'],
  product: T.TanosV_CN,
  volume: y.Type3,
  resources: module425.ResourceMap.TanosV_CN,
});
module50.default(u, P.a09, {
  models: ['roborock.vacuum.a09', 'roborock.vacuum.a09v2', 'roborock.vacuum.a09v3', 'roborock.vacuum.a09v4', 'roborock.vacuum.a09v5'],
  product: T.TanosV_CN,
  volume: y.Type3,
  resources: module425.ResourceMap.TanosV_CN,
});
module50.default(u, P.a10, {
  models: ['roborock.vacuum.a10', 'roborock.vacuum.a10v2', 'roborock.vacuum.a10v3', 'roborock.vacuum.a10v4', 'roborock.vacuum.a10v5'],
  product: T.TanosV_CE,
  volume: y.Type3,
  resources: module425.ResourceMap.TanosV_CE,
});
module50.default(u, P.a19, {
  models: ['roborock.vacuum.a19', 'roborock.vacuum.a19v2', 'roborock.vacuum.a19v3', 'roborock.vacuum.a19v4', 'roborock.vacuum.a19v5'],
  product: T.RubysE,
  volume: y.Default,
  resources: module425.ResourceMap.RubysE,
});
module50.default(u, P.a14, {
  models: ['roborock.vacuum.a14', 'roborock.vacuum.a14v2', 'roborock.vacuum.a14v3', 'roborock.vacuum.a14v4', 'roborock.vacuum.a14v5'],
  product: T.TanosS,
  volume: y.Type1,
  resources: module425.ResourceMap.TanosS,
});
module50.default(u, P.a15, {
  models: ['roborock.vacuum.a15', 'roborock.vacuum.a15v2', 'roborock.vacuum.a15v3', 'roborock.vacuum.a15v4', 'roborock.vacuum.a15v5'],
  product: T.TanosS,
  volume: y.Type1,
  resources: module425.ResourceMap.TanosS,
});
module50.default(u, P.a16, {
  models: ['roborock.vacuum.a16', 'roborock.vacuum.a16v2', 'roborock.vacuum.a16v3', 'roborock.vacuum.a16v4', 'roborock.vacuum.a16v5'],
  volume: y.Default,
  product: T.Garnet,
  resources: module425.ResourceMap.Garnet,
});
module50.default(u, P.a17, {
  models: ['roborock.vacuum.a17', 'roborock.vacuum.a17v2', 'roborock.vacuum.a17v3', 'roborock.vacuum.a17v4', 'roborock.vacuum.a17v5'],
  volume: y.Default,
  product: T.Garnet,
  resources: module425.ResourceMap.Garnet,
});
module50.default(u, P.a23, {
  models: ['roborock.vacuum.a23', 'roborock.vacuum.a23v2', 'roborock.vacuum.a23v3', 'roborock.vacuum.a23v4', 'roborock.vacuum.a23v5', 'roborock.vacuum.a23v6'],
  volume: y.Default,
  product: T.TanosSPlus,
  resources: module425.ResourceMap.TanosSPlus,
});
module50.default(u, P.a24, {
  models: ['roborock.vacuum.a24', 'roborock.vacuum.a24v2', 'roborock.vacuum.a24v3', 'roborock.vacuum.a24v4', 'roborock.vacuum.a24v5'],
  volume: y.Default,
  product: T.TanosSPlus,
  resources: module425.ResourceMap.TanosSPlus,
});
module50.default(u, P.a26, {
  models: ['roborock.vacuum.a26', 'roborock.vacuum.a26v2', 'roborock.vacuum.a26v3', 'roborock.vacuum.a26v4', 'roborock.vacuum.a26v5'],
  volume: y.Type4,
  product: T.TopazSV_CN,
  resources: module425.ResourceMap.TopazSV,
});
module50.default(u, P.a27, {
  models: ['roborock.vacuum.a27', 'roborock.vacuum.a27v2', 'roborock.vacuum.a27v3', 'roborock.vacuum.a27v4', 'roborock.vacuum.a27v5'],
  volume: y.Type4,
  product: T.TopazSV_CE,
  resources: module425.ResourceMap.TopazSV,
});
module50.default(u, P.Coral, {
  models: [
    'roborock.vacuum.a20',
    'roborock.vacuum.a20v2',
    'roborock.vacuum.a20v3',
    'roborock.vacuum.a20v4',
    'roborock.vacuum.a20v5',
    'roborock.vacuum.a21',
    'roborock.vacuum.a21v2',
    'roborock.vacuum.a21v3',
    'roborock.vacuum.a21v4',
    'roborock.vacuum.a21v5',
  ],
  volume: y.Default,
  product: T.Coral,
  resources: module425.ResourceMap.Coral,
});
module50.default(u, P.a37, {
  models: ['roborock.vacuum.a37', 'roborock.vacuum.a37v2', 'roborock.vacuum.a37v3', 'roborock.vacuum.a37v4', 'roborock.vacuum.a37v5'],
  volume: y.Default,
  product: T.TanosSL,
  resources: module425.ResourceMap.TanosSL,
});
module50.default(u, P.a38, {
  models: ['roborock.vacuum.a38', 'roborock.vacuum.a38v2', 'roborock.vacuum.a38v3', 'roborock.vacuum.a38v4', 'roborock.vacuum.a38v5'],
  volume: y.Default,
  product: T.TanosSL,
  resources: module425.ResourceMap.TanosSL,
});
module50.default(u, P.a39, {
  models: ['roborock.vacuum.a39', 'roborock.vacuum.a39v2', 'roborock.vacuum.a39v3', 'roborock.vacuum.a39v4', 'roborock.vacuum.a39v5'],
  volume: y.Default,
  product: T.TanosSC,
  resources: module425.ResourceMap.TanosSC,
});
module50.default(u, P.a40, {
  models: ['roborock.vacuum.a40', 'roborock.vacuum.a40v2', 'roborock.vacuum.a40v3', 'roborock.vacuum.a40v4', 'roborock.vacuum.a40v5'],
  volume: y.Default,
  product: T.TanosSC,
  resources: module425.ResourceMap.TanosSC,
});
module50.default(u, P.a33, {
  models: ['roborock.vacuum.a33', 'roborock.vacuum.a33v2', 'roborock.vacuum.a33v3', 'roborock.vacuum.a33v4', 'roborock.vacuum.a33v5'],
  volume: y.Default,
  product: T.TanosSE,
  resources: module425.ResourceMap.TanosSE,
});
module50.default(u, P.a34, {
  models: ['roborock.vacuum.a34', 'roborock.vacuum.a34v2', 'roborock.vacuum.a34v3', 'roborock.vacuum.a34v4', 'roborock.vacuum.a34v5'],
  volume: y.Default,
  product: T.TanosSE,
  resources: module425.ResourceMap.TanosSE,
});
module50.default(u, P.TopazS, {
  models: [
    'roborock.vacuum.a29',
    'roborock.vacuum.a29v2',
    'roborock.vacuum.a29v3',
    'roborock.vacuum.a29v4',
    'roborock.vacuum.a29v5',
    'roborock.vacuum.a76',
    'roborock.vacuum.a76v2',
    'roborock.vacuum.a76v3',
    'roborock.vacuum.a76v4',
    'roborock.vacuum.a76v5',
  ],
  volume: y.Default,
  product: T.TopazS,
  resources: module425.ResourceMap.TopazS,
});
module50.default(u, P.a30, {
  models: ['roborock.vacuum.a30', 'roborock.vacuum.a30v2', 'roborock.vacuum.a30v3', 'roborock.vacuum.a30v4', 'roborock.vacuum.a30v5'],
  volume: y.Default,
  product: T.TopazS_CE,
  resources: module425.ResourceMap.TopazS_CE,
});
module50.default(u, P.a62, {
  models: ['roborock.vacuum.a62', 'roborock.vacuum.a62v2', 'roborock.vacuum.a62v3', 'roborock.vacuum.a62v4', 'roborock.vacuum.a62v5'],
  volume: y.Default,
  product: T.TopazSPower,
  resources: module425.ResourceMap.TopazSPower,
});
module50.default(u, P.a44, {
  models: ['roborock.vacuum.a44', 'roborock.vacuum.a44v2', 'roborock.vacuum.a44v3', 'roborock.vacuum.a44v4', 'roborock.vacuum.a44v5'],
  volume: y.Default,
  product: T.TanosSV,
  resources: module425.ResourceMap.TopazSV,
});
module50.default(u, P.a45, {
  models: ['roborock.vacuum.a45', 'roborock.vacuum.a45v2', 'roborock.vacuum.a45v3', 'roborock.vacuum.a45v4', 'roborock.vacuum.a45v5'],
  volume: y.Default,
  product: T.TanosSV,
  resources: module425.ResourceMap.TopazSV,
});
module50.default(u, P.a46, {
  models: ['roborock.vacuum.a46', 'roborock.vacuum.a46v2', 'roborock.vacuum.a46v3', 'roborock.vacuum.a46v4', 'roborock.vacuum.a46v5'],
  volume: y.Default,
  product: T.TopazSPlus,
  resources: module425.ResourceMap.TopazSPlus,
});
module50.default(u, P.a52, {
  models: ['roborock.vacuum.a52', 'roborock.vacuum.a52v2', 'roborock.vacuum.a52v3', 'roborock.vacuum.a52v4', 'roborock.vacuum.a52v5'],
  volume: y.Default,
  product: T.TanosSMax,
  resources: module425.ResourceMap.TanosSMax,
});
module50.default(u, P.a49, {
  models: ['roborock.vacuum.a49', 'roborock.vacuum.a49v2', 'roborock.vacuum.a49v3', 'roborock.vacuum.a49v4', 'roborock.vacuum.a49v5'],
  volume: y.Default,
  product: T.SapphirePlus,
  resources: module425.ResourceMap.SapphireC,
});
module50.default(u, P.Ultron, {
  models: [
    'roborock.vacuum.a50',
    'roborock.vacuum.a50v2',
    'roborock.vacuum.a50v3',
    'roborock.vacuum.a50v4',
    'roborock.vacuum.a50v5',
    'roborock.vacuum.a51',
    'roborock.vacuum.a51v2',
    'roborock.vacuum.a51v3',
    'roborock.vacuum.a51v4',
    'roborock.vacuum.a51v5',
  ],
  volume: y.Default,
  product: T.Ultron,
  resources: module425.ResourceMap.Ultron,
});
module50.default(u, P.UltronSPlus, {
  models: [
    'roborock.vacuum.a68',
    'roborock.vacuum.a68v2',
    'roborock.vacuum.a68v3',
    'roborock.vacuum.a68v4',
    'roborock.vacuum.a68v5',
    'roborock.vacuum.a69',
    'roborock.vacuum.a69v2',
    'roborock.vacuum.a69v3',
    'roborock.vacuum.a69v4',
    'roborock.vacuum.a69v5',
    'roborock.vacuum.a70',
    'roborock.vacuum.a70v2',
    'roborock.vacuum.a70v3',
    'roborock.vacuum.a70v4',
    'roborock.vacuum.a70v5',
  ],
  volume: y.Default,
  product: T.UltronSPlus,
  resources: module425.ResourceMap.UltronSPlus,
});
module50.default(u, P.UltronE, {
  models: [
    'roborock.vacuum.a72',
    'roborock.vacuum.a72v2',
    'roborock.vacuum.a72v3',
    'roborock.vacuum.a72v4',
    'roborock.vacuum.a72v5',
    'roborock.vacuum.a84',
    'roborock.vacuum.a84v2',
    'roborock.vacuum.a84v3',
    'roborock.vacuum.a84v4',
    'roborock.vacuum.a84v5',
  ],
  volume: y.Default,
  product: T.UltronE,
  resources: module425.ResourceMap.UltronE,
});
module50.default(u, P.UltronLite, {
  models: [
    'roborock.vacuum.a73',
    'roborock.vacuum.a73v2',
    'roborock.vacuum.a73v3',
    'roborock.vacuum.a73v4',
    'roborock.vacuum.a73v5',
    'roborock.vacuum.a85',
    'roborock.vacuum.a85v2',
    'roborock.vacuum.a85v3',
    'roborock.vacuum.a85v4',
    'roborock.vacuum.a85v5',
  ],
  volume: y.Default,
  product: T.UltronLite,
  resources: module425.ResourceMap.UltronLite,
});
module50.default(u, P.Pearl, {
  models: [
    'roborock.vacuum.a74',
    'roborock.vacuum.a74v2',
    'roborock.vacuum.a74v3',
    'roborock.vacuum.a74v4',
    'roborock.vacuum.a74v5',
    'roborock.vacuum.a75',
    'roborock.vacuum.a75v2',
    'roborock.vacuum.a75v3',
    'roborock.vacuum.a75v4',
    'roborock.vacuum.a75v5',
  ],
  volume: y.Default,
  product: T.Pearl,
  resources: module425.ResourceMap.Pearl,
});
module50.default(u, P.PearlPlus, {
  models: [
    'roborock.vacuum.a86',
    'roborock.vacuum.a86v2',
    'roborock.vacuum.a86v3',
    'roborock.vacuum.a86v4',
    'roborock.vacuum.a86v5',
    'roborock.vacuum.a87',
    'roborock.vacuum.a87v2',
    'roborock.vacuum.a87v3',
    'roborock.vacuum.a87v4',
    'roborock.vacuum.a87v5',
  ],
  volume: y.Default,
  product: T.PearlPlus,
  resources: module425.ResourceMap.Pearl,
});
module50.default(u, P.a47, {
  models: ['roborock.vacuum.a47', 'roborock.vacuum.a47v2', 'roborock.vacuum.a47v3', 'roborock.vacuum.a47v4', 'roborock.vacuum.a47v5'],
  volume: y.Default,
  product: T.TopazSPlus,
  resources: module425.ResourceMap.TopazSPlus,
});
module50.default(u, P.a66, {
  models: ['roborock.vacuum.a66', 'roborock.vacuum.a66v2', 'roborock.vacuum.a66v3', 'roborock.vacuum.a66v4', 'roborock.vacuum.a66v5'],
  volume: y.Default,
  product: T.TopazSPlus,
  resources: module425.ResourceMap.TopazSPlus,
});
module50.default(u, P.a64, {
  models: ['roborock.vacuum.a64', 'roborock.vacuum.a64v2', 'roborock.vacuum.a64v3', 'roborock.vacuum.a64v4', 'roborock.vacuum.a64v5'],
  volume: y.Default,
  product: T.TopazSC_CN,
  resources: module425.ResourceMap.TopazSC,
});
module50.default(u, P.a65, {
  models: ['roborock.vacuum.a65', 'roborock.vacuum.a65v2', 'roborock.vacuum.a65v3', 'roborock.vacuum.a65v4', 'roborock.vacuum.a65v5'],
  volume: y.Default,
  product: T.TopazSC_CE,
  resources: module425.ResourceMap.TopazSC,
});
var y = {
    Default: {
      max: 90,
      min: 30,
    },
    Type1: {
      max: 100,
      min: 30,
    },
    Type2: {
      max: 90,
      min: 50,
    },
    Type3: {
      max: 90,
      min: 20,
    },
    Type4: {
      max: 90,
      min: 5,
    },
  },
  R = u;

function h(o) {
  for (var u in R)
    if (R.hasOwnProperty(u)) {
      var c = R[u];

      if (c.models) {
        if (c.models.hasElement(o)) return u;
      } else console.error('DeviceInfoMap.' + u + '.models is not found.');
    }

  return '';
}

function C(o) {
  for (var u in R)
    if (R.hasOwnProperty(u)) {
      var c = R[u];

      if (c.models) {
        if (c.models.hasElement(o)) return c.product;
      } else console.error('DeviceInfoMap.' + u + '.models is not found.');
    }

  return '';
}

function M(o) {
  for (var u in R)
    if (R.hasOwnProperty(u)) {
      var c = R[u];

      if (c.models) {
        if (c.models.hasElement(o)) return c.volume;
      } else console.error('DeviceInfoMap.' + u + '.models is not found.');
    }

  return R[P.t6].volume;
}

function E(o) {
  for (var u in R)
    if (R.hasOwnProperty(u)) {
      var c = R[u];

      if (c.models) {
        if (c.models.hasElement(o)) return c.resources;
      } else console.error('DeviceInfoMap.' + u + '.models is not found.');
    }

  return R[P.t6].resources;
}

exports.DeviceInfoMap = R;
var V = module498.sharedManager();
exports.DMM = V;
