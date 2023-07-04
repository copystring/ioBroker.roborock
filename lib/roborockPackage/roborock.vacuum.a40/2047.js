var module22 = require('./22'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module385 = require('./385'),
  module381 = require('./381'),
  module391 = require('./391'),
  module390 = require('./390'),
  module515 = require('./515'),
  module422 = require('./422');

function R() {
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

var module393 = require('./393'),
  module500 = require('./500').strings;

exports.FuncTabBackgroundHeight = 50;

var C = (function (t) {
  module7.default(I, t);

  var n = I,
    module515 = R(),
    C = function () {
      var t,
        o = module11.default(n);

      if (module515) {
        var l = module11.default(this).constructor;
        t = Reflect.construct(o, arguments, l);
      } else t = o.apply(this, arguments);

      return module9.default(this, t);
    };

  function I(t) {
    var n;
    module4.default(this, I);
    (n = C.call(this, t)).state = {
      current: t.current || 0,
    };
    return n;
  }

  module5.default(I, [
    {
      key: 'UNSAFE_componentWillMount',
      value: function () {},
    },
    {
      key: 'render',
      value: function () {
        var t = this,
          n = this.context.theme,
          l = function (t) {
            var l = t.title,
              c = t.selected,
              u = t.onPress,
              s = t.index;
            return React.default.createElement(
              module12.TouchableOpacity,
              module22.default({}, module391.default.getAccessibilityLabel('func_tab_name_' + s), {
                onPress: u,
                activeOpacity: 1,
              }),
              React.default.createElement(
                module12.View,
                {
                  style: k.item,
                },
                React.default.createElement(
                  module12.Text,
                  {
                    style: [
                      k.title,
                      {
                        fontWeight: c ? 'bold' : 'normal',
                        color: c ? n.monitor.tabTitleSelColor : n.monitor.tabTitleColor,
                      },
                    ],
                  },
                  l
                ),
                c &&
                  React.default.createElement(module385.GradientView, {
                    colors: n.monitor.gradientBackground,
                    start: {
                      x: 0,
                      y: 0,
                    },
                    end: {
                      x: 1,
                      y: 0,
                    },
                    style: k.indicatorLine,
                  })
              )
            );
          },
          c = module390.default.isRecordAllowed()
            ? [
                module500.monitor_func_menu_remote_tab,
                module500.floor_map_default_name_prefix,
                module422.DMM.isTanosV ? module500.title_voice_or_sound : module500.title_tab_call,
              ].map(function (n, o) {
                return React.default.createElement(l, {
                  key: o,
                  title: n,
                  index: o,
                  selected: o == t.state.current,
                  onPress: t.selectItem.bind(t, o),
                });
              })
            : [module500.monitor_func_menu_remote_tab, module500.floor_map_default_name_prefix].map(function (n, o) {
                return React.default.createElement(l, {
                  key: o,
                  title: n,
                  selected: o == t.state.current,
                  onPress: t.selectItem.bind(t, o),
                });
              });

        return React.default.createElement(
          module12.ImageBackground,
          {
            style: [k.containter, this.props.style],
            source: n.monitor.funcTabMenu,
          },
          c
        );
      },
    },
    {
      key: 'selectItem',
      value: function (t) {
        if (!module381.RSM.voiceChat || 2 == t || module390.default.isSupportRemoteControlInCall())
          module390.default.isRecordAllowed()
            ? 2 != t || (module393.isRecordSupported() && 2 == module393.iotType)
              ? (this.setState({
                  current: t,
                }),
                this.props.didSelectItem && this.props.didSelectItem(t))
              : this.props.showNotReadyTip && this.props.showNotReadyTip()
            : 2 == t
            ? this.props.showNotReadyTip && this.props.showNotReadyTip()
            : (this.setState({
                current: t,
              }),
              this.props.didSelectItem && this.props.didSelectItem(t));
        else globals.showToast(module500.voice_chat_title2);
      },
    },
  ]);
  return I;
})(React.Component);

exports.FuncTabMenu = C;
C.contextType = module515.AppConfigContext;
var k = module12.StyleSheet.create({
  containter: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 50,
  },
  item: {
    alignSelf: 'center',
    height: 48,
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  title: {
    fontSize: module391.default.scaledPixel(14),
  },
  point: {
    position: 'absolute',
    bottom: 8,
    alignSelf: 'center',
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#007AFF',
  },
  indicatorLine: {
    position: 'absolute',
    alignSelf: 'center',
    height: 2,
    width: 28,
    bottom: 0,
  },
});
