var module424 = require('./424'),
  module425 = require('./425'),
  module426 = require('./426'),
  module427 = require('./427'),
  module461 = require('./461'),
  o = module461.defaultV1SupportedLangs,
  I = module461.tanoseV1Langs,
  c = module461.allWithoutHeLangs,
  b = module461.allLangs,
  n = module461.cnWithEnV1Langs,
  f = {
    Ruby: {
      supplies: module424.SuppliesMap.Default,
      guideLanguage: {
        supported: module425.GuidePageSupportMap.Default,
        translated: module425.GuidePageHasTranslateLanguageMap.Default,
      },
      bucket: '',
      errorImages: {
        map: module426.ErrorImageMap.Default,
        size: module426.ErrorImageSize.Default,
      },
      supportedLanguages: o,
      obstacleImages: {
        image: module427.ObstacleImagesMap.Default,
        source: module427.ObstacleImageSourceMap.Default,
        bigImage: module427.ObstacleBigImages.Default,
        topBigImage: module427.ObstacleTopBigImages.Default,
      },
    },
    Ruby2: {
      supplies: module424.SuppliesMap.Default,
      guideLanguage: {
        supported: module425.GuidePageSupportMap.Default,
        translated: module425.GuidePageHasTranslateLanguageMap.Default,
      },
      bucket: 'ruby2',
      errorImages: {
        map: module426.ErrorImageMap.Default,
        size: module426.ErrorImageSize.Default,
      },
      supportedLanguages: o,
      obstacleImages: {
        image: module427.ObstacleImagesMap.Default,
        source: module427.ObstacleImageSourceMap.Default,
        bigImage: module427.ObstacleBigImages.Default,
        topBigImage: module427.ObstacleTopBigImages.Default,
      },
    },
    Rubys: {
      supplies: module424.SuppliesMap.Rubys,
      guideLanguage: {
        supported: module425.GuidePageSupportMap.Rubys,
        translated: module425.GuidePageHasTranslateLanguageMap.Rubys,
      },
      bucket: 'rubys',
      errorImages: {
        map: module426.ErrorImageMap.Rubys,
        size: module426.ErrorImageSize.Rubys,
      },
      supportedLanguages: o,
      obstacleImages: {
        image: module427.ObstacleImagesMap.Default,
        source: module427.ObstacleImageSourceMap.Default,
        bigImage: module427.ObstacleBigImages.Default,
        topBigImage: module427.ObstacleTopBigImages.Default,
      },
    },
    Sapphire: {
      supplies: module424.SuppliesMap.Default,
      guideLanguage: {
        supported: module425.GuidePageSupportMap.Default,
        translated: module425.GuidePageHasTranslateLanguageMap.Default,
      },
      bucket: '',
      errorImages: {
        map: module426.ErrorImageMap.Default,
        size: module426.ErrorImageSize.Default,
      },
      supportedLanguages: o,
      obstacleImages: {
        image: module427.ObstacleImagesMap.Default,
        source: module427.ObstacleImageSourceMap.Default,
        bigImage: module427.ObstacleBigImages.Default,
        topBigImage: module427.ObstacleTopBigImages.Default,
      },
    },
    SapphireC: {
      supplies: module424.SuppliesMap.Default,
      guideLanguage: {
        supported: module425.GuidePageSupportMap.Default,
        translated: module425.GuidePageHasTranslateLanguageMap.Default,
      },
      bucket: '',
      errorImages: {
        map: module426.ErrorImageMap.Default,
        size: module426.ErrorImageSize.Default,
      },
      supportedLanguages: o,
      obstacleImages: {
        image: module427.ObstacleImagesMap.Default,
        source: module427.ObstacleImageSourceMap.Default,
        bigImage: module427.ObstacleBigImages.Default,
        topBigImage: module427.ObstacleTopBigImages.Default,
      },
    },
    Tanos_CN: {
      supplies: module424.SuppliesMap.Tanos_CN,
      guideLanguage: {
        supported: module425.GuidePageSupportMap.Tanos,
        translated: module425.GuidePageHasTranslateLanguageMap.Tanos,
      },
      bucket: 'tanos',
      errorImages: {
        map: module426.ErrorImageMap.Tanos_CN,
        size: module426.ErrorImageSize.Default,
      },
      supportedLanguages: b,
      obstacleImages: {
        image: module427.ObstacleImagesMap.Default,
        source: module427.ObstacleImageSourceMap.Default,
        bigImage: module427.ObstacleBigImages.Default,
        topBigImage: module427.ObstacleTopBigImages.Default,
      },
    },
    Tanos_CE: {
      supplies: module424.SuppliesMap.Tanos_CE,
      guideLanguage: {
        supported: module425.GuidePageSupportMap.Tanos,
        translated: module425.GuidePageHasTranslateLanguageMap.Tanos,
      },
      bucket: 'tanos',
      errorImages: {
        map: module426.ErrorImageMap.Tanos_CE,
        size: module426.ErrorImageSize.Default,
      },
      supportedLanguages: b,
      obstacleImages: {
        image: module427.ObstacleImagesMap.Default,
        source: module427.ObstacleImageSourceMap.Default,
        bigImage: module427.ObstacleBigImages.Default,
        topBigImage: module427.ObstacleTopBigImages.Default,
      },
    },
    RubyPlus: {
      supplies: module424.SuppliesMap.RubyPlus,
      guideLanguage: {
        supported: module425.GuidePageSupportMap.RubyPlus,
        translated: module425.GuidePageHasTranslateLanguageMap.RubyPlus,
      },
      bucket: 'rubyplus',
      errorImages: {
        map: module426.ErrorImageMap.RubyPlus,
        size: module426.ErrorImageSize.Default,
      },
      supportedLanguages: c,
      obstacleImages: {
        image: module427.ObstacleImagesMap.Default,
        source: module427.ObstacleImageSourceMap.Default,
        bigImage: module427.ObstacleBigImages.Default,
        topBigImage: module427.ObstacleTopBigImages.Default,
      },
    },
    RubysLite: {
      supplies: module424.SuppliesMap.RubysLite,
      guideLanguage: {
        supported: module425.GuidePageSupportMap.RubysLite,
        translated: module425.GuidePageHasTranslateLanguageMap.RubysLite,
      },
      bucket: 'rubyslite',
      errorImages: {
        map: module426.ErrorImageMap.RubysLite,
        size: module426.ErrorImageSize.RubysLite,
      },
      supportedLanguages: c,
      obstacleImages: {
        image: module427.ObstacleImagesMap.Default,
        source: module427.ObstacleImageSourceMap.Default,
        bigImage: module427.ObstacleBigImages.Default,
        topBigImage: module427.ObstacleTopBigImages.Default,
      },
    },
    RubySC: {
      supplies: module424.SuppliesMap.RubySC,
      guideLanguage: {
        supported: module425.GuidePageSupportMap.RubySC,
        translated: module425.GuidePageHasTranslateLanguageMap.RubySC,
      },
      bucket: 'rubysc1',
      errorImages: {
        map: module426.ErrorImageMap.RubySC,
        size: module426.ErrorImageSize.Default,
      },
      supportedLanguages: c,
      obstacleImages: {
        image: module427.ObstacleImagesMap.Default,
        source: module427.ObstacleImageSourceMap.Default,
        bigImage: module427.ObstacleBigImages.Default,
        topBigImage: module427.ObstacleTopBigImages.Default,
      },
    },
    TanosE: {
      supplies: module424.SuppliesMap.TanosE,
      guideLanguage: {
        supported: module425.GuidePageSupportMap.TanosE,
        translated: module425.GuidePageHasTranslateLanguageMap.TanosE,
      },
      bucket: 'tanose',
      errorImages: {
        map: module426.ErrorImageMap.TanosE,
        size: module426.ErrorImageSize.Default,
      },
      supportedLanguages: I,
      obstacleImages: {
        image: module427.ObstacleImagesMap.Default,
        source: module427.ObstacleImageSourceMap.Default,
        bigImage: module427.ObstacleBigImages.Default,
        topBigImage: module427.ObstacleTopBigImages.Default,
      },
    },
    SapphireLite: {
      supplies: module424.SuppliesMap.Default,
      guideLanguage: {
        supported: module425.GuidePageSupportMap.Default,
        translated: module425.GuidePageHasTranslateLanguageMap.Default,
      },
      bucket: '',
      errorImages: {
        map: module426.ErrorImageMap.Default,
        size: module426.ErrorImageSize.Default,
      },
      supportedLanguages: o,
      obstacleImages: {
        image: module427.ObstacleImagesMap.Default,
        source: module427.ObstacleImageSourceMap.Default,
        bigImage: module427.ObstacleBigImages.Default,
        topBigImage: module427.ObstacleTopBigImages.Default,
      },
    },
    TanosV_CN: {
      supplies: module424.SuppliesMap.TanosV_CN,
      guideLanguage: {
        supported: module425.GuidePageSupportMap.TanosV,
        translated: module425.GuidePageHasTranslateLanguageMap.TanosV,
      },
      bucket: 'tanosv',
      errorImages: {
        map: module426.ErrorImageMap.TanosV_CN,
        size: module426.ErrorImageSize.Default,
      },
      supportedLanguages: b,
      obstacleImages: {
        image: module427.ObstacleImagesMap.Default,
        source: module427.ObstacleImageSourceMap.Default,
        bigImage: module427.ObstacleBigImages.Default,
        topBigImage: module427.ObstacleTopBigImages.Default,
      },
    },
    TanosV_CE: {
      supplies: module424.SuppliesMap.TanosV_CE,
      guideLanguage: {
        supported: module425.GuidePageSupportMap.TanosV,
        translated: module425.GuidePageHasTranslateLanguageMap.TanosV,
      },
      bucket: 'tanosv',
      errorImages: {
        map: module426.ErrorImageMap.TanosV_CE,
        size: module426.ErrorImageSize.Default,
      },
      supportedLanguages: b,
      obstacleImages: {
        image: module427.ObstacleImagesMap.TanosV_CE,
        source: module427.ObstacleImageSourceMap.TanosV_CE,
        bigImage: module427.ObstacleBigImages.Default,
        topBigImage: module427.ObstacleTopBigImages.TanosV_CE,
      },
    },
    RubysE: {
      supplies: module424.SuppliesMap.RubysE,
      guideLanguage: {
        supported: module425.GuidePageSupportMap.RubysE,
        translated: module425.GuidePageHasTranslateLanguageMap.RubysE,
      },
      bucket: 'rubyse',
      errorImages: {
        map: module426.ErrorImageMap.RubysE,
        size: module426.ErrorImageSize.Default,
      },
      supportedLanguages: c,
      obstacleImages: {
        image: module427.ObstacleImagesMap.Default,
        source: module427.ObstacleImageSourceMap.Default,
        bigImage: module427.ObstacleBigImages.Default,
        topBigImage: module427.ObstacleTopBigImages.Default,
      },
    },
    TanosS: {
      supplies: module424.SuppliesMap.TanosS,
      guideLanguage: {
        supported: module425.GuidePageSupportMap.TanosS,
        translated: module425.GuidePageHasTranslateLanguageMap.TanosS,
      },
      bucket: 'tanoss',
      errorImages: {
        map: module426.ErrorImageMap.TanosS,
        size: module426.ErrorImageSize.Default,
      },
      supportedLanguages: o,
      obstacleImages: {
        image: module427.ObstacleImagesMap.Default,
        source: module427.ObstacleImageSourceMap.Default,
        bigImage: module427.ObstacleBigImages.Default,
        topBigImage: module427.ObstacleTopBigImages.Default,
      },
    },
    Garnet: {
      supplies: module424.SuppliesMap.Garnet,
      guideLanguage: {
        supported: module425.GuidePageSupportMap.Default,
        translated: module425.GuidePageHasTranslateLanguageMap.Default,
      },
      bucket: 'garnet',
      errorImages: {
        map: module426.ErrorImageMap.Garnet,
        size: module426.ErrorImageSize.Default,
      },
      supportedLanguages: o,
      obstacleImages: {
        image: module427.ObstacleImagesMap.Default,
        source: module427.ObstacleImageSourceMap.Default,
        bigImage: module427.ObstacleBigImages.Default,
        topBigImage: module427.ObstacleTopBigImages.Default,
      },
    },
    TanosSPlus: {
      supplies: module424.SuppliesMap.TanosSPlus,
      guideLanguage: {
        supported: module425.GuidePageSupportMap.TanosSPlus,
        translated: module425.GuidePageHasTranslateLanguageMap.TanosSPlus,
      },
      bucket: 'tanossplus',
      errorImages: {
        map: module426.ErrorImageMap.TopazS,
        size: module426.ErrorImageSize.Default,
      },
      supportedLanguages: n,
      obstacleImages: {
        image: module427.ObstacleImagesMap.Default,
        source: module427.ObstacleImageSourceMap.Default,
        bigImage: module427.ObstacleBigImages.Default,
        topBigImage: module427.ObstacleTopBigImages.Default,
      },
    },
    TopazSV: {
      supplies: module424.SuppliesMap.TopazSV,
      guideLanguage: {
        supported: module425.GuidePageSupportMap.Default,
        translated: module425.GuidePageHasTranslateLanguageMap.Default,
      },
      bucket: 'topazsv',
      errorImages: {
        map: module426.ErrorImageMap.TopazSV,
        size: module426.ErrorImageSize.Default,
      },
      supportedLanguages: b,
      obstacleImages: {
        image: module427.ObstacleImagesMap.Default,
        source: module427.ObstacleImageSourceMap.Default,
        bigImage: module427.ObstacleBigImages.Default,
        topBigImage: module427.ObstacleTopBigImages.Default,
      },
    },
    TopazSPlus: {
      supplies: module424.SuppliesMap.TopazSV,
      guideLanguage: {
        supported: module425.GuidePageSupportMap.Default,
        translated: module425.GuidePageHasTranslateLanguageMap.Default,
      },
      bucket: 'topazsplus',
      errorImages: {
        map: module426.ErrorImageMap.TopazSV,
        size: module426.ErrorImageSize.Default,
      },
      supportedLanguages: n,
      obstacleImages: {
        image: module427.ObstacleImagesMap.Default,
        source: module427.ObstacleImageSourceMap.Default,
        bigImage: module427.ObstacleBigImages.Default,
        topBigImage: module427.ObstacleTopBigImages.Default,
      },
    },
    Coral: {
      supplies: module424.SuppliesMap.Default,
      guideLanguage: {
        supported: module425.GuidePageSupportMap.Default,
        translated: module425.GuidePageHasTranslateLanguageMap.Default,
      },
      bucket: 'coral',
      errorImages: {
        map: module426.ErrorImageMap.Default,
        size: module426.ErrorImageSize.Default,
      },
      supportedLanguages: o,
      obstacleImages: {
        image: module427.ObstacleImagesMap.Default,
        source: module427.ObstacleImageSourceMap.Default,
        bigImage: module427.ObstacleBigImages.Default,
        topBigImage: module427.ObstacleTopBigImages.Default,
      },
    },
    TopazS: {
      supplies: module424.SuppliesMap.TopazS,
      guideLanguage: {
        supported: module425.GuidePageSupportMap.Default,
        translated: module425.GuidePageHasTranslateLanguageMap.Default,
      },
      bucket: 'topazs',
      errorImages: {
        map: module426.ErrorImageMap.TopazS,
        size: module426.ErrorImageSize.Default,
      },
      supportedLanguages: n,
      obstacleImages: {
        image: module427.ObstacleImagesMap.Default,
        source: module427.ObstacleImageSourceMap.Default,
        bigImage: module427.ObstacleBigImages.Default,
        topBigImage: module427.ObstacleTopBigImages.Default,
      },
    },
    TopazS_CE: {
      supplies: module424.SuppliesMap.TopazS,
      guideLanguage: {
        supported: module425.GuidePageSupportMap.Default,
        translated: module425.GuidePageHasTranslateLanguageMap.Default,
      },
      bucket: 'topazs',
      errorImages: {
        map: module426.ErrorImageMap.TopazS,
        size: module426.ErrorImageSize.Default,
      },
      supportedLanguages: b,
      obstacleImages: {
        image: module427.ObstacleImagesMap.Default,
        source: module427.ObstacleImageSourceMap.Default,
        bigImage: module427.ObstacleBigImages.Default,
        topBigImage: module427.ObstacleTopBigImages.Default,
      },
    },
    TanosSV: {
      supplies: module424.SuppliesMap.TanosS,
      guideLanguage: {
        supported: module425.GuidePageSupportMap.TanosS,
        translated: module425.GuidePageHasTranslateLanguageMap.TanosS,
      },
      bucket: 'tanossv',
      errorImages: {
        map: module426.ErrorImageMap.TanosS,
        size: module426.ErrorImageSize.Default,
      },
      supportedLanguages: o,
      obstacleImages: {
        image: module427.ObstacleImagesMap.Default,
        source: module427.ObstacleImageSourceMap.Default,
        bigImage: module427.ObstacleBigImages.Default,
        topBigImage: module427.ObstacleTopBigImages.Default,
      },
    },
    TanosSMax: {
      supplies: module424.SuppliesMap.TanosSMax,
      guideLanguage: {
        supported: module425.GuidePageSupportMap.TanosSPlus,
        translated: module425.GuidePageHasTranslateLanguageMap.TanosSPlus,
      },
      bucket: 'tanossmax',
      errorImages: {
        map: module426.ErrorImageMap.TanosSPlus,
        size: module426.ErrorImageSize.Default,
      },
      supportedLanguages: n,
      obstacleImages: {
        image: module427.ObstacleImagesMap.Default,
        source: module427.ObstacleImageSourceMap.Default,
        bigImage: module427.ObstacleBigImages.Default,
        topBigImage: module427.ObstacleTopBigImages.Default,
      },
    },
    TanosSL: {
      supplies: module424.SuppliesMap.TanosSLite,
      guideLanguage: {
        supported: module425.GuidePageSupportMap.TanosS,
        translated: module425.GuidePageHasTranslateLanguageMap.TanosS,
      },
      bucket: 'tanosslite',
      errorImages: {
        map: module426.ErrorImageMap.TanosSLite,
        size: module426.ErrorImageSize.Default,
      },
      supportedLanguages: o,
      obstacleImages: {
        image: module427.ObstacleImagesMap.Default,
        source: module427.ObstacleImageSourceMap.Default,
        bigImage: module427.ObstacleBigImages.Default,
        topBigImage: module427.ObstacleTopBigImages.Default,
      },
    },
    TanosSC: {
      supplies: module424.SuppliesMap.TanosSC,
      guideLanguage: {
        supported: module425.GuidePageSupportMap.TanosS,
        translated: module425.GuidePageHasTranslateLanguageMap.TanosS,
      },
      bucket: 'tanossc',
      errorImages: {
        map: module426.ErrorImageMap.TanosSC,
        size: module426.ErrorImageSize.Default,
      },
      supportedLanguages: o,
      obstacleImages: {
        image: module427.ObstacleImagesMap.Default,
        source: module427.ObstacleImageSourceMap.Default,
        bigImage: module427.ObstacleBigImages.Default,
        topBigImage: module427.ObstacleTopBigImages.Default,
      },
    },
    TanosSE: {
      supplies: module424.SuppliesMap.TanosSE,
      guideLanguage: {
        supported: module425.GuidePageSupportMap.TanosS,
        translated: module425.GuidePageHasTranslateLanguageMap.TanosS,
      },
      bucket: 'tanosse',
      errorImages: {
        map: module426.ErrorImageMap.TanosSE,
        size: module426.ErrorImageSize.Default,
      },
      supportedLanguages: o,
      obstacleImages: {
        image: module427.ObstacleImagesMap.Default,
        source: module427.ObstacleImageSourceMap.Default,
        bigImage: module427.ObstacleBigImages.Default,
        topBigImage: module427.ObstacleTopBigImages.Default,
      },
    },
    TopazSPower: {
      supplies: module424.SuppliesMap.TopazS,
      guideLanguage: {
        supported: module425.GuidePageSupportMap.Default,
        translated: module425.GuidePageHasTranslateLanguageMap.Default,
      },
      bucket: 'topazspower',
      errorImages: {
        map: module426.ErrorImageMap.TopazS,
        size: module426.ErrorImageSize.Default,
      },
      supportedLanguages: b,
      obstacleImages: {
        image: module427.ObstacleImagesMap.Default,
        source: module427.ObstacleImageSourceMap.Default,
        bigImage: module427.ObstacleBigImages.Default,
        topBigImage: module427.ObstacleTopBigImages.Default,
      },
    },
  };

exports.ResourceMap = f;
