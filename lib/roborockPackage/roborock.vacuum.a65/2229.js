require('./416');

var module22 = require('./22'),
  regeneratorRuntime = require('regenerator-runtime'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module391 = require('./391'),
  module1200 = require('./1200');

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

var module510 = require('./510').strings,
  R = module13.NativeModules.RRRecorder,
  k = (function (t) {
    module9.default(P, t);

    var n = P,
      module1200 = x(),
      k = function () {
        var t,
          o = module12.default(n);

        if (module1200) {
          var s = module12.default(this).constructor;
          t = Reflect.construct(o, arguments, s);
        } else t = o.apply(this, arguments);

        return module11.default(this, t);
      };

    function P(t, n) {
      module6.default(this, P);
      return k.call(this, t);
    }

    module7.default(P, [
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
                    if ('no' == t.sent && 'android' == module13.Platform.OS) this._recordSetting();
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
            this.props.alertOwner.alert.alert(module510.ask_if_go_record_setting, '', [
              {
                text: module510.localization_strings_Main_MainPage_11,
                onPress: function () {},
              },
              {
                text: module510.localization_strings_Main_Error_ErrorDetailPage_3,
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
            module2226 = this.props.isLandscape ? require('./2226') : this.context.theme.monitor.call,
            module2230 = this.props.isLandscape ? require('./2230') : this.context.theme.monitor.hung,
            p = l ? module2230 : module2226,
            v = l ? module510.click_to_end_call : module510.click_to_start_call;
          return React.default.createElement(
            module13.View,
            {
              style: c,
            },
            React.default.createElement(
              module13.TouchableOpacity,
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
              React.default.createElement(module13.Image, {
                source: p,
                style: this.props.isLandscape ? w.mic : w.defaultMicStyle,
              })
            ),
            this.props.isLandscape
              ? React.default.createElement(module13.View, null)
              : React.default.createElement(
                  module13.Text,
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
k.contextType = module1200.AppConfigContext;
var w = module13.StyleSheet.create({
  defaultMicStyle: {
    alignSelf: 'center',
    height: 126,
    width: 126,
  },
  text: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.6)',
    width: module13.Dimensions.get('screen').width - 30,
    textAlign: 'center',
  },
  mic: {
    height: 38,
    width: 81,
    alignSelf: 'center',
  },
});
