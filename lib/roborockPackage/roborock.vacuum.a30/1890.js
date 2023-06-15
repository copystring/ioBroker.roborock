var module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12');

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

var module1265 = require('./1265'),
  p = (function (t) {
    module7.default(b, t);

    var n = b,
      module1265 = v(),
      p = function () {
        var t,
          u = module11.default(n);

        if (module1265) {
          var l = module11.default(this).constructor;
          t = Reflect.construct(u, arguments, l);
        } else t = u.apply(this, arguments);

        return module9.default(this, t);
      };

    function b(t) {
      var n;
      module4.default(this, b);
      (n = p.call(this, t)).state = {
        visible: false,
      };
      return n;
    }

    module5.default(b, [
      {
        key: 'render',
        value: function () {
          return this.state.visible
            ? React.default.createElement(module12.View, {
                style: w.container,
              })
            : React.default.createElement(module12.View, null);
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
var w = module12.StyleSheet.create({
  container: {
    width: module12.Dimensions.get('window').width,
    height: 44 + module1265.StatusBarHeight + module1265.AppBarMarginTop,
    backgroundColor: 'white',
  },
});
