var module1555 = require('./1555'),
  module1556 = require('./1556'),
  module1560 = require('./1560'),
  module1594 = require('./1594'),
  React = require('react'),
  module1603 = require('./1603');

var f = module1603.default.Item,
  c = (function (s) {
    function c() {
      module1555.default(this, c);
      return module1560.default(this, (c.__proto__ || Object.getPrototypeOf(c)).apply(this, arguments));
    }

    module1594.default(c, s);
    module1556.default(
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
            return React.default.createElement(module1603.default, this.props, t);
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
