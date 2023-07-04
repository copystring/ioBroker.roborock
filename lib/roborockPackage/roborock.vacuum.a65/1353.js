exports.propsAndStyles = function (t) {
  var n = t.style;
  return j(j({}, n && n.length ? Object.assign({}, ...module31.default(n)) : n), t);
};

exports.default = function (t, o) {
  var c = t.opacity,
    b = t.onLayout,
    v = t.id,
    P = t.clipPath,
    h = t.mask,
    w = [],
    k = module1360.props2transform(t),
    D = j(
      j(
        j(
          j(
            {
              matrix: module1360.transformToMatrix(k, t.transform),
              onLayout: b,
            },
            k
          ),
          {},
          {
            propList: w,
            opacity: module1357.default(c),
          },
          module1365.default(t, o)
        ),
        module1354.default(t, w)
      ),
      module1358.default(t, w)
    );
  if (v) D.name = v;
  if (P) module22.default(D, module1363.default(t));

  if (h) {
    var _ = h.match(module1364.idPattern);

    if (_) D.mask = _[1];
    else console.warn('Invalid `mask` prop, expected a mask like "#id", but got: "' + h + '"');
  }

  return D;
};

var module22 = require('./22'),
  module50 = require('./50'),
  module1354 = require('./1354'),
  module1358 = require('./1358'),
  module1360 = require('./1360'),
  module1363 = require('./1363'),
  module1365 = require('./1365'),
  module1357 = require('./1357'),
  module1364 = require('./1364');

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
        module50.default(t, n, o[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(o));
    else
      b(Object(o)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(o, n));
      });
  }

  return t;
}
