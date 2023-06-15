var module22 = require('./22'),
  module6 = require('./6'),
  module8 = require('./8'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  module50 = require('./50');

function f() {
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
        module50(t, n, o[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(o));
    else
      h(Object(o)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(o, n));
      });
  }

  return t;
}

var module199 = require('./199'),
  React = require('react'),
  module193 = require('./193'),
  module203 = require('./203'),
  module204 = require('./204'),
  module47 = require('./47'),
  module183 = require('./183'),
  module212 = require('./212'),
  module78 = require('./78'),
  x = {
    top: 20,
    left: 20,
    right: 20,
    bottom: 30,
  },
  C = {
    validAttributes: R(
      R({}, module193.UIView),
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
    module9(P, c);

    var h = P,
      module199 = f(),
      y = function () {
        var t,
          n = module12(h);

        if (module199) {
          var o = module12(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module11(this, t);
      };

    function P() {
      var t;
      module6(this, P);
      (t = y.call(this, ...args)).state = R(
        R({}, module204.Mixin.touchableGetInitialState()),
        {},
        {
          isHighlighted: false,
          createResponderHandlers: t._createResponseHandlers.bind(module8(t)),
          responseHandlers: null,
        }
      );
      return t;
    }

    module7(
      P,
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
                  selectionColor: module78(n.selectionColor),
                }
              );
            return (
              <module203.Consumer>
                {function (o) {
                  return o ? (
                    <L />
                  ) : (
                    <module203.Provider value>
                      <V />
                    </module203.Provider>
                  );
                }}
              </module203.Consumer>
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
                module212(t.touchableHandleResponderGrant)(n, o);
                if (null != t.props.onResponderGrant) t.props.onResponderGrant.call(t, n, o);
              },
              onResponderMove: function (n) {
                module212(t.touchableHandleResponderMove)(n);
                if (null != t.props.onResponderMove) t.props.onResponderMove.call(t, n);
              },
              onResponderRelease: function (n) {
                module212(t.touchableHandleResponderRelease)(n);
                if (null != t.props.onResponderRelease) t.props.onResponderRelease.call(t, n);
              },
              onResponderTerminate: function (n) {
                module212(t.touchableHandleResponderTerminate)(n);
                if (null != t.props.onResponderTerminate) t.props.onResponderTerminate.call(t, n);
              },
              onResponderTerminationRequest: function () {
                var n = t.props.onResponderTerminationRequest;
                return !!module212(t.touchableHandleResponderTerminationRequest)() && (null == n || n());
              },
            };
          },
        },
        {
          key: '_attachTouchHandlers',
          value: function () {
            var t = this;

            if (null == this.touchableGetPressRectOffset) {
              for (var n in module204.Mixin) 'function' == typeof module204.Mixin[n] && (this[n] = module204.Mixin[n].bind(this));

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
    return P;
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
  V = module183(C.uiViewClassName, function () {
    return C;
  }),
  L =
    null == module47.getViewManagerConfig('RCTVirtualText')
      ? V
      : module183('RCTVirtualText', function () {
          return {
            validAttributes: R(
              R({}, module193.UIView),
              {},
              {
                isHighlighted: true,
                maxFontSizeMultiplier: true,
              }
            ),
            uiViewClassName: 'RCTVirtualText',
          };
        }),
  D = React.forwardRef(function (n, o) {
    return <M />;
  });

D.displayName = 'Text';
D.propTypes = module199;
module.exports = D;
