module.exports = function (t) {
  return encodeURIComponent(t).replace(/[!'()*]/g, function (t) {
    return '%' + t.charCodeAt(0).toString(16).toUpperCase();
  });
};
