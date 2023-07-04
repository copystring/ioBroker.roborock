var module4 = require('./4'),
  module391 = require('./391'),
  module1411 = require('./1411'),
  module423 = require('./423'),
  module393 = require('./393'),
  c = (function () {
    function t() {
      module4.default(this, t);
    }

    module5.default(t, null, [
      {
        key: 'isMapSegmentSupported',
        value: function () {
          return module423.DMM.currentProduct != module423.Products.RubyPlus ? module423.DMM.currentProduct != module423.Products.RubySC : t.isSupportFeature(116);
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
          return module423.DMM.currentSeries == module423.DeviceSeries.t6 || module423.DMM.currentSeries == module423.DeviceSeries.p5;
        },
      },
      {
        key: 'shouldShowSoftCleanMode',
        value: function () {
          return ![module423.Products.RubyPlus, module423.Products.TanosV_CE].hasElement(module423.DMM.currentProduct);
        },
      },
      {
        key: 'isSoftCleanModeSupportedInMain',
        value: function () {
          return module423.DMM.isTanosV || module423.DMM.isTanosE || module423.DMM.isTanos || module423.DMM.isRubySC || module423.DMM.isRubysLite || module423.DMM.isRubysE;
        },
      },
      {
        key: 'isCustomModeSupported',
        value: function () {
          return ![
            module423.Products.Ruby,
            module423.Products.Ruby2,
            module423.Products.Rubys,
            module423.Products.Sapphire,
            module423.Products.SapphireC,
            module423.Products.SapphireLite,
            module423.Products.Tanos_CE,
            module423.Products.Tanos_CN,
            module423.Products.RubyPlus,
            module423.Products.RubySC,
            module423.Products.RubysE,
          ].hasElement(module423.DMM.currentProduct);
        },
      },
      {
        key: 'isElectronicWaterBoxSupported',
        value: function () {
          return [module423.Products.RubysLite, module423.Products.TanosV_CN, module423.Products.TanosV_CE, module423.Products.TanosE, module423.Products.TanosSL].hasElement(
            module423.DMM.currentProduct
          );
        },
      },
      {
        key: 'isShakeMopStrengthSupported',
        value: function () {
          return (
            module423.DMM.currentProduct == module423.Products.TanosS ||
            module423.DMM.currentProduct == module423.Products.TanosSPlus ||
            module423.DMM.isGarnet ||
            module423.DMM.isTopazSV ||
            module423.DMM.isCoral ||
            module423.DMM.isTopazS ||
            module423.DMM.isTopazSPlus ||
            module423.DMM.isTopazSC ||
            module423.DMM.isTopazSV ||
            module423.DMM.isTanosSMax ||
            module423.DMM.isUltron ||
            module423.DMM.isUltronSPlus ||
            module423.DMM.isUltronSMop ||
            module423.DMM.isUltronSV ||
            module423.DMM.isPearl
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
          return module423.DMM.currentProduct == module423.Products.Garnet;
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
              module423.Products.Rubys,
              module423.Products.RubySC,
              module423.Products.RubysE,
              module423.Products.RubyPlus,
              module423.Products.Tanos_CN,
              module423.Products.Tanos_CE,
            ].hasElement(module423.DMM.currentProduct) || !t.isFCCOrCE()
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
          var o = [
              module423.Products.TanosS,
              module423.Products.TanosSPlus,
              module423.Products.TopazSV_CN,
              module423.Products.TopazSV_CE,
              module423.Products.TopazS,
              module423.Products.TopazSPlus,
              module423.Products.TanosSMax,
              module423.Products.TopazS_CE,
              module423.Products.TopazSPower,
              module423.Products.TopazSC_CN,
              module423.Products.TopazSC_CE,
            ],
            u = module423.DMM.isUltron || module423.DMM.isUltronSPlus || module423.DMM.isUltronSV || module423.DMM.isPearl;
          return !t.isFCC() && (o.hasElement(module423.DMM.currentProduct) || u);
        },
      },
      {
        key: 'isSelfAdaptionCarpetSupported',
        value: function () {
          return !([module423.Products.TanosSL].hasElement(module423.DMM.currentProduct) || (module423.DMM.isTopazSV && t.isFCC()));
        },
      },
      {
        key: 'isShowCarpetSweeperView',
        value: function () {
          return ![module423.Products.TanosSL].hasElement(module423.DMM.currentProduct) || !t.isFCC();
        },
      },
      {
        key: 'isCameraSupported',
        value: function () {
          return [module423.Products.TanosV_CN, module423.Products.TanosV_CE, module423.Products.TopazSV_CN, module423.Products.TopazSV_CE, module423.Products.TanosSV].hasElement(
            module423.DMM.currentProduct
          );
        },
      },
      {
        key: 'isStructuredLightSupported',
        value: function () {
          return [module423.Products.TanosSPlus, module423.Products.TanosSMax, module423.Products.TopazSPlus].hasElement(module423.DMM.currentProduct);
        },
      },
      {
        key: 'isShowGeneralObstacle',
        value: function () {
          return [module423.Products.TanosSPlus].hasElement(module423.DMM.currentProduct);
        },
      },
      {
        key: 'isWaterBoxSupported',
        value: function () {
          return [module423.Products.Tanos_CE, module423.Products.Tanos_CN].hasElement(module423.DMM.currentProduct);
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
            !![module423.Products.RubyPlus, module423.Products.Tanos_CN, module423.Products.Tanos_CE, module423.Products.TanosE].hasElement(module423.DMM.currentProduct) &&
            'cn' == module391.default.getAppLanguage()
          );
        },
      },
      {
        key: 'isObaAccount',
        value: function () {
          return (
            module1411.ObaInfoString.ObaModels.indexOf(module393.deviceModel) > -1 ||
            module1411.ObaInfoString.MiJaObaAccounts.indexOf(module393.userId) > -1 ||
            module1411.ObaInfoString.ZiYouObaAccounts.indexOf(module393.userId) > -1
          );
        },
      },
      {
        key: 'isUseOldTitleInGuide',
        value: function () {
          return module423.DMM.isTanos || module423.DMM.isRubys || module423.DMM.isRubyPlus || module423.DMM.isRubysLite || module423.DMM.isRubySC;
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
            !!(module423.DMM.isTanosV || module423.DMM.isTanos || module423.DMM.isTopazSV) ||
            !![
              module423.Products.TanosE,
              module423.Products.TanosSL,
              module423.Products.TanosS,
              module423.Products.TanosSPlus,
              module423.Products.TanosSMax,
              module423.Products.Ultron,
              module423.Products.Pearl,
            ].hasElement(module423.DMM.currentProduct)
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
          return module423.DMM.isTanosV || module423.DMM.isTopazSV || module423.DMM.isCoral;
        },
      },
      {
        key: 'isVideoLiveCallSupported',
        value: function () {
          return module423.DMM.isTopazSV || module423.DMM.isCoral;
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
            ['rr5a96285530fd50', '6339240', '2216005876', 'rr5ab8d94812fc60', 'rr5b3612de943c70', '77051706'].findIndex(function (t) {
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
          return [module423.Products.Tanos_CN, module423.Products.TanosV_CN, module423.Products.TanosE].hasElement(module423.DMM.currentProduct) && !module393.isMiApp;
        },
      },
      {
        key: 'isCarpetPressurizeSwitchUseNewPara',
        value: function () {
          return [module423.Products.RubySC, module423.Products.RubysE, module423.Products.RubysLite].hasElement(module423.DMM.currentProduct);
        },
      },
      {
        key: 'shouldHideCarpetPressurize',
        value: function () {
          return module423.DMM.currentProduct == module423.Products.RubyPlus;
        },
      },
      {
        key: 'shouldHideMop',
        value: function () {
          return module423.DMM.currentProduct == module423.Products.RubyPlus;
        },
      },
      {
        key: 'shouldShowGuidePage',
        value: function () {
          var t = module423.DMM.supportedGuideLanguages;
          if (t.indexOf('*') > -1) return true;
          var o = module391.default.getAppLanguage();
          return -1 != t.indexOf(o);
        },
      },
      {
        key: 'shouldUpdateMenuDataByRobotLocation',
        value: function () {
          return module423.DMM.currentProduct == module423.Products.Rubys && 'tw' == t.deviceLocation;
        },
      },
      {
        key: 'shouldShowUseMoppingModuleGuide',
        value: function () {
          return [module423.Products.Tanos_CE, module423.Products.Tanos_CN, module423.Products.Rubys].hasElement(module423.DMM.currentProduct);
        },
      },
      {
        key: 'shouldShowOtherGuide',
        value: function () {
          return [module423.Products.TanosV_CE, module423.Products.TanosV_CN, module423.Products.TanosE].hasElement(module423.DMM.currentProduct) && t.shouldShowGuidePage();
        },
      },
      {
        key: 'shouldShowTroubleShootingGuide',
        value: function () {
          return ![module423.Products.TanosV_CE, module423.Products.TanosV_CN, module423.Products.TanosE].hasElement(module423.DMM.currentProduct) && t.shouldShowGuidePage();
        },
      },
      {
        key: 'isSupportForeCloseGuideVideo',
        value: function () {
          return module423.DMM.currentProduct == module423.Products.TanosE;
        },
      },
      {
        key: 'isSupportDisturbInVideoSetting',
        value: function () {
          return ![module423.Products.TanosV_CE, module423.Products.TopazSV_CE].hasElement(module423.DMM.currentProduct);
        },
      },
      {
        key: 'isSupportLedStatusSwitch',
        value: function () {
          return module423.Products.RubyPlus || t.isSupportFeature(119);
        },
      },
      {
        key: 'isLedSwitchVisible',
        value: function () {
          return module423.DMM.currentProduct != module423.Products.TanosS || t.isSupportFeature(119);
        },
      },
      {
        key: 'isNewCarpetPressurize',
        value: function () {
          return [module423.Products.RubySC, module423.Products.RubysE, module423.Products.RubysLite].hasElement(module423.DMM.currentProduct);
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
          return module423.DMM.currentProduct != module423.Products.Tanos_CN && t.isSupportFeature(122);
        },
      },
      {
        key: 'isModelOrderSupported',
        value: function () {
          return (
            !![
              module423.Products.Rubys,
              module423.Products.TanosE,
              module423.Products.Tanos_CE,
              module423.Products.Tanos_CN,
              module423.Products.TanosV_CN,
              module423.Products.TanosV_CE,
              module423.Products.RubyPlus,
              module423.Products.RubySC,
              module423.Products.RubysLite,
            ].hasElement(module423.DMM.currentProduct) ||
            (!!t.deviceLocation && !t.isFCC())
          );
        },
      },
      {
        key: 'hasTranslateGuidePage',
        value: function (t) {
          var o = module423.DMM.translatedGuideLanguages;
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
          return module423.DMM.isV4 && !module393.isMiApp && (module423.DMM.isTanosV || module423.DMM.isTanosSPlus || module423.DMM.isTanosSMax);
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
            (module423.DMM.isTanosSMax ||
              module423.DMM.isTopazSPlus ||
              module423.DMM.isTopazSC ||
              module423.DMM.isTopazSV ||
              module423.DMM.isTanosSC ||
              module423.DMM.isTanosSE ||
              module423.DMM.isTanosSL ||
              module423.DMM.isTopazS ||
              module423.DMM.isTopazSPower ||
              module423.DMM.isCoral ||
              module423.DMM.isUltron ||
              module423.DMM.isUltronSPlus ||
              module423.DMM.isUltronSMop ||
              module423.DMM.isPearl ||
              module423.DMM.isTanosS ||
              module423.DMM.isTanosSPlus ||
              module423.DMM.isRubysLite) &&
            module393.isSupport3DMap()
          );
        },
      },
      {
        key: 'isArMapSupported',
        value: function () {
          return (
            (module423.DMM.isTanosSMax ||
              module423.DMM.isTopazSPlus ||
              module423.DMM.isTopazSC ||
              module423.DMM.isTopazSV ||
              module423.DMM.isTanosSC ||
              module423.DMM.isTanosSE ||
              module423.DMM.isTanosSL ||
              module423.DMM.isTopazS ||
              module423.DMM.isTopazSPower ||
              module423.DMM.isCoral ||
              module423.DMM.isUltron ||
              module423.DMM.isUltronSPlus ||
              module423.DMM.isUltronSMop ||
              module423.DMM.isPearl) &&
            module393.isSupport3DMap() &&
            module393.isSupportLidar()
          );
        },
      },
      {
        key: 'isPureCleanMopSupported',
        value: function () {
          return (
            module423.DMM.isTopazS ||
            module423.DMM.isTopazSV ||
            module423.DMM.isTopazSPlus ||
            module423.DMM.isTopazSC ||
            module423.DMM.isTanosSMax ||
            module423.DMM.isTanosS ||
            module423.DMM.isTanosSPlus ||
            module423.DMM.isTopazSPower ||
            module423.DMM.isCoral ||
            module423.DMM.isUltron ||
            module423.DMM.isUltronSPlus ||
            module423.DMM.isUltronSMop ||
            module423.DMM.isUltronSV ||
            module423.DMM.isPearl
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
          return [module423.Products.TanosSC, module423.Products.TanosSE, module423.Products.TanosSL].hasElement(module423.DMM.currentProduct);
        },
      },
      {
        key: 'isReactiveAISupported',
        value: function () {
          return (
            module423.DMM.isTanosV ||
            module423.DMM.isTanosSPlus ||
            module423.DMM.isTanosSMax ||
            module423.DMM.isTopazSPlus ||
            module423.DMM.isUltron ||
            module423.DMM.isUltronSPlus ||
            module423.DMM.isTopazSC ||
            module423.DMM.isTanosSV ||
            module423.DMM.isTopazSV ||
            module423.DMM.isPearl ||
            module423.DMM.isUltronLite
          );
        },
      },
      {
        key: 'isObjectPhotoShowSupported',
        value: function () {
          return !(module423.DMM.isTanosSPlus || module423.DMM.isTanosSMax || module423.DMM.isTopazSPlus || module423.DMM.isTopazSC);
        },
      },
      {
        key: 'isDynamicAdaptionCarpetSupported',
        value: function () {
          return module423.DMM.isTopazSV ? t.isFCC() : t.isCarpetDeepCleanSupported();
        },
      },
      {
        key: 'isNewRemoteViewSupported',
        value: function () {
          return (
            module423.DMM.isTopazSPlus ||
            module423.DMM.isTopazSC ||
            module423.DMM.isTanos ||
            module423.DMM.isTanosV ||
            module423.DMM.isTanosE ||
            module423.DMM.isTanosS ||
            module423.DMM.isTanosSPlus ||
            module423.DMM.isTanosSMax ||
            module423.DMM.isGarnet ||
            module423.DMM.isTopazS ||
            module423.DMM.isTanosSV ||
            module423.DMM.isTopazSV ||
            module423.DMM.isCoral ||
            module423.DMM.isUltron ||
            module423.DMM.isUltronSMop ||
            module423.DMM.isUltronSPlus ||
            module423.DMM.isUltronSV ||
            module423.DMM.isPearl
          );
        },
      },
      {
        key: 'isOpenMiShopSupported',
        value: function () {
          return !(
            (module423.DMM.isTopazS ||
              module423.DMM.isTopazSPlus ||
              module423.DMM.isTopazSC ||
              module423.DMM.isTopazSV ||
              module423.DMM.isTanosSL ||
              module423.DMM.isTanosSE ||
              module423.DMM.isTanosSC ||
              module423.DMM.isTanosSMax) &&
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
            module423.DMM.isTopazSV ||
            module423.DMM.isTanosSMax ||
            module423.DMM.isTopazSPlus ||
            module423.DMM.isUltron ||
            module423.DMM.isUltronSPlus ||
            module423.DMM.isTopazSC ||
            module423.DMM.isTopazSPower ||
            module423.DMM.isPearl
          );
        },
      },
      {
        key: 'isSupportedDrying',
        value: function () {
          return !!(t.robotNewFeatures && ((t.robotNewFeatures / 2 ** 32) >> 15) & 1 && (module423.DMM.isTopazSV_CE || 'cn' == t.deviceLocation));
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
          return module423.DMM.isTanos || module423.DMM.isRubysLite;
        },
      },
      {
        key: 'isSupportIncrementalMap',
        value: function () {
          return !!module393.isMiApp && !!t.newFeatureInfoStr && !!(8192 & parseInt('0x' + t.newFeatureInfoStr.slice(-8)));
        },
      },
      {
        key: 'groundOnlySupportCarpet',
        value: function () {
          return t.isCarpetSupported() && !t.isSupportFloorEdit() && !t.isSupportCustomDoorSill();
        },
      },
      {
        key: 'groundOnlySupportFloor',
        value: function () {
          return t.isSupportFloorEdit() && !t.isCarpetSupported() && !t.isSupportCustomDoorSill();
        },
      },
      {
        key: 'groundOnlySupportDoorSill',
        value: function () {
          return t.isSupportCustomDoorSill() && !t.isSupportFloorEdit() && !t.isCarpetSupported();
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
