var module60 = require('./60'),
  module217 = require('./217'),
  module218 = require('./218'),
  s = 'mixins';

module.exports = function (p, c, u) {
  var l = [],
    E = {
      mixins: 'DEFINE_MANY',
      statics: 'DEFINE_MANY',
      propTypes: 'DEFINE_MANY',
      contextTypes: 'DEFINE_MANY',
      childContextTypes: 'DEFINE_MANY',
      getDefaultProps: 'DEFINE_MANY_MERGED',
      getInitialState: 'DEFINE_MANY_MERGED',
      getChildContext: 'DEFINE_MANY_MERGED',
      render: 'DEFINE_ONCE',
      componentWillMount: 'DEFINE_MANY',
      componentDidMount: 'DEFINE_MANY',
      componentWillReceiveProps: 'DEFINE_MANY',
      shouldComponentUpdate: 'DEFINE_ONCE',
      componentWillUpdate: 'DEFINE_MANY',
      componentDidUpdate: 'DEFINE_MANY',
      componentWillUnmount: 'DEFINE_MANY',
      UNSAFE_componentWillMount: 'DEFINE_MANY',
      UNSAFE_componentWillReceiveProps: 'DEFINE_MANY',
      UNSAFE_componentWillUpdate: 'DEFINE_MANY',
      updateComponent: 'OVERRIDE_BASE',
    },
    f = {
      getDerivedStateFromProps: 'DEFINE_MANY_MERGED',
    },
    h = {
      displayName: function (t, n) {
        t.displayName = n;
      },
      mixins: function (t, n) {
        if (n) for (var o = 0; o < n.length; o++) N(t, n[o]);
      },
      childContextTypes: function (n, o) {
        n.childContextTypes = module60({}, n.childContextTypes, o);
      },
      contextTypes: function (n, o) {
        n.contextTypes = module60({}, n.contextTypes, o);
      },
      getDefaultProps: function (t, n) {
        if (t.getDefaultProps) t.getDefaultProps = M(t.getDefaultProps, n);
        else t.getDefaultProps = n;
      },
      propTypes: function (n, o) {
        n.propTypes = module60({}, n.propTypes, o);
      },
      statics: function (t, n) {
        _(t, n);
      },
      autobind: function () {},
    };

  function y(t, n) {
    var s = E.hasOwnProperty(n) ? E[n] : null;
    if (P.hasOwnProperty(n))
      module218(
        'OVERRIDE_BASE' === s,
        'ReactClassInterface: You are attempting to override `%s` from your class specification. Ensure that your method names do not overlap with React methods.',
        n
      );
    if (t)
      module218(
        'DEFINE_MANY' === s || 'DEFINE_MANY_MERGED' === s,
        'ReactClassInterface: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.',
        n
      );
  }

  function N(t, n) {
    if (n) {
      module218('function' != typeof n, "ReactClass: You're attempting to use a component class or function as a mixin. Instead, just use a regular object.");
      module218(!c(n), "ReactClass: You're attempting to use a component as a mixin. Instead, just use a regular object.");
      var p = t.prototype,
        u = p.__reactAutoBindPairs;

      for (var l in (n.hasOwnProperty(s) && h.mixins(t, n.mixins), n))
        if (n.hasOwnProperty(l) && l !== s) {
          var f = n[l],
            N = p.hasOwnProperty(l);
          if ((y(N, l), h.hasOwnProperty(l))) h[l](t, f);
          else {
            var _ = E.hasOwnProperty(l);

            if ('function' != typeof f || _ || N || false === n.autobind) {
              if (N) {
                var D = E[l];
                module218(_ && ('DEFINE_MANY_MERGED' === D || 'DEFINE_MANY' === D), 'ReactClass: Unexpected spec policy %s for key %s when mixing in component specs.', D, l);
                if ('DEFINE_MANY_MERGED' === D) p[l] = M(p[l], f);
                else if ('DEFINE_MANY' === D) p[l] = I(p[l], f);
              } else p[l] = f;
            } else {
              u.push(l, f);
              p[l] = f;
            }
          }
        }
    }
  }

  function _(t, n) {
    if (n)
      for (var s in n) {
        var p = n[s];

        if (n.hasOwnProperty(s)) {
          if (
            (module218(
              !(s in h),
              'ReactClass: You are attempting to define a reserved property, `%s`, that shouldn\'t be on the "statics" key. Define it as an instance property instead; it will still be accessible on the constructor.',
              s
            ),
            s in t)
          ) {
            var c = f.hasOwnProperty(s) ? f[s] : null;
            module218('DEFINE_MANY_MERGED' === c, 'ReactClass: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.', s);
            return void (t[s] = M(t[s], p));
          }

          t[s] = p;
        }
      }
  }

  function D(t, n) {
    for (var s in (module218(t && n && 'object' == typeof t && 'object' == typeof n, 'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.'), n))
      n.hasOwnProperty(s) &&
        (module218(
          undefined === t[s],
          'mergeIntoWithNoDuplicateKeys(): Tried to merge two objects with the same key: `%s`. This conflict may be due to a mixin; in particular, this may be caused by two getInitialState() or getDefaultProps() methods returning objects with clashing keys.',
          s
        ),
        (t[s] = n[s]));

    return t;
  }

  function M(t, n) {
    return function () {
      var o = t.apply(this, arguments),
        s = n.apply(this, arguments);
      if (null == o) return s;
      if (null == s) return o;
      var p = {};
      D(p, o);
      D(p, s);
      return p;
    };
  }

  function I(t, n) {
    return function () {
      t.apply(this, arguments);
      n.apply(this, arguments);
    };
  }

  function A(t, n) {
    return n.bind(t);
  }

  function F(t) {
    for (var n = t.__reactAutoBindPairs, o = 0; o < n.length; o += 2) {
      var s = n[o],
        p = n[o + 1];
      t[s] = A(t, p);
    }
  }

  var Y = {
      componentDidMount: function () {
        this.__isMounted = true;
      },
    },
    v = {
      componentWillUnmount: function () {
        this.__isMounted = false;
      },
    },
    P = {
      replaceState: function (t, n) {
        this.updater.enqueueReplaceState(this, t, n);
      },
      isMounted: function () {
        return !!this.__isMounted;
      },
    },
    R = function () {};

  module60(R.prototype, p.prototype, P);
  return function (t) {
    var s = function (t, p, c) {
      if (this.__reactAutoBindPairs.length) F(this);
      this.props = t;
      this.context = p;
      this.refs = module217;
      this.updater = c || u;
      this.state = null;
      var l = this.getInitialState ? this.getInitialState() : null;
      module218('object' == typeof l && !Array.isArray(l), '%s.getInitialState(): must return an object or null', s.displayName || 'ReactCompositeComponent');
      this.state = l;
    };

    for (var p in ((s.prototype = new R()),
    (s.prototype.constructor = s),
    (s.prototype.__reactAutoBindPairs = []),
    l.forEach(N.bind(null, s)),
    N(s, Y),
    N(s, t),
    N(s, v),
    s.getDefaultProps && (s.defaultProps = s.getDefaultProps()),
    module218(s.prototype.render, 'createClass(...): Class specification must implement a `render` method.'),
    E))
      s.prototype[p] || (s.prototype[p] = null);

    return s;
  };
};
