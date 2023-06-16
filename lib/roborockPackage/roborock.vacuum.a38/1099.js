var module22 = require('./22'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1100 = require('./1100'),
  module1034 = require('./1034'),
  module1101 = require('./1101'),
  module1098 = require('./1098');

function y() {
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

var D = (function (t, ...args) {
  module7.default(k, t);

  var D = k,
    _ = y(),
    W = function () {
      var t,
        n = module11.default(D);

      if (_) {
        var o = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function k() {
    var t;
    module4.default(this, k);
    (t = W.call(this, ...args)).state = {
      drawerWidth: 'function' == typeof t.props.navigationConfig.drawerWidth ? t.props.navigationConfig.drawerWidth() : t.props.navigationConfig.drawerWidth,
    };

    t._handleDrawerOpen = function () {
      t.props.navigation.dispatch({
        type: module1098.default.DRAWER_OPENED,
        key: t.props.navigation.state.key,
      });
    };

    t._handleDrawerClose = function () {
      t.props.navigation.dispatch({
        type: module1098.default.DRAWER_CLOSED,
        key: t.props.navigation.state.key,
      });
    };

    t._updateWidth = function () {
      var n = 'function' == typeof t.props.navigationConfig.drawerWidth ? t.props.navigationConfig.drawerWidth() : t.props.navigationConfig.drawerWidth;
      if (t.state.drawerWidth !== n)
        t.setState({
          drawerWidth: n,
        });
    };

    t._renderNavigationView = function () {
      return React.default.createElement(
        module1101.default,
        module22.default(
          {
            screenProps: t.props.screenProps,
            navigation: t.props.navigation,
            descriptors: t.props.descriptors,
            contentComponent: t.props.navigationConfig.contentComponent,
            contentOptions: t.props.navigationConfig.contentOptions,
            drawerPosition: t.props.navigationConfig.drawerPosition,
            style: t.props.navigationConfig.style,
          },
          t.props.navigationConfig
        )
      );
    };

    return t;
  }

  module5.default(k, [
    {
      key: 'componentDidMount',
      value: function () {
        module12.Dimensions.addEventListener('change', this._updateWidth);
      },
    },
    {
      key: 'componentDidUpdate',
      value: function (t) {
        var n = this.props.navigation.state,
          o = n.openId,
          s = n.closeId,
          p = n.toggleId,
          c = n.isDrawerOpen,
          f = t.navigation.state,
          u = f.openId,
          l = f.closeId,
          h = f.toggleId;
        if (o !== u) this._drawer.openDrawer();
        else if (s !== l) this._drawer.closeDrawer();
        else if (p !== h) c ? this._drawer.closeDrawer() : this._drawer.openDrawer();
      },
    },
    {
      key: 'componentWillUnmount',
      value: function () {
        module12.Dimensions.removeEventListener('change', this._updateWidth);
      },
    },
    {
      key: 'render',
      value: function () {
        var t = this,
          n = this.props.navigation.state,
          o = n.routes[n.index].key,
          s = this.props.descriptors[o],
          p = s.options.drawerLockMode;
        return React.default.createElement(
          module1100.default,
          {
            ref: function (n) {
              t._drawer = n;
            },
            drawerLockMode: p || (this.props.screenProps && this.props.screenProps.drawerLockMode) || this.props.navigationConfig.drawerLockMode,
            drawerBackgroundColor: this.props.navigationConfig.drawerBackgroundColor,
            drawerWidth: this.state.drawerWidth,
            onDrawerOpen: this._handleDrawerOpen,
            onDrawerClose: this._handleDrawerClose,
            useNativeAnimations: this.props.navigationConfig.useNativeAnimations,
            renderNavigationView: this._renderNavigationView,
            drawerPosition: 'right' === this.props.navigationConfig.drawerPosition ? module1100.default.positions.Right : module1100.default.positions.Left,
          },
          React.default.createElement(module1034.SceneView, {
            navigation: s.navigation,
            screenProps: this.props.screenProps,
            component: s.getComponent(),
          })
        );
      },
    },
  ]);
  return k;
})(React.default.PureComponent);

exports.default = D;
