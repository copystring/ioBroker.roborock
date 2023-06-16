exports.default = function (t) {
  (h = (function (p) {
    function h() {
      module1476.default(this, h);
      var t = module1481.default(this, (h.__proto__ || Object.getPrototypeOf(h)).apply(this, arguments));

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

    module1515.default(h, p);
    module1477.default(h, [
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
            module1437.default({}, this.props, {
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

var module1437 = require('./1437'),
  module1476 = require('./1476'),
  module1477 = require('./1477'),
  module1481 = require('./1481'),
  module1515 = require('./1515'),
  React = require('react'),
  p = function (t) {
    return null;
  };
