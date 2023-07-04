var module22 = require('./22'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1193 = require('./1193');

function h() {
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
  _ = (function (t) {
    module9.default(b, t);

    var module1193 = b,
      _ = h(),
      C = function () {
        var t,
          n = module12.default(module1193);

        if (_) {
          var o = module12.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module11.default(this, t);
      };

    function b() {
      module6.default(this, b);
      return C.apply(this, arguments);
    }

    module7.default(b, [
      {
        key: 'render',
        value: function () {
          var t = this.context.theme;
          return React.default.createElement(
            module13.View,
            module22.default(
              {
                style: [x.noteView],
                opacity: this.props.visible ? 1 : 0,
              },
              Utils.getAccessibilityLabel('remote_note_view')
            ),
            React.default.createElement(
              module13.Text,
              {
                style: [
                  x.noteText,
                  {
                    color: t.remoteControl.headTitleColor,
                  },
                ],
              },
              module510.localization_strings_Setting_RemoteControlPage_61
            )
          );
        },
      },
    ]);
    return b;
  })(React.default.Component);

exports.default = _;
_.contextType = module1193.AppConfigContext;
module13.Dimensions.get('screen');
var x = module13.StyleSheet.create({
  noteView: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderColor: 'transparent',
  },
  noteText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 25,
  },
});
