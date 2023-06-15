var t =
    'function' == typeof Symbol && 'symbol' == typeof ('function' == typeof Symbol ? Symbol.iterator : '@@iterator')
      ? function (o) {
          return typeof o;
        }
      : function (o) {
          return o && 'function' == typeof Symbol && o.constructor === Symbol && o !== ('function' == typeof Symbol ? Symbol.prototype : '@@prototype') ? 'symbol' : typeof o;
        },
  n =
    Object.assign ||
    function (o) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];

        for (var s in n) Object.prototype.hasOwnProperty.call(n, s) && (o[s] = n[s]);
      }

      return o;
    },
  module1825 = require('./1825');

function f(o, t) {
  var n = {};

  for (var s in o) t.indexOf(s) >= 0 || (Object.prototype.hasOwnProperty.call(o, s) && (n[s] = o[s]));

  return n;
}

var React = require('react'),
  module1821 = require('./1821'),
  module1826 = require('./1826'),
  module1827 = require('./1827'),
  module1828 = require('./1828'),
  module1829 = require('./1829'),
  module1831 = require('./1831'),
  module1835 = require('./1835');

module.exports = function o(s, w, O, x, G, L) {
  var U = s.props,
    j = module1827._resolve(U.shader, G, L(U.onShaderCompile)),
    R = U.uniforms,
    k = n({}, w, U),
    _ = k.width,
    N = k.height,
    C = k.pixelRatio,
    E = {
      width: _,
      height: N,
      pixelRatio: C,
    },
    I = U.children,
    P = 'preload' in U ? U.preload : O;

  module1821(module1827.exists(j), 'Shader #%s does not exists', j);
  var T = module1827.get(j).name;
  module1835(C, 'GL Component (' + T + '). pixelRatio prop');
  var A = n({}, R),
    D = [],
    M = [];
  React.Children.forEach(I, function (o) {
    module1821(o.type === module1826, "(Shader '%s') GL.Node can only contains children of type GL.Uniform. Got '%s'", T, (o.type && o.type.displayName) || o);
    var t = o.props,
      n = t.name,
      s = t.children,
      p = f(t, ['name', 'children']);
    module1821('string' == typeof n && n, "(Shader '%s') GL.Uniform must define an name String", T);
    module1821(!(R && n in R), "(Shader '%s') The uniform '%s' set by GL.Uniform must not be in {uniforms} props", T);
    module1821(!(n in A), "(Shader '%s') The uniform '%s' set by GL.Uniform must not be defined in another GL.Uniform", T);
    A[n] =
      !s || s.value
        ? s
        : {
            value: s,
            opts: p,
          };
  });
  Object.keys(A).forEach(function (n) {
    var s = A[n],
      f = undefined;

    if (s && 'object' === (undefined === s ? 'undefined' : t(s)) && !s.prototype && 'value' in s) {
      if ('object' === t(s.opts)) f = s.opts;
      s = s.value;
    }

    s = s.default.decorateUniformValue(s);

    try {
      switch (module1829(s)) {
        case 'string':
          A[n] = module1828.withOpts(
            module1828.URI({
              uri: s,
            }),
            f
          );
          break;

        case '{uri}':
          A[n] = module1828.withOpts(module1828.URI(s), f);
          break;

        case 'ndarray':
          A[n] = module1828.withOpts(module1828.NDArray(s), f);
          break;

        case 'vdom[]':
        case 'vdom':
          var c = module1831(s, E);

          if (c) {
            var u = c.childGLNode,
              l = c.via,
              h = c.context;
            D.push({
              vdom: s,
              uniform: n,
              data: o(u, h, P, l, G, L),
            });
          } else
            M.push({
              vdom: s,
              uniform: n,
              opts: f,
            });

          break;

        default:
          A[n] = s;
      }
    } catch (o) {
      delete A[n];
      var S = "Shader '" + T + "': uniform '" + n + "' " + o.message;
      throw new Error(S);
    }
  });
  return {
    shader: j,
    uniforms: A,
    width: _,
    height: N,
    pixelRatio: C,
    children: D,
    contents: M,
    preload: P,
    via: x,
  };
};
