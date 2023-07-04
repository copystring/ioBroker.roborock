exports.default = function (n) {
  (f = (function (f) {
    function p() {
      module1259.default(this, p);
      var n = module1264.default(this, (p.__proto__ || Object.getPrototypeOf(p)).apply(this, arguments));

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

    module1298.default(p, f);
    module1260.default(p, [
      {
        key: 'render',
        value: function () {
          return React.default.createElement(
            n,
            module1220.default({}, this.props, {
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

var module1220 = require('./1220'),
  module1259 = require('./1259'),
  module1260 = require('./1260'),
  module1264 = require('./1264'),
  module1298 = require('./1298'),
  React = require('react');
