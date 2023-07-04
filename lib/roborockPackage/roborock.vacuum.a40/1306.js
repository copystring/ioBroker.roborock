var module1259 = require('./1259'),
  module1260 = require('./1260'),
  module1264 = require('./1264'),
  module1298 = require('./1298'),
  React = require('react'),
  module1307 = require('./1307');

var f = module1307.default.Item,
  c = (function (s) {
    function c() {
      module1259.default(this, c);
      return module1264.default(this, (c.__proto__ || Object.getPrototypeOf(c)).apply(this, arguments));
    }

    module1298.default(c, s);
    module1260.default(
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
            return React.default.createElement(module1307.default, this.props, t);
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
