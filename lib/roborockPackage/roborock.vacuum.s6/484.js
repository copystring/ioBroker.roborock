var module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11');

function l() {
  if ('undefined' == typeof Reflect || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if ('function' == typeof Proxy) return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (t) {
    return false;
  }
}

var React = require('react'),
  module485 = require('./485'),
  v = (function (f) {
    'use strict';

    module7(p, f);

    var module485 = p,
      v = l(),
      y = function () {
        var t,
          n = module11(module485);

        if (v) {
          var o = module11(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9(this, t);
      };

    function p() {
      module4(this, p);
      return y.apply(this, arguments);
    }

    module5(p, [
      {
        key: 'setNativeProps',
        value: function (t) {},
      },
      {
        key: 'flashScrollIndicators',
        value: function () {},
      },
      {
        key: 'getScrollResponder',
        value: function () {},
      },
      {
        key: 'getScrollableNode',
        value: function () {},
      },
      {
        key: 'getMetrics',
        value: function () {},
      },
      {
        key: 'scrollTo',
        value: function () {},
      },
      {
        key: 'scrollToEnd',
        value: function (t) {},
      },
    ]);
    return p;
  })(React.Component);

v.DataSource = module485;
module.exports = v;
