module.exports = function (n, t) {
  var c = [],
    f = [];
  n.children.map(function (n) {
    c = c.concat(n.descendantsVDOM);
    f = f.concat(n.descendantsVDOMData);
  });
  return c
    .map(function (c, o) {
      if (-1 === t.indexOf(c))
        for (var s = 0, u = 0; u < n.children.length; u++)
          if (-1 !== n.children[u].descendantsVDOM.indexOf(c) && ++s > 1)
            return {
              data: f[o],
              vdom: c,
            };
    })
    .filter(function (n) {
      return n;
    });
};
