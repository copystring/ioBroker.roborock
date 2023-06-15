var n =
  Object.assign ||
  function (n) {
    for (var t = 1; t < arguments.length; t++) {
      var s = arguments[t];

      for (var c in s) Object.prototype.hasOwnProperty.call(s, c) && (n[c] = s[c]);
    }

    return n;
  };

module.exports = function (t) {
  return (function t(s) {
    var c = [s.vdom],
      o = [s.data],
      u = s.data.children.map(function (n) {
        var s = t(n);

        if (-1 === c.indexOf(s.vdom)) {
          c.push(s.vdom);
          o.push(s.data);
        }

        s.descendantsVDOM.forEach(function (n, t) {
          if (-1 === c.indexOf(n)) {
            c.push(n);
            o.push(s.descendantsVDOMData[t]);
          }
        });
        return s;
      });
    return n({}, s, {
      data: n({}, s.data, {
        children: u,
      }),
      descendantsVDOM: c,
      descendantsVDOMData: o,
    });
  })({
    data: t,
  }).data;
};
