var regeneratorRuntime = require('regenerator-runtime'),
  module50 = require('./50'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  module385 = require('./385'),
  module391 = require('./391'),
  module1121 = require('./1121'),
  React = require('react'),
  module12 = require('./12'),
  module1875 = require('./1875'),
  module381 = require('./381'),
  module1328 = require('./1328'),
  module415 = require('./415');

function S(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(t);
    if (n)
      s = s.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, s);
  }

  return o;
}

function D(t) {
  for (var n = 1; n < arguments.length; n++) {
    var s = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      S(Object(s), true).forEach(function (n) {
        module50.default(t, n, s[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      S(Object(s)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(s, n));
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

require('./505').strings;

var module1265 = require('./1265'),
  E = (function (t) {
    module7.default(S, t);

    var module50 = S,
      module391 = j(),
      y = function () {
        var t,
          n = module11.default(module50);

        if (module391) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, s);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function S(t) {
      var n;
      module4.default(this, S);
      (n = y.call(this, t)).host = module1265.areaServerMap[module381.RobotStatusManager.sharedManager().serverCode].host;
      n.state = {
        imageHeight: 500,
      };
      return n;
    }

    module5.default(S, [
      {
        key: 'componentDidMount',
        value: function () {
          var t = this;
          module12.Image.getSize(this.imgUrl, function (n, o) {
            t.setState({
              imageHeight: (o / n) * module12.Dimensions.get('window').width,
            });
          });
        },
      },
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          this.imgUrl = 'https://' + this.host + '/topazsv/app/suplies/change_water_debug_image.png';
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
            o = D(
              D(
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
                k.container,
                {
                  backgroundColor: n.navBackgroundColor,
                },
              ],
            },
            React.default.createElement(
              module12.View,
              {
                style: k.wrap,
              },
              React.default.createElement(
                module12.ScrollView,
                {
                  alwaysBounceVertical: false,
                  scrollEnabled: true,
                  showsVerticalScrollIndicator: true,
                },
                React.default.createElement(module1875.default, {
                  uri: this.imgUrl,
                  style: D(
                    D({}, k.detailImage),
                    {},
                    {
                      height: this.state.imageHeight,
                    }
                  ),
                })
              )
            ),
            React.default.createElement(
              module12.View,
              {
                style: k.bottomView,
              },
              React.default.createElement(
                module1328.BoxShadow,
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
                    style: k.gradientBtn,
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
                    return regeneratorRuntime.default.awrap(module415.default.appAmethystSelfCheck());

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
    return S;
  })(React.default.PureComponent);

exports.default = E;
E.contextType = module1121.AppConfigContext;
var k = module12.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  wrap: {
    width: module12.Dimensions.get('window').width,
    height: module12.Dimensions.get('window').height - 180,
  },
  detailImage: {
    width: module12.Dimensions.get('window').width,
  },
  bottomView: {
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'stretch',
    position: 'absolute',
    left: 0,
    bottom: module391.default.isIphoneX() ? 56 : 35,
  },
  gradientBtn: {
    minHeight: 45,
    borderRadius: 26,
    backgroundColor: '#3777F7',
    justifyContent: 'center',
  },
});
