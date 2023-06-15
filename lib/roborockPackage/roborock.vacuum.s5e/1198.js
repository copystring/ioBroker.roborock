var module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module1199 = require('./1199');

function p() {
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

  var v = R,
    h = p(),
    y = function () {
      var t,
        n = module11.default(v);

      if (h) {
        var o = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function R() {
    module4.default(this, R);
    return y.apply(this, arguments);
  }

  module5.default(R, [
    {
      key: 'render',
      value: function () {
        var t = this.props.navigation.state,
          n = t.routes[t.index].key,
          o = this.props.descriptors[n],
          u = o.getComponent();
        return React.default.createElement(module1199.default, {
          component: u,
          navigation: o.navigation,
          screenProps: this.props.screenProps,
        });
      },
    },
  ]);
  return R;
})(React.default.Component);

exports.default = v;
