var module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module506 = require('./506');

function h() {
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
  _ = (function (t) {
    module7.default(b, t);

    var module506 = b,
      _ = h(),
      C = function () {
        var t,
          n = module11.default(module506);

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
            module21.default(
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
              module491.localization_strings_Setting_RemoteControlPage_61
            )
          );
        },
      },
    ]);
    return b;
  })(React.default.Component);

exports.default = _;
_.contextType = module506.AppConfigContext;
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
