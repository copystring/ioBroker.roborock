exports.__esModule = true;
u(React);

var React = require('react'),
  PropTypes = u(require('prop-types')),
  module1242 = u(require('./1242'));

u(require('./506'));

const u = require('@babel/runtime/helpers/interopRequireDefault');

function s(t, n) {
  if (!(t instanceof n)) throw new TypeError('Cannot call a class as a function');
}

function c(t, n) {
  if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return !n || ('object' != typeof n && 'function' != typeof n) ? t : n;
}

function p(t, n) {
  if ('function' != typeof n && null !== n) throw new TypeError('Super expression must either be null or a function, not ' + typeof n);
  t.prototype = Object.create(n && n.prototype, {
    constructor: {
      value: t,
      enumerable: !1,
      writable: !0,
      configurable: !0,
    },
  });
  n && (Object.setPrototypeOf ? Object.setPrototypeOf(t, n) : (t.__proto__ = n));
}

var f = 1073741823;

exports.default = function (u, l) {
  var h,
    v,
    y = '__create-react-context-' + (0, module1242.default)() + '__',
    b = (function (t) {
      function n() {
        var module1242, u, p, f;
        s(this, n);

        for (var l = arguments.length, h = Array(l), v = 0; v < l; v++) h[v] = arguments[v];

        module1242 = u = c(this, t.call.apply(t, [this].concat(h)));
        u.emitter =
          ((p = u.props.value),
          (f = []),
          {
            on: function (t) {
              f.push(t);
            },
            off: function (t) {
              f = f.filter(function (n) {
                return n !== t;
              });
            },
            get: function () {
              return p;
            },
            set: function (t, n) {
              p = t;
              f.forEach(function (t) {
                return t(p, n);
              });
            },
          });
        return c(u, module1242);
      }

      p(n, t);

      n.prototype.getChildContext = function () {
        var t;
        (t = {})[y] = this.emitter;
        return t;
      };

      n.prototype.componentWillReceiveProps = function (t) {
        if (this.props.value !== t.value) {
          var n = this.props.value,
            o = t.value,
            u = void 0;
          ((s = n) === (c = o) ? 0 !== s || 1 / s == 1 / c : s != s && c != c)
            ? (u = 0)
            : ((u = 'function' == typeof l ? l(n, o) : f), 0 != (u |= 0) && this.emitter.set(t.value, u));
        }

        var s, c;
      };

      n.prototype.render = function () {
        return this.props.children;
      };

      return n;
    })(React.Component);

  b.childContextTypes = (((h = {})[y] = PropTypes.default.object.isRequired), h);

  var _ = (function (t) {
    function n() {
      var module1242, u;
      s(this, n);

      for (var p = arguments.length, f = Array(p), l = 0; l < p; l++) f[l] = arguments[l];

      module1242 = u = c(this, t.call.apply(t, [this].concat(f)));
      u.state = {
        value: u.getValue(),
      };

      u.onUpdate = function (t, n) {
        0 != ((0 | u.observedBits) & n) &&
          u.setState({
            value: u.getValue(),
          });
      };

      return c(u, module1242);
    }

    p(n, t);

    n.prototype.componentWillReceiveProps = function (t) {
      var n = t.observedBits;
      this.observedBits = void 0 === n || null === n ? f : n;
    };

    n.prototype.componentDidMount = function () {
      this.context[y] && this.context[y].on(this.onUpdate);
      var t = this.props.observedBits;
      this.observedBits = void 0 === t || null === t ? f : t;
    };

    n.prototype.componentWillUnmount = function () {
      this.context[y] && this.context[y].off(this.onUpdate);
    };

    n.prototype.getValue = function () {
      return this.context[y] ? this.context[y].get() : u;
    };

    n.prototype.render = function () {
      return ((t = this.props.children), Array.isArray(t) ? t[0] : t)(this.state.value);
      var t;
    };

    return n;
  })(React.Component);

  _.contextTypes = (((v = {})[y] = PropTypes.default.object), v);
  return {
    Provider: b,
    Consumer: _,
  };
};

module.exports = exports.default;
