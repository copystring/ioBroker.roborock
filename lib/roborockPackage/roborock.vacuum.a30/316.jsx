var module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11');

function f() {
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

var React = require('react'),
  module61 = require('./61'),
  module198 = require('./198'),
  module84 = require('./84'),
  v = module61.create({
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

class h {
  constructor() {
    module4(this, R);
    return C.apply(this, arguments);
  }

  render() {
    return (
      <module84 style={[v.dummy, this.props.style]}>
        <module198 style={v.text}>SegmentedControlIOS is not supported on this platform!</module198>
      </module84>
    );
  }
}

module.exports = h;
