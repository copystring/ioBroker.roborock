var module22 = require('./22'),
  module152 = require('./152'),
  module341 = require('./341'),
  module305 = require('./305'),
  React = require('react'),
  module342 = require('./342'),
  module14 = require('./14');

require('./343');

module.exports = function (t, f, v, _, E, T, x) {
  module14(v, 'Expect to have a valid rootTag, instead got ', v);
  var A = React.createElement(
    module341.default.Provider,
    {
      value: null != x ? x : module152.default,
    },
    React.createElement(
      module305,
      {
        rootTag: v,
        WrapperComponent: _,
      },
      React.createElement(
        t,
        module22.default({}, f, {
          rootTag: v,
        })
      ),
      true === E && true === T ? React.createElement(module342, null) : null
    )
  );
  module152.default.startTimespan('renderApplication_React_render');
  if (E) require('./345').render(A, v);
  else require('./86').render(A, v);
  module152.default.stopTimespan('renderApplication_React_render');
};
