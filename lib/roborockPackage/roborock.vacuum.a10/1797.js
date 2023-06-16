var regeneratorRuntime = require('regenerator-runtime'),
  module21 = require('./21'),
  module49 = require('./49'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = (function (t, o) {
    if (!o && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var n = k(o);
    if (n && n.has(t)) return n.get(t);
    var s = {},
      l = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var u in t)
      if ('default' !== u && Object.prototype.hasOwnProperty.call(t, u)) {
        var c = l ? Object.getOwnPropertyDescriptor(t, u) : null;
        if (c && (c.get || c.set)) Object.defineProperty(s, u, c);
        else s[u] = t[u];
      }

    s.default = t;
    if (n) n.set(t, s);
    return s;
  })(require('react')),
  module12 = require('./12'),
  module381 = require('./381'),
  module411 = require('./411'),
  module1363 = require('./1363'),
  module377 = require('./377'),
  module1063 = require('./1063'),
  module1065 = require('./1065'),
  module506 = require('./506');

function k(t) {
  if ('function' != typeof WeakMap) return null;
  var o = new WeakMap(),
    n = new WeakMap();
  return (k = function (t) {
    return t ? n : o;
  })(t);
}

function j(t, o) {
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

function M(t) {
  for (var o = 1; o < arguments.length; o++) {
    var n = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      j(Object(n), true).forEach(function (o) {
        module49.default(t, o, n[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(n));
    else
      j(Object(n)).forEach(function (o) {
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
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (t) {
    return false;
  }
}

var module491 = require('./491').strings.getResourceLanguageCode(),
  A = (function (t) {
    module7.default(j, t);

    var module49 = j,
      module506 = B(),
      k = function () {
        var t,
          o = module11.default(module49);

        if (module506) {
          var n = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, n);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function j(t) {
      var o;
      module4.default(this, j);
      (o = k.call(this, t)).state = {
        shouldShow: false,
        selfHeight: 0,
      };
      return o;
    }

    module5.default(j, [
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
          var t, module21, module49, module4, module5, module7, module9, h, React, y, w, O, P;
          return regeneratorRuntime.default.async(
            function (x) {
              for (;;)
                switch ((x.prev = x.next)) {
                  case 0:
                    x.prev = 0;
                    t = this.props;
                    module21 = t.notificationKey;
                    module49 = t.showCount;
                    module4 = t.beginTime;
                    module5 = t.endTime;
                    module7 = t.allowedServers;
                    module9 = t.allowedLanguages;
                    if (undefined == (h = t.isModalAllowed)) h = true;
                    React = 0;
                    x.prev = 4;
                    x.next = 7;
                    return regeneratorRuntime.default.awrap(module411.GetStorageKey(module21));

                  case 7:
                    if (((x.t0 = x.sent), x.t0)) {
                      x.next = 10;
                      break;
                    }

                    x.t0 = 0;

                  case 10:
                    React = x.t0;
                    x.next = 16;
                    break;

                  case 13:
                    x.prev = 13;
                    x.t1 = x.catch(4);
                    console.log('FloatNotificationView GetStorageKey error: ' + x.t1);

                  case 16:
                    y = !module49 || parseInt(React) <= module49;
                    w = !module4 || module1363.default().isBetween(module4, module5);
                    O =
                      !module7 ||
                      -1 !=
                        module7.findIndex(function (t) {
                          return t == module377.RobotStatusManager.sharedManager().serverCode;
                        });
                    P =
                      !module9 ||
                      -1 !=
                        module9.findIndex(function (t) {
                          return t == module491;
                        });
                    this.setState({
                      shouldShow: y && w && O && h && P,
                    });
                    console.log(
                      'FloatNotificationView count - ' + React + ',isModalAllowed - ' + h + ',isTimeAllowed - ' + w + ',isServerAllowed - ' + O + ',isLanguageAllowed - ' + P
                    );
                    x.next = 27;
                    break;

                  case 24:
                    x.prev = 24;
                    x.t2 = x.catch(0);
                    console.log('FloatNotificationView checkShouldShow error: ' + ('object' == typeof x.t2 ? JSON.stringify(x.t2) : x.t2));

                  case 27:
                  case 'end':
                    return x.stop();
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
        key: '_onLayout',
        value: function (t) {
          var o = t.nativeEvent.layout.height;
          this.setState({
            selfHeight: o,
          });
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            o = this.context.theme,
            s = M(
              M({}, module1063.BaseShadow),
              {},
              {
                width: module12.Dimensions.get('window').width - 2 * module1063.HorizontalMargin,
                height: this.state.selfHeight,
                radius: 10,
                color: o.shadowColor,
                style: {
                  marginLeft: module1063.HorizontalMargin,
                  marginBottom: 10,
                },
              }
            ),
            module1372 = React.default.createElement(
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
                module21.default(
                  {
                    style: [
                      H.containter,
                      {
                        backgroundColor: o.componentBackgroundColor,
                      },
                    ],
                    onLayout: this._onLayout.bind(this),
                  },
                  Utils.getAccessibilityLabel('float_notification_view')
                ),
                React.default.createElement(module12.Image, {
                  style: H.icon,
                  source: require('./1372'),
                }),
                React.default.createElement(
                  module12.Text,
                  {
                    style: [
                      H.text,
                      {
                        color: o.navSubtitleColor,
                      },
                    ],
                    numberOfLines: 0,
                  },
                  this.props.content
                ),
                !this.props.isArrowStyle &&
                  React.default.createElement(module381.PureImageButton, {
                    image: o.popMsgBox.close,
                    imageWidth: 24,
                    imageHeight: 24,
                    style: H.button,
                    onPress: this.onPressCloseButton.bind(this),
                  }),
                this.props.isArrowStyle &&
                  React.default.createElement(module381.PureImageButton, {
                    image: o.popMsgBox.rightArrow,
                    imageWidth: 24,
                    imageHeight: 24,
                    style: H.button,
                    onPress: this.props.onPress.bind(this),
                  })
              )
            ),
            u = React.default.createElement(
              module1065.BoxShadow,
              {
                setting: s,
              },
              module1372
            );
          return this.state.shouldShow ? (this.state.selfHeight ? u : module1372) : null;
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
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    if (!this.props.isArrowStyle) {
                      n.next = 2;
                      break;
                    }

                    return n.abrupt('return');

                  case 2:
                    this.setState({
                      shouldShow: false,
                    });
                    n.next = 5;
                    return regeneratorRuntime.default.awrap(module411.GetStorageKey(this.props.notificationKey));

                  case 5:
                    if (((n.t0 = n.sent), n.t0)) {
                      n.next = 8;
                      break;
                    }

                    n.t0 = 0;

                  case 8:
                    t = n.t0;
                    t++;
                    n.next = 12;
                    return regeneratorRuntime.default.awrap(module411.SetStorageKey(this.props.notificationKey, '' + t));

                  case 12:
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
    ]);
    return j;
  })(React.default.PureComponent);

exports.default = A;
A.contextType = module506.AppConfigContext;
var H = module12.StyleSheet.create({
  containter: {
    flexDirection: 'row',
    width: module12.Dimensions.get('window').width - 2 * module1063.HorizontalMargin,
    paddingVertical: 10,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  icon: {
    width: 30,
    height: 30,
    marginHorizontal: 15,
  },
  text: {
    width: module12.Dimensions.get('window').width - 2 * module1063.HorizontalMargin - 30 - 45 - 20,
    fontSize: 12,
    color: 'rgba(0,0,0,0.6)',
  },
  closeButton: {},
  button: {
    width: 24,
    height: 24,
  },
});
