var module22 = require('./22'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1328 = require('./1328');

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

var module1334 = require('./1334'),
  module1351 = (function (t) {
    module7.default(R, t);

    var module1351 = R,
      E = y(),
      x = function () {
        var t,
          o = module11.default(module1351);

        if (E) {
          var n = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, n);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function R() {
      module4.default(this, R);
      return x.apply(this, arguments);
    }

    module5.default(R, [
      {
        key: 'render',
        value: function () {
          var t = this.props.panHandlers,
            n = undefined === t ? {} : t,
            l = this.props.sequenceID && this.props.sequenceID.length > 0,
            u = React.default.createElement(
              module12.Text,
              {
                style: w.text,
              },
              this.props.sequenceID
            ),
            module1350 = React.default.createElement(module12.Image, {
              source: require('./1350'),
              style: w.image,
            });
          return React.default.createElement(
            module12.View,
            module22.default(
              {
                style: [w.root, this.props.style],
              },
              n
            ),
            React.default.createElement(
              module12.View,
              {
                style: {
                  position: 'absolute',
                  width: 28,
                  height: 34,
                },
              },
              React.default.createElement(module1328.BoxShadow, {
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
            React.default.createElement(module1334, {
              source: require('./1351'),
              style: w.root,
            }),
            React.default.createElement(
              module12.View,
              {
                style: [
                  w.background,
                  {
                    backgroundColor: this.props.backgroundColor,
                  },
                ],
              },
              l ? u : module1350
            )
          );
        },
      },
    ]);
    return R;
  })(React.default.Component);

exports.BubbleView = module1351;
var w = module12.StyleSheet.create({
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
