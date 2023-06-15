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
    var o = y(n);
    if (o && o.has(t)) return o.get(t);
    var l = {},
      u = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var c in t)
      if ('default' !== c && Object.prototype.hasOwnProperty.call(t, c)) {
        var f = u ? Object.getOwnPropertyDescriptor(t, c) : null;
        if (f && (f.get || f.set)) Object.defineProperty(l, c, f);
        else l[c] = t[c];
      }

    l.default = t;
    if (o) o.set(t, l);
    return l;
  })(require('react')),
  module12 = require('./12'),
  module387 = require('./387'),
  module381 = require('./381'),
  module390 = require('./390');

function y(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (y = function (t) {
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

var module491 = require('./491').strings,
  w = (function (t) {
    module7.default(E, t);

    var y = E,
      w = b(),
      k = function () {
        var t,
          n = module11.default(y);

        if (w) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function E(t) {
      var o;
      module4.default(this, E);
      (o = k.call(this, t)).state = {
        shouldShow: false,
      };
      return o;
    }

    module5.default(E, [
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
              onRequestClose: function () {},
            },
            React.default.createElement(
              module12.View,
              {
                style: [
                  S.container,
                  {
                    height: module390.default.sharedCache().ScreenHeight - module387.default.statusbarHeight(),
                  },
                ],
              },
              React.default.createElement(
                module12.View,
                {
                  style: [S.wrap, this.props.style],
                },
                React.default.createElement(
                  module12.View,
                  {
                    style: S.top,
                  },
                  React.default.createElement(
                    module12.Text,
                    {
                      style: S.title,
                    },
                    module491.map_edit_map_lab_save_map_kindly_remind
                  )
                ),
                React.default.createElement(
                  module12.View,
                  {
                    style: S.middle,
                  },
                  React.default.createElement(
                    module12.Text,
                    {
                      style: S.content,
                    },
                    module491.map_edit_map_lab_save_map_kindly_remind1
                  ),
                  React.default.createElement(
                    module12.Text,
                    {
                      style: S.content,
                    },
                    module491.map_edit_map_lab_save_map_kindly_remind2
                  ),
                  React.default.createElement(
                    module12.Text,
                    {
                      style: S.content,
                    },
                    module491.map_edit_map_lab_save_map_kindly_remind3 + ' ' + (module387.default.isRRAndroid() ? '\n' : '')
                  )
                ),
                React.default.createElement(
                  module12.View,
                  null,
                  React.default.createElement(module381.PureButton, {
                    funcId: 'save_map_mode_tips_confirm',
                    title: module491.localization_strings_Setting_RemoteControlPage_51,
                    textColor: 'white',
                    style: S.button,
                    fontSize: 16,
                    onPress: function () {
                      t.setState({
                        shouldShow: false,
                      });
                    },
                  })
                )
              )
            )
          );
        },
      },
    ]);
    return E;
  })(React.Component);

exports.default = w;
w.defaultProps = {
  shouldShow: false,
};
var S = module12.StyleSheet.create({
  container: {
    width: module12.Dimensions.get('window').width,
    height: module12.Dimensions.get('window').height,
    backgroundColor: 'rgba(00, 00, 00, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrap: {
    marginHorizontal: 30,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 4,
    overflow: 'hidden',
  },
  top: {
    marginTop: 30,
  },
  title: {
    color: 'rgba(0, 0, 0, 0.8)',
    fontSize: 18,
  },
  subTitle: {
    color: 'rgba(0, 0, 0, 0.8)',
    fontSize: 14,
    fontWeight: 'bold',
  },
  middle: {
    marginTop: 10,
    paddingHorizontal: 20,
    alignItems: 'flex-start',
    borderTopColor: '#eeeeee',
    borderTopWidth: 1,
  },
  content: {
    color: 'rgba(0, 0, 0, 0.8)',
    marginTop: 20,
    fontSize: 15,
    textAlign: 'left',
    lineHeight: 24,
  },
  button: {
    marginTop: 30,
    marginBottom: 30,
    width: 268,
    height: 48,
    borderRadius: 2,
    backgroundColor: '#3384FF',
  },
});
