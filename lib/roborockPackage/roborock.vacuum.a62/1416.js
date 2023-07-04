var module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module1125 = require('./1125');

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

var module1417 = (function (t) {
  module7.default(R, t);

  var n = R,
    module1417 = h(),
    v = function () {
      var t,
        u = module11.default(n);

      if (module1417) {
        var o = module11.default(this).constructor;
        t = Reflect.construct(u, arguments, o);
      } else t = u.apply(this, arguments);

      return module9.default(this, t);
    };

  function R() {
    module4.default(this, R);
    return v.apply(this, arguments);
  }

  module5.default(R, [
    {
      key: 'render',
      value: function () {
        var t = this;
        return React.default.createElement(module1125.default, {
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
          source: require('./1417'),
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

module1417.defaultProps = {
  itemSize: 60,
};
module.exports = module1417;
