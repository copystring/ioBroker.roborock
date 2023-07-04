var module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  module13 = require('./13'),
  React = require('react');

function p(t) {
  var n = h();
  return function () {
    var u,
      f = module12.default(t);

    if (n) {
      var l = module12.default(this).constructor;
      u = Reflect.construct(f, arguments, l);
    } else u = f.apply(this, arguments);

    return module11.default(this, u);
  };
}

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

var v = module13.ART.Surface,
  PropTypes = require('prop-types'),
  y = null;

if (module13.UIManager.MHRSurfaceView) y = module13.requireNativeComponent('MHRSurfaceView');
var S = null;
if ('ios' === module13.Platform.OS && module13.UIManager.RRSurfaceView) S = module13.requireNativeComponent('RRSurfaceView');

var C = (function (t) {
  module9.default(o, t);
  var c = p(o);

  function o() {
    module6.default(this, o);
    return c.apply(this, arguments);
  }

  module7.default(o, [
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
          n = w(t.width, 0),
          u = w(t.height, 0);
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
  return o;
})(React.default.Component);

function w(t, n) {
  return null == t ? n : +t;
}

C.childContextTypes = {
  isInSurface: PropTypes.bool,
};

var x = (function (t) {
    module9.default(o, t);
    var c = p(o);

    function o() {
      module6.default(this, o);
      return c.apply(this, arguments);
    }

    module7.default(o, [
      {
        key: 'render',
        value: function () {
          return React.default.createElement(S, this.props, this.props.children);
        },
      },
    ]);
    return o;
  })(React.default.Component),
  I = {
    RRSurface: y ? C : S ? x : v,
    isRRSurface: !!y,
  };

module.exports = I;
