var module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1203 = require('./1203');

require('./385');

function y() {
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

var module510 = require('./510').strings,
  module1933 = (function (t) {
    module9.default(R, t);

    var n = R,
      module1933 = y(),
      _ = function () {
        var t,
          o = module12.default(n);

        if (module1933) {
          var l = module12.default(this).constructor;
          t = Reflect.construct(o, arguments, l);
        } else t = o.apply(this, arguments);

        return module11.default(this, t);
      };

    function R(t) {
      module6.default(this, R);
      return _.call(this, t);
    }

    module7.default(R, [
      {
        key: 'componentDidMount',
        value: function () {
          if (this.lottieView) this.lottieView.play();
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this;
          return React.default.createElement(
            module13.View,
            {
              style: [b.containter, this.props.style],
            },
            React.default.createElement(module1203.default, {
              ref: function (n) {
                return (t.lottieView = n);
              },
              style: [b.lottieView],
              source: require('./1933'),
            }),
            React.default.createElement(
              module13.Text,
              {
                style: b.desc,
              },
              module510.cleaning_in_exploration_mode_tip
            )
          );
        },
      },
    ]);
    return R;
  })(React.Component);

exports.default = module1933;
module1933.defaultProps = {};
var b = module13.StyleSheet.create({
  containter: {
    alignSelf: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    height: 37,
    borderRadius: 18.5,
    marginBottom: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  lottieView: {
    marginTop: 1,
    width: 48,
    height: 33.6,
  },
  desc: {
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
  },
  cancelButton: {
    borderColor: 'rgba(0,0,0,0.3)',
    borderWidth: 0.4,
    marginTop: 20,
    width: 100,
    height: 40,
    borderRadius: 8,
  },
});
