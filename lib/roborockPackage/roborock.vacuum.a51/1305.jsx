var module22 = require('./22'),
  module56 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1242 = require('./1242');

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
  module9.default(R, t);

  var n = R,
    S = b(),
    E = function () {
      var t,
        l = module12.default(n);

      if (S) {
        var c = module12.default(this).constructor;
        t = Reflect.construct(l, arguments, c);
      } else t = l.apply(this, arguments);

      return module11.default(this, t);
    };

  function R() {
    module6.default(this, R);
    return E.apply(this, arguments);
  }

  module7.default(R, [
    {
      key: 'render',
      value: function () {
        if (module1242.screensEnabled()) {
          var t = this.props,
            n = t.isVisible,
            u = module56.default(t, ['isVisible']);
          return <module1242.Screen />;
        }

        var f = this.props,
          o = f.isVisible,
          s = f.children,
          p = f.style,
          b = module56.default(f, ['isVisible', 'children', 'style']);
        return (
          <module13.View>
            <module13.View style={o ? V.attached : V.detached}>{s}</module13.View>
          </module13.View>
        );
      },
    },
  ]);
  return R;
})(React.Component);

exports.default = S;
var V = module13.StyleSheet.create({
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
