var module1528 = require('./1528'),
  module1572 = require('./1572'),
  module1552 = require('./1552'),
  module1548 = require('./1548')('IE_PROTO'),
  p = function () {},
  module1573 = function () {
    var t,
      module1533 = require('./1533')('iframe'),
      c = module1552.length;

    for (
      module1533.style.display = 'none',
        require('./1573').appendChild(module1533),
        module1533.src = 'javascript:',
        (t = module1533.contentWindow.document).open(),
        t.write('<script>document.F=Object</script>'),
        t.close(),
        module1573 = t.F;
      c--;

    )
      delete module1573.prototype[module1552[c]];

    return module1573();
  };

module.exports =
  Object.create ||
  function (o, u) {
    var s;

    if (null !== o) {
      p.prototype = module1528(o);
      s = new p();
      p.prototype = null;
      s[module1548] = o;
    } else s = module1573();

    return undefined === u ? s : module1572(s, u);
  };
