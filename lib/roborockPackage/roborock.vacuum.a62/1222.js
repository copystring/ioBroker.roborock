exports.default = function (t) {
  var n = (function (n) {
    module7.default(j, n);

    var y = j,
      h = s(),
      v = function () {
        var t,
          n = module11.default(y);

        if (h) {
          var u = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, u);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function j() {
      module4.default(this, j);
      return v.apply(this, arguments);
    }

    module5.default(j, [
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

var module4 = require('./4'),
  module5 = require('@babel/runtime/helpers/createClass'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
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
