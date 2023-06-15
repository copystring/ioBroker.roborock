var module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react');

function h() {
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

var p = module12.ART.Surface,
  PropTypes = require('prop-types'),
  y = null;

if (module12.UIManager.MHRSurfaceView) y = module12.requireNativeComponent('MHRSurfaceView');

var R = (function (t) {
  module7.default(R, t);

  var module12 = R,
    p = h(),
    v = function () {
      var t,
        n = module11.default(module12);

      if (p) {
        var u = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, u);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function R() {
    module4.default(this, R);
    return v.apply(this, arguments);
  }

  module5.default(R, [
    {
      key: 'getChildContext',
      value: function () {
        return {
          isInSurface: true,
        };
      },
    },
    {
      key: 'render',
      value: function () {
        var t = this.props,
          n = S(t.width, 0),
          u = S(t.height, 0);
        return React.default.createElement(
          y,
          {
            style: [
              t.style,
              {
                width: n,
                height: u,
              },
            ],
          },
          this.props.children
        );
      },
    },
  ]);
  return R;
})(React.default.Component);

function S(t, n) {
  return null == t ? n : +t;
}

R.childContextTypes = {
  isInSurface: PropTypes.bool,
};
var C = {
  RRSurface: y ? R : p,
  isRRSurface: !!y,
};
module.exports = C;
