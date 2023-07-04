exports.default = function (t) {
  var R = (function (p) {
    module7.default(_, p);

    var R = _,
      N = y(),
      w = function () {
        var t,
          n = module11.default(R);

        if (N) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function _() {
      module4.default(this, _);
      return w.apply(this, arguments);
    }

    module5.default(_, [
      {
        key: 'render',
        value: function () {
          var o = this,
            u = this.props.navigation;
          return React.default.createElement(module1160.NavigationConsumer, null, function (f) {
            var c = u || f;
            module1145.default(
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
  return module1232.default(R, t);
};

require('prop-types');

var module22 = require('./22'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module1232 = require('./1232'),
  module1145 = require('./1145'),
  module1160 = require('./1160');

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
