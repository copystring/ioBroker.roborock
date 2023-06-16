var module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module925 = require('./925'),
  module377 = require('./377'),
  module506 = require('./506');

function y() {
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

var module12 = require('./12'),
  b = module12.View,
  S = module12.AppState,
  R = (function (t) {
    module7.default(C, t);

    var module506 = C,
      module12 = y(),
      R = function () {
        var t,
          n = module11.default(module506);

        if (module12) {
          var l = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, l);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function C(t) {
      var l;
      module4.default(this, C);
      (l = R.call(this, t)).state = {
        robotState: t.robotState,
      };
      return l;
    }

    module5.default(C, [
      {
        key: 'componentDidMount',
        value: function () {
          S.addEventListener('change', this.onAppStateChange.bind(this));
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          S.removeEventListener('change', this.onAppStateChange.bind(this));
        },
      },
      {
        key: 'onAppStateChange',
        value: function () {
          var t, n, l;
          if (!(null == this || null == (t = this.washingView) || null == t.play)) t.play();
          if (!(null == this || null == (n = this.collectDustBubble) || null == n.play)) n.play();
          if (!(null == this || null == (l = this.collectDustRing) || null == l.play)) l.play();
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.context.theme.statusLottie;
          return React.default.createElement(
            b,
            {
              style: [
                {
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
                this.props.style,
              ],
            },
            this.state.robotState == module377.RobotState.WASHING_DUSTER &&
              React.default.createElement(module925.default, {
                ref: function (n) {
                  t.washingView = n;
                },
                style: {},
                source: n.washingDuster,
                autoPlay: true,
                loop: true,
              }),
            this.state.robotState == module377.RobotState.COLLECTING_DUST &&
              React.default.createElement(
                React.default.Fragment,
                null,
                React.default.createElement(module925.default, {
                  style: {
                    position: 'absolute',
                    top: -80,
                  },
                  ref: function (n) {
                    t.collectDustBubble = n;
                  },
                  source: n.floatingBubble,
                  autoPlay: true,
                  loop: true,
                }),
                React.default.createElement(module925.default, {
                  style: {
                    position: 'absolute',
                    top: 0,
                  },
                  ref: function (n) {
                    t.collectDustRing = n;
                  },
                  source: n.ring,
                  autoPlay: true,
                  loop: true,
                })
              )
          );
        },
      },
    ]);
    return C;
  })(React.default.Component);

exports.default = R;
R.contextType = module506.AppConfigContext;
