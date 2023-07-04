require('./391');

var module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module2063 = require('./2063'),
  module2067 = require('./2067');

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

var module500 = require('./500').strings,
  V = module12.Dimensions.get('window'),
  b = (function (t) {
    module7.default(S, t);

    var n = S,
      V = y(),
      b = function () {
        var t,
          o = module11.default(n);

        if (V) {
          var l = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, l);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function S(t) {
      var n;
      module4.default(this, S);
      (n = b.call(this, t)).state = {
        soundVolume: undefined !== t.soundVolume ? t.soundVolume : 0,
      };
      isLandscape = false;
      return n;
    }

    module5.default(S, [
      {
        key: 'componentDidMount',
        value: function () {},
      },
      {
        key: 'componentWillUnmount',
        value: function () {},
      },
      {
        key: 'changeVolume',
        value: function (t) {
          this.setState({
            soundVolume: t,
          });
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this;
          return React.default.createElement(
            module12.View,
            {
              style: [
                x.container,
                this.props.isLandscape && {
                  bottom: 100,
                },
              ],
              pointerEvents: 'none',
            },
            React.default.createElement(
              module12.View,
              {
                style: !this.props.isLandscape && x.portrait,
              },
              React.default.createElement(
                module12.View,
                {
                  style: !this.props.isLandscape && x.volumeView,
                },
                !this.props.isLandscape &&
                  React.default.createElement(module2063.default, {
                    volume: this.state.soundVolume,
                    isCalling: true,
                  }),
                React.default.createElement(module2067.default, {
                  ref: function (n) {
                    return (t.timeView = n);
                  },
                  showChatTips: this.props.showChatTips,
                }),
                !this.props.isLandscape &&
                  React.default.createElement(module2063.default, {
                    volume: this.state.soundVolume,
                  })
              ),
              !this.props.isLandscape &&
                React.default.createElement(
                  module12.Text,
                  {
                    numberOfLines: 2,
                    style: x.defaultText,
                  },
                  module500.be_on_the_phone
                )
            )
          );
        },
      },
      {
        key: 'cancle',
        value: function () {
          if (this.timeView) this.timeView.cancle();
        },
      },
    ]);
    return S;
  })(React.Component);

exports.default = b;
var x = module12.StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    zIndex: 4,
    bottom: 220,
  },
  portrait: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 10,
    flexDirection: 'column-reverse',
    alignSelf: 'flex-end',
    height: 113,
    width: 183,
  },
  volumeView: {
    alignSelf: 'center',
    position: 'absolute',
    justifyContent: 'space-between',
    flexDirection: 'row',
    top: 31,
    width: 140,
  },
  defaultText: {
    position: 'absolute',
    alignSelf: 'center',
    textAlign: 'center',
    top: 66,
    color: 'rgba(255,255,255,0.6)',
    fontSize: 10,
  },
});
