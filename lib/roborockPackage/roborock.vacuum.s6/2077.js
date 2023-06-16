var module21 = require('./21'),
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
    var n = w(o);
    if (n && n.has(t)) return n.get(t);
    var l = {},
      u = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var s in t)
      if ('default' !== s && Object.prototype.hasOwnProperty.call(t, s)) {
        var f = u ? Object.getOwnPropertyDescriptor(t, s) : null;
        if (f && (f.get || f.set)) Object.defineProperty(l, s, f);
        else l[s] = t[s];
      }

    l.default = t;
    if (n) n.set(t, l);
    return l;
  })(require('react')),
  module12 = require('./12'),
  module381 = require('./381');

function w(t) {
  if ('function' != typeof WeakMap) return null;
  var o = new WeakMap(),
    n = new WeakMap();
  return (w = function (t) {
    return t ? n : o;
  })(t);
}

function b() {
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

require('./389');

var module491 = require('./491'),
  v = Object.keys(module491.supportedLangs),
  C = (function (t) {
    module7.default(k, t);

    var w = k,
      module491 = b(),
      C = function () {
        var t,
          o = module11.default(w);

        if (module491) {
          var n = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, n);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function k(t) {
      var o;
      module4.default(this, k);
      (o = C.call(this, t)).state = {};
      return o;
    }

    module5.default(k, [
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
        value: function () {},
      },
      {
        key: 'getToastSwitchersConfig',
        value: function () {
          return [
            {
              title: '\u673a\u5668\u89e6\u53d1Toast\u6d4b\u8bd5\u6a21\u5f0f',
              visible: true,
              shouldShowSwitch: true,
              switchOn: globals.isRobotToastTestMode,
              switchValueChanged: this.robotToastModeDidChange.bind(this),
              shouldShowTopLongLine: true,
              shouldShowBottomLongLine: true,
              shouldShowRightArrow: false,
              bottomDetailLineHeight: Utils.isRRAndroid() ? 18 : 28,
              bottomDetail: '\u53ea\u9650\u6d4b\u8bd5\u591a\u8bed\u8a00\u7684UI\u663e\u793a\uff0c\u6d4b\u8bd5\u89e6\u53d1\u903b\u8f91\u7684\u65f6\u5019\u52a1\u5fc5\u5173\u95ed.',
            },
            {
              title: 'Error\u6d4b\u8bd5\u6a21\u5f0f',
              visible: true,
              shouldShowSwitch: true,
              switchOn: globals.isTestErrorMode,
              switchValueChanged: this.errorTestModeDidChange.bind(this),
              shouldShowTopLongLine: true,
              shouldShowBottomLongLine: true,
              shouldShowRightArrow: false,
              bottomDetailLineHeight: Utils.isRRAndroid() ? 18 : 28,
              bottomDetail: '\u53ea\u9650\u6d4b\u8bd5\u591a\u8bed\u8a00\u7684UI\u663e\u793a\uff0c\u6d4b\u8bd5\u89e6\u53d1\u903b\u8f91\u7684\u65f6\u5019\u52a1\u5fc5\u5173\u95ed.',
            },
          ];
        },
      },
      {
        key: 'robotToastModeDidChange',
        value: function (t) {
          globals.isRobotToastTestMode = t;
          this.forceUpdate();
        },
      },
      {
        key: 'errorTestModeDidChange',
        value: function (t) {
          globals.isTestErrorMode = t;
          this.forceUpdate();
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = v.map(function (o, n) {
              var l = (n + 1) % 4 == 0 ? 0 : 5,
                u = v[n] == globals.AppLang,
                s = React.default.createElement(module381.PureButton, {
                  style: [
                    S.button,
                    {
                      marginRight: l,
                      backgroundColor: u ? '#3384FF' : 'white',
                    },
                  ],
                  title: o,
                  key: n,
                  selected: u,
                  onPress: t.selectLang.bind(t, n),
                  fontSize: 14,
                  textColor: '#333333',
                  selectedTextColor: 'white',
                }),
                f = React.default.createElement(
                  module12.View,
                  {
                    key: n,
                  },
                  s
                );
              return u ? f : s;
            }),
            l = this.getToastSwitchersConfig().map(function (t, n) {
              return React.default.createElement(
                module381.SettingListItemView,
                module21.default({}, t, {
                  key: n,
                  fontSize: 16,
                  titleColor: 'rgba(0,0,0,0.8)',
                })
              );
            });
          return React.default.createElement(
            module12.View,
            {
              style: S.containter,
            },
            React.default.createElement(
              module12.View,
              null,
              React.default.createElement(
                module12.Text,
                {
                  style: S.title,
                },
                '\u591a\u8bed\u8a00\u5207\u6362'
              ),
              React.default.createElement(
                module12.View,
                {
                  style: S.buttonsWrap,
                },
                n
              )
            ),
            React.default.createElement(module12.View, null, l),
            React.default.createElement(module381.PureButton, {
              title: '\u786e\u5b9a',
              style: S.confirmButton,
              textColor: 'white',
              onPress: this.onPressConfirmButton.bind(this),
            })
          );
        },
      },
      {
        key: 'onPressConfirmButton',
        value: function () {
          if (this.props.onConfirm) this.props.onConfirm(globals.AppLang);
          if (this.props.parent) this.props.parent.hide();
        },
      },
      {
        key: 'selectLang',
        value: function (t) {
          globals.AppLang = v[t];
          this.forceUpdate();
        },
      },
    ]);
    return k;
  })(React.Component),
  S = module12.StyleSheet.create({
    containter: {
      backgroundColor: '#ffffff',
      borderTopLeftRadius: 2,
      borderTopRightRadius: 2,
    },
    buttonsWrap: {
      width: module12.Dimensions.get('window').width - 20,
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingHorizontal: 10,
      justifyContent: 'flex-start',
    },
    button: {
      width: (module12.Dimensions.get('window').width - 60) / 4,
      height: 35,
      marginBottom: 10,
      borderColor: '#dddddd',
      borderWidth: 0.6,
      borderRadius: 17.5,
    },
    title: {
      fontSize: 17,
      marginLeft: 20,
      paddingVertical: 20,
      color: 'rgba(0,0,0,0.8)',
    },
    confirmButton: {
      width: '90%',
      height: 40,
      borderRadius: 20,
      marginVertical: 20,
      alignSelf: 'center',
      backgroundColor: '#3384FF',
    },
  }),
  k = module381.HocBottomModal(C, false);

exports.default = k;
