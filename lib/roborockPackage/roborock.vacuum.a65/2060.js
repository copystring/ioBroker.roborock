var module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  module2059 = require('./2059'),
  React = require('react'),
  module13 = require('./13'),
  PropTypes = require('prop-types');

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

var x = (function (t) {
  module9.default(R, t);

  var n = R,
    PropTypes = v(),
    x = function () {
      var t,
        o = module12.default(n);

      if (PropTypes) {
        var u = module12.default(this).constructor;
        t = Reflect.construct(o, arguments, u);
      } else t = o.apply(this, arguments);

      return module11.default(this, t);
    };

  function R(t) {
    var n;
    module6.default(this, R);
    (n = x.call(this, t)).state = n.props;
    return n;
  }

  module7.default(R, [
    {
      key: 'setNativeProps',
      value: function (t) {
        this.setState(t);
      },
    },
    {
      key: 'UNSAFE_componentWillReceiveProps',
      value: function (t) {
        if (t.color !== this.props.color)
          this.setState({
            color: t.color,
          });
      },
    },
    {
      key: 'render',
      value: function () {
        var t = this.state,
          n = t.start,
          o = t.end,
          u = t.color;
        if (module2059.isEquals(n, o)) return null;
        var l = module2059.getTransform(n, o),
          s = l.d,
          f = l.a + 'rad',
          h = l.x,
          v = l.y;

        if (module13.I18nManager.isRTL) {
          f = -1 * l.a + 'rad';
          h *= -1;
        }

        return React.default.createElement(module13.View, {
          style: [
            b.line,
            {
              backgroundColor: u,
              left: n.x,
              top: n.y,
              width: s,
            },
            {
              transform: [
                {
                  translateX: h,
                },
                {
                  translateY: v,
                },
                {
                  rotateZ: f,
                },
              ],
            },
          ],
        });
      },
    },
  ]);
  return R;
})(React.Component);

exports.default = x;
x.propTypes = {
  color: PropTypes.default.string,
  start: PropTypes.default.shape({
    x: PropTypes.default.number,
    y: PropTypes.default.number,
  }),
  end: PropTypes.default.shape({
    x: PropTypes.default.number,
    y: PropTypes.default.number,
  }),
};
x.defaultProps = {
  color: '#8E91A8',
  start: {
    x: 0,
    y: 0,
  },
  end: {
    x: 0,
    y: 0,
  },
};
var b = module13.StyleSheet.create({
  line: {
    position: 'absolute',
    height: 1,
  },
});
module.exports = x;
