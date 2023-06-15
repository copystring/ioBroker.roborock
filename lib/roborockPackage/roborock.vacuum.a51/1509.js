exports.default = function (n) {
  (f = (function (f) {
    function p() {
      module1549.default(this, p);
      var n = module1554.default(this, (p.__proto__ || Object.getPrototypeOf(p)).apply(this, arguments));

      n.getValue = function () {
        var t = n.props,
          o = t.children,
          l = t.selectedValue;
        return l && l.length
          ? l
          : o
          ? React.default.Children.map(o, function (n) {
              var t = React.default.Children.toArray(n.children || n.props.children);
              return t && t[0] && t[0].props.value;
            })
          : [];
      };

      n.onChange = function (t, o, l) {
        var u = n.getValue().concat();
        u[t] = o;
        if (l) l(u, t);
      };

      n.onValueChange = function (t, o) {
        n.onChange(t, o, n.props.onValueChange);
      };

      n.onScrollChange = function (t, o) {
        n.onChange(t, o, n.props.onScrollChange);
      };

      return n;
    }

    module1588.default(p, f);
    module1550.default(p, [
      {
        key: 'render',
        value: function () {
          return React.default.createElement(
            n,
            module1510.default({}, this.props, {
              getValue: this.getValue,
              onValueChange: this.onValueChange,
              onScrollChange: this.props.onScrollChange && this.onScrollChange,
            })
          );
        },
      },
    ]);
    return p;
  })(React.default.Component)).defaultProps = {
    prefixCls: 'rmc-multi-picker',
    onValueChange: function () {},
  };
  return f;
  var f;
};

var module1510 = require('./1510'),
  module1549 = require('./1549'),
  module1550 = require('./1550'),
  module1554 = require('./1554'),
  module1588 = require('./1588'),
  React = require('react');
