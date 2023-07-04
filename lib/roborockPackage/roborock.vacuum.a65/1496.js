var module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module1204 = require('./1204');

function h() {
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

var module1497 = (function (t) {
  module9.default(R, t);

  var n = R,
    module1497 = h(),
    v = function () {
      var t,
        u = module12.default(n);

      if (module1497) {
        var o = module12.default(this).constructor;
        t = Reflect.construct(u, arguments, o);
      } else t = u.apply(this, arguments);

      return module11.default(this, t);
    };

  function R() {
    module6.default(this, R);
    return v.apply(this, arguments);
  }

  module7.default(R, [
    {
      key: 'render',
      value: function () {
        var t = this;
        return React.default.createElement(module1204.default, {
          ref: function (n) {
            t.lottieView = n;
          },
          style: [
            {
              width: this.props.itemSize,
              height: this.props.itemSize,
            },
            this.props.style,
          ],
          source: require('./1497'),
          loop: true,
        });
      },
    },
    {
      key: 'componentDidMount',
      value: function () {
        var t;
        if (!(null == (t = this.lottieView))) t.play();
      },
    },
  ]);
  return R;
})(React.default.Component);

module1497.defaultProps = {
  itemSize: 60,
};
module.exports = module1497;
