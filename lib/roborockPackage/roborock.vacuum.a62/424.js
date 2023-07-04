var module425 = require('./425'),
  module426 = require('./426'),
  module427 = require('./427'),
  module428 = require('./428'),
  module466 = require('./466'),
  o = module466.defaultV1SupportedLangs,
  I = module466.tanoseV1Langs,
  c = module466.allWithoutHeLangs,
  b = module466.allLangs,
  n = module466.cnWithEnV1Langs,
  f = {
    Ruby: {
      supplies: module425.SuppliesMap.Default,
      guideLanguage: {
        supported: module426.GuidePageSupportMap.Default,
        translated: module426.GuidePageHasTranslateLanguageMap.Default,
      },
      bucket: '',
      errorImages: {
        map: module427.ErrorImageMap.Default,
        size: module427.ErrorImageSize.Default,
      },
      supportedLanguages: o,
      obstacleImages: {
        image: module428.ObstacleImagesMap.Default,
        source: module428.ObstacleImageSourceMap.Default,
        bigImage: module428.ObstacleBigImages.Default,
        topBigImage: module428.ObstacleTopBigImages.Default,
      },
    },
    Ruby2: {
      supplies: module425.SuppliesMap.Default,
      guideLanguage: {
        supported: module426.GuidePageSupportMap.Default,
        translated: module426.GuidePageHasTranslateLanguageMap.Default,
      },
      bucket: 'ruby2',
      errorImages: {
        map: module427.ErrorImageMap.Default,
        size: module427.ErrorImageSize.Default,
      },
      supportedLanguages: o,
      obstacleImages: {
        image: module428.ObstacleImagesMap.Default,
        source: module428.ObstacleImageSourceMap.Default,
        bigImage: module428.ObstacleBigImages.Default,
        topBigImage: module428.ObstacleTopBigImages.Default,
      },
    },
    Rubys: {
      supplies: module425.SuppliesMap.Rubys,
      guideLanguage: {
        supported: module426.GuidePageSupportMap.Rubys,
        translated: module426.GuidePageHasTranslateLanguageMap.Rubys,
      },
      bucket: 'rubys',
      errorImages: {
        map: module427.ErrorImageMap.Rubys,
        size: module427.ErrorImageSize.Rubys,
      },
      supportedLanguages: o,
      obstacleImages: {
        image: module428.ObstacleImagesMap.Default,
        source: module428.ObstacleImageSourceMap.Default,
        bigImage: module428.ObstacleBigImages.Default,
        topBigImage: module428.ObstacleTopBigImages.Default,
      },
    },
    Sapphire: {
      supplies: module425.SuppliesMap.Default,
      guideLanguage: {
        supported: module426.GuidePageSupportMap.Default,
        translated: module426.GuidePageHasTranslateLanguageMap.Default,
      },
      bucket: '',
      errorImages: {
        map: module427.ErrorImageMap.Default,
        size: module427.ErrorImageSize.Default,
      },
      supportedLanguages: o,
      obstacleImages: {
        image: module428.ObstacleImagesMap.Default,
        source: module428.ObstacleImageSourceMap.Default,
        bigImage: module428.ObstacleBigImages.Default,
        topBigImage: module428.ObstacleTopBigImages.Default,
      },
    },
    SapphireC: {
      supplies: module425.SuppliesMap.Default,
      guideLanguage: {
        supported: module426.GuidePageSupportMap.Default,
        translated: module426.GuidePageHasTranslateLanguageMap.Default,
      },
      bucket: '',
      errorImages: {
        map: module427.ErrorImageMap.Default,
        size: module427.ErrorImageSize.Default,
      },
      supportedLanguages: o,
      obstacleImages: {
        image: module428.ObstacleImagesMap.Default,
        source: module428.ObstacleImageSourceMap.Default,
        bigImage: module428.ObstacleBigImages.Default,
        topBigImage: module428.ObstacleTopBigImages.Default,
      },
    },
    Tanos_CN: {
      supplies: module425.SuppliesMap.Tanos_CN,
      guideLanguage: {
        supported: module426.GuidePageSupportMap.Tanos,
        translated: module426.GuidePageHasTranslateLanguageMap.Tanos,
      },
      bucket: 'tanos',
      errorImages: {
        map: module427.ErrorImageMap.Tanos_CN,
        size: module427.ErrorImageSize.Default,
      },
      supportedLanguages: b,
      obstacleImages: {
        image: module428.ObstacleImagesMap.Default,
        source: module428.ObstacleImageSourceMap.Default,
        bigImage: module428.ObstacleBigImages.Default,
        topBigImage: module428.ObstacleTopBigImages.Default,
      },
    },
    Tanos_CE: {
      supplies: module425.SuppliesMap.Tanos_CE,
      guideLanguage: {
        supported: module426.GuidePageSupportMap.Tanos,
        translated: module426.GuidePageHasTranslateLanguageMap.Tanos,
      },
      bucket: 'tanos',
      errorImages: {
        map: module427.ErrorImageMap.Tanos_CE,
        size: module427.ErrorImageSize.Default,
      },
      supportedLanguages: b,
      obstacleImages: {
        image: module428.ObstacleImagesMap.Default,
        source: module428.ObstacleImageSourceMap.Default,
        bigImage: module428.ObstacleBigImages.Default,
        topBigImage: module428.ObstacleTopBigImages.Default,
      },
    },
    RubyPlus: {
      supplies: module425.SuppliesMap.RubyPlus,
      guideLanguage: {
        supported: module426.GuidePageSupportMap.RubyPlus,
        translated: module426.GuidePageHasTranslateLanguageMap.RubyPlus,
      },
      bucket: 'rubyplus',
      errorImages: {
        map: module427.ErrorImageMap.RubyPlus,
        size: module427.ErrorImageSize.Default,
      },
      supportedLanguages: c,
      obstacleImages: {
        image: module428.ObstacleImagesMap.Default,
        source: module428.ObstacleImageSourceMap.Default,
        bigImage: module428.ObstacleBigImages.Default,
        topBigImage: module428.ObstacleTopBigImages.Default,
      },
    },
    RubysLite: {
      supplies: module425.SuppliesMap.RubysLite,
      guideLanguage: {
        supported: module426.GuidePageSupportMap.RubysLite,
        translated: module426.GuidePageHasTranslateLanguageMap.RubysLite,
      },
      bucket: 'rubyslite',
      errorImages: {
        map: module427.ErrorImageMap.RubysLite,
        size: module427.ErrorImageSize.RubysLite,
      },
      supportedLanguages: c,
      obstacleImages: {
        image: module428.ObstacleImagesMap.Default,
        source: module428.ObstacleImageSourceMap.Default,
        bigImage: module428.ObstacleBigImages.Default,
        topBigImage: module428.ObstacleTopBigImages.Default,
      },
    },
    RubySC: {
      supplies: module425.SuppliesMap.RubySC,
      guideLanguage: {
        supported: module426.GuidePageSupportMap.RubySC,
        translated: module426.GuidePageHasTranslateLanguageMap.RubySC,
      },
      bucket: 'rubysc1',
      errorImages: {
        map: module427.ErrorImageMap.RubySC,
        size: module427.ErrorImageSize.Default,
      },
      supportedLanguages: c,
      obstacleImages: {
        image: module428.ObstacleImagesMap.Default,
        source: module428.ObstacleImageSourceMap.Default,
        bigImage: module428.ObstacleBigImages.Default,
        topBigImage: module428.ObstacleTopBigImages.Default,
      },
    },
    TanosE: {
      supplies: module425.SuppliesMap.TanosE,
      guideLanguage: {
        supported: module426.GuidePageSupportMap.TanosE,
        translated: module426.GuidePageHasTranslateLanguageMap.TanosE,
      },
      bucket: 'tanose',
      errorImages: {
        map: module427.ErrorImageMap.TanosE,
        size: module427.ErrorImageSize.Default,
      },
      supportedLanguages: I,
      obstacleImages: {
        image: module428.ObstacleImagesMap.Default,
        source: module428.ObstacleImageSourceMap.Default,
        bigImage: module428.ObstacleBigImages.Default,
        topBigImage: module428.ObstacleTopBigImages.Default,
      },
    },
    SapphireLite: {
      supplies: module425.SuppliesMap.Default,
      guideLanguage: {
        supported: module426.GuidePageSupportMap.Default,
        translated: module426.GuidePageHasTranslateLanguageMap.Default,
      },
      bucket: '',
      errorImages: {
        map: module427.ErrorImageMap.Default,
        size: module427.ErrorImageSize.Default,
      },
      supportedLanguages: o,
      obstacleImages: {
        image: module428.ObstacleImagesMap.Default,
        source: module428.ObstacleImageSourceMap.Default,
        bigImage: module428.ObstacleBigImages.Default,
        topBigImage: module428.ObstacleTopBigImages.Default,
      },
    },
    TanosV_CN: {
      supplies: module425.SuppliesMap.TanosV_CN,
      guideLanguage: {
        supported: module426.GuidePageSupportMap.TanosV,
        translated: module426.GuidePageHasTranslateLanguageMap.TanosV,
      },
      bucket: 'tanosv',
      errorImages: {
        map: module427.ErrorImageMap.TanosV_CN,
        size: module427.ErrorImageSize.Default,
      },
      supportedLanguages: b,
      obstacleImages: {
        image: module428.ObstacleImagesMap.Default,
        source: module428.ObstacleImageSourceMap.Default,
        bigImage: module428.ObstacleBigImages.Default,
        topBigImage: module428.ObstacleTopBigImages.Default,
      },
    },
    TanosV_CE: {
      supplies: module425.SuppliesMap.TanosV_CE,
      guideLanguage: {
        supported: module426.GuidePageSupportMap.TanosV,
        translated: module426.GuidePageHasTranslateLanguageMap.TanosV,
      },
      bucket: 'tanosv',
      errorImages: {
        map: module427.ErrorImageMap.TanosV_CE,
        size: module427.ErrorImageSize.Default,
      },
      supportedLanguages: b,
      obstacleImages: {
        image: module428.ObstacleImagesMap.TanosV_CE,
        source: module428.ObstacleImageSourceMap.TanosV_CE,
        bigImage: module428.ObstacleBigImages.Default,
        topBigImage: module428.ObstacleTopBigImages.TanosV_CE,
      },
    },
    RubysE: {
      supplies: module425.SuppliesMap.RubysE,
      guideLanguage: {
        supported: module426.GuidePageSupportMap.RubysE,
        translated: module426.GuidePageHasTranslateLanguageMap.RubysE,
      },
      bucket: 'rubyse',
      errorImages: {
        map: module427.ErrorImageMap.RubysE,
        size: module427.ErrorImageSize.Default,
      },
      supportedLanguages: c,
      obstacleImages: {
        image: module428.ObstacleImagesMap.Default,
        source: module428.ObstacleImageSourceMap.Default,
        bigImage: module428.ObstacleBigImages.Default,
        topBigImage: module428.ObstacleTopBigImages.Default,
      },
    },
    TanosS: {
      supplies: module425.SuppliesMap.TanosS,
      guideLanguage: {
        supported: module426.GuidePageSupportMap.TanosS,
        translated: module426.GuidePageHasTranslateLanguageMap.TanosS,
      },
      bucket: 'tanoss',
      errorImages: {
        map: module427.ErrorImageMap.TanosS,
        size: module427.ErrorImageSize.Default,
      },
      supportedLanguages: o,
      obstacleImages: {
        image: module428.ObstacleImagesMap.Default,
        source: module428.ObstacleImageSourceMap.Default,
        bigImage: module428.ObstacleBigImages.Default,
        topBigImage: module428.ObstacleTopBigImages.Default,
      },
    },
    Garnet: {
      supplies: module425.SuppliesMap.Garnet,
      guideLanguage: {
        supported: module426.GuidePageSupportMap.Default,
        translated: module426.GuidePageHasTranslateLanguageMap.Default,
      },
      bucket: 'garnet',
      errorImages: {
        map: module427.ErrorImageMap.Garnet,
        size: module427.ErrorImageSize.Default,
      },
      supportedLanguages: o,
      obstacleImages: {
        image: module428.ObstacleImagesMap.Default,
        source: module428.ObstacleImageSourceMap.Default,
        bigImage: module428.ObstacleBigImages.Default,
        topBigImage: module428.ObstacleTopBigImages.Default,
      },
    },
    TanosSPlus: {
      supplies: module425.SuppliesMap.TanosSPlus,
      guideLanguage: {
        supported: module426.GuidePageSupportMap.TanosSPlus,
        translated: module426.GuidePageHasTranslateLanguageMap.TanosSPlus,
      },
      bucket: 'tanossplus',
      errorImages: {
        map: module427.ErrorImageMap.TopazS,
        size: module427.ErrorImageSize.Default,
      },
      supportedLanguages: n,
      obstacleImages: {
        image: module428.ObstacleImagesMap.Default,
        source: module428.ObstacleImageSourceMap.Default,
        bigImage: module428.ObstacleBigImages.Default,
        topBigImage: module428.ObstacleTopBigImages.Default,
      },
    },
    TopazSV: {
      supplies: module425.SuppliesMap.TopazSV,
      guideLanguage: {
        supported: module426.GuidePageSupportMap.Default,
        translated: module426.GuidePageHasTranslateLanguageMap.Default,
      },
      bucket: 'topazsv',
      errorImages: {
        map: module427.ErrorImageMap.TopazSV,
        size: module427.ErrorImageSize.Default,
      },
      supportedLanguages: b,
      obstacleImages: {
        image: module428.ObstacleImagesMap.Default,
        source: module428.ObstacleImageSourceMap.Default,
        bigImage: module428.ObstacleBigImages.Default,
        topBigImage: module428.ObstacleTopBigImages.Default,
      },
    },
    TopazSPlus: {
      supplies: module425.SuppliesMap.TopazSV,
      guideLanguage: {
        supported: module426.GuidePageSupportMap.Default,
        translated: module426.GuidePageHasTranslateLanguageMap.Default,
      },
      bucket: 'topazsplus',
      errorImages: {
        map: module427.ErrorImageMap.TopazSV,
        size: module427.ErrorImageSize.Default,
      },
      supportedLanguages: n,
      obstacleImages: {
        image: module428.ObstacleImagesMap.Default,
        source: module428.ObstacleImageSourceMap.Default,
        bigImage: module428.ObstacleBigImages.Default,
        topBigImage: module428.ObstacleTopBigImages.Default,
      },
    },
    Coral: {
      supplies: module425.SuppliesMap.Default,
      guideLanguage: {
        supported: module426.GuidePageSupportMap.Default,
        translated: module426.GuidePageHasTranslateLanguageMap.Default,
      },
      bucket: 'coral',
      errorImages: {
        map: module427.ErrorImageMap.Default,
        size: module427.ErrorImageSize.Default,
      },
      supportedLanguages: o,
      obstacleImages: {
        image: module428.ObstacleImagesMap.Default,
        source: module428.ObstacleImageSourceMap.Default,
        bigImage: module428.ObstacleBigImages.Default,
        topBigImage: module428.ObstacleTopBigImages.Default,
      },
    },
    TopazS: {
      supplies: module425.SuppliesMap.TopazS,
      guideLanguage: {
        supported: module426.GuidePageSupportMap.Default,
        translated: module426.GuidePageHasTranslateLanguageMap.Default,
      },
      bucket: 'topazs',
      errorImages: {
        map: module427.ErrorImageMap.TopazS,
        size: module427.ErrorImageSize.Default,
      },
      supportedLanguages: n,
      obstacleImages: {
        image: module428.ObstacleImagesMap.Default,
        source: module428.ObstacleImageSourceMap.Default,
        bigImage: module428.ObstacleBigImages.Default,
        topBigImage: module428.ObstacleTopBigImages.Default,
      },
    },
    TopazS_CE: {
      supplies: module425.SuppliesMap.TopazS,
      guideLanguage: {
        supported: module426.GuidePageSupportMap.Default,
        translated: module426.GuidePageHasTranslateLanguageMap.Default,
      },
      bucket: 'topazs',
      errorImages: {
        map: module427.ErrorImageMap.TopazS,
        size: module427.ErrorImageSize.Default,
      },
      supportedLanguages: b,
      obstacleImages: {
        image: module428.ObstacleImagesMap.Default,
        source: module428.ObstacleImageSourceMap.Default,
        bigImage: module428.ObstacleBigImages.Default,
        topBigImage: module428.ObstacleTopBigImages.Default,
      },
    },
    TanosSV: {
      supplies: module425.SuppliesMap.TanosS,
      guideLanguage: {
        supported: module426.GuidePageSupportMap.TanosS,
        translated: module426.GuidePageHasTranslateLanguageMap.TanosS,
      },
      bucket: 'tanossv',
      errorImages: {
        map: module427.ErrorImageMap.TanosS,
        size: module427.ErrorImageSize.Default,
      },
      supportedLanguages: o,
      obstacleImages: {
        image: module428.ObstacleImagesMap.Default,
        source: module428.ObstacleImageSourceMap.Default,
        bigImage: module428.ObstacleBigImages.Default,
        topBigImage: module428.ObstacleTopBigImages.Default,
      },
    },
    TanosSMax: {
      supplies: module425.SuppliesMap.TanosSMax,
      guideLanguage: {
        supported: module426.GuidePageSupportMap.TanosSPlus,
        translated: module426.GuidePageHasTranslateLanguageMap.TanosSPlus,
      },
      bucket: 'tanossmax',
      errorImages: {
        map: module427.ErrorImageMap.TanosSPlus,
        size: module427.ErrorImageSize.Default,
      },
      supportedLanguages: n,
      obstacleImages: {
        image: module428.ObstacleImagesMap.Default,
        source: module428.ObstacleImageSourceMap.Default,
        bigImage: module428.ObstacleBigImages.Default,
        topBigImage: module428.ObstacleTopBigImages.Default,
      },
    },
    TanosSL: {
      supplies: module425.SuppliesMap.TanosSLite,
      guideLanguage: {
        supported: module426.GuidePageSupportMap.TanosS,
        translated: module426.GuidePageHasTranslateLanguageMap.TanosS,
      },
      bucket: 'tanosslite',
      errorImages: {
        map: module427.ErrorImageMap.TanosSLite,
        size: module427.ErrorImageSize.Default,
      },
      supportedLanguages: o,
      obstacleImages: {
        image: module428.ObstacleImagesMap.Default,
        source: module428.ObstacleImageSourceMap.Default,
        bigImage: module428.ObstacleBigImages.Default,
        topBigImage: module428.ObstacleTopBigImages.Default,
      },
    },
    TanosSC: {
      supplies: module425.SuppliesMap.TanosSC,
      guideLanguage: {
        supported: module426.GuidePageSupportMap.TanosS,
        translated: module426.GuidePageHasTranslateLanguageMap.TanosS,
      },
      bucket: 'tanossc',
      errorImages: {
        map: module427.ErrorImageMap.TanosSC,
        size: module427.ErrorImageSize.Default,
      },
      supportedLanguages: o,
      obstacleImages: {
        image: module428.ObstacleImagesMap.Default,
        source: module428.ObstacleImageSourceMap.Default,
        bigImage: module428.ObstacleBigImages.Default,
        topBigImage: module428.ObstacleTopBigImages.Default,
      },
    },
    TanosSE: {
      supplies: module425.SuppliesMap.TanosSE,
      guideLanguage: {
        supported: module426.GuidePageSupportMap.TanosS,
        translated: module426.GuidePageHasTranslateLanguageMap.TanosS,
      },
      bucket: 'tanosse',
      errorImages: {
        map: module427.ErrorImageMap.TanosSE,
        size: module427.ErrorImageSize.Default,
      },
      supportedLanguages: o,
      obstacleImages: {
        image: module428.ObstacleImagesMap.Default,
        source: module428.ObstacleImageSourceMap.Default,
        bigImage: module428.ObstacleBigImages.Default,
        topBigImage: module428.ObstacleTopBigImages.Default,
      },
    },
    TopazSPower: {
      supplies: module425.SuppliesMap.TopazS,
      guideLanguage: {
        supported: module426.GuidePageSupportMap.Default,
        translated: module426.GuidePageHasTranslateLanguageMap.Default,
      },
      bucket: 'topazspower',
      errorImages: {
        map: module427.ErrorImageMap.TopazS,
        size: module427.ErrorImageSize.Default,
      },
      supportedLanguages: b,
      obstacleImages: {
        image: module428.ObstacleImagesMap.Default,
        source: module428.ObstacleImageSourceMap.Default,
        bigImage: module428.ObstacleBigImages.Default,
        topBigImage: module428.ObstacleTopBigImages.Default,
      },
    },
    TopazSC: {
      supplies: module425.SuppliesMap.TopazSV,
      guideLanguage: {
        supported: module426.GuidePageSupportMap.Default,
        translated: module426.GuidePageHasTranslateLanguageMap.Default,
      },
      bucket: 'topazsc',
      errorImages: {
        map: module427.ErrorImageMap.TopazSV,
        size: module427.ErrorImageSize.Default,
      },
      supportedLanguages: n,
      obstacleImages: {
        image: module428.ObstacleImagesMap.Default,
        source: module428.ObstacleImageSourceMap.Default,
        bigImage: module428.ObstacleBigImages.Default,
        topBigImage: module428.ObstacleTopBigImages.Default,
      },
    },
  };

exports.ResourceMap = f;
