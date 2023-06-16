var module22 = require('./22'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module515 = require('./515');

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

var module500 = require('./500').strings,
  _ = (function (t) {
    module7.default(b, t);

    var module515 = b,
      _ = h(),
      C = function () {
        var t,
          n = module11.default(module515);

        if (_) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function b() {
      module4.default(this, b);
      return C.apply(this, arguments);
    }

    module5.default(b, [
      {
        key: 'render',
        value: function () {
          var t = this.context.theme;
          return React.default.createElement(
            module12.View,
            module22.default(
              {
                style: [x.noteView],
                opacity: this.props.visible ? 1 : 0,
              },
              Utils.getAccessibilityLabel('remote_note_view')
            ),
            React.default.createElement(
              module12.Text,
              {
                style: [
                  x.noteText,
                  {
                    color: t.remoteControl.headTitleColor,
                  },
                ],
              },
              module500.localization_strings_Setting_RemoteControlPage_61
            )
          );
        },
      },
    ]);
    return b;
  })(React.default.Component);

exports.default = _;
_.contextType = module515.AppConfigContext;
module12.Dimensions.get('screen');
var x = module12.StyleSheet.create({
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
