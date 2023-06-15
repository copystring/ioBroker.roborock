module.exports =
  !require('./1451') &&
  !require('./1452')(function () {
    return (
      7 !=
      Object.defineProperty(require('./1453')('div'), 'a', {
        get: function () {
          return 7;
        },
      }).a
    );
  });
