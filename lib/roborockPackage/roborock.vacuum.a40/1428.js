var module22 = require('./22'),
  module56 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react');

function v() {
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

var module1429 = require('./1429'),
  R = (function (t, ...args) {
    module7.default(S, t);

    var R = S,
      w = v(),
      _ = function () {
        var t,
          n = module11.default(R);

        if (w) {
          var l = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, l);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function S() {
      var t;
      module4.default(this, S);
      (t = _.call(this, ...args))._viewRef = null;

      t._captureRef = function (n) {
        t._viewRef = n;
      };

      return t;
    }

    module5.default(S, [
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
            s = module56.default(t, ['children', 'style', 'imageStyle', 'imageRef']);
          return React.default.createElement(
            module12.View,
            {
              accessibilityIgnoresInvertColors: true,
              style: u,
              ref: this._captureRef,
            },
            React.default.createElement(
              module1429,
              module22.default({}, s, {
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
    return S;
  })(React.default.Component);

module.exports = R;
