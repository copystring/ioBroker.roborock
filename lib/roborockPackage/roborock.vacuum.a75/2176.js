var module22 = require('./22'),
  regeneratorRuntime = require('regenerator-runtime'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module385 = require('./385'),
  module416 = require('./416'),
  module1199 = require('./1199'),
  module390 = require('./390'),
  module2127 = require('./2127');

function x() {
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
  V = 0,
  C = (function (t) {
    module9.default(E, t);

    var n = E,
      module1199 = x(),
      C = function () {
        var t,
          s = module12.default(n);

        if (module1199) {
          var o = module12.default(this).constructor;
          t = Reflect.construct(s, arguments, o);
        } else t = s.apply(this, arguments);

        return module11.default(this, t);
      };

    function E(t) {
      var n;
      module6.default(this, E);
      (n = C.call(this, t)).state = {
        loading: true,
        requestFailed: false,
        refreshing: false,
        isStartDryerSwitchOn: false,
        dryTime: 7200,
      };
      return n;
    }

    module7.default(E, [
      {
        key: 'componentDidMount',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    this.props.navigation.setParams({
                      title: module510.dock_kit_setting4,
                      navBarBackgroundColor: this.context.theme.settingBackgroundColor,
                      hiddenBottomLine: true,
                    });
                    this.initData(false);

                  case 2:
                  case 'end':
                    return t.stop();
                }
            },
            null,
            this,
            null,
            Promise
          );
        },
      },
      {
        key: 'retry',
        value: function (t) {
          var n = this;

          if (V < 3) {
            V++;
            setTimeout(function () {
              console.log('retryTimes:' + V);
              n.initData(t);
            }, 1e3);
          } else
            this.setState({
              requestFailed: true,
            });
        },
      },
      {
        key: 'finishLoading',
        value: function (t) {
          this.setState({
            requestFailed: t,
            loading: false,
            refreshing: false,
          });
        },
      },
      {
        key: 'initData',
        value: function (t) {
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    if (
                      (this.setState({
                        loading: !t,
                        requestFailed: false,
                        refreshing: t,
                      }),
                      (n.prev = 1),
                      !module390.default.isSupportedDrying())
                    ) {
                      n.next = 5;
                      break;
                    }

                    n.next = 5;
                    return regeneratorRuntime.default.awrap(this.getDryerSetting());

                  case 5:
                    this.finishLoading(false);
                    V = 0;
                    n.next = 13;
                    break;

                  case 9:
                    n.prev = 9;
                    n.t0 = n.catch(1);
                    console.log('initData  ' + n.t0);
                    this.retry(t);

                  case 13:
                  case 'end':
                    return n.stop();
                }
            },
            null,
            this,
            [[1, 9]],
            Promise
          );
        },
      },
      {
        key: 'getDryerSetting',
        value: function () {
          var t, n, s, l;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    c.prev = 0;
                    c.next = 3;
                    return regeneratorRuntime.default.awrap(module416.default.getDryerSetting());

                  case 3:
                    t = c.sent;
                    n = t.result.status;
                    s = t.result.on;
                    l = s.dry_time;
                    this.setState({
                      isStartDryerSwitchOn: !!n,
                      dryTime: l,
                    });
                    c.next = 13;
                    break;

                  case 10:
                    c.prev = 10;
                    c.t0 = c.catch(0);
                    console.log('getDryerSetting  error: ' + ('object' == typeof c.t0 ? JSON.stringify(c.t0) : c.t0));

                  case 13:
                  case 'end':
                    return c.stop();
                }
            },
            null,
            this,
            [[0, 10]],
            Promise
          );
        },
      },
      {
        key: 'setDryerStatus',
        value: function (t) {
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    n.prev = 0;
                    n.next = 3;
                    return regeneratorRuntime.default.awrap(module416.default.setDryerStatus(t));

                  case 3:
                    n.next = 9;
                    break;

                  case 6:
                    n.prev = 6;
                    n.t0 = n.catch(0);
                    console.log('setDryerStatus  error: ' + ('object' == typeof n.t0 ? JSON.stringify(n.t0) : n.t0));

                  case 9:
                  case 'end':
                    return n.stop();
                }
            },
            null,
            null,
            [[0, 6]],
            Promise
          );
        },
      },
      {
        key: 'setDryerSetting',
        value: function (t, n) {
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    s.prev = 0;
                    s.next = 3;
                    return regeneratorRuntime.default.awrap(module416.default.setDryerSetting(t, n));

                  case 3:
                    this.setState({
                      dryTime: t,
                    });
                    s.next = 10;
                    break;

                  case 7:
                    s.prev = 7;
                    s.t0 = s.catch(0);
                    console.log('setDryerSetting  error: ' + ('object' == typeof s.t0 ? JSON.stringify(s.t0) : s.t0));

                  case 10:
                  case 'end':
                    return s.stop();
                }
            },
            null,
            this,
            [[0, 7]],
            Promise
          );
        },
      },
      {
        key: 'setStartDryerSwitch',
        value: function (t) {
          this.setState({
            isStartDryerSwitchOn: t,
          });
          var n = t ? 1 : 0;
          this.setDryerSetting(this.state.dryTime, n);
        },
      },
      {
        key: 'onPressDryerTimeMode',
        value: function (t) {
          this.setDryerSetting(t, 1);
        },
      },
      {
        key: 'getDryerSettingView',
        value: function () {
          var t = this,
            n = this.context.theme,
            o = {
              title: module510.dock_kit_setting5,
              shouldShowSwitch: true,
              switchOn: this.state.isStartDryerSwitchOn,
              switchValueChanged: this.setStartDryerSwitch.bind(this),
              visible: module390.default.isSupportedDrying(),
              shouldShowBottomLine: false,
              funcId: 'back_wash_title1',
            },
            l = React.default.createElement(module13.View, {
              style: {
                top: 0,
                height: 0.8,
                backgroundColor: this.context.theme.settingListItem.borderColor,
              },
            }),
            c = [
              {
                name: module510.dock_kit_setting2,
                value: 7200,
              },
              {
                name: module510.dock_kit_setting3,
                value: 10800,
              },
              {
                name: module510.dock_kit_setting1,
                value: 14400,
              },
              {
                name: module510.dock_kit_setting0,
                value: 18e3,
              },
            ],
            u = this.state.isStartDryerSwitchOn
              ? React.default.createElement(
                  module13.View,
                  {
                    style: {
                      width: module13.Dimensions.get('window').width - 70,
                    },
                  },
                  l,
                  React.default.createElement(
                    module13.Text,
                    {
                      style: [
                        _.titleText,
                        {
                          color: n.settingListItem.titleColor,
                        },
                      ],
                    },
                    module510.dock_kit_setting6
                  ),
                  React.default.createElement(module2127.default, {
                    ref: function (n) {
                      t.washModeSetView = n;
                    },
                    style: {
                      alignSelf: 'stretch',
                    },
                    items: c,
                    value: this.state.dryTime,
                    onPressButton: this.onPressDryerTimeMode.bind(this),
                  })
                )
              : null;
          return React.default.createElement(
            module13.View,
            {
              style: [
                _.dryView,
                {
                  backgroundColor: n.settingListItem.backgroundColor,
                },
              ],
            },
            React.default.createElement(
              module385.SettingListItemView,
              module22.default({}, o, {
                key: 2,
                style: {
                  width: module13.Dimensions.get('window').width - 30,
                },
              })
            ),
            u
          );
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.context.theme,
            s = React.default.createElement(module385.RequestRetryView, {
              onPressButton: function () {
                V = 0;
                t.initData(false);
              },
            });
          if (this.state.requestFailed) return s;
          var o = React.default.createElement(
            module13.View,
            {
              style: [
                _.containterView,
                {
                  backgroundColor: n.settingBackgroundColor,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ],
            },
            React.default.createElement(module385.Spinner, null)
          );
          if (this.state.loading) return o;
          var l = module390.default.isSupportedDrying()
            ? React.default.createElement(
                module13.View,
                {
                  style: {
                    borderRadius: 8,
                    overflow: 'hidden',
                    marginHorizontal: 15,
                  },
                },
                this.getDryerSettingView()
              )
            : null;
          return React.default.createElement(
            module13.View,
            {
              style: [
                _.containter,
                {
                  backgroundColor: n.settingBackgroundColor,
                },
              ],
            },
            React.default.createElement(
              module13.ScrollView,
              {
                style: _.containterScroll,
                showsVerticalScrollIndicator: false,
                refreshControl: React.default.createElement(module13.RefreshControl, {
                  refreshing: this.state.refreshing,
                  onRefresh: function () {
                    V = 0;
                    t.initData(true);
                  },
                }),
              },
              React.default.createElement(
                module13.View,
                null,
                React.default.createElement(module13.View, {
                  style: _.section,
                }),
                l,
                React.default.createElement(module13.View, {
                  style: _.section,
                })
              )
            )
          );
        },
      },
    ]);
    return E;
  })(React.Component);

exports.default = C;
C.contextType = module1199.AppConfigContext;

var _ = module13.StyleSheet.create({
  containterView: {
    flex: 1,
  },
  containter: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  containterScroll: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  titleText: {
    alignSelf: 'flex-start',
    paddingLeft: 0,
    paddingVertical: 20,
    fontSize: 16,
  },
  section: {
    paddingVertical: 10,
  },
  dryView: {
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dryButton: {
    flex: 1,
    alignSelf: 'center',
    height: 40,
    borderRadius: 20,
  },
});
