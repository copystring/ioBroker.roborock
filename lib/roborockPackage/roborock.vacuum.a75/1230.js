module.exports =
  Array.isArray ||
  function (t) {
    return '[object Array]' == Object.prototype.toString.call(t);
  };
