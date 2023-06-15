require('./385');

require('./1920');

require('./2014');

require('./2027');

require('./1620');

require('./1628');

var module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module2028 = require('./2028'),
  module1939 = require('./1939');

function y() {
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

var D = (function (t) {
  module9.default(w, t);

  var n = w,
    D = y(),
    M = function () {
      var t,
        o = module12.default(n);

      if (D) {
        var u = module12.default(this).constructor;
        t = Reflect.construct(o, arguments, u);
      } else t = o.apply(this, arguments);

      return module11.default(this, t);
    };

  function w(t) {
    var n;
    module6.default(this, w);
    (n = M.call(this, t)).state = {};
    return n;
  }

  module7.default(w, [
    {
      key: 'UNSAFE_componentWillMount',
      value: function () {},
    },
    {
      key: 'componentDidMount',
      value: function () {
        var t = this;
        module2028.ModeDataInstance.addChangeListener(function (n) {
          console.log('ModeDataInstance change', module2028.ModeDataInstance.modePannelCustomMops);
          t.forceUpdate();
        });
      },
    },
    {
      key: 'render',
      value: function () {
        return React.default.createElement(
          module13.View,
          {
            style: E.containter,
          },
          React.default.createElement(module1939.default, null)
        );
      },
    },
  ]);
  return w;
})(React.Component);

exports.default = D;
var E = module13.StyleSheet.create({
  containter: {
    flex: 1,
    backgroundColor: '#E6EAEE',
  },
  testButton: {
    marginTop: 100,
    marginLeft: 50,
    width: module13.Dimensions.get('window').width / 2 - 10,
    height: Utils.scaledPixel(40),
  },
});
