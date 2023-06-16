require('./415');

var module22 = require('./22'),
  regeneratorRuntime = require('regenerator-runtime'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module391 = require('./391'),
  module1121 = require('./1121');

function x() {
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

require('./393');

var module505 = require('./505').strings,
  R = module12.NativeModules.RRRecorder,
  k = (function (t) {
    module7.default(P, t);

    var n = P,
      module1121 = x(),
      k = function () {
        var t,
          o = module11.default(n);

        if (module1121) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, s);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function P(t, n) {
      module4.default(this, P);
      return k.call(this, t);
    }

    module5.default(P, [
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
                    return regeneratorRuntime.default.awrap(R.requestRecordPermission());

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
            this.props.alertOwner.alert.alert(module505.ask_if_go_record_setting, '', [
              {
                text: module505.localization_strings_Main_MainPage_11,
                onPress: function () {},
              },
              {
                text: module505.localization_strings_Main_Error_ErrorDetailPage_3,
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
                    return regeneratorRuntime.default.awrap(R.goRecordSetting());

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
            s = this.props,
            c = s.style,
            l = s.calling,
            module2117 = this.props.isLandscape ? require('./2117') : this.context.theme.monitor.call,
            module2121 = this.props.isLandscape ? require('./2121') : this.context.theme.monitor.hung,
            p = l ? module2121 : module2117,
            v = l ? module505.click_to_end_call : module505.click_to_start_call;
          return React.default.createElement(
            module12.View,
            {
              style: c,
            },
            React.default.createElement(
              module12.TouchableOpacity,
              module22.default(
                {
                  style: this.props.isLandscape ? w.mic : w.defaultMicStyle,
                },
                module391.default.getAccessibilityLabel('call'),
                {
                  onPress: function () {
                    if (l) t.end();
                    else t.start();
                  },
                }
              ),
              React.default.createElement(module12.Image, {
                source: p,
                style: this.props.isLandscape ? w.mic : w.defaultMicStyle,
              })
            ),
            this.props.isLandscape
              ? React.default.createElement(module12.View, null)
              : React.default.createElement(
                  module12.Text,
                  {
                    numberOfLines: 2,
                    style: [
                      w.text,
                      {
                        color: n.monitor.tabTitleSelColor,
                      },
                    ],
                  },
                  v
                )
          );
        },
      },
    ]);
    return P;
  })(React.Component);

exports.default = k;
k.contextType = module1121.AppConfigContext;
var w = module12.StyleSheet.create({
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
