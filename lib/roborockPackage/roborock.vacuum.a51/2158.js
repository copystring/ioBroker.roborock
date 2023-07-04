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
  module1193 = require('./1193');

require('./390');

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

require('./510').strings;

var module398 = require('./398'),
  T = module398.fromSecToMin,
  B = module398.fromSqmmToSqm,
  L = (function (t) {
    module9.default(L, t);

    var n = L,
      module1193 = C(),
      A = function () {
        var t,
          o = module12.default(n);

        if (module1193) {
          var l = module12.default(this).constructor;
          t = Reflect.construct(o, arguments, l);
        } else t = o.apply(this, arguments);

        return module11.default(this, t);
      };

    function L(t) {
      var n;
      module6.default(this, L);
      (n = A.call(this, t)).state = {
        totalArea: 0,
        remainingArea: 0,
        totalBattery: 0,
        remainingBattery: 0,
        totalTime: 0,
        remainingTime: 0,
        percent: 0,
        cleanTimeRate: 0,
      };
      return n;
    }

    module7.default(L, [
      {
        key: 'componentDidMount',
        value: function () {
          var t = this;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    this.props.navigation.setParams({
                      title: '\u6e05\u626b\u9884\u5224',
                      navBarBackgroundColor: this.context.theme.settingBackgroundColor,
                      hiddenBottomLine: true,
                    });
                    setInterval(function () {
                      t.getCleanEstimateInfo();
                    }, 5e3);
                    this.getCleanEstimateInfo();

                  case 3:
                  case 'end':
                    return n.stop();
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
        key: 'getCleaningEfficiency',
        value: function () {
          this.state.totalTime;
          this.state.remainingTime;
          this.state.totalArea;
          this.state.remainingArea;
        },
      },
      {
        key: 'getMenuDatas',
        value: function () {
          var t = this.state.totalArea - this.state.remainingArea,
            n = this.state.totalTime - this.state.remainingTime;
          return [
            {
              title: '\u9884\u4f30\u6e05\u626b\u9762\u79ef',
              detail: (this.state.totalArea < 1e6 ? (this.state.totalArea / 1e6).toFixed(1) : B(this.state.totalArea)) + '\u33a1',
              shouldShowBottomLongLine: true,
              shouldShowRightArrow: false,
            },
            {
              title: '\u5b9e\u9645\u6e05\u626b\u9762\u79ef',
              detail: (t < 1e6 ? (t / 1e6).toFixed(1) : B(t)) + '\u33a1',
              shouldShowBottomLongLine: true,
              shouldShowRightArrow: false,
            },
            {
              title: '\u9884\u4f30\u5269\u4f59\u6e05\u6d01\u65f6\u95f4',
              detail: '' + this.state.remainingTime < 60 ? this.state.remainingTime + 's' : T(this.state.remainingTime) + 'min',
              shouldShowBottomLongLine: true,
              shouldShowRightArrow: false,
            },
            {
              title: '\u5b9e\u9645\u6e05\u626b\u65f6\u95f4',
              detail: '' + n < 60 ? n + 's' : T(n) + 'min',
              shouldShowBottomLongLine: true,
              shouldShowRightArrow: false,
            },
            {
              title: '\u5355\u4f4d\u9762\u79ef\u6e05\u6d01\u6548\u7387',
              detail: this.state.cleanTimeRate + 's/\u33a1',
              shouldShowBottomLongLine: true,
              shouldShowRightArrow: false,
            },
            {
              title: '\u5355\u4f4d\u9762\u79ef\u8017\u7535\u91cf',
              detail: this.state.batteryConsumptionRate + '%',
              shouldShowBottomLongLine: true,
              shouldShowRightArrow: false,
            },
            {
              title: '\u5269\u4f59\u9762\u79ef\u6240\u9700\u7535\u91cf',
              detail: this.state.remainingBattery + '%',
              shouldShowBottomLongLine: true,
              shouldShowRightArrow: false,
            },
            {
              title: '\u6e05\u6d01\u8fdb\u5ea6',
              detail: this.state.percent + '%',
              shouldShowBottomLongLine: false,
              shouldShowRightArrow: false,
            },
          ];
        },
      },
      {
        key: 'getCleanEstimateInfo',
        value: function () {
          var t, n;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.prev = 0;
                    o.next = 3;
                    return regeneratorRuntime.default.awrap(module416.default.getCleanEstimateInfo());

                  case 3:
                    t = o.sent;
                    n = t.result.clean_estimate;
                    this.setState({
                      totalArea: n.total_area,
                      remainingArea: n.remaining_area,
                      totalBattery: n.total_battery,
                      remainingBattery: n.remaining_battery,
                      totalTime: n.total_time,
                      remainingTime: n.remaining_time,
                      percent: n.percent,
                      cleanTimeRate: n.clean_time_rate,
                      batteryConsumptionRate: n.battery_consumption_rate,
                    });
                    console.log(JSON.stringify(t));
                    o.next = 12;
                    break;

                  case 9:
                    o.prev = 9;
                    o.t0 = o.catch(0);
                    console.log('getCleanEstimateInfo  error: ' + ('object' == typeof o.t0 ? JSON.stringify(o.t0) : o.t0));

                  case 12:
                  case 'end':
                    return o.stop();
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
        key: 'render',
        value: function () {
          var t = this.context.theme,
            n = this.getMenuDatas().map(function (n, l) {
              return n.title
                ? React.default.createElement(
                    module385.SettingListItemView,
                    module22.default({}, n, {
                      key: l,
                      titleColor: 'rgba(0,0,0,0.8)',
                      style: {
                        width: module13.Dimensions.get('window').width,
                      },
                    })
                  )
                : React.default.createElement(module13.View, {
                    style: [
                      R.section,
                      {
                        backgroundColor: t.settingBackgroundColor,
                      },
                    ],
                    key: l,
                  });
            });
          return React.default.createElement(
            module13.View,
            {
              style: [
                R.containter,
                {
                  backgroundColor: t.settingBackgroundColor,
                },
              ],
            },
            React.default.createElement(
              module13.ScrollView,
              {
                style: R.containterScroll,
                showsVerticalScrollIndicator: false,
              },
              n
            )
          );
        },
      },
    ]);
    return L;
  })(React.Component);

exports.default = L;
L.contextType = module1193.AppConfigContext;
var R = module13.StyleSheet.create({
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
    paddingLeft: 20,
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
});
