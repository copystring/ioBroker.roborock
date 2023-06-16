exports.default = function () {
  var t = module63.default.get('window'),
    n = React.useState(false)[1].bind(null, function (t) {
      return !t;
    }),
    c = React.useState(t)[0];
  React.useEffect(
    function () {
      module63.default.addEventListener('change', n);
      if (module63.default.get('window') !== c) n();
      return function () {
        module63.default.removeEventListener('change', n);
      };
    },
    [n, c]
  );
  return t;
};

var module63 = require('./63'),
  React = require('react');
