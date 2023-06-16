var module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module2117 = require('./2117');

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

var module505 = require('./505').strings,
  y = module12.Dimensions.get('window'),
  _ = (function (t) {
    module7.default(w, t);

    var n = w,
      y = x(),
      _ = function () {
        var t,
          o = module11.default(n);

        if (y) {
          var l = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, l);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function w(t) {
      var n;
      module4.default(this, w);

      (n = _.call(this, t)).onDismiss = function () {
        if (n.props.onDismiss) n.props.onDismiss();
      };

      n.state = {
        soundVolume: undefined !== t.soundVolume ? t.soundVolume : 0,
      };
      isLandscape = false;
      return n;
    }

    module5.default(w, [
      {
        key: 'render',
        value: function () {
          return React.default.createElement(
            module12.View,
            {
              style: b.container,
              pointerEvents: 'none',
            },
            React.default.createElement(
              module12.Animated.View,
              {
                style: this.props.isLandscape ? b.landscapeTextContainer : b.textContainer,
              },
              React.default.createElement(
                module12.View,
                {
                  style: b.volumeView,
                },
                React.default.createElement(module2117.default, {
                  volume: this.props.soundVolume,
                })
              ),
              React.default.createElement(
                module12.View,
                {
                  style: b.textView,
                },
                React.default.createElement(
                  module12.Text,
                  {
                    numberOfLines: 2,
                    style: b.timeText,
                  },
                  module505.up_to_15s_can_be_recorded
                ),
                React.default.createElement(
                  module12.Text,
                  {
                    numberOfLines: 2,
                    style: b.defaultText,
                  },
                  module505.let_go_of_send_up_slide_to_cancel
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
var b = module12.StyleSheet.create({
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
