var module22 = require('./22'),
  module56 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  module292 = require('./292');

function h() {
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

var module52 = require('./52'),
  React = require('react'),
  module294 = require('./294'),
  module61 = require('./61'),
  module84 = require('./84'),
  module212 = require('./212'),
  module268 = require('./268'),
  _ = ['Idle', 'Dragging', 'Settling'],
  R = (function (t, ...args) {
    module7.default(E, t);

    var n = E,
      module61 = h(),
      R = function () {
        var t,
          o = module11.default(n);

        if (module61) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, s);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function E() {
      var t;
      module4.default(this, E);
      (t = R.call(this, ...args))._nativeRef = React.createRef();
      t.state = {
        statusBarBackgroundColor: null,
      };

      t._onDrawerSlide = function (n) {
        if (t.props.onDrawerSlide) t.props.onDrawerSlide(n);
        if ('on-drag' === t.props.keyboardDismissMode) module268();
      };

      t._onDrawerOpen = function () {
        if (t.props.onDrawerOpen) t.props.onDrawerOpen();
      };

      t._onDrawerClose = function () {
        if (t.props.onDrawerClose) t.props.onDrawerClose();
      };

      t._onDrawerStateChanged = function (n) {
        if (t.props.onDrawerStateChanged) t.props.onDrawerStateChanged(_[n.nativeEvent.drawerState]);
      };

      return t;
    }

    module5.default(
      E,
      [
        {
          key: 'render',
          value: function () {
            var t = this.props,
              n = t.renderNavigationView,
              u = module56.default(t, ['onDrawerStateChanged', 'renderNavigationView', 'onDrawerOpen', 'onDrawerClose']),
              l = module52.Version >= 21 && this.props.statusBarBackgroundColor,
              c = React.createElement(
                module84,
                {
                  style: [
                    B.drawerSubview,
                    {
                      width: this.props.drawerWidth,
                      backgroundColor: this.props.drawerBackgroundColor,
                    },
                  ],
                  collapsable: false,
                },
                n(),
                l &&
                  React.createElement(module84, {
                    style: B.drawerStatusBar,
                  })
              ),
              p = React.createElement(
                module84,
                {
                  style: B.mainSubview,
                  collapsable: false,
                },
                l &&
                  React.createElement(module294, {
                    translucent: true,
                    backgroundColor: this.props.statusBarBackgroundColor,
                  }),
                l &&
                  React.createElement(module84, {
                    style: [
                      B.statusBar,
                      {
                        backgroundColor: this.props.statusBarBackgroundColor,
                      },
                    ],
                  }),
                this.props.children
              );
            return React.createElement(
              module292.default,
              module22.default({}, u, {
                ref: this._nativeRef,
                drawerWidth: this.props.drawerWidth,
                drawerPosition: this.props.drawerPosition,
                drawerLockMode: this.props.drawerLockMode,
                style: [B.base, this.props.style],
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
            module292.Commands.openDrawer(module212(this._nativeRef.current));
          },
        },
        {
          key: 'closeDrawer',
          value: function () {
            module292.Commands.closeDrawer(module212(this._nativeRef.current));
          },
        },
        {
          key: 'blur',
          value: function () {
            module212(this._nativeRef.current).blur();
          },
        },
        {
          key: 'focus',
          value: function () {
            module212(this._nativeRef.current).focus();
          },
        },
        {
          key: 'measure',
          value: function (t) {
            module212(this._nativeRef.current).measure(t);
          },
        },
        {
          key: 'measureInWindow',
          value: function (t) {
            module212(this._nativeRef.current).measureInWindow(t);
          },
        },
        {
          key: 'measureLayout',
          value: function (t, n, o) {
            module212(this._nativeRef.current).measureLayout(t, n, o);
          },
        },
        {
          key: 'setNativeProps',
          value: function (t) {
            module212(this._nativeRef.current).setNativeProps(t);
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
    return E;
  })(React.Component);

R.defaultProps = {
  drawerBackgroundColor: 'white',
};
var B = module61.create({
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
    height: module294.currentHeight,
  },
  drawerStatusBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: module294.currentHeight,
    backgroundColor: 'rgba(0, 0, 0, 0.251)',
  },
});
module.exports = R;
