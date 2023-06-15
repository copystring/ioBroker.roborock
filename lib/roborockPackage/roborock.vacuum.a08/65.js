var module49 = require('./49');

function o(t, o) {
  var n = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var b = Object.getOwnPropertySymbols(t);
    if (o)
      b = b.filter(function (o) {
        return Object.getOwnPropertyDescriptor(t, o).enumerable;
      });
    n.push.apply(n, b);
  }

  return n;
}

function n(n) {
  for (var b = 1; b < arguments.length; b++) {
    var c = null != arguments[b] ? arguments[b] : {};
    if (b % 2)
      o(Object(c), true).forEach(function (o) {
        module49(n, o, c[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(n, Object.getOwnPropertyDescriptors(c));
    else
      o(Object(c)).forEach(function (t) {
        Object.defineProperty(n, t, Object.getOwnPropertyDescriptor(c, t));
      });
  }

  return n;
}

var module66 = require('./66'),
  module68 = require('./68'),
  module72 = require('./72'),
  module73 = require('./73'),
  PropTypes = require('prop-types'),
  p = n(
    n(n(n({}, module68), module72), module73),
    {},
    {
      resizeMode: PropTypes.oneOf(['center', 'contain', 'cover', 'repeat', 'stretch']),
      backfaceVisibility: PropTypes.oneOf(['visible', 'hidden']),
      backgroundColor: module66,
      borderColor: module66,
      borderWidth: PropTypes.number,
      borderRadius: PropTypes.number,
      overflow: PropTypes.oneOf(['visible', 'hidden']),
      tintColor: module66,
      opacity: PropTypes.number,
      overlayColor: PropTypes.string,
      borderTopLeftRadius: PropTypes.number,
      borderTopRightRadius: PropTypes.number,
      borderBottomLeftRadius: PropTypes.number,
      borderBottomRightRadius: PropTypes.number,
    }
  );

module.exports = p;
