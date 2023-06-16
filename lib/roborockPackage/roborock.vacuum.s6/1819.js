var module1825 = {
  createComponent: require('./1820'),
  createSurface: require('./1822'),
  Node: require('./1842'),
  Shaders: require('./1827'),
  Uniform: require('./1826'),
  runtime: require('./1825'),
};
Object.defineProperty(module1825, 'GLSL', {
  enumerable: false,
  get: function () {
    throw new Error(
      'You are trying to use GLSL from gl-react v2 but this feature is only available in gl-react v3. Please upgrade gl-react OR downgrade any library that expect gl-react v3.'
    );
  },
});
module.exports = module1825;
