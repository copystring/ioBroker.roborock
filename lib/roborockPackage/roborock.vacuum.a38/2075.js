var module22 = require('./22'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module385 = require('./385');

function b() {
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

require('./393');

var module500 = require('./500'),
  v = Object.keys(module500.supportedLangs),
  C = (function (t) {
    module7.default(L, t);

    var o = L,
      module500 = b(),
      C = function () {
        var t,
          n = module11.default(o);

        if (module500) {
          var l = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, l);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function L(t) {
      var o;
      module4.default(this, L);
      (o = C.call(this, t)).state = {};
      return o;
    }

    module5.default(L, [
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
            o = v.map(function (o, n) {
              var l = (n + 1) % 4 == 0 ? 0 : 5,
                s = (module12.Dimensions.get('window').width - 60) / 4,
                u = v[n] == globals.AppLang,
                c = React.default.createElement(module385.PureButton, {
                  style: [
                    S.button,
                    {
                      marginRight: l,
                      width: s,
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
                  c
                );
              return u ? f : c;
            }),
            l = this.getToastSwitchersConfig().map(function (t, o) {
              return React.default.createElement(
                module385.SettingListItemView,
                module22.default({}, t, {
                  key: o,
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
                o
              )
            ),
            React.default.createElement(module12.View, null, l),
            React.default.createElement(module385.PureButton, {
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
    return L;
  })(React.Component),
  S = module12.StyleSheet.create({
    containter: {
      backgroundColor: '#ffffff',
      borderTopLeftRadius: 2,
      borderTopRightRadius: 2,
    },
    buttonsWrap: {
      marginHorizontal: 10,
      alignSelf: 'stretch',
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingHorizontal: 10,
      justifyContent: 'flex-start',
    },
    button: {
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
  L = module385.HocBottomModal(C, false);

exports.default = L;
