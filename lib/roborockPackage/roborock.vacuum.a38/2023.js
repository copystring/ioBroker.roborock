var regeneratorRuntime = require('regenerator-runtime'),
  module22 = require('./22'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module385 = require('./385'),
  module418 = require('./418'),
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

var module500 = require('./500').strings,
  _ = (function (t) {
    module7.default(R, t);

    var n = R,
      module515 = w(),
      _ = function () {
        var t,
          o = module11.default(n);

        if (module515) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, s);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function R(t) {
      var n;
      module4.default(this, R);
      n = _.call(this, t);
      var o = t.navigation.state.params || {};
      n.state = {
        dryTime: o.dryTime,
      };
      return n;
    }

    module5.default(R, [
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
              title: module500.dock_kit_setting2,
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
              title: module500.dock_kit_setting3,
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
              title: module500.dock_kit_setting1,
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
            n = this.getMenus().map(function (t, module1938) {
              return t.visible
                ? t.title
                  ? React.default.createElement(
                      module385.SettingListItemView,
                      module22.default({}, t, {
                        key: module1938,
                        fontSize: 16,
                        rightImgStyle: D.rightImgStyle,
                        width: module12.Dimensions.get('window').width - 30,
                        rightSrc: require('./1938'),
                        isRightImgRotate: false,
                      })
                    )
                  : t.sectionTitle.length > 0 &&
                    React.default.createElement(
                      module12.Text,
                      {
                        style: D.sectionTitle,
                        key: module1938,
                      },
                      t.sectionTitle
                    )
                : null;
            });
          return React.default.createElement(
            module12.ScrollView,
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
              module12.View,
              {
                style: D.containter,
              },
              React.default.createElement(
                module12.View,
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
                    module12.DeviceEventEmitter.emit(module418.NotificationKeys.SelfCleaningSetDidChange, {
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
_.contextType = module515.AppConfigContext;
var D = module12.StyleSheet.create({
  containter: {
    flex: 1,
  },
  rightImgStyle: {
    width: 22,
    height: 22,
    marginTop: -5,
  },
});
