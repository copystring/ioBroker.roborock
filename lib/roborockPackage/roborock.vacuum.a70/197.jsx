var module50 = require('./50'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12');

function l(t, o) {
  var n = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var c = Object.getOwnPropertySymbols(t);
    if (o)
      c = c.filter(function (o) {
        return Object.getOwnPropertyDescriptor(t, o).enumerable;
      });
    n.push.apply(n, c);
  }

  return n;
}

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

require('./52');

require('./221');

var React = require('react'),
  module61 = require('./61'),
  module198 = require('./198'),
  module213 = require('./213'),
  module84 = require('./84'),
  module14 = require('./14'),
  v = module61.create({
    button: {
      elevation: 4,
      backgroundColor: '#2196F3',
      borderRadius: 2,
    },
    text: (function (o) {
      for (var n = 1; n < arguments.length; n++) {
        var c = null != arguments[n] ? arguments[n] : {};
        if (n % 2)
          l(Object(c), true).forEach(function (n) {
            module50(o, n, c[n]);
          });
        else if (Object.getOwnPropertyDescriptors) Object.defineProperties(o, Object.getOwnPropertyDescriptors(c));
        else
          l(Object(c)).forEach(function (t) {
            Object.defineProperty(o, t, Object.getOwnPropertyDescriptor(c, t));
          });
      }

      return o;
    })(
      {
        textAlign: 'center',
        padding: 8,
      },
      {
        color: 'white',
        fontWeight: '500',
      }
    ),
    buttonDisabled: {
      elevation: 0,
      backgroundColor: '#dfdfdf',
    },
    textDisabled: {
      color: '#a1a1a1',
    },
  });

class D {
  constructor() {
    module6(this, F);
    return D.apply(this, arguments);
  }

  render() {
    var t = this.props,
      o = t.accessibilityLabel,
      n = t.color,
      c = t.onPress,
      s = t.touchSoundDisabled,
      u = t.title,
      l = t.hasTVPreferredFocus,
      f = t.nextFocusDown,
      p = t.nextFocusForward,
      D = t.nextFocusLeft,
      F = t.nextFocusRight,
      P = t.nextFocusUp,
      j = t.disabled,
      w = t.testID,
      R = [v.button],
      S = [v.text];
    if (n)
      R.push({
        backgroundColor: n,
      });
    var k = [];

    if (j) {
      R.push(v.buttonDisabled);
      S.push(v.textDisabled);
      k.push('disabled');
    }

    module14('string' == typeof u, 'The title prop of a Button must be a string');
    var C = u.toUpperCase(),
      E = module213;
    return (
      <E
        accessibilityLabel={o}
        accessibilityRole="button"
        accessibilityStates={k}
        hasTVPreferredFocus={l}
        nextFocusDown={f}
        nextFocusForward={p}
        nextFocusLeft={D}
        nextFocusRight={F}
        nextFocusUp={P}
        testID={w}
        disabled={j}
        onPress={c}
        touchSoundDisabled={s}
      >
        <module84 style={R}>
          <module198 style={S} disabled={j}>
            {C}
          </module198>
        </module84>
      </E>
    );
  }
}

module.exports = D;
