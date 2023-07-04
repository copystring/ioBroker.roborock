module.exports =
  !require('./1139') &&
  !require('./1140')(function () {
    return (
      7 !=
      Object.defineProperty(require('./1141')('div'), 'a', {
        get: function () {
          return 7;
        },
      }).a
    );
  });
