var module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12');

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

var v = (function (t) {
  module7.default(b, t);

  var n = b,
    v = h(),
    w = function () {
      var t,
        o = module11.default(n);

      if (v) {
        var u = module11.default(this).constructor;
        t = Reflect.construct(o, arguments, u);
      } else t = o.apply(this, arguments);

      return module9.default(this, t);
    };

  function b(t) {
    var n;
    module4.default(this, b);
    (n = w.call(this, t)).state = {};
    return n;
  }

  module5.default(b, [
    {
      key: 'UNSAFE_componentWillMount',
      value: function () {},
    },
    {
      key: 'render',
      value: function () {
        var t = this.props.progress ** 1;
        return React.default.createElement(
          module12.View,
          {
            style: [y.wrap, this.props.style],
          },
          React.default.createElement(module12.View, {
            style: [
              y.progressView,
              {
                width: 68 * t,
              },
            ],
          })
        );
      },
    },
  ]);
  return b;
})(React.Component);

exports.default = v;
var y = module12.StyleSheet.create({
  wrap: {
    height: 8,
    width: 68,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  progressView: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 8,
    backgroundColor: '#007AFF',
  },
});
