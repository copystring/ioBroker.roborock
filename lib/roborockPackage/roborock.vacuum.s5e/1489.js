var module1446 = require('./1446'),
  module1490 = require('./1490'),
  module1470 = require('./1470'),
  module1466 = require('./1466')('IE_PROTO'),
  p = function () {},
  module1491 = function () {
    var t,
      module1451 = require('./1451')('iframe'),
      c = module1470.length;

    for (
      module1451.style.display = 'none',
        require('./1491').appendChild(module1451),
        module1451.src = 'javascript:',
        (t = module1451.contentWindow.document).open(),
        t.write('<script>document.F=Object</script>'),
        t.close(),
        module1491 = t.F;
      c--;

    )
      delete module1491.prototype[module1470[c]];

    return module1491();
  };

module.exports =
  Object.create ||
  function (o, u) {
    var s;

    if (null !== o) {
      p.prototype = module1446(o);
      s = new p();
      p.prototype = null;
      s[module1466] = o;
    } else s = module1491();

    return undefined === u ? s : module1490(s, u);
  };
