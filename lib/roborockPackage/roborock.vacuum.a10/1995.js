require('./381');

var regeneratorRuntime = require('regenerator-runtime'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = (function (t, o) {
    if (!o && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var n = M(o);
    if (n && n.has(t)) return n.get(t);
    var s = {},
      c = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var l in t)
      if ('default' !== l && Object.prototype.hasOwnProperty.call(t, l)) {
        var u = c ? Object.getOwnPropertyDescriptor(t, l) : null;
        if (u && (u.get || u.set)) Object.defineProperty(s, l, u);
        else s[l] = t[l];
      }

    s.default = t;
    if (n) n.set(t, s);
    return s;
  })(require('react')),
  module12 = require('./12'),
  module407 = require('./407'),
  module1227 = require('./1227');

function M(t) {
  if ('function' != typeof WeakMap) return null;
  var o = new WeakMap(),
    n = new WeakMap();
  return (M = function (t) {
    return t ? n : o;
  })(t);
}

function v() {
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
  S = module491.strings,
  module2001 = (function (t) {
    module7.default(module1997, t);

    var M = module1997,
      module934 = v(),
      b = function () {
        var t,
          o = module11.default(M);

        if (module934) {
          var n = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, n);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function module1997() {
      module4.default(this, module1997);
      return b.apply(this, arguments);
    }

    module5.default(module1997, [
      {
        key: 'componentDidMount',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    this.getLayerMode();
                    this.getMopMode();

                  case 2:
                  case 'end':
                    return t.stop();
                }
            },
            null,
            this,
            null,
            Promise
          );
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this;
          return React.default.createElement(
            module12.View,
            {
              style: P.containterView,
            },
            React.default.createElement(
              module12.ScrollView,
              {
                style: P.containter,
                showsVerticalScrollIndicator: false,
              },
              React.default.createElement(module1227.default, {
                funcId: 'layer_mode_set_view',
                ref: function (o) {
                  t.layerModeSetView = o;
                },
                style: {
                  marginHorizontal: 20,
                  marginTop: 20,
                  marginBottom: 20,
                },
                title: '\u6258\u677f\u5347\u964d',
                items: [
                  {
                    name: '\u4e0a\u5347',
                    selected: require('./1996'),
                    normal: require('./1997'),
                    strength: 0,
                  },
                  {
                    name: '\u4e0b\u964d',
                    selected: require('./1998'),
                    normal: require('./1999'),
                    strength: 1,
                  },
                ],
                onPressButton: this.onPressLayerMode.bind(this),
              }),
              React.default.createElement(module1227.default, {
                funcId: 'mop_mode_set_view',
                ref: function (o) {
                  t.mopModeSetView = o;
                },
                style: {
                  marginHorizontal: 20,
                  marginTop: 20,
                  marginBottom: 20,
                },
                title: '\u9707\u52a8\u5f3a\u5ea6',
                items: [
                  {
                    name: '1\u6863',
                    selected: require('./1996'),
                    normal: require('./1997'),
                    strength: 201,
                  },
                  {
                    name: '2\u6863',
                    selected: require('./1998'),
                    normal: require('./1999'),
                    strength: 202,
                  },
                  {
                    name: '3\u6863',
                    selected: require('./2000'),
                    normal: require('./2001'),
                    strength: 203,
                  },
                ],
                onPressButton: this.onPressMopMode.bind(this),
              })
            )
          );
        },
      },
      {
        key: 'onPressLayerMode',
        value: function (t, n) {
          var s;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    c.prev = 0;
                    c.next = 3;
                    return regeneratorRuntime.default.awrap(module407.default.setMopMontorStatus(n));

                  case 3:
                    s = c.sent;
                    console.log('onPressLayerMode  res : ' + JSON.stringify(s));
                    c.next = 12;
                    break;

                  case 7:
                    c.prev = 7;
                    c.t0 = c.catch(0);
                    if (this.layerModeSetView) this.layerModeSetView.setMode(t, -1);
                    globals.showToast(S.robot_communication_exception);
                    console.log('onPressLayerMode  error: ' + ('object' == typeof c.t0 ? JSON.stringify(c.t0) : c.t0));

                  case 12:
                  case 'end':
                    return c.stop();
                }
            },
            null,
            this,
            [[0, 7]],
            Promise
          );
        },
      },
      {
        key: 'onPressMopMode',
        value: function (t, n) {
          var s;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    c.prev = 0;
                    c.t0 = regeneratorRuntime.default;
                    c.next = 4;
                    return regeneratorRuntime.default.awrap(module407.default.setWaterBoxMode(n));

                  case 4:
                    c.t1 = c.sent;
                    c.next = 7;
                    return c.t0.awrap.call(c.t0, c.t1);

                  case 7:
                    s = c.sent;
                    console.log('onPressMopMode  res : ' + JSON.stringify(s));
                    c.next = 16;
                    break;

                  case 11:
                    c.prev = 11;
                    c.t2 = c.catch(0);
                    if (this.mopModeSetView) this.mopModeSetView.setMode(t, -1);
                    globals.showToast(S.robot_communication_exception);
                    console.log('onPressMopMode  error: ' + ('object' == typeof c.t2 ? JSON.stringify(c.t2) : c.t2));

                  case 16:
                  case 'end':
                    return c.stop();
                }
            },
            null,
            this,
            [[0, 11]],
            Promise
          );
        },
      },
      {
        key: 'getLayerMode',
        value: function () {
          var t, n;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    s.prev = 0;
                    s.next = 3;
                    return regeneratorRuntime.default.awrap(module407.default.getMopMontorStatus());

                  case 3:
                    t = s.sent;
                    if (0 != (n = t.result.status) && 1 != n) n = 0;
                    if (this.layerModeSetView) this.layerModeSetView.setMode(n, -1);
                    console.log('getLayerMode  res : ' + JSON.stringify(t));
                    s.next = 14;
                    break;

                  case 10:
                    s.prev = 10;
                    s.t0 = s.catch(0);
                    globals.showToast(S.robot_communication_exception);
                    console.log('getLayerMode  error: ' + ('object' == typeof s.t0 ? JSON.stringify(s.t0) : s.t0));

                  case 14:
                  case 'end':
                    return s.stop();
                }
            },
            null,
            this,
            [[0, 10]],
            Promise
          );
        },
      },
      {
        key: 'getMopMode',
        value: function () {
          var t, n;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    s.prev = 0;
                    s.next = 3;
                    return regeneratorRuntime.default.awrap(module407.default.getWaterBoxMode());

                  case 3:
                    t = s.sent;
                    if (201 != (n = t.result[0]) && 202 != n && 203 != n) n = 201;
                    console.log('getMopMode  res : ' + JSON.stringify(t));
                    if (this.mopModeSetView) this.mopModeSetView.setMode(n, -1);
                    s.next = 14;
                    break;

                  case 10:
                    s.prev = 10;
                    s.t0 = s.catch(0);
                    globals.showToast(S.robot_communication_exception);
                    console.log('getMopMode  error: ' + ('object' == typeof s.t0 ? JSON.stringify(s.t0) : s.t0));

                  case 14:
                  case 'end':
                    return s.stop();
                }
            },
            null,
            this,
            [[0, 10]],
            Promise
          );
        },
      },
    ]);
    return module1997;
  })(React.Component);

exports.default = module2001;
var P = module12.StyleSheet.create({
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
