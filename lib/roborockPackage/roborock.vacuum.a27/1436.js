exports.default = function (n) {
  (f = (function (f) {
    function p() {
      module1476.default(this, p);
      var n = module1481.default(this, (p.__proto__ || Object.getPrototypeOf(p)).apply(this, arguments));

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

    module1515.default(p, f);
    module1477.default(p, [
      {
        key: 'render',
        value: function () {
          return React.default.createElement(
            n,
            module1437.default({}, this.props, {
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

var module1437 = require('./1437'),
  module1476 = require('./1476'),
  module1477 = require('./1477'),
  module1481 = require('./1481'),
  module1515 = require('./1515'),
  React = require('react');
