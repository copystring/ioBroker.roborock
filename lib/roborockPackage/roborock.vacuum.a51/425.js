var module426 = require('./426'),
  module427 = require('./427'),
  module428 = require('./428'),
  module429 = require('./429'),
  module470 = require('./470'),
  o = module470.defaultV1SupportedLangs,
  I = module470.tanoseV1Langs,
  c = module470.allWithoutHeLangs,
  n = module470.allLangs,
  b = module470.cnWithEnV1Langs,
  f = {
    Ruby: {
      supplies: module426.SuppliesMap.Default,
      guideLanguage: {
        supported: module427.GuidePageSupportMap.Default,
        translated: module427.GuidePageHasTranslateLanguageMap.Default,
      },
      bucket: '',
      errorImages: {
        map: module428.ErrorImageMap.Default,
        size: module428.ErrorImageSize.Default,
      },
      supportedLanguages: o,
      obstacleImages: {
        image: module429.ObstacleImagesMap.Default,
        source: module429.ObstacleImageSourceMap.Default,
        bigImage: module429.ObstacleBigImages.Default,
        topBigImage: module429.ObstacleTopBigImages.Default,
      },
    },
    Ruby2: {
      supplies: module426.SuppliesMap.Default,
      guideLanguage: {
        supported: module427.GuidePageSupportMap.Default,
        translated: module427.GuidePageHasTranslateLanguageMap.Default,
      },
      bucket: 'ruby2',
      errorImages: {
        map: module428.ErrorImageMap.Default,
        size: module428.ErrorImageSize.Default,
      },
      supportedLanguages: o,
      obstacleImages: {
        image: module429.ObstacleImagesMap.Default,
        source: module429.ObstacleImageSourceMap.Default,
        bigImage: module429.ObstacleBigImages.Default,
        topBigImage: module429.ObstacleTopBigImages.Default,
      },
    },
    Rubys: {
      supplies: module426.SuppliesMap.Rubys,
      guideLanguage: {
        supported: module427.GuidePageSupportMap.Rubys,
        translated: module427.GuidePageHasTranslateLanguageMap.Rubys,
      },
      bucket: 'rubys',
      errorImages: {
        map: module428.ErrorImageMap.Rubys,
        size: module428.ErrorImageSize.Rubys,
      },
      supportedLanguages: o,
      obstacleImages: {
        image: module429.ObstacleImagesMap.Default,
        source: module429.ObstacleImageSourceMap.Default,
        bigImage: module429.ObstacleBigImages.Default,
        topBigImage: module429.ObstacleTopBigImages.Default,
      },
    },
    Sapphire: {
      supplies: module426.SuppliesMap.Default,
      guideLanguage: {
        supported: module427.GuidePageSupportMap.Default,
        translated: module427.GuidePageHasTranslateLanguageMap.Default,
      },
      bucket: '',
      errorImages: {
        map: module428.ErrorImageMap.Default,
        size: module428.ErrorImageSize.Default,
      },
      supportedLanguages: o,
      obstacleImages: {
        image: module429.ObstacleImagesMap.Default,
        source: module429.ObstacleImageSourceMap.Default,
        bigImage: module429.ObstacleBigImages.Default,
        topBigImage: module429.ObstacleTopBigImages.Default,
      },
    },
    SapphireC: {
      supplies: module426.SuppliesMap.Default,
      guideLanguage: {
        supported: module427.GuidePageSupportMap.Default,
        translated: module427.GuidePageHasTranslateLanguageMap.Default,
      },
      bucket: '',
      errorImages: {
        map: module428.ErrorImageMap.Default,
        size: module428.ErrorImageSize.Default,
      },
      supportedLanguages: o,
      obstacleImages: {
        image: module429.ObstacleImagesMap.Default,
        source: module429.ObstacleImageSourceMap.Default,
        bigImage: module429.ObstacleBigImages.Default,
        topBigImage: module429.ObstacleTopBigImages.Default,
      },
    },
    Tanos_CN: {
      supplies: module426.SuppliesMap.Tanos_CN,
      guideLanguage: {
        supported: module427.GuidePageSupportMap.Tanos,
        translated: module427.GuidePageHasTranslateLanguageMap.Tanos,
      },
      bucket: 'tanos',
      errorImages: {
        map: module428.ErrorImageMap.Tanos_CN,
        size: module428.ErrorImageSize.Default,
      },
      supportedLanguages: n,
      obstacleImages: {
        image: module429.ObstacleImagesMap.Default,
        source: module429.ObstacleImageSourceMap.Default,
        bigImage: module429.ObstacleBigImages.Default,
        topBigImage: module429.ObstacleTopBigImages.Default,
      },
    },
    Tanos_CE: {
      supplies: module426.SuppliesMap.Tanos_CE,
      guideLanguage: {
        supported: module427.GuidePageSupportMap.Tanos,
        translated: module427.GuidePageHasTranslateLanguageMap.Tanos,
      },
      bucket: 'tanos',
      errorImages: {
        map: module428.ErrorImageMap.Tanos_CE,
        size: module428.ErrorImageSize.Default,
      },
      supportedLanguages: n,
      obstacleImages: {
        image: module429.ObstacleImagesMap.Default,
        source: module429.ObstacleImageSourceMap.Default,
        bigImage: module429.ObstacleBigImages.Default,
        topBigImage: module429.ObstacleTopBigImages.Default,
      },
    },
    RubyPlus: {
      supplies: module426.SuppliesMap.RubyPlus,
      guideLanguage: {
        supported: module427.GuidePageSupportMap.RubyPlus,
        translated: module427.GuidePageHasTranslateLanguageMap.RubyPlus,
      },
      bucket: 'rubyplus',
      errorImages: {
        map: module428.ErrorImageMap.RubyPlus,
        size: module428.ErrorImageSize.Default,
      },
      supportedLanguages: c,
      obstacleImages: {
        image: module429.ObstacleImagesMap.Default,
        source: module429.ObstacleImageSourceMap.Default,
        bigImage: module429.ObstacleBigImages.Default,
        topBigImage: module429.ObstacleTopBigImages.Default,
      },
    },
    RubysLite: {
      supplies: module426.SuppliesMap.RubysLite,
      guideLanguage: {
        supported: module427.GuidePageSupportMap.RubysLite,
        translated: module427.GuidePageHasTranslateLanguageMap.RubysLite,
      },
      bucket: 'rubyslite',
      errorImages: {
        map: module428.ErrorImageMap.RubysLite,
        size: module428.ErrorImageSize.RubysLite,
      },
      supportedLanguages: c,
      obstacleImages: {
        image: module429.ObstacleImagesMap.Default,
        source: module429.ObstacleImageSourceMap.Default,
        bigImage: module429.ObstacleBigImages.Default,
        topBigImage: module429.ObstacleTopBigImages.Default,
      },
    },
    RubySC: {
      supplies: module426.SuppliesMap.RubySC,
      guideLanguage: {
        supported: module427.GuidePageSupportMap.RubySC,
        translated: module427.GuidePageHasTranslateLanguageMap.RubySC,
      },
      bucket: 'rubysc1',
      errorImages: {
        map: module428.ErrorImageMap.RubySC,
        size: module428.ErrorImageSize.Default,
      },
      supportedLanguages: c,
      obstacleImages: {
        image: module429.ObstacleImagesMap.Default,
        source: module429.ObstacleImageSourceMap.Default,
        bigImage: module429.ObstacleBigImages.Default,
        topBigImage: module429.ObstacleTopBigImages.Default,
      },
    },
    TanosE: {
      supplies: module426.SuppliesMap.TanosE,
      guideLanguage: {
        supported: module427.GuidePageSupportMap.TanosE,
        translated: module427.GuidePageHasTranslateLanguageMap.TanosE,
      },
      bucket: 'tanose',
      errorImages: {
        map: module428.ErrorImageMap.TanosE,
        size: module428.ErrorImageSize.Default,
      },
      supportedLanguages: I,
      obstacleImages: {
        image: module429.ObstacleImagesMap.Default,
        source: module429.ObstacleImageSourceMap.Default,
        bigImage: module429.ObstacleBigImages.Default,
        topBigImage: module429.ObstacleTopBigImages.Default,
      },
    },
    SapphireLite: {
      supplies: module426.SuppliesMap.Default,
      guideLanguage: {
        supported: module427.GuidePageSupportMap.Default,
        translated: module427.GuidePageHasTranslateLanguageMap.Default,
      },
      bucket: '',
      errorImages: {
        map: module428.ErrorImageMap.Default,
        size: module428.ErrorImageSize.Default,
      },
      supportedLanguages: o,
      obstacleImages: {
        image: module429.ObstacleImagesMap.Default,
        source: module429.ObstacleImageSourceMap.Default,
        bigImage: module429.ObstacleBigImages.Default,
        topBigImage: module429.ObstacleTopBigImages.Default,
      },
    },
    TanosV_CN: {
      supplies: module426.SuppliesMap.TanosV_CN,
      guideLanguage: {
        supported: module427.GuidePageSupportMap.TanosV,
        translated: module427.GuidePageHasTranslateLanguageMap.TanosV,
      },
      bucket: 'tanosv',
      errorImages: {
        map: module428.ErrorImageMap.TanosV_CN,
        size: module428.ErrorImageSize.Default,
      },
      supportedLanguages: n,
      obstacleImages: {
        image: module429.ObstacleImagesMap.Default,
        source: module429.ObstacleImageSourceMap.Default,
        bigImage: module429.ObstacleBigImages.Default,
        topBigImage: module429.ObstacleTopBigImages.Default,
      },
    },
    TanosV_CE: {
      supplies: module426.SuppliesMap.TanosV_CE,
      guideLanguage: {
        supported: module427.GuidePageSupportMap.TanosV,
        translated: module427.GuidePageHasTranslateLanguageMap.TanosV,
      },
      bucket: 'tanosv',
      errorImages: {
        map: module428.ErrorImageMap.TanosV_CE,
        size: module428.ErrorImageSize.Default,
      },
      supportedLanguages: n,
      obstacleImages: {
        image: module429.ObstacleImagesMap.TanosV_CE,
        source: module429.ObstacleImageSourceMap.TanosV_CE,
        bigImage: module429.ObstacleBigImages.Default,
        topBigImage: module429.ObstacleTopBigImages.TanosV_CE,
      },
    },
    RubysE: {
      supplies: module426.SuppliesMap.RubysE,
      guideLanguage: {
        supported: module427.GuidePageSupportMap.RubysE,
        translated: module427.GuidePageHasTranslateLanguageMap.RubysE,
      },
      bucket: 'rubyse',
      errorImages: {
        map: module428.ErrorImageMap.RubysE,
        size: module428.ErrorImageSize.Default,
      },
      supportedLanguages: c,
      obstacleImages: {
        image: module429.ObstacleImagesMap.Default,
        source: module429.ObstacleImageSourceMap.Default,
        bigImage: module429.ObstacleBigImages.Default,
        topBigImage: module429.ObstacleTopBigImages.Default,
      },
    },
    TanosS: {
      supplies: module426.SuppliesMap.TanosS,
      guideLanguage: {
        supported: module427.GuidePageSupportMap.TanosS,
        translated: module427.GuidePageHasTranslateLanguageMap.TanosS,
      },
      bucket: 'tanoss',
      errorImages: {
        map: module428.ErrorImageMap.TanosS,
        size: module428.ErrorImageSize.Default,
      },
      supportedLanguages: o,
      obstacleImages: {
        image: module429.ObstacleImagesMap.Default,
        source: module429.ObstacleImageSourceMap.Default,
        bigImage: module429.ObstacleBigImages.Default,
        topBigImage: module429.ObstacleTopBigImages.Default,
      },
    },
    Garnet: {
      supplies: module426.SuppliesMap.Garnet,
      guideLanguage: {
        supported: module427.GuidePageSupportMap.Default,
        translated: module427.GuidePageHasTranslateLanguageMap.Default,
      },
      bucket: 'garnet',
      errorImages: {
        map: module428.ErrorImageMap.Garnet,
        size: module428.ErrorImageSize.Default,
      },
      supportedLanguages: o,
      obstacleImages: {
        image: module429.ObstacleImagesMap.Default,
        source: module429.ObstacleImageSourceMap.Default,
        bigImage: module429.ObstacleBigImages.Default,
        topBigImage: module429.ObstacleTopBigImages.Default,
      },
    },
    TanosSPlus: {
      supplies: module426.SuppliesMap.TanosSPlus,
      guideLanguage: {
        supported: module427.GuidePageSupportMap.TanosSPlus,
        translated: module427.GuidePageHasTranslateLanguageMap.TanosSPlus,
      },
      bucket: 'tanossplus',
      errorImages: {
        map: module428.ErrorImageMap.TopazS,
        size: module428.ErrorImageSize.Default,
      },
      supportedLanguages: b,
      obstacleImages: {
        image: module429.ObstacleImagesMap.Default,
        source: module429.ObstacleImageSourceMap.Default,
        bigImage: module429.ObstacleBigImages.Default,
        topBigImage: module429.ObstacleTopBigImages.Default,
      },
    },
    TopazSV: {
      supplies: module426.SuppliesMap.TopazSV,
      guideLanguage: {
        supported: module427.GuidePageSupportMap.Default,
        translated: module427.GuidePageHasTranslateLanguageMap.Default,
      },
      bucket: 'topazsv',
      errorImages: {
        map: module428.ErrorImageMap.TopazSV,
        size: module428.ErrorImageSize.Default,
      },
      supportedLanguages: n,
      obstacleImages: {
        image: module429.ObstacleImagesMap.Default,
        source: module429.ObstacleImageSourceMap.Default,
        bigImage: module429.ObstacleBigImages.Default,
        topBigImage: module429.ObstacleTopBigImages.Default,
      },
    },
    TopazSPlus: {
      supplies: module426.SuppliesMap.TopazSV,
      guideLanguage: {
        supported: module427.GuidePageSupportMap.Default,
        translated: module427.GuidePageHasTranslateLanguageMap.Default,
      },
      bucket: 'topazsplus',
      errorImages: {
        map: module428.ErrorImageMap.TopazSV,
        size: module428.ErrorImageSize.Default,
      },
      supportedLanguages: b,
      obstacleImages: {
        image: module429.ObstacleImagesMap.Default,
        source: module429.ObstacleImageSourceMap.Default,
        bigImage: module429.ObstacleBigImages.Default,
        topBigImage: module429.ObstacleTopBigImages.Default,
      },
    },
    Pearl: {
      supplies: module426.SuppliesMap.Pearl,
      guideLanguage: {
        supported: module427.GuidePageSupportMap.Default,
        translated: module427.GuidePageHasTranslateLanguageMap.Default,
      },
      bucket: 'pearl',
      errorImages: {
        map: module428.ErrorImageMap.Pearl,
        size: module428.ErrorImageSize.Default,
      },
      supportedLanguages: n,
      obstacleImages: {
        image: module429.ObstacleImagesMap.Default,
        source: module429.ObstacleImageSourceMap.Default,
        bigImage: module429.ObstacleBigImages.Default,
        topBigImage: module429.ObstacleTopBigImages.Default,
      },
    },
    PearlPlus: {
      supplies: module426.SuppliesMap.Pearl,
      guideLanguage: {
        supported: module427.GuidePageSupportMap.Default,
        translated: module427.GuidePageHasTranslateLanguageMap.Default,
      },
      bucket: 'pearlplus',
      errorImages: {
        map: module428.ErrorImageMap.Pearl,
        size: module428.ErrorImageSize.Default,
      },
      supportedLanguages: n,
      obstacleImages: {
        image: module429.ObstacleImagesMap.Default,
        source: module429.ObstacleImageSourceMap.Default,
        bigImage: module429.ObstacleBigImages.Default,
        topBigImage: module429.ObstacleTopBigImages.Default,
      },
    },
    Ultron: {
      supplies: module426.SuppliesMap.Ultron,
      guideLanguage: {
        supported: module427.GuidePageSupportMap.Default,
        translated: module427.GuidePageHasTranslateLanguageMap.Default,
      },
      bucket: 'ultron',
      errorImages: {
        map: module428.ErrorImageMap.Ultron,
        size: module428.ErrorImageSize.Default,
      },
      supportedLanguages: n,
      obstacleImages: {
        image: module429.ObstacleImagesMap.Default,
        source: module429.ObstacleImageSourceMap.Default,
        bigImage: module429.ObstacleBigImages.Default,
        topBigImage: module429.ObstacleTopBigImages.Default,
      },
    },
    UltronSPlus: {
      supplies: module426.SuppliesMap.UltronsPlus,
      guideLanguage: {
        supported: module427.GuidePageSupportMap.Default,
        translated: module427.GuidePageHasTranslateLanguageMap.Default,
      },
      bucket: 'ultronsplus',
      errorImages: {
        map: module428.ErrorImageMap.UltronsPlus,
        size: module428.ErrorImageSize.Default,
      },
      supportedLanguages: n,
      obstacleImages: {
        image: module429.ObstacleImagesMap.Default,
        source: module429.ObstacleImageSourceMap.Default,
        bigImage: module429.ObstacleBigImages.Default,
        topBigImage: module429.ObstacleTopBigImages.Default,
      },
    },
    Coral: {
      supplies: module426.SuppliesMap.Default,
      guideLanguage: {
        supported: module427.GuidePageSupportMap.Default,
        translated: module427.GuidePageHasTranslateLanguageMap.Default,
      },
      bucket: 'coral',
      errorImages: {
        map: module428.ErrorImageMap.Default,
        size: module428.ErrorImageSize.Default,
      },
      supportedLanguages: o,
      obstacleImages: {
        image: module429.ObstacleImagesMap.Default,
        source: module429.ObstacleImageSourceMap.Default,
        bigImage: module429.ObstacleBigImages.Default,
        topBigImage: module429.ObstacleTopBigImages.Default,
      },
    },
    TopazS: {
      supplies: module426.SuppliesMap.TopazS,
      guideLanguage: {
        supported: module427.GuidePageSupportMap.Default,
        translated: module427.GuidePageHasTranslateLanguageMap.Default,
      },
      bucket: 'topazs',
      errorImages: {
        map: module428.ErrorImageMap.TopazS,
        size: module428.ErrorImageSize.Default,
      },
      supportedLanguages: b,
      obstacleImages: {
        image: module429.ObstacleImagesMap.Default,
        source: module429.ObstacleImageSourceMap.Default,
        bigImage: module429.ObstacleBigImages.Default,
        topBigImage: module429.ObstacleTopBigImages.Default,
      },
    },
    TopazS_CE: {
      supplies: module426.SuppliesMap.TopazS,
      guideLanguage: {
        supported: module427.GuidePageSupportMap.Default,
        translated: module427.GuidePageHasTranslateLanguageMap.Default,
      },
      bucket: 'topazs',
      errorImages: {
        map: module428.ErrorImageMap.TopazS,
        size: module428.ErrorImageSize.Default,
      },
      supportedLanguages: n,
      obstacleImages: {
        image: module429.ObstacleImagesMap.Default,
        source: module429.ObstacleImageSourceMap.Default,
        bigImage: module429.ObstacleBigImages.Default,
        topBigImage: module429.ObstacleTopBigImages.Default,
      },
    },
    TanosSV: {
      supplies: module426.SuppliesMap.TanosS,
      guideLanguage: {
        supported: module427.GuidePageSupportMap.TanosS,
        translated: module427.GuidePageHasTranslateLanguageMap.TanosS,
      },
      bucket: 'tanossv',
      errorImages: {
        map: module428.ErrorImageMap.TanosS,
        size: module428.ErrorImageSize.Default,
      },
      supportedLanguages: o,
      obstacleImages: {
        image: module429.ObstacleImagesMap.Default,
        source: module429.ObstacleImageSourceMap.Default,
        bigImage: module429.ObstacleBigImages.Default,
        topBigImage: module429.ObstacleTopBigImages.Default,
      },
    },
    TanosSMax: {
      supplies: module426.SuppliesMap.TanosSMax,
      guideLanguage: {
        supported: module427.GuidePageSupportMap.TanosSPlus,
        translated: module427.GuidePageHasTranslateLanguageMap.TanosSPlus,
      },
      bucket: 'tanossmax',
      errorImages: {
        map: module428.ErrorImageMap.TanosSPlus,
        size: module428.ErrorImageSize.Default,
      },
      supportedLanguages: b,
      obstacleImages: {
        image: module429.ObstacleImagesMap.Default,
        source: module429.ObstacleImageSourceMap.Default,
        bigImage: module429.ObstacleBigImages.Default,
        topBigImage: module429.ObstacleTopBigImages.Default,
      },
    },
    TanosSL: {
      supplies: module426.SuppliesMap.TanosSLite,
      guideLanguage: {
        supported: module427.GuidePageSupportMap.TanosS,
        translated: module427.GuidePageHasTranslateLanguageMap.TanosS,
      },
      bucket: 'tanosslite',
      errorImages: {
        map: module428.ErrorImageMap.TanosSLite,
        size: module428.ErrorImageSize.Default,
      },
      supportedLanguages: o,
      obstacleImages: {
        image: module429.ObstacleImagesMap.Default,
        source: module429.ObstacleImageSourceMap.Default,
        bigImage: module429.ObstacleBigImages.Default,
        topBigImage: module429.ObstacleTopBigImages.Default,
      },
    },
    UltronLite: {
      supplies: module426.SuppliesMap.TanosSLite,
      guideLanguage: {
        supported: module427.GuidePageSupportMap.TanosS,
        translated: module427.GuidePageHasTranslateLanguageMap.TanosS,
      },
      bucket: 'ultronlite',
      errorImages: {
        map: module428.ErrorImageMap.TanosSLite,
        size: module428.ErrorImageSize.Default,
      },
      supportedLanguages: o,
      obstacleImages: {
        image: module429.ObstacleImagesMap.Default,
        source: module429.ObstacleImageSourceMap.Default,
        bigImage: module429.ObstacleBigImages.Default,
        topBigImage: module429.ObstacleTopBigImages.Default,
      },
    },
    TanosSC: {
      supplies: module426.SuppliesMap.TanosSC,
      guideLanguage: {
        supported: module427.GuidePageSupportMap.TanosS,
        translated: module427.GuidePageHasTranslateLanguageMap.TanosS,
      },
      bucket: 'tanossc',
      errorImages: {
        map: module428.ErrorImageMap.TanosSC,
        size: module428.ErrorImageSize.Default,
      },
      supportedLanguages: o,
      obstacleImages: {
        image: module429.ObstacleImagesMap.Default,
        source: module429.ObstacleImageSourceMap.Default,
        bigImage: module429.ObstacleBigImages.Default,
        topBigImage: module429.ObstacleTopBigImages.Default,
      },
    },
    TanosSE: {
      supplies: module426.SuppliesMap.TanosSE,
      guideLanguage: {
        supported: module427.GuidePageSupportMap.TanosS,
        translated: module427.GuidePageHasTranslateLanguageMap.TanosS,
      },
      bucket: 'tanosse',
      errorImages: {
        map: module428.ErrorImageMap.TanosSE,
        size: module428.ErrorImageSize.Default,
      },
      supportedLanguages: o,
      obstacleImages: {
        image: module429.ObstacleImagesMap.Default,
        source: module429.ObstacleImageSourceMap.Default,
        bigImage: module429.ObstacleBigImages.Default,
        topBigImage: module429.ObstacleTopBigImages.Default,
      },
    },
    UltronE: {
      supplies: module426.SuppliesMap.TanosSE,
      guideLanguage: {
        supported: module427.GuidePageSupportMap.TanosS,
        translated: module427.GuidePageHasTranslateLanguageMap.TanosS,
      },
      bucket: 'ultrone',
      errorImages: {
        map: module428.ErrorImageMap.TanosSE,
        size: module428.ErrorImageSize.Default,
      },
      supportedLanguages: o,
      obstacleImages: {
        image: module429.ObstacleImagesMap.Default,
        source: module429.ObstacleImageSourceMap.Default,
        bigImage: module429.ObstacleBigImages.Default,
        topBigImage: module429.ObstacleTopBigImages.Default,
      },
    },
    TopazSPower: {
      supplies: module426.SuppliesMap.TopazS,
      guideLanguage: {
        supported: module427.GuidePageSupportMap.Default,
        translated: module427.GuidePageHasTranslateLanguageMap.Default,
      },
      bucket: 'topazspower',
      errorImages: {
        map: module428.ErrorImageMap.TopazS,
        size: module428.ErrorImageSize.Default,
      },
      supportedLanguages: n,
      obstacleImages: {
        image: module429.ObstacleImagesMap.Default,
        source: module429.ObstacleImageSourceMap.Default,
        bigImage: module429.ObstacleBigImages.Default,
        topBigImage: module429.ObstacleTopBigImages.Default,
      },
    },
    TopazSC: {
      supplies: module426.SuppliesMap.TopazSV,
      guideLanguage: {
        supported: module427.GuidePageSupportMap.Default,
        translated: module427.GuidePageHasTranslateLanguageMap.Default,
      },
      bucket: 'topazsc',
      errorImages: {
        map: module428.ErrorImageMap.TopazSV,
        size: module428.ErrorImageSize.Default,
      },
      supportedLanguages: n,
      obstacleImages: {
        image: module429.ObstacleImagesMap.Default,
        source: module429.ObstacleImageSourceMap.Default,
        bigImage: module429.ObstacleBigImages.Default,
        topBigImage: module429.ObstacleTopBigImages.Default,
      },
    },
  };

exports.ResourceMap = f;
