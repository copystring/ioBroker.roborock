var module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1163 = require('./1163');

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

var v = (function (t, ...args) {
  module7.default(b, t);

  var o = b,
    v = h(),
    E = function () {
      var t,
        n = module11.default(o);

      if (v) {
        var l = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, l);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function b() {
    var t;
    module4.default(this, b);

    (t = E.call(this, ...args)).render = function () {
      var o = t.props,
        l = o.setting,
        u = l.side,
        c = undefined === u ? 'bottom' : u,
        f = l.width,
        h = undefined === f ? 0 : f,
        v = l.color,
        E = undefined === v ? '#000' : v,
        b = l.border,
        w = undefined === b ? 0 : b,
        x = l.opacity,
        R = undefined === x ? 1 : x,
        B = l.inset,
        L = undefined !== B && B,
        D = l.style,
        G = undefined === D ? {} : D,
        S = o.children,
        _ = function (t) {
          return [
            React.default.createElement(module1163.Stop, {
              offset: '0',
              stopColor: E,
              stopOpacity: R,
              key: t + 'Linear0',
            }),
            React.default.createElement(module1163.Stop, {
              offset: '1',
              stopColor: E,
              stopOpacity: '0',
              key: t + 'Linear1',
            }),
          ];
        },
        C = w;

      return React.default.createElement(
        module12.View,
        {
          style: [
            {
              position: 'relative',
              width: h,
            },
            G,
          ],
        },
        (function () {
          switch (c) {
            case 'top':
              return [
                React.default.createElement(
                  module1163.default,
                  {
                    height: C,
                    width: h + C,
                    style: {
                      position: 'absolute',
                      top: L ? 0 : -C,
                    },
                  },
                  React.default.createElement(
                    module1163.Defs,
                    null,
                    React.default.createElement(
                      module1163.LinearGradient,
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
                      module1163.LinearGradient,
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
                  React.default.createElement(module1163.Rect, {
                    x: 0,
                    y: 0,
                    width: h,
                    height: C,
                    fill: 'url(#top' + (L ? '-inset' : '') + ')',
                  })
                ),
              ].concat(module31.default(S));

            case 'bottom':
              return [].concat(module31.default(S), [
                React.default.createElement(
                  module1163.default,
                  {
                    height: C,
                    width: h + C,
                    style: {
                      position: 'absolute',
                      bottom: L ? -C : 0,
                    },
                  },
                  React.default.createElement(
                    module1163.Defs,
                    null,
                    React.default.createElement(
                      module1163.LinearGradient,
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
                      module1163.LinearGradient,
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
                  React.default.createElement(module1163.Rect, {
                    x: 0,
                    y: 0,
                    width: h,
                    height: C,
                    fill: 'url(#bottom' + (L ? '-inset' : '') + ')',
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

  return b;
})(React.Component);

exports.default = v;
