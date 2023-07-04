var module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11');

function f() {
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

var React = require('react'),
  module60 = require('./60'),
  p = (function (l) {
    module7(R, l);

    var p = R,
      y = f(),
      v = function () {
        var t,
          n = module11(p);

        if (y) {
          var c = module11(this).constructor;
          t = Reflect.construct(n, arguments, c);
        } else t = n.apply(this, arguments);

        return module9(this, t);
      };

    function R() {
      module4(this, R);
      return v.apply(this, arguments);
    }

    module5(R, [
      {
        key: 'render',
        value: function () {
          var module83 = require('./83');

          return <module83 style={[h.unimplementedView, this.props.style]}>{this.props.children}</module83>;
        },
      },
    ]);
    return R;
  })(React.Component),
  h = module60.create({
    unimplementedView: {},
  });

module.exports = p;
