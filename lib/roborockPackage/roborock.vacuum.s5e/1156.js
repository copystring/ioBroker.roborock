module.exports = function (t, n) {
  if ('string' != typeof t || 'string' != typeof n) throw new TypeError('Expected the arguments to be of type `string`');
  if ('' === n) return [t];
  var o = t.indexOf(n);
  return -1 === o ? [t] : [t.slice(0, o), t.slice(o + n.length)];
};
