var module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = y(require('react')),
  module12 = require('./12'),
  module1067 = y(require('./1067'));

function h(t) {
  if ('function' != typeof WeakMap) return null;
  var o = new WeakMap(),
    l = new WeakMap();
  return (h = function (t) {
    return t ? l : o;
  })(t);
}

function y(t, o) {
  if (!o && t && t.__esModule) return t;
  if (null === t || ('object' != typeof t && 'function' != typeof t))
    return {
      default: t,
    };
  var l = h(o);
  if (l && l.has(t)) return l.get(t);
  var n = {},
    f = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var c in t)
    if ('default' !== c && Object.prototype.hasOwnProperty.call(t, c)) {
      var u = f ? Object.getOwnPropertyDescriptor(t, c) : null;
      if (u && (u.get || u.set)) Object.defineProperty(n, c, u);
      else n[c] = t[c];
    }

  n.default = t;
  if (l) l.set(t, n);
  return n;
}

function s() {
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

function v(t) {
  var o = t.toLowerCase(),
    l = [];

  if (o && /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(o)) {
    if (4 === o.length) {
      for (var n = '#', f = 1; f < 4; f += 1) n += o.slice(f, f + 1).concat(o.slice(f, f + 1));

      o = n;
    }

    for (var c = 1; c < 7; c += 2) l.push(parseInt('0x' + o.slice(c, c + 2)));

    return l;
  }

  throw Error('Invalid Color!');
}

var x = (function (t, ...args) {
  module7.default(E, t);

  var h = E,
    y = s(),
    x = function () {
      var t,
        o = module11.default(h);

      if (y) {
        var l = module11.default(this).constructor;
        t = Reflect.construct(o, arguments, l);
      } else t = o.apply(this, arguments);

      return module9.default(this, t);
    };

  function E() {
    var t;
    module4.default(this, E);

    (t = x.call(this, ...args)).render = function () {
      var o = t.props,
        l = o.setting,
        n = l.width,
        f = undefined === n ? 0 : n,
        h = l.height,
        y = undefined === h ? 0 : h,
        s = l.color,
        x = undefined === s ? '#000' : s,
        E = l.border,
        b = undefined === E ? 0 : E,
        R = l.radius,
        w = undefined === R ? 0 : R,
        O = l.opacity,
        B = undefined === O ? 1 : O,
        P = l.x,
        q = undefined === P ? 0 : P,
        L = l.y,
        M = undefined === L ? 0 : L,
        k = l.style,
        C = undefined === k ? {} : k,
        G = o.children,
        j = b,
        S = f - 2 * w,
        _ = y - 2 * w,
        z = v(x),
        A = function (t) {
          return [
            React.default.createElement(module1067.Stop, {
              offset: '0',
              stopColor: x,
              stopOpacity: B,
              key: t + 'Linear0',
            }),
            React.default.createElement(module1067.Stop, {
              offset: '1',
              stopColor: x,
              stopOpacity: '0',
              key: t + 'Linear1',
            }),
          ];
        },
        D = function (t) {
          return [
            React.default.createElement(module1067.Stop, {
              offset: '0',
              stopColor: x,
              stopOpacity: B,
              key: t + 'Radial0',
            }),
            React.default.createElement(module1067.Stop, {
              offset: (w / (j + w)).toString(),
              stopColor: x,
              stopOpacity: B,
              key: t + 'Radial1',
            }),
            React.default.createElement(module1067.Stop, {
              offset: '1',
              stopColor: x,
              stopOpacity: '0',
              key: t + 'Radial2',
            }),
          ];
        },
        T = j + w;

      return React.default.createElement(
        module12.View,
        {
          style: [
            {
              position: 'relative',
              width: f,
              height: y,
            },
            C,
          ],
        },
        React.default.createElement(
          module1067.default,
          {
            height: y + 2 * j + 2 * w,
            width: f + 2 * j + 2 * w,
            style: {
              position: 'absolute',
              top: M - j,
              left: q - j,
            },
          },
          React.default.createElement(
            module1067.Defs,
            null,
            React.default.createElement(
              module1067.LinearGradient,
              {
                id: 'top',
                x1: '0%',
                x2: '0%',
                y1: '100%',
                y2: '0%',
              },
              A('BoxTop')
            ),
            React.default.createElement(
              module1067.LinearGradient,
              {
                id: 'bottom',
                x1: '0%',
                x2: '0%',
                y1: '0%',
                y2: '100%',
              },
              A('BoxBottom')
            ),
            React.default.createElement(
              module1067.LinearGradient,
              {
                id: 'left',
                x1: '100%',
                y1: '0%',
                x2: '0%',
                y2: '0%',
              },
              A('BoxLeft')
            ),
            React.default.createElement(
              module1067.LinearGradient,
              {
                id: 'right',
                x1: '0%',
                y1: '0%',
                x2: '100%',
                y2: '0%',
              },
              A('BoxRight')
            ),
            React.default.createElement(
              module1067.RadialGradient,
              {
                id: 'border-left-top',
                r: '100%',
                cx: '100%',
                cy: '100%',
                fx: '100%',
                fy: '100%',
              },
              D('BoxLeftTop')
            ),
            React.default.createElement(
              module1067.RadialGradient,
              {
                id: 'border-left-bottom',
                r: '100%',
                cx: '100%',
                cy: '0%',
                fx: '100%',
                fy: '0%',
              },
              D('BoxLeftBottom')
            ),
            React.default.createElement(
              module1067.RadialGradient,
              {
                id: 'border-right-top',
                r: '100%',
                cx: '0%',
                cy: '100%',
                fx: '0%',
                fy: '100%',
              },
              D('BoxRightTop')
            ),
            React.default.createElement(
              module1067.RadialGradient,
              {
                id: 'border-right-bottom',
                r: '100%',
                cx: '0%',
                cy: '0%',
                fx: '0%',
                fy: '0%',
              },
              D('BoxRightBottom')
            )
          ),
          React.default.createElement(module1067.Path, {
            d: 'M 0 ' + T + ',Q 0 0 ' + T + ' 0,v ' + j + ',q ' + -w + ' 0 ' + -w + ' ' + w + ',h ' + -j + ',z',
            fill: 'url(#border-left-top)',
          }),
          React.default.createElement(module1067.Path, {
            d: 'M ' + (S + j + w) + ' 0,q ' + T + ' 0 ' + T + ' ' + T + ',h ' + -j + ',q 0 ' + -w + ' ' + -w + ' ' + -w + ',v ' + -j + ',z',
            fill: 'url(#border-right-top)',
          }),
          React.default.createElement(module1067.Path, {
            d: 'M ' + (S + j + 2 * w) + ' ' + (_ + j + w) + ',h ' + j + ',q 0 ' + T + ' -' + T + ' ' + T + ',v ' + -j + ',q ' + w + ' 0 ' + w + ' ' + -w + ',z',
            fill: 'url(#border-right-bottom)',
          }),
          React.default.createElement(module1067.Path, {
            d: 'M 0 ' + (_ + j + w) + ',q 0 ' + T + ' ' + T + ' ' + T + ',v ' + -j + ',q ' + -w + ' 0 ' + -w + ' ' + -w + ',h ' + -j + ',z',
            fill: 'url(#border-left-bottom)',
          }),
          React.default.createElement(module1067.Rect, {
            x: T,
            y: '0',
            width: S,
            height: j,
            fill: 'url(#top)',
          }),
          React.default.createElement(module1067.Rect, {
            x: '0',
            y: T,
            width: j,
            height: _,
            fill: 'url(#left)',
          }),
          React.default.createElement(module1067.Rect, {
            x: S + j + 2 * w,
            y: T,
            width: j,
            height: _,
            fill: 'url(#right)',
          }),
          React.default.createElement(module1067.Rect, {
            x: T,
            y: _ + j + 2 * w,
            width: S,
            height: j,
            fill: 'url(#bottom)',
          }),
          React.default.createElement(module1067.Path, {
            d:
              'M ' +
              T +
              ' ' +
              j +
              ',h ' +
              S +
              ',q ' +
              w +
              ' 0 ' +
              w +
              ' ' +
              w +
              ',v ' +
              _ +
              ',q 0 ' +
              w +
              ' -' +
              w +
              ' ' +
              w +
              ',h -' +
              S +
              ',q -' +
              w +
              ' 0 -' +
              w +
              ' -' +
              w +
              ',v -' +
              _ +
              ',q 0 -' +
              w +
              ' ' +
              w +
              ' -' +
              w,
            fill: 'rgba(' + z[0] + ',' + z[1] + ',' + z[2] + ',' + (B || 1) + ')',
          })
        ),
        G
      );
    };

    return t;
  }

  return E;
})(React.Component);

exports.default = x;
