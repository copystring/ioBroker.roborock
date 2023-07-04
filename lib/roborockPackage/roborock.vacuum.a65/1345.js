var module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module385 = require('./385'),
  module420 = require('./420'),
  module415 = require('./415');

function S() {
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

var M = (function (t) {
  module9.default(k, t);

  var n = k,
    M = S(),
    R = function () {
      var t,
        u = module12.default(n);

      if (M) {
        var o = module12.default(this).constructor;
        t = Reflect.construct(u, arguments, o);
      } else t = u.apply(this, arguments);

      return module11.default(this, t);
    };

  function k(t) {
    var n;
    module6.default(this, k);
    (n = R.call(this, t)).state = {
      items: n.getItems(),
    };
    return n;
  }

  module7.default(k, [
    {
      key: 'getItems',
      value: function () {
        var t = this.props.defaultItem,
          n = t ? [t] : [];
        n = n.concat(module415.MM.maps);
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
        this.multiMapslistener = module13.DeviceEventEmitter.addListener(module420.NotificationKeys.DidReceiveSpecialEvent, function (n) {
          if (n.data == module420.EventKeys.MultiMapsDidReceive) {
            t.setState({
              items: t.getItems(),
            });
            console.log('multiMapslistener - ' + JSON.stringify(module415.MM.maps));
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
        return React.default.createElement(module385.ActionSheetView, {
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
        var t = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : null;
        this.actionSheet.hide(t);
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

exports.default = M;
M.defaultProps = {
  defaultItem: null,
};
