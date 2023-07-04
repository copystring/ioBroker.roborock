var module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module2227 = require('./2227');

require('./391');

function x() {
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
  y = module13.Dimensions.get('window'),
  _ = (function (t) {
    module9.default(w, t);

    var n = w,
      y = x(),
      _ = function () {
        var t,
          o = module12.default(n);

        if (y) {
          var l = module12.default(this).constructor;
          t = Reflect.construct(o, arguments, l);
        } else t = o.apply(this, arguments);

        return module11.default(this, t);
      };

    function w(t) {
      var n;
      module6.default(this, w);

      (n = _.call(this, t)).onDismiss = function () {
        if (n.props.onDismiss) n.props.onDismiss();
      };

      n.state = {
        soundVolume: undefined !== t.soundVolume ? t.soundVolume : 0,
      };
      isLandscape = false;
      return n;
    }

    module7.default(w, [
      {
        key: 'render',
        value: function () {
          return React.default.createElement(
            module13.View,
            {
              style: b.container,
              pointerEvents: 'none',
            },
            React.default.createElement(
              module13.Animated.View,
              {
                style: this.props.isLandscape ? b.landscapeTextContainer : b.textContainer,
              },
              React.default.createElement(
                module13.View,
                {
                  style: b.volumeView,
                },
                React.default.createElement(module2227.default, {
                  volume: this.props.soundVolume,
                })
              ),
              React.default.createElement(
                module13.View,
                {
                  style: b.textView,
                },
                React.default.createElement(
                  module13.Text,
                  {
                    numberOfLines: 2,
                    style: b.timeText,
                  },
                  module510.up_to_15s_can_be_recorded
                ),
                React.default.createElement(
                  module13.Text,
                  {
                    numberOfLines: 2,
                    style: b.defaultText,
                  },
                  module510.let_go_of_send_up_slide_to_cancel
                )
              )
            )
          );
        },
      },
      {
        key: 'componentDidMount',
        value: function () {},
      },
      {
        key: 'componentWillUnmount',
        value: function () {},
      },
    ]);
    return w;
  })(React.Component);

exports.default = _;
var b = module13.StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 4,
  },
  landscapeTextContainer: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 10,
    alignSelf: 'center',
    flexDirection: 'column-reverse',
    height: 113,
    width: 183,
  },
  textContainer: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 10,
    flexDirection: 'column-reverse',
    alignSelf: 'flex-end',
    height: 113,
    width: 183,
    marginBottom: 210,
  },
  volumeView: {
    alignSelf: 'center',
    position: 'absolute',
    top: 25,
  },
  textView: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 68,
  },
  timeText: {
    textAlign: 'center',
    marginTop: 11,
    color: 'rgba(255,255,255,0.6)',
    fontSize: 10,
  },
  defaultText: {
    textAlign: 'center',
    marginTop: 2,
    color: 'rgba(255,255,255,0.6)',
    fontSize: 10,
  },
});
