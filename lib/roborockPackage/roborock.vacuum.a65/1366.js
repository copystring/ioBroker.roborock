var module6 = require('./6'),
  module8 = require('./8'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module1367 = require('./1367');

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

var v = Object.keys(module1367.default),
  h = v.map(function (t) {
    return module1367.default[t];
  }),
  y = v.length,
  R = (function (t) {
    module9.default(b, t);

    var React = b,
      module1367 = p(),
      R = function () {
        var t,
          n = module12.default(React);

        if (module1367) {
          var u = module12.default(this).constructor;
          t = Reflect.construct(n, arguments, u);
        } else t = n.apply(this, arguments);

        return module11.default(this, t);
      };

    function b() {
      var t;
      module6.default(this, b);

      (t = R.apply(this, arguments)).refMethod = function (n) {
        t.root = n;
      };

      t.setNativeProps = function (n) {
        t.root.setNativeProps(n);
      };

      for (var o = 0; o < y; o++) {
        var f = v[o],
          c = h[o];
        t[f] = 'function' == typeof c ? c.bind(module8.default(t)) : c;
      }

      t.state = t.touchableGetInitialState();
      return t;
    }

    return b;
  })(React.Component);

exports.default = R;
