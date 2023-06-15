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
    var o = v(n);
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
  module381 = require('./381'),
  module407 = require('./407');

function v(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (v = function (t) {
    return t ? o : n;
  })(t);
}

function x() {
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

var module934 = require('./934'),
  module491 = require('./491'),
  I = module491.strings,
  w = (function (t) {
    module7.default(w, t);

    var v = w,
      module934 = x(),
      b = function () {
        var t,
          n = module11.default(v);

        if (module934) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function w(t) {
      var n;
      module4.default(this, w);
      (n = b.call(this, t)).state = {
        appUrl: '',
        fileMd5: '',
        proc: '',
        mode: '',
        install: '',
      };
      return n;
    }

    module5.default(w, [
      {
        key: 'componentDidMount',
        value: function () {},
      },
      {
        key: 'render',
        value: function () {
          var t = this;
          return React.default.createElement(
            module12.View,
            {
              style: M.containterView,
            },
            React.default.createElement(
              module12.ScrollView,
              {
                style: M.containter,
                showsVerticalScrollIndicator: false,
              },
              React.default.createElement(module12.TextInput, {
                onChangeText: function (n) {
                  return t.setState({
                    appUrl: n,
                  });
                },
                style: M.textInputStyle,
                placeholder: 'app_url',
              }),
              React.default.createElement(module12.TextInput, {
                onChangeText: function (n) {
                  return t.setState({
                    fileMd5: n,
                  });
                },
                style: M.textInputStyle,
                placeholder: 'file_md5',
              }),
              React.default.createElement(module12.TextInput, {
                onChangeText: function (n) {
                  return t.setState({
                    proc: n,
                  });
                },
                style: M.textInputStyle,
                placeholder: 'proc',
              }),
              React.default.createElement(module12.TextInput, {
                onChangeText: function (n) {
                  return t.setState({
                    mode: n,
                  });
                },
                style: M.textInputStyle,
                placeholder: 'mode',
              }),
              React.default.createElement(module12.TextInput, {
                onChangeText: function (n) {
                  return t.setState({
                    install: n,
                  });
                },
                style: M.textInputStyle,
                placeholder: 'install',
              }),
              React.default.createElement(module381.PureButton, {
                style: M.buttonStyle,
                textColor: 'white',
                title: '\u63a8\u9001',
                onPress: this.otaMiIot.bind(this),
              })
            )
          );
        },
      },
      {
        key: 'otaMiIot',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.prev = 0;
                    o.next = 3;
                    return regeneratorRuntime.default.awrap(
                      module407.default.otaMiIot(this.state.appUrl, this.state.fileMd5, this.state.proc, this.state.mode, this.state.install)
                    );

                  case 3:
                    t = o.sent;
                    console.log('otaMiIot  res : ' + JSON.stringify(t));
                    globals.showToast(JSON.stringify(t));
                    o.next = 12;
                    break;

                  case 8:
                    o.prev = 8;
                    o.t0 = o.catch(0);
                    globals.showToast(I.robot_communication_exception);
                    console.log('otaMiIot  error: ' + ('object' == typeof o.t0 ? JSON.stringify(o.t0) : o.t0));

                  case 12:
                  case 'end':
                    return o.stop();
                }
            },
            null,
            this,
            [[0, 8]],
            Promise
          );
        },
      },
    ]);
    return w;
  })(React.Component);

exports.default = w;
var M = module12.StyleSheet.create({
  containterView: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  containter: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginTop: module934.NavigationBarHeight,
    paddingBottom: 20,
  },
  textInputStyle: {
    height: 60,
    padding: 10,
    backgroundColor: 'white',
    marginTop: 30,
  },
  buttonStyle: {
    height: 60,
    padding: 10,
    backgroundColor: '#3384ff',
    margin: 30,
  },
});
