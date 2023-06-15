var module1521 = require('./1521'),
  module1565 = require('./1565'),
  module1545 = require('./1545'),
  module1541 = require('./1541')('IE_PROTO'),
  p = function () {},
  module1566 = function () {
    var t,
      module1526 = require('./1526')('iframe'),
      c = module1545.length;

    for (
      module1526.style.display = 'none',
        require('./1566').appendChild(module1526),
        module1526.src = 'javascript:',
        (t = module1526.contentWindow.document).open(),
        t.write('<script>document.F=Object</script>'),
        t.close(),
        module1566 = t.F;
      c--;

    )
      delete module1566.prototype[module1545[c]];

    return module1566();
  };

module.exports =
  Object.create ||
  function (o, u) {
    var s;

    if (null !== o) {
      p.prototype = module1521(o);
      s = new p();
      p.prototype = null;
      s[module1541] = o;
    } else s = module1566();

    return undefined === u ? s : module1565(s, u);
  };
