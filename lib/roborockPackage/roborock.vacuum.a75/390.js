require('./13');

var module6 = require('./6'),
  module391 = require('./391'),
  module1490 = require('./1490'),
  module424 = require('./424'),
  module393 = require('./393'),
  module411 = require('./411'),
  c = (function () {
    function t() {
      module6.default(this, t);
    }

    module7.default(t, null, [
      {
        key: 'isMapSegmentSupported',
        value: function () {
          return module424.DMM.currentProduct != module424.Products.RubyPlus ? module424.DMM.currentProduct != module424.Products.RubySC : t.isSupportFeature(116);
        },
      },
      {
        key: 'isMapCarpetAddSupport',
        value: function () {
          return undefined !== t.robotNewFeatures && !isNaN(t.robotNewFeatures) && !!(1073741824 & t.robotNewFeatures);
        },
      },
      {
        key: 'isAnalysisSupported',
        value: function () {
          return t.isSupportFeature(124);
        },
      },
      {
        key: 'isSoftCleanModeSupported',
        value: function () {
          return module424.DMM.currentSeries == module424.DeviceSeries.t6 || module424.DMM.currentSeries == module424.DeviceSeries.p5;
        },
      },
      {
        key: 'shouldShowSoftCleanMode',
        value: function () {
          return ![module424.Products.RubyPlus, module424.Products.TanosV_CE].hasElement(module424.DMM.currentProduct);
        },
      },
      {
        key: 'isSoftCleanModeSupportedInMain',
        value: function () {
          return module424.DMM.isTanosV || module424.DMM.isTanosE || module424.DMM.isTanos || module424.DMM.isRubySC || module424.DMM.isRubysLite || module424.DMM.isRubysE;
        },
      },
      {
        key: 'isCustomModeSupported',
        value: function () {
          return ![
            module424.Products.Ruby,
            module424.Products.Ruby2,
            module424.Products.Rubys,
            module424.Products.Sapphire,
            module424.Products.SapphireC,
            module424.Products.SapphireLite,
            module424.Products.Tanos_CE,
            module424.Products.Tanos_CN,
            module424.Products.RubyPlus,
            module424.Products.RubySC,
            module424.Products.RubysE,
          ].hasElement(module424.DMM.currentProduct);
        },
      },
      {
        key: 'isElectronicWaterBoxSupported',
        value: function () {
          var t = [module424.Products.RubysLite, module424.Products.TanosV_CN, module424.Products.TanosV_CE, module424.Products.TanosE, module424.Products.TanosSL],
            o = module424.DMM.isUltronLite;
          return t.hasElement(module424.DMM.currentProduct) || o;
        },
      },
      {
        key: 'isShakeMopStrengthSupported',
        value: function () {
          return (
            module424.DMM.currentProduct == module424.Products.TanosS ||
            module424.DMM.currentProduct == module424.Products.TanosSPlus ||
            module424.DMM.isGarnet ||
            module424.DMM.isTopazSV ||
            module424.DMM.isPearlPlus ||
            module424.DMM.isCoral ||
            module424.DMM.isTopazS ||
            module424.DMM.isTopazSPlus ||
            module424.DMM.isTopazSC ||
            module424.DMM.isTopazSV ||
            module424.DMM.isPearlPlus ||
            module424.DMM.isTanosSMax ||
            module424.DMM.isUltron ||
            module424.DMM.isUltronSPlus ||
            module424.DMM.isUltronSMop ||
            module424.DMM.isUltronSV ||
            module424.DMM.isPearl
          );
        },
      },
      {
        key: 'isSupportWaterMode',
        value: function () {
          return this.isElectronicWaterBoxSupported() || this.isShakeMopStrengthSupported();
        },
      },
      {
        key: 'isAutoCleanWiperSupported',
        value: function () {
          return module424.DMM.currentProduct == module424.Products.Garnet;
        },
      },
      {
        key: 'isMultiFloorSupported',
        value: function () {
          return t.isSupportFeature(120);
        },
      },
      {
        key: 'isFindMeSupported',
        value: function () {
          return (
            !![
              module424.Products.Rubys,
              module424.Products.RubySC,
              module424.Products.RubysE,
              module424.Products.RubyPlus,
              module424.Products.Tanos_CN,
              module424.Products.Tanos_CE,
            ].hasElement(module424.DMM.currentProduct) || !t.isFCCOrCE()
          );
        },
      },
      {
        key: 'isCustomModeIconSupported',
        value: function () {
          return !t.isFCCOrCE() && t.isCustomModeSupported();
        },
      },
      {
        key: 'isOrderCleanSupported',
        value: function () {
          return t.isSupportFeature(123) && t.isModelOrderSupported();
        },
      },
      {
        key: 'isAvoidCarpetSupported',
        value: function () {
          return true;
        },
      },
      {
        key: 'isSelfAdaptionCarpetSupported',
        value: function () {
          var o = !t.isFCCOrCE(),
            u = (module424.DMM.isTanosS || module424.DMM.isTanosSPlus || module424.DMM.isTopazS || module424.DMM.isTanosSPlus || module424.DMM.isTopazSPower) && t.isFCCOrCE(),
            n = module424.DMM.isTopazSV && t.isCE();
          return o || u || n;
        },
      },
      {
        key: 'shouldShowCarpetSettingView',
        value: function () {
          var o = module424.DMM.isTanosSL && t.isFCC();
          return t.isCarpetSupported() && !o;
        },
      },
      {
        key: 'isSupportCustomCarpet',
        value: function () {
          return !![module424.Products.UltronLite].hasElement(module424.DMM.currentProduct);
        },
      },
      {
        key: 'isCameraSupported',
        value: function () {
          return [module424.Products.TanosV_CN, module424.Products.TanosV_CE, module424.Products.TopazSV_CN, module424.Products.TopazSV_CE, module424.Products.TanosSV].hasElement(
            module424.DMM.currentProduct
          );
        },
      },
      {
        key: 'isStructuredLightSupported',
        value: function () {
          return [module424.Products.TanosSPlus, module424.Products.TanosSMax, module424.Products.TopazSPlus, module424.Products.Ultron, module424.Products.UltronSPlus].hasElement(
            module424.DMM.currentProduct
          );
        },
      },
      {
        key: 'isShowGeneralObstacle',
        value: function () {
          return [module424.Products.TanosSPlus].hasElement(module424.DMM.currentProduct);
        },
      },
      {
        key: 'isSingleLineLaserProduct',
        value: function () {
          return module424.DMM.isTopazSC || module424.DMM.isPearl;
        },
      },
      {
        key: 'isObstaclesSupport',
        value: function () {
          return t.isCameraSupported() || t.isStructuredLightSupported() || t.isSingleLineLaserProduct();
        },
      },
      {
        key: 'isWaterBoxSupported',
        value: function () {
          return [module424.Products.Tanos_CE, module424.Products.Tanos_CN].hasElement(module424.DMM.currentProduct);
        },
      },
      {
        key: 'isRemoteSupported',
        value: function () {
          return t.isSupportFeature(125);
        },
      },
      {
        key: 'isShowProductGuideVideo',
        value: function () {
          return (
            !![module424.Products.RubyPlus, module424.Products.Tanos_CN, module424.Products.Tanos_CE, module424.Products.TanosE].hasElement(module424.DMM.currentProduct) &&
            'cn' == module391.default.getAppLanguage()
          );
        },
      },
      {
        key: 'isObaAccount',
        value: function () {
          return (
            module1490.ObaInfoString.ObaModels.indexOf(module393.deviceModel) > -1 ||
            module1490.ObaInfoString.MiJaObaAccounts.indexOf(module393.userId) > -1 ||
            module1490.ObaInfoString.ZiYouObaAccounts.indexOf(module393.userId) > -1
          );
        },
      },
      {
        key: 'isUseOldTitleInGuide',
        value: function () {
          return module424.DMM.isTanos || module424.DMM.isRubys || module424.DMM.isRubyPlus || module424.DMM.isRubysLite || module424.DMM.isRubySC;
        },
      },
      {
        key: 'isShowCleanFinishReasonSupported',
        value: function () {
          return undefined !== t.robotNewFeatures && !isNaN(t.robotNewFeatures) && !!(1 & t.robotNewFeatures);
        },
      },
      {
        key: 'isMopForbiddenSupported',
        value: function () {
          return (
            !!(module424.DMM.isTanosV || module424.DMM.isTanos || module424.DMM.isTopazSV || module424.DMM.isPearlPlus) ||
            !![
              module424.Products.TanosE,
              module424.Products.TanosSL,
              module424.Products.TanosS,
              module424.Products.TanosSPlus,
              module424.Products.TanosSMax,
              module424.Products.Ultron,
              module424.Products.UltronLite,
              module424.Products.Pearl,
              module424.Products.RubysLite,
            ].hasElement(module424.DMM.currentProduct)
          );
        },
      },
      {
        key: 'isReSegmentSupported',
        value: function () {
          return undefined !== t.robotNewFeatures && !isNaN(t.robotNewFeatures) && !!(4 & t.robotNewFeatures);
        },
      },
      {
        key: 'isVideoMonitorSupported',
        value: function () {
          return undefined !== t.robotNewFeatures && !isNaN(t.robotNewFeatures) && !!(8 & t.robotNewFeatures);
        },
      },
      {
        key: 'isVideoMonitorModelSupported',
        value: function () {
          return module424.DMM.isTanosV || module424.DMM.isTopazSV || module424.DMM.isPearlPlus || module424.DMM.isCoral;
        },
      },
      {
        key: 'isVideoLiveCallSupported',
        value: function () {
          return module424.DMM.isTopazSV || module424.DMM.isPearlPlus || module424.DMM.isCoral;
        },
      },
      {
        key: 'isAnyStateTransitGotoSupported',
        value: function () {
          return undefined !== t.robotNewFeatures && !isNaN(t.robotNewFeatures) && !!(16 & t.robotNewFeatures);
        },
      },
      {
        key: 'isFwFilterObstacleSupported',
        value: function () {
          return undefined !== t.robotNewFeatures && !isNaN(t.robotNewFeatures) && !!(32 & t.robotNewFeatures);
        },
      },
      {
        key: 'isVideoSettingSupported',
        value: function () {
          return undefined !== t.robotNewFeatures && !isNaN(t.robotNewFeatures) && !!(64 & t.robotNewFeatures);
        },
      },
      {
        key: 'isIgnoreUnknownMapObjectSupported',
        value: function () {
          return undefined !== t.robotNewFeatures && !isNaN(t.robotNewFeatures) && !!(128 & t.robotNewFeatures);
        },
      },
      {
        key: 'isSetChildSupported',
        value: function () {
          return undefined !== t.robotNewFeatures && !isNaN(t.robotNewFeatures) && !!(256 & t.robotNewFeatures);
        },
      },
      {
        key: 'isCarpetSupported',
        value: function () {
          return undefined !== t.robotNewFeatures && !isNaN(t.robotNewFeatures) && !!(512 & t.robotNewFeatures);
        },
      },
      {
        key: 'isMopPathSupported',
        value: function () {
          return undefined !== t.robotNewFeatures && !isNaN(t.robotNewFeatures) && !!(2048 & t.robotNewFeatures);
        },
      },
      {
        key: 'isMultiMapSegmentTimerSupported',
        value: function () {
          return !!(t.robotFeatures && 4096 & t.robotNewFeatures);
        },
      },
      {
        key: 'isCustomWaterBoxDistanceSupported',
        value: function () {
          return !!(t.robotNewFeatures && 2147483648 & t.robotNewFeatures);
        },
      },
      {
        key: 'isWashThenChargeCmdSupported',
        value: function () {
          return !!(t.robotNewFeatures && ((t.robotNewFeatures / 2 ** 32) >> 5) & 1);
        },
      },
      {
        key: 'isRoomNameSupported',
        value: function () {
          return undefined !== t.robotNewFeatures && !isNaN(t.robotNewFeatures) && !!(16384 & t.robotNewFeatures);
        },
      },
      {
        key: 'isCurrentMapRestoreEnabled',
        value: function () {
          return undefined !== t.robotNewFeatures && !isNaN(t.robotNewFeatures) && !!(8192 & t.robotNewFeatures);
        },
      },
      {
        key: 'isPhotoUploadSupported',
        value: function () {
          return undefined !== t.robotNewFeatures && !isNaN(t.robotNewFeatures) && !!(65536 & t.robotNewFeatures);
        },
      },
      {
        key: 'isShakeMopSetSupported',
        value: function () {
          return undefined !== t.robotNewFeatures && !isNaN(t.robotNewFeatures) && !!(262144 & t.robotNewFeatures);
        },
      },
      {
        key: 'isMapBeautifyInternalDebugSupported',
        value: function () {
          return undefined !== t.robotNewFeatures && !isNaN(t.robotNewFeatures) && !!(2097152 & t.robotNewFeatures);
        },
      },
      {
        key: 'isNewDataForCleanHistory',
        value: function () {
          return undefined !== t.robotNewFeatures && !isNaN(t.robotNewFeatures) && !!(4194304 & t.robotNewFeatures);
        },
      },
      {
        key: 'isNewDataForCleanHistoryDetail',
        value: function () {
          return undefined !== t.robotNewFeatures && !isNaN(t.robotNewFeatures) && !!(8388608 & t.robotNewFeatures);
        },
      },
      {
        key: 'isFlowLedSettingSupported',
        value: function () {
          return undefined !== t.robotNewFeatures && !isNaN(t.robotNewFeatures) && !!(16777216 & t.robotNewFeatures);
        },
      },
      {
        key: 'isDustCollectionSettingSupported',
        value: function () {
          return undefined !== t.robotNewFeatures && !isNaN(t.robotNewFeatures) && !!(33554432 & t.robotNewFeatures);
        },
      },
      {
        key: 'isRPCRetrySupported',
        value: function () {
          return undefined !== t.robotNewFeatures && !isNaN(t.robotNewFeatures) && !!(67108864 & t.robotNewFeatures);
        },
      },
      {
        key: 'isAvoidCollisionSupported',
        value: function () {
          return undefined !== t.robotNewFeatures && !isNaN(t.robotNewFeatures) && !!(134217728 & t.robotNewFeatures);
        },
      },
      {
        key: 'isSupportSetSwitchMapMode',
        value: function () {
          return undefined !== t.robotNewFeatures && !isNaN(t.robotNewFeatures) && !!(268435456 & t.robotNewFeatures);
        },
      },
      {
        key: 'isSupportSmartScene',
        value: function () {
          return undefined !== t.robotNewFeatures && !isNaN(t.robotNewFeatures) && !!((t.robotNewFeatures / 2 ** 32) & 2);
        },
      },
      {
        key: 'isSupportFloorEdit',
        value: function () {
          return undefined !== t.robotNewFeatures && !isNaN(t.robotNewFeatures) && !!((t.robotNewFeatures / 2 ** 32) & 8);
        },
      },
      {
        key: 'isSupportFurniture',
        value: function () {
          return undefined !== t.robotNewFeatures && !isNaN(t.robotNewFeatures) && !!(((t.robotNewFeatures / 2 ** 32) >> 4) & 1);
        },
      },
      {
        key: 'isSupportRoomTag',
        value: function () {
          return undefined !== t.robotNewFeatures && !isNaN(t.robotNewFeatures) && !!(((t.robotNewFeatures / 2 ** 32) >> 6) & 1);
        },
      },
      {
        key: 'isSupportQuickMapBuilder',
        value: function () {
          return undefined !== t.robotNewFeatures && !isNaN(t.robotNewFeatures) && !!(((t.robotNewFeatures / 2 ** 32) >> 7) & 1);
        },
      },
      {
        key: 'isSupportSmartGlobalCleanWithCustomMode',
        value: function () {
          return undefined !== t.robotNewFeatures && !isNaN(t.robotNewFeatures) && !!(((t.robotNewFeatures / 2 ** 32) >> 8) & 1);
        },
      },
      {
        key: 'isNewFuncSupported',
        value: function () {
          return true;
        },
      },
      {
        key: 'isExplorationFuncSupported',
        value: function () {
          return (
            -1 !=
            ['rr5b7ed488f03d70', '1147621019'].findIndex(function (t) {
              return module393.userId == t;
            })
          );
        },
      },
      {
        key: 'isDebuggableV1User',
        value: function () {
          return (
            -1 !=
            [
              'rr5a96285530fd50',
              '6339240',
              '2216005876',
              'rr5ab8d94812fc60',
              'rr5b3612de943c70',
              '77051706',
              'rr5cc0ccc796d830',
              'rr5ea760244fd820',
              'rr5b7b4fc7ac7cc0',
              'rr5acfd6be5f7d70',
              'rr5e1764a1351820',
              'rr5e312e2a2fd830',
              'rr5ab65412abbcc0',
              'rr5ca9f70e281850',
              'rr5cbfcfae0c1830',
              'rr5f5191d1dc1850',
              '1037999105',
              'rr607ebc1d195870',
              'rr61c986f1731840',
            ].findIndex(function (t) {
              return module393.userId == t;
            })
          );
        },
      },
      {
        key: 'isMapBeautifyDebugUser',
        value: function () {
          return (
            -1 !=
            ['6339240', '77051706', '1118810097', '1018544143', '2171840851', '2417716791'].findIndex(function (t) {
              return module393.userId == t;
            })
          );
        },
      },
      {
        key: 'isRecordAllowed',
        value: function () {
          return !(undefined === t.robotNewFeatures || isNaN(t.robotNewFeatures)) && 1024 & t.robotNewFeatures;
        },
      },
      {
        key: 'isSharedAllowed',
        value: function () {
          return (
            (module393.isMiApp || module393.apiLevel >= 10009) &&
            -1 !=
              ['rr5cc0ccc796d830'].findIndex(function (t) {
                return module393.userId == t;
              })
          );
        },
      },
      {
        key: 'isIn3DMapBlackList',
        value: function () {
          return (
            -1 !=
            [
              'rr5ad2c38b2cfd70',
              'rr5ad19630197d70',
              'rr5ba216fca8bd50',
              'rr5ad1b4e678bd70',
              'rr5ba471f46afd50',
              'rr5ada72f4627d70',
              'rr5b9f895919bd50',
              'rr5ad19ed1b17d70',
              'rr5ad1961ff1bd50',
              'rr5ad197f8057d70',
              'rr5ba1a5e76d7d70',
              'rr5ad2e863083d50',
              'rr5ada7535167d70',
              'rr5c7fcac2dcd820',
              'rr5c806ece0bd820',
              'rr5ba1bea81efd50',
              'rr5ada7535da7d70',
            ].findIndex(function (t) {
              return module393.userId == t;
            })
          );
        },
      },
      {
        key: 'isInARMapWhiteList',
        value: function () {
          return (
            -1 !=
            ['rr5a039daad2cb90', 'rr5e1764a1351820', 'rr5cbfcfae0c1830', 'rr5a96285530fd50', 'rr5d49868e1c5830'].findIndex(function (t) {
              return module393.userId == t;
            })
          );
        },
      },
      {
        key: 'isActivityCN0919Supported',
        value: function () {
          return [module424.Products.Tanos_CN, module424.Products.TanosV_CN, module424.Products.TanosE].hasElement(module424.DMM.currentProduct) && !module393.isMiApp;
        },
      },
      {
        key: 'isCarpetPressurizeSwitchUseNewPara',
        value: function () {
          return [module424.Products.RubySC, module424.Products.RubysE, module424.Products.RubysLite].hasElement(module424.DMM.currentProduct);
        },
      },
      {
        key: 'shouldHideCarpetPressurize',
        value: function () {
          return module424.DMM.currentProduct == module424.Products.RubyPlus;
        },
      },
      {
        key: 'shouldHideMop',
        value: function () {
          return module424.DMM.currentProduct == module424.Products.RubyPlus;
        },
      },
      {
        key: 'shouldShowGuidePage',
        value: function () {
          var t = module424.DMM.supportedGuideLanguages;
          if (t.indexOf('*') > -1) return true;
          var o = module391.default.getAppLanguage();
          return -1 != t.indexOf(o);
        },
      },
      {
        key: 'shouldUpdateMenuDataByRobotLocation',
        value: function () {
          return module424.DMM.currentProduct == module424.Products.Rubys && 'tw' == t.deviceLocation;
        },
      },
      {
        key: 'shouldShowUseMoppingModuleGuide',
        value: function () {
          return [module424.Products.Tanos_CE, module424.Products.Tanos_CN, module424.Products.Rubys].hasElement(module424.DMM.currentProduct);
        },
      },
      {
        key: 'shouldShowOtherGuide',
        value: function () {
          return [module424.Products.TanosV_CE, module424.Products.TanosV_CN, module424.Products.TanosE].hasElement(module424.DMM.currentProduct) && t.shouldShowGuidePage();
        },
      },
      {
        key: 'shouldShowTroubleShootingGuide',
        value: function () {
          return ![module424.Products.TanosV_CE, module424.Products.TanosV_CN, module424.Products.TanosE].hasElement(module424.DMM.currentProduct) && t.shouldShowGuidePage();
        },
      },
      {
        key: 'isSupportForeCloseGuideVideo',
        value: function () {
          return module424.DMM.currentProduct == module424.Products.TanosE;
        },
      },
      {
        key: 'isSupportDisturbInVideoSetting',
        value: function () {
          return ![module424.Products.TanosV_CE, module424.Products.TopazSV_CE].hasElement(module424.DMM.currentProduct);
        },
      },
      {
        key: 'isSupportLedStatusSwitch',
        value: function () {
          return module424.Products.RubyPlus || t.isSupportFeature(119);
        },
      },
      {
        key: 'isLedSwitchVisible',
        value: function () {
          return module424.DMM.currentProduct != module424.Products.TanosS || t.isSupportFeature(119);
        },
      },
      {
        key: 'isNewCarpetPressurize',
        value: function () {
          return [module424.Products.RubySC, module424.Products.RubysE, module424.Products.RubysLite].hasElement(module424.DMM.currentProduct);
        },
      },
      {
        key: 'isPetModeSettingSupported',
        value: function () {
          return t.isCameraSupported() || t.isStructuredLightSupported();
        },
      },
      {
        key: 'isSupportFetchTimerSummary',
        value: function () {
          return module424.DMM.currentProduct != module424.Products.Tanos_CN && t.isSupportFeature(122);
        },
      },
      {
        key: 'isModelOrderSupported',
        value: function () {
          return (
            !![
              module424.Products.Rubys,
              module424.Products.TanosE,
              module424.Products.Tanos_CE,
              module424.Products.Tanos_CN,
              module424.Products.TanosV_CN,
              module424.Products.TanosV_CE,
              module424.Products.RubyPlus,
              module424.Products.RubySC,
              module424.Products.RubysLite,
            ].hasElement(module424.DMM.currentProduct) ||
            (!!t.deviceLocation && !t.isFCC())
          );
        },
      },
      {
        key: 'hasTranslateGuidePage',
        value: function (t) {
          var o = module424.DMM.translatedGuideLanguages;
          return o.indexOf('*') > -1 || -1 != o.indexOf(t);
        },
      },
      {
        key: 'isSupportFeature',
        value: function (o) {
          return (
            t.robotFeatures &&
            -1 !=
              t.robotFeatures.findIndex(function (t) {
                return t == o;
              })
          );
        },
      },
      {
        key: 'isOversea',
        value: function () {
          return 'cn' != t.deviceLocation;
        },
      },
      {
        key: 'isFCCOrCE',
        value: function () {
          return 'us' == t.deviceLocation || 'de' == t.deviceLocation;
        },
      },
      {
        key: 'isFCC',
        value: function () {
          return 'us' == t.deviceLocation;
        },
      },
      {
        key: 'isCE',
        value: function () {
          return 'de' == t.deviceLocation;
        },
      },
      {
        key: 'isShowPicUpload',
        value: function () {
          return module424.DMM.isV4 && !module393.isMiApp && (module424.DMM.isTanosV || module424.DMM.isTanosSPlus || module424.DMM.isTanosSMax);
        },
      },
      {
        key: 'isSupportMapRotate',
        value: function () {
          return true;
        },
      },
      {
        key: 'SupportOverflowTouch',
        value: function () {
          return !module393.isMiApp && !(module393.apiLevel < 10010);
        },
      },
      {
        key: 'is3DMapSupported',
        value: function () {
          return (
            (module424.DMM.isTanosSMax ||
              module424.DMM.isTopazSPlus ||
              module424.DMM.isTopazSC ||
              module424.DMM.isTopazSV ||
              module424.DMM.isPearlPlus ||
              module424.DMM.isTanosSC ||
              module424.DMM.isTanosSE ||
              module424.DMM.isTanosSL ||
              module424.DMM.isTopazS ||
              module424.DMM.isTopazSPower ||
              module424.DMM.isCoral ||
              module424.DMM.isUltron ||
              module424.DMM.isUltronSPlus ||
              module424.DMM.isUltronSMop ||
              module424.DMM.isPearl ||
              module424.DMM.isUltronE ||
              module424.DMM.isUltronLite ||
              module424.DMM.isTanosS ||
              module424.DMM.isTanosSPlus ||
              module424.DMM.isRubysLite) &&
            module393.isSupport3DMap()
          );
        },
      },
      {
        key: 'isArMapSupported',
        value: function () {
          return (
            (module424.DMM.isTanosSMax ||
              module424.DMM.isTopazSPlus ||
              module424.DMM.isTopazSC ||
              module424.DMM.isTopazSV ||
              module424.DMM.isPearlPlus ||
              module424.DMM.isTanosSC ||
              module424.DMM.isTanosSE ||
              module424.DMM.isTanosSL ||
              module424.DMM.isTopazS ||
              module424.DMM.isTopazSPower ||
              module424.DMM.isCoral ||
              module424.DMM.isUltron ||
              module424.DMM.isUltronSPlus ||
              module424.DMM.isUltronSMop ||
              module424.DMM.isPearl ||
              module424.DMM.isUltronE ||
              module424.DMM.isUltronLite) &&
            module393.isSupport3DMap() &&
            module393.isSupportLidar()
          );
        },
      },
      {
        key: 'isPureCleanMopSupported',
        value: function () {
          return (
            module424.DMM.isTopazS ||
            module424.DMM.isTopazSV ||
            module424.DMM.isPearlPlus ||
            module424.DMM.isTopazSPlus ||
            module424.DMM.isTopazSC ||
            module424.DMM.isTanosSMax ||
            module424.DMM.isTanosS ||
            module424.DMM.isTanosSPlus ||
            module424.DMM.isTopazSPower ||
            module424.DMM.isCoral ||
            module424.DMM.isUltron ||
            module424.DMM.isUltronSPlus ||
            module424.DMM.isUltronSMop ||
            module424.DMM.isUltronSV ||
            module424.DMM.isPearl
          );
        },
      },
      {
        key: 'isCarefulSlowMopSupported',
        value: function () {
          return !!(t.robotNewFeatures && ((t.robotNewFeatures / 2 ** 32) >> 9) & 1);
        },
      },
      {
        key: 'isEggModeSupported',
        value: function () {
          return !!(t.robotNewFeatures && ((t.robotNewFeatures / 2 ** 32) >> 10) & 1);
        },
      },
      {
        key: 'isUnsaveMapReasonSupported',
        value: function () {
          return !!(t.robotNewFeatures && ((t.robotNewFeatures / 2 ** 32) >> 14) & 1);
        },
      },
      {
        key: 'isSupportMapElementSel',
        value: function () {
          return t.isSupportFurniture() || t.isSupportFloorEdit();
        },
      },
      {
        key: 'isSupportMapTypeSel',
        value: function () {
          return t.is3DMapSupported() || t.isArMapSupported();
        },
      },
      {
        key: 'isSupportMainSlideForMapShow',
        value: function () {
          return t.isSupportMapTypeSel() || t.isSupportMapElementSel() || t.isSupportMapRotate();
        },
      },
      {
        key: 'isCarpetShowOnMap',
        value: function () {
          var o = t.robotNewFeatures && ((t.robotNewFeatures / 2 ** 32) >> 12) & 1;
          return !!o;
        },
      },
      {
        key: 'isRubberBrushCarpetSupported',
        value: function () {
          return [module424.Products.TanosSC, module424.Products.TanosSE, module424.Products.TanosSL].hasElement(module424.DMM.currentProduct);
        },
      },
      {
        key: 'isReactiveAISupported',
        value: function () {
          return (
            module424.DMM.isTanosV ||
            module424.DMM.isTanosSPlus ||
            module424.DMM.isTanosSMax ||
            module424.DMM.isTopazSPlus ||
            module424.DMM.isUltron ||
            module424.DMM.isUltronSPlus ||
            module424.DMM.isTopazSC ||
            module424.DMM.isTanosSV ||
            module424.DMM.isTopazSV ||
            module424.DMM.isPearlPlus ||
            module424.DMM.isPearl ||
            module424.DMM.isUltronLite
          );
        },
      },
      {
        key: 'isObjectPhotoShowSupported',
        value: function () {
          return !(
            module424.DMM.isTanosSPlus ||
            module424.DMM.isTanosSMax ||
            module424.DMM.isTopazSPlus ||
            module424.DMM.isUltron ||
            module424.DMM.isUltronSPlus ||
            module424.DMM.isTopazSC ||
            module424.DMM.isPearl ||
            module424.DMM.isUltronLite
          );
        },
      },
      {
        key: 'isDynamicAdaptionCarpetSupported',
        value: function () {
          var o = module424.DMM.isTopazSV && t.isFCC(),
            u = t.isCarpetDeepCleanSupported() && t.isFCCOrCE();
          return o || u;
        },
      },
      {
        key: 'isNewRemoteViewSupported',
        value: function () {
          return (
            module424.DMM.isTopazSPlus ||
            module424.DMM.isTopazSC ||
            module424.DMM.isTanos ||
            module424.DMM.isTanosV ||
            module424.DMM.isTanosE ||
            module424.DMM.isTanosS ||
            module424.DMM.isTanosSPlus ||
            module424.DMM.isTanosSMax ||
            module424.DMM.isGarnet ||
            module424.DMM.isTopazS ||
            module424.DMM.isTanosSV ||
            module424.DMM.isTopazSV ||
            module424.DMM.isPearlPlus ||
            module424.DMM.isCoral ||
            module424.DMM.isUltron ||
            module424.DMM.isUltronSMop ||
            module424.DMM.isUltronSPlus ||
            module424.DMM.isUltronSV ||
            module424.DMM.isPearl
          );
        },
      },
      {
        key: 'isOpenMiShopSupported',
        value: function () {
          return !(
            (module424.DMM.isTopazS ||
              module424.DMM.isTopazSPlus ||
              module424.DMM.isTopazSC ||
              module424.DMM.isTopazSV ||
              module424.DMM.isPearlPlus ||
              module424.DMM.isTanosSL ||
              module424.DMM.isTanosSE ||
              module424.DMM.isTanosSC ||
              module424.DMM.isTanosSMax) &&
            module393.isMiApp
          );
        },
      },
      {
        key: 'isSupportedValleyElectricity',
        value: function () {
          return !!(t.robotNewFeatures && ((t.robotNewFeatures / 2 ** 32) >> 13) & 1);
        },
      },
      {
        key: 'isMaxPlusModeSupported',
        value: function () {
          return (
            module424.DMM.isTopazSV ||
            module424.DMM.isPearlPlus ||
            module424.DMM.isTanosSMax ||
            module424.DMM.isTopazSPlus ||
            module424.DMM.isUltron ||
            module424.DMM.isUltronSPlus ||
            module424.DMM.isTopazSC ||
            module424.DMM.isTopazSPower ||
            module424.DMM.isPearl
          );
        },
      },
      {
        key: 'isNonePureCleanMopWithMaxPlus',
        value: function () {
          return module424.DMM.isUltronLite || module424.DMM.isUltronE;
        },
      },
      {
        key: 'isSupportedDrying',
        value: function () {
          return !!(t.robotNewFeatures && ((t.robotNewFeatures / 2 ** 32) >> 15) & 1 && (module424.DMM.isTopazSV_CE || 'cn' == t.deviceLocation));
        },
      },
      {
        key: 'isSupportedDownloadTestVoice',
        value: function () {
          return !!(t.robotNewFeatures && ((t.robotNewFeatures / 2 ** 32) >> 16) & 1);
        },
      },
      {
        key: 'isSupportBackupMap',
        value: function () {
          return !!(t.robotNewFeatures && ((t.robotNewFeatures / 2 ** 32) >> 17) & 1);
        },
      },
      {
        key: 'isSupportCustomModeInCleaning',
        value: function () {
          return !!(t.robotNewFeatures && ((t.robotNewFeatures / 2 ** 32) >> 18) & 1);
        },
      },
      {
        key: 'isSupportRemoteControlInCall',
        value: function () {
          return !!(t.robotNewFeatures && ((t.robotNewFeatures / 2 ** 32) >> 19) & 1);
        },
      },
      {
        key: 'isSupportSetVolumeInCall',
        value: function () {
          return undefined !== t.newFeatureInfoStr && '' != t.newFeatureInfoStr && t.newFeatureInfoStr.length % 8 == 0 && !!(1 & parseInt('0x' + t.newFeatureInfoStr.slice(-8)));
        },
      },
      {
        key: 'isSupportCleanEstimate',
        value: function () {
          return undefined !== t.newFeatureInfoStr && '' != t.newFeatureInfoStr && t.newFeatureInfoStr.length % 8 == 0 && !!(2 & parseInt('0x' + t.newFeatureInfoStr.slice(-8)));
        },
      },
      {
        key: 'isSupportCustomDnd',
        value: function () {
          return undefined !== t.newFeatureInfoStr && '' != t.newFeatureInfoStr && t.newFeatureInfoStr.length % 8 == 0 && !!(4 & parseInt('0x' + t.newFeatureInfoStr.slice(-8)));
        },
      },
      {
        key: 'isCarpetDeepCleanSupported',
        value: function () {
          return !!t.newFeatureInfoStr && 8 & parseInt('0x' + t.newFeatureInfoStr.slice(-8));
        },
      },
      {
        key: 'isSupportStuckZone',
        value: function () {
          return undefined !== t.newFeatureInfoStr && '' != t.newFeatureInfoStr && t.newFeatureInfoStr.length % 8 == 0 && !!(16 & parseInt('0x' + t.newFeatureInfoStr.slice(-8)));
        },
      },
      {
        key: 'isSupportCustomDoorSill',
        value: function () {
          return undefined !== t.newFeatureInfoStr && '' != t.newFeatureInfoStr && t.newFeatureInfoStr.length % 8 == 0 && !!(32 & parseInt('0x' + t.newFeatureInfoStr.slice(-8)));
        },
      },
      {
        key: 'isCleanRouteFastModeSupported',
        value: function () {
          return !!t.newFeatureInfoStr && !!(256 & parseInt('0x' + t.newFeatureInfoStr.slice(-8)));
        },
      },
      {
        key: 'isSupportCliffZone',
        value: function () {
          return undefined !== t.newFeatureInfoStr && '' != t.newFeatureInfoStr && t.newFeatureInfoStr.length % 8 == 0 && !!(512 & parseInt('0x' + t.newFeatureInfoStr.slice(-8)));
        },
      },
      {
        key: 'isSupportSmartDoorSill',
        value: function () {
          return undefined !== t.newFeatureInfoStr && '' != t.newFeatureInfoStr && t.newFeatureInfoStr.length % 8 == 0 && !!(1024 & parseInt('0x' + t.newFeatureInfoStr.slice(-8)));
        },
      },
      {
        key: 'isSupportFloorDirection',
        value: function () {
          return undefined !== t.newFeatureInfoStr && '' != t.newFeatureInfoStr && t.newFeatureInfoStr.length % 8 == 0 && !!(2048 & parseInt('0x' + t.newFeatureInfoStr.slice(-8)));
        },
      },
      {
        key: 'isWifiManageSupported',
        value: function () {
          return !!t.newFeatureInfoStr && !!(128 & parseInt('0x' + t.newFeatureInfoStr.slice(-8)));
        },
      },
      {
        key: 'isBackChargeAutoWashSupported',
        value: function () {
          return !!t.newFeatureInfoStr && !!(4096 & parseInt('0x' + t.newFeatureInfoStr.slice(-8)));
        },
      },
      {
        key: 'isLowFrequencyMapForMiSupported',
        value: function () {
          return module424.DMM.isTanos || module424.DMM.isRubysLite;
        },
      },
      {
        key: 'isSupportIncrementalMap',
        value: function () {
          return module393.isMiApp
            ? !!t.newFeatureInfoStr && !!(8192 & parseInt('0x' + t.newFeatureInfoStr.slice(-8)))
            : !!t.newFeatureInfoStr && !!(4194304 & parseInt('0x' + t.newFeatureInfoStr.slice(-8)));
        },
      },
      {
        key: 'isShowCarpetEditEntrance',
        value: function () {
          return t.isCarpetSupported() || t.isSupportCustomCarpet();
        },
      },
      {
        key: 'groundOnlySupportCarpet',
        value: function () {
          return t.isShowCarpetEditEntrance() && !t.isSupportFloorEdit() && !t.isSupportCustomDoorSill();
        },
      },
      {
        key: 'groundOnlySupportFloor',
        value: function () {
          return t.isSupportFloorEdit() && !t.isShowCarpetEditEntrance() && !t.isSupportCustomDoorSill();
        },
      },
      {
        key: 'groundOnlySupportDoorSill',
        value: function () {
          return t.isSupportCustomDoorSill() && !t.isSupportFloorEdit() && !t.isShowCarpetEditEntrance();
        },
      },
      {
        key: 'isOfflineMapSupported',
        value: function () {
          if (!t.newFeatureInfoStr) return false;
          var o = parseInt('0x' + t.newFeatureInfoStr.slice(-8));
          return !module393.isMiApp && !!(16384 & o);
        },
      },
      {
        key: 'isSuperDeepWashSupported',
        value: function () {
          return !!t.newFeatureInfoStr && !!(32768 & parseInt('0x' + t.newFeatureInfoStr.slice(-8)));
        },
      },
      {
        key: 'isCes2022Supported',
        value: function () {
          return !!t.newFeatureInfoStr && !!(65536 & parseInt('0x' + t.newFeatureInfoStr.slice(-8)));
        },
      },
      {
        key: 'isDssBelievable',
        value: function () {
          return !!t.newFeatureInfoStr && !!(131072 & parseInt('0x' + t.newFeatureInfoStr.slice(-8)));
        },
      },
      {
        key: 'isMainBrushUpDownSupported',
        value: function () {
          return !!t.newFeatureInfoStr && !!(262144 & parseInt('0x' + t.newFeatureInfoStr.slice(-8)));
        },
      },
      {
        key: 'isGotoPureCleanPathSupported',
        value: function () {
          return !!t.newFeatureInfoStr && !!(524288 & parseInt('0x' + t.newFeatureInfoStr.slice(-8)));
        },
      },
      {
        key: 'isShowPureMopPath',
        value: function () {
          return [module424.Products.UltronSPlus].hasElement(module424.DMM.currentProduct);
        },
      },
      {
        key: 'isWaterUpDownDrainSupported',
        value: function () {
          return !!t.newFeatureInfoStr && !!(1048576 & parseInt('0x' + t.newFeatureInfoStr.slice(-8)));
        },
      },
      {
        key: 'isSettingCarpetFirstSupported',
        value: function () {
          return !!t.newFeatureInfoStr && !!(8388608 & parseInt('0x' + t.newFeatureInfoStr.slice(-8)));
        },
      },
      {
        key: 'isCleanRouteDeepSlowPlusSupported',
        value: function () {
          return !!t.newFeatureInfoStr && !!(16777216 & parseInt('0x' + t.newFeatureInfoStr.slice(-8)));
        },
      },
      {
        key: 'isDynamiclySkipCleanZoneSupported',
        value: function () {
          return !!module411.shouldShowDynamicModifyingZones || (!!t.newFeatureInfoStr && !!(33554432 & parseInt('0x' + t.newFeatureInfoStr.slice(-8))));
        },
      },
      {
        key: 'isDynamiclyAddCleanZonesSupported',
        value: function () {
          return !!module411.shouldShowDynamicModifyingZones || (!!t.newFeatureInfoStr && !!(67108864 & parseInt('0x' + t.newFeatureInfoStr.slice(-8))));
        },
      },
      {
        key: 'isLeftWaterDrainSupported',
        value: function () {
          return !!t.newFeatureInfoStr && !!(134217728 & parseInt('0x' + t.newFeatureInfoStr.slice(-8)));
        },
      },
      {
        key: 'isCornerCleanModeSupported',
        value: function () {
          return !!t.newFeatureInfoStr && !!(2147483648 & parseInt('0x' + t.newFeatureInfoStr.slice(-8)));
        },
      },
      {
        key: 'isFirmwareProgressSupported',
        value: function () {
          return false;
        },
      },
      {
        key: 'isSupportMopBackPWMSet',
        value: function () {
          return [module424.Products.Pearl].hasElement(module424.DMM.currentProduct);
        },
      },
      {
        key: 'is2022CESIpad',
        value: function () {
          return (
            -1 !=
              ['rr614a6a53c95830', 'rr5c5a118d0f9820'].findIndex(function (t) {
                return t == module393.userId;
              }) && module391.default.isIpad()
          );
        },
      },
      {
        key: 'isDebugMidRebootOnMijiaSupported',
        value: function () {
          return (
            -1 !=
            ['1303482628'].findIndex(function (t) {
              return module393.userId == t;
            })
          );
        },
      },
      {
        key: 'isCleanRouteSettingSupported',
        value: function () {
          return t.isShakeMopSetSupported() || t.isShakeMopStrengthSupported();
        },
      },
    ]);
    return t;
  })();

exports.default = c;
c.robotFeatures = null;
c.robotNewFeatures = null;
c.deviceLocation = null;
c.newFeatureInfoStr = '';
