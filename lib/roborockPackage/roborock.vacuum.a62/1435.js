var React = require('react'),
  module12 = require('./12'),
  module1436 = require('./1436').default(function (t) {
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
      module12.View,
      {
        style: f,
      },
      c
    );
  });

exports.default = module1436;
