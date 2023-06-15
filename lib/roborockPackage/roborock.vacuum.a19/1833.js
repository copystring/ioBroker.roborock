var React = require('react');

module.exports = function (t) {
  return 1 === React.Children.count(t) ? (t instanceof Array ? t[0] : t) : null;
};
