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
          return React.default.createElement(module960.NavigationConsumer, null, function (f) {
            var c = u || f;
            module944.default(
              !!c,
              'withNavigation can only be used on a view hierarchy of a navigator. The wrapped component is unable to get access to navigation from props or context.'
            );
            return React.default.createElement(
              t,
              module21.default({}, o.props, {
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
  return module1034.default(R, t);
};

require('prop-types');

var module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module1034 = require('./1034'),
  module944 = require('./944'),
  module960 = require('./960');

function y() {
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
