var module1833 = require('./1833');

module.exports = function (t, p, o) {
  var s = t.type;

  if (s.isGLComponent) {
    var u = new s();
    u.props = t.props;
    u.context = p;
    var c = module1833(u.render()),
      v = s.displayName || s.name || '';
    o.push(v);
    return c;
  }
};
