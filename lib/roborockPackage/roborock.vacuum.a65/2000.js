var module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1200 = require('./1200');

function R() {
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

var y = (function (t) {
  module9.default(v, t);

  var o = v,
    module1200 = R(),
    y = function () {
      var t,
        n = module12.default(o);

      if (module1200) {
        var u = module12.default(this).constructor;
        t = Reflect.construct(n, arguments, u);
      } else t = n.apply(this, arguments);

      return module11.default(this, t);
    };

  function v(t) {
    var o;
    module6.default(this, v);
    (o = y.call(this, t)).state = {};
    return o;
  }

  module7.default(v, [
    {
      key: 'render',
      value: function () {
        this.context.theme;
        var t = this.props.value;
        return React.default.createElement(
          module13.View,
          {
            style: [b.container, this.props.style],
          },
          React.default.createElement(
            module13.View,
            {
              style: [
                b.trackContainer,
                {
                  backgroundColor: this.props.maximumTrackTintColor,
                },
              ],
            },
            React.default.createElement(module13.View, {
              style: [
                b.track,
                {
                  flex: globals.isRTL ? 0 : t,
                  backgroundColor: this.props.minimumTrackTintColor,
                },
              ],
            }),
            React.default.createElement(module13.View, {
              style: [
                globals.isRTL ? b.boderRadiusLeft : b.boderRadiusRight,
                {
                  flex: 1 - t,
                },
              ],
            }),
            React.default.createElement(module13.View, {
              style: [
                b.track,
                {
                  flex: globals.isRTL ? t : 0,
                  backgroundColor: this.props.minimumTrackTintColor,
                },
              ],
            })
          )
        );
      },
    },
  ]);
  return v;
})(React.Component);

exports.default = y;
y.contextType = module1200.AppConfigContext;
var b = module13.StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    flexDirection: 'row',
  },
  trackContainer: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    flexDirection: 'row',
  },
  track: {
    height: 4,
    borderRadius: 2,
  },
  boderRadiusLeft: {
    height: 4,
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
  },
  boderRadiusRight: {
    height: 4,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
  },
});
