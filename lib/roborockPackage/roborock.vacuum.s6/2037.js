var module4 = require('./4'),
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
    var o = w(n);
    if (o && o.has(t)) return o.get(t);
    var l = {},
      c = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var u in t)
      if ('default' !== u && Object.prototype.hasOwnProperty.call(t, u)) {
        var s = c ? Object.getOwnPropertyDescriptor(t, u) : null;
        if (s && (s.get || s.set)) Object.defineProperty(l, u, s);
        else l[u] = t[u];
      }

    l.default = t;
    if (o) o.set(t, l);
    return l;
  })(require('react')),
  module12 = require('./12'),
  module381 = require('./381'),
  module377 = require('./377'),
  module387 = require('./387'),
  module386 = require('./386'),
  module506 = require('./506'),
  module415 = require('./415');

function w(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (w = function (t) {
    return t ? o : n;
  })(t);
}

function T() {
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

var module389 = require('./389'),
  module491 = require('./491').strings;

exports.FuncTabBackgroundHeight = 50;

var k = (function (t) {
  module7.default(k, t);

  var module387 = k,
    module506 = T(),
    w = function () {
      var t,
        n = module11.default(module387);

      if (module506) {
        var o = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function k(t) {
    var o;
    module4.default(this, k);
    (o = w.call(this, t)).state = {
      current: t.current || 0,
    };
    return o;
  }

  module5.default(k, [
    {
      key: 'UNSAFE_componentWillMount',
      value: function () {},
    },
    {
      key: 'render',
      value: function () {
        var t = this,
          n = this.context.theme,
          o = function (t) {
            var o = t.title,
              l = t.selected,
              c = t.onPress;
            return React.default.createElement(
              module12.TouchableOpacity,
              {
                onPress: c,
                activeOpacity: 1,
              },
              React.default.createElement(
                module12.View,
                {
                  style: M.item,
                },
                React.default.createElement(
                  module12.Text,
                  {
                    style: [
                      M.title,
                      {
                        fontWeight: l ? 'bold' : 'normal',
                        color: l ? n.monitor.tabTitleSelColor : n.monitor.tabTitleColor,
                      },
                    ],
                  },
                  o
                ),
                l &&
                  React.default.createElement(module381.GradientView, {
                    colors: n.monitor.gradientBackground,
                    start: {
                      x: 0,
                      y: 0,
                    },
                    end: {
                      x: 1,
                      y: 0,
                    },
                    style: M.indicatorLine,
                  })
              )
            );
          },
          l = module386.default.isRecordAllowed()
            ? [
                module491.monitor_func_menu_remote_tab,
                module491.floor_map_default_name_prefix,
                module415.DMM.isTanosV ? module491.title_voice_or_sound : module491.title_tab_call,
              ].map(function (n, l) {
                return React.default.createElement(o, {
                  key: l,
                  title: n,
                  selected: l == t.state.current,
                  onPress: t.selectItem.bind(t, l),
                });
              })
            : [module491.monitor_func_menu_remote_tab, module491.floor_map_default_name_prefix].map(function (n, l) {
                return React.default.createElement(o, {
                  key: l,
                  title: n,
                  selected: l == t.state.current,
                  onPress: t.selectItem.bind(t, l),
                });
              });

        return React.default.createElement(
          module12.ImageBackground,
          {
            style: [M.containter, this.props.style],
            source: n.monitor.funcTabMenu,
          },
          l
        );
      },
    },
    {
      key: 'selectItem',
      value: function (t) {
        if (module377.RSM.voiceChat) globals.showToast(module491.voice_chat_title2);
        else if (module386.default.isRecordAllowed())
          2 != t || (module389.isRecordSupported() && 2 == module389.iotType)
            ? (this.setState({
                current: t,
              }),
              this.props.didSelectItem && this.props.didSelectItem(t))
            : this.props.showNotReadyTip && this.props.showNotReadyTip();
        else if (2 == t) {
          if (this.props.showNotReadyTip) this.props.showNotReadyTip();
        } else {
          this.setState({
            current: t,
          });
          if (this.props.didSelectItem) this.props.didSelectItem(t);
        }
      },
    },
  ]);
  return k;
})(React.Component);

exports.FuncTabMenu = k;
k.contextType = module506.AppConfigContext;
var M = module12.StyleSheet.create({
  containter: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: module12.Dimensions.get('window').width,
    height: 50,
  },
  item: {
    alignSelf: 'center',
    height: 48,
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  title: {
    fontSize: module387.default.scaledPixel(14),
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
