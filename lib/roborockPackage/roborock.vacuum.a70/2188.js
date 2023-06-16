var module22 = require('./22'),
  module6 = require('./6'),
  module8 = require('./8'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
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

var R = (function (t) {
  module9.default(y, t);

  var PropTypes = y,
    R = v(),
    _ = function () {
      var t,
        n = module12.default(PropTypes);

      if (R) {
        var o = module12.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module11.default(this, t);
    };

  function y(t) {
    var n;
    module6.default(this, y);
    (n = _.call(this, t)).state = {
      value: 0,
      process: 0,
    };

    n._getProcess = function (t) {
      return (t - n.props.min) / (n.props.max - n.props.min);
    };

    n._getThumbBottom = function (t) {
      var o = n.props,
        s = o.thumbSize,
        u = o.processHeight;
      return n._getProcess(t) * (u - s);
    };

    n._onPanResponderGrant = n._onPanResponderGrant.bind(module8.default(n));
    n._onPanResponderEnd = n._onPanResponderEnd.bind(module8.default(n));
    n._onPanResponderMove = n._onPanResponderMove.bind(module8.default(n));
    return n;
  }

  module7.default(y, [
    {
      key: 'componentWillMount',
      value: function () {
        this.watcher = module13.PanResponder.create({
          onStartShouldSetPanResponder: function () {
            return true;
          },
          onPanResponderGrant: this._onPanResponderGrant,
          onPanResponderMove: this._onPanResponderMove,
          onPanResponderRelease: this._onPanResponderEnd,
          onPanResponderTerminate: this._onPanResponderEnd,
        });
        this.setState({
          value: this.props.defaultValue,
          process: this._getProcess(this.props.defaultValue),
        });
      },
    },
    {
      key: 'UNSAFE_componentWillReceiveProps',
      value: function (t) {
        var n = t.defaultValue;
        if (this.props.defaultValue !== n)
          this.setState({
            value: n,
            process: this._getProcess(n),
          });
      },
    },
    {
      key: '_onPanResponderGrant',
      value: function (t, n) {
        var o = this.props.onStart;
        if (o) o();
      },
    },
    {
      key: '_onPanResponderMove',
      value: function (t, n) {
        var o = 0;
        o = n.dy < 0 ? this.props.defaultValue + Math.abs(n.dy) : this.props.defaultValue - n.dy;

        this._setProcess(o);
      },
    },
    {
      key: '_onPanResponderEnd',
      value: function (t, n) {
        var o = this.props.onAfterChange;
        this.props.defaultValue = this.state.value;
        if (o) o(this.state.value);
      },
    },
    {
      key: '_setProcess',
      value: function (t) {
        if (!this.props.disabled) {
          var n = this.props,
            o = n.min,
            s = n.max,
            u = n.onChange,
            l = this.state.process;
          if (t <= o) t = o;
          if (t >= s) t = s;
          u(t);
          if (l !== this._getProcess(t))
            this.setState({
              value: t,
              process: this._getProcess(t),
            });
        }
      },
    },
    {
      key: '_getThumbView',
      value: function () {
        var t = this.props,
          n = t.thumbImage,
          o = t.thumbSize,
          s = this.state.value;
        return n
          ? React.default.createElement(module13.Image, {
              style: {
                width: o,
                height: o,
                position: 'absolute',
                bottom: this._getThumbBottom(s),
              },
              source: n,
            })
          : React.default.createElement(module13.View, {
              style: {
                width: o,
                height: o,
                position: 'absolute',
                bottom: this._getThumbBottom(s),
                borderRadius: o / 2,
                backgroundColor: '#ffffff',
              },
            });
      },
    },
    {
      key: 'render',
      value: function () {
        var t = this.props,
          o = t.height,
          s = t.width,
          u = t.maximumTrackTintColor,
          l = t.minimumTrackTintColor,
          f = t.processWidth,
          h = t.processHeight,
          b = this.state.process;
        return React.default.createElement(
          module13.View,
          module22.default(
            {
              style: [
                P.container,
                {
                  height: o,
                  width: s,
                },
              ],
            },
            this.watcher.panHandlers
          ),
          React.default.createElement(module13.View, {
            style: {
              backgroundColor: l,
              width: f,
              height: b * h,
              borderBottomLeftRadius: f / 2,
              borderBottomRightRadius: f / 2,
              marginBottom: 0,
            },
          }),
          React.default.createElement(module13.View, {
            style: {
              backgroundColor: u,
              flex: 1,
              width: f,
              borderTopLeftRadius: f / 2,
              borderTopRightRadius: f / 2,
              marginTop: 0,
            },
          }),
          this._getThumbView()
        );
      },
    },
  ]);
  return y;
})(React.default.Component);

exports.default = R;
R.propTypes = {
  height: PropTypes.default.number,
  width: PropTypes.default.number,
  maximumTrackTintColor: PropTypes.default.string,
  minimumTrackTintColor: PropTypes.default.string,
  onStart: PropTypes.default.func,
  onChange: PropTypes.default.func,
  onAfterChange: PropTypes.default.func,
  defaultValue: PropTypes.default.number,
  min: PropTypes.default.number.isRequired,
  max: PropTypes.default.number.isRequired,
  step: PropTypes.default.number.isRequired,
  disabled: PropTypes.default.bool,
  thumbSize: PropTypes.default.number,
  thumbImage: PropTypes.default.number,
  processWidth: PropTypes.default.number,
  processHeight: PropTypes.default.number,
};
R.defaultProps = {
  height: 100,
  width: 30,
  onChange: function () {},
  onAfterChange: function () {},
  defaultValue: 0,
  disabled: false,
  thumbSize: 30,
  thumbImage: null,
  minimumTrackTintColor: '#3384ff',
  maximumTrackTintColor: 'rgba(0,0,0,0.1)',
  processWidth: 4,
  processHeight: 100,
};
var P = module13.StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column-reverse',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
