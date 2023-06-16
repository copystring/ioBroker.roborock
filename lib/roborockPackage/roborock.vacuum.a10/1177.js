var module1134 = require('./1134'),
  module1178 = require('./1178'),
  module1158 = require('./1158'),
  module1154 = require('./1154')('IE_PROTO'),
  p = function () {},
  module1179 = function () {
    var t,
      module1139 = require('./1139')('iframe'),
      c = module1158.length;

    for (
      module1139.style.display = 'none',
        require('./1179').appendChild(module1139),
        module1139.src = 'javascript:',
        (t = module1139.contentWindow.document).open(),
        t.write('<script>document.F=Object</script>'),
        t.close(),
        module1179 = t.F;
      c--;

    )
      delete module1179.prototype[module1158[c]];

    return module1179();
  };

module.exports =
  Object.create ||
  function (o, u) {
    var s;

    if (null !== o) {
      p.prototype = module1134(o);
      s = new p();
      p.prototype = null;
      s[module1154] = o;
    } else s = module1179();

    return undefined === u ? s : module1178(s, u);
  };
