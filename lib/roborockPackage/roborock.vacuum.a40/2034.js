var module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12');

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

var p = (function (t) {
  module7.default(b, t);

  var n = b,
    p = y(),
    w = function () {
      var t,
        o = module11.default(n);

      if (p) {
        var l = module11.default(this).constructor;
        t = Reflect.construct(o, arguments, l);
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
        var t = this.props,
          n = t.value,
          o = t.style;
        return React.default.createElement(
          module12.View,
          {
            style: [v.containter, o],
          },
          React.default.createElement(
            module12.View,
            {
              style: v.battery,
            },
            React.default.createElement(module12.View, {
              style: [
                v.inner,
                {
                  width: (22 * n) / 100,
                },
              ],
            }),
            React.default.createElement(module12.View, {
              style: v.dot,
            })
          ),
          React.default.createElement(
            module12.Text,
            {
              style: v.percent,
            },
            n,
            '%'
          )
        );
      },
    },
  ]);
  return b;
})(React.Component);

exports.default = p;
p.defaultProps = {
  value: 50,
};
var v = module12.StyleSheet.create({
  containter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  battery: {
    width: 26,
    height: 12,
    padding: 1,
    borderWidth: 1,
    justifyContent: 'center',
    borderColor: 'white',
    borderRadius: 2,
  },
  inner: {
    flex: 1,
    backgroundColor: 'white',
  },
  percent: {
    marginLeft: 10,
    fontSize: 12,
    color: 'white',
  },
  dot: {
    position: 'absolute',
    right: -3,
    width: 3,
    height: 3,
    borderRadius: 1,
    backgroundColor: 'white',
  },
});
