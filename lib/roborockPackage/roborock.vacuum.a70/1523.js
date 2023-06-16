module.exports =
  !require('./1524') &&
  !require('./1525')(function () {
    return (
      7 !=
      Object.defineProperty(require('./1526')('div'), 'a', {
        get: function () {
          return 7;
        },
      }).a
    );
  });
