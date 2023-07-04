require('./2228');

require('./391');

var module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module2232 = require('./2232');

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

var module510 = require('./510').strings,
  x = module13.Dimensions.get('window'),
  w = (function (t) {
    module9.default(V, t);

    var n = V,
      x = v(),
      w = function () {
        var t,
          o = module12.default(n);

        if (x) {
          var l = module12.default(this).constructor;
          t = Reflect.construct(o, arguments, l);
        } else t = o.apply(this, arguments);

        return module11.default(this, t);
      };

    function V(t) {
      var n;
      module6.default(this, V);
      (n = w.call(this, t)).state = {
        soundVolume: undefined !== t.soundVolume ? t.soundVolume : 0,
      };
      isLandscape = false;
      return n;
    }

    module7.default(V, [
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
          var t = this,
            n = this.props.isLandscape;
          return React.default.createElement(
            module13.View,
            {
              style: [
                b.container,
                n
                  ? {
                      bottom: 100,
                    }
                  : {
                      top: 30,
                    },
              ],
              pointerEvents: 'none',
            },
            React.default.createElement(module2232.default, {
              ref: function (n) {
                return (t.timeView = n);
              },
              didExceedCallingMaxTime: this.props.didExceedCallingMaxTime,
            }),
            !n &&
              React.default.createElement(
                module13.Text,
                {
                  numberOfLines: 2,
                  style: b.defaultText,
                },
                module510.be_on_the_phone
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
    return V;
  })(React.Component);

exports.default = w;
var b = module13.StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    alignSelf: 'center',
    zIndex: 99,
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
    marginTop: 10,
    alignSelf: 'center',
    textAlign: 'center',
    color: '#a5a5a5',
    fontSize: 10,
  },
});
