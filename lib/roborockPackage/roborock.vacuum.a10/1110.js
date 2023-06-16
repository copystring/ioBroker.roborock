var module30 = require('./30'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = h(require('react')),
  module12 = require('./12'),
  module1067 = h(require('./1067'));

function y(t) {
  if ('function' != typeof WeakMap) return null;
  var o = new WeakMap(),
    n = new WeakMap();
  return (y = function (t) {
    return t ? n : o;
  })(t);
}

function h(t, o) {
  if (!o && t && t.__esModule) return t;
  if (null === t || ('object' != typeof t && 'function' != typeof t))
    return {
      default: t,
    };
  var n = y(o);
  if (n && n.has(t)) return n.get(t);
  var l = {},
    u = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var f in t)
    if ('default' !== f && Object.prototype.hasOwnProperty.call(t, f)) {
      var c = u ? Object.getOwnPropertyDescriptor(t, f) : null;
      if (c && (c.get || c.set)) Object.defineProperty(l, f, c);
      else l[f] = t[f];
    }

  l.default = t;
  if (n) n.set(t, l);
  return l;
}

function v() {
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

var b = (function (t, ...args) {
  module7.default(w, t);

  var y = w,
    h = v(),
    b = function () {
      var t,
        o = module11.default(y);

      if (h) {
        var n = module11.default(this).constructor;
        t = Reflect.construct(o, arguments, n);
      } else t = o.apply(this, arguments);

      return module9.default(this, t);
    };

  function w() {
    var t;
    module4.default(this, w);

    (t = b.call(this, ...args)).render = function () {
      var n = t.props,
        l = n.setting,
        u = l.side,
        f = undefined === u ? 'bottom' : u,
        y = l.width,
        h = undefined === y ? 0 : y,
        v = l.color,
        b = undefined === v ? '#000' : v,
        w = l.border,
        E = undefined === w ? 0 : w,
        O = l.opacity,
        x = undefined === O ? 1 : O,
        j = l.inset,
        B = undefined !== j && j,
        P = l.style,
        R = undefined === P ? {} : P,
        L = n.children,
        _ = function (t) {
          return [
            React.default.createElement(module1067.Stop, {
              offset: '0',
              stopColor: b,
              stopOpacity: x,
              key: t + 'Linear0',
            }),
            React.default.createElement(module1067.Stop, {
              offset: '1',
              stopColor: b,
              stopOpacity: '0',
              key: t + 'Linear1',
            }),
          ];
        },
        k = E;

      return React.default.createElement(
        module12.View,
        {
          style: [
            {
              position: 'relative',
              width: h,
            },
            R,
          ],
        },
        (function () {
          switch (f) {
            case 'top':
              return [
                React.default.createElement(
                  module1067.default,
                  {
                    height: k,
                    width: h + k,
                    style: {
                      position: 'absolute',
                      top: B ? 0 : -k,
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
                      _('BorderTop')
                    ),
                    React.default.createElement(
                      module1067.LinearGradient,
                      {
                        id: 'top-inset',
                        x1: '0%',
                        x2: '0%',
                        y1: '0%',
                        y2: '100%',
                      },
                      _('BorderTopInset')
                    )
                  ),
                  React.default.createElement(module1067.Rect, {
                    x: 0,
                    y: 0,
                    width: h,
                    height: k,
                    fill: 'url(#top' + (B ? '-inset' : '') + ')',
                  })
                ),
              ].concat(module30.default(L));

            case 'bottom':
              return [].concat(module30.default(L), [
                React.default.createElement(
                  module1067.default,
                  {
                    height: k,
                    width: h + k,
                    style: {
                      position: 'absolute',
                      bottom: B ? -k : 0,
                    },
                  },
                  React.default.createElement(
                    module1067.Defs,
                    null,
                    React.default.createElement(
                      module1067.LinearGradient,
                      {
                        id: 'bottom',
                        x1: '0%',
                        x2: '0%',
                        y1: '0%',
                        y2: '100%',
                      },
                      _('BorderBottom')
                    ),
                    React.default.createElement(
                      module1067.LinearGradient,
                      {
                        id: 'bottom-inset',
                        x1: '0%',
                        x2: '0%',
                        y1: '100%',
                        y2: '0%',
                      },
                      _('BorderBottomInset')
                    )
                  ),
                  React.default.createElement(module1067.Rect, {
                    x: 0,
                    y: 0,
                    width: h,
                    height: k,
                    fill: 'url(#bottom' + (B ? '-inset' : '') + ')',
                  })
                ),
              ]);

            default:
              throw new Error("Wrong Type of Side! We just support 'top' and 'bottom'");
          }
        })()
      );
    };

    return t;
  }

  return w;
})(React.Component);

exports.default = b;
