var module1527 = require('./1527'),
  module1571 = require('./1571'),
  module1551 = require('./1551'),
  module1547 = require('./1547')('IE_PROTO'),
  p = function () {},
  module1572 = function () {
    var t,
      module1532 = require('./1532')('iframe'),
      c = module1551.length;

    for (
      module1532.style.display = 'none',
        require('./1572').appendChild(module1532),
        module1532.src = 'javascript:',
        (t = module1532.contentWindow.document).open(),
        t.write('<script>document.F=Object</script>'),
        t.close(),
        module1572 = t.F;
      c--;

    )
      delete module1572.prototype[module1551[c]];

    return module1572();
  };

module.exports =
  Object.create ||
  function (o, u) {
    var s;

    if (null !== o) {
      p.prototype = module1527(o);
      s = new p();
      p.prototype = null;
      s[module1547] = o;
    } else s = module1572();

    return undefined === u ? s : module1571(s, u);
  };
