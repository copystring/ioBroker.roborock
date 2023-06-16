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
  h = (function (s) {
    module7(R, s);

    var h = R,
      b = f(),
      C = function () {
        var t,
          n = module11(h);

        if (b) {
          var o = module11(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9(this, t);
      };

    function R() {
      module4(this, R);
      return C.apply(this, arguments);
    }

    module5(R, [
      {
        key: 'render',
        value: function () {
          return (
            <module83 style={[v.dummy, this.props.style]}>
              <module196 style={v.text}>SegmentedControlIOS is not supported on this platform!</module196>
            </module83>
          );
        },
      },
    ]);
    return R;
  })(React.Component),
  v = module60.create({
    dummy: {
      width: 120,
      height: 50,
      backgroundColor: '#ffbcbc',
      borderWidth: 1,
      borderColor: 'red',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      color: '#333333',
      margin: 5,
      fontSize: 10,
    },
  });

module.exports = h;
