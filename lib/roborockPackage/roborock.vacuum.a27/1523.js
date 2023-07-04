var module1476 = require('./1476'),
  module1477 = require('./1477'),
  module1481 = require('./1481'),
  module1515 = require('./1515'),
  React = require('react'),
  module1524 = require('./1524');

var f = module1524.default.Item,
  c = (function (s) {
    function c() {
      module1476.default(this, c);
      return module1481.default(this, (c.__proto__ || Object.getPrototypeOf(c)).apply(this, arguments));
    }

    module1515.default(c, s);
    module1477.default(
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
            return React.default.createElement(module1524.default, this.props, t);
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
