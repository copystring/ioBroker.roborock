var module1847 = require('./1847'),
  module1819 = require('./1819'),
  module1848 = require('./1848'),
  module1849 = require('./1849'),
  module1850 = require('./1850'),
  module12 = require('./12'),
  module175 = require('./175'),
  v = module12.NativeModules.RNGLContext;

module1847.default(
  v,
  'gl-react-native: the native module is not available.\nMake sure you have properly configured it.\nSee README install instructions.\n\nNativeModules.RNGLContext is %s',
  v
);
module1819.Shaders.setImplementation({
  add: function (n, t) {
    return new Promise(function (u, o) {
      return v.addShader(n, t, function (n, t) {
        if (n) o(n);
        else u(t);
      });
    });
  },
  remove: function (n) {
    return v.removeShader(n);
  },
});
module.exports = {
  resolveAssetSource: module175.default,
  Surface: module1849.default({
    View: module12.View,
    GLCanvas: module1850.default,
    getGLCanvas: function (n) {
      return n.refs.canvas;
    },
    dimensionInvariant: function (n, u) {
      return module1848.default(n)
        ? module1847.default(false, 'GL.Surface ' + u + ' prop cannot be an Animated object. Use GL.AnimatedSurface instead')
        : module1847.default('number' == typeof n && n > 0, 'GL.Surface: ' + u + ' prop must be a strictly positive number');
    },
  }),
  AnimatedSurface: module1849.default({
    View: module12.Animated.View,
    GLCanvas: module12.Animated.createAnimatedComponent(module1850.default),
    getGLCanvas: function (n) {
      var t = n.refs.canvas;
      return t._component || t.refs.node;
    },
    dimensionInvariant: function (n, u) {
      return module1847.default(module1848.default(n) || ('number' == typeof n && n > 0), 'GL.AnimatedSurface: ' + u + ' must be a strictly positive number OR an Animated object');
    },
  }),
};
