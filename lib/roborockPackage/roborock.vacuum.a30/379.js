var t,
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11');

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
  module7(v, t);

  var s = v,
    y = l(),
    p = function () {
      var t,
        n = module11(s);

      if (y) {
        var u = module11(this).constructor;
        t = Reflect.construct(n, arguments, u);
      } else t = n.apply(this, arguments);

      return module9(this, t);
    };

  function v() {
    module4(this, v);
    return p.apply(this, arguments);
  }

  module5(
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
