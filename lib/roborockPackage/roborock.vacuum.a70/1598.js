exports.default = function (t) {
  (h = (function (p) {
    function h() {
      module1549.default(this, h);
      var t = module1554.default(this, (h.__proto__ || Object.getPrototypeOf(h)).apply(this, arguments));

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

    module1588.default(h, p);
    module1550.default(h, [
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
            module1510.default({}, this.props, {
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

var module1510 = require('./1510'),
  module1549 = require('./1549'),
  module1550 = require('./1550'),
  module1554 = require('./1554'),
  module1588 = require('./1588'),
  React = require('react'),
  p = function (t) {
    return null;
  };
