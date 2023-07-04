require('./385');

require('./424');

require('./387');

var regeneratorRuntime = require('regenerator-runtime'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  module416 = require('./416'),
  React = require('react'),
  module13 = require('./13'),
  module420 = require('./420'),
  module1199 = require('./1199'),
  module2208 = require('./2208');

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

require('./510').strings;

var C = (function (t) {
  module9.default(T, t);

  var module1199 = T,
    C = V(),
    x = function () {
      var t,
        n = module12.default(module1199);

      if (C) {
        var o = module12.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module11.default(this, t);
    };

  function T(t) {
    var n;
    module6.default(this, T);
    (n = x.call(this, t)).lastOperationTime = new Date().getTime();
    n.state = {
      value: 50,
    };
    return n;
  }

  module7.default(T, [
    {
      key: 'componentDidMount',
      value: function () {
        var t = this;
        this.setInitialChatVolume();
        this.checkSliderShouldHideTimer = setInterval(function () {
          var n = new Date().getTime();
          if (t.lastOperationTime && (n - t.lastOperationTime) / 1e3 >= 2 && t.props.checkSliderShouldHide) t.props.checkSliderShouldHide();
        }, 1e3);
      },
    },
    {
      key: 'componentWillUnmount',
      value: function () {
        clearInterval(this.checkSliderShouldHideTimer);
      },
    },
    {
      key: 'setInitialChatVolume',
      value: function () {
        var t;
        return regeneratorRuntime.default.async(
          function (o) {
            for (;;)
              switch ((o.prev = o.next)) {
                case 0:
                  o.prev = 0;
                  o.next = 3;
                  return regeneratorRuntime.default.awrap(module420.GetStorageKey(module420.StorageKeys.ChatVolumeValue));

                case 3:
                  if ((t = o.sent))
                    this.setState({
                      value: parseInt(t),
                    });
                  o.next = 7;
                  return regeneratorRuntime.default.awrap(module416.default.setVoiceChatVolume(t ? parseInt(t) : parseInt(this.state.value)));

                case 7:
                  o.next = 12;
                  break;

                case 9:
                  o.prev = 9;
                  o.t0 = o.catch(0);
                  console.log('get Volume  error: ' + ('object' == typeof o.t0 ? JSON.stringify(o.t0) : o.t0));

                case 12:
                case 'end':
                  return o.stop();
              }
          },
          null,
          this,
          [[0, 9]],
          Promise
        );
      },
    },
    {
      key: 'render',
      value: function () {
        var t = this;
        this.context.theme.soundPackage;
        return React.default.createElement(
          module13.View,
          {
            style: [k.container, this.props.style],
          },
          React.default.createElement(module2208.default, {
            ref: function (n) {
              return (t.sliderView = n);
            },
            min: 5,
            max: 100,
            defaultValue: this.state.value,
            thumbSize: 24,
            onAfterChange: function (n) {
              t.onSlidingComplete(n);
            },
            onStart: function () {
              t.onSlidingStart();
            },
            maximumTrackTintColor: 'rgba(0,0,0,0.15)',
            minimumTrackTintColor: '#ffffff',
            processWidth: 4,
          })
        );
      },
    },
    {
      key: 'onSlidingStart',
      value: function () {
        this.lastOperationTime = null;
      },
    },
    {
      key: 'onSlidingComplete',
      value: function (t) {
        var module6, l;
        return regeneratorRuntime.default.async(
          function (u) {
            for (;;)
              switch ((u.prev = u.next)) {
                case 0:
                  this.lastOperationTime = new Date().getTime();
                  module6 = parseInt(t.toFixed(0));
                  this.setState({
                    value: t,
                  });
                  u.next = 5;
                  return regeneratorRuntime.default.awrap(module420.SetStorageKey(module420.StorageKeys.ChatVolumeValue, '' + module6));

                case 5:
                  u.prev = 5;
                  u.next = 8;
                  return regeneratorRuntime.default.awrap(module416.default.setVoiceChatVolume(module6));

                case 8:
                  l = u.sent;
                  console.log('setVoiceChatVolume - ' + JSON.stringify(l));
                  u.next = 15;
                  break;

                case 12:
                  u.prev = 12;
                  u.t0 = u.catch(5);
                  console.log('setVoiceChatVolume  error: ' + ('object' == typeof u.t0 ? JSON.stringify(u.t0) : u.t0));

                case 15:
                case 'end':
                  return u.stop();
              }
          },
          null,
          this,
          [[5, 12]],
          Promise
        );
      },
    },
  ]);
  return T;
})(React.default.Component);

exports.default = C;
C.contextType = module1199.AppConfigContext;
var k = module13.StyleSheet.create({
  container: {},
});
