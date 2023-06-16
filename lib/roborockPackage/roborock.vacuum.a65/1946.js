var module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1947 = require('./1947');

function w() {
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
  C = 0.6 * module13.Dimensions.get('window').width,
  v = 0.9 * module13.Dimensions.get('window').width,
  module393 = require('./393'),
  _ = (function (t) {
    module9.default(_, t);

    var n = _,
      C = w(),
      v = function () {
        var t,
          o = module12.default(n);

        if (C) {
          var l = module12.default(this).constructor;
          t = Reflect.construct(o, arguments, l);
        } else t = o.apply(this, arguments);

        return module11.default(this, t);
      };

    function _(t) {
      var n;
      module6.default(this, _);
      (n = v.call(this, t)).state = {
        progress: 0,
      };
      return n;
    }

    module7.default(_, [
      {
        key: 'componentWillUnmount',
        value: function () {
          module393.removeFirmwareProcessListener(this.handleProgress.bind(this));
        },
      },
      {
        key: 'componentDidMount',
        value: function () {
          module393.addFirmwareProcessListener(this.handleProgress.bind(this));
        },
      },
      {
        key: 'handleProgress',
        value: function (t) {
          console.log('firmware update', t);
          this.setState({
            progress: 100 ** t.progress,
          });
        },
      },
      {
        key: 'render',
        value: function () {
          return React.default.createElement(
            module13.View,
            {
              style: k.container,
            },
            React.default.createElement(
              module13.View,
              {
                style: k.outterCircle,
              },
              React.default.createElement(
                module13.View,
                {
                  style: k.innerCircle,
                },
                React.default.createElement(module1947.AnimatedCircularProgress, {
                  size: 120,
                  width: 15,
                  fill: this.state.progress,
                  tintColor: 'white',
                  onAnimationComplete: function () {
                    return console.log('onAnimationComplete');
                  },
                  backgroundColor: 'rgba(255,255,255,0.3)',
                })
              )
            ),
            React.default.createElement(
              module13.View,
              {
                style: k.textWrap,
              },
              React.default.createElement(
                module13.Text,
                {
                  style: k.title,
                },
                module510.upgrade_progress_view_title + ' ' + this.state.progress + '%'
              ),
              React.default.createElement(
                module13.Text,
                {
                  style: k.desc,
                },
                module510.upgrade_progress_view_desc
              )
            )
          );
        },
      },
    ]);
    return _;
  })(React.Component);

exports.default = _;
_.defaultProps = {};
var k = module13.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  outterCircle: {
    alignSelf: 'center',
    width: v,
    height: v,
    borderRadius: v / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.3)',
    zIndex: 999,
  },
  innerCircle: {
    width: C,
    height: C,
    borderRadius: C / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#72B4FE',
  },
  lottieView: {
    marginTop: 1,
    width: 48,
    height: 33.6,
  },
  textWrap: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
    marginTop: 20,
    borderRadius: 10,
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
  },
  desc: {
    width: C,
    fontSize: 12,
    marginTop: 10,
    textAlign: 'center',
    color: 'rgba(0,0,0,0.5)',
  },
});
