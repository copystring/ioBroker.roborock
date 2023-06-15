exports._TESTING_ONLY_reset_container_count = function () {
  0;
};

exports.default = function (t) {
  var N = (function (_) {
    module7.default(x, _);

    var N = x,
      E = A(),
      R = function () {
        var t,
          n = module11.default(N);

        if (E) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function x(n) {
      var u;
      module4.default(this, x);
      (u = R.call(this, n)).subs = null;
      u._actionEventSubscribers = new Set();

      u._handleOpenURL = function (n) {
        var o = n.url,
          s = u.props,
          c = s.enableURLHandling,
          l = s.uriPrefix;

        if (false !== c) {
          var f = module1150.urlToPathAndParams(o, l);

          if (f) {
            var p = f.path,
              v = f.params,
              h = t.router.getActionForPathAndParams(p, v);
            if (h) u.dispatch(h);
          }
        }
      };

      u._persistNavigationState = function (t) {
        var n;
        return regeneratorRuntime.default.async(
          function (s) {
            for (;;)
              switch ((s.prev = s.next)) {
                case 0:
                  if ((n = u.props.persistenceKey)) {
                    s.next = 3;
                    break;
                  }

                  return s.abrupt('return');

                case 3:
                  s.next = 5;
                  return regeneratorRuntime.default.awrap(module12.AsyncStorage.setItem(n, JSON.stringify(t)));

                case 5:
                case 'end':
                  return s.stop();
              }
          },
          null,
          null,
          null,
          Promise
        );
      };

      u.dispatch = function (n) {
        if (u.props.navigation) return u.props.navigation.dispatch(n);
        u._navState = u._navState || u.state.nav;
        var o = u._navState;
        module1145.default(o, 'should be set in constructor if stateful');

        var s = t.router.getStateForAction(n, o),
          c = null === s ? o : s,
          l = function () {
            u._actionEventSubscribers.forEach(function (t) {
              return t({
                type: 'action',
                action: n,
                state: c,
                lastState: o,
              });
            });
          };

        if (null === s) {
          l();
          return true;
        } else if (c !== o) {
          u._navState = c;
          u.setState(
            {
              nav: c,
            },
            function () {
              u._onNavigationStateChange(o, c, n);

              l();

              u._persistNavigationState(c);
            }
          );
          return true;
        } else {
          l();
          return false;
        }
      };

      u._getScreenProps = function () {
        return u.props.screenProps;
      };

      k(n);
      u._initialAction = module1142.default.init();
      if (u._isStateful())
        u.subs = module12.BackHandler.addEventListener('hardwareBackPress', function () {
          if (u._isMounted) return u.dispatch(module1142.default.back());
          if (u.subs) u.subs.remove();
        });
      u.state = {
        nav: u._isStateful() && !n.persistenceKey ? t.router.getStateForAction(u._initialAction) : null,
      };
      return u;
    }

    module5.default(x, null, [
      {
        key: 'getDerivedStateFromProps',
        value: function (t, n) {
          k(t);
          return null;
        },
      },
    ]);
    module5.default(x, [
      {
        key: '_renderLoading',
        value: function () {
          return this.props.renderLoadingExperimental ? this.props.renderLoadingExperimental() : null;
        },
      },
      {
        key: '_isStateful',
        value: function () {
          return P(this.props);
        },
      },
      {
        key: '_validateProps',
        value: function (t) {
          if (!this._isStateful()) {
            var n = module56.default(t, ['navigation', 'screenProps']),
              o = Object.keys(n);
            if (0 !== o.length)
              throw new Error(
                'This navigator has both navigation and container props, so it is unclear if it should own its own state. Remove props: "' +
                  o.join(', ') +
                  '" if the navigator should get its state from the navigation prop. If the navigator should maintain its own state, do not pass a navigation prop.'
              );
          }
        },
      },
      {
        key: '_onNavigationStateChange',
        value: function (t, n, o) {
          if (undefined === this.props.onNavigationStateChange && this._isStateful() && process.env.REACT_NAV_LOGGING)
            console.group
              ? (console.group('Navigation Dispatch: '), console.log('Action: ', o), console.log('New State: ', n), console.log('Last State: ', t), console.groupEnd())
              : console.log('Navigation Dispatch: ', {
                  action: o,
                  newState: n,
                  lastState: t,
                });
          else if ('function' == typeof this.props.onNavigationStateChange) this.props.onNavigationStateChange(t, n, o);
        },
      },
      {
        key: 'componentDidUpdate',
        value: function () {
          if (this._navState === this.state.nav) this._navState = null;
        },
      },
      {
        key: 'componentDidMount',
        value: function () {
          var n,
            s,
            u,
            c,
            l,
            module11,
            p,
            v,
            _,
            S,
            y,
            b,
            A,
            P,
            k = this;

          return regeneratorRuntime.default.async(
            function (N) {
              for (;;)
                switch ((N.prev = N.next)) {
                  case 0:
                    if (((this._isMounted = true), this._isStateful())) {
                      N.next = 3;
                      break;
                    }

                    return N.abrupt('return');

                  case 3:
                    if (
                      (0,
                      module12.Linking.addEventListener('url', this._handleOpenURL),
                      (n = this.props),
                      (s = n.persistenceKey),
                      (u = n.uriPrefix),
                      (c = n.enableURLHandling),
                      (l = null),
                      (module11 = null),
                      false === c)
                    ) {
                      N.next = 20;
                      break;
                    }

                    if (((N.t0 = s), !N.t0)) {
                      N.next = 15;
                      break;
                    }

                    N.next = 14;
                    return regeneratorRuntime.default.awrap(module12.AsyncStorage.getItem(s));

                  case 14:
                    N.t0 = N.sent;

                  case 15:
                    module11 = N.t0;
                    N.next = 18;
                    return regeneratorRuntime.default.awrap(module12.Linking.getInitialURL());

                  case 18:
                    p = N.sent;
                    l = p && module1150.urlToPathAndParams(p, u);

                  case 20:
                    if (
                      ((v = this._initialAction),
                      (_ = this.state.nav) || (process.env.REACT_NAV_LOGGING && console.log('Init new Navigation State'), (_ = t.router.getStateForAction(v))),
                      module11)
                    )
                      try {
                        _ = JSON.parse(module11);
                        L = true;
                      } catch (t) {}

                    if (
                      (l &&
                        ((y = (S = l).path),
                        (b = S.params),
                        (A = t.router.getActionForPathAndParams(y, b)) &&
                          (process.env.REACT_NAV_LOGGING && console.log('Applying Navigation Action for Initial URL:', url), (v = A), (_ = t.router.getStateForAction(A, _)))),
                      (P = function () {
                        return k._actionEventSubscribers.forEach(function (t) {
                          return t({
                            type: 'action',
                            action: v,
                            state: k.state.nav,
                            lastState: null,
                          });
                        });
                      }),
                      _ !== this.state.nav)
                    ) {
                      N.next = 29;
                      break;
                    }

                    P();
                    return N.abrupt('return');

                  case 29:
                    this.setState(
                      {
                        nav: _,
                      },
                      function () {
                        L = false;
                        P();
                      }
                    );

                  case 30:
                  case 'end':
                    return N.stop();
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
        key: 'componentDidCatch',
        value: function (t, n) {
          if (!L) throw t;
          L = false;
          console.warn('Uncaught exception while starting app from persisted navigation state! Trying to render again with a fresh navigation state..');
          this.dispatch(module1142.default.init());
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          this._isMounted = false;
          module12.Linking.removeEventListener('url', this._handleOpenURL);
          if (this.subs) this.subs.remove();
          if (this._isStateful()) 0;
        },
      },
      {
        key: 'render',
        value: function () {
          var o = this,
            s = this.props.navigation;

          if (this._isStateful()) {
            var u = this.state.nav;
            if (!u) return this._renderLoading();
            if (!(this._navigation && this._navigation.state === u))
              this._navigation = module1143.default(t.router, u, this.dispatch, this._actionEventSubscribers, this._getScreenProps, function () {
                return o._navigation;
              });
            s = this._navigation;
          }

          module1145.default(s, 'failed to get navigation');
          return React.default.createElement(
            t,
            module22.default({}, this.props, {
              navigation: s,
            })
          );
        },
      },
    ]);
    return x;
  })(React.default.Component);

  N.router = t.router;
  N.navigationOptions = null;
  return module1141.polyfill(N);
};

require('./1149');

var module22 = require('./22'),
  regeneratorRuntime = require('regenerator-runtime'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  module56 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  React = require('react'),
  module12 = require('./12'),
  module1141 = require('./1141'),
  module1142 = require('./1142'),
  module1143 = require('./1143'),
  module1145 = require('./1145'),
  module1150 = require('./1150');

function A() {
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

function P(t) {
  return !t.navigation;
}

function k(t) {
  if (!P(t)) {
    var n = module56.default(t, ['navigation', 'screenProps']),
      o = Object.keys(n);
    if (0 !== o.length)
      throw new Error(
        'This navigator has both navigation and container props, so it is unclear if it should own its own state. Remove props: "' +
          o.join(', ') +
          '" if the navigator should get its state from the navigation prop. If the navigator should maintain its own state, do not pass a navigation prop.'
      );
  }
}

var L = false;
