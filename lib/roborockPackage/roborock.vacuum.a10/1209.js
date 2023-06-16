var module1162 = require('./1162'),
  module1163 = require('./1163'),
  module1167 = require('./1167'),
  module1201 = require('./1201'),
  React = require('react'),
  module1210 = require('./1210');

var f = module1210.default.Item,
  c = (function (s) {
    function c() {
      module1162.default(this, c);
      return module1167.default(this, (c.__proto__ || Object.getPrototypeOf(c)).apply(this, arguments));
    }

    module1201.default(c, s);
    module1163.default(
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
            return React.default.createElement(module1210.default, this.props, t);
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
