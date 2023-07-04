require('./385');

require('./423');

require('./387');

var regeneratorRuntime = require('regenerator-runtime'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  module415 = require('./415'),
  React = require('react'),
  module12 = require('./12'),
  module419 = require('./419'),
  module1121 = require('./1121'),
  module2092 = require('./2092');

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

require('./505').strings;

var C = (function (t) {
  module7.default(T, t);

  var module1121 = T,
    C = V(),
    x = function () {
      var t,
        n = module11.default(module1121);

      if (C) {
        var o = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function T(t) {
    var n;
    module4.default(this, T);
    (n = x.call(this, t)).lastOperationTime = new Date().getTime();
    n.state = {
      value: 50,
    };
    return n;
  }

  module5.default(T, [
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
                  return regeneratorRuntime.default.awrap(module419.GetStorageKey(module419.StorageKeys.ChatVolumeValue));

                case 3:
                  if ((t = o.sent))
                    this.setState({
                      value: parseInt(t),
                    });
                  o.next = 7;
                  return regeneratorRuntime.default.awrap(module415.default.setVoiceChatVolume(t ? parseInt(t) : parseInt(this.state.value)));

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
          module12.View,
          {
            style: [k.container, this.props.style],
          },
          React.default.createElement(module2092.default, {
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
        var module4, l;
        return regeneratorRuntime.default.async(
          function (u) {
            for (;;)
              switch ((u.prev = u.next)) {
                case 0:
                  this.lastOperationTime = new Date().getTime();
                  module4 = parseInt(t.toFixed(0));
                  this.setState({
                    value: t,
                  });
                  u.next = 5;
                  return regeneratorRuntime.default.awrap(module419.SetStorageKey(module419.StorageKeys.ChatVolumeValue, '' + module4));

                case 5:
                  u.prev = 5;
                  u.next = 8;
                  return regeneratorRuntime.default.awrap(module415.default.setVoiceChatVolume(module4));

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
C.contextType = module1121.AppConfigContext;
var k = module12.StyleSheet.create({
  container: {},
});
