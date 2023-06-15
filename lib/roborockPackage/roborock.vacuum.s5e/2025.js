require('./391');

var regeneratorRuntime = require('regenerator-runtime'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module385 = require('./385'),
  module415 = require('./415'),
  module394 = require('./394');

function v() {
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

var x = (function (t) {
  module7.default(C, t);

  var n = C,
    x = v(),
    V = function () {
      var t,
        o = module11.default(n);

      if (x) {
        var l = module11.default(this).constructor;
        t = Reflect.construct(o, arguments, l);
      } else t = o.apply(this, arguments);

      return module9.default(this, t);
    };

  function C(t) {
    var n;
    module4.default(this, C);
    (n = V.call(this, t)).state = {
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
                S.containter,
                {
                  height: module394.default.sharedCache().ScreenHeight,
                },
                this.props.style,
              ],
              behavior: 'padding',
            },
            React.default.createElement(
              module12.View,
              {
                style: S.wrap,
              },
              React.default.createElement(
                module12.View,
                {
                  style: S.titleView,
                },
                React.default.createElement(
                  module12.Text,
                  {
                    style: S.title,
                  },
                  '\u97f3\u91cf\u8bbe\u7f6e'
                )
              ),
              React.default.createElement(
                module12.View,
                {
                  style: S.middle,
                },
                React.default.createElement(module12.TextInput, {
                  underlineColorAndroid: 'transparent',
                  style: S.textInput,
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
                  style: S.bottom,
                },
                React.default.createElement(
                  module12.View,
                  {
                    style: S.bottomButton,
                  },
                  React.default.createElement(module385.PureButton, {
                    title: '\u53d6\u6d88',
                    onPress: function () {
                      return t.onPressCancleButton();
                    },
                  })
                ),
                React.default.createElement(
                  module12.View,
                  {
                    style: S.bottomButton,
                  },
                  React.default.createElement(module385.PureButton, {
                    enabled: this.state.confirmButtonEnabled,
                    style: S.bottomButton,
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
        var t, n;
        return regeneratorRuntime.default.async(
          function (l) {
            for (;;)
              switch ((l.prev = l.next)) {
                case 0:
                  t = parseInt(this.state.text);
                  l.prev = 1;
                  console.warn('intValue - ' + t);
                  l.next = 5;
                  return regeneratorRuntime.default.awrap(module415.default.setSoundVolume(t));

                case 5:
                  n = l.sent;
                  console.warn('setSoundVolume - ' + JSON.stringify(n));
                  l.next = 9;
                  return regeneratorRuntime.default.awrap(module415.default.testSoundVolume());

                case 9:
                  console.warn('testSoundVolume - ' + JSON.stringify(n));
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
var S = module12.StyleSheet.create({
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
