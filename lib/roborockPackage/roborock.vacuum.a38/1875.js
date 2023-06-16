require('./1876');

require('./1879');

require('./1882');

require('./381');

require('./422');

var module22 = require('./22'),
  regeneratorRuntime = require('regenerator-runtime'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module385 = require('./385'),
  module1523 = require('./1523'),
  module387 = require('./387'),
  module418 = require('./418'),
  module1877 = require('./1877'),
  module390 = require('./390'),
  module515 = require('./515');

function w() {
  if ('undefined' == typeof Reflect || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if ('function' == typeof Proxy) return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (t) {
    return false;
  }
}

require('./393');

require('./389');

var module1153 = require('./1153'),
  module500 = require('./500').strings,
  b = module12.Dimensions.get('window'),
  C = b.width,
  V = (function (t) {
    module7.default(V, t);

    var module515 = V,
      module1153 = w(),
      b = function () {
        var t,
          o = module11.default(module515);

        if (module1153) {
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
            title: module500.localization_strings_Setting_Guide_GuideDetailPage_0,
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
                    return regeneratorRuntime.default.awrap(module418.DelStorageKey(module418.StorageKeys.HasShownFullChargeReminder));

                  case 2:
                    t.next = 4;
                    return regeneratorRuntime.default.awrap(module418.DelStorageKey(module418.StorageKeys.HasShownNotDisturbReminder));

                  case 4:
                    t.next = 6;
                    return regeneratorRuntime.default.awrap(module418.DelStorageKey(module418.StorageKeys.MapEditNewbyGuide + 'menu2'));

                  case 6:
                    t.next = 8;
                    return regeneratorRuntime.default.awrap(module418.DelStorageKey(module418.StorageKeys.MapEditNewbyGuide + 'menu3'));

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
            l = this.getMenuData().map(function (t, l) {
              return t.visible
                ? t.title
                  ? React.default.createElement(
                      module385.SettingListItemView,
                      module22.default({}, t, {
                        key: l,
                        style: {
                          width: module12.Dimensions.get('window').width,
                        },
                      })
                    )
                  : React.default.createElement(module12.View, {
                      style: T.section,
                      key: l,
                    })
                : React.default.createElement(module12.View, {
                    key: l,
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
              React.default.createElement(module1877.default, {
                style: {
                  flex: 1,
                  height: 300,
                  width: C,
                  alignSelf: 'stretch',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
                url: module1523.default.MainVideoUrl(),
                posterUrl: module1523.default.MainVideoPosterUrl(),
              }),
              l
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
              title: module1523.default.GuideTitle1(),
              onPress: this.onOpenGuideDetailPage.bind(this, 1),
              videoUrl: '',
              videoPosterUrl: '',
              guideUrl: module1523.default.IntroduceRobotGuideUrl(),
              short_separator: true,
              height_4s: 2750,
              height_6: 2925,
              height_6p: 3100,
              visible: module390.default.shouldShowGuidePage(),
              logEvent: module387.LogEventMap.GuideKnowYourRobot,
              foreCloseVideo: false,
              shouldShowTopLongLine: true,
            },
            {
              title: module1523.default.GuideTitle2(),
              onPress: this.onOpenGuideDetailPage.bind(this, 2),
              videoUrl: module1523.default.QuickStartVideoUrl(),
              videoPosterUrl: module1523.default.MainVideoPosterUrl(),
              guideUrl: module1523.default.QuickStartGuideUrl(),
              short_separator: true,
              height_4s: 2450,
              height_6: 2455,
              height_6p: 2455,
              visible: module390.default.shouldShowGuidePage(),
              logEvent: module387.LogEventMap.GuideQuickStart,
              foreCloseVideo: false,
            },
            {
              title: module1523.default.GuideTitle2_2(),
              onPress: this.onOpenGuideDetailPage.bind(this, 3),
              videoUrl: module1523.default.UseMoppingModuleVideoUrl(),
              videoPosterUrl: module1523.default.UseMoppingModulePosterUrl(),
              guideUrl: module1523.default.UseMoppingModuleGuideUrl(),
              short_separator: true,
              height_4s: 2800,
              height_6: 2800,
              height_6p: 2800,
              visible: module390.default.shouldShowUseMoppingModuleGuide(),
              foreCloseVideo: false,
            },
            {
              title: module1523.default.GuideTitle3(),
              onPress: this.onOpenGuideDetailPage.bind(this, 4),
              videoUrl: module1523.default.MachineWorksVideoUrl(),
              videoPosterUrl: module1523.default.MachineWorksPosterUrl(),
              guideUrl: module1523.default.MachineWorksGuideUrl(),
              short_separator: true,
              height_4s: 5300,
              height_6: 5100,
              height_6p: 5200,
              visible: module390.default.shouldShowGuidePage(),
              logEvent: module387.LogEventMap.GuideHowToWork,
              foreCloseVideo: false,
            },
            {
              title: module1523.default.GuideTitle4(),
              onPress: this.onOpenGuideDetailPage.bind(this, 5),
              videoUrl: module1523.default.CleanWashableFilterVideoUrl(),
              videoPosterUrl: module1523.default.CleanWashableFilterPosterUrl(),
              guideUrl: module1523.default.CleanWashableFilterGuideUrl(),
              short_separator: true,
              height_4s: 2390,
              height_6: 2410,
              height_6p: 2440,
              visible: module390.default.shouldShowGuidePage(),
              foreCloseVideo: false,
            },
            {
              title: module1523.default.GuideTitle5(),
              onPress: this.onOpenGuideDetailPage.bind(this, 6),
              videoUrl: module1523.default.Guide5VideoUrl(),
              videoPosterUrl: module1523.default.Guide5PosterUrl(),
              guideUrl: module1523.default.Guide5Url(),
              short_separator: true,
              height_4s: 2390,
              height_6: 2410,
              height_6p: 2440,
              visible: module390.default.shouldShowOtherGuide(),
              foreCloseVideo: module390.default.isSupportForeCloseGuideVideo(),
            },
            {
              title: module1523.default.GuideTitle6(),
              onPress: this.onOpenGuideDetailPage.bind(this, 7),
              videoUrl: module1523.default.RoutineMaintenanceVideoUrl(),
              videoPosterUrl: module1523.default.RoutineMaintenancePosterUrl(),
              guideUrl: module1523.default.RoutineMaintenanceGuideUrl(),
              short_separator: true,
              height_4s: 4200,
              height_6: 4290,
              height_6p: 4410,
              visible: module390.default.shouldShowGuidePage(),
              logEvent: module387.LogEventMap.GuideDailyMaintain,
              foreCloseVideo: module390.default.isSupportForeCloseGuideVideo(),
              shouldShowBottomLongLine: !module390.default.isUseOldTitleInGuide(),
            },
            {
              title: module1523.default.GuideTitle7(),
              onPress: this.onOpenGuideDetailPage.bind(this, 8),
              videoUrl: '',
              videoPosterUrl: '',
              guideUrl: module1523.default.TroubleshootingGuideUrl(),
              short_separator: false,
              height_4s: 2100,
              height_6: 2230,
              height_6p: 2400,
              visible: module390.default.shouldShowTroubleShootingGuide(),
              logEvent: module387.LogEventMap.GuideMalfunctionRemoval,
              foreCloseVideo: false,
              shouldShowBottomLongLine: true,
            },
          ];
        },
      },
      {
        key: 'updateMenuDataByRobotLocation',
        value: function () {
          if (module390.default.shouldUpdateMenuDataByRobotLocation()) {
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
          module387.LogEventCommon('tap_guide_item', {
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
V.contextType = module515.AppConfigContext;
var T = module12.StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: '#f5f5f5',
    marginBottom: 0,
    marginTop: module1153.NavigationBarHeight,
  },
  section: {
    paddingVertical: 5,
  },
});
