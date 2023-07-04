var u,
  module50 = require('./50'),
  module4 = require('./4'),
  module96 = require('./96'),
  module424 = require('./424'),
  module393 = require('./393'),
  b = module393.deviceModel || module393.Device.model,
  module466 = require('./466').allLangs;

Array.prototype.hasElement = function (o) {
  return -1 != this.indexOf(o);
};

String.prototype.templateStringWithParams = function (o) {
  var u = Object.keys(o),
    c = Object.values(o);
  return module96.default(Function, module31.default(u).concat(['return `' + this + '`;'])).apply(undefined, module31.default(c));
};

var f = null,
  module493 = (function () {
    function o() {
      module4.default(this, o);
      if (!f) f = this;
      return f;
    }

    module5.default(
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
          key: 'robotInMap',
          get: function () {
            return {
              image: this.currentProduct == S.RubyPlus ? require('./491') : this.currentProduct == S.Garnet ? require('./492') : require('./493'),
              chargerAngle: this.currentProduct == S.RubyPlus || this.currentProduct == S.Garnet ? 0 : 180,
            };
          },
        },
        {
          key: 'agreeProtocolLevel',
          get: function () {
            return this.currentProduct == S.Rubys ? 3 : 9;
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
            return 1 == this.productVersion ? E(b).supportedLanguages : module466;
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
            return this.currentProduct == S.TanosV_CN || this.currentProduct == S.TanosV_CE;
          },
        },
        {
          key: 'isTanos',
          get: function () {
            return this.currentProduct == S.Tanos_CN || this.currentProduct == S.Tanos_CE;
          },
        },
        {
          key: 'isRuby',
          get: function () {
            return this.currentProduct == S.Ruby;
          },
        },
        {
          key: 'isRubys',
          get: function () {
            return this.currentProduct == S.Rubys;
          },
        },
        {
          key: 'isRuby2',
          get: function () {
            return this.currentProduct == S.Ruby2;
          },
        },
        {
          key: 'isSapphire',
          get: function () {
            return this.currentProduct == S.Sapphire;
          },
        },
        {
          key: 'isSapphireC',
          get: function () {
            return this.currentProduct == S.SapphireC;
          },
        },
        {
          key: 'isSapphirePlus',
          get: function () {
            return this.currentProduct == S.SapphirePlus;
          },
        },
        {
          key: 'isTanosCN',
          get: function () {
            return this.currentProduct == S.Tanos_CN;
          },
        },
        {
          key: 'isTanosCE',
          get: function () {
            return this.currentProduct == S.Tanos_CE;
          },
        },
        {
          key: 'isRubyPlus',
          get: function () {
            return this.currentProduct == S.RubyPlus;
          },
        },
        {
          key: 'isRubysLite',
          get: function () {
            return this.currentProduct == S.RubysLite;
          },
        },
        {
          key: 'isRubySC',
          get: function () {
            return this.currentProduct == S.RubySC;
          },
        },
        {
          key: 'isTanosE',
          get: function () {
            return this.currentProduct == S.TanosE;
          },
        },
        {
          key: 'isSapphireLite',
          get: function () {
            return this.currentProduct == S.SapphireLite;
          },
        },
        {
          key: 'isTanosV_CN',
          get: function () {
            return this.currentProduct == S.TanosV_CN;
          },
        },
        {
          key: 'isTanosV_CE',
          get: function () {
            return this.currentProduct == S.TanosV_CE;
          },
        },
        {
          key: 'isRubysE',
          get: function () {
            return this.currentProduct == S.RubysE;
          },
        },
        {
          key: 'isTanosS',
          get: function () {
            return this.currentProduct == S.TanosS;
          },
        },
        {
          key: 'isGarnet',
          get: function () {
            return this.currentProduct == S.Garnet;
          },
        },
        {
          key: 'isTanosSPlus',
          get: function () {
            return this.currentProduct == S.TanosSPlus;
          },
        },
        {
          key: 'isTopazSV',
          get: function () {
            return this.currentProduct == S.TopazSV_CN || this.currentProduct == S.TopazSV_CE;
          },
        },
        {
          key: 'isTopazSV_CN',
          get: function () {
            return this.currentProduct == S.TopazSV_CN;
          },
        },
        {
          key: 'isTopazSV_CE',
          get: function () {
            return this.currentProduct == S.TopazSV_CE;
          },
        },
        {
          key: 'isCoral',
          get: function () {
            return this.currentProduct == S.Coral;
          },
        },
        {
          key: 'isTopazS',
          get: function () {
            return this.currentProduct == S.TopazS || this.currentProduct == S.TopazS_CE || this.currentProduct == S.TopazSPower;
          },
        },
        {
          key: 'isTopazSPlus',
          get: function () {
            return this.currentProduct == S.TopazSPlus;
          },
        },
        {
          key: 'isTopazSPower',
          get: function () {
            return this.currentProduct == S.TopazSPower;
          },
        },
        {
          key: 'isTanosSC',
          get: function () {
            return this.currentProduct == S.TanosSC;
          },
        },
        {
          key: 'isTanosSL',
          get: function () {
            return this.currentProduct == S.TanosSL;
          },
        },
        {
          key: 'isTanosSE',
          get: function () {
            return this.currentProduct == S.TanosSE;
          },
        },
        {
          key: 'isTanosSV',
          get: function () {
            return this.currentProduct == S.TanosSV;
          },
        },
        {
          key: 'isTanosSMax',
          get: function () {
            return this.currentProduct == S.TanosSMax;
          },
        },
        {
          key: 'isTopazSC',
          get: function () {
            return this.currentProduct == S.TopazSC_CN || this.currentProduct == S.TopazSC_CE;
          },
        },
        {
          key: 'isUltron',
          get: function () {
            return this.currentProduct == S.Ultron;
          },
        },
        {
          key: 'isUltronSPlus',
          get: function () {
            return this.currentProduct == S.UltronPlus;
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
            return this.currentProduct == S.UltronLite;
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
            return this.currentProduct == S.Pearl;
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

exports.default = module493;
var S = {
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
  UltronPlus: 'UltronPlus',
  UltronE: 'UltronE',
  UltronLite: 'UltronLite',
  Pearl: 'Pearl',
};
exports.Products = S;
var y = {
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
  UltronPlus: 'UltronPlus',
  UltronE: 'UltronE',
  UltronLite: 'UltronLite',
  Pearl: 'Pearl',
  a51: 'a51',
  a52: 'a52',
  a49: 'a49',
  a62: 'a62',
  a64: 'a64',
  a65: 'a65',
  a66: 'a66',
};
exports.DeviceSeries = y;
u = {};
module50.default(u, y.v1, {
  models: ['rockrobo.vacuum.v1', 'rockrobo.sweeper.v2', 'rockrobo.sweeper.v1'],
  product: S.Ruby,
  volume: P.Default,
  resources: module424.ResourceMap.Ruby,
});
module50.default(u, y.m1s, {
  models: ['roborock.vacuum.m1s', 'roborock.vacuum.m1sv2', 'roborock.vacuum.m1sv3'],
  bucket: S.Ruby2,
  volume: P.Default,
  resources: module424.ResourceMap.Ruby2,
});
module50.default(u, y.s5, {
  models: ['roborock.vacuum.s5', 'roborock.sweeper.s5v2', 'roborock.sweeper.s5v3'],
  product: S.Rubys,
  volume: P.Default,
  resources: module424.ResourceMap.Rubys,
});
module50.default(u, y.e2, {
  models: ['roborock.vacuum.e2', 'roborock.sweeper.e2v2', 'roborock.sweeper.e2v3'],
  product: S.Sapphire,
  volume: P.Default,
  resources: module424.ResourceMap.Sapphire,
});
module50.default(u, y.c1, {
  models: ['roborock.vacuum.c1', 'roborock.sweeper.c1v2', 'roborock.sweeper.c1v3'],
  product: S.SapphireC,
  volume: P.Default,
  resources: module424.ResourceMap.SapphireC,
});
module50.default(u, y.t6, {
  models: ['roborock.vacuum.t6', 'roborock.vacuum.t6v2', 'roborock.vacuum.t6v3'],
  product: S.Tanos_CN,
  volume: P.Default,
  resources: module424.ResourceMap.Tanos_CN,
});
module50.default(u, y.s6, {
  models: ['roborock.vacuum.s6', 'roborock.vacuum.s6v2', 'roborock.vacuum.s6v3'],
  product: S.Tanos_CE,
  volume: P.Default,
  resources: module424.ResourceMap.Tanos_CE,
});
module50.default(u, y.t4, {
  models: ['roborock.vacuum.t4', 'roborock.vacuum.t4v2', 'roborock.vacuum.t4v3'],
  product: S.RubyPlus,
  volume: P.Default,
  resources: module424.ResourceMap.RubyPlus,
});
module50.default(u, y.s4, {
  models: ['roborock.vacuum.s4', 'roborock.vacuum.s4v2', 'roborock.vacuum.s4v3'],
  product: S.RubyPlus,
  volume: P.Default,
  resources: module424.ResourceMap.RubyPlus,
});
module50.default(u, y.a05, {
  models: ['roborock.vacuum.a05', 'roborock.vacuum.a05v2', 'roborock.vacuum.a05v3'],
  product: S.RubysLite,
  volume: P.Type1,
  resources: module424.ResourceMap.RubysLite,
});
module50.default(u, y.p6, {
  models: ['roborock.vacuum.p6', 'roborock.vacuum.p6v2', 'roborock.vacuum.p6v3', 'roborock.vacuum.p6v4', 'roborock.vacuum.p6v5'],
  product: S.RubysLite,
  volume: P.Type1,
  resources: module424.ResourceMap.RubysLite,
});
module50.default(u, y.s5e, {
  models: ['roborock.vacuum.s5e', 'roborock.vacuum.s5ev2', 'roborock.vacuum.s5ev3', 'roborock.vacuum.s5ev4', 'roborock.vacuum.s5ev5'],
  product: S.RubysLite,
  volume: P.Type1,
  resources: module424.ResourceMap.RubysLite,
});
module50.default(u, y.p5, {
  models: ['roborock.vacuum.p5', 'roborock.vacuum.p5v2', 'roborock.vacuum.p5v3', 'roborock.vacuum.p5v4', 'roborock.vacuum.p5v5'],
  product: S.RubySC,
  volume: P.Default,
  resources: module424.ResourceMap.RubySC,
});
module50.default(u, y.a08, {
  models: ['roborock.vacuum.a08', 'roborock.vacuum.a08v2', 'roborock.vacuum.a08v3'],
  product: S.RubySC,
  volume: P.Default,
  resources: module424.ResourceMap.RubySC,
});
module50.default(u, y.a11, {
  models: ['roborock.vacuum.a11', 'roborock.vacuum.a11v2', 'roborock.vacuum.a11v3', 'roborock.vacuum.a11v4', 'roborock.vacuum.a11v5'],
  product: S.TanosE,
  volume: P.Type2,
  resources: module424.ResourceMap.TanosE,
});
module50.default(u, y.t7, {
  models: ['roborock.vacuum.t7', 'roborock.vacuum.t7v2', 'roborock.vacuum.t7v3'],
  product: S.TanosE,
  volume: P.Type2,
  resources: module424.ResourceMap.TanosE,
});
module50.default(u, y.a01, {
  models: ['roborock.vacuum.a01', 'roborock.vacuum.a01v2', 'roborock.vacuum.a01v3'],
  product: S.SapphireLite,
  volume: P.Default,
  resources: module424.ResourceMap.SapphireLite,
});
module50.default(u, y.t7p, {
  models: ['roborock.vacuum.t7p', 'roborock.vacuum.t7pv2', 'roborock.vacuum.t7pv3'],
  product: S.TanosV_CN,
  volume: P.Type3,
  resources: module424.ResourceMap.TanosV_CN,
});
module50.default(u, y.a09, {
  models: ['roborock.vacuum.a09', 'roborock.vacuum.a09v2', 'roborock.vacuum.a09v3', 'roborock.vacuum.a09v4', 'roborock.vacuum.a09v5'],
  product: S.TanosV_CN,
  volume: P.Type3,
  resources: module424.ResourceMap.TanosV_CN,
});
module50.default(u, y.a10, {
  models: ['roborock.vacuum.a10', 'roborock.vacuum.a10v2', 'roborock.vacuum.a10v3', 'roborock.vacuum.a10v4', 'roborock.vacuum.a10v5'],
  product: S.TanosV_CE,
  volume: P.Type3,
  resources: module424.ResourceMap.TanosV_CE,
});
module50.default(u, y.a19, {
  models: ['roborock.vacuum.a19', 'roborock.vacuum.a19v2', 'roborock.vacuum.a19v3', 'roborock.vacuum.a19v4', 'roborock.vacuum.a19v5'],
  product: S.RubysE,
  volume: P.Default,
  resources: module424.ResourceMap.RubysE,
});
module50.default(u, y.a14, {
  models: ['roborock.vacuum.a14', 'roborock.vacuum.a14v2', 'roborock.vacuum.a14v3', 'roborock.vacuum.a14v4', 'roborock.vacuum.a14v5'],
  product: S.TanosS,
  volume: P.Type1,
  resources: module424.ResourceMap.TanosS,
});
module50.default(u, y.a15, {
  models: ['roborock.vacuum.a15', 'roborock.vacuum.a15v2', 'roborock.vacuum.a15v3', 'roborock.vacuum.a15v4', 'roborock.vacuum.a15v5'],
  product: S.TanosS,
  volume: P.Type1,
  resources: module424.ResourceMap.TanosS,
});
module50.default(u, y.a16, {
  models: ['roborock.vacuum.a16', 'roborock.vacuum.a16v2', 'roborock.vacuum.a16v3', 'roborock.vacuum.a16v4', 'roborock.vacuum.a16v5'],
  volume: P.Default,
  product: S.Garnet,
  resources: module424.ResourceMap.Garnet,
});
module50.default(u, y.a17, {
  models: ['roborock.vacuum.a17', 'roborock.vacuum.a17v2', 'roborock.vacuum.a17v3', 'roborock.vacuum.a17v4', 'roborock.vacuum.a17v5'],
  volume: P.Default,
  product: S.Garnet,
  resources: module424.ResourceMap.Garnet,
});
module50.default(u, y.a23, {
  models: ['roborock.vacuum.a23', 'roborock.vacuum.a23v2', 'roborock.vacuum.a23v3', 'roborock.vacuum.a23v4', 'roborock.vacuum.a23v5', 'roborock.vacuum.a23v6'],
  volume: P.Default,
  product: S.TanosSPlus,
  resources: module424.ResourceMap.TanosSPlus,
});
module50.default(u, y.a24, {
  models: ['roborock.vacuum.a24', 'roborock.vacuum.a24v2', 'roborock.vacuum.a24v3', 'roborock.vacuum.a24v4', 'roborock.vacuum.a24v5'],
  volume: P.Default,
  product: S.TanosSPlus,
  resources: module424.ResourceMap.TanosSPlus,
});
module50.default(u, y.a26, {
  models: ['roborock.vacuum.a26', 'roborock.vacuum.a26v2', 'roborock.vacuum.a26v3', 'roborock.vacuum.a26v4', 'roborock.vacuum.a26v5'],
  volume: P.Type4,
  product: S.TopazSV_CN,
  resources: module424.ResourceMap.TopazSV,
});
module50.default(u, y.a27, {
  models: ['roborock.vacuum.a27', 'roborock.vacuum.a27v2', 'roborock.vacuum.a27v3', 'roborock.vacuum.a27v4', 'roborock.vacuum.a27v5'],
  volume: P.Type4,
  product: S.TopazSV_CE,
  resources: module424.ResourceMap.TopazSV,
});
module50.default(u, y.Coral, {
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
  volume: P.Default,
  product: S.Coral,
  resources: module424.ResourceMap.Coral,
});
module50.default(u, y.a37, {
  models: ['roborock.vacuum.a37', 'roborock.vacuum.a37v2', 'roborock.vacuum.a37v3', 'roborock.vacuum.a37v4', 'roborock.vacuum.a37v5'],
  volume: P.Default,
  product: S.TanosSL,
  resources: module424.ResourceMap.TanosSL,
});
module50.default(u, y.a38, {
  models: ['roborock.vacuum.a38', 'roborock.vacuum.a38v2', 'roborock.vacuum.a38v3', 'roborock.vacuum.a38v4', 'roborock.vacuum.a38v5'],
  volume: P.Default,
  product: S.TanosSL,
  resources: module424.ResourceMap.TanosSL,
});
module50.default(u, y.a39, {
  models: ['roborock.vacuum.a39', 'roborock.vacuum.a39v2', 'roborock.vacuum.a39v3', 'roborock.vacuum.a39v4', 'roborock.vacuum.a39v5'],
  volume: P.Default,
  product: S.TanosSC,
  resources: module424.ResourceMap.TanosSC,
});
module50.default(u, y.a40, {
  models: ['roborock.vacuum.a40', 'roborock.vacuum.a40v2', 'roborock.vacuum.a40v3', 'roborock.vacuum.a40v4', 'roborock.vacuum.a40v5'],
  volume: P.Default,
  product: S.TanosSC,
  resources: module424.ResourceMap.TanosSC,
});
module50.default(u, y.a33, {
  models: ['roborock.vacuum.a33', 'roborock.vacuum.a33v2', 'roborock.vacuum.a33v3', 'roborock.vacuum.a33v4', 'roborock.vacuum.a33v5'],
  volume: P.Default,
  product: S.TanosSE,
  resources: module424.ResourceMap.TanosSE,
});
module50.default(u, y.a34, {
  models: ['roborock.vacuum.a34', 'roborock.vacuum.a34v2', 'roborock.vacuum.a34v3', 'roborock.vacuum.a34v4', 'roborock.vacuum.a34v5'],
  volume: P.Default,
  product: S.TanosSE,
  resources: module424.ResourceMap.TanosSE,
});
module50.default(u, y.TopazS, {
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
  volume: P.Default,
  product: S.TopazS,
  resources: module424.ResourceMap.TopazS,
});
module50.default(u, y.a30, {
  models: ['roborock.vacuum.a30', 'roborock.vacuum.a30v2', 'roborock.vacuum.a30v3', 'roborock.vacuum.a30v4', 'roborock.vacuum.a30v5'],
  volume: P.Default,
  product: S.TopazS_CE,
  resources: module424.ResourceMap.TopazS_CE,
});
module50.default(u, y.a62, {
  models: ['roborock.vacuum.a62', 'roborock.vacuum.a62v2', 'roborock.vacuum.a62v3', 'roborock.vacuum.a62v4', 'roborock.vacuum.a62v5'],
  volume: P.Default,
  product: S.TopazSPower,
  resources: module424.ResourceMap.TopazSPower,
});
module50.default(u, y.a44, {
  models: ['roborock.vacuum.a44', 'roborock.vacuum.a44v2', 'roborock.vacuum.a44v3', 'roborock.vacuum.a44v4', 'roborock.vacuum.a44v5'],
  volume: P.Default,
  product: S.TanosSV,
  resources: module424.ResourceMap.TopazSV,
});
module50.default(u, y.a45, {
  models: ['roborock.vacuum.a45', 'roborock.vacuum.a45v2', 'roborock.vacuum.a45v3', 'roborock.vacuum.a45v4', 'roborock.vacuum.a45v5'],
  volume: P.Default,
  product: S.TanosSV,
  resources: module424.ResourceMap.TopazSV,
});
module50.default(u, y.a46, {
  models: ['roborock.vacuum.a46', 'roborock.vacuum.a46v2', 'roborock.vacuum.a46v3', 'roborock.vacuum.a46v4', 'roborock.vacuum.a46v5'],
  volume: P.Default,
  product: S.TopazSPlus,
  resources: module424.ResourceMap.TopazSPlus,
});
module50.default(u, y.a52, {
  models: ['roborock.vacuum.a52', 'roborock.vacuum.a52v2', 'roborock.vacuum.a52v3', 'roborock.vacuum.a52v4', 'roborock.vacuum.a52v5'],
  volume: P.Default,
  product: S.TanosSMax,
  resources: module424.ResourceMap.TanosSMax,
});
module50.default(u, y.a49, {
  models: ['roborock.vacuum.a49', 'roborock.vacuum.a49v2', 'roborock.vacuum.a49v3', 'roborock.vacuum.a49v4', 'roborock.vacuum.a49v5'],
  volume: P.Default,
  product: S.SapphirePlus,
  resources: module424.ResourceMap.SapphireC,
});
module50.default(u, y.Ultron, {
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
  volume: P.Default,
  product: S.Ultron,
  resources: module424.ResourceMap.TopazSPlus,
});
module50.default(u, y.UltronPlus, {
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
  volume: P.Default,
  product: S.UltronPlus,
  resources: module424.ResourceMap.TopazSPlus,
});
module50.default(u, y.UltronE, {
  models: ['roborock.vacuum.a72', 'roborock.vacuum.a72v2', 'roborock.vacuum.a72v3', 'roborock.vacuum.a72v4', 'roborock.vacuum.a72v5'],
  volume: P.Default,
  product: S.UltronE,
  resources: module424.ResourceMap.TanosSE,
});
module50.default(u, y.UltronLite, {
  models: ['roborock.vacuum.a73', 'roborock.vacuum.a73v2', 'roborock.vacuum.a73v3', 'roborock.vacuum.a73v4', 'roborock.vacuum.a73v5'],
  volume: P.Default,
  product: S.UltronLite,
  resources: module424.ResourceMap.TanosSL,
});
module50.default(u, y.Pearl, {
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
  volume: P.Default,
  product: S.Pearl,
  resources: module424.ResourceMap.TopazSPlus,
});
module50.default(u, y.a47, {
  models: ['roborock.vacuum.a47', 'roborock.vacuum.a47v2', 'roborock.vacuum.a47v3', 'roborock.vacuum.a47v4', 'roborock.vacuum.a47v5'],
  volume: P.Default,
  product: S.TopazSPlus,
  resources: module424.ResourceMap.TopazSPlus,
});
module50.default(u, y.a66, {
  models: ['roborock.vacuum.a66', 'roborock.vacuum.a66v2', 'roborock.vacuum.a66v3', 'roborock.vacuum.a66v4', 'roborock.vacuum.a66v5'],
  volume: P.Default,
  product: S.TopazSPlus,
  resources: module424.ResourceMap.TopazSPlus,
});
module50.default(u, y.a64, {
  models: ['roborock.vacuum.a64', 'roborock.vacuum.a64v2', 'roborock.vacuum.a64v3', 'roborock.vacuum.a64v4', 'roborock.vacuum.a64v5'],
  volume: P.Default,
  product: S.TopazSC_CN,
  resources: module424.ResourceMap.TopazSC,
});
module50.default(u, y.a65, {
  models: ['roborock.vacuum.a65', 'roborock.vacuum.a65v2', 'roborock.vacuum.a65v3', 'roborock.vacuum.a65v4', 'roborock.vacuum.a65v5'],
  volume: P.Default,
  product: S.TopazSC_CE,
  resources: module424.ResourceMap.TopazSC,
});
var P = {
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

  return R[y.t6].volume;
}

function E(o) {
  for (var u in R)
    if (R.hasOwnProperty(u)) {
      var c = R[u];

      if (c.models) {
        if (c.models.hasElement(o)) return c.resources;
      } else console.error('DeviceInfoMap.' + u + '.models is not found.');
    }

  return R[y.t6].resources;
}

exports.DeviceInfoMap = R;
var V = module493.sharedManager();
exports.DMM = V;
