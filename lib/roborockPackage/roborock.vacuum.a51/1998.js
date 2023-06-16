require('./1999');

require('./2002');

require('./2005');

require('./381');

require('./424');

var module22 = require('./22'),
  regeneratorRuntime = require('regenerator-runtime'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module385 = require('./385'),
  module1648 = require('./1648'),
  module387 = require('./387'),
  module420 = require('./420'),
  module2000 = require('./2000'),
  module390 = require('./390'),
  module1193 = require('./1193');

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

var module1337 = require('./1337'),
  module510 = require('./510').strings,
  b = module13.Dimensions.get('window'),
  C = b.width,
  V = (function (t) {
    module9.default(V, t);

    var module1193 = V,
      module1337 = w(),
      b = function () {
        var t,
          o = module12.default(module1193);

        if (module1337) {
          var l = module12.default(this).constructor;
          t = Reflect.construct(o, arguments, l);
        } else t = o.apply(this, arguments);

        return module11.default(this, t);
      };

    function V(t) {
      var o;
      module6.default(this, V);
      (o = b.call(this, t)).clearCacheButtonClickedTimes = 0;
      o.pressTitleCount = 0;
      o.state = {
        menuData: [],
      };
      return o;
    }

    module7.default(V, [
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
            title: module510.localization_strings_Setting_Guide_GuideDetailPage_0,
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
                    return regeneratorRuntime.default.awrap(module420.DelStorageKey(module420.StorageKeys.HasShownFullChargeReminder));

                  case 2:
                    t.next = 4;
                    return regeneratorRuntime.default.awrap(module420.DelStorageKey(module420.StorageKeys.HasShownNotDisturbReminder));

                  case 4:
                    t.next = 6;
                    return regeneratorRuntime.default.awrap(module420.DelStorageKey(module420.StorageKeys.MapEditNewbyGuide + 'menu2'));

                  case 6:
                    t.next = 8;
                    return regeneratorRuntime.default.awrap(module420.DelStorageKey(module420.StorageKeys.MapEditNewbyGuide + 'menu3'));

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
                          width: module13.Dimensions.get('window').width,
                        },
                      })
                    )
                  : React.default.createElement(module13.View, {
                      style: T.section,
                      key: l,
                    })
                : React.default.createElement(module13.View, {
                    key: l,
                  });
            });
          return React.default.createElement(
            module13.View,
            {
              style: [
                T.container,
                {
                  backgroundColor: t.settingBackgroundColor,
                },
              ],
            },
            React.default.createElement(
              module13.ScrollView,
              {
                style: T.containter,
                showsVerticalScrollIndicator: false,
              },
              React.default.createElement(module2000.default, {
                style: {
                  flex: 1,
                  height: 300,
                  width: C,
                  alignSelf: 'stretch',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
                url: module1648.default.MainVideoUrl(),
                posterUrl: module1648.default.MainVideoPosterUrl(),
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
              title: module1648.default.GuideTitle1(),
              onPress: this.onOpenGuideDetailPage.bind(this, 1),
              videoUrl: '',
              videoPosterUrl: '',
              guideUrl: module1648.default.IntroduceRobotGuideUrl(),
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
              title: module1648.default.GuideTitle2(),
              onPress: this.onOpenGuideDetailPage.bind(this, 2),
              videoUrl: module1648.default.QuickStartVideoUrl(),
              videoPosterUrl: module1648.default.MainVideoPosterUrl(),
              guideUrl: module1648.default.QuickStartGuideUrl(),
              short_separator: true,
              height_4s: 2450,
              height_6: 2455,
              height_6p: 2455,
              visible: module390.default.shouldShowGuidePage(),
              logEvent: module387.LogEventMap.GuideQuickStart,
              foreCloseVideo: false,
            },
            {
              title: module1648.default.GuideTitle2_2(),
              onPress: this.onOpenGuideDetailPage.bind(this, 3),
              videoUrl: module1648.default.UseMoppingModuleVideoUrl(),
              videoPosterUrl: module1648.default.UseMoppingModulePosterUrl(),
              guideUrl: module1648.default.UseMoppingModuleGuideUrl(),
              short_separator: true,
              height_4s: 2800,
              height_6: 2800,
              height_6p: 2800,
              visible: module390.default.shouldShowUseMoppingModuleGuide(),
              foreCloseVideo: false,
            },
            {
              title: module1648.default.GuideTitle3(),
              onPress: this.onOpenGuideDetailPage.bind(this, 4),
              videoUrl: module1648.default.MachineWorksVideoUrl(),
              videoPosterUrl: module1648.default.MachineWorksPosterUrl(),
              guideUrl: module1648.default.MachineWorksGuideUrl(),
              short_separator: true,
              height_4s: 5300,
              height_6: 5100,
              height_6p: 5200,
              visible: module390.default.shouldShowGuidePage(),
              logEvent: module387.LogEventMap.GuideHowToWork,
              foreCloseVideo: false,
            },
            {
              title: module1648.default.GuideTitle4(),
              onPress: this.onOpenGuideDetailPage.bind(this, 5),
              videoUrl: module1648.default.CleanWashableFilterVideoUrl(),
              videoPosterUrl: module1648.default.CleanWashableFilterPosterUrl(),
              guideUrl: module1648.default.CleanWashableFilterGuideUrl(),
              short_separator: true,
              height_4s: 2390,
              height_6: 2410,
              height_6p: 2440,
              visible: module390.default.shouldShowGuidePage(),
              foreCloseVideo: false,
            },
            {
              title: module1648.default.GuideTitle5(),
              onPress: this.onOpenGuideDetailPage.bind(this, 6),
              videoUrl: module1648.default.Guide5VideoUrl(),
              videoPosterUrl: module1648.default.Guide5PosterUrl(),
              guideUrl: module1648.default.Guide5Url(),
              short_separator: true,
              height_4s: 2390,
              height_6: 2410,
              height_6p: 2440,
              visible: module390.default.shouldShowOtherGuide(),
              foreCloseVideo: module390.default.isSupportForeCloseGuideVideo(),
            },
            {
              title: module1648.default.GuideTitle6(),
              onPress: this.onOpenGuideDetailPage.bind(this, 7),
              videoUrl: module1648.default.RoutineMaintenanceVideoUrl(),
              videoPosterUrl: module1648.default.RoutineMaintenancePosterUrl(),
              guideUrl: module1648.default.RoutineMaintenanceGuideUrl(),
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
              title: module1648.default.GuideTitle7(),
              onPress: this.onOpenGuideDetailPage.bind(this, 8),
              videoUrl: '',
              videoPosterUrl: '',
              guideUrl: module1648.default.TroubleshootingGuideUrl(),
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
V.contextType = module1193.AppConfigContext;
var T = module13.StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: '#f5f5f5',
    marginBottom: 0,
    marginTop: module1337.NavigationBarHeight,
  },
  section: {
    paddingVertical: 5,
  },
});
