var module1845 = require('./1845'),
  module1817 = require('./1817'),
  module1846 = require('./1846'),
  module1847 = require('./1847'),
  module1848 = require('./1848'),
  module12 = require('./12'),
  module175 = require('./175'),
  v = module12.NativeModules.RNGLContext;

module1845.default(
  v,
  'gl-react-native: the native module is not available.\nMake sure you have properly configured it.\nSee README install instructions.\n\nNativeModules.RNGLContext is %s',
  v
);
module1817.Shaders.setImplementation({
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
  Surface: module1847.default({
    View: module12.View,
    GLCanvas: module1848.default,
    getGLCanvas: function (n) {
      return n.refs.canvas;
    },
    dimensionInvariant: function (n, u) {
      return module1846.default(n)
        ? module1845.default(false, 'GL.Surface ' + u + ' prop cannot be an Animated object. Use GL.AnimatedSurface instead')
        : module1845.default('number' == typeof n && n > 0, 'GL.Surface: ' + u + ' prop must be a strictly positive number');
    },
  }),
  AnimatedSurface: module1847.default({
    View: module12.Animated.View,
    GLCanvas: module12.Animated.createAnimatedComponent(module1848.default),
    getGLCanvas: function (n) {
      var t = n.refs.canvas;
      return t._component || t.refs.node;
    },
    dimensionInvariant: function (n, u) {
      return module1845.default(module1846.default(n) || ('number' == typeof n && n > 0), 'GL.AnimatedSurface: ' + u + ' must be a strictly positive number OR an Animated object');
    },
  }),
};
