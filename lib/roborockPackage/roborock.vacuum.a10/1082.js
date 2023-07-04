var module4 = require('./4'),
  module6 = require('./6'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module1083 = require('./1083');

function p() {
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

var v = Object.keys(module1083.default),
  h = v.map(function (t) {
    return module1083.default[t];
  }),
  y = v.length,
  R = (function (t) {
    module7.default(b, t);

    var React = b,
      module1083 = p(),
      R = function () {
        var t,
          n = module11.default(React);

        if (module1083) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
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

      for (var u = 0; u < y; u++) {
        var f = v[u],
          c = h[u];
        t[f] = 'function' == typeof c ? c.bind(module6.default(t)) : c;
      }

      t.state = t.touchableGetInitialState();
      return t;
    }

    return b;
  })(React.Component);

exports.default = R;
