var regeneratorRuntime = require('regenerator-runtime'),
  module22 = require('./22'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module385 = require('./385'),
  module420 = require('./420'),
  module1199 = require('./1199');

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

var module510 = require('./510').strings,
  _ = (function (t) {
    module9.default(R, t);

    var n = R,
      module1199 = w(),
      _ = function () {
        var t,
          o = module12.default(n);

        if (module1199) {
          var s = module12.default(this).constructor;
          t = Reflect.construct(o, arguments, s);
        } else t = o.apply(this, arguments);

        return module11.default(this, t);
      };

    function R(t) {
      var n;
      module6.default(this, R);
      n = _.call(this, t);
      var o = t.navigation.state.params || {};
      n.state = {
        dryTime: o.dryTime,
      };
      return n;
    }

    module7.default(R, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {},
      },
      {
        key: 'componentWillUnmount',
        value: function () {},
      },
      {
        key: 'componentDidMount',
        value: function () {
          this.props.navigation.setParams({
            navBarBackgroundColor: this.context.theme.settingBackgroundColor,
            hiddenBottomLine: true,
          });
        },
      },
      {
        key: 'getMenus',
        value: function () {
          var t = this;
          return [
            {
              title: module510.dock_kit_setting2,
              funcId: 'dock_kit_setting2',
              onPress: function () {
                return t.onPressDryerTimeMode(7200);
              },
              visible: true,
              shouldShowBottomLine: true,
              selected: 7200 == this.state.dryTime,
              shouldShowRightArrow: 7200 == this.state.dryTime,
            },
            {
              title: module510.dock_kit_setting3,
              funcId: 'dock_kit_setting3',
              onPress: function () {
                return t.onPressDryerTimeMode(10800);
              },
              visible: true,
              shouldShowBottomLine: true,
              selected: 10800 == this.state.dryTime,
              shouldShowRightArrow: 10800 == this.state.dryTime,
            },
            {
              title: module510.dock_kit_setting1,
              funcId: 'dock_kit_setting1',
              onPress: function () {
                return t.onPressDryerTimeMode(14400);
              },
              visible: true,
              shouldShowBottomLine: false,
              selected: 14400 == this.state.dryTime,
              shouldShowRightArrow: 14400 == this.state.dryTime,
            },
          ];
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this.context.theme,
            n = this.getMenus().map(function (t, module2076) {
              return t.visible
                ? t.title
                  ? React.default.createElement(
                      module385.SettingListItemView,
                      module22.default({}, t, {
                        key: module2076,
                        fontSize: 16,
                        rightImgStyle: D.rightImgStyle,
                        width: module13.Dimensions.get('window').width - 30,
                        rightSrc: require('./2076'),
                        isRightImgRotate: false,
                      })
                    )
                  : t.sectionTitle.length > 0 &&
                    React.default.createElement(
                      module13.Text,
                      {
                        style: D.sectionTitle,
                        key: module2076,
                      },
                      t.sectionTitle
                    )
                : null;
            });
          return React.default.createElement(
            module13.ScrollView,
            {
              style: [
                D.containter,
                {
                  backgroundColor: t.settingBackgroundColor,
                },
              ],
              showsVerticalScrollIndicator: false,
            },
            React.default.createElement(
              module13.View,
              {
                style: D.containter,
              },
              React.default.createElement(
                module13.View,
                {
                  style: {
                    borderRadius: 8,
                    overflow: 'hidden',
                    marginHorizontal: 15,
                    marginTop: 20,
                  },
                },
                n
              )
            )
          );
        },
      },
      {
        key: 'onPressDryerTimeMode',
        value: function (t) {
          this.setState({
            dryTime: t,
          });
          this.setDryerSetting(t, 1);
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
                    return regeneratorRuntime.default.awrap(RobotApi.setDryerSetting(t, n));

                  case 3:
                    module13.DeviceEventEmitter.emit(module420.NotificationKeys.SelfCleaningSetDidChange, {
                      name: 'dryTime',
                      value: t,
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
            null,
            [[0, 7]],
            Promise
          );
        },
      },
    ]);
    return R;
  })(React.Component);

exports.default = _;
_.contextType = module1199.AppConfigContext;
var D = module13.StyleSheet.create({
  containter: {
    flex: 1,
  },
  rightImgStyle: {
    width: 22,
    height: 22,
    marginTop: -5,
  },
});
