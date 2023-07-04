var module22 = require('./22'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1353 = require('./1353'),
  module1378 = require('./1378'),
  module1360 = require('./1360');

function N() {
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

var module1366 = (function (t, ...args) {
  module9.default(_, t);

  var n = _,
    module13 = N(),
    x = function () {
      var t,
        u = module12.default(n);

      if (module13) {
        var f = module12.default(this).constructor;
        t = Reflect.construct(u, arguments, f);
      } else t = u.apply(this, arguments);

      return module11.default(this, t);
    };

  function _() {
    var t;
    module6.default(this, _);

    (t = x.call(this, ...args)).setNativeProps = function (n) {
      var u = !n.matrix && module1360.default(n);
      if (u) n.matrix = u;
      t.root.setNativeProps(n);
    };

    return t;
  }

  module7.default(_, [
    {
      key: 'render',
      value: function () {
        var t = this.props,
          n = module1353.propsAndStyles(t);
        return React.default.createElement(
          P,
          module22.default(
            {
              ref: this.refMethod,
            },
            module1353.default(n, this),
            {
              font: module1378.extractFont(n),
            }
          ),
          t.children
        );
      },
    },
  ]);
  return _;
})(require('./1366').default);

exports.default = module1366;
module1366.displayName = 'G';
var P = module13.requireNativeComponent('RNSVGGroup');
