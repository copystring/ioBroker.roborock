require('./407');

var regeneratorRuntime = require('regenerator-runtime'),
  module21 = require('./21'),
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

    var o = _(n);

    if (o && o.has(t)) return o.get(t);
    var c = {},
      s = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var l in t)
      if ('default' !== l && Object.prototype.hasOwnProperty.call(t, l)) {
        var u = s ? Object.getOwnPropertyDescriptor(t, l) : null;
        if (u && (u.get || u.set)) Object.defineProperty(c, l, u);
        else c[l] = t[l];
      }

    c.default = t;
    if (o) o.set(t, c);
    return c;
  })(require('react')),
  module12 = require('./12'),
  module387 = require('./387'),
  module506 = require('./506');

function _(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (_ = function (t) {
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

var module491 = require('./491').strings,
  P = module12.NativeModules.RRRecorder,
  b = (function (t) {
    module7.default(O, t);

    var module506 = O,
      _ = x(),
      b = function () {
        var t,
          n = module11.default(module506);

        if (_) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function O(t, n) {
      module4.default(this, O);
      return b.call(this, t);
    }

    module5.default(O, [
      {
        key: 'componentDidMount',
        value: function () {},
      },
      {
        key: '_requestRecordPermission',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    t.prev = 0;
                    t.next = 3;
                    return regeneratorRuntime.default.awrap(P.requestRecordPermission());

                  case 3:
                    if ('no' == t.sent && 'android' == module12.Platform.OS) this._recordSetting();
                    t.next = 10;
                    break;

                  case 7:
                    t.prev = 7;
                    t.t0 = t.catch(0);
                    console.error(t.t0);

                  case 10:
                  case 'end':
                    return t.stop();
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
        key: '_recordSetting',
        value: function () {
          var t = this;
          if (this.props.alertOwner)
            this.props.alertOwner.alert.alert(module491.ask_if_go_record_setting, '', [
              {
                text: module491.localization_strings_Main_MainPage_11,
                onPress: function () {},
              },
              {
                text: module491.localization_strings_Main_Error_ErrorDetailPage_3,
                onPress: function () {
                  t._goRecordSetting();
                },
              },
            ]);
        },
      },
      {
        key: '_goRecordSetting',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    t.prev = 0;
                    t.next = 3;
                    return regeneratorRuntime.default.awrap(P.goRecordSetting());

                  case 3:
                    t.next = 9;
                    break;

                  case 6:
                    t.prev = 6;
                    t.t0 = t.catch(0);
                    console.error(t.t0);

                  case 9:
                  case 'end':
                    return t.stop();
                }
            },
            null,
            null,
            [[0, 6]],
            Promise
          );
        },
      },
      {
        key: 'start',
        value: function () {
          if (!this.props.calling) this.props.start && this.props.start();
        },
      },
      {
        key: 'end',
        value: function () {
          if (this.props.end) this.props.end();
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.context.theme,
            c = this.props,
            s = c.style,
            l = c.calling,
            module2051 = this.props.isLandscape ? require('./2051') : this.context.theme.monitor.call,
            module2055 = this.props.isLandscape ? require('./2055') : this.context.theme.monitor.hung,
            v = l ? module2055 : module2051,
            _ = l ? module491.click_to_end_call : module491.click_to_start_call;

          return React.default.createElement(
            module12.View,
            {
              style: s,
            },
            React.default.createElement(
              module12.TouchableOpacity,
              module21.default(
                {
                  style: this.props.isLandscape ? k.mic : k.defaultMicStyle,
                },
                module387.default.getAccessibilityLabel('call'),
                {
                  onPress: function () {
                    if (l) t.end();
                    else t.start();
                  },
                }
              ),
              React.default.createElement(module12.Image, {
                source: v,
                style: this.props.isLandscape ? k.mic : k.defaultMicStyle,
              })
            ),
            this.props.isLandscape
              ? React.default.createElement(module12.View, null)
              : React.default.createElement(
                  module12.Text,
                  {
                    numberOfLines: 2,
                    style: [
                      k.text,
                      {
                        color: n.monitor.tabTitleSelColor,
                      },
                    ],
                  },
                  _
                )
          );
        },
      },
    ]);
    return O;
  })(React.Component);

exports.default = b;
b.contextType = module506.AppConfigContext;
var k = module12.StyleSheet.create({
  defaultMicStyle: {
    alignSelf: 'center',
    height: 126,
    width: 126,
  },
  text: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.6)',
    width: module12.Dimensions.get('screen').width - 30,
    textAlign: 'center',
  },
  mic: {
    height: 38,
    width: 81,
    alignSelf: 'center',
  },
});
