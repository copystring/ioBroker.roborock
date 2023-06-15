var t,
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12');

function l() {
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

t = (function (t) {
  module9(v, t);

  var s = v,
    y = l(),
    p = function () {
      var t,
        n = module12(s);

      if (y) {
        var u = module12(this).constructor;
        t = Reflect.construct(n, arguments, u);
      } else t = n.apply(this, arguments);

      return module11(this, t);
    };

  function v() {
    module6(this, v);
    return p.apply(this, arguments);
  }

  module7(
    v,
    [
      {
        key: 'render',
        value: function () {
          return null;
        },
      },
    ],
    [
      {
        key: 'ignoreWarnings',
        value: function (t) {},
      },
      {
        key: 'install',
        value: function () {},
      },
      {
        key: 'uninstall',
        value: function () {},
      },
    ]
  );
  return v;
})(require('react').Component);

module.exports = t;
