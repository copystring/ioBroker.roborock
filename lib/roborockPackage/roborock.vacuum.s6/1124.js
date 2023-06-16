exports.default = function (n) {
  (f = (function (f) {
    function p() {
      module1164.default(this, p);
      var n = module1169.default(this, (p.__proto__ || Object.getPrototypeOf(p)).apply(this, arguments));

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

    module1203.default(p, f);
    module1165.default(p, [
      {
        key: 'render',
        value: function () {
          return React.default.createElement(
            n,
            module1125.default({}, this.props, {
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

var module1125 = require('./1125'),
  module1164 = require('./1164'),
  module1165 = require('./1165'),
  module1169 = require('./1169'),
  module1203 = require('./1203'),
  React = require('react');
