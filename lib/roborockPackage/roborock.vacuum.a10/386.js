var module4 = require('./4'),
  module5 = require('./5'),
  module387 = require('./387'),
  module502 = require('./502'),
  module415 = require('./415'),
  module389 = require('./389'),
  p = (function () {
    function t() {
      module4.default(this, t);
    }

    module5.default(t, null, [
      {
        key: 'isMapSegmentSupported',
        value: function () {
          return module415.DMM.currentProduct != module415.Products.RubyPlus ? module415.DMM.currentProduct != module415.Products.RubySC : t.isSupportFeature(116);
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
          return module415.DMM.currentSeries == module415.DeviceSeries.t6 || module415.DMM.currentSeries == module415.DeviceSeries.p5;
        },
      },
      {
        key: 'shouldShowSoftCleanMode',
        value: function () {
          return ![module415.Products.RubyPlus, module415.Products.TanosV_CE].hasElement(module415.DMM.currentProduct);
        },
      },
      {
        key: 'isSoftCleanModeSupportedInMain',
        value: function () {
          return module415.DMM.isTanosV || module415.DMM.isTanosE || module415.DMM.isTanos || module415.DMM.isRubySC || module415.DMM.isRubysLite || module415.DMM.isRubysE;
        },
      },
      {
        key: 'isCustomModeSupported',
        value: function () {
          return ![
            module415.Products.Ruby,
            module415.Products.Ruby2,
            module415.Products.Rubys,
            module415.Products.Sapphire,
            module415.Products.SapphireC,
            module415.Products.SapphireLite,
            module415.Products.Tanos_CE,
            module415.Products.Tanos_CN,
            module415.Products.RubyPlus,
            module415.Products.RubySC,
            module415.Products.RubysE,
          ].hasElement(module415.DMM.currentProduct);
        },
      },
      {
        key: 'isElectronicWaterBoxSupported',
        value: function () {
          return [module415.Products.RubysLite, module415.Products.TanosV_CN, module415.Products.TanosV_CE, module415.Products.TanosE, module415.Products.TanosSL].hasElement(
            module415.DMM.currentProduct
          );
        },
      },
      {
        key: 'isShakeMopStrengthSupported',
        value: function () {
          return (
            module415.DMM.currentProduct == module415.Products.TanosS ||
            module415.DMM.currentProduct == module415.Products.TanosSPlus ||
            module415.DMM.isGarnet ||
            module415.DMM.isTopazSV ||
            module415.DMM.isCoral ||
            module415.DMM.isTopazS ||
            module415.DMM.isTopazSPlus ||
            module415.DMM.isTopazSV
          );
        },
      },
      {
        key: 'isAutoCleanWiperSupported',
        value: function () {
          return module415.DMM.currentProduct == module415.Products.Garnet;
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
              module415.Products.Rubys,
              module415.Products.RubySC,
              module415.Products.RubysE,
              module415.Products.RubyPlus,
              module415.Products.Tanos_CN,
              module415.Products.Tanos_CE,
            ].hasElement(module415.DMM.currentProduct) || !t.isFCCOrCE()
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
          var u = [
            module415.Products.TanosS,
            module415.Products.TanosSPlus,
            module415.Products.TopazSV,
            module415.Products.TanosSL,
            module415.Products.TopazS,
            module415.Products.TopazSPlus,
          ];
          return !t.isFCC() && u.hasElement(module415.DMM.currentProduct);
        },
      },
      {
        key: 'isSelfAdaptionCarpetSupported',
        value: function () {
          return ![module415.Products.TanosSL].hasElement(module415.DMM.currentProduct);
        },
      },
      {
        key: 'isShowCarpetSweeperView',
        value: function () {
          return ![module415.Products.TanosSL].hasElement(module415.DMM.currentProduct) || !t.isFCC();
        },
      },
      {
        key: 'isCameraSupported',
        value: function () {
          return [module415.Products.TanosV_CN, module415.Products.TanosV_CE, module415.Products.TopazSV, module415.Products.TanosSV].hasElement(module415.DMM.currentProduct);
        },
      },
      {
        key: 'isStructuredLightSupported',
        value: function () {
          return module415.DMM.currentProduct == module415.Products.TanosSPlus;
        },
      },
      {
        key: 'isWaterBoxSupported',
        value: function () {
          return [module415.Products.Tanos_CE, module415.Products.Tanos_CN].hasElement(module415.DMM.currentProduct);
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
            !![module415.Products.RubyPlus, module415.Products.Tanos_CN, module415.Products.Tanos_CE, module415.Products.TanosE].hasElement(module415.DMM.currentProduct) &&
            'cn' == module387.default.getAppLanguage()
          );
        },
      },
      {
        key: 'isObaAccount',
        value: function () {
          return (
            module502.ObaInfoString.ObaModels.indexOf(module389.deviceModel) > -1 ||
            module502.ObaInfoString.MiJaObaAccounts.indexOf(module389.userId) > -1 ||
            module502.ObaInfoString.ZiYouObaAccounts.indexOf(module389.userId) > -1
          );
        },
      },
      {
        key: 'isUseOldTitleInGuide',
        value: function () {
          return module415.DMM.isTanos || module415.DMM.isRubys || module415.DMM.isRubyPlus || module415.DMM.isRubysLite || module415.DMM.isRubySC;
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
          var u = [module415.Products.RubyPlus, module415.Products.Rubys, module415.Products.RubySC, module415.Products.RubysE, module415.Products.TopazS];
          return undefined !== t.robotNewFeatures && !isNaN(t.robotNewFeatures) && !u.hasElement(module415.DMM.currentProduct) && !!(2 & t.robotNewFeatures);
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
          return module415.DMM.isTopazSV && (module415.DMM.isV2 || module415.DMM.isV5);
        },
      },
      {
        key: 'isSupportFurniture',
        value: function () {
          return undefined !== t.robotNewFeatures && !isNaN(t.robotNewFeatures) && !!((t.robotNewFeatures / 2 ** 32) & 8);
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
              return module389.userId == t;
            })
          );
        },
      },
      {
        key: 'isDebuggableV1User',
        value: function () {
          return (
            -1 !=
            ['rr5a890cd2077d70', 'rr5a96285530fd50', '6339240', '2216005876', 'rr5ab8d94812fc60', 'rr5b3612de943c70'].findIndex(function (t) {
              return module389.userId == t;
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
            (module389.isMiApp || module389.apiLevel >= 10009) &&
            -1 !=
              ['rr5c9dfd6632d4f0', 'rr5d49868e1c5830', 'rr5d70316ea7d4f0', 'rr5d78d82fb39830', 'rr5cc0ccc796d830'].findIndex(function (t) {
                return module389.userId == t;
              })
          );
        },
      },
      {
        key: 'isOtaMiIOTAllowed',
        value: function () {
          return (
            -1 !=
            ['251766162'].findIndex(function (t) {
              return module389.userId == t;
            })
          );
        },
      },
      {
        key: 'isDisableBackAndMore',
        value: function () {
          return (
            -1 !=
            ['rr5c6048f7e35820', 'rr5db82de1c9d820'].findIndex(function (t) {
              return module389.userId == t;
            })
          );
        },
      },
      {
        key: 'isTestUploadEn',
        value: function () {
          return (
            -1 !=
            ['1036392039'].findIndex(function (t) {
              return module389.userId == t;
            })
          );
        },
      },
      {
        key: 'isActivityCN0919Supported',
        value: function () {
          return [module415.Products.Tanos_CN, module415.Products.TanosV_CN, module415.Products.TanosE].hasElement(module415.DMM.currentProduct) && !module389.isMiApp;
        },
      },
      {
        key: 'isCarpetPressurizeSwitchUseNewPara',
        value: function () {
          return [module415.Products.RubySC, module415.Products.RubysE, module415.Products.RubysLite].hasElement(module415.DMM.currentProduct);
        },
      },
      {
        key: 'shouldHideCarpetPressurize',
        value: function () {
          return module415.DMM.currentProduct == module415.Products.RubyPlus;
        },
      },
      {
        key: 'shouldHideMop',
        value: function () {
          return module415.DMM.currentProduct == module415.Products.RubyPlus;
        },
      },
      {
        key: 'shouldShowGuidePage',
        value: function () {
          var t = module415.DMM.supportedGuideLanguages;
          if (t.indexOf('*') > -1) return true;
          var u = module387.default.getAppLanguage();
          return -1 != t.indexOf(u);
        },
      },
      {
        key: 'shouldUpdateMenuDataByRobotLocation',
        value: function () {
          return module415.DMM.currentProduct == module415.Products.Rubys && 'tw' == t.deviceLocation;
        },
      },
      {
        key: 'shouldShowUseMoppingModuleGuide',
        value: function () {
          return [module415.Products.Tanos_CE, module415.Products.Tanos_CN, module415.Products.Rubys].hasElement(module415.DMM.currentProduct);
        },
      },
      {
        key: 'shouldShowOtherGuide',
        value: function () {
          return [module415.Products.TanosV_CE, module415.Products.TanosV_CN, module415.Products.TanosE].hasElement(module415.DMM.currentProduct) && t.shouldShowGuidePage();
        },
      },
      {
        key: 'shouldShowTroubleShootingGuide',
        value: function () {
          return ![module415.Products.TanosV_CE, module415.Products.TanosV_CN, module415.Products.TanosE].hasElement(module415.DMM.currentProduct) && t.shouldShowGuidePage();
        },
      },
      {
        key: 'isSupportForeCloseGuideVideo',
        value: function () {
          return module415.DMM.currentProduct == module415.Products.TanosE;
        },
      },
      {
        key: 'isSupportDisturbInVideoSetting',
        value: function () {
          return module415.DMM.currentProduct != module415.Products.TanosV_CE;
        },
      },
      {
        key: 'isSupportLedStatusSwitch',
        value: function () {
          return module415.Products.RubyPlus || t.isSupportFeature(119);
        },
      },
      {
        key: 'isLedSwitchVisible',
        value: function () {
          return module415.DMM.currentProduct != module415.Products.TanosS || t.isSupportFeature(119);
        },
      },
      {
        key: 'isNewCarpetPressurize',
        value: function () {
          return [module415.Products.RubySC, module415.Products.RubysE, module415.Products.RubysLite].hasElement(module415.DMM.currentProduct);
        },
      },
      {
        key: 'isSupportPetModeAlert',
        value: function () {
          return module415.DMM.isTanosV || module415.DMM.isTanosSPlus || module415.DMM.isTanosSV;
        },
      },
      {
        key: 'isSupportFetchTimerSummary',
        value: function () {
          return module415.DMM.currentProduct != module415.Products.Tanos_CN && t.isSupportFeature(122);
        },
      },
      {
        key: 'isModelOrderSupported',
        value: function () {
          return (
            !![
              module415.Products.Rubys,
              module415.Products.TanosE,
              module415.Products.Tanos_CE,
              module415.Products.Tanos_CN,
              module415.Products.TanosV_CN,
              module415.Products.TanosV_CE,
              module415.Products.RubyPlus,
              module415.Products.RubySC,
              module415.Products.RubysLite,
            ].hasElement(module415.DMM.currentProduct) ||
            (!!t.deviceLocation && !t.isFCC())
          );
        },
      },
      {
        key: 'hasTranslateGuidePage',
        value: function (t) {
          var u = module415.DMM.translatedGuideLanguages;
          return u.indexOf('*') > -1 || -1 != u.indexOf(t);
        },
      },
      {
        key: 'isSupportFeature',
        value: function (u) {
          return (
            -1 !=
            t.robotFeatures.findIndex(function (t) {
              return t == u;
            })
          );
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
        key: 'isShowPicUpload',
        value: function () {
          return module415.DMM.isV4 && !module389.isMiApp && (module415.DMM.isTanosV || module415.DMM.isTanosSPlus);
        },
      },
      {
        key: 'shouldRotateMap',
        value: function () {
          return true;
        },
      },
      {
        key: 'SupportOverflowTouch',
        value: function () {
          return false;
        },
      },
    ]);
    return t;
  })();

exports.default = p;
p.robotFeatures = null;
p.robotNewFeatures = null;
p.deviceLocation = null;
