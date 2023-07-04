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
    var o = h(n);
    if (o && o.has(t)) return o.get(t);
    var l = {},
      u = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var f in t)
      if ('default' !== f && Object.prototype.hasOwnProperty.call(t, f)) {
        var s = u ? Object.getOwnPropertyDescriptor(t, f) : null;
        if (s && (s.get || s.set)) Object.defineProperty(l, f, s);
        else l[f] = t[f];
      }

    l.default = t;
    if (o) o.set(t, l);
    return l;
  })(require('react')),
  module12 = require('./12'),
  PropTypes = require('prop-types'),
  module1112 = require('./1112');

function h(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (h = function (t) {
    return t ? o : n;
  })(t);
}

function v() {
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

var S = (function (t) {
  module7.default(b, t);

  var PropTypes = b,
    h = v(),
    S = function () {
      var t,
        n = module11.default(PropTypes);

      if (h) {
        var o = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function b(t) {
    var o;
    module4.default(this, b);
    (o = S.call(this, t)).state = {
      isLoadComplete: false,
      type: 0,
    };
    o.isUnmount = false;
    return o;
  }

  module5.default(b, [
    {
      key: 'render',
      value: function () {
        var t = this,
          n = this.props,
          o = n.uri,
          l = n.errImage,
          u = n.style,
          f = {
            uri: o,
          };
        if (1 === this.state.type) f = l;
        var p = 'small' == this.props.errorImageSize ? I.smallImgStyle : I.normalImgStyle;
        return React.default.createElement(
          module12.View,
          {
            style: [
              I.imgDefault,
              u,
              {
                justifyContent: 'center',
              },
            ],
          },
          React.default.createElement(module12.Image, {
            source: f,
            resizeMode: 'contain',
            style:
              1 == this.state.type
                ? p
                : [
                    I.normalImgStyle,
                    {
                      overflow: 'hidden',
                      position: 'absolute',
                    },
                    u,
                  ],
            onError: function (n) {
              if (!t.isUnmount)
                t.setState({
                  type: 1,
                });
            },
            onLoadEnd: function () {
              if (!t.isUnmount)
                t.setState({
                  isLoadComplete: true,
                });
            },
          }),
          !this.state.isLoadComplete &&
            1 != this.state.type &&
            React.default.createElement(module1112.default, {
              style: I.indicator,
              color: 'rgba(0,0,0,0.6)',
            })
        );
      },
    },
    {
      key: 'componentWillUnmount',
      value: function () {
        this.isUnmount = true;
      },
    },
  ]);
  return b;
})(React.Component);

exports.default = S;
S.propTypes = {
  uri: PropTypes.default.string.isRequired,
  errImage: PropTypes.default.number,
  errorImageSize: PropTypes.default.string,
};
S.defaultProps = {
  errImage: require('./1816'),
  errorImageSize: 'normal',
};
var I = module12.StyleSheet.create({
  normalImgStyle: {
    width: 180,
    height: 180,
    alignSelf: 'center',
  },
  smallImgStyle: {
    width: 60,
    height: 60,
    alignSelf: 'center',
  },
  indicator: {
    position: 'absolute',
    height: 100,
    alignSelf: 'center',
  },
});
