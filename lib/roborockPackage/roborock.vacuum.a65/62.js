var module6 = require('./6'),
  module63 = require('./63'),
  o = (function () {
    function o() {
      module6(this, o);
    }

    module7(o, null, [
      {
        key: 'get',
        value: function () {
          return module63.get('window').scale;
        },
      },
      {
        key: 'getFontScale',
        value: function () {
          return module63.get('window').fontScale || o.get();
        },
      },
      {
        key: 'getPixelSizeForLayoutSize',
        value: function (t) {
          return Math.round(t * o.get());
        },
      },
      {
        key: 'roundToNearestPixel',
        value: function (t) {
          var n = o.get();
          return Math.round(t * n) / n;
        },
      },
      {
        key: 'startDetecting',
        value: function () {},
      },
    ]);
    return o;
  })();

module.exports = o;
