var module21 = require('./21'),
  module1847 = require('./1847'),
  module1819 = require('./1819'),
  React = require('react'),
  module12 = require('./12');

module1847.default('function' == typeof module1819.createSurface, 'gl-react createSurface is not a function. Check your gl-react dependency');

var f = function (t) {
  return t.scale || module12.PixelRatio.get();
};

exports.default = function (t) {
  return module1819.createSurface(
    function (n, o, u) {
      var c = n.style,
        f = n.width,
        h = n.height,
        v = n.visibleContent,
        s = n.eventsThrough,
        w = [
          {
            position: 'relative',
          },
          c,
          {
            width: f,
            height: h,
            overflow: 'hidden',
          },
        ];
      return React.default.createElement(
        t.View,
        {
          pointerEvents: !v && s ? 'none' : 'auto',
          style: w,
        },
        o,
        u
      );
    },
    function (n, o, u, c, f) {
      var h = {
        position: 'absolute',
        top: f.visibleContent ? 0 : o,
        left: 0,
        width: n,
        height: o,
        overflow: 'hidden',
      };
      return React.default.createElement(
        t.View,
        {
          key: u,
          style: h,
        },
        c
      );
    },
    function (o) {
      t.dimensionInvariant(o.width, 'width');
      t.dimensionInvariant(o.height, 'height');
      return React.default.createElement(
        t.GLCanvas,
        module21.default(
          {
            ref: 'canvas',
          },
          o
        )
      );
    },
    f,
    t.getGLCanvas
  );
};
