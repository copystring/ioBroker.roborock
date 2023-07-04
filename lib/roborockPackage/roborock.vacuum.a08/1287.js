var module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1067 = require('./1067');

function p() {
  if ('undefined' == typeof Reflect || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if ('function' == typeof Proxy) return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (t) {
    return false;
  }
}

var module1267 = require('./1267'),
  module1289 = (function (t) {
    module7.default(x, t);

    var module1289 = x,
      w = p(),
      E = function () {
        var t,
          o = module11.default(module1289);

        if (w) {
          var n = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, n);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function x() {
      module4.default(this, x);
      return E.apply(this, arguments);
    }

    module5.default(x, [
      {
        key: 'render',
        value: function () {
          var t = this.props.sequenceID && this.props.sequenceID.length > 0,
            o = React.default.createElement(
              module12.Text,
              {
                style: b.text,
              },
              this.props.sequenceID
            ),
            module1288 = React.default.createElement(module12.Image, {
              source: require('./1288'),
              style: b.image,
            });
          return React.default.createElement(
            module12.View,
            {
              style: b.root,
            },
            React.default.createElement(
              module12.View,
              {
                style: {
                  position: 'absolute',
                  width: 28,
                  height: 34,
                },
              },
              React.default.createElement(module1067.BoxShadow, {
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
            React.default.createElement(module1267, {
              source: require('./1289'),
              style: b.root,
            }),
            React.default.createElement(
              module12.View,
              {
                style: [
                  b.background,
                  {
                    backgroundColor: this.props.backgroundColor,
                  },
                ],
              },
              t ? o : module1288
            )
          );
        },
      },
    ]);
    return x;
  })(React.default.Component);

exports.BubbleView = module1289;
var b = module12.StyleSheet.create({
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
