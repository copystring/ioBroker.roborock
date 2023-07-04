var module50 = require('./50'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1652 = require('./1652'),
  module420 = require('./420'),
  module391 = require('./391'),
  module1124 = require('./1124');

function S(t, o) {
  var n = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var l = Object.getOwnPropertySymbols(t);
    if (o)
      l = l.filter(function (o) {
        return Object.getOwnPropertyDescriptor(t, o).enumerable;
      });
    n.push.apply(n, l);
  }

  return n;
}

function v(t) {
  for (var n = 1; n < arguments.length; n++) {
    var l = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      S(Object(l), true).forEach(function (n) {
        module50.default(t, n, l[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(l));
    else
      S(Object(l)).forEach(function (o) {
        Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(l, o));
      });
  }

  return t;
}

function V() {
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

require('./13');

var module510 = require('./510').strings,
  module393 = require('./393'),
  C = [
    module510.localization_strings_CommonModules_ShareView_0,
    module510.localization_strings_CommonModules_ShareView_1,
    module510.localization_strings_CommonModules_ShareView_2,
    module510.localization_strings_CommonModules_ShareView_3,
    module510.localization_strings_CommonModules_ShareView_4,
    module510.localization_strings_CommonModules_ShareView_5,
    module510.localization_strings_CommonModules_ShareView_1,
    module510.localization_strings_CommonModules_ShareView_7,
    module510.localization_strings_CommonModules_ShareView_2,
    module510.localization_strings_CommonModules_ShareView_7,
    module510.localization_strings_CommonModules_ShareView_10,
    module510.localization_strings_CommonModules_ShareView_1,
    module510.localization_strings_CommonModules_ShareView_12,
    module510.localization_strings_CommonModules_ShareView_4,
  ],
  O = (function (t) {
    module9.default(j, t);

    var module50 = j,
      S = V(),
      O = function () {
        var t,
          n = module12.default(module50);

        if (S) {
          var l = module12.default(this).constructor;
          t = Reflect.construct(n, arguments, l);
        } else t = n.apply(this, arguments);

        return module11.default(this, t);
      };

    function j(t) {
      var o;
      module6.default(this, j);
      (o = O.call(this, t)).state = {
        totalArea: 0,
      };
      o.mapImageHasOnLoad = {};
      return o;
    }

    module7.default(j, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          var t = this;
          this.mapLoadEmitter = module13.DeviceEventEmitter.addListener(module420.NotificationKeys.MapImageLoaded, function (o) {
            if (t.didFinishScreenShot && o.types && 0 != o.types.length) {
              console.log('shareView callback = ' + o.types);
              o.types.forEach(function (o) {
                t.mapImageHasOnLoad[o] = true;
              });
              var n = Object.values(module1124.shareViewLoadType),
                l = 0;
              n.forEach(function (o) {
                l += t.mapImageHasOnLoad[o] ? 1 : 0;
              });

              if (l > 0 && l == n.length) {
                console.log('shareView _capture begine');

                t._capture();

                t.mapImageHasOnLoad = {};
              }
            }
          });
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          if (this.mapLoadEmitter) this.mapLoadEmitter.remove();
        },
      },
      {
        key: 'setMapData',
        value: function (t) {
          if (this.mapView) this.mapView.setState(v({}, t));
          var o = 0;

          if (t && t.map.mapArea) {
            var n = parseInt(t.map.mapArea),
              l = parseInt(this.props.cleanArea);
            o = Math.round(n < 20 ? n ** (l + 5) : n + l);
          }

          this.setState({
            totalArea: o,
          });
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this;
          Math.round(Math.random() * (C.length - 1));
          return React.default.createElement(
            module13.View,
            {
              style: [z.containter, this.props.style],
            },
            React.default.createElement(
              module13.ScrollView,
              {
                contentContainerStyle: z.contentView,
                ref: function (o) {
                  return (t.rootView = o);
                },
              },
              React.default.createElement(module1124.MapView, {
                style: {
                  flex: 1,
                  justifyContent: 'center',
                  alignSelf: 'stretch',
                  backgroundColor: 'transparent',
                },
                parent: this,
                ref: function (o) {
                  return (t.mapView = o);
                },
                imageOnloadCallback: true,
                syncMapDeg: false,
              }),
              React.default.createElement(module1652.default, {
                style: {
                  backgroundColor: 'transparent',
                  height: 100,
                },
                data: [
                  {
                    title: module510.localization_strings_CommonModules_NumberView_3,
                    unit: '\u33a1',
                    value: this.state.totalArea,
                  },
                  {
                    title: module510.localization_strings_CommonModules_NumberView_0,
                    unit: module391.default.getAreaUnit(),
                    value: this.props.cleanArea,
                  },
                  {
                    title: module510.localization_strings_CommonModules_NumberView_2,
                    unit: '\u2032',
                    value: this.props.cleanTime,
                  },
                ],
              })
            )
          );
        },
      },
      {
        key: 'capture',
        value: function (t, o) {
          this.didFinishScreenShot = o;
          this.setMapData(t);
        },
      },
      {
        key: '_capture',
        value: function () {
          if (this.didFinishScreenShot) {
            var t = this.didFinishScreenShot;
            this.didFinishScreenShot = null;
            var o = module13.findNodeHandle(this.rootView);
            if (o)
              module393
                .longScreenShot(o, 'shareImage.png')
                .then(function (o) {
                  console.log('shareView image capture capture - ' + o);
                  t('shareImage.png', o);
                })
                .catch(function (t) {
                  console.log('shareView capture  error: ' + ('object' == typeof t ? JSON.stringify(t) : t));
                });
          }
        },
      },
    ]);
    return j;
  })(React.default.PureComponent);

exports.default = O;
var z = module13.StyleSheet.create({
  containter: {
    backgroundColor: 'white',
    height: 0,
  },
  contentView: {
    width: module13.Dimensions.get('window').width,
    height: module13.Dimensions.get('window').height,
    backgroundColor: '#F0F1F2',
  },
  topWrap: {
    paddingLeft: 20,
  },
  title: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 20,
    marginTop: 30,
    marginBottom: 20,
  },
  desc: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 17,
  },
});
