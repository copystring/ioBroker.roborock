var module49 = require('./49');

function t(o, t) {
  var b = Object.keys(o);

  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(o);
    if (t)
      n = n.filter(function (t) {
        return Object.getOwnPropertyDescriptor(o, t).enumerable;
      });
    b.push.apply(b, n);
  }

  return b;
}

function b(b) {
  for (var n = 1; n < arguments.length; n++) {
    var u = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      t(Object(u), true).forEach(function (t) {
        module49(b, t, u[t]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(b, Object.getOwnPropertyDescriptors(u));
    else
      t(Object(u)).forEach(function (o) {
        Object.defineProperty(b, o, Object.getOwnPropertyDescriptor(u, o));
      });
  }

  return b;
}

var module66 = require('./66'),
  module68 = require('./68'),
  module72 = require('./72'),
  module73 = require('./73'),
  PropTypes = require('prop-types'),
  l = b(
    b(b(b({}, module68), module72), module73),
    {},
    {
      backfaceVisibility: PropTypes.oneOf(['visible', 'hidden']),
      backgroundColor: module66,
      borderColor: module66,
      borderTopColor: module66,
      borderRightColor: module66,
      borderBottomColor: module66,
      borderLeftColor: module66,
      borderStartColor: module66,
      borderEndColor: module66,
      borderRadius: PropTypes.number,
      borderTopLeftRadius: PropTypes.number,
      borderTopRightRadius: PropTypes.number,
      borderTopStartRadius: PropTypes.number,
      borderTopEndRadius: PropTypes.number,
      borderBottomLeftRadius: PropTypes.number,
      borderBottomRightRadius: PropTypes.number,
      borderBottomStartRadius: PropTypes.number,
      borderBottomEndRadius: PropTypes.number,
      borderStyle: PropTypes.oneOf(['solid', 'dotted', 'dashed']),
      borderWidth: PropTypes.number,
      borderTopWidth: PropTypes.number,
      borderRightWidth: PropTypes.number,
      borderBottomWidth: PropTypes.number,
      borderLeftWidth: PropTypes.number,
      opacity: PropTypes.number,
      elevation: PropTypes.number,
    }
  );

module.exports = l;
