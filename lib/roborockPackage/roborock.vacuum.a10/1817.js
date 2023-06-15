var module1823 = {
  createComponent: require('./1818'),
  createSurface: require('./1820'),
  Node: require('./1840'),
  Shaders: require('./1825'),
  Uniform: require('./1824'),
  runtime: require('./1823'),
};
Object.defineProperty(module1823, 'GLSL', {
  enumerable: false,
  get: function () {
    throw new Error(
      'You are trying to use GLSL from gl-react v2 but this feature is only available in gl-react v3. Please upgrade gl-react OR downgrade any library that expect gl-react v3.'
    );
  },
});
module.exports = module1823;
