exports.default = function (t, o) {
  if (t.childRouters && t.childRouters[o]) return t.childRouters[o];
  return t.getComponentForRouteName(o).router;
};
