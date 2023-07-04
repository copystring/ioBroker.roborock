var module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
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
  module9.default(R, t);

  var module391 = R,
    y = h(),
    b = function () {
      var t,
        n = module12.default(module391);

      if (y) {
        var o = module12.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module11.default(this, t);
    };

  function R() {
    module6.default(this, R);
    return b.apply(this, arguments);
  }

  module7.default(R, [
    {
      key: 'render',
      value: function () {
        this.props.hasBackgroundBubble;
        var t = this.props.hasBackgroundBubble ? v.root : {};
        return React.default.createElement(
          module13.View,
          {
            style: t,
            onLayout: this.props.onLayout,
          },
          React.default.createElement(
            module13.Text,
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
var v = module13.StyleSheet.create({
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
