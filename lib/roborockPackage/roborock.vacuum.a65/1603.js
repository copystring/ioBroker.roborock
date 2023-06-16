var module1556 = require('./1556'),
  module1557 = require('./1557'),
  module1561 = require('./1561'),
  module1595 = require('./1595'),
  React = require('react'),
  module1604 = require('./1604');

var f = module1604.default.Item,
  c = (function (s) {
    function c() {
      module1556.default(this, c);
      return module1561.default(this, (c.__proto__ || Object.getPrototypeOf(c)).apply(this, arguments));
    }

    module1595.default(c, s);
    module1557.default(
      c,
      [
        {
          key: 'getValue',
          value: function () {
            if ('selectedValue' in this.props) return this.props.selectedValue;
            var t = React.default.Children.toArray(this.props.children);
            return t && t[0] && t[0].props.value;
          },
        },
        {
          key: 'shouldComponentUpdate',
          value: function (t) {
            return this.props.selectedValue !== t.selectedValue || this.props.children !== t.children;
          },
        },
        {
          key: 'render',
          value: function () {
            var t = React.default.Children.map(this.props.children, function (t) {
              return React.default.createElement(f, {
                label: t.props.children + '',
                value: t.props.value + '',
                key: t.key,
              });
            });
            return React.default.createElement(module1604.default, this.props, t);
          },
        },
      ],
      [
        {
          key: 'Item',
          value: function () {},
        },
      ]
    );
    return c;
  })(React.default.Component);

c.defaultProps = {
  children: [],
};
exports.default = c;
module.exports = exports.default;
