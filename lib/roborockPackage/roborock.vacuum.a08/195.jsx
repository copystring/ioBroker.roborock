var module49 = require('./49'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11');

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
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (t) {
    return false;
  }
}

require('./51');

require('./217');

var React = require('react'),
  module60 = require('./60'),
  module196 = require('./196'),
  module211 = require('./211'),
  module83 = require('./83'),
  module13 = require('./13'),
  v = (function (t) {
    module7(D, t);

    var l = D,
      module60 = f(),
      v = function () {
        var t,
          o = module11(l);

        if (module60) {
          var n = module11(this).constructor;
          t = Reflect.construct(o, arguments, n);
        } else t = o.apply(this, arguments);

        return module9(this, t);
      };

    function D() {
      module4(this, D);
      return v.apply(this, arguments);
    }

    module5(D, [
      {
        key: 'render',
        value: function () {
          var t = this.props,
            o = t.accessibilityLabel,
            n = t.color,
            c = t.onPress,
            s = t.touchSoundDisabled,
            u = t.title,
            l = t.hasTVPreferredFocus,
            f = t.nextFocusDown,
            p = t.nextFocusForward,
            v = t.nextFocusLeft,
            D = t.nextFocusRight,
            P = t.nextFocusUp,
            j = t.disabled,
            w = t.testID,
            R = [F.button],
            k = [F.text];
          if (n)
            R.push({
              backgroundColor: n,
            });
          var C = [];

          if (j) {
            R.push(F.buttonDisabled);
            k.push(F.textDisabled);
            C.push('disabled');
          }

          module13('string' == typeof u, 'The title prop of a Button must be a string');
          var E = u.toUpperCase(),
            S = module211;
          return (
            <S
              accessibilityLabel={o}
              accessibilityRole="button"
              accessibilityStates={C}
              hasTVPreferredFocus={l}
              nextFocusDown={f}
              nextFocusForward={p}
              nextFocusLeft={v}
              nextFocusRight={D}
              nextFocusUp={P}
              testID={w}
              disabled={j}
              onPress={c}
              touchSoundDisabled={s}
            >
              <module83 style={R}>
                <module196 style={k} disabled={j}>
                  {E}
                </module196>
              </module83>
            </S>
          );
        },
      },
    ]);
    return D;
  })(React.Component),
  F = module60.create({
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
            module49(o, n, c[n]);
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

module.exports = v;
