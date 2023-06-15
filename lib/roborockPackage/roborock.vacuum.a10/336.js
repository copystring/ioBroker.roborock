var module21 = require('./21'),
  module150 = require('./150'),
  module337 = require('./337'),
  module301 = require('./301'),
  React = require('react'),
  module338 = require('./338'),
  module13 = require('./13');

require('./339');

module.exports = function (t, f, v, _, E, T, x) {
  module13(v, 'Expect to have a valid rootTag, instead got ', v);
  var A = React.createElement(
    module337.default.Provider,
    {
      value: null != x ? x : module150.default,
    },
    React.createElement(
      module301,
      {
        rootTag: v,
        WrapperComponent: _,
      },
      React.createElement(
        t,
        module21.default({}, f, {
          rootTag: v,
        })
      ),
      true === E && true === T ? React.createElement(module338, null) : null
    )
  );
  module150.default.startTimespan('renderApplication_React_render');
  if (E) require('./341').render(A, v);
  else require('./85').render(A, v);
  module150.default.stopTimespan('renderApplication_React_render');
};
