require('./385');

require('./1844');

require('./1937');

require('./1950');

require('./1544');

var module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1553 = require('./1553'),
  module1543 = require('./1543');

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

var M = (function (t) {
  module7.default(w, t);

  var n = w,
    M = y(),
    E = function () {
      var t,
        o = module11.default(n);

      if (M) {
        var u = module11.default(this).constructor;
        t = Reflect.construct(o, arguments, u);
      } else t = o.apply(this, arguments);

      return module9.default(this, t);
    };

  function w(t) {
    var n;
    module4.default(this, w);
    (n = E.call(this, t)).state = {};
    return n;
  }

  module5.default(w, [
    {
      key: 'UNSAFE_componentWillMount',
      value: function () {},
    },
    {
      key: 'componentDidMount',
      value: function () {
        var t = this;
        module1543.ModeDataInstance.addChangeListener(function (n) {
          console.log('ModeDataInstance change', module1543.ModeDataInstance.modePannelCustomMops);
          t.forceUpdate();
        });
      },
    },
    {
      key: 'render',
      value: function () {
        return React.default.createElement(
          module12.View,
          {
            style: D.containter,
          },
          React.default.createElement(module1553.CustomMopModeView, {
            items: module1543.ModeDataInstance.modePannelCustomMops,
          })
        );
      },
    },
  ]);
  return w;
})(React.Component);

exports.default = M;
var D = module12.StyleSheet.create({
  containter: {
    flex: 1,
    backgroundColor: '#E6EAEE',
  },
  testButton: {
    marginTop: 100,
    marginLeft: 50,
    width: module12.Dimensions.get('window').width / 2 - 10,
    height: Utils.scaledPixel(40),
  },
});
