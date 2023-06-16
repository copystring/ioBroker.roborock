var module22 = require('./22'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1274 = require('./1274'),
  module1299 = require('./1299'),
  module1281 = require('./1281');

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

var module1287 = (function (t, ...args) {
  module7.default(_, t);

  var n = _,
    module12 = N(),
    x = function () {
      var t,
        u = module11.default(n);

      if (module12) {
        var f = module11.default(this).constructor;
        t = Reflect.construct(u, arguments, f);
      } else t = u.apply(this, arguments);

      return module9.default(this, t);
    };

  function _() {
    var t;
    module4.default(this, _);

    (t = x.call(this, ...args)).setNativeProps = function (n) {
      var u = !n.matrix && module1281.default(n);
      if (u) n.matrix = u;
      t.root.setNativeProps(n);
    };

    return t;
  }

  module5.default(_, [
    {
      key: 'render',
      value: function () {
        var t = this.props,
          n = module1274.propsAndStyles(t);
        return React.default.createElement(
          P,
          module22.default(
            {
              ref: this.refMethod,
            },
            module1274.default(n, this),
            {
              font: module1299.extractFont(n),
            }
          ),
          t.children
        );
      },
    },
  ]);
  return _;
})(require('./1287').default);

exports.default = module1287;
module1287.displayName = 'G';
var P = module12.requireNativeComponent('RNSVGGroup');
