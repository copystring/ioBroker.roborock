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
  module391 = require('./391'),
  module390 = require('./390'),
  module1121 = require('./1121'),
  module414 = require('./414'),
  module381 = require('./381'),
  module1122 = require('./1122');

function C() {
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
  F = 0,
  R = (function (t) {
    module7.default(R, t);

    var n = R,
      module391 = C(),
      x = function () {
        var t,
          o = module11.default(n);

        if (module391) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, s);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function R(t) {
      var n;
      module4.default(this, R);

      (n = x.call(this, t))._onPressRetry = function () {
        F = 0;
        n.initData(false);
      };

      n._onPressGotoEditFloor = function () {
        n.props.navigation.navigate('MapEditFloorMaterialPage', {
          title: module505.map_edit_floor_wood_tile,
        });
      };

      n.unMount = false;
      n.state = {
        groundDirectionSwitch: false,
        loading: true,
        requestFailed: false,
        refreshing: false,
      };
      return n;
    }

    module5.default(R, [
      {
        key: 'componentWillUnmount',
        value: function () {
          this.unMount = true;
        },
      },
      {
        key: 'componentDidMount',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    this.props.navigation.setParams({
                      title: module505.ground_material_clean_setting_title,
                      navBarBackgroundColor: this.theme.settingBackgroundColor,
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
        key: 'getTopMenus',
        value: function () {
          return [
            {
              title: module505.ground_material_clean_direction_title,
              funcId: 'ground_clean_mode_switch',
              bottomDetail: module505.ground_material_clean_direction_detail,
              shouldShowSwitch: true,
              switchOn: this.state.groundDirectionSwitch,
              switchValueChanged: this._onGroundDirectionSwitchValueChanged.bind(this),
              shouldShowBottomLine: true,
              visible: !!module390.default.isSupportFloorDirection(),
              shouldShowTopLongLine: true,
              shouldShowBottomLongLine: true,
            },
          ];
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = React.default.createElement(module385.RequestRetryView, {
              onPressButton: this._onPressRetry,
            });
          if (this.state.requestFailed) return n;
          var s = React.default.createElement(
            module12.View,
            {
              style: [
                V.containterView,
                {
                  backgroundColor: this.theme.settingBackgroundColor,
                },
              ],
            },
            React.default.createElement(module385.Spinner, null)
          );
          if (this.state.loading) return s;
          var u = this.getTopMenus().map(function (t, n) {
              return t.visible
                ? React.default.createElement(
                    module385.SettingListItemView,
                    module22.default({}, t, {
                      bottomDetailWidth: module12.Dimensions.get('window').width - 70,
                      key: n,
                      titleColor: 'rgba(0,0,0,0.8)',
                      style: {
                        width: module12.Dimensions.get('window').width - 30,
                      },
                    })
                  )
                : null;
            }),
            l = module414.MM.checkAllRoomNoFloor();
          return React.default.createElement(
            module12.View,
            {
              style: [
                V.containter,
                {
                  backgroundColor: this.theme.settingBackgroundColor,
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
                    F = 0;
                    t.initData(true);
                  },
                }),
              },
              React.default.createElement(
                module12.View,
                {
                  style: V.topListView,
                },
                u
              )
            ),
            l &&
              React.default.createElement(
                module12.Text,
                {
                  style: V.guideText,
                  onPress: this._onPressGotoEditFloor,
                },
                module505.ground_material_clean_direction_set
              )
          );
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
                    this.setState({
                      loading: !t,
                      requestFailed: false,
                      refreshing: t,
                    });
                    n.prev = 1;
                    n.next = 4;
                    return regeneratorRuntime.default.awrap(this.getGroundDirectionStatus());

                  case 4:
                    if (!this.unMount)
                      this.setState({
                        refreshing: false,
                      });
                    if (!this.unMount) this.finishLoading(false);
                    F = 0;
                    n.next = 13;
                    break;

                  case 9:
                    n.prev = 9;
                    n.t0 = n.catch(1);
                    console.log('initData - ' + JSON.stringify(n.t0));
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
        key: 'retry',
        value: function (t) {
          var n = this;
          if (!this.unMount)
            F < 3
              ? (F++,
                setTimeout(function () {
                  console.warn('retryTimes:' + F);
                  n.initData(t);
                }, 1e3))
              : this.setState({
                  requestFailed: true,
                });
        },
      },
      {
        key: 'finishLoading',
        value: function (t) {
          this.setState({
            requestFailed: t,
          });
          if (this.state.loading)
            this.setState({
              loading: false,
            });
        },
      },
      {
        key: '_onGroundDirectionSwitchValueChanged',
        value: function (t) {
          var n = this;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    if (!module381.RSM.isRunning) {
                      o.next = 3;
                      break;
                    }

                    module1122.showFinishCurrentTastAlertIfNeeded().catch(function () {
                      n.showToast(module505.robot_communication_exception);
                    });
                    return o.abrupt('return');

                  case 3:
                    o.prev = 3;
                    o.next = 6;
                    return regeneratorRuntime.default.awrap(module415.default.setFloorDirectionCleanStatus(t ? 1 : 0));

                  case 6:
                    if (!this.unMount)
                      this.setState({
                        groundDirectionSwitch: t,
                      });
                    o.next = 13;
                    break;

                  case 9:
                    o.prev = 9;
                    o.t0 = o.catch(3);
                    globals.showToast(module505.robot_communication_exception);
                    console.log(o.t0);

                  case 13:
                  case 'end':
                    return o.stop();
                }
            },
            null,
            this,
            [[3, 9]],
            Promise
          );
        },
      },
      {
        key: 'getGroundDirectionStatus',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    n.prev = 0;
                    n.next = 3;
                    return regeneratorRuntime.default.awrap(module415.default.getFloorDirectionCleanStatus());

                  case 3:
                    t = n.sent;
                    console.log('getGroundDirectionStatus: ' + JSON.stringify(t));
                    if (!this.unMount)
                      this.setState({
                        groundDirectionSwitch: 1 == t.result.status,
                      });
                    n.next = 12;
                    break;

                  case 8:
                    n.prev = 8;
                    n.t0 = n.catch(0);
                    globals.showToast(module505.robot_communication_exception);
                    console.log(n.t0);

                  case 12:
                  case 'end':
                    return n.stop();
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
        key: 'theme',
        get: function () {
          return this.context.theme;
        },
      },
    ]);
    return R;
  })(React.Component);

exports.default = R;
R.contextType = module1121.AppConfigContext;
var V = module12.StyleSheet.create({
  containterView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containter: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  containterScroll: {
    flex: 1,
    backgroundColor: 'transparent',
    marginBottom: 20,
  },
  topListView: {
    marginVertical: 10,
    borderRadius: 8,
    overflow: 'hidden',
    marginHorizontal: 15,
  },
  guideText: {
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: module391.default.isIphoneX() ? 56 : 35,
    fontSize: 16,
    color: '#007AFF',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
