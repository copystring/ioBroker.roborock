var module50 = require('./50'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  PropTypes = require('prop-types'),
  React = require('react'),
  module12 = require('./12');

function O(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var c = Object.getOwnPropertySymbols(t);
    if (n)
      c = c.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, c);
  }

  return o;
}

function h() {
  if ('undefined' == typeof Reflect || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if ('function' == typeof Proxy) return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (t) {
    return false;
  }
}

var b;
b = module12.requireNativeComponent('RRRecordView', v);

var v = (function (t) {
  module7.default(O, t);

  var module50 = O,
    PropTypes = h(),
    y = function () {
      var t,
        o = module11.default(module50);

      if (PropTypes) {
        var c = module11.default(this).constructor;
        t = Reflect.construct(o, arguments, c);
      } else t = o.apply(this, arguments);

      return module9.default(this, t);
    };

  function O() {
    module4.default(this, O);
    return y.apply(this, arguments);
  }

  module5.default(O, [
    {
      key: 'render',
      value: function () {
        return b ? React.default.createElement(b, this.props) : null;
      },
    },
  ]);
  return O;
})(React.default.Component);

if (b)
  v.propTypes = (function (t) {
    for (var o = 1; o < arguments.length; o++) {
      var c = null != arguments[o] ? arguments[o] : {};
      if (o % 2)
        O(Object(c), true).forEach(function (o) {
          module50.default(t, o, c[o]);
        });
      else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(c));
      else
        O(Object(c)).forEach(function (n) {
          Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(c, n));
        });
    }

    return t;
  })(
    {
      onVolumeChanged: PropTypes.default.func,
      onError: PropTypes.default.func,
      onRecordPermissionChange: PropTypes.default.func,
      onEndOfSpeech: PropTypes.default.func,
    },
    module12.ViewPropTypes
  );
module.exports = v;
