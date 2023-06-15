var module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  PropTypes = require('prop-types'),
  module1425 = require('./1425');

function S() {
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

var v = (function (t) {
  module7.default(R, t);

  var n = R,
    PropTypes = S(),
    v = function () {
      var t,
        o = module11.default(n);

      if (PropTypes) {
        var l = module11.default(this).constructor;
        t = Reflect.construct(o, arguments, l);
      } else t = o.apply(this, arguments);

      return module9.default(this, t);
    };

  function R(t) {
    var n;
    module4.default(this, R);
    (n = v.call(this, t)).state = {
      isLoadComplete: false,
      type: 0,
    };
    n.isUnmount = false;
    return n;
  }

  module5.default(R, [
    {
      key: 'render',
      value: function () {
        var t = this,
          n = this.props,
          o = n.uri,
          l = n.errImage,
          u = n.style,
          s = {
            uri: o,
          };
        if (1 === this.state.type) s = l;
        var f = 'small' == this.props.errorImageSize ? I.smallImgStyle : I.normalImgStyle;
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
            source: s,
            resizeMode: 'contain',
            style:
              1 == this.state.type
                ? f
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
            React.default.createElement(module1425.default, {
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
  return R;
})(React.Component);

exports.default = v;
v.propTypes = {
  uri: PropTypes.default.string.isRequired,
  errImage: PropTypes.default.number,
  errorImageSize: PropTypes.default.string,
};
v.defaultProps = {
  errImage: require('./1876'),
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
