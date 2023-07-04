exports.default = function (n) {
  var c = n.clipPath,
    o = n.clipRule,
    p = {};
  if (o) p.clipRule = 0 === l[o] ? 0 : 1;

  if (c) {
    var u = c.match(module1176.idPattern);
    if (u) p.clipPath = u[1];
    else console.warn('Invalid `clipPath` prop, expected a clipPath like "#id", but got: "' + c + '"');
  }

  return p;
};

var module1176 = require('./1176'),
  l = {
    evenodd: 0,
    nonzero: 1,
  };
