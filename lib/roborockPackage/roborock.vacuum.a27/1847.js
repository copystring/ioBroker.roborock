var module22 = require('./22'),
  module50 = require('./50'),
  regeneratorRuntime = require('regenerator-runtime'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module385 = require('./385'),
  module419 = require('./419'),
  module1562 = require('./1562'),
  module381 = require('./381'),
  module1355 = require('./1355'),
  module1328 = require('./1328'),
  module1121 = require('./1121');

function C(t, o) {
  var n = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(t);
    if (o)
      s = s.filter(function (o) {
        return Object.getOwnPropertyDescriptor(t, o).enumerable;
      });
    n.push.apply(n, s);
  }

  return n;
}

function j(t) {
  for (var o = 1; o < arguments.length; o++) {
    var n = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      C(Object(n), true).forEach(function (o) {
        module50.default(t, o, n[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(n));
    else
      C(Object(n)).forEach(function (o) {
        Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(n, o));
      });
  }

  return t;
}

function B() {
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

var module505 = require('./505').strings.getResourceLanguageCode(),
  A = (function (t) {
    module7.default(C, t);

    var o = C,
      module50 = B(),
      k = function () {
        var t,
          n = module11.default(o);

        if (module50) {
          var l = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, l);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function C(t) {
      var o;
      module4.default(this, C);

      (o = k.call(this, t))._onLayout = function (t) {
        var n = t.nativeEvent.layout.height;
        o.setState({
          selfHeight: n,
        });
      };

      o.state = {
        shouldShow: false,
        selfHeight: 0,
      };
      return o;
    }

    module5.default(C, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {},
      },
      {
        key: 'componentDidMount',
        value: function () {
          this.checkShouldShow();
        },
      },
      {
        key: 'checkShouldShow',
        value: function () {
          var t, o, module22, module50, module4, module5, module7, h, module11, w, y, v, P;
          return regeneratorRuntime.default.async(
            function (O) {
              for (;;)
                switch ((O.prev = O.next)) {
                  case 0:
                    O.prev = 0;
                    t = this.props;
                    o = t.notificationKey;
                    module22 = t.showCount;
                    module50 = t.beginTime;
                    module4 = t.endTime;
                    module5 = t.allowedServers;
                    module7 = t.allowedLanguages;
                    if (undefined == (h = t.isModalAllowed)) h = true;
                    module11 = 0;
                    O.prev = 4;
                    O.next = 7;
                    return regeneratorRuntime.default.awrap(module419.GetStorageKey(o));

                  case 7:
                    if (((O.t0 = O.sent), O.t0)) {
                      O.next = 10;
                      break;
                    }

                    O.t0 = 0;

                  case 10:
                    module11 = O.t0;
                    O.next = 16;
                    break;

                  case 13:
                    O.prev = 13;
                    O.t1 = O.catch(4);
                    console.log('FloatNotificationView GetStorageKey error: ' + O.t1);

                  case 16:
                    w = !module22 || parseInt(module11) <= module22;
                    y = !module50 || module1562.default().isBetween(module50, module4);
                    v =
                      !module5 ||
                      -1 !=
                        module5.findIndex(function (t) {
                          return t == module381.RobotStatusManager.sharedManager().serverCode;
                        });
                    P =
                      !module7 ||
                      -1 !=
                        module7.findIndex(function (t) {
                          return t == module505;
                        });
                    this.setState({
                      shouldShow: w && y && v && h && P,
                    });
                    console.log(
                      'FloatNotificationView count - ' + module11 + ',isModalAllowed - ' + h + ',isTimeAllowed - ' + y + ',isServerAllowed - ' + v + ',isLanguageAllowed - ' + P
                    );
                    O.next = 27;
                    break;

                  case 24:
                    O.prev = 24;
                    O.t2 = O.catch(0);
                    console.log('FloatNotificationView checkShouldShow error: ' + ('object' == typeof O.t2 ? JSON.stringify(O.t2) : O.t2));

                  case 27:
                  case 'end':
                    return O.stop();
                }
            },
            null,
            this,
            [
              [0, 24],
              [4, 13],
            ],
            Promise
          );
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            o = this.context.theme,
            s = module12.Dimensions.get('window').width - 2 * module1355.HorizontalMargin,
            l = j(
              j({}, module1355.BaseShadow),
              {},
              {
                width: s,
                height: this.state.selfHeight,
                radius: 10,
                color: o.shadowColor,
                style: {
                  marginLeft: module1355.HorizontalMargin,
                  marginBottom: 10,
                },
              }
            ),
            module1571 = React.default.createElement(module12.Image, {
              style: E.icon,
              source: require('./1571'),
            }),
            u = this.props.isArrowStyle
              ? React.default.createElement(module385.PureImageButton, {
                  image: o.popMsgBox.rightArrow,
                  imageWidth: 24,
                  imageHeight: 24,
                  style: E.button,
                  onPress: this.props.onPress.bind(this),
                })
              : React.default.createElement(module385.PureImageButton, {
                  image: o.popMsgBox.close,
                  imageWidth: 24,
                  imageHeight: 24,
                  style: E.closeBtn,
                  onPress: this.onPressCloseButton.bind(this),
                }),
            f = React.default.createElement(
              module12.TouchableHighlight,
              {
                underlayColor: 'transparent',
                onPress: function () {
                  if (t.props.onPress) t.props.onPress();
                  t.hide();
                },
              },
              React.default.createElement(
                module12.View,
                module22.default(
                  {
                    style: [
                      E.containter,
                      {
                        backgroundColor: o.componentBackgroundColor,
                        width: s,
                      },
                    ],
                    onLayout: this._onLayout,
                  },
                  Utils.getAccessibilityLabel('float_notification_view')
                ),
                React.default.createElement(
                  module12.View,
                  {
                    style: E.left,
                  },
                  module1571,
                  React.default.createElement(
                    module12.Text,
                    {
                      style: [
                        E.text,
                        {
                          color: o.navSubtitleColor,
                        },
                      ],
                      numberOfLines: 0,
                    },
                    this.props.content
                  )
                ),
                u
              )
            ),
            h = React.default.createElement(
              module1328.BoxShadow,
              {
                setting: l,
              },
              f
            );
          return this.state.shouldShow ? (this.state.selfHeight ? h : f) : null;
        },
      },
      {
        key: 'onPressCloseButton',
        value: function () {
          this.hide();
        },
      },
      {
        key: 'hide',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    if (!this.props.isArrowStyle) {
                      o.next = 2;
                      break;
                    }

                    return o.abrupt('return');

                  case 2:
                    this.setState({
                      shouldShow: false,
                    });
                    o.next = 5;
                    return regeneratorRuntime.default.awrap(module419.GetStorageKey(this.props.notificationKey));

                  case 5:
                    if (((o.t0 = o.sent), o.t0)) {
                      o.next = 8;
                      break;
                    }

                    o.t0 = 0;

                  case 8:
                    t = o.t0;
                    t++;
                    o.next = 12;
                    return regeneratorRuntime.default.awrap(module419.SetStorageKey(this.props.notificationKey, '' + t));

                  case 12:
                  case 'end':
                    return o.stop();
                }
            },
            null,
            this,
            null,
            Promise
          );
        },
      },
    ]);
    return C;
  })(React.default.PureComponent);

exports.default = A;
A.contextType = module1121.AppConfigContext;
var E = module12.StyleSheet.create({
  containter: {
    flexDirection: globals.isRTL ? 'row-reverse' : 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  left: {
    flexDirection: globals.isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
    flex: 0.7,
  },
  icon: {
    width: 30,
    height: 30,
    marginHorizontal: 15,
  },
  text: {
    fontSize: 12,
    textAlign: globals.isRTL ? 'right' : 'left',
    color: 'rgba(0,0,0,0.6)',
  },
  closeBtn: {
    marginHorizontal: 15,
    width: 24,
    height: 24,
  },
  button: {
    marginHorizontal: 15,
    width: 24,
    height: 24,
    transform: [
      {
        rotateY: globals.isRTL ? '180deg' : '0deg',
      },
    ],
  },
});
