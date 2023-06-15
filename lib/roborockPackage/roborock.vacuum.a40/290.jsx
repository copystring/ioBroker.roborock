var module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11');

function s() {
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
  k = module61.create({
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

class h {
  constructor() {
    module4(this, b);
    return P.apply(this, arguments);
  }

  render() {
    return (
      <module84 style={[k.dummyDatePickerIOS, this.props.style]}>
        <module198 style={k.datePickerText}>DatePickerIOS is not supported on this platform!</module198>
      </module84>
    );
  }
}

module.exports = h;
