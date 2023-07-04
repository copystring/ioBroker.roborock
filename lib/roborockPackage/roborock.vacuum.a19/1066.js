exports.default = function (t, n) {
  var O, b;

  b = O = (function (y) {
    module7.default(P, y);

    var O = P,
      b = w(),
      j = function () {
        var t,
          n = module11.default(O);

        if (b) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function P(t) {
      var n;
      module4.default(this, P);
      (n = j.call(this, t)).state = {
        contentWidth: 0,
        contentHeight: 0,
      };
      n.hasLayout = false;
      return n;
    }

    module5.default(P, [
      {
        key: '_onLayout',
        value: function (t) {
          var n = t.width,
            o = t.height;
          console.log('ShadowTab layout', n, o);

          if (n > 0 && o > 0 && !this.hasLayout) {
            this.hasLayout = true;
            this.setState({
              contentWidth: n,
              contentHeight: o,
            });
          }
        },
      },
      {
        key: 'render',
        value: function () {
          var c = this,
            u = this.context.theme,
            f = module21.default({}, this.props);
          console.log('ShadowTab render', this.state.contentWidth, this.state.contentHeight);
          var s = v(
              v(
                {
                  width: this.state.contentWidth,
                  height: this.state.contentHeight,
                },
                n
              ),
              {},
              {
                color: u.shadowColor,
              },
              u.shadowConfig
            ),
            l = React.default.createElement(
              t,
              module21.default({}, f, {
                onLayout: this._onLayout.bind(this),
                ref: function (t) {
                  return (c.contentView = t);
                },
              })
            ),
            y = React.default.createElement(
              module1067.BoxShadow,
              {
                setting: s,
              },
              l
            );
          return this.state.contentWidth > 0 && this.state.contentHeight > 0 ? y : l;
        },
      },
    ]);
    return P;
  })(React.default.Component);

  O.contextType = module506.AppConfigContext;
  return b;
};

require('./12');

var module49 = require('./49'),
  module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = (function (t, n) {
    if (!n && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var o = O(n);
    if (o && o.has(t)) return o.get(t);
    var c = {},
      u = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var f in t)
      if ('default' !== f && Object.prototype.hasOwnProperty.call(t, f)) {
        var s = u ? Object.getOwnPropertyDescriptor(t, f) : null;
        if (s && (s.get || s.set)) Object.defineProperty(c, f, s);
        else c[f] = t[f];
      }

    c.default = t;
    if (o) o.set(t, c);
    return c;
  })(require('react')),
  module1067 = require('./1067'),
  module506 = require('./506');

function O(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (O = function (t) {
    return t ? o : n;
  })(t);
}

function b(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var c = Object.getOwnPropertySymbols(t);
    if (n)
      c = c.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, c);
  }

  return o;
}

function v(t) {
  for (var o = 1; o < arguments.length; o++) {
    var c = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      b(Object(c), true).forEach(function (o) {
        module49.default(t, o, c[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(c));
    else
      b(Object(c)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(c, n));
      });
  }

  return t;
}

function w() {
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
