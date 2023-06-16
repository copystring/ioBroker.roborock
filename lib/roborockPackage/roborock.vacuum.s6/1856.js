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
    var u = {},
      l = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var s in t)
      if ('default' !== s && Object.prototype.hasOwnProperty.call(t, s)) {
        var c = l ? Object.getOwnPropertyDescriptor(t, s) : null;
        if (c && (c.get || c.set)) Object.defineProperty(u, s, c);
        else u[s] = t[s];
      }

    u.default = t;
    if (o) o.set(t, u);
    return u;
  })(require('react')),
  module12 = require('./12'),
  module381 = require('./381'),
  module387 = require('./387'),
  module390 = require('./390');

function w(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (w = function (t) {
    return t ? o : n;
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

var module491 = require('./491').strings,
  module936 = require('./936'),
  S = (function (t) {
    module7.default(P, t);

    var w = P,
      S = b(),
      _ = function () {
        var t,
          n = module11.default(w);

        if (S) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function P(t) {
      var o;
      module4.default(this, P);
      (o = _.call(this, t)).state = {
        shouldShow: false,
        randomCode: '',
      };
      return o;
    }

    module5.default(P, [
      {
        key: 'render',
        value: function () {
          var t = this,
            n = React.default.createElement(
              module12.TouchableWithoutFeedback,
              {
                onPress: function () {
                  t.setState({
                    shouldShow: false,
                  });
                },
              },
              React.default.createElement(
                module12.View,
                {
                  style: [
                    module387.default.iOSAndroidReturn(O.iOSContainer, O.androidContainer),
                    {
                      height:
                        module390.default.sharedCache().ScreenHeight - module387.default.iOSAndroidReturn(64, 44) - module936.AppBarMarginTop - module387.default.statusbarHeight(),
                    },
                  ],
                },
                React.default.createElement(
                  module12.View,
                  {
                    style: O.wrap,
                    pointerEvents: 'box-none',
                  },
                  React.default.createElement(
                    module12.Text,
                    {
                      style: O.code,
                    },
                    module491.random_code + ':' + this.state.randomCode
                  ),
                  React.default.createElement(module381.PureButton, {
                    funcId: 'random_code_copy',
                    title: module491.debug_info_copy_all,
                    textColor: '#EB0029',
                    style: O.copyButton,
                    onPress: this.onPressCopyButton.bind(this),
                  })
                )
              )
            ),
            o = React.default.createElement(
              module12.Modal,
              {
                transparent: true,
                visible: this.state.shouldShow,
                onRequestClose: function () {
                  console.log('closed');
                },
              },
              n
            ),
            u = this.state.shouldShow ? n : React.default.createElement(module12.View, null);
          return module387.default.iOSAndroidReturn(u, o);
        },
      },
      {
        key: 'onPressCopyButton',
        value: function () {
          var t = this;
          module12.Clipboard.setString(this.state.randomCode);
          globals.showToast(module491.debug_info_copy_success);
          setTimeout(function () {
            t.setState({
              shouldShow: false,
            });
          }, 1e3);
        },
      },
    ]);
    return P;
  })(React.default.PureComponent);

exports.default = S;
var O = module12.StyleSheet.create({
  androidContainer: {
    marginTop: 44,
    width: module12.Dimensions.get('window').width,
    height: module12.Dimensions.get('window').height,
    backgroundColor: 'rgba(00, 00, 00, 0.4)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  iOSContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: module12.Dimensions.get('window').width,
    height: module12.Dimensions.get('window').height,
    backgroundColor: 'rgba(00, 00, 00, 0.4)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  wrap: {
    alignSelf: 'stretch',
    height: 100,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  code: {
    marginLeft: 20,
    color: 'rgba(0,0,0,0.8)',
  },
  copyButton: {
    marginRight: 20,
    marginTop: 33,
    width: 61,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: '#EB0029',
  },
});
