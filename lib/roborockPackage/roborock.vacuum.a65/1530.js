module.exports =
  !require('./1531') &&
  !require('./1532')(function () {
    return (
      7 !=
      Object.defineProperty(require('./1533')('div'), 'a', {
        get: function () {
          return 7;
        },
      }).a
    );
  });
