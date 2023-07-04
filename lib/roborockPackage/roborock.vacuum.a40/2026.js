var regeneratorRuntime = require('regenerator-runtime'),
  module50 = require('./50'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  module385 = require('./385'),
  module391 = require('./391'),
  module515 = require('./515'),
  React = require('react'),
  module12 = require('./12'),
  module1826 = require('./1826'),
  module381 = require('./381'),
  module1161 = require('./1161'),
  module414 = require('./414');

function x(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var l = Object.getOwnPropertySymbols(t);
    if (n)
      l = l.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, l);
  }

  return o;
}

function S(t) {
  for (var n = 1; n < arguments.length; n++) {
    var l = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      x(Object(l), true).forEach(function (n) {
        module50.default(t, n, l[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(l));
    else
      x(Object(l)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(l, n));
      });
  }

  return t;
}

function j() {
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

require('./500').strings;

var module1153 = require('./1153'),
  k = (function (t) {
    module7.default(k, t);

    var module50 = k,
      module515 = j(),
      x = function () {
        var t,
          n = module11.default(module50);

        if (module515) {
          var l = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, l);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function k(t) {
      var n;
      module4.default(this, k);
      (n = x.call(this, t)).host = module1153.areaServerMap[module381.RobotStatusManager.sharedManager().serverCode].host;
      return n;
    }

    module5.default(k, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          this.props.navigation.setParams({
            title: '\u6362\u6c34\u5957\u4ef6\u6d4b\u8bd5',
            navBarBackgroundColor: this.context.theme.navBackgroundColor,
            hiddenBottomLine: true,
          });
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.context.theme,
            o = S(
              S(
                {
                  width: module12.Dimensions.get('window').width - 100,
                  height: 45,
                  radius: 22,
                },
                n.shadowConfig
              ),
              {},
              {
                style: {
                  marginTop: 20,
                  marginHorizontal: 50,
                },
              }
            );
          return React.default.createElement(
            module12.View,
            {
              style: [
                D.container,
                {
                  backgroundColor: n.navBackgroundColor,
                },
              ],
            },
            React.default.createElement(
              module12.View,
              {
                style: {
                  paddingBottom: module391.default.isIphoneX() ? 160 : 145,
                },
              },
              React.default.createElement(
                module12.ScrollView,
                {
                  alwaysBounceVertical: false,
                  scrollEnabled: true,
                  showsVerticalScrollIndicator: false,
                },
                React.default.createElement(module1826.default, {
                  uri: 'https://' + this.host + '/topazsv/app/suplies/change_water_debug_image.png',
                  style: D.detailImage,
                })
              )
            ),
            React.default.createElement(
              module12.View,
              {
                style: D.bottomView,
              },
              React.default.createElement(
                module1161.BoxShadow,
                {
                  setting: o,
                },
                React.default.createElement(
                  module385.GradientView,
                  {
                    pointerEvents: 'box-none',
                    colors: [n.gradientColorStart, n.gradientColorEnd],
                    start: {
                      x: 0,
                      y: 0,
                    },
                    end: {
                      x: 1,
                      y: 0,
                    },
                    style: D.gradientBtn,
                  },
                  React.default.createElement(module385.PureButton, {
                    style: {
                      backgroundColor: 'transparent',
                      minHeight: 45,
                    },
                    textColor: n.supplies.buyTextColor,
                    title: '\u5f00\u59cb\u68c0\u6d4b',
                    onPress: function () {
                      return t.onPressDetection();
                    },
                  })
                )
              )
            ),
            React.default.createElement(module385.AlertView, {
              ref: function (n) {
                return (t.alert = n);
              },
              noAnimated: true,
            })
          );
        },
      },
      {
        key: 'onPressDetection',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.prev = 0;
                    o.next = 3;
                    return regeneratorRuntime.default.awrap(module414.default.appAmethystSelfCheck());

                  case 3:
                    t = o.sent;
                    console.log('onPressDetection --- ' + JSON.stringify(t));
                    o.next = 10;
                    break;

                  case 7:
                    o.prev = 7;
                    o.t0 = o.catch(0);
                    console.log('onPressDetection  error: ' + ('object' == typeof o.t0 ? JSON.stringify(o.t0) : o.t0));

                  case 10:
                  case 'end':
                    return o.stop();
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
    return k;
  })(React.default.PureComponent);

exports.default = k;
k.contextType = module515.AppConfigContext;
var D = module12.StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  detailImage: {
    top: 80,
    alignSelf: 'center',
    maxWidth: 376,
    maxHeight: 397,
    width: module12.Dimensions.get('window').width,
    height: (397 * module12.Dimensions.get('window').width) / 376,
    marginTop: 0,
  },
  bottomView: {
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'stretch',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: module391.default.isIphoneX() ? 56 : 35,
  },
  gradientBtn: {
    minHeight: 45,
    borderRadius: 26,
    backgroundColor: '#3777F7',
    justifyContent: 'center',
  },
});
