var module22 = require('./22')(Object.create(null), {
  margin: true,
  marginHorizontal: true,
  marginVertical: true,
  marginBottom: true,
  marginTop: true,
  marginLeft: true,
  marginRight: true,
  flex: true,
  flexGrow: true,
  flexShrink: true,
  flexBasis: true,
  alignSelf: true,
  height: true,
  minHeight: true,
  maxHeight: true,
  width: true,
  minWidth: true,
  maxWidth: true,
  position: true,
  left: true,
  right: true,
  bottom: true,
  top: true,
  transform: true,
});

module.exports = function (n) {
  var o = {},
    f = {};
  if (n)
    Object.keys(n).forEach(function (h) {
      var l = n[h];
      if (module22[h]) f[h] = l;
      else o[h] = l;
    });
  return {
    outer: f,
    inner: o,
  };
};
