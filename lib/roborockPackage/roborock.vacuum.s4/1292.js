var module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module387 = require('./387');

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

var y = (function (t) {
  module7.default(B, t);

  var module387 = B,
    y = h(),
    b = function () {
      var t,
        n = module11.default(module387);

      if (y) {
        var o = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function B() {
    module4.default(this, B);
    return b.apply(this, arguments);
  }

  module5.default(B, [
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
  return B;
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
    paddingBottom: module387.default.iOSAndroidReturn(1, 0),
  },
});
