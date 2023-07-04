var module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13');

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

var module1343 = require('./1343'),
  p = (function (t) {
    module9.default(b, t);

    var n = b,
      module1343 = v(),
      p = function () {
        var t,
          u = module12.default(n);

        if (module1343) {
          var l = module12.default(this).constructor;
          t = Reflect.construct(u, arguments, l);
        } else t = u.apply(this, arguments);

        return module11.default(this, t);
      };

    function b(t) {
      var n;
      module6.default(this, b);
      (n = p.call(this, t)).state = {
        visible: false,
      };
      return n;
    }

    module7.default(b, [
      {
        key: 'render',
        value: function () {
          return this.state.visible
            ? React.default.createElement(module13.View, {
                style: w.container,
              })
            : React.default.createElement(module13.View, null);
        },
      },
      {
        key: 'show',
        value: function () {
          this.setState({
            visible: true,
          });
        },
      },
      {
        key: 'dismiss',
        value: function () {
          this.setState({
            visible: false,
          });
        },
      },
    ]);
    return b;
  })(React.default.PureComponent);

exports.default = p;
var w = module13.StyleSheet.create({
  container: {
    width: module13.Dimensions.get('window').width,
    height: 44 + module1343.StatusBarHeight + module1343.AppBarMarginTop,
    backgroundColor: 'white',
  },
});
