var module22 = require('./22'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1409 = require('./1409');

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

var module1415 = require('./1415'),
  module1431 = (function (t) {
    module9.default(R, t);

    var module1431 = R,
      E = y(),
      x = function () {
        var t,
          o = module12.default(module1431);

        if (E) {
          var n = module12.default(this).constructor;
          t = Reflect.construct(o, arguments, n);
        } else t = o.apply(this, arguments);

        return module11.default(this, t);
      };

    function R() {
      module6.default(this, R);
      return x.apply(this, arguments);
    }

    module7.default(R, [
      {
        key: 'render',
        value: function () {
          var t = this.props.panHandlers,
            n = undefined === t ? {} : t,
            l = this.props.sequenceID && this.props.sequenceID.length > 0,
            u = React.default.createElement(
              module13.Text,
              {
                style: w.text,
              },
              this.props.sequenceID
            ),
            module1430 = React.default.createElement(module13.Image, {
              source: require('./1430'),
              style: w.image,
            });
          return React.default.createElement(
            module13.View,
            module22.default(
              {
                style: [w.root, this.props.style],
              },
              n
            ),
            React.default.createElement(
              module13.View,
              {
                style: {
                  position: 'absolute',
                  width: 28,
                  height: 34,
                },
              },
              React.default.createElement(module1409.BoxShadow, {
                setting: {
                  width: 28,
                  height: 34,
                  color: '#000000',
                  border: 10,
                  radius: 14,
                  opacity: 0.05,
                  x: 0,
                  y: 0,
                },
              })
            ),
            React.default.createElement(module1415, {
              source: require('./1431'),
              style: w.root,
            }),
            React.default.createElement(
              module13.View,
              {
                style: [
                  w.background,
                  {
                    backgroundColor: this.props.backgroundColor,
                  },
                ],
              },
              l ? u : module1430
            )
          );
        },
      },
    ]);
    return R;
  })(React.default.Component);

exports.BubbleView = module1431;
var w = module13.StyleSheet.create({
  root: {
    overflow: 'visible',
    width: 28,
    height: 34,
  },
  background: {
    left: 2,
    top: -32,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    paddingBottom: 2,
    fontSize: 12,
    color: 'white',
  },
  image: {
    width: 20,
    height: 20,
  },
});
