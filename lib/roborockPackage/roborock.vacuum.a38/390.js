var module4 = require('./4'),
  module391 = require('./391'),
  module511 = require('./511'),
  module422 = require('./422'),
  module381 = require('./381'),
  module393 = require('./393'),
  S = (function () {
    function t() {
      module4.default(this, t);
    }

    module5.default(t, null, [
      {
        key: 'isMapSegmentSupported',
        value: function () {
          return module422.DMM.currentProduct != module422.Products.RubyPlus ? module422.DMM.currentProduct != module422.Products.RubySC : t.isSupportFeature(116);
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
          return module422.DMM.currentSeries == module422.DeviceSeries.t6 || module422.DMM.currentSeries == module422.DeviceSeries.p5;
        },
      },
      {
        key: 'shouldShowSoftCleanMode',
        value: function () {
          return ![module422.Products.RubyPlus, module422.Products.TanosV_CE].hasElement(module422.DMM.currentProduct);
        },
      },
      {
        key: 'isSoftCleanModeSupportedInMain',
        value: function () {
          return module422.DMM.isTanosV || module422.DMM.isTanosE || module422.DMM.isTanos || module422.DMM.isRubySC || module422.DMM.isRubysLite || module422.DMM.isRubysE;
        },
      },
      {
        key: 'isCustomModeSupported',
        value: function () {
          return ![
            module422.Products.Ruby,
            module422.Products.Ruby2,
            module422.Products.Rubys,
            module422.Products.Sapphire,
            module422.Products.SapphireC,
            module422.Products.SapphireLite,
            module422.Products.Tanos_CE,
            module422.Products.Tanos_CN,
            module422.Products.RubyPlus,
            module422.Products.RubySC,
            module422.Products.RubysE,
          ].hasElement(module422.DMM.currentProduct);
        },
      },
      {
        key: 'isElectronicWaterBoxSupported',
        value: function () {
          return [module422.Products.RubysLite, module422.Products.TanosV_CN, module422.Products.TanosV_CE, module422.Products.TanosE, module422.Products.TanosSL].hasElement(
            module422.DMM.currentProduct
          );
        },
      },
      {
        key: 'isShakeMopStrengthSupported',
        value: function () {
          return (
            module422.DMM.currentProduct == module422.Products.TanosS ||
            module422.DMM.currentProduct == module422.Products.TanosSPlus ||
            module422.DMM.isGarnet ||
            module422.DMM.isTopazSV ||
            module422.DMM.isCoral ||
            module422.DMM.isTopazS ||
            module422.DMM.isTopazSPlus ||
            module422.DMM.isTopazSV ||
            module422.DMM.isTanosSMax
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
          return module422.DMM.currentProduct == module422.Products.Garnet;
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
              module422.Products.Rubys,
              module422.Products.RubySC,
              module422.Products.RubysE,
              module422.Products.RubyPlus,
              module422.Products.Tanos_CN,
              module422.Products.Tanos_CE,
            ].hasElement(module422.DMM.currentProduct) || !t.isFCCOrCE()
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
            module422.Products.TanosS,
            module422.Products.TanosSPlus,
            module422.Products.TopazSV_CN,
            module422.Products.TopazSV_CE,
            module422.Products.TopazS,
            module422.Products.TopazSPlus,
            module422.Products.TanosSMax,
            module422.Products.TopazS_CE,
            module422.Products.TopazSPower,
          ];
          return !t.isFCC() && o.hasElement(module422.DMM.currentProduct);
        },
      },
      {
        key: 'isSelfAdaptionCarpetSupported',
        value: function () {
          return !([module422.Products.TanosSL].hasElement(module422.DMM.currentProduct) || (module422.DMM.isTopazSV && t.isFCC()));
        },
      },
      {
        key: 'isShowCarpetSweeperView',
        value: function () {
          return ![module422.Products.TanosSL].hasElement(module422.DMM.currentProduct) || !t.isFCC();
        },
      },
      {
        key: 'isCameraSupported',
        value: function () {
          return [module422.Products.TanosV_CN, module422.Products.TanosV_CE, module422.Products.TopazSV_CN, module422.Products.TopazSV_CE, module422.Products.TanosSV].hasElement(
            module422.DMM.currentProduct
          );
        },
      },
      {
        key: 'isStructuredLightSupported',
        value: function () {
          return [module422.Products.TanosSPlus, module422.Products.TanosSMax, module422.Products.TopazSPlus].hasElement(module422.DMM.currentProduct);
        },
      },
      {
        key: 'isShowGeneralObstacle',
        value: function () {
          return [module422.Products.TanosSPlus].hasElement(module422.DMM.currentProduct);
        },
      },
      {
        key: 'isWaterBoxSupported',
        value: function () {
          return [module422.Products.Tanos_CE, module422.Products.Tanos_CN].hasElement(module422.DMM.currentProduct);
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
            !![module422.Products.RubyPlus, module422.Products.Tanos_CN, module422.Products.Tanos_CE, module422.Products.TanosE].hasElement(module422.DMM.currentProduct) &&
            'cn' == module391.default.getAppLanguage()
          );
        },
      },
      {
        key: 'isObaAccount',
        value: function () {
          return (
            module511.ObaInfoString.ObaModels.indexOf(module393.deviceModel) > -1 ||
            module511.ObaInfoString.MiJaObaAccounts.indexOf(module393.userId) > -1 ||
            module511.ObaInfoString.ZiYouObaAccounts.indexOf(module393.userId) > -1
          );
        },
      },
      {
        key: 'isUseOldTitleInGuide',
        value: function () {
          return module422.DMM.isTanos || module422.DMM.isRubys || module422.DMM.isRubyPlus || module422.DMM.isRubysLite || module422.DMM.isRubySC;
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
          var o = [
            module422.Products.RubyPlus,
            module422.Products.Rubys,
            module422.Products.RubySC,
            module422.Products.RubysE,
            module422.Products.TopazS,
            module422.Products.TopazSPlus,
            module422.Products.TanosSC,
            module422.Products.TanosSE,
            module422.Products.TopazS_CE,
            module422.Products.TopazSPower,
          ];
          return undefined !== t.robotNewFeatures && !isNaN(t.robotNewFeatures) && !o.hasElement(module422.DMM.currentProduct) && !!(2 & t.robotNewFeatures);
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
            ['rr5a96285530fd50', '6339240', '2216005876', 'rr5ab8d94812fc60', 'rr5b3612de943c70'].findIndex(function (t) {
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
          return [module422.Products.Tanos_CN, module422.Products.TanosV_CN, module422.Products.TanosE].hasElement(module422.DMM.currentProduct) && !module393.isMiApp;
        },
      },
      {
        key: 'isCarpetPressurizeSwitchUseNewPara',
        value: function () {
          return [module422.Products.RubySC, module422.Products.RubysE, module422.Products.RubysLite].hasElement(module422.DMM.currentProduct);
        },
      },
      {
        key: 'shouldHideCarpetPressurize',
        value: function () {
          return module422.DMM.currentProduct == module422.Products.RubyPlus;
        },
      },
      {
        key: 'shouldHideMop',
        value: function () {
          return module422.DMM.currentProduct == module422.Products.RubyPlus;
        },
      },
      {
        key: 'shouldShowGuidePage',
        value: function () {
          var t = module422.DMM.supportedGuideLanguages;
          if (t.indexOf('*') > -1) return true;
          var o = module391.default.getAppLanguage();
          return -1 != t.indexOf(o);
        },
      },
      {
        key: 'shouldUpdateMenuDataByRobotLocation',
        value: function () {
          return module422.DMM.currentProduct == module422.Products.Rubys && 'tw' == t.deviceLocation;
        },
      },
      {
        key: 'shouldShowUseMoppingModuleGuide',
        value: function () {
          return [module422.Products.Tanos_CE, module422.Products.Tanos_CN, module422.Products.Rubys].hasElement(module422.DMM.currentProduct);
        },
      },
      {
        key: 'shouldShowOtherGuide',
        value: function () {
          return [module422.Products.TanosV_CE, module422.Products.TanosV_CN, module422.Products.TanosE].hasElement(module422.DMM.currentProduct) && t.shouldShowGuidePage();
        },
      },
      {
        key: 'shouldShowTroubleShootingGuide',
        value: function () {
          return ![module422.Products.TanosV_CE, module422.Products.TanosV_CN, module422.Products.TanosE].hasElement(module422.DMM.currentProduct) && t.shouldShowGuidePage();
        },
      },
      {
        key: 'isSupportForeCloseGuideVideo',
        value: function () {
          return module422.DMM.currentProduct == module422.Products.TanosE;
        },
      },
      {
        key: 'isSupportDisturbInVideoSetting',
        value: function () {
          return ![module422.Products.TanosV_CE, module422.Products.TopazSV_CE].hasElement(module422.DMM.currentProduct);
        },
      },
      {
        key: 'isSupportLedStatusSwitch',
        value: function () {
          return module422.Products.RubyPlus || t.isSupportFeature(119);
        },
      },
      {
        key: 'isLedSwitchVisible',
        value: function () {
          return module422.DMM.currentProduct != module422.Products.TanosS || t.isSupportFeature(119);
        },
      },
      {
        key: 'isNewCarpetPressurize',
        value: function () {
          return [module422.Products.RubySC, module422.Products.RubysE, module422.Products.RubysLite].hasElement(module422.DMM.currentProduct);
        },
      },
      {
        key: 'isSupportPetModeAlert',
        value: function () {
          return t.isCameraSupported() || t.isStructuredLightSupported();
        },
      },
      {
        key: 'isSupportFetchTimerSummary',
        value: function () {
          return module422.DMM.currentProduct != module422.Products.Tanos_CN && t.isSupportFeature(122);
        },
      },
      {
        key: 'isModelOrderSupported',
        value: function () {
          return (
            !![
              module422.Products.Rubys,
              module422.Products.TanosE,
              module422.Products.Tanos_CE,
              module422.Products.Tanos_CN,
              module422.Products.TanosV_CN,
              module422.Products.TanosV_CE,
              module422.Products.RubyPlus,
              module422.Products.RubySC,
              module422.Products.RubysLite,
            ].hasElement(module422.DMM.currentProduct) ||
            (!!t.deviceLocation && !t.isFCC())
          );
        },
      },
      {
        key: 'hasTranslateGuidePage',
        value: function (t) {
          var o = module422.DMM.translatedGuideLanguages;
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
          return module422.DMM.isV4 && !module393.isMiApp && (module422.DMM.isTanosV || module422.DMM.isTanosSPlus || module422.DMM.isTanosSMax);
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
            (module422.DMM.isTanosSMax ||
              module422.DMM.isTopazSPlus ||
              module422.DMM.isTopazSV ||
              module422.DMM.isTanosSC ||
              module422.DMM.isTanosSE ||
              module422.DMM.isTanosSL ||
              module422.DMM.isTopazS ||
              module422.DMM.isTopazSPower) &&
            module393.isSupport3DMap()
          );
        },
      },
      {
        key: 'isArMapSupported',
        value: function () {
          return t.is3DMapSupported() && module393.isSupport3DMap() && module393.isSupportLidar();
        },
      },
      {
        key: 'isPureCleanMopSupported',
        value: function () {
          return (
            module422.DMM.isTopazS ||
            module422.DMM.isTopazSV ||
            module422.DMM.isTopazSPlus ||
            module422.DMM.isTanosSMax ||
            module422.DMM.isTanosS ||
            module422.DMM.isTanosSPlus ||
            module422.DMM.isTopazSPower
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
          return (
            !(
              module422.DMM.isV1 &&
              !(
                module422.DMM.isTopazSV ||
                module422.DMM.isTopazSPlus ||
                module422.DMM.isTanosSL ||
                module422.DMM.isTanosSC ||
                module422.DMM.isTanosSE ||
                module422.DMM.isTanosSMax ||
                module422.DMM.isTopazSPower ||
                module422.DMM.isTopazS
              )
            ) &&
            (t.is3DMapSupported() || t.isArMapSupported())
          );
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
          return [module422.Products.TanosSC, module422.Products.TanosSE, module422.Products.TanosSL].hasElement(module422.DMM.currentProduct);
        },
      },
      {
        key: 'isObjectPhotoShowSupported',
        value: function () {
          return ![module422.Products.TanosSPlus, module422.Products.TanosSMax, module422.Products.TopazSPlus].hasElement(module422.DMM.currentProduct);
        },
      },
      {
        key: 'isDynamicAdaptionCarpetSupported',
        value: function () {
          return module422.DMM.isTopazSV && t.isFCC();
        },
      },
      {
        key: 'isNewRemoteViewSupported',
        value: function () {
          return (
            module422.DMM.isTopazSPlus ||
            module422.DMM.isTanos ||
            module422.DMM.isTanosV ||
            module422.DMM.isTanosE ||
            module422.DMM.isTanosS ||
            module422.DMM.isTanosSPlus ||
            module422.DMM.isTanosSMax ||
            module422.DMM.isGarnet ||
            module422.DMM.isTopazS ||
            module422.DMM.isTanosSV ||
            module422.DMM.isTopazSV
          );
        },
      },
      {
        key: 'isOpenMiShopSupported',
        value: function () {
          return !(
            (module422.DMM.isTopazS ||
              module422.DMM.isTopazSPlus ||
              module422.DMM.isTopazSV ||
              module422.DMM.isTanosSL ||
              module422.DMM.isTanosSE ||
              module422.DMM.isTanosSC ||
              module422.DMM.isTanosSMax) &&
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
          return module422.DMM.isTopazSV || module422.DMM.isTanosSMax || module422.DMM.isTopazSPlus || module422.DMM.isTopazSPower;
        },
      },
      {
        key: 'isSupportedDrying',
        value: function () {
          return !!(t.robotNewFeatures && ((t.robotNewFeatures / 2 ** 32) >> 15) & 1 && (module381.RSM.isO3Dock() || (module381.RSM.isO2Dock() && 'cn' == t.deviceLocation)));
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
    ]);
    return t;
  })();

exports.default = S;
S.robotFeatures = null;
S.robotNewFeatures = null;
S.deviceLocation = null;
S.newFeatureInfoStr = '';
