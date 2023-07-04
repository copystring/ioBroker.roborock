var module49 = require('./49'),
  module4 = require('./4'),
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
    var o = v(n);
    if (o && o.has(t)) return o.get(t);
    var s = {},
      l = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var c in t)
      if ('default' !== c && Object.prototype.hasOwnProperty.call(t, c)) {
        var u = l ? Object.getOwnPropertyDescriptor(t, c) : null;
        if (u && (u.get || u.set)) Object.defineProperty(s, c, u);
        else s[c] = t[c];
      }

    s.default = t;
    if (o) o.set(t, s);
    return s;
  })(require('react')),
  module12 = require('./12'),
  module1233 = require('./1233'),
  module1231 = require('./1231'),
  module381 = require('./381');

require('./377');

function v(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (v = function (t) {
    return t ? o : n;
  })(t);
}

function M(t, n) {
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

function S(t) {
  for (var o = 1; o < arguments.length; o++) {
    var s = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      M(Object(s), true).forEach(function (o) {
        module49.default(t, o, s[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      M(Object(s)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(s, n));
      });
  }

  return t;
}

function b() {
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

var module491 = require('./491').strings,
  _ = (function (t) {
    module7.default(_, t);

    var module49 = _,
      v = b(),
      M = function () {
        var t,
          o = module11.default(module49);

        if (v) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, s);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function _(t) {
      var n;
      module4.default(this, _);
      (n = M.call(this, t)).selectedSegments = t.selectedSegments;
      n.state = {
        shouldShowBottom: false,
      };
      return n;
    }

    module5.default(_, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {},
      },
      {
        key: 'componentDidMount',
        value: function () {
          var t = this;
          if ('0' != this.selectedSegments)
            this.setState({
              shouldShowBottom: true,
            });
          setTimeout(function () {
            t.fetchAndSetMap();
          }, 500);
        },
      },
      {
        key: 'fetchAndSetMap',
        value: function () {
          var t = module1231.MapManager.sharedManager().mapData;

          if ((this.mapView && this.mapView.setState(S({}, t)), '0' != this.selectedSegments)) {
            var n = this.selectedSegments.split(',');
            segmentsInt = [];
            n.forEach(function (t) {
              segmentsInt.push(parseInt(t));
            });
            if (this.mapView) this.mapView.setHighlightSegments(segmentsInt);
          }

          if (this.mapView) this.mapView.setAllCleanMopMode(module1231.MapManager.sharedManager().customCleanModes);
          this.setCustomMode(this.props.isCustomMode);
        },
      },
      {
        key: 'setCustomMode',
        value: function (t) {
          if (this.mapView) this.mapView.setCleanSequence(module1231.MapManager.sharedManager().cleanSequence.concat(), false);
          if (this.mapView)
            this.mapView.changeMapViewMode(t ? module1233.MapModelInCleanMode.Segment_Clean_Edit_With_Clean_Type : module1233.MapModelInCleanMode.Segment_Clean_Edit);
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = React.default.createElement(module381.ToggleSwitch, {
              onColor: '#3384FF',
              onToggle: function (n) {
                return t.mapSwitchValueChanged(n);
              },
              isOn: this.state.shouldShowBottom,
            });
          return React.default.createElement(
            module12.View,
            {
              style: [C.containter, this.props.style],
              pointerEvent: 'box-only',
            },
            React.default.createElement(
              module12.View,
              {
                style: C.top,
              },
              globals.isRTL && n,
              React.default.createElement(
                module12.View,
                {
                  style: C.textWrap,
                },
                React.default.createElement(
                  module12.Text,
                  {
                    style: C.title,
                  },
                  module491.timer_split_zone_view_select_zone
                ),
                React.default.createElement(
                  module12.Text,
                  {
                    style: C.desc,
                  },
                  module491.timer_split_zone_view_tip
                )
              ),
              !globals.isRTL && n
            ),
            this.state.shouldShowBottom &&
              React.default.createElement(
                module12.View,
                {
                  style: C.bottom,
                },
                React.default.createElement(module1233.MapView, {
                  ref: function (n) {
                    return (t.mapView = n);
                  },
                  style: {
                    flex: 1,
                  },
                  pointerEvents: 'box-only',
                  showAllBubbleInfo: true,
                  inBlockMode: true,
                  hideAccessory: true,
                  onPanResponderGrant: this.props.onPanResponderGrant,
                  onPanResponderRelease: this.props.onPanResponderRelease,
                  selectedBlocksDidChange: this.props.selectedBlocksDidChange,
                })
              )
          );
        },
      },
      {
        key: 'mapSwitchValueChanged',
        value: function (t) {
          var n = this;

          if (!t) {
            this.props.selectedBlocksDidChange([]);
            this.selectedSegments = '0';
          }

          this.setState({
            shouldShowBottom: t,
          });
          console.log('mapSwitchValueChanged');
          if (t)
            setTimeout(function () {
              n.fetchAndSetMap();
            }, 500);
        },
      },
    ]);
    return _;
  })(React.Component);

exports.default = _;
var C = module12.StyleSheet.create({
  containter: {
    backgroundColor: 'white',
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  textWrap: {
    width: module12.Dimensions.get('window').width - 100,
    justifyContent: 'center',
  },
  title: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 16,
  },
  desc: {
    marginTop: 10,
    fontSize: 12,
    color: 'rgba(0,0,0,0.3)',
  },
  switch: {
    marginRight: 10,
  },
  bottom: {
    height: 400,
  },
});
