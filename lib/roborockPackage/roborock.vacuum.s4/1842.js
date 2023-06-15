function n(t, n) {
  if (!(t instanceof n)) throw new TypeError('Cannot call a class as a function');
}

function o(t, n) {
  if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return !n || ('object' != typeof n && 'function' != typeof n) ? t : n;
}

function u(t, n) {
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

var React = require('react').Component,
  PropTypes = require('prop-types'),
  module1821 = require('./1821');

class l {
  constructor() {
    n(this, l);
    return o(this, (l.__proto__ || Object.getPrototypeOf(l)).apply(this, arguments));
  }

  render() {
    module1821(false, 'GL.Node elements can only be used as children of GL.Surface / GL.Node and should not be rendered');
  }
}

l.isGLNode = true;
l.displayName = 'GL.Node';
l.propTypes = {
  shader: PropTypes.any.isRequired,
  uniforms: PropTypes.object,
  children: PropTypes.node,
  width: PropTypes.any,
  height: PropTypes.any,
  preload: PropTypes.bool,
};
module.exports = l;
