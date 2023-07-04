var module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module1271 = require('./1271');

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
  module9.default(R, t);

  var v = R,
    h = p(),
    y = function () {
      var t,
        n = module12.default(v);

      if (h) {
        var o = module12.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module11.default(this, t);
    };

  function R() {
    module6.default(this, R);
    return y.apply(this, arguments);
  }

  module7.default(R, [
    {
      key: 'render',
      value: function () {
        var t = this.props.navigation.state,
          n = t.routes[t.index].key,
          o = this.props.descriptors[n],
          u = o.getComponent();
        return React.default.createElement(module1271.default, {
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
