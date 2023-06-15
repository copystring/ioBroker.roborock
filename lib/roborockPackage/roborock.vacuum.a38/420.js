var module4 = require('./4'),
  o = (function () {
    function t() {
      module4.default(this, t);
    }

    module5.default(t, null, [
      {
        key: 'getTime',
        value: function (t) {
          var n = new Date('number' == typeof t ? t : parseInt(t.replace('log_', '')));
          return (
            n.toLocaleDateString() +
            ' ' +
            n.toLocaleTimeString('en-GB', {
              hour12: false,
            })
          );
        },
      },
      {
        key: 'getDate',
        value: function (t) {
          return new Date('number' == typeof t ? t : parseInt(t.replace('log_', ''))).toLocaleDateString();
        },
      },
      {
        key: 'jsonToQueryString',
        value: function (t) {
          var n = '',
            u = Object.keys(t);
          u.forEach(function (o, l) {
            var c = l < u.length - 1 ? '&' : '';
            n += o + '=' + t[o] + c;
          });
          return n;
        },
      },
    ]);
    return t;
  })();

exports.default = o;
