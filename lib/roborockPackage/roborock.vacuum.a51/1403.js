var module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1344 = require('./1344');

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

function y(t) {
  var l = t.toLowerCase(),
    o = [];

  if (l && /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(l)) {
    if (4 === l.length) {
      for (var f = '#', n = 1; n < 4; n += 1) f += l.slice(n, n + 1).concat(l.slice(n, n + 1));

      l = f;
    }

    for (var c = 1; c < 7; c += 2) o.push(parseInt('0x' + l.slice(c, c + 2)));

    return o;
  }

  throw Error('Invalid Color!');
}

var v = (function (t, ...args) {
  module9.default(E, t);

  var l = E,
    v = s(),
    x = function () {
      var t,
        o = module12.default(l);

      if (v) {
        var f = module12.default(this).constructor;
        t = Reflect.construct(o, arguments, f);
      } else t = o.apply(this, arguments);

      return module11.default(this, t);
    };

  function E() {
    var t;
    module6.default(this, E);

    (t = x.call(this, ...args)).render = function () {
      var l = t.props,
        o = l.setting,
        f = o.width,
        n = undefined === f ? 0 : f,
        c = o.height,
        s = undefined === c ? 0 : c,
        v = o.color,
        x = undefined === v ? '#000' : v,
        E = o.border,
        R = undefined === E ? 0 : E,
        b = o.radius,
        q = undefined === b ? 0 : b,
        w = o.opacity,
        B = undefined === w ? 1 : w,
        L = o.x,
        C = undefined === L ? 0 : L,
        G = o.y,
        P = undefined === G ? 0 : G,
        S = o.style,
        M = undefined === S ? {} : S,
        O = l.children,
        k = R,
        z = n - 2 * q,
        _ = s - 2 * q,
        A = y(x),
        D = function (t) {
          return [
            React.default.createElement(module1344.Stop, {
              offset: '0',
              stopColor: x,
              stopOpacity: B,
              key: t + 'Linear0',
            }),
            React.default.createElement(module1344.Stop, {
              offset: '1',
              stopColor: x,
              stopOpacity: '0',
              key: t + 'Linear1',
            }),
          ];
        },
        T = function (t) {
          return [
            React.default.createElement(module1344.Stop, {
              offset: '0',
              stopColor: x,
              stopOpacity: B,
              key: t + 'Radial0',
            }),
            React.default.createElement(module1344.Stop, {
              offset: (q / (k + q)).toString(),
              stopColor: x,
              stopOpacity: B,
              key: t + 'Radial1',
            }),
            React.default.createElement(module1344.Stop, {
              offset: '1',
              stopColor: x,
              stopOpacity: '0',
              key: t + 'Radial2',
            }),
          ];
        },
        I = k + q;

      return React.default.createElement(
        module13.View,
        {
          style: [
            {
              position: 'relative',
              width: n,
              height: s,
            },
            M,
          ],
        },
        React.default.createElement(
          module1344.default,
          {
            height: s + 2 * k + 2 * q,
            width: n + 2 * k + 2 * q,
            style: {
              position: 'absolute',
              top: P - k,
              left: C - k,
            },
          },
          React.default.createElement(
            module1344.Defs,
            null,
            React.default.createElement(
              module1344.LinearGradient,
              {
                id: 'top',
                x1: '0%',
                x2: '0%',
                y1: '100%',
                y2: '0%',
              },
              D('BoxTop')
            ),
            React.default.createElement(
              module1344.LinearGradient,
              {
                id: 'bottom',
                x1: '0%',
                x2: '0%',
                y1: '0%',
                y2: '100%',
              },
              D('BoxBottom')
            ),
            React.default.createElement(
              module1344.LinearGradient,
              {
                id: 'left',
                x1: '100%',
                y1: '0%',
                x2: '0%',
                y2: '0%',
              },
              D('BoxLeft')
            ),
            React.default.createElement(
              module1344.LinearGradient,
              {
                id: 'right',
                x1: '0%',
                y1: '0%',
                x2: '100%',
                y2: '0%',
              },
              D('BoxRight')
            ),
            React.default.createElement(
              module1344.RadialGradient,
              {
                id: 'border-left-top',
                r: '100%',
                cx: '100%',
                cy: '100%',
                fx: '100%',
                fy: '100%',
              },
              T('BoxLeftTop')
            ),
            React.default.createElement(
              module1344.RadialGradient,
              {
                id: 'border-left-bottom',
                r: '100%',
                cx: '100%',
                cy: '0%',
                fx: '100%',
                fy: '0%',
              },
              T('BoxLeftBottom')
            ),
            React.default.createElement(
              module1344.RadialGradient,
              {
                id: 'border-right-top',
                r: '100%',
                cx: '0%',
                cy: '100%',
                fx: '0%',
                fy: '100%',
              },
              T('BoxRightTop')
            ),
            React.default.createElement(
              module1344.RadialGradient,
              {
                id: 'border-right-bottom',
                r: '100%',
                cx: '0%',
                cy: '0%',
                fx: '0%',
                fy: '0%',
              },
              T('BoxRightBottom')
            )
          ),
          React.default.createElement(module1344.Path, {
            d: 'M 0 ' + I + ',Q 0 0 ' + I + ' 0,v ' + k + ',q ' + -q + ' 0 ' + -q + ' ' + q + ',h ' + -k + ',z',
            fill: 'url(#border-left-top)',
          }),
          React.default.createElement(module1344.Path, {
            d: 'M ' + (z + k + q) + ' 0,q ' + I + ' 0 ' + I + ' ' + I + ',h ' + -k + ',q 0 ' + -q + ' ' + -q + ' ' + -q + ',v ' + -k + ',z',
            fill: 'url(#border-right-top)',
          }),
          React.default.createElement(module1344.Path, {
            d: 'M ' + (z + k + 2 * q) + ' ' + (_ + k + q) + ',h ' + k + ',q 0 ' + I + ' -' + I + ' ' + I + ',v ' + -k + ',q ' + q + ' 0 ' + q + ' ' + -q + ',z',
            fill: 'url(#border-right-bottom)',
          }),
          React.default.createElement(module1344.Path, {
            d: 'M 0 ' + (_ + k + q) + ',q 0 ' + I + ' ' + I + ' ' + I + ',v ' + -k + ',q ' + -q + ' 0 ' + -q + ' ' + -q + ',h ' + -k + ',z',
            fill: 'url(#border-left-bottom)',
          }),
          React.default.createElement(module1344.Rect, {
            x: I,
            y: '0',
            width: z,
            height: k,
            fill: 'url(#top)',
          }),
          React.default.createElement(module1344.Rect, {
            x: '0',
            y: I,
            width: k,
            height: _,
            fill: 'url(#left)',
          }),
          React.default.createElement(module1344.Rect, {
            x: z + k + 2 * q,
            y: I,
            width: k,
            height: _,
            fill: 'url(#right)',
          }),
          React.default.createElement(module1344.Rect, {
            x: I,
            y: _ + k + 2 * q,
            width: z,
            height: k,
            fill: 'url(#bottom)',
          }),
          React.default.createElement(module1344.Path, {
            d:
              'M ' +
              I +
              ' ' +
              k +
              ',h ' +
              z +
              ',q ' +
              q +
              ' 0 ' +
              q +
              ' ' +
              q +
              ',v ' +
              _ +
              ',q 0 ' +
              q +
              ' -' +
              q +
              ' ' +
              q +
              ',h -' +
              z +
              ',q -' +
              q +
              ' 0 -' +
              q +
              ' -' +
              q +
              ',v -' +
              _ +
              ',q 0 -' +
              q +
              ' ' +
              q +
              ' -' +
              q,
            fill: 'rgba(' + A[0] + ',' + A[1] + ',' + A[2] + ',' + (B || 1) + ')',
          })
        ),
        O
      );
    };

    return t;
  }

  return E;
})(React.Component);

exports.default = v;
