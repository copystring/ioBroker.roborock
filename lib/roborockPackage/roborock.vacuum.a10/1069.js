exports.propsAndStyles = function (t) {
  var n = t.style;
  return j(j({}, n && n.length ? Object.assign({}, ...module30.default(n)) : n), t);
};

exports.default = function (t, o) {
  var c = t.opacity,
    b = t.onLayout,
    v = t.id,
    P = t.clipPath,
    h = t.mask,
    w = [],
    k = module1076.props2transform(t),
    D = j(
      j(
        j(
          j(
            {
              matrix: module1076.transformToMatrix(k, t.transform),
              onLayout: b,
            },
            k
          ),
          {},
          {
            propList: w,
            opacity: module1073.default(c),
          },
          module1081.default(t, o)
        ),
        module1070.default(t, w)
      ),
      module1074.default(t, w)
    );
  if (v) D.name = v;
  if (P) module21.default(D, module1079.default(t));

  if (h) {
    var _ = h.match(module1080.idPattern);

    if (_) D.mask = _[1];
    else console.warn('Invalid `mask` prop, expected a mask like "#id", but got: "' + h + '"');
  }

  return D;
};

var module21 = require('./21'),
  module30 = require('./30'),
  module49 = require('./49'),
  module1070 = require('./1070'),
  module1074 = require('./1074'),
  module1076 = require('./1076'),
  module1079 = require('./1079'),
  module1081 = require('./1081'),
  module1073 = require('./1073'),
  module1080 = require('./1080');

function b(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var c = Object.getOwnPropertySymbols(t);
    if (n)
      c = c.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, c);
  }

  return o;
}

function j(t) {
  for (var n = 1; n < arguments.length; n++) {
    var o = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      b(Object(o), true).forEach(function (n) {
        module49.default(t, n, o[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(o));
    else
      b(Object(o)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(o, n));
      });
  }

  return t;
}
