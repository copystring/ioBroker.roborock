var module22 = require('./22'),
  module56 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1170 = require('./1170');

function b() {
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

var S = (function (t) {
  module7.default(R, t);

  var n = R,
    S = b(),
    E = function () {
      var t,
        l = module11.default(n);

      if (S) {
        var c = module11.default(this).constructor;
        t = Reflect.construct(l, arguments, c);
      } else t = l.apply(this, arguments);

      return module9.default(this, t);
    };

  function R() {
    module4.default(this, R);
    return E.apply(this, arguments);
  }

  module5.default(R, [
    {
      key: 'render',
      value: function () {
        if (module1170.screensEnabled()) {
          var t = this.props,
            n = t.isVisible,
            u = module56.default(t, ['isVisible']);
          return <module1170.Screen />;
        }

        var f = this.props,
          o = f.isVisible,
          s = f.children,
          p = f.style,
          b = module56.default(f, ['isVisible', 'children', 'style']);
        return (
          <module12.View>
            <module12.View style={o ? V.attached : V.detached}>{s}</module12.View>
          </module12.View>
        );
      },
    },
  ]);
  return R;
})(React.Component);

exports.default = S;
var V = module12.StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  attached: {
    flex: 1,
  },
  detached: {
    flex: 1,
    top: 3e3,
  },
});
