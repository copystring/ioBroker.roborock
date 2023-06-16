var t,
  u,
  module4 = require('./4'),
  module5 = require('./5'),
  o = null,
  v = 0,
  f = 0,
  s = (function () {
    function n() {
      module4.default(this, n);
      if (!o) o = this;
      return o;
    }

    module5.default(
      n,
      [
        {
          key: 'startTime',
          value: function () {
            if (t) clearInterval(t);
            t = setInterval(function () {
              v += 1;
            }, 1e3);
          },
        },
        {
          key: 'cancle',
          value: function () {
            if (t) clearInterval(t);
            v = 0;
          },
        },
        {
          key: 'getSpan',
          value: function () {
            return v;
          },
        },
        {
          key: 'startRecordTime',
          value: function () {
            if (u) clearInterval(u);
            u = setInterval(function () {
              f += 1;
            }, 1e3);
          },
        },
        {
          key: 'cancleRecord',
          value: function () {
            if (u) clearInterval(u);
            f = 0;
          },
        },
        {
          key: 'getRecordSpan',
          value: function () {
            return f;
          },
        },
      ],
      [
        {
          key: 'sharedManager',
          value: function () {
            return new n();
          },
        },
      ]
    );
    return n;
  })();

exports.default = s;
var y = s.sharedManager();
exports.timeTool = y;
