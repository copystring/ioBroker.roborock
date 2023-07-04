var module68 = require('./68'),
  f = function (f, l, o, b, t, u) {
    var s = l[o];
    if (undefined === s || null === s) return f ? new Error('Required ' + t + ' `' + (u || o) + '` was not specified in `' + b + '`.') : undefined;
    else
      return 'number' != typeof s && null === module68(s)
        ? new Error(
            'Invalid ' +
              t +
              ' `' +
              (u || o) +
              '` supplied to `' +
              b +
              '`: ' +
              s +
              "\nValid color formats are\n  - '#f0f' (#rgb)\n  - '#f0fc' (#rgba)\n  - '#ff00ff' (#rrggbb)\n  - '#ff00ff00' (#rrggbbaa)\n  - 'rgb(255, 255, 255)'\n  - 'rgba(255, 255, 255, 1.0)'\n  - 'hsl(360, 100%, 100%)'\n  - 'hsla(360, 100%, 100%, 1.0)'\n  - 'transparent'\n  - 'red'\n  - 0xff00ff00 (0xrrggbbaa)\n"
          )
        : undefined;
  },
  l = f.bind(null, false);

l.isRequired = f.bind(null, true);
module.exports = l;
