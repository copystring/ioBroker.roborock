exports.default = function (t) {
  return function (n) {
    var u = n.route,
      o = n.jumpTo;
    return <v key={u.key} component={t[u.key]} route={u} jumpTo={o} />;
  };
};

var module56 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react');

function y() {
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

var v = (function (t) {
  module7.default(R, t);

  var n = R,
    v = y(),
    h = function () {
      var t,
        u = module11.default(n);

      if (v) {
        var o = module11.default(this).constructor;
        t = Reflect.construct(u, arguments, o);
      } else t = u.apply(this, arguments);

      return module9.default(this, t);
    };

  function R() {
    module4.default(this, R);
    return h.apply(this, arguments);
  }

  module5.default(R, [
    {
      key: 'render',
      value: function () {
        var t = this.props,
          n = t.component,
          o = module56.default(t, ['component']);
        return <n />;
      },
    },
  ]);
  return R;
})(React.PureComponent);
