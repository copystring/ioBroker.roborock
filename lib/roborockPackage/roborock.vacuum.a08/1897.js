require('./1898');

require('./1901');

require('./1904');

require('./377');

require('./415');

var regeneratorRuntime = require('regenerator-runtime'),
  module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module381 = require('./381'),
  module1378 = require('./1378'),
  module383 = require('./383'),
  module411 = require('./411'),
  module1899 = require('./1899'),
  module386 = require('./386'),
  module506 = require('./506');

function w() {
  if ('undefined' == typeof Reflect || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if ('function' == typeof Proxy) return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (t) {
    return false;
  }
}

require('./389');

require('./385');

var module936 = require('./936'),
  module491 = require('./491').strings,
  b = module12.Dimensions.get('window'),
  C = b.width,
  V = (function (t) {
    module7.default(V, t);

    var module506 = V,
      module936 = w(),
      b = function () {
        var t,
          o = module11.default(module506);

        if (module936) {
          var l = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, l);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function V(t) {
      var o;
      module4.default(this, V);
      (o = b.call(this, t)).clearCacheButtonClickedTimes = 0;
      o.pressTitleCount = 0;
      o.state = {
        menuData: [],
      };
      return o;
    }

    module5.default(V, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          this.updateMenuDataByRobotLocation();
        },
      },
      {
        key: 'componentDidMount',
        value: function () {
          this.setState({
            menuData: this.getMenuData(),
          });
          this.props.navigation.setParams({
            title: module491.localization_strings_Setting_Guide_GuideDetailPage_0,
            onPressTitle: this.onPressTitle.bind(this),
          });
        },
      },
      {
        key: 'onPressTitle',
        value: function () {
          console.log('onPressTitle');
          this.pressTitleCount++;

          if (this.pressTitleCount >= 5) {
            this.pressTitleCount = 0;
            this.clearLocalStorage();
          }
        },
      },
      {
        key: 'clearLocalStorage',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    t.next = 2;
                    return regeneratorRuntime.default.awrap(module411.DelStorageKey(module411.StorageKeys.HasShownFullChargeReminder));

                  case 2:
                    t.next = 4;
                    return regeneratorRuntime.default.awrap(module411.DelStorageKey(module411.StorageKeys.HasShownNotDisturbReminder));

                  case 4:
                    t.next = 6;
                    return regeneratorRuntime.default.awrap(module411.DelStorageKey(module411.StorageKeys.MapEditNewbyGuide + 'menu2'));

                  case 6:
                    t.next = 8;
                    return regeneratorRuntime.default.awrap(module411.DelStorageKey(module411.StorageKeys.MapEditNewbyGuide + 'menu3'));

                  case 8:
                  case 'end':
                    return t.stop();
                }
            },
            null,
            null,
            null,
            Promise
          );
        },
      },
      {
        key: 'forceRefreshForTestMode',
        value: function () {
          this.setState({
            menuData: this.getMenuData(),
          });
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this.context.theme,
            o = this.getMenuData().map(function (t, o) {
              return t.visible
                ? t.title
                  ? React.default.createElement(
                      module381.SettingListItemView,
                      module21.default({}, t, {
                        key: o,
                        style: {
                          width: module12.Dimensions.get('window').width,
                        },
                      })
                    )
                  : React.default.createElement(module12.View, {
                      style: T.section,
                      key: o,
                    })
                : React.default.createElement(module12.View, {
                    key: o,
                  });
            });
          return React.default.createElement(
            module12.View,
            {
              style: [
                T.container,
                {
                  backgroundColor: t.settingBackgroundColor,
                },
              ],
            },
            React.default.createElement(
              module12.ScrollView,
              {
                style: T.containter,
                showsVerticalScrollIndicator: false,
              },
              React.default.createElement(module1899.default, {
                style: {
                  flex: 1,
                  height: 300,
                  width: C,
                  alignSelf: 'stretch',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
                url: module1378.default.MainVideoUrl(),
                posterUrl: module1378.default.MainVideoPosterUrl(),
              }),
              o
            )
          );
        },
      },
      {
        key: 'getMenuData',
        value: function () {
          return [
            {
              visible: true,
            },
            {
              title: module1378.default.GuideTitle1(),
              onPress: this.onOpenGuideDetailPage.bind(this, 1),
              videoUrl: '',
              videoPosterUrl: '',
              guideUrl: module1378.default.IntroduceRobotGuideUrl(),
              short_separator: true,
              height_4s: 2750,
              height_6: 2925,
              height_6p: 3100,
              visible: module386.default.shouldShowGuidePage(),
              logEvent: module383.LogEventMap.GuideKnowYourRobot,
              foreCloseVideo: false,
              shouldShowTopLongLine: true,
            },
            {
              title: module1378.default.GuideTitle2(),
              onPress: this.onOpenGuideDetailPage.bind(this, 2),
              videoUrl: module1378.default.QuickStartVideoUrl(),
              videoPosterUrl: module1378.default.MainVideoPosterUrl(),
              guideUrl: module1378.default.QuickStartGuideUrl(),
              short_separator: true,
              height_4s: 2450,
              height_6: 2455,
              height_6p: 2455,
              visible: module386.default.shouldShowGuidePage(),
              logEvent: module383.LogEventMap.GuideQuickStart,
              foreCloseVideo: false,
            },
            {
              title: module1378.default.GuideTitle2_2(),
              onPress: this.onOpenGuideDetailPage.bind(this, 3),
              videoUrl: module1378.default.UseMoppingModuleVideoUrl(),
              videoPosterUrl: module1378.default.UseMoppingModulePosterUrl(),
              guideUrl: module1378.default.UseMoppingModuleGuideUrl(),
              short_separator: true,
              height_4s: 2800,
              height_6: 2800,
              height_6p: 2800,
              visible: module386.default.shouldShowUseMoppingModuleGuide(),
              foreCloseVideo: false,
            },
            {
              title: module1378.default.GuideTitle3(),
              onPress: this.onOpenGuideDetailPage.bind(this, 4),
              videoUrl: module1378.default.MachineWorksVideoUrl(),
              videoPosterUrl: module1378.default.MachineWorksPosterUrl(),
              guideUrl: module1378.default.MachineWorksGuideUrl(),
              short_separator: true,
              height_4s: 5300,
              height_6: 5100,
              height_6p: 5200,
              visible: module386.default.shouldShowGuidePage(),
              logEvent: module383.LogEventMap.GuideHowToWork,
              foreCloseVideo: false,
            },
            {
              title: module1378.default.GuideTitle4(),
              onPress: this.onOpenGuideDetailPage.bind(this, 5),
              videoUrl: module1378.default.CleanWashableFilterVideoUrl(),
              videoPosterUrl: module1378.default.CleanWashableFilterPosterUrl(),
              guideUrl: module1378.default.CleanWashableFilterGuideUrl(),
              short_separator: true,
              height_4s: 2390,
              height_6: 2410,
              height_6p: 2440,
              visible: module386.default.shouldShowGuidePage(),
              foreCloseVideo: false,
            },
            {
              title: module1378.default.GuideTitle5(),
              onPress: this.onOpenGuideDetailPage.bind(this, 6),
              videoUrl: module1378.default.Guide5VideoUrl(),
              videoPosterUrl: module1378.default.Guide5PosterUrl(),
              guideUrl: module1378.default.Guide5Url(),
              short_separator: true,
              height_4s: 2390,
              height_6: 2410,
              height_6p: 2440,
              visible: module386.default.shouldShowOtherGuide(),
              foreCloseVideo: module386.default.isSupportForeCloseGuideVideo(),
            },
            {
              title: module1378.default.GuideTitle6(),
              onPress: this.onOpenGuideDetailPage.bind(this, 7),
              videoUrl: module1378.default.RoutineMaintenanceVideoUrl(),
              videoPosterUrl: module1378.default.RoutineMaintenancePosterUrl(),
              guideUrl: module1378.default.RoutineMaintenanceGuideUrl(),
              short_separator: true,
              height_4s: 4200,
              height_6: 4290,
              height_6p: 4410,
              visible: module386.default.shouldShowGuidePage(),
              logEvent: module383.LogEventMap.GuideDailyMaintain,
              foreCloseVideo: module386.default.isSupportForeCloseGuideVideo(),
              shouldShowBottomLongLine: !module386.default.isUseOldTitleInGuide(),
            },
            {
              title: module1378.default.GuideTitle7(),
              onPress: this.onOpenGuideDetailPage.bind(this, 8),
              videoUrl: '',
              videoPosterUrl: '',
              guideUrl: module1378.default.TroubleshootingGuideUrl(),
              short_separator: false,
              height_4s: 2100,
              height_6: 2230,
              height_6p: 2400,
              visible: module386.default.shouldShowTroubleShootingGuide(),
              logEvent: module383.LogEventMap.GuideMalfunctionRemoval,
              foreCloseVideo: false,
              shouldShowBottomLongLine: true,
            },
          ];
        },
      },
      {
        key: 'updateMenuDataByRobotLocation',
        value: function () {
          if (module386.default.shouldUpdateMenuDataByRobotLocation()) {
            var t = this.state.menuData;
            t[4].guideUrl = this.state.menuData[4].guideUrl.split('.html')[0] + '_tw.html';
            t[8].guideUrl = this.state.menuData[8].guideUrl.split('.html')[0] + '_tw.html';
            t[10].guideUrl = this.state.menuData[10].guideUrl.split('.html')[0] + '_tw.html';
            this.setState({
              menuData: t,
            });
          }
        },
      },
      {
        key: 'onOpenGuideDetailPage',
        value: function (t) {
          var o = this.getMenuData()[t];
          module383.LogEventCommon('tap_guide_item', {
            position: t,
          });
          this.props.navigation.navigate('GuideDetailPage', {
            contentProps: o,
            title: o.title,
          });
        },
      },
    ]);
    return V;
  })(React.default.PureComponent);

exports.default = V;
V.contextType = module506.AppConfigContext;
var T = module12.StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: '#f5f5f5',
    marginBottom: 0,
    marginTop: module936.NavigationBarHeight,
  },
  section: {
    paddingVertical: 5,
  },
});
