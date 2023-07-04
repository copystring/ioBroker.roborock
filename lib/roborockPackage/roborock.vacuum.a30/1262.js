var module22 = require('./22'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  PropTypes = require('prop-types'),
  module391 = require('./391');

function b(t) {
  var n = v();
  return function () {
    var o,
      u = module11.default(t);

    if (n) {
      var l = module11.default(this).constructor;
      o = Reflect.construct(u, arguments, l);
    } else o = u.apply(this, arguments);

    return module9.default(this, o);
  };
}

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

var module393 = require('./393'),
  R = '#5495FA',
  S = '#3073EEFF',
  C = module393.isMiApp || module393.apiLevel > 10007,
  q = (function (t) {
    module7.default(f, t);
    var s = b(f);

    function f(t) {
      module4.default(this, f);
      return s.call(this, t);
    }

    module5.default(f, [
      {
        key: 'render',
        value: function () {
          var t = this.props,
            o = t.funcId,
            u = t.panResponder,
            l = o || 'time_key_' + new Date().getTime();
          return React.default.createElement(
            module12.View,
            module22.default({}, module391.default.getAccessibilityLabel(l), null == u ? undefined : u.panHandlers, {
              pointerEvents: 'auto',
              style: {
                position: 'absolute',
                left: this.props.left,
                top: this.props.top,
                width: 1.5 * this.props.width,
                height: 1.5 * this.props.height,
                overflow: 'visible',
                alignItems: 'center',
                justifyContent: 'center',
              },
            }),
            React.default.createElement(module12.ImageBackground, {
              style: {
                width: this.props.width,
                height: this.props.height,
              },
              source: this.props.imageSource,
            })
          );
        },
      },
    ]);
    return f;
  })(React.default.PureComponent);

exports.RectButton = q;
q.propTypes = {
  left: PropTypes.default.number.isRequired,
  top: PropTypes.default.number.isRequired,
  width: PropTypes.default.number.isRequired,
  height: PropTypes.default.number.isRequired,
};

var B = (function (t) {
  module7.default(s, t);
  var n = b(s);

  function s(t) {
    module4.default(this, s);
    return n.call(this, t);
  }

  module5.default(s, [
    {
      key: 'render',
      value: function () {
        return React.default.createElement(
          module12.View,
          {
            pointerEvents: 'none',
            style: {
              position: 'absolute',
              left: this.props.left,
              top: this.props.top,
              width: this.props.width,
              height: this.props.height,
              overflow: 'visible',
              alignItems: 'center',
              justifyContent: 'center',
            },
          },
          React.default.createElement(module12.ImageBackground, {
            style: {
              width: this.props.width,
              height: this.props.height,
            },
            source: this.props.imageSource,
          })
        );
      },
    },
  ]);
  return s;
})(React.default.PureComponent);

exports.DisplayButton = B;
B.propTypes = {
  left: PropTypes.default.number.isRequired,
  top: PropTypes.default.number.isRequired,
  width: PropTypes.default.number.isRequired,
  height: PropTypes.default.number.isRequired,
};
module12.StyleSheet.create({
  contentStyle: {
    position: 'absolute',
    width: 50,
    height: 25,
    overflow: 'visible',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 12,
    textAlign: 'center',
    color: 'white',
  },
  innerViewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerViewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  triangleStyle: {
    alignSelf: 'center',
    top: -1,
    width: 0,
    height: 0,
    borderTopWidth: 5,
    borderTopColor: C ? R : S,
    borderRightWidth: 5,
    borderRightColor: 'transparent',
    borderLeftWidth: 5,
    borderLeftColor: 'transparent',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
});
