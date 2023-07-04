var module22 = require('./22'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module1371 = require('./1371'),
  module1366 = require('./1366'),
  module1372 = require('./1372');

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
  module9.default(M, t);

  var module1366 = M,
    P = h(),
    R = function () {
      var t,
        n = module12.default(module1366);

      if (P) {
        var u = module12.default(this).constructor;
        t = Reflect.construct(n, arguments, u);
      } else t = n.apply(this, arguments);

      return module11.default(this, t);
    };

  function M() {
    var t;
    module6.default(this, M);

    (t = R.call(this, ...args)).setNativeProps = function (n) {
      var u = n.points;
      if (u) n.d = 'M' + module1372.default(u) + 'z';
      t.root.setNativeProps(n);
    };

    return t;
  }

  module7.default(M, [
    {
      key: 'render',
      value: function () {
        var t = this.props,
          u = t.points;
        return React.default.createElement(
          module1371.default,
          module22.default(
            {
              ref: this.refMethod,
              d: 'M' + module1372.default(u) + 'z',
            },
            t
          )
        );
      },
    },
  ]);
  return M;
})(module1366.default);

exports.default = P;
P.displayName = 'Polygon';
P.defaultProps = {
  points: '',
};
