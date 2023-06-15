var module22 = require('./22'),
  module56 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  module259 = require('./259');

require('./260');

function p() {
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

require('./52');

require('./212');

var v,
  React = require('react'),
  module47 = require('./47').getViewManagerConfig('AndroidSwipeRefreshLayout');

v = module47
  ? module47.Constants
  : {
      SIZE: {},
    };

var y = (function (t, ...args) {
  module7.default(N, t);

  var v = N,
    module47 = p(),
    y = function () {
      var t,
        n = module11.default(v);

      if (module47) {
        var s = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, s);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function N() {
    var t;
    module4.default(this, N);
    (t = y.call(this, ...args))._lastNativeRefreshing = false;

    t._onRefresh = function () {
      t._lastNativeRefreshing = true;
      if (t.props.onRefresh) t.props.onRefresh();
      t.forceUpdate();
    };

    return t;
  }

  module5.default(N, [
    {
      key: 'componentDidMount',
      value: function () {
        this._lastNativeRefreshing = this.props.refreshing;
      },
    },
    {
      key: 'componentDidUpdate',
      value: function (t) {
        if (this.props.refreshing !== t.refreshing) this._lastNativeRefreshing = this.props.refreshing;
        else if (this.props.refreshing !== this._lastNativeRefreshing && this._setNativePropsOnRef) {
          this._setNativePropsOnRef({
            refreshing: this.props.refreshing,
          });

          this._lastNativeRefreshing = this.props.refreshing;
        }
      },
    },
    {
      key: 'render',
      value: function () {
        var t = this,
          o = this.props,
          f = module56.default(o, ['tintColor', 'titleColor', 'title']);
        return <module259.default />;
      },
    },
  ]);
  return N;
})(React.Component);

y.SIZE = v.SIZE;
module.exports = y;
