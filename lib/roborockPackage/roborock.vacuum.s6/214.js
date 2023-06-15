var module59 = require('./59'),
  n = {},
  o = function (t) {};

function s(t, n, s, p, c, u, l, f) {
  if ((o(n), !t)) {
    var E;
    if (undefined === n) E = new Error('Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.');
    else {
      var h = [s, p, c, u, l, f],
        y = 0;
      (E = new Error(
        n.replace(/%s/g, function () {
          return h[y++];
        })
      )).name = 'Invariant Violation';
    }
    throw ((E.framesToPop = 1), E);
  }
}

var p = 'mixins';

module.exports = function (o, c, u) {
  var l = [],
    f = {
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
    E = {
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
        n.childContextTypes = module59({}, n.childContextTypes, o);
      },
      contextTypes: function (n, o) {
        n.contextTypes = module59({}, n.contextTypes, o);
      },
      getDefaultProps: function (t, n) {
        if (t.getDefaultProps) t.getDefaultProps = M(t.getDefaultProps, n);
        else t.getDefaultProps = n;
      },
      propTypes: function (n, o) {
        n.propTypes = module59({}, n.propTypes, o);
      },
      statics: function (t, n) {
        _(t, n);
      },
      autobind: function () {},
    };

  function y(t, n) {
    var o = f.hasOwnProperty(n) ? f[n] : null;
    if (P.hasOwnProperty(n))
      s(
        'OVERRIDE_BASE' === o,
        'ReactClassInterface: You are attempting to override `%s` from your class specification. Ensure that your method names do not overlap with React methods.',
        n
      );
    if (t)
      s(
        'DEFINE_MANY' === o || 'DEFINE_MANY_MERGED' === o,
        'ReactClassInterface: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.',
        n
      );
  }

  function N(t, n) {
    if (n) {
      s('function' != typeof n, "ReactClass: You're attempting to use a component class or function as a mixin. Instead, just use a regular object.");
      s(!c(n), "ReactClass: You're attempting to use a component as a mixin. Instead, just use a regular object.");
      var o = t.prototype,
        u = o.__reactAutoBindPairs;

      for (var l in (n.hasOwnProperty(p) && h.mixins(t, n.mixins), n))
        if (n.hasOwnProperty(l) && l !== p) {
          var E = n[l],
            N = o.hasOwnProperty(l);
          if ((y(N, l), h.hasOwnProperty(l))) h[l](t, E);
          else {
            var _ = f.hasOwnProperty(l);

            if ('function' != typeof E || _ || N || false === n.autobind) {
              if (N) {
                var D = f[l];
                s(_ && ('DEFINE_MANY_MERGED' === D || 'DEFINE_MANY' === D), 'ReactClass: Unexpected spec policy %s for key %s when mixing in component specs.', D, l);
                if ('DEFINE_MANY_MERGED' === D) o[l] = M(o[l], E);
                else if ('DEFINE_MANY' === D) o[l] = I(o[l], E);
              } else o[l] = E;
            } else {
              u.push(l, E);
              o[l] = E;
            }
          }
        }
    }
  }

  function _(t, n) {
    if (n)
      for (var o in n) {
        var p = n[o];

        if (n.hasOwnProperty(o)) {
          if (
            (s(
              !(o in h),
              'ReactClass: You are attempting to define a reserved property, `%s`, that shouldn\'t be on the "statics" key. Define it as an instance property instead; it will still be accessible on the constructor.',
              o
            ),
            o in t)
          ) {
            s(
              'DEFINE_MANY_MERGED' === (E.hasOwnProperty(o) ? E[o] : null),
              'ReactClass: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.',
              o
            );
            return void (t[o] = M(t[o], p));
          }

          t[o] = p;
        }
      }
  }

  function D(t, n) {
    for (var o in (s(t && n && 'object' == typeof t && 'object' == typeof n, 'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.'), n))
      n.hasOwnProperty(o) &&
        (s(
          undefined === t[o],
          'mergeIntoWithNoDuplicateKeys(): Tried to merge two objects with the same key: `%s`. This conflict may be due to a mixin; in particular, this may be caused by two getInitialState() or getDefaultProps() methods returning objects with clashing keys.',
          o
        ),
        (t[o] = n[o]));

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

  function v(t) {
    for (var n = t.__reactAutoBindPairs, o = 0; o < n.length; o += 2) {
      var s = n[o],
        p = n[o + 1];
      t[s] = A(t, p);
    }
  }

  var F = {
      componentDidMount: function () {
        this.__isMounted = true;
      },
    },
    Y = {
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
    x = function () {};

  module59(x.prototype, o.prototype, P);
  return function (t) {
    var o = function (t, p, c) {
      if (this.__reactAutoBindPairs.length) v(this);
      this.props = t;
      this.context = p;
      this.refs = n;
      this.updater = c || u;
      this.state = null;
      var l = this.getInitialState ? this.getInitialState() : null;
      s('object' == typeof l && !Array.isArray(l), '%s.getInitialState(): must return an object or null', o.displayName || 'ReactCompositeComponent');
      this.state = l;
    };

    for (var p in ((o.prototype = new x()),
    (o.prototype.constructor = o),
    (o.prototype.__reactAutoBindPairs = []),
    l.forEach(N.bind(null, o)),
    N(o, F),
    N(o, t),
    N(o, Y),
    o.getDefaultProps && (o.defaultProps = o.getDefaultProps()),
    s(o.prototype.render, 'createClass(...): Class specification must implement a `render` method.'),
    f))
      o.prototype[p] || (o.prototype[p] = null);

    return o;
  };
};
