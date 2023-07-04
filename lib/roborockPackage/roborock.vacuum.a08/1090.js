exports.default = function (n) {
  return (Array.isArray(n) ? n.join(',') : n)
    .replace(/[^e]-/, ' -')
    .split(/(?:\s+|\s*,\s*)/g)
    .join(' ');
};
