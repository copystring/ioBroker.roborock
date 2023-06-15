var module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  PropTypes = require('prop-types'),
  module1204 = require('./1204'),
  module1127 = require('./1127');

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
  module9.default(R, t);

  var PropTypes = R,
    b = v(),
    D = function () {
      var t,
        n = module12.default(PropTypes);

      if (b) {
        var u = module12.default(this).constructor;
        t = Reflect.construct(n, arguments, u);
      } else t = n.apply(this, arguments);

      return module11.default(this, t);
    };

  function R(t) {
    module6.default(this, R);
    return D.call(this, t);
  }

  module7.default(R, [
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
        if (this.props.lottieSource.length <= 0) return null;
        if (!this.props.center.x || !this.props.center.y) return null;
        if (!this.props.baseWidth || !this.props.baseHeight) return null;
        var n = this.props.baseWidth,
          u = this.props.baseHeight;
        return React.default.createElement(
          module13.View,
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
          React.default.createElement(module1204.default, {
            ref: function (n) {
              return (t.lottieCharger = n);
            },
            style: {
              top: 0,
              left: 0,
              width: n,
              height: u,
            },
            source: module1127.MapAnimates[this.props.lottieSource],
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
