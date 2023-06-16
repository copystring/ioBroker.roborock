var module50 = require('./50'),
  module22 = require('./22'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12');

function v(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(t);
    if (n)
      s = s.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, s);
  }

  return o;
}

function M() {
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

var b = module12.NativeModules.RRARMapViewManager,
  PropTypes = require('prop-types'),
  D = (function (t) {
    module7.default(v, t);

    var n = v,
      module50 = M(),
      y = function () {
        var t,
          s = module11.default(n);

        if (module50) {
          var c = module11.default(this).constructor;
          t = Reflect.construct(s, arguments, c);
        } else t = s.apply(this, arguments);

        return module9.default(this, t);
      };

    function v(t) {
      var n;
      module4.default(this, v);

      (n = y.call(this, t))._onFinishMatching = function (t) {
        if (n.props.onFinishMatching) n.props.onFinishMatching(t.nativeEvent);
      };

      n.state = {};
      return n;
    }

    module5.default(v, [
      {
        key: 'componentDidMount',
        value: function () {},
      },
      {
        key: 'componentWillUnmount',
        value: function () {},
      },
      {
        key: 'startMatching',
        value: function () {
          b.startMatching();
        },
      },
      {
        key: 'currentSDKAPILevel',
        value: function () {
          return b.VERSION;
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this;
          return React.default.createElement(
            P,
            module22.default({}, this.props, {
              ref: function (n) {
                return (t.root = n);
              },
              style: [this.props.style],
              onFinishMatching: this._onFinishMatching,
              bgColor: this.props.backgroundColor,
              parsedMapData: this.props.parsedMapData,
              originBase64MapData: this.props.originBase64MapData,
              meshFileName: this.props.meshFileName,
              matchingParams: this.props.matchingParams,
              isDarkMode: this.props.isDarkMode,
            })
          );
        },
      },
    ]);
    return v;
  })(React.Component);

exports.default = D;

D.propTypes = (function (t) {
  for (var n = 1; n < arguments.length; n++) {
    var s = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      v(Object(s), true).forEach(function (n) {
        module50.default(t, n, s[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      v(Object(s)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(s, n));
      });
  }

  return t;
})(
  {
    backgroundColor: PropTypes.string,
    parsedMapData: PropTypes.object,
    originBase64MapData: PropTypes.string,
    meshFileName: PropTypes.string,
    matchingParams: PropTypes.array,
    onFinishMatching: PropTypes.func,
    isDarkMode: PropTypes.bool,
  },
  module12.ViewPropTypes
);

var P = module12.requireNativeComponent('RRARMapView', D);
