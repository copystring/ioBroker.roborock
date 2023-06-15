var module22 = require('./22'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module385 = require('./385');

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

var module500 = require('./500').strings,
  w = (function (t) {
    module7.default(C, t);

    var n = C,
      w = v(),
      _ = function () {
        var t,
          o = module11.default(n);

        if (w) {
          var u = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, u);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function C(t) {
      var n;
      module4.default(this, C);
      (n = _.call(this, t)).state = {
        menuList: [
          {
            title: '',
            detail: ' ',
            detailWidth: 150,
            onPress: function () {
              return n.onPressItem(0);
            },
            shouldShowRightArrow: false,
            visible: true,
          },
        ],
      };
      return n;
    }

    module5.default(C, [
      {
        key: 'componentDidMount',
        value: function () {},
      },
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {},
      },
      {
        key: 'getItems',
        value: function () {
          return this.state.menuList;
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.state.menuList.map(function (t, n) {
              return t.visible
                ? React.default.createElement(
                    module385.SettingListItemView,
                    module22.default({}, t, {
                      key: n,
                      titleColor: 'rgba(0,0,0,0.8)',
                    })
                  )
                : React.default.createElement(module12.View, null);
            });
          return React.default.createElement(
            module12.Modal,
            {
              transparent: true,
              visible: true,
              onRequestClose: this.onPressHideButton.bind(this),
            },
            React.default.createElement(
              module12.TouchableWithoutFeedback,
              {
                onPress: function () {
                  t.onPressHideButton();
                },
              },
              React.default.createElement(
                module12.View,
                {
                  style: P.container,
                },
                React.default.createElement(
                  module12.View,
                  {
                    style: P.contentView,
                  },
                  n,
                  React.default.createElement(
                    module12.View,
                    {
                      style: P.bottom,
                    },
                    React.default.createElement(module385.PureButton, {
                      title: module500.debug_info_copy_all,
                      textColor: '#000000',
                      style: P.button,
                      onPress: function () {
                        return t.onPressCopyButton();
                      },
                    }),
                    React.default.createElement(module385.PureButton, {
                      title: module500.debug_info_close,
                      textColor: '#000000',
                      style: P.button,
                      onPress: function () {
                        return t.onPressHideButton();
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
        key: 'onPressItem',
        value: function (t) {
          var n = this.state.menuList[t].detail;
          module12.Clipboard.setString(n);
          globals.showToast(module500.debug_info_copy_success);
        },
      },
      {
        key: 'onPressCopyButton',
        value: function () {
          var t = '';
          this.getItems().forEach(function (n) {
            if (n.visible) t += n.title + ' : ' + n.detail + ', ';
          });
          module12.Clipboard.setString(t);
          globals.showToast(module500.debug_info_copy_success);
        },
      },
      {
        key: 'onPressHideButton',
        value: function () {
          this.props.parent.setState({
            shouldShowAnonymousIDView: false,
          });
        },
      },
      {
        key: 'setMenuDetail',
        value: function (t, n, o) {
          var u = this.state.menuList;
          u[t].detail = n;
          u[t].title = o;
          this.setState({
            menuList: u,
          });
        },
      },
    ]);
    return C;
  })(React.Component);

exports.default = w;
var P = module12.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  contentView: {
    backgroundColor: 'white',
    alignSelf: 'stretch',
  },
  bottom: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignSelf: 'stretch',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  button: {
    width: 100,
    height: 40,
    borderWidth: 0.5,
    borderColor: '#dddddd',
    borderRadius: 20,
  },
});
