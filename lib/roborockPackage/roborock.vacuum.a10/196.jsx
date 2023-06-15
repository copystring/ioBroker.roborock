var module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module6 = require('./6'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  module49 = require('./49');

function f() {
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

function h(t, n) {
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

function R(t) {
  for (var n = 1; n < arguments.length; n++) {
    var o = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      h(Object(o), true).forEach(function (n) {
        module49(t, n, o[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(o));
    else
      h(Object(o)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(o, n));
      });
  }

  return t;
}

var module197 = require('./197'),
  React = require('react'),
  module191 = require('./191'),
  module201 = require('./201'),
  module202 = require('./202'),
  module46 = require('./46'),
  module181 = require('./181'),
  module210 = require('./210'),
  module77 = require('./77'),
  x = {
    top: 20,
    left: 20,
    right: 20,
    bottom: 30,
  },
  C = {
    validAttributes: R(
      R({}, module191.UIView),
      {},
      {
        isHighlighted: true,
        numberOfLines: true,
        ellipsizeMode: true,
        allowFontScaling: true,
        maxFontSizeMultiplier: true,
        disabled: true,
        selectable: true,
        selectionColor: true,
        adjustsFontSizeToFit: true,
        minimumFontScale: true,
        textBreakStrategy: true,
        onTextLayout: true,
        onInlineViewLayout: true,
        dataDetectorType: true,
      }
    ),
    directEventTypes: {
      topTextLayout: {
        registrationName: 'onTextLayout',
      },
      topInlineViewLayout: {
        registrationName: 'onInlineViewLayout',
      },
    },
    uiViewClassName: 'RCTText',
  },
  M = (function (c, ...args) {
    module7(O, c);

    var h = O,
      module197 = f(),
      y = function () {
        var t,
          n = module11(h);

        if (module197) {
          var o = module11(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9(this, t);
      };

    function O() {
      var t;
      module4(this, O);
      (t = y.call(this, ...args)).state = R(
        R({}, module202.Mixin.touchableGetInitialState()),
        {},
        {
          isHighlighted: false,
          createResponderHandlers: t._createResponseHandlers.bind(module6(t)),
          responseHandlers: null,
        }
      );
      return t;
    }

    module5(
      O,
      [
        {
          key: 'render',
          value: function () {
            var n = this.props;
            if (j(n))
              n = R(
                R(R({}, n), this.state.responseHandlers),
                {},
                {
                  isHighlighted: this.state.isHighlighted,
                }
              );
            if (null != n.selectionColor)
              n = R(
                R({}, n),
                {},
                {
                  selectionColor: module77(n.selectionColor),
                }
              );
            return (
              <module201.Consumer>
                {function (o) {
                  return o ? (
                    <L />
                  ) : (
                    <module201.Provider value>
                      <V />
                    </module201.Provider>
                  );
                }}
              </module201.Consumer>
            );
          },
        },
        {
          key: '_createResponseHandlers',
          value: function () {
            var t = this;
            return {
              onStartShouldSetResponder: function () {
                var n = t.props.onStartShouldSetResponder,
                  o = (null != n && n()) || j(t.props);
                if (o) t._attachTouchHandlers();
                return o;
              },
              onResponderGrant: function (n, o) {
                module210(t.touchableHandleResponderGrant)(n, o);
                if (null != t.props.onResponderGrant) t.props.onResponderGrant.call(t, n, o);
              },
              onResponderMove: function (n) {
                module210(t.touchableHandleResponderMove)(n);
                if (null != t.props.onResponderMove) t.props.onResponderMove.call(t, n);
              },
              onResponderRelease: function (n) {
                module210(t.touchableHandleResponderRelease)(n);
                if (null != t.props.onResponderRelease) t.props.onResponderRelease.call(t, n);
              },
              onResponderTerminate: function (n) {
                module210(t.touchableHandleResponderTerminate)(n);
                if (null != t.props.onResponderTerminate) t.props.onResponderTerminate.call(t, n);
              },
              onResponderTerminationRequest: function () {
                var n = t.props.onResponderTerminationRequest;
                return !!module210(t.touchableHandleResponderTerminationRequest)() && (null == n || n());
              },
            };
          },
        },
        {
          key: '_attachTouchHandlers',
          value: function () {
            var t = this;

            if (null == this.touchableGetPressRectOffset) {
              for (var n in module202.Mixin) 'function' == typeof module202.Mixin[n] && (this[n] = module202.Mixin[n].bind(this));

              this.touchableHandleActivePressIn = function () {
                if (!t.props.suppressHighlighting && j(t.props))
                  t.setState({
                    isHighlighted: true,
                  });
              };

              this.touchableHandleActivePressOut = function () {
                if (!t.props.suppressHighlighting && j(t.props))
                  t.setState({
                    isHighlighted: false,
                  });
              };

              this.touchableHandlePress = function (n) {
                if (null != t.props.onPress) t.props.onPress(n);
              };

              this.touchableHandleLongPress = function (n) {
                if (null != t.props.onLongPress) t.props.onLongPress(n);
              };

              this.touchableGetPressRectOffset = function () {
                return null == t.props.pressRetentionOffset ? x : t.props.pressRetentionOffset;
              };
            }
          },
        },
      ],
      [
        {
          key: 'getDerivedStateFromProps',
          value: function (t, n) {
            return null == n.responseHandlers && j(t)
              ? {
                  responseHandlers: n.createResponderHandlers(),
                }
              : null;
          },
        },
      ]
    );
    return O;
  })(React.Component);

M.defaultProps = {
  accessible: true,
  allowFontScaling: true,
  ellipsizeMode: 'tail',
};
M.viewConfig = C;

var j = function (t) {
    return null != t.onPress || null != t.onLongPress || null != t.onStartShouldSetResponder;
  },
  V = module181(C.uiViewClassName, function () {
    return C;
  }),
  L =
    null == module46.getViewManagerConfig('RCTVirtualText')
      ? V
      : module181('RCTVirtualText', function () {
          return {
            validAttributes: R(
              R({}, module191.UIView),
              {},
              {
                isHighlighted: true,
                maxFontSizeMultiplier: true,
              }
            ),
            uiViewClassName: 'RCTVirtualText',
          };
        }),
  E = React.forwardRef(function (n, o) {
    return <M />;
  });

E.displayName = 'Text';
E.propTypes = module197;
module.exports = E;
