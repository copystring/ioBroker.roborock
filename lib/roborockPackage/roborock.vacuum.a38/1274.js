var module1231 = require('./1231'),
  module1275 = require('./1275'),
  module1255 = require('./1255'),
  module1251 = require('./1251')('IE_PROTO'),
  p = function () {},
  module1276 = function () {
    var t,
      module1236 = require('./1236')('iframe'),
      c = module1255.length;

    for (
      module1236.style.display = 'none',
        require('./1276').appendChild(module1236),
        module1236.src = 'javascript:',
        (t = module1236.contentWindow.document).open(),
        t.write('<script>document.F=Object</script>'),
        t.close(),
        module1276 = t.F;
      c--;

    )
      delete module1276.prototype[module1255[c]];

    return module1276();
  };

module.exports =
  Object.create ||
  function (o, u) {
    var s;

    if (null !== o) {
      p.prototype = module1231(o);
      s = new p();
      p.prototype = null;
      s[module1251] = o;
    } else s = module1276();

    return undefined === u ? s : module1275(s, u);
  };
