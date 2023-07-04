var module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = (function (t, n) {
    if (!n && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var o = y(n);
    if (o && o.has(t)) return o.get(t);
    var l = {},
      c = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var u in t)
      if ('default' !== u && Object.prototype.hasOwnProperty.call(t, u)) {
        var f = c ? Object.getOwnPropertyDescriptor(t, u) : null;
        if (f && (f.get || f.set)) Object.defineProperty(l, u, f);
        else l[u] = t[u];
      }

    l.default = t;
    if (o) o.set(t, l);
    return l;
  })(require('react')),
  module12 = require('./12'),
  module381 = require('./381');

require('./387');

require('./390');

function y(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (y = function (t) {
    return t ? o : n;
  })(t);
}

function h() {
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

require('./491').strings;

var v = (function (t) {
  module7.default(O, t);

  var y = O,
    v = h(),
    P = function () {
      var t,
        n = module11.default(y);

      if (v) {
        var o = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function O(t) {
    var o;
    module4.default(this, O);
    (o = P.call(this, t)).state = {
      current: t.current,
    };
    return o;
  }

  module5.default(O, [
    {
      key: 'render',
      value: function () {
        var t = this,
          n = this.props,
          o = n.options,
          l = n.title,
          module1252 = o.map(function (n, o) {
            var l = o == t.state.current;
            return React.default.createElement(
              module12.View,
              {
                key: o,
                style: [b.optionItem],
              },
              React.default.createElement(
                module12.Text,
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
              React.default.createElement(module381.PureImageButton, {
                imageWidth: 18,
                imageHeight: 18,
                hitSlop: {
                  top: 15,
                  bottom: 15,
                  left: 15,
                  right: 15,
                },
                image: require('./1251'),
                selectedImage: require('./1252'),
                selected: l,
                onPress: t.selectItem.bind(t, o),
              })
            );
          });
        return React.default.createElement(
          module12.View,
          {
            style: b.container,
          },
          React.default.createElement(
            module12.Text,
            {
              style: b.title,
            },
            l
          ),
          React.default.createElement(
            module12.View,
            {
              style: b.optionWrap,
            },
            module1252
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
  return O;
})(React.Component);

v.defaultProps = {
  options: ['option1', 'option2'],
};
var b = module12.StyleSheet.create({
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
  P = module381.HocAlert(v, true, true);
exports.PetDialog = P;
