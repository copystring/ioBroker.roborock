var module1831 = require('./1831');

module.exports = function (t, p, o) {
  var s = t.type;

  if (s.isGLComponent) {
    var u = new s();
    u.props = t.props;
    u.context = p;
    var c = module1831(u.render()),
      v = s.displayName || s.name || '';
    o.push(v);
    return c;
  }
};
