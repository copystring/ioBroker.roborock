var u,
  module49 = require('./49'),
  module4 = require('./4'),
  module5 = require('./5'),
  module95 = require('./95'),
  module30 = require('./30'),
  module416 = require('./416'),
  module389 = require('./389'),
  b = module389.deviceModel || module389.Device.model,
  module454 = require('./454').allLangs;

Array.prototype.hasElement = function (o) {
  return -1 != this.indexOf(o);
};

String.prototype.templateStringWithParams = function (o) {
  var u = Object.keys(o),
    c = Object.values(o);
  return module95.default(Function, module30.default(u).concat(['return `' + this + '`;'])).apply(undefined, module30.default(c));
};

var f = null,
  module480 = (function () {
    function o() {
      module4.default(this, o);
      if (!f) f = this;
      return f;
    }

    module5.default(
      o,
      [
        {
          key: 'currentSeries',
          get: function () {
            return P(b);
          },
        },
        {
          key: 'currentProduct',
          get: function () {
            return M(b);
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
            return C(b).max;
          },
        },
        {
          key: 'volumeMin',
          get: function () {
            return C(b).min;
          },
        },
        {
          key: 'supplies',
          get: function () {
            return V(b).supplies;
          },
        },
        {
          key: 'robotInMap',
          get: function () {
            return {
              image: this.currentProduct == y.RubyPlus ? require('./478') : this.currentProduct == y.Garnet ? require('./479') : require('./480'),
              chargerAngle: this.currentProduct == y.RubyPlus || this.currentProduct == y.Garnet ? 0 : 180,
            };
          },
        },
        {
          key: 'agreeProtocolLevel',
          get: function () {
            return this.currentProduct == y.Rubys ? 3 : 9;
          },
        },
        {
          key: 'bucket',
          get: function () {
            return V(b).bucket || ' ';
          },
        },
        {
          key: 'soundPackageFilePath',
          get: function () {
            var o = 1 == this.productVersion ? '' : 'debug/';
            return '/' + V(b).bucket + '/app/voice-pkg/' + o;
          },
        },
        {
          key: 'configFilePath',
          get: function () {
            var o = 1 == this.productVersion ? '' : 'debug/';
            return '/' + V(b).bucket + '/app/config/' + o;
          },
        },
        {
          key: 'errorImages',
          get: function () {
            return V(b).errorImages;
          },
        },
        {
          key: 'supportedLanguages',
          get: function () {
            return 1 == this.productVersion ? V(b).supportedLanguages : module454;
          },
        },
        {
          key: 'supportedGuideLanguages',
          get: function () {
            return V(b).guideLanguage.supported;
          },
        },
        {
          key: 'translatedGuideLanguages',
          get: function () {
            return V(b).guideLanguage.translated;
          },
        },
        {
          key: 'obstacleImagesMap',
          get: function () {
            return V(b).obstacleImages;
          },
        },
        {
          key: 'errorsMap',
          get: function () {
            return V(b).errors;
          },
        },
        {
          key: 'isV',
          value: function (o) {
            return this.productVersion == o;
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
            return this.currentProduct == y.TanosV_CN || this.currentProduct == y.TanosV_CE;
          },
        },
        {
          key: 'isTanos',
          get: function () {
            return this.currentProduct == y.Tanos_CN || this.currentProduct == y.Tanos_CE;
          },
        },
        {
          key: 'isRuby',
          get: function () {
            return this.currentProduct == y.Ruby;
          },
        },
        {
          key: 'isRubys',
          get: function () {
            return this.currentProduct == y.Rubys;
          },
        },
        {
          key: 'isRuby2',
          get: function () {
            return this.currentProduct == y.Ruby2;
          },
        },
        {
          key: 'isSapphire',
          get: function () {
            return this.currentProduct == y.Sapphire;
          },
        },
        {
          key: 'isSapphireC',
          get: function () {
            return this.currentProduct == y.SapphireC;
          },
        },
        {
          key: 'isTanosCN',
          get: function () {
            return this.currentProduct == y.Tanos_CN;
          },
        },
        {
          key: 'isTanosCE',
          get: function () {
            return this.currentProduct == y.Tanos_CE;
          },
        },
        {
          key: 'isRubyPlus',
          get: function () {
            return this.currentProduct == y.RubyPlus;
          },
        },
        {
          key: 'isRubysLite',
          get: function () {
            return this.currentProduct == y.RubysLite;
          },
        },
        {
          key: 'isRubySC',
          get: function () {
            return this.currentProduct == y.RubySC;
          },
        },
        {
          key: 'isTanosE',
          get: function () {
            return this.currentProduct == y.TanosE;
          },
        },
        {
          key: 'isSapphireLite',
          get: function () {
            return this.currentProduct == y.SapphireLite;
          },
        },
        {
          key: 'isTanosV_CN',
          get: function () {
            return this.currentProduct == y.TanosV_CN;
          },
        },
        {
          key: 'isTanosV_CE',
          get: function () {
            return this.currentProduct == y.TanosV_CE;
          },
        },
        {
          key: 'isRubysE',
          get: function () {
            return this.currentProduct == y.RubysE;
          },
        },
        {
          key: 'isTanosS',
          get: function () {
            return this.currentProduct == y.TanosS;
          },
        },
        {
          key: 'isGarnet',
          get: function () {
            return this.currentProduct == y.Garnet;
          },
        },
        {
          key: 'isTanosSPlus',
          get: function () {
            return this.currentProduct == y.TanosSPlus;
          },
        },
        {
          key: 'isTopazSV',
          get: function () {
            return this.currentProduct == y.TopazSV;
          },
        },
        {
          key: 'isCoral',
          get: function () {
            return this.currentProduct == y.Coral;
          },
        },
        {
          key: 'isTopazS',
          get: function () {
            return this.currentProduct == y.TopazS;
          },
        },
        {
          key: 'isTopazSPlus',
          get: function () {
            return this.currentProduct == y.TopazSPlus;
          },
        },
        {
          key: 'isTanosSC',
          get: function () {
            return this.currentProduct == y.TanosSC;
          },
        },
        {
          key: 'isTanosSL',
          get: function () {
            return this.currentProduct == y.TanosSL;
          },
        },
        {
          key: 'isTanosSE',
          get: function () {
            return this.currentProduct == y.TanosSE;
          },
        },
        {
          key: 'isTanosSV',
          get: function () {
            return this.currentProduct == y.TanosSV;
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

exports.default = module480;
var y = {
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
  TopazSV: 'TOPAZSV',
  Coral: 'CORAL',
  TanosSL: 'TANOSSL',
  TanosSC: 'TANOSSC',
  TanosSE: 'TANOSSE',
  TopazS: 'TOPAZS',
  TanosSV: 'TANOSSV',
  TopazSPlus: 'TOPAZSPLUS',
};
exports.Products = y;
var S = {
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
  a20: 'a20',
  a37: 'a37',
  a38: 'a38',
  a39: 'a39',
  a40: 'a40',
  a33: 'a33',
  a34: 'a34',
  a29: 'a29',
  a30: 'a30',
  a44: 'a44',
  a45: 'a45',
  a46: 'a46',
};
exports.DeviceSeries = S;
u = {};
module49.default(u, S.v1, {
  models: ['rockrobo.vacuum.v1', 'rockrobo.sweeper.v2', 'rockrobo.sweeper.v1'],
  product: y.Ruby,
  volume: R.Default,
  resources: module416.ResourceMap.Ruby,
});
module49.default(u, S.m1s, {
  models: ['roborock.vacuum.m1s', 'roborock.vacuum.m1sv2', 'roborock.vacuum.m1sv3'],
  bucket: y.Ruby2,
  volume: R.Default,
  resources: module416.ResourceMap.Ruby2,
});
module49.default(u, S.s5, {
  models: ['roborock.vacuum.s5', 'roborock.sweeper.s5v2', 'roborock.sweeper.s5v3'],
  product: y.Rubys,
  volume: R.Default,
  resources: module416.ResourceMap.Rubys,
});
module49.default(u, S.e2, {
  models: ['roborock.vacuum.e2', 'roborock.sweeper.e2v2', 'roborock.sweeper.e2v3'],
  product: y.Sapphire,
  volume: R.Default,
  resources: module416.ResourceMap.Sapphire,
});
module49.default(u, S.c1, {
  models: ['roborock.vacuum.c1', 'roborock.sweeper.c1v2', 'roborock.sweeper.c1v3'],
  product: y.SapphireC,
  volume: R.Default,
  resources: module416.ResourceMap.SapphireC,
});
module49.default(u, S.t6, {
  models: ['roborock.vacuum.t6', 'roborock.vacuum.t6v2', 'roborock.vacuum.t6v3'],
  product: y.Tanos_CN,
  volume: R.Default,
  resources: module416.ResourceMap.Tanos_CN,
});
module49.default(u, S.s6, {
  models: ['roborock.vacuum.s6', 'roborock.vacuum.s6v2', 'roborock.vacuum.s6v3'],
  product: y.Tanos_CE,
  volume: R.Default,
  resources: module416.ResourceMap.Tanos_CE,
});
module49.default(u, S.t4, {
  models: ['roborock.vacuum.t4', 'roborock.vacuum.t4v2', 'roborock.vacuum.t4v3'],
  product: y.RubyPlus,
  volume: R.Default,
  resources: module416.ResourceMap.RubyPlus,
});
module49.default(u, S.s4, {
  models: ['roborock.vacuum.s4', 'roborock.vacuum.s4v2', 'roborock.vacuum.s4v3'],
  product: y.RubyPlus,
  volume: R.Default,
  resources: module416.ResourceMap.RubyPlus,
});
module49.default(u, S.a05, {
  models: ['roborock.vacuum.a05', 'roborock.vacuum.a05v2', 'roborock.vacuum.a05v3'],
  product: y.RubysLite,
  volume: R.Type1,
  resources: module416.ResourceMap.RubysLite,
});
module49.default(u, S.p6, {
  models: ['roborock.vacuum.p6', 'roborock.vacuum.p6v2', 'roborock.vacuum.p6v3', 'roborock.vacuum.p6v4', 'roborock.vacuum.p6v5'],
  product: y.RubysLite,
  volume: R.Type1,
  resources: module416.ResourceMap.RubysLite,
});
module49.default(u, S.s5e, {
  models: ['roborock.vacuum.s5e', 'roborock.vacuum.s5ev2', 'roborock.vacuum.s5ev3', 'roborock.vacuum.s5ev4', 'roborock.vacuum.s5ev5'],
  product: y.RubysLite,
  volume: R.Type1,
  resources: module416.ResourceMap.RubysLite,
});
module49.default(u, S.p5, {
  models: ['roborock.vacuum.p5', 'roborock.vacuum.p5v2', 'roborock.vacuum.p5v3', 'roborock.vacuum.p5v4', 'roborock.vacuum.p5v5'],
  product: y.RubySC,
  volume: R.Default,
  resources: module416.ResourceMap.RubySC,
});
module49.default(u, S.a08, {
  models: ['roborock.vacuum.a08', 'roborock.vacuum.a08v2', 'roborock.vacuum.a08v3'],
  product: y.RubySC,
  volume: R.Default,
  resources: module416.ResourceMap.RubySC,
});
module49.default(u, S.a11, {
  models: ['roborock.vacuum.a11', 'roborock.vacuum.a11v2', 'roborock.vacuum.a11v3', 'roborock.vacuum.a11v4', 'roborock.vacuum.a11v5'],
  product: y.TanosE,
  volume: R.Type2,
  resources: module416.ResourceMap.TanosE,
});
module49.default(u, S.t7, {
  models: ['roborock.vacuum.t7', 'roborock.vacuum.t7v2', 'roborock.vacuum.t7v3'],
  product: y.TanosE,
  volume: R.Type2,
  resources: module416.ResourceMap.TanosE,
});
module49.default(u, S.a01, {
  models: ['roborock.vacuum.a01', 'roborock.vacuum.a01v2', 'roborock.vacuum.a01v3'],
  product: y.SapphireLite,
  volume: R.Default,
  resources: module416.ResourceMap.SapphireLite,
});
module49.default(u, S.t7p, {
  models: ['roborock.vacuum.t7p', 'roborock.vacuum.t7pv2', 'roborock.vacuum.t7pv3'],
  product: y.TanosV_CN,
  volume: R.Type3,
  resources: module416.ResourceMap.TanosV_CN,
});
module49.default(u, S.a09, {
  models: ['roborock.vacuum.a09', 'roborock.vacuum.a09v2', 'roborock.vacuum.a09v3', 'roborock.vacuum.a09v4', 'roborock.vacuum.a09v5'],
  product: y.TanosV_CN,
  volume: R.Type3,
  resources: module416.ResourceMap.TanosV_CN,
});
module49.default(u, S.a10, {
  models: ['roborock.vacuum.a10', 'roborock.vacuum.a10v2', 'roborock.vacuum.a10v3', 'roborock.vacuum.a10v4', 'roborock.vacuum.a10v5'],
  product: y.TanosV_CE,
  volume: R.Type3,
  resources: module416.ResourceMap.TanosV_CE,
});
module49.default(u, S.a19, {
  models: ['roborock.vacuum.a19', 'roborock.vacuum.a19v2', 'roborock.vacuum.a19v3', 'roborock.vacuum.a19v4', 'roborock.vacuum.a19v5'],
  product: y.RubysE,
  volume: R.Default,
  resources: module416.ResourceMap.RubysE,
});
module49.default(u, S.a14, {
  models: ['roborock.vacuum.a14', 'roborock.vacuum.a14v2', 'roborock.vacuum.a14v3', 'roborock.vacuum.a14v4', 'roborock.vacuum.a14v5'],
  product: y.TanosS,
  volume: R.Type1,
  resources: module416.ResourceMap.TanosS,
});
module49.default(u, S.a15, {
  models: ['roborock.vacuum.a15', 'roborock.vacuum.a15v2', 'roborock.vacuum.a15v3', 'roborock.vacuum.a15v4', 'roborock.vacuum.a15v5'],
  product: y.TanosS,
  volume: R.Type1,
  resources: module416.ResourceMap.TanosS,
});
module49.default(u, S.a16, {
  models: ['roborock.vacuum.a16', 'roborock.vacuum.a16v2', 'roborock.vacuum.a16v3', 'roborock.vacuum.a16v4', 'roborock.vacuum.a16v5'],
  volume: R.Default,
  product: y.Garnet,
  resources: module416.ResourceMap.Garnet,
});
module49.default(u, S.a17, {
  models: ['roborock.vacuum.a17', 'roborock.vacuum.a17v2', 'roborock.vacuum.a17v3', 'roborock.vacuum.a17v4', 'roborock.vacuum.a17v5'],
  volume: R.Default,
  product: y.Garnet,
  resources: module416.ResourceMap.Garnet,
});
module49.default(u, S.a23, {
  models: ['roborock.vacuum.a23', 'roborock.vacuum.a23v2', 'roborock.vacuum.a23v3', 'roborock.vacuum.a23v4', 'roborock.vacuum.a23v5', 'roborock.vacuum.a23v6'],
  volume: R.Default,
  product: y.TanosSPlus,
  resources: module416.ResourceMap.TanosSPlus,
});
module49.default(u, S.a24, {
  models: ['roborock.vacuum.a24', 'roborock.vacuum.a24v2', 'roborock.vacuum.a24v3', 'roborock.vacuum.a24v4', 'roborock.vacuum.a24v5'],
  volume: R.Default,
  product: y.TanosSPlus,
  resources: module416.ResourceMap.TanosSPlus,
});
module49.default(u, S.a26, {
  models: ['roborock.vacuum.a26', 'roborock.vacuum.a26v2', 'roborock.vacuum.a26v3', 'roborock.vacuum.a26v4', 'roborock.vacuum.a26v5'],
  volume: R.Default,
  product: y.TopazSV,
  resources: module416.ResourceMap.TopazSV,
});
module49.default(u, S.a27, {
  models: ['roborock.vacuum.a27', 'roborock.vacuum.a27v2', 'roborock.vacuum.a27v3', 'roborock.vacuum.a27v4', 'roborock.vacuum.a27v5'],
  volume: R.Default,
  product: y.TopazSV,
  resources: module416.ResourceMap.TopazSV,
});
module49.default(u, S.a20, {
  models: ['roborock.vacuum.a20', 'roborock.vacuum.a20v2', 'roborock.vacuum.a20v3', 'roborock.vacuum.a20v4', 'roborock.vacuum.a20v5'],
  volume: R.Default,
  product: y.Coral,
  resources: module416.ResourceMap.Coral,
});
module49.default(u, S.a37, {
  models: ['roborock.vacuum.a37', 'roborock.vacuum.a37v2', 'roborock.vacuum.a37v3', 'roborock.vacuum.a37v4', 'roborock.vacuum.a37v5'],
  volume: R.Default,
  product: y.TanosSL,
  resources: module416.ResourceMap.TanosS,
});
module49.default(u, S.a38, {
  models: ['roborock.vacuum.a38', 'roborock.vacuum.a38v2', 'roborock.vacuum.a38v3', 'roborock.vacuum.a38v4', 'roborock.vacuum.a38v5'],
  volume: R.Default,
  product: y.TanosSL,
  resources: module416.ResourceMap.TanosS,
});
module49.default(u, S.a39, {
  models: ['roborock.vacuum.a39', 'roborock.vacuum.a39v2', 'roborock.vacuum.a39v3', 'roborock.vacuum.a39v4', 'roborock.vacuum.a39v5'],
  volume: R.Default,
  product: y.TanosSC,
  resources: module416.ResourceMap.TanosS,
});
module49.default(u, S.a40, {
  models: ['roborock.vacuum.a40', 'roborock.vacuum.a40v2', 'roborock.vacuum.a40v3', 'roborock.vacuum.a40v4', 'roborock.vacuum.a40v5'],
  volume: R.Default,
  product: y.TanosSC,
  resources: module416.ResourceMap.TanosS,
});
module49.default(u, S.a33, {
  models: ['roborock.vacuum.a33', 'roborock.vacuum.a33v2', 'roborock.vacuum.a33v3', 'roborock.vacuum.a33v4', 'roborock.vacuum.a33v5'],
  volume: R.Default,
  product: y.TanosSE,
  resources: module416.ResourceMap.TanosS,
});
module49.default(u, S.a34, {
  models: ['roborock.vacuum.a34', 'roborock.vacuum.a34v2', 'roborock.vacuum.a34v3', 'roborock.vacuum.a34v4', 'roborock.vacuum.a34v5'],
  volume: R.Default,
  product: y.TanosSE,
  resources: module416.ResourceMap.TanosS,
});
module49.default(u, S.a29, {
  models: ['roborock.vacuum.a29', 'roborock.vacuum.a29v2', 'roborock.vacuum.a29v3', 'roborock.vacuum.a29v4', 'roborock.vacuum.a29v5'],
  volume: R.Default,
  product: y.TopazS,
  resources: module416.ResourceMap.TopazS,
});
module49.default(u, S.a30, {
  models: ['roborock.vacuum.a30', 'roborock.vacuum.a30v2', 'roborock.vacuum.a30v3', 'roborock.vacuum.a30v4', 'roborock.vacuum.a30v5'],
  volume: R.Default,
  product: y.TopazS,
  resources: module416.ResourceMap.TopazS,
});
module49.default(u, S.a44, {
  models: ['roborock.vacuum.a44', 'roborock.vacuum.a44v2', 'roborock.vacuum.a44v3', 'roborock.vacuum.a44v4', 'roborock.vacuum.a44v5'],
  volume: R.Default,
  product: y.TanosSV,
  resources: module416.ResourceMap.TopazSV,
});
module49.default(u, S.a45, {
  models: ['roborock.vacuum.a45', 'roborock.vacuum.a45v2', 'roborock.vacuum.a45v3', 'roborock.vacuum.a45v4', 'roborock.vacuum.a45v5'],
  volume: R.Default,
  product: y.TanosSV,
  resources: module416.ResourceMap.TopazSV,
});
module49.default(u, S.a46, {
  models: ['roborock.vacuum.a46', 'roborock.vacuum.a46v2', 'roborock.vacuum.a46v3', 'roborock.vacuum.a46v4', 'roborock.vacuum.a46v5'],
  volume: R.Default,
  product: y.TopazSPlus,
  resources: module416.ResourceMap.TopazS,
});
var R = {
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
  },
  h = u;

function P(o) {
  for (var u in h)
    if (h.hasOwnProperty(u)) {
      var c = h[u];

      if (c.models) {
        if (c.models.hasElement(o)) return u;
      } else console.error('DeviceInfoMap.' + u + '.models is not found.');
    }

  return '';
}

function M(o) {
  for (var u in h)
    if (h.hasOwnProperty(u)) {
      var c = h[u];

      if (c.models) {
        if (c.models.hasElement(o)) return c.product;
      } else console.error('DeviceInfoMap.' + u + '.models is not found.');
    }

  return '';
}

function C(o) {
  for (var u in h)
    if (h.hasOwnProperty(u)) {
      var c = h[u];

      if (c.models) {
        if (c.models.hasElement(o)) return c.volume;
      } else console.error('DeviceInfoMap.' + u + '.models is not found.');
    }

  return h[S.t6].volume;
}

function V(o) {
  for (var u in h)
    if (h.hasOwnProperty(u)) {
      var c = h[u];

      if (c.models) {
        if (c.models.hasElement(o)) return c.resources;
      } else console.error('DeviceInfoMap.' + u + '.models is not found.');
    }

  return h[S.t6].resources;
}

exports.DeviceInfoMap = h;
var E = module480.sharedManager();
exports.DMM = E;
