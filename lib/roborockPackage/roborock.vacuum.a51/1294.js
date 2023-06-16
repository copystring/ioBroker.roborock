exports.default = function (t) {
  var n = (function (n) {
    module9.default(j, n);

    var y = j,
      h = s(),
      v = function () {
        var t,
          n = module12.default(y);

        if (h) {
          var u = module12.default(this).constructor;
          t = Reflect.construct(n, arguments, u);
        } else t = n.apply(this, arguments);

        return module11.default(this, t);
      };

    function j() {
      module6.default(this, j);
      return v.apply(this, arguments);
    }

    module7.default(j, [
      {
        key: 'render',
        value: function () {
          return React.createElement(t[this.props.route.key], this.props);
        },
      },
    ]);
    return j;
  })(React.PureComponent);

  return function (t) {
    var u = t.route,
      o = t.jumpTo,
      c = t.jumpToIndex;
    return React.createElement(n, {
      key: u.key,
      route: u,
      jumpTo: o,
      jumpToIndex: c,
    });
  };
};

var module6 = require('./6'),
  module7 = require('@babel/runtime/helpers/createClass'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react');

function s() {
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
