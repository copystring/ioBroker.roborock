var t =
  Object.assign ||
  function (t) {
    for (var n = 1; n < arguments.length; n++) {
      var o = arguments[n];

      for (var u in o) Object.prototype.hasOwnProperty.call(o, u) && (t[u] = o[u]);
    }

    return t;
  };

function o(t, n) {
  var o = {};

  for (var u in t) n.indexOf(u) >= 0 || (Object.prototype.hasOwnProperty.call(t, u) && (o[u] = t[u]));

  return o;
}

function u(t, n) {
  if (!(t instanceof n)) throw new TypeError('Cannot call a class as a function');
}

function l(t, n) {
  if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return !n || ('object' != typeof n && 'function' != typeof n) ? t : n;
}

function s(t, n) {
  if ('function' != typeof n && null !== n) throw new TypeError('Super expression must either be null or a function, not ' + typeof n);
  t.prototype = Object.create(n && n.prototype, {
    constructor: {
      value: t,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  });
  if (n) Object.setPrototypeOf ? Object.setPrototypeOf(t, n) : (t.__proto__ = n);
}

var React = require('react'),
  h = React.Component,
  PropTypes = require('prop-types'),
  module1819 = require('./1819'),
  module1821 = require('./1821'),
  b = module1821.fill,
  _ = module1821.resolve,
  y = module1821.build,
  module1825 = require('./1825'),
  module1840 = require('./1840'),
  module1841 = require('./1841'),
  module1829 = require('./1829'),
  module1833 = require('./1833'),
  module1842 = require('./1842'),
  module1823 = require('./1823'),
  P = 1;

module.exports = function (v, x, T, S) {
  var j =
    arguments.length > 4 && undefined !== arguments[4]
      ? arguments[4]
      : function (t) {
          return t.refs.canvas;
        };

  class I {
    constructor(t, n) {
      u(this, I);
      var o = l(this, (I.__proto__ || Object.getPrototypeOf(I)).call(this, t, n));
      o._renderId = 0;
      o._id = P++;
      return o;
    }

    componentWillMount() {
      module1825._onSurfaceWillMount(this._id);

      this._build(this.props);

      this._attach();
    }

    componentWillUnmount() {
      this._renderId = 0;

      module1825._onSurfaceWillUnmount(this._id);

      if (this._dataAnimated) this._dataAnimated.__detach();
    }

    componentWillReceiveProps(t) {
      this._build(t);

      this._attach();
    }

    _build(n) {
      var o = this,
        u = this._id,
        l = ++this._renderId,
        s = n.width,
        h = n.height,
        f = n.pixelRatio,
        v = n.children,
        G = n.debug,
        R = n.preload;
      module1819(v, 'GL.Surface must have in children a GL.Node or a GL Component');
      var P = f || S(n);
      module1833(P, 'GL.Surface: pixelRatio prop');
      var x = {
          width: s,
          height: h,
          pixelRatio: P,
        },
        T = module1829(<module1840 />, x);
      module1819(T && T.childGLNode, 'GL.Surface must have in children a GL.Node or a GL Component');
      var j,
        I,
        N = T.via,
        A = T.childGLNode,
        M = T.context,
        V = undefined;

      try {
        module1825._beforeSurfaceBuild(u);

        V = _(
          b(
            y(A, M, R, N, u, function (t) {
              return (
                t &&
                function (n, u) {
                  return l === o._renderId && t(n, u);
                }
              );
            })
          )
        );
      } catch (t) {
        throw t;
      } finally {
        module1825._afterSurfaceBuild(u);
      }

      this._resolved = V;
      this._pixelRatio = P;

      if (G) {
        j = V.data;
        I = V.contentsVDOM;
        if ('undefined' != typeof console && console.debug) console.debug('GL.Surface rendered with', j, I);
      }
    }

    _attach() {
      var t = this,
        n = this._dataAnimated;
      this._dataAnimated = new module1842(this._resolved.data, function () {
        var n = t.getGLCanvas();
        if (n)
          if (n.setNativeProps) {
            var o = t._dataAnimated.__getValue();

            n.setNativeProps({
              data: o,
            });
          } else t.forceUpdate();
      });
      if (n) n.__detach();
    }

    getGLCanvas() {
      return j(this);
    }

    captureFrame() {
      var t = this.getGLCanvas();
      module1819(t, "c is '%s'. Is the component unmounted?", t);
      module1819(t.captureFrame, 'captureFrame() should be implemented by GLCanvas');
      return t.captureFrame.apply(t, arguments);
    }

    render() {
      var n = this._renderId,
        u = this._resolved,
        l = u.contentsVDOM,
        s = u.imagesToPreload,
        c = this._dataAnimated.__getValue(),
        h = this._pixelRatio,
        f = this.props,
        p = f.style,
        b = f.width,
        _ = f.height,
        y = f.backgroundColor,
        w = f.visibleContent,
        C = f.eventsThrough,
        O = o(f, ['children', 'debug', 'preload', 'style', 'width', 'height', 'backgroundColor', 'visibleContent', 'eventsThrough']);

      return v(
        {
          width: b,
          height: _,
          style: p,
          visibleContent: w,
          eventsThrough: C,
        },
        l.map(function (t, n) {
          return x(c.width, c.height, t.key || n, module1823.decorateVDOMContent(t), {
            visibleContent: w,
          });
        }),
        T(
          t({}, O, {
            style: {
              backgroundColor: y,
            },
            width: b,
            height: _,
            pixelRatio: h,
            data: c,
            nbContentTextures: l.length,
            imagesToPreload: s,
            renderId: n,
            visibleContent: w,
            eventsThrough: C,
          })
        )
      );
    }
  }

  I.displayName = 'GL.Surface';
  I.propTypes = {
    width: PropTypes.any.isRequired,
    height: PropTypes.any.isRequired,
    backgroundColor: PropTypes.string,
    pixelRatio: PropTypes.number,
    children: PropTypes.element.isRequired,
    preload: PropTypes.bool,
    autoRedraw: PropTypes.bool,
    eventsThrough: PropTypes.bool,
    visibleContent: PropTypes.bool,
    onLoad: PropTypes.func,
    onProgress: PropTypes.func,
  };
  I.defaultProps = {
    preload: false,
    autoRedraw: false,
    eventsThrough: false,
    visibleContent: false,
    backgroundColor: '#000',
  };
  return I;
};
