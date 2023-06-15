function t(n, t) {
  if (!(n instanceof t)) throw new TypeError('Cannot call a class as a function');
}

function o(n, t) {
  if (!n) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return !t || ('object' != typeof t && 'function' != typeof t) ? n : t;
}

function u(n, t) {
  if ('function' != typeof t && null !== t) throw new TypeError('Super expression must either be null or a function, not ' + typeof t);
  n.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: n,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  });
  if (t) Object.setPrototypeOf ? Object.setPrototypeOf(n, t) : (n.__proto__ = t);
}

var React = require('react').Component,
  PropTypes = require('prop-types'),
  module1819 = require('./1819');

class s {
  constructor() {
    t(this, s);
    return o(this, (s.__proto__ || Object.getPrototypeOf(s)).apply(this, arguments));
  }

  render() {
    module1819(false, 'GL.Uniform elements are for GL.Node configuration only and should not be rendered');
  }
}

s.isGLUniform = true;
s.displayName = 'GL.Uniform';
s.propTypes = {
  children: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired,
};
module.exports = s;
