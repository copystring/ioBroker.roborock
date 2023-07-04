var n,
  t,
  o,
  module1825 = require('./1825'),
  u = '(gl-react-post)';

module.exports = module1825.create(
  ((n = {}),
  (t = u),
  (o = {
    frag: '\nprecision highp float;\nvarying vec2 uv;\nuniform sampler2D t;\nvoid main(){\n  gl_FragColor=texture2D(t,uv);\n}',
  }),
  t in n
    ? Object.defineProperty(n, t, {
        value: o,
        enumerable: true,
        configurable: true,
        writable: true,
      })
    : (n[t] = o),
  n)
)[u];
