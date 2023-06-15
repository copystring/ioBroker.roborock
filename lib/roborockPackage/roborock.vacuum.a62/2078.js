var regeneratorRuntime = require('regenerator-runtime'),
  module22 = require('./22'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module385 = require('./385'),
  module415 = require('./415'),
  module1121 = require('./1121'),
  module381 = require('./381'),
  module390 = require('./390'),
  module1425 = require('./1425');

function D() {
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

var module505 = require('./505').strings,
  module1265 = require('./1265'),
  R = (function (t) {
    module7.default(R, t);

    var n = R,
      module1121 = D(),
      V = function () {
        var t,
          o = module11.default(n);

        if (module1121) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, s);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function R(t) {
      var n;
      module4.default(this, R);

      (n = V.call(this, t)).sectionComp = function () {
        return React.default.createElement(module12.View, {
          style: {
            height: 15,
            backgroundColor: n.context.theme.settingBackgroundColor,
          },
        });
      };

      n.renderListRow = function (t) {
        var n = t.index,
          o = t.section.data.length,
          l = t.item;
        return React.default.createElement(
          module385.SettingListItemView,
          module22.default({}, l, {
            key: n,
            shouldShowBottomLine: n < o - 1,
            bottomLineStyle: {
              width: module12.Dimensions.get('window').width - 50,
            },
            touchStyle: [
              {
                borderTopLeftRadius: 0 == n ? 8 : 0,
              },
              {
                borderTopRightRadius: 0 == n ? 8 : 0,
              },
              {
                borderBottomLeftRadius: n == o - 1 ? 8 : 0,
              },
              {
                borderBottomRightRadius: n == o - 1 ? 8 : 0,
              },
            ],
          })
        );
      };

      var o = t.navigation.state.params || {};
      n.state = {
        resumeSwitch: o.resumeSwitch,
        volSwitch: o.volSwitch,
        ledSwitch: o.ledSwitch,
        dustSwitch: o.dustSwitch,
        drySwitch: o.drySwitch,
        loading: true,
      };
      return n;
    }

    module5.default(R, [
      {
        key: 'componentDidMount',
        value: function () {
          this.props.navigation.setParams({
            navBarBackgroundColor: this.context.theme.settingBackgroundColor,
            hiddenBottomLine: true,
          });
          this.getDndConfig();
        },
      },
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {},
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          this.saveCustomDnd();
        },
      },
      {
        key: 'getMenuDatas',
        value: function () {
          for (
            var t = [
                {
                  data: [
                    {
                      title: module505.localization_strings_Setting_DoNotDisturbPage_3,
                      funcId: 'robot_setting_page_donot_disturb_resume',
                      shouldShowSwitch: true,
                      switchOn: this.state.resumeSwitch,
                      switchValueChanged: this._onResumeSwitchValueChanged.bind(this),
                      visible: true,
                      shouldShowBottomLine: true,
                    },
                    {
                      title: module505.localization_strings_Setting_DoNotDisturbPage_4,
                      funcId: 'robot_setting_page_donot_disturb_vol',
                      shouldShowSwitch: true,
                      switchOn: this.state.volSwitch,
                      switchValueChanged: this._onVolSwitchValueChanged.bind(this),
                      visible: true,
                      shouldShowBottomLine: true,
                    },
                    {
                      title: module505.localization_strings_Setting_DoNotDisturbPage_5,
                      funcId: 'robot_setting_page_donot_disturb_led',
                      shouldShowSwitch: true,
                      switchOn: this.state.ledSwitch,
                      switchValueChanged: this._onLedSwitchValueChanged.bind(this),
                      visible: true,
                      shouldShowBottomLine: true,
                    },
                    {
                      title: module505.localization_strings_Setting_DoNotDisturbPage_6,
                      funcId: 'robot_setting_page_donot_disturb_dust',
                      shouldShowSwitch: true,
                      switchOn: this.state.dustSwitch,
                      switchValueChanged: this._onDustSwitchValueChanged.bind(this),
                      visible: module381.RSM.isCollectDock() || module381.RSM.isCollectWashDock() || module381.RSM.isCollectWashDryDock(),
                      shouldShowBottomLine: true,
                    },
                    {
                      title: module505.localization_strings_Setting_DoNotDisturbPage_7,
                      funcId: 'robot_setting_page_donot_disturb_dry',
                      shouldShowSwitch: true,
                      switchOn: this.state.drySwitch,
                      switchValueChanged: this._onDrySwitchValueChanged.bind(this),
                      visible: module390.default.isSupportedDrying(),
                      shouldShowBottomLine: true,
                    },
                  ],
                },
              ],
              n = 0;
            n < t.length;
            n++
          ) {
            for (var o = t[n].data, s = 0; s < o.length; s++) o[s].visible || (o.splice(s, 1), (s -= 1));

            if (!o.length) {
              t.splice(n, 1);
              n -= 1;
            }
          }

          return t;
        },
      },
      {
        key: 'getDndConfig',
        value: function () {
          var t, n;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    s.prev = 0;
                    s.next = 3;
                    return regeneratorRuntime.default.awrap(module415.default.getDndTimer());

                  case 3:
                    t = s.sent;
                    n = t.result[0].actions;
                    this.setState({
                      resumeSwitch: n.resume,
                      volSwitch: n.vol,
                      ledSwitch: n.led,
                      dustSwitch: n.dust,
                      drySwitch: n.dry,
                    });
                    this.setState({
                      loading: false,
                    });
                    s.next = 13;
                    break;

                  case 9:
                    s.prev = 9;
                    s.t0 = s.catch(0);
                    this.setState({
                      loading: false,
                    });
                    console.log('getDndConfig - ' + JSON.stringify(res));

                  case 13:
                  case 'end':
                    return s.stop();
                }
            },
            null,
            this,
            [[0, 9]],
            Promise
          );
        },
      },
      {
        key: 'saveCustomDnd',
        value: function () {
          var t, n;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    s.prev = 0;
                    t = {
                      resume: this.state.resumeSwitch,
                      vol: this.state.volSwitch,
                      led: this.state.ledSwitch,
                      dust: this.state.dustSwitch,
                      dry: this.state.drySwitch,
                    };
                    s.next = 4;
                    return regeneratorRuntime.default.awrap(module415.default.setDndTimerActions(t));

                  case 4:
                    n = s.sent;
                    console.log('saveCustomDnd -' + JSON.stringify(n));
                    s.next = 11;
                    break;

                  case 8:
                    s.prev = 8;
                    s.t0 = s.catch(0);
                    console.log('saveCustomDnd  error: ' + ('object' == typeof s.t0 ? JSON.stringify(s.t0) : s.t0));

                  case 11:
                  case 'end':
                    return s.stop();
                }
            },
            null,
            this,
            [[0, 8]],
            Promise
          );
        },
      },
      {
        key: '_onResumeSwitchValueChanged',
        value: function (t) {
          this.setState({
            resumeSwitch: t ? 1 : 0,
          });
        },
      },
      {
        key: '_onVolSwitchValueChanged',
        value: function (t) {
          this.setState({
            volSwitch: t ? 1 : 0,
          });
        },
      },
      {
        key: '_onLedSwitchValueChanged',
        value: function (t) {
          this.setState({
            ledSwitch: t ? 1 : 0,
          });
        },
      },
      {
        key: '_onDustSwitchValueChanged',
        value: function (t) {
          this.setState({
            dustSwitch: t ? 1 : 0,
          });
        },
      },
      {
        key: '_onDrySwitchValueChanged',
        value: function (t) {
          this.setState({
            drySwitch: t ? 1 : 0,
          });
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.context.theme,
            o = React.default.createElement(module12.SectionList, {
              style: [
                {
                  flex: 1,
                },
                {
                  paddingHorizontal: 15,
                },
              ],
              showsVerticalScrollIndicator: false,
              automaticallyAdjustContentInsets: false,
              sections: this.getMenuDatas(),
              renderItem: this.renderListRow,
              renderSectionHeader: this.sectionComp,
              ListFooterComponent: React.default.createElement(module12.View, {
                style: {
                  height: 25,
                  backgroundColor: this.context.theme.settingBackgroundColor,
                },
              }),
              keyExtractor: function (t, n) {
                return 'index:' + n + t;
              },
              stickySectionHeadersEnabled: false,
            }),
            s = React.default.createElement(
              module12.View,
              {
                style: [
                  x.containterView,
                  {
                    backgroundColor: globals.app.state.theme.settingBackgroundColor,
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ],
              },
              React.default.createElement(module1425.default, null)
            );
          return this.state.loading
            ? s
            : React.default.createElement(
                module12.View,
                {
                  style: [
                    x.containterView,
                    {
                      backgroundColor: n.settingBackgroundColor,
                    },
                  ],
                },
                React.default.createElement(
                  module12.ScrollView,
                  {
                    style: x.containter,
                    showsVerticalScrollIndicator: false,
                    refreshControl: React.default.createElement(module12.RefreshControl, {
                      refreshing: this.state.refreshing,
                      onRefresh: function () {
                        return t.getDndConfig();
                      },
                    }),
                  },
                  o
                )
              );
        },
      },
    ]);
    return R;
  })(React.Component);

exports.default = R;
R.contextType = module1121.AppConfigContext;
var x = module12.StyleSheet.create({
  containterView: {
    flex: 1,
  },
  containter: {
    flex: 1,
    marginTop: module1265.NavigationBarHeight,
    paddingBottom: 20,
  },
});
