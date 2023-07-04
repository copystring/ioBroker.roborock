var module1136 = require('./1136'),
  module1180 = require('./1180'),
  module1160 = require('./1160'),
  module1156 = require('./1156')('IE_PROTO'),
  p = function () {},
  module1181 = function () {
    var t,
      module1141 = require('./1141')('iframe'),
      c = module1160.length;

    for (
      module1141.style.display = 'none',
        require('./1181').appendChild(module1141),
        module1141.src = 'javascript:',
        (t = module1141.contentWindow.document).open(),
        t.write('<script>document.F=Object</script>'),
        t.close(),
        module1181 = t.F;
      c--;

    )
      delete module1181.prototype[module1160[c]];

    return module1181();
  };

module.exports =
  Object.create ||
  function (o, u) {
    var s;

    if (null !== o) {
      p.prototype = module1136(o);
      s = new p();
      p.prototype = null;
      s[module1156] = o;
    } else s = module1181();

    return undefined === u ? s : module1180(s, u);
  };
