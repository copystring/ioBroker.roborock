var module22 = require('./22'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module385 = require('./385'),
  module391 = require('./391'),
  module1199 = require('./1199');

function C() {
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

var module510 = require('./510').strings,
  w = (function (t) {
    module9.default(E, t);

    var n = E,
      module1199 = C(),
      w = function () {
        var t,
          o = module12.default(n);

        if (module1199) {
          var s = module12.default(this).constructor;
          t = Reflect.construct(o, arguments, s);
        } else t = o.apply(this, arguments);

        return module11.default(this, t);
      };

    function E(t) {
      var n;
      module6.default(this, E);
      (n = w.call(this, t)).state = {
        isGoing: false,
        cleanButtonEnabled: true,
        goToButtonEnabled: true,
        tip: module510.rubys_main_goto_click_text,
      };
      return n;
    }

    module7.default(E, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {},
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.context.theme,
            s = [
              {
                title: module510.localization_strings_Common_Constants_12,
                image: this.context.theme.mapGoTo.zoneCleanImg,
              },
              {
                title: this.state.isGoing ? module510.localization_strings_Common_Constants_11 : module510.rubys_main_button_text_goto_cmd,
                image: this.state.isGoing ? this.context.theme.mapGoTo.pauseImg : this.context.theme.mapGoTo.goToImg,
              },
            ],
            l = React.default.createElement(
              module13.View,
              {
                style: x.top,
              },
              React.default.createElement(
                module13.Text,
                {
                  style: {
                    fontSize: 13,
                    color: n.mapEdit.itemTextColor,
                    textAlign: 'center',
                  },
                },
                this.state.tip
              )
            ),
            u = s.map(function (s, l) {
              return React.default.createElement(
                module385.TopImageButton,
                module22.default(
                  {
                    funcId: 'map_view_goto_menu_' + l,
                    style: [module391.default.isIphoneX() ? x.button : x.buttonSmall],
                    key: l,
                    enabled: 0 == l ? t.state.cleanButtonEnabled : t.state.goToButtonEnabled,
                  },
                  s,
                  {
                    imageWidth: 56,
                    imageHeight: 56,
                    fontSize: 12,
                    textTop: 10,
                    selectedColor: n.mapEdit.selectedTextColor,
                    textColor: '#9B9B9B',
                    onPress: t._onPressButton.bind(t, l),
                  }
                )
              );
            });
          return React.default.createElement(
            module13.View,
            {
              style: x.containter,
            },
            l,
            React.default.createElement(
              module13.View,
              {
                style: [
                  x.bottom,
                  {
                    backgroundColor: n.mapEdit.menuBackgroundColor,
                  },
                ],
              },
              React.default.createElement(
                module13.View,
                {
                  style: [x.mainMenuItemsView],
                },
                React.default.createElement(
                  module13.View,
                  {
                    style: [
                      x.menuListView,
                      {
                        width: module13.Dimensions.get('window').width - 100,
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
      {
        key: 'setGoToButonEnabled',
        value: function (t) {
          this.setState({
            goToButtonEnabled: t,
          });
        },
      },
    ]);
    return E;
  })(React.Component);

exports.default = w;
w.contextType = module1199.AppConfigContext;
var x = module13.StyleSheet.create({
  containter: {
    justifyContent: 'flex-end',
  },
  top: {
    position: 'absolute',
    flexDirection: 'row',
    left: 0,
    right: 0,
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
