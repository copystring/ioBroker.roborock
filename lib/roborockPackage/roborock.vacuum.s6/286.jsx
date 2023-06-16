var module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11');

function f() {
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
  module60 = require('./60'),
  module196 = require('./196'),
  module83 = require('./83'),
  h = (function (l) {
    module7(b, l);

    var h = b,
      v = f(),
      P = function () {
        var t,
          n = module11(h);

        if (v) {
          var c = module11(this).constructor;
          t = Reflect.construct(n, arguments, c);
        } else t = n.apply(this, arguments);

        return module9(this, t);
      };

    function b() {
      module4(this, b);
      return P.apply(this, arguments);
    }

    module5(b, [
      {
        key: 'render',
        value: function () {
          return (
            <module83 style={[k.dummyDatePickerIOS, this.props.style]}>
              <module196 style={k.datePickerText}>DatePickerIOS is not supported on this platform!</module196>
            </module83>
          );
        },
      },
    ]);
    return b;
  })(React.Component),
  k = module60.create({
    dummyDatePickerIOS: {
      height: 100,
      width: 300,
      backgroundColor: '#ffbcbc',
      borderWidth: 1,
      borderColor: 'red',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 10,
    },
    datePickerText: {
      color: '#333333',
      margin: 20,
    },
  });

module.exports = h;
