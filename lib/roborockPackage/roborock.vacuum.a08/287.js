var module21 = require('./21'),
  module55 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  module288 = (function (t, n) {
    if (!n && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var o = h(n);
    if (o && o.has(t)) return o.get(t);
    var s = {},
      u = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var l in t)
      if ('default' !== l && Object.prototype.hasOwnProperty.call(t, l)) {
        var c = u ? Object.getOwnPropertyDescriptor(t, l) : null;
        if (c && (c.get || c.set)) Object.defineProperty(s, l, c);
        else s[l] = t[l];
      }

    s.default = t;
    if (o) o.set(t, s);
    return s;
  })(require('./288')),
  w = ['onDrawerStateChanged', 'renderNavigationView', 'onDrawerOpen', 'onDrawerClose'];

function h(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (h = function (t) {
    return t ? o : n;
  })(t);
}

function v() {
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

var module51 = require('./51'),
  React = require('react'),
  module290 = require('./290'),
  module60 = require('./60'),
  module83 = require('./83'),
  module210 = require('./210'),
  module264 = require('./264'),
  R = ['Idle', 'Dragging', 'Settling'],
  B = (function (t, ...args) {
    module7.default(P, t);

    var h = P,
      module60 = v(),
      B = function () {
        var t,
          n = module11.default(h);

        if (module60) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function P() {
      var t;
      module4.default(this, P);
      (t = B.call(this, ...args))._nativeRef = React.createRef();
      t.state = {
        statusBarBackgroundColor: null,
      };

      t._onDrawerSlide = function (n) {
        if (t.props.onDrawerSlide) t.props.onDrawerSlide(n);
        if ('on-drag' === t.props.keyboardDismissMode) module264();
      };

      t._onDrawerOpen = function () {
        if (t.props.onDrawerOpen) t.props.onDrawerOpen();
      };

      t._onDrawerClose = function () {
        if (t.props.onDrawerClose) t.props.onDrawerClose();
      };

      t._onDrawerStateChanged = function (n) {
        if (t.props.onDrawerStateChanged) t.props.onDrawerStateChanged(R[n.nativeEvent.drawerState]);
      };

      return t;
    }

    module5.default(
      P,
      [
        {
          key: 'render',
          value: function () {
            var t = this.props,
              s = t.renderNavigationView,
              u = module55.default(t, w),
              l = module51.Version >= 21 && this.props.statusBarBackgroundColor,
              c = React.createElement(
                module83,
                {
                  style: [
                    O.drawerSubview,
                    {
                      width: this.props.drawerWidth,
                      backgroundColor: this.props.drawerBackgroundColor,
                    },
                  ],
                  collapsable: false,
                },
                s(),
                l &&
                  React.createElement(module83, {
                    style: O.drawerStatusBar,
                  })
              ),
              p = React.createElement(
                module83,
                {
                  style: O.mainSubview,
                  collapsable: false,
                },
                l &&
                  React.createElement(module290, {
                    translucent: true,
                    backgroundColor: this.props.statusBarBackgroundColor,
                  }),
                l &&
                  React.createElement(module83, {
                    style: [
                      O.statusBar,
                      {
                        backgroundColor: this.props.statusBarBackgroundColor,
                      },
                    ],
                  }),
                this.props.children
              );
            return React.createElement(
              module288.default,
              module21.default({}, u, {
                ref: this._nativeRef,
                drawerWidth: this.props.drawerWidth,
                drawerPosition: this.props.drawerPosition,
                drawerLockMode: this.props.drawerLockMode,
                style: [O.base, this.props.style],
                onDrawerSlide: this._onDrawerSlide,
                onDrawerOpen: this._onDrawerOpen,
                onDrawerClose: this._onDrawerClose,
                onDrawerStateChanged: this._onDrawerStateChanged,
              }),
              p,
              c
            );
          },
        },
        {
          key: 'openDrawer',
          value: function () {
            module288.Commands.openDrawer(module210(this._nativeRef.current));
          },
        },
        {
          key: 'closeDrawer',
          value: function () {
            module288.Commands.closeDrawer(module210(this._nativeRef.current));
          },
        },
        {
          key: 'blur',
          value: function () {
            module210(this._nativeRef.current).blur();
          },
        },
        {
          key: 'focus',
          value: function () {
            module210(this._nativeRef.current).focus();
          },
        },
        {
          key: 'measure',
          value: function (t) {
            module210(this._nativeRef.current).measure(t);
          },
        },
        {
          key: 'measureInWindow',
          value: function (t) {
            module210(this._nativeRef.current).measureInWindow(t);
          },
        },
        {
          key: 'measureLayout',
          value: function (t, n, o) {
            module210(this._nativeRef.current).measureLayout(t, n, o);
          },
        },
        {
          key: 'setNativeProps',
          value: function (t) {
            module210(this._nativeRef.current).setNativeProps(t);
          },
        },
      ],
      [
        {
          key: 'positions',
          get: function () {
            console.warn('Setting DrawerLayoutAndroid drawerPosition using `DrawerLayoutAndroid.positions` is deprecated. Instead pass the string value "left" or "right"');
            return {
              Left: 'left',
              Right: 'right',
            };
          },
        },
      ]
    );
    return P;
  })(React.Component);

B.defaultProps = {
  drawerBackgroundColor: 'white',
};
var O = module60.create({
  base: {
    flex: 1,
    elevation: 16,
  },
  mainSubview: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  drawerSubview: {
    position: 'absolute',
    top: 0,
    bottom: 0,
  },
  statusBar: {
    height: module290.currentHeight,
  },
  drawerStatusBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: module290.currentHeight,
    backgroundColor: 'rgba(0, 0, 0, 0.251)',
  },
});
module.exports = B;
