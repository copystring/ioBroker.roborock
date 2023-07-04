var module21 = require('./21'),
  module55 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  y = ['children', 'style', 'imageStyle', 'imageRef'];

function p() {
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

var module1266 = require('./1266'),
  w = (function (t, ...args) {
    module7.default(P, t);

    var w = P,
      _ = p(),
      S = function () {
        var t,
          n = module11.default(w);

        if (_) {
          var l = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, l);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function P() {
      var t;
      module4.default(this, P);
      (t = S.call(this, ...args))._viewRef = null;

      t._captureRef = function (n) {
        t._viewRef = n;
      };

      return t;
    }

    module5.default(P, [
      {
        key: 'setNativeProps',
        value: function (t) {
          var n = this._viewRef;
          if (n) n.setNativeProps(t);
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this.props,
            f = t.children,
            u = t.style,
            c = t.imageStyle,
            o = t.imageRef,
            s = module55.default(t, y);
          return React.default.createElement(
            module12.View,
            {
              accessibilityIgnoresInvertColors: true,
              style: u,
              ref: this._captureRef,
            },
            React.default.createElement(
              module1266,
              module21.default({}, s, {
                style: [
                  module12.StyleSheet.absoluteFill,
                  {
                    width: u.width,
                    height: u.height,
                  },
                  c,
                ],
                ref: o,
              })
            ),
            f
          );
        },
      },
    ]);
    return P;
  })(React.default.Component);

module.exports = w;
