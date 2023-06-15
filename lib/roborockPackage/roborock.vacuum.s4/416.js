var module417 = require('./417'),
  module418 = require('./418'),
  module419 = require('./419'),
  module420 = require('./420'),
  module454 = require('./454'),
  o = module454.defaultV1SupportedLangs,
  I = module454.tanoseV1Langs,
  b = module454.allWithoutHeLangs,
  c = module454.allLangs,
  n = module454.cnWithEnV1Langs,
  f = {
    Ruby: {
      supplies: module417.SuppliesMap.Default,
      guideLanguage: {
        supported: module418.GuidePageSupportMap.Default,
        translated: module418.GuidePageHasTranslateLanguageMap.Default,
      },
      bucket: '',
      errorImages: {
        map: module419.ErrorImageMap.Default,
        size: module419.ErrorImageSize.Default,
      },
      supportedLanguages: o,
      obstacleImages: {
        image: module420.ObstacleImagesMap.Default,
        source: module420.ObstacleImageSourceMap.Default,
        bigImage: module420.ObstacleBigImages.Default,
        topBigImage: module420.ObstacleTopBigImages.Default,
      },
    },
    Ruby2: {
      supplies: module417.SuppliesMap.Default,
      guideLanguage: {
        supported: module418.GuidePageSupportMap.Default,
        translated: module418.GuidePageHasTranslateLanguageMap.Default,
      },
      bucket: 'ruby2',
      errorImages: {
        map: module419.ErrorImageMap.Default,
        size: module419.ErrorImageSize.Default,
      },
      supportedLanguages: o,
      obstacleImages: {
        image: module420.ObstacleImagesMap.Default,
        source: module420.ObstacleImageSourceMap.Default,
        bigImage: module420.ObstacleBigImages.Default,
        topBigImage: module420.ObstacleTopBigImages.Default,
      },
    },
    Rubys: {
      supplies: module417.SuppliesMap.Rubys,
      guideLanguage: {
        supported: module418.GuidePageSupportMap.Rubys,
        translated: module418.GuidePageHasTranslateLanguageMap.Rubys,
      },
      bucket: 'rubys',
      errorImages: {
        map: module419.ErrorImageMap.Rubys,
        size: module419.ErrorImageSize.Rubys,
      },
      supportedLanguages: o,
      obstacleImages: {
        image: module420.ObstacleImagesMap.Default,
        source: module420.ObstacleImageSourceMap.Default,
        bigImage: module420.ObstacleBigImages.Default,
        topBigImage: module420.ObstacleTopBigImages.Default,
      },
    },
    Sapphire: {
      supplies: module417.SuppliesMap.Default,
      guideLanguage: {
        supported: module418.GuidePageSupportMap.Default,
        translated: module418.GuidePageHasTranslateLanguageMap.Default,
      },
      bucket: '',
      errorImages: {
        map: module419.ErrorImageMap.Default,
        size: module419.ErrorImageSize.Default,
      },
      supportedLanguages: o,
      obstacleImages: {
        image: module420.ObstacleImagesMap.Default,
        source: module420.ObstacleImageSourceMap.Default,
        bigImage: module420.ObstacleBigImages.Default,
        topBigImage: module420.ObstacleTopBigImages.Default,
      },
    },
    SapphireC: {
      supplies: module417.SuppliesMap.Default,
      guideLanguage: {
        supported: module418.GuidePageSupportMap.Default,
        translated: module418.GuidePageHasTranslateLanguageMap.Default,
      },
      bucket: '',
      errorImages: {
        map: module419.ErrorImageMap.Default,
        size: module419.ErrorImageSize.Default,
      },
      supportedLanguages: o,
      obstacleImages: {
        image: module420.ObstacleImagesMap.Default,
        source: module420.ObstacleImageSourceMap.Default,
        bigImage: module420.ObstacleBigImages.Default,
        topBigImage: module420.ObstacleTopBigImages.Default,
      },
    },
    Tanos_CN: {
      supplies: module417.SuppliesMap.Tanos_CN,
      guideLanguage: {
        supported: module418.GuidePageSupportMap.Tanos,
        translated: module418.GuidePageHasTranslateLanguageMap.Tanos,
      },
      bucket: 'tanos',
      errorImages: {
        map: module419.ErrorImageMap.Tanos_CN,
        size: module419.ErrorImageSize.Default,
      },
      supportedLanguages: c,
      obstacleImages: {
        image: module420.ObstacleImagesMap.Default,
        source: module420.ObstacleImageSourceMap.Default,
        bigImage: module420.ObstacleBigImages.Default,
        topBigImage: module420.ObstacleTopBigImages.Default,
      },
    },
    Tanos_CE: {
      supplies: module417.SuppliesMap.Tanos_CE,
      guideLanguage: {
        supported: module418.GuidePageSupportMap.Tanos,
        translated: module418.GuidePageHasTranslateLanguageMap.Tanos,
      },
      bucket: 'tanos',
      errorImages: {
        map: module419.ErrorImageMap.Tanos_CE,
        size: module419.ErrorImageSize.Default,
      },
      supportedLanguages: c,
      obstacleImages: {
        image: module420.ObstacleImagesMap.Default,
        source: module420.ObstacleImageSourceMap.Default,
        bigImage: module420.ObstacleBigImages.Default,
        topBigImage: module420.ObstacleTopBigImages.Default,
      },
    },
    RubyPlus: {
      supplies: module417.SuppliesMap.RubyPlus,
      guideLanguage: {
        supported: module418.GuidePageSupportMap.RubyPlus,
        translated: module418.GuidePageHasTranslateLanguageMap.RubyPlus,
      },
      bucket: 'rubyplus',
      errorImages: {
        map: module419.ErrorImageMap.RubyPlus,
        size: module419.ErrorImageSize.Default,
      },
      supportedLanguages: b,
      obstacleImages: {
        image: module420.ObstacleImagesMap.Default,
        source: module420.ObstacleImageSourceMap.Default,
        bigImage: module420.ObstacleBigImages.Default,
        topBigImage: module420.ObstacleTopBigImages.Default,
      },
    },
    RubysLite: {
      supplies: module417.SuppliesMap.RubysLite,
      guideLanguage: {
        supported: module418.GuidePageSupportMap.RubysLite,
        translated: module418.GuidePageHasTranslateLanguageMap.RubysLite,
      },
      bucket: 'rubyslite',
      errorImages: {
        map: module419.ErrorImageMap.RubysLite,
        size: module419.ErrorImageSize.RubysLite,
      },
      supportedLanguages: b,
      obstacleImages: {
        image: module420.ObstacleImagesMap.Default,
        source: module420.ObstacleImageSourceMap.Default,
        bigImage: module420.ObstacleBigImages.Default,
        topBigImage: module420.ObstacleTopBigImages.Default,
      },
    },
    RubySC: {
      supplies: module417.SuppliesMap.RubySC,
      guideLanguage: {
        supported: module418.GuidePageSupportMap.RubySC,
        translated: module418.GuidePageHasTranslateLanguageMap.RubySC,
      },
      bucket: 'rubysc1',
      errorImages: {
        map: module419.ErrorImageMap.RubySC,
        size: module419.ErrorImageSize.Default,
      },
      supportedLanguages: b,
      obstacleImages: {
        image: module420.ObstacleImagesMap.Default,
        source: module420.ObstacleImageSourceMap.Default,
        bigImage: module420.ObstacleBigImages.Default,
        topBigImage: module420.ObstacleTopBigImages.Default,
      },
    },
    TanosE: {
      supplies: module417.SuppliesMap.TanosE,
      guideLanguage: {
        supported: module418.GuidePageSupportMap.TanosE,
        translated: module418.GuidePageHasTranslateLanguageMap.TanosE,
      },
      bucket: 'tanose',
      errorImages: {
        map: module419.ErrorImageMap.TanosE,
        size: module419.ErrorImageSize.Default,
      },
      supportedLanguages: I,
      obstacleImages: {
        image: module420.ObstacleImagesMap.Default,
        source: module420.ObstacleImageSourceMap.Default,
        bigImage: module420.ObstacleBigImages.Default,
        topBigImage: module420.ObstacleTopBigImages.Default,
      },
    },
    SapphireLite: {
      supplies: module417.SuppliesMap.Default,
      guideLanguage: {
        supported: module418.GuidePageSupportMap.Default,
        translated: module418.GuidePageHasTranslateLanguageMap.Default,
      },
      bucket: '',
      errorImages: {
        map: module419.ErrorImageMap.Default,
        size: module419.ErrorImageSize.Default,
      },
      supportedLanguages: o,
      obstacleImages: {
        image: module420.ObstacleImagesMap.Default,
        source: module420.ObstacleImageSourceMap.Default,
        bigImage: module420.ObstacleBigImages.Default,
        topBigImage: module420.ObstacleTopBigImages.Default,
      },
    },
    TanosV_CN: {
      supplies: module417.SuppliesMap.TanosV_CN,
      guideLanguage: {
        supported: module418.GuidePageSupportMap.TanosV,
        translated: module418.GuidePageHasTranslateLanguageMap.TanosV,
      },
      bucket: 'tanosv',
      errorImages: {
        map: module419.ErrorImageMap.TanosV_CN,
        size: module419.ErrorImageSize.Default,
      },
      supportedLanguages: c,
      obstacleImages: {
        image: module420.ObstacleImagesMap.Default,
        source: module420.ObstacleImageSourceMap.Default,
        bigImage: module420.ObstacleBigImages.Default,
        topBigImage: module420.ObstacleTopBigImages.Default,
      },
    },
    TanosV_CE: {
      supplies: module417.SuppliesMap.TanosV_CE,
      guideLanguage: {
        supported: module418.GuidePageSupportMap.TanosV,
        translated: module418.GuidePageHasTranslateLanguageMap.TanosV,
      },
      bucket: 'tanosv',
      errorImages: {
        map: module419.ErrorImageMap.TanosV_CE,
        size: module419.ErrorImageSize.Default,
      },
      supportedLanguages: c,
      obstacleImages: {
        image: module420.ObstacleImagesMap.TanosV_CE,
        source: module420.ObstacleImageSourceMap.TanosV_CE,
        bigImage: module420.ObstacleBigImages.Default,
        topBigImage: module420.ObstacleTopBigImages.TanosV_CE,
      },
    },
    RubysE: {
      supplies: module417.SuppliesMap.RubysE,
      guideLanguage: {
        supported: module418.GuidePageSupportMap.RubysE,
        translated: module418.GuidePageHasTranslateLanguageMap.RubysE,
      },
      bucket: 'rubyse',
      errorImages: {
        map: module419.ErrorImageMap.RubysE,
        size: module419.ErrorImageSize.Default,
      },
      supportedLanguages: b,
      obstacleImages: {
        image: module420.ObstacleImagesMap.Default,
        source: module420.ObstacleImageSourceMap.Default,
        bigImage: module420.ObstacleBigImages.Default,
        topBigImage: module420.ObstacleTopBigImages.Default,
      },
    },
    TanosS: {
      supplies: module417.SuppliesMap.TanosS,
      guideLanguage: {
        supported: module418.GuidePageSupportMap.TanosS,
        translated: module418.GuidePageHasTranslateLanguageMap.TanosS,
      },
      bucket: 'tanoss',
      errorImages: {
        map: module419.ErrorImageMap.TanosS,
        size: module419.ErrorImageSize.Default,
      },
      supportedLanguages: o,
      obstacleImages: {
        image: module420.ObstacleImagesMap.Default,
        source: module420.ObstacleImageSourceMap.Default,
        bigImage: module420.ObstacleBigImages.Default,
        topBigImage: module420.ObstacleTopBigImages.Default,
      },
    },
    Garnet: {
      supplies: module417.SuppliesMap.Garnet,
      guideLanguage: {
        supported: module418.GuidePageSupportMap.Default,
        translated: module418.GuidePageHasTranslateLanguageMap.Default,
      },
      bucket: 'garnet',
      errorImages: {
        map: module419.ErrorImageMap.Garnet,
        size: module419.ErrorImageSize.Default,
      },
      supportedLanguages: o,
      obstacleImages: {
        image: module420.ObstacleImagesMap.Default,
        source: module420.ObstacleImageSourceMap.Default,
        bigImage: module420.ObstacleBigImages.Default,
        topBigImage: module420.ObstacleTopBigImages.Default,
      },
    },
    TanosSPlus: {
      supplies: module417.SuppliesMap.TanosSPlus,
      guideLanguage: {
        supported: module418.GuidePageSupportMap.TanosSPlus,
        translated: module418.GuidePageHasTranslateLanguageMap.TanosSPlus,
      },
      bucket: 'tanossplus',
      errorImages: {
        map: module419.ErrorImageMap.TanosSPlus,
        size: module419.ErrorImageSize.Default,
      },
      supportedLanguages: n,
      obstacleImages: {
        image: module420.ObstacleImagesMap.Default,
        source: module420.ObstacleImageSourceMap.Default,
        bigImage: module420.ObstacleBigImages.Default,
        topBigImage: module420.ObstacleTopBigImages.Default,
      },
    },
    TopazSV: {
      supplies: module417.SuppliesMap.Default,
      guideLanguage: {
        supported: module418.GuidePageSupportMap.Default,
        translated: module418.GuidePageHasTranslateLanguageMap.Default,
      },
      bucket: 'topazsv',
      errorImages: {
        map: module419.ErrorImageMap.TopazS,
        size: module419.ErrorImageSize.Default,
      },
      supportedLanguages: o,
      obstacleImages: {
        image: module420.ObstacleImagesMap.Default,
        source: module420.ObstacleImageSourceMap.Default,
        bigImage: module420.ObstacleBigImages.Default,
        topBigImage: module420.ObstacleTopBigImages.Default,
      },
    },
    Coral: {
      supplies: module417.SuppliesMap.Default,
      guideLanguage: {
        supported: module418.GuidePageSupportMap.Default,
        translated: module418.GuidePageHasTranslateLanguageMap.Default,
      },
      bucket: 'coral',
      errorImages: {
        map: module419.ErrorImageMap.Default,
        size: module419.ErrorImageSize.Default,
      },
      supportedLanguages: o,
      obstacleImages: {
        image: module420.ObstacleImagesMap.Default,
        source: module420.ObstacleImageSourceMap.Default,
        bigImage: module420.ObstacleBigImages.Default,
        topBigImage: module420.ObstacleTopBigImages.Default,
      },
    },
    TopazS: {
      supplies: module417.SuppliesMap.TopazS,
      guideLanguage: {
        supported: module418.GuidePageSupportMap.Default,
        translated: module418.GuidePageHasTranslateLanguageMap.Default,
      },
      bucket: 'topazs',
      errorImages: {
        map: module419.ErrorImageMap.TopazS,
        size: module419.ErrorImageSize.Default,
      },
      supportedLanguages: n,
      obstacleImages: {
        image: module420.ObstacleImagesMap.Default,
        source: module420.ObstacleImageSourceMap.Default,
        bigImage: module420.ObstacleBigImages.Default,
        topBigImage: module420.ObstacleTopBigImages.Default,
      },
    },
    TanosSV: {
      supplies: module417.SuppliesMap.TanosS,
      guideLanguage: {
        supported: module418.GuidePageSupportMap.TanosS,
        translated: module418.GuidePageHasTranslateLanguageMap.TanosS,
      },
      bucket: 'tanossv',
      errorImages: {
        map: module419.ErrorImageMap.TanosS,
        size: module419.ErrorImageSize.Default,
      },
      supportedLanguages: o,
      obstacleImages: {
        image: module420.ObstacleImagesMap.Default,
        source: module420.ObstacleImageSourceMap.Default,
        bigImage: module420.ObstacleBigImages.Default,
        topBigImage: module420.ObstacleTopBigImages.Default,
      },
    },
  };

exports.ResourceMap = f;
