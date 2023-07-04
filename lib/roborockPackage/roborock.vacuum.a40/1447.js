var module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module391 = require('./391');

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

var y = (function (t) {
  module7.default(R, t);

  var module391 = R,
    y = h(),
    b = function () {
      var t,
        n = module11.default(module391);

      if (y) {
        var o = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function R() {
    module4.default(this, R);
    return b.apply(this, arguments);
  }

  module5.default(R, [
    {
      key: 'render',
      value: function () {
        this.props.hasBackgroundBubble;
        var t = this.props.hasBackgroundBubble ? v.root : {};
        return React.default.createElement(
          module12.View,
          {
            style: t,
            onLayout: this.props.onLayout,
          },
          React.default.createElement(
            module12.Text,
            {
              numberOfLines: 1,
              style: v.text,
            },
            this.props.sequenceID
          )
        );
      },
    },
  ]);
  return R;
})(React.default.Component);

exports.SequenceIDView = y;
var v = module12.StyleSheet.create({
  root: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  text: {
    marginHorizontal: 2.5,
    fontSize: 9,
    color: 'white',
    includeFontPadding: false,
    paddingBottom: module391.default.iOSAndroidReturn(1, 0),
  },
});
