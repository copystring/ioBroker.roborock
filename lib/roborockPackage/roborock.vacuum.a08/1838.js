module.exports = function (n) {
  var t = [],
    o = [];

  (function n(c) {
    c.contents.forEach(function (n) {
      if (-1 === t.indexOf(n.vdom)) {
        t.push(n.vdom);
        o.push(n);
      }
    });
    c.children.forEach(function (t) {
      n(t.data);
    });
  })(n);

  return o;
};
