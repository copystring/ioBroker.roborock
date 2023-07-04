var module22 = require('./22'),
  regeneratorRuntime = require('regenerator-runtime'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module385 = require('./385'),
  module415 = require('./415'),
  module1121 = require('./1121'),
  module390 = require('./390'),
  module2033 = require('./2033');

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

var module505 = require('./505').strings,
  b = 0,
  _ = (function (t) {
    module7.default(E, t);

    var n = E,
      module1121 = x(),
      _ = function () {
        var t,
          s = module11.default(n);

        if (module1121) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(s, arguments, o);
        } else t = s.apply(this, arguments);

        return module9.default(this, t);
      };

    function E(t) {
      var n;
      module4.default(this, E);
      (n = _.call(this, t)).state = {
        loading: true,
        requestFailed: false,
        refreshing: false,
        isStartDryerSwitchOn: false,
        dryTime: 7200,
      };
      return n;
    }

    module5.default(E, [
      {
        key: 'componentDidMount',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    this.props.navigation.setParams({
                      title: module505.dock_kit_setting4,
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

          if (b < 3) {
            b++;
            setTimeout(function () {
              console.log('retryTimes:' + b);
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
                    b = 0;
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
                    return regeneratorRuntime.default.awrap(module415.default.getDryerSetting());

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
                    return regeneratorRuntime.default.awrap(module415.default.setDryerStatus(t));

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
                    return regeneratorRuntime.default.awrap(module415.default.setDryerSetting(t, n));

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
              title: module505.dock_kit_setting5,
              shouldShowSwitch: true,
              switchOn: this.state.isStartDryerSwitchOn,
              switchValueChanged: this.setStartDryerSwitch.bind(this),
              visible: module390.default.isSupportedDrying(),
              shouldShowBottomLine: false,
              funcId: 'back_wash_title1',
            },
            l = React.default.createElement(module12.View, {
              style: {
                top: 0,
                height: 0.8,
                backgroundColor: this.context.theme.settingListItem.borderColor,
              },
            }),
            c = [
              {
                name: module505.dock_kit_setting2,
                value: 7200,
              },
              {
                name: module505.dock_kit_setting3,
                value: 10800,
              },
              {
                name: module505.dock_kit_setting1,
                value: 14400,
              },
            ],
            u = this.state.isStartDryerSwitchOn
              ? React.default.createElement(
                  module12.View,
                  {
                    style: {
                      width: module12.Dimensions.get('window').width - 70,
                    },
                  },
                  l,
                  React.default.createElement(
                    module12.Text,
                    {
                      style: [
                        V.titleText,
                        {
                          color: n.settingListItem.titleColor,
                        },
                      ],
                    },
                    module505.dock_kit_setting6
                  ),
                  React.default.createElement(module2033.default, {
                    ref: function (n) {
                      t.washModeSetView = n;
                    },
                    style: {
                      alignSelf: 'stretch',
                    },
                    items: c,
                    value: this.state.dryTime,
                    onPressButton: this.onPressDryerTimeMode.bind(this),
                  }),
                  React.default.createElement(
                    module12.Text,
                    {
                      style: [
                        V.titleText,
                        {
                          color: n.settingListItem.titleColor,
                        },
                      ],
                    },
                    module505.dock_kit_setting7
                  ),
                  React.default.createElement(
                    module12.View,
                    {
                      style: {
                        alignSelf: 'stretch',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 20,
                      },
                    },
                    React.default.createElement(module385.PureButton, {
                      funcId: 'start_dry',
                      textColor: 'white',
                      title: module505.dock_kit_setting8,
                      style: [
                        V.dryButton,
                        {
                          backgroundColor: '#5c9dfc',
                          marginRight: 20,
                        },
                      ],
                      onPress: function () {
                        return t.setDryerStatus(1);
                      },
                    }),
                    React.default.createElement(module385.PureButton, {
                      funcId: 'stop_dry',
                      textColor: 'white',
                      title: module505.dock_kit_setting9,
                      style: [
                        V.dryButton,
                        {
                          backgroundColor: '#5c9dfc',
                        },
                      ],
                      onPress: function () {
                        return t.setDryerStatus(0);
                      },
                    })
                  )
                )
              : null;
          return React.default.createElement(
            module12.View,
            {
              style: [
                V.dryView,
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
                  width: module12.Dimensions.get('window').width - 30,
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
                b = 0;
                t.initData(false);
              },
            });
          if (this.state.requestFailed) return s;
          var o = React.default.createElement(
            module12.View,
            {
              style: [
                V.containterView,
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
                module12.View,
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
            module12.View,
            {
              style: [
                V.containter,
                {
                  backgroundColor: n.settingBackgroundColor,
                },
              ],
            },
            React.default.createElement(
              module12.ScrollView,
              {
                style: V.containterScroll,
                showsVerticalScrollIndicator: false,
                refreshControl: React.default.createElement(module12.RefreshControl, {
                  refreshing: this.state.refreshing,
                  onRefresh: function () {
                    b = 0;
                    t.initData(true);
                  },
                }),
              },
              React.default.createElement(
                module12.View,
                null,
                React.default.createElement(module12.View, {
                  style: V.section,
                }),
                l,
                React.default.createElement(module12.View, {
                  style: V.section,
                })
              )
            )
          );
        },
      },
    ]);
    return E;
  })(React.Component);

exports.default = _;
_.contextType = module1121.AppConfigContext;
var V = module12.StyleSheet.create({
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
