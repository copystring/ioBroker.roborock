var module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module385 = require('./385');

require('./391');

require('./394');

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

require('./510').strings;

var v = (function (t) {
  module9.default(b, t);

  var n = b,
    v = y(),
    S = function () {
      var t,
        o = module12.default(n);

      if (v) {
        var l = module12.default(this).constructor;
        t = Reflect.construct(o, arguments, l);
      } else t = o.apply(this, arguments);

      return module11.default(this, t);
    };

  function b(t) {
    var n;
    module6.default(this, b);
    (n = S.call(this, t)).state = {
      current: t.current,
    };
    return n;
  }

  module7.default(b, [
    {
      key: 'render',
      value: function () {
        var t = this,
          n = this.props,
          o = n.options,
          l = n.title,
          module1337 = o.map(function (n, o) {
            var l = o == t.state.current;
            return React.default.createElement(
              module13.View,
              {
                key: o,
                style: [I.optionItem],
              },
              React.default.createElement(
                module13.Text,
                {
                  numberOfLines: 1,
                  style: {
                    color: l ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.6)',
                    fontSize: 14,
                    maxWidth: 180,
                  },
                },
                n
              ),
              React.default.createElement(module385.PureImageButton, {
                imageWidth: 18,
                imageHeight: 18,
                hitSlop: {
                  top: 15,
                  bottom: 15,
                  left: 15,
                  right: 15,
                },
                image: require('./1336'),
                selectedImage: require('./1337'),
                selected: l,
                onPress: t.selectItem.bind(t, o),
              })
            );
          });
        return React.default.createElement(
          module13.View,
          {
            style: I.container,
          },
          React.default.createElement(
            module13.Text,
            {
              style: I.title,
            },
            l
          ),
          React.default.createElement(
            module13.View,
            {
              style: I.optionWrap,
            },
            module1337
          )
        );
      },
    },
    {
      key: 'selectItem',
      value: function (t) {
        this.setState({
          current: t,
        });
        if (this.props.didSelectItem) this.props.didSelectItem(t);
        this.props.parent.hide();
      },
    },
  ]);
  return b;
})(React.Component);

v.defaultProps = {
  options: ['option1', 'option2'],
};
var I = module13.StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    title: {
      paddingVertical: 28,
      paddingHorizontal: 15,
      fontSize: 16,
      fontWeight: 'bold',
      color: 'rgba(0,0,0,0.8)',
      textAlign: 'center',
    },
    optionWrap: {
      minWidth: 340,
    },
    optionItem: {
      alignSelf: 'stretch',
      paddingHorizontal: 36,
      marginBottom: 30,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  }),
  S = module385.HocAlert(v, true, true);
exports.PetDialog = S;
