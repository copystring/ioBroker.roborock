var React = require('react'),
  module13 = require('./13'),
  module1516 = require('./1516').default(function (t) {
    var u = t.children,
      f = t.style,
      o = t.getValue(),
      c = React.default.Children.map(u, function (l, u) {
        return React.default.cloneElement(l, {
          selectedValue: o[u],
          onValueChange: function (...args) {
            return t.onValueChange(u, ...args);
          },
        });
      });
    return React.default.createElement(
      module13.View,
      {
        style: f,
      },
      c
    );
  });

exports.default = module1516;
