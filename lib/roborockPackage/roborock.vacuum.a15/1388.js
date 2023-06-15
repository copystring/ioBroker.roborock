var module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  PropTypes = require('prop-types'),
  module1125 = require('./1125'),
  module1057 = require('./1057');

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

var b = (function (t) {
  module7.default(R, t);

  var PropTypes = R,
    b = v(),
    D = function () {
      var t,
        n = module11.default(PropTypes);

      if (b) {
        var u = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, u);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function R(t) {
    module4.default(this, R);
    return D.call(this, t);
  }

  module5.default(R, [
    {
      key: 'componentDidMount',
      value: function () {
        var t;
        if (!(null == (t = this.lottieCharger))) t.play();
      },
    },
    {
      key: 'render',
      value: function () {
        var t = this;
        if (this.props.lottieSource.lenght <= 0) return null;
        if (!this.props.center.x || !this.props.center.y) return null;
        if (!this.props.baseWidth || !this.props.baseHeight) return null;
        var n = this.props.baseWidth,
          u = this.props.baseHeight;
        return React.default.createElement(
          module12.View,
          {
            pointerEvents: 'none',
            style: {
              position: 'absolute',
              width: n,
              height: 0.85 * u * 2,
              left: this.props.center.x - n / 2,
              top: this.props.center.y - 0.85 * u,
              transform: [
                {
                  rotateZ: -1 * this.props.mapDeg + 'deg',
                },
                {
                  translateX: 0,
                },
              ],
            },
          },
          React.default.createElement(module1125.default, {
            ref: function (n) {
              return (t.lottieCharger = n);
            },
            style: {
              top: 0,
              left: 0,
              width: n,
              height: u,
            },
            source: module1057.MapAnimates[this.props.lottieSource],
          })
        );
      },
    },
  ]);
  return R;
})(React.default.PureComponent);

exports.default = b;
b.propTypes = {
  center: PropTypes.default.object,
  baseWidth: PropTypes.default.number,
  baseHeight: PropTypes.default.number,
  lottieSource: PropTypes.default.string,
};
b.defaultProps = {
  mapDeg: 0,
  baseWidth: 0,
  baseHeight: 0,
  lottieSource: '',
};
