exports.default = function (t) {
  (h = (function (p) {
    function h() {
      module1164.default(this, h);
      var t = module1169.default(this, (h.__proto__ || Object.getPrototypeOf(h)).apply(this, arguments));

      t.select = function (n, l, o) {
        for (var u = React.default.Children.toArray(t.props.children), c = 0, p = u.length; c < p; c++) if (u[c].props.value === n) return void t.selectByIndex(c, l, o);

        t.selectByIndex(0, l, o);
      };

      t.doScrollingComplete = function (n, l, o) {
        var u = React.default.Children.toArray(t.props.children),
          c = t.computeChildIndex(n, l, u.length),
          p = u[c];
        if (p) o(p.props.value);
        else if (console.warn) console.warn('child not found', u, c);
      };

      return t;
    }

    module1203.default(h, p);
    module1165.default(h, [
      {
        key: 'selectByIndex',
        value: function (t, n, l) {
          if (!(t < 0 || t >= React.default.Children.count(this.props.children) || !n)) l(t * n);
        },
      },
      {
        key: 'computeChildIndex',
        value: function (t, n, l) {
          var o = Math.round(t / n);
          return o ** (l - 1);
        },
      },
      {
        key: 'render',
        value: function () {
          return React.default.createElement(
            t,
            module1125.default({}, this.props, {
              doScrollingComplete: this.doScrollingComplete,
              computeChildIndex: this.computeChildIndex,
              select: this.select,
            })
          );
        },
      },
    ]);
    return h;
  })(React.default.Component)).Item = p;
  return h;
  var h;
};

var module1125 = require('./1125'),
  module1164 = require('./1164'),
  module1165 = require('./1165'),
  module1169 = require('./1169'),
  module1203 = require('./1203'),
  React = require('react'),
  p = function (t) {
    return null;
  };
