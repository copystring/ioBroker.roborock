var module22 = require('./22'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  PropTypes = require('prop-types'),
  module391 = require('./391');

function C() {
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
  module7.default(x, t);

  var o = x,
    PropTypes = C(),
    v = function () {
      var t,
        n = module11.default(o);

      if (PropTypes) {
        var u = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, u);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function x(t) {
    module4.default(this, x);
    return v.call(this, t);
  }

  module5.default(x, [
    {
      key: 'render',
      value: function () {
        var t = this.props,
          o = t.color,
          u = t.normalColor,
          l = t.fill,
          f = t.x,
          c = t.y,
          s = t.r,
          h = t.inner,
          C = t.outer,
          v = t.funcId;
        return React.default.createElement(
          module12.View,
          {
            pointerEvents: 'box-none',
            style: [
              R.outer,
              {
                left: f - s,
                top: c - s,
                width: 2 * s,
                height: 2 * s,
                borderRadius: s,
              },
              {
                borderColor: u,
                backgroundColor: C ? 'rgba(0, 122, 255, 0.2)' : 'transparent',
              },
              l && {
                borderColor: 'rgba(0, 122, 255, 0.2)',
              },
              !C && {
                borderWidth: 0,
              },
            ],
          },
          h &&
            React.default.createElement(
              module12.View,
              module22.default({}, module391.default.getAccessibilityLabel('name_' + v), {
                pointerEvents: 'box-none',
                style: [
                  !C && R.inner,
                  {
                    width: 0.5 * s,
                    height: 0.5 * s,
                    borderRadius: 0.25 * s,
                  },
                  l && {
                    backgroundColor: o,
                  },
                ],
              })
            )
        );
      },
    },
  ]);
  return x;
})(React.Component);

exports.default = v;
v.propTypes = {
  color: PropTypes.default.string,
  fill: PropTypes.default.bool,
  x: PropTypes.default.number,
  y: PropTypes.default.number,
  r: PropTypes.default.number,
  inner: PropTypes.default.bool,
  outer: PropTypes.default.bool,
};
v.defaultProps = {
  inner: true,
  outer: true,
};
var R = module12.StyleSheet.create({
  outer: {
    position: 'absolute',
    borderColor: '#CFCFCF',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    backgroundColor: '#CFCFCF',
  },
});
module.exports = v;
