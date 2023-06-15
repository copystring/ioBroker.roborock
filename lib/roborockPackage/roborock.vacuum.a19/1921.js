var module21 = require('./21'),
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
    var o = w(n);
    if (o && o.has(t)) return o.get(t);
    var s = {},
      l = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var u in t)
      if ('default' !== u && Object.prototype.hasOwnProperty.call(t, u)) {
        var c = l ? Object.getOwnPropertyDescriptor(t, u) : null;
        if (c && (c.get || c.set)) Object.defineProperty(s, u, c);
        else s[u] = t[u];
      }

    s.default = t;
    if (o) o.set(t, s);
    return s;
  })(require('react')),
  module12 = require('./12'),
  module381 = require('./381'),
  module387 = require('./387'),
  module506 = require('./506');

function w(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (w = function (t) {
    return t ? o : n;
  })(t);
}

function _() {
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

var module491 = require('./491').strings,
  v = (function (t) {
    module7.default(x, t);

    var module506 = x,
      w = _(),
      v = function () {
        var t,
          n = module11.default(module506);

        if (w) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function x(t) {
      var n;
      module4.default(this, x);
      (n = v.call(this, t)).state = {
        isGoing: false,
        cleanButtonEnabled: true,
        tip: module491.rubys_main_goto_click_text,
      };
      return n;
    }

    module5.default(x, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {},
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            o = this.context.theme,
            s = [
              {
                title: module491.localization_strings_Common_Constants_12,
                image: this.context.theme.mapGoTo.zoneCleanImg,
              },
              {
                title: this.state.isGoing ? module491.localization_strings_Common_Constants_11 : module491.rubys_main_button_text_goto_cmd,
                image: this.state.isGoing ? this.context.theme.mapGoTo.pauseImg : this.context.theme.mapGoTo.goToImg,
              },
            ],
            l = React.default.createElement(
              module12.View,
              {
                style: B.top,
              },
              React.default.createElement(
                module12.Text,
                {
                  style: {
                    fontSize: 13,
                    color: o.mapEdit.itemTextColor,
                    textAlign: 'center',
                  },
                },
                this.state.tip
              )
            ),
            u = s.map(function (s, l) {
              return React.default.createElement(
                module381.TopImageButton,
                module21.default(
                  {
                    funcId: 'map_view_goto_menu_' + l,
                    style: [module387.default.isIphoneX() ? B.button : B.buttonSmall],
                    key: l,
                    enabled: !(0 == l && !t.state.cleanButtonEnabled),
                  },
                  s,
                  {
                    imageWidth: 56,
                    imageHeight: 56,
                    fontSize: 12,
                    textTop: 10,
                    selectedColor: o.mapEdit.selectedTextColor,
                    textColor: '#9B9B9B',
                    onPress: t._onPressButton.bind(t, l),
                  }
                )
              );
            });
          return React.default.createElement(
            module12.View,
            {
              style: B.containter,
            },
            l,
            React.default.createElement(
              module12.View,
              {
                style: [
                  B.bottom,
                  {
                    backgroundColor: o.mapEdit.menuBackgroundColor,
                  },
                ],
              },
              React.default.createElement(
                module12.View,
                {
                  style: [B.mainMenuItemsView],
                },
                React.default.createElement(
                  module12.View,
                  {
                    style: [
                      B.menuListView,
                      {
                        width: module12.Dimensions.get('window').width - 100,
                      },
                    ],
                  },
                  u
                )
              )
            )
          );
        },
      },
      {
        key: '_onPressButton',
        value: function (t) {
          switch (t) {
            case 0:
              if (!this.state.cleanButtonEnabled) return;
              if (this.props.onPressSpotCleanButton) this.props.onPressSpotCleanButton();
              break;

            case 1:
              if (this.state.isGoing) {
                if (this.props.onPressPauseGotoButton) this.props.onPressPauseGotoButton();
              } else if (this.props.onPressGotoButton) this.props.onPressGotoButton();
          }
        },
      },
      {
        key: 'setCleanButonEnabled',
        value: function (t) {
          this.setState({
            cleanButtonEnabled: t,
          });
        },
      },
    ]);
    return x;
  })(React.Component);

exports.default = v;
v.contextType = module506.AppConfigContext;
var B = module12.StyleSheet.create({
  containter: {
    justifyContent: 'flex-end',
  },
  top: {
    position: 'absolute',
    flexDirection: 'row',
    left: 0,
    width: module12.Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    top: -35,
    paddingHorizontal: 20,
  },
  tip: {
    color: 'rgba(0,0,0,0.6)',
    fontSize: 14,
  },
  topButton: {
    width: 100,
    height: 40,
    marginHorizontal: 20,
    borderRadius: 20,
    shadowColor: 'rgba(0,0,0,1)',
    shadowRadius: 42,
    shadowOffset: {
      width: 10,
      height: 10,
    },
    borderColor: '#eeeeee',
    borderWidth: 1,
  },
  button: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSmall: {
    backgroundColor: 'transparent',
  },
  bottom: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  mainMenuItemsView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 27,
    marginBottom: 34,
  },
  menuListView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
});
