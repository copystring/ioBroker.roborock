var module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = (function (t, n) {
    if (!n && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var o = y(n);
    if (o && o.has(t)) return o.get(t);
    var u = {},
      c = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var l in t)
      if ('default' !== l && Object.prototype.hasOwnProperty.call(t, l)) {
        var s = c ? Object.getOwnPropertyDescriptor(t, l) : null;
        if (s && (s.get || s.set)) Object.defineProperty(u, l, s);
        else u[l] = t[l];
      }

    u.default = t;
    if (o) o.set(t, u);
    return u;
  })(require('react')),
  module12 = require('./12'),
  module381 = require('./381'),
  module411 = require('./411'),
  module1231 = require('./1231');

function y(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (y = function (t) {
    return t ? o : n;
  })(t);
}

function M() {
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

require('./491').strings;

var S = (function (t) {
  module7.default(k, t);

  var y = k,
    S = M(),
    b = function () {
      var t,
        n = module11.default(y);

      if (S) {
        var o = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function k(t) {
    var o;
    module4.default(this, k);
    (o = b.call(this, t)).state = {
      items: o.getItems(),
    };
    return o;
  }

  module5.default(k, [
    {
      key: 'getItems',
      value: function () {
        var t = this.props.defaultItem,
          n = t ? [t] : [];
        n = n.concat(module1231.MM.maps);
        return n;
      },
    },
    {
      key: 'UNSAFE_componentWillMount',
      value: function () {},
    },
    {
      key: 'componentWillUnmount',
      value: function () {
        if (this.multiMapslistener) this.multiMapslistener.remove();
      },
    },
    {
      key: 'componentDidMount',
      value: function () {
        var t = this;
        this.multiMapslistener = module12.DeviceEventEmitter.addListener(module411.NotificationKeys.DidReceiveSpecialEvent, function (n) {
          if (n.data == module411.EventKeys.MultiMapsDidReceive) {
            t.setState({
              items: t.getItems(),
            });
            console.log('multiMapslistener - ' + JSON.stringify(module1231.MM.maps));
          }
        });
      },
    },
    {
      key: 'render',
      value: function () {
        var t = this,
          n = this.state.items.map(function (t, n) {
            return t.name;
          });
        return React.default.createElement(module381.ActionSheetView, {
          ref: function (n) {
            return (t.actionSheet = n);
          },
          actions: n,
          enabledAdapter: this.mapActionSheetEnabledAdapter.bind(this),
          didSelectRow: this.didSelectRow.bind(this),
          onPressCancel: function () {
            return t.actionSheet.hide();
          },
        });
      },
    },
    {
      key: 'mapActionSheetEnabledAdapter',
      value: function (t) {
        return true;
      },
    },
    {
      key: 'didSelectRow',
      value: function (t) {
        var n = this.state.items[t];
        if (this.props.didSelectMap) this.props.didSelectMap(n);
      },
    },
    {
      key: 'hide',
      value: function () {
        this.actionSheet.hide();
      },
    },
    {
      key: 'show',
      value: function () {
        this.actionSheet.show();
      },
    },
  ]);
  return k;
})(React.Component);

exports.default = S;
S.defaultProps = {
  defaultItem: null,
};
