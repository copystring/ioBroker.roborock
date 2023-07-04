exports.default = function (t) {
  var R = (function (p) {
    module9.default(_, p);

    var R = _,
      N = y(),
      w = function () {
        var t,
          n = module12.default(R);

        if (N) {
          var o = module12.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module11.default(this, t);
      };

    function _() {
      module6.default(this, _);
      return w.apply(this, arguments);
    }

    module7.default(_, [
      {
        key: 'render',
        value: function () {
          var o = this,
            u = this.props.navigation;
          return React.default.createElement(module1239.NavigationConsumer, null, function (f) {
            var c = u || f;
            module1224.default(
              !!c,
              'withNavigation can only be used on a view hierarchy of a navigator. The wrapped component is unable to get access to navigation from props or context.'
            );
            return React.default.createElement(
              t,
              module22.default({}, o.props, {
                navigation: c,
                ref: o.props.onRef,
              })
            );
          });
        },
      },
    ]);
    return _;
  })(React.default.Component);

  R.displayName = 'withNavigation(' + (t.displayName || t.name) + ')';
  return module1311.default(R, t);
};

require('prop-types');

var module22 = require('./22'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module1311 = require('./1311'),
  module1224 = require('./1224'),
  module1239 = require('./1239');

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
