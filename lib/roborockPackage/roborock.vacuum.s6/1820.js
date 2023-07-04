var t =
    'function' == typeof Symbol && 'symbol' == typeof ('function' == typeof Symbol ? Symbol.iterator : '@@iterator')
      ? function (t) {
          return typeof t;
        }
      : function (t) {
          return t && 'function' == typeof Symbol && t.constructor === Symbol && t !== ('function' == typeof Symbol ? Symbol.prototype : '@@prototype') ? 'symbol' : typeof t;
        },
  o =
    Object.assign ||
    function (t) {
      for (var o = 1; o < arguments.length; o++) {
        var n = arguments[o];

        for (var p in n) Object.prototype.hasOwnProperty.call(n, p) && (t[p] = n[p]);
      }

      return t;
    };

function p(t, o) {
  if (!(t instanceof o)) throw new TypeError('Cannot call a class as a function');
}

function c(t, o) {
  if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return !o || ('object' != typeof o && 'function' != typeof o) ? t : o;
}

function f(t, o) {
  if ('function' != typeof o && null !== o) throw new TypeError('Super expression must either be null or a function, not ' + typeof o);
  t.prototype = Object.create(o && o.prototype, {
    constructor: {
      value: t,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  });
  if (o) Object.setPrototypeOf ? Object.setPrototypeOf(t, o) : (t.__proto__ = o);
}

var React = require('react'),
  module1821 = require('./1821');

module.exports = function (y, l) {
  module1821('function' == typeof y, 'GL.createComponent(props => glnode) must have a function in parameter');

  class b {
    constructor() {
      p(this, l);
      return c(this, (l.__proto__ || Object.getPrototypeOf(l)).apply(this, arguments));
    }

    render() {
      var t = y(o({}, this.context, this.props));
      module1821(
        t && t.type && (t.type.isGLNode || t.type.isGLComponent),
        '%s: The GL.createComponent function parameter must return a GL.Node or another GL Component',
        l.displayName
      );
      return t;
    }
  }

  if (((b.isGLComponent = true), (b.displayName = y.name || ''), l))
    for (var h in (module1821(
      'object' === (undefined === l ? 'undefined' : t(l)),
      'second parameter of createComponent must be an object of static fields to set in the React component. (example: propTypes, displayName)'
    ),
    l))
      b[h] = l[h];
  return b;
};
