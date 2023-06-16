var module50 = require('./50'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1118 = require('./1118'),
  module415 = require('./415'),
  module385 = require('./385');

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

function M(t) {
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
}

function b() {
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

var module510 = require('./510').strings,
  _ = (function (t) {
    module9.default(_, t);

    var n = _,
      module50 = b(),
      v = function () {
        var t,
          s = module12.default(n);

        if (module50) {
          var l = module12.default(this).constructor;
          t = Reflect.construct(s, arguments, l);
        } else t = s.apply(this, arguments);

        return module11.default(this, t);
      };

    function _(t) {
      var n;
      module6.default(this, _);
      (n = v.call(this, t)).selectedSegments = t.selectedSegments;
      n.state = {
        shouldShowBottom: false,
      };
      return n;
    }

    module7.default(_, [
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
          var t,
            n = module415.MM.mapData;

          if ((this.mapView && this.mapView.setState(M({}, n)), '0' != this.selectedSegments)) {
            var o,
              s = this.selectedSegments.split(',');
            segmentsInt = [];
            s.forEach(function (t) {
              segmentsInt.push(parseInt(t));
            });
            if (!(null == (o = this.mapView))) o.setHighlightSegments(segmentsInt);
          }

          if (!(null == (t = this.mapView))) t.setAllCleanMopMode(module415.MM.customCleanModes);
          this.setCustomMode(this.props.isCustomMode);
        },
      },
      {
        key: 'setCustomMode',
        value: function (t) {
          var n, o;
          if (!(null == (n = this.mapView))) n.setCleanSequence(module415.MM.cleanSequence.concat());
          if (!(null == (o = this.mapView)))
            o.changeMapViewMode(t ? module1118.MapModelInCleanMode.Segment_Clean_Edit_With_Clean_Type : module1118.MapModelInCleanMode.Segment_Clean_Edit);
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = React.default.createElement(module385.ToggleSwitch, {
              onColor: '#3384FF',
              onToggle: function (n) {
                return t.mapSwitchValueChanged(n);
              },
              isOn: this.state.shouldShowBottom,
            });
          return React.default.createElement(
            module13.View,
            {
              style: [O.containter, this.props.style],
              pointerEvent: 'box-only',
            },
            React.default.createElement(
              module13.View,
              {
                style: O.top,
              },
              globals.isRTL && n,
              React.default.createElement(
                module13.View,
                {
                  style: O.textWrap,
                },
                React.default.createElement(
                  module13.Text,
                  {
                    style: O.title,
                  },
                  module510.timer_split_zone_view_select_zone
                ),
                React.default.createElement(
                  module13.Text,
                  {
                    style: O.desc,
                  },
                  module510.timer_split_zone_view_tip
                )
              ),
              !globals.isRTL && n
            ),
            this.state.shouldShowBottom &&
              React.default.createElement(
                module13.View,
                {
                  style: O.bottom,
                },
                React.default.createElement(module1118.MapView, {
                  ref: function (n) {
                    return (t.mapView = n);
                  },
                  style: {
                    flex: 1,
                  },
                  pointerEvents: 'box-only',
                  showAllBlocksBubble: true,
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
var O = module13.StyleSheet.create({
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
    flex: 1,
    justifyContent: 'flex-start',
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
