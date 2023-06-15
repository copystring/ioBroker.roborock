var module21 = require('./21'),
  module55 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  s = ['children', 'style', 'imageStyle', 'imageRef'];

function h() {
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

var module271 = require('./271'),
  React = require('react'),
  module60 = require('./60'),
  module83 = require('./83'),
  _ = (function (_, ...args) {
    module7(k, _);

    var w = k,
      P = h(),
      b = function () {
        var t,
          n = module11(w);

        if (P) {
          var c = module11(this).constructor;
          t = Reflect.construct(n, arguments, c);
        } else t = n.apply(this, arguments);

        return module9(this, t);
      };

    function k() {
      var t;
      module4(this, k);
      (t = b.call(this, ...args))._viewRef = null;

      t._captureRef = function (n) {
        t._viewRef = n;
      };

      return t;
    }

    module5(k, [
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
          var c = this.props,
            o = c.children,
            l = c.style,
            f = c.imageStyle,
            u = c.imageRef,
            h = module55(c, s);
          return (
            <module83 accessibilityIgnoresInvertColors style={l} ref={this._captureRef}>
              <module271 />
              {o}
            </module83>
          );
        },
      },
    ]);
    return k;
  })(React.Component);

module.exports = _;
