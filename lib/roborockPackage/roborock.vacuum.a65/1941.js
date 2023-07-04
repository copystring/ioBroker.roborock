var module50 = require('./50'),
  regeneratorRuntime = require('regenerator-runtime'),
  module22 = require('./22'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1125 = require('./1125');

function M(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var l = Object.getOwnPropertySymbols(t);
    if (n)
      l = l.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, l);
  }

  return o;
}

function k() {
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
  b = module13.NativeModules.RR3DMapViewManager,
  PropTypes = require('prop-types'),
  P = (function (t) {
    module9.default(O, t);

    var n = O,
      module50 = k(),
      M = function () {
        var t,
          l = module12.default(n);

        if (module50) {
          var c = module12.default(this).constructor;
          t = Reflect.construct(l, arguments, c);
        } else t = l.apply(this, arguments);

        return module11.default(this, t);
      };

    function O(t) {
      var n;
      module6.default(this, O);

      (n = M.call(this, t))._onSelectBlocksChanged = function (t) {
        if (n.props.selectedBlocksDidChange) n.props.selectedBlocksDidChange(t.nativeEvent);
      };

      n.state = {
        mode: 'main',
      };
      return n;
    }

    module7.default(O, [
      {
        key: 'currentSDKAPILevel',
        value: function () {
          return b.VERSION;
        },
      },
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          var t = this;
          this.mapContentChangedListener = module13.DeviceEventEmitter.addListener('mapContentChangedEvent', function (n) {
            var o, l;
            if (n.selectBlocks) null == t || null == (o = t.props) || o.selectedBlocksDidChange(n.selectBlocks);
            if (n.selectZones) null == t || null == (l = t.props) || l.selectedRectDidChange(n.selectZones.length);
          });
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          if (this.mapContentChangedListener) this.mapContentChangedListener.remove();
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this;
          return React.default.createElement(
            S,
            module22.default({}, this.props, {
              ref: function (n) {
                return (t.root = n);
              },
              mapMode: this.state.mode,
              style: [
                {
                  backgroundColor: '#E9ECF1',
                },
                this.props.style,
              ],
              data: this.props.data,
              isDarkMode: this.props.isDarkMode,
              onSelectBlocksChanged: this._onSelectBlocksChanged,
            })
          );
        },
      },
      {
        key: '_getSelectBlocksWraper',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    return t.abrupt(
                      'return',
                      new Promise(function (t, n) {
                        b.getSelectBlocks(function (o, l) {
                          if (o) t(l);
                          else
                            n({
                              error: 'getSelectBlocksWraper erro',
                              data: l || 'invalidated data',
                            });
                        });
                      })
                    );

                  case 1:
                  case 'end':
                    return t.stop();
                }
            },
            null,
            null,
            null,
            Promise
          );
        },
      },
      {
        key: 'getCurrentSelectBlock',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    n.next = 2;
                    return regeneratorRuntime.default.awrap(this._getSelectBlocksWraper());

                  case 2:
                    t = n.sent;
                    return n.abrupt('return', t);

                  case 4:
                  case 'end':
                    return n.stop();
                }
            },
            null,
            this,
            null,
            Promise
          );
        },
      },
      {
        key: 'changeMapViewMode',
        value: function (t) {
          if (!(module393.apiLevel < 10015)) {
            var n = 'main';
            if (
              t == module1125.MapModelInCleanMode.Segment_Clean_Read_Only ||
              t == module1125.MapModelInCleanMode.Segment_Clean_Read_Only_With_Clean_Type ||
              t == module1125.MapModelInCleanMode.Segment_Clean_Sequential_Read_Only_With_Clean_Type
            )
              n = 'blockCleanRO';
            else if (t == module1125.MapModelInCleanMode.Segment_Clean_Edit) n = 'blockCleanEdit';
            else if (t == module1125.MapModelInCleanMode.Zone_Clean_Read_Only) n = 'zoneCleanRO';
            else if (t == module1125.MapModelInCleanMode.Zone_Clean_Edit) n = 'zoneCleanEdit';
            this.setState({
              mode: n,
            });
            b.setMapViewMode(n);
          }
        },
      },
      {
        key: 'enterZoneEditMode',
        value: function () {
          this.setState({
            mode: 'zoneCleanEdit',
          });
        },
      },
      {
        key: 'addRectangle',
        value: function () {
          if (!(module393.apiLevel < 10015)) b.addCleanZone(function (t) {});
        },
      },
      {
        key: '_getZoneParamsWraper',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    return t.abrupt(
                      'return',
                      new Promise(function (t, n) {
                        b.getCleanZoneParams(function (o, l) {
                          if (o) t(l);
                          else
                            n({
                              error: 'getSelectBlocksWraper erro',
                              data: l || 'invalidated data',
                            });
                        });
                      })
                    );

                  case 1:
                  case 'end':
                    return t.stop();
                }
            },
            null,
            null,
            null,
            Promise
          );
        },
      },
      {
        key: 'getZoneParams',
        value: function () {
          var t, n, o, c, u;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    if (!(module393.apiLevel < 10015)) {
                      s.next = 2;
                      break;
                    }

                    return s.abrupt('return', []);

                  case 2:
                    s.next = 4;
                    return regeneratorRuntime.default.awrap(this._getZoneParamsWraper());

                  case 4:
                    for (t = s.sent, n = [], o = 0; o < t.length; o++) {
                      c = t[o];
                      (u = []).push(Math.floor(50 * c[0]));
                      u.push(Math.floor(50 * c[1]));
                      u.push(Math.floor(50 * c[2]));
                      u.push(Math.floor(50 * c[3]));
                      n.push(u);
                    }

                    return s.abrupt('return', n);

                  case 8:
                  case 'end':
                    return s.stop();
                }
            },
            null,
            this,
            null,
            Promise
          );
        },
      },
    ]);
    return O;
  })(React.Component);

exports.default = P;

P.propTypes = (function (t) {
  for (var n = 1; n < arguments.length; n++) {
    var l = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      M(Object(l), true).forEach(function (n) {
        module50.default(t, n, l[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(l));
    else
      M(Object(l)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(l, n));
      });
  }

  return t;
})(
  {
    data: PropTypes.object,
    isDarkMode: PropTypes.bool,
    mode: PropTypes.string,
    selectedBlocksDidChange: PropTypes.func,
    selectedRectDidChange: PropTypes.func,
  },
  module13.ViewPropTypes
);

var S = module13.requireNativeComponent('RR3DMapView', P);
