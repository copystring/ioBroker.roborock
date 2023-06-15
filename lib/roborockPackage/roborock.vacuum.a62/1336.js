var module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react');

function p(t) {
  var n = h();
  return function () {
    var u,
      f = module11.default(t);

    if (n) {
      var l = module11.default(this).constructor;
      u = Reflect.construct(f, arguments, l);
    } else u = f.apply(this, arguments);

    return module9.default(this, u);
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

var v = module12.ART.Surface,
  PropTypes = require('prop-types'),
  y = null;

if (module12.UIManager.MHRSurfaceView) y = module12.requireNativeComponent('MHRSurfaceView');
var S = null;
if ('ios' === module12.Platform.OS && module12.UIManager.RRSurfaceView) S = module12.requireNativeComponent('RRSurfaceView');

var C = (function (t) {
  module7.default(o, t);
  var c = p(o);

  function o() {
    module4.default(this, o);
    return c.apply(this, arguments);
  }

  module5.default(o, [
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
    module7.default(o, t);
    var c = p(o);

    function o() {
      module4.default(this, o);
      return c.apply(this, arguments);
    }

    module5.default(o, [
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
