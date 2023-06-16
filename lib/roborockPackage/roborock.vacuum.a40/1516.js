var module22 = require('./22'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module391 = require('./391'),
  module1159 = require('./1159'),
  module515 = require('./515');

function x() {
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

var module1507 = require('./1507').getToast,
  T = {
    opacity: {
      start: 0,
      stop: 1,
    },
    dy: {
      start: 0,
      stop: 40,
    },
    duration: {
      move: 300,
      stay: 3e3,
      disappear: 400,
    },
  },
  A = (function (t) {
    module7.default(b, t);

    var module515 = b,
      A = x(),
      E = function () {
        var t,
          n = module11.default(module515);

        if (A) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function b(t) {
      var n;
      module4.default(this, b);
      (n = E.call(this, t)).state = {
        dy: new module12.Animated.Value(0),
        opacity: new module12.Animated.Value(0),
        event: '',
      };
      n.events = Object.keys(module1507());
      n.currentTestEventIndex = 0;
      n.isTestMode = false;
      return n;
    }

    module5.default(b, [
      {
        key: 'show',
        value: function (t) {
          var n = this;
          this.setState(
            {
              event: t,
            },
            function () {
              n.runAnimation();
            }
          );
        },
      },
      {
        key: 'componentDidMount',
        value: function () {},
      },
      {
        key: 'startTest',
        value: function () {
          this.isTestMode = true;
          this.show(this.events[this.currentTestEventIndex]);
        },
      },
      {
        key: 'nextTextEvent',
        value: function () {
          this.currentTestEventIndex = (this.currentTestEventIndex + 1) % this.events.length;
          this.show(this.events[this.currentTestEventIndex]);
        },
      },
      {
        key: 'stopTest',
        value: function () {
          this.currentTestEventIndex = 0;
          this.isTestMode = false;
          this.setState({
            event: null,
          });
        },
      },
      {
        key: 'runAnimation',
        value: function () {
          var t = this;
          this.state.dy.setValue(T.dy.start);
          this.state.opacity.setValue(T.opacity.start);
          var n = module12.Animated.parallel([
              module12.Animated.timing(this.state.opacity, {
                toValue: T.opacity.stop,
                duration: T.duration.move,
              }),
              module12.Animated.timing(this.state.dy, {
                toValue: T.dy.stop,
                duration: T.duration.move,
              }),
            ]),
            o = module12.Animated.parallel([
              module12.Animated.timing(this.state.opacity, {
                toValue: T.opacity.start,
                duration: T.duration.disappear,
              }),
              module12.Animated.timing(this.state.dy, {
                toValue: T.dy.start,
                duration: T.duration.disappear,
              }),
            ]),
            s = this.isTestMode ? [n, module12.Animated.delay(T.duration.stay)] : [n, module12.Animated.delay(T.duration.stay), o];
          module12.Animated.sequence(s).start(function () {
            return t.setState({
              event: null,
            });
          });
        },
      },
      {
        key: 'getStyle',
        value: function () {
          return [
            k.container,
            {
              width: module12.Dimensions.get('window').width - 2 * module1159.HorizontalMargin,
              backgroundColor: this.theme.componentBackgroundColor,
              height: this.state.dy,
              opacity: this.state.opacity,
            },
          ];
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this;
          if (!this.state.event) return null;
          var o = this.theme.eventToast;
          return React.default.createElement(
            module12.Animated.View,
            module22.default(
              {
                style: this.getStyle(),
              },
              module391.default.getAccessibilityLabel('home_event_toast_' + this.state.event)
            ),
            React.default.createElement(
              module12.TouchableWithoutFeedback,
              {
                onPress: function () {
                  if (t.isTestMode) t.nextTextEvent();
                },
              },
              React.default.createElement(
                module12.View,
                {
                  style: k.view,
                },
                React.default.createElement(
                  module12.Text,
                  {
                    style: [
                      k.text,
                      {
                        color: o.textColor,
                      },
                    ],
                    numberOfLines: 1,
                  },
                  module1507()[this.state.event][0]
                )
              )
            )
          );
        },
      },
      {
        key: 'theme',
        get: function () {
          return this.context.theme;
        },
      },
    ]);
    return b;
  })(React.default.Component);

A.contextType = module515.AppConfigContext;
var k = module12.StyleSheet.create({
  container: {
    marginLeft: module1159.HorizontalMargin,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 50,
    shadowColor: 'rgba(0,0,0,0.6)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.22,
    shadowRadius: 3,
    elevation: 3,
  },
  view: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: 40,
    height: 20,
    resizeMode: 'contain',
  },
  text: {
    color: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 10,
  },
});
module.exports = A;
