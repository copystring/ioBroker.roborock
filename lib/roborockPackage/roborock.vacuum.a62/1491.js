var module1448 = require('./1448'),
  module1492 = require('./1492'),
  module1472 = require('./1472'),
  module1468 = require('./1468')('IE_PROTO'),
  p = function () {},
  module1493 = function () {
    var t,
      module1453 = require('./1453')('iframe'),
      c = module1472.length;

    for (
      module1453.style.display = 'none',
        require('./1493').appendChild(module1453),
        module1453.src = 'javascript:',
        (t = module1453.contentWindow.document).open(),
        t.write('<script>document.F=Object</script>'),
        t.close(),
        module1493 = t.F;
      c--;

    )
      delete module1493.prototype[module1472[c]];

    return module1493();
  };

module.exports =
  Object.create ||
  function (o, u) {
    var s;

    if (null !== o) {
      p.prototype = module1448(o);
      s = new p();
      p.prototype = null;
      s[module1468] = o;
    } else s = module1493();

    return undefined === u ? s : module1492(s, u);
  };
