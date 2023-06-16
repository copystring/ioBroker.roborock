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
    var o = b(n);
    if (o && o.has(t)) return o.get(t);
    var u = {},
      s = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var l in t)
      if ('default' !== l && Object.prototype.hasOwnProperty.call(t, l)) {
        var c = s ? Object.getOwnPropertyDescriptor(t, l) : null;
        if (c && (c.get || c.set)) Object.defineProperty(u, l, c);
        else u[l] = t[l];
      }

    u.default = t;
    if (o) o.set(t, u);
    return u;
  })(require('react')),
  module12 = require('./12'),
  module381 = require('./381'),
  module387 = require('./387');

require('./407');

function b(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (b = function (t) {
    return t ? o : n;
  })(t);
}

function w() {
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
  C = (function (t) {
    module7.default(k, t);

    var b = k,
      C = w(),
      _ = function () {
        var t,
          n = module11.default(b);

        if (C) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function k(t) {
      var n;
      module4.default(this, k);
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

    module5.default(k, [
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
            o = this.state.menuList.map(function (t, o) {
              return t.visible
                ? React.default.createElement(
                    module381.SettingListItemView,
                    module21.default({}, t, {
                      key: o,
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
                  style: [module387.default.iOSAndroidReturn(P.iOSContainer, P.androidContainer)],
                },
                React.default.createElement(
                  module12.View,
                  {
                    style: P.contentView,
                  },
                  o,
                  React.default.createElement(
                    module12.View,
                    {
                      style: P.bottom,
                    },
                    React.default.createElement(module381.PureButton, {
                      title: module491.debug_info_copy_all,
                      textColor: '#000000',
                      style: P.button,
                      onPress: function () {
                        return t.onPressCopyButton();
                      },
                    }),
                    React.default.createElement(module381.PureButton, {
                      title: module491.debug_info_close,
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
          globals.showToast(module491.debug_info_copy_success);
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
          globals.showToast(module491.debug_info_copy_success);
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
    return k;
  })(React.Component);

exports.default = C;
var P = module12.StyleSheet.create({
  androidContainer: {
    width: module12.Dimensions.get('window').width,
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  iOSContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: module12.Dimensions.get('window').width,
    height: module12.Dimensions.get('window').height,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  contentView: {
    backgroundColor: 'white',
    width: module12.Dimensions.get('window').width,
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
