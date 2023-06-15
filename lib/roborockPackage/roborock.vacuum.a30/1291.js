var module22 = require('./22'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module1292 = require('./1292'),
  module1287 = require('./1287'),
  module1293 = require('./1293');

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

var P = (function (t, ...args) {
  module7.default(M, t);

  var module1287 = M,
    P = h(),
    R = function () {
      var t,
        n = module11.default(module1287);

      if (P) {
        var u = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, u);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function M() {
    var t;
    module4.default(this, M);

    (t = R.call(this, ...args)).setNativeProps = function (n) {
      var u = n.points;
      if (u) n.d = 'M' + module1293.default(u) + 'z';
      t.root.setNativeProps(n);
    };

    return t;
  }

  module5.default(M, [
    {
      key: 'render',
      value: function () {
        var t = this.props,
          u = t.points;
        return React.default.createElement(
          module1292.default,
          module22.default(
            {
              ref: this.refMethod,
              d: 'M' + module1293.default(u) + 'z',
            },
            t
          )
        );
      },
    },
  ]);
  return M;
})(module1287.default);

exports.default = P;
P.displayName = 'Polygon';
P.defaultProps = {
  points: '',
};
