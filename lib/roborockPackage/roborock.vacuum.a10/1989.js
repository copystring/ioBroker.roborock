require('./387');

var regeneratorRuntime = require('regenerator-runtime'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = (function (t, n) {
    if (!n && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var o = b(n);
    if (o && o.has(t)) return o.get(t);
    var l = {},
      u = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var s in t)
      if ('default' !== s && Object.prototype.hasOwnProperty.call(t, s)) {
        var c = u ? Object.getOwnPropertyDescriptor(t, s) : null;
        if (c && (c.get || c.set)) Object.defineProperty(l, s, c);
        else l[s] = t[s];
      }

    l.default = t;
    if (o) o.set(t, l);
    return l;
  })(require('react')),
  module12 = require('./12'),
  module381 = require('./381'),
  module407 = require('./407'),
  module390 = require('./390');

function b(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (b = function (t) {
    return t ? o : n;
  })(t);
}

function v() {
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

var x = (function (t) {
  module7.default(C, t);

  var b = C,
    x = v(),
    S = function () {
      var t,
        n = module11.default(b);

      if (x) {
        var o = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function C(t) {
    var n;
    module4.default(this, C);
    (n = S.call(this, t)).state = {
      text: '',
    };
    return n;
  }

  module5.default(C, [
    {
      key: 'UNSAFE_componentWillMount',
      value: function () {},
    },
    {
      key: 'render',
      value: function () {
        var t = this;
        return React.default.createElement(
          module12.Modal,
          {
            transparent: true,
            visible: this.state.shouldShow,
          },
          React.default.createElement(
            module12.KeyboardAvoidingView,
            {
              style: [
                V.containter,
                {
                  height: module390.default.sharedCache().ScreenHeight,
                },
                this.props.style,
              ],
              behavior: 'padding',
            },
            React.default.createElement(
              module12.View,
              {
                style: V.wrap,
              },
              React.default.createElement(
                module12.View,
                {
                  style: V.titleView,
                },
                React.default.createElement(
                  module12.Text,
                  {
                    style: V.title,
                  },
                  '\u97f3\u91cf\u8bbe\u7f6e'
                )
              ),
              React.default.createElement(
                module12.View,
                {
                  style: V.middle,
                },
                React.default.createElement(module12.TextInput, {
                  underlineColorAndroid: 'transparent',
                  style: V.textInput,
                  value: '' + this.state.text,
                  onChangeText: function (n) {
                    return t.setState({
                      text: n,
                    });
                  },
                  placeholder: '\u8f93\u5165\u673a\u5668\u4eba\u97f3\u91cf',
                  placeholderTextColor: '#00000033',
                })
              ),
              React.default.createElement(
                module12.View,
                {
                  style: V.bottom,
                },
                React.default.createElement(
                  module12.View,
                  {
                    style: V.bottomButton,
                  },
                  React.default.createElement(module381.PureButton, {
                    title: '\u53d6\u6d88',
                    onPress: function () {
                      return t.onPressCancleButton();
                    },
                  })
                ),
                React.default.createElement(
                  module12.View,
                  {
                    style: V.bottomButton,
                  },
                  React.default.createElement(module381.PureButton, {
                    enabled: this.state.confirmButtonEnabled,
                    style: V.bottomButton,
                    title: '\u8bd5\u542c',
                    textColor: '#3384FF',
                    onPress: function () {
                      return t.onPressTestButton();
                    },
                  })
                )
              )
            )
          )
        );
      },
    },
    {
      key: 'onPressCancleButton',
      value: function () {
        this.props.parent.setState({
          showVoiceTest: false,
        });
      },
    },
    {
      key: 'onPressTestButton',
      value: function () {
        var t, module4;
        return regeneratorRuntime.default.async(
          function (l) {
            for (;;)
              switch ((l.prev = l.next)) {
                case 0:
                  t = parseInt(this.state.text);
                  l.prev = 1;
                  console.warn('intValue - ' + t);
                  l.next = 5;
                  return regeneratorRuntime.default.awrap(module407.default.setSoundVolume(t));

                case 5:
                  module4 = l.sent;
                  console.warn('setSoundVolume - ' + JSON.stringify(module4));
                  l.next = 9;
                  return regeneratorRuntime.default.awrap(module407.default.testSoundVolume());

                case 9:
                  console.warn('testSoundVolume - ' + JSON.stringify(module4));
                  l.next = 17;
                  break;

                case 13:
                  l.prev = 13;
                  l.t0 = l.catch(1);
                  console.warn('setSoundVolume  error: ' + ('object' == typeof l.t0 ? JSON.stringify(l.t0) : l.t0));
                  if (this.props.setVolumeDidFail) this.props.setVolumeDidFail(localizationStrings.robot_communication_exception);

                case 17:
                case 'end':
                  return l.stop();
              }
          },
          null,
          this,
          [[1, 13]],
          Promise
        );
      },
    },
  ]);
  return C;
})(React.Component);

exports.default = x;
var V = module12.StyleSheet.create({
  containter: {
    left: 0,
    top: 0,
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: module12.Dimensions.get('window').width,
  },
  wrap: {
    width: module12.Dimensions.get('window').width - 80,
    borderRadius: 8,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  titleView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    marginVertical: 10,
  },
  title: {
    color: 'black',
    marginVertical: 10,
    fontSize: 16,
  },
  textInput: {
    marginHorizontal: 20,
    marginBottom: 30,
    height: 40,
    borderWidth: 0.8,
    borderRadius: 4,
    fontSize: 13,
    backgroundColor: '#F0F0F0',
    paddingLeft: 20,
    borderColor: '#eeeeee',
    color: 'black',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderTopColor: '#eeeeee',
    borderTopWidth: 0.8,
    height: 40,
  },
  bottomButton: {
    width: module12.Dimensions.get('window').width / 2 - 40,
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
