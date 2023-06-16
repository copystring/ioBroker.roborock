var module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module385 = require('./385'),
  module1340 = require('./1340'),
  module390 = require('./390'),
  module416 = require('./416'),
  module424 = require('./424'),
  module381 = require('./381'),
  module387 = require('./387'),
  module1193 = require('./1193'),
  module1341 = require('./1341');

function y() {
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

var module510 = require('./510').strings,
  module1337 = require('./1337'),
  module389 = require('./389'),
  k = (function (t) {
    module9.default(V, t);

    var module1193 = V,
      module1337 = y(),
      k = function () {
        var t,
          n = module12.default(module1193);

        if (module1337) {
          var l = module12.default(this).constructor;
          t = Reflect.construct(n, arguments, l);
        } else t = n.apply(this, arguments);

        return module11.default(this, t);
      };

    function V(t) {
      var l;
      module6.default(this, V);
      (l = k.call(this, t)).dataProvider = module390.default.isMultiFloorSupported() ? new module1341.MultiMapDataProvider() : new module1341.SingleMapDataProvider();
      l.navigator = t.navigator;
      return l;
    }

    module7.default(V, [
      {
        key: 'show',
        value: function () {
          var t, n;
          if (!(null == (t = (n = this.multiMapSwitchItem).show))) t.call(n);
        },
      },
      {
        key: 'dismissModalView',
        value: function () {
          var t, n;
          if (!(null == (t = (n = this.multiMapSwitchItem).dismissModalView))) t.call(n);
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = module390.default.isSupportQuickMapBuilder()
              ? [module510.confirm_start, module510.quick_build_map_start]
              : [module510.localization_strings_Main_MainPage_11, module510.confirm_start],
            l = module390.default.isSupportQuickMapBuilder()
              ? module510.multi_map_start_build_text_1 +
                '\n' +
                module510.multi_map_start_build_text_2 +
                '\n' +
                module510.multi_map_start_build_text_3 +
                '\n' +
                module510.multi_map_start_build_text_4
              : module510.multi_map_start_build_text_1 + '\n' + module510.multi_map_start_build_text_2 + '\n' + module510.multi_map_start_build_text_3,
            o = React.default.createElement(module1340.default, {
              ref: function (n) {
                t.multiMapSwitchItem = n;
              },
              isModal: this.props.isModal,
              bgImage: this.context.theme.guideImages.createMap,
              topTitle: module510.multi_map_start_build_title,
              context: l,
              buttonInfo: n,
              buttonFuncId: ['multi_map_left', 'multi_map_right'],
              onPressLeftButton: function () {
                if (module390.default.isSupportQuickMapBuilder()) {
                  if (!(null == t.onTapCreateNewMapConfirm)) t.onTapCreateNewMapConfirm();
                } else t.multiMapSwitchItem.dismissModalView();
              },
              onPressGoSetting: function () {
                if (module390.default.isSupportQuickMapBuilder()) {
                  if (!(null == t.onTapCreateNewMapConfirm)) t.onTapCreateNewMapConfirm(true);
                } else if (!(null == t.onTapCreateNewMapConfirm)) t.onTapCreateNewMapConfirm();
              },
              hasCloseButton: module390.default.isSupportQuickMapBuilder(),
            }),
            u = React.default.createElement(
              module13.View,
              {
                style: [
                  x.container,
                  {
                    backgroundColor: 'transparent',
                  },
                ],
              },
              React.default.createElement(module385.CancelableLoadingView, {
                loadingAccessibilityLabelKey: 'multi_floor_view_loading',
                closeAccessibilityLabelKey: 'multi_floor_view_loading_close',
                ref: function (n) {
                  t.globalLoadingView = n;
                },
                showButton: true,
                onPressCancel: function () {},
              })
            );
          return React.default.createElement(module13.View, null, o, u);
        },
      },
      {
        key: 'onTapCreateNewMapConfirm',
        value: function () {
          var t,
            n = this,
            l = arguments.length > 0 && undefined !== arguments[0] && arguments[0],
            o = {
              text: module510.localization_strings_Main_MainPage_11,
            },
            u = {
              text: module510.localization_strings_Main_Error_ErrorDetailPage_3,
              onPress: function () {
                return n.dataProvider.stopRobot();
              },
            };
          if ((this.multiMapSwitchItem.dismissModalView(), null == (t = this.props) || null == t.onPressCreateMap || t.onPressCreateMap(), module381.RSM.isRunning))
            globals.Alert.alert(module510.start_create_new_map_title, '', [o, u]);
          else {
            if (this.globalLoadingView) this.globalLoadingView.showWithText();

            var s,
              c = 0,
              p = l ? this.dataProvider.quickCreateMap : this.dataProvider.createNewMap,
              _ = function () {
                var t;

                if (module381.RSM.battery < 20) {
                  if (!(null == (t = n.globalLoadingView) || null == t.hide)) t.hide();
                  return void globals.showToast(module510.localization_strings_Main_Constants_33);
                }

                p()
                  .then(function () {
                    n.createMapLoopChecker = setInterval(function () {
                      var t, l, o;

                      if (c > 50) {
                        if (n.createMapLoopChecker) clearInterval(n.createMapLoopChecker);
                        if (!(null == (t = n.globalLoadingView) || null == t.hide)) t.hide();
                        return void globals.showToast(module510.map_reset_page_operate_fail);
                      }

                      if (module381.RSM.isRunning) {
                        if (n.createMapLoopChecker) clearInterval(n.createMapLoopChecker);
                        if (!(null == (l = n.globalLoadingView) || null == l.hide)) l.hide();
                        if (!(null == (o = n.navigator) || null == o.popToTop)) o.popToTop();
                      } else c++;
                    }, 100);
                  })
                  .catch(function (t) {
                    var l;
                    console.log('Error: ' + t);
                    if (!(null == (l = n.globalLoadingView) || null == l.hide)) l.hide();
                    globals.showToast(module510.map_object_ignore_failed);
                  });
                module387.LogEventStat(module387.LogEventMap.MultiMapCreateNewMap);
              },
              f = module390.default.isCarpetSupported() && !module424.DMM.isGarnet;

            if (l && f) {
              if (!(null == (s = this.globalLoadingView))) s.showWithText();
              module416.default
                .getCarpetCleanMode()
                .then(function (t) {
                  if (t.result[0].carpet_clean_mode == module389.CarPetCleanModeSettingMap.CarpetAvoidMode) {
                    var l = {
                        text: module510.localization_strings_Main_MainPage_11,
                      },
                      o = {
                        text: module510.go_to_settings,
                        onPress: function () {
                          var t;
                          return null == (t = n.navigator) ? undefined : null == t.navigate ? undefined : t.navigate('CarpetCleanModeSetting');
                        },
                      };
                    globals.Alert.alert(module510.quick_create_map_alert_title, '', [l, o]);
                  } else _();
                })
                .catch(function (t) {
                  globals.showToast(module510.map_object_ignore_failed);
                })
                .finally(function () {
                  var t;
                  if (!(null == (t = n.globalLoadingView))) t.hide();
                });
            } else _();
          }
        },
      },
    ]);
    return V;
  })(React.default.Component);

exports.default = k;
k.contextType = module1193.AppConfigContext;
var x = module13.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginTop: module1337.NavigationBarHeight,
  },
});
