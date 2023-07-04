var module4 = require('./4'),
  module6 = require('./6'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module1288 = require('./1288');

function p() {
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

var v = Object.keys(module1288.default),
  h = v.map(function (t) {
    return module1288.default[t];
  }),
  y = v.length,
  R = (function (t) {
    module7.default(b, t);

    var React = b,
      module1288 = p(),
      R = function () {
        var t,
          n = module11.default(React);

        if (module1288) {
          var u = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, u);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function b() {
      var t;
      module4.default(this, b);

      (t = R.apply(this, arguments)).refMethod = function (n) {
        t.root = n;
      };

      t.setNativeProps = function (n) {
        t.root.setNativeProps(n);
      };

      for (var o = 0; o < y; o++) {
        var f = v[o],
          c = h[o];
        t[f] = 'function' == typeof c ? c.bind(module6.default(t)) : c;
      }

      t.state = t.touchableGetInitialState();
      return t;
    }

    return b;
  })(React.Component);

exports.default = R;
